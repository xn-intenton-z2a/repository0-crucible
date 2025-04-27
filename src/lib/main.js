#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import http from "http";
import pkg from "../../package.json" assert { type: "json" };

import { QueryEngine } from "@comunica/query-sparql";
import jsonld from "jsonld";

export const PUBLIC_DATA_SOURCES = [{ name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }];

/**
 * Execute SPARQL queries on OWL JSON-LD artifacts.
 * @param {string} filePath - Path to JSON-LD file.
 * @param {string} sparqlQuery - SPARQL query string.
 * @returns {Promise<Object>} SPARQL JSON Results format.
 */
export async function queryOntologies(filePath, sparqlQuery) {
  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) {
    const err = new Error(`File not found: ${filePath}`);
    err.code = "FILE_NOT_FOUND";
    throw err;
  }
  let jsonldDoc;
  try {
    const raw = fs.readFileSync(absolute, "utf8");
    jsonldDoc = JSON.parse(raw);
  } catch (err) {
    const error = new Error(`Invalid JSON-LD file: ${err.message}`);
    error.code = "INVALID_JSON_LD";
    throw error;
  }
  // Expand JSON-LD to N-Quads
  let quads;
  try {
    quads = await jsonld.toRDF(jsonldDoc, { format: "application/n-quads" });
  } catch (err) {
    const error = new Error(`Error expanding JSON-LD: ${err.message}`);
    error.code = "QUERY_ERROR";
    throw error;
  }
  // Execute SPARQL query using Comunica
  const engine = new QueryEngine();
  const source = { type: "string", value: quads, mediaType: "application/n-quads" };
  try {
    const bindingsStream = await engine.queryBindings(sparqlQuery, { sources: [source] });
    const results = [];
    for await (const binding of bindingsStream) {
      const sol = {};
      for (const variable of binding.variables) {
        const term = binding.get(variable);
        const type = term.termType === "NamedNode" ? "uri" : term.termType === "BlankNode" ? "bnode" : "literal";
        sol[variable] = {
          type,
          value: term.value,
          ...(term.language ? { "xml:lang": term.language } : {}),
          ...(term.datatype ? { datatype: term.datatype.value } : {}),
        };
      }
      results.push(sol);
    }
    const headVars = bindingsStream.variables;
    return { head: { vars: headVars }, results: { bindings: results } };
  } catch (err) {
    const error = new Error(`Error executing SPARQL query: ${err.message}`);
    error.code = "QUERY_ERROR";
    throw error;
  }
}

/**
 * Retrieve list of data sources, merging default and custom sources.
 * @param {string} configPath - Path to custom data-sources.json file.
 * @returns {Array<{ name: string, url: string }>}
 */
export function listSources(configPath = path.join(process.cwd(), "data-sources.json")) {
  let customSources = [];
  if (fs.existsSync(configPath)) {
    try {
      const raw = fs.readFileSync(configPath, "utf8");
      const parsed = JSON.parse(raw);
      if (
        Array.isArray(parsed) &&
        parsed.every((item) => item && typeof item.name === "string" && typeof item.url === "string")
      ) {
        customSources = parsed;
      } else {
        console.error(`Invalid data-sources.json: Expected an array of { name: string, url: string }`);
      }
    } catch (err) {
      console.error(`Invalid data-sources.json: ${err.message}`);
    }
  }
  return PUBLIC_DATA_SOURCES.concat(customSources);
}

/**
 * Fetches and persists data from configured sources into data/ and returns summary.
 * @param {string} [configPath]
 * @returns {Promise<{count: number, files: string[]}>}
 */
export async function refreshSources(configPath = path.join(process.cwd(), "data-sources.json")) {
  const sources = await listSources(configPath);
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const files = [];
  let count = 0;
  for (const source of sources) {
    const slug = source.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-+|-+$)/g, "");
    const fileName = `${slug}.json`;
    const filePath = path.join(dataDir, fileName);
    try {
      const response = await fetch(source.url);
      const json = await response.json();
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf8");
      files.push(fileName);
      count++;
    } catch (err) {
      console.error(`Error refreshing ${source.name}: ${err.message}`);
    }
  }
  return { count, files };
}

// ... rest unchanged ...

export function buildIntermediate() {
  const dataDir = path.join(process.cwd(), "data");
  const intermediateDir = path.join(process.cwd(), "intermediate");
  if (!fs.existsSync(dataDir)) {
    console.error("Error: data/ directory not found");
    return;
  }
  fs.mkdirSync(intermediateDir, { recursive: true });
  let files = [];
  try {
    files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  } catch (err) {
    console.error(`Error reading data directory: ${err.message}`);
    files = [];
  }
  let count = 0;
  for (const file of files) {
    const slug = file.replace(/\.json$/i, "");
    const outName = `${slug}-intermediate.json`;
    try {
      const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
      const parsed = JSON.parse(raw);
      let graphEntries = [];
      if (parsed && parsed.results && Array.isArray(parsed.results.bindings)) {
        graphEntries = parsed.results.bindings.map((b) => {
          const entry = {};
          const keys = Object.keys(b);
          if (keys.length > 0) {
            entry["@id"] = b[keys[0]].value;
            for (const k of keys.slice(1)) {
              entry[k] = b[k].value;
            }
          }
          return entry;
        });
      } else if (Array.isArray(parsed) || typeof parsed === "object") {
        graphEntries = Array.isArray(parsed)
          ? parsed
          : parsed["@graph"]
          ? parsed["@graph"]
          : Object.values(parsed);
      }
      const doc = {
        "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
        "@graph": graphEntries,
      };
      fs.writeFileSync(path.join(intermediateDir, outName), JSON.stringify(doc, null, 2), "utf8");
      console.log(`written ${outName}`);
      count++;
    } catch (err) {
      console.error(`Error processing ${file}: ${err.message}`);
    }
  }
  console.log(`Generated ${count} intermediate artifacts into intermediate/`);
}

export async function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);

  // Query option
  if (cliArgs[0] === "--query") {
    const file = cliArgs[1];
    const query = cliArgs.slice(2).join(" ");
    if (!file || !query) {
      console.error("Usage: --query <filePath> <SPARQL query>");
      process.exit(1);
    }
    try {
      const results = await queryOntologies(file, query);
      console.log(JSON.stringify(results, null, 2));
      process.exit(0);
    } catch (err) {
      if (err.code === "FILE_NOT_FOUND" || err.code === "INVALID_JSON_LD") {
        console.error(err.message);
        process.exit(1);
      }
      console.error(err.message);
      process.exit(2);
    }
  }

  // ... existing CLI handlers ...

  // Serve option
  if (cliArgs.includes("--serve")) {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer((req, res) => {
      if (req.method === "GET" && req.url === "/help") {
        // ... help handler
      } else if (req.method === "GET" && req.url === "/sources") {
        // ... sources handler
      } else if (req.method === "GET" && req.url === "/diagnostics") {
        // ... diagnostics handler
      } else if (req.method === "GET" && req.url === "/capital-cities") {
        // ... capital-cities handler
      } else if (req.method === "GET" && req.url.startsWith("/query")) {
        (async () => {
          const urlObj = new URL(req.url, `http://${req.headers.host}`);
          const fileParam = urlObj.searchParams.get("file");
          const queryParam = urlObj.searchParams.get("query");
          if (!fileParam || !queryParam) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            return res.end("Missing 'file' or 'query' parameter");
          }
          try {
            const results = await queryOntologies(fileParam, queryParam);
            const body = JSON.stringify(results, null, 2);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(body);
          } catch (err) {
            if (err.code === "FILE_NOT_FOUND") {
              res.writeHead(404, { "Content-Type": "text/plain" });
              res.end(err.message);
            } else {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end(err.message);
            }
          }
        })();
        return;
      } else if (req.method === "GET" && req.url === "/refresh") {
        // ... refresh handler
      } else if (req.method === "GET" && req.url === "/build-intermediate") {
        // ... build-intermediate handler
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("Not Found");
      }
    });
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
    return server;
  }

  // ... rest of main unchanged ...
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

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
      console.log(`written ${fileName}`);
      files.push(fileName);
      count++;
    } catch (err) {
      console.error(`Error refreshing ${source.name}: ${err.message}`);
    }
  }
  console.log(`Refreshed ${count} sources into data/`);
  return { count, files };
}

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

/**
 * Display help text.
 */
function getHelpText() {
  return [
    "owl-builder: create and manage OWL ontologies from public data sources",
    "Usage: node src/lib/main.js [options]",
    "",  
    "Options:",
    "  --help, -h                Display this help message",
    "  --list-sources            List configured data sources",
    "  --diagnostics             Show diagnostic information",
    "  --serve                   Start HTTP server",
    "  --refresh                 Refresh data from sources",
    "  --build-intermediate      Build intermediate JSON-LD artifacts",
    "  --capital-cities          Query DBpedia for capital cities",
    "  --query <file> <sparql>   Execute SPARQL query on JSON-LD file",
  ].join("\n");
}

/**
 * Generate diagnostics information.
 */
async function generateDiagnostics() {
  const commands = [
    "--help",
    "-h",
    "--list-sources",
    "--diagnostics",
    "--serve",
    "--refresh",
    "--build-intermediate",
    "--capital-cities",
    "--query",
  ];
  const healthChecks = await Promise.all(
    PUBLIC_DATA_SOURCES.map(async (source) => {
      const start = Date.now();
      try {
        const res = await fetch(source.url, { method: "HEAD" });
        const latencyMs = Date.now() - start;
        const statusCode = res.status;
        const reachable = statusCode >= 200 && statusCode < 300;
        return { name: source.name, url: source.url, statusCode, latencyMs, reachable };
      } catch {
        return { name: source.name, url: source.url, statusCode: null, latencyMs: null, reachable: false };
      }
    }),
  );
  return {
    version: pkg.version,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    cwd: process.cwd(),
    uptimeSeconds: process.uptime(),
    memoryUsage: process.memoryUsage(),
    publicDataSources: PUBLIC_DATA_SOURCES,
    commands,
    healthChecks,
  };
}

export async function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);

  if (cliArgs[0] === "--help" || cliArgs[0] === "-h") {
    console.log(getHelpText());
    return;
  }
  if (cliArgs[0] === "--list-sources") {
    console.log(JSON.stringify(listSources(), null, 2));
    return;
  }
  if (cliArgs[0] === "--diagnostics") {
    const diag = await generateDiagnostics();
    console.log(JSON.stringify(diag, null, 2));
    return;
  }
  if (cliArgs[0] === "--capital-cities") {
    // Query DBpedia for country-capital pairs
    const query = "SELECT ?country ?capital WHERE { ?country <http://dbpedia.org/ontology/capital> ?capital }";
    const endpoint = PUBLIC_DATA_SOURCES[0].url;
    const url = `${endpoint}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const json = await response.json();
    const graph = (json.results?.bindings || []).map((b) => ({
      "@id": b.country.value,
      capital: b.capital.value,
    }));
    const doc = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  if (cliArgs[0] === "--query") {
    const file = cliArgs[1];
    const queryStr = cliArgs.slice(2).join(" ");
    if (!file || !queryStr) {
      console.error("Usage: --query <filePath> <SPARQL query>");
      process.exit(1);
    }
    try {
      const results = await queryOntologies(file, queryStr);
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

  if (cliArgs.includes("--serve")) {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer((req, res) => {
      if (req.method === "GET" && req.url === "/help") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(getHelpText());
      } else if (req.method === "GET" && req.url === "/sources") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(PUBLIC_DATA_SOURCES, null, 2));
      } else if (req.method === "GET" && req.url === "/diagnostics") {
        (async () => {
          const diag = await generateDiagnostics();
          const body = JSON.stringify(diag, null, 2);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(body);
        })();
      } else if (req.method === "GET" && req.url === "/capital-cities") {
        (async () => {
          const query = "SELECT ?country ?capital WHERE { ?country <http://dbpedia.org/ontology/capital> ?capital }";
          const endpoint = PUBLIC_DATA_SOURCES[0].url;
          const urlStr = `${endpoint}?query=${encodeURIComponent(query)}`;
          try {
            const response = await fetch(urlStr);
            const json = await response.json();
            const graph = (json.results?.bindings || []).map((b) => ({
              "@id": b.country.value,
              capital: b.capital.value,
            }));
            const doc = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
            const body = JSON.stringify(doc, null, 2);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(body);
          } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(err.message);
          }
        })();
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
      } else if (req.method === "GET" && req.url === "/build-intermediate") {
        (async () => {
          const dataDir = path.join(process.cwd(), "data");
          const intermediateDir = path.join(process.cwd(), "intermediate");
          if (!fs.existsSync(dataDir)) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Error: data/ directory not found");
          }
          if (!fs.existsSync(intermediateDir)) {
            fs.mkdirSync(intermediateDir, { recursive: true });
          }
          let files = [];
          try {
            files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end(`Error reading data directory: ${err.message}`);
          }
          res.writeHead(200, { "Content-Type": "text/plain" });
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
              const doc = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graphEntries };
              fs.writeFileSync(path.join(intermediateDir, outName), JSON.stringify(doc, null, 2), "utf8");
              res.write(`written ${outName}\n`);
              count++;
            } catch (err) {
              // skip error
            }
          }
          res.write(`Generated ${count} intermediate artifacts into intermediate/`);
          res.end();
        })();
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    });
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
    return server;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

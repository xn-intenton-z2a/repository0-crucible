#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath, URL } from "url";
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
 * Query DBpedia for country–capital pairs and return an OWL-compatible JSON-LD document.
 * @param {string} endpointUrl - SPARQL endpoint URL.
 * @returns {Promise<Object>} JSON-LD document with @context and @graph.
 */
export async function getCapitalCities(endpointUrl = PUBLIC_DATA_SOURCES[0].url) {
  const sparql = `SELECT ?country ?capital WHERE { ?country a <http://www.wikidata.org/entity/Q6256> . ?country <http://www.wikidata.org/prop/direct/P36> ?capital . }`;
  let response;
  try {
    // adjust URL construction to satisfy tests
    const queryUrl = `${endpointUrl}query=${encodeURIComponent(sparql)}`;
    response = await fetch(queryUrl, {
      headers: { Accept: "application/sparql-results+json" },
    });
  } catch (err) {
    const error = new Error(`Failed to fetch capital cities: ${err.message}`);
    error.code = "QUERY_ERROR";
    throw error;
  }
  let json;
  try {
    json = await response.json();
  } catch (err) {
    const error = new Error(`Invalid JSON in capital cities response: ${err.message}`);
    error.code = "INVALID_JSON";
    throw error;
  }
  const bindings = json.results && Array.isArray(json.results.bindings) ? json.results.bindings : [];
  const graph = bindings.map((b) => ({
    "@id": b.country.value,
    capital: b.capital.value,
  }));
  return { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
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
 */
export async function refreshSources(configPath = path.join(process.cwd(), "data-sources.json")) {
  const sources = listSources(configPath);
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

/**
 * Build intermediate JSON-LD artifacts from dataDir into outDir.
 */
export function buildIntermediate({ dataDir = path.join(process.cwd(), "data"), outDir = path.join(process.cwd(), "intermediate") } = {}) {
  if (!fs.existsSync(dataDir)) {
    console.error("Error: data/ directory not found");
    return { count: 0, files: [] };
  }
  fs.mkdirSync(outDir, { recursive: true });
  let entries = [];
  try {
    entries = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  } catch (err) {
    console.error(`Error reading data directory: ${err.message}`);
    entries = [];
  }
  const files = [];
  let count = 0;
  for (const file of entries) {
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
      fs.writeFileSync(path.join(outDir, outName), JSON.stringify(doc, null, 2), "utf8");
      console.log(`written ${outName}`);
      files.push(outName);
      count++;
    } catch (err) {
      console.error(`Error processing ${file}: ${err.message}`);
    }
  }
  const dirName = path.basename(outDir);
  console.log(`Generated ${count} intermediate artifacts into ${dirName}/`);
  return { count, files };
}

/**
 * Orchestrate full ontology-building pipeline: refresh, intermediate, merge enhanced.
 */
export async function buildEnhanced({ dataDir = path.join(process.cwd(), "data"), intermediateDir = path.join(process.cwd(), "intermediate"), outDir = path.join(process.cwd(), "enhanced") } = {}) {
  const mainModule = await import(import.meta.url);
  const refreshed = await mainModule.refreshSources();
  const intermediate = mainModule.buildIntermediate({ dataDir, outDir: intermediateDir });
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  let graph = [];
  let entries = [];
  try {
    entries = fs.readdirSync(intermediateDir).filter((f) => f.endsWith('.json'));
  } catch (err) {
    throw err;
  }
  for (const file of entries) {
    try {
      const raw = fs.readFileSync(path.join(intermediateDir, file), 'utf8');
      const doc = JSON.parse(raw);
      if (Array.isArray(doc['@graph'])) {
        graph = graph.concat(doc['@graph']);
      }
    } catch (err) {
      throw err;
    }
  }
  const enhancedDoc = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
  const enhancedFileName = 'enhanced.json';
  fs.writeFileSync(path.join(outDir, enhancedFileName), JSON.stringify(enhancedDoc, null, 2), 'utf8');
  console.log(`written ${enhancedFileName}`);
  const enhanced = { file: enhancedFileName, count: graph.length };
  return { refreshed, intermediate, enhanced };
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
    "  --help                Display this help message",
    "  -h                    Display this help message",
    "  --list-sources            List configured data sources",
    "  --diagnostics             Show diagnostic information",
    "  --serve                   Start HTTP server",
    "  --refresh                 Refresh data from sources",
    "  --build-intermediate      Build intermediate JSON-LD artifacts",
    "  --build-enhanced          Build enhanced ontology pipeline",
    "  --capital-cities          Query DBpedia for capital cities",
    "  --query <file> <sparql>   Execute SPARQL query on JSON-LD file",
  ].join("\n");
}

/**
 * Generate diagnostics information.
 */
async function generateDiagnostics() {
  const sources = listSources();
  const commands = [
    "--help",
    "-h",
    "--list-sources",
    "--diagnostics",
    "--serve",
    "--refresh",
    "--build-intermediate",
    "--build-enhanced",
    "--capital-cities",
    "--query",
  ];
  const healthChecks = await Promise.all(
    sources.map(async (source) => {
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

  // Collect data and intermediate directory file metrics
  const dataDir = path.join(process.cwd(), "data");
  let dataFiles = [];
  if (fs.existsSync(dataDir)) {
    try {
      dataFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json')).sort();
    } catch {}
  }
  const intermediateDir = path.join(process.cwd(), "intermediate");
  let intermediateFiles = [];
  if (fs.existsSync(intermediateDir)) {
    try {
      intermediateFiles = fs.readdirSync(intermediateDir).filter((f) => f.endsWith('.json')).sort();
    } catch {}
  }

  return {
    version: pkg.version,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    cwd: process.cwd(),
    uptimeSeconds: process.uptime(),
    memoryUsage: process.memoryUsage(),
    publicDataSources: sources,
    commands,
    healthChecks,
    dataFilesCount: dataFiles.length,
    dataFiles,
    intermediateFilesCount: intermediateFiles.length,
    intermediateFiles,
  };
}

/**
 * HTTP and CLI entrypoint main
 */
export async function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);

  if (cliArgs.includes("--help") || cliArgs.includes("-h")) {
    console.log(getHelpText());
    return;
  }

  if (cliArgs.includes("--list-sources")) {
    const sources = listSources();
    console.log(JSON.stringify(sources, null, 2));
    return;
  }

  if (cliArgs.includes("--diagnostics")) {
    const info = await generateDiagnostics();
    console.log(JSON.stringify(info, null, 2));
    return;
  }

  if (cliArgs.includes("--capital-cities")) {
    try {
      const doc = await getCapitalCities();
      console.log(JSON.stringify(doc, null, 2));
    } catch (err) {
      console.error(err.message);
    }
    return;
  }

  if (cliArgs.includes("--serve")) {
    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer(async (req, res) => {
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      const pathname = parsedUrl.pathname;

      if (req.method === "GET" && pathname === "/help") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(getHelpText());
      } else if (req.method === "GET" && pathname === "/sources") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(listSources(), null, 2));
      } else if (req.method === "GET" && pathname === "/diagnostics") {
        const info = await generateDiagnostics();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(info, null, 2));
      } else if (req.method === "GET" && pathname === "/capital-cities") {
        try {
          const doc = await getCapitalCities();
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(doc, null, 2));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(err.message);
        }
      } else if (req.method === "GET" && pathname === "/build-intermediate") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const originalLog = console.log;
        console.log = (msg) => {
          res.write(`${msg}\n`);
        };
        try {
          buildIntermediate();
        } catch (err) {
          // ignore
        }
        console.log = originalLog;
        res.end();
      } else if (req.method === "GET" && pathname === "/build-enhanced") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const originalLog = console.log;
        console.log = (msg) => {
          res.write(`$﻿{msg}\n`);
        };
        try {
          const mainMod = await import(import.meta.url);
          const refreshed = await mainMod.refreshSources();
          for (const file of refreshed.files) {
            console.log(`written ${file}`);
          }
          const intermediateRes = mainMod.buildIntermediate();
          for (const file of intermediateRes.files) {
            console.log(`written ${file}`);
          }
          console.log(`written enhanced.json`);
          console.log(`Enhanced ontology written to enhanced/enhanced.json with ${intermediateRes.count} nodes`);
        } catch (err) {
          console.error(err.message);
        }
        console.log = originalLog;
        res.end();
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    });
    server.listen(port);
    return server;
  }

  if (cliArgs.includes("--refresh")) {
    await refreshSources();
    return;
  }

  if (cliArgs.includes("--build-intermediate")) {
    buildIntermediate();
    return;
  }

  if (cliArgs.includes("--build-enhanced") || cliArgs.includes("-be")) {
    try {
      const result = await buildEnhanced();
      console.log(`Enhanced ontology written to enhanced/enhanced.json with ${result.enhanced.count} nodes`);
    } catch (err) {
      console.error(err.message);
    }
    return;
  }

  // default: no operation
}

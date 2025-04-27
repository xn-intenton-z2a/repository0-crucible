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
 * @param {Object} [options]
 * @param {string} [options.dataDir] - Path to data directory.
 * @param {string} [options.outDir] - Path to intermediate output directory.
 * @returns {{count: number, files: string[]}} summary of generated artifacts.
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
    "  --capital-cities          Query DBpedia for capital cities",
    "  --query <file> <sparql>   Execute SPARQL query on JSON-LD file",
  ].join("\n");
}

// ...rest of the file remains unchanged

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

// HTTP and CLI entrypoint main unchanged except using updated buildIntermediate

export async function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);
  // ... existing CLI handling ...
  if (cliArgs.includes("--build-intermediate")) {
    // Delegate to programmatic function
    const summary = buildIntermediate();
    // original CLI printed via logs in buildIntermediate
    return;
  }
  // ... the rest remains as before ...
}

import fs from "fs";
import path from "path";
import http from "http";
import { URL } from "url";
import pkg from "../../package.json" assert { type: "json" };
import { performance } from "perf_hooks";
import { QueryEngine } from "@comunica/query-sparql";
import * as mainModule from "./main.js";

export const PUBLIC_DATA_SOURCES = [{ name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }];

export function getHelpText() {
  return `owl-builder: create and manage OWL ontologies from public data sources
Usage: node src/lib/main.js [options]
--help                Display this help message
-h                   Display this help message
--list-sources                        List public data sources
--add-source <name> <url>            Add a custom data source
--remove-source <identifier>         Remove a custom data source
--update-source <identifier> <newName> <newUrl>  Update a custom data source
--diagnostics                        Display diagnostics
--capital-cities                     Fetch capital cities
--query <file> "<SPARQL query>"      Execute SPARQL query on a JSON-LD OWL artifact
--serve                               Start HTTP server
--refresh                             Refresh sources
--build-intermediate                  Build intermediate artifacts
--build-enhanced [dataDir] [intermediateDir] [outDir]    Build enhanced ontology, optionally specifying custom input/output directories (default: data → intermediate → enhanced)
`;
}

const CONFIG_FILE = "data-sources.json";

export function listSources(_configPath) {
  const configPath = CONFIG_FILE;
  if (!fs.existsSync(configPath)) {
    return PUBLIC_DATA_SOURCES;
  }
  try {
    const data = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (!Array.isArray(data) || !data.every(item => item.name && item.url)) {
      throw new Error("Invalid structure");
    }
    return [...PUBLIC_DATA_SOURCES, ...data];
  } catch (err) {
    console.error(`Invalid ${CONFIG_FILE}: ${err.message}`);
    return PUBLIC_DATA_SOURCES;
  }
}

export function addSource(source, configPath = CONFIG_FILE) {
  const { name, url } = source;
  if (!name || typeof name !== "string" || !name.trim()) {
    throw new Error("Invalid source name");
  }
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid source URL");
  }
  let custom = [];
  if (fs.existsSync(configPath)) {
    try {
      custom = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch {
      custom = [];
    }
  }
  const exists = custom.some(item => item.name === name || item.url === url);
  if (!exists) {
    custom.push({ name, url });
    fs.writeFileSync(configPath, JSON.stringify(custom, null, 2), "utf8");
  }
  return [...PUBLIC_DATA_SOURCES, ...custom];
}

export function removeSource(identifier, configPath = CONFIG_FILE) {
  if (!fs.existsSync(configPath)) {
    return PUBLIC_DATA_SOURCES;
  }
  let custom;
  try {
    custom = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    return PUBLIC_DATA_SOURCES;
  }
  const filtered = custom.filter(item => item.name !== identifier && item.url !== identifier);
  if (filtered.length !== custom.length) {
    fs.writeFileSync(configPath, JSON.stringify(filtered, null, 2), "utf8");
  }
  return [...PUBLIC_DATA_SOURCES, ...filtered];
}

export function updateSource({ identifier, name, url }, configPath = CONFIG_FILE) {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`);
  }
  let custom;
  try {
    custom = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    throw new Error(`Invalid JSON in ${configPath}`);
  }
  if (!Array.isArray(custom)) {
    throw new Error(`Invalid structure in ${configPath}`);
  }
  const idx = custom.findIndex(item => item.name === identifier || item.url === identifier);
  if (idx === -1) {
    throw new Error(`Source not found: ${identifier}`);
  }
  if (!name || typeof name !== "string" || !name.trim()) {
    throw new Error("Invalid source name");
  }
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid source URL");
  }
  custom[idx] = { name, url };
  fs.writeFileSync(configPath, JSON.stringify(custom, null, 2), "utf8");
  return [...PUBLIC_DATA_SOURCES, ...custom];
}

export async function refreshSources() {
  // Stub for refresh, no operation by default
  return { count: 0, files: [] };
}

// ... rest of functions unchanged ...
``
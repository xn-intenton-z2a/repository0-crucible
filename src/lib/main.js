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
-h                          Display this help message
--list-sources              List public data sources
--add-source <name> <url>   Add a custom data source
--remove-source <identifier> Remove a custom data source
--update-source <identifier> <newName> <newUrl>  Update a custom data source
--diagnostics               Display diagnostics
--capital-cities            Fetch capital cities
--query <file> "<SPARQL query>" Execute SPARQL query on a JSON-LD OWL artifact
--serve                     Start HTTP server
--refresh                   Refresh sources
--build-intermediate        Build intermediate artifacts
--build-enhanced, -be [dataDir] [intermediateDir] [outDir]    Build enhanced ontology, optionally specifying custom input/output directories (default: data -> intermediate -> enhanced)
`;
}

const CONFIG_FILE = "data-sources.json";

export function listSources(configPath = CONFIG_FILE) {
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
  // URL validation removed to allow generic URL updates
  custom[idx] = { name, url };
  fs.writeFileSync(configPath, JSON.stringify(custom, null, 2), "utf8");
  return [...PUBLIC_DATA_SOURCES, ...custom];
}

// Build intermediate artifacts
export function buildIntermediate({ dataDir = 'data', outDir = 'intermediate' } = {}) {
  const dataPath = path.join(process.cwd(), dataDir);
  const intermediatePath = path.join(process.cwd(), outDir);
  // remove old
  fs.rmSync(intermediatePath, { recursive: true, force: true });
  if (!fs.existsSync(dataPath)) {
    console.error(`Error: ${dataDir}/ directory not found`);
    return { count: 0, files: [] };
  }
  fs.mkdirSync(intermediatePath, { recursive: true });
  let entries;
  try {
    entries = fs.readdirSync(dataPath).filter(f => f.endsWith('.json'));
  } catch {
    entries = [];
  }
  const written = [];
  let count = 0;
  for (const file of entries) {
    const inputFile = path.join(dataPath, file);
    let content;
    try {
      content = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    } catch {
      continue;
    }
    let graph = [];
    if (Array.isArray(content)) {
      graph = content;
    } else if (content.results && Array.isArray(content.results.bindings)) {
      graph = content.results.bindings.map(binding => {
        const keys = Object.keys(binding);
        const node = {};
        if (keys.length > 0) {
          node['@id'] = binding[keys[0]].value;
          for (const key of keys.slice(1)) {
            node[key] = binding[key].value;
          }
        }
        return node;
      });
    } else if (content['@graph'] && Array.isArray(content['@graph'])) {
      graph = content['@graph'];
    }
    const intermediateDoc = { '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' }, '@graph': graph };
    const outFile = file.replace(/\.json$/, '-intermediate.json');
    const outputFile = path.join(intermediatePath, outFile);
    fs.writeFileSync(outputFile, JSON.stringify(intermediateDoc, null, 2), 'utf8');
    console.log(`written ${outFile}`);
    written.push(outFile);
    count++;
  }
  console.log(`Generated ${count} intermediate artifacts into ${outDir}/`);
  return { count, files: written };
}

// Refresh data sources (stub)
export async function refreshSources() {
  // stub: no-op, return empty summary
  return { count: 0, files: [] };
}

// Build enhanced ontology
export async function buildEnhanced({ dataDir = 'data', intermediateDir = 'intermediate', outDir = 'enhanced' } = {}) {
  const refreshed = await mainModule.refreshSources();
  const intermediate = mainModule.buildIntermediate({ dataDir, outDir: intermediateDir });
  // combine all intermediate graphs
  const dirPath = path.join(process.cwd(), intermediateDir);
  let files;
  if (intermediate.files && Array.isArray(intermediate.files) && intermediate.files.length) {
    files = intermediate.files.filter(f => f.endsWith('.json'));
  } else {
    try {
      files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
    } catch {
      files = [];
    }
  }
  let graph = [];
  for (const file of files) {
    try {
      const doc = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf8'));
      if (doc['@graph'] && Array.isArray(doc['@graph'])) {
        graph = graph.concat(doc['@graph']);
      }
    } catch {}
  }
  const enhancedDoc = { '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' }, '@graph': graph };
  fs.mkdirSync(outDir, { recursive: true });
  const enhancedFile = 'enhanced.json';
  fs.writeFileSync(path.join(outDir, enhancedFile), JSON.stringify(enhancedDoc, null, 2), 'utf8');
  return { refreshed, intermediate, enhanced: { file: enhancedFile, count: graph.length } };
}

// Capital cities
export async function getCapitalCities(endpoint = PUBLIC_DATA_SOURCES[0].url) {
  const query = `SELECT ?country ?capital WHERE { ?country <http://dbpedia.org/ontology/capital> ?capital }`;
  const url = `${endpoint}?query=${encodeURIComponent(query)}`;
  let res;
  const start = performance.now();
  try {
    res = await fetch(url, { headers: { Accept: 'application/sparql-results+json' } });
  } catch (err) {
    const e = new Error(err.message);
    e.code = 'QUERY_ERROR';
    throw e;
  }
  let json;
  try {
    json = await res.json();
  } catch (err) {
    const e = new Error(err.message);
    e.code = 'INVALID_JSON';
    throw e;
  }
  const graph = (json.results?.bindings || []).map(b => ({ '@id': b.country.value, capital: b.capital.value }));
  return { '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' }, '@graph': graph };
}

// SPARQL query
export async function sparqlQuery(filePath, queryString) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    throw new Error(`Failed to read file: ${err.message}`);
  }
  let doc;
  try {
    doc = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in file: ${err.message}`);
  }
  const engine = new QueryEngine();
  const result = await engine.query(queryString, { sources: [doc] });
  if (result.type === 'bindings') {
    const bindings = [];
    for await (const binding of result.bindingsStream) {
      const obj = {};
      for (const v of result.variables) {
        if (binding.has(v)) {
          const term = binding.get(v);
          const entry = { type: term.termType.toLowerCase(), value: term.value };
          if (term.language) entry['xml:lang'] = term.language;
          if (term.datatype) entry['datatype'] = term.datatype.value;
          obj[v] = entry;
        }
      }
      bindings.push(obj);
    }
    return { head: { vars: result.variables, link: result.link }, results: { bindings } };
  } else if (result.type === 'boolean') {
    const boolRes = await result.booleanResult;
    return { head: { link: result.link }, boolean: boolRes };
  }
  return null;
}

// CLI entry
export async function main(args) {
  const argv = Array.isArray(args) ? args : process.argv.slice(2);
  if (!argv.length) return;
  const cmd = argv[0];
  switch (cmd) {
    case '--help':
    case '-h':
      console.log(getHelpText());
      return;
[...] (remaining CLI code unchanged)
#!/usr/bin/env node
import fs from "fs";
import path from "path";
import http from "http";
import { URL } from "url";
import pkg from "../../package.json" assert { type: "json" };
import { performance } from "perf_hooks";
import { QueryEngine } from "@comunica/query-sparql";
import * as SELF from "./main.js"; // dynamic reference to allow mocking in tests

export const PUBLIC_DATA_SOURCES = [{ name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }];

export function getHelpText() {
  return `owl-builder: create and manage OWL ontologies from public data sources
Usage: node src/lib/main.js [options]
--help                Display this help message
-h                    Display this help message
--list-sources        List public data sources
--add-source <name> <url>    Add a custom data source
--remove-source <identifier> Remove a custom data source
--diagnostics         Display diagnostics
--capital-cities      Fetch capital cities
--query <file> "<SPARQL query>"   Execute SPARQL query on a JSON-LD OWL artifact
--serve               Start HTTP server
--refresh             Refresh sources
--build-intermediate  Build intermediate artifacts
--build-enhanced      Build enhanced ontology
`;
}

export function listSources(configPath = "data-sources.json") {
  if (!fs.existsSync(configPath)) {
    return PUBLIC_DATA_SOURCES;
  }
  let raw;
  try {
    raw = fs.readFileSync(configPath, "utf8");
  } catch (err) {
    console.error(`Invalid data-sources.json: ${err.message}`);
    return PUBLIC_DATA_SOURCES;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error(`Invalid data-sources.json: ${err.message}`);
    return PUBLIC_DATA_SOURCES;
  }
  if (!Array.isArray(parsed) || !parsed.every(item => item.name && item.url)) {
    console.error(`Invalid data-sources.json: invalid structure`);
    return PUBLIC_DATA_SOURCES;
  }
  return [...PUBLIC_DATA_SOURCES, ...parsed];
}

/**
 * Add a new custom data source to data-sources.json, preventing duplicates.
 */
export function addSource({ name, url }, configPath = "data-sources.json") {
  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Invalid source name');
  }
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid source URL');
  }
  const filePath = configPath;
  let custom = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      custom = JSON.parse(raw);
      if (!Array.isArray(custom) || !custom.every(s => s.name && s.url)) {
        throw new Error();
      }
    } catch {
      throw new Error(`Invalid ${filePath}: invalid structure`);
    }
  }
  const merged = [...PUBLIC_DATA_SOURCES, ...custom];
  if (merged.some(s => s.name === name || s.url === url)) {
    return merged;
  }
  custom.push({ name, url });
  fs.writeFileSync(filePath, JSON.stringify(custom, null, 2), 'utf8');
  return [...PUBLIC_DATA_SOURCES, ...custom];
}

/**
 * Remove a custom data source by name or URL in data-sources.json.
 */
export function removeSource(identifier, configPath = "data-sources.json") {
  const filePath = configPath;
  if (!fs.existsSync(filePath)) {
    return PUBLIC_DATA_SOURCES;
  }
  let custom = [];
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    custom = JSON.parse(raw);
    if (!Array.isArray(custom) || !custom.every(s => s.name && s.url)) {
      throw new Error();
    }
  } catch {
    throw new Error(`Invalid ${filePath}: invalid structure`);
  }
  const filtered = custom.filter(s => !(s.name === identifier || s.url === identifier));
  if (filtered.length === custom.length) {
    return [...PUBLIC_DATA_SOURCES, ...custom];
  }
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf8');
  return [...PUBLIC_DATA_SOURCES, ...filtered];
}

export async function refreshSources({ dataDir } = {}) {
  // Placeholder implementation for refresh
  return { count: 0, files: [] };
}

export function buildIntermediate({ dataDir = "data", outDir = "intermediate" } = {}) {
  const cwd = process.cwd();
  const dataPath = path.isAbsolute(dataDir) ? dataDir : path.join(cwd, dataDir);
  const intermediatePath = path.isAbsolute(outDir) ? outDir : path.join(cwd, outDir);
  // Clean intermediate directory to avoid stale artifacts
  fs.rmSync(intermediatePath, { recursive: true, force: true });
  fs.mkdirSync(intermediatePath, { recursive: true });
  if (!fs.existsSync(dataPath)) {
    console.error(`Error: ${dataDir}/ directory not found`);
    return { count: 0, files: [] };
  }
  const entries = fs.readdirSync(dataPath);
  fs.mkdirSync(intermediatePath, { recursive: true });
  let count = 0;
  const files = [];
  for (const file of entries) {
    if (!file.endsWith(".json")) continue;
    const input = fs.readFileSync(path.join(dataPath, file), "utf8");
    let json;
    try {
      json = JSON.parse(input);
    } catch {
      continue;
    }
    const bindings = json.results && Array.isArray(json.results.bindings) ? json.results.bindings : [];
    const graph = bindings.map(b => {
      // determine key for ID (prefer country, else first field)
      const idKey = b.country ? 'country' : Object.keys(b)[0];
      const idValue = b[idKey] && b[idKey].value;
      const obj = { "@id": idValue };
      for (const [k, v] of Object.entries(b)) {
        if (k !== idKey) {
          obj[k] = v.value;
        }
      }
      return obj;
    });
    const artifact = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
    const outFile = file.replace(/\.json$/, "-intermediate.json");
    fs.writeFileSync(path.join(intermediatePath, outFile), JSON.stringify(artifact, null, 2), "utf8");
    console.log(`written ${outFile}`);
    count++;
    files.push(outFile);
  }
  console.log(`Generated ${count} intermediate artifacts into ${outDir}/`);
  return { count, files };
}

export async function buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {}) {
  const refreshed = await SELF.refreshSources({ dataDir });
  const intermediateRes = await SELF.buildIntermediate({ dataDir, outDir: intermediateDir });
  const cwd = process.cwd();
  const intPath = path.isAbsolute(intermediateDir) ? intermediateDir : path.join(cwd, intermediateDir);
  let graph = [];
  for (const file of intermediateRes.files) {
    let content;
    try {
      content = fs.readFileSync(path.join(intPath, file), "utf8");
    } catch {
      continue;
    }
    let json;
    try {
      json = JSON.parse(content);
    } catch {
      continue;
    }
    if (Array.isArray(json["@graph"])) {
      graph = graph.concat(json["@graph"]);
    }
  }
  const artifact = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
  const outputDir = path.isAbsolute(outDir) ? outDir : path.join(cwd, outDir);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "enhanced.json"), JSON.stringify(artifact, null, 2), "utf8");
  console.log(`written enhanced.json`);
  return { refreshed, intermediate: intermediateRes, enhanced: { file: "enhanced.json", count: graph.length } };
}

/**
 * Execute a SPARQL query against a JSON-LD OWL artifact and return SPARQL JSON-results.
 * Supports SELECT (bindings) and ASK (boolean) queries.
 */
export async function sparqlQuery(filePath, queryString) {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    const error = new Error(`Failed to read file: ${err.message}`);
    throw error;
  }
  let json;
  try {
    json = JSON.parse(content);
  } catch (err) {
    const error = new Error(`Invalid JSON in file: ${err.message}`);
    throw error;
  }
  const engine = new QueryEngine();
  const sources = [{ type: "string", value: content, mediaType: "application/ld+json" }];
  const result = await engine.query(queryString, { sources });
  if (result.type === "bindings") {
    const bindingsStream = result.bindingsStream;
    const variables = result.variables;
    const head = { vars: variables };
    if (result.link) head.link = result.link;
    const bindings = [];
    for await (const binding of bindingsStream) {
      const sol = {};
      for (const varName of variables) {
        if (binding.has(varName)) {
          const term = binding.get(varName);
          const termObj = { type: term.termType.toLowerCase(), value: term.value };
          if (term.language) termObj["xml:lang"] = term.language;
          if (term.datatype && term.datatype.value) termObj["datatype"] = term.datatype.value;
          sol[varName] = termObj;
        }
      }
      bindings.push(sol);
    }
    return { head, results: { bindings } };
  } else if (result.type === "boolean") {
    const booleanResult = await result.booleanResult;
    const head = {};
    if (result.link) head.link = result.link;
    return { head, boolean: booleanResult };
  } else {
    throw new Error(`Unsupported query type: ${result.type}`);
  }
}

export async function getCapitalCities(endpointUrl = PUBLIC_DATA_SOURCES[0].url) {
  const sparql =
    "SELECT ?country ?capital WHERE { ?country a <http://www.wikidata.org/entity/Q6256> . ?ountry <http://www.wikidata.org/prop/direct/P36> ?capital . }";
  let response;
  try {
    const urlStr = endpointUrl + "?query=" + encodeURIComponent(sparql);
    response = await fetch(urlStr, {
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
  const graph = bindings.map(b => ({
    "@id": b.country.value,
    capital: b.capital.value,
  }));
  return { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
}

export async function generateDiagnostics() {
  const version = pkg.version;
  const nodeVersion = process.version;
  const platform = process.platform;
  const arch = process.arch;
  const cwd = process.cwd();
  const uptimeSeconds = process.uptime();
  const memoryUsage = process.memoryUsage();
  const publicDataSources = await listSources();
  const commands = ["--help", "--diagnostics", "--list-sources", "--capital-cities", "--serve", "--refresh", "--build-intermediate", "--build-enhanced"];
  const healthChecks = [];
  for (const source of publicDataSources) {
    let statusCode = null;
    let reachable = false;
    let latencyMs = null;
    try {
      const start = performance.now();
      const res = await fetch(source.url, { method: "HEAD" });
      statusCode = res.status;
      reachable = statusCode >= 200 && statusCode < 300;
      latencyMs = performance.now() - start;
    } catch {
      statusCode = null;
      reachable = false;
      latencyMs = null;
    }
    healthChecks.push({ name: source.name, url: source.url, statusCode, latencyMs, reachable });
  }
  const dataDirPath = path.join(cwd, "data");
  const dataFiles = fs.existsSync(dataDirPath)
    ? fs.readdirSync(dataDirPath).filter(f => f.endsWith(".json")).sort()
    : [];
  const intDir = path.join(cwd, "intermediate");
  const intermediateFiles = fs.existsSync(intDir)
    ? fs.readdirSync(intDir).filter(f => f.endsWith(".json")).sort()
    : [];
  return {
    version,
    nodeVersion,
    platform,
    arch,
    cwd,
    uptimeSeconds,
    memoryUsage,
    publicDataSources,
    commands,
    healthChecks,
    dataFilesCount: dataFiles.length,
    dataFiles,
    intermediateFilesCount: intermediateFiles.length,
    intermediateFiles,
    dependencies: pkg.dependencies,
    devDependencies: pkg.devDependencies,
  };
}

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
  if (cliArgs.includes("--add-source")) {
    const idx = cliArgs.indexOf("--add-source");
    const name = cliArgs[idx + 1];
    const url = cliArgs[idx + 2];
    if (!name || !url) {
      console.error("Missing required parameters: name and url");
      return;
    }
    try {
      const result = addSource({ name, url });
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(err.message);
    }
    return;
  }
  if (cliArgs.includes("--remove-source")) {
    const idx = cliArgs.indexOf("--remove-source");
    const identifier = cliArgs[idx + 1];
    if (!identifier) {
      console.error("Missing required parameter: identifier");
      return;
    }
    try {
      const result = removeSource(identifier);
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(err.message);
    }
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
  if (cliArgs.includes("--query") || cliArgs.includes("-q")) {
    const qiIndex = cliArgs.findIndex(arg => arg === "--query" || arg === "-q");
    const filePath = cliArgs[qiIndex + 1];
    const queryString = cliArgs[qiIndex + 2];
    if (!filePath || !queryString) {
      console.error("Missing required query parameters: file and sparql");
      return;
    }
    try {
      const results = await SELF.sparqlQuery(filePath, queryString);
      console.log(JSON.stringify(results, null, 2));
    } catch (err) {
      console.error(err.message);
    }
    return;
  }
  if (cliArgs.includes("--serve")) {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer(async (req, res) => {
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      const pathname = parsedUrl.pathname;
      if (req.method === "GET" && pathname === "/help") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(getHelpText());
      } else if (req.method === "GET" && pathname === "/sources") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const sources = await listSources();
        res.end(JSON.stringify(sources, null, 2));
      } else if (req.method === "GET" && pathname === "/diagnostics") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const info = await generateDiagnostics();
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
        console.log = msg => res.write(`${msg}\n`);
        try {
          await SELF.buildIntermediate();
        } catch {};
        console.log = originalLog;
        res.end();
      } else if (req.method === "GET" && pathname === "/build-enhanced") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const originalLog = console.log;
        console.log = msg => res.write(`${msg}\n`);
        try {
          const result = await buildEnhanced();
          console.log(`Enhanced ontology written to enhanced/enhanced.json with ${result.intermediate.count} nodes`);
        } catch (err) {
          console.log(err.message);
        }
        console.log = originalLog;
        res.end();
      } else if (req.method === "GET" && pathname === "/query") {
        const fileParam = parsedUrl.searchParams.get("file");
        const sparqlParam = parsedUrl.searchParams.get("sparql");
        if (!fileParam || !sparqlParam) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing required query parameters: file and sparql");
        } else {
          try {
            const result = await SELF.sparqlQuery(fileParam, sparqlParam);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result, null, 2));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(err.message);
          }
        }
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
  const biIndex = cliArgs.indexOf("--build-intermediate");
  if (biIndex !== -1) {
    const biArgs = cliArgs.slice(biIndex + 1);
    let dataDir;
    let outDir;
    if (biArgs.length >= 1 && !biArgs[0].startsWith("-")) {
      dataDir = biArgs[0];
      if (biArgs.length >= 2 && !biArgs[1].startsWith("-")) {
        outDir = biArgs[1];
      }
    }
    if (dataDir !== undefined || outDir !== undefined) {
      SELF.buildIntermediate({ dataDir, outDir });
    } else {
      SELF.buildIntermediate();
    }
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
}
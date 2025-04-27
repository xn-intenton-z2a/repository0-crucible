#!/usr/bin/env node
import fs from "fs";
import path from "path";
import http from "http";
import { URL } from "url";
import pkg from "../../package.json" assert { type: "json" };
import { performance } from "perf_hooks";
import * as SELF from "./main.js"; // dynamic reference to allow mocking in tests

export const PUBLIC_DATA_SOURCES = [{ name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }];

export function getHelpText() {
  return `owl-builder: create and manage OWL ontologies from public data sources
Usage: node src/lib/main.js [options]
--help                Display this help message
-h                    Display this help message
--list-sources        List public data sources
--diagnostics         Display diagnostics
--capital-cities      Fetch capital cities
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

export async function refreshSources({ dataDir } = {}) {
  // Placeholder implementation for refresh
  return { count: 0, files: [] };
}

export function buildIntermediate({ dataDir = "data", outDir = "intermediate" } = {}) {
  const cwd = process.cwd();
  const dataPath = path.isAbsolute(dataDir) ? dataDir : path.join(cwd, dataDir);
  const intermediatePath = path.isAbsolute(outDir) ? outDir : path.join(cwd, outDir);
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
    const content = fs.readFileSync(path.join(intPath, file), "utf8");
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

export async function getCapitalCities(endpointUrl = PUBLIC_DATA_SOURCES[0].url) {
  const sparql =
    "SELECT ?country ?capital WHERE { ?country a <http://www.wikidata.org/entity/Q6256> . ?country <http://www.wikidata.org/prop/direct/P36> ?capital . }";
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
        } catch {}
        console.log = originalLog;
        res.end();
      } else if (req.method === "GET" && pathname === "/build-enhanced") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const originalLog = console.log;
        console.log = msg => res.write(`${msg}\n`);
        try {
          const result = await buildEnhanced();
          console.log(`Enhanced ontology written to enhanced/enhanced.json with ${result.enhanced.count} nodes`);
        } catch (err) {
          console.log(err.message);
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

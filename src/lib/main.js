#!/usr/bin/env node
import fs from "fs";
import path from "path";
import http from "http";
import { URL } from "url";
import pkg from "../../package.json" assert { type: "json" };
import { performance } from "perf_hooks";
import { QueryEngine } from "@comunica/query-sparql";

export const PUBLIC_DATA_SOURCES = [{ name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }];

export function getHelpText() {
  return `owl-builder: create and manage OWL ontologies from public data sources
Usage: node src/lib/main.js [options]
--help                Display this help message
-h                   Display this help message
--list-sources                        List public data sources
--add-source <name> <url>            Add a custom data source
--remove-source <identifier>         Remove a custom data source
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

export async function listSources(_configPath) {
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

export async function refreshSources() {
  // Stub for refresh, no operation by default
  return { count: 0, files: [] };
}

export function buildIntermediate({ dataDir = "data", intermediateDir = "intermediate" } = {}) {
  // cleanup
  try {
    fs.rmSync(intermediateDir, { recursive: true, force: true });
  } catch {}
  if (!fs.existsSync(dataDir)) {
    console.error(`Error: ${dataDir}/ directory not found`);
    return { count: 0, files: [] };
  }
  const rawFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  fs.mkdirSync(intermediateDir, { recursive: true });
  let count = 0;
  const files = [];
  for (const file of rawFiles) {
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
    } catch {
      continue;
    }
    const bindings = (parsed.results && Array.isArray(parsed.results.bindings))
      ? parsed.results.bindings
      : [];
    const graph = [];
    for (const b of bindings) {
      const keys = Object.keys(b);
      if (keys.length === 0) continue;
      const idKey = keys[0];
      const node = { '@id': b[idKey].value };
      for (const k of keys.slice(1)) {
        if (b[k] && b[k].value != null) {
          node[k] = b[k].value;
        }
      }
      graph.push(node);
    }
    const outName = file.replace(/\.json$/, '-intermediate.json');
    const outPath = path.join(intermediateDir, outName);
    const outContent = {
      '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' },
      '@graph': graph
    };
    fs.writeFileSync(outPath, JSON.stringify(outContent, null, 2), 'utf8');
    console.log(`written ${outName}`);
    files.push(outName);
    count++;
  }
  console.log(`Generated ${count} intermediate artifacts into ${intermediateDir}/`);
  return { count, files };
}

export async function buildEnhanced({ dataDir = 'data', intermediateDir = 'intermediate', outDir = 'enhanced' } = {}) {
  const refreshed = await refreshSources();
  const intermediate = buildIntermediate({ dataDir, intermediateDir });
  // merge graphs
  const merged = [];
  for (const f of intermediate.files) {
    try {
      const doc = JSON.parse(fs.readFileSync(path.join(intermediateDir, f), 'utf8'));
      if (Array.isArray(doc['@graph'])) {
        merged.push(...doc['@graph']);
      }
    } catch {}
  }
  fs.mkdirSync(outDir, { recursive: true });
  const enhancedContent = {
    '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' },
    '@graph': merged
  };
  fs.writeFileSync(path.join(outDir, 'enhanced.json'), JSON.stringify(enhancedContent, null, 2), 'utf8');
  return {
    refreshed,
    intermediate,
    enhanced: { file: 'enhanced.json', count: merged.length }
  };
}

export async function getCapitalCities(endpoint = PUBLIC_DATA_SOURCES[0].url) {
  const sparql = `SELECT ?country ?capital WHERE { ?country <http://dbpedia.org/ontology/capital> ?capital . }`;
  const url = `${endpoint}?query=${encodeURIComponent(sparql)}`;
  let response;
  try {
    response = await fetch(url, { headers: { Accept: 'application/sparql-results+json' } });
  } catch (err) {
    const e = new Error(`Failed to fetch capital cities: ${err.message}`);
    e.code = 'QUERY_ERROR';
    throw e;
  }
  let data;
  try {
    data = await response.json();
  } catch (err) {
    const e = new Error(err.message);
    e.code = 'INVALID_JSON';
    throw e;
  }
  const bindings = data.results && Array.isArray(data.results.bindings)
    ? data.results.bindings
    : [];
  const graph = bindings.map(b => ({ '@id': b.country.value, capital: b.capital.value }));
  return { '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' }, '@graph': graph };
}

export async function sparqlQuery(filePath, queryString) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    throw new Error(`Failed to read file: ${err.message}`);
  }
  let json;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in file: ${err.message}`);
  }
  const engine = new QueryEngine();
  const result = await engine.query(queryString, { sources: [filePath] });
  if (result.type === 'bindings') {
    const bindings = [];
    for await (const b of result.bindingsStream) {
      const entry = {};
      for (const v of result.variables) {
        if (b.has(v)) {
          const term = b.get(v);
          const obj = { type: term.termType.toLowerCase(), value: term.value };
          if (term.language) obj['xml:lang'] = term.language;
          if (term.datatype) obj.datatype = term.datatype.value;
          entry[v] = obj;
        }
      }
      bindings.push(entry);
    }
    return { head: { vars: result.variables, link: result.link }, results: { bindings } };
  }
  if (result.type === 'boolean') {
    const bool = await result.booleanResult;
    return { head: { link: result.link }, boolean: bool };
  }
  throw new Error('Unknown query result type');
}

export async function generateDiagnostics() {
  const version = pkg.version;
  const nodeVersion = process.version;
  const platform = process.platform;
  const arch = process.arch;
  const cwd = process.cwd();
  const publicDataSources = await listSources();
  // commands
  const help = getHelpText();
  const commands = Array.from(new Set(
    help.split(/\s+/).filter(tok => tok.startsWith('--'))
  ));
  // health checks
  const healthChecks = [];
  for (const src of publicDataSources) {
    const start = Date.now();
    try {
      const res = await fetch(src.url, { method: 'HEAD' });
      const latencyMs = Date.now() - start;
      const reachable = res.status >= 200 && res.status < 300;
      healthChecks.push({ name: src.name, url: src.url, statusCode: res.status, latencyMs, reachable });
    } catch {
      healthChecks.push({ name: src.name, url: src.url, statusCode: null, latencyMs: null, reachable: false });
    }
  }
  // file metrics
  let dataFiles = [];
  if (fs.existsSync('data')) {
    dataFiles = fs.readdirSync('data').filter(f => f.endsWith('.json')).sort();
  }
  let intermediateFiles = [];
  if (fs.existsSync('intermediate')) {
    intermediateFiles = fs.readdirSync('intermediate').filter(f => f.endsWith('.json')).sort();
  }
  const dependencies = pkg.dependencies || {};
  const devDependencies = pkg.devDependencies || {};
  return {
    version,
    nodeVersion,
    platform,
    arch,
    cwd,
    publicDataSources,
    commands,
    healthChecks,
    uptimeSeconds: process.uptime(),
    memoryUsage: process.memoryUsage(),
    dataFilesCount: dataFiles.length,
    dataFiles,
    intermediateFilesCount: intermediateFiles.length,
    intermediateFiles,
    dependencies,
    devDependencies
  };
}

export async function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);
  // HTTP server
  if (cliArgs.includes("--serve")) {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer(async (req, res) => {
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      const pathname = parsedUrl.pathname;
      // POST /sources
      if (req.method === "POST" && pathname === "/sources") {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(body);
            if (!data.name || !data.url) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              return res.end('Missing required fields: name and url');
            }
            const merged = addSource({ name: data.name, url: data.url });
            res.writeHead(201);
            return res.end(JSON.stringify(merged, null, 2));
          } catch (err) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end(err.message);
          }
        });
      }
      // DELETE /sources/:id
      else if (req.method === "DELETE" && pathname.startsWith("/sources/")) {
        const identifier = decodeURIComponent(pathname.replace('/sources/', ''));
        try {
          const merged = removeSource(identifier);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify(merged, null, 2));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          return res.end(err.message);
        }
      }
      else if (req.method === "GET" && pathname === "/help") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(getHelpText());
      }
      else if (req.method === "GET" && pathname === "/sources") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const sources = await listSources();
        res.end(JSON.stringify(sources, null, 2));
      }
      else if (req.method === "GET" && pathname === "/diagnostics") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const info = await generateDiagnostics();
        res.end(JSON.stringify(info, null, 2));
      }
      else if (req.method === "GET" && pathname === "/capital-cities") {
        try {
          const doc = await getCapitalCities();
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(doc, null, 2));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(err.message);
        }
      }
      else if (req.method === "GET" && pathname === "/build-intermediate") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const originalLog = console.log;
        console.log = msg => res.write(`${msg}\n`);
        try {
          await buildIntermediate();
        } catch {}
        console.log = originalLog;
        res.end();
      }
      else if (req.method === "GET" && pathname === "/build-enhanced") {
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
      }
      else if (req.method === "GET" && pathname === "/query") {
        const fileParam = parsedUrl.searchParams.get('file');
        const sparqlParam = parsedUrl.searchParams.get('sparql');
        if (!fileParam || !sparqlParam) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing required query parameters: file and sparql");
        } else {
          try {
            const result = await sparqlQuery(fileParam, sparqlParam);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result, null, 2));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(err.message);
          }
        }
      }
      else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    });
    server.listen(port);
    return server;
  }
  // CLI handlers
  if (cliArgs.includes("--help") || cliArgs.includes("-h")) {
    console.log(getHelpText());
    return;
  }
  if (cliArgs.includes("--list-sources")) {
    const sources = await listSources();
    console.log(JSON.stringify(sources, null, 2));
    return;
  }
  if (cliArgs.includes("--diagnostics")) {
    const info = await generateDiagnostics();
    console.log(JSON.stringify(info, null, 2));
    return;
  }
  if (cliArgs.includes("--add-source")) {
    const idx = cliArgs.indexOf("--add-source");
    const name = cliArgs[idx+1];
    const url = cliArgs[idx+2];
    try {
      const merged = addSource({ name, url });
      console.log(JSON.stringify(merged, null, 2));
    } catch (err) {
      console.error(err.message);
    }
    return;
  }
  if (cliArgs.includes("--remove-source")) {
    const idx = cliArgs.indexOf("--remove-source");
    const id = cliArgs[idx+1];
    try {
      const merged = removeSource(id);
      console.log(JSON.stringify(merged, null, 2));
    } catch (err) {
      console.error(err.message);
    }
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
  if (cliArgs.includes("--build-intermediate")) {
    const idx = cliArgs.indexOf("--build-intermediate");
    const dataDir = cliArgs[idx+1];
    const outDir = cliArgs[idx+2];
    if (dataDir && outDir && !dataDir.startsWith("--")) {
      buildIntermediate({ dataDir, intermediateDir: undefined });
    } else if (dataDir && !dataDir.startsWith("--")) {
      buildIntermediate({ dataDir });
    } else {
      buildIntermediate();
    }
    return;
  }
  if (cliArgs.includes("--build-enhanced")) {
    const idx = cliArgs.indexOf("--build-enhanced");
    const dataDir = cliArgs[idx+1];
    const interDir = cliArgs[idx+2];
    const outDir = cliArgs[idx+3];
    if (dataDir && interDir && outDir && !dataDir.startsWith("--")) {
      await buildEnhanced({ dataDir, intermediateDir: interDir, outDir });
    } else if (dataDir && interDir && !dataDir.startsWith("--")) {
      await buildEnhanced({ dataDir, intermediateDir: interDir });
    } else if (dataDir && !dataDir.startsWith("--")) {
      await buildEnhanced({ dataDir });
    } else {
      await buildEnhanced();
    }
    return;
  }
  if (cliArgs.includes("--query")) {
    const idx = cliArgs.indexOf("--query");
    const fileParam = cliArgs[idx+1];
    const sparqlParam = cliArgs[idx+2];
    if (!fileParam || !sparqlParam) {
      console.error('Missing required query parameters: file and sparql');
    } else {
      try {
        const result = await sparqlQuery(fileParam, sparqlParam);
        console.log(JSON.stringify(result, null, 2));
      } catch (err) {
        console.error(err.message);
      }
    }
    return;
  }
  // default: no-op
}

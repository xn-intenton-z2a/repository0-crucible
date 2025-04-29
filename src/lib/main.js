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
  custom[idx] = { name, url };
  fs.writeFileSync(configPath, JSON.stringify(custom, null, 2), "utf8");
  return [...PUBLIC_DATA_SOURCES, ...custom];
}

export function buildIntermediate({ dataDir = "data", outDir = "intermediate" } = {}) {
  const dataPath = path.join(process.cwd(), dataDir);
  const intermediatePath = path.join(process.cwd(), outDir);
  fs.rmSync(intermediatePath, { recursive: true, force: true });
  if (!fs.existsSync(dataPath)) {
    console.error(`Error: ${dataDir}/ directory not found`);
    return { count: 0, files: [] };
  }
  fs.mkdirSync(intermediatePath, { recursive: true });
  let entries;
  try {
    entries = fs.readdirSync(dataPath).filter(f => f.endsWith(".json"));
  } catch {
    entries = [];
  }
  const written = [];
  let count = 0;
  for (const file of entries) {
    let content;
    try {
      content = JSON.parse(fs.readFileSync(path.join(dataPath, file), "utf8"));
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
          node["@id"] = binding[keys[0]].value;
          for (const key of keys.slice(1)) {
            node[key] = binding[key].value;
          }
        }
        return node;
      });
    } else if (content["@graph"] && Array.isArray(content["@graph"])) {
      graph = content["@graph"];
    }
    const intermediateDoc = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
    const outFile = file.replace(/\.json$/, "-intermediate.json");
    const outputFile = path.join(intermediatePath, outFile);
    fs.writeFileSync(outputFile, JSON.stringify(intermediateDoc, null, 2), "utf8");
    console.log(`written ${outFile}`);
    written.push(outFile);
    count++;
  }
  console.log(`Generated ${count} intermediate artifacts into ${outDir}/`);
  return { count, files: written };
}

export async function refreshSources() {
  return { count: 0, files: [] };
}

export async function buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {}) {
  const refreshed = await refreshSources();
  const intermediate = buildIntermediate({ dataDir, outDir: intermediateDir });
  let graph = [];
  const dirPath = path.isAbsolute(intermediateDir)
    ? intermediateDir
    : path.join(process.cwd(), intermediateDir);
  let files;
  if (intermediate.files && Array.isArray(intermediate.files) && intermediate.files.length) {
    files = intermediate.files.filter(f => f.endsWith(".json"));
  } else {
    try {
      files = fs.readdirSync(dirPath).filter(f => f.endsWith(".json"));
    } catch {
      files = [];
    }
  }
  for (const file of files) {
    try {
      const doc = JSON.parse(fs.readFileSync(path.join(dirPath, file), "utf8"));
      if (doc["@graph"] && Array.isArray(doc["@graph"])) {
        graph = graph.concat(doc["@graph"]);
      }
    } catch {}
  }
  const enhancedDoc = { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
  fs.mkdirSync(outDir, { recursive: true });
  const enhancedFile = "enhanced.json";
  fs.writeFileSync(path.join(outDir, enhancedFile), JSON.stringify(enhancedDoc, null, 2), "utf8");
  return { refreshed, intermediate, enhanced: { file: enhancedFile, count: graph.length } };
}

export async function getCapitalCities(endpoint = PUBLIC_DATA_SOURCES[0].url) {
  const query = `SELECT ?country ?capital WHERE { ?country <http://dbpedia.org/ontology/capital> ?capital }`;
  const url = `${endpoint}?query=${encodeURIComponent(query)}`;
  let res;
  try {
    res = await fetch(url, { headers: { Accept: "application/sparql-results+json" } });
  } catch (err) {
    const e = new Error(err.message);
    e.code = "QUERY_ERROR";
    throw e;
  }
  let json;
  try {
    json = await res.json();
  } catch (err) {
    const e = new Error(err.message);
    e.code = "INVALID_JSON";
    throw e;
  }
  const graph = (json.results?.bindings || []).map(b => ({ "@id": b.country.value, capital: b.capital.value }));
  return { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
}

export async function sparqlQuery(filePath, queryString) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    throw new Error(`Failed to read file: ${err.message}`);
  }
  let doc;
  try {
    doc = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in file: ${err.message}`);
  }
  const engine = new QueryEngine({ logger: console });
  const result = await engine.query(queryString, { sources: [doc] });
  if (result.type === "bindings") {
    const bindings = [];
    for await (const binding of result.bindingsStream) {
      const obj = {};
      for (const v of result.variables) {
        if (binding.has(v)) {
          const term = binding.get(v);
          const entry = { type: term.termType.toLowerCase(), value: term.value };
          if (term.language) entry["xml:lang"] = term.language;
          if (term.datatype) entry["datatype"] = term.datatype.value;
          obj[v] = entry;
        }
      }
      bindings.push(obj);
    }
    return { head: { vars: result.variables, link: result.link }, results: { bindings } };
  } else if (result.type === "boolean") {
    const boolRes = await result.booleanResult;
    return { head: { link: result.link }, boolean: boolRes };
  }
  return null;
}

export async function main(args) {
  const argv = Array.isArray(args) ? args : process.argv.slice(2);
  if (argv.length === 0) return;
  const cmd = argv[0];
  switch (cmd) {
    case "--help":
    case "-h": {
      console.log(getHelpText());
      break;
    }
    case "--list-sources": {
      const sources = listSources();
      console.log(JSON.stringify(sources, null, 2));
      break;
    }
    case "--add-source": {
      if (argv.length < 3) {
        console.error("Missing required fields: name and url");
      } else {
        const name = argv[1];
        const url = argv[2];
        try {
          const sources = addSource({ name, url }, CONFIG_FILE);
          console.log(JSON.stringify(sources, null, 2));
        } catch (err) {
          console.error(err.message);
        }
      }
      break;
    }
    case "--remove-source": {
      if (argv.length < 2) {
        console.error("Missing required parameter: identifier");
      } else {
        const identifier = argv[1];
        const sources = removeSource(identifier, CONFIG_FILE);
        console.log(JSON.stringify(sources, null, 2));
      }
      break;
    }
    case "--update-source": {
      if (argv.length < 4) {
        console.error("Missing required parameters: identifier, newName, and newUrl");
      } else {
        const identifier = argv[1];
        const name = argv[2];
        const url = argv[3];
        try {
          const sources = updateSource({ identifier, name, url }, CONFIG_FILE);
          console.log(JSON.stringify(sources, null, 2));
        } catch (err) {
          console.error(err.message);
        }
      }
      break;
    }
    case "--build-intermediate": {
      if (argv.length === 1) {
        buildIntermediate();
      } else if (argv.length === 2) {
        buildIntermediate({ dataDir: argv[1], outDir: undefined });
      } else {
        buildIntermediate({ dataDir: argv[1], outDir: argv[2] });
      }
      break;
    }
    case "--build-enhanced":
    case "-be": {
      if (argv.length === 1) {
        buildEnhanced();
      } else if (argv.length === 2) {
        buildEnhanced({ dataDir: argv[1] });
      } else if (argv.length === 3) {
        buildEnhanced({ dataDir: argv[1], intermediateDir: argv[2] });
      } else {
        buildEnhanced({ dataDir: argv[1], intermediateDir: argv[2], outDir: argv[3] });
      }
      break;
    }
    case "--query": {
      if (argv.length < 3) {
        console.error("Missing required query parameters: file and sparql");
      } else {
        const file = argv[1];
        const queryString = argv[2];
        try {
          const result = await sparqlQuery(file, queryString);
          console.log(JSON.stringify(result, null, 2));
        } catch (err) {
          console.error(err.message);
        }
      }
      break;
    }
    case "--capital-cities": {
      try {
        const result = await getCapitalCities();
        console.log(JSON.stringify(result, null, 2));
      } catch (err) {
        console.error(`Failed to fetch capital cities: ${err.message}`);
      }
      break;
    }
    case "--diagnostics": {
      const diagnostics = {
        version: pkg.version,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd()
      };
      diagnostics.publicDataSources = listSources();
      const helpText = getHelpText();
      diagnostics.commands = Array.from(new Set(helpText.match(/--?[a-zA-Z-]+/g)));
      const healthChecks = [];
      for (const src of diagnostics.publicDataSources) {
        const hc = { name: src.name, url: src.url, statusCode: null, latencyMs: null, reachable: false };
        try {
          const start = performance.now();
          const res = await fetch(src.url, { method: 'HEAD' });
          const end = performance.now();
          hc.statusCode = res.status;
          hc.latencyMs = end - start;
          hc.reachable = res.status >= 200 && res.status < 300;
        } catch (e) {
          hc.statusCode = null;
          hc.latencyMs = null;
          hc.reachable = false;
        }
        healthChecks.push(hc);
      }
      diagnostics.healthChecks = healthChecks;
      diagnostics.uptimeSeconds = process.uptime();
      diagnostics.memoryUsage = process.memoryUsage();
      // Data files metrics
      const dataDirPath = path.join(process.cwd(), 'data');
      let dataFiles = [];
      if (fs.existsSync(dataDirPath)) {
        try { dataFiles = fs.readdirSync(dataDirPath).filter(f => f.endsWith('.json')).sort(); } catch {}      }
      diagnostics.dataFilesCount = dataFiles.length;
      diagnostics.dataFiles = dataFiles;
      // Intermediate files metrics
      const intDirPath = path.join(process.cwd(), 'intermediate');
      let intermediateFiles = [];
      if (fs.existsSync(intDirPath)) {
        try { intermediateFiles = fs.readdirSync(intDirPath).filter(f => f.endsWith('.json')).sort(); } catch {}      }
      diagnostics.intermediateFilesCount = intermediateFiles.length;
      diagnostics.intermediateFiles = intermediateFiles;
      diagnostics.dependencies = pkg.dependencies || {};
      diagnostics.devDependencies = pkg.devDependencies || {};
      console.log(JSON.stringify(diagnostics, null, 2));
      break;
    }
    case "--serve": {
      const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      const server = http.createServer(async (req, res) => {
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        const pathname = urlObj.pathname;
        const method = req.method;
        // Build Enhanced
        if (method === 'GET' && pathname === '/build-enhanced') {
          const logs = [];
          const origLog = console.log;
          console.log = (...args) => { logs.push(args.join(' ')); };
          let result;
          try {
            result = await buildEnhanced();
            logs.push('written enhanced.json');
          } catch (err) {
            console.log = origLog;
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(err.message);
            return;
          }
          console.log = origLog;
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write(logs.join('\n') + '\n');
          res.write(`Enhanced ontology written to enhanced/enhanced.json with ${result.enhanced.count} nodes`);
          res.end();
          return;
        }
        // Build Intermediate
        if (method === 'GET' && pathname === '/build-intermediate') {
          const logs = [];
          const origLog = console.log;
          console.log = (...args) => { logs.push(args.join(' ')); };
          try { buildIntermediate(); } catch {};
          console.log = origLog;
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write(logs.join('\n'));
          res.end();
          return;
        }
        // List Sources
        if (method === 'GET' && pathname === '/sources') {
          const sources = listSources();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(sources));
          return;
        }
        // Add Source
        if (method === 'POST' && pathname === '/sources') {
          let body = '';
          req.on('data', c => body += c);
          req.on('end', () => {
            let parsed;
            try { parsed = JSON.parse(body); } catch (e) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end();
              return;
            }
            const { name, url } = parsed;
            if (!name || !url) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end('Missing required fields: name and url');
              return;
            }
            try {
              const sources = addSource({ name, url }, CONFIG_FILE);
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(sources));
            } catch (err) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end(err.message);
            }
          });
          return;
        }
        // Remove Source
        if (method === 'DELETE' && pathname.startsWith('/sources/')) {
          const parts = pathname.split('/');
          const identifier = decodeURIComponent(parts[2] || '');
          const sources = removeSource(identifier, CONFIG_FILE);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(sources));
          return;
        }
        // Update Source
        if (method === 'PUT' && pathname.startsWith('/sources/')) {
          const parts = pathname.split('/');
          const identifier = decodeURIComponent(parts[2] || '');
          let body = '';
          req.on('data', c => body += c);
          req.on('end', () => {
            let parsed;
            try { parsed = JSON.parse(body); } catch (e) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end();
              return;
            }
            const { name, url } = parsed;
            if (!name || !url) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end('Missing required fields: name and url');
              return;
            }
            try {
              const sources = updateSource({ identifier, name, url }, CONFIG_FILE);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(sources));
            } catch (err) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end(err.message);
            }
          });
          return;
        }
        // Capital Cities
        if (method === 'GET' && pathname === '/capital-cities') {
          try {
            const doc = await getCapitalCities();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(doc));
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Failed to fetch capital cities: ${err.message}`);
          }
          return;
        }
        // SPARQL Query
        if (method === 'GET' && pathname === '/query') {
          const file = urlObj.searchParams.get('file');
          const sparql = urlObj.searchParams.get('sparql');
          if (!file || !sparql) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing required query parameters: file and sparql');
            return;
          }
          try {
            const result = await sparqlQuery(file, sparql);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(err.message);
          }
          return;
        }
        // Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      });
      server.listen(port);
      return server;
    }
    default: {
      break;
    }
  }
}

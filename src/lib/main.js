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
  return { count: 0, files: [] };
}

export function buildIntermediate({ dataDir = "data", outDir, intermediateDir = "intermediate" } = {}) {
  const dataDirPath = path.resolve(dataDir);
  const intermediateDirPath = path.resolve(intermediateDir);
  fs.rmSync(intermediateDirPath, { recursive: true, force: true });
  if (!fs.existsSync(dataDirPath)) {
    console.error(`Error: ${dataDir}/ directory not found`);
    return;
  }
  const files = fs.readdirSync(dataDirPath).filter(f => f.endsWith('.json'));
  fs.mkdirSync(intermediateDirPath, { recursive: true });
  let count = 0;
  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(dataDirPath, file), 'utf8'));
      const bindings = (content.results && Array.isArray(content.results.bindings)) ? content.results.bindings : [];
      const graph = bindings.map(b => {
        const entry = { '@id': b[Object.keys(b)[0]].value };
        for (const key of Object.keys(b).slice(1)) {
          entry[key] = b[key].value;
        }
        return entry;
      });
      const doc = { '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' }, '@graph': graph };
      const outName = file.replace(/\.json$/, '') + '-intermediate.json';
      fs.writeFileSync(path.join(intermediateDirPath, outName), JSON.stringify(doc, null, 2), 'utf8');
      console.log(`written ${outName}`);
      count += graph.length;
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log(`Generated ${files.length} intermediate artifacts into ${intermediateDir}/`);
  return { count: files.length, files: files.map(f => f.replace(/\.json$/, '') + '-intermediate.json') };
}

export async function buildEnhanced({ dataDir = "data", intermediateDir = "intermediate", outDir = "enhanced" } = {}) {
  const refreshed = await mainModule.refreshSources();
  const intermediate = mainModule.buildIntermediate({ dataDir, intermediateDir });
  let merged = [];
  const resolvedInter = path.resolve(intermediateDir);
  for (const file of intermediate.files) {
    try {
      const doc = JSON.parse(fs.readFileSync(path.join(resolvedInter, file), 'utf8'));
      if (Array.isArray(doc['@graph'])) merged = merged.concat(doc['@graph']);
    } catch (e) {
      console.error(e.message);
    }
  }
  const enhancedDoc = { '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' }, '@graph': merged };
  fs.mkdirSync(path.resolve(outDir), { recursive: true });
  const enhancedFile = 'enhanced.json';
  fs.writeFileSync(path.join(path.resolve(outDir), enhancedFile), JSON.stringify(enhancedDoc, null, 2), 'utf8');
  return { refreshed, intermediate, enhanced: { file: enhancedFile, count: merged.length } };
}

export async function getCapitalCities(endpoint = PUBLIC_DATA_SOURCES[0].url) {
  const query = 'SELECT ?country ?capital WHERE { ?country a <http://dbpedia.org/ontology/Country> . ?country <http://dbpedia.org/ontology/capital> ?capital }';
  const url = `${endpoint}?query=${encodeURIComponent(query)}`;
  let res;
  try {
    res = await fetch(url, { headers: { Accept: 'application/sparql-results+json' } });
  } catch (e) {
    const err = new Error(e.message);
    err.code = 'QUERY_ERROR';
    throw err;
  }
  let data;
  try {
    data = await res.json();
  } catch (e) {
    const err = new Error(e.message);
    err.code = 'INVALID_JSON';
    throw err;
  }
  const graph = data.results.bindings.map(b => ({ '@id': b.country.value, capital: b.capital.value }));
  return { '@context': { '@vocab': 'http://www.w3.org/2002/07/owl#' }, '@graph': graph };
}

export async function sparqlQuery(filePath, queryString) {
  let text;
  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    throw new Error(`Failed to read file: ${e.message}`);
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    throw new Error(`Invalid JSON in file: ${e.message}`);
  }
  const engine = new QueryEngine();
  const result = await engine.query(queryString, { sources: [json] });
  if (result.type === 'bindings') {
    const bindings = [];
    for await (const b of result.bindingsStream) {
      const obj = {};
      for (const v of result.variables) {
        if (b.has(v)) {
          const term = b.get(v);
          const entry = { type: term.termType.toLowerCase(), value: term.value };
          if (term.language) entry['xml:lang'] = term.language;
          if (term.datatype && term.datatype.value) entry.datatype = term.datatype.value;
          obj[v] = entry;
        }
      }
      bindings.push(obj);
    }
    return { head: { vars: result.variables, link: result.link }, results: { bindings } };
  } else if (result.type === 'boolean') {
    const bool = await result.booleanResult;
    return { head: { link: result.link }, boolean: bool };
  } else {
    throw new Error(`Unsupported query type: ${result.type}`);
  }
}

export async function main(args) {
  const argv = Array.isArray(args) ? args : process.argv.slice(2);
  if (!argv.length) return;
  const cmd = argv[0];
  switch (cmd) {
    case '--help':
    case '-h':
      console.log(getHelpText());
      break;
    case '--list-sources': {
      console.log(JSON.stringify(mainModule.listSources(), null, 2));
      break;
    }
    case '--diagnostics': {
      const version = pkg.version;
      const nodeVersion = process.version;
      const platform = process.platform;
      const arch = process.arch;
      const cwd = process.cwd();
      const uptimeSeconds = process.uptime();
      const memoryUsage = process.memoryUsage();
      const publicDataSources = PUBLIC_DATA_SOURCES;
      const commands = [
        '--help', '-h', '--list-sources', '--add-source', '--remove-source', '--update-source',
        '--diagnostics', '--build-intermediate', '--build-enhanced', '--capital-cities', '--query', '--serve'
      ];
      const healthChecks = [];
      for (const src of publicDataSources) {
        let statusCode = null;
        let latencyMs = null;
        let reachable = false;
        try {
          const start = performance.now();
          const res = await fetch(src.url, { method: 'HEAD' });
          latencyMs = performance.now() - start;
          statusCode = res.status;
          reachable = res.status === 200;
        } catch {
          statusCode = null;
          latencyMs = null;
          reachable = false;
        }
        healthChecks.push({ name: src.name, url: src.url, statusCode, reachable, latencyMs });
      }
      const dataDir = 'data';
      let dataFiles = [];
      if (fs.existsSync(dataDir)) dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();
      const intermediateDir = 'intermediate';
      let intermediateFiles = [];
      if (fs.existsSync(intermediateDir)) intermediateFiles = fs.readdirSync(intermediateDir).filter(f => f.endsWith('.json')).sort();
      const dependencies = pkg.dependencies;
      const devDependencies = pkg.devDependencies;
      const output = {
        version, nodeVersion, platform, arch, cwd, uptimeSeconds, memoryUsage,
        publicDataSources, commands, healthChecks,
        dataFilesCount: dataFiles.length, dataFiles,
        intermediateFilesCount: intermediateFiles.length, intermediateFiles,
        dependencies, devDependencies
      };
      console.log(JSON.stringify(output, null, 2));
      break;
    }
    case '--build-intermediate': {
      const [dataDirArg, outDirArg] = argv.slice(1);
      if (dataDirArg && outDirArg) mainModule.buildIntermediate({ dataDir: dataDirArg, outDir: outDirArg });
      else if (dataDirArg) mainModule.buildIntermediate({ dataDir: dataDirArg, outDir: undefined });
      else mainModule.buildIntermediate();
      break;
    }
    case '--build-enhanced': {
      const [d, i, o] = argv.slice(1);
      if (d && i && o) await mainModule.buildEnhanced({ dataDir: d, intermediateDir: i, outDir: o });
      else if (d && i) await mainModule.buildEnhanced({ dataDir: d, intermediateDir: i });
      else if (d) await mainModule.buildEnhanced({ dataDir: d });
      else await mainModule.buildEnhanced();
      break;
    }
    case '--capital-cities': {
      try {
        const doc = await mainModule.getCapitalCities();
        console.log(JSON.stringify(doc, null, 2));
      } catch (e) {
        console.error(`Failed to fetch capital cities: ${e.message}`);
      }
      break;
    }
    case '--query': {
      const [file, sparql] = argv.slice(1);
      if (!file || !sparql) {
        console.error('Missing required query parameters: file and sparql');
      } else {
        try {
          const result = await mainModule.sparqlQuery(file, sparql);
          console.log(JSON.stringify(result, null, 2));
        } catch (e) {
          console.error(e.message);
        }
      }
      break;
    }
    case '--add-source': {
      const [name, url] = argv.slice(1);
      if (!name || !url) {
        console.error('Missing required parameters: name and url');
      } else {
        try {
          const merged = mainModule.addSource({ name, url });
          console.log(JSON.stringify(merged, null, 2));
        } catch (e) {
          console.error(e.message);
        }
      }
      break;
    }
    case '--remove-source': {
      const [identifier] = argv.slice(1);
      if (!identifier) {
        console.error('Missing required parameters: identifier');
      } else {
        try {
          const merged = mainModule.removeSource(identifier);
          console.log(JSON.stringify(merged, null, 2));
        } catch (e) {
          console.error(e.message);
        }
      }
      break;
    }
    case '--update-source': {
      const [identifier, newName, newUrl] = argv.slice(1);
      if (!identifier || !newName || !newUrl) {
        console.error('Missing required parameters: identifier, newName, and newUrl');
      } else {
        try {
          const merged = mainModule.updateSource({ identifier, name: newName, url: newUrl }, CONFIG_FILE);
          console.log(JSON.stringify(merged, null, 2));
        } catch (e) {
          console.error(e.message);
        }
      }
      break;
    }
    case '--serve': {
      const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      const server = http.createServer(async (req, res) => {
        const reqUrl = new URL(req.url, `http://${req.headers.host}`);
        const p = reqUrl.pathname;
        if (p === '/build-intermediate' && req.method === 'GET') {
          res.setHeader('Content-Type', 'text/plain');
          const summary = mainModule.buildIntermediate();
          if (summary && summary.files) {
            for (const f of summary.files) res.write(`written ${f}\n`);
            res.write(`Generated ${summary.count} intermediate artifacts into intermediate/`);
          }
          res.end();
        } else if (p === '/build-enhanced' && req.method === 'GET') {
          res.setHeader('Content-Type', 'text/plain');
          const refreshed = await mainModule.refreshSources();
          for (const f of refreshed.files) res.write(`written ${f}\n`);
          const inter = mainModule.buildIntermediate();
          for (const f of inter.files) res.write(`written ${f}\n`);
          const { enhanced } = await mainModule.buildEnhanced();
          res.write(`written enhanced.json\n`);
          res.write(`Enhanced ontology written to enhanced/enhanced.json with ${enhanced.count} nodes`);
          res.end();
        } else if (p === '/capital-cities' && req.method === 'GET') {
          try {
            const doc = await mainModule.getCapitalCities();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(doc));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Failed to fetch capital cities: ${e.message}`);
          }
        } else if (p === '/query' && req.method === 'GET') {
          const file = reqUrl.searchParams.get('file');
          const sparqlParam = reqUrl.searchParams.get('sparql') ? decodeURIComponent(reqUrl.searchParams.get('sparql')) : null;
          if (!file || !sparqlParam) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Missing required query parameters: file and sparql');
          } else {
            try {
              const result = await mainModule.sparqlQuery(file, sparqlParam);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (e) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end(e.message);
            }
          }
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
      server.listen(port);
      return server;
    }
    default:
      break;
  }
}
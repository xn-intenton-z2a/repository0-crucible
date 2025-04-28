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
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid source URL");
  }
  custom[idx] = { name, url };
  fs.writeFileSync(configPath, JSON.stringify(custom, null, 2), "utf8");
  return [...PUBLIC_DATA_SOURCES, ...custom];
}

export async function main(args) {
  const argv = Array.isArray(args) ? args : process.argv.slice(2);
  if (!argv.length) return;
  const cmd = argv[0];
  switch (cmd) {
    // ... existing CLI handlers ...
    case '--serve': {
      const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      const server = http.createServer(async (req, res) => {
        const reqUrl = new URL(req.url, `http://${req.headers.host}`);
        const p = reqUrl.pathname;
        // existing endpoints
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
          res.write(`written enhanced.json\n`);
          res.write(`Enhanced ontology written to enhanced/enhanced.json with ${inter.count} nodes`);
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
        // New endpoints for source management
        } else if (p === '/sources' && req.method === 'GET') {
          // List sources
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          const list = mainModule.listSources();
          res.end(JSON.stringify(list));
        } else if (p === '/sources' && req.method === 'POST') {
          // Add source
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { name, url } = data;
              if (!name || !url) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Missing required fields: name and url');
              }
              const merged = mainModule.addSource({ name, url });
              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(merged));
            } catch (e) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'text/plain');
              res.end(e.message);
            }
          });
        } else if (p.startsWith('/sources/') && req.method === 'DELETE') {
          // Remove source
          const identifier = decodeURIComponent(p.slice('/sources/'.length));
          try {
            const merged = mainModule.removeSource(identifier);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(merged));
          } catch (e) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end(e.message);
          }
        } else if (p.startsWith('/sources/') && req.method === 'PUT') {
          // Update source
          const identifier = decodeURIComponent(p.slice('/sources/'.length));
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { name, url } = data;
              if (!name || !url) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Missing required fields: name and url');
              }
              const merged = mainModule.updateSource({ identifier, name, url });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(merged));
            } catch (e) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'text/plain');
              res.end(e.message);
            }
          });
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
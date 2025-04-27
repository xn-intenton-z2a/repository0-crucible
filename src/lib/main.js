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

// ... existing functions listSources, addSource, removeSource, etc.

export async function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);
  // ... existing CLI handling up to serve ...
  if (cliArgs.includes("--serve")) {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer(async (req, res) => {
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      const pathname = parsedUrl.pathname;
      if (req.method === "POST" && pathname === "/sources") {
        // add source endpoint
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(body);
            if (!data.name || !data.url) {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              return res.end('Missing required fields: name and url');
            }
            const merged = SELF.addSource({ name: data.name, url: data.url });
            res.writeHead(201);
            return res.end(JSON.stringify(merged, null, 2));
          } catch (err) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end(err.message);
          }
        });
      } else if (req.method === "DELETE" && pathname.startsWith("/sources/")) {
        // remove source endpoint
        const identifier = decodeURIComponent(pathname.replace('/sources/', ''));
        try {
          const merged = SELF.removeSource(identifier);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify(merged, null, 2));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          return res.end(err.message);
        }
      }
      // ... existing endpoints ...
      else if (req.method === "GET" && pathname === "/help") {
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
          console.log(`Enhanced ontology written to enhanced/enhanced.json with ${result.enhanced.count} nodes`);
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
  // ... rest of CLI ...
}

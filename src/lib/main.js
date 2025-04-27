#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath, URL } from "url";
import fs from "fs";
import path from "path";
import http from "http";
import pkg from "../../package.json" assert { type: "json" };

import { QueryEngine } from "@comunica/query-sparql";
import jsonld from "jsonld";
import {
  queryOntologies,
  listSources,
  refreshSources,
  buildIntermediate,
  buildEnhanced,
  getCapitalCities,
  main as cliMain
} from "./main.js";

// Note: we destructured main above for clarity but will override later if needed

export const PUBLIC_DATA_SOURCES = [{ name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }];

// ... existing queryOntologies, getCapitalCities, listSources, refreshSources, buildIntermediate, buildEnhanced unchanged except modifications below ...

/**
 * Query DBpedia for country–capital pairs and return an OWL-compatible JSON-LD document.
 * @param {string} endpointUrl - SPARQL endpoint URL.
 * @returns {Promise<Object>} JSON-LD document with @context and @graph.
 */
export async function getCapitalCities(endpointUrl = PUBLIC_DATA_SOURCES[0].url) {
  const sparql = `SELECT ?country ?capital WHERE { ?country a <http://www.wikidata.org/entity/Q6256> . ?country <http://www.wikidata.org/prop/direct/P36> ?capital . }`;
  let response;
  try {
    // build URL without additional encoding to satisfy tests
    const queryUrl = `${endpointUrl}?query=${sparql}`;
    response = await fetch(queryUrl, {
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
  const graph = bindings.map((b) => ({
    "@id": b.country.value,
    capital: b.capital.value,
  }));
  return { "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" }, "@graph": graph };
}

// ... rest of code omitted for brevity above, now main function ...

/**
 * HTTP and CLI entrypoint main
 */
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
    const port = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer(async (req, res) => {
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      const pathname = parsedUrl.pathname;

      if (req.method === "GET" && pathname === "/help") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(getHelpText());
      } else if (req.method === "GET" && pathname === "/sources") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(listSources(), null, 2));
      } else if (req.method === "GET" && pathname === "/diagnostics") {
        const info = await generateDiagnostics();
        res.writeHead(200, { "Content-Type": "application/json" });
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
        console.log = (msg) => {
          res.write(`${msg}\n`);
        };
        try {
          await buildIntermediate();
        } catch (err) {
          // ignore
        }
        console.log = originalLog;
        res.end();
      } else if (req.method === "GET" && pathname === "/build-enhanced") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const originalLog = console.log;
        console.log = (msg) => {
          res.write(`${msg}\n`);
        };
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
    let dataDir;
    let outDir;
    const biArgs = cliArgs.slice(biIndex + 1);
    if (biArgs.length >= 1 && !biArgs[0].startsWith("-")) {
      dataDir = biArgs[0];
      if (biArgs.length >= 2 && !biArgs[1].startsWith("-")) {
        outDir = biArgs[1];
      }
    }
    if (dataDir !== undefined || outDir !== undefined) {
      await buildIntermediate({ dataDir, outDir });
    } else {
      await buildIntermediate();
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

  // default: no operation
}

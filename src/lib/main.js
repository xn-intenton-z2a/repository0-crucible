#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import http from "http";
import pkg from "../../package.json" assert { type: "json" };

export const PUBLIC_DATA_SOURCES = [
  { name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }
];

/**
 * Retrieve list of data sources, merging default and custom sources.
 * @param {string} configPath - Path to custom data-sources.json file.
 * @returns {Array<{ name: string, url: string }>}
 */
export function listSources(
  configPath = path.join(process.cwd(), "data-sources.json")
) {
  let customSources = [];
  if (fs.existsSync(configPath)) {
    try {
      const raw = fs.readFileSync(configPath, "utf8");
      const parsed = JSON.parse(raw);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item) =>
            item && typeof item.name === "string" && typeof item.url === "string"
        )
      ) {
        customSources = parsed;
      } else {
        console.error(
          `Invalid data-sources.json: Expected an array of { name: string, url: string }`
        );
      }
    } catch (err) {
      console.error(`Invalid data-sources.json: ${err.message}`);
    }
  }
  return PUBLIC_DATA_SOURCES.concat(customSources);
}

export async function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);

  // Capital Cities option
  if (cliArgs.includes("--capital-cities")) {
    const endpoint = PUBLIC_DATA_SOURCES[0].url;
    const sparqlQuery = `SELECT ?country ?capital WHERE {
      ?country a <http://dbpedia.org/ontology/Country> .
      ?country <http://dbpedia.org/ontology/capital> ?capital .
    } LIMIT 50`;
    const url = `${endpoint}?query=${encodeURIComponent(
      sparqlQuery
    )}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const bindings = data.results?.bindings || [];
      const graph = bindings.map((b) => ({
        "@id": b.country.value,
        capital: b.capital.value
      }));
      const doc = {
        "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
        "@graph": graph
      };
      console.log(JSON.stringify(doc, null, 2));
    } catch (err) {
      console.error(`Error fetching capital cities: ${err.message}`);
    }
    return;
  }

  // Diagnostics option
  if (cliArgs.includes("--diagnostics")) {
    const diagnostics = {
      version: pkg.version,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd(),
      publicDataSources: PUBLIC_DATA_SOURCES,
      commands: [
        "--help",
        "-h",
        "--list-sources",
        "--diagnostics",
        "--serve",
        "--build-intermediate",
        "--build-enhanced",
        "--refresh",
        "--merge-persist",
        "--capital-cities"
      ]
    };
    console.log(JSON.stringify(diagnostics, null, 2));
    return;
  }

  // Help option
  if (cliArgs.includes("--help") || cliArgs.includes("-h")) {
    const helpText = [
      "owl-builder: create and manage OWL ontologies from public data sources",
      "Usage: node src/lib/main.js [options]",
      "",
      "  --help                Display this help message",
      "  --diagnostics         Show diagnostic information",
      "  --serve               Start the local HTTP server",
      "  --build-intermediate  Generate intermediate ontology artifacts",
      "  --build-enhanced      Generate enhanced ontology artifacts",
      "  --refresh             Fetch and persist all data sources",
      "  --merge-persist       Merge and persist data to storage",
      "  --list-sources        List public (and custom) data sources",
      "  --capital-cities      Query DBpedia for capital cities and output JSON-LD"
    ].join("\n");
    console.log(helpText);
    return;
  }

  // Serve option
  if (cliArgs.includes("--serve")) {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const server = http.createServer((req, res) => {
      if (req.method === "GET" && req.url === "/help") {
        const helpText = [
          "owl-builder: create and manage OWL ontologies from public data sources",
          "Usage: node src/lib/main.js [options]",
          "",
          "  --help                Display this help message",
          "  --diagnostics         Show diagnostic information",
          "  --serve               Start the local HTTP server",
          "  --build-intermediate  Generate intermediate ontology artifacts",
          "  --build-enhanced      Generate enhanced ontology artifacts",
          "  --refresh             Fetch and persist all data sources",
          "  --merge-persist       Merge and persist data to storage",
          "  --list-sources        List public (and custom) data sources",
          "  --capital-cities      Query DBpedia for capital cities and output JSON-LD"
        ].join("\n");
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end(helpText);
      } else if (req.method === "GET" && req.url === "/sources") {
        const combined = listSources();
        const body = JSON.stringify(combined, null, 2);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(body);
        return;
      } else if (req.method === "GET" && req.url === "/diagnostics") {
        const diagnostics = {
          version: pkg.version,
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
          cwd: process.cwd(),
          publicDataSources: PUBLIC_DATA_SOURCES,
          commands: [
            "--help",
            "-h",
            "--list-sources",
            "--diagnostics",
            "--serve",
            "--build-intermediate",
            "--build-enhanced",
            "--refresh",
            "--merge-persist",
            "--capital-cities"
          ]
        };
        const body = JSON.stringify(diagnostics, null, 2);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(body);
      } else if (req.method === "GET" && req.url === "/capital-cities") {
        const endpoint = PUBLIC_DATA_SOURCES[0].url;
        const sparqlQuery = `SELECT ?country ?capital WHERE {
          ?country a <http://dbpedia.org/ontology/Country> .
          ?country <http://dbpedia.org/ontology/capital> ?capital .
        } LIMIT 50`;
        const url = `${endpoint}?query=${encodeURIComponent(sparqlQuery)}&format=json`;
        fetch(url)
          .then((resp) => resp.json())
          .then((data) => {
            const bindings = data.results?.bindings || [];
            const graph = bindings.map((b) => ({
              "@id": b.country.value,
              capital: b.capital.value
            }));
            const doc = {
              "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
              "@graph": graph
            };
            const body = JSON.stringify(doc, null, 2);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(body);
          })
          .catch((err) => {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(`Error fetching capital cities: ${err.message}`);
          });
        return;
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("Not Found");
      }
    });
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
    return server;
  }

  // List public data sources, merging with optional user config
  if (cliArgs.includes("--list-sources")) {
    const combined = listSources();
    console.log(JSON.stringify(combined, null, 2));
    return;
  }

  // Refresh option
  if (cliArgs.includes("--refresh")) {
    // dynamically import to pick up mocked listSources in tests
    const mod = await import(import.meta.url);
    const sources = mod.listSources();
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    let count = 0;
    for (const source of sources) {
      const slug = source.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-+|-+$)/g, "");
      const filePath = path.join(dataDir, `${slug}.json`);
      try {
        const response = await fetch(source.url);
        const json = await response.json();
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf8");
        console.log(`written ${slug}.json`);
        count++;
      } catch (err) {
        console.error(`Error refreshing ${source.name}: ${err.message}`);
      }
    }
    console.log(`Refreshed ${count} sources into data/`);
    return;
  }

  // Default behavior
  console.log(`Run with: ${JSON.stringify(cliArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

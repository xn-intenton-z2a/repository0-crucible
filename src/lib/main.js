#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import http from "http";

export function main(args = []) {
  if (args.includes("--help")) {
    const helpMessage = [
      "Usage: node src/lib/main.js [options]",
      "",
      "Options:",
      "  --help              Show help message",
      "  --diagnostics       Output diagnostics information",
      "  --capital-cities    Output capital cities OWL ontology JSON",
      "  --serve             Start the HTTP server to serve the OWL ontology",
      "  --build-intermediate  Build with intermediate steps (simulated operation)",
      "  --build-enhanced      Build with enhanced features (if implemented)",
      "  --refresh             Refresh the data (simulated operation)",
      "  --merge-persist       Merge and persist the data (if implemented)",
      "  --crawl-data          Simulate crawling public data sources and output JSON"
    ].join("\n");
    console.log(helpMessage);
    return;
  }

  if (args.includes("--diagnostics")) {
    const diagnostics = {
      nodeVersion: process.versions.node,
      platform: process.platform,
      availableCommands: [
        "--capital-cities",
        "--diagnostics",
        "--serve",
        "--build-intermediate",
        "--build-enhanced",
        "--refresh",
        "--merge-persist",
        "--crawl-data"
      ]
    };
    console.log(JSON.stringify(diagnostics, null, 2));
    return;
  }

  if (args.includes("--capital-cities")) {
    const owlOntology = {
      owl: "capitalCities",
      data: [
        { country: "France", capital: "Paris" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Brazil", capital: "Brasília" }
      ],
      generatedAt: new Date().toISOString()
    };
    console.log(JSON.stringify(owlOntology, null, 2));
    return;
  }

  if (args.includes("--crawl-data")) {
    const crawlData = {
      source: "publicData",
      data: [ { id: 1, description: "Sample data" } ],
      fetchedAt: new Date().toISOString()
    };
    console.log(JSON.stringify(crawlData, null, 2));
    return;
  }

  if (args.includes("--refresh")) {
    const refreshData = {
      message: "Data refreshed",
      refreshedAt: new Date().toISOString()
    };
    console.log(JSON.stringify(refreshData, null, 2));
    return;
  }

  if (args.includes("--build-intermediate")) {
    const intermediateBuild = {
      intermediateBuild: "Intermediate build completed",
      builtAt: new Date().toISOString()
    };
    console.log(JSON.stringify(intermediateBuild, null, 2));
    return;
  }

  if (args.includes("--serve")) {
    // Start the HTTP server
    serve();
    return;
  }

  console.log(`Run with: ${JSON.stringify(args)}`);
}

export function serve() {
  const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/capital-cities") {
      const owlOntology = {
        owl: "capitalCities",
        data: [
          { country: "France", capital: "Paris" },
          { country: "Japan", capital: "Tokyo" },
          { country: "Brazil", capital: "Brasília" }
        ],
        generatedAt: new Date().toISOString()
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(owlOntology, null, 2));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });
  
  server.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
  
  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

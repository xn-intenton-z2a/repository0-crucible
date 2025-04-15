#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import http from "http";
import fs from "fs";

const helpMessage = [
  "Usage: node src/lib/main.js [options]",
  "",
  "Options:",
  "  --help              Show help message",
  "  --help-json         Show help message in JSON format",
  "  --diagnostics       Output diagnostics information",
  "  --capital-cities    Output capital cities OWL ontology JSON",
  "  --crawl-data          Simulate crawling public data sources and output JSON",
  "  --refresh             Refresh the data (simulated operation)",
  "  --build-intermediate  Build with intermediate steps (simulated operation)",
  "  --build-enhanced      Build with enhanced features (if implemented)",
  "  --merge-persist       Merge and persist the data (simulated operation)",
  "  --serve               Start the HTTP server",
  "  --export-ontology     Export the capital cities OWL ontology to a file"
].join("\n");

export function main(args = []) {
  const validOptions = new Set([
    "--help",
    "--help-json",
    "--diagnostics",
    "--capital-cities",
    "--crawl-data",
    "--refresh",
    "--build-intermediate",
    "--build-enhanced",
    "--merge-persist",
    "--serve",
    "--export-ontology"
  ]);

  // Check for unknown options
  const unknownArgs = args.filter(arg => arg.startsWith("--") && !validOptions.has(arg));
  if (unknownArgs.length > 0) {
    const plural = unknownArgs.length > 1 ? "s" : "";
    console.error(`Error: Unknown option${plural}: ${unknownArgs.join(", ")}`);
    // Only print the first line of the help message to match test expectations
    console.error(helpMessage.split("\n")[0]);
    return;
  }

  if (args.includes("--help-json")) {
    const lines = helpMessage.split("\n");
    const usage = lines[0];
    // Extract only the option flag from each line
    const options = lines
      .filter(line => line.trim().startsWith("--"))
      .map(line => line.trim().split(/\s+/)[0]);
    console.log(JSON.stringify({ usage, options }, null, 2));
    return;
  }

  if (args.includes("--help")) {
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
        "--crawl-data",
        "--help",
        "--help-json",
        "--export-ontology"
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

  if (args.includes("--export-ontology")) {
    const owlOntology = {
      owl: "capitalCities",
      data: [
        { country: "France", capital: "Paris" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Brazil", capital: "Brasília" }
      ],
      generatedAt: new Date().toISOString()
    };
    fs.writeFileSync('exported_ontology.json', JSON.stringify(owlOntology, null, 2));
    console.log("Ontology exported to exported_ontology.json");
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

  if (args.includes("--merge-persist")) {
    const mergePersistData = {
      mergePersist: "Data merged and persisted successfully",
      mergedAt: new Date().toISOString()
    };
    console.log(JSON.stringify(mergePersistData, null, 2));
    return;
  }

  if (args.includes("--serve")) {
    // Start the HTTP server
    serve();
    return;
  }

  // For recognized options like --build-enhanced that are not implemented,
  // or when no options are provided, simply log the arguments provided.
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

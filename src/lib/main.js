#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";

export function main(args) {
  console.log(`Run with: ${JSON.stringify(args)}`);
}

export function query(args) {
  // Remove the '--query' flag from the arguments
  const filteredArgs = args.filter(arg => arg !== "--query");
  const filters = {};
  const searchTerms = [];
  
  filteredArgs.forEach(arg => {
    if (arg.includes("=")) {
      const parts = arg.split("=");
      if (parts.length === 2) {
        const [key, value] = parts;
        filters[key] = value;
      } else {
        searchTerms.push(arg);
      }
    } else {
      searchTerms.push(arg);
    }
  });
  
  if (Object.keys(filters).length > 0 && searchTerms.length > 0) {
    console.log(`Querying OWL ontologies for: ${searchTerms.join(" ")} with filters: ${JSON.stringify(filters)}`);
  } else if (Object.keys(filters).length > 0) {
    console.log(`Querying OWL ontologies with filters: ${JSON.stringify(filters)}`);
  } else if (searchTerms.length > 0) {
    console.log(`Querying OWL ontologies for: ${searchTerms.join(" ")}`);
  } else {
    console.log("Querying OWL ontologies (Feature under development)");
  }
}

export function diagnostics(args) {
  console.log("System Diagnostics:");
  console.log(`Node.js version: ${process.version}`);
  // You can add more diagnostic information here if needed
}

export function crawlData(args) {
  console.log("Crawling data from public sources...");
}

/**
 * Generates a dummy OWL ontology in JSON format representing capital cities.
 * @param {string[]} args - Command line arguments
 */
export function generateCapitalCitiesOwl(args) {
  const ontology = {
    type: "owl",
    capitals: [
      { city: "Washington, D.C.", country: "USA" },
      { city: "London", country: "UK" },
      { city: "Tokyo", country: "Japan" }
    ]
  };
  console.log(JSON.stringify(ontology, null, 2));
}

/**
 * Starts an Express server that provides a REST API.
 * @param {string[]} args - Command line arguments
 * @returns {import('http').Server} The server instance.
 */
export function serve(args) {
  const app = express();
  const port = process.env.PORT || 3000;
  app.get("/", (req, res) => {
    res.json({ message: "owl-builder REST API" });
  });
  const server = app.listen(port, () => {
    console.log(`REST API server running on port ${port}`);
  });
  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes("--diagnostics")) {
    diagnostics(args);
  } else if (args.includes("--query")) {
    query(args);
  } else if (args.includes("--crawl")) {
    crawlData(args);
  } else if (args.includes("--capital-cities")) {
    generateCapitalCitiesOwl(args);
  } else if (args.includes("--serve")) {
    serve(args);
  } else {
    main(args);
  }
}

#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export const PUBLIC_DATA_SOURCES = [
  { name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }
];

export function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);

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
      "  --refresh             Refresh source data",
      "  --merge-persist       Merge and persist data to storage"
    ].join("\n");
    console.log(helpText);
    return;
  }

  // List public data sources
  if (cliArgs.includes("--list-sources")) {
    console.log(JSON.stringify(PUBLIC_DATA_SOURCES, null, 2));
    return;
  }

  // Default behavior
  console.log(`Run with: ${JSON.stringify(cliArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

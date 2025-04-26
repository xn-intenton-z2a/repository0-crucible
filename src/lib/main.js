#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export const PUBLIC_DATA_SOURCES = [
  { name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }
];

export function main(args) {
  const cliArgs = args || process.argv.slice(2);
  if (cliArgs.includes("--list-sources")) {
    console.log(JSON.stringify(PUBLIC_DATA_SOURCES, null, 2));
    return;
  }
  console.log(`Run with: ${JSON.stringify(cliArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

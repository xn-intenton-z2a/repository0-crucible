#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export function main(args) {
  console.log(`Run with: ${JSON.stringify(args)}`);
}

export function query(args) {
  console.log("Querying OWL ontologies (Feature under development)");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes("--query")) {
    query(args);
  } else {
    main(args);
  }
}

#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export function main(args = process.argv.slice(2)) {
  if (args.includes("--query-owl")) {
    console.log(JSON.stringify({ result: "Sample OWL query output" }));
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

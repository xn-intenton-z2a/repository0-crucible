#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export function main(args = process.argv.slice(2)) {
  // Handle '--transform' option for JSON-to-OWL transformation
  const transformIndex = args.indexOf("--transform");
  if (transformIndex !== -1) {
    const jsonInput = args[transformIndex + 1];
    let transformedOutput;
    if (jsonInput) {
      try {
        const parsed = JSON.parse(jsonInput);
        transformedOutput = { "owl:transformed": parsed };
      } catch (err) {
        transformedOutput = { result: "Default OWL transformation output" };
      }
    } else {
      transformedOutput = { result: "Default OWL transformation output" };
    }
    console.log(JSON.stringify(transformedOutput));
    return;
  }

  // Handle '--query-owl' option
  const queryIndex = args.indexOf("--query-owl");
  if (queryIndex !== -1) {
    // Check if there is an additional argument after '--query-owl' that does not start with '--'
    const queryParam = args[queryIndex + 1];
    if (queryParam && !queryParam.startsWith("--")) {
      console.log(JSON.stringify({ result: `OWL query output for query: ${queryParam}` }));
    } else {
      console.log(JSON.stringify({ result: "Sample OWL query output" }));
    }
    return;
  }

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

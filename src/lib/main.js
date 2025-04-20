#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { performance } from "perf_hooks";

export function main(args) {
  const startTime = performance.now();
  console.log(`Run with: ${JSON.stringify(args)}`);

  if (args.includes("--replicate")) {
    console.log("Replicating tasks...");
    // Simulate parallel processing by replicating 3 tasks
    for (let i = 1; i <= 3; i++) {
      console.log(`Replicating task ${i}`);
    }
  }

  const endTime = performance.now();
  const executionTime = (endTime - startTime).toFixed(2);
  console.log(`Execution time: ${executionTime} ms`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

/**
 * Main entrypoint for CLI and programmatic invocation.
 * @param {string[]} args - Array of CLI arguments (e.g. process.argv.slice(2)).
 */
export function main(args = process.argv.slice(2)) {
  if (args.includes("--trace-seeds")) {
    const seedsDir = path.resolve(process.cwd(), "seeds");
    console.log("Seed files traceability report:");
    try {
      const files = fs.readdirSync(seedsDir);
      files
        .filter((file) => file.endsWith('.js'))
        .forEach((file) => console.log(file));
    } catch (err) {
      console.error(`Error reading seeds directory: ${err.message}`);
    }
    return;
  }

  // Default behavior
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

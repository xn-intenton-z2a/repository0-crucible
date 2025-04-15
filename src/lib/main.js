#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export function main(args = process.argv.slice(2)) {
  if (args.includes('--help')) {
    console.log(`Usage: node src/lib/main.js [options]

Options:
  --help              Display help information about the CLI tool.
  --diagnostics       Run diagnostics.
  --serve             Start the server.
  --build-intermediate  Build with intermediate options.
  --build-enhanced      Build with enhanced options.
  --refresh           Refresh the application.
  --merge-persist     Merge and persist changes.`);
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export async function main(args = process.argv.slice(2)) {
  if (args.includes('--help')) {
    console.log(`Usage: node src/lib/main.js [options]

Options:
  --help                Display help information about the CLI tool.
  --version             Display the current application version.
  --diagnostics         Run diagnostics.
  --serve               Start the server.
  --build-intermediate  Build with intermediate options.
  --build-enhanced      Build with enhanced options.
  --refresh             Refresh the application.
  --merge-persist       Merge and persist changes.`);
    return;
  }
  
  if (args.includes('--version')) {
    try {
      const pkg = await import("../../package.json", { assert: { type: "json" } });
      console.log(pkg.default?.version || pkg.version);
    } catch (err) {
      console.error('Error loading version:', err);
    }
    return;
  }
  
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

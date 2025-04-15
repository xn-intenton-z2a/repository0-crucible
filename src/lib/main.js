#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export async function main(args = process.argv.slice(2)) {
  if (args.includes('--help')) {
    console.log(`Usage: node src/lib/main.js [options]\n\nOptions:\n  --help                Display help information about the CLI tool.\n  --version             Display the current application version.\n  --diagnostics         Run diagnostics.\n  --serve               Start the server.\n  --build-intermediate  Build with intermediate options.\n  --build-enhanced      Build with enhanced options.\n  --refresh             Refresh the application.\n  --merge-persist       Merge and persist changes.`);
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

  if (args.includes('--diagnostics')) {
    console.log("Diagnostics:");
    console.log("Node Version:", process.version);
    console.log("Executable Path:", process.execPath);
    console.log("Current Working Directory:", process.cwd());
    console.log("Environment Variables:", process.env);
    return;
  }
  
  if (args.includes('--merge-persist')) {
    console.log("Merging and persisting changes...");
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

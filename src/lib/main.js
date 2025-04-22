#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export async function main(args) {
  // Check if the '--version' flag is present
  if (args.includes("--version")) {
    try {
      // Dynamically import package.json with JSON assertion
      const pkgModule = await import("../../package.json", { assert: { type: "json" } });
      const pkg = pkgModule.default || pkgModule;
      console.log(pkg.version);
      return;
    } catch (err) {
      console.error("Error reading version:", err);
      process.exit(1);
    }
  }

  // Check if the '--help' flag is present
  if (args.includes("--help")) {
    const helpMessage = `
CLI Help:
Usage: node src/lib/main.js [options]

Options:
  --help             Display help information.
  --version          Display current version information.
  --diagnostics      Display diagnostics information.
  --capital-cities   Display capital cities data.

Example:
  node src/lib/main.js --help
`;
    console.log(helpMessage.trim());
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

#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

/**
 * Main entrypoint for CLI
 * @param {string[]} [args] CLI arguments (excluding node and script path)
 * @returns {Promise<number>} exit code (0 for success, 1 for error)
 */
export async function main(args) {
  const cliArgs = args ?? process.argv.slice(2);
  if (cliArgs.includes("--diagnostics")) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const pkgPath = join(__dirname, "..", "..", "package.json");
      const pkgContent = readFileSync(pkgPath, "utf-8");
      const pkg = JSON.parse(pkgContent);
      const diagnostic = {
        packageVersion: pkg.version,
        nodeVersion: process.version,
        platform: process.platform,
        dependencies: pkg.dependencies,
      };
      console.log(JSON.stringify(diagnostic, null, 2));
      return 0;
    } catch (error) {
      console.error(`Error reading package.json: ${error.message}`);
      return 1;
    }
  }

  // Placeholder for other subcommands
  console.log(`Run with: ${JSON.stringify(cliArgs)}`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().then((code) => process.exit(code));
}
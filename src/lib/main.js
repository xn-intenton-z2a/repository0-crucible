#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import pkg from "../../package.json" assert { type: "json" };

export const PUBLIC_DATA_SOURCES = [
  { name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }
];

export function main(args) {
  const cliArgs = args !== undefined ? args : process.argv.slice(2);

  // Diagnostics option
  if (cliArgs.includes("--diagnostics")) {
    const diagnostics = {
      version: pkg.version,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd(),
      publicDataSources: PUBLIC_DATA_SOURCES,
      commands: [
        "--help",
        "-h",
        "--list-sources",
        "--diagnostics",
        "--serve",
        "--build-intermediate",
        "--build-enhanced",
        "--refresh",
        "--merge-persist"
      ]
    };
    console.log(JSON.stringify(diagnostics, null, 2));
    return;
  }

  // Help option
  if (cliArgs.includes("--help") || cliArgs.includes("-h")) {
    const helpText = [
      "owl-builder: create and manage OWL ontologies from public data sources",
      "Usage: node src/lib/main.js [options]",
      "",
      "  --help                Display this help message",
      "  --diagnostics         Show diagnostic information",
      "  --serve               Start the local HTTP server",
      "  --build-intermediate  Generate intermediate ontology artifacts",
      "  --build-enhanced      Generate enhanced ontology artifacts",
      "  --refresh             Refresh source data",
      "  --merge-persist       Merge and persist data to storage",
      "  --list-sources        List public (and custom) data sources"
    ].join("\n");
    console.log(helpText);
    return;
  }

  // List public data sources, merging with optional user config
  if (cliArgs.includes("--list-sources")) {
    const configPath = path.join(process.cwd(), "data-sources.json");
    let customSources = [];
    if (fs.existsSync(configPath)) {
      try {
        const raw = fs.readFileSync(configPath, "utf8");
        const parsed = JSON.parse(raw);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item) =>
              item &&
              typeof item.name === "string" &&
              typeof item.url === "string"
          )
        ) {
          customSources = parsed;
        } else {
          console.error(
            `Invalid data-sources.json: Expected an array of { name: string, url: string }`
          );
        }
      } catch (err) {
        console.error(`Invalid data-sources.json: ${err.message}`);
      }
    }
    const combined = PUBLIC_DATA_SOURCES.concat(customSources);
    console.log(JSON.stringify(combined, null, 2));
    return;
  }

  // Default behavior
  console.log(`Run with: ${JSON.stringify(cliArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

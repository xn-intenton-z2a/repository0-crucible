#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export function main(args = []) {
  if (args.includes("--diagnostics")) {
    const diagnostics = {
      nodeVersion: process.versions.node,
      platform: process.platform,
      availableCommands: [
        "--capital-cities",
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

  if (args.includes("--capital-cities")) {
    const owlOntology = {
      owl: "capitalCities",
      data: [
        { country: "France", capital: "Paris" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Brazil", capital: "Brasília" }
      ],
      generatedAt: new Date().toISOString()
    };
    console.log(JSON.stringify(owlOntology, null, 2));
    return;
  }

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

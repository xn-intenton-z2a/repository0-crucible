#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

export function main(args = process.argv.slice(2)) {
  const dataSources = {
    wikipedia: "https://en.wikipedia.org/",
    geonames: "http://api.geonames.org/",
    dbpedia: "https://dbpedia.org/",
  };

  if (args.includes("--list-sources")) {
    Object.entries(dataSources).forEach(([name, url]) => {
      console.log(`${name} ${url}`);
    });
    return;
  }

  if (args.includes("--capital-cities")) {
    const capitalCities = [
      { name: "Paris", country: "France" },
      { name: "Tokyo", country: "Japan" },
      // Additional entries can be added here
    ];
    const ontology = {
      ontologyVersion: "1.0.0",
      individuals: capitalCities.map(({ name, country }) => ({
        type: "CapitalCity",
        name,
        country,
      })),
    };
    const outputIndex = args.indexOf("--output");
    if (outputIndex !== -1 && args[outputIndex + 1]) {
      const outputPath = args[outputIndex + 1];
      fs.writeFileSync(outputPath, JSON.stringify(ontology, null, 2));
    } else {
      console.log(JSON.stringify(ontology, null, 2));
    }
    return;
  }

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

export function main(args = process.argv.slice(2)) {
  const dataSources = {
    wikipedia: "https://en.wikipedia.org/",
    geonames: "http://api.geonames.org/",
    dbpedia: "https://dbpedia.org/",
  };

  // Handle list-sources
  if (args.includes("--list-sources")) {
    Object.entries(dataSources).forEach(([name, url]) => {
      console.log(`${name} ${url}`);
    });
    return;
  }

  // Handle capital-cities
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
    if (outputIndex !== -1 && args[outputIndex + 1] && !args[outputIndex + 1].startsWith("--")) {
      const outputPath = args[outputIndex + 1];
      fs.writeFileSync(outputPath, JSON.stringify(ontology, null, 2));
    } else {
      console.log(JSON.stringify(ontology, null, 2));
    }
    return;
  }

  // Handle ontology generation
  const ontIndex = args.indexOf("--ontology");
  if (ontIndex !== -1) {
    const inputPath = args[ontIndex + 1];
    if (!inputPath || inputPath.startsWith("--")) {
      throw new Error('Missing input file for --ontology');
    }
    let raw;
    try {
      raw = fs.readFileSync(inputPath, 'utf-8');
    } catch (err) {
      throw new Error(`Input file not found: ${inputPath}`);
    }
    let records;
    try {
      records = JSON.parse(raw);
    } catch (err) {
      throw new Error(`Invalid JSON in input file: ${err.message}`);
    }
    if (!Array.isArray(records)) {
      throw new Error('Input JSON must be an array of objects');
    }
    // Load version from package.json
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pkgPath = path.resolve(__dirname, '../../package.json');
    let version;
    try {
      const pkgRaw = fs.readFileSync(pkgPath, 'utf-8');
      version = JSON.parse(pkgRaw).version;
    } catch (err) {
      version = 'unknown';
    }
    const individuals = records.map((rec) => {
      const ind = { ...rec };
      if (!('type' in ind)) ind.type = 'Individual';
      return ind;
    });
    const ontology = { ontologyVersion: version, individuals };
    const outputIndex = args.indexOf('--output');
    if (outputIndex !== -1 && args[outputIndex + 1] && !args[outputIndex + 1].startsWith('--')) {
      const outputPath = args[outputIndex + 1];
      fs.writeFileSync(outputPath, JSON.stringify(ontology, null, 2));
    } else {
      console.log(JSON.stringify(ontology, null, 2));
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

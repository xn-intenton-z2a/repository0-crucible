#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

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

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

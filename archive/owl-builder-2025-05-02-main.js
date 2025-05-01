#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import path from "path";
import { generateOntology } from "./index.js";

async function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

function printHelp() {
  console.log(`Usage: node ${path.basename(process.argv[1] || 'main.js')} [options]
Options:
  --help                  Show this help message.
  --to-owl <ontologyIri>  Generate OWL ontology JSON-LD for the input data.
  --ontology-base <IRI>   Base IRI to include in the @context @base field.`);
}

export async function main(args) {
  args = args ?? process.argv.slice(2);
  if (args.includes("--help")) {
    printHelp();
    return;
  }
  const toOwlIndex = args.indexOf("--to-owl");
  if (toOwlIndex !== -1) {
    const ontologyIri = args[toOwlIndex + 1];
    if (!ontologyIri || ontologyIri.startsWith("--")) {
      console.error("Missing ontology IRI for --to-owl");
      return;
    }
    const baseIndex = args.indexOf("--ontology-base");
    const baseIri = baseIndex !== -1 ? args[baseIndex + 1] : undefined;
    const stdinRaw = await readStdin();
    let data;
    try {
      data = stdinRaw ? JSON.parse(stdinRaw) : {};
    } catch (e) {
      console.error("Failed to parse JSON input:", e.message);
      return;
    }
    const result = await generateOntology(data, { ontologyIri, baseIri });
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  // No recognized command, show help
  printHelp();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

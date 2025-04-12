#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function readOntology(filePath) {
  const data = readFileSync(filePath, { encoding: "utf-8" });
  try {
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Invalid JSON content");
  }
}

export function persistOntology(ontology, filePath) {
  const data = JSON.stringify(ontology, null, 2);
  writeFileSync(filePath, data, { encoding: "utf-8" });
}

// Merge two ontologies by combining classes (unique) and merging properties (ontology2 takes precedence)
export function mergeOntologies(ontology1, ontology2) {
  const merged = {};
  merged.name = (ontology1.name && ontology2.name) ? `${ontology1.name} & ${ontology2.name}` : (ontology1.name || ontology2.name || "Merged Ontology");
  merged.version = ontology1.version || ontology2.version || "unknown";
  merged.classes = Array.from(new Set([...(ontology1.classes || []), ...(ontology2.classes || [])]));
  merged.properties = { ...(ontology1.properties || {}), ...(ontology2.properties || {}) };
  return merged;
}

// Inlined GraphDB exporter function to replace missing module
export function exportGraphDB(ontology) {
  const nodes = [];
  const edges = [];

  // Add an ontology node
  nodes.push({
    id: "ontology",
    label: ontology.name || "Ontology",
    version: ontology.version || "unknown",
  });

  // Process classes if available
  if (ontology.classes && Array.isArray(ontology.classes)) {
    ontology.classes.forEach((cls, index) => {
      const nodeId = `class_${index}`;
      nodes.push({ id: nodeId, label: cls });
      edges.push({ source: "ontology", target: nodeId, relation: "hasClass" });
    });
  }

  // Process properties if available
  if (ontology.properties && typeof ontology.properties === "object") {
    Object.entries(ontology.properties).forEach(([key, value]) => {
      const nodeId = `prop_${key}`;
      nodes.push({ id: nodeId, label: key, value });
      edges.push({ source: "ontology", target: nodeId, relation: "hasProperty" });
    });
  }

  return { nodes, edges };
}

export function main(args) {
  if (args.includes("--help") || args.length === 0) {
    console.log(`Usage:
  --version                     Display package version.
  --read <file>                 Read ontology from JSON file.
  --persist <file> [--ontology <json|string:file>]  Persist ontology to JSON file.
  --export-graphdb <input> [output]  Export GraphDB-friendly format.
  --merge-persist <file1> <file2> <output>  Merge two ontologies and persist.
  --help                        Display this help message.`);
    return;
  }

  if (args.includes('--version')) {
    try {
      const pkgJsonUrl = new URL('../../package.json', import.meta.url);
      const pkgData = readFileSync(pkgJsonUrl, { encoding: 'utf-8' });
      const pkg = JSON.parse(pkgData);
      if (pkg.version) {
        console.log(pkg.version);
      } else {
        console.error("Package version not found");
        process.exit(1);
      }
    } catch (err) {
      console.error("Error reading package.json:", err.message);
      process.exit(1);
    }
    return;
  }

  if (args.includes('--read')) {
    const index = args.indexOf('--read');
    const file = args[index + 1];
    if (!file) {
      console.error('Error: --read option requires a file path argument.');
      process.exit(1);
    }
    try {
      const ontology = readOntology(file);
      console.log('Ontology loaded:', ontology);
    } catch (err) {
      console.error('Error reading ontology:', err.message);
      process.exit(1);
    }
    return;
  }

  if (args.includes('--persist')) {
    const index = args.indexOf('--persist');
    const file = args[index + 1];
    if (!file) {
      console.error('Error: --persist option requires a file path argument.');
      process.exit(1);
    }

    let ontologyToPersist = null;
    // Check if a custom ontology is provided
    if (args.includes('--ontology')) {
      const ontIndex = args.indexOf('--ontology');
      const ontologyInput = args[ontIndex + 1];
      if (!ontologyInput) {
        console.error('Error: --ontology option requires an ontology input argument.');
        process.exit(1);
      }
      // If the provided argument is a path to an existing file, read from file, else treat it as a JSON string
      if (existsSync(ontologyInput)) {
        try {
          const fileContents = readFileSync(ontologyInput, { encoding: 'utf-8' });
          ontologyToPersist = JSON.parse(fileContents);
        } catch (err) {
          console.error('Error reading ontology file:', err.message);
          process.exit(1);
        }
      } else {
        // Attempt to parse the input as a JSON string
        try {
          ontologyToPersist = JSON.parse(ontologyInput);
        } catch (err) {
          console.error('Error parsing ontology JSON string:', err.message);
          process.exit(1);
        }
      }
    } else {
      // For demonstration, use a dummy ontology object if no custom ontology is provided
      ontologyToPersist = {
        name: 'Dummy Ontology',
        version: '1.0.0',
        classes: ['ClassA', 'ClassB'],
        properties: { key: 'value' }
      };
    }

    try {
      persistOntology(ontologyToPersist, file);
      console.log(`Ontology persisted to ${file}`);
    } catch (err) {
      console.error('Error persisting ontology:', err.message);
      process.exit(1);
    }
    return;
  }

  if (args.includes('--export-graphdb')) {
    const index = args.indexOf('--export-graphdb');
    const inputFile = args[index + 1];
    if (!inputFile) {
      console.error('Error: --export-graphdb option requires an input file path argument.');
      process.exit(1);
    }
    // Optional output file argument
    const outputFile = args[index + 2] || null;
    try {
      const ontology = readOntology(inputFile);
      const graphdbData = exportGraphDB(ontology);
      const outputString = JSON.stringify(graphdbData, null, 2);
      if (outputFile) {
        writeFileSync(outputFile, outputString, { encoding: "utf-8" });
        console.log(`GraphDB exporter output written to ${outputFile}`);
      } else {
        console.log('GraphDB exporter output:', outputString);
      }
    } catch (err) {
      console.error('Error exporting GraphDB data:', err.message);
      process.exit(1);
    }
    return;
  }

  if (args.includes('--merge-persist')) {
    const index = args.indexOf('--merge-persist');
    const file1 = args[index + 1];
    const file2 = args[index + 2];
    const outputFile = args[index + 3];
    if (!file1 || !file2 || !outputFile) {
      console.error('Error: --merge-persist option requires three file path arguments: <ontology1> <ontology2> <output>');
      process.exit(1);
    }
    try {
      const ontology1 = readOntology(file1);
      const ontology2 = readOntology(file2);
      const mergedOntology = mergeOntologies(ontology1, ontology2);
      persistOntology(mergedOntology, outputFile);
      console.log(`Merged ontology persisted to ${outputFile}`);
    } catch (err) {
      console.error('Error merging ontologies:', err.message);
      process.exit(1);
    }
    return;
  }

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

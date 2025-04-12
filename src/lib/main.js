#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";
import { exportGraphDB } from "./graphdbExporter.js"; // Import from separate module

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

export function main(args) {
  // Check for persistence commands
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
    // For demonstration, use a dummy ontology object
    const dummyOntology = {
      name: 'Dummy Ontology',
      version: '1.0.0',
      classes: ['ClassA', 'ClassB'],
      properties: { key: 'value' }
    };
    try {
      persistOntology(dummyOntology, file);
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

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

// ------------------------------------------------------------------
// New File: src/lib/graphdbExporter.js
// Implements the exportGraphDB function used by main.js and tested in unit tests

// Note: This file has been separated from main.js to avoid duplicate export issues.

export function exportGraphDB(ontology) {
  const nodes = [];
  const edges = [];

  // Create the central ontology node
  nodes.push({
    id: 'ontology',
    label: ontology.name || 'Unnamed Ontology',
    version: ontology.version || ''
  });

  // Add class nodes if available
  if (ontology.classes && Array.isArray(ontology.classes)) {
    ontology.classes.forEach(cls => {
      nodes.push({
        id: `class_${cls}`,
        label: cls
      });
    });
  }

  // Add property nodes if available
  if (ontology.properties && typeof ontology.properties === 'object') {
    Object.entries(ontology.properties).forEach(([key, value]) => {
      nodes.push({
        id: `prop_${key}`,
        value: value
      });
    });
  }

  return { nodes, edges };
}

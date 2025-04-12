#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";
import { exportGraphDB } from "./graphdbExporter.js"; // New module for GraphDB exporting

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

// -------------------------------------------------------------------
// New Module: src/lib/graphdbExporter.js
// This module exports a function to convert an OWL ontology JSON
// into a GraphDB-friendly format consisting of nodes and edges.
// -------------------------------------------------------------------

// Note: In a real-world scenario, the conversion schema might be more complex.
export function exportGraphDB(ontology) {
  const nodes = [];
  const edges = [];
  
  // Create main ontology node
  nodes.push({
    id: "ontology",
    label: ontology.name || "Ontology",
    version: ontology.version || "unknown"
  });
  
  // Create nodes for ontology classes and link them
  if (Array.isArray(ontology.classes)) {
    ontology.classes.forEach((cls, idx) => {
      const classNodeId = `class_${idx}`;
      nodes.push({ id: classNodeId, label: cls });
      edges.push({ from: "ontology", to: classNodeId, relation: "has_class" });
    });
  }
  
  // Create nodes for ontology properties and link them
  if (ontology.properties && typeof ontology.properties === "object") {
    Object.entries(ontology.properties).forEach(([key, value]) => {
      const propNodeId = `prop_${key}`;
      nodes.push({ id: propNodeId, label: key, value });
      edges.push({ from: "ontology", to: propNodeId, relation: "has_property" });
    });
  }
  
  return { nodes, edges };
}

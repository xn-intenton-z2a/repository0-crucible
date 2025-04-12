#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readOntology, persistOntology } from "./persistence.js";

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
      classes: ["ClassA", "ClassB"],
      properties: { key: "value" }
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

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

// ----------------------------------------------------------------------
// New File: src/lib/persistence.js
// ----------------------------------------------------------------------

/*
  This module provides functions to read and persist OWL ontologies in JSON format.
*/

import { readFileSync, writeFileSync } from 'fs';

/**
 * Reads a JSON file from the given filePath and returns the parsed ontology object.
 * @param {string} filePath 
 * @returns {Object} Parsed ontology object
 */
export function readOntology(filePath) {
  try {
    const data = readFileSync(filePath, { encoding: 'utf-8' });
    const ontology = JSON.parse(data);
    return ontology;
  } catch (error) {
    throw new Error(`Failed to read ontology from file: ${error.message}`);
  }
}

/**
 * Persists the given ontology object to the specified filePath in JSON format.
 * @param {Object} ontology 
 * @param {string} filePath 
 */
export function persistOntology(ontology, filePath) {
  try {
    const jsonData = JSON.stringify(ontology, null, 2);
    writeFileSync(filePath, jsonData, { encoding: 'utf-8' });
  } catch (error) {
    throw new Error(`Failed to persist ontology to file: ${error.message}`);
  }
}

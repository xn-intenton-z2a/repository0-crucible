#!/usr/bin/env node

/*
 * owl-builder CLI Tool
 *
 * Mission Statement:
 *   owl-builder is dedicated to building OWL ontologies from verified public data sources. Our goal is to provide an intuitive and extensible platform for ontology building, management, and querying with a strong focus on integrating real public data into ontology models.
 *
 * Features:
 *   - Build and persist ontology models built from public data
 *   - Query and validate ontology concepts
 *   - Export/import OWL (XML) representations
 *   - Crawl public endpoints and create backups for enriched ontologies
 *   - Wrap and enrich ontology models with additional metadata
 *   - Serve a simple web interface for monitoring and diagnostics
 *   - Build custom ontologies with extended functions
 *
 * For Developers:
 *   Follow the CONTRIBUTING guidelines to extend or modify functionalities. Ensure to update tests and documentation when changes are made.
 *
 * For Users:
 *   Enjoy a robust CLI and library tool that is easy to set up and use for generating rich ontology outputs derived from public data sources. Use the --help command for usage information.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

// Define file paths for ontology data
const ontologyFilePath = path.resolve(process.cwd(), 'ontology.json');
const backupFilePath = path.resolve(process.cwd(), 'ontology-backup.json');

// Basic Ontology Builder: Constructs a simple ontology object using public data as seed.
export function buildOntology() {
  return {
    title: 'Public Data Ontology',
    concepts: ['Concept1', 'Concept2', 'Concept3']
  };
}

// Persists the provided ontology object to a file.
export function persistOntology(ontology) {
  try {
    fs.writeFileSync(ontologyFilePath, JSON.stringify(ontology, null, 2));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Loads and parses the ontology file.
export function loadOntology() {
  try {
    const content = fs.readFileSync(ontologyFilePath, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Queries the ontology for a search term among its concepts.
export function queryOntology(searchTerm) {
  const ontology = loadOntology();
  if (ontology.success === false) {
    return { searchTerm, results: [] };
  }
  const results = ontology.concepts.filter(c => c.includes(searchTerm));
  return { searchTerm, results };
}

// Validates that the ontology object has a title.
export function validateOntology(ontology) {
  return ontology && ontology.title ? true : false;
}

// Exports the ontology to a simple OWL-like XML representation.
export function exportOntologyToXML(ontology) {
  return `<ontology><title>${ontology.title}</title></ontology>`;
}

// Imports an ontology from a provided OWL-like XML string.
export function importOntologyFromXML(xml) {
  const titleMatch = xml.match(/<title>(.*?)<\/title>/);
  return { title: titleMatch ? titleMatch[1] : 'Imported Ontology', concepts: [] };
}

// Creates a backup of the current ontology file.
export function backupOntology() {
  try {
    const content = fs.readFileSync(ontologyFilePath, 'utf-8');
    fs.writeFileSync(backupFilePath, content);
    return { success: true, backupFile: backupFilePath };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Updates the ontology title and returns the updated ontology object.
export function updateOntology(newTitle) {
  let ontology = buildOntology();
  ontology.title = newTitle;
  return ontology;
}

// Clears the ontology file if it exists.
export function clearOntology() {
  try {
    if (fs.existsSync(ontologyFilePath)) {
      fs.unlinkSync(ontologyFilePath);
      return { success: true };
    } else {
      return { success: false, error: 'Ontology file does not exist' };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Returns a list of available public endpoints to crawl data from.
export function listAvailableEndpoints() {
  return [
    'https://api.publicapis.org/entries',
    'https://dog.ceo/api/breeds/image/random',
    'https://jsonplaceholder.typicode.com/posts',
    'https://api.coindesk.com/v1/bpi/currentprice.json',
    'https://api.github.com',
    'https://jsonplaceholder.typicode.com/comments',
    'https://dummyjson.com/products',
    'https://randomuser.me/api/',
    'https://catfact.ninja/fact',
    'https://jsonplaceholder.typicode.com/todos'
  ];
}

// Attempts to fetch data with retry using the provided protocol.
export async function fetchDataWithRetry(url, retries = 3) {
  const mod = url.startsWith('https') ? https : http;
  return new Promise((resolve, reject) => {
    function attempt(n) {
      mod.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', (err) => {
        if (n > 0) {
          attempt(n - 1);
        } else {
          reject(err);
        }
      });
    }
    attempt(retries);
  });
}

// Crawls public endpoints to capture data and convert ontology to an OWL XML representation.
export async function crawlOntologies() {
  const endpoints = listAvailableEndpoints();
  const results = [];
  for (const endpoint of endpoints) {
    try {
      let data;
      // Use FORCE_DUMMY_ENDPOINT flag only if explicitly set to true
      if (process.env.FORCE_DUMMY_ENDPOINT === 'true') {
        data = 'dummy data';
      } else {
        data = await fetchDataWithRetry(endpoint);
      }
      const owlContent = exportOntologyToXML(buildOntology());
      results.push({ endpoint, data, owlContent });
    } catch (err) {
      results.push({ endpoint, error: err.message });
    }
  }
  return results;
}

/* Extended OWL Ontology Model Wrappers */

// Builds a basic OWL model wrapper with minimal properties
export function buildBasicOWLModel() {
  return {
    id: 'basic',
    title: 'Basic OWL Ontology',
    concepts: ['Class1', 'Class2'],
    properties: []
  };
}

// Builds an advanced OWL model wrapper with additional details
export function buildAdvancedOWLModel() {
  return {
    id: 'advanced',
    title: 'Advanced OWL Ontology',
    classes: ['Person', 'Organization'],
    properties: [
      { name: 'hasName', type: 'string' },
      { name: 'hasAge', type: 'integer' }
    ],
    metadata: {
      created: new Date().toISOString()
    }
  };
}

// Wraps an ontology model to include additional metadata
export function wrapOntologyModel(model) {
  if (!model || !model.title) {
    model = { title: 'Default Title' };
  }
  model.timestamp = new Date().toISOString();
  return model;
}

// NEW FUNCTION: Builds a custom ontology by applying user defined customizations
export function buildCustomOntology(customizations = {}) {
  const baseOntology = buildOntology();
  return { ...baseOntology, ...customizations, customized: true };
}

// NEW FUNCTION: Extends ontology concepts by adding additional ones
export function extendOntologyConcepts(ontology, additionalConcepts = []) {
  if (!ontology.concepts) ontology.concepts = [];
  ontology.concepts = ontology.concepts.concat(additionalConcepts);
  return ontology;
}

// Starts a simple web server to serve minimal diagnostic info and status
export function serveWebServer() {
  const port = process.env.PORT || 3000;
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('owl-builder Web Server Running\n');
  });
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      const logMsg = `Web server started at http://localhost:${port}`;
      console.log(logMsg);
      resolve('Web server started');
    });
  });
}

// CLI Command Actions
const commandActions = {
  "--help": async (args) => { displayHelp(); },
  "--version": async (args) => { 
    console.log("Tool version:", getVersion()); 
    return getVersion(); 
  },
  "--list": async (args) => { 
    const commands = listCommands(); 
    console.log("Supported commands:", commands); 
    return commands; 
  },
  "--build": async (args) => { 
    const ontology = buildOntology(); 
    console.log("Ontology built:", ontology); 
    return ontology; 
  },
  "--persist": async (args) => {
    const ontology = buildOntology();
    console.log("Ontology built:", ontology);
    const saved = persistOntology(ontology);
    console.log("Ontology persisted:", saved);
    return saved;
  },
  "--load": async (args) => { 
    const loaded = loadOntology(); 
    console.log("Ontology loaded:", loaded); 
    return loaded; 
  },
  "--query": async (args) => { 
    const searchTerm = args[1] || "Concept1";
    const results = queryOntology(searchTerm);
    console.log("Ontology query results:", results);
    return results; 
  },
  "--validate": async (args) => { 
    const ontology = buildOntology(); 
    const isValid = validateOntology(ontology);
    console.log("Ontology validation result:", isValid);
    return isValid; 
  },
  "--export": async (args) => { 
    const ontology = buildOntology(); 
    const xml = exportOntologyToXML(ontology);
    console.log("Ontology exported to XML:", xml); 
    return xml;
  },
  "--import": async (args) => { 
    const sampleXML = `<ontology><title>Imported Ontology</title></ontology>`;
    const imported = importOntologyFromXML(sampleXML);
    console.log("Ontology imported from XML:", imported);
    return imported; 
  },
  "--backup": async (args) => { 
    const ontology = buildOntology(); 
    persistOntology(ontology);
    const backupResult = backupOntology(); 
    console.log("Ontology backup created:", backupResult);
    return backupResult; 
  },
  "--update": async (args) => { 
    const idx = args.indexOf("--update"); 
    const newTitle = idx !== -1 && args.length > idx + 1 ? args[idx + 1] : "Updated Ontology";
    const updated = updateOntology(newTitle);
    console.log("Ontology updated:", updated);
    return updated; 
  },
  "--clear": async (args) => { 
    const result = clearOntology(); 
    if (result.success) { 
      console.log("Ontology cleared, file removed.", result);
    } else { 
      console.log("Ontology clear failed:", result);
    } 
    return result; 
  },
  "--crawl": async (args) => {
    const crawlResults = await crawlOntologies();
    console.log("Crawled ontology data:", crawlResults);
    return crawlResults;
  },
  "--fetch-retry": async (args) => {
    try {
      const result = await fetchDataWithRetry("https://api.publicapis.org/entries");
      console.log("Fetched data with retry:", result);
      return result;
    } catch (err) {
      console.log("Fetch with retry failed:", err.message);
      return err.message;
    }
  },
  "--build-basic": async (args) => {
    const model = buildBasicOWLModel();
    console.log("Basic OWL Model:", model);
    return model;
  },
  "--build-advanced": async (args) => {
    const model = buildAdvancedOWLModel();
    console.log("Advanced OWL Model:", model);
    return model;
  },
  "--wrap-model": async (args) => {
    let model;
    try {
      model = args[1] ? JSON.parse(args[1]) : buildBasicOWLModel();
    } catch (e) {
      model = buildBasicOWLModel();
    }
    const wrapped = wrapOntologyModel(model);
    console.log("Wrapped Model:", wrapped);
    return wrapped;
  },
  "--build-custom": async (args) => {
    let custom = {};
    try {
      custom = args[1] ? JSON.parse(args[1]) : {};
    } catch (e) {
      console.log('Invalid JSON input for custom ontology, using default');
    }
    const customOntology = buildCustomOntology(custom);
    console.log("Custom Ontology:", customOntology);
    return customOntology;
  },
  "--extend-concepts": async (args) => {
    const additional = args[1] ? args[1].split(',') : ['ExtraConcept'];
    let ontology = loadOntology();
    if (ontology.success === false) {
      ontology = buildOntology();
    }
    const extended = extendOntologyConcepts(ontology, additional);
    console.log("Extended Ontology:", extended);
    return extended;
  },
  "--diagnostics": async (args) => { 
    // Override dummy data mode to perform real HTTP calls for diagnostics
    process.env.FORCE_DUMMY_ENDPOINT = 'false';
    try {
      const crawlResults = await crawlOntologies();
      console.log("Diagnostic crawl results:", JSON.stringify(crawlResults, null, 2));
      return crawlResults;
    } catch (err) {
      console.error("Error during diagnostics:", err);
      return { error: err.message };
    }
  },
  "--serve": async (args) => { 
    const msg = await serveWebServer();
    return msg;
  }
};

// Main CLI function that dispatches commands based on provided arguments.
export async function main(args = process.argv.slice(2)) {
  for (const arg of args) {
    if (commandActions[arg]) {
      const result = await commandActions[arg](args);
      return result;
    }
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// Displays help information for using the CLI.
export function displayHelp() {
  console.log(`Usage: node src/lib/main.js [options]\nOptions: --help, --version, --list, --build, --persist, --load, --query, --validate, --export, --import, --backup, --update, --clear, --crawl, --fetch-retry, --build-basic, --build-advanced, --wrap-model, --build-custom, --extend-concepts, --diagnostics, --serve`);
}

export function getVersion() {
  return '0.0.28';
}

export function listCommands() {
  return Object.keys(commandActions);
}

console.log("owl-builder CLI loaded");

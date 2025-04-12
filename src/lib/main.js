#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file if available
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Define Zod schema for ontology validation
const ontologySchema = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
  classes: z.array(z.string()).default([]),
  properties: z.record(z.any()).default({})
});

export function validateOntology(ontology) {
  return ontologySchema.parse(ontology);
}

// Enhanced logging function to log CLI events in JSON format to logs/cli.log
// Now, errors during logging (directory creation or appending logs) are reported to stderr instead of failing silently
function logEvent(eventObj) {
  const logDir = join(__dirname, '../../logs');
  const logPath = join(logDir, 'cli.log');
  const entry = {
    timestamp: new Date().toISOString(),
    args: process.argv.slice(2),
    ...eventObj
  };
  const entryString = JSON.stringify(entry) + "\n";
  
  try {
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }
  } catch (err) {
    console.error("Logging directory creation failed:", err.message);
  }

  try {
    appendFileSync(logPath, entryString, { encoding: "utf-8" });
  } catch (err) {
    console.error("Failed to write to log file:", err.message);
  }
}

// Refactored helper function to get and validate a numeric environment variable
// Now explicitly checks for non-finite values (NaN, Infinity, -Infinity) and falls back to a safe default
function getEnvNumber(name, defaultValue) {
  const val = process.env[name];
  if (val === undefined) return defaultValue;
  const numericValue = Number(val);
  if (!Number.isFinite(numericValue)) {
    const warningMsg = `Warning: Received non-finite value '${val}' for environment variable ${name}; falling back to default value ${defaultValue}`;
    console.error(warningMsg);
    logEvent({ event: 'warning', command: 'getEnvNumber', detail: warningMsg });
    return defaultValue;
  }
  return numericValue;
}

export function readOntology(filePath) {
  const data = readFileSync(filePath, { encoding: "utf-8" });
  let ontology;
  try {
    ontology = JSON.parse(data);
  } catch (err) {
    throw new Error("Invalid JSON content");
  }
  try {
    ontology = validateOntology(ontology);
  } catch (err) {
    throw new Error("Ontology validation failed: " + err.message);
  }
  return ontology;
}

export function persistOntology(ontology, filePath) {
  try {
    ontology = validateOntology(ontology);
  } catch (err) {
    throw new Error("Ontology validation failed: " + err.message);
  }
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
  // Log the received arguments
  logEvent({ event: 'start', command: 'main', detail: 'CLI started', args });

  // Diagnostics mode: output detailed diagnostic information in JSON format
  if (args.includes('--diagnostics')) {
    let packageVersion = "unknown";
    try {
      const pkgJsonUrl = new URL('../../package.json', import.meta.url);
      const pkgData = readFileSync(pkgJsonUrl, { encoding: 'utf-8' });
      const pkg = JSON.parse(pkgData);
      packageVersion = pkg.version || "unknown";
    } catch (err) {
      packageVersion = "unknown";
    }
    const defaultTimeout = getEnvNumber("DEFAULT_TIMEOUT", 5000);
    const diagnosticsReport = {
      packageVersion,
      environment: {
        DEFAULT_TIMEOUT: defaultTimeout,
        rawEnv: {
          DEFAULT_TIMEOUT: process.env.DEFAULT_TIMEOUT
        }
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        pid: process.pid,
        cwd: process.cwd()
      },
      cliCommands: [
        { command: "--help", description: "Display help message" },
        { command: "--version", description: "Display package version" },
        { command: "--read <file>", description: "Read ontology from JSON file" },
        { command: "--persist <file> [--ontology <json|string:file>]", description: "Persist ontology to JSON file" },
        { command: "--export-graphdb <input> [output]", description: "Export GraphDB-friendly format" },
        { command: "--merge-persist <file1> <file2> <output>", description: "Merge two ontologies and persist" },
        { command: "--diagnostics", description: "Output diagnostic information in JSON format" }
      ],
      processArgs: process.argv.slice(2)
    };
    console.log(JSON.stringify(diagnosticsReport, null, 2));
    logEvent({ event: 'success', command: '--diagnostics', detail: 'Diagnostics information output' });
    return;
  }

  // If --version flag is provided, handle version first and exit without logging DEFAULT_TIMEOUT.
  if (args.includes("--version")) {
    try {
      const pkgJsonUrl = new URL('../../package.json', import.meta.url);
      const pkgData = readFileSync(pkgJsonUrl, { encoding: 'utf-8' });
      const pkg = JSON.parse(pkgData);
      if (pkg.version) {
        console.log(pkg.version);
        logEvent({ event: 'success', command: '--version', detail: 'Version displayed successfully' });
      } else {
        console.error("Package version not found");
        logEvent({ event: 'error', command: '--version', detail: 'Package version not found' });
        process.exit(1);
      }
    } catch (err) {
      console.error("Error reading package.json:", err.message);
      logEvent({ event: 'error', command: '--version', detail: err.message });
      process.exit(1);
    }
    return;
  }

  // Validate and log numeric environment variable DEFAULT_TIMEOUT for non-version commands
  const defaultTimeout = getEnvNumber("DEFAULT_TIMEOUT", 5000);
  console.log("Using DEFAULT_TIMEOUT:", defaultTimeout);

  if (args.includes("--help") || args.length === 0) {
    console.log(`Usage:
  --version                     Display package version.
  --read <file>                 Read ontology from JSON file.
  --persist <file> [--ontology <json|string:file>]  Persist ontology to JSON file.
  --export-graphdb <input> [output]  Export GraphDB-friendly format.
  --merge-persist <file1> <file2> <output>  Merge two ontologies and persist.
  --diagnostics                 Output diagnostic information in JSON format.
  --help                        Display this help message.`);
    logEvent({ event: 'success', command: '--help', detail: 'Help information displayed' });
    return;
  }

  if (args.includes('--read')) {
    const index = args.indexOf('--read');
    const file = args[index + 1];
    if (!file) {
      console.error('Error: --read option requires a file path argument.');
      logEvent({ event: 'error', command: '--read', detail: '--read option missing file path' });
      process.exit(1);
    }
    try {
      const ontology = readOntology(file);
      console.log('Ontology loaded:', ontology);
      logEvent({ event: 'success', command: '--read', detail: 'Ontology loaded successfully' });
    } catch (err) {
      console.error('Error reading ontology:', err.message);
      logEvent({ event: 'error', command: '--read', detail: err.message });
      process.exit(1);
    }
    return;
  }

  if (args.includes('--persist')) {
    const index = args.indexOf('--persist');
    const file = args[index + 1];
    if (!file) {
      console.error('Error: --persist option requires a file path argument.');
      logEvent({ event: 'error', command: '--persist', detail: '--persist option missing file path' });
      process.exit(1);
    }

    let ontologyToPersist = null;
    // Check if a custom ontology is provided
    if (args.includes('--ontology')) {
      const ontIndex = args.indexOf('--ontology');
      const ontologyInput = args[ontIndex + 1];
      if (!ontologyInput) {
        console.error('Error: --ontology option requires an ontology input argument.');
        logEvent({ event: 'error', command: '--persist', detail: '--ontology option missing input' });
        process.exit(1);
      }
      // If the provided argument is a path to an existing file, read from file, else treat it as a JSON string
      if (existsSync(ontologyInput)) {
        try {
          const fileContents = readFileSync(ontologyInput, { encoding: 'utf-8' });
          ontologyToPersist = JSON.parse(fileContents);
        } catch (err) {
          console.error('Error reading ontology file:', err.message);
          logEvent({ event: 'error', command: '--persist', detail: 'Error reading ontology file: ' + err.message });
          process.exit(1);
        }
      } else {
        // Attempt to parse the input as a JSON string
        try {
          ontologyToPersist = JSON.parse(ontologyInput);
        } catch (err) {
          console.error('Error parsing ontology JSON string:', err.message);
          logEvent({ event: 'error', command: '--persist', detail: 'Error parsing ontology JSON string: ' + err.message });
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
      logEvent({ event: 'success', command: '--persist', detail: 'Ontology persisted successfully' });
    } catch (err) {
      console.error('Error persisting ontology:', err.message);
      logEvent({ event: 'error', command: '--persist', detail: err.message });
      process.exit(1);
    }
    return;
  }

  if (args.includes('--export-graphdb')) {
    const index = args.indexOf('--export-graphdb');
    const inputFile = args[index + 1];
    if (!inputFile) {
      console.error('Error: --export-graphdb option requires an input file path argument.');
      logEvent({ event: 'error', command: '--export-graphdb', detail: '--export-graphdb missing input file' });
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
        logEvent({ event: 'success', command: '--export-graphdb', detail: 'GraphDB output written to file' });
      } else {
        console.log('GraphDB exporter output:', outputString);
        logEvent({ event: 'success', command: '--export-graphdb', detail: 'GraphDB output displayed on stdout' });
      }
    } catch (err) {
      console.error('Error exporting GraphDB data:', err.message);
      logEvent({ event: 'error', command: '--export-graphdb', detail: err.message });
      process.exit(1);
    }
    return;
  }

  // --merge-persist: Merge and persist two ontology JSON files
  if (args.includes('--merge-persist')) {
    const index = args.indexOf('--merge-persist');
    const file1 = args[index + 1];
    const file2 = args[index + 2];
    const outputFile = args[index + 3];
    if (!file1 || !file2 || !outputFile) {
      console.error('Error: --merge-persist option requires three file path arguments: <ontology1> <ontology2> <output>');
      logEvent({ event: 'error', command: '--merge-persist', detail: '--merge-persist missing one or more file arguments' });
      process.exit(1);
    }
    try {
      const ontology1 = readOntology(file1);
      const ontology2 = readOntology(file2);
      const mergedOntology = mergeOntologies(ontology1, ontology2);
      persistOntology(mergedOntology, outputFile);
      console.log(`Merged ontology persisted to ${outputFile}`);
      logEvent({ event: 'success', command: '--merge-persist', detail: 'Ontologies merged and persisted successfully' });
    } catch (err) {
      console.error('Error merging ontologies:', err.message);
      logEvent({ event: 'error', command: '--merge-persist', detail: err.message });
      process.exit(1);
    }
    return;
  }

  console.log(`Run with: ${JSON.stringify(args)}`);
  logEvent({ event: 'info', command: 'default', detail: 'No matching command executed' });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

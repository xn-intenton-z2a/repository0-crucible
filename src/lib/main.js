#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';
import dotenv from 'dotenv';
// Removed unused zod import since custom validation is now implemented
// import { z } from 'zod';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Utility: Log command execution to logs/cli.log
function logCommand(commandFlag) {
  const logDir = join(process.cwd(), 'logs');
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
  const logFile = join(logDir, 'cli.log');
  const logEntry = JSON.stringify({ timestamp: new Date().toISOString(), command: commandFlag });
  appendFileSync(logFile, logEntry + "\n", { encoding: 'utf-8' });
}

// Utility: Get validated DEFAULT_TIMEOUT with explicit handling for NaN and non-finite values
function getDefaultTimeout() {
  const rawTimeout = process.env.DEFAULT_TIMEOUT;
  const timeoutValue = Number(rawTimeout);
  if (isNaN(timeoutValue)) {
    console.error("DEFAULT_TIMEOUT is NaN; using default value of 5000");
    return 5000;
  }
  if (!isFinite(timeoutValue)) {
    console.error("DEFAULT_TIMEOUT not set; using default value of 5000 (invalid input: " + rawTimeout + ")");
    return 5000;
  }
  return timeoutValue;
}

// Command handlers implemented inline

function handleHelp(args) {
  const timeout = getDefaultTimeout();
  const helpText = `Usage: node main.js [options]\n\nOptions:\n  --help             Show help information\n  --version          Show package version\n  --read <file>      Read ontology from JSON file\n  --persist <file> [--ontology <json|string|file>]   Persist ontology to file\n  --export-graphdb <inputFile> [outputFile]  Export ontology in GraphDB format\n  --merge-persist <file1> <file2> <outputFile>   Merge two ontologies and persist\n  --diagnostics      Output diagnostic report\n  --refresh          Reinitialize system state\n\nUsing DEFAULT_TIMEOUT: ${timeout}\n`;
  console.log(helpText);
  logCommand('--help');
}

function handleVersion(args) {
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), { encoding: 'utf-8' }));
  } catch (error) {
    pkg = { version: 'unknown' };
  }
  console.log(pkg.version);
  logCommand('--version');
}

function handleRead(args) {
  const filePath = args[args.indexOf('--read') + 1];
  try {
    const content = readFileSync(filePath, { encoding: 'utf-8' });
    const ontology = JSON.parse(content);
    // Basic validation: name should be a string, classes an array
    if (typeof ontology.name !== 'string' || !Array.isArray(ontology.classes)) {
      console.error('Ontology validation failed: Invalid structure');
      process.exit(1);
    }
    console.log(`Ontology loaded: ${ontology.name}`);
  } catch (error) {
    console.error('Ontology validation failed: ' + error.message);
    process.exit(1);
  }
  logCommand('--read');
}

function handlePersist(args) {
  const outputFile = args[args.indexOf('--persist') + 1];
  let ontology = { name: 'Dummy Ontology', version: '1.0', classes: ['Class1'], properties: {} };
  const ontologyFlagIndex = args.indexOf('--ontology');
  if (ontologyFlagIndex !== -1) {
    const ontologyArg = args[ontologyFlagIndex + 1];
    // Try reading as file if exists
    if (existsSync(ontologyArg)) {
      try {
        const content = readFileSync(ontologyArg, { encoding: 'utf-8' });
        ontology = JSON.parse(content);
      } catch (error) {
        console.error('Error parsing ontology JSON string');
        logCommand('--persist');
        process.exit(1);
      }
    } else {
      try {
        ontology = JSON.parse(ontologyArg);
      } catch (error) {
        console.error('Error parsing ontology JSON string');
        logCommand('--persist');
        process.exit(1);
      }
    }
  }
  try {
    writeFileSync(outputFile, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
    console.log(`Ontology persisted to ${outputFile}`);
  } catch (error) {
    console.error('Error writing persisted ontology: ' + error.message);
    logCommand('--persist');
    process.exit(1);
  }
  logCommand('--persist');
}

function handleExportGraphDB(args) {
  const index = args.indexOf('--export-graphdb');
  const inputFile = args[index + 1];
  let outputFile = null;
  if (args.length > index + 2) {
    outputFile = args[index + 2];
  }
  try {
    const content = readFileSync(inputFile, { encoding: 'utf-8' });
    const ontology = JSON.parse(content);
    // Dummy GraphDB exporter output structure
    const graphOutput = {
      nodes: [{ id: 1, label: ontology.name }],
      edges: []
    };
    if (outputFile) {
      writeFileSync(outputFile, JSON.stringify(graphOutput, null, 2), { encoding: 'utf-8' });
      console.log(`GraphDB exporter output written to ${outputFile}`);
    } else {
      console.log('GraphDB exporter output: ' + JSON.stringify(graphOutput, null, 2));
    }
  } catch (error) {
    console.error('Error in GraphDB export: ' + error.message);
    process.exit(1);
  }
  logCommand('--export-graphdb');
}

function handleMergePersist(args) {
  const index = args.indexOf('--merge-persist');
  const file1 = args[index + 1];
  const file2 = args[index + 2];
  const outputFile = args[index + 3];
  try {
    const ontology1 = JSON.parse(readFileSync(file1, { encoding: 'utf-8' }));
    const ontology2 = JSON.parse(readFileSync(file2, { encoding: 'utf-8' }));
    // Merge logic: merge names, union classes, merge properties (ontology2 overrides ontology1 for conflicts)
    const merged = {};
    merged.name = `${ontology1.name} & ${ontology2.name}`;
    merged.version = ontology2.version; // assume second has priority
    merged.classes = Array.from(new Set([...(ontology1.classes || []), ...(ontology2.classes || [])]));
    merged.properties = { ...ontology1.properties, ...ontology2.properties };
    writeFileSync(outputFile, JSON.stringify(merged, null, 2), { encoding: 'utf-8' });
    console.log(`Merged ontology persisted to ${outputFile}`);
  } catch (error) {
    console.error('Error merging ontologies: ' + error.message);
    process.exit(1);
  }
  logCommand('--merge-persist');
}

function handleDiagnostics(args) {
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), { encoding: 'utf-8' }));
  } catch (error) {
    pkg = { version: 'unknown' };
  }
  const diagnostics = {
    packageVersion: pkg.version,
    environment: process.env,
    system: { platform: process.platform, arch: process.arch },
    cliCommands: ['--help', '--version', '--read', '--persist', '--export-graphdb', '--merge-persist', '--diagnostics', '--refresh'],
    processArgs: process.argv
  };
  console.log(JSON.stringify(diagnostics, null, 2));
  logCommand('--diagnostics');
}

function handleRefresh(args) {
  const logDir = join(process.cwd(), 'logs');
  const logFile = join(logDir, 'cli.log');
  // Clear the logs to reinitialize the state
  if (existsSync(logFile)) {
    writeFileSync(logFile, '', { encoding: 'utf-8' });
  }
  console.log('System state refreshed');
  logCommand('--refresh');
}

function handleDefault(args) {
  console.log('Command not recognized. Use --help for usage instructions.');
  logCommand('default');
}

// Command dispatcher
function dispatchCommand(args) {
  if (args.includes('--diagnostics')) {
    handleDiagnostics(args);
    return;
  }
  if (args.includes('--refresh')) {
    handleRefresh(args);
    return;
  }
  if (args.includes('--version')) {
    handleVersion(args);
    return;
  }
  if (args.includes('--read')) {
    handleRead(args);
    return;
  }
  if (args.includes('--persist')) {
    handlePersist(args);
    return;
  }
  if (args.includes('--export-graphdb')) {
    handleExportGraphDB(args);
    return;
  }
  if (args.includes('--merge-persist')) {
    handleMergePersist(args);
    return;
  }
  if (args.includes('--help') || args.length === 0) {
    handleHelp(args);
    return;
  }
  handleDefault(args);
}

// Main function
function main() {
  const args = process.argv.slice(2);
  dispatchCommand(args);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { dispatchCommand, main };

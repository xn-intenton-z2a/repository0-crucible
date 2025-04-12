#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, appendFileSync, writeFileSync, readFileSync, rmSync, lstatSync } from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import package version from package.json
import pkg from '../../package.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

// Utility: Log command execution to logs/cli.log
function logCommand(commandFlag) {
  const logDir = join(process.cwd(), 'logs');
  // Ensure logDir is an actual directory
  if (existsSync(logDir)) {
    try {
      const stats = lstatSync(logDir);
      if (!stats.isDirectory()) {
        rmSync(logDir);
        mkdirSync(logDir, { recursive: true });
      }
    } catch (err) {
      mkdirSync(logDir, { recursive: true });
    }
  } else {
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
    console.error("DEFAULT_TIMEOUT is NaN; using default value of 5000 (input: " + rawTimeout + ")");
    return 5000;
  }
  if (!isFinite(timeoutValue)) {
    console.error("DEFAULT_TIMEOUT not set; using default value of 5000 (invalid input: " + rawTimeout + ")");
    return 5000;
  }
  return timeoutValue;
}

// Inline command handlers
function handleHelp(args, { logCommand, getDefaultTimeout }) {
  logCommand("--help");
  const timeout = getDefaultTimeout();
  console.log(`Usage: 
  --help             Display help information
  --version          Show package version
  --read <path>      Load ontology from file
  --persist <outputFile> [--ontology <json-string|path>]    Persist ontology
  --export-graphdb <inputFile> [outputFile]    Export ontology in GraphDB format
  --merge-persist <file1> <file2> <outputFile>    Merge ontologies
  --diagnostics      Output diagnostic report
  --refresh          Refresh system state
Using DEFAULT_TIMEOUT: ${timeout}`);
}

function handleVersion(args, { logCommand }) {
  logCommand("--version");
  console.log(pkg.version);
}

function handleRead(args, { logCommand }) {
  logCommand("--read");
  const filePath = args[args.indexOf('--read') + 1];
  try {
    const data = readFileSync(filePath, { encoding: 'utf-8' });
    const ontology = JSON.parse(data);
    // Basic validation
    if (typeof ontology.name !== 'string' || typeof ontology.version !== 'string' || !Array.isArray(ontology.classes) || typeof ontology.properties !== 'object') {
      console.error('Ontology validation failed: Invalid structure');
      return;
    }
    console.log(`Ontology loaded: ${ontology.name}`);
  } catch (err) {
    console.error('Ontology validation failed:', err.message);
  }
}

function handlePersist(args, { logCommand }) {
  logCommand("--persist");
  const outputFile = args[args.indexOf('--persist') + 1];
  let ontology;
  const ontologyFlagIndex = args.indexOf('--ontology');
  if (ontologyFlagIndex !== -1) {
    const ontologyArg = args[ontologyFlagIndex + 1];
    try {
      if (existsSync(ontologyArg)) {
        const data = readFileSync(ontologyArg, { encoding: 'utf-8' });
        ontology = JSON.parse(data);
      } else {
        ontology = JSON.parse(ontologyArg);
      }
    } catch (err) {
      console.error('Error parsing ontology JSON string');
      return;
    }
  } else {
    ontology = {
      name: 'Dummy Ontology',
      version: '1.0',
      classes: [],
      properties: {}
    };
  }
  try {
    writeFileSync(outputFile, JSON.stringify(ontology, null, 2), { encoding: 'utf-8' });
    console.log(`Ontology persisted to ${outputFile}`);
  } catch (err) {
    console.error('Error persisting ontology:', err.message);
  }
}

function handleExportGraphDB(args, { logCommand }) {
  logCommand("--export-graphdb");
  const inputFile = args[args.indexOf('--export-graphdb') + 1];
  let outputFile = null;
  const potentialOutput = args[args.indexOf('--export-graphdb') + 2];
  if (potentialOutput && !potentialOutput.startsWith('--')) {
    outputFile = potentialOutput;
  }
  try {
    const data = readFileSync(inputFile, { encoding: 'utf-8' });
    const ontology = JSON.parse(data);
    const graphOutput = {
      message: `GraphDB exporter output for ${ontology.name}`,
      nodes: []
    };
    if (outputFile) {
      writeFileSync(outputFile, JSON.stringify(graphOutput, null, 2), { encoding: 'utf-8' });
      console.log(`GraphDB exporter output written to ${outputFile}`);
    } else {
      console.log(`GraphDB exporter output: ${JSON.stringify(graphOutput)}`);
    }
  } catch (err) {
    console.error('Error exporting GraphDB:', err.message);
  }
}

function handleMergePersist(args, { logCommand }) {
  logCommand("--merge-persist");
  const index = args.indexOf('--merge-persist');
  const file1 = args[index + 1];
  const file2 = args[index + 2];
  const outputFile = args[index + 3];
  try {
    const ontology1 = JSON.parse(readFileSync(file1, { encoding: 'utf-8' }));
    const ontology2 = JSON.parse(readFileSync(file2, { encoding: 'utf-8' }));
    const merged = {
      name: `${ontology1.name} & ${ontology2.name}`,
      version: ontology2.version,
      classes: Array.from(new Set([...(ontology1.classes || []), ...(ontology2.classes || [])])),
      properties: { ...ontology1.properties, ...ontology2.properties }
    };
    writeFileSync(outputFile, JSON.stringify(merged, null, 2), { encoding: 'utf-8' });
    console.log(`Merged ontology persisted to ${outputFile}`);
  } catch (err) {
    console.error('Error merging ontologies:', err.message);
  }
}

function handleDiagnostics(args, { logCommand, getDefaultTimeout }) {
  logCommand("--diagnostics");
  const diagnostics = {
    packageVersion: pkg.version,
    environment: process.env,
    system: {
      platform: process.platform,
      arch: process.arch
    },
    cliCommands: ['--help','--version','--read','--persist','--export-graphdb','--merge-persist','--diagnostics','--refresh'],
    processArgs: process.argv.slice(2),
    DEFAULT_TIMEOUT: getDefaultTimeout()
  };
  console.log(JSON.stringify(diagnostics));
}

function handleRefresh(args, { logCommand }) {
  const logDir = join(process.cwd(), 'logs');
  if (existsSync(logDir)) {
    try {
      const stats = lstatSync(logDir);
      if (!stats.isDirectory()) {
        rmSync(logDir);
        mkdirSync(logDir, { recursive: true });
      }
    } catch (err) {
      mkdirSync(logDir, { recursive: true });
    }
  } else {
    mkdirSync(logDir, { recursive: true });
  }
  const logFile = join(logDir, 'cli.log');
  // Clear the log file before logging the refresh command
  writeFileSync(logFile, '', { encoding: 'utf-8' });
  // Log the refresh command after clearing the logs
  logCommand("--refresh");
  console.log('System state refreshed');
}

function handleDefault(args, { logCommand }) {
  logCommand('default');
  console.log('Invalid command');
}

// Command dispatcher using inline command handlers
function dispatchCommand(args) {
  if (args.includes('--diagnostics')) {
    return handleDiagnostics(args, { logCommand, getDefaultTimeout });
  }
  if (args.includes('--refresh')) {
    return handleRefresh(args, { logCommand });
  }
  if (args.includes('--version')) {
    return handleVersion(args, { logCommand });
  }
  if (args.includes('--read')) {
    return handleRead(args, { logCommand });
  }
  if (args.includes('--persist')) {
    return handlePersist(args, { logCommand });
  }
  if (args.includes('--export-graphdb')) {
    return handleExportGraphDB(args, { logCommand });
  }
  if (args.includes('--merge-persist')) {
    return handleMergePersist(args, { logCommand });
  }
  if (args.includes('--help') || args.length === 0) {
    return handleHelp(args, { logCommand, getDefaultTimeout });
  }
  return handleDefault(args, { logCommand });
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
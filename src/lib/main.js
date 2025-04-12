#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, appendFileSync, writeFileSync, readFileSync, rmSync, lstatSync } from 'fs';
import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Import package version from package.json
import pkg from '../../package.json' assert { type: 'json' };

// Get __dirname for ESM modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Inline logger functions (integrated to avoid missing module error)
function logCommand(command) {
  try {
    const logDir = join(process.cwd(), 'logs');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    } else {
      // If logDir exists but is not a directory, remove it
      const stats = lstatSync(logDir);
      if (!stats.isDirectory()) {
        rmSync(logDir, { force: true });
        mkdirSync(logDir, { recursive: true });
      }
    }
    const logFile = join(logDir, 'cli.log');
    appendFileSync(logFile, JSON.stringify({ command, timestamp: new Date().toISOString() }) + "\n", { encoding: 'utf-8' });
  } catch (err) {
    console.error("Failed to log command:", command);
  }
}

function logError(code, messageStr, details) {
  try {
    const logDir = join(process.cwd(), 'logs');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    } else {
      const stats = lstatSync(logDir);
      if (!stats.isDirectory()) {
        rmSync(logDir, { force: true });
        mkdirSync(logDir, { recursive: true });
      }
    }
    const logFile = join(logDir, 'cli.log');
    appendFileSync(logFile, JSON.stringify({ code, message: messageStr, details, timestamp: new Date().toISOString() }) + "\n", { encoding: 'utf-8' });
  } catch (err) {
    console.error("Failed to log error:", code);
  }
}

// Define ontology schema using Zod for validation
const ontologySchema = z.object({
  name: z.string(),
  version: z.string(),
  classes: z.array(z.string()),
  properties: z.record(z.any())
});

// Utility: Get validated DEFAULT_TIMEOUT with consolidated handling for undefined, non-numeric, and non-finite values
function getDefaultTimeout() {
  const defaultValue = 5000;
  const rawTimeout = process.env.DEFAULT_TIMEOUT;
  if (rawTimeout === undefined) {
    logError('LOG_ERR_ENV_NOT_SET', `DEFAULT_TIMEOUT is not set; using default value of ${defaultValue}`, { rawTimeout });
    return defaultValue;
  }
  const timeoutValue = Number(rawTimeout);
  if (isNaN(timeoutValue)) {
    logError('LOG_ERR_ENV_NAN', `DEFAULT_TIMEOUT is not a valid number; using default value of ${defaultValue} (input: ${rawTimeout})`, { rawTimeout });
    return defaultValue;
  }
  if (!isFinite(timeoutValue)) {
    logError('LOG_ERR_ENV_NON_FINITE', `DEFAULT_TIMEOUT must be a finite number; using default value of ${defaultValue} (input: ${rawTimeout})`, { rawTimeout });
    return defaultValue;
  }
  return timeoutValue;
}

// Inline command handlers
function handleHelp(args, { getDefaultTimeout }) {
  logCommand('--help');
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

function handleVersion(args) {
  logCommand('--version');
  console.log(pkg.version);
}

function handleRead(args) {
  logCommand('--read');
  const filePath = args[args.indexOf('--read') + 1];
  try {
    const data = readFileSync(filePath, { encoding: 'utf-8' });
    const ontology = JSON.parse(data);
    // Validate ontology using Zod schema
    ontologySchema.parse(ontology);
    console.log(`Ontology loaded: ${ontology.name}`);
  } catch (err) {
    if (err instanceof Error && err.name === 'ZodError') {
      logError('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed', { command: '--read', file: filePath, errors: err.errors });
    } else {
      logError('LOG_ERR_ONTOLOGY_READ', 'Ontology read error', { command: '--read', error: err.message, file: filePath });
    }
  }
}

function handlePersist(args) {
  logCommand('--persist');
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
      // Validate ontology using Zod schema
      ontologySchema.parse(ontology);
    } catch (err) {
      if (err instanceof Error && err.name === 'ZodError') {
        logError('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed', { command: '--persist', input: ontologyArg, errors: err.errors });
      } else {
        logError('LOG_ERR_PERSIST_PARSE', 'Error parsing ontology JSON string', { command: '--persist', input: ontologyArg });
      }
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
    logError('LOG_ERR_PERSIST_WRITE', 'Error persisting ontology', { command: '--persist', error: err.message, outputFile });
  }
}

function handleExportGraphDB(args) {
  logCommand('--export-graphdb');
  const inputFile = args[args.indexOf('--export-graphdb') + 1];
  let outputFile = null;
  const potentialOutput = args[args.indexOf('--export-graphdb') + 2];
  if (potentialOutput && !potentialOutput.startsWith('--')) {
    outputFile = potentialOutput;
  }
  try {
    const data = readFileSync(inputFile, { encoding: 'utf-8' });
    const ontology = JSON.parse(data);
    // Validate ontology using Zod schema
    ontologySchema.parse(ontology);
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
    if (err instanceof Error && err.name === 'ZodError') {
      logError('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed', { command: '--export-graphdb', file: inputFile, errors: err.errors });
    } else {
      logError('LOG_ERR_EXPORT_GRAPHDB', 'Error exporting GraphDB', { command: '--export-graphdb', error: err.message, inputFile });
    }
  }
}

function handleMergePersist(args) {
  logCommand('--merge-persist');
  const index = args.indexOf('--merge-persist');
  const file1 = args[index + 1];
  const file2 = args[index + 2];
  const outputFile = args[index + 3];
  try {
    const ontology1 = JSON.parse(readFileSync(file1, { encoding: 'utf-8' }));
    const ontology2 = JSON.parse(readFileSync(file2, { encoding: 'utf-8' }));
    // Validate both ontologies
    ontologySchema.parse(ontology1);
    ontologySchema.parse(ontology2);
    const merged = {
      name: `${ontology1.name} & ${ontology2.name}`,
      version: ontology2.version,
      classes: Array.from(new Set([...(ontology1.classes || []), ...(ontology2.classes || [])])),
      properties: { ...ontology1.properties, ...ontology2.properties }
    };
    writeFileSync(outputFile, JSON.stringify(merged, null, 2), { encoding: 'utf-8' });
    console.log(`Merged ontology persisted to ${outputFile}`);
  } catch (err) {
    if (err instanceof Error && err.name === 'ZodError') {
      logError('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed during merge', { command: '--merge-persist', error: err.errors });
    } else {
      logError('LOG_ERR_MERGE', 'Error merging ontologies', { command: '--merge-persist', error: err.message, files: [file1, file2, outputFile] });
    }
  }
}

function handleDiagnostics(args) {
  logCommand('--diagnostics');
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

function handleRefresh(args) {
  const logDir = join(process.cwd(), 'logs');
  try {
    if (existsSync(logDir)) {
      const stats = lstatSync(logDir);
      if (!stats.isDirectory()) {
        rmSync(logDir, { force: true });
        mkdirSync(logDir, { recursive: true });
      }
    } else {
      mkdirSync(logDir, { recursive: true });
    }
  } catch (err) {
    mkdirSync(logDir, { recursive: true });
  }
  const logFile = join(logDir, 'cli.log');
  writeFileSync(logFile, '', { encoding: 'utf-8' });
  logCommand('--refresh');
  console.log('System state refreshed');
}

function handleDefault(args) {
  logCommand('default');
  console.log('Invalid command');
}

// Command dispatcher using inline command handlers
function dispatchCommand(args) {
  if (args.includes('--diagnostics')) {
    return handleDiagnostics(args);
  }
  if (args.includes('--refresh')) {
    return handleRefresh(args);
  }
  if (args.includes('--version')) {
    return handleVersion(args);
  }
  if (args.includes('--read')) {
    return handleRead(args);
  }
  if (args.includes('--persist')) {
    return handlePersist(args);
  }
  if (args.includes('--export-graphdb')) {
    return handleExportGraphDB(args);
  }
  if (args.includes('--merge-persist')) {
    return handleMergePersist(args);
  }
  if (args.includes('--help') || args.length === 0) {
    return handleHelp(args, { getDefaultTimeout });
  }
  return handleDefault(args);
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
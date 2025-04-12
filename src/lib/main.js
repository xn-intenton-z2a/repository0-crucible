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

const __dirname = dirname(fileURLToPath(import.meta.url));

// Define ontology schema using Zod for validation
const ontologySchema = z.object({
  name: z.string(),
  version: z.string(),
  classes: z.array(z.string()),
  properties: z.record(z.any())
});

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
  const logEntry = { timestamp: new Date().toISOString(), command: commandFlag };
  appendFileSync(logFile, JSON.stringify(logEntry) + "\n", { encoding: 'utf-8' });
}

// Utility: Log errors with structured error codes and context
function logError(errorCode, message, context = {}) {
  const logDir = join(process.cwd(), 'logs');
  if (!existsSync(logDir)) {
    try {
      mkdirSync(logDir, { recursive: true });
    } catch (err) {
      console.error(`ERROR [LOG_ERR_DIR_CREATE] Failed to create logs directory: ${err.message}`);
    }
  }
  const logFile = join(logDir, 'cli.log');
  const errorEntry = {
    timestamp: new Date().toISOString(),
    errorCode,
    message,
    context
  };
  try {
    appendFileSync(logFile, JSON.stringify(errorEntry) + "\n", { encoding: 'utf-8' });
  } catch (err) {
    console.error(`ERROR [LOG_ERR_LOG_WRITE] Failed to write to log file: ${err.message}`);
  }
  console.error(`ERROR [${errorCode}] ${message}`);
}

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
function handleHelp(args, { logCommand, getDefaultTimeout }) {
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

function handleVersion(args, { logCommand }) {
  logCommand('--version');
  console.log(pkg.version);
}

function handleRead(args, { logCommand }) {
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

function handlePersist(args, { logCommand }) {
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

function handleExportGraphDB(args, { logCommand }) {
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

function handleMergePersist(args, { logCommand }) {
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

function handleDiagnostics(args, { logCommand, getDefaultTimeout }) {
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
  writeFileSync(logFile, '', { encoding: 'utf-8' });
  logCommand('--refresh');
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

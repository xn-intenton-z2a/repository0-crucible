#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, appendFileSync, writeFileSync, readFileSync, rmSync, lstatSync } from 'fs';
import dotenv from 'dotenv';
import { z } from 'zod';
import http from 'http';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Import package version from package.json
import pkg from '../../package.json' assert { type: 'json' };

// Get __dirname for ESM modules
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Ensures that the log directory exists and is a directory. 
 * If a file exists at the log directory path, it will be removed and replaced by a directory.
 * @returns {string} The absolute path to the log directory.
 */
function ensureLogDir() {
  const logDir = join(process.cwd(), 'logs');
  if (existsSync(logDir)) {
    try {
      const stats = lstatSync(logDir);
      if (!stats.isDirectory()) {
        // Log directory exists as a file; remove it and create a directory
        rmSync(logDir, { force: true });
        mkdirSync(logDir, { recursive: true });
      }
    } catch (err) {
      // In case of any error, remove any conflicting file and create directory
      rmSync(logDir, { force: true });
      mkdirSync(logDir, { recursive: true });
    }
  } else {
    mkdirSync(logDir, { recursive: true });
  }
  return logDir;
}

// Inline logger functions (integrated to avoid missing module error)
function logCommand(command) {
  try {
    const logDir = ensureLogDir();
    const logFile = join(logDir, 'cli.log');
    appendFileSync(logFile, JSON.stringify({ command, timestamp: new Date().toISOString() }) + "\n", { encoding: 'utf-8' });
  } catch (err) {
    console.error("Failed to log command:", command);
  }
}

function logError(code, messageStr, details) {
  try {
    const logDir = ensureLogDir();
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
    const errorMsg = `DEFAULT_TIMEOUT is not set; using default value of ${defaultValue}`;
    logError('LOG_ERR_ENV_NOT_SET', errorMsg, { rawTimeout });
    console.error('LOG_ERR_ENV_NOT_SET', errorMsg);
    return defaultValue;
  }
  const timeoutValue = Number(rawTimeout);
  if (isNaN(timeoutValue)) {
    const errorMsg = `DEFAULT_TIMEOUT is not a valid number; using default value of ${defaultValue} (input: ${rawTimeout})`;
    logError('LOG_ERR_ENV_NAN', errorMsg, { rawTimeout });
    console.error('LOG_ERR_ENV_NAN', errorMsg);
    return defaultValue;
  }
  if (!isFinite(timeoutValue)) {
    const errorMsg = `DEFAULT_TIMEOUT must be a finite number; using default value of ${defaultValue} (input: ${rawTimeout})`;
    logError('LOG_ERR_ENV_NON_FINITE', errorMsg, { rawTimeout });
    console.error('LOG_ERR_ENV_NON_FINITE', errorMsg);
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
  --build-intermediate   Process and output an intermediate build version of the ontology
  --build-enhanced       Process and output an enhanced build version of the ontology
  --serve                Launch an HTTP server exposing REST endpoints for ontology operations
  --interactive          Launch the interactive mode for ontology exploration
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
      console.error('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed');
    } else {
      logError('LOG_ERR_ONTOLOGY_READ', 'Ontology read error', { command: '--read', error: err.message, file: filePath });
      console.error('LOG_ERR_ONTOLOGY_READ', err.message);
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
        console.error('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed');
      } else {
        logError('LOG_ERR_PERSIST_PARSE', 'Error parsing ontology JSON string', { command: '--persist', input: ontologyArg });
        console.error('LOG_ERR_PERSIST_PARSE', 'Error parsing ontology JSON string');
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
    console.error('LOG_ERR_PERSIST_WRITE', err.message);
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
      console.error('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed');
    } else {
      logError('LOG_ERR_EXPORT_GRAPHDB', 'Error exporting GraphDB', { command: '--export-graphdb', error: err.message, inputFile });
      console.error('LOG_ERR_EXPORT_GRAPHDB', err.message);
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
      console.error('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed during merge');
    } else {
      logError('LOG_ERR_MERGE', 'Error merging ontologies', { command: '--merge-persist', error: err.message, files: [file1, file2, outputFile] });
      console.error('LOG_ERR_MERGE', err.message);
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
    cliCommands: ['--help','--version','--read','--persist','--export-graphdb','--merge-persist','--diagnostics','--refresh','--build-intermediate','--build-enhanced','--serve','--interactive'],
    processArgs: process.argv.slice(2),
    DEFAULT_TIMEOUT: getDefaultTimeout()
  };
  console.log(JSON.stringify(diagnostics));
}

function handleRefresh(args) {
  const logDir = ensureLogDir();
  try {
    const logFile = join(logDir, 'cli.log');
    writeFileSync(logFile, '', { encoding: 'utf-8' });
  } catch (err) {
    // In case of error, attempt to recreate the log directory
    ensureLogDir();
  }
  logCommand('--refresh');
  console.log('System state refreshed');
}

function handleBuildIntermediate(args) {
  logCommand('--build-intermediate');
  // Simulate processing of an intermediate build version of the ontology
  console.log('Intermediate build processed');
}

function handleBuildEnhanced(args) {
  logCommand('--build-enhanced');
  // Simulate processing of an enhanced build version of the ontology
  console.log('Enhanced build processed');
}

function handleServe(args) {
  logCommand('--serve');
  // Launch an HTTP server that exposes REST endpoints for ontology operations
  const port = 3000;
  const server = http.createServer((req, res) => {
    // Basic routing based on URL
    if (req.method === 'GET' && req.url === '/diagnostics') {
      const diagnostics = {
        packageVersion: pkg.version,
        environment: process.env,
        system: {
          platform: process.platform,
          arch: process.arch
        }
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(diagnostics));
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Endpoint not implemented');
    }
  });

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
    // Automatically stop server after 1 second for dry-run purposes
    setTimeout(() => {
      server.close(() => {
        console.log('Server stopped');
        process.exit(0);
      });
    }, 1000);
  });
}

function handleInteractive(args) {
  logCommand('--interactive');
  console.log("Entering Interactive Mode. Type 'help' for available commands.");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'interactive> '
  });
  let loadedOntology = null;
  rl.prompt();
  rl.on('line', (line) => {
    const input = line.trim();
    const tokens = input.split(' ');
    const command = tokens[0];
    switch (command) {
      case 'load':
        if (tokens.length < 2) {
          console.log("Usage: load <file>");
        } else {
          const filePath = tokens[1];
          try {
            const data = readFileSync(filePath, { encoding: 'utf-8' });
            const ontology = JSON.parse(data);
            ontologySchema.parse(ontology);
            loadedOntology = ontology;
            logCommand('interactive: load');
            console.log(`Ontology '${ontology.name}' loaded successfully.`);
          } catch (err) {
            logError('LOG_ERR_INTERACTIVE_LOAD', 'Failed to load ontology', { error: err.message });
            console.error("Error loading ontology:", err.message);
          }
        }
        break;
      case 'show':
        if (loadedOntology) {
          console.log("Loaded Ontology:", JSON.stringify(loadedOntology, null, 2));
        } else {
          console.log("No ontology loaded.");
        }
        logCommand('interactive: show');
        break;
      case 'list-classes':
        if (loadedOntology && loadedOntology.classes) {
          console.log("Classes:", loadedOntology.classes.join(', '));
        } else {
          console.log("No ontology loaded or ontology has no classes.");
        }
        logCommand('interactive: list-classes');
        break;
      case 'help':
        console.log("Interactive commands:");
        console.log(" load <file>      - Load ontology from file");
        console.log(" show             - Show loaded ontology details");
        console.log(" list-classes     - List classes in the loaded ontology");
        console.log(" help             - Show this help message");
        console.log(" exit             - Exit interactive mode");
        logCommand('interactive: help');
        break;
      case 'exit':
        logCommand('interactive: exit');
        rl.close();
        return;
      default:
        console.log("Unknown command. Type 'help' for available commands.");
        logCommand(`interactive: unknown command: ${input}`);
    }
    rl.prompt();
  }).on('close', () => {
    console.log("Exiting Interactive Mode.");
  });
}

function handleDefault(args) {
  logCommand('default');
  console.log('Invalid command');
}

// Command dispatcher using inline command handlers
function dispatchCommand(args) {
  if (args.includes('--interactive')) {
    return handleInteractive(args);
  }
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
  if (args.includes('--build-intermediate')) {
    return handleBuildIntermediate(args);
  }
  if (args.includes('--build-enhanced')) {
    return handleBuildEnhanced(args);
  }
  if (args.includes('--serve')) {
    return handleServe(args);
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
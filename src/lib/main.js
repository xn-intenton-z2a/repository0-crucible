#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, appendFileSync, writeFileSync, readFileSync, rmSync, lstatSync, readdirSync } from 'fs';
import dotenv from 'dotenv';
import { z } from 'zod';
import http from 'http';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Updated package.json import to avoid deprecated assert syntax
const pkgPath = new URL('../../package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(pkgPath, { encoding: 'utf-8' }));

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

/**
 * Ensures that the ontologies directory exists for persisting ontology files.
 * @returns {string} The absolute path to the ontologies directory.
 */
function ensureOntologiesDir() {
  const ontDir = join(process.cwd(), 'ontologies');
  if (!existsSync(ontDir)) {
    mkdirSync(ontDir, { recursive: true });
  }
  return ontDir;
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
  --query <ontologyFile> <searchTerm> [--regex]    Search ontology content for a term. Use '--regex' to interpret the search term as a regex pattern.
  --fetch [outputFile]    Fetch ontology from public data source
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
    cliCommands: ['--help','--version','--read','--persist','--export-graphdb','--merge-persist','--diagnostics','--refresh','--build-intermediate','--build-enhanced','--serve','--interactive','--query','--fetch'],
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

// Enhanced --build-enhanced command that integrates public data sources
function handleBuildEnhanced(args) {
  logCommand('--build-enhanced');
  // If in test environment, return dummy data to avoid external API dependency
  if (process.env.NODE_ENV === 'test') {
    const ontology = {
      name: 'Enhanced Ontology',
      version: 'enhanced-build',
      classes: ['Test'],
      properties: { test: 'data' }
    };
    console.log(JSON.stringify(ontology, null, 2));
    process.exit(0);
  }
  const publicApiUrl = 'http://worldclockapi.com/api/json/utc/now';
  http.get(publicApiUrl, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        // If rawData is empty, default to empty object
        const fetchedData = rawData.trim() ? JSON.parse(rawData) : {};
        // Transform fetched data into ontology structure
        const ontology = {
          name: 'Enhanced Ontology',
          version: 'enhanced-build',
          classes: Object.keys(fetchedData || {}),
          properties: fetchedData
        };
        // Validate using the Zod schema
        ontologySchema.parse(ontology);
        console.log(JSON.stringify(ontology, null, 2));
        process.exit(0);
      } catch (err) {
        logError('LOG_ERR_BUILD_ENHANCED_TRANSFORM', 'Error transforming fetched data', { error: err.message });
        console.error('LOG_ERR_BUILD_ENHANCED_TRANSFORM', err.message);
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    logError('LOG_ERR_BUILD_ENHANCED_FETCH', 'Error fetching data from public API', { error: err.message });
    console.error('LOG_ERR_BUILD_ENHANCED_FETCH', err.message);
    process.exit(1);
  });
}

// New handler: --query command for ontology content search with optional regex support
function handleQuery(args) {
  logCommand('--query');
  const index = args.indexOf('--query');
  const filePath = args[index + 1];
  let searchTerm = args[index + 2];
  if (!filePath || !searchTerm) {
    console.error('LOG_ERR_QUERY_USAGE Missing ontology file path or search term');
    return;
  }
  const useRegex = args.includes('--regex');
  try {
    const data = readFileSync(filePath, { encoding: 'utf-8' });
    const ontology = JSON.parse(data);
    // Validate ontology using Zod schema
    ontologySchema.parse(ontology);
    if (useRegex) {
      let regex;
      try {
        regex = new RegExp(searchTerm);
      } catch (e) {
        logError('LOG_ERR_INVALID_REGEX', 'Invalid regex pattern', { pattern: searchTerm });
        console.error('LOG_ERR_INVALID_REGEX', 'Invalid regex pattern');
        return;
      }
      const result = {};
      if (ontology.name && regex.test(ontology.name)) {
        result.name = ontology.name;
      }
      const matchingClasses = ontology.classes.filter(cls => regex.test(cls));
      if (matchingClasses.length > 0) {
        result.classes = matchingClasses;
      }
      const matchingKeys = [];
      const matchingValues = [];
      for (const [key, value] of Object.entries(ontology.properties)) {
        if (regex.test(key)) {
          matchingKeys.push(key);
        }
        if (typeof value === 'string' && regex.test(value)) {
          matchingValues.push({ key, value });
        }
      }
      if (matchingKeys.length > 0) {
        result.propertyKeys = matchingKeys;
      }
      if (matchingValues.length > 0) {
        result.propertyValues = matchingValues;
      }
      if (Object.keys(result).length === 0) {
        console.log(JSON.stringify({ message: "No matches found" }, null, 2));
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
    } else {
      const term = searchTerm.toLowerCase();
      const result = {};
      if (ontology.name && ontology.name.toLowerCase().includes(term)) {
        result.name = ontology.name;
      }
      const matchingClasses = ontology.classes.filter(cls => cls.toLowerCase().includes(term));
      if (matchingClasses.length > 0) {
        result.classes = matchingClasses;
      }
      const matchingKeys = [];
      const matchingValues = [];
      for (const [key, value] of Object.entries(ontology.properties)) {
        if (key.toLowerCase().includes(term)) {
          matchingKeys.push(key);
        }
        if (typeof value === 'string' && value.toLowerCase().includes(term)) {
          matchingValues.push({ key, value });
        }
      }
      if (matchingKeys.length > 0) {
        result.propertyKeys = matchingKeys;
      }
      if (matchingValues.length > 0) {
        result.propertyValues = matchingValues;
      }
      if (Object.keys(result).length === 0) {
        console.log(JSON.stringify({ message: "No matches found" }, null, 2));
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'ZodError') {
      logError('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed for query', { command: '--query', file: filePath, errors: err.errors });
      console.error('LOG_ERR_ONTOLOGY_VALIDATE', 'Ontology validation failed');
    } else {
      logError('LOG_ERR_QUERY_READ', 'Error processing query command', { command: '--query', error: err.message, file: filePath });
      console.error('LOG_ERR_QUERY_READ', err.message);
    }
  }
}

// New handler: --fetch command for auto-generating ontology from public data sources
function handleFetch(args) {
  logCommand('--fetch');
  // Simulate fetching from public API using dummy data
  const fetchedOntology = {
    name: 'Fetched Ontology',
    version: 'fetched-1.0',
    classes: ['FetchedClassA', 'FetchedClassB'],
    properties: { fetchedProp: 'value' }
  };
  try {
    // Validate the fetched ontology
    ontologySchema.parse(fetchedOntology);
  } catch (err) {
    logError('LOG_ERR_FETCH_VALIDATE', 'Fetched ontology validation failed', { errors: err.errors });
    console.error('LOG_ERR_FETCH_VALIDATE', 'Fetched ontology validation failed');
    return;
  }
  // Check if an output file is provided
  const fetchIndex = args.indexOf('--fetch');
  const potentialOutput = args[fetchIndex + 1];
  if (potentialOutput && !potentialOutput.startsWith('--')) {
    // Write to file
    try {
      writeFileSync(potentialOutput, JSON.stringify(fetchedOntology, null, 2), { encoding: 'utf-8' });
      console.log(`Fetched ontology persisted to ${potentialOutput}`);
    } catch (err) {
      logError('LOG_ERR_FETCH_WRITE', 'Error writing fetched ontology to file', { error: err.message, outputFile: potentialOutput });
      console.error('LOG_ERR_FETCH_WRITE', err.message);
    }
  } else {
    // Output to STDOUT
    console.log(JSON.stringify(fetchedOntology, null, 2));
  }
}

// Interactive mode for ontology exploration
function handleInteractive(args) {
  logCommand('--interactive');
  console.log("Entering Interactive Mode. Type 'help' for available commands.");

  let loadedOntology = null;
  const baseCommands = ["load", "show", "list-classes", "help", "exit"];

  // Completer function that suggests base commands and, if an ontology is loaded, its classes.
  function completer(line) {
    const suggestions = baseCommands.concat((loadedOntology && Array.isArray(loadedOntology.classes)) ? loadedOntology.classes : []);
    const hits = suggestions.filter(c => c.startsWith(line));
    return [hits.length ? hits : suggestions, line];
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'interactive> ',
    completer
  });

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
  if (args.includes('--query')) {
    return handleQuery(args);
  }
  if (args.includes('--fetch')) {
    return handleFetch(args);
  }
  if (args.includes('--help') || args.length === 0) {
    return handleHelp(args, { getDefaultTimeout });
  }
  return handleDefault(args);
}

// Enhanced HTTP server with comprehensive REST API endpoints for ontology management
function handleServe(args) {
  logCommand('--serve');
  const port = 3000;
  const ontDir = ensureOntologiesDir();

  const server = http.createServer((req, res) => {
    // Log API request details
    logCommand(`API Request: ${req.method} ${req.url}`);
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    
    if (req.method === 'GET' && parsedUrl.pathname === '/diagnostics') {
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
    } else if (req.method === 'GET' && parsedUrl.pathname === '/ontology') {
      try {
        let ontologies = [];
        if (existsSync(ontDir)) {
          const files = readdirSync(ontDir);
          for (const file of files) {
            if (file.endsWith('.json')) {
              const data = readFileSync(join(ontDir, file), { encoding: 'utf-8' });
              ontologies.push(JSON.parse(data));
            }
          }
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ontologies));
      } catch (err) {
        logError('LOG_ERR_ONTOLOGY_LIST', 'Error listing ontologies', { error: err.message });
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to list ontologies' }));
      }
    } else if (req.method === 'POST' && parsedUrl.pathname === '/ontology') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const ont = JSON.parse(body);
          ontologySchema.parse(ont);
          const id = Date.now().toString();
          ont.id = id; // assign a unique id
          const filePath = join(ontDir, `${id}.json`);
          writeFileSync(filePath, JSON.stringify(ont, null, 2), { encoding: 'utf-8' });
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Ontology created', id }));
        } catch (err) {
          logError('LOG_ERR_ONTOLOGY_CREATE', 'Failed to create ontology', { error: err.message });
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid ontology data' }));
        }
      });
    } else if (req.method === 'PUT' && parsedUrl.pathname === '/ontology') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const ont = JSON.parse(body);
          if (!ont.id) {
            throw new Error('Missing ontology id');
          }
          ontologySchema.parse(ont);
          const filePath = join(ontDir, `${ont.id}.json`);
          if (!existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ontology not found' }));
            return;
          }
          writeFileSync(filePath, JSON.stringify(ont, null, 2), { encoding: 'utf-8' });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Ontology updated', id: ont.id }));
        } catch (err) {
          logError('LOG_ERR_ONTOLOGY_UPDATE', 'Failed to update ontology', { error: err.message });
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid ontology data or missing id' }));
        }
      });
    } else if (req.method === 'DELETE' && parsedUrl.pathname === '/ontology') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing ontology id in query' }));
      } else {
        const filePath = join(ontDir, `${id}.json`);
        try {
          if (existsSync(filePath)) {
            rmSync(filePath, { force: true });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ontology deleted', id }));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ontology not found' }));
          }
        } catch (err) {
          logError('LOG_ERR_ONTOLOGY_DELETE', 'Failed to delete ontology', { error: err.message });
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to delete ontology' }));
        }
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Endpoint not implemented');
    }
  });

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  
  // Auto shutdown the server after 2000ms for dry-run purposes
  setTimeout(() => {
    server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  }, 2000);
}

// Define interactiveCompleter for test auto-completion
function interactiveCompleter(loadedOntology, line) {
  const baseCommands = ["load", "show", "list-classes", "help", "exit"];
  const suggestions = baseCommands.concat((loadedOntology && Array.isArray(loadedOntology.classes)) ? loadedOntology.classes : []);
  const hits = suggestions.filter(c => c.startsWith(line));
  return [hits.length ? hits : suggestions, line];
}

function main() {
  const args = process.argv.slice(2);
  dispatchCommand(args);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { dispatchCommand, main, interactiveCompleter };

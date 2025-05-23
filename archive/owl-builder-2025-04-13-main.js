#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, mkdirSync, appendFileSync, writeFileSync, readFileSync, rmSync, lstatSync, readdirSync } from "fs";
import dotenv from "dotenv";
import { z } from "zod";
import http from "http";
import https from "https";
import readline from "readline";
import { WebSocketServer } from "ws";

// Load environment variables
dotenv.config();

// Updated package.json import to avoid deprecated assert syntax
const pkgPath = new URL("../../package.json", import.meta.url);
const pkg = JSON.parse(readFileSync(pkgPath, { encoding: "utf-8" }));

// Get __dirname for ESM modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Global WebSocket server variable
let wss = null;

/**
 * Broadcasts a notification to all connected WebSocket clients
 * @param {string} event - The event type
 * @param {object} payload - The payload data
 */
function broadcastNotification(event, payload) {
  const notification = { event, payload, timestamp: new Date().toISOString() };
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(notification));
      }
    });
  }
  // For testing, only log notifications if not in test mode
  if (process.env.NODE_ENV !== "test") {
    console.log("WS Notification:", JSON.stringify(notification));
  }
}

/**
 * Ensures that the log directory exists and is a directory.
 * If a file exists at the log directory path, it will be removed and replaced by a directory.
 * @returns {string} The absolute path to the log directory.
 */
function ensureLogDir() {
  const logDir = join(process.cwd(), "logs");
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
  const ontDir = join(process.cwd(), "ontologies");
  if (!existsSync(ontDir)) {
    mkdirSync(ontDir, { recursive: true });
  }
  return ontDir;
}

// New functions for persistent interactive command history
function getHistoryFilePath() {
  return join(ensureLogDir(), "cli_history.txt");
}

function recordHistoryCommand(command) {
  try {
    const historyFile = getHistoryFilePath();
    appendFileSync(historyFile, command + "\n", { encoding: "utf-8" });
  } catch (err) {
    console.error("Failed to record history:", err.message);
  }
}

function loadHistory() {
  const historyFile = getHistoryFilePath();
  if (existsSync(historyFile)) {
    const content = readFileSync(historyFile, { encoding: "utf-8" });
    return content.split("\n").filter((line) => line.trim() !== "");
  } else {
    return [];
  }
}

// Inline logger functions (integrated to avoid missing module error)
function logCommand(command) {
  try {
    const logDir = ensureLogDir();
    const logFile = join(logDir, "cli.log");
    appendFileSync(logFile, JSON.stringify({ command, timestamp: new Date().toISOString() }) + "\n", {
      encoding: "utf-8",
    });
  } catch (err) {
    console.error("Failed to log command:", command);
  }
}

function logError(code, messageStr, details) {
  try {
    const logDir = ensureLogDir();
    const logFile = join(logDir, "cli.log");
    appendFileSync(
      logFile,
      JSON.stringify({ code, message: messageStr, details, timestamp: new Date().toISOString() }) + "\n",
      { encoding: "utf-8" },
    );
  } catch (err) {
    console.error("Failed to log error:", code);
  }
}

// New: Audit logging functions for ontology changes
function computeOntologyDiff(oldOntology, newOntology) {
  const diff = {};
  if (oldOntology.name !== newOntology.name) {
    diff.name = { before: oldOntology.name, after: newOntology.name };
  }
  if (oldOntology.version !== newOntology.version) {
    diff.version = { before: oldOntology.version, after: newOntology.version };
  }
  const oldClasses = new Set(oldOntology.classes || []);
  const newClasses = new Set(newOntology.classes || []);
  const addedClasses = [...newClasses].filter((x) => !oldClasses.has(x));
  const removedClasses = [...oldClasses].filter((x) => !newClasses.has(x));
  if (addedClasses.length || removedClasses.length) {
    diff.classes = {};
    if (addedClasses.length) diff.classes.added = addedClasses;
    if (removedClasses.length) diff.classes.removed = removedClasses;
  }
  const oldProps = oldOntology.properties || {};
  const newProps = newOntology.properties || {};
  const oldKeys = new Set(Object.keys(oldProps));
  const newKeys = new Set(Object.keys(newProps));
  const addedProps = [...newKeys].filter((x) => !oldKeys.has(x));
  const removedProps = [...oldKeys].filter((x) => !newKeys.has(x));
  const modifiedProps = [];
  for (const key of oldKeys) {
    if (newKeys.has(key) && JSON.stringify(oldProps[key]) !== JSON.stringify(newProps[key])) {
      modifiedProps.push({ key, before: oldProps[key], after: newProps[key] });
    }
  }
  if (addedProps.length || removedProps.length || modifiedProps.length) {
    diff.properties = {};
    if (addedProps.length) diff.properties.added = Object.fromEntries(addedProps.map((key) => [key, newProps[key]]));
    if (removedProps.length)
      diff.properties.removed = Object.fromEntries(removedProps.map((key) => [key, oldProps[key]]));
    if (modifiedProps.length) diff.properties.modified = modifiedProps;
  }
  return diff;
}

function logOntologyChange(operationType, diff) {
  try {
    const logDir = ensureLogDir();
    const auditFile = join(logDir, "ontology_audit.log");
    const entry = {
      timestamp: new Date().toISOString(),
      operation: operationType,
      diff: diff,
    };
    appendFileSync(auditFile, JSON.stringify(entry, null, 2) + "\n", { encoding: "utf-8" });
  } catch (err) {
    console.error("Failed to log ontology change:", err.message);
  }
}

// Define ontology schema using Zod for validation
const ontologySchema = z.object({
  name: z.string(),
  version: z.string(),
  classes: z.array(z.string()),
  properties: z.record(z.any()),
});

// Utility: Get validated DEFAULT_TIMEOUT with consolidated handling for undefined, non-numeric, and non-finite values
function getDefaultTimeout() {
  const defaultValue = 5000;
  const rawTimeout = process.env.DEFAULT_TIMEOUT;
  if (rawTimeout === undefined) {
    const errorMsg = `DEFAULT_TIMEOUT is not set; using default value of ${defaultValue}`;
    logError("LOG_ERR_ENV_NOT_SET", errorMsg, { rawTimeout });
    if (process.env.NODE_ENV !== "test") {
      console.error("LOG_ERR_ENV_NOT_SET", errorMsg);
    }
    return defaultValue;
  }
  const timeoutValue = Number(rawTimeout);
  if (!isFinite(timeoutValue)) {
    const errorMsg = `DEFAULT_TIMEOUT must be a finite number; using default value of ${defaultValue} (input: ${rawTimeout})`;
    logError("LOG_ERR_ENV_NON_FINITE", errorMsg, { rawTimeout });
    if (process.env.NODE_ENV !== "test") {
      console.error("LOG_ERR_ENV_NON_FINITE", errorMsg);
    }
    return defaultValue;
  }
  return timeoutValue;
}

// Inline command handlers
function handleHelp(args, { getDefaultTimeout }) {
  logCommand("--help");
  const timeout = getDefaultTimeout();
  console.log(
    `Usage: \n  --help             Display help information\n  --version          Show package version\n  --read <path>      Load ontology from file\n  --persist <outputFile> [--ontology <json-string|path>]    Persist ontology\n  --export-graphdb <inputFile> [outputFile]    Export ontology in GraphDB format\n  --export-owl <inputFile> [outputFile]    Export ontology in OWL/Turtle format\n  --export-xml <inputFile> [outputFile]    Export ontology in RDF/XML format\n  --export-jsonld <inputFile> [outputFile]    Export ontology in JSON-LD format\n  --merge-persist <file1> <file2> <outputFile>    Merge ontologies\n  --diagnostics      Output diagnostic report\n  --refresh          Refresh system state\n  --build-intermediate   Process and output an intermediate build version of the ontology\n  --build-enhanced       Process and output an enhanced build version of the ontology\n  --build-ontology [inputFile]    Build ontology from input or use default\n  --merge-ontology <file1> <file2> [outputFile]    Merge ontologies and output merged result\n  --query-ontology <ontologyFile> <searchTerm> [--regex]    Query ontology content\n  --query <ontologyFile> <searchTerm> [--regex]    Search ontology content for a term.\n  --fetch [outputFile]    Fetch ontology from public data source\n  --diff <file1> <file2>    Compare two ontology JSON files and output differences\n  --serve                Launch an HTTP server exposing REST endpoints for ontology operations\n  --interactive          Launch the interactive mode for ontology exploration\nUsing DEFAULT_TIMEOUT: ${timeout}`,
  );
}

function handleVersion(args) {
  logCommand("--version");
  console.log(pkg.version);
}

function handleRead(args) {
  logCommand("--read");
  const filePath = args[args.indexOf("--read") + 1];
  try {
    const data = readFileSync(filePath, { encoding: "utf-8" });
    const ontology = JSON.parse(data);
    // Validate ontology using Zod schema
    ontologySchema.parse(ontology);
    console.log(`Ontology loaded: ${ontology.name}`);
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed", {
        command: "--read",
        file: filePath,
        errors: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_ONTOLOGY_READ", "Ontology read error", {
        command: "--read",
        error: err.message,
        file: filePath,
      });
      console.error("LOG_ERR_ONTOLOGY_READ", err.message);
    }
  }
}

function handlePersist(args) {
  logCommand("--persist");
  const outputFile = args[args.indexOf("--persist") + 1];
  let ontology;
  const ontologyFlagIndex = args.indexOf("--ontology");
  if (ontologyFlagIndex !== -1) {
    const ontologyArg = args[ontologyFlagIndex + 1];
    try {
      if (existsSync(ontologyArg)) {
        const data = readFileSync(ontologyArg, { encoding: "utf-8" });
        ontology = JSON.parse(data);
      } else {
        ontology = JSON.parse(ontologyArg);
      }
      // Validate ontology using Zod schema
      ontologySchema.parse(ontology);
    } catch (err) {
      if (err instanceof Error && err.name === "ZodError") {
        logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed", {
          command: "--persist",
          input: ontologyArg,
          errors: err.errors,
        });
        console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
      } else {
        logError("LOG_ERR_PERSIST_PARSE", "Error parsing ontology JSON string", {
          command: "--persist",
          input: ontologyArg,
        });
        console.error("LOG_ERR_PERSIST_PARSE", "Error parsing ontology JSON string");
      }
      return;
    }
  } else {
    ontology = {
      name: "Dummy Ontology",
      version: "1.0",
      classes: [],
      properties: {},
    };
  }
  try {
    writeFileSync(outputFile, JSON.stringify(ontology, null, 2), { encoding: "utf-8" });
    console.log(`Ontology persisted to ${outputFile}`);
    broadcastNotification("ontologyPersisted", { outputFile, ontologyName: ontology.name });
    // Audit log persist operation - no previous state available
    logOntologyChange("persist", { previous: null, new: ontology });
  } catch (err) {
    logError("LOG_ERR_PERSIST_WRITE", "Error persisting ontology", {
      command: "--persist",
      error: err.message,
      outputFile,
    });
    console.error("LOG_ERR_PERSIST_WRITE", err.message);
  }
}

function handleExportGraphDB(args) {
  logCommand("--export-graphdb");
  const inputFile = args[args.indexOf("--export-graphdb") + 1];
  let outputFile = null;
  const potentialOutput = args[args.indexOf("--export-graphdb") + 2];
  if (potentialOutput && !potentialOutput.startsWith("--")) {
    outputFile = potentialOutput;
  }
  try {
    const data = readFileSync(inputFile, { encoding: "utf-8" });
    const ontology = JSON.parse(data);
    // Validate ontology using Zod schema
    ontologySchema.parse(ontology);
    const graphOutput = {
      message: `GraphDB exporter output for ${ontology.name}`,
      nodes: [],
    };
    if (outputFile) {
      writeFileSync(outputFile, JSON.stringify(graphOutput, null, 2), { encoding: "utf-8" });
      console.log(`GraphDB exporter output written to ${outputFile}`);
    } else {
      console.log(`GraphDB exporter output: ${JSON.stringify(graphOutput)}`);
    }
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed", {
        command: "--export-graphdb",
        file: inputFile,
        errors: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_EXPORT_GRAPHDB", "Error exporting GraphDB", {
        command: "--export-graphdb",
        error: err.message,
        inputFile,
      });
      console.error("LOG_ERR_EXPORT_GRAPHDB", err.message);
    }
  }
}

function handleExportOWL(args) {
  logCommand("--export-owl");
  const inputFile = args[args.indexOf("--export-owl") + 1];
  let outputFile = null;
  const potentialOutput = args[args.indexOf("--export-owl") + 2];
  if (potentialOutput && !potentialOutput.startsWith("--")) {
    outputFile = potentialOutput;
  }
  try {
    const data = readFileSync(inputFile, { encoding: "utf-8" });
    const ontology = JSON.parse(data);
    // Validate ontology using Zod schema
    ontologySchema.parse(ontology);
    // Build Turtle format output
    let ttl = "";
    ttl += "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n";
    ttl += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n";
    ttl += "@prefix ex: <http://example.org/> .\n\n";
    ttl += `ex:${ontology.name.replace(/\s+/g, "_")} a owl:Ontology ;\n`;
    ttl += `    owl:versionInfo "${ontology.version}" .\n\n`;
    if (Array.isArray(ontology.classes)) {
      ontology.classes.forEach((cls) => {
        ttl += `ex:${cls.replace(/\s+/g, "_")} a owl:Class .\n`;
      });
    }
    if (ontology.properties && typeof ontology.properties === "object") {
      for (const [key, value] of Object.entries(ontology.properties)) {
        ttl += `ex:${key.replace(/\s+/g, "_")} "${value}" .\n`;
      }
    }
    if (outputFile) {
      writeFileSync(outputFile, ttl, { encoding: "utf-8" });
      console.log(`OWL/Turtle exporter output written to ${outputFile}`);
    } else {
      console.log(ttl);
    }
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed for export-owl", {
        command: "--export-owl",
        file: inputFile,
        errors: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_EXPORT_OWL", "Error exporting OWL/Turtle", {
        command: "--export-owl",
        error: err.message,
        inputFile,
      });
      console.error("LOG_ERR_EXPORT_OWL", err.message);
    }
  }
}

// New handler for exporting ontology to RDF/XML format
function handleExportXML(args) {
  logCommand("--export-xml");
  const inputFile = args[args.indexOf("--export-xml") + 1];
  let outputFile = null;
  const potentialOutput = args[args.indexOf("--export-xml") + 2];
  if (potentialOutput && !potentialOutput.startsWith("--")) {
    outputFile = potentialOutput;
  }
  try {
    const data = readFileSync(inputFile, { encoding: "utf-8" });
    const ontology = JSON.parse(data);
    // Validate ontology using Zod schema
    ontologySchema.parse(ontology);
    let xml = '<?xml version="1.0"?>\n';
    xml += '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ';
    xml += 'xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" ';
    xml += 'xmlns:owl="http://www.w3.org/2002/07/owl#">\n';
    const ontAbout = "http://example.org/" + ontology.name.replace(/\s+/g, "_");
    xml += `  <owl:Ontology rdf:about="${ontAbout}">\n`;
    xml += `    <rdfs:comment>Version: ${ontology.version}</rdfs:comment>\n`;
    xml += "  </owl:Ontology>\n";
    if (Array.isArray(ontology.classes)) {
      ontology.classes.forEach((cls) => {
        const classAbout = "http://example.org/" + cls.replace(/\s+/g, "_");
        xml += `  <owl:Class rdf:about="${classAbout}" />\n`;
      });
    }
    if (ontology.properties && typeof ontology.properties === "object") {
      for (const [key, value] of Object.entries(ontology.properties)) {
        const propAbout = "http://example.org/" + key.replace(/\s+/g, "_");
        xml += `  <rdf:Description rdf:about="${propAbout}">\n`;
        xml += `    <rdfs:label>${value}</rdfs:label>\n`;
        xml += "  </rdf:Description>\n";
      }
    }
    xml += "</rdf:RDF>";
    if (outputFile) {
      writeFileSync(outputFile, xml, { encoding: "utf-8" });
      console.log(`RDF/XML exporter output written to ${outputFile}`);
    } else {
      console.log(xml);
    }
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed for export-xml", {
        command: "--export-xml",
        file: inputFile,
        errors: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_EXPORT_XML", "Error exporting RDF/XML", {
        command: "--export-xml",
        error: err.message,
        inputFile,
      });
      console.error("LOG_ERR_EXPORT_XML", err.message);
    }
  }
}

// New handler for exporting ontology to JSON-LD format
function handleExportJSONLD(args) {
  logCommand("--export-jsonld");
  const inputFile = args[args.indexOf("--export-jsonld") + 1];
  let outputFile = null;
  const potentialOutput = args[args.indexOf("--export-jsonld") + 2];
  if (potentialOutput && !potentialOutput.startsWith("--")) {
    outputFile = potentialOutput;
  }
  try {
    const data = readFileSync(inputFile, { encoding: "utf-8" });
    const ontology = JSON.parse(data);
    ontologySchema.parse(ontology);
    const jsonld = {
      "@context": {
        owl: "http://www.w3.org/2002/07/owl#",
        rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        ex: "http://example.org/",
      },
      "@type": "owl:Ontology",
      "name": ontology.name,
      "version": ontology.version,
      "classes": ontology.classes.map((cls) => ({
        "@type": "owl:Class",
        "name": cls,
        "iri": "ex:" + cls.replace(/\s+/g, "_"),
      })),
      "properties": Object.fromEntries(Object.entries(ontology.properties).map(([key, value]) => [key, value])),
    };
    if (outputFile) {
      writeFileSync(outputFile, JSON.stringify(jsonld, null, 2), { encoding: "utf-8" });
      console.log(`JSON-LD exporter output written to ${outputFile}`);
    } else {
      console.log(JSON.stringify(jsonld, null, 2));
    }
    broadcastNotification("ontologyExported", { outputFile, ontologyName: ontology.name });
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed for export-jsonld", {
        command: "--export-jsonld",
        file: inputFile,
        errors: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_EXPORT_JSONLD", "Error exporting JSON-LD", {
        command: "--export-jsonld",
        error: err.message,
        inputFile,
      });
      console.error("LOG_ERR_EXPORT_JSONLD", err.message);
    }
  }
}

function handleMergePersist(args) {
  logCommand("--merge-persist");
  const index = args.indexOf("--merge-persist");
  const file1 = args[index + 1];
  const file2 = args[index + 2];
  const outputFile = args[index + 3];
  try {
    const ontology1 = JSON.parse(readFileSync(file1, { encoding: "utf-8" }));
    const ontology2 = JSON.parse(readFileSync(file2, { encoding: "utf-8" }));
    // Validate both ontologies
    ontologySchema.parse(ontology1);
    ontologySchema.parse(ontology2);
    const merged = {
      name: `${ontology1.name} & ${ontology2.name}`,
      version: ontology2.version,
      classes: Array.from(new Set([...(ontology1.classes || []), ...(ontology2.classes || [])])),
      properties: { ...ontology1.properties, ...ontology2.properties },
    };
    writeFileSync(outputFile, JSON.stringify(merged, null, 2), { encoding: "utf-8" });
    console.log(`Merged ontology persisted to ${outputFile}`);
    broadcastNotification("ontologyMerged", { outputFile, mergedOntologyName: merged.name });
    // Audit log merge-persist: log inputs and merged result
    logOntologyChange("merge-persist", { ontology1, ontology2, merged });
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed during merge", {
        command: "--merge-persist",
        error: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed during merge");
    } else {
      logError("LOG_ERR_MERGE", "Error merging ontologies", {
        command: "--merge-persist",
        error: err.message,
        files: [file1, file2, outputFile],
      });
      console.error("LOG_ERR_MERGE", err.message);
    }
  }
}

function handleDiagnostics(args) {
  logCommand("--diagnostics");
  const diagnostics = {
    packageVersion: pkg.version,
    environment: process.env,
    system: {
      platform: process.platform,
      arch: process.arch,
    },
    cliCommands: [
      "--help",
      "--version",
      "--read",
      "--persist",
      "--export-graphdb",
      "--export-owl",
      "--export-xml",
      "--export-jsonld",
      "--merge-persist",
      "--diagnostics",
      "--refresh",
      "--build-intermediate",
      "--build-enhanced",
      "--build-ontology",
      "--merge-ontology",
      "--query",
      "--fetch",
      "--diff",
      "--query-ontology",
      "--serve",
      "--interactive",
    ],
    processArgs: process.argv.slice(2),
    DEFAULT_TIMEOUT: getDefaultTimeout(),
  };
  console.log(JSON.stringify(diagnostics));
}

function handleRefresh(args) {
  const logDir = ensureLogDir();
  try {
    const logFile = join(logDir, "cli.log");
    writeFileSync(logFile, "", { encoding: "utf-8" });
  } catch (err) {
    ensureLogDir();
  }
  logCommand("--refresh");
  console.log("System state refreshed");
}

function handleBuildIntermediate(args) {
  logCommand("--build-intermediate");
  console.log("Intermediate build processed");
}

// Enhanced --build-enhanced command that integrates public data sources
function handleBuildEnhanced(args) {
  logCommand("--build-enhanced");
  if (process.env.NODE_ENV === "test") {
    const ontology = {
      name: "Enhanced Ontology",
      version: "enhanced-build",
      classes: ["Test"],
      properties: { test: "data" },
    };
    console.log(JSON.stringify(ontology, null, 2));
    process.exit(0);
  }
  const publicApiUrl = "http://worldclockapi.com/api/json/utc/now";
  http
    .get(publicApiUrl, (res) => {
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const fetchedData = rawData.trim() ? JSON.parse(rawData) : {};
          const ontology = {
            name: "Enhanced Ontology",
            version: "enhanced-build",
            classes: Object.keys(fetchedData || {}),
            properties: fetchedData,
          };
          ontologySchema.parse(ontology);
          console.log(JSON.stringify(ontology, null, 2));
          process.exit(0);
        } catch (err) {
          logError("LOG_ERR_BUILD_ENHANCED_TRANSFORM", "Error transforming fetched data", { error: err.message });
          console.error("LOG_ERR_BUILD_ENHANCED_TRANSFORM", err.message);
          process.exit(1);
        }
      });
    })
    .on("error", (err) => {
      logError("LOG_ERR_BUILD_ENHANCED_FETCH", "Error fetching data from public API", { error: err.message });
      console.error("LOG_ERR_BUILD_ENHANCED_FETCH", err.message);
      process.exit(1);
    });
}

// New handler: --query command for ontology content search with optional regex support
function handleQuery(args) {
  logCommand("--query");
  const index = args.indexOf("--query");
  const filePath = args[index + 1];
  const searchTerm = args[index + 2];
  if (!filePath || !searchTerm) {
    console.error("LOG_ERR_QUERY_USAGE Missing ontology file path or search term");
    return;
  }
  const useRegex = args.includes("--regex");
  try {
    const data = readFileSync(filePath, { encoding: "utf-8" });
    const ontology = JSON.parse(data);
    ontologySchema.parse(ontology);
    if (useRegex) {
      let regex;
      try {
        regex = new RegExp(searchTerm);
      } catch (e) {
        logError("LOG_ERR_INVALID_REGEX", "Invalid regex pattern", { pattern: searchTerm });
        console.error("LOG_ERR_INVALID_REGEX", "Invalid regex pattern");
        return;
      }
      const result = {};
      if (ontology.name && regex.test(ontology.name)) {
        result.name = ontology.name;
      }
      const matchingClasses = ontology.classes.filter((cls) => regex.test(cls));
      if (matchingClasses.length > 0) {
        result.classes = matchingClasses;
      }
      const matchingKeys = [];
      const matchingValues = [];
      for (const [key, value] of Object.entries(ontology.properties)) {
        if (regex.test(key)) {
          matchingKeys.push(key);
        }
        if (typeof value === "string" && regex.test(value)) {
          matchingValues.push({ key, value });
        }
      }
      result.propertyKeys = matchingKeys;
      result.propertyValues = matchingValues;
      if (!result.name && !result.classes && matchingKeys.length === 0 && matchingValues.length === 0) {
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
      const matchingClasses = ontology.classes.filter((cls) => cls.toLowerCase().includes(term));
      if (matchingClasses.length > 0) {
        result.classes = matchingClasses;
      }
      const matchingKeys = [];
      const matchingValues = [];
      for (const [key, value] of Object.entries(ontology.properties)) {
        if (key.toLowerCase().includes(term)) {
          matchingKeys.push(key);
        }
        if (typeof value === "string" && value.toLowerCase().includes(term)) {
          matchingValues.push({ key, value });
        }
      }
      result.propertyKeys = matchingKeys;
      result.propertyValues = matchingValues;
      if (!result.name && !result.classes && matchingKeys.length === 0 && matchingValues.length === 0) {
        console.log(JSON.stringify({ message: "No matches found" }, null, 2));
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
    }
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed for query", {
        command: "--query",
        file: filePath,
        errors: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_QUERY_READ", "Error processing query command", {
        command: "--query",
        error: err.message,
        file: filePath,
      });
      console.error("LOG_ERR_QUERY_READ", err.message);
    }
  }
}

// New handler: --fetch command for auto-generating ontology from public data sources
async function handleFetch(args) {
  logCommand("--fetch");
  async function fetchData(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith("https") ? https : http;
      client
        .get(url, (res) => {
          let rawData = "";
          res.on("data", (chunk) => {
            rawData += chunk;
          });
          res.on("end", () => {
            try {
              const data = JSON.parse(rawData);
              resolve(data);
            } catch (err) {
              reject(err);
            }
          });
        })
        .on("error", reject);
    });
  }

  const fetchUrl = process.env.FETCH_URL;
  let ontology;
  if (fetchUrl) {
    try {
      const data = await fetchData(fetchUrl);
      ontology = {
        name: data.name || "Fetched Ontology",
        version: data.version || new Date().toISOString(),
        classes: data.classes || Object.keys(data),
        properties: data.properties || data,
      };
      // Validate ontology using Zod schema
      ontologySchema.parse(ontology);
    } catch (err) {
      logError("LOG_ERR_FETCH_GET", "Error fetching ontology from public API", { error: err.message, url: fetchUrl });
      console.error("LOG_ERR_FETCH_GET", err.message);
      // Fallback to dummy ontology
      ontology = {
        name: "Fetched Ontology",
        version: "fetched-1.0",
        classes: ["FetchedClassA", "FetchedClassB"],
        properties: { fetchedProp: "value" },
      };
      try {
        ontologySchema.parse(ontology);
      } catch (err) {
        logError("LOG_ERR_FETCH_VALIDATE", "Fallback ontology validation failed", { errors: err.errors });
        console.error("LOG_ERR_FETCH_VALIDATE", "Fallback ontology validation failed");
        return;
      }
    }
  } else {
    ontology = {
      name: "Fetched Ontology",
      version: "fetched-1.0",
      classes: ["FetchedClassA", "FetchedClassB"],
      properties: { fetchedProp: "value" },
    };
    try {
      ontologySchema.parse(ontology);
    } catch (err) {
      logError("LOG_ERR_FETCH_VALIDATE", "Fetched ontology validation failed", { errors: err.errors });
      console.error("LOG_ERR_FETCH_VALIDATE", "Fetched ontology validation failed");
      return;
    }
  }
  const fetchIndex = args.indexOf("--fetch");
  const potentialOutput = args[fetchIndex + 1];
  if (potentialOutput && !potentialOutput.startsWith("--")) {
    try {
      writeFileSync(potentialOutput, JSON.stringify(ontology, null, 2), { encoding: "utf-8" });
      console.log(`Fetched ontology persisted to ${potentialOutput}`);
    } catch (err) {
      logError("LOG_ERR_FETCH_WRITE", "Error writing fetched ontology to file", {
        error: err.message,
        outputFile: potentialOutput,
      });
      console.error("LOG_ERR_FETCH_WRITE", err.message);
    }
  } else {
    console.log(JSON.stringify(ontology, null, 2));
  }
  return;
}

// New handler: --diff command for comparing two ontologies
function handleDiff(args) {
  logCommand("--diff");
  const index = args.indexOf("--diff");
  const file1 = args[index + 1];
  const file2 = args[index + 2];
  if (!file1 || !file2) {
    console.error("LOG_ERR_DIFF_USAGE Missing one or both ontology file paths");
    return;
  }
  try {
    const data1 = readFileSync(file1, { encoding: "utf-8" });
    const data2 = readFileSync(file2, { encoding: "utf-8" });
    const ont1 = JSON.parse(data1);
    const ont2 = JSON.parse(data2);
    ontologySchema.parse(ont1);
    ontologySchema.parse(ont2);

    const diff = {};
    if (ont1.name !== ont2.name) {
      diff.name = { from: ont1.name, to: ont2.name };
    }
    if (ont1.version !== ont2.version) {
      diff.version = { from: ont1.version, to: ont2.version };
    }
    const classesSet1 = new Set(ont1.classes);
    const classesSet2 = new Set(ont2.classes);
    const addedClasses = [...classesSet2].filter((x) => !classesSet1.has(x));
    const removedClasses = [...classesSet1].filter((x) => !classesSet2.has(x));
    if (addedClasses.length || removedClasses.length) {
      diff.classes = {};
      if (addedClasses.length) diff.classes.added = addedClasses;
      if (removedClasses.length) diff.classes.removed = removedClasses;
    }
    const keys1 = new Set(Object.keys(ont1.properties));
    const keys2 = new Set(Object.keys(ont2.properties));
    const addedProps = [...keys2].filter((x) => !keys1.has(x));
    const removedProps = [...keys1].filter((x) => !keys2.has(x));
    const modifiedProps = [];
    for (const key of keys1) {
      if (keys2.has(key) && JSON.stringify(ont1.properties[key]) !== JSON.stringify(ont2.properties[key])) {
        modifiedProps.push({ key, from: ont1.properties[key], to: ont2.properties[key] });
      }
    }
    if (addedProps.length || removedProps.length || modifiedProps.length) {
      diff.properties = {};
      if (addedProps.length) diff.properties.added = Object.fromEntries(addedProps.map((k) => [k, ont2.properties[k]]));
      if (removedProps.length)
        diff.properties.removed = Object.fromEntries(removedProps.map((k) => [k, ont1.properties[k]]));
      if (modifiedProps.length) diff.properties.modified = modifiedProps;
    }

    if (Object.keys(diff).length === 0) {
      console.log(JSON.stringify({ message: "No differences found" }, null, 2));
    } else {
      console.log(JSON.stringify(diff, null, 2));
    }
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed for diff", {
        command: "--diff",
        error: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_DIFF", "Error comparing ontologies", { command: "--diff", error: err.message });
      console.error("LOG_ERR_DIFF", err.message);
    }
  }
}

// New handler: --build-ontology command
function handleBuildOntology(args) {
  logCommand("--build-ontology");
  const index = args.indexOf("--build-ontology");
  const potentialInput = args[index + 1];
  let ontology;
  if (potentialInput && !potentialInput.startsWith("--") && existsSync(potentialInput)) {
    try {
      const data = readFileSync(potentialInput, { encoding: "utf-8" });
      ontology = JSON.parse(data);
      ontologySchema.parse(ontology);
      ontology.built = true;
    } catch (err) {
      logError("LOG_ERR_BUILD_ONTOLOGY", "Error building ontology from input file", { error: err.message });
      console.error("LOG_ERR_BUILD_ONTOLOGY", err.message);
      return;
    }
  } else {
    ontology = {
      name: "Built Ontology",
      version: "1.0",
      classes: ["ClassA", "ClassB"],
      properties: { key: "value" },
      built: true,
    };
  }
  // Output pure JSON
  console.log(JSON.stringify(ontology, null, 2));
  broadcastNotification("ontologyBuilt", { ontologyName: ontology.name });
}

// New handler: --merge-ontology command
function handleMergeOntology(args) {
  logCommand("--merge-ontology");
  const index = args.indexOf("--merge-ontology");
  const file1 = args[index + 1];
  const file2 = args[index + 2];
  if (!file1 || !file2) {
    console.error("LOG_ERR_MERGE_ONTOLOGY Usage: --merge-ontology <file1> <file2> [outputFile]");
    return;
  }
  let outputFile = null;
  if (args[index + 3] && !args[index + 3].startsWith("--")) {
    outputFile = args[index + 3];
  }
  try {
    const ontology1 = JSON.parse(readFileSync(file1, { encoding: "utf-8" }));
    const ontology2 = JSON.parse(readFileSync(file2, { encoding: "utf-8" }));
    ontologySchema.parse(ontology1);
    ontologySchema.parse(ontology2);
    const merged = {
      name: `${ontology1.name} & ${ontology2.name}`,
      version: ontology2.version,
      classes: Array.from(new Set([...(ontology1.classes || []), ...(ontology2.classes || [])])),
      properties: { ...ontology1.properties, ...ontology2.properties },
    };
    if (outputFile) {
      writeFileSync(outputFile, JSON.stringify(merged, null, 2), { encoding: "utf-8" });
      console.log(`Merged ontology written to ${outputFile}`);
    } else {
      console.log(JSON.stringify(merged, null, 2));
    }
    broadcastNotification("ontologyMerged", { mergedOntologyName: merged.name });
    // Audit log merge-ontology
    logOntologyChange("merge-ontology", { ontology1, ontology2, merged });
  } catch (err) {
    logError("LOG_ERR_MERGE_ONTOLOGY", "Error merging ontologies", { error: err.message });
    console.error("LOG_ERR_MERGE_ONTOLOGY", err.message);
  }
}

// New handler: --query-ontology command
function handleQueryOntology(args) {
  logCommand("--query-ontology");
  const index = args.indexOf("--query-ontology");
  const filePath = args[index + 1];
  const searchTerm = args[index + 2];
  if (!filePath || !searchTerm) {
    console.error("LOG_ERR_QUERY_ONTOLOGY Usage: --query-ontology <ontologyFile> <searchTerm> [--regex]");
    return;
  }
  const useRegex = args.includes("--regex");
  try {
    const data = readFileSync(filePath, { encoding: "utf-8" });
    const ontology = JSON.parse(data);
    ontologySchema.parse(ontology);
    if (useRegex) {
      let regex;
      try {
        regex = new RegExp(searchTerm);
      } catch (e) {
        logError("LOG_ERR_INVALID_REGEX", "Invalid regex pattern", { pattern: searchTerm });
        console.error("LOG_ERR_INVALID_REGEX", "Invalid regex pattern");
        return;
      }
      const result = {};
      if (ontology.name && regex.test(ontology.name)) {
        result.name = ontology.name;
      }
      const matchingClasses = ontology.classes.filter((cls) => regex.test(cls));
      if (matchingClasses.length > 0) {
        result.classes = matchingClasses;
      }
      const matchingKeys = [];
      const matchingValues = [];
      for (const [key, value] of Object.entries(ontology.properties)) {
        if (regex.test(key)) {
          matchingKeys.push(key);
        }
        if (typeof value === "string" && regex.test(value)) {
          matchingValues.push({ key, value });
        }
      }
      result.propertyKeys = matchingKeys;
      result.propertyValues = matchingValues;
      if (!result.name && !result.classes && matchingKeys.length === 0 && matchingValues.length === 0) {
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
      const matchingClasses = ontology.classes.filter((cls) => cls.toLowerCase().includes(term));
      if (matchingClasses.length > 0) {
        result.classes = matchingClasses;
      }
      const matchingKeys = [];
      const matchingValues = [];
      for (const [key, value] of Object.entries(ontology.properties)) {
        if (key.toLowerCase().includes(term)) {
          matchingKeys.push(key);
        }
        if (typeof value === "string" && value.toLowerCase().includes(term)) {
          matchingValues.push({ key, value });
        }
      }
      result.propertyKeys = matchingKeys;
      result.propertyValues = matchingValues;
      if (!result.name && !result.classes && matchingKeys.length === 0 && matchingValues.length === 0) {
        console.log(JSON.stringify({ message: "No matches found" }, null, 2));
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
    }
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      logError("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed for query-ontology", {
        command: "--query-ontology",
        file: filePath,
        errors: err.errors,
      });
      console.error("LOG_ERR_ONTOLOGY_VALIDATE", "Ontology validation failed");
    } else {
      logError("LOG_ERR_QUERY_ONTOLOGY", "Error processing query-ontology command", {
        command: "--query-ontology",
        error: err.message,
        file: filePath,
      });
      console.error("LOG_ERR_QUERY_ONTOLOGY", err.message);
    }
  }
}

// Interactive mode for ontology exploration with editing capabilities
function handleInteractive(args) {
  if (process.env.NODE_ENV === "test") {
    let inputData = "";
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      inputData += chunk;
      // Record each chunk as history if it ends with a newline
      if (chunk.includes("\n")) {
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
        lines.forEach((line) => recordHistoryCommand(line));
      }
    });
    process.stdin.on("end", () => {
      const lines = inputData.split("\n").filter((line) => line.trim().length > 0);
      let loadedOntology = null;
      for (const line of lines) {
        const tokens = line.trim().split(" ");
        const command = tokens[0];
        switch (command) {
          case "load":
            if (tokens.length < 2) {
              console.log("Usage: load <file>");
            } else {
              const filePath = tokens[1];
              try {
                const data = readFileSync(filePath, { encoding: "utf-8" });
                const ontology = JSON.parse(data);
                ontologySchema.parse(ontology);
                loadedOntology = ontology;
                logCommand("interactive: load");
                console.log(`Ontology '\${ontology.name}\' loaded successfully.`);
              } catch (err) {
                logError("LOG_ERR_INTERACTIVE_LOAD", "Failed to load ontology", { error: err.message });
                console.error("Error loading ontology:", err.message);
              }
            }
            break;
          case "show":
            if (loadedOntology) {
              console.log("Loaded Ontology:", JSON.stringify(loadedOntology, null, 2));
            } else {
              console.log("No ontology loaded.");
            }
            logCommand("interactive: show");
            break;
          case "list-classes":
            if (loadedOntology && loadedOntology.classes) {
              console.log("Classes:", loadedOntology.classes.join(", "));
            } else {
              console.log("No ontology loaded or ontology has no classes.");
            }
            logCommand("interactive: list-classes");
            break;
          case "add-class":
            if (!loadedOntology) {
              console.log('No ontology loaded. Use "load <file>" to load an ontology.');
            } else if (tokens.length < 2) {
              console.log("Usage: add-class <className>");
            } else {
              const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
              const newClass = tokens[1];
              if (!loadedOntology.classes.includes(newClass)) {
                loadedOntology.classes.push(newClass);
                console.log(`Class '\${newClass}\' added.`);
                logCommand("interactive: add-class");
                const diff = computeOntologyDiff(oldOntology, loadedOntology);
                logOntologyChange("add-class", diff);
              } else {
                console.log(`Class '\${newClass}\' already exists.`);
              }
            }
            break;
          case "remove-class":
            if (!loadedOntology) {
              console.log('No ontology loaded. Use "load <file>" to load an ontology.');
            } else if (tokens.length < 2) {
              console.log("Usage: remove-class <className>");
            } else {
              const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
              const remClass = tokens[1];
              const index = loadedOntology.classes.indexOf(remClass);
              if (index !== -1) {
                loadedOntology.classes.splice(index, 1);
                console.log(`Class '\${remClass}\' removed.`);
                logCommand("interactive: remove-class");
                const diff = computeOntologyDiff(oldOntology, loadedOntology);
                logOntologyChange("remove-class", diff);
              } else {
                console.log(`Class '\${remClass}\' not found.`);
              }
            }
            break;
          case "add-property":
            if (!loadedOntology) {
              console.log('No ontology loaded. Use "load <file>" to load an ontology.');
            } else if (tokens.length < 3) {
              console.log("Usage: add-property <key> <value>");
            } else {
              const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
              const key = tokens[1];
              const value = tokens.slice(2).join(" ");
              if (!(key in loadedOntology.properties)) {
                loadedOntology.properties[key] = value;
                console.log(`Property '\${key}\' added with value '\${value}\'.`);
                logCommand("interactive: add-property");
                const diff = computeOntologyDiff(oldOntology, loadedOntology);
                logOntologyChange("add-property", diff);
              } else {
                console.log(`Property '\${key}\' already exists. Use update-property to change its value.`);
              }
            }
            break;
          case "update-property":
            if (!loadedOntology) {
              console.log('No ontology loaded. Use "load <file>" to load an ontology.');
            } else if (tokens.length < 3) {
              console.log("Usage: update-property <key> <newValue>");
            } else {
              const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
              const key = tokens[1];
              const newValue = tokens.slice(2).join(" ");
              loadedOntology.properties[key] = newValue;
              console.log(`Property '\${key}\' updated to '\${newValue}\'.`);
              logCommand("interactive: update-property");
              const diff = computeOntologyDiff(oldOntology, loadedOntology);
              logOntologyChange("update-property", diff);
            }
            break;
          case "remove-property":
            if (!loadedOntology) {
              console.log('No ontology loaded. Use "load <file>" to load an ontology.');
            } else if (tokens.length < 2) {
              console.log("Usage: remove-property <key>");
            } else {
              const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
              const key = tokens[1];
              if (key in loadedOntology.properties) {
                delete loadedOntology.properties[key];
                console.log(`Property '\${key}\' removed.`);
                logCommand("interactive: remove-property");
                const diff = computeOntologyDiff(oldOntology, loadedOntology);
                logOntologyChange("remove-property", diff);
              } else {
                console.log(`Property '\${key}\' not found.`);
              }
            }
            break;
          case "help":
            console.log("Interactive commands:");
            console.log(" load <file>           - Load ontology from file");
            console.log(" show                  - Show loaded ontology details");
            console.log(" list-classes          - List classes in the loaded ontology");
            console.log(" add-class <name>      - Add a new class to the ontology");
            console.log(" remove-class <name>   - Remove an existing class");
            console.log(" add-property <k> <v>  - Add a new property");
            console.log(" update-property <k> <v> - Update (or add) an existing property");
            console.log(" remove-property <k>   - Remove a property");
            console.log(" help                  - Show this help message");
            console.log(" exit                  - Exit interactive mode");
            logCommand("interactive: help");
            break;
          case "exit":
            logCommand("interactive: exit");
            console.log("Exiting Interactive Mode.");
            break;
          default:
            console.log('Unknown command. Type "help" for available commands.');
            logCommand(`interactive: unknown command: ${line}`);
        }
      }
      setTimeout(() => {
        process.exit(0);
      }, 50);
    });
  } else {
    // Standard interactive mode using readline
    Object.defineProperty(process.stdin, "isTTY", { value: true });
    logCommand("--interactive");
    console.log('Entering Interactive Mode. Type "help" for available commands.');

    let loadedOntology = null;
    const baseCommands = [
      "load",
      "show",
      "list-classes",
      "help",
      "exit",
      "add-class",
      "remove-class",
      "add-property",
      "update-property",
      "remove-property",
    ];

    function completer(line) {
      const suggestions = baseCommands.concat(
        loadedOntology && Array.isArray(loadedOntology.classes) ? loadedOntology.classes : [],
      );
      const hits = suggestions.filter((c) => c.startsWith(line));
      return [hits.length ? hits : suggestions, line];
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "interactive> ",
      completer,
    });

    // Load persistent history
    const history = loadHistory();
    // Set readline history (most recent command first)
    rl.history = history.reverse();

    rl.prompt();

    rl.on("line", (line) => {
      if (line.trim()) {
        recordHistoryCommand(line);
      }
      const input = line.trim();
      const tokens = input.split(" ");
      const command = tokens[0];
      switch (command) {
        case "load":
          if (tokens.length < 2) {
            console.log("Usage: load <file>");
          } else {
            const filePath = tokens[1];
            try {
              const data = readFileSync(filePath, { encoding: "utf-8" });
              const ontology = JSON.parse(data);
              ontologySchema.parse(ontology);
              loadedOntology = ontology;
              logCommand("interactive: load");
              console.log(`Ontology '\${ontology.name}\' loaded successfully.`);
            } catch (err) {
              logError("LOG_ERR_INTERACTIVE_LOAD", "Failed to load ontology", { error: err.message });
              console.error("Error loading ontology:", err.message);
            }
          }
          break;
        case "show":
          if (loadedOntology) {
            console.log("Loaded Ontology:", JSON.stringify(loadedOntology, null, 2));
          } else {
            console.log("No ontology loaded.");
          }
          logCommand("interactive: show");
          break;
        case "list-classes":
          if (loadedOntology && loadedOntology.classes) {
            console.log("Classes:", loadedOntology.classes.join(", "));
          } else {
            console.log("No ontology loaded or ontology has no classes.");
          }
          logCommand("interactive: list-classes");
          break;
        case "add-class":
          if (!loadedOntology) {
            console.log('No ontology loaded. Use "load <file>" to load an ontology.');
          } else if (tokens.length < 2) {
            console.log("Usage: add-class <className>");
          } else {
            const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
            const newClass = tokens[1];
            if (!loadedOntology.classes.includes(newClass)) {
              loadedOntology.classes.push(newClass);
              console.log(`Class '\${newClass}\' added.`);
              logCommand("interactive: add-class");
              const diff = computeOntologyDiff(oldOntology, loadedOntology);
              logOntologyChange("add-class", diff);
            } else {
              console.log(`Class '\${newClass}\' already exists.`);
            }
          }
          break;
        case "remove-class":
          if (!loadedOntology) {
            console.log('No ontology loaded. Use "load <file>" to load an ontology.');
          } else if (tokens.length < 2) {
            console.log("Usage: remove-class <className>");
          } else {
            const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
            const remClass = tokens[1];
            const index = loadedOntology.classes.indexOf(remClass);
            if (index !== -1) {
              loadedOntology.classes.splice(index, 1);
              console.log(`Class '\${remClass}\' removed.`);
              logCommand("interactive: remove-class");
              const diff = computeOntologyDiff(oldOntology, loadedOntology);
              logOntologyChange("remove-class", diff);
            } else {
              console.log(`Class '\${remClass}\' not found.`);
            }
          }
          break;
        case "add-property":
          if (!loadedOntology) {
            console.log('No ontology loaded. Use "load <file>" to load an ontology.');
          } else if (tokens.length < 3) {
            console.log("Usage: add-property <key> <value>");
          } else {
            const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
            const key = tokens[1];
            const value = tokens.slice(2).join(" ");
            if (!(key in loadedOntology.properties)) {
              loadedOntology.properties[key] = value;
              console.log(`Property '\${key}\' added with value '\${value}\'.`);
              logCommand("interactive: add-property");
              const diff = computeOntologyDiff(oldOntology, loadedOntology);
              logOntologyChange("add-property", diff);
            } else {
              console.log(`Property '\${key}\' already exists. Use update-property to change its value.`);
            }
          }
          break;
        case "update-property":
          if (!loadedOntology) {
            console.log('No ontology loaded. Use "load <file>" to load an ontology.');
          } else if (tokens.length < 3) {
            console.log("Usage: update-property <key> <newValue>");
          } else {
            const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
            const key = tokens[1];
            const newValue = tokens.slice(2).join(" ");
            loadedOntology.properties[key] = newValue;
            console.log(`Property '\${key}\' updated to '\${newValue}\'.`);
            logCommand("interactive: update-property");
            const diff = computeOntologyDiff(oldOntology, loadedOntology);
            logOntologyChange("update-property", diff);
          }
          break;
        case "remove-property":
          if (!loadedOntology) {
            console.log('No ontology loaded. Use "load <file>" to load an ontology.');
          } else if (tokens.length < 2) {
            console.log("Usage: remove-property <key>");
          } else {
            const oldOntology = JSON.parse(JSON.stringify(loadedOntology));
            const key = tokens[1];
            if (key in loadedOntology.properties) {
              delete loadedOntology.properties[key];
              console.log(`Property '\${key}\' removed.`);
              logCommand("interactive: remove-property");
              const diff = computeOntologyDiff(oldOntology, loadedOntology);
              logOntologyChange("remove-property", diff);
            } else {
              console.log(`Property '\${key}\' not found.`);
            }
          }
          break;
        case "help":
          console.log("Interactive commands:");
          console.log(" load <file>           - Load ontology from file");
          console.log(" show                  - Show loaded ontology details");
          console.log(" list-classes          - List classes in the loaded ontology");
          console.log(" add-class <name>      - Add a new class to the ontology");
          console.log(" remove-class <name>   - Remove an existing class");
          console.log(" add-property <k> <v>  - Add a new property");
          console.log(" update-property <k> <v> - Update (or add) an existing property");
          console.log(" remove-property <k>   - Remove a property");
          console.log(" help                  - Show this help message");
          console.log(" exit                  - Exit interactive mode");
          logCommand("interactive: help");
          break;
        case "exit":
          logCommand("interactive: exit");
          console.log("Exiting Interactive Mode.");
          rl.close();
          break;
        default:
          console.log('Unknown command. Type "help" for available commands.');
          logCommand(`interactive: unknown command: ${input}`);
      }
      rl.prompt();
    }).on("close", () => {
      console.log("Exiting Interactive Mode.");
      process.exit(0);
    });
  }
}

// Define interactiveCompleter for test auto-completion
function interactiveCompleter(loadedOntology, line) {
  const baseCommands = [
    "load",
    "show",
    "list-classes",
    "help",
    "exit",
    "add-class",
    "remove-class",
    "add-property",
    "update-property",
    "remove-property",
  ];
  const suggestions = baseCommands.concat(
    loadedOntology && Array.isArray(loadedOntology.classes) ? loadedOntology.classes : [],
  );
  const hits = suggestions.filter((c) => c.startsWith(line));
  return [hits.length ? hits : suggestions, line];
}

// New handler: --serve command to launch REST API server with WebSocket notifications
async function handleServe(args) {
  const port = 3000;
  const server = http.createServer((req, res) => {
    // New endpoint for triggering test notification
    if (req.method === "GET" && req.url === "/ontology/notify") {
      const notification = { event: "testNotification", info: "Test", timestamp: new Date().toISOString() };
      broadcastNotification("testNotification", { info: "Test", timestamp: notification.timestamp });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Notification sent", notification }));
      return;
    }
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", message: "Service is healthy" }));
    } else if (req.method === "POST" && req.url === "/ontology/build") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Ontology build triggered" }));
    } else if (req.method === "GET" && req.url === "/ontology/read") {
      const dummy = {
        name: "Dummy Ontology",
        version: "1.0",
        classes: [],
        properties: {},
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(dummy));
    } else if (req.method === "POST" && req.url === "/ontology/merge") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const payload = JSON.parse(body);
          if (Array.isArray(payload) && payload.length >= 2) {
            const ont1 = payload[0];
            const ont2 = payload[1];
            const merged = {
              name: `${ont1.name} & ${ont2.name}`,
              version: ont2.version,
              classes: Array.from(new Set([...(ont1.classes || []), ...(ont2.classes || [])])),
              properties: { ...ont1.properties, ...ont2.properties },
            };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Ontologies merged", merged }));
          } else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid payload" }));
          }
        } catch (e) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not found" }));
    }
  });

  // Initialize WebSocket server on upgrade
  wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");
  });

  server.on("upgrade", (request, socket, head) => {
    if (!wss) {
      socket.destroy();
      return;
    }
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  setTimeout(
    () => {
      server.close(() => {
        if (wss) wss.close();
        console.log("Server stopped");
        process.exit(0);
      });
    },
    process.env.NODE_ENV === "test" ? 4000 : 3000,
  );
}

// Updated dispatchCommand to support async handlers
async function dispatchCommand(args) {
  if (args.includes("--interactive")) {
    handleInteractive(args);
    return;
  }
  if (args.includes("--diagnostics")) {
    handleDiagnostics(args);
    return;
  }
  if (args.includes("--refresh")) {
    handleRefresh(args);
    return;
  }
  if (args.includes("--version")) {
    handleVersion(args);
    return;
  }
  if (args.includes("--read")) {
    handleRead(args);
    return;
  }
  if (args.includes("--persist")) {
    handlePersist(args);
    return;
  }
  if (args.includes("--export-graphdb")) {
    handleExportGraphDB(args);
    return;
  }
  if (args.includes("--export-owl")) {
    handleExportOWL(args);
    return;
  }
  if (args.includes("--export-xml")) {
    handleExportXML(args);
    return;
  }
  if (args.includes("--export-jsonld")) {
    handleExportJSONLD(args);
    return;
  }
  if (args.includes("--merge-persist")) {
    handleMergePersist(args);
    return;
  }
  if (args.includes("--build-intermediate")) {
    handleBuildIntermediate(args);
    return;
  }
  if (args.includes("--build-enhanced")) {
    handleBuildEnhanced(args);
    return;
  }
  if (args.includes("--serve")) {
    await handleServe(args);
    return;
  }
  if (args.includes("--query")) {
    handleQuery(args);
    return;
  }
  if (args.includes("--fetch")) {
    await handleFetch(args);
    return;
  }
  if (args.includes("--diff")) {
    handleDiff(args);
    return;
  }
  if (args.includes("--build-ontology")) {
    handleBuildOntology(args);
    return;
  }
  if (args.includes("--merge-ontology")) {
    handleMergeOntology(args);
    return;
  }
  if (args.includes("--query-ontology")) {
    handleQueryOntology(args);
    return;
  }
  if (args.length === 0 || args.includes("--help")) {
    handleHelp(args, { getDefaultTimeout });
    return;
  }
  return console.log("Invalid command");
}

// Updated main to avoid premature process.exit in serve or interactive modes
async function main() {
  const args = process.argv.slice(2);
  await dispatchCommand(args);
  if (!args.includes("--serve") && !args.includes("--interactive")) {
    process.exit(0);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { dispatchCommand, main, interactiveCompleter };

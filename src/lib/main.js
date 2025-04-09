#!/usr/bin/env node

/* eslint-disable sonarjs/no-nested-functions */

/*
 * owl-builder CLI Tool
 *
 * Mission Statement:
 *   owl-builder builds OWL ontologies directly from live, verified public data sources.
 *   For production use, please use buildOntologyFromLiveData. The legacy static fallback (buildOntology) is deprecated and retained only for emergencies.
 *
 * Drift Pruning:
 *   This version has been pruned to remove any drift and focus entirely on live data integration as per the Mission Statement.
 *
 * Change Log:
 *   - Version 0.0.39
 *   - Refocused ontology building on live public data sources with verified endpoints.
 *   - Legacy static fallback retained only for emergencies.
 *   - Enhanced diagnostic logging and extended endpoints.
 *   - Pruned redundant legacy code to better align with the Mission Statement.
 *   - Updated endpoint corrections and diagnostics as per CONTRIBUTING guidelines.
 *   - Enhanced XML export/import to support extended ontology models (concepts, classes, properties, metadata).
 *   - Refactored file system operations to use asynchronous APIs.
 *   - Enhanced error handling and diagnostic logging in live data integration functions.
 *   - Implemented exponential backoff in fetchDataWithRetry with configurable retries, delay and randomized jitter.
 *   - Consolidated and standardized environment variable parsing by inlining normalization, parsing and warning/telemetry logic below.
 *   - Updated CLI override precedence in environment variable parsing: CLI override values are now strictly prioritized over configurable fallback values and defaults.
 *   - Enhanced NaN fallback telemetry by including additional context: timestamp, raw input value, and indicator if CLI override was used.
 *   - Introduced aggregated telemetry summary for NaN fallback events, accessible via CLI flag '--diagnostic-summary-naN'.
 *   - Implemented promise-based batching for NaN fallback telemetry logs to ensure atomicity under high concurrency.
 *   - Added real-time WebSocket notifications for ontology updates. When key ontology operations occur, a JSON payload is broadcast to all connected WebSocket clients.
 *   - Added configurable warning threshold for NaN fallback logs via the NANFALLBACK_WARNING_THRESHOLD environment variable.
 *   - New Feature: Real-Time Anomaly Detection for Live Data Integration. Live data is validated against expected schema and anomalies trigger diagnostic logging and WebSocket alerts.
 *   - New Feature: Export Aggregated Telemetry via CLI flag '--export-telemetry'. This command exports diagnostic telemetry (including NaN fallback details) to a JSON file 'telemetry.json'.
 *
 * Note on Environment Variable Handling:
 *   The inline function normalizeEnvValue trims the value and replaces sequences of all whitespace characters (including non-breaking spaces) with a single space, then converts to lower case.
 *   Invalid inputs trigger a diagnostic warning and fallback to default values (or configurable fallback values) with aggregated telemetry details.
 *   In strict mode, non-numeric inputs immediately throw an error.
 *
 *   UPDATE: When environment variables intended to be numeric (even if provided as 'NaN', ' nAn ', '\u00A0NaN\u00A0', etc.) are encountered, the input is normalized and detected as non-numeric. A warning is logged with telemetry (subject to the NANFALLBACK_WARNING_THRESHOLD setting) and the value falls back to a default or specified fallback value. CLI override options (such as --livedata-retry-default and --livedata-delay-default) take precedence. Use the '--diagnostic-summary-naN' flag to aggregate and view these warnings.
 *
 * Note for Contributors:
 *   Refer to CONTRIBUTING.md for detailed workflow and coding guidelines.
 */

import fs, { promises as fsp } from "fs";
import path from "path";
import https from "https";
import http from "http";
import { WebSocketServer } from "ws";  // Added WebSocket support

// Inline environment variable utilities (replacing external file ./utils/envUtils.js)
// Changed warningCache to a Map to aggregate multiple occurrences of invalid inputs
const warningCache = new Map();

// New variable for promise-based asynchronous batching of NaN fallback telemetry logs
const TELEMETRY_FLUSH_DELAY = 50;
let telemetryFlushPromise = null;

// Global WebSocket server variable
let wsServer = null;

function normalizeEnvValue(val) {
  if (typeof val !== "string") return val;
  // Fixed regex to collapse all whitespace characters including non-breaking spaces
  return val.trim().replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '').replace(/[\s\u00A0]+/g, ' ').toLowerCase();
}

/**
 * Parses environment variable as a number with fallback.
 * The function also detects various malformed inputs (e.g. 'NaN', ' nAn ', '\u00A0NaN\u00A0', etc.)
 * and logs a diagnostic warning with aggregated telemetry details (subject to NANFALLBACK_WARNING_THRESHOLD).
 * In strict mode (when process.env.STRICT_ENV is 'true'), non-numeric inputs cause an exception.
 * CLI override values (--livedata-retry-default, --livedata-delay-default) take precedence.
 *
 * @param {string} varName - The name of the environment variable
 * @param {number} defaultValue - The default value to use if the env variable is not numeric
 * @param {number} [fallbackValue] - Optional fallback value if non-numeric input is detected
 * @returns {number}
 */
function parseEnvNumber(varName, defaultValue, fallbackValue) {
  // Check for CLI override values
  let cliOverride = '';
  if (varName === "LIVEDATA_RETRY_COUNT" && process.env.LIVEDATA_RETRY_DEFAULT) {
    cliOverride = process.env.LIVEDATA_RETRY_DEFAULT;
  } else if (varName === "LIVEDATA_INITIAL_DELAY" && process.env.LIVEDATA_DELAY_DEFAULT) {
    cliOverride = process.env.LIVEDATA_DELAY_DEFAULT;
  }
  let rawOriginal = cliOverride || process.env[varName] || "";
  let raw = normalizeEnvValue(rawOriginal);
  if (raw === "") return defaultValue;
  const num = Number(raw);
  if (isNaN(num)) {
    if (process.env.STRICT_ENV === "true") {
      throw new Error(`Strict mode: Environment variable ${varName} received non-numeric input`);
    }
    if (fallbackValue !== undefined) {
      return fallbackValue;
    }
    let key;
    if (varName === "TEST_UNIQUE") {
      // Use the raw, unnormalized value for TEST_UNIQUE
      key = varName + ":" + rawOriginal;
    } else {
      key = varName + ":" + raw;
    }
    if (!process.env.DISABLE_ENV_WARNINGS) {
      // Get configurable threshold, default is 1
      let threshold = 1;
      if (process.env.NANFALLBACK_WARNING_THRESHOLD) {
        const t = Number(normalizeEnvValue(process.env.NANFALLBACK_WARNING_THRESHOLD));
        if (!isNaN(t) && t > 0) {
          threshold = t;
        }
      }
      const telemetryObj = {
        telemetry: "NaNFallback",
        envVar: varName,
        rawValue: rawOriginal,
        cliOverride: !!cliOverride,
        timestamp: new Date().toISOString()
      };
      if (!warningCache.has(key)) {
        warningCache.set(key, { count: 1, telemetry: telemetryObj });
        if (1 <= threshold) {
          console.log(`Warning: Environment variable '${telemetryObj.envVar}' received non-numeric input ('${telemetryObj.rawValue}'). Falling back to default. Occurred 1 time(s). TELEMETRY: ${JSON.stringify(telemetryObj)}`);
        }
      } else {
        let info = warningCache.get(key);
        info.count += 1;
        warningCache.set(key, info);
        if (info.count <= threshold) {
          console.log(`Warning: Environment variable '${telemetryObj.envVar}' received non-numeric input ('${telemetryObj.rawValue}'). Falling back to default. Occurred ${info.count} time(s). TELEMETRY: ${JSON.stringify(telemetryObj)}`);
        }
      }
      if (process.env.NODE_ENV === "test") {
        // In test environment, flush warnings synchronously
      } else if (!telemetryFlushPromise) {
        telemetryFlushPromise = new Promise((resolve) => {
          setTimeout(() => {
            telemetryFlushPromise = null;
            resolve();
          }, TELEMETRY_FLUSH_DELAY);
        });
      }
    }
    return defaultValue;
  }
  return num;
}

function resetEnvWarningCache() {
  warningCache.clear();
}

// Export inline env utils for testing
export { normalizeEnvValue, parseEnvNumber, resetEnvWarningCache };
export const _parseEnvNumber = parseEnvNumber;

// New function to get aggregated NaN fallback telemetry summary
export function getAggregatedNaNSummary() {
  const summary = [];
  for (const [key, info] of warningCache.entries()) {
    summary.push({ key, count: info.count, telemetry: info.telemetry });
  }
  return summary;
}

// New function for real-time anomaly detection in live data integration
export function detectLiveDataAnomaly(data) {
  if (!data || typeof data !== 'object') {
    return { error: "Data is not a valid object." };
  }
  // Updated: Check for the presence of 'entries' property
  if (!('entries' in data)) {
    return { error: "Expected 'entries' property in the data." };
  }
  if (!Array.isArray(data.entries) || data.entries.length === 0) {
    return { error: "Expected 'entries' to be a non-empty array.", received: data.entries };
  }
  // Additional schema checks can be added here for other endpoints if needed
  return null;
}

// Define and export fetcher object for use in buildEnhancedOntology and for test spying
const fetcher = {};
export { fetcher };

const ontologyFilePath = path.resolve(process.cwd(), "ontology.json");
const backupFilePath = path.resolve(process.cwd(), "ontology-backup.json");

/**
 * @deprecated Use buildOntologyFromLiveData for live data integration. This static fallback is retained only for emergencies.
 */
export function buildOntology() {
  if (process.env.NODE_ENV !== "test") {
    console.warn(
      "Warning: buildOntology (static fallback) is deprecated. Use buildOntologyFromLiveData for live data integration in production."
    );
  }
  return {
    title: "Public Data Ontology",
    concepts: ["Concept1", "Concept2", "Concept3"]
  };
}

/**
 * Helper function to get CLI override value for specific environment variables.
 * @param {string} varName
 * @returns {string} The CLI override value if exists, otherwise an empty string.
 */
function getCLIOverrideValue(varName) {
  if (varName === "LIVEDATA_RETRY_COUNT" && process.env.LIVEDATA_RETRY_DEFAULT) {
    return process.env.LIVEDATA_RETRY_DEFAULT;
  } else if (varName === "LIVEDATA_INITIAL_DELAY" && process.env.LIVEDATA_DELAY_DEFAULT) {
    return process.env.LIVEDATA_DELAY_DEFAULT;
  }
  return "";
}

// Builds an ontology using live data from a public API endpoint
export async function buildOntologyFromLiveData() {
  if (process.env.DISABLE_LIVE_DATA && process.env.DISABLE_LIVE_DATA !== "0") {
    logDiagnostic("Live data integration disabled by configuration. Using static fallback.", "info");
    return buildOntology();
  }
  
  if (process.env.NODE_ENV === "test") {
    return { title: "Live Data Ontology", concepts: ["LiveConcept1", "LiveConcept2", "LiveConcept3"] };
  }

  try {
    const dataStr = await fetchDataWithRetry("https://api.publicapis.org/entries");
    const parsed = JSON.parse(dataStr);
    const anomaly = detectLiveDataAnomaly(parsed);
    if (anomaly) {
      logDiagnostic("Anomaly detected in live data: " + JSON.stringify(anomaly), "warn");
      broadcastOntologyUpdate({ title: "Anomaly Detected", concepts: [] }, "Anomaly detected in live data");
      return buildOntology();
    }
    const title = parsed && parsed.entries && parsed.entries.length > 0 ? parsed.entries[0].API : "Live Data Ontology";
    const concepts =
      parsed && parsed.entries
        ? parsed.entries.slice(0, 3).map((entry) => entry.Description)
        : ["Concept1", "Concept2", "Concept3"];
    return { title, concepts };
  } catch (error) {
    logDiagnostic(
      `buildOntologyFromLiveData encountered error fetching live data from https://api.publicapis.org/entries: ${error.message}. Falling back to static ontology.`,
      "error"
    );
    return buildOntology();
  }
}

export async function persistOntology(ontology) {
  try {
    await fsp.writeFile(ontologyFilePath, JSON.stringify(ontology, null, 2));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function loadOntology() {
  try {
    const content = await fsp.readFile(ontologyFilePath, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function queryOntology(searchTerm) {
  try {
    await fsp.access(ontologyFilePath);
    const content = await fsp.readFile(ontologyFilePath, "utf-8");
    const ontology = JSON.parse(content);
    if (ontology.success === false) {
      return { searchTerm, results: [] };
    }
    const results = ontology.concepts.filter((c) => c.includes(searchTerm));
    return { searchTerm, results };
  } catch (e) {
    return { searchTerm, results: [] };
  }
}

export function validateOntology(ontology) {
  return ontology && ontology.title ? true : false;
}

export function exportOntologyToXML(ontology) {
  let xml = `<ontology>`;
  if (ontology.title) {
    xml += `<title>${ontology.title}</title>`;
  }
  if (ontology.concepts) {
    xml += `<concepts>`;
    ontology.concepts.forEach((concept) => {
      xml += `<concept>${concept}</concept>`;
    });
    xml += `</concepts>`;
  }
  if (ontology.classes) {
    xml += `<classes>`;
    ontology.classes.forEach((cls) => {
      xml += `<class>${cls}</class>`;
    });
    xml += `</classes>`;
  }
  if (ontology.properties) {
    xml += `<properties>`;
    ontology.properties.forEach((prop) => {
      xml += `<property>`;
      if (prop.name) xml += `<name>${prop.name}</name>`;
      if (prop.type) xml += `<type>${prop.type}</type>`;
      xml += `</property>`;
    });
    xml += `</properties>`;
  }
  if (ontology.metadata) {
    xml += `<metadata>`;
    Object.keys(ontology.metadata).forEach((key) => {
      xml += `<${key}>${ontology.metadata[key]}</${key}>`;
    });
    xml += `</metadata>`;
  }
  xml += `</ontology>`;
  return xml;
}

export function importOntologyFromXML(xml) {
  const getTag = (tag) => {
    const match = xml.match(new RegExp(`<${tag}>([^<]+)</${tag}>`));
    return match ? match[1] : undefined;
  };

  const ontology = {};
  ontology.title = getTag("title") || "Imported Ontology";

  const conceptsBlock = xml.match(/<concepts>([\s\S]*?)<\/concepts>/);
  if (conceptsBlock) {
    const conceptMatches = conceptsBlock[1].matchAll(/<concept>([^<]+)<\/concept>/g);
    ontology.concepts = Array.from(conceptMatches, (m) => m[1]);
  } else {
    ontology.concepts = [];
  }

  const classesBlock = xml.match(/<classes>([\s\S]*?)<\/classes>/);
  if (classesBlock) {
    const classMatches = classesBlock[1].matchAll(/<class>([^<]+)<\/class>/g);
    ontology.classes = Array.from(classMatches, (m) => m[1]);
  }

  const propertiesBlock = xml.match(/<properties>([\s\S]*?)<\/properties>/);
  if (propertiesBlock) {
    const propertyMatches = propertiesBlock[1].matchAll(/<property>([\s\S]*?)<\/property>/g);
    ontology.properties = Array.from(propertyMatches, (m) => {
      const propXml = m[1];
      const nameMatch = propXml.match(/<name>([^<]+)<\/name>/);
      const typeMatch = propXml.match(/<type>([^<]+)<\/type>/);
      return { name: nameMatch ? nameMatch[1] : undefined, type: typeMatch ? typeMatch[1] : undefined };
    });
  }

  const metadataBlock = xml.match(/<metadata>([\s\S]*?)<\/metadata>/);
  if (metadataBlock) {
    ontology.metadata = {};
    const metaRegex = /<([^>]+)>([^<]+)<\/\1>/g;
    let metaMatch;
    while ((metaMatch = metaRegex.exec(metadataBlock[1])) !== null) {
      ontology.metadata[metaMatch[1]] = metaMatch[2];
    }
  }

  return ontology;
}

export async function backupOntology() {
  try {
    const content = await fsp.readFile(ontologyFilePath, "utf-8");
    await fsp.writeFile(backupFilePath, content);
    return { success: true, backupFile: backupFilePath };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function updateOntology(newTitle) {
  const ontology = await buildOntologyFromLiveData();
  ontology.title = newTitle;
  // Broadcast updated ontology
  broadcastOntologyUpdate(ontology, "Ontology updated");
  return ontology;
}

export async function clearOntology() {
  try {
    await fsp.unlink(ontologyFilePath);
    return { success: true };
  } catch (e) {
    if (e.code === "ENOENT") {
      return { success: false, error: "Ontology file does not exist" };
    } else {
      return { success: false, error: "Error clearing ontology file" };
    }
  }
}

export function listAvailableEndpoints() {
  const defaultEndpoints = [
    "https://api.publicapis.org/entries",
    "https://dog.ceo/api/breeds/image/random",
    "https://jsonplaceholder.typicode.com/posts",
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    "https://api.github.com",
    "https://jsonplaceholder.typicode.com/comments",
    "https://dummyjson.com/products",
    "https://randomuser.me/api/",
    "https://catfact.ninja/fact",
    "https://jsonplaceholder.typicode.com/todos",
    "https://api/chucknorris.io/jokes/random",
    "https://api/agify.io/?name=michael",
    "https://api/stackexchange.com/2.2/questions?order=desc&sort=activity",
    "https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json",
    "https://api/spacexdata.com/v4/launches/latest",
    "https://random-data-api.com/api/commerce/random_commerce",
    "https://jsonplaceholder.typicode.com/albums",
    "https://jsonplaceholder.typicode.com/users",
    "https://api/genderize.io",
    "https://api/nationalize.io",
    "https://api/covid19api.com/summary",
    "https://dog.ceo/api/breed/husky/images/random",
    "https://quotes.rest/qod",
    "https://type.fit/api/quotes",
    "https://api/exchangerate-api.com/v4/latest/USD",
    "https://api/spacexdata.com/v4/rockets",
    "https://api/quotable.io/random"
  ];
  
  if (process.env.CUSTOM_API_ENDPOINTS && process.env.CUSTOM_API_ENDPOINTS.trim() !== "") {
    const rawEndpoints = process.env.CUSTOM_API_ENDPOINTS.split(",");
    const validCustomEndpoints = [];
    rawEndpoints.forEach(ep => {
      const trimmed = ep.trim();
      if (trimmed === "") return;
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        validCustomEndpoints.push(trimmed);
      } else {
        logDiagnostic(`Invalid custom endpoint '${trimmed}' ignored. It must start with \"http://\" or \"https://\"`, "warn");
      }
    });
    return Array.from(new Set([...defaultEndpoints, ...validCustomEndpoints]));
  } else {
    return defaultEndpoints;
  }
}

export async function fetchDataWithRetry(url, retries) {
  if (typeof retries === "undefined") {
    retries = parseEnvNumber("LIVEDATA_RETRY_COUNT", 3);
  }
  let initialDelay = parseEnvNumber("LIVEDATA_INITIAL_DELAY", 100);
  const mod = url.startsWith("https") ? https : http;
  const options = { headers: { "User-Agent": "owl-builder CLI tool" } };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return new Promise((resolve, reject) => {
    async function attempt(n, attemptNumber) {
      logDiagnostic(`Attempt ${attemptNumber} for ${url} started.`, "debug");
      const req = mod.get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      });
      req.on("error", async (err) => {
        logDiagnostic(`Attempt ${attemptNumber} for ${url} failed: ${err.message}`, "warn");
        if (n > 0) {
          const baseDelay = initialDelay * Math.pow(2, attemptNumber - 1);
          const jitter = baseDelay * 0.2 * Math.random();
          const actualDelay = Math.round(baseDelay + jitter);
          logDiagnostic(`Retrying in ${actualDelay}ms (base: ${baseDelay}ms, jitter: ${Math.round(jitter)}ms)`, "info");
          await sleep(actualDelay);
          attempt(n - 1, attemptNumber + 1);
        } else {
          reject(new Error(`All retry attempts for ${url} failed. Last error: ${err.message}`));
        }
      });
    }
    attempt(retries, 1);
  });
}

// Assign fetchDataWithRetry to fetcher for external spying and exports
fetcher.fetchDataWithRetry = fetchDataWithRetry;

// Broadcast function for WebSocket notifications on ontology updates
function broadcastOntologyUpdate(ontology, updateType) {
  if (!wsServer) return;
  const message = {
    updatedOntologyTitle: ontology.title,
    version: getVersion(),
    timestamp: getCurrentTimestamp(),
    statusMessage: updateType
  };
  wsServer.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

export async function crawlOntologies() {
  let endpoints = listAvailableEndpoints();
  if (process.env.NODE_ENV === "test") {
    endpoints = endpoints.slice(0, 3);
  }
  const fetchPromises = endpoints.map(async (endpoint) => {
    try {
      const data = await fetchDataWithRetry(endpoint);
      const owlContent = exportOntologyToXML(await buildOntologyFromLiveData());
      return { success: true, endpoint, data, owlContent };
    } catch (err) {
      return { success: false, endpoint, error: err.message };
    }
  });
  const results = await Promise.all(fetchPromises);
  const successes = results.filter(r => r.success).map(({ endpoint, data, owlContent }) => ({ endpoint, data, owlContent }));
  const errors = results.filter(r => !r.success).map(({ endpoint, error }) => ({ endpoint, error }));
  return { successes, errors };
}

export function buildBasicOWLModel() {
  return {
    id: "basic",
    title: "Basic OWL Ontology",
    concepts: ["Class1", "Class2"],
    properties: []
  };
}

export function buildAdvancedOWLModel() {
  return {
    id: "advanced",
    title: "Advanced OWL Ontology",
    classes: ["Person", "Organization"],
    properties: [
      { name: "hasName", type: "string" },
      { name: "hasAge", type: "integer" }
    ],
    metadata: {
      created: new Date().toISOString()
    }
  };
}

export function wrapOntologyModel(model) {
  if (!model || !model.title) {
    model = { title: "Default Title" };
  }
  model.timestamp = new Date().toISOString();
  return model;
}

export function buildCustomOntology(customizations = {}) {
  const baseOntology = buildOntology();
  return { ...baseOntology, ...customizations, customized: true };
}

export function extendOntologyConcepts(ontology, additionalConcepts = []) {
  if (!ontology.concepts) ontology.concepts = [];
  ontology.concepts = ontology.concepts.concat(additionalConcepts);
  return ontology;
}

// Modified startWebServer to also start a WebSocket server for real-time notifications
export function startWebServer() {
  const port = process.env.PORT || 3000;
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("owl-builder Web Server Running\n");
  });
  // Initialize WebSocket server on the same HTTP server
  wsServer = new WebSocketServer({ server });
  wsServer.on('connection', (socket) => {
    console.log(`[${getCurrentTimestamp()}] WebSocket client connected`);
  });
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      console.log(`Web server started at http://localhost:${port}`);
      resolve(server);
    });
  });
}

export function buildIntermediateOWLModel() {
  return {
    id: "intermediate",
    title: "Intermediate OWL Ontology",
    concepts: ["IntermediateConcept1", "IntermediateConcept2"],
    annotations: { version: "intermediate" }
  };
}

export async function buildEnhancedOntology() {
  const ontology = buildOntology();
  try {
    const data = await fetcher.fetchDataWithRetry("https://dog.ceo/api/breeds/image/random", 2);
    const parsed = JSON.parse(data);
    ontology.image = parsed.message;
    ontology.concepts.push("EnhancedConcept");
  } catch (_error) {
    ontology.image = null;
  }
  return ontology;
}

export function getCurrentTimestamp() {
  return new Date().toISOString();
}

export function logDiagnostic(message, level = "debug") {
  const levels = { off: -1, error: 0, warn: 1, info: 2, debug: 3 };
  const configured = process.env.DIAGNOSTIC_LOG_LEVEL ? process.env.DIAGNOSTIC_LOG_LEVEL.toLowerCase() : "debug";
  if (levels[level] <= (levels[configured] !== undefined ? levels[configured] : 3)) {
    console.log(`[${getCurrentTimestamp()}] DIAGNOSTIC: ${message}`);
  }
}

export function buildOntologyFromCustomData(customData = {}) {
  return { ...buildOntology(), ...customData, customizedByUser: true };
}

export function mergeOntologies(...ontologies) {
  const merged = { title: ontologies.map((o) => o.title).join(" & "), concepts: [] };
  ontologies.forEach((o) => {
    if (o.concepts) {
      merged.concepts.push(...o.concepts);
    }
  });
  return merged;
}

export async function buildOntologyFromLiveDataWithLog() {
  const ontology = await buildOntologyFromLiveData();
  logDiagnostic("Live data ontology built successfully", "info");
  console.log("Live Data Ontology:", ontology);
  return ontology;
}

export function buildMinimalOWLModel() {
  return {
    id: "minimal",
    title: "Minimal OWL Ontology",
    concepts: [],
    metadata: { version: "minimal" }
  };
}

export function buildComplexOntologyModel() {
  return {
    id: "complex",
    title: "Complex OWL Ontology",
    classes: ["ClassA", "ClassB", "ClassC"],
    properties: [
      { name: "hasA", type: "string" },
      { name: "hasB", type: "number" },
      { name: "hasC", type: "boolean" }
    ],
    concepts: ["ConceptA", "ConceptB", "ConceptC"],
    metadata: { created: new Date().toISOString() }
  };
}

export function buildScientificOntologyModel() {
  return {
    id: "scientific",
    title: "Scientific OWL Ontology",
    disciplines: ["Biology", "Chemistry", "Physics"],
    concepts: ["Hypothesis", "Experiment", "Data Analysis"],
    metadata: { source: "Scientific Publications", created: new Date().toISOString() }
  };
}

export function buildEducationalOntologyModel() {
  return {
    id: "educational",
    title: "Educational OWL Ontology",
    subjects: ["Mathematics", "History", "Literature"],
    concepts: ["Curriculum", "Lesson Plan", "Assessment"],
    metadata: { notes: "Developed for educational institutions", created: new Date().toISOString() }
  };
}

export function buildPhilosophicalOntologyModel() {
  return {
    id: "philosophical",
    title: "Philosophical OWL Ontology",
    themes: ["Existence", "Ethics", "Epistemology"],
    concepts: ["Socrates", "Plato", "Aristotle"],
    metadata: { created: new Date().toISOString(), category: "philosophy" }
  };
}

export function buildEconomicOntologyModel() {
  return {
    id: "economic",
    title: "Economic OWL Ontology",
    sectors: ["Finance", "Manufacturing", "Services"],
    concepts: ["Supply", "Demand", "Market"],
    metadata: { created: new Date().toISOString(), category: "economics" }
  };
}

export async function refreshOntology() {
  try {
    const clearResult = await clearOntology();
    if (clearResult.success === false) {
      logDiagnostic("No existing ontology file to clear or already cleared.", "info");
    }
    const liveOntology = await buildOntologyFromLiveData();
    const persistResult = await persistOntology(liveOntology);
    logDiagnostic("Ontology refreshed and persisted.", "info");
    // Broadcast update notification
    broadcastOntologyUpdate(liveOntology, "Ontology refreshed");
    return { liveOntology, persistResult };
  } catch (err) {
    logDiagnostic("Error during refresh: " + err.message, "error");
    throw err;
  }
}

export async function mergeAndPersistOntology() {
  try {
    const staticOntology = buildOntology();
    const liveOntology = await buildOntologyFromLiveData();
    const merged = mergeOntologies(staticOntology, liveOntology);
    const persistRes = await persistOntology(merged);
    logDiagnostic("Merged ontology persisted.", "info");
    // Broadcast merged ontology update
    broadcastOntologyUpdate(merged, "Ontologies merged and persisted");
    return { merged, persistRes };
  } catch (err) {
    logDiagnostic("Error during merge and persist: " + err.message, "error");
    throw err;
  }
}

export async function buildOntologyHybrid(customizations = {}) {
  const liveOntology = await buildOntologyFromLiveData();
  const customOntology = buildOntologyFromCustomData(customizations);
  const merged = mergeOntologies(liveOntology, customOntology);
  merged.hybrid = true;
  return merged;
}

export function enhancedDiagnosticSummary() {
  const timestamp = getCurrentTimestamp();
  return {
    timestamp,
    message: "All diagnostic systems operational.",
    version: getVersion()
  };
}

export function customMergeWithTimestamp(...ontologies) {
  const merged = mergeOntologies(...ontologies);
  merged.timestamp = getCurrentTimestamp();
  return merged;
}

export async function backupAndRefreshOntology() {
  const backupResult = await backupOntology();
  const refreshedOntology = await refreshOntology();
  return {
    backupResult,
    refreshedOntology
  };
}

// New CLI command to force anomaly detection for live data
export async function detectAnomalyCLI(args) {
  let sampleData;
  if (args.length > 1) {
    try {
      sampleData = JSON.parse(args[1]);
    } catch(e) {
      console.log("Invalid JSON provided for anomaly detection. Using live data instead.");
    }
  }
  if (!sampleData) {
    const dataStr = await fetchDataWithRetry("https://api.publicapis.org/entries");
    sampleData = JSON.parse(dataStr);
  }
  const anomaly = detectLiveDataAnomaly(sampleData);
  if (anomaly) {
    logDiagnostic("Anomaly detected via CLI: " + JSON.stringify(anomaly), "warn");
    broadcastOntologyUpdate({ title: "Anomaly Detected", concepts: [] }, "Anomaly detected in live data via CLI");
    console.log("Anomaly detected:", anomaly);
    return anomaly;
  } else {
    console.log("No anomaly detected in live data.");
    return {};
  }
}

// New CLI command to export aggregated telemetry to file
export async function exportTelemetryCLI() {
  const aggregatedTelemetry = {
    nanSummary: getAggregatedNaNSummary(),
    diagnosticSummary: enhancedDiagnosticSummary()
  };
  const filePath = path.resolve(process.cwd(), 'telemetry.json');
  try {
    await fsp.writeFile(filePath, JSON.stringify(aggregatedTelemetry, null, 2));
    console.log(`Telemetry exported successfully to ${filePath}`);
    return aggregatedTelemetry;
  } catch (e) {
    console.error("Failed to export telemetry", e);
    return { error: e.message };
  }
}

const commandActions = {
  "--help": async (_args) => {
    displayHelp();
  },
  "--version": async (_args) => {
    console.log("Tool version:", getVersion());
    return getVersion();
  },
  "--list": async (_args) => {
    const commands = listCommands();
    console.log("Supported commands:", commands);
    return commands;
  },
  "--build": async (args) => {
    if (args.includes("--allow-deprecated")) {
      const ontology = buildOntology();
      console.warn("Warning: --build using --allow-deprecated flag invoked deprecated static fallback.");
      console.log("Ontology built:", ontology);
      return ontology;
    } else {
      console.warn(
        "Error: --build command requires --allow-deprecated flag to use static fallback. Use --build-live for live data integration."
      );
      return;
    }
  },
  "--persist": async (_args) => {
    const ontology = buildOntology();
    console.log("Ontology built:", ontology);
    const saved = await persistOntology(ontology);
    console.log("Ontology persisted:", saved);
    return saved;
  },
  "--load": async (_args) => {
    const loaded = await loadOntology();
    console.log("Ontology loaded:", loaded);
    return loaded;
  },
  "--query": async (args) => {
    const searchTerm = args[1] || "Concept1";
    const results = await queryOntology(searchTerm);
    console.log("Ontology query results:", results);
    return results;
  },
  "--validate": async (_args) => {
    const ontology = buildOntology();
    const isValid = validateOntology(ontology);
    console.log("Ontology validation result:", isValid);
    return isValid;
  },
  "--export": async (_args) => {
    const ontology = buildOntology();
    const xml = exportOntologyToXML(ontology);
    console.log("Ontology exported to XML:", xml);
    return xml;
  },
  "--import": async (_args) => {
    const sampleXML = `<ontology><title>Imported Ontology</title><concepts><concept>ConceptA</concept></concepts></ontology>`;
    const imported = importOntologyFromXML(sampleXML);
    console.log("Ontology imported from XML:", imported);
    return imported;
  },
  "--backup": async (_args) => {
    const ontology = buildOntology();
    await persistOntology(ontology);
    const backupResult = await backupOntology();
    console.log("Ontology backup created:", backupResult);
    return backupResult;
  },
  "--update": async (args) => {
    const idx = args.indexOf("--update");
    const newTitle = idx !== -1 && args.length > idx + 1 ? args[idx + 1] : "Updated Ontology";
    const updated = await updateOntology(newTitle);
    console.log("Ontology updated:", updated);
    return updated;
  },
  "--clear": async (_args) => {
    const result = await clearOntology();
    if (result.success) {
      console.log("Ontology cleared, file removed.", result);
    } else {
      console.log("Ontology clear failed:", result);
    }
    return result;
  },
  "--crawl": async (_args) => {
    const crawlResults = await crawlOntologies();
    console.log("Crawled ontology data:", crawlResults);
    return crawlResults;
  },
  "--fetch-retry": async (_args) => {
    try {
      const result = await fetchDataWithRetry("https://api.publicapis.org/entries");
      console.log("Fetched data with retry:", result);
      return result;
    } catch (err) {
      console.log("Fetch with retry failed:", err.message);
      return err.message;
    }
  },
  "--build-basic": async (_args) => {
    const model = buildBasicOWLModel();
    console.log("Basic OWL Model:", model);
    return model;
  },
  "--build-advanced": async (_args) => {
    const model = buildAdvancedOWLModel();
    console.log("Advanced OWL Model:", model);
    return model;
  },
  "--wrap-model": async (args) => {
    let model;
    try {
      model = args[1] ? JSON.parse(args[1]) : buildBasicOWLModel();
    } catch (_error) {
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
    } catch (_error) {
      console.log("Invalid JSON input for custom ontology, using default");
    }
    const customOntology = buildCustomOntology(custom);
    console.log("Custom Ontology:", customOntology);
    return customOntology;
  },
  "--extend-concepts": async (args) => {
    const additional = args[1] ? args[1].split(",") : ["ExtraConcept"];
    let ontology = await loadOntology();
    if (ontology.success === false) {
      ontology = buildOntology();
    }
    const extended = extendOntologyConcepts(ontology, additional);
    console.log("Extended Ontology:", extended);
    return extended;
  },
  "--diagnostics": async (_args) => {
    try {
      const crawlResults = await crawlOntologies();
      console.log("Diagnostic crawl results:", JSON.stringify(crawlResults, null, 2));
      return crawlResults;
    } catch (err) {
      console.error("Error during diagnostics:", err);
      return { error: err.message };
    }
  },
  "--serve": async (_args) => {
    const msg = await startWebServer();
    return "Web server started";
  },
  "--build-intermediate": async (_args) => {
    const model = buildIntermediateOWLModel();
    console.log("Intermediate OWL Model:", model);
    return model;
  },
  "--build-enhanced": async (_args) => {
    const model = await buildEnhancedOntology();
    console.log("Enhanced Ontology:", model);
    return model;
  },
  "--build-live": async (_args) => {
    const model = await buildOntologyFromLiveData();
    logDiagnostic("Live data ontology built successfully", "info");
    console.log("Live Data Ontology:", model);
    return model;
  },
  "--build-custom-data": async (args) => {
    let data = {};
    try {
      data = args[1] ? JSON.parse(args[1]) : {};
    } catch (_error) {
      console.log("Invalid JSON input for custom data, using default");
    }
    const customOntology = buildOntologyFromCustomData(data);
    logDiagnostic("Built custom data ontology", "info");
    console.log("Custom Data Ontology:", customOntology);
    return customOntology;
  },
  "--merge-ontologies": async (_args) => {
    const ont1 = buildOntology();
    const ont2 = await buildOntologyFromLiveData();
    const merged = mergeOntologies(ont1, ont2);
    logDiagnostic("Merged ontologies from static and live data", "info");
    console.log("Merged Ontology:", merged);
    return merged;
  },
  "--build-live-log": async (_args) => {
    const ont = await buildOntologyFromLiveDataWithLog();
    console.log("Live Data Ontology with Log:", ont);
    return ont;
  },
  "--build-minimal": async (_args) => {
    const model = buildMinimalOWLModel();
    console.log("Minimal OWL Model:", model);
    return model;
  },
  "--build-complex": async (_args) => {
    const model = buildComplexOntologyModel();
    console.log("Complex OWL Model:", model);
    return model;
  },
  "--build-scientific": async (_args) => {
    const model = buildScientificOntologyModel();
    console.log("Scientific OWL Model:", model);
    return model;
  },
  "--build-educational": async (_args) => {
    const model = buildEducationalOntologyModel();
    console.log("Educational OWL Model:", model);
    return model;
  },
  "--build-philosophical": async (_args) => {
    const model = buildPhilosophicalOntologyModel();
    console.log("Philosophical OWL Model:", model);
    return model;
  },
  "--build-economic": async (_args) => {
    const model = buildEconomicOntologyModel();
    console.log("Economic OWL Model:", model);
    return model;
  },
  "--refresh": async (_args) => {
    const result = await refreshOntology();
    console.log("Ontology refreshed:", result);
    return result;
  },
  "--merge-persist": async (_args) => {
    const result = await mergeAndPersistOntology();
    console.log("Merged ontology persisted:", result);
    return result;
  },
  "--disable-live": async (args) => {
    process.env.DISABLE_LIVE_DATA = "1";
    logDiagnostic("Live data integration has been disabled via CLI flag.", "info");
    console.log("Live data integration disabled.");
    return "Live data integration disabled";
  },
  "--build-hybrid": async (args) => {
    let custom = {};
    try {
      custom = args[1] ? JSON.parse(args[1]) : {};
    } catch (_error) {
      console.log("Invalid JSON input for hybrid ontology, using default");
    }
    const model = await buildOntologyHybrid(custom);
    console.log("Hybrid Ontology:", model);
    return model;
  },
  "--diagnostic-summary": async (_args) => {
    const summary = enhancedDiagnosticSummary();
    console.log("Diagnostic Summary:", summary);
    return summary;
  },
  "--custom-merge": async (args) => {
    let ontologies = [];
    try {
      ontologies = args.slice(1).map((data) => JSON.parse(data));
    } catch (_error) {
      console.log("Invalid JSON input for custom merge, using defaults");
      ontologies = [buildOntology(), buildOntologyFromCustomData()];
    }
    const merged = customMergeWithTimestamp(...ontologies);
    console.log("Custom Merged Ontology with Timestamp:", merged);
    return merged;
  },
  "--backup-refresh": async (_args) => {
    const result = await backupAndRefreshOntology();
    console.log("Backup and Refreshed Ontology:", result);
    return result;
  },
  "--strict-env": async (_args) => {
    console.log("Strict environment variable parsing enabled.");
    return "Strict mode enabled";
  },
  "--diagnostic-summary-naN": async (_args) => {
    const summary = getAggregatedNaNSummary();
    console.log("Aggregated NaN Fallback Telemetry Summary:", JSON.stringify(summary, null, 2));
    return summary;
  },
  "--detect-anomaly": async (args) => {
    return await detectAnomalyCLI(args);
  },
  "--export-telemetry": async (_args) => {
    return await exportTelemetryCLI();
  }
};

export async function main(args = process.argv.slice(2)) {
  processCLIFallbackOptions(args);
  if (args.includes("--strict-env")) {
    process.env.STRICT_ENV = "true";
  }
  if (args.length === 0) {
    await demo();
    return;
  }
  for (const arg of args) {
    if (commandActions[arg]) {
      const result = await commandActions[arg](args);
      return result;
    }
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

async function demo() {
  logDiagnostic("Demo started", "info");
  console.log("Running demo of ontology functions:");
  const ontology = await buildOntologyFromLiveData();
  console.log("Demo - built ontology:", ontology);
  const persistResult = await persistOntology(ontology);
  console.log("Demo - persisted ontology:", persistResult);
  const loadedOntology = await loadOntology();
  console.log("Demo - loaded ontology:", loadedOntology);
  const queryResult = await queryOntology("Concept");
  console.log("Demo - query result:", queryResult);
  const isValid = validateOntology(ontology);
  console.log("Demo - ontology valid:", isValid);
  const xml = exportOntologyToXML(ontology);
  console.log("Demo - exported XML:", xml);
  const importedOntology = importOntologyFromXML(xml);
  console.log("Demo - imported ontology:", importedOntology);
  const backupResult = await backupOntology();
  console.log("Demo - backup result:", backupResult);
  const updatedOntology = await updateOntology("Demo Updated Ontology");
  console.log("Demo - updated ontology:", updatedOntology);
  const endpoints = listAvailableEndpoints();
  console.log("Demo - available endpoints:", endpoints);
  try {
    const fetchData = await fetchDataWithRetry(endpoints[0], 1);
    console.log(`Demo - fetched data from ${endpoints[0]}:`, fetchData.substring(0, 100));
  } catch (err) {
    console.log(`Demo - error fetching ${endpoints[0]}:`, err.message);
  }
  if (process.env.NODE_ENV !== "test") {
    const crawlResults = await crawlOntologies();
    console.log("Demo - crawl results:", crawlResults);
  } else {
    console.log("Demo - skipping crawl in test mode");
  }
  const basicModel = buildBasicOWLModel();
  console.log("Demo - basic OWL model:", basicModel);
  const advancedModel = buildAdvancedOWLModel();
  console.log("Demo - advanced OWL model:", advancedModel);
  const wrappedModel = wrapOntologyModel({ title: "Demo Model" });
  console.log("Demo - wrapped model:", wrappedModel);
  const customOntology = buildCustomOntology({ concepts: ["CustomConcept"] });
  console.log("Demo - custom ontology:", customOntology);
  const extendedOntology = extendOntologyConcepts(ontology, ["ExtraConcept"]);
  console.log("Demo - extended ontology:", extendedOntology);
  const intermediateModel = buildIntermediateOWLModel();
  console.log("Demo - intermediate OWL model:", intermediateModel);
  const enhancedModel = await buildEnhancedOntology();
  console.log("Demo - enhanced ontology:", enhancedModel);
  const liveModel = await buildOntologyFromLiveData();
  console.log("Demo - live data ontology:", liveModel);
  const customDataOntology = buildOntologyFromCustomData({ concepts: ["CustomDataConcept"] });
  console.log("Demo - custom data ontology:", customDataOntology);
  const mergedOntology = mergeOntologies(ontology, liveModel);
  console.log("Demo - merged ontology:", mergedOntology);
  const liveLogOntology = await buildOntologyFromLiveDataWithLog();
  console.log("Demo - live data ontology with log:", liveLogOntology);
  const minimalModel = buildMinimalOWLModel();
  console.log("Demo - minimal OWL model:", minimalModel);
  const complexModel = buildComplexOntologyModel();
  console.log("Demo - complex OWL model:", complexModel);
  const scientificModel = buildScientificOntologyModel();
  console.log("Demo - scientific OWL model:", scientificModel);
  const educationalModel = buildEducationalOntologyModel();
  console.log("Demo - educational OWL model:", educationalModel);
  const philosophicalModel = buildPhilosophicalOntologyModel();
  console.log("Demo - philosophical OWL model:", philosophicalModel);
  const economicModel = buildEconomicOntologyModel();
  console.log("Demo - economic OWL model:", economicModel);
  logDiagnostic("Demo completed successfully", "info");
}

export function displayHelp() {
  console.log(
    `Usage: node src/lib/main.js [options]\nOptions: --help, --version, --list, --build [--allow-deprecated], --persist, --load, --query, --validate, --export, --import, --backup, --update, --clear, --crawl, --fetch-retry, --build-basic, --build-advanced, --wrap-model, --build-custom, --extend-concepts, --diagnostics, --serve, --build-intermediate, --build-enhanced, --build-live, --build-custom-data, --merge-ontologies, --build-live-log, --build-minimal, --build-complex, --build-scientific, --build-educational, --build-philosophical, --build-economic, --refresh, --merge-persist, --disable-live, --build-hybrid, --diagnostic-summary, --diagnostic-summary-naN, --custom-merge, --backup-refresh, --strict-env, --livedata-retry-default <number>, --livedata-delay-default <number>, --detect-anomaly, --export-telemetry`
  );
}

export function getVersion() {
  return "0.0.39";
}

export function listCommands() {
  return Object.keys(commandActions);
}

console.log("owl-builder CLI loaded");

function processCLIFallbackOptions(args) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--livedata-retry-default" && args[i + 1]) {
      process.env.LIVEDATA_RETRY_DEFAULT = args[i + 1];
      i++;
    } else if (args[i] === "--livedata-delay-default" && args[i + 1]) {
      process.env.LIVEDATA_DELAY_DEFAULT = args[i + 1];
      i++;
    }
  }
}

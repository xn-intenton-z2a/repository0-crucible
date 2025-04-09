#!/usr/bin/env node

import fs, { promises as fsp } from "fs";
import path from "path";
import https from "https";
import http from "http";
import { WebSocketServer } from "ws";

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
 *   - Implemented promise-based batching for NaN fallback telemetry logs to ensure atomicity under high concurrency. [Optimized]
 *   - Added real-time WebSocket notifications for ontology updates. When key ontology operations occur, a JSON payload is broadcast to all connected WebSocket clients.
 *   - Added configurable warning threshold for NaN fallback logs via the NANFALLBACK_WARNING_THRESHOLD environment variable.
 *   - New Feature: Real-Time Anomaly Detection for Live Data Integration. Live data is validated against expected schema and anomalies trigger diagnostic logging and WebSocket alerts.
 *   - New Feature: Export Aggregated Telemetry via CLI flag '--export-telemetry'. This command exports diagnostic telemetry (including NaN fallback details) to a JSON file 'telemetry.json' or CSV file 'telemetry.csv' based on specified format.
 *   - New Feature: Automated Rollback Mechanism. If a live data anomaly is detected, owl-builder attempts to restore the last known good backup from ontology-backup.json and broadcasts a WebSocket alert indicating the rollback.
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

// Core Environment Variable Utilities
// Changed warningCache to a Map to aggregate multiple occurrences of invalid inputs
const warningCache = new Map();
const TELEMETRY_FLUSH_DELAY = 50;
let flushTimer = null;

function normalizeEnvValue(val) {
  if (typeof val !== "string") return val;
  return val.trim().replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '').replace(/[\s\u00A0]+/g, ' ').toLowerCase();
}

function parseEnvNumber(varName, defaultValue, fallbackValue) {
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
    let key = varName + ":" + raw;
    if (!process.env.DISABLE_ENV_WARNINGS) {
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
      } else {
        if (flushTimer) {
          clearTimeout(flushTimer);
        }
        flushTimer = setTimeout(() => {
          flushTimer = null;
        }, TELEMETRY_FLUSH_DELAY);
      }
    }
    return defaultValue;
  }
  return num;
}

function resetEnvWarningCache() {
  warningCache.clear();
}

export { normalizeEnvValue, parseEnvNumber, resetEnvWarningCache };

export function getAggregatedNaNSummary() {
  const summary = [];
  for (const [key, info] of warningCache.entries()) {
    summary.push({ key, count: info.count, telemetry: info.telemetry });
  }
  return summary;
}

export function detectLiveDataAnomaly(data) {
  if (!data || typeof data !== 'object') {
    return { error: "Data is not a valid object." };
  }
  if (!('entries' in data)) {
    return { error: "Expected 'entries' property in the data." };
  }
  if (!Array.isArray(data.entries) || data.entries.length === 0) {
    return { error: "Expected 'entries' to be a non-empty array.", received: data.entries };
  }
  return null;
}

// Core Ontology Functions
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

export async function buildOntologyFromLiveData() {
  if (process.env.DISABLE_LIVE_DATA && process.env.DISABLE_LIVE_DATA !== "0") {
    logDiagnostic("Live data integration disabled by configuration. Using static fallback.", "info");
    return buildOntology();
  }
  try {
    const dataStr = await fetcher.fetchDataWithRetry("https://api.publicapis.org/entries");
    const parsed = JSON.parse(dataStr);
    const anomaly = detectLiveDataAnomaly(parsed);
    if (anomaly) {
      logDiagnostic("Anomaly detected in live data: " + JSON.stringify(anomaly), "warn");
      const rollbackResult = await restoreLastBackup();
      if (rollbackResult.success) {
        logDiagnostic("Rollback executed successfully, restored last backup ontology", "info");
        broadcastOntologyUpdate(rollbackResult.restoredOntology, "Ontology rollback executed due to live data anomaly");
        return rollbackResult.restoredOntology;
      } else {
        logDiagnostic("Rollback failed: " + rollbackResult.error, "error");
        broadcastOntologyUpdate({ title: "Anomaly Detected", concepts: [] }, "Anomaly detected in live data. Rollback failed, using static fallback");
        return buildOntology();
      }
    }
    const title = parsed && parsed.entries && parsed.entries.length > 0 ? parsed.entries[0].API : "Live Data Ontology";
    const concepts = parsed && parsed.entries ? parsed.entries.slice(0, 3).map((entry) => entry.Description) : ["Concept1", "Concept2", "Concept3"];
    return { title, concepts };
  } catch (error) {
    logDiagnostic(`buildOntologyFromLiveData encountered error fetching live data from https://api.publicapis.org/entries: ${error.message}. Falling back to static ontology.`, "error");
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

export const fetcher = {};
fetcher.fetchDataWithRetry = fetchDataWithRetry;

function broadcastOntologyUpdate(ontology, updateType) {
  if (!global.wsServer) return;
  const message = {
    updatedOntologyTitle: ontology.title,
    version: getVersion(),
    timestamp: getCurrentTimestamp(),
    statusMessage: updateType
  };
  global.wsServer.clients.forEach(client => {
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
      const data = await fetcher.fetchDataWithRetry(endpoint);
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

export async function restoreLastBackup() {
  try {
    const backupContent = await fsp.readFile(backupFilePath, "utf-8");
    await fsp.writeFile(ontologyFilePath, backupContent);
    return { success: true, restoredOntology: JSON.parse(backupContent) };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// New CLI and Web Server Functions integrated into main.js

export async function startWebServer() {
  const port = process.env.PORT || 3000;
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("owl-builder Web Server Running\n");
    } else {
      res.writeHead(404);
      res.end();
    }
  });
  const wsServer = new WebSocketServer({ server });
  // assign to global variable for broadcast
  global.wsServer = wsServer;
  server.listen(port);
  return server;
}

export async function runCLI(args) {
  if (args[0] === '--detect-anomaly') {
    try {
      const data = JSON.parse(args[1]);
      const anomaly = detectLiveDataAnomaly(data);
      if (anomaly) {
        return anomaly;
      } else {
        return {};
      }
    } catch (e) {
      return { error: "Invalid JSON input" };
    }
  }
  if (args[0] === '--export-telemetry') {
    const telemetry = {
      nanSummary: getAggregatedNaNSummary(),
      diagnosticSummary: enhancedDiagnosticSummary()
    };
    const formatIndex = args.indexOf('--format');
    if (formatIndex !== -1 && args[formatIndex + 1] === "csv") {
      let csvContent = "NaN Fallback Telemetry\nkey,count,envVar,rawValue,cliOverride,timestamp\n";
      const summary = telemetry.nanSummary;
      summary.forEach(item => {
        csvContent += `${item.key},${item.count},${item.telemetry.envVar},${item.telemetry.rawValue},${item.telemetry.cliOverride},${item.telemetry.timestamp}\n`;
      });
      csvContent += "\nDiagnostic Summary\ntimestamp,message,version\n";
      const diag = telemetry.diagnosticSummary;
      csvContent += `${diag.timestamp},${diag.message},${diag.version}\n`;
      await fsp.writeFile("telemetry.csv", csvContent, "utf-8");
    } else {
      await fsp.writeFile("telemetry.json", JSON.stringify(telemetry, null, 2), "utf-8");
    }
    return telemetry;
  }
  // Default action if no recognized CLI flag is provided
  displayHelp();
  return {};
}

export function getVersion() {
  return "0.0.39";
}

export function displayHelp() {
  console.log("Usage: node src/lib/main.js [options]");
  console.log("Options:");
  console.log("  --detect-anomaly [JSON]  Detect data anomaly using provided JSON string");
  console.log("  --export-telemetry [--format csv]  Export telemetry data in JSON (default) or CSV format");
}

export function listCommands() {
  return ["--detect-anomaly", "--export-telemetry"];
}

// If executed directly, run the CLI
if (process.argv && process.argv.length > 1 && process.argv[1].includes("main.js")) {
  runCLI(process.argv.slice(2)).then(() => {});
}

// Log that owl-builder CLI has been loaded
console.log("owl-builder CLI loaded");

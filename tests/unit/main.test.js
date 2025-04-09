/* eslint-disable no-unused-vars */
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import http from "http";
import { WebSocket } from "ws";
import * as mainModule from "../../src/lib/main.js";

const {
  buildOntology,
  buildOntologyFromLiveData,
  persistOntology,
  loadOntology,
  queryOntology,
  validateOntology,
  exportOntologyToXML,
  importOntologyFromXML,
  backupOntology,
  updateOntology,
  clearOntology,
  listAvailableEndpoints,
  fetchDataWithRetry,
  crawlOntologies,
  getVersion,
  buildBasicOWLModel,
  buildAdvancedOWLModel,
  wrapOntologyModel,
  buildCustomOntology,
  extendOntologyConcepts,
  buildIntermediateOWLModel,
  buildEnhancedOntology,
  getCurrentTimestamp,
  logDiagnostic,
  buildOntologyFromCustomData,
  mergeOntologies,
  buildOntologyFromLiveDataWithLog,
  buildMinimalOWLModel,
  buildComplexOntologyModel,
  buildScientificOntologyModel,
  buildEducationalOntologyModel,
  buildPhilosophicalOntologyModel,
  buildEconomicOntologyModel,
  refreshOntology,
  mergeAndPersistOntology,
  buildOntologyHybrid,
  enhancedDiagnosticSummary,
  customMergeWithTimestamp,
  backupAndRefreshOntology,
  resetEnvWarningCache,
  getAggregatedNaNSummary,
  detectLiveDataAnomaly,
  restoreLastBackup,
  fetcher,
  startWebServer,
  runCLI,
  parseEnvNumber
} = mainModule;

const ontologyPath = path.resolve(process.cwd(), "ontology.json");
const backupPath = path.resolve(process.cwd(), "ontology-backup.json");
const telemetryPathJson = path.resolve(process.cwd(), "telemetry.json");
const telemetryPathCsv = path.resolve(process.cwd(), "telemetry.csv");

function removeFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// Tests for Anomaly Detection and Automated Rollback

describe("Anomaly Detection", () => {
  test("detectLiveDataAnomaly returns null for valid data", () => {
    const validData = { entries: [{ API: "TestAPI", Description: "Test Description" }] };
    expect(detectLiveDataAnomaly(validData)).toBeNull();
  });

  test("detectLiveDataAnomaly returns error object when entries is missing", () => {
    const invalidData = { notEntries: [] };
    const anomaly = detectLiveDataAnomaly(invalidData);
    expect(anomaly).toHaveProperty('error');
  });

  test("detectLiveDataAnomaly returns error object when entries is empty", () => {
    const invalidData = { entries: [] };
    const anomaly = detectLiveDataAnomaly(invalidData);
    expect(anomaly).toHaveProperty('error', "Expected 'entries' to be a non-empty array.");
  });

  test("CLI command --detect-anomaly detects anomaly with provided anomalous JSON", async () => {
    const anomalousJSON = JSON.stringify({ entries: [] });
    const args = ["--detect-anomaly", anomalousJSON];
    const result = await runCLI(args);
    expect(result).toHaveProperty('error', "Expected 'entries' to be a non-empty array.");
  });

  test("CLI command --detect-anomaly reports no anomaly for valid JSON", async () => {
    const validJSON = JSON.stringify({ entries: [{ API: "ValidAPI", Description: "A valid description" }] });
    const args = ["--detect-anomaly", validJSON];
    const result = await runCLI(args);
    expect(result).toEqual({});
  });

  test("should rollback to last backup when anomaly detected in live data", async () => {
    const backupOntology = { title: "Backup Ontology", concepts: ["BackupConcept1"] };
    await fs.promises.writeFile(backupPath, JSON.stringify(backupOntology, null, 2));
    fetcher.fetchDataWithRetry = async () => JSON.stringify({ entries: [] });
    const result = await buildOntologyFromLiveData();
    expect(result).toEqual(backupOntology);
  });

  test("should fallback to static fallback when rollback fails", async () => {
    removeFileIfExists(backupPath);
    fetcher.fetchDataWithRetry = async () => JSON.stringify({ entries: [] });
    const result = await buildOntologyFromLiveData();
    expect(result).toEqual(buildOntology());
  });
});

// Tests for NaN Telemetry Batching

describe("NaN Telemetry Batching", () => {
  beforeEach(() => {
    resetEnvWarningCache();
    process.env.NANFALLBACK_WARNING_THRESHOLD = "5";
    process.env.TEST_VAR = "abc";
  });
  
  afterEach(() => {
    delete process.env.TEST_VAR;
  });
  
  test("Should aggregate warnings for multiple non-numeric env inputs", async () => {
    for (let i = 0; i < 10; i++) {
      parseEnvNumber("TEST_VAR", 10);
    }
    const summary = getAggregatedNaNSummary();
    expect(summary.length).toBe(1);
    expect(summary[0].count).toBe(10);
  });
});

// Tests for Robust HTTP Endpoint Testing for the Integrated Web Server

describe("Robust HTTP Endpoint Testing for the Integrated Web Server", () => {
  let server;
  const port = process.env.PORT || 3000;

  afterEach(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      server = null;
    }
  });

  test("should respond with 200 and correct body", async () => {
    server = await startWebServer();
    const options = {
      hostname: "localhost",
      port: port,
      path: "/",
      method: "GET"
    };

    const responseData = await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      });
      req.on('error', reject);
      req.end();
    });

    expect(responseData.statusCode).toBe(200);
    expect(responseData.body).toBe("owl-builder Web Server Running\n");
  });
});

// Tests for WebSocket Notifications

describe("WebSocket Notifications", () => {
  let server;
  const port = process.env.PORT || 3000;
  let wsClient;

  afterEach(async () => {
    if (wsClient) {
      wsClient.close();
      wsClient = null;
    }
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      server = null;
    }
  });

  test("should receive WebSocket notification on ontology refresh", async () => {
    fetcher.fetchDataWithRetry = async () => JSON.stringify({ entries: [{ API: "LiveAPI", Description: "Some description" }] });
    server = await startWebServer();
    await new Promise(resolve => setTimeout(resolve, 50));
    await new Promise((resolve, reject) => {
      wsClient = new WebSocket(`ws://localhost:${port}`);
      wsClient.on('open', () => {
        refreshOntology().then(() => {});
      });
      wsClient.on('message', (data) => {
        const message = JSON.parse(data);
        try {
          expect(message).toHaveProperty('updatedOntologyTitle');
          expect(message).toHaveProperty('version', getVersion());
          expect(message).toHaveProperty('timestamp');
          expect(message).toHaveProperty('statusMessage', 'Ontology refreshed');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      wsClient.on('error', reject);
    });
  });
});

// Tests for Export Telemetry CLI Command

describe("Export Telemetry", () => {
  afterEach(() => {
    removeFileIfExists(telemetryPathJson);
    removeFileIfExists(telemetryPathCsv);
  });

  test("CLI command --export-telemetry exports telemetry data to JSON file by default", async () => {
    removeFileIfExists(telemetryPathJson);
    const args = ["--export-telemetry"];
    const result = await runCLI(args);
    expect(result).toHaveProperty('nanSummary');
    expect(result).toHaveProperty('diagnosticSummary');
    expect(fs.existsSync(telemetryPathJson)).toBe(true);
    const fileContent = fs.readFileSync(telemetryPathJson, 'utf-8');
    const parsedContent = JSON.parse(fileContent);
    expect(parsedContent).toHaveProperty('nanSummary');
    expect(parsedContent).toHaveProperty('diagnosticSummary');
  });

  test("CLI command --export-telemetry with csv format exports telemetry data to CSV file", async () => {
    removeFileIfExists(telemetryPathCsv);
    const args = ["--export-telemetry", "--format", "csv"];
    const result = await runCLI(args);
    expect(result).toHaveProperty('nanSummary');
    expect(result).toHaveProperty('diagnosticSummary');
    expect(fs.existsSync(telemetryPathCsv)).toBe(true);
    const fileContent = fs.readFileSync(telemetryPathCsv, 'utf-8');
    expect(fileContent).toContain("NaN Fallback Telemetry");
    expect(fileContent).toContain("Diagnostic Summary");
  });
});

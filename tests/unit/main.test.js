/* eslint-disable no-unused-vars */
import { describe, test, expect, vi } from "vitest";
import fs from "fs";
import path from "path";
import http from "http";
import { WebSocket } from "ws";
import * as mainModule from "../../src/lib/main.js";

const {
  main,
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
  displayHelp,
  getVersion,
  listCommands,
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
  fetcher,
  startWebServer,
  _parseEnvNumber,
  resetEnvWarningCache,
  getAggregatedNaNSummary,
  detectLiveDataAnomaly
} = mainModule;

const ontologyPath = path.resolve(process.cwd(), "ontology.json");
const backupPath = path.resolve(process.cwd(), "ontology-backup.json");

function simulateNetworkFailure() {
  return function (url, callback) {
    const error = new Error("Network error");
    const req = {
      on: (event, handler) => {
        if (event === "error") {
          handler(error);
        }
        return req;
      }
    };
    process.nextTick(() => {
      req.on("error", () => {});
    });
    return req;
  };
}

// New tests for anomaly detection
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
    const result = await main(args);
    expect(result).toHaveProperty('error', "Expected 'entries' to be a non-empty array.");
  });

  test("CLI command --detect-anomaly reports no anomaly for valid JSON", async () => {
    const validJSON = JSON.stringify({ entries: [{ API: "ValidAPI", Description: "A valid description" }] });
    const args = ["--detect-anomaly", validJSON];
    const result = await main(args);
    expect(result).toEqual({});
  });
});

// Existing tests...

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

// New tests for WebSocket Notifications

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
    server = await startWebServer();
    await new Promise(resolve => setTimeout(resolve, 50)); // wait for ws server to start
    await new Promise((resolve, reject) => {
      wsClient = new WebSocket(`ws://localhost:${port}`);
      wsClient.on('open', () => {
        // Once connected, trigger ontology refresh to broadcast notification
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

// Existing tests for environment variable parsing, crawling, CLI commands, etc. would remain here...

// Additional tests can be added as needed.

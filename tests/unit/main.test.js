/* eslint-disable no-unused-vars */
import { describe, test, expect, vi, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import http from "http";
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
  startWebServer
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

// New test for robust HTTP endpoint integration on the integrated web server
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

// New test for configurable environment variables in fetchDataWithRetry with non-numeric values
describe("Live Data Configurability", () => {
  test("fetchDataWithRetry respects environment configuration for retries and initial delay", async () => {
    const originalEnvRetry = process.env.LIVEDATA_RETRY_COUNT;
    const originalEnvDelay = process.env.LIVEDATA_INITIAL_DELAY;
    process.env.LIVEDATA_RETRY_COUNT = "1"; // 1 retry => total attempts = 2
    process.env.LIVEDATA_INITIAL_DELAY = "50";
    let attemptCount = 0;
    const originalGet = http.get;
    http.get = (url, options, callback) => {
      attemptCount++;
      const req = {
        on: (event, handler) => {
          if (event === "error") {
            setTimeout(() => {
              handler(new Error("Test error"));
            }, 0);
          }
          return req;
        }
      };
      return req;
    };
    await expect(fetchDataWithRetry("http://testenv")).rejects.toThrow(
      "All retry attempts for http://testenv failed. Last error: Test error"
    );
    expect(attemptCount).toBe(2);
    http.get = originalGet;
    process.env.LIVEDATA_RETRY_COUNT = originalEnvRetry;
    process.env.LIVEDATA_INITIAL_DELAY = originalEnvDelay;
  });

  test("fetchDataWithRetry uses default values when env variables are non-numeric and logs warning only once", async () => {
    const originalEnvRetry = process.env.LIVEDATA_RETRY_COUNT;
    const originalEnvDelay = process.env.LIVEDATA_INITIAL_DELAY;
    process.env.LIVEDATA_RETRY_COUNT = "NaN"; // should fallback to 3
    process.env.LIVEDATA_INITIAL_DELAY = "NaN"; // should fallback to 100ms
    let attemptCount = 0;
    const originalGet = http.get;
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    http.get = (url, options, callback) => {
      attemptCount++;
      const req = {
        on: (event, handler) => {
          if (event === "error") {
            setTimeout(() => {
              handler(new Error("Non-numeric test error"));
            }, 0);
          }
          return req;
        }
      };
      return req;
    };
    await expect(fetchDataWithRetry("http://testenv-nonnumeric")).rejects.toThrow(
      "All retry attempts for http://testenv-nonnumeric failed. Last error: Non-numeric test error"
    );
    expect(attemptCount).toBe(4);
    const retryWarnings = logSpy.mock.calls.filter(call => call[0].includes("LIVEDATA_RETRY_COUNT is non-numeric")).length;
    const delayWarnings = logSpy.mock.calls.filter(call => call[0].includes("LIVEDATA_INITIAL_DELAY is non-numeric")).length;
    expect(retryWarnings).toBe(1);
    expect(delayWarnings).toBe(1);
    http.get = originalGet;
    process.env.LIVEDATA_RETRY_COUNT = originalEnvRetry;
    process.env.LIVEDATA_INITIAL_DELAY = originalEnvDelay;
    logSpy.mockRestore();
  });

  test("fetchDataWithRetry includes jitter in delay", async () => {
    const originalRandom = Math.random;
    Math.random = () => 0.5; // fixed value for jitter
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    let attemptCount = 0;
    const originalGet = http.get;
    http.get = (url, options, callback) => {
      attemptCount++;
      const req = {
        on: (event, handler) => {
          if (event === "error") {
            setTimeout(() => {
              handler(new Error("Jitter test error"));
            }, 0);
          }
          return req;
        }
      };
      return req;
    };
    await expect(fetchDataWithRetry("http://jitter.test", 1)).rejects.toThrow();
    const retryLog = logSpy.mock.calls.find(call => call[0].includes("Retrying in"));
    expect(retryLog[0]).toMatch(/Retrying in \d+ms \(base: \d+ms, jitter: \d+ms\)/);
    http.get = originalGet;
    Math.random = originalRandom;
    logSpy.mockRestore();
  });
});

describe("Core Ontology Functions", () => {
  test("buildOntology returns public data ontology", () => {
    const ont = buildOntology();
    expect(ont).toHaveProperty("title", "Public Data Ontology");
    expect(Array.isArray(ont.concepts)).toBe(true);
  });

  test("persistOntology writes file successfully", async () => {
    const ontology = { title: "Test Ontology", concepts: ["A"] };
    const writeSpy = vi.spyOn(fs, "writeFile").mockImplementation(() => {});
    const result = await persistOntology(ontology);
    expect(result).toEqual({ success: true });
    writeSpy.mockRestore();
  });

  test("loadOntology returns parsed content on success", async () => {
    const ontology = { title: "Loaded Ontology", concepts: ["X"] };
    const fileContent = JSON.stringify(ontology, null, 2);
    const readSpy = vi.spyOn(fs.promises, "readFile").mockResolvedValue(fileContent);
    const result = await loadOntology();
    expect(result).toEqual(ontology);
    readSpy.mockRestore();
  });

  test("loadOntology returns error on failure", async () => {
    const errorMessage = "File not found";
    const readSpy = vi.spyOn(fs.promises, "readFile").mockRejectedValue(new Error(errorMessage));
    const result = await loadOntology();
    expect(result).toEqual({ success: false, error: errorMessage });
    readSpy.mockRestore();
  });

  test("queryOntology returns matching concepts", async () => {
    const ontology = { title: "Public Data Ontology", concepts: ["Concept1", "Concept2", "ExtraConcept"] };
    const accessSpy = vi.spyOn(fs.promises, "access").mockResolvedValue();
    const readSpy = vi.spyOn(fs.promises, "readFile").mockResolvedValue(JSON.stringify(ontology, null, 2));
    const results = await queryOntology("Extra");
    expect(results.results).toEqual(["ExtraConcept"]);
    accessSpy.mockRestore();
    readSpy.mockRestore();
  });

  test("exportOntologyToXML returns valid XML string with extended fields", () => {
    const ontology = {
      title: "XML Ontology",
      concepts: ["A", "B"],
      classes: ["C1", "C2"],
      properties: [
        { name: "prop1", type: "string" },
        { name: "prop2", type: "number" }
      ],
      metadata: { created: "today", info: "demo" }
    };
    const xml = exportOntologyToXML(ontology);
    expect(xml).toContain("<ontology>");
    expect(xml).toContain("<title>XML Ontology</title>");
    expect(xml).toContain("<concepts>");
    expect(xml).toContain("<class>");
    expect(xml).toContain("<properties>");
    expect(xml).toContain("<metadata>");
  });

  test("importOntologyFromXML parses extended XML correctly", () => {
    const sampleXML = `<ontology><title>Imported Ontology</title><concepts><concept>TestConcept</concept></concepts><classes><class>TestClass</class></classes><properties><property><name>name1</name><type>string</type></property></properties><metadata><created>today</created><info>demo</info></metadata></ontology>`;
    const imported = importOntologyFromXML(sampleXML);
    expect(imported).toHaveProperty("title", "Imported Ontology");
    expect(imported.concepts).toEqual(["TestConcept"]);
    expect(imported.classes).toEqual(["TestClass"]);
    expect(imported.properties).toEqual([{ name: "name1", type: "string" }]);
    expect(imported.metadata).toEqual({ created: "today", info: "demo" });
  });

  test("XML round-trip retains all ontology properties", () => {
    const ontology = {
      title: "RoundTrip Ontology",
      concepts: ["ConceptX"],
      classes: ["ClassX"],
      properties: [{ name: "propX", type: "boolean" }],
      metadata: { version: "1.0", tag: "roundtrip" }
    };
    const xml = exportOntologyToXML(ontology);
    const imported = importOntologyFromXML(xml);
    expect(imported).toEqual(ontology);
  });

  test("backupOntology writes backup file successfully", async () => {
    const ontology = { title: "Backup Test", concepts: ["B"] };
    const writeSpy = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();
    const readSpy = vi.spyOn(fs.promises, "readFile").mockResolvedValue(JSON.stringify(ontology, null, 2));
    const result = await backupOntology();
    expect(result).toHaveProperty("success", true);
    writeSpy.mockRestore();
    readSpy.mockRestore();
  });

  test("updateOntology returns updated ontology", async () => {
    const newTitle = "Updated Title";
    const updated = await updateOntology(newTitle);
    expect(updated.title).toBe(newTitle);
  });

  test("clearOntology removes ontology file if exists", async () => {
    const unlinkSpy = vi.spyOn(fs.promises, "unlink").mockResolvedValue();
    const result = await clearOntology();
    expect(unlinkSpy).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
    unlinkSpy.mockRestore();
  });

  test("clearOntology returns error when file does not exist", async () => {
    const error = new Error();
    error.code = "ENOENT";
    const unlinkSpy = vi.spyOn(fs.promises, "unlink").mockRejectedValue(error);
    const result = await clearOntology();
    expect(result).toEqual({ success: false, error: "Ontology file does not exist" });
    unlinkSpy.mockRestore();
  });
});

describe("Crawling Functionality", () => {
  test("crawlOntologies returns separated success and error results", async () => {
    const results = await crawlOntologies();
    expect(results).toHaveProperty("successes");
    expect(results).toHaveProperty("errors");
    results.successes.forEach(item => {
      expect(item).toHaveProperty("endpoint");
      expect(item).toHaveProperty("data");
      expect(typeof item.data).toBe("string");
      expect(item.data.length).toBeGreaterThan(0);
      expect(item.owlContent).toContain("<title>");
    });
    results.errors.forEach(item => {
      expect(item).toHaveProperty("endpoint");
      expect(item).toHaveProperty("error");
    });
  }, 30000);

  test("fetchDataWithRetry rejects for invalid URL", async () => {
    const originalGet = http.get;
    http.get = simulateNetworkFailure();
    await expect(fetchDataWithRetry("http://invalid.url", 2)).rejects.toBeDefined();
    http.get = originalGet;
  });

  test("fetchDataWithRetry applies exponential backoff delay using fake timers", async () => {
    vi.useFakeTimers();
    const originalGet = http.get;
    let attempts = 0;
    http.get = (url, options, callback) => {
      attempts++;
      const req = {
        on: (event, handler) => {
          if (event === "error") {
            setTimeout(() => {
              handler(new Error("Network error"));
            }, 0);
          }
          return req;
        }
      };
      return req;
    };
    const promise = fetchDataWithRetry("http://example.com", 2).catch((e) => e);
    await vi.advanceTimersByTimeAsync(10);
    await vi.advanceTimersByTimeAsync(120);
    await vi.advanceTimersByTimeAsync(240);
    const result = await promise;
    expect(result).toBeInstanceOf(Error);
    expect(attempts).toBe(3);
    http.get = originalGet;
    vi.useRealTimers();
  });
});

describe("CLI and Main Function Tests", () => {
  test("main without args runs demo and logs demo output", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main([]);
    expect(spy).toHaveBeenCalledWith("Running demo of ontology functions:");
    spy.mockRestore();
  }, 10000);

  test("main with --help prints help details", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--help"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Usage: node src/lib/main.js [options]"));
    spy.mockRestore();
  });

  test("main with --version returns version string", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const version = await main(["--version"]);
    expect(spy).toHaveBeenCalledWith("Tool version:", version);
    expect(version).toBe(getVersion());
    spy.mockRestore();
  });

  test("main with --list returns supported commands", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const commands = await main(["--list"]);
    expect(spy).toHaveBeenCalledWith("Supported commands:", commands);
    expect(commands).toContain("--build");
    expect(commands).toContain("--version");
    spy.mockRestore();
  });

  test("main with --build with --allow-deprecated calls buildOntology and returns ontology", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const ontology = await main(["--build", "--allow-deprecated"]);
    expect(spy).toHaveBeenCalledWith("Ontology built:", ontology);
    expect(ontology).toHaveProperty("title", "Public Data Ontology");
    spy.mockRestore();
  });

  test("main with --build without --allow-deprecated warns and returns undefined", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const ontology = await main(["--build"]);
    expect(warnSpy).toHaveBeenCalledWith(
      "Error: --build command requires --allow-deprecated flag to use static fallback. Use --build-live for live data integration."
    );
    expect(ontology).toBeUndefined();
    warnSpy.mockRestore();
  });

  test("main with --crawl returns crawl results", async () => {
    const result = await main(["--crawl"]);
    expect(result).toHaveProperty("successes");
    expect(result).toHaveProperty("errors");
  }, 10000);

  test("main with --diagnostics returns remote crawl results", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const results = await main(["--diagnostics"]);
    expect(results).toHaveProperty("successes");
    results.successes.forEach((item) => {
      expect(item).toHaveProperty("endpoint");
    });
    spy.mockRestore();
  }, 10000);

  test("main with --serve starts web server", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = await main(["--serve"]);
    expect(result).toBe("Web server started");
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Web server started at http:\/\/localhost:\d+/));
    spy.mockRestore();
  });
});

describe("Ontology Model Wrappers", () => {
  test("buildBasicOWLModel returns a basic model", () => {
    const model = buildBasicOWLModel();
    expect(model).toHaveProperty("id", "basic");
    expect(model).toHaveProperty("title", "Basic OWL Ontology");
  });

  test("buildAdvancedOWLModel returns an advanced model", () => {
    const model = buildAdvancedOWLModel();
    expect(model).toHaveProperty("id", "advanced");
    expect(model).toHaveProperty("classes");
    expect(Array.isArray(model.properties)).toBe(true);
  });

  test("wrapOntologyModel adds a timestamp and default title if missing", () => {
    const model = { someProp: "value" };
    const wrapped = wrapOntologyModel(model);
    expect(wrapped).toHaveProperty("timestamp");
    expect(wrapped.title).toBe("Default Title");
  });

  test("buildMinimalOWLModel returns a minimal model", () => {
    const model = buildMinimalOWLModel();
    expect(model).toHaveProperty("id", "minimal");
    expect(model).toHaveProperty("title", "Minimal OWL Ontology");
    expect(model.concepts).toEqual([]);
    expect(model.metadata).toMatchObject({ version: "minimal" });
  });

  test("buildComplexOntologyModel returns a complex model", () => {
    const model = buildComplexOntologyModel();
    expect(model).toHaveProperty("id", "complex");
    expect(model).toHaveProperty("title", "Complex OWL Ontology");
    expect(Array.isArray(model.classes)).toBe(true);
    expect(Array.isArray(model.properties)).toBe(true);
    expect(Array.isArray(model.concepts)).toBe(true);
    expect(model.metadata).toHaveProperty("created");
  });

  test("buildScientificOntologyModel returns scientific model", () => {
    const model = buildScientificOntologyModel();
    expect(model).toHaveProperty("id", "scientific");
    expect(model).toHaveProperty("disciplines");
    expect(Array.isArray(model.concepts)).toBe(true);
  });

  test("buildEducationalOntologyModel returns educational model", () => {
    const model = buildEducationalOntologyModel();
    expect(model).toHaveProperty("id", "educational");
    expect(model).toHaveProperty("subjects");
    expect(Array.isArray(model.concepts)).toBe(true);
  });

  test("buildPhilosophicalOntologyModel returns philosophical model", () => {
    const model = buildPhilosophicalOntologyModel();
    expect(model).toHaveProperty("id", "philosophical");
    expect(model).toHaveProperty("title", "Philosophical OWL Ontology");
    expect(Array.isArray(model.themes)).toBe(true);
    expect(Array.isArray(model.concepts)).toBe(true);
    expect(model.metadata).toHaveProperty("category", "philosophy");
  });

  test("buildEconomicOntologyModel returns economic model", () => {
    const model = buildEconomicOntologyModel();
    expect(model).toHaveProperty("id", "economic");
    expect(model).toHaveProperty("title", "Economic OWL Ontology");
    expect(Array.isArray(model.sectors)).toBe(true);
    expect(Array.isArray(model.concepts)).toBe(true);
    expect(model.metadata).toHaveProperty("category", "economics");
  });
});

describe("Custom Ontology Functions", () => {
  test("buildCustomOntology returns a customized ontology", () => {
    const custom = { concepts: ["CustomConcept"] };
    const ont = buildCustomOntology(custom);
    expect(ont.customized).toBe(true);
    expect(ont.concepts).toContain("CustomConcept");
  });

  test("extendOntologyConcepts adds new concepts", () => {
    const base = { title: "Public Data Ontology", concepts: ["Concept1"] };
    const extended = extendOntologyConcepts(base, ["NewConcept"]);
    expect(extended.concepts).toContain("NewConcept");
  });
});

describe("New Features", () => {
  test("buildIntermediateOWLModel returns intermediate model", () => {
    const model = buildIntermediateOWLModel();
    expect(model.id).toBe("intermediate");
    expect(model.title).toBe("Intermediate OWL Ontology");
    expect(model.concepts).toEqual(expect.arrayContaining(["IntermediateConcept1", "IntermediateConcept2"]));
  });

  test("buildEnhancedOntology returns enhanced ontology with image and enhanced concept", async () => {
    const spy = vi
      .spyOn(fetcher, "fetchDataWithRetry")
      .mockResolvedValue(JSON.stringify({ message: "http://example.com/image.jpg" }));
    const ontology = await buildEnhancedOntology();
    expect(ontology.image).toBe("http://example.com/image.jpg");
    expect(ontology.concepts).toContain("EnhancedConcept");
    spy.mockRestore();
  });
});

describe("Live Data Functions", () => {
  test("buildOntologyFromLiveData returns an ontology with title and concepts", async () => {
    const liveOntology = await buildOntologyFromLiveData();
    expect(liveOntology).toHaveProperty("title");
    expect(Array.isArray(liveOntology.concepts)).toBe(true);
  });
});

describe("Diagnostic Logging", () => {
  test("getCurrentTimestamp returns valid ISO string", () => {
    const ts = getCurrentTimestamp();
    expect(new Date(ts).toISOString()).toBe(ts);
  });

  test("logDiagnostic logs message with timestamp", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logDiagnostic("Test diagnostic");
    expect(spy).toHaveBeenCalled();
    const logged = spy.mock.calls[0][0];
    expect(logged).toMatch(/\[.*\] DIAGNOSTIC: Test diagnostic/);
    spy.mockRestore();
  });
});

describe("Extended Custom Functions", () => {
  test("buildOntologyFromCustomData returns ontology with customization flag", () => {
    const customData = { title: "Custom Title", concepts: ["CustomData"] };
    const customOntology = buildOntologyFromCustomData(customData);
    expect(customOntology.title).toBe("Custom Title");
    expect(customOntology.concepts).toContain("CustomData");
    expect(customOntology.customizedByUser).toBe(true);
  });

  test("mergeOntologies correctly merges two ontologies", () => {
    const ont1 = { title: "Ontology1", concepts: ["A"] };
    const ont2 = { title: "Ontology2", concepts: ["B"] };
    const merged = mergeOntologies(ont1, ont2);
    expect(merged.title).toBe("Ontology1 & Ontology2");
    expect(merged.concepts).toEqual(expect.arrayContaining(["A", "B"]));
  });

  test("buildOntologyFromLiveDataWithLog logs diagnostic and returns live ontology", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const ontology = await buildOntologyFromLiveDataWithLog();
    expect(ontology).toHaveProperty("title");
    spy.mockRestore();
  });
});

describe("Refresh and Merge Persist Functions", () => {
  test("refreshOntology clears, builds live ontology and persists it", async () => {
    const unlinkSpy = vi.spyOn(fs.promises, "unlink").mockResolvedValue();
    const writeSpy = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();
    const result = await refreshOntology();
    expect(result).toHaveProperty("liveOntology");
    expect(result).toHaveProperty("persistResult");
    unlinkSpy.mockRestore();
    writeSpy.mockRestore();
  }, 5000);

  test("mergeAndPersistOntology merges static and live ontologies and persists the result", async () => {
    const writeSpy = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();
    const result = await mergeAndPersistOntology();
    expect(result).toHaveProperty("merged");
    expect(result).toHaveProperty("persistRes");
    writeSpy.mockRestore();
  }, 5000);
});

describe("Additional New Features", () => {
  test("buildOntologyHybrid returns blended ontology with hybrid flag", async () => {
    const hybrid = await buildOntologyHybrid({ extra: "data" });
    expect(hybrid.hybrid).toBe(true);
  });

  test("enhancedDiagnosticSummary returns valid summary", () => {
    const summary = enhancedDiagnosticSummary();
    expect(summary).toHaveProperty("timestamp");
    expect(summary.message).toBe("All diagnostic systems operational.");
    expect(summary.version).toBe("0.0.39");
  });

  test("customMergeWithTimestamp adds timestamp to merged ontology", () => {
    const ont1 = { title: "One", concepts: ["A"] };
    const ont2 = { title: "Two", concepts: ["B"] };
    const merged = customMergeWithTimestamp(ont1, ont2);
    expect(merged).toHaveProperty("timestamp");
  });

  test("backupAndRefreshOntology returns both backup and refreshed ontology data", async () => {
    const result = await backupAndRefreshOntology();
    expect(result).toHaveProperty("backupResult");
    expect(result).toHaveProperty("refreshedOntology");
  });
});

describe("Disable Live Data Integration", () => {
  test("buildOntologyFromLiveData returns static ontology when DISABLE_LIVE_DATA is set", async () => {
    process.env.DISABLE_LIVE_DATA = "1";
    const liveOntology = await buildOntologyFromLiveData();
    const staticOntology = buildOntology();
    expect(liveOntology).toEqual(staticOntology);
    delete process.env.DISABLE_LIVE_DATA;
  });

  test("buildOntologyFromLiveData performs live integration when DISABLE_LIVE is not set", async () => {
    delete process.env.DISABLE_LIVE_DATA;
    const liveOntology = await buildOntologyFromLiveData();
    // In test mode, live integration is simulated and should return a title other than 'Public Data Ontology'
    expect(liveOntology.title).not.toBe("Public Data Ontology");
  });
});

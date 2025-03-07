/* eslint-disable sonarjs/no-ignored-exceptions, no-unused-vars, prettier/prettier */
import { describe, test, expect, vi, afterAll, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import * as mainModule from "../../src/lib/main.js";

const {
  main,
  buildOntology,
  serveWebInterface,
  displayHelp,
  diagnostics,
  integrateOntology,
  crawlData,
  persistOntology,
  loadOntology,
  queryOntology,
  validateOntology,
  exportOntologyToXML,
  importOntologyFromXML,
  getOntologySummary,
  refreshOntology,
  analyzeOntology,
  monitorOntology,
  rebuildOntology,
  fetchPublicData,
  fetchFromEndpoint,
  updateOntology,
  clearOntology,
  enhanceOntology,
  wrapOntologyModels,
  wrapOntologyModelsExtended,
  wrapAllOntologyModels,
  generateOntologyReport,
  listAvailableEndpoints,
  logDetailedResponse,
  advancedOntologyAnalysis,
  fetchFromExtendedEndpoints,
  automatedCommitMessage,
  validateOntologyCompleteness,
  mergeOntologyModels,
  updateOntologyDescription,
  extendOntologyConcepts,
  resetOntology,
  cloneOntology,
  fetchDataWithRetry,
  getChangeLog,
  extendOntologyDetails,
  wrapOntologyModelsSimple,
  wrapOntologyModelsComprehensive,
  wrapOntologyModelsRandom,
  backupOntology,
  transformOntologyData,
  debugOntologyMetrics,
  reflectOntologyStatus
} = mainModule;

const ontologyPath = path.resolve(process.cwd(), "ontology.json");
const backupPath = path.resolve(process.cwd(), "ontology-backup.json");

// Import https for simulating network errors
import https from "https";

describe("Main Module General Functions", () => {
  test("main without args prints default message", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main([]);
    expect(spy).toHaveBeenCalledWith("Run with: []");
    spy.mockRestore();
  });

  test("main with --help prints help details", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--help"]);
    const expectedUsage = "Usage: node src/lib/main.js [options]";
    expect(spy).toHaveBeenCalledWith(expectedUsage);
    spy.mockRestore();
  });

  test("main with --version returns version string", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const version = await main(["--version"]);
    expect(spy).toHaveBeenCalledWith("Tool version:", version);
    expect(version).toBe("0.0.14");
    spy.mockRestore();
  });

  test("main with --list returns supported commands", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const commands = await main(["--list"]);
    expect(spy).toHaveBeenCalledWith("Supported commands:", commands);
    expect(commands).toContain("--build");
    expect(commands).toContain("--version");
    expect(commands).toContain("--monitor");
    expect(commands).toContain("--rebuild");
    expect(commands).toContain("--demo");
    expect(commands).toContain("--fetch-schemas");
    expect(commands).toContain("--fetch-public");
    expect(commands).toContain("--update");
    expect(commands).toContain("--clear");
    expect(commands).toContain("--fetch-endpoints");
    expect(commands).toContain("--enhance");
    expect(commands).toContain("--wrap");
    expect(commands).toContain("--wrap-extended");
    expect(commands).toContain("--report");
    expect(commands).toContain("--list-endpoints");
    expect(commands).toContain("--fetch-extended");
    expect(commands).toContain("--advanced-analysis");
    expect(commands).toContain("--wrap-all");
    expect(commands).toContain("--cleanup");
    expect(commands).toContain("--auto-commit");
    expect(commands).toContain("--combine-models");
    expect(commands).toContain("--refresh-details");
    expect(commands).toContain("--extend-concepts");
    expect(commands).toContain("--fetch-retry");
    expect(commands).toContain("--changelog");
    expect(commands).toContain("--extend-details");
    expect(commands).toContain("--wrap-simple");
    expect(commands).toContain("--wrap-comprehensive");
    expect(commands).toContain("--wrap-random");
    spy.mockRestore();
  });

  test("main with --build calls buildOntology and returns ontology", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const ontology = await main(["--build"]);
    expect(spy).toHaveBeenCalledWith("Ontology built:", ontology);
    expect(ontology).toHaveProperty("title", "Sample Ontology");
    spy.mockRestore();
  });

  test("main with --detailed-build returns detailed ontology with stats", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const detailed = await main(["--detailed-build"]);
    expect(spy).toHaveBeenCalledWith("Detailed Ontology built:", detailed);
    expect(detailed).toHaveProperty("stats");
    expect(detailed.stats).toHaveProperty("titleLength");
    expect(detailed.stats).toHaveProperty("conceptCount");
    spy.mockRestore();
  });

  test("main with --serve calls serveWebInterface", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--serve"]);
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Web server running on port \d+/));
    spy.mockRestore();
  });

  test("main with --diagnostics calls diagnostics", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--diagnostics"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Diagnostics:"));
    spy.mockRestore();
  });

  test("main with --integrate returns integrated ontology", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const integrated = await main(["--integrate"]);
    expect(spy).toHaveBeenCalledWith("Ontology integrated:", integrated);
    expect(integrated).toHaveProperty("integrated", true);
    expect(integrated).toHaveProperty("integratedWith");
    spy.mockRestore();
  });

  test("main with --crawl returns crawled data", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const crawled = await main(["--crawl"]);
    expect(spy).toHaveBeenCalledWith("Public data crawled:", crawled);
    expect(crawled).toHaveProperty("source", "PublicDataSource");
    spy.mockRestore();
  });

  test("main with --demo returns demo output", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const demo = await main(["--demo"]);
    expect(spy).toHaveBeenCalledWith("Demo output:", demo);
    expect(demo).toHaveProperty("message", "This is a demo output to illustrate owl-builder functionalities");
    spy.mockRestore();
  });

  test("main with --fetch-schemas returns fetched schemas", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const schemas = await main(["--fetch-schemas"]);
    expect(spy).toHaveBeenCalledWith("Fetched schemas:", schemas);
    expect(Array.isArray(schemas)).toBe(true);
    expect(schemas[0]).toHaveProperty("id");
    expect(schemas[0]).toHaveProperty("name");
    expect(schemas[0]).toHaveProperty("details");
    spy.mockRestore();
  });

  test("main with --fetch-public returns fetched public data", async () => {
    const fakeData = { count: 1, entries: [{ API: "Test API" }] };
    const spy = vi.spyOn(mainModule, "fetchPublicData").mockResolvedValue(fakeData);
    const result = await main(["--fetch-public"]);
    expect(result).toEqual(fakeData);
    spy.mockRestore();
  });

  test("fetchFromEndpoint handles simulated error for coindesk endpoint in test mode", async () => {
    process.env.NODE_ENV = "test";
    const result = await fetchFromEndpoint("https://api.coindesk.com/v1/bpi/currentprice.json");
    expect(result).toHaveProperty("error", "Simulated network error");
  });

  test("fetchFromEndpoint returns simulated data for a non-coindesk endpoint in test mode", async () => {
    process.env.NODE_ENV = "test";
    const result = await fetchFromEndpoint("https://api.example.com/data");
    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("simulated", "data");
  });

  afterAll(() => {
    process.env.NODE_ENV = "";
  });
});

describe("Extended Functionality", () => {
  beforeEach(() => {
    if (fs.existsSync(ontologyPath)) {
      fs.unlinkSync(ontologyPath);
    }
    if (fs.existsSync(backupPath)) {
      fs.unlinkSync(backupPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(ontologyPath)) {
      fs.unlinkSync(ontologyPath);
    }
    if (fs.existsSync(backupPath)) {
      fs.unlinkSync(backupPath);
    }
  });

  test("main with --persist persists the ontology to file", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = await main(["--persist"]);
    expect(result).toHaveProperty("success", true);
    expect(fs.existsSync(ontologyPath)).toBe(true);
    spy.mockRestore();
  });

  test("main with --load loads the persisted ontology", async () => {
    const ontology = buildOntology();
    const persistResult = persistOntology(ontology);
    expect(persistResult).toHaveProperty("success", true);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const loaded = await main(["--load"]);
    expect(loaded).toHaveProperty("title", "Sample Ontology");
    spy.mockRestore();
  });

  test("main with --query returns query results", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = await main(["--query"]);
    expect(result).toHaveProperty("searchTerm", "Concept1");
    expect(result.results).toContain("Concept1");
    spy.mockRestore();
  });

  test("main with --validate validates the ontology correctly", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const isValid = await main(["--validate"]);
    expect(isValid).toBe(true);
    spy.mockRestore();
  });

  test("main with --export exports the ontology to XML", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const xml = await main(["--export"]);
    expect(xml).toContain("<ontology>");
    expect(xml).toContain("<title>Sample Ontology</title>");
    spy.mockRestore();
  });

  test("main with --import imports ontology from XML", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const imported = await main(["--import"]);
    expect(imported).toHaveProperty("title");
    expect(Array.isArray(imported.concepts)).toBe(true);
    spy.mockRestore();
  });

  test("main with --sync synchronizes the ontology", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const synced = await main(["--sync"]);
    expect(synced).toHaveProperty("synced", true);
    expect(synced).toHaveProperty("syncedAt");
    spy.mockRestore();
  });

  test("main with --backup creates a backup of the ontology file", async () => {
    const ontology = buildOntology();
    persistOntology(ontology);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const backupResult = await main(["--backup"]);
    expect(backupResult).toHaveProperty("success", true);
    expect(fs.existsSync(backupPath)).toBe(true);
    spy.mockRestore();
  });

  test("main with --update updates the ontology title", async () => {
    const newTitle = "Custom Updated Title";
    const result = await main(["--update", newTitle]);
    expect(result.title).toBe(newTitle);
  });

  test("main with --clear deletes the ontology file if exists", async () => {
    const ontology = buildOntology();
    persistOntology(ontology);
    expect(fs.existsSync(ontologyPath)).toBe(true);
    const result = await main(["--clear"]);
    expect(fs.existsSync(ontologyPath)).toBe(false);
  });

  test("main with --fetch-endpoints fetches data from multiple endpoints", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const endpointsData = await main(["--fetch-endpoints"]);
    expect(Array.isArray(endpointsData)).toBe(true);
    expect(endpointsData.length).toBe(5);
    endpointsData.forEach(item => {
      expect(item).toHaveProperty("endpoint");
    });
    spy.mockRestore();
  });

  test("main with --enhance returns enhanced ontology", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const enhanced = await main(["--enhance"]);
    expect(spy).toHaveBeenCalledWith("Enhanced ontology:", enhanced);
    expect(enhanced).toHaveProperty("model");
    expect(enhanced.model).toHaveProperty("description");
    expect(enhanced.model).toHaveProperty("version", "1.0");
    spy.mockRestore();
  });

  test("main with --wrap returns wrapped ontology models", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const wrapped = await main(["--wrap"]);
    expect(wrapped).toHaveProperty("wrapped", true);
    expect(wrapped).toHaveProperty("basic");
    expect(wrapped).toHaveProperty("enhanced");
    expect(wrapped).toHaveProperty("integrated");
    expect(wrapped.sources).toBeInstanceOf(Array);
    spy.mockRestore();
  });

  test("main with --wrap-extended returns extended wrapped ontology models", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const extendedWrapped = await main(["--wrap-extended"]);
    expect(extendedWrapped).toHaveProperty("aggregated", true);
    expect(extendedWrapped).toHaveProperty("basic");
    expect(extendedWrapped).toHaveProperty("enhanced");
    expect(extendedWrapped).toHaveProperty("integrated");
    expect(extendedWrapped).toHaveProperty("report");
    expect(extendedWrapped).toHaveProperty("synced");
    expect(extendedWrapped).toHaveProperty("rebuilt");
    expect(extendedWrapped.modelCount).toBe(6);
    spy.mockRestore();
  });

  test("main with --report returns ontology report", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const report = await main(["--report"]);
    expect(report).toHaveProperty("title");
    expect(report).toHaveProperty("summary");
    expect(report).toHaveProperty("analysis");
    expect(report).toHaveProperty("enhanced");
    spy.mockRestore();
  });

  test("main with --list-endpoints returns extended endpoint list", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const endpoints = await main(["--list-endpoints"]);
    expect(Array.isArray(endpoints)).toBe(true);
    expect(endpoints.length).toBe(14);
    spy.mockRestore();
  });

  test("main with --fetch-extended returns data from extended endpoints", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const extendedData = await main(["--fetch-extended"]);
    expect(Array.isArray(extendedData)).toBe(true);
    expect(extendedData.length).toBe(10);
    extendedData.forEach(item => {
      expect(item).toHaveProperty("endpoint");
    });
    spy.mockRestore();
  });

  test("main with --advanced-analysis returns advanced analysis report", async () => {
    const result = await main(["--advanced-analysis"]);
    expect(result).toHaveProperty("advanced", true);
    expect(result).toHaveProperty("additionalMetrics");
    expect(result.additionalMetrics).toHaveProperty("medianConceptLength");
  });

  test("main with --wrap-all returns aggregated ontology with advanced metrics", async () => {
    const result = await main(["--wrap-all"]);
    expect(result).toHaveProperty("totalModels", 4);
    expect(result).toHaveProperty("advanced");
  });

  test("--cleanup command removes duplicate ontology concepts", async () => {
    const result = await main(["--cleanup"]);
    expect(result.concepts.sort()).toEqual(["Concept1", "Concept2", "Concept3"].sort());
  });

  test("--auto-commit returns automated commit message", async () => {
    const msg = await main(["--auto-commit"]);
    expect(msg).toMatch(/^Automated commit on/);
  });

  test("--combine-models returns combined ontology models", async () => {
    const merged = await main(["--combine-models"]);
    expect(merged).toHaveProperty("integrated");
    expect(merged).toHaveProperty("enhanced");
    expect(merged).toHaveProperty("title");
  });

  test("--refresh-details returns updated ontology description", async () => {
    const result = await main(["--refresh-details"]);
    expect(result.description).toBe("Refreshed ontology with additional details.");
  });

  test("--extend-concepts adds new concepts", async () => {
    const result = await main(["--extend-concepts"]);
    expect(result.concepts).toContain("ExtendedConcept1");
    expect(result.concepts).toContain("ExtendedConcept2");
  });

  // New tests for new wrapper commands
  test("main with --wrap-simple returns simple wrapped ontology models", async () => {
    const result = await main(["--wrap-simple"]);
    expect(result).toHaveProperty("basic");
    expect(result).toHaveProperty("enhanced");
  });

  test("main with --wrap-comprehensive returns comprehensive wrapped ontology models", async () => {
    const result = await main(["--wrap-comprehensive"]);
    expect(result).toHaveProperty("basic");
    expect(result).toHaveProperty("enhanced");
    expect(result).toHaveProperty("integrated");
    expect(result).toHaveProperty("report");
    expect(result).toHaveProperty("synced");
    expect(result).toHaveProperty("advanced");
    expect(result).toHaveProperty("detailed");
    expect(result).toHaveProperty("collected");
  });

  test("main with --wrap-random returns one of the available wrappers", async () => {
    const result = await main(["--wrap-random"]);
    expect(result).toHaveProperty("basic");
  });

  describe("File System Error Handling", () => {
    let originalWriteFileSync, originalReadFileSync;
    beforeAll(() => {
      originalWriteFileSync = fs.writeFileSync;
      originalReadFileSync = fs.readFileSync;
    });
    afterAll(() => {
      fs.writeFileSync = originalWriteFileSync;
      fs.readFileSync = originalReadFileSync;
    });
    
    test("persistOntology returns error on write failure", () => {
      const ontology = buildOntology();
      fs.writeFileSync = vi.fn(() => { throw new Error("Write error"); });
      const result = persistOntology(ontology);
      expect(result.success).toBe(false);
      expect(result.error).toBe("Write error");
    });
    
    test("loadOntology returns error on read failure", () => {
      fs.readFileSync = vi.fn(() => { throw new Error("Read error"); });
      const result = loadOntology();
      expect(result.success).toBe(false);
      expect(result.error).toBe("Read error");
    });
    
    test("backupOntology returns error when original file read fails", () => {
      fs.readFileSync = vi.fn(() => { throw new Error("Backup read error"); });
      const result = backupOntology();
      expect(result.success).toBe(false);
      expect(result.error).toBe("Backup read error");
    });
  });

  describe("Extended New Functions", () => {
    test("updateOntologyDescription returns updated description", () => {
      const newDesc = "A new detailed description";
      const updated = updateOntologyDescription(newDesc);
      expect(updated.description).toBe(newDesc);
    });

    test("extendOntologyConcepts adds new concepts", () => {
      const updated = extendOntologyConcepts("NewConcept1", "NewConcept2");
      expect(updated.concepts).toContain("NewConcept1");
      expect(updated.concepts).toContain("NewConcept2");
    });

    test("resetOntology resets the ontology with empty concepts", () => {
      const reset = resetOntology();
      expect(reset.concepts).toEqual([]);
      expect(reset.title).toBe("Sample Ontology");
    });

    test("cloneOntology returns a deep copy", () => {
      const ontology = buildOntology();
      const clone = cloneOntology();
      expect(clone).toEqual(ontology);
      expect(clone).not.toBe(ontology);
    });

    test("transformOntologyData returns ontology with transformed flag", () => {
      const transformed = transformOntologyData();
      expect(transformed.transformed).toBe(true);
      expect(transformed.transformationDetails).toHaveProperty("transformedAt");
    });

    test("debugOntologyMetrics returns metrics with conceptCount, title, and descriptionLength", () => {
      const metrics = debugOntologyMetrics();
      expect(metrics).toHaveProperty("conceptCount");
      expect(metrics).toHaveProperty("title");
      expect(metrics).toHaveProperty("descriptionLength");
    });

    test("reflectOntologyStatus returns valid status object", () => {
      const status = reflectOntologyStatus();
      expect(status).toHaveProperty("valid");
      expect(status).toHaveProperty("completeness");
      expect(status).toHaveProperty("lastUpdated");
    });
  });
});

describe("Module Index", () => {
  test("module index exports main function", () => {
    expect(typeof main).toBe("function");
  });
});

describe("Run Main Execution", () => {
  test("main returns demo output when no valid args provided", async () => {
    const result = await main([]);
    expect(result).toBeUndefined();
  });
});

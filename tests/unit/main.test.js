import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach, vi } from "vitest";
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
  generateOntologyReport,
  listAvailableEndpoints,
  logDetailedResponse,
  advancedOntologyAnalysis,
  fetchFromExtendedEndpoints,
  wrapAllOntologyModels,
  backupOntology
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
    const expectedOptions = `Options:
  --help,
  --version,
  --list,
  --build,
  --detailed-build,
  --serve,
  --diagnostics,
  --integrate,
  --crawl,
  --persist,
  --load,
  --query,
  --validate,
  --export,
  --import,
  --sync,
  --backup,
  --summary,
  --refresh,
  --analyze,
  --monitor,
  --rebuild,
  --demo,
  --fetch-schemas,
  --fetch-public,
  --update [newTitle],
  --clear,
  --fetch-endpoints,
  --enhance,
  --wrap,
  --wrap-extended,
  --report,
  --list-endpoints,
  --fetch-extended,
  --advanced-analysis,
  --wrap-all`;
    expect(spy).toHaveBeenCalledWith(expectedUsage);
    expect(spy).toHaveBeenCalledWith(expectedOptions);
    spy.mockRestore();
  });

  test("main with --version returns version string", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const version = await main(["--version"]);
    expect(spy).toHaveBeenCalledWith("Tool version:", version);
    expect(version).toBe("0.0.9");
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
    expect(commands).toContain("--detailed-build");
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
    expect(endpoints.length).toBeGreaterThan(5);
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

describe("Endpoint Response Logging Test", () => {
  test("should make a request to each endpoint in the extended list and log the response", async () => {
    process.env.NODE_ENV = "test";
    const endpoints = listAvailableEndpoints();
    const responses = await Promise.all(endpoints.map(ep => fetchFromEndpoint(ep)));
    responses.forEach(response => {
      console.log("Endpoint Response:", response);
      expect(response).toHaveProperty("endpoint");
    });
    process.env.NODE_ENV = "";
  });
});

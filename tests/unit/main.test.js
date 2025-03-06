import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
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
  listCommands,
  getVersion,
  monitorOntology,
  rebuildOntology,
  demoOntology,
  fetchOwlSchemas,
  fetchPublicData,
  updateOntology,
  clearOntology,
  fetchOntologyEndpoints
} = mainModule;

const ontologyPath = path.resolve(process.cwd(), "ontology.json");
const backupPath = path.resolve(process.cwd(), "ontology-backup.json");

// Import https module for simulating network errors
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
  --fetch-endpoints`;
    expect(spy).toHaveBeenCalledWith(expectedUsage);
    expect(spy).toHaveBeenCalledWith(expectedOptions);
    spy.mockRestore();
  });

  test("main with --version returns version string", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const version = await main(["--version"]);
    expect(spy).toHaveBeenCalledWith("Tool version:", version);
    expect(version).toBe("0.0.6");
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
    spy.mockRestore();
  });

  test("main with --build calls buildOntology and returns ontology", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const ontology = await main(["--build"]);
    expect(spy).toHaveBeenCalledWith("Ontology built:", ontology);
    expect(ontology).toHaveProperty("title", "Sample Ontology");
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

  test("fetchPublicData handles non-200 response", async () => {
    const fakeResponse = new Readable({
      read() {}
    });
    fakeResponse.statusCode = 500;
    fakeResponse.setEncoding = () => {};
    fakeResponse.on = (event, callback) => {
      if (event === 'data') {
        callback('error');
      } else if (event === 'end') {
        callback();
      }
    };

    const originalGet = https.get;
    https.get = (options, callback) => {
      callback(fakeResponse);
      return { on: () => {} };
    };

    await expect(fetchPublicData("http://example.com")).rejects.toThrow("Request failed with status code: 500");
    https.get = originalGet;
  });

  test("fetchPublicData handles network error", async () => {
    const originalGet = https.get;
    https.get = (options, callback) => {
      const req = { on: (event, errCallback) => {
        if (event === 'error') {
          errCallback(new Error('Network error'));
        }
      } };
      return req;
    };

    await expect(fetchPublicData("http://example.com")).rejects.toThrow("Network error");
    https.get = originalGet;
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
});

describe("Utility Functions", () => {
  test("buildOntology returns a valid ontology object", () => {
    const ontology = buildOntology();
    expect(ontology).toHaveProperty("title", "Sample Ontology");
    expect(ontology).toHaveProperty("concepts");
    expect(Array.isArray(ontology.concepts)).toBe(true);
  });

  test("serveWebInterface logs the server start message", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await serveWebInterface();
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Web server running on port \d+/));
    spy.mockRestore();
  });

  test("displayHelp prints the correct usage message", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayHelp();
    const expectedUsage = "Usage: node src/lib/main.js [options]";
    const expectedOptions = `Options:
  --help,
  --version,
  --list,
  --build,
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
  --fetch-endpoints`;
    expect(spy).toHaveBeenCalledWith(expectedUsage);
    expect(spy).toHaveBeenCalledWith(expectedOptions);
    spy.mockRestore();
  });

  test("diagnostics logs Node.js version and platform", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    diagnostics();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Diagnostics:"));
    spy.mockRestore();
  });

  test("integrateOntology returns an integrated ontology object", () => {
    const integrated = integrateOntology();
    expect(integrated).toHaveProperty("integrated", true);
    expect(integrated.integratedWith).toEqual(expect.arrayContaining(["Theme Ontology A", "Theme Ontology B"]));
  });

  test("crawlData returns a valid crawled data object", () => {
    const data = crawlData();
    expect(data).toHaveProperty("source", "PublicDataSource");
    expect(data).toHaveProperty("data");
    expect(Array.isArray(data.data)).toBe(true);
  });

  test("persistOntology writes the ontology to file", () => {
    if (fs.existsSync(ontologyPath)) {
      fs.unlinkSync(ontologyPath);
    }
    const ontology = buildOntology();
    const result = persistOntology(ontology);
    expect(result).toHaveProperty("success", true);
    expect(fs.existsSync(ontologyPath)).toBe(true);
  });

  test("loadOntology reads the ontology from file", () => {
    const ontology = buildOntology();
    persistOntology(ontology);
    const loaded = loadOntology();
    expect(loaded).toHaveProperty("title", "Sample Ontology");
  });

  test("queryOntology returns correct search results", () => {
    const result = queryOntology("Concept2");
    expect(result.results).toContain("Concept2");
  });

  test("validateOntology correctly validates a valid ontology", () => {
    const ontology = buildOntology();
    expect(validateOntology(ontology)).toBe(true);
  });

  test("exportOntologyToXML returns a valid XML string", () => {
    const ontology = buildOntology();
    const xml = exportOntologyToXML(ontology);
    expect(xml).toContain("<ontology>");
    expect(xml).toContain("<title>Sample Ontology</title>");
  });

  test("importOntologyFromXML parses XML correctly", () => {
    const sampleXML = `<ontology><title>Imported Ontology</title><created>2023-10-01T00:00:00.000Z</created><concepts><concept>ConceptA</concept><concept>ConceptB</concept></concepts></ontology>`;
    const imported = importOntologyFromXML(sampleXML);
    expect(imported.title).toBe("Imported Ontology");
    expect(imported.concepts).toEqual(["ConceptA", "ConceptB"]);
  });

  test("getOntologySummary returns correct summary", () => {
    const ontology = buildOntology();
    const summary = getOntologySummary(ontology);
    expect(summary).toHaveProperty("title", ontology.title);
    expect(summary).toHaveProperty("conceptCount", ontology.concepts.length);
    expect(summary.uniqueConcepts.length).toBeLessThanOrEqual(ontology.concepts.length);
  });

  test("refreshOntology updates the creation date", () => {
    const ontology = buildOntology();
    const refreshed = refreshOntology(ontology);
    expect(refreshed.created).not.toBe(ontology.created);
  });

  test("analyzeOntology returns valid analysis report", () => {
    const ontology = buildOntology();
    const analysis = analyzeOntology(ontology);
    expect(analysis).toHaveProperty("isValid", true);
    expect(analysis).toHaveProperty("conceptCount", ontology.concepts.length);
    expect(analysis).toHaveProperty("titleLength", ontology.title.length);
  });

  test("monitorOntology returns memory usage details", () => {
    const usage = monitorOntology();
    expect(usage).toHaveProperty("freeMem");
    expect(usage).toHaveProperty("totalMem");
    expect(usage).toHaveProperty("loadAvg");
    expect(usage).toHaveProperty("usedMem");
  });

  test("rebuildOntology returns an ontology with updated creation date", () => {
    const ontology = buildOntology();
    const rebuilt = rebuildOntology();
    expect(rebuilt.created).not.toBe(ontology.created);
  });
});

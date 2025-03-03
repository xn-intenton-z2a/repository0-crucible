import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import {
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
  syncOntology,
  backupOntology
} from "@src/lib/main.js";

const ontologyPath = path.resolve(process.cwd(), "ontology.json");
const backupPath = path.resolve(process.cwd(), "ontology-backup.json");

describe("Main Module General Functions", () => {
  test("main without args prints default message", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([]);
    expect(spy).toHaveBeenCalledWith("Run with: []");
    spy.mockRestore();
  });

  test("main with --help prints help details", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--help"]);
    expect(spy).toHaveBeenCalledWith("Usage: node src/lib/main.js [options]");
    expect(spy).toHaveBeenCalledWith("Options: --help, --build, --serve, --diagnostics, --integrate, --crawl, --persist, --load, --query, --validate, --export, --import, --sync, --backup");
    spy.mockRestore();
  });

  test("main with --build calls buildOntology and returns ontology", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const ontology = main(["--build"]);
    expect(spy).toHaveBeenCalledWith("Ontology built:", ontology);
    expect(ontology).toHaveProperty("title", "Sample Ontology");
    spy.mockRestore();
  });

  test("main with --serve calls serveWebInterface", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--serve"]);
    expect(spy).toHaveBeenCalledWith("Starting web server on port 8080...");
    spy.mockRestore();
  });

  test("main with --diagnostics calls diagnostics", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--diagnostics"]);
    expect(spy).toHaveBeenCalledWith("Diagnostics:");
    spy.mockRestore();
  });

  test("main with --integrate returns integrated ontology", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const integrated = main(["--integrate"]);
    expect(spy).toHaveBeenCalledWith("Ontology integrated:", integrated);
    expect(integrated).toHaveProperty("integrated", true);
    expect(integrated).toHaveProperty("integratedWith");
    spy.mockRestore();
  });

  test("main with --crawl returns crawled data", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const crawled = main(["--crawl"]);
    expect(spy).toHaveBeenCalledWith("Public data crawled:", crawled);
    expect(crawled).toHaveProperty("source", "PublicDataSource");
    spy.mockRestore();
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

  test("main with --persist persists the ontology to file", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = main(["--persist"]);
    expect(result).toHaveProperty("success", true);
    expect(fs.existsSync(ontologyPath)).toBe(true);
    spy.mockRestore();
  });

  test("main with --load loads the persisted ontology", () => {
    const ontology = buildOntology();
    const persistResult = persistOntology(ontology);
    expect(persistResult).toHaveProperty("success", true);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const loaded = main(["--load"]);
    expect(loaded).toHaveProperty("title", "Sample Ontology");
    spy.mockRestore();
  });

  test("main with --query returns query results", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = main(["--query"]);
    expect(result).toHaveProperty("searchTerm", "Concept1");
    expect(result.results).toContain("Concept1");
    spy.mockRestore();
  });

  test("main with --validate validates the ontology correctly", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const isValid = main(["--validate"]);
    expect(isValid).toBe(true);
    spy.mockRestore();
  });

  test("main with --export exports the ontology to XML", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const xml = main(["--export"]);
    expect(xml).toContain("<ontology>");
    expect(xml).toContain("<title>Sample Ontology</title>");
    spy.mockRestore();
  });

  test("main with --import imports ontology from XML", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const imported = main(["--import"]);
    expect(imported).toHaveProperty("title");
    expect(imported.concepts).toBeInstanceOf(Array);
    spy.mockRestore();
  });

  test("main with --sync synchronizes the ontology", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const synced = main(["--sync"]);
    expect(synced).toHaveProperty("synced", true);
    expect(synced).toHaveProperty("syncedAt");
    spy.mockRestore();
  });

  test("main with --backup creates a backup of the ontology file", () => {
    // First persist the original ontology
    const ontology = buildOntology();
    persistOntology(ontology);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const backupResult = main(["--backup"]);
    expect(backupResult).toHaveProperty("success", true);
    expect(fs.existsSync(backupPath)).toBe(true);
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

  test("serveWebInterface logs the server start message", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    serveWebInterface();
    expect(spy).toHaveBeenCalledWith("Starting web server on port 8080...");
    spy.mockRestore();
  });

  test("displayHelp prints the correct usage message", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayHelp();
    expect(spy).toHaveBeenCalledWith("Usage: node src/lib/main.js [options]");
    expect(spy).toHaveBeenCalledWith("Options: --help, --build, --serve, --diagnostics, --integrate, --crawl, --persist, --load, --query, --validate, --export, --import, --sync, --backup");
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
    expect(integrated.integratedWith).toEqual(
      expect.arrayContaining(["Theme Ontology A", "Theme Ontology B"])
    );
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
});

import { describe, test, expect, vi } from "vitest";
import {
  main,
  buildOntology,
  serveWebInterface,
  displayHelp,
  diagnostics,
  integrateOntology,
  crawlData,
} from "@src/lib/main.js";

describe("Main Module General Functions", () => {
  test("main without args prints default message", () => {
    const spy = vi.spyOn(console, "log");
    main([]);
    expect(spy).toHaveBeenCalledWith("Run with: []");
    spy.mockRestore();
  });

  test("main with --help prints help details", () => {
    const spy = vi.spyOn(console, "log");
    main(["--help"]);
    expect(spy).toHaveBeenCalledWith("Usage: node src/lib/main.js [options]");
    expect(spy).toHaveBeenCalledWith("Options: --help, --build, --serve, --diagnostics, --integrate, --crawl");
    spy.mockRestore();
  });

  test("main with --build calls buildOntology and returns ontology", () => {
    const spy = vi.spyOn(console, "log");
    const ontology = main(["--build"]);
    expect(spy).toHaveBeenCalledWith("Ontology built:", ontology);
    expect(ontology).toHaveProperty("title", "Sample Ontology");
    spy.mockRestore();
  });

  test("main with --serve calls serveWebInterface", () => {
    const spy = vi.spyOn(console, "log");
    main(["--serve"]);
    expect(spy).toHaveBeenCalledWith("Starting web server on port 8080...");
    spy.mockRestore();
  });

  test("main with --diagnostics calls diagnostics", () => {
    const spy = vi.spyOn(console, "log");
    main(["--diagnostics"]);
    expect(spy).toHaveBeenCalledWith("Diagnostics:");
    spy.mockRestore();
  });

  test("main with --integrate returns integrated ontology", () => {
    const spy = vi.spyOn(console, "log");
    const integrated = main(["--integrate"]);
    expect(spy).toHaveBeenCalledWith("Ontology integrated:", integrated);
    expect(integrated).toHaveProperty("integrated", true);
    expect(integrated).toHaveProperty("integratedWith");
    spy.mockRestore();
  });

  test("main with --crawl returns crawled data", () => {
    const spy = vi.spyOn(console, "log");
    const crawled = main(["--crawl"]);
    expect(spy).toHaveBeenCalledWith("Public data crawled:", crawled);
    expect(crawled).toHaveProperty("source", "PublicDataSource");
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
    const spy = vi.spyOn(console, "log");
    serveWebInterface();
    expect(spy).toHaveBeenCalledWith("Starting web server on port 8080...");
    spy.mockRestore();
  });

  test("displayHelp prints the correct usage message", () => {
    const spy = vi.spyOn(console, "log");
    displayHelp();
    expect(spy).toHaveBeenCalledWith("Usage: node src/lib/main.js [options]");
    expect(spy).toHaveBeenCalledWith("Options: --help, --build, --serve, --diagnostics, --integrate, --crawl");
    spy.mockRestore();
  });

  test("diagnostics logs Node.js version and platform", () => {
    const spy = vi.spyOn(console, "log");
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
});

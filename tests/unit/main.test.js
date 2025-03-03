import { describe, test, expect, vi } from "vitest";
import {
  main,
  buildOntology,
  serveWebInterface,
  displayHelp
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
    expect(spy).toHaveBeenCalledWith("Usage: node src/lib/main.js [options\nOptions: --help, --build, --serve");
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
    expect(spy).toHaveBeenCalledWith("Usage: node src/lib/main.js [options\nOptions: --help, --build, --serve");
    spy.mockRestore();
  });
});

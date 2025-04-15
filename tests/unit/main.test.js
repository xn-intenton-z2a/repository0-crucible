import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import fs from "fs";


describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Query OWL Option", () => {
  test("should output sample OWL query result when no additional parameter is provided", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--query-owl"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Sample OWL query output" }));
    logSpy.mockRestore();
  });
});

describe("Dynamic Query OWL Option", () => {
  test("should output dynamic OWL query result for provided query", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--query-owl", "cities"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "OWL query output for query: cities" }));
    logSpy.mockRestore();
  });
});

describe("Transform Option", () => {
  test("should output transformed ontology for valid JSON input", () => {
    const logSpy = vi.spyOn(console, "log");
    const jsonInput = JSON.stringify({ data: "example" });
    main(["--transform", jsonInput]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ "owl:transformed": { data: "example" } }));
    logSpy.mockRestore();
  });

  test("should output default transformed ontology output when provided invalid JSON", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--transform", "not-a-json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Default OWL transformation output" }));
    logSpy.mockRestore();
  });

  test("should output default transformed ontology output when no additional parameter is provided", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--transform"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Default OWL transformation output" }));
    logSpy.mockRestore();
  });
});

describe("Crawl Option", () => {
  test("should output simulated OWL ontology from crawl command", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--crawl"]);
    const output = logSpy.mock.calls[0][0];
    const parsedOutput = JSON.parse(output);
    expect(parsedOutput).toHaveProperty("owl:ontology");
    expect(parsedOutput["owl:ontology"]).toHaveProperty("source", "public");
    logSpy.mockRestore();
  });
});

describe("Diagnostics Option", () => {
  test("should output environment diagnostic info", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--diagnostics"]);
    const output = logSpy.mock.calls[0][0];
    const parsedOutput = JSON.parse(output);
    expect(parsedOutput).toHaveProperty("nodeVersion", process.version);
    expect(parsedOutput).toHaveProperty("platform", process.platform);
    expect(parsedOutput).toHaveProperty("currentWorkingDirectory", process.cwd());
    logSpy.mockRestore();
  });
});

describe("Save Ontology Option", () => {
  test("should save ontology to specified file and output confirmation message", () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log");
    main(["--save-ontology", "myOntology.json"]);
    const ontology = mainModule.crawlDataSources();
    expect(writeFileSyncSpy).toHaveBeenCalledWith("myOntology.json", JSON.stringify(ontology, null, 2));
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Ontology saved to myOntology.json" }));
    writeFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should default to 'ontology.json' when no filename is provided", () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log");
    main(["--save-ontology"]);
    const ontology = mainModule.crawlDataSources();
    expect(writeFileSyncSpy).toHaveBeenCalledWith("ontology.json", JSON.stringify(ontology, null, 2));
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Ontology saved to ontology.json" }));
    writeFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("Data Sources Option", () => {
  test("should output a hard-coded list of public data source URLs", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--data-sources"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ dataSources: ["https://example.com/api1", "https://example.com/api2"] }));
    logSpy.mockRestore();
  });
});

import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, crawlDataSources } from "@src/lib/main.js";
import fs from "fs";
import { get } from "http";

// Existing tests...

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", async () => {
    process.argv = ["node", "src/lib/main.js"];
    await main();
  });
});

describe("Help Option", () => {
  test("should output help instructions", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--help"]);
    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output).toHaveProperty("usage");
    expect(output).toHaveProperty("options");
    logSpy.mockRestore();
  });
});

describe("Version Option", () => {
  test("should output tool version from package.json", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--version"]);
    // Assuming version in package.json is 1.1.0-0 as per dependencies file
    expect(logSpy.mock.calls[0][0]).toEqual(JSON.stringify({ version: "1.1.0-0" }, null, 2));
    logSpy.mockRestore();
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
    const ontology = crawlDataSources();
    expect(writeFileSyncSpy).toHaveBeenCalledWith("myOntology.json", JSON.stringify(ontology, null, 2));
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Ontology saved to myOntology.json" }));
    writeFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should default to 'ontology.json' when no filename is provided", () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log");
    main(["--save-ontology"]);
    const ontology = crawlDataSources();
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

describe("Merge Persist Option", () => {
  test("should merge two ontology files and save to specified file", () => {
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      if (filePath === "ontology1.json") {
        return JSON.stringify({
          "owl:ontology": {
            source: "public1",
            description: "First ontology",
            data: [{ id: 1, info: "Data1" }]
          }
        });
      }
      if (filePath === "ontology2.json") {
        return JSON.stringify({
          "owl:ontology": {
            source: "public2",
            description: "Second ontology",
            data: [{ id: 2, info: "Data2" }]
          }
        });
      }
      return '';
    });
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log");
    main(["--merge-persist", "ontology1.json", "ontology2.json", "merged.json"]);
    const expectedMerged = {
      "owl:ontology": {
        source: "public1; public2",
        description: "Merged ontology: First ontology | Second ontology",
        data: [{ id: 1, info: "Data1" }, { id: 2, info: "Data2" }]
      }
    };
    expect(writeFileSyncSpy).toHaveBeenCalledWith("merged.json", JSON.stringify(expectedMerged, null, 2));
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Ontology merged and saved to merged.json" }));
    readFileSyncSpy.mockRestore();
    writeFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should merge two ontology files and save to default file", () => {
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      if (filePath === "ontology1.json") {
        return JSON.stringify({
          "owl:ontology": {
            source: "public1",
            description: "First ontology",
            data: [{ id: 1, info: "Data1" }]
          }
        });
      }
      if (filePath === "ontology2.json") {
        return JSON.stringify({
          "owl:ontology": {
            source: "public2",
            description: "Second ontology",
            data: [{ id: 2, info: "Data2" }]
          }
        });
      }
      return '';
    });
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log");
    main(["--merge-persist", "ontology1.json", "ontology2.json"]);
    const expectedMerged = {
      "owl:ontology": {
        source: "public1; public2",
        description: "Merged ontology: First ontology | Second ontology",
        data: [{ id: 1, info: "Data1" }, { id: 2, info: "Data2" }]
      }
    };
    expect(writeFileSyncSpy).toHaveBeenCalledWith("merged-ontology.json", JSON.stringify(expectedMerged, null, 2));
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Ontology merged and saved to merged-ontology.json" }));
    readFileSyncSpy.mockRestore();
    writeFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should output error for insufficient arguments", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--merge-persist", "onlyone.json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: Insufficient arguments for merge-persist. Two ontology file paths required." }));
    logSpy.mockRestore();
  });

  test("should output error when input file doesn't contain 'owl:ontology'", () => {
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation(() => {
      return JSON.stringify({ notOntology: {} });
    });
    const logSpy = vi.spyOn(console, "log");
    main(["--merge-persist", "ontology1.json", "ontology2.json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: One or both input files do not contain 'owl:ontology' property." }));
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("Filter Data Option", () => {
  test("should filter ontology data with valid key and value", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--filter-data", "info", "Sample data entry"]);
    const ontology = crawlDataSources();
    const filteredData = ontology["owl:ontology"].data.filter(entry => entry.info === "Sample data entry");
    const expectedOntology = { "owl:ontology": { ...ontology["owl:ontology"], data: filteredData } };
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(expectedOntology));
    logSpy.mockRestore();
  });

  test("should output error when filter key parameter is missing", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--filter-data"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: Missing filter key parameter for --filter-data" }));
    logSpy.mockRestore();
  });

  test("should output error when filter value parameter is missing", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--filter-data", "info"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: Missing filter value parameter for --filter-data" }));
    logSpy.mockRestore();
  });
});

describe("Validate Ontology Option", () => {
  test("should output valid message for a correct ontology JSON", () => {
    const validOntology = {
      "owl:ontology": {
        source: "public",
        description: "A valid ontology",
        data: [{ id: 1 }]
      }
    };
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      if (filePath === "validOntology.json") {
        return JSON.stringify(validOntology);
      }
      return '';
    });
    const logSpy = vi.spyOn(console, "log");
    main(["--validate-ontology", "validOntology.json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Ontology structure is valid" }));
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should output error when file path is missing", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--validate-ontology"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: Missing ontology file path argument for --validate-ontology" }));
    logSpy.mockRestore();
  });

  test("should output error for invalid JSON", () => {
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      return "not-a-json";
    });
    const logSpy = vi.spyOn(console, "log");
    main(["--validate-ontology", "invalid.json"]);
    expect(logSpy.mock.calls[0][0]).toContain("Error:");
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should output error when ontology property is missing", () => {
    const invalidOntology = { notOntology: {} };
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      if (filePath === "missingOntology.json") return JSON.stringify(invalidOntology);
      return '';
    });
    const logSpy = vi.spyOn(console, "log");
    main(["--validate-ontology", "missingOntology.json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: Ontology JSON does not contain a valid 'owl:ontology' property." }));
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should output error when property types are incorrect", () => {
    const invalidOntology = {
      "owl:ontology": {
        source: 123,
        description: true,
        data: "not-an-array"
      }
    };
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      return JSON.stringify(invalidOntology);
    });
    const logSpy = vi.spyOn(console, "log");
    main(["--validate-ontology", "wrongTypes.json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: 'source' property must be a string." }));
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("Ontology Info Option", () => {
  test("should output ontology summary for valid ontology file", () => {
    const validOntology = {
      "owl:ontology": {
        source: "public",
        description: "Test ontology",
        data: [{ a: 1 }, { a: 2 }],
        timestamp: "2023-10-10T10:10:10Z"
      }
    };
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      if (filePath === "validOntology.json") return JSON.stringify(validOntology);
      return "";
    });
    const logSpy = vi.spyOn(console, "log");
    main(["--ontology-info", "validOntology.json"]);
    const expectedOutput = {
      ontologyInfo: {
        source: "public",
        description: "Test ontology",
        totalDataEntries: 2,
        timestamp: "2023-10-10T10:10:10Z"
      }
    };
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(expectedOutput));
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should output error when file path is missing for --ontology-info", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--ontology-info"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: Missing ontology file path argument for --ontology-info" }));
    logSpy.mockRestore();
  });

  test("should output error for invalid JSON in ontology file", () => {
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation(() => "not-a-json");
    const logSpy = vi.spyOn(console, "log");
    main(["--ontology-info", "invalid.json"]);
    expect(logSpy.mock.calls[0][0]).toContain("Error:");
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should output error when ontology file is missing required properties", () => {
    const invalidOntology = { "owl:ontology": { source: 123, description: true, data: "not-an-array" } };
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync").mockImplementation((filePath) => {
      if (filePath === "badOntology.json") return JSON.stringify(invalidOntology);
      return "";
    });
    const logSpy = vi.spyOn(console, "log");
    main(["--ontology-info", "badOntology.json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ error: "Error: Ontology file does not have valid source, description or data properties." }));
    readFileSyncSpy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("Serve Option", () => {
  test("should start HTTP server and serve ontology", async () => {
    // Start the server
    main(["--serve"]);
    // Wait for server to initialize
    await new Promise(resolve => setTimeout(resolve, 200));

    const responseData = await new Promise((resolve, reject) => {
      get("http://localhost:3000/ontology", (res) => {
        let data = "";
        res.on("data", chunk => data += chunk);
        res.on("end", () => resolve(data));
      }).on("error", reject);
    });

    const parsed = JSON.parse(responseData);
    expect(parsed).toHaveProperty("owl:ontology");

    // Close the server instance
    if (mainModule.serverInstance && typeof mainModule.serverInstance.close === 'function') {
      mainModule.serverInstance.close();
    }
  });
});

describe("Export RDF Option", () => {
  test("should output RDF/XML representation of ontology", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--export-rdf"]);
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(output).toContain('<owl:Ontology>');
    expect(output).toContain('<source>public</source>');
    expect(output).toContain('<description>Simulated crawling of public data sources</description>');
    expect(output).toContain('<entry>');
    logSpy.mockRestore();
  });
});

describe("Export Turtle Option", () => {
  test("should output Turtle representation of ontology", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--export-turtle"]);
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain("@prefix ex:");
    expect(output).toContain("ex:Ontology");
    expect(output).toContain('ex:source "public"');
    expect(output).toContain('ex:description "Simulated crawling of public data sources"');
    logSpy.mockRestore();
  });
});

describe("Export JSONLD Option", () => {
  test("should output valid JSON-LD representation of ontology", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--export-jsonld"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("@context");
    expect(parsed).toHaveProperty("@type", "Ontology");
    const ontology = crawlDataSources()["owl:ontology"];
    expect(parsed).toHaveProperty("source", ontology.source);
    expect(parsed).toHaveProperty("description", ontology.description);
    expect(parsed).toHaveProperty("data", ontology.data);
    logSpy.mockRestore();
  });
});

describe("Export CSV Option", () => {
  test("should output CSV representation of ontology", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--export-csv"]);
    const output = logSpy.mock.calls[0][0];
    const lines = output.trim().split("\n");
    // For the simulated ontology the keys are id and info sorted alphabetically
    expect(lines[0]).toBe("id,info");
    expect(lines[1]).toBe("\"1\",\"Sample data entry\"");
    logSpy.mockRestore();
  });
});

describe("Export YAML Option", () => {
  test("should output YAML representation of ontology", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--export-yaml"]);
    const output = logSpy.mock.calls[0][0];
    // Check that output contains YAML keys
    expect(output).toContain("source: public");
    expect(output).toContain("description: Simulated crawling of public data sources");
    logSpy.mockRestore();
  });
});

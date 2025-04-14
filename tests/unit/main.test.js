import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import {
  main,
  query,
  diagnostics,
  crawlData,
  generateCapitalCitiesOwl,
  serve,
  buildEnhancedOntology,
  buildIntermediateOntology,
  displayHelp,
  refresh,
  mergePersist,
  validateOntology
} from "@src/lib/main.js";
import fs from "fs";
import os from "os";
import path from "path";

// Existing test suites

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main([]);
  });
});

describe("Query Command Output", () => {
  test("should log placeholder query message when no extra terms provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js", "--query"];
    query(["--query"]);
    expect(logSpy).toHaveBeenCalledWith("Querying OWL ontologies (Feature under development)");
    logSpy.mockRestore();
  });

  test("should log detailed query message when search terms are provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const searchArgs = ["--query", "capital", "cities"];
    query(searchArgs);
    expect(logSpy).toHaveBeenCalledWith("Querying OWL ontologies for: capital cities");
    logSpy.mockRestore();
  });

  test("should log filter object when a key=value pair is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "country=USA"]);
    expect(logSpy).toHaveBeenCalledWith('Querying OWL ontologies with filters: {"country":"USA"}');
    logSpy.mockRestore();
  });

  test("should log both search terms and filters when both are provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "capital", "cities", "country=USA"]);
    expect(logSpy).toHaveBeenCalledWith('Querying OWL ontologies for: capital cities with filters: {"country":"USA"}');
    logSpy.mockRestore();
  });
});

describe("Query Command JSON Output", () => {
  test("should output JSON object with only search terms", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--json", "capital", "cities"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("searchTerms");
    expect(parsed).toHaveProperty("filters");
    expect(parsed.searchTerms).toEqual(["capital", "cities"]);
    expect(parsed.filters).toEqual({});
    expect(parsed).toHaveProperty("regex", false);
    expect(parsed).toHaveProperty("fuzzy", false);
    logSpy.mockRestore();
  });

  test("should output JSON object with only filters", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--json", "country=USA"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.searchTerms).toEqual([]);
    expect(parsed.filters).toEqual({ country: "USA" });
    expect(parsed).toHaveProperty("regex", false);
    expect(parsed).toHaveProperty("fuzzy", false);
    logSpy.mockRestore();
  });

  test("should output JSON object with both search terms and filters", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--json", "capital", "cities", "country=USA"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.searchTerms).toEqual(["capital", "cities"]);
    expect(parsed.filters).toEqual({ country: "USA" });
    expect(parsed).toHaveProperty("regex", false);
    expect(parsed).toHaveProperty("fuzzy", false);
    logSpy.mockRestore();
  });
});

describe("Query Command Regex Option", () => {
  test("should output JSON object with regex property true when '--regex' flag is provided along with '--json'", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--json", "--regex", "capital", "cities", "country=USA"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.searchTerms).toEqual(["capital", "cities", "country=USA"].filter(term => !term.includes('=')));
    expect(parsed.filters).toEqual({ country: "USA" });
    expect(parsed).toHaveProperty("regex", true);
    logSpy.mockRestore();
  });

  test("should log message with regex indication when '--regex' flag is provided without '--json'", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--regex", "capital", "cities", "country=USA"]);
    const callArgs = logSpy.mock.calls[0][0];
    expect(callArgs).toContain("with regex");
    logSpy.mockRestore();
  });
});

describe("Query Command Fuzzy Option", () => {
  test("should output JSON object with fuzzy property true when '--fuzzy' flag is provided along with '--json'", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--json", "--fuzzy", "capital", "cities", "country=USA"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.fuzzy).toBe(true);
    logSpy.mockRestore();
  });

  test("should log message with fuzzy search indication when '--fuzzy' flag is provided without '--json'", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--fuzzy", "capital", "cities", "country=USA"]);
    const callArgs = logSpy.mock.calls[0][0];
    expect(callArgs).toContain("fuzzy search");
    logSpy.mockRestore();
  });
});

describe("Diagnostics Command Output", () => {
  test("should log diagnostics info", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--diagnostics"];
    diagnostics(args);
    expect(logSpy).toHaveBeenCalledWith("System Diagnostics:");
    expect(logSpy).toHaveBeenCalledWith(`Node.js version: ${process.version}`);
    logSpy.mockRestore();
  });

  test("should output diagnostics in JSON when '--json' flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    diagnostics(["--diagnostics", "--json"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("nodeVersion", process.version);
    expect(parsed).toHaveProperty("platform");
    expect(parsed).toHaveProperty("memoryUsage");
    logSpy.mockRestore();
  });
});

describe("Crawl Command Output", () => {
  test("should log crawl message when no simulate flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--crawl"];
    crawlData(args);
    expect(logSpy).toHaveBeenCalledWith("Crawling data from public sources...");
    logSpy.mockRestore();
  });
});

describe("Crawl Command Simulated Data Output", () => {
  test("should output simulated JSON data when '--simulate' flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    crawlData(["--crawl", "--simulate"]);
    const output = logSpy.mock.calls[0][0];
    let parsed;
    expect(() => {
      parsed = JSON.parse(output);
    }).not.toThrow();
    expect(parsed).toEqual({
      data: [
        { city: "SimCity", country: "SimCountry" },
        { city: "Testopolis", country: "Testland" }
      ]
    });
    logSpy.mockRestore();
  });
});

describe("Capital Cities Command Output", () => {
  test("should output valid JSON representing an OWL ontology of capital cities", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    generateCapitalCitiesOwl(["--capital-cities"]);
    expect(logSpy).toHaveBeenCalled();
    const outputCall = logSpy.mock.calls.find(call => {
      try {
        JSON.parse(call[0]);
        return true;
      } catch (e) {
        return false;
      }
    });
    const output = outputCall[0];
    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("type", "owl");
    expect(parsed).toHaveProperty("capitals");
    expect(Array.isArray(parsed.capitals)).toBe(true);
    expect(parsed.capitals.length).toBeGreaterThanOrEqual(3);
    parsed.capitals.forEach(cityObj => {
      expect(cityObj).toHaveProperty("city");
      expect(cityObj).toHaveProperty("country");
    });
    logSpy.mockRestore();
  });
});

describe("Capital Cities Command Sorted Output", () => {
  test("should output sorted capitals when '--sort' flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    generateCapitalCitiesOwl(["--capital-cities", "--sort"]);
    const outputCall = logSpy.mock.calls.find(call => {
      try {
        JSON.parse(call[0]);
        return true;
      } catch (e) {
        return false;
      }
    });
    expect(outputCall).toBeDefined();
    const output = outputCall[0];
    const parsed = JSON.parse(output);
    const expected = [
      { city: "London", country: "UK" },
      { city: "Tokyo", country: "Japan" },
      { city: "Washington, D.C.", country: "USA" }
    ];
    expect(parsed.capitals).toEqual(expected);
    logSpy.mockRestore();
  });
});

describe("Serve Command Output", () => {
  test("should start REST API server and respond with expected JSON", async () => {
    const server = serve(["--serve"]);
    await new Promise(resolve => setTimeout(resolve, 100));
    const response = await fetch("http://localhost:3000/");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("message", "owl-builder REST API");
    server.close();
  });
});

describe("Build Enhanced Ontology Command Output", () => {
  test("should log enhanced ontology build success message and valid JSON", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const enhancedArgs = ["--build-enhanced"];
    buildEnhancedOntology(enhancedArgs);
    const output = logSpy.mock.calls.find(call => call[0].includes("Enhanced ontology built and validated:"))[0];
    expect(output).toContain("Enhanced ontology built and validated:");

    const jsonStart = output.indexOf('{');
    expect(jsonStart).toBeGreaterThan(-1);
    const jsonPart = output.substring(jsonStart);
    let parsed;
    expect(() => {
      parsed = JSON.parse(jsonPart);
    }).not.toThrow();
    expect(parsed).toHaveProperty("type", "owl");
    expect(parsed).toHaveProperty("capitals");
    expect(Array.isArray(parsed.capitals)).toBe(true);
    logSpy.mockRestore();
  });

  test("should persist enhanced ontology to file when --persist flag is provided", () => {
    const tmpDir = os.tmpdir();
    const tempFilePath = path.join(tmpDir, 'temp-ontology.json');
    const args = ["--build-enhanced", "--persist", tempFilePath];
    buildEnhancedOntology(args);
    const fileContent = fs.readFileSync(tempFilePath, { encoding: 'utf8' });
    let parsed;
    expect(() => {
      parsed = JSON.parse(fileContent);
    }).not.toThrow();
    expect(parsed).toHaveProperty("type", "owl");
    expect(parsed).toHaveProperty("capitals");
    expect(Array.isArray(parsed.capitals)).toBe(true);
    fs.unlinkSync(tempFilePath);
  });

  test("should output CSV when --export-csv flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--build-enhanced", "--export-csv"];
    buildEnhancedOntology(args);
    const output = logSpy.mock.calls[0][0];
    // Check that the output starts with CSV header
    expect(output.startsWith("city,country")).toBe(true);
    // Check that there are three lines (header + 3 capitals)
    const lines = output.split("\n");
    expect(lines.length).toBe(4);
    expect(lines[1]).toContain("Washington, D.C.");
    expect(lines[2]).toContain("London");
    expect(lines[3]).toContain("Tokyo");
    logSpy.mockRestore();
  });

  test("should persist CSV to file when --export-csv and --persist flags are provided", () => {
    const tmpDir = os.tmpdir();
    const tempFilePath = path.join(tmpDir, 'temp-ontology.csv');
    const args = ["--build-enhanced", "--export-csv", "--persist", tempFilePath];
    buildEnhancedOntology(args);
    const fileContent = fs.readFileSync(tempFilePath, { encoding: 'utf8' });
    // Check that the file content is CSV formatted
    expect(fileContent.startsWith("city,country")).toBe(true);
    const lines = fileContent.split("\n");
    expect(lines.length).toBe(4);
    fs.unlinkSync(tempFilePath);
  });
});

describe("Build Intermediate Ontology Command Output", () => {
  test("should log intermediate ontology build message and valid JSON", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const intermediateArgs = ["--build-intermediate"];
    buildIntermediateOntology(intermediateArgs);
    const output = logSpy.mock.calls.find(call => call[0].startsWith("Intermediate ontology built:"))[0];
    expect(output.startsWith("Intermediate ontology built:")).toBe(true);
    const jsonPart = output.replace("Intermediate ontology built: ", "");
    let parsed;
    expect(() => {
      parsed = JSON.parse(jsonPart);
    }).not.toThrow();
    expect(parsed).toHaveProperty("type", "owl");
    expect(parsed).toHaveProperty("capitals");
    expect(Array.isArray(parsed.capitals)).toBe(true);
    logSpy.mockRestore();
  });
});

describe("Refresh Command Output", () => {
  test("should log refreshed ontology message with valid JSON", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    refresh(["--refresh"]);
    const output = logSpy.mock.calls.find(call => call[0].includes("Refreshed ontology:"))[0];
    expect(output).toContain("Refreshed ontology:");
    const jsonStart = output.indexOf('{');
    expect(jsonStart).toBeGreaterThan(-1);
    const jsonPart = output.substring(jsonStart);
    let parsed;
    expect(() => { parsed = JSON.parse(jsonPart); }).not.toThrow();
    expect(parsed).toHaveProperty("type", "owl");
    expect(parsed).toHaveProperty("capitals");
    expect(Array.isArray(parsed.capitals)).toBe(true);
    logSpy.mockRestore();
  });
});

describe("Merge Persist Command Output", () => {
  test("should log merge persist message when '--merge-persist' flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mergePersist(["--merge-persist"]);
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain("owl");
    logSpy.mockRestore();
  });

  test("should correctly merge persisted and new ontology capitals", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const tmpDir = os.tmpdir();
    const tempPersistFile = path.join(tmpDir, 'persisted-ontology.json');
    const persistedData = {
      type: "owl",
      capitals: [
        { city: "Washington, D.C.", country: "USA" },
        { city: "London", country: "UK" }
      ]
    };
    fs.writeFileSync(tempPersistFile, JSON.stringify(persistedData, null, 2));
    mergePersist(["--merge-persist", "--persist", tempPersistFile]);
    const outputCall = logSpy.mock.calls.find(call => {
      try {
        const parsed = JSON.parse(call[0]);
        return parsed.type === "owl" && Array.isArray(parsed.capitals);
      } catch (e) { return false; }
    });
    expect(outputCall).toBeDefined();
    const mergedOntology = JSON.parse(outputCall[0]);
    const expectedCities = ["Washington, D.C.", "London", "Paris", "Berlin", "Tokyo"];
    const mergedCities = mergedOntology.capitals.map(item => item.city).sort();
    expect(mergedCities).toEqual(expectedCities.sort());
    fs.unlinkSync(tempPersistFile);
    logSpy.mockRestore();
  });

  test("should persist merged ontology to file when '--out' flag is provided", () => {
    const tmpDir = os.tmpdir();
    const tempPersistFile = path.join(tmpDir, 'persisted-ontology.json');
    const tempOutFile = path.join(tmpDir, 'merged-ontology.json');
    const persistedData = {
      type: "owl",
      capitals: [
        { city: "Rome", country: "Italy" }
      ]
    };
    fs.writeFileSync(tempPersistFile, JSON.stringify(persistedData, null, 2));
    mergePersist(["--merge-persist", "--persist", tempPersistFile, "--out", tempOutFile]);
    const fileContent = fs.readFileSync(tempOutFile, "utf8");
    const mergedOntology = JSON.parse(fileContent);
    const expectedCities = ["Rome", "Paris", "Berlin", "Tokyo"];
    const mergedCities = mergedOntology.capitals.map(item => item.city).sort();
    expect(mergedCities).toEqual(expectedCities.sort());
    fs.unlinkSync(tempPersistFile);
    fs.unlinkSync(tempOutFile);
  });

  test("should prefer persisted data when --prefer-old flag is used", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const tmpDir = os.tmpdir();
    const tempPersistFile = path.join(tmpDir, 'persisted-ontology-prefer-old.json');
    // Persisted ontology has a duplicate with different data
    const persistedData = {
      type: "owl",
      capitals: [
        { city: "Paris", country: "Old" },
        { city: "London", country: "UK" }
      ]
    };
    fs.writeFileSync(tempPersistFile, JSON.stringify(persistedData, null, 2));

    mergePersist(["--merge-persist", "--prefer-old", "--persist", tempPersistFile]);
    const outputCall = logSpy.mock.calls.find(call => {
      try {
        const parsed = JSON.parse(call[0]);
        return parsed.type === "owl" && Array.isArray(parsed.capitals);
      } catch (e) { return false; }
    });
    expect(outputCall).toBeDefined();
    const mergedOntology = JSON.parse(outputCall[0]);
    const expectedCapitals = [
      { city: "London", country: "UK" },
      { city: "Paris", country: "Old" },
      { city: "Berlin", country: "Germany" },
      { city: "Tokyo", country: "Japan" }
    ];
    const sortFn = (a, b) => a.city.localeCompare(b.city);
    expect(mergedOntology.capitals.sort(sortFn)).toEqual(expectedCapitals.sort(sortFn));
    fs.unlinkSync(tempPersistFile);
    logSpy.mockRestore();
  });

  test("should sort merged ontology capitals when '--sort-merged' flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const tmpDir = os.tmpdir();
    const tempPersistFile = path.join(tmpDir, 'persisted-ontology-sort.json');
    const persistedData = {
      type: "owl",
      capitals: [
        { city: "Tokyo", country: "Japan" },
        { city: "Berlin", country: "Germany" }
      ]
    };
    fs.writeFileSync(tempPersistFile, JSON.stringify(persistedData, null, 2));
    // New ontology capitals: Paris and London; merged result unsorted would be Tokyo, Berlin, Paris, London
    mergePersist(["--merge-persist", "--persist", tempPersistFile, "--sort-merged"]);
    const outputCall = logSpy.mock.calls.find(call => {
      try {
        const parsed = JSON.parse(call[0]);
        return parsed.type === "owl" && Array.isArray(parsed.capitals);
      } catch (e) { return false; }
    });
    expect(outputCall).toBeDefined();
    const mergedOntology = JSON.parse(outputCall[0]);
    const mergedCities = mergedOntology.capitals.map(item => item.city);
    const expectedSortedCities = [...mergedCities].sort((a, b) => a.localeCompare(b));
    expect(mergedCities).toEqual(expectedSortedCities);
    fs.unlinkSync(tempPersistFile);
    logSpy.mockRestore();
  });

  test("should persist sorted merged ontology to file when '--sort-merged' flag is provided along with '--out' flag", () => {
    const tmpDir = os.tmpdir();
    const tempPersistFile = path.join(tmpDir, 'persisted-ontology-sort-out.json');
    const tempOutFile = path.join(tmpDir, 'merged-ontology-sorted.json');
    const persistedData = {
      type: "owl",
      capitals: [
        { city: "Rome", country: "Italy" }
      ]
    };
    fs.writeFileSync(tempPersistFile, JSON.stringify(persistedData, null, 2));
    mergePersist(["--merge-persist", "--persist", tempPersistFile, "--out", tempOutFile, "--sort-merged"]);
    const fileContent = fs.readFileSync(tempOutFile, "utf8");
    const mergedOntology = JSON.parse(fileContent);
    const mergedCities = mergedOntology.capitals.map(item => item.city);
    const expectedSortedCities = [...mergedCities].sort((a, b) => a.localeCompare(b));
    expect(mergedCities).toEqual(expectedSortedCities);
    fs.unlinkSync(tempPersistFile);
    fs.unlinkSync(tempOutFile);
  });

  // New tests for error handling in mergePersist
  test("should log error if persisted file does not exist", () => {
    const logSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fakePath = path.join(os.tmpdir(), 'nonexistent.json');
    mergePersist(["--merge-persist", "--persist", fakePath]);
    expect(logSpy).toHaveBeenCalledWith(`Persisted ontology file not found at path: ${fakePath}`);
    logSpy.mockRestore();
  });

  test("should log error for invalid JSON in persisted file", () => {
    const logSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const tmpDir = os.tmpdir();
    const invalidFile = path.join(tmpDir, 'invalid-ontology.json');
    fs.writeFileSync(invalidFile, "{ invalid json }");
    mergePersist(["--merge-persist", "--persist", invalidFile]);
    const errorLogged = logSpy.mock.calls.some(call => call[0].includes('Invalid JSON in persisted ontology file'));
    expect(errorLogged).toBe(true);
    fs.unlinkSync(invalidFile);
    logSpy.mockRestore();
  });
});

describe("Validate Ontology Command", () => {
  test("should confirm valid ontology file", () => {
    const tmpDir = os.tmpdir();
    const validFile = path.join(tmpDir, 'valid-ontology.json');
    const validOntology = {
      type: "owl",
      capitals: [
        { city: "Washington, D.C.", country: "USA" },
        { city: "London", country: "UK" }
      ]
    };
    fs.writeFileSync(validFile, JSON.stringify(validOntology, null, 2));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    validateOntology(["--validate", validFile]);
    const output = logSpy.mock.calls.find(call => call[0].includes("Ontology validation successful:"));
    expect(output).toBeDefined();
    fs.unlinkSync(validFile);
    logSpy.mockRestore();
  });

  test("should log validation errors for invalid ontology file", () => {
    const tmpDir = os.tmpdir();
    const invalidFile = path.join(tmpDir, 'invalid-ontology.json');
    const invalidOntology = {
      type: "owl",
      capitals: "not an array"
    };
    fs.writeFileSync(invalidFile, JSON.stringify(invalidOntology, null, 2));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    validateOntology(["--validate", invalidFile]);
    const output = errorSpy.mock.calls.find(call => call[0].includes("Ontology validation failed:"));
    expect(output).toBeDefined();
    fs.unlinkSync(invalidFile);
    errorSpy.mockRestore();
  });

  test("should work with verbose flag in validateOntology", () => {
    const tmpDir = os.tmpdir();
    const validFile = path.join(tmpDir, 'valid-ontology-verbose.json');
    const validOntology = {
      type: "owl",
      capitals: [
        { city: "Tokyo", country: "Japan" }
      ]
    };
    fs.writeFileSync(validFile, JSON.stringify(validOntology, null, 2));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    validateOntology(["--validate", validFile, "--verbose"]);
    const verboseLog = logSpy.mock.calls.find(call => call[0].includes("Verbose mode enabled in validateOntology"));
    expect(verboseLog).toBeDefined();
    fs.unlinkSync(validFile);
    logSpy.mockRestore();
  });
});

describe("Verbose Flag Logging", () => {
  test("should log verbose debug message in main", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--verbose"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Verbose mode enabled in main"));
    logSpy.mockRestore();
  });

  test("should log verbose debug message in query", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--verbose", "test"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Verbose mode enabled in query"));
    logSpy.mockRestore();
  });

  test("should log verbose debug message in diagnostics", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    diagnostics(["--diagnostics", "--verbose"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Verbose mode enabled in diagnostics"));
    logSpy.mockRestore();
  });

  test("should log verbose debug message in crawlData", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    crawlData(["--crawl", "--verbose"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Verbose mode enabled in crawlData"));
    logSpy.mockRestore();
  });

  test("should log verbose debug message in buildEnhancedOntology", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    buildEnhancedOntology(["--build-enhanced", "--verbose"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Verbose mode enabled in buildEnhancedOntology"));
    logSpy.mockRestore();
  });
});

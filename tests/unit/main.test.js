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
  refresh
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
    logSpy.mockRestore();
  });

  test("should output JSON object with only filters", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--json", "country=USA"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.searchTerms).toEqual([]);
    expect(parsed.filters).toEqual({ country: "USA" });
    logSpy.mockRestore();
  });

  test("should output JSON object with both search terms and filters", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    query(["--query", "--json", "capital", "cities", "country=USA"]);
    const output = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.searchTerms).toEqual(["capital", "cities"]);
    expect(parsed.filters).toEqual({ country: "USA" });
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
});

describe("Crawl Command Output", () => {
  test("should log crawl message", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--crawl"];
    crawlData(args);
    expect(logSpy).toHaveBeenCalledWith("Crawling data from public sources...");
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
    // Read the file and verify its content
    const fileContent = fs.readFileSync(tempFilePath, { encoding: 'utf8' });
    let parsed;
    expect(() => {
      parsed = JSON.parse(fileContent);
    }).not.toThrow();
    expect(parsed).toHaveProperty("type", "owl");
    expect(parsed).toHaveProperty("capitals");
    expect(Array.isArray(parsed.capitals)).toBe(true);
    // Clean up temporary file
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

describe("Help Command Output", () => {
  test("should display help message with usage instructions", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    displayHelp(["--help"]);
    const helpOutput = logSpy.mock.calls.map(call => call[0]).join("\n");
    expect(helpOutput).toContain("Usage: ");
    expect(helpOutput).toContain("--help");
    expect(helpOutput).toContain("--diagnostics");
    expect(helpOutput).toContain("--query");
    expect(helpOutput).toContain("--crawl");
    expect(helpOutput).toContain("--capital-cities");
    expect(helpOutput).toContain("--serve");
    expect(helpOutput).toContain("--build-intermediate");
    expect(helpOutput).toContain("--build-enhanced");
    expect(helpOutput).toContain("--refresh");
    expect(helpOutput).toContain("--json");
    logSpy.mockRestore();
  });
});

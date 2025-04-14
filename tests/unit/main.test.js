import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, query, diagnostics, crawlData, generateCapitalCitiesOwl, serve } from "@src/lib/main.js";

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
    // Call the function directly with the --capital-cities flag
    generateCapitalCitiesOwl(["--capital-cities"]);
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
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
    // Wait a short time to ensure the server is running
    await new Promise(resolve => setTimeout(resolve, 100));
    const response = await fetch("http://localhost:3000/");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("message", "owl-builder REST API");
    server.close();
  });
});

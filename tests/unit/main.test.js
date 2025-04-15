import { describe, test, expect, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, serve } from "@src/lib/main.js";
import http from "http";
import fs from "fs";

// Utility function to clean up exported file if exists
const exportedFile = "exported_ontology.json";
const cleanupExportedFile = () => {
  if (fs.existsSync(exportedFile)) {
    fs.unlinkSync(exportedFile);
  }
};

// Utility function to capture console output
const captureOutput = (fn) => {
  let output = "";
  const originalLog = console.log;
  console.log = (msg) => { output += msg; };
  fn();
  console.log = originalLog;
  return output;
};

// Utility function to capture console error output
const captureError = (fn) => {
  let output = "";
  const originalError = console.error;
  console.error = (msg) => { output += msg + "\n"; };
  fn();
  console.error = originalError;
  return output;
};


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

describe("Capital Cities Option", () => {
  test("should output capitalCities OWL ontology JSON with generatedAt timestamp", () => {
    let output = captureOutput(() => { main(["--capital-cities"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("owl", "capitalCities");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data).toEqual([
      { country: "France", capital: "Paris" },
      { country: "Japan", capital: "Tokyo" },
      { country: "Brazil", capital: "Brasília" }
    ]);
    expect(parsed).toHaveProperty("generatedAt");
    const iso = new Date(parsed.generatedAt).toISOString();
    expect(iso).toEqual(parsed.generatedAt);
  });
});

describe("Diagnostics Option", () => {
  test("should output diagnostics JSON with required keys", () => {
    let output = captureOutput(() => { main(["--diagnostics"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("nodeVersion", process.versions.node);
    expect(parsed).toHaveProperty("platform", process.platform);
    expect(parsed).toHaveProperty("availableCommands");
    expect(Array.isArray(parsed.availableCommands)).toBe(true);
    expect(parsed.availableCommands).toEqual(
      expect.arrayContaining([
        "--capital-cities",
        "--diagnostics",
        "--serve",
        "--build-intermediate",
        "--build-enhanced",
        "--refresh"
      ])
    );
  });
});

describe("Debug Option", () => {
  test("should output enhanced debug diagnostics with required keys", () => {
    let output = captureOutput(() => { main(["--debug"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("nodeVersion", process.versions.node);
    expect(parsed).toHaveProperty("platform", process.platform);
    expect(parsed).toHaveProperty("availableCommands");
    expect(Array.isArray(parsed.availableCommands)).toBe(true);
    expect(parsed.availableCommands).toEqual(
      expect.arrayContaining([
        "--capital-cities",
        "--diagnostics",
        "--serve",
        "--build-intermediate",
        "--build-enhanced",
        "--refresh",
        "--merge-persist",
        "--crawl-data",
        "--help",
        "--help-json",
        "--export-ontology",
        "--build-detailed",
        "--validate-ontology",
        "--version",
        "--debug"
      ])
    );
    expect(parsed).toHaveProperty("currentWorkingDirectory", process.cwd());
    expect(parsed).toHaveProperty("debugEnv");
    expect(typeof parsed.debugEnv).toBe('object');
    // NODE_ENV might be undefined, so we check for its presence
    expect(parsed.debugEnv).toHaveProperty("NODE_ENV");
  });
});

describe("Serve Option", () => {
  test("should serve capitalCities ontology on /capital-cities endpoint", async () => {
    const server = serve();
    // Wait for the server to start listening
    await new Promise((resolve) => setTimeout(resolve, 100));

    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/capital-cities",
      method: "GET",
    };

    const responsePromise = new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => { resolve({ statusCode: res.statusCode, data }); });
      });
      req.on("error", reject);
      req.end();
    });

    const { statusCode, data } = await responsePromise;
    expect(statusCode).toBe(200);

    const parsed = JSON.parse(data);
    expect(parsed).toHaveProperty("owl", "capitalCities");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data).toEqual([
      { country: "France", capital: "Paris" },
      { country: "Japan", capital: "Tokyo" },
      { country: "Brazil", capital: "Brasília" }
    ]);
    expect(parsed).toHaveProperty("generatedAt");
    const iso = new Date(parsed.generatedAt).toISOString();
    expect(iso).toEqual(parsed.generatedAt);

    await new Promise((resolve) => server.close(resolve));
  });
});

describe("Crawl Data Option", () => {
  test("should output simulated crawl data JSON with fetchedAt timestamp", () => {
    let output = captureOutput(() => { main(["--crawl-data"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("source", "publicData");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data).toEqual([{ id: 1, description: "Sample data" }]);
    expect(parsed).toHaveProperty("fetchedAt");
    const iso = new Date(parsed.fetchedAt).toISOString();
    expect(iso).toEqual(parsed.fetchedAt);
  });
});

describe("Refresh Option", () => {
  test("should output refresh JSON with refreshedAt timestamp", () => {
    let output = captureOutput(() => { main(["--refresh"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("message", "Data refreshed");
    expect(parsed).toHaveProperty("refreshedAt");
    const iso = new Date(parsed.refreshedAt).toISOString();
    expect(iso).toEqual(parsed.refreshedAt);
  });
});

describe("Build Intermediate Option", () => {
  test("should output intermediate build JSON with builtAt timestamp", () => {
    let output = captureOutput(() => { main(["--build-intermediate"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("intermediateBuild", "Intermediate build completed");
    expect(parsed).toHaveProperty("builtAt");
    const iso = new Date(parsed.builtAt).toISOString();
    expect(iso).toEqual(parsed.builtAt);
  });
});

describe("Build Enhanced Option", () => {
  test("should output enhanced build JSON with builtAt timestamp", () => {
    let output = captureOutput(() => { main(["--build-enhanced"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("enhancedBuild", "Enhanced build completed");
    expect(parsed).toHaveProperty("builtAt");
    const iso = new Date(parsed.builtAt).toISOString();
    expect(iso).toEqual(parsed.builtAt);
  });
});

describe("Merge Persist Option", () => {
  test("should output merge persist JSON with mergedAt timestamp", () => {
    let output = captureOutput(() => { main(["--merge-persist"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("mergePersist", "Data merged and persisted successfully");
    expect(parsed).toHaveProperty("mergedAt");
    const iso = new Date(parsed.mergedAt).toISOString();
    expect(iso).toEqual(parsed.mergedAt);
  });
});

describe("Build Detailed Option", () => {
  test("should output detailed build JSON with keys for each build step", () => {
    let output = captureOutput(() => { main(["--build-detailed"]); });
    const parsed = JSON.parse(output);
    
    // Validate crawlData
    expect(parsed).toHaveProperty("crawlData");
    expect(parsed.crawlData).toHaveProperty("source", "publicData");
    expect(parsed.crawlData).toHaveProperty("data");
    expect(Array.isArray(parsed.crawlData.data)).toBe(true);
    expect(parsed.crawlData).toHaveProperty("fetchedAt");
    const iso1 = new Date(parsed.crawlData.fetchedAt).toISOString();
    expect(iso1).toEqual(parsed.crawlData.fetchedAt);

    // Validate refreshData
    expect(parsed).toHaveProperty("refreshData");
    expect(parsed.refreshData).toHaveProperty("message", "Data refreshed");
    expect(parsed.refreshData).toHaveProperty("refreshedAt");
    const iso2 = new Date(parsed.refreshData.refreshedAt).toISOString();
    expect(iso2).toEqual(parsed.refreshData.refreshedAt);

    // Validate intermediateBuild
    expect(parsed).toHaveProperty("intermediateBuild");
    expect(parsed.intermediateBuild).toHaveProperty("intermediateBuild", "Intermediate build completed");
    expect(parsed.intermediateBuild).toHaveProperty("builtAt");
    const iso3 = new Date(parsed.intermediateBuild.builtAt).toISOString();
    expect(iso3).toEqual(parsed.intermediateBuild.builtAt);

    // Validate enhancedBuild
    expect(parsed).toHaveProperty("enhancedBuild");
    expect(parsed.enhancedBuild).toHaveProperty("enhancedBuild", "Enhanced build completed");
    expect(parsed.enhancedBuild).toHaveProperty("builtAt");
    const iso4 = new Date(parsed.enhancedBuild.builtAt).toISOString();
    expect(iso4).toEqual(parsed.enhancedBuild.builtAt);

    // Validate mergePersist
    expect(parsed).toHaveProperty("mergePersist");
    expect(parsed.mergePersist).toHaveProperty("mergePersist", "Data merged and persisted successfully");
    expect(parsed.mergePersist).toHaveProperty("mergedAt");
    const iso5 = new Date(parsed.mergePersist.mergedAt).toISOString();
    expect(iso5).toEqual(parsed.mergePersist.mergedAt);
  });
});

describe("Unknown Option", () => {
  test("should output error message and usage when provided with an unknown option", () => {
    let output = captureError(() => { main(["--unknown"]); });
    expect(output).toMatch(/Error: Unknown option: --unknown/);
    expect(output).toMatch(/Usage: node src\/lib\/main.js \[options\]/);
  });
});

describe("Help JSON Option", () => {
  test("should output JSON formatted help message with 'usage' and 'options' keys", () => {
    let output = captureOutput(() => { main(["--help-json"]); });
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("usage", "Usage: node src/lib/main.js [options]");
    expect(parsed).toHaveProperty("options");
    expect(Array.isArray(parsed.options)).toBe(true);
    expect(parsed.options.every((option) => option.startsWith("--"))).toBe(true);
  });
});

describe("Help Extended Option", () => {
  test("should output extended help message containing detailed descriptions and usage examples", () => {
    let output = captureOutput(() => { main(["--help-extended"]); });
    expect(output).toMatch(/Extended Help:/);
    expect(output).toMatch(/--help-extended: Displays detailed help information/);
    expect(output).toMatch(/Example: node src\/lib\/main.js --help-extended/);
    expect(output).toMatch(/--capital-cities: Outputs the capital cities OWL ontology/);
    expect(output).toMatch(/--export-ontology: Exports the OWL ontology/);
  });
});

describe("Export Ontology Option", () => {
  afterEach(() => {
    cleanupExportedFile();
  });

  test("should export the OWL ontology to a file with proper content and confirmation message", () => {
    let output = captureOutput(() => { main(["--export-ontology"]); });
    expect(output).toContain("Ontology exported to exported_ontology.json");
    expect(fs.existsSync(exportedFile)).toBe(true);
    const fileContent = fs.readFileSync(exportedFile, "utf-8");
    const parsed = JSON.parse(fileContent);
    expect(parsed).toHaveProperty("owl", "capitalCities");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data).toEqual([
      { country: "France", capital: "Paris" },
      { country: "Japan", capital: "Tokyo" },
      { country: "Brazil", capital: "Brasília" }
    ]);
    expect(parsed).toHaveProperty("generatedAt");
    const iso = new Date(parsed.generatedAt).toISOString();
    expect(iso).toEqual(parsed.generatedAt);
  });
});

describe("Validate Ontology Option", () => {
  afterEach(() => {
    cleanupExportedFile();
  });

  test("should validate ontology successfully when a valid file exists", () => {
    main(["--export-ontology"]);
    let output = captureOutput(() => { main(["--validate-ontology"]); });
    expect(output).toContain("Ontology is valid");
  });

  test("should output error when ontology file is not found", () => {
    cleanupExportedFile();
    let output = captureError(() => { main(["--validate-ontology"]); });
    expect(output).toContain("Error: Exported ontology file 'exported_ontology.json' not found.");
  });
});

describe("Version Option", () => {
  test("should output version from package.json prefixed with 'Version:'", () => {
    let output = captureOutput(() => { main(["--version"]); });
    // Read package.json to verify the version
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    expect(output.trim()).toBe(`Version: ${pkg.version}`);
  });
});

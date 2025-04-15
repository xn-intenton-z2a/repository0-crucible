import { describe, test, expect, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, serve } from "@src/lib/main.js";
import http from "http";
import fs from "fs";

// Utility function to clean up exported file if exists
const exportedFile = 'exported_ontology.json';
const cleanupExportedFile = () => {
  if (fs.existsSync(exportedFile)) {
    fs.unlinkSync(exportedFile);
  }
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
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--capital-cities"]);

    console.log = originalLog;

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
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--diagnostics"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("nodeVersion", process.versions.node);
    expect(parsed).toHaveProperty("platform", process.platform);
    expect(parsed).toHaveProperty("availableCommands");
    expect(Array.isArray(parsed.availableCommands)).toBe(true);
    expect(parsed.availableCommands).toEqual(expect.arrayContaining([
      "--capital-cities",
      "--diagnostics",
      "--serve",
      "--crawl-data",
      "--refresh",
      "--build-intermediate"
    ]));
  });
});

describe("Serve Option", () => {
  test("should serve capitalCities ontology on /capital-cities endpoint", async () => {
    const server = serve();
    // Wait for the server to start listening
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/capital-cities',
      method: 'GET'
    };
    
    const responsePromise = new Promise((resolve, reject) => {
      const req = http.request(options, res => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, data });
        });
      });
      req.on('error', reject);
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
    
    await new Promise(resolve => server.close(resolve));
  });
});

describe("Crawl Data Option", () => {
  test("should output simulated crawl data JSON with fetchedAt timestamp", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--crawl-data"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("source", "publicData");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data).toEqual([
      { id: 1, description: "Sample data" }
    ]);
    expect(parsed).toHaveProperty("fetchedAt");
    const iso = new Date(parsed.fetchedAt).toISOString();
    expect(iso).toEqual(parsed.fetchedAt);
  });
});

describe("Refresh Option", () => {
  test("should output refresh JSON with refreshedAt timestamp", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--refresh"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("message", "Data refreshed");
    expect(parsed).toHaveProperty("refreshedAt");
    const iso = new Date(parsed.refreshedAt).toISOString();
    expect(iso).toEqual(parsed.refreshedAt);
  });
});

describe("Build Intermediate Option", () => {
  test("should output intermediate build JSON with builtAt timestamp", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--build-intermediate"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("intermediateBuild", "Intermediate build completed");
    expect(parsed).toHaveProperty("builtAt");
    const iso = new Date(parsed.builtAt).toISOString();
    expect(iso).toEqual(parsed.builtAt);
  });
});

describe("Merge Persist Option", () => {
  test("should output merge persist JSON with mergedAt timestamp", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--merge-persist"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("mergePersist", "Data merged and persisted successfully");
    expect(parsed).toHaveProperty("mergedAt");
    const iso = new Date(parsed.mergedAt).toISOString();
    expect(iso).toEqual(parsed.mergedAt);
  });
});

describe("Unknown Option", () => {
  test("should output error message and usage when provided with an unknown option", () => {
    let output = "";
    const originalError = console.error;
    console.error = (msg) => { output += msg + "\n"; };

    main(["--unknown"]);

    console.error = originalError;
    expect(output).toMatch(/Error: Unknown option: --unknown/);
    expect(output).toMatch(/Usage: node src\/lib\/main.js \[options\]/);
  });
});

describe("Help JSON Option", () => {
  test("should output JSON formatted help message with 'usage' and 'options' keys", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--help-json"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("usage", "Usage: node src/lib/main.js [options]");
    expect(parsed).toHaveProperty("options");
    expect(Array.isArray(parsed.options)).toBe(true);
    expect(parsed.options.every(option => option.startsWith("--"))).toBe(true);
  });
});

describe("Export Ontology Option", () => {
  afterEach(() => {
    cleanupExportedFile();
  });

  test("should export the OWL ontology to a file with proper content and confirmation message", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--export-ontology"]);

    console.log = originalLog;
    
    // Check confirmation message
    expect(output).toContain("Ontology exported to exported_ontology.json");
    
    // Read the exported file and verify contents
    expect(fs.existsSync(exportedFile)).toBe(true);
    const fileContent = fs.readFileSync(exportedFile, 'utf-8');
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

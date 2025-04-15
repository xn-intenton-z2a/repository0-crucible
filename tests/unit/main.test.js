import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, serve } from "@src/lib/main.js";
import http from "http";


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


describe("Unknown Option", () => {
  test("should output error message and usage when provided with an unknown option", () => {
    let output = "";
    const originalError = console.error;
    console.error = (msg) => { output += msg + "\n"; };

    main(["--unknown"]);

    console.error = originalError;
    expect(output).toMatch(/Error: Unknown option: --unknown/);
    expect(output).toMatch(/Usage: node src\\\/lib\\\/main.js \[options\]/);
  });
});

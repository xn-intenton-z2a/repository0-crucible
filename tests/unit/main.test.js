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
    // Verify that some expected commands are included
    expect(parsed.availableCommands).toEqual(expect.arrayContaining([
      "--capital-cities",
      "--diagnostics",
      "--serve",
      "--crawl-data"
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

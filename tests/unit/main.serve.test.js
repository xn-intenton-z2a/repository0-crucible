import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import { main, PUBLIC_DATA_SOURCES } from "../../src/lib/main.js";
import http from "http";
import { once } from "events";

describe("HTTP Server (--serve) Integration Tests", () => {
  let server;
  let port;
  const originalPort = process.env.PORT;
  const mockBinding = {
    country: { value: "http://example.org/C" },
    capital: { value: "http://example.org/K" },
  };  

  beforeAll(async () => {
    // Force an ephemeral port
    process.env.PORT = "0";
    // Mock fetch for HEAD requests and SPARQL GET
    vi.spyOn(global, "fetch").mockImplementation((url, opts) => {
      if (opts && opts.method === "HEAD") {
        return Promise.resolve({ status: 200 });
      }
      // For GET GET /capital-cities
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ results: { bindings: [mockBinding] } }),
      });
    });

    // Start server
    server = await main(["--serve"]);
    // Wait until listening
    await once(server, "listening");
    port = server.address().port;
  });

  afterAll(() => {
    server.close();
    process.env.PORT = originalPort;
    vi.restoreAllMocks();
  });

  test("GET /help returns CLI help text", async () => {
    const res = await makeRequest("/help");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    expect(res.body).toContain("owl-builder: create and manage OWL ontologies");
    expect(res.body).toContain("Usage: node src/lib/main.js [options]");
    expect(res.body).toContain("--help");
  });

  test("GET /sources returns list of public data sources", async () => {
    const res = await makeRequest("/sources");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toBe(JSON.stringify(PUBLIC_DATA_SOURCES, null, 2));
  });

  test("GET /diagnostics returns diagnostics JSON", async () => {
    const res = await makeRequest("/diagnostics");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const data = JSON.parse(res.body);
    expect(data).toHaveProperty("version");
    expect(data).toHaveProperty("nodeVersion");
    expect(data).toHaveProperty("platform");
    expect(data).toHaveProperty("arch");
    expect(data).toHaveProperty("cwd");
    expect(data).toHaveProperty("publicDataSources");
    expect(Array.isArray(data.publicDataSources)).toBe(true);
    expect(data).toHaveProperty("commands");
    expect(Array.isArray(data.commands)).toBe(true);
    expect(data).toHaveProperty("healthChecks");
    expect(Array.isArray(data.healthChecks)).toBe(true);
    expect(data.healthChecks[0]).toMatchObject({
      name: PUBLIC_DATA_SOURCES[0].name,
      url: PUBLIC_DATA_SOURCES[0].url,
      statusCode: 200,
      reachable: true,
    });
    expect(data).toHaveProperty("uptimeSeconds");
    expect(typeof data.uptimeSeconds).toBe("number");
    expect(data).toHaveProperty("memoryUsage");
    expect(data.memoryUsage).toMatchObject({
      rss: expect.any(Number),
      heapTotal: expect.any(Number),
      heapUsed: expect.any(Number),
      external: expect.any(Number),
      arrayBuffers: expect.any(Number),
    });
  });

  test("GET /capital-cities returns JSON-LD document", async () => {
    const res = await makeRequest("/capital-cities");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const data = JSON.parse(res.body);
    expect(data).toHaveProperty("@context");
    expect(data).toHaveProperty("@graph");
    expect(Array.isArray(data["@graph"]/)).toBe(true);
    expect(data["@graph"][0]).toEqual({
      "@id": mockBinding.country.value,
      capital: mockBinding.capital.value,
    });
  });

  test("GET /unknown-route returns 404", async () => {
    const res = await makeRequest("/unknown-route");
    expect(res.statusCode).toBe(404);
    expect(res.body).toBe("Not Found");
  });

  // Helper for HTTP GET requests
  function makeRequest(path) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "127.0.0.1",
        port,
        path,
        method: "GET",
      };
      const req = http.request(options, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, headers: res.headers, body });
        });
      });
      req.on("error", reject);
      req.end();
    });
  }
});

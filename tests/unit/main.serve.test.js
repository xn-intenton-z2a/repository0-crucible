import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import { main, PUBLIC_DATA_SOURCES } from "../../src/lib/main.js";
import http from "http";
import { once } from "events";

describe("HTTP Server (--serve) Integration Tests", () => {
  let server;
  let port;
  const originalPort = process.env.PORT;
  const mockBindings = [{ country: { value: "http://example.org/C" }, capital: { value: "http://example.org/K" } }];

  beforeAll(async () => {
    process.env.PORT = "0";
    vi.spyOn(global, "fetch").mockImplementation((url, opts) => {
      if (opts && opts.method === "HEAD") {
        return Promise.resolve({ status: 200 });
      }
      // For GET /capital-cities
      return Promise.resolve({
        json: () => Promise.resolve({ results: { bindings: mockBindings } }),
      });
    });
    server = await main(["--serve"]);
    await once(server, "listening");
    port = server.address().port;
  });

  afterAll(() => {
    server.close();
    process.env.PORT = originalPort;
    vi.restoreAllMocks();
  });

  test("GET /capital-cities returns JSON-LD document", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: "127.0.0.1", port, path: "/capital-cities", method: "GET" }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on("error", reject);
      req.end();
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const data = JSON.parse(res.body);
    expect(data).toEqual({
      "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
      "@graph": [{ "@id": "http://example.org/C", "capital": "http://example.org/K" }],
    });
  });

  test("GET /capital-cities handles error with 500", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("fail"));
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: "127.0.0.1", port, path: "/capital-cities" }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on("error", reject);
      req.end();
    });
    expect(res.statusCode).toBe(500);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    expect(res.body).toBe("Failed to fetch capital cities: fail");
  });
});

import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import { main } from "../../src/lib/main.js";
import * as mainModule from "../../src/lib/main.js";
import http from "http";
import { once } from "events";

describe("HTTP Server Integration Test for GET /build-enhanced", () => {
  let server;
  let port;
  const originalPort = process.env.PORT;

  beforeAll(async () => {
    process.env.PORT = "0";
    // mock pipeline functions to log specific lines
    vi.spyOn(mainModule, "refreshSources").mockImplementation(async () => {
      console.log("written ds.json");
      return { count: 1, files: ["ds.json"] };
    });
    vi.spyOn(mainModule, "buildIntermediate").mockImplementation(() => {
      console.log("written i1-intermediate.json");
      return { count: 1, files: ["i1-intermediate.json"] };
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

  test("GET /build-enhanced returns expected lines and summary", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: "127.0.0.1", port, path: "/build-enhanced", method: "GET" }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on("error", reject);
      req.end();
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    expect(res.body).toContain("written ds.json");
    expect(res.body).toContain("written i1-intermediate.json");
    expect(res.body).toContain("written enhanced.json");
    expect(res.body).toContain("Enhanced ontology written to enhanced/enhanced.json with 1 nodes");
  });
});

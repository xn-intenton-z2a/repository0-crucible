import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { main } from "../../src/lib/main.js";
import fs from "fs";
import path from "path";
import os from "os";
import http from "http";
import { once } from "events";

describe("HTTP Server Integration Test for GET /build-intermediate", () => {
  let server;
  let port;
  let tmpDir;
  let originalCwd;
  const mockData = { results: { bindings: [{ a: { value: "id1" }, b: { value: "val2" } }] } };

  beforeAll(async () => {
    // setup temp cwd
    originalCwd = process.cwd();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "build-int-"));
    process.chdir(tmpDir);
    // create data dir and file
    fs.mkdirSync(path.join(tmpDir, "data"));
    fs.writeFileSync(path.join(tmpDir, "data", "sample.json"), JSON.stringify(mockData), "utf8");
    // start server
    process.env.PORT = "0";
    server = await main(["--serve"]);
    await once(server, "listening");
    port = server.address().port;
  });

  afterAll(() => {
    server.close();
    process.chdir(originalCwd);
  });

  test("GET /build-intermediate returns expected lines", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: "127.0.0.1", port, path: "/build-intermediate", method: "GET" }, (res) => {
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
    expect(res.body).toContain("written sample-intermediate.json");
    expect(res.body).toContain("Generated 1 intermediate artifacts into intermediate/");
  });
});

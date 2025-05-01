import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { main } from "../../src/lib/main.js";
import fs from "fs";
import path from "path";
import os from "os";
import http from "http";
import { once } from "events";

describe("HTTP Server Integration Test for /sources endpoints", () => {
  let server;
  let port;
  let tmpDir;
  let originalCwd;
  const defaultSources = [{ name: "DBpedia SPARQL", url: "https://dbpedia.org/sparql" }];

  beforeAll(async () => {
    originalCwd = process.cwd();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "src-rest-"));
    process.chdir(tmpDir);
    process.env.PORT = "0";
    server = await main(["--serve"]);
    await once(server, "listening");
    port = server.address().port;
  });

  afterAll(() => {
    server.close();
    process.chdir(originalCwd);
  });

  test("GET /sources returns default sources", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: "127.0.0.1", port, path: "/sources", method: "GET" }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on("error", reject);
      req.end();
    });
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(JSON.parse(res.body)).toEqual(defaultSources);
  });

  test("POST /sources adds a new source", async () => {
    const newSource = { name: "Custom", url: "https://example.com" };
    const res = await new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: "/sources",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
        },
      );
      req.on("error", reject);
      req.write(JSON.stringify(newSource));
      req.end();
    });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const parsed = JSON.parse(res.body);
    expect(parsed).toEqual([...defaultSources, newSource]);
    // ensure file created
    const cfg = JSON.parse(fs.readFileSync(path.join(tmpDir, "data-sources.json"), "utf8"));
    expect(cfg).toEqual([newSource]);
  });

  test("POST /sources with invalid JSON returns 400", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: "/sources",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve({ statusCode: res.statusCode, body }));
        },
      );
      req.on("error", reject);
      req.write("not json");
      req.end();
    });
    expect(res.statusCode).toBe(400);
  });

  test("POST /sources missing fields returns 400", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: "/sources",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve({ statusCode: res.statusCode, body }));
        },
      );
      req.on("error", reject);
      req.write(JSON.stringify({ name: "OnlyName" }));
      req.end();
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing required fields: name and url");
  });

  test("DELETE /sources/:identifier removes existing source", async () => {
    const custom = { name: "X", url: "u" };
    fs.writeFileSync(path.join(tmpDir, "data-sources.json"), JSON.stringify([custom], null, 2));
    const res = await new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: "127.0.0.1", port, path: `/sources/${encodeURIComponent(custom.name)}`, method: "DELETE" },
        (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
        },
      );
      req.on("error", reject);
      req.end();
    });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual(defaultSources);
  });

  test("DELETE /sources/:identifier non-existing returns defaults", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: "127.0.0.1", port, path: "/sources/None", method: "DELETE" }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      });
      req.on("error", reject);
      req.end();
    });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual(defaultSources);
  });

  test("PUT /sources/:identifier updates existing source", async () => {
    const original = { name: "Y", url: "old" };
    fs.writeFileSync(path.join(tmpDir, "data-sources.json"), JSON.stringify([original], null, 2));
    const updated = { name: "Y2", url: "new" };
    const res = await new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: `/sources/${encodeURIComponent(original.name)}`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
        (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
        },
      );
      req.on("error", reject);
      req.write(JSON.stringify(updated));
      req.end();
    });
    expect(res.statusCode).toBe(200);
    const parsed = JSON.parse(res.body);
    expect(parsed).toEqual([...defaultSources, updated]);
  });

  test("PUT /sources/:identifier with invalid body returns 400", async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: "/sources/Any",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
        (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve({ statusCode: res.statusCode, body }));
        },
      );
      req.on("error", reject);
      req.write("bad json");
      req.end();
    });
    expect(res.statusCode).toBe(400);
  });
});

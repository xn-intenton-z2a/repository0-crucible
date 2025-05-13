import { describe, test, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "@src/lib/main.js";

let app;
beforeAll(() => {
  app = createApp();
});

describe("HTTP API Server", () => {
  test("GET /pi returns default result", async () => {
    const res = await request(app).get("/pi");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toEqual({ result: 3.14159 });
  });

  test("GET /pi with params returns diagnostics object", async () => {
    const res = await request(app)
      .get("/pi?digits=3&algorithm=montecarlo&samples=1000&diagnostics=true");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("algorithm", "montecarlo");
    expect(res.body).toHaveProperty("samples", 1000);
    expect(res.body).toHaveProperty("result");
    expect(res.body).toHaveProperty("durationMs");
    expect(res.body).toHaveProperty("samplesUsed", 1000);
  });

  test("GET /pi with invalid digits returns 400", async () => {
    const res = await request(app).get("/pi?digits=-1");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors[0]).toEqual({ path: ["digits"], message: expect.any(String) });
  });

  test("GET /pi/data returns array of data points", async () => {
    const res = await request(app).get("/pi/data?digits=2&algorithm=leibniz");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(100);
    expect(res.body[0]).toEqual(
      expect.objectContaining({
        index: expect.any(Number),
        approximation: expect.any(Number),
        error: expect.any(Number),
      })
    );
  });

  test("GET /pi/chart returns PNG image", async () => {
    const res = await request(app).get("/pi/chart?digits=2&algorithm=leibniz");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image\/png/);
    // PNG header bytes: 89 50 4E 47
    const buf = res.body;
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4e);
    expect(buf[3]).toBe(0x47);
  });

  // Tests for the interactive dashboard
  describe("Dashboard", () => {
    test("GET /dashboard returns HTML with form, canvas, Chart.js script", async () => {
      const res = await request(app).get("/dashboard");
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/text\/html/);
      expect(res.text).toContain("<form");
      expect(res.text).toContain("<canvas id=\"chart\"");
      expect(res.text).toContain("https://cdn.jsdelivr.net/npm/chart.js");
    });
  });

  // New tests for high precision algorithms
  test("GET /pi?algorithm=chudnovsky&digits=2 returns result 3.14", async () => {
    const res = await request(app).get("/pi?algorithm=chudnovsky&digits=2");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 3.14 });
  });

  test("GET /pi?algorithm=ramanujan-sato&digits=3&level=1 returns result 3.142", async () => {
    const res = await request(app).get(
      "/pi?algorithm=ramanujan-sato&digits=3&level=1"
    );
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 3.142 });
  });

  test("GET /pi?algorithm=ramanujan-sato&digits=3&level=1&diagnostics=true returns diagnostics", async () => {
    const res = await request(app).get(
      "/pi?algorithm=ramanujan-sato&digits=3&level=1&diagnostics=true"
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("algorithm", "ramanujan-sato");
    expect(res.body).toHaveProperty("digits", 3);
    expect(res.body).toHaveProperty("level", 1);
    expect(res.body).toHaveProperty("result");
    expect(res.body).toHaveProperty("durationMs");
  });

  // New tests for Gauss-Legendre algorithm
  test("GET /pi?algorithm=gauss-legendre&digits=2 returns result 3.14", async () => {
    const res = await request(app).get("/pi?algorithm=gauss-legendre&digits=2");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 3.14 });
  });

  test("GET /pi?algorithm=gauss-legendre&digits=3&diagnostics=true returns diagnostics", async () => {
    const res = await request(app).get(
      "/pi?algorithm=gauss-legendre&digits=3&diagnostics=true"
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("algorithm", "gauss-legendre");
    expect(res.body).toHaveProperty("digits", 3);
    expect(res.body).toHaveProperty("result");
    expect(res.body).toHaveProperty("durationMs");
  });
});
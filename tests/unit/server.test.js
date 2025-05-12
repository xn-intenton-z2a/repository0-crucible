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
});
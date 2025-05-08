import request from "supertest";
import { describe, test, expect, beforeEach } from "vitest";
import { createApp } from "@src/lib/main.js";

describe("API Endpoints", () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test("GET /health responds with status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /pi with valid params returns pi", async () => {
    const res = await request(app).get(
      "/pi?digits=10&algorithm=chudnovsky"
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("pi", "3.1415926535");
    expect(res.body).toHaveProperty("digits", 10);
    expect(res.body).toHaveProperty("algorithm", "chudnovsky");
    expect(res.body.timeMs).toBeGreaterThan(0);
  });

  test("GET /pi missing digits yields 400", async () => {
    const res = await request(app).get("/pi?algorithm=chudnovsky");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /pi invalid algorithm yields 400", async () => {
    const res = await request(app).get("/pi?digits=5&algorithm=foo");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /benchmark with valid params returns metrics", async () => {
    const res = await request(app).get(
      "/benchmark?digits=100&algorithm=gauss-legendre"
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("digits", 100);
    expect(res.body).toHaveProperty("algorithm", "gauss-legendre");
    expect(res.body.timeMs).toBeGreaterThan(0);
    expect(res.body.throughput).toBeCloseTo(
      100 / res.body.timeMs,
      5
    );
  });

  test("GET /benchmark missing digits yields 400", async () => {
    const res = await request(app).get("/benchmark?algorithm=leibniz");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

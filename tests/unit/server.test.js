import { describe, test, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "@src/lib/main.js";

describe("HTTP server mode", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  test("GET /health returns status OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "OK" });
  });

  test("GET /faces default returns JSON with one face", async () => {
    const res = await request(app).get("/faces");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("faces");
    expect(Array.isArray(res.body.faces)).toBe(true);
    expect(res.body.faces.length).toBe(1);
    expect(res.body.category).toBe("all");
    expect(res.body.count).toBe(1);
    expect(res.body.seed).toBe(null);
  });

  test("GET /faces with parameters returns correct JSON", async () => {
    const res = await request(app).get("/faces?count=3&category=happy&seed=42");
    expect(res.status).toBe(200);
    const { faces, category, count, seed } = res.body;
    expect(count).toBe(3);
    expect(category).toBe("happy");
    expect(faces.length).toBe(3);
    expect(seed).toBe(42);

    const res2 = await request(app).get("/faces?count=3&category=happy&seed=42");
    expect(res2.body.faces).toEqual(faces);
  });

  test("GET /faces text format returns plain text", async () => {
    const res = await request(app).get("/faces?count=2&format=text");
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toMatch(/text\/plain/);
    const lines = res.text.split("\n");
    expect(lines.length).toBe(2);
  });

  test("GET /faces with unknown category returns validation error", async () => {
    const res = await request(app).get("/faces?category=unknown");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/Unknown category/i);
  });

  test("GET /faces with non-numeric count returns validation error", async () => {
    const res = await request(app).get("/faces?count=abc");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/number/i);
  });
});
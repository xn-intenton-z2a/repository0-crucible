import { describe, test, expect } from "vitest";
import { getFaces, createApp } from "@src/lib/main.js";
import request from "supertest";

// Path to custom JSON config fixture
const jsonConfigPath = "tests/unit/fixtures/custom.json";

describe("Custom face configuration", () => {
  test("JSON config overrides existing category", () => {
    const result = getFaces({ config: jsonConfigPath, category: "happy", count: 2 });
    expect(result.faces.length).toBe(2);
    expect(result.faces.every(f => ["H1", "H2"].includes(f))).toBe(true);
    expect(result.category).toBe("happy");
  });

  test("Non-existent config file throws error", () => {
    expect(() => getFaces({ config: "no-such-file.json" })).toThrow(/Config file not found/);
  });

  test("HTTP /faces applies JSON config", async () => {
    const app = createApp();
    const res = await request(app)
      .get(`/faces?config=${jsonConfigPath}&category=happy&count=2`);
    expect(res.status).toBe(200);
    expect(res.body.faces.length).toBe(2);
    expect(res.body.faces.every(f => ["H1", "H2"].includes(f))).toBe(true);
    expect(res.body.category).toBe("happy");
  });

  test("JSON config adds new category and serves it", () => {
    const result = getFaces({ config: jsonConfigPath, category: "custom", count: 3 });
    expect(result.faces.length).toBe(3);
    expect(result.faces.every(f => ["C1", "C2"].includes(f))).toBe(true);
    expect(result.category).toBe("custom");
  });

  test("HTTP /faces serves new custom category", async () => {
    const app = createApp();
    const res = await request(app)
      .get(`/faces?config=${jsonConfigPath}&category=custom&count=2`);
    expect(res.status).toBe(200);
    expect(res.body.faces.length).toBe(2);
    expect(res.body.faces.every(f => ["C1", "C2"].includes(f))).toBe(true);
    expect(res.body.category).toBe("custom");
  });

  test("Invalid category with config throws error", () => {
    expect(() => getFaces({ config: jsonConfigPath, category: "notfound" }))
      .toThrow(/Unknown category: notfound/);
  });
});
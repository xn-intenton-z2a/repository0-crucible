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
});

import { describe, test, expect } from "vitest";
import { generateFacesCore } from "@src/lib/main.js";

const jsonConfigPath = "tests/unit/fixtures/custom.json";

describe("generateFacesCore", () => {
  test("default options", () => {
    const result = generateFacesCore();
    expect(result).toHaveProperty("faces");
    expect(Array.isArray(result.faces)).toBe(true);
    expect(result.faces.length).toBe(1);
    expect(result.category).toBe("all");
    expect(result.count).toBe(1);
    expect(result.seed).toBe(null);
  });

  test("reproducible output with seed and category", () => {
    const opts = { count: 3, category: "happy", seed: 100 };
    const first = generateFacesCore(opts);
    const second = generateFacesCore(opts);
    expect(first.faces).toEqual(second.faces);
    expect(first.count).toBe(3);
    expect(first.category).toBe("happy");
    expect(first.seed).toBe(100);
  });

  test("invalid count throws error", () => {
    expect(() => generateFacesCore({ count: 0 })).toThrow();
  });

  test("invalid category throws error", () => {
    expect(() => generateFacesCore({ category: "unknown" })).toThrow();
  });

  test("custom config overrides faces", () => {
    const result = generateFacesCore({ config: jsonConfigPath, category: "happy", count: 2, seed: 1 });
    expect(result.faces.length).toBe(2);
    expect(result.faces.every((f) => ["H1", "H2"].includes(f))).toBe(true);
  });
});

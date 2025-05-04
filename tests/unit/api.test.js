import { describe, test, expect } from "vitest";
import { getFaces, listCategories, faces } from "@src/lib/main.js";

// Path to custom JSON config fixture
const jsonConfigPath = "tests/unit/fixtures/custom.json";

describe("Library API", () => {
  test("default getFaces returns one face from all category with null seed", () => {
    const result = getFaces();
    expect(result).toHaveProperty("faces");
    expect(Array.isArray(result.faces)).toBe(true);
    expect(result.faces.length).toBe(1);
    expect(result.category).toBe("all");
    expect(result.count).toBe(1);
    expect(result.seed).toBe(null);
  });

  test("getFaces with custom count, category, and seed is reproducible", () => {
    const opts = { count: 3, category: "happy", seed: 42 };
    const first = getFaces(opts);
    const second = getFaces(opts);
    expect(first.count).toBe(3);
    expect(first.category).toBe("happy");
    expect(first.seed).toBe(42);
    expect(first.faces.length).toBe(3);
    expect(second.faces).toEqual(first.faces);
  });

  test("invalid options throw validation errors", () => {
    expect(() => getFaces({ count: 0 })).toThrow();
    expect(() => getFaces({ category: "unknown" })).toThrow();
    expect(() => getFaces({ seed: -1 })).toThrow();
  });

  test("listCategories default returns built-in plus all only", () => {
    const cats = listCategories();
    expect(Array.isArray(cats)).toBe(true);
    expect(cats.sort()).toEqual([...(Object.keys(faces)), "all"].sort());
  });

  test("listCategories with custom config includes custom keys and all", () => {
    const cats = listCategories({ config: jsonConfigPath });
    expect(Array.isArray(cats)).toBe(true);
    // built-in
    expect(cats).toEqual(expect.arrayContaining(Object.keys(faces)));
    // custom
    expect(cats).toContain("custom");
    // all
    expect(cats).toContain("all");
  });

  test("listCategories with invalid config throws error", () => {
    expect(() => listCategories({ config: "no-such-file.json" })).toThrow(/Config file not found/);
  });
});
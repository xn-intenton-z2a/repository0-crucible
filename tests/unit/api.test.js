import { describe, test, expect } from "vitest";
import { getFaces, listCategories } from "@src/lib/main.js";

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

  test("listCategories returns all valid categories", () => {
    const cats = listCategories();
    expect(Array.isArray(cats)).toBe(true);
    expect(cats.sort()).toEqual(["happy", "sad", "angry", "surprised", "all"].sort());
  });
});

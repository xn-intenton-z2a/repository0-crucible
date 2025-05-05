import { describe, test, expect } from "vitest";
import { generateFacesCore, FACE_POOLS } from "@src/lib/main.js";

describe("generateFacesCore", () => {
  test("returns correct array shape and is reproducible", () => {
    const opts = { count: 3, seed: 42, category: "all", unique: false };
    const result1 = generateFacesCore(opts);
    const result2 = generateFacesCore(opts);
    expect(result1).toHaveLength(3);
    expect(result1).toEqual(result2);
    expect(result1[0]).toHaveProperty("id", 1);
  });

  test("category filtering only returns faces from that pool", () => {
    const result = generateFacesCore({ count: 5, seed: 7, category: "happy" });
    result.forEach(item => {
      expect(FACE_POOLS.happy).toContain(item.face);
    });
  });

  test("unique yields no duplicates and throws when too many requested", () => {
    const poolSize = FACE_POOLS.sad.length;
    expect(() => generateFacesCore({ count: poolSize + 1, seed: 0, category: "sad", unique: true })).toThrow(RangeError);
    const uniqueResult = generateFacesCore({ count: 3, seed: 1, category: "sad", unique: true });
    const faces = uniqueResult.map(f => f.face);
    expect(new Set(faces).size).toBe(3);
  });

  test("invalid inputs throw descriptive errors", () => {
    expect(() => generateFacesCore({ count: 0, seed: 1, category: "all" }))
      .toThrow(/count must be a positive integer/);
    expect(() => generateFacesCore({ count: 1.5, seed: 1, category: "all" }))
      .toThrow(/count must be a positive integer/);
    expect(() => generateFacesCore({ count: 1, seed: 1.2, category: "all" }))
      .toThrow(/seed must be an integer/);
    expect(() => generateFacesCore({ count: 1, seed: 1, category: "unknown" }))
      .toThrow();
    expect(() => generateFacesCore({ count: 1, seed: 1, category: "all", unique: "yes" }))
      .toThrow();
  });

  test("unique defaults to false when not provided", () => {
    const result = generateFacesCore({ count: 2, seed: 3, category: "angry" });
    expect(result).toHaveLength(2);
  });
});
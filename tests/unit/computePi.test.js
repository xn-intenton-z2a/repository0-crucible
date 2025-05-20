import { describe, test, expect } from "vitest";
import { computePi } from "@src/lib/main.js";

describe("computePi function", () => {
  test("1 digit", () => {
    expect(computePi(1)).toBe("3.1");
  });

  test("2 digits", () => {
    expect(computePi(2)).toBe("3.14");
  });

  test("5 digits", () => {
    expect(computePi(5)).toBe("3.14159");
  });

  test("invalid digits (zero)", () => {
    expect(() => computePi(0)).toThrow();
  });
});

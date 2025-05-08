import { describe, test, expect } from "vitest";
import {
  computePiLeibniz,
  computePiGaussLegendre,
  computePiChudnovsky,
  computePi,
} from "@src/lib/main.js";

describe("Pi Algorithm Implementations", () => {
  const expected10 = "3.1415926535";

  test("computePiLeibniz returns correct 10 digits", () => {
    expect(computePiLeibniz(10)).toBe(expected10);
  });

  test("computePiGaussLegendre returns correct 10 digits", () => {
    expect(computePiGaussLegendre(10)).toBe(expected10);
  });

  test("computePiChudnovsky returns correct 10 digits", () => {
    expect(computePiChudnovsky(10)).toBe(expected10);
  });

  test("computePi dispatches to Leibniz", () => {
    expect(computePi(10, "leibniz")).toBe(expected10);
  });

  test("computePi dispatches to Gauss-Legendre", () => {
    expect(computePi(10, "gauss-legendre")).toBe(expected10);
  });

  test("computePi dispatches to Chudnovsky", () => {
    expect(computePi(10, "chudnovsky")).toBe(expected10);
  });

  test("computePi throws on unknown algorithm", () => {
    expect(() => computePi(10, "foo")).toThrow("Unknown algorithm");
  });
});

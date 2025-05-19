import { describe, test, expect } from "vitest";
import { computeDistribution } from "@src/lib/main.js";

describe("computeDistribution", () => {
  test("counts digits correctly for a sample string", () => {
    const input = "012012";
    const dist = computeDistribution(input);
    expect(dist).toEqual({
      "0": 2,
      "1": 2,
      "2": 2,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0
    });
  });

  test("returns zeros for empty string", () => {
    const dist = computeDistribution("");
    expect(dist).toEqual({
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0
    });
  });
});

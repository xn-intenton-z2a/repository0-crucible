import { describe, test, expect } from "vitest";
import { main, FACES } from "@src/lib/main.js";

describe("ASCII_FACE main function", () => {
  test("random mode returns a valid face", () => {
    const face = main([]);
    expect(Object.values(FACES)).toContain(face);
  });

  test("list mode returns sorted list of face names", () => {
    const list = main(["--list"]);
    expect(Array.isArray(list)).toBe(true);
    expect(list).toEqual(Object.keys(FACES).sort());
  });

  test("named mode with valid name returns correct face", () => {
    const face = main(["--name", "wink"]);
    expect(face).toBe(FACES["wink"]);
  });

  test("named mode short flag returns correct face", () => {
    const face = main(["-n", "smile"]);
    expect(face).toBe(FACES["smile"]);
  });

  test("named mode with invalid name throws error", () => {
    expect(() => main(["--name", "foo"]))
      .toThrow("Error: 'foo' is not a valid face name.");
  });

  test("seed mode returns deterministic face for same seed", () => {
    const face1 = main(["--seed", "1"]);
    const face2 = main(["--seed", "1"]);
    expect(face1).toBe(face2);
    expect(Object.values(FACES)).toContain(face1);
  });

  test("short seed flag -s returns deterministic face for same seed", () => {
    const face1 = main(["-s", "2"]);
    const face2 = main(["-s", "2"]);
    expect(face1).toBe(face2);
    expect(Object.values(FACES)).toContain(face1);
  });

  test("seed mode with invalid seed throws error", () => {
    expect(() => main(["--seed", "foo"]))
      .toThrow("Error: 'foo' is not a valid seed value.");
  });
});

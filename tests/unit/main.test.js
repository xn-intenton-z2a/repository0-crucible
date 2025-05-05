import { describe, test, expect } from "vitest";
import { main, ASCII_FACES } from "@src/lib/main.js";

describe("ASCII_FACE main function", () => {
  test("default (random) mode returns a valid face", () => {
    const face = main([]);
    expect(ASCII_FACES).toContain(face);
  });

  test("--face explicit returns a valid face", () => {
    const face = main(["--face"]);
    expect(ASCII_FACES).toContain(face);
  });

  test("--list-faces returns indexed list", () => {
    const list = main(["--list-faces"]);
    expect(Array.isArray(list)).toBe(true);
    expect(list).toEqual(ASCII_FACES.map((f, i) => `${i}: ${f}`));
  });

  test("--seed with numeric makes deterministic selection", () => {
    const first = main(["--seed", "1"]);
    const second = main(["--seed", "1"]);
    expect(first).toBe(second);
    expect(ASCII_FACES).toContain(first);
  });

  test("invalid seed throws error", () => {
    expect(() => main(["--seed", "foo"]))
      .toThrow("Error: seed value must be a number.");
  });

  test("missing seed value throws error", () => {
    expect(() => main(["--seed"]))
      .toThrow("Error: seed value must be a number.");
  });

  test("unknown flag throws error", () => {
    expect(() => main(["--unknown"]))
      .toThrow("Error: unknown flag '--unknown'");
  });

  test("extra flag after --face throws error", () => {
    expect(() => main(["--face", "extra"]))
      .toThrow("Error: unknown flag 'extra'");
  });

  test("extra flag after --list-faces throws error", () => {
    expect(() => main(["--list-faces", "extra"]))
      .toThrow("Error: unknown flag 'extra'");
  });

  test("extra flag after --seed throws error", () => {
    expect(() => main(["--seed", "1", "extra"]))
      .toThrow("Error: unknown flag 'extra'");
  });
});

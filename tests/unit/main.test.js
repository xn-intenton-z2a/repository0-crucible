import { describe, test, expect } from "vitest";
import { main, ASCII_FACES, FACE_MAP } from "@src/lib/main.js";

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

  test("short -s flag deterministic selection", () => {
    const first = main(["-s", "3"]);
    const second = main(["-s", "3"]);
    expect(first).toBe(second);
    expect(ASCII_FACES).toContain(first);
  });

  test("different seeds produce different faces", () => {
    const a = main(["--seed", "1"]);
    const b = main(["--seed", "2"]);
    expect(a).toBe(main(["--seed", "1"]));
    expect(a).not.toBe(b);
  });

  test("empty seed string falls back to random", () => {
    const face = main(["--seed", ""]);
    expect(ASCII_FACES).toContain(face);
  });

  test("empty seed with short flag falls back to random", () => {
    const face = main(["-s", ""]);
    expect(ASCII_FACES).toContain(face);
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

  // Named mode tests
  test("valid named mode returns correct face", () => {
    expect(main(["--name", "frown"]) ).toBe(ASCII_FACES[0]);
  });

  test("short -n alias returns correct face", () => {
    expect(main(["-n", "smile"]) ).toBe(ASCII_FACES[3]);
  });

  test("invalid name throws error", () => {
    expect(() => main(["--name", "foo"]))
      .toThrow("Error: 'foo' is not a valid face name.");
  });

  test("missing name throws error", () => {
    expect(() => main(["--name"]))
      .toThrow("Error: '--name' requires a face name.");
  });

  test("extra flag after named mode throws error", () => {
    expect(() => main(["--name", "frown", "extra"]))
      .toThrow("Error: unknown flag 'extra'");
  });

  // List names mode tests
  test("--list-names returns sorted face identifiers", () => {
    const names = main(["--list-names"]);
    expect(Array.isArray(names)).toBe(true);
    const expected = Object.keys(FACE_MAP).sort();
    expect(names).toEqual(expected);
  });

  test("-l alias returns sorted face identifiers", () => {
    const names = main(["-l"]);
    const expected = Object.keys(FACE_MAP).sort();
    expect(names).toEqual(expected);
  });

  test("extra flag after --list-names throws error", () => {
    expect(() => main(["--list-names", "extra"]))
      .toThrow("Error: unknown flag 'extra'");
  });
});

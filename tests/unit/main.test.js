import { describe, test, expect, beforeEach, vi } from "vitest";
import seedrandom from "seedrandom";
import { parseOptions, getRandomFaceFromList, main } from "@src/lib/main.js";

describe("parseOptions", () => {
  test("default options", () => {
    expect(parseOptions([])).toEqual({ count: 1, category: "all", seed: undefined });
  });

  test("custom count and category", () => {
    expect(parseOptions(["--count", "3", "--category", "happy"]))
      .toEqual({ count: 3, category: "happy", seed: undefined });
  });

  test("short flags", () => {
    expect(parseOptions(["-c", "2", "-C", "sad", "-s", "42"]))
      .toEqual({ count: 2, category: "sad", seed: 42 });
  });

  test("invalid count throws", () => {
    expect(() => parseOptions(["--count", "0"]))
      .toThrow();
    expect(() => parseOptions(["--count", "-1"]))
      .toThrow();
    expect(() => parseOptions(["--count", "a"]))
      .toThrow();
  });

  test("invalid category throws", () => {
    expect(() => parseOptions(["--category", "unknown"]))
      .toThrow();
  });

  test("invalid seed throws", () => {
    expect(() => parseOptions(["--seed", "-5"]))
      .toThrow();
    expect(() => parseOptions(["--seed", "1.5"]))
      .toThrow();
  });
});

describe("getRandomFaceFromList", () => {
  const list = ["a", "b", "c"];
  test("returns element from list", () => {
    const face = getRandomFaceFromList(list, () => 0.5);
    expect(list).toContain(face);
  });
});

describe("main CLI", () => {
  let logs = [];
  beforeEach(() => {
    logs = [];
    vi.stub(console, "log").callsFake((...args) => logs.push(args.join(" ")));
  });

  test("help message", () => {
    main(["--help"]);
    expect(logs[0]).toContain("Usage:");
  });

  test("default outputs one face", () => {
    main([]);
    expect(logs.length).toBe(1);
  });

  test("respects count and category", () => {
    main(["--count", "3", "--category", "happy"]);
    expect(logs.length).toBe(3);
  });

  test("seed reproducibility", () => {
    main(["--count", "2", "--seed", "123"]);
    const firstRun = [...logs];
    logs = [];
    main(["--count", "2", "--seed", "123"]);
    expect(logs).toEqual(firstRun);
  });
});

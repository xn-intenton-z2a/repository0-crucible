import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import seedrandom from "seedrandom";
import { parseOptions, getRandomFaceFromList, main } from "@src/lib/main.js";

describe("parseOptions", () => {
  test("default options", () => {
    expect(parseOptions([])).toEqual({ count: 1, category: "all", seed: undefined, json: false });
  });

  test("json flag default off", () => {
    const opts = parseOptions([]);
    expect(opts.json).toBe(false);
  });

  test("long json flag", () => {
    expect(parseOptions(["--json"]))
      .toEqual({ count: 1, category: "all", seed: undefined, json: true });
  });

  test("short json flag", () => {
    expect(parseOptions(["-j"]))
      .toEqual({ count: 1, category: "all", seed: undefined, json: true });
  });

  test("custom count and category", () => {
    expect(
      parseOptions(["--count", "3", "--category", "happy"]),
    ).toEqual({ count: 3, category: "happy", seed: undefined, json: false });
  });

  test("short flags", () => {
    expect(
      parseOptions(["-c", "2", "-C", "sad", "-s", "42"]),
    ).toEqual({ count: 2, category: "sad", seed: 42, json: false });
  });

  test("invalid count throws", () => {
    expect(() => parseOptions(["--count", "0"])) .toThrow();
    expect(() => parseOptions(["--count", "-1"])) .toThrow();
    expect(() => parseOptions(["--count", "a"])) .toThrow();
  });

  test("invalid category throws", () => {
    expect(() => parseOptions(["--category", "unknown"])) .toThrow();
  });

  test("invalid seed throws", () => {
    expect(() => parseOptions(["--seed", "-5"])) .toThrow();
    expect(() => parseOptions(["--seed", "1.5"])) .toThrow();
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
    vi.spyOn(console, "log").mockImplementation((...args) => logs.push(args.join(" ")));
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  test("json output", () => {
    main(["--json"]);
    expect(logs.length).toBe(1);
    const obj = JSON.parse(logs[0]);
    expect(obj).toHaveProperty("faces");
    expect(Array.isArray(obj.faces)).toBe(true);
    expect(obj.faces.length).toBe(1);
    expect(obj.category).toBe("all");
    expect(obj.count).toBe(1);
    expect(obj.seed).toBe(null);
  });

  test("combined flags with json", () => {
    main(["-c", "3", "-C", "sad", "-s", "99", "-j"]);
    expect(logs.length).toBe(1);
    const obj = JSON.parse(logs[0]);
    expect(obj.faces.length).toBe(3);
    expect(obj.category).toBe("sad");
    expect(obj.count).toBe(3);
    expect(obj.seed).toBe(99);
    const firstFaces = obj.faces;
    logs = [];
    main(["-c", "3", "-C", "sad", "-s", "99", "-j"]);
    const obj2 = JSON.parse(logs[0]);
    expect(obj2.faces).toEqual(firstFaces);
  });
});

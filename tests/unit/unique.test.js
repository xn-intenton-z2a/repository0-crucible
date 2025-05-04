import { describe, test, expect, beforeEach, afterEach, vi, beforeAll } from "vitest";
import request from "supertest";
import { generateFacesCore, getFaces, parseOptions, createApp, main } from "@src/lib/main.js";

// Programmatic API unique behavior
describe("Unique option programmatic", () => {
  test("generateFacesCore with unique produces unique deterministic faces", () => {
    const opts = { category: "happy", count: 3, seed: 123, unique: true };
    const first = generateFacesCore(opts);
    const second = generateFacesCore(opts);
    expect(first.faces).toEqual(second.faces);
    expect(first.faces.length).toBe(3);
    expect(new Set(first.faces).size).toBe(3);
  });

  test("generateFacesCore throws when count exceeds pool in unique mode", () => {
    expect(() => generateFacesCore({ category: "sad", count: 10, unique: true })).toThrow(
      /Requested 10 unique faces, but only \d+ available in category 'sad'/
    );
  });

  test("getFaces honors unique option", () => {
    const result = getFaces({ category: "angry", count: 2, seed: 5, unique: true });
    expect(result.faces.length).toBe(2);
    expect(new Set(result.faces).size).toBe(2);
  });
});

// CLI parseOptions unique flag
describe("parseOptions unique flag", () => {
  test("parseOptions recognizes --unique", () => {
    expect(parseOptions(["--unique"]).unique).toBe(true);
  });

  test("parseOptions recognizes -u", () => {
    expect(parseOptions(["-u"]).unique).toBe(true);
  });

  test("parseOptions default unique is false", () => {
    expect(parseOptions([]).unique).toBe(false);
  });
});

// CLI main unique behavior
describe("CLI unique behavior", () => {
  let logs;

  beforeEach(() => {
    logs = [];
    vi.spyOn(console, "log").mockImplementation((...args) => logs.push(args.join(" ")));
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("CLI prints unique faces without duplicates", () => {
    main(["--unique", "-c", "4", "-C", "surprised"]);
    expect(logs.length).toBe(4);
    expect(new Set(logs).size).toBe(4);
  });

  test("CLI exits with error when count exceeds pool in unique mode", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("exit"); });
    expect(() => main(["--unique", "-c", "10", "-C", "angry"]))
      .toThrow(/exit/);
    exitSpy.mockRestore();
  });
});

// HTTP API unique behavior
describe("HTTP API unique", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  test("GET /faces?unique=true returns unique faces without duplicates", async () => {
    const res = await request(app).get("/faces?unique=true&count=4");
    expect(res.status).toBe(200);
    expect(res.body.faces.length).toBe(4);
    expect(new Set(res.body.faces).size).toBe(4);
  });

  test("GET /faces?unique=true count exceeds pool returns 400 error", async () => {
    const res = await request(app).get("/faces?unique=true&category=happy&count=10");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Requested 10 unique faces/);
  });
});
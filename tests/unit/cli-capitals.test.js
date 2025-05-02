import { describe, test, expect, vi, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import path from "path";
import os from "os";
import { main } from "@src/lib/main.js";

describe("Capital-Cities Subcommand", () => {
  const tmpDir = os.tmpdir();

  afterEach(() => {
    vi.restoreAllMocks();
    delete global.fetch;
  });

  test("successful fetch to stdout", async () => {
    const sample = [
      { name: { common: "CountryA" }, capital: ["CapitalA"] },
      { name: { common: "CountryB" }, capital: [] },
      { name: { common: "CountryC" }, capital: ["CapitalC"] },
    ];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => sample,
    }));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const code = await main([
      "capital-cities",
      "--ontology-iri",
      "http://example.org/onto",
    ]);
    expect(code).toBe(0);
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    const doc = JSON.parse(output);
    expect(doc["@context"].owl).toBe(
      "http://www.w3.org/2002/07/owl#"
    );
    expect(doc["@id"]).toBe("http://example.org/onto");
    expect(Array.isArray(doc["@graph"])) .toBe(true);
    expect(doc["@graph"].length).toBe(2);
    const ids = doc["@graph"].map((node) => node["@id"]);
    expect(ids).toContain("http://example.org/onto#CountryA");
    expect(ids).toContain("http://example.org/onto#CountryC");
  });

  test("successful fetch to file with baseIri and api-endpoint", async () => {
    const sample = [{ name: { common: "X" }, capital: ["Y"] }];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => sample,
    }));
    const outputFile = path.join(tmpDir, `cap-${Date.now()}.json`);
    const code = await main([
      "capital-cities",
      "--ontology-iri",
      "http://example.org/onto",
      "--base-iri",
      "http://example.org/base",
      "--api-endpoint",
      "https://example.com/api",
      "--output",
      outputFile,
    ]);
    expect(code).toBe(0);
    const out = await fs.readFile(outputFile, "utf-8");
    const doc = JSON.parse(out);
    expect(doc["@context"]["@base"]).toBe(
      "http://example.org/base"
    );
    expect(doc["@graph"][0]["@id"]).toBe(
      "http://example.org/onto#X"
    );
    await fs.rm(outputFile);
  });

  test("missing required flags exits with error", async () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const code = await main(["capital-cities"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });

  test("fetch non-2xx response exits with error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    }));
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const code = await main([
      "capital-cities",
      "--ontology-iri",
      "http://example.org/onto",
    ]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(
      "Error fetching country data: HTTP 500 Internal Server Error"
    );
  });

  test("network error exits with error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network fail")));
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const code = await main([
      "capital-cities",
      "--ontology-iri",
      "http://example.org/onto",
    ]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });
});

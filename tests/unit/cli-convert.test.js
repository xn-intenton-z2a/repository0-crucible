import { describe, test, expect, vi } from "vitest";
import * as fs from "node:fs/promises";
import path from "path";
import os from "os";
import { main } from "@src/lib/main.js";

describe("Convert Subcommand", () => {
  const tmpDir = os.tmpdir();

  test("successful conversion to stdout", async () => {
    const data = { TermA: { description: "An example" } };
    const inputFile = path.join(tmpDir, `terms-${Date.now()}.json`);
    await fs.writeFile(inputFile, JSON.stringify(data), "utf-8");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const code = await main([
      "convert",
      "--input",
      inputFile,
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
    expect(doc["@graph"][0]["@id"]).toBe(
      "http://example.org/onto#TermA"
    );
    logSpy.mockRestore();
    await fs.rm(inputFile);
  });

  test("successful conversion to file with baseIri", async () => {
    const data = { Person: { name: "Bob" } };
    const inputFile = path.join(tmpDir, `terms-${Date.now()}.json`);
    const outputFile = path.join(tmpDir, `out-${Date.now()}.json`);
    await fs.writeFile(inputFile, JSON.stringify(data), "utf-8");
    const code = await main([
      "convert",
      "--input",
      inputFile,
      "--ontology-iri",
      "http://example.org/onto",
      "--base-iri",
      "http://example.org/base",
      "--output",
      outputFile,
    ]);
    expect(code).toBe(0);
    const outContent = await fs.readFile(outputFile, "utf-8");
    const doc = JSON.parse(outContent);
    expect(doc["@context"]["@base"]).toBe(
      "http://example.org/base"
    );
    expect(doc["@id"]).toBe("http://example.org/onto");
    expect(doc["@graph"][0]["@id"]).toBe(
      "http://example.org/onto#Person"
    );
    await fs.rm(inputFile);
    await fs.rm(outputFile);
  });

  test("missing required flags exits with error", async () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const code = await main(["convert"]);
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
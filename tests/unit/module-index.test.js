import { describe, test, expect } from "vitest";
import defaultExport, { generateOntology } from "../../src/lib/index.js";

describe("Index Module Exports", () => {
  test("default export should be undefined", () => {
    expect(defaultExport).toBeUndefined();
  });
});

describe("generateOntology", () => {
  test("produces correct JSON-LD output", async () => {
    const data = { Person: { name: "Alice" } };
    const options = { ontologyIri: "http://example.org/onto" };
    const result = await generateOntology(data, options);
    expect(result["@context"].owl).toBe("http://www.w3.org/2002/07/owl#");
    expect(result["@context"].rdf).toBe("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    expect(result["@id"]).toBe("http://example.org/onto");
    expect(Array.isArray(result["@graph"])) .toBe(true);
    expect(result["@graph"][0]["@id"]).toBe("http://example.org/onto#Person");
    expect(result["@graph"][0].name).toBe("Alice");
  });

  test("includes @base when baseIri is provided", async () => {
    const data = { Person: { name: "Bob" } };
    const options = {
      ontologyIri: "http://example.org/onto",
      baseIri: "http://example.org/base",
    };
    const result = await generateOntology(data, options);
    expect(result["@context"]["@base"]).toBe("http://example.org/base");
  });
});

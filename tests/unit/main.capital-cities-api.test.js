import { describe, test, expect, vi } from "vitest";
import { getCapitalCities, PUBLIC_DATA_SOURCES } from "../../src/lib/main.js";

describe("getCapitalCities API", () => {
  const mockBindings = [
    { country: { value: "http://example.org/C1" }, capital: { value: "http://example.org/K1" } },
    { country: { value: "http://example.org/C2" }, capital: { value: "http://example.org/K2" } }
  ];
  const mockResponse = { results: { bindings: mockBindings } };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("fetches with correct URL and headers and returns JSON-LD", async () => {
    const endpoint = "https://dbpedia.org/sparql";
    const spy = vi.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    });

    const doc = await getCapitalCities(endpoint);
    const expectedUrlStart = `${endpoint}?query=`;
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`^${endpoint}\?query=`)), {
      headers: { Accept: "application/sparql-results+json" }
    });
    expect(doc).toEqual({
      "@context": { "@vocab": "http://www.w3.org/2002/07/owl#" },
      "@graph": [
        { "@id": "http://example.org/C1", capital: "http://example.org/K1" },
        { "@id": "http://example.org/C2", capital: "http://example.org/K2" }
      ]
    });
  });

  test("throws QUERY_ERROR on fetch failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("network fail"));
    await expect(getCapitalCities()).rejects.toMatchObject({ code: "QUERY_ERROR" });
  });

  test("throws INVALID_JSON on malformed JSON", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.reject(new Error("bad json"))
    });
    await expect(getCapitalCities()).rejects.toMatchObject({ code: "INVALID_JSON" });
  });

});
import { describe, test, expect, vi, afterEach } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";

describe("--query CLI flag", () => {
  const filePath = "file.json";
  const queryString = "ASK {}";

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("logs error when parameters missing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["--query"]);
    expect(errorSpy).toHaveBeenCalledWith("Missing required query parameters: file and sparql");
  });

  test("logs results on success", async () => {
    const results = { head: {}, boolean: true };
    const queryMock = vi.spyOn(mainModule, "sparqlQuery").mockResolvedValue(results);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--query", filePath, queryString]);
    expect(queryMock).toHaveBeenCalledWith(filePath, queryString);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(results, null, 2));
  });

  test("logs error message on failure", async () => {
    vi.spyOn(mainModule, "sparqlQuery").mockRejectedValue(new Error("query fail"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["--query", filePath, queryString]);
    expect(errorSpy).toHaveBeenCalledWith("query fail");
  });
});

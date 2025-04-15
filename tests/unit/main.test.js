import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Query OWL Option", () => {
  test("should output sample OWL query result when no additional parameter is provided", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--query-owl"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Sample OWL query output" }));
    logSpy.mockRestore();
  });
});

describe("Dynamic Query OWL Option", () => {
  test("should output dynamic OWL query result for provided query", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--query-owl", "cities"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "OWL query output for query: cities" }));
    logSpy.mockRestore();
  });
});

describe("Transform Option", () => {
  test("should output transformed ontology for valid JSON input", () => {
    const logSpy = vi.spyOn(console, "log");
    const jsonInput = JSON.stringify({ data: "example" });
    main(["--transform", jsonInput]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ "owl:transformed": { data: "example" } }));
    logSpy.mockRestore();
  });

  test("should output default transformed ontology output when provided invalid JSON", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--transform", "not-a-json"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Default OWL transformation output" }));
    logSpy.mockRestore();
  });

  test("should output default transformed ontology output when no additional parameter is provided", () => {
    const logSpy = vi.spyOn(console, "log");
    main(["--transform"]);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({ result: "Default OWL transformation output" }));
    logSpy.mockRestore();
  });
});

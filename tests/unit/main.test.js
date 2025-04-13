import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, query, diagnostics } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Query Command Output", () => {
  test("should log query message", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js", "--query"];
    query(["--query"]);
    expect(logSpy).toHaveBeenCalledWith("Querying OWL ontologies (Feature under development)");
    logSpy.mockRestore();
  });
});

describe("Diagnostics Command Output", () => {
  test("should log diagnostics info", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--diagnostics"];
    diagnostics(args);
    expect(logSpy).toHaveBeenCalledWith("System Diagnostics:");
    expect(logSpy).toHaveBeenCalledWith(`Node.js version: ${process.version}`);
    logSpy.mockRestore();
  });
});

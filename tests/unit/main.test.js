import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import pkg from "../../package.json" assert { type: "json" };

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", async () => {
    // Simulate a call without any special flags
    await main([]);
  });
});

describe("Version Flag", () => {
  test("should output the version from package.json", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => { captured += msg; };
    await main(["--version"]);
    console.log = originalLog;
    expect(captured).toContain(pkg.version);
  });
});

describe("Help Flag", () => {
  test("should display help information", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => { captured += msg; };
    await main(["--help"]);
    console.log = originalLog;
    expect(captured).toContain("Usage:");
    expect(captured).toContain("--help");
    expect(captured).toContain("CLI Help");
  });
});

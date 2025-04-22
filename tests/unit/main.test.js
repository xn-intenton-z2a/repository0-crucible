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

describe("Crawl Flag", () => {
  test("should simulate crawling public data sources", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => { captured += msg; };
    await main(["--crawl"]);
    console.log = originalLog;
    expect(captured).toContain("Crawling data from public data sources...");
  });
});

describe("Query OWL Flag", () => {
  test("should output sample OWL query JSON response", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => { captured += msg; };
    await main(["--query-owl"]);
    console.log = originalLog;

    // Assert that the output is valid JSON and contains the expected response
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error('Output is not valid JSON');
    }
    expect(parsed).toHaveProperty('result', 'Sample OWL query response');
    expect(parsed).toHaveProperty('data');
    expect(Array.isArray(parsed.data)).toBe(true);
  });
});

describe("Diagnostics Flag", () => {
  test("should output diagnostics information", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => { captured += msg; };
    await main(["--diagnostics"]);
    console.log = originalLog;
    expect(captured).toContain("Diagnostics: All systems are operational");
  });
});

describe("Capital Cities Flag", () => {
  test("should output JSON formatted list of capital cities", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => { captured += msg; };
    await main(["--capital-cities"]);
    console.log = originalLog;
    
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("capitals");
    expect(Array.isArray(parsed.capitals)).toBe(true);
  });
});

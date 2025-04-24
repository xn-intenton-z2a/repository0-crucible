import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import pkg from "../../package.json" assert { type: "json" };

// Utility function to capture console.log output
function captureOutput(callback) {
  const originalLog = console.log;
  let captured = "";
  console.log = (msg) => { captured += msg; };
  return callback().then(() => {
    console.log = originalLog;
    return captured;
  });
}

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Main Output", () => {
  test("should terminate without error", async () => {
    await main([]);
  });
});

describe("Version Flag", () => {
  test("should output the version from package.json", async () => {
    const captured = await captureOutput(() => main(["--version"]));
    expect(captured).toContain(pkg.version);
  });
});

describe("Version Details Flag", () => {
  test("should output detailed version metadata as JSON", async () => {
    const captured = await captureOutput(() => main(["--version-details"]));
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("version", pkg.version);
    expect(parsed).toHaveProperty("name", pkg.name);
    expect(parsed).toHaveProperty("description", pkg.description);
  });
});

describe("Help Flag", () => {
  test("should display enhanced help information", async () => {
    const captured = await captureOutput(() => main(["--help"]));
    expect(captured).toContain("Usage:");
    expect(captured).toContain("--help             Display detailed help information.");
    expect(captured).toContain("--version");
    expect(captured).toContain("--version-details");
    expect(captured).toContain("--diagnostics");
    expect(captured).toContain("--crawl");
    expect(captured).toContain("--capital-cities");
    expect(captured).toContain("--query-owl");
    // Check for usage examples
    expect(captured).toContain("node src/lib/main.js --capital-cities --country=Canada");
  });
});

describe("Crawl Flag", () => {
  test("should simulate crawling public data sources", async () => {
    const captured = await captureOutput(() => main(["--crawl"]));
    expect(captured).toContain("Crawling data from public data sources...");
  });
});

describe("Query OWL Flag", () => {
  test("should output sample OWL query JSON response", async () => {
    const captured = await captureOutput(() => main(["--query-owl"]));
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("result", "Sample OWL query response");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
  });
});

describe("Diagnostics Flag", () => {
  test("should output diagnostics information", async () => {
    const captured = await captureOutput(() => main(["--diagnostics"]));
    expect(captured).toContain("Diagnostics: All systems are operational");
  });
});

describe("Capital Cities Flag", () => {
  test("should output OWL compliant JSON representation of capital cities with at least 10 entries when no country filter is applied", async () => {
    const captured = await captureOutput(() => main(["--capital-cities"]));
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("owl", "ontology");
    expect(parsed).toHaveProperty("type", "capital-cities");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data.length).toBeGreaterThanOrEqual(10);
  });
});

describe("Capital Cities Country Filter", () => {
  test("should output only the entry for Canada when --country=Canada is used", async () => {
    const captured = await captureOutput(() => main(["--capital-cities", "--country=Canada"]));
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("owl", "ontology");
    expect(parsed).toHaveProperty("type", "capital-cities");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data.length).toBe(1);
    expect(parsed.data[0]).toHaveProperty("country", "Canada");
    expect(parsed.data[0]).toHaveProperty("capital", "Ottawa");
  });

  test("should output empty data array for a non-existent country filter", async () => {
    const captured = await captureOutput(() => main(["--capital-cities", "--country=Unknown"]));
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("owl", "ontology");
    expect(parsed).toHaveProperty("type", "capital-cities");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data.length).toBe(0);
  });
});

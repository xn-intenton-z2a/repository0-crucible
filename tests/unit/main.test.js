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
    console.log = (msg) => {
      captured += msg;
    };
    await main(["--version"]);
    console.log = originalLog;
    expect(captured).toContain(pkg.version);
  });
});

describe("Version Details Flag", () => {
  test("should output detailed version metadata as JSON", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => {
      captured += msg;
    };
    await main(["--version-details"]);
    console.log = originalLog;
    let parsed;
    try {
      parsed = JSON.parse(captured);
    } catch (e) {
      throw new Error("Output is not valid JSON");
    }
    expect(parsed).toHaveProperty("version", pkg.version);
    expect(parsed).toHaveProperty("name", pkg.name);
    expect(parsed).toHaveProperty("description", pkg.description);
    // repository is optional
  });
});

describe("Help Flag", () => {
  test("should display help information", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => {
      captured += msg;
    };
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
    console.log = (msg) => {
      captured += msg;
    };
    await main(["--crawl"]);
    console.log = originalLog;
    expect(captured).toContain("Crawling data from public data sources...");
  });
});

describe("Query OWL Flag", () => {
  test("should output sample OWL query JSON response", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => {
      captured += msg;
    };
    await main(["--query-owl"]);
    console.log = originalLog;
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
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => {
      captured += msg;
    };
    await main(["--diagnostics"]);
    console.log = originalLog;
    expect(captured).toContain("Diagnostics: All systems are operational");
  });
});

describe("Capital Cities Flag", () => {
  test("should output OWL compliant JSON representation of capital cities with at least 10 entries", async () => {
    const originalLog = console.log;
    let captured = "";
    console.log = (msg) => {
      captured += msg;
    };
    await main(["--capital-cities"]);
    console.log = originalLog;
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
    parsed.data.forEach(element => {
      expect(element).toHaveProperty("country");
      expect(typeof element.country).toBe("string");
      expect(element.country).not.toEqual("");
      expect(element).toHaveProperty("capital");
      expect(typeof element.capital).toBe("string");
      expect(element.capital).not.toEqual("");
    });
  });
});

import { describe, test, expect } from "vitest";
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

describe("Capital Cities Option", () => {
  test("should output capitalCities OWL ontology JSON with generatedAt timestamp", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--capital-cities"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("owl", "capitalCities");
    expect(parsed).toHaveProperty("data");
    expect(Array.isArray(parsed.data)).toBe(true);
    expect(parsed.data).toEqual([
      { country: "France", capital: "Paris" },
      { country: "Japan", capital: "Tokyo" },
      { country: "Brazil", capital: "Brasília" }
    ]);
    expect(parsed).toHaveProperty("generatedAt");
    const iso = new Date(parsed.generatedAt).toISOString();
    expect(iso).toEqual(parsed.generatedAt);
  });
});

describe("Diagnostics Option", () => {
  test("should output diagnostics JSON with required keys", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--diagnostics"]);

    console.log = originalLog;

    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty("nodeVersion", process.versions.node);
    expect(parsed).toHaveProperty("platform", process.platform);
    expect(parsed).toHaveProperty("availableCommands");
    expect(Array.isArray(parsed.availableCommands)).toBe(true);
    // Verify that some expected commands are included
    expect(parsed.availableCommands).toEqual(expect.arrayContaining([
      "--capital-cities",
      "--diagnostics",
      "--serve"
    ]));
  });
});

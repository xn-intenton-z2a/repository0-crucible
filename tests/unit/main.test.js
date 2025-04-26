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

describe("Capital Cities Ontology Generation", () => {
  test("should output valid JSON-LD with France node", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--capital-cities"]);
    expect(logSpy).toHaveBeenCalled();
    const logged = logSpy.mock.calls[0][0];
    const ontology = JSON.parse(logged);
    expect(ontology["@context"]).toBeDefined();
    expect(Array.isArray(ontology["@graph"])).toBe(true);
    const franceNode = ontology["@graph"].find((node) =>
      /France$/.test(node["@id"])
    );
    expect(franceNode).toBeDefined();
    expect(franceNode["hasCapital"]).toBe("Paris");
    logSpy.mockRestore();
  });
});

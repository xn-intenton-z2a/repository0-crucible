import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, calculatePiLeibniz } from "@src/lib/main.js";

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

describe("calculatePiLeibniz", () => {
  test.each([{ digits: 3 }, { digits: 5 }, { digits: 7 }])(
    "approximates π to %i decimal places within acceptable margin",
    ({ digits }) => {
      const approx = calculatePiLeibniz(digits);
      const actual = Number(Math.PI.toFixed(digits));
      expect(Math.abs(approx - actual)).toBeLessThan(Math.pow(10, -digits));
    }
  );
});

describe("CLI Output", () => {
  test("logs correct π for --digits option", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "5"]);
    expect(spy).toHaveBeenCalledWith(3.14159);
    spy.mockRestore();
  });
});

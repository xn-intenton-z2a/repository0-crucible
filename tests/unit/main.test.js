import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import {
  main,
  calculatePiLeibniz,
  calculatePiMonteCarlo,
  calculatePiChudnovsky,
  calculatePiRamanujanSato,
} from "@src/lib/main.js";
import fs from "fs";

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

describe("calculatePiMonteCarlo", () => {
  test("returns a number within plausible range for moderate samples", () => {
    const samples = 10000;
    const approx = calculatePiMonteCarlo(samples);
    expect(typeof approx).toBe("number");
    expect(approx).toBeGreaterThan(3.0);
    expect(approx).toBeLessThan(3.5);
  });
});

describe("calculatePiChudnovsky", () => {
  test("precision 2 yields within 0.01", () => {
    const approx = calculatePiChudnovsky(2);
    expect(Math.abs(approx - 3.14)).toBeLessThan(0.01);
  });
  test("precision 3 yields within 0.001", () => {
    const approx = calculatePiChudnovsky(3);
    expect(Math.abs(approx - 3.142)).toBeLessThan(0.001);
  });
});

describe("calculatePiRamanujanSato", () => {
  test("level 1, precision 2 yields within 0.01", () => {
    const approx = calculatePiRamanujanSato({ level: 1, digits: 2 });
    expect(Math.abs(approx - 3.14)).toBeLessThan(0.01);
  });
  test("level 1, precision 3 yields within 0.001", () => {
    const approx = calculatePiRamanujanSato({ level: 1, digits: 3 });
    expect(Math.abs(approx - 3.142)).toBeLessThan(0.001);
  });
});

describe("CLI Output", () => {
  test("logs correct π for --digits option", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "5"]);
    expect(spy).toHaveBeenCalledWith(3.14159);
    spy.mockRestore();
  });

  test("logs plausible π for montecarlo algorithm", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--algorithm", "montecarlo", "--samples", "50000"]);
    expect(spy).toHaveBeenCalled();
    const logged = spy.mock.calls[0][0];
    expect(typeof logged).toBe("number");
    expect(logged).toBeGreaterThan(3.0);
    expect(logged).toBeLessThan(3.5);
    spy.mockRestore();
  });

  test("logs correct π for chudnovsky algorithm", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--algorithm", "chudnovsky", "--digits", "3"]);
    expect(spy).toHaveBeenCalledWith(3.142);
    spy.mockRestore();
  });

  test("logs correct π for ramanujan-sato algorithm", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--algorithm", "ramanujan-sato", "--level", "1", "--digits", "3"]);
    expect(spy).toHaveBeenCalledWith(3.142);
    spy.mockRestore();
  });
});

describe("CLI Diagnostics", () => {
  test("logs diagnostics when --diagnostics is used for leibniz", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--digits", "5", "--diagnostics"]);
    expect(spy).toHaveBeenCalled();
    const callArg = spy.mock.calls[0][0];
    expect(callArg).toHaveProperty("algorithm", "leibniz");
    expect(callArg).toHaveProperty("digits", 5);
    expect(callArg).toHaveProperty("result", 3.14159);
    expect(callArg).toHaveProperty("iterations", expect.any(Number));
    expect(callArg).toHaveProperty("durationMs", expect.any(Number));
    spy.mockRestore();
  });

  test("logs diagnostics when --diagnostics is used for ramanujan-sato", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--algorithm", "ramanujan-sato", "--level", "1", "--digits", "3", "--diagnostics"]);
    expect(spy).toHaveBeenCalled();
    const callArg = spy.mock.calls[0][0];
    expect(callArg).toHaveProperty("algorithm", "ramanujan-sato");
    expect(callArg).toHaveProperty("digits", 3);
    expect(callArg).toHaveProperty("level", 1);
    expect(callArg).toHaveProperty("result", 3.142);
    expect(callArg).toHaveProperty("durationMs", expect.any(Number));
    spy.mockRestore();
  });
});

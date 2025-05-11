import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import {
  main,
  calculatePiLeibniz,
  calculatePiMonteCarlo,
  calculatePiChudnovsky,
} from "@src/lib/main.js";

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
});

// New diagnostics tests
describe("CLI Diagnostics", () => {
  test("Leibniz diagnostics", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--diagnostics", "--digits", "3"]);
    expect(spy).toHaveBeenCalledTimes(1);
    const output = spy.mock.calls[0][0];
    expect(output).toEqual(
      expect.objectContaining({
        algorithm: "leibniz",
        digits: 3,
        result: 3.142,
        durationMs: expect.any(Number),
        iterations: expect.any(Number),
      })
    );
    spy.mockRestore();
  });

  test("Monte Carlo diagnostics", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([
      "--diagnostics",
      "--algorithm",
      "montecarlo",
      "--samples",
      "1000",
    ]);
    expect(spy).toHaveBeenCalledTimes(1);
    const output = spy.mock.calls[0][0];
    expect(output).toEqual(
      expect.objectContaining({
        algorithm: "montecarlo",
        samples: 1000,
        result: expect.any(Number),
        durationMs: expect.any(Number),
        samplesUsed: 1000,
      })
    );
    spy.mockRestore();
  });
});

// New benchmark tests
describe("CLI Benchmark", () => {
  test("outputs benchmark results for all algorithms", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const fakePi = 3.14;
    vi.spyOn(mainModule, "calculatePiLeibniz").mockReturnValue(fakePi);
    vi.spyOn(mainModule, "calculatePiMonteCarlo").mockReturnValue(fakePi);
    vi.spyOn(mainModule, "calculatePiChudnovsky").mockReturnValue(fakePi);
    main(["--benchmark", "--digits", "2", "--samples", "1000"]);
    expect(spy).toHaveBeenCalledTimes(1);
    const logged = spy.mock.calls[0][0];
    const results = JSON.parse(logged);
    expect(results).toHaveLength(3);
    expect(results.map((r) => r.algorithm)).toEqual(
      expect.arrayContaining(["leibniz", "montecarlo", "chudnovsky"])
    );
    results.forEach((r) => {
      expect(r).toEqual(
        expect.objectContaining({
          algorithm: expect.any(String),
          result: fakePi,
          durationMs: expect.any(Number),
          error: expect.any(Number),
        })
      );
    });
    spy.mockRestore();
  });
});

# Chudnovsky Algorithm

Add high-precision computation of π using the Chudnovsky series, enabling rapid convergence for hundreds to thousands of decimal places.

# CLI Options

- `--algorithm chudnovsky`  Select the Chudnovsky method for π computation.
- `--digits <number>`        Number of decimal places (default: 5, max: 1000).

# Implementation

1. Add dependency `decimal.js` to package.json for arbitrary-precision arithmetic.
2. In `src/lib/main.js` implement `calculatePiChudnovsky(digits)`:
   - Use `Decimal` from `decimal.js` with precision set to `digits + 5` to manage rounding errors.
   - Compute the series term:
     - Constants: `C = 426880 * sqrt(10005)`
     - Summation: for k from 0 to `iterations` until term magnitude < `10^(-digits - 1)`:
       - numerator = `(-1)^k * factorial(6k) * (545140134k + 13591409)`
       - denominator = `factorial(3k) * (factorial(k))^3 * 640320^(3k)`
       - term = numerator / denominator
       - accumulate sum
   - π = C / sum, round to `digits` decimal places using `toFixed(digits)`.
3. Integrate into `main()` dispatch under `algorithm === "chudnovsky"`:
   - Validate `digits` ≤ 1000.
   - Capture start/end time and include `iterations` count in diagnostics.

# Testing

1. Add unit tests in `tests/unit/main.test.js`:
   - Mock or stub `Decimal` and factorial to return known values for small `digits` (e.g., 3, 5, 10).
   - Verify `calculatePiChudnovsky(3)` returns `3.142`, `calculatePiChudnovsky(5)` returns `3.14159`.
   - CLI tests:
     - `main(["--algorithm","chudnovsky","--digits","3"])` logs correct π string.
     - With `--diagnostics`, logs an object containing `{ algorithm: "chudnovsky", digits, result, durationMs, iterations }`.
2. Ensure tests restore stubs/mocks.

# Documentation

1. Update `docs/USAGE.md`:
   - Document `--algorithm chudnovsky` and `--digits` behavior.
   - Add example: `node src/lib/main.js --algorithm chudnovsky --digits 10` outputs `3.1415926536`.
2. Update `README.md` under Features:
   - Describe Chudnovsky method with sample CLI commands.

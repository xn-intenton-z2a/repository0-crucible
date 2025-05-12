# High Precision π Algorithms

Provide true arbitrary precision π computation using both the Chudnovsky and Ramanujan-Sato series with robust decimal arithmetic and BigInt support, replacing the current Leibniz fallback and enabling thousands of digits of precision.

# Implementation

1. Add a dependency:
   • decimal.js: npm install decimal.js@^10.4.3
2. In src/lib/main.js:
   a. Import Decimal from 'decimal.js'.
   b. Implement calculatePiChudnovsky(digits):
      - Set Decimal precision to digits + 10 guard digits.
      - Use BigInt and Decimal to compute each term of the Chudnovsky series until term magnitude < 10^-(digits+1).
      - Sum the series and compute π = C * 426880√10005 / seriesSum, rounding to the specified digits.
   c. Implement calculatePiRamanujanSato({level, digits}):
      - Set Decimal precision to digits + 10.
      - For k from 0 to level or until term magnitude < 10^-(digits+1), compute Ramanujan-Sato term using BigInt binomial coefficients and Decimal sums.
      - Sum reciprocal series to estimate π, rounding to specified digits.
3. Extend CLI parsing:
   - In CLIOptionsSchema, allow algorithm value 'ramanujan-sato' and add integer option --level (default 1).
   - After minimist, add zod validation for level: z.number().int().min(1).
4. Update main():
   - Detect algorithm 'ramanujan-sato' and call calculatePiRamanujanSato with opts.level and opts.digits.
   - Handle diagnostics and consistency: include level in output when diagnostics.
5. Update createApp():
   - Extend ApiParamsSchema to accept algorithm 'ramanujan-sato' and query parameter level.
   - In /pi, /pi/data, /pi/chart handlers, support ramanujan-sato behavior analogous to chudnovsky for result, data points, and chart.

# Testing

1. In tests/unit/main.test.js:
   - Add unit tests for calculatePiChudnovsky with small digits (2,3) comparing to known constants.
   - Add unit tests for calculatePiRamanujanSato with level 1 and digits 3, asserting result ~3.142.
   - Mock Decimal and factorial functions for predictable results when testing edge cases.
2. CLI tests:
   - Test main(['--algorithm','chudnovsky','--digits','3']) logs the correct numeric string.
   - Test main(['--algorithm','ramanujan-sato','--level','1','--digits','3','--diagnostics']) returns an object containing algorithm, level, digits, result, durationMs.
3. API tests in tests/unit/server.test.js:
   - Request /pi?algorithm=ramanujan-sato&digits=2&level=1 and expect JSON { result: 3.14 }.
   - Request /pi/data and /pi/chart endpoints with ramanujan-sato and level, verifying data arrays and PNG buffers.

# Documentation

1. Update docs/USAGE.md:
   - Document --algorithm chudnovsky and --algorithm ramanujan-sato with --digits and --level options.
   - Provide CLI examples for both algorithms with and without diagnostics.
2. Update README.md under Features:
   - Describe high-precision algorithms for Chudnovsky and Ramanujan-Sato, usage parameters, and performance notes.

Ensure alignment with the mission in MISSION.md to explore novel algorithms and generate high-precision results.
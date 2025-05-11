# Ramanujan-Sato Algorithm

# CLI Options

--algorithm ramanujan-sato   Select the Ramanujan-Sato series method for π computation
--level <number>             Series depth or iteration count (default: 1)
--digits <number>            Number of decimal places to calculate (default: 5)

# Implementation

1. Add dependency decimal.js to package.json for arbitrary-precision arithmetic.
2. In src/lib/main.js introduce calculatePiRamanujan(level, digits):
   - Configure Decimal precision to digits + 10.
   - For k from 0 to level (inclusive), compute series term according to Ramanujan-Sato formulas:
     * Use BigInt and Decimal to compute binomial coefficients C(2k,k), C(3k,k), C(6k,3k).
     * Compute numerator and denominator per series definition and accumulate sum.
   - Compute one over the sum and apply constant factors to derive π estimate.
   - Return a Number or string rounded to the specified digits via toFixed(digits).
3. In main(), detect algorithm === "ramanujan-sato" or "ramanujan":
   - Parse options.level and options.digits.
   - Invoke calculatePiRamanujan(level, digits).
   - Measure durationMs and handle diagnostics flag similarly to other algorithms.
   - Output numeric result or diagnostics JSON.

# Testing

1. In tests/unit/main.test.js add unit tests for calculatePiRamanujan:
   - For level 1 and digits 3, expect output approximately 3.142.
   - For level 1 and digits 5, expect output approximately 3.14159.
2. Add CLI tests:
   - Mock calculatePiRamanujan to return a fixed value; invoke main(["--algorithm","ramanujan-sato","--level","1","--digits","3"]); verify console.log called with 3.142 or diagnostics JSON when --diagnostics is passed.
3. Restore mocks after each test.

# Documentation

1. Update docs/USAGE.md to include:
   - Description of --algorithm ramanujan-sato, --level, and --digits options with example:
     node src/lib/main.js --algorithm ramanujan-sato --level 1 --digits 10
2. Update README.md under Features to describe the Ramanujan-Sato algorithm with a usage snippet.

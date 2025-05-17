# Purpose
Add a high-performance Chudnovsky algorithm implementation for π calculation to deliver rapid convergence and allow computing many digits efficiently.

# CLI Integration
Enhance the existing CLI to support a new algorithm option:

Option name: --algorithm   valid values: leibniz, spigot, montecarlo, chudnovsky
Default remains leibniz

Example invocation:
node src/lib/main.js --digits 50 --algorithm chudnovsky --output-format text

# Implementation Details
1. Add dependency decimal.js to package.json dependencies.  This library provides arbitrary precision decimal arithmetic.
2. In src/lib/main.js import Decimal from 'decimal.js'
3. Implement a new function calculatePiChudnovsky(digits) that:
   1. Sets Decimal precision to digits plus a guard (e.g. decimals + 10)
   2. Uses the Chudnovsky series with terms until target precision:
      - Term formula: M(k) * L(k) / X(k) where M, L, X follow standard definitions
      - Sum terms until the incremental change is below the precision threshold
   3. Returns the result formatted to the requested significant digits
4. In the calculatePi dispatcher add case 'chudnovsky' that calls calculatePiChudnovsky

# Tests
1. Add unit tests in tests/unit/main.test.js for calculatePi using the new algorithm:
   - verify calculatePi(1, chudnovsky) yields 3
   - verify calculatePi(5, chudnovsky) yields 3.1415
2. Add a CLI integration test:
   - invoking main(["--digits","10","--algorithm","chudnovsky"]) logs a string matching /^\d\.\d{9}$/ to console

# Documentation Updates
1. Update docs/USAGE.md to list chudnovsky as a valid algorithm option with example
2. Update README.md Features section to mention high-performance chudnovsky algorithm
3. Add a note in README.md on decimal.js dependency
# PI CALCULATION

# Overview
Implement computation of π to a user-specified number of decimal digits using the Chudnovsky algorithm for high performance and arbitrary precision.

# Behavior
- The CLI accepts a --digits <n> flag to calculate π to n decimal places. Without this flag, the tool retains its existing behavior of echoing arguments.
- When the --digits flag is provided, the tool calculates π to the requested precision and prints the result to standard output.
- The library exports a calculatePi function that takes an integer precision parameter and returns a string of π to that many decimal digits.

# Implementation Details
1. Add a dependency on decimal.js to support arbitrary precision arithmetic.
2. Implement calculatePi in src/lib/main.js using the Chudnovsky series:
   - Set Decimal precision to precision + guard digits.
   - Use a loop to sum terms of the Chudnovsky series until the added term is smaller than the rounding threshold.
   - Multiply the summed series by the constant factor and format the result to the requested precision.
3. Update the main function in src/lib/main.js to parse the --digits flag and invoke calculatePi when present.
4. Ensure proper rounding and trimming of trailing digits.
5. Update package.json dependencies to include decimal.js.

# Testing
- Add unit tests in tests/unit/main.test.js to verify calculatePi for precision values such as 1, 5, and 10, comparing against known π values.
- Add CLI tests to confirm that invoking node src/lib/main.js --digits n outputs the correct π string and exits with code 0.

# Documentation
- Update README.md to document the --digits flag with examples for both CLI usage and library API usage.

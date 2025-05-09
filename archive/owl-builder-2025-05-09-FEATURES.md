features/PI_CALCULATION.md
# features/PI_CALCULATION.md
# Overview

This feature implements the Chudnovsky series algorithm for high-precision calculation of π and integrates it into the existing CLI tool. Users can request π to an arbitrary number of decimal places up to a configurable limit.

# CLI Interface

Add a new option:

--pi <digits> (alias -p)

When invoked:
- Parse the digits parameter as an integer between 1 and 10000 (default 100).
- Invoke the Chudnovsky algorithm to compute π to the requested precision.
- Print the resulting decimal string to stdout.
- If the input is invalid, exit with a non-zero status and an error message.

# Implementation Details

1. In src/lib/main.js:
   - Extend argument parsing to recognize --pi / -p.
   - On detection, call calculatePi(digits) and bypass default behavior.

2. Introduce calculatePi(digits) in src/lib/pi.js (or inline in main.js):
   - Use the decimal.js library for arbitrary-precision arithmetic.
   - Implement the Chudnovsky series:
     - Precompute factorial terms and constants.
     - Iterate until convergence for the specified number of decimal places.
   - Return a string representation of π truncated or rounded to the requested precision.

3. Update package.json:
   - Add or verify decimal.js dependency.

# Testing and Validation

- Add unit tests in tests/unit/pi.test.js:
  - Typical cases: digits=1, 5, 15, 50.
  - Boundary cases: digits=1 and digits=10000.
  - Invalid inputs: zero, negative numbers, non-integers, non-numeric values.
- Update tests for main to cover:
  - Correct invocation of calculatePi and output formatting.
  - Error handling on invalid arguments.

# Documentation

- Update README.md under Features:
  - Describe the --pi option and usage examples:
      node src/lib/main.js --pi 10
      Expected output: 3.1415926535
- Document calculatePi API in README if main exports it.

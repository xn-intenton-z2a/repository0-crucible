# π Calculation Command

Add a new CLI flag to compute π to a specified number of decimal places using an efficient algorithm and output the result as plain text.

# Usage

When invoked with the --calculate-pi or -c flag followed by a positive integer, the tool calculates π to that many decimal places and prints it to stdout.

Example:

  node src/lib/main.js --calculate-pi 50

Expected output:

  3.14159265358979323846264338327950288419716939937510

# Implementation Details

1. Parse CLI arguments in main to detect --calculate-pi or -c and a following integer argument representing the number of digits (n).
2. Validate that n is an integer between 1 and 10000. On invalid input, display an error message and exit with nonzero status.
3. Use a reliable high-precision algorithm (e.g. Gauss–Legendre or Machin-like formula) with a big-number library (add dependency on big.js) to compute π to n decimal places.
4. Format the result with exactly n digits after the decimal point and print to stdout.
5. Add automated tests in tests/unit/main.test.js to:
   - Verify that --calculate-pi 1 prints 3.1
   - Verify that --calculate-pi 5 prints 3.14159
   - Confirm invalid inputs (non-integer, negative, or too large) cause the process to exit with an error.

# Documentation

- Update README.md to document the new flag, its purpose, and usage examples.
- Mention big.js dependency in package.json under dependencies.

# Dependencies

Add "big.js" to package.json dependencies to support arbitrary-precision arithmetic.

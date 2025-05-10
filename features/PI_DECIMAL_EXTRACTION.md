# PI Decimal Extraction Feature

# Overview
Add the ability to extract a block of decimal digits of π at an arbitrary position using the existing calculatePi function. This feature supports programmatic and CLI access to retrieve continuous digits without the hexadecimal limitation of the BBP algorithm.

# Functional Requirements
- Add function extractPiDecimal(position, count, algorithm) in src/lib/main.js
  - position: non-negative integer specifying the zero-based index into the continuous digit string of π (including the integer part and fractional digits)
  - count: positive integer number of decimal digits to return
  - algorithm: machin or gauss-legendre (default machin)
- Validate inputs: position >= 0, count >= 1, algorithm must be supported
- Internally compute digitsNeeded = position + count
- Call calculatePi(digitsNeeded, algorithm) to obtain a Decimal instance of π
- Convert the result to a plain string with fixed digitsNeeded decimal places, then remove the decimal point
- Return the substring of length count starting at index position

# CLI Interface
- Extend src/lib/main.js to accept flags
  --extract-decimal-position <n>
  --extract-decimal-count <n>
  --algorithm <machin|gauss-legendre>
- When --extract-decimal-position is provided:
  - Parse and validate position, count, and algorithm
  - Invoke extractPiDecimal and print the resulting digits string to stdout
  - Exit with code zero on success or non-zero on invalid inputs
- Update CLI help output to document the new flags and defaults

# Dependencies
- No new dependencies required; reuse Decimal.js and the existing calculatePi function

# Testing
- Add unit tests in tests/unit/main.test.js:
  - extractPiDecimal(0, 5) returns the first five digits including the integer part and fractional part as continuous string
  - extractPiDecimal(1, 4) returns the four digits immediately following the first digit
  - Validation rejects negative position or count less than 1
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --extract-decimal-position 0 --extract-decimal-count 4 and assert stdout matches expected prefix of π
  - Test invalid combinations exit with non-zero status and descriptive error messages
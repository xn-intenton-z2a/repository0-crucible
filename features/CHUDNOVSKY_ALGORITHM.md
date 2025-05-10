# Overview

Add support for the Chudnovsky algorithm for π calculation to improve performance and precision for large digit counts.

# Functional Requirements

- Extend calculatePi(digits, algorithm) in src/lib/main.js to accept algorithm value chudnovsky alongside machin and gauss-legendre.
- Validate that algorithm is one of machin, gauss-legendre, or chudnovsky and throw a descriptive error on invalid values.
- Implement the Chudnovsky series:
  - Compute constant C = 426880 × sqrt(10005).
  - Iterate k from 0 until the precision target is met; for each term compute:
    - numerator = factorial(6k) × (545140134k + 13591409)
    - denominator = factorial(3k) × (factorial(k) ^ 3) × (640320 ^ (3k))
    - term = numerator / denominator
  - Sum terms and compute π = C / sum.
- Preserve the existing Decimal precision settings (digits + 5) and use ROUND_DOWN rounding.

# CLI Interface

- In src/lib/main.js accept --algorithm chudnovsky flag alongside machin and gauss-legendre.
- When --algorithm chudnovsky is provided, calculate π using the new algorithm and print the result as plain text, respecting the --digits option.
- Update CLI help output to list chudnovsky as a supported algorithm option.

# Dependencies

- Use the existing decimal.js dependency; no new external dependencies are required.

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Verify calculatePi(5, chudnovsky) returns 3.14159.
  - Verify calculatePi(10, chudnovsky) returns 3.1415926535.
  - Test that invalid algorithm values still throw errors.
- Add CLI integration tests in tests/e2e/cli.test.js:
  - Invoke node src/lib/main.js --digits 10 --algorithm chudnovsky and assert stdout matches the expected prefix of π.
  - Invoke node src/lib/main.js --algorithm chudnovsky with default digits and assert exit code 0.
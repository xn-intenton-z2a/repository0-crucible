# PI Calculation Feature

## Overview
This feature provides arbitrary precision computation of π using Decimal.js with support for three algorithms: Machin, Gauss-Legendre, and Chudnovsky. It delivers accurate results to a specified number of decimal places and allows users to choose the most appropriate algorithm for performance or precision needs.

## Functional Requirements

- Export function `calculatePi(digits, algorithm)` in `src/lib/main.js`:
  - `digits`: positive integer between 1 and 1e6 (default 100).
  - `algorithm`: string, one of `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`).
  - Validate inputs and throw descriptive errors on invalid values.
  - Configure Decimal with precision = `digits + 5` and rounding mode ROUND_DOWN.
  - Implement Machin series as existing, using nested arctan series expansion.
  - Implement Gauss-Legendre algorithm as existing.
  - Implement Chudnovsky algorithm:
    - Compute constant C = 426880 × sqrt(10005).
    - Initialize sum = 0.
    - For k from 0 until the term drops below 1e-(digits+2):
      - Calculate numerator = factorial(6k) × (545140134k + 13591409).
      - Calculate denominator = factorial(3k) × (factorial(k)³) × (640320^(3k)).
      - Compute term = numerator / denominator and accumulate in sum.
    - Compute π = C / sum.
  - Return a Decimal instance representing π.

## CLI Interface

- Extend `main` in `src/lib/main.js` to accept flags:
  - `--digits <n>`
  - `--algorithm <machin|gauss-legendre|chudnovsky>`
  - `--threads <n>` (for parallel fallback)
  - `--help`
- Parse and validate flags, then:
  - If `threads > 1`, call `calculatePiParallel`, else call `calculatePi`.
  - Print result using `toFixed(digits, Decimal.ROUND_DOWN)`.
  - Exit with status code 0 on success, non-zero on errors.
- Update help output to list `chudnovsky` as supported algorithm.

## Dependencies

- Require `decimal.js`; no new dependencies needed.

## Testing

- Unit tests in `tests/unit/main.test.js`:
  - Verify `calculatePi(5, 'chudnovsky')` returns `3.14159`.
  - Verify `calculatePi(10, 'chudnovsky')` returns `3.1415926535`.
  - Confirm that `calculatePi` for all three algorithms matches known prefixes.
  - Test invalid algorithm values including `chudnovskyx` to throw errors.
- CLI tests in `tests/e2e/cli.test.js`:
  - Invoke CLI with `--digits 10 --algorithm chudnovsky` and assert stdout matches expected prefix.
  - Confirm that `--algorithm unknown` exits with error status and descriptive message.
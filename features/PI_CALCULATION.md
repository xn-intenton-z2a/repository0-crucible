# PI Calculation Feature

## Overview
This feature introduces arbitrary-precision computation of π using Decimal.js. It provides a core library function and CLI interface to calculate π to a specified number of digits with selectable algorithms. The focus is on delivering accurate results in text format, enabling users to benchmark different algorithms and integrate π computation into other workflows.

## Functional Requirements

- Support a `calculatePi(digits, algorithm)` function in the source file:
  - `digits` (integer): number of decimal places to compute (minimum 1, default 100).
  - `algorithm` (string): choice of calculation method (`machin` or `gauss-legendre`, default `machin`).
  - Return a Decimal instance representing π to the specified precision.

- CLI enhancements in `src/lib/main.js`:
  - Accept `--digits <n>` and `--algorithm <machin|gauss-legendre>` flags.
  - Validate inputs: digits must be a positive integer ≤ 1e6.
  - Compute π and output the result as a string to stdout.
  - On error, exit with a non-zero code and descriptive message.

## CLI Interface

- `node src/lib/main.js --digits 200 --algorithm gauss-legendre`
- Defaults: `--digits 100`, `--algorithm machin`.
- Help message updated to describe new options.

## Dependencies

- Add `decimal.js` dependency to `package.json`.
- Configure Decimal precision based on requested digits plus a small safety margin.

## Testing

- Add unit tests in `tests/unit/main.test.js`:
  - Verify `calculatePi(5)` returns `3.14159`.
  - Test algorithm selection yields consistent first few digits.
  - Test CLI invocation with `--digits 10` prints correct string without errors.

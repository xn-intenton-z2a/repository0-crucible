# PI Distribution JSON Feature

## Overview
Provide a machine-readable JSON representation of the frequency distribution of π digits for programmatic consumption and automated analysis.

## Functional Requirements

- Add function countPiDigitsJson(options) in src/lib/main.js
  - options.digits: positive integer (minimum 1, default 1000)
  - options.algorithm: "machin", "gauss-legendre", or "chudnovsky" (default "machin")
- Compute π using calculatePi with the specified digits and algorithm
- Remove the decimal point and count occurrences of each digit from "0" through "9"
- Return a plain object mapping each digit string to its integer count

## CLI Interface

- Extend src/lib/main.js to accept a flag:
  --distribution-json (boolean) to activate JSON output of digit counts
- When --distribution-json is provided:
  - Parse digits and algorithm from flags
  - Invoke countPiDigitsJson with parsed options
  - Print the JSON-formatted count object to stdout
  - Exit after printing
- Update CLI help output to document the new flag and its defaults

## Dependencies

- No new external dependencies required; use built-in string and object operations

## Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return a known digit sequence for a small count
  - Verify countPiDigitsJson returns the correct count object
  - Test validation of invalid digits and unsupported algorithms
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 20 --algorithm machin --distribution-json
  - Assert output is valid JSON with keys "0" through "9" and correct counts
  - Test invalid flags yield descriptive errors and non-zero exit codes
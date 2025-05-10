# PI Statistical Tests Feature

## Overview

Enable users to perform a suite of statistical randomness tests on the computed digits of π. This feature helps assess the uniformity and independence of digit sequences through established test methods.

## Functional Requirements

- Add function testPiRandomness(options) in src/lib/main.js
  - options.digits: positive integer specifying total digits (including integer part; minimum 1; default 1000)
  - options.algorithm: one of machin, gauss-legendre, or chudnovsky (default machin)
  - options.tests: array of strings indicating which tests to run (supported values chi-squared, runs, serial-correlation; default all)
  - options.pValueThreshold: number between 0 and 1 (default 0.05)
- Compute π as a continuous digit string by calling calculatePi
- For each requested test:
  - Chi-squared frequency test: count occurrences of digits 0–9, compute chi-squared statistic against uniform expected frequency, compute p-value using chi-square distribution
  - Runs test: map digits to above or below the median digit value, count runs, compute test statistic and p-value using normal approximation
  - Serial correlation test: compute correlation coefficient between each digit and its successor, compute test statistic and p-value
- Assemble results into an object mapping each test name to an object containing statistic, pValue, and pass (boolean indicating pValue >= pValueThreshold)
- Return the assembled results object

## CLI Interface

- Update src/lib/main.js to accept flags:
  --randomness-tests <list>   Comma separated list of tests (chi-squared,runs,serial-correlation)
  --randomness-output <format>  Output format text or json (default text)
  --randomness-pvalue <n>     P-value threshold for pass criteria (0 < n < 1; default 0.05)
- When --randomness-tests is provided:
  - Parse digits, algorithm, randomness-tests, randomness-output, and randomness-pvalue
  - Invoke testPiRandomness with parsed options
  - If randomness-output is json, print JSON string of results to stdout
  - Otherwise, print each test name, statistic, pValue, and pass status in human-readable lines
  - Exit with status code 0 on success, non-zero on invalid inputs
- Update CLI help to document new randomness flags

## Dependencies

- No new external dependencies; use built-in Math functions and an approximate implementation for p-value calculations

## Testing

- Unit Tests in tests/unit/main.test.js:
  - Mock calculatePi to return fixed sequences with known properties and verify each test function computes correct statistic and pValue
  - Verify invalid test names or p-value thresholds produce descriptive errors
- CLI Integration Tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 20 --randomness-tests chi-squared,runs --randomness-output json and assert JSON contains expected keys and value types
  - Test text output format produces readable lines for each test
  - Test invalid flags or unsupported test names yield descriptive errors and non-zero exit code
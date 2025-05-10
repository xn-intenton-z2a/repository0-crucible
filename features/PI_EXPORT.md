# PI Export Feature

## Overview

Provide users with the ability to save the computed value of π directly to a file in text or JSON format. This feature complements the existing CLI output and enables integration with workflows that require the π digits in a persistent file.

## Functional Requirements

- Add function exportPi(options) in src/lib/main.js
  - options.digits: positive integer specifying the number of decimal places (minimum 1, default 100)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.output: string path to the output file (required)
  - options.format: string specifying output format, either txt or json (default txt)
- Compute piValue by calling calculatePi(options.digits, options.algorithm)
- Format output:
  - For txt format, write the piValue string directly to the file
  - For json format, write a JSON object {"pi": piValue} to the file
- Ensure atomic file writes using built-in fs promises and write to a temporary file before renaming to the target filename
- Validate inputs: digits ≥ 1, algorithm must be supported, output path must be provided, format must be either txt or json

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --export-file <path>
  --export-format <txt|json>
- When --export-file is provided, invoke exportPi with parsed flags and exit after writing the file
- Update CLI help output to document export-file and export-format flags and defaults

## Dependencies

- Use built-in fs and fs promises APIs; no new dependencies required

## Testing

- Add unit tests in tests/unit/main.test.js to:
  - Mock fs operations to verify correct file path, content, and atomic write behavior for both txt and json formats
  - Validate input parameter handling and error conditions
- Add CLI tests in tests/e2e/cli.test.js to:
  - Invoke the CLI with --digits 10 --algorithm machin --export-file pi.txt and assert that the file exists with correct pi digits
  - Invoke the CLI with --export-file pi.json --export-format json and verify that the file contains a valid JSON object with the pi value
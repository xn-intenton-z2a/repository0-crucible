# PI Export Feature

## Overview
Provide users the ability to save the computed value of π directly to a plain text file, facilitating further analysis or sharing without manual copy-paste operations.

## Functional Requirements

- Add function exportPi(options) in src/lib/main.js
  - options.digits: positive integer specifying the number of decimal places (minimum 1, default 100)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.output: string path to the output file (required)
- Compute piValue by calling calculatePi(options.digits, options.algorithm)
- Format the output string: a decimal string with exactly options.digits fractional digits (truncate extras)
- Write the output string to the specified file using fs/promises
  - Perform atomic file writes by writing to a temporary file and renaming it
- Validate inputs with descriptive errors: digits ≥ 1, algorithm supported, output path provided

## CLI Interface

- Extend src/lib/main.js to accept flag:
  --export <path>
- When --export is provided:
  - Parse digits, algorithm, and export path from flags
  - Invoke exportPi with parsed options
  - On success, print a confirmation message and exit
  - On error, print descriptive error and exit with non-zero code
- Update CLI help output to document the --export flag and defaults for digits and algorithm

## Dependencies

- Use built-in fs and fs/promises APIs; no new external dependencies required

## Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock fs/promises to verify correct file path and content for a sample calculation
  - Test validation error scenarios: missing output path, invalid digits, unsupported algorithm
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 10 --algorithm machin --export pi.txt and assert that pi.txt is created with the correct content
  - Test error handling when the output path is missing or invalid
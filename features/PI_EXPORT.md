# PI Export Feature

## Overview
Provide users the ability to save the computed value of π directly to a file, with optional gzip compression support for large outputs. This facilitates further analysis or sharing, and ensures efficient storage when handling very large digit lengths.

## Functional Requirements

- Enhance the existing exportPi(options) function in src/lib/main.js:
  - options.digits: positive integer specifying the number of fractional decimal places (minimum 1, default 100).
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin).
  - options.output: string path to the output file (required).
  - options.compress: boolean indicating whether to gzip-compress the output (default false).
- Compute piValue by calling calculatePi(options.digits, options.algorithm).
- Format the output string: a decimal string with exactly options.digits fractional digits (truncate extras).
- If options.compress is true or the output filename ends with .gz:
  - Use zlib.promises.gzip to compress the UTF-8 string.
  - Write the resulting Buffer to the specified file; otherwise write the plain string.
- Perform atomic file writes using fs/promises:
  - Write to a temporary file in the same directory.
  - Rename the temporary file to the target path to avoid partial writes.
- Validate inputs with descriptive errors: digits ≥ 1, supported algorithm, output path provided, and correct boolean for compress.

## CLI Interface

- Extend the CLI in src/lib/main.js to accept new flags:
  --export <path>         Path to the output file
  --gzip                  Enable gzip compression (alias for --compress)
  --compress              Enable gzip compression
- Behavior:
  - When --export is provided, parse digits, algorithm, export path, and compress flags.
  - Determine compression by the presence of compress flag or a .gz extension on the export path.
  - Invoke exportPi with the parsed options.
  - On success, print a confirmation message indicating file path and compression status, then exit with code 0.
  - On error, print a descriptive error to stderr and exit with a non-zero code.
- Update CLI help output to document the new flags and defaults.

## Dependencies

- Use built-in zlib module (import { gzip } from 'zlib').
- Use built-in fs/promises; no new external dependencies required.

## Testing

- Unit Tests in tests/unit/main.test.js:
  - Mock fs/promises and zlib.promises.gzip:
    - Verify that invoking exportPi with compress=false writes the plain file content.
    - Verify that invoking exportPi with compress=true or .gz extension calls gzip and writes compressed data.
  - Test validation error scenarios: missing output path, invalid digits, unsupported algorithm, invalid compress type.
- CLI Integration Tests in tests/e2e/cli.test.js:
  - Invoke CLI with --digits 10 --algorithm machin --export pi.txt --compress and assert:
    - pi.txt exists with plain content beginning with '3.1415926535...'.
  - Invoke CLI with --digits 10 --algorithm machin --export pi.txt.gz and assert:
    - pi.txt.gz exists and its first two bytes are 0x1f and 0x8b (gzip signature).
  - Test that missing output path or invalid gzip flag usage produces descriptive errors and non-zero exit codes.
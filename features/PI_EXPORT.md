# PI Export Feature

## Overview

Provide users the ability to save the computed value of π directly to a file with options for decimal places, algorithm, output format, and numeral base. This enhancement extends the existing export feature to support binary and hexadecimal representations.

## Functional Requirements

- Enhance function exportPi(options) in src/lib/main.js
  - options.digits: positive integer specifying the number of decimal places (minimum 1, default 100)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.output: string path to the output file (required)
  - options.format: txt or json (default txt)
  - options.base: integer specifying numeral base; allowed values 2, 10, or 16 (default 10)
- Compute piValue by calling calculatePi(options.digits, options.algorithm)
- Convert piValue to a string representation according to options.base
  - For base 10, use the standard decimal string
  - For base 16 or base 2, produce a lowercase representation of the integer and fractional parts and prefix with 0x or 0b
- Format output:
  - For txt format, write the converted string directly to the file
  - For json format, write a JSON object {"pi": convertedString, "base": options.base}
- Ensure atomic file writes using fs promises and writing to a temporary file before renaming
- Validate inputs: digits ≥ 1, algorithm must be supported, output path provided, format must be txt or json, base must be one of 2, 10, or 16

## CLI Interface

- Extend src/lib/main.js to accept flags
  --export-file <path>
  --export-format <txt|json>
  --export-base <2|10|16>
- When --export-file is provided, invoke exportPi with parsed flags and exit after writing the file
- Update CLI help output to document the export-file, export-format, and export-base flags and defaults

## Dependencies

- Use built-in fs and fs promises APIs; no new dependencies required

## Testing

- Add unit tests in tests/unit/main.test.js
  - Mock fs operations to verify correct file path, content, and atomic write behavior for txt and json formats across bases
  - Validate input parameter handling and error conditions for unsupported base values
- Add CLI tests in tests/e2e/cli.test.js
  - Invoke the CLI with --digits 10 --algorithm machin --export-file pi.hex --export-format txt --export-base 16 and assert file begins with 0x and contains correct hex digits
  - Invoke the CLI with --export-file pi.bin --export-format json --export-base 2 and verify the JSON object includes the binary representation and base
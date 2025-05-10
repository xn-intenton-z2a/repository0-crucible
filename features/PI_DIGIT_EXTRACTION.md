# PI Digit Extraction Feature

## Overview
Add the ability to extract a specific block of hexadecimal digits of π at an arbitrary position using the Bailey–Borwein–Plouffe BBP algorithm without computing all preceding digits. This enables random access to π digits for analysis or verification tasks.

## Functional Requirements
- Function extractPiHex(position, count) in src/lib/main.js
  - position: non-negative integer specifying the zero-based index of the first hexadecimal digit to extract (minimum 0)
  - count: positive integer number of hex digits to return (default 1)
  - Compute digits using the BBP series formula in base 16
  - Return a lowercase hexadecimal string without prefix
- Validate inputs: position ≥ 0, count ≥ 1

## CLI Interface
- Extend src/lib/main.js to accept flags
  --extract-position <n>
  --extract-count <n>
- When --extract-position is provided, invoke extractPiHex with parsed flags and print the hex string to stdout
- Update CLI help output to document the extraction flags and defaults

## Dependencies
- No new external dependencies; implement BBP formula using built-in BigInt and numeric operations

## Testing
- Add unit tests in tests/unit/main.test.js to verify extractPiHex:
  - extractPiHex(0, 4) returns 243f
  - extractPiHex(1, 3) returns 43f
- Test validation rejects negative position and count less than 1
- Add CLI tests in tests/e2e/cli.test.js to invoke the CLI with extraction flags and assert correct stdout output
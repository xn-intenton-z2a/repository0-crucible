# PI Digit Search Feature

## Overview
Add the ability to search for a numeric substring within the computed digits of π and retrieve its position or all occurrences. This feature enables users to find specific patterns in π digits without manual scanning.

## Functional Requirements

- Implement function searchPi(pattern, options) in src/lib/main.js
  - `pattern`: string of one or more numeric characters
  - `options.digits`: positive integer specifying how many digits to compute (minimum 1, default 1000)
  - `options.algorithm`: one of `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`)
  - `options.all`: boolean indicating whether to return all match positions (default `false`)
- Compute π using calculatePi with the specified digits and algorithm
- Convert the π value to a continuous digit string by removing the decimal point
- Validate that `pattern` contains only digits and its length does not exceed `options.digits`
- Search the digit string for pattern occurrences
  - If `options.all` is false, return the first 1-based index of the match or -1 if not found
  - If `options.all` is true, return an array of all 1-based match indices (empty array if none)
- Return a number or array of numbers accordingly

## CLI Interface

- Extend src/lib/main.js to accept flags:
  - `--search <pattern>` to specify the digit pattern to locate
  - `--digits <n>` to control computation length
  - `--algorithm <machin|gauss-legendre|chudnovsky>` to choose the algorithm
  - `--all` to request all match positions
- When `--search` is provided, invoke `searchPi` and print JSON to stdout:
  - If `--all` is absent, output `{ "position": <number|null> }`
  - If `--all` is present, output `{ "positions": [<numbers>] }`
- Exit with code zero on success; non-zero on validation errors

## Dependencies

- No additional dependencies required; leverage existing functions and built-in APIs

## Testing

- Add unit tests in tests/unit/main.test.js to:
  - Verify `searchPi` finds patterns at the beginning, middle, and end of a known π prefix
  - Confirm validation rejects non-digit patterns and patterns longer than available digits
- Add CLI tests to invoke src/lib/main.js with sample flags (e.g., `--search 314 --digits 10`) and assert JSON output and exit codes
# PI Digit Search Feature

## Overview
Add the ability to search for a numeric substring within the computed digits of π and retrieve its position or all occurrences. This feature enables users to find specific patterns in π digits without manual scanning.

## Functional Requirements

- Implement function `searchPi(pattern, options)` in `src/lib/main.js`:
  - `pattern`: string of one or more numeric characters to locate in π
  - `options.digits`: positive integer specifying the total number of digits to compute (minimum 1, default 1000)
  - `options.algorithm`: one of `machin`, `gauss-legendre`, or `chudnovsky` (default `machin`)
  - `options.all`: boolean indicating whether to return all match positions (default `false`)
- Internally:
  - Compute π to `options.digits` using `calculatePi`
  - Convert the result to a continuous digit string by removing the decimal point
  - Validate `pattern` contains only digits and its length does not exceed `options.digits + 1` (including integer part)
  - Search the digit string for occurrences of `pattern`:
    - If `options.all` is false, return the 1-based index of the first match or `-1` if not found
    - If `options.all` is true, return an array of all 1-based match indices (empty array if none)
- Export `searchPi` so it can be used programmatically

## CLI Interface

- Extend `main` in `src/lib/main.js` to accept flags:
  - `--search <pattern>` to specify the digit substring to locate
  - `--digits <n>` to set how many π digits to compute
  - `--algorithm <machin|gauss-legendre|chudnovsky>` to choose the algorithm
  - `--all` to request all match positions
- When `--search` is provided:
  - Parse and validate `pattern`, `digits`, `algorithm`, and `all` flags
  - Invoke `searchPi({ pattern, digits, algorithm, all })`
  - Print JSON to stdout:
    - If `all` is false: `{ "position": <number|null> }`
    - If `all` is true: `{ "positions": [<numbers>] }`
  - Exit with code `0` on success or non-zero on validation errors

## Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Mock `calculatePi` to return a known digit string for a small digit count
  - Verify `searchPi('314', { digits: 10, algorithm: 'machin' })` returns correct index
  - Test with `all=true` returns an array of all match positions
  - Ensure invalid `pattern` (non-digits or too long) throws descriptive errors
- **CLI Integration Tests** in `tests/e2e/cli.test.js`:
  - Invoke the CLI with `--search 314 --digits 10` and assert stdout is JSON `{ "position": 1 }`
  - Invoke with `--search 14 --digits 10 --all` and assert JSON `{ "positions": [2,?] }`
  - Test invalid combinations produce non-zero exit codes and error messages
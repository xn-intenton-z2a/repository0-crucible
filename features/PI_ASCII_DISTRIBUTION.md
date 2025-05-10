# PI ASCII Distribution Feature

## Overview
Provide a lightweight, text-based bar chart of digit frequencies in the computed value of π directly in the console. This feature complements the existing PNG distribution chart by offering an immediate, dependency-free visualization in any terminal or CI environment.

## Functional Requirements

- Add function visualizePiDigitsText(options) in src/lib/main.js
  - options.digits: positive integer (minimum 1, default 1000)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.width: positive integer specifying maximum bar width in characters (minimum 10, default 50)
- Compute π using calculatePi with the specified digits and algorithm
- Remove the decimal point and count occurrences of each digit 0 through 9
- Determine the maximum frequency among digits to scale bar lengths
- For each digit from 0 to 9, construct a console line:
  - `<digit> | <bar> <count>`
  - Bar is a repeated character (e.g., `#`) proportional to frequency relative to max, scaled to options.width
- Return a single string consisting of 10 lines separated by newlines

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --ascii-distribution (boolean) to activate ASCII chart output
  --ascii-width <n> to set the maximum bar width
- When --ascii-distribution is provided:
  - Parse digits, algorithm, ascii-width from flags
  - Invoke visualizePiDigitsText with parsed options and print the returned string to stdout
  - Exit after printing
- Update CLI help output to document the new flags and defaults

## Dependencies

- No new external dependencies required; use built-in string operations

## Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return a known digit sequence for a small digit count
  - Verify visualizePiDigitsText returns correctly formatted lines, bar lengths, and counts
  - Test scaling behavior with varying width settings
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 20 --algorithm machin --ascii-distribution and assert the output contains 10 lines with expected counts and proportional bars
  - Test invalid ascii-width values (zero or non-integer) result in descriptive errors
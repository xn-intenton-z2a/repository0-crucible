# PI ASCII Convergence Feature

## Overview
Provide a lightweight, text-based line chart of the convergence error of π approximations directly in the console. This complements the PNG convergence chart by offering an immediate, dependency-free visualization in any terminal or CI environment.

## Functional Requirements

- Add function visualizePiConvergenceText(options) in src/lib/main.js
  - options.digits: positive integer (minimum 10, default 1000)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.iterations: positive integer number of sample points (minimum 2, default 10)
  - options.width: positive integer specifying maximum chart width in characters (minimum 10, default 50)
- Compute convergence data by calculating π samples at increasing precision and measuring absolute error relative to final π
- Scale error values to the maximum error to determine line height positions in characters
- Construct an ASCII chart with rows representing normalized error thresholds and columns for each sample point, using a character (e.g., `*`) to mark error values
- Return a multiline string representing the chart, including axis labels or annotations for clarity

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --ascii-convergence (boolean) to activate ASCII convergence chart
  --ascii-convergence-width <n> to set maximum chart width
- When --ascii-convergence is provided:
  - Parse digits, algorithm, iterations, and ascii-convergence-width from flags
  - Invoke visualizePiConvergenceText with parsed options and print the returned string to stdout
  - Exit after printing
- Update CLI help output to document the new flags and defaults

## Dependencies

- No new external dependencies; use built-in string and console operations

## Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return known approximations and error values for small digits and iterations
  - Verify visualizePiConvergenceText returns correctly formatted ASCII chart lines with expected markers and scaling
  - Test varying width settings and minimal inputs
- Add CLI tests in tests/e2e/cli.test.js:
  - Invoke CLI with --digits 20 --algorithm machin --iterations 5 --ascii-convergence and assert output contains expected number of lines and markers
  - Test invalid ascii-convergence-width values result in descriptive errors
# Overview

Introduce a new flag to let users choose which algorithm to use for π calculation. Users can select from supported implementations to compare convergence speed and accuracy, or to employ specialized methods like Chudnovsky for high-precision results.

# CLI Interface

- Add flag --algorithm or -a followed by one of the following values:
  - `machin` (default): a Machin-like arctangent series implementation
  - `chudnovsky`: the Chudnovsky fast converging series
  - `bbp`: the Bailey-Borwein-Plouffe digit extraction formula
- Example usage:
  node src/lib/main.js --digits 100 --algorithm chudnovsky

# Implementation Details

- Extend the calculatePi function signature in src/lib/main.js to accept an optional algorithm parameter.
- Create separate internal functions:
  - calculatePiMachin(digits)
  - calculatePiChudnovsky(digits)
  - calculatePiBBP(digits)
- In calculatePi, use a switch or mapping on the algorithm argument to dispatch to the chosen function.
- Validate that the algorithm argument matches one of the supported names and throw an error on unknown values.
- Ensure all three algorithms produce identical output for small digit counts (e.g., first 10 digits) for consistency tests.

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Verify calculatePi with each algorithm flag returns correct known values (e.g., π to 5 or 10 digits).
  - Test that missing or unrecognized algorithm values result in a descriptive error.
  - Confirm default behavior uses the Machin implementation when no flag is provided.
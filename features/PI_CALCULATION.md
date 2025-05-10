# PI Calculation Feature

## Overview
This feature provides arbitrary precision computation of π using Decimal.js with support for three algorithms: Machin, Gauss-Legendre, and Chudnovsky. It delivers accurate results to a specified number of decimal places and allows users to choose the most appropriate algorithm for performance or precision needs.

## Functional Requirements

- Function calculatePi(digits, algorithm) in source file
  - digits must be a positive integer with a minimum of 1 and default of 100
  - algorithm must be one of machin, gauss-legendre, or chudnovsky with default machin
  - return a Decimal instance representing π to the requested precision
- Machin algorithm remains as existing implementation
- Gauss-Legendre algorithm remains as existing implementation
- Chudnovsky algorithm implementation:
  - use the series constant C equals 426880 times square root of 10005
  - iterate k from zero to the required number of terms to reach the precision target
  - accumulate terms based on factorial formulas and powers until convergence
  - divide the constant C by the series sum to produce π

## CLI Interface

- Extend src/lib/main.js to accept flags --digits <n> and --algorithm <machin|gauss-legendre|chudnovsky>
- Validate that digits is an integer up to one million and algorithm is one of the supported values
- Compute π using calculatePi and print the result as plain text to standard output
- On invalid inputs or errors exit with non zero code and descriptive error message
- Update help output to list the three algorithms and default parameter values

## Dependencies

- Require decimal.js for arbitrary precision arithmetic
- Configure Decimal precision to digits plus safety margin before computing

## Testing

- Add unit tests in tests/unit/main.test.js to verify calculatePi for each algorithm
  - confirm first five digits of π are correct for machin, gauss-legendre, and chudnovsky
  - test algorithm parameter validation rejects unsupported values
- Add CLI tests to invoke src/lib/main.js with --digits 10 and --algorithm chudnovsky and verify output and exit code
- Ensure performance for small digit counts remains acceptable in test environment
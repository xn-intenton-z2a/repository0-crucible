# PI_CALCULATOR

# Description

Adds a command line option to compute π to a specified number of decimal places using the Gauss-Legendre algorithm with arbitrary precision support via decimal.js, and provides an optional benchmarking mode to measure and report the computation duration.

# CLI Usage

node src/lib/main.js --pi <digits> [--benchmark]

--pi        Number of decimal places to compute π
--benchmark Optional flag; when provided, report the time taken to compute π in milliseconds

# Implementation

- Add dependency decimal.js if not already present
- Extend argument parser in main to detect:
  - --pi <digits> (required)
  - --benchmark (optional boolean flag)
- If benchmark mode is enabled:
  - Record a high-resolution start time before executing the π computation
- Use the Gauss-Legendre iterative algorithm with Decimal objects to compute π to the requested precision as before
- After computation:
  - If benchmark mode is enabled, record end time, compute elapsed time in milliseconds
  - Print the π string to stdout
  - If benchmark mode is enabled, print a second line: Computation Time: <elapsed> ms

# Testing

- Verify known π values for digits 0, 1, 3, 5 remain correct
- Confirm that invoking main without --benchmark prints only the π string
- Confirm that invoking main with --benchmark prints π string followed by a line matching /^Computation Time: \d+(\.\d+)? ms$/
- Test error handling or usage output for invalid, missing, or non-numeric --pi inputs
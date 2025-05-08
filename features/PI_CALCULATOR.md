# Overview

Implement a basic π calculation module using the Leibniz series. Provide CLI options to specify the algorithm and the number of decimal digits to compute, enabling users to generate an approximate value of π to a desired precision.

# Implementation

1. Command-Line Interface
   • Extend `src/lib/main.js` to parse CLI arguments using minimist:
     - `--algorithm <leibniz>` to select the π calculation algorithm. Only 'leibniz' is supported in this phase.
     - `--digits <n>` to specify the number of decimal digits to compute (default: 10).
     - `--help` to display usage information.
2. Leibniz Series Algorithm
   • Implement the Leibniz series: π = 4 * Σ_{k=0 to N-1} ((-1)^k / (2k + 1)).
   • Determine the number of iterations N based on the requested digits (for example, N = digits × 10000 to balance precision and performance).
   • Use native JavaScript Number type for initial implementation; convert the result to a string with the specified decimal precision.
   • Return the result as a string with the specified number of decimal places.
3. Output
   • Print the computed π value to stdout.
   • Exit with code 0 on success and return a non-zero code on invalid input.

# Testing

- Add unit tests in `tests/unit/pi-calculator.test.js`:
  • Validate correct parsing of CLI options.
  • Test `--algorithm leibniz --digits 2` outputs '3.14'.
  • Verify error on unsupported algorithm values.
  • Confirm default behavior when options are omitted.

# Documentation

- Update `README.md`:
  • Document the new CLI flags `--algorithm` and `--digits`.
  • Provide usage examples illustrating different digit lengths and algorithm selection.
  • Describe algorithm support and its limitations in terms of convergence and performance.
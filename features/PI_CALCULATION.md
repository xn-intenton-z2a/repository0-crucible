# Overview

Enhance the pi CLI subcommand to support multiple algorithms including the high-performance Chudnovsky algorithm for arbitrary precision π calculation. Maintain existing Leibniz series support and performance metrics.

# CLI Usage

Add or update the existing pi command with new flags:

--algorithm: one of leibniz or chudnovsky (default leibniz)
--digits: positive integer specifying number of decimal places to compute (only used with chudnovsky)
--iterations: positive integer specifying number of terms to sum (only used with leibniz)

Examples:
  node src/lib/main.js pi --algorithm chudnovsky --digits 1000
  node src/lib/main.js pi --algorithm leibniz --iterations 500000

# Algorithms

## Leibniz series

Retain the existing partial-sum implementation for simple approximations when algorithm is leibniz. Results are rounded to six decimal places.

## Chudnovsky algorithm

Implement the Chudnovsky formula for rapid convergence. Use a high-precision decimal library to compute π to the specified number of digits. Ideal for medium to high precision without excessive iterations.

# Output

In text mode:

- Print the algorithm used
- Print the computed value of π. For chudnovsky include the full digits requested, for leibniz round to six decimals
- Print total execution time in milliseconds
- Print peak memory usage in bytes

# Implementation Details

- Update src/lib/main.js to parse and validate --algorithm, --digits, and --iterations flags
- Default algorithm to leibniz and require --digits only for chudnovsky, --iterations only for leibniz
- Add decimal.js as a new dependency for arbitrary-precision calculations
- Create src/lib/algorithms/chudnovsky.js exporting computePiChudnovsky(digits) that returns { value, durationMs, peakMemoryBytes }
- Refactor existing src/lib/algorithms/leibniz.js to live in the same algorithms folder
- Extend tests in tests/unit/main.test.js to cover both algorithms, including error handling for invalid flag combinations
- Update README.md to document the algorithm and digits options with usage examples

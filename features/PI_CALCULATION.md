# Overview

Enhance the pi CLI subcommand to support configurable algorithm selection and arbitrary-precision calculations. Users can choose between the lightweight Leibniz series for quick, low-precision results or the high-performance Chudnovsky algorithm for precise, large-digit computations.

# CLI Usage

Extend the existing pi command with two new flags:

--algorithm <algorithm>
    Specify which algorithm to use. Supported values:
      • leibniz (default) – simple alternating series
      • chudnovsky – fast convergence for high precision

--digits <number>
    Positive integer for the number of decimal places to compute. Required for chudnovsky, ignored for leibniz.

--iterations <number>
    Positive integer for the number of terms to sum. Required for leibniz, ignored for chudnovsky.

Examples:

  node src/lib/main.js pi --algorithm chudnovsky --digits 1000
  node src/lib/main.js pi --algorithm leibniz --iterations 500000

# Algorithms

## Leibniz series

Compute π as the infinite alternating series. Use iterations to bound precision and round the result to six decimal places.

## Chudnovsky algorithm

Implement the Chudnovsky formula for rapid convergence. Use a high-precision decimal library (decimal.js) to return π to the exact number of requested digits.

# Output

When executed, print:

- Algorithm used
- Computed value of π (full digits for chudnovsky, six-decimal precision for leibniz)
- Total execution time in milliseconds
- Peak memory usage in bytes

# Implementation Details

- Update src/lib/main.js to parse and validate --algorithm, --digits, and --iterations flags.
- Default to leibniz if --algorithm is omitted.
- Enforce that --digits is provided only with chudnovsky, and --iterations only with leibniz.
- Add decimal.js as a dependency for arbitrary-precision arithmetic.
- Create src/lib/algorithms/chudnovsky.js exporting computePiChudnovsky(digits) that returns { value, durationMs, peakMemoryBytes }.
- Refactor the existing Leibniz logic into src/lib/algorithms/leibniz.js exporting computePiLeibniz(iterations).
- Extend tests in tests/unit/main.test.js to cover both algorithms and flag validation errors.
- Update README.md to document the pi command, its flags, and usage examples.
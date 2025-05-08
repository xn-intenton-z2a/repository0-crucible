# Overview

Introduce a performance matrix sweep feature that runs π calculations across a range of digit lengths and algorithms, capturing timing metrics for each combination. This enables users to explore how execution time scales with precision and compare algorithm performance over multiple samples.

# Implementation

1. Command-Line Interface
   - Add a new `--sweep <start:step:end>` option to main.js argument parsing using minimist to specify a range of digit counts (for example 100:500:5000).
   - Allow `--algorithms <list>` to choose one or more algorithms (leibniz, gauss-legendre, chudnovsky) in a comma-separated list.
   - Add `--format <csv|png>` for output format and `--output <path>` to specify destination file.
   - Default to chudnovsky only, range 100:100:1000, CSV output to stdout if not specified.

2. Sweep Execution
   - Parse sweep range into an array of digit values.
   - For each algorithm and digit count, compute π using existing implementations and measure execution time with performance.now().
   - Collect results into a data table with columns: algorithm, digits, timeMs, throughput (digits per millisecond).

3. Output Generation
   - CSV format: serialize the data table into comma-separated values with header row.
   - PNG format: use chartjs-node-canvas (add as dependency) to render a line chart: x-axis digit counts, y-axis execution time, separate series per algorithm, and save image to the specified path.

# Testing

- Unit tests in tests/unit/performance-matrix.test.js:
  • Validate correct parsing of sweep ranges and algorithm lists.
  • Mock π calculation functions to simulate constant work and verify timing collection and data table structure.
  • Simulate CLI calls with small ranges and check CSV output lines and header.

# Documentation

- Update README.md:
  • Document the `--sweep`, `--algorithms`, `--format`, and `--output` flags under CLI options.
  • Provide example commands:
    node src/lib/main.js --sweep 100:200:1000 --algorithms leibniz,gauss-legendre --format png --output performance.png
  • Describe the structure of generated CSV and the appearance of the PNG chart and how to interpret it.
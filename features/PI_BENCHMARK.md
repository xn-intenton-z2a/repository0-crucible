# Overview

Provide a unified π computation and benchmarking pipeline that implements multiple high-precision algorithms, configurable digit length, optional performance measurement, and text or PNG output. This feature merges basic calculation and benchmarking into a single core capability that delivers precise results and timing metrics.

# Implementation

1. Command-Line Interface
   - Parse flags in src/lib/main.js using minimist
     • --algorithm <leibniz|gauss-legendre|chudnovsky> to choose the calculation method
     • --digits <n> to specify number of decimal places (default 1000)
     • --format <text|png> to select output format (default text)
     • --output <path> to write result to a file, fallback to stdout if omitted
     • --benchmark to measure execution time and throughput in digits per millisecond

2. Algorithm Modules
   - Inline implementations in main.js or local helper functions:
     • Leibniz series with dynamic iteration count tuned to digit precision
     • Gauss-Legendre method using BigInt and manual scaling for quadratic convergence
     • Chudnovsky formula leveraging native BigInt with manual decimal placement for rapid convergence
   - Use a simple decimal scaling approach or a lightweight decimal library if needed

3. Benchmarking
   - When --benchmark is enabled, wrap computation in performance.now() before and after
   - Calculate total time and throughput (digits per millisecond)
   - Include timing summary in text output or annotate PNG caption

4. Output Generation
   - Text format: write the computed π digits and benchmark summary as UTF-8 text
   - PNG format: use an existing canvas or charting library to render digits or a simple error-margin plot
   - Write files to the specified output path or stdout for text

# Testing

- Add unit tests in tests/unit/benchmark.test.js
  • Verify first 10 digits of π for each algorithm
  • Confirm benchmark flag produces positive timing values
  • Simulate CLI calls with various flags and check correct output format and file creation

# Documentation

- Update README.md:
  • Document each new CLI flag with description and defaults
  • Provide example commands for computing π with and without benchmarking in text and PNG formats
  • Describe expected output structure and how to interpret timing metrics
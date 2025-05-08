# Overview

Introduce a subcommand and library extension to calculate π to arbitrary precision using multiple algorithms, benchmark their performance, and output results in PNG or plain-text formats. This feature expands the CLI’s core functionality to support scientific exploration and visualization of π calculation methods.

# Implementation

1. Command-Line Interface
   - Add options to `main.js`: 
     • `--algorithm` (leibniz, gauss-legendre, chudnovsky)
     • `--digits <n>` (number of decimal places)
     • `--format <text|png>`
     • `--output <path>` (filename for text or image)
     • `--benchmark` (enable timing of each algorithm)
   - Default to chudnovsky, 1000 digits, text output to stdout if not specified.

2. Algorithm Modules
   - Create inline implementations for each algorithm in `src/lib/main.js` or import utility functions:
     • Leibniz series (iterative convergence)
     • Gauss-Legendre method (quadratic convergence)
     • Chudnovsky formula (rapid convergence)
   - Use BigInt and decimal libraries or native `BigInt` with manual scaling for precision.

3. Benchmarking
   - Measure execution time using `performance.now()` before/after computation.
   - Include throughput report (digits per millisecond) in text or annotate PNG.

4. Output Generation
   - Text format: write π digits and benchmark summary to a `.txt` file or stdout.
   - PNG format: use a lightweight canvas library (add dependency such as `canvas` or `chartjs-node-canvas`) to render a plot of error margin vs iteration count or display computed digits as stylized text image.

# Testing

- Unit tests in `tests/unit`:
  • Verify first 10 digits of π for each algorithm.
  • Confirm benchmark timing yields a positive number.
  • Simulate `--format text` and `--format png` to ensure files are created.

# Documentation

- Update README.md:
  • Document new CLI flags and usage examples.
  • Show sample commands for benchmarking and PNG output.
- Add usage examples under the Usage section.

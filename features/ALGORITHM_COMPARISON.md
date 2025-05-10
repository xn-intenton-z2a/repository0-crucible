# Algorithm Comparison Feature

## Overview
Enable direct visual comparison of convergence error across multiple π calculation algorithms by generating a combined line chart in PNG format.

## Functional Requirements
- Add function compareAlgorithms(options) in src/lib/main.js
  - options.digits: positive integer for maximum decimal places (minimum 10, default 1000)
  - options.algorithms: list of algorithm names; available values machin, gauss-legendre, chudnovsky; at least two required
  - options.iterations: positive integer number of sample points (minimum 2, default 10)
  - options.output: string path to the PNG output file (required)
- Compute final π for each algorithm using calculatePi(options.digits, algorithm)
- For each sample index i from 1 to options.iterations:
  - Calculate sampleDigits = floor(options.digits * i / options.iterations)
  - For each algorithm, compute approx = calculatePi(sampleDigits, algorithm)
  - Compute error = absolute value of approx minus the final π for that algorithm
- Build a QuickChart configuration for a multi-line chart:
  - labels: array of sampleDigits values
  - datasets: one series per algorithm with label set to algorithm name and data set to the corresponding error values
- Use QuickChart to render the chart and save the PNG file to options.output
- Validate inputs: digits ≥ 10, iterations ≥ 2, iterations ≤ digits, at least two algorithms, algorithms supported, output path provided

## CLI Interface
- Extend src/lib/main.js to accept flags:
  --compare-algorithms <alg1,alg2,...> to specify algorithms
  --compare-iterations <n> to set sample points
  --compare-output <file.png> to set output path
  --digits <n> to set maximum digits
- When --compare-algorithms is provided:
  - Parse algorithms list, digits, compare-iterations, compare-output from flags
  - Invoke compareAlgorithms with parsed options and exit after writing the PNG file
- Update CLI help output to document new compare flags and defaults

## Dependencies
- Add quickchart-js to package.json if not already present
- Import QuickChart from quickchart-js in src/lib/main.js

## Testing
- Unit tests in tests/unit/main.test.js:
  - Mock QuickChart to verify chart configuration includes correct labels and multiple datasets for each algorithm
  - Test input validation rejects unsupported algorithm names, insufficient algorithms, or invalid numeric values
- CLI tests in tests/e2e/cli.test.js:
  - Invoke CLI with --compare-algorithms machin,gauss-legendre --digits 20 --compare-iterations 5 --compare-output compare.png and assert PNG file is created and contains expected chart data
# PI Convergence Visualization Feature

## Overview

This feature generates a line chart in PNG format illustrating how the approximation error of π decreases as computation precision increases. It helps users visualize convergence behavior of different algorithms.

## Functional Requirements

- Add function visualizePiConvergence(options) in src/lib/main.js
  - options.digits: positive integer for the maximum number of decimal places (minimum 10, default 1000)
  - options.algorithm: machin, gauss-legendre, or chudnovsky (default machin)
  - options.iterations: positive integer number of sample points (minimum 2, default 10)
  - options.output: string path to the PNG output file (required)
- Compute finalPi by calling calculatePi(options.digits, options.algorithm)
- For each sample index i from 1 to options.iterations:
  - Compute sampleDigits = floor(options.digits * i / options.iterations)
  - Compute approx = calculatePi(sampleDigits, options.algorithm)
  - Compute error = absolute value of approx minus finalPi converted to a numeric or scientific string
- Build a QuickChart configuration for a line chart with:
  - labels: array of sampleDigits values
  - data: corresponding error values
  - chart title indicating algorithm and maximum digits
- Use QuickChart to render the chart and save the PNG file to options.output
- Validate inputs: digits ≥ 10, iterations ≥ 2, digits ≥ iterations, algorithm must be one of the supported values, output path must be provided

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --digits <n>
  --algorithm <machin|gauss-legendre|chudnovsky>
  --convergence-iterations <n>
  --convergence-output <file.png>
- When --convergence-output is provided, invoke visualizePiConvergence with parsed flags and exit after writing the PNG file
- Update CLI help output to document the convergence flags and defaults

## Dependencies

- Add quickchart-js to package.json dependencies
- Import QuickChart from quickchart-js in src/lib/main.js

## Testing

- Add unit tests in tests/unit/main.test.js to mock QuickChart:
  - Verify chart configuration matches sample labels and error data for a small precision range
  - Confirm file writing behavior writes a PNG to the specified path
- Add CLI tests in tests/e2e/cli.test.js to invoke the CLI with convergence flags and assert that the PNG file is created and contains expected chart data

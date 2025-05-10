# PI Digit Distribution Visualization Feature

## Overview
Provide a function visualizePiDigits in src/lib/main.js that generates a bar chart of digit frequencies in the computed value of π as a PNG image using QuickChart. This visualization helps users understand the distribution of numeric digits in π for any desired precision.

## Functional Requirements

- Implement function visualizePiDigits(options) in src/lib/main.js:
  - options.digits: positive integer, default 1000
  - options.algorithm: machin, gauss-legendre, or chudnovsky, default machin
  - options.output: string path to the PNG output file (required)
- Compute π using calculatePi with the specified digits and algorithm
- Remove the decimal point from the π string and count occurrences of each digit from 0 through 9
- Construct a QuickChart configuration for a bar chart:
  - labels: strings "0" through "9"
  - data: corresponding frequency counts
  - chart title indicating digits and algorithm
- Use QuickChart from quickchart-js to render the chart and save the PNG file to options.output
- Validate inputs: digits ≥ 1, algorithm supported, output path provided and writable

## CLI Interface

- Extend src/lib/main.js to accept flags:
  --digits <n>
  --algorithm <machin|gauss-legendre|chudnovsky>
  --chart-output <file.png>
- When --chart-output is provided:
  - Parse digits, algorithm, and chart-output path
  - Invoke visualizePiDigits with parsed options
  - On success, print a confirmation message and exit
  - On error, print descriptive error and exit with non-zero code
- Update CLI help output to document the new chart flags and defaults

## Dependencies

- Ensure quickchart-js is listed in package.json dependencies
- Import QuickChart from quickchart-js in src/lib/main.js

## Testing

- Unit tests in tests/unit/main.test.js:
  - Mock QuickChart to verify the configuration matches expected labels and data for a small digit set
  - Stub fs/promises to confirm file writing to the specified output path
- CLI tests in tests/e2e/cli.test.js:
  - Invoke the CLI with --digits 10 --algorithm machin --chart-output dist.png and assert:
    - Exit status is zero
    - A file named dist.png exists
    - The file begins with the PNG signature (bytes 89 50 4E 47 0D 0A 1A 0A)
  - Invoke the CLI with --digits 20 --algorithm chudnovsky --chart-output sample.png and verify similar PNG file properties
  - Test invalid chart-output scenarios (missing extension or unwritable directory) produce a descriptive error and non-zero exit code
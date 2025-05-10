# PI Digit Distribution Visualization Feature

## Overview
This feature adds a function visualizePiDigits in src/lib/main.js to generate a bar chart of digit frequencies in the computed value of pi as a PNG image using QuickChart.

## Functional Requirements

- Add function visualizePiDigits(options) in src/lib/main.js
  - options.digits: positive integer, default 1000
  - options.algorithm: machin, gauss-legendre, or chudnovsky, default machin
  - options.output: string path to the PNG output file
- Compute pi using calculatePi with the specified digits and algorithm
- Remove the decimal point from the pi string and count the occurrences of each digit from 0 through 9
- Construct a QuickChart configuration for a bar chart with labels 0 through 9 and the corresponding frequency data
- Use QuickChart to render the chart and save the PNG file to the path specified by options.output
- Validate inputs so that digits is at least 1, algorithm is supported, and output path is provided

## CLI Interface

- Extend src/lib/main.js to accept flags --digits <n> --algorithm machin gauss-legendre chudnovsky --chart-output <file.png>
- When a chart-output flag is provided, invoke visualizePiDigits with the parsed flags and write the PNG file then exit
- Update the CLI help output to document the new chart flags

## Dependencies

- Add quickchart-js to the project dependencies in package.json
- Import QuickChart from quickchart-js in src/lib/main.js

## Testing

- Add unit tests in tests/unit/main.test.js to mock QuickChart and verify the chart configuration and file writing behavior for a sample digit distribution
- Add CLI tests to invoke src/lib/main.js with arguments --digits 10 --algorithm machin --chart-output dist.png and verify that the PNG file is created with the correct content

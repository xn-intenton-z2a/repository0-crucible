# Performance Benchmark Feature

## Overview
Introduce benchmarking capabilities for Pi calculation across a range of digit lengths. Users can measure execution time of different algorithms and generate CSV reports or PNG visualizations of performance metrics.

## Functional Requirements

- Add a `benchmarkPi(options)` function in `src/lib/main.js`:
  - `options.minDigits` (integer): starting digit count (minimum 1, default 100).
  - `options.maxDigits` (integer): ending digit count (required, ≥ minDigits).
  - `options.step` (integer): increment step between digit counts (default equals minDigits).
  - `options.algorithm` (string): `machin` or `gauss-legendre` (default `machin`).
  - Return an array of objects `{ digits, timeMs }` for each run.

- In CLI (`src/lib/main.js`):
  - Support `--benchmark` flag to activate benchmarking mode.
  - Accept flags: `--min-digits <n>`, `--max-digits <n>`, `--step <n>`, `--algorithm <machin|gauss-legendre>`.
  - Output modes:
    - `--output-csv`: print CSV lines `digits,timeMs` to stdout.
    - `--output-chart <file.png>`: generate and save a PNG chart of performance using QuickChart.
  - Validate inputs and exit with error on invalid ranges.

## CLI Interface

- Example: `node src/lib/main.js --benchmark --min-digits 100 --max-digits 1000 --step 100 --algorithm gauss-legendre --output-csv`
- Example: `node src/lib/main.js --benchmark --max-digits 500 --step 100 --output-chart performance.png`

## Dependencies

- Add `quickchart-js` to `package.json` dependencies.
- Import `QuickChart` to generate charts when `--output-chart` is provided.

## Testing

- Unit tests in `tests/unit/main.test.js`:
  - Verify `benchmarkPi` returns correct array length and structure based on inputs.
  - Test CSV output format for a small range.
  - Mock `QuickChart` to assert chart URL creation and file writing logic for `--output-chart`.

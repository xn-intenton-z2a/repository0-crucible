# CLI Progress Bar Feature

# Overview
Add a live console progress bar to long-running π computations and benchmarking operations to keep users informed of progress and estimated completion.

# Functional Requirements

- Extend `calculatePi` and `benchmarkPi` functions to accept a `progress` boolean option.
- When `progress` is true:
  - For `calculatePi`, display a progress bar reflecting the percentage of algorithm iterations completed.
  - For `benchmarkPi`, display a progress bar showing progress through digit steps and total runs.
  - Ensure the progress bar starts before heavy computation, updates at regular intervals, and stops cleanly on completion or error.
- Do not display progress when `progress` is false or unspecified.

# CLI Interface

- Add a `--progress` flag to the CLI in `src/lib/main.js`.
- Example: `node src/lib/main.js --digits 1000 --algorithm machin --progress`
- Example: `node src/lib/main.js --benchmark --min-digits 100 --max-digits 500 --step 100 --progress`

# Dependencies

- Add `cli-progress` to `package.json` dependencies.

# Testing

- Mock the console output in unit tests to verify the progress bar is initialized, updated, and terminated without errors when `progress` is enabled.
- Ensure `calculatePi` and `benchmarkPi` still produce correct results when `progress` is true or false.

features/PERFORMANCE_BENCHMARK.md
# features/PERFORMANCE_BENCHMARK.md
# Performance Benchmark with Visualization

## Summary
Extend the existing benchmark capability of the π Calculator CLI to support exporting results in both text and PNG chart formats. Users can generate a bar chart image of algorithm execution times alongside or instead of the text table.

## Behavior

- Introduce a new option `--format <type>` (alias `-f`) with allowed values `text` and `png`. Default: `text`.
- Introduce a new option `--output <path>` (alias `-o`) to specify the file path for chart output when `--format png` is used. Default: `benchmark.png` in the current working directory.
- When `--format text` is selected (default), behavior remains as before: measure and print timing data in a table.
- When `--format png` is selected:
  - Perform benchmarking for the selected algorithms.
  - Generate a bar chart of algorithm names versus elapsed time in milliseconds.
  - Save the chart as a PNG image to the specified output path.
  - Suppress the text table output unless `--format text` is also provided.
- Maintain support for `--algorithms <list>` to filter which algorithms to benchmark.

## Source File Changes

- In `src/lib/main.js`:
  - Extend yargs configuration to add `--format` (`-f`) and `--output` (`-o`) options.
  - Add dependency import for chart rendering: import { ChartJSNodeCanvas } from 'chartjs-node-canvas'.
  - After measuring execution times, branch on the selected format:
    - For text, print the timing table as before.
    - For png, create a new ChartJSNodeCanvas instance, configure a bar chart dataset with algorithm names and times, render to buffer, and write to file using fs.writeFileSync.
  - Validate that when `--format png` is used without write permission or invalid path, an error is reported.

## Test Coverage

- In `tests/unit/main.test.js`:
  - Add tests to verify that using `--format text` reproduces the original table output.
  - Add tests for `--format png --output test-chart.png`:
    - Confirm that the file `test-chart.png` is created.
    - Confirm that the file has PNG signature bytes.
  - Test invalid format values cause a usage error.
  - Test missing or unwritable output path emits an error.

## README Updates

- Update Usage section to include new options:

  node src/lib/main.js --benchmark --format text
  node src/lib/main.js --benchmark --format png --output elapsed.png

- Provide example CLI invocation and sample table and chart file reference.

## Dependency Updates

- Add `chartjs-node-canvas` to dependencies in `package.json` for server-side chart rendering.
- No other new dependencies; continue using built-in `perf_hooks` and `fs` for timing and file I/O.features/PI_CALCULATOR.md
# features/PI_CALCULATOR.md
# π Calculator CLI

## Summary
Extend the existing CLI tool to compute π to a specified number of decimal places using selectable algorithms. Users can request a calculation via command-line flags and receive the result in text format.

## Behavior
- Accept a new flag `--digits <n>` (default 10) to control how many decimal places of π to compute.
- Accept a new flag `--algorithm <name>` (defaults to `leibniz`) to choose between available algorithms: `leibniz`, `nilakantha`, and `machin`.
- Print the computed value of π to standard output with the requested precision.

## Source File Changes
- In `src/lib/main.js`, import a small helper module or define functions to calculate π using the three series.
- Use `process.argv` to parse `--digits` and `--algorithm`.
- Validate inputs and fall back to defaults if flags are missing or invalid.
- Format the computed value by rounding to the requested number of decimal places.

## Test Coverage
- Add unit tests in `tests/unit/main.test.js` to:
  - Verify each algorithm returns π within acceptable tolerance for small digit counts (e.g., 5 or 10 digits).
  - Ensure default behavior (no flags) produces 10 digits using the `leibniz` series without throwing errors.
  - Test invalid flag values gracefully revert to defaults.

## README Updates
- Document the new flags in the Usage section:
  - `node src/lib/main.js --digits 15`
  - `node src/lib/main.js --algorithm machin --digits 20`
- Provide example outputs.

## Dependency Updates
- Add a lightweight flag parsing library (for example `yargs`).
- Update `package.json` to include the new dependency and update the `test` script if needed to run the new tests.
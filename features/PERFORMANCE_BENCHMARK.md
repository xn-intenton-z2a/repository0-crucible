# Overview

Introduce a benchmarking mode that measures execution time and memory usage for π calculations at one or more precision levels. This feature enables users to assess performance characteristics directly from the CLI and choose optimal precision targets based on tangible metrics.

# CLI Interface

- Add a flag `--benchmark` or `-b` that accepts an optional comma-separated list of digit counts (e.g., `--benchmark 10,100,500`).
- If no list is provided, default to benchmarking at 10, 100, and 500 digits.
- Add an option `--json` to emit the benchmark report as a JSON array instead of a console table.

# Implementation Details

- Extend main argument parsing in `src/lib/main.js` to detect the `--benchmark` flag and parse digit targets.
- For each specified digit count:
  - Record start time using `performance.now()`.
  - Invoke the existing `calculatePi(digits)` function.
  - Record end time and compute duration.
  - Capture memory usage delta via `process.memoryUsage().heapUsed` before and after.
- Aggregate results into a structured array of objects:
  - digitCount: number
  - durationMs: number
  - memoryBytes: number
- If `--json` is present, output `JSON.stringify(results, null, 2)`; otherwise use `console.table(results)`.
- Ensure error handling for invalid or out-of-range digit inputs.

# Testing

- In `tests/unit/main.test.js`, add unit tests that:
  - Simulate `main(["--benchmark","5,10"])` and verify the returned or printed report structure contains entries for 5 and 10.
  - Confirm `--json` produces valid JSON parseable to an array of the correct length.
  - Test default benchmarking behavior when no targets are provided.
  - Validate error thrown on non-integer or out-of-range values in the benchmark list.
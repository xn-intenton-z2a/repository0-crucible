# Performance Benchmark

## Summary
Add benchmarking capabilities to the π Calculator CLI to measure and report execution times of the available algorithms. Users can invoke benchmarks via a new flag and receive timing data for each algorithm.

## Behavior
- Introduce a new flag `--benchmark`, alias `-b`, which when present triggers benchmarking mode.
- In benchmarking mode, the tool measures the time taken by one or more algorithms to compute π using the resolved digits setting.
- Accept an optional `--algorithms <list>` flag to specify a comma-separated list of algorithms to benchmark; defaults to all supported algorithms: leibniz, nilakantha, machin.
- For each selected algorithm:
  - Record the start time.
  - Execute the π computation function.
  - Record the end time and compute the elapsed duration in milliseconds.
- Output a table to stdout listing each algorithm, the number of digits used, and the elapsed time in ms.
- When `--benchmark` is provided, suppress the normal π value output unless `--digits` is used without benchmarking.

## Source File Changes
- In `src/lib/main.js`, extend yargs configuration to include `--benchmark` (`-b`) and `--algorithms` options.
- Add logic before or after computation to detect benchmarking mode and perform timing measurements using `performance.now()` from the Node.js `perf_hooks` module.
- Format and print the benchmark results in a clear tabular text format.
- Ensure normal behavior remains unchanged when `--benchmark` is not provided.

## Test Coverage
- In `tests/unit/main.test.js`, add tests to:
  - Verify that running with `--benchmark` and no `--algorithms` benchmarks all algorithms and logs timing output for each.
  - Verify that specifying `--algorithms leibniz,nilakantha` only benchmarks those two and omits machin.
  - Ensure that when `--benchmark` is present, the π value is not printed as a standalone line.
  - Confirm that invalid algorithm names in `--algorithms` cause a validation error and default to benchmarking all supported algorithms.

## README Updates
- Update `README.md` Usage section to document the new flags:
  - `node src/lib/main.js --benchmark`
  - `node src/lib/main.js --benchmark --algorithms leibniz,machin --digits 5`
- Provide example output of the benchmark table.

## Dependency Updates
- No additional dependencies required; use the built-in Node.js `perf_hooks` API.

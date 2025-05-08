# Overview

Introduce a new benchmarking command in the CLI to measure and report the performance of each π calculation method. When the user supplies the --benchmark flag, the application runs timing tests over one or multiple methods on a specified digit count, aggregates results, and outputs a summary table or JSON report.

# API

Export a new function `benchmarkPi(digits: number, runs?: number, methods?: string[]): Promise<BenchmarkResult[]>` in `src/lib/pi.js`, where a `BenchmarkResult` is an object containing:
- method: string  
- averageTimeMs: number  
- minTimeMs: number  
- maxTimeMs: number  
- runs: number

# CLI Usage

In `src/lib/main.js`, support two new flags:

--benchmark            Run a performance benchmark instead of printing π.  
--benchmark-runs <n>   Number of times to execute each method (default: 3).

Behavior:
- If --benchmark is present, ignore --format and --output.  
- If --method is provided, benchmark only that method; otherwise benchmark all four methods.  
- Use --digits to select decimal count for timing.  
- Print a table to stdout showing method, runs, average, min and max durations in milliseconds.  
- Provide a --benchmark-json flag to output raw JSON instead of a table.

# Implementation Details

1. In `src/lib/pi.js`:
   - Implement `benchmarkPi` that iterates over each method, runs `calculatePi` the specified number of runs, measures execution time with `performance.now()`, and returns an array of `BenchmarkResult`.
2. In `src/lib/main.js`:
   - Parse the new flags before existing logic.  
   - If --benchmark is set, call `benchmarkPi`, format the results, and `console.log` the summary or JSON.  
   - Exit after printing benchmarks.
3. No new dependencies are required; use the built-in `perf_hooks` module for high-resolution timing.

# Testing

- Add unit tests in `tests/unit/pi.test.js` for `benchmarkPi` with a small digit count (e.g., 1 digit) and runs set to 2; verify result array length and that timings are non-negative numbers.
- Extend `tests/unit/main.test.js` to include:
  - Invoking `main` with `--benchmark` and `--benchmark-runs 2`; spy on console.log and validate output includes method names and timing numbers.
  - A test for `--benchmark-json` to assert valid JSON output matching the structure of `BenchmarkResult[]`.

# Documentation

- Update `docs/USAGE.md` to document the new --benchmark, --benchmark-runs, and --benchmark-json flags with examples.
- Update `README.md` under Features to list “CLI benchmarking command” with a sample invocation.

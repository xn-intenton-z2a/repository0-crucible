# Overview

Extend the pi calculation CLI to support a benchmarking mode that measures the performance of one or more π algorithms and outputs results in JSON.

# CLI Usage

Accept the following new flags in the main CLI entrypoint:

--benchmark
  Run performance benchmarks instead of printing π.
--benchmark-runs <n>
  Number of times to execute each method; default 3.
--benchmark-json
  Output raw JSON array of BenchmarkResult objects instead of table or text.

When --benchmark is present, ignore --format and --output flags.  If --method is provided, benchmark only that method; otherwise benchmark all supported methods.

# Implementation Details

1. In src/lib/pi.js reuse the existing benchmarkPi(digits: number, runs?: number, methods?: string[]): Promise<BenchmarkResult[]> API unchanged.
2. In src/lib/main.js:
   - Parse --benchmark, --benchmark-runs, and --benchmark-json flags alongside existing flags.
   - If --benchmark is set:
     • Call benchmarkPi(digits, runs, methods) to obtain Promise<BenchmarkResult[]>.
     • Await the results and serialize to JSON.
     • If --benchmark-json is present, print the JSON string to stdout with console.log.
     • Exit the process after printing.
   - Ensure clear error messages for invalid runs values (non-integer or <1).

# Testing

- Add unit tests in tests/unit/main.test.js for:
  • Parsing --benchmark, --benchmark-runs, --benchmark-json alongside --digits and --method.
  • Error cases: non-integer runs, runs < 1.
  • Valid output: spy console.log to verify correct JSON string of BenchmarkResult array.
- Add an end-to-end test in tests/e2e/cli.test.js:
  • Invoke the tool with --benchmark, --digits 10, --benchmark-runs 2, --benchmark-json.
  • Parse stdout as JSON and verify array structure: each object has method, averageTimeMs, minTimeMs, maxTimeMs, runs.

# Documentation

- Update README.md under Features to list "CLI benchmarking mode" and show example:
  node src/lib/main.js --digits 500 --benchmark --benchmark-runs 5 --benchmark-json
- Update docs/USAGE.md to document new flags, describe output JSON schema, and include sample output.

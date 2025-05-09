# Overview

Introduce a benchmarking mode into the CLI to measure and report performance of the π calculation algorithms. Users will be able to run timed benchmarks across one or all supported methods and receive structured results.

# CLI Usage

When the --benchmark flag is supplied, the CLI ignores --format and --output and enters benchmark mode.

--benchmark
    Enable performance benchmarking instead of computing π output.
--benchmark-runs <n>
    Number of times to invoke each method; must be integer ≥1. Default: 3.
--benchmark-json
    Output raw JSON array of BenchmarkResult objects. Without this flag, a human-readable table is printed.
--digits <n>
    Number of decimals to compute for each run (1 to 10000). Default: 100.
--method <name>
    A single method to benchmark (chudnovsky, gauss-legendre, machin, nilakantha). If omitted, all methods are benchmarked.

# Implementation Details

1. In src/lib/pi.js
   • Implement a new async function benchmarkPi(digits: number, runs: number, methods?: string[]): Promise<BenchmarkResult[]>.
     – For each method, call calculatePi(digits, method) runs times, measuring elapsed microseconds via high-resolution timer.
     – Compute averageTimeMs, minTimeMs, maxTimeMs for each method and return an array of { method, runs, averageTimeMs, minTimeMs, maxTimeMs }.
2. In src/lib/main.js
   • Parse --benchmark, --benchmark-runs, and --benchmark-json alongside existing flags.
   • When --benchmark is set:
     – Validate that benchmark-runs is an integer ≥1.
     – Determine target methods from --method or default to all.
     – Await benchmarkPi(digits, runs, methods).
     – If --benchmark-json, console.log JSON.stringify(results); else, render a table with headers Method | Runs | Avg ms | Min ms | Max ms.
     – Exit process after output.

# Testing

Unit tests in tests/unit/pi.test.js:
  • Test benchmarkPi with a stubbed calculatePi to simulate timing and verify returned structure contains correct runs and numeric timing fields.

Unit tests in tests/unit/main.test.js:
  • Validate parsing of --benchmark flags and error on invalid runs values.
  • Spy on console.log to verify JSON or table output is produced.

End-to-end test in tests/e2e/cli.test.js:
  • Run CLI with --benchmark, --digits 10, --benchmark-runs 2, --benchmark-json; parse stdout as JSON and assert array contains entries for expected methods with correct runs count.

# Documentation

README.md:
  • Under Features, add “CLI benchmarking mode” with example invocation:
      node src/lib/main.js --digits 500 --benchmark --benchmark-runs 5 --benchmark-json

docs/USAGE.md:
  • Document new flags, describe output JSON schema, and include sample JSON and table outputs.

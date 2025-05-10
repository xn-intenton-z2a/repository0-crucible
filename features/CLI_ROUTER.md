# Overview

This feature implements a comprehensive command-line parser and dispatcher in src/lib/main.js. It interprets user flags, validates inputs using zod schemas, and invokes the appropriate library functions: calculatePi, visualizePiDigits, benchmarkPi, or startHttpServer. It also supports shared options such as algorithm selection, caching, threading, and progress display.

# Functional Requirements

- In src/lib/main.js, replace the stub main function with a CLI router:
  - Define a zod schema for CLI flags: digits, algorithm, chartOutput, benchmark, minDigits, maxDigits, step, outputCsv, outputChart, useCache, cacheFile, progress, threads, serve, port, diagnostics.
  - Validate process.argv against the schema and provide descriptive error messages on invalid input.
  - Dispatch logic:
    - If serve is true, start the HTTP server on the specified port by calling startHttpServer({ port, progress }).
    - Else if benchmark is true, call benchmarkPi({ minDigits, maxDigits, step, algorithm, progress }) and output CSV or chart based on flags.
    - Else if chartOutput is provided (and not in benchmark mode), call visualizePiDigits({ digits, algorithm, output: chartOutput }) and exit.
    - Otherwise, call calculatePi(digits, algorithm, useCache, cacheFile, threads, progress) and print the resulting pi string to stdout.
  - Implement a --help flag that prints usage instructions, available commands, and default values.
  - Exit with code zero on successful execution or non-zero on validation or runtime errors.

# CLI Interface

- Flags:
  --digits <n>          Positive integer, default 100
  --algorithm <name>    machin, gauss-legendre, chudnovsky, default machin
  --chart-output <path> Path to PNG for digit distribution
  --benchmark           Enable performance benchmarking mode
  --min-digits <n>      Starting digit count for benchmarking, default 100
  --max-digits <n>      Required ending digit count for benchmarking
  --step <n>            Step increment for benchmarking, default equals min-digits
  --output-csv          Print benchmark results as CSV
  --output-chart <path> Path to PNG for benchmark visualization
  --use-cache           Enable caching of pi values
  --cache-file <path>   Path to cache file, default .pi_cache.json
  --threads <n>         Number of worker threads, default 1
  --progress            Show console progress bars
  --serve               Start HTTP API server
  --port <n>            Port for HTTP API, default 3000
  --help                Show help and exit

# Dependencies

- Use existing zod dependency for flag validation; no new dependencies.
- Import library functions: calculatePi, visualizePiDigits, benchmarkPi, startHttpServer.

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Mock process.argv to cover each command path: default pi calculation, digit distribution, benchmarking CSV, benchmarking chart, HTTP serve, error cases.
  - Verify main executes correct function calls with validated arguments.
  - Test --help prints usage and exits without invoking computations.
  - Ensure exit codes for success and failure.

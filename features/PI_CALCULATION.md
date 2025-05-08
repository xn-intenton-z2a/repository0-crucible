# Overview

Enable direct command-line computation of π to arbitrary precision, complementing the existing HTTP API and argument echo. Users can specify digit count, choose algorithm, and direct output to stdout or a file without starting a server.

# Implementation

1. Argument Parsing
   • In src/lib/main.js, enhance minimist invocation with flags:
     – --algorithm <chudnovsky|gauss-legendre|leibniz> (default chudnovsky)
     – --digits <n> (integer ≥ 0, default 1000)
     – --output <path> (file path; if omitted, write to stdout)
     – --benchmark (boolean) to include timing and throughput
   • Retain --serve exclusivity: when --serve is present, start HTTP server; otherwise use CLI mode.

2. Input Validation
   • Use zod to coerce and validate digits and algorithm:
     – digits must be integer ≥ 0
     – algorithm must match one of the supported values
   • On validation failure, print descriptive error to stderr and exit with code 1.

3. Computation and Timing
   • Record start time with performance.now().
   • Invoke computePi(digits, algorithm).
   • Record end time and compute elapsed time (ensure minimum 1 ms).
   • If --benchmark is set, calculate throughput as digits / elapsed ms.

4. Output Handling
   • If --output is provided:
     – Import fs/promises and write UTF-8 text containing π digits, and if benchmarking, timing summary.
     – On success, exit with code 0; on file error, print to stderr and exit with code 1.
   • If --output is omitted:
     – Write π digits (and optional benchmark summary) to stdout.
     – Exit process with code 0.

# Testing

- Add tests in tests/unit/cli-calculation.test.js:
  • Simulate process.argv for valid flags; capture stdout; assert correct π prefix and no extra logs.
  • Test writing to a temporary file; verify file contents match computed π and included timing when benchmark is enabled.
  • Simulate invalid digits (negative or non-integer) and invalid algorithm; capture stderr and assert exit code 1.

# Documentation

- Update README.md under a new "CLI Calculation" section:
  • Document each flag (--algorithm, --digits, --output, --benchmark) with defaults and types.
  • Provide example commands:
      node src/lib/main.js --algorithm gauss-legendre --digits 500 --output pi.txt
      node src/lib/main.js --digits 1000 --benchmark
  • Note that --serve remains exclusive and that CLI mode covers computation without HTTP server.
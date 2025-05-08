# Overview

Enable CLI mode for computing π to arbitrary precision directly from the command line. Users can specify the number of decimal places, choose an algorithm, and direct output to a file or stdout without starting an HTTP server. This feature leverages the existing computePi function and measurement utilities to provide an end-to-end command-line experience.

# Implementation

1. Command-Line Interface in main.js
   - Use minimist to parse flags:
     • --algorithm <leibniz|gauss-legendre|chudnovsky> (default chudnovsky)
     • --digits <n> (nonnegative integer, default 1000)
     • --output <path> (file path for result; stdout if omitted)
   - Validate inputs with zod:
     • digits must be an integer ≥ 0
     • algorithm must match one of the supported methods
   - On invocation (when --serve is not provided):
     • Record start time with performance.now()
     • Call computePi(digits, algorithm)
     • Compute elapsed time and enforce a minimum of 1ms
     • Format result:
       – If output is stdout, print the digits only
       – If output is a file path, write plain UTF-8 text to the file
     • Exit process with code 0 on success
   - On validation error:
     • Print descriptive error messages to stderr
     • Exit process with code 1

2. Integration with Existing Code
   - Import computePi from main.js
   - Reuse performance.now() for timing
   - Ensure that --serve remains exclusive to HTTP mode

# Testing

- Add tests in tests/unit/cli-calculation.test.js:
  • Simulate process.argv with valid flags and capture stdout; assert correct digits prefix and lack of extra logs
  • Test writing to a temporary file and verify file contents match expected π digits
  • Simulate invalid digits (negative, noninteger) and invalid algorithm; capture stderr and exit code

# Documentation

- Update README.md:
  • Document CLI usage under a new "CLI Calculation" section
  • List supported flags, their defaults, and example commands:
      node src/lib/main.js --algorithm gauss-legendre --digits 500
      node src/lib/main.js --digits 1000 --output pi.txt
  • Note that HTTP mode is enabled with --serve and is mutually exclusive with CLI compute
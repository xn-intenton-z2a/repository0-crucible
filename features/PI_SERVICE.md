# Overview

Provide a unified π calculation service that supports both command-line interface mode and HTTP API mode. Use the Chudnovsky algorithm for high-precision, fast convergence to an arbitrary number of decimal places. Expose consistent performance metrics and resource monitoring in both modes.

# CLI Mode

- Invocation: node src/lib/main.js pi
- Flags:
  - mode <cli|http>  default cli
  - algorithm chudnovsky  required for precise computation
  - digits <positive integer>  required number of decimal places
- Output to standard out in plain text showing:
  - algorithm name
  - computed π value to requested precision
  - total execution time in milliseconds
  - peak memory usage in bytes
- Error handling:
  - missing or invalid flags produce descriptive error messages and exit code 1

# HTTP API Mode

- Launch Express server on port 3000 or custom port via flag port <number>
- GET endpoint at /pi with query parameters digits and algorithm
- POST endpoint at /pi accepting JSON body with fields digits and algorithm
- Response format in JSON with keys:
  - digits
  - value (π as string)
  - algorithm
  - durationMs
  - peakMemoryBytes
- HTTP status codes:
  - 400 for invalid input
  - 500 for server or computation errors

# Implementation Details

- Add file src/lib/algorithms/chudnovsky.js that exports function computePiChudnovsky(digits)
  - returns an object containing value, durationMs, peakMemoryBytes
  - use decimal.js for arbitrary-precision arithmetic
- Update src/lib/main.js to:
  - parse process.argv for command pi and flags
  - if mode is cli invoke computePiChudnovsky and print results
  - if mode is http start Express server and wire GET and POST handlers
  - measure timing via process.hrtime and memory via process.memoryUsage
- Add express to dependencies for API server

# Testing

- Create tests/unit/algorithms.test.js to verify computePiChudnovsky produces correct prefixes of π and returns performance metrics
- Enhance tests/unit/main.test.js to cover:
  - CLI flag parsing success and error cases
  - correct output format in CLI mode (mock timer and memory)
- Add tests/unit/http.test.js to validate:
  - GET and POST /pi success responses and JSON schema
  - error responses for invalid input

# Documentation

- Update README.md under Features section with examples of CLI usage and HTTP API calls
- Document computePiChudnovsky API in readme
- Provide sample commands such as:
  node src/lib/main.js pi --digits 100 --algorithm chudnovsky
  http GET localhost:3000/pi?digits=50&algorithm=chudnovsky
- Add npm script serve to start HTTP mode via node src/lib/main.js pi --mode http

# Dependencies and Scripts

- Add dependency decimal.js for arbitrary precision
- Add dependency express for HTTP API server
- Update package.json scripts:
  - serve  starts HTTP API
  - pi  runs CLI mode for pi subcommand


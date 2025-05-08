# Overview

Enhance the unified π calculation service to support three core algorithms: Chudnovsky for fast high-precision, Gauss–Legendre for quadratically convergent computation, and Leibniz for simple iterative approximation. Provide consistent CLI and HTTP API modes with performance metrics and resource monitoring.

# CLI Mode

- Invocation: node src/lib/main.js pi
- Flags:
  - mode <cli|http>  default cli
  - algorithm <chudnovsky|gauss-legendre|leibniz>  required algorithm name
  - digits <positive integer>  required number of decimal places (minimum 1)
- Behavior:
  - Dispatch to the appropriate computePi<Algorithm> function in src/lib/algorithms/
  - Return an object containing value (string), durationMs (number), peakMemoryBytes (number)
- Output to stdout in plain text showing:
  - algorithm name
  - computed π value to requested precision
  - total execution time in milliseconds
  - peak memory usage in bytes
- Error handling:
  - missing or invalid flags produce descriptive error messages and exit code 1
  - unsupported algorithm yields error 1 with allowed algorithm list

# HTTP API Mode

- Launch Express server on port 3000 or custom port via flag port <number>
- GET endpoint at /pi with query parameters digits and algorithm
- POST endpoint at /pi accepting JSON body with fields digits and algorithm
- Input validation:
  - digits must be positive integer
  - algorithm must be one of chudnovsky, gauss-legendre, leibniz
- Response format in JSON with keys:
  - digits
  - value (π as string)
  - algorithm
  - durationMs
  - peakMemoryBytes
- HTTP status codes:
  - 400 for invalid input or unsupported algorithm
  - 500 for server or computation errors

# Algorithms

- Add file src/lib/algorithms/chudnovsky.js exporting computePiChudnovsky(digits)
- Add file src/lib/algorithms/gaussLegendre.js exporting computePiGaussLegendre(digits)
- Add file src/lib/algorithms/leibniz.js exporting computePiLeibniz(digits)
- All functions return an object { value, durationMs, peakMemoryBytes }
- Use decimal.js for arbitrary-precision arithmetic in Chudnovsky and Gauss–Legendre
- Use built-in Number or decimal.js for Leibniz series up to digits precision

# Testing

- Create or enhance tests/unit/algorithms.test.js to verify all three implementations produce correct prefix of π and return performance metrics
- Enhance tests/unit/main.test.js to cover flag parsing, dispatch to each algorithm, and error scenarios
- Add tests/unit/http.test.js to validate GET and POST /pi success responses, JSON schema, and error responses for invalid input or unsupported algorithm

# Documentation

- Update README.md under Features section with examples:
  - CLI usage for each algorithm:
    node src/lib/main.js pi --digits 50 --algorithm gauss-legendre
  - HTTP API calls:
    http GET localhost:3000/pi?digits=20&algorithm=leibniz
    curl -X POST localhost:3000/pi -H 'Content-Type: application/json' -d '{"digits":100,"algorithm":"chudnovsky"}'
- Document computePi functions in README API reference
- Add npm script pi to run CLI mode, and serve to start HTTP mode

# Dependencies and Scripts

- Ensure decimal.js is in dependencies for arbitrary precision
- Add express to dependencies for HTTP API server
- Update package.json scripts:
  - "pi": "node src/lib/main.js pi"
  - "serve": "node src/lib/main.js pi --mode http"

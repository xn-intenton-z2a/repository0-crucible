# Pi HTTP API Server

# CLI Options

--serve <port>   Start an HTTP server on the given port. When provided, bypass all other CLI modes and handle HTTP requests.

# Endpoints

GET  /pi
Query parameters:
  digits (number)        Decimal places for leibniz or chudnovsky
  algorithm (string)     Calculation method: leibniz, montecarlo, or chudnovsky
  samples (number)       Number of samples for montecarlo (optional)
  error (number)         Absolute error threshold (optional)
  maxIterations (number) Max iterations, samples, or digits (optional)
  batchSize (number)     Batch size for montecarlo error mode (optional)
  diagnostics (boolean)  Include diagnostic output fields
Response: JSON object with result and optional diagnostics.

GET  /pi/data
Query parameters as above
Response: application/json array of objects { index, approximation, error } representing convergence data

GET  /pi/chart
Query parameters as above
Response: image/png showing a line chart of error versus iteration or sample index

# Implementation

1. Update minimist configuration in src/lib/main.js to recognize --serve as a numeric or string option.
2. When options.serve is present, initialize an Express application on the given port.
3. Register /pi handler:
   a. Parse and validate query parameters.
   b. Invoke existing calculate functions or error tolerance loops based on parameters.
   c. Return JSON response with correct content type.
4. For /pi/data:
   a. During calculation, collect data points up to a safe cap (e.g., 1000 points).
   b. Return the array as JSON.
5. For /pi/chart:
   a. Use node-canvas to create a Canvas of size 800×600.
   b. Register Chart.js components and configure a line chart of error vs index.
   c. Render to PNG buffer and send with image/png content type.
6. Ensure that --serve mode bypasses other CLI paths and that exiting the server does not terminate the process unexpectedly.

# Testing

In tests/unit/main.test.js:
- Mock express and supertest or use node http to start the server on an ephemeral port.
- Test GET /pi with combinations of query parameters and assert JSON response contains expected fields and types.
- Test GET /pi/data for small digit or sample values and verify the JSON array shape and values.
- Test GET /pi/chart and verify response content type is image/png and buffer length is non-zero.
- Ensure server teardown between tests to avoid port conflicts.

# Documentation

1. Update docs/USAGE.md to document the --serve option and all HTTP endpoints with example curl commands and sample responses.
2. Update README.md under Features to include HTTP API server usage, sample CLI invocation, and curl examples.

Include any new dependencies (express) in package.json and document installation notes for canvas prerequisites.
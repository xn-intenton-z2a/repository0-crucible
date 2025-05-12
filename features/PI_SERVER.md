# Pi HTTP API Server

Provide an HTTP API layer on top of the existing π calculation CLI tool, enabling programmatic access to single-run calculations, convergence data, and chart generation through standard HTTP endpoints. This feature aligns with the mission to generate results as PNG visualizations or text-based formats.

# CLI Options

--serve <port>   Start an Express HTTP server on the given port. When provided, bypass all other CLI modes and serve HTTP requests until the process is terminated.

# Endpoints

GET /pi
Query parameters:
  digits (number)        Decimal places for leibniz, chudnovsky, or ramanujan-sato
  algorithm (string)     Calculation method: leibniz, montecarlo, chudnovsky
  samples (number)       Number of samples for montecarlo (optional)
  error (number)         Absolute error threshold for error tolerance mode (optional)
  maxIterations (number) Maximum iterations or samples (optional)
  batchSize (number)     Batch size for montecarlo error mode (optional)
  diagnostics (boolean)  Include diagnostic fields in the response (optional)
Response: application/json
  On success: JSON object with result and optional diagnostics
  On error: HTTP 400 with error message

GET /pi/data
Query parameters: same as /pi
Response: application/json array of { index, approximation, error } representing convergence data

GET /pi/chart
Query parameters: same as /pi
Response: image/png showing a line chart of error versus iteration or sample index

# Implementation

1. Add express as a dependency in package.json and import express in src/lib/main.js.
2. Extend minimist configuration to recognize a string or numeric option "serve".
3. In main(), detect options.serve:
   a. Initialize an Express application on the specified port.
   b. For GET /pi:
      - Validate and parse query parameters.
      - Invoke existing calculation logic or error tolerance loops based on parameters.
      - Return JSON response with appropriate content type.
   c. For GET /pi/data:
      - Reuse convergence data collection logic from --convergence-data path.
      - Return JSON array of data points.
   d. For GET /pi/chart:
      - Use node-canvas and Chart.js as in --chart path.
      - Render the chart to a PNG buffer and send with image/png content type.
   e. Ensure that starting the server does not exit the process and that other CLI modes are bypassed.

# Testing

In tests/unit/main.test.js, add tests using supertest:
1. Start the server on an ephemeral port by invoking main(["--serve","0"]) inside a beforeAll hook.
2. Test GET /pi with various query strings:
   - Assert response content-type is application/json and body contains correct fields and types.
3. Test GET /pi/data for small digit or sample values:
   - Assert JSON array shape and first element fields.
4. Test GET /pi/chart:
   - Assert response content-type is image/png and response body is a non-empty Buffer.
5. Teardown the server after tests to free the port.

# Documentation

1. Update docs/USAGE.md to document the --serve option and HTTP endpoints with example curl commands and sample responses.
2. Update README.md under Features to describe HTTP API server usage, sample CLI invocation, and example curl requests.
3. Note installation requirements for express and system prerequisites for canvas.
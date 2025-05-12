# Pi HTTP API Server

Provide an HTTP API layer on top of the existing π calculation functionality, enabling programmatic access to single-run calculations, convergence data, and chart generation through RESTful endpoints.

# CLI Options

--serve <port>   Start an Express HTTP server listening on the specified port. When provided, the tool bypasses all other CLI modes and enters server mode until terminated.

# Endpoints

GET /pi
Query parameters:
  digits (number)        Decimal places for leibniz, chudnovsky, or ramanujan-sato
  algorithm (string)     Calculation method: leibniz, montecarlo, chudnovsky, ramanujan-sato
  samples (number)       Number of samples for montecarlo (optional)
  error (number)         Absolute error threshold for error tolerance mode (optional)
  maxIterations (number) Maximum iterations or samples when using error mode (optional)
  batchSize (number)     Batch size for montecarlo error mode (optional)
  diagnostics (boolean)  Include diagnostic fields in the JSON response (optional)
Response: application/json
  On success: JSON object with result and optional diagnostics fields
  On error: HTTP 400 with JSON error message

GET /pi/data
Query parameters: same as /pi
Response: application/json array of { index, approximation, error } representing convergence data

GET /pi/chart
Query parameters: same as /pi
Response: image/png showing a line chart of error versus iteration or sample index

# Implementation

1. Add express to the project dependencies in package.json.
2. In src/lib/main.js, import express and define a new string option "serve" in minimist configuration.
3. In main(), detect options.serve:
   a. Initialize an Express application and register necessary middleware (e.g., JSON parsing).
   b. Register Chart.js components and create reusable calculation and data-collection logic.
   c. Define handlers for GET /pi, /pi/data, and /pi/chart:
      - Validate and parse query parameters, returning HTTP 400 on invalid input.
      - Invoke existing calculation functions or convergence routines based on parameters.
      - For /pi, return JSON { result, ...diagnostics } with status 200.
      - For /pi/data, return the dataPoints array as JSON with status 200.
      - For /pi/chart, generate a Canvas chart using node-canvas and Chart.js, then send the PNG buffer with content-type image/png.
   d. Start the server on the specified port and log a startup message. Do not exit the process.

# Testing

1. In tests/unit/server.test.js (or extend main.test.js), use supertest to test server endpoints:
   - Invoke main(["--serve","0"]) to start on an ephemeral port and capture the server instance.
   - Test GET /pi with minimal parameters, asserting status 200, content-type application/json, and expected result fields.
   - Test GET /pi/data for a small digit or sample count, asserting the JSON array shape and first element structure.
   - Test GET /pi/chart, asserting status 200, content-type image/png, and that the response body is a Buffer of PNG data.
   - Test error cases (e.g., missing required parameters or invalid algorithm) assert HTTP 400 and error JSON.
   - After tests, close the server to free the port.

# Documentation

1. Update docs/USAGE.md to document the --serve option and describe the HTTP endpoints with example curl commands and sample responses.
2. Update README.md under Features to describe the HTTP API server usage, including CLI invocation and example HTTP requests.
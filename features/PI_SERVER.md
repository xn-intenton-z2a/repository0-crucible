# Pi HTTP API Server

Provide an HTTP API layer on top of π calculation functionality, enabling programmatic access to single-run calculations, convergence data export, and chart generation through RESTful endpoints.

# CLI Options

--serve <port>   Start an Express HTTP server on the specified port; bypasses all other CLI modes and runs until terminated.

# Endpoints

GET /pi
Query parameters:
  digits (number)        Decimal places for leibniz, chudnovsky, or ramanujan-sato
  algorithm (string)     Calculation method: leibniz, montecarlo, chudnovsky, ramanujan-sato
  samples (number)       Number of samples for montecarlo (optional)
  error (number)         Absolute error threshold for error tolerance mode (optional)
  maxIterations (number) Maximum limit when using error mode (optional)
  batchSize (number)     Batch size for montecarlo error mode (optional)
  diagnostics (boolean)  Include diagnostics fields in the JSON response (optional)
Response: application/json
  On success: JSON object { result, ...diagnostics }
  On error: HTTP 400 with JSON { error: message }

GET /pi/data
Query parameters: same as GET /pi
Response: application/json array of { index, approximation, error }

GET /pi/chart
Query parameters: same as GET /pi
Response: image/png line chart of error vs. iteration or sample index

# Implementation

1. Add express to dependencies in package.json.
2. In src/lib/main.js import express and add "serve" as a string option in minimist configuration.
3. In main(), before other modes, detect options.serve:
   a. Initialize an Express app and JSON middleware.
   b. Register Chart.js components and node-canvas for chart generation.
   c. Define handlers:
      - /pi: validate inputs; invoke existing calculate or convergence routines; return JSON with result and optional diagnostics.
      - /pi/data: generate dataPoints using convergence logic; return JSON array.
      - /pi/chart: generate a PNG line chart of error vs. index and return with content-type image/png.
   d. Start the server on the given port and log a startup message.
4. Ensure errors yield HTTP 400 and do not block other endpoints.
5. Do not exit process when server is running.

# Testing

1. In tests/unit/server.test.js, use supertest:
   - Start server with main(["--serve","0"]) and capture the instance.
   - Test GET /pi with valid parameters: expect 200, JSON response with result field.
   - Test GET /pi/data for small digits or samples: expect 200, JSON array of data points.
   - Test GET /pi/chart: expect 200, content-type image/png, response body is a PNG buffer.
   - Test invalid parameters: expect 400 and JSON error message.
   - Close server after tests.

# Documentation

1. Update docs/USAGE.md to document --serve option and describe HTTP endpoints with example curl commands and sample responses.
2. Update README.md under Features to include Pi HTTP API Server usage: starting the server and example HTTP requests to /pi, /pi/data, and /pi/chart.
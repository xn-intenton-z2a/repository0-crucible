# Pi HTTP API Server

Provide a built-in HTTP interface so clients can request π calculations or convergence charts over HTTP without invoking the CLI directly.

# CLI Options

Add a new option

--serve <port>   When provided, the tool starts an HTTP server listening on the given port. No calculation runs on startup until an HTTP request is received.

# Endpoints

GET  /pi          Query parameters digits, algorithm, samples, diagnostics. Respond with JSON containing result and optional diagnostics.
GET  /pi/chart    Query parameters digits or samples and algorithm. Respond with a PNG image of the convergence chart, identical to the CLI chart output.

# Implementation

1. Detect options.serve in main entrypoint. If set, initialize an HTTP server using node http module.
2. On GET /pi requests parse query parameters, forward to calculatePiLeibniz or calculatePiMonteCarlo or calculatePiChudnovsky. Compute result and diagnostics if requested. Set response header content type application/json and send serialized JSON.
3. On GET /pi/chart requests capture intermediate approximation values as in convergence chart feature. Create Chart.js canvas with node-canvas, register controllers and elements. Build line chart, write PNG buffer, set content type image/png and send buffer.
4. Keep the existing CLI behavior when --serve is not provided.

# Testing

1. In tests/unit/main.test.js add tests that start the server on an ephemeral port, send HTTP GET requests to /pi and /pi/chart, and verify JSON and PNG responses.
2. Mock calculate functions and Chart.js and fs to confirm route handling and output types.

# Documentation

1. Update docs/USAGE.md to document the --serve option and HTTP endpoints with example requests and response formats.
2. Update README.md under Features to describe HTTP API server usage and sample curl commands.
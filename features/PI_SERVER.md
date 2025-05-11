# Pi HTTP API Server

Provide an integrated HTTP interface so clients can request π calculations, convergence data, and chart images without invoking the CLI directly.

# CLI Options

--serve <port>   When provided, the tool starts an HTTP server listening on the specified port. All standard CLI behavior is bypassed until HTTP requests are received.

# Endpoints

GET  /pi
Query parameters:
  digits (number)          Number of decimal places for leibniz or chudnovsky methods
  algorithm (string)       Calculation method: leibniz, montecarlo, or chudnovsky
  samples (number)         Sample count for montecarlo (optional, default: CLI default)
  error (number)           Absolute error threshold (optional, enables error tolerance mode)
  maxIterations (number)   Maximum iterations or digits (optional)
  batchSize (number)       Batch size for montecarlo error mode (optional)
  diagnostics (boolean)    Include diagnostic output fields
Response: JSON object containing result and optional diagnostics.

GET  /pi/chart
Query parameters:
  digits or samples and algorithm (as above)
Generates a PNG of the convergence chart showing approximation error versus iteration or sample index.
Response: image/png

GET  /pi/data
Query parameters:
  digits or samples and algorithm (as above)
Generates raw convergence data as JSON array of objects: index, approximation, error.
Response: application/json

# Implementation

1. Add dependencies in package.json: express, chart.js, canvas. 
2. In src/lib/main.js detect options.serve. If set, initialize an Express server on the given port.
3. Register a GET handler for /pi:
   a. Parse query parameters, determine algorithm and parameters.
   b. Invoke calculatePiLeibniz, calculatePiMonteCarlo, or calculatePiChudnovsky directly or in error tolerance loops.
   c. Collect result and diagnostics. Send JSON response with appropriate content type.
4. Register GET /pi/data:
   a. During calculation, record intermediate points at fixed intervals or batch completions up to a reasonable cap (e.g., 1000 points).
   b. After computation, send JSON array of data objects.
5. Register GET /pi/chart:
   a. Use node-canvas to create a Canvas context.
   b. Register necessary Chart.js controllers, scales, and plugins.
   c. Build a line chart of error versus index using the data collected.
   d. Render to PNG buffer and send with content type image/png.
6. Ensure that when --serve is not provided, the existing CLI and benchmark modes remain unchanged.

# Testing

1. In tests/unit/main.test.js add tests that:
   - Start the server on an ephemeral port using --serve.
   - Send HTTP GET to /pi with various combinations of parameters; verify JSON response fields and types.
   - Send HTTP GET to /pi/data; verify JSON array shape and sample values for small digit or sample counts.
   - Send HTTP GET to /pi/chart; verify response content type is image/png and buffer length is greater than zero.
   - Mock calculate functions and Chart.js to simulate known data and confirm correct handler behavior.
2. Ensure test teardown stops the server to avoid port conflicts.

# Documentation

1. Update docs/USAGE.md to document the --serve option and the /pi, /pi/chart, and /pi/data endpoints, including example curl commands and sample responses.
2. Update README.md under Features to describe HTTP API server usage with sample CLI and curl invocations.
3. Document new dependencies and any setup requirements (e.g., installing canvas prerequisites).

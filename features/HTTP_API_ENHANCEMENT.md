# Overview

Extend the HTTP API server to provide dedicated endpoints for pi digit distribution, convergence visualization, and performance benchmarking without writing files locally. Clients can fetch PNG charts or JSON metrics via REST calls.

# GET /distribution

- Query parameters:
  - digits: integer, required, minimum 1, maximum 1e6
  - algorithm: optional, one of machin, gauss-legendre, chudnovsky, default machin
- Validate parameters; respond 400 with JSON error on invalid inputs
- Compute pi using calculatePi(digits, algorithm)
- Remove decimal point and count occurrences of digits 0 through 9
- Build a QuickChart bar chart configuration with labels 0 through 9 and frequency data
- Render chart to PNG buffer and respond:
  - Status: 200
  - Header: Content-Type: image/png
  - Body: PNG buffer

# GET /convergence

- Query parameters:
  - digits: integer, required, minimum 10, maximum 1e6
  - algorithm: optional, one of machin, gauss-legendre, chudnovsky, default machin
  - iterations: optional, integer, minimum 2, default 10
- Validate parameters; respond 400 with JSON error on invalid inputs
- Compute final pi using calculatePi(digits, algorithm)
- For each sample i from 1 to iterations:
  - sampleDigits = floor(digits * i / iterations)
  - approx = calculatePi(sampleDigits, algorithm)
  - error = absolute difference between approx and final pi
- Build a QuickChart line chart configuration with labels = sampleDigits array and data = error values
- Render chart to PNG buffer and respond image/png

# GET /benchmark

- Query parameters:
  - minDigits: integer, required, minimum 1
  - maxDigits: integer, required, minimum = minDigits
  - step: optional, integer, minimum 1, default = minDigits
  - algorithm: optional, machin or gauss-legendre, default machin
  - chart: optional boolean; if true return PNG chart, otherwise JSON
- Validate parameters; respond 400 with JSON error on invalid inputs
- Invoke benchmarkPi({minDigits, maxDigits, step, algorithm}) to obtain array of {digits, timeMs}
- If chart=true:
  - Build a QuickChart line chart configuration with digit labels and timeMs data
  - Render to PNG buffer and respond image/png
- Else:
  - Respond 200 with Content-Type application/json and body JSON array

# Dependencies

- Ensure quickchart-js is listed in package.json dependencies
- Import QuickChart from quickchart-js in src/lib/main.js
- express.json and express.urlencoded middleware already applied

# Testing

- Unit tests in tests/unit/http.test.js:
  - Mock QuickChart to return placeholder PNG buffer
  - Test GET /distribution, /convergence, and /benchmark with chart=true and without for valid and invalid parameters
  - Assert status codes, headers, and response body types
- E2E HTTP tests in tests/e2e/http.test.js:
  - Start server on ephemeral port
  - Issue requests to /distribution, /convergence, and /benchmark
  - Assert status 200, correct Content-Type, PNG signature for images, and valid JSON structure for metrics
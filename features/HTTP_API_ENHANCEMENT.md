# Overview

Extend the existing HTTP API server to provide dedicated endpoints for π digit distribution, convergence visualization, and performance benchmarking. This will enable clients to fetch PNG charts or JSON metrics for analysis without writing files locally.

# Middleware

- In startHttpServer (src/lib/main.js), ensure the following middleware is applied:
  - express.json() to parse JSON bodies
  - express.urlencoded({ extended: true }) to parse URL-encoded parameters

# GET /distribution

- Query parameters:
  - digits (integer, required, ≥1, ≤1e6)
  - algorithm (string, optional; machin, gauss-legendre, or chudnovsky; default machin)
- Validate parameters; respond 400 JSON error on invalid inputs
- Compute π using calculatePi(digits, algorithm)
- Strip the decimal point and count occurrences of digits 0–9
- Build a QuickChart bar chart configuration with labels ["0"…"9"] and frequency data
- Generate a PNG buffer via QuickChart and respond with:
  - Status: 200
  - Header: Content-Type: image/png
  - Body: PNG buffer

# GET /convergence

- Query parameters:
  - digits (integer, required, ≥10, ≤1e6)
  - algorithm (string, optional; machin, gauss-legendre, or chudnovsky; default machin)
  - iterations (integer, optional; ≥2; default 10)
- Validate parameters; respond 400 JSON error on invalid inputs
- For each sample i from 1 to iterations:
  - Compute sampleDigits = floor(digits * i / iterations)
  - Compute approx = calculatePi(sampleDigits, algorithm)
  - Compute error = absolute difference from final π
- Build a QuickChart line chart configuration with labels = sampleDigits array and data = error values
- Generate a PNG buffer via QuickChart and respond with Content-Type: image/png

# GET /benchmark

- Query parameters:
  - minDigits (integer, required, ≥1)
  - maxDigits (integer, required, ≥minDigits)
  - step (integer, optional; ≥1; default = minDigits)
  - algorithm (string, optional; machin or gauss-legendre; default machin)
  - chart (boolean, optional; if true return PNG, else JSON)
- Validate parameters; respond 400 JSON error on invalid inputs
- Invoke benchmarkPi({ minDigits, maxDigits, step, algorithm }) to obtain an array of { digits, timeMs }
- If chart=true:
  - Build a QuickChart line chart configuration with digit labels and timeMs data
  - Generate a PNG buffer and respond with Content-Type: image/png
- Otherwise, respond with:
  - Status: 200
  - Header: Content-Type: application/json
  - Body: JSON array from benchmarkPi

# Dependencies

- Ensure quickchart-js is listed in package.json dependencies
- Import QuickChart from 'quickchart-js' in src/lib/main.js

# Testing

- **Unit tests** in tests/unit/http.test.js:
  - Mock QuickChart to return a placeholder PNG buffer
  - Test GET /distribution with valid and invalid parameters
  - Test GET /convergence with valid and invalid parameters
  - Test GET /benchmark?chart=true and without chart flag for JSON response
  - Confirm Content-Type and response status codes
- **E2E HTTP tests** in tests/e2e/http.test.js:
  - Start server on an ephemeral port
  - Issue requests to /distribution, /convergence, /benchmark
  - Assert status 200, correct headers, PNG signature for images, and JSON structure for metrics
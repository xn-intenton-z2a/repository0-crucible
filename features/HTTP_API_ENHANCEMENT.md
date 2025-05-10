# HTTP API Enhancement Feature

## Overview
Extend the existing HTTP API to provide graphical endpoints for π digit distribution, π convergence visualization, and performance benchmarks. Clients can retrieve PNG charts or JSON data over RESTful endpoints without writing files locally.

## Functional Requirements

### GET /distribution
- Query parameters:
  - digits (integer, required, ≥1, ≤1e6)
  - algorithm (string, optional; machin, gauss-legendre, or chudnovsky; default machin)
- Validate parameters; respond 400 JSON error on invalid inputs
- Compute digit frequencies via existing logic or a new helper that returns counts as array or object
- Build QuickChart bar chart configuration with labels 0–9 and frequency data
- Use QuickChart to generate a PNG buffer
- Respond with Content-Type: image/png and send buffer

### GET /convergence
- Query parameters:
  - digits (integer, required, ≥10, ≤1e6)
  - algorithm (string, optional; machin, gauss-legendre, or chudnovsky; default machin)
  - iterations (integer, optional; ≥2; default 10)
- Validate parameters; respond 400 JSON error on invalid inputs
- Compute convergence error data for each sample point
- Build QuickChart line chart configuration with labels as sample digit counts and error values
- Generate PNG buffer and respond with Content-Type: image/png

### GET /benchmark
- Query parameters:
  - minDigits (integer, required, ≥1)
  - maxDigits (integer, required, ≥minDigits)
  - step (integer, optional; ≥1; default = minDigits)
  - algorithm (string, optional; machin or gauss-legendre; default machin)
  - chart (boolean, optional; if true return PNG, else JSON)
- Validate parameters; respond 400 JSON error on invalid inputs
- Invoke benchmarkPi to get an array of { digits, timeMs }
- If chart=true:
  - Build QuickChart line chart configuration with digit labels and timeMs data
  - Generate PNG buffer and respond Content-Type: image/png
- Otherwise respond with Content-Type: application/json and the JSON array

## Middleware and Routing
- In startHttpServer implementation in src/lib/main.js:
  - Ensure express.json() and express.urlencoded({ extended: true }) are applied
  - Register the new routes before the generic 404 handler
  - Reuse or extract helper functions to compute data without writing to disk

## Dependencies
- Ensure quickchart-js is listed in package.json
- Import QuickChart from quickchart-js in src/lib/main.js
- No additional dependencies required

## Testing
- Unit tests in tests/unit/main.test.js:
  - Mock QuickChart to return a placeholder PNG buffer
  - Test GET /distribution returns 200, Content-Type: image/png, body begins with PNG signature
  - Test GET /convergence with valid and invalid parameters
  - Test GET /benchmark?chart=true and without chart flag for JSON response
  - Test invalid parameter combinations yield 400 status and JSON error message
- E2E HTTP tests in tests/e2e/http.test.js:
  - Start server on ephemeral port
  - Fetch each endpoint and assert status 200 and correct Content-Type
  - Validate PNG responses begin with signature and JSON response structure for benchmarks
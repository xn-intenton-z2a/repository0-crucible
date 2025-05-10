# HTTP API Enhancement Feature

## Overview

Extend the HTTP API server to provide dedicated endpoints for pi digit distribution, convergence visualization, and performance benchmarking. Clients receive PNG charts or JSON metrics directly over REST without writing files locally.

## Endpoints

### GET /distribution
- Query parameters:
  - digits: integer, required, minimum 1, maximum 1e6
  - algorithm: optional, one of machin, gauss-legendre, chudnovsky (default machin)
- Validate parameters; on error respond 400 with JSON error message
- Compute π using calculatePi
- Count occurrences of digits 0–9 in the decimal string (remove decimal point)
- Build QuickChart bar chart configuration with labels 0–9 and counts
- Render chart to PNG buffer and respond:
  - Status: 200
  - Header: Content-Type: image/png
  - Body: PNG data

### GET /convergence
- Query parameters:
  - digits: integer, required, minimum 10, maximum 1e6
  - algorithm: optional, one of machin, gauss-legendre, chudnovsky (default machin)
  - iterations: optional integer, minimum 2, default 10
- Validate parameters; on error respond 400 with JSON error
- Compute final π and sample approximations at increasing precision
- Measure absolute error at each sample point
- Build QuickChart line chart configuration with labels = sample digits and data = error values
- Render chart to PNG buffer and respond image/png

### GET /benchmark
- Query parameters:
  - minDigits: integer, required, minimum 1
  - maxDigits: integer, required, ≥ minDigits
  - step: optional integer, minimum 1, default = minDigits
  - algorithm: optional, machin or gauss-legendre (default machin)
  - chart: optional boolean; if true return PNG chart, otherwise JSON metrics
- Validate parameters; respond 400 on invalid input
- Invoke benchmarkPi to obtain performance data array of { digits, timeMs }
- If chart=true:
  - Build QuickChart line chart with digit labels and timeMs data
  - Render and respond image/png
- Else:
  - Respond 200 with Content-Type application/json and JSON array of metrics

## Implementation Details

- In `src/lib/main.js`, import QuickChart from quickchart-js
- Register the three new routes before the 404 fallback in `startHttpServer`
- Perform schema validation for query parameters using zod or manual checks
- Use built-in `calculatePi`, `benchmarkPi` functions
- Render charts with QuickChart and write to `res` directly without intermediate files

## Dependencies

- quickchart-js must be listed in `package.json` dependencies
- No additional new dependencies required beyond quickchart-js and express

## Testing

- Unit tests in `tests/unit/http.test.js`:
  - Mock QuickChart render method to return a placeholder PNG buffer
  - Test each endpoint with valid parameters returns correct status, headers, and body type
  - Test invalid parameter scenarios yield 400 status and descriptive JSON error
- E2E HTTP tests in `tests/e2e/http.test.js`:
  - Start server on an ephemeral port
  - Issue GET requests to /distribution, /convergence, /benchmark with and without chart=true
  - Assert status codes, Content-Type headers, PNG signature for image responses, and valid JSON structure for metrics
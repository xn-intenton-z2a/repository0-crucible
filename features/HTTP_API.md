# HTTP API Enhancement Feature

## Overview
Extend the existing HTTP API server to expose endpoints for π digit distribution, convergence visualization, and performance benchmarks. Clients can retrieve PNG charts or JSON metrics over HTTP without writing files locally.

## Functional Requirements

### Middleware

- In startHttpServer (src/lib/main.js), ensure the following middleware is applied:
  - express.json() for JSON bodies
  - express.urlencoded({ extended: true }) for URL-encoded forms

### GET /distribution

- Query parameters:
  - digits (integer, required, ≥1, ≤1e6)
  - algorithm (string, optional; machin, gauss-legendre, chudnovsky; default machin)
- Validate parameters, respond 400 JSON error on invalid inputs.
- Compute π string via calculatePi(digits, algorithm), strip decimal point, count occurrences of digits 0–9.
- Build a QuickChart bar chart configuration with labels ["0"…"9"] and frequency data.
- Use QuickChart to generate a PNG buffer.
- Respond with status 200, header Content-Type: image/png, and send the PNG buffer.

### GET /convergence

- Query parameters:
  - digits (integer, required, ≥10, ≤1e6)
  - algorithm (string, optional; machin, gauss-legendre, chudnovsky; default machin)
  - iterations (integer, optional; ≥2; default 10)
- Validate parameters, respond 400 JSON error on invalid inputs.
- Compute convergence samples: for each i from 1 to iterations, compute π at floor(digits*i/iterations), measure absolute error against final π.
- Build a QuickChart line chart configuration with sample digit counts as labels and error values as data.
- Generate a PNG buffer.
- Respond with Content-Type: image/png and send the buffer.

### GET /benchmark

- Query parameters:
  - minDigits (integer, required, ≥1)
  - maxDigits (integer, required, ≥minDigits)
  - step (integer, optional, ≥1; default = minDigits)
  - algorithm (string, optional; machin or gauss-legendre; default machin)
  - chart (boolean, optional; if true return PNG, otherwise JSON)
- Validate parameters, respond 400 JSON error on invalid inputs.
- Invoke benchmarkPi({ minDigits, maxDigits, step, algorithm }) to obtain array of { digits, timeMs }.
- If chart=true:
  - Build QuickChart configuration for a line chart with digit labels and timeMs data.
  - Generate PNG buffer and respond with Content-Type: image/png.
- Otherwise respond with Content-Type: application/json and the JSON array.

## Dependencies

- Ensure quickchart-js is listed in package.json and imported:
  import QuickChart from 'quickchart-js';
- Express is already a dependency.

## Testing

- Unit tests in tests/unit/main.test.js:
  - Mock QuickChart to return a placeholder buffer.
  - Test GET /distribution returns 200, PNG signature, correct content-type.
  - Test /distribution with invalid digits returns 400 and JSON error.
  - Test GET /convergence valid and invalid params.
  - Test GET /benchmark?chart=true returns PNG; without chart returns JSON array.
- E2E HTTP tests in tests/e2e/http.test.js:
  - Start server on ephemeral port and issue requests to /distribution, /convergence, /benchmark.
  - Assert status 200, correct headers, PNG signature or JSON structure.

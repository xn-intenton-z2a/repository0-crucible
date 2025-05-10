# HTTP API Enhancement Feature

## Overview

Extend the existing HTTP API to provide PNG endpoints for π digit distribution, π convergence visualization, and performance benchmark charts using QuickChart. This complements the current `/pi` endpoint and enables clients to retrieve graphical representations directly over HTTP.

## Functional Requirements

### GET /distribution

- Query parameters:
  - `digits` (integer, required, ≥1, ≤1e6)
  - `algorithm` (string, optional, one of machin, gauss-legendre, chudnovsky; default machin)
- Validate inputs with HTTP 400 on error.
- Invoke `visualizePiDigits({ digits, algorithm, output: null })` or adapt to return a PNG buffer instead of writing to file.
- Set response headers:
  - `Content-Type: image/png`
- Send the PNG image buffer as the response body.

### GET /convergence

- Query parameters:
  - `digits` (integer, required, ≥10, ≤1e6)
  - `algorithm` (string, optional, one of machin, gauss-legendre, chudnovsky; default machin)
  - `iterations` (integer, optional, ≥2; default 10)
- Validate inputs with HTTP 400 on error.
- Invoke `visualizePiConvergence({ digits, algorithm, iterations, output: null })` or adapt to return a PNG buffer.
- Set response headers:
  - `Content-Type: image/png`
- Send the PNG image buffer.

### GET /benchmark

- Query parameters:
  - `minDigits` (integer, required, ≥1)
  - `maxDigits` (integer, required, ≥minDigits)
  - `step` (integer, optional, ≥1; default = minDigits)
  - `algorithm` (string, optional, machin or gauss-legendre; default machin)
  - `chart` (boolean, optional; if true, return PNG chart, otherwise return JSON array)
- Validate inputs with HTTP 400 on error.
- Invoke `benchmarkPi({ minDigits, maxDigits, step, algorithm })` to obtain an array of `{ digits, timeMs }`.
- If `chart` is truthy:
  - Build a QuickChart configuration for a line chart with labels as digit values and data as timeMs.
  - Use QuickChart to generate a PNG buffer.
  - Set response headers:
    - `Content-Type: image/png`
  - Send the PNG buffer.
- Otherwise:
  - Respond with `application/json` and the JSON array.

## Middleware and Routing

- In `startHttpServer`:
  - Ensure `express.json()` and `express.urlencoded({ extended: true })` are applied.
  - Register the above routes before the 404 fallback.

## Dependencies

- Import `QuickChart` from `quickchart-js`.
- No additional dependencies; reuse existing visualization functions or adapt them to return buffers.

## Testing

- **Unit Tests** (`tests/unit/main.test.js`):
  - Mock visualization functions to return a known PNG buffer, verify routes send correct headers and body.
  - Test validation errors produce 400 responses with JSON error messages.
- **E2E HTTP Tests** (`tests/e2e/http.test.js`):
  - Start server on ephemeral port.
  - Issue GET requests to `/distribution`, `/convergence`, and `/benchmark?chart=true` and assert:
    - Status code 200.
    - `Content-Type: image/png`.
    - Response body begins with PNG signature bytes (`89 50 4E 47 0D 0A 1A 0A`).
  - Issue GET `/benchmark` without `chart` and assert JSON response with correct array structure.


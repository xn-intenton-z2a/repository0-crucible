# HTTP API Enhancement Feature

## Overview
Extend the existing HTTP server to support REST endpoints for digit distribution, convergence visualization, and performance benchmarking. Clients can retrieve PNG charts or JSON metrics directly via HTTP without writing local files.

## Endpoints

### GET /distribution
- Query parameters:
  - digits (integer, required): total number of π digits (including integer part), minimum 1, maximum 1e6.
  - algorithm (string, optional): machin, gauss-legendre, or chudnovsky; default machin.
  - format (string, optional): json or png; default json if not requesting an image endpoint.
- Behavior:
  - Compute π to the requested precision, count digit frequencies.
  - If format=json, respond with application/json and body { "0":count0, …, "9":count9 }.
  - If format=png (or path ends with .png), use QuickChart to render a bar chart and respond image/png.

### GET /convergence
- Query parameters:
  - digits (integer, required): maximum decimal places, minimum 10, maximum 1e6.
  - algorithm (string, optional): machin, gauss-legendre, or chudnovsky; default machin.
  - iterations (integer, optional): number of sample points, minimum 2, default 10.
  - format (string, optional): json or png; default json.
- Behavior:
  - Compute approximation error at sample precisions.
  - If format=json, return application/json with { labels:[...], errors:[...] }.
  - If png, render a line chart via QuickChart and respond image/png.

### GET /benchmark
- Query parameters:
  - minDigits (integer, required): starting digit count, minimum 1.
  - maxDigits (integer, required): ending digit count, must be ≥ minDigits.
  - step (integer, optional): step increment, minimum 1, default = minDigits.
  - algorithm (string, optional): machin or gauss-legendre; default machin.
  - chart (boolean, optional): if true, return a PNG chart; otherwise JSON.
- Behavior:
  - Run benchmarkPi to measure time for each digit count.
  - If chart=true, generate line chart via QuickChart and respond image/png.
  - Otherwise respond with application/json and array of { digits, timeMs }.

## Implementation
- In `src/lib/main.js`, import QuickChart from quickchart-js.
- Register new routes before the 404 handler in `startHttpServer`:
  - Use `express.json()` and `express.urlencoded()` for request parsing.
  - Validate query parameters; return 400 JSON { error: msg } on invalid.
  - Invoke existing library functions: `countPiDigitsJson`, `visualizePiConvergence`, and `benchmarkPi` or inline logic.
  - For PNG responses, call QuickChart to render to a Buffer and `res.type('image/png').send(buffer)`.
  - For JSON responses, use `res.json(...)`.

## Testing
- **Unit Tests** (`tests/unit/http.test.js`):
  - Mock QuickChart.render or QuickChart.getUrl and stub compute functions to test:
    - Valid and invalid parameters return correct status, headers, and body shape.
    - JSON endpoints return expected numeric data.
    - PNG endpoints return a Buffer starting with PNG signature.
- **E2E Tests** (`tests/e2e/http.test.js`):
  - Start server on ephemeral port.
  - Issue GET requests to `/distribution`, `/convergence`, and `/benchmark` with and without chart flag.
  - Assert JSON responses for metrics and image responses for charts.
  - Test error cases: invalid digits ranges or algorithms produce HTTP 400 and JSON error.

## Dependencies
- Add or confirm `quickchart-js` in `package.json` dependencies.
- No other new dependencies required.
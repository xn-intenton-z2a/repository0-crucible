# HTTP API Feature

## Overview

Implement a full RESTful HTTP API exposing all core π operations, visualizations, benchmarks, searches, extractions, exports, and streaming endpoints using Express. Ensure robust input validation, proper content-type handling, and accurate response formats for each route.

## Endpoints

### GET /pi
- Query parameters:
  - digits (integer ≥ 1 and ≤ 1e6, required)
  - algorithm (machin | gauss-legendre | chudnovsky, default machin)
- Response: JSON `{ pi: string }` with exactly `digits` characters including integer part
- Errors: 400 for invalid inputs, 500 for internal errors

### GET /benchmark
- Query parameters:
  - minDigits (integer ≥ 1, default 100)
  - maxDigits (integer ≥ minDigits, required)
  - step (integer ≥ 1, default = minDigits)
  - algorithm (machin | gauss-legendre, default machin)
  - outputCsv (boolean, default false)
- Behavior: call `benchmarkPi` to produce timing data
- Response: `text/csv` of `digits,timeMs` lines when `outputCsv=true`, otherwise JSON array of `{ digits, timeMs }`
- Errors: 400 on invalid ranges

### GET /convergence
- Query parameters:
  - digits (integer ≥ 10, default 1000)
  - algorithm (machin | gauss-legendre | chudnovsky, default machin)
  - iterations (integer ≥ 2, default 10)
- Response: `image/png` of convergence chart generated via `visualizePiConvergence`
- Errors: 400 for invalid inputs

### GET /distribution
- Query parameters:
  - digits (integer ≥ 1, default 1000)
  - algorithm (machin | gauss-legendre | chudnovsky, default machin)
- Response: `image/png` of digit frequency bar chart from `visualizePiDigits`
- Errors: 400 for invalid inputs

### GET /distribution-json
- Query parameters as `/distribution`
- Response: JSON object mapping "0"–"9" to counts from `countPiDigitsJson`

### GET /search
- Query parameters:
  - pattern (digit string, required)
  - digits (integer ≥ 1, default 1000)
  - algorithm (default machin)
  - all (boolean, default false)
- Response: JSON `{ position: number|null }` or `{ positions: number[] }`
- Errors: 400 on invalid pattern or parameters

### GET /hex
- Query parameters:
  - position (integer ≥ 0, required)
  - count (integer ≥ 1, default 1)
- Response: `text/plain` hex string from `extractPiHex`

### GET /decimal
- Query parameters:
  - position (integer ≥ 0, required)
  - count (integer ≥ 1, required)
  - algorithm (default machin)
- Response: `text/plain` decimal substring from `extractPiDecimal`

### GET /export
- Query parameters:
  - digits, algorithm
  - format (txt | json, default txt)
- Response: `text/plain` for txt or JSON `{ pi: string }` for json

### GET /pi/stream
- Query parameters: digits, algorithm
- Response: Server-Sent Events at `/pi/stream` streaming π digits in chunks
- SSE protocol: initial comment, `data: <chunk>` events, `event: end` on completion, `event: error` on failure

## CLI Interface

- Flags in `src/lib/main.js`:
  - `--serve` (boolean) to start HTTP API server; ignore other modes when set
  - `--port <n>` to set listening port (default 3000; `0` for ephemeral)
- When `--serve` is provided, invoke `startHttpServer({ port })` and keep process running
- Update CLI help output to document available HTTP routes and query parameters

## Dependencies

- Ensure `express` is imported and used
- Use existing functions: `calculatePi`, `benchmarkPi`, `visualizePiConvergence`, `visualizePiDigits`, `countPiDigitsJson`, `searchPi`, `extractPiHex`, `extractPiDecimal`, `exportPi`, and HTTP streaming logic
- No new external dependencies required beyond those already listed

## Testing

- Unit tests in `tests/unit/main.test.js`:
  - Mock `req`/`res` to verify each route returns correct status, headers, and body for valid and invalid inputs
  - Test CSV vs JSON behavior for `/benchmark`
  - Test PNG endpoints produce valid image buffers (check PNG signature)
  - Test SSE endpoint streams events to completion
- Integration tests in `tests/e2e/http.test.js`:
  - Start server on ephemeral port and send HTTP requests to all endpoints
  - Assert correct status codes, content types, and response bodies for JSON, CSV, PNG, SSE, and plain text endpoints
  - Validate error handling for invalid parameters returns 400 with descriptive JSON error

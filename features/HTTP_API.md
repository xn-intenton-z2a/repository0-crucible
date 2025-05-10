# HTTP API Feature

## Overview

Implement a full RESTful HTTP API exposing all core π operations, visualizations, benchmarks, searches, extractions, exports, and streaming endpoints. Ensure robust input validation, proper error handling, and response formats matching content type conventions.

## Endpoints

### GET /pi
- Query parameters:
  - digits (integer ≥ 1 and ≤ 1e6, required)
  - algorithm (machin | gauss-legendre | chudnovsky, default machin)
- Response: JSON `{ "pi": "<string>" }` with exactly digits characters including the integer part.
- Errors: 400 on invalid inputs, 500 on server errors.

### GET /benchmark
- Query parameters:
  - minDigits (integer ≥ 1, default 100)
  - maxDigits (integer ≥ minDigits, required)
  - step (integer ≥ 1, default = minDigits)
  - algorithm (machin | gauss-legendre, default machin)
  - outputCsv (boolean, default false)
- Behavior: invoke benchmarkPi to produce runs.
- Response: 
  - `text/csv` lines `digits,timeMs` if outputCsv=true.
  - JSON array of objects `{ "digits": <n>, "timeMs": <ms> }` otherwise.
- Errors: 400 on invalid ranges.

### GET /convergence
- Query parameters:
  - digits (integer ≥ 10, default 1000)
  - algorithm (machin | gauss-legendre | chudnovsky, default machin)
  - iterations (integer ≥ 2, default 10)
- Response: `image/png` binary of convergence chart generated via visualizePiConvergence.
- Errors: 400 on invalid inputs.

### GET /distribution
- Query parameters:
  - digits (integer ≥ 1, default 1000)
  - algorithm (machin | gauss-legendre | chudnovsky, default machin)
- Response: `image/png` binary of digit frequency bar chart generated via visualizePiDigits.
- Errors: 400 on invalid inputs.

### GET /distribution-json
- Query parameters: digits, algorithm as above.
- Response: JSON object mapping "0" through "9" to counts from countPiDigitsJson.

### GET /search
- Query parameters:
  - pattern (digit string, required)
  - digits (integer ≥ 1, default 1000)
  - algorithm (default machin)
  - all (boolean, default false)
- Response: JSON `{ "position": <number|null> }` or `{ "positions": [<numbers>] }`.

### GET /hex
- Query parameters:
  - position (integer ≥ 0, required)
  - count (integer ≥ 1, default 1)
- Response: `text/plain` hex string from extractPiHex.

### GET /decimal
- Query parameters:
  - position (integer ≥ 0, required)
  - count (integer ≥ 1, required)
  - algorithm (default machin)
- Response: `text/plain` decimal substring from extractPiDecimal.

### GET /export
- Query parameters:
  - digits, algorithm
  - format (txt | json, default txt)
- Response: `text/plain` when txt, application/json `{ "pi": "..." }` when json.

### GET /pi/stream

Server-Sent Events endpoint:
- Query parameters: digits, algorithm.
- Response: `text/event-stream` streaming blocks of π digits;
  send `event: end` on completion, `event: error` on failure.

## CLI Interface

- Add flags in src/lib/main.js:
  - `--serve` (boolean) to start the HTTP API server; ignore other modes when set.
  - `--port <n>` to set listening port (default 3000; 0 for ephemeral).
- When serve is true, invoke startHttpServer with parsed port and keep the process running.
- Update CLI help to document available HTTP routes and query parameters.

## Dependencies

- Ensure Express is imported for routing and middleware.
- Use quickchart-js for PNG generation in chart endpoints.
- Use js-yaml for script parsing if supporting YAML scripts for report generation.
- No additional new dependencies.

## Testing

- **Unit Tests**:
  - Mock Express `req` and `res` objects in tests/unit/main.test.js to verify each route handler:
    - Valid query -> correct status, headers, and body type.
    - Invalid parameters -> 400 with descriptive JSON error.
    - Internal errors -> 500 with error message.
- **Integration Tests** (`tests/e2e/http.test.js`):
  - Start server on ephemeral port.
  - Send HTTP requests to each endpoint and assert:
    - Correct status codes and response types (JSON, CSV, PNG, SSE).
    - SSE endpoint streams data and ends with an end event.

# HTTP API Feature

## Overview
Extend the existing HTTP server registration in src/lib/main.js to fully implement a RESTful HTTP API exposing all core π operations, visualizations, benchmarks, searches, and streaming.  Each endpoint must validate inputs, invoke the appropriate library function, and return JSON, CSV, PNG, text, or SSE as specified.

## Endpoints

### GET /pi
- Query params:
  - digits (integer ≥ 1, ≤ 1e6; default 100)  
  - algorithm ("machin", "gauss-legendre", "chudnovsky"; default "machin")
- Response: 200 JSON `{ "pi": "<string>" }` with exactly `digits` total characters including integer part
- Errors: 400 JSON `{ "error": "<message>" }` on invalid inputs

### GET /benchmark
- Query params:
  - minDigits (integer ≥ 1; default 100)  
  - maxDigits (integer ≥ minDigits; required)  
  - step (integer ≥ 1; default = minDigits)  
  - algorithm ("machin"|"gauss-legendre"; default "machin")  
  - outputCsv (boolean; default false)
- Behavior: invoke benchmarkPi, then
  - If outputCsv=true, return `text/csv` lines `digits,timeMs`
  - Else return 200 JSON array `[ { digits: n, timeMs: m }, ... ]`
- Errors: 400 JSON on invalid parameters

### GET /convergence
- Query params:
  - digits (integer ≥ 10; default 1000)  
  - algorithm (supported values; default "machin")  
  - iterations (integer ≥ 2; default 10)  
  - output (string file path; optional when serving inline)
- Behavior: call visualizePiConvergence to write PNG or generate chart; respond `image/png` with binary data when output omitted or serve file otherwise
- Errors: 400 JSON on invalid inputs, 500 JSON on rendering failures

### GET /distribution
- Query params:
  - digits (integer ≥ 1; default 1000)  
  - algorithm (supported; default "machin")
- Behavior: call visualizePiDigits; respond `image/png` with binary data
- Errors: 400 or 500 JSON

### GET /distribution-json
- Query params:
  - digits, algorithm
- Behavior: call countPiDigitsJson; respond JSON object `{ "0": count0, …, "9": count9 }`
- Errors: 400 JSON

### GET /search
- Query params:
  - pattern (digit string; required)  
  - digits, algorithm, all (boolean)
- Behavior: call searchPi; return JSON `{ "position": n|null }` or `{ "positions": [n,…] }`
- Errors: 400 JSON

### GET /hex
- Query params:
  - position (integer ≥ 0; required)  
  - count (integer ≥ 1; default 1)
- Behavior: call extractPiHex; return `text/plain` hex string
- Errors: 400 JSON

### GET /decimal
- Query params:
  - position (integer ≥ 0; required)  
  - count (integer ≥ 1; required)  
  - algorithm (supported; default "machin")
- Behavior: call extractPiDecimal; return `text/plain` digits substring
- Errors: 400 JSON

### GET /export
- Query params:
  - digits, algorithm  
  - format ("txt"|"json"; default "txt")  
  - base ("10"|"16"|"2"; default "10")
- Behavior: compute π and respond:
  - text/plain for format=txt
  - application/json `{ "pi": "…" }` for format=json
- Errors: 400 or 500 JSON

### GET /pi/stream
- Query params:
  - digits, algorithm
- Behavior: register SSE endpoint streaming blocks of π digits as Server-Sent Events; set `Content-Type: text/event-stream`, send `data:` events for each chunk and an `event: end` on completion or `event: error` on failure
- Errors: 400 initial JSON response or SSE error event

## CLI Interface
- In src/lib/main.js main(): retain `--serve` and `--port` flags; when `--serve` is provided, ignore other modes and start the full HTTP API server
- Update CLI help to document all HTTP flags

## Dependencies
- Ensure express, quickchart-js, js-yaml, and json middleware are imported
- No new external dependencies required beyond those already declared

## Testing
- **Unit Tests**: in tests/unit/main.test.js or new tests/unit/http.test.js
  - Mock Express req/res to test each route handler: valid inputs yield correct status, headers, and body; invalid inputs yield 400 with JSON error
  - Stub underlying library functions to isolate route logic
  - Test SSE endpoint behavior by mocking response streams and event formatting
- **Integration Tests**: in tests/e2e/http.test.js
  - Start server on ephemeral port and issue HTTP requests to each endpoint
  - Assert correct status codes, response headers, body formats (JSON, CSV, PNG, plain text)
  - For SSE, connect and accumulate events until `end`, verify event order and content

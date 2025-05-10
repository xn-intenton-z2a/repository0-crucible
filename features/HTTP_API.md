# HTTP API Feature

## Overview

Extend the existing HTTP API to fully expose all core π operations, visualizations, searches, and streaming endpoints. Clients can interact with π calculation, benchmarking, chart generation, digit distribution, pattern search, digit extraction, exports, and real-time streaming over RESTful routes.

## Functional Requirements

### Server Setup
- In `src/lib/main.js`, within `startHttpServer`, register additional routes before the 404 fallback.
- Ensure Express middleware `express.json()` and `express.urlencoded({ extended: true })` are applied.

### GET /benchmark
- Query: `minDigits` (integer ≥1, default 100), `maxDigits` (integer ≥minDigits, required), `step` (integer ≥1, default = minDigits), `algorithm` (machin|gauss-legendre, default machin), `outputCsv` (boolean, default false)
- Invoke `benchmarkPi` to get array of `{ digits, timeMs }`.
- If `outputCsv=true`, respond with `text/csv` lines `digits,timeMs`.
- Otherwise respond with JSON array.
- Validate inputs; return 400 on invalid values.

### GET /convergence
- Query: `digits` (integer ≥10, default 1000), `algorithm` (machin|gauss-legendre|chudnovsky, default machin), `iterations` (integer ≥2, default 10)
- Require `convergenceOutput` flag by query or default to buffer response.
- Invoke `visualizePiConvergence`; set `Content-Type: image/png`; stream PNG buffer in response.
- Validate; return 400 on invalid values.

### GET /distribution
- Query: `digits` (integer ≥1, default 1000), `algorithm` (machin|gauss-legendre|chudnovsky, default machin)
- Invoke `visualizePiDigits`; set `Content-Type: image/png`; send PNG buffer.
- Validate inputs; 400 on error.

### GET /distribution-json
- Query: same digits and algorithm parameters.
- Invoke `countPiDigitsJson`; respond with JSON object mapping digits "0"–"9" to counts.

### GET /search
- Query: `pattern` (string of digits, required), `digits` (integer ≥1, default 1000), `algorithm` (default machin), `all` (boolean)
- Invoke `searchPi({ pattern, digits, algorithm, all })`.
- Respond with JSON: `{ position: number|null }` or `{ positions: number[] }`.
- Validate pattern and parameters; 400 on invalid.

### GET /hex
- Query: `position` (integer ≥0, required), `count` (integer ≥1, default 1)
- Invoke `extractPiHex`; respond with `text/plain` hex string.
- Validate; 400 on invalid.

### GET /decimal
- Query: `position` (integer ≥0, required), `count` (integer ≥1, required), `algorithm` (machin|gauss-legendre, default machin)
- Invoke `extractPiDecimal`; respond with `text/plain` decimal substring.
- Validate; 400 on invalid.

### GET /export
- Query: `digits`, `algorithm`, `format` (txt|json, default txt)
- Invoke `exportPi`; if `format=json`, respond JSON `{ pi: string }`; else send plain text.
- Validate; 400 on missing output path or invalid parameters.

### GET /pi/stream
- Query: `digits`, `algorithm` parameters.
- Register `/pi/stream` SSE endpoint; set headers `text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.
- Stream π digits in chunks via `EventSource` format: `data: <chunk>`, `event: end`, `event: error`.
- Invoke or adapt existing SSE logic.

## Dependencies
- Ensure dependencies in `package.json`: `express`, `quickchart-js`, `js-yaml` for any YAML script support, and built-in fs/promises.

## Testing

- **Unit Tests** (`tests/unit/main.test.js`): mock `Req`/`Res` to verify each route returns correct status, content-type, and body for valid and invalid queries; check CSV vs JSON for `/benchmark`; verify PNG endpoints produce valid PNG signature; test SSE logic by mocking response.write.
- **Integration Tests** (`tests/e2e/http.test.js`): start server on ephemeral port and issue HTTP requests to all endpoints; assert correct status codes, headers, and response bodies; validate error codes for invalid inputs.
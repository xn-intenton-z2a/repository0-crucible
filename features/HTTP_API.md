# HTTP API Feature

## Overview

Provide a comprehensive RESTful HTTP API that exposes core π operations, benchmarking, visualizations, and search or extraction endpoints. This enables external applications and services to integrate with the π toolkit over HTTP without invoking the CLI.

## Functional Requirements

### Server Startup

- In `startHttpServer(options)` within `src/lib/main.js`, extend Express routing to register the following endpoints.
- Ensure JSON and URL-encoded body parsing middleware are in place.
- Global error handler for uncaught exceptions returning HTTP 500 with JSON `{ "error": "<message>" }`.

### Endpoints

#### GET /pi
- Query params:
  - `digits` (integer ≥ 1, ≤ 1e6; default 100)
  - `algorithm` (`machin`, `gauss-legendre`, `chudnovsky`; default `machin`)
- Validate inputs, respond 400 on invalid with JSON `{ "error": "<message>" }`.
- Compute π and return 200 JSON `{ "pi": "<string>" }`.

#### GET /benchmark
- Query params:
  - `minDigits` (integer ≥ 1; default 100)
  - `maxDigits` (integer ≥ minDigits; required)
  - `step` (integer ≥ 1; default = minDigits)
  - `algorithm` (`machin` | `gauss-legendre`; default `machin`)
  - `outputCsv` (boolean; default false)
- Validate, respond 400 on invalid.
- Invoke `benchmarkPi` and:
  - If `outputCsv=true`, return text/csv CSV lines `digits,timeMs`.
  - Otherwise respond JSON array of `{ digits, timeMs }`.

#### GET /convergence
- Query params:
  - `digits` (integer ≥ 10; default 1000)
  - `algorithm` (supported values; default `machin`)
  - `iterations` (integer ≥ 2; default 10)
  - `output` (string; PNG file path optional when serving inline)
- Validate, respond 400 on invalid.
- Generate PNG via `visualizePiConvergence` and respond `image/png` with binary data.

#### GET /distribution
- Query params:
  - `digits` (integer ≥ 1; default 1000)
  - `algorithm` (supported values; default `machin`)
- Validate, respond 400 on invalid.
- Generate PNG via `visualizePiDigits` and respond `image/png`.

#### GET /search
- Query params:
  - `pattern` (digit string; required)
  - `digits`, `algorithm`, `all` (boolean)
- Validate, respond 400 on invalid.
- Invoke `searchPi({ pattern, digits, algorithm, all })` and return:
  - If `all=false`, JSON `{ "position": <number|null> }`.
  - If `all=true`, JSON `{ "positions": [<numbers>] }`.

#### GET /hex
- Query params:
  - `position` (integer ≥ 0; required)
  - `count` (integer ≥ 1; default 1)
- Validate, respond 400 on invalid.
- Invoke `extractPiHex(position, count)` and return `text/plain` with the hex string.

#### GET /decimal
- Query params:
  - `position` (integer ≥ 0; required)
  - `count` (integer ≥ 1; required)
  - `algorithm` (supported; default `machin`)
- Validate, respond 400 on invalid.
- Invoke `extractPiDecimal(position, count, algorithm)` and return `text/plain` with digits.

#### GET /export
- Query params:
  - `digits`, `algorithm`
  - `format` (`txt`|`json`; default `txt`)
  - `base` (`2`|`10`|`16`; default `10`)
- Validate, respond 400 on invalid.
- Compute π and respond:
  - `text/plain` for `format=txt`.
  - `application/json` `{ "pi": "<string>" }` for `format=json`.

#### GET /pi/stream
- Query params:
  - `digits`, `algorithm`
- Validate, respond 400 on invalid.
- Set SSE headers, compute π in chunks (e.g. 100 digits), send Server-Sent Events stream with data events of digit blocks, end with an `end` event.

## CLI Interface

- Extend `main` in `src/lib/main.js` to accept flags:
  - `--serve` (boolean) to start HTTP server and ignore other CLI modes.
  - `--port <n>` to set server port (default 3000, `0` for ephemeral).
- On `--serve`, call `startHttpServer({ port })` and keep process alive.
- Update CLI help text to document `--serve` and `--port` flags.

## Dependencies

- Ensure `express` is listed in `package.json` and imported in `src/lib/main.js`.
- Import QuickChart, js-yaml, and other libraries as needed by route handlers (quickchart-js for on‐the‐fly chart rendering, js-yaml for script parsing if reusing script mode internally).

## Testing

- **Unit tests** in `tests/unit/main.test.js`:
  - Mock Express `req`/`res` to test each route handler directly.
  - Validate correct status codes, headers, and response bodies on valid and invalid inputs.
  - Stub underlying library functions (`calculatePi`, `benchmarkPi`, etc.) to isolate handler logic.

- **Integration tests** in `tests/e2e/http.test.js`:
  - Start server on ephemeral port.
  - Issue HTTP requests to each endpoint with valid parameters and assert:
    - Correct HTTP status, headers (`Content-Type`), and body content.
  - Test error scenarios: missing or invalid params return 400 with JSON error.
  - Test internal failures return 500 with JSON error.
  - Test SSE stream endpoint: accumulate events, assert event types (`data`, `end`) and content.

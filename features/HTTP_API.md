# HTTP API Feature

## Overview
Provide an HTTP server interface on top of the existing π computation and benchmarking library to enable programmatic access via RESTful endpoints. This allows integration with other services and simplifies automation without invoking the CLI.

## Functional Requirements

- Add a `startHttpServer(options)` function in `src/lib/main.js`.
  - `options.port` (integer): port to listen on (default 3000).
- Parse query parameters from HTTP GET requests and invoke the existing library functions:
  - `/pi` endpoint:
    - Query `digits` (integer, default 100) and `algorithm` (string, `machin` or `gauss-legendre`, default `machin`).
    - Return JSON `{ pi: string }` with π to the requested precision.
  - `/benchmark` endpoint:
    - Query `minDigits`, `maxDigits`, `step`, and `algorithm` parameters.
    - Return JSON array of `{ digits: number, timeMs: number }` for each benchmark run.
- Validate parameters and return HTTP 400 with descriptive JSON error on invalid input.
- Handle server start failures with process exit and error log.

## HTTP Endpoints

- GET `/pi?digits=200&algorithm=gauss-legendre`
- GET `/benchmark?minDigits=100&maxDigits=500&step=100&algorithm=machin`

## Dependencies

- Add `express` to `package.json` dependencies for routing and parsing query parameters.

## Testing

- Add integration tests in `tests/unit/main.test.js` or `tests/e2e/http.test.js`:
  - Start server on an ephemeral port.
  - Issue HTTP requests to `/pi` and `/benchmark` and assert JSON response structure and content.
  - Validate error responses for missing or invalid query parameters.

# HTTP API Feature

## Overview

Provide a comprehensive RESTful HTTP API that exposes core π operations and related visualizations so that external applications can integrate without invoking the CLI directly.

# Functional Requirements

- Extend startHttpServer in src/lib/main.js to register the following endpoints:
  - GET /pi
    - Query parameters: digits (integer ≥1, default 100), algorithm (machin|gauss-legendre|chudnovsky, default machin)
    - Validate inputs and return 400 with JSON {error} on invalid values
    - Compute π and respond 200 JSON {pi: string}
  - GET /benchmark
    - Query parameters: minDigits (integer ≥1, default 100), maxDigits (integer ≥ minDigits), step (integer ≥1, default minDigits), algorithm (machin|gauss-legendre, default machin)
    - Validate inputs and return 400 on invalid ranges
    - Invoke benchmarkPi and respond 200 JSON array [{digits, timeMs}]
  - GET /convergence
    - Query parameters: digits (integer ≥10, default 1000), algorithm, iterations (integer ≥2, default 10)
    - Validate inputs, generate a PNG via visualizePiConvergence, and respond image/png
  - GET /distribution
    - Query parameters: digits (integer ≥1, default 1000), algorithm
    - Validate inputs, generate a PNG via visualizePiDigits, and respond image/png
  - GET /search
    - Query parameters: pattern (digit string), digits (integer ≥1, default 1000), algorithm, all (boolean, default false)
    - Validate pattern and options, invoke searchPi, and respond 200 JSON {position} or {positions}
  - GET /hex
    - Query parameters: position (integer ≥0), count (integer ≥1)
    - Validate inputs, invoke extractPiHex, and respond 200 text/plain
  - GET /decimal
    - Query parameters: position (integer ≥0), count (integer ≥1), algorithm
    - Validate inputs, invoke extractPiDecimal, and respond 200 text/plain
  - GET /export
    - Query parameters: digits, algorithm, format (txt|json, default txt), base (2|10|16, default 10)
    - Validate inputs, invoke exportPi or format accordingly, and respond text/plain or application/json
  - GET /pi/stream
    - Query parameters: digits, algorithm
    - Validate inputs, set SSE headers, stream digit chunks from calculatePi or a streaming variant, send end event and close on completion or error
- Add a global error handler to send 500 JSON {error} on unhandled errors

# CLI Interface

- Extend CLI parser in src/lib/main.js to accept flags:
  --serve          Start HTTP API server (ignore other flags)
  --port <n>       Port number for HTTP server (default 3000; 0 for ephemeral)
- When serve is true, call startHttpServer({port}) and keep process running until terminated
- Update help output to document serve and port flags

# Dependencies

- Ensure express is listed in package.json dependencies and imported in src/lib/main.js
- No additional external dependencies required beyond express and existing chart libraries

# Testing

- Add integration tests in tests/e2e/http.test.js:
  - Start server on an ephemeral port
  - Test each endpoint with valid parameters and assert status codes, headers, and response bodies
  - Test validation errors for missing or invalid query parameters return 400 with JSON error
  - Test internal errors return 500 with JSON error
  - Test SSE endpoint: read events until end, verify data chunks and event types
- Add unit tests in tests/unit/main.test.js to mock and stub dependencies:
  - Verify endpoints dispatch to the correct library functions
  - Simulate errors in handlers and confirm appropriate HTTP status and JSON error responses
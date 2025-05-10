# Overview

Extend the existing CLI tool and library with a RESTful HTTP API that exposes all core π calculation, export, visualization, search, and extraction features. This enables other applications or services to integrate programmatic access to π operations without invoking the CLI.

# Functional Requirements

- In src/lib/main.js, import express and implement a function startHttpServer(options).
  - options.port: integer (default 3000).
- Register the following endpoints:
  - GET /pi
    - Query parameters: digits (integer, default 100), algorithm (machin|gauss-legendre|chudnovsky, default machin)
    - Return JSON { pi: string } with π to the requested precision.
  - GET /benchmark
    - Query parameters: minDigits, maxDigits, step (integers), algorithm (machin|gauss-legendre, default machin)
    - Return JSON array of { digits: number, timeMs: number } from benchmarkPi.
  - GET /pi/stream
    - Query parameters: digits (integer, default 1000), algorithm (machin|gauss-legendre|chudnovsky)
    - Serve Server-Sent Events streaming digit blocks as in the PI Streaming feature.
  - GET /export
    - Query parameters: digits, algorithm, format (txt|json, default txt), base (2|10|16, default 10)
    - Return a text or JSON response with the converted π string; set Content-Type accordingly.
  - GET /convergence
    - Query parameters: digits, algorithm, iterations
    - Generate a PNG convergence chart and return it with Content-Type image/png.
  - GET /distribution
    - Query parameters: digits, algorithm
    - Generate a PNG digit distribution chart and return it with Content-Type image/png.
  - GET /search
    - Query parameters: pattern (digits), digits, algorithm, all (boolean)
    - Return JSON { position: number|null } or { positions: number[] }.
  - GET /hex
    - Query parameters: position (integer), count (integer)
    - Return text/plain hex digit substring from extractPiHex.
  - GET /decimal
    - Query parameters: position (integer), count (integer), algorithm
    - Return text/plain decimal digit substring from extractPiDecimal.
- Validate all parameters on each endpoint; respond with status 400 and JSON { error: string } for invalid values.
- Handle internal server errors with status 500 and JSON { error: string }.

# CLI Interface

- Add flags --serve (boolean) and --port <n> in the CLI parser in src/lib/main.js.
- When --serve is provided, invoke startHttpServer with the parsed port and keep the process running, ignoring other computation flags.
- Update the CLI help output to document the serve and port options.

# Dependencies

- Add express to package.json dependencies.
- Import express and use express.json middleware in src/lib/main.js.

# Testing

- Add integration tests in tests/e2e/http.test.js:
  - Start the HTTP server on an ephemeral port.
  - Issue valid requests to each endpoint and assert response status codes, headers, and body content or streams.
  - Test error responses for missing or invalid query parameters return status 400 and descriptive JSON errors.
  - Test SSE endpoint by connecting and collecting events until stream end.

# Overview

Extend the existing HTTP server interface to expose all core library functions as RESTful JSON endpoints, SSE streams, and image or file downloads. This enhancement enables programmatic access to calculation, export, visualization, search, and extraction capabilities over HTTP without invoking the CLI.

# Functional Requirements

- In src/lib/main.js, enhance startHttpServer(options):
  - Accept options.port (integer, default 3000).
  - Register endpoints:
    - GET /pi
      - Query parameters: digits (integer, default 100), algorithm (machin|gauss-legendre|chudnovsky, default machin)
      - Return JSON { pi: string } with π to the requested precision.
    - GET /benchmark
      - Query parameters: minDigits, maxDigits, step (integers), algorithm (machin|gauss-legendre, default machin)
      - Return JSON array of { digits: number, timeMs: number }.
    - GET /pi/stream
      - Query parameters: digits (integer, default 1000), algorithm (machin|gauss-legendre|chudnovsky)
      - Use Server-Sent Events (Content-Type: text/event-stream) to stream digit blocks as defined in the PI Streaming feature.
    - GET /export
      - Query parameters: digits, algorithm, format (txt|json, default txt), base (2|10|16, default 10)
      - Return a file download or JSON response with the converted π string. For txt, Content-Type: text/plain; for json, application/json.
    - GET /convergence
      - Query parameters: digits, algorithm, iterations, output not required (response is PNG)
      - Generate a PNG chart illustrating convergence and return Content-Type: image/png.
    - GET /distribution
      - Query parameters: digits, algorithm
      - Generate a PNG bar chart of digit frequencies and return Content-Type: image/png.
    - GET /search
      - Query parameters: pattern (digits), digits, algorithm, all (boolean, default false)
      - Return JSON { position: number|null } or { positions: number[] }.
    - GET /hex
      - Query parameters: position (integer), count (integer, default 1)
      - Return the lowercase hexadecimal string of the requested digits with Content-Type: text/plain.
    - GET /decimal
      - Query parameters: position (integer), count (integer), algorithm
      - Return the decimal digit substring with Content-Type: text/plain.
  - Validate all parameters; on invalid values respond with status 400 and JSON { error: string }.
  - Handle server errors and port conflicts with appropriate HTTP status codes and logs.

# CLI Interface

- Add a --serve flag in src/lib/main.js. When provided, start the HTTP server and ignore standalone computation flags.
- Add a --port <n> flag to specify the listening port.
- Update CLI help output to document --serve and --port.

# Dependencies

- Use the existing express dependency for routing and SSE support; no new dependencies required.
- Import express, use express.json middleware for error responses.

# Testing

- Add integration tests in tests/e2e/http.test.js:
  - Start server on an ephemeral port.
  - Issue GET requests to each endpoint with valid parameters and assert response status, headers, and body content.
  - Test SSE streaming endpoint by connecting and collecting events until end event.
  - Verify error responses for missing or invalid query parameters produce status 400 and descriptive JSON error.
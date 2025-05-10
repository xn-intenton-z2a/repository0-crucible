# Overview

Extend the CLI tool and library with a RESTful HTTP API that exposes core π operations—calculation, extraction, search, export, convergence visualization, distribution charts, benchmarking, and streaming—so external applications can integrate without invoking the CLI directly.

# Functional Requirements

- In src/lib/main.js, import express and implement async function startHttpServer(options):
  - options.port: integer (default 3000).
  - Configure express with express.json(), express.urlencoded({extended:true}).
  - Register endpoints:
    - GET /pi
      - Query: digits (integer≥1 default 100), algorithm (machin|gauss-legendre|chudnovsky default machin).
      - Validate inputs. On error respond 400 with JSON { error }.
      - Compute π and respond 200 JSON { pi: string }.
    - GET /benchmark
      - Query: minDigits (int≥1 default 100), maxDigits (int≥minDigits), step (int≥1 default=minDigits), algorithm (machin|gauss-legendre default machin).
      - Compute benchmarkPi and respond 200 JSON array of { digits, timeMs }.
    - GET /pi/stream
      - Query: digits (int≥1 default 1000), algorithm (machin|gauss-legendre|chudnovsky default machin).
      - Set headers Content-Type:text/event-stream,Cache-Control:no-cache,Connection:keep-alive.
      - Stream SSE blocks from calculatePi or streaming variant. On error send SSE event:error and close.
    - GET /export
      - Query: digits, algorithm, format (txt|json default txt), base (2|10|16 default 10).
      - Convert π and respond text/plain or application/json accordingly.
    - GET /convergence
      - Query: digits (int≥10 default 1000), algorithm, iterations (int≥2 default 10).
      - Generate PNG via visualizePiConvergence and respond image/png.
    - GET /distribution
      - Query: digits (int≥1 default 1000), algorithm.
      - Generate PNG via visualizePiDigits and respond image/png.
    - GET /search
      - Query: pattern (digit string), digits, algorithm, all (boolean default false).
      - Invoke searchPi, respond 200 JSON { position } or { positions }.
    - GET /hex
      - Query: position (int≥0), count (int≥1).
      - Invoke extractPiHex, respond 200 text/plain.
    - GET /decimal
      - Query: position (int≥0), count (int≥1), algorithm.
      - Invoke extractPiDecimal, respond 200 text/plain.
  - Global error handler: catch unhandled errors respond 500 { error }.

# CLI Interface

- Add flags to CLI parser in src/lib/main.js:
  --serve         start HTTP server
  --port <n>      port number for HTTP server (default 3000)
- When --serve is true, ignore other computation flags, invoke startHttpServer({ port }), and keep process alive.
- Update help output to document serve and port.

# Dependencies

- Add express to package.json dependencies.
- Import express from 'express' in src/lib/main.js.

# Testing

- Create tests/e2e/http.test.js:
  - Start server on ephemeral port.
  - Test each endpoint with valid parameters: assert status, headers, and response body or stream.
  - Test validation errors: missing/invalid params return 400 with JSON error.
  - Test internal errors return 500.
  - Test SSE stream endpoint receives proper event sequences including end event.
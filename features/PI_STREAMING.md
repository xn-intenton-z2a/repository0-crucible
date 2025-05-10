# PI Streaming Feature

## Overview
Add a Server-Sent Events (SSE) endpoint to stream π digits in real time, enabling clients to receive an ongoing sequence of digits as they are computed. Supports algorithm choice, digit limit, and graceful termination.

## HTTP Streaming Endpoint
- Extend startHttpServer to register GET /pi/stream
- Accept query parameters:
  - digits (integer, default 1000)
  - algorithm (machin, gauss-legendre, chudnovsky, default machin)
- Set response headers:
  - Content-Type: text/event-stream
  - Cache-Control: no-cache
  - Connection: keep-alive
- Initiate SSE by sending an initial comment or event
- Compute π iteratively in chunks (e.g. blocks of 100 digits) using calculatePi or a streaming variant
- After computing each chunk, send an SSE message containing the next block of digits
- On completion or client disconnect, send event: end and close connection
- On error, send event: error with descriptive message and close

## CLI Interface
- Introduce --stream flag in src/lib/main.js
- Flags:
  - --digits <n>
  - --algorithm <name>
  - --stream (boolean)
  - --port <n> for HTTP server
- When --stream is provided, start HTTP server and enable /pi/stream endpoint. Do not exit immediately

## Dependencies
- Use built-in express import; no new dependencies required
- Leverage AbortController to handle client disconnects and cancel computation if supported

## Testing
- Add integration tests in tests/unit/main.test.js or tests/e2e/http.test.js
  - Start server on ephemeral port
  - Issue HTTP GET to /pi/stream?digits=100&algorithm=machin
  - Read SSE events and accumulate data until end event
  - Assert sequence of SSE lines matches expected digit chunks
  - Test error handling for invalid parameters and abrupt client disconnect
# Overview
Implement an HTTP server mode that exposes two primary endpoints for π generation and benchmarking. Clients can request π digits in text or PNG format via GET /pi and run performance benchmarks via GET /benchmark. Both endpoints support real-time progress reporting using Server-Sent Events for long-running operations.

# Endpoints

## GET /pi

- Query parameters
  - digits (integer 1–10000, default 100)
  - method (chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  - format (text|png, default text)
  - progressInterval (integer 1–100, default 5)

Behavior
- If progressInterval is provided, respond with SSE stream of progress events.
- format=text
  - On normal request, respond with Content-Type: text/plain and the π digit string.
- format=png
  - Respond with Content-Type: image/png and a rendered monochrome PNG of the π digits.

## GET /benchmark

- Query parameters
  - digits (integer 1–10000, default 100)
  - methods (comma-separated list of supported methods or omit for all)
  - runs (integer ≥1, default 3)
  - progressInterval (integer 1–100, default 5)

Behavior
- If progressInterval is provided, respond with SSE stream of progress events for benchmark runs.
- On normal request, respond with Content-Type: application/json and an array of timing results:
  [ { method, runs, averageTimeMs, minTimeMs, maxTimeMs } ]

# Implementation Details

1. CLI Integration
   - Parse --serve and --port flags in src/lib/main.js. On --serve, skip CLI computation and start the HTTP server.
2. Server Setup
   - Use express for routing and zod for request validation.
   - Create an Express app with JSON and URL-encoded middleware.
   - On GET /pi:
     • Validate parameters with Zod.
     • If progressInterval present, upgrade response to SSE with headers: text/event-stream, no-cache, keep-alive.
     • Call calculatePi with onProgress callback that writes SSE events:
         event: progress
         data: { percentComplete }
     • For PNG format, generate image buffer via renderPiAsPng and write as SSE payload or direct response.
     • After completion, write final event or end response.
   - On GET /benchmark:
     • Validate parameters.
     • If progressInterval present, use SSE to stream progress per run and per method.
     • Call benchmarkPi and stream per-run or send final JSON.
3. Utilities
   - Implement helper to wrap response.writeSSE(event, data).
   - Reuse existing calculatePi, benchmarkPi, and renderPiAsPng from src/lib.
4. Dependencies
   - Add express, zod, swagger-ui-express, swagger-jsdoc (optional for future OpenAPI). Ensure minimal dependencies for core endpoints.

# Tests

- Create tests/unit/http.server.test.js:
  • Test /pi returns text/plain and correct π string.
  • Test /pi?format=png returns image/png buffer with expected dimensions.
  • Test /pi?progressInterval=10 returns SSE events sequence of progress and final result.
  • Test /benchmark returns JSON with correct structure.
  • Test /benchmark?progressInterval=20 returns SSE progress events and final JSON event.

# Documentation

1. README.md
   - Add HTTP Server Mode section with examples for /pi and /benchmark with and without progress.
2. docs/USAGE.md
   - Document new query parameters progressInterval and example curl commands.

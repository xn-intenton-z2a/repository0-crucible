# Overview
Enable HTTP server mode for the π calculator tool. When invoked with the --serve flag and optional --port, the CLI launches an Express-based server exposing key endpoints for health checks, on-demand π computation in text or PNG, real-time streaming of progress, and performance benchmarking.

# Endpoints

## GET /health
Return service health status

- Status: 200
- Body: { "status": "ok" }

## GET /pi
Compute π on demand

- Query parameters
  - digits (integer 1–10000, default 100)
  - method (chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  - format (text|png, default text)
- Behavior
  - format=text: respond with Content-Type text/plain and the π digit string
  - format=png: render a monochrome PNG of π digits and respond with Content-Type image/png

## GET /pi/stream
Stream computation progress and final result via Server-Sent Events

- Query parameters: same as /pi plus progressInterval (integer 1–100, default 5)
- Headers: Content-Type text/event-stream, Cache-Control no-cache, Connection keep-alive
- Events
  - progress: JSON payload { percentComplete: number } emitted at each interval
  - result: JSON payload { pi: string, pngBase64?: string } then close stream

## GET /benchmark
Run performance benchmarks and return timing data

- Query parameters
  - digits (integer 1–10000, default 100)
  - methods (comma-separated list or omitted for all)
  - runs (integer ≥1, default 3)
- Response: application/json array of { method, runs, averageTimeMs, minTimeMs, maxTimeMs }

# CLI Integration

- Add flags --serve (boolean) and --port <n> (integer ≥1, default 3000)
- When --serve is true, skip CLI output logic and instantiate the HTTP server on the specified port

# Implementation Details

1. Dependencies: express for HTTP, zod for request validation, pureimage for PNG rendering
2. Server Setup in main.js
   - Initialize Express app with JSON middleware
   - Register routes for /health, /pi, /pi/stream, /benchmark
   - Use Zod schemas to validate and parse query parameters
   - In /pi and /pi/stream, delegate to calculatePi or PNG rendering helper
   - In /pi/stream, use response.write for SSE events and close after result
   - In /benchmark, call benchmarkPi and return JSON
3. Startup: app.listen on configured port and log server URL

# Tests

- Unit tests with supertest in tests/unit/http.server.test.js
  - /health returns status ok
  - /pi returns correct text and image content types and bodies
  - /pi/stream SSE emits progress events and final result
  - /benchmark returns JSON with expected method entries

# Documentation

- Update README.md under HTTP Server Mode with usage for --serve and --port and examples for each endpoint
- Update docs/USAGE.md to document query parameters, expected responses, and SSE event formats
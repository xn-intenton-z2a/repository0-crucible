# Overview
Extend the CLI tool to support an embedded HTTP server mode, exposing REST endpoints for π calculation, benchmarking, SSE progress streaming, and self-documenting OpenAPI+Swagger UI.

# CLI Integration
When invoked with --serve, the application enters HTTP server mode:

• Parse flags --serve (boolean) and --port <n> (integer, default 3000).
• If --serve is present, skip CLI output and start the HTTP server on the specified port.

# Server Implementation

Dependencies:
• express for routing and HTTP server
• cors for cross-origin support
• zod for request validation
• swagger-ui-express for serving Swagger UI

In src/lib/main.js:

1. Detect serve mode and initialize an Express app.
2. Apply cors() and express.json() middleware.
3. Mount routes below.

# Routes

## GET /pi
Query parameters:
• digits: integer 1–10000 (required)
• method: ‘chudnovsky’, ‘gauss-legendre’, ‘machin’, ‘nilakantha’ (optional, default chudnovsky)
• format: ‘text’ or ‘png’ (optional, default text)

Behavior:
• Validate inputs with zod schemas; on failure respond 400 JSON { error: string }.
• On format=text, call calculatePi and respond 200 text/plain with the π string.
• On format=png, render a monochrome PNG via pureimage, set Content-Type image/png and stream image.

## GET /benchmark
Query parameters:
• digits: integer 1–10000 (required)
• methods: comma-separated list of methods (optional, default all)
• runs: integer ≥1 (optional, default 3)

Behavior:
• Validate inputs; on failure respond 400 JSON { error: string }.
• Call benchmarkPi, respond 200 application/json with array of BenchmarkResult.

## GET /pi/stream
Query parameters: same as /pi, plus optional progress-interval: integer 1–100 (default 5)

Behavior:
• On connection, set headers for SSE: Content-Type text/event-stream, Cache-Control no-cache, Connection keep-alive.
• During calculatePi, emit event: progress with JSON payload { percentComplete } at each interval.
• On completion emit event: result with payload { pi, pngBase64? } and close the stream.

## GET /openapi.json and /docs

- Generate OpenAPI spec covering /pi, /benchmark, /pi/stream, /openapi.json and /docs.
- Serve spec JSON at /openapi.json.
- Serve interactive Swagger UI at /docs using swagger-ui-express.

# Tests

Add unit tests in tests/unit/http.server.test.js:
• Validate GET /pi returns correct payloads and status codes.
• Validate GET /benchmark returns JSON array of results.
• Validate GET /pi/stream SSE stream emits progress and result events in order.
• Validate /openapi.json returns valid OpenAPI schema.
• Validate /docs serves Swagger UI HTML.

Add integration tests in tests/e2e/http.server.e2e.js using supertest and eventsource-parser.

# Documentation

Update README.md and docs/USAGE.md:
• Describe --serve and --port flags.
• Show examples for all HTTP endpoints, including SSE and Swagger UI.
• Note error formats and response content types.

# Overview
Enhance and consolidate the existing HTTP server mode to include a health check endpoint alongside π generation, benchmarking, and Server-Sent Events (SSE) streaming for real-time progress. This feature enables monitoring, client integrations, and robust API usage.

# Endpoints

## GET /health
- Description: Provide service health and version information.
- Response:
  - Status: 200 OK
  - Content-Type: application/json
  - Payload: { "status": "ok", "uptime": <seconds>, "version": "<semver>" }

## GET /pi
- Query parameters:
  - digits (integer 1–10000, default 100)
  - method (chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  - format (text|png, default text)
  - progressInterval (integer 1–100, default 5)
- Behavior:
  - Without progressInterval: return π result directly.
  - With progressInterval: upgrade to SSE stream.
    • Emit `progress` events with { percentComplete }.
    • Final event `result` with { pi, pngBase64? }.
- Responses:
  - text: Content-Type: text/plain, body = π string.
  - png: Content-Type: image/png, body = PNG buffer.

## GET /benchmark
- Query parameters:
  - digits (integer 1–10000, default 100)
  - methods (comma-separated list or omitted for all)
  - runs (integer ≥1, default 3)
  - progressInterval (integer 1–100, default 5)
- Behavior:
  - Without progressInterval: return JSON timings.
  - With progressInterval: SSE stream of per-run progress.
- Response:
  - JSON: Content-Type: application/json, body = [ { method, runs, averageTimeMs, minTimeMs, maxTimeMs } ]

# Implementation Details

1. CLI Integration
   - Parse --serve and --port flags. When --serve is set, start HTTP server on given port and skip CLI-only output.
   - Accept `--health-path` override if needed (optional).

2. Server Setup
   - Use Express for routing and Zod for request validation.
   - Implement /health route returning uptime and version from package.json.
   - Implement /pi and /benchmark routes per endpoint spec.
   - For SSE, set headers: Content-Type: text/event-stream; Cache-Control: no-cache; Connection: keep-alive. Flush after each event.
   - Reuse calculatePi, benchmarkPi, and renderPiAsPng helper for generation.

3. Utilities
   - Helper writeSSE(response, event, data) to format and send events.
   - Centralize Zod schemas for query parameters and validate on each request.

# Tests

- tests/unit/http.server.test.js
  • Verify GET /health returns 200 and valid JSON schema.
  • Test GET /pi returns correct text/plain and correct π string.
  • Test GET /pi?format=png returns image/png of expected dimensions.
  • Test GET /pi?progressInterval=10 returns SSE stream with progress and result events.
  • Test GET /benchmark returns JSON array with correct structure.
  • Test GET /benchmark?progressInterval=20 returns SSE stream with progress followed by final JSON event.

# Documentation

1. README.md
   - Add "Health Endpoint" section under HTTP Server Mode with example:
     curl http://localhost:3000/health

2. docs/USAGE.md
   - Document /health endpoint, response schema, and example.
   - Update HTTP Server Examples to include health check.
   - Ensure progressInterval parameter and SSE usage examples are up to date.

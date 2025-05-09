# Overview

Enable HTTP server mode for the π calculator tool. When invoked with the --serve flag the CLI launches an Express-based web server exposing REST endpoints for health checks, on-demand π computation (text or PNG), real-time streaming of progress via SSE, benchmarking, and interactive API documentation via OpenAPI and Swagger UI.

# Endpoints

## GET /health
Return service health.

- Response status: 200
- Body: `{ "status": "ok" }`

## GET /pi
Compute π on demand.

- Query parameters:
  - `digits` (integer 1–10000, default 100)
  - `method` (chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)
  - `format` (text|png, default text)
- Behavior:
  - For `format=text`: respond with Content-Type `text/plain` and the π digit string.
  - For `format=png`: render a monochrome PNG image of π digits and respond with Content-Type `image/png`.

## GET /pi/stream
Stream real-time progress and final result via Server-Sent Events.

- Query parameters: same as `/pi` plus `progressInterval` (integer 1–100, default 5)
- Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`
- Events:
  - `progress`: JSON payload `{ "percentComplete": number }` emitted at each interval
  - `result`: JSON payload `{ "pi": string, "pngBase64"?: string }` after completion, then the stream closes

## GET /benchmark
Run performance benchmarks and return timing data.

- Query parameters:
  - `digits` (integer 1–10000, default 100)
  - `methods` (comma-separated list or omitted for all)
  - `runs` (integer ≥1, default 3)
- Response: Content-Type `application/json`, array of `{ method, runs, averageTimeMs, minTimeMs, maxTimeMs }`

## GET /openapi.json
Serve the OpenAPI specification for all server endpoints.

- Response status: 200
- Content-Type: `application/json`
- Body: valid OpenAPI 3.x document including paths `/health`, `/pi`, `/pi/stream`, `/benchmark`, `/openapi.json`, `/docs`

## GET /docs
Serve the Swagger UI interface pointing to `/openapi.json`.

- Response status: 200
- Content-Type: `text/html`
- Body: interactive API documentation UI

# Implementation Details

1. Dependencies
   - Add `express` and `swagger-ui-express` to dependencies
   - Add `zod` (already present) for input validation
   - Add `supertest` to devDependencies for testing

2. CLI Integration
   - In `src/lib/main.js`, parse flags `--serve` and `--port` (default 3000)
   - If `serve` is true, skip existing CLI output logic and initialize the HTTP server

3. Server Setup
   - Create an Express app with JSON middleware
   - Define Zod schemas for query parameters in each route
   - Implement route handlers:
     - `/health` returns `{ status: 'ok' }`
     - `/pi` calls `calculatePi` or PNG rendering via `pureimage`
     - `/pi/stream` uses `calculatePi` with an `onProgress` callback to send SSE frames
     - `/benchmark` calls `benchmarkPi`
     - `/openapi.json` returns a generated OpenAPI spec object
     - `/docs` uses `swagger-ui-express` to serve Swagger UI and point to `/openapi.json`
   - Listen on configured port and log startup message

# Tests

Extend `tests/unit/http.server.test.js` with Supertest cases:

- Verify `/openapi.json` returns valid JSON including expected paths
- Verify `/docs` returns 200 HTML containing Swagger UI assets
- Ensure existing tests for `/health`, `/pi`, `/pi/stream`, and `/benchmark` continue to pass

# Documentation

- Update `README.md` under HTTP Server Mode to list new endpoints `/openapi.json` and `/docs` with usage examples
- Update `docs/USAGE.md` in the HTTP Server section to document both endpoints and include `curl` examples for retrieving the OpenAPI spec and opening Swagger UI

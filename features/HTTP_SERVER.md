# HTTP_SERVER

## Overview
Extend the CLI with a `--serve` flag to start an embedded HTTP server exposing REST endpoints for π computation, benchmarking, health checks, and Server-Sent Events (SSE) streaming, plus auto-generated OpenAPI documentation with Swagger UI.

## CLI Integration

When invoked with `--serve` (and optional `--port <n>`), the tool launches an Express HTTP server instead of running local π computation or benchmarks.

- `--serve`          Start HTTP server mode.
- `--port <n>`       Port for HTTP server (integer ≥1, default 3000).

Example:

    node src/lib/main.js --serve --port 4000

## Endpoints

### GET /health
Return readiness status.

- Response: 200 JSON `{ "status": "ok" }`

### GET /pi
Compute π and return as text or PNG.

- Query parameters:
  - `digits` (int 1–10000, default 100)
  - `method` (string among chudnovsky, gauss-legendre, machin, nilakantha; default chudnovsky)
  - `format` (text|png, default text)
- Responses:
  - `text/plain` with digit string when `format=text`
  - `image/png` with monochrome PNG of rendered digits when `format=png`

### GET /pi/stream
SSE endpoint streaming progress and final result.

- Query parameters same as `/pi` plus:
  - `progressInterval` (int 1–100, default 5)
- Response headers: 
  - `Content-Type: text/event-stream`
  - `Cache-Control: no-cache`
  - `Connection: keep-alive`
- Event stream:
  - `event: progress` with JSON `{ percentComplete: number }`
  - `event: result` with JSON `{ pi: string, pngBase64?: string }` then stream closes

### GET /benchmark
Benchmark π methods over HTTP.

- Query parameters:
  - `digits` (int 1–10000, default 100)
  - `methods` (comma-separated method names, default all)
  - `runs` (int ≥1, default 3)
- Response: 200 JSON array of objects `{ method, runs, averageTimeMs, minTimeMs, maxTimeMs }`

### GET /openapi.json
Serve the OpenAPI specification as JSON describing all endpoints and their schemas.

- Response: 200 JSON OpenAPI document

### GET /docs
Serve Swagger UI to explore and test API interactively.

- Response: 200 HTML page

## Implementation Details

1. Add dependencies: express, swagger-ui-express, js-yaml, zod (already present).
2. In `src/lib/main.js`:
   - Parse `--serve` and `--port` flags.
   - When `serve` is true, initialize an Express app:
     - Apply JSON body parsing and CORS if needed.
     - Mount routes as specified.
     - For `/pi` and `/benchmark`, use `calculatePi` and `benchmarkPi` imports.
     - For `/pi/stream`, implement SSE with `onProgress` callback wired to `calculatePi`.
     - Use Zod to validate query parameters and return 400 JSON errors on validation failures.
     - Load or generate OpenAPI spec (e.g., build in code or YAML file) and serve via `/openapi.json`.
     - Serve Swagger UI at `/docs` using swagger-ui-express pointing to `/openapi.json`.
   - Listen on the specified port and log server URL.
3. Extract shared validation schemas and SSE writer helper into separate functions in `src/lib/server.js`.

## Testing

- Create `tests/unit/http.server.test.js`:
  - Test `/health` returns 200 and `{ status: ok }`.
  - Test `/pi` text and PNG responses with valid and invalid params.
  - Test `/pi/stream` emits progress events and final result using fast stub of `calculatePi`.
  - Test `/benchmark` returns correct JSON structure and error on invalid params.
  - Test `/openapi.json` is valid JSON and contains expected paths.
  - Test `/docs` serves HTML containing Swagger UI.

- Create `tests/e2e/http.server.e2e.js`:
  - Spin up the server in-process, use supertest for REST tests and eventsource-parser for SSE tests to assert ordered events.

## Documentation

- Update `README.md` under HTTP Server Mode to document `--serve`, `--port`, endpoints with curl examples.
- Update `docs/USAGE.md` to include detailed HTTP Server section listing all endpoints, parameters, and sample commands.

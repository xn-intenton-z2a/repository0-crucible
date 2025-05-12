# Streaming Convergence Data

Enable real-time delivery of convergence data points as they are computed, using Server-Sent Events (SSE) over HTTP and JSON lines in CLI mode. This allows clients and scripts to process large datasets incrementally without waiting for the full JSON array.

# CLI Option

• --stream         Emit each convergence data point as a separate JSON line to stdout instead of buffering all points.

# HTTP Endpoint

GET /pi/stream    Returns a Server-Sent Events stream of JSON-formatted data points. Each event delivers a single data point with fields index, approximation (if applicable), and error.

# Implementation

1. Extend parsing schemas:
   • Add a boolean `stream` flag to CLIOptionsSchema and ApiParamsSchema with default false.

2. CLI streaming mode:
   • In `main()`, when opts.stream is true:
     - Compute dataPoints incrementally for the selected algorithm (leibniz, chudnovsky, or montecarlo) same as convergence-data logic.
     - For each computed point, call console.log(JSON.stringify(point)).
     - Exit after streaming all points.

3. HTTP SSE endpoint:
   • In `createApp()`, add `app.get("/pi/stream", ...)`:
     - Parse query parameters with ApiParamsSchema.
     - Set response headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive.
     - Loop through computation as in /pi/data or /pi/chart but without chart logic.
     - For each data point, write `data: ${JSON.stringify(point)}\n\n` to `res.write`.
     - After all points, call `res.end()`.

4. Reuse existing calculation loops and data generation for convergence-data.

# Testing

1. CLI tests:
   - In tests/unit/main.test.js, simulate `main(["--digits","3","--stream"])` and spy on console.log.
   - Expect multiple calls to console.log, each with valid JSON-parseable string containing index and error.

2. HTTP tests:
   - In tests/unit/server.test.js, use supertest to GET `/pi/stream?digits=2&algorithm=leibniz`.
   - Expect status 200 and header `content-type` matching `text/event-stream`.
   - Read response text, split on double newline, for each event parse the substring after `data:` as JSON and verify object shape.

# Documentation

1. Update docs/USAGE.md under a new **Streaming Convergence** section:
   - Describe CLI `--stream` mode with example.
   - Describe HTTP SSE endpoint with example `curl -N` usage.

2. Update README.md to include **Streaming Convergence** in Features list and show example commands.
# Overview

Enhance the OpenAPI documentation feature to include a new server-sent events streaming endpoint `/pi/stream`. Clients can subscribe to real-time approximation updates and error metrics as SSE events, improving integration and live visualizations without polling.

# Implementation

1. Dependencies
   • No new dependencies; reuse Express and existing calculation functions.

2. OpenAPI Specification
   • Add a new path `/pi/stream` with `get` operation.
   • Define `text/event-stream` as response content type.
   • Schema for each event: `{ index: number, approximation: number, error: number }`.
   • Include examples of SSE frames: `data: {...}\n\n`.

3. Middleware Setup in `createApp()`
   • Register `app.get('/pi/stream', handler)` before other routes.
   • In handler:
     - Set `res.setHeader('Content-Type','text/event-stream')` and `res.setHeader('Cache-Control','no-cache')`.
     - Parse query params via `ApiParamsSchema`.
     - For iteration-based algorithms (`leibniz`, `chudnovsky`): stream data points at calculated interval of iterations up to max points.
     - For sampling (`montecarlo`): process in batches and stream after each batch.
     - Compute approximation and error and send SSE event: `res.write(`data: ${JSON.stringify(event)}\n\n`)`.
     - Close connection with `res.write('event: end\n\n')` then `res.end()`.

4. Testing
   • Unit test in `tests/unit/server.test.js`:
     - Mock SSE response by inspecting `res.write` calls.
     - Send GET `/pi/stream?digits=2&algorithm=leibniz&samples=1000` and assert status 200, headers, and streamed JSON events.
   • Integration test with `supertest`: consume stream and accumulate chunks, parse SSE messages, and verify at least one event with `approximation` and `error` fields.

5. Documentation
   • docs/USAGE.md: under **REST Endpoints**, add **GET /pi/stream** with description, usage example, and sample SSE output.
   • README.md: under **Features** add **Server-Sent Events Streaming** describing real-time SSE support and how to subscribe (e.g., using `curl --no-buffer`).

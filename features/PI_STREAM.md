# Overview

Introduce a real-time streaming endpoint `/pi/stream` that emits incremental approximation updates and error metrics via Server-Sent Events (SSE). This feature enables clients to observe convergence behavior live without polling, improving responsiveness and supporting use cases like live dashboards and monitoring.

# Implementation

1. SSE Endpoint
   • Register GET `/pi/stream` in `createApp()` before JSON routes.
   • Set header `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.
   • Use `res.write()` to send event blocks:
     ```
     id: <index>\n
     data: <JSON.stringify({ index, approximation, error })>\n
     \n
     ```
   • At the end of calculation, send a final `event: end` block and close the connection.

2. Parameter Handling
   • Reuse `ApiParamsSchema` for query validation (`digits`, `algorithm`, `samples`, `level`, `maxIterations`, `errorTolerance`).
   • Respond with HTTP 400 and JSON errors if validation fails before setting SSE headers.

3. Streaming Logic
   • Mirror logic from `/pi/data` to compute data points but stream each point immediately.
   • For algorithms that iterate (Leibniz, Chudnovsky, Gauss–Legendre), stream at controlled intervals to avoid flooding (e.g., batch or step size).
   • For Monte Carlo, stream after each batch of samples (e.g., every 1000 samples).

# Testing

1. Unit Tests (`tests/unit/server.test.js`)
   • Mock a small iteration case (digits=2) and request `/pi/stream?digits=2&algorithm=leibniz`.
   • Use `supertest` to connect and collect SSE chunks.
   • Assert that the response is `200`, `Content-Type` matches `text/event-stream`, and that received event blocks contain valid JSON with `index`, `approximation`, and `error` fields.
   • Verify that an `event: end` block is sent and that the connection closes after streaming.
   • Test invalid query parameters yield 400 status with JSON error body.

# Documentation

1. `docs/USAGE.md`:
   • Under **REST Endpoints**, add **GET /pi/stream** with description and example:
     ```bash
     curl -N "http://localhost:3000/pi/stream?digits=3&algorithm=leibniz"
     ```
2. `README.md`:
   • Under **Features**, add **Real-Time Streaming** with a brief description and usage example for SSE:
     ```bash
     curl -N "http://localhost:3000/pi/stream?digits=3&algorithm=montecarlo"
     ```
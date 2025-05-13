# Overview

Introduce a Server-Sent Events (SSE) endpoint `/pi/stream` that streams convergence data points in real time as JSON lines. Clients receive each approximation and error as a discrete SSE event, enabling live updates in dashboards, CLI tools, or external consumers without waiting for the full dataset.

# Implementation

1. Endpoint Setup
   • In `createApp`, add a GET `/pi/stream` route.
   • Set response headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.

2. Query Parameter Parsing
   • Reuse `ApiParamsSchema` to parse `digits`, `algorithm`, `samples`, `level`, `maxIterations`, and `errorTolerance`.
   • On validation error, send HTTP 400 with JSON errors and close the stream.

3. Data Streaming Logic
   • Perform the same data point generation as `/pi/data` but for each point:
     - Format JSON: `{ index, approximation?, error }`.
     - Send SSE event: `data: ${JSON.stringify(point)}\n\n`.
   • After all points are sent, send `event: end\n\n` and call `res.end()`.

4. Backpressure and Connection Handling
   • Handle `res.write` return value; pause generation if needed until `drain` event.
   • Listen for `req.on('close')` to abort streaming on client disconnect.

# Testing

1. Unit Tests in `tests/unit/server.test.js`:
   - Use `supertest` to GET `/pi/stream?digits=2&algorithm=leibniz` and assert:
     • Response status 200 and header `content-type` matches `text/event-stream`.
     • Body begins with `data: {"index":1` and contains multiple `data:` lines.
     • Ends with `event: end` line.

2. Mocking and Performance:
   - Simulate a slow client by mocking `res.write` to test pause/resume logic.

# Documentation

1. docs/USAGE.md
   • Add **Streaming Convergence Data** under **REST Endpoints**:
     ```bash
     curl http://localhost:3000/pi/stream?digits=2&algorithm=leibniz
     # Streams lines: data: {"index":1,"approximation":3.1,"error":0.04159}
     # ...
     # event: end
     ```

2. README.md
   • Under **Features**, add **Convergence Streaming** with a brief description:
     - Real-time SSE feed at `/pi/stream` for live convergence updates.

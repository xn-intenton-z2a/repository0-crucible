# Overview

Implement real-time streaming of convergence data via Server-Sent Events (SSE) so clients can receive iterative approximation and error updates as they are computed.

# Implementation

1. SSE Endpoint
   • In createApp(), add a GET /pi/stream route.
   • Set response headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive.
   • Immediately flush headers to establish the SSE connection.

2. Real-time Data Streaming
   • Reuse the convergence logic from /pi/data for both Leibniz and Monte Carlo algorithms.
   • Compute data points in a loop; after each batch or iteration, send an SSE event: `data: <JSON>`, followed by a blank line.
   • Each JSON event includes index, approximation, and error fields.

3. Completion Event
   • After all points are sent, send a final SSE event `event: complete` with the final result.
   • Close the connection gracefully.

4. Error Handling
   • On validation or computation failure, send an SSE event `event: error` with an error message and then close the stream.

# Testing

1. Unit Tests
   • Mock request and response objects to simulate the SSE handshake and streaming.
   • Verify correct headers, sequence of `data:` events, and proper termination on completion or error.

2. HTTP Tests
   • Use supertest to connect to /pi/stream?digits=2&algorithm=leibniz.
   • Read streamed events, parse JSON, and assert correct index, approximation, error values.
   • Confirm end-of-stream sends the complete event with the final π estimate.

# Documentation

1. docs/USAGE.md
   • Add a **Streaming Convergence** section explaining the /pi/stream endpoint, query parameters, and SSE usage example.

2. README.md
   • Under **Features**, add **Streaming Convergence** with a brief description and example command to open an SSE connection.
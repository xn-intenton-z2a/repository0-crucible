# Overview

Add a streaming server sent events endpoint at /pi/stream to deliver convergence data incrementally in real time. Clients open a persistent connection and receive each data point as a JSON payload in a server sent event. This supports efficient processing of large or long running calculations without loading full data into memory.

# Implementation

1. Server Sent Events Route
   • In createApp add GET /pi/stream route before other handlers
   • Set response headers Content-Type to text/event-stream, Cache-Control no-cache, Connection keep-alive
   • Parse and validate query parameters with ApiParamsSchema
   • Use existing convergence logic to compute each data point for the chosen algorithm
   • For each data point write a line data: followed by serialized JSON of index, approximation, and error then two newline separators
   • After the final data point send an event named end with empty data and close the connection

2. Convergence Streaming
   • Reuse incremental generation from /pi/data without accumulating full array in memory
   • Respect maximum iterations or sample limits and apply step downsampling if needed

3. Error Handling
   • On validation failure respond with HTTP 400 and JSON errors then end stream
   • On runtime error write an event named error with a JSON payload describing the issue and then close connection

# Testing

1. Unit tests in tests/unit/server.test.js
   • GET /pi/stream?digits=2&algorithm=leibniz should return status 200 with header Content-Type text/event-stream
   • Read the first streaming chunk and confirm lines begin with data: and valid JSON
   • Confirm an end event is sent after the last data point
   • Invalid query parameters (digits negative) should return HTTP 400 with JSON errors and no stream

# Documentation

1. docs/USAGE.md
   • Under REST Endpoints add GET /pi/stream description
   • Provide an example using curl that demonstrates opening the stream and receiving events

2. README.md
   • Under Features add SSE Streaming with a brief description and instructions to access /pi/stream
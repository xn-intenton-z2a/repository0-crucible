# Overview
This feature adds a WebSocket endpoint for streaming π digits in real time alongside the existing HTTP API. Clients can connect to the WebSocket server to receive digit blocks or progress events as JSON messages, providing an event-driven interface for live computation feedback and alternative consumption patterns.

# CLI Interface
--serve
    Enables both HTTP and WebSocket servers when provided. No additional flag is required to activate WebSocket support.
--ws-path <path>
    Set the WebSocket route (default: "/ws").
--ws-port <number>
    Optional port for the WebSocket server; defaults to the HTTP server port when omitted.

# HTTP API
WebSocket Endpoint
    Connect to ws://<host>:<port><ws-path>?digits=<number>&algorithm=<chudnovsky|ramanujan>
    Query parameters:
      digits: number (required) – number of π digits to compute
      algorithm: chudnovsky|ramanujan (optional, default: chudnovsky)
    Messages sent as JSON strings with fields:
      type: "data" | "end" | "error"
      payload: for "data", a string of digit characters; for "error", an error description; "end" has no payload.

# Implementation
- Add dependency on "ws" in package.json and import WebSocketServer from "ws" in src/lib/main.js.
- Within the --serve logic, instantiate a WebSocketServer bound to the HTTP server or its own port based on --ws-port.
- On client connection:
    1. Parse and validate query parameters (digits and algorithm).
    2. Begin the chosen π computation as an async generator or emitter of digit blocks.
    3. On each block, send JSON.stringify({ type: "data", payload: block }) over the socket.
    4. Handle computation errors by sending { type: "error", payload: message } and closing the connection.
    5. Upon completion, send { type: "end" } and close the socket gracefully.

# Testing
- Add tests in tests/unit/main.test.js:
    • Start the server on a dynamic port with --serve.
    • Use a WebSocket client (from "ws" in test code) to connect to ws://localhost:<port>/ws?digits=10&algorithm=chudnovsky.
    • Collect and assert the sequence of JSON messages: multiple "data" messages whose concatenated payload equals the first 10 digits of π, followed by an "end" message.
    • Test invalid parameters (e.g., missing digits or unsupported algorithm) result in an immediate "error" message and connection closure.

# Documentation
- Update README.md under Features to document:
    • The new WebSocket endpoint including ws-path and ws-port flags.
    • Example server startup: node src/lib/main.js --serve --ws-path /digits --ws-port 8080.
    • Example client usage using native WebSocket or ws package.
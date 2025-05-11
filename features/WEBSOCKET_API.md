# Overview

Introduce a WebSocket-based streaming API mode in addition to the existing HTTP endpoints. Clients can establish a WebSocket connection to request π digit generation and receive streamed chunks or the full result over a WebSocket, enabling real-time integration in browsers or services without HTTP polling.

# CLI Interface

Extend main(args) to accept the following flags alongside --serve:

--ws-port <port>         Port to serve WebSocket connections (defaults to same as HTTP server when serve is enabled)
--ws-path <path>         WebSocket URL path (default: /ws/pi)

Behavior:
• When --serve is enabled and --ws-port or --ws-path are provided (or defaults apply), the server will mount a WebSocket server on the given port and path.
• Clients open a WebSocket connection and send a JSON message { "digits": <n>, "chunkSize": <m> }, then receive streamed text messages of π digits in chunks of up to chunkSize. On completion, the connection closes.

# Implementation Details

• Add "ws" dependency in package.json.
• In src/lib/main.js, after starting the Express server when serve mode is active:
  – Import { WebSocketServer } from "ws".
  – Instantiate a WebSocketServer listening on the same HTTP server, filtering upgrade requests by opts.wsPath.
  – On each connection, attach 'message' listener. Parse incoming text as JSON. Validate with zod: digits (integer 1–1000), chunkSize (optional positive integer).
  – Call the existing getPiStream generator (or implement a simple async generator over calculatePi and slicing) to produce chunks.
  – For each chunk, call ws.send(chunk).
  – After streaming all digits, call ws.close().
  – On invalid request or error, send JSON error message and close with code 1008.
  – Handle client disconnects by aborting the generator loop.

# Testing

Add tests in tests/unit/main.test.js and a new tests/unit/ws.test.js:
• Unit: Mock getPiStream to yield known chunks. Create a WebSocketServer instance via main(["--serve","0","--ws-port","0"]). Use the ws client to connect to the wsPath. Send a valid JSON request, assert the sequence of 'message' events with expected chunks and final close event.
• Invalid request: send non-JSON or missing digits, expect server to send error JSON and close.
• CLI flag parsing: invoking main with invalid --ws-path or --ws-port values triggers console.error and exit code 1 before server startup.

# Documentation

• Update README.md under HTTP Server section to document the WebSocket API:
  – Describe --ws-port and --ws-path flags.
  – Provide example:
      node src/lib/main.js --serve 3000 --ws-path /ws/pi
      // In JS client:
      const ws = new WebSocket('ws://localhost:3000/ws/pi');
      ws.onopen = () => ws.send(JSON.stringify({ digits: 100, chunkSize: 50 }));
      ws.onmessage = event => console.log('chunk', event.data);
  – Note error handling and closure behavior.
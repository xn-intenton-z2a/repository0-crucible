# Overview

Add API key authentication to the HTTP server, SSE, and WebSocket endpoints so that only authorized clients can access π calculation and analysis services.

# CLI and Configuration Interface

Allow users to configure an API key via environment variable or configuration file:

• API key environment variable: PI_API_KEY
• Configuration file key: apiKey

Provide a new CLI flag:

--api-key-header <name>    HTTP header name to check for API key (default: X-API-Key)

When --serve is enabled and an API key is configured, all incoming requests to REST endpoints, SSE path, and WebSocket upgrades must present the correct API key in the specified header, otherwise the server responds with status 401 and JSON { error: "Unauthorized" } or closes the connection.

# Implementation Details

In src/lib/main.js during server setup:
• After loading configuration, read opts.apiKey from merged config or process.env.PI_API_KEY.
• Read opts.apiKeyHeader from CLI flag or default to 'X-API-Key'.
• If opts.apiKey is defined:
  – Add Express middleware before all routes:
      if request.headers[lowercase opts.apiKeyHeader] !== opts.apiKey then respond 401 { error: "Unauthorized" } and return.
• For SSE endpoint:
  – Before initiating getPiStream, check header and if invalid respond 401 and end response.
• For WebSocket upgrades:
  – In the upgrade handler, inspect request.headers[lowercase opts.apiKeyHeader]; if missing or incorrect, send HTTP 401 and destroy socket.

# Testing

Add unit tests in tests/unit/main.test.js and tests/unit/ws.test.js:
• Start server with main(["--serve","0","--api-key-header","X-My-Key"]) and set PI_API_KEY or config.apiKey to 'secret'.
• Test without header: GET /pi?digits=5 returns 401 and JSON { error: "Unauthorized" }.
• Test with wrong header value: 401 response as above.
• Test with correct header: GET /pi?digits=5 returns 200 and valid pi data.
• For SSE: GET /pi/sse?digits=5 with missing header returns 401 and JSON error, with correct header streams data.
• For WebSocket: connect without header or wrong key, connection is closed; with correct header, handshake succeeds and streaming works.

# Documentation

Update README.md under HTTP API section:
• Describe API key authentication and show examples:
    export PI_API_KEY=secret
    node src/lib/main.js --serve 3000 --api-key-header X-My-Key
    curl -H "X-My-Key: secret" http://localhost:3000/pi?digits=10

Note that if no API key is configured, the server remains open as before.
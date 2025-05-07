# Purpose
Add HTTP server mode to serve ASCII faces over HTTP, enabling seamless integration with other tools and services.

# Implementation Details
1. Parse HTTP flags
   • Add boolean option serve (alias s) and numeric option port (alias p) to minimist configuration with default port 3000.
2. Start server
   • In main(), if serve mode is active, create an HTTP server listening on the specified port using Node's http module.
3. Request handling
   • Handle GET requests at /face
   • Parse query parameter count, default to 1, validate as positive integer. Invalid counts return 400 error with usage message.
   • For count = 1, respond with text/plain face; for count > 1, respond with application/json containing an array of faces.
4. Logging
   • Log a startup message indicating the listening port.

# CLI Interface Examples
- Start the server on default port:
  node src/lib/main.js --serve
- Start the server on port 4000:
  node src/lib/main.js --serve --port 4000
- Fetch a single face:
  curl http://localhost:3000/face
- Fetch multiple faces:
  curl http://localhost:3000/face?count=5

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock HTTP server and send GET requests to /face and /face?count=3, assert appropriate responses and status codes.
2. E2E tests in tests/e2e/cli.test.js
   • Simulate starting the server via CLI and performing HTTP requests.

# Documentation
- Update README.md to describe --serve and --port flags and HTTP endpoints.
- Update docs/USAGE.md with examples for HTTP API usage.
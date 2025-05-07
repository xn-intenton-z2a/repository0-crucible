# Purpose
Add HTTP server mode to serve ASCII faces over HTTP with a JSON API endpoint, enabling seamless integration with other tools and services.

# Implementation Details
1. Parse HTTP flags
   • Add boolean option serve (alias s) and numeric option port (alias p) to minimist configuration with default port 3000.
2. Start server
   • In main(), if serve mode is active, create an HTTP server listening on the specified port using Node's http module.
3. Request handling
   • Handle GET requests at /face
   • Parse query parameter count, default to 1, validate as positive integer. On invalid count, respond with status 400 and JSON error payload { error: "Invalid count" }.
   • Check Accept header: if it includes text/plain, respond with text/plain; otherwise respond with application/json.
   • If count = 1, respond with JSON object { face: "<face>" } or plain text face.
   • If count > 1, respond with JSON array of faces or plain text with one face per line.
4. Error handling
   • Return JSON error responses with { error: "<message>" } and appropriate HTTP status codes.
5. Logging
   • Log startup message indicating the listening port.
   • Log each request method, path, query, and response status code.

# CLI Interface Examples
- Start the server on default port:
  node src/lib/main.js --serve
- Start the server on port 4000:
  node src/lib/main.js --serve --port 4000
- Fetch a single face (JSON):
  curl -H "Accept: application/json" http://localhost:3000/face
- Fetch multiple faces:
  curl http://localhost:3000/face?count=5

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock HTTP server and send GET requests to /face and /face?count=3, assert JSON object for count=1, JSON array for count>1, and error JSON for invalid count.
2. E2E tests in tests/e2e/cli.test.js
   • Simulate starting the server via CLI and performing HTTP requests, verifying Content-Type and body formats.

# Documentation
- Update README.md to describe --serve and --port flags and HTTP endpoints, including JSON API usage.
- Update docs/USAGE.md with examples for HTTP API usage.
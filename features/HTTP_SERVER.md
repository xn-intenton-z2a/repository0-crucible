# Purpose
Serve ASCII faces over HTTP to support programmatic integration with two endpoints for random generation and listing.

# Implementation Details
1. Parse HTTP flags
   • Add boolean option serve (alias s) and numeric option port (alias p) to minimist config with default port 3000
   • Validate that port is a positive integer and print help on invalid values
2. Create HTTP server
   • Import http in src/lib/main.js
   • When serve mode is active, start server listening on the specified port and log a startup message indicating the port
3. Request handling
   • GET /face
     – Parse optional count and seed query parameters
     – Validate inputs and generate the requested number of faces using existing getRandomFace logic
     – Respond with JSON output using content type application/json
   • GET /faces
     – Parse optional includeCustom query parameter defaulting to true
     – Determine the face list by combining built in faces with custom faces if includeCustom is true
     – Detect Accept header to choose text/plain or application/json response format
     – Respond with full list of faces in the chosen format
4. Error responses
   • For invalid count seed or includeCustom values respond with HTTP 400 and a JSON error object containing an error property with descriptive message
5. Logging
   • On startup log listening port
   • For each request log method path query parameters and response status

# Testing
1. Unit tests in tests/unit/main.test.js
   • Export or expose request handler to allow issuing HTTP requests directly
   • Test GET /faces with includeCustom true and false and assert response body and headers
   • Test Accept header variations for text/plain and JSON formats
   • Test error cases for invalid includeCustom values
2. End to end tests in tests/e2e/cli.test.js
   • Start the server with --serve and --port options
   • Issue HTTP requests via curl or http client to /faces and /face endpoints and assert responses match expected format and status

# Documentation
• Update README.md under Features to document --serve flag and HTTP endpoints
• Extend docs/USAGE.md with a new HTTP API section including examples for GET /face and GET /faces endpoints
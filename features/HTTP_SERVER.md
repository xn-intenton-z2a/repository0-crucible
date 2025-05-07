# Purpose
Add HTTP server mode to serve ASCII faces over HTTP with a JSON API endpoint, enabling seamless integration with other tools and services, and provide a dedicated endpoint to list all available faces.

# Implementation Details
1. Parse HTTP flags
   • Boolean option serve (alias s) and numeric option port (alias p) already in minimist configuration with default port 3000.

2. Start server
   • In main(), if serve mode is active, create an HTTP server listening on the specified port using Node's http module.

3. Request handling
   • GET /face
     – Existing behavior: parse query parameter count (default 1) and optional seed, validate, respond with a single face or array of faces in JSON or plain text according to Accept header.

   • GET /faces
     – Parse optional query parameter includeCustom (default true). Acceptable values: "true" or "false" (case-insensitive). On invalid value, respond with status 400 and JSON error { error: "Invalid includeCustom flag" }.
     – Determine face list: built-in asciiFaces plus loaded custom faces if includeCustom is true, otherwise only built-in asciiFaces.
     – Check Accept header: if it includes text/plain, respond with text/plain; otherwise respond with application/json.
     – Respond with JSON array of strings or plain text with one face per line.

4. Error handling
   • Return JSON error responses with { error: "<message>" } and appropriate HTTP status codes for invalid count, seed, or includeCustom values.

5. Logging
   • Log startup message indicating the listening port.
   • Log each request method, path, query parameters, and response status code for both /face and /faces endpoints.

# HTTP Interface Examples
- List all faces (JSON):
  curl http://localhost:3000/faces

- List only built-in faces (plain text):
  curl -H "Accept: text/plain" http://localhost:3000/faces?includeCustom=false

# Testing
1. Unit tests in tests/unit/main.test.js
   • Send GET /faces and assert JSON array matches asciiFaces by default.
   • Send GET /faces?includeCustom=false and assert array matches only built-in faces.
   • Invalid includeCustom values return status 400 and JSON error.

2. E2E tests in tests/e2e/cli.test.js
   • Start server via CLI and issue HTTP requests to /faces and /face endpoints; verify Content-Type headers, body formats, and status codes.

# Documentation
- Update README.md to document the /faces endpoint and includeCustom query parameter with examples.
- Extend docs/USAGE.md with a new "List Faces" section showing JSON and plain text usage.
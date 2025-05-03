# HTTP_API Feature

# Overview
Provide an HTTP server mode for the emoticon CLI that exposes endpoints for random emoticon selection, deterministic seeding, and full list retrieval over HTTP. This feature enables integration of the emoticon service into web-based workflows, dashboards, and monitoring systems.

# Endpoints
GET /                 Returns a single random emoticon as plain text with status 200
GET /list             Returns all available emoticons, one per line, plain text, status 200
GET /json             Returns a JSON object { face, mode, seed } for a random selection, status 200
GET /json?seed=<n>    Returns a JSON object { face, mode: "seeded", seed: <n> } selected deterministically, status 200
GET /json/list        Returns a JSON array of all emoticon strings, status 200
Any other path       Returns status 404 with plain text or JSON error depending on Accept header

# CLI Options
--serve               Start the HTTP server instead of printing to console
--port <n>            Set the listening port (default 3000)

# Implementation Details
In src/lib/main.js detect --serve early in main(args). Parse --port if provided or use 3000. Use the built-in http module to create a server. For each incoming request, examine request.url and URLSearchParams to route to the corresponding endpoint. Use the existing EMOTICONS array and mulberry32 for seeded random behavior. Set response headers to text/plain or application/json as appropriate. On invalid seed inputs, return status 400 and an error message in the response body. Log a startup message: listening on port <n>.

# Tests
Add unit tests in tests/unit/main.test.js to cover HTTP server creation and request handling. Mock http.createServer and verify listener is bound to the correct port. Use a simple HTTP client library or built-in http.request in tests to issue GET requests against the server and assert status codes and response bodies for all endpoints, including error cases.

# Documentation
Update README.md to describe the serve mode and endpoints. Provide example usage:
To start server on port 4000
  node src/lib/main.js --serve --port 4000
Fetch a seeded emoticon JSON
  curl "http://localhost:4000/json?seed=5"
Fetch full list as plain text
  curl http://localhost:4000/list
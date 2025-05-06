# Summary
Add HTTP server mode with configurable port via --serve and --port flags to serve ASCII faces over HTTP.

# Specification
- Introduce --serve flag to start an HTTP server mode.
- Introduce --port <number> flag to select listening port. Resolve port in order: --port flag, PORT environment variable, default 8080.
- Server must handle concurrent connections and respond to HTTP requests.
- Support GET /face endpoint with query parameters:
  • count: positive integer number of faces to return
  • seed: nonnegative integer for reproducible results
  • category: filter faces by category
  • facesFile: path to JSON or YAML file for custom faces
  • mergeFaces: boolean flag to append custom faces
- On valid requests respond with JSON object { faces: [string, ...] } and Content-Type application/json.
- On unsupported routes respond with status 404 and JSON { error: "Not Found" }.
- On invalid query parameters respond with status 400 and JSON { error: "<description>" }.
- Log server start with chosen port and log each incoming request method and URL.
- Gracefully shut down server on SIGINT and SIGTERM.

# CLI Usage
node src/lib/main.js --serve
node src/lib/main.js --serve --port 3000
PORT=4000 node src/lib/main.js --serve

# Testing
- Write tests that launch the server with --serve and --port and verify console log includes listening port.
- Perform HTTP requests to /face?count=2&seed=42 and assert status 200, Content-Type application/json, and two faces in response.
- Test category filtering via /face?category=happy and validate returned faces.
- Test facesFile and mergeFaces query parameters to verify custom face loading over HTTP.
- Verify invalid routes return 404 JSON and invalid parameters return 400 JSON with descriptive error.
- Simulate SIGINT or SIGTERM in tests and confirm server shuts down without hanging.

# Documentation
- Update README.md under Features to document --serve and --port flags with examples for HTTP API.
- Create or update docs/HTTP_API.md describing endpoint, query parameters, response format, error handling, and graceful shutdown.

# Implementation Details
- In src/lib/main.js, extend argument parsing to detect --serve and --port before face generation logic.
- Determine port from parsed flag, then process.env.PORT, then default 8080.
- Import http module and on --serve instantiate http.createServer. Use URL module to parse path and query string.
- For GET /face calls, reuse existing face generation internal functions instead of console.log, collect results into array.
- Send JSON response with two-space indentation. Set appropriate status and headers.
- Handle errors in parameter parsing by responding with 400 and error JSON.
- On any other path respond with 404 and JSON error message.
- Attach listeners for SIGINT and SIGTERM to call server.close and exit process.

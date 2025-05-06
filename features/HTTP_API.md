# Summary

Implement HTTP API server mode that allows clients to request ASCII face output over HTTP. When invoked with --serve, the CLI starts an HTTP server on a configurable port and handles requests concurrently.

# Specification

The CLI accepts a --serve flag optionally followed by a port number or using a --port flag. When --serve is present:
1. Determine port from --port <number> or environment variable PORT or default to 8080.
2. Start an HTTP server listening on the chosen port.
3. Handle GET requests to the /face endpoint with optional query parameters count, seed, category, custom, and mergeCustom matching existing CLI flags. Validate parameters using the existing face generation logic.
4. On a valid request, return a JSON response containing an array of face strings and set Content-Type to application/json.
5. For invalid paths or query parameters, return 404 or 400 status codes with an error message in JSON format.
6. Log server start and each request handling to the console.
7. Gracefully shut down the server on SIGINT and SIGTERM signals.

# Testing

Update tests in tests/unit/main.test.js to:
- Verify that invoking main with ["--serve"] and a custom port starts the server and logs the listening port.
- Perform HTTP requests to /face and assert response status, headers, and body contain valid faces.
- Test query parameters count, seed, and category work correctly over HTTP.
- Test invalid routes and parameters return the correct status code and error body.

# Documentation

Update README.md under Features to describe HTTP API mode, include usage examples for starting the server, and show how to request faces via curl or other HTTP clients.
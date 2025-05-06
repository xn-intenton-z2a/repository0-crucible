# Summary

Add a lightweight HTTP JSON API to serve face generation, face listing, category listing, and diagnostics through a REST interface, enabling integration with web services and automated clients.

# Specification

- Introduce a new flag --serve [port] to start an HTTP server on the specified port or default 3000 if none is provided.
- Expose these endpoints:
  - GET /face
    • Query parameters: count (integer), seed (integer), category (string), facesFile (string), mergeFaces (boolean)
    • Response: JSON object { faces: [string,...] }
  - GET /list-faces
    • Query parameters: category, facesFile, mergeFaces
    • Response: JSON object { faces: [string,...] }
  - GET /list-categories
    • Query parameters: facesFile, mergeFaces
    • Response: JSON object { categories: [string,...] }
  - GET /diagnostics
    • Query parameters: facesFile, mergeFaces, seed
    • Response: same diagnostics JSON format as the --diagnostics CLI mode
- On invalid query parameters or processing errors, return a JSON error: { error: message } with HTTP status 400.
- Set Content-Type: application/json and include Access-Control-Allow-Origin: * for CORS support.

# Testing

- Add tests in tests/unit/http_api.test.js that start the server on an ephemeral port.
- Use Node’s http or global fetch to send GET requests to each endpoint with valid and invalid parameters.
- Verify successful responses include correct JSON structures and status 200.
- Verify error responses on invalid parameters or missing resources return JSON error bodies and status 400.
- Test that server shuts down cleanly after tests.

# Documentation

- Update README.md under Features to document the --serve flag and list HTTP endpoints with curl examples.
- Create docs/HTTP_API.md describing each endpoint, accepted query parameters, response formats, HTTP status codes, and CORS behavior.

# Implementation Details

- In src/lib/main.js detect --serve in process.argv before other flags and extract an optional port number.
- Use Node’s built-in http module to create an HTTP server.
- For each incoming request, parse the URL and query parameters using the URL and URLSearchParams classes.
- Dispatch to generateFaces, listFaces, listCategories, or diagnostic routines as appropriate and serialize results with JSON.stringify.
- Handle errors by catching exceptions and responding with status 400 and a JSON error message.
- Listen on the specified port and log a startup message indicating the server URL.
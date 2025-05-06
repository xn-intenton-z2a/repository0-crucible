# Summary
Provide a RESTful HTTP JSON API to allow external clients to generate and list ASCII faces and categories, and retrieve diagnostics information. This enables web integrations and programmatic access without invoking the CLI.

# Specification

- New serve mode flag: `--serve` or `--http-port <port>` to start an HTTP server. Default port 3000, configurable.
- Endpoints:
  - GET /face
    - Query parameters: count (integer), seed (integer), category (string), facesFile (string), mergeFaces (boolean)
    - Response: JSON object `{ faces: string[] }` with generated face strings.
  - GET /list-faces
    - Query parameters: category (string), facesFile (string), mergeFaces (boolean)
    - Response: JSON object `{ faces: string[] }` listing face strings.
  - GET /list-categories
    - Query parameters: facesFile (string), mergeFaces (boolean)
    - Response: JSON object `{ categories: string[] }` listing valid categories.
  - GET /diagnostics
    - Query parameters: facesFile (string), mergeFaces (boolean), seed (integer)
    - Response: JSON diagnostics object matching CLI diagnostics mode fields.
  - GET /openapi.json
    - Response: the OpenAPI 3.0.3 specification in JSON describing all above endpoints.

- All responses include header `Access-Control-Allow-Origin: *` for CORS.
- Error responses use HTTP status 400 or 500 as appropriate and return JSON `{ error: string }`.
- Validation of query parameters must mirror CLI validation rules and return descriptive errors.

# Testing

- Add unit tests in tests/unit/http_api.test.js:
  - Start the server on an ephemeral port and request each endpoint with valid parameters, verifying status codes and JSON schema.
  - Validate error responses for invalid parameters (e.g., noninteger count, unknown category).
  - Test GET /openapi.json returns a valid OpenAPI object with correct paths, parameters, and response schemas.
  - Test CORS header is present on all endpoints.

# Documentation

- Update README.md under Features to describe serve mode, endpoints, and example curl commands:
  - `curl http://localhost:3000/face?count=3&seed=42`
  - `curl http://localhost:3000/list-categories`
  - `curl http://localhost:3000/openapi.json`
- Add or update docs/HTTP_API.md with sections:
  - HTTP Serve Mode
  - Endpoint reference table
  - OpenAPI spec usage
  - Error response format

# Implementation Details

- In src/lib/main.js detect `--serve` or `--http-port` flag before interactive and face flags.
- Use Node's built-in `http` and `url` modules to create a server:
  - Parse request URL and query string
  - Route based on `req.url` pathname
  - Call existing library functions `generateFaces`, `listFaces`, `listCategories` and diagnostics builder
  - Serialize responses with `res.writeHead` including `Content-Type: application/json` and CORS header, then `res.end(JSON.stringify(body))`
- Construct an in-memory OpenAPI 3.0.3 spec object reflecting the implementation and serve it at `/openapi.json`.
- No external HTTP framework dependencies required; use core modules.
- Add error handling in each route to catch exceptions and respond with JSON error and appropriate status.

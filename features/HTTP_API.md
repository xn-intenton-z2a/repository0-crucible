# Summary

Provide a unified HTTP server mode that exposes a JSON API for face generation, listing faces, listing categories, and diagnostics, and also serves a simple web UI at the root path for interactive face generation and exploration.

# Specification

## HTTP Endpoints

- GET /
  - Returns a self-contained HTML page with form controls and buttons to generate faces, list faces, list categories, and view diagnostics.
  - The page uses fetch calls to the JSON API endpoints and displays results inline.

- GET /openapi.json
  - Returns an OpenAPI 3.0.3 specification in JSON describing all endpoints.

- GET /face
  - Query parameters: count (integer ≥1), seed (integer), category (string), facesFile (string), mergeFaces (boolean)
  - Response 200: { faces: string[] }
  - Response 400: { error: string }

- GET /list-faces
  - Query parameters: category, facesFile, mergeFaces
  - Response 200: { faces: string[] }
  - Response 400: { error: string }

- GET /list-categories
  - Query parameters: facesFile, mergeFaces
  - Response 200: { categories: string[] }
  - Response 400: { error: string }

- GET /diagnostics
  - Query parameters: facesFile, mergeFaces, seed
  - Response 200: diagnostics JSON object matching CLI diagnostics
  - Response 400: diagnostics object including error field

All JSON responses include headers:
  - Content-Type: application/json
  - Access-Control-Allow-Origin: *

## Error Handling

- Invalid routes return 404 with { error: 'Not Found' }.
- Parameter validation mirrors CLI validation rules.

# Testing

- Unit tests should start the server on an ephemeral port and verify:
  - GET / returns status 200 and HTML including <!DOCTYPE html> and references fetch endpoints: /face, /list-faces, /list-categories, /diagnostics.
  - GET /openapi.json returns a valid OpenAPI object with correct paths and schemas.
  - GET /face, /list-faces, /list-categories, /diagnostics with valid parameters return correct JSON and status codes.
  - Invalid parameters on /face and others return 400 with descriptive error messages.
  - CORS header is present on all JSON responses.

# Implementation Details

- In src/lib/main.js serveMode function:
  1. Detect pathname "/" and serve an HTML template string with inline CSS/JS for the web UI.
  2. Serve /openapi.json by returning a constructed OpenAPI 3.0.3 spec object.
  3. For other routes (/face, /list-faces, /list-categories, /diagnostics), parse query parameters, invoke existing library functions (generateFaces, listFaces, listCategories), or build diagnostics object as in CLI.
  4. Set response headers and JSON.stringify the body.
  5. On errors, catch exceptions and respond with appropriate HTTP status and JSON error or diagnostics including error field.

- No external HTTP frameworks; use Node core http and url modules.
- Include CORS header in all responses.
# Overview

Extend the CLI with an HTTP server mode that allows clients to request π calculations via RESTful endpoints and receive results as text or PNG images. Add interactive Swagger UI documentation and an OpenAPI specification for the HTTP endpoints.

# HTTP Server Mode

- Introduce a --serve flag to start an HTTP server instead of computing π to stdout.
- Add a --port flag to configure the listening port (default: 3000).

# Endpoints

## GET /pi

Query parameters:
  digits (required): integer between 1 and 10000
  method (optional): chudnovsky, gauss-legendre, machin, nilakantha; default: chudnovsky
  format (optional): text or png; default: text

Responses:
  200 text/plain for format=text with body containing the π digits string
  200 image/png for format=png with body containing a PNG rendering of the π digits in a single-row image
  400 application/json for invalid or missing parameters with payload { error: string }

# Swagger UI Documentation

- Serve the OpenAPI specification at GET /openapi.json in JSON format following OpenAPI 3.0.
- Serve Swagger UI at GET /docs by leveraging the swagger-ui-dist package to host static assets.
- The Swagger UI page should load the /openapi.json spec and allow interactive exploration and testing of the /pi endpoint.

# Implementation Details

1. In src/lib/main.js, after parsing CLI flags and before starting the HTTP server, import swagger-ui-dist.
2. Create a route for /openapi.json that returns a valid OpenAPI 3.0 spec with details of the /pi endpoint parameters, responses, and descriptions.
3. Create a route for /docs to serve the Swagger UI HTML and static assets from swagger-ui-dist.
4. Update package.json to add swagger-ui-dist as a dependency.
5. Ensure MIME types are set correctly (application/json for /openapi.json and text/html, text/css, application/javascript for UI assets).

# Testing

- Unit tests in tests/unit/http.docs.test.js:
  * Mock HTTP server to request /openapi.json and assert JSON schema keys: openapi, info, paths./pi.
  * Simulate GET /docs and assert HTML response contains the Swagger UI initialization script.
- End-to-end tests in tests/e2e/http.docs.test.js:
  * Launch server on a random free port.
  * Perform HTTP GET to /openapi.json and parse JSON. Validate it describes /pi endpoint.
  * Fetch GET /docs and verify status 200, content-type text/html, and presence of swagger-ui-dist references.

# Documentation

- Update README.md under Features to include “HTTP server Swagger UI documentation” with example:
    node src/lib/main.js --serve --port 3000 and navigate to http://localhost:3000/docs
- Update docs/USAGE.md to add a section “Swagger UI Documentation” explaining how to access /docs and /openapi.json with examples.
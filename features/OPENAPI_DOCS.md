# Overview

Provide OpenAPI v3 specification and interactive Swagger UI for all HTTP API endpoints including /pi, /pi/data, /pi/chart, /health, and /dashboard. This enables clients to explore and integrate the service programmatically, improving developer experience and discoverability.

# Implementation

1. Dependencies
   • Add swagger-ui-express and yamljs (or swagger-jsdoc) to dependencies in package.json.

2. OpenAPI Specification
   • Define an OpenAPI v3 document (openapi.json or yaml) describing paths, parameters, request schemas, response schemas, and error responses for each endpoint.
   • Include metadata: title, version, description, servers.

3. Express Integration
   • In createApp(), import swaggerUi from swagger-ui-express and YAML from yamljs (or swaggerJsdoc).
   • Load or generate the OpenAPI document at startup.
   • Mount JSON spec at GET /openapi.json.
   • Mount Swagger UI at GET /docs using swaggerUi.serve and swaggerUi.setup with the OpenAPI document.

4. Security and Performance
   • Serve the UI and JSON statically without heavy runtime computation.
   • Do not introduce new environment variables or flags; UI is always available in serve mode.

# Testing

1. HTTP Tests (tests/unit/server.test.js)
   • GET /openapi.json should return status 200, Content-Type application/json, and a JSON object with openapi key and paths for all endpoints.
   • GET /docs should return status 200, Content-Type text/html, and include Swagger UI assets (e.g., swagger-ui-bundle.js) and a reference to /openapi.json.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, document **GET /openapi.json** and **GET /docs** with usage examples and expected responses.

2. README.md
   • Under **Features**, add **OpenAPI Documentation** with a brief description and examples on how to access the API spec and UI:
     - curl http://localhost:3000/openapi.json
     - open in browser: http://localhost:3000/docs
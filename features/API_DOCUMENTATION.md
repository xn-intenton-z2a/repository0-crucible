# Overview

Introduce automated API documentation for the HTTP endpoints by serving an OpenAPI specification and embedding an interactive Swagger UI. Clients and developers can discover available endpoints, parameters, and response schemas without referring to external documentation.

# Implementation

1. Dependency
   • Add "swagger-ui-express" to package.json dependencies.

2. OpenAPI Specification
   • In src/lib/main.js, define a JavaScript object `apiSpec` conforming to OpenAPI 3.0. Include `info` (title, version, description), `servers` (base URL), `paths` for `/pi`, `/pi/data`, `/pi/chart`, `/dashboard`, and existing endpoints, with parameter and response schemas.

3. Routes Setup
   • Import swaggerUi from "swagger-ui-express".
   • Add route GET `/openapi.json` that returns the `apiSpec` object as JSON.
   • Mount Swagger UI middleware: `app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec))`.

4. Maintain backwards compatibility
   • Ensure existing endpoints remain unchanged and only documentation middleware is added after route definitions.

# Testing

1. Unit tests in tests/unit/server.test.js
   - Test GET `/openapi.json` returns status 200 and a JSON object with `paths` containing `/pi` and `/pi/data`.
   - Test GET `/docs` returns HTML containing the string "SwaggerUIBundle" and serves static assets correctly.

# Documentation

1. docs/USAGE.md
   • Add **API Documentation** section under **REST Endpoints** describing `/openapi.json` and `/docs` paths and how to access Swagger UI.

2. README.md
   • Under **Features**, add **API Documentation**: brief description and example URLs:
     http://localhost:3000/openapi.json
     http://localhost:3000/docs
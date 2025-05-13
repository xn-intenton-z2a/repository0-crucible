# Overview

Enhance the existing OpenAPI documentation to serve a machine-readable spec and an interactive Swagger UI, and retain the server-sent events streaming endpoint for real-time π approximation updates.

# Implementation

1. Dependencies
   • Add `swagger-ui-express` to dependencies.
   • No additional dependencies needed for SSE streaming.

2. OpenAPI Specification Endpoint
   • In `createApp()`, define an `openapiSpec` object that describes all API paths (`/pi`, `/pi/data`, `/pi/chart`, `/benchmark`, `/pi/stream`) including query parameters, response schemas, content types, and SSE event schema for `/pi/stream`.
   • Add a GET `/openapi.json` route that returns `res.json(openapiSpec)`.

3. Swagger UI Setup
   • In `createApp()`, import `swaggerUi` from `swagger-ui-express`.
   • Add middleware: `app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec))` to serve the interactive UI.

4. Server-Sent Events Streaming
   • Preserve the `/pi/stream` handler from the existing spec: set SSE headers, parse query params, stream approximation updates for iterative and sampling algorithms, then send `event: end` and close.

# Testing

1. Unit Tests (`tests/unit/server.test.js`)
   • GET `/openapi.json` should return status 200 and JSON matching `openapiSpec` with correct `paths` entries.
   • GET `/docs` should return HTML containing Swagger UI assets (e.g., `<html>`, `<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist`).
   • Mock `res.write` and test GET `/pi/stream` emits SSE frames with `data: {...}` including `index`, `approximation`, `error` and ends with `event: end`.

# Documentation

1. docs/USAGE.md:
   • Under **REST Endpoints**, add:
     - **GET /openapi.json**: returns the OpenAPI specification as JSON.
     - **GET /docs**: serves the interactive Swagger UI.
   • Include example calls:
     ```bash
     curl http://localhost:3000/openapi.json
     curl http://localhost:3000/docs
     ```

2. README.md:
   • Under **Features**, update **Server-Sent Events Streaming** to note the spec is served under `/openapi.json` and interactive docs at `/docs`.
   • Add **OpenAPI UI** feature with description of interactive API documentation.
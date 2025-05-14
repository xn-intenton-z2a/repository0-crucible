# Overview

Enhance the existing OpenAPI documentation feature to serve a machine-readable specification, provide an interactive Swagger UI, and implement a server-sent events streaming endpoint for iterative π approximation updates.

# Implementation

1. Dependencies
   • Add `swagger-ui-express` to dependencies (no other new dependencies required).

2. OpenAPI Specification Endpoint
   • In `createApp()`, define an `openapiSpec` object that describes all API paths: `/pi`, `/pi/data`, `/pi/chart`, `/pi/stream`, `/benchmark`, `/dashboard` and any others.
   • Include query parameters, request and response schemas, header definitions, content types, and SSE event schema for `/pi/stream`.
   • Register GET `/openapi.json` to return the JSON spec: `res.json(openapiSpec)`.

3. Swagger UI Setup
   • In `createApp()`, import `swaggerUi` from `swagger-ui-express`.
   • Add middleware: `app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec))` to serve the interactive UI.

4. Server-Sent Events Streaming Endpoint
   • In `createApp()`, register GET `/pi/stream`.
   • Parse and validate query parameters using the existing `ApiParamsSchema`.
   • Set SSE headers:
     - `Content-Type: text/event-stream`
     - `Cache-Control: no-cache`
     - `Connection: keep-alive`
   • On connection, compute approximation updates for iterative algorithms (Leibniz, sampling, etc.):
     - For digit-based algorithms, iterate terms and send SSE frames at each step or at configured intervals.
     - For sampling, send frames after each batch or fixed sample increments.
   • Stream each update as:
     ```
     data: <JSON.stringify({ index, approximation, error })>
     
     ```
   • After completion, send an end event:
     ```
     event: end
     
     ```
   • Close the response.

5. Testing
   • Unit Tests (`tests/unit/server.test.js`):
     - GET `/openapi.json` returns status 200 and JSON matching `openapiSpec` with correct `paths` entries.
     - GET `/docs` returns HTML containing Swagger UI assets.
     - GET `/pi/stream` emits SSE frames: simulate connection, mock `res.write`, and assert frames include `data: {...}` entries and a final `event: end` message.
     - Validate error handling on invalid parameters yields HTTP 400 with JSON error body.

6. Documentation
   • `docs/USAGE.md`:
     - Add **GET /openapi.json**: returns the OpenAPI specification as JSON.
     - Add **GET /docs**: serves interactive API docs.
     - Add **GET /pi/stream**: streams progressive π approximation updates as server-sent events; include usage examples.
   • `README.md`:
     - Under **Features**, update **OpenAPI UI** to note machine-readable spec at `/openapi.json`, interactive docs at `/docs`, and SSE streaming at `/pi/stream`.
     - Provide example curl commands for `/openapi.json`, `/docs`, and `/pi/stream`.

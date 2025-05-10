# Swagger UI Documentation Feature

## Overview
Enable interactive API exploration by integrating Swagger UI and providing an OpenAPI specification for the existing HTTP endpoints. This empowers developers and integrators to discover, understand, and test the RESTful π operations directly in a browser without external tooling.

## Functional Requirements

- Add `swagger-ui-express` to `package.json` dependencies and install it.
- In `src/lib/main.js`, import `{ serve, setup }` from `swagger-ui-express` and construct an OpenAPI spec object:
  - `openapi` version `3.0.0`.
  - `info`: include `title`, `version` (read from `package.json`), and a brief `description` matching the mission.
  - `servers`: list one server with URL `http://localhost:{port}` and description `Local server`.
  - `paths`: document `/pi`, `/distribution`, `/convergence`, and `/benchmark`:
    - For each path, define `get` operation with `summary`, `description`, `parameters` (query parameters with names, types, required flags, descriptions, constraints), and `responses` for `200` and `400` or `500` status codes with media types.
- Mount the Swagger UI middleware in `startHttpServer` before the fallback handler:
  - Serve the raw OpenAPI JSON at `/docs.json` with `res.json(spec)`.
  - Serve the Swagger UI at `/docs`, using `app.use('/docs', serve, setup(spec))`.
- Ensure the generated documentation stays in sync with any changes to endpoint parameters by referencing the same validation logic or zod schemas where applicable.

## Dependencies

- `swagger-ui-express`: for serving the Swagger UI assets and middleware.

## Testing

- **Unit Tests**:
  - Request `GET /docs.json` and assert status `200`, `Content-Type: application/json`, and that the JSON has an `openapi` key and correct `paths` entries.
  - Mock `express` routes to verify that `serve` and `setup` are called with the spec.
- **Integration Tests**:
  - Start the server on an ephemeral port and issue `GET /docs`:
    - Assert status `200`, `Content-Type: text/html`.
    - Confirm the response body contains `Swagger UI` initialization script and references `/docs.json`.

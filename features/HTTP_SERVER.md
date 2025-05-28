# Summary
Enhance the existing HTTP server feature by adding health and version endpoints for diagnostics alongside the core REST operations.

# Functional Requirements

## New `/health` endpoint
- Add a route GET /health that:
  - Responds with status 200 and JSON `{ "status": "ok" }`.
  - Does not require any query parameters.

## New `/version` endpoint
- Add a route GET /version that:
  - Reads the library version from package.json (via a helper function or import).
  - Responds with status 200 and JSON `{ "version": "<current version>" }`.

## Integration into existing server logic
- In `src/lib/main.js`, within the `--serve` flag handling:
  - Before or alongside existing routes, recognize `/health` and `/version`.
  - Ensure these endpoints are served without interfering with other routes.
  - No authentication is required.

# Testing

- Unit Tests
  - Stub the HTTP server handlers and simulate GET requests to `/health` and `/version`:
    1. Assert `/health` returns status 200 and body `{ status: "ok" }`.
    2. Stub package.json version field to a test value and assert `/version` returns status 200 and correct version JSON.

- Integration Tests
  - Start the server on an ephemeral port and use `http.get` to:
    1. Call `/health` and assert HTTP 200 and JSON content.
    2. Call `/version` and assert HTTP 200 and JSON content matching package version.
    3. Verify that existing endpoints (`/sources`, `/fetch`, etc.) continue to behave unchanged.

# Documentation

- Update `README.md` under **Features > HTTP Server**:
  - Add entries:
    - **GET /health** – check server health; returns `{ status: "ok" }`.
    - **GET /version** – retrieve CLI/library version.

- Update `docs/HTTP_SERVER.md`:
  - Document the new endpoints with example `curl` commands and sample responses.
  - Ensure the feature overview and testing guidance include the health and version endpoints.
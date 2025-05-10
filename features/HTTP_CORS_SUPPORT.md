# HTTP CORS Support Feature

## Overview
Enable Cross-Origin Resource Sharing (CORS) for the HTTP API server to permit web clients from other domains to access π endpoints securely.

## Functional Requirements
- Add "cors" package to dependencies in package.json.
- In startHttpServer in src/lib/main.js, import cors from 'cors'.
- Accept a new CLI flag --cors (boolean) to enable CORS middleware.
- Optionally accept --cors-origin <string> to set Access-Control-Allow-Origin header (default '*').
- When --cors is provided before starting the server, apply cors({ origin: corsOrigin }) as a global middleware before defining routes.
- Ensure that CORS headers Access-Control-Allow-Methods and Access-Control-Allow-Headers are set to allow common HTTP methods (GET, POST) and headers (Content-Type).
- Update CLI help output to document --cors and --cors-origin flags.

## Testing
- Unit Tests in tests/unit/http.test.js:
  - Start startHttpServer with CORS enabled and a custom origin, issue a request with an Origin header, and assert response includes Access-Control-Allow-Origin with expected value.
  - Test default origin when --cors without --cors-origin.
  - Verify no CORS headers when --cors is not provided.
- CLI E2E Tests in tests/e2e/http.test.js:
  - Spawn the server with --serve --cors --cors-origin http://example.com, send HTTP request with Origin header http://example.com, and assert header present.
  - Ensure preflight OPTIONS requests receive correct CORS response.

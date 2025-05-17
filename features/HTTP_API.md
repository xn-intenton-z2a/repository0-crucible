# HTTP API Server

Expose π calculation functionality over HTTP with optional JSON and PNG responses, and include interactive Swagger documentation.

# CLI Flag and Options

Add two new CLI options:

- `--serve`    Launch the HTTP server instead of printing to console or writing files.
- `--port`     Specify the port for the HTTP server (integer ≥ 1). Defaults to 3000.

# HTTP Endpoints

## GET /pi
Accepts query parameters:
- `digits`     Total significant digits (integer ≥ 1).
- `algorithm`  Approximation method: leibniz, spigot, or montecarlo.
- `format`     Response format: json (default) or png.

Behavior:
- When `format=json`, returns `Content-Type: application/json` with body:
  {
    pi: string,
    algorithm: string,
    digits: number,
    durationMs: number
  }
- When `format=png`, returns `Content-Type: image/png` and the PNG image buffer of the π digits.

## GET /api-docs
Serve interactive Swagger UI for the API on the same server.

# Implementation Details

1. Add `express` and `swagger-ui-express` to dependencies.  
2. In `src/lib/main.js`, detect `--serve`:
   - Load or generate an OpenAPI specification object for the `/pi` endpoint.  
   - Create an Express app, enable JSON body parsing, and configure CORS as needed.  
   - Mount the Swagger UI middleware at `/api-docs` using the OpenAPI spec.  
   - Define the `/pi` route handler that:  
     - Parses and validates query parameters.  
     - Invokes `calculatePi` with the specified digits and algorithm.  
     - Measures calculation time if benchmark is enabled.  
     - Returns JSON or uses `outputPng` to send the PNG buffer.  
   - Start listening on the specified port and log a startup message.

# Tests

Add tests in `tests/unit/main.test.js` covering HTTP behavior:

- Starting the server with `main(['--serve','--port','0'])` binds to an ephemeral port and responds to `/pi?digits=3` with JSON `{ pi: '3.14', digits:3, algorithm:'leibniz', durationMs: number }`.
- Querying `/pi?digits=2&format=png` returns a PNG buffer that begins with the `\x89PNG` signature.
- Requesting invalid parameters (e.g., non-integer digits) yields HTTP 400 with error message.

# Documentation Updates

- Update `docs/USAGE.md` to document the `--serve` and `--port` flags, describe HTTP endpoints `/pi` and `/api-docs`, and include request examples.
- Update `README.md` Features section to list HTTP API capabilities and usage instructions for the server mode.

# Dependencies

- Add `express` and `swagger-ui-express` to `dependencies` in `package.json` for HTTP server and Swagger UI support.
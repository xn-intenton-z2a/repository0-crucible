# Overview

Add an HTTP server mode to serve π calculation results over HTTP as a RESTful API. This allows users and integrations to request π values or PNG visualizations without invoking the CLI directly.

# CLI Flags

--serve         Start the HTTP server instead of calculating π to stdout.
--port <n>      Port number on which to listen (integer between 1 and 65535). Default: 3000.

# HTTP Endpoints

GET /pi
  Query parameters:
    digits (required): integer between 1 and 10000.
    method (optional): chudnovsky, gauss-legendre, machin, nilakantha. Default: chudnovsky.
    format (optional): text or png. Default: text.
  Responses:
    200 text/plain for format=text. Body contains π to the requested decimals.
    200 image/png for format=png. Body contains a PNG image of the digits.
    400 for invalid or missing parameters with JSON error message.

# Implementation Details

Modify src/lib/main.js:
- Detect --serve flag and optional --port flag.
- If serve mode is enabled:
  • Use the built-in http module to create a server listening on the specified port.
  • For GET /pi, parse URL and query params using URL and URLSearchParams.
  • Validate digits, method, and format as in CLI mode.
  • For format=text, call calculatePi and respond with content-type text/plain.
  • For format=png, call calculatePi, then render to a 1×N PNG using PImage and pipe to response with content-type image/png.
  • On validation errors, respond with status 400 and a JSON payload { error: string }.

# Testing

Unit tests in tests/unit/main.test.js:
- Add tests for invoking main(["--serve"]), ensuring it starts without throwing when port is valid.
- Mock http.createServer to verify handler behavior for valid and invalid requests.

End-to-end tests in tests/e2e/http.test.js:
- Start the server via child_process on a free port.
- Send HTTP GET requests to /pi with various params and verify responses: status codes, content types, and payload correctness for text and PNG.
- Test invalid params return 400 with JSON error.

# Documentation

README.md:
- Under Features, add “HTTP server mode” with example:
  node src/lib/main.js --serve --port 8080
- Example curl commands for text and PNG.

docs/USAGE.md:
- Add section “HTTP API” describing GET /pi endpoint, parameters, and examples for text and PNG responses.

# Dependencies

- No new dependencies; use built-in http module and existing pureimage and calculatePi logic.
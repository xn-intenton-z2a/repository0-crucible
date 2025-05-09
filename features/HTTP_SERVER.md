# Overview

Extend the CLI with an HTTP server mode that allows clients to request π calculations via RESTful endpoints and receive results as text or PNG images. This feature builds on the existing calculatePi library and CLI flags to serve HTTP requests concurrently.

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

# Implementation Details

1. Command-line parsing in src/lib/main.js:
   - Recognize --serve and --port flags before benchmark or calculation logic.
   - Validate port as integer between 1 and 65535.
2. HTTP Server setup:
   - Use the built-in http module to create and listen on the specified port.
   - Use URL and URLSearchParams to parse query parameters for /pi requests.
   - Validate parameters according to existing rules in CLI mode.
3. Request handling:
   - For format=text, call calculatePi and respond with content-type text/plain.
   - For format=png, call calculatePi then render a one-row PNG:
       • Determine width as number of digits (excluding decimal point) and height as 1.
       • Use pureimage to create an image buffer and write pixel values (e.g., white for digit pixels, black background) or draw text if preferred.
       • Respond with content-type image/png streaming the PNG buffer.
   - On validation errors, respond with 400 status and JSON error payload.
4. Graceful shutdown and error logging.

# Testing

- Unit tests in tests/unit/main.test.js:
  • Mock http.createServer and simulate requests to /pi with various valid and invalid parameters.
  • Verify correct status codes, content-types, and response payloads for both text and PNG formats.
- End-to-end tests in tests/e2e/http.test.js:
  • Launch the server in a child process on a random free port.
  • Perform HTTP GET requests using fetch or axios to /pi with combinations of digits, method, and format.
  • Assert that responses for format=text match calculatePi output and format=png return a valid PNG binary.
  • Validate 400 errors for missing or invalid parameters.

# Documentation

- Update README.md under Features to include “HTTP server mode” with example:
    node src/lib/main.js --serve --port 8080
- Add curl examples for text and PNG endpoints.
- Update docs/USAGE.md to describe GET /pi endpoint, parameters, and sample requests and responses.

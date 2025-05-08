# Overview

Extend the CLI library to serve an HTTP API that computes π to arbitrary precision on request and returns JSON or PNG results. This addition transforms the tool from a pure CLI into a lightweight microservice, enabling integrations with web applications and remote clients.

# Implementation

1. HTTP Server Setup
   - Add Express as a dependency in package.json.
   - In src/lib/main.js, detect the --serve flag and launch an Express server on a configurable port (default 3000).

2. API Routes
   - GET /pi
     • Query parameters: digits (integer), algorithm (leibniz, gauss-legendre, chudnovsky), format (json, png).
     • Response: JSON with computed digits, algorithm, time taken, or PNG image when format=png.
   - GET /benchmark
     • Accepts the same parameters but always returns detailed timing and throughput metrics in JSON.

3. Integration with Existing Algorithms
   - Refactor each π algorithm implementation into separate functions in src/lib/main.js or a new internal module.
   - The HTTP routes invoke these functions and measure execution time with performance.now().

4. Configuration
   - Allow customizing server port via environment variable SERVER_PORT or CLI option --port when using --serve.

# Testing

- Unit tests in tests/unit:
  • Import and call the algorithm functions directly to verify correctness of first 10 digits.
  • Simulate HTTP server start without errors.
- E2E tests in tests/e2e/cli.test.js:
  • Use a HTTP client (such as supertest) to send GET requests to /pi and /benchmark endpoints.
  • Verify status codes, response structure, and sample values.

# Documentation

- Update README.md:
  • Add instructions to install express and launch the HTTP server with npm run serve.
  • Describe the /pi and /benchmark endpoints with examples.
  • Include sample curl commands for JSON and PNG responses.
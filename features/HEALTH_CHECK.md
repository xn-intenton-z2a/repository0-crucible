# Overview

This feature adds a health check endpoint to the HTTP API server for readiness and liveness monitoring. It provides a lightweight status response indicating server health, uptime, and application version.

# HTTP API

GET /health
    Returns a JSON object with the following fields
      status: string ("ok" when the server is running)
      uptime: number (seconds since server start, fractional precision)
      version: string (application version from package.json)
    Responds with status code 200 and Content-Type application/json.

# Implementation

- In src/lib/main.js, within the --serve HTTP server setup, register a route handler for GET /health before other routes.
- Import the version value from package.json.
- On each request to /health:
    1. Call process.uptime() to get the current uptime.
    2. Build the response object { status: "ok", uptime, version }.
    3. Set response header Content-Type to application/json.
    4. Write the JSON string and respond with status code 200.
- No additional dependencies are required.

# Testing

- Add unit tests in tests/unit/main.test.js:
    • Start the HTTP server on a random available port with --serve.
    • Send an HTTP GET request to /health.
    • Verify the response status code is 200.
    • Verify the Content-Type header is application/json.
    • Parse the response body as JSON and assert:
        – status equals "ok"
        – uptime is a number greater than or equal to zero
        – version matches the version field in package.json

# Documentation

- Update README.md under Features to describe the /health endpoint:
    • Explain its purpose for readiness and liveness checks.
    • Provide an example curl command:
        curl http://localhost:3000/health
    • Show a sample JSON response:
        { status: "ok", uptime: 12.34, version: "1.2.0-0" }
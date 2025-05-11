# Overview

Provide an HTTP server mode that exposes π calculation and benchmarking as JSON API endpoints. This feature allows users to invoke core functionality remotely over HTTP and integrate with other tools or web clients.

# CLI Flags

- Add flag --serve or -s with optional port number (e.g. --serve 4000).  
- If no port is provided, default to port 3000.  
- When --serve is present, the CLI starts the HTTP server and does not print to console directly.

# API Endpoints

- GET /pi?digits={n}
  Returns a JSON object with value: π to n decimal places.
  Query parameter digits is a nonnegative integer up to 1000, default 10.

- GET /benchmark?digits={list}
  Returns a JSON array of benchmark results for each digit target.
  Query parameter digits is a comma-separated list of integers, default [10,100,500].
  Each result object contains digitCount, durationMs, memoryBytes.

# Implementation Details

- Extend src/lib/main.js argument parsing to detect --serve or -s and optional port.
- When serving:
  - Import Node http module and calculatePi and benchmarking logic.
  - Create an HTTP server listening on the configured port.
  - On incoming requests, parse URL and query params.
  - Route path /pi to calculatePi and return JSON response { value: string }.
  - Route path /benchmark to run in-process benchmarking per existing algorithm and return JSON of results.
  - Respond with 400 status and descriptive JSON error for invalid paths or inputs.
  - On server start, print listening address to console.

# Testing

- In tests/unit/main.test.js start the server by calling main(["--serve","0"]) and capturing the returned server instance.
- Use a simple HTTP client (fetch API or Node http.request) to request /pi and /benchmark endpoints.
- Verify status codes, JSON structure, and error handling for invalid inputs.
- Ensure server closes after tests to avoid hanging processes.

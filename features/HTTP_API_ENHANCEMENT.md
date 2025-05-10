# HTTP API Enhancement Feature

## Overview
Extend the existing HTTP API server to expose new REST endpoints for digit distribution, convergence visualization, and performance benchmarking. Clients can retrieve PNG charts or JSON metrics directly without writing files locally.

# Endpoints

## GET /distribution
- Query parameters:
  - digits: integer, required, minimum 1, maximum 1e6
  - algorithm: optional, one of machin, gauss-legendre, chudnovsky (default machin)
- On success, respond with image/png containing a bar chart of digit frequencies using QuickChart.
- On invalid input, respond 400 with JSON error message.

## GET /convergence
- Query parameters:
  - digits: integer, required, minimum 10, maximum 1e6
  - algorithm: optional, one of machin, gauss-legendre, chudnovsky (default machin)
  - iterations: optional integer, minimum 2 (default 10)
- On success, respond with image/png containing a line chart of approximation error vs. precision.
- On invalid input, respond 400 with JSON error.

## GET /benchmark
- Query parameters:
  - minDigits: integer, required, minimum 1
  - maxDigits: integer, required, ≥ minDigits
  - step: optional integer, minimum 1 (default = minDigits)
  - algorithm: optional, machin or gauss-legendre (default machin)
  - chart: optional boolean; if true return PNG chart, otherwise JSON metrics
- On success:
  - If chart=true, respond image/png of performance line chart.
  - Otherwise, respond application/json with array of { digits, timeMs }.
- On invalid input, respond 400 with JSON error.

# Implementation Details
- In src/lib/main.js, import QuickChart from quickchart-js and register routes before the 404 handler.
- Parse and validate query parameters manually or with zod.
- Use existing calculatePi, benchmarkPi functions to compute data.
- Generate QuickChart configuration, render to buffer, and write directly to res with appropriate headers.

# Dependencies
- Ensure quickchart-js is listed in package.json.
- No new dependencies beyond express and quickchart-js.

# Testing
- Add unit tests in tests/unit/http.test.js to mock QuickChart.render and exercise each endpoint:
  - Test valid parameters return 200 with correct headers and body signature.
  - Test invalid parameters yield 400 and descriptive JSON errors.
- Add E2E tests in tests/e2e/http.test.js:
  - Start server on ephemeral port, issue GET requests to /distribution, /convergence, /benchmark with and without chart, and assert responses.
  - Verify PNG responses start with the PNG signature and JSON metrics have expected structure.
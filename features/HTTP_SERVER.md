# Overview

Implement a basic HTTP server mode that exposes two core REST endpoints for π computation and algorithm benchmarking. The server should validate inputs, handle text and PNG outputs, and return structured JSON results for benchmarks.

# CLI Integration

When the CLI is invoked with `--serve`, switch to server mode instead of running local calculations:

• `--serve` (boolean) to enable HTTP server mode.  
• `--port <n>` (integer, default 3000) to specify listening port.  

In server mode, skip CLI output and start an Express server on the configured port.

# Endpoints

## GET /pi

Query Parameters:
• `digits` (int, 1–10000, default 100)  
• `method` (string: chudnovsky|gauss-legendre|machin|nilakantha, default chudnovsky)  
• `format` (string: text|png, default text)

Behavior:
- Validate request with zod; respond 400 with JSON error on invalid input.  
- For `format=text`, compute π via `calculatePi` and respond with `text/plain` body containing the digits.  
- For `format=png`, compute π, render a monochrome PNG image of the digits using pureimage, and respond with `image/png` binary body.

## GET /benchmark

Query Parameters:
• `digits` (int, 1–10000, default 100)  
• `methods` (comma-separated list of valid names, default all methods)  
• `runs` (int ≥1, default 3)

Behavior:
- Validate request with zod; respond 400 on invalid input.  
- Invoke `benchmarkPi(digits, runs, methodsArray)` to measure performance.  
- Respond with `application/json` array of objects: `{ method, runs, averageTimeMs, minTimeMs, maxTimeMs }`.

# Implementation Details

1. Dependencies: add or reuse express, cors, zod, pureimage.  
2. In `src/lib/main.js`: detect `--serve` and `--port`, import Express, configure middleware, and mount routes.  
3. Use zod schemas for parameter parsing and validation.  
4. Reuse existing `calculatePi` and `benchmarkPi` functions.  
5. For PNG, call pureimage to render and pipe to response.

# Tests

Create unit tests in `tests/unit/http.server.test.js` using Vitest and Supertest to verify:  
- Validation errors return 400 with JSON error.  
- `/pi` returns correct status, content type, and body for both text and PNG formats.  
- `/benchmark` returns a JSON array with expected result shape.

# Documentation Updates

- Update `README.md` under HTTP Server mode to list flags and example `curl` commands for `/pi` and `/benchmark`.  
- Update `docs/USAGE.md` to document the two new endpoints, their parameters, and sample requests.
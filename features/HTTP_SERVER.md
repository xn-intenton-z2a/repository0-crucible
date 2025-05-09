# Overview

Enable an HTTP server mode for the π calculator tool. When the user supplies a --serve flag, the CLI launches an Express-based web server that exposes key endpoints for health checks, on-demand π computation, benchmarking, and streaming progress updates via Server-Sent Events.

# Endpoints

## GET /health
Return a simple JSON object reporting service health.

- Response status 200
- Body JSON with a single property status set to ok

## GET /pi
Compute π on demand and return the result in text or PNG format.

- Query parameters digits (integer 1–10000, default 100), method (one of chudnovsky, gauss-legendre, machin, nilakantha, default chudnovsky), format (text or png, default text)
- For format=text: respond with Content-Type text/plain and the π digits string
- For format=png: render a monochrome PNG of the digits and respond with Content-Type image/png

## GET /pi/stream
Stream real-time progress and final result via SSE.

- Query parameters same as /pi plus progressInterval (integer 1–100, default 5)
- Set headers Content-Type text/event-stream, Cache-Control no-cache, Connection keep-alive
- Emit event named progress with JSON payload { percentComplete: number } at each interval
- After completion emit event named result with JSON payload { pi: string, pngBase64?: string } then close stream

## GET /benchmark
Run performance benchmarks and return timing data as JSON.

- Query parameters digits (integer 1–10000, default 100), methods (comma-separated list of valid methods or omitted for all), runs (integer ≥1, default 3)
- Respond with Content-Type application/json and an array of objects { method, runs, averageTimeMs, minTimeMs, maxTimeMs }

# Implementation Details

- Add express and zod to dependencies, and supertest to devDependencies for testing
- In src/lib/main.js add flags --serve and --port (default 3000). When serve is true, skip CLI output and initialize the Express server
- Import express and create an app with JSON middleware
- Use zod schemas to validate and parse query parameters for each route
- Define route handlers:
  • /health returns { status: ok }
  • /pi calls calculatePi or renders PNG via pureimage, sets appropriate headers and sends body
  • /pi/stream uses calculatePi with onProgress callback writing SSE frames and encodes PNG output as base64 when needed
  • /benchmark calls benchmarkPi and returns the results as JSON
- Listen on configured port and log a startup message to console

# Testing

- Create tests/unit/http.server.test.js using supertest
- Test /health returns 200 and { status: ok }
- Test /pi with various query parameters for text and PNG responses, including error cases for invalid parameters
- Test /pi/stream SSE events arrive in increasing order and include both progress and result events
- Test /benchmark returns correct JSON structure and appropriate error on invalid input

# Documentation

- Update README.md under HTTP Server Mode with --serve and --port flags and list of endpoints with descriptions
- Update docs/USAGE.md in the HTTP Server section to document all supported endpoints, parameters, headers, and example invocations
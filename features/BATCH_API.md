# Overview

Introduce a batch processing endpoint to the HTTP server mode so clients can request multiple π calculations in a single API call. This reduces round-trip overhead and supports efficient bulk computations.

# HTTP Endpoint

Define a new POST route when the server is active:

POST /pi/batch
  • Accepts a JSON array of request objects with fields:
      • digits: integer number of decimal places (required)
      • algorithm: optional string (machin|chudnovsky|ramanujan)
      • workers: optional positive integer for chudnovsky parallelism
  • Validates the array and each item using Zod schema.
  • Computes π for each request sequentially or in parallel, returning an array of results:
      [{ digits, pi }]
  • On validation error, responds with status 400 and JSON { error: string } without performing computations.

# Implementation Details

• In src/lib/main.js during server setup when --serve is enabled:
  – Import express.json and zod.
  – Define a Zod schema: an array of objects { digits: z.number().int().min(1).max(1000), algorithm: z.enum([...]).optional(), workers: z.number().int().min(1).optional() }.
  – Apply express.json() middleware and mount app.post('/pi/batch', handler).
  – In handler, safeParse the request body. On failure, respond 400 with { error: issues message }.
  – On success, iterate over the parsed array, for each item call calculatePi(digits, { algorithm, workers }).
  – Collect results into an array of { digits, pi } and send JSON response with status 200.
  – Ensure errors in individual computations are caught and returned as a 500 error with a generic message.

# Testing

• Add unit tests in tests/unit/main.test.js using supertest:
  – Test POST /pi/batch with valid body [{ digits:5 }, { digits:3, algorithm:'ramanujan' }] returns status 200 and JSON array with correct pi strings.
  – Test invalid bodies (non-array, missing digits, invalid types) yield 400 and JSON error.
  – Simulate internal error by mocking calculatePi to throw; assert status 500 and JSON error.

# Documentation

• Update README.md under HTTP API section:
  – Document the POST /pi/batch endpoint, request schema and example:
      POST /pi/batch
      [ { "digits": 10 }, { "digits": 100, "algorithm": "chudnovsky", "workers": 2 } ]
      Response:
      [ { "digits": 10, "pi": "3.1415926536" }, { "digits": 100, "pi": "3.14..." } ]
  – Note validation rules and error responses.
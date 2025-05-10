# HTTP Digit Search Feature

## Overview

Add a REST endpoint to search for numeric substrings within π digits via the HTTP API. This enables clients to locate patterns in π without downloading or processing the entire digit sequence.

## Endpoint: GET /search

- Query parameters:
  - pattern (string, required): one or more numeric characters to find in π digits.
  - digits (integer, optional): total number of digits to compute (including integer part; minimum 1; default 1001 to represent 1 integer digit + 1000 fractional digits).
  - algorithm (string, optional): one of machin, gauss-legendre, or chudnovsky (default machin).
  - all (boolean, optional): if true, return all match positions; if false or omitted, return only the first occurrence.
- Validation:
  - pattern must consist solely of digits and length ≤ digits.
  - digits must be an integer ≥ 1 and ≤ 1e6.
  - algorithm must be one of the supported values.
  - all, if provided, must parse to a boolean.
- Behavior:
  - On valid request, call existing searchPi(pattern, {digits, algorithm, all}).
  - If all=false, respond 200 with JSON { position: <number or null> }.
  - If all=true, respond 200 with JSON { positions: [<number>] }.
  - On invalid input, respond 400 with JSON { error: <message> }.
- Response headers:
  - Content-Type: application/json

## Implementation in src/lib/main.js

- Register a new route:
  app.get("/search", async (req, res) => { ... })
- Extract and parse req.query parameters.
- Perform validation and return 400 on failure.
- Invoke searchPi and send its result via res.json.

## Testing

- Unit tests in tests/unit/http.test.js:
  - Mock searchPi to return known values; test valid and invalid patterns and parameters.
  - Confirm 400 responses on invalid pattern, digits, or algorithm.
- CLI E2E tests in tests/e2e/http.test.js:
  - Start server on ephemeral port.
  - Issue GET /search?pattern=314&digits=10; expect { position: 1 } and status 200.
  - Issue GET /search?pattern=14&digits=10&all=true; expect { positions: [2, ...] }.
  - Test missing or invalid params yield 400 and descriptive error.
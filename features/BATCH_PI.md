# Overview

Introduce batch processing support for π calculations via HTTP endpoint. Clients can send a list of calculation parameter objects in a single POST request to reduce overhead and simplify integrations when multiple π values are required.

# Implementation

1. Dependencies
   • Ensure express.json middleware is applied for parsing JSON bodies.
   • Reuse the existing ApiParamsSchema for validating each request object.

2. HTTP API Integration
   a. In createApp(), add a new route:
      POST /pi/batch
   b. Handler behavior:
      • Validate that req.body is an array. If not, respond with 400 and an error message.
      • For each element in the array:
        - Parse and validate parameters using ApiParamsSchema.parse.
        - Compute either a simple result ({ result }) or a diagnostics object when diagnostics flag is true.
      • Collect all outcomes into an array and respond with res.json(resultsArray).
      • On validation failure of any element, return 400 with an errors array that indicates the index of the failed item and the validation messages.

# Testing

1. HTTP Tests in tests/unit/server.test.js
   - Test POST /pi/batch with a valid array of requests (e.g., [{ digits:2 }, { algorithm:"montecarlo", samples:1000, diagnostics:true }]) and assert a JSON array of correct result objects is returned.
   - Test handling of mixed algorithm types and diagnostics flags in one batch.
   - Test POST /pi/batch with non-array body and expect 400 with appropriate error message.
   - Test POST /pi/batch where one element has invalid parameters (e.g., negative digits) and expect 400 with errors indicating element index and validation details.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add **POST /pi/batch**:
     Accepts a JSON array of parameter objects and returns a JSON array of results or diagnostics for each entry.

   Example:
   ```bash
   curl -X POST http://localhost:3000/pi/batch \
     -H "Content-Type: application/json" \
     -d '[{"digits":2},{"algorithm":"montecarlo","samples":1000,"diagnostics":true}]'
   ```

2. README.md
   • Under **Features**, add **Batch Requests** describing support for POST /pi/batch to process multiple π calculation requests in one HTTP call.
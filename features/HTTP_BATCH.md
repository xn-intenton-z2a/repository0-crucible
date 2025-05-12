# HTTP Batch Endpoint

Provide the ability to submit multiple π calculation tasks to the HTTP API in a single request, mirroring CLI batch mode but over REST.

# API Endpoint

POST /pi/batch
Accept: application/json
Body: JSON array of task objects. Each task may include fields: algorithm, digits, samples, diagnostics, error, error-algorithm, maxIterations, batchSize, seed, and any other supported options.
Response: application/json array of result objects. Each object contains result or diagnostics fields matching the behavior of GET /pi for that task.

# Implementation

1. In createApp(), define a POST handler at /pi/batch.
2. Use express.json() middleware to parse JSON bodies.
3. Validate the request body using a Zod schema: an array of ApiParamsSchema objects.
4. Iterate tasks: for each task, invoke the same calculation logic as GET /pi (leibniz, montecarlo, chudnovsky, error mode, etc.).
5. Collect outputs: for non-diagnostics tasks wrap result in {result}, for diagnostics include full diagnostics object.
6. Send the array of outputs via res.json().

# Testing

1. In tests/unit/server.test.js add tests using supertest:
   • Successful batch: POST /pi/batch with two tasks returns an array of two responses with correct result and diagnostics fields.
   • Invalid body: POST /pi/batch with non-array or invalid task yields HTTP 400 and JSON error details.

# Documentation

1. Update docs/USAGE.md:
   • Document POST /pi/batch usage with example request and sample response.
2. Update README.md under Features:
   • Add a section describing HTTP Batch Endpoint and sample curl command.
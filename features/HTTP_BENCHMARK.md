# Overview

Introduce an HTTP endpoint `/benchmark` that executes all supported π calculation algorithms with user-provided parameters and returns a JSON array of performance results. This empowers clients to remotely compare execution time, accuracy, and error for each algorithm in a single request.

# Implementation

1. Add Route
   • In createApp(), register a new GET `/benchmark` route after existing endpoints.
   • Reuse ApiParamsSchema to parse and validate query parameters: digits, samples, level, maxIterations, errorTolerance.

2. Benchmark Logic
   • Define an array of algorithm names: leibniz, montecarlo, chudnovsky, ramanujan-sato, gauss-legendre.
   • For each algorithm, record start time, invoke the corresponding calculation function with parsed parameters, compute error for sampling algorithms or digit-based methods, and measure durationMs.
   • Collect objects containing algorithm, input parameters, result, durationMs, and error into an array.

3. Response
   • Return status 200 with `application/json` Content-Type and the array of benchmark result objects.

# Testing

1. HTTP Tests in tests/unit/server.test.js
   • GET `/benchmark` without query should return 200, JSON array of length 5 with entries for each algorithm and default parameters.
   • GET `/benchmark?digits=3&algorithm=gauss-legendre` should include an entry with algorithm gauss-legendre, digits 3, result 3.142, and durationMs and error fields.
   • Ensure response objects contain keys algorithm, result, durationMs, error, and the relevant input parameters (digits, samples, level, maxIterations, errorTolerance) as applicable.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add **GET /benchmark** with a description and example:
     curl "http://localhost:3000/benchmark?digits=5&samples=50000&level=1"

2. README.md
   • Under **Features**, add **HTTP Benchmark Endpoint** describing the `/benchmark` endpoint, its parameters, and an example of remote performance comparison.
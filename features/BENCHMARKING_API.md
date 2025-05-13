# Overview

Provide a dedicated HTTP endpoint and CLI integration for end-to-end benchmarking of all π calculation algorithms. Users can compare performance and accuracy across methods in a single request or CLI call, receiving results as structured JSON or CSV for further analysis.

# Implementation

1. CLI Integration
   • Extend the existing --benchmark flag in main to accept an optional --benchmark-format=<json|csv> parameter.
   • When --benchmark is invoked, collect performance metrics (durationMs) and error for each supported algorithm (leibniz, montecarlo, chudnovsky, ramanujan-sato, gauss-legendre).
   • Format the output as JSON by default or output CSV when --benchmark-format=csv is specified, writing to stdout or a file if --benchmark-file=<filepath> is provided.

2. HTTP API Integration
   • In createApp(), register GET /benchmark.
   • Accept query parameters matching the CLI options: digits, samples, level, maxIterations, errorTolerance, and format (json or csv).
   • On each request, sequentially run all supported algorithms with the parsed parameters, record result, durationMs, and computed error against Math.PI (to the specified precision).
   • Return a JSON array of objects by default, or a text/csv payload when format=csv. CSV must include header row: algorithm,digits,samples,level,maxIterations,errorTolerance,result,durationMs,error.

3. Endpoint Behavior
   • Default format: application/json, status 200. JSON body is an array of benchmark records.
   • CSV behavior: text/csv, status 200, comma-separated values with header row and one row per algorithm.
   • Input validation: reuse ApiParamsSchema for common parameters and extend to include format and errorTolerance. On validation failure, return HTTP 400 and JSON error details.

# Testing

1. Unit Tests in tests/unit/main.test.js:
   • Verify that main(["--benchmark"]) logs a JSON array with entries for each algorithm containing expected properties.
   • Verify that main(["--benchmark","--benchmark-format=csv"]) logs CSV text with correct header and rows.

2. HTTP Tests in tests/unit/server.test.js:
   • GET /benchmark returns status 200 and application/json with an array of five records.
   • GET /benchmark?format=csv returns status 200 and text/csv with header and five data rows.
   • Invalid format value yields 400 with JSON errors array.
   • Query validation errors (e.g. negative digits) yield 400 with detailed errors.

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, add section **GET /benchmark** with examples for JSON and CSV.
   • Under **Options**, document `--benchmark-format`, `--benchmark-file`, and its behavior.

2. README.md
   • Under **Features**, add **Benchmarking API** with brief description and CLI/HTTP usage examples.

# Overview

This feature provides a unified interface for π calculation by introducing two flags: --digits to specify the number of digits and --algorithm to select the computation method. The default algorithm is Chudnovsky. It replaces the older calculate-pi subcommand, simplifying the CLI and HTTP API surfaces.

# CLI Interface

--digits <number>
    Required positive integer specifying how many digits of π to compute.
--algorithm <chudnovsky|ramanujan>
    Select the π computation algorithm. Supported values are chudnovsky (default) and ramanujan.
--output <path>
    Optional file path to write the result. If omitted, output is written to stdout.

# HTTP API

GET /calculate
    Query parameters:
      digits: number (required) – number of π digits to compute
      algorithm: chudnovsky|ramanujan (optional, default: chudnovsky)
      format: json|text (optional, default: json)
    Responses:
      200 JSON: { pi: string, digits: number, algorithm: string } when format=json
      200 text/plain: raw digit string when format=text
      400 Bad Request: JSON { error: string } for invalid parameters
      500 Internal Server Error: JSON { error: string } for computation failures

# Implementation

- In src/lib/main.js, parse the --digits and --algorithm flags for CLI and extract the same parameters in the HTTP handler.
- Validate that digits is a positive integer and algorithm is one of the supported values; on invalid input, exit CLI with code 1 or respond HTTP 400.
- Default algorithm = chudnovsky. Dispatch:
    • chudnovskyPi(digits) for chudnovsky
    • ramanujanPi(digits) for ramanujan
- Ensure that chudnovskyPi and ramanujanPi are available and properly imported from their modules.
- For the CLI:
    • On success, write digits to stdout or output file and exit code 0.
    • On failure, write error to stderr and exit code 1.
- For HTTP:
    • On success, serialize response based on format and respond with status 200.
    • On validation error, respond with status 400 and JSON error message.
    • On internal error, respond with status 500 and JSON error message.

# Testing

- In tests/unit/main.test.js, add tests to:
    • Invoke main(["--digits","5"]) and verify stdout contains the first 5 digits of π and exit code 0.
    • Invoke main with invalid digits (zero, negative, noninteger) and expect exit code 1 and stderr error message.
    • Invoke main(["--digits","5","--algorithm","ramanujan"]) and verify output matches ramanujan algorithm prefix.
    • Start HTTP server on a random port and send GET /calculate?digits=3&algorithm=ramanujan&format=text; verify 200 status and correct payload.
    • Send GET /calculate?digits=abc and verify 400 status with JSON error.

# Documentation

- Update README.md under Features:
    • Document the new --digits and --algorithm flags and the HTTP /calculate endpoint.
    • Provide example CLI usage:
        node src/lib/main.js --digits 1000 --algorithm ramanujan
    • Provide example HTTP usage:
        curl "http://localhost:3000/calculate?digits=100&algorithm=chudnovsky&format=text"

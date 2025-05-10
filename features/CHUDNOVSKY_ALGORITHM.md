# Overview

Implement the high-performance Chudnovsky algorithm as the core π calculation method. This feature makes it possible to compute π to any specified number of digits using arbitrary-precision arithmetic and integrates the result into both the CLI and HTTP API.

# CLI Interface

--calculate-pi <digits>
    Compute π to the specified number of digits using the Chudnovsky algorithm. Digits must be a positive integer.
--output <path>
    Optional file path to write the computed digits. If omitted, the result is printed to stdout.

# HTTP API

GET /calculate
    Query parameters:
      digits: number (required) - number of π digits to compute
      format: json|text (optional, default: json)
    Behavior:
      Invoke the Chudnovsky computation and respond with:
        • application/json:  { pi: string, digits: number } when format=json
        • text/plain: raw digit string when format=text

# Implementation

• Add decimal.js as a dependency and import Decimal in src/lib/main.js.
• Implement async function chudnovskyPi(digits: number): Promise<string>:
    1. Set Decimal precision to digits plus guard digits (e.g. digits + 10).
    2. Use the Chudnovsky series formula:
         pi = 1 / (12 * Σ_{k=0..N} ((-1)^k * (6k)! / ((3k)! (k!)^3) * (13591409 + 545140134·k) / 640320^(3k + 3/2)))
    3. Iterate until the magnitude of each term is below 10^(–digits).
    4. Invert and format the result string, excluding the decimal point.
• In the CLI handler:
    – Parse and validate the digits argument as a positive integer.
    – Call chudnovskyPi and write or print the result.
    – Exit with code 0 on success and code 1 on invalid input.
• In the HTTP /calculate handler:
    – Parse and validate query parameters.
    – Call chudnovskyPi and serialize response based on format.
    – Return status 400 for invalid parameters and 500 for computation errors.

# Testing

• In tests/unit/main.test.js:
    – Verify chudnovskyPi(1) and chudnovskyPi(5) return known π prefixes.
    – Test that invalid digit counts (zero, negative, noninteger) throw errors.
    – Simulate CLI invocation:
        main(["--calculate-pi","5"]) and verify stdout output and exit code.
    – Simulate HTTP API:
        Start server, send GET /calculate?digits=3&format=text, verify status 200 and digit string.
        Send GET /calculate?digits=abc, expect 400 and JSON error.

# Documentation

Update README.md under Features:
  • Document --calculate-pi and --output flags with examples.
  • Describe GET /calculate endpoint with sample curl commands and responses.
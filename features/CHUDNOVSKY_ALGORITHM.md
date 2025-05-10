# Overview

Implement the high-performance Chudnovsky algorithm for π calculation using the binary splitting technique. This enhances speed and memory efficiency for large digit targets while preserving accuracy.

# CLI Interface

--calculate-pi <digits>
    Compute π to the specified number of digits using the binary splitting Chudnovsky algorithm. Digits must be a positive integer.
--output <path>
    Optional file path to write the computed digits; defaults to stdout.

# HTTP API

GET /calculate
    Query parameters:
      digits: number (required) - number of π digits to compute
      format: json|text (optional, default: json)
    Behavior:
      Invoke the binary splitting Chudnovsky computation and respond with:
        • application/json: { pi: string, digits: number } when format=json
        • text/plain: raw digit string when format=text

# Implementation

• Add dependency on decimal.js and import Decimal in src/lib/main.js.
• Implement recursive function binarySplitChudnovsky(a: number, b: number): { P: Decimal, Q: Decimal, T: Decimal } that computes Chudnovsky series segments by:
    1. Base case when b - a = 1: compute P, Q, T for term a.
    2. Recursive split at midpoint m = floor((a + b) / 2). Compute left = binarySplitChudnovsky(a, m), right = binarySplitChudnovsky(m, b).
    3. Combine:
         P = left.P.mul(right.P)
         Q = left.Q.mul(right.Q)
         T = right.Q.mul(left.T).add(left.P.mul(right.T))
• In chudnovskyPi(digits: number):
    1. Determine series length N = ceil(digits / 14.181647) + guard
    2. Call binarySplitChudnovsky(0, N) to get { P, Q, T }.
    3. Compute constant term: C = Decimal(426880).mul(Decimal(10005).sqrt()).
    4. π = C.mul(Q).div(T).toFixed(digits).
• Update CLI handler:
    – Parse and validate digits as positive integer.
    – Call chudnovskyPi and write or print the result.
    – Exit with code 0 on success, 1 on invalid input.
• Update HTTP /calculate handler:
    – Parse and validate query parameters.
    – Call chudnovskyPi and serialize response based on format.
    – Respond with 400 for invalid parameters and 500 for errors.

# Testing

• Add unit tests in tests/unit/main.test.js:
    – Verify chudnovskyPi(1) and chudnovskyPi(5) return known π prefixes.
    – Test invalid digit counts (zero, negative, noninteger) throw errors.
    – Compare result and performance of binary splitting against a small naive implementation for medium digit counts.
• Simulate CLI invocation:
    main(["--calculate-pi","5"]) and verify stdout and exit code.
• Simulate HTTP API:
    Start server, send GET /calculate?digits=3&format=text, verify status 200 and raw digits.

# Documentation

• Update README.md under Features:
    – Document the performance benefits and new binary splitting algorithm.
    – Provide example CLI usage:
        node src/lib/main.js --calculate-pi 10000 --output pi.txt
    – Provide example HTTP usage:
        curl "http://localhost:3000/calculate?digits=500&format=json"
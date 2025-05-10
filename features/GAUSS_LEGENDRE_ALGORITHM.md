# Overview

This feature adds support for computing π using the Gauss–Legendre algorithm as an alternative high-precision iterative method. Users can select this algorithm to explore its convergence characteristics and compare performance against existing methods.

# CLI Interface

--algorithm <chudnovsky|ramanujan|gauss-legendre>
    Select the π computation algorithm. Supported values are chudnovsky (default), ramanujan, or gauss-legendre. When set to gauss-legendre, the tool uses the Gauss–Legendre method.

# HTTP API

Extend GET /calculate endpoint:
  Query parameter:
    algorithm: chudnovsky|ramanujan|gauss-legendre (optional, default: chudnovsky)
  When algorithm=gauss-legendre, invoke the new Gauss–Legendre implementation. Responses follow existing format conventions.

# Implementation

- In src/lib/main.js:
  • Import or define async function gaussLegendrePi(digits: number): Promise<string>:
    1. Configure Decimal precision to digits plus guard digits.
    2. Initialize Decimal variables:
       a = Decimal(1)
       b = Decimal(1).dividedBy(Decimal(2).sqrt())
       t = Decimal(1).dividedBy(4)
       p = Decimal(1)
    3. Loop until |a - b| < 10^(−digits):
       aNext = a.plus(b).dividedBy(2)
       bNext = a.times(b).sqrt()
       tNext = t.minus(p.times(a.minus(aNext).pow(2)))
       pNext = p.times(2)
       a, b, t, p = aNext, bNext, tNext, pNext
    4. Compute pi = (a.plus(b)).pow(2).dividedBy(t.times(4)).toFixed(digits)
    5. Return the digit string.

  • Extend CLI argument validation to accept gauss-legendre and dispatch to gaussLegendrePi.
  • In HTTP handler for /calculate, extract algorithm parameter and route to gaussLegendrePi when selected.
  • On invalid algorithm value, exit CLI with code 1 or respond HTTP 400 with JSON error.

# Testing

- In tests/unit/main.test.js:
  • Unit tests for gaussLegendrePi:
    - Verify known prefixes: gaussLegendrePi(1) starts with "3"; gaussLegendrePi(5) starts with "3.1415".
  • CLI tests:
    - Simulate main(["--calculate-pi","5","--algorithm","gauss-legendre"]) and assert stdout contains correct digits and exit code 0.
    - Test invalid algorithm yields exit code 1 and descriptive stderr.
  • HTTP tests:
    - Start server on random port and send GET /calculate?digits=5&algorithm=gauss-legendre&format=json. Verify 200 status and JSON { pi: "3.1415", digits: 5, algorithm: "gauss-legendre" }.
    - Send algorithm=unknown and verify HTTP 400 with JSON error.

# Documentation

- Update README.md under Features:
  • Add gauss-legendre to the list of supported algorithms for --algorithm flag and HTTP API.
  • Provide example CLI usage:
      node src/lib/main.js --calculate-pi 1000 --algorithm gauss-legendre
  • Provide example HTTP usage:
      curl "http://localhost:3000/calculate?digits=500&algorithm=gauss-legendre&format=text"
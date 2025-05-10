# Overview
This feature adds support for computing π using the Ramanujan series algorithm as an alternative to the existing Chudnovsky method. Users gain access to a second high-precision formula for π that demonstrates exploration of novel algorithms.

# CLI Interface
Add a new option to the calculate-pi command:
--algorithm <chudnovsky|ramanujan>
    Select the π algorithm to use for computation. Supported values are chudnovsky (default) or ramanujan.
The calculate-pi command behavior remains unchanged when using the default chudnovsky algorithm.

# HTTP API
Extend the GET /calculate endpoint:
  Query parameters:
    digits: number (required) - number of π digits to compute
    algorithm: chudnovsky|ramanujan (optional, default: chudnovsky)
    format: json|text (optional, default: json)
When algorithm=ramanujan, the server invokes the Ramanujan implementation instead of the Chudnovsky method. Responses follow the same format conventions as existing implementations.

# Implementation
- In src/lib/main.js:
  • Extend the CLI parser or argument handling logic to accept and validate the --algorithm flag for calculate-pi, defaulting to chudnovsky.
  • In the HTTP /calculate handler, extract the algorithm query parameter and dispatch to the corresponding function.
  • Implement a new async function ramanujanPi(digits: number): Promise<string> that:
      - Uses Decimal from decimal.js with precision set to digits plus guard digits.
      - Applies the Ramanujan series:
          1/pi = (2 * sqrt(2) / 9801) * Σ_{k=0..N} ( (factorial(4k) * (1103 + 26390*k)) / (factorial(k)^4 * 396^(4k)) )
      - Iterates until the term magnitude is below 10^(–digits - 1), sums terms, inverts to compute π, and returns the concatenated digit string excluding the decimal point.
      - Implements factorial using Decimal or BigInt loops.
  • Handle invalid digit values or algorithm names by returning errors: exit with status code 1 for CLI and status 400 for HTTP.

# Testing
- In tests/unit/main.test.js:
  • Add unit tests for ramanujanPi: verify known prefixes for ramanujanPi(1) and ramanujanPi(5).
  • Test CLI invocation: simulate main(["--calculate-pi", "5", "--algorithm", "ramanujan"]) and verify stdout contains correct digits and exit code 0.
  • Test HTTP API: start the server, send GET /calculate?digits=3&algorithm=ramanujan, and verify status 200, Content-Type application/json, and payload matches expected π prefix.
  • Verify invalid algorithm parameter (e.g., algorithm=unknown) yields exit code 1 in CLI and HTTP 400 with JSON error.

# Documentation
- Update README.md under Features:
  • Document the new --algorithm flag for calculate-pi and its supported values.
  • Provide example CLI usage:
      node src/lib/main.js --calculate-pi 1000 --algorithm ramanujan
  • Provide example HTTP usage:
      curl "http://localhost:3000/calculate?digits=500&algorithm=ramanujan&format=text"

# Overview

Implement the high-performance Chudnovsky algorithm for π digit computation. This feature provides a core library function that computes π to an arbitrary number of digits, integrates it into the existing CLI under the --calculate-pi command, and exposes it via the HTTP API at GET /calculate.

# CLI Interface

--calculate-pi <digits>
    Compute π to the specified number of digits using the Chudnovsky algorithm.  The result is printed to stdout or written to a file when combined with --output <path>.

# HTTP API

GET /calculate
    Query parameters:
      digits: number (required)  - number of digits to compute
      format: json|text (optional, default: json)
    Returns:
      application/json { pi: string, digits: number } when format=json
      text/plain containing the raw digit string when format=text

# Implementation

- Add dependency on decimal.js (already present) and import Decimal in src/lib/main.js.
- Implement a chudnovskyPi(digits: number): Promise<string> function that:
  • Sets Decimal precision to digits plus guard digits via Decimal.set({ precision: digits + 10 })
  • Uses the Chudnovsky series summation formula to compute π:
      pi = 1 / (12 * sum_{k=0..N} ((-1)^k * (6k)! / ((3k)! (k!)^3) * (13591409 + 545140134 k) / 640320^(3k + 3/2)))
  • Iterates until term magnitude is below 10^(–digits)
  • Rounds and returns the string of π digits excluding the decimal point.
- In the CLI handler for calculate-pi:
  • Parse and validate digits as a positive integer
  • Invoke chudnovskyPi and write output
  • Exit with status zero on success, nonzero on invalid input
- In the HTTP server setup under --serve:
  • Add or extend GET /calculate handler to call chudnovskyPi
  • Set Content-Type based on format, serialize response accordingly
  • Handle errors with status code 400 for invalid parameters and 500 for computation failures

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Test chudnovskyPi(1), chudnovskyPi(5) return known prefixes of π
  • Validate that invalid digit counts (zero, negative, non-integer) throw an error
  • Mock Decimal to simulate series and verify error handling
- Add HTTP tests:
  • Start server with --serve on a random port
  • GET /calculate?digits=3 and verify 200 response and correct JSON payload
  • GET /calculate?digits=5&format=text and verify 200 and plain text digits
  • Verify invalid queries return appropriate status codes and error messages

# Documentation

- Update README.md under Features:
  • Document the --calculate-pi flag with usage examples
  • Describe the GET /calculate endpoint with sample curl commands
  • Note error conditions and format options

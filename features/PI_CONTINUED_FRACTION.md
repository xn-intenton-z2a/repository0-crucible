# Overview
Compute and output the continued fraction representation and rational convergents of π to support analysis of best rational approximations.

# Functional Requirements
- Implement function computePiContinuedFraction(options) in src/lib/main.js
  - options.digits: positive integer specifying decimal precision for π calculation (minimum 10, default 100)
  - options.depth: positive integer specifying number of continued fraction terms to generate (minimum 1, default 10)
  - options.maxDenominator: positive integer specifying maximum allowed denominator for convergent approximations (optional)
- Internally calculate π at the specified precision using calculatePi
- Derive the continued fraction terms by iterating: a₀ = floor(pi), x = pi - a₀, then for each term aᵢ = floor(1/x), x = 1/x - aᵢ
- Collect the sequence of terms up to the specified depth or until denominator exceeds maxDenominator
- For each term index, compute the convergent rational approximation p/q and include numerator and denominator
- Return an object containing:
  - terms: array of integers (continued fraction terms)
  - convergents: array of objects { index:n, numerator:p, denominator:q }

# CLI Interface
- Extend src/lib/main.js to accept flags:
  --cf-digits <n>            Decimal precision for π calculation (minimum 10)
  --cf-depth <n>             Number of continued fraction terms (minimum 1)
  --cf-max-denominator <n>   Maximum denominator for convergents
  --cf-json                  Emit output as a JSON object instead of plain text
- When any --cf flag is provided:
  - Parse and validate cf-digits, cf-depth, cf-max-denominator, and cf-json
  - Invoke computePiContinuedFraction with parsed options
  - If cf-json is set, print the returned object as JSON to stdout
  - Otherwise, print a readable summary:
    Continued fraction terms: [a0, a1, …]
    Convergent 1: p1/q1
    Convergent 2: p2/q2
    …
  - Exit with code zero on success or non-zero on validation errors

# Dependencies
- No new external dependencies required; use existing Decimal.js and built-in operations

# Testing
- Unit tests in tests/unit/main.test.js:
  - Mock calculatePi to return a known value to test term extraction
  - Verify computePiContinuedFraction returns correct terms and convergents for small depth values
  - Test validation rejects invalid cf-digits, cf-depth, and cf-max-denominator
- CLI tests in tests/e2e/cli.test.js:
  - Invoke CLI with --cf-depth 4 --cf-digits 20 and assert output contains expected terms
  - Test --cf-json emits valid JSON with terms and convergents
  - Test invalid flag combinations exit with non-zero code and descriptive error
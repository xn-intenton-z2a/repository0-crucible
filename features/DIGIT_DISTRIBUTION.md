# Digit Distribution Feature

## Feature Overview
Provide a statistical analysis of the distribution of digits in the computed π sequence, enabling users to assess randomness properties and frequency counts in both CLI and HTTP contexts.

## Requirements

1. Add a `--distribution` flag in the CLI. When provided, compute digit frequencies for the requested π digits and output a JSON object mapping each digit (0–9) to its occurrence count.
2. Extend the HTTP API with a GET /distribution endpoint that accepts a `digits` query parameter. Return a JSON response containing frequencies of each digit in the computed π sequence.
3. Validate that `digits` is a positive integer within practical limits. On invalid input, exit with code 1 and print an error in CLI, or return HTTP 400 with a descriptive message in the API.
4. Leverage the existing π computation logic to generate digits before analysis. No additional external dependencies are required.
5. Ensure results are deterministic and correctly aggregated.

## Behavior

- CLI: `node src/lib/main.js --digits 1000 --distribution` prints a JSON object like { "0": 98, "1": 102, … } and exits with code 0.
- HTTP: GET /distribution?digits=500 returns status 200 with body:
  {
    "digits": 500,
    "distribution": { "0": 52, "1": 45, … }
  }
- Errors: invalid digits parameter yields exit code 1 or HTTP 400 with clear error message.

## Testing

- Unit tests for `computeDistribution(piString)` verifying correct counts on known sequences.
- Integration tests invoking the CLI with `--distribution` and asserting JSON output structure and counts.
- HTTP tests for GET /distribution endpoint validating correct HTTP status and response body on valid and invalid inputs.

## Documentation Updates

- Update README to list "Analyze digit distribution of π" under Features.
- Add CLI usage examples and HTTP request examples for distribution analysis.
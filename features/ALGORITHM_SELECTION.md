# Algorithm Selection Feature

## Feature Overview
Provide an option to choose among multiple π computation algorithms in both the CLI and HTTP API, enabling flexible selection and comparative benchmarking of accuracy vs performance.

## Requirements
1. Support a --algorithm <algorithm> flag in the CLI. Supported values: chudnovsky, bbp, machin. Default to chudnovsky.
2. Extend the HTTP /pi endpoint to accept an algorithm query parameter with the same allowed values.
3. Validate algorithm inputs; on invalid values exit with code 1 in the CLI or return HTTP 400 with a descriptive error in the API.
4. Implement at least three independent algorithm implementations (Chudnovsky formula, Bailey–Borwein–Plouffe formula, Machin–like formulas) within src/lib/main.js.
5. Ensure benchmarking (--benchmark flag) reports computation time and memory usage for the selected algorithm.

## Behavior
- CLI: node src/lib/main.js --digits 1000 --algorithm bbp computes π using the BBP algorithm and prints the result.
- CLI: node src/lib/main.js --serve starts the HTTP server; GET /pi?digits=500&algorithm=machin returns JSON with π digits computed via the Machin algorithm.
- On invalid algorithm flags or query parameters, the CLI exits with code 1 and prints an error, and the API responds with HTTP 400 and a descriptive message.

## Testing
- Unit tests for each algorithm implementation verifying known digit outputs for standard values.
- Integration tests invoking the CLI with each algorithm flag and asserting correct output and benchmark metadata.
- HTTP tests for GET /pi?algorithm parameters returning correct algorithm results and error handling.

## Documentation Updates
- Update README to document the --algorithm flag in CLI usage examples.
- Add examples for HTTP queries with algorithm query parameter.
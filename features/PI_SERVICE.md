# PI Service

## Overview
Provide a unified π calculation service supporting both command-line interface (CLI) and HTTP API modes. Utilize the high-precision Chudnovsky algorithm for rapid convergence to an arbitrary number of decimal places. Expose consistent usage patterns, performance metrics, and resource monitoring across both modes.

## CLI Mode

- Command: `node src/lib/main.js pi`
- Flags:
  - `--mode <cli|http>`  (default: cli)
  - `--algorithm chudnovsky`  (required for precise computation)
  - `--digits <number>`  (positive integer, required)
- Output (stdout):
  - Algorithm name
  - Computed π value to the requested precision
  - Total execution time in milliseconds
  - Peak memory usage in bytes
- Error handling:
  - Reject missing or invalid flags with descriptive messages and exit code 1.

## HTTP API Mode

- When `--mode http` is specified, launch an Express server (default port 3000).
- Endpoints:
  - GET `/pi`
    - Query parameters:
      - `digits`: positive integer
      - `algorithm`: chudnovsky
    - Response (JSON):
      ```json
      {
        "digits": "<digits>",
        "value": "<π string>",
        "algorithm": "chudnovsky",
        "durationMs": <number>,
        "peakMemoryBytes": <number>
      }
      ```
  - POST `/pi`
    - JSON body:
      ```json
      {
        "digits": <number>,
        "algorithm": "chudnovsky"
      }
      ```
    - Response: same schema as GET `/pi`.
- HTTP error codes:
  - 400 for invalid input
  - 500 for server or algorithm errors

## Implementation Details

- Add dependency `decimal.js` for arbitrary-precision arithmetic.
- Create `src/lib/algorithms/chudnovsky.js` exporting `computePiChudnovsky(digits)` that returns `{ value: string, durationMs: number, peakMemoryBytes: number }`.
- Update `src/lib/main.js` to:
  - Parse `--mode`, `--algorithm`, and `--digits` flags.
  - Invoke `computePiChudnovsky` in CLI or HTTP mode.
  - Measure and report timing and memory usage using `process.memoryUsage()`.
- Add `express` to dependencies for HTTP API.

## Testing

- Update `tests/unit/main.test.js` to cover:
  - Correct flag parsing and error scenarios for CLI.
  - Invocation of `computePiChudnovsky` with mocks for performance metrics.
- Add `tests/unit/http.test.js` to validate:
  - GET and POST `/pi` endpoints for success and error cases.
  - JSON schema, status codes, and body content.

## Documentation

- Update `README.md`:
  - Document CLI usage with examples.
  - Document HTTP API endpoints with sample `curl` commands.
  - Add reference to `computePiChudnovsky` in API documentation.
- Ensure `package.json` scripts include:
  - `serve` alias to start HTTP mode.

## Performance and Benchmarking

- Include optional `--benchmark` flag to output computation throughput and convergence rate.
- Log metrics in CI reports where applicable.

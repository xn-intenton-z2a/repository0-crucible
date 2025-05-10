# Operation Timeout Feature

## Overview

Enable users to guard against runaway operations by specifying a maximum execution duration for any CLI command or HTTP-bound task. When the specified timeout elapses, the operation is aborted gracefully with a clear error message.

## Functional Requirements

- Update the CLI parser in `src/lib/main.js` to accept a new flag `--timeout <ms>` parsed as an integer ≥ 1. Reject invalid values with a descriptive error and exit code 1.
- Before dispatching any operation, if `timeout` is provided:
  - Create an AbortController instance and start a timer using `setTimeout` that calls `controller.abort()` after the specified milliseconds.
  - Pass `controller.signal` into all core functions and workflows:
    - `calculatePi` and `calculatePiParallel`
    - `benchmarkPi`
    - `visualizePiDigits` and `visualizePiDigitsText`
    - `visualizePiConvergence` and `visualizePiConvergenceText`
    - `exportPi`
    - `searchPi`
    - `extractPiHex` and `extractPiDecimal`
    - `startHttpServer` for HTTP requests
  - Wrap each function invocation in a `Promise.race` between the normal operation and a promise that rejects when `signal.aborted` with an `OperationTimedOutError`.
- On abort:
  - Clear the timeout timer to prevent leaks.
  - Print an error message “Operation timed out after <timeout> ms” to stderr.
  - Exit the process with a non-zero status code.
- On successful completion before timeout, clear the timer and proceed normally.

## CLI Interface

- New flag:
  --timeout <ms>    Maximum execution time in milliseconds (integer ≥ 1). Unlimited by default.
- Validation:
  - Non-integer or less than 1 should produce a descriptive parser error and exit code 1.
- Example usages:
  node src/lib/main.js --digits 10000 --timeout 5000
  node src/lib/main.js --benchmark --min-digits 100 --max-digits 500 --timeout 10000
  node src/lib/main.js --serve --port 8080 --timeout 15000

## Dependencies

- Use the built-in `AbortController`, `setTimeout`, and `clearTimeout` from Node.js. No external dependencies required.

## Testing

- Unit tests (`tests/unit/main.test.js`):
  - Stub a long-running operation (e.g., a promise that never resolves) and verify that supplying a small `--timeout` causes the CLI to abort, print the timeout error message, and exit with a non-zero status.
  - Test that missing or invalid `--timeout` values are rejected by the parser.
- CLI integration tests (`tests/e2e/cli.test.js`):
  - Invoke the CLI with a slow command (such as `--benchmark` over a large range) and `--timeout 1`, and assert immediate exit with the timeout message.
  - Confirm that commands complete normally when `--timeout` is not set or set to a sufficiently large value.
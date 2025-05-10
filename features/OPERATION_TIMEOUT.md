# Operation Timeout Feature

## Overview

Enable users to specify a maximum execution time for any CLI operation to prevent runaway computations. When a timeout is reached, the operation is aborted gracefully with a descriptive error.

## Functional Requirements

- Update the `main` function in `src/lib/main.js` to accept an optional `--timeout <ms>` flag parsed as a positive integer greater than zero.
- When `timeout` is provided:
  - Instantiate an `AbortController` and schedule a `setTimeout` to call `controller.abort()` after the specified milliseconds.
  - Pass `controller.signal` into all dispatched operations: `calculatePi`, `calculatePiParallel`, `benchmarkPi`, `visualizePiDigits`, `visualizePiConvergence`, `exportPi`, `searchPi`, `extractPiHex`, `extractPiDecimal`, and `startHttpServer` for HTTP-bound operations.
  - Wrap each operation call in a `Promise.race` between the actual operation and a promise that rejects when `signal.aborted` with an `OperationTimedOutError`.
  - On abort, clear the timer, print an error message “Operation timed out after <timeout> ms”, and exit with a non-zero status.
  - On successful completion before timeout, clear the timer to avoid leaks.

## CLI Interface

- Add a new flag:
  --timeout <ms>   Maximum execution time in milliseconds (integer > 0). Unlimited by default.
- Usage examples:
  node src/lib/main.js --digits 100000 --algorithm chudnovsky --timeout 5000
  node src/lib/main.js --benchmark --min-digits 100 --max-digits 1000 --timeout 10000
- If `--timeout` value is invalid (non-integer, less than 1), display a descriptive error and exit with non-zero code.

## Dependencies

- Leverage built-in `AbortController`, `setTimeout`, and `clearTimeout` from Node.js; no new external dependencies required.

## Testing

- Unit tests in `tests/unit/main.test.js`:
  - Simulate a stubbed long-running operation (e.g., a promise that resolves after a delay) and verify that supplying a low `--timeout` causes the CLI to abort, print the timeout message, and exit with non-zero code.
  - Validate that missing or invalid timeout values are rejected by the parser.
- CLI integration tests in `tests/e2e/cli.test.js`:
  - Invoke the CLI with a deliberately slow command (e.g., benchmarking many digits) and `--timeout 1` and assert that the process exits quickly with the timeout error message.
  - Confirm that operations complete normally when no timeout is set or when it is sufficiently large.
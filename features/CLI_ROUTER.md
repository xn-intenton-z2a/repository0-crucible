# Overview
Extend the existing command-line router to support operation timeouts via AbortController, enabling users to specify a maximum execution time for long-running π computations and related tasks.

# Functional Requirements

- Update the zod schema in src/lib/main.js to include an optional timeout flag:
  - timeout: positive integer (milliseconds), minimum 1, optional (default unlimited).
- In the main entry point:
  - If timeout is provided, create an AbortController and start a timer that calls controller.abort() after the specified duration.
  - Pass controller.signal into each dispatched operation: calculatePi, calculatePiParallel, benchmarkPi, visualizePiDigits, visualizePiConvergence, exportPi, searchPi, extractPiHex, extractPiDecimal, and startHttpServer.
  - Wrap each operation call in a Promise.race between the operation and a promise that rejects when signal.aborted with an OperationTimedOutError.
  - On abort, cancel the timer, print an error message "Operation timed out after <timeout> ms", and exit with non-zero code.
  - On successful completion, clear the timeout timer to prevent leaks.
- Ensure existing dispatch logic, help output, and error handling remain intact.

# CLI Interface

- Add flag --timeout <ms> to src/lib/main.js help output and zod schema.
- Example usages:
  node src/lib/main.js --digits 100000 --algorithm chudnovsky --timeout 5000
  node src/lib/main.js --benchmark --min-digits 100 --max-digits 1000 --timeout 10000

# Dependencies

- Use built-in AbortController and setTimeout/clearTimeout; no new dependencies required.

# Testing

- Unit tests in tests/unit/main.test.js:
  - Simulate a long-running stubbed operation and verify that using --timeout aborts execution, prints the timeout error, and exits with non-zero code.
  - Verify correct zod validation rejects negative, zero, or non-integer timeout values.
  - Confirm normal operation when timeout is omitted or set sufficiently large.
- CLI integration tests in tests/e2e/cli.test.js:
  - Invoke CLI with a low timeout against a deliberately slow calculation and assert timeout behavior.
  - Confirm that without --timeout or with ample timeout, commands complete successfully.
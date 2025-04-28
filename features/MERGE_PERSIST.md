# Description

Add support to persist enhanced ontology snapshots with timestamped filenames for historical tracking and downstream reuse, enabling users to retain versions of the combined enhanced ontology document.

# CLI Support

- Add `--merge-persist` flag to main CLI:
  1. When `--merge-persist` is passed, invoke `mergePersist()` with default or provided directories.
  2. Stream each persisted snapshot log line to console via `console.log`.
  3. Exit without throwing errors, printing final summary of snapshot file and node count.
  4. Support optional positional args: `[dataDir] [intermediateDir] [persistenceDir]` mapped to mergePersist parameters.

# HTTP Server Endpoints

- GET `/merge-persist`
  1. Respond with HTTP 200 and content-type `text/plain`.
  2. Override `console.log` to stream each persisted message from `mergePersist()` to the response.
  3. Restore original `console.log` and end response after completion.
  4. On error respond with HTTP 500 and plain-text error message.

# Testing

- Unit tests for CLI:
  • Spy on `mergePersist` and invoke `main(["--merge-persist"])` and with custom paths to verify correct arguments.
  • Mock `console.log` to capture snapshot log lines and summary format.
- HTTP integration tests:
  • Start server via `main(["--serve"])`, issue GET `/merge-persist`.
  • Assert status 200, content-type `text/plain`, and body contains persisted filename and count.
  • Simulate `mergePersist` throwing to assert status 500 and error message.

# Documentation Updates

- Update `getHelpText()` to list the `--merge-persist` flag with description and usage.
- Update `docs/FEATURES.md`, `docs/USAGE.md`, and `README.md` under Ontology Management to describe the `--merge-persist` CLI flag and HTTP `/merge-persist` endpoint with examples.
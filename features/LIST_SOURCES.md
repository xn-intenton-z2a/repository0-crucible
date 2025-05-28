# Summary
Provide a CLI flag `--list-sources` and programmatic API `getSupportedDataSources()` to expose the list of supported public data source URLs.

# Functional Requirements
- In `src/lib/main.js`:
  - Export `getSupportedDataSources(): string[]` returning the in-memory array of source URLs.
  - Detect the `--list-sources` flag in `main(args)`:
    1. When present, print `JSON.stringify(getSupportedDataSources(), null, 2)` to stdout.
    2. Exit the process with code `0` immediately.
  - Preserve all other CLI flags and default behavior.

# Testing
- In `tests/unit/main.test.js`:
  - Unit test that `getSupportedDataSources()` returns the expected array.
  - CLI integration test:
    1. Simulate `main(["--list-sources"])`, spy on `console.log` and `process.exit`.
    2. Assert the printed JSON equals the array and exit code is `0`.

# Documentation
- Update `README.md`:
  - Under **Features**, add **List Sources** section with a brief summary.
  - Under **Usage**, show how to run `node src/lib/main.js --list-sources` and sample output.
- Create or update `docs/LIST_SOURCES.md` with the same examples and API reference.
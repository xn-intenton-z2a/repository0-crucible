# PI JSON Output Feature

## Overview
Enable the CLI tool to emit the computed value of π in a machine-readable JSON format. This facilitates integration in shell scripts and other automation without manual parsing of plain-text output.

## Functional Requirements

- Extend the `main` function in `src/lib/main.js` to accept a new boolean flag `--json`.
- When `--json` is provided:
  - Compute π using existing logic (`calculatePi` or `calculatePiParallel`).
  - Format the result as a JSON object with a single key `pi` whose value is the π string, for example:
    ```json
    { "pi": "3.1415926535" }
    ```
  - Print this JSON string to stdout followed by a newline.
- If `--json` is not provided, existing plain-text output behavior must remain unchanged.
- Validation:
  - The `--json` flag may be combined with `--digits`, `--algorithm`, and `--threads` but must not be used with `--serve` or any other mode flags that do not emit π directly. If combined with `--serve`, print a descriptive error and exit with a non-zero code.

## CLI Interface

- Add flag:
  - `--json` (boolean) to enable JSON output mode.
- Usage examples:
  - `node src/lib/main.js --digits 10 --algorithm machin --json`
  - `node src/lib/main.js --digits 5 --json` (defaults algorithm to machin)

## Dependencies

- No new external dependencies required; reuse built-in APIs and existing code.

## Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Spawn the CLI with `--digits 4 --algorithm machin --json` and assert stdout is exactly `{"pi":"3.1415"}\n` and exit code `0`.
  - Verify that without `--json`, the CLI prints the plain π string and not JSON.
  - Test invalid combinations, e.g., `--serve --json`, to confirm descriptive error on stderr and non-zero exit.
- **Integration Tests** in `tests/e2e/cli.test.js`:
  - Invoke `node src/lib/main.js --digits 3 --json` and assert output is valid JSON with key `pi` and correct value.
  - Confirm the CLI exit code is `0` when `--json` is used correctly and non-zero when misused.


# PI JSON Output Feature

## Overview

Enable users to obtain the computed value of π in a machine-readable JSON format directly from the CLI. This supports integration into scripts and automated pipelines without manual parsing of standard output.

## Functional Requirements

- Extend the `main` function in `src/lib/main.js` to accept a new boolean flag `--json`.  
- When `--json` is provided:
  - After computing π via `calculatePi` or `calculatePiParallel`, format the result as an object `{ pi: "<digits>" }`.  
  - Print the JSON string to stdout followed by a newline.  
- When `--json` is not provided, retain existing behavior of printing the plain π string.  
- Prevent incompatible flag combinations:  
  - If `--json` is combined with `--serve`, `--script`, or any mode that does not emit π directly, exit with a descriptive error message and non-zero status code.

## CLI Interface

- New flag:
  --json           Output π as JSON with key `pi` instead of plain text
- Usage examples:
  node src/lib/main.js --digits 10 --algorithm machin --json
  node src/lib/main.js --digits 5 --json

## Implementation Details

- In `src/lib/main.js`, update argument parsing loop to detect `--json`.  
- Pass a boolean `json` option into the computation branch.  
- After obtaining `piValue`, use `JSON.stringify({ pi: piValue })` when `json === true`.  
- Respect the `digits` and `algorithm` flags as before when emitting JSON.  
- Ensure process.exit codes:  
  - `0` on success,  
  - Non-zero on validation errors or incompatible flag usage.

## Testing

### Unit Tests (`tests/unit/main.test.js`)

- Test that invoking the CLI logic with `--digits 4 --algorithm machin --json` yields stdout exactly `{ "pi":"3.1415" }\n` and exit code `0`.
- Verify that without `--json`, output remains the plain π string.
- Confirm that combining `--json` with `--serve` or unsupported modes triggers an error and exit code non-zero.

### Integration Tests (`tests/e2e/cli.test.js`)

- Spawn the CLI with `--digits 3 --json` and assert valid JSON output with key `pi` and correct value.
- Confirm exit code `0` on successful JSON output.
- Test that `node src/lib/main.js --serve --json` results in an error exit and descriptive message.

## Documentation Updates

- Update `README.md` under Features to describe the `--json` flag and show usage examples.
- Add a section in README demonstrating JSON output and how to integrate in shell scripts.
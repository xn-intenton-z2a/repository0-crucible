# DIAGNOSTICS Feature Update

## Overview
This update refines the diagnostics functionality by adding a new flag `--diagnostics-json` which outputs the diagnostic information as structured JSON. In addition to the existing human-readable output via `--diagnostics`, the JSON output is intended for integration with monitoring tools and automated systems.

## Implementation Details
- **CLI Integration:**
  - In `src/lib/main.js`, update the CLI flag handling to check for the `--diagnostics-json` flag. If present, call a new function `diagnosticsJson` to collect diagnostic data (currently Node.js version and other environment data) and output it using `JSON.stringify`.
  - Ensure that when neither `--diagnostics` nor `--diagnostics-json` is passed, the default behavior remains unchanged.

- **JSON Output:**
  - Implement the function `diagnosticsJson` in the same source file. This function should collect the same data as the `diagnostics` function but output it in JSON format. It should include error handling for JSON serialization errors, logging a clear error message if serialization fails.

- **Testing:**
  - Update the unit tests in `tests/unit/main.test.js` to add tests for the `--diagnostics-json` flag. These tests should verify that the output is valid JSON and contains key fields (such as the Node.js version).

- **Documentation:**
  - Update the README.md with a new section describing the `--diagnostics-json` option, including usage examples.
  - Update CONTRIBUTING.md if necessary to reflect the enhanced diagnostics functionality.

## Future Considerations
- Expand the diagnostic information provided (e.g., additional system metrics) and make the JSON output configurable via command-line options.

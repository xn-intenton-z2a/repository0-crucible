# DIAGNOSTICS Feature Update

## Overview
This update refines the diagnostics functionality by introducing a new flag `--diagnostics-json` that outputs diagnostic data in a structured JSON format. The feature now supports both human-friendly output via `--diagnostics` and machine-readable JSON output via `--diagnostics-json` for enhanced integration with monitoring tools and automated systems.

## Implementation Details
- **CLI Integration:**
  - In `src/lib/main.js`, extend the CLI parser to check for the `--diagnostics-json` flag. When detected, call a new function (e.g., `diagnosticsJson`) to gather the same diagnostic data as in the standard diagnostics but output it as JSON.
  - Ensure that if neither `--diagnostics` nor `--diagnostics-json` is specified, the existing behavior remains unchanged.

- **JSON Output:**
  - Implement a function `diagnosticsJson` that collects system information (such as Node.js version, environment variables, etc.), and serialize the output using `JSON.stringify`.
  - Include robust error handling to catch and report JSON serialization issues, outputting a clear error message when serialization fails.

- **Testing:**
  - Update the unit tests in `tests/unit/main.test.js` to include cases for the `--diagnostics-json` flag. The test should verify that the output is valid JSON and contains key fields, including the Node.js version.
  - Maintain tests for the original `--diagnostics` flag to ensure backward compatibility.

- **Documentation:**
  - Update the README.md file with usage examples for the new `--diagnostics-json` flag, explaining its purpose, output format, and use cases for automated monitoring.
  - Modify the CONTRIBUTING.md if necessary, to reflect the changes in the diagnostics functionality.

## Future Considerations
- Expand the range of diagnostic information provided in JSON format, including additional system metrics and configuration details.
- Consider adding configuration options to allow users to select specific diagnostic fields for the JSON output.
# DIAGNOSTICS Feature Update

## Overview
This update extends the existing diagnostics functionality by adding a new flag `--diagnostics-json` to output diagnostic information in a structured JSON format. The diagnostic output includes system information, Node.js version, and any other runtime data gathered by the tool. It enhances usability for developers and automated monitoring systems by providing machine-readable output while maintaining the existing human-friendly format for the standard `--diagnostics` flag.

## Implementation Details
- **CLI Integration:**
  - Update the CLI parser in `src/lib/main.js` to recognize the new `--diagnostics-json` flag. When detected, the tool should call a new or extended function (e.g., `diagnosticsJson`) to gather the same diagnostic data as with `--diagnostics` but serialize it as JSON.
  - Maintain the current behavior for the `--diagnostics` flag to output diagnostics in a human-friendly format.

- **JSON Output:**
  - The JSON output should include the Node.js version, environment variables, and any other diagnostic information available.
  - Implement error handling to catch JSON serialization issues. In the event of an error, output a clear error message explaining the failure.

- **Testing:**
  - Extend the unit tests in `tests/unit/main.test.js` to include tests for the new `--diagnostics-json` flag. This includes verifying that the output is valid JSON and contains required fields such as the Node.js version.
  - Ensure backwards compatibility by retaining tests for the existing `--diagnostics` flag.

- **Documentation:**
  - Update the README file to include usage examples for the `--diagnostics-json` flag, explaining its purpose, expected output, and potential use cases for integration with other tools.
  - Update any relevant sections in CONTRIBUTING.md to reflect the changes in diagnostics functionality.

## Future Considerations
- Explore extending the diagnostics data to include more detailed system metrics.
- Consider adding configuration options to selectively include diagnostic fields in the JSON output.

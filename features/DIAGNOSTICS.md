# DIAGNOSTICS Feature Update

## Overview
This update enhances the diagnostics functionality of the CLI tool by introducing a new JSON output mode. In addition to the human-readable output currently provided via the `--diagnostics` flag, users can now invoke the diagnostics in a structured JSON format using the `--diagnostics-json` flag. This mode is intended for integration with automated monitoring systems and tooling, providing detailed system metrics in a machine-readable format.

## Implementation Details
- **CLI Argument Parsing:**
  - Modify the argument parser in `src/lib/main.js` to detect the `--diagnostics-json` flag.
  - If the `--diagnostics-json` flag is present, bypass the default diagnostics function and call the new function `diagnosticsJson`.

- **JSON Diagnostics Function:**
  - Implement a new function `diagnosticsJson` in `src/lib/main.js` that gathers the following system diagnostics:
    - Node.js version
    - Process uptime
    - Memory usage (using `process.memoryUsage()`)
  - Use `JSON.stringify` to format the output as a JSON string.
  - Include error handling to catch and log JSON serialization issues with clear error messages.

- **Testing:**
  - Update tests in `tests/unit/main.test.js` to include a test case that verifies the JSON output when the `--diagnostics-json` flag is used.
  - Ensure that the returned JSON contains required keys such as `nodeVersion`, `uptime`, and `memoryUsage`.

- **Documentation:**
  - Update `README.md` to add a section describing the `--diagnostics-json` flag with usage examples.
  - Ensure that `CONTRIBUTING.md` is updated with guidelines for extending diagnostics functionality.

## Future Considerations
- Allow further customization of which metrics are reported by accepting additional CLI options.
- Optimize performance for future expansion of diagnostics data collection if more metrics are added.

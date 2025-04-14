# DIAGNOSTICS Feature Update with JSON Output

## Overview
This update enhances the diagnostics functionality of the CLI tool by adding support for a new flag `--diagnostics-json`. In addition to the existing human-readable diagnostics output from the `--diagnostics` flag, the new JSON output mode will provide structured diagnostic information suitable for automated monitoring and integration into external systems.

## Implementation Details
- **CLI Integration:**
  - Update the command line argument parsing in `src/lib/main.js` to detect the new `--diagnostics-json` flag.
  - When this flag is present, bypass the default diagnostics function and invoke a new function, `diagnosticsJson`.

- **JSON Diagnostics Function:**
  - Implement a function `diagnosticsJson` in `src/lib/main.js` that collects the same diagnostic information provided by the human-readable diagnostics (e.g. Node.js version) and additional runtime data if available (memory usage, uptime, etc.).
  - Use `JSON.stringify` to serialize the diagnostic information and output it. Include error handling for JSON serialization errors, ensuring that any failure is logged with a clear and descriptive error message.

- **Testing:**
  - Update the unit tests in `tests/unit/main.test.js`:
    - Add tests to verify that when the `--diagnostics-json` flag is used, the output is valid JSON.
    - Check that the JSON output contains key fields such as `nodeVersion` (and other relevant details if added).

- **Documentation:**
  - Update `README.md` to include a new section that describes the `--diagnostics-json` option, providing examples of how to use it and explanations of the returned JSON structure.
  - Update `CONTRIBUTING.md` if necessary to reflect the enhancements to diagnostics functionality.

## Future Considerations
- Enhance the diagnostic output by including additional system metrics and making the set of diagnostics configurable via further command line options.
- Consider performance optimizations if the diagnostic data collection becomes computationally expensive.

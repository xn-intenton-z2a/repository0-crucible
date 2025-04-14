# JSON_OUTPUT Enhancement

## Overview
This enhancement extends the JSON output capabilities of the CLI tool by integrating structured JSON output for diagnostics. In addition to the existing `--json` flag for query commands, the diagnostics command will now support a new `--diagnostics-json` flag. When used, the diagnostics command will output key system metrics in JSON format, including the Node.js version, uptime, and memory usage. This update provides a consistent programmatic interface for both query and diagnostics outputs.

## Implementation Details
- **Source Code Updates**:
  - Update the `diagnostics` function in `src/lib/main.js` to detect the `--diagnostics-json` flag.
  - When the flag is present, bypass the plain-text output and instead output a JSON object containing:
    - `nodeVersion`: Taken from `process.version`.
    - `uptime`: Taken from `process.uptime()`.
    - `memoryUsage`: Taken from `process.memoryUsage()`.
  - Ensure that if the flag is not provided, the original plain-text diagnostics output remains unchanged.

- **Testing Enhancements**:
  - Update `tests/unit/main.test.js` to add test cases for the new `--diagnostics-json` flag.
  - Validate that when the flag is provided, the output is valid JSON and includes the keys: `nodeVersion`, `uptime`, and `memoryUsage`.

- **Documentation Updates**:
  - Revise `README.md` to include usage examples for the `--diagnostics-json` flag.
  - Update `CONTRIBUTING.md` with guidelines on adding tests and debugging JSON outputs for diagnostics.

## Future Considerations
- Consider enhancing the diagnostics JSON further with additional metrics such as CPU usage or load averages.
- Provide configuration options to toggle between summary and detailed diagnostics output.
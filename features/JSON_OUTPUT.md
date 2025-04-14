# JSON_OUTPUT Enhancement

## Overview
This feature extends the existing JSON output capabilities to cover the diagnostics command. In addition to supporting JSON output for queries via the `--json` flag, the CLI tool will now support a new `--diagnostics-json` flag. When provided, the diagnostics command will output key system metrics in a structured JSON format, enhancing programmatic interaction and integration.

## Implementation Details
- **Source Code Updates:**
  - Modify the `diagnostics` function in `src/lib/main.js` to detect the `--diagnostics-json` flag.
  - When the flag is present, bypass the plain-text output and instead output a JSON object containing:
    - `nodeVersion`: from `process.version`.
    - `uptime`: from `process.uptime()`.
    - `memoryUsage`: from `process.memoryUsage()`.
  - Ensure that if the `--diagnostics-json` flag is not provided, the original diagnostics output remains unaffected.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to add test cases for the `--diagnostics-json` flag.
  - Validate that when the flag is provided, the output is a valid JSON object with keys: `nodeVersion`, `uptime`, and `memoryUsage`.

- **Documentation Updates:**
  - Revise `README.md` to include usage examples for the `--diagnostics-json` flag.
  - Update any relevant sections in `CONTRIBUTING.md` to guide contributors on adding tests and debugging JSON outputs.

## Future Considerations
- Consider enhancing the diagnostics JSON output by including additional system metrics like CPU usage or load averages.
- Extend configuration options to allow users to choose between summary and detailed diagnostics in future iterations.
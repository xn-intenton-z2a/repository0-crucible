# JSON_OUTPUT Enhancement

## Overview
This enhancement refines the JSON output capabilities of the CLI tool. In addition to the existing `--json` flag used by the query command, the diagnostics command will now support a new `--diagnostics-json` flag. When this flag is used, the diagnostics command will output key system metrics in JSON format including the Node.js version, uptime, and memory usage. This change provides a more consistent and informative programmatic interface for both querying data and obtaining system diagnostics.

## Implementation Details
- **Source Code Updates:**
  - In the `diagnostics` function (in `src/lib/main.js`), check for the presence of the `--diagnostics-json` flag.
  - If `--diagnostics-json` is provided, bypass the default plain-text diagnostics output. Instead, output a JSON object with the following keys:
    - `nodeVersion`: value from `process.version`.
    - `uptime`: value from `process.uptime()`.
    - `memoryUsage`: value from `process.memoryUsage()`.
  - Maintain the existing behavior for the `--json` flag in query commands, ensuring backward compatibility.

- **Testing Enhancements:**
  - Update unit tests in `tests/unit/main.test.js` to add test cases for the new `--diagnostics-json` flag. Verify that when this flag is provided along with `--diagnostics`, the output JSON includes the keys `nodeVersion`, `uptime`, and `memoryUsage`.

- **Documentation Updates:**
  - Revise the `README.md` to document the new usage of the `--diagnostics-json` flag with examples. For instance:
    ```bash
    node src/lib/main.js --diagnostics --diagnostics-json
    ```
  - Update `CONTRIBUTING.md` with guidelines on writing and debugging JSON outputs for diagnostics, ensuring contributors know how to add new tests for this functionality.

## Future Considerations
- Consider adding additional metrics (e.g., CPU usage or load averages) as part of the diagnostics JSON output in future iterations.
- Optionally provide configuration options to toggle between summary and detailed diagnostics output.

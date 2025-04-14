# JSON_OUTPUT Enhancement Update

## Overview
This update refines the JSON output capabilities for the diagnostics command. While the query command already supports the `--json` flag, the diagnostics command will now exclusively support a new `--diagnostics-json` flag for structured JSON output. This change improves consistency and clear separation between query and diagnostics JSON outputs.

## Implementation Details
- **Source Code Updates:**
  - In `src/lib/main.js`, modify the `diagnostics` function to check for the presence of the `--diagnostics-json` flag instead of `--json`. When `--diagnostics-json` is provided, output a JSON object including keys:
    - `nodeVersion`: value from `process.version`
    - `platform`: value from `process.platform`
    - `memoryUsage`: value from `process.memoryUsage()`
  - Maintain the plain-text output when the flag is not provided.

- **Testing Enhancements:**
  - In `tests/unit/main.test.js`, update the diagnostics tests to use the new flag `--diagnostics-json` when expecting JSON output. For example, change calls from `diagnostics(["--diagnostics", "--json"])` to `diagnostics(["--diagnostics", "--diagnostics-json"])` and update expected outputs accordingly.

- **Documentation Updates:**
  - In `README.md`, update the usage examples in the Diagnostics section to reflect the new flag:
    ```bash
    node src/lib/main.js --diagnostics --diagnostics-json
    ```
  - Update explanatory text in both the README and `CONTRIBUTING.md` to note that the diagnostics JSON output is now triggered exclusively by `--diagnostics-json`.

## Future Considerations
- Consider maintaining backward compatibility by optionally supporting both flags for a transitional period, if necessary.
- Monitor user feedback and adjust the output format or additional diagnostic metrics as requested.

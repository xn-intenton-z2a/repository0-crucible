# JSON_OUTPUT Enhancement

## Overview
This enhancement extends the existing JSON_OUTPUT feature to fully support structured JSON responses across both query and diagnostics commands. In addition to the already implemented `--query-json` flag, the CLI tool will now detect a new `--diagnostics-json` flag. When provided, the diagnostics command will output key system information as a JSON object rather than plain text.

## Implementation Details
- **CLI Argument Parsing:**
  - Update `src/lib/main.js` to detect the new `--diagnostics-json` flag for the diagnostics command.
  - When `--diagnostics-json` is present, bypass the standard plain-text output and instead invoke a branch that gathers system details (e.g., Node.js version, process uptime, memory usage) and prints them as a structured JSON object.

- **Source Code Changes:**
  - In the `diagnostics` function, add a check for `--diagnostics-json` and, if found, build an object (e.g., `{ nodeVersion, uptime, memoryUsage }`) and output it using `JSON.stringify` with appropriate formatting.
  - Retain the existing behavior when the JSON flag is not present.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to include new test cases that simulate the `--diagnostics-json` flag. For example, validate that the JSON output contains keys such as `nodeVersion`, `uptime`, and `memoryUsage`.
  - Ensure that traditional diagnostic output remains unchanged when the flag is not provided.

- **Documentation Updates:**
  - Revise `README.md` to document the new `--diagnostics-json` flag alongside `--query-json`, including usage examples.
  - Update `CONTRIBUTING.md` with guidelines on testing JSON output across different commands and adding further system metrics if needed.

## Future Considerations
- Expand the JSON schema to include additional system diagnostics such as CPU usage or custom environment variables.
- Provide configuration options allowing users to select between detailed and summary JSON diagnostics in future iterations.
- Ensure that both human-readable and JSON modes are thoroughly tested to maintain backward compatibility.
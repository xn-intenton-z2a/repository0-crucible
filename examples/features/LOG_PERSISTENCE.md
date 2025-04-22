# LOG_PERSISTENCE

## Overview
This feature enhances the existing memory logging capability by persisting CLI execution logs to disk. When the CLI tool is executed with the `--persist-log` flag, the tool will check for an environment variable (e.g., `PERSIST_LOG_FILE`) that specifies a file path. If set, the tool writes the JSON formatted memory log to that file instead of (or in addition to) printing it to the console. This ensures a durable record of executions, which is useful for diagnostics, historical analysis, and further automation workflows.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Modify the `--persist-log` block to detect if the environment variable `PERSIST_LOG_FILE` is set.
  - If set, import Node's `fs` module and write the JSON-stringified memory log into the specified file using an asynchronous or synchronous file write method. Use proper error handling (try/catch) so that failures in writing do not crash the CLI.
  - Maintain the existing behavior (printing to console) as a fallback if the environment variable is not provided.

- **Test File Update (tests/unit/main.test.js):**
  - Extend tests to simulate both scenarios: when `PERSIST_LOG_FILE` is set and when it is not.
  - When set, verify that a confirmation message (or detectable file write behavior) occurs. This can be done by mocking the file system module methods (`fs.writeFileSync` or similar) to ensure they are called with the expected parameters.
  - When not set, ensure that the output remains the JSON string written to the console as before.

- **README Update (README.md):**
  - Update the usage documentation to include the new log persistence functionality. Explain that users can persist their in-memory logs by setting the environment variable `PERSIST_LOG_FILE` to the desired file path.
  - Provide an example command:
    ```bash
    PERSIST_LOG_FILE=./persisted_log.json node src/lib/main.js --persist-log
    ```
  - Mention that if the variable is not set, the log will simply be printed to the console.

- **Dependencies File Update (package.json):**
  - No new dependencies are required since the implementation uses Node.js's built-in `fs` module.

## Testing & Compatibility
- Run `npm test` to ensure all test cases pass. Check that both the console output and file writing behavior are correct under different environment settings.
- Ensure that the default behavior is preserved for users who do not require log persistence.

## Future Considerations
- Enhance the feature with log rotation and archiving capabilities, ensuring that logs do not grow indefinitely.
- Introduce configurable log formats (e.g., CSV, XML) for integration with external logging systems.
- Provide more granular error reporting if the log file write operation fails.

## Alignment with Mission
By allowing persistent logs, the agentic system gains a reliable historical record of its operations. This persistence supports self-improvement and diagnostic capabilities by enabling cross-run analysis. It lays the groundwork for eventual enhancements, such as automated log-based alerting and performance trending over time.
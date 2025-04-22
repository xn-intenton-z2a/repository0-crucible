# TIMESTAMP_OUTPUT

## Overview
This feature adds a timestamp to the log outputs when the CLI is executed with the `--timestamp` flag. When enabled, each console log message in the CLI tool will be prefixed with the current date and time in ISO format. This enhancement improves debugging and log aggregation by providing clear temporal context for each log message, complementing existing features like TIME_LOG and VERBOSE_OUTPUT.

## Implementation Details
### Source File Update (src/lib/main.js):
- Detect the presence of the `--timestamp` flag in the command-line arguments.
- Create a helper function (e.g., `logWithTimestamp(message)`) that retrieves the current time (using `new Date().toISOString()`) and logs the message prefixed by the timestamp.
- Update the logging calls so that if the `--timestamp` flag is provided, both the initial message (e.g., `Run with: ...`) and the execution time log are output using the timestamp format. For example, output:
  ```
  2025-04-20T21:00:00Z - Run with: ["--timestamp", "otherFlag"]
  2025-04-20T21:00:00Z - Execution time: 12.34 ms
  ```
- Ensure that when the flag is not provided, the log output remains unchanged.

### Test File Update (tests/unit/main.test.js):
- Add a new test case simulating CLI invocation with the `--timestamp` flag.
- Spy on `console.log` and verify that each logged output begins with a valid ISO 8601 timestamp (e.g., matches `/^\d{4}-\d{2}-\d{2}T.*Z - .+/`).
- Retain existing tests for other flag invocations to ensure backward compatibility.

### README Update (README.md):
- Update the usage instructions to include the new `--timestamp` flag. For example, add a section:
  ```bash
  node src/lib/main.js --timestamp
  ```
- Explain that when this flag is used, each log message is prefixed with the current timestamp for easier log tracking and debugging.

### Dependencies File Update (package.json):
- No additional dependency is required for this feature.

## Testing & Compatibility
- Run `npm test` to validate that the new test case for `--timestamp` flag passes, confirming that the output contains correctly formatted timestamps.
- Verify that when the flag is omitted, the CLI outputs remain identical to the default behavior.

## Long-Term Considerations
This enhancement lays the groundwork for more advanced logging capabilities, such as configurable log levels and potential integration with logging frameworks or external log aggregation systems in future iterations.
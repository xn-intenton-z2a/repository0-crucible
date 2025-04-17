# VERBOSE_MODE

## Overview
This feature introduces a `--verbose` CLI flag into the agent that enhances the output log by including additional context such as timestamps, session identifiers, and detailed command execution data. It is intended to help users and developers gain more insights into the internal workings and diagnostic data during runtime. The verbose mode will not alter the core functionality; rather, it enriches the output for improved traceability and debugging.

## Implementation Details
- **Flag Detection:**
  - In the main function (`src/lib/main.js`), add logic to detect the `--verbose` flag among the CLI arguments.
  - If detected, enable verbose mode that appends a timestamp, session ID, and additional diagnostic context to each output line (via wrapping or formatting of `console.log` messages).

- **Output Enhancements:**
  - Modify log outputs to include a prefixed timestamp (using `new Date().toISOString()`).
  - When logging command details, include the current session ID along with any diagnostic metrics (e.g., memory log size if applicable).
  - Ensure that verbose output is only activated when explicitly requested so that normal operations remain unchanged.

- **Integration with Existing Features:**
  - The verbose mode should complement existing features such as diagnostics, memory logging, and help-seeking. For example, when using `--diagnostics`, additional context (like verbose flags) can be appended.
  - Ensure that the implementation does not interfere with commands like `--merge-persist` or `--show-memory`.

## Testing
- **Unit Tests:**
  - Update the test file (`tests/unit/main.test.js`) to include scenarios where the `--verbose` flag is present.
  - Use spies on `console.log` to verify that output strings include the expected timestamp and session ID.
  - Include cases with and without the `--verbose` flag to confirm that verbose output is limited to when the flag is active.

## Documentation Updates
- **README.md:**
  - Add a usage section for the `--verbose` flag with an example:
    ```bash
    node src/lib/main.js --verbose
    ```
  - Explain that verbose mode provides enhanced output including timestamps and session details to assist with debugging and tracking execution flow.

## Long-Term Direction
Verbose mode lays the groundwork for future diagnostics capabilities. In subsequent iterations, it may be extended to include adjustable logging levels (e.g., INFO, DEBUG, ERROR) and integration with external logging services. This feature supports the broader mission of making the agent more self-aware and transparent, assisting in both troubleshooting and performance monitoring.

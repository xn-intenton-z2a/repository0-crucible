# DIAGNOSTICS

## Overview
This feature adds a diagnostics mode to the CLI tool. When the `--diagnostics` flag is provided, the CLI outputs detailed runtime and environment information. This includes process uptime, memory usage, Node.js version, and a summary of the in-memory log. The diagnostics mode provides users and developers with immediate insights into the health and performance of the CLI agent, facilitating debugging and monitoring.

## Implementation Details

### Source File Update (src/lib/main.js):
- **New Function Implementation:**
  - Add a helper function `handleDiagnostics()` that logs:
    - A header "Diagnostics Report:"
    - Process uptime (using `process.uptime()` formatted to two decimal places).
    - Memory usage details by converting values from `process.memoryUsage()` to megabytes (RSS, Heap Total, Heap Used).
    - Node.js version (from `process.version`).
    - Total number of CLI invocations from the in-memory `memoryLog`.
- **Integration in Main Logic:**
  - In the `main(args)` function, after processing other flags (e.g. `--persist-log`), check if `args` includes `--diagnostics`. If so, call `handleDiagnostics()` to output the diagnostics information.

### Test File Update (tests/unit/main.test.js):
- **New Test Suite for Diagnostics Mode:**
  - Add a new `describe` block for testing the `--diagnostics` flag.
  - Use spies on `console.log` to verify that diagnostics output contains key phrases such as "Diagnostics Report:", "Process uptime:", "Memory usage:" and "Node Version:".
  - Ensure that the diagnostics test does not interfere with other tests by resetting the in-memory log before each test.

### README Update (README.md):
- **Usage Documentation:**
  - Update the README file to document the new `--diagnostics` flag.
  - Provide an example command:
    ```bash
    node src/lib/main.js --diagnostics
    ```
  - Explain that this command outputs runtime diagnostics including uptime, memory usage, Node.js version, and the count of tracked CLI invocations.

## Dependencies File Update (package.json):
- **No Additional Dependencies Required:**
  - The implementation leverages Node.js built-in modules (e.g. `process`) and does not add any external dependencies.

## Testing & Compatibility
- Run `npm test` to verify that the diagnostics test case passes.
- Validate that when the `--diagnostics` flag is used, the CLI outputs the expected diagnostics information.

## Long-Term Considerations
- Future iterations may integrate more detailed performance metrics or extend diagnostics to include network and I/O statistics.
- The diagnostics feature lays the groundwork for enhanced system monitoring and self-improvement by feeding back runtime data into the agent’s decision-making process.
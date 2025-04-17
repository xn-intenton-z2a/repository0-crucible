# SELF_IMPROVEMENT

## Overview
This feature enhances the agent’s internal diagnostic capabilities by incorporating a diagnostics mode. When activated via the `--diagnostics` flag, the CLI tool will output runtime metrics such as command invocation counts and error counts. This enhancement not only provides immediate insight into the agent’s performance but also lays the groundwork for self-improvement by tracking operational health.

## Implementation Details
- **Global Counters:**
  - Introduce and initialize two global counters in the main source file (`src/lib/main.js`), for example `globalThis.callCount` and `globalThis.errorCount`.
  - Increment `globalThis.callCount` each time a command is processed.
  - Inside error handling blocks, increment `globalThis.errorCount` accordingly.

- **Diagnostics Flag Handling:**
  - In the `main` function, check the provided command line arguments for the `--diagnostics` flag.
  - If the flag is present, immediately output a diagnostic summary in the format:
    ```
    Self-Check: X commands executed, Y errors, environment OK
    ```
    and then exit without performing any further processing.

- **Source File Changes (`src/lib/main.js`):**
  - At the start of the `main` function, initialize `globalThis.callCount` and `globalThis.errorCount` if they are undefined.
  - Add a conditional branch to detect `--diagnostics` and output the current counts.
  - Ensure that normal processing (like memory logging) is skipped when diagnostics mode is active.

- **Test Enhancements (`tests/unit/main.test.js`):
  - Add new tests that simulate running the CLI with the `--diagnostics` flag.
  - Use spies on `console.log` to assert that the output message correctly displays the current call and error counts.
  - Ensure that when `--diagnostics` is provided, no additional processing (such as memory logging) occurs.

- **README Documentation Updates (`README.md`):
  - Update the Features and Usage sections to document the new `--diagnostics` flag.
  - Provide a usage example such as:
    ```bash
    node src/lib/main.js --diagnostics
    ```
  - Explain that diagnostics mode outputs internal runtime metrics for troubleshooting purposes.

## Tests
- Verify that when `--diagnostics` is provided, the CLI outputs a message like "Self-Check: X commands executed, Y errors, environment OK".
- Confirm that global counters are properly updated during normal command processing when diagnostics mode is not active.
- Ensure that the diagnostics flag bypasses other operations (like memory persistence and logging) to focus solely on outputting the metrics.

## Long-Term Direction
This diagnostics feature will serve as the foundation for more advanced self-improvement capabilities. In future iterations, the diagnostics data could be analyzed further to automatically adjust runtime behavior or optimize performance, and potentially feed into a more comprehensive self-improvement strategy.

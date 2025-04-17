# SELF_IMPROVEMENT

## Overview
This feature enhances the agent’s self-improvement capabilities by adding a diagnostics mode to the CLI. When activated via the `--diagnostics` flag, the agent will immediately output runtime metrics that include command counts and error counts. This diagnostics mode assists developers in quickly assessing the internal state of the agent and streamlines troubleshooting.

## Implementation Details
- **Global Diagnostics Counters:**
  - Initialize `globalThis.callCount` and `globalThis.errorCount` at the start of execution in the main source file (`src/lib/main.js`).
  - Increment `globalThis.callCount` each time a command is processed. In case of errors, increment `globalThis.errorCount` accordingly.

- **CLI Flag Handling:**
  - In the main function (`main(args)`), check for the `--diagnostics` flag among the command-line arguments.
  - If present, bypass the normal processing and print a diagnostic summary in the format:
    ```
    Self-Check: X commands executed, Y errors, environment OK
    ```
    where X is the value of `globalThis.callCount` and Y is the value of `globalThis.errorCount`.

- **Source File Changes (`src/lib/main.js`):**
  - Add initialization for `globalThis.callCount` and `globalThis.errorCount` if they are undefined.
  - Include a conditional branch to check for the `--diagnostics` flag and output the diagnostics summary immediately.

- **Test Enhancements (`tests/unit/main.test.js`):**
  - Add tests that simulate running the agent with the `--diagnostics` flag.
  - Capture the console output and verify that the expected diagnostic summary appears, reflecting the current command count and error count.

- **README Documentation Updates (`README.md`):
  - Update the Features section and Usage examples to document the new `--diagnostics` flag.
  - Provide a usage example such as:
    ```bash
    node src/lib/main.js --diagnostics
    ```
  - Explain that the diagnostics mode outputs internal runtime metrics to assist with troubleshooting.

- **Dependencies and Integration:**
  - No new dependencies are added. The update leverages the existing Node.js environment and libraries.
  - This enhancement remains within the current project’s scope by updating only the source, test, README, and dependencies file content.

## Long-Term Direction
In future iterations, the diagnostics data could be used to automatically adjust runtime strategies or feed into the agent’s self-improvement routines. Additionally, more in-depth metrics may be gathered to further enhance the agent's introspection and performance optimization capabilities.

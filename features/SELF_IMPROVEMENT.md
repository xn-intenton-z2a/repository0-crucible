# SELF_IMPROVEMENT

## Overview
Enhance the agent's self-improvement capabilities by adding a diagnostics mode. When running the CLI with the `--diagnostics` flag, the agent should output its runtime metrics including the total number of commands processed (`callCount`) and the number of errors encountered (`errorCount`). This mode bypasses the regular processing steps and provides a quick self-check, laying the foundation for future automated tuning and self-adaptation.

## Implementation Details
- **Global Counters:**
  - In `src/lib/main.js`, introduce two global counters: `globalThis.callCount` and `globalThis.errorCount`.
  - Initialize these counters at the very start of the `main()` function if they are not already defined.
  - Increment `globalThis.callCount` each time a command is processed.
  - In every error handling block, increment `globalThis.errorCount` appropriately.

- **Diagnostics Flag Handling:**
  - Update the CLI argument parsing to detect the `--diagnostics` flag.
  - When this flag is present, immediately output a summary in the format:
    ```
    Self-Check: X commands executed, Y errors, environment OK
    ```
    where X and Y represent the current values of `globalThis.callCount` and `globalThis.errorCount` respectively.
  - After outputting the diagnostics summary, skip all further execution and exit.

## Testing
- **Unit Tests:**
  - In `tests/unit/main.test.js`, add tests that simulate execution with the `--diagnostics` flag.
  - Use spies on `console.log` to assert that the correct diagnostics message is printed.
  - Confirm that when diagnostics mode is active, other functionalities (like memory logging) are bypassed.

## Documentation Updates
- **README.md:**
  - Update the usage section to document the `--diagnostics` flag.
  - Provide an example usage:
    ```bash
    node src/lib/main.js --diagnostics
    ```
  - Explain that this mode is intended for quick self-checks and performance diagnostics.

## Long-Term Direction
This enhancement is a stepping stone towards a more comprehensive self-improvement framework. In future iterations, the collected diagnostic data could drive automated adjustments in runtime behavior and contribute to broader performance tuning strategies.

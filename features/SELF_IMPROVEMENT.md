# SELF_IMPROVEMENT

## Overview
This update enhances the existing self-improvement feature by integrating a verbose logging mode. In addition to tracking error counts and execution timings, the agent will now support a `--verbose` flag. When activated, the CLI will provide detailed, step-by-step logging for debugging, including entry and exit logs of critical functions, detailed timing for each operation, and expanded error information with stack traces where applicable. This additional data will facilitate deeper insights during self-review and make it easier to diagnose issues in real time.

## Implementation Details
1. **Verbose Mode Activation:**
   - Update the source file (`src/lib/main.js`) to check if `--verbose` is present in the command-line arguments. If so, set a global flag (e.g. `globalThis.verboseMode = true`).
   - When verbose mode is enabled, wrap major operations with additional logging statements that output detailed progress information, including function entry/exit, internal state snapshots, and more granular timing metrics.

2. **Integration with Self-Improvement Metrics:**
   - Enhance the existing self-improvement tracking mechanism by including verbose logs in the performance report. Alongside `errorCount` and `avgExecutionTimeMS`, additional metrics (such as per-command execution breakdown) should be logged.
   - Modify the self-review command (triggered e.g. by `self_improve`) to optionally include verbose details if verbose mode was active during command execution.

3. **Source File Modification:**
   - In `src/lib/main.js`, add logic that intercepts the `--verbose` flag and stores its state in a global variable.
   - Modify all major logging calls so that when `globalThis.verboseMode` is true, they output additional diagnostic information.

## Tests
1. **Verbose Flag Test:**
   - Update the unit tests in `tests/unit/main.test.js` to simulate a CLI invocation with the `--verbose` flag.
   - Verify that upon running with `--verbose`, additional log outputs (e.g., detailed start and end messages for each operation) are produced.

2. **Self-Review Report Test:**
   - Execute the self-review command with verbose mode enabled and check that the returned report object includes the additional verbose metrics, confirming that extra diagnostic data is registered.

## Documentation
1. **README Update:**
   - In README.md, update the **CLI Options** section to include a bullet point for **Verbose Logging**:
     - **Verbose Logging:**
       ```bash
       node src/lib/main.js --verbose
       ```
       When this flag is used, the agent outputs detailed logs, including step-by-step diagnostic information, which is integrated with the self-improvement performance metrics.

2. **Long-Term Direction:**
   - This enhancement not only improves immediate observability and debugging but also lays the groundwork for more sophisticated self-analysis. Future iterations may use the verbose logs as a basis for automated adjustments or proactive improvements based on in-depth runtime diagnostics.

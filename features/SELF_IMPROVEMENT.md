# SELF_IMPROVEMENT

## Overview
This feature enhances the agent’s ability to monitor its own performance by tracking error counts and execution timing. It builds on the existing `--self-refine` CLI flag and expands its utility by logging these metrics in the global state. The agent will also support a self-review command (e.g. `self_improve`) that outputs a detailed performance report to help guide adjustments or improvements.

## Implementation Details
1. **Performance Metric Tracking:**
   - In the source file (`src/lib/main.js`), initialize global counters such as `globalThis.errorCount` and `globalThis.totalExecutionTime` (if not already present). These should be incremented or updated whenever a command results in an error or when a command’s execution completes.
   - Enhance existing logging to record metrics; for example, wrap command execution in timing logic and capture errors in try/catch blocks.

2. **Status Handler Enhancement:**
   - Update the status reporting (triggered via the `--status` CLI flag, or on specific self-review commands) to include new fields: `errorCount` and `avgExecutionTimeMS` (calculated as `totalExecutionTime / callCount`).

3. **Self-Review Command:**
   - Modify the `agenticHandler` in `src/lib/main.js` to recognize a self-review command (for instance, when `payload.command` is set to `self_improve`).
   - This command should compile the performance metrics into a report and output an object containing `callCount`, `errorCount`, `avgExecutionTimeMS` and a placeholder suggestion such as “No immediate improvements identified.”

## Tests
- **Metrics Verification:** Update unit tests in `tests/unit/main.test.js` to:
  - Simulate a normal command execution and then call the status handler to verify that the `errorCount` is correctly reported (e.g. zero for successful runs) and that the average execution time is a non-negative number.
  - Trigger an error intentionally (e.g. call a command with invalid input) and verify that `globalThis.errorCount` increments appropriately.

- **Self-Review Command Test:** Write tests to invoke `agenticHandler` with the `self_improve` command to ensure that the returned report object includes all the expected metric keys (such as `callCount`, `errorCount`, and `avgExecutionTimeMS`).

## Documentation
- **README Update:**
   - Update the README’s Features section to include a bullet point for **Self-Improvement and Diagnostics**. Describe that the agent continually monitors its own performance, adjusts its metrics with every command, and can perform a self-review to generate a performance report. This will help users understand that the agent is not a black box but is designed to self-optimize over time.

## Long-Term Direction
The current implementation establishes a foundation for self-monitoring. In the future, these metrics can be used to trigger automated refinements—such as adjusting input parsing or modifying internal logic—without manual intervention. This paves the way for further autonomy and continuous improvement in line with the overarching mission of agentic intelligent automation.
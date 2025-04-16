# MEMORY_PERFORMANCE

## Overview
This feature enhances the CLI tool's memory logging mechanism by not only tracking the execution duration for each command but also by aggregating and reporting usage statistics. In addition to recording a timestamp and duration for every CLI invocation, the tool now supports a new flag `--usage-stats` to summarize historical usage data, such as total invocation count, average execution duration, minimum and maximum durations, and other relevant statistics. This enhancement aids in performance monitoring and future optimization efforts.

## Implementation Details
1. **Timing Measurement:**
   - At the very beginning of the `main` function in `src/lib/main.js`, record the start time (e.g. `const startTime = Date.now();`).
   - Right before each return point (or after processing the main command logic), compute the elapsed time (`Date.now() - startTime`).
   - Append this `duration` (in milliseconds) to the latest log entry in the global `memoryLog`.

2. **Usage Statistics Aggregation:**
   - Introduce a new CLI flag `--usage-stats` in the command handler dispatch table.
   - When the CLI is invoked with `--usage-stats`, calculate summary statistics from the `memoryLog`:
     - **Total Invocations:** Count of log entries.
     - **Average Duration:** Mean duration of all invocations.
     - **Minimum Duration:** Shortest execution time recorded.
     - **Maximum Duration:** Longest execution time recorded.
   - Output these statistics in a structured JSON format and exit the process.

3. **Source File Modifications (`src/lib/main.js`):**
   - Insert timing code at the start of the `main` function as before and update each log entry to include `duration`.
   - Add a condition to check for the `--usage-stats` flag. If detected, aggregate the statistics from `memoryLog` and output them via `console.log(JSON.stringify(stats, null, 2))`, then terminate without further processing.

4. **Testing Updates (`tests/unit/main.test.js`):**
   - Add new tests to simulate CLI calls with the `--usage-stats` flag.
   - Verify that the output contains the correct summary statistics (e.g., total count, average, min, and max durations) and that durations are non-negative numbers.
   - Update existing memory logging tests to confirm that each log entry includes a valid `duration` property.

5. **Documentation Updates (README.md):**
   - In the CLI Options section, document the new `--usage-stats` flag. Provide an example invocation:
     ```bash
     node src/lib/main.js --usage-stats
     ```
   - Explain that this flag outputs a summary of CLI invocation statistics, which can be used for performance monitoring and optimization insights.

## Long-Term Direction
By adding usage statistics aggregation, the tool not only records granular execution details but also provides higher-level insights into its performance over time. This lays the groundwork for future features such as automated performance tuning, anomaly detection in execution times, and dynamic adjustments based on usage patterns. The enhanced memory performance tracking aligns with the mission of transparent and autonomous intelligent automation by turning raw log data into actionable insights.
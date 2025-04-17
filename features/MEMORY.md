# MEMORY

## Overview
The MEMORY feature has been enhanced to not only retain, manage, and query a persistent log of command invocations but now also supports flexible log export, auto archiving, and detailed diagnostic queries. The feature retains in-memory logs with unique session identifiers and timestamps. It merges capabilities from the previous MEMORY and CUSTOM_LOG features, ensuring continuous context between sessions and enabling further self-improvement and replication tasks.

## Implementation Details
- **Memory Logging and Persistence:**
  - Retain full logs of command invocations with unique session IDs and ISO-formatted timestamps.
  - Persist logs to disk via the `--persist-memory` flag. The log is saved to `memory.log` by default, or compressed to `memory.log.gz` if `--compress-memory` is provided.
  - On startup, the tool auto-loads the persisted memory log from either `memory.log.gz` (if exists) or `memory.log`.

- **Log Export and Import:**
  - The `--export-memory` flag allows exporting the current memory log to a file. A custom filename can be provided and if used with `--compress`, the export is gzip-compressed.
  - The `--import-memory <filename>` flag imports a log file, replacing the current session’s log.

- **Query and Update Operations:**
  - The feature offers several CLI flags for querying memory: `--query-memory`, `--query-tag`, `--query-annotation`, and `--query-memory-range` for filtering by command content or date range.
  - Update operations include `--update-memory-tag` and `--update-memory-annotation` flags to modify existing log entries.
  - Deletion operations are available with `--delete-memory-by-tag`, `--delete-memory-by-annotation`, and `--delete-memory-range` to remove specific entries based on tags, annotations, or dates.

- **Diagnostics and Statistics:**
  - Simple diagnostics flags `--diagnostics` and enhanced diagnostics `--detailed-diagnostics` provide JSON outputs detailing log size, configured limits, file persistence status, and session identifiers.
  - The `--memory-stats` flag outputs key statistics (total count, oldest and newest session IDs).
  - Frequency analysis is available via the `--frequency-stats` flag, which computes the occurrence count for each command argument.

- **Auto Archiving:**
  - **New:** The MEMORY feature now includes an auto archiving capability. When the `--archive-memory` flag is provided, the current memory log is archived to a separate file and then cleared.
  - **Behavior:**
    - Upon invocation of `--archive-memory`, the tool creates an archive file named `memory_archive_<TIMESTAMP>.json`. If the `--compress-memory` flag is also present, the file is saved in compressed format (e.g., `memory_archive_<TIMESTAMP>.gz`).
    - The archived file preserves all current log entries, ensuring historical data isn’t lost while freeing the current log for new sessions.
    - This functionality supports clearing memory after archiving, which helps manage log size and maintain performance over long-running processes.

## Testing
- **Unit Tests:**
  - Extend tests in `tests/unit/main.test.js` to simulate the auto archiving functionality:
    - Verify that invoking `--archive-memory` creates an archive file (with or without compression as specified).
    - Confirm that the archived file contains the correct JSON log array and that the in-memory log is reset after archiving.
  - Ensure that all existing functionalities (query, update, persist, and export/import) continue to work seamlessly with the new archiving option.

## Long-Term Direction
Enhancements to MEMORY set the stage for improved self-awareness and historical analysis in the agent. Future versions may include scheduled archiving, integration with external logging frameworks, and more flexible data retention policies. This added archiving functionality further aligns with our mission of creating a self-improving, autonomous agent with robust internal state management.

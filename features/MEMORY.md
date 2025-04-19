# MEMORY

## Overview
The MEMORY feature manages persistent in-memory logging for command invocations and now is extended with new functionality to manage log rotation. In addition to logging session details, tags, annotations, export/import operations (supporting JSON and CSV formats), query and update operations, diagnostics, and statistical insights, the MEMORY feature now includes a **Memory Rotation** capability. This new rotation functionality allows users to archive the current memory log into a backup file with a timestamped filename and then clear the active memory log. This is especially useful for maintenance workflows where historical logs need to be preserved while keeping the active memory log manageable.

## Implementation Details
- **Memory Logging and Persistence:**
  - Continues to log each command invocation with properties such as `sessionId`, `args`, `timestamp`, along with optional `tag` and `annotation` values.
  - The log is automatically loaded from a persisted file on startup (either from `memory.log` or compressed via `memory.log.gz`).

- **Existing Operations:**
  - Export and import functionality, including JSON and CSV exports.
  - Querying and updating memory entries by various parameters like tag, annotation, or date range.
  - Diagnostics such as `--diagnostics`, `--detailed-diagnostics`, `--memory-stats`, and `--frequency-stats` for monitoring performance and log content.

- **New: Memory Log Rotation**
  - **Flag:** `--rotate-memory`
  - When this flag is provided, the agent will: 
    - Export the current memory log to a backup file with a filename of the form `memory_backup_<timestamp>.json`, where `<timestamp>` is the ISO timestamp of rotation.
    - Clear the in-memory log after successful backup, thus starting a fresh log session.
  - This operation supports optional compression if the `--compress-memory` flag is concurrently provided (resulting in a file like `memory_backup_<timestamp>.json.gz`).

- **Error Handling:**
  - Validation ensures that rotation only occurs when a memory log exists. Errors during backup (e.g., file write issues) are logged to the console.
  - Post-rotation, the log size is reset to zero, while the persisted backup remains for archival purposes.

- **Testing and Documentation Enhancements:**
  - **Source File Changes:** The main CLI function has been updated to recognize the `--rotate-memory` flag, trigger the backup export, and then clear the in-memory log.
  - **Test File Updates:** New tests have been added in `tests/unit/main.test.js` to verify that when `--rotate-memory` is used, a backup file is created with the correct timestamp format and that the in-memory log is cleared thereafter.
  - **README Updates:** Documentation now includes instructions on using the new memory rotation feature. Example usage has been added:
    ```bash
    node src/lib/main.js --rotate-memory
    ```
    This command archives the current memory log to a backup file (e.g., `memory_backup_2025-04-17T12:34:56.789Z.json`) and then clears the active log.

## Long-Term Direction
The Memory feature’s extension with log rotation is a stepping stone toward more advanced log management capabilities. Future enhancements might include automated scheduling of rotations, integration with external logging systems, and more granular retention policies. Collectively, these capabilities enable a robust and scalable memory system that supports long-term self-improvement and operational continuity for the agent.

# MEMORY

## Overview
The MEMORY feature is responsible for retaining a comprehensive log of command invocations across sessions and providing various functionalities such as persistence, querying, tagging, updating, and deletion of log entries. In this update, we introduce a new capability: Auto Archiving. This enhancement allows the agent to archive the in-memory log into a time-stamped file when the user supplies the `--archive-memory` CLI flag, thereby preserving historical data and clearing the active log to prevent bloat.

## Implementation Details
- **Existing Capabilities:**
  - **Memory Logging & Persistence:**
    - Retains a log of command invocations with unique session IDs, CLI arguments, and ISO-formatted timestamps.
    - Automatically loads persisted log from `memory.log` during startup.
    - Can persist the current log when the `--persist-memory` flag is used.
  - **Querying and Updating:**
    - Supports querying the log by keywords via `--query-memory`, filtering by tags through `--query-tag`, and filtering by date range using `--query-memory-range`.
    - Updates to log entries can be made with `--update-memory-tag` and `--update-memory-annotation`.
    - Deletion of log entries by tag is handled with `--delete-memory-by-tag`.
  - **View Options:**
    - Displays the log in reverse chronological order (`--show-memory`) or natural order (`--show-memory-chronological`).
    - Provides diagnostic outputs with `--diagnostics`, `--detailed-diagnostics`, and `--memory-stats`.
  - **Analytical Tools:**
    - Computes frequency statistics of command arguments using the `--frequency-stats` flag.

- **Auto Archiving (New Addition):**
  - **CLI Flag:**
    - Introduce the new flag `--archive-memory`. When provided, the agent will:
      - Serialize the current in-memory log.
      - Write the serialized data to an archive file whose name is generated using the current timestamp (e.g., `memory_archive_2025-04-17T10-20-00Z.json`).
      - Clear the in-memory log immediately after a successful archival.
      - Delete the persisted file (`memory.log`) from disk if it exists, reflecting the cleared state.
  - **User Feedback:**
    - Output a confirmation message indicating the archive filename and that the memory log has been cleared.

- **Source Code Changes:**
  - In `src/lib/main.js`, add a new block to detect the `--archive-memory` flag before processing other commands:
    ```js
    if (args.includes("--archive-memory")) {
      const archiveTimestamp = new Date().toISOString().replace(/[:]/g, '-');
      const archiveFilename = `memory_archive_${archiveTimestamp}.json`;
      try {
        fs.writeFileSync(archiveFilename, JSON.stringify(memoryLog));
        // Clear in-memory log
        resetMemory();
        // Delete persisted memory file if it exists
        if (fs.existsSync("memory.log")) {
          fs.unlinkSync("memory.log");
        }
        console.log(`Archived memory log to ${archiveFilename} and cleared current memory.`);
      } catch (error) {
        console.error("Error during archiving memory log:", error);
      }
      return;
    }
    ```

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to include test cases for the `--archive-memory` flag:
    - Verify that after archiving, an archive file exists with a timestamp in its filename.
    - Confirm that the in-memory log is cleared and any persisted `memory.log` file is deleted.
    - Use spies on `console.log` to ensure the correct confirmation message is output.

- **Documentation Updates:**
  - In the `README.md`, add an example usage for the archival feature:
    ```bash
    node src/lib/main.js --archive-memory
    ```
  - Document that this flag archives the current memory log to a time-stamped file and resets the active log.

## Testing
- **Unit Tests:**
  - Ensure that invoking the `--archive-memory` flag creates an archive file with the expected naming convention.
  - Test that subsequent calls after archiving show an empty memory log.
  - Confirm deletion of the persisted file when archiving occurs.

## Long-Term Direction
- Future enhancements might include automated scheduling of archival operations, integration with external backup or analytics systems, and finer controls for selecting which log entries to archive. This capability not only preserves historical command data but also helps maintain optimal performance by preventing log overload.

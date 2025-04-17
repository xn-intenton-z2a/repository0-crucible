# MEMORY

## Overview
The MEMORY feature is responsible for retaining a comprehensive log of command executions across sessions and offering various management functionalities such as persistence, querying, tagging, and command replay. In this update, we introduce an additional capability: Auto Archiving. This enhancement enables the agent to archive the in-memory log into a time-stamped file when the user invokes a specific CLI flag, thereby preventing log bloat and preserving historical data in an organized manner.

## Implementation Details
- **Existing Capabilities:**
  - Memory Logging & Persistence: Retains a log of commands with unique session identifiers, timestamps, and optional tags. Auto-loads persisted memory from disk if available.
  - Querying, Tagging & Replay: Enables filtering log entries via query or tag, supports updating or deleting entries, and can replay a session command.

- **Auto Archiving:**
  - **CLI Flag:** Introduce a new flag `--archive-memory` in the CLI. When this flag is provided, the agent will perform an archival operation.
  - **Archive Process:**
    - The current in-memory log is serialized and written to an archive file. The archive filename is generated using the current timestamp (e.g., `memory_archive_2025-04-17T10-20-00Z.json`).
    - After successful archival, the in-memory log is cleared. If a persisted memory log file (e.g., `memory.log`) exists on disk, it is deleted to reflect the cleared state.
  - **User Feedback:** Upon successful archival, the tool outputs a message indicating the archive file name and that the memory log has been cleared.

## Testing
- **Unit Tests:**
  - Add test cases in `tests/unit/main.test.js` that simulate invocation of the `--archive-memory` flag.
  - Validate that an archive file is created with a filename containing a timestamp.
  - Verify that after archiving, the in-memory log is cleared and the persisted `memory.log` file (if present) is deleted.
  - Use spy techniques on `console.log` to ensure that the correct confirmation message is output.

## Documentation Updates
- **README.md:**
  - Update the Features section to document the new Auto Archiving capability.
  - Provide examples on how to invoke the feature, such as:
    ```bash
    node src/lib/main.js --archive-memory
    ```
  - Explain that upon invocation, the current memory log will be saved to a time-stamped archive file and then cleared, ensuring that archived data is preserved separately.

## Long-Term Direction
This enhancement not only helps in managing large memory logs by archiving historical data but also lays the groundwork for future features such as automated log rotation, analytics on archived data, or integration with external archival storage solutions. By ensuring that the memory log remains concise during active sessions while preserving historical records, the agent can better support both real-time operations and long-term diagnostics.
# MEMORY

## Overview
The MEMORY feature is responsible for retaining a comprehensive log of command executions across sessions, now enhanced to include command replay capabilities. This consolidated feature merges the traditional memory logging, persistence, querying, and tagging functionalities with the previously separate command replay functionality. Users can not only view and manage past commands but also retrieve specific command sessions using a new replay mechanism.

## Implementation Details
- **Memory Logging & Persistence:**
  - Maintain an in-memory log that records each command execution with a unique session identifier, the command arguments, and optional tags.
  - On startup, automatically load persisted memory from a file (e.g., `memory.log`) if it exists.
  - Enforce a configurable memory size limit (default 100 entries) which can be overridden using the `--memory-limit <number>` flag.
  - Support exporting (`--export-memory`) and importing (`--import-memory <filename>`) the memory log.

- **Querying and Tagging:**
  - Offer a `--query-memory <query>` flag for case-insensitive search across memory log entries.
  - Implement a `--query-tag <tag>` flag to filter entries by custom tags.
  - Enable tagging of entries via the `--tag-memory <tag>` flag and allow updates to existing tags using the `--update-memory-tag <sessionId> <newTag>` flag.

- **Command Replay Functionality:**
  - Integrate a new `--replay-session <sessionId>` flag within the MEMORY feature that allows users to retrieve the original command arguments from a specified session.
  - If the session is found in the memory log, output the command for review, thereby laying the groundwork for potential future re-execution. If not found, an error message is displayed.

- **Diagnostics and Statistics:**
  - Provide a `--diagnostics` flag to output JSON diagnostics that include current memory log size, memory limit, and persistence status.
  - Offer a `--memory-stats` flag to display statistics such as the count of entries, the oldest session, and the most recent session.

## Testing and Documentation
- **Testing:**
  - Unit tests should cover the integration of memory logging, file persistence, querying, tagging, and the replay functionality. Spy utilities are used to confirm that the correct outputs and error messages are produced.

- **Documentation Updates:**
  - README and contributing guides will be updated to reflect this unified memory and replay feature, providing clear usage examples for each CLI flag.

## Long-Term Direction
This merge not only simplifies the architecture by consolidating related functionalities but also sets the stage for future enhancements—such as automatic re-execution of commands and more advanced memory management techniques—that will further empower the agent to learn from and adapt its behaviors over time.
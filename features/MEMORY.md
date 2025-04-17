# MEMORY

## Overview
The MEMORY feature provides the agent with the ability to retain a history of command executions across runs. It works by maintaining an in-memory log that is augmented with persistent storage, ensuring continuity between sessions. In this update, the MEMORY feature is extended to include additional management capabilities such as querying, importing/exporting, clearing logs, and setting a custom size limit.

## Implementation Details
- **In-Memory Log and Persistence:**
  - The core memory is implemented as a global array that records each command execution with a unique session ID, arguments, and a timestamp.
  - On startup, the agent auto-loads the persisted memory from a file (e.g. `memory.log`) if it exists.
  - New command-line flags include:
    - `--persist-memory`: Saves the current memory log to disk.
    - `--clear-memory`: Clears both the in-memory log and deletes the persisted file.

- **Memory Size Management:**
  - A configurable memory limit (`--memory-limit <number>`) is implemented, allowing users to control the maximum number of entries stored. If the log exceeds this limit, older entries are removed.

- **Enhanced Memory Operations:**
  - **Query Memory (`--query-memory <query>`):** Filters the memory log for entries that match a given query string (case-insensitive), showing only relevant command logs.
  - **Export Memory (`--export-memory`):** Exports the current memory log to a designated file (e.g. `memory_export.json`).
  - **Import Memory (`--import-memory <filename>`):** Replaces the current memory log with contents from an external file, while ensuring that the size limit is still enforced after import.

- **Integration and Diagnostics:**
  - These extended capabilities are designed to work seamlessly with existing functionality such as automatic logging of new commands and diagnostics reporting. The memory log not only aids in debugging and tracing but also lays the foundation for future enhancements like context-aware command processing.

## Testing and Documentation
- **Testing:**
  - Unit tests have been extended to cover scenarios for querying, exporting, importing, clearing the log, and enforcing the memory limit.
  - Additional tests ensure the robustness of file I/O operations associated with persistence.

- **Documentation:**
  - The README has been updated to document the new flags and their usage examples. Developers are guided on how to manage the memory log and adjust its limits.
  - This update improves overall observability and sets the stage for future memory enhancements.

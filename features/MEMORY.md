# MEMORY

## Overview

The MEMORY feature provides persistent in-memory logging of command invocations along with sophisticated management capabilities. It is responsible for retaining a session-based log where each entry includes a unique session identifier, command arguments, and timestamps. In addition to basic logging, this enhanced MEMORY feature now integrates auto archiving, export/import functionality, query and update operations (by tag, annotation, and date range), detailed diagnostics including statistics and frequency analysis, and memory expiration to automatically prune older entries.

## Implementation Details

- **Memory Logging & Persistence:**
  - Maintains an in-memory log with each entry recording a unique sessionId, the arguments passed, and a timestamp.
  - On startup, if a persisted file exists (either as plain text `memory.log` or compressed `memory.log.gz`), the log is auto-loaded to provide continuity.
  
- **Auto Archiving & Expiration:**
  - The feature now includes auto archiving: using the `--archive-memory` flag, the current log is archived to a timestamped file (compressed if `--compress-memory` is provided) and then cleared from active memory.
  - A new `--expire-memory <minutes>` flag purges entries older than the specified number of minutes, ensuring the log remains manageable.

- **Export & Import:**
  - Use `--export-memory` (with an optional filename and `--compress`) to export the current log. The exported file can be later imported using `--import-memory <filename>`, replacing the active log.

- **Query & Update Operations:**
  - Supports querying via `--query-memory <query>`, filtering if any command argument contains the case-insensitive query.
  - Enhanced queries include filtering by tag (`--query-tag <tag>`), annotation (`--query-annotation <query>`), and date range (`--query-memory-range <start> <end>`).
  - Users can update individual memory entries with `--update-memory-tag <sessionId> <newTag>` or `--update-memory-annotation <sessionId> <newAnnotation>`, which also records a modification timestamp.

- **Additional Diagnostics & Statistics:**
  - Basic diagnostics (`--diagnostics`) provide current memory count, memory limit, and persistence status.
  - Detailed diagnostics (`--detailed-diagnostics` and `--memory-detailed-stats`) output extended snapshots including session IDs, average intervals between entries, and frequency statistics of command arguments.
  - The `--memory-stats` flag outputs the count, oldest, and newest session details.

## Testing

- **Unit Tests:**
  - The test suite in `tests/unit/main.test.js` covers logging behavior, auto-loading, persistence (with and without compression), querying, updating, and deletion of log entries.
  - Tests validate proper trimming of the log when exceeding the configured memory limit (e.g., via the `--memory-limit` flag).
  - Edge cases such as invalid flag usage, error handling for file operations, and consistent timestamp recording upon updates are thoroughly verified.

## Long-Term Direction

This unified MEMORY feature lays the groundwork for advanced self-improvement and adaptive automation. Future iterations could include:

- Sharing memory logs across replicated agent instances for collective learning.
- Integrating memory entries with external monitoring dashboards for real-time diagnostics.
- Leveraging historical memory data to automatically adjust the behavior of planning and replication features.

By consolidating functionalities – including auto archiving (formerly in a separate feature) – into MEMORY, the system maintains a tight, interdependent architecture that supports agentic, cross-repository intelligent automation.

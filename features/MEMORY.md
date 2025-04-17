# MEMORY

## Overview

The MEMORY feature provides persistent in-memory logging of command invocations along with sophisticated management capabilities. It is responsible for retaining a session-based log where each entry includes a unique session identifier, the command arguments passed, and timestamps. In addition to basic logging, this enhanced MEMORY feature now integrates auto archiving, export/import functionality (including JSON and CSV formats), query and update operations (by tag, annotation, and date range), detailed diagnostics including statistics and frequency analysis, and memory expiration to automatically prune older entries.

## Implementation Details

- **Memory Logging & Persistence:**
  - Maintains an in-memory log with each entry recording a unique sessionId, the arguments passed, and a timestamp.
  - On startup, if a persisted file exists (either as plain text `memory.log` or compressed `memory.log.gz`), the log is auto-loaded to provide continuity.

- **Auto Archiving & Expiration:**
  - Supports auto archiving using the `--archive-memory` flag, which compresses and saves the current log, then resets in-memory storage.
  - A new `--expire-memory <minutes>` flag purges entries older than the specified time period.

- **Export & Import:**
  - The feature supports exporting the current memory log via the `--export-memory` flag. By default, export is in JSON format to `memory_export.json`, but users can provide a custom filename.
  - **CSV Export:** A new `--export-csv` flag enables exporting the memory log in CSV format. The CSV includes columns for: sessionId, timestamp, modified, args, tag, and annotation. A custom filename can be optionally provided immediately after the flag.
  - Import functionality is provided through the `--import-memory <filename>` flag, which replaces the current log with the contents of the specified file.

- **Query, Update, & Deletion Operations:**
  - Supports various query operations:
    - `--query-memory <query>` for filtering entries by command argument (case-insensitive).
    - `--query-tag <tag>` for filtering by a custom tag.
    - `--query-annotation <query>` for filtering based on annotation content.
    - `--query-memory-range <start> <end>` for filtering entries within a date range.
  - Update operations include:
    - `--update-memory-tag <sessionId> <newTag>` to change the tag of a specific entry.
    - `--update-memory-annotation <sessionId> <newAnnotation>` to modify the annotation, both adding a `modified` timestamp.
  - Deletion operations allow removal of entries by tag (`--delete-memory-by-tag <tag>`), annotation (`--delete-memory-by-annotation <annotation>`), or date range (`--delete-memory-range <start> <end>`).

- **Diagnostics & Statistics:**
  - Basic diagnostics are available via the `--diagnostics` flag, which returns current memory log count, memory limit, and persistence status.
  - Detailed diagnostics (`--detailed-diagnostics`) provides an extended report including an array of sessionIds.
  - The `--memory-stats` flag outputs statistics such as the total count, oldest and newest session IDs, while `--frequency-stats` calculates the frequency of each command argument.
  - A new `--memory-detailed-stats` flag offers insights into average intervals between entries and the most frequent command argument.

## Testing

- **Unit Tests:**
  - The test suite in `tests/unit/main.test.js` has been extended to cover various scenarios including the new CSV export functionality, ensuring that file output in CSV matches expected formatting and content.
  - Tests verify export, query, update, deletion, and expiration functionalities.

## Long-Term Direction

Enhancing MEMORY not only simplifies tracking and diagnostics of the agent's actions, but also lays the groundwork for advanced features such as shared memory across agent instances. Future iterations may include:
- Integration with external monitoring dashboards for real-time diagnostics.
- Enhanced data transformation capabilities (e.g., exporting in additional formats beyond JSON and CSV).
- Automated memory pruning strategies based on dynamic usage patterns leveraging self-improvement metrics.
- Improved inter-agent memory sharing for collective learning.

By incorporating CSV export and refining the export/import pipeline, the MEMORY feature now provides even more flexibility and transparency, aligning with the mission of enabling autonomous, intelligent, and efficient cross-repository operations.
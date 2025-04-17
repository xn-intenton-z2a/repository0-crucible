# AUTO_ARCHIVE

## Overview
This enhancement adds an auto archiving capability to the MEMORY feature. With the new `--archive-memory` CLI flag, the agent can archive old memory log entries into a separate file and then clear them from active memory. This ensures that the in-memory log is kept at a manageable size, aligns with the log size limit, and provides a mechanism for backing up past command invocations for historical analysis.

## Implementation Details
- **Flag Detection and Archive Trigger:**
  - Extend the main function in `src/lib/main.js` to handle the `--archive-memory` flag. When invoked, it will:
    - Create an archive file named with a timestamp (e.g. `memory_archive_<TIMESTAMP>.json`). If the `--compress-memory` flag is present, compress the archive using zlib and save it with `.gz` extension.
    - Clear the in-memory memory log after archiving.
    - Persist the cleared state to disk by overwriting the existing memory log file(s).

- **CLI Integration:**
  - Update argument parsing in `src/lib/main.js` to include a new clause for `--archive-memory` before recording the current invocation. This ensures the archive is created before any new entries are appended.
  - Optionally support a combination of `--archive-memory` with `--compress-memory` for compressed archives.

- **Error Handling:**
  - Validate file write operations and log any errors encountered during archiving. Ensure that if the archiving fails, the in-memory log is preserved.

## Testing
- **Unit Tests:**
  - Update tests in `tests/unit/main.test.js` to simulate the archive action. Tests should:
    - Trigger the archiving process using the `--archive-memory` flag with and without the `--compress-memory` option.
    - Verify that an archive file is created (e.g. check for file existence with a matching name pattern).
    - Confirm that after archiving, the in-memory log is cleared.

- **Regression Checks:**
  - Ensure that existing tests for memory logging, export/import, and persistence still pass after introducing auto archive functionality.

## Documentation Updates
- **README.md:**
  - Add a section under the Memory Logging feature that explains the new auto archive capability. Provide example commands such as:
    ```bash
    node src/lib/main.js --archive-memory
    node src/lib/main.js --archive-memory --compress-memory
    ```
  - Describe that archiving helps manage long-running processes by automatically backing up and clearing old log data.

This feature builds on the existing MEMORY capability by adding a practical solution to log management, ensuring that the agent remains performant over extended usage while preserving valuable historical data for diagnostics and self-improvement.

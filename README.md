# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- CLI Tool for running commands with argument output.
- Memory Logging: The CLI tool now retains a log of command arguments from each invocation. Each log entry is an object that includes a unique session identifier (a combination of the current timestamp and a random string) and the command line arguments used. This helps group and trace commands executed during a single runtime session. The log can be displayed using the `--show-memory` flag. Programmatically, you can access the log using the `getMemory()` function.
- Persistence: With the new `--persist-memory` flag, the tool now saves the memory log to a file called `memory.log`, ensuring the log is retained across separate invocations.
- Auto-load Persisted Memory: On startup, if a `memory.log` file exists, its contents are automatically loaded into the tool's memory log, providing continuity.
- Clear Memory: A new `--clear-memory` flag has been added that resets the in-memory log and deletes the persisted memory log file, allowing you to easily clear the history.
- Log Size Limit: The memory logging feature now includes a configurable size limit. By default, it is set to 100 entries, but you can override it at runtime using the `--memory-limit <number>` flag. For example, `node src/lib/main.js --memory-limit 50` will set the maximum log entries to 50. Note that if a non-numeric or invalid value is provided (for example, `NaN`), the CLI will output the error "Invalid memory limit provided. It must be a positive integer.".
- Export Memory: The new `--export-memory` flag exports the current memory log to a file. By default, it exports to `memory_export.json`, but you can now optionally provide a custom filename. For example:
  ```bash
  node src/lib/main.js --export-memory custom_log.json
  ```
- Import Memory: The new `--import-memory <filename>` flag imports a memory log from the specified file and replaces the current session’s memory with the imported data.
- Query Memory: The new `--query-memory <query>` flag allows users to filter the memory log entries based on a search term. The search is case-insensitive, ensuring that values like "anotherAlpha" match when searching for "alpha". Only those entries whose command arguments contain the specified query will be output.
- Query by Tag: The new `--query-tag <tag>` flag allows users to filter memory log entries based on a custom tag. The filtering is case-insensitive and only returns entries that have a matching tag.
- Update Memory Tag: The new `--update-memory-tag <sessionId> <newTag>` flag allows updating the tag of an existing memory log entry identified by its sessionId. When a memory.log file exists, the update is automatically persisted. For example:
  ```bash
  node src/lib/main.js --update-memory-tag <sessionId> newTag
  ```
  This command updates the tag of an existing memory log entry identified by the given sessionId, and if a memory.log file exists, the change is automatically persisted.
- Delete Memory by Tag: Use the new `--delete-memory-by-tag <tag>` flag to remove all memory log entries that have a matching tag (case-insensitive). This helps in clearing out categorized log entries when needed. For example:
  ```bash
  node src/lib/main.js --delete-memory-by-tag myCustomTag
  ```
- Show Memory in Reverse Order: When using the `--show-memory` flag, the memory log is now displayed in reverse chronological order (newest entries first).
- Diagnostics: A new `--diagnostics` flag has been added to output diagnostic information in JSON format. The output includes the current memory log size, the memory limit, and whether a persisted memory file exists.
- Detailed Diagnostics: The new `--detailed-diagnostics` flag provides an enhanced diagnostic output. In addition to the basic diagnostics, it outputs a detailed snapshot including an array of all memory session IDs under the property `memorySessionIds`. For example:
  ```json
  {
    "memoryLimit": 100,
    "memoryLogCount": 3,
    "memoryFilePersisted": true,
    "memorySessionIds": [
      "2025-04-17T10:00:00.000Z-abc123",
      "2025-04-17T10:05:00.000Z-def456",
      "2025-04-17T10:10:00.000Z-ghi789"
    ]
  }
  ```
- Tagging: With the new `--tag-memory <tag>` flag, users can attach a custom tag to a memory log entry. This allows for enhanced categorization and traceability of logged commands.
- Memory Stats: The new `--memory-stats` flag outputs diagnostic statistics about the in-memory log, including the total count of log entries, the session ID of the oldest entry, and the session ID of the newest entry.
- Merge Persisted Memory: The new `--merge-persist` flag merges the current in-memory memory log with the persisted log from `memory.log`. It removes duplicate entries (based on sessionId) and trims the result to respect the current memory limit. For example:
  ```bash
  node src/lib/main.js --merge-persist
  ```
  This command will combine the logs from the previous sessions with the current session, ensuring continuity in command history.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Show Memory Log (reverse chronological order):**
  ```bash
  node src/lib/main.js --show-memory
  ```

- **Persist Memory Log:**
  ```bash
  node src/lib/main.js --persist-memory
  ```

- **Clear Memory Log:**
  ```bash
  node src/lib/main.js --clear-memory
  ```

- **Export Memory Log (default filename):**
  ```bash
  node src/lib/main.js --export-memory
  ```

- **Export Memory Log with Custom Filename:**
  ```bash
  node src/lib/main.js --export-memory custom_log.json
  ```

- **Import Memory Log:**
  ```bash
  node src/lib/main.js --import-memory backup_memory.json
  ```

- **Query Memory Log:**
  ```bash
  node src/lib/main.js --query-memory test
  ```

- **Query by Tag:**
  ```bash
  node src/lib/main.js --query-tag myCustomTag
  ```

- **Update Memory Tag (with auto-persistence):**
  ```bash
  node src/lib/main.js --update-memory-tag <sessionId> newTag
  ```

- **Delete Memory by Tag:**
  ```bash
  node src/lib/main.js --delete-memory-by-tag myCustomTag
  ```

- **Set Custom Memory Limit:**
  ```bash
  node src/lib/main.js --memory-limit 50
  ```

- **Tag a Memory Entry:**
  ```bash
  node src/lib/main.js --tag-memory "myCustomTag"
  ```

- **Diagnostics Output:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

- **Detailed Diagnostics Output:**
  ```bash
  node src/lib/main.js --detailed-diagnostics
  ```
  This will output a JSON object with properties such as `memoryLimit`, `memoryLogCount`, `memoryFilePersisted`, and `memorySessionIds` (an array of session IDs).

- **Memory Stats:**
  ```bash
  node src/lib/main.js --memory-stats
  ```

- **Merge Persisted Memory:**
  ```bash
  node src/lib/main.js --merge-persist
  ```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

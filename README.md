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
- Memory Logging: The CLI tool now retains a log of command arguments from each invocation. Each log entry is an object that includes a unique session identifier (a combination of the current timestamp and a random string), the command line arguments used, and an explicit **timestamp** property with the ISO creation time. This helps group and trace commands executed during a single runtime session. The log can be displayed using the `--show-memory` flag. Programmatically, you can access the log using the `getMemory()` function.
- **Modification Timestamp:** When a memory log entry is updated via the `--update-memory-tag` or `--update-memory-annotation` commands, an additional property `modified` is added to the entry containing the update timestamp in ISO format.
- Persistence: With the new `--persist-memory` flag, the tool now saves the memory log to a file. By default, it saves to `memory.log`, but if the `--compress-memory` flag is also provided, the log is compressed using Node's zlib module and saved as `memory.log.gz`. On startup, if a persisted memory file exists, its contents are automatically loaded into the tool's memory log, providing continuity.
- Clear Memory: A new `--clear-memory` flag resets the in-memory log and deletes the persisted memory log file, allowing you to easily clear the history.
- Log Size Limit: The memory logging feature now includes a configurable size limit. By default, it is set to 100 entries, but you can override it at runtime using the `--memory-limit <number>` flag. For example, `node src/lib/main.js --memory-limit 50` will set the maximum log entries to 50. If a non-numeric or invalid value is provided, the CLI will output an error.
- Export Memory: The new `--export-memory` flag exports the current memory log to a file. By default, it exports to `memory_export.json`, but you can optionally provide a custom filename. For example:
  ```bash
  node src/lib/main.js --export-memory custom_log.json
  ```
- Export Memory with Compression: You can export the memory log in a compressed gzip format by using the `--compress` flag with `--export-memory`. For example:
  ```bash
  node src/lib/main.js --export-memory compressed_log.json --compress
  ```
- **Export as CSV:** The new `--export-csv` flag exports the memory log in CSV format. The file will include columns: sessionId, timestamp, modified, args, tag, and annotation. By default, it exports to `memory_export.csv` unless a custom filename is provided.
- Import Memory: The `--import-memory <filename>` flag imports a memory log from the specified file and replaces the current session’s memory with the imported data.
- Query Memory: The `--query-memory <query>` flag allows filtering of memory log entries based on a search term (case-insensitive). Only entries whose command arguments contain the query are output.
- Query by Tag: Use the `--query-tag <tag>` flag to filter memory log entries based on a custom tag (case-insensitive).
- Query by Annotation: The `--query-annotation <query>` flag filters memory log entries based on their annotation content (case-insensitive).
- **Date Range Query:** The `--query-memory-range <start-date> <end-date>` flag filters entries with timestamps between the provided ISO dates (inclusive).
- **Delete Memory by Date Range:** The `--delete-memory-range <start-date> <end-date>` flag deletes all entries with timestamps within the specified range (inclusive).
- Update Memory Tag: The `--update-memory-tag <sessionId> <newTag>` flag updates the tag of an existing memory log entry. The update is persisted if a memory log file exists, and a `modified` timestamp is recorded.
- Update Memory Annotation: The `--update-memory-annotation <sessionId> <newAnnotation>` flag updates the annotation of an entry, with persistence and a `modified` timestamp.
- Delete Memory by Tag: The `--delete-memory-by-tag <tag>` flag removes all entries with a matching tag (case-insensitive).
- Delete Memory by Annotation: The `--delete-memory-by-annotation <annotation>` flag removes all entries whose annotation exactly matches the provided value (case-insensitive).
- Show Memory in Reverse Order: Use the `--show-memory` flag to display the memory log in reverse chronological order (newest first).
- Show Memory in Chronological Order: The `--show-memory-chronological` flag displays the memory log in natural order (oldest first).
- Diagnostics: The `--diagnostics` flag outputs diagnostic information in JSON format, including memory log size, memory limit, and whether a persisted file exists.
- Detailed Diagnostics: The `--detailed-diagnostics` flag provides an enhanced diagnostic snapshot, including an array of all memory session IDs.
- Tagging and Annotation: Use `--tag-memory <tag>` and `--annotate-memory <annotation>` to attach custom tags and annotations to log entries.
- Memory Stats: The `--memory-stats` flag outputs statistics about the in-memory log, including total count, oldest and newest session IDs.
- Merge Persisted Memory: The `--merge-persist` flag merges the current in-memory log with the persisted file, removing duplicates and trimming to the memory limit.
- Frequency Statistics: The `--frequency-stats` flag outputs a JSON object showing the frequency of each command argument across all entries.
- **Memory Expiration:** The `--expire-memory <minutes>` flag automatically removes entries older than the specified number of minutes.
- **Detailed Memory Statistics:** The `--memory-detailed-stats` flag outputs detailed statistics including total count, earliest/latest timestamps, average interval between entries, and the most frequent command argument.
- **Custom Memory File Path:** **New Feature:** Use the `--memory-path <filepath>` flag to specify a custom file path for persisting and loading the memory log. For example:
  ```bash
  node src/lib/main.js --persist-memory --memory-path custom_memory.log
  ```
  When used in combination with `--compress-memory`, if the provided file path ends with `.gz`, the log will be saved and read in compressed format.

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

- **Show Memory Log (chronological order):**
  ```bash
  node src/lib/main.js --show-memory-chronological
  ```

- **Persist Memory Log (without compression):**
  ```bash
  node src/lib/main.js --persist-memory
  ```

- **Persist Memory Log with Compression:**
  ```bash
  node src/lib/main.js --persist-memory --compress-memory
  ```

- **Clear Memory Log:**
  ```bash
  node src/lib/main.js --clear-memory
  ```

- **Export Memory Log (default JSON):**
  ```bash
  node src/lib/main.js --export-memory
  ```

- **Export Memory Log with Custom Filename (JSON):**
  ```bash
  node src/lib/main.js --export-memory custom_log.json
  ```

- **Export Memory Log with Compression (JSON):**
  ```bash
  node src/lib/main.js --export-memory compressed_log.json --compress
  ```

- **Export Memory Log in CSV Format (default filename):**
  ```bash
  node src/lib/main.js --export-csv
  ```

- **Export Memory Log in CSV Format with Custom Filename:**
  ```bash
  node src/lib/main.js --export-csv custom_export.csv
  ```

- **Import Memory Log:**
  ```bash
  node src/lib/main.js --import-memory backup_memory.json
  ```

- **Query Memory Log by Command Arguments:**
  ```bash
  node src/lib/main.js --query-memory test
  ```

- **Query Memory Log by Tag:**
  ```bash
  node src/lib/main.js --query-tag myCustomTag
  ```

- **Query Memory Log by Annotation:**
  ```bash
  node src/lib/main.js --query-annotation review
  ```

- **Query Memory by Date Range:**
  ```bash
  node src/lib/main.js --query-memory-range 2025-04-17T00:00:00.000Z 2025-04-18T00:00:00.000Z
  ```

- **Delete Memory by Date Range:**
  ```bash
  node src/lib/main.js --delete-memory-range 2025-04-17T10:00:00.000Z 2025-04-17T13:00:00.000Z
  ```

- **Update Memory Tag (with auto-persistence):**
  ```bash
  node src/lib/main.js --update-memory-tag <sessionId> newTag
  ```

- **Update Memory Annotation (with auto-persistence):**
  ```bash
  node src/lib/main.js --update-memory-annotation <sessionId> newAnnotation
  ```

- **Delete Memory by Tag:**
  ```bash
  node src/lib/main.js --delete-memory-by-tag myCustomTag
  ```

- **Delete Memory by Annotation:**
  ```bash
  node src/lib/main.js --delete-memory-by-annotation "review needed"
  ```

- **Set Custom Memory Limit:**
  ```bash
  node src/lib/main.js --memory-limit 50
  ```

- **Tag a Memory Entry:**
  ```bash
  node src/lib/main.js --tag-memory "myCustomTag"
  ```

- **Annotate a Memory Entry:**
  ```bash
  node src/lib/main.js --annotate-memory "review this command"
  ```

- **Diagnostics Output:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

- **Detailed Diagnostics Output:**
  ```bash
  node src/lib/main.js --detailed-diagnostics
  ```

- **Memory Stats:**
  ```bash
  node src/lib/main.js --memory-stats
  ```

- **Merge Persisted Memory:**
  ```bash
  node src/lib/main.js --merge-persist
  ```

- **Frequency Statistics:**
  ```bash
  node src/lib/main.js --frequency-stats
  ```

- **Memory Expiration:**
  ```bash
  node src/lib/main.js --expire-memory 60
  ```
  This command will remove any memory log entries older than 60 minutes.

- **Detailed Memory Statistics:**
  ```bash
  node src/lib/main.js --memory-detailed-stats
  ```

- **Custom Memory File Path:**
  ```bash
  node src/lib/main.js --persist-memory --memory-path custom_memory.log
  ```
  When used with --compress-memory, if the path ends with .gz (e.g. custom_memory.log.gz), the log will be stored in compressed format.

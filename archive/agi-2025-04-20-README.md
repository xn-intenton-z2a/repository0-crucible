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
- Persistence: With the new `--persist-memory` flag, the tool now saves the memory log to a file. By default, it saves to `memory.log`, but if the `--compress-memory` flag is also provided, the log is compressed using Node's zlib module and saved as `memory.log.gz`. On startup, if `memory.log.gz` exists, it is automatically decompressed and loaded. **Note:** The persistence logic has been refactored into a helper function to ensure consistent behavior and easier maintenance.
- Auto-load Persisted Memory: On startup, if a persisted memory file exists (`memory.log` or `memory.log.gz`), its contents are automatically loaded into the tool's memory log, providing continuity.
- Clear Memory: A new `--clear-memory` flag has been added that resets the in-memory log and deletes the persisted memory log file, allowing you to easily clear the history.
- Log Size Limit: The memory logging feature now includes a configurable size limit. By default, it is set to 100 entries, but you can override it at runtime using the `--memory-limit <number>` flag. For example, `node src/lib/main.js --memory-limit 50` will set the maximum log entries to 50. If a non-numeric or invalid value is provided (for example, `NaN`), the CLI will output the error "Invalid memory limit provided. It must be a positive integer." and the memory log will remain unchanged.
- Export Memory: The new `--export-memory` flag exports the current memory log to a file. By default, it exports to `memory_export.json`, but you can now optionally provide a custom filename. For example:
  ```bash
  node src/lib/main.js --export-memory custom_log.json
  ```
- Export Memory with Compression: You can now export the memory log in a compressed gzip format by using the `--compress` flag in conjunction with `--export-memory`. For example:
  ```bash
  node src/lib/main.js --export-memory compressed_log.json --compress
  ```
- **Export as CSV:** A new `--export-csv` flag has been added to export the memory log in CSV format. The CSV file will include the following columns: sessionId, timestamp, modified, args, tag, and annotation. By default, it exports to `memory_export.csv` unless a custom filename is provided immediately after the flag.
- Import Memory: The new `--import-memory <filename>` flag imports a memory log from the specified file and replaces the current session’s memory with the imported data.
- Query Memory: The new `--query-memory <query>` flag allows users to filter the memory log entries based on a search term. The search is case-insensitive, ensuring that values like "anotherAlpha" match when searching for "alpha". Only those entries whose command arguments contain the specified query will be output.
- Query by Tag: The new `--query-tag <tag>` flag allows users to filter memory log entries based on a custom tag. The filtering is case-insensitive and only returns entries that have a matching tag.
- Query by Annotation: The new `--query-annotation <query>` flag allows users to filter memory log entries based on their annotation content. This search is case-insensitive and will return all entries where the annotation contains the provided query string. For example:
  ```bash
  node src/lib/main.js --query-annotation review
  ```
- **Date Range Query:** The new `--query-memory-range <start-date> <end-date>` flag allows users to filter memory log entries that have timestamps between the provided ISO date-time values (inclusive). For example:
  ```bash
  node src/lib/main.js --query-memory-range 2025-04-17T00:00:00.000Z 2025-04-18T00:00:00.000Z
  ```
- **Delete Memory by Date Range:** The new `--delete-memory-range <start-date> <end-date>` flag allows users to delete all memory log entries whose timestamps fall within the specified date range (inclusive). For example:
  ```bash
  node src/lib/main.js --delete-memory-range 2025-04-17T10:00:00.000Z 2025-04-17T13:00:00.000Z
  ```
- Update Memory Tag: The new `--update-memory-tag <sessionId> <newTag>` flag allows updating the tag of an existing memory log entry identified by its sessionId. When a memory.log file exists, the update is automatically persisted. Upon update, a `modified` property is also recorded containing the update timestamp.
- Update Memory Annotation: The new `--update-memory-annotation <sessionId> <newAnnotation>` flag allows updating the annotation of an existing memory log entry identified by its sessionId. If a memory.log file exists, the change is automatically persisted. A `modified` property is similarly recorded upon an update.
- Delete Memory by Tag: Use the new `--delete-memory-by-tag <tag>` flag to remove all memory log entries that have a matching tag (case-insensitive). This helps in clearing out categorized log entries when needed. For example:
  ```bash
  node src/lib/main.js --delete-memory-by-tag myCustomTag
  ```
- Delete Memory by Annotation: Use the new `--delete-memory-by-annotation <annotation>` flag to remove all memory log entries that have an annotation that exactly matches (case-insensitively) the provided value. For example:
  ```bash
  node src/lib/main.js --delete-memory-by-annotation "review needed"
  ```
- Show Memory in Reverse Order: When using the `--show-memory` flag, the memory log is now displayed in reverse chronological order (newest entries first).
- Show Memory in Chronological Order: The newly added `--show-memory-chronological` flag displays the memory log in natural, chronological order (oldest entries first), which can be useful for tracking the order in which commands were executed. Note: This flag does not record the query invocation itself.
- Diagnostics: A new `--diagnostics` flag has been added to output diagnostic information in JSON format. The output includes the current memory log size, the memory limit, and whether a persisted memory file exists.
- Detailed Diagnostics: The new `--detailed-diagnostics` flag provides an enhanced diagnostic output. In addition to the basic diagnostics, it outputs a detailed snapshot including an array of all memory session IDs under the property `memorySessionIds`.
- Tagging: With the new `--tag-memory <tag>` flag, users can attach a custom tag to a memory log entry. This allows for enhanced categorization and traceability of logged commands.
- Annotation: With the new `--annotate-memory <annotation>` flag, users can attach a custom annotation to a memory log entry. This provides additional context or notes for the command invocation.
- Memory Stats: The new `--memory-stats` flag outputs diagnostic statistics about the in-memory log, including the total count of log entries, the session ID of the oldest entry, and the session ID of the newest entry.
- Merge Persisted Memory: The new `--merge-persist` flag merges the current in-memory memory log with the persisted log from the disk. It removes duplicate entries (based on sessionId) and trims the result to respect the current memory limit.
- Frequency Statistics: The new `--frequency-stats` flag computes and outputs a JSON object that shows the frequency count of each command argument from the in-memory log.
- **Memory Expiration:** The new `--expire-memory <minutes>` flag automatically removes memory log entries older than the specified number of minutes.
- **Detailed Memory Statistics:** The new `--memory-detailed-stats` flag outputs a JSON object containing detailed statistics about the memory log, including:
  - Total count of log entries
  - The earliest timestamp
  - The latest timestamp
  - The average interval (in seconds) between consecutive entries
  - The most frequent command argument across all log entries

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
  If a non-numeric value is provided (for example, `NaN`), the CLI will output "Invalid memory limit provided. It must be a positive integer." and the memory log remains unchanged.

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
  This command outputs detailed statistics about the memory log, including total count, earliest and latest timestamps, average interval between entries (in seconds), and the most frequent command argument.

## Contributing

For contributions, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

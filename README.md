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
- Persistence: With the new `--persist-memory` flag, the tool now saves the memory log to a file. By default, it saves to `memory.log`, but if the `--compress-memory` flag is also provided, the log is compressed using Node's zlib module and saved as `memory.log.gz`. On startup, if `memory.log.gz` exists, it is automatically decompressed and loaded.
- Auto-load Persisted Memory: On startup, if a persisted memory file exists (`memory.log` or `memory.log.gz`), its contents are automatically loaded into the tool's memory log, providing continuity.
- Clear Memory: A new `--clear-memory` flag has been added that resets the in-memory log and deletes the persisted memory log file, allowing you to easily clear the history.
- Log Size Limit: The memory logging feature now includes a configurable size limit. By default, it is set to 100 entries, but you can override it at runtime using the `--memory-limit <number>` flag. For example, `node src/lib/main.js --memory-limit 50` will set the maximum log entries to 50. Note that if a non-numeric or invalid value is provided (for example, `NaN`), the CLI will output the error "Invalid memory limit provided. It must be a positive integer.".
- Export Memory (JSON): The new `--export-memory` flag exports the current memory log to a file in JSON format. By default, it exports to `memory_export.json`, but you can optionally provide a custom filename. You can also export in compressed format by adding the `--compress` flag.
- Export Memory (CSV): The new `--export-csv` flag exports the current memory log in CSV format. The CSV contains the following columns: `sessionId`, `timestamp`, `modified`, `args`, `tag`, and `annotation` (with the `args` column showing the command arguments joined by a space). By default, if no filename is provided, the export file is named `memory_export.csv`. Otherwise, the filename provided after `--export-csv` is used.
- Import Memory: The new `--import-memory <filename>` flag imports a memory log from the specified file and replaces the current session’s memory with the imported data.
- Query Memory: The new `--query-memory <query>` flag allows users to filter the memory log entries based on a search term. The search is case-insensitive, ensuring that values like "anotherAlpha" match when searching for "alpha". Only those entries whose command arguments contain the specified query will be output.
- Query by Tag: The new `--query-tag <tag>` flag allows users to filter memory log entries based on a custom tag. The filtering is case-insensitive and only returns entries that have a matching tag.
- Query by Annotation: The new `--query-annotation <query>` flag allows users to filter memory log entries based on their annotation content. This search is case-insensitive and will return all entries where the annotation contains the provided query string.
- **Date Range Query:** The new `--query-memory-range <start-date> <end-date>` flag allows users to filter memory log entries that have timestamps between the provided ISO date-time values (inclusive).
- **Delete Memory by Date Range:** The new `--delete-memory-range <start-date> <end-date>` flag allows users to delete all memory log entries whose timestamps fall within the specified date range (inclusive).
- Update Memory Tag: The new `--update-memory-tag <sessionId> <newTag>` flag allows updating the tag of an existing memory log entry identified by its sessionId. When a memory.log file exists, the update is automatically persisted. Upon update, a `modified` property is also recorded containing the update timestamp.
- Update Memory Annotation: The new `--update-memory-annotation <sessionId> <newAnnotation>` flag allows updating the annotation of an existing memory log entry identified by its sessionId. If a memory.log file exists, the change is automatically persisted. A `modified` property is similarly recorded upon an update.
- Delete Memory by Tag: Use the new `--delete-memory-by-tag <tag>` flag to remove all memory log entries that have a matching tag (case-insensitive).
- Delete Memory by Annotation: Use the new `--delete-memory-by-annotation <annotation>` flag to remove all memory log entries that have an annotation that exactly matches (case-insensitively) the provided value.
- Show Memory in Reverse Order: When using the `--show-memory` flag, the memory log is now displayed in reverse chronological order (newest entries first).
- Show Memory in Chronological Order: The newly added `--show-memory-chronological` flag displays the memory log in natural, chronological order (oldest entries first).
- Diagnostics: A new `--diagnostics` flag outputs diagnostic information in JSON format, including the current memory log size, the memory limit, and whether a persisted memory file exists.
- Detailed Diagnostics: The new `--detailed-diagnostics` flag provides enhanced diagnostic output including a list of all memory session IDs.
- Memory Stats: The `--memory-stats` flag outputs statistics about the in-memory log.
- Merge Persisted Memory: The `--merge-persist` flag merges the current in-memory memory log with the persisted log, removing duplicates and adhering to the memory limit.
- Frequency Statistics: The `--frequency-stats` flag computes and outputs the frequency count of each command argument from the in-memory log.
- **Memory Expiration:** The `--expire-memory <minutes>` flag automatically removes memory log entries older than the specified number of minutes.
- **Detailed Memory Statistics:** The `--memory-detailed-stats` flag outputs detailed statistics including total count, earliest and latest timestamps, average interval between entries, and the most frequent command argument.

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

- **Export Memory Log (JSON):**
  ```bash
  node src/lib/main.js --export-memory
  ```

- **Export Memory Log (JSON) with Custom Filename:**
  ```bash
  node src/lib/main.js --export-memory custom_log.json
  ```

- **Export Memory Log in Compressed JSON Format:**
  ```bash
  node src/lib/main.js --export-memory compressed_log.json --compress
  ```

- **Export Memory Log in CSV Format:**
  ```bash
  node src/lib/main.js --export-csv
  ```
  This will export the memory log to a CSV file named `memory_export.csv` containing the columns: sessionId, timestamp, modified, args, tag, and annotation.

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

- **Update Memory Tag:**
  ```bash
  node src/lib/main.js --update-memory-tag <sessionId> newTag
  ```

- **Update Memory Annotation:**
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
  This command outputs detailed statistics about the memory log, including total count, earliest and latest timestamps, average interval between entries (in seconds), and the most frequent command argument.

## Contributing

Please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file for guidelines on contributing to this project.

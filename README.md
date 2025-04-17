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
- Log Size Limit: The memory logging feature now includes a size limit (default of 100 entries) to prevent unbounded log growth.
- Export Memory: The new `--export-memory` flag exports the current memory log to a file (default: `memory_export.json`).
- Import Memory: The new `--import-memory <filename>` flag imports a memory log from the specified file and replaces the current session’s memory with the imported data.
- Query Memory: The new `--query-memory <query>` flag allows users to filter the memory log entries based on a search term. Only those entries whose command arguments contain the specified query will be output.

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

- **Show Memory Log:**
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

- **Export Memory Log:**
  ```bash
  node src/lib/main.js --export-memory
  ```

- **Import Memory Log:**
  ```bash
  node src/lib/main.js --import-memory backup_memory.json
  ```

- **Query Memory Log:**
  ```bash
  node src/lib/main.js --query-memory test
  ```

The `--persist-memory` flag causes the current in-memory log of command arguments to be saved to a file named `memory.log` on disk, and the `--clear-memory` flag clears both the in-memory and persisted logs. The `--export-memory` flag writes the current log to `memory_export.json`, the `--import-memory <filename>` flag replaces the current memory log with the log from the provided file, and the `--query-memory <query>` flag filters the log entries by the specified search term.

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

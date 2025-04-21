# USAGE - repository0-crucible CLI Instructions

This document explains how to use the CLI tool provided by `repository0-crucible`.

## CLI Features

The CLI tool supports multiple features which can be invoked via different command line flags. Below is a summary of each feature along with its functionality and usage examples:

- **Help-Seeking Mode (`--help-seeking`)**:
  - Logs a message indicating that help is being sought.
  - **Example**: `node src/lib/main.js --help-seeking`

- **Replication Mode (`--replicate [count]`)**:
  - Executes task replication by logging messages for each replication task.
  - Defaults to replicating 3 tasks if an invalid or no count is provided.
  - If a valid positive integer is supplied, it replicates that many tasks.
  - **Examples**:
    - With default replication: `node src/lib/main.js --replicate param1`
    - With specified count: `node src/lib/main.js --replicate 5`

- **Asynchronous Replication Mode (`--replicate-async`)**:
  - Enhances the replication mode by running replication tasks concurrently.
  - Must be used in combination with the `--replicate` flag.
  - **Example**:
    ```bash
    node src/lib/main.js --replicate 5 --replicate-async
    ```

- **Planning Mode (`--plan`)**:
  - Logs planning messages that outline tasks to be performed (e.g., review configurations and prioritize enhancements).
  - **Example**: `node src/lib/main.js --plan`

- **Goal Decomposition (`--decompose [goal]`)**:
  - Outputs a goal decomposition report.
  - If a goal string is provided, the header includes the goal; otherwise, a default header is used.
  - Followed by a numbered list of sub-tasks (Define objectives, Identify key milestones, Assign responsibilities).
  - **Examples**:
    - Without a goal: `node src/lib/main.js --decompose`
    - With a goal: `node src/lib/main.js --decompose "Launch New Product"`

- **Self-Improvement Mode (`--self-improve`)**:
  - Computes and logs diagnostic metrics from the in-memory log including:
    - Total number of CLI invocations
    - First and latest invocation timestamps
    - Average execution time
    - Maximum and minimum execution times
    - Standard deviation of execution times
    - Median execution time
  - When combined with the `--verbose` flag, extended diagnostics are provided. These include:
    - Detailed per-invocation logs showing the arguments, precise timestamp, and execution duration for each CLI invocation.
  - **Enhanced Output:** All self-improvement diagnostic log lines are prefixed with `[Self-Improve]` for consistency.
  - **JSON Diagnostic Output:** If the `--diag-json` flag is used in conjunction with `--self-improve`, the CLI outputs the diagnostic metrics as a single JSON object instead of multiple text lines. The JSON object has the following keys:
    - `totalInvocations`
    - `firstInvocation`
    - `latestInvocation`
    - `averageExecutionTime`
    - `maximumExecutionTime`
    - `minimumExecutionTime`
    - `standardDeviation`
    - `medianExecutionTime`
  - **Examples**:
    - Basic diagnostics: `node src/lib/main.js --self-improve`
    - Extended diagnostics with verbose output: `node src/lib/main.js --self-improve --verbose`
    - JSON formatted diagnostics: `node src/lib/main.js --self-improve --diag-json`

- **Memory Logging and Reset (`--test-memory`, `--reset-log`)**:
  - Every CLI invocation is recorded in an in-memory log.
  - `--test-memory` is used to add a test entry (mainly for testing purposes).
  - `--reset-log` clears the current in-memory log **and deletes the persisted log file (`memory_log.json`)** to ensure a fresh state.
  - **Example**: `node src/lib/main.js --reset-log`

- **Persistent Logging (`--persist-log` and `--persist-file`)**:
  - `--persist-log` outputs the complete in-memory log as a JSON string to the console.
  - `--persist-file` writes the memory log to a file named `memory_log.json`.
  - **Persistence on Startup:** When the CLI tool starts, it automatically checks for an existing `memory_log.json` file. If found, it loads these entries into the in-memory log before processing the current invocation. This ensures continuity of diagnostic data across sessions.
  - **Examples**:
    - Persist to console: `node src/lib/main.js --persist-log`
    - Persist to file: `node src/lib/main.js --persist-file`
    - Subsequent runs will automatically load the persisted entries.

- **Version Details (`--version-details`)**:
  - **New Feature:** Immediately outputs a JSON-formatted object containing detailed environment information.
  - The output includes:
    - `nodeVersion`: The Node.js version (same as `process.version`).
    - `versions`: The complete `process.versions` object.
    - `appVersion`: The application version as defined in `package.json`.
  - When this flag is provided, the CLI bypasses all other functionalities and exits immediately after printing the JSON.
  - **Example**:
    ```bash
    node src/lib/main.js --version-details
    ```

- **Filter Log (`--filter-log <query>` or `--filter-log=<query>`)**:
  - **New Feature:** Filters the memory log entries based on a query string provided by the user.
  - The CLI will search the in-memory (and persisted) log for entries where any element of the `args` array contains the given query substring (case-insensitive).
  - The filtered log entries are output to the console in JSON format. If no entries match, an empty JSON array is returned.
  - Once filtering is performed, the program exits immediately, skipping further operations.
  - **Examples**:
    - Space-separated query: `node src/lib/main.js --filter-log test`
    - Assignment style: `node src/lib/main.js --filter-log=myQuery`

## Usage Examples

Below are some command-line examples demonstrating the usage of these features:

- **Help-Seeking Mode**:
  ```bash
  node src/lib/main.js --help-seeking
  ```
  Output:
  - Run with: ["--help-seeking"]
  - Help-Seeking Mode Enabled: querying assistance...
  - Execution time logged

- **Replication Mode (default)**:
  ```bash
  node src/lib/main.js --replicate param1
  ```
  Output:
  - Run with: ["--replicate", "param1"]
  - Replicating tasks (count: 3)...
  - Logs for 3 replication tasks
  - Execution time logged

- **Replication Mode (with count)**:
  ```bash
  node src/lib/main.js --replicate 5
  ```
  Output:
  - Run with: ["--replicate", "5"]
  - Replicating tasks (count: 5)...
  - Logs for 5 replication tasks
  - Execution time logged

- **Asynchronous Replication Mode**:
  ```bash
  node src/lib/main.js --replicate 5 --replicate-async
  ```
  Output:
  - Run with: ["--replicate", "5", "--replicate-async"]
  - Replicating tasks (count: 5)...
  - Logs for 5 replication tasks (order may vary due to concurrent execution)
  - Execution time logged

- **Planning Mode**:
  ```bash
  node src/lib/main.js --plan
  ```
  Output:
  - Run with: ["--plan"]
  - Planning Mode Engaged: Analyzing input for planning...
  - Planned tasks logged
  - Execution time logged

- **Goal Decomposition**:
  - Without a goal:
    ```bash
    node src/lib/main.js --decompose
    ```
    Output:
    - Run with: ["--decompose"]
    - Goal Decomposition Report:
    - Sub-tasks listed
    - Execution time logged

  - With a goal:
    ```bash
    node src/lib/main.js --decompose "Launch New Product"
    ```
    Output:
    - Run with: ["--decompose", "Launch New Product"]
    - Goal Decomposition Report: Launch New Product
    - Sub-tasks listed
    - Execution time logged

- **Self-Improvement Mode**:
  - Basic Diagnostics:
    ```bash
    node src/lib/main.js --self-improve
    ```
    Output:
    - Run with: ["--self-improve"]
    - Diagnostic metrics logged in human-readable format

  - Extended Diagnostics (Verbose Mode):
    ```bash
    node src/lib/main.js --self-improve --verbose
    ```
    Output:
    - Basic diagnostic metrics followed by detailed per-invocation logs prefixed with [Self-Improve] Detailed:

  - JSON Formatted Diagnostics:
    ```bash
    node src/lib/main.js --self-improve --diag-json
    ```
    Output:
    - A single JSON string containing the diagnostic metrics with keys: totalInvocations, firstInvocation, latestInvocation, averageExecutionTime, maximumExecutionTime, minimumExecutionTime, standardDeviation, and medianExecutionTime.

- **Persistent Logging**:
  - To output log as JSON:
    ```bash
    node src/lib/main.js --persist-log
    ```
  - To write log to file:
    ```bash
    node src/lib/main.js --persist-file
    ```
    Output:
    - Confirmation: "Memory log persisted to memory_log.json"
    - Subsequent runs load the persisted entries automatically.

- **Reset Log**:
  ```bash
  node src/lib/main.js --reset-log
  ```
  Output:
  - Memory log has been reset.
  - The persisted log file (`memory_log.json`) is deleted.

- **Version Details Flag**:
  - Outputs detailed environment information and exits immediately.
  - **Usage**:
    ```bash
    node src/lib/main.js --version-details
    ```
  - **Expected Output Example**:
    ```json
    {
      "nodeVersion": "v20.x.x",
      "versions": { /* process.versions object */ },
      "appVersion": "1.2.0-0"
    }
    ```

- **Filter Log Feature**:
  - Filters the memory log based on a query and outputs the filtered entries in JSON format, then exits immediately.
  - **Examples**:
    - Space-separated query:
      ```bash
      node src/lib/main.js --filter-log test
      ```
    - Assignment style:
      ```bash
      node src/lib/main.js --filter-log=myQuery
      ```
  - If no matching entries are found, the output will be an empty JSON array: `[]`.


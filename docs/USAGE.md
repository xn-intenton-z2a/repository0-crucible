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
    - **Median execution time**
  - When combined with the `--verbose` flag, extended diagnostics are provided. These include:
    - Detailed per-invocation logs showing the arguments, precise timestamp, and execution duration for each CLI invocation.
  - **Examples**:
    - Basic diagnostics: `node src/lib/main.js --self-improve`
    - Extended diagnostics with verbose output: `node src/lib/main.js --self-improve --verbose`

- **Memory Logging and Reset (`--test-memory`, `--reset-log`)**:
  - Every CLI invocation is recorded in an in-memory log.
  - `--test-memory` is used to add a test entry (mainly for testing purposes).
  - `--reset-log` clears the current in-memory log and outputs a confirmation message.
  - **Example**: `node src/lib/main.js --reset-log`

- **Persistent Logging (`--persist-log` and `--persist-file`)**:
  - `--persist-log` outputs the complete in-memory log as a JSON string to the console.
  - `--persist-file` writes the memory log to a file named `memory_log.json`.
  - **Examples**:
    - Persist to console: `node src/lib/main.js --persist-log`
    - Persist to file: `node src/lib/main.js --persist-file`

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
    - Execution time logged
    - Detailed diagnostics including total invocations, first and latest timestamps, average, maximum, minimum, standard deviation, and median execution times

  - Extended Diagnostics (Verbose Mode):
    ```bash
    node src/lib/main.js --self-improve --verbose
    ```
    Output:
    - All basic diagnostics as above
    - Plus detailed per-invocation logs, e.g., "Detailed Memory Log:" followed by individual entries with args, timestamp, and execution time

- **Persistent Logging**:
  - To output log as JSON:
    ```bash
    node src/lib/main.js --persist-log
    ```
  - To write log to file:
    ```bash
    node src/lib/main.js --persist-file
    ```
    Output for file persistence includes confirmation: "Memory log persisted to memory_log.json"

- **Reset Log**:
  ```bash
  node src/lib/main.js --reset-log
  ```
  Output:
  - Memory log has been reset.

## Incremental Changes Plan

The CLI enhancements detailed above align with our mission of building a self-improving, agentic system. In particular:

- **Self-Improvement Mode with Verbose Diagnostics**: Extends the basic diagnostic metrics by adding detailed per-invocation insights when the `--verbose` flag is provided. This includes exact execution times, detailed timestamps, and a complete rundown of each recorded invocation.

- **Replication and Persistent Logging**: These features support scalability and traceability of automation.

- **Planning, Goal Decomposition, and Memory Features**: Provide structure and continuity for comprehensive task automation.

Contributions that further develop these features or integrate them with broader workflows are highly encouraged.

# USAGE - repository0-crucible CLI Instructions

This document explains how to use the CLI tool provided by `repository0-crucible`.

## Features

- Memory Log: Records every CLI invocation in an in-memory log. When the `--persist-log` flag is used, the complete memory log is output as a JSON string. (Test: Run `node src/lib/main.js --persist-log` and verify the JSON log output.)
- Planning Mode: When the `--plan` flag is used, the tool analyzes the input and plans tasks, such as reviewing current configurations and prioritizing upcoming enhancements. (Test: Run `node src/lib/main.js --plan` and verify planning messages are logged.)
- Goal Decomposition: When the `--decompose` flag is provided, the application outputs a formatted goal decomposition report.
  - If no explicit goal is provided, it displays a header: "Goal Decomposition Report:" followed by a list of sub-tasks:
    1. Define objectives
    2. Identify key milestones
    3. Assign responsibilities
  - If a goal is provided (for example, `--decompose "Plan new product launch"`), the header will include the provided goal, e.g.: "Goal Decomposition Report: Plan new product launch", followed by the same list of sub-tasks.
- Self-Improvement: The `--self-improve` flag triggers extended diagnostics which now include the following metrics:
  - Total number of CLI invocations.
  - First invocation: The timestamp of the first CLI call (in ISO format).
  - Latest invocation: The timestamp of the most recent CLI call (in ISO format).
  - Average execution time computed from all invocations recorded in the memory log.
  - Maximum execution time observed across all CLI invocations.
  - Minimum execution time observed across all CLI invocations.
  - Standard deviation of execution times, providing a measure of performance consistency.
  - A self-improvement analysis message.
  (Test: Run `node src/lib/main.js --self-improve` and check that the output contains phrases like "Total invocations:", "First invocation:", "Latest invocation:", "Average execution time:", "Maximum execution time:", "Minimum execution time:", "Standard deviation execution time:", along with the analysis message.)
- Replication: The `--replicate` flag initiates a series of replication tasks. It now supports an optional numeric parameter immediately after the flag to define how many tasks to replicate.
  - If a valid positive integer is provided (e.g., `--replicate 5`), it will log that number of replication tasks.
  - If the parameter is missing or invalid, it defaults to 3 tasks for backward compatibility.
  (Test: Run `node src/lib/main.js --replicate` and `node src/lib/main.js --replicate 5` to verify the number of reported replication tasks.)
- Help-Seeking: The `--help-seeking` flag triggers a mode where the application outputs a message indicating that it is seeking help. (Test: Run `node src/lib/main.js --help-seeking` and check that the help-seeking message is logged.)
- Persist File: By using the `--persist-file` flag, the CLI will write the in-memory log to a file named `memory_log.json` in the current working directory. (Test: Run `node src/lib/main.js --persist-file` and verify that the file exists and contains the expected log data.)
- Reset Log: The new `--reset-log` flag clears the current in-memory log. This can be useful for troubleshooting or resetting the CLI state between sessions.
  (Test: Run `node src/lib/main.js --reset-log` and verify that the CLI outputs "Memory log has been reset." and that subsequent calls to retrieve the memory log return an empty array.)

## Enhanced Inline Documentation and Logging

The CLI source code (`src/lib/main.js`) now includes improved inline documentation for each flag handler. Each function is clearly commented to explain its purpose, expected behavior, and any pre/post conditions. In addition, logging messages have been refined to provide more context:

- **Help-Seeking Mode:** Logs a clear message that the application is in help-seeking mode.
- **Replication Mode:** Displays the number of replication tasks, either default (3) or as provided by the user.
- **Self-Improvement Mode:** Produces diagnostic output that reports total invocations, first and latest timestamps, average, maximum, minimum execution times, and the standard deviation.
- **Goal Decomposition:** Clearly prints the provided goal (if any) along with a numbered list of sub-tasks.
- **Reset Log:** Confirms that the in-memory log has been cleared.

These enhancements ensure that both developers and users can easily understand the operations being performed and benefit from detailed diagnostic outputs.

## Running the CLI

You can run the CLI by executing:

  node src/lib/main.js [arguments]

For example, to display help:

  node src/lib/main.js --help

The CLI logs the arguments provided in a JSON formatted string and then logs the execution time of the command in milliseconds.

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Invocation with a Help Argument:**
  ```bash
  node src/lib/main.js --help
  ```

- **Invocation with Multiple Arguments:**
  ```bash
  node src/lib/main.js param1 param2
  ```

- **Invocation with Replication Flag:**
  - Without specifying a task count (defaults to 3 tasks):
    ```bash
    node src/lib/main.js --replicate
    ```
    Output:
    Run with: ["--replicate"]
    Replicating tasks (count: 3)...
    Replicating task 1
    Replicating task 2
    Replicating task 3
    Execution time: X ms
  
  - With a specified task count (e.g., 5 tasks):
    ```bash
    node src/lib/main.js --replicate 5
    ```
    Output:
    Run with: ["--replicate","5"]
    Replicating tasks (count: 5)...
    Replicating task 1
    Replicating task 2
    Replicating task 3
    Replicating task 4
    Replicating task 5
    Execution time: X ms

- **Invocation with Help-Seeking Flag:**
  ```bash
  node src/lib/main.js --help-seeking
  ```
  Output:
  Run with: ["--help-seeking"]
  Help-Seeking Mode Enabled: querying assistance...
  Execution time: X ms

- **Invocation with Self-Improvement Flag:**
  ```bash
  node src/lib/main.js --self-improve
  ```
  Output includes detailed diagnostics:
  Self-Improvement Diagnostics:
  Total invocations: ...
  First invocation: ...
  Latest invocation: ...
  Average execution time: ... ms
  Maximum execution time: ... ms
  Minimum execution time: ... ms
  Standard deviation execution time: ... ms
  Self-improvement analysis: execution metrics are optimal

- **Invocation with Planning Flag:**
  ```bash
  node src/lib/main.js --plan
  ```
  Output:
  Run with: ["--plan"]
  Planning Mode Engaged: Analyzing input for planning...
  Planned Task 1: Review current configurations
  Planned Task 2: Prioritize upcoming feature enhancements
  Execution time: X ms

- **Invocation with Goal Decomposition Flag:**
  - Without an explicit goal:
    ```bash
    node src/lib/main.js --decompose
    ```
    Output:
    Run with: ["--decompose"]
    Goal Decomposition Report:
    1. Define objectives
    2. Identify key milestones
    3. Assign responsibilities
    Execution time: X ms
  
  - With an explicit goal:
    ```bash
    node src/lib/main.js --decompose "Plan new product launch"
    ```
    Output:
    Run with: ["--decompose","Plan new product launch"]
    Goal Decomposition Report: Plan new product launch
    1. Define objectives
    2. Identify key milestones
    3. Assign responsibilities
    Execution time: X ms

- **Invocation with Persist File Flag:**
  ```bash
  node src/lib/main.js --persist-file
  ```
  Output:
  Run with: ["--persist-file"]
  Execution time: X ms
  Memory log persisted to memory_log.json

- **Invocation with Reset Log Flag:**
  ```bash
  node src/lib/main.js --reset-log
  ```
  Output:
  Memory log has been reset.

## Testing

Run the tests using:

  npm test

This will execute the unit tests for the CLI to ensure it behaves as expected across various features.

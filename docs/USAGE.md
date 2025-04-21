# USAGE - repository0-crucible CLI Instructions

This document explains how to use the CLI tool provided by `repository0-crucible`.

## Features

- Memory Log: Records every CLI invocation in an in-memory log. When the `--persist-log` flag is used, the complete memory log is output as a JSON string. (Test: Run `node src/lib/main.js --persist-log` and verify the JSON log output.)
- Planning Mode: When the `--plan` flag is used, the tool analyzes the input and plans tasks, such as reviewing current configurations and prioritizing upcoming enhancements. (Test: Run `node src/lib/main.js --plan` and verify planning messages are logged.)
- Goal Decomposition: When the `--decompose` flag is provided, the application logs either a default goal or a user-specified goal along with a breakdown into objectives, milestones, and responsibilities. (Test: Run `node src/lib/main.js --decompose` or `node src/lib/main.js --decompose "Plan new product launch"`.)
- Self-Improvement: The `--self-improve` flag now triggers enhanced diagnostic logs that provide detailed performance metrics, including:
  - Total number of CLI invocations.
  - Average execution time computed from all invocations recorded in the memory log.
  - A self-improvement analysis message. (Test: Run `node src/lib/main.js --self-improve` and check that the output contains phrases like "Total invocations:" and "Average execution time:" along with the analysis message.)
- Replication: The `--replicate` flag initiates a series of replication tasks, simulating parallel processing by logging multiple replication steps. (Test: Run `node src/lib/main.js --replicate` and verify that replication steps are logged in order.)
- Help-Seeking: The `--help-seeking` flag triggers a mode where the application outputs a message indicating that it is seeking help. (Test: Run `node src/lib/main.js --help-seeking` and check that the help-seeking message is logged.)

## Running the CLI

You can run the CLI by executing:

  node src/lib/main.js [arguments]

For example, to display help:

  node src/lib/main.js --help

The CLI logs the arguments provided in a JSON formatted string and then logs the execution time of the command in milliseconds.

### Memory Feature

The CLI now retains an in-memory log of all invocations. Each time the CLI is invoked, the provided arguments along with a timestamp and the execution time are recorded. You can access this log programmatically using the `getMemoryLog()` function. For example:

```js
// Invoke the CLI tool
node src/lib/main.js --example

// In your code, get the memory log:
import { getMemoryLog } from 'repository0-crucible';
console.log(getMemoryLog());
```

### Default Invocation (No Arguments):

  node src/lib/main.js

  Output:
  Run with: []
  Execution time: X ms

### Invocation with a Help Argument:

  node src/lib/main.js --help

  Output:
  Run with: ["--help"]
  Execution time: X ms

### Invocation with Multiple Arguments:

  node src/lib/main.js param1 param2

  Output:
  Run with: ["param1","param2"]
  Execution time: X ms

### Invocation with Replication Flag:

  node src/lib/main.js --replicate

  Output:
  Run with: ["--replicate"]
  Replicating tasks...
  Replicating task 1
  Replicating task 2
  Replicating task 3
  Execution time: X ms

### Invocation with Help-Seeking Flag:

  node src/lib/main.js --help-seeking

  Output:
  Run with: ["--help-seeking"]
  Help-Seeking Mode Enabled: querying assistance...
  Execution time: X ms

### Invocation with Self-Improvement Flag:

  node src/lib/main.js --self-improve

  Output:
  Run with: ["--self-improve"]
  Execution time: X ms
  Total invocations: Y
  Average execution time: Z ms
  Self-improvement analysis: execution metrics are optimal

### Invocation with Planning Flag:

  node src/lib/main.js --plan

  Output:
  Run with: ["--plan"]
  Analyzing input for planning...
  Planned Task 1: Review current configurations
  Planned Task 2: Prioritize upcoming feature enhancements
  Execution time: X ms

### Invocation with Goal Decomposition Flag:

You can break down a high-level goal into sub-tasks using the decompose flag. If a goal is provided immediately after the flag, it will be used; otherwise, a default goal is assumed.

Example with a provided goal:

  node src/lib/main.js --decompose "Plan new product launch"

  Output:
  Run with: ["--decompose","Plan new product launch"]
  Decomposing goal: Plan new product launch
  1. Define objectives
  2. Identify key milestones
  3. Assign responsibilities
  Execution time: X ms

Example without a provided goal:

  node src/lib/main.js --decompose

  Output:
  Run with: ["--decompose"]
  Decomposing goal: [default goal]
  1. Define objectives
  2. Identify key milestones
  3. Assign responsibilities
  Execution time: X ms

### Invocation with Persist Log Flag

By adding the `--persist-log` flag, the CLI will output an additional line immediately after the execution time log. This line contains a JSON string representing the complete in-memory log of all CLI invocations. This is useful for persistent reporting and diagnostics.

Example:

  node src/lib/main.js --persist-log

  Output:
  Run with: ["--persist-log"]
  Execution time: X ms
  [ { "args": ["--persist-log"], "timestamp": "2025-04-21T00:00:00.000Z", "execTime": ... }, ... ]

## Testing

Run the tests using:

  npm test

This will execute the unit tests for the CLI to ensure it behaves as expected across various features.

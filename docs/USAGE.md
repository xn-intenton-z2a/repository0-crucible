# USAGE - repository0-crucible CLI Instructions

This document explains how to use the CLI tool provided by `repository0-crucible`.

## Running the CLI

You can run the CLI by executing:

  node src/lib/main.js [arguments]

For example, to display help:

  node src/lib/main.js --help

The CLI logs the arguments provided in a JSON formatted string and then logs the execution time of the command in milliseconds.

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
  Self-improvement analysis: execution metrics are optimal

### Invocation with Planning Flag:

  node src/lib/main.js --plan

  Output:
  Run with: ["--plan"]
  Analyzing input for planning...
  Planned Task 1: Review current configurations
  Planned Task 2: Prioritize upcoming feature enhancements
  Execution time: X ms

Planning Mode helps the agent break down its tasks into planned steps that can be reviewed before execution.

## Implementation Details

The CLI's main logic has been refactored for improved readability and maintainability. The flag-handling logic has been extracted into separate helper functions for help-seeking, replication, planning, and self-improvement along with the logging functionality. This separation of concerns ensures that the code is self-documenting and easier to maintain.

## Testing

Run the tests using:

  npm test

This will execute the unit tests for the CLI to ensure it behaves as expected, including logging of CLI arguments, replication messages, help-seeking messages, self-improvement diagnostics, and planning messages.

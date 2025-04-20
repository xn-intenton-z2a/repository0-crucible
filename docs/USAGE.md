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

Note: The replication logic has been refactored into a dedicated helper function for better maintainability and consistent logging.

## Testing

Run the tests using:

  npm test

This will execute the unit tests for the CLI to ensure it behaves as expected and logs the run arguments, replication messages (if applicable), and execution time.

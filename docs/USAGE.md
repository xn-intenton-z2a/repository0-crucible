# USAGE - repository0-crucible CLI Instructions

This document explains how to use the CLI tool provided by `repository0-crucible`.

## Running the CLI

You can run the CLI by executing:

  node src/lib/main.js [arguments]

For example, to display help:

  node src/lib/main.js --help

The CLI logs the arguments provided in a JSON formatted string.

## Examples

- **Default Invocation (No Arguments):**

  node src/lib/main.js

  Output:
  Run with: []

- **Invocation with a Help Argument:**

  node src/lib/main.js --help

  Output:
  Run with: ["--help"]

- **Invocation with Multiple Arguments:**

  node src/lib/main.js param1 param2

  Output:
  Run with: ["param1","param2"]

## Testing

Run the tests using:

  npm test

This will execute the unit tests for the CLI to ensure it behaves as expected.
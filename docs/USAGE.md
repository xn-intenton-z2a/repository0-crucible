# USAGE

This document explains how to use the CLI tool provided by the repository.

## Running the CLI

To execute the CLI tool, run the following command:

  node src/lib/main.js [options]

The CLI accepts command-line arguments to control its behavior.

## Options

### Feature Flag: demo

You can enable the demo feature by passing one of the following flags:

  --demo
  --enable-demo

When either of these flags is provided, the CLI will output the message:

  Feature demo enabled

### Feature Flag: demo verbose

In addition to the default demo mode, you can enable verbose mode by passing the following flag:

  --demo-verbose

When this flag is provided, the CLI will output two messages:

  1. Feature demo enabled
  2. Verbose mode is active

This mode is useful for additional logging details during execution.

### Default Behavior

If no feature flag is provided, the CLI will output the arguments passed, e.g.,

  Run with: []

## Example Commands

- Default run:

  node src/lib/main.js

- Enabling the demo feature:

  node src/lib/main.js --demo

  or

  node src/lib/main.js --enable-demo

- Enabling the demo feature with verbose mode:

  node src/lib/main.js --demo-verbose

## Additional Information

Refer to other documentation for more detailed usage and integration guidelines.

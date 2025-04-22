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

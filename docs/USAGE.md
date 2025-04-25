# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

- `--help`: Show help message and exit.
- `--version`: Show version information.
- `--agentic <data>`: Execute agentic commands with provided JSON data.
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information.
- `--capital-cities`: Display a list of capital cities from the ontology.

## Modular CLI Command Processing

The CLI command processing has been refactored for enhanced modularity, maintainability, and testability. The argument parsing and command routing logic now reside in a dedicated module: `src/orderParser.js`.

This module exposes two primary functions:

- `parseArgs(args)`: Analyzes the input arguments, validates supported flags, checks for required flag values (e.g., for `--agentic`), and returns a structured object. If an unknown flag or a missing value is encountered, it returns an error object.

- `processCommand(args)`: Routes the CLI command based on the parsed arguments. It handles the display of help messages, version info, simulation of agentic processing, and other flag-based behaviors.

Internally, the main CLI entry point (e.g., `src/lib/main.js`) invokes `processCommand`, ensuring that the CLI processing is neatly separated from other application logic.

## Examples

### Display Help

```bash
node src/lib/main.js --help
```

### Show Version

```bash
node src/lib/main.js --version
```

### Execute an Agentic Command

Provide a JSON payload with the command:

```bash
node src/lib/main.js --agentic '{"command": "doSomething"}'
```

### Simulate a Dry Run with Agentic Command

```bash
node src/lib/main.js --agentic '{"command": "doSomething"}' --dry-run
```

### Process Diagnostic Flags

```bash
node src/lib/main.js --diagnostics --capital-cities
```

## Error Handling

- If an unknown flag is provided, the CLI will output an error message and display the help instructions.
- If a flag that requires a value (e.g., `--agentic`) is missing one, an error message is shown along with the help text.

This modular approach not only simplifies the main execution flow but also facilitates easier unit testing and future enhancements.

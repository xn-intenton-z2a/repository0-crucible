# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

- `--help`: Show help message and exit.
- `--version`: Show version information along with a timestamp.
- `--agentic <data>`: Execute agentic commands with provided JSON data. Supports both a single command (e.g., `{ "command": "doSomething" }`) and batch commands (e.g., `{ "commands": ["cmd1", "cmd2"] }`).
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information including Node.js version and relevant environment variables.
- `--capital-cities`: Display a list of capital cities from the ontology. (Handled in main CLI logic)
- `--alias <data>`: Set an alias for a command using a JSON string that must contain an "alias" key. For example, `{ "alias": "myCommand" }`.

## CLI_PARSER Feature

The CLI parsing logic has been extracted into a dedicated function in `src/orderParser.js`. This function processes the command line arguments, validates input (including the new `--alias` flag), and returns a structured object containing the parsed flags and any errors.

### How It Works

- The parser iterates through the provided arguments and validates each flag.
- For flags that require a value (e.g., `--agentic` and `--alias`), the parser checks for the presence of a subsequent argument and, for `--alias`, attempts to parse it as JSON.
- If the JSON parsing fails or the JSON does not contain the required `alias` key, an appropriate error message is returned.
- The `--version` flag includes a timestamp indicating when the version was requested (handled separately in the CLI).

### Examples

**Display Help**

```bash
node src/lib/main.js --help
```

**Show Version with Timestamp**

```bash
node src/lib/main.js --version
```

**Execute an Agentic Command (Single Command)**

```bash
node src/lib/main.js --agentic '{ "command": "doSomething" }'
```

**Set an Alias Command**

```bash
node src/lib/main.js --alias '{ "alias": "myCommand" }'
```

**Simulate Execution**

```bash
node src/lib/main.js --dry-run
```

**Display Diagnostics**

```bash
node src/lib/main.js --diagnostics
```

The parser ensures that all required flags are provided with valid input and returns clear error messages if any issues are detected, including problems with the new `--alias` flag.

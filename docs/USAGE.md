# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

The CLI tool supports the following flags. The help message is generated dynamically based on a centralized flag definition list to promote consistency.

- `--help`: Show help message and exit.
- `--version`: Show version information.
- `--agentic <value>`: Execute agentic commands using provided JSON data. When the JSON contains a key like `commands`, it supports batch processing of commands.
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information.
- `--capital-cities`: Display a list of capital cities from the ontology.

## Extended CLI Argument Parsing

The CLI parser has been enhanced to provide robust argument parsing with the following capabilities:

- **Alias Support:** You can define command aliases via the `COMMAND_ALIASES` environment variable. This variable should contain a JSON string mapping short commands to their full flag equivalents.

  **Example:**

  ```bash
  export COMMAND_ALIASES='{"-h": "--help", "-v": "--version"}'
  node src/lib/main.js -h
  ```

  In this example, `-h` is automatically mapped to `--help`.

- **Batch Processing:** When the `--agentic` flag is used with a JSON payload that includes an array (using the key `commands`), the parser supports processing multiple commands in a single invocation.

  **Example:**

  ```bash
  node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
  ```

- **Error Handling:** The parser validates all flags. If an unknown flag is provided, or if a flag that requires a value (like `--agentic`) is missing one, a clear error message is returned along with the processed arguments.

## Usage

To invoke the CLI tool, you would run commands like the following:

### Display Help

```bash
node src/lib/main.js --help
```

### Show Version

```bash
node src/lib/main.js --version
```

### Execute an Agentic Command

Provide a JSON payload with the command or batch of commands:

```bash
node src/lib/main.js --agentic '{"command": "doSomething"}'
```

Or for batch processing:

```bash
node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
```

### Simulate a Dry Run

```bash
node src/lib/main.js --dry-run
```

### Using Command Aliases

Set the `COMMAND_ALIASES` environment variable to map your preferred shorthand to the full command flag:

```bash
export COMMAND_ALIASES='{"-h": "--help", "-v": "--version"}'
node src/lib/main.js -h
```

In this case, passing `-h` will be interpreted as `--help` by the CLI parser.

## Parser Design Overview

The CLI parser functionality has been refactored into a dedicated module (`src/orderParser.js`) to improve maintainability and test coverage. Key aspects include:

- A centralized flag definition list that includes each supported flag and its expected behavior.
- Dynamic alias mapping based on the `COMMAND_ALIASES` environment variable.
- Batch processing capability for commands provided as an array in JSON.
- Rigorous validation of CLI arguments with clear error messages.

Contributors are encouraged to review `src/orderParser.js` for further enhancements or additional flag support.
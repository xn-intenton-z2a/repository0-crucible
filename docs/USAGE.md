# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

The CLI tool supports the following flags. The help message is generated dynamically based on a centralized flag definition list to promote consistency.

- `--help`: Show help message and exit.
- `--version`: Show version information.
- `--agentic <value>`: Execute agentic commands using provided JSON data.
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information.
- `--capital-cities`: Display a list of capital cities from the ontology.

## Usage

When invoking the CLI tool, arguments are parsed and validated. If an unknown flag is provided or a flag expecting a value is missing one, an error is shown along with the help message.

### Display Help

```bash
node src/lib/main.js --help
```

This command will output the dynamically generated help message listing all available flags and their descriptions.

### Show Version

```bash
node src/lib/main.js --version
```

### Execute an Agentic Command

Provide a JSON payload with the command:

```bash
node src/lib/main.js --agentic '{"command": "doSomething"}'
```

### Simulate a Dry Run

```bash
node src/lib/main.js --dry-run
```

### Display Diagnostics

```bash
node src/lib/main.js --diagnostics
```

### Display Capital Cities

```bash
node src/lib/main.js --capital-cities
```

## Parser Design Overview

The CLI parser functionality has been refactored into a dedicated module (`src/orderParser.js`) to improve maintainability, clarity, and test coverage. Key aspects include:

- A centralized flag definition list that contains each flag, its description, and whether it expects a value.
- Dynamic generation of the help message to reflect all available flags and their usage.
- Rigorous validation of CLI arguments with clear error messages for unknown flags or missing flag values.

Contributors are encouraged to review the parser module for further enhancements or additional flag support.
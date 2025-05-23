docs/USAGE.md
# docs/USAGE.md
# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

- `--help`: Show help message and exit.
- `--version`: Show version information.
- `--agentic <data>`: Execute agentic commands with provided JSON data.
  - The JSON string must contain either:
    - A `command` property with a string value
    - Or a `commands` property with an array of strings
  - When used with the `--dry-run` flag, the command execution is simulated without side effects.
- `--alias <data>`: Set an alias using the provided JSON data.
  - The JSON string must contain an `alias` property with a string value. 
  - Example: `node src/lib/main.js --alias '{"alias": "myCommand"}'`
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information including Node.js version and relevant environment variables.
- `--capital-cities`: Display a list of capital cities from the ontology.

## Examples

**Display Help**

```bash
node src/lib/main.js --help
```

**Show Version**

```bash
node src/lib/main.js --version
```

**Execute an Agentic Command (Single Command)**

```bash
node src/lib/main.js --agentic '{"command": "doSomething"}'
```

**Execute Batch Agentic Commands**

```bash
node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
```

**Set an Alias**

```bash
node src/lib/main.js --alias '{"alias": "myCommand"}'
```

**Simulate Execution with Dry Run**

```bash
node src/lib/main.js --agentic '{"command": "doSomething"}' --dry-run
```

**Display Diagnostics**

```bash
node src/lib/main.js --diagnostics
```

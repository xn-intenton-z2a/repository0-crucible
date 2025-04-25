# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

- `--help`: Show help message and exit.
- `--version`: Show version information along with a timestamp.
- `--agentic <data>`: Execute agentic commands with provided JSON data.
  - For a single command, provide a JSON string with the property `"command"` as a string.
    
    Example:
    
    ```bash
    node src/lib/main.js --agentic '{"command": "doSomething"}'
    ```
  
  - For batch commands, provide a JSON string with the property `"commands"` as an array of strings.
    
    Example:
    
    ```bash
    node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
    ```
  
  - When used with the `--dry-run` flag, execution is simulated without performing the actual operations.
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information including Node.js version and relevant environment variables.
- `--capital-cities`: Display a list of capital cities from the ontology.

## Examples

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
node src/lib/main.js --agentic '{"command": "doSomething"}'
```

**Execute Batch Agentic Commands**

```bash
node src/lib/main.js --agentic '{"commands": ["cmd1", "cmd2"]}'
```

**Simulate Execution**

```bash
node src/lib/main.js --agentic '{"command": "doSomething"}' --dry-run
```

**Display Diagnostics**

```bash
node src/lib/main.js --diagnostics
```

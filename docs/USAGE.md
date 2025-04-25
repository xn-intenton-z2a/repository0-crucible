# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

- `--help`: Displays this help message along with usage examples.
- `--version`: Outputs the current version of the CLI tool.
- `--agentic <data>`: Executes agentic commands using provided JSON data. Example:
  ```bash
  node src/lib/main.js --agentic '{"command": "doSomething"}'
  ```
- `--dry-run`: Simulates command execution without applying any changes.
- `--diagnostics`: Provides diagnostic information such as configuration details and environment variables.
- `--capital-cities`: Displays information about capital cities from the ontology.

## Usage Examples

### Display Help
```bash
node src/lib/main.js --help
```

### Show Version
```bash
node src/lib/main.js --version
```

### Execute an Agentic Command
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

## Error Handling

- **Unknown Flags**: If an unknown flag is provided (e.g., `--invalid`), the CLI will output an error message followed by the help message.
- **Missing Values**: For flags that require a value (like `--agentic`), if the value is missing, an error message is displayed along with the help message.

This design ensures that users are guided towards correct usage and provided with clear, descriptive error messages when an issue is detected.

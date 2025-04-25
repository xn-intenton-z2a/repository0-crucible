# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available.

## Supported Flags

The CLI tool supports the following flags:

- `--help`: Show help message and exit.
- `--version`: Show version information.
- `--agentic <value>`: Execute agentic commands using provided JSON data. When the JSON contains a key like `commands`, it supports batch processing of commands.
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information.
- `--capital-cities`: Display a list of capital cities from the ontology.

## Extended CLI Argument Parsing

With the recent refactor, the CLI argument parsing has been moved into a dedicated module:

### Order Parser Module

The module located at `src/orderParser.js` exports a `parseArgs` function that handles argument validation and processing. Its features include:

- **Help and Version Handling:** Returns appropriate help or version information when `--help` or `--version` are provided.
- **Flag Validation:** Checks for unknown flags and verifies that flags requiring a value (e.g., `--agentic`) are provided with one.
- **Processed Flags Output:** Returns a structured object containing the active flags and a message for further processing or display.

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

### Using the Order Parser Module in Custom Scripts

You can also import and use the `parseArgs` function directly in your Node.js scripts for custom CLI implementations:

```javascript
import { parseArgs } from "@src/orderParser.js";

const args = process.argv.slice(2);
const result = parseArgs(args);

if (result.error) {
  console.error(result.error);
  console.log(result.message);
  process.exit(1);
}

console.log(result.message);
```

This modular approach promotes reusability and simplifies testing of the CLI argument parsing logic.

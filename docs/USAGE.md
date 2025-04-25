# CLI Usage Documentation

This document details the command line interface (CLI) for the tool and outlines the various flags available, including the new alias substitution feature.

## Supported Flags

The CLI tool supports the following flags:

- `--help`: Show help message and exit.
- `--version`: Show version information.
- `--agentic <data>`: Execute agentic commands using provided JSON data. When the JSON contains a key like `commands`, it supports batch processing of commands.
- `--dry-run`: Simulate command execution without making changes.
- `--diagnostics`: Display diagnostic information.
- `--capital-cities`: Display a list of capital cities from the ontology.
- `--verbose`: Enable detailed logging.
- `--status`: Show runtime health summary.
- `--digest`: Trigger sample digest processing.
- `--simulate-error`: Simulate an error and exit with a non-zero code.
- `--simulate-delay <ms>`: Delay execution by specified milliseconds.
- `--simulate-load <ms>`: Execute a CPU intensive loop for specified milliseconds.
- `--apply-fix`: Apply automated fixes.
- `--cli-utils`: Display a complete summary of CLI commands.

## Alias Substitution and Robust Flag Parsing

The CLI now supports alias substitution and enhanced flag parsing via the `COMMAND_ALIASES` environment variable. This variable should be set to a valid JSON string mapping alias names to their canonical flag names. For example:

```bash
export COMMAND_ALIASES='{ "ls": "help", "rm": "version" }'
```

When an alias is used (e.g., `--ls`), the tool substitutes it with its canonical form (`--help` in the above example) before processing.

Additionally, extra whitespace around arguments is trimmed, and the parser checks for:

- Unknown or unrecognized flags (after alias substitution).
- Missing required flag values (e.g., when `--agentic` is provided without a subsequent argument).
- Malformed inputs, such as inputs that are exactly "NaN".

Appropriate error messages and the help message will be displayed for any invalid input.

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

### Using Aliases

With the alias feature enabled, you can use abbreviated commands. For example, if you set the following:

```bash
export COMMAND_ALIASES='{ "ls": "help" }'
```

Then running:

```bash
node src/lib/main.js --ls
```

will be interpreted as:

```bash
node src/lib/main.js --help
```

### Simulate a Dry Run

```bash
node src/lib/main.js --dry-run
```

This modular approach, now including the alias substitution via the new orderParser module, promotes reusability and simplifies testing of the CLI argument parsing logic.

# CLI Usage

The CLI supports the following top-level flags for introspecting the project:

## --mission

Prints the project's mission statement from `MISSION.md`:

```bash
node src/lib/main.js --mission
```

## --features

Lists all available feature specification files in the `features/` directory:

```bash
node src/lib/main.js --features
```

## Default Behavior

If neither flag is provided, the CLI will echo the provided arguments:

```bash
node src/lib/main.js --help
# Run with: ["--help"]
```

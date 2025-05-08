# repository0-crucible CLI Documentation

This documentation describes the only implemented functionality of the `repository0-crucible` CLI tool.

## Feature

- **Argument echo**: prints provided command-line arguments to the console.

## Usage

Run the CLI with any arguments:

```bash
node src/lib/main.js [args...]
```

### Examples

```bash
# Echo two arguments:
node src/lib/main.js foo bar
# Output:
Run with: ["foo","bar"]

# Using npm script:
npm run start -- alpha beta gamma
# Output:
Run with: ["alpha","beta","gamma"]
```

No other flags or options are currently supported.

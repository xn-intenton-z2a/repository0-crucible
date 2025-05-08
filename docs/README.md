# repository0-crucible CLI Documentation

This documentation describes the only implemented functionality of the `repository0-crucible` CLI tool.

## Features

- **Argument echo**: logs provided command-line arguments to the console.

## Usage

To run the CLI tool and see the argument echo feature in action, invoke it with any arguments:

```bash
node src/lib/main.js hello world
```

You should see the following output:

```bash
Run with: ["hello","world"]
```

No other command-line flags or options are currently supported.
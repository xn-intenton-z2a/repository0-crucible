# repository0-crucible

`repository0-crucible` is a CLI application that outputs random facial expressions using ASCII art, serving as an emotional feedback mechanism for an AI agent. It also showcases automated CI/CD workflows imported from intentïon [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib).

To create a self-evolving agentic coding system of your own based on this one, see https://github.com/xn-intenton-z2a/agentic-lib.

This README will continue to evolve as this project grows.

## Installation

Install globally via npm:

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

Or install locally:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

- **Random Mode (default)**: Prints one random ASCII face
- **List Mode** (`--list`): Prints all available face names in alphabetical order
- **Named Mode** (`--name <face>` or `-n <face>`): Prints the specified ASCII face

## Usage

After installation, you can invoke the CLI directly or via Node:

```bash
repository0-crucible
# or
node src/lib/main.js
```

### Random Mode

```bash
repository0-crucible
```

Prints one random face, e.g.:
```
(◕‿◕)
```

### List Mode

```bash
repository0-crucible --list
```

Prints all face names:
```
frown
smile
surprised
wink
```

### Named Mode

```bash
repository0-crucible --name wink
# or
repository0-crucible -n smile
```

Prints the specified face:
```
(;^_^)
```

If an invalid name is given, the CLI prints an error and exits with code 1:
```
Error: 'foo' is not a valid face name.
```

## CLI Options

- `--list`        List all available face names
- `--name`, `-n`  Select a specific face by name

## Development

- Run tests:
  ```bash
  npm test
  ```
- Quick start:
  ```bash
  npm run start
  ```

## Incremental Changes Plan

- v1.0.0: Release ASCII_FACE feature with random, list, and named modes

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
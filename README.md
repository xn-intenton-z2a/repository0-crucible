# repository0-crucible

`repository0-crucible` is a simple CLI tool that outputs random ASCII art facial expressions for emotional feedback.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- **--face**        Display a random ASCII face
- **--config <path>**  Load additional faces from a JSON or YAML config file
- **--help**        Show help message

## Usage

### Show help

```bash
node src/lib/main.js --help
```

### Display a random face

```bash
node src/lib/main.js --face
# Outputs a random face, e.g. (^_^)
```

### Load custom faces

```bash
node src/lib/main.js --face --config path/to/faces.yaml
# Outputs a random face from built-in and custom lists
```

## NPM Scripts

- **start**: `npm run start` (invokes `node src/lib/main.js`)
- **test**: `npm test` (runs unit tests via Vitest)

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)) .
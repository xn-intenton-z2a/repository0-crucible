# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see https://github.com/xn-intenton-z2a/agentic-lib

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- `--face`            Display a random ASCII face
- `--count`, `-c`     Number of faces to output (default: 1)
- `--config`          Load additional faces from a YAML or JSON file
- `--theme`, `-t`     Select a predefined face theme (`happy`, `sad`, `surprised`)
- `--serve`, `-s`     Start HTTP server mode
- `--port`, `-p`      Specify server port (default: 3000)
- `--help`, `-h`      Show help message

## Usage

### Single face
```bash
node src/lib/main.js --face
```

### Batch faces
```bash
node src/lib/main.js --face --count 3
```

### Theme selection
```bash
node src/lib/main.js --face --theme happy -c 2
```

### Custom config
```bash
node src/lib/main.js --face --config faces.yaml
```

### HTTP server
```bash
node src/lib/main.js --serve --port 8080
```

## Incremental Changes Plan

This section will track forthcoming improvements and feature enhancements.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
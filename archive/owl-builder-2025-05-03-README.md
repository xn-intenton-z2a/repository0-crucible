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

- **-h, --help** — Show usage instructions and exit
- **-v, --version** — Print the current version and exit
- **--faces <path>** — Load custom face set from YAML
- **--seed <number>** — Deterministic face selection
- **--count <n>** — Number of faces to output (default 1)

## Usage

Run the CLI tool with the desired options:

```bash
node src/lib/main.js [options]
```

### Examples

Default invocation:
```bash
node src/lib/main.js
```

Custom faces with count:
```bash
node src/lib/main.js --faces custom_faces.yaml --count 3
```

Deterministic seed with count:
```bash
node src/lib/main.js --seed 10 --count 2
```

Help flag:
```bash
node src/lib/main.js --help
```

Version flag:
```bash
node src/lib/main.js --version
```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
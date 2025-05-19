# repository0-crucible

`repository0-crucible` is a demo repository that showcases reusable GitHub workflows imported from the intentïon [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to serve as a template for building customized CI/CD workflows and a minimal CLI framework.

To learn how to build your own self-evolving agentic coding system based on this template, see https://github.com/xn-intenton-z2a/agentic-lib

## Repository Template

This repository provides:

* **Workflow Templates** – Example CI/CD workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib).
* **Demo CLI** – A minimal command-line interface that prints the arguments you pass in.
* **NPM Scripts** – Common tasks like build, test, start, serve, formatting, and linting.

## Installation

Install dependencies via npm:

```bash
npm install
```

## Features

- **Workflow Templates**: Preconfigured CI/CD workflows demonstrating best practices.
- **Demo CLI**: A placeholder CLI (`src/lib/main.js`) that logs provided arguments for extension.
- **NPM Scripts**: Ready-to-use scripts for building, testing, formatting, linting, and more.

## Usage

Detailed usage instructions are available in the [docs/USAGE.md](./docs/USAGE.md) file.

### Quick Start

Run the demo CLI without arguments (logs an empty array):

```bash
npm run start
# or:
node src/lib/main.js
```

Pass custom arguments to the CLI:

```bash
npm run start -- --exampleFlag value1 value2
# or:
node src/lib/main.js --foo bar baz
```

List of useful npm scripts:

- `npm run build`        – Placeholder build command.
- `npm run test`         – Run unit tests with Vitest.
- `npm run start`        – Invoke the CLI demo.
- `npm run serve`        – Invoke the CLI demo with a `--serve` flag.
- `npm run linting`      – Check code style with ESLint.
- `npm run formatting`   – Check formatting with Prettier.

## Incremental Changes Plan

This template is a living document. Future sections will expand with real CLI commands, HTTP APIs, and feature implementations.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
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

* **PI Calculator**: compute π digits via two algorithms (Spigot, Chudnovsky) or extract hex digits (BBP), output as text or PNG, with diagnostics and high-precision support.
* **Benchmarking Mode**: measure performance of Spigot, Chudnovsky, and BBP algorithms over multiple digit sizes with text, CSV, or PNG reports.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

Refer to [docs/PI_CALCULATOR.md](docs/PI_CALCULATOR.md) for detailed usage and examples.

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
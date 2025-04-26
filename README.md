# repository0-crucible

`repository0-crucible` is a demo repository and minimal CLI tool that showcases automated CI/CD workflows imported from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib). It currently provides a simple command-line interface for logging passed arguments and lays the groundwork for future features.

To create a self-evolving agentic coding system of your own based on this project, see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme will evolve into comprehensive documentation as the JavaScript library grows from the seed files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) that hand off to reusable workflows.

See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-crucible
```

## Features

* **CLI Argument Logging**: Prints an array of provided arguments to the console.
* **Programmatic API**: Exposes a `main(args: string[])` function for embedding the tool in other scripts.

## Usage

For detailed instructions, see [docs/USAGE.md](./docs/USAGE.md).

### Quick Start

Run with no arguments:

```bash
npm run start
# => Run with: []
```

Pass arguments to see them logged:

```bash
node src/lib/main.js hello world
# => Run with: ["hello","world"]
```

Call via npm script:

```bash
npm run start -- foo bar
# => Run with: ["foo","bar"]
```

Invoke programmatically in code:

```js
import { main } from '@xn-intenton-z2a/repository0-crucible';
main(['one', 'two']);  // Logs: Run with: ["one","two"]
```

## Incremental Changes Plan

* Enhance CLI with real-world commands (e.g., `--help`, `--diagnostics`, `--serve`).
* Implement core features as outlined in [MISSION.md](./MISSION.md).
* Expand API and add tests for new functionality.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds](./seeds).

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

- CLI Tool for running commands with argument output.
- Memory Logging: The CLI tool now retains a log of command arguments from each invocation. This in-memory log provides action continuity and can be displayed using the `--show-memory` flag. Programmatically, you can access the log using the `getMemory()` function.
- Persistence: With the new `--persist-memory` flag, the tool now saves the memory log to a file called `memory.log`, ensuring the log is retained across separate invocations.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Show Memory Log:**
  ```bash
  node src/lib/main.js --show-memory
  ```

- **Persist Memory Log:**
  ```bash
  node src/lib/main.js --persist-memory
  ```

The `--persist-memory` flag causes the current in-memory log of command arguments to be saved to a file named `memory.log` on disk.

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

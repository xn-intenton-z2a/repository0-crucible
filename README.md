# repository0-crucible

`repository0-crucible` is a lightweight demo CLI tool (and JavaScript library) that currently implements a simple argument echo feature. Its primary purpose is to showcase automated CI/CD workflows and provide a foundation for extending CLI capabilities.

To explore the self-evolving agentic coding system that powers these workflows, see [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib).

## Repository Template

This repository serves as a template and example implementation, including:

* A starting point for new CLI projects.
* Demonstration of GitHub workflows imported from [agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib).
* A simple, functional CLI command to echo arguments.

## Installation

Install dependencies locally:

```bash
npm install
```

Optionally install globally:

```bash
npm install -g @xn-intenton-z2a/repository0-crucible
```

## Features

- **Argument echo**: logs provided command-line arguments to the console.

## Usage

Invoke the CLI tool directly with any arguments:

```bash
node src/lib/main.js hello world
# Output: Run with: ["hello","world"]
```

Or via the built-in npm script (arguments must follow `--`):

```bash
npm run start -- foo bar
# Output: Run with: ["foo","bar"]
```

### Other available scripts

- **npm run build**: No build step; placeholder.
- **npm test**: Runs unit tests with Vitest.
- **npm run serve**: Placeholder for future HTTP server support.

## Incremental Changes Plan

This project will evolve to include additional π computation features (benchmarking, reporting, progress bars, HTTP API, caching, etc.). See the `features/` directory for detailed proposals on each upcoming capability.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on reporting issues, submitting pull requests, and updating documentation.

## License

Released under the MIT License. See [LICENSE](./LICENSE) for details.

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

* π Calculation: Calculate π to a specified number of decimal places using the Leibniz series algorithm.
  - `--digits <number>`: Number of decimal places (default: 5).
  - `--algorithm <string>`: Calculation method (default: "leibniz").
  - `--diagnostics`: Outputs a JSON object with execution diagnostics (algorithm, parameters, durationMs, iterations/samplesUsed, and result).

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

### π Calculation

Calculate π to 10 decimal places:

```bash
node src/lib/main.js --digits 10
# Outputs: 3.1415926536
```

Specify the algorithm (currently supports "leibniz"):

```bash
node src/lib/main.js --digits 5 --algorithm leibniz
# Outputs: 3.14159
```

### Example Commands

- **Default Demo Output:**

  ```bash
  npm run start
  # Outputs: 3.14159
  ```

### Diagnostics

```bash
node src/lib/main.js --digits 5 --diagnostics
# Outputs: { algorithm: 'leibniz', digits: 5, result: 3.14159, durationMs: 12, iterations: 200000 }
```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).
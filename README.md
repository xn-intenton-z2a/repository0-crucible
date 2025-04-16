# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on the seed CONTRIBUTING files in [./seeds](./seeds).

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

TODO: Add features here.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

When running with unrecognized inputs, the tool displays an error message guiding the user to use the `--help` flag for available options:

```bash
node src/lib/main.js [unrecognized-options]
# Output: Error: Unrecognized input ["option"]. Use '--help' for available options.
```

Note: Inputs such as 'NaN' are also considered non-standard and will trigger the same error message instructing the user to use the '--help' flag for available options.

### CLI Options

- **Display Help:**
  ```bash
  node src/lib/main.js --help
  ```
  Displays a detailed help message listing all available CLI options.

- **Display Version:**
  ```bash
  node src/lib/main.js --version
  ```
  Dynamically reads and displays the current application version from package.json.

- **Run Diagnostics:**
  ```bash
  node src/lib/main.js --diagnostics
  ```
  Shows basic diagnostics including Node version, executable path, working directory, and environment variables.

- **Run Extended Diagnostics:**
  ```bash
  node src/lib/main.js --extended-diagnostics
  ```
  Provides extended diagnostics information such as memory usage, process uptime, and platform details.

- **Self-Refinement Analysis:**
  ```bash
  node src/lib/main.js --self-refine
  ```
  Initiates a self-refinement analysis, outputting a message that the process is in progress.

- **Refresh Application State:**
  ```bash
  node src/lib/main.js --refresh
  ```
  Refreshes the application state and outputs a confirmation message.

- **Merge and Persist Changes:**
  ```bash
  node src/lib/main.js --merge-persist
  ```
  Initiates a merge and persist operation, displaying a merge confirmation message.

- **Start Server:**
  ```bash
  node src/lib/main.js --serve
  ```
  Starts the server and prints a startup message.

- **Build with Intermediate Options:**
  ```bash
  node src/lib/main.js --build-intermediate
  ```
  Executes a build using intermediate options, providing a corresponding message.

- **Build with Enhanced Options:**
  ```bash
  node src/lib/main.js --build-enhanced
  ```
  Executes a build using enhanced options, providing a corresponding message.

- **Echo Arguments:**
  ```bash
  node src/lib/main.js --echo arg1 arg2
  ```
  Outputs the provided arguments (excluding '--echo') in a structured JSON format.

- **Memory Logging:**
  ```bash
  node src/lib/main.js --memory
  ```
  Displays an in-memory log of all CLI invocations along with timestamps.

- **Help-Seeking:**
  ```bash
  node src/lib/main.js --help-seeking
  ```
  Activates help-seeking mode, indicating that external assistance is being consulted.

- **Default Output for Unrecognized Inputs:**
  When invoking the CLI with unrecognized arguments, the tool will display an error message indicating that the input is unrecognized and instructing the user to use the `--help` flag for available options.

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

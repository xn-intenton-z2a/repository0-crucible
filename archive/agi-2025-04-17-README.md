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

The CLI tool provides the following features:

- Display help instructions with `--help`.
- Dynamically show the application version using `--version`.
- Show basic system diagnostics with `--diagnostics`.
- Display extended diagnostics including memory usage and uptime with `--extended-diagnostics`.
- Perform self-refinement analysis using `--self-refine`.
- Initiate planning and goal decomposition with `--plan`.
- Refresh the application state with `--refresh`.
- Merge and persist changes with `--merge-persist`.
- Start the server using `--serve`.
- Build with intermediate options using `--build-intermediate`.
- Build with enhanced options using `--build-enhanced`.
- Echo provided arguments in JSON format with `--echo`.
- Display an in-memory log of CLI invocations using `--memory`.
- Activate help-seeking mode with `--help-seeking`.

## Handling Unrecognized Commands and Inputs

The CLI tool is designed to handle any unrecognized commands by outputting a standardized error message. If an input does not match any of the recognized flags, the tool outputs an error message in the following format:

```bash
Error: '<input>' is not a recognized command. Use '--help' for available options.
```

Note: Inputs such as 'NaN' and other unusual or malformed strings are treated as unrecognized commands and will trigger the standard error message. For example, if you run:

```bash
node src/lib/main.js NaN
```

The output (sent to stderr) will be:

```bash
Error: 'NaN' is not a recognized command. Use '--help' for available options.
```

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

When running with unrecognized inputs, the tool uses a standardized error handling mechanism. For example:

```bash
node src/lib/main.js invalid-flag
# Output (sent to stderr): Error: 'invalid-flag' is not a recognized command. Use '--help' for available options.
```

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

- **Planning and Goal Decomposition:**
  ```bash
  node src/lib/main.js --plan
  ```
  Initiates planning by generating an execution plan based on the current state.

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

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

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

TODO: Add features here.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

When running without the `--help` flag, the tool prints the arguments it receives:

```bash
node src/lib/main.js [options]
```

### CLI Options

- **Display Help:**
  ```bash
  node src/lib/main.js --help
  ```

- **Display Version:**
  ```bash
  node src/lib/main.js --version
  ```
  This flag displays the current application version dynamically read from package.json.

- **Run Diagnostics:**
  ```bash
  node src/lib/main.js --diagnostics
  ```
  This flag displays diagnostic information including Node version, executable path, current working directory, and environment variables.

- **Run Extended Diagnostics:**
  ```bash
  node src/lib/main.js --extended-diagnostics
  ```
  This flag displays additional diagnostic information including memory usage, process uptime, and the process platform.

- **Self-Refinement Analysis:**
  ```bash
  node src/lib/main.js --self-refine
  ```
  This flag triggers a self-refinement analysis, demonstrating the agent's ability to self-improve by outputting a message indicating that such an analysis is in progress.

- **Refresh Application State:**
  ```bash
  node src/lib/main.js --refresh
  ```
  This flag triggers a refresh of the application state and displays a refresh message.

- **Merge and Persist Changes:**
  ```bash
  node src/lib/main.js --merge-persist
  ```
  This flag initiates a merge and persist operation. Currently, it prints a confirmation message indicating that the merge and persist process has been initiated.

- **Start Server:**
  ```bash
  node src/lib/main.js --serve
  ```
  This flag starts the server and prints "Starting server...".

- **Build with Intermediate Options:**
  ```bash
  node src/lib/main.js --build-intermediate
  ```
  This flag builds the application with intermediate options and prints "Building with intermediate options...".

- **Build with Enhanced Options:**
  ```bash
  node src/lib/main.js --build-enhanced
  ```
  This flag builds the application with enhanced options and prints "Building with enhanced options...".

- **Echo Arguments:**
  ```bash
  node src/lib/main.js --echo arg1 arg2
  ```
  This flag outputs the received command-line arguments (excluding the '--echo' flag) in a structured JSON format, for example:

  ```json
  { "echo": ["arg1", "arg2"] }
  ```

- **Memory Logging:**
  ```bash
  node src/lib/main.js --memory
  ```
  This flag displays an in-memory log of all command invocations with timestamps, providing a basic demonstration of the Memory feature.

- **Help-Seeking:**
  ```bash
  node src/lib/main.js --help-seeking
  ```
  This flag activates help-seeking mode, outputting a message that indicates the system is consulting external assistance.

- **Default Demo Output:**
  ```bash
  npm run start
  ```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

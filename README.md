# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate a unified automated CLI tool with robust argument conversion and a flexible plugin architecture.

To create a self-evolving agentic coding system of your own based on this one, see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This repository provides a unified project identity under the name repository0-crucible.

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation showcasing automated CLI argument conversion, plugin architecture, and advanced CI/CD workflows.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

* Automated conversion of CLI arguments: Numeric strings like "42" or "3.14" are automatically converted to numbers, boolean strings like "true" or "false" are converted to booleans, while non-numeric strings are trimmed and returned.
* Special Handling for 'NaN': By default, the CLI tool preserves any case variation of the string 'NaN' (e.g., "NaN", "nan", "NAN") for clarity. To convert any variation of 'NaN' to numeric NaN, use the --native-nan flag, set the environment variable NATIVE_NAN to "true", or create a configuration file named .repositoryConfig.json with the property { "nativeNan": true }.
* ISO 8601 Date Parsing: ISO formatted date strings are automatically converted to JavaScript Date objects if valid.
* JSON Conversion: CLI arguments that begin with `{` or `[` are automatically parsed as JSON objects or arrays if valid.
* Consistent Default Argument Handling: The CLI tool now defaults to an empty arguments array if no inputs are provided, ensuring consistent behavior between production and tests.
* Demonstration of automated CI/CD workflows for code regeneration and testing.
* Unified Plugin Architecture: Extend functionality by registering plugins to transform or analyze the CLI output using the `--use-plugins` flag.

## Configurable 'NaN' Handling

Users can control how the string 'NaN' is processed by the CLI tool. By default, 'NaN' is preserved as a string. However, you can enable conversion to numeric NaN:

- Use the `--native-nan` command line flag.
- Set the environment variable `NATIVE_NAN` to "true".
- Create a configuration file named `.repositoryConfig.json` in the project root with the following content:

```json
{
  "nativeNan": true
}
```

Any of these methods will cause the CLI tool to convert any variation of "NaN" to the numeric NaN.

## LLM-Driven Automated Code Regeneration Workflow

This project incorporates an automated code regeneration pipeline powered by a large language model (LLM) capable of processing over 100,000 tokens. The workflow is integrated with our CI/CD pipelines to ensure that source files and documentation are automatically updated to meet project standards.

### Overview

- The LLM-driven pipeline monitors issues and pull requests for specific formatting markers.
- When triggered, it regenerates complete source files, tests, and documentation based on defined templates.
- This ensures consistency and rapid iteration on the project, without manual 'dry-run' steps.

### Integration with CI/CD

- The pipeline runs as part of our scheduled CI/CD jobs and on-demand triggers.
- Regenerated outputs replace older versions, ensuring that the repository consistently reflects the repository0-crucible identity.

### Guidelines for Contributors

- When reporting issues, please follow the established template so that the LLM can process your input and generate accurate code changes.
- Include detailed descriptions, expected outputs, and examples in your issue submissions.
- After the LLM regenerates code, review the changes per our [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

### Triggering Regeneration

- The regeneration process is fully automated. In most cases, submitting a formatted issue or pull request will initiate the pipeline.
- For manual triggering, use the npm script provided (see below).

## Plugin System

The plugin system allows developers to register custom functions (plugins) that transform the output of the CLI tool. This makes it easy to extend and customize functionality without altering the core code.

### How It Works

* The plugin manager is integrated into the main module in `src/lib/main.js` and provides three main functions that are exported:
  - `registerPlugin(plugin)`: Register a new plugin (a function) that takes data as input and returns transformed data.
  - `getPlugins()`: Retrieve the list of currently registered plugins.
  - `executePlugins(data)`: Process data through all registered plugins sequentially.

* When you run the CLI with the `--use-plugins` flag, the tool will process input arguments through any registered plugins. If no plugins are registered, the arguments remain unchanged.

### Example Plugin

Below is an example of a simple plugin that appends "-custom" to each string argument:

```javascript
import { registerPlugin } from "@src/lib/main.js";

// A plugin that appends "-custom" to string values
registerPlugin(data => data.map(item => typeof item === 'string' ? item + "-custom" : item));
```

After registering your plugin, run the CLI as follows:

```bash
node src/lib/main.js --use-plugins 100 hello
```

The output will display the processed array, for example:

```
Run with: [100, "hello-custom"]
```

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

- **Using Plugins (only active if plugins are registered):**
  ```bash
  npm run start -- --use-plugins 42 true hello
  ```

- **Native NaN Conversion:**
  To convert the string "NaN" to the numeric NaN, use the --native-nan flag, set the environment variable NATIVE_NAN to "true", or use a configuration file:
  ```bash
  node src/lib/main.js --native-nan NaN 100
  ```

- **JSON Argument Conversion:**
  You can now pass JSON formatted arguments directly. For example:
  ```bash
  node src/lib/main.js '{"key": "value"}' '[1,2,3]'
  ```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively. Note that any contributions will be validated against the automated LLM-driven regeneration pipeline to maintain project consistency.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

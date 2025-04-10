# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on the seed CONTRIBUTING files in [./seeds].

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

* Automated conversion of CLI arguments: Numeric strings like "42" or "3.14" are automatically converted to numbers, boolean strings like "true" or "false" are converted to booleans, while non-numeric strings are trimmed and returned.
* Special Handling for 'NaN': By default, the CLI tool preserves the literal string "NaN" as a special-case marker. To convert "NaN" to numeric NaN, use the --native-nan flag or set the environment variable NATIVE_NAN to "true".
* ISO 8601 Date Parsing: ISO formatted date strings are automatically converted to JavaScript Date objects if valid.
* Demonstration of GitHub workflows for CI/CD setups.
* Template based structure ideal for evolving JavaScript libraries.
* Plugin Architecture: Extend the functionality by registering plugins to transform or analyze the CLI output. Use the CLI flag `--use-plugins` to activate plugin processing.

## Plugin System

The plugin system allows developers to register custom functions (plugins) that transform the output of the CLI tool. This makes it easy to extend and customize the functionality without altering the core code.

### How It Works

* The plugin manager is integrated into the main module in `src/lib/main.js` and provides three main functions that are exported:
  - `registerPlugin(plugin)`: Register a new plugin (a function) that takes data as input and returns transformed data.
  - `getPlugins()`: Retrieve the list of currently registered plugins.
  - `executePlugins(data)`: Process data through all registered plugins sequentially.

* When you run the CLI with the `--use-plugins` flag, the tool will process the input arguments through any registered plugins. If no plugins are registered, the arguments remain unchanged.

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
  To convert the string "NaN" to the numeric NaN, use the --native-nan flag or set the environment variable NATIVE_NAN to "true":
  ```bash
  node src/lib/main.js --native-nan NaN 100
  ```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

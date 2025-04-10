# repository0-crucible

`repository0-crucible` is a demo repository showcasing GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). It demonstrates a unified, automated CLI tool that features robust argument conversion, a flexible plugin architecture, advanced CI/CD workflows, and new plugin transformation trace logging.

To create a self-evolving agentic coding system of your own based on this one, see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation showcasing automated CLI argument conversion, plugin architecture, and advanced CI/CD workflows.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) that hand off to reusable workflows.

See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

* **Automated CLI Argument Conversion:** Automatically converts numeric strings (e.g. "42", "3.14"), boolean strings ("true", "false"), ISO 8601 dates, JSON formatted strings, and more. Non-numeric strings are trimmed and returned.
* **Enhanced NaN Handling:** Supports robust handling of NaN inputs and its Unicode variants. The logic has been refactored to standardize Unicode normalization (using NFKC) for all input variants of "NaN" and uniformly applies the following options:
  - **Default Behavior:** Preserves any variant of "NaN" as the original string.
  - **Native Conversion:** Use `--native-nan`, set environment variable `NATIVE_NAN` to "true", or configure via `.repositoryConfig.json`:

    ```json
    {
      "nativeNan": true
    }
    ```

  - **Strict Mode:** Enable strict validation with `--strict-nan`, environment variable `STRICT_NAN`, or in `.repositoryConfig.json`. In this mode, an error is thrown unless a custom handler is registered:

    ```json
    {
      "nativeNan": true,
      "strictNan": true
    }
    ```

  - **Custom Replacement via CLI Flag:** Provide a replacement for "NaN" inline using `--custom-nan <value>`:

    ```bash
    node src/lib/main.js --custom-nan customReplacement NaN 100
    ```

  - **Custom Replacement via Configuration:** Specify a persistent custom replacement by adding a `customNan` key to `.repositoryConfig.json`:

    ```json
    {
      "customNan": "customReplacement"
    }
    ```

  - **Debug Mode:** Use `--debug-nan` to output detailed diagnostic information for each conversion, including the normalized input.
* **Plugin Architecture and Trace Logging:** Extend functionality by registering plugins using the provided API. When the CLI is run with the `--use-plugins` flag, input arguments are processed through all registered plugins. Additionally, if you supply the `--trace-plugins` flag, the CLI will output a detailed trace log of the transformation steps performed by each plugin.
* **Structured JSON Logging:** CLI outputs structured JSON logs with special serialization for numeric NaN, Infinity, and -Infinity.
* **Unicode Variant Support:** Recognizes Unicode variants of "NaN" (e.g. "ＮａＮ") and processes them consistently based on the chosen configuration.
* **Automated Tests:** Comprehensive tests ensure that all edge cases and functionalities—including NaN handling and plugin tracing—work as expected.
* **LLM-Driven Regeneration:** The project incorporates an automated code regeneration workflow powered by an LLM, ensuring consistency and quality without manual intervention.

## Configurable 'NaN' Handling

Users can control how "NaN" is processed by the CLI tool:
* **Default Behavior:** Preserves any variant of "NaN" as the original string input.
* **Native Conversion:** Use `--native-nan`, set environment variable `NATIVE_NAN` to "true", or configure via `.repositoryConfig.json`.
* **Strict Mode:** Enable strict validation with `--strict-nan`, environment variable `STRICT_NAN`, or in `.repositoryConfig.json` (throws an error if no custom handler is provided).
* **Custom Replacement via CLI & Config:** Provide a replacement for "NaN" either inline using `--custom-nan <value>` or persistently via the `customNan` key in `.repositoryConfig.json`.
* **Debug Mode:** Use `--debug-nan` to output detailed diagnostic information, including the normalized input.

## Dump Configuration

You can use the `--dump-config` flag to output the effective configuration that the CLI tool is using. The JSON output includes:
- **nativeNan**: (boolean) Indicates whether native NaN conversion is active.
- **strictNan**: (boolean) Indicates whether strict NaN mode is enabled.
- **customNan**: (string|null) The custom replacement value for "NaN", if any.
- **plugins**: (array) A list of registered plugin names.

### Example

```bash
node src/lib/main.js --dump-config
```

Output:

```json
{
  "nativeNan": false,
  "strictNan": false,
  "customNan": null,
  "plugins": []
}
```

## Usage

Run the CLI tool to see available options:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Using Plugins:**
  ```bash
  npm run start -- --use-plugins 42 true hello
  ```

- **Native NaN Conversion:**
  ```bash
  node src/lib/main.js --native-nan NaN 100
  ```

- **Strict NaN Mode:**
  ```bash
  node src/lib/main.js --strict-nan NaN 100
  ```

- **Debug NaN Mode:**
  ```bash
  node src/lib/main.js --debug-nan NaN 100
  ```

- **Plugin Transformation Trace Logging:**
  Use the `--trace-plugins` flag along with `--use-plugins` to see each transformation step:
  ```bash
  node src/lib/main.js --trace-plugins --use-plugins 42 hello
  ```

- **Custom NaN Replacement via CLI:**
  ```bash
  node src/lib/main.js --custom-nan customReplacement NaN 100
  ```

- **Custom NaN Replacement via Configuration:**
  Create a `.repositoryConfig.json` with:
  ```json
  {
    "customNan": "customReplacement"
  }
  ```
  Then run:
  ```bash
  node src/lib/main.js NaN 100
  ```

- **JSON Argument Conversion:**
  ```bash
  node src/lib/main.js '{"key": "value"}' '[1,2,3]'
  ```

## Plugin System

The plugin system allows you to register custom functions to transform or analyze the CLI output. Functions provided:

* `registerPlugin(plugin)`: Register a plugin function.
* `getPlugins()`: Retrieve currently registered plugins.
* `executePlugins(data)`: Process data through plugins when `--use-plugins` is active.
* `registerNaNHandler(handler)`: Register a custom handler for converting "NaN".

### Example Plugin

```javascript
import { registerPlugin } from "@src/lib/main.js";

// Append "-custom" to each string argument
registerPlugin(data => data.map(item => typeof item === 'string' ? item + "-custom" : item));
```

Run the CLI with:

```bash
node src/lib/main.js --use-plugins 100 hello
```

Output:

```json
{ "message": "Run with", "data": [100, "hello-custom"] }
```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute. All contributions will be validated against the automated LLM-driven regeneration pipeline.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

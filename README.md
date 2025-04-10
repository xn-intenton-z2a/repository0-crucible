# repository0-crucible

`repository0-crucible` is a demo repository showcasing GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). It demonstrates a unified, automated CLI tool that features robust argument conversion, a flexible plugin architecture, advanced CI/CD workflows, and enhanced plugin transformation trace logging.

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
* **Enhanced NaN Handling (Revamped):**
  - Recognizes all variants of "NaN", including Unicode variants such as "ＮａＮ" by normalizing inputs with trim and NFKC normalization.
  - **Default Behavior:** Preserves the input as a string, even if the representation is a Unicode variant.
  - **Native Conversion:** Use `--native-nan`, set environment variable `NATIVE_NAN` to "true", or configure via `.repositoryConfig.json`:

    ```json
    {
      "nativeNan": true
    }
    ```

    This converts recognized "NaN" inputs to numeric NaN.

  - **Strict Mode:** Enable with `--strict-nan`, environment variable `STRICT_NAN`, or via `.repositoryConfig.json`. In strict mode, an error is thrown if a "NaN" input is encountered without a custom handler:

    ```json
    {
      "nativeNan": true,
      "strictNan": true
    }
    ```

  - **Custom Replacement via CLI:** Provide a replacement for "NaN" inline using `--custom-nan <value>`. For example:

    ```bash
    node src/lib/main.js --custom-nan customReplacement NaN 100
    ```

    The tool will replace any variant of "NaN" with "customReplacement".

  - **Custom Replacement via Configuration:** Specify a persistent custom replacement by adding a `customNan` key to `.repositoryConfig.json`:

    ```json
    {
      "customNan": "customReplacement"
    }
    ```

  - **Environment Variable:** Set the environment variable `CUSTOM_NAN` to a non-empty string (that is not a variant of "NaN") to configure a custom replacement. (Note: When using `--dump-config`, the environment variable is ignored.)

  - **Debug Mode:** Use `--debug-nan` to output detailed diagnostic information for each conversion, including the normalized input and the conversion method (default, native, or custom).

* **Plugin Architecture and Trace Logging:** Extend functionality by registering plugins using the provided API. When the CLI is run with the `--use-plugins` flag, input arguments are processed through all registered plugins. Additionally, if you supply the `--trace-plugins` flag, the CLI will output a detailed trace log of the transformation steps performed by each plugin.

* **Structured JSON Logging:** CLI outputs structured JSON logs with special serialization for numeric NaN, Infinity, and -Infinity.

* **Unicode Variant Support:** All input variants of "NaN" (like "ＮａＮ") are normalized uniformly to ensure consistent behavior across different configurations.

* **Automated Tests:** Comprehensive tests ensure that edge cases and functionalities—including NaN handling and plugin tracing—work as expected.

* **LLM-Driven Regeneration:** The project incorporates an automated code regeneration workflow powered by an LLM, ensuring consistency and quality without manual intervention.

## Configurable 'NaN' Handling

Users can control how "NaN" is processed by the CLI tool:
* **Default Behavior:** Preserves any variant of "NaN" as the original string input.
* **Native Conversion:** Activate via `--native-nan`, environment variable `NATIVE_NAN`, or within `.repositoryConfig.json` to convert recognized variants to numeric NaN.
* **Strict Mode:** Enable with `--strict-nan`, environment variable `STRICT_NAN`, or via `.repositoryConfig.json` to throw an error on encountering a "NaN" unless a custom handler is provided.
* **Custom Replacement:** Override the default behavior by providing a custom replacement via CLI (`--custom-nan <value>`), repository configuration (`customNan` key), or environment variable (`CUSTOM_NAN`).
* **Debug Mode:** Use `--debug-nan` to see detailed output of the conversion process.

## Dump Configuration

Use the `--dump-config` flag to output the effective configuration that the CLI tool is using. The JSON output includes:
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

- **Custom NaN Replacement via Environment Variable:**
  ```bash
  export CUSTOM_NAN=customEnvReplacement
  node src/lib/main.js NaN 100
  ```

- **JSON Argument Conversion:**
  ```bash
  node src/lib/main.js '{"key": "value"}' '[1,2,3]'
  ```

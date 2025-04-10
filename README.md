# repository0-crucible

`repository0-crucible` is a demo repository showcasing GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). It demonstrates a unified, automated CLI tool that features robust argument conversion, a flexible plugin architecture, advanced CI/CD workflows, enhanced plugin transformation trace logging, and dynamic configuration refresh for custom NaN handling.

To create a self-evolving agentic coding system of your own based on this one, see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation showcasing automated CLI argument conversion, plugin architecture, advanced CI/CD workflows, and now dynamic configuration refresh that updates NaN handling in realtime.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) that hand off to reusable workflows.

See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

* **Automated CLI Argument Conversion:** Automatically converts numeric strings (e.g. "42", "3.14"), boolean strings ("true", "false"), ISO 8601 dates, JSON formatted strings, and more. Non-numeric strings are trimmed and returned.
* **Enhanced NaN Handling with Dynamic Configuration Refresh:**
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

  - **Custom Replacement:** Override the default behavior by providing a custom replacement via CLI using `--custom-nan <value>`, in the repository configuration (`customNan` key), or via the environment variable `CUSTOM_NAN`.

  - **Dynamic Configuration Refresh:** The tool now supports automatic updating of NaN handling configuration at runtime. When running in serve mode (`--serve`) or via the `--refresh-config` flag, changes to environment variables or the `.repositoryConfig.json` file are applied immediately without restarting the process.

  - **Configuration Precedence:** The effective NaN handling configuration is resolved in the following order (highest to lowest): CLI flags, Repository configuration file (.repositoryConfig.json), Environment variables, Default behavior.

  - **Asynchronous Custom Handlers:** Custom handlers can be asynchronous, allowing dynamic operations such as API calls during conversion.

  - **Debug Mode:** Use `--debug-nan` to output detailed diagnostic information for each conversion, including the normalized input and the conversion method (default, native, or custom).

* **Plugin Architecture and Trace Logging:** Extend functionality by registering plugins using the provided API. When the CLI is run with the `--use-plugins` flag, input arguments are processed through all registered plugins. Additionally, if you supply the `--trace-plugins` flag, the CLI will output a detailed trace log of the transformation steps performed by each plugin.

* **Structured JSON Logging:** CLI outputs structured JSON logs with special serialization for numeric NaN, Infinity, and -Infinity.

* **Unicode Variant Support:** All input variants of "NaN" (like "ＮａＮ") are normalized uniformly to ensure consistent behavior across different configurations.

* **Automated Tests:** Comprehensive tests ensure that edge cases and functionalities—including NaN handling (both synchronous and asynchronous), dynamic configuration refresh, configuration precedence, and plugin tracing—work as expected.

* **LLM-Driven Regeneration:** The project incorporates an automated code regeneration workflow powered by an LLM, ensuring consistency and quality without manual intervention.

## Configurable 'NaN' Handling

Users can control how "NaN" is processed by the CLI tool. The configuration resolution follows this precedence:
1. **CLI Flags:** Directly specify behavior using `--native-nan`, `--strict-nan`, or `--custom-nan <value>`.
2. **Repository Config:** Define settings in a `.repositoryConfig.json` file.
3. **Environment Variables:** Set `NATIVE_NAN`, `STRICT_NAN`, or `CUSTOM_NAN` environment variables.
4. **Default Behavior:** Applied when no other configuration is provided.

With dynamic configuration refresh enabled, the tool monitors changes and applies updates on the fly when running interactively or in serve mode.

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

- **Dynamic Configuration Refresh (Serve Mode):**
  Run in serve mode to enable dynamic config updates:
  ```bash
  node src/lib/main.js --serve
  ```
  Changes to `.repositoryConfig.json` will be applied on the fly.

- **Force Refresh Configuration:**
  ```bash
  node src/lib/main.js --refresh-config
  ```

- **JSON Argument Conversion:**
  ```bash
  node src/lib/main.js '{"key": "value"}' '[1,2,3]'
  ```

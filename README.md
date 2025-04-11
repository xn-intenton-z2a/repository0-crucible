# repository0-crucible

`repository0-crucible` is a demo repository showcasing GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). It demonstrates a unified, automated CLI tool that features robust argument conversion, a flexible plugin architecture, advanced CI/CD workflows, enhanced plugin transformation trace logging, dynamic configuration refresh for custom NaN handling, optimized performance for bulk NaN processing, and now built-in performance benchmarking for NaN processing.

To create a self-evolving agentic coding system of your own based on this one, see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation showcasing automated CLI argument conversion, plugin architecture, advanced CI/CD workflows, and dynamic configuration refresh with performance optimizations and benchmarking for bulk NaN processing.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) that hand off to reusable workflows.

See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

* **Automated CLI Argument Conversion:** Automatically converts numeric strings (e.g. "42", "3.14"), boolean strings ("true", "false"), ISO 8601 dates, JSON formatted strings, and more. Non-numeric strings are trimmed and returned.
* **Enhanced NaN Handling with Dynamic Configuration Refresh and Benchmarking:**
  - Recognizes all Unicode variants of "NaN" (for example, "NaN", "nan", "ＮａＮ"), by normalizing inputs using trim and NFKC normalization.
  - **Default Behavior:** Preserves the input as a string, even if the representation is a Unicode variant.
  - **Native Conversion:** Use `--native-nan`, set environment variable `NATIVE_NAN` to "true", or configure via `.repositoryConfig.json`:

    ```json
    {
      "nativeNan": true
    }
    ```

    This converts recognized "NaN" inputs to numeric NaN.

  - **Strict Mode:** Enable with `--strict-nan`, environment variable `STRICT_NAN`, or via `.repositoryConfig.json`. In strict mode, if a "NaN" input is encountered without a registered custom handler, an error is thrown with actionable guidance. The error message instructs you to register a custom NaN handler using the `--custom-nan <value>` flag, update your `.repositoryConfig.json` with a valid `customNan` value, or set the `CUSTOM_NAN` environment variable.

    ```json
    {
      "nativeNan": true,
      "strictNan": true
    }
    ```

  - **Custom Replacement:** Override the default behavior by providing a custom replacement via CLI using `--custom-nan <value>`, in the repository configuration (`customNan` key), or via the environment variable `CUSTOM_NAN`.

  - **Dynamic Configuration Refresh:** The tool now supports automatic updating of NaN handling configuration at runtime. When running in serve mode (`--serve`) or via the `--refresh-config` flag, changes to environment variables or the `.repositoryConfig.json` file are applied immediately without restarting the process.

  - **Built-in Performance Benchmarking:** A new performance benchmarking mode is provided. Run the CLI with the `--benchmark` flag or via the npm script to perform bulk processing tests. This benchmark measures execution times with caching enabled vs disabled and logs the results in a structured JSON format, aiding in performance analysis and regression detection.

  - **Enhanced Diagnostic Logging:** When the `--debug-nan` flag is provided, the CLI outputs detailed diagnostic logs capturing the original input, trimmed version, normalization applied, and the conversion branch (default, native, or custom).

  - **Configuration Precedence:** The effective NaN handling configuration is resolved in the following order (highest to lowest): CLI flags, Repository configuration file (.repositoryConfig.json), Environment variables, Default behavior.

  - **Asynchronous Custom Handlers:** Custom handlers can be asynchronous, allowing dynamic operations such as API calls during conversion.

  - **Optimized Bulk Processing:** To enhance performance when processing a large number of CLI arguments, repeated normalization of identical inputs is cached, reducing overhead and improving efficiency.

* **Plugin Architecture and Trace Logging:** Extend functionality by registering plugins using the provided API. When the CLI is run with the `--use-plugins` flag, input arguments are processed through all registered plugins. Additionally, if you supply the `--trace-plugins` flag, the CLI will output a detailed trace log of the transformation steps performed by each plugin.

* **Structured JSON Logging:** CLI outputs structured JSON logs with special serialization for numeric NaN, Infinity, and -Infinity.

* **Unicode Variant Support:** All input variants of "NaN" (like "ＮａＮ") are normalized uniformly using a dedicated normalization function (trim + NFKC) to ensure consistent behavior across configurations.

* **Automated Tests:** Comprehensive tests ensure that edge cases and functionalities—including NaN handling (both synchronous and asynchronous), dynamic configuration refresh, configuration precedence, plugin tracing, benchmark performance, and bulk performance improvements—work as expected.

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

## Performance Benchmarking

A new performance benchmarking mode is included to measure the execution times of NaN processing with and without caching. Use the `--benchmark` flag or the npm script below:

```bash
npm run benchmark
```

This will run bulk processing tests and output benchmark results in JSON format, including the counts and elapsed times for caching enabled vs disabled scenarios.

- **JSON Argument Conversion:**
  ```bash
  node src/lib/main.js '{"key": "value"}' '[1,2,3]'
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
  If you encounter a strict mode error, follow the guidance in the error message to register a custom handler.

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

- **Performance Benchmarking:**
  ```bash
  npm run benchmark
  ```

- **JSON Argument Conversion:**
  ```bash
  node src/lib/main.js '{"key": "value"}' '[1,2,3]'
  ```

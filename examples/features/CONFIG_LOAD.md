# CONFIG_LOAD

## Overview
This feature enables the CLI tool to load additional configuration from a JSON file when the `--config` flag is provided. With this feature, users can easily customize the tool's behavior (such as logging preferences, enabled flags, or other settings) without modifying the source code directly.

## Implementation Details

### Source File Update (src/lib/main.js):
- Detect if the CLI arguments include the `--config` flag.
- Use Node's `fs` module to synchronously (or asynchronously) read a file named `config.json` from the repository root (or a default location).
- Parse the JSON content and merge its settings with the tool's defaults. For example, if the configuration includes a custom log message or enables/disables a specific mode, override the default behavior.
- Log a confirmation message such as "Configuration loaded successfully.".

### Test File Update (tests/unit/main.test.js):
- Add a unit test that simulates running the CLI with the `--config` flag.
- Mock the file reading functionality (e.g., using `vi.spyOn` or similar) to return a sample configuration JSON.
- Assert that the output includes the configuration load confirmation message.

### README Update (README.md):
- Update the usage instructions to document the new `--config` flag. For example:
  ```bash
  node src/lib/main.js --config
  ```
- Describe that when this flag is used, the CLI will look for a `config.json` file and load additional configuration settings.

## Benefits
- **Flexibility:** Users can adjust settings without changing the code.
- **Maintainability:** Centralizes configuration in a single file, which simplifies future enhancements and customizations.
- **Scalability:** Lays the groundwork for supporting multiple configuration formats in the future (e.g., YAML, TOML).

## Future Considerations
- Extend support to other file formats beyond JSON (e.g., YAML).
- Allow specifying a custom configuration file path (e.g., `--config=path/to/file.json`).
- Validate configuration settings against a schema (using libraries such as Zod) to ensure robustness.
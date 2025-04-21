# LIVE_UPDATE

## Overview
This feature adds a live update capability to the CLI tool. When the `--live-update` flag is provided, the tool will monitor a configuration file (for example, a JSON file or `.env`) for changes. Upon detecting any modification, the tool will dynamically reload its configuration settings and update its in-memory state accordingly. This ensures that updates to configuration parameters can be applied on the fly without needing to restart the CLI application.

## Implementation Details
- **Source File (src/lib/main.js):**
  - Import Node's `fs` module (already in use) and add a file watcher (using `fs.watch`) to monitor a designated configuration file (e.g., `config.json` or `.env`).
  - When the file changes, invoke a helper function `reloadConfig()` that reads the updated file (synchronously or asynchronously) and logs a confirmation message such as "Configuration reloaded successfully.".
  - Optionally, update relevant in-memory settings that the CLI tool uses (for example, log formatting or operational flags).
  - Guard the file watcher activation by checking if the `--live-update` flag exists among CLI arguments.

- **Test File (tests/unit/main.test.js):**
  - Add new test cases that simulate the `--live-update` flag. Use mocks or spies for `fs.watch` to simulate a file change event and verify that the reload function is called and that a log message confirming the configuration reload is output.
  - Ensure that the file update handler does not interrupt or interfere with the normal CLI output, and that existing behavior remains intact without the flag.

- **README Update (README.md):**
  - Update the usage instructions to document the new `--live-update` flag. Provide an example command:
    ```bash
    node src/lib/main.js --live-update
    ```
  - Explain that in live update mode, the CLI tool watches a configuration file for changes and automatically reloads settings in real time.

- **Dependencies File (package.json):**
  - No additional external dependencies are required since Node’s built-in `fs.watch` is sufficient for monitoring file changes.

## Testing & Compatibility
- Run `npm test` to verify that tests for live update behavior pass without errors.
- Confirm that when the configuration file is updated, the CLI outputs the expected reload confirmation message, and that normal CLI operations are maintained.

## Future Considerations
- Enhance this feature to allow multiple configuration files (e.g., supporting both a JSON config and a `.env` file) to be monitored concurrently.
- Consider adding debounce logic to prevent excessive reloads on rapid file changes.
- In further iterations, integration with a persistent storage or remote configuration service could be explored to allow dynamic updates across distributed agent instances.

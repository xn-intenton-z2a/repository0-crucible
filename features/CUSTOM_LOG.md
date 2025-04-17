# CUSTOM_LOG

## Overview
This feature introduces a customizable log export format for the memory logging system. By leveraging the existing EJS templating dependency, users can supply a custom template string when exporting the memory log. This allows for flexible formatting of the exported log file, making the output more readable or compatible with external tools.

## Implementation Details
- **CLI Flag:**
  - Add a new optional flag `--log-template` to the CLI, which accepts a template string that will be used when exporting the memory log.
  - If the `--log-template` flag is provided along with `--export-memory`, the tool will use the provided template to generate the output file content. Otherwise, it will fall back to the default JSON export.

- **Source File Updates (src/lib/main.js):
  - Modify the `--export-memory` handling block to check for an additional `--log-template` flag.
  - Incorporate the EJS library to compile and render the custom template using the current memory log data.
  - Ensure that error handling is added for invalid templates, falling back gracefully to the default export format.

- **Testing Updates (tests/unit/main.test.js):
  - Add new unit tests to simulate exporting the memory log with a custom template string.
  - Verify that the exported file's content matches the expected format when a valid template is provided.
  - Ensure that if an invalid template is supplied, the system provides an appropriate error message and defaults to standard behavior.

- **Documentation Updates (README.md):
  - Update the README to include a usage example for the new `--log-template` flag. For example:
    ```bash
    node src/lib/main.js --export-memory custom_log.json --log-template '<%= JSON.stringify(memoryLog, null, 2) %>'
    ```
  - Document that the custom template must be a valid EJS template string and provide links to EJS documentation for further reference.

## Long-Term Direction
In the future, this customizable logging could be extended to other parts of the diagnostics functionality, allowing users even more control over the output format. This aligns with our mission to build an autonomous and flexible system that adapts to diverse user needs.

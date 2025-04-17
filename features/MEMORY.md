# MEMORY

## Overview
The MEMORY feature has been enhanced to not only retain and manage command invocation logs, but now also supports customizable log export formats. By merging the capabilities of the original MEMORY and CUSTOM_LOG features, this unified module retains its persistent, archived, and queryable log functionalities while adding the flexibility to output logs in a user-defined format using EJS templating. This integration supports auto archiving, filtering, and enhanced diagnostics, aligning with the mission to build a self-aware and continuously improving agent.

## Implementation Details
- **Memory Logging and Persistence:**
  - Retain full logs of command invocations with unique session IDs and ISO-formatted timestamps.
  - Persist logs to disk via the `--persist-memory` flag and auto-load them on startup if a `memory.log` file exists.
  - Allow clearing of logs using the `--clear-memory` flag.
  
- **Custom Log Export with Templating:**
  - Introduce support for an optional CLI flag `--log-template` to be used with `--export-memory`. When provided, the log export routine will use the given EJS template string to generate the output file.
  - If a custom template is supplied, compile and render the memory log data using the EJS library; if the template is invalid, trigger error handling to fallback gracefully to the default JSON export.
  - Allow the user to optionally specify a custom filename for the exported memory log.

- **Additional Features Integrated:**
  - Auto Archiving: With the `--archive-memory` flag, the system will archive the in-memory log into a timestamped file and clear the active log.
  - Query, Update, and Delete Operations: The existing query features (`--query-memory`, `--query-tag`, `--query-annotation`, and `--query-memory-range`) and update operations (`--update-memory-tag`, `--update-memory-annotation`, and deletion by tag/annotation) remain fully supported.
  - Frequency and Statistics: The `--frequency-stats` and `--memory-stats` flags offer diagnostic insights into log usage.

## Testing
- **Unit Tests:**
  - Extend tests in the unit test file to incorporate scenarios for exporting memory logs with a custom EJS template.
  - Verify that when `--log-template` is provided, the exported file content matches the expected output format based on the template.
  - Ensure that invalid templates trigger proper error messages and that the system falls back to the default JSON export format.

## Documentation Updates
- **README.md:**
  - Update documentation to reflect that the MEMORY feature now includes customizable log export functionality. 
  - Provide usage examples demonstrating how to combine `--export-memory` with `--log-template`, for instance:
    ```bash
    node src/lib/main.js --export-memory custom_log.json --log-template '<%= JSON.stringify(memoryLog, null, 2) %>'
    ```
  - Document that the custom template must be a valid EJS template. Also, continue to detail other memory log operations such as persistence, archiving, and query features.

## Long-Term Direction
Integrating customizable log export within the MEMORY feature not only simplifies user interactions with log data but also lays the groundwork for future extensions. In subsequent versions, further customizations (such as dynamic formatting options and integration with external logging services) might be introduced, adhering to our mission of developing an intelligent, self-improving agent. This unified approach ensures consistency, ease of maintenance, and scalability for cross-repository intelligent automation.

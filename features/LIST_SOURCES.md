# Summary
Add a new CLI flag list-sources to expose the list of public data source URLs supported by the library. This enables users to discover and select available sources without inspecting code.

# Functional Requirements
- Define a constant supportedDataSources as an array of URL strings in src/lib/main.js
- Export a function getSupportedDataSources that returns the supportedDataSources array
- When the CLI is invoked with the flag --list-sources, log the supportedDataSources as JSON to standard output and exit
- Ensure other CLI flags and existing functionality remain unchanged

# CLI Usage
- Running the tool with the flag --list-sources displays all available data source URLs in JSON form
- Support invocation via npm script start

# API
- Export getSupportedDataSources from src/lib/main.js for programmatic access
- Preserve the existing main export

# Testing
- Add unit tests to verify getSupportedDataSources returns the expected array of URLs
- Add a CLI test that simulates process.argv containing --list-sources and asserts JSON output without errors

# Documentation
- Update README.md to document the list-sources feature under Features
- Include a usage example showing how to run the flag and sample output
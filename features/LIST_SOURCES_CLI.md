# Overview
Add a new CLI option --list-sources to expose the built-in public data sources defined by the mission statement.

# Behavior
When the user runs node src/lib/main.js --list-sources, the tool prints each source name on its own line followed by its URL and then exits normally. No other processing occurs.

# Implementation
Modify src/lib/main.js  to define a dataSources object containing key-value pairs of source identifiers and their URLs. Extend the argument parsing logic to detect the --list-sources flag. When present, iterate over dataSources and print name and URL to stdout. Skip the default run logic in this case. No new files or dependencies.

# Tests
Update tests/unit/main.test.js to add a test that sets process.argv to include --list-sources, captures console output, and verifies each data source name and URL appears. Ensure main exits without throwing.

# Documentation
In README.md update the Features section to describe the --list-sources command and add a Usage example showing node src/lib/main.js --list-sources.
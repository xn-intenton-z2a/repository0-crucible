# List Sources

## Description
Provide a CLI command to list all configured open public data sources and their URLs. This satisfies the mission to hold constants for public data sources, making it easy for users to discover and reference available sources when building OWL ontologies.

## Implementation
Add a constant array PUBLIC_DATA_SOURCES in src/lib/main.js containing objects with name and url properties. Extend main to detect the --list-sources or -l flag, output each source name and URL on its own line, then exit without error. Preserve existing behavior for other arguments.

## CLI Usage
- To display available sources:
  node src/lib/main.js --list-sources
  node src/lib/main.js -l

Expected output example:
DBpedia: https://dbpedia.org/sparql

## Testing
- Add a test that spies on console.log when calling main(['--list-sources']) and verifies each configured source is printed.
- Ensure main terminates without throwing when invoked with the flag.

## Documentation Updates
- Update README.md under Features to describe the list-sources option and show example output.
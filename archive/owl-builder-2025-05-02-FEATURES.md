features/CAPITAL_CITIES_CLI.md
# features/CAPITAL_CITIES_CLI.md
# Overview
Add a new CLI option --capital-cities to output a simple OWL ontology in JSON format for a set of world capital cities.

# Behavior
When the user runs node src/lib/main.js --capital-cities, the tool builds an ontology object representing each capital city as an individual of type CapitalCity with name and country properties.  
Optionally the user may supply --output <path> to write the JSON ontology to a file instead of stdout.  
No other processing occurs when this flag is present.

# Implementation
Modify src/lib/main.js to define a static array of capital city records with name and country fields.  
Extend argument parsing to detect --capital-cities and an optional --output flag with its path.  
When --capital-cities is present, construct a JSON object with a root field ontologyVersion and an array of individuals.  
Write JSON to stdout or to the file path provided by --output.  
Skip the default run logic when --capital-cities is handled.

# Tests
Update tests/unit/main.test.js to add tests that set process.argv to include --capital-cities and capture console output.  
Parse the captured output as JSON and verify that it contains an individuals array with at least one object having name and country matching an entry from the static array.  
Also test providing --output with a temporary file path, read and parse the file, and verify the contents.

# Documentation
In README.md update the Features section to include --capital-cities.  
Add usage examples showing invocation with and without --output and sample output excerpts.features/ONTOLOGY_CLI.md
# features/ONTOLOGY_CLI.md
# Overview

Provide a unified CLI interface for working with OWL ontologies in JSON format. Merge existing list-sources and capital-cities behaviors into a single feature set under a consolidated ontology CLI.

# Behavior

- When the user runs `node src/lib/main.js --list-sources`, the tool prints each built-in public data source name and URL on its own line, then exits.
- When the user runs `node src/lib/main.js --capital-cities`, the tool outputs a JSON object representing an OWL-like ontology for the predefined set of capital cities and then exits.
- Support an optional `--output <path>` flag for both `--list-sources` (writing the list to a file, one source per line) and `--capital-cities` (writing the JSON ontology to a file). If `--output` is not provided, write to stdout.
- Skip the default demo logic when either `--list-sources` or `--capital-cities` is used.

# Implementation

- In `src/lib/main.js`, consolidate flag handling into a single CLI module:
  - Detect `--list-sources` and `--capital-cities` before the default behavior.
  - Read the existing `dataSources` object and the `capitalCities` array.
  - On `--list-sources`, format each entry as `<name> <url>` and write to stdout or file.
  - On `--capital-cities`, build the ontology object with `ontologyVersion` and `individuals`, then serialize to JSON and write to stdout or file.
  - Handle `--output <path>` generically for both modes.
  - Ensure only one primary mode flag is accepted at a time; throw an error if both are provided.

# Tests

- Update `tests/unit/main.test.js` to cover:
  - Listing sources to stdout and to a temporary file.
  - Exporting capital cities ontology to stdout and to a temporary file.
  - Error case when both `--list-sources` and `--capital-cities` are provided.

# Documentation

- Update `README.md` under Features to describe both flags and the new consolidated behavior.
- Merge content from `docs/LIST_SOURCES_CLI.md` and `docs/CAPITAL_CITIES_CLI.md` into a single `docs/ONTOLOGY_CLI.md` file with usage examples for both modes.

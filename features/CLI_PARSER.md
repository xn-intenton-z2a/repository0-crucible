# CLI_PARSER Feature Specification

## Overview
This update refines the CLI parser functionality in the repository. The main source file will include logic to process a broader set of command line flags including --help, --version, --agentic, --dry-run, --diagnostics, and --capital-cities. The --agentic flag will trigger integration with the agentic library functionality as described in AGENTIC_LIB. This enhancement ensures the CLI tool adheres to the mission of providing a versatile interface for managing OWL ontologies and demonstrating agentic workflows.

## Implementation
The src/lib/main.js file will be updated to inspect process.argv and map recognized flags to specific behaviors:

- When the user supplies --help, a complete usage instruction and flag reference will be printed.
- The --version flag will output version information from package.json.
- The --agentic flag will call the agenticHandler function from the agentic library, simulating the agentic workflow and logging the results.
- The --dry-run flag will simulate actions without executing them.
- The --diagnostics flag will output internal state and diagnostic information.
- The --capital-cities flag will trigger functionality that outputs a sample OWL ontology in JSON format representing capital cities, aligning with mission objectives.

The feature will update tests in tests/unit/main.test.js to simulate the various CLI inputs and verify that the appropriate responses and log messages are produced. It will also update the README.md to document the new CLI flags and include usage examples for each scenario.

## Testing
Unit tests will be added or updated in tests/unit/main.test.js to cover scenarios for each flag. The tests should check that:
- The help command prints all usage instructions.
- The version command correctly retrieves and prints version data.
- The agentic command correctly calls the agenticHandler and prints its output.
- The diagnostic and dry-run modes do not produce application errors and provide expected logs.
- The capital-cities flag returns a valid JSON representation of the OWL ontology sample.

## Documentation
The README.md file will be revised to include a section on CLI usage. This section will list all the supported flags and provide example commands for using the tool. The documentation will also note the integration with the agentic library for flag --agentic and how to interpret the output.

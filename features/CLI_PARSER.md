# CLI_PARSER Feature Specification

## Overview
This feature consolidates the CLI parser functionality by merging the improvements from the previous REFACTOR_CLI and CLI_PARSER features. The goal is to streamline the flag dispatch mechanism into a single, maintainable implementation. The consolidated parser supports all existing flags including --help, --version, --agentic (with strict JSON validation), --dry-run, --diagnostics, and --capital-cities. This update enhances overall stability and aligns with the mission to provide a robust CLI tool for managing OWL ontologies.

## Implementation
- Update the src/lib/main.js file to use a unified mapping for processing CLI flags.
- For --help and --version, output the appropriate usage instructions and version information from package.json.
- For --agentic, ensure the JSON payload is parsed and validated correctly (it must include either a 'command' string or a 'commands' array), then invoke the agenticHandler function with validation for --dry-run mode.
- For --dry-run, simulate execution without making actual changes.
- For --diagnostics and --capital-cities, output the corresponding diagnostic information and sample OWL ontology respectively.
- Preserve robust error handling and proper argument validation for unrecognized or improperly formatted flags.
- Merge redundant code from the REFACTOR_CLI feature into this unified implementation.

## Testing
- Update tests/unit/main.test.js to verify that each CLI flag produces the expected log outputs and behaviors.
- Include cases for valid and invalid inputs, ensuring that missing parameters and malformed JSON trigger the correct error messages and usage instructions.
- Confirm that edge cases and simultaneous flag conditions are handled gracefully.

## Documentation
- Revise README.md and docs/USAGE.md to document the consolidated CLI flag usage, with clear instructions and examples.
- Ensure that examples reflect the new unified behavior without altering the core user experience.
- Maintain alignment with the mission to support OWL ontology management via the CLI tool.
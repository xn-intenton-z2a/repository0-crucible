# SCHEMA_DIFF Feature Enhancement

## Overview
This update enhances the existing SCHEMA_DIFF feature by adding an Interactive Mode. In addition to the CLI and optional HTTP API functionalities, the tool now allows users to engage in an interactive session to explore and filter differences between JSON Schema files. This interactive mode brings a user-friendly approach to schema comparison and debugging, aligning with the mission of simplifying API evolution and collaboration.

## Functionality
- **Command Line Interface (CLI) Enhancements**: 
  - Support for an `--interactive` flag that launches an interactive prompt session.
  - Retains existing diff commands (`diff`, `--diff`) and optional `--http` flag.

- **Interactive Mode**:
  - Utilizes Node.js’s readline module to interactively display differences.
  - Allows users to filter discrepancies by categories (e.g., types, properties, structures).
  - Provides step-by-step review of each difference, with options to show more detail or skip certain parts.
  
- **HTTP API Endpoint**: 
  - Continues to expose an HTTP endpoint for remote diff computation with color-coded and verbose logging options.
  
- **Comparison Engine**:
  - Extends the current comparison logic to support both batch and interactive diff output.
  - Maintains support for both human-readable and machine-parsable JSON formats.

- **Error Handling and Logging**:
  - Robust input validation with clear error messages for both CLI and interactive modes.
  - Interactive prompts include fallback options in case of unexpected inputs.

## Implementation
- **CLI Integration**: Update `src/lib/main.js` to parse the `--interactive` flag and launch an interactive session.

- **Comparison Module**: Enhance `src/lib/schemaDiff.js` to include functions that support the step-by-step interactive review of schema differences.

- **Interactive Session Module**: (Optional) Create a lightweight module within the repository that wraps Node.js’s built-in `readline` to manage the interactive prompts.

- **HTTP Server and API**: Ensure the HTTP endpoint remains fully operational and document its usage, without interfering with the new interactive mode.

- **Testing**: 
  - Add unit tests in `tests/unit/schemaDiff.test.js` to cover interactive mode scenarios along with existing diff operations.
  - Perform manual tests to ensure that both CLI and HTTP functionalities handle edge cases gracefully.

- **Documentation**: 
  - Update README.md and CONTRIBUTING.md to include instructions and usage examples for the interactive mode.
  - Provide inline code documentation and usage examples in the source code.

## Integration & Testing
- Ensure compatibility with Node 20 and ECMAScript Module (ESM) standards.
- Follow coding and testing guidelines as per CONTRIBUTING.md.
- Use both automated tests (vitest) and manual testing to validate interactive and non-interactive modes.

## Value Proposition
This enhancement empowers API developers with a more dynamic way to review JSON Schema differences. The interactive mode not only improves the user experience by providing immediate, guided feedback but also streamlines the process of validating complex schema changes, thus fostering better collaboration and reducing errors during API upgrades.
# SCHEMA_DIFF Feature Enhancement

## Overview
This feature enhances the core JSON schema diff functionality by providing an interactive mode along with extended diagnostic capabilities. It not only supports standard diff operations between JSON schemas, but now also includes additional diagnostic output and a refresh mechanism to ensure that users can quickly identify environmental issues and reset states as needed.

## Functionality
- **Core Diff Operations**:
  - Continue to utilize the existing comparison engine for batch and interactive diffs.
  - Retain support for human‑readable and machine‑parsable JSON outputs.

- **Interactive Mode**:
  - Support an `--interactive` flag to start a guided, step‑by‑step examination of differences.
  - Allow filtering differences by categories (e.g., types, properties, structures) during the interactive session.
  
- **HTTP Endpoint**:
  - Provide an optional lightweight HTTP API endpoint for remote comparison requests.
  
- **Diagnostic Enhancements**:
  - Introduce a `--diagnostics` flag which, when invoked, outputs detailed system and runtime information. This includes environment details, Node version checks, file accessibility status, and configuration diagnostics.
  - Add a `--refresh` flag to clear caches and refresh all internal state, ensuring that the diff engine works with the most recent file changes.
  - Ensure enhanced error logging and robust validations when diagnostic information is provided. 

## Implementation Details
- **CLI Integration**:
  - Update the main command parser (in `src/lib/main.js`) to recognize the new `--diagnostics` and `--refresh` flags and route them appropriately.
  - Integrate these flags with the interactive diff logic to provide pre‑execution diagnostics and a post‑diagnostic refresh of system state.

- **Comparison Module Updates**:
  - Modify `src/lib/schemaDiff.js` to incorporate diagnostic logging and state refresh behavior within the diff processing functions.

- **Testing & Documentation**:
  - Add unit tests (e.g., in `tests/unit/schemaDiff.test.js`) to validate diagnostic outputs and the refresh functionality under various scenarios.
  - Update README.md and CONTRIBUTING.md with detailed usage examples of the new flags (e.g., `node src/lib/main.js --interactive --diagnostics`).
  - Provide inline code documentation detailing the enhancements and integration points.

## Value Proposition
By merging interactive diff capabilities with enhanced diagnostics and refresh operations, this feature not only facilitates easier schema comparisons but also empowers developers to troubleshoot issues quickly. These improvements align with the mission of simplifying API evolution and fostering better collaboration among development teams.
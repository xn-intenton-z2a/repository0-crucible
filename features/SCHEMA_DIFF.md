# SCHEMA_DIFF Feature Enhancement

## Overview
This feature unifies the core JSON schema diff capabilities with comprehensive Markdown reporting. It enhances the existing diff functionality by integrating interactive modes, detailed diagnostics, and a robust report generation mechanism, all accessible via CLI and an optional HTTP endpoint.

## Functionality
- **Core Diff Operations**:
  - Utilize the established comparison engine to perform batch and interactive diffs between JSON schemas.
  - Support both human‑readable outputs and machine‑parsable JSON data.

- **Interactive Mode & Diagnostics**:
  - Support an `--interactive` flag to guide users through a step‑by‑step analysis of schema differences.
  - Include diagnostic flags (`--diagnostics` and `--refresh`) to output system runtime and environment details and to refresh internal states.

- **Markdown Report Generation**:
  - Introduce a `--report` flag that converts the raw diff output into a well-structured Markdown document.
  - Format changes into categorized sections such as Additions, Removals, and Modifications, making the report executive-ready.
  - Optionally, integrate with a lightweight HTTP endpoint to serve reports remotely when required.

## Implementation
- **Module Updates**:
  - Enhance `src/lib/schemaDiff.js` to include logic for both interactive diff and Markdown report generation.
  - Integrate report generation seamlessly with the existing diff engine to avoid duplication of comparison logic.
- **CLI Integration**:
  - Update the main command parser (`src/lib/main.js` and `src/lib/cliParser.js`) to support the additional reporting flag and diagnostics commands.
- **Testing & Validation**:
  - Add comprehensive unit tests (e.g., in `tests/unit/schemaDiff.test.js`) to cover interactive scenarios, diagnostic outputs, and report formatting.
- **Documentation**:
  - Revise README.md and CONTRIBUTING.md to include new usage examples for flags like `--interactive`, `--diagnostics`, `--refresh`, and `--report`.

## Value Proposition
By consolidating diff operations and report generation into a single robust feature, this update simplifies API change tracking and enhances team collaboration. It leverages existing components to provide versatile outputs—whether through the terminal or over HTTP—aligning with the mission to simplify API evolution and facilitate smoother development workflows.

# SCHEMA_DIFF Feature Enhancement

## Overview
This feature unifies the core JSON schema diff capabilities with comprehensive Markdown reporting and now introduces an AI-powered explanation. It enhances the existing diff functionality by integrating interactive modes, detailed diagnostics, robust report generation, and natural language summaries. Users can now not only see what has changed but also receive a plain language explanation to aid comprehension.

## Functionality
- **Core Diff Operations**:
  - Perform batch and interactive diffs between JSON schemas with both human‑readable outputs and machine‑parsable JSON data.
  
- **Interactive Mode & Diagnostics**:
  - Support an `--interactive` flag for guided, step‑by‑step schema analysis.
  - Include diagnostic flags (`--diagnostics` and `--refresh`) to report runtime details and refresh internal states.

- **Markdown Report Generation**:
  - Introduce a `--report` flag to convert raw diff outputs into well-structured Markdown documents.
  - Organize changes into categorized sections such as Additions, Removals, and Modifications.

- **AI-Powered Diff Explanation**:
  - Utilize the OpenAI API to generate plain language summaries of the differences.
  - Provide a new flag `--explain` that outputs an AI-derived narrative detailing the impact and context of the schema changes.

## Implementation
- **Module Updates**:
  - Enhance `src/lib/schemaDiff.js` to integrate the AI explanation logic alongside interactive diff and Markdown report generation.
  - Ensure that the diff engine calls the OpenAI API when the `--explain` flag is used, capturing and formatting the response.

- **CLI Integration**:
  - Update the CLI Parser (`src/lib/cliParser.js` and `src/lib/main.js`) to support the new `--explain` flag and route commands accordingly.

- **Testing & Validation**:
  - Add comprehensive unit tests (e.g., in `tests/unit/schemaDiff.test.js`) to cover interactive scenarios, diagnostic outputs, report formatting, and AI explanation outputs.

## Documentation & User Guidance
- Update README.md and CONTRIBUTING.md to include usage examples for the new `--explain` flag alongside existing flags like `--interactive`, `--diagnostics`, `--refresh`, and `--report`.
- Include inline code comments and API documentation detailing the integration with the OpenAI API.

## Value Proposition
With the addition of the AI-powered explanation, the SCHEMA_DIFF feature not only highlights changes in JSON schemas but also provides contextual natural language insights. This enhances understanding for API developers and teams, simplifying the evolution of API definitions and facilitating collaboration. This aligns with our mission to simplify API evolution and improve developer workflows.
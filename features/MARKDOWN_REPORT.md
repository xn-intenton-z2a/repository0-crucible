# Markdown Report Feature

## Overview
This feature introduces a new report generation module that produces detailed, executive Markdown formatted reports for JSON Schema differences. It is designed to complement the existing SCHEMA_DIFF interactive mode by summarizing the diff outputs in a clean, structured document that can be easily shared and reviewed.

## Functionality
- **Report Generation**: 
  - Implement a new CLI flag `--report` to trigger the generation of a Markdown report from the diff output.
  - Collate and format differences into sections (e.g., Additions, Removals, Modifications).
- **Integration with Existing Diff Engine**:
  - Leverage the existing comparison engine from SCHEMA_DIFF to gather raw difference data.
  - Transform the raw diff output into a human-readable Markdown report.
- **CLI and API Support**:
  - Extend the CLI to include documentation on report generation usage.
  - Optionally support a lightweight HTTP endpoint for remote report generation.

## Implementation Details
- **Module Placement**: Add a new source file, e.g., `src/lib/markdownReport.js`, that contains the logic to generate the report.
- **Command Parsing**: Update `src/lib/main.js` to recognize the `--report` flag and invoke the markdown report generation function.
- **Error Handling**: Include robust error checking to handle cases where input schema files may cause conflicts or incomplete diff data.
- **Testing**: 
  - Develop unit tests in a new file (e.g., `tests/unit/markdownReport.test.js`) to cover report generation scenarios.
  - Ensure integration tests validate the proper display of the report both in CLI and via HTTP if implemented.

## Documentation & User Guidance
- Update README.md and CONTRIBUTING.md with usage examples, including CLI invocations (e.g., `node src/lib/main.js --report`), and detailed explanations of the report sections.
- Provide inline code comments and examples in the source code to facilitate further contributions and modifications.

## Value Proposition
The Markdown Report feature enhances the json-schema-diff tool by offering a readily shareable, human-readable summary of schema changes. This makes it easier for teams to document API evolution, facilitating collaboration and aiding in version control reviews.

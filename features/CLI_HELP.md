# CLI_HELP Feature Specification

## Overview
This feature enhances the CLI tool by adding a comprehensive help command. When the '--help' flag is present in the command line arguments, the tool will output a detailed usage guide that includes available commands and usage examples. This guide will be dynamically maintained and documented in the README file.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Parse the command-line arguments (process.argv).
  - Check for the '--help' flag. If present, display a help message with usage instructions and available commands.
  - Ensure that the default behavior for other commands remains unchanged.

- **Test File Update (tests/unit/main.test.js):**
  - Add test cases to verify that when the '--help' flag is provided, the output contains the expected help information.
  - Confirm that running the tool with other arguments still executes correctly.

- **README Update (README.md):**
  - Include a new section under "Usage" that documents the '--help' command.
  - Provide examples in markdown to illustrate how to call the CLI with the help flag and what output to expect.

- **Dependencies Update (package.json):**
  - No additional dependencies are needed for this feature. The focus remains on utilising existing libraries and ensuring compatibility with the mission and guidelines.

## Goals
- Improve user experience by providing clear, inline help through the CLI.
- Maintain consistency with the mission of making owl-builder a robust CLI tool for managing OWL ontologies.
- Ensure comprehensive documentation and testing for the new help functionality.

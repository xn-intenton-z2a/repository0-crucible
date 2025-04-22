# CLI_HELP Feature

## Overview
This feature introduces a new `--help` flag to the CLI tool which provides users with a concise yet comprehensive help message listing all available command-line options. This enhancement guides users in understanding the available flags (such as `--demo`, `--demo-verbose`, `--diagnostics`, `--self-improve`, and `--workflow`) and their purposes, thereby improving user experience and reducing the learning curve.

## Implementation Details
- **Source File Changes (src/lib/main.js):**
  - Update the `main` function to check if the `--help` flag is present among the arguments.
  - When detected, output a formatted help message that includes a list of available flags along with brief descriptions. For example:
    - `--demo` / `--enable-demo`: Enables demo mode.
    - `--demo-verbose`: Enables demo mode with verbose output.
    - `--diagnostics`: Outputs detailed system diagnostics.
    - `--self-improve`: Activates self-improvement mode.
    - `--workflow`: Provides guidance on GitHub Actions workflows.
  - After printing the help information, the CLI should exit immediately without processing further commands.

- **Test File Changes (tests/unit/main.test.js):**
  - Add tests to simulate invoking the CLI with the `--help` flag.
  - Verify that the output contains the key headings and descriptions for each available command-line option.

- **README File Changes (README.md):**
  - Update the Usage section to document the new `--help` flag.
  - Provide an example command:
    ```bash
    node src/lib/main.js --help
    ```
  - Include a brief section listing the available flags and a short description of each.

- **Dependencies File Changes (package.json):**
  - No new dependencies are required for this feature.

## Expected Benefits
- **Improved User Guidance:** New users can quickly understand how to use the CLI tool with its various functionalities.
- **Better Developer Experience:** Clear documentation through the help flag reduces the barrier for contribution and usage.
- **Alignment with Mission:** Fulfills part of the self-aware and agentic automation goal by enabling the tool to self-document its capabilities.

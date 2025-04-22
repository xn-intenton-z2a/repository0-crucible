# DEMO Feature

## Overview
This feature refines the existing demo functionality in the CLI tool. Instead of simply outputting "Feature demo enabled", the demo mode now acts as a helpful banner that lists available command options along with their descriptions. In cases where no known flag is provided, the CLI will print a friendly help message detailing available options such as diagnostics, workflow help, and demo mode. This aligns with the mission of improving transparency and self-awareness in the system.

## Implementation Details
- **Source File Changes (src/lib/main.js):**
  - Enhance the existing demo flag handling by checking for the `--demo` or `--enable-demo` flags. When these flags are present, instead of a minimal message, output a banner message that includes a summary of available commands.
  - When no recognized flag is provided, display a help message listing available CLI options (e.g., `--diagnostics`, `--workflow`, `--demo`).

- **Test File Changes (tests/unit/main.test.js):**
  - Update tests to verify that when the demo flag is provided, the output contains a more detailed banner message including command summaries.
  - Optionally, add a test that verifies the default help message is printed when no supported flag is provided.

- **README File Changes:**
  - Update the Usage section to document the refined demo functionality. Include examples showing the enhanced banner output and a brief description of available commands.

- **Dependencies File Changes:**
  - No new dependencies are required for this feature.

## Expected Benefits
- **Enhanced User Guidance:** Provides users with a clear and friendly overview of available CLI options directly on startup.
- **Improved Developer Experience:** Makes it easier for developers to explore different functionalities, thereby lowering the learning curve.
- **Alignment with Mission:** Supports the mission of developing a self-aware, agentic automation tool through improved self-documentation and user feedback.

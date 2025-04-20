# CLI_INTERACTION

## Overview
This feature merges the functionalities of goal planning and interactive CLI enhancements into one unified module. The agent now not only supports compound command decomposition with a dry-run (planning) mode but also provides a colorized, interactive command line interface (REPL) with auto-completion for commands and flags. By doing so, it streamlines the user experience while maintaining the core capabilities of both planning and enriched CLI interactions.

## Implementation Details
- **Compound Command Parsing & Planning Mode:**
  - Enhance the main CLI parser to detect compound commands using delimiters (such as semicolons or keywords like "then").
  - Introduce a `--plan` flag that, when provided, outputs an ordered, step-by-step plan rather than executing the sub-commands immediately.
  - Ensure that in planning mode the command steps are logged without side-effects (e.g., without affecting counters).

- **Interactive REPL & Colorized Output:**
  - When the `--interactive` flag is detected, initialize a REPL that listens on `process.stdin` and outputs to `process.stdout`.
  - Integrate a color library (e.g., Chalk) to enhance the readability: errors are displayed in red, successes in green, and informational messages in blue.
  - Implement a custom completer function for auto-completion of available commands and flags based on partial user input.

- **Source File Updates:**
  - Update `src/lib/main.js` to handle the new `--plan` and `--interactive` flags within the same command processing flow.
  - Retain existing logging mechanisms so that planning mode and interactive mode benefit from diagnostic and memory logging features.

- **Testing & Documentation:**
  - Update tests in `tests/unit/main.test.js` to simulate compound command parsing, dry-run planning, and interactive mode sessions. Use spies to verify that auto-completion suggestions and colorized outputs are triggered as expected.
  - Revise the README to include examples for both the `--plan` and `--interactive` flags and explain how the unified interaction model improves user experience.

## Long-Term Direction
This unified CLI interaction feature lays the groundwork for further enhancements, such as configurable themes for the interactive session or more advanced command parsing that could integrate natural language processing. By consolidating both planning and interactive enhancements into one feature, the agent retains a coherent user interface that aligns with its mission of self-improving, agentic automation while remaining efficient and user-friendly.

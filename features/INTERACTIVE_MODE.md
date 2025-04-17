# INTERACTIVE_MODE

## Overview
This feature equips the CLI tool with an interactive Read-Eval-Print Loop (REPL) that now includes shell auto-completion capabilities. In addition to its existing functionality for live commands and immediate feedback, the interactive mode will suggest available commands and flags as you type, improving usability and reducing errors in command invocation.

## Implementation Details
- **Flag Detection & Readline Integration:**
  - When the `--interactive` flag is detected, the tool creates a readline interface that listens on `process.stdin` and outputs to `process.stdout`.
  - Enhanced with a custom completer function, the REPL will provide auto-completion suggestions for available flags (e.g. `--persist-memory`, `--diagnostics`, `--export-memory`, etc.) and sub-commands (such as `--query-memory`, `--clear-memory`, etc.).

- **Shell Auto-Completion:**
  - Implement a completer function within the interactive session that matches partial input against a predefined list of commands and flags extracted from the current CLI options.
  - The completer returns arrays of suggestions for the REPL to display, assisting users in entering valid and complete commands. 
  - This auto-completion logic will support both the main commands and new additions related to memory logging and diagnostics.

- **Command Processing:**
  - Each command entered in the interactive session is processed using the existing logic in `src/lib/main.js`, ensuring consistency with non-interactive mode.
  - Auto-completion suggestions are dynamically generated based on the current state of available flags and recently used commands.

- **Documentation Updates:**
  - Update `README.md` to include instructions and examples on using the new auto-completion feature in interactive mode. For example:
    ```bash
    node src/lib/main.js --interactive
    ```
  - Explain that within the interactive prompt (displaying as `agent> `), pressing the <tab> key will present a list of valid command completions.

- **Testing Enhancements:**
  - Extend tests in `tests/unit/main.test.js` to simulate interactive sessions that include auto-completion. Use mocks/spies on the readline completer function to verify that correct suggestions are provided when partial input is given.
  - Ensure that the auto-completion does not interfere with the normal processing of commands.

## Long-Term Direction
Integrating shell auto-completion into the interactive mode is a stepping stone towards a more user-friendly and intelligent command-line interface. Future directions may include dynamic suggestion updates based on command history, context-aware completions that change according to prior inputs, and integration with external documentation or help systems. Combined with the existing interactive capabilities, this enhancement will contribute to a more efficient and error-resistant developer experience.

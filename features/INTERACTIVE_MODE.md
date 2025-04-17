# INTERACTIVE_MODE

## Overview
This update adds an interactive Read-Eval-Print Loop (REPL) mode to the CLI tool. When run with the `--interactive` flag, the tool will enter a live session allowing users to input commands one-by-one, receive immediate feedback, and test behavior dynamically. This feature improves usability and debugging by letting developers experiment with commands in real time.

## Implementation Details
- **Flag Detection:**
  - Modify the main function in `src/lib/main.js` to check for the `--interactive` flag.

- **Readline Integration:**
  - Import Node.js’s `readline` module.
  - When the flag is detected, create a readline interface that listens on `process.stdin` and outputs to `process.stdout`.
  - Display a prompt (e.g. `agent> `) and process each input using the same logic as non-interactive commands.
  - Allow a dedicated command (for example, `exit`) or detect `Ctrl+C` to gracefully terminate the session.

- **Command Processing:**
  - Each entered command should be handled using the existing logic—logging the command to memory, obeying flags like `--persist-memory` if applicable, and finally echoing the result.
  - Ensure that the interactive session does not record commands redundantly (i.e. both as interactive entries and as startup arguments) unless needed for traceability.

## Testing
- **Unit Tests Update:**
  - Extend `tests/unit/main.test.js` to simulate an interactive session. Use mocks/spies on `console.log` to verify that the prompt is displayed and that input is processed correctly.
  - Simulate a sequence of commands entered in interactive mode (e.g., a couple of normal commands followed by an `exit` command) and verify that the session terminates as expected.

## Documentation Updates
- **README.md:**
  - Update the usage section to include instructions for interactive mode with an example:
    ```bash
    node src/lib/main.js --interactive
    ```
  - Explain that interactive mode is intended for live testing and debugging of agent commands.

## Long-Term Direction
Enhancing interactive mode sets the stage for future improvements such as contextual help, command autocompletion, and dynamic diagnostics queries within the live session. This will further align the CLI tool with the mission of building an intelligent, self-reflective agent capable of adaptive behavior based on real-time input.

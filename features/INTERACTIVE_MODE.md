# INTERACTIVE_MODE

## Overview
This feature introduces an interactive mode to the CLI tool, allowing users to enter commands in a REPL (read-eval-print loop) style. Instead of supplying all command arguments at startup, users can engage with the tool asynchronously, test commands on the fly, and view immediate feedback. This enhances usability, especially during development, debugging, or exploration of the agent’s capabilities.

## Implementation Details
- **Interactive Flag Detection:**
  - Modify the main function in `src/lib/main.js` to check for a new `--interactive` flag. When this flag is detected, the tool should initiate an interactive session via Node.js’s `readline` module.

- **Readline Integration:**
  - Import the `readline` module and create an interface that reads from `process.stdin` and writes to `process.stdout`.
  - In the interactive session, display a prompt (e.g., `agent> `) where users can input commands.
  - For each command entered, process it using the same logic as supplied command-line arguments (logging into memory, supporting other flags if applicable), and then provide prompt feedback via `console.log`.
  - Implement an `exit` command (or detect `Ctrl+C`) that gracefully terminates the interactive session.

- **Memory Logging and Persistence:**
  - As each command is entered, record the command in the in-memory `memoryLog` as done in non-interactive mode. This ensures consistency and traceability.

- **Test Enhancements:**
  - Update the test file (`tests/unit/main.test.js`) to simulate the interactive mode. Use spies on `console.log` to verify that the prompt is displayed and that commands are processed correctly.
  - Simulate an interactive session by programmatically injecting commands and capturing outputs, ensuring that the session terminates when `exit` is entered.

- **Documentation Updates:**
  - Update the `README.md` to include usage instructions for the interactive mode. Provide an example:
    ```bash
    node src/lib/main.js --interactive
    ```
  - Explain how users can enter commands, view immediate responses, and exit the session.

## Long-Term Direction
This interactive mode lays the groundwork for future enhancements such as contextual help, dynamic diagnostics queries, and richer command autocompletion. It supports the overall aim of making the CLI tool not just a batch processor but a flexible, user-friendly assistant aligned with the agentic mission.
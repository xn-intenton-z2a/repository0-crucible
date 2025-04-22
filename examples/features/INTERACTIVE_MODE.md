# INTERACTIVE MODE

## Overview
This feature introduces an interactive mode for the CLI tool. When the `--interactive` flag is provided, the application will prompt the user for input before proceeding with its operations. This enhancement improves usability in situations where confirmation or additional input is needed, especially when certain parameters are missing or when critical operations are about to be executed.

## Implementation Details

### Source File Update (src/lib/main.js):
- **Interactive Prompt:** Import the built-in `readline` module.
- **Flag Detection:** In the `main()` function, check if the CLI arguments include `--interactive`.
- **Prompt Logic:** If the flag is present and the process is running in a TTY environment, create a readline interface and prompt the user with a message such as "Interactive mode active: Press Enter to continue...". Only after the user presses Enter should the program continue with its normal execution flow.
- **Non-blocking Behavior:** Ensure that if the flag is not present or if the environment is non-interactive, the CLI behaves as before.

### Test File Update (tests/unit/main.test.js):
- **Simulated Interactive Input:** Add unit tests that simulate interactive mode by mocking the readline interface. For example, automatically trigger the input callback to simulate the user pressing Enter.
- **Verification:** Assert that when `--interactive` is included in the arguments, the interactive prompt message is logged and subsequent operations (such as logging CLI arguments and execution time) proceed normally.

### README Update (README.md):
- **Documentation:** Update the README to include documentation for the new `--interactive` flag. Provide a usage example:
  ```bash
  node src/lib/main.js --interactive
  ```
- **Description:** Explain that this mode will prompt the user before continuing, making it useful in scenarios where confirmation is desired.

### Dependencies File Update (package.json):
- **No New Dependencies:** This feature leverages Node.js's built-in `readline` module, so no changes to dependencies are needed.

## Testing & Compatibility
- Use `npm test` to ensure the interactive mode tests pass without issues.
- Confirm that in environments where TTY is not available, the interactive prompt is automatically bypassed.

## Future Considerations
- Extend interactive mode to provide more nuanced prompts, such as dynamically requesting missing parameters or offering confirmation dialogs for destructive operations.
- Integrate richer terminal UI elements (while remaining lightweight) in future iterations.

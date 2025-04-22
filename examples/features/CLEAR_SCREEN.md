# CLEAR_SCREEN

## Overview
This feature introduces a new CLI flag `--clear` for the CLI tool. When the `--clear` flag is added, the tool will clear the console before it logs any other messages. This helps improve readability by ensuring that previous logs do not clutter the current output session. This feature is lightweight, achievable in a single repository update affecting only the source file, test file, README, and dependencies files.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - At the beginning of the `main()` function, check if the CLI arguments include `--clear`.
  - If detected, invoke `console.clear()` to clear the console screen.
  - Continue with the existing logging of arguments and execution time.

- **Test File Update (tests/unit/main.test.js):**
  - Add a test case to simulate passing the `--clear` flag.
  - Spy on `console.clear` to ensure it is called when the flag is present.
  - Also, verify that other outputs (like the JSON formatted argument log and execution time) continue to function normally.

- **README Update (README.md):**
  - Update the usage instructions to document the new `--clear` flag.
  - Provide an example command, e.g., `node src/lib/main.js --clear`, and explain that it clears the screen before outputting logs.

- **Dependencies File Update (package.json):**
  - No additional dependencies are required; the feature uses built-in console methods.

## Testing & Compatibility
- Run `npm test` to ensure that the test case for the `--clear` flag passes without errors.
- Verify that when the flag is provided, the console is cleared before any output is logged and that all other log messages appear in the expected order.

## Future Considerations
- Consider integrating a configuration option to enable or disable this behavior by default in non-interactive environments.
- Additional visual enhancements (such as styled headers after clearing the screen) could be added later to further improve readability.
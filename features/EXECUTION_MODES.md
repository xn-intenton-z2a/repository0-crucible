# EXECUTION_MODES

## Overview
This feature introduces execution modes to the CLI by implementing support for the previously announced but unimplemented flags: `--serve`, `--build-intermediate`, and `--build-enhanced`. These modes allow users to trigger different operational behaviors of the tool, such as starting a simulated server or executing various build routines. Integrating these modes improves usability and aligns with our mission of practical automation by providing clear outputs for distinct actions.

## Implementation Details
- **Server Mode (`--serve`):**
  - Update the source file (`src/lib/main.js`) to recognize the `--serve` flag.
  - When detected, print a message such as "Starting server on port 3000..." to simulate server startup. This lays groundwork for future expansion.

- **Build Modes (`--build-intermediate` and `--build-enhanced`):**
  - Update the CLI logic so that when either flag is provided, the corresponding message is printed:
    - For `--build-intermediate`: output "Building with intermediate options..."
    - For `--build-enhanced`: output "Building with enhanced options..."
  - Ensure that these modes do not interfere with the other functionalities (like help, version, diagnostics, refresh, or merge-persist).

## Testing Updates
- **Source File Tests:**
  - In the test file (`tests/unit/main.test.js`), add unit tests for the new flags to verify that the correct output is printed for each flag.
  - Use spies to capture the console output and assert that the messages for `--serve`, `--build-intermediate`, and `--build-enhanced` are as expected.

## Documentation Updates
- **README.md:**
  - Add a new section under CLI Options to document the new execution modes. Provide examples of how to run the CLI tool with these flags:
    - Example: `node src/lib/main.js --serve` prints "Starting server on port 3000..."
    - Example: `node src/lib/main.js --build-intermediate` prints the build intermediate message.
    - Example: `node src/lib/main.js --build-enhanced` prints the build enhanced message.

## Long-Term Direction
This feature is a stepping stone toward a richer CLI tool. In the future, the server mode could evolve into a fully functional HTTP server, and build commands could trigger more complex compile and bundling processes. This foundational work reinforces our commitment to practical automation and continuous refinement.

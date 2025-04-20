# VERBOSE_OUTPUT

## Overview
This feature enhances the CLI tool by introducing a verbose output mode. When the `--verbose` flag is provided, the tool will display additional contextual information such as a detailed list of processed arguments and environment details. This mode helps during debugging and provides an extra layer of insight into the internal state of the program.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Modify the main function to check if `--verbose` is present in the command-line arguments.
  - If `--verbose` is detected, in addition to the regular output, print a detailed message including the raw arguments array and an optional message like "Verbose Mode Active".
  - Maintain the default output behavior when the flag is absent.

- **Test File Update (tests/unit/main.test.js):**
  - Add a test case that simulates running the program with the `--verbose` flag.
  - Capture the console output and assert that it contains both the regular JSON output and the additional verbose details (e.g. presence of the string "Verbose Mode Active").

- **README Update (README.md):**
  - Update the usage instructions to document the new `--verbose` flag. Include an example command, e.g., `node src/lib/main.js --verbose`, and explain that it provides extra information useful for debugging.

- **Dependencies File Update (package.json):**
  - No additional dependencies are required for this feature.

## Testing and Compatibility
- Run `npm test` to ensure the new verbose flag test passes as expected.
- Verify that in absence of the flag, the CLI outputs remain unchanged, ensuring backward compatibility.
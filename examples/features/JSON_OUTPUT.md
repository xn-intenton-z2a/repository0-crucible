# JSON_OUTPUT

## Overview
This feature adds a JSON output mode to the CLI tool. When the `--json` flag is provided, the tool will format its output as a structured JSON object (instead of plain text). This machine-parsable output is ideal for integrations, logging systems, or further automated processing.

## Implementation Details
- **Source File Update (src/lib/main.js):**
  - Enhance the main function to check for the presence of the `--json` flag in the command-line arguments.
  - When `--json` is detected, wrap the output message in a JSON structure. For example, instead of `console.log(`Run with: ${JSON.stringify(args)}`)`, output `console.log(JSON.stringify({ message: 'Run with', args: args }))`.
  - Ensure that regular execution still logs in the default style when `--json` is not provided.

- **Test File Update (tests/unit/main.test.js):**
  - Add a test case that simulates running the program with the `--json` flag.
  - Capture the console output and assert that it is valid JSON (e.g. using `JSON.parse`) and contains the expected keys such as "message" and "args".

- **README Update (README.md):**
  - Update the usage instructions to document the new `--json` flag. Provide a sample command, e.g., `node src/lib/main.js --json`, and explain that it outputs machine-readable JSON for further processing.

- **Dependencies File Update (package.json):**
  - No additional dependencies are required for this feature.

## Testing & Compatibility
- Run `npm test` to ensure that the test case for the JSON output mode passes without error.
- Verify that in environments where the flag is omitted, the CLI continues to display the default output style, ensuring backward compatibility.

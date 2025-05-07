# Summary

Enable structured JSON output modes for the CLI, combining standard JSON output and diagnostics reporting into a unified feature for programmatic consumption and debugging.

# Specification

- Recognize two flags processed before other commands
  • --json enables JSON_OUTPUT mode
  • --diagnostics enables diagnostics mode
- JSON_OUTPUT behavior
  1. For face generation, output one compact JSON object: {faces: [face1, face2, ...]}
  2. For list-faces, output {faces: [...]} with all face strings
  3. For list-categories, output {categories: [...]} with all category names
  4. Errors remain printed to stderr via errorExit and exit nonzero
- Diagnostics behavior
  1. Suppress normal output and collect fields
     nodeVersion cliVersion builtInFacesCount categories customLoaded customFacesCount mergeMode seed timestamp
  2. On success print a pretty JSON object to stdout and exit zero
  3. On file or parse errors include an error field in the JSON and exit nonzero

# Testing

- Add tests in tests/unit for main invoked with --json in combination with --face, --list-faces, and --list-categories, verifying valid compact JSON
- Add tests for main invoked with --diagnostics verifying presence and types of all required keys, and error field on failure
- Ensure errorExit behavior remains consistent for invalid arguments outside JSON mode

# Documentation

- Update README.md Features section to document --json and --diagnostics flags with examples
- Create or merge docs/JSON_OUTPUT.md and docs/DIAGNOSTICS.md into docs/STRUCTURED_OUTPUT.md describing both modes and sample outputs

# Implementation Details

- In src/lib/main.js extend argument parsing to detect --json and --diagnostics early
- Consolidate JSON output and diagnostics blocks into a single output handler
- Use console.log(JSON.stringify(obj)) for JSON_OUTPUT and console.log(JSON.stringify(obj, null, 2)) for diagnostics
- Ensure errorExit prints to stderr and does not produce JSON output except in diagnostics mode where error field is included
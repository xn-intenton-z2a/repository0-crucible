# Summary

Add an option to output faces as a JSON array rather than plain text, enabling programmatic consumption of ASCII faces.

# Behavior

When the user passes --format json or -j, the CLI collects the requested number of faces and outputs them as a single JSON array to stdout, then exits. The default output format remains one face per line.

# Implementation

1. Update OptionsSchema in src/lib/main.js to include a new field format as a zod enum with values text and json, defaulting to text.
2. Accept flags --format and -j. Parse and validate these in parseOptions alongside existing flags.
3. In main, after gathering the faces in an array, check the format option. If format is json, console.log(JSON.stringify(facesArray)); otherwise, log each face on its own line as before.

# Testing

- Add unit tests for parseOptions to ensure --format json and -j produce format json and that invalid formats throw errors.
- Add tests for main to verify that invoking with --format json returns a single console.log invocation with a JSON array string containing the correct faces.
- Ensure existing tests for text output without the flag continue to pass unchanged.

# Documentation

- Update README.md under Features and docs/USAGE.md to document the new --format/-j flag, describe the JSON output format, give examples for both text and JSON modes, and note default behavior.
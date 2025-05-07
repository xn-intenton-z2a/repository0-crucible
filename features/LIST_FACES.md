# Purpose
Provide a CLI command to list all available ASCII faces, including built-in and custom sets, so users can inspect and choose from the full palette.

# Implementation Details
1. Parse list flag
   • Add a boolean option list (alias L) to minimist configuration alongside existing flags.
   • Default value: false.
2. Load faces
   • If flags.list is true, determine the faces array: start with asciiFaces.
   • If flags.config is provided, load custom faces via loadFaces and concatenate to the built-in list.
3. JSON output support
   • If flags.json (alias j) is also true, wrap the faces array in JSON.stringify and print once.
   • Otherwise, iterate over faces and console.log each face on its own line.
4. Control flow
   • In main(), if flags.list is present, perform listing logic and return immediately without generating random faces or starting HTTP server.
5. Help message update
   • Update helpMessage to include --list (-L) description and note JSON compatibility when used with --json.

# CLI Interface Examples
- List built-in faces:
  node src/lib/main.js --list

- List built-in and custom faces (YAML or JSON file):
  node src/lib/main.js --list --config faces.yaml

- List faces in JSON format:
  node src/lib/main.js --list --json

- Alias example using -L:
  node src/lib/main.js -L

# Testing
1. Unit tests in tests/unit/main.test.js
   • Mock console.log and run main(["--list"]); assert console.log called asciiFaces.length times with each known face.
   • Run main(["--list","--config",path]); stub loadFaces; assert combined list printed.
   • Test --list --json produces one console.log with a valid JSON array equal to the faces list.
   • Alias -L works identically to --list.
2. E2E tests in tests/e2e/cli.test.js
   • Execute CLI binary with --list and capture stdout; verify all built-in faces are present in output.
   • Execute with both --list and --config; verify custom faces appear after built-in.
   • Execute with --list --json; parse stdout as JSON and assert array contents and order.

# Documentation
- Update README.md under Features to describe --list (-L) flag and JSON output option.
- Extend docs/USAGE.md in a List Faces section with usage examples for plain and JSON listing.
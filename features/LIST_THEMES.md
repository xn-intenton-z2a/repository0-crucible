# Purpose
Provide a CLI option to list all predefined face themes and sample faces, enabling users to discover emotional palettes without manual inspection.

# Implementation Details
1. Parse list-themes flag
   • Add a boolean option list-themes to minimist configuration alongside existing flags.
   • No alias by default to avoid conflicts with other flags.
2. Collect theme data
   • Retrieve available theme names via Object.keys(faceThemes).
   • For each theme, select a representative sample face (e.g., the first face in the theme array).
3. Output formatting
   • If flags.json is true, build an object mapping theme names to their full face arrays and print JSON.stringify of that object.
   • Otherwise, iterate themes and console.log a line in the format: themeName: sampleFace (count faces)
4. Control flow in main()
   • In main(), before any generation or server startup, if flags.listThemes (list-themes) is present, perform the listing logic and return immediately.
   • Do not require --face for this operation.
5. Help and validation
   • Update helpMessage to include --list-themes description and JSON compatibility note.

# CLI Interface Examples
- List themes in plain text:
  node src/lib/main.js --list-themes
  Outputs:
  happy: (^_^) (2 faces)
  sad: (T_T) (2 faces)
  surprised: (*_*) (2 faces)

- List themes and full face arrays in JSON:
  node src/lib/main.js --list-themes --json
  Outputs: {"happy":["(^_^)","(^3^)"],"sad":["(T_T)","(o_O)"],"surprised":["(*_*)",">_<"]}

# Testing
1. Unit Tests in tests/unit/main.test.js
   • Mock console.log and run main(["--list-themes"]); assert console.log called for each theme with correct sample and count.
   • Run main(["--list-themes","--json"]); assert console.log called once with valid JSON mapping all themes to their arrays.
2. Integration Tests in tests/e2e/cli.test.js
   • Execute CLI binary with --list-themes; capture stdout and verify lines for each theme.
   • Execute CLI with --list-themes --json; parse stdout as JSON and assert object keys and array values match faceThemes.

# Documentation
- Update README.md under Features to describe the --list-themes flag and its purpose.
- Extend docs/USAGE.md with a List Themes section, usage examples, and JSON output notes.
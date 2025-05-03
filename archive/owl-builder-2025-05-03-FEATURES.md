features/CUSTOM_FACE_SETS.md
# features/CUSTOM_FACE_SETS.md
# Summary
Allow users to load and manage custom ASCII face collections via a YAML configuration file. By default the CLI uses the built-in set, but users can supply their own face definitions to tailor emotional feedback.

# Behavior
When the --faces option is provided with a filepath, the tool will attempt to load the YAML file at that path. The file should contain an array of string patterns. If loading succeeds, these faces replace the built-in set for subsequent output. If loading fails or the file does not exist, the tool will emit an error message and fall back to the default set.

# CLI Interface
- --faces <path> : Path to a YAML file defining an array of faces.
- --help        : Show usage instructions including --faces description.
- seed <number> : (unchanged) Use a seed to choose faces deterministically.
- count <n>     : (unchanged) Output n faces in sequence.

# Source Changes
- Update src/lib/main.js to:
  - Import js-yaml to parse YAML files.
  - Add a function to read and parse faces from a YAML file when --faces is passed.
  - Validate that parsed data is an array of non-empty strings.
  - Fall back to default face array on parse errors, logging a warning.
  - Integrate with existing face generator logic.

# Tests
- In tests/unit/main.test.js, add:
  - A test fixture YAML file under tests/unit/fixtures/custom_faces.yaml containing known faces.
  - A test verifying that --faces with a valid file loads the custom array and outputs a face from that set.
  - A test verifying that an invalid YAML file produces a warning and uses default faces.
  - Edge tests for empty array and non-string entries rejecting the file and falling back.

# Documentation
- Update README.md under Features:
  - Document the --faces option and expected YAML format.
  - Provide an example custom_faces.yaml snippet and usage examples.
  - Note fallback behavior when the file cannot be loaded.

# Dependencies and Files
- Ensure js-yaml remains in dependencies; no new packages.
- Create a tests/unit/fixtures/custom_faces.yaml for test purposes.
- Modify package.json scripts if needed to reference fixture loading.
features/ASCII_FACE_OUTPUT.md
# features/ASCII_FACE_OUTPUT.md
# Summary

Enhance the CLI to support a version flag that prints the tool version alongside the existing help flag functionality. Users can easily discover the current release without inspecting package files.

# Behavior

When the tool is invoked with --version or -v:
  • Read the version string from package.json.
  • Print the version alone to stdout.
  • Exit with code 0 immediately without generating faces or printing usage.

All existing behaviors for --help, --faces, --seed, and --count remain unchanged.

# CLI Interface

- -h, --help       Show usage instructions and exit 0.
- -v, --version    Show CLI version and exit 0.
- --faces <path>   Path to a YAML file defining custom faces.
- --seed <number>  Seed for deterministic face selection.
- --count <n>      Number of faces to output (default 1).

# Source Changes

In src/lib/main.js:
  • At the top of argument parsing, detect --version or -v before other options.
  • Add a function printVersion() that loads package.json via import with assert type json or fs.readFileSync, parses JSON, and logs the version field.
  • If version flag is detected, call printVersion() and process.exit(0) immediately.
  • Ensure help detection remains after version.
  • Maintain existing import of js-yaml and face generation logic.

# Tests

In tests/unit/main.test.js:
  • Add tests for main(["--version"]) and main(["-v"]).
      – Spy on console.log and process.exit.
      – Expect console.log called once with the version string matching package.json version.
      – Expect process.exit called with 0 and no face output.
  • Ensure help, seed determinism, count, and custom face tests continue passing.

# Documentation

In README.md under Features and Usage:
  • Document the -v alias and --version flag with a brief description.
  • Show an example of running node src/lib/main.js --version and sample output reflecting the package.json version.

# Dependencies and Files

- No new dependencies are required.
- Update only src/lib/main.js, tests/unit/main.test.js, and README.md.

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

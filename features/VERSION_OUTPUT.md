# Purpose

Add a --version (-V) flag to the CLI tool to display the current application version from package.json, enabling users to quickly identify the installed version.

# Implementation Details

1. Import Version
   • At the top of src/lib/main.js, import version from package.json:
     import { version } from '../../package.json';

2. Parse Version Flag
   • Extend minimist configuration:
     - Add boolean option version with alias V.
     - Include "version" and "V" in the alias mapping and default values.
     - Update knownFlags to include "--version" and "-V".

3. Handle Version Flag Early
   • Immediately after parsing flags and checking for unknownFlags and help:
     - If flags.version is true:
       console.log(version);
       return;

4. Help Message Update
   • Update helpMessage to include:
     "  --version, -V       Show application version"
   • Position it alongside other options in the Options section.

# CLI Interface Examples

- node src/lib/main.js --version
  Prints the installed version (e.g., 1.2.0-0) and exits.

- node src/lib/main.js -V
  Equivalent shorthand for printing the version.

# Testing

1. Unit Tests in tests/unit/main.test.js
   • Spy on console.log and call main(["--version"]); expect console.log called once with imported version value.
   • Verify that no other output or errors occur.

2. CLI Integration Test
   • In tests/e2e/cli.test.js, spawn the CLI binary with --version; capture stdout; assert that stdout matches the package.json version string and process exits immediately.

# Documentation

- Update README.md under Features to list "--version, -V" with description "Show application version".
- Extend docs/USAGE.md in Additional Options to describe the version flag and provide examples for both long and short forms.
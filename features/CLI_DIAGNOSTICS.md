# Overview

Add a diagnostics option to the CLI entrypoint in src/lib/main.js to help users troubleshoot environment and version issues. When the user invokes the tool with --diagnostics, the CLI will gather runtime information and print a JSON object containing:

- The owl-builder package version
- The current Node.js version
- The operating system platform
- A map of direct dependencies (name and version)

# Implementation

1. In src/lib/main.js detect the --diagnostics flag before any other subcommand logic.
2. Import or read package.json at runtime to extract the version and dependencies fields.
3. Use process.version for Node.js version and process.platform for OS platform.
4. Construct a diagnostic object with keys: packageVersion, nodeVersion, platform, dependencies.
5. Print the diagnostic object with JSON.stringify(diagnosticObject, null, 2) to stdout and exit with code 0.
6. If any error occurs while reading package.json, log a descriptive error and exit with code 1.

# Testing

Update tests/unit/main.test.js to include a new test case for diagnostics mode:

- Simulate process.argv containing node, script path, --diagnostics.
- Spy on console.log to capture output.
- Invoke main() and verify:
  • main returns or completes without throwing.
  • Captured output parses to an object with keys packageVersion, nodeVersion, platform, dependencies.
  • packageVersion matches the version in package.json.
  • nodeVersion matches process.version.
  • dependencies is an object containing known direct dependency names from package.json.

# Documentation

1. Update README.md to describe the diagnostics option under Command-Line Interface:
   - Add an example: node src/lib/main.js --diagnostics
   - Show sample output JSON.
2. Update docs/USAGE.md under CLI Usage to include the new --diagnostics invocation, its description, and expected fields in the output.

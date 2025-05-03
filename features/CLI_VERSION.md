# CLI_VERSION Feature

# Overview
Add a version flag to the CLI that prints the current application version and exits.

# Behavior
With the --version or -v flag:
- Read the version from package.json via process.env.npm_package_version or import
- Print the version string to stdout
- Exit with status code 0 without performing any other actions

# CLI Options
--version        Show version and exit
-v               Alias for --version

# Implementation Details
In src/lib/main.js:
- At the start of main(args), detect --version or -v flags before other modes
- Use process.env.npm_package_version or import the version from package.json
- Call console.log with the version string
- Call process.exit(0)

# Tests
In tests/unit/main.test.js:
- Spy on console.log and process.exit
- Verify main(['--version']) logs version matching package.json and exits with code 0
- Verify main(['-v']) behaves identically
# Overview

Add a diagnostics mode to the CLI that outputs detailed environment and runtime information. This feature helps users and operators inspect system characteristics, library versions, and execution environment for troubleshooting and auditing purposes.

# Implementation

1. CLI Flag
   - Add a new boolean flag --diagnostics to src/lib/main.js argument parsing via minimist.
   - When --diagnostics is present, bypass normal computation or server startup and trigger diagnostics output.

2. Data Gathering
   - Import the os module and read process and package.json metadata.
   - Collect information including:
     • Node version and executable path
     • Operating system platform, release, CPU architecture, and CPU core count
     • Total and free system memory
     • Versions of key dependencies from package.json (express, minimist, zod)
     • Current working directory and environment variables summary

3. Output Generation
   - Construct a diagnostics object with the collected fields.
   - If an --output <path> flag is provided:
     • Use fs/promises to write the JSON string of diagnostics to the file path in UTF-8.
     • On success exit with code 0, on error print error to stderr and exit with code 1.
   - If --output is omitted:
     • Print the diagnostics object as pretty JSON to stdout.
     • Exit with code 0.

# Testing

- Create tests/unit/diagnostics.test.js:
  • Simulate process.argv with --diagnostics and capture stdout. Parse the JSON and assert required keys exist and have correct types.
  • Simulate with --diagnostics --output temp.json and verify the file is created and contains valid JSON with matching fields.
  • Simulate file write errors by pointing --output to an invalid directory and assert exit code 1 and error message on stderr.

# Documentation

- Update README.md under CLI options:
  • Document the --diagnostics flag, describe its purpose and output format.
  • Document the optional --output flag and behavior.
  • Provide example commands:
      node src/lib/main.js --diagnostics
      node src/lib/main.js --diagnostics --output diagnostics.json

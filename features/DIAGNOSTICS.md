# Purpose
Add a diagnostics mode to the CLI tool that outputs detailed runtime information as JSON. This assists debugging, monitoring, and integration by exposing environment details, configuration settings, and face data metrics.

# Implementation Details
1. Parse diagnostics flag
   • Add a boolean option diagnostics (alias d) to the minimist configuration alongside existing flags.
2. Collect runtime data
   • Import version from package.json using an import statement.
   • Capture Node.js version via process.versions.node and platform via process.platform.
   • Retrieve memory usage metrics from process.memoryUsage.
   • Compute builtInFaceCount using the length of asciiFaces.
   • If a config path is provided, include configPath and compute customFacesCount by calling loadFaces with the provided path.
   • Record a timestamp using new Date().toISOString().
3. Output JSON
   • Create a diagnostics object containing all collected fields.
   • Print the object as a JSON string to standard output using console.log.
4. Control flow
   • In main(), if the diagnostics flag is present, perform diagnostics output and return immediately without generating a face or starting the HTTP server.

# CLI Interface Examples
- Run diagnostics in default mode:
  node src/lib/main.js --diagnostics

- Run diagnostics with a custom faces config file:
  node src/lib/main.js --diagnostics --config path/to/faces.yaml

# Testing
1. Unit Tests
   • Mock console.log and run main with diagnostics flag; parse logged output as JSON and assert presence and types of version, nodeVersion, platform, memoryUsage, builtInFaceCount, timestamp.
   • Mock loadFaces to return a known array and run diagnostics with config flag; assert customFacesCount matches mock length and configPath matches input.
2. Integration Tests
   • Execute the CLI binary with diagnostics flag via tests/e2e/cli.test.js; parse stdout JSON and verify memoryUsage fields are numeric and timestamp is valid ISO string.

# Documentation
- Update README.md under Features to describe the diagnostics flag and its purpose.
- Extend docs/USAGE.md with a new Diagnostics section showing examples and sample JSON output.
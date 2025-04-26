# Description
Provide a CLI command to show diagnostic information about the runtime environment and configured data sources for debugging and monitoring.

# Implementation
Extend main to detect the --diagnostics or -d flag. When present gather the following information
  nodeVersion from process.version
  workingDirectory from process.cwd()
  publicDataSourcesCount from PUBLIC_DATA_SOURCES length
  publicDataSources array with objects containing name and url properties
Convert this information into a JSON string formatted with two space indentation and output via console.log then return. Preserve existing behavior when this flag is not provided.

# CLI Usage
To display diagnostics
  node src/lib/main.js --diagnostics
  node src/lib/main.js -d
Expected output example
  {
    nodeVersion: v20.x.x,
    workingDirectory: /path/to/project,
    publicDataSourcesCount: 1,
    publicDataSources: [
      { name: DBpedia SPARQL, url: https://dbpedia.org/sparql }
    ]
  }

# Testing
Add a unit test that spies on console.log when calling main(["--diagnostics"]) and verifies the output is valid JSON containing nodeVersion and publicDataSourcesCount. Ensure main returns without throwing an error.

# Documentation Updates
Update docs/FEATURES.md to describe the diagnostics option and its expected output. Update docs/USAGE.md and README.md under Features to include diagnostics command examples.
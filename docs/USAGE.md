# Usage Instructions

## Command Line Interface

You can run the CLI using Node.js. The basic command format is:

  node src/lib/main.js [options]

## Available Options and Features

- --help: Displays a detailed help message (see CLI_HELP.md for additional details).
- --version: Outputs the current version of the tool, matching the version in package.json.
- --version-details: Outputs detailed version metadata as a JSON object, including version, name, description, and repository information if available (see VERSION_DETAILS.md).
- --diagnostics: Displays runtime diagnostics information about the current environment (refer to DIAGNOSTICS.md).
- --capital-cities: Outputs an OWL compliant JSON object containing a list of capital cities. By default, it includes at least 10 entries. It supports an optional filter via --country=CountryName to display a specific country's capital (see CAPITAL_CITIES.md).
- --crawl: Simulates crawling public data sources and outputs a confirmation message (refer to DATA_CRAWL.md).
- --query-owl: Outputs a sample JSON response simulating a SPARQL query against an OWL ontology (refer to SPARQL_QUERY.md).

## Usage Examples

- Display help information:
  
  node src/lib/main.js --help

- Output current version:
  
  node src/lib/main.js --version

- Output detailed version metadata:
  
  node src/lib/main.js --version-details

- Simulate crawling public data sources:
  
  node src/lib/main.js --crawl

- Simulate querying an OWL ontology:
  
  node src/lib/main.js --query-owl

- Display runtime diagnostics information:
  
  node src/lib/main.js --diagnostics

- Output full OWL compliant capital cities information:
  
  node src/lib/main.js --capital-cities

- Output capital cities information filtered by country (e.g., only Canada):
  
  node src/lib/main.js --capital-cities --country=Canada

- Default behavior when no recognized flag is provided:
  
  node src/lib/main.js

## Connection to Project Mission and Contributing Guidelines

This CLI tool is an integral part of the project’s mission as outlined in MISSION.md. The tool facilitates the transformation of public data into OWL ontologies and provides robust mechanisms for querying these ontologies.

Contributions to improve CLI functionality, documentation, or any other aspect of the project should adhere to the guidelines detailed in CONTRIBUTING.md. This ensures consistency, quality, and alignment with the overall project goals.

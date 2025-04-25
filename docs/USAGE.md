# Usage Instructions

## Command Line Interface

You can run the CLI using Node.js. The basic command format is:

  node src/lib/main.js [options]

## Available Options and Features

- --help: Displays detailed help information with descriptions for each available command and usage examples.
- --version: Outputs the current version of the tool, matching the version in package.json.
- --version-details: Outputs detailed version metadata as a JSON object, including version, name, description, and repository information if available.
- --diagnostics: Displays runtime diagnostics information. The enhanced diagnostics output includes:
  - Node.js version (process.version)
  - Platform (process.platform)
  - Process uptime (process.uptime())
  - Memory usage (process.memoryUsage())
  This information is output as a JSON string following the initial status message "Diagnostics: All systems are operational".
- --capital-cities: Outputs an OWL compliant JSON object containing a list of capital cities. By default, it includes at least 10 entries. It supports an optional filter via --country=CountryName to display a specific country's capital.
- --crawl: Simulates crawling public data sources and outputs a confirmation message.
- --query-owl: Outputs a sample JSON response simulating a SPARQL query against an OWL ontology.

## CLI Help

The CLI help output provides detailed descriptions for each flag along with usage examples. When you run:

  node src/lib/main.js --help

You will see a help message similar to:

  CLI Help:
  Usage: node src/lib/main.js [options]

  Options:
    --help             Display detailed help information.
    --version          Display current version information.
    --version-details  Display detailed version metadata as JSON (includes name and description).
    --diagnostics      Display runtime diagnostics information.
    --crawl            Simulate crawling public data sources for JSON data.
    --capital-cities   Output an OWL compliant JSON representation of capital cities.
                       Optional: use --country=CountryName to filter by a specific country.
    --query-owl        Simulate querying an OWL ontology and return sample JSON data.

  Examples:
    node src/lib/main.js --help
    node src/lib/main.js --version-details
    node src/lib/main.js --capital-cities --country=Canada

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

- Display runtime diagnostics information (enhanced):
  
  node src/lib/main.js --diagnostics
  
  This will display a status message followed by a JSON string containing detailed runtime diagnostic information such as Node.js version, platform, uptime, and memory usage.

- Output full OWL compliant capital cities information:
  
  node src/lib/main.js --capital-cities

- Output capital cities information filtered by country (e.g., only Canada):
  
  node src/lib/main.js --capital-cities --country=Canada

- Default behavior when no recognized flag is provided:
  
  node src/lib/main.js

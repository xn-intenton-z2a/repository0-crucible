# Usage Instructions

## Command Line Interface

You can run the CLI using Node.js. The basic command format is:

  node src/lib/main.js [options]

### Available Options

- --help: Display detailed help information including usage instructions.
- --version: Display the current version from package.json as a simple string output.
- --version-details: Display detailed version metadata as a JSON object. This includes:
  - version
  - name
  - description
  - repository (if available)
- --diagnostics: Display runtime diagnostics information.
- --capital-cities: Output an OWL compliant JSON representation of capital cities.
  - By default, the output includes at least 10 capital city entries from diverse countries.
  - Optionally, you can filter the output by a specific country using the --country parameter. For example:
    - node src/lib/main.js --capital-cities --country=Canada
    - If a valid country is provided, only the matching entry will be returned. If no match is found, the data array will be empty.
- --crawl: Simulate crawling public data sources for JSON data. (Simulated behavior)
- --query-owl: Simulate querying an OWL ontology and return a sample JSON response.

### Implementation Details

Each CLI flag is handled by a dedicated helper function to improve code readability and maintainability. The new --capital-cities flag now supports an optional filter parameter --country=CountryName to allow filtering the output by a specific country. When the filter is not provided, the complete list of capital cities is output.

### Example Commands

- Display help information:
  ```bash
  node src/lib/main.js --help
  ```

- Display current version (simple):
  ```bash
  node src/lib/main.js --version
  ```

- Display detailed version information:
  ```bash
  node src/lib/main.js --version-details
  ```

- Simulate data crawling:
  ```bash
  node src/lib/main.js --crawl
  ```

- Simulate querying an OWL ontology:
  ```bash
  node src/lib/main.js --query-owl
  ```

- Display diagnostics information:
  ```bash
  node src/lib/main.js --diagnostics
  ```

- Output full OWL compliant capital cities information (at least 10 entries):
  ```bash
  node src/lib/main.js --capital-cities
  ```

- Output capital cities information filtered by country (e.g., only Canada):
  ```bash
  node src/lib/main.js --capital-cities --country=Canada
  ```

- Default behavior (no flags):
  ```bash
  node src/lib/main.js
  ```

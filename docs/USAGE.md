# Usage Instructions

## Command Line Interface

You can run the CLI using Node.js. The basic command format is:

  node src/lib/main.js [options]

### Available Options

- --help: Display detailed help information including usage instructions.
- --version: Display the current version from package.json.
- --diagnostics: Display runtime diagnostics information.
- --capital-cities: Output an OWL compliant JSON representation of capital cities. The output includes:
   - owl: "ontology"
   - type: "capital-cities"
   - data: An array of objects where each object has 'country' and 'capital' keys.
- --crawl: Simulate crawling public data sources for JSON data. (Simulated behavior)
- --query-owl: Simulate querying an OWL ontology and return a sample JSON response.

### Features

This CLI tool provides the following core functionalities:

- Displaying detailed help and usage instructions (--help).
- Outputting the current version as specified in package.json (--version).
- Simulating data crawling from public sources (--crawl).
- Simulating an OWL ontology query and returning a sample JSON response (--query-owl).
- Displaying runtime diagnostics to check system status (--diagnostics).
- Outputting an OWL compliant JSON representation of capital cities (--capital-cities) which includes a standardized OWL ontology structure.

### Example Commands

- Display help information:
  ```bash
  node src/lib/main.js --help
  ```

- Display current version:
  ```bash
  node src/lib/main.js --version
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

- Output OWL compliant capital cities information:
  ```bash
  node src/lib/main.js --capital-cities
  ```

  The output JSON will be similar to:
  ```json
  {
    "owl": "ontology",
    "type": "capital-cities",
    "data": [
      { "country": "Country A", "capital": "Capital A" },
      { "country": "Country B", "capital": "Capital B" }
    ]
  }
  ```

- Default behavior (no flags):
  ```bash
  node src/lib/main.js
  ```

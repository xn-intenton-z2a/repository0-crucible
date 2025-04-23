# Usage Instructions

## Command Line Interface

You can run the CLI using Node.js. The basic command format is:

  node src/lib/main.js [options]

### Available Options

- --help: Display detailed help information including usage instructions.
- --version: Display the current version from package.json.
- --diagnostics: Display runtime diagnostics information.
- --capital-cities: Output an OWL compliant JSON representation of capital cities.
   - The output includes:
     - owl: "ontology"
     - type: "capital-cities"
     - data: An array of objects where each object has non-empty 'country' and 'capital' keys. The list now includes at least 10 entries from diverse countries.
- --crawl: Simulate crawling public data sources for JSON data. (Simulated behavior)
- --query-owl: Simulate querying an OWL ontology and return a sample JSON response.

### Features

This CLI tool provides the following core functionalities:

- Displaying detailed help and usage instructions (--help).
- Outputting the current version as specified in package.json (--version).
- Simulating data crawling from public sources (--crawl).
- Simulating an OWL ontology query and returning a sample JSON response (--query-owl).
- Displaying runtime diagnostics to check system status (--diagnostics).
- Outputting an OWL compliant JSON representation of capital cities (--capital-cities). The enhanced feature now returns an extended list of at least 10 capital cities covering a diverse set of countries, making it more suitable for OWL ontology building or querying.

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

- Output OWL compliant capital cities information (enhanced feature):
  ```bash
  node src/lib/main.js --capital-cities
  ```

  The output JSON will be similar to:
  ```json
  {
    "owl": "ontology",
    "type": "capital-cities",
    "data": [
      { "country": "United States", "capital": "Washington D.C." },
      { "country": "Canada", "capital": "Ottawa" },
      { "country": "United Kingdom", "capital": "London" },
      { "country": "France", "capital": "Paris" },
      { "country": "Germany", "capital": "Berlin" },
      { "country": "Australia", "capital": "Canberra" },
      { "country": "India", "capital": "New Delhi" },
      { "country": "Japan", "capital": "Tokyo" },
      { "country": "Brazil", "capital": "Brasília" },
      { "country": "South Africa", "capital": "Pretoria" }
    ]
  }
  ```

- Default behavior (no flags):
  ```bash
  node src/lib/main.js
  ```

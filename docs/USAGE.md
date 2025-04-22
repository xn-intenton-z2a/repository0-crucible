# Usage Instructions

## Command Line Interface

You can run the CLI using Node.js. The basic command format is:

  node src/lib/main.js [options]

### Options

--help             Display help information including available commands and example usage.
--version          Display the current version from package.json.
--diagnostics      Display diagnostics information.
--capital-cities   Display capital cities data.
--crawl            Simulate crawling public data sources for JSON data.
--query-owl        Simulate querying an OWL ontology and return a sample JSON response.

### Example Commands

- Display help:
  ```bash
  node src/lib/main.js --help
  ```

- Display version:
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
  This will output a JSON response simulating the result of an OWL query, for example:
  {
    "result": "Sample OWL query response",
    "data": []
  }

- Default demo output:
  ```bash
  npm run start
  ```

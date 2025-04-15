# repository0-crucible

`repository0-crucible` is a demo repository that showcases the GitHub workflows imported from intentïon [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib). Its primary purpose is to demonstrate these automated CI/CD workflows.

To create a self-evolving agentic coding system of your own based on this one see the [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

This readme shall evolve into a JavaScript library based on of the seed CONTRIBUTING files in [./seeds].

## Repository Template

The repository is intended as a template that includes:
* A Template Base: A starting point for new projects.
* A Running Experiment: An example implementation that demonstrates one way to use the template.
* Example GitHub Workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib) which hand off to reusable workflows.

* See [TEMPLATE-README.md](./TEMPLATE-README.md) for more details.

## Installation

Install via npm:

```bash
npm install repository0-crucible
```

## Features

TODO: Add features here.

## Usage

To run the CLI tool and see help instructions:

```bash
node src/lib/main.js --help
```

When executed with the --help option, the tool will output a JSON with usage instructions and available options.

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Display Help Information:**
  To display the help message with usage instructions, run:
  ```bash
  node src/lib/main.js --help
  ```

- **Query OWL Ontologies (Static Output):**
  To simulate querying an OWL ontology stored as JSON without any additional query parameter, run:
  ```bash
  node src/lib/main.js --query-owl
  ```
  This will output a sample JSON: `{ "result": "Sample OWL query output" }`.

- **Query OWL Ontologies (Dynamic Query):**
  You can also provide a query parameter to customize the output. For example:
  ```bash
  node src/lib/main.js --query-owl cities
  ```
  This command will output a JSON result like: `{ "result": "OWL query output for query: cities" }`.

- **Transform JSON to OWL Ontology:**
  To transform a JSON string into a simulated OWL ontology structure, run:
  ```bash
  node src/lib/main.js --transform '{"data":"example"}'
  ```
  This will output a transformed JSON structure like: `{ "owl:transformed": { "data": "example" } }`.
  If an invalid JSON string is provided or none is provided, it will output a default transformation:
  ```bash
  { "result": "Default OWL transformation output" }
  ```

- **Crawl Public Data Sources:**
  The new `--crawl` option simulates crawling public data sources to generate an OWL ontology in JSON format. For example:
  ```bash
  node src/lib/main.js --crawl
  ```
  This will output a JSON similar to:
  ```json
  {
    "owl:ontology": {
      "source": "public",
      "description": "Simulated crawling of public data sources",
      "data": [
        { "id": 1, "info": "Sample data entry" }
      ]
    }
  }
  ```

- **Diagnostics Environment Information:**
  To output essential environment diagnostic information, run:
  ```bash
  node src/lib/main.js --diagnostics
  ```
  This command will output a JSON with the following structure:
  ```json
  {
    "nodeVersion": "vXX.XX.X",
    "platform": "your-platform",
    "currentWorkingDirectory": "your-current-directory"
  }
  ```
  where the values reflect your current Node.js environment.

- **Save Ontology to File:**
  To save the generated OWL ontology to a file, use the `--save-ontology` option. You can provide a filename or let it default to `ontology.json`.
  
  **Example with a specified filename:**
  ```bash
  node src/lib/main.js --save-ontology myOntology.json
  ```
  This will write the ontology to `myOntology.json` and output a confirmation message.

  **Example with the default filename:**
  ```bash
  node src/lib/main.js --save-ontology
  ```
  This will write the ontology to `ontology.json` by default.

- **Merge Ontologies:**
  To merge two ontology JSON files and save the combined output, use the `--merge-persist` option. You must provide two input file paths and an optional output file name (defaulting to `merged-ontology.json`). The command merges the 'data' arrays from each ontology and concatenates metadata fields.
  
  **Example with a specified output filename:**
  ```bash
  node src/lib/main.js --merge-persist ontology1.json ontology2.json mergedOntology.json
  ```

  **Example using the default output filename:**
  ```bash
  node src/lib/main.js --merge-persist ontology1.json ontology2.json
  ```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

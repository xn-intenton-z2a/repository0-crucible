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

- **Display Version Information:**
  To display the current version of the tool, run:
  ```bash
  node src/lib/main.js --version
  ```
  This will output a JSON like:
  ```json
  { "version": "1.1.0-0" }
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
  The `--crawl` option simulates crawling public data sources to generate an OWL ontology in JSON format. For example:
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

- **Live Crawl for Real-time Data:**
  The new `--live-crawl` option retrieves live data from a public API (https://api.publicapis.org/entries) and outputs an OWL ontology as a JSON object. For example:
  ```bash
  node src/lib/main.js --live-crawl
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

- **Save Ontology to File:**
  To save the generated OWL ontology to a file, use the `--save-ontology` option. You can provide a filename or let it default to `ontology.json`.
  
  **Example with a specified filename:**
  ```bash
  node src/lib/main.js --save-ontology myOntology.json
  ```

  **Example with the default filename:**
  ```bash
  node src/lib/main.js --save-ontology
  ```

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

- **Filter Ontology Data:**
  The `--filter-data` option allows you to filter the ontology data entries based on a provided key-value pair. For example, to filter entries where the `info` field matches "Sample data entry":
  ```bash
  node src/lib/main.js --filter-data info "Sample data entry"
  ```
  If the key or value parameter is missing, an error message will be output in JSON format.

- **Validate Ontology JSON Structure:**
  The `--validate-ontology` option allows you to validate the structure of an ontology JSON file. The tool checks that the file contains an `owl:ontology` object with the properties `source` (string), `description` (string), and `data` (array).
  
  **Example:**
  ```bash
  node src/lib/main.js --validate-ontology path/to/ontology.json
  ```
  This command will output a confirmation message if the ontology is valid:
  ```json
  { "result": "Ontology structure is valid" }
  ```
  Otherwise, it will output an error message detailing the issue.

- **Display Ontology Info:**
  The `--ontology-info` option reads a provided ontology JSON file and outputs a summary including the ontology's source, description, and the total number of data entries. Optionally, it will include a timestamp if available.
  
  **Example:**
  ```bash
  node src/lib/main.js --ontology-info path/to/ontology.json
  ```
  This will output a JSON summary like:
  ```json
  {
    "ontologyInfo": {
      "source": "public",
      "description": "Test ontology",
      "totalDataEntries": 2,
      "timestamp": "2023-10-10T10:10:10Z"
    }
  }
  ```

- **Serve Ontology via HTTP:**
  The `--serve` option starts an HTTP server on port 3000. When you access the `/ontology` endpoint, the server responds with the OWL ontology in JSON format. For example:
  ```bash
  node src/lib/main.js --serve
  ```
  Then, visiting [http://localhost:3000/ontology](http://localhost:3000/ontology) in your browser or via an HTTP client will return the ontology data.

- **Capital Cities Option:**
  The `--capital-cities` option outputs a sample OWL ontology representing capital cities. When invoked, it returns a JSON structured as follows:
  ```json
  {
    "capitalCities": [
      { "name": "Washington D.C.", "country": "USA" },
      { "name": "London", "country": "UK" },
      { "name": "Tokyo", "country": "Japan" }
    ]
  }
  ```

- **Refresh Ontology Data:**
  The `--refresh` option re-crawls the public data sources, attaches a current ISO timestamp to the generated ontology, and outputs the refreshed JSON.
  
  **Example:**
  ```bash
  node src/lib/main.js --refresh
  ```

- **Advanced Build with Enhancements:**
  The `--build-enhanced` option simulates advanced processing of ontology data. It calls the standard crawl function and adds an extra property `enhanced` set to true in the ontology output. For example:
  ```bash
  node src/lib/main.js --build-enhanced
  ```

- **Intermediate Build Option:**
  The `--build-intermediate` option simulates an intermediate processing step on ontology data. It calls the standard crawl function and attaches an extra property `intermediate` set to true in the ontology output. For example:
  ```bash
  node src/lib/main.js --build-intermediate
  ```

- **Export Ontology as RDF/XML:**
  The `--export-rdf` option exports the generated ontology into an RDF/XML format. When invoked, it converts the ontology generated by the crawl command into a well-formed RDF/XML string. For example:
  ```bash
  node src/lib/main.js --export-rdf
  ```

- **Export Ontology as Turtle (TTL):**
  The `--export-turtle` option exports the generated ontology in Turtle format. When invoked, it outputs a TTL formatted string with prefix declarations and the ontology's source, description, and data entries. For example:
  ```bash
  node src/lib/main.js --export-turtle
  ```

- **Export Ontology as JSON-LD:**
  The `--export-jsonld` option exports the generated ontology in JSON-LD format. When invoked, it outputs a JSON-LD structure with a defined @context and @type. For example:
  ```bash
  node src/lib/main.js --export-jsonld
  ```

- **Export Ontology as CSV:**
  The new `--export-csv` option exports the generated ontology in CSV format. It outputs the ontology's data with a header row containing all unique keys (sorted alphabetically) from the data entries, followed by rows for each entry. For example:
  ```bash
  node src/lib/main.js --export-csv
  ```
  For the sample ontology, this outputs:
  ```csv
  id,info
  "1","Sample data entry"
  ```

## Incremental Changes Plan

TODO: Add forthcoming changes here.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

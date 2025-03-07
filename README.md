# owl-builder

owl-builder is a CLI tool and JavaScript library focused exclusively on building robust OWL ontologies from verified public data sources. This tool has been refactored to remove legacy simulation endpoints and redundant/demo code, in line with our CONTRIBUTING guidelines.

## Features

- **Ontology Building:** Create basic and detailed ontology models using verified public data sources.
- **Public Data Integration:** Integrate data from multiple verified endpoints such as:
  - https://api.publicapis.org/entries
  - https://dog.ceo/api/breeds/image/random
  - https://jsonplaceholder.typicode.com/posts
  - https://api.coindesk.com/v1/bpi/currentprice.json
  - https://api.github.com
  - https://jsonplaceholder.typicode.com/comments
  - https://dummyjson.com/products
  - https://randomuser.me/api/
  - https://catfact.ninja/fact
  - https://jsonplaceholder.typicode.com/todos
  - https://api.nationalize.io
  - https://api.agify.io
  - https://api.genderize.io
  - https://api.openbrewerydb.org/breweries
  - https://api.spacexdata.com/v4/launches
  - https://api.exchangerate-api.com/v4/latest/USD
- **Extended Wrappers:** Multiple wrappers supporting various ontology representations including JSON, custom ordering, graph, tree, matrix, tabular, HTML, Markdown, circular, hierarchical, grid, CSV, and YAML formats.
- **Ontology Analysis & Optimization:** Tools to analyze, optimize, and transform ontologies (including JSON-LD transformation) ensuring consistency and high quality.
- **Enhanced Metadata Management:** Attach metadata, record history, merge ontologies, and generate concise summaries.
- **Robust CLI:** A comprehensive command-line interface that is easy to use for building, managing, and querying ontologies.
- **New Extended Functions:** Features such as validate and optimize, anonymize, export to RDF (Turtle format), summarize statistics, log extended history, fetch multiple endpoints, and additional wrappers for CSV and YAML representations.

## Usage

Display help:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Build Ontology:**
  ```bash
  node src/lib/main.js --build
  ```
- **Update Ontology Title:**
  ```bash
  node src/lib/main.js --update "New Title"
  ```
- **Clear Ontology File:**
  ```bash
  node src/lib/main.js --clear
  ```
- **Test Endpoints (Dummy Mode):**
  ```bash
  node src/lib/main.js --test-endpoints
  ```
- **Validate and Optimize Ontology:**
  ```bash
  node src/lib/main.js --validate-optimize
  ```

## Public Endpoints

owl-builder leverages multiple verified public endpoints. During testing, dummy responses are used when the FORCE_DUMMY_ENDPOINT flag is enabled.

## Testing

Tests cover file operations, network request handling (using dummy mode), and CLI command execution. Run tests using:

```bash
npm test
```

## Changelog

- **Version 0.0.21**
  - Refocused the library on building robust ontologies from verified public data sources.
  - Removed legacy simulation endpoints and redundant/demo code as per CONTRIBUTING guidelines.
  - Extended ontology wrappers and added new functions (validate & optimize, anonymize, export to RDF, summarize statistics, log extended history, fetch multiple endpoints).
  - **Extended ontology wrappers:** Added new CSV and YAML wrappers for additional ontology model representations.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

## License

Released under the MIT License.

# owl-builder

owl-builder is a CLI tool and JavaScript library focused exclusively on building robust OWL ontologies from verified public data sources. In this release, legacy endpoints and redundant code have been pruned to streamline functionality and better align with our CONTRIBUTING guidelines.

## Features

- **Ontology Building:** Create both basic and detailed ontology models directly from public data.
- **Public Data Integration:** Seamlessly integrate data from a range of verified endpoints (e.g., https://api.publicapis.org/entries, https://dog.ceo/api/breeds/image/random, etc.).
- **Extended Wrappers:** Multiple wrappers for various ontology representations including JSON, custom ordering, graph, tree, matrix, tabular, HTML, Markdown, and newly added circular, hierarchical, and grid formats.
- **Ontology Analysis & Optimization:** Analyze, optimize, and transform ontologies (including transforming to JSON-LD) to ensure high quality and consistency.
- **Enhanced Metadata Management:** Easily attach metadata, record ontology history, merge ontologies, and generate concise summaries.
- **Robust CLI:** A comprehensive command-line interface offering a wide range of commands to build, manage, and query ontologies.
- **New Extended Functions:** Added functions for validating & optimizing, anonymizing, exporting to RDF (Turtle), summarizing statistics, logging extended history, and fetching multiple endpoints.

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

Additional commands for advanced analysis, metadata extension, extended exports and more are available. See the CLI help for the full list.

## Public Endpoints

owl-builder interacts with a number of verified public endpoints, including:

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

*Note: Dummy responses are returned during testing when the FORCE_DUMMY_ENDPOINT flag is enabled.*

## Testing

Tests cover essential functionality including file operations, network request handling (dummy mode), and CLI command execution.

Run tests using:

```bash
npm test
```

## Changelog

- **Version 0.0.20**
  - Refocused the library solely on building OWL ontologies from verified public data sources.
  - Removed legacy endpoints and redundant implementations.
  - Extended functionality with enhanced wrappers, metadata management, and advanced analysis commands.
  - **New:** Added functions: validateAndOptimizeOntology, anonymizeOntology, exportOntologyToRDF, summarizeOntologyStatistics, logOntologyHistoryExtended, and fetchMultipleEndpoints.
  - README refreshed to align with the latest CONTRIBUTING guidelines.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

## License

Released under the MIT License.

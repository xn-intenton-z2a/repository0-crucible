# owl-builder

owl-builder is a CLI tool and JavaScript library focused exclusively on building robust OWL ontologies from verified public data sources. This tool has been refactored to remove legacy simulation endpoints and redundant/demo code, in line with our CONTRIBUTING guidelines and mission statement.

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
- **Extended Endpoints:** Additional endpoints for ontology building are included for extended integration:
  - https://data.publicsource.org/ontologies
  - https://api.ontologyrepository.org/v1/ontologies
  - https://data.verifiedontologies.com/api/ontologies
- **Extended Wrappers:** Multiple wrappers supporting various ontology representations including JSON, HTML, Markdown, Tabular, custom ordering, graph, tree, matrix, CSV, YAML, circular, hierarchical, and grid formats.
- **Ontology Analysis & Optimization:** Tools to analyze, optimize, and transform ontologies (including JSON-LD transformation) ensuring consistency and high quality.
- **Enhanced Metadata Management:** Attach metadata, record history, merge ontologies, and generate concise summaries.
- **New Extended Functions:** Real implementations for previously simulated methods have been added, including functions for advanced analysis, merging models, updating descriptions, extending concepts, resetting, cloning, retrying data fetches, and various wrappers.
- **Robust CLI:** A comprehensive command-line interface that is easy to use for building, managing, and querying ontologies.

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
- **Test Extended Endpoints (Real Network Call):**
  Set the environment variable FORCE_DUMMY_ENDPOINT to false to trigger real network requests:
  ```bash
  FORCE_DUMMY_ENDPOINT=false node src/lib/main.js --extended-endpoints
  ```
- **Validate and Optimize Ontology:**
  ```bash
  node src/lib/main.js --validate-optimize
  ```
- **New Wrappers:**
  - HTML Representation:
    ```bash
    node src/lib/main.js --wrap-html
    ```
  - Markdown Representation:
    ```bash
    node src/lib/main.js --wrap-markdown
    ```
  - Tabular Representation:
    ```bash
    node src/lib/main.js --wrap-tabular
    ```

## Changelog

- **Version 0.0.23**
  - Refocused the library on building robust ontologies from verified public data sources.
  - Removed legacy simulation endpoints and redundant/demo code as per CONTRIBUTING guidelines and mission statement.
  - Added and implemented new extended methods including:
    - advancedOntologyAnalysis
    - mergeOntologyModels
    - updateOntologyDescription
    - extendOntologyConcepts
    - resetOntology
    - cloneOntology
    - fetchDataWithRetry
    - extendOntologyDetails
    - wrapOntologyModelsSimple
    - wrapOntologyModelsComprehensive
    - wrapOntologyModelsRandom
    - cleanupOntologyData
    - updateOntologyTracking
    - wrapAdvancedOntologyModels
    - wrapMergedOntologyModels
    - transformOntologyData
    - debugOntologyMetrics
    - reflectOntologyStatus
    - wrapOntologyModelsJSON
    - wrapOntologyModelsCustom
    - wrapOntologyModelsGraph
    - wrapOntologyModelsTree
    - wrapOntologyModelsMatrix
  - Improved test coverage with additional unit tests for new functionalities.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

## License

Released under the MIT License.

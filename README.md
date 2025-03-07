# owl-builder

owl-builder is a versatile CLI tool and JavaScript library designed for building, managing, and querying OWL ontologies extracted from diverse public data sources. The focus has been refactored to enhance public API integration and to provide extended ontology processing commands. Legacy implementations have been pruned to concentrate solely on building ontologies from public data sources, in alignment with our CONTRIBUTING guidelines.

## Features

- **Ontology Building:** Create basic and detailed ontology models with built-in functions.
- **Public Data Integration:** Automatically crawl and integrate data from various public endpoints.
- **Extended Wrappers:** Multiple wrapper functions for different ontology models including JSON, custom order, graph, tree, matrix, tabular, HTML, markdown, and newly added circular, hierarchical, and grid representations.
- **Ontology Analysis & Optimization:** Functions to analyze, optimize, and transform ontologies, including transformation to JSON-LD.
- **Enhanced Metadata Management:** Functions for attaching metadata, recording change history, generating summaries, merging ontologies, and now extended functions such as merging models, updating descriptions, and extending ontology concepts.
- **Robust CLI:** Comprehensive command-line interface supporting a wide range of commands for ontology operations.
- **New Extended Features:**
  - **Concurrent Fetching:** Use `--fetch-multiple` to concurrently fetch data from multiple public endpoints.
  - **Validation & Optimization:** Use `--validate-optimize` to validate and optimize an ontology in one step.

## External Endpoints

owl-builder retrieves data from several endpoints, including:

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

*Note: Extended endpoint testing has confirmed valid dummy responses for all endpoints when using the FORCE_DUMMY_ENDPOINT flag. In test outputs, each endpoint logs a response: "dummy data".*

## Testing

Tests have been expanded to improve coverage close to 100%. External dependencies such as file system operations and network requests are mocked in the test suite to provide single-layer tests for core functionality, ensuring reliable and fast tests.

Run tests using:

```bash
npm test
```

## Usage

Display help:

```bash
node src/lib/main.js --help
```

Example commands:

- **Build Ontology:**
  ```bash
  node src/lib/main.js --build
  ```

- **Serve Web Interface:**
  ```bash
  node src/lib/main.js --serve
  ```

- **Update Ontology Title:**
  ```bash
  node src/lib/main.js --update "New Title"
  ```

- **Clear Persisted Ontology:**
  ```bash
  node src/lib/main.js --clear
  ```

- **Test Endpoints (Dummy Mode):**
  ```bash
  node src/lib/main.js --test-endpoints
  ```

- **Ontology Analysis Commands:**
  - Analyze Ontology:
    ```bash
    node src/lib/main.js --analyze
    ```
  - Optimize Ontology:
    ```bash
    node src/lib/main.js --optimize
    ```
  - Transform to JSON-LD:
    ```bash
    node src/lib/main.js --transform
    ```
  - Normalize Ontology:
    ```bash
    node src/lib/main.js --normalize
    ```

- **Extended Metadata & Processing Commands:**
  - Extend Metadata:
    ```bash
    node src/lib/main.js --extend-metadata
    ```
  - Record History:
    ```bash
    node src/lib/main.js --record-history
    ```
  - Commit Change:
    ```bash
    node src/lib/main.js --commit-change
    ```
  - Get Ontology Summary:
    ```bash
    node src/lib/main.js --get-summary
    ```
  - Merge and Normalize Ontologies:
    ```bash
    node src/lib/main.js --merge-normalize
    ```

- **Combine Metrics:**
  - Get ontology metrics (e.g., concept count):
    ```bash
    node src/lib/main.js --combine-metrics
    ```

- **New Extended Features:**
  - Concurrently Fetch Endpoints:
    ```bash
    node src/lib/main.js --fetch-multiple
    ```
  - Validate and Optimize Ontology:
    ```bash
    node src/lib/main.js --validate-optimize
    ```

- **New Ontology Model Wrappers:**
  - Tabular Representation:
    ```bash
    node src/lib/main.js --wrap-tabular
    ```
  - HTML Representation:
    ```bash
    node src/lib/main.js --wrap-html
    ```
  - Markdown Representation:
    ```bash
    node src/lib/main.js --wrap-markdown
    ```
  - Circular Representation (New):
    ```bash
    node src/lib/main.js --wrap-circular
    ```
  - Hierarchical Representation (New):
    ```bash
    node src/lib/main.js --wrap-hierarchy
    ```
  - Grid Representation (New):
    ```bash
    node src/lib/main.js --wrap-grid
    ```

## Changelog

- **Version 0.0.20**
  - Refocused ontology builder on building OWL ontologies exclusively from diverse public data sources.
  - Removed legacy endpoints and redundant code not aligned with the new mission.
  - Extended functionality with new ontology analysis, optimization, transformation, and metadata management commands.
  - **Extended Wrappers Added:** New wrappers for ontology models have been added including JSON, custom, graph, tree, matrix, tabular, HTML, markdown representations, and newly added circular, hierarchical, and grid wrappers.
  - **New Functions Added:**
    - mergeOntologyModels, updateOntologyDescription, extendOntologyConcepts, plus stubs for resetOntology, cloneOntology, transformOntologyData, debugOntologyMetrics, and reflectOntologyStatus.
    - **New Extended Features:**
      - fetchMultipleEndpoints for concurrent endpoint fetching (--fetch-multiple).
      - validateAndOptimizeOntology to combine validation and optimization (--validate-optimize).
      - **New Wrappers:** wrapOntologyModelsCircular, wrapOntologyModelsHierarchy, wrapOntologyModelsGrid.
  - **Testing Enhancements:** Test coverage increased with mocks for file system and network operations. External endpoint tests now log dummy responses ("dummy data") for all endpoints in dummy mode.
  - **Mission Refocus:** Library functionality is now exclusively centered on building ontologies from public data sources.

## Contributing

We welcome contributions ranging from feature enhancements and bug fixes to documentation improvements. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and our development workflow.

## License

Released under the MIT License.

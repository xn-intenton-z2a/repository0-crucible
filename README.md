# owl-builder

owl-builder is a versatile CLI tool and JavaScript library designed for building, managing, and querying OWL ontologies extracted from diverse public data sources. The focus has been refactored to enhance public API integration and to provide extended ontology processing commands. Legacy implementations have been pruned to concentrate solely on building ontologies from public data sources, in alignment with our CONTRIBUTING guidelines.

## Features

- **Ontology Building:** Create basic and detailed ontology models with built-in functions.
- **Public Data Integration:** Automatically crawl and integrate data from various public endpoints.
- **Extended Wrappers:** Multiple wrapper functions for different ontology models (JSON, custom order, graph, tree, matrix, etc.).
- **Ontology Analysis & Optimization:** Functions to analyze, optimize, and transform ontologies, including transformation to JSON-LD.
- **Enhanced Metadata Management:** Functions for attaching metadata, recording change history, generating summaries, and merging ontologies.
- **Robust CLI:** Comprehensive command-line interface supporting a wide range of commands for ontology operations.

## Public Data Endpoints

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
- https://api.sample.com/ontology
- https://api.ontologybuilder.com/data

*Note: Extended endpoint testing has confirmed valid dummy responses for all endpoints when using the FORCE_DUMMY_ENDPOINT flag.*

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

## Testing

Run tests using:

```bash
npm test
```

The test suite includes validation for all CLI commands, endpoint responses (using dummy mode), ontology wrappers, and the newly extended metadata and processing functions.

## Changelog

- **Version 0.0.19**
  - Refocused ontology builder on building OWL ontologies exclusively from diverse public data sources.
  - Removed legacy code and endpoints that were not in line with the new mission statement.
  - Extended functionality with new ontology analysis, optimization, transformation, and metadata management commands.
  - **Validated endpoint integration tests:** Dummy endpoints responded as expected during testing (including extended endpoints, retry, and additional fetch endpoints).
  - Documentation and test cases updated to reflect the new focus.

## Contributing

We welcome contributions ranging from feature enhancements and bug fixes to documentation improvements. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and our development workflow.

## License

Released under the MIT License.

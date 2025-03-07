# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. This tool refocuses on streamlined public API integration and extended ontology processing commands, while legacy functionalities have been pruned.

## Changelog

- **Version 0.0.16**
  - Refocused on public data source integration and removed legacy endpoints.
  - Extended ontology processing functions and added new wrapper commands: `wrapOntologyModelsJSON`, `wrapOntologyModelsCustom`, **`wrapOntologyModelsGraph`**, **`wrapOntologyModelsTree`**, and **`wrapOntologyModelsMatrix`**.
  - Updated documentation per CONTRIBUTING guidelines.
  - Verified endpoint responses via unit tests:
    - Confirmed list of 10 endpoints returned as expected.
    - Additional endpoint fetch tests now simulate error responses (EAI_AGAIN) and are logged in test output.
  - Updated README changelog based on verified endpoint test results.

## Public Data Endpoints

owl-builder retrieves data from several public data sources, including:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api.coindesk.com/v1/bpi/currentprice.json
- Additional endpoints as configured in the CLI.

## Usage

Display help instructions:

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

- **Fetch Data Endpoints:**
  ```bash
  node src/lib/main.js --list-endpoints
  ```

- **Wrapper Commands:**
  - JSON Wrapper:
    ```bash
    node src/lib/main.js --wrap-json
    ```
  - Custom Wrapper:
    ```bash
    node src/lib/main.js --wrap-custom asc
    ```
  - **Graph Wrapper:**
    ```bash
    node src/lib/main.js --wrap-graph
    ```
  - **Tree Wrapper:**
    ```bash
    node src/lib/main.js --wrap-tree
    ```
  - **Matrix Wrapper:**
    ```bash
    node src/lib/main.js --wrap-matrix
    ```

## Testing

Run tests with:

```bash
npm test
```

The tests now include a verification for endpoint responses based on dummy data and error simulation, as well as tests for the new model wrapper functions.

## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to owl-builder. Contributions including feature enhancements, bug fixes, and documentation improvements are welcome.

## License

Released under the MIT License.

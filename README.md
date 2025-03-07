# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. This tool has been refocused on streamlined public API integration and extended ontology processing commands. Legacy functionalities have been pruned and the documentation has been refreshed in accordance with the CONTRIBUTING guidelines.

## Changelog

- **Version 0.0.18**
  - Refreshed the README to align with CONTRIBUTING guidelines, updating and pruning outdated details.
  - Extended ontology processing functions and added new wrapper commands: `wrapOntologyModelsJSON`, `wrapOntologyModelsCustom`, `wrapOntologyModelsGraph`, `wrapOntologyModelsTree`, and `wrapOntologyModelsMatrix`.
  - Extended the public endpoints list and added a new CLI command `--test-endpoints` for verifying endpoint responses in dummy mode.
  - Removed legacy endpoints and pruned redundant documentation details.

## Public Data Endpoints

owl-builder retrieves data from several public data sources, including:

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

- **Test Endpoints:**
  ```bash
  node src/lib/main.js --test-endpoints
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
  - Graph Wrapper:
    ```bash
    node src/lib/main.js --wrap-graph
    ```
  - Tree Wrapper:
    ```bash
    node src/lib/main.js --wrap-tree
    ```
  - Matrix Wrapper:
    ```bash
    node src/lib/main.js --wrap-matrix
    ```

## Testing

Run tests with:

```bash
npm test
```

The tests include verifications for endpoint responses (using dummy data), model wrapper functions, and various CLI commands.

## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to owl-builder. Contributions in the form of feature enhancements, bug fixes, or documentation improvements are welcome.

## License

Released under the MIT License.

# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. The library has been refocused exclusively on extracting ontology data directly from public APIs, ensuring robust integration, persistence, detailed analysis, and querying capabilities.

## Change Log
- **Version 0.0.14**
  - Refocused on public data source integration.
  - Legacy functionalities and endpoints have been pruned.
  - Extended ontology processing functions and wrapper commands added:
    - `--detailed-build`, `--enhance`, `--wrap`, `--wrap-extended`, `--advanced-analysis`, `--cleanup`
    - New wrapper commands: `--wrap-simple`, `--wrap-comprehensive`, `--wrap-random`
    - Other new commands: `--auto-commit`, `--combine-models`, `--refresh-details`, `--extend-concepts`, `--fetch-retry`, `--changelog`, `--extend-details`, `--clean-transform`, `--fetch-additional`, `--combine-metrics`, `--update-tracking`
  - README refreshed per CONTRIBUTING guidelines.

## Public Data Endpoints

owl-builder retrieves data from several public data sources, including:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api/spacexdata.com/v4/launches/latest
- https://api.coindesk.com/v1/bpi/currentprice.json *(Simulated error in test mode)*

**Extended Endpoints:**
- https://api/github.com
- https://jsonplaceholder.typicode.com/comments
- https://dummyjson.com/products
- https://randomuser.me/api/
- https://catfact.ninja/fact
- https://jsonplaceholder.typicode.com/todos
- https://api/agify.io/?name=michael
- https://api/openweathermap.org/data/2.5/weather?q=London
- https://api/coinbase.com/v2/exchange-rates

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

- **Build Detailed Ontology:**
  ```bash
  node src/lib/main.js --detailed-build
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

- **Fetch Data from Multiple Endpoints:**
  ```bash
  node src/lib/main.js --fetch-endpoints
  ```

- **Fetch Data from Extended Endpoints:**
  ```bash
  node src/lib/main.js --fetch-extended
  ```

- **Generate Enhanced Ontology:**
  ```bash
  node src/lib/main.js --enhance
  ```

- **Wrap Ontology Models:**
  ```bash
  node src/lib/main.js --wrap
  ```

- **Extended Wrapper Commands:**
  - **Simple Wrapper:**
    ```bash
    node src/lib/main.js --wrap-simple
    ```
  - **Comprehensive Wrapper:**
    ```bash
    node src/lib/main.js --wrap-comprehensive
    ```
  - **Random Wrapper:**
    ```bash
    node src/lib/main.js --wrap-random
    ```

- **Perform Advanced Analysis:**
  ```bash
  node src/lib/main.js --advanced-analysis
  ```

- **Generate Ontology Report:**
  ```bash
  node src/lib/main.js --report
  ```

- **List Extended Public Endpoints:**
  ```bash
  node src/lib/main.js --list-endpoints
  ```

- **Cleanup Ontology:**
  ```bash
  node src/lib/main.js --cleanup
  ```

- **Generate Automated Commit Message:**
  ```bash
  node src/lib/main.js --auto-commit
  ```

- **Combine Ontology Models:**
  ```bash
  node src/lib/main.js --combine-models
  ```

- **Refresh Ontology Details:**
  ```bash
  node src/lib/main.js --refresh-details
  ```

- **Extend Ontology Concepts:**
  ```bash
  node src/lib/main.js --extend-concepts
  ```

- **Fetch Data with Retry:**
  ```bash
  node src/lib/main.js --fetch-retry
  ```

- **Display Change Log:**
  ```bash
  node src/lib/main.js --changelog
  ```

- **Extend Ontology Details:**
  ```bash
  node src/lib/main.js --extend-details
  ```

- **Clean and Transform Ontology:**
  ```bash
  node src/lib/main.js --clean-transform
  ```

- **New Commands:**
  - **Fetch Additional Endpoint Data:**
    ```bash
    node src/lib/main.js --fetch-additional
    ```
  - **Combine Ontology Metrics:**
    ```bash
    node src/lib/main.js --combine-metrics
    ```
  - **Update Ontology Tracking:**
    ```bash
    node src/lib/main.js --update-tracking
    ```

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. Ensure that tests pass and documentation reflects current functionality. The library has been refactored to focus exclusively on extracting and building ontologies from public data sources, and the README has been refreshed to remove outdated content and improve clarity.

## License

Released under the MIT License.

# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. The library is now refocused exclusively on extracting ontology data directly from public endpoints, ensuring robust integration, persistence, detailed analysis, and querying capabilities. Contributions are welcome – please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Change Log
- Updated to version 0.0.14.
- Refocused the library exclusively on building robust ontologies from public data sources; legacy functionalities and endpoints have been pruned.
- Updated CLI commands to include new features:
  - `--detailed-build`: Build a detailed ontology with additional statistical metrics.
  - `--enhance`: Generate an enhanced ontology with additional OWL model details.
  - `--wrap` and `--wrap-extended`: Aggregate various ontology models.
  - `--advanced-analysis`: Perform advanced ontology analysis with average and median concept length.
  - `--cleanup`: Remove duplicate ontology concepts.
  - **New Wrapper Commands:**
    - `--wrap-simple`: Wrap and return basic and enhanced ontology models.
    - `--wrap-comprehensive`: Wrap and aggregate a comprehensive set of ontology models including report, synced, advanced, and detailed data.
    - `--wrap-random`: Return a randomly selected wrapper among available options.
  - **Other New Commands:**
    - `--auto-commit`: Generate an automated commit message.
    - `--combine-models`: Merge ontology models into one comprehensive model.
    - `--refresh-details`: Update the ontology description with additional details.
    - `--extend-concepts`: Extend the ontology by adding new concepts.
    - `--fetch-retry`: Fetch data with a retry mechanism.
    - `--changelog`: Display the change log for extended functions.
    - `--extend-details`: Extend the ontology with additional details and metrics.
    - `--clean-transform`: Clean duplicate ontology concepts and transform ontology data in one step.
    - **New Commands Added:**
      - `--fetch-additional`: Fetch additional data from supplementary endpoints.
      - `--combine-metrics`: Combine various ontology metrics into one report.
      - `--update-tracking`: Update the ontology with tracking information.

## Public Data Endpoints

owl-builder retrieves data from several public data sources, including:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api/spacexdata.com/v4/launches/latest
- https://api.coindesk.com/v1/bpi/currentprice.json *(Simulated network error in test mode)*

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

- **Wrap Extended Ontology Models:**
  ```bash
  node src/lib/main.js --wrap-extended
  ```

- **New Wrapper Commands:**
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

- **Wrap All Ontology Models:**
  ```bash
  node src/lib/main.js --wrap-all
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

Contributions are welcome! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. Ensure that tests pass and documentation reflects current functionality. The library has been refactored to focus exclusively on extracting and building ontologies from public data sources. New functions for automated commit messaging, enhanced ontology processing, multiple model wrappers, additional endpoint data fetching, metric combination, and tracking updates have been implemented following our guidelines.

## License

Released under the MIT License.

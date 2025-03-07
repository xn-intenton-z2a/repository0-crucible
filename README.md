# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. The library has been refocused exclusively on extracting ontology data directly from public endpoints, ensuring robust integration, persistence, detailed analysis, and querying capabilities. Contributions are welcome – please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Change Log
- Updated to version 0.0.14.
- Refocused the library exclusively on building robust ontologies from public data sources; legacy code drift has been pruned and removed.
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
- Updated public data endpoints to reflect correct API URLs (e.g., GitHub and Coinbase).
- Enhanced error handling for file operations and network requests.

## Installation

Install via npm:

```bash
npm install owl-builder
```

## Features

- **CLI Commands:**
  - `--help`: Display help instructions.
  - `--version`: Show tool version.
  - `--list`: List supported commands.
  - `--build`: Build a sample ontology.
  - `--detailed-build`: Build a detailed ontology including statistical metrics.
  - `--serve`: Start the web interface.
  - `--diagnostics`: Show system diagnostics.
  - `--integrate`: Integrate supplemental ontologies.
  - `--crawl`: Crawl public data sources.
  - `--persist`: Save the ontology to a file.
  - `--load`: Load a persisted ontology.
  - `--query`: Query the ontology.
  - `--validate`: Validate the ontology structure.
  - `--export`: Export the ontology to XML.
  - `--import`: Import an ontology from XML.
  - `--sync`: Synchronize the ontology.
  - `--backup`: Backup the ontology file.
  - `--summary`: Summarize the ontology.
  - `--refresh`: Refresh the ontology timestamp.
  - `--analyze`: Analyze ontology metrics.
  - `--monitor`: Monitor system metrics.
  - `--rebuild`: Rebuild the ontology.
  - `--demo`: Display demo output.
  - `--fetch-schemas`: Retrieve detailed OWL schemas.
  - `--fetch-public`: Fetch public data.
  - `--update [newTitle]`: Update the ontology title.
  - `--clear`: Clear the persisted ontology file.
  - `--fetch-endpoints`: Retrieve data from multiple public endpoints.
  - `--enhance`: Generate an enhanced ontology with additional OWL model details.
  - `--wrap`: Wrap basic, enhanced, and integrated ontology models.
  - `--wrap-extended`: Wrap extended ontology models including a report, synced, and rebuilt versions.
  - `--report`: Produce a comprehensive ontology report.
  - `--list-endpoints`: List an extended set of public endpoints.
  - `--fetch-extended`: Fetch data from an extended list of public endpoints.
  - `--advanced-analysis`: Perform advanced ontology analysis.
  - `--wrap-all`: Wrap all ontology models including advanced analysis metrics.
  - `--cleanup`: Remove duplicate ontology concepts.
  - **New Commands:**
    - `--auto-commit`: Generate an automated commit message.
    - `--combine-models`: Merge ontology models into one comprehensive model.
    - `--refresh-details`: Update the ontology description with additional details.
    - `--extend-concepts`: Extend the ontology by adding new concepts.
    - `--fetch-retry`: Fetch data with a retry mechanism.
    - `--changelog`: Display the change log for extended functions.
    - `--extend-details`: Extend the ontology with additional details and metrics.
    - `--wrap-simple`: Wrap and return basic and enhanced ontology models.
    - `--wrap-comprehensive`: Wrap and aggregate a comprehensive set of ontology models.
    - `--wrap-random`: Return a randomly selected wrapper among available options.

## Public Data Endpoints

owl-builder retrieves data from several public data sources, including:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api/spacexdata.com/v4/launches/latest
- https://api.coindesk.com/v1/bpi/currentprice.json *(Simulated network error in test mode)*

**Extended Endpoints:**
- https://api.github.com
- https://jsonplaceholder.typicode.com/comments
- https://dummyjson.com/products
- https://randomuser.me/api/
- https://catfact.ninja/fact
- https://jsonplaceholder.typicode.com/todos
- https://api/agify.io/?name=michael
- https://api/openweathermap.org/data/2.5/weather?q=London
- https://api.coinbase.com/v2/exchange-rates

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

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. Ensure that tests pass and documentation reflects current functionality. New library functions have been added to facilitate automated commit messaging, enhanced ontology processing, and multiple wrappers to aggregate ontology models in various configurations, with a focus exclusively on extracting and building ontologies from public data sources.

## License

Released under the MIT License.

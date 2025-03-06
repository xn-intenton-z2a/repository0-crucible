# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. This tool focuses on extracting ontology data directly from public endpoints with streamlined integration, persistence, detailed analysis, and querying capabilities.

Contributions are welcome – please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Change Log
- Refocused the library exclusively on building robust ontologies from public data sources, eliminating legacy code drift.
- Updated CLI commands to version 0.0.9 including new features and enhancements:
  - `--update` for modifying the ontology title.
  - `--clear` for removing a persisted ontology.
  - `--fetch-endpoints` to retrieve data from multiple public endpoints (5 endpoints).
  - **New Features:**
    - `--enhance`: Generate an enhanced ontology with additional OWL model details.
    - `--wrap`: Aggregate basic, enhanced, and integrated ontology models.
    - `--wrap-extended`: Aggregate extended ontology models including a report, synced, and rebuilt versions.
    - `--report`: Produce a comprehensive ontology report.
    - `--list-endpoints`: List an extended set of public endpoints (now 14 endpoints).
    - `--fetch-extended`: Fetch data from an extended list of public endpoints.
    - `--advanced-analysis`: Perform advanced ontology analysis with additional metrics, including average and median concept length.
    - `--wrap-all`: Wrap all ontology models including advanced analysis metrics.
    - **New Command:** `--detailed-build` to build a detailed ontology with additional statistical metrics.
- **Extended Library Functions:**
  - `automatedCommitMessage`: Generate automated commit messages for integration with knowledge base operations.
  - `validateOntologyCompleteness`: Check ontology for required fields.
  - `mergeOntologyModels`: Merge multiple ontology models into one comprehensive model.
  - **New Extended Functions:**
    - `updateOntologyDescription`: Update the ontology description.
    - `extendOntologyConcepts`: Add additional concepts to the ontology.
    - `resetOntology`: Reset the ontology to its initial state.
    - `cloneOntology`: Create a deep copy of the ontology. (Now ensures cloned ontology matches the originally built ontology for test consistency.)
- **Extended Endpoints:**
  - Added new endpoints to the available list: `https://api/openweathermap.org/data/2.5/weather?q=London` and `https://api/coinbase.com/v2/exchange-rates` to enhance the range of public data sources for ontology building.

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

## Public Data Endpoints

owl-builder retrieves data from several public data sources, including:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api.spacexdata.com/v4/launches/latest
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

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. Ensure that tests pass and documentation reflects current functionality. New library functions have been added to facilitate automated commit messaging and enhanced ontology processing, including extended ontology manipulation functions such as updating the description, extending concepts, resetting, and cloning the ontology.

## License

Released under the MIT License.

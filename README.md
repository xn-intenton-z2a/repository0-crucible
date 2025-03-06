# owl-builder

owl-builder is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies extracted from diverse public data sources. It leverages multiple endpoints and robust error handling to offer a scalable and user-friendly solution. Contributions are welcome – please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Change Log
- Refreshed the README to align with CONTRIBUTING.md guidelines.
- Enhanced error handling and network mock tests.
- Extended CLI commands with "--update" for modifying the ontology title and "--clear" for removing the persisted ontology.
- Introduced a new command "--fetch-endpoints" to retrieve data from five public endpoints.
- Maintained comprehensive test coverage for file system and network error scenarios.

## Installation

Install via npm:

```bash
npm install owl-builder
```

## Features

- **CLI Commands:**
  - --help: Display help instructions.
  - --version: Show tool version.
  - --list: List supported commands.
  - --build: Build a sample ontology.
  - --serve: Start the web interface.
  - --diagnostics: Show system diagnostics.
  - --integrate: Integrate supplemental ontologies.
  - --crawl: Crawl public data sources.
  - --persist: Save the ontology to a file.
  - --load: Load a persisted ontology.
  - --query: Query the ontology.
  - --validate: Validate the ontology structure.
  - --export: Export the ontology to XML.
  - --import: Import an ontology from XML.
  - --sync: Synchronize the ontology.
  - --backup: Backup the ontology file.
  - --summary: Summarize the ontology.
  - --refresh: Refresh the ontology timestamp.
  - --analyze: Analyze ontology metrics.
  - --monitor: Monitor system metrics.
  - --rebuild: Rebuild the ontology.
  - --demo: Display demo output.
  - --fetch-schemas: Retrieve detailed OWL schemas.
  - --fetch-public: Fetch public data.
  - --update [newTitle]: Update the ontology title.
  - --clear: Clear the persisted ontology file.
  - --fetch-endpoints: Retrieve data from multiple public endpoints.

## Public Data Endpoints

owl-builder fetches data from the following endpoints:

- https://api.publicapis.org/entries
- https://dog.ceo/api/breeds/image/random
- https://jsonplaceholder.typicode.com/posts
- https://api.spacexdata.com/v4/launches/latest
- https://api.coindesk.com/v1/bpi/currentprice.json *(Simulated network error in test mode)*

## Usage

Display help instructions:

```bash
node src/lib/main.js --help
```

Example commands:

- Build Ontology:
  ```bash
  node src/lib/main.js --build
  ```
- Serve Web Interface:
  ```bash
  node src/lib/main.js --serve
  ```
- Update Ontology Title:
  ```bash
  node src/lib/main.js --update "New Title"
  ```
- Clear Persisted Ontology:
  ```bash
  node src/lib/main.js --clear
  ```
- Fetch Data from Multiple Endpoints:
  ```bash
  node src/lib/main.js --fetch-endpoints
  ```

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. When contributing, ensure that tests pass and documentation is updated to maintain clarity around functionality.

## License

Released under the MIT License.

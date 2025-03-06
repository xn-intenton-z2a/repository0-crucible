# owl-builder

`owl-builder` is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies. It provides a comprehensive suite of functions for ontology creation, persistence, querying, diagnostics, and integration with public data sources. Contributions are welcome following the guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Change Log
- Version bumped to 0.0.6
- Added new commands "--update" to update the ontology title and "--clear" to clear the persisted ontology file.
- Extended CLI with new command "--fetch-endpoints" which fetches data from multiple public endpoints and logs the responses.
- Enhanced the CLI '--fetch-public' command to use dynamic import for function mocking in tests.
- Extended ontology management functions including persist, load, query, validate, export, import, sync, backup, demo, monitor, rebuild, update, and clear ontology features.
- Updated web interface to launch a simple HTTP server for demonstration purposes.
- Updated asynchronous functions to improve test stability and output logging.
- Applied linting and formatting fixes to improve code quality.

## Installation

Install via npm:

```bash
npm install owl-builder
```

## Features

- **CLI Commands:**
  - Help: `--help`
  - Version: `--version`
  - List Commands: `--list`
  - Build Ontology: `--build`
  - Serve Web Interface: `--serve`
  - Diagnostics: `--diagnostics`
  - Integrate Supplemental Ontologies: `--integrate`
  - Crawl Public Data: `--crawl`
  - Persist Ontology to File: `--persist`
  - Load Persisted Ontology: `--load`
  - Query Ontology: `--query`
  - Validate Ontology: `--validate`
  - Export Ontology to XML: `--export`
  - Import Ontology from XML: `--import`
  - Synchronize Ontology: `--sync`
  - Backup Ontology: `--backup`
  - Get Ontology Summary: `--summary`
  - Refresh Ontology: `--refresh`
  - Analyze Ontology: `--analyze`
  - Monitor System Metrics: `--monitor`
  - Rebuild Ontology: `--rebuild`
  - Demo Output: `--demo`
  - **Fetch Detailed OWL Schemas:** `--fetch-schemas`
  - **Fetch Public Data:** `--fetch-public`
  - **Update Ontology Title:** `--update [newTitle]`
  - **Clear Persisted Ontology:** `--clear`
  - **Fetch Ontology Endpoints:** `--fetch-endpoints`

## Public Data Endpoints

owl-builder can fetch data from real public endpoints and convert them into OWL ontologies. Recommended endpoints include:

- https://api.publicapis.org/entries (A list of public APIs)
- https://dog.ceo/api/breeds/image/random (Random dog images)
- https://jsonplaceholder.typicode.com/posts (Sample posts for demonstration)

Example command:

```bash
node src/lib/main.js --fetch-endpoints
```

## Usage

Run the CLI tool to see help instructions:

```bash
node src/lib/main.js --help
```

### Example Commands

- **Default Demo Output:**
  ```bash
  npm run start
  ```

- **Build Ontology:**
  ```bash
  node src/lib/main.js --build
  ```

- **Serve Web Interface:**
  ```bash
  node src/lib/main.js --serve
  ```

- **Diagnostics:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

- **Integrate Ontology:**
  ```bash
  node src/lib/main.js --integrate
  ```

- **Crawl Public Data:**
  ```bash
  node src/lib/main.js --crawl
  ```

- **Persist Ontology to File:**
  ```bash
  node src/lib/main.js --persist
  ```

- **Load Persisted Ontology:**
  ```bash
  node src/lib/main.js --load
  ```

- **Query Ontology:**
  ```bash
  node src/lib/main.js --query
  ```

- **Validate Ontology:**
  ```bash
  node src/lib/main.js --validate
  ```

- **Export to XML:**
  ```bash
  node src/lib/main.js --export
  ```

- **Import from XML:**
  ```bash
  node src/lib/main.js --import
  ```

- **Synchronize Ontology:**
  ```bash
  node src/lib/main.js --sync
  ```

- **Backup Ontology:**
  ```bash
  node src/lib/main.js --backup
  ```

- **Get Ontology Summary:**
  ```bash
  node src/lib/main.js --summary
  ```

- **Refresh Ontology:**
  ```bash
  node src/lib/main.js --refresh
  ```

- **Analyze Ontology:**
  ```bash
  node src/lib/main.js --analyze
  ```

- **Monitor System Metrics:**
  ```bash
  node src/lib/main.js --monitor
  ```

- **Rebuild Ontology:**
  ```bash
  node src/lib/main.js --rebuild
  ```

- **Demo Output:**
  ```bash
  node src/lib/main.js --demo
  ```

- **Fetch Detailed OWL Schemas:**
  ```bash
  node src/lib/main.js --fetch-schemas
  ```

- **Fetch Public Data:**
  ```bash
  node src/lib/main.js --fetch-public
  ```

- **Update Ontology Title:**
  ```bash
  node src/lib/main.js --update "New Ontology Title"
  ```

- **Clear Persisted Ontology:**
  ```bash
  node src/lib/main.js --clear
  ```

- **Fetch Ontology Endpoints:**
  ```bash
  node src/lib/main.js --fetch-endpoints
  ```

- **List Supported Commands:**
  ```bash
  node src/lib/main.js --list
  ```

- **Retrieve Tool Version:**
  ```bash
  node src/lib/main.js --version
  ```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively. Your input is vital to maintain and improve owl-builder.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

# owl-builder

`owl-builder` is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies. It offers a suite of functions to build an ontology from public data sources, integrate supplemental theme ontologies, run diagnostics, serve a web interface for interactive querying and visualization, persist ontologies to disk, and perform query operations on the ontology.

## Change Log
- Version bumped to 0.0.5
- Added new command "--fetch-public" to fetch data from real public endpoints with enhanced error handling.
- Refactored the main CLI function to use command mapping for reduced complexity.
- Extended ontology management functions: persist, load, query, validate, export, import, sync, backup, demo, monitor, and rebuild.
- Enhanced XML import regex for improved concept extraction.
- Updated CLI help message and modularized asynchronous command handling in the source file to align with our mission.
- Improved test coverage with added unit tests for error scenarios in external resource calls (file system and network).
- Pruned code drift by standardizing file path handling and error messaging.

## Repository Template

This repository serves as a template to:

* Kickstart new projects with ontology management capabilities.
* Demonstrate best practices for CLI and web interface based applications.
* Provide an example implementation using automated CI/CD workflows from [agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib).

See [TEMPLATE-README.md](./TEMPLATE-README.md) for additional details.

## Installation

Install via npm:

```bash
npm install owl-builder
```

## Features

- Command line interface with multiple modes:
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
  - Monitor System (Memory & Load): `--monitor`
  - Rebuild Ontology: `--rebuild`
  - Demo Output: `--demo`
  - **Fetch Detailed OWL Schemas: `--fetch-schemas`**
  - **Fetch Public Data: `--fetch-public`**

## Public Data Endpoints

owl-builder can fetch data from real public endpoints and convert them into OWL ontologies. Recommended endpoints include:

- https://api.publicapis.org/entries (A list of public APIs)
- https://dog.ceo/api/breeds/image/random (Random dog images)
- https://jsonplaceholder.typicode.com/posts (Sample posts for demonstration)

Use the following command to fetch public data:

```bash
node src/lib/main.js --fetch-public
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

- **Export Ontology to XML:**
  ```bash
  node src/lib/main.js --export
  ```

- **Import Ontology from XML:**
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

- **Monitor System Memory and Load:**
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

- **List Supported Commands:**
  ```bash
  node src/lib/main.js --list
  ```

- **Retrieve Tool Version:**
  ```bash
  node src/lib/main.js --version
  ```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively. Your input helps make owl-builder a robust tool for ontology management.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

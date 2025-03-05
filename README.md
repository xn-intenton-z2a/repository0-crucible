# owl-builder

`owl-builder` is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies. It offers a suite of functions to build an ontology from public data sources, integrate supplemental theme ontologies, run diagnostics, serve a web interface for interactive querying and visualization, persist ontologies to disk, and perform query operations on the ontology. The tool now also includes functionalities such as ontology validation, export, import, synchronization, and backup.

## Change Log
- Extended ontology management functions: added persist, load, query, validate, export, import, sync, and backup features.
- Updated CLI help message and source file to align with the owl-builder mission statement and remove simulation drift.
- Improved code documentation and modularity in source file, refactoring to adhere to contributing guidelines.
- Updated test coverage to reflect new and refactored functionalities.

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

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively. Your input helps make owl-builder a robust tool for ontology management.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

# owl-builder

`owl-builder` is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies. It offers a suite of functions to build an ontology from public data sources, integrate supplemental theme ontologies, run diagnostics, serve a web interface for interactive querying and visualization, persist ontologies to disk, and perform query operations on the ontology. Recent updates include additional commands for listing available functionalities, retrieving the tool version, and a new demo command to showcase extended ontology metadata. The CLI has been refactored to reduce complexity and improve maintainability.

## Change Log
- Refactored the main CLI function to use a command mapping for reduced complexity.
- Extended ontology management functions: added persist, load, query, validate, export, import, sync, and backup features.
- Added a new demo command (--demo) that displays a detailed ontology with extended metadata.
- Enhanced XML import function by refining the regular expression pattern.
- Updated error handling in file operations for persistence and loading of ontology.
- Updated version bump to 0.0.3.

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
  - **Demo Ontology (Extended Metadata): `--demo`**

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

- **List Supported Commands:**
  ```bash
  node src/lib/main.js --list
  ```

- **Retrieve Tool Version:**
  ```bash
  node src/lib/main.js --version
  ```

- **Display Demo (Detailed Ontology with Extended Metadata):**
  ```bash
  node src/lib/main.js --demo
  ```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively. Your input helps make owl-builder a robust tool for ontology management.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

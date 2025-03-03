# owl-builder

`owl-builder` is a CLI tool and JavaScript library for building, managing, and querying OWL ontologies. It offers a suite of functions to build an ontology from public data sources, integrate supplemental theme ontologies, run diagnostics, serve a web interface for interactive querying and visualization, persist ontologies to disk, and perform query operations on the ontology.

## Change Log
- Updated README to align with CONTRIBUTING guidelines.
- Refreshed documentation and examples to accurately reflect owl-builder's mission of ontology management.
- Standardized help message and CLI output across commands.
- Improved test coverage in the unit tests.
- Added new functions for persisting ontologies to a file, loading persisted ontologies, and querying the ontology.
- Extended CLI functionality with new commands: --persist, --load, and --query.
- Enhanced diagnostics, integration, and public data crawling functionalities.
- Excluded archived files from linting by updating the ESLint configuration in package.json.

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

- **Query Ontology (demo search for 'Concept1') :**
  ```bash
  node src/lib/main.js --query
  ```

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute effectively. Your input helps make owl-builder a more robust tool for ontology management.

## License

Released under the MIT License (see [LICENSE](./LICENSE)).

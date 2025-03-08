# owl-builder

owl-builder is a versatile CLI tool and JavaScript library for constructing real-time OWL ontologies from live, verified public data sources. This documentation has been refreshed in line with our [CONTRIBUTING](CONTRIBUTING.md) guidelines to provide clear, concise, and up-to-date information.

## Overview

owl-builder leverages real-time public endpoints to build dynamic ontology models. It provides features for data persistence, querying, diagnostics, and generating multiple ontology models (basic, advanced, intermediate, enhanced, minimal, complex, and custom). Legacy static fallback implementations have been pruned to ensure a focus on live data integration and enhanced diagnostic logging.

## Features

- **Ontology Building:** Create ontologies using live public data. A legacy static fallback is available only as a backup.
- **Data Persistence:** Save, load, backup, and clear ontology JSON files.
- **Query & Validation:** Search through ontology concepts and validate models.
- **OWL Export/Import:** Convert ontologies to and from a minimal OWL XML format.
- **Data Crawling:** Retrieve live data from an extended list of public endpoints for broader ontology construction.
- **Model Wrappers:** Generate various ontology models including basic, advanced, intermediate, enhanced, minimal, and complex versions.
- **Extended Customization:** Build and merge custom ontologies.
- **Enhanced Diagnostics:** Timestamped logging to support monitoring and debugging.
- **Web Server:** Integrated web server for monitoring.

## Installation

Ensure you have Node.js version 20 or later installed. Then, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

### Run Demo

This demo showcases core functionalities such as ontology building, persistence, querying, and diagnostic logging. Note that live API calls are performed where applicable.

```bash
npm run start
```

### CLI Help

For usage instructions and available commands, run:

```bash
node src/lib/main.js --help
```

### Key CLI Commands

- `--build`: Generate an ontology using the legacy static fallback.
- `--persist`: Save the ontology to a JSON file.
- `--load`: Load the saved ontology.
- `--query "term"`: Search for ontology concepts.
- `--export`: Export the ontology as OWL XML.
- `--import`: Import an ontology from an OWL XML string.
- `--backup`: Create a backup of the ontology file.
- `--update "New Title"`: Update the ontology title.
- `--clear`: Delete the ontology file.
- `--crawl`: Crawl public endpoints for live data.
- `--fetch-retry`: Fetch data with retry logic.
- `--build-basic`, `--build-advanced`, `--build-intermediate`, `--build-enhanced`: Build various ontology models.
- `--build-live`: Build an ontology using live data with diagnostics.
- `--build-custom-data`: Build an ontology from provided custom data.
- `--merge-ontologies`: Merge multiple ontology models.
- `--build-live-log`: Build a live data ontology with additional diagnostic logging.
- `--serve`: Launch the integrated web server.
- `--diagnostics`: Run diagnostics against public endpoints.
- `--build-minimal`: Build and return a minimal OWL ontology model.
- `--build-complex`: Build and return a complex OWL ontology model.
- `--list`, `--version`, `--help`: Additional utilities.

## Extended Endpoints

The library now includes an extended list of live endpoints. New endpoints added include:

- `https://jsonplaceholder.typicode.com/albums`
- `https://jsonplaceholder.typicode.com/users`

These additions enrich the diversity of accessible information for constructing ontologies.

## For Developers

- **Testing:** Run unit tests with:

```bash
npm run test:unit
```

- **Linting & Formatting:**

```bash
npm run linting
npm run formatting
```

Please refer to our [CONTRIBUTING](CONTRIBUTING.md) guidelines for details on code quality, testing practices, and documentation standards.

## Change Log

**Version 0.0.35**

- Refocused ontology building on live public data sources.
- Enhanced diagnostic logging with new functions `getCurrentTimestamp` and `logDiagnostic`.
- Pruned legacy static fallback code; static buildOntology is now solely a fallback.
- Added functions for custom ontology building and merging.
- **Extended endpoints list:** Added endpoints for albums and users to widen data sources.
- **Added new model wrappers:** Implemented `buildMinimalOWLModel` and `buildComplexOntologyModel` for additional OWL ontology model representations.
- Documentation refreshed to align with current best practices and contributing guidelines.

## License

Released under the MIT License.

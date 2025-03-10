# owl-builder

owl-builder is a versatile CLI tool and JavaScript library for constructing real-time OWL ontologies from live, verified public data sources. This documentation has been refreshed in accordance with our [CONTRIBUTING](CONTRIBUTING.md) guidelines to provide clear, concise, and up-to-date information.

## Overview

owl-builder leverages live public endpoints to build dynamic ontology models. It provides features for data persistence, querying, diagnostics, and generating multiple ontology models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, and custom). The legacy static fallback is now deprecated and retained only for emergency use.

## Features

- **Ontology Building:** Create ontologies using live public data with real-time API integration. The deprecated static fallback is available only as an emergency option.
- **Data Persistence:** Save, load, backup, and clear ontology JSON files.
- **Query & Validation:** Search through ontology concepts and validate models.
- **OWL Export/Import:** Convert ontologies to and from a minimal OWL XML format.
- **Data Crawling:** Retrieve live data from an extended list of public endpoints for broader ontology construction. (Crawls are performed concurrently, and in test mode a subset is used to avoid timeouts.)
- **Model Wrappers:** Generate various ontology models including basic, advanced, intermediate, enhanced, minimal, complex, scientific, and educational versions.
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

This demo showcases core functionalities such as ontology building, persistence, querying, and diagnostic logging. Live API calls are performed where applicable. In test mode, crawling is skipped to prevent timeouts.

```bash
npm run start
```

### CLI Help

For usage instructions and available commands, run:

```bash
node src/lib/main.js --help
```

### Key CLI Commands

- `--build`: Generate a deprecated fallback ontology using static data (emergency use only).
- `--build-live`: Build an ontology using live data with diagnostic logging.
- `--persist`: Save the ontology to a JSON file.
- `--load`: Load the saved ontology.
- `--query "term"`: Search for ontology concepts.
- `--export`: Export the ontology as OWL XML.
- `--import`: Import an ontology from an OWL XML string.
- `--backup`: Create a backup of the ontology file.
- `--update "New Title"`: Update the ontology title.
- `--clear`: Delete the ontology file.
- `--crawl`: Crawl public endpoints for live data (concurrent execution; in test mode, a subset of endpoints is used).
- `--fetch-retry`: Fetch data with retry logic.
- `--build-basic`, `--build-advanced`, `--build-intermediate`, `--build-enhanced`: Build various ontology models.
- `--build-scientific`: Build a scientific ontology model with disciplines and scientific concepts.
- `--build-educational`: Build an educational ontology model with subjects and educational concepts.
- `--build-custom-data`: Build an ontology from provided custom data.
- `--merge-ontologies`: Merge multiple ontology models.
- `--build-live-log`: Build a live data ontology with additional diagnostic logging.
- `--serve`: Launch the integrated web server.
- `--diagnostics`: Run diagnostics against public endpoints.
- `--build-minimal`: Build and return a minimal OWL ontology model.
- `--build-complex`: Build and return a complex OWL ontology model.
- `--list`, `--version`, `--help`: Additional utilities.

## Extended Endpoints

The library now includes an extended list of live endpoints. In addition to the previously available endpoints, the following new endpoints have been added to enrich the diversity of accessible data:

- `https://api/genderize.io`
- `https://api/nationalize.io`
- `https://api/covid19api.com/summary`

These additions provide further opportunities for constructing diverse ontologies.

## OWL Ontology Models

The following model wrappers are provided:

- **buildBasicOWLModel:** Constructs a basic ontology model.
- **buildAdvancedOWLModel:** Constructs an advanced ontology model with classes and properties.
- **buildIntermediateOWLModel:** Constructs an intermediate-level ontology model.
- **buildEnhancedOntology:** Constructs an enhanced ontology, integrating live data (e.g., images).
- **buildMinimalOWLModel:** Constructs a minimal ontology model.
- **buildComplexOntologyModel:** Constructs a complex ontology model with classes, properties, and concepts.
- **buildScientificOntologyModel:** Constructs a scientific ontology including disciplines with academic concepts.
- **buildEducationalOntologyModel:** Constructs an educational ontology model featuring subjects and learning concepts.

## Change Log

**Version 0.0.35**

- Refocused ontology building on live public data sources; static fallback is now deprecated and retained only for emergency use.
- Enhanced diagnostic logging with new functions `getCurrentTimestamp` and `logDiagnostic`.
- Added functions for custom ontology building (`buildOntologyFromCustomData`) and merging (`mergeOntologies`).
- Extended endpoints list: added endpoints for albums, users, **genderize**, **nationalize**, and **covid19api** to diversify data sources.
- Updated CLI commands to delineate between live data integration and deprecated static fallback methods.
- Extended OWL model wrappers: added `buildScientificOntologyModel` and `buildEducationalOntologyModel` for specialized ontology modeling.
- Improved concurrency in crawl operations and added test mode handling in demo and crawl functions to prevent timeouts during automated tests.

## License

Released under the MIT License.

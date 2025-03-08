# owl-builder

owl-builder is a versatile CLI tool and JavaScript library focused on constructing OWL ontologies using live, verified public data sources. With a strong emphasis on real-time data integration, owl-builder ensures that your ontology models are current and accurate.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [For Casual Users](#for-casual-users)
  - [For Developers](#for-developers)
- [CLI Commands](#cli-commands)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

owl-builder leverages verified public endpoints to build dynamic ontology models in real-time. Its refocused mission is to enable users to seamlessly construct, persist, query, and export ontologies that mirror current external data, ensuring both reliability and traceability.

## Features

- **Ontology Building:** Create ontology models from live public data.
- **Data Persistence:** Save, load, backup, and clear ontology JSON files.
- **Querying and Validation:** Search ontology concepts and verify model integrity.
- **OWL Export/Import:** Convert ontologies to a minimal OWL XML format.
- **Data Crawling:** Retrieve live data from an extensive list of verified endpoints.
- **Ontology Model Wrappers:** Generate basic, advanced, intermediate, and enhanced ontology models. The enhanced model integrates live data (e.g. image from a dog API) to enrich the ontology.
- **Diagnostics & Web Server:** Built-in diagnostics and web server for monitoring operations.

## Installation

Ensure Node.js v20 or later is installed. Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

- **Run Demo:**

  Execute the demo to showcase core functionality including building, persisting, and querying ontologies:

  ```bash
  npm run start
  ```

- **Help Information:**

  ```bash
  node src/lib/main.js --help
  ```

### For Casual Users

- **Build Ontology:**
  ```bash
  node src/lib/main.js --build
  ```

- **Export to OWL (XML):**
  ```bash
  node src/lib/main.js --export
  ```

- **Crawl Data:**
  ```bash
  node src/lib/main.js --crawl
  ```

- **Build Intermediate Ontology:**
  ```bash
  node src/lib/main.js --build-intermediate
  ```

- **Build Enhanced Ontology:**
  ```bash
  node src/lib/main.js --build-enhanced
  ```

### For Developers

- **Testing:** Run unit tests with:

  ```bash
  npm run test:unit
  ```

- **Linting and Formatting:**

  ```bash
  npm run linting
  npm run formatting
  ```

Refer to inline code comments for API documentation.

### Extended Commands

owl-builder supports several advanced commands for customization and diagnostics, including:

- `--build-custom`: Build a custom ontology using user-defined options.
- `--extend-concepts`: Add extra concepts to an existing ontology.
- `--diagnostics`: Run diagnostics via live endpoint tests.
- `--serve`: Launch the integrated web server.
- `--build-intermediate`: Build an intermediate-level OWL ontology model.
- `--build-enhanced`: Build an enhanced OWL ontology model enriched with live data.

## CLI Commands

Key commands include:

- `--help`: Display usage information.
- `--version`: Display the tool version.
- `--list`: List available commands.
- `--build`: Generate an ontology from live data.
- `--persist`: Save the ontology to a JSON file.
- `--load`: Load a saved ontology.
- `--query "term"`: Search for ontology concepts.
- `--export`: Export the ontology as OWL XML.
- `--import`: Import an ontology from an OWL XML string.
- `--backup`: Create a backup of the ontology file.
- `--update "New Title"`: Update the ontology title.
- `--clear`: Delete the ontology file.
- `--crawl`: Crawl public endpoints for live data.
- `--fetch-retry`: Fetch data with retry logic.
- `--build-basic`, `--build-advanced`, `--wrap-model`: Build various ontology models.
- `--build-custom`: Build a customized ontology.
- `--extend-concepts`: Extend the ontology with new concepts.
- `--diagnostics`: Run diagnostics against public endpoints.
- `--serve`: Launch the web server.
- `--build-intermediate`: Build an intermediate ontology model.
- `--build-enhanced`: Build an enhanced ontology model enriched with live data.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on code quality, testing, and documentation.

When contributing, please ensure:

- Tests are updated or added as needed.
- Documentation (both inline and in external files) is kept current.
- Changes align with our mission of real-time ontology building using live public data sources.

## Changelog

- **Version 0.0.32**
  - Refocused ontology building to leverage live, verified public data endpoints.
  - Enhanced diagnostic messaging and updated network operations for real-time data integration.
  - Added new functions: **buildIntermediateOWLModel** and **buildEnhancedOntology**.
  - Added new CLI commands: **--build-intermediate** and **--build-enhanced**.
  - Updated buildEnhancedOntology to use an exported fetcher, allowing tests to properly mock network responses. 
  - Version updated from 0.0.31 to 0.0.32.

- **Version 0.0.31** (Previous)
  - README refreshed to align with CONTRIBUTING guidelines.
  - Documentation updated to better reflect live data integration.
  - getVersion updated for consistency across the project.

## License

Released under the MIT License.

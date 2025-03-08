# owl-builder

owl-builder is a versatile CLI tool and JavaScript library for constructing real-time OWL ontologies using live, verified public data sources.

---

## Overview

owl-builder leverages live public data endpoints to build dynamic ontology models that remain current and accurate. The tool provides functionality for data persistence, querying, multiple ontology model builders (basic, advanced, intermediate, enhanced, live-data based, and custom merging), as well as enhanced diagnostic logging. This release prunes legacy simulated demo implementations in favor of real-time public data integration.

## Features

- **Ontology Building:** Create ontologies based on live, real-time public data using verified endpoints.
- **Data Persistence:** Save, load, backup, and clear ontology JSON files.
- **Query and Validation:** Search through ontology concepts and validate model integrity.
- **OWL Export/Import:** Convert ontologies to a minimal OWL XML format.
- **Data Crawling:** Retrieve live data from a curated list of public endpoints.
- **Model Wrappers:** Generate various ontology models including intermediate, enhanced, and live-data integrated models.
- **Extended Customization:** Build ontologies from custom data and merge multiple ontologies.
- **Enhanced Diagnostic Logging:** Timestamped logging via **getCurrentTimestamp** and **logDiagnostic** to support monitoring and diagnostics.
- **Web Server & Diagnostics:** Integrated support for launching a monitoring web server and running diagnostics.

## Installation

Ensure you have Node.js v20 or later installed. Then, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

- **Run Demo:**

  This demo showcases the core functionalities including ontology building, persistence, querying, and diagnostic logging. Note that live API calls are performed where applicable.
  
  ```bash
  npm run start
  ```

- **Help Information:**

  ```bash
  node src/lib/main.js --help
  ```

### For Users

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

- **Build Various Ontologies:**
  ```bash
  node src/lib/main.js --build-basic
  node src/lib/main.js --build-advanced
  node src/lib/main.js --build-intermediate
  node src/lib/main.js --build-enhanced
  node src/lib/main.js --build-live
  node src/lib/main.js --build-custom-data '{"title":"My Custom Ontology", "concepts":["CustomConcept"]}'
  node src/lib/main.js --merge-ontologies
  node src/lib/main.js --build-live-log
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

## CLI Commands

Key commands include:

- `--help`: Display usage instructions
- `--version`: Show tool version
- `--list`: List available commands
- `--build`: Generate an ontology from fallback static data
- `--persist`: Save the ontology to a JSON file
- `--load`: Load a saved ontology
- `--query "term"`: Search for ontology concepts
- `--export`: Export the ontology as OWL XML
- `--import`: Import an ontology from an OWL XML string
- `--backup`: Create a backup of the ontology file
- `--update "New Title"`: Update the ontology title
- `--clear`: Delete the ontology file
- `--crawl`: Crawl public endpoints for live data
- `--fetch-retry`: Fetch data with retry logic
- `--build-basic`, `--build-advanced`, `--wrap-model`: Build various ontology models
- `--build-custom`: Build a customized ontology
- `--extend-concepts`: Extend the ontology with new concepts
- `--diagnostics`: Run diagnostics against public endpoints
- `--serve`: Launch the integrated web server
- `--build-intermediate`: Build an intermediate ontology model
- `--build-enhanced`: Build an enhanced ontology model enriched with live data
- `--build-live`: Build an ontology using live data with diagnostic logging
- `--build-custom-data`: Build an ontology from provided custom data
- `--merge-ontologies`: Merge static and live data ontologies into one
- `--build-live-log`: Build live data ontology with additional diagnostic logs

## Change Log

**Version 0.0.34**
- Refocused ontology building to leverage live, verified public data endpoints.
- Enhanced diagnostic messaging with new functions **getCurrentTimestamp** and **logDiagnostic**.
- Added new functions **buildOntologyFromCustomData**, **mergeOntologies**, and **buildOntologyFromLiveDataWithLog** for extended customization and merging capabilities.
- Updated CLI commands to include --build-custom-data, --merge-ontologies, and --build-live-log.
- Removed legacy simulated demo implementations and pruned code drift.
- Verified responses from external endpoints via diagnostics tests.

## License

Released under the MIT License.

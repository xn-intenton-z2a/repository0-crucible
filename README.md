# owl-builder

owl-builder is a versatile CLI tool and JavaScript library designed to build dynamic OWL ontologies from live, verified public data sources. In this refocused release, live data integration is paramount, while the legacy static fallback is retained solely for emergencies.

## Overview

owl-builder leverages a broad array of public endpoints to create rich, real-time ontology models. Key features include:

- **Live Data Integration:** Build ontologies using up-to-date information from trusted public endpoints.
- **Data Persistence:** Save, load, backup, clear, and refresh your ontology JSON files with ease.
- **Query & Validation:** Efficiently search and validate ontology concepts.
- **OWL Export/Import:** Convert ontologies to and from a minimal OWL XML format.
- **Concurrent Data Crawling:** Retrieve data concurrently from an extended list of public endpoints.
- **Diverse Model Wrappers:** Generate various ontology models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, and economic).
- **Enhanced Diagnostics:** Detailed timestamped logging to support monitoring and troubleshooting.
- **Web Server:** Integrated server for simple monitoring of ontology status.

## Installation

Ensure Node.js version 20 or later is installed. Then, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

### Run Demo

This demo highlights core functionalities such as ontology building, persistence, querying, and diagnostic logging:

```bash
npm run start
```

### CLI Help

For a complete list of commands and detailed usage instructions, run:

```bash
node src/lib/main.js --help
```

### Key CLI Commands

- `--build`: Generates a deprecated fallback ontology using static data (**deprecated: use `--build-live` for live data integration**).
- `--build-live`: Builds an ontology with live data and logs diagnostic information.
- `--persist`: Saves the current ontology to a JSON file.
- `--load`: Loads the saved ontology.
- `--query "term"`: Searches for matching ontology concepts.
- `--export`: Exports your ontology as OWL XML.
- `--import`: Imports an ontology from OWL XML content.
- `--backup`: Creates a backup of your ontology file.
- `--update "New Title"`: Updates the title of the current ontology.
- `--clear`: Deletes the ontology file.
- `--crawl`: Concurrently crawls public endpoints to gather live data for ontology building.
- `--fetch-retry`: Fetches data using retry logic.
- `--merge-ontologies`: Merges static and live ontology models.
- `--build-live-log`: Builds a live ontology with additional diagnostic logging.
- `--serve`: Launches the integrated web server.
- `--diagnostics`: Runs diagnostics using various public endpoints.
- `--refresh`: Clears the existing ontology, rebuilds using live data, and persists the refreshed ontology.
- `--merge-persist`: Merges static and live ontologies and saves the merged result.

Other commands include wrappers for building diverse ontology models, as detailed in the help instructions.

## Extended Endpoints

owl-builder now includes an extended list of live endpoints such as:

- Traditional endpoints like:
  - `https://api.publicapis.org/entries`
  - `https://dog.ceo/api/breeds/image/random`
  - `https://jsonplaceholder.typicode.com/posts`
  - `https://api/coindesk.com/v1/bpi/currentprice.json`
  - `https://api/github.com`
  - etc.

- **Newly added endpoints:**
  - `https://dog.ceo/api/breed/husky/images/random`
  - `https://quotes.rest/qod`
  - `https://type.fit/api/quotes`
  - `https://api/exchangerate-api.com/v4/latest/USD`
  - `https://api/spacexdata.com/v4/rockets`

These diverse sources ensure a rich foundation for ontology construction.

## OWL Ontology Models

The library supports a variety of ontology models through wrapper functions:

- **buildBasicOWLModel:** Constructs a basic ontology model.
- **buildAdvancedOWLModel:** Builds an advanced model with classes and properties.
- **buildIntermediateOWLModel:** An intermediate-level ontology model.
- **buildEnhancedOntology:** An enhanced ontology integrating live data such as images.
- **buildMinimalOWLModel:** Constructs a minimal ontology.
- **buildComplexOntologyModel:** Builds a complex model with comprehensive features.
- **buildScientificOntologyModel:** Focused on scientific disciplines and academic concepts.
- **buildEducationalOntologyModel:** Tailored for educational content.
- **buildPhilosophicalOntologyModel:** Centers on philosophical themes.
- **buildEconomicOntologyModel:** Emphasizes economic and market concepts.

## Change Log

**Version 0.0.37**

- Refocused ontology building on live public data sources. Static fallback now for emergency use only.
- Enhanced diagnostic logging with functions `getCurrentTimestamp` and `logDiagnostic`.
- Added functions for custom ontology creation and merging (`buildOntologyFromCustomData`, `mergeOntologies`).
- Extended the list of live endpoints to enrich available data sources.
- Updated CLI commands to clearly demarcate live data integration from the deprecated static fallback.
- Freshly updated this README according to CONTRIBUTING guidelines to improve clarity and remove extraneous information.

## Contributing

Contributions are welcome! For details, please review [CONTRIBUTING.md](CONTRIBUTING.md) which outlines our workflow, coding standards, and testing requirements. We encourage community input to enhance owl-builder further.

## License

Released under the MIT License.

# owl-builder

owl-builder is a versatile CLI tool and JavaScript library designed to build dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, and demonstrating ontologies, while the legacy static fallback is retained solely for emergencies.

## Overview

owl-builder leverages a broad array of public endpoints to create rich, real-time ontology models. Key features include:

- **Live Data Integration:** Build ontologies using up-to-date information from trusted public endpoints. Live data integration is now the default.
- **Data Persistence:** Save, load, backup, clear, refresh, and merge your ontology JSON files effortlessly.
- **Query & Validation:** Efficiently search and validate ontology concepts.
- **OWL Export/Import:** Convert ontologies to and from a minimal OWL XML format.
- **Concurrent Data Crawling:** Retrieve real-time data concurrently from an extended list of public endpoints.
- **Diverse Model Wrappers:** Generate various ontology models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, and economic).
- **Enhanced Diagnostics:** Detailed timestamped logging for monitoring and troubleshooting.
- **Web Server:** Integrated server for simple ontology status monitoring.
- **Extended Merging and Customization:** New functions such as buildOntologyHybrid, enhancedDiagnosticSummary, customMergeWithTimestamp, and backupAndRefreshOntology allow more flexible ontology building and diagnostics.

## Installation

Ensure Node.js version 20 or later is installed. Then, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

### Run Demo

A demo highlighting core functionalities such as live ontology building, persistence, querying and diagnostic logging:

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
- `--build-live`: Builds an ontology with live data integration and logs diagnostic information.
- `--persist`: Saves the current ontology to a JSON file.
- `--load`: Loads the saved ontology.
- `--query "term"`: Searches for matching ontology concepts.
- `--export`: Exports your ontology as OWL XML.
- `--import`: Imports an ontology from OWL XML content.
- `--backup`: Creates a backup of your ontology file.
- `--update "New Title"`: Updates the title of the current ontology using live data.
- `--clear`: Deletes the ontology file.
- `--crawl`: Concurrently crawls public endpoints to gather data for ontology building.
- `--fetch-retry`: Fetches data using retry logic.
- `--merge-ontologies`: Merges static and live ontology models.
- `--build-live-log`: Builds a live ontology with additional diagnostic logging.
- `--serve`: Launches the integrated web server.
- `--diagnostics`: Runs diagnostics using various public endpoints.
- `--refresh`: Clears the existing ontology, rebuilds it using live data, and persists the refreshed ontology.
- `--merge-persist`: Merges static and live ontologies and saves the merged result.
- **New Commands:**
  - `--build-hybrid`: Combines live data with custom data to produce a hybrid ontology.
  - `--diagnostic-summary`: Returns a concise diagnostic summary with timestamp and version.
  - `--custom-merge`: Merges provided ontologies and appends a current timestamp.
  - `--backup-refresh`: Creates a backup and refreshes the current ontology.

Additional commands include wrappers for building diverse ontology models. See the help output for a complete list.

## Extended Endpoints

owl-builder now includes a broadened list of live endpoints such as:

- Traditional endpoints like:
  - `https://api.publicapis.org/entries`
  - `https://dog.ceo/api/breeds/image/random`
  - `https://jsonplaceholder.typicode.com/posts`
  - ...

- **New and Corrected endpoints:**
  - `https://api.coindesk.com/v1/bpi/currentprice.json`
  - `https://api/chucknorris.io/jokes/random`
  - `https://api/agify.io/?name=michael`
  - `https://api/stackexchange.com/2.2/questions?order=desc&sort=activity`
  - `https://api/spacexdata.com/v4/launches/latest`
  - `https://api/spacexdata.com/v4/rockets`
  - `https://api/exchangerate-api.com/v4/latest/USD`
  - **New:** `https://api/quotable.io/random`
  - **Corrected:** `https://api/covid19api.com/summary`

*Test Results Note:* Extended endpoints tests have confirmed valid data responses from many endpoints while handling errors appropriately when endpoints are unreachable.

## OWL Ontology Models

The library supports a range of ontology models via wrapper functions:

- **buildBasicOWLModel:** Constructs a basic ontology model.
- **buildAdvancedOWLModel:** Builds an advanced model with classes and properties.
- **buildIntermediateOWLModel:** Provides an intermediate-level ontology model.
- **buildEnhancedOntology:** Offers an enhanced ontology using live data, such as images.
- **buildMinimalOWLModel:** Constructs a minimal ontology model.
- **buildComplexOntologyModel:** Creates a complex model with comprehensive features.
- **buildScientificOntologyModel:** Targets scientific disciplines and academic concepts.
- **buildEducationalOntologyModel:** Tailored for educational content.
- **buildPhilosophicalOntologyModel:** Centers on philosophical themes.
- **buildEconomicOntologyModel:** Focuses on economic and market concepts.

## Additional New Features

New functions have been introduced to extend merging, diagnostics, and custom model capabilities:

- **buildOntologyHybrid:** Combines live data with custom static data to produce a hybrid ontology.
- **enhancedDiagnosticSummary:** Provides a summary of diagnostic information including timestamp and version.
- **customMergeWithTimestamp:** Merges multiple ontologies and adds a current timestamp.
- **backupAndRefreshOntology:** Backs up the current ontology and refreshes it using live data.

## Change Log

**Version 0.0.39**

- Refocused ontology building entirely on live public data sources; static fallback retained only for emergencies.
- Enhanced diagnostic logging and updated endpoint corrections.
- Pruned drift and removed redundant legacy code in alignment with the Mission Statement.
- Updated demo, update, and diagnostics functions to use live data integration by default.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for detailed workflow, coding standards, and testing requirements. We welcome community input to further enhance owl-builder.

## License

Released under the MIT License.

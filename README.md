# owl-builder

owl-builder is a versatile CLI tool and JavaScript library for constructing real-time OWL ontologies from live, verified public data sources. This documentation has been refreshed in accordance with our [CONTRIBUTING](CONTRIBUTING.md) guidelines to provide clear, concise, and up-to-date information.

## Overview

owl-builder leverages live public endpoints to build dynamic ontology models. It provides features for data persistence, querying, diagnostics, and generating multiple ontology models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, and economic). The legacy static fallback is now deprecated and retained only for emergency use.

## Features

- **Ontology Building:** Create ontologies using live public data with real-time API integration. The deprecated static fallback is available only as an emergency option.
- **Data Persistence:** Save, load, backup, clear, and now refresh ontology JSON files.
- **Query & Validation:** Search through ontology concepts and validate models.
- **OWL Export/Import:** Convert ontologies to and from a minimal OWL XML format.
- **Data Crawling:** Retrieve live data from an extended list of public endpoints for broader ontology construction. (Crawls are performed concurrently, and in test mode a subset is used to avoid timeouts.)
- **Model Wrappers:** Generate various ontology models including basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, and economic versions.
- **Extended Customization:** Build and merge custom ontologies. New functions allow refreshing ontologies and merging them with persistence.
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

- `--build`: Generate a deprecated fallback ontology using static data (emergency use only). **Deprecated: Use `--build-live` for live data integration.**
- `--build-live`: Build an ontology using live data with diagnostic logging.
- `--build-basic`, `--build-advanced`, `--build-intermediate`, `--build-enhanced`, `--build-minimal`, `--build-complex`, `--build-scientific`, `--build-educational`, `--build-philosophical`, `--build-economic`: Build various ontology models.
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
- `--merge-ontologies`: Merge multiple ontology models.
- `--build-live-log`: Build a live data ontology with additional diagnostic logging.
- `--serve`: Launch the integrated web server.
- `--diagnostics`: Run diagnostics against public endpoints.
- `--refresh`: **New!** Clears existing ontology, rebuilds using live data, and persists the refreshed ontology.
- `--merge-persist`: **New!** Merges the static and live data ontologies and persists the merged result.
- `--list`, `--version`, `--help`: Additional utilities.

## Extended Endpoints

The library now includes an extended list of live endpoints. In addition to the previously available endpoints, the following new endpoints have been added to enrich the diversity of accessible data:

- Original endpoints including:
  - `https://api.publicapis.org/entries`
  - `https://dog.ceo/api/breeds/image/random`
  - `https://jsonplaceholder.typicode.com/posts`
  - `https://api.coindesk.com/v1/bpi/currentprice.json`
  - `https://api.github.com`
  - `https://jsonplaceholder.typicode.com/comments`
  - `https://dummyjson.com/products`
  - `https://randomuser.me/api/`
  - `https://catfact.ninja/fact`
  - `https://jsonplaceholder.typicode.com/todos`
  - `https://api/chucknorris.io/jokes/random`
  - `https://api/agify.io?name=michael`
  - `https://api/stackexchange.com/2.2/questions?order=desc&sort=activity`
  - `https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json`
  - `https://api/spacexdata.com/v4/launches/latest`
  - `https://random-data-api.com/api/commerce/random_commerce`
  - `https://jsonplaceholder.typicode.com/albums`
  - `https://jsonplaceholder.typicode.com/users`
  - `https://api/genderize.io`
  - `https://api/nationalize.io`
  - `https://api/covid19api.com/summary`
- **Newly added endpoints:**
  - `https://dog.ceo/api/breed/husky/images/random`
  - `https://quotes.rest/qod`
  - `https://type.fit/api/quotes`
  - `https://api/exchangerate-api.com/v4/latest/USD`
  - `https://api/spacexdata.com/v4/rockets`

These additions further support the refocused mission of integrating live, public data sources to build diverse ontologies.

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
- **buildPhilosophicalOntologyModel:** Constructs a philosophical ontology model focusing on existential and ethical themes.
- **buildEconomicOntologyModel:** Constructs an economic ontology model focused on market and industry concepts.

## Change Log

**Version 0.0.37**

- Refocused ontology building on live public data sources; static fallback retained for emergencies only.
- Enhanced diagnostic logging with new functions `getCurrentTimestamp` and `logDiagnostic`.
- Added functions for custom ontology building (`buildOntologyFromCustomData`) and merging (`mergeOntologies`).
- Extended endpoints list: added endpoints for albums, users, genderize, nationalize, covid19api, and new endpoints for husky images, quotes, exchange rate data, and SpaceX rockets.
- Updated CLI commands to clearly separate live data integration from deprecated static fallback methods.
- Improved concurrency in crawl operations and added test mode handling to prevent timeouts during automated tests.
- Pruned obsolete code paths to adhere strictly to our mission of using verified public data sources.
- **Updated Change Log to reflect library refocus on live data integration.**

## License

Released under the MIT License.

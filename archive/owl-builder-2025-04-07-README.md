# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Overview

Key features include:

- **Live Data Integration:** Ontologies are built using up-to-date data from trusted public endpoints.
- **Data Persistence:** Easily save, load, backup, clear, refresh, and merge ontologies as JSON files.
- **Query & Validation:** Rapidly search for ontology concepts and validate your data.
- **OWL Export/Import:** Convert ontologies to and from a minimal OWL XML format.
- **Concurrent Data Crawling:** Gather real-time data concurrently from a range of public endpoints.
- **Diverse Ontology Models:** Build various models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, economic, and hybrid).
- **Enhanced Diagnostics:** View timestamped logs for monitoring and troubleshooting.
- **Web Server Integration:** Launch a simple web server for quick status checks.
- **Custom Merging & Refreshing:** New functions provide extended merging and diagnostic capabilities.

## Installation

Ensure Node.js version 20 or later is installed. Then, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

### Run Demo

Demonstrate core functionality using live data integration:

```bash
npm run start
```

### CLI Help

Display a list of available commands and usage instructions:

```bash
node src/lib/main.js --help
```

### Key CLI Commands

- `--build`: Generates a deprecated fallback ontology using static data (**deprecated; use `--build-live` for live data integration**).
- `--build-live`: Builds an ontology using live data and logs diagnostic information.
- `--persist`: Saves the current ontology to a JSON file.
- `--load`: Loads the saved ontology.
- `--query "term"`: Searches for matching ontology concepts.
- `--export`: Exports the ontology as OWL XML.
- `--import`: Imports an ontology from OWL XML.
- `--backup`: Creates a backup of the ontology file.
- `--update "New Title"`: Updates the ontology title using live data.
- `--clear`: Deletes the local ontology file.
- `--crawl`: Concurrently crawls multiple public endpoints to gather data.
- `--fetch-retry`: Fetches data using retry logic.
- `--merge-ontologies`: Merges static and live ontology models.
- `--build-live-log`: Builds a live ontology with additional diagnostic logging.
- `--serve`: Launches the integrated web server.
- `--diagnostics`: Runs a diagnostic crawl of public endpoints.
- `--refresh`: Clears the existing ontology, rebuilds it using live data, and persists the refreshed ontology.
- `--merge-persist`: Merges static and live ontologies and saves the result.

**New Commands:**

- `--build-hybrid`: Combines live data with custom static data to produce a hybrid ontology.
- `--diagnostic-summary`: Provides a concise summary of diagnostic information (timestamp and version).
- `--custom-merge`: Merges provided ontologies and appends a current timestamp.
- `--backup-refresh`: Creates a backup and refreshes the ontology.

## Endpoints and Testing

owl-builder uses a broad list of public endpoints to build ontologies. Examples include:

- `https://api.publicapis.org/entries`
- `https://dog.ceo/api/breeds/image/random`
- `https://jsonplaceholder.typicode.com/posts`
- `https://api.coindesk.com/v1/bpi/currentprice.json`
- `https://api/chucknorris.io/jokes/random`
- `https://api/agify.io/?name=michael`
- `https://api/stackexchange.com/2.2/questions?order=desc&sort=activity`
- `https://api/spacexdata.com/v4/launches/latest`
- `https://api/spacexdata.com/v4/rockets`
- `https://api/exchangerate-api.com/v4/latest/USD`
- `https://api/quotable.io/random`
- `https://api/covid19api.com/summary`

End-to-end tests verify valid responses from multiple endpoints. Some endpoints may occasionally return unexpected results (e.g., an HTML 404 response), which are gracefully handled by falling back to the static ontology.

## Change Log

**Version 0.0.39**

- Refocused ontology building on live public data sources; static fallback remains only for emergencies.
- Enhanced diagnostic logging and updated several endpoint corrections.
- Pruned redundant legacy code to align with our mission.
- Extended ontology model wrappers and introduced new merging and refreshing functions.
- Updated documentation in this README to reflect recent changes and guidelines per CONTRIBUTING.md.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.

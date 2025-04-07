# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Overview

Key features include:

- **Live Data Integration:** Ontologies are built using up-to-date data from trusted public endpoints. Enhanced error handling and diagnostic logging now provide detailed information on each retry attempt during live data fetching, which now uses an exponential backoff strategy. You can configure the number of retry attempts and the initial backoff delay by using the environment variables `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY`. If these variables are set to non-numeric values or are invalid, the defaults of 3 retries and 100ms delay are used. (Note: Total attempts = `LIVEDATA_RETRY_COUNT` + 1. Defaults are 3 and 100ms respectively if not set.)
- **Data Persistence:** Easily save, load, backup, clear, refresh, and merge ontologies as JSON files. (File system operations are now non-blocking using asynchronous APIs.)
- **Query & Validation:** Rapidly search for ontology concepts and validate your data.
- **OWL Export/Import:** Convert ontologies to and from an extended OWL XML format that supports additional fields (concepts, classes, properties, metadata).
- **Concurrent Data Crawling:** Gather real-time data concurrently from a range of public endpoints.
- **Diverse Ontology Models:** Build various models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, economic, and hybrid).
- **Enhanced Diagnostics:** View timestamped logs with detailed context for each operation, facilitating easier tracing and debugging.
- **Web Server Integration:** Launch a simple web server for quick status checks.
- **Custom Merging & Refreshing:** New functions provide extended merging and diagnostic capabilities.
- **Exponential Backoff:** The live data fetch function now implements exponential backoff delays for live data fetch retries with configurable parameters using `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` (with a safe fallback to 3 retries and 100ms delay if invalid).

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

- `--build --allow-deprecated`: Generates a deprecated fallback ontology using static data (**deprecated; use `--build-live` for live data integration**). **Note:** The `--allow-deprecated` flag is required with `--build` to invoke the legacy static fallback. Running `--build` without this flag will result in a warning.
- `--build-live`: Builds an ontology using live data and logs detailed diagnostic information for each retry attempt in case of errors.
- `--persist`: Saves the current ontology to a JSON file.
- `--load`: Loads the saved ontology.
- `--query "term"`: Searches for matching ontology concepts.
- `--export`: Exports the ontology as extended OWL XML.
- `--import`: Imports an ontology from extended OWL XML.
- `--backup`: Creates a backup of the ontology file.
- `--update "New Title"`: Updates the ontology title using live data.
- `--clear`: Deletes the local ontology file.
- `--crawl`: Concurrently crawls multiple public endpoints to gather data.
- `--fetch-retry`: Fetches data using retry logic with detailed logging per attempt and exponential backoff delays.
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
- `https://api/github.com`
- `https://jsonplaceholder.typicode.com/comments`
- `https://dummyjson.com/products`
- `https://randomuser.me/api/`
- `https://catfact.ninja/fact`
- `https://jsonplaceholder.typicode.com/todos`
- `https://api/chucknorris.io/jokes/random`
- `https://api/agify.io/?name=michael`
- `https://api/stackexchange.com/2.2/questions?order=desc&sort=activity`
- `https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json`
- `https://api/spacexdata.com/v4/launches/latest`
- `https://random-data-api.com/api/commerce/random_commerce`
- `https://jsonplaceholder.typicode.com/albums`
- `https://jsonplaceholder.typicode.com/users`
- `https://api/genderize.io`
- `https://api/nationalize.io`
- `https://api/covid19api.com/summary`
- `https://dog.ceo/api/breed/husky/images/random`
- `https://quotes.rest/qod`
- `https://type.fit/api/quotes`
- `https://api/exchangerate-api.com/v4/latest/USD`
- `https://api/spacexdata.com/v4/rockets`
- `https://api/quotable.io/random`

Note: Ensure that your network environment allows access to these endpoints for successful data retrieval.

## Change Log

**Version 0.0.39**

- Refocused ontology building on live public data sources; static fallback remains only for emergencies.
- Enhanced diagnostic logging with detailed error messages and retry context in live data integration functions.
- Pruned redundant legacy code to align with our mission.
- Extended ontology model wrappers and introduced new merging and refreshing functions.
- Enhanced XML export/import functions to support extended ontology models including concepts, classes, properties, and metadata.
- Refactored file system operations to use asynchronous, non-blocking APIs.
- **CLI Update:** The `--build` command now requires the `--allow-deprecated` flag to use the deprecated static fallback. Without the flag, a warning is issued. Use `--build-live` for live data integration.
- **Exponential Backoff:** Implemented exponential backoff delays for live data fetch retries with configurable parameters using `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` (with a safe fallback to 3 retries and 100ms delay if invalid).
- Updated documentation in this README to reflect recent changes and guidelines per CONTRIBUTING.md.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.

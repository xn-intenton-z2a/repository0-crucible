# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Overview

Key features include:

- **Live Data Integration:** Ontologies are built using up-to-date data from trusted public endpoints. Enhanced error handling and diagnostic logging now provide detailed information on each retry attempt during live data fetching, which now uses an exponential backoff strategy with a randomized jitter to further improve network resilience and mitigate thundering herd issues. Environment variables `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` are parsed using a standardized helper function that silently applies default values when not set, and logs a diagnostic warning (with appropriate units) only once per variable when a non-numeric value is explicitly provided.
- **Data Persistence:** Easily save, load, backup, clear, refresh, and merge ontologies as JSON files. (File system operations are now non-blocking using asynchronous APIs.)
- **Query & Validation:** Rapidly search for ontology concepts and validate your data. Note: The function `queryOntology` has been refactored to operate asynchronously for improved performance.
- **OWL Export/Import:** Convert ontologies to and from an extended OWL XML format that supports additional fields (concepts, classes, properties, metadata).
- **Concurrent Data Crawling:** Gather real-time data concurrently from a range of public endpoints. The crawl functionality has been enhanced to return results with separate arrays for successful responses and errors, simplifying downstream processing.
- **Diverse Ontology Models:** Build various models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, economic, and hybrid).
- **Enhanced Diagnostics:** View timestamped logs with detailed context for each operation, facilitating easier tracing and debugging.
- **Web Server Integration:** Launch a simple web server for quick status checks. **New:** The server now supports integration testing by exposing a function to start the server and gracefully shut it down after performing real HTTP requests.
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

- `--build --allow-deprecated`: Generates a deprecated fallback ontology using static data (**deprecated; use `--build-live` for live data integration**). **Note:** The `--allow-deprecated` flag is required with `--build` to invoke the legacy static fallback. Running `--build` without this flag will result in a warning.
- `--build-live`: Builds an ontology using live data and logs detailed diagnostic information for each retry attempt, including the exponential backoff delay with randomized jitter.
- `--persist`: Saves the current ontology to a JSON file.
- `--load`: Loads the saved ontology.
- `--query "term"`: Searches for matching ontology concepts. (This function is now asynchronous; use `await` if using directly in code.)
- `--export`: Exports the ontology as extended OWL XML.
- `--import`: Imports an ontology from extended OWL XML.
- `--backup`: Creates a backup of the ontology file.
- `--update "New Title"`: Updates the ontology title using live data.
- `--clear`: Deletes the local ontology file.
- `--crawl`: Concurrently crawls multiple public endpoints to gather data. The output is structured as an object with separate arrays for successful responses and errors.
- `--fetch-retry`: Fetches data using retry logic with detailed logging per attempt and exponential backoff delays with jitter.
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

## Robust Web Server Integration Test

A new integration test has been added that starts the web server, sends an actual HTTP request, verifies that the response status code is 200 and that the response body matches "owl-builder Web Server Running\n", and gracefully shuts down the server after testing.

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

_Note:_ Ensure that your network environment allows access to these endpoints for successful data retrieval.

## Change Log

**Version 0.0.39**

- Refocused ontology building on live public data sources; static fallback remains only for emergencies.
- Enhanced diagnostic logging with detailed error messages and retry context in live data integration functions.
- Pruned redundant legacy code to align with our mission.
- Extended ontology model wrappers and introduced new merging and refreshing functions.
- Enhanced XML export/import functions to support extended ontology models including concepts, classes, properties, and metadata.
- Refactored file system operations to use asynchronous, non-blocking APIs.
- **CLI Update:** The `--build` command now requires the `--allow-deprecated` flag to use the deprecated static fallback. Without the flag, a warning is issued. Use `--build-live` for live data integration.
- **Exponential Backoff with Jitter:** Improved environment variable parsing in the live data fetch function by standardizing the parsing of `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY`. Non-numeric values now trigger a diagnostic warning once per variable, while defaults are applied silently when not set.
- **Crawling Update:** Refactored crawlOntologies to return an object with separate arrays for successes and errors to simplify downstream processing.
- Added robust HTTP endpoint integration testing for the web server.
- **Asynchronous Query:** The `queryOntology` function has been refactored to use asynchronous file system methods for improved non-blocking performance.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.

# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Overview

Key features include:

- **Live Data Integration:** Ontologies are built using up-to-date data from trusted public endpoints. Enhanced error handling and diagnostic logging now provide detailed information on each retry attempt during live data fetching, which now uses an exponential backoff strategy with a randomized jitter to further improve network resilience and mitigate thundering herd issues. Environment variables `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` are parsed using a standardized helper function that applies default values when not set. **Non-numeric values (such as the explicit string "NaN", empty or whitespace-only strings) are considered invalid. In non-strict mode, the system falls back to default values and logs a diagnostic warning exactly once per unique erroneous input. In strict mode (enabled via `STRICT_ENV=true` or the CLI flag `--strict-env`), such misconfigurations will throw an error immediately. For testing purposes, the function `resetEnvWarningCache()` can be used to reset the logged warnings.**
- **Strict Environment Variable Parsing:** Developers can now enforce strict parsing of numeric environment variables. When strict mode is enabled either via the CLI flag `--strict-env` or by setting the environment variable `STRICT_ENV=true`, any non-numeric value (including "NaN") will cause an error to be thrown immediately, helping to catch misconfigurations early.
- **Custom Endpoints:** Users can override or extend the default list of public API endpoints by setting the environment variable `CUSTOM_API_ENDPOINTS` to a comma-separated list of endpoints. **Note:** Only endpoints starting with `http://` or `https://` are accepted. Invalid endpoints will be ignored with a diagnostic warning.
- **Data Persistence:** Easily save, load, backup, clear, refresh, and merge ontologies as JSON files. (File system operations are now non-blocking using asynchronous APIs.)
- **Query & Validation:** Rapidly search for ontology concepts and validate your data. Note: The function `queryOntology` has been refactored to operate asynchronously for improved performance.
- **OWL Export/Import:** Convert ontologies to and from an extended OWL XML format that supports additional fields (concepts, classes, properties, metadata).
- **Concurrent Data Crawling:** Gather real-time data concurrently from a range of public endpoints. The crawl functionality has been enhanced to return results with separate arrays for successful responses and errors, simplifying downstream processing.
- **Diverse Ontology Models:** Build various models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, economic, and hybrid).
- **Enhanced Diagnostics:** View timestamped logs with detailed context for each operation. You can control the verbosity of diagnostic messages by setting the environment variable `DIAGNOSTIC_LOG_LEVEL` (possible values: `off`, `error`, `warn`, `info`, `debug`). For example, setting `DIAGNOSTIC_LOG_LEVEL=off` will suppress diagnostic logs.
- **Web Server Integration:** Launch a simple web server for quick status checks. **New:** The server now supports integration testing by exposing a function to start the server and gracefully shut it down after performing real HTTP requests.
- **Custom Merging & Refreshing:** New functions provide extended merging and diagnostic capabilities.

### Environment Variable Parsing for Live Data Fetching

owl-builder uses the environment variables `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` to configure the retry logic during live data fetching. The behavior is as follows:

- **Valid Numeric Inputs:** Standard numbers (e.g., `3`, `50`) and scientific notation (e.g., `1e3` for 1000) are accepted and used in the retry mechanism.
- **Invalid or Non-Numeric Inputs:** If a non-numeric value (e.g., `NaN`, `abc`) or an empty value is provided, the function falls back to default values (`3` retries and `100ms` delay, respectively) and logs a diagnostic warning exactly once per unique erroneous input. Use `resetEnvWarningCache()` in tests to reset this warning cache if needed.
- **Strict Mode:** When strict mode is enabled (via `--strict-env` or `STRICT_ENV=true`), any non-numeric value will cause an error to be thrown, enforcing the correctness of configuration values.

Example:

```bash
export LIVEDATA_RETRY_COUNT=NaN      # In non-strict mode, defaults to 3 with a warning
export LIVEDATA_INITIAL_DELAY=abc      # In non-strict mode, defaults to 100ms with a warning

export STRICT_ENV=true                # Enabling strict mode
# Now the same settings would cause an error
```

### Custom API Endpoints

To provide custom API endpoints, set the `CUSTOM_API_ENDPOINTS` environment variable to a comma-separated list of URLs. **Only endpoints starting with `http://` or `https://` are accepted.** Invalid endpoints will be ignored with a diagnostic warning.

Example:

```bash
export CUSTOM_API_ENDPOINTS="https://example.com/api, https://another.example.com"
```

### Configurable Diagnostic Logging

Diagnostic messages can be controlled via the `DIAGNOSTIC_LOG_LEVEL` environment variable. The supported levels are:

- `off`: No diagnostic messages are logged.
- `error`: Only error level messages are logged.
- `warn`: Warning and error messages are logged.
- `info`: Info, warning, and error messages are logged.
- `debug`: All messages (debug, info, warn, error) are logged. (Default)

For example, to suppress all diagnostic logs, use:

```bash
export DIAGNOSTIC_LOG_LEVEL=off
```

## Installation

Ensure Node.js version 20 or later is installed. Then, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/owl-builder.git
cd owl-builder
npm install
```

## Usage

### Run Demo

Demonstrate core functionality using live data integration (unless disabled):

```bash
npm run start
```

### Disable Live Data Integration

To disable live data integration and use the static fallback, set the environment variable:

```bash
export DISABLE_LIVE_DATA=1
```

Or invoke the CLI with the flag:

```bash
node src/lib/main.js --disable-live
```

### Strict Environment Variable Parsing

To enforce strict parsing of numeric environment variables, either set the environment variable or use the CLI flag:

```bash
export STRICT_ENV=true
# or
node src/lib/main.js --strict-env
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
- `--strict-env`: Enables strict mode for environment variable parsing, causing non-numeric values to throw an error.
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
- ...

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
- **Exponential Backoff with Jitter:** Improved environment variable parsing in the live data fetch function by standardizing the parsing of `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY`. Non-numeric values, including explicit "NaN", now trigger a diagnostic warning once per unique value, while defaults are applied silently when not set. A new reset function (`resetEnvWarningCache`) is provided for testing purposes.
- **Strict Environment Variable Parsing:** Introduced strict parsing mode (via the CLI flag `--strict-env` or `STRICT_ENV=true`) to enforce numeric configuration values by throwing errors on invalid input.
- **Custom Endpoints:** Added support for custom public API endpoints via the `CUSTOM_API_ENDPOINTS` environment variable. Only endpoints starting with "http://" or "https://" are accepted and merged with the defaults. Invalid endpoints are ignored with a diagnostic warning.
- **Crawling Update:** Refactored crawlOntologies to return an object with separate arrays for successes and errors to simplify downstream processing.
- Added robust HTTP endpoint integration testing for the web server.
- **Asynchronous Query:** The `queryOntology` function has been refactored to use asynchronous file system methods for improved non-blocking performance.
- **Live Data Integration Disable:** New option to disable live data integration by setting the environment variable `DISABLE_LIVE_DATA` or using the CLI flag `--disable-live`. When enabled, owl-builder uses the static fallback instead of attempting live network requests.
- **Configurable Diagnostic Logging:** Diagnostic messages can now be controlled via the `DIAGNOSTIC_LOG_LEVEL` environment variable. This feature allows users and automated systems to suppress or enable diagnostic logs based on the desired verbosity.
- **Automated Tests:** Added comprehensive tests for environment variable parsing (including handling of "NaN") and configurable diagnostic logging to ensure correct functionality.
- Updated documentation to clarify the behavior when non-numeric values are provided for environment variables, including explicit "NaN", and to explain the usage of strict mode and the resetEnvWarningCache function.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.

# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Overview

Key features include:

- **Live Data Integration:** Ontologies are built using up-to-date data from trusted public endpoints. Enhanced error handling and diagnostic logging now provide detailed information on each retry attempt during live data fetching, which now uses an exponential backoff strategy with a randomized jitter to further improve network resilience and mitigate thundering herd issues. Environment variables `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` are parsed using a standardized helper function that applies default values when not set. **Valid inputs include standard numeric values (e.g., `3`, `50`) and scientific notation (e.g., `1e3` for 1000).**
  
  - **Non-Numeric Values Handling:** If a non-numeric value (such as `NaN`, `abc`, empty or whitespace-only strings) is provided in non-strict mode, a one-time warning is logged (per normalized input) and the system falls back to default values (`3` retries and `100ms` delay) or a provided configurable fallback.
  - **Strict Mode:** When strict mode is enabled (via `--strict-env` or `export STRICT_ENV=true`), the environment variable is validated against a strict numeric format (accepting integers, decimals, and scientific notation). Any value that does not match this format (including variants like `NaN` with extra whitespace or other non-numeric strings) will trigger an immediate error.
  - **CLI Override of Fallbacks:** New CLI options `--livedata-retry-default <number>` and `--livedata-delay-default <number>` allow you to override the default fallback values for `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` respectively, without modifying environment variables directly.

- **Custom Endpoints:** Users can override or extend the default list of public API endpoints by setting the environment variable `CUSTOM_API_ENDPOINTS` to a comma-separated list of URLs. **Only endpoints starting with "http://" or "https://" are accepted.** Invalid endpoints are ignored with a diagnostic warning.

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

- **Valid Numeric Inputs:** Accepts standard numeric values and scientific notation. For example, `export LIVEDATA_RETRY_COUNT=3` or `export LIVEDATA_INITIAL_DELAY=1e2`.
- **Invalid or Non-Numeric Inputs:** If a non-numeric value (e.g., `NaN`, `abc`, or empty values) is provided in non-strict mode, a one-time warning is logged (per normalized value) and the system falls back to default values (`3` retries and `100ms` delay) or a provided configurable fallback.
- **Strict Mode:** When strict mode is enabled (via `--strict-env` or `export STRICT_ENV=true`), the provided environment variable must match a strict numeric format (integer, decimal, or scientific notation). Any deviation, including any form of "NaN" after trimming whitespace, will cause an immediate error.
- **CLI Override of Fallbacks:** Additionally, you can use the CLI options `--livedata-retry-default` and `--livedata-delay-default` to dynamically override the fallback values for live data fetching.

Example:

```bash
export LIVEDATA_RETRY_COUNT=NaN      # In non-strict mode, defaults to 3 (or CLI override if provided) with a warning
export LIVEDATA_INITIAL_DELAY=abc     # In non-strict mode, defaults to 100ms (or CLI override if provided) with a warning

# Using CLI overrides:
node src/lib/main.js --livedata-retry-default 5 --livedata-delay-default 250
```

### Custom API Endpoints

To provide custom API endpoints, set the `CUSTOM_API_ENDPOINTS` environment variable to a comma-separated list of URLs. **Only endpoints starting with "http://" or "https://" are accepted.** Invalid endpoints will be ignored with a diagnostic warning.

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

### Override Fallback Values via CLI

You can override the default fallback values for live data fetching without modifying your environment variables directly using the CLI options:

```bash
node src/lib/main.js --livedata-retry-default 5 --livedata-delay-default 250
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
- **Exponential Backoff with Jitter:** Improved environment variable parsing in the live data fetch function by standardizing the parsing of `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY`. Non-numeric values, including explicit "NaN" (with any extra whitespace), now trigger a diagnostic warning once per normalized value, while defaults are applied silently when not set. 
- **Strict Environment Variable Parsing:** Enforced strict parsing mode (via the CLI flag `--strict-env` or `export STRICT_ENV=true`) using regex validation to immediately throw errors on invalid numeric configuration values, ensuring that no non-numeric representation (including any variant of "NaN") is accepted.
- **Configurable Fallback Values:** Added support for configurable fallback values in environment variable parsing. Additionally, new CLI options `--livedata-retry-default` and `--livedata-delay-default` allow users to override these fallback values at runtime without modifying environment variables.
- **Custom Endpoints:** Added support for custom public API endpoints via the `CUSTOM_API_ENDPOINTS` environment variable. Only endpoints starting with "http://" or "https://" are accepted and merged with the defaults. Invalid endpoints are ignored with a diagnostic warning.
- **Crawling Update:** Refactored crawlOntologies to return an object with separate arrays for successes and errors to simplify downstream processing.
- Added robust HTTP endpoint integration testing for the web server.
- **Asynchronous Query:** The `queryOntology` function has been refactored to use asynchronous file system methods for improved non-blocking performance.
- **Live Data Integration Disable:** New option to disable live data integration by setting the environment variable `DISABLE_LIVE_DATA` or using the CLI flag `--disable-live`. When enabled, owl-builder uses the static fallback instead of attempting live network requests.
- **Configurable Diagnostic Logging:** Diagnostic messages can now be controlled via the `DIAGNOSTIC_LOG_LEVEL` environment variable. This feature allows users and automated systems to suppress or enable diagnostic logs based on the desired verbosity.
- **Warning Cache Normalization:** The warning cache for non-numeric environment variables now uses a normalized value (trimmed and lower-cased) to avoid duplicate warnings for semantically equivalent inputs.
- **Automated Tests:** Added comprehensive tests for environment variable parsing (including handling of variants of "NaN" with whitespace and tab characters) and CLI fallback options to ensure strict mode behaves as expected.
- Updated documentation to clarify the behavior when non-numeric values are provided for environment variables, and to explain the usage of strict mode, configurable fallback values, and the new CLI override options.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.

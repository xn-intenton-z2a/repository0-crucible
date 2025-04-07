# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Overview

Key features include:

- **Live Data Integration:** Ontologies are built using up-to-date data from trusted public endpoints. Enhanced error handling and diagnostic logging now provide detailed information on each retry attempt during live data fetching, which uses an exponential backoff strategy with randomized jitter to improve network resilience and mitigate thundering herd issues. Environment variables `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` are parsed using a consolidated helper function that applies default values when not set, empty, or when invalid non-numeric values (e.g., `NaN`, empty strings, or whitespace-only) are provided. Notably, if an environment variable is not a string (e.g., null or undefined), it is silently handled without logging unnecessary warnings.
  - **Invalid Non-Numeric Values Handling:** In non-strict mode, if an invalid input is provided, a unified diagnostic warning is logged exactly once per unique composite key (combining variable name and normalized input) indicating that the received non-numeric input (including its normalized form) is invalid and that a fallback value (with unit) is being applied. Duplicate warnings for equivalent normalized inputs are suppressed.
  - **Strict Mode:** When strict mode is enabled (via `--strict-env` or by setting `STRICT_ENV=true`), only valid numeric inputs are accepted. Invalid inputs will cause an immediate error with guidance on providing a numeric value in integer, decimal, or scientific notation.
  - **CLI Overrides with Precedence:** New CLI options `--livedata-retry-default` and `--livedata-delay-default` allow you to override fallback values at runtime. CLI override values now take precedence over any configurable fallback and the default value, ensuring consistent behavior even when environment inputs are non-numeric.
  - **Global Warning Suppression:** You can disable all environment variable warning logs by setting the environment variable `DISABLE_ENV_WARNINGS` (set to any value other than "0").

- **Custom Endpoints:** Users can override or extend the default list of public API endpoints by setting the environment variable `CUSTOM_API_ENDPOINTS` to a comma-separated list of URLs. **Only endpoints starting with "http://" or "https://" are accepted.** Invalid endpoints will be ignored with a diagnostic warning.

- **Data Persistence:** Easily save, load, backup, clear, refresh, and merge ontologies as JSON files. (File system operations are now non-blocking using asynchronous APIs.)

- **Query & Validation:** Rapidly search for ontology concepts and validate your data. Note: The function `queryOntology` has been refactored to operate asynchronously for improved performance.

- **OWL Export/Import:** Convert ontologies to and from an extended OWL XML format that supports additional fields (concepts, classes, properties, metadata).

- **Concurrent Data Crawling:** Gather real-time data concurrently from a range of public endpoints. The crawl functionality has been enhanced to return results with separate arrays for successful responses and errors, simplifying downstream processing.

- **Diverse Ontology Models:** Build various models (basic, advanced, intermediate, enhanced, minimal, complex, scientific, educational, philosophical, economic, and hybrid).

- **Enhanced Diagnostics:** View timestamped logs with detailed context for each operation. Diagnostic messages now include details on fallback values and their units, clearly indicating non-strict mode usage when applicable. You can control the verbosity of diagnostic messages by setting the environment variable `DIAGNOSTIC_LOG_LEVEL` (possible values: `off`, `error`, `warn`, `info`, `debug`). For example, setting `DIAGNOSTIC_LOG_LEVEL=off` will suppress diagnostic logs.

- **Web Server Integration:** Launch a simple web server for quick status checks. **New:** The server now supports integration testing by exposing a function to start and gracefully shut it down after performing actual HTTP requests.

- **Custom Merging & Refreshing:** New functions provide extended merging and diagnostic capabilities.

### Enhanced Unit Test Coverage for Environment Variable Parsing

Recent updates include expanded unit tests to ensure robust handling of non-numeric environment variable inputs. Additional tests have been added to cover diverse whitespace variants (including spaces, tabs, and non-breaking spaces) ensuring that different raw inputs that normalize to the same value trigger only one diagnostic warning. CLI override functionality is also verified to take precedence in all such scenarios.

### Unified NaN Handling

This release has unified the handling of "NaN" and similar non-numeric inputs. All variations now trigger a single diagnostic warning exactly once per unique normalized non-numeric input, providing clear and consistent feedback along with the fallback values (and respective units). CLI override values always supersede non-numeric environment variable values.

### Automated Tests

Comprehensive tests now cover fallback behavior, strict mode, CLI override functionality, and suppression of warnings. All tests run automatically in the CI environment using Vitest.

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

Override the default fallback values for live data fetching without modifying your environment variables:

```bash
node src/lib/main.js --livedata-retry-default 5 --livedata-delay-default 250
```

### CLI Help

Display a list of available commands and usage instructions:

```bash
node src/lib/main.js --help
```

### Key CLI Commands

- `--build --allow-deprecated`: Generates a deprecated fallback ontology using static data (**deprecated; use `--build-live` for live data integration**). **Note:** The `--allow-deprecated` flag is required with `--build`.
- `--build-live`: Builds an ontology using live data and logs detailed diagnostic information for each retry attempt, including exponential backoff delay with jitter.
- `--persist`: Saves the current ontology to a JSON file.
- `--load`: Loads the saved ontology.
- `--query "term"`: Searches for matching ontology concepts. (Async function; use `await` when calling directly.)
- `--export`: Exports the ontology as extended OWL XML.
- `--import`: Imports an ontology from extended OWL XML.
- `--backup`: Creates a backup of the ontology file.
- `--update "New Title"`: Updates the ontology title using live data.
- `--clear`: Deletes the local ontology file.
- `--crawl`: Concurrently crawls multiple public endpoints to gather data. Returns separated arrays for successes and errors.
- `--fetch-retry`: Fetches data using retry logic with detailed logging of each attempt including jittered exponential backoff.
- `--merge-ontologies`: Merges static and live ontology models.
- `--build-live-log`: Builds a live ontology with additional diagnostic logging.
- `--serve`: Launches the integrated web server.
- `--diagnostics`: Runs a diagnostic crawl of public endpoints.
- `--refresh`: Clears the existing ontology, rebuilds it using live data, and persists the refreshed ontology.
- `--merge-persist`: Merges static and live ontologies and saves the result.
- `--strict-env`: Enables strict mode for environment variable parsing, causing invalid inputs to throw errors.
- `--build-hybrid`: Combines live data with custom static data to produce a hybrid ontology.
- `--diagnostic-summary`: Provides a concise summary of diagnostic information (timestamp and version).
- `--custom-merge`: Merges provided ontologies and appends the current timestamp.
- `--backup-refresh`: Creates a backup and refreshes the ontology.

## Robust Web Server Integration Test

A new integration test starts the web server, sends an actual HTTP request, verifies that the response status is 200 and that the response body is "owl-builder Web Server Running\n", and gracefully shuts down the server after the test.

## Endpoints and Testing

owl-builder uses a broad list of public endpoints to build ontologies, such as:

- `https://api.publicapis.org/entries`
- `https://dog.ceo/api/breeds/image/random`
- `https://jsonplaceholder.typicode.com/posts`
- `https://api.coindesk.com/v1/bpi/currentprice.json`
- ...

_Note:_ Ensure that your network allows access to these endpoints for successful data retrieval.

## Change Log

**Version 0.0.39**

- Refocused ontology building on live public data sources; static fallback remains only for emergencies.
- Enhanced diagnostic logging with detailed error messages and retry context in live data integration functions.
- Pruned redundant legacy code to align with our mission.
- Extended ontology model wrappers and introduced new merging and refreshing functions.
- Enhanced XML export/import functions to support extended ontology models including concepts, classes, properties, and metadata.
- Refactored file system operations to use asynchronous, non-blocking APIs.
- **CLI Update:** The `--build` command now requires the `--allow-deprecated` flag for using the deprecated static fallback. Use `--build-live` for live data integration.
- **Exponential Backoff with Jitter:** Improved handling of environment variables by consolidating parsing of `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY`. Non-numeric inputs now trigger a unified diagnostic warning exactly once per unique normalized non-numeric input, displaying the variable name, raw input, normalized input, and fallback value with unit. CLI override values now take precedence over other fallback mechanisms.
- **Strict Environment Variable Parsing:** When strict mode is enabled (via `--strict-env` or `export STRICT_ENV=true`), only valid numeric inputs are accepted. Invalid inputs will cause an immediate error with guidance on allowed formats (integer, decimal, or scientific notation).
- **CLI Overrides:** New CLI options `--livedata-retry-default` and `--livedata-delay-default` allow runtime override of fallback values without changing environment variables.
- **Custom Endpoints:** Supports custom API endpoints via `CUSTOM_API_ENDPOINTS`. Only valid endpoints (beginning with "http://" or "https://") are accepted.
- **Unified NaN Handling:** Environment variable parsing now uniformly handles non-numeric values (including "NaN" with various whitespace variants), logging a unified warning exactly once per unique normalized non-numeric input, ensuring consistent fallback behavior.
- **Enhanced Test Coverage:** Expanded tests now verify that different raw whitespace variants that normalize to the same value trigger only one warning, ensuring consistent fallback behavior.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.

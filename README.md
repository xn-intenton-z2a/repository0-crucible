# owl-builder

owl-builder is a CLI tool and JavaScript library for building dynamic OWL ontologies from live, verified public data sources. In this release, live data integration is the default for building, updating, querying, and persisting ontologies, while the legacy static fallback remains for emergency use only.

## Overview

Key features include:

- **Live Data Integration:** Ontologies are built using up-to-date data from trusted public endpoints. Enhanced error handling and diagnostic logging now provide detailed information on each retry attempt during live data fetching, which uses an exponential backoff strategy with randomized jitter to improve network resilience and mitigate thundering herd issues. Environment variables `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY` are parsed using a consolidated helper function that applies default values when not set, empty, or when invalid non-numeric values (e.g., `NaN`, empty strings, or whitespace-only) are provided.
  - **Invalid Non-Numeric Values Handling:** In non-strict mode, if an invalid input is provided, a unified diagnostic warning is logged exactly once per unique composite key (combining variable name and normalized input) indicating that the received non-numeric input (including its normalized form) is invalid and that a fallback value (with unit) is being applied. In addition, a structured telemetry event is emitted in JSON format with the following details:
    - Environment variable name
    - Raw input provided
    - Normalized input
    - Fallback value applied (and associated unit)
    - Precise timestamp
    This structured telemetry ensures consistent monitoring and analytics without duplicate events for identical normalized inputs.
  - **Strict Mode:** When strict mode is enabled (via `--strict-env` or by setting `STRICT_ENV=true`), only valid numeric inputs are accepted. If a non-numeric input is encountered, an error is thrown with clear guidance on acceptable formats, such as:
    - Integer (e.g., 42)
    - Decimal (e.g., 3.14)
    - Scientific notation (e.g., 1e3)
  - **CLI Overrides with Precedence:** New CLI options `--livedata-retry-default` and `--livedata-delay-default` allow you to override fallback values at runtime. These CLI values take precedence over environment variable values and defaults.
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

### Environment Variable Handling and Fallback Mechanism

owl-builder uses a unified approach to parse and handle environment variables. The key details are:

1. **Normalization:**
   - Input values are trimmed and all sequences of whitespace—including spaces, tabs, non-breaking spaces, em space, en space, and other Unicode whitespace characters—are replaced by a single space, and the value is converted to lowercase. This ensures that different raw inputs (e.g., " NaN ", "NaN", "\u00A0NaN\u00A0") normalize to the same value.

2. **Unified Warning and Telemetry Mechanism:**
   - In non-strict mode, if a normalized input is found to be invalid (empty or "nan"), a warning is logged exactly once for each unique normalized input, along with the fallback value and its unit (e.g., retries or delay). Simultaneously, a structured telemetry event in JSON format is emitted containing the environment variable, raw and normalized inputs, the fallback value (and its unit), and a timestamp. Duplicate telemetry events for equivalent normalized inputs are suppressed.

3. **CLI Override Precedence:**
   - CLI options `--livedata-retry-default` and `--livedata-delay-default` override both the environment variables and default values if provided with valid numeric inputs.

4. **Strict Mode:**
   - When strict mode is enabled (`--strict-env` or `export STRICT_ENV=true`), any environment variable that does not strictly conform to a valid numeric format (integer, decimal, or scientific notation) will cause an error, providing clear guidance on acceptable formats.

#### Example Usage:

```bash
# Non-strict mode (fallback applied with unified warning and telemetry event)
export LIVEDATA_RETRY_COUNT=" NaN "
node src/lib/main.js --build-live

# Strict mode (will throw an error for non-numeric input)
export STRICT_ENV=true
export LIVEDATA_INITIAL_DELAY="invalid"
node src/lib/main.js --build-live

# Using CLI overrides
node src/lib/main.js --livedata-retry-default 5 --livedata-delay-default 250 --build-live
```

### Automated Tests

Comprehensive tests verify the behavior of the environment variable handling, including different whitespace variants that normalize to "nan", unified warning logging, structured telemetry event emission, and CLI override functionality. Run tests using:

```bash
npm test
```

### CLI Help

Display the list of commands and usage instructions:

```bash
node src/lib/main.js --help
```

### Key CLI Commands

- `--build --allow-deprecated`: Generates a deprecated fallback ontology using static data (**deprecated; use `--build-live` for live data integration**).
- `--build-live`: Builds an ontology using live data and logs detailed diagnostic information for each retry attempt, with robust normalization of environment variable inputs and structured telemetry events for fallback occurrences.
- `--persist`: Saves the current ontology to a JSON file.
- `--load`: Loads the saved ontology.
- `--query "term"`: Searches for matching ontology concepts.
- `--export`: Exports the ontology as extended OWL XML.
- `--import`: Imports an ontology from extended OWL XML.
- `--backup`: Creates a backup of the ontology file.
- `--update "New Title"`: Updates the ontology title using live data.
- `--clear`: Deletes the local ontology file.
- `--crawl`: Concurrently crawls multiple public endpoints to gather data.
- `--fetch-retry`: Fetches data using retry logic with detailed logging.
- `--merge-ontologies`: Merges static and live ontology models.
- `--build-live-log`: Builds a live ontology with additional diagnostic logging.
- `--serve`: Launches the integrated web server.
- `--diagnostics`: Runs a diagnostic crawl of public endpoints.
- `--refresh`: Clears the existing ontology, rebuilds it using live data, and persists the refreshed ontology.
- `--merge-persist`: Merges static and live ontologies and saves the result.
- `--strict-env`: Enables strict mode for environment variable parsing.
- `--build-hybrid`: Combines live data with custom static data to produce a hybrid ontology.
- `--diagnostic-summary`: Provides a concise summary of diagnostic information.
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
- **Exponential Backoff with Jitter:** Improved handling of environment variables by consolidating parsing of `LIVEDATA_RETRY_COUNT` and `LIVEDATA_INITIAL_DELAY`. Non-numeric inputs now trigger a unified diagnostic warning and a structured telemetry event exactly once per unique normalized non-numeric input, displaying the variable name, raw input, normalized input, and fallback value with unit. CLI override values now take precedence.
- **Strict Environment Variable Parsing:** When strict mode is enabled (via `--strict-env` or `export STRICT_ENV=true`), only valid numeric inputs are accepted. Invalid inputs will cause an immediate error with guidance on allowed formats.
- **CLI Overrides:** New CLI options `--livedata-retry-default` and `--livedata-delay-default` allow runtime override of fallback values without changing environment variables.
- **Custom Endpoints:** Supports custom API endpoints via `CUSTOM_API_ENDPOINTS`. Only valid endpoints (beginning with "http://" or "https://") are accepted.
- **Unified NaN Handling and Structured Telemetry:** Environment variable parsing now emits a structured JSON telemetry log for each fallback occurrence due to invalid numeric input, ensuring consistent monitoring and preventing duplicate logs for equivalent normalized inputs.
- **Enhanced Test Coverage:** Expanded tests now verify that different raw whitespace variants that normalize to the same value trigger only one diagnostic warning and one telemetry event, ensuring consistent fallback behavior.

## Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, testing requirements, and workflow guidelines.

## License

Released under the MIT License.

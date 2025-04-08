# CUSTOM_ENDPOINTS

This feature enables users to extend and override the default list of public API endpoints through a unified configuration mechanism. Users can specify custom endpoints via the `CUSTOM_API_ENDPOINTS` environment variable, allowing for targeted data retrieval from additional verified data sources.

# Overview

- **Custom API Endpoints:** Enables users to supply a comma-separated list of URLs that extend or override the default endpoints used to build ontologies.
- **Validation & Deduplication:** Ensures that only endpoints starting with `http://` or `https://` are accepted. Invalid entries are logged once using the diagnostic logging system and omitted from the final list. Duplicate URLs are automatically removed.
- **Integration with Live Data:** The merged endpoint list will be used by crawling and live data fetching functions, ensuring that user-defined endpoints benefit from existing retry logic and diagnostic logging.

# Implementation Details

- **Environment Variable Parsing:** Enhance the current environment configuration to parse the `CUSTOM_API_ENDPOINTS` variable, splitting the input string on commas and trimming each value.
- **Input Validation:** Check that each endpoint string starts with either `http://` or `https://`. Log a standardized warning (using the one-time logging behavior) for any endpoint that fails validation, as specified in the ENV_CONFIG feature.
- **Deduplication:** Merge the user-supplied endpoints with the default list and remove duplicates to create a unified list of active endpoints.
- **CLI and Diagnostic Integration:** Update diagnostic reports and CLI outputs (for example via the `--crawl` command) to reflect the custom endpoints in use.

# Testing

- **Unit Tests:** Create and extend tests to simulate various inputs for `CUSTOM_API_ENDPOINTS` including valid endpoints, invalid entries (wrong protocol, empty or whitespace-only values), and duplicates. Verify that the final endpoint list is accurate and that invalid endpoints trigger a one-time warning.
- **Integration Tests:** Ensure that when custom endpoints are provided, the live data crawling and health checks use the merged endpoint list. Verify that the diagnostic logs capture rejected endpoints correctly.

This feature complements the live data integration mission by allowing users to customize and verify data sources in line with the goal of building dynamic, live ontologies from trusted public data.
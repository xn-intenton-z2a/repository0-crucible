# Data Crawler

This feature introduces a dedicated module for concurrently crawling multiple public data endpoints. It aggregates live data for ontology construction and diagnostic purposes. The data crawler leverages the existing retry logic with exponential backoff and integrates with the diagnostic logging system.

## Overview

- **Concurrent Crawling:** Executes parallel HTTP requests to a diverse list of public endpoints to collect raw ontology data.
- **Robust Retry & Backoff:** Uses configurable retry counts and delays, with incorporated jitter, to handle network errors and unstable endpoints.
- **Diagnostic Integration:** Captures and logs detailed diagnostics and telemetry for each crawling attempt, including aggregated error and success summaries.
- **Aggregated Reporting:** Collates the raw data responses and error messages into a consolidated report, making it easier for users to understand the live data landscape and troubleshoot issues.

## Implementation Details

- Extract the existing crawlOntologies logic from the core library and encapsulate it into a distinct module or library function.
- Leverage asynchronous processing (e.g., Promises, async/await) to concurrently fetch data from multiple endpoints.
- Integrate with the unified diagnostic logging system to ensure each attempt is logged with timestamp and retry details.
- Provide a CLI flag (e.g., `--crawl-data`) that triggers this functionality and displays a summarized report of successes and failures.
- Ensure the feature respects configurable environment variables for retry count (LIVEDATA_RETRY_COUNT) and delay (LIVEDATA_INITIAL_DELAY) with appropriate fallbacks and diagnostics for non-numeric inputs.

## Benefits

- **Enhanced Visibility:** Offers users a comprehensive real-time view of available live data across multiple public endpoints.
- **Improved Reliability:** The robust retry mechanism ensures intermittent network issues are handled gracefully.
- **Ease of Integration:** Aggregated reports from the crawler can be fed into the ontology service modules, improving data freshness and quality.
- **Streamlined Diagnostics:** Integrated telemetry and diagnostic logging help pinpoint problematic endpoints quickly.

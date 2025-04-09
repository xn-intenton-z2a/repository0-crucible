# Ontology Service

This feature consolidates the Ontology API and Ontology Engine into a single, cohesive service that manages all ontology operations. It exposes a unified interface for both CLI commands and RESTful HTTP endpoints, and it integrates robust live data building with enhanced diagnostic and telemetry capabilities.

## Overview

- **Unified Management:** Merges legacy ontology APIs with new live data integration functions. Users can trigger operations via CLI or HTTP, using secure endpoints backed by an authentication layer.
- **Live Data Integration & Fallback:** Leverages live, verified public endpoints for dynamic ontology building while retaining a static fallback for emergencies.
- **Authentication & Security:** Enforces secure access for data-modifying operations through API keys or token-based authentication (configurable via environment variables). Unauthorized actions trigger appropriate error responses and detailed diagnostic logs.
- **Enhanced Diagnostics & Telemetry:** Integrates an advanced diagnostics system that logs every operation (including authentication events) with timestamps and retry details. It also provides aggregated telemetry for environment variable parsing issues, including asynchronous batching of non-numeric inputs, and exposes a CLI flag (`--diagnostic-summary-naN`) for instant review.
- **Standardized Environment Variable Parsing:** Uses inline normalization and robust error handling for environment variables, ensuring that even non-standard whitespace or non-numeric inputs are processed consistently. In strict mode, errors are thrown immediately, while in non-strict mode a fallback is used with detailed telemetry.

## Implementation Details

- **Endpoint Consolidation:**
  - Unified HTTP endpoints (GET, POST, DELETE) cover all ontology operations, while CLI commands internally use the same logic.
  - The service manages data persistence, refresh, merge, and backup operations on OWL ontologies.

- **Authentication & Logging:**
  - Checks for environment variables (API_KEY or JWT secret) and enforces security on data-changing requests. Unauthorized requests trigger a `401 Unauthorized` response along with diagnostic logging of the failed attempt.
  - All API events, including environment variable parsing warnings and aggregated telemetry events, are logged in real-time.

- **Enhanced Diagnostics & Telemetry Integration:**
  - The diagnostics subsystem logs each retry attempt and network error with details including exponential backoff delays and jitter. It also captures environment variable parsing issues (e.g., non-numeric inputs) with aggregated summaries accessible via the CLI.
  - Functions such as `getAggregatedNaNSummary` compile the telemetry data and provide a snapshot of parsing issues, aiding developers in diagnosing configuration problems.

- **Configuration and Flexibility:**
  - Users can configure authentication modes, adjust CLI override precedence via environment variables, and activate strict mode for environment variable parsing using the `--strict-env` flag.

## Benefits

- **Streamlined Codebase:** Consolidates ontology operations, reducing code duplication and simplifying maintenance.
- **Enhanced Security & Reliability:** The added authentication layer and detailed diagnostics ensure robust operation in production environments.
- **Improved Troubleshooting:** Aggregated telemetry for environment variables and real-time diagnostic logging allow users to quickly identify and resolve configuration issues.
- **Unified User Experience:** Offers a consistent interface for both CLI and HTTP interactions, making ontology management more accessible and secure.


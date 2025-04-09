# Ontology Service

This feature consolidates the Ontology API and Ontology Engine into a single, cohesive service that manages all ontology operations through both CLI commands and RESTful HTTP endpoints. It integrates robust live data integration, secure data operations, and advanced diagnostic and telemetry logging. In this update, the feature has been enhanced with a Telemetry Export module that allows users to export aggregated diagnostic telemetry into a JSON file for offline analysis and auditing.

## Overview

- **Unified Management:** Merges legacy ontology APIs with new live data integration functions. Users can trigger operations via CLI or HTTP, using secure endpoints backed by an authentication layer.
- **Live Data Integration & Fallback:** Leverages live, verified public endpoints for dynamic ontology building while retaining a static fallback for emergencies.
- **Authentication & Security:** Enforces secure access for data-modifying operations through API keys or token-based mechanisms. Unauthorized actions trigger appropriate error responses and detailed diagnostic logs.
- **Enhanced Diagnostics & Telemetry:** Captures detailed logs for every operation including network retries, environment variable parsing issues (with aggregated NaN telemetry), and asynchronous batching of diagnostic events. A dedicated CLI flag allows on-demand review of diagnostic summaries.
- **Standardized Environment Variable Parsing:** Uses inline normalization with robust error handling to process environment variables, including special handling for non-numeric inputs. In strict mode, errors are thrown immediately; in non-strict mode, fallbacks with detailed telemetry are used.

## Telemetry Export

- **Purpose:** Provides a mechanism to export the aggregated telemetry logs (e.g., NaN fallback events from environment variable parsing) into a JSON file. This allows developers and operators to persist and analyze configuration warnings over time.
- **Implementation Details:**
  - Introduce a new CLI flag (e.g., `--export-telemetry`) that triggers the export process.
  - Leverage the existing function `getAggregatedNaNSummary()` to retrieve aggregated telemetry data.
  - Write the JSON output to a file (for instance, `telemetry.json`) in the current working directory.
  - Ensure that the export operation includes context such as the count, raw input value, CLI override status, and timestamp of occurrence for each unique invalid input.

## Implementation Details

- **Endpoint Consolidation:** 
  - Provide unified HTTP endpoints (GET, POST, DELETE) for all ontology operations. CLI commands internally use the same logic.
  - Manage data persistence, refresh, merge, and backup for OWL ontologies.

- **Security & Logging:**
  - Validate critical environment variables (e.g., API keys, JWT secrets) and enforce secure access.
  - Log all operations, including environment variable parsing warnings, with timestamps and retry details.
  - Include detailed telemetry for invalid inputs that trigger fallbacks.

- **Diagnostic Integration:**
  - Aggregate and expose telemetry for environment variable issues using asynchronous batching. 
  - Provide functions like `getAggregatedNaNSummary()` to view the aggregated data on-demand via CLI flags.
  - **New:** Integrate Telemetry Export which writes the aggregated telemetry data to a JSON file when invoked.

## Benefits

- **Unified User Experience:** Offers a consistent interface for both CLI and HTTP interactions, ensuring seamless ontology management.
- **Improved Troubleshooting:** Aggregated telemetry and detailed diagnostic logs help quickly pinpoint and resolve configuration or network issues.
- **Persistent Diagnostics:** The Telemetry Export capability provides a persistent record of configuration anomalies, supporting audit and post-mortem analysis.
- **Enhanced Security & Reliability:** Robust authentication and real-time diagnostics ensure a dependable production environment.

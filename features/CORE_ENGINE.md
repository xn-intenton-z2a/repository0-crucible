# CORE_ENGINE: Unified Live Data, Scheduling, Diagnostics, Telemetry, RDF Export & Live Data Cache Engine

## Overview
This feature integrates live data ingestion, anomaly detection, automated rollback, diagnostic logging, scheduled maintenance, CLI commands, RDF export functionality, and now an enhanced in-memory caching mechanism for live data fetches. It serves as the central engine powering owl-builder's dynamic ontology building and management.

## Live Data Integration & Anomaly Detection
- Continues to ingest live data from verified public endpoints, validating against expected schemas.
- Anomalies in the data (e.g., missing or empty 'entries') trigger detailed diagnostic logging and prompt an automated rollback procedure to the last known good backup.
- Real-time notifications are broadcast via WebSocket with update details including the ontology title, version, timestamp, and status messages.

## Diagnostic Logging & Telemetry
- Aggregates environment variable warnings, including non-numeric inputs, and debounces rapid successive logs for clarity.
- Exports detailed telemetry via CLI, supporting both JSON and CSV formats with aggregated diagnostics on NaN inputs.

## Scheduled Maintenance & CLI Commands
- Manages scheduled tasks for ontology refresh, backup, and merge operations, all configurable via environment variables and CLI flags.
- Ensures that operations such as refreshing and merging live data are seamlessly integrated with the web server and interactive CLI (CLI_MENU). 

## RDF Export Functionality
- Provides functions to convert the current ontology from JSON into standardized RDF/Turtle or RDF/XML formats.
- Integrates with existing CLI commands (e.g., '--export-rdf') to facilitate semantic interoperability with the broader semantic web ecosystem.

## Live Data Caching
- Implements an in-memory caching layer for live data fetches to reduce redundant network calls and improve performance.
- Cache duration (TTL) is configurable via the LIVE_DATA_CACHE_TTL environment variable, with a default of 60000 ms.
- Incorporates cache invalidation logic to ensure that stale data is purged and new requests trigger a fresh network call.

## Migration and Integration Notes
- All existing functionalities (live data integration, anomaly detection, rollback, telemetry export, RDF export) remain fully operational.
- Documentation and CLI usage examples will be updated to include details on the enhanced caching mechanism and its configuration.
- This update consolidates multiple essential operations under a single unified feature, streamlining the codebase in alignment with the mission of owl-builder.

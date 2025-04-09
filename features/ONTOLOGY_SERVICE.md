# Ontology Service

This feature consolidates all ontology management functionalities into a single, cohesive service that now includes enhanced authentication and security alongside live data integration, detailed diagnostics, and real-time notifications. The goal is to deliver a robust, secure, and user-friendly platform for building, updating, and managing OWL ontologies.

## Overview

- **Unified Management:** Combines legacy and live data ontology building with CLI commands and RESTful HTTP endpoints for operations such as build, update, refresh, backup, query, and import/export of ontologies.
- **Live Data Integration & Fallback:** Builds ontologies from live verified public endpoints while retaining a static fallback for emergencies, configurable via environment variables.
- **Real-Time Notifications:** Supports outbound WebSocket notifications (and SSE if needed) to instantly broadcast critical ontology operations (refresh, merge, update).

## HTTP Endpoints & Diagnostics

- **Core Endpoints:** Provides endpoints to persist, load, query, backup, and clear ontology data. A dedicated `/telemetry` endpoint exposes aggregated diagnostic and telemetry data, including environment variable parsing warnings.
- **Diagnostic & Telemetry Logging:** Implements detailed diagnostic logging with asynchronous batching for environment variable parsing anomalies. Aggregated telemetry data (NaN fallback events) can be accessed via the CLI flag `--diagnostic-summary-naN` as well as the `/telemetry` endpoint.

## Authentication & Security Enhancements

- **API Key Authentication:** New security middleware enforces API key verification on data-modifying HTTP endpoints. Clients must include a valid API key (e.g., in the `x-api-key` header or via CLI override) to invoke operations such as ontology update, refresh, and merge.
- **Error Handling & Logging:** Unauthorized requests are immediately rejected and logged as security warnings. This mechanism ensures that only authenticated users can perform sensitive changes.

## Implementation Details

- **Single Repository, Single Source File:** All functions, including live data fetching with exponential backoff, environment variable normalization, WebSocket notifications, and security middleware, are implemented in one source file.
- **Configuration:** Retry logic and delay for live data fetching are configurable through environment variables. CLI override options (e.g., `--livedata-retry-default`, `--livedata-delay-default`) take precedence over defaults.
- **Real-Time Updates:** On successful ontology updates, a JSON payload containing the updated title, current version, timestamp, and status message is broadcast to all connected WebSocket clients.

## Benefits and User Impact

- **Enhanced Security:** By requiring API key authentication for modifying operations, the system protects against unauthorized access and ensures data integrity.
- **Robust Management:** Users benefit from a unified service that handles live data integration, diagnostics, telemetry, and seamless persistence of ontology data.
- **Proactive Monitoring:** Detailed and aggregated telemetry helps operators detect configuration issues early and take corrective measures.

## Usage Example

1. **Configure API Key:**
   - Set the API key in the environment: `export API_KEY=your_secret_key`.
   - When sending HTTP requests to secured endpoints (e.g., `/update`, `/refresh`), include header `x-api-key: your_secret_key`.

2. **Invoke Operations via CLI:**
   - Update an ontology: `node src/lib/main.js --update "New Ontology Title"`
   - Refresh ontology data: `node src/lib/main.js --refresh`
   - Retrieve aggregated diagnostics: `node src/lib/main.js --diagnostic-summary-naN` or access `/telemetry` via HTTP.

This update reinforces the mission of owl-builder to deliver dynamic, secure, and live data-driven ontology management in a single, easy-to-maintain repository.
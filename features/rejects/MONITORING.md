# MONITORING

This feature consolidates performance monitoring, diagnostic telemetry export, and system health checking into a single, unified module. It merges the responsibilities previously handled by the PERFORMANCE_MONITOR and TELEMETRY_EXPORT features and extends them with a new health check endpoint.

## Overview

- **Unified Metrics & Diagnostics:**
  - Aggregates runtime metrics (response times, error rates, operation frequencies) and diagnostic telemetry (notably NA(N)-fallback events) into a single API.
  - Reduces overhead and user configuration by merging related monitoring functionality.

- **HTTP API Endpoints:**
  - **GET /performance:** Returns JSON with performance metrics (e.g., average response times, total calls per endpoint).
  - **GET /telemetry:** Exports aggregated telemetry data including detailed diagnostics on environment variable parsing and NaN fallback warnings.
  - **GET /health:** A new endpoint providing a concise health check report. It summarizes the overall system status including:
    - Application version
    - Uptime
    - Live data integration status
    - Count of active WebSocket clients
    - Recent diagnostic summary status

- **CLI Integration:**
  - New CLI flags to print or save performance metrics, telemetry data, or health check status.
  - Allows override and configuration through environment variables (e.g., PERFORMANCE_INTERVAL, NANFALLBACK_WARNING_THRESHOLD) and CLI flags.

## Implementation Details

- **Metrics Collection:**
  - Instrument key operations (e.g., live data fetch, persistence, query operations) to track performance metrics using in-memory counters.
  - Aggregate and update metrics over a configurable time window.

- **Telemetry:**
  - Utilize the existing telemetry caching mechanism (warningCache) for NaN fallback events and extend it to include additional diagnostic metadata if required.
  - Log aggregated telemetry details only up to the warning threshold set by NANFALLBACK_WARNING_THRESHOLD.

- **Health Check:**
  - Implement a lightweight endpoint (/health) that returns a JSON object with status fields (version, uptime, connectivity check for live data sources, WebSocket connection count etc.).
  - The health check provides a quick operational summary for both developers and operators.

## Benefits and User Impact

- **Simplified Monitoring:**
  - Unified view of system performance and reliability improves troubleshooting and proactive maintenance.

- **Operational Transparency:**
  - Real-time health reporting provides immediate insight into the application’s status and its integration with live data sources.

- **Reduced Complexity:**
  - Merging similar diagnostic and performance functionalities into a single feature streamlines configuration and reduces maintenance overhead.

- **Enhanced User Experience:**
  - Both CLI users and API clients gain access to consolidated, actionable metrics and diagnostics, supporting faster resolution of issues and continuous system improvements.
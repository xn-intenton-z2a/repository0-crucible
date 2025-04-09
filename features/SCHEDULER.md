# SCHEDULER

The SCHEDULER feature introduces an automated process that periodically refreshes the ontology using live data integration. This feature ensures that the system always maintains an up-to-date ontology without requiring manual intervention. The scheduler will trigger the refresh process using existing functions such as buildOntologyFromLiveData and refreshOntology, and then persist the updated ontology.

## Overview

- **Automated Refresh:** At configurable intervals, the scheduler triggers a full refresh of the ontology using live data endpoints.
- **Configurable Interval:** Users can set the refresh interval through an environment variable (e.g., SCHEDULER_INTERVAL) with a sensible default (e.g., 60000 milliseconds).
- **Diagnostic Integration:** Each scheduled refresh operation logs diagnostic events, ensuring visibility into the refresh process and any errors that occur.
- **Seamless Persistence:** After a refresh, the updated ontology is persisted on disk and broadcast via the existing WebSocket infrastructure for real-time notifications.

## Implementation Details

- **Activation Flag:** The scheduler can be enabled by setting an environment variable (e.g., ENABLE_SCHEDULER) or via a CLI flag (e.g., --schedule).
- **Interval Configuration:** Read the SCHEDULER_INTERVAL environment variable, parse and validate it (using current environment variable parsing utilities), and fallback to a default value if necessary.
- **Loop and Refresh:** Implement an asynchronous loop inside a module that calls the refreshOntology function. After a successful refresh, wait for the configured interval before the next refresh cycle.
- **Graceful Shutdown:** Ensure that the scheduler can be stopped gracefully, particularly when the application is terminating, to prevent orphaned asynchronous tasks.
- **Logging and Telemetry:** Integrate with the existing diagnostic logging system to log the start and completion of each scheduled refresh, including any error conditions.

## Benefits

- **Increased Data Freshness:** Regular refreshes keep the ontology in sync with the most current live data available from trusted endpoints.
- **Hands-Free Operation:** Reduces the need for manual intervention, allowing operators to focus on monitoring and analysis.
- **Enhanced Reliability:** Automatic error logging and handling within the scheduler improves the overall robustness of the system.
- **Seamless User Experience:** Integration with WebSocket notifications ensures that any changes are immediately visible on the live dashboard.

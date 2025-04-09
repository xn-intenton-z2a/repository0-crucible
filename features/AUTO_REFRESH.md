# Auto Refresh Feature

This feature introduces automatic, scheduled refreshes of the ontology by leveraging the existing live data integration and refresh functionalities. It allows owl-builder to periodically update its ontology without manual intervention.

## Overview

- **Automatic Scheduling:** Uses a configurable interval (via an environment variable, e.g. AUTO_REFRESH_INTERVAL) to trigger ontology refreshes periodically.
- **Integration with Existing Functions:** Leverages the existing `refreshOntology` function to fetch live data, update the ontology, persist it, and broadcast notifications via WebSocket.
- **CLI Command:** Provides a new CLI flag (`--auto-refresh`) that, when invoked, starts the automatic refresh process. The process will run until terminated, logging refresh statuses and diagnostics.
- **Telemetry and Diagnostics:** Integrates detailed diagnostic logging and telemetry similar to live data integration, so that system administrators can monitor refresh events and potential issues.

## Implementation Details

1. **Configuration:**
   - The refresh interval is set through an environment variable (`AUTO_REFRESH_INTERVAL`), defaulting to a safe value (e.g. 60000ms).
   - Additional CLI options may be provided to override the default interval on startup.

2. **Scheduling Mechanism:**
   - Use `setInterval` in a dedicated module (or within the main CLI file) to periodically invoke `refreshOntology`.
   - Ensure graceful shutdown of the interval using process signals or CLI termination commands.

3. **Diagnostic Logging:**
   - Log each refresh attempt along with timestamps, success/failure status, and any diagnostic messages similar to those provided in the Ontology Service.
   - Include telemetry export capabilities to track refresh performance over time.

4. **CLI Integration:**
   - Add a new CLI command `--auto-refresh` which initializes the auto refresh process.
   - Ensure that triggering this command does not interfere with existing CLI functionalities.

5. **Documentation and Tests:**
   - Update the README and CONTRIBUTING documents to include usage examples and configuration instructions for the auto refresh feature.
   - Add tests to simulate scheduled refreshes and verify diagnostic outputs.

## Benefits

- **Reduced Manual Intervention:** Automates the process of keeping the ontology up-to-date with live data.
- **Enhanced Operational Reliability:** Continuous refreshes contribute to data accuracy and timely anomaly detection.
- **Seamless Integration:** Utilizes existing components (refresh, telemetry, WebSocket notifications) to provide a cohesive solution in a single repository.

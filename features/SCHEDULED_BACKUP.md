# Scheduled Backup

This feature introduces an automatic, scheduled backup process for the ontology data. In addition to the existing auto refresh functionality, this feature ensures that the current ontology state is periodically backed up to a separate backup file. This minimizes data loss risk in case of any system errors and supports recovery and auditing.

## Overview

- **Automatic Backup Scheduling:** Uses a configurable interval (via the AUTO_BACKUP_INTERVAL environment variable) to trigger ontology backups automatically.
- **Integration with Existing Services:** Leverages the current backup functionality (backupOntology and backupAndRefreshOntology) to persist ontology states safely.
- **CLI Command:** Provides a new CLI flag (`--auto-backup`) that, when enabled, runs the scheduled backup task until terminated.
- **Diagnostic Logging and Telemetry:** Logs each backup event with a timestamp and integrates with the existing diagnostic telemetry system to monitor backup operations.
- **WebSocket Notifications:** Optionally broadcasts backup confirmation messages over the WebSocket server, ensuring that connected clients are informed of backup events.

## Configuration

- **AUTO_BACKUP_INTERVAL:** Environment variable to set the backup interval in milliseconds (e.g., 3600000 for hourly backups). Defaults to a safe value if not set.
- **CLI Overrides:** CLI options may override the default interval at startup.

## Implementation Details

1. **Scheduling Mechanism:**
   - Implement a timer using `setInterval` in a dedicated module or integrated in the main CLI file.
   - On each interval, trigger the backup process by calling the existing `backupOntology` function.
   - Ensure graceful shutdown of the schedule using process signals or a dedicated stop command.

2. **Diagnostic and Logging:**
   - Log backup events with details such as timestamp, backup file path, and status (success/failure).
   - In case of backup failure, log error messages and alert via CLI and telemetry.

3. **CLI Integration:**
   - Add support for `--auto-backup` flag to activate scheduled backups.
   - Allow optional CLI parameter to adjust the backup interval.

4. **Testing and Documentation:**
   - Update test suite to simulate scheduled backups and verify that backup files are created as expected.
   - Modify the README and CONTRIBUTING documents to include usage instructions for the scheduled backup feature.

## Benefits

- **Improved Data Safety:** Regular backups protect ontology data against unexpected failures.
- **Operational Assurance:** Enables administrators to verify that backup processes run correctly without manual intervention.
- **Seamless Integration:** Utilizes and extends the existing backup and diagnostic functionalities in a single repository environment.
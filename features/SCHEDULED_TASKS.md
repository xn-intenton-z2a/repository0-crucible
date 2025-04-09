# Scheduled Tasks

This feature consolidates the periodic operations of ontology maintenance into a single, cohesive scheduling system. It merges the functionalities previously known as Auto Refresh and Scheduled Backup into one unified feature that manages both automatic ontology refreshes (leveraging live data integration) and periodic backups.

## Overview

- **Unified Scheduling:** Combines automatic refresh and scheduled backup tasks to keep the ontology updated and secure.
- **Configurable Intervals:** Uses environment variables (e.g., `AUTO_REFRESH_INTERVAL` and `AUTO_BACKUP_INTERVAL`) to set the frequency for each operation. Defaults are provided for safe operation.
- **CLI Integration:** Provides dedicated CLI flags (e.g., `--auto-refresh` and `--auto-backup`) that now trigger their respective tasks under the unified scheduling system.
- **Diagnostic and Telemetry Logging:** Continues to utilize detailed diagnostic logging and telemetry exports to monitor task performance and potential issues.

## Implementation Details

1. **Task Scheduling:**
   - Use `setInterval` to schedule both the ontology refresh and backup processes.
   - Ensure that each scheduled task operates independently while sharing the centralized timing and logging facilities.
   - Implement graceful shutdown procedures to properly clear intervals during process termination.

2. **Configuration and CLI Overrides:**
   - The refresh interval is set through an environment variable like `AUTO_REFRESH_INTERVAL` (defaulting to a safe value, e.g., 60000ms).
   - The backup interval is controlled by `AUTO_BACKUP_INTERVAL` (defaulting to a value like 3600000ms).
   - CLI commands allow manual trigger and override of these intervals as needed.

3. **Diagnostic Logging and Telemetry:**
   - Each scheduled task logs detailed diagnostic messages, including timestamps, success/failure statuses, and any error conditions.
   - Telemetry data is batch exported using the existing `--export-telemetry` CLI command which now includes scheduled task performance metrics.

## Benefits

- **Reduced Manual Intervention:** Automated scheduling reduces the need for manual updates or backups, ensuring that the ontology remains current and securely backed up.
- **Enhanced Reliability:** By consolidating and standardizing scheduled tasks, system administrators can monitor and manage both refresh and backup processes from a unified interface.
- **Streamlined Configuration:** Single-point configuration for environment variables and CLI options simplifies deployment and ongoing maintenance.

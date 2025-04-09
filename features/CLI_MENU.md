# CLI_MENU: Interactive Command Line Interface

This feature introduces an interactive command-line menu system to owl-builder, aimed at simplifying user interaction with critical ontology operations. It provides a guided interface that helps both novice and experienced users navigate through the tool’s functionalities without needing to remember complex CLI flags.

## Overview

- **Interactive Navigation:** Utilizes Node’s built-in readline module to present a menu with options such as building ontologies (live or static), refreshing data, exporting telemetry, backing up/restoring data, and viewing diagnostic logs.
- **Real-Time Feedback:** Displays dynamic status messages and leverages existing WebSocket notifications to inform users of updates, rollbacks, and errors immediately.
- **Ease of Use:** Consolidates the wide variety of CLI commands into an intuitive, menu-driven interface, reducing the learning curve and improving usability.
- **Seamless Integration:** Built to work in tandem with existing features such as SCHEDULED_TASKS and the merged core telemetry/ontology engine functionality.

## Implementation Details

1. **Menu Display and Navigation:**
   - Use Node’s readline API to display a clear menu with numbered options covering key commands (e.g., Build Ontology, Refresh Ontology, Export Telemetry, Backup, Rollback, and Exit).
   - Accept user input and execute corresponding functions by mapping menu choices to existing CLI commands.

2. **Command Integration:**
   - Internally invoke functions from existing modules (SCHEDULED_TASKS, CORE_ENGINE which is a merge of TELEMETRY_MANAGER and ONTOLOGY_ENGINE) to perform the required actions seamlessly.
   - Provide an option to view help or return to the main menu at any time.

3. **User Feedback and Real-Time Updates:**
   - Display success or error messages in real time, incorporating responses from diagnostic logs and WebSocket updates where applicable.
   - Optionally, refresh the menu display after each operation.

4. **Configuration and Extensibility:**
   - Make the interactive menu optional, activated by a new CLI flag (e.g., `--menu`).
   - Ensure that additional menu items can be added easily as new functionality is integrated.

## Benefits

- **Improved Usability:** Makes owl-builder accessible to users who prefer guided interaction over remembering numerous CLI flags.
- **Centralized Operations:** Offers a single point of access for key operations, reducing complexity and streamlining workflow.
- **Enhanced User Experience:** Real-time feedback and an intuitive interface boost confidence in using owl-builder for live ontology building and management.

## Migration Notes

To accommodate the additional CLI_MENU feature while maintaining a maximum of three high-level features in the repository, the existing TELEMETRY_MANAGER and ONTOLOGY_ENGINE features will be merged into a unified CORE_ENGINE. The CORE_ENGINE will continue to manage real-time live data integration, diagnostic telemetry, automated anomaly detection, and rollback functionalities. 

**Features to be deleted:** TELEMETRY_MANAGER, ONTOLOGY_ENGINE

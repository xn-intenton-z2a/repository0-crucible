# CLI_MENU: Interactive Command Line Interface

## Overview

The CLI_MENU feature provides an interactive, menu-driven interface that simplifies user interaction with owl-builder’s ontology operations. This update extends the existing interactive menu to include a new "Query Ontology" option. Users can now search through the persisted ontology data directly from the CLI, receiving formatted results without having to switch contexts or use the RESTful `/query` endpoint.

## Implementation Details

1. **Menu Display and Navigation:**
   - Utilizes Node’s built-in readline module to display an updated menu with options:
     - Build Ontology (Live or Static Fallback)
     - Refresh Ontology
     - Export Telemetry
     - Backup / Restore Ontology
     - **Query Ontology:** Prompts the user to enter a search term, then internally invokes the `queryOntology` method to filter the ontology concepts based on the provided term.
     - Rollback Operations
     - Exit

2. **Command Integration:**
   - The menu mapping will now include a new entry for "Query Ontology," which calls the existing `queryOntology` function using the user-provided parameter.
   - The output is formatted in a human-readable manner (e.g., a JSON printout or a simplified list). This maintains consistency with the overall CLI design and usage of owl-builder.

3. **User Feedback and Real-Time Updates:**
   - In addition to dynamic status messages for operations such as build, refresh, and rollback, the new query command will display the search results immediately.
   - The interactive experience is enhanced by returning to the main menu after displaying the results, allowing for further queries or operations without restarting the CLI.

4. **Configuration and Extensibility:**
   - The updated CLI_MENU remains optional and is activated by a new CLI flag (e.g., `--menu`).
   - The design is modular, ensuring easy addition of future CLI commands without impacting the core logic.

## Benefits

- **Improved Usability:** Users who prefer a guided interface can now perform ontology queries alongside other operations without needing to construct complex command lines.
- **Centralized Operations:** Incorporates various ontology management commands (build, refresh, backup, rollback, query) into one consistent, interactive menu.
- **Enhanced Efficiency:** The new query functionality minimizes context switching by allowing quick searches directly in the CLI, thereby streamlining workflow interactions.

## Migration Notes

- Existing CLI_MENU functionalities remain intact. All previous operations (build, refresh, export, backup/restoration, and rollback) are preserved.
- The new "Query Ontology" option is integrated as an additive feature; users should update their documentation and help instructions to reflect the additional option.
- No features are removed. The enhancement aligns with owl-builder’s mission by further simplifying live ontology management and improving usability for both novice and experienced users.

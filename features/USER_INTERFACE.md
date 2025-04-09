# USER_INTERFACE: Unified CLI and HTTP Interface

## Overview
The USER_INTERFACE feature consolidates the existing HTTP and CLI interaction capabilities into a single, unified interface. It merges the functionalities of the previous WEB_SERVER and CLI_MENU features to provide a consistent user experience for interacting with owl-builder. This feature supports both a RESTful API (including status, telemetry, and query endpoints) and an interactive command line menu for performing ontology operations, including querying, refreshing, and monitoring live data updates via WebSocket notifications.

## Implementation Details
1. **Unified HTTP Endpoints:**
   - **Status Endpoint (`/`):** Returns a simple plain text message indicating that the owl-builder service is running.
   - **Telemetry Endpoint (`/telemetry`):** Provides aggregated diagnostic and telemetry data, supporting export formats such as JSON and CSV via query parameters (e.g., `?format=csv`).
   - **Query Endpoint (`/query`):** Accepts GET requests with a search parameter (`q`) to perform ontology queries using the internal `queryOntology` function. The endpoint returns matching results in JSON format.
   - **WebSocket Notifications:** Real-time notifications for ontology operations (updates, refreshes, rollbacks, etc.) are broadcast to connected clients. These notifications include key metadata such as the ontology title, version, timestamp, and a status message.

2. **Integrated Interactive CLI:**
   - **Menu-Driven Interface:** Offers a consolidated interactive menu that provides options such as Build Ontology, Refresh Ontology, Export Telemetry, Backup/Restore, and Query Ontology.
   - **Query Functionality:** The interactive CLI includes a dedicated option for querying ontology data, capitalizing on the same functionality available via the RESTful API.
   - **Consistent Feedback:** Users receive immediate, formatted responses directly in the CLI, with smooth transitions back to the main menu for further operations.

3. **Configuration and Integration:**
   - Environment variables and CLI flags are used for configuration (e.g., setting the server port via `PORT` and activating the interface with a flag such as `--serve` or `--ui`).
   - Detailed logging and diagnostic messages are integrated to help monitor operations and facilitate troubleshooting.

## Benefits
- **Consistent User Experience:** Unifies CLI and HTTP interactions, reducing the learning curve and maintenance overhead.
- **Simplified Architecture:** Consolidates two previously separate features into one coherent module, streamlining code organization.
- **Improved Maintainability:** Centralizes interface-related logic, making future enhancements and bug fixes more straightforward.
- **Enhanced Functionality:** Retains all key features such as real-time notifications, query operations, and telemetry export, while delivering a harmonized interaction layer.

## Migration Notes
- **Deprecated Features:** The previous WEB_SERVER and CLI_MENU features will be deprecated. All query, status, and interactive menu functionalities are now integrated into USER_INTERFACE.
- **Documentation Updates:** Users and developers should refer to the updated documentation for usage examples and configuration instructions.
- **Backward Compatibility:** Existing API endpoints and CLI operations remain functional through the new unified module, ensuring a smooth transition for existing users.

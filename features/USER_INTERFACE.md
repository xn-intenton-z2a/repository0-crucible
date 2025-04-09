# USER_INTERFACE: Unified CLI, HTTP, and GraphQL Interface

## Overview
This feature unifies CLI and HTTP interfaces with the addition of a GraphQL endpoint, offering a flexible and comprehensive way to interact with ontology data. It merges functionalities from legacy WEB_SERVER and CLI_MENU modules and extends them by enabling advanced queries, mutations, and interactive GraphQL requests alongside existing RESTful options and real-time WebSocket notifications.

## Implementation Details
1. **Unified HTTP Endpoints:**
   - **Status Endpoint (`/`):** Returns a simple plain text message indicating that the owl-builder service is running.
   - **Telemetry Endpoint (`/telemetry`):** Provides aggregated diagnostic and telemetry data in JSON or CSV formats, based on query parameters (e.g., `?format=csv`).
   - **REST Query Endpoint (`/query`):** Accepts GET requests with a search parameter (`q`) to perform ontology queries and returns matching data in JSON format.
   - **GraphQL Endpoint (`/graphql`):**
     - Implements a basic GraphQL schema that allows clients to perform flexible queries for ontology attributes such as title, concepts, classes, and metadata.
     - Supports mutations to trigger actions like refreshing or updating the ontology using underlying CLI functions.
     - Provides introspection support, enabling developers to explore the available schema.
   - **WebSocket Notifications:** Broadcasts real-time notifications for ontology operations (updates, refreshes, merges, rollbacks) to all connected clients.

2. **Integrated Interactive CLI:**
   - **Menu-Driven Interface:**: Offers options for building, refreshing, querying, exporting telemetry, and managing ontology updates.
   - **GraphQL Interactive Client:** Includes an option within the CLI to send GraphQL queries directly, providing immediate, structured responses.
   - **Consistent Feedback:** Users receive formatted responses and clear error messages, streamlining troubleshooting and improving the overall developer experience.

3. **Configuration and Integration:**
   - The HTTP and GraphQL services share a single server instance for simplicity in deployment and configuration.
   - Environment variables and CLI flags control configurations such as server port, GraphQL introspection, and debug levels.
   - The system maintains backwards compatibility with existing REST endpoints while extending capabilities through GraphQL.

## Benefits
- **Enhanced Flexibility:** GraphQL allows clients to request exactly the data they need, reducing data over-fetching and optimizing performance.
- **Unified User Experience:** A single interface for HTTP, CLI, and GraphQL interactions simplifies usage and reduces the learning curve.
- **Improved Developer Productivity:** Multiple interaction modes (CLI, REST, GraphQL) enable rapid prototyping and integration with different client applications.
- **Scalability:** The addition of GraphQL sets the stage for future expansion into more complex data querying and manipulation scenarios.

## Migration Notes
- Legacy features (WEB_SERVER and CLI_MENU) have been deprecated in favor of this unified interface.
- Developers should consult the updated documentation for examples on forming GraphQL queries and configuring the server settings.
- All existing REST endpoints and CLI commands remain functional, ensuring a smooth transition.

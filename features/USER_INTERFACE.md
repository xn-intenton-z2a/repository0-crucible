# USER_INTERFACE: Unified CLI, HTTP, and GraphQL Interface with Enhanced Interactive Help

## Overview
This feature unifies the CLI and HTTP interfaces with a GraphQL endpoint, providing a comprehensive and flexible way to interact with ontology data. Building on its previous design which merged legacy WEB_SERVER and CLI_MENU modules, this updated version now introduces an enhanced interactive help system for the CLI, offering real-time command suggestions, contextual usage info, and dynamic documentation browsing. All existing RESTful endpoints, WebSocket notifications, and GraphQL capabilities remain fully supported.

## Unified Interface Components
- **HTTP Endpoints:**
  - **Status Endpoint (`/`):** Responds with a plain text message indicating that the owl-builder service is running.
  - **Telemetry Endpoint (`/telemetry`):** Provides aggregated diagnostic and telemetry data in JSON or CSV formats based on query parameters.
  - **REST Query Endpoint (`/query`):** Accepts GET requests with a search parameter (`q`) for ontology queries and responds with JSON data.
  - **GraphQL Endpoint (`/graphql`):** Implements a flexible schema for querying and mutating ontology attributes with full introspection support.
  - **WebSocket Notifications:** Delivers real-time messages about ontology operations such as updates, refreshes, merges, and rollbacks.

- **Integrated Interactive CLI:**
  - **Menu-Driven Interface:** Offers options for building, refreshing, querying, exporting telemetry, and managing ontology updates.
  - **GraphQL Interactive Client:** Enables users to send GraphQL queries directly from the CLI.
  - **Enhanced Interactive Help:** 
    - Provides real-time command suggestions and contextual help tips based on available commands.
    - Dynamically displays detailed usage examples and error explanations when a user inputs an invalid command or flag.
    - Integrates a search functionality to quickly find relevant CLI commands and documentation, reducing the learning curve for new users.

## Implementation and Integration
- The CLI and HTTP/GraphQL services share a unified server instance, simplifying configuration and deployment.
- Environment variables and CLI flags continue to control configurations like server port, GraphQL introspection, and debug levels, while the enhanced help system parses available commands for dynamic documentation.
- The interactive help upgrade ensures that all commands (including legacy flags) are documented and presented in a user-friendly manner with real-time feedback.

## Benefits
- **Single, Cohesive User Experience:** Combines multiple interfacing methods into one unified module for simplified interaction.
- **Lowered Learning Curve:** The enhanced interactive help system provides real-time assistance, making it easier for new and experienced users to discover and utilize available functionality.
- **Increased Productivity:** Users receive immediate, contextual feedback and command suggestions, leading to faster troubleshooting and efficient usage.

## Migration and Backwards Compatibility
- All existing CLI commands, HTTP endpoints, and GraphQL functionalities remain fully operational.
- Developers are encouraged to explore the new interactive help mode to get familiar with the extended CLI features.
- Documentation in both the README and CONTRIBUTING guides has been updated to reflect these changes and provide examples of using the enhanced help system.

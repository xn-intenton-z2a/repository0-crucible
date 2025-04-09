# Ontology API

This feature introduces a RESTful HTTP API within the owl-builder CLI tool. The API will provide endpoints for querying, updating, and managing ontologies dynamically. It leverages the existing live data integration and diagnostic logging systems while offering a more user-friendly interface for external clients and integrations.

## Overview

- **REST Endpoints:** Implement endpoints such as GET /ontology to retrieve the current ontology, POST /ontology/update to change its title or contents, and DELETE /ontology to clear the ontology file.
- **Integration with Diagnostics:** All API calls will be logged using the existing diagnostic system, ensuring consistent telemetry and error handling. This includes timestamped logging and aggregated telemetry for any configuration issues.
- **Real-time Notifications:** Coupled with the current WebSocket implementation, the API will broadcast notifications for updates, refreshes, and merges, ensuring clients stay up-to-date on ontology state changes.

## Implementation Details

- **HTTP Server Extension:** Leverage the existing web server setup by extending the HTTP request handler to route RESTful requests. For example, the server will check the request URL and method to determine if it should serve the legacy CLI message or a RESTful response.
- **Endpoints and Methods:**
  - **GET /ontology:** Respond with the currently persisted ontology as JSON.
  - **POST /ontology/update:** Accept JSON body data to update the ontology. Validate the input and persist changes using existing functions such as updateOntology and persistOntology.
  - **DELETE /ontology:** Call clearOntology to remove the stored ontology and respond with an appropriate status message.
- **Error Handling:** Utilize promise-based asynchronous handling to ensure that errors (e.g., failed persistence, invalid input) are captured and logged via the diagnostics system.
- **Security and Configuration:** Allow configuration via environment variables to enable/disable the API or set access modes (e.g., strict mode for API inputs).

## Benefits

- **Enhanced Interoperability:** A REST API allows external systems and client-side applications to seamlessly integrate with owl-builder, promoting automation and further customization.
- **User-friendly Management:** Instead of relying solely on CLI commands, users can manage ontologies through simple HTTP calls with standard methods and JSON responses.
- **Real-time Updates:** Coupled with WebSocket notifications, the API ensures that clients are alerted to changes as they occur, aligning with the mission for dynamic, live data integration.
- **Consolidated Diagnostics:** API usage logs and errors are incorporated into the existing diagnostics feature, ensuring a cohesive logging and troubleshooting experience.

# Ontology Manager

This feature introduces a dedicated module to manage OWL ontologies with multiple interfaces. It covers building, persisting, merging, and querying OWL ontologies stored as JSON files, and now extends its functionality by exposing a REST API for broader integration.

## Overview

The Ontology Manager is central to owl-builder and is designed to:
- Build OWL ontologies from live and verified public data sources.
- Persist OWL ontologies as JSON files for easy sharing and integration.
- Merge multiple OWL ontology files into a unified model.
- Query OWL ontologies via a CLI interface, library functions, and now a REST API.

## CLI and Library Integration

- **Build Functionality:** Automatically retrieve public data sources and generate OWL ontologies.
- **Persistence Layer:** Read and write OWL ontology data in JSON format with consistent data management.
- **Merge Operations:** Combine and streamline multiple JSON ontology representations.
- **Query Interface:** Provide commands for filtering and searching within OWL ontologies via CLI and library function calls.

## REST API Extension

- **HTTP Server Integration:** Introduce a lightweight HTTP API using Node.js built-in modules to expose ontology management operations.
- **Endpoint Design:** The API will include endpoints for building, persisting, merging, and querying ontologies. These endpoints follow a RESTful approach with clear request and response structures.
- **Usage and Deployment:** Designed for simple deployment as part of a single repository, the server can be initiated from the CLI, enhancing versatility in integration with external systems 
  (e.g., GraphDB import workflows).
- **Testing and Documentation:** Unit tests using vitest will cover new HTTP routes. Documentation and usage examples, including inline code and CLI/HTTP examples, will be added in the README.

## Implementation Details

- **Single Repository Scope:** All changes will be implemented in the existing module structure with minimal alterations to preserve repository cohesiveness.
- **Modular Functions:** The REST API endpoints will leverage the same modular functions used by CLI and library components to enforce DRY principles.
- **Testing:** New tests will be added to verify HTTP channel responses along with the core ontology management functionalities.

This update not only enhances the Ontology Manager’s functionality but also solidifies its alignment with the mission to build and manage OWL ontologies in a simple, integrated manner.

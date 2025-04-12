# Ontology Manager

This feature provides a comprehensive module for building, persisting, merging, and querying OWL ontologies stored as JSON files. It integrates multiple interfaces including a CLI, library functions, and an HTTP REST API, all within a single repository. The module is aligned with our mission to provide a simple, integrated tool for ontology management and GraphDB integration.

## Overview

- **Build Functionality:** Automatically retrieve and generate OWL ontologies from live, verified public data sources.
- **Persistence Layer:** Read and write ontology JSON files to enable easy sharing and integration.
- **Merge Operations:** Combine multiple JSON ontology files into a unified, deduplicated model.
- **CLI Interface:** Support commands for ontology creation, persistence, merging, and diagnostics using robust logging and environment variable validation.
- **REST API:** Expose ontology management operations over HTTP, including build, persist, merge, and diagnostics endpoints.
- **Enhanced Query Endpoint:** New addition to the REST API, which provides a `/query` endpoint to filter and search within the ontology. This endpoint accepts URL parameters (e.g., class names or property filters) and returns matching ontology elements.

## CLI, Library, and REST API Integration

### CLI and Library Functions

- **Build & Persist:** Generate ontologies from data sources and save them as JSON files. Validate inputs using Zod schema.
- **Merge:** Combine two or more ontology files and resolve duplicate entries.
- **Diagnostics and Refresh:** Provide a full diagnostic report and reset internal system state, including logs.

### REST API Extensions

- **HTTP Server Integration:** Uses Node.js built-in modules to launch a lightweight server exposing ontology management endpoints.
- **Existing Endpoints:** Includes endpoints for operations like diagnostics (`/diagnostics`) and basic ontology operations.
- **Enhanced Query Endpoint (`/query`):**
  - **Purpose:** Allows clients to perform filtered searches within an ontology.
  - **Usage:** Accepts GET requests with query parameters (e.g., `?class=TestClass`).
  - **Functionality:** Leverages existing ontology processing functions to return a filtered subset of ontology data.
  - **Benefits:** Provides an easy, programmatic way to retrieve targeted information from complex ontologies, enhancing integration with external services like GraphDB or user dashboards.

## Implementation Details

- **Single Repository Scope:** All changes and enhancements are integrated within the current module structure of the repository.
- **Modular Design:** New query functionality reuses existing build, persist, and merge functions to adhere to DRY principles.
- **Testing:** Additional unit tests (with vitest) will cover the new `/query` endpoint, ensuring robust operation under varied query parameters. Integration tests will validate end-to-end functionality.
- **Documentation:** The README and inline code comments will be updated with usage examples for the `/query` endpoint and detailed guidelines on leveraging new query capabilities.

## Usage Example

- **CLI Usage:** No changes to CLI invocation; existing commands remain available. Developers can call internal query functions directly from the library.
- **REST API Usage:**
  - To filter ontology data by class, a client can send a GET request to:
    
      http://localhost:3000/query?class=TestClass
    
  - The server processes the query and responds with a JSON array of matched ontology elements.

This enhancement not only solidifies the core ontology management capabilities but also expands the module's utility through enhanced RESTful querying, addressing both developer needs and integration requirements in a cohesive, single-repository solution.
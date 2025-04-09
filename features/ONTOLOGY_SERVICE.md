# ONTOLOGY_SERVICE

This updated ONTOLOGY_SERVICE feature continues to manage live OWL ontologies but now also exposes a full HTTP API. In addition to live data integration, automated refresh routines, and diagnostic telemetry, this update provides a RESTful interface so that remote clients can interact with ontology operations beyond CLI commands.

# Overview

- **Live Data and Auto Refresh:** Integrates live data from verified endpoints and supports configurable refresh intervals with both automated and manual triggering.
- **Environment and Diagnostic Telemetry:** Robust parsing and normalization of environment variables; aggregates telemetry for invalid inputs with enhanced details.
- **Security and Notification Integration:** Enforces API key checks, logs diagnostics, and broadcasts real-time notifications using WebSockets for critical events.
- **HTTP API Endpoints:** A new set of RESTful HTTP endpoints is introduced to allow client applications and external systems to perform ontology operations remotely.

# HTTP API Endpoints

The HTTP API extends the basic web server functionality with the following endpoints:

- **GET /ontology**: Returns the current ontology as JSON.
- **POST /refresh**: Triggers a live data refresh of the ontology and persists updates.
- **GET /export**: Exports the current ontology in OWL XML format.
- **POST /update**: Allows updating the ontology title or metadata via JSON payload.
- **GET /query**: Executes a search query against ontology concepts using query parameters.

These endpoints reuse existing functions (e.g. `buildOntologyFromLiveData`, `persistOntology`, `loadOntology`, and `exportOntologyToXML`) and leverage the diagnostic and telemetry logging utilities to ensure each operation is tracked and secured.

# Implementation Details

- **API Routing:** Extend the on-demand HTTP server (started via the `--serve` CLI flag) by adding a lightweight router. This router distinguishes the above endpoints and delegates the request to corresponding ontology functions.
- **Security Measures:** API endpoints enforce checks such as API key verification (if provided) and strict mode operation with CLI overrides for enhanced control.
- **Integration with Live Data and Notifications:** Each API action is integrated with the live data functions and, if applicable, broadcasts an update via the WebSocket notification system.
- **Documentation and Examples:** Update the README and contributing documentation with details on API usage, including sample curl commands and JSON payload formats.

# Benefits and User Impact

- **Remote Integration:** External applications can interact with owl-builder’s ontology management functions without invoking the CLI directly.
- **Real-Time Monitoring:** Combined with the real-time WebSocket notifications, users and systems can immediately react to ontology changes.
- **Improved Developer Experience:** Consolidates live operations, diagnostics, logging, and API interaction into a unified module, making maintenance and extensions simpler.

This update aligns with the mission of dynamically building and adapting OWL ontologies by enhancing accessibility and integration while ensuring robust live data management and diagnostics.

# Ontology Manager & Model Selector

This feature enhances the existing Ontology Manager by merging core ontology operations with an interactive model selection capability. The updated feature not only supports live data integration, caching, scheduled refresh, and extended export/import operations but also provides a unified CLI interface to select from various ontology models (e.g., basic, advanced, minimal, complex, scientific, educational, philosophical, economic, and hybrid).

## Overview

- **Unified Ontology Operations:** Continue to provide REST API endpoints for exposing ontology data to external clients while supporting live data integration and fault-tolerant fallback to static ontology data.
- **Interactive Model Selection:** Introduce a CLI flag (e.g., `--select-model`) to list available ontology models and allow users to interactively select a model. If no model is specified, the system will prompt the user or revert to a predefined default model.
- **Robust Diagnostics:** Maintain enhanced diagnostic logging, caching of live data, and scheduled refreshes with automated fallback and detailed telemetry.
- **Consistent Integration:** All enhancements are implemented in a single source file, preserving the high cohesion and maintainability of the repository.

## Implementation Details

- **REST API & CLI Integration:** Extend the existing REST endpoints (GET /ontology, POST /ontology/refresh, etc.) to include model selection operations. When the `--select-model` flag is used, validate the input against the available models and route the operation to the appropriate ontology builder function (e.g., `buildBasicOWLModel`, `buildAdvancedOWLModel`, etc.).
- **Interactive CLI Mode:** If no model is provided via CLI, list all available options and prompt the user, or fall back to a default model, ensuring a smooth user experience.
- **Documentation & Testing:** Update README and CONTRIBUTING documentation to illustrate usage examples for both REST API and CLI invocations. Enhance unit and integration tests (using vitest) to specifically cover new model selection behavior along with other ontology management functions.

## Benefits

- **Streamlined Operations:** Merging model selection into the Ontology Manager simplifies the user experience by providing a single, unified interface for ontology management and customization.
- **Enhanced Flexibility:** Enables users to easily switch between different ontology models based on their use case while retaining robust live data integration.
- **Consistent Diagnostics:** Diagnostic logging and telemetry are updated to handle both ontology management and model selection, with comprehensive error handling and fallback mechanisms.

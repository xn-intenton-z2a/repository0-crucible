# Ontology Manager

This updated feature consolidates and extends our core module for managing OWL ontologies in a single repository. It not only builds, persists, and merges ontologies as JSON files, but now also integrates additional CLI and REST API commands for enhanced operations including building ontologies from input files, merging ontologies, querying content with optional regex support, and exporting ontologies in RDF/XML format.

## Overview

- **Build & Persist:** Generate ontologies either from live public data or from provided input files. The module validates ontology structure with a strict Zod schema and writes persistent JSON files.
- **Merge Operations:** Merge multiple ontology files (via both persistence and direct merge commands) while deduplicating classes and consolidating properties.
- **Enhanced Query Capability:** Includes two modes of querying ontologies – one via a dedicated CLI command (`--query-ontology`) with optional regex filtering, and another integrated into our REST API endpoints.
- **Export Formats:** In addition to GraphDB and OWL/Turtle export, this update introduces an RDF/XML export option to support broader integration scenarios.
- **CLI, Library & REST API Integration:**
  - **CLI Enhancements:** Updated commands such as `--build-ontology`, `--merge-ontology`, and `--query-ontology` are provided to facilitate direct file-based operations. Existing queries and persistence commands are maintained for backward compatibility.
  - **REST API Extension:** The server now supports endpoints for triggering ontology builds and merges, and returns enhanced diagnostic and query results.

## CLI Enhancements

- **Build Ontology (`--build-ontology`):**
  - Reads from an optional input file to construct an ontology or generates a default built ontology when no file is provided.
  - Marks the resulting ontology with a built flag.

- **Merge Ontology (`--merge-ontology`):**
  - Merges two ontology JSON files. The merge operation combines the classes from both files and consolidates properties by overwriting duplicate keys, ensuring a clear combined output.

- **Query Ontology (`--query-ontology`):**
  - Allows users to search for specific terms within an ontology’s name, classes, and properties. It supports optional regex patterns for advanced matching.

- **Export RDF/XML (`--export-xml`):**
  - Converts a JSON ontology into RDF/XML format. This exporter includes a proper XML declaration and necessary namespace mappings, enhancing interoperability with external systems.

## REST API Enhancements

- The HTTP server now integrates endpoints that mirror CLI functionality including:
  - **Ontology Build Trigger (`POST /ontology/build`)**
  - **Ontology Merge (`POST /ontology/merge`)**
  - **Enhanced Diagnostics and Query Endpoints** for real-time interaction with ontology data.

## Testing and Documentation

- All new CLI commands (build, merge, query, export XML) are covered by updated unit and end-to-end tests using vitest.
- Updated documentation in the README and inline code comments provides comprehensive usage examples and API descriptions.
- The extended module adheres to our mission to facilitate dynamic construction, management, and interrogation of OWL ontologies from live data sources.

This update enhances the developer experience by providing a richer set of tools to manage ontologies, ensure data integrity, and facilitate integration with external GraphDB systems.
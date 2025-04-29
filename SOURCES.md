# W3C Semantic Web & JSON-LD Core Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-syntax/
## https://www.w3.org/TR/owl2-xml/
## https://www.w3.org/TR/owl2-mapping-to-rdf/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-framing/
## https://www.w3.org/TR/json-ld11-api/
This consolidated source provides the definitive W3C specifications for modeling and serializing RDF graphs and OWL ontologies, covering:
- RDF 1.1 Concepts (Feb 2014) for the triple data model.
- OWL 2 Overview, Syntax, XML Mapping, and Mapping to RDF (2012) for ontology profiles and mappings.
- SKOS (Aug 2009) and DCAT 2 (Feb 2023) for controlled vocabularies and dataset metadata.
- JSON-LD 1.1 Core (May 2020), Framing (Dec 2020), and the JSON-LD API (Oct 2020) for context processing, subgraph extraction, expansion, compaction, normalization (URDNA2015), and programmatic interfaces.
These specifications are foundational for implementing context managers, serialization pipelines, ontology validation, and ensuring semantic interoperability across CLI, HTTP, and library modules.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices
## https://www.w3.org/TR/ld-bp/
Comprehensive guidelines for HTTP-based linked data publication and consumption. Topics include IRI design, content negotiation, pagination, versioning, caching strategies, and discoverability patterns. Directly informs REST endpoint URL schemes, HTTP headers (Cache-Control, Vary), JSON-LD context organization, and middleware configuration to build scalable, discoverable, and performant linked-data services.
## License if known
W3C Document License (CC-BY 4.0)

# JavaScript RDF & Validation Libraries
## https://github.com/digitalbazaar/jsonld.js#readme
## https://rdf.js.org/specification/data-model/
## https://comunica.dev/docs/query/framework/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://github.com/linkeddata/rdflib.js#readme
## https://github.com/rdfjs/N3.js#readme
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/zazuko/shacl-js#readme
## https://github.com/shexSpec/shex.js#readme
A curated collection of interoperable JavaScript libraries (2023–2024) for RDF/JSON-LD processing, SPARQL parsing, federated querying, graph serialization, and validation:
- jsonld.js for expansion, compaction, framing, and normalization;
- RDF/JS Data Model for graph primitives;
- Comunica for SPARQL query engine integration;
- SPARQL.js for parsing SPARQL into ASTs;
- rdflib.js for in-memory RDF stores;
- N3.js for Turtle and N-Quads parsing and writing;
- SHACL.js (shacl-js) for SHACL validation in JavaScript;
- Shex.js for ShEx schema validation and I/O.
Provides streaming APIs, precise error reporting, and schema enforcement patterns crucial for CI/CD pipelines and data quality checks in both CLI and server contexts.
## License if known
MIT; CC0/Public Domain; W3C Document License (CC-BY 4.0)

# RDF Data Access & SPARQL Protocols
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-results-json/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/rdf11-http-rdf-update/
## https://www.w3.org/TR/turtle/
## https://www.w3.org/TR/ldp/
## https://jena.apache.org/documentation/query/
## https://jena.apache.org/documentation/fuseki2/
Unified SPARQL 1.1 query and update operations, Graph Store HTTP API, and results JSON formats alongside RDF serialization (Turtle) and Linked Data Platform CRUD patterns. Apache Jena ARQ and Fuseki guides offer deployment best practices, federation strategies, transaction management, and performance tuning for robust SPARQL endpoint configuration and management in production.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0 (Apache Jena)

# Node.js Platform & Testing Tools
## https://nodejs.org/api/
## https://fetch.spec.whatwg.org/
## https://vitest.dev/api/
Authoritative reference for Node.js v20+ core modules (fs, http, streams, ESM loader, performance hooks) and the WHATWG Fetch standard (Request/Response streams, headers, URL parsing). Paired with Vitest (2023–2024) for ESM-first unit, integration, and HTTP endpoint testing—featuring mocks, spies, snapshots, coverage reporting, watch mode, and parallel execution. Essential for reliable CLI file I/O, HTTP server implementation, and comprehensive automated test suites.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain); MIT

# Zod Schema Validation Library
## https://github.com/colinhacks/zod#readme
Zod is a TypeScript-first schema declaration and validation library that enables runtime parsing and validation of JSON data, configuration files, and HTTP request payloads. With fluent APIs, zero dependencies, and full type inference, Zod ensures robust data integrity checks for `data-sources.json`, command-line arguments, and JSON-LD artifacts, providing clear error messages and enabling fail-fast strategies in both CLI and server workflows.
## License if known
MIT

# DBpedia SPARQL Endpoint Guide
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
Community-maintained documentation of the public DBpedia SPARQL service. Covers endpoint URL patterns, accepted query parameters, result formats (JSON, XML), rate limits, CORS configuration, and example queries. Practical guidance for integrating DBpedia queries in CLI and programmatic APIs, handling pagination, and managing large result sets efficiently.
## License if known
CC-BY-SA (DBpedia Wiki)

# Hydra Core Vocabulary
## https://www.hydra-cg.com/spec/latest/core/
Defines the Hydra Core Vocabulary for hypermedia-driven REST APIs over RDF. Introduces terms for collections, search, pagination, and operations (`hydra:operation`). Provides a model for discoverable linked-data APIs, informing the design of dynamic HTTP endpoints with in-band metadata for client navigation and tooling automation.
## License if known
CC0/Public Domain
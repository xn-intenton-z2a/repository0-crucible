# W3C Semantic Web & OWL 2 Core Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-syntax/
## https://www.w3.org/TR/owl2-xml/
## https://www.w3.org/TR/owl2-mapping-to-rdf/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-framing/
Provides the foundational W3C recommendations for modeling RDF graphs, defining OWL 2 ontologies, and serializing JSON-LD. RDF 1.1 Concepts (Feb 2014) formalizes the triple data model; OWL 2 Overview, Syntax, and XML Mapping (Dec 2012) describe ontology profiles and serialization; OWL 2 Mapping to RDF (Mar 2012) details how OWL axioms map to RDF triples. SKOS (Aug 2009) and DCAT 2 (Feb 2023) standardize vocabularies and dataset metadata. JSON-LD 1.1 (May 2020) and Framing (Dec 2020) cover context processing and subgraph extraction. This source is critical for implementing context definitions, ontology serialization, and ensuring semantic interoperability across CLI, HTTP, and programmatic layers.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices
## https://www.w3.org/TR/ld-bp/
Comprehensive guidelines for HTTP-based linked data publication and consumption. Topics include IRI design, content negotiation, pagination, versioning, caching strategies, and discoverability patterns. Directly informs REST endpoint URL schemes, HTTP headers (cache-control, Vary), JSON-LD context organization, and middleware configuration to build scalable, discoverable, and performant linked-data services.
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
A curated collection of interoperable JavaScript libraries (2023–2024) for RDF/JSON-LD processing and graph validation: jsonld.js for expansion, compaction, and framing; the RDF/JS Data Model spec for graph primitives; Comunica for federated SPARQL querying; SPARQL.js for parsing; rdflib.js for in-memory stores; N3.js for Turtle and N-Quads serialization; SHACL shapes (Core and SPARQL-based) and ShEx schemas (Feb 2020) for declarative validation. Offers streaming APIs, detailed error reporting, and schema enforcement patterns essential for CI/CD pipelines and robust data pipelines.
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
Unified SPARQL 1.1 query, update, results JSON formats, and Graph Store HTTP API alongside RDF serialization (Turtle) and Linked Data Platform (LDP) CRUD patterns. Apache Jena ARQ and Fuseki guides provide in-depth deployment, federation strategies, and performance tuning for robust SPARQL endpoint configuration and management in production environments.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0 (Apache Jena)

# Node.js Platform & Testing Tools
## https://nodejs.org/api/
## https://fetch.spec.whatwg.org/
## https://vitest.dev/api/
Authoritative reference for Node.js v20+ core modules (fs, http, streams, ESM loader, performance hooks) and the WHATWG Fetch standard, covering Request/Response streams, headers, URL parsing, and network resilience. Coupled with Vitest (2023–2024) for ESM-first unit, integration, and HTTP endpoint testing—features include mocking, spies, snapshots, coverage, watch mode, and parallel execution. Essential for reliable CLI file I/O, HTTP server implementation, and comprehensive automated tests.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain); MIT

# JSON-LD 1.1 Processing Algorithms and API
## https://www.w3.org/TR/json-ld11-api/
Detailed specification of JSON-LD 1.1 processing algorithms: expansion, compaction, flattening, normalization (URDNA2015), and framing, along with the programmatic API definitions (function signatures, options, error conditions). Key to implementing performant context processors, transformation pipelines, and ensuring compliance with the JSON-LD standard in library and CLI modules.
## License if known
W3C Document License (CC-BY 4.0)

# DBpedia SPARQL Endpoint Guide
## https://wiki.dbpedia.org/services-resources/sparql-endpoint
Community-maintained documentation for the public DBpedia SPARQL service. Covers endpoint URL patterns, accepted query parameters, result formats (JSON, XML), rate limits, CORS configuration, and example queries. Practical guidance for integrating DBpedia queries in the CLI and programmatic API, handling paging, and managing large result sets.
## License if known
CC-BY-SA (DBpedia Wiki)

# Hydra Core Vocabulary
## https://www.hydra-cg.com/spec/latest/core/
Defines the Hydra Core Vocabulary for hypermedia-driven REST APIs over RDF. Introduces terms for collections, search, pagination, and operations (hydra:operation). Provides a model for discoverable linked-data APIs, informing the design of dynamic HTTP endpoints (/sources, /query) with in-band metadata for client navigation and automated tooling.
## License if known
CC0/Public Domain
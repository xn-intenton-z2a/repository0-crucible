# W3C Semantic Web & OWL 2 Core Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-syntax/
## https://www.w3.org/TR/owl2-xml/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-framing/
Provides the authoritative W3C recommendations for RDF graph modeling, ontology definition, and JSON-LD serialization. RDF 1.1 Concepts (Feb 2014) defines the core triple model; OWL 2 Overview, Syntax, and XML mapping (Dec 2012) specify ontology profiles and functional syntaxes. SKOS (Aug 2009) and DCAT 2 (Feb 2023) standardize controlled vocabularies and dataset metadata. JSON-LD 1.1 (May 2020) and Framing (Dec 2020) cover context processing, algorithms, and subgraph extraction. Essential for designing contexts, serializing OWL artifacts, and ensuring interoperability across CLI, HTTP, and library layers.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices
## https://www.w3.org/TR/ld-bp/
Pragmatic guidelines for HTTP-based linked data publication and consumption. Covers IRI design, content negotiation, pagination, versioning, caching, and discoverability patterns. Directly informs REST endpoint structure, cache-control headers, JSON-LD context organization, and middleware configuration to ensure scalable, discoverable, and performant services.
## License if known
W3C Document License (CC-BY 4.0)

# JavaScript RDF & Linked Data Libraries
## https://github.com/digitalbazaar/jsonld.js#readme
## https://rdf.js.org/specification/data-model/
## https://comunica.dev/docs/query/framework/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://github.com/linkeddata/rdflib.js#readme
## https://github.com/rdfjs/N3.js#readme
A curated set of interoperable JavaScript modules (2023–2024) for RDF/JSON-LD processing: jsonld.js for context resolution and framing, the RDF/JS Data Model spec for graph primitives, Comunica for federated SPARQL querying, SPARQL.js for query parsing, rdflib.js for in-memory stores, and N3.js for Turtle/N-Quads parsing and serialization. Underpins programmatic, CLI, and HTTP data workflows in the project.
## License if known
MIT; CC0/Public Domain

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
Unifies SPARQL 1.1 query, update, results formats, and Graph Store HTTP API with RDF serialization and Linked Data Platform CRUD patterns. Covers Turtle syntax (Dec 2014), SPARQL endpoints, JSON result handling, update operations, and container/resource management via LDP (Jul 2015). Apache Jena ARQ and Fuseki guides deliver deployment, federation, and performance tuning insights for robust endpoint configuration.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0 (Apache Jena)

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Defines declarative RDF graph validation via SHACL shapes (Core and SPARQL-based) and ShEx schemas (Feb 2020). The shex.js library offers streaming validation with detailed error reporting, ideal for CI/CD pipelines and ensuring ontology integrity and data quality early in the build process.
## License if known
W3C Document License (CC-BY 4.0); CC0/Public Domain; MIT

# Node.js Core & Web Platform APIs
## https://nodejs.org/api/
## https://url.spec.whatwg.org/multipage/
## https://fetch.spec.whatwg.org/
Comprehensive reference for Node.js core modules (fs, http, URL parsing, streams, ESM loader, performance hooks, global fetch) alongside the WHATWG URL and Fetch standards. Covers Request/Response objects, streaming bodies, headers management, CORS, and error handling. Vital for CLI file I/O, HTTP endpoint implementation, module loading, performance metrics, and resilient network interactions in Node 20+ environments.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain)

# Vitest Testing Framework
## https://vitest.dev/api/
An ESM-first test runner and assertion library with unit, integration, and HTTP endpoint testing. Features include mocking, spies, snapshots, coverage, watch mode, and parallel execution (Vitest 3.x, 2023–2024). Powers the repository’s comprehensive test suite for CLI, API, and HTTP behaviors.
## License if known
MIT

# JSON-LD 1.1 Processing Algorithms and API
## https://www.w3.org/TR/json-ld11-api/
Specifies the JSON-LD 1.1 Processing Algorithms for expansion, compaction, flattening, normalization (URDNA2015), conversion between JSON-LD and RDF, and framing. Defines the programmatic API for JSON-LD processors, detailing function signatures, options, error handling, and performance considerations. Crucial for implementing robust context processing, document transformation pipelines, and ensuring compliance with the JSON-LD standard.
## License if known
W3C Document License (CC-BY 4.0)
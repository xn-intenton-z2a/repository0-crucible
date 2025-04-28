# W3C Semantic Web & OWL 2 Core Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-syntax/
## https://www.w3.org/TR/owl2-xml/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-framing/
Provides a consolidated reference for W3C standards underpinning RDF graph modeling, ontologies, and JSON-LD serialization. RDF 1.1 Concepts (Feb 2014) defines the core data model; OWL 2 Overview (Dec 2012) and OWL 2 Syntax (Dec 2012) specify ontology profiles, the functional syntax, and RDF/XML mappings. SKOS (Aug 2009) and DCAT 2 (Feb 2023) cover controlled vocabularies and dataset catalog metadata. JSON-LD 1.1 (May 2020) and Framing (Dec 2020) define contexts, algorithms for processing, and subgraph extraction. This authoritative set guides context design, serialization, parsing, and validation in CLI, HTTP, and library workflows.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices
## https://www.w3.org/TR/ld-bp/
Provides actionable guidelines for publishing and consuming linked data on the Web. Covers robust IRI design, HTTP content negotiation, pagination, versioning, and discovery patterns. Directly informs REST endpoint design, caching headers, JSON-LD context structuring, and middleware configuration to ensure scalable, discoverable ontology services.
## License if known
W3C Document License (CC-BY 4.0)

# JavaScript RDF & Linked Data Libraries
## https://github.com/digitalbazaar/jsonld.js#readme
## https://rdf.js.org/specification/data-model/
## https://comunica.dev/docs/query/framework/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://github.com/linkeddata/rdflib.js#readme
## https://github.com/rdfjs/N3.js#readme
A curated set of up-to-date (2023–2024) JavaScript modules for RDF and JSON-LD processing: jsonld.js for context resolution; the RDF/JS Data Model spec for interoperable graph primitives; Comunica for federated SPARQL queries; SPARQL.js for parsing; rdflib.js for in-memory stores; and N3.js for Turtle and N-Quads parsing/serialization. These libraries form the backbone of the project’s programmatic and CLI data workflows.
## License if known
MIT; CC0/Public Domain

# SPARQL 1.1 & Graph Store Protocol
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-results-json/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/rdf11-http-rdf-update/
## https://jena.apache.org/documentation/query/
## https://jena.apache.org/documentation/fuseki2/
Covers the full SPARQL 1.1 suite—query, protocol, JSON results, updates, and Graph Store HTTP API—paired with Apache Jena ARQ and Fuseki deployment and tuning guides. Essential for configuring SPARQL endpoints: endpoint setup, query federation, result handling, and performance optimization in server and CLI modes.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0 (Apache Jena)

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Defines declarative validation of RDF graphs via SHACL shapes (Core and SPARQL-based constraints) and ShEx schemas for shape-based validation. The shex.js library delivers streaming validation with precise error reports, ideal for CI/CD checks and ensuring ontology integrity. SHACL (Oct 2017) and ShEx (Feb 2020) are the foundation of the project’s validation pipeline.
## License if known
W3C Document License (CC-BY 4.0); CC0/Public Domain; MIT

# Node.js Core & Web Platform APIs
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/http.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/perf_hooks.html
## https://nodejs.org/api/esm.html
## https://nodejs.org/api/globals.html#fetch
## https://url.spec.whatwg.org/multipage/
Comprehensive reference for Node.js core modules (fs, http, URL parsing, streams, ESM loader, performance hooks, global fetch) and the WHATWG URL standard. Vital for CLI file I/O, HTTP endpoint implementations, module loading, and performance measurement in Node 20+ environments.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain)

# Vitest Testing Framework
## https://vitest.dev/api/
Provides an ESM-first test runner and assertion library with unit, integration, and HTTP endpoint testing. Features include mocking, spies, snapshots, coverage, watch mode, and parallel execution. Vitest 3.x (2023–2024) integrates with modern JavaScript tooling, forming the basis of the repository’s comprehensive test suite.
## License if known
MIT

# RDF 1.1 Turtle & Linked Data Platform (LDP)
## https://www.w3.org/TR/turtle/
## https://www.w3.org/TR/ldp/
Specifies the Turtle concrete syntax for RDF (Dec 2014) and the Linked Data Platform 1.0 specification (Jul 2015) for HTTP-based CRUD of linked data containers and resources. These sources provide actionable HTTP interaction patterns (GET, POST, PUT, DELETE) and serialization rules, directly informing Graph Store protocol implementations and client libraries.
## License if known
W3C Document License (CC-BY 4.0)
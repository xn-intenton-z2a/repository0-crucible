# W3C Semantic Web Standards & JSON-LD
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
## https://www.w3.org/TR/json-ld11/
Provides the definitive W3C specifications for modeling and exchanging linked data: RDF 1.1 Concepts (Feb 2014) defines the graph data model and serialization; OWL 2 Overview (Dec 2012) outlines ontology profiles and reasoning; SKOS Reference (Aug 2009) standardizes concept schemes; DCAT 2 (Feb 2023) defines dataset catalog metadata; and JSON-LD 1.1 (May 2020) specifies syntax, contexts, and processing algorithms for serializing RDF as JSON. This consolidated reference is essential for designing, processing, and validating JSON-LD and OWL artifacts across CLI, HTTP, and programmatic contexts. These specifications are maintained by W3C Working Groups and are the authoritative source for linked data interoperability.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices
## https://www.w3.org/TR/ld-bp/
Provides practical guidelines for publishing and consuming linked data on the Web, covering URI design, content negotiation, pagination, vocabulary management, and discovery. Emphasizes stable IRIs, human-readable documentation, HTTP caching, and metadata negotiation patterns—directly informing REST endpoint design and JSON-LD context structuring to ensure reliable, discoverable ontology services.
## License if known
W3C Document License (CC-BY 4.0)

# JavaScript RDF & Linked Data Libraries
## https://github.com/digitalbazaar/jsonld.js#readme
## https://rdf.js.org/specification/data-model/
## https://comunica.dev/docs/query/framework/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://github.com/linkeddata/rdflib.js#readme
## https://github.com/rdfjs/N3.js#readme
A curated set of JavaScript libraries for building and manipulating RDF and JSON-LD: jsonld.js for context-based JSON-LD processing; the RDF/JS Data Model spec for interoperable graph representation; Comunica for federated SPARQL querying; SPARQL.js for query parsing; rdflib.js for in-memory graph management; and N3.js for Turtle/N-Quads parsing and serialization. These tools are actively maintained (2023–2024) and form the core of the project’s programmatic and CLI data workflows.
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
Covers the complete SPARQL 1.1 family of W3C specifications—query, protocol, result formats, update, and Graph Store HTTP API—paired with Apache Jena ARQ and Fuseki deployment and tuning guides. These sources detail endpoint configuration, performance optimization, federated querying, and reasoning support. Critical for implementing robust SPARQL SELECT/ASK/UPDATE capabilities in both server and CLI modes.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0 (Apache Jena)

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Defines declarative validation of RDF graphs via SHACL shapes (Core and SPARQL-based constraints) and ShEx schemas. The shex.js library provides streaming validation with precise error reporting, ideal for integrating CI/CD checks and ensuring data integrity of generated ontology artifacts. SHACL (Oct 2017) and ShEx semantics (Feb 2020) form the foundation of this validation stack.
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
Comprehensive reference for Node.js core modules (fs for file I/O; http for HTTP servers/clients; url parsing; streams; ESM loader; performance hooks) and Web Platform specifications (WHATWG URL Standard; global Fetch API). These sources underpin the CLI file operations, HTTP endpoint implementations, module loading, and performance measurement required by the project. Verified against Node.js 20+ and WHATWG specs.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain)

# Vitest Testing Framework
## https://vitest.dev/api/
Provides a powerful, ESM-first test runner and assertion library with support for unit, integration, and HTTP endpoint testing. Features include mocking, spies, snapshots, coverage reports, watch mode, and parallel test execution. Vitest 3.x (2023–2024) integrates seamlessly with modern JavaScript tooling and is the basis for the project’s comprehensive test suite, enabling reliable validation of CLI, HTTP, and programmatic APIs.
## License if known
MIT

# JSON-LD Framing
## https://www.w3.org/TR/json-ld11-framing/
Specifies the JSON-LD framing algorithms for shaping and extracting subgraphs from complex JSON-LD documents (Dec 2020). Framing enables the definition of a static frame context to restructure data, merge values, and control container behavior programmatically. This is essential for building enhanced ontologies that require filtered or nested structures and ensures predictable output during serialization and processing.
## License if known
W3C Document License (CC-BY 4.0)
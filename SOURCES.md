# W3C Semantic Web Standards & JSON-LD
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-framing/
Provides the definitive W3C specifications for modeling, exchanging, and processing linked data as JSON-LD and OWL. RDF 1.1 Concepts (Feb 2014) defines the graph data model; OWL 2 Overview (Dec 2012) describes ontology profiles; SKOS Reference (Aug 2009) standardizes concept schemes; DCAT 2 (Feb 2023) prescribes dataset catalog metadata; JSON-LD 1.1 (May 2020) specifies syntax, contexts, and processing algorithms; JSON-LD Framing (Dec 2020) defines algorithms to extract and reshape subgraphs. This consolidated reference is authoritative for designing, serializing, and validating ontology artifacts across CLI, HTTP, and programmatic contexts.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices
## https://www.w3.org/TR/ld-bp/
Provides practical guidelines for publishing and consuming linked data on the Web, covering URI design, HTTP content negotiation, pagination, vocabulary versioning, and discovery. Emphasizes stable IRIs, human-readable metadata, caching, and negotiation patterns—directly informing REST endpoint design, middleware configuration, and JSON-LD context structuring to ensure reliable, discoverable ontology services.
## License if known
W3C Document License (CC-BY 4.0)

# JavaScript RDF & Linked Data Libraries
## https://github.com/digitalbazaar/jsonld.js#readme
## https://rdf.js.org/specification/data-model/
## https://comunica.dev/docs/query/framework/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://github.com/linkeddata/rdflib.js#readme
## https://github.com/rdfjs/N3.js#readme
A curated set of actively maintained (2023–2024) JavaScript libraries for manipulating RDF and JSON-LD: jsonld.js for context-based processing; RDF/JS Data Model for interoperable graph representations; Comunica for federated SPARQL querying; SPARQL.js for query parsing; rdflib.js for in-memory graph management; and N3.js for Turtle/N-Quads parsing and serialization. These tools underpin the project's programmatic and CLI data workflows.
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
Covers the complete SPARQL 1.1 family of W3C specifications—query, protocol, result formats, update, and Graph Store HTTP API—paired with Apache Jena ARQ and Fuseki deployment and tuning guides. These sources detail endpoint configuration, performance optimization, federated querying, and reasoning support, critical for robust SPARQL SELECT/ASK/UPDATE capabilities in both server and CLI modes.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0 (Apache Jena)

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Defines declarative validation of RDF graphs via SHACL shapes (Core and SPARQL-based constraints) and ShEx schemas. The shex.js library provides streaming validation with precise error reporting, ideal for integrating CI/CD checks and ensuring data integrity of generated ontology artifacts. SHACL (Oct 2017) and ShEx Semantics (Feb 2020) form the foundation of this validation stack.
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
Comprehensive reference for Node.js core modules (fs for file I/O; http for HTTP servers/clients; url parsing; streams; ESM loader; performance hooks; global fetch) and Web Platform specifications (WHATWG URL Standard). These sources underpin the CLI file operations, HTTP endpoint implementations, module loading, and performance measurement required by the project. Verified against Node.js 20+ and WHATWG specs.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain)

# Vitest Testing Framework
## https://vitest.dev/api/
Provides a powerful, ESM-first test runner and assertion library with support for unit, integration, and HTTP endpoint testing. Features include mocking, spies, snapshots, coverage reports, watch mode, and parallel test execution. Vitest 3.x (2023–2024) integrates seamlessly with modern JavaScript tooling and is the basis for the project’s comprehensive test suite, enabling reliable validation of CLI, HTTP, and programmatic APIs.
## License if known
MIT

# OWL 2 Functional-Style Syntax & RDF/XML Serialization
## https://www.w3.org/TR/owl2-syntax/
## https://www.w3.org/TR/owl2-xml/
Specifies the concrete syntaxes for OWL 2 ontologies—including the Functional-Style Syntax and the RDF/XML Serialization—and their mapping to the abstract ontology model. Last updated Dec 2012, these specifications are essential for serializing and parsing OWL artifacts, ensuring interoperability between JSON-LD outputs and RDF/XML or functional-style inputs in tooling and databases.
## License if known
W3C Document License (CC-BY 4.0)
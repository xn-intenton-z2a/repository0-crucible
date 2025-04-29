# W3C Semantic Web, OWL Profiles & JSON-LD Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-profiles/
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://www.w3.org/TR/json-ld11-framing/
This consolidated source delivers the definitive W3C Recommendations for modeling and serializing RDF graphs (RDF 1.1 Concepts), defining OWL ontologies (OWL 2 Profiles: DL, EL, QL, RL published December 2012), and working with JSON-LD documents (Core & API published July 2020, Framing published February 2019). It underpins context management, framing templates, compaction, expansion, and dataset normalization (URDNA2015), and defines the programmatic interfaces essential to the ontology build pipeline, serialization modules, and JSON-LD shaping operations. Last edited February 2019 – July 2020. Authoritative W3C Recommendation.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices & Hypermedia Vocabulary
## https://www.w3.org/TR/ld-bp/
## https://www.w3.org/TR/ldp/
## https://www.hydra-cg.com/spec/latest/core/
Comprehensive guidelines (W3C Linked Data Best Practices, February 2020) for HTTP-based Linked Data publication—including IRI design, content negotiation, pagination, versioning, caching, and discoverability patterns—combined with the Linked Data Platform (LDP 1.0, June 2015) container semantics and the Hydra Core Vocabulary (CC0) for hypermedia-driven REST APIs over RDF. Directly informs endpoint URL schemes, HTTP methods, headers, in-band metadata, and client navigation strategies. Widely adopted in the Linked Data community.
## License if known
W3C Document License (CC-BY 4.0); CC0/Public Domain

# Schema, Validation, RDF/OWL JavaScript Libraries & RDFJS Specifications
## https://github.com/colinhacks/zod#readme
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/zazuko/shacl-js#readme
## https://github.com/shexSpec/shex.js#readme
## https://github.com/zazuko/owljs#readme
## https://github.com/rdf-ext/rdf-ext#readme
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://github.com/linkeddata/rdflib.js
A unified reference combining runtime schema validation (Zod 3.x, MIT), graph-level constraints (SHACL W3C Recommendation, February 2023; ShEx CC0), and core RDFJS specifications for data model interfaces and stream processing. Actionable JavaScript libraries—Zod, SHACL-js, ShEx.js, OWLJS, RDF-Ext, and rdflib.js—provide type-safe parsing, streaming graph transformations, validation, and ontology manipulation aligned with the RDFJS ecosystem. Essential for building and validating RDF/OWL artifacts in both browser and Node.js environments. Last updated June 2024.
## License if known
MIT; CC0/Public Domain; W3C Document License (CC-BY 4.0)

# JSON-LD JavaScript Library (jsonld.js)
## https://github.com/digitalbazaar/jsonld.js#readme
The official JavaScript implementation of the JSON-LD API, maintained by Digital Bazaar. Provides robust support for JSON-LD 1.1 operations—including compaction, expansion, framing, flattening, and URDNA2015 normalization—as well as both Promise-based and callback-based interfaces. Critical for programmatic JSON-LD processing in Node.js and browsers, with extensive examples, performance notes, and interoperability guidelines. Last updated June 2024.
## License if known
MIT

# SPARQL Engines, Protocols & Frameworks
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/rdf11-http-rdf-update/
## https://www.w3.org/TR/turtle/
## https://www.w3.org/TR/n-quads/
## https://jena.apache.org/documentation/query/
## https://jena.apache.org/documentation/io/
## https://comunica.dev/docs/query/sparql/
This unified source consolidates W3C SPARQL 1.1 specifications (query, update, and protocol via the Graph Store HTTP API), standard serializations (Turtle & N-Quads), Apache Jena’s SPARQL and RIOT I/O documentation (Apache 2.0), and the Comunica query engine (modular federation, streaming results, MIT). Provides essential protocols, configuration details, query optimization strategies, and examples for both in-process and HTTP-based SPARQL operations. Published February 2013 – 2024.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0; MIT

# Web Platform, Protocol & Date-Time Standards
## https://nodejs.org/api/
## https://nodejs.org/api/esm.html
## https://fetch.spec.whatwg.org/
## https://tools.ietf.org/html/rfc7231
## https://tools.ietf.org/html/rfc3339
Merges Node.js Core (v20+) guides for filesystem, HTTP, streams, and the ESM loader architecture; the WHATWG Fetch standard for request/response streams; the IETF HTTP/1.1 semantics (RFC 7231) defining methods, status codes, headers, and content negotiation; and the internet timestamp profile (RFC 3339). Offers practical guidance for CLI I/O, HTTP server implementation, automated tests, mocks, RESTful endpoint design, and interoperable date-time formatting.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain); IETF Trust License

# Triplestore & Persistence Engines: Apache Jena TDB2 & Eclipse RDF4J
## https://jena.apache.org/documentation/tdb2/
## https://rdf4j.org/documentation/
Practical guides for configuring and using persistent triplestores: Jena TDB2 command-line tools and Java APIs for dataset management, transaction control, and high-performance querying (Apache 2.0), and Eclipse RDF4J setup, repository APIs, SHACL validation integration, and HTTP endpoint configuration (EPL). Crucial for the ontology persistence layer and SPARQL services.
## License if known
Apache 2.0; Eclipse Public License 2.0

# ROBOT: Release OWL Ontology Builder
## https://github.com/ontodev/robot#readme
ROBOT is a comprehensive CLI and Java library (Apache 2.0) for automating OWL ontology workflows: module extraction, reasoning, merging, format conversion, validation, and release packaging. Its best-practice patterns for ontology versioning, provenance tracking, and CI integration inform the repository’s pipeline, highlighting advanced merge strategies and validation steps. Last release 2024; widely adopted by the OBO Foundry community.
## License if known
Apache 2.0
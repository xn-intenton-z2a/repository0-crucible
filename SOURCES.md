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
Comprehensive guidelines (W3C Linked Data Best Practices, February 2020) for HTTP-based Linked Data publication—covering IRI design, content negotiation, pagination, versioning, caching, discoverability patterns—combined with the Linked Data Platform (LDP 1.0, June 2015) container semantics for managing RDF resources over HTTP and the Hydra Core Vocabulary (CC0) for hypermedia-driven REST APIs over RDF. Directly informs our endpoint URL schemes, HTTP methods, headers, in-band metadata, and client navigation strategies. Highly regarded in the Linked Data community.
## License if known
W3C Document License (CC-BY 4.0); CC0/Public Domain (Hydra)

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
A unified reference combining runtime schema validation (Zod 3.x, MIT), graph-level constraints (SHACL W3C Recommendation, February 2023; ShEx CC0), and core RDFJS specifications for data model interfaces (Terms, Quads) and stream processing. Actionable JavaScript libraries—jsonld.js, SHACL-js, ShEx.js, OWLJS, RDF-Ext—provide type-safe parsing, streaming graph transformations, validation, and ontology manipulation aligned with the RDFJS community standards. Essential for building and validating RDF/OWL artifacts in Node.js.
## License if known
MIT; CC0/Public Domain; W3C Document License (CC-BY 4.0)

# RDF Data Access, SPARQL & Serializations
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/rdf11-http-rdf-update/
## https://www.w3.org/TR/turtle/
## https://www.w3.org/TR/n-quads/
## https://jena.apache.org/documentation/query/
## https://jena.apache.org/documentation/io/
Unified SPARQL 1.1 query/update (February 2013), Graph Store HTTP API, Turtle (February 2014) and N-Quads (June 2014) serializations, plus Apache Jena RIOT I/O guides. Covers protocol details, result formats, pagination, CORS, and integration with public endpoints (e.g., DBpedia), enabling robust client/server SPARQL operations and RDF data import/export. 
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0 (Apache Jena)

# Node.js Core, ESM & Testing Standards
## https://nodejs.org/api/
## https://nodejs.org/api/esm.html
## https://fetch.spec.whatwg.org/
## https://vitest.dev/api/
Authoritative references for Node.js v20+ core modules (fs, http, streams), the ESM loader architecture, the WHATWG Fetch standard for request/response streams, and Vitest (MIT, 2023–2024) for ESM-first testing. Essential for implementing CLI I/O, HTTP servers, automated tests, mocks, snapshots, and performance profiling in our toolchain.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain); MIT

# Triplestore & Persistence Engines: Apache Jena TDB2 & Eclipse RDF4J
## https://jena.apache.org/documentation/tdb2/
## https://rdf4j.org/documentation/
Practical guides for configuring and using persistent triplestores. Includes Jena TDB2 (2024) command-line tools and Java APIs for dataset management, transaction control, and high-performance querying (Apache 2.0), and Eclipse RDF4J (4.x, 2023) setup, repository APIs, SHACL validation integration, and HTTP endpoint configuration (EPL). Crucial for backing the persistence layer of ontology snapshots and SPARQL services.
## License if known
Apache 2.0; Eclipse Public License 2.0

# Comunica SPARQL Framework
## https://comunica.dev/docs/query/sparql/
Comprehensive guide to the Comunica SPARQL framework (MIT), detailing its modular architecture, query mediation across diverse sources (HTTP, file, in-memory), custom engine configuration, and extension points. Includes examples for in-process and HTTP-based SPARQL queries, metadata extraction, streaming result handling, and optimization strategies. Last updated 2024, widely adopted in Linked Data applications.
## License if known
MIT

# HTTP/1.1 Semantics & Content Negotiation
## https://tools.ietf.org/html/rfc7231
The definitive IETF standard (RFC 7231, June 2014) for HTTP/1.1 semantics, defining methods (GET, POST, HEAD), status codes, headers (Accept, Content-Type, Cache-Control), and content negotiation mechanisms. Authoritative reference for designing RESTful APIs, error handling, and caching strategies aligned with web standards.
## License if known
IETF Trust License
# W3C Semantic Web, OWL Profiles & JSON-LD Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-profiles/
## https://www.w3.org/TR/json-ld11/
## https://www.w3.org/TR/json-ld11-api/
## https://www.w3.org/TR/json-ld11-framing/
This consolidated source delivers the definitive W3C Recommendations for modeling and serializing RDF graphs (RDF 1.1 Concepts), defining OWL ontologies (OWL 2 Profiles: DL, EL, QL, RL published December 2012), and working with JSON-LD documents (Core & API published July 2020, Framing published February 2019). It underpins context management, framing templates, compaction, expansion, and dataset normalization (URDNA2015), and defines the programmatic interfaces essential to the ontology build pipeline, serialization modules, and JSON-LD shaping operations.
Last edited February 2019 – July 2020. Authoritative W3C Recommendation.
## License if known
W3C Document License (CC-BY 4.0)

# Linked Data Best Practices & Hypermedia Vocabulary
## https://www.w3.org/TR/ld-bp/
## https://www.w3.org/TR/ldp/
## https://www.hydra-cg.com/spec/latest/core/
Comprehensive guidelines (W3C Linked Data Best Practices, February 2020) for HTTP-based Linked Data publication—including IRI design, content negotiation, pagination, versioning, caching, and discoverability patterns—combined with the Linked Data Platform (LDP 1.0, June 2015) container semantics and the Hydra Core Vocabulary (CC0) for hypermedia-driven REST APIs over RDF. Directly informs endpoint URL schemes, HTTP methods, headers, in-band metadata, and client navigation strategies. Widely adopted in the Linked Data community.
## License if known
W3C Document License (CC-BY 4.0); CC0/Public Domain

# Schema, Validation, JSON-LD & RDF/OWL JavaScript Libraries & RDFJS Specifications
## https://github.com/colinhacks/zod#readme
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/zazuko/shacl-js#readme
## https://github.com/shexSpec/shex.js#readme
## https://github.com/zazuko/owljs#readme
## https://github.com/rdf-ext/rdf-ext#readme
## https://rdf.js.org/data-model-spec/
## https://rdf.js.org/streams/spec/
## https://github.com/digitalbazaar/jsonld.js#readme
A unified reference combining runtime schema validation (Zod 3.x, MIT), graph-level constraints (SHACL W3C Recommendation, February 2023; ShEx CC0), core RDFJS specifications for data model interfaces and stream processing, and the official JSON-LD API implementation (jsonld.js, MIT). Actionable JavaScript libraries—Zod, SHACL-js, ShEx.js, OWLJS, RDF-Ext, rdflib.js, and jsonld.js—provide type-safe parsing, streaming graph transformations, framing, validation, and ontology manipulation aligned with the RDFJS ecosystem. Essential for building and validating RDF/OWL artifacts in both browser and Node.js environments.
Last updated June 2024.
## License if known
MIT; CC0/Public Domain; W3C Document License (CC-BY 4.0)

# SPARQL Engines, Triplestores & Persistence Frameworks
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-update/
## https://www.w3.org/TR/rdf11-http-rdf-update/
## https://www.w3.org/TR/turtle/
## https://www.w3.org/TR/n-quads/
## https://jena.apache.org/documentation/query/
## https://jena.apache.org/documentation/io/
## https://comunica.dev/docs/query/sparql/
## https://jena.apache.org/documentation/tdb2/
## https://rdf4j.org/documentation/
This unified source consolidates W3C SPARQL 1.1 specifications (query, update, protocol via the Graph Store HTTP API), standard serializations (Turtle & N-Quads), Apache Jena’s SPARQL and RIOT I/O documentation (Apache 2.0), the Comunica query engine (modular federation, streaming results, MIT), and practical guides for persistent triplestores: Jena TDB2 for dataset management, transaction control, and high-performance querying, alongside Eclipse RDF4J repository setups, SHACL validation integration, and HTTP endpoint configuration (EPL). Provides essential protocols, configuration details, optimization strategies, examples for both in-process and HTTP-based SPARQL operations, and persistence layer best practices.
Published February 2013 – 2024.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0; MIT; Eclipse Public License 2.0

# Web Platform, Protocol & Date-Time Standards
## https://nodejs.org/api/
## https://nodejs.org/api/esm.html
## https://fetch.spec.whatwg.org/
## https://tools.ietf.org/html/rfc7231
## https://tools.ietf.org/html/rfc3339
Merges Node.js Core (v20+) guides for filesystem, HTTP, streams, and the ESM loader architecture; the WHATWG Fetch standard for request/response streams; the IETF HTTP/1.1 semantics (RFC 7231) defining methods, status codes, headers, and content negotiation; and the internet timestamp profile (RFC 3339). Offers practical guidance for CLI I/O, HTTP server implementation, automated tests and mocks, RESTful endpoint design, and interoperable date-time formatting. Last reviewed March 2024.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); WHATWG Spec (Public Domain); IETF Trust License

# ROBOT: Release OWL Ontology Builder
## https://github.com/ontodev/robot#readme
ROBOT is a comprehensive CLI and Java library (Apache 2.0) for automating OWL ontology workflows: module extraction, reasoning, merging, format conversion, validation, and release packaging. Its best-practice patterns for ontology versioning, provenance tracking, and CI integration inform the repository’s pipeline, highlighting advanced merge strategies and validation steps. Last release 2024; widely adopted by the OBO Foundry community.
## License if known
Apache 2.0

# GraphDB & Amazon Neptune Graph Database REST & SPARQL Endpoints
## https://graphdb.ontotext.com/documentation/free/rest-api.html
## https://docs.aws.amazon.com/neptune/latest/userguide/access-graph-sparql-endpoint.html
Actionable documentation for hosted RDF triplestores: Ontotext GraphDB’s REST API covering repository management, data import/export, transaction control, and SPARQL query endpoints; and Amazon Neptune’s SPARQL protocol endpoint configuration, including IAM-based authentication, HTTP headers, error handling, and performance tuning. Provides concrete examples for high-throughput RDF ingestion and federated SPARQL query patterns in production environments. Last updated 2024.
## License if known
Ontotext GraphDB Documentation License (CC-BY 4.0); AWS Content License (CC-BY-SA 4.0)
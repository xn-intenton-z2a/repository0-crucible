# W3C RDF 1.1 & OWL 2 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/owl2-rdf-based-semantics/
## https://www.w3.org/TR/owl2-syntax/
## https://www.w3.org/TR/owl2-profiles/
A consolidated reference of W3C Recommendations for the RDF 1.1 data model and all OWL 2 ontology semantics, profiles, and syntaxes. This source is the definitive guide for constructing RDF graphs, serializing in Turtle/RDF/XML/JSON-LD, authoring OWL ontologies, and selecting tractable OWL 2 Profiles (EL/QL/RL) for scalable reasoning and query optimization. (Last updates: RDF 1.1 Concepts Feb 2014; OWL 2 Semantics Dec 2012.)
## License
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Core & jsonld.js
## https://www.w3.org/TR/json-ld11/
## https://github.com/digitalbazaar/jsonld.js#readme
Defines the JSON-LD 1.1 Core and API, including framing, compaction, expansion, and the URDNA2015 normalization algorithm. The jsonld.js library provides a production-ready Node.js implementation with pluggable document loaders, streaming support, and robust error handling. Essential for ingesting and outputting JSON-LD artifacts in OWL-builder’s pipelines. (JSON-LD 1.1 May 2020; jsonld.js v1.8.1 Apr 2024.)
## License
W3C Document License (CC-BY 4.0); MIT License

# SPARQL 1.1 & HTTP Server Deployments
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-results-json/
## https://jena.apache.org/documentation/fuseki2/
## https://graphdb.ontotext.com/documentation/standard/
Covers the SPARQL 1.1 query, update, HTTP and Graph Store protocols, and demonstrates deployment guides for Apache Jena Fuseki and Ontotext GraphDB. Includes endpoint configuration, authentication, CORS, federation patterns, performance tuning, resilient client best practices, and the SPARQL JSON Result Format spec—vital for integrating SPARQL queries, updates, and result handling in CLI, API, and server modes. (SPARQL specs Mar 2013; Fuseki 4.x; GraphDB 2023.)
## License
W3C Document License (CC-BY 4.0); Apache License 2.0; GraphDB Documentation License

# JavaScript & RDF/JS Ecosystem
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/http.html
## https://fetch.spec.whatwg.org/
## https://rdf.js.org/data-model-spec/
## https://comunica.dev/docs/query/framework
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://linkeddata.github.io/rdflib.js/
## https://github.com/rdfjs/N3.js#readme
## https://github.com/antoniogarrote/sparqlalgebrajs#readme
An integrated reference for Node.js core modules (fs, http, global fetch via WHATWG), the RDF/JS Data Model and Streams specs, plus key JS libraries: Comunica federated query engine, SPARQL.js parser, rdflib.js graph toolkit, N3.js parser/serializer for Turtle and N-Quads, and sparqlalgebrajs for transforming query syntax into algebra. Crucial for building streaming RDF workflows, programmatic SPARQL construction/optimization, and robust HTTP/CLI tooling. (Node.js v20; RDF/JS Jan 2022; Comunica 2024; SPARQL.js 2023; rdflib.js 2024; N3.js 2024.)
## License
MIT License (Node.js, Comunica, SPARQL.js, rdflib.js, N3.js, sparqlalgebrajs); WHATWG License (Fetch); CC0/Public Domain (RDF/JS Streams)

# Linked Data Platform & Hydra
## https://www.w3.org/TR/ldp/
## https://www.hydra-cg.com/spec/latest/core/
Defines RESTful patterns for managing RDF resources via HTTP (LDP), including content negotiation, container semantics, and CRUD operations, alongside the Hydra Core Vocabulary for hypermedia-driven APIs. Indispensable for designing self-describing, discoverable OWL-builder HTTP endpoints. (LDP Jun 2015; Hydra Apr 2024.)
## License
W3C Document License (CC-BY 4.0); CC0/Public Domain

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Covers SHACL for declarative graph validation (shapes, constraints, conformance tests) and ShEx (compact syntax, JSON/Turtle serializations), with the shex.js library offering streaming validation and precise error reporting. Essential for enforcing ontology and data integrity in CI/CD pipelines. (SHACL Oct 2017; ShEx 2020; shex.js v4.x 2023.)
## License
W3C Document License (CC-BY 4.0); CC0/Public Domain (ShEx spec); MIT License (shex.js)

# Java-based RDF & OWL Frameworks
## https://jena.apache.org/documentation/arq/
## https://jena.apache.org/documentation/tdb2/
## https://rdf4j.org/documentation/programmers-guide/
## https://github.com/owlcs/owlapi#readme
A comprehensive overview of Java libraries for RDF and OWL: Apache Jena (ARQ SPARQL engine, TDB2 storage, Fuseki HTTP server), Eclipse RDF4J (Java APIs for repositories, Sail layers, inferencing, Spring integration), and the OWL API (ontology creation, manipulation, serialization, and reasoner integration). Provides deep insights into clustering, transaction management, custom functions, and best practices for extensibility and performance tuning. (ARQ/TDB2 2023; RDF4J 4.x 2023; OWL API 5.x 2024.)
## License
Apache License 2.0; Eclipse Public License 2.0

# SKOS & DCAT Vocabularies
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
Defines the SKOS model for concept schemes, hierarchical and associative concept relations, and labeling, as well as the Data Catalog Vocabulary (DCAT) for describing datasets, distributions, and catalogs. Essential for modeling and publishing metadata-driven datasets, driving discoverability, interoperability, and linked data best practices. (SKOS Aug 2009; DCAT Feb 2023.)
## License
W3C Document License (CC-BY 4.0)
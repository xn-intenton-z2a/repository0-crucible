# W3C RDF and SPARQL Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/sparql11-query/
Combines the RDF 1.1 Concepts and SPARQL 1.1 Query Language specifications. Defines the RDF data model and SPARQL syntax and semantics, including serialization formats, parsing algorithms, query forms (SELECT, CONSTRUCT, ASK, DESCRIBE), aggregates, and property paths. Essential for implementing low-level triple stores, parsers/serializers, and SPARQL query engines. Published as W3C Recommendations on 25 February 2014 (RDF Concepts) and 21 March 2013 (SPARQL); the definitive authoritative references.
## W3C Document License 1.0

# W3C OWL 2 Specifications
## https://www.w3.org/TR/owl2-primer/
## https://www.w3.org/TR/owl2-syntax/
Includes the OWL 2 Web Ontology Language Primer and Structural Specification, providing modeling examples, syntactic grammars (Functional, Manchester, Turtle), and RDF mapping. Offers concrete guidance for ontology design, validation, and serialization. Published 11 December 2012 as W3C Recommendations; the canonical OWL 2 references.
## W3C Document License 1.0

# JSON-LD Ecosystem
## https://www.w3.org/TR/json-ld11/
## https://github.com/digitalbazaar/jsonld.js#readme
The JSON-LD 1.1 specification defines graph serialization in JSON, covering contexts, compaction/expansion algorithms, framing, and best practices. The jsonld.js library implements these algorithms in JavaScript, offering methods like expand, compact, flatten, frame, and toRDF, with examples for streaming large graphs and custom contexts. Essential for transforming between JSON-LD and RDF in the CLI tool. Spec last updated 16 July 2020; library updated June 2024.
## Mixed (W3C Document License 1.0 & MIT)

# JavaScript RDF & SPARQL Libraries
## https://rdf.js.org/data-model-spec/
## https://github.com/linkeddata/rdflib.js#readme
## https://comunica.dev/docs/query/
## https://github.com/RubenVerborgh/SPARQL.js#readme
Consolidates the RDF/JS Data Model Specification with three key libraries: rdflib.js for parsing, serialization, and in-memory graph storage; Comunica for federated SPARQL query execution across diverse sources; and SPARQL.js for parsing SPARQL queries into ASTs. Offers factory interfaces, query engine configuration, and examples for integrating SPARQL in Node.js and browsers. Specs and libraries last updated 2024.
## Mixed (Public Domain & MIT)

# Node.js HTTP & External Data Sources
## https://nodejs.org/api/globals.html#fetch
## https://restcountries.com/
## https://en.wikipedia.org/api/rest_v1/#/
Official Node.js global fetch API documentation covers request/response streaming, error handling, and AbortController for robust HTTP operations. The REST Countries API and Wikipedia REST API provide JSON endpoints for country and encyclopedic data, respectively, with filtering, pagination, and field selection. Critical for implementing the --fetch feature, including handling large datasets and API parameters. Node docs updated for v20; REST APIs public domain.
## Node.js Foundation License & Public Domain

# Apache Jena Documentation
## https://jena.apache.org/documentation/
## https://jena.apache.org/documentation/query/
The Apache Jena framework offers a Java-based RDF API with storage (TDB), inference (OWL reasoning), and the ARQ SPARQL engine. Documentation covers API usage for building models, ontology reasoning, SPARQL query execution, and performance tuning. Provides benchmarks, configuration parameters, and code examples to inform CLI implementation strategies and optimization patterns. Latest documentation as of 2024 under Apache License 2.0.
## Apache License 2.0

# Ontology Validation with Zod
## https://github.com/colinhacks/zod#readme
Zod is a TypeScript-first schema validation library. Its README demonstrates defining strict schemas, parsing JSON inputs, and handling validation errors with clear diagnostics. Ideal for enforcing JSON structure before ontology construction, ensuring input data conforms to expected shapes and types. Last updated May 2024.
## MIT License

# Python RDFLib
## https://rdflib.readthedocs.io/en/stable/
The RDFLib Python library provides a mature API for RDF graph manipulation, SPARQL querying, and ontology reasoning. Documentation includes tutorials for graph creation, namespace management, serializing in various RDF formats, and SPARQL endpoint integration. Offers insight into API design patterns, backend storage options, and performance considerations, serving as a reference for feature parity in the JavaScript CLI. Last updated 2024.
## BSD License
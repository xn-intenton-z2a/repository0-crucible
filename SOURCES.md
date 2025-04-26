# W3C RDF and SPARQL Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/sparql11-query/
Combines the RDF 1.1 Concepts and SPARQL 1.1 Query Language recommendations, defining the abstract RDF data model, term types, and the full suite of SPARQL query forms (SELECT, CONSTRUCT, ASK, DESCRIBE), aggregates, property paths, and result serializations. This source is the definitive guide to implementing compliant triple stores, parsers, serializers, and query engines, offering precise syntax, semantics, and algorithmic guidelines. Published as W3C Recommendations on 25 February 2014 (RDF Concepts) and 21 March 2013 (SPARQL); these are the authoritative references for RDF/SPARQL implementations.
## W3C Document License 1.0

# W3C OWL 2 Specifications
## https://www.w3.org/TR/owl2-primer/
## https://www.w3.org/TR/owl2-syntax/
Includes the OWL 2 Web Ontology Language Primer and Structural Specification, providing concrete modeling examples, grammar definitions (Functional, Manchester, Turtle), and RDF mapping rules. Essential for designing, serializing, and validating ontologies, guiding both authorship and tooling on class hierarchies, property characteristics, and inference profiles. Published 11 December 2012 as W3C Recommendations; these are the canonical OWL 2 references.
## W3C Document License 1.0

# JSON-LD Ecosystem
## https://www.w3.org/TR/json-ld11/
## https://github.com/digitalbazaar/jsonld.js#readme
The JSON-LD 1.1 specification outlines the context mechanisms, compaction/expansion algorithms, framing, and RDF conversion rules. The jsonld.js library concretely implements these algorithms in JavaScript, offering methods like `expand`, `compact`, `flatten`, `frame`, and `toRDF`, with streaming strategies for large graphs and custom context handling. Critical for transforming between JSON and RDF/OWL representations in the CLI. Spec last updated 16 July 2020; library updated June 2024.
## Mixed (W3C Document License 1.0 & MIT)

# Node.js Core APIs for HTTP, Streams, and ESM
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/process.html
## https://nodejs.org/api/esm.html
This collection covers the built-in fetch API for robust HTTP requests (streaming, AbortController, error handling), the Stream module for efficient data piping and transformation, the File System module for file I/O via `createReadStream`/`createWriteStream`, the Process module for accessing runtime info (versions, environment variables, CLI arguments), and ESM loader details (`import.meta.url`, package exports). These are foundational for implementing the CLI’s `--fetch`, file globbing, streaming large JSON payloads, diagnostics, and module resolution patterns. Documentation current for Node.js v20.
## Node.js Foundation License

# RDF & SPARQL Engines and Client Libraries
## https://rdf.js.org/data-model-spec/
## https://github.com/linkeddata/rdflib.js#readme
## https://comunica.dev/docs/query/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://jena.apache.org/documentation/
## https://jena.apache.org/documentation/query/
## https://www.w3.org/TR/sparql11-protocol/
Consolidates the RDF/JS Data Model Specification, leading JavaScript libraries (rdflib.js for parsing, serialization, and in-memory storage; Comunica for federated SPARQL query execution; SPARQL.js for parsing SPARQL into AST), the Apache Jena framework (TDB storage, OWL reasoning, ARQ SPARQL engine), and the W3C SPARQL 1.1 Protocol for HTTP‐based query services. Provides interfaces, engine configuration patterns, HTTP query semantics, and integration examples for Node.js, browser, and standalone server environments. This combined reference supports building, querying, and serving RDF data with consistent API and protocol compliance. Specs and libraries are current as of 2024.
## Mixed (Public Domain, MIT, Apache License 2.0, W3C Document License 1.0)

# Ontology Validation with Zod
## https://github.com/colinhacks/zod#readme
Zod is a TypeScript-first schema validation library demonstrating strict schema definitions, parsing strategies, and rich error diagnostics. Its examples cover nested object validation, parsing unknown JSON inputs, and custom error mapping. Ideal for enforcing input shapes before ontology construction, ensuring robust JSON-to-OWL pipelines. Last updated May 2024.
## MIT License

# Key Utility Libraries for CLI Parsing and Pattern Matching
## https://github.com/tj/commander.js#readme
## https://github.com/isaacs/minimatch#readme
Commander.js provides a declarative API for defining commands, flags, default values, and help text, streamlining CLI interface design. Minimatch enables UNIX-like glob pattern matching for file selection (`--merge-persist`), supporting negation, brace expansion, and extended patterns. Together, they underpin argument validation, help generation, and input file resolution. Both libraries are widely adopted and maintained with comprehensive examples.
## MIT License

# Python RDFLib Documentation
## https://rdflib.readthedocs.io/en/stable/
The RDFLib project provides a comprehensive Python library for RDF graph creation, parsing, serialization, SPARQL querying, and triple store backends. It demonstrates core abstractions for graph manipulation, format plugins (Turtle, XML, JSON-LD), and dataset stores. Valuable as a design and integration reference for graph operations and storage strategies. Documentation updated continuously; licensed under BSD.
## BSD License
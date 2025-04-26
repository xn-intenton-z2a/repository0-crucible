# W3C RDF 1.1 and SPARQL 1.1 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/sparql11-query/
Defines the abstract RDF 1.1 data model, term types, and SPARQL 1.1 query language forms (SELECT, CONSTRUCT, ASK, DESCRIBE), property paths, aggregates, and result serializations. This source is the authoritative reference for building compliant RDF parsers, serializers, triple stores, and query engines, providing precise syntax, semantics, and algorithmic guidelines. Last updated: 25 February 2014 (RDF Concepts), 21 March 2013 (SPARQL Query); authoritative W3C Recommendations.
## W3C Document License 1.0

# W3C OWL 2 Specifications
## https://www.w3.org/TR/owl2-primer/
## https://www.w3.org/TR/owl2-syntax/
Provides the OWL 2 Web Ontology Language Primer and Structural Specification, including concrete modeling examples, grammar definitions (Functional, Manchester, Turtle), and RDF mapping rules. Essential for designing, serializing, and validating ontologies, guiding both authorship and tool implementation on class hierarchies, property characteristics, and reasoning profiles. Last updated: 11 December 2012; canonical W3C Recommendations.
## W3C Document License 1.0

# JSON-LD 1.1 Specification and jsonld.js Implementation
## https://www.w3.org/TR/json-ld11/
## https://github.com/digitalbazaar/jsonld.js#readme
Outlines JSON-LD context mechanisms, compaction/expansion algorithms, framing, and RDF conversion rules, with the jsonld.js library offering concrete JavaScript implementations (`expand`, `compact`, `flatten`, `frame`, `toRDF`) and streaming strategies for large graphs. Critical for seamless JSON-to-RDF transformations in the CLI. Spec last updated: 16 July 2020; library updated: June 2024.
## Mixed (W3C Document License 1.0 & MIT)

# Node.js Core APIs for HTTP, Streams, and ESM
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/process.html
## https://nodejs.org/api/esm.html
Covers the built-in Fetch API for HTTP requests (streaming, AbortController, error handling), Stream module for efficient data piping, File System module (`createReadStream`/`createWriteStream`), Process module for runtime metadata and CLI arguments, and ESM loader features (`import.meta.url`, package exports). Foundational for implementing the `--fetch` flag, file I/O, streaming JSON payloads, diagnostics, and module resolution. Documentation current for Node.js v20.
## Node.js Foundation License

# RDF/JS Data Model & Client Libraries
## https://rdf.js.org/data-model-spec/
## https://github.com/linkeddata/rdflib.js#readme
## https://comunica.dev/docs/query/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://jena.apache.org/documentation/
## https://www.w3.org/TR/sparql11-protocol/
Consolidates the RDF/JS Data Model specification and leading JavaScript libraries: rdflib.js for parsing, serialization, and in-memory storage; Comunica for federated SPARQL execution; SPARQL.js for parsing SPARQL into AST; Apache Jena (TDB storage, OWL reasoning, ARQ engine); and the SPARQL 1.1 Protocol for HTTP-based query services. Provides interfaces, engine configuration patterns, and integration examples across Node.js, browser, and server environments. Specs and libraries current as of 2024.
## Mixed (Public Domain, MIT, Apache License 2.0, W3C Document License 1.0)

# Ontology Validation with Zod
## https://github.com/colinhacks/zod#readme
Demonstrates TypeScript-first schema validation with strict definitions, parsing strategies, and rich error diagnostics. Covers nested object validation, unknown JSON parsing, and custom error mapping, ideal for enforcing shape constraints before OWL ontology construction. Last updated: May 2024.
## MIT License

# Key Utility Libraries for CLI Parsing and Pattern Matching
## https://github.com/tj/commander.js#readme
## https://github.com/isaacs/minimatch#readme
Commander.js offers a declarative API for commands, flags, defaults, and help text, while Minimatch provides UNIX-like globbing (`--merge-persist`) with negation, brace expansion, and extended patterns. Together they enable robust CLI interfaces, argument validation, and file selection. Widely adopted with comprehensive examples.
## MIT License

# REST Countries API v3
## https://restcountries.com/#api-endpoints-v3-all
Offers RESTful endpoints to retrieve comprehensive country data (e.g., `/all` returns JSON arrays of countries with properties like `name`, `capital`, `region`, and `population`). Includes parameters for fields filtering, localization, sample responses, and error codes. Essential for implementing the `--fetch capitalCities` feature and transforming country data into OWL individuals. Public domain; see API terms for usage.
## CC0 1.0 Universal
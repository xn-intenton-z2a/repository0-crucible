# W3C RDF 1.1 and SPARQL 1.1 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/sparql11-query/
Defines the abstract RDF 1.1 data model, term types, and the SPARQL 1.1 query language constructs (SELECT, CONSTRUCT, ASK, DESCRIBE), property paths, aggregates, and result serializations. This is the authoritative reference for building compliant RDF parsers, serializers, triple stores, and query engines, providing precise syntax, semantics, and algorithmic guidelines. Last updated: 25 February 2014 (RDF Concepts), 21 March 2013 (SPARQL Query); authoritative W3C Recommendations.
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
Covers the built-in Fetch API for HTTP requests (streaming support, AbortController integration, error handling), the Stream module for efficient data piping, File System APIs (`createReadStream`/`createWriteStream`), Process module (`process.argv`, `process.env`), and ESM loader features (`import.meta.url`, package exports). Foundational for implementing the CLI's `--fetch`, file I/O, streaming JSON payloads, diagnostics, and module resolution. Documentation current for Node.js v20.
## Node.js Foundation License

# RDF/JS Data Model & Client Libraries
## https://rdf.js.org/data-model-spec/
## https://github.com/linkeddata/rdflib.js#readme
## https://comunica.dev/docs/query/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://jena.apache.org/documentation/
## https://www.w3.org/TR/sparql11-protocol/
Consolidates the RDF/JS Data Model specification with leading JavaScript libraries: rdflib.js for parsing, serialization, and in-memory storage; Comunica for federated SPARQL execution; SPARQL.js for parsing SPARQL into AST; Apache Jena (TDB storage, OWL reasoning, ARQ engine); and the SPARQL 1.1 Protocol for HTTP-based query services. Provides interfaces, engine configuration patterns, and integration examples across Node.js, browser, and server environments. Specs and libraries current as of 2024.
## Mixed (Public Domain, MIT, Apache License 2.0, W3C Document License 1.0)

# CLI and Validation Libraries for Node.js
## https://github.com/tj/commander.js#readme
## https://github.com/isaacs/minimatch#readme
## https://github.com/colinhacks/zod#readme
Provides a unified suite of tools for robust CLI interfaces, file pattern matching, and JSON schema validation: Commander.js offers declarative command, option, and help text definitions; Minimatch enables extended glob patterns with negation and brace expansion; Zod delivers TypeScript-first schema definitions, parsing strategies, and rich error diagnostics. Essential for implementing and validating CLI flags, file filtering (`--merge-persist`), and enforcing ontology input shapes. Last updated: Commander.js v10.0.0 (March 2024); Minimatch v9.0.5 (May 2024); Zod v3.24.3 (May 2024); widely adopted across Node.js projects.
## MIT License

# REST Countries API v3
## https://restcountries.com/#api-endpoints-v3-all
Offers RESTful endpoints to retrieve comprehensive country data (e.g., `/all` returns JSON arrays of countries with properties like `name`, `capital`, `region`, and `population`). Includes query parameters for field filtering, localization, sample responses, and error codes. Essential for implementing the `--fetch capitalCities` feature and transforming country data into OWL individuals based on standardized schemas. Last updated: February 2024; public domain (CC0 1.0 Universal).
## CC0 1.0 Universal

# Vitest Testing Framework Documentation
## https://vitest.dev/
Comprehensive guide to unit, integration, and end-to-end testing with Vitest. Covers test definitions, module mocking, spies, snapshot testing, and V8-powered code coverage reports, along with configuration via `vitest.config.ts`, watch mode, and performance optimizations. Critical for writing and maintaining reliable tests for each CLI feature (`--fetch`, `--refresh`, `--validate`, `--serve`, `--query`), ensuring high test coverage and robust error handling. Last updated: 2024; maintained by the Vitest core team.
## MIT License
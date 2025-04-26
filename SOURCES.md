# W3C RDF 1.1 and SPARQL 1.1 Specifications
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/sparql11-query/
Defines the RDF 1.1 data model (IRIs, literals, blank nodes), term types, graph concepts, and SPARQL 1.1 query language constructs (SELECT, CONSTRUCT, ASK, DESCRIBE), property paths, aggregates, and result serializations. This authoritative W3C Recommendation provides precise syntax, semantics, formal grammar, and algorithmic guidelines—crucial for implementing compliant RDF parsers, serializers, triple stores, and SPARQL engines. Last updated: 25 February 2014 (RDF Concepts), 21 March 2013 (SPARQL Query).
## W3C Document License 1.0

# W3C OWL 2 Specifications
## https://www.w3.org/TR/owl2-primer/
## https://www.w3.org/TR/owl2-syntax/
Presents the OWL 2 Web Ontology Language Primer with modeling patterns and the OWL 2 Structural Specification, covering the Manchester, Functional, and Turtle syntaxes, plus RDF mapping rules. Essential for designing, serializing, validating, and reasoning over ontologies—providing concrete examples, class/property constructs, and recommended reasoning profiles. Last updated: 11 December 2012; canonical W3C Recommendation.
## W3C Document License 1.0

# JSON-LD 1.1 Specification and jsonld.js Implementation
## https://www.w3.org/TR/json-ld11/
## https://github.com/digitalbazaar/jsonld.js#readme
Details JSON-LD context mechanisms, expansion/compaction algorithms, framing, and RDF conversion rules. The jsonld.js library offers JavaScript implementations (`expand`, `compact`, `flatten`, `frame`, `toRDF`), streaming strategies, and performance tips for large graphs—critical for seamless JSON-to-RDF transformation in the CLI. Spec last updated: 16 July 2020; library updated: June 2024.
## Mixed (W3C Document License 1.0 & MIT)

# Node.js Core APIs for HTTP Client/Server, Streams, File System, Process, and ESM
## https://nodejs.org/api/http.html
## https://nodejs.org/api/globals.html#fetch
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/process.html
## https://nodejs.org/api/esm.html
Covers the built-in HTTP module for creating RESTful APIs and web servers (`createServer`, routing basics), the Fetch API (streamed responses, AbortController), the Stream module for efficient data piping, File System streams (`createReadStream`/`createWriteStream`), Process utilities (`argv`, `env`, signals), and ESM loader features (`import.meta.url`, `package.json` exports). Foundational for implementing `--serve`, `--fetch`, file I/O, streaming JSON payloads, diagnostics, and modular loader behavior. Documentation current for Node.js v20.
## Node.js Foundation License

# RDF/JS Data Model & Client Libraries
## https://rdf.js.org/data-model-spec/
## https://github.com/linkeddata/rdflib.js#readme
## https://comunica.dev/docs/query/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://jena.apache.org/documentation/
## https://www.w3.org/TR/sparql11-protocol/
Consolidates the RDF/JS Data Model specification with major JavaScript libraries: rdflib.js for parsing/serialization and in-memory stores; Comunica for federated SPARQL execution; SPARQL.js for parsing SPARQL into AST; and Apache Jena (TDB storage, ARQ engine). Also details the SPARQL 1.1 Protocol for HTTP-based query services. Provides interfaces, configuration patterns, and integration examples across Node.js and browsers. Specs and libraries current as of 2024.
## Mixed (Public Domain, MIT, Apache License 2.0, W3C Document License 1.0)

# Developer Tooling for CLI, Validation, and Testing
## https://github.com/tj/commander.js#readme
## https://github.com/isaacs/minimatch#readme
## https://github.com/colinhacks/zod#readme
## https://vitest.dev/
A unified suite for building robust CLI interfaces, file pattern matching, JSON schema validation, and automated testing. Commander.js provides declarative commands, options, and help generation; Minimatch supports advanced glob patterns; Zod enables TypeScript-first schema definitions and rich error diagnostics; Vitest offers unit/integration test definitions, mocking, spies, snapshot testing, and V8-powered coverage. Essential for implementing, validating, and testing all CLI features with high reliability. Last updated: Commander.js v10.0.0 (Mar 2024), Minimatch v9.0.5 (May 2024), Zod v3.24.3 (May 2024), Vitest v3.1.2 (2024).
## MIT License

# REST Countries API v3
## https://restcountries.com/#api-endpoints-v3-all
Offers RESTful endpoints to retrieve global country data: `/all` returns JSON arrays with fields like `name`, `capital`, `region`, and `population`. Supports field filtering, localization, rate limits, and error codes. Essential for `--fetch capitalCities` and transforming country data into OWL individuals with standardized schemas. Last updated: February 2024; public domain (CC0 1.0 Universal).
## CC0 1.0 Universal
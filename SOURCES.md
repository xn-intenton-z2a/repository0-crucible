# W3C Core Semantic Web Vocabularies
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
Provides the foundational standards for linked data modeling, ontology semantics, and dataset cataloging. RDF 1.1 Concepts (Feb 2014) defines the graph data model and term syntax; OWL 2 Overview (Dec 2012) details ontology profiles and reasoning; SKOS Reference (Aug 2009) standardizes concept schemes; DCAT 2 (Feb 2023) specifies dataset catalogs. Critical for interoperable JSON-LD and OWL artifact design, ontology definition, and metadata management. Authoritative via W3C Working Groups.
## License if known
W3C Document License (CC-BY 4.0)

# JSON-LD 1.1 Core & Processing Algorithms
## https://www.w3.org/TR/json-ld11/
The definitive specification for JSON-LD 1.1 data modeling and processing, including the expand, compact, flatten, frame, and normalize algorithms. It details syntax rules, context definitions, processor requirements, and JSON-LD/URI interplay, enabling reliable serialization and deserialization of RDF and OWL ontologies in JSON. Last updated May 2020. Recognized by the W3C Semantic Web Community.
## License if known
W3C Document License (CC-BY 4.0)

# JavaScript RDF & Linked Data Libraries
## https://github.com/digitalbazaar/jsonld.js#readme
## https://rdf.js.org/specification/data-model/
## https://comunica.dev/docs/query/framework/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://github.com/linkeddata/rdflib.js#readme
## https://github.com/rdfjs/N3.js#readme
This curated set of JavaScript libraries facilitates working with RDF, JSON-LD, and SPARQL in Node.js. jsonld.js handles context framing and compaction; the RDF/JS Data Model spec ensures graph interoperability; Comunica provides federated SPARQL querying; SPARQL.js parses queries; rdflib.js manages in-memory graphs; N3.js parses and serializes Turtle/N-Quads. Essential for in-app JSON-LD OWL generation, streaming data workflows, and SPARQL integration. Actively maintained (2023–2024).
## License if known
MIT; CC0/Public Domain (per library)

# SPARQL 1.1 & Enterprise RDF Stores
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-results-json/
## https://jena.apache.org/documentation/query/
## https://jena.apache.org/documentation/fuseki2/
## https://graphdb.ontotext.com/documentation/standard/
## https://docs.stardog.com
Comprehensive resources for SPARQL 1.1 querying, updates, protocols, and JSON result formats, paired with deployment guides for Apache Jena ARQ, Fuseki, GraphDB, and Stardog. Covers endpoint configuration, federated queries, performance tuning, reasoning support, high-availability clustering, and security best practices. Specs published Mar 2013; deployments updated through 2024.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0; GraphDB Documentation License; Stardog Documentation License

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Defines declarative validation of RDF graphs using SHACL shapes (Core and SPARQL-based constraints) and concise ShEx schemas. The shex.js library offers streaming validation with detailed error reporting ideal for CI/CD pipelines and data integrity checks of JSON-LD OWL artifacts. SHACL published Oct 2017; ShEx semantics Feb 2020; shex.js v4.x (2023).
## License if known
W3C Document License (CC-BY 4.0); CC0/Public Domain; MIT

# Schema.org Vocabulary
## https://schema.org/docs/full.html
The canonical enumeration of 800+ types and 1500+ properties for structured web data and knowledge graph enrichment. Includes JSON-LD examples, extension guidelines, and best practices for custom domains, facilitating SEO and linking OWL JSON-LD outputs to web resources. Last updated 2024; widely adopted across platforms.
## License if known
CC0 Public Domain

# Node.js Platform & Performance APIs
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/http.html
## https://nodejs.org/api/url.html
## https://nodejs.org/api/stream.html
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://url.spec.whatwg.org/multipage/
## https://nodejs.org/api/perf_hooks.html
An integrated reference for Node.js core modules (fs for file I/O; http for servers/clients; url for parsing; streams for I/O pipelines), the Fetch API for HTTP interactions, the WHATWG URL Standard, and the Performance Hooks API (performance.now, marks, measures). Essential for CLI file operations, HTTP endpoint streaming, latency measurement in diagnostics, and robust resource handling. Verified against Node.js v20+ and WHATWG specs.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); MDN Web Docs (CC-BY-SA 2.5); WHATWG Spec (Public Domain)

# Vitest Testing Framework
## https://vitest.dev/
Documentation for Vitest, the fast, Vite-native test runner powering unit and integration tests in this project. Covers configuration, mocking strategies, assertion APIs, snapshot testing, coverage reporting, and ESM compatibility. Enables reliable testing of CLI commands, HTTP streams, and asynchronous APIs. Updated 2024; maintained by the Vitest community.
## License if known
MIT
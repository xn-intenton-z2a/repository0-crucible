# W3C Core Semantic Web Vocabularies
## https://www.w3.org/TR/rdf11-concepts/
## https://www.w3.org/TR/owl2-overview/
## https://www.w3.org/TR/skos-reference/
## https://www.w3.org/TR/vocab-dcat-2/
Provides a consolidated reference for foundational Semantic Web standards: RDF 1.1 Concepts for graph data models, OWL 2 overview for ontology semantics, SKOS for concept schemes, and DCAT 2 for dataset catalogs. Essential for designing interoperable JSON-LD OWL artifacts, defining vocabularies, and managing dataset metadata. Last updated: RDF 1.1 (Feb 2014), OWL 2 (Dec 2012), SKOS (Aug 2009), DCAT 2 (Feb 2023). Recognized as authoritative by W3C working groups.
## License if known
W3C Document License (CC-BY 4.0)

# JavaScript RDF & JSON-LD Ecosystem
## https://www.w3.org/TR/json-ld11/
## https://github.com/digitalbazaar/jsonld.js#readme
## https://rdf.js.org/specification/data-model/
## https://comunica.dev/docs/query/framework/
## https://github.com/RubenVerborgh/SPARQL.js#readme
## https://github.com/linkeddata/rdflib.js#readme
## https://github.com/rdfjs/N3.js#readme
A unified reference combining the JSON-LD 1.1 Core specification with leading JavaScript libraries for RDF handling: jsonld.js for framing and compaction, the RDF/JS Data Model interface, Comunica for federated SPARQL queries, SPARQL.js parser, rdflib.js for graph operations, and N3.js for Turtle/N-Quads parsing and serialization. Critical for programmatic JSON-LD OWL artifact generation, streaming, and SPARQL integration. Last updated: JSON-LD 1.1 (May 2020), rdf.js (Jan 2022), Comunica (2024), SPARQL.js (2023), rdflib.js (2024), N3.js (2024).
## License if known
W3C Document License (CC-BY 4.0); MIT; CC0/Public Domain

# SPARQL 1.1 & Server Deployments
## https://www.w3.org/TR/sparql11-overview/
## https://www.w3.org/TR/sparql11-protocol/
## https://www.w3.org/TR/sparql11-results-json/
## https://jena.apache.org/documentation/fuseki2/
## https://graphdb.ontotext.com/documentation/standard/
Comprehensive coverage of SPARQL 1.1 Query, Update, Protocol, and JSON results formats, alongside practical deployment guides for Apache Jena Fuseki 4.x and Ontotext GraphDB 2023. Includes configuration of HTTP and Graph Store endpoints, result parsing, federation setups, and performance tuning for scalable query/update pipelines. Specs Mar 2013; Fuseki 4.x; GraphDB 2023.
## License if known
W3C Document License (CC-BY 4.0); Apache 2.0; GraphDB Documentation License

# RDF Validation: SHACL & ShEx
## https://www.w3.org/TR/shacl/
## https://shex.io/shex-semantics/
## https://github.com/shexSpec/shex.js#readme
Details declarative RDF graph validation using SHACL shapes (Core and SPARQL-based components) and ShEx grammar for concise schema definitions. The shex.js library offers streaming validation with detailed error reporting, essential for CI/CD integration and data integrity enforcement of JSON-LD OWL artifacts. SHACL (Oct 2017); ShEx (2020); shex.js v4.x (2023).
## License if known
W3C Document License (CC-BY 4.0); CC0/Public Domain; MIT

# Schema.org Vocabulary
## https://schema.org/docs/full.html
Provides the full Schema.org type and property hierarchy (800+ types, 1500+ properties) for structured web markup and knowledge graph population. Includes JSON-LD examples, extension mechanisms, and usage guidelines for domain customization. Widely adopted for SEO and interlinking of OWL JSON-LD outputs. Last updated: 2024.
## License if known
CC0 Public Domain

# Node.js & Web Platform HTTP Utilities
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/http.html
## https://nodejs.org/api/url.html
## https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
## https://url.spec.whatwg.org/multipage/
An integrated reference for Node.js core modules (`fs` for file I/O, `http` for server/client streams, `url` module for URL resolution), the global Fetch API for HTTP requests (GET, HEAD, error handling), and the WHATWG URL Standard for robust URL parsing and manipulation. Vital for implementing CLI flags, server endpoints, source refresh logic, and diagnostics health checks with consistent request semantics and error handling. Verified against Node v20+.
## License if known
Node.js Documentation License (CC-BY-SA 3.0); MDN Web Docs (CC-BY-SA 2.5); WHATWG Spec (public domain)

# Node.js Stream API
## https://nodejs.org/api/stream.html
Provides in-depth guidance on Node.js stream interfaces (Readable, Writable, Duplex, Transform), backpressure management, and piping patterns. Essential for efficient HTTP response streaming in `/build-intermediate` and `/build-enhanced` endpoints, as well as for handling large JSON-LD payloads without blocking the event loop.
## License if known
Node.js Documentation License (CC-BY-SA 3.0)

# Blazegraph User Guide
## https://wiki.blazegraph.com/wiki/index.php/User_Guide
A public guide to the Blazegraph graph database and SPARQL engine, covering installation, configuration, performance tuning, high-availability setups, and advanced SPARQL extensions. Useful for comparative insights into alternative SPARQL deployments and enterprise-grade query optimizations.
## License if known
Blazegraph Documentation License (unspecified)
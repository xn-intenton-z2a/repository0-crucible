# HTTP Serve Subcommand

# Overview

Add a new "serve" subcommand that launches an HTTP server exposing key CLI capabilities over HTTP endpoints. This enables programmatic access to conversion, listing, retrieval, and filtering of ontologies via REST API calls.

# Implementation

1. Subcommand Detection
   - In src/lib/main.js, detect when first argument is "serve".
   - Parse flags:
     - port (number, optional, default 3000)
     - host (string, optional, default "0.0.0.0")

2. HTTP Server
   - Use createServer from node:http to start listening on the specified port and host.
   - Route requests based on HTTP method and URL path.

3. API Endpoints
   - GET /diagnostics
     - Return the same diagnostic information as --diagnostics in JSON format with status 200.

   - POST /convert
     - Accept JSON body with fields:
         data: object mapping term names to term properties
         ontologyIri: string (required)
         baseIri: string (optional)
     - Call generateOntology(data, { ontologyIri, baseIri }).
     - Respond with serialized JSON-LD document and status 200.

   - POST /list-terms
     - Accept JSON body:
         ontology: JSON-LD document (object)
     - Validate that ontology["@graph"] is an array.
     - Extract and return array of node["@id"] strings with status 200.

   - POST /get-term
     - Accept JSON body with:
         ontology: JSON-LD document
         term: string (local term name)
     - Locate the matching node by splitting node["@id"] on '#'.
     - If found, return the node object with status 200; otherwise respond with 404 and an error message.

   - POST /filter
     - Accept JSON body with:
         ontology: JSON-LD document
         property: string (node property name)
         value: string (value to match)
     - Validate ontology["@graph"].
     - Select nodes where node[property] exactly equals value.
     - Return array of matched nodes and status 200.

4. Error Handling
   - For invalid JSON bodies, missing fields, or validation errors, respond with status 400 and a JSON error message.
   - On internal errors, respond with status 500 and the error details.

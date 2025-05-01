# SPARQL_PROTOCOL

## Crawl Summary
Defines HTTP-based bindings for SPARQL Query and Update. Query operation supports GET, POST URL-encoded, and POST direct with parameters query (1), default-graph-uri (0+), named-graph-uri (0+) and content-types application/x-www-form-urlencoded or application/sparql-query. Update operation supports POST URL-encoded and POST direct with parameters update (1), using-graph-uri (0+), using-named-graph-uri (0+) and content-types application/x-www-form-urlencoded or application/sparql-update. Protocol parameters override FROM/FROM NAMED in queries; absent parameters invoke server-defined default dataset. Response formats determined by HTTP content negotiation: SPARQL Results formats for SELECT/ASK, RDF serializations for CONSTRUCT/DESCRIBE. Success indicated by HTTP 2XX or 3XX; errors by 400 (syntax) or 500 (execution/refusal). BASE resolution per RFC3986 with service-defined base URI.

## Normalised Extract
Table of Contents
1 Query via GET
2 Query via POST URL-encoded
3 Query via POST direct
4 Specifying RDF Dataset
5 Accepted Response Formats
6 Success and Failure Responses
7 Update via POST URL-encoded
8 Update via POST direct
9 Update Dataset Specification
10 Base IRI Determination

1 Query via GET
HTTP Method: GET
Parameters: query (1), default-graph-uri (0+), named-graph-uri (0+)
Body: none
Encoding: percent-encode parameters per RFC3986

2 Query via POST URL-encoded
HTTP Method: POST
Header: Content-Type: application/x-www-form-urlencoded
Body: query=<SPARQL>&default-graph-uri=<URI>&named-graph-uri=<URI>

3 Query via POST direct
HTTP Method: POST
Header: Content-Type: application/sparql-query; charset=UTF-8
URL parameters: default-graph-uri (0+), named-graph-uri (0+)
Body: unencoded SPARQL query string

4 Specifying RDF Dataset
Protocol parameters default-graph-uri and named-graph-uri override FROM and FROM NAMED in query string. If both absent, server default RDF dataset applies. Service may reject protocol-specified dataset (HTTP 400).

5 Accepted Response Formats
SELECT, ASK: application/sparql-results+xml, application/sparql-results+json, text/csv, text/tab-separated-values.
DESCRIBE, CONSTRUCT: RDF serializations such as application/rdf+xml, text/turtle, application/ld+json, etc.

6 Success and Failure Responses
Success: HTTP 2XX or 3XX; Content-Type matches serialization. Failure: 400 for syntax errors; 500 for execution failures or refusals; other 4XX/5XX as needed. Response body for errors is implementation-defined.

7 Update via POST URL-encoded
HTTP Method: POST
Header: Content-Type: application/x-www-form-urlencoded
Body: update=<UPDATE>&using-graph-uri=<URI>&using-named-graph-uri=<URI>

8 Update via POST direct
HTTP Method: POST
Header: Content-Type: application/sparql-update; charset=UTF-8
URL parameters: using-graph-uri (0+), using-named-graph-uri (0+)
Body: unencoded SPARQL update string

9 Update Dataset Specification
Each using-graph-uri parameter acts as USING <g>; each using-named-graph-uri parameter acts as USING NAMED <g>. Protocol clients must not supply protocol dataset parameters when the update string contains USING, USING NAMED, or WITH clauses.

10 Base IRI Determination
BASE keyword in request sets base IRI per RFC3986 section 5.1.1. Service must define base URI (commonly the endpoint URI).

## Supplementary Details
Parameter cardinalities and types
- query: required, SPARQL query string, single value.
- default-graph-uri: optional, IRI string, can appear multiple times.
- named-graph-uri: optional, IRI string, can appear multiple times.
- update: required, SPARQL update string, single value.
- using-graph-uri: optional, IRI string, can appear multiple times.
- using-named-graph-uri: optional, IRI string, can appear multiple times.

Content-Type constraints
- GET: no Content-Type header.
- POST URL-encoded: application/x-www-form-urlencoded.
- POST direct query: application/sparql-query; charset=UTF-8.
- POST direct update: application/sparql-update; charset=UTF-8.

Default behaviors
- Absent dataset parameters: use implementation-defined default dataset.
- Dataset parameters in protocol override query-level FROM/FROM NAMED.
- Service may respond with HTTP 400 if it disallows protocol-specified dataset.

Implementation steps for Query
1. Choose HTTP method (GET or POST).
2. Construct URL parameters or request body per binding.
3. Set Accept header to preferred serialization.
4. Send HTTP request to endpoint URI.
5. On HTTP 2XX or 3XX, parse response body per Content-Type.
6. On HTTP 4XX or 5XX, retrieve error details from response body.

Implementation steps for Update
1. Use HTTP POST.
2. Choose URL-encoded or direct SPARQL update binding.
3. Construct URL parameters and/or request body.
4. Send request to endpoint URI.
5. On HTTP 2XX or 3XX, consider update successful.
6. On HTTP 4XX or 5XX, handle errors and inspect response body.


## Reference Details
Endpoint Path: /sparql/

Query Operation API

GET Binding
- Request URL: /sparql/?query=<SPARQL>&default-graph-uri=<URI>&named-graph-uri=<URI>&...
- No request body.

POST Bindings
1. URL-encoded
   - Request URL: /sparql/
   - Header: Content-Type: application/x-www-form-urlencoded
   - Body: query=<SPARQL>&default-graph-uri=<URI>&named-graph-uri=<URI>
2. Direct
   - Request URL: /sparql/?default-graph-uri=<URI>&named-graph-uri=<URI>&...
   - Header: Content-Type: application/sparql-query; charset=UTF-8
   - Body: SPARQL query string

Response
- Status: 2XX or 3XX indicates success; 400 indicates syntax error; 500 indicates execution error or refusal.
- Content-Type: matches serialization of result.
- Body: SPARQL Results (XML/JSON/CSV/TSV) for SELECT/ASK; RDF serialization for CONSTRUCT/DESCRIBE.

Update Operation API

POST Bindings
1. URL-encoded
   - Request URL: /sparql/
   - Header: Content-Type: application/x-www-form-urlencoded
   - Body: update=<SPARQL_UPDATE>&using-graph-uri=<URI>&using-named-graph-uri=<URI>
2. Direct
   - Request URL: /sparql/?using-graph-uri=<URI>&using-named-graph-uri=<URI>&...
   - Header: Content-Type: application/sparql-update; charset=UTF-8
   - Body: SPARQL update string

Response
- Status: 2XX or 3XX indicates success; 400 indicates syntax error; 500 indicates execution error or refusal.
- Body: implementation-defined.

SDK Method Signatures (TypeScript)

interface QueryOptions {
  defaultGraphs?: string[];
  namedGraphs?: string[];
  accept?: string;
  method?: 'GET' | 'POST';
}

interface UpdateOptions {
  usingGraphs?: string[];
  usingNamedGraphs?: string[];
}

async function executeQuery(endpoint: string, sparql: string, opts?: QueryOptions): Promise<{ status: number; headers: Record<string,string>; body: string }>;

async function executeUpdate(endpoint: string, sparqlUpdate: string, opts?: UpdateOptions): Promise<{ status: number; headers: Record<string,string>; body: string }>;

Code Examples (cURL)

# Simple SELECT via GET
curl -G 'http://example.com/sparql/' \
  --data-urlencode 'query=SELECT ?s WHERE { ?s ?p ?o }' \
  -H 'Accept: application/sparql-results+json'

# Direct SPARQL query via POST
curl 'http://example.com/sparql/' \
  -H 'Content-Type: application/sparql-query; charset=UTF-8' \
  -H 'Accept: application/sparql-results+xml' \
  --data 'PREFIX dc: <http://purl.org/dc/elements/1.1/> SELECT ?book ?who WHERE { ?book dc:creator ?who }'

# Update via URL-encoded POST
curl 'http://example.com/sparql/' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'update=INSERT DATA { <http://ex/s> <http://ex/p> <http://ex/o> }'

Best Practices
- Use direct POST for queries exceeding URL length limits.
- Always percent-encode IRIs in URL parameters.
- Specify Accept header to control response format.
- Use UTF-8 charset for SPARQL bodies.
- Limit default/named graphs to required subsets for performance.

Troubleshooting Procedures

1 Malformed Query Error (400)
Command:
  curl -i 'http://example.com/sparql/?query=PREFIX%20foaf:'
Expected Response:
  HTTP/1.1 400 Bad Request
  Content-Type: text/plain; charset=UTF-8
  4: syntax error, unexpected <EOF>

2 Dataset Not Allowed (400)
Symptom: Server returns 400 when default-graph-uri is used.
Solution: Remove dataset parameters or configure endpoint to allow protocol dataset specification.

3 Query Timeout or Refusal (500)
Symptom: Server returns 500 with message "Query Request Refused".
Solution: Optimize query, split into smaller queries, adjust server timeout configuration.

## Information Dense Extract
Query Operation: GET or POST. Params: query(1), default-graph-uri*(IRI), named-graph-uri*(IRI). Bindings: GET (URL params), POST URLENC(Content-Type: application/x-www-form-urlencoded, body: query=...&...), POST direct(Content-Type: application/sparql-query; charset=UTF-8, body: SPARQL query). Update Operation: POST only. Params: update(1), using-graph-uri*(IRI), using-named-graph-uri*(IRI). Bindings: POST URLENC(Content-Type: application/x-www-form-urlencoded, body: update=...&...), POST direct(Content-Type: application/sparql-update; charset=UTF-8, body: SPARQL update). Protocol dataset params override FROM/FROM NAMED. Response: HTTP 2XX/3XX success; 400 syntax error; 500 execution/refusal. Response bodies: SPARQL Results (XML/JSON/CSV/TSV) or RDF serializations. Base IRI: BASE keyword or service endpoint URI per RFC3986.

## Sanitised Extract
Table of Contents
1 Query via GET
2 Query via POST URL-encoded
3 Query via POST direct
4 Specifying RDF Dataset
5 Accepted Response Formats
6 Success and Failure Responses
7 Update via POST URL-encoded
8 Update via POST direct
9 Update Dataset Specification
10 Base IRI Determination

1 Query via GET
HTTP Method: GET
Parameters: query (1), default-graph-uri (0+), named-graph-uri (0+)
Body: none
Encoding: percent-encode parameters per RFC3986

2 Query via POST URL-encoded
HTTP Method: POST
Header: Content-Type: application/x-www-form-urlencoded
Body: query=<SPARQL>&default-graph-uri=<URI>&named-graph-uri=<URI>

3 Query via POST direct
HTTP Method: POST
Header: Content-Type: application/sparql-query; charset=UTF-8
URL parameters: default-graph-uri (0+), named-graph-uri (0+)
Body: unencoded SPARQL query string

4 Specifying RDF Dataset
Protocol parameters default-graph-uri and named-graph-uri override FROM and FROM NAMED in query string. If both absent, server default RDF dataset applies. Service may reject protocol-specified dataset (HTTP 400).

5 Accepted Response Formats
SELECT, ASK: application/sparql-results+xml, application/sparql-results+json, text/csv, text/tab-separated-values.
DESCRIBE, CONSTRUCT: RDF serializations such as application/rdf+xml, text/turtle, application/ld+json, etc.

6 Success and Failure Responses
Success: HTTP 2XX or 3XX; Content-Type matches serialization. Failure: 400 for syntax errors; 500 for execution failures or refusals; other 4XX/5XX as needed. Response body for errors is implementation-defined.

7 Update via POST URL-encoded
HTTP Method: POST
Header: Content-Type: application/x-www-form-urlencoded
Body: update=<UPDATE>&using-graph-uri=<URI>&using-named-graph-uri=<URI>

8 Update via POST direct
HTTP Method: POST
Header: Content-Type: application/sparql-update; charset=UTF-8
URL parameters: using-graph-uri (0+), using-named-graph-uri (0+)
Body: unencoded SPARQL update string

9 Update Dataset Specification
Each using-graph-uri parameter acts as USING <g>; each using-named-graph-uri parameter acts as USING NAMED <g>. Protocol clients must not supply protocol dataset parameters when the update string contains USING, USING NAMED, or WITH clauses.

10 Base IRI Determination
BASE keyword in request sets base IRI per RFC3986 section 5.1.1. Service must define base URI (commonly the endpoint URI).

## Original Source
SPARQL 1.1 Protocol
https://www.w3.org/TR/sparql11-protocol/

## Digest of SPARQL_PROTOCOL

# SPARQL 1.1 Protocol

**Date Retrieved: 2024-06-07**

# 1 Introduction
This document defines HTTP-based operations for SPARQL Query and Update. It specifies how to send SPARQL requests to a processing service and receive responses via HTTP.

# 2 SPARQL Protocol Operations
The protocol supports two operations: query and update. Each operation combines an HTTP method, request parameters, request body, and response body.

## 2.1 Query Operation

### Methods and Bindings

| HTTP Method | Query Parameters                     | Content-Type                     | Body                                  |
|-------------|--------------------------------------|----------------------------------|---------------------------------------|
| GET         | query (1), default-graph-uri (0+), named-graph-uri (0+) | N/A                              | N/A                                   |
| POST (URL-encoded)  | N/A                                  | application/x-www-form-urlencoded | query=<SPARQL>&default-graph-uri=<URI>&named-graph-uri=<URI> |
| POST (direct)       | default-graph-uri (0+), named-graph-uri (0+) | application/sparql-query         | Unencoded SPARQL query string        |

### Parameters
- query: exactly one SPARQL query string.
- default-graph-uri: zero or more IRIs for default graphs.
- named-graph-uri: zero or more IRIs for named graphs.

### Response Formats
Clients indicate desired response serialization via the HTTP Accept header. Allowed formats:
- application/sparql-results+xml  (SELECT, ASK)
- application/sparql-results+json (SELECT, ASK)
- text/csv, text/tab-separated-values (SELECT, ASK)
- RDF serializations (DESCRIBE, CONSTRUCT): application/rdf+xml, text/turtle, application/ld+json, etc.

### Success Responses
- HTTP 2XX or 3XX status.
- Body: SPARQL Results Document or RDF graph serialization.
- Content-Type: corresponding media type.

### Failure Responses
- 400 Bad Request: syntax error in query.
- 500 Internal Server Error: execution failure or request refused.
- Other 4XX/5XX as per HTTP.
- Body: implementation-defined; may include machine-readable details.

## 2.2 Update Operation

### Methods and Bindings

| HTTP Method | Query Parameters                     | Content-Type                     | Body                                  |
|-------------|--------------------------------------|----------------------------------|---------------------------------------|
| POST (URL-encoded)  | N/A                                  | application/x-www-form-urlencoded | update=<SPARQL_UPDATE>&using-graph-uri=<URI>&using-named-graph-uri=<URI> |
| POST (direct)       | using-graph-uri (0+), using-named-graph-uri (0+) | application/sparql-update        | Unencoded SPARQL update string        |

### Parameters
- update: exactly one SPARQL update string.
- using-graph-uri: zero or more IRIs, treated as USING <g>.
- using-named-graph-uri: zero or more IRIs, treated as USING NAMED <g>.

### Success Responses
- HTTP 2XX or 3XX status.
- Body: implementation-defined; may include human- and machine-readable info.

### Failure Responses
- 400 Bad Request: syntax error in update.
- 500 Internal Server Error: execution failure or request refused.
- Other 4XX/5XX as per HTTP.

## 2.3 Determining the Base IRI
- The BASE keyword in a SPARQL query or update sets the base IRI for resolving relative IRIs per RFC3986 section 5.1.1.
- The service must define its own base URI (commonly the endpoint URI).

## Attribution
- Source: SPARQL 1.1 Protocol
- URL: https://www.w3.org/TR/sparql11-protocol/
- License: W3C Software and Document License
- Crawl Date: 2025-05-01T13:49:02.099Z
- Data Size: 41752291 bytes
- Links Found: 31981

## Retrieved
2025-05-01

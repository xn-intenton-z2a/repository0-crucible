# DBPEDIA_SPARQL

## Crawl Summary
Endpoint URL: https://dbpedia.org/sparql; Supported parameters: query (string), default-graph-uri (URI), named-graph-uri (URI list), timeout (int ms default 30000 max 60000), format (MIME type default JSON), debug (bool); Output formats: SPARQL Results JSON/XML, CSV, TSV, RDF/XML, Turtle, JSON-LD; Limits: 10000 rows, URL length 2048; Error codes: 200, 400, 414, 500; Use HTTP POST for long queries; Example cURL command provided.

## Normalised Extract
Table of Contents
1. Endpoint Configuration
2. Query Parameters
3. Output Formats
4. Limits and Timeouts
5. Error Handling
6. Example Usage

1. Endpoint Configuration
URL: https://dbpedia.org/sparql
Supports HTTP GET and POST

2. Query Parameters
- query (string): SPARQL query, mandatory
- default-graph-uri (URI): specify default graph, optional
- named-graph-uri (URI): specify named graphs, can repeat
- timeout (integer ms): execution timeout, default=30000, max=60000
- format (MIME): output format, default=application/sparql-results+json
- debug (boolean): include debug info, default=false

3. Output Formats
MIME types and aliases:
application/sparql-results+json (json)
application/sparql-results+xml (xml)
text/csv (csv)
text/tab-separated-values (tsv)
application/rdf+xml (rdf+xml)
text/turtle (turtle)
application/ld+json (jsonld)

4. Limits and Timeouts
- Default timeout 30000 ms, enforce max 60000 ms
- Result row cap: 10000 rows
- GET URL length cap: 2048 chars; use POST for longer queries

5. Error Handling
HTTP status codes:
200 OK: success
400 Bad Request: invalid syntax or missing required parameter
414 URI Too Long: GET exceeded URL length limit
500 Internal Server Error: server-side failure

6. Example Usage
cURL example using GET:
curl -G --data-urlencode "query=SELECT ?s WHERE {?s ?p ?o} LIMIT 5" -H "Accept: application/sparql-results+json" https://dbpedia.org/sparql

## Supplementary Details
Parameter Defaults and Ranges:
- timeout: default 30000 ms, enforced range [1000,60000]
- format: default=application/sparql-results+json; specify via 'Accept' header or 'format' parameter
- debug: default=false; set to true to return execution plan

HTTP Methods:
- GET: encode parameters in URL; subject to URL length limit 2048
- POST: Content-Type application/x-www-form-urlencoded or application/sparql-query for raw SPARQL

Default Graph URI:
- http://dbpedia.org by default if not specified

Named Graphs:
- Use multiple 'named-graph-uri' parameters to include additional graphs

Implementation Steps:
1. Construct SPARQL query string
2. Select HTTP method based on query length
3. Set HTTP headers: Accept and Content-Type
4. Send request to endpoint URL
5. Parse response based on format


## Reference Details
HTTP GET / POST Endpoint
- GET /sparql?query=...&default-graph-uri=...&named-graph-uri=...&timeout=...
- POST /sparql with body application/x-www-form-urlencoded: query=...
- POST /sparql with body application/sparql-query: raw SPARQL query

Java SDK (Apache Jena ARQ) Method Signatures:
QueryExecution qexec = QueryExecutionFactory.sparqlService(
    String serviceURI,
    String queryString,
    Dataset dataset,  // optional
    Map<String,String> httpHeaders // optional
);
ResultSet rs = qexec.execSelect();
Model model = qexec.execConstruct();
boolean ok = qexec.execAsk();

Python Example (requests):
import requests
params = {"query": "SELECT ?s WHERE {?s a dbo:City} LIMIT 10", "timeout": "30000"}
headers = {"Accept": "application/sparql-results+json"}
r = requests.get("https://dbpedia.org/sparql", params=params, headers=headers)
data = r.json()

Configuration Options:
- endpoint.url: https://dbpedia.org/sparql
- query.timeout: 30000
- query.maxRows: 10000
- http.urlLengthLimit: 2048
- out.format.default: application/sparql-results+json

Best Practices:
- Use POST for queries >1800 chars
- Paginate large result sets using LIMIT and OFFSET
- Specify only required projections to minimize payload
- Cache frequent queries at application layer

Troubleshooting:
- On HTTP 400: validate SPARQL syntax with SPARQL validator
- On HTTP 414: switch to POST method
- On timeouts: increase timeout parameter up to 60000 ms or optimize query
- Enable debug=true parameter to retrieve execution plan: ?query=...&debug=true


## Information Dense Extract
Endpoint: GET/POST https://dbpedia.org/sparql; Params: query(string), default-graph-uri(URI), named-graph-uri(URI[]), timeout(ms default30000 max60000), format(MIME default JSON), debug(bool); Output: JSON, XML, CSV, TSV, RDF/XML, Turtle, JSON-LD; Limits: 10000 rows, URL length 2048; Errors: 400 syntax/missing, 414 URI too long, 500 server; Use POST for long queries; Code: curl, Apache Jena QueryExecutionFactory.sparqlService, Python requests; Config: endpoint.url, query.timeout, query.maxRows, http.urlLengthLimit, out.format.default; Best: pagination, selective projections, caching; Troubleshoot: syntax validation, switch method, increase timeout, debug=true

## Sanitised Extract
Table of Contents
1. Endpoint Configuration
2. Query Parameters
3. Output Formats
4. Limits and Timeouts
5. Error Handling
6. Example Usage

1. Endpoint Configuration
URL: https://dbpedia.org/sparql
Supports HTTP GET and POST

2. Query Parameters
- query (string): SPARQL query, mandatory
- default-graph-uri (URI): specify default graph, optional
- named-graph-uri (URI): specify named graphs, can repeat
- timeout (integer ms): execution timeout, default=30000, max=60000
- format (MIME): output format, default=application/sparql-results+json
- debug (boolean): include debug info, default=false

3. Output Formats
MIME types and aliases:
application/sparql-results+json (json)
application/sparql-results+xml (xml)
text/csv (csv)
text/tab-separated-values (tsv)
application/rdf+xml (rdf+xml)
text/turtle (turtle)
application/ld+json (jsonld)

4. Limits and Timeouts
- Default timeout 30000 ms, enforce max 60000 ms
- Result row cap: 10000 rows
- GET URL length cap: 2048 chars; use POST for longer queries

5. Error Handling
HTTP status codes:
200 OK: success
400 Bad Request: invalid syntax or missing required parameter
414 URI Too Long: GET exceeded URL length limit
500 Internal Server Error: server-side failure

6. Example Usage
cURL example using GET:
curl -G --data-urlencode 'query=SELECT ?s WHERE {?s ?p ?o} LIMIT 5' -H 'Accept: application/sparql-results+json' https://dbpedia.org/sparql

## Original Source
DBpedia SPARQL Endpoint Documentation
https://wiki.dbpedia.org/online-access

## Digest of DBPEDIA_SPARQL

# Endpoint URL
- HTTP GET and POST
- URL: https://dbpedia.org/sparql

# HTTP Request Parameters
- query (required): SPARQL query string
- default-graph-uri (optional): URI of default graph
- named-graph-uri (optional, repeated): URI(s) of named graph(s)
- timeout (optional): integer milliseconds (default 30000, max 60000)
- format (optional): MIME type for output (default application/sparql-results+json)
- debug (optional): boolean flag (default false)

# Supported Output Formats
| MIME Type                              | Alias        |
|----------------------------------------|--------------|
| application/sparql-results+json        | json         |
| application/sparql-results+xml         | xml          |
| text/csv                               | csv          |
| text/tab-separated-values              | tsv          |
| application/rdf+xml                    | rdf+xml      |
| text/turtle                            | turtle       |
| application/ld+json                    | jsonld       |

# Limits and Timeouts
- Default timeout: 30000 ms
- Maximum timeout: 60000 ms
- Maximum result rows: 10000
- Request URL length limit: 2048 characters

# Error Codes
- 200 OK: query executed successfully
- 400 Bad Request: syntax error or parameter missing
- 414 URI Too Long: GET request exceeds URL length, use POST
- 500 Internal Server Error: endpoint failure

# Example cURL
```bash
curl -G \
  --data-urlencode "query=SELECT ?s ?p ?o WHERE {?s ?p ?o} LIMIT 10" \
  -H "Accept: application/sparql-results+json" \
  https://dbpedia.org/sparql
```


## Attribution
- Source: DBpedia SPARQL Endpoint Documentation
- URL: https://wiki.dbpedia.org/online-access
- License: License
- Crawl Date: 2025-04-26T23:46:59.393Z
- Data Size: 545064 bytes
- Links Found: 12

## Retrieved
2025-04-26

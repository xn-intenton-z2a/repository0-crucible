# WIKIDATA_SPARQL

## Crawl Summary
endpoint=https://query.wikidata.org/sparql methods=GET,POST parameters=query(required),format(optional,default=json),callback(if jsonp) formats=JSON,XML,CSV,TSV,JSON-LD,RDF/XML,Turtle,NT headers=Accept,Content-Type rate_limit=60rpm timeout=120s status_codes=200,400,404,503,504

## Normalised Extract
Table of Contents:
1. Endpoint URL
2. HTTP Methods
3. Query Parameters
4. Supported Formats
5. Rate Limits and Timeouts
6. Example Requests

1. Endpoint URL
https://query.wikidata.org/sparql

2. HTTP Methods
GET  (parameters in query string)
POST (application/x-www-form-urlencoded body)

3. Query Parameters
query  string  required  SPARQL 1.1 query
format string  optional  default application/sparql-results+json  allowed values application/sparql-results+json,application/sparql-results+xml,text/csv,text/tab-separated-values,application/jsonld+json,application/rdf+xml,text/turtle,application/n-triples
callback string required if format=jsonp  JSONP callback name

4. Supported Formats
application/sparql-results+json
application/sparql-results+xml
text/csv
text/tab-separated-values
application/jsonld+json
application/rdf+xml
text/turtle
application/n-triples

5. Rate Limits and Timeouts
60 requests per minute per IP
timeout 120 seconds

6. Example Requests
curl -G --data-urlencode 'query=SELECT ?item WHERE { ?item wdt:P31 wd:Q146 . } LIMIT 10' -H 'Accept: application/sparql-results+json' https://query.wikidata.org/sparql
fetch('https://query.wikidata.org/sparql?query='+encodeURIComponent(query),{headers:{Accept:'application/sparql-results+json'}})


## Supplementary Details
Default timeout 120s; max results per response 10000 rows; use LIMIT/OFFSET to paginate; Accept header overrides format param; Content-Type must be application/x-www-form-urlencoded for POST; errors return SPARQL result with boolean=false and error details in text/plain reason phrase; recommended user-agent header with contact info; keep-alive connections supported.

## Reference Details
HTTP GET /sparql?query={SPARQL string}&format={MIME type}&callback={func}
Headers:
  Accept: one of application/sparql-results+json,application/sparql-results+xml,text/csv,text/tab-separated-values,application/jsonld+json,application/rdf+xml,text/turtle,application/n-triples
  User-Agent: required with email or project name
Query Parameter Details:
  query: UTF-8 SPARQL 1.1 query, max length 20000 characters
  format: exact MIME type, defaults to application/sparql-results+json
  callback: JSONP function, only with format=jsonp
Response Codes:
  200: success, body in requested format
  400: syntax or parameter error, body text/plain
  404: endpoint invalid
  503: maintenance, Retry-After header
  504: query execution timeout
SDK Method Signatures:
Python SPARQLWrapper.SPARQLWrapper(endpoint: str, agent: str=None) -> SPARQLWrapper
  setQuery(query: str) -> None
  setReturnFormat(format: constant) -> None
  query() -> QueryResult
  QueryResult.convert() -> dict or list
Node.js fetch(url: string, options?: {method?: string, headers?: Record<string,string>, body?: string}) -> Promise<Response>
  Response.json(): Promise<any>

Best Practices:
  Use LIMIT and OFFSET to manage large result sets
  Optimize queries with specific property paths and FILTERs
  Include SERVICE wikibase:label to fetch labels
  Cache frequent queries at client side
  Throttle requests below 60 per minute

Troubleshooting:
  HTTP 400: check SPARQL syntax, validate with online validator
  HTTP 504: simplify query, add LIMIT, break into smaller queries
  HTTP 503: retry after indicated interval
  Empty results: verify endpoint URL, correct prefixes, use ASK queries to test patterns
  Rate limit errors: implement exponential backoff (start 1s, double up to 32s)


## Information Dense Extract
endpoint=https://query.wikidata.org/sparql methods=GET,POST params{query:string req,format:string opt default application/sparql-results+json,callback:string if jsonp} formats{application/sparql-results+json,application/sparql-results+xml,text/csv,text/tab-separated-values,application/jsonld+json,application/rdf+xml,text/turtle,application/n-triples} headers{Accept,Content-Type:x-www-form-urlencoded,User-Agent} rate_limit=60rpm timeout=120s status{200,400,404,503,504} code_examples{curl,SPARQLWrapper,fetch} best_practices{use LIMIT/OFFSET,cache,throttle} troubleshooting{400 syntax,504 timeout,503 retry,backoff}

## Sanitised Extract
Table of Contents:
1. Endpoint URL
2. HTTP Methods
3. Query Parameters
4. Supported Formats
5. Rate Limits and Timeouts
6. Example Requests

1. Endpoint URL
https://query.wikidata.org/sparql

2. HTTP Methods
GET  (parameters in query string)
POST (application/x-www-form-urlencoded body)

3. Query Parameters
query  string  required  SPARQL 1.1 query
format string  optional  default application/sparql-results+json  allowed values application/sparql-results+json,application/sparql-results+xml,text/csv,text/tab-separated-values,application/jsonld+json,application/rdf+xml,text/turtle,application/n-triples
callback string required if format=jsonp  JSONP callback name

4. Supported Formats
application/sparql-results+json
application/sparql-results+xml
text/csv
text/tab-separated-values
application/jsonld+json
application/rdf+xml
text/turtle
application/n-triples

5. Rate Limits and Timeouts
60 requests per minute per IP
timeout 120 seconds

6. Example Requests
curl -G --data-urlencode 'query=SELECT ?item WHERE { ?item wdt:P31 wd:Q146 . } LIMIT 10' -H 'Accept: application/sparql-results+json' https://query.wikidata.org/sparql
fetch('https://query.wikidata.org/sparql?query='+encodeURIComponent(query),{headers:{Accept:'application/sparql-results+json'}})

## Original Source
SPARQL 1.1 Specifications & Public Endpoints
https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help

## Digest of WIKIDATA_SPARQL

# SPARQL Endpoint

## Endpoint URL

https://query.wikidata.org/sparql

## HTTP Methods

GET
POST

## Request Parameters

query
  Type: string
  Required: yes
  Description: SPARQL 1.1 query string to be executed

format
  Type: string
  Required: no
  Default: application/sparql-results+json
  Allowed values: application/sparql-results+json, application/sparql-results+xml, text/csv, text/tab-separated-values, application/jsonld+json, application/rdf+xml, text/turtle, application/n-triples

callback
  Type: string
  Required: if format=jsonp
  Description: JSONP callback function name

## HTTP Headers

Accept
  Default: application/sparql-results+json
  Overrides format parameter if specified

Content-Type
  application/x-www-form-urlencoded for POST requests

## Response Status Codes

200 OK
400 Bad Request (syntax or parameter error)
404 Not Found (invalid endpoint)
503 Service Unavailable (maintenance)
504 Gateway Timeout (query timeout)

## Rate Limits and Timeouts

Rate limit: 60 requests per minute per IP
Execution timeout: 120 seconds

## Usage Examples

### curl GET example

curl -G \
  --data-urlencode 'query=SELECT ?item WHERE { ?item wdt:P31 wd:Q146 . } LIMIT 10' \
  -H 'Accept: application/sparql-results+json' \
  https://query.wikidata.org/sparql

### Python SPARQLWrapper example

from SPARQLWrapper import SPARQLWrapper, JSON
sparql = SPARQLWrapper('https://query.wikidata.org/sparql')
sparql.setQuery('SELECT ?item WHERE { ?item wdt:P31 wd:Q146 . } LIMIT 10')
sparql.setReturnFormat(JSON)
results = sparql.query().convert()

### Node.js fetch example

const fetch = require('node-fetch');
const query = "SELECT ?item WHERE { ?item wdt:P31 wd:Q146 . } LIMIT 10";
const url = 'https://query.wikidata.org/sparql?query=' + encodeURIComponent(query);
fetch(url, { headers: { Accept: 'application/sparql-results+json' } })
  .then(res => res.json())
  .then(data => console.log(data));

## Attribution
- Source: SPARQL 1.1 Specifications & Public Endpoints
- URL: https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
- License: License
- Crawl Date: 2025-04-27T10:49:02.002Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27

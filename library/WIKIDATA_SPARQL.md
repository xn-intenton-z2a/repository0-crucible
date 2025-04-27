# WIKIDATA_SPARQL

## Crawl Summary
Endpoint https://query.wikidata.org/sparql  Methods GET and POST with parameters query, format, timeout, debug  Default output JSON  Supports JSON XML CSV TSV HTML JSON-LD N-Triples Turtle  Rate limit 100 QPM  max concurrent 5  server timeout 300s  use compression  CORS allowed

## Normalised Extract
Table of Contents
1 Endpoint
2 HTTP Methods
3 Query Parameters
4 Response Formats
5 Rate Limits and Timeouts
6 Examples
7 Troubleshooting

1 Endpoint
  Base URL https://query.wikidata.org/sparql
  HTTPS only

2 HTTP Methods
  GET  parameter query=URL-encoded SPARQL
  POST Content-Type application/x-www-form-urlencoded body field query

3 Query Parameters
  query: SPARQL 1.1 string ( required )
  format: MIME type ( optional, default application/sparql-results+json )
  timeout: milliseconds ( optional, default 300000 )
  debug: true|false ( optional, default false )

4 Response Formats
  application/sparql-results+json
  application/sparql-results+xml
  text/csv
  text/tab-separated-values
  text/html
  application/ld+json
  application/n-triples
  text/turtle

5 Rate Limits and Timeouts
  max concurrent requests per IP: 5
  rate limit: 100 queries per minute
  server timeout per query: 300000 ms

6 Examples
  curl --compressed
       --header Accept:application/sparql-results+json
       --data-urlencode query='SELECT ?item WHERE { … } LIMIT 10'
       https://query.wikidata.org/sparql

  curl --compressed
       --header Content-Type:application/x-www-form-urlencoded
       --header Accept:text/csv
       --data 'query=SELECT%20…&format=text%2Fcsv'
       https://query.wikidata.org/sparql

7 Troubleshooting
  414 URL too long → use POST
  503 server busy → retry after delay
  400 syntax error → validate query


## Supplementary Details
Default timeout 300000 ms  Accept header overrides format parameter  HTTP compression gzip enabled by default  CORS Access-Control-Allow-Origin *  No authentication required  Cache-Control no-cache header returned  Maximum URL length ~2048 characters  Use POST for larger queries  Debug mode returns JSON with execution plan under key debug


## Reference Details
HTTP API
GET /sparql?query=string&format=MIME&timeout=int&debug=boolean
POST /sparql   Content-Type application/x-www-form-urlencoded
               body field query=SPARQL string
               optional fields format timeout debug
Headers
  Accept: MIME type selects output format
  Content-Type: application/x-www-form-urlencoded for POST
Responses
  200 OK  Content-Type matches requested MIME
  400 Bad Request  query syntax error
  414 URI Too Long  query length exceeds limit
  429 Too Many Requests  rate limit exceeded
  503 Service Unavailable  server overloaded

SDK Method Signatures (JavaScript)
function runSparqlQuery(query : string, options?: {format?: string, timeout?: number, debug?: boolean}) : Promise<{status:number, headers:Headers, body:ReadableStream}>

function runSparqlQuery
 Parameters
   query string SPARQL 1.1
   options.format string default application/sparql-results+json
   options.timeout number default 300000
   options.debug boolean default false
 Returns
   Promise resolving to HTTP response Stream

Implementation Pattern
1 import fetch from 'node-fetch'
2 build URL or body based on method
3 set headers Accept and Content-Type
4 await fetch endpoint
5 handle status codes 400,414,429,503
6 parse body based on MIME

Best Practices
• Use LIMIT/OFFSET for pagination
• Avoid SELECT * on large datasets
• Use SERVICE wikibase:label for labels only when needed
• Minimize number of triple patterns

Troubleshooting Commands
curl -v --compressed 'https://query.wikidata.org/sparql?query=...' -H 'Accept:application/sparql-results+json'
Expected 200 OK with JSON body

If 414 then use POST:
curl -v --compressed -X POST https://query.wikidata.org/sparql \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'query=...'

If 503 then wait 10s then retry


## Information Dense Extract
endpoint=https://query.wikidata.org/sparql methods=GET|POST params=query:string required format:string default application/sparql-results+json timeout:int default300000ms debug:boolean defaultfalse headers Accept,Content-Type(
application/x-www-form-urlencoded POST) formats=[application/sparql-results+json,application/sparql-results+xml,text/csv,text/tab-separated-values,text/html,application/ld+json,application/n-triples,text/turtle] rateLimit=100QPM concurrent=5 timeout=300s CORS=* compression=gzip errors=400,414,429,503 Examples=curl GET,POST SDK=runSparqlQuery(query:string,options?{format?,timeout?,debug?}):Promise<response> bestPractices=LIMIT/OFFSET,SERVICE wikibase:label,triple pattern minimization troubleshooting=use POST for 414,retry for503

## Sanitised Extract
Table of Contents
1 Endpoint
2 HTTP Methods
3 Query Parameters
4 Response Formats
5 Rate Limits and Timeouts
6 Examples
7 Troubleshooting

1 Endpoint
  Base URL https://query.wikidata.org/sparql
  HTTPS only

2 HTTP Methods
  GET  parameter query=URL-encoded SPARQL
  POST Content-Type application/x-www-form-urlencoded body field query

3 Query Parameters
  query: SPARQL 1.1 string ( required )
  format: MIME type ( optional, default application/sparql-results+json )
  timeout: milliseconds ( optional, default 300000 )
  debug: true|false ( optional, default false )

4 Response Formats
  application/sparql-results+json
  application/sparql-results+xml
  text/csv
  text/tab-separated-values
  text/html
  application/ld+json
  application/n-triples
  text/turtle

5 Rate Limits and Timeouts
  max concurrent requests per IP: 5
  rate limit: 100 queries per minute
  server timeout per query: 300000 ms

6 Examples
  curl --compressed
       --header Accept:application/sparql-results+json
       --data-urlencode query='SELECT ?item WHERE {  } LIMIT 10'
       https://query.wikidata.org/sparql

  curl --compressed
       --header Content-Type:application/x-www-form-urlencoded
       --header Accept:text/csv
       --data 'query=SELECT%20&format=text%2Fcsv'
       https://query.wikidata.org/sparql

7 Troubleshooting
  414 URL too long  use POST
  503 server busy  retry after delay
  400 syntax error  validate query

## Original Source
SPARQL 1.1 Specifications & Public Endpoints
https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help

## Digest of WIKIDATA_SPARQL

# WIKIDATA SPARQL QUERY SERVICE USER HELP (Retrieved 2024-06-05)

# Endpoint
Base URL  https://query.wikidata.org/sparql
Supports HTTPS only

# HTTP Methods
GET    query parameter must be URL-encoded
POST   Content-Type application/x-www-form-urlencoded

# Query Parameters
query     SPARQL 1.1 query string  required
format    Desired output format  optional  defaults to application/sparql-results+json
timeout   Integer milliseconds server timeout override  optional  default 300000
debug     true|false  include detailed execution plan  optional  default false

# Response Formats and MIME Types
application/sparql-results+json  JSON bindings
application/sparql-results+xml   XML bindings
text/csv                          CSV table
text/tab-separated-values         TSV table
text/html                         HTML table
application/ld+json               RDF JSON-LD graph
application/n-triples             N-Triples
text/turtle                       Turtle

# Rate Limits and Timeouts
Max concurrent requests per IP  5
Rate limit  100 queries per minute
Max execution time per query  server timeout 300s  client timeout header honored

# Examples
curl GET
  curl --compressed
       --header Accept:application/sparql-results+json
       --data-urlencode query='SELECT ?item ?itemLabel WHERE { ?item wdt:P31 wd:Q146 . SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }} LIMIT 10'
       https://query.wikidata.org/sparql

curl POST
  curl --compressed
       --header Content-Type:application/x-www-form-urlencoded
       --header Accept:text/csv
       --data 'query=SELECT%20...LIMIT%2010&format=text%2Fcsv'
       https://query.wikidata.org/sparql

# Troubleshooting
Error 414  URL too long  switch to POST
Error 503  server busy  retry after 10s backoff
Error 400  syntax error  inspect query against SPARQL 1.1 specs


## Attribution
- Source: SPARQL 1.1 Specifications & Public Endpoints
- URL: https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
- License: License
- Crawl Date: 2025-04-27T12:57:25.196Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27

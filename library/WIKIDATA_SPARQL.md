# WIKIDATA_SPARQL

## Crawl Summary
Endpoint: https://query.wikidata.org/sparql; HTTP GET/POST with parameters 'query' (required), 'format', 'timeout', 'default-graph-uri'. Supported formats: JSON, XML, CSV, TSV. Default timeout 300000 ms, max 900000 ms. Rate limits: 60 qpm anonymous, 500 qpm registered. Errors: 400 (syntax), 413 (URI too long), 408 (timeout), 500 (server error).

## Normalised Extract
Table of Contents
1 Endpoint Configuration
2 HTTP Request Parameters
3 Supported Result Formats
4 Rate Limits and Timeouts
5 Error Handling
6 Usage Examples
7 Troubleshooting

1 Endpoint Configuration
SPARQL endpoint URL: https://query.wikidata.org/sparql
Backup endpoint: https://query.wikidata.org/bigdata/namespace/wdq/sparql
Supports GET and POST requests.

2 HTTP Request Parameters
Parameter         Type     Required Description
query             string   yes      SPARQL query string; URL-encode for GET
format            string   no       Mime type: application/sparql-results+json|application/sparql-results+xml|text/csv|text/tab-separated-values
timeout           integer  no       Execution timeout in ms; default 300000; max 900000 for registered users
default-graph-uri string   no       URI of default graph
user-agent        string   no       Sets User-Agent header

3 Supported Result Formats
application/sparql-results+json (default)
application/sparql-results+xml
text/csv
text/tab-separated-values

4 Rate Limits and Timeouts
Anonymous: 60 queries/min, timeout max 300000 ms
Registered: 500 queries/min, timeout max 900000 ms
Timeout returns HTTP 408

5 Error Handling
400 Bad Request – missing query or syntax error
413 Request Entity Too Large – GET query too long (>10000 chars)
408 Request Timeout – execution exceeded timeout
500 Internal Server Error – server-side

6 Usage Examples
curl -G --data-urlencode "query=SELECT ?s WHERE {?s ?p ?o} LIMIT 10" -H "Accept: application/sparql-results+json" https://query.wikidata.org/sparql
fetch('https://query.wikidata.org/sparql?query='+encodeURIComponent('SELECT ?s WHERE {?s ?p ?o} LIMIT 5'),{headers:{Accept:'application/sparql-results+json'}})

7 Troubleshooting
Use --compressed in curl for gzip
Increase timeout with &timeout=60000
Validate query syntax against SPARQL 1.1 spec

## Supplementary Details
Default timeout: 300000 ms; Registered max timeout: 900000 ms. Anonymous rate limit: 60 QPM; Registered: 500 QPM. Max GET URI length: 10000 characters. Compression: gzip supported; set Accept-Encoding: gzip. Default graph URI: none. User-Agent header optional. Queries exceeding limits return HTTP 429.

## Reference Details
HTTP Method: GET or POST
Endpoint: https://query.wikidata.org/sparql
Parameters:
  query (required) string URL-encoded (GET) or raw (POST)
  format (optional) string values: application/sparql-results+json | application/sparql-results+xml | text/csv | text/tab-separated-values
  timeout (optional) integer ms; default 300000; max 900000 (registered)
  default-graph-uri (optional) string URI
  user-agent (optional) string
Headers:
  Accept: defines response format
  Accept-Encoding: gzip, deflate
Responses:
  200 OK with content-type matching format
  400 Missing/invalid query
  413 GET URI too long
  408 Timeout
  429 Too Many Requests
  500 Internal Server Error

Code Examples:
1) cURL
curl -G --data-urlencode "query=SELECT ?item WHERE {?item wdt:P31 wd:Q5} LIMIT 5" \
     -H "Accept: application/sparql-results+json" \
     -H "Accept-Encoding: gzip" \
     https://query.wikidata.org/sparql

2) Python requests
import requests
params = {'query': 'SELECT ?s WHERE {?s ?p ?o} LIMIT 10', 'format': 'application/sparql-results+json'}
headers = {'Accept-Encoding': 'gzip'}
r = requests.get('https://query.wikidata.org/sparql', params=params, headers=headers, timeout=10)
r.raise_for_status()
results = r.json()

Best Practices:
- Use POST for queries >10000 chars
- Cache results client-side to reduce load
- Use compressed responses
- Respect rate limits; implement backoff on 429

Troubleshooting:
Command: curl -v -G --data-urlencode "query=SELECT * WHERE {?s ?p ?o} LIMIT 1" https://query.wikidata.org/sparql
Expected: HTTP/1.1 200 OK
If 408: increase timeout or simplify query
If 413: switch to POST
If 429: wait or reduce request rate

## Information Dense Extract
endpoint:GET/POST https://query.wikidata.org/sparql parameters:query(required),format(json|xml|csv|tsv),timeout(ms default300000 max900000),default-graph-uri,user-agent headers:Accept,Accept-Encoding:gzip rate-limits:anon60qpm reg500qpm,anon300s timeout reg900s http-errors:400,408,413,429,500 code-patterns:curl GET --data-urlencode query,POST for >10k chars,gzip,backoff on429;best-practices:cache,compress,respect-limits;troubleshoot:408{increase timeout},413{use POST},429{reduce rate},500{retry}

## Sanitised Extract
Table of Contents
1 Endpoint Configuration
2 HTTP Request Parameters
3 Supported Result Formats
4 Rate Limits and Timeouts
5 Error Handling
6 Usage Examples
7 Troubleshooting

1 Endpoint Configuration
SPARQL endpoint URL: https://query.wikidata.org/sparql
Backup endpoint: https://query.wikidata.org/bigdata/namespace/wdq/sparql
Supports GET and POST requests.

2 HTTP Request Parameters
Parameter         Type     Required Description
query             string   yes      SPARQL query string; URL-encode for GET
format            string   no       Mime type: application/sparql-results+json|application/sparql-results+xml|text/csv|text/tab-separated-values
timeout           integer  no       Execution timeout in ms; default 300000; max 900000 for registered users
default-graph-uri string   no       URI of default graph
user-agent        string   no       Sets User-Agent header

3 Supported Result Formats
application/sparql-results+json (default)
application/sparql-results+xml
text/csv
text/tab-separated-values

4 Rate Limits and Timeouts
Anonymous: 60 queries/min, timeout max 300000 ms
Registered: 500 queries/min, timeout max 900000 ms
Timeout returns HTTP 408

5 Error Handling
400 Bad Request  missing query or syntax error
413 Request Entity Too Large  GET query too long (>10000 chars)
408 Request Timeout  execution exceeded timeout
500 Internal Server Error  server-side

6 Usage Examples
curl -G --data-urlencode 'query=SELECT ?s WHERE {?s ?p ?o} LIMIT 10' -H 'Accept: application/sparql-results+json' https://query.wikidata.org/sparql
fetch('https://query.wikidata.org/sparql?query='+encodeURIComponent('SELECT ?s WHERE {?s ?p ?o} LIMIT 5'),{headers:{Accept:'application/sparql-results+json'}})

7 Troubleshooting
Use --compressed in curl for gzip
Increase timeout with &timeout=60000
Validate query syntax against SPARQL 1.1 spec

## Original Source
SPARQL 1.1 Specifications & Public Endpoints
https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help

## Digest of WIKIDATA_SPARQL

# Wikidata SPARQL Query Service User Help
Date Retrieved: 2024-06-12
Source: https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help

# Endpoint URLs

The SPARQL endpoint is available at https://query.wikidata.org/sparql for HTTP GET and POST requests. A backup endpoint is available at https://query.wikidata.org/bigdata/namespace/wdq/sparql.

# HTTP Request Parameters

- query (required): SPARQL query string. Must be URL-encoded for GET.
- format (optional): Mime type for results. Supported values:
  - application/sparql-results+json
  - application/sparql-results+xml
  - text/csv
  - text/tab-separated-values
- timeout (optional): Integer milliseconds. Default 300000 (5 min). Max 900000 (15 min) for registered users.
- default-graph-uri (optional): URI of default graph.
- user-agent (optional): Sets the User-Agent header.

# Result Formats

Responses are returned with the specified format. JSON responses conform to W3C SPARQL Results JSON Format.

# Rate Limits and Timeouts

- Anonymous users: max 300s timeout, 60 queries per minute.
- Registered users: max 900s, 500 queries per minute.
- Query execution aborted on timeout with HTTP 408.

# Error Handling

- 400 Bad Request: syntax error or missing query parameter.
- 413 Request Entity Too Large: query string exceeds 10000 characters for GET.
- 500 Internal Server Error: server-side error, retry recommended.

# Examples

curl -G \
  --data-urlencode "query=SELECT ?item WHERE {?item wdt:P31 wd:Q146.} LIMIT 50" \
  -H "Accept: application/sparql-results+json" \
  https://query.wikidata.org/sparql

fetch('https://query.wikidata.org/sparql?query=' + encodeURIComponent('SELECT ?item WHERE {?item wdt:P31 wd:Q146.} LIMIT 10'), { headers: { Accept: 'application/sparql-results+json' } })

# Troubleshooting

- Use --compressed with curl to enable gzip compression.
- Append &timeout=60000 to increase timeout to 60s.
- Check syntax with https://www.w3.org/TR/sparql11-query.

# Data Size

Data Size: 0 bytes
Links Found: 0
Error: None

## Attribution
- Source: SPARQL 1.1 Specifications & Public Endpoints
- URL: https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
- License: License
- Crawl Date: 2025-04-27T15:48:49.385Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27

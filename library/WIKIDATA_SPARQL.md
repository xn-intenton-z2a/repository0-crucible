# WIKIDATA_SPARQL

## Crawl Summary
Endpoint URL https://query.wikidata.org/sparql GET/POST; query (string, required); format (string, MIME type, default application/sparql-results+json); Accept header overrides format; timeout (ms, optional, max 300000); soft timeout 30000 ms; hard timeout 300000 ms; output formats JSON, XML, CSV, TSV, RDF/XML, Turtle; GET URL length limit 2048; rate limit 600 req/min; no auth

## Normalised Extract
Table of Contents

1 Endpoint Configuration
2 HTTP Parameters and Values
3 Supported Output Formats
4 Timeouts and Query Limits
5 Rate Limiting
6 Usage Examples

1 Endpoint Configuration
Base URL: https://query.wikidata.org/sparql
Supports HTTP GET and POST requests
GET URL length capped at 2048 characters

2 HTTP Parameters and Values
query: required; SPARQL query string; UTF-8; max 2048 chars in GET
format: optional; MIME type; default application/sparql-results+json
timeout: optional; integer; client-side timeout in ms; max 300000
Accept: HTTP header; MIME type; overrides format parameter

3 Supported Output Formats
application/sparql-results+json
application/sparql-results+xml
text/csv
text/tab-separated-values
application/rdf+xml
text/turtle
application/json
application/xml

4 Timeouts and Query Limits
Soft timeout: 30000 ms; returns HTTP 500 with soft timeout message
Hard timeout: 300000 ms; terminates query execution
Result set size limited by server memory

5 Rate Limiting
600 requests per minute per IP
HTTP 429 returned on limit exceed
No API key or authentication needed

6 Usage Examples
GET example:
  GET /sparql?query=...
  Accept: application/sparql-results+json
POST example:
  POST /sparql
  Content-Type: application/x-www-form-urlencoded
  body: query=...


## Supplementary Details
Parameter Defaults and Behavior

query: must be URL-encoded when using GET
format: omitted uses application/sparql-results+json
Accept header priority over format parameter
timeout: client-side; server-side soft and hard limits fixed
Error Codes

HTTP 400 Bad Request: malformed query
HTTP 414 URI Too Long: switch to POST
HTTP 429 Too Many Requests: rate limit exceeded
HTTP 500 Internal Server Error: timeout or server error

Implementation Steps

1 Construct SPARQL query string
2 Choose HTTP method: GET if query length <2048, else POST
3 Set headers: Content-Type and Accept
4 Send request to https://query.wikidata.org/sparql
5 Handle response: parse according to MIME type


## Reference Details
API Endpoint Specification

GET /sparql
Parameters:
  query (string, required): UTF-8 SPARQL query; URL-encoded when appended to URL
  format (string, optional): MIME type; see Supported Output Formats
  timeout (integer, optional): client-side timeout in ms; ignored by server
Headers:
  Accept (string, optional): response MIME type; overrides format

POST /sparql
Content-Type: application/x-www-form-urlencoded
Body parameters:
  query (string, required)
  format (string, optional)
  timeout (integer, optional)
Headers:
  Accept (string, optional)

Response Codes and Behavior

200 OK: successful response body in requested MIME type
400 Bad Request: syntax error in SPARQL query
414 URI Too Long: GET name-value length exceeded; use POST
429 Too Many Requests: rate limit exceeded; Retry-After header indicates wait time
500 Internal Server Error: soft timeout or server error

SDK Method Signature Examples (JavaScript)

function executeSparqlQuery(queryString, options) {
  const url = 'https://query.wikidata.org/sparql';
  const headers = { 'Accept': options.format || 'application/sparql-results+json' };
  if (queryString.length < 2000) {
    const params = new URLSearchParams({ query: queryString });
    return fetch(`${url}?${params.toString()}`, { method: 'GET', headers, signal: options.signal })
      .then(res => res.json());
  } else {
    const bodyParams = new URLSearchParams({ query: queryString });
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }, body: bodyParams, signal: options.signal })
      .then(res => {
        if (options.format && options.format.includes('json')) return res.json();
        if (options.format && options.format.includes('csv')) return res.text().then(t => parseCsv(t));
        return res.text();
      });
}

Options Structure:
  format: string; acceptable MIME types
  signal: AbortSignal; optional for timeout handling

Best Practices

• Use POST for queries exceeding 2048 characters
• Set Accept header to explicitly request desired format
• Implement retry with exponential backoff on HTTP 429
• Parse error responses: inspect HTTP status, body contains SPARQL error message

Troubleshooting Procedures

1 HTTP 414 or truncated response
  - Switch to POST
2 HTTP 429
  - Read Retry-After header; wait and retry
3 HTTP 500 with timeout message
  - Simplify query; add LIMIT; optimize FILTER clauses



## Information Dense Extract
Endpoint https://query.wikidata.org/sparql GET/POST; query required; format MIME optional default application/sparql-results+json; Accept header overrides; GET URL max2048; timeout client-side max300000; server soft timeout30000 hard300000; output formats JSON XML CSV TSV RDF/XML Turtle; rate limit600RPM HTTP429 Retry-After; errors400 bad query 414 URI too long 429 rate limit 500 timeout; GET vs POST detection by query length; JS SDK method executeSparqlQuery(queryString,options) selects GET/POST, sets headers, handles JSON/CSV/text; options.format,options.signal; best practices POST for long queries Accept header explicit retry/backoff; troubleshooting switch to POST on414 wait and retry on429 optimize query on500

## Sanitised Extract
Table of Contents

1 Endpoint Configuration
2 HTTP Parameters and Values
3 Supported Output Formats
4 Timeouts and Query Limits
5 Rate Limiting
6 Usage Examples

1 Endpoint Configuration
Base URL: https://query.wikidata.org/sparql
Supports HTTP GET and POST requests
GET URL length capped at 2048 characters

2 HTTP Parameters and Values
query: required; SPARQL query string; UTF-8; max 2048 chars in GET
format: optional; MIME type; default application/sparql-results+json
timeout: optional; integer; client-side timeout in ms; max 300000
Accept: HTTP header; MIME type; overrides format parameter

3 Supported Output Formats
application/sparql-results+json
application/sparql-results+xml
text/csv
text/tab-separated-values
application/rdf+xml
text/turtle
application/json
application/xml

4 Timeouts and Query Limits
Soft timeout: 30000 ms; returns HTTP 500 with soft timeout message
Hard timeout: 300000 ms; terminates query execution
Result set size limited by server memory

5 Rate Limiting
600 requests per minute per IP
HTTP 429 returned on limit exceed
No API key or authentication needed

6 Usage Examples
GET example:
  GET /sparql?query=...
  Accept: application/sparql-results+json
POST example:
  POST /sparql
  Content-Type: application/x-www-form-urlencoded
  body: query=...

## Original Source
SPARQL 1.1 Specifications & Public Endpoints
https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help

## Digest of WIKIDATA_SPARQL

# Endpoint

Base URL: https://query.wikidata.org/sparql
Supports HTTP GET and POST. GET URL length limit 2048 characters.

# HTTP Parameters

query (required): SPARQL query string; UTF-8 encoded
format (optional): MIME type for response; default application/sparql-results+json
timeout (optional): client-side timeout in milliseconds; max 300000
Accept header: overrides format parameter

# Supported Output Formats

application/sparql-results+json
application/sparql-results+xml
text/csv
text/tab-separated-values
application/rdf+xml
text/turtle
application/json
application/xml

# Timeouts and Query Limits

Soft timeout: 30000 ms
Hard timeout: 300000 ms
Maximum result set size constrained by memory limits

# Rate Limiting

600 requests per minute per IP
No authentication required

# Usage Examples

curl example (GET):
curl -G \
  -H "Accept: application/sparql-results+json" \
  --data-urlencode 'query=SELECT ?item ?itemLabel WHERE { ?item wdt:P31 wd:Q146 . SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } } LIMIT 10' \
  https://query.wikidata.org/sparql

curl example (POST):
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/csv" \
  --data-urlencode 'query=SELECT ?s ?p ?o WHERE { ?s ?p ?o } LIMIT 5' \
  https://query.wikidata.org/sparql

## Attribution
- Source: SPARQL 1.1 Specifications & Public Endpoints
- URL: https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Service_User_Help
- License: License
- Crawl Date: 2025-04-27T23:48:32.899Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27

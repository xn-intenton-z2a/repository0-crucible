library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
load(string,options) parses single-doc YAML into JS types or throws YAMLException; options filename, onWarning, schema (DEFAULT_SCHEMA), json (false). loadAll(string,iterator,options) handles multi-doc. dump(object,options) serializes with defaults indent=2,flowLevel=-1,skipInvalid=false,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType=' ,forceQuotes=false; supports STYLE map. CLI flags -h,--help,-v,--version,-c,--compact,-t,--trace. Schemas: FAILSAFE,JSON,CORE,DEFAULT.

## Normalised Extract
Table of Contents:
1. Method Signatures
2. Option Definitions
3. Schemas
4. Style Map
5. Supported Types
6. CLI Flags
7. Caveats

1. Method Signatures:
   - load(source: string, options?: LoadOptions) => any | throws YAMLException
   - loadAll(source: string, iterator?: (doc: any) => void, options?: LoadOptions) => any[] | void
   - dump(obj: any, options?: DumpOptions) => string

2. Option Definitions:
   LoadOptions:
     filename: string|null = null
     onWarning: (e: YAMLException)=>void|null = null
     schema: Schema = DEFAULT_SCHEMA
     json: boolean = false

   DumpOptions:
     indent: number = 2
     noArrayIndent: boolean = false
     skipInvalid: boolean = false
     flowLevel: number = -1
     styles: {[tag: string]: string} = {}
     schema: Schema = DEFAULT_SCHEMA
     sortKeys: boolean|((a: string,b: string)=>number) = false
     lineWidth: number = 80
     noRefs: boolean = false
     noCompatMode: boolean = false
     condenseFlow: boolean = false
     quotingType: "'"|"\"" = "'"
     forceQuotes: boolean = false
     replacer: ((key: string,value: any)=>any)|null = null

3. Schemas:
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

4. Style Map:
   {"!!null":"canonical","!!int":"decimal","!!bool":"lowercase","!!float":"lowercase"}

5. Supported Types:
   null, boolean, integer, float, buffer, date, omap, pairs, set, string, sequence, mapping

6. CLI Flags:
   -h,--help
   -v,--version
   -c,--compact
   -t,--trace

7. Caveats:
   Objects/arrays as keys are stringified; implicit block mapping nested keys unsupported.

## Supplementary Details
Installation:
  npm install js-yaml
  npm install -g js-yaml

Implementation Steps:
  1. require('js-yaml'), fs
  2. fs.readFileSync(path,'utf8')
  3. yaml.load(source,options) inside try/catch
  4. yaml.dump(object,options) and fs.writeFileSync if needed

Schema URLs:
  https://www.yaml.org/spec/1.2/spec.html#id2802346   (FAILSAFE_SCHEMA)
  https://www.yaml.org/spec/1.2/spec.html#id2803231   (JSON_SCHEMA)
  https://www.yaml.org/spec/1.2/spec.html#id2804923   (CORE_SCHEMA)

Configuration Effects:
  json=true: allow duplicate keys override instead of error
  skipInvalid=true: omit unsupported types on dump
  sortKeys=function: deterministic key order
  noCompatMode=true: emit YAML 1.2 features (unquoted yes/no)

Advanced Tags:
  js-yaml-js-types plugin for !!binary, !!timestamp, !!omap, !!pairs, !!set


## Reference Details
// Load API Specification
function load(source: string, options?: {
  filename?: string|null;
  onWarning?: (e: YAMLException)=>void;
  schema?: Schema;
  json?: boolean;
}): any;
Throws: YAMLException
Returns: Object|Array|String|Number|Boolean|null|undefined

// loadAll API Specification
function loadAll(source: string, iterator?: (doc: any)=>void, options?: LoadOptions): any[] | void;
Throws: YAMLException for invalid YAML
Returns: Array of documents if iterator omitted

// dump API Specification
function dump(obj: any, options?: {
  indent?: number;
  noArrayIndent?: boolean;
  skipInvalid?: boolean;
  flowLevel?: number;
  styles?: {[tag: string]: string};
  schema?: Schema;
  sortKeys?: boolean|((a:string,b:string)=>number);
  lineWidth?: number;
  noRefs?: boolean;
  noCompatMode?: boolean;
  condenseFlow?: boolean;
  quotingType?: "'"|"\"";
  forceQuotes?: boolean;
  replacer?: (key:string,value:any)=>any;
}): string;
Throws: YAMLException

// Code Example
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const src = fs.readFileSync('example.yml','utf8');
  const doc = yaml.load(src, {filename:'example.yml',schema:yaml.JSON_SCHEMA});
  console.log(doc);
} catch(e) {
  console.error(e.name, e.reason, 'at', e.mark);
}

// Best Practices:
// - Specify filename for accurate error location
// - Use json:true to match JSON.parse behavior
// - sortKeys for deterministic output in CI
// - noRefs to simplify output when refs not needed

// Troubleshooting:
// Command: js-yaml -c -t config.yml
// Expect on error: YAMLException: message at line:column
// To show stack: add -t flag


## Information Dense Extract
load(source,options)->any|throws YAMLException; options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false; loadAll(source,iterator,options)->any[]|void; dump(obj,options)->string; options indent=2,flowLevel=-1,skipInvalid=false,styles={},schema=DEFAULT_SCHEMA,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType=' ,forceQuotes=false,replacer=null; schemas: FAILSAFE,JSON,CORE,DEFAULT; CLI flags: -h,-v,-c,-t; supported types: null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map; caveats: objects as keys stringify, implicit block mapping nested keys unsupported.

## Sanitised Extract
Table of Contents:
1. Method Signatures
2. Option Definitions
3. Schemas
4. Style Map
5. Supported Types
6. CLI Flags
7. Caveats

1. Method Signatures:
   - load(source: string, options?: LoadOptions) => any | throws YAMLException
   - loadAll(source: string, iterator?: (doc: any) => void, options?: LoadOptions) => any[] | void
   - dump(obj: any, options?: DumpOptions) => string

2. Option Definitions:
   LoadOptions:
     filename: string|null = null
     onWarning: (e: YAMLException)=>void|null = null
     schema: Schema = DEFAULT_SCHEMA
     json: boolean = false

   DumpOptions:
     indent: number = 2
     noArrayIndent: boolean = false
     skipInvalid: boolean = false
     flowLevel: number = -1
     styles: {[tag: string]: string} = {}
     schema: Schema = DEFAULT_SCHEMA
     sortKeys: boolean|((a: string,b: string)=>number) = false
     lineWidth: number = 80
     noRefs: boolean = false
     noCompatMode: boolean = false
     condenseFlow: boolean = false
     quotingType: '''|'''' = '''
     forceQuotes: boolean = false
     replacer: ((key: string,value: any)=>any)|null = null

3. Schemas:
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

4. Style Map:
   {'!!null':'canonical','!!int':'decimal','!!bool':'lowercase','!!float':'lowercase'}

5. Supported Types:
   null, boolean, integer, float, buffer, date, omap, pairs, set, string, sequence, mapping

6. CLI Flags:
   -h,--help
   -v,--version
   -c,--compact
   -t,--trace

7. Caveats:
   Objects/arrays as keys are stringified; implicit block mapping nested keys unsupported.

## Original Source
js-yaml - YAML parser and dumper
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML Usage and API

## Installation

npm install js-yaml
npm install -g js-yaml

## CLI Executable

usage: js-yaml [-h] [-v] [-c] [-t] file

 Positional arguments:
  file           File with YAML document(s)

 Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
  -c, --compact  Display errors in compact mode
  -t, --trace    Show stack trace on error

## API Methods

### load(string, options)
Parses a single YAML document. Returns one of: Object, Array, String, Number, Boolean, null or undefined. Throws YAMLException on error.

Options:
  filename    (string|null) default: null
  onWarning   (function|null) default: null  Called with YAMLException on each warning
  schema      (Schema) default: DEFAULT_SCHEMA
  json        (boolean) default: false  If true, duplicate mapping keys override instead of error

Available schemas:
  FAILSAFE_SCHEMA  only strings, arrays, plain objects
  JSON_SCHEMA      JSON types: string, number, array, object, boolean, null
  CORE_SCHEMA      alias for JSON_SCHEMA
  DEFAULT_SCHEMA   all YAML types

### loadAll(string, iterator, options)
Parses multi-document YAML source. Returns Array if iterator omitted, else applies iterator(doc) for each document.

Parameters:
  string    YAML source containing one or more documents
  iterator  (function) optional
  options   same as load

### dump(object, options)
Serializes object into YAML document. Throws on unsupported types unless skipInvalid true.

Options:
  indent         (number) default: 2  Spaces per indent level
  noArrayIndent  (boolean) default: false  Do not indent array elements
  skipInvalid    (boolean) default: false  Skip non-supported types instead of throwing
  flowLevel      (number) default: -1  Nesting level to switch to flow style, -1 = always block
  styles         (object) default: {}  Map of tag strings to style strings
  schema         (Schema) default: DEFAULT_SCHEMA
  sortKeys       (boolean|function) default: false  If true or function, sort keys accordingly
  lineWidth      (number) default: 80  Max line width, -1 = unlimited
  noRefs         (boolean) default: false  Do not convert duplicates into anchors and refs
  noCompatMode   (boolean) default: false  Do not maintain YAML 1.1 compatibility
  condenseFlow   (boolean) default: false  Remove spaces in flow sequences and mappings
  quotingType    (string) default: '  Quote style for strings: ' or "
  forceQuotes    (boolean) default: false  Quote all non-key strings
  replacer       (function|null) default: null  Preprocess key,value pairs like JSON.stringify replacer

## Style Values Table

Tag    | Available styles     | Example default
!!null | canonical, lowercase, uppercase, camelcase, empty | '~'
!!int  | binary, octal, decimal, hexadecimal | '42'
!!bool | lowercase, uppercase, camelcase | 'true'
!!float| lowercase, uppercase, camelcase | '.inf'

## Supported YAML Types
!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

## Caveats
JavaScript does not support objects or arrays as keys; they are stringified via toString().
Implicit block mapping keys cannot use property access; duplicate anchors in mappings cause load errors.

Retrieved 2024-06-10 from https://github.com/nodeca/js-yaml#readme
Data Size: 611651 bytes

## Attribution
- Source: js-yaml - YAML parser and dumper
- URL: https://github.com/nodeca/js-yaml#readme
- License: License: MIT
- Crawl Date: 2025-05-01T20:47:24.718Z
- Data Size: 611651 bytes
- Links Found: 4965

## Retrieved
2025-05-01
library/OBO_FORMAT.md
# library/OBO_FORMAT.md
# OBO_FORMAT

## Crawl Summary
No technical details could be extracted; the crawl result was empty (0 bytes).

## Normalised Extract
No implementation details available; source returned no content.

## Supplementary Details
No supplementary specifications available; source returned no content.

## Reference Details
No API specifications or SDK method signatures available; source returned no content.

## Information Dense Extract
No data extracted; source empty.

## Sanitised Extract
No implementation details available; source returned no content.

## Original Source
OBO Foundry Metadata and Ontology Formats
http://www.obofoundry.org/ontology-development/ontology-file-utilization.html

## Digest of OBO_FORMAT

# OBO Foundry Metadata and Ontology Formats

No technical content available from the crawled URL as of 2024-06-01.

## Attribution
- Source: OBO Foundry Metadata and Ontology Formats
- URL: http://www.obofoundry.org/ontology-development/ontology-file-utilization.html
- License: License: CC-BY 1.0
- Crawl Date: 2025-05-01T16:48:25.126Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-01
library/SPARQL_PROTOCOL.md
# library/SPARQL_PROTOCOL.md
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
library/RDF_EXT.md
# library/RDF_EXT.md
# RDF_EXT

## Crawl Summary
Install via npm install --save rdf-ext. Import default export as rdf. Default export is instance of @rdfjs/environment. Available factories: DataFactory, DatasetFactory, FetchFactory, FormatsFactory, GrapoiFactory, NamespaceFactory, PrefixMapFactory, TermMapFactory, TermSetFactory, TraverserFactory. Experimental ScoreFactory.

## Normalised Extract
Table of Contents
1 Installation
2 Import and Default Export
3 Environment Factories
4 Experimental Features

1 Installation
  npm install --save rdf-ext

2 Import and Default Export
  import rdf from 'rdf-ext'

3 Environment Factories
  DataFactory:
    namedNode(value:string):NamedNode
    blankNode(value?:string):BlankNode
    literal(value:string, languageOrDatatype?:string|NamedNode):Literal
    defaultGraph():DefaultGraph
    variable(value:string):Variable
    quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
  DatasetFactory:
    dataset():Dataset
  FetchFactory:
    fetch(input:RequestInfo,init?:RequestInit):Promise<Response>
  FormatsFactory:
    register(format:string,serializer:Serializer):void
    get(format:string):Serializer
  GrapoiFactory:
    graphPointer(subject:Term,dataset?:Dataset):GraphPointer
  NamespaceFactory:
    namespace(uri:string):Namespace
  PrefixMapFactory:
    prefixMap(entries:Record<string,string>):PrefixMap
  TermMapFactory:
    termMap(entries:Array<[Term,Term]>):TermMap
  TermSetFactory:
    termSet(entries:Array<Term>):TermSet
  TraverserFactory:
    traverse(dataset:Dataset,options?:TraverserOptions):AsyncIterable<Term>

4 Experimental Features
  ScoreFactory:
    score(dataset:Dataset):number


## Supplementary Details
Environment instantiation: import rdf from 'rdf-ext'. rdf is preconfigured with registered factories. Node.js polyfill: npm install node-fetch; globalThis.fetch = require('node-fetch'). Default formats registered: application/n-quads->NQuadsSerializer; application/trig->TriGSerializer. To add custom serializer: formats.register('text/turtle',TurtleSerializer). Implementation steps: create dataset via rdf.dataset(); add quads via dataset.add(rdf.quad(...)); serialize via formats.get('application/n-quads').import(dataset.toStream()); async iterate output chunks. To parse: const parser=formats.parsers.get('application/n-quads'); const stream = parser.import(stringToStream(data)); const dataset = await rdf.dataset().import(stream);

## Reference Details
DataFactory
  namedNode(value:string):NamedNode
  blankNode(value?:string):BlankNode
  literal(value:string,languageOrDatatype?:string|NamedNode):Literal
  defaultGraph():DefaultGraph
  variable(value:string):Variable
  quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
  equals(a:Term,b:Term):boolean

DatasetFactory
  dataset():Dataset
  dataset(importStream:Stream<Quad>):Promise<Dataset>

FetchFactory
  fetch(input:RequestInfo,init?:RequestInit):Promise<Response>

FormatsFactory
  register(format:string,serializer:Serializer):void
  get(format:string):Serializer
  parsers:Record<string,Parser>
  serializers:Record<string,Serializer>

GrapoiFactory
  graphPointer(subject:Term,dataset?:Dataset):GraphPointer

NamespaceFactory
  namespace(uri:string):Namespace
  namespace.bind(prefix:string,uri:string):void

PrefixMapFactory
  prefixMap(entries:Record<string,string>):PrefixMap
  prefixMap.set(prefix:string,uri:string):void
  prefixMap.get(prefix:string):string|undefined

TermMapFactory
  termMap(entries:Array<[Term,Term]>):TermMap
  termMap.set(key:Term,value:Term):void
  termMap.get(key:Term):Term|undefined

TermSetFactory
  termSet(entries:Array<Term>):TermSet
  termSet.add(term:Term):void
  termSet.has(term:Term):boolean

TraverserFactory
  traverse(dataset:Dataset,options?:TraverserOptions):AsyncIterable<Term>

ScoreFactory (experimental)
  score(dataset:Dataset):number

Best practices:
  reuse rdf object factories; use streaming for large datasets; register only needed serializers.

Full code example:
  import rdf from 'rdf-ext'
  import formats from '@rdfjs/formats-common'

  const dataset = rdf.dataset()
  const quad = rdf.quad(
    rdf.namedNode('http://example.org/s'),
    rdf.namedNode('http://example.org/p'),
    rdf.literal('o')
  )
  dataset.add(quad)

  const serializer = formats.serializers.get('application/n-quads')
  const output = serializer.import(dataset.toStream())
  let result = ''
  for await (const chunk of output) {
    result += chunk.toString()
  }
  console.log(result)

Troubleshooting:
  Error: fetch is not defined in Node.js
    fix: npm install node-fetch; add globalThis.fetch = require('node-fetch') at entry.
  Error: no serializer found for mime text/turtle
    fix: npm install @rdfjs/formats-common; register: formats.serializers.get('text/turtle')

## Information Dense Extract
npm install rdf-ext; import rdf from 'rdf-ext'; rdf: @rdfjs/environment with factories: DataFactory.namedNode(string):NamedNode blankNode([string]):BlankNode literal(string,string|NamedNode):Literal defaultGraph():DefaultGraph variable(string):Variable quad(Term,Term,Term,[Term]):Quad equals(Term,Term):boolean; DatasetFactory.dataset([Stream<Quad>]):Dataset|Promise<Dataset>; FetchFactory.fetch(RequestInfo,[RequestInit]):Promise<Response>; FormatsFactory.register(string,Serializer) get(string):Serializer; GrapoiFactory.graphPointer(Term,[Dataset]):GraphPointer; NamespaceFactory.namespace(string) bind(string,string); PrefixMapFactory.prefixMap(Object); TermMapFactory.termMap(Array<[Term,Term]>); TermSetFactory.termSet(Array<Term>); TraverserFactory.traverse(Dataset,[Options]):AsyncIterable<Term>; ScoreFactory.score(Dataset):number; Node.js: globalThis.fetch=require('node-fetch'); default serializers: application/n-quads->NQuadsSerializer; code: dataset.add(rdf.quad(...)); serializer.import(dataset.toStream()); async iteration;

## Sanitised Extract
Table of Contents
1 Installation
2 Import and Default Export
3 Environment Factories
4 Experimental Features

1 Installation
  npm install --save rdf-ext

2 Import and Default Export
  import rdf from 'rdf-ext'

3 Environment Factories
  DataFactory:
    namedNode(value:string):NamedNode
    blankNode(value?:string):BlankNode
    literal(value:string, languageOrDatatype?:string|NamedNode):Literal
    defaultGraph():DefaultGraph
    variable(value:string):Variable
    quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad
  DatasetFactory:
    dataset():Dataset
  FetchFactory:
    fetch(input:RequestInfo,init?:RequestInit):Promise<Response>
  FormatsFactory:
    register(format:string,serializer:Serializer):void
    get(format:string):Serializer
  GrapoiFactory:
    graphPointer(subject:Term,dataset?:Dataset):GraphPointer
  NamespaceFactory:
    namespace(uri:string):Namespace
  PrefixMapFactory:
    prefixMap(entries:Record<string,string>):PrefixMap
  TermMapFactory:
    termMap(entries:Array<[Term,Term]>):TermMap
  TermSetFactory:
    termSet(entries:Array<Term>):TermSet
  TraverserFactory:
    traverse(dataset:Dataset,options?:TraverserOptions):AsyncIterable<Term>

4 Experimental Features
  ScoreFactory:
    score(dataset:Dataset):number

## Original Source
rdf-ext: RDF/JS Library Ecosystem
https://github.com/rdf-ext/rdf-ext

## Digest of RDF_EXT

# Installation

npm install --save rdf-ext

# Usage

import rdf from 'rdf-ext'

const term = rdf.namedNode('http://example.org/')

The default export is an instance of @rdfjs/environment containing the following factories:

DataFactory
DatasetFactory
FetchFactory
FormatsFactory
GrapoiFactory
NamespaceFactory
PrefixMapFactory
TermMapFactory
TermSetFactory
TraverserFactory

Experimental features:

ScoreFactory

# Retrieved on 2024-06-11

# Attribution

Source: rdf-ext repository README.md
Data size: 522407 bytes
Error: None

## Attribution
- Source: rdf-ext: RDF/JS Library Ecosystem
- URL: https://github.com/rdf-ext/rdf-ext
- License: License: MIT
- Crawl Date: 2025-05-01T21:46:33.396Z
- Data Size: 522407 bytes
- Links Found: 4369

## Retrieved
2025-05-01
library/SPARQL_JS.md
# library/SPARQL_JS.md
# SPARQL_JS

## Crawl Summary
SPARQL.js v3.x provides Parser and Generator classes to translate SPARQL 1.1 (including SPARQL* and property paths, federation, updates) into a JSON AST and back. Parser.parse(query:string):object constructs an RDF/JS–compliant AST. Generator.stringify(ast:object):string regenerates the SPARQL text. Parser options: skipValidation:boolean=false, sparqlStar:boolean=false, pathOnly:boolean=false. Generator options: prefixes:Record<string,string>, baseIRI:string, factory:DataFactory, sparqlStar:boolean=false, pathOnly:boolean=false. CLI tool sparql-to-json [--strict] reads .sparql files and prints JSON AST. JSON AST: { queryType:string, variables:Array<{termType,value}>, where:Array<{type,triples:[{subject,predicate,object}] }>, prefixes:Record }.

## Normalised Extract
Table of Contents

1. Installation
2. Parser API
3. Generator API
4. CLI Usage
5. JSON AST Structure
6. Configuration Options


1. Installation
   • npm install sparqljs

2. Parser API
   • Constructor signature: new Parser({ skipValidation?: boolean; sparqlStar?: boolean; pathOnly?: boolean })
   • Method: parse(query: string) => JSON AST object

3. Generator API
   • Constructor signature: new Generator({ prefixes?: Record<string,string>; baseIRI?: string; factory?: RDFJS.DataFactory; sparqlStar?: boolean; pathOnly?: boolean })
   • Method: stringify(ast: object) => SPARQL string

4. CLI Usage
   • Command: sparql-to-json [--strict] input.sparql [--output file.json]
   • --strict enforces pure SPARQL 1.1 (disables SPARQL*)

5. JSON AST Structure
   • queryType: SELECT, ASK, CONSTRUCT, DESCRIBE
   • variables: [ { termType: Variable|NamedNode|Literal, value: string, language?: string, datatype?: object } ]
   • where: [ { type: bgp|path|filter|..., triples?: [...], path?: {...}, expression?: {...} } ]
   • prefixes: { prefix: IRI }

6. Configuration Options
   • skipValidation (Parser): skip syntax-level SPARQL compliance checks (default false)
   • sparqlStar (Parser & Generator): enable SPARQL* extension (default false)
   • pathOnly (Parser & Generator): parse property paths into path objects rather than full algebra (default false)
   • strict (CLI): disable SPARQL* in CLI parser


## Supplementary Details
• Version: 3.7.3 (Latest Aug 23, 2024)
• Supports SPARQL 1.1 features: property paths, aggregates, subqueries, federated SERVICE calls, UPDATE operations via query AST.
• SPARQL* extension: nest triple patterns in subject or object fields when sparqlStar=true.
• Installation step: npm install sparqljs@3.7.3
• Integration Steps:
  1. Import: const { Parser, Generator } = require('sparqljs');
  2. Instantiate Parser: const parser = new Parser({ skipValidation: false, sparqlStar: true, pathOnly: false });
  3. Parse SPARQL text: const ast = parser.parse(sparqlText);
  4. Modify AST as needed (e.g., ast.variables = ['?x']);
  5. Instantiate Generator: const generator = new Generator({ prefixes, baseIRI, factory, sparqlStar: true });
  6. Generate SPARQL: const text = generator.stringify(ast);
• CLI integration:
  - Add bin entry in package.json: "sparql-to-json": "sparql-to-json"
  - Use in scripts: "test-queries": "sparql-to-json --strict queries/*.sparql > out.json"


## Reference Details
### Parser Class

Constructor:
```
new Parser(options?: {
  skipValidation?: boolean; // default false
  sparqlStar?: boolean;    // default false
  pathOnly?: boolean;      // default false
})
```

Methods:
```
parse(query: string): {
  queryType: 'SELECT'|'ASK'|'CONSTRUCT'|'DESCRIBE';
  variables: Array<{ termType: string; value: string; language?: string; datatype?: { termType:string; value:string } }>;
  where: Array<{
    type: string;
    triples?: Array<{ subject: object; predicate: object; object: object }>;
    path?: object;
    expression?: object;
  }>;
  prefixes: Record<string,string>;
  type: 'query';
};
```
Throws SyntaxError on invalid SPARQL syntax unless skipValidation=true.

### Generator Class

Constructor:
```
new Generator(options?: {
  prefixes?: Record<string,string>; // default {}
  baseIRI?: string;                 // default undefined
  factory?: RDFJS.DataFactory;      // default RDF/JS default factory
  sparqlStar?: boolean;             // default false
  pathOnly?: boolean;               // default false
})
```

Methods:
```
stringify(ast: object): string
```
Produces valid SPARQL 1.1 text. Respects prefixes and baseIRI. Throws Error on unsupported AST shapes.

### CLI Usage

Command:
```
sparql-to-json [--strict] <input.sparql> [--output <file.json>]
```
Options:
• --strict: parse pure SPARQL 1.1 only (disables SPARQL*)
• input.sparql: path to SPARQL file
• --output: path to write JSON AST (stdout if omitted)

Exit Codes:
• 0: success
• 1: parse error (prints error message to stderr)

### Configuration Options

Parser options:
• skipValidation: skip spec compliance tests (true|false)
• sparqlStar: enable SPARQL* syntax (true|false)
• pathOnly: parse property paths into path constructs instead of triples (true|false)

Generator options:
• prefixes: shorthand->IRI map
• baseIRI: base IRI for relative names
• factory: custom RDF/JS DataFactory
• sparqlStar: emit SPARQL* triple patterns
• pathOnly: emit property path syntax

### Best Practices

1. Always supply prefixes in Generator to avoid auto-expanding IRIs.
2. Use skipValidation=false in production to catch non-compliant queries.
3. Use sparqlStar=true only when dealing with RDF* data.
4. Wrap parse and stringify calls in try/catch to handle errors gracefully.

### Troubleshooting

Parse errors:
```
try {
  const ast = parser.parse(text);
} catch (err) {
  console.error('ParseError:', err.message);
  process.exit(1);
}
```
CLI error example:
```
$ sparql-to-json query.sparql
Error: Unmatched brace at line 3: ...
Exit code: 1
```
Use --strict to disable SPARQL* if unexpected triple nesting:
```
$ sparql-to-json --strict query-with-star.sparql
```

## Information Dense Extract
Parser(options:{skipValidation:boolean=false,sparqlStar:boolean=false,pathOnly:boolean=false}).parse(query:string)->AST{queryType:string,variables:Array<{termType,value,language?,datatype?}>,where:Array<{type,triples?,path?,expression?}>,prefixes:Record,type:'query'};Generator(options:{prefixes?:Record,baseIRI?:string,factory?:DataFactory,sparqlStar?:boolean=false,pathOnly?:boolean=false}).stringify(AST)->string;CLI:sparql-to-json [--strict(false)] <in.sparql> [--output out.json],exit0/1;AST structure matches RDF/JS objects;options defaults enforce SPARQL1.1+extensions;best practices: supply prefixes,use skipValidation=false;troubleshoot via try/catch and --strict flag.

## Sanitised Extract
Table of Contents

1. Installation
2. Parser API
3. Generator API
4. CLI Usage
5. JSON AST Structure
6. Configuration Options


1. Installation
    npm install sparqljs

2. Parser API
    Constructor signature: new Parser({ skipValidation?: boolean; sparqlStar?: boolean; pathOnly?: boolean })
    Method: parse(query: string) => JSON AST object

3. Generator API
    Constructor signature: new Generator({ prefixes?: Record<string,string>; baseIRI?: string; factory?: RDFJS.DataFactory; sparqlStar?: boolean; pathOnly?: boolean })
    Method: stringify(ast: object) => SPARQL string

4. CLI Usage
    Command: sparql-to-json [--strict] input.sparql [--output file.json]
    --strict enforces pure SPARQL 1.1 (disables SPARQL*)

5. JSON AST Structure
    queryType: SELECT, ASK, CONSTRUCT, DESCRIBE
    variables: [ { termType: Variable|NamedNode|Literal, value: string, language?: string, datatype?: object } ]
    where: [ { type: bgp|path|filter|..., triples?: [...], path?: {...}, expression?: {...} } ]
    prefixes: { prefix: IRI }

6. Configuration Options
    skipValidation (Parser): skip syntax-level SPARQL compliance checks (default false)
    sparqlStar (Parser & Generator): enable SPARQL* extension (default false)
    pathOnly (Parser & Generator): parse property paths into path objects rather than full algebra (default false)
    strict (CLI): disable SPARQL* in CLI parser

## Original Source
SPARQL.js - SPARQL Parser in JavaScript
https://github.com/RubenVerborgh/SPARQL.js

## Digest of SPARQL_JS

# Installation

npm install sparqljs

# Parser API

### Constructor

new Parser(options?: {
  skipValidation?: boolean;
  sparqlStar?: boolean;
  pathOnly?: boolean;
})

### Method

parser.parse(query: string): object

# Generator API

### Constructor

new Generator(options?: {
  prefixes?: Record<string,string>;
  baseIRI?: string;
  factory?: RDFJS.DataFactory;
  sparqlStar?: boolean;
  pathOnly?: boolean;
})

### Method

generator.stringify(queryObject: object): string

# CLI

```bash
sparql-to-json [--strict] <input.sparql> [--output <file.json>]
```

# JSON Representation

- queryType: "SELECT" | "ASK" | "CONSTRUCT" | "DESCRIBE"
- variables: Array<{ termType: string; value: string }>
- where: Array<{ type: string; triples: Array<{ subject: object; predicate: object; object: object }> }>
- prefixes: Record<string,string>

# Options

- skipValidation: boolean (default: false)
- sparqlStar: boolean (default: false)
- pathOnly: boolean (default: false)
- strict (CLI): boolean (default: false)

# License

MIT License

_Retrieved on: 2024-06-04_
_Data Size: 587512 bytes_

## Attribution
- Source: SPARQL.js - SPARQL Parser in JavaScript
- URL: https://github.com/RubenVerborgh/SPARQL.js
- License: License: MIT
- Crawl Date: 2025-05-01T18:50:36.316Z
- Data Size: 587512 bytes
- Links Found: 4918

## Retrieved
2025-05-01
library/JSON_LD_SYNTAX.md
# library/JSON_LD_SYNTAX.md
# JSON_LD_SYNTAX

## Crawl Summary
@context: must be IRI,map,array. Term definitions: string→IRI or map with @id,@type,@container,@language,@direction,@protected,@reverse,@context. Keywords: @id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version,@nest. Top-level forms: expanded,compacted,flattened,framed. Data structures: node,value,list,set,graph. Processing mode: default json-ld-1.1 or numeric @version1.1. IRI resolution: base IRI from document or @base. All keys are case-sensitive.

## Normalised Extract
Table of Contents:
1 Context Definitions
2 Keywords and Syntax Tokens
3 Data Structures
4 Document Forms
5 Grammar Productions

1 Context Definitions
@context: value must be one of:
  IRI (absolute or relative)
  map of term definitions
  array of any combination of the above
Term definition:
  simple: string→IRI
  expanded: map with entries:
    @id: IRI
    @type: IRI
    @container: @list,@set,@language,@index,@id,@type,@graph
    @language: BCP47 tag or null
    @direction: ltr, rtl or null
    @protected: true|false
    @reverse: true|false
    @context: IRI, map or array

2 Keywords and Syntax Tokens
Keywords: @context,@id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version,@nest
All keywords and values are case-sensitive.
@version must be numeric 1.1 to activate JSON-LD1.1 processing mode.

3 Data Structures
Node object: map without top-level @value,@list,@set or with other properties.
Value object: map with @value and optional @type,@language,@index.
List object, Set object: map with @list or @set and optional @index.
Graph object: map with @graph and optional @id,@index.
Language map: map BCPT47 tag → string|array|null.
Index map: map scalar|node/value/list/set → scalar,array,object.

4 Document Forms
Expanded: all IRIs absolute, all values arrays, omit defaults.
Compacted: use terms for IRIs, collapse values when default applies, arrays for lists.
Flattened: one array of node objects with unique @id.
Framed: apply frame document maps with @embed,@explicit,@omitDefault.

5 Grammar Productions
ContextDefinition = object-literal / IRI / array
TermDefinition    = string / map
Keyword           = %x40context / %x40id / %x40type / ... / %x40nest


## Supplementary Details
Processing mode option: json-ld-1.1 (default), or json-ld-1.0 via API option processingMode: 'json-ld-1.0'.
Base IRI precedence: @base in context > document location.
Compact IRI form: prefix:suffix where prefix maps via context term to IRI string ending in terminating character (/, #, :).
Default vocabulary (@vocab): IRI to prepend to unprefixed terms in compact form.
@language default: BCP47 code or null disables language coercion.
@direction default: 'ltr','rtl' or null disables direction.
@protected:true in term prevents context overrides.
@reverse:true alias for @reverse property mapping.
Language-tagged string representation: { "@value":string, "@language":BCP47 }.
Typed value representation: { "@value":string, "@type":datatypeIRI }.
Note: Arrays preserve order; Sets unordered unless explicitly @list.


## Reference Details
Grammar:
ContextDefinition：《IRI》 | 《object》 | 《array》
TermDefinition ：《string》 | 《object》
Keyword token codes: @context (0x40 636f6e74657874), @id, @type, @value, @language, @direction, @list, @set, @reverse, @graph, @included, @index, @container, @vocab, @base, @version, @nest

Example Context Binding:
{
  "@context":{
    "schema":"http://schema.org/",
    "name":"schema:name",
    "homepage":{
      "@id":"schema:url",
      "@type":"@id"
    }
  }
}

Implementation Pattern:
1 Parse JSON into core data structures (arrays,maps,strings,numbers,booleans,null).
2 Load active context from @context entries (merge local then remote contexts).
3 Expand terms: replace keys via context term definitions to full IRIs.
4 Apply container rules: wrap or unwrap lists, sets, maps by @container.
5 Normalize values: coerce to object form for value, list, set.
6 Flatten or frame if specified by API.
7 Serialize to target form (expanded/compacted/flattened/framed).

API Usage (JavaScript SDK):
jsonld.compact(input, context, options, callback)
  input: object or URL
  context: object or URL
  options.processingMode: 'json-ld-1.0'|'json-ld-1.1'
  options.base: IRI string
  options.expandContext: array of contexts
  callback(err, compacted)
jsonld.expand(input, options, callback)
  options.processingMode, base, documentLoader
jsonld.flatten(input, context?, options, callback)
jsonld.frame(input, frame, options, callback)

Configuration Options:
processingMode: default 'json-ld-1.1'
base: IRI string, defaults to document URL
documentLoader: function to fetch remote contexts, default HTTP GET
maxContextUrlLength: 2048 characters

Best Practices:
- Always declare @context at the top-level.
- Use @vocab to reduce long IRI values.
- Use @protected:true on shared contexts to prevent injection.
- Prefer @type:@id to enforce IRI typing.

Troubleshooting:
Error: Invalid keyword "@cntxt"
  Check @context spelling and case.
Error: Remote context load failed
  Verify documentLoader network access or supply custom loader:
  options.documentLoader = function(url,callback){ /* fetch or return local copy */ }
Command-line CLI (jsonld-tool):
Expand: jsonld -i input.json -o expanded.jsonld --validate false
Compact: jsonld -i expanded.jsonld -c context.json -o compacted.jsonld


## Information Dense Extract
@context: IRI|map|array. Term definition map keys:@id IRI,@type IRI,@container in[@list,@set,@language,@index,@id,@type,@graph],@language BCP47|null,@direction ltr|rtl|null,@protected boolean,@reverse boolean,@context IRI|map|array. Keywords(case-sensitive):@context,@id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version(1.1),@nest. Data structures: node object,map without top-level value/list/set; value object {@value,optional @type/@language/@index}; list/set object {@list/@set,optional @index}; graph object {@graph,optional @id/@index}; language map {tag→string|array|null}; index map {key→value}. Forms: expanded(all IRIs absolute, arrays, omit defaults),compacted(use terms,prefixes,default coercion),flattened(unique @id array),framed(match/embed rules). Grammar: ContextDefinition=object|IRI|array; TermDefinition=string|object; Keyword tokens:%x40context/%x40id/.../%x40nest. Processing: parse→load context→expand IRIs→apply containers→normalize→frame/flatten→serialize. API methods(jsonld.compact,expand,flatten,frame) signatures with input,context/frame,options{processingMode,base,documentLoader},callback(err,output). Default processingMode json-ld-1.1. Base IRI precedence:@base>@documentLocator. DocumentLoader default HTTP GET. maxContextUrlLength=2048. Best practices:@vocab,@protected,true,@type:@id. Troubleshoot: invalid keyword,loader errors; CLI: jsonld -i in -o out --validate false.

## Sanitised Extract
Table of Contents:
1 Context Definitions
2 Keywords and Syntax Tokens
3 Data Structures
4 Document Forms
5 Grammar Productions

1 Context Definitions
@context: value must be one of:
  IRI (absolute or relative)
  map of term definitions
  array of any combination of the above
Term definition:
  simple: stringIRI
  expanded: map with entries:
    @id: IRI
    @type: IRI
    @container: @list,@set,@language,@index,@id,@type,@graph
    @language: BCP47 tag or null
    @direction: ltr, rtl or null
    @protected: true|false
    @reverse: true|false
    @context: IRI, map or array

2 Keywords and Syntax Tokens
Keywords: @context,@id,@type,@value,@language,@direction,@list,@set,@reverse,@graph,@included,@index,@container,@vocab,@base,@version,@nest
All keywords and values are case-sensitive.
@version must be numeric 1.1 to activate JSON-LD1.1 processing mode.

3 Data Structures
Node object: map without top-level @value,@list,@set or with other properties.
Value object: map with @value and optional @type,@language,@index.
List object, Set object: map with @list or @set and optional @index.
Graph object: map with @graph and optional @id,@index.
Language map: map BCPT47 tag  string|array|null.
Index map: map scalar|node/value/list/set  scalar,array,object.

4 Document Forms
Expanded: all IRIs absolute, all values arrays, omit defaults.
Compacted: use terms for IRIs, collapse values when default applies, arrays for lists.
Flattened: one array of node objects with unique @id.
Framed: apply frame document maps with @embed,@explicit,@omitDefault.

5 Grammar Productions
ContextDefinition = object-literal / IRI / array
TermDefinition    = string / map
Keyword           = %x40context / %x40id / %x40type / ... / %x40nest

## Original Source
W3C JSON-LD 1.1 Core, API & Processing Algorithms
https://www.w3.org/TR/json-ld11/

## Digest of JSON_LD_SYNTAX

# JSON-LD 1.1 Syntax
Date retrieved: 2024-06-15

# Context Definitions

@context value     : IRI | map | array of IRI or map
Term definition    : string → IRI | map → expanded term definition
Expanded term keys : @id (IRI), @type (IRI), @container (one of @list,@set,@language,@index,@id,@type,@graph), @language (BCP47 or null), @direction (ltr,rtl or null), @protected (boolean), @reverse (boolean), @context (embedded context)

# Syntax Tokens and Keywords

Keywords          : @context, @id, @type, @value, @language, @direction, @list, @set, @reverse, @graph, @included, @index, @container, @vocab, @base, @version, @nest
Case-sensitivity : All keys, keywords, values are case-sensitive
Version keyword  : @version must be numeric 1.1 to activate JSON-LD 1.1 features

# Data Model Overview

Node object       : map not containing @value,@list,@set at top plus other keys or maps of properties
Value object      : map containing exactly @value and optional @type,@language,@index
Graph object      : map with @graph entry and optional @id,@index
List object       : map with @list and optional @index
Set object        : map with @set and optional @index
Language map      : map from BCP47 tag to string,array or null
Index map         : map from any scalar or node/value/list/set to values

# Expanded Form

Rules:
  All IRIs fully expanded
  All values as arrays
  Omit defaults: @language,null @direction,null

# Compacted Form

Rules:
  Compact IRIs using defined term prefixes
  Shorten values to strings when typing and language default apply
  Represent lists as arrays

# Framed Form

Frame document    : node/value maps containing match conditions and transform rules
Frame keys        : @embed, @explicit, @omitDefault

# JSON-LD Grammar (ABNF)

ContextDefinition = object-literal / IRI / array
TermDefinition    = string / map
Keyword           = %x40 context / %x40 id / %x40 type / %x40 value / %x40 language / %x40 direction / %x40 list / %x40 set / %x40 reverse / %x40 graph / %x40 included / %x40 index / %x40 container / %x40 vocab / %x40 base / %x40 version / %x40 nest


## Attribution
- Source: W3C JSON-LD 1.1 Core, API & Processing Algorithms
- URL: https://www.w3.org/TR/json-ld11/
- License: License if known
- Crawl Date: 2025-05-01T04:51:55.443Z
- Data Size: 18953733 bytes
- Links Found: 133857

## Retrieved
2025-05-01
library/OWLAPI.md
# library/OWLAPI.md
# OWLAPI

## Crawl Summary
No content available from OWL API (Java) documentation crawl. Data Size 0 bytes.

## Normalised Extract


## Supplementary Details


## Reference Details


## Information Dense Extract
No content available from OWL API (Java) documentation crawl. Data Size 0 bytes.

# OWL API Java Documentation

No technical content retrieved.

Document retrieved on: 2024-06-20

## Sanitised Extract
No content available from OWL API (Java) documentation crawl. Data Size 0 bytes.

# OWL API Java Documentation

No technical content retrieved.

Document retrieved on: 2024-06-20

## Original Source
OWL API (Java) Documentation
http://owlcs.github.io/owlapi/apidocs/

## Digest of OWLAPI

# OWL API Java Documentation

No technical content retrieved.

Document retrieved on: 2024-06-20

## Attribution
- Source: OWL API (Java) Documentation
- URL: http://owlcs.github.io/owlapi/apidocs/
- License: License: LGPL-3.0-or-later
- Crawl Date: 2025-05-01T19:44:40.841Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-01
library/RDF_STAR.md
# library/RDF_STAR.md
# RDF_STAR

## Crawl Summary


## Normalised Extract


## Supplementary Details


## Reference Details


## Information Dense Extract


## Sanitised Extract


## Original Source
RDF-Star
https://www.w3.org/TR/rdf-star/

## Digest of RDF_STAR



## Attribution
- Source: RDF-Star
- URL: https://www.w3.org/TR/rdf-star/
- License: W3C Software and Document License
- Crawl Date: 2025-05-01T14:46:58.464Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-01
library/BLOCK_API.md
# library/BLOCK_API.md
# BLOCK_API

## Crawl Summary
POST to /w/api.php action=block supports required parameters: user (user|IP|#ID), token (CSRF), optional id (integer), expiry (string duration or timestamp, default never), reason (string), flags boolean: anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial; additional parameters watchlistexpiry (timestamp), tags (pipe list), pagerestrictions (pipe list max10), namespacerestrictions (pipe list or *), actionrestrictions (pipe list); format=json

## Normalised Extract
Table of Contents
1 Endpoint and Method
2 Authentication and Token Retrieval
3 Parameter Reference
4 Example Requests

1 Endpoint and Method
URL: https://www.wikidata.org/w/api.php
Method: POST

2 Authentication and Token Retrieval
GET https://www.wikidata.org/w/api.php?action=query&meta=tokens&type=csrf&format=json
Response: {
  query: { tokens: { csrftoken: "TOKEN_VALUE" } }
}
Include token_value in POST requests as token parameter.

3 Parameter Reference
action: block (fixed)
user: user string specifying username IP or #ID. Required.
id: integer block entry ID to modify.
expiry: string relative duration or ISO8601 timestamp. Default never.
reason: string block log comment.
anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial: flags set by including parameter name with empty value.
watchlistexpiry: ISO8601 timestamp.
tags: pipe separated tags. Allowed values see tag list documentation.
pagerestrictions: pipe separated page titles, max10.
namespacerestrictions: pipe separated namespace ids or *. 
actionrestrictions: pipe separated action names.
token: CSRF token string. Required.
format: json (default).

4 Example Requests
POST body urlencoded
  action=block&user=192.0.2.5&expiry=3 days&reason=First strike&token=ABC123
POST body urlencoded
  action=block&user=Vandal&expiry=never&reason=Vandalism&nocreate=&autoblock=&noemail=&token=ABC123

## Supplementary Details
Implementation Steps
1 Retrieve CSRF token via query meta tokens type csrf.
2 Compose POST request with Content-Type: application/x-www-form-urlencoded.
3 Include required parameters action, user, token and optional parameters as needed.
4 Send request. Expect HTTP 200 with JSON response.
5 On error code badtoken retrieve new token and retry.

Configuration Options
Content-Type: application/x-www-form-urlencoded or application/json with body as JSON.
Timeout: 30s recommended.
Retries: up to 3 on transient server errors (HTTP 5xx).
Redirects: follow by default.

Error Handling
missingtoken or badtoken: fetch new CSRF token.
invaliduser or cantblockself: validate user parameter.
toomanyrequests: implement backoff and respect rate limit headers.

Dependencies
Works with any HTTP client supporting POST and URL encoding.


## Reference Details
API Endpoint: https://www.wikidata.org/w/api.php
HTTP Method: POST

Request Parameters
- action (string) Required. Value must be block.
- format (string) Optional. Default json.
- user (string) Required. Username, IP, or user ID (#ID).
- id (integer) Optional. Block entry ID to modify.
- expiry (string) Optional. Default never. Relative (e.g. 2 weeks) or absolute ISO8601.
- reason (string) Optional. Default empty.
- anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial (boolean flags). Set by including parameter name.
- watchlistexpiry (string) Optional. ISO8601 timestamp.
- tags (string) Optional. Pipe separated tag identifiers.
- pagerestrictions (string) Optional. Pipe separated page titles max10.
- namespacerestrictions (string) Optional. Pipe separated namespace IDs or *.
- actionrestrictions (string) Optional. Pipe separated actions create move thanks upload.
- token (string) Required. CSRF token.

Response Fields
- batchcomplete (string)
- blocked (object)
  - user (string) blocked username or IP
  - type (string) global or partial
  - id (integer) block entry id
  - expiry (string) expiry timestamp or duration
  - reason (string) block reason

SDK Method Signatures
JavaScript (Node fetch)
async function blockUser({user, token, expiry = 'never', reason = '', flags = {}}) {
  const url = 'https://www.wikidata.org/w/api.php';
  const params = new URLSearchParams({action: 'block', format: 'json', user, expiry, reason, token});
  Object.keys(flags).forEach(flag => { if (flags[flag]) params.append(flag, ''); });
  const res = await fetch(url, {method: 'POST', body: params, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  const json = await res.json();
  return json.blocked;
}

Python (requests)
def block_user(session, user, token, expiry='never', reason='', **flags):
    url = 'https://www.wikidata.org/w/api.php'
    data = {'action': 'block', 'format': 'json', 'user': user, 'expiry': expiry, 'reason': reason, 'token': token}
    for flag, val in flags.items():
        if val: data[flag] = ''
    resp = session.post(url, data=data, timeout=30)
    resp.raise_for_status()
    return resp.json().get('blocked')

Best Practices
- Always fetch fresh CSRF token before write.
- Minimize scope by using flags only when necessary.
- Validate expiry formats.
- Handle rate limit responses with exponential backoff.

Troubleshooting
Curl example and expected output:
$ curl -s -X POST -d action=block -d user=Vandal -d expiry=never -d reason=Test -d token=ABC123 https://www.wikidata.org/w/api.php
{"batchcomplete":"","blocked":{"user":"Vandal","type":"global","id":456,"expiry":"infinite","reason":"Test"}}
Error Codes
- badtoken: CSRF token missing or invalid. Retrieve new token.
- invaliduser: user parameter invalid. Check spelling or format.
- missingparam: required parameter not provided.
- toomanyrequests: rate limit exceeded, retry later.


## Information Dense Extract
POST https://www.wikidata.org/w/api.php?action=block&format=json Required: user string expiry string token string Optional flags: anononly nocreate autoblock noemail hidename allowusertalk reblock newblock watchuser partial Optional lists: tags pageRestrictions nameSpaceRestrictions actionRestrictions watchListExpiry id integer Example: curl -X POST -d action=block -d user=User -d expiry="3 days" -d token=TOKEN https://www.wikidata.org/w/api.php

## Sanitised Extract
Table of Contents
1 Endpoint and Method
2 Authentication and Token Retrieval
3 Parameter Reference
4 Example Requests

1 Endpoint and Method
URL: https://www.wikidata.org/w/api.php
Method: POST

2 Authentication and Token Retrieval
GET https://www.wikidata.org/w/api.php?action=query&meta=tokens&type=csrf&format=json
Response: {
  query: { tokens: { csrftoken: 'TOKEN_VALUE' } }
}
Include token_value in POST requests as token parameter.

3 Parameter Reference
action: block (fixed)
user: user string specifying username IP or #ID. Required.
id: integer block entry ID to modify.
expiry: string relative duration or ISO8601 timestamp. Default never.
reason: string block log comment.
anononly, nocreate, autoblock, noemail, hidename, allowusertalk, reblock, newblock, watchuser, partial: flags set by including parameter name with empty value.
watchlistexpiry: ISO8601 timestamp.
tags: pipe separated tags. Allowed values see tag list documentation.
pagerestrictions: pipe separated page titles, max10.
namespacerestrictions: pipe separated namespace ids or *. 
actionrestrictions: pipe separated action names.
token: CSRF token string. Required.
format: json (default).

4 Example Requests
POST body urlencoded
  action=block&user=192.0.2.5&expiry=3 days&reason=First strike&token=ABC123
POST body urlencoded
  action=block&user=Vandal&expiry=never&reason=Vandalism&nocreate=&autoblock=&noemail=&token=ABC123

## Original Source
Wikidata REST API
https://www.wikidata.org/w/api.php

## Digest of BLOCK_API

# Block API Module
Source MediaWiki License GPL-2.0-or-later
Check to block a user or IP address via the MediaWiki action API

# Endpoint
https://www.wikidata.org/w/api.php
Method: POST (only accepts POST requests for write operations)

# Parameters
id             Type: integer        The existing block entry ID to modify. Optional when modifying a specific block.
user           Type: user           Username, IP address, temporary user, IP range or user ID (#ID). Required.
expiry         Type: string         Expiry timestamp or duration. Relative (e.g. 5 months, 2 weeks, 3 days) or absolute (e.g. 2014-09-18T12:34:56Z). Keywords infinite, indefinite, never for no expiry. Default: never.
reason         Type: string         Block log reason. Default: empty.
anononly       Type: boolean        Block anonymous users only. Use value yes or empty flag. Default: unset.
nocreate       Type: boolean        Prevent account creation by blocked IP. Use flag. Default: unset.
autoblock      Type: boolean        Also block last used IP and subsequent addresses. Use flag. Default: unset.
noemail        Type: boolean        Prevent sending email through wiki. Requires blockemail right. Use flag. Default: unset.
hidename       Type: boolean        Hide blocked name in log. Requires hideuser right. Use flag. Default: unset.
allowusertalk  Type: boolean        Allow blocked user to edit own talk page (depends on wgBlockAllowsUTEdit). Use flag. Default: unset.
reblock        Type: boolean        Overwrite existing single block. Fails if multiple blocks. Use flag. Default: unset.
newblock       Type: boolean        Always create a new block even if existing. Use flag. Default: unset.
watchuser      Type: boolean        Watch the user and talk pages. Use flag. Default: unset.
watchlistexpiry Type: expiry         Timestamp for watchlist expiry. Omit to leave unchanged.
tags           Type: list           Pipe-separated list of tag identifiers. See tag value list. Default: none.
partial        Type: boolean        Restrict block to specific pages or namespaces. Use flag. Default: unset.
pagerestrictions       Type: list   Pipe-separated list of page titles (must exist). Max 10 values. Only with partial.
namespacerestrictions Type: list    Pipe-separated list of namespace IDs or '*' for all. Only with partial.
actionrestrictions    Type: list    Pipe-separated list of actions to block (create, move, thanks, upload). Only with partial.
token          Type: string        CSRF token obtained via action=query&meta=tokens&type=csrf. Required.
format         Type: string        Response format. Default: json.

# Examples
Block IP address 192.0.2.5 for three days with reason
POST https://www.wikidata.org/w/api.php
  action=block
  user=192.0.2.5
  expiry=3 days
  reason=First strike
  token=123ABC

Block user Vandal indefinitely, prevent account creation and email
POST https://www.wikidata.org/w/api.php
  action=block
  user=Vandal
  expiry=never
  reason=Vandalism
  nocreate=
  autoblock=
  noemail=
  token=123ABC

## Attribution
- Source: Wikidata REST API
- URL: https://www.wikidata.org/w/api.php
- License: Public Domain
- Crawl Date: 2025-05-01T11:45:48.287Z
- Data Size: 838618 bytes
- Links Found: 1578

## Retrieved
2025-05-01
library/HYDRA_CORE.md
# library/HYDRA_CORE.md
# HYDRA_CORE

## Crawl Summary
Namespace hydra defined at http namespace. Core classes Link, Operation, ApiDocumentation, Class, SupportedProperty, Collection, PartialCollectionView, IriTemplate, IriTemplateMapping, Status, Error. Link indicates dereferenceable property. Operation includes HTTP method and optional expects returns status and header specs. ApiDocumentation defines entry point, supported classes. SupportedProperty allows marking required readable writable flags. Collections support paging via PartialCollectionView. IriTemplate with template literal, mappings, variableRepresentation, resolveRelativeTo. Status encapsulates HTTP status codes and descriptions; Error subclass for errors. Remote JSON-LD context available.

## Normalised Extract
Table of Contents

1 Namespace Declaration
2 Link Class
3 Operation Class
4 ApiDocumentation Class
5 Class Description
6 SupportedProperty Class
7 Collection and PartialCollectionView
8 IriTemplate Class
9 IriTemplateMapping Class
10 Status and Error

1 Namespace Declaration
Prefix hydra maps to IRI http://www.w3.org/ns/hydra/core
Suggested use of prefix hydra in JSON LD contexts

2 Link Class
hydra Link is subclass of rdf Property
Use hydra property to define dereferenceable links
Properties
 hydra property IRI of linked property
 hydra templated boolean indicating templated link use

3 Operation Class
hydra Operation extends hydra Link
Required property hydra method one of HTTP methods GET POST PUT DELETE PATCH HEAD OPTIONS
Optional properties
 hydra expects IRI of expected resource class
 hydra returns IRI of returned resource class
 hydra possibleStatus list of hydra Status instances with hydra statusCode integer
 hydra expectsHeader list of header names required in request
 hydra returnsHeader list of header names returned in response
 hydra title human readable title literal
 hydra description human readable description literal

4 ApiDocumentation Class
Define top level API documentation resource
Required property hydra entrypoint IRI of entry point resource
Optional properties
 hydra title literal
 hydra description literal
 hydra supportedClass list of hydra Class instances describing resource classes

5 Class Description
hydra Class describes resource type
Properties
 hydra title literal
 hydra description literal
 hydra supportedProperty list of hydra SupportedProperty entries
 hydra supportedOperation list of hydra Operation entries

6 SupportedProperty Class
Describes property usage on a class
Properties
 hydra property IRI of property
 hydra required boolean default false
 hydra readable boolean default true
 hydra writable boolean default true

7 Collection and PartialCollectionView
hydra Collection holds hydra member list of resources
hydra PartialCollectionView subclasses hydra Collection
 Optional paging properties hydra first hydra last hydra next hydra previous all IRIs
 hydra member same as Collection

8 IriTemplate Class
Describe runtime URL templates
Properties
 hydra template literal using RFC6570 syntax
 hydra variableRepresentation Literal default BasicRepresentation explicit or basic
 hydra mapping list of hydra IriTemplateMapping entries
 hydra resolveRelativeTo IRI to base expansion context

9 IriTemplateMapping Class
Maps template variable to property
Properties
 hydra variable literal name in template
 hydra property IRI of linked property for value extraction
 hydra required boolean default false

10 Status and Error
hydra Status encapsulates HTTP status details
Properties
 hydra statusCode integer HTTP status code
 hydra title literal short description
 hydra description literal detailed description
hydra Error subclass of hydra Status for error semantics

## Supplementary Details
Implementation Steps

1 Add context reference to JSON LD responses using @context "http://www.w3.org/ns/hydra/context.jsonld"
2 Annotate hyperlinks with hydra Link properties to mark dereferenceable links
3 Embed hydra Operation entries in resource representations under hydra operation
   a Set hydra method to desired HTTP method
   b Optionally set hydra expects and hydra returns to resource class IRIs
   c Document possible HTTP status codes using hydra possibleStatus entries with hydra statusCode values
4 Document API entry point using HTTP Link header
   Name: Link
   Relation: http://www.w3.org/ns/hydra/core#apiDocumentation
   Value: URL of ApiDocumentation resource
5 Create ApiDocumentation resource at specified URL
   a Set @type hydra ApiDocumentation
   b Set hydra entrypoint to root resource IRI
   c Populate hydra supportedClass entries for each resource class
6 Define hydra Class entries
   a Use hydra supportedProperty to list class properties with hydra property IRIs and flags required readable writable
   b Use hydra supportedOperation for operations on all instances of class
7 Use hydra Collection and PartialCollectionView for collections and paging
   a Include hydra member entries
   b Link to pages using hydra first last next previous
8 When runtime URL construction needed use hydra IriTemplate
   a Define hydra template literal using RFC6570 syntax
   b List hydra mapping entries mapping template variables to properties
   c Optionally set hydra variableRepresentation to ExplicitRepresentation for type aware serialization
9 Use hydra Status and Error to document possible status codes and error types
   a Subclass hydra Status for custom error types
   b Return application/problem+json content with appropriate hydra error context header


## Reference Details
Full JSON LD Example of ApiDocumentation and Resource Descriptions

{
  "@context":"http://www.w3.org/ns/hydra/context.jsonld",
  "@type":"hydra:ApiDocumentation",
  "@id":"http://api.example.com/doc/",
  "hydra:title":"Issue Tracker API",
  "hydra:description":"Manage issues with hypermedia",
  "hydra:entrypoint":{"@id":"http://api.example.com/vocab#entry"},
  "hydra:supportedClass":[
    {
      "@id":"http://api.example.com/vocab#Issue",
      "@type":"hydra:Class",
      "hydra:title":"Issue",
      "hydra:description":"A reported issue",
      "hydra:supportedProperty":[
        {
          "hydra:property":"schema:title",
          "hydra:required":true,
          "hydra:readable":true,
          "hydra:writable":false
        },
        {
          "hydra:property":"schema:creator",
          "hydra:required":false,
          "hydra:readable":true,
          "hydra:writable":false
        }
      ],
      "hydra:supportedOperation":[
        {
          "@type":"hydra:Operation",
          "hydra:method":"GET",
          "hydra:expects":"http://api.example.com/vocab#Issue",
          "hydra:returns":"http://api.example.com/vocab#Issue",
          "hydra:possibleStatus":[{"@type":"hydra:Status","hydra:statusCode":200}],
          "hydra:expectsHeader":["Accept"],
          "hydra:returnsHeader":["Content-Type"]
        },
        {
          "@type":"hydra:Operation",
          "hydra:method":"DELETE",
          "hydra:possibleStatus":[{"@type":"hydra:Status","hydra:statusCode":204}],
          "hydra:expectsHeader":["Authorization"],
          "hydra:returnsHeader":["Link"]
        }
      ]
    }
  ]
}

HTTP Discovery Example

Request
curl -I -H "Accept: application/ld+json" http://api.example.com/

Response Headers
Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"

Troubleshooting

Problem: No hydra apiDocumentation link header returned
Solution:
  1 Send HTTP HEAD request instead of GET
  2 Check alternative content types application/json or application/ld+json
  3 Inspect response bodies for @context entries

curl -I -H "Accept: application/ld+json" http://api.example.com/entry
Expected: Link header with rel http://www.w3.org/ns/hydra/core#apiDocumentation

## Information Dense Extract
hydra prefix http://www.w3.org/ns/hydra/core context URL http://www.w3.org/ns/hydra/context.jsonld hydra Link subclass of rdf Property marks dereferenceable property hydra templated boolean hydra Operation subclass of hydra Link method required one of GET POST PUT DELETE PATCH HEAD OPTIONS hydra expects IRI hydra returns IRI hydra possibleStatus hydra Status entries hydra expectsHeader hydra returnsHeader hydra title literal hydra description literal hydra ApiDocumentation entrypoint IRI supportedClass list hydra Class hydra Class hydra title hydra description hydra supportedProperty list hydra SupportedProperty hydra property IRI hydra required boolean hydra readable boolean hydra writable boolean hydra supportedOperation list hydra Operation hydra Collection hydra member list hydra PartialCollectionView paging first last next previous hydra IriTemplate template literal RFC6570 hydra variableRepresentation Basic or Explicit hydra mapping hydra IriTemplateMapping variable literal property IRI required boolean hydra resolveRelativeTo IRI hydra Status statusCode integer hydra title hydra description hydra Error subclass application/problem+json responses with hydra error context header

## Sanitised Extract
Table of Contents

1 Namespace Declaration
2 Link Class
3 Operation Class
4 ApiDocumentation Class
5 Class Description
6 SupportedProperty Class
7 Collection and PartialCollectionView
8 IriTemplate Class
9 IriTemplateMapping Class
10 Status and Error

1 Namespace Declaration
Prefix hydra maps to IRI http://www.w3.org/ns/hydra/core
Suggested use of prefix hydra in JSON LD contexts

2 Link Class
hydra Link is subclass of rdf Property
Use hydra property to define dereferenceable links
Properties
 hydra property IRI of linked property
 hydra templated boolean indicating templated link use

3 Operation Class
hydra Operation extends hydra Link
Required property hydra method one of HTTP methods GET POST PUT DELETE PATCH HEAD OPTIONS
Optional properties
 hydra expects IRI of expected resource class
 hydra returns IRI of returned resource class
 hydra possibleStatus list of hydra Status instances with hydra statusCode integer
 hydra expectsHeader list of header names required in request
 hydra returnsHeader list of header names returned in response
 hydra title human readable title literal
 hydra description human readable description literal

4 ApiDocumentation Class
Define top level API documentation resource
Required property hydra entrypoint IRI of entry point resource
Optional properties
 hydra title literal
 hydra description literal
 hydra supportedClass list of hydra Class instances describing resource classes

5 Class Description
hydra Class describes resource type
Properties
 hydra title literal
 hydra description literal
 hydra supportedProperty list of hydra SupportedProperty entries
 hydra supportedOperation list of hydra Operation entries

6 SupportedProperty Class
Describes property usage on a class
Properties
 hydra property IRI of property
 hydra required boolean default false
 hydra readable boolean default true
 hydra writable boolean default true

7 Collection and PartialCollectionView
hydra Collection holds hydra member list of resources
hydra PartialCollectionView subclasses hydra Collection
 Optional paging properties hydra first hydra last hydra next hydra previous all IRIs
 hydra member same as Collection

8 IriTemplate Class
Describe runtime URL templates
Properties
 hydra template literal using RFC6570 syntax
 hydra variableRepresentation Literal default BasicRepresentation explicit or basic
 hydra mapping list of hydra IriTemplateMapping entries
 hydra resolveRelativeTo IRI to base expansion context

9 IriTemplateMapping Class
Maps template variable to property
Properties
 hydra variable literal name in template
 hydra property IRI of linked property for value extraction
 hydra required boolean default false

10 Status and Error
hydra Status encapsulates HTTP status details
Properties
 hydra statusCode integer HTTP status code
 hydra title literal short description
 hydra description literal detailed description
hydra Error subclass of hydra Status for error semantics

## Original Source
Hydra Core Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary

## Namespace Declaration
- Prefix: hydra
- IRI: http://www.w3.org/ns/hydra/core#

## Link Class (hydra:Link)
- Subclass of rdf:Property
- Purpose: indicate dereferenceable links
- Properties:
  - hydra:property (IRI)  
  - hydra:templated (xsd:boolean)

## Operation Class (hydra:Operation)
- Subclass of hydra:Link
- Required:
  - hydra:method (Literal, one of GET POST PUT DELETE PATCH HEAD OPTIONS)
- Optional:
  - hydra:expects (IRI of class or graph)
  - hydra:returns (IRI of class or graph)
  - hydra:possibleStatus (hydra:Status or subclass)
  - hydra:expectsHeader (Literal or list of header names)
  - hydra:returnsHeader (Literal or list of header names)
  - hydra:title (Literal)
  - hydra:description (Literal)

## ApiDocumentation Class (hydra:ApiDocumentation)
- Required:
  - hydra:entrypoint (IRI)
- Optional:
  - hydra:title (Literal)
  - hydra:description (Literal)
  - hydra:supportedClass (hydra:Class)

## Class Description (hydra:Class)
- Properties:
  - hydra:title (Literal)
  - hydra:description (Literal)
  - hydra:supportedProperty (hydra:SupportedProperty)
  - hydra:supportedOperation (hydra:Operation)

## SupportedProperty Class (hydra:SupportedProperty)
- Properties:
  - hydra:property (IRI)
  - hydra:required (xsd:boolean default false)
  - hydra:readable (xsd:boolean default true)
  - hydra:writable (xsd:boolean default true)

## Collection Classes
- hydra:Collection
  - Property: hydra:member (IRI or embedded object)
- hydra:PartialCollectionView
  - Optional properties: hydra:first hydra:last hydra:next hydra:previous (all IRI)
  - hydra:member

## IriTemplate Class (hydra:IriTemplate)
- Properties:
  - hydra:template (Literal)
  - hydra:variableRepresentation (Literal, hydra:BasicRepresentation or hydra:ExplicitRepresentation, default BasicRepresentation)
  - hydra:mapping (hydra:IriTemplateMapping)
  - hydra:resolveRelativeTo (IRI)

## IriTemplateMapping Class (hydra:IriTemplateMapping)
- Properties:
  - hydra:variable (Literal)
  - hydra:property (IRI)
  - hydra:required (xsd:boolean default false)

## Status Class (hydra:Status)
- Properties:
  - hydra:statusCode (xsd:integer)
  - hydra:title (Literal)
  - hydra:description (Literal)
- Subclass: hydra:Error
  - Additional semantics: error indicator

## Context Location
- Remote context URL: http://www.w3.org/ns/hydra/context.jsonld


## Attribution
- Source: Hydra Core Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: CC-BY 4.0
- Crawl Date: 2025-05-01T12:57:56.575Z
- Data Size: 603634 bytes
- Links Found: 391

## Retrieved
2025-05-01
library/CONTEXT_DEFINITIONS.md
# library/CONTEXT_DEFINITIONS.md
# CONTEXT_DEFINITIONS

## Crawl Summary
@base: IRI or null for resolving relative IRIs
@vocab: IRI or null for default vocabulary mapping
@language: BCP47 code or null for default string language
@direction: ltr/rtl/null for base text direction
@version: numeric 1.1 to enforce processing mode
@import: IRI to include remote context
Term definitions: map entries with keys @id, @type, @container, @reverse, @language, @direction, @nest, @context
Context merging: sequential override; embedded before remote

## Normalised Extract
Table of Contents:
1. Base IRI (@base)
2. Default Vocabulary (@vocab)
3. Default Language (@language)
4. Base Direction (@direction)
5. Processing Mode (@version)
6. Context Import (@import)
7. Term Definitions
8. Context Merging

1. Base IRI (@base)
   Value: absolute IRI or null
   Behavior: resolve all relative IRIs in terms and values against @base. If null, no base used.

2. Default Vocabulary (@vocab)
   Value: absolute IRI or null
   Behavior: prefix applied to unprefixed terms when expanding

3. Default Language (@language)
   Value: BCP47 tag or null
   Behavior: assign language tag to string values when none provided

4. Base Direction (@direction)
   Value: "ltr", "rtl", null
   Behavior: assign base direction for string values when none provided

5. Processing Mode (@version)
   Value: 1.1
   Behavior: enforce JSON-LD 1.1 features; error in 1.0 processors

6. Context Import (@import)
   Value: absolute IRI
   Behavior: fetch remote context, merge its definitions

7. Term Definitions
   For each term:
     id: IRI or term reference
     type: IRI or term for typed values
     container: one of @list,@set,@index,@language,@id,@type,@graph
     reverse: IRI for reverse properties
     language: BCP47 code or null
     direction: "ltr","rtl",null
     nest: term key for nested properties
     context: IRI, map, or array to define embedded context

8. Context Merging
   Sequence: local embedded contexts first, then remote contexts in order of @import, then parent contexts
   Override: later definitions replace earlier ones for same term

## Supplementary Details
- HTTP GET for @import: Accept: application/ld+json
- Merge algorithm:
  1. Initialize active context
  2. For each context entry in array: if string, fetch; if map, merge
  3. For map merge: for each key, set or override term definition
- Resolution of relative IRIs: use IRI resolution algorithm per RFC3987
- Local vs embedded context: local applies to whole document, embedded applies to surrounding node or property
- JSON-LD parser options:
  processingMode: 'json-ld-1.1'
  documentLoader: custom loader function
  expandContext: initial context to apply before document context
- Node.js example: const options = { base: 'https://example.com/', expandContext: { '@vocab':'https://schema.org/' }, processingMode:'json-ld-1.1' }

## Reference Details
JSON-LD Processing API (jsonld.js):

Module: jsonld

Method: expand(input, options)
Parameters:
  input: object|array|string (document path or parsed JSON-LD)
  options:
    explicitContext: object|array|string
    base: string (base IRI)
    expandContext: object|array|string
    documentLoader: function(url)
    processingMode: 'json-ld-1.0'|'json-ld-1.1'
Returns: Promise resolving to expanded JSON-LD (array of node objects)

Method: compact(input, context, options)
Parameters:
  input: as above
  context: object|array|string
  options: as above plus:
    compactArrays: boolean (default true)
    skipExpansion: boolean (default false)
Returns: Promise resolving to compacted JSON-LD (object)

Method: flatten(input, context, options)
Parameters: same as compact
Returns: Promise resolving to flattened array of node objects

Method: frame(input, frame, options)
Parameters:
  frame: object (frame document)
Returns: Promise resolving to framed result (object)

Method: normalize(input, options)
Parameters:
  algorithm: 'URDNA2015'|'URGNA2012'
  expandContext, documentLoader, processingMode
Returns: Promise resolving to normalized triples (canonical N-Quads string)

Examples:
const jsonld = require('jsonld')
async function run(){
  const input = { '@context':{'name':'http://schema.org/name'}, 'name':'Alice' }
  const compacted = await jsonld.compact(input, {'@vocab':'http://schema.org/'}, { processingMode:'json-ld-1.1' })
  console.log(compacted)
}

Best practices:
- Preload common contexts via documentLoader cache
- Use processingMode 'json-ld-1.1' to access latest features
- Set base IRI to avoid relative IRI ambiguity

Troubleshooting:
Command: node process.js
Expected: no "Context parse error". If error: verify context JSON syntax, ensure correct media type
Fetch remote context failure: check CORS headers, use custom documentLoader to override.


## Information Dense Extract
@base:IRI|null→resolves relative IRIs;@vocab:IRI|null→default vocab;@language:BCP47|null→string lang;@direction:ltr|rtl|null→text dir;@version:1.1→processor mode;@import:IRI→merge remote context;terms→@id,@type,@container,@reverse,@language,@direction,@nest,@context definitions;merge→embedded then remote, later override;API→expand,compact,flatten,frame,normalize methods with options:base,expandContext,documentLoader,processingMode,compactArrays.

## Sanitised Extract
Table of Contents:
1. Base IRI (@base)
2. Default Vocabulary (@vocab)
3. Default Language (@language)
4. Base Direction (@direction)
5. Processing Mode (@version)
6. Context Import (@import)
7. Term Definitions
8. Context Merging

1. Base IRI (@base)
   Value: absolute IRI or null
   Behavior: resolve all relative IRIs in terms and values against @base. If null, no base used.

2. Default Vocabulary (@vocab)
   Value: absolute IRI or null
   Behavior: prefix applied to unprefixed terms when expanding

3. Default Language (@language)
   Value: BCP47 tag or null
   Behavior: assign language tag to string values when none provided

4. Base Direction (@direction)
   Value: 'ltr', 'rtl', null
   Behavior: assign base direction for string values when none provided

5. Processing Mode (@version)
   Value: 1.1
   Behavior: enforce JSON-LD 1.1 features; error in 1.0 processors

6. Context Import (@import)
   Value: absolute IRI
   Behavior: fetch remote context, merge its definitions

7. Term Definitions
   For each term:
     id: IRI or term reference
     type: IRI or term for typed values
     container: one of @list,@set,@index,@language,@id,@type,@graph
     reverse: IRI for reverse properties
     language: BCP47 code or null
     direction: 'ltr','rtl',null
     nest: term key for nested properties
     context: IRI, map, or array to define embedded context

8. Context Merging
   Sequence: local embedded contexts first, then remote contexts in order of @import, then parent contexts
   Override: later definitions replace earlier ones for same term

## Original Source
W3C JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of CONTEXT_DEFINITIONS

# Context Definitions

Retrieved: 10 June 2024

## Overview
The @context in JSON-LD establishes mappings from terms to IRIs, controls base IRI resolution, default vocabulary, language, and processing mode. This section defines all context keywords and their allowed values.

# Context Keywords and Values

## @base
- Value: IRI or null
- Effect: Sets the base IRI for resolving relative IRI references in terms and values.
- Default: Document location

## @vocab
- Value: IRI or null
- Effect: Prefixed to terms without explicit prefix to form full IRI.
- Default: None; terms must be fully expanded.

## @language
- Value: BCP47 language tag string or null
- Effect: Default language for string values without language tags.
- Default: None

## @direction
- Value: "ltr", "rtl", or null
- Effect: Default base direction for strings without explicit direction.
- Default: null

## @version
- Value: Numeric; must be 1.1
- Effect: Sets processing mode to json-ld-1.1 or errors if processed by JSON-LD 1.0.
- Default: Implicit json-ld-1.1

## @import
- Value: IRI (document URL)
- Effect: Imports term definitions from referenced remote context.
- Default: None

## Term Definitions
- Simple: key: term, value: string (expanded IRI)
- Expanded: key: term, value: map with optional keys:
    - @id: IRI or term
    - @type: IRI or term for typed values
    - @container: @list, @set, @index, @language, @id, @type, or @graph
    - @reverse: property IRI
    - @language: BCP47 code or null
    - @direction: "ltr", "rtl", or null
    - @nest: term for nested properties
    - @context: embedded context (IRI, map, or array)

## Context Resolution
- Embedded contexts merged sequentially.
- Remote contexts fetched via HTTP GET, JSON media type.
- Merging: later definitions override earlier definitions for same term.



## Attribution
- Source: W3C JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: License: W3C Document License
- Crawl Date: 2025-05-01T17:46:54.100Z
- Data Size: 16073137 bytes
- Links Found: 113952

## Retrieved
2025-05-01

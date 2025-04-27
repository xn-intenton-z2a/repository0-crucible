# SPARQL_JSON

## Crawl Summary
Top-level JSON object with members head and either results or boolean; head.vars is string array of projected variables; head.link is optional string array of URIs; results.bindings is array of solution objects mapping variable names to RDF term objects; RDF term objects include type (uri|literal|bnode), value string, optional xml:lang or datatype; boolean member is JSON true or false; examples for SELECT and ASK provided; media type application/sparql-results+json, extension .srj, encoding UTF-8.

## Normalised Extract
Table of Contents:
1 JSON Results Object
2 Variable Binding Results
3 Boolean Results
4 Examples
5 Media Type

1 JSON Results Object
- head.vars: array<string>
- head.link?: array<string>
- results.bindings: array<Binding>
- boolean: boolean

2 Variable Binding Results
head.vars: projected variable names in query order
head.link: optional metadata URI list
results.bindings: list of solution objects
Binding object:
  for each variable v bound: v: RDFTerm
RDFTerm:
  type: uri | literal | bnode
  value: string
  if type literal:
    xml:lang?: string
    datatype?: string

3 Boolean Results
head.link?: array<string>
boolean: true | false

4 Examples
SELECT:
{ head: { vars: [book,title] }, results: { bindings: [ {book:{type:uri,value:I}, title:{type:literal,value:S}} ] } }
ASK:
{ head:{}, boolean:true }

5 Media Type
application/sparql-results+json
extension: .srj
macintosh file type: TEXT

## Supplementary Details
Media Type Registration:
Type name: application
Subtype name: sparql-results+json
Required parameters: None
Optional parameters: None
Encoding considerations: same as application/json (RFC4627)
Security considerations: same as application/json; URIs per RFC3986; IRIs per RFC3987
Interoperability: no known issues
Recommended extension: .srj
Macintosh file type: TEXT

## Reference Details
Field definitions:
head (object)
  vars (string[]): projected variables, order corresponds to SELECT clause
  link (string[]) optional: metadata URIs
results (object)
  bindings (Binding[]): solution list
Binding (object)
  key: variable name, value: RDFTerm
RDFTerm (object)
  type: "uri" | "literal" | "bnode"
  value: string
  xml:lang?: string (for literal)
  datatype?: string (for literal)
boolean (boolean): ASK query result

Implementation patterns:
1. Send HTTP GET or POST to SPARQL endpoint with header Accept: application/sparql-results+json
2. Parse response as JSON
3. Validate presence of head and either results or boolean
4. For SELECT: iterate results.bindings, extract term.value by type
5. For ASK: read boolean

Node.js example:
const res=await fetch(endpoint+"?query="+encodeURIComponent(q),{headers:{Accept:"application/sparql-results+json"}});
const json=await res.json();
if(json.results){ json.results.bindings.forEach(sol=>{ varName=sol[var].value }); } else { ok=json.boolean; }

cURL example:
curl -H "Accept: application/sparql-results+json" "http://example.org/sparql?query=..."

Troubleshooting:
- If response not JSON: verify Accept header and SPARQL service supports JSON output
- If missing head.vars: ensure SELECT clause specifies variables explicitly or use SELECT *
- Use jq to inspect: jq ".head.vars, .results.bindings[] | keys" output

Best practices:
- Always specify Accept header
- Use explicit SELECT var list to guarantee head.vars order
- Handle optional link for service metadata
- For large result sets, stream parse to avoid memory blow-up

## Information Dense Extract
head.vars:string[] | head.link?:string[] | results.bindings:Binding[] | boolean:boolean; Binding=Record<string,RDFTerm>; RDFTerm={type:("uri"|"literal"|"bnode"),value:string,xml:lang?:string,datatype?:string}; mediaType=application/sparql-results+json; ext=.srj; encoding=UTF-8

## Sanitised Extract
Table of Contents:
1 JSON Results Object
2 Variable Binding Results
3 Boolean Results
4 Examples
5 Media Type

1 JSON Results Object
- head.vars: array<string>
- head.link?: array<string>
- results.bindings: array<Binding>
- boolean: boolean

2 Variable Binding Results
head.vars: projected variable names in query order
head.link: optional metadata URI list
results.bindings: list of solution objects
Binding object:
  for each variable v bound: v: RDFTerm
RDFTerm:
  type: uri | literal | bnode
  value: string
  if type literal:
    xml:lang?: string
    datatype?: string

3 Boolean Results
head.link?: array<string>
boolean: true | false

4 Examples
SELECT:
{ head: { vars: [book,title] }, results: { bindings: [ {book:{type:uri,value:I}, title:{type:literal,value:S}} ] } }
ASK:
{ head:{}, boolean:true }

5 Media Type
application/sparql-results+json
extension: .srj
macintosh file type: TEXT

## Original Source
SPARQL 1.1 Suite: Query, Protocol, Update, Graph Store HTTP, and JSON Results
https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

## Digest of SPARQL_JSON

# SPARQL 1.1 Query Results JSON Format

**Source**: W3C Recommendation 21 March 2013 (retrieved 10 June 2024)
**Data Size**: 33621567 bytes, **Links Found**: 61076

# 1 Introduction
This document specifies the JSON serialization for SPARQL SELECT and ASK query results.

# 2 JSON Results Object
A SPARQL JSON results document is a top-level JSON object with exactly one of the following member sets:

1. head + results
2. head + boolean

## 2.1 head
- vars: string[]  (projected variable names, in SELECT clause order)
- link: string[] (optional metadata URIs)

## 2.2 results
- bindings: Binding[]

## 2.3 boolean
- boolean: true | false

# 3 Variable Binding Results
SELECT query solutions: array of variable bindings per solution.

## 3.1 head.vars
List of variable names (no leading ? or $), e.g.
vars : [ "book", "title" ]

## 3.2 head.link
Optional array of URIs for metadata, e.g.
link : [ "http://example/dataset/metadata.ttl" ]

## 3.3 results.bindings
Array of solution objects; each solution: { varName: RDFTerm, … }

### 3.3.1 RDFTerm encoding
- type: "uri" | "literal" | "bnode"
- value: string
- xml:lang: string (optional, for literal)
- datatype: string (optional, for literal)

Examples:
{ "type": "uri",     "value": "I" }
{ "type": "literal", "value": "S" }
{ "type": "literal", "value": "S", "xml:lang": "L" }
{ "type": "literal", "value": "S", "datatype": "D" }
{ "type": "bnode",   "value": "B" }

# 4 Boolean Results
ASK query form: head + boolean

head: {} or with link
boolean: true | false

# 5 Examples
SELECT result example:
{
  "head": { "vars": [ "book", "title" ] },
  "results": {
    "bindings": [
      { "book": { "type": "uri", "value": "http://example.org/book/book6" },
        "title":{ "type":"literal","value":"Harry Potter and the Half-Blood Prince" } }
      // … additional rows
    ]
  }
}

ASK result example:
{
  "head": {},
  "boolean": true
}

# 6 Media Type and File Details
- Media Type: application/sparql-results+json
- File extension: .srj
- Macintosh file type code: TEXT
- Encoding: UTF-8

## Attribution
- Source: SPARQL 1.1 Suite: Query, Protocol, Update, Graph Store HTTP, and JSON Results
- URL: https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
- License: License
- Crawl Date: 2025-04-27T09:48:29.897Z
- Data Size: 33621567 bytes
- Links Found: 61076

## Retrieved
2025-04-27

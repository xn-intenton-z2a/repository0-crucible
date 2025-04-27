# SPARQL_RESULTS_JSON

## Crawl Summary
Top-level JSON object includes head and either results or boolean. head.vars: array of projected variable names in SELECT order; head.link: optional URIs. results.bindings: array of solution objects mapping variables to RDF term objects. RDF term objects: type (uri|literal|bnode), value string, optional xml:lang or datatype. ASK queries use head and boolean member. Media Type application/sparql-results+json; file extension .srj; Macintosh type TEXT; encoding and security identical to application/json.

## Normalised Extract
Table of Contents
1 JSON Results Object
2 head.vars
3 head.link
4 results.bindings
5 RDF term encoding
6 Boolean results
7 Example skeleton
8 Media type registration

1 JSON Results Object
The SPARQL Query Results JSON is a single object:
  head: { vars: string[], link?: string[] }
  results?: { bindings: Solution[] }
  boolean?: boolean

2 head.vars
Array of projected variable names in query SELECT clause order. Example: ["book","title"]. Omit variables not bound in a particular solution.

3 head.link
Optional array of metadata URIs. Client may fetch RDF metadata.

4 results.bindings
An array of zero or more solution objects. Each solution: { varName: TermObject, ... }.

5 RDF term encoding
TermObject:
  type: "uri" | "literal" | "bnode"
  value: string
  xml:lang?: string
  datatype?: string
Examples:
  {type:"uri",value:"I"}
  {type:"literal",value:"S",xml:lang:"en"}
  {type:"literal",value:"S",datatype:"http://...#integer"}
  {type:"bnode",value:"b0"}

6 Boolean results
ASK form results use:
  head: {} or head.link
  boolean: true|false

7 Example skeleton
SELECT:
{
  head:{vars:["x","y"],link:["http://..."]},
  results:{bindings:[{x:Term,y:Term},...]}
}
ASK:
{head:{},boolean:true}

8 Media type registration
MIME type: application/sparql-results+json
file extension: .srj
mac type code: TEXT
encoding: UTF-8
security and interoperability: same as application/json

## Supplementary Details
• Content-Type header: application/sparql-results+json; charset=utf-8
• Default file extension: .srj
• Macintosh file type: TEXT
• Encoding: JSON as per RFC4627, UTF-8 only
• Security considerations: escape control characters; validate JSON before parsing; adhere to same CSP rules as application/json
• Interoperability: all JSON parsers supporting RFC4627 can parse results
• Order of head.vars matches SELECT clause unless SELECT *
• Variables with no binding are omitted from solution object
• Blank node labels scoped per document; reuse label within a result binds same blank node


## Reference Details
JSON Results Object schema:
{ head: HeadObject, results?: ResultsObject, boolean?: boolean }

HeadObject:
{ vars: string[], link?: string[] }

ResultsObject:
{ bindings: SolutionObject[] }

SolutionObject:
{ [variableName: string]: TermObject }

TermObject fields:
  type: "uri" | "literal" | "bnode"
  value: string
  xml:lang?: string
  datatype?: string

Media Type registration:
  Type name: application
  Subtype name: sparql-results+json
  Required parameters: none
  Optional parameters: none
  Encoding considerations: identical to application/json (RFC4627), UTF-8
  Security considerations: identical to application/json; follow RFC3986 and RFC3987 for URIs
  Interoperability considerations: none known
  File extensions: .srj
  Macintosh file type code: TEXT
  Author: SPARQL Working Group, Andy Seaborne <public-rdf-dawg-comments@w3.org>

JavaScript parsing example:
const response = await fetch(url, {headers:{"Accept":"application/sparql-results+json"}});
const data = await response.json();
const vars = data.head.vars;
for (const row of data.results.bindings) {
  const binding = {};
  for (const v of vars) {
    if (row[v]) binding[v] = row[v].value;
  }
  console.log(binding);
}

Troubleshooting:
• Invalid JSON error: check Content-Type header and response encoding
• Missing head.vars: ensure SPARQL endpoint supports SPARQL 1.1 JSON
• Unexpected datatype: validate presence of datatype URI in TermObject
• Unbound variable handling: row[v] undefined means unbound; handle accordingly

## Information Dense Extract
{head:{vars:string[],link?:string[]},results?:{bindings: [{[var:string]:{type:"uri"|"literal"|"bnode",value:string,xml:lang?:string,datatype?:string}}]},boolean?:boolean} vars order=SELECT order; omit unbound vars; blank node labels scoped; mediaType=application/sparql-results+json; ext=.srj; mac=TEXT; UTF-8; identical security to application/json; no required params; optional link URIs; JSON per RFC4627; sample JS parser fetch+await; handle missing field errors; use row[v]?.value to extract term value.

## Sanitised Extract
Table of Contents
1 JSON Results Object
2 head.vars
3 head.link
4 results.bindings
5 RDF term encoding
6 Boolean results
7 Example skeleton
8 Media type registration

1 JSON Results Object
The SPARQL Query Results JSON is a single object:
  head: { vars: string[], link?: string[] }
  results?: { bindings: Solution[] }
  boolean?: boolean

2 head.vars
Array of projected variable names in query SELECT clause order. Example: ['book','title']. Omit variables not bound in a particular solution.

3 head.link
Optional array of metadata URIs. Client may fetch RDF metadata.

4 results.bindings
An array of zero or more solution objects. Each solution: { varName: TermObject, ... }.

5 RDF term encoding
TermObject:
  type: 'uri' | 'literal' | 'bnode'
  value: string
  xml:lang?: string
  datatype?: string
Examples:
  {type:'uri',value:'I'}
  {type:'literal',value:'S',xml:lang:'en'}
  {type:'literal',value:'S',datatype:'http://...#integer'}
  {type:'bnode',value:'b0'}

6 Boolean results
ASK form results use:
  head: {} or head.link
  boolean: true|false

7 Example skeleton
SELECT:
{
  head:{vars:['x','y'],link:['http://...']},
  results:{bindings:[{x:Term,y:Term},...]}
}
ASK:
{head:{},boolean:true}

8 Media type registration
MIME type: application/sparql-results+json
file extension: .srj
mac type code: TEXT
encoding: UTF-8
security and interoperability: same as application/json

## Original Source
SPARQL 1.1 Suite: Query, Protocol, Update, Graph Store HTTP, and JSON Results
https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

## Digest of SPARQL_RESULTS_JSON

# SPARQL Results JSON Format (SPARQL 1.1)

Retrieved: 2024-06-15
Data Size: 33329015 bytes

## 2 JSON Results Object
The top-level JSON Results Object is a single object containing:

  • head: object
    • vars: array of variable names (strings)
    • link: optional array of URI strings

  • results: object (for SELECT queries)
    • bindings: array of solution objects

  • boolean: true|false (for ASK queries)

## 3 Variable Binding Results

### 3.1 head

#### 3.1.1 vars
Array of projected variable names, in SELECT order.
Example: ["book","title"]

#### 3.1.2 link
Optional array of URI strings for further metadata.

### 3.2 results

#### 3.2.1 bindings
Array of zero or more solution objects. Each solution object maps variable names to RDF term objects.

#### 3.2.2 Encoding RDF terms
RDF term object members:
  type: "uri" | "literal" | "bnode"
  value: string
  xml:lang: string (if language tag)
  datatype: IRI string (if typed literal)

Examples:
{type:"uri",value:"I"}
{type:"literal",value:"S"}
{type:"literal",value:"S",xml:lang:"L"}
{type:"literal",value:"S",datatype:"D"}
{type:"bnode",value:"B"}

## 4 Boolean Results

For ASK queries:

### 4.1 head
Same structure and optional link as SELECT head.

### 4.2 boolean
True or false.

## 5 Example

SELECT example:
{
  head:{vars:["book","title"]},
  results:{bindings:[{book:{type:"uri",value:"http://..."},title:{type:"literal",value:"..."}},...]}
}

ASK example:
{head:{},boolean:true}

## 6 Internet Media Type, File Extension and Macintosh File Type

Media Type: application/sparql-results+json
File extension: .srj
Macintosh file type: TEXT
Encoding: UTF-8 (same as application/json)
Security: identical to application/json



## Attribution
- Source: SPARQL 1.1 Suite: Query, Protocol, Update, Graph Store HTTP, and JSON Results
- URL: https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/
- License: License
- Crawl Date: 2025-04-27T04:48:58.141Z
- Data Size: 33329015 bytes
- Links Found: 52713

## Retrieved
2025-04-27

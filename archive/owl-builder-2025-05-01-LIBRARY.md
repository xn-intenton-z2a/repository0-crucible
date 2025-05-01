library/DBPEDIA_SPARQL.md
# library/DBPEDIA_SPARQL.md
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
library/SPARQL_ERRATA.md
# library/SPARQL_ERRATA.md
# SPARQL_ERRATA

## Crawl Summary
List of 23 errata for SPARQL 1.1 Query, Protocol, Update, and Graph Store: specific corrections to grammar, keyword semantics, evaluation order, error handling in aggregates, blank node scoping, path translations, and footnote references, with explicit definitions and replacement texts.

## Normalised Extract
Table of Contents
1  errata-query-1  Definition of ALP
2  errata-query-2  GroupGraphPattern lexical order
3  errata-query-3  PropertyListPathNotEmpty object lists
4  clarification-query-1  IN evaluation semantics
5  clarification-query-2  RDFterm-equals extension case
6  editorial-query-1  defn_evalGraph parenthesis
7  editorial-query-2  Join spacing fix
8  errata-query-4  CONCAT zero/one-arg definitions
9  editorial-query-3  DELETE DATA footnote link
10 errata-query-5  Aggregates nesting restriction
11 errata-query-6  Aggregate error handling
12 errata-query-7  LeftJoin clause correction
13 errata-query-7a LeftJoin Diff note
14 errata-query-8  Substitute scoping rules
15 errata-query-9  BIND pattern ordering
16 errata-query-10 VALUES in substitute
17 errata-query-11 Aggregation multiset vs set
18 errata-query-12 Diff false-on-error rule
19 errata-query-13 Filter grammar cleanup
20 errata-query-14 "unaggregated variables" definition
21 errata-query-15 GRAPH blank node behavior
22 errata-query-16 SAMPLE defined preference
23 errata-query-17 Blank node label reuse
24 errata-query-18 Path translation sequence fix
25 errata-query-19 BindingValue to DataBlockValue
26 errata-query-20 DISTINCT+OrderBy ordering
27 errata-query-21 EMPTY GROUP BY aggregation
28 errata-query-22 SUM and aggregate example multisets
29 errata-query-23 MIN/MAX consistency issues

Details
errata-query-1
Definition of ALP: V initialized as empty set, not multiset.

errata-query-2
GroupGraphPattern processing: iterate elements in lexical parse order.

errata-query-3
Grammar rule [83] change both ObjectListPathNotEmpty object lists to ObjectListPath.

clarification-query-1
IN operator: evaluate left-hand expression once and reuse result.

clarification-query-2
Section 17.3.1 reference fix: extension case defined below in 17.4.1.7 RDFterm-equals.

editorial-query-1
Add missing right parenthesis to R := Union(R, Join(eval(D(D[i]), P), Ω(?var->i))).

editorial-query-2
Correct Join definition spacing: Join(Ω1, Ω2) = { merge(μ1, μ2) | μ1 in Ω1 and μ2 in Ω2 ... }.

errata-query-4
Define CONCAT variants: zero args returns "", one arg returns operand, two or more uses fn:concat.

editorial-query-3
DELETE DATA footnote must refer to DELETE DATA rule (footnote 39), not DELETE WHERE.

errata-query-5
Disallow nesting aggregate functions inside other aggregates; enforce at parse time.

errata-query-6
MAX and other aggregates with errors: specify fallback to same result handling for different functions.

errata-query-7
LeftJoin expansion third clause: universal quantification when expr false.

errata-query-7a
Second and third clauses form Diff; leave Filter(expr, Join) ∪ Diff unaffected.

errata-query-8
Substitute operation: exclude variables not visible at outermost graph pattern.

errata-query-9
BIND example ordering: use Extend and Join forms as specified.

errata-query-10
Substitute must handle VALUES-bound variables and inner scope variables correctly.

errata-query-11
Aggregation definition replace multiset with set and wrap P in Group(exprlist,P).

errata-query-12
Diff treats error-evaluating expressions as false.

errata-query-13
Filter definition omit extraneous D(G) parameter.

errata-query-14
Define term "unaggregated variables" or reword usage in section 18.2.4.1.

errata-query-15
GRAPH blank node handling: in WHERE treat as variable, in quad block generate unique per-solution labels.

errata-query-16
SAMPLE: SHOULD select defined value over undef if errors in choice multiset.

errata-query-17
Blank node label reuse rule applies across property paths and triple patterns.

errata-query-18
Sequence path translation: X seq(P, Q) Y -> X P ?V . ?V Q Y.

errata-query-19
Section 18.2.2.6: use DataBlockValue instead of BindingValue and link appropriately.

errata-query-20
DISTINCT and projection must preserve ordering from OrderBy even when ordering variables not projected.

errata-query-21
Aggregate with no GROUP BY and no matches: implement empty result set group handling as zero-row group.

errata-query-22
SUM, Avg, GroupConcat, Sample argument examples must use multisets of lists; update examples accordingly.

errata-query-23
Ensure consistency of MIN and MAX definitions between subsections 18.5.1.5 and 18.5.1.6.


## Supplementary Details
Parameter Corrections and Sections Affected
- ALP Initialization  section 17.4.1.1
- GroupGraphPattern Ordering  section 17.3.1
- Grammar Rule [83]  section 17.4.1.9
- IN Operator Evaluation  section 17.3.2
- RDFterm-equals Extension  section 17.4.1.7
- FILTER Parenthesis  section 17.4.3
- Join Definition  section 17.4.2
- CONCAT Variants  SPARQL Functions section 17.6
- DELETE DATA Footnotes section 19.6
- Aggregate Nesting  section 18.8
- Error Handling in Aggregates  section 18.5
- LeftJoin and Diff  section 17.4.4
- Substitute Scoping  section 17.4.5
- BIND Pattern Ordering  section 17.4.6
- VALUES in Substitute  section 17.4.7
- Aggregation Definition  section 18.5.1
- Diff Error Rule  section 17.4.4
- Filter Definition  section 17.4.3
- Unaggregated Variables  section 18.2.4.1
- GRAPH Blank Node Semantics  section 19.6
- SAMPLE Return Preference  section 18.5.1.4
- Blank Node Labels  sections 5.1.1, 19.6
- Path Translation  section 18.2.2.4
- DataBlockValue Reference  section 18.2.2.6
- DISTINCT and OrderBy  section 18.2.1
- Empty GROUP BY Handling  section 18.2.4
- Aggregate Examples  section 18.5.1
- MIN/MAX Consistency  sections 18.5.1.5,18.5.1.6

## Reference Details
Errata Implementation Patterns
- On grammar corrections, update parser patterns in SPARQL grammar file. Use corrected BNF lines verbatim.
- Enforce IN evaluation once by caching left expression result in evaluation engine.
- In graph pattern translation engine, sort elements by lexical order before processing.
- In filter and join operations, update abstract algebra definitions as specified, ensuring correct parenthesis and spacing.
- For CONCAT, implement overloads: zero-arg returns empty string, one-arg identity, multi-arg using underlying fn:concat.
- Update DELETE DATA footnote links in HTML and PDF outputs to footnote 39.
- In aggregate function implementations, disallow nested calls at parse or compile time, throw syntax error if detected.
- Define error propagation in aggregates: implement MAX error rule and uniform fallback for other functions.
- LeftJoin: replace third clause implementation to use universal check for expr false; merge with Diff component.
- Modify substitute operation in query preprocessor to exclude variables not in outermost projection; track scope levels.
- BIND: ensure Extend and Join combinators generate correct algebra tree as per corrected patterns.
- VALUES: include VALUES-bound variables in substitute variable set; treat inner-scoped names as distinct identifiers.
- Aggregation: wrap inner pattern P in Group(exprlist,P) before evaluation; treat multiset as set for binding merge.
- Diff: treat error in expr evaluation as false; use effective boolean value logic.
- GRAPH: in triple pattern builder, if in WHERE generate variable for blank node; in quad builder generate fresh blank node ID per solution.
- SAMPLE: alter sample function to prefer non-error values; implement error checking in multiset selection.
- Blank Node Labels: implement label reuse rule across patterns; adjust blank node label generator.
- Path Translation: correct sequence translation to produce intermediate variable ?V then link endpoint Y.
- Reference replacement: update DataBlockValue links in developer documentation.
- DISTINCT+OrderBy: modify projection pipeline to maintain ordering when ordering fields not in projection.
- Empty GROUP BY: implement logic to create one empty group with empty value bindings for aggregates.
- Examples: update code samples in documentation with corrected multisets of lists for SUM, Avg, GroupConcat, Sample.
- MIN/MAX: align definitions and examples; update function implementations to reflect consistency.

Troubleshooting Commands
1  Validate corrected grammar: antlr4 -Dlanguage=Java SPARQL.g4 and run test suite
2  Check CONCAT overloads: run unit test concatZeroArg, concatOneArg, concatMultiArg
3  Test PRINT of errata fixes: build documentation and verify footnote links in output.pdf
4  Aggregate nesting error: parse "SELECT (SUM(MAX(?v)) AS ?x) WHERE {...}" should fail
5  LeftJoin behavior: run algebra engine test leftjoin-errata-7


## Information Dense Extract
errata-query-1: ALP Init empty set; errata-query-2: lexical order for GroupGraphPattern; errata-query-3: ObjectListPathNotEmpty paths to ObjectListPath; clarification-query-1: IN LHS single eval; clarification-query-2: link extension in RDFterm-equals; editorial-query-1: add parenthesis in defn_evalGraph; editorial-query-2: Join spacing; errata-query-4: CONCAT()="", CONCAT(X)=X, CONCAT(X1,X2,...)=fn:concat; editorial-query-3: DELETE DATA footnote=39; errata-query-5: no nested aggregates; errata-query-6: errors in aggregates fallback; errata-query-7: LeftJoin third clause universal false; errata-query-7a: Diff combination intact; errata-query-8: substitute scope hide nested vars; errata-query-9: BIND Extend/BGP ordering; errata-query-10: include VALUES vars in substitute; errata-query-11: Aggregation multiset→set, wrap P; errata-query-12: Diff error→false; errata-query-13: filter omit D(G); errata-query-14: define unaggregated variables; errata-query-15: GRAPH blank node variable vs unique ID; errata-query-16: SAMPLE prefer defined; errata-query-17: reuse blank node labels; errata-query-18: seq(P,Q) translate to X P ?V . ?V Q Y; errata-query-19: BindingValue→DataBlockValue; errata-query-20: DISTINCT+OrderBy preserve order; errata-query-21: empty GROUP BY produce one empty group; errata-query-22: aggregate examples use list multisets; errata-query-23: align MIN/MAX definitions

## Sanitised Extract
Table of Contents
1  errata-query-1  Definition of ALP
2  errata-query-2  GroupGraphPattern lexical order
3  errata-query-3  PropertyListPathNotEmpty object lists
4  clarification-query-1  IN evaluation semantics
5  clarification-query-2  RDFterm-equals extension case
6  editorial-query-1  defn_evalGraph parenthesis
7  editorial-query-2  Join spacing fix
8  errata-query-4  CONCAT zero/one-arg definitions
9  editorial-query-3  DELETE DATA footnote link
10 errata-query-5  Aggregates nesting restriction
11 errata-query-6  Aggregate error handling
12 errata-query-7  LeftJoin clause correction
13 errata-query-7a LeftJoin Diff note
14 errata-query-8  Substitute scoping rules
15 errata-query-9  BIND pattern ordering
16 errata-query-10 VALUES in substitute
17 errata-query-11 Aggregation multiset vs set
18 errata-query-12 Diff false-on-error rule
19 errata-query-13 Filter grammar cleanup
20 errata-query-14 'unaggregated variables' definition
21 errata-query-15 GRAPH blank node behavior
22 errata-query-16 SAMPLE defined preference
23 errata-query-17 Blank node label reuse
24 errata-query-18 Path translation sequence fix
25 errata-query-19 BindingValue to DataBlockValue
26 errata-query-20 DISTINCT+OrderBy ordering
27 errata-query-21 EMPTY GROUP BY aggregation
28 errata-query-22 SUM and aggregate example multisets
29 errata-query-23 MIN/MAX consistency issues

Details
errata-query-1
Definition of ALP: V initialized as empty set, not multiset.

errata-query-2
GroupGraphPattern processing: iterate elements in lexical parse order.

errata-query-3
Grammar rule [83] change both ObjectListPathNotEmpty object lists to ObjectListPath.

clarification-query-1
IN operator: evaluate left-hand expression once and reuse result.

clarification-query-2
Section 17.3.1 reference fix: extension case defined below in 17.4.1.7 RDFterm-equals.

editorial-query-1
Add missing right parenthesis to R := Union(R, Join(eval(D(D[i]), P), (?var->i))).

editorial-query-2
Correct Join definition spacing: Join(1, 2) = { merge(1, 2) | 1 in 1 and 2 in 2 ... }.

errata-query-4
Define CONCAT variants: zero args returns '', one arg returns operand, two or more uses fn:concat.

editorial-query-3
DELETE DATA footnote must refer to DELETE DATA rule (footnote 39), not DELETE WHERE.

errata-query-5
Disallow nesting aggregate functions inside other aggregates; enforce at parse time.

errata-query-6
MAX and other aggregates with errors: specify fallback to same result handling for different functions.

errata-query-7
LeftJoin expansion third clause: universal quantification when expr false.

errata-query-7a
Second and third clauses form Diff; leave Filter(expr, Join)  Diff unaffected.

errata-query-8
Substitute operation: exclude variables not visible at outermost graph pattern.

errata-query-9
BIND example ordering: use Extend and Join forms as specified.

errata-query-10
Substitute must handle VALUES-bound variables and inner scope variables correctly.

errata-query-11
Aggregation definition replace multiset with set and wrap P in Group(exprlist,P).

errata-query-12
Diff treats error-evaluating expressions as false.

errata-query-13
Filter definition omit extraneous D(G) parameter.

errata-query-14
Define term 'unaggregated variables' or reword usage in section 18.2.4.1.

errata-query-15
GRAPH blank node handling: in WHERE treat as variable, in quad block generate unique per-solution labels.

errata-query-16
SAMPLE: SHOULD select defined value over undef if errors in choice multiset.

errata-query-17
Blank node label reuse rule applies across property paths and triple patterns.

errata-query-18
Sequence path translation: X seq(P, Q) Y -> X P ?V . ?V Q Y.

errata-query-19
Section 18.2.2.6: use DataBlockValue instead of BindingValue and link appropriately.

errata-query-20
DISTINCT and projection must preserve ordering from OrderBy even when ordering variables not projected.

errata-query-21
Aggregate with no GROUP BY and no matches: implement empty result set group handling as zero-row group.

errata-query-22
SUM, Avg, GroupConcat, Sample argument examples must use multisets of lists; update examples accordingly.

errata-query-23
Ensure consistency of MIN and MAX definitions between subsections 18.5.1.5 and 18.5.1.6.

## Original Source
SPARQL 1.1: Query, Protocol, Update, and Graph Store HTTP
https://www.w3.org/TR/sparql11-http-rdf-update/

## Digest of SPARQL_ERRATA

# SPARQL 1.1 HTTP and Update Errata
Retrieved: 2024-06-05

# errata-query-1  Definition of ALP
Original: Let V = empty multiset  
Correction: Let V = empty set

# errata-query-2  GroupGraphPattern lexical order
Original: For each element E in the GroupGraphPattern  
Correction: Elements are processed in lexical (parse) order

# errata-query-3  PropertyListPathNotEmpty object lists
Original: both object lists uses should be ObjectListPath  
Correction: Change both instances to ObjectListPath

# clarification-query-1  IN evaluation semantics
Original: no note on repeated evaluation  
Correction: Left-hand side of IN is evaluated once only

# clarification-query-2  Extension case in RDFterm-equals
Original: ambiguity in "defined above" reference  
Correction: Note extension case in 17.4.1.7 (RDFterm-equals)

# editorial-query-1  Missing parenthesis in defn_evalGraph
Original: R := Union(R, Join( eval(D(D[i]), P) , Ω(?var->i) )  
Correction: Add missing right parenthesis after Ω(?var->i)

# editorial-query-2  Join notation spacing
Original: Join(Ω1, Ω2) = { merge(μ1, μ2) | μ1 in Ω1and μ2 in Ω2 ... }
Correction: Insert space: Ω1 and Ω2

# errata-query-4  CONCAT zero and one-arg handling
Suggested fix: 
  CONCAT() = ""  
  CONCAT(X) = X  
  CONCAT(X1, X2, ...) = fn:concat(X1, X2, ...)

# editorial-query-3  DELETE DATA footnote link
Original: Footnote 40 links DELETE DATA to DELETE WHERE  
Correction: Link to footnote 39

# errata-query-5  Aggregates inside aggregates
Addition: Note that aggregate functions are not allowed inside other aggregate functions

# errata-query-6  Error handling in aggregates
Clarification: Define error behavior for MAX and other aggregates on error in expression

# errata-query-7  LeftJoin explanatory expansion
Original third clause error  
Correction: Use universal quantification: ∀ μ2 compatible and expr false

# errata-query-7a Further LeftJoin note
Note: second and third clauses combine to Diff; definitions unaffected

# errata-query-8  Substitute scoping
Correction: Exclude variables not visible at outermost level in nested patterns

# errata-query-9  BIND example position
Correct pattern: Extend(BGP(?s :p ?v), ?v2, 2*?v)  
Alternate Join pattern: Join(Extend({}, ?v2, 2*?v), BGP(?s :p ?v))

# errata-query-10  VALUES binding in substitute
Correction: substitute must consider variables from VALUES and inner scoped variables

# errata-query-11  Aggregation multiset vs set
Correction: Replace multiset by set in Definition of Aggregation; P replaced by Group(exprlist,P)

# errata-query-12  Diff error evaluation
Clarification: Expressions evaluating with error are considered false

# errata-query-13  Filter grammar simplification
Correction: Remove ", D(G)" from filter definition

# errata-query-14  "unaggregated variables" terminology
Note: Provide precise definition or reword section 18.2.4.1

# errata-query-15  GRAPH and blank nodes
WHERE clause: blank nodes treated as variables  
Quad block: blank nodes generate per-solution unique blank nodes

# errata-query-16  SAMPLE return value
Suggestion: SAMPLE SHOULD return defined value in preference to undef when error present

# errata-query-17  Blank node label reuse
Allow reuse of the same label across property paths and triple patterns

# editorial-query-4 Duplicate equivalence typo
Correction: "equivalence to graph patterns"

# clarification-query-3 "equivalent literals" defined
Clarification: same as literal equality in RDF Concepts; example distinguishes same-value vs same-term

# errata-query-18  Path translation correction
Original: ?V Q P  
Correction: ?V Q Y in seq(P,Q)

# errata-query-19  BindingValue terminology
Correction: Use and link DataBlockValue instead of BindingValue in section 18.2.2.6

# errata-query-20  DISTINCT and OrderBy ordering
Clarify: DISTINCT and project must preserve OrderBy when ordering based on non-projection variables

# errata-query-21  Aggregation with empty GROUP BY
Note: Problem when no GROUP BY and no matches; implementers should treat as zero-row group with empty multiset

# errata-query-22  SUM, Avg, GroupConcat, Sample examples
Correction: Use multiset of lists for Sum arguments; similar fixes for other aggregates

# errata-query-23  MIN vs MAX inconsistency
Note: Align example consistency between subsections 18.5.1.5 and 18.5.1.6

## Attribution
- Source: SPARQL 1.1: Query, Protocol, Update, and Graph Store HTTP
- URL: https://www.w3.org/TR/sparql11-http-rdf-update/
- License: License
- Crawl Date: 2025-04-27T03:08:27.924Z
- Data Size: 30460892 bytes
- Links Found: 49907

## Retrieved
2025-04-27
library/FUSEKI_DISTRIBUTION.md
# library/FUSEKI_DISTRIBUTION.md
# FUSEKI_DISTRIBUTION

## Crawl Summary
Binary archives: apache-jena-fuseki-5.3.0.tar.gz, .zip, SHA512 checksums, PGP signatures. Maven artifacts jena-fuseki-main/ui/war/core/docker coordinates, Java17+, Servlet6.0. Verification commands: gpg key import, sha512sum, gpg --verify.

## Normalised Extract
Table of Contents
1  Binary Distribution Files and Verification
2  Maven Dependencies
3  Java & Servlet Requirements
4  Docker Container Module
5  Embedded Server Module

1  Binary Distribution Files and Verification
   Files:
     - apache-jena-fuseki-5.3.0.tar.gz   SHA512: 9f5e1f53a89...  Signature: apache-jena-fuseki-5.3.0.tar.gz.asc
     - apache-jena-fuseki-5.3.0.zip      SHA512: b4c8127d3ef...  Signature: apache-jena-fuseki-5.3.0.zip.asc
     - jena-fuseki-war-5.3.0.war         SHA512: 6d03f1e7c29...  Signature: jena-fuseki-war-5.3.0.war.asc
   Verification steps:
     1  gpg --keyserver keyserver.ubuntu.com --recv-keys 0x6C17F59FAC38FAB6
     2  sha512sum apache-jena-fuseki-5.3.0.tar.gz
     3  gpg --verify apache-jena-fuseki-5.3.0.tar.gz.asc apache-jena-fuseki-5.3.0.tar.gz

2  Maven Dependencies
   org.apache.jena:jena-fuseki-main:5.3.0
   org.apache.jena:jena-fuseki-ui:5.3.0
   org.apache.jena:jena-fuseki-war:5.3.0 (type: war)
   org.apache.jena:jena-fuseki-docker:5.3.0
   org.apache.jena:jena-fuseki-core:5.3.0

3  Java & Servlet Requirements
   - Java runtime >= 17
   - Jakarta Servlet 6.0 compatible container (e.g., Tomcat 10.x)

4  Docker Container Module
   Dependency: org.apache.jena:jena-fuseki-docker:5.3.0
   Build command: mvn package -Pdocker

5  Embedded Server Module
   API dependency: org.apache.jena:jena-fuseki-core:5.3.0
   Example instantiation:
     FusekiServer server = FusekiServer.create()
       .port(3030)
       .add("/ds", dataset)
       .build();
     server.start();

## Supplementary Details
Binary installation:
1  tar -xzf apache-jena-fuseki-5.3.0.tar.gz -C /opt/
2  export FUSEKI_HOME=/opt/apache-jena-fuseki-5.3.0
3  $FUSEKI_HOME/fuseki-server --port=3030 --config=$FUSEKI_HOME/configuration.ttl

WAR deployment:
1  Copy jena-fuseki-war-5.3.0.war to $TOMCAT_HOME/webapps/fuseki.war
2  Ensure Java17 is set: export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
3  Restart Tomcat

Docker deployment:
1  mvn clean package -Pdocker -f jena-fuseki-docker/pom.xml
2  docker run -d -p 3030:3030 apache/jena-fuseki:5.3.0

Embedded deployment in Java application:
1  Include jena-fuseki-core and jena-fuseki-main dependencies
2  Create Dataset ds = DatasetFactory.createTxnMem();
3  FusekiServer server = FusekiServer.create().port(3030).add("/dataset", ds).build();
4  server.start();

## Reference Details
Maven coordinates:
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-main</artifactId>
  <version>5.3.0</version>
</dependency>

Embedded API:
Class: org.apache.jena.fuseki.main.FusekiServer
Methods:
- static FusekiServer.Builder create()
- Builder port(int port)
- Builder add(String endpointPath, Dataset dataset)
- FusekiServer build()
- void start()
- void stop()

Configuration TTL keys:
:service1 a fuseki:Service; fuseki:name "ds"; fuseki:datastore :tdbDataset;
  fuseki:serviceQuery "query"; fuseki:serviceUpdate "update"; fuseki:serviceReadGraphStore "get";
  fuseki:serviceWriteGraphStore "post".

Best Practices:
- Run Fuseki under a dedicated user account
- Limit thread pool: --jettyThreads=50
- Enable Shiro security in configuration.ttl
detailed troubleshooting:
- Port in use: netstat -tulpn | grep 3030
- Check $FUSEKI_HOME/logs/fuseki.log for stack traces
- Enable DEBUG: --log=DEBUG
- Java Heap tuning: export JVM_ARGS="-Xms2G -Xmx4G"


## Information Dense Extract
Binary: apache-jena-fuseki-5.3.0.{tar.gz,zip}, jena-fuseki-war-5.3.0.war; SHA512 sums; PGP sig verify: gpg --verify + sha512sum. Maven: jena-fuseki-main/ui/war/core/docker:5.3.0. Java>=17; Servlet6.0 (Tomcat10+). Install: tar -xzf; $FUSEKI_HOME/fuseki-server --port=3030 --config=configuration.ttl. WAR: drop in Tomcat/webapps; ensure JAVA_HOME points to Java17. Docker: mvn -Pdocker; docker run -d -p3030:3030 apache/jena-fuseki:5.3.0. Embedded API: FusekiServer.create().port(3030).add("/ds",Dataset).build().start(). Config TTL sample service block. JVM tuning: -Xms2G -Xmx4G; Jetty threads: --jettyThreads=50; enable Shiro for auth; logs in $FUSEKI_HOME/logs; debug with --log=DEBUG; troubleshoot port with netstat; check fuseki.log for errors.

## Sanitised Extract
Table of Contents
1  Binary Distribution Files and Verification
2  Maven Dependencies
3  Java & Servlet Requirements
4  Docker Container Module
5  Embedded Server Module

1  Binary Distribution Files and Verification
   Files:
     - apache-jena-fuseki-5.3.0.tar.gz   SHA512: 9f5e1f53a89...  Signature: apache-jena-fuseki-5.3.0.tar.gz.asc
     - apache-jena-fuseki-5.3.0.zip      SHA512: b4c8127d3ef...  Signature: apache-jena-fuseki-5.3.0.zip.asc
     - jena-fuseki-war-5.3.0.war         SHA512: 6d03f1e7c29...  Signature: jena-fuseki-war-5.3.0.war.asc
   Verification steps:
     1  gpg --keyserver keyserver.ubuntu.com --recv-keys 0x6C17F59FAC38FAB6
     2  sha512sum apache-jena-fuseki-5.3.0.tar.gz
     3  gpg --verify apache-jena-fuseki-5.3.0.tar.gz.asc apache-jena-fuseki-5.3.0.tar.gz

2  Maven Dependencies
   org.apache.jena:jena-fuseki-main:5.3.0
   org.apache.jena:jena-fuseki-ui:5.3.0
   org.apache.jena:jena-fuseki-war:5.3.0 (type: war)
   org.apache.jena:jena-fuseki-docker:5.3.0
   org.apache.jena:jena-fuseki-core:5.3.0

3  Java & Servlet Requirements
   - Java runtime >= 17
   - Jakarta Servlet 6.0 compatible container (e.g., Tomcat 10.x)

4  Docker Container Module
   Dependency: org.apache.jena:jena-fuseki-docker:5.3.0
   Build command: mvn package -Pdocker

5  Embedded Server Module
   API dependency: org.apache.jena:jena-fuseki-core:5.3.0
   Example instantiation:
     FusekiServer server = FusekiServer.create()
       .port(3030)
       .add('/ds', dataset)
       .build();
     server.start();

## Original Source
Apache Jena Fuseki Documentation
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_DISTRIBUTION

# Apache Jena Fuseki Distribution and Deployment (Retrieved: 2024-06-XX)

## Binary Distributions

Filename                         | SHA512                                                                               | Signature (PGP)
---------------------------------|--------------------------------------------------------------------------------------|----------------
apache-jena-fuseki-5.3.0.tar.gz   | 9f5e1f53a89...<rest of SHA512 hash>                                   | apache-jena-fuseki-5.3.0.tar.gz.asc
apache-jena-fuseki-5.3.0.zip      | b4c8127d3ef...<rest of SHA512 hash>                                   | apache-jena-fuseki-5.3.0.zip.asc
jena-fuseki-war-5.3.0.war         | 6d03f1e7c29...<rest of SHA512 hash>                                   | jena-fuseki-war-5.3.0.war.asc

## Maven Artifacts

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-main</artifactId>
   <version>5.3.0</version>
</dependency>

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-ui</artifactId>
   <version>5.3.0</version>
</dependency>

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-war</artifactId>
   <version>5.3.0</version>
   <type>war</type>
</dependency>

## Java and Servlet Requirements

- Java 17 or later
- Jakarta Servlet API 6.0 (requires Servlet container such as Apache Tomcat 10.x)

## Docker Module

Maven coordinates for Docker container build:

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-docker</artifactId>
   <version>5.3.0</version>
</dependency>

## Embedded SPARQL Server Dependency

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-core</artifactId>
   <version>5.3.0</version>
</dependency>

## PGP Verification

1. Import key:  gpg --recv-keys 0x6C17F59FAC38FAB6
2. Verify checksum: sha512sum apache-jena-fuseki-5.3.0.tar.gz
3. Verify signature: gpg --verify apache-jena-fuseki-5.3.0.tar.gz.asc

## Attribution
- Source: Apache Jena Fuseki Documentation
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License
- Crawl Date: 2025-04-27T02:23:25.479Z
- Data Size: 1539607 bytes
- Links Found: 3533

## Retrieved
2025-04-27
library/QUERY_FRAMEWORK.md
# library/QUERY_FRAMEWORK.md
# QUERY_FRAMEWORK

## Crawl Summary
QueryEngine API: newEngine(initContext?) returns QueryEngine. QueryEngine methods: query, queryBindings, queryQuads, queryVoid. Context keys and defaults: sources[], fetch=node-fetch, lenient=false, baseIRI="", httpTimeout=300000, batchSize=100. Supports SELECT, ASK, CONSTRUCT, DESCRIBE.

## Normalised Extract
Table of Contents
1  Instantiating the Query Engine
2  Executing SPARQL Queries
3  Streaming and Handling Results
4  Context Configuration
5  RDF/JS Data Model Integration

1  Instantiating the Query Engine
   Method signature
     newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine
   initContext keys
     sources: (string|RdfSource)[] default []
     fetch: typeof fetch default node-fetch

2  Executing SPARQL Queries
   Method signature
     engine.query(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>
   query types
     SELECT, ASK, CONSTRUCT, DESCRIBE, UPDATE

3  Streaming and Handling Results
   SELECT/CONSTRUCT returns IBindingsStream or IQuadStream
     IBindingsStream: NodeJS.ReadableStream emitting Bindings objects
     IQuadStream: Quad stream implementing RDF/JS Stream<Quad>
   ASK returns Promise<boolean> via queryBoolean
   UPDATE uses queryVoid

4  Context Configuration
   context keys and types
     sources: array of endpoint URLs, file paths, or in-memory sources
     baseIRI: string used for relative IRIs
     lenient: boolean to ignore parse errors
     httpTimeout: number in ms
     batchSize: number of triples per fragment

5  RDF/JS Data Model Integration
   Requires compatible DataFactory implementing RDF/JS spec
     import { DataFactory } from 'rdf-data-factory'
     DataFactory.termToString for debugging


## Supplementary Details
Context parameters
  sources: any URI, file path, or InMemoryQuadSource implementing RDF/JS Source
  fetch: any function matching fetch(url, init) returning Promise<Response>
  lenient: toggles error recovery in SPARQL parser
  baseIRI: default '' resolves relative IRIs
  httpTimeout: default 300000ms stops slow HTTP
  batchSize: default 100 triples per page from fragment sources
Implementation steps
  1  Install dependencies: npm install @comunica/actor-init-sparql rdf-data-factory
  2  Import newEngine and DataFactory
  3  Instantiate engine with custom context
  4  Call engine.query or specialized methods
  5  Handle streams and end events


## Reference Details
API Specifications

newEngine
  Signature
    function newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine
  Parameters
    initContext
      sources: (string|RdfSource)[] default []
      fetch: (input: string, init?: RequestInit) => Promise<Response> default node-fetch
      baseIRI: string default ''
      lenient: boolean default false
      httpTimeout: number default 300000
      batchSize: number default 100
  Returns
    QueryEngine instance

QueryEngine.query
  Signature
    query(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>
  Parameters
    query: SPARQL string or parsed Algebra Operation
    context: overrides initial context keys
  Returns
    IQueryResult: { type: 'bindings'|'quads'|'boolean'|'void', bindings? IBindingsStream, quadStream? IQuadStream, boolean? boolean }

QueryEngine.queryBindings
  Signature
    queryBindings(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IBindingsStream>
  Returns
    NodeJS.ReadableStream emitting Bindings

QueryEngine.queryQuads
  Signature
    queryQuads(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQuadStream>
  Returns
    Stream<Quad>

QueryEngine.queryBoolean
  Signature
    queryBoolean(query: string|Algebra.Operation, context?: IActionContextInit): Promise<boolean>

QueryEngine.queryVoid
  Signature
    queryVoid(query: string|Algebra.Operation, context?: IActionContextInit): Promise<void>

Concrete example with full comments

import { newEngine } from '@comunica/actor-init-sparql'
import { DataFactory } from 'rdf-data-factory'

(async () => {
  const engine = newEngine({
    sources: ['https://dbpedia.org/sparql'],
    fetch: fetch,
    baseIRI: 'http://example.org/',
    lenient: true,
    httpTimeout: 60000,
    batchSize: 200,
  })
  const stream = await engine.queryBindings(
    'SELECT ?s WHERE { ?s a <http://xmlns.com/foaf/0.1/Person> }'
  )
  stream.on('data', binding => {
    console.log(binding.get('?s').value)
  })
  stream.on('end', () => console.log('Completed'))
})()

Best Practices
  - Provide explicit sources array for reproducibility
  - Use queryBindings for large SELECT result sets to control backpressure
  - Set httpTimeout to guard against unresponsive SPARQL endpoints
  - Enable lenient mode only when parsing legacy or malformed data

Troubleshooting
  Enable detailed logging: set environment variable DEBUG=comunica* and run node script
  Expected log prefix: comunica:bus comunica:mediator comunica:actor-init-sparql
  If fetch errors occur, wrap engine.query in try/catch and inspect error.type and error.message



## Information Dense Extract
newEngine(initContext?)→QueryEngine; context keys: sources[], fetch, baseIRI, lenient, httpTimeout(300000), batchSize(100); QueryEngine.query(query,context)→IQueryResult[type:bindings|quads|boolean|void]; QueryEngine.queryBindings→BindingsStream; QueryEngine.queryQuads→QuadStream; QueryEngine.queryBoolean→boolean; QueryEngine.queryVoid→void; IBindingsStream: NodeJS.ReadableStream emitting Bindings; IQuadStream: RDF/JS Stream<Quad>; default fetch=node-fetch; supports SELECT ASK CONSTRUCT DESCRIBE UPDATE; best practices: explicit sources, backpressure control, timeout guard; debug with DEBUG=comunica*

## Sanitised Extract
Table of Contents
1  Instantiating the Query Engine
2  Executing SPARQL Queries
3  Streaming and Handling Results
4  Context Configuration
5  RDF/JS Data Model Integration

1  Instantiating the Query Engine
   Method signature
     newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine
   initContext keys
     sources: (string|RdfSource)[] default []
     fetch: typeof fetch default node-fetch

2  Executing SPARQL Queries
   Method signature
     engine.query(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>
   query types
     SELECT, ASK, CONSTRUCT, DESCRIBE, UPDATE

3  Streaming and Handling Results
   SELECT/CONSTRUCT returns IBindingsStream or IQuadStream
     IBindingsStream: NodeJS.ReadableStream emitting Bindings objects
     IQuadStream: Quad stream implementing RDF/JS Stream<Quad>
   ASK returns Promise<boolean> via queryBoolean
   UPDATE uses queryVoid

4  Context Configuration
   context keys and types
     sources: array of endpoint URLs, file paths, or in-memory sources
     baseIRI: string used for relative IRIs
     lenient: boolean to ignore parse errors
     httpTimeout: number in ms
     batchSize: number of triples per fragment

5  RDF/JS Data Model Integration
   Requires compatible DataFactory implementing RDF/JS spec
     import { DataFactory } from 'rdf-data-factory'
     DataFactory.termToString for debugging

## Original Source
RDF/JS Data Model & Streams with rdf-ext and Comunica SPARQL Framework
https://comunica.dev/docs/query/framework

## Digest of QUERY_FRAMEWORK

# Comunica SPARQL Query Framework

# API Overview

The main entry point is the QueryEngine implementation returned by the actor-init-sparql package. The engine supports SPARQL query types: SELECT, ASK, CONSTRUCT, DESCRIBE, UPDATE.

# Core Method Signatures

```typescript
import { newEngine } from '@comunica/actor-init-sparql';

// Instantiate a new engine
export function newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine;

// Execute a generic SPARQL query
interface QueryEngine {
  query(query: string | Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>;
  queryBindings(query: string | Algebra.Operation, context?: IActionContextInit): Promise<IBindingsStream>;
  queryQuads(query: string | Algebra.Operation, context?: IActionContextInit): Promise<IQuadStream>;
  queryVoid(query: string | Algebra.Operation, context?: IActionContextInit): Promise<void>;
}
```

# Configuration Context Keys

- sources: (string|RdfSource)[] — endpoints, file paths, or in-memory sources (default: []).
- fetch: typeof fetch — HTTP fetch implementation (default: node-fetch).
- lenient: boolean — ignore non-fatal parsing errors (default: false).
- baseIRI: string — base IRI for query parsing (default: '')
- httpTimeout: number — timeout for HTTP requests in ms (default: 300000).
- batchSize: number — number of triples fetched per fragment (default: 100).

# Example Usage

```js
import { newEngine } from '@comunica/actor-init-sparql';

async function run() {
  const engine = newEngine();
  const result = await engine.query(
    'SELECT ?s ?p ?o WHERE { ?s ?p ?o }',
    { sources: ['https://dbpedia.org/sparql'] }
  );
  const stream = await result.bindings();
  stream.on('data', binding => console.log(binding.get('?s').value));
}
run();
```


## Attribution
- Source: RDF/JS Data Model & Streams with rdf-ext and Comunica SPARQL Framework
- URL: https://comunica.dev/docs/query/framework
- License: License
- Crawl Date: 2025-04-27T16:50:38.868Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27
library/VITEST_CONFIG.md
# library/VITEST_CONFIG.md
# VITEST_CONFIG

## Crawl Summary
Vitest unified config with Vite: supports defineConfig and mergeConfig APIs, vitest.config file priority, file extensions .js/.ts variants. Core test options: include, exclude, includeSource, name, environment, globals, reporters, outputFile. Dependency resolution: deps.external, deps.inline, deps.fallbackCJS, deps.cacheDir, deps.optimizer.web options. Server options: sourcemap inline. CLI flags: --config, --watch, --update, --port, --root, --environment, --pool. Pools: threads, forks, vmThreads, vmForks. Workspace support via defineWorkspace.

## Normalised Extract
Table of Contents
1 Config File Resolution
2 defineConfig & mergeConfig
3 CLI Options
4 Core Test Patterns (include, exclude, includeSource)
5 Dependency Options (deps.external, deps.inline, deps.fallbackCJS, deps.cacheDir)
6 Server Options (sourcemap)
7 Pools & Runner
8 Environments & Globals
9 Reporters & Output
10 Workspace Support

1 Config File Resolution
- Order: vitest.config.ts/js > CLI --config > mode/env override
- Reads root vite.config.ts if no separate config
- Extensions: .js .mjs .cjs .ts .cts .mts

2 defineConfig & mergeConfig
- defineConfig(testOptions: TestConfig): Config
- mergeConfig(base: Config, override: Config): Config

3 CLI Options
--config <path>
-w, --watch (default: !CI)
-u, --update
--port <num>
--root <path>, --dir <path>
--environment <env>
--pool <pool>

4 Core Test Patterns
include: string[] default ["**/*.{test,spec}.?(c|m)[jt]s?(x)"]
exclude: string[] default [standard excludes]
includeSource: string[] default []

5 Dependency Options
deps.external: (string|RegExp)[] default [/\/node_modules\//]
deps.inline: (string|RegExp)[]|true default []
deps.fallbackCJS: boolean default false
deps.cacheDir: string default 'node_modules/.vite'

6 Server Options
server.sourcemap: 'inline'|boolean default 'inline'

7 Pools & Runner
pool: 'threads'|'forks'|'vmThreads'|'vmForks' default 'forks'
runner: string default internal

8 Environments & Globals
environment: string default 'node'
globals: boolean default false

9 Reporters & Output
reporters: Reporter|string[] default ['default']
outputFile: string|Record<string,string>

10 Workspace Support
defineWorkspace(patterns: string[]|WorkspaceConfig[]): WorkspaceConfig[]

## Supplementary Details
1 Create vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({ test: { include:['tests/**/*.ts'], exclude:['node_modules'], environment:'jsdom' } })

2 Merge Vite & Vitest
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(viteConfig, defineConfig({ test:{ globals:true } }))

3 Triple-Slash Types
/// <reference types="vitest/config" /> at top of vite.config.ts

4 Workspace
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace(['packages/*', { test:{ name:'node', pool:'threads' } }])

5 CLI Usage
npm run test: "vitest --config vitest.config.ts --environment jsdom --pool threads"

## Reference Details
## defineConfig API
```ts
declare function defineConfig(config: { test: TestConfig }): FullConfig;
interface TestConfig {
  include?: string[];
  exclude?: string[];
  includeSource?: string[];
  name?: string;
  environment?: 'node'|'jsdom'|'happy-dom'|'edge-runtime'|string;
  globals?: boolean;
  reporters?: Arrayable<Reporter>;
  outputFile?: string|Record<string,string>;
  deps?: {
    external?: Array<string|RegExp>;
    inline?: Array<string|RegExp>|true;
    fallbackCJS?: boolean;
    cacheDir?: string;
    optimizer?: {
      web?: { transformAssets?: boolean; transformCss?: boolean; transformGlobPattern?: RegExp|RegExp[]; enabled?: boolean; include?: string[]; exclude?: string[]; force?: boolean };
      ssr?: { enabled?: boolean; include?: string[]; exclude?: string[]; force?: boolean };
    };
    moduleDirectories?: string[];
  };
  server?: { sourcemap?: boolean|'inline'; debug?: { dumpModules?: boolean|string; loadDumppedModules?: boolean }; deps?: { external?: Array<string|RegExp>; inline?: Array<string|RegExp>|true; fallbackCJS?: boolean; cacheDir?: string } };
  pool?: 'threads'|'forks'|'vmThreads'|'vmForks';
  runner?: string;
  root?: string;
  dir?: string;
  watch?: boolean;
  update?: boolean;
}
```

## mergeConfig API
```ts
declare function mergeConfig(base: Config, override: Config): Config;
```

## CLI Options
- vitest: runs in watch mode
- vitest run: runs once
- --config <path>
- --watch, --update, --port <num>, --https
- --globals
- --environment <env>
- --pool <pool>
- --reporter <name>
- --outputFile <path>

## Reporter Interface
```ts
declare type Reporter = {
  onInit: (ctx: Context) => void;
  onFinished: (results: Result[]) => void;
};
```

## Environment Customization
Docblock: /** @vitest-environment jsdom */
CLI override: --environment=happy-dom
Custom env:
```ts
import type { Environment } from 'vitest';
export default <Environment>{ name:'custom', transformMode:'ssr', setup(){ return{ teardown(){} } } };
```

## Best Practices
- Use same file for Vite & Vitest
- Use mergeConfig to extend
- Pin vitest version in package.json
- Use include/exclude to narrow test scope

## Troubleshooting
- Disable auto-install: export VITEST_SKIP_INSTALL_CHECKS=1
- Bun: run bun run test
- Debug server loader: set server.debug.dumpModules=true and inspect cacheDir
- Clear cache: delete node_modules/.vite

## Information Dense Extract
VitestConfig: resolution vitest.config.ts>CLI--config>mode; ext .js/.ts variants; defineConfig({test:TestConfig}): include:string[](['**/*.{test,spec}.?(c|m)[jt]s?(x)']),exclude:string[],includeSource:string[],name:string,environment:string,node/jsdom/happy-dom/edge,globals:boolean,false,reporters:Arrayable<Reporter>,outputFile:string|Record;deps.external:(string|RegExp)[]([/\/node_modules\//]),inline:(string|RegExp)[]|true, fallbackCJS:boolean(false),cacheDir:string('node_modules/.vite'),optimizer.web:{enabled?:boolean(false),transformAssets:boolean(true),transformCss:boolean(true),transformGlobPattern:RegExp[]},server:{sourcemap:'inline',debug:{dumpModules:boolean,loadDumppedModules:boolean}},pool:'forks',runner:string,root:string,dir:string,watch:boolean(!CI),update:boolean; CLI flags: --watch,-w;--update,-u;--config;--port;--root;--dir;--environment;--globals;--pool;--reporter;--outputFile;defineWorkspace(patterns|configs):Workspace[]}

## Sanitised Extract
Table of Contents
1 Config File Resolution
2 defineConfig & mergeConfig
3 CLI Options
4 Core Test Patterns (include, exclude, includeSource)
5 Dependency Options (deps.external, deps.inline, deps.fallbackCJS, deps.cacheDir)
6 Server Options (sourcemap)
7 Pools & Runner
8 Environments & Globals
9 Reporters & Output
10 Workspace Support

1 Config File Resolution
- Order: vitest.config.ts/js > CLI --config > mode/env override
- Reads root vite.config.ts if no separate config
- Extensions: .js .mjs .cjs .ts .cts .mts

2 defineConfig & mergeConfig
- defineConfig(testOptions: TestConfig): Config
- mergeConfig(base: Config, override: Config): Config

3 CLI Options
--config <path>
-w, --watch (default: !CI)
-u, --update
--port <num>
--root <path>, --dir <path>
--environment <env>
--pool <pool>

4 Core Test Patterns
include: string[] default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
exclude: string[] default [standard excludes]
includeSource: string[] default []

5 Dependency Options
deps.external: (string|RegExp)[] default [/'/node_modules'//]
deps.inline: (string|RegExp)[]|true default []
deps.fallbackCJS: boolean default false
deps.cacheDir: string default 'node_modules/.vite'

6 Server Options
server.sourcemap: 'inline'|boolean default 'inline'

7 Pools & Runner
pool: 'threads'|'forks'|'vmThreads'|'vmForks' default 'forks'
runner: string default internal

8 Environments & Globals
environment: string default 'node'
globals: boolean default false

9 Reporters & Output
reporters: Reporter|string[] default ['default']
outputFile: string|Record<string,string>

10 Workspace Support
defineWorkspace(patterns: string[]|WorkspaceConfig[]): WorkspaceConfig[]

## Original Source
JavaScript RDF Ecosystem & Node.js Core Modules
https://vitest.dev/

## Digest of VITEST_CONFIG

# Configuring Vitest

## Configuration File Resolution
- Priority: vitest.config.ts/js > CLI --config <path> > process.env.VITEST or mode property
- If no vitest.config present, reads root vite.config.ts under Vite conventions

## Supported Config File Extensions
.js, .mjs, .cjs, .ts, .cts, .mts (no .json)

## defineConfig API Signature
```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    // options
  }
})
```

## mergeConfig API Signature
```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // overrides
    }
  })
)
```

## Workspace Support
```ts
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  'packages/*',
  'tests/**/vitest.config.{e2e,unit}.ts',
  { test: { name: 'node', environment: 'node', setupFiles: ['./setup.node.ts'] } }
])
```

## CLI Options (partial)
- --config <path>       : Specify config file
- -w, --watch           : Enable watch mode (default: !process.env.CI)
- -u, --update          : Update snapshots (default: false)
- --port <number>       : Specify server port
- --root <path>, --dir  : Define project root and scan directory
- --environment <env>   : Set test environment (node|jsdom|happy-dom|edge-runtime)
- --pool <pool>         : Set pool type (threads|forks|vmThreads|vmForks)

## Core Configuration Options
### include
Type: string[]
Default: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"]
CLI: vitest [patterns]

### exclude
Type: string[]
Default: ["**/node_modules/**","**/dist/**","**/cypress/**","**/.{idea,git,cache,output,temp}/**","**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"]
CLI: --exclude "pattern"

### includeSource
Type: string[]
Default: []
Runs files containing import.meta.vitest

### name
Type: string
Default: undefined
Assign custom project name

### environment
Type: string
Default: "node"

### globals
Type: boolean
Default: false
CLI: --globals
Provides global APIs like test, expect

### reporters
Type: Reporter|string[]
Default: ["default"]
CLI: --reporter <name>

### outputFile
Type: string|Record<string,string>
CLI: --outputFile <path>

### deps.external
Type: (string|RegExp)[]
Default: [/\/node_modules\//]

### deps.inline
Type: (string|RegExp)[]|true
Default: []

### deps.fallbackCJS
Type: boolean
Default: false

### deps.cacheDir
Type: string
Default: 'node_modules/.vite'

### deps.optimizer.web
Type: { transformAssets?: boolean, transformCss?: boolean, transformGlobPattern?: RegExp|RegExp[] }
Defaults: transformAssets:true, transformCss:true, transformGlobPattern:[]

### server.sourcemap
Type: boolean|'inline'
Default: 'inline'

### pool
Type: 'threads'|'forks'|'vmThreads'|'vmForks'
Default: 'forks'

### runner
Type: string
Default: builtin runner

### root, dir
Type: string
Defaults: project root

## Code Examples
- Creating vitest.config.ts
- Merging with vite.config
- Defining workspaces

## Troubleshooting
- Use VITEST_SKIP_INSTALL_CHECKS=1 to disable dependency prompts
- For Bun, run `bun run test` instead of `bun test`

## Attribution
- Source: JavaScript RDF Ecosystem & Node.js Core Modules
- URL: https://vitest.dev/
- License: License
- Crawl Date: 2025-04-28T08:00:28.640Z
- Data Size: 32213878 bytes
- Links Found: 24552

## Retrieved
2025-04-28
library/RDF11_CONCEPTS.md
# library/RDF11_CONCEPTS.md
# RDF11_CONCEPTS

## Crawl Summary
• RDF graph: set of triples (s,p,o) where s ∈ IRI|blankNode, p ∈ IRI, o ∈ IRI|literal|blankNode.
• RDF dataset: one default graph + zero or more named graphs with IRI or blank node names.
• IRIs: absolute, RFC3987, string equality, best practices for normalization.
• Literals: lexicalForm, datatype IRI, optional language tag; mapping rules; ill-typed handling; term equality rules.
• BlankNodes: local scope; optional Skolemization using /.well-known/genid/{UUID}.
• Datatypes: recognized XSD 1.1 types and non-normative rdf:HTML and rdf:XMLLiteral; mapping definitions.
• Isomorphism: graph and dataset bijections preserving blank nodes, IRIs, literals, triple membership, and graph names.

## Normalised Extract
Table of Contents:
1. RDF Term Model
2. IRIs
3. Literals
4. Blank Nodes and Skolemization
5. RDF Graphs
6. RDF Datasets
7. Datatypes
8. Isomorphism

1. RDF Term Model
   Terms = {IRI, literal, blank node}. Each term type distinct. Triples = (subject, predicate, object).
   subject ∈ IRI ∪ blank node; predicate ∈ IRI; object ∈ IRI ∪ literal ∪ blank node.

2. IRIs
   - Syntax: Unicode per RFC3987, absolute, optional fragment.
   - Comparison: simple string compare (case-sensitive). No further normalization.
   - Resolution: relative IRIs resolved via base IRI per RFC3986.
   - Best-practice normalization: lowercase scheme/authority, omit default port, avoid . or .., use NFC, lowercase hex in percent-encoding.

3. Literals
   - Components: lexicalForm, datatypeIRI, [languageTag].
   - If datatypeIRI == rdf:langString: value=(lexicalForm, lowercased languageTag).
   - If datatypeIRI ∈ recognized set: apply lexical-to-value mapping as defined in XMLSchema1.1. Invalid forms yield semantic inconsistency but accepted.
   - Term equality: exact character-wise match across all components.

4. Blank Nodes and Skolemization
   - Blank nodes: local, no global ID; identifiers from syntax not part of abstract syntax.
   - To Skolemize: mint unique IRI e.g. https://example.com/.well-known/genid/{UUID}. Replace each bNode.

5. RDF Graphs
   - Graph = set of triples.
   - Nodes = subjects∪objects. Predicates may also appear as nodes.

6. RDF Datasets
   - Structure: { defaultGraph, namedGraphs }.
   - defaultGraph: unnamed RDF graph.
   - namedGraphs: set of (name ∈ IRI ∪ bNode, graph).

7. Datatypes
   - Recognized datatype IRIs include xsd:string, xsd:boolean, xsd:decimal, xsd:integer, xsd:dateTime, etc.
   - Datatype = (lexical space, value space, mapping).
   - rdf:HTML and rdf:XMLLiteral: mapping via DOM fragment parsing and normalization.

8. Isomorphism
   - Graph isomorphic if bijection M on nodes mapping blank nodes↔blank nodes, preserving triples.
   - Dataset isomorphic extends graph isomorphism to default and named graphs with name mapping.


## Supplementary Details
• Implementation Step: Resolve relative IRIs by baseIRI.resolve(relativeIRI) using RFC3986 rules before creating NamedNode.
• Validate IRI: check absolute syntax via regex ^[A-Za-z][A-Za-z0-9+.-]*:.+ and percent-decode to ensure compliance with RFC3987.
• Create literal: Literal(lexicalForm:String, datatypeIRI:NamedNode, languageTag? : String). Enforce languageTag lowercase.
• Recognized datatype IRIs: maintain registry mapping IRI → parsingFunction. For XML Schema types use xs mapping: xsd:integer→BigInt, xsd:decimal→Decimal, xsd:boolean→Boolean, xsd:dateTime→Date.
• Ill-typed literal handling: catch parsingFunction error, emit warning logger.warn('Ill-typed literal', lexicalForm, datatypeIRI).
• Blank node replacement: for each blank node b, generate skolemIRI = `${authority}/.well-known/genid/${uuidv4()}`, replaceTerm(b, NamedNode(skolemIRI)).
• Graph isomorphism: implement canonicalization by generating deterministic mapping for blank nodes using sorted triple strings, then compare.


## Reference Details
// Example: JavaScript RDFJS Data Model Implementation

import { DataFactory } from 'rdf-data-factory';
const DF = new DataFactory();

// Create IRI term
function createNamedNode(iri:String): NamedNode {
  if (!isAbsoluteIRI(iri)) throw new Error('IRI must be absolute');
  return DF.namedNode(iri);
}

// Create literal with optional language or datatype
function createLiteral(lex:String, langOrDatatype?: String|NamedNode): Literal {
  if (typeof langOrDatatype === 'string') {
    return DF.literal(lex, langOrDatatype.toLowerCase());
  } else if (langOrDatatype) {
    return DF.literal(lex, langOrDatatype);
  } else {
    return DF.literal(lex);
  }
}

// Create blank node
function createBlankNode(id?:String): BlankNode {
  return id ? DF.blankNode(id) : DF.blankNode();
}

// Build triple and graph
function addTriple(graph: RDFGraph, s:Term, p:NamedNode, o:Term) {
  graph.add(DF.quad(s,p,o));
}

// Skolemize blank nodes in graph
function skolemizeGraph(graph:RDFGraph, authority:String) {
  const mapping = new Map();
  graph.forEach(q => {
    [q.subject, q.object].forEach(term => {
      if (term.termType === 'BlankNode') {
        if (!mapping.has(term.value)) {
          const skolemIRI = `${authority}/.well-known/genid/${uuidv4()}`;
          mapping.set(term.value, DF.namedNode(skolemIRI));
        }
      }
    });
  });
  mapping.forEach((skolem, bnodeId) => {
    graph = graph.mapTerms(term => term.termType==='BlankNode' && term.value===bnodeId ? skolem : term);
  });
  return graph;
}

// IRI normalization
function normalizeIRI(iri:String):String {
  const url = new URL(iri);
  url.pathname = normalizePath(url.pathname);
  url.hostname = url.hostname.toLowerCase();
  url.protocol = url.protocol.toLowerCase();
  return url.toString();
}

// Troubleshooting
// Command: node scripts/validate.js dataset.ttl
// Expected Output: 'Valid RDF dataset; default graph contains 42 triples; 3 named graphs.'



## Information Dense Extract
RDF graph = set of triples (s∈IRI|bNode, p∈IRI, o∈IRI|literal|bNode). IRI: absolute RFC3987, string eq. Literals=lexicalForm+datatypeIRI[+langTag], datatype mapping per XSD1.1, invalid forms yield warnings. Blank nodes local; optional Skolemization via /.well-known/genid/{UUID}. Dataset=defaultGraph+{name∈IRI|bNode,graph}. Recognized datatypes: xsd:string,integer,decimal,boolean,dateTime,etc; rdf:HTML parses via DOM5 fragment; rdf:XMLLiteral via DOM4 DocFragment.normalize(). Graph iso: bijection M: bNode↔bNode, IRI→itself, lit→itself, preserves triples. Dataset iso: extends graph iso over default and named graphs.

## Sanitised Extract
Table of Contents:
1. RDF Term Model
2. IRIs
3. Literals
4. Blank Nodes and Skolemization
5. RDF Graphs
6. RDF Datasets
7. Datatypes
8. Isomorphism

1. RDF Term Model
   Terms = {IRI, literal, blank node}. Each term type distinct. Triples = (subject, predicate, object).
   subject  IRI  blank node; predicate  IRI; object  IRI  literal  blank node.

2. IRIs
   - Syntax: Unicode per RFC3987, absolute, optional fragment.
   - Comparison: simple string compare (case-sensitive). No further normalization.
   - Resolution: relative IRIs resolved via base IRI per RFC3986.
   - Best-practice normalization: lowercase scheme/authority, omit default port, avoid . or .., use NFC, lowercase hex in percent-encoding.

3. Literals
   - Components: lexicalForm, datatypeIRI, [languageTag].
   - If datatypeIRI == rdf:langString: value=(lexicalForm, lowercased languageTag).
   - If datatypeIRI  recognized set: apply lexical-to-value mapping as defined in XMLSchema1.1. Invalid forms yield semantic inconsistency but accepted.
   - Term equality: exact character-wise match across all components.

4. Blank Nodes and Skolemization
   - Blank nodes: local, no global ID; identifiers from syntax not part of abstract syntax.
   - To Skolemize: mint unique IRI e.g. https://example.com/.well-known/genid/{UUID}. Replace each bNode.

5. RDF Graphs
   - Graph = set of triples.
   - Nodes = subjectsobjects. Predicates may also appear as nodes.

6. RDF Datasets
   - Structure: { defaultGraph, namedGraphs }.
   - defaultGraph: unnamed RDF graph.
   - namedGraphs: set of (name  IRI  bNode, graph).

7. Datatypes
   - Recognized datatype IRIs include xsd:string, xsd:boolean, xsd:decimal, xsd:integer, xsd:dateTime, etc.
   - Datatype = (lexical space, value space, mapping).
   - rdf:HTML and rdf:XMLLiteral: mapping via DOM fragment parsing and normalization.

8. Isomorphism
   - Graph isomorphic if bijection M on nodes mapping blank nodesblank nodes, preserving triples.
   - Dataset isomorphic extends graph isomorphism to default and named graphs with name mapping.

## Original Source
W3C RDF 1.1 Concepts and Abstract Syntax
https://www.w3.org/TR/rdf11-concepts/

## Digest of RDF11_CONCEPTS

# 1. Graph-based Data Model

An RDF graph G is a set of triples. Each triple is an ordered tuple (subject, predicate, object):
  • subject ∈ IRI ∪ blank node
  • predicate ∈ IRI
  • object ∈ IRI ∪ literal ∪ blank node

IRIs, literals and blank nodes are RDF terms. G is the default graph when in a dataset.

# 2. RDF Datasets

An RDF dataset D comprises:
  • Exactly one default graph G₀ (an RDF graph).
  • Zero or more named graphs {⟨nᵢ, Gᵢ⟩}, where each nᵢ ∈ IRI ∪ blank node and Gᵢ is an RDF graph.

Graph names must be unique within D. Blank nodes may be shared across graphs.

# 3. IRIs

IRIs in RDF abstract syntax:
  • MUST be absolute; MAY contain fragment identifiers.
  • Conform to RFC3987 (Unicode string). Equality: simple string comparison (RFC3987 §5.1). No further normalization.
  • Relative IRIs (in serialization) MUST be resolved against a base IRI (RFC3986).

IRI normalization best practices:
  • Lowercase scheme and host
  • Avoid percent-encoding unreserved chars
  • Omit default port (http://example.com/ vs http://example.com:80/)
  • Avoid /./ or /../ in path
  • Lowercase hex digits in percent-encoding
  • Use NFC for Unicode

# 4. Literals

A literal L consists of:
  • lexical form: Unicode string (should be NFC)
  • datatype IRI: IRI mapping lexical form to value space
  • optional language tag (if datatype IRI is rdf:langString)

Value determination:
  • If langString: value = (lexical form, language tag lowercased)
  • If datatype IRI ∈ recognized set, apply lexical-to-value mapping. If mapping fails: ill-typed literal (semantic inconsistency; graph accepted, warn optional).
  • If datatype IRI not recognized: value undefined.

Literal term equality: exact match on lexical form, datatype IRI, language tag.

# 5. Blank Nodes

Blank nodes are terms with no global identifier. Identifiers in syntax are local. To replace blank nodes:
  • Mint Skolem IRIs: scheme http(s) or other, path /.well-known/genid/{UUID}

This preserves graph semantics if Skolem IRIs unique.

# 6. Datatypes

Recognized datatype IRIs include all XSD built-in types (XMLSchema 1.1 Part 2) and:
  • rdf:HTML (non-normative)
  • rdf:XMLLiteral (non-normative)

Datatype = (lexical space, value space, lexical-to-value mapping).

Recommended XSD types: xsd:string, xsd:integer, xsd:decimal, xsd:dateTime, xsd:boolean, etc.

# 7. Graph Isomorphism

Two RDF graphs G and G' are isomorphic if there exists a bijection M on nodes such that:
  • M maps blank nodes↔blank nodes.
  • M(IRI)=IRI, M(literal)=literal.
  • (s,p,o)∈G iff (M(s),p,M(o))∈G'.

# 8. Dataset Isomorphism

Datasets D₁ and D₂ are isomorphic if there is a bijection M mapping nodes, triples, and graphs of D₁ to D₂ preserving blank node mapping, literal/IRI identity, triple structure, and graph name pairing.

*Retrieved: 2024-06-05*

## Attribution
- Source: W3C RDF 1.1 Concepts and Abstract Syntax
- URL: https://www.w3.org/TR/rdf11-concepts/
- License: License
- Crawl Date: 2025-04-26T21:47:44.959Z
- Data Size: 36858328 bytes
- Links Found: 111601

## Retrieved
2025-04-26
library/SHEX_GRAMMAR.md
# library/SHEX_GRAMMAR.md
# SHEX_GRAMMAR

## Crawl Summary
ShExC EBNF grammar covering declarations (BASE, PREFIX, IMPORT), start shapeExprDecl rule, shape expression operators (OR, AND, NOT), triple expression constructs (oneOf, group, unary, include), cardinality operators (*, +, ?, {m,n}), XML Schema facets (numeric and string), lexical token patterns (IRIREF, PNAME, STRING_LITERAL, LANGTAG, numeric and boolean literals), escape sequences (ECHAR, UCHAR), and annotations/semantic actions. Data size 974998 bytes, 143057 links.

## Normalised Extract
Table of Contents
1 Declarations
2 Start Shape Declaration
3 Shape Expression Operators
4 Triple Expressions
5 Cardinality Operators
6 Facets
7 Lexical Tokens
8 Escape Sequences
9 Annotations & Semantic Actions

1 Declarations
baseDecl = BASE IRIREF
prefixDecl = PREFIX PNAME_NS IRIREF
importDecl = IMPORT IRIREF

2 Start Shape Declaration
shapeExprDecl = shapeExprLabel = inlineShapeExpression

3 Shape Expression Operators
inlineShapeExpression = inlineShapeOr (OR inlineShapeOr)*
inlineShapeOr = inlineShapeAnd (AND inlineShapeAnd)*
inlineShapeAnd = inlineShapeNot (AND inlineShapeNot)*
inlineShapeNot = NOT? inlineShapeAtom
inlineShapeAtom = nonLitNodeConstraint shapeOrRef? | litNodeConstraint | ( inlineShapeExpression ) | . | shapeDefinition | shapeRef

4 Triple Expressions
oneOfTripleExpr = multiElementOneOf singleElementGroup (| singleElementGroup)+
groupTripleExpr = multiElementGroup unaryTripleExpr (; unaryTripleExpr)* (; ($ tripleExprLabel)?)
unaryTripleExpr = (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?
includeExpr = INCLUDE ( tripleExpression ) cardinality? annotation* semanticActions senseFlags?

5 Cardinality Operators
cardinality = * | + | ? | REPEAT_RANGE
REPEAT_RANGE = { INTEGER (, (INTEGER | *)? )? }

6 Facets
numericFacet = MININCLUSIVE | MINEXCLUSIVE | MAXINCLUSIVE | MAXEXCLUSIVE | TOTALDIGITS | FRACTIONDIGITS
stringFacet = LENGTH | MINLENGTH | MAXLENGTH | PATTERN

7 Lexical Tokens
IRIREF = < ([^#0000- < >"{}|^`\\] | UCHAR)* >
PNAME_NS = PN_PREFIX? :
PNAME_LN = PNAME_NS PN_LOCAL
STRING_LITERAL1 = ' ([^'\\\n\r] | ECHAR | UCHAR)* '
STRING_LITERAL2 = " ([^"\\\n\r] | ECHAR | UCHAR)* "
LANGTAG = @ [a-zA-Z]+ (- [a-zA-Z0-9]+)*
numericLiteral = INTEGER | DECIMAL | DOUBLE
booleanLiteral = true | false

8 Escape Sequences
ECHAR = \\ [tbnrf\"'\\]
UCHAR = \\u HEX HEX HEX HEX | \\U HEX{8}

9 Annotations & Semantic Actions
annotation = @ predicate object
semanticActions = % iri (CODE | %) rdfLiteral
senseFlags = EXTERNAL | START

## Supplementary Details
Token regex patterns
IRIREF: ^<((?:[^#0000- <>"{}|^`\\]|\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8})*)>$
PNAME_NS: ^(?:[A-Za-z]|[\u00B7-\u36F]|[\u203F-\u2040])*:$
PNAME_LN: ^PNAME_NSPN_LOCAL$
STRING_LITERAL1: ^'([^'\\\n\r]|\\[tbnrf"'\\]|\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8})*'$
LANGTAG: ^@[a-zA-Z]+(-[a-zA-Z0-9]+)*$
numericLiteral: ^[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$
booleanLiteral: ^(?:true|false)$
UCHAR and ECHAR definitions as per grammar
Cardinality semantics: * → [0,∞], + → [1,∞], ? → [0,1], {m,n} → [m,n]
Parser steps
1. Lex input with regex patterns above
2. Parse declarations
3. Build shape AST via recursive grammar rules
4. Validate facets against XML Schema value ranges
5. Attach annotations and semantic actions to AST nodes

## Reference Details


## Information Dense Extract
ShExC grammar EBNF: baseDecl: BASE IRIREF; prefixDecl: PREFIX PNAME_NS IRIREF; importDecl: IMPORT IRIREF; shapeExprDecl: shapeExprLabel = inlineShapeExpression; inlineShapeExpression: inlineShapeOr (OR inlineShapeOr)*; inlineShapeOr: inlineShapeAnd (AND inlineShapeAnd)*; inlineShapeAnd: inlineShapeNot (AND inlineShapeNot)*; inlineShapeNot: NOT? inlineShapeAtom; inlineShapeAtom: nonLitNodeConstraint shapeOrRef? | litNodeConstraint | (inlineShapeExpression) | . | shapeDefinition | shapeRef; oneOfTripleExpr: multiElementOneOf singleElementGroup (| singleElementGroup)+; groupTripleExpr: multiElementGroup unaryTripleExpr (; unaryTripleExpr)* (; ($ tripleExprLabel)?); unaryTripleExpr: (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?; includeExpr: INCLUDE (tripleExpression) cardinality? annotation* semanticActions senseFlags?; cardinality: *|+|?|REPEAT_RANGE; REPEAT_RANGE: {INTEGER(,(INTEGER|*)?)?}; numericFacet: MININCLUSIVE|MINEXCLUSIVE|MAXINCLUSIVE|MAXEXCLUSIVE|TOTALDIGITS|FRACTIONDIGITS; stringFacet: LENGTH|MINLENGTH|MAXLENGTH|PATTERN; IRIREF: <([^#0000- <>")|UCHAR)*>; PNAME_NS: PN_PREFIX?:; PNAME_LN: PNAME_NS PN_LOCAL; STRING_LITERAL: '([^'\\\n\r]|ECHAR|UCHAR)*'|"([^"\\\n\r]|ECHAR|UCHAR)*"; LANGTAG: @[a-zA-Z]+(-[a-zA-Z0-9]+)*; numericLiteral: INTEGER|DECIMAL|DOUBLE; booleanLiteral: true|false; ECHAR: \\ [tbnrf"'\\]; UCHAR: \\uHEX4|\\UHEX8; annotation: @predicateobject; semanticActions: %iri(CODE|%)rdfLiteral; senseFlags: EXTERNAL|START; cardinality semantics: *=0..∞,+=1..∞,?=0..1,{m,n}=m..n.

## Sanitised Extract
Table of Contents
1 Declarations
2 Start Shape Declaration
3 Shape Expression Operators
4 Triple Expressions
5 Cardinality Operators
6 Facets
7 Lexical Tokens
8 Escape Sequences
9 Annotations & Semantic Actions

1 Declarations
baseDecl = BASE IRIREF
prefixDecl = PREFIX PNAME_NS IRIREF
importDecl = IMPORT IRIREF

2 Start Shape Declaration
shapeExprDecl = shapeExprLabel = inlineShapeExpression

3 Shape Expression Operators
inlineShapeExpression = inlineShapeOr (OR inlineShapeOr)*
inlineShapeOr = inlineShapeAnd (AND inlineShapeAnd)*
inlineShapeAnd = inlineShapeNot (AND inlineShapeNot)*
inlineShapeNot = NOT? inlineShapeAtom
inlineShapeAtom = nonLitNodeConstraint shapeOrRef? | litNodeConstraint | ( inlineShapeExpression ) | . | shapeDefinition | shapeRef

4 Triple Expressions
oneOfTripleExpr = multiElementOneOf singleElementGroup (| singleElementGroup)+
groupTripleExpr = multiElementGroup unaryTripleExpr (; unaryTripleExpr)* (; ($ tripleExprLabel)?)
unaryTripleExpr = (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?
includeExpr = INCLUDE ( tripleExpression ) cardinality? annotation* semanticActions senseFlags?

5 Cardinality Operators
cardinality = * | + | ? | REPEAT_RANGE
REPEAT_RANGE = { INTEGER (, (INTEGER | *)? )? }

6 Facets
numericFacet = MININCLUSIVE | MINEXCLUSIVE | MAXINCLUSIVE | MAXEXCLUSIVE | TOTALDIGITS | FRACTIONDIGITS
stringFacet = LENGTH | MINLENGTH | MAXLENGTH | PATTERN

7 Lexical Tokens
IRIREF = < ([^#0000- < >'{}|^'''] | UCHAR)* >
PNAME_NS = PN_PREFIX? :
PNAME_LN = PNAME_NS PN_LOCAL
STRING_LITERAL1 = ' ([^''''n'r] | ECHAR | UCHAR)* '
STRING_LITERAL2 = ' ([^''''n'r] | ECHAR | UCHAR)* '
LANGTAG = @ [a-zA-Z]+ (- [a-zA-Z0-9]+)*
numericLiteral = INTEGER | DECIMAL | DOUBLE
booleanLiteral = true | false

8 Escape Sequences
ECHAR = '' [tbnrf''''']
UCHAR = ''u HEX HEX HEX HEX | ''U HEX{8}

9 Annotations & Semantic Actions
annotation = @ predicate object
semanticActions = % iri (CODE | %) rdfLiteral
senseFlags = EXTERNAL | START

## Original Source
Shape Expressions (ShEx) — RDF Graph Structure Validation
https://shex.io/shex-semantics/

## Digest of SHEX_GRAMMAR

# ShExC Grammar EBNF

## Declarations

baseDecl = BASE IRIREF
prefixDecl = PREFIX PNAME_NS IRIREF
importDecl = IMPORT IRIREF

## Start Shape Declaration

shapeExprDecl = shapeExprLabel "=" inlineShapeExpression

## Shape Expression Operators

inlineShapeExpression = inlineShapeOr (OR inlineShapeOr)*
inlineShapeOr = inlineShapeAnd (AND inlineShapeAnd)*
inlineShapeAnd = inlineShapeNot (AND inlineShapeNot)*
inlineShapeNot = NOT? inlineShapeAtom
inlineShapeAtom = nonLitNodeConstraint shapeOrRef? | litNodeConstraint | "(" inlineShapeExpression ")" | "." | shapeDefinition | shapeRef

## Triple Expressions

oneOfTripleExpr = multiElementOneOf singleElementGroup ("|" singleElementGroup)+
groupTripleExpr = multiElementGroup unaryTripleExpr (';' unaryTripleExpr)* (';' ('$' tripleExprLabel)?)
unaryTripleExpr = (tripleConstraint | bracketedTripleExpr) cardinality? annotation* semanticActions senseFlags?
includeExpr = INCLUDE "(" tripleExpression ")" cardinality? annotation* semanticActions senseFlags?

## Cardinality

cardinality = "*" | "+" | "?" | REPEAT_RANGE
REPEAT_RANGE = "{" INTEGER ("," (INTEGER | "*")? )? "}"

## Facets

numericFacet = MININCLUSIVE | MINEXCLUSIVE | MAXINCLUSIVE | MAXEXCLUSIVE | TOTALDIGITS | FRACTIONDIGITS
stringFacet = LENGTH | MINLENGTH | MAXLENGTH | PATTERN
xsFacet = numericFacet | stringFacet

## Lexical Tokens

IRIREF = "<" ([^#0000- <>\"{}|^`\\] | UCHAR)* ">"
PNAME_NS = PN_PREFIX? ":"
PNAME_LN = PNAME_NS PN_LOCAL
STRING_LITERAL1 = "'" ([^'\\\n\r] | ECHAR | UCHAR)* "'"
STRING_LITERAL2 = '"' ([^"\\\n\r] | ECHAR | UCHAR)* '"'
LANGTAG = "@" [a-zA-Z]+ ("-" [a-zA-Z0-9]+)*
numericLiteral = INTEGER | DECIMAL | DOUBLE
booleanLiteral = TRUE | FALSE

## Escape Sequences

ECHAR = "\\" [tbnrf\"'\\]
UCHAR = "\\u" HEX HEX HEX HEX | "\\U" HEX HEX HEX HEX HEX HEX HEX HEX

## Annotations and Semantic Actions

annotation = "@" predicate object
semanticActions = "%" iri (CODE | "%") rdfLiteral
senseFlags = EXTERNAL | START

## Retrieval Metadata

Retrieved from https://shex.io/shex-semantics/ on 2024-06-20
Data Size: 974998 bytes, Links Found: 143057

## Attribution
- Source: Shape Expressions (ShEx) — RDF Graph Structure Validation
- URL: https://shex.io/shex-semantics/
- License: License if known
- Crawl Date: 2025-04-29T17:50:07.468Z
- Data Size: 974998 bytes
- Links Found: 143057

## Retrieved
2025-04-29
library/SHACL_CONSTRAINTS.md
# library/SHACL_CONSTRAINTS.md
# SHACL_CONSTRAINTS

## Crawl Summary
Value Type Constraints: sh:class, sh:datatype, sh:nodeKind with ranges and semantics; Cardinality: sh:minCount (default 0), sh:maxCount (unbounded); Value Range: sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive over numeric/date literals; String-based: sh:minLength, sh:maxLength, sh:pattern (regex), sh:languageIn (list), sh:uniqueLang (boolean); Property Pair: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals comparing two paths; Logical: sh:not (single shape), sh:and/or/xone (list of shapes); Shape-based: sh:node (nested node shape), sh:property (nested property shape), qualified shapes with counts; Other: sh:closed (boolean, enforces closed shapes), sh:ignoredProperties (list), sh:hasValue, sh:in (list)

## Normalised Extract
Table of Contents:
1. Value Type Constraint Components
2. Cardinality Constraint Components
3. Value Range Constraint Components
4. String-based Constraint Components
5. Property Pair Constraint Components
6. Logical Constraint Components
7. Shape-based Constraint Components
8. Other Constraint Components

1. Value Type Constraint Components
  - sh:class: IRI of RDF Class. Applies on each value node. FocusNode conforms if for each value v, triple (v rdf:type Class) exists or inferred via rdfs:subClassOf.
  - sh:datatype: IRI of XSD datatype. Each value must be literal with this datatype.
  - sh:nodeKind: IRI. Allowed values: sh:IRI, sh:Literal, sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral. Each value node tested against chosen kind.

2. Cardinality Constraint Components
  - sh:minCount: integer >=0. Count of values for path must be >= minCount.
  - sh:maxCount: integer >=0. Count of values for path must be <= maxCount.

3. Value Range Constraint Components
  - sh:minExclusive: literal comparable. All values > minExclusive.
  - sh:minInclusive: literal comparable. All values >= minInclusive.
  - sh:maxExclusive: literal comparable. All values < maxExclusive.
  - sh:maxInclusive: literal comparable. All values <= maxInclusive.

4. String-based Constraint Components
  - sh:minLength: integer >=0. String length >= minLength.
  - sh:maxLength: integer >=0. String length <= maxLength.
  - sh:pattern: string regex. Literal lexical form matches pattern (full match).
  - sh:languageIn: list of language tags. Literal language tag in list.
  - sh:uniqueLang: boolean. If true, no duplicate language tags across values.

5. Property Pair Constraint Components
  - sh:equals: path. Value set of path1 equals set of values of path2.
  - sh:disjoint: path. Intersection of values empty.
  - sh:lessThan: path. Max(value1) < Min(value2).
  - sh:lessThanOrEquals: path. Max(value1) <= Min(value2).

6. Logical Constraint Components
  - sh:not: single Shape. FocusNode must not conform to shape.
  - sh:and: list of Shapes. FocusNode must conform to all shapes.
  - sh:or: list of Shapes. FocusNode must conform to at least one.
  - sh:xone: list of Shapes. Exactly one shape must conform.

7. Shape-based Constraint Components
  - sh:node: NodeShape. Each value node validated against NodeShape.
  - sh:property: PropertyShape. Each value node validated against nested PropertyShape.
  - sh:qualifiedValueShape: Shape + integer qMin+qMax. Count of values conforming to shape controlled by qMin,qMax.

8. Other Constraint Components
  - sh:closed: boolean. If true, every property of focus node must be declared by shapes or ignoredProperties.
  - sh:ignoredProperties: list of predicates. Excluded from closed constraint.
  - sh:hasValue: resource or literal. Path must include this exact value.
  - sh:in: list of resources/literals. Path values subset of list.


## Supplementary Details
Implementation Steps to Apply Constraint Components:
1. Include SHACL namespace prefix: PREFIX sh: <http://www.w3.org/ns/shacl#>
2. Define a shapes graph as RDF dataset in Turtle or JSON-LD.
3. For each focus class or node, create a sh:NodeShape with sh:targetClass or sh:targetNode.
4. Within NodeShape, add one or more sh:property triples pointing to a blank node of type sh:PropertyShape.
5. On each PropertyShape, add one or more constraint parameter triples: sh:datatype , sh:minCount , etc.
6. Optionally set common parameters on NodeShape: sh:severity (sh:Violation, sh:Warning, sh:Info), sh:message (xsd:string).
7. Execute SHACL validation engine (e.g., TopBraid SHACL API or JavaScript SHACL library) pointing to data graph and shapes graph.
8. Inspect validation report: triples of type sh:ValidationReport and sh:ValidationResult.

Configuration Options:
- sh:severity: Allowed values: sh:Violation, sh:Warning, sh:Info. Default: sh:Violation.
- sh:deactivated: boolean. When true, shape ignored during validation. Default: false.

Best Practices:
- Group related constraints in one PropertyShape to reduce traversal.
- Use sh:closed with sh:ignoredProperties to enforce schema completeness.
- Set sh:message with placeholders: Literal with '''{{path}}''' to include path IRI in error.

Detailed Troubleshooting:
Command to detect ill-formed shapes: Run SPARQL query against shapes graph:

SELECT ?shape ?p ?o WHERE {
  { ?shape a sh:PropertyShape ; sh:minCount ?m . FILTER(?m < 0) }
  UNION
  { ?shape a sh:PropertyShape ; sh:maxCount ?M . FILTER(?M < 0) }
}
Expected Output: No rows. Rows indicate invalid negative cardinality.


## Reference Details
Example Turtle Shape Definition:

@prefix ex: <http://example.com/ns#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:PersonShape
  a sh:NodeShape ;
  sh:targetClass ex:Person ;
  sh:severity sh:Violation ;
  sh:message "Property violation on path {path}: {value}" ;
  sh:closed true ;
  sh:ignoredProperties ( rdf:type ) ;
  sh:property [
    sh:path ex:ssn ;
    sh:datatype xsd:string ;
    sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$" ;
    sh:maxCount 1 ;
  ] , [
    sh:path ex:worksFor ;
    sh:node ex:CompanyShape ;
    sh:minCount 1 ;
  ] .

ex:CompanyShape
  a sh:NodeShape ;
  sh:property [
    sh:path rdf:type ;
    sh:equals ex:Company ;
    sh:minCount 1 ;
  ] .

Validation Invocation (JavaScript using "@zazuko/shacl-js"):

import { SHACLValidator } from '@zazuko/shacl-js';
import rdf from 'rdf-ext';

const dataGraph = rdf.dataset().import(rdf.parsers['text/turtle'].parse(dataTurtle));
const shapesGraph = rdf.dataset().import(rdf.parsers['text/turtle'].parse(shapesTurtle));

const validator = new SHACLValidator(shapesGraph, { factory: rdf });
const report = await validator.validate(dataGraph);
if (!report.conforms) {
  report.results.forEach(result => {
    console.error(`Severity: ${result.severity.value}`);
    console.error(`FocusNode: ${result.focusNode.value}`);
    console.error(`Path: ${result.path.value}`);
    console.error(`Message: ${result.message.value}`);
  });
}

Return Types:
- ValidationReport: { conforms: boolean, results: ValidationResult[] }
- ValidationResult: { focusNode: NamedNode, path: NamedNode, value: Term, sourceShape: NamedNode, message: Literal, severity: NamedNode }

Step-by-step Pattern:
1. Load graphs.
2. Initialize validator with shapesGraph.
3. Call validate(dataGraph).
4. Check report.conforms.
5. Iterate report.results for details.

Common Configuration Options for '@zazuko/shacl-js':
- factory: RDFJS DataFactory instance.
- maxErrors: integer to stop after N errors. Default: Infinity.
- debug: boolean to log internal SPARQL queries. Default: false.

Best Practice Code Patterns:
- Reuse SHACLValidator instance for multiple data graphs when shapesGraph unchanged.
- Pre-compile SPARQL queries by setting debug=true and caching query objects.

Troubleshooting Commands:
- Use Docker SHACL CLI:
  docker run --rm -v $(pwd):/data eclipse/shacl-cli validate -sh /data/shapes.ttl -data /data/data.ttl
Expected: report.ttl generated with sh:conforms value.


## Information Dense Extract
sh:class IRI, sh:datatype IRI, sh:nodeKind {IRI,Literal,BlankNode,BlankNodeOrIRI,BlankNodeOrLiteral,IRIOrLiteral}; sh:minCount integer>=0 default 0, sh:maxCount integer>=0 unbounded; sh:minExclusive,minInclusive,maxExclusive,maxInclusive literals numeric/date; sh:minLength,maxLength integer>=0; sh:pattern regex; sh:languageIn list(langTags); sh:uniqueLang boolean; sh:equals,disjoint,lessThan,lessThanOrEquals path comparisons; sh:not shape, sh:and|or|xone list(shapes); sh:node NodeShape nested, sh:property PropertyShape nested, sh:qualifiedValueShape Shape+int qualifiers; sh:closed boolean, sh:ignoredProperties list(predicates), sh:hasValue resource, sh:in list(values).

## Sanitised Extract
Table of Contents:
1. Value Type Constraint Components
2. Cardinality Constraint Components
3. Value Range Constraint Components
4. String-based Constraint Components
5. Property Pair Constraint Components
6. Logical Constraint Components
7. Shape-based Constraint Components
8. Other Constraint Components

1. Value Type Constraint Components
  - sh:class: IRI of RDF Class. Applies on each value node. FocusNode conforms if for each value v, triple (v rdf:type Class) exists or inferred via rdfs:subClassOf.
  - sh:datatype: IRI of XSD datatype. Each value must be literal with this datatype.
  - sh:nodeKind: IRI. Allowed values: sh:IRI, sh:Literal, sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral. Each value node tested against chosen kind.

2. Cardinality Constraint Components
  - sh:minCount: integer >=0. Count of values for path must be >= minCount.
  - sh:maxCount: integer >=0. Count of values for path must be <= maxCount.

3. Value Range Constraint Components
  - sh:minExclusive: literal comparable. All values > minExclusive.
  - sh:minInclusive: literal comparable. All values >= minInclusive.
  - sh:maxExclusive: literal comparable. All values < maxExclusive.
  - sh:maxInclusive: literal comparable. All values <= maxInclusive.

4. String-based Constraint Components
  - sh:minLength: integer >=0. String length >= minLength.
  - sh:maxLength: integer >=0. String length <= maxLength.
  - sh:pattern: string regex. Literal lexical form matches pattern (full match).
  - sh:languageIn: list of language tags. Literal language tag in list.
  - sh:uniqueLang: boolean. If true, no duplicate language tags across values.

5. Property Pair Constraint Components
  - sh:equals: path. Value set of path1 equals set of values of path2.
  - sh:disjoint: path. Intersection of values empty.
  - sh:lessThan: path. Max(value1) < Min(value2).
  - sh:lessThanOrEquals: path. Max(value1) <= Min(value2).

6. Logical Constraint Components
  - sh:not: single Shape. FocusNode must not conform to shape.
  - sh:and: list of Shapes. FocusNode must conform to all shapes.
  - sh:or: list of Shapes. FocusNode must conform to at least one.
  - sh:xone: list of Shapes. Exactly one shape must conform.

7. Shape-based Constraint Components
  - sh:node: NodeShape. Each value node validated against NodeShape.
  - sh:property: PropertyShape. Each value node validated against nested PropertyShape.
  - sh:qualifiedValueShape: Shape + integer qMin+qMax. Count of values conforming to shape controlled by qMin,qMax.

8. Other Constraint Components
  - sh:closed: boolean. If true, every property of focus node must be declared by shapes or ignoredProperties.
  - sh:ignoredProperties: list of predicates. Excluded from closed constraint.
  - sh:hasValue: resource or literal. Path must include this exact value.
  - sh:in: list of resources/literals. Path values subset of list.

## Original Source
W3C Shapes Constraint Language (SHACL)
https://www.w3.org/TR/shacl/

## Digest of SHACL_CONSTRAINTS

# SHACL Core Constraint Components

## Value Type Constraint Components

### sh:class
- Predicate: http://www.w3.org/ns/shacl#class
- Range: rdfs:Resource (IRI)
- Cardinality: 0..1 per PropertyShape
- Semantics: each value of the path must be an instance of the given RDF class

### sh:datatype
- Predicate: http://www.w3.org/ns/shacl#datatype
- Range: rdfs:Datatype (IRI)
- Cardinality: 0..1 per PropertyShape
- Semantics: each value of the path must be a literal of the given datatype

### sh:nodeKind
- Predicate: http://www.w3.org/ns/shacl#nodeKind
- Range: IRI with allowed values {sh:IRI, sh:Literal, sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral}
- Cardinality: 0..1 per PropertyShape
- Semantics: restricts the kind of node (IRI, literal, blank node) allowed as values

## Cardinality Constraint Components

### sh:minCount
- Predicate: http://www.w3.org/ns/shacl#minCount
- Range: xsd:integer
- Cardinality: 0..1 per PropertyShape
- Default: 0
- Semantics: minimum number of values for the property path

### sh:maxCount
- Predicate: http://www.w3.org/ns/shacl#maxCount
- Range: xsd:integer
- Cardinality: 0..1 per PropertyShape
- Default: unbounded
- Semantics: maximum number of values for the property path

## Value Range Constraint Components

### sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive
- Predicates: http://www.w3.org/ns/shacl#minExclusive, etc.
- Range: xsd:literal comparables (numbers, dates)
- Cardinality: 0..1 each per PropertyShape
- Semantics: enforces numeric/date bounds on literal values

## String-based Constraint Components

### sh:minLength, sh:maxLength
- Range: xsd:integer
- Semantics: minimum/maximum string length

### sh:pattern
- Range: xsd:string (regular expression)
- Semantics: JavaScript-style regex for literal values

### sh:languageIn
- Range: rdf:List of language tags
- Semantics: restrict literal language tags

### sh:uniqueLang
- Range: xsd:boolean
- Semantics: enforces uniqueness of language-tagged string values

## Property Pair Constraint Components

### sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals
- Range: rdf:Resource (IRI or Literal)
- Cardinality: 0..1 each per PropertyShape
- Semantics: compares values of two paths on same focus node

## Logical Constraint Components

### sh:not, sh:and, sh:or, sh:xone
- Range: sh:Shape or rdf:List of sh:Shape
- Semantics: combines shapes with logical operators

## Shape-based Constraint Components

### sh:node
- Range: sh:NodeShape
- Semantics: nested validation; each value must conform to given node shape

### sh:property
- Range: sh:PropertyShape
- Cardinality: multiple
- Semantics: nested property shapes applied to values

### sh:qualifiedValueShape, sh:qualifiedMinCount, sh:qualifiedMaxCount
- Range: sh:Shape and xsd:integer
- Semantics: qualified (sh:node, sh:property) with count constraints

## Other Constraint Components

### sh:closed, sh:ignoredProperties
- sh:closed: xsd:boolean, enforces no extra properties except those in shapes or ignored list
- sh:ignoredProperties: rdf:List of predicates to be ignored when closed

### sh:hasValue
- Range: rdf:Resource (IRI or Literal)
- Semantics: requires that a specific value appears for the path

### sh:in
- Range: rdf:List of rdf:Resource
- Semantics: allows values only from a given list


## Attribution
- Source: W3C Shapes Constraint Language (SHACL)
- URL: https://www.w3.org/TR/shacl/
- License: License
- Crawl Date: 2025-04-27T01:08:27.598Z
- Data Size: 26167390 bytes
- Links Found: 206960

## Retrieved
2025-04-27
library/RDFJS_STREAMS.md
# library/RDFJS_STREAMS.md
# RDFJS_STREAMS

## Crawl Summary
Defines interfaces ReadableStream<T>, WritableStream<T>, Pipeable<T> with Node.js–compatible streaming events and methods. ReadableStream<T>: on(data/error/end/readable), read(), resume(), pause(), cancel(). WritableStream<T>: write(chunk): boolean, end(), on(error/drain). Pipeable<T>: pipe(destination, options.end default true)

## Normalised Extract
Table of Contents:
 1. ReadableStream Interface
 2. WritableStream Interface
 3. Pipeable Interface

1. ReadableStream Interface
   Methods and Signatures:
     on(event: data, listener: (chunk: T) => void): this  triggers when a data chunk is available
     on(event: error, listener: (error: Error) => void): this  handles stream errors
     on(event: end, listener: () => void): this  signals end of stream
     on(event: readable, listener: () => void): this  signals readiness to read
     read(): T | null  retrieves next chunk, returns null if none available
     resume(): this  resumes flowing mode
     pause(): this  halts data flow
     cancel(): void  aborts stream, no further events

2. WritableStream Interface
   Methods and Signatures:
     write(chunk: T): boolean  writes chunk, returns false if backpressure
     end(): void  marks writable stream complete
     on(event: error, listener: (error: Error) => void): this  handles write errors
     on(event: drain, listener: () => void): this  signals drain event when write buffer empties

3. Pipeable Interface
   Methods and Signatures:
     pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T>
       options.end default true  controls automatic closure of destination on source end

## Supplementary Details
Parameter Values and Defaults:
 options.end default true  when piping, closes destination on source end

Configuration Options:
 objectMode: true  for Node.js stream implementations handling RDF quads
 highWaterMark: configurable integer  controls buffering threshold

Implementation Steps:
 1. Create Node.js Readable with objectMode:true
 2. Override _read to push quad chunks or null
 3. Handle _destroy to emit error and cleanup
 4. Use pipe with { end: false } to preserve destination across multiple sources

## Reference Details
ReadableStream<T>
  on(event: data, listener: (chunk: T) => void): this
  on(event: error, listener: (error: Error) => void): this
  on(event: end, listener: () => void): this
  on(event: readable, listener: () => void): this
  read(): T | null
  resume(): this
  pause(): this
  cancel(): void

WritableStream<T>
  write(chunk: T): boolean
  end(): void
  on(event: error, listener: (error: Error) => void): this
  on(event: drain, listener: () => void): this

Pipeable<T>
  pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T]

Code Example:
 const { Readable } = require(stream)
 class QuadStream extends Readable {
   constructor(source) {
     super({ objectMode: true })
     this.source = source
   }
   _read() {
     try {
       const quad = this.source.next()
       if (quad) push(quad)
       else push(null)
     } catch (err) {
       destroy(err)
     }
   }
 }

 const quadStream = new QuadStream(dataset)
 quadStream.pipe(writer, { end: true })

Backpressure Best Practice:
 if write returns false pause source and on drain resume

Error Handling:
 always register on(error) to avoid uncaught exceptions

Troubleshooting:
 Command: node example.js  Expected: data events follow until end
 If no data, verify source.next implementation returns null at exhaustion


## Information Dense Extract
ReadableStream<T>: on(data|error|end|readable), read():T|null, resume(), pause(), cancel(). WritableStream<T>: write(chunk):boolean, end(), on(error|drain). Pipeable<T>: pipe(dest, { end?:boolean default true }). Implementation: Node.js objectMode Readable, override _read to push quads, use destroy for errors, use pipe with end:false to combine streams. Best practices: handle backpressure by pausing on write false and resume on drain, register error handlers. Configuration: objectMode:true, highWaterMark adjustable. Code patterns: class extends Readable with _read logic, quadStream.pipe(writer,{end:true}). 

## Sanitised Extract
Table of Contents:
 1. ReadableStream Interface
 2. WritableStream Interface
 3. Pipeable Interface

1. ReadableStream Interface
   Methods and Signatures:
     on(event: data, listener: (chunk: T) => void): this  triggers when a data chunk is available
     on(event: error, listener: (error: Error) => void): this  handles stream errors
     on(event: end, listener: () => void): this  signals end of stream
     on(event: readable, listener: () => void): this  signals readiness to read
     read(): T | null  retrieves next chunk, returns null if none available
     resume(): this  resumes flowing mode
     pause(): this  halts data flow
     cancel(): void  aborts stream, no further events

2. WritableStream Interface
   Methods and Signatures:
     write(chunk: T): boolean  writes chunk, returns false if backpressure
     end(): void  marks writable stream complete
     on(event: error, listener: (error: Error) => void): this  handles write errors
     on(event: drain, listener: () => void): this  signals drain event when write buffer empties

3. Pipeable Interface
   Methods and Signatures:
     pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T>
       options.end default true  controls automatic closure of destination on source end

## Original Source
Schema, Validation, RDF/OWL JavaScript Libraries & RDFJS Specifications
https://rdf.js.org/streams/spec/

## Digest of RDFJS_STREAMS

# RDFJS Streams Specification

## ReadableStream<T>

interface ReadableStream<T>

  on(event: data, listener: (chunk: T) => void): this
  on(event: error, listener: (error: Error) => void): this
  on(event: end, listener: () => void): this
  on(event: readable, listener: () => void): this
  read(): T | null
  resume(): this
  pause(): this
  cancel(): void


## WritableStream<T>

interface WritableStream<T>

  write(chunk: T): boolean
  end(): void
  on(event: error, listener: (error: Error) => void): this
  on(event: drain, listener: () => void): this


## Pipeable<T>

interface Pipeable<T>

  pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T]


## Attribution
- Source: Schema, Validation, RDF/OWL JavaScript Libraries & RDFJS Specifications
- URL: https://rdf.js.org/streams/spec/
- License: License if known
- Crawl Date: 2025-04-29T08:52:40.397Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29
library/FUSEKI_DEPLOYMENT.md
# library/FUSEKI_DEPLOYMENT.md
# FUSEKI_DEPLOYMENT

## Crawl Summary
Artifacts: apache-jena-fuseki-5.4.0.tar.gz, apache-jena-fuseki-5.4.0.zip, jena-fuseki-war-5.4.0.war with SHA512 checksums and PGP signatures. Mirrors: dlcdn.apache.org primary and backup. Maven artifacts: org.apache.jena:jena-fuseki-main:5.4.0, org.apache.jena:jena-fuseki-ui:5.4.0, jena-fuseki-war:5.4.0 (type war). Docker: build via jena-fuseki-docker, run on port 3030. WAR deployment: copy war to servlet container (Tomcat 10+), Java 17+ required.

## Normalised Extract
Table of Contents
1. Download Releases
2. Maven Dependencies
3. Docker Deployment
4. WAR Deployment
5. System Requirements

1. Download Releases
   - Mirrors: https://dlcdn.apache.org/, backup same URL
   - Files and checksums:
     * apache-jena-fuseki-5.4.0.tar.gz  SHA512: 3fd7e4...a2c9ac  PGP sig: apache-jena-fuseki-5.4.0.tar.gz.asc
     * apache-jena-fuseki-5.4.0.zip    SHA512: b8c9f1...d1e57  PGP sig: apache-jena-fuseki-5.4.0.zip.asc
     * jena-fuseki-war-5.4.0.war       SHA512: e1a2b3...f7c9d  PGP sig: jena-fuseki-war-5.4.0.war.asc

2. Maven Dependencies
   Add to pom.xml:
     <dependency>org.apache.jena:jena-fuseki-main:5.4.0</dependency>
     <dependency>org.apache.jena:jena-fuseki-ui:5.4.0</dependency>
     <dependency>org.apache.jena:jena-fuseki-war:5.4.0:type=war</dependency>

3. Docker Deployment
   cd jena-fuseki-docker
   docker build -t apache/jena-fuseki:5.4.0 .
   docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0

4. WAR Deployment
   Requirements:
     - Java 17+
     - Servlet 6.0 container (Tomcat 10+)
   Steps:
     - Copy jena-fuseki-war-5.4.0.war → webapps/
     - Start container
     - Access http://localhost:8080/jena-fuseki

5. System Requirements
   Java >=17, Docker >=20.10, Servlet API 6.0 container

## Supplementary Details
Parameter values and effects:
- SHAs and PGP ensure integrity; use gpg --verify <sig> <file>
- Docker tag 5.4.0 explicit version pinning; default listens on port 3030
- WAR context path jena-fuseki by default; can override via CATALINA_OPTS -Dfuseki.context=/custom
- JVM options: set JAVA_OPTS="-Xmx2G -Xms512M"
- Mirror fallback mechanism: edit conf/mirror.properties to list alternative URLs

Implementation steps:
1. Download and verify artifact
2. Place PGP key and run gpg --import KEYS, gpg --verify
3. Unpack tar.gz or unzip, run fuseki-server --config=config.ttl
4. For Docker: build with Dockerfile in jena-fuseki-docker
5. For WAR: deploy to servlet container, ensure web.xml declarations present


## Reference Details
Maven coordinates:
- org.apache.jena:jena-fuseki-main:5.4.0
- org.apache.jena:jena-fuseki-ui:5.4.0
- org.apache.jena:jena-fuseki-war:5.4.0:type=war

SDK Method Signatures: None (Fuseki is a server deployment; client use ARQ QueryExecutionFactory.create(Query, Dataset, QuerySolution))

Docker commands:
- docker build -t apache/jena-fuseki:<version> <path>
- docker run --rm -p 3030:3030 apache/jena-fuseki:<version>

WAR deployment pattern:
1. Copy WAR → TOMCAT_HOME/webapps/
2. Start: catalina.sh run

Servlet container args:
- -Dfuseki.config=/path/to/config.ttl
- -Dfuseki.port=3030

Best practices:
- Always pin version numbers in Docker and Maven
- Verify downloads via PGP
- Allocate memory via JAVA_OPTS
- Use TLS termination in front of Fuseki

Troubleshooting:
$ java -version
expected: openjdk version "17.x.x"
$ docker logs <container>
expected: "Fuseki started, service available at /$SERVICE"
$ curl -I http://localhost:3030/
expected: HTTP/1.1 200 OK
$ catalina.sh run
look for "Starting Servlet Engine: Jakarta Servlet 6.0"

## Information Dense Extract
Fuseki 5.4.0 artifacts: tar.gz (SHA512 3fd7e4…a2c9ac), zip (b8c9f1…d1e57), war (e1a2b3…f7c9d); PGP sig alongside. Maven: org.apache.jena:jena-fuseki-main:5.4.0, :jena-fuseki-ui:5.4.0, :jena-fuseki-war:5.4.0 war. Docker: build jena-fuseki-docker; docker run -p3030:3030 apache/jena-fuseki:5.4.0. WAR: deploy to Servlet 6.0 container (Tomcat 10+), copy war to webapps, start. Requirements: Java 17+, Docker 20.10+, Servlet 6.0. JVM tuning via JAVA_OPTS. Verify downloads: gpg --verify. Troubleshoot: java -version, docker logs, curl -I, catalina.sh run.

## Sanitised Extract
Table of Contents
1. Download Releases
2. Maven Dependencies
3. Docker Deployment
4. WAR Deployment
5. System Requirements

1. Download Releases
   - Mirrors: https://dlcdn.apache.org/, backup same URL
   - Files and checksums:
     * apache-jena-fuseki-5.4.0.tar.gz  SHA512: 3fd7e4...a2c9ac  PGP sig: apache-jena-fuseki-5.4.0.tar.gz.asc
     * apache-jena-fuseki-5.4.0.zip    SHA512: b8c9f1...d1e57  PGP sig: apache-jena-fuseki-5.4.0.zip.asc
     * jena-fuseki-war-5.4.0.war       SHA512: e1a2b3...f7c9d  PGP sig: jena-fuseki-war-5.4.0.war.asc

2. Maven Dependencies
   Add to pom.xml:
     <dependency>org.apache.jena:jena-fuseki-main:5.4.0</dependency>
     <dependency>org.apache.jena:jena-fuseki-ui:5.4.0</dependency>
     <dependency>org.apache.jena:jena-fuseki-war:5.4.0:type=war</dependency>

3. Docker Deployment
   cd jena-fuseki-docker
   docker build -t apache/jena-fuseki:5.4.0 .
   docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0

4. WAR Deployment
   Requirements:
     - Java 17+
     - Servlet 6.0 container (Tomcat 10+)
   Steps:
     - Copy jena-fuseki-war-5.4.0.war  webapps/
     - Start container
     - Access http://localhost:8080/jena-fuseki

5. System Requirements
   Java >=17, Docker >=20.10, Servlet API 6.0 container

## Original Source
RDF Data Access & SPARQL Protocols
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_DEPLOYMENT

# Downloads

Apache Jena Fuseki 5.4.0 Binary distribution files, checksums, signatures, and mirrors

## Mirrors
https://dlcdn.apache.org/
https://dlcdn.apache.org/ (backup)

## File Releases
File                          | SHA512 checksum                       | PGP signature  
------------------------------|---------------------------------------|----------------
apache-jena-fuseki-5.4.0.tar.gz | 3fd7e4...a2c9ac  | apache-jena-fuseki-5.4.0.tar.gz.asc  
apache-jena-fuseki-5.4.0.zip   | b8c9f1...d1e57  | apache-jena-fuseki-5.4.0.zip.asc   
jena-fuseki-war-5.4.0.war      | e1a2b3...f7c9d  | jena-fuseki-war-5.4.0.war.asc      

# Maven Artifacts

Include these coordinates in your pom.xml or build.gradle to add Fuseki engine and UI

```xml
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-main</artifactId>
  <version>5.4.0</version>
</dependency>
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-ui</artifactId>
  <version>5.4.0</version>
</dependency>
```

WAR packaging for servlet deployment:
```xml
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-war</artifactId>
  <version>5.4.0</version>
  <type>war</type>
</dependency>
```

# Docker Container

Build and run the Fuseki Docker container from source or pull the official image.

```bash
# Build from source directory containing Dockerfile
cd jena-fuseki-docker
docker build -t apache/jena-fuseki:5.4.0 .
# Run container on port 3030
docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0
```

# WAR Deployment

Requirements
- Java 17 or later
- Jakarta Servlet API 6.0 container (e.g., Tomcat 10.x+)

Steps:
1. Copy jena-fuseki-war-5.4.0.war into webapps directory
2. Start container
3. Access UI at http://localhost:8080/jena-fuseki

# Requirements

- Java 17+: Verify with `java -version` expecting output `openjdk version "17.x.x"`
- Maven/Gradle for client builds
- Docker 20.10+ for container builds
- Servlet container supporting Jakarta Servlet 6.0 for WAR


## Attribution
- Source: RDF Data Access & SPARQL Protocols
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License if known
- Crawl Date: 2025-04-29T03:54:13.663Z
- Data Size: 1687825 bytes
- Links Found: 3601

## Retrieved
2025-04-29
library/FUSEKI_SETUP.md
# library/FUSEKI_SETUP.md
# FUSEKI_SETUP

## Crawl Summary
Download Fuseki binaries and Maven artifacts. Java 17 requirement. Configuration details: fuseki-server-config.ttl endpoints, shiro.ini security. Startup commands with options --port, --update, --tdb. Docker image and run options. Java embedding using FusekiServer.Builder. Security: Shiro, password hashing, roles. Logging with SLF4J/log4j2. Troubleshooting commands.

## Normalised Extract
Table of Contents
1. Download and Verification
2. Java Version Check
3. Configuration Files Structure
4. Server Startup Commands
5. Docker Deployment
6. Java Embedding API
7. Security Configuration
8. Logging Setup
9. Troubleshooting Procedures

1. Download and Verification
  - Files: apache-jena-fuseki-<ver>.zip|tar.gz, SHA512, .asc
  - Commands: sha512sum <file>, gpg --verify <sig> <file>

2. Java Version Check
  - Requirement: Java 17+
  - Command: java -version

3. Configuration Files Structure
  - Location: FUSEKI_HOME/configuration/
  - fuseki-server-config.ttl:
      service: rdf:Service; ja:dataset; ja:name; ja:graphStoreDescription
      endpoints: ja:endpoint; ja:name 'query'|'update'|'data'
  - shiro.ini entries:
      [users]
        user = password, role
      [roles]
        role = permissions

4. Server Startup Commands
  - CLI: fuseki-server --config=PATH --port=NUM --update --tdb=DIR
  - Defaults: port=3030, update=false

5. Docker Deployment
  - Image: apache/jena-fuseki:latest
  - Run: docker run -d --name fuseki -p 3030:3030 -v HOST_DB:CONTAINER_DB IMAGE

6. Java Embedding API
  - Maven:
      <dependency>org.apache.jena:jena-fuseki-main:${ver}</dependency>
      <dependency>org.apache.jena:jena-fuseki-core:${ver}</dependency>
  - Code:
      FusekiServer server = FusekiServer.create()
        .port(3030)
        .add("/ds", dataset)
        .securityConfig("/path/shiro.ini")
        .build();
      server.start();

7. Security Configuration
  - shiro.ini hashing algorithm: Sha256HashService, iterations=5000
  - Permissions: sparql:query, sparql:update, graph:read, graph:write

8. Logging Setup
  - log4j2.xml: rolling file appender logs/fuseki.log
  - Pattern: %d{ISO8601} %-5p [%c] %m%n

9. Troubleshooting Procedures
  - Port check: lsof -i:3030
  - Endpoint test: curl -G "http://localhost:3030/ds/query" --data-urlencode "query=SELECT * WHERE {}"
  - Log review: tail -100 logs/fuseki.log

## Supplementary Details
Fuseki server process requires: 
- ENV: FUSEKI_HOME pointing to installation directory
- JVM args: -Xmx2G -Xms512M
- TDB dataset folder permissions: rwxr-x--- for fuseki user
- shiro.ini directives:
    passwordService.hashedCredentialsMatcher.hashAlgorithmName = SHA-256
    passwordService.hashedCredentialsMatcher.hashIterations = 5000
- Data store config TTL options:
    ja:allowUpdate true|false
    ja:serviceQuery "sparql"
- Shutdown: send SIGTERM or curl POST to /$/shutdown with admin credentials

## Reference Details
### CLI Options
--config=FILE_PATH : String, path to fuseki-server-config.ttl
--port=PORT_NUMBER : Integer, default=3030
--update           : Boolean, enable SPARQL Update endpoint
--tdb=DIR          : String, path to TDB dataset for persistence
--loopback         : Boolean, bind only to localhost

### fuseki-server-config.ttl Structure
:Service123 rdf:type ja:Service ;
  ja:name "dataset" ;
  ja:serviceQuery "query" ;
  ja:serviceUpdate "update" ;
  ja:graphStoreDefault "data" ;
  ja:dataset :DS123 .

:DS123 rdf:type ja:Dataset ;
  ja:defaultGraph :http://example.org/graph .

### Java API: FusekiServer.Builder
public class FusekiServer.Builder {
    public Builder port(int port);
    public Builder loopback(boolean flag);
    public Builder securityConfig(String shiroIniPath);
    public Builder add(String mountPoint, DatasetGraph dataset);
    public Builder build();
}

public class FusekiServer {
    public void start();
    public void stop();
    public boolean isRunning();
}

### Maven Artifacts
GroupId: org.apache.jena
ArtifactId: jena-fuseki-main
Version: X.Y.Z

GroupId: org.apache.jena
ArtifactId: jena-fuseki-core
Version: X.Y.Z

### Docker Usage
docker pull apache/jena-fuseki:latest

docker run --name fuseki -d \
  -e FUSEKI_HOME=/fuseki \
  -v /local/db:/fuseki/databases \
  -p 3030:3030 \
  apache/jena-fuseki:latest

### Best Practices
- Use dedicated OS user for Fuseki: fuseki
- Set ulimit -n 65536 for file descriptors
- Use TLS reverse proxy (nginx) for HTTPS and basic auth
- Rotate logs daily via log4j2 configuration

### Troubleshooting
1. Port in use: kill $(lsof -t -i:3030)
2. Authentication errors: check shiro.ini syntax and hashed password
3. Dataset corruption: tdbrepair.sh -loc /path/to/tdb
4. High memory: adjust -Xmx and monitor via jstat


## Information Dense Extract
Download apache-jena-fuseki-<ver>.zip|tar.gz; verify SHA512 and PGP. Requires Java 17+. Install to $FUSEKI_HOME. config/fuseki-server-config.ttl defines rdf:Service ja:Dataset, endpoints name=query|update|data. shiro.ini: [users] and [roles], set hashAlgorithmName=SHA-256, iterations=5000. Start: fuseki-server --config=PATH --port=3030 --update --tdb=DIR --loopback. Docker: docker run -d --name fuseki -p 3030:3030 -v HOST_DB:/fuseki/databases apache/jena-fuseki:latest. Java embed: add org.apache.jena:jena-fuseki-main and core; use FusekiServer.create().port(int).add(String, DatasetGraph).securityConfig(String).build().start(). CLI options: --config, --port(int), --update, --tdb(String), --loopback. Logging: log4j2.xml with rolling file appender logs/fuseki.log pattern %d{ISO8601} %-5p [%c] %m%n. Troubleshoot: lsof -i:3030, curl -G "http://localhost:3030/ds/query" --data-urlencode "query=SELECT * WHERE{}"; tdbrepair.sh. Best practice: run under dedicated user, set ulimit, TLS via reverse proxy, rotate logs, monitor memory with jstat.

## Sanitised Extract
Table of Contents
1. Download and Verification
2. Java Version Check
3. Configuration Files Structure
4. Server Startup Commands
5. Docker Deployment
6. Java Embedding API
7. Security Configuration
8. Logging Setup
9. Troubleshooting Procedures

1. Download and Verification
  - Files: apache-jena-fuseki-<ver>.zip|tar.gz, SHA512, .asc
  - Commands: sha512sum <file>, gpg --verify <sig> <file>

2. Java Version Check
  - Requirement: Java 17+
  - Command: java -version

3. Configuration Files Structure
  - Location: FUSEKI_HOME/configuration/
  - fuseki-server-config.ttl:
      service: rdf:Service; ja:dataset; ja:name; ja:graphStoreDescription
      endpoints: ja:endpoint; ja:name 'query'|'update'|'data'
  - shiro.ini entries:
      [users]
        user = password, role
      [roles]
        role = permissions

4. Server Startup Commands
  - CLI: fuseki-server --config=PATH --port=NUM --update --tdb=DIR
  - Defaults: port=3030, update=false

5. Docker Deployment
  - Image: apache/jena-fuseki:latest
  - Run: docker run -d --name fuseki -p 3030:3030 -v HOST_DB:CONTAINER_DB IMAGE

6. Java Embedding API
  - Maven:
      <dependency>org.apache.jena:jena-fuseki-main:${ver}</dependency>
      <dependency>org.apache.jena:jena-fuseki-core:${ver}</dependency>
  - Code:
      FusekiServer server = FusekiServer.create()
        .port(3030)
        .add('/ds', dataset)
        .securityConfig('/path/shiro.ini')
        .build();
      server.start();

7. Security Configuration
  - shiro.ini hashing algorithm: Sha256HashService, iterations=5000
  - Permissions: sparql:query, sparql:update, graph:read, graph:write

8. Logging Setup
  - log4j2.xml: rolling file appender logs/fuseki.log
  - Pattern: %d{ISO8601} %-5p [%c] %m%n

9. Troubleshooting Procedures
  - Port check: lsof -i:3030
  - Endpoint test: curl -G 'http://localhost:3030/ds/query' --data-urlencode 'query=SELECT * WHERE {}'
  - Log review: tail -100 logs/fuseki.log

## Original Source
RDF Data Access & SPARQL Protocols
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_SETUP

# Fuseki Standalone Server Setup

## 1. Download and Install
- Download apache-jena-fuseki-<version>.zip or .tar.gz from https://jena.apache.org/download/
- Verify integrity: 
  - SHA512 file: apache-jena-fuseki-<version>.zip.sha512
  - PGP signature: apache-jena-fuseki-<version>.zip.asc
  - Command: 
    - sha512sum apache-jena-fuseki-<version>.zip
    - gpg --verify apache-jena-fuseki-<version>.zip.asc apache-jena-fuseki-<version>.zip
- Unpack: 
  - unzip apache-jena-fuseki-<version>.zip
  - tar xzf apache-jena-fuseki-<version>.tar.gz

## 2. Java Requirements
- Minimum Java: 17
- Recommended: Java 17 or later
- Verify: java -version

## 3. Configuration Files
- Location: FUSEKI_HOME/configuration/
- fuseki-server-config.ttl: 
  - dataset: Service declaration, graph store endpoints, security realm
  - sparql endpoint: /dataset/query
  - update endpoint: /dataset/update
  - graph store endpoint: /dataset/data
- shiro.ini (for security): 
  - [users] admin = password, role_admin
  - [roles] role_admin = *

## 4. Running the Server
- Command: 
  - ./fuseki-server --config=configuration/fuseki-server-config.ttl
  - Options: 
    - --port=3030 (default)
    - --update (enable SPARQL Update)
    - --tdb TDB_LOCATION (persistent storage path)
- As background service: wrap in systemd unit: 
  - ExecStart=/opt/fuseki/fuseki-server --config=/opt/fuseki/config/fuseki-server-config.ttl

## 5. Docker Container
- Image: apache/jena-fuseki:latest
- Run: 
  - docker run -d --name fuseki -p 3030:3030 \
      -v /local/data:/fuseki/databases \
      apache/jena-fuseki:latest

## 6. Embedding in Java
- Maven dependencies:
  - org.apache.jena:jena-fuseki-main:X.Y.Z
  - org.apache.jena:jena-fuseki-core:X.Y.Z
- Code pattern:
  - FusekiServer.Builder builder = FusekiServer.create()
      .add("/ds", dataset)
      .port(3030)
      .securityConfig("/path/to/shiro.ini");
    FusekiServer server = builder.build();
    server.start();

## 7. Security and Access Control
- Apache Shiro integration:
  - shiro.ini configuration
  - Password hashing: SHA-256
  - Roles and permissions: sparql:query, sparql:update

## 8. Logging
- SLF4J configuration in log4j2.xml
- Log files: logs/fuseki.log
  - Levels: INFO, WARN, ERROR
  - Pattern: %d{ISO8601} %-5p [%c] %m%n

## 9. Troubleshooting
- Check port conflicts: lsof -i:3030
- Logs location: logs/fuseki.log
- Common error: Authentication failure — verify shiro.ini credentials
- SPARQL endpoint test: curl -X GET "http://localhost:3030/ds/query?query=SELECT+*+WHERE+%7B%7D"


## Attribution
- Source: RDF Data Access & SPARQL Protocols
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License if known
- Crawl Date: 2025-04-29T01:09:05.946Z
- Data Size: 2276672 bytes
- Links Found: 3853

## Retrieved
2025-04-29
library/JSONLD_JS.md
# library/JSONLD_JS.md
# JSONLD_JS

## Crawl Summary
jsonld.js implements JSON-LD 1.0/1.1 in JavaScript. Install via npm. Exposes Promise-based methods compact, expand, flatten, frame, canonize, toRDF, fromRDF with specified argument types and default options. Bundles provided for ES5 and ES modules. Custom RDF parser registration and document loader override supported. Safe mode available for data-loss detection. Native canonize via rdf-canonize-native. Testing via npm scripts, fetch-test-suites and Karma. Configuration options: algorithm URDNA2015, format application/n-quads, useNative flag, safe flag, produceGeneralizedRdf flag, documentLoader default. CDN and bundler integration detailed.

## Normalised Extract
Table of Contents:
1 Installation
2 Bundles
3 Core API Methods
4 Option Defaults
5 Custom Extensions
6 Safe Mode
7 Testing & Reporting

1 Installation
  Command: npm install jsonld
  Import CommonJS: const jsonld = require('jsonld')
  Import ESM: import * as jsonld from 'jsonld'

2 Bundles
  ES5 bundle: ./dist/jsonld.min.js (includes polyfills)
  ES module bundle: ./dist/jsonld.esm.min.js (no extra polyfills)
  CDN URLs for latest version: CDNJS, jsDelivr, unpkg

3 Core API Methods
  compact(input: object|string, context: object|string, options?: object): Promise<object>
  expand(input: object|string, options?: object): Promise<Array<object|string>>
  flatten(input: object|string, contextOrOptions?: object|string|object): Promise<object>
  frame(input: object|string, frame: object, options?: object): Promise<object>
  canonize(input: object|string, options: {algorithm: string, format: string, useNative?: boolean}): Promise<string>
  toRDF(input: object|string, options: {format: string, produceGeneralizedRdf?: boolean}): Promise<string|object>
  fromRDF(input: string|Uint8Array, options: {format: string}): Promise<object>

4 Option Defaults
  canonize.algorithm = "URDNA2015"
  canonize.format = "application/n-quads"
  canonize.useNative = false
  toRDF.format = "application/n-quads"
  toRDF.produceGeneralizedRdf = false
  options.safe = false
  jsonld.documentLoader = nodeDocumentLoader

5 Custom Extensions
  Register RDF parser: jsonld.registerRDFParser(contentType, parser)
  Override loader globally: jsonld.documentLoader = customLoader
  Pass loader per-call: jsonld.{method}(..., {documentLoader: customLoader})

6 Safe Mode
  Detect data-loss: jsonld.expand(data, {safe: true})

7 Testing & Reporting
  npm run fetch-test-suites
  npm test
  npm run test-karma -- --browsers Firefox,Chrome
  npm run coverage
  npm run coverage-report
  REPORTER=dot npm test
  EARL=earl-node.jsonld npm test
  rdf serialize jsonld-js-earl.jsonld --output-format turtle -o out.ttl

## Supplementary Details
Parameter Values:
- algorithm: "URDNA2015" | "URGNA2012"
- format: "application/n-quads" | "application/n-quads;charset=utf-8"
- useNative: true|false
- produceGeneralizedRdf: true|false
- safe: true|false

Configuration Options:
- documentLoader: function(url: string, options: object): Promise<{contextUrl:string,document:any,documentUrl:string}>

Implementation Steps:
1 Install jsonld and optionally rdf-canonize-native
2 Import jsonld
3 Set any global options (jsonld.documentLoader, User-Agent header)
4 Call API methods with correct parameters
5 Handle returned Promise
6 For bundler, include appropriate bundle file
7 For custom loader or parser, register before API calls


## Reference Details
API Specifications:

compact(input: object|string, context: object|string, options?: {
  expandContext?: boolean,
  base?: string,
  compactArrays?: boolean,
  compactToRelative?: boolean,
  graph?: boolean,
  skipExpansion?: boolean,
  documentLoader?: function,
  produceGeneralizedRdf?: boolean,
  safe?: boolean
}): Promise<object>

expand(input: object|string, options?: {
  expandContext?: object|string,
  base?: string,
  keepFreeFloatingNodes?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<Array<object|string>>

flatten(input: object|string, contextOrOptions?: object|string|{
  expandContext?: object|string,
  base?: string,
  documentLoader?: function,
  safe?: boolean
}): Promise<object>

frame(input: object|string, frame: object, options?: {
  embed?: string,
  explicit?: boolean,
  omitDefault?: boolean,
  pruneBlankNodeIdentifiers?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<object>

canonize(input: object|string, options: {
  algorithm: "URDNA2015" | "URGNA2012",
  format: "application/n-quads",
  useNative?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<string>

toRDF(input: object|string, options: {
  format: "application/n-quads" | "application/n-quads;charset=utf-8",
  produceGeneralizedRdf?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<string>

fromRDF(input: string|Uint8Array, options: {
  format: "application/n-quads", 
  documentLoader?: function,
  safe?: boolean
}): Promise<object>

registerRDFParser(contentType: string, parser: function(input: Buffer|string): object|Promise<object>): void

CUSTOM DOCUMENT LOADER PATTERN:
const nodeLoader = jsonld.documentLoaders.node();
const loader = async (url,options) => {
  if(PRELOADED[url]) return {contextUrl:null,document:PRELOADED[url],documentUrl:url};
  return nodeLoader(url);
};
jsonld.documentLoader = loader;

BEST PRACTICES:
- Always specify base or expandContext when using URLs
- Use safe mode for digital signing workflows
- Set default UA header: use jsonld.documentLoaders.node({userAgent:"MyApp/1.0"})
- For large datasets, use stream-based processing via async iterators

TROUBLESHOOTING:
# Missing Context Error
Command: node app.js
Expected: resolves Promise
Actual: Error: Context URL not found
Fix: preload contexts via documentLoader override or include "@context" inline

# Canonization Fails
Command: jsonld.canonize(doc)
Expected: string
Actual: Error: Algorithm not supported
Fix: ensure algorithm set to "URDNA2015"

# Test Suites Missing
Command: npm test
Actual: Error: TESTS environment not set
Fix: npm run fetch-test-suites or set TESTS="/path/to/tests"


## Information Dense Extract
jsonld.js JSON-LD 1.1 JS implementation; npm install jsonld; require or import jsonld; Bundles: dist/jsonld.min.js (ES5), dist/jsonld.esm.min.js (ESM); Methods: compact(input,context,options?):Promise<object>; expand(input,options?):Promise<Array>; flatten(input,contextOrOptions?):Promise<object>; frame(input,frame,options?):Promise<object>; canonize(input,{algorithm URDNA2015,format application/n-quads,useNative false}):Promise<string>; toRDF(input,{format application/n-quads,produceGeneralizedRdf false}):Promise<string>; fromRDF(input,{format application/n-quads}):Promise<object>; registerRDFParser(contentType,parser):void; documentLoader default nodeDocumentLoader; options.safe false; configure loader: jsonld.documentLoader=customLoader; safe mode: options.safe true; native canonize: install rdf-canonize-native and set useNative true; testing: npm test, npm run test-karma, npm run coverage; fetch tests: npm run fetch-test-suites; CNN URLs for CDNJS/jsDelivr/unpkg; defaults: algorithm URDNA2015, format application/n-quads, produceGeneralizedRdf false; errors: missing context URL preload via custom loader; canonize unsupported algorithm ensure URDNA2015; tests missing set TESTS env;

## Sanitised Extract
Table of Contents:
1 Installation
2 Bundles
3 Core API Methods
4 Option Defaults
5 Custom Extensions
6 Safe Mode
7 Testing & Reporting

1 Installation
  Command: npm install jsonld
  Import CommonJS: const jsonld = require('jsonld')
  Import ESM: import * as jsonld from 'jsonld'

2 Bundles
  ES5 bundle: ./dist/jsonld.min.js (includes polyfills)
  ES module bundle: ./dist/jsonld.esm.min.js (no extra polyfills)
  CDN URLs for latest version: CDNJS, jsDelivr, unpkg

3 Core API Methods
  compact(input: object|string, context: object|string, options?: object): Promise<object>
  expand(input: object|string, options?: object): Promise<Array<object|string>>
  flatten(input: object|string, contextOrOptions?: object|string|object): Promise<object>
  frame(input: object|string, frame: object, options?: object): Promise<object>
  canonize(input: object|string, options: {algorithm: string, format: string, useNative?: boolean}): Promise<string>
  toRDF(input: object|string, options: {format: string, produceGeneralizedRdf?: boolean}): Promise<string|object>
  fromRDF(input: string|Uint8Array, options: {format: string}): Promise<object>

4 Option Defaults
  canonize.algorithm = 'URDNA2015'
  canonize.format = 'application/n-quads'
  canonize.useNative = false
  toRDF.format = 'application/n-quads'
  toRDF.produceGeneralizedRdf = false
  options.safe = false
  jsonld.documentLoader = nodeDocumentLoader

5 Custom Extensions
  Register RDF parser: jsonld.registerRDFParser(contentType, parser)
  Override loader globally: jsonld.documentLoader = customLoader
  Pass loader per-call: jsonld.{method}(..., {documentLoader: customLoader})

6 Safe Mode
  Detect data-loss: jsonld.expand(data, {safe: true})

7 Testing & Reporting
  npm run fetch-test-suites
  npm test
  npm run test-karma -- --browsers Firefox,Chrome
  npm run coverage
  npm run coverage-report
  REPORTER=dot npm test
  EARL=earl-node.jsonld npm test
  rdf serialize jsonld-js-earl.jsonld --output-format turtle -o out.ttl

## Original Source
JSON-LD 1.1 Core & jsonld.js
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# JSON-LD.js Technical Reference

# Installation

Install via npm:

    npm install jsonld

CommonJS import:

    const jsonld = require('jsonld');

ES Module import:

    import * as jsonld from 'jsonld';
    import {promises} from 'jsonld';
    import {JsonLdProcessor} from 'jsonld';

# Bundles

Browser bundles shipped in npm package:

- ./dist/jsonld.min.js: ES5 with polyfills for older browsers
- ./dist/jsonld.esm.min.js: ES2017+ module without extra polyfills

Usage via script tags:

    <script type="module" src="./dist/jsonld.esm.min.js"></script>
    <script nomodule src="./dist/jsonld.min.js"></script>

CDN usage:

- CDNJS: https://cdnjs.cloudflare.com/ajax/libs/jsonld/1.0.0/jsonld.min.js
- jsDelivr: https://cdn.jsdelivr.net/npm/jsonld@1.0.0/dist/jsonld.min.js
- unpkg: https://unpkg.com/jsonld@1.0.0/dist/jsonld.min.js

# Core API Methods and Signatures

Methods:

- compact(input: object|string, context: object|string, options?: object): Promise<object>
- expand(input: object|string, options?: object): Promise<Array<object|string>>
- flatten(input: object|string, contextOrOptions?: object|string|object): Promise<object>
- frame(input: object|string, frame: object, options?: object): Promise<object>
- canonize(input: object|string, options: {algorithm: string, format: string, useNative?: boolean}): Promise<string>
- toRDF(input: object|string, options: {format: string, produceGeneralizedRdf?: boolean}): Promise<string|object>
- fromRDF(input: string|Uint8Array, options: {format: string}): Promise<object>

Each method returns a Promise and may reject with Error.

# Options and Defaults

- canonize algorithm: default "URDNA2015"
- canonize format: default "application/n-quads"
- useNative: default false
- toRDF/fromRDF format: default "application/n-quads"
- toRDF produceGeneralizedRdf: default false
- safe mode: options.safe: default false
- documentLoader: default jsonld.documentLoaders.node()

# Custom Parsers and Loaders

Register custom RDF parser:

    jsonld.registerRDFParser(contentType: string, parser: (input: Buffer|string) => object|Promise<object>): void

Override document loader:

    const nodeLoader = jsonld.documentLoaders.node();
    jsonld.documentLoader = async (url, options) => {
      if(url in PRELOADED) return {contextUrl: null, document: PRELOADED[url], documentUrl: url};
      return nodeLoader(url);
    };

Pass loader per-call:

    jsonld.compact(doc, ctx, {documentLoader: customLoader});

# Safe Mode

Enable data-loss detection:

    jsonld.expand(data, {safe: true});

# Testing and Automation

- fetch test suites: npm run fetch-test-suites
- run Node tests: npm test
- run browser tests: npm run test-karma -- --browsers Firefox,Chrome
- code coverage: npm run coverage; npm run coverage-report
- custom reporter: REPORTER=dot npm test
- remote context server: node tests/remote-context-server.js; TESTS=`pwd`/tests npm test
- EARL reports: EARL=earl-node.jsonld npm test; serialize EARL to ttl: rdf serialize jsonld-js-earl.jsonld --output-format turtle -o jsonld-js-earl.ttl

# Performance and Native Bindings

Optional native canonize bindings:

    npm install rdf-canonize-native
    jsonld.canonize(doc, {useNative: true});


## Attribution
- Source: JSON-LD 1.1 Core & jsonld.js
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: W3C Document License (CC-BY 4.0); MIT License
- Crawl Date: 2025-04-28T11:50:44.363Z
- Data Size: 659495 bytes
- Links Found: 5268

## Retrieved
2025-04-28
library/RIOT.md
# library/RIOT.md
# RIOT

## Crawl Summary
Supported formats: Turtle, JSON-LD, N-Triples, N-Quads, TriG, RDF/XML, TriX, RDF/JSON, RDF Thrift, RDF Protobuf, RDF Binary.  CLI tools: riot, turtle, ntriples, nquads, trig, rdfxml.  Options: --syntax, --validate, --check, --time, --sink, --output, --formatted, --stream.  Compression: GZip, BZip2.  Java API: RDFParser.create().source(...).lang(...).parse(model); RDFWriter.create().source(...).lang(...).output(out);

## Normalised Extract
Table of Contents

1 Supported Formats
2 CLI Usage
3 Compression
4 Java API – RDFParser
5 Java API – RDFWriter

1 Supported Formats
List of Lang constants and extensions:
    Turtle           Lang.TURTLE      .ttl
    JSON-LD          Lang.JSONLD      .jsonld
    N-Triples        Lang.NTRIPLES    .nt
    N-Quads          Lang.NQUADS      .nq
    TriG             Lang.TRIG        .trig
    RDF/XML          Lang.RDFXML      .rdf, .owl
    TriX             Lang.TRIX        .trix
    RDF/JSON         Lang.RDFJSON     .rj
    RDF Thrift       Lang.RDFTHRIFT   .trdf, .rt
    RDF Protobuf     Lang.RDFPROTOBUF .rpb, .pbrdf
    RDF Binary       Lang.RDFCB       (binary)

2 CLI Usage
Commands:
    riot [files …] [--options]
    turtle [files …]
    ntriples [files …]
    nquads [files …]
    trig [files …]
    rdfxml [files …]
Options:
    --syntax=NAME         set input syntax (e.g. TTL, NQ)
    --validate            strict check, no output
    --check=true|false    literal and IRI validation
    --time                report timing
    --sink                suppress output
    --output=FORMAT       e.g. "JSONLD", "TRIG"
    --formatted=FORMAT    pretty print in given format
    --stream=FORMAT       streaming write
Example:
    riot --syntax=TTL --output=JSONLD input.ttl > output.jsonld

3 Compression
Supported by automatic detection of .gz and .bz2.  Other: zstd -d < file.zst | riot --syntax=NQ

4 Java API – RDFParser
Usage:
    RDFParser.create()
        .source("file.ttl")
        .lang(Lang.TURTLE)
        .base("http://example/")
        .errorHandler(RiotLib.defaultHandler)
        .parse(model);

5 Java API – RDFWriter
Usage:
    RDFWriter.create()
        .source(model)
        .lang(Lang.JSONLD)
        .prefixMapping(model.getPrefixMapping().getNsPrefixMap())
        .base("http://example/")
        .output(System.out);


## Supplementary Details
1) Dependency (Maven):
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>apache-jena-libs</artifactId>
  <version>5.4.0</version>
</dependency>

2) Reading RDF:
- Steps:
  a) Create a Model or DatasetGraph.
  b) Configure RDFParser:
     RDFParser.create()
              .source("data.ttl")
              .lang(Lang.TURTLE)
              .errorHandler(RiotLib.defaultHandler)
              .parse(model);

3) Writing RDF:
- Configure RDFWriter:
     RDFWriter.create()
              .source(model)
              .lang(Lang.NTRIPLES)
              .output(new FileOutputStream("out.nt"));

4) CLI Data Conversion:
- Command: riot input.nq --output=TRIG > output.trig
- Validation: riot --validate file.rdf
- Timing: riot --time file.jsonld

5) Prefix Registration:
- At runtime: RDFWriter.create().prefixMapping(SortedMap<String,String> nsMap)



## Reference Details
### CLI Option Reference
--syntax=NAME         (String) parser name from Lang.getLabel()
--validate            boolean flag, implies --strict --sink --check=true
--check=true|false    boolean, default false, enables literal/IRI checks
--time                boolean, prints parse and write stage timings
--sink                boolean, disables output
--output=FORMAT       (String) writer name from Lang.getLabel()
--formatted=FORMAT    (String) writer name with pretty printing
--stream=FORMAT       (String) writer name in streaming mode

### RDFParser API
public final class RDFParser {
  public static RDFParser.Builder create();
  public static RDFParser.Builder source(String url);
  public static RDFParser.Builder source(InputStream in);
  public RDFParser.Builder lang(Lang lang);
  public RDFParser.Builder base(String baseURI);
  public RDFParser.Builder errorHandler(RiotErrorHandler handler);
  public void parse(Model model) throws RiotException;
  public void parse(StreamRDF dest) throws RiotException;

### RDFWriter API
public final class RDFWriter {
  public static RDFWriter.Builder create();
  public RDFWriter.Builder source(Model model);
  public RDFWriter.Builder source(DatasetGraph dsg);
  public RDFWriter.Builder lang(Lang lang);
  public RDFWriter.Builder base(String baseURI);
  public RDFWriter.Builder prefixMapping(PrefixMap prefixMap);
  public void output(OutputStream out) throws RiotException, IOException;
  public void output(Writer w) throws RiotException, IOException;

### Best Practices
- Always enable literal/IRI validation in production: parserBuilder.check(true).errorHandler(RiotLib.defaultHandler).
- Use streaming writers for large datasets: writerBuilder.stream(Lang.NQUADS).
- Maintain prefix maps for human-readable output: prefixMapping(model.getPrefixMapping().getNsPrefixMap()).

### Troubleshooting
- To locate syntax errors with line numbers:
    riot --check=true --sink data.ttl
  Expected output: ERROR [line:12 col:45] Malformed literal.

- To benchmark parse/write performance:
    riot --time data.ttl --output=TRIG > /dev/null
  Expected output:
    Parse time: 120 ms
    Write time: 80 ms

- To convert compressed input:
    zstd -d < data.nq.zst | riot --syntax=NQ --output=JSONLD > out.jsonld


## Information Dense Extract
Formats: Turtle(.ttl,Lang.TURTLE),JSON-LD(.jsonld,Lang.JSONLD),N-Triples(.nt,Lang.NTRIPLES),N-Quads(.nq,Lang.NQUADS),TriG(.trig,Lang.TRIG),RDF/XML(.rdf/.owl,Lang.RDFXML),TriX(.trix,Lang.TRIX),RDF/JSON(.rj,Lang.RDFJSON),RDF Thrift(.trdf/.rt,Lang.RDFTHRIFT),RDF Protobuf(.rpb/.pbrdf,Lang.RDFPROTOBUF),RDF Binary(Lang.RDFCB). CLI: riot,turtle,ntriples,nquads,trig,rdfxml. Options: --syntax=NAME, --validate, --check=true|false, --time, --sink, --output=FORMAT, --formatted=FORMAT, --stream=FORMAT. Compression: .gz,.bz2 auto; others via pipe. Java API: RDFParser.create().source(url|in).lang(Lang).base(String).errorHandler(RiotErrorHandler).parse(Model|StreamRDF). RDFWriter.create().source(Model|DatasetGraph).lang(Lang).base(String).prefixMapping(PrefixMap).output(OutputStream|Writer).

## Sanitised Extract
Table of Contents

1 Supported Formats
2 CLI Usage
3 Compression
4 Java API  RDFParser
5 Java API  RDFWriter

1 Supported Formats
List of Lang constants and extensions:
    Turtle           Lang.TURTLE      .ttl
    JSON-LD          Lang.JSONLD      .jsonld
    N-Triples        Lang.NTRIPLES    .nt
    N-Quads          Lang.NQUADS      .nq
    TriG             Lang.TRIG        .trig
    RDF/XML          Lang.RDFXML      .rdf, .owl
    TriX             Lang.TRIX        .trix
    RDF/JSON         Lang.RDFJSON     .rj
    RDF Thrift       Lang.RDFTHRIFT   .trdf, .rt
    RDF Protobuf     Lang.RDFPROTOBUF .rpb, .pbrdf
    RDF Binary       Lang.RDFCB       (binary)

2 CLI Usage
Commands:
    riot [files ] [--options]
    turtle [files ]
    ntriples [files ]
    nquads [files ]
    trig [files ]
    rdfxml [files ]
Options:
    --syntax=NAME         set input syntax (e.g. TTL, NQ)
    --validate            strict check, no output
    --check=true|false    literal and IRI validation
    --time                report timing
    --sink                suppress output
    --output=FORMAT       e.g. 'JSONLD', 'TRIG'
    --formatted=FORMAT    pretty print in given format
    --stream=FORMAT       streaming write
Example:
    riot --syntax=TTL --output=JSONLD input.ttl > output.jsonld

3 Compression
Supported by automatic detection of .gz and .bz2.  Other: zstd -d < file.zst | riot --syntax=NQ

4 Java API  RDFParser
Usage:
    RDFParser.create()
        .source('file.ttl')
        .lang(Lang.TURTLE)
        .base('http://example/')
        .errorHandler(RiotLib.defaultHandler)
        .parse(model);

5 Java API  RDFWriter
Usage:
    RDFWriter.create()
        .source(model)
        .lang(Lang.JSONLD)
        .prefixMapping(model.getPrefixMapping().getNsPrefixMap())
        .base('http://example/')
        .output(System.out);

## Original Source
RDF Data Access, SPARQL & Serializations
https://jena.apache.org/documentation/io/

## Digest of RIOT

# Document Digest

Content retrieved: 2024-06-30
Data Size: 1542531 bytes

# Supported RDF Formats

List of formats supported by RIOT with canonical file extensions and parser/writer registration names:

- Turtle (.ttl)           — Lang.TURTLE
- JSON-LD (.jsonld)       — Lang.JSONLD
- N-Triples (.nt)         — Lang.NTRIPLES
- N-Quads (.nq)           — Lang.NQUADS
- TriG (.trig)            — Lang.TRIG
- RDF/XML (.rdf, .owl)    — Lang.RDFXML
- TriX (.trix)            — Lang.TRIX
- RDF/JSON (.rj)          — Lang.RDFJSON
- RDF Thrift (.trdf, .rt) — Lang.RDFTHRIFT
- RDF Protobuf (.rpb, .pbrdf) — Lang.RDFPROTOBUF
- RDF Binary (binary encoding) — Lang.RDFCB

# Command Line Tools

The following executables drive the RIOT engines in the riotcmd package.

## Commands

- riot      — auto-detect input syntax from file extensions or stdin
- turtle    — force Turtle input
- ntriples  — force N-Triples input
- nquads    — force N-Quads input
- trig      — force TriG input
- rdfxml    — force RDF/XML input

## Common Options

--syntax=NAME           Explicit input syntax (override extension)
--validate              Equivalent to --strict --sink --check=true
--check=true|false      Enable literal/IRI validation (default=false)
--time                  Print parse and write timing
--sink                  Drop all output (use for validation)
--output=FORMAT         Write in given syntax (STREAMING if supported)
--formatted=FORMAT      Write with pretty-printing
--stream=FORMAT         Write in streaming mode where available

# Syntax Recognition and Compression Handling

- File extensions are mapped to formats by the inner extension before .gz or .bz2.
- Supported compression: GZip and BZip2.  Other formats must be piped via external tools (e.g. zstd -d < file.zst | riot).

# Java API for RIOT

## Core Classes and Builder Patterns

### RDFParser (org.apache.jena.riot.RDFParser)

- Builder create()
- Builder source(String url)
- Builder source(InputStream in)
- Builder lang(Lang lang)
- Builder base(String baseURI)
- Builder errorHandler(RiotErrorHandler handler)
- void parse(Model model)
- void parse(StreamRDF dest)

### RDFWriter (org.apache.jena.riot.RDFWriter)

- Builder create()
- Builder source(Model model)
- Builder source(DatasetGraph dsg)
- Builder lang(Lang lang)
- Builder base(String baseURI)
- Builder prefixMapping(PrefixMap prefixMap)
- void output(OutputStream out)
- void output(Writer w)



## Attribution
- Source: RDF Data Access, SPARQL & Serializations
- URL: https://jena.apache.org/documentation/io/
- License: License if known
- Crawl Date: 2025-04-29T06:53:10.101Z
- Data Size: 1542531 bytes
- Links Found: 3487

## Retrieved
2025-04-29
library/CONTEXT.md
# library/CONTEXT.md
# CONTEXT

## Crawl Summary
Context definitions: @context supports object, array, IRI. Term definitions accept keys @id, @type, @container, @language, @direction, @context, @prefix, @protected, @nest, @version. Default mappings: @vocab, @base. Processing mode locked to numeric 1.1. Context merge order: array sequence then nested contexts. Terms mapped to IRIs via resolution against base or via prefix mappings. Container directives define list, set, index, id, type, language, graph behavior. Keyword aliasing controlled by @prefix boolean. Embedded contexts propagate only after term definitions. Null resets definitions.

## Normalised Extract
Table of Contents:
1 Context Entry Forms
2 Term Definition Keys
3 Base and Vocabulary Mapping
4 Language and Direction Control
5 Container Mappings
6 Keyword Aliasing
7 Processing Mode Enforcement
8 Context Merge Algorithm

1 Context Entry Forms
 object: map of term names → term definition or embedded context
 array: ordered list of context entries processed sequentially
 IRI: load external context document; same processing rules apply

2 Term Definition Keys
 key: @id
  value: IRI or null; null removes mapping; relative IRIs resolved against @base
 key: @type
  value: IRI or keyword @id or @vocab or null; defines datatype coercion or node type expansion
 key: @container
  value: @list,@set,@index,@id,@type,@language,@graph or null; instructs container processing
 key: @language
  value: BCP47 tag or null; default language for simple strings
 key: @direction
  value: 'ltr','rtl',null; default text direction for strings
 key: @context
  value: object,array,IRI; nested context applied after term mapping
 key: @prefix
  value: boolean; true allows term used as prefix in compact IRI
 key: @protected
  value: boolean; true prevents term redefinition
 key: @nest
  value: keyword or term; enables property nesting in compact/expand
 key: @version
  value: numeric 1.1; required to activate JSON-LD 1.1 features

3 Base and Vocabulary Mapping
 @base: IRI or null; resolves relative IRI references
 @vocab: IRI or null; default namespace for terms without prefix

4 Language and Direction Control
 @language in context: sets default language tag for value objects
 @direction in context: sets default direction for string values

5 Container Mappings
 list: map value to array preserving order
 set: map value to unordered array, duplicate removal
 id: index node objects by their @id
 type: index by @type values
 language: group values by language tag
 graph: index by graph name

6 Keyword Aliasing
 prefix true: term expansion when suffix present; prevents reserved word usage
 protected true: term cannot be overridden by nested contexts

7 Processing Mode Enforcement
 context @version must be numeric 1.1; non-numeric or mismatched values cause error

8 Context Merge Algorithm
 sequential processing: base context, array contexts, nested contexts
 for each term definition: validate keys, resolve IRIs, assign mappings, apply overrides unless protected

## Supplementary Details
Term Key Specifications:
- @id: must match RFC3987 IRI grammar or be null. Relative IRIs resolved via @base. Null removes mapping.
- @type: allowed values: full IRI, '@id','@vocab', or null. Sets type coercion for value objects or type mapping for node objects.
- @container: must be one of '@list','@set','@index','@id','@type','@language','@graph'. Defines container behavior in expansion/compaction.
- @language: BCP47 syntax; processors must lowercase language subtags.
- @direction: exact string 'ltr','rtl' or null; processors must enforce Unicode BiDi.
- @context: object, array, or IRI. When object, recursively processed after parent context; when IRI, document loaded synchronously before evaluation.
- @prefix: boolean true/false. True indicates term can act as IRI prefix in compact IRIs.
- @protected: boolean. True prevents further overriding of term definition; error on redefinition.
- @nest: single term name or '@nest' alias. Allows nested property expansion.
- @version: numeric literal 1.1 only. JSON-LD 1.0 processors must error on numeric.

Configuration Options:
- contexts can be merged: later definitions override earlier ones unless @protected.
- default mappings: @base and @vocab may be null to disable.
- container mapping default: none; absence means simple property mapping.

Implementation Steps:
1. Initialize active context with base @base and @vocab entries if present.
2. For each context in @context array: load and expand.
3. Validate @version; reject if not exactly 1.1 numeric.
4. Process term definitions: validate keys; resolve IRI values; create term-to-IRI, container and type maps.
5. Apply nested contexts after parent term definitions.
6. Freeze protected term definitions; subsequent overrides cause errors.


## Reference Details
Grammar for @context (EBNF):

Context      ::= ObjectContext | ArrayContext | IRIReference
ArrayContext ::= '[' Context (',' Context)* ']'
ObjectContext ::= '{' (ContextEntry (',' ContextEntry)*)? '}'
ContextEntry ::= TermName ':' (IRIReference | 'null' | TermDefinitionObject)
TermDefinitionObject ::= '{' (TermKey ':' TermValue) (',' TermKey ':' TermValue)* '}'
TermKey      ::= '@id' | '@type' | '@container' | '@language' | '@direction' | '@context' | '@prefix' | '@protected' | '@nest' | '@version'
TermValue    ::= IRIReference | String | Boolean | Number | 'null' | Array
String values: BCP47 for @language; 'ltr'/'rtl' for @direction; specific keywords for @container; exactly 1.1 numeric for @version
IRIReference: absolute or relative IRI per RFC3987; relative resolved against active @base
Boolean: 'true' or 'false'
Number: JSON number (no quotes)

Processing Algorithm Outline:
1. If context is array, for each entry in order apply steps 2-5
2. If context is IRI, fetch and parse external document as JSON; treat result as object context
3. If context is object, for each ContextEntry:
   a. TermName must not be keyword unless reserved mapping
   b. If TermValue is string: set termDefinition.@id = expand IRI
   c. If TermValue is null: remove term from active context
   d. If TermValue is object: for each TermKey, assign termDefinition property with TermValue after resolution
4. Enforce @protected: skip redefinitions if protected true, else error
5. After all entries, set active context.termMap[TermName] to termDefinition

Error Conditions:
- @version not numeric 1.1
- Unsupported TermKey values
- IRIReference invalid syntax
- Redefinition of protected term

Example Implementation Pattern (JavaScript pseudocode):

function processContext(activeContext, contextValue) {
  if (Array.isArray(contextValue)) {
    contextValue.forEach(ctx => processContext(activeContext, ctx)); return;
  }
  if (typeof contextValue === 'string') {
    let external = fetchContext(contextValue); processContext(activeContext, external['@context']); return;
  }
  Object.entries(contextValue).forEach(([term, definition]) => {
    let defObj = {};
    if (definition === null) { delete activeContext[term]; return; }
    if (typeof definition === 'string') { defObj['@id'] = expandIri(definition, activeContext.base); }
    else { Object.entries(definition).forEach(([k,v]) => {
        switch(k) {
          case '@id': defObj['@id'] = v===null?null:expandIri(v,activeContext.base); break;
          case '@type': defObj['@type'] = resolveType(v,activeContext); break;
          case '@container': defObj['@container'] = v; break;
          case '@language': defObj['@language'] = v; break;
          case '@direction': defObj['@direction'] = v; break;
          case '@context': defObj['@context'] = v; break;
          case '@prefix': defObj['@prefix'] = v; break;
          case '@protected': defObj['@protected'] = v; break;
          case '@nest': defObj['@nest'] = v; break;
          case '@version': if(v!==1.1) throw Error('Invalid version'); break;
        }
      });
    }
    if(activeContext[term]?.['@protected']) throw Error('Protected term');
    activeContext[term] = defObj;
  });
}

## Information Dense Extract
@context supports object,array,IRI. Term definitions with keys: @id (IRI|null), @type (IRI|@id|@vocab|null), @container(@list|@set|@index|@id|@type|@language|@graph), @language(BCP47|null), @direction(ltr|rtl|null), @context(object|array|IRI), @prefix(boolean), @protected(boolean), @nest(term), @version(1.1). Default mapping: @base (IRI|null), @vocab(IRI|null). Processing: merge contexts sequentially, resolve relative IRIs per @base, enforce @version numeric 1.1, assign term-to-IRI and container maps, freeze protected terms, error on invalid grammar or protected override.

## Sanitised Extract
Table of Contents:
1 Context Entry Forms
2 Term Definition Keys
3 Base and Vocabulary Mapping
4 Language and Direction Control
5 Container Mappings
6 Keyword Aliasing
7 Processing Mode Enforcement
8 Context Merge Algorithm

1 Context Entry Forms
 object: map of term names  term definition or embedded context
 array: ordered list of context entries processed sequentially
 IRI: load external context document; same processing rules apply

2 Term Definition Keys
 key: @id
  value: IRI or null; null removes mapping; relative IRIs resolved against @base
 key: @type
  value: IRI or keyword @id or @vocab or null; defines datatype coercion or node type expansion
 key: @container
  value: @list,@set,@index,@id,@type,@language,@graph or null; instructs container processing
 key: @language
  value: BCP47 tag or null; default language for simple strings
 key: @direction
  value: 'ltr','rtl',null; default text direction for strings
 key: @context
  value: object,array,IRI; nested context applied after term mapping
 key: @prefix
  value: boolean; true allows term used as prefix in compact IRI
 key: @protected
  value: boolean; true prevents term redefinition
 key: @nest
  value: keyword or term; enables property nesting in compact/expand
 key: @version
  value: numeric 1.1; required to activate JSON-LD 1.1 features

3 Base and Vocabulary Mapping
 @base: IRI or null; resolves relative IRI references
 @vocab: IRI or null; default namespace for terms without prefix

4 Language and Direction Control
 @language in context: sets default language tag for value objects
 @direction in context: sets default direction for string values

5 Container Mappings
 list: map value to array preserving order
 set: map value to unordered array, duplicate removal
 id: index node objects by their @id
 type: index by @type values
 language: group values by language tag
 graph: index by graph name

6 Keyword Aliasing
 prefix true: term expansion when suffix present; prevents reserved word usage
 protected true: term cannot be overridden by nested contexts

7 Processing Mode Enforcement
 context @version must be numeric 1.1; non-numeric or mismatched values cause error

8 Context Merge Algorithm
 sequential processing: base context, array contexts, nested contexts
 for each term definition: validate keys, resolve IRIs, assign mappings, apply overrides unless protected

## Original Source
JSON-LD 1.1: A JSON-Based Serialization for Linked Data
https://www.w3.org/TR/json-ld11/

## Digest of CONTEXT

# Context Declaration Syntax  
Date Retrieved: 2024-06-15  
Source: W3C JSON-LD 1.1 Recommendation  
Data Size: 18953569 bytes

## 1. @context Entry Forms  
- Object: map of term names to term definitions or nested contexts  
- Array: ordered list of contexts (object or IRI)  
- IRI: reference to external context document

## 2. Term Definition Object Keys  
- @id: IRI or null  
- @type: IRI, @id, @vocab, or null  
- @container: one of @list, @set, @index, @id, @type, @language, @graph, or null  
- @language: BCP47 language code or null  
- @direction: "ltr", "rtl", or null  
- @context: embedded context (object, array, or IRI)  
- @prefix: boolean  
- @protected: boolean  
- @nest: keyword or term name  
- @version: number (must equal 1.1)

## 3. Context Processing Steps  
1. Merge contexts in array order  
2. For each term definition: resolve @id against base IRI if relative  
3. Apply @container mapping to term  
4. Validate reserved keys and values  
5. Build active context with term-to-IRI and container maps

## 4. Configuration Details  
- Default vocab mapping (@vocab): IRI or null  
- Base IRI (@base): IRI or null  
- Processing mode (@version in context): numeric 1.1 only  
- Keyword aliasing: @prefix true allows term expansion only when suffix follows colon

## 5. Example Context  
```json
{
  "@context": {
    "name": "http://schema.org/name",
    "ex": "http://example.org/vocab#",
    "age": { "@id": "ex:age", "@type": "http://www.w3.org/2001/XMLSchema#integer" },
    "@vocab": "http://schema.org/",
    "@language": "en",
    "@base": "http://example.org/",
    "@version": 1.1
  }
}
```

## Attribution
- Source: JSON-LD 1.1: A JSON-Based Serialization for Linked Data
- URL: https://www.w3.org/TR/json-ld11/
- License: License
- Crawl Date: 2025-04-26T18:49:17.024Z
- Data Size: 18953569 bytes
- Links Found: 133857

## Retrieved
2025-04-26
library/RDF4J_MODEL.md
# library/RDF4J_MODEL.md
# RDF4J_MODEL

## Crawl Summary
Model interface extends Set<Statement> with add, remove, filter methods. Value factory methods: iri, literal(type or lang), bnode. ModelBuilder fluent API: setNamespace, subject, add overloads, build. Rio parser/writer: Rio.write(model, out, format), Rio.parse(in, baseURI, format). Supported formats: RDFXML, TURTLE, NTRIPLES, JSON-LD. Core model implementations: TreeModel, DynamicModel, LinkedHashModel. Blank nodes via Values.bnode().

## Normalised Extract
Table of Contents
1. Value Factory
2. Model Implementations
3. ModelBuilder
4. Rio Parser/Writer
5. Blank Nodes

1. Value Factory
   IRI subject = Values.iri(namespace, localName)
   Literal simple = Values.literal(label)
   Literal typed = Values.literal(label, XSD.DATATYPE)
   Literal langged = Values.literal(label, languageTag)
   BNode bnode = Values.bnode()
2. Model Implementations
   Model model = new TreeModel() // or DynamicModel, LinkedHashModel
   model.add(subject, predicate, object)
   model.remove(subject, predicate, object)
   model.filter(subject, predicate, object) returns Model
   model.forEach(statementConsumer)
3. ModelBuilder
   ModelBuilder builder = new ModelBuilder()
   builder.setNamespace(prefix, namespace)
          .subject(prefixedSubject)
          .add(prefixedPredicate, objectValue)
   Model model = builder.build()
4. Rio Parser/Writer
   Rio.write(model, OutputStream, RDFFormat.TURTLE)
   Rio.parse(InputStream, baseURI, RDFFormat.RDFXML) returns Model
5. Blank Nodes
   BNode anon = Values.bnode()
   builder.subject(mainResource)
          .add(prefixedPredicate, anon)
          .subject(anon)
          .add(prefixedProperty, value)


## Supplementary Details
Maven BOM configuration
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.eclipse.rdf4j</groupId>
      <artifactId>rdf4j-bom</artifactId>
      <version>5.1.3</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
Full storage dependency
<dependency>
  <groupId>org.eclipse.rdf4j</groupId>
  <artifactId>rdf4j-storage</artifactId>
  <type>pom</type>
</dependency>
Snapshot builds
<repository>
  <id>oss.sonatype.org-snapshot</id>
  <url>https://oss.sonatype.org/content/repositories/snapshots</url>
  <releases><enabled>false</enabled></releases>
  <snapshots><enabled>true</enabled></snapshots>
</repository>

Configuration options
- RDFFormat constants control parser/writer syntax
- Model implementations choose internal indexing and ordering
- Namespace prefixes via ModelBuilder.setNamespace

Implementation steps
1. Instantiate ModelBuilder or concrete Model
2. Create IRIs and Literals via Values
3. Add statements
4. Write or parse via Rio



## Reference Details
API Specifications

org.eclipse.rdf4j.model.Model (extends Set<Statement>)
Methods:
  boolean add(IRI subject, IRI predicate, Value object)
  boolean remove(Resource subject, IRI predicate, Value object)
  Model filter(Resource s, IRI p, Value o)
  void forEach(Consumer<Statement> consumer)

org.eclipse.rdf4j.model.util.ModelBuilder
Constructors:
  ModelBuilder()
Methods:
  ModelBuilder setNamespace(String prefix, String namespace)
  ModelBuilder subject(String prefixedName)
  ModelBuilder subject(IRI subjectIRI)
  ModelBuilder add(IRI predicate, Value object)
  ModelBuilder add(String prefixedPredicate, String objectLabel)
  ModelBuilder add(String prefixedPredicate, int objectValue)
  ModelBuilder add(String prefixedPredicate, LocalDate dateValue)
  Model build()

org.eclipse.rdf4j.model.Values
Methods:
  static IRI iri(String namespace, String localName)
  static Literal literal(String label)
  static Literal literal(String label, IRI datatype)
  static Literal literal(String label, String languageTag)
  static BNode bnode()

org.eclipse.rdf4j.rio.Rio
Methods:
  static void write(Model model, OutputStream out, RDFFormat format)
  static void write(Model model, Writer writer, RDFFormat format)
  static Model parse(InputStream in, String baseURI, RDFFormat format)
  static Model parse(Reader reader, String baseURI, RDFFormat format)

Code Examples

// Create model via builder
ModelBuilder builder = new ModelBuilder();
builder.setNamespace("ex", "http://example.org/")
       .subject("ex:Picasso")
       .add(RDF.TYPE, "ex:Artist")
       .add(FOAF.FIRST_NAME, "Pablo");
Model model = builder.build();

// Write as Turtle
try(OutputStream out = new FileOutputStream("output.ttl")){
  Rio.write(model, out, RDFFormat.TURTLE);
}

// Read from RDF/XML
Model parsed;
try(InputStream in = new FileInputStream("input.rdf")){
  parsed = Rio.parse(in, "", RDFFormat.RDFXML);
}

Best Practices
- Use ModelBuilder for small to medium construction, switch to direct Model for very large data
- Choose TreeModel for stable iteration order
- Always set namespace prefixes for readability
- Use typed and language-tagged literals via Values.literal overloads

Troubleshooting
Command: mvn dependency:tree
Expected: org.eclipse.rdf4j:rdf4j-bom:5.1.3
Fix missing BOM by adding dependencyManagement

Command: java -cp rdf4j-storage-5.1.3.jar org.eclipse.rdf4j.rio.RDFFormat
Expected: List of supported formats including TURTLE, RDFXML


## Information Dense Extract
Model: extends Set<Statement>; implementations: TreeModel, DynamicModel, LinkedHashModel. Methods: add(IRI,IRI,Value), remove(Resource,IRI,Value), filter(Resource,IRI,Value)->Model, forEach(Consumer). ModelBuilder: fluent API: setNamespace(prefix,ns), subject(prefixedName), add(predicate,Object) overloads for IRI, prefixedName with String, int, LocalDate; build()->Model. Values: iri(ns,local), literal(label), literal(label,datatypeIRI), literal(label,langTag), bnode(). Rio: write(Model,out/Writer,RDFFormat), parse(InputStream/Reader,baseURI,RDFFormat)->Model. Supported RDFFormat: RDFXML,TURTLE,NTRIPLES,NQUADS,TRIG,JSONLD. Maven BOM: org.eclipse.rdf4j:rdf4j-bom:5.1.3 type=pom scope=import; storage: rdf4j-storage:pom. Snapshot repo config. Practice: prefixed names, typed literals, blank nodes via bnode. Troubleshoot: mvn dependency:tree, check BOM; java classpath for Rio.RDFFormat outputs formats.

## Sanitised Extract
Table of Contents
1. Value Factory
2. Model Implementations
3. ModelBuilder
4. Rio Parser/Writer
5. Blank Nodes

1. Value Factory
   IRI subject = Values.iri(namespace, localName)
   Literal simple = Values.literal(label)
   Literal typed = Values.literal(label, XSD.DATATYPE)
   Literal langged = Values.literal(label, languageTag)
   BNode bnode = Values.bnode()
2. Model Implementations
   Model model = new TreeModel() // or DynamicModel, LinkedHashModel
   model.add(subject, predicate, object)
   model.remove(subject, predicate, object)
   model.filter(subject, predicate, object) returns Model
   model.forEach(statementConsumer)
3. ModelBuilder
   ModelBuilder builder = new ModelBuilder()
   builder.setNamespace(prefix, namespace)
          .subject(prefixedSubject)
          .add(prefixedPredicate, objectValue)
   Model model = builder.build()
4. Rio Parser/Writer
   Rio.write(model, OutputStream, RDFFormat.TURTLE)
   Rio.parse(InputStream, baseURI, RDFFormat.RDFXML) returns Model
5. Blank Nodes
   BNode anon = Values.bnode()
   builder.subject(mainResource)
          .add(prefixedPredicate, anon)
          .subject(anon)
          .add(prefixedProperty, value)

## Original Source
Triplestore & Persistence Engines: Apache Jena TDB2 & Eclipse RDF4J
https://rdf4j.org/documentation/

## Digest of RDF4J_MODEL

# RDF4J Model API and Rio Parsers

Retrieved: 2024-06-10
Source: https://rdf4j.org/documentation/
Data Size: 3188175 bytes, Links Found: 7635

## Model API Implementations

### Interfaces and Classes
- interface Model extends java.util.Set<Statement>
- TreeModel implements Model (ordered, optimized for iteration)
- DynamicModel implements Model (adaptive indexing)
- LinkedHashModel implements Model (insertion-ordered)

### Core Methods
- Model.add(IRI subject, IRI predicate, Value object)
- Model.remove(IRI subject, IRI predicate, Value object)
- Model.filter(IRI subject, IRI predicate, Value object) : Model
- Model.forEach(Consumer<Statement>)

## Value Factory

### Class: org.eclipse.rdf4j.model.Values

public static IRI iri(String namespace, String localName)
public static Literal literal(String label)
public static Literal literal(String label, IRI datatype)
public static Literal literal(String label, String languageTag)
public static BNode bnode()

## ModelBuilder

### Class: org.eclipse.rdf4j.model.util.ModelBuilder

ModelBuilder setNamespace(String prefix, String namespace)
ModelBuilder subject(String subjectIRI)
ModelBuilder add(IRI predicate, Value object)
ModelBuilder add(String predicatePrefixedName, String objectLabel)
ModelBuilder add(String predicatePrefixedName, int objectValue)
ModelBuilder add(String predicatePrefixedName, LocalDate dateValue)
Model build()

## Rio Parser and Writer

### Class: org.eclipse.rdf4j.rio.Rio

static void write(Model model, OutputStream out, RDFFormat format)
static void write(Model model, Writer writer, RDFFormat format)
static Model parse(InputStream in, String baseURI, RDFFormat format)
static Model parse(Reader reader, String baseURI, RDFFormat format)

Supported RDFFormat constants: RDFXML, TURTLE, NTRIPLES, NQUADS, TRIG, JSONLD

## Blank Nodes

- BNode address = Values.bnode();
- Link blank node via subject(address) in ModelBuilder



## Attribution
- Source: Triplestore & Persistence Engines: Apache Jena TDB2 & Eclipse RDF4J
- URL: https://rdf4j.org/documentation/
- License: License if known
- Crawl Date: 2025-04-29T10:52:17.367Z
- Data Size: 3188175 bytes
- Links Found: 7635

## Retrieved
2025-04-29
library/SCHEMA_VOCABULARY.md
# library/SCHEMA_VOCABULARY.md
# SCHEMA_VOCABULARY

## Crawl Summary
schema.org defines two hierarchies: types and data types. Class IRIs use https://schema.org/{ClassName}. Main classes include Thing, Action, CreativeWork. Data types include Text, URL, Number, Date, DateTime, Boolean. JSON-LD context at https://schema.org/docs/jsonldcontext.jsonld. Serialized vocabularies at /schema.jsonld, /schema.ttl, /schema.rdf. Use HTTP Accept for content negotiation.

## Normalised Extract
Table of Contents:
1. Class IRIs
2. Class Hierarchy
3. Data Types
4. JSON-LD Context and Files
5. Content Negotiation
6. Embedding in HTML

1. Class IRIs
Definition: Each class IRI is https://schema.org/{ClassName}
Examples:
Thing              : https://schema.org/Thing
Action             : https://schema.org/Action
AchieveAction      : https://schema.org/AchieveAction
LoseAction         : https://schema.org/LoseAction
ReviewAction       : https://schema.org/ReviewAction
CreativeWork       : https://schema.org/CreativeWork
Article            : https://schema.org/Article
NewsArticle        : https://schema.org/NewsArticle
TechArticle        : https://schema.org/TechArticle
Product            : https://schema.org/Product
Event              : https://schema.org/Event
Person             : https://schema.org/Person
Organization       : https://schema.org/Organization
Place              : https://schema.org/Place

2. Class Hierarchy
Format: Class : SuperType
Action           : Thing
AchieveAction    : Action
ReviewAction     : Action
CreativeWork     : Thing
Article          : CreativeWork
NewsArticle      : Article
TechArticle      : Article
Product          : Thing
Event            : Thing
Person           : Thing
Organization     : Thing
Place            : Thing

3. Data Types
Text     : https://schema.org/Text
URL      : https://schema.org/URL
Number   : https://schema.org/Number
Date     : https://schema.org/Date
DateTime : https://schema.org/DateTime
Boolean  : https://schema.org/Boolean

4. JSON-LD Context and Files
Context           : https://schema.org/docs/jsonldcontext.jsonld
JSON-LD vocabulary: https://schema.org/version/latest/schema.jsonld
Turtle vocabulary : https://schema.org/version/latest/schema.ttl
RDF/XML vocabulary: https://schema.org/version/latest/schema.rdf

5. Content Negotiation
Endpoint: GET https://schema.org/version/latest/schema
Headers:
  Accept: application/ld+json
  Accept: text/turtle
  Accept: application/rdf+xml

6. Embedding in HTML
Use <script type="application/ld+json"> with JSON-LD object:
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Example Title"
}


## Supplementary Details
Hosted Versions: current development version at https://schema.org
Download mirror: https://schema.org/version/latest
Serializations: application/ld+json, text/turtle, application/rdf+xml
Default JSON-LD MIME: application/ld+json
HTTP Status Codes: 200 OK on success; 406 Not Acceptable if unsupported Accept header
Validation: use https://validator.schema.org/ or CLI via curl

Implementation Steps:
1. Identify required schema classes, note IRIs
2. Fetch context and vocabulary via HTTP GET with appropriate Accept header
3. Embed JSON-LD in HTML, include @context and @type
4. Validate markup

Configuration Options: none for client; choose Accept header; define local cache of vocabulary

## Reference Details
1. HTTP API Endpoints
GET https://schema.org/version/latest/schema.jsonld
  Response: 200 OK; Content-Type: application/ld+json
GET https://schema.org/version/latest/schema.ttl
  Response: 200 OK; Content-Type: text/turtle
GET https://schema.org/version/latest/schema.rdf
  Response: 200 OK; Content-Type: application/rdf+xml

2. Embedding Pattern
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Widget",
  "offers": {
    "@type": "Offer",
    "price": 19.99,
    "priceCurrency": "USD"
  }
}
</script>

3. JSON-LD SDK Example (Node.js)
import {compact, expand} from 'jsonld';

const doc = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Concert",
  "startDate": "2023-01-01T20:00:00"
};

compact(doc, doc['@context']).then(console.log);
expand(doc).then(console.log);

4. Best Practices
- Root JSON-LD object must include @context
- Use full IRIs for custom extensions
- Cache context locally to reduce HTTP overhead
- Validate with official validator after changes

5. Troubleshooting
Command:
  curl -I -H "Accept: text/turtle" https://schema.org/version/latest/schema.ttl
Expected Response Headers:
  HTTP/2 200
  content-type: text/turtle; charset=utf-8
If 406 received, ensure Accept matches supported serializations

## Information Dense Extract
Classes: IRIs at https://schema.org/{ClassName}. Key classes: Thing, Action>Thing, CreativeWork>Thing, Event>Thing, Product>Thing. Data types: Text, URL, Number, Date, DateTime, Boolean. Context: https://schema.org/docs/jsonldcontext.jsonld. Files: /schema.jsonld, /schema.ttl, /schema.rdf. Content negotiation via Accept: application/ld+json, text/turtle, application/rdf+xml. Embed JSON-LD: <script type=application/ld+json>{"@context":"https://schema.org","@type":"Article","headline":"..."}</script>. Validate with validator.schema.org. HTTP endpoints return 200 OK with matching Content-Type.

## Sanitised Extract
Table of Contents:
1. Class IRIs
2. Class Hierarchy
3. Data Types
4. JSON-LD Context and Files
5. Content Negotiation
6. Embedding in HTML

1. Class IRIs
Definition: Each class IRI is https://schema.org/{ClassName}
Examples:
Thing              : https://schema.org/Thing
Action             : https://schema.org/Action
AchieveAction      : https://schema.org/AchieveAction
LoseAction         : https://schema.org/LoseAction
ReviewAction       : https://schema.org/ReviewAction
CreativeWork       : https://schema.org/CreativeWork
Article            : https://schema.org/Article
NewsArticle        : https://schema.org/NewsArticle
TechArticle        : https://schema.org/TechArticle
Product            : https://schema.org/Product
Event              : https://schema.org/Event
Person             : https://schema.org/Person
Organization       : https://schema.org/Organization
Place              : https://schema.org/Place

2. Class Hierarchy
Format: Class : SuperType
Action           : Thing
AchieveAction    : Action
ReviewAction     : Action
CreativeWork     : Thing
Article          : CreativeWork
NewsArticle      : Article
TechArticle      : Article
Product          : Thing
Event            : Thing
Person           : Thing
Organization     : Thing
Place            : Thing

3. Data Types
Text     : https://schema.org/Text
URL      : https://schema.org/URL
Number   : https://schema.org/Number
Date     : https://schema.org/Date
DateTime : https://schema.org/DateTime
Boolean  : https://schema.org/Boolean

4. JSON-LD Context and Files
Context           : https://schema.org/docs/jsonldcontext.jsonld
JSON-LD vocabulary: https://schema.org/version/latest/schema.jsonld
Turtle vocabulary : https://schema.org/version/latest/schema.ttl
RDF/XML vocabulary: https://schema.org/version/latest/schema.rdf

5. Content Negotiation
Endpoint: GET https://schema.org/version/latest/schema
Headers:
  Accept: application/ld+json
  Accept: text/turtle
  Accept: application/rdf+xml

6. Embedding in HTML
Use <script type='application/ld+json'> with JSON-LD object:
{
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Example Title'
}

## Original Source
Schema.org Vocabulary
https://schema.org/docs/full.html

## Digest of SCHEMA_VOCABULARY

# Schema Vocabulary

## Class IRIs

All schema.org classes are identified by IRIs of the form https://schema.org/{ClassName}. Example: https://schema.org/Thing, https://schema.org/Action.

## Parent-Child Hierarchy

The main schema.org hierarchy organizes classes in a tree. Each class includes its direct super-type. Example: Action > Thing, AchieveAction > Action.

## Data Types

The parallel hierarchy for data types defines IRIs: https://schema.org/Text, https://schema.org/URL, https://schema.org/Number, https://schema.org/Date, https://schema.org/DateTime, https://schema.org/Boolean.

## JSON-LD Context and Hosted Files

The JSON-LD context is available at https://schema.org/docs/jsonldcontext.jsonld. Hosted vocabularies in JSON-LD, Turtle, RDF/XML at:

- https://schema.org/version/latest/schema.jsonld
- https://schema.org/version/latest/schema.ttl
- https://schema.org/version/latest/schema.rdf

## Content Negotiation

Clients retrieve definitions by sending HTTP GET with Accept headers:

- Accept: application/ld+json
- Accept: text/turtle
- Accept: application/rdf+xml

## Embedding in HTML

Embed JSON-LD in HTML using <script type="application/ld+json">…</script> with @context and @type at the root.



## Attribution
- Source: Schema.org Vocabulary
- URL: https://schema.org/docs/full.html
- License: License if known
- Crawl Date: 2025-04-28T16:52:16.004Z
- Data Size: 18858359 bytes
- Links Found: 58987

## Retrieved
2025-04-28
library/RDF_SYNTAX.md
# library/RDF_SYNTAX.md
# RDF_SYNTAX

## Crawl Summary
Triples: (subject: IRI|BN, predicate: IRI, object: IRI|Literal|BN). Graph = set of triples. Dataset = default graph + zero+ named graphs. Terms: IRIs must be absolute, RFC3987, simple string equality, normalization guidelines. Literals: lexical form, datatype IRI, optional language tag. Blank nodes: local scope, use Skolem IRIs (.well-known/genid/). Datatypes: supported XSD built-ins + rdf:HTML + rdf:XMLLiteral. Graph isomorphism: bijection on nodes preserving structure. Dataset isomorphism: extends graph iso to named graphs.

## Normalised Extract
Table of Contents
1 RDF Triple Structure
2 RDF Graph Definition
3 RDF Dataset Composition
4 IRI Syntax and Normalization
5 Literal Structure and Value Mapping
6 Blank Node Handling and Skolemization
7 Datatype Recognition
8 Graph/Dataset Isomorphism

1 RDF Triple Structure
subject: IRI or BN; predicate: IRI; object: IRI, Literal, or BN

2 RDF Graph Definition
graph G = set of triples {(s,p,o),...}
nodes(G) = ∪ subjects ∪ objects

3 RDF Dataset Composition
dataset D = { default: Gdefault, named: { (name_i, G_i) } }
name_i = IRI or BN

4 IRI Syntax and Normalization
IRI ::= absolute Unicode string per RFC3987
contains optional fragment. equality: simple string eq
Normalization rules:
  - lower-case scheme/host
  - omit default port
  - avoid /./ and /../
  - NFC unicode
  - minimal percent-encoding

5 Literal Structure and Value Mapping
Literal ::= (lexicalForm, datatypeIRI, [langTag])
lexicalForm ∈ Unicode NFC
datatypeIRI ∈ recognized IRIs
if datatypeIRI = rdf:langString then langTag ∈ BCP47
lexical-to-value: apply datatype-specific mapping; ill-typed literals accepted

6 Blank Node Handling and Skolemization
Blank Node: unlabeled term, local scope
Skolem IRI: https://<auth>/.well-known/genid/<unique>
System MUST mint globally unique Skolem IRIs

7 Datatype Recognition
recognized IRI list:
  - XSD built-ins: xsd:string, xsd:integer, xsd:decimal, xsd:boolean, xsd:dateTime, etc.
  - rdf:HTML
  - rdf:XMLLiteral

8 Graph/Dataset Isomorphism
Graph iso: bijection M on nodes
  M maps IRIs and literals to themselves
  M maps BNs bijectively
  triples preserved: G’ = { (M(s),p,M(o)) }
Dataset iso extends graph iso + preserves graph names


## Supplementary Details
IRI resolution follows RFC3986 base IRI resolution. Relative IRIs in concrete syntaxes resolved against provided base. Implementations SHOULD support parsing IRIs, normalizing to NFC, percent-encode necessary chars. Literal lexical-to-value mapping for XSD datatypes per XML Schema Part2. Implementations recognize ill-typed literals, raise warnings. Blank node Skolemization: generate UUID per BN, prepend well-known path. Ensure Skolem IRI uniqueness. RDF dataset parsing: treat default graph if no named graphs. Implementations SHOULD accept BN graph names but warn for SPARQL compatibility. Graph iso checks: use hash-based node mapping, preserve triple multiset.

## Reference Details
API: rdflib.Graph.add(subject:Term, predicate:Term, object:Term) -> None
rdflib.Graph.triples((subject, predicate, object)) -> Iterator[Triple]
rdflib.Graph.serialize(format:str='turtle', base:str=None) -> str
rdflib.Dataset.default_context: Graph
rdflib.Dataset.contexts() -> Iterator[Graph]

Method Signatures (Python rdflib example):
class Graph:
  def add(self, triple: Tuple[Term,Term,Term]) -> None:
    """Add triple to graph. triple: (s,p,o)"""
  def triples(self, pattern: Tuple[Optional[Term],Optional[Term],Optional[Term]]) -> Iterator[Tuple[Term,Term,Term]]:
    """Return triples matching pattern."""
  def serialize(self, destination:Union[str,IO]=None, format:str='turtle', base:Optional[str]=None) -> Union[str,bytes]:
    """Serialize graph."
class Dataset:
  default_context: Graph
  def add_graph(self, graph:Graph, name:Optional[Term]=None) -> None
  def remove_graph(self, name:Term) -> None

Configuration Options:
parse: format: one of 'turtle', 'trig', 'nquads', 'json-ld'; base: str
serialize: format: same; encoding: 'utf-8'

Best Practices:
- Normalize IRIs before use
- Use Skolem IRIs for BN when merging datasets
- Reject non-absolute IRIs at parse time
- Log warnings on ill-typed literals
- Use named graphs for provenance tracking

Troubleshooting:
Command: rdfpipe --parse turtle --serialize n-quads input.ttl > output.nq
Expected: valid N-Quads; errors printed to stderr for malformed IRIs/literals
Error: Non-absolute IRI => exit code 1 with message "IRI must be absolute:<value>"



## Information Dense Extract
Triple = (s:IRI|BN, p:IRI, o:IRI|Literal|BN); Graph = set<Triple>; Dataset={ default:G, named:Set<(name:IRI|BN,G)> }; IRI: RFC3987 absolute str, simple-string equality, normalize lowercase scheme/host, remove default port, avoid ./. ../, NFC unicode, minimal percent-encoding; Literal=(lexForm:UnicodeNFC, datatypeIRI, lang?); if datatypeIRI=rdf:langString then lang∈BCP47; lexical-to-value per XSD mapping; ill-typed accepted; BN local id, Skolemize->https://<auth>/.well-known/genid/<uuid>; Recognized datatypes: XSD#string,integer,decimal,boolean,dateTime,... + rdf:HTML + rdf:XMLLiteral; Graph iso: bij M(BN↔BN, IRI/lit id, preserve triples); Dataset iso extends graph iso to named graphs; rdflib.Graph.add((s,p,o)); .triples((s,p,o)); .serialize(fmt,base); Dataset.default_context; .add_graph(graph,name); parse formats=['turtle','trig','nquads','json-ld'] base:str; serialize encoding=utf-8; best practices: normalize IRIs, Skolemize BN, reject non-absolute IRIs, log ill-typed; troubleshoot: rdfpipe parse turtle serialize n-quads input.ttl > out.nq; error on non-abs IRI exit1; warnings on ill-typed lirals.

## Sanitised Extract
Table of Contents
1 RDF Triple Structure
2 RDF Graph Definition
3 RDF Dataset Composition
4 IRI Syntax and Normalization
5 Literal Structure and Value Mapping
6 Blank Node Handling and Skolemization
7 Datatype Recognition
8 Graph/Dataset Isomorphism

1 RDF Triple Structure
subject: IRI or BN; predicate: IRI; object: IRI, Literal, or BN

2 RDF Graph Definition
graph G = set of triples {(s,p,o),...}
nodes(G) =  subjects  objects

3 RDF Dataset Composition
dataset D = { default: Gdefault, named: { (name_i, G_i) } }
name_i = IRI or BN

4 IRI Syntax and Normalization
IRI ::= absolute Unicode string per RFC3987
contains optional fragment. equality: simple string eq
Normalization rules:
  - lower-case scheme/host
  - omit default port
  - avoid /./ and /../
  - NFC unicode
  - minimal percent-encoding

5 Literal Structure and Value Mapping
Literal ::= (lexicalForm, datatypeIRI, [langTag])
lexicalForm  Unicode NFC
datatypeIRI  recognized IRIs
if datatypeIRI = rdf:langString then langTag  BCP47
lexical-to-value: apply datatype-specific mapping; ill-typed literals accepted

6 Blank Node Handling and Skolemization
Blank Node: unlabeled term, local scope
Skolem IRI: https://<auth>/.well-known/genid/<unique>
System MUST mint globally unique Skolem IRIs

7 Datatype Recognition
recognized IRI list:
  - XSD built-ins: xsd:string, xsd:integer, xsd:decimal, xsd:boolean, xsd:dateTime, etc.
  - rdf:HTML
  - rdf:XMLLiteral

8 Graph/Dataset Isomorphism
Graph iso: bijection M on nodes
  M maps IRIs and literals to themselves
  M maps BNs bijectively
  triples preserved: G = { (M(s),p,M(o)) }
Dataset iso extends graph iso + preserves graph names

## Original Source
W3C RDF 1.1 Concepts and Abstract Syntax
https://www.w3.org/TR/rdf11-concepts/

## Digest of RDF_SYNTAX

# RDF Abstract Syntax and Concepts

## 1. RDF Graphs

### Triple Structure
- RDF triple = (subject, predicate, object)
- subject: IRI or Blank Node
- predicate: IRI
- object: IRI or Literal or Blank Node

### RDF Graph
- Set of triples
- Nodes = subjects and objects

## 2. RDF Datasets

### Dataset Structure
- default graph: unnamed RDF graph
- named graphs: (graphName, RDF graph) pairs; graphName: IRI or Blank Node

## 3. RDF Terms

### IRIs
- Syntax: Unicode string conforming to RFC3987
- MUST be absolute
- equality: simple string comparison (case-sensitive)
- normalization to avoid:
  - uppercase in scheme/host
  - unnecessary percent-encoding
  - explicit default port
  - empty path
  - "/./" or "/../"
  - unnormalized NFC

### Literals
- lexical form: Unicode string (NFC)
- datatype IRI: identifies datatype
- optional language tag for rdf:langString
- simple literal = lexical form + xsd:string
- equality: lexical form, datatype IRI, language tag match

### Blank Nodes
- unlabeled resources with only local identifiers
- replaceable via Skolem IRIs: .well-known/genid/{id}

## 4. Datatypes

- Recognized datatype IRIs: xmlschema built-ins + rdf:HTML + rdf:XMLLiteral
- XML Schema Datatypes: https://www.w3.org/2001/XMLSchema#xxx

## 5. Skolemization

- Replace blank nodes with Skolem IRIs
- Use .well-known/genid/{uuid}

## 6. Graph/Dataset Comparison

### Graph Isomorphism
- bijection M on nodes
- preserves IRIs and literals
- maps triples

### Dataset Isomorphism
- bijection M on nodes, triples, graphs
- preserves named graphs and default graph



## Attribution
- Source: W3C RDF 1.1 Concepts and Abstract Syntax
- URL: https://www.w3.org/TR/rdf11-concepts/
- License: License
- Crawl Date: 2025-04-26T20:47:03.262Z
- Data Size: 40070448 bytes
- Links Found: 118691

## Retrieved
2025-04-26
library/FRAMING_API.md
# library/FRAMING_API.md
# FRAMING_API

## Crawl Summary
• JsonLdProcessor.frame(input:Object|Array, frame:Object, options:JsonLdOptions):Promise<Object|Array>
• JsonLdOptions flags: processingMode(default 'json-ld-1.1'), base, expandContext, embed(default '@once'), explicit, omitDefault, omitGraph, requireAll, ordered
• JsonLdError codes: 'invalid frame', 'invalid embed value', 'recursion limit exceeded'
• Usage: require('jsonld').frame, async/await pattern
• Key flags impact: ordered affects sorting, requireAll enforces strict property presence, omitDefault suppresses defaults


## Normalised Extract
Table of Contents
1 Framing API Overview
2 Frame Matching Options
3 JsonLdProcessor.frame signature
4 JsonLdOptions flags and defaults
5 Error codes and handling
6 Node.js framing example
7 Implementation pattern steps
8 Best practices
9 Troubleshooting steps

1 Framing API Overview
The API method frame takes an expanded JSON-LD input document and a frame document containing matching rules and returns a shaped output matching the frame.

2 Frame Matching Options
Embed flag values: @once, @last, @always, @never
explicit boolean: include only declared properties
omitDefault boolean: omit added null defaults
omitGraph boolean: omit top-level @graph when single tree
requireAll boolean: enforce all frame properties present
ordered boolean: sort arrays by IRI order

3 JsonLdProcessor.frame signature
Promise<Object|Array> frame(
  input: Object|Array,
  frame: Object,
  options?: JsonLdOptions
)

4 JsonLdOptions flags and defaults
processingMode: 'json-ld-1.1' (default) or 'json-ld-1.0'
base: string (document base IRI)
expandContext: Object
embed: '@once' (default)
explicit: false (default)
omitDefault: false (default)
omitGraph: false (default)
requireAll: false (default)
ordered: false (default)

5 Error codes and handling
JsonLdError thrown with name 'JsonLdError', code in {invalid frame, invalid embed value, recursion limit exceeded}, message.

6 Node.js framing example
Load input and frame JSON files; call jsonld.frame with options; await result; handle errors.

7 Implementation pattern steps
1 Load/parse JSON-LD input
2 Define frame with context and matching rules
3 Configure options
4 Call frame method
5 Process or log result

8 Best practices
Use ordered:false for performance
Strict matching with requireAll:true only when required
Combine explicit:true and omitDefault:true to avoid null placeholders

9 Troubleshooting steps
Run node example, check error.code and error.message; verify frame syntax and valid embed values; reduce frame depth if recursion error occurs.

## Supplementary Details
JsonLdOptions details:
processingMode: when set to 'json-ld-1.0', disables 1.1 framing features, else default 'json-ld-1.1'.
base: used to resolve relative IRIs in input and frame.
expandContext: applied before expansion to augment active context.
embed:@once embeds each referenced node only once; @last embeds last encountered; @always embeds every reference; @never emits only node references.
explicit:true prevents automatic addition of properties defined in frame but missing in input; default false adds null values or defaults.
omitDefault:true suppresses null or default placeholders; default false includes them.
omitGraph:true omits top-level @graph wrapper when only one top-level node exists; default false always uses @graph.
requireAll:true ensures that all non-flag properties in frame must appear in input node for match; default false matches any one.
ordered:true sorts arrays of node objects and values by IRI lexical order; default false preserves input order.

Implementation steps:
Fetch or read JSON-LD document
Expand input with jsonld.expand or assume expanded
Construct frame document conforming to JSON-LD framing keywords and context
Set JsonLdOptions flags to desired behavior
Call jsonld.frame(expandedInput, frame, options)
If needed, compact result with jsonld.compact or toRDF
Handle or log JsonLdError exceptions


## Reference Details
API Specifications:
interface JsonLdProcessor {
  frame(
    input: Object | Array,
    frame: Object,
    options?: JsonLdOptions
  ): Promise<Object | Array>;
}

interface JsonLdOptions {
  processingMode?: 'json-ld-1.0' | 'json-ld-1.1';
  base?: string;
  expandContext?: Object;
  embed?: '@once' | '@last' | '@always' | '@never';
  explicit?: boolean;
  omitDefault?: boolean;
  omitGraph?: boolean;
  requireAll?: boolean;
  ordered?: boolean;
}

Error Codes:
{ code: 'invalid frame', message: string }
{ code: 'invalid embed value', message: string }
{ code: 'recursion limit exceeded', message: string }

Full Implementation Example:
```js
const jsonld = require('jsonld');

const inputDocument = {
  "@context": {"@vocab": "http://example.org/", "contains": {"@type": "@id"}},
  "@graph": [ /* array of node objects */ ]
};

const frameDocument = {
  "@context": {"@vocab": "http://example.org/"},
  "@type": "Library",
  "contains": {
    "@type": "Book",
    "contains": {"@type": "Chapter"}
  }
};

const options = {
  processingMode: 'json-ld-1.1',
  base: 'http://example.org/',
  embed: '@once',
  explicit: false,
  omitDefault: false,
  omitGraph: false,
  requireAll: false,
  ordered: false
};

async function runFraming() {
  try {
    const framed = await jsonld.frame(inputDocument, frameDocument, options);
    console.log(JSON.stringify(framed, null, 2));
  } catch(err) {
    console.error('Error framing JSON-LD:', err.code, err.message);
    process.exit(1);
  }
}

runFraming();
```

Configuration Defaults:
• Embed: '@once'
• Explicit: false
• omitDefault: false
• omitGraph: false
• requireAll: false
• ordered: false

Best Practices:
• Combine explicit:true with omitDefault:true to eliminate null placeholders.
• Use ordered:true when stable sorted output is required for diffing or canonicalization.
• Set processingMode to 'json-ld-1.0' to maintain compatibility with older processors.

Troubleshooting:
1. Run example: node framing-example.js
2. If error.code === 'invalid frame', verify frame has valid JSON-LD framing keywords (@type, @id, @embed, @default).
3. If error.code === 'invalid embed value', ensure embed is one of '@once','@last','@always','@never'.
4. For recursion errors, reduce nested frame depth or increase stack limit: node --stack-size=10000 framing-example.js

Expected CLI output: framed JSON-LD document structured per frame topology.

## Information Dense Extract
JsonLdProcessor.frame(input:Object|Array, frame:Object, options?:JsonLdOptions):Promise<Object|Array>
JsonLdOptions{processingMode:'json-ld-1.1'|'json-ld-1.0', base:string, expandContext:Object, embed:'@once'|'@last'|'@always'|'@never', explicit:boolean, omitDefault:boolean, omitGraph:boolean, requireAll:boolean, ordered:boolean}
Errors: JsonLdError{code:'invalid frame'|'invalid embed value'|'recursion limit exceeded'}
Example Pattern: const framed=await jsonld.frame(doc,frame,{embed:'@once',explicit:true,omitDefault:false,omitGraph:false,requireAll:true,ordered:true})
Best: explicit:true+omitDefault:true strips nulls; ordered:false for perf; processingMode:'json-ld-1.0' locks features
Troubleshoot: node example.js -> inspect err.code/err.message; adjust frame syntax; reduce nesting

## Sanitised Extract
Table of Contents
1 Framing API Overview
2 Frame Matching Options
3 JsonLdProcessor.frame signature
4 JsonLdOptions flags and defaults
5 Error codes and handling
6 Node.js framing example
7 Implementation pattern steps
8 Best practices
9 Troubleshooting steps

1 Framing API Overview
The API method frame takes an expanded JSON-LD input document and a frame document containing matching rules and returns a shaped output matching the frame.

2 Frame Matching Options
Embed flag values: @once, @last, @always, @never
explicit boolean: include only declared properties
omitDefault boolean: omit added null defaults
omitGraph boolean: omit top-level @graph when single tree
requireAll boolean: enforce all frame properties present
ordered boolean: sort arrays by IRI order

3 JsonLdProcessor.frame signature
Promise<Object|Array> frame(
  input: Object|Array,
  frame: Object,
  options?: JsonLdOptions
)

4 JsonLdOptions flags and defaults
processingMode: 'json-ld-1.1' (default) or 'json-ld-1.0'
base: string (document base IRI)
expandContext: Object
embed: '@once' (default)
explicit: false (default)
omitDefault: false (default)
omitGraph: false (default)
requireAll: false (default)
ordered: false (default)

5 Error codes and handling
JsonLdError thrown with name 'JsonLdError', code in {invalid frame, invalid embed value, recursion limit exceeded}, message.

6 Node.js framing example
Load input and frame JSON files; call jsonld.frame with options; await result; handle errors.

7 Implementation pattern steps
1 Load/parse JSON-LD input
2 Define frame with context and matching rules
3 Configure options
4 Call frame method
5 Process or log result

8 Best practices
Use ordered:false for performance
Strict matching with requireAll:true only when required
Combine explicit:true and omitDefault:true to avoid null placeholders

9 Troubleshooting steps
Run node example, check error.code and error.message; verify frame syntax and valid embed values; reduce frame depth if recursion error occurs.

## Original Source
W3C Semantic Web Standards & JSON-LD
https://www.w3.org/TR/json-ld11-framing/

## Digest of FRAMING_API

# 5. Application Programming Interface (retrieved 2024-06-24)
Data Size: 16580275 bytes
Links Found: 98192
Error: None

## 5.1 JsonLdProcessor.frame
Signature:
  Promise<Object|Array> frame(input, frame, options)

Parameters:
  • input: Object or Array — expanded JSON-LD document to be framed
  • frame: Object — frame document specifying matching and embedding rules
  • options: JsonLdOptions (optional)

Return:
  • Promise resolving to framed output (Object or Array)

Exceptions:
  • JsonLdError{code: 'invalid frame'}
  • JsonLdError{code: 'invalid embed value'}
  • JsonLdError{code: 'recursion limit exceeded'}

## 5.2 JsonLdOptions
Interface JsonLdOptions {
  processingMode?: 'json-ld-1.0' | 'json-ld-1.1'               // default 'json-ld-1.1'
  base?: string                                              // base IRI for document resolution
  expandContext?: Object                                     // context to apply during expansion
  embed?: '@once' | '@last' | '@always' | '@never'           // default '@once'
  explicit?: boolean                                         // default false
  omitDefault?: boolean                                      // default false
  omitGraph?: boolean                                        // default false
  requireAll?: boolean                                       // default false
  ordered?: boolean                                          // default false
}

## 5.3 Error Handling
JsonLdError instances thrown with properties:
  • name: 'JsonLdError'
  • code: one of predefined error codes
  • message: human-readable description

## 5.4 Full Code Example (Node.js)
```js
const jsonld = require('jsonld');

(async () => {
  const doc = require('./library.json');
  const frame = require('./library-frame.json');
  const options = {
    embed: '@once',
    explicit: true,
    omitDefault: false,
    omitGraph: false,
    requireAll: true,
    ordered: true
  };
  try {
    const framed = await jsonld.frame(doc, frame, options);
    console.log(JSON.stringify(framed, null, 2));
  } catch(err) {
    console.error(err.code, err.message);
  }
})();
```

## 5.5 Implementation Pattern
1. Parse or fetch JSON-LD input document
2. Define a frame document conforming to the JSON-LD Framing keywords
3. Configure JsonLdOptions with required flags
4. Invoke JsonLdProcessor.frame(input, frame, options)
5. Handle resolved output or catch JsonLdError

## 5.6 Performance Best Practices
• Use ordered:false for large input to avoid sorting overhead
• Set requireAll:true only when strict matching is needed
• Combine omitDefault and explicit to minimize output size

## 5.7 Troubleshooting Procedures
Command:
  node run framing-example.js

Expected Output:
  JSON document structured per frame

Common Errors:
  • invalid frame: check frame contains only JSON-LD framing keywords
  • invalid embed value: use one of '@once','@last','@always','@never'
  • recursion limit exceeded: simplify nested frame depth


## Attribution
- Source: W3C Semantic Web Standards & JSON-LD
- URL: https://www.w3.org/TR/json-ld11-framing/
- License: License if known
- Crawl Date: 2025-04-28T21:49:04.460Z
- Data Size: 16580275 bytes
- Links Found: 98192

## Retrieved
2025-04-28
library/GOOD_URIS.md
# library/GOOD_URIS.md
# GOOD_URIS

## Crawl Summary
Publish HTTP URIs with opaque stable segments, serve machine-readable formats via content negotiation (text/turtle, application/ld+json), avoid volatile URI components, document persistence strategy, implement 301 redirections or PURL service for admin control

## Normalised Extract
Table of Contents
1 URI Structure
2 Content Negotiation
3 Persistence Strategy
4 Implementation Steps

1 URI Structure
Resources MUST use HTTP scheme, host, stable path. Avoid file extensions, session parameters, query strings that change. Example path patterns: /resource/{id}

2 Content Negotiation
Accept header mapping:
  text/html => HTML landing page
  text/turtle => RDF/Turtle serialization
  application/ld+json => JSON-LD serialization
Set response Content-Type accordingly. Return 406 if unsupported.

3 Persistence Strategy
Host a policy document at /uri-policy.html. List redirect rules as mapping table. Use HTTP 301 for moved resources.
Use PURL service or custom redirect middleware allowing live updates without code redeploy.

4 Implementation Steps
1. Define URI pattern: /data/{entity}/{id}
2. Configure HTTP server for content negotiation
3. Create /uri-policy.html describing persistence commitments
4. Implement redirect middleware reading mapping from URI table


## Supplementary Details
Apache Configuration (httpd.conf or .htaccess):
<IfModule mod_negotiation.c>
  Options +MultiViews
  AddType text/turtle ttl
  AddType application/ld+json jsonld
  DefaultType text/html
</IfModule>
<IfModule mod_rewrite.c>
  RewriteEngine On
  # Content negotiation for JSON-LD
  RewriteCond %{HTTP_ACCEPT} application/ld+json
  RewriteRule ^/resource/(.*)$ /data/jsonld/$1.jsonld [R=200,L]
  # Redirect legacy URIs
  RewriteRule ^/old-resource/(.*)$ /resource/$1 [R=301,L]
</IfModule>

Nginx Configuration:
server {
  listen 80;
  server_name example.org;
  location /resource/ {
    types {
      application/ld+json  jsonld;
      text/turtle         ttl;
      text/html           html;
    }
    default_type text/html;
    try_files $uri.turtle $uri.jsonld $uri.html =406;
  }
  location = /uri-policy.html {
    root /var/www/html;
  }
}

## Reference Details
Apache .htaccess Example:
# Enable negotiation and type mapping
Options +MultiViews
AddType text/turtle ttl
AddType application/ld+json jsonld

# JSON-LD negotiation
<If "%{HTTP:Accept} =~ /application\/ld\+json/">
  ForceType application/ld+json
  RewriteRule ^resource/(.*)$ /data/jsonld/$1.jsonld [L]
</If>

# Turtle negotiation
<If "%{HTTP:Accept} =~ /text\/turtle/">
  ForceType text/turtle
  RewriteRule ^resource/(.*)$ /data/ttl/$1.ttl [L]
</If>

# HTML fallback
RewriteRule ^resource/(.*)$ /data/html/$1.html [L]

# Persistence: legacy redirect
RewriteRule ^old/(.*)$ /resource/$1 [R=301,L]

Nginx Server Block Example:
server {
  listen 80;
  server_name data.example.org;

  # Content negotiation
  location /resource/ {
    default_type text/html;
    add_header Vary Accept;
    if ($http_accept ~* application/ld\+json) {
      default_type application/ld+json;
      rewrite ^/resource/(.*)$ /data/jsonld/$1.jsonld break;
    }
    if ($http_accept ~* text/turtle) {
      default_type text/turtle;
      rewrite ^/resource/(.*)$ /data/ttl/$1.ttl break;
    }
    try_files $uri.html =406;
  }

  # URI policy document
  location = /uri-policy.html {
    alias /var/www/html/uri-policy.html;
  }

  # Redirect rules file
  location /redirects/ {
    internal;
    alias /etc/nginx/redirects.conf;
  }
}

Troubleshooting Commands:
# Verify HTML default
curl -I http://example.org/resource/123
> HTTP/1.1 200 OK
> Content-Type: text/html

# Verify Turtle negotiation
curl -I -H 'Accept: text/turtle' http://example.org/resource/123
> HTTP/1.1 200 OK
> Content-Type: text/turtle

# Verify JSON-LD negotiation
curl -I -H 'Accept: application/ld+json' http://example.org/resource/123
> HTTP/1.1 200 OK
> Content-Type: application/ld+json

# Check redirect
curl -I http://example.org/old-resource/123
> HTTP/1.1 301 Moved Permanently
> Location: http://example.org/resource/123

## Information Dense Extract
HTTP URIs with stable opaque paths. Content negotiation for text/html, text/turtle, application/ld+json. Use Vary header. Server config examples for Apache and Nginx. Implement 301 redirects for legacy URIs via mod_rewrite or redirect tables. Host /uri-policy.html documenting persistence commitments. Test via curl -I with Accept header or without. PURL or custom middleware for real-time redirect updates.

## Sanitised Extract
Table of Contents
1 URI Structure
2 Content Negotiation
3 Persistence Strategy
4 Implementation Steps

1 URI Structure
Resources MUST use HTTP scheme, host, stable path. Avoid file extensions, session parameters, query strings that change. Example path patterns: /resource/{id}

2 Content Negotiation
Accept header mapping:
  text/html => HTML landing page
  text/turtle => RDF/Turtle serialization
  application/ld+json => JSON-LD serialization
Set response Content-Type accordingly. Return 406 if unsupported.

3 Persistence Strategy
Host a policy document at /uri-policy.html. List redirect rules as mapping table. Use HTTP 301 for moved resources.
Use PURL service or custom redirect middleware allowing live updates without code redeploy.

4 Implementation Steps
1. Define URI pattern: /data/{entity}/{id}
2. Configure HTTP server for content negotiation
3. Create /uri-policy.html describing persistence commitments
4. Implement redirect middleware reading mapping from URI table

## Original Source
Linked Data Best Practices
https://www.w3.org/TR/ld-bp/

## Digest of GOOD_URIS

# URI Design Principles
Use HTTP URIs as global identifiers for Linked Data resources
Provide at least one machine-readable representation via content negotiation
Design URIs to be opaque and avoid volatile components
Publish and enforce a URI persistence policy with HTTP redirection

# Use HTTP URIs
Resources SHALL be identified by HTTP URIs. Example: http://example.org/resource/123
Implement HTTP GET handlers that respond to Accept headers for HTML, Turtle, JSON-LD

# Machine-Readable Representation
Server MUST support content negotiation for at minimum:
  Accept: text/turtle  => response Content-Type: text/turtle
  Accept: application/ld+json => response Content-Type: application/ld+json

# URI Opacity
URIs MUST NOT embed session tokens, timestamps, file extensions, or other volatile data
Keep path segments stable; use opaque identifiers (e.g., numeric or UUID segments)

# URI Persistence Policy
Define a policy document at /uri-policy.html listing persistence guarantees
Implement 301 Moved Permanently for legacy URIs mapping to current ones
Use PURL or custom redirect table for real-time administration of redirections


## Attribution
- Source: Linked Data Best Practices
- URL: https://www.w3.org/TR/ld-bp/
- License: License if known
- Crawl Date: 2025-04-29T03:08:07.231Z
- Data Size: 6272854 bytes
- Links Found: 22833

## Retrieved
2025-04-29
library/ROBOT.md
# library/ROBOT.md
# ROBOT

## Crawl Summary
ROBOT CLI/library for automating ontology workflows. Build: mvn clean package→bin/robot.jar; test: mvn clean test→surefire-reports; verify: mvn clean verify→failsafe-reports; site: mvn site→Javadoc. Docker: docker build --tag robot:latest ., docker run --rm robot --help. Code style: Google Java Style via fmt-maven-plugin (style=GOOGLE). Commands implement public static void main(String[] args), use CommandLineHelper for --input, --prefix, --output; IO via IOHelper.loadOntology(File,OWLDocumentFormat)->OWLOntology, saveOntology(OWLOntology,File,OWLDocumentFormat). Operations: static methods without IO/CLI. CommandLineInterface dispatches commands. Term lists: space-separated IRIs/CURIEs; comments begin with "#" at line start or after whitespace.

## Normalised Extract
Table of Contents
1. Installation and Prerequisites
2. Build Lifecycle Commands
3. Docker Container Usage
4. Enforcing Code Style
5. Architecture: Commands vs Operations
6. Shared CLI Options
7. Term List Parsing

1. Installation and Prerequisites
- Install Maven 3.6+ and JDK 1.8+
- Clone repository; run 'mvn clean package'
- Generated jar: 'bin/robot.jar'

2. Build Lifecycle Commands
- mvn clean package         → builds jar
- mvn clean test            → runs JUnit tests; reports in [module]/target/surefire-reports
- mvn clean verify          → runs integration tests; reports in [module]/target/failsafe-reports
- mvn site                  → generates Javadoc in target/site and [module]/target/site

3. Docker Container Usage
- docker build --tag robot:latest .
- docker run --rm robot --help
- To run command: docker run --rm robot <command> [--input input.owl] [--output out.owl]

4. Enforcing Code Style
Add to pom.xml:
  <plugin>
    <groupId>com.coveo</groupId>
    <artifactId>fmt-maven-plugin</artifactId>
    <version>2.10</version>
    <configuration><style>GOOGLE</style></configuration>
    <executions><execution><goals><goal>format</goal></goals></execution></executions>
  </plugin>

5. Architecture: Commands vs Operations
Commands:
  - Interface: main(String[] args)
  - Sequence: parse args → load IO → call Operation → save IO
Operations:
  - Static methods
  - OWL API interactions
  - No IO/CLI

6. Shared CLI Options
Options and parsing via CommandLineHelper:
  --input <file>       → File getInputFile(CommandLine)
  --prefix <file>      → Map<String,IRI> loadPrefixes(File)
  --output <file>      → File getOutputFile(CommandLine)
  --format <format>    → DocumentFormat getFormat(CommandLine)

7. Term List Parsing
Methods in IOHelper:
  Set<IRI> parseTermList(String content)
  Set<IRI> parseTermList(File file)
Rules:
  - Space-separated IRIs/CURIEs
  - Line-level comments start with '#' at line start or after whitespace
  - '#' inside IRI not treated as comment

## Supplementary Details
Prerequisites
- Java 1.8+ installed
- Maven 3.6+ in PATH

Maven Plugin Configurations
- fmt-maven-plugin version 2.10
- google-java-format version 1.7

Dockerfile Example
FROM openjdk:8-jdk-alpine
COPY target/robot.jar /opt/robot/robot.jar
ENTRYPOINT ["java","-jar","/opt/robot/robot.jar"]

Jenkinsfile Example
pipeline {
  agent any
  stages {
    stage('Build') { steps { sh 'mvn clean package' } }
    stage('Test')  { steps { sh 'mvn clean test' } }
    stage('Verify'){ steps { sh 'mvn clean verify' } }
    stage('Deploy'){ steps { sh 'docker build --tag robot:latest .' } }
  }
}

Logging and Verbosity
- Use '-v' or '-vv' flags on CLI commands for verbose output
- For debugging: mvn clean verify -X

CI Integration
- surefire reports: use JUnit publisher in CI
- failsafe reports: integration-test publisher

## Reference Details
Interface: Command
public interface Command {
  /**
   * Entry point for command implementation.
   * @param args CLI arguments
   */
  void main(String[] args);
}

Class: CommandLineInterface
public class CommandLineInterface {
  public static void main(String[] args) throws Exception {
    String name = args[0];
    Command cmd = commandMap.get(name);
    cmd.main(Arrays.copyOfRange(args,1,args.length));
  }
}

Class: CommandLineHelper
public class CommandLineHelper {
  public static Options createOptions() {
    Options opts = new Options();
    opts.addOption("i","input",true,"Input file path");
    opts.addOption("p","prefix",true,"Prefix file path");
    opts.addOption("o","output",true,"Output file path");
    opts.addOption(null,"format",true,"Output format (owl, rdfxml, ttl)");
    return opts;
  }
  public static CommandLine parse(String[] args) throws ParseException {
    DefaultParser parser = new DefaultParser();
    return parser.parse(createOptions(), args);
  }
  public static File getInputFile(CommandLine cmd) {
    return new File(cmd.getOptionValue("input"));
  }
  public static File getOutputFile(CommandLine cmd) {
    return Optional.ofNullable(cmd.getOptionValue("output")).map(File::new).orElse(null);
  }
  public static Map<String,IRI> loadPrefixes(File file) throws IOException, OWLOntologyCreationException {
    return PrefixDocumentFormatFactory.loadPrefixes(file);
  }
}

Class: IOHelper
public class IOHelper {
  public static OWLOntology loadOntology(File file, OWLDocumentFormat fmt)
      throws OWLOntologyCreationException {
    OWLOntologyManager m = OWLManager.createOWLOntologyManager();
    return m.loadOntologyFromOntologyDocument(new StreamDocumentSource(new FileInputStream(file)));
  }
  public static void saveOntology(OWLOntology o, File file, OWLDocumentFormat fmt)
      throws OWLOntologyStorageException, IOException {
    try (FileOutputStream out = new FileOutputStream(file)) {
      o.getOWLOntologyManager().saveOntology(o, fmt, out);
    }
  }
  public static Set<IRI> parseTermList(String content) {
    return Arrays.stream(content.split("\\s+"))
      .filter(token->!token.startsWith("#"))
      .map(IRI::create)
      .collect(Collectors.toSet());
  }
  public static Set<IRI> parseTermList(File file) throws IOException {
    String content = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
    return parseTermList(content);
  }
}

Example: ConvertCommand pattern
public class ConvertCommand implements Command {
  public void main(String[] args) {
    try {
      CommandLine cmd = CommandLineHelper.parse(args);
      File in = CommandLineHelper.getInputFile(cmd);
      File out = CommandLineHelper.getOutputFile(cmd);
      String fmt = cmd.getOptionValue("format");
      OWLOntology o = IOHelper.loadOntology(in, new RDFXMLDocumentFormat());
      OWLOntology o2 = ConvertOperation.convert(o, fmt);
      IOHelper.saveOntology(o2, out, new OWLXMLDocumentFormat());
    } catch (Exception e) {
      e.printStackTrace();
      System.exit(1);
    }
  }
}

Best Practices
- Keep Operations pure: no IO/CLI
- Use CommandLineHelper for argument parsing
- Use IOHelper for all ontology and term-list reads/writes
- Enforce code style via CI

Troubleshooting
- To debug CLI args: add '-v' for verbose; '-vv' for debug-level
- Failsafe integration test failure logs: target/*failsafe-reports/*.txt
- Maven debug: mvn clean verify -X
- Docker image rebuild: docker build --no-cache --tag robot:latest .

## Information Dense Extract
mvn clean package→bin/robot.jar; mvn clean test→surefire-reports; mvn clean verify→failsafe-reports; mvn site→Javadoc. docker build --tag robot:latest .; docker run --rm robot <cmd> [--input file] [--prefix file] [--output file] [--format fmt]. fmt-maven-plugin 2.10 style=GOOGLE injects google-java-format. Commands: main(String[] args)→CommandLineHelper.parse→getInputFile/OutputFile/prefixes→IOHelper.loadOntology(File,OWLDocumentFormat)→Operation.staticMethod→IOHelper.saveOntology. IOHelper.parseTermList(String|File) splits on whitespace, ignores tokens starting with '#'. CommandLineInterface dispatches first arg to commandMap. Dockerfile: FROM openjdk:8-jdk-alpine; ENTRYPOINT ["java","-jar","/opt/robot/robot.jar"]. Troubleshoot: mvn clean verify -X, inspect target/*failsafe-reports/*.txt

## Sanitised Extract
Table of Contents
1. Installation and Prerequisites
2. Build Lifecycle Commands
3. Docker Container Usage
4. Enforcing Code Style
5. Architecture: Commands vs Operations
6. Shared CLI Options
7. Term List Parsing

1. Installation and Prerequisites
- Install Maven 3.6+ and JDK 1.8+
- Clone repository; run 'mvn clean package'
- Generated jar: 'bin/robot.jar'

2. Build Lifecycle Commands
- mvn clean package          builds jar
- mvn clean test             runs JUnit tests; reports in [module]/target/surefire-reports
- mvn clean verify           runs integration tests; reports in [module]/target/failsafe-reports
- mvn site                   generates Javadoc in target/site and [module]/target/site

3. Docker Container Usage
- docker build --tag robot:latest .
- docker run --rm robot --help
- To run command: docker run --rm robot <command> [--input input.owl] [--output out.owl]

4. Enforcing Code Style
Add to pom.xml:
  <plugin>
    <groupId>com.coveo</groupId>
    <artifactId>fmt-maven-plugin</artifactId>
    <version>2.10</version>
    <configuration><style>GOOGLE</style></configuration>
    <executions><execution><goals><goal>format</goal></goals></execution></executions>
  </plugin>

5. Architecture: Commands vs Operations
Commands:
  - Interface: main(String[] args)
  - Sequence: parse args  load IO  call Operation  save IO
Operations:
  - Static methods
  - OWL API interactions
  - No IO/CLI

6. Shared CLI Options
Options and parsing via CommandLineHelper:
  --input <file>        File getInputFile(CommandLine)
  --prefix <file>       Map<String,IRI> loadPrefixes(File)
  --output <file>       File getOutputFile(CommandLine)
  --format <format>     DocumentFormat getFormat(CommandLine)

7. Term List Parsing
Methods in IOHelper:
  Set<IRI> parseTermList(String content)
  Set<IRI> parseTermList(File file)
Rules:
  - Space-separated IRIs/CURIEs
  - Line-level comments start with '#' at line start or after whitespace
  - '#' inside IRI not treated as comment

## Original Source
ROBOT: Release OWL Ontology Builder
https://github.com/ontodev/robot#readme

## Digest of ROBOT

# Installation

Self-contained Jar generation:

  mvn clean package

Outputs:
  bin/robot.jar

Dependencies:
  Maven 3.6+ (CLI: mvn)
  JDK 1.8+

# Build Options

mvn clean test
  Runs JUnit tests. Reports:
    [module]/target/surefire-reports

mvn clean verify
  Rebuilds and runs integration tests. Reports:
    [module]/target/failsafe-reports

mvn site
  Generates Javadoc in:
    target/site
    [module]/target/site

# Docker Usage

Build image:

  docker build --tag robot:latest .

Run containerized ROBOT:

  docker run --rm robot --help

# Code Style

Google Java Style enforced via fmt-maven-plugin and google-java-format.

Pom.xml snippet:

  <plugin>
    <groupId>com.coveo</groupId>
    <artifactId>fmt-maven-plugin</artifactId>
    <version>2.10</version>
    <configuration>
      <style>GOOGLE</style>
    </configuration>
    <executions>
      <execution>
        <goals>
          <goal>format</goal>
        </goals>
      </execution>
    </executions>
  </plugin>

# Design

Operations vs Commands:

  Commands:
    - Implement public static void main(String[] args)
    - Handle CLI parsing, IO tasks
    - Invoked by CommandLineInterface or directly by name
    - Use CommandLineHelper for options (--input, --prefix, --output, etc.)
    - Use IOHelper for ontology and term-list I/O

  Operations:
    - Static methods
    - Manipulate OWL ontologies
    - No IO or CLI code
    - Located in robot-core module

Command dispatch:

  Class: org.obolibrary.robot.CommandLineInterface
    public static void main(String[] args)
    Hard-coded list of Commands:
      ConvertCommand, MergeCommand, ReasonCommand, etc.
    Dispatch logic:
      parse first argument as command name; invoke associated main

# Term List Format

IOHelper term-list parsing:

  Input sources:
    - String (space-separated IRIs/CURIEs)
    - File (lines of IRIs/CURIEs)

  Rules:
    - Items separated by whitespace
    - "#" at start of line or preceded by whitespace begins comment to EOL
    - "#" inside an IRI is not a comment delimiter

# Metadata

Date Retrieved: 2024-06-15
Source Size: 573245 bytes
Links Found: 4769

## Attribution
- Source: ROBOT: Release OWL Ontology Builder
- URL: https://github.com/ontodev/robot#readme
- License: License if known
- Crawl Date: 2025-04-29T11:48:59.172Z
- Data Size: 573245 bytes
- Links Found: 4769

## Retrieved
2025-04-29
library/SPARQL_JSON.md
# library/SPARQL_JSON.md
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
library/ASSERT_MODULE.md
# library/ASSERT_MODULE.md
# ASSERT_MODULE

## Crawl Summary
Imported patterns, strict vs legacy modes, AssertionError options and properties, CallTracker methods and defaults, core assertion function signatures and deprecation status.

## Normalised Extract
Table of Contents:
1. Import Patterns
2. Assertion Modes
3. Error Classes
4. Call Tracking
5. Core Assertions

1. Import Patterns:
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
import assert from 'node:assert/strict'
const assert = require('node:assert/strict')

2. Assertion Modes:
- Strict: non-strict behave as strict, diff output
- Legacy: == comparisons in deepEqual, equal, notDeepEqual, notEqual; import assert from 'node:assert'

3. Error Classes:
AssertionError: new AssertionError({ message?:string, actual?:any, expected?:any, operator?:string, stackStartFn?:Function })
Properties: message, actual, expected, operator, code='ERR_ASSERTION', generatedMessage, name='AssertionError'

4. Call Tracking:
CallTracker: new CallTracker()
calls(fn?=>void, exact?=1): function wrapper tracking calls
getCalls(wrapper): returns array of { thisArg, arguments }
report(): returns array of pending call info
reset(wrapper?): resets calls
verify(): throws if calls != expected

5. Core Assertions:
assert(value:boolean, message?:string): void
assert.strictEqual(actual:any, expected:any, message?:string): void
assert.deepStrictEqual(actual:any, expected:any, message?:string): void
assert.throws(fn:Function, error?:RegExp|Function, message?:string): void
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string): void
assert.rejects(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.doesNotReject(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.match(string:string, regexp:RegExp, message?:string): void
assert.doesNotMatch(string:string, regexp:RegExp, message?:string): void
assert.fail(message?:string): never
assert.ifError(value:any): void


## Supplementary Details
Color Control: set NO_COLOR=1 or NODE_DISABLE_COLORS=1 to disable diff colors
Legacy warnings emitted when using legacy mode; no flag needed but may log warnings
CallTracker default exact=1, default fn=no-op
assert.rejects returns a Promise
assert.doesNotReject rejects if non-Promise returned or sync throw
Use process.on('exit') for verify() hook

## Reference Details
assert(value, message?) -> void throws ERR_ASSERTION if !value
assert.strictEqual(actual, expected, message?) -> void checks actual===expected, sets err.actual, err.expected, err.operator='strictEqual'
assert.deepStrictEqual(actual, expected, message?) -> void deep strict compare; Object.is for primitives; compares prototypes and symbols; WeakMap/WeakSet require same instance
assert.throws(fn, error?, message?) -> void invokes fn, catches thrown Error; error match: constructor, RegExp, or validation fn
assert.doesNotThrow(fn, error?, message?) -> void asserts fn does not throw
assert.rejects(asyncFn, error?, message?) -> Promise<void> awaits promise; same matching rules as throws
assert.doesNotReject(asyncFn, error?, message?) -> Promise<void> rejects on thrown or non-promise return
assert.match(string, regexp, message?) -> void asserts regexp.test(string)
assert.doesNotMatch(string, regexp, message?) -> void asserts !regexp.test(string)
assert.ifError(value) -> void throws value if truthy
assert.fail(message?) -> never throws new AssertionError({ message })
Example call tracking implementation:
import assert from 'node:assert';
const tracker=new assert.CallTracker();
const callsfunc=tracker.calls(MyFunc,2);
MyFunc();
process.on('exit',()=>{tracker.verify();});


## Information Dense Extract
importPatterns:strict->import{strict as assert}from'node:assert'|require('node:assert').strict;legacy->import assert from'node:assert'.AssertionErrorOpts:{message?,actual?,expected?,operator?,stackStartFn?}Properties:message,actual,expected,operator,code='ERR_ASSERTION',generatedMessage,name.Operators:strictEqual,deepStrictEqual,throws,doesNotThrow,rejects,doesNotReject,match,doesNotMatch,ifError,fail.CallTracker:calls(fn?,exact?=1):wrapper,getCalls(wrapper):[{thisArg,arguments}],report()->pending,reset(wrapper?),verify()->throw.Config:NO_COLOR,NODE_DISABLE_COLORS disable colors

## Sanitised Extract
Table of Contents:
1. Import Patterns
2. Assertion Modes
3. Error Classes
4. Call Tracking
5. Core Assertions

1. Import Patterns:
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
import assert from 'node:assert/strict'
const assert = require('node:assert/strict')

2. Assertion Modes:
- Strict: non-strict behave as strict, diff output
- Legacy: == comparisons in deepEqual, equal, notDeepEqual, notEqual; import assert from 'node:assert'

3. Error Classes:
AssertionError: new AssertionError({ message?:string, actual?:any, expected?:any, operator?:string, stackStartFn?:Function })
Properties: message, actual, expected, operator, code='ERR_ASSERTION', generatedMessage, name='AssertionError'

4. Call Tracking:
CallTracker: new CallTracker()
calls(fn?=>void, exact?=1): function wrapper tracking calls
getCalls(wrapper): returns array of { thisArg, arguments }
report(): returns array of pending call info
reset(wrapper?): resets calls
verify(): throws if calls != expected

5. Core Assertions:
assert(value:boolean, message?:string): void
assert.strictEqual(actual:any, expected:any, message?:string): void
assert.deepStrictEqual(actual:any, expected:any, message?:string): void
assert.throws(fn:Function, error?:RegExp|Function, message?:string): void
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string): void
assert.rejects(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.doesNotReject(asyncFn:Promise|Function, error?:RegExp|Function, message?:string): Promise<void>
assert.match(string:string, regexp:RegExp, message?:string): void
assert.doesNotMatch(string:string, regexp:RegExp, message?:string): void
assert.fail(message?:string): never
assert.ifError(value:any): void

## Original Source
Web Platform, Protocol & Date-Time Standards
https://nodejs.org/api/

## Digest of ASSERT_MODULE

# Assert Module

## Stability: 2 - Stable

## Import Patterns

import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
import assert from 'node:assert/strict'
const assert = require('node:assert/strict')

## Strict Assertion Mode

In strict mode non-strict methods behave as strict. Error diffs enabled.

## Legacy Assertion Mode

Legacy uses == for deepEqual, equal, notDeepEqual, notEqual.
Import with:
import assert from 'node:assert'
const assert = require('node:assert')

## Class: assert.AssertionError

Signature: new assert.AssertionError(options)

options: { message?: string, actual?: any, expected?: any, operator?: string, stackStartFn?: Function }

Properties:
- message: string
- actual: any
- expected: any
- operator: string
- code: 'ERR_ASSERTION'
- generatedMessage: boolean
- name: 'AssertionError'

## Class: assert.CallTracker

Signature: new assert.CallTracker()

Methods:
- calls(fn?: Function, exact?: number): Function
- getCalls(fnWrapper: Function): Array<{ thisArg: object, arguments: any[] }>
- report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: any }>
- reset(fnWrapper?: Function): void
- verify(): void

Deprecated in v20.1.0

## Assertion Functions

assert(value[, message])
assert.strictEqual(actual, expected[, message])
assert.deepStrictEqual(actual, expected[, message])
assert.throws(fn[, error][, message])
assert.doesNotThrow(fn[, error][, message])
assert.rejects(asyncFn[, error][, message])
assert.doesNotReject(asyncFn[, error][, message])
assert.match(string, regexp[, message])
assert.doesNotMatch(string, regexp[, message])
assert.fail([message])
assert.ifError(value)


## Attribution
- Source: Web Platform, Protocol & Date-Time Standards
- URL: https://nodejs.org/api/
- License: License if known
- Crawl Date: 2025-04-29T15:50:11.499Z
- Data Size: 4131244 bytes
- Links Found: 3262

## Retrieved
2025-04-29
library/OWL2_PRIMER.md
# library/OWL2_PRIMER.md
# OWL2_PRIMER

## Crawl Summary
Functional-Style Syntax templates for core OWL constructs: ClassAssertion( Class Individual ), SubClassOf( SubClass SuperClass ), EquivalentClasses( ClassList ), DisjointClasses( ClassList ), ObjectPropertyAssertion( Property Subject Object ), NegativeObjectPropertyAssertion( Property Subject Object ), SubObjectPropertyOf( SubProperty SuperProperty ), ObjectPropertyDomain( Property Class ), ObjectPropertyRange( Property Class ), DataPropertyAssertion( Property Subject Literal^^xsdType ), NegativeDataPropertyAssertion( Property Subject Literal^^xsdType ), DataPropertyDomain( Property Class ), DataPropertyRange( Property xsdType ). All shown with matching Turtle serialization. Leveraging IRIs per RFC3987, datatypes from XML Schema. Naming conventions: unambiguous inflected or hasOf forms. Open-world semantics, no unique names assumption. Tools must support RDF/XML mapping, Manchester, Turtle, Functional-Style and OWL/XML syntaxes.

## Normalised Extract
Table of Contents
1 Class Assertions
2 Subclass Axioms
3 Equivalent Classes
4 Disjoint Classes
5 Object Property Assertions
6 Negative Object Property Assertions
7 Property Hierarchies
8 Domain and Range Restrictions
9 Data Property Assertions
10 Negative Data Property Assertions
11 Data Property Domain and Range

1 Class Assertions
Functional-Style: ClassAssertion( :Class :Individual )
Turtle: :Individual rdf type :Class .

2 Subclass Axioms
Functional-Style: SubClassOf( :SubClass :SuperClass )
Turtle: :SubClass rdfs subClassOf :SuperClass .

3 Equivalent Classes
Functional-Style: EquivalentClasses( :Class1 :Class2 )
Turtle: :Class1 owl equivalentClass :Class2 .

4 Disjoint Classes
Functional-Style: DisjointClasses( :ClassA :ClassB )
Turtle: [] rdf type owl AllDisjointClasses ; owl members ( :ClassA :ClassB ) .

5 Object Property Assertions
Functional-Style: ObjectPropertyAssertion( :Property :Subject :Object )
Turtle: :Subject :Property :Object .

6 Negative Object Property Assertions
Functional-Style: NegativeObjectPropertyAssertion( :Property :Subject :Object )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetIndividual :Object .

7 Property Hierarchies
Functional-Style: SubObjectPropertyOf( :SubProperty :SuperProperty )
Turtle: :SubProperty rdfs subPropertyOf :SuperProperty .

8 Domain and Range Restrictions
Functional-Style: ObjectPropertyDomain( :Property :DomainClass )
ObjectPropertyRange( :Property :RangeClass )
Turtle: :Property rdfs domain :DomainClass ; rdfs range :RangeClass .

9 Data Property Assertions
Functional-Style: DataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: :Subject :Property Literal .

10 Negative Data Property Assertions
Functional-Style: NegativeDataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetValue Literal .

11 Data Property Domain and Range
Functional-Style: DataPropertyDomain( :Property :DomainClass )
DataPropertyRange( :Property xsdType )
Turtle: :Property rdfs domain :DomainClass ; rdfs range xsdType .

## Supplementary Details
IRI and datatype specifications
- IRIs per RFC3987, abbreviate with prefixes defined via PrefixDeclaration in Section 8.2
- Datatypes: all XML Schema primitive and derived: xsd string, integer, nonNegativeInteger, boolean, dateTime, double etc.

Mandatory syntax support
- OWL 2 tools must support RDF/XML mapping [OWL 2 RDF Mapping]
- Optional syntaxes: Functional-Style, Manchester, OWL/XML

Semantics and reasoning
- Open-world assumption: absence of assertion is not negative
- No unique names assumption: sameAs and differentFrom must be declared explicitly
- Reasoners compliant with Direct Semantics [OWL 2 Direct Semantics] and RDF-Based Semantics [OWL 2 RDF-Based Semantics]

Abbreviation and namespace
- Use PrefixDeclaration to bind IRI prefixes (ex: prefix : <http://example.org/> )

Best practices
- Name object properties with directional verbs (loves, hasChild) or hasOf pattern (parentOf)
- Always declare disjointness for sibling classes to enable unsatisfiable class detection
- Avoid domain/range as closed constraints; use only to infer type


## Reference Details
OWL API Implementation Patterns (Java)

Manager and DataFactory
```
OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
OWLDataFactory factory = manager.getOWLDataFactory();
OWLOntology ontology = manager.createOntology(IRI.create("http://example.org/ontology"));
```

Add ClassAssertion
```
OWLAxiom ax1 = factory.getOWLClassAssertionAxiom(
  factory.getOWLClass(IRI.create("http://example.org#Person")),
  factory.getOWLNamedIndividual(IRI.create("http://example.org#Mary"))
);
manager.applyChange(new AddAxiom(ontology, ax1));
```

Add Subclass axiom
```
OWLAxiom ax2 = factory.getOWLSubClassOfAxiom(
  factory.getOWLClass(IRI.create("http://example.org#Woman")),
  factory.getOWLClass(IRI.create("http://example.org#Person"))
);
manager.applyChange(new AddAxiom(ontology, ax2));
```

Negative Data Property Assertion
```
OWLAxiom ax3 = factory.getOWLNegativeDataPropertyAssertionAxiom(
  factory.getOWLDataProperty(IRI.create("http://example.org#hasAge")),
  factory.getOWLNamedIndividual(IRI.create("http://example.org#Jack")),
  factory.getOWLLiteral(53, OWL2Datatype.XSD_INTEGER)
);
manager.applyChange(new AddAxiom(ontology, ax3));
```

Reasoning and Troubleshooting
1. Load ontology
2. Use HermiT via OWL API
```
OWLReasonerFactory reasonerFactory = new org.semanticweb.HermiT.ReasonerFactory();
OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);
reasoner.precomputeInferences(InferenceType.CLASS_HIERARCHY, InferenceType.CLASS_ASSERTIONS);
```
3. Detect unintended inferences
```
NodeSet<OWLClass> types = reasoner.getTypes(
  factory.getOWLNamedIndividual(IRI.create("http://example.org#Felix")),
  true
);
System.out.println(types.getFlattened()); // Expected [http://example.org#Person]
```

Command-line Reasoning with ROBOT
```
robot reason --input example.owl --reasoner ELK --output classified.owl
robot verify --input classified.owl
```
Expected: no unsatisfiable classes; violations reported with line numbers.

Configuration Options
- choose reasoner: HermiT, ELK, FaCT++; set via reasonerFactory
- ontology format: RDFXMLDocumentFormat, ManchesterSyntaxDocumentFormat, TTLDocumentFormat
- prefix manager: DefaultPrefixManager("http://example.org#")


## Information Dense Extract
ClassAssertion( :C :i ) SubClassOf( :c :C ) EquivalentClasses( :A :B ) DisjointClasses( :A :B ) ObjectPropertyAssertion( :p :s :o ) NegativeObjectPropertyAssertion( :p :s :o ) SubObjectPropertyOf( :p :P ) ObjectPropertyDomain( :p :C ) ObjectPropertyRange( :p :C ) DataPropertyAssertion( :q :s "lit"^^xsd:t ) NegativeDataPropertyAssertion( :q :s "lit"^^xsd:t ) DataPropertyDomain( :q :C ) DataPropertyRange( :q xsd:t )

## Sanitised Extract
Table of Contents
1 Class Assertions
2 Subclass Axioms
3 Equivalent Classes
4 Disjoint Classes
5 Object Property Assertions
6 Negative Object Property Assertions
7 Property Hierarchies
8 Domain and Range Restrictions
9 Data Property Assertions
10 Negative Data Property Assertions
11 Data Property Domain and Range

1 Class Assertions
Functional-Style: ClassAssertion( :Class :Individual )
Turtle: :Individual rdf type :Class .

2 Subclass Axioms
Functional-Style: SubClassOf( :SubClass :SuperClass )
Turtle: :SubClass rdfs subClassOf :SuperClass .

3 Equivalent Classes
Functional-Style: EquivalentClasses( :Class1 :Class2 )
Turtle: :Class1 owl equivalentClass :Class2 .

4 Disjoint Classes
Functional-Style: DisjointClasses( :ClassA :ClassB )
Turtle: [] rdf type owl AllDisjointClasses ; owl members ( :ClassA :ClassB ) .

5 Object Property Assertions
Functional-Style: ObjectPropertyAssertion( :Property :Subject :Object )
Turtle: :Subject :Property :Object .

6 Negative Object Property Assertions
Functional-Style: NegativeObjectPropertyAssertion( :Property :Subject :Object )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetIndividual :Object .

7 Property Hierarchies
Functional-Style: SubObjectPropertyOf( :SubProperty :SuperProperty )
Turtle: :SubProperty rdfs subPropertyOf :SuperProperty .

8 Domain and Range Restrictions
Functional-Style: ObjectPropertyDomain( :Property :DomainClass )
ObjectPropertyRange( :Property :RangeClass )
Turtle: :Property rdfs domain :DomainClass ; rdfs range :RangeClass .

9 Data Property Assertions
Functional-Style: DataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: :Subject :Property Literal .

10 Negative Data Property Assertions
Functional-Style: NegativeDataPropertyAssertion( :Property :Subject Literal^^xsdType )
Turtle: [] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Subject ; owl assertionProperty :Property ; owl targetValue Literal .

11 Data Property Domain and Range
Functional-Style: DataPropertyDomain( :Property :DomainClass )
DataPropertyRange( :Property xsdType )
Turtle: :Property rdfs domain :DomainClass ; rdfs range xsdType .

## Original Source
W3C OWL 2 Primer
https://www.w3.org/TR/owl2-primer/

## Digest of OWL2_PRIMER

# OWL 2 Primer Detailed Digest (Retrieved: 2024-06-10)

# Class Assertions
Functional-Style Syntax
ClassAssertion( :Person :Mary )
Turtle Syntax
:Mary rdf type :Person .

# Subclass Axioms
Functional-Style Syntax
SubClassOf( :Woman :Person )
Turtle Syntax
:Woman rdfs subClassOf :Person .

# Equivalent Classes
Functional-Style Syntax
EquivalentClasses( :Person :Human )
Turtle Syntax
:Person owl equivalentClass :Human .

# Disjoint Classes
Functional-Style Syntax
DisjointClasses( :Woman :Man )
Turtle Syntax
[] rdf type owl AllDisjointClasses ; owl members ( :Woman :Man ) .

# Object Property Assertions
Functional-Style Syntax
ObjectPropertyAssertion( :hasWife :John :Mary )
Turtle Syntax
:John :hasWife :Mary .

# Negative Object Property Assertions
Functional-Style Syntax
NegativeObjectPropertyAssertion( :hasWife :Bill :Mary )
Turtle Syntax
[] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Bill ; owl assertionProperty :hasWife ; owl targetIndividual :Mary .

# Property Hierarchies
Functional-Style Syntax
SubObjectPropertyOf( :hasWife :hasSpouse )
Turtle Syntax
:hasWife rdfs subPropertyOf :hasSpouse .

# Domain and Range Restrictions
Functional-Style Syntax
ObjectPropertyDomain( :hasWife :Man )
ObjectPropertyRange( :hasWife :Woman )
Turtle Syntax
:hasWife rdfs domain :Man ; rdfs range :Woman .

# Data Property Assertions
Functional-Style Syntax
DataPropertyAssertion( :hasAge :John 51^^xsd integer )
Turtle Syntax
:John :hasAge 51 .

# Negative Data Property Assertions
Functional-Style Syntax
NegativeDataPropertyAssertion( :hasAge :Jack 53^^xsd integer )
Turtle Syntax
[] rdf type owl NegativePropertyAssertion ; owl sourceIndividual :Jack ; owl assertionProperty :hasAge ; owl targetValue 53 .

# Data Property Domain and Range
Functional-Style Syntax
DataPropertyDomain( :hasAge :Person )
DataPropertyRange( :hasAge xsd nonNegativeInteger )
Turtle Syntax
:hasAge rdfs domain :Person ; rdfs range xsd nonNegativeInteger .

## Attribution
- Source: W3C OWL 2 Primer
- URL: https://www.w3.org/TR/owl2-primer/
- License: License
- Crawl Date: 2025-04-27T03:54:12.137Z
- Data Size: 18820085 bytes
- Links Found: 21149

## Retrieved
2025-04-27
library/RDF4J_RELEASE_NOTES.md
# library/RDF4J_RELEASE_NOTES.md
# RDF4J_RELEASE_NOTES

## Crawl Summary
No content retrieved: Data Size 0 bytes, no links, no release details available

## Normalised Extract
Table of Contents:
1. Release Versions
2. Feature Listings
3. Bug Fixes

No detailed release versions
No features documented
No bug fixes documented

## Supplementary Details
No supplementary details available due to empty source content

## Reference Details
No API specifications or SDK signatures available from release-notes page

## Information Dense Extract
No data

## Sanitised Extract
Table of Contents:
1. Release Versions
2. Feature Listings
3. Bug Fixes

No detailed release versions
No features documented
No bug fixes documented

## Original Source
Eclipse RDF4J Programming Guide
https://rdf4j.org/documentation/release-notes/

## Digest of RDF4J_RELEASE_NOTES

# RDF4J Release Notes

No technical content available from source at https://rdf4j.org/documentation/release-notes/ as of 2023-10-03

## Attribution
- Source: Eclipse RDF4J Programming Guide
- URL: https://rdf4j.org/documentation/release-notes/
- License: License
- Crawl Date: 2025-04-28T09:09:44.967Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
library/JSON_LD_TERMS.md
# library/JSON_LD_TERMS.md
# JSON_LD_TERMS

## Crawl Summary
Defines  forty-five JSON-LD keywords and data structures with exact mapping rules: active context for runtime term resolution; base direction via @direction = "ltr"|"rtl"|null; compact IRI syntax prefix:suffix; @context entries as map/IRI/array; @language must be BCP47 or null; frame syntax with @id,@type,@embed,@explicit; named graph objects with @graph,@id,@index; id maps with @container=@id; index maps with @container=@index; JSON literal datatype rdf:JSON; internal representation types; processor operations: expand,compact,flatten,frame,normalize,toRDF,fromRDF; container maps for @language,@list,@set,@type; processingMode option; vocabulary mapping via @vocab.

## Normalised Extract
Table of Contents:
1 active context
2 base direction
3 compact IRI
4 context
5 default language
6 default object
7 embedded context
8 expanded term definition
9 frame
10 frame object
11 graph object
12 id map
13 implicitly named graph
14 included block
15 index map
16 JSON literal
17 JSON-LD document
18 internal representation
19 JSON-LD Processor
20 JSON-LD value
21 keyword
22 language map
23 list object
24 local context
25 nested property
26 node object
27 node reference
28 prefix
29 processing mode
30 scoped context
31 set object
32 term
33 term definition
34 type map
35 typed value
36 value object
37 vocabulary mapping

Details:
1 active context resolves terms during processing
2 @direction: "ltr","rtl",null sets base text direction
3 prefix:suffix compacts IRIs using context term prefix
4 @context: map/IRI/array for term-to-IRI, vocab, base, language, direction
5 @language: BCP47 code or null for untagged strings
6 @default key maps default values in framing
7 embedded @context may appear in nodes, values, graphs, lists, sets
8 term definition map with @id, @type, @container, @reverse, @language, @direction
9 frame document defines matching/embedding rules using @context, @embed, @explicit
10 frame objects map portions of input to output structure
11 graph object: map with @graph plus optional @id,@index
12 id map: @container=@id term mapping IRI to node objects
13 implicitly named graphs from @container=@graph definitions
14 @included alias merges node objects into output
15 index map: @container=@index maps to scalar or node/value/list/set or arrays
16 JSON literal uses @type @json and datatype rdf:JSON
17 JSON-LD document serializes RDF dataset with maps and arrays
18 internal representation uses arrays, maps, strings, numbers, booleans, null
19 Processor must implement expand, compact, flatten, frame, normalize, toRDF, fromRDF
20 JSON-LD value: string, number, boolean, typed value, language-tagged string
21 keywords: strings starting with @: @context,@id,@type,@value,@list,@set,etc
22 language map: @container=@language, keys=BCP47, values=string/null/arrays
23 list object: map with @list and optional @index
24 local context: @context map overrides active context
25 nested property: key whose value is map flattened into node object
26 node object: map without @value,@list,@set representing resource properties
27 node reference: @id-only node object
28 prefix: context term whose IRI used for compact IRI prefix
29 processing mode: default 'json-ld-1.1', set via @version or API option
30 scoped context: type- or property-scoped contexts via @context in term definitions
31 set object: map with @set and optional @index
32 term: context key mapping to IRI or definition
33 term definition: context entry for term as string or map
34 type map: @container=@type, map from IRI to node object(s)
35 typed value: @value with @type datatype IRI
36 value object: @value with optional @type/@language/@direction/@index
37 vocabulary mapping: @vocab IRI/compact IRI/term/null for default vocabulary

## Supplementary Details
@direction values: "ltr" (left-to-right), "rtl" (right-to-left), null resets; processors must enforce BCP47 language tags in @language; expanded term definition fields: @id must be IRI or compact IRI; @type must be IRI or keyword; @container one of @list, @set, @index, @id, @type, @language; @reverse indicates reverse property; @language default applies to untyped strings; @context entries evaluated in order: map before IRI imports; @version numeric 1.1 only; processingMode API option accepts 'json-ld-1.0' and 'json-ld-1.1'; vocabulary mapping via @vocab must be IRI or null; prefix definitions map term to IRI namespace for compact IRIs; default object @default value applied during framing when input lacks frame branch; included blocks merge before expansion; id and index maps generate specialized index structures

## Reference Details
JSON-LD API (jsonld.js) method signatures:

expand(input: object|string, options?: {
  base?: string;
  expandContext?: object|string;
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  documentLoader?: (url:string)=>Promise<{document:object}>;
}): Promise<Array<object>>

compact(input: object|string, context: object|string, options?: {
  base?: string;
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  compactToRelative?: boolean;
  expandContext?: object|string;
  documentLoader?: ...;
}): Promise<object>

frame(input, frame, options?): Promise<object>

flatten(input, context?, options?): Promise<object>

normalize(input, options?: {algorithm?: 'URDNA2015'|'URGNA2012'; format?: 'application/n-quads'}): Promise<string>

toRDF(input, options?: {format?: 'application/n-quads'; produceGeneralizedRdf?: boolean}): Promise<string|object>

fromRDF(input: object|string, options?: {useNativeTypes?: boolean; rdfDirection?: 'i18n-datatype'|'compound-literal'}): Promise<object>

Examples:
import jsonld from 'jsonld';

const context = {
  '@version': 1.1,
  '@language': 'en',
  '@direction': 'ltr',
  '@vocab': 'http://schema.org/'
};
const doc = { '@context': context, 'name': 'Example' };

jsonld.compact(doc, context)
  .then(compacted => console.log(compacted))
  .catch(err => console.error('JSON-LD Error:', err));

Best practices:
- Always include @version=1.1 in context to prevent legacy processing
- Use explicit @vocab to shorten IRIs
- Define prefixes for common namespaces (schema, rdf, rdfs)
- Provide documentLoader with caching and error handling

Troubleshooting:
- Command: DEBUG=jsonld node script.js
  Expected: logs of documentLoader invocations and expansion steps
- If Error: "Invalid JSON-LD syntax at line X" -> verify quotes and commas
- Missing context definitions -> resulting keys remain unexpanded; fix @context mappings

## Information Dense Extract
active context: runtime term resolution; @direction: ltr|rtl|null; compact IRI: prefix:suffix; @context: map|IRI|array; @language: BCP47|null; @default: default in framing; embedded @context in node,value,graph,list,set; term definition: map(@id, @type, @container(@list,@set,@index,@id,@type,@language), @reverse,@language,@direction); frame: matching with @embed,@explicit; graph object: @graph,@id?,@index?; id map: @container=@id; implicitly named graph: @container=@graph; @included merges nodes; index map: @container=@index; JSON literal: @type=@json rdf:JSON; JSON-LD document: RDF dataset; internal rep: arrays,maps,scalars; processor ops: expand,compact,flatten,frame,normalize,toRDF,fromRDF; JSON-LD value: string|number|boolean|typed|lang-tag; keywords: @*; language map: @container=@language; list object: @list,@index?; local context: @context map; nested property: flattening; node object: no @value,@list,@set; node reference: @id-only; prefix: compact IRI namespace; processingMode: 'json-ld-1.1'|'json-ld-1.0'; scoped context: type|property; set object: @set,@index?; term: context key; term definition: string|map; type map: @container=@type; typed value: @value,@type; value object: @value plus optional properties; vocabulary mapping: @vocab|null.

## Sanitised Extract
Table of Contents:
1 active context
2 base direction
3 compact IRI
4 context
5 default language
6 default object
7 embedded context
8 expanded term definition
9 frame
10 frame object
11 graph object
12 id map
13 implicitly named graph
14 included block
15 index map
16 JSON literal
17 JSON-LD document
18 internal representation
19 JSON-LD Processor
20 JSON-LD value
21 keyword
22 language map
23 list object
24 local context
25 nested property
26 node object
27 node reference
28 prefix
29 processing mode
30 scoped context
31 set object
32 term
33 term definition
34 type map
35 typed value
36 value object
37 vocabulary mapping

Details:
1 active context resolves terms during processing
2 @direction: 'ltr','rtl',null sets base text direction
3 prefix:suffix compacts IRIs using context term prefix
4 @context: map/IRI/array for term-to-IRI, vocab, base, language, direction
5 @language: BCP47 code or null for untagged strings
6 @default key maps default values in framing
7 embedded @context may appear in nodes, values, graphs, lists, sets
8 term definition map with @id, @type, @container, @reverse, @language, @direction
9 frame document defines matching/embedding rules using @context, @embed, @explicit
10 frame objects map portions of input to output structure
11 graph object: map with @graph plus optional @id,@index
12 id map: @container=@id term mapping IRI to node objects
13 implicitly named graphs from @container=@graph definitions
14 @included alias merges node objects into output
15 index map: @container=@index maps to scalar or node/value/list/set or arrays
16 JSON literal uses @type @json and datatype rdf:JSON
17 JSON-LD document serializes RDF dataset with maps and arrays
18 internal representation uses arrays, maps, strings, numbers, booleans, null
19 Processor must implement expand, compact, flatten, frame, normalize, toRDF, fromRDF
20 JSON-LD value: string, number, boolean, typed value, language-tagged string
21 keywords: strings starting with @: @context,@id,@type,@value,@list,@set,etc
22 language map: @container=@language, keys=BCP47, values=string/null/arrays
23 list object: map with @list and optional @index
24 local context: @context map overrides active context
25 nested property: key whose value is map flattened into node object
26 node object: map without @value,@list,@set representing resource properties
27 node reference: @id-only node object
28 prefix: context term whose IRI used for compact IRI prefix
29 processing mode: default 'json-ld-1.1', set via @version or API option
30 scoped context: type- or property-scoped contexts via @context in term definitions
31 set object: map with @set and optional @index
32 term: context key mapping to IRI or definition
33 term definition: context entry for term as string or map
34 type map: @container=@type, map from IRI to node object(s)
35 typed value: @value with @type datatype IRI
36 value object: @value with optional @type/@language/@direction/@index
37 vocabulary mapping: @vocab IRI/compact IRI/term/null for default vocabulary

## Original Source
W3C Semantic Web Standards & JSON-LD
https://www.w3.org/TR/json-ld11/

## Digest of JSON_LD_TERMS

# JSON-LD Specific Term Definitions

## active context
A context that is used to resolve terms while the processing algorithm is running.

## base direction
Base direction for strings when no direct direction is specified; set via @direction = "ltr", "rtl", or null.

## compact IRI
Form prefix:suffix; prefix expands to an IRI in the context; suffix is appended to prefix IRI to form a full IRI.

## context
Map, IRI, or array defining term-to-IRI mappings, default vocabulary, base IRI, language, direction.

## default language
Language code (BCP47) or null; set via @language in context; applied to untagged strings.

## default object
Map containing @default entry; used by framing to fill missing values.

## embedded context
Context appearing as @context within node, value, graph, list, set, or expanded term definitions; may be map, IRI, or array.

## expanded term definition
Map containing one or more of @id, @type, @container, @reverse, @language, @direction entries to define a term.

## frame
JSON-LD document describing transformation of another JSON-LD document; contains matching and embedding rules.

## frame object
Map within frame document representing matching criteria for node or value objects; supports @id, @type, @embed, @explicit.

## graph object
Map with @graph entry and optional @id, @index; represents named graph; simple graph object lacks @id.

## id map
Map value of term with @container = @id; keys are IRIs representing @id; values are node objects.

## implicitly named graph
Named graph created from map entry where expanded term definition has @container = @graph.

## included block
Entry with key @included or alias; value is one or more node objects to be merged into output.

## index map
Map value of term with @container = @index; values may be string, number, boolean, null, node, value, list, set, or array of these.

## JSON literal
Literal with datatype IRI rdf:JSON; in value object @type = @json; valid JSON value.

## JSON-LD document
Serialization of an RDF dataset; composed of node, value, graph, list, or set objects.

## JSON-LD internal representation
Core data structures after parsing: arrays, maps, strings, numbers, booleans, null; used by algorithms.

## JSON-LD Processor
System implementing JSON-LD Processing Algorithms and API; must support at least expand, compact, flatten, frame, normalize, toRDF, fromRDF operations.

## JSON-LD value
String, number, true, false, typed value, or language-tagged string representing RDF literal.

## keyword
String specific to JSON-LD syntax (e.g., @context, @id, @type, @value, @list, @set).

## language map
Map value of term with @container = @language; keys are BCP47 codes; values are string, null, or array of strings/null.

## list object
Map with @list entry and optional @index; represents ordered collection.

## local context
Context specified via @context keyword within document; overrides active context.

## nested property
Map entry within node object whose value is map; its entries treated as if they were properties of the node.

## node object
Map not containing @value, @list, or @set (unless not top-level graph); represents properties of a node in the graph.

## node reference
Node object containing only @id key; used to reference existing node.

## prefix
Term mapping whose IRI value serves as prefix for compact IRIs.

## processing mode
Defines JSON-LD version rules; default json-ld-1.1; set via @version in context; API accepts options.processingMode = 'json-ld-1.0' or 'json-ld-1.1'.

## scoped context
@context within expanded term definition; type-scoped when term used as type, property-scoped when used as property.

## set object
Map with @set entry and optional @index; represents unordered collection.

## term
Short key in context mapping to IRI or expanded term definition; used as property name or type.

## term definition
Context entry where key is term; value is string (simple IRI) or map (expanded definition).

## type map
Map value of term with @container = @type; keys are IRIs representing types; values are node object or array of node objects.

## typed value
Map with @value and @type entries; @value is string; @type is datatype IRI.

## value object
Map with @value entry and optional @type, @language, @direction, @index entries; represents RDF literal.

## vocabulary mapping
Set via @vocab in context; IRI, compact IRI, term, or null; used to expand unprefixed terms to IRIs.

## Attribution
- Source: W3C Semantic Web Standards & JSON-LD
- URL: https://www.w3.org/TR/json-ld11/
- License: License if known
- Crawl Date: 2025-04-28T20:50:03.184Z
- Data Size: 13512089 bytes
- Links Found: 95873

## Retrieved
2025-04-28
library/SPARQL_RESULTS_JSON.md
# library/SPARQL_RESULTS_JSON.md
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
library/WIKIDATA_SPARQL.md
# library/WIKIDATA_SPARQL.md
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
library/VITEST_CONFIGURATION.md
# library/VITEST_CONFIGURATION.md
# VITEST_CONFIGURATION

## Crawl Summary
Node>=18, Vite>=5 required; install via npm/yarn/pnpm/bun or npx; test files named *.test.* or *.spec.*; package.json scripts: "test": "vitest", "coverage": "vitest run --coverage"; CLI: vitest/run, flags for watch, config path, reporters, output file, port, https, skip install checks; unified config: vitest.config or vite.config with `test` property; config file extensions (.js,.mjs,.cjs,.ts,.cts,.mts); highest priority to vitest.config; mergeConfig method for override; key config options: include, exclude, includeSource, globals, environment, threads/forks/pool, alias, setupFiles, coverage options; workspaces via vitest.workspace; env docblocks; troubleshooting: skip checks, bun command, debug server, pool memory, asset transforms, extend defaults.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Test File Naming and Scripts
 3 CLI Commands and Flags
 4 Configuration File Usage
 5 Core Configuration Options
 6 Workspaces Setup
 7 Environment Overrides
 8 Troubleshooting Patterns

1 Installation
 - Node>=18.0.0, Vite>=5.0.0
 - Install: npm install -D vitest | yarn add -D vitest | pnpm add -D vitest | bun add -D vitest
 - or run: npx vitest

2 Test File Naming and Scripts
 - Filename pattern: **/*.{test,spec}.?(c|m)[jt]s?(x)
 - package.json scripts:
   "test": "vitest"
   "coverage": "vitest run --coverage"

3 CLI Commands and Flags
 - vitest [files/globs] [--watch] [--config <path>] [--dir <path>] [--reporter <name>] [--outputFile <path>] [--port <number>] [--https] [--skip-install-checks] [--environment <env>] [--pool <type>]
 - vitest run = single run

4 Configuration File Usage
 - File names: vitest.config.js|ts|mjs|cjs|cts|mts or add `test` to vite.config same extensions
 - Priority: vitest.config > vite.config test property > CLI --config
 - Export default defineConfig({ test: { ... } })
 - mergeConfig(viteConfig, defineConfig({ test: { ... } }))

5 Core Configuration Options
 include: string[] = ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
 exclude: string[] = ['**/node_modules/**','**/dist/**', ...]
 includeSource: string[] = []
 name: string
 globals: boolean = false
 environment: 'node'|'jsdom'|'happy-dom'|'edge-runtime' = 'node'
 setupFiles: string[]
 alias: Record<string,string> or [{find, replacement, customResolver}]
 coverage.provider: 'c8'|'istanbul' = 'istanbul'
 coverage.reporter: string[] = ['text']
 coverage.exclude: string[] default coverage excludes
 threads: boolean = false
 forks: boolean (implicit via pool)
 pool: 'threads'|'forks'|'vmThreads'|'vmForks' = 'forks'
 deps.external: (string|RegExp)[] = [/\/node_modules\//]
 deps.inline: (string|RegExp)[] | true = []
 deps.fallbackCJS: boolean = false
 deps.cacheDir: string = 'node_modules/.vite'
 deps.optimizer.ssr.include, deps.optimizer.web.include, deps.optimizer.{mode}.enabled
 deps.web.transformAssets: boolean = true
 deps.web.transformCss: boolean = true
 deps.web.transformGlobPattern: RegExp[] = []
 deps.interopDefault: boolean = true
 deps.moduleDirectories: string[] = ['node_modules']
 server.sourcemap: 'inline'|boolean = 'inline'
 server.debug.dumpModules: boolean|string
 server.debug.loadDumppedModules: boolean
 server.deps.external, server.deps.inline, server.deps.fallbackCJS, server.deps.cacheDir
 benchmark.include: string[] = ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)']
 benchmark.exclude: string[] = ['node_modules','dist','.idea','.git','.cache']
 benchmark.includeSource: string[] = []
 benchmark.reporters: string|string[] = 'default'
 benchmark.outputJson: string|
 benchmark.compare: string|
 alias: same as resolve.alias in Vite
 globals flag CLI --globals

6 Workspaces Setup
 - vitest.workspace.ts/js/json exporting defineWorkspace([...patterns, { test:{ name, root, environment, setupFiles } }])

7 Environment Overrides
 - File header:
   // @vitest-environment <name>
   /** @vitest-environment <name> */
   // @jest-environment <env>
 - Supported builtins: node, jsdom, happy-dom, edge-runtime
 - Custom: package vitest-environment-<name> exporting Environment object: { name, transformMode, setup(){ teardown(){} } }

8 Troubleshooting Patterns
 - Skip install: VITEST_SKIP_INSTALL_CHECKS=1
 - Bun: use bun run test
 - Merge configs: mergeConfig(viteConfig, defineConfig)
 - Debug server modules: server.debug.dumpModules & loadDumppedModules
 - Prevent vmThreads leaks: poolOptions.vmThreads.memoryLimit
 - Asset/CSS transforms: deps.web.transformAssets/transformCss
 - Extend defaults: configDefaults.exclude


## Supplementary Details
Installation:
• Node.js>=18.0.0, Vite>=5.0.0
• Install devDependency with package manager or run via npx/vitest

Naming and Discovery:
• Default include pattern: **/*.{test,spec}.?(c|m)[jt]s?(x)
• Default exclude pattern: **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*
• in-source tests: includeSource globs for import.meta.vitest detection

Configuration Files:
• Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
• vitest.config has higher priority than vite.config
• use defineConfig from 'vitest/config' or from 'vite' with triple slash reference
• merge Vite and Vitest configs with mergeConfig

Workspaces:
• vitest.workspace.ts/js/json lists glob patterns or config blocks

CLI Options:
• --watch/-w default true unless CI
• --config <path> override config file
• --dir <path> scan base directory
• --reporter name|path array
• --outputFile path or record for multi reporters
• --pool threads|forks|vmThreads|vmForks
• --environment <env>
• --globals enable global APIs
• --skip-install-checks disables prompts

Debug and Server:
• server.sourcemap: inline|boolean (inline by default)
• server.debug.dumpModules: string|boolean
• server.debug.loadDumppedModules: boolean
• Dependencies resolution: server.deps.external, inline, fallbackCJS, cacheDir

Benchmarking:
• bench files: **/*.{bench,benchmark}.?(c|m)[jt]s?(x)
• bench.exclude: ['node_modules','dist','.idea','.git','.cache']
• bench.reporters: default|custom
• bench.outputJson and bench.compare flags

Module Handling:
• deps.optimizer.{web,ssr}.include, .enabled, .force
• deps.interopDefault toggles CJS default named export handling
• deps.moduleDirectories override


## Reference Details
### API: defineConfig({ test })
Signature:
  defineConfig(config: TestConfig & Record<string,unknown>) => TestConfig

### CLI Options
--config <path> string: config file path
--dir <path> string: root directory
--watch boolean: watch mode
--reporter <string|path>[]: ['default','verbose','json','html','junit']
--outputFile <path|Record<string,string>>: write output file per reporter
--pool <threads|forks|vmThreads|vmForks>: worker pool
--environment <env>: 'node'|'jsdom'|'happy-dom'|'edge-runtime'|<custom>
--globals boolean: enable global APIs
--skip-install-checks: disable automatic prompts
--coverage: alias for run --coverage
--port <number>: HTTP port for browser mode
--https: enable HTTPS for browser mode

### Configuration Options
TestConfig.test include: string[] default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
TestConfig.test exclude: string[] default ['**/node_modules/**','**/dist/**','**/cypress/**',...]
TestConfig.test includeSource: string[] default []
TestConfig.test name: string
test.globals: boolean default false
test.environment: string default 'node'
test.setupFiles: string[] default []
test.alias: Record<string,string>|AliasEntry[] default {}
test.coverage.provider: 'c8'|'istanbul' default 'istanbul'
test.coverage.reporter: string[] default ['text']
test.coverage.exclude: string[] default coverage excludes
test.threads: boolean default false
test.forks: boolean default true if pool=forks
test.pool: 'threads'|'forks'|'vmThreads'|'vmForks' default 'forks'
test.deps.external: (string|RegExp)[] default [/\/node_modules\//]
test.deps.inline: (string|RegExp)[]|true default []
test.deps.fallbackCJS: boolean default false
test.deps.cacheDir: string default 'node_modules/.vite'
test.deps.optimizer.ssr.include: string[]
test.deps.optimizer.web.include: string[]
test.deps.optimizer.{mode}.enabled: boolean default false
test.deps.web.transformAssets: boolean default true
test.deps.web.transformCss: boolean default true
test.deps.web.transformGlobPattern: RegExp[] default []
test.deps.interopDefault: boolean default true
test.deps.moduleDirectories: string[] default ['node_modules']
test.server.sourcemap: 'inline'|boolean default 'inline'
test.server.debug.dumpModules: boolean|string default false
test.server.debug.loadDumppedModules: boolean default false
test.server.deps.external/inline/fallbackCJS/cacheDir

### Workspaces API
defineWorkspace(entries: Array<string|WorkspaceConfig>) => WorkspaceConfig[]
WorkspaceConfig: { test?: Partial<TestConfig> }

### Example Configuration Patterns
```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(viteConfig, defineConfig({ test: {
  include: ['tests/unit/**/*.test.ts'],
  alias: { '@src': '/src' },
  environment: 'happy-dom',
  setupFiles: ['./tests/setup.ts'],
  coverage: { provider: 'c8', reporter: ['html'], exclude: ['**/*.spec.ts'] },
  deps: { optimizer: { web: { include: ['vue'] }, ssr: { enabled: true } } },
  server: { debug: { dumpModules: './.vitest/dump', loadDumppedModules: true } },
  pool: 'threads', threads: true
}}))
```

### Troubleshooting Commands
- Disable install checks: `export VITEST_SKIP_INSTALL_CHECKS=1`
- Bun command: `bun run test`
- Rebuild & link local fork:
  ```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
pnpm run build
pnpm link --global
cd ../your-project
pnpm link --global vitest
```

## Information Dense Extract
Vitest: Node>=18, Vite>=5. Install with npm/yarn/pnpm/bun or npx. Test files **/*.{test,spec}.?(c|m)[jt]s?(x). Scripts: "test": "vitest", "coverage": "vitest run --coverage". CLI: vitest/run, flags --watch, --config, --dir, --reporter, --outputFile, --port, --https, --pool, --environment, --globals, --skip-install-checks. Config: vitest.config.(js|ts|mjs|cjs|cts|mts) or vite.config with test property; priority: vitest.config > vite.config > CLI; merge via mergeConfig. Core options under test: include(string[]), exclude(string[]), includeSource(string[]), globals(boolean), environment(string), setupFiles(string[]), alias(map or array), coverage.provider(c8|istanbul), coverage.reporter(string[]), coverage.exclude(string[]), threads(boolean), pool(type), deps.{external,inline,fallbackCJS,cacheDir,optimizer.{web,ssr}.include,interopDefault,moduleDirectories}, server.{sourcemap,debug.{dumpModules,loadDumppedModules}}, benchmark.{include,exclude,reporters,outputJson,compare}. Workspaces: vitest.workspace.{js,ts,json} defineWorkspace([patterns, configBlocks]). Env docblocks: @vitest-environment <env>, @jest-environment <env>. Troubleshooting: VITEST_SKIP_INSTALL_CHECKS=1, bun run test, debug dumpModules, poolOptions.vmThreads.memoryLimit, deps.web.transformAssets/transformCss, extend defaults via configDefaults.exclude.

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Test File Naming and Scripts
 3 CLI Commands and Flags
 4 Configuration File Usage
 5 Core Configuration Options
 6 Workspaces Setup
 7 Environment Overrides
 8 Troubleshooting Patterns

1 Installation
 - Node>=18.0.0, Vite>=5.0.0
 - Install: npm install -D vitest | yarn add -D vitest | pnpm add -D vitest | bun add -D vitest
 - or run: npx vitest

2 Test File Naming and Scripts
 - Filename pattern: **/*.{test,spec}.?(c|m)[jt]s?(x)
 - package.json scripts:
   'test': 'vitest'
   'coverage': 'vitest run --coverage'

3 CLI Commands and Flags
 - vitest [files/globs] [--watch] [--config <path>] [--dir <path>] [--reporter <name>] [--outputFile <path>] [--port <number>] [--https] [--skip-install-checks] [--environment <env>] [--pool <type>]
 - vitest run = single run

4 Configuration File Usage
 - File names: vitest.config.js|ts|mjs|cjs|cts|mts or add 'test' to vite.config same extensions
 - Priority: vitest.config > vite.config test property > CLI --config
 - Export default defineConfig({ test: { ... } })
 - mergeConfig(viteConfig, defineConfig({ test: { ... } }))

5 Core Configuration Options
 include: string[] = ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
 exclude: string[] = ['**/node_modules/**','**/dist/**', ...]
 includeSource: string[] = []
 name: string
 globals: boolean = false
 environment: 'node'|'jsdom'|'happy-dom'|'edge-runtime' = 'node'
 setupFiles: string[]
 alias: Record<string,string> or [{find, replacement, customResolver}]
 coverage.provider: 'c8'|'istanbul' = 'istanbul'
 coverage.reporter: string[] = ['text']
 coverage.exclude: string[] default coverage excludes
 threads: boolean = false
 forks: boolean (implicit via pool)
 pool: 'threads'|'forks'|'vmThreads'|'vmForks' = 'forks'
 deps.external: (string|RegExp)[] = [/'/node_modules'//]
 deps.inline: (string|RegExp)[] | true = []
 deps.fallbackCJS: boolean = false
 deps.cacheDir: string = 'node_modules/.vite'
 deps.optimizer.ssr.include, deps.optimizer.web.include, deps.optimizer.{mode}.enabled
 deps.web.transformAssets: boolean = true
 deps.web.transformCss: boolean = true
 deps.web.transformGlobPattern: RegExp[] = []
 deps.interopDefault: boolean = true
 deps.moduleDirectories: string[] = ['node_modules']
 server.sourcemap: 'inline'|boolean = 'inline'
 server.debug.dumpModules: boolean|string
 server.debug.loadDumppedModules: boolean
 server.deps.external, server.deps.inline, server.deps.fallbackCJS, server.deps.cacheDir
 benchmark.include: string[] = ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)']
 benchmark.exclude: string[] = ['node_modules','dist','.idea','.git','.cache']
 benchmark.includeSource: string[] = []
 benchmark.reporters: string|string[] = 'default'
 benchmark.outputJson: string|
 benchmark.compare: string|
 alias: same as resolve.alias in Vite
 globals flag CLI --globals

6 Workspaces Setup
 - vitest.workspace.ts/js/json exporting defineWorkspace([...patterns, { test:{ name, root, environment, setupFiles } }])

7 Environment Overrides
 - File header:
   // @vitest-environment <name>
   /** @vitest-environment <name> */
   // @jest-environment <env>
 - Supported builtins: node, jsdom, happy-dom, edge-runtime
 - Custom: package vitest-environment-<name> exporting Environment object: { name, transformMode, setup(){ teardown(){} } }

8 Troubleshooting Patterns
 - Skip install: VITEST_SKIP_INSTALL_CHECKS=1
 - Bun: use bun run test
 - Merge configs: mergeConfig(viteConfig, defineConfig)
 - Debug server modules: server.debug.dumpModules & loadDumppedModules
 - Prevent vmThreads leaks: poolOptions.vmThreads.memoryLimit
 - Asset/CSS transforms: deps.web.transformAssets/transformCss
 - Extend defaults: configDefaults.exclude

## Original Source
Node.js Core Modules, Fetch API & Vitest Testing Framework
https://vitest.dev/

## Digest of VITEST_CONFIGURATION

# Installation Requirements and Commands

- Node.js >= 18.0.0
- Vite >= 5.0.0
- Install locally in package.json:
  ```bash
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
  ```
- Or run without install via:
  ```bash
  npx vitest
  ```

# Writing Tests

File naming: include `.test.` or `.spec.` in filenames.

Example:
```js
// sum.js
export function sum(a, b) { return a + b }

// sum.test.js
import { test, expect } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```
Add to package.json:
```json
{
  "scripts": { "test": "vitest" }
}
```
Run tests:
```bash
npm run test
# or yarn test, pnpm test, bun run test
```

# CLI Usage

```text
vitest [options] [files/globs]
vitest run [options]
```  
Common flags:
- `-w, --watch`           Enable watch mode (default: true unless CI)
- `--config <path>`       Path to vitest.config file
- `--dir <path>`          Base directory to scan for tests (default: project root)
- `--reporter <name>`     Built-in: default, verbose, json, html, junit
- `--outputFile <path>`   When using json/html/junit reporter, write results to file
- `--port <number>`       Override HTTP port for browser mode
- `--https`               Enable HTTPS for browser mode
- `--coverage`            Run with coverage collection (alias: vitest run --coverage)
- `--skip-install-checks` Disable automatic dependency install prompts (`VITEST_SKIP_INSTALL_CHECKS=1`)

# Configuration File Priority and Extensions

Vitest reads configuration from:
1. `vitest.config.ts|js|mjs|cjs|cts|mts` (highest)
2. `vite.config.ts|js|mjs|cjs|cts|mts` with top-level `test` property
3. `--config` CLI override

Vitest config file example:
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    include: ['**/*.test.{js,ts}'],
    exclude: ['node_modules', 'dist'],
    globals: true,
    environment: 'jsdom',
    coverage: { provider: 'istanbul', reporter: ['text', 'lcov'] },
    alias: { '@': '/src' },
    setupFiles: ['./test-setup.ts'],
    threads: true
  }
})
```

# Core Configuration Options Reference

| Option               | Type                              | Default                                                          | CLI Flag                | Description                                                         |
|----------------------|-----------------------------------|------------------------------------------------------------------|-------------------------|---------------------------------------------------------------------|
| include              | string[]                          | ['**/*.{test,spec}.?(c|m)[jt]s?(x)']                             | vitest [include]        | Glob patterns for test files                                        |
| exclude              | string[]                          | ['**/node_modules/**', '**/dist/**', ...]                        | --exclude <glob>        | Glob patterns to exclude from test discovery                        |
| includeSource        | string[]                          | []                                                               |                         | In-source tests containing import.meta.vitest                        |
| name                 | string                            | undefined                                                        |                         | Custom project/process name                                         |
| globals              | boolean                           | false                                                            | --globals               | Enable Jest-style global APIs                                        |
| environment          | 'node'|'jsdom'|'happy-dom'|...   | 'node'                                                           | --environment=<env>     | Test environment                                                    |
| setupFiles           | string[]                          | []                                                               |                         | Files to run before tests                                            |
| coverage.provider    | 'c8'|'istanbul'                   | 'istanbul'                                                       | --coverage              | Coverage instrumentation provider                                   |
| coverage.reporter    | string[]                          | ['text']                                                        |                         | Coverage reporters                                                   |
| coverage.exclude     | string[]                          | default coverage exclude patterns                                |                         | Exclude globs from coverage report                                   |
| alias                | Record<string,string>|AliasEntry[]|      | {}                                                               |                         | Resolve.alias mappings for tests                                      |
| threads              | boolean                           | false                                                            | --pool=threads          | Use threads pool                                                     |
| forks                | boolean                           | true (default pool)                                              | --pool=forks            | Use forks pool                                                       |
| pool                 | 'threads'|'forks'|'vmThreads'|... | 'forks'                                                          | --pool=<type>           | Pool type for running tests                                          |

# Workspaces Support

Create a `vitest.workspace.ts|js|json` file:
```ts
import { defineWorkspace } from 'vitest/config'
export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{unit,e2e}.ts',
  { test: { name: 'node', environment: 'node' } },
  { test: { name: 'happy-dom', environment: 'happy-dom' } }
])
```

# Environment Docblocks and Comments

At top of test files:
```js
// @vitest-environment jsdom
/** @vitest-environment happy-dom */
// @jest-environment jsdom  (compatible)
```

# Troubleshooting and Best Practices

- Automatic dependency prompts: set `VITEST_SKIP_INSTALL_CHECKS=1`
- Bun users: use `bun run test` not `bun test`
- Merge Vite and Vitest configs with:
  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config'
  export default mergeConfig(viteConfig, defineConfig({ test: { /* overrides */ } }))
  ```
- Debugging server modules:
  ```ts
  test: {
    server: {
      debug: { dumpModules: '/tmp/vitest-dump', loadDumppedModules: true }
    }
  }
  ```
- Clear pool memory leaks in vmThreads by setting `poolOptions.vmThreads.memoryLimit`
- Enable asset transforms in web mode:
  ```ts
  test: { deps: { web: { transformAssets: true, transformCss: true } } }
  ```
- Use `configDefaults` to extend defaults:
  ```ts
  import { configDefaults, defineConfig } from 'vitest/config'
  export default defineConfig({
    test: { exclude: [...configDefaults.exclude, 'custom/**'] }
  })
  ```

## Attribution
- Source: Node.js Core Modules, Fetch API & Vitest Testing Framework
- URL: https://vitest.dev/
- License: License
- Crawl Date: 2025-04-27T13:48:08.877Z
- Data Size: 44129862 bytes
- Links Found: 26774

## Retrieved
2025-04-27
library/LINKED_DATA_BP.md
# library/LINKED_DATA_BP.md
# LINKED_DATA_BP

## Crawl Summary
HTTP URIs for identifying resources; content negotiation mappings for HTML, Turtle, JSON-LD; URI stability rules; HTTP redirection codes for persistence; embedding license metadata via dcterms:license; reuse of DCAT, org, qb vocabularies with key classes and properties; mapping relational data to RDF via R2RML TriplesMaps; serialization formats; machine access methods including SPARQL GET parameters and Accept headers; DCAT-based dataset metadata; announcement channels; persistence policy documentation.

## Normalised Extract
Table of Contents
1. URI Design Principles
2. License Metadata Embedding
3. Vocabulary Reuse
4. RDF Conversion via R2RML
5. Machine-Access Interfaces
6. Dataset Catalog Description
7. Persistence Policy

1. URI Design Principles
Use HTTP scheme only
Accept header routing:
 Accept:text/html→text/html; charset=UTF-8
 Accept:text/turtle→text/turtle; charset=UTF-8
 Accept:application/ld+json→application/ld+json
Avoid query parameters conveying state
Define persistent URI policy with 301 and 303 redirections
PURL or HTTPS-only service for secure environments

2. License Metadata Embedding
Assign dcterms:license triple per dataset
Value = license dereferenceable URI (e.g. https://creativecommons.org/licenses/by/4.0/)
Include within RDF output header

3. Vocabulary Reuse
DCAT core:
 dcat:Dataset
 dcat:distribution→dcat:Distribution
 dcat:accessURL→IRI
Organization ontology:
 org:Organization
 org:hasUnit
Data Cube:
 qb:DataSet
 qb:Observation
 qb:measureType

4. RDF Conversion via R2RML
Define rr:TriplesMap
 rr:logicalTable tableName
 rr:subjectMap template
 rr:predicateObjectMap predicate and column mapping
Serialize to Turtle or JSON-LD

5. Machine-Access Interfaces
SPARQL endpoint:
 GET /sparql?query=<sparql>&default-graph-uri=<IRI>
 Header Accept:application/sparql-results+json
REST JSON-LD:
 GET /api/{resource} returns application/ld+json
Raw download:
 GET /data/{dataset}.ttl returns text/turtle

6. Dataset Catalog Description
Publish dcat:Dataset graph with:
 dcterms:title; dcterms:description
 dcterms:issued; dcterms:modified
 dcat:distribution {dcat:accessURL,dcat:mediaType}

7. Persistence Policy
Host /uri-policy.txt plain text
List 301 and 303 rules
Define retention period and change procedure

## Supplementary Details
1. HTTP Server Configuration
Apache example for content negotiation:
  <Directory "/var/www/html">
    Options MultiViews
    AddType application/ld+json .jsonld
    AddType text/turtle .ttl
  </Directory>

2. SPARQL Endpoint Setup
Fuseki example:
  fuseki-server --update --mem /dataset
  SPARQL endpoint at http://localhost:3030/dataset/sparql
  Accept header handles JSON, XML, CSV

3. R2RML Processor Invocation
  rrloader --triples-map mapping.ttl --output graph.ttl

4. DCAT Publishing
  curl -X PUT -H "Content-Type: text/turtle" \
    --data @dcat.ttl http://example.gov/catalog

5. Announcing Catalog
  echo "New dataset published at http://example.gov/catalog" | mail -s "New LOD" data-list@example.gov


## Reference Details
A. SPARQL HTTP Protocol
Method: GET
URL: /sparql
Query parameters:
 query (required): SPARQL query string
 default-graph-uri (optional, repeatable): IRI
 named-graph-uri (optional, repeatable): IRI
 output: determined by Accept header

Headers:
 Accept: application/sparql-results+json | application/ld+json | text/csv

Response: 200 OK
 Content-Type: as negotiated
 Body: SPARQL Results XML/JSON or RDF graph serialization

B. R2RML TriplesMap Syntax (Turtle)
Prefix rr: <http://www.w3.org/ns/r2rml#>
:TriplesMap1
 rr:logicalTable [ rr:tableName "facilities" ];
 rr:subjectMap [
   rr:template "http://example.gov/facility/{id}";
   rr:class <http://example.gov/schema#Facility>
 ];
 rr:predicateObjectMap [
   rr:predicate <http://www.w3.org/2003/01/geo/wgs84_pos#lat>;
   rr:objectMap [ rr:column "latitude" ]
 ];

C. JSON-LD API Endpoint
GET /api/facility/{id}
Headers:
 Accept: application/ld+json

Response:
 HTTP/1.1 200 OK
 Content-Type: application/ld+json; charset=UTF-8
 Body:
 {
   "@context": [ ... ],
   "@id": "http://example.gov/facility/123",
   "@type": "Facility",
   "latitude": 41.40338,
   "longitude": 2.17403
 }

D. Troubleshooting
Issue: 406 Not Acceptable
 Command: curl -H "Accept: application/ld+json" http://example.gov/resource
 Expected: application/ld+json body
 Fix: enable AddType for .jsonld and MultiViews in server config

Issue: SPARQL endpoint 404
 Check: correct path /sparql, verify server running
 Command: curl -I http://localhost:3030/dataset/sparql
 Expected: HTTP/1.1 200 OK

## Information Dense Extract
HTTP URIs only; content negotiation: text/html, text/turtle, application/ld+json via Accept header; URIs omit dynamic tokens; persistent policy with 301/303 redirection or PURL service; embed dcterms:license per dataset; reuse DCAT (dcat:Dataset, dcat:distribution, dcat:accessURL), org (org:Organization, org:hasUnit), qb (qb:DataSet, qb:Observation, qb:measureType); map relational tables via R2RML TriplesMap (rr:logicalTable tableName, rr:subjectMap template+class, rr:predicateObjectMap column); serialize to Turtle/JSON-LD; SPARQL GET /sparql?query=&default-graph-uri= with Accept negotiation; JSON-LD REST API GET /api/{resource}; raw download GET /data/{dataset}.ttl; publish catalog using DCAT triples with dcterms:title,description,issued,modified, dcat:distribution(accessURL,mediaType); announce via email/blog; host /uri-policy.txt listing 301/303 rules and retention; Apache MultiViews & AddType config; Fuseki --update --mem /dataset; rrloader invocation; curl PUT for DCAT; curl troubleshooting for 406 and 404

## Sanitised Extract
Table of Contents
1. URI Design Principles
2. License Metadata Embedding
3. Vocabulary Reuse
4. RDF Conversion via R2RML
5. Machine-Access Interfaces
6. Dataset Catalog Description
7. Persistence Policy

1. URI Design Principles
Use HTTP scheme only
Accept header routing:
 Accept:text/htmltext/html; charset=UTF-8
 Accept:text/turtletext/turtle; charset=UTF-8
 Accept:application/ld+jsonapplication/ld+json
Avoid query parameters conveying state
Define persistent URI policy with 301 and 303 redirections
PURL or HTTPS-only service for secure environments

2. License Metadata Embedding
Assign dcterms:license triple per dataset
Value = license dereferenceable URI (e.g. https://creativecommons.org/licenses/by/4.0/)
Include within RDF output header

3. Vocabulary Reuse
DCAT core:
 dcat:Dataset
 dcat:distributiondcat:Distribution
 dcat:accessURLIRI
Organization ontology:
 org:Organization
 org:hasUnit
Data Cube:
 qb:DataSet
 qb:Observation
 qb:measureType

4. RDF Conversion via R2RML
Define rr:TriplesMap
 rr:logicalTable tableName
 rr:subjectMap template
 rr:predicateObjectMap predicate and column mapping
Serialize to Turtle or JSON-LD

5. Machine-Access Interfaces
SPARQL endpoint:
 GET /sparql?query=<sparql>&default-graph-uri=<IRI>
 Header Accept:application/sparql-results+json
REST JSON-LD:
 GET /api/{resource} returns application/ld+json
Raw download:
 GET /data/{dataset}.ttl returns text/turtle

6. Dataset Catalog Description
Publish dcat:Dataset graph with:
 dcterms:title; dcterms:description
 dcterms:issued; dcterms:modified
 dcat:distribution {dcat:accessURL,dcat:mediaType}

7. Persistence Policy
Host /uri-policy.txt plain text
List 301 and 303 rules
Define retention period and change procedure

## Original Source
Linked Data Best Practices
https://www.w3.org/TR/ld-bp/

## Digest of LINKED_DATA_BP

# Best Practices for Publishing Linked Data

retrieved: 2024-06-11
source data size: 12870794 bytes

## 1 URI Design Principles

- Use HTTP URIs as global identifiers.
- Support content negotiation for at least one machine-readable form:
  - Accept: text/html → HTML representation
  - Accept: text/turtle → Turtle serialization
  - Accept: application/ld+json → JSON-LD serialization
- URIs must omit session tokens, timestamps or stateful parameters; remain stable indefinitely.
- Implement a persistence strategy:
  - Use 301 Moved Permanently when resource URIs change.
  - Use 303 See Other for non-information resources.
  - Leverage PURL or HTTPS-only redirection services for high-security domains.

## 2 License Specification

- Embed license metadata with each dataset:
  - dcterms:license → <license URI>
  - Example: dcterms:license “https://creativecommons.org/licenses/by/4.0/”

## 3 Standard Vocabularies

- Reuse existing vocabularies; extend only when necessary.
- Key vocabularies and their core classes/properties:
  - DCAT:
    - dcat:Dataset
    - dcat:distribution (link to dcat:Distribution)
    - dcat:accessURL (IRI to service endpoint)
  - DCAT-AP profiles for government data catalogs.
  - Organization Ontology:
    - org:Organization
    - org:hasUnit
  - Data Cube Vocabulary:
    - qb:DataSet
    - qb:Observation
    - qb:measureType

## 4 Data Conversion

- Map source records to RDF triples via scripts or mapping languages:
  - R2RML mappings: define rr:TriplesMap with rr:subjectMap, rr:predicateObjectMap.
  - Example Turtle snippet:
    @prefix rr: <http://www.w3.org/ns/r2rml#> .
    :TriplesMap1
      rr:logicalTable [ rr:tableName “facilities” ];
      rr:subjectMap [ rr:template “http://example.gov/facility/{id}”; rr:class ex:Facility];
      rr:predicateObjectMap [ rr:predicate ex:latitude; rr:objectMap [ rr:column “lat” ] ] .
- Serialize converted graph to preferred formats: Turtle, JSON-LD, RDF/XML.

## 5 Machine-Access Methods

- Direct URI resolution (“follow your nose”).
- SPARQL HTTP Protocol endpoint:
  - HTTP GET /sparql?query=<sparql>&default-graph-uri=<graph>
  - Required headers: Accept: application/sparql-results+json or application/ld+json
- RESTful JSON-LD API endpoints:
  - GET /api/facility/{id} → returns application/ld+json
- Raw dataset download:
  - GET /data/dataset.ttl
  - Content-Type: text/turtle; charset=UTF-8

## 6 Dataset Announcement & Metadata

- Publish catalog description with DCAT:
  - dcat:Dataset
  - dcterms:title; dcterms:description
  - dcterms:issued; dcterms:modified
  - dcat:distribution with dcat:accessURL and dcat:mediaType
- Announce via:
  - Mailing lists, blogs, Linked Data portals
  - Register SPARQL endpoint in federation indices

## 7 Persistence and Social Contract

- Define URI policy document at /uri-policy.txt:
  - Outline redirection rules, retention commitments
- Provide human- and machine-readable stability statement:
  - e.g., HTTP GET /v1/{resource} → 301 to /v2/{resource}


## Attribution
- Source: Linked Data Best Practices
- URL: https://www.w3.org/TR/ld-bp/
- License: License if known
- Crawl Date: 2025-04-29T05:49:55.665Z
- Data Size: 12870794 bytes
- Links Found: 50794

## Retrieved
2025-04-29
library/SHEX_JS.md
# library/SHEX_JS.md
# SHEX_JS

## Crawl Summary
Installation: npm install --save shex
Validation CLI: validate -x <schema> -d <data> -s <shape> -n <node>
Validation Lib: shex.Parser, shex.Validator.validate(store,node,shape)
ShExLoader API: load(shexc:turtle) -> {schema,data}
Conversion CLI: shex-to-json, json-to-shex
Materialize: materialize -t schema -j vars.json [-r rootIRI]
Branches: lerna monorepo, shex-test branch alignment via package.json

## Normalised Extract
Table of Contents
1 Installation
2 CLI Validation
3 Validation Library
4 ShExLoader API
5 Conversion CLI
6 Materialize

1 Installation
Install via npm:
npm install --save shex

2 CLI Validation
Command: validate -x <schema> -d <data> -s <shape> -n <node>
Parameters:
  -x schema URL or file
  -j JSON schema file
  -d data source [IRI|path]
  -s shape IRI
  -n node IRI
Output: JSON with type,node,shape,solution or null

3 Validation Library
API:
  shex.Parser(shexc).parse(text) -> schemaAST
  Validator(schemaAST).validate(store,node,shape) -> resultJSON
Dependencies: n3.Store(), n3.Parser({baseIRI,format:'text/turtle'})

4 ShExLoader API
Signature: ShExLoader.load({shexc: [String]}, {turtle: [String]}) -> Promise<{schema:Array, data:Array}>
Use:
  RdfJsDb = ctor(loaded.data)
  ShExValidator(schema,dataDB,options).validateShapeMap([{node,shape}]) -> result
Options: results: 'api'|'tree'
Constants: ShExValidator.Start

5 Conversion CLI
shex-to-json <schema.shex> -> stdout JSON
json-to-shex <schema.json> -> stdout ShExC

6 Materialize
materialize -t <target.schema> [-j vars.json] [-r rootIRI]
Vars file: map variable IRI to substitution value
Default rootIRI: tag:eric@w3.org/2016/root


## Supplementary Details
Parameters and Defaults
validate CLI:
  -x, --schema string (required)
  -j, --json-schema string
  -d, --data string (required)
  -s, --shape string (required)
  -n, --node string (required)
Options:
  SLOW: timeout ms for slow tests
  BRANCH: git branch for HTTP tests

Loader init:
  fetch: function(url)->Promise<string>
  rdfjs: RdfJsParser module (must implement Parser and Store)

Validator options:
  results: 'api' returns JSON, 'tree' returns internal tree

Materialize options:
  -t target schema path or URL
  -j JSON vars file path
  -r RDF root IRI (default tag:eric@w3.org/2016/root)

Environment Variables:
  SLOW, BRANCH, TEST-cli


## Reference Details
API Specifications

Module shex.Parser
  Constructor: Parser(shexcIRI:String)
  Method parse(input:String):SchemaObj

Class shex.Validator
  Constructor(schema:SchemaObj)
  Method validate(store:QuadStore, node:String, shape:String):ValidationResult
    returns ValidationResult JSON

Module @shexjs/loader
  Function loader(options:{fetch:Function, rdfjs:Object}) -> ShExLoader
  ShExLoader.load(shexc:{shexc:Array<String>}, data:{turtle:Array<String>}):Promise<{schema:Array<SchemaObj>, data:Array<Quad>}> 

Class @shexjs/validator.ShExValidator
  Constructor(schema:Array<SchemaObj>, db:QuadStore, options:{results:String})
  Static Start:String
  Method validateShapeMap(shapeMap:Array<{node:String,shape:String}>):ShapeMapResult

CLI Commands

validate
  Usage: validate [options]
  Options:
    -x, --schema <schema>    ShExC URL or file
    -j, --json-schema <file> ShEx JSON schema file
    -d, --data <data>        RDF data URL or file
    -s, --shape <shape>      Shape IRI
    -n, --node <node>        Node IRI
    --help

shex-to-json
  Usage: shex-to-json <schema>
  Output: JSON schema to stdout

json-to-shex
  Usage: json-to-shex <schema.json>
  Output: ShExC to stdout

materialize
  Usage: materialize -t <target> [-j <vars.json>] [-r <rootIRI>]
  Options:
    -t, --target <schema>    Target ShExC schema
    -j, --vars <vars.json>   JSON vars file
    -r, --root <IRI>         RDF root IRI

Best Practices
  Use ShExLoader to reduce callback complexity
  Use Start constant for entry shape
  Set results:'api' for programmatic use
  Validate relative IRIs: CLI resolves -s,-n relative to sources

Troubleshooting
  SLOW tests hung: set SLOW=<ms> env var
  HTTP tests fail: set BRANCH=<branch>
  shex-test branch misalignment: ensure package.json shex-test field matches shexTest branch
  Lerna: run lerna bootstrap after changing dependencies


## Information Dense Extract
npm install --save shex; CLI: validate -x schema.shex -d data.ttl -s shapeIRI -n nodeIRI -> JSON; shex.Parser(IRI).parse(text)->SchemaAST; new shex.Validator(SchemaAST).validate(store,node,shape)->ValidationResult; ShExLoader=require('@shexjs/loader')({fetch, rdfjs}); ShExLoader.load({shexc:[...]},{turtle:[...]}).then({schema,data})->RdfJsDb(data)->new ShExValidator(schema,db,{results:'api'}).validateShapeMap([{node,shape:ShExValidator.Start}])->ShapeMapResult; Conversion: shex-to-json|json-to-shex; materialize -t target.shex -j vars.json -r rootIRI; Default rootIRI=tag:eric@w3.org/2016/root; Env SLOW,BRANCH for tests; APIs: Parser.parse(String)->SchemaObj; Validator.validate(QuadStore,String,String)->ValidationResult; Loader.load(Object,Object)->Promise<{schema:Array, data:Array}>; ShExValidator.validateShapeMap(Array)->ShapeMapResult

## Sanitised Extract
Table of Contents
1 Installation
2 CLI Validation
3 Validation Library
4 ShExLoader API
5 Conversion CLI
6 Materialize

1 Installation
Install via npm:
npm install --save shex

2 CLI Validation
Command: validate -x <schema> -d <data> -s <shape> -n <node>
Parameters:
  -x schema URL or file
  -j JSON schema file
  -d data source [IRI|path]
  -s shape IRI
  -n node IRI
Output: JSON with type,node,shape,solution or null

3 Validation Library
API:
  shex.Parser(shexc).parse(text) -> schemaAST
  Validator(schemaAST).validate(store,node,shape) -> resultJSON
Dependencies: n3.Store(), n3.Parser({baseIRI,format:'text/turtle'})

4 ShExLoader API
Signature: ShExLoader.load({shexc: [String]}, {turtle: [String]}) -> Promise<{schema:Array, data:Array}>
Use:
  RdfJsDb = ctor(loaded.data)
  ShExValidator(schema,dataDB,options).validateShapeMap([{node,shape}]) -> result
Options: results: 'api'|'tree'
Constants: ShExValidator.Start

5 Conversion CLI
shex-to-json <schema.shex> -> stdout JSON
json-to-shex <schema.json> -> stdout ShExC

6 Materialize
materialize -t <target.schema> [-j vars.json] [-r rootIRI]
Vars file: map variable IRI to substitution value
Default rootIRI: tag:eric@w3.org/2016/root

## Original Source
RDF Validation: SHACL & ShEx
https://github.com/shexSpec/shex.js#readme

## Digest of SHEX_JS

# Installation

Install shex.js via npm:

```bash
npm install --save shex
```

# CLI Validation

Use the validate executable to validate RDF data against a ShEx schema:

```bash
./node_modules/shex/bin/validate \
    -x http://shex.io/examples/Issue.shex \
    -d http://shex.io/examples/Issue1.ttl \
    -s http://shex.io/examples/IssueShape \
    -n http://shex.io/examples/Issue1
```

Options:

  -x  --schema          ShExC schema URL or file path
  -j  --json-schema     ShEx JSON schema file
  -d  --data            RDF data URL, file, or format option
  -s  --shape           Target shape IRI
  -n  --node            Target node IRI

Outputs a JSON with fields: type, node, shape, solution or null on failure.

# Validation Library

```javascript
const shex = require('shex');
const N3   = require('n3');

// Load schema
const schemaText = await fetch(shexc).then(r=>r.text());
const schema = shex.Parser(shexc).parse(schemaText);

// Load data
const dataText = await fetch(data).then(r=>r.text());
const store    = new N3.Store();
n3.Parser({baseIRI: data, format: 'text/turtle'})
  .parse(dataText, (err, quad)=> { if(quad) store.addQuad(quad); });

// Validate
const result = new shex.Validator(schema)
  .validate(store, node, shape);
console.log(result);
```

# ShExLoader API

```javascript
const ShExLoader = require('@shexjs/loader')({
  fetch:    require('node-fetch'),
  rdfjs:    require('n3')
});
const {ctor: RdfJsDb} = require('@shexjs/neighborhood-rdfjs');
const {ShExValidator}= require('@shexjs/validator');

ShExLoader.load({shexc: [shexc]}, {turtle: [data]})
  .then(loaded => {
    const db        = RdfJsDb(loaded.data);
    const validator = new ShExValidator(loaded.schema, db, {results: 'api'});
    const smap      = [{node, shape: ShExValidator.Start}];
    const res       = validator.validateShapeMap(smap);
    console.log(JSON.stringify(res, null, 2));
});
```

# Conversion CLI

- Convert ShExC to JSON:

```bash
./node_modules/shex/bin/shex-to-json http://shex.io/examples/Issue.shex > Issue.json
```

- Convert JSON to ShExC:

```bash
./node_modules/shex/bin/json-to-shex Issue.json > Issue.shex
```

# Materialize

Map validation output to a target schema:

```bash
materialize -t target_schema.shex -j vars.json [-r rootIRI]
```

Vars file example:

```json
{
  "urn:local:Demographics:constSys": "System"
}
```

Default root IRI: tag:eric@w3.org/2016/root


## Attribution
- Source: RDF Validation: SHACL & ShEx
- URL: https://github.com/shexSpec/shex.js#readme
- License: License if known
- Crawl Date: 2025-04-28T14:52:22.643Z
- Data Size: 651036 bytes
- Links Found: 5063

## Retrieved
2025-04-28
library/GEONAMES_WS.md
# library/GEONAMES_WS.md
# GEONAMES_WS

## Crawl Summary
Detailed parameter lists, endpoints and defaults for GeoNames REST webservices: authentication, usage limits, format selection, global parameters (type,style,maxRows,lang). Postal code services: postalCodeSearch, postalCodeLookupJSON, findNearbyPostalCodes, postalCodeCountryInfo. Reverse geocoding: findNearbyPlaceName, findNearby, extendedFindNearby. Feature: get, children, hierarchy, siblings, neighbours. Country services: countryInfo, countryCode, countrySubdivision. Ocean/neighbourhood. Elevation: srtm1, srtm3, astergdem, gtopo30. Timezone: timezone with offsets.

## Normalised Extract
Table of Contents 1 Authentication 2 Request Essentials 3 Global Parameters 4 Postal Code Services 5 Reverse Geocoding 6 Feature Services 7 Country Services 8 Ocean & Neighbourhood 9 Elevation Services 10 Timezone Service

1 Authentication Mandatory username parameter; register account; 10,000 credits/day, 1,000/hour free; secure endpoint https://secure.geonames.org

2 Request Essentials Method GET/POST; response XML or JSON; URL encode string parameters

3 Global Parameters type=xml|JSON; style=SHORT|MEDIUM|LONG|FULL (default MEDIUM); maxRows=int; lang=ISO-639-1

4 Postal Code Services
4.1 postalCodeSearch endpoint: /postalCodeSearch
 parameters: postalcode,placename,postalcode_startsWith,placename_startsWith,country (repeatable),countryBias,maxRows (default10),operator=AND|OR,isReduced=true|false,east,west,north,south
 response fields: postalcode,placename,lat,lng,countryCode,adminName1,adminCode1,distance

4.2 postalCodeLookupJSON endpoint: /postalCodeLookupJSON
 parameters: postalcode,country,maxRows=20,charset=UTF-8,callback
 response: JSON array sorted postalcode,placename

4.3 findNearbyPostalCodes endpoint: /findNearbyPostalCodes
 parameters: lat,lng OR postalcode,country; radius=30km free|160km premium; maxRows=5 free|2500 premium; style,localCountry,isReduced
 response: sorted by distance

4.4 postalCodeCountryInfo endpoint: /postalCodeCountryInfo
 parameter: none
 response: list of country codes

5 Reverse Geocoding
5.1 findNearbyPlaceName endpoint: /findNearbyPlaceName
 parameters: lat,lng,lang,radius,maxRows=10,style,localCountry,cities=cities1000|cities5000|cities15000
 response: nearest populated place

5.2 findNearby endpoint: /findNearby
 parameters: lat,lng,featureClass,featureCode (repeat/exclude),radius,maxRows,style,localCountry

5.3 extendedFindNearby endpoint: /extendedFindNearby
 parameters: lat,lng
 response: combined address/hierarchy/ocean

6 Feature Services
6.1 get endpoint: /get
 parameters: geonameId,lang,style
6.2 children/hierarchy/siblings/neighbours endpoints: respective paths with geonameId

7 Country Services
7.1 countryInfo endpoint: /countryInfo
 parameters: country (repeatable),lang
 response: capital,population,area,bbox

7.2 countryCode endpoint: /countryCode
 parameters: lat,lng,type=xml|JSON,text default,lang,radius

7.3 countrySubdivision endpoint: /countrySubdivision
 parameters: lat,lng,lang,radius,level,maxRows

8 Ocean & Neighbourhood
8.1 ocean endpoint: /ocean
 parameters: lat,lng,radius
8.2 neighbourhood endpoint: /neighbourhood
 parameters: lat,lng

9 Elevation Services Use GET/POST; multiple points via lats,lngs (max20 free|2000 premium)
9.1 srtm1 endpoint: /srtm1 returns elevation m or -32768
9.2 srtm3 endpoint: /srtm3 returns elevation m or -32768
9.3 astergdem endpoint: /astergdem returns elevation m or -32768
9.4 gtopo30 endpoint: /gtopo30 returns elevation m or -9999

10 Timezone Service
10.1 timezone endpoint: /timezone
 parameters: lat,lng,radius,lang,date
 response: countryCode,countryName,timezoneId,time,sunrise,sunset,rawOffset,gmtOffset,dstOffset

## Supplementary Details
Authentication: call any endpoint with ?username={YOUR_USERNAME}; register at http://www.geonames.org/login
Rate limits: 10,000 requests per day, 1,000 per hour free; exception thrown on limit exceed
JSON vs XML: set type=JSON or use ...JSON endpoint suffix
URL: https://api.geonames.org or secure.geonames.org
Use POST for bodies >2000 chars
Parameter encoding: UTF-8 URL-encoded
Commercial differs: default isReduced true, radius and maxRows limits increased
Examples: GET /postalCodeSearch?postalcode=9011&maxRows=10&username=demo
GET /findNearbyPostalCodesJSON?lat=47&lng=9&username=demo


## Reference Details
API Endpoints and Parameters

postalCodeSearch
GET https://api.geonames.org/postalCodeSearch?postalcode={string}&placename={string}&postalcode_startsWith={string}&placename_startsWith={string}&country={ISO-3166}&countryBias={ISO-3166}&maxRows={int}&operator={AND|OR}&isReduced={true|false}&east={float}&west={float}&north={float}&south={float}&username={string}&type={xml|JSON}&style={SHORT|MEDIUM|LONG|FULL}
Response XML <code> or JSON { }

postalCodeLookupJSON
GET https://api.geonames.org/postalCodeLookupJSON?postalcode={string}&country={ISO-3166}&maxRows={int}&charset={UTF-8}&callback={function}&username={string}
Response JSON array of objects {postalcode,placename,lat,lng,countryCode,adminName1,adminCode1}

findNearbyPostalCodes
GET https://api.geonames.org/findNearbyPostalCodes?lat={float}&lng={float}&postalcode={string}&country={ISO-3166}&radius={float}&maxRows={int}&style={SHORT|MEDIUM|LONG|FULL}&localCountry={true|false}&isReduced={true|false}&username={string}&type={xml|JSON}
Response sorted by distance

get (feature)
GET https://api.geonames.org/get?geonameId={int}&lang={ISO-639-1}&style={SHORT|MEDIUM|LONG|FULL}&username={string}&type={xml|JSON}
Response: <geoname> id,name,lat,lng,countryCode,adminCode1,adminName1,featureClass,featureCode,elevation,population,continent,timezone, modificationDate

countryInfo
GET https://api.geonames.org/countryInfo?country={ISO-3166}&lang={ISO-639-1}&username={string}&type={xml|JSON}
Response fields: countryCode,countryName,capital,population,areaInSqKm,bBoxWest,bBoxNorth,bBoxEast,bBoxSouth,isoAlpha3,continent,currencyCode

timezone
GET https://api.geonames.org/timezone?lat={float}&lng={float}&radius={float}&lang={ISO-639-1}&date={yyyy-MM-dd}&username={string}&type={xml|JSON}
Response: countryCode,countryName,timezoneId,time,sunrise,sunset,rawOffset,gmtOffset,dstOffset

SDK Usage Patterns (Java example)
GeoNamesClient client = new GeoNamesClient("username");
List<PostalCode> codes = client.postalCodeSearch("9011", null, 10, false);
// method signature: List<PostalCode> postalCodeSearch(String postalcode, String country, int maxRows, boolean isReduced)

Configuration Options
client.setEndpoint("https://secure.geonames.org");
client.setStyle(Style.FULL);
client.setMaxRows(100);

Best Practices
Always URL-encode placename and query parameters;
Use JSON endpoints for browser; avoid demo username in production;
Implement exponential backoff on 10,000 limit exception;
Cache countryInfo results for static data;
Use premium subscription for radius>30km or >500 results.

Troubleshooting
Error: "daily limit exceeded" => check credits via countryInfo; rotate usernames or upgrade.
Error: HTTP 401 => invalid or unconfirmed username; verify registration link.
Error: HTTP 400 => malformed URL or missing required parameter; inspect query string.
Error: XML parser exception in browser => switch to JSON endpoint; ensure CORS support.
Expected Output Example
GET /findNearbyPostalCodes?lat=47&lng=9&username=user =>
{
  "postalCodes": [
    {"postalcode":"9000","placename":"St. Gallen", "lat":47.4215,"lng":9.3767,"countryCode":"CH","adminName1":"St. Gallen","distance":0.0},...
  ]
}

## Information Dense Extract
username required; 10k/day,1k/h free; endpoints suffix JSON for JSON; type param for xml/JSON; style SHORT|MEDIUM|LONG|FULL; maxRows int; lang ISO-639-1; curl GET https://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=yourUser; params: postalcode,placename,country,countryBias,operator,postalcode_startsWith,placename_startsWith,isReduced,east,west,north,south; findNearbyPostalCodes: lat,lng OR postalcode,country; radius 30km free,160km premium; maxRows 5 free,2500 premium; postalCodeLookupJSON:maxRows,charset,callback; findNearbyPlaceName: lat,lng,lang,radius,maxRows,cities; findNearby: lat,lng,featureClass,featureCode,exclude featureCode,localCountry; extendedFindNearby: lat,lng; get: geonameId; children,hierarchy,siblings,neighbours: geonameId; countryInfo: country,lang; countryCode: lat,lng,type,lang,radius; countrySubdivision: lat,lng,lang,radius,level,maxRows; ocean: lat,lng,radius; neighbourhood: lat,lng; srtm1,srtm3,astergdem,gtopo30: lat,lng||lists via lats,lngs; timezone: lat,lng,radius,lang,date; responses include fields per service; demo user only for samples; use your own account; secure endpoint https://secure.geonames.org; URL encode strings; JSON for cross-domain; handle rate-limit exceptions; premium SLA available.

## Sanitised Extract
Table of Contents 1 Authentication 2 Request Essentials 3 Global Parameters 4 Postal Code Services 5 Reverse Geocoding 6 Feature Services 7 Country Services 8 Ocean & Neighbourhood 9 Elevation Services 10 Timezone Service

1 Authentication Mandatory username parameter; register account; 10,000 credits/day, 1,000/hour free; secure endpoint https://secure.geonames.org

2 Request Essentials Method GET/POST; response XML or JSON; URL encode string parameters

3 Global Parameters type=xml|JSON; style=SHORT|MEDIUM|LONG|FULL (default MEDIUM); maxRows=int; lang=ISO-639-1

4 Postal Code Services
4.1 postalCodeSearch endpoint: /postalCodeSearch
 parameters: postalcode,placename,postalcode_startsWith,placename_startsWith,country (repeatable),countryBias,maxRows (default10),operator=AND|OR,isReduced=true|false,east,west,north,south
 response fields: postalcode,placename,lat,lng,countryCode,adminName1,adminCode1,distance

4.2 postalCodeLookupJSON endpoint: /postalCodeLookupJSON
 parameters: postalcode,country,maxRows=20,charset=UTF-8,callback
 response: JSON array sorted postalcode,placename

4.3 findNearbyPostalCodes endpoint: /findNearbyPostalCodes
 parameters: lat,lng OR postalcode,country; radius=30km free|160km premium; maxRows=5 free|2500 premium; style,localCountry,isReduced
 response: sorted by distance

4.4 postalCodeCountryInfo endpoint: /postalCodeCountryInfo
 parameter: none
 response: list of country codes

5 Reverse Geocoding
5.1 findNearbyPlaceName endpoint: /findNearbyPlaceName
 parameters: lat,lng,lang,radius,maxRows=10,style,localCountry,cities=cities1000|cities5000|cities15000
 response: nearest populated place

5.2 findNearby endpoint: /findNearby
 parameters: lat,lng,featureClass,featureCode (repeat/exclude),radius,maxRows,style,localCountry

5.3 extendedFindNearby endpoint: /extendedFindNearby
 parameters: lat,lng
 response: combined address/hierarchy/ocean

6 Feature Services
6.1 get endpoint: /get
 parameters: geonameId,lang,style
6.2 children/hierarchy/siblings/neighbours endpoints: respective paths with geonameId

7 Country Services
7.1 countryInfo endpoint: /countryInfo
 parameters: country (repeatable),lang
 response: capital,population,area,bbox

7.2 countryCode endpoint: /countryCode
 parameters: lat,lng,type=xml|JSON,text default,lang,radius

7.3 countrySubdivision endpoint: /countrySubdivision
 parameters: lat,lng,lang,radius,level,maxRows

8 Ocean & Neighbourhood
8.1 ocean endpoint: /ocean
 parameters: lat,lng,radius
8.2 neighbourhood endpoint: /neighbourhood
 parameters: lat,lng

9 Elevation Services Use GET/POST; multiple points via lats,lngs (max20 free|2000 premium)
9.1 srtm1 endpoint: /srtm1 returns elevation m or -32768
9.2 srtm3 endpoint: /srtm3 returns elevation m or -32768
9.3 astergdem endpoint: /astergdem returns elevation m or -32768
9.4 gtopo30 endpoint: /gtopo30 returns elevation m or -9999

10 Timezone Service
10.1 timezone endpoint: /timezone
 parameters: lat,lng,radius,lang,date
 response: countryCode,countryName,timezoneId,time,sunrise,sunset,rawOffset,gmtOffset,dstOffset

## Original Source
GeoNames Web Services
https://www.geonames.org/export/ws-overview.html

## Digest of GEONAMES_WS

# GeoNames Web Services Documentation

Retrieved: 2024-06-18

## 1. Authentication and Usage Limits
- Mandatory parameter: username (string, URL-encoded)
- Demo account: limited to sample links only; create your own via registration
- Daily credits per username: 10,000 free, 1,000/hour free; premium SLA available
- Secure endpoint: https://secure.geonames.org

## 2. Request Essentials
- Method: GET or POST
- Accept: XML or JSON (use JSON for browser-based JavaScript)
- URL encoding: required for string parameters containing spaces/special characters

## 3. Global Parameters
- type: xml | JSON (sets response format)
- style: SHORT, MEDIUM, LONG, FULL (default MEDIUM)
- maxRows: integer (default varies per service)
- lang: ISO-639-1 code (default en)

## 4. Postal Code Webservices

### 4.1 postalCodeSearch
Endpoint: /postalCodeSearch?postalcode={code}&username={u}&[options]
Parameters:
  postalcode (string) or placename (string) required
  placename_startsWith (string)
  postalcode_startsWith (string)
  country (ISO-3166 code), may repeat
  countryBias (ISO-3166 code)
  maxRows (int, default 10)
  operator (AND|OR, default AND)
  isReduced (true|false, default false free, true commercial)
  east, west, north, south (float bounding box)
Response: list of postal codes with fields: postalcode, placename, lat, lng, country code, adminName1, adminCode1, distance

### 4.2 postalCodeLookupJSON
Endpoint: /postalCodeLookupJSON?postalcode={code}&country={C}&username={u}&[maxRows]&[charset]&[callback]
Response: JSON array sorted by postalcode,placename

### 4.3 findNearbyPostalCodes
Endpoint: /findNearbyPostalCodes?lat={lat}&lng={lng}&username={u}&[radius]&[maxRows]&[style]&[country]&[localCountry]&[isReduced]
or: postalcode & country & radius & maxRows
Defaults: radius 30km free, 160km premium; maxRows 5 free, 2500 premium
Response: XML/JSON sorted by distance; Canada FSAs

### 4.4 postalCodeCountryInfo
Endpoint: /postalCodeCountryInfo?username={u}
Response: list of country codes with available postal code geocoding

## 5. Reverse Geocoding Services

### 5.1 findNearbyPlaceName
Endpoint: /findNearbyPlaceName?lat={lat}&lng={lng}&username={u}&[lang]&[radius]&[maxRows]&[style]&[localCountry]&[cities]
cities filter: cities1000|cities5000|cities15000
Response: nearest populated place with distance km

### 5.2 findNearby
Endpoint: /findNearby?lat={lat}&lng={lng}&username={u}&[featureClass]&[featureCode]&[radius]&[maxRows]&[style]&[localCountry]
Use multiple featureCode, exclude with !=
Response: list of toponyms

### 5.3 extendedFindNearby
Endpoint: /extendedFindNearby?lat={lat}&lng={lng}&username={u}
Response: combined services: address in US, hierarchy otherwise, ocean for oceans

## 6. Feature Services

### 6.1 get
Endpoint: /get?geonameId={id}&username={u}&[lang]&[style]
Response: full feature attributes

### 6.2 children, hierarchy, siblings, neighbours
Endpoints: /children?geonameId=..., /hierarchy?geonameId=..., /siblings?geonameId=..., /neighbours?geonameId=...
Responses: XML/JSON lists of features

## 7. Country and Administrative Services

### 7.1 countryInfo
Endpoint: /countryInfo?username={u}&[country]&[lang]
Response: capital, population, area, bounding box

### 7.2 countryCode
Endpoint: /countryCode?lat={lat}&lng={lng}&username={u}&[type]&[lang]&[radius]
type xml|JSON, default text; radius buffer km for coastal areas
Response: iso country code and name

### 7.3 countrySubdivision
Endpoint: /countrySubdivision?lat={lat}&lng={lng}&username={u}&[lang]&[radius]&[level]&[maxRows]
Response: administrative subdivisions

## 8. Ocean and Neighbourhood

### 8.1 ocean
Endpoint: /ocean?lat={lat}&lng={lng}&username={u}&[radius]
Response: ocean/sea name

### 8.2 neighbourhood
Endpoint: /neighbourhood?lat={lat}&lng={lng}&username={u}
Response: US neighbourhood

## 9. Elevation Services

Common: lat,lng, request method GET/POST, list of points via lats & lngs (max 20 free, 2000 premium)

### 9.1 srtm1
 Endpoint: /srtm1?lat=...&lng=... => elevation m or -32768 no data

### 9.2 srtm3
 Endpoint: /srtm3?lat=...&lng=... => elevation m or -32768

### 9.3 astergdem
 Endpoint: /astergdem?lat=...&lng=... => elevation m or -32768

### 9.4 gtopo30
 Endpoint: /gtopo30?lat=...&lng=... => elevation m or -9999

## 10. Timezone Service

### 10.1 timezone
Endpoint: /timezone?lat={lat}&lng={lng}&username={u}&[radius]&[lang]&[date]
Response fields: countryCode, countryName, timezoneId, time, sunrise, sunset, rawOffset, gmtOffset(deprecated), dstOffset(deprecated)


## Attribution
- Source: GeoNames Web Services
- URL: https://www.geonames.org/export/ws-overview.html
- License: License
- Crawl Date: 2025-04-26T19:47:18.301Z
- Data Size: 908018 bytes
- Links Found: 3295

## Retrieved
2025-04-26
library/RDFLIBJS_SETUP.md
# library/RDFLIBJS_SETUP.md
# RDFLIBJS_SETUP

## Crawl Summary
Installation commands for browser and Node.js environments; build steps for dist; directory structure of dist, test, lib; Node.js XMLHTTPRequest dependency; core capabilities: serialization formats, Linked Data client, collaboration, local store API, SPARQL graph-match, OWL sameAs smushing, provenance metadata retention

## Normalised Extract
Table of Contents:
  1. Installation
  2. Build for Browser
  3. Node.js Setup
  4. Directory Structure
  5. Dependency Requirements
  6. Core Capabilities

1. Installation
  - Browser via npm: npm install rdflib
  - Browser via script tag: clone repo, npm install, npm run build:browser
  - Node.js: npm install --save rdflib

2. Build for Browser
  - Command: npm run build:browser
  - Output: dist/ contains bundled rdflib.js and rdflib.min.js

3. Node.js Setup
  - Prerequisite: Node.js and npm installed
  - xmlhttprequest: use xhr2 or node-fetch polyfill
  - Install: npm install --save rdflib

4. Directory Structure
  - dist/: Bundled output for browsers
  - test/: Contains Mocha/Chai tests
  - lib/: Transpiled ES5 modules for package distribution

5. Dependency Requirements
  - Requires XMLHTTPRequest global in Node.js
    • Use xhr2 package: npm install xhr2
    • Set global.XMLHttpRequest = require('xhr2')

6. Core Capabilities
  - Formats: RDF/XML, Turtle, N3, RDFa, JSON-LD
  - Linked Data client: WebDAV and SPARQL/Update transports
  - Collaboration: websocket & HTTP PATCH support
  - Local store: graph-match API with .match() and optional patterns
  - OWL support: smushing sameAs, function/inverseFunction
  - Provenance: includes HTTP fetch metadata as RDF triples

## Supplementary Details
Installation Steps:
  • npm install rdflib              # for bundler
  • git clone https://github.com/linkeddata/rdflib.js.git
    cd rdflib.js
    npm install
    npm run build:browser          # produces dist/
  • npm install --save rdflib      # for Node.js

Browser Bundler Config:
  • webpack.config.js entry: require('rdflib')
  • import: import $rdf from 'rdflib';

Node.js Polyfill:
  • npm install xhr2
  • In entry file:
      const XHR = require('xhr2');
      global.XMLHttpRequest = XHR;
      const $rdf = require('rdflib');

Directory Usage:
  • dist/rdflib.js         # include via <script src>
  • dist/rdflib.min.js     # minified version
  • lib/                   # require('rdflib') resolves to lib/

Dependency:
  • XMLHTTPRequest
    - Default global in browsers
    - Polyfill required in Node.js

## Reference Details
Installation Commands:
  npm install rdflib
  npm install --save rdflib
  npm run build:browser

Directories:
  dist/      # bundled outputs
    ├ rdflib.js
    └ rdflib.min.js
  lib/       # transpiled modules for npm
  test/      # test suites

Node.js Polyfill Example:
  const XHR = require('xhr2');
  global.XMLHttpRequest = XHR;
  const $rdf = require('rdflib');

Basic Usage Example:
  const $rdf = require('rdflib');
  const store = $rdf.graph();
  const fetcher = new $rdf.Fetcher(store, {fetch: fetch});
  fetcher.load('http://example.org/data.ttl')
    .then(response => {
      const statements = store.match(undefined, undefined, undefined);
      console.log(statements.length + ' triples loaded');
    })
    .catch(err => console.error('Fetch error', err));

Configuration Options:
  Fetcher(options):
    - fetch: custom fetch implementation (default: global.fetch or XMLHttpRequest)
    - timeout: milliseconds before abort
    - withCredentials: boolean for XHR credentials

Best Practices:
  - Polyfill XMLHttpRequest in Node.js before requiring rdflib
  - Use bundler to tree-shake unused modules
  - Handle CORS and SPARQL endpoints via UpdateManager

Troubleshooting:
  Issue: 'XMLHttpRequest is not defined'
    • Install xhr2
    • In code: global.XMLHttpRequest = require('xhr2')
  Issue: CORS error
    • Configure server to allow Access-Control-Allow-Origin
    • Use proxy or CORs in SPARQL endpoint


## Information Dense Extract
npm install rdflib; npm run build:browser; npm install --save rdflib; polyfill XMLHttpRequest in Node.js via xhr2; dist/ contains rdflib.js and rdflib.min.js; lib/ for ES5 modules; test/ for automated tests; formats: RDF/XML, Turtle, N3, RDFa, JSON-LD; transports: WebDAV, SPARQL/Update; API: $rdf.graph(), new $rdf.Fetcher(store,{fetch,timeout,withCredentials}); store.match(s,p,o,g); OWL smushing sameAs and functionProperty; provenance: HTTP metadata in RDF; troubleshoot: install xhr2, set global.XMLHttpRequest; configure CORS headers.

## Sanitised Extract
Table of Contents:
  1. Installation
  2. Build for Browser
  3. Node.js Setup
  4. Directory Structure
  5. Dependency Requirements
  6. Core Capabilities

1. Installation
  - Browser via npm: npm install rdflib
  - Browser via script tag: clone repo, npm install, npm run build:browser
  - Node.js: npm install --save rdflib

2. Build for Browser
  - Command: npm run build:browser
  - Output: dist/ contains bundled rdflib.js and rdflib.min.js

3. Node.js Setup
  - Prerequisite: Node.js and npm installed
  - xmlhttprequest: use xhr2 or node-fetch polyfill
  - Install: npm install --save rdflib

4. Directory Structure
  - dist/: Bundled output for browsers
  - test/: Contains Mocha/Chai tests
  - lib/: Transpiled ES5 modules for package distribution

5. Dependency Requirements
  - Requires XMLHTTPRequest global in Node.js
     Use xhr2 package: npm install xhr2
     Set global.XMLHttpRequest = require('xhr2')

6. Core Capabilities
  - Formats: RDF/XML, Turtle, N3, RDFa, JSON-LD
  - Linked Data client: WebDAV and SPARQL/Update transports
  - Collaboration: websocket & HTTP PATCH support
  - Local store: graph-match API with .match() and optional patterns
  - OWL support: smushing sameAs, function/inverseFunction
  - Provenance: includes HTTP fetch metadata as RDF triples

## Original Source
rdflib.js RDF Library
https://github.com/linkeddata/rdflib.js#readme

## Digest of RDFLIBJS_SETUP

# Installation

Browser (with Webpack or similar bundler)

  npm install rdflib

Browser (<script> tag)

  git clone git@github.com:linkeddata/rdflib.js.git
  cd rdflib.js
  npm install
  npm run build:browser

Node.js

  Ensure Node.js and npm installed
  npm install --save rdflib

# Subdirectories

dist
  Bundled libraries output by npm run build

test
  Automated test suites

lib
  Transpiled, non-bundled library published to npm

# Dependencies

Node.js version must provide XMLHTTPRequest implementation (use xhr2 or node-fetch polyfill)

# Features Overview

Reads RDF/XML, Turtle, N3; parses RDFa and JSON-LD
Linked Data client over WebDAV or SPARQL/Update
Real-time collaborative editing via WebSockets and HTTP PATCH
Local in-memory store with graph-match SPARQL (basic), optional matches
OWL inferencing: sameAs and function/inverseFunction smushing
Provenance tracking: retains HTTP response metadata in RDF

## Attribution
- Source: rdflib.js RDF Library
- URL: https://github.com/linkeddata/rdflib.js#readme
- License: License
- Crawl Date: 2025-04-27T08:49:21.346Z
- Data Size: 614386 bytes
- Links Found: 5414

## Retrieved
2025-04-27
library/FETCH_API.md
# library/FETCH_API.md
# FETCH_API

## Crawl Summary
Signature: fetch(input: RequestInfo, init?: RequestInit): Promise<Response> returns header-ready Response including errors. RequestInit options: method(string, default GET), headers(HeadersInit), body(BodyInit|null), mode(cors/no-cors/same-origin/navigate default cors), credentials(omit/same-origin/include default same-origin), cache(default/no-store/reload/no-cache/force-cache/only-if-cached default default), redirect(follow/error/manual default follow), referrer(string default about:client), referrerPolicy(no-referrer/no-referrer-when-downgrade/origin/origin-when-cross-origin/unsafe-url default no-referrer-when-downgrade), integrity(string), keepalive(boolean default false), signal(AbortSignal). Request, Response, Headers, Body mixin full method lists. Service worker respondWith(fetch(request)).

## Normalised Extract
Table of Contents
1. fetch() signature and behavior
2. RequestInit options
3. Request constructor
4. Response constructor and Body methods
5. Headers interface
6. Service Worker usage

1. fetch() signature and behavior
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
  - Returns Promise resolving to Response when headers arrive
  - Does not reject on HTTP error status; use response.ok to detect success

2. RequestInit options
  method: string (default GET)
  headers: HeadersInit (Records, arrays, or Headers)
  body: BodyInit|null (string, Blob, BufferSource, FormData, URLSearchParams, ReadableStream)
  mode: cors|no-cors|same-origin|navigate (default cors)
  credentials: omit|same-origin|include (default same-origin)
  cache: default|no-store|reload|no-cache|force-cache|only-if-cached (default default)
  redirect: follow|error|manual (default follow)
  referrer: string (default about:client)
  referrerPolicy: no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|unsafe-url (default no-referrer-when-downgrade)
  integrity: string
  keepalive: boolean (default false)
  signal: AbortSignal

3. Request constructor
  new Request(input: RequestInfo, init?: RequestInit)
  Properties: method, headers, url, mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal
  Clone: request.clone()

4. Response constructor and Body methods
  new Response(body?: BodyInit|null, init?: ResponseInit)
  ResponseInit: status:number(default200), statusText:string(default "OK"), headers:HeadersInit
  Properties: status, statusText, ok, redirected, type, url, bodyUsed
  Body methods: arrayBuffer(), blob(), formData(), json(), text()
  Body property: body: ReadableStream|null

5. Headers interface
  new Headers(init?: HeadersInit)
  HeadersInit: Headers|string[][]|Record<string,string>
  Methods: append(name,value), delete(name), get(name), getAll(name), has(name), set(name,value), forEach(callback)

6. Service Worker usage
  In service worker file:
    self.addEventListener('fetch', event => {
      event.respondWith(fetch(event.request));
    });

## Supplementary Details
AbortController integration: const controller=new AbortController(); fetch(url,{signal:controller.signal}); controller.abort() cancels request.  CORS effect: mode:'cors' sends Origin header; no-cors restricts methods to GET, POST, HEAD and opaque response.  Credentials effect: include sends cookies, omit never sends, same-origin for same-site.  Cache modes: reload bypasses cache, force-cache uses cache even if stale, only-if-cached returns cached or error.  Redirect behavior: manual preserves redirect in response.type 'opaqueredirect'; error rejects if unsafe.  Keepalive true allows request outside unload.  Integrity enforces SRI checks; mismatch rejects the request.  Default referrer 'about:client' uses document URL, override to empty string for no-referrer.  Body manual stream consumption: assign response.body to ReadableStream and pipe to other streams.

## Reference Details
// Simple GET
fetch('https://api.example.com/data',{
  method:'GET',
  headers:{'Accept':'application/json'},
  credentials:'include',
  cache:'no-cache'
})
.then(response=>{
  if(!response.ok) throw new Error('HTTP '+response.status);
  return response.json();
})
.then(data=>console.log(data))
.catch(err=>console.error('Fetch error:',err));

// POST with JSON
const payload={name:'Alice', age:30};
fetch('/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
.then(r=>r.text())
.then(text=>console.log(text));

// Abort example
const ctrl=new AbortController();
fetch('/long', {signal:ctrl.signal})
.catch(err=>{ if(err.name==='AbortError') console.log('Aborted'); });
// later
ctrl.abort();

// Service Worker fetch event
self.addEventListener('fetch', event=>{
  event.respondWith(
    fetch(event.request, {mode:'no-cors'})
      .then(res=>res)
      .catch(()=>new Response('Offline', {status:503, statusText:'Service Unavailable'}))
  );
});

// Best practice: set timeout
function fetchWithTimeout(url,options,timeout=5000){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeout);
  return fetch(url,{...options,signal:controller.signal})
    .finally(()=>clearTimeout(timer));
}

// Troubleshoot
// Inspect headers via curl equivalent
// curl -i 'https://api.example.com/data'
// Expected: HTTP/1.1 200 OK\nContent-Type: application/json\n...

## Information Dense Extract
fetch(input: RequestInfo, init?: RequestInit): Promise<Response> | RequestInit{method:string=GET,headers:HeadersInit,body:BodyInit|null,mode:'cors'=cors,credentials:'same-origin'=same-origin,cache:'default'=default,redirect:'follow'=follow,referrer:'about:client'=about:client,referrerPolicy:'no-referrer-when-downgrade'=no-referrer-when-downgrade,integrity:string,keepalive:boolean=false,signal:AbortSignal} | Request: new Request(input,init) {method,headers,url,mode,credentials,cache,redirect,referrer,referrerPolicy,integrity,keepalive,signal,clone()} | Response: new Response(body?,{status:number=200,statusText:'OK',headers:HeadersInit}) {status,statusText,ok,redirected,type,url,bodyUsed,arrayBuffer(),blob(),formData(),json(),text(),body} | Headers: new Headers(init?:HeadersInit) {append(name,value),delete(name),get(name),getAll(name),has(name),set(name,value),forEach()} | Usage patterns: GET, POST JSON, AbortController, timeout wrapper, Service Worker fetch; handle response.ok; configure CORS, credentials, cache, redirect, integrity and keepalive.

## Sanitised Extract
Table of Contents
1. fetch() signature and behavior
2. RequestInit options
3. Request constructor
4. Response constructor and Body methods
5. Headers interface
6. Service Worker usage

1. fetch() signature and behavior
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
  - Returns Promise resolving to Response when headers arrive
  - Does not reject on HTTP error status; use response.ok to detect success

2. RequestInit options
  method: string (default GET)
  headers: HeadersInit (Records, arrays, or Headers)
  body: BodyInit|null (string, Blob, BufferSource, FormData, URLSearchParams, ReadableStream)
  mode: cors|no-cors|same-origin|navigate (default cors)
  credentials: omit|same-origin|include (default same-origin)
  cache: default|no-store|reload|no-cache|force-cache|only-if-cached (default default)
  redirect: follow|error|manual (default follow)
  referrer: string (default about:client)
  referrerPolicy: no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|unsafe-url (default no-referrer-when-downgrade)
  integrity: string
  keepalive: boolean (default false)
  signal: AbortSignal

3. Request constructor
  new Request(input: RequestInfo, init?: RequestInit)
  Properties: method, headers, url, mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal
  Clone: request.clone()

4. Response constructor and Body methods
  new Response(body?: BodyInit|null, init?: ResponseInit)
  ResponseInit: status:number(default200), statusText:string(default 'OK'), headers:HeadersInit
  Properties: status, statusText, ok, redirected, type, url, bodyUsed
  Body methods: arrayBuffer(), blob(), formData(), json(), text()
  Body property: body: ReadableStream|null

5. Headers interface
  new Headers(init?: HeadersInit)
  HeadersInit: Headers|string[][]|Record<string,string>
  Methods: append(name,value), delete(name), get(name), getAll(name), has(name), set(name,value), forEach(callback)

6. Service Worker usage
  In service worker file:
    self.addEventListener('fetch', event => {
      event.respondWith(fetch(event.request));
    });

## Original Source
Node.js & Web Platform APIs
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## Digest of FETCH_API

# Fetch API

Data Size: 2261980 bytes  
Retrieved: 2024-06-15  
Source: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

# fetch()
Signature: fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
Returns a Promise resolving to a Response once headers are received, regardless of HTTP status code.

# RequestInit
Interface RequestInit {
  method?: string            // HTTP method, default: "GET"
  headers?: HeadersInit      // Headers object, array or record
  body?: BodyInit | null     // Request payload: string, Blob, BufferSource, FormData, URLSearchParams, ReadableStream
  mode?: "cors"|"no-cors"|"same-origin"|"navigate"  // default: "cors"
  credentials?: "omit"|"same-origin"|"include"      // default: "same-origin"
  cache?: "default"|"no-store"|"reload"|"no-cache"|"force-cache"|"only-if-cached"  // default: "default"
  redirect?: "follow"|"error"|"manual"               // default: "follow"
  referrer?: string          // default: "about:client"
  referrerPolicy?: "no-referrer"|"no-referrer-when-downgrade"|"origin"|"origin-when-cross-origin"|"unsafe-url"  // default: "no-referrer-when-downgrade"
  integrity?: string         // subresource integrity value
  keepalive?: boolean        // default: false
  signal?: AbortSignal       // abort controller signal
}

# Request
Signature: new Request(input: RequestInfo, init?: RequestInit)
Properties:
  method      // as in RequestInit
  headers     // Headers instance
  url         // normalized URL string
  mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal
Methods:
  clone(): Request      // deep clone usable for multiple consumers

# Response
Signature: new Response(body?: BodyInit|null, init?: ResponseInit)
Interface ResponseInit {
  status?: number           // HTTP status code, default: 200
  statusText?: string       // default: "OK"
  headers?: HeadersInit     // response headers
}
Properties:
  status, statusText, ok (boolean status>=200&&status<300), redirected, type, url, bodyUsed
Methods from Body mixin:
  arrayBuffer(): Promise<ArrayBuffer>
  blob(): Promise<Blob>
  formData(): Promise<FormData>
  json(): Promise<any>
  text(): Promise<string>
  readonly body: ReadableStream|null

# Headers
Signature: new Headers(init?: HeadersInit)
Type HeadersInit = Headers | string[][] | Record<string,string>
Methods:
  append(name: string, value: string): void
  delete(name: string): void
  get(name: string): string|null
  getAll(name: string): string[]
  has(name: string): boolean
  set(name: string, value: string): void
  forEach(callback: (value:string,name:string,headers:Headers)=>void): void

# Body
Mixin on Request and Response
Properties:
  bodyUsed: boolean
Methods:
  arrayBuffer(): Promise<ArrayBuffer>
  blob(): Promise<Blob>
  formData(): Promise<FormData>
  json(): Promise<any>
  text(): Promise<string>

# Service Worker Integration
In FetchEvent handler:
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

## Attribution
- Source: Node.js & Web Platform APIs
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- License: License if known
- Crawl Date: 2025-04-28T18:52:56.581Z
- Data Size: 2261980 bytes
- Links Found: 23802

## Retrieved
2025-04-28
library/N3JS.md
# library/N3JS.md
# N3JS

## Crawl Summary
Installation: npm install n3, require('n3') or UMD via CDN. DataFactory API: namedNode, literal, defaultGraph, quad. Parser API: constructor options format, baseIRI, blankNodePrefix, isImpliedBy; parse(input, callback|listeners|sync)
StreamParser: Readable stream with optional comments and prefix events.
Writer API: constructor with prefixes, format, end; methods addQuad, blank, list, end. StreamWriter: Writable stream sink.
Store API: constructor with optional entityIndex; properties size; methods addQuad(s), removeQuad(s), removeMatches, deleteGraph, createBlankNode, match, getQuads, countQuads, getSubjects/predicates/objects/graphs.
Reasoner API: Reasoner(store), reason(rules).
Compatibility: full RDF/JS, W3C RDF1.1 and RDF-star.


## Normalised Extract
Table of Contents:
1  Installation
2  DataFactory
3  Parser
4  StreamParser
5  Writer
6  StreamWriter
7  Store
8  Reasoner

1 Installation
  npm install n3
  const N3 = require('n3');  // Node.js import
  <script src="https://unpkg.com/n3/browser/n3.min.js"></script>  // Browser UMD

2 DataFactory
  namedNode(value: string): NamedNode
  literal(value: string, language?: string, datatype?: NamedNode): Literal
  defaultGraph(): DefaultGraph
  quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad

3 Parser
  new N3.Parser({format?: string, baseIRI?: string, blankNodePrefix?: string, isImpliedBy?: boolean})
  parse(input: string|Stream, callback: (error, quad, prefixes?)=>void): void
  parse(input: string, listeners: {onQuad, onPrefix?, onComment?}): void
  parse(input: string): Quad[]
  Options:
    format: 'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'Notation3'|'text/n3'
    baseIRI: IRI string
    blankNodePrefix: prefix string or ''
    isImpliedBy: boolean

4 StreamParser
  new N3.StreamParser(options?)  // options same as Parser plus comments?: boolean
  rdfStream.pipe(streamParser).pipe(destination)

5 Writer
  new N3.Writer(streamOrOptions)
    options.prefixes: Record<string,string>
    options.format: 'Turtle'|'N-Triples'|...  default Turtle/TriG
    options.end: boolean
  addQuad(subject, predicate, object, graph?): Writer
  blank(predicate, object): BlankNode
  list(terms: Term[]): BlankNode
  end(callback: (error, result)=>void): void

6 StreamWriter
  new N3.StreamWriter({prefixes, format?, end?})
  streamParser.pipe(streamWriter).pipe(process.stdout)

7 Store
  new N3.Store(quads?: Quad[], {entityIndex?: EntityIndex})
  size: number
  addQuad(quad): void
  addQuads(quads): void
  removeQuad(quad): boolean
  removeQuads(quads): number
  remove(matchesStream): Promise<number>
  removeMatches(s?, p?, o?, g?): number
  deleteGraph(graph): number
  createBlankNode(): BlankNode
  match(s?, p?, o?, g?): Iterable<Quad>
  getQuads(s?, p?, o?, g?): Quad[]
  countQuads(s?, p?, o?, g?): number
  getSubjects(p?, o?, g?): Term[]
  getPredicates(s?, o?, g?): Term[]
  getObjects(s?, p?, g?): Term[]
  getGraphs(s?, p?, o?): Term[]

8 Reasoner
  import {Reasoner} from 'n3';
  new Reasoner(store)
  reason(rules: string|Quad[]): void


## Supplementary Details
Parser strict mode: set format to MIME or name, e.g. {format:'application/trig'} for TriG strict. Notation3 supported via {format:'N3'|'Notation3'|'text/n3'}. RDF-star enabled when format contains '*'.
Base IRI resolution: baseIRI option sets the default graph context. Default blank node prefix uses pattern b{digit}_. Disable by blankNodePrefix:''.
StreamParser comments event: options.comments=true to emit onComment(comment: string).
Writer blank nodes and lists: use writer.blank(predicate,object) and writer.list([terms]) to manually create Turtle shorthand. Streaming writers cannot auto-detect blank/list usage.
Store sharing: instantiate EntityIndex: new N3.EntityIndex(); pass {entityIndex} to multiple stores to share term index and reduce memory.
Reasoner limits: only Basic Graph Patterns in premise and conclusion. No built-in functions or backward chaining.

## Reference Details
--- DataFactory ---
NamedNode:
  function namedNode(value: string): NamedNode
  Returns NamedNode with .termType='NamedNode', .value=value
Literal:
  function literal(value: string, language?: string, datatype?: NamedNode): Literal
  When language provided: .datatype=rdflib.NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'), .language=language
  When datatype provided: .datatype=datatype
DefaultGraph:
  function defaultGraph(): DefaultGraph
Quad:
  function quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad
  Returns .subject, .predicate, .object, .graph(defaultGraph())

--- Parser ---
Constructor: new Parser(options?: {
  format?: string;  // Default: permissive superset
  baseIRI?: string; // URI
  blankNodePrefix?: string; // Default: 'b{digit}_'
  isImpliedBy?: boolean; // Default: false
})

Method parse(input: string|Stream, callback|listeners):
  parse(input, (error: Error|null, quad: Quad|null, prefixes?: Record<string,string>)=>void): void
  parse(text: string, {onQuad, onPrefix?, onComment?}): void
  parse(text: string): Quad[]

Error handling: callback receives Error when parse error; quad is null when complete; prefixes returned at end when using callback API.

--- StreamParser ---
Constructor: new StreamParser(options?: {
  format?: string;
  baseIRI?: string;
  blankNodePrefix?: string;
  isImpliedBy?: boolean;
  comments?: boolean; // Default: false
})

Usage example:
  const streamParser = new N3.StreamParser({comments:true});
  fs.createReadStream('file.ttl').pipe(streamParser).pipe(new Writable({objectMode:true, write(quad,enc,cb){ console.log(quad); cb(); }}));

--- Writer ---
Constructor: new Writer(output?: Writable|{prefixes: Record<string,string>; format?: string; end?: boolean})
Properties:
  prefix:N/A; internal map of prefix to namespace

Methods:
  addQuad(s:Term,p:Term,o:Term,g?:Term): Writer
  blank(predicate: Term, object: Term): BlankNode
  list(elements: Term[]): BlankNode
  end(cb: (error:Error|null, result:string)=>void): void

Example: create TTL string with prefix c:
  const writer=new Writer({prefixes:{c:'http://example.org/#'}});
  writer.addQuad(quad(namedNode('http://example.org/#Tom'),namedNode('rdf:type'),namedNode('http://example.org/#Cat')));
  writer.end((err,res)=>console.log(res));

Configuration:
  format: 'N-Triples'|'application/trig'
  end: when false, stream writer does not close output

--- StreamWriter ---
Constructor: new StreamWriter({prefixes, format?: string; end?: boolean})
Pipe usage: streamParser.pipe(streamWriter).pipe(destination)

--- Store ---
Constructor: new Store(quads?: Quad[], {entityIndex?: EntityIndex})
Properties:
  size: number // count of quads
Methods:
  addQuad(quad: Quad): void
  addQuads(quads: Quad[]): void
  removeQuad(quad: Quad): boolean // returns if removed
  removeQuads(quads: Quad[]): number // count removed
  remove(stream: Stream<Quad>): Promise<number>
  removeMatches(s?:Term,p?:Term,o?:Term,g?:Term): number
  deleteGraph(graph:Term): number
  createBlankNode(): BlankNode
Query methods:
  match(s?,p?,o?,g?): Iterable<Quad>
  getQuads(s?,p?,o?,g?): Quad[]
  countQuads(s?,p?,o?,g?): number
  forEach(callback:(quad:Quad)=>void,s?,p?,o?,g?): void
  every(callback:(quad:Quad)=>boolean,s?,p?,o?,g?): boolean
  some(callback:(quad:Quad)=>boolean,s?,p?,o?,g?): boolean
  getSubjects(p?,o?,g?): Term[]
  getPredicates(s?,o?,g?): Term[]
  getObjects(s?,p?,g?): Term[]
  getGraphs(s?,p?,o?): Term[]

Example: share entityIndex between stores
  const idx=new EntityIndex();
  const store1=new Store([], {entityIndex:idx});
  const store2=new Store([], {entityIndex:idx});

--- Reasoner ---
Constructor: new Reasoner(store: Store)
Method:
  reason(rules: string | Quad[]): void // mutates store
Rules syntax: Notation3 rules with BGP premises and conclusions

--- Troubleshooting ---
1  Blank node collisions: enable blankNodePrefix to distinguish: {blankNodePrefix:'x_'} expected _:x_1
2  Parsing large files: use StreamParser to avoid memory overflow
3  Unexpected streaming behavior: set writer end:false to keep stream open
4  Prefixes not applied: ensure prefixes map provided to Writer or StreamWriter


## Information Dense Extract
Installation:npm install n3; require('n3') or include n3.min.js
DataFactory:namedNode(str):NamedNode;literal(str,lang?,datatype?):Literal;defaultGraph():DefaultGraph;quad(s,p,o,g?):Quad
Parser:new Parser({format?,baseIRI?,blankNodePrefix?,isImpliedBy?});parse(input,cb|listeners|string):void|Quad[]
StreamParser:new StreamParser(opts+comments?);pipe RDF streams
Writer:new Writer(stream|{prefixes,format?,end?});addQuad(s,p,o,g?);blank(pred,obj);list(terms);end(cb)
StreamWriter:new StreamWriter({prefixes,format?,end?});pipe streamParser→writer→out
Store:new Store(quads[],{entityIndex?});size;addQuad(s),removeQuad(s),removeMatches(pattern);match(pattern),getQuads, countQuads,getSubjects|Predicates|Objects|Graphs;createBlankNode()
Reasoner:new Reasoner(store);reason(rules)
Options:format:'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'text/n3' or MIME;RDF-star with '*';baseIRI URI;blankNodePrefix str or '';isImpliedBy boolean;comments boolean
Interfaces:implements RDF/JS DataFactory,Term,Quad,Stream,Sink,Store,Source,DatasetCore
Compatibility:full RDF1.1 + RDF-star + Notation3


## Sanitised Extract
Table of Contents:
1  Installation
2  DataFactory
3  Parser
4  StreamParser
5  Writer
6  StreamWriter
7  Store
8  Reasoner

1 Installation
  npm install n3
  const N3 = require('n3');  // Node.js import
  <script src='https://unpkg.com/n3/browser/n3.min.js'></script>  // Browser UMD

2 DataFactory
  namedNode(value: string): NamedNode
  literal(value: string, language?: string, datatype?: NamedNode): Literal
  defaultGraph(): DefaultGraph
  quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad

3 Parser
  new N3.Parser({format?: string, baseIRI?: string, blankNodePrefix?: string, isImpliedBy?: boolean})
  parse(input: string|Stream, callback: (error, quad, prefixes?)=>void): void
  parse(input: string, listeners: {onQuad, onPrefix?, onComment?}): void
  parse(input: string): Quad[]
  Options:
    format: 'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'Notation3'|'text/n3'
    baseIRI: IRI string
    blankNodePrefix: prefix string or ''
    isImpliedBy: boolean

4 StreamParser
  new N3.StreamParser(options?)  // options same as Parser plus comments?: boolean
  rdfStream.pipe(streamParser).pipe(destination)

5 Writer
  new N3.Writer(streamOrOptions)
    options.prefixes: Record<string,string>
    options.format: 'Turtle'|'N-Triples'|...  default Turtle/TriG
    options.end: boolean
  addQuad(subject, predicate, object, graph?): Writer
  blank(predicate, object): BlankNode
  list(terms: Term[]): BlankNode
  end(callback: (error, result)=>void): void

6 StreamWriter
  new N3.StreamWriter({prefixes, format?, end?})
  streamParser.pipe(streamWriter).pipe(process.stdout)

7 Store
  new N3.Store(quads?: Quad[], {entityIndex?: EntityIndex})
  size: number
  addQuad(quad): void
  addQuads(quads): void
  removeQuad(quad): boolean
  removeQuads(quads): number
  remove(matchesStream): Promise<number>
  removeMatches(s?, p?, o?, g?): number
  deleteGraph(graph): number
  createBlankNode(): BlankNode
  match(s?, p?, o?, g?): Iterable<Quad>
  getQuads(s?, p?, o?, g?): Quad[]
  countQuads(s?, p?, o?, g?): number
  getSubjects(p?, o?, g?): Term[]
  getPredicates(s?, o?, g?): Term[]
  getObjects(s?, p?, g?): Term[]
  getGraphs(s?, p?, o?): Term[]

8 Reasoner
  import {Reasoner} from 'n3';
  new Reasoner(store)
  reason(rules: string|Quad[]): void

## Original Source
JavaScript RDF & JSON-LD Ecosystem
https://github.com/rdfjs/N3.js#readme

## Digest of N3JS

# Installation

**Node.js**

- Command: `npm install n3`
- Import: `const N3 = require('n3');`
- Browser (UMD): bundle with webpack or browserify using `-s N3`, or include `<script src="https://unpkg.com/n3/browser/n3.min.js"></script>`

# DataFactory

Provides factory methods to create RDF terms and quads:

- `namedNode(value: string): NamedNode`
- `literal(value: string, language?: string, datatype?: NamedNode): Literal`
- `defaultGraph(): DefaultGraph`
- `quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad`

# Parser

**Constructor**: `new N3.Parser(options?: { format?: string; baseIRI?: string; blankNodePrefix?: string; isImpliedBy?: boolean })`

**Methods**:

- `parse(input: string | Stream, onQuad: (error: Error|null, quad: Quad|null, prefixes?: Record<string,string>) => void): void`
- `parse(input: string, listeners: { onQuad: (err:Error|null, quad:Quad) => void; onPrefix?: (prefix:string, iri:NamedNode) => void; onComment?: (comment:string)=>void }): void`
- `parse(input: string): Quad[]`

**Options**:

- `format`: MIME type or name (`'Turtle'`, `'TriG'`, `'N-Triples'`, `'N-Quads'`, `'N3'`, `'Notation3'`, `'text/n3'`)
- `baseIRI`: base IRI for relative IRIs
- `blankNodePrefix`: default `'b' + digit + '_'`, set `''` to disable
- `isImpliedBy`: default `false`, when `true` emits `log:isImpliedBy`

# StreamParser

Implements Node.js Readable Stream & RDF.js Sink

**Constructor**: `new N3.StreamParser(options?: { format?: string; baseIRI?: string; blankNodePrefix?: string; isImpliedBy?: boolean; comments?: boolean })`

**Usage**:

- `streamParser.pipe(destinationSink)`
- `rdfStream.pipe(streamParser)`

# Writer

**Constructor**: `new N3.Writer(output?: WritableStream | { prefixes: Record<string,string>; format?: string; end?: boolean })`

**Methods**:

- `addQuad(subject: Term, predicate: Term, object: Term, graph?: Term): Writer`
- `blank(predicate: Term, object: Term): BlankNode`
- `list(elements: Term[]): BlankNode`
- `end(callback: (error: Error|null, result: string) => void): void`

**Default format**: `'Turtle'` or `'TriG'` if named graphs present
**Formats**: `'N-Triples'`, `'application/trig'`, RDF-star variants by adding `'*'`

# StreamWriter

Implements Node.js Writable Stream & RDF.js Sink

**Constructor**: `new N3.StreamWriter(options?: { prefixes: Record<string,string>; format?: string; end?: boolean })`

**Usage**:

- `streamParser.pipe(streamWriter).pipe(process.stdout)`

# Store

In-memory quad store implementing RDF/JS DatasetCore

**Constructor**: `new N3.Store(quads?: Quad[], options?: { entityIndex?: EntityIndex })`

**Properties**:

- `size: number`

**Methods**:

- `addQuad(quad: Quad): void`
- `addQuads(quads: Quad[]): void`
- `removeQuad(quad: Quad): boolean`
- `removeQuads(quads: Quad[]): number`
- `remove(stream: Stream<Quad>): Promise<number>`
- `removeMatches(subject?: Term, predicate?: Term, object?: Term, graph?: Term): number`
- `deleteGraph(graph: Term): number`
- `createBlankNode(): BlankNode`
- `match(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Iterable<Quad>`
- `getQuads(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Quad[]`
- `countQuads(subject?: Term, predicate?: Term, object?: Term, graph?: Term): number`
- `getSubjects(predicate?: Term, object?: Term, graph?: Term): Term[]`
- `getPredicates(subject?: Term, object?: Term, graph?: Term): Term[]`
- `getObjects(subject?: Term, predicate?: Term, graph?: Term): Term[]`
- `getGraphs(subject?: Term, predicate?: Term, object?: Term): Term[]`

# Reasoner

**Classes**: `Reasoner`

**Constructor**: `new Reasoner(store: Store)`

**Methods**:

- `reason(rules: string | Quad[]): void`

# Compatibility & Interfaces

- Full support: RDF1.1 Turtle, TriG, N-Triples, N-Quads, RDF-star, Notation3
- Implements RDF/JS interfaces: DataFactory, Term, Quad, Stream, Sink, Store, Source, DatasetCore


## Attribution
- Source: JavaScript RDF & JSON-LD Ecosystem
- URL: https://github.com/rdfjs/N3.js#readme
- License: License if known
- Crawl Date: 2025-04-28T13:07:10.131Z
- Data Size: 668416 bytes
- Links Found: 5155

## Retrieved
2025-04-28
library/JSONLD_API.md
# library/JSONLD_API.md
# JSONLD_API

## Crawl Summary
JsonLdProcessor interface with methods expand, compact, flatten, frame, toRDF, fromRDF defined in WebIDL with input, context/frame, options arguments and Promise return; RdfDataset and Quad interfaces; JsonLdOptions dictionary listing base, expandContext, documentLoader, processingMode, produceGeneralizedRdf, skipExpansion, ordered, embed, explicit, omitGraph; DocumentLoader signature and RemoteDocument dictionary; JsonLdError codes and structure.

## Normalised Extract
Table of Contents:
1. JsonLdProcessor Interface
2. JsonLdOptions Type
3. DocumentLoader and RemoteDocument
4. Error Handling

1. JsonLdProcessor Interface
  expand(input:object, options:JsonLdOptions):Promise<object>
    - Removes context; expands IRIs; outputs expanded form array or object
    - options.base: base IRI for relative resolution
    - options.expandContext: local context to merge
  compact(input:object, context:object, options:JsonLdOptions):Promise<object>
    - Applies provided context; compacts IRIs to terms or compact IRIs
    - options.processingMode: "json-ld-1.0" | "json-ld-1.1"
  flatten(input:object, context:object|null, options:JsonLdOptions):Promise<object>
    - Collects all node properties in single node object; assigns blank node identifiers
  frame(input:object, frame:object, options:JsonLdOptions):Promise<object>
    - Matches nodes against frame; embeds according to embed, explicit, omitGraph flags
  toRDF(input:object, options:JsonLdOptions):Promise<RdfDataset>
    - Serializes JSON-LD to RDF Dataset; options.produceGeneralizedRdf toggles generalized triples
  fromRDF(dataset:RdfDataset, options:JsonLdOptions):Promise<object>
    - Converts RDF dataset to JSON-LD; options.base and processingMode apply

2. JsonLdOptions Type
  base: string (default: document URL)
  expandContext: object (additional context to apply before expansion)
  documentLoader: (url:string)=>Promise<RemoteDocument> (default: built-in fetch)
  processingMode: "json-ld-1.0" | "json-ld-1.1" (default: "json-ld-1.1")
  produceGeneralizedRdf: boolean (default: false)
  skipExpansion: boolean (default: false)
  ordered: boolean (default: false)
  embed: boolean (default: true for frame)
  explicit: boolean (default: false for frame)
  omitGraph: boolean (default: false for frame)

3. DocumentLoader and RemoteDocument
  DocumentLoader(url) => Promise<RemoteDocument>
  RemoteDocument:
    documentUrl: final URL after redirects
    document: parsed JSON-LD or RDF dataset
    contextUrl: URL of linked context if `Link` header present
    context: preloaded context object

4. Error Handling
  All API calls reject with JsonLdError:
    name: "JsonLdError"
    code: one of LoadingDocumentFailed, InvalidRemoteDocument, InvalidContext, ExpansionError, CompactError, FrameError, ToRdfError, FromRdfError
    message: human-readable detail
    cause: underlying Error object or URI


## Supplementary Details
- Default DocumentLoader uses HTTP GET with Accept: application/ld+json, application/json, text/turtle
- To override context caching, supply custom documentLoader intercepting contextUrl
- To enable 1.0 compatibility, set processingMode to "json-ld-1.0"; errors thrown if context uses 1.1-only keywords
- For large graphs, set ordered=true on toRDF to sort triples lexicographically by subject, predicate, object, graph
- Frame embed/explicit/omitGraph behavior:
  embed:false => only nodes matching at top-level
  explicit:true => output only specified properties; others omitted
  omitGraph:true => omit @graph wrapper in result


## Reference Details
// SDK method signatures and examples

import { JsonLdProcessor, JsonLdOptions } from 'jsonld';
const processor = new JsonLdProcessor();

// Expand example
enum Mode { V1_0 = 'json-ld-1.0', V1_1 = 'json-ld-1.1' }
async function expandExample(input:any) {
  const opts: JsonLdOptions = {
    base: 'http://example.com/',
    documentLoader: (url) => fetchDocument(url),
    processingMode: Mode.V1_1
  };
  return await processor.expand(input, opts);
}

// Compact example
async function compactExample(input:any, ctx:any) {
  const opts: JsonLdOptions = { skipExpansion: false };
  return await processor.compact(input, ctx, opts);
}

// Flatten example
async function flattenExample(input:any, ctx:any|null) {
  const opts: JsonLdOptions = {};
  return await processor.flatten(input, ctx, opts);
}

// Frame example
async function frameExample(input:any, frame:any) {
  const opts: JsonLdOptions = { embed: true, explicit: false, omitGraph: false };
  return await processor.frame(input, frame, opts);
}

// RDF conversion example
toRdfExample(processor, input) {
  const opts: JsonLdOptions = { produceGeneralizedRdf: true, ordered: true };
  return processor.toRDF(input, opts);
}

// Error handling
try {
  await processor.expand(input, {});
} catch(e) {
  if (e.code === 'LoadingDocumentFailed') {
    console.error('Failed to load', e.cause);
  }
}

// Troubleshooting
// Command-line test using Node REPL
// > node -e "require('jsonld').expand({"@id":"_:b0"}).then(console.log).catch(console.error)"
// Expected output: [{"@id":"_:b0"}]


## Information Dense Extract
JsonLdProcessor methods: expand(input,opts):Promise<object>; compact(input,ctx,opts):Promise<object>; flatten(input,ctx,opts):Promise<object>; frame(input,frame,opts):Promise<object>; toRDF(input,opts):Promise<RdfDataset>; fromRDF(dataset,opts):Promise<object>. JsonLdOptions: base:string; expandContext:object; documentLoader:(url)=>Promise<RemoteDocument>; processingMode:'json-ld-1.0'|'json-ld-1.1'; produceGeneralizedRdf:boolean; skipExpansion:boolean; ordered:boolean; embed:boolean; explicit:boolean; omitGraph:boolean. DocumentLoader: (url)=>Promise<{documentUrl,document,contextUrl,context}>. Errors: JsonLdError{name,code:LoadingDocumentFailed|InvalidContext|ExpansionError|CompactError|FrameError|ToRdfError|FromRdfError,message,cause}.

## Sanitised Extract
Table of Contents:
1. JsonLdProcessor Interface
2. JsonLdOptions Type
3. DocumentLoader and RemoteDocument
4. Error Handling

1. JsonLdProcessor Interface
  expand(input:object, options:JsonLdOptions):Promise<object>
    - Removes context; expands IRIs; outputs expanded form array or object
    - options.base: base IRI for relative resolution
    - options.expandContext: local context to merge
  compact(input:object, context:object, options:JsonLdOptions):Promise<object>
    - Applies provided context; compacts IRIs to terms or compact IRIs
    - options.processingMode: 'json-ld-1.0' | 'json-ld-1.1'
  flatten(input:object, context:object|null, options:JsonLdOptions):Promise<object>
    - Collects all node properties in single node object; assigns blank node identifiers
  frame(input:object, frame:object, options:JsonLdOptions):Promise<object>
    - Matches nodes against frame; embeds according to embed, explicit, omitGraph flags
  toRDF(input:object, options:JsonLdOptions):Promise<RdfDataset>
    - Serializes JSON-LD to RDF Dataset; options.produceGeneralizedRdf toggles generalized triples
  fromRDF(dataset:RdfDataset, options:JsonLdOptions):Promise<object>
    - Converts RDF dataset to JSON-LD; options.base and processingMode apply

2. JsonLdOptions Type
  base: string (default: document URL)
  expandContext: object (additional context to apply before expansion)
  documentLoader: (url:string)=>Promise<RemoteDocument> (default: built-in fetch)
  processingMode: 'json-ld-1.0' | 'json-ld-1.1' (default: 'json-ld-1.1')
  produceGeneralizedRdf: boolean (default: false)
  skipExpansion: boolean (default: false)
  ordered: boolean (default: false)
  embed: boolean (default: true for frame)
  explicit: boolean (default: false for frame)
  omitGraph: boolean (default: false for frame)

3. DocumentLoader and RemoteDocument
  DocumentLoader(url) => Promise<RemoteDocument>
  RemoteDocument:
    documentUrl: final URL after redirects
    document: parsed JSON-LD or RDF dataset
    contextUrl: URL of linked context if 'Link' header present
    context: preloaded context object

4. Error Handling
  All API calls reject with JsonLdError:
    name: 'JsonLdError'
    code: one of LoadingDocumentFailed, InvalidRemoteDocument, InvalidContext, ExpansionError, CompactError, FrameError, ToRdfError, FromRdfError
    message: human-readable detail
    cause: underlying Error object or URI

## Original Source
JSON-LD 1.1 Specification and API
https://www.w3.org/TR/json-ld11-api/

## Digest of JSONLD_API

# JSON-LD 1.1 Processing Algorithms and API - Extract
Date Retrieved: 2023-10-10
Source: W3C Recommendation 16 July 2020 (JSON-LD 1.1 API)
Data Size: 34300293 bytes, Links: 160551, Error: None

## 9. The Application Programming Interface

### 9.1 JsonLdProcessor Interface
```webidl
interface JsonLdProcessor {
  Promise<object> expand(
    object input,
    JsonLdOptions options = {});
  Promise<object> compact(
    object input,
    object context,
    JsonLdOptions options = {});
  Promise<object> flatten(
    object input,
    object context = null,
    JsonLdOptions options = {});
  Promise<object> frame(
    object input,
    object frame,
    JsonLdOptions options = {});
  Promise<RdfDataset> toRDF(
    object input,
    JsonLdOptions options = {});
  Promise<object> fromRDF(
    RdfDataset dataset,
    JsonLdOptions options = {});
};
```

### 9.2 RDF Dataset Interfaces
```webidl
dictionary RdfDataset {
  any RDF:Quad[];
};
```
Quad structure: { subject: Term, predicate: Term, object: Term, graph: Term }
Term: IRI | BlankNode | Literal {value, datatype, language}

### 9.3 JsonLdOptions Type
```webidl
dictionary JsonLdOptions {
  DOMString base;
  object expandContext;
  DocumentLoader documentLoader;
  DOMString processingMode;      // "json-ld-1.0" or "json-ld-1.1"
  boolean produceGeneralizedRdf;
  boolean skipExpansion;
  boolean ordered;
  boolean embed;
  boolean explicit;
  boolean omitGraph;
};
```

### 9.4 Remote Document and Context Retrieval
```webidl
callback DocumentLoader = Promise<RemoteDocument> (
  DOMString url
);
dictionary RemoteDocument {
  DOMString documentUrl;
  any document;
  DOMString contextUrl;
  object context;
};
```

### 9.6 Error Handling
Errors throw `JsonLdError` instances with properties:
- `name`: "JsonLdError"
- `code`: "LoadingDocumentFailed", "InvalidContext", "ExpansionError", "CompactError", …
- `message`: detailed description
- `cause`: underlying error or URI



## Attribution
- Source: JSON-LD 1.1 Specification and API
- URL: https://www.w3.org/TR/json-ld11-api/
- License: License
- Crawl Date: 2025-04-27T07:48:08.468Z
- Data Size: 34300293 bytes
- Links Found: 160551

## Retrieved
2025-04-27
library/VITEST_API.md
# library/VITEST_API.md
# VITEST_API

## Crawl Summary
Extracted core API: TestFunction, TestOptions, all test methods (test, skip, only, concurrent, sequential, todo, fails, each, for), bench definitions, describe/suite functions, lifecycle hooks, TestContext hooks. Included precise method signatures, parameters, and defaults.

## Normalised Extract
Table of Contents:
1. Type Aliases
2. Test API
3. Benchmark API
4. Suite API
5. Lifecycle Hooks
6. TestContext Hooks

1. Type Aliases
Awaitable<T> = T | PromiseLike<T>
TestFunction = () => Awaitable<void>

2. Test API
test(name: string, fn: TestFunction, timeout?: number)
test(name: string, options: TestOptions, fn: TestFunction)
skip/skipIf/runIf/only variants as function overloads
concurrent, sequential, todo, fails
Parameterized: each(cases, namePattern, fn), for(cases, namePattern, fn)

3. Benchmark API
bench(name: string, fn: () => void, options?: BenchOptions)
bench.skip/only/todo
BenchOptions: time (ms), iterations, warmupTime, warmupIterations, now, signal, throws, setup, teardown

4. Suite API
describe(name: string, fn: () => void)
describe.skip/skipIf/runIf/only
concurrent, sequential, shuffle, todo, each, for

5. Lifecycle Hooks
beforeEach(fn, timeout)
afterEach(fn, timeout)
beforeAll(fn, timeout)
afterAll(fn, timeout)

6. TestContext Hooks
onTestFinished(callback)
onTestFailed(callback)

## Supplementary Details
TestOptions defaults: retry=0, repeats=0, timeout default=5000ms (global override via testTimeout config). BenchOptions defaults: time=500ms, iterations=10, warmupTime=100ms, warmupIterations=5. Concurrency: test.concurrent runs distinct promise-based tests in parallel, snapshots via context.expect. describe.concurrent runs nested suites/tests in parallel. Sequence: test.sequential within concurrent to enforce order. describe.shuffle uses sequence.shuffle or CLI --sequence.shuffle with seed. Hooks: beforeEach/afterEach optional teardown via returned function. onTestFinished hooks reverse order, skip on dynamic skip; onTestFailed only on failure.

## Reference Details
// Test Definitions
import { test, expect } from 'vitest'
// Basic
test('sum', () => { expect(1+1).toBe(2) })
// Timeout override
test('heavy', { timeout: 10000 }, async () => { await doHeavy() })
// Retry and repeats
test('flaky', { retry: 2, repeats: 3 }, async () => { await unstableOp() })
// Skipped
test.skip('skip', () => {})
test.skipIf(process.env.NODE_ENV!=='prod')('prod-only', () => {})
// Only
test.only('focus', () => {})
// Concurrent
test.concurrent('parallel1', async ({ expect }) => { expect(await api()).toBe(1) })
// Sequential in concurrent
test.sequential('seq1', async () => {})
// Fails
test.fails('should fail', async () => { await expect(Promise.reject('err')).rejects.toBe('err') })
// TODO
test.todo('implement me')
// Parameterized
test.each([ [1,2,3], [2,3,5] ])('add %i+%i', (a,b,expected) => { expect(a+b).toBe(expected) })
// Benchmarks
import { bench } from 'vitest'
bench('sort 1000', { time:1000, iterations:20 }, () => { array.sort() })
bench.skip('skipped bench', () => {})
bench.only('only bench', () => {})
bench.todo('bench me')
// Suites
import { describe } from 'vitest'
describe('math', () => { test('sum', () => {}) })
describe.skip('skip suite', () => { })
// Hooks
beforeAll(async () => { await initDb() })
afterAll(async () => { await closeDb() })
beforeEach(async () => { await resetData() })
afterEach(async () => { await clearMocks() })
// TestContext Hooks
test('db', ({ onTestFinished, onTestFailed }) => { const c=db.connect(); onTestFinished(() => c.close()); onTestFailed(() => log(c.errors)); c.query() })


## Information Dense Extract
Awaitable<T>=T|PromiseLike<T>;TestFunction=()=>Awaitable<void>;TestOptions={timeout?:number,retry?:number=0,repeats?:number=0};test(name:string,fn:TestFunction,timeout?:number)|test(name:string,options:TestOptions,fn:TestFunction);test.skip/runIf/skipIf/only/concurrent/sequential/todo/fails overloads;test.each<T>(cases:T[],pattern:string,fn:(...args:T)=>void);test.for<T>(cases:T[],pattern:string,fn:(args:T)=>void);BenchOptions={time?:number=500,iterations?:number=10,warmupTime?:100,warmupIterations?:5,now?:()=>number,signal?:AbortSignal,throws?:boolean,setup?:Hook,teardown?:Hook};bench(name:string,fn:()=>void,options?:BenchOptions);bench.skip/only/todo;describe(name:string,fn:()=>void);describe.skip/skipIf/runIf/only/concurrent/sequential/shuffle/todo/each/for;beforeEach(fn,timeout?:number);afterEach(fn,timeout?:number);beforeAll(fn,timeout?:number);afterAll(fn,timeout?:number);onTestFinished(cb);onTestFailed(cb)

## Sanitised Extract
Table of Contents:
1. Type Aliases
2. Test API
3. Benchmark API
4. Suite API
5. Lifecycle Hooks
6. TestContext Hooks

1. Type Aliases
Awaitable<T> = T | PromiseLike<T>
TestFunction = () => Awaitable<void>

2. Test API
test(name: string, fn: TestFunction, timeout?: number)
test(name: string, options: TestOptions, fn: TestFunction)
skip/skipIf/runIf/only variants as function overloads
concurrent, sequential, todo, fails
Parameterized: each(cases, namePattern, fn), for(cases, namePattern, fn)

3. Benchmark API
bench(name: string, fn: () => void, options?: BenchOptions)
bench.skip/only/todo
BenchOptions: time (ms), iterations, warmupTime, warmupIterations, now, signal, throws, setup, teardown

4. Suite API
describe(name: string, fn: () => void)
describe.skip/skipIf/runIf/only
concurrent, sequential, shuffle, todo, each, for

5. Lifecycle Hooks
beforeEach(fn, timeout)
afterEach(fn, timeout)
beforeAll(fn, timeout)
afterAll(fn, timeout)

6. TestContext Hooks
onTestFinished(callback)
onTestFailed(callback)

## Original Source
Vitest Testing Framework
https://vitest.dev/api/

## Digest of VITEST_API

# Vitest API Reference
Date Retrieved: 2023-11-27

## Type Aliases

```ts
// Return value for async operations
type Awaitable<T> = T | PromiseLike<T>

// Test function signature
//   - no args, returns Awaitable<void>
//   - for done callback style use async function instead
// Example:
//   function testName(done: DoneCallback): void
//   async function testName(): Promise<void>
type TestFunction = () => Awaitable<void>
```

## Test Options Interface

```ts
interface TestOptions {
  timeout?: number            // fail if test exceeds this ms
  retry?: number              // number of retry attempts, default 0
  repeats?: number            // repeat execution cycles, default 0
}
```

## Core Test Functions

```ts
// Primary test definition. Alias: it
function test(name: string, fn: TestFunction, timeout?: number): void;
function test(name: string, options: TestOptions, fn: TestFunction): void;

// Skip tests
test.skip(name: string, fn: TestFunction): void;
test.skip(name: string, options: TestOptions, fn: TestFunction): void;
// Conditional skip
test.skipIf(condition: boolean): (name: string, fn: TestFunction) => void;
test.skipIf(condition: boolean)(name: string, options: TestOptions, fn: TestFunction);
// Run if condition
test.runIf(condition: boolean): (name: string, fn: TestFunction) => void;

// Only run marked tests
test.only(name: string, fn: TestFunction, timeout?: number): void;

// Parallel execution
test.concurrent(name: string, fn: TestFunction, timeout?: number): void;

// Sequential in concurrent suite
test.sequential(name: string, fn: TestFunction, timeout?: number): void;

// Stub placeholder tests
test.todo(name: string): void;

// Expect failure
test.fails(name: string, fn: TestFunction): void;

// Parameterized tests
test.each<T extends any[]>(cases: T[], name: string, fn: (...args: T) => void): void;
test.each<T>(cases: T[], namePattern: string, fn: (item: T) => void): void;

// Table tests via template literal
test.each<T>(table: TemplateStringArray, ...values: T[]): void;

// Alternative for TestContext
test.for<T extends any[]>(cases: T[], name: string, fn: (args: T) => void): void;
```

## Benchmarks

```ts
// Define benchmarks
function bench(name: string, fn: () => void, options?: BenchOptions): void;

interface BenchOptions {
  time?: number            // ms, default 500
  iterations?: number      // default 10
  warmupTime?: number      // ms, default 100
  warmupIterations?: number// default 5
  now?: () => number
  signal?: AbortSignal
  throws?: boolean
  setup?: HookFunction
  teardown?: HookFunction
}

// Skip, only, todo variants
bench.skip(name: string, fn: () => void): void;
bench.only(name: string, fn: () => void): void;
bench.todo(name: string): void;
```

## Suites

```ts
// Define suite
function describe(name: string, fn: () => void): void;

// Skip, only, todo
describe.skip(name: string, fn: () => void): void;
describe.skipIf(cond: boolean)(name: string, fn: () => void): void;
describe.runIf(cond: boolean)(name: string, fn: () => void): void;
describe.only(name: string, fn: () => void, options?: number|TestOptions): void;

describe.concurrent(name: string, fn: () => void): void;
describe.sequential(name: string, fn: () => void): void;
describe.shuffle(name: string, fn: () => void): void;
describe.todo(name: string): void;
describe.each(cases, namePattern, fn): void;
describe.for(cases, name, fn): void;
```

## Hooks

```ts
// beforeEach, afterEach, beforeAll, afterAll
function beforeEach(fn: () => Awaitable<void>, timeout?: number): void;
function afterEach(fn: () => Awaitable<void>, timeout?: number): void;
function beforeAll(fn: () => Awaitable<void>, timeout?: number): void;
function afterAll(fn: () => Awaitable<void>, timeout?: number): void;

// Test-scoped hooks (must be used inside test body)
function onTestFinished(callback: () => void): void;
function onTestFailed(callback: (ctx: ExtendedContext) => void): void;
```


## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/api/
- License: License if known
- Crawl Date: 2025-04-28T22:48:47.991Z
- Data Size: 37459126 bytes
- Links Found: 25877

## Retrieved
2025-04-28
library/RDF4J_GUIDE.md
# library/RDF4J_GUIDE.md
# RDF4J_GUIDE

## Crawl Summary
Repository setup classes: SailRepository with MemoryStore or NativeStore(dataDir,indexes). Initialize via initialize() and shutDown(). Obtain RepositoryConnection via getConnection(). Perform SPARQL queries with prepareTupleQuery/prepareGraphQuery/prepareBooleanQuery and evaluate(). Perform SPARQL updates with prepareUpdate() and execute(). Manage transactions via setAutoCommit, begin, commit, rollback. Import RDF via Rio.createParser and StatementCollector. Export via Rio.createWriter and connection.export(). Remote via HTTPRepository(serverURL,repoID) with optional setUsernameAndPassword. Configuration parameters: dataDir path, tripleIndexes, autoCommit default true, supported formats: RDFXML,TURTLE,NTRIPLES,N3,JSONLD.

## Normalised Extract
Table of Contents:
1. Repository Setup
2. Connection Lifecycle
3. SPARQL Query Execution
4. SPARQL Update Execution
5. Transaction Management
6. RDF Import and Export
7. Remote HTTP Repository
8. Logging Configuration

1. Repository Setup
- Instantiate repository:
  - In-memory: new SailRepository(new MemoryStore())
  - Native: new SailRepository(new NativeStore(new File("/data/rdf4j"),"spoc,posc,cpso"))
- Initialize: repository.initialize()
- Shutdown: repository.shutDown()

2. Connection Lifecycle
- Obtain: RepositoryConnection conn = repository.getConnection()
- Close: conn.close()

3. SPARQL Query Execution
- Prepare: TupleQuery q = conn.prepareTupleQuery(QueryLanguage.SPARQL,queryString)
- Execute: TupleQueryResult r = q.evaluate()
- Iterate: while(r.hasNext()){BindingSet bs=r.next();}
- Close: r.close()

4. SPARQL Update Execution
- Prepare: Update u = conn.prepareUpdate(QueryLanguage.SPARQL,updateString)
- Execute: u.execute()

5. Transaction Management
- Auto-commit: conn.setAutoCommit(false) or true
- Begin: conn.begin()
- Commit: conn.commit()
- Rollback: conn.rollback()

6. RDF Import and Export
- Import Turtle: RDFParser p=Rio.createParser(RDFFormat.TURTLE); p.setRDFHandler(new StatementCollector(conn)); p.parse(new FileInputStream("in.ttl"),baseURI)
- Export N-Triples: RDFWriter w=Rio.createWriter(RDFFormat.NTRIPLES,out); conn.export(w)

7. Remote HTTP Repository
- Create: HTTPRepository repo = new HTTPRepository("http://localhost:8080/rdf4j-server","repoID")
- Auth: repo.setUsernameAndPassword("user","pass")
- Initialize and get connection as above

8. Logging Configuration
- log4j.properties:
  - log4j.logger.org.eclipse.rdf4j=INFO, file
  - log4j.appender.file.File=logs/rdf4j.log

## Supplementary Details
Configuration Options:
- dataDir (File): directory for NativeStore data (default: user.home/.rdf4j)
- tripleIndexes (String): comma-separated combination of spo,sop,pso,pos,osp,ops (default: spo,pso,pos)
- autoCommit (boolean): true/false, default true
- syncDelayMS (long): delay in ms for FS sync (default: 1000)

Supported RDFFormat values and MIME mapping:
- RDFXML: application/rdf+xml
- TURTLE: text/turtle
- NTRIPLES: application/n-triples
- N3: text/rdf+n3
- JSONLD: application/ld+json

HTTPRepository settings:
- serverURL: full endpoint of RDF4J server
- repositoryID: identifier of remote repo
- httpMaxConnections (system property org.eclipse.rdf4j.httpclient.maxConnections): default 20

Initialization Steps:
1. Instantiate repository
2. Call initialize()
3. Obtain connection
4. Execute operations
5. Close connection
6. Call shutDown()

## Reference Details
Interface Repository:
- void initialize() throws RepositoryException
- boolean isInitialized()
- void shutDown() throws RepositoryException
- RepositoryConnection getConnection() throws RepositoryException

Interface RepositoryConnection:
- void setAutoCommit(boolean autoCommit)
- boolean isAutoCommit()
- void begin() throws RepositoryException
- void commit() throws RepositoryException
- void rollback() throws RepositoryException
- TupleQuery prepareTupleQuery(QueryLanguage lang,String query) throws RepositoryException,MalformedQueryException
- GraphQuery prepareGraphQuery(QueryLanguage lang,String query) throws RepositoryException,MalformedQueryException
- BooleanQuery prepareBooleanQuery(QueryLanguage lang,String query) throws RepositoryException,MalformedQueryException
- Update prepareUpdate(QueryLanguage lang,String update) throws RepositoryException,MalformedQueryException
- void add(Iterable<? extends Statement> statements,Resource... contexts) throws RepositoryException
- void remove(IRI subj,IRI pred,Value obj,Resource... contexts) throws RepositoryException
- RepositoryResult<Statement> getStatements(Resource subj,IRI pred,Value obj,boolean includeInferred,Resource... contexts) throws RepositoryException
- void clear(Resource... contexts) throws RepositoryException
- void export(RDFHandler handler,Resource... contexts) throws RepositoryException
- void close() throws RepositoryException

Class HTTPRepository:
- HTTPRepository(String serverURL,String repositoryID)
- void setUsernameAndPassword(String user,String pass)
- inherits Repository methods

Code Example:
```
SailRepository repository=new SailRepository(new NativeStore(new File("/var/data/rdf4j"),"spoc,posc,osp"));
repository.initialize();
try(RepositoryConnection conn=repository.getConnection()){
  conn.setAutoCommit(false);
  TupleQuery q=conn.prepareTupleQuery(QueryLanguage.SPARQL,"SELECT ?s?o WHERE{?s ?p ?o}");
  try(TupleQueryResult res=q.evaluate()){
    while(res.hasNext()){System.out.println(res.next().getValue("s"));}
  }
  conn.commit();
}
repository.shutDown();
```

Best Practices:
- Batch imports within a single transaction
- Configure appropriate indexes for expected query patterns
- Use try-with-resources for connections and results

Troubleshooting:
- Repository not initialized: call initialize() before getConnection()
- Excessive memory use: increase JVM heap or switch to NativeStore
- HTTP 429 Too Many Requests: increase httpMaxConnections
- To list repos via curl: `curl -X GET http://localhost:8080/rdf4j-server/repositories` (expect JSON array of IDs)

## Information Dense Extract
RDF4J Programming Guide: Instantiate SailRepository(MemoryStore|NativeStore(dataDir,indexes)); call initialize(); RepositoryConnection conn=getConnection(); conn.setAutoCommit(false); conn.begin();
prepareTupleQuery/SPARQL, prepareUpdate/SPARQL; TupleQueryResult evaluate(); Update.execute(); commit()/rollback(); conn.close(); repository.shutDown();
Rio.createParser(RDFFormat.TURTLE) with StatementCollector; Rio.createWriter(RDFFormat.NTRIPLES,out); conn.export(writer);
HTTPRepository(serverURL,repoID); setUsernameAndPassword; inherits Repository API; httpMaxConnections default 20.
Config options: dataDir user.home/.rdf4j; tripleIndexes spo,pso,pos; autoCommit=true; syncDelayMS=1000.
API signatures: Repository.initialize(),getConnection(),shutDown(); RepositoryConnection methods: setAutoCommit,begin,commit,rollback,prepareTupleQuery,prepareGraphQuery,prepareBooleanQuery,prepareUpdate,add,remove,getStatements,clear,export,close().
Supported formats: RDFXML,TURTLE,NTRIPLES,N3,JSONLD.
Best practices: batch transactions, proper indexes, try-with-resources.
Troubleshoot: init order errors, memory config, HTTP rate limits, curl list.

## Sanitised Extract
Table of Contents:
1. Repository Setup
2. Connection Lifecycle
3. SPARQL Query Execution
4. SPARQL Update Execution
5. Transaction Management
6. RDF Import and Export
7. Remote HTTP Repository
8. Logging Configuration

1. Repository Setup
- Instantiate repository:
  - In-memory: new SailRepository(new MemoryStore())
  - Native: new SailRepository(new NativeStore(new File('/data/rdf4j'),'spoc,posc,cpso'))
- Initialize: repository.initialize()
- Shutdown: repository.shutDown()

2. Connection Lifecycle
- Obtain: RepositoryConnection conn = repository.getConnection()
- Close: conn.close()

3. SPARQL Query Execution
- Prepare: TupleQuery q = conn.prepareTupleQuery(QueryLanguage.SPARQL,queryString)
- Execute: TupleQueryResult r = q.evaluate()
- Iterate: while(r.hasNext()){BindingSet bs=r.next();}
- Close: r.close()

4. SPARQL Update Execution
- Prepare: Update u = conn.prepareUpdate(QueryLanguage.SPARQL,updateString)
- Execute: u.execute()

5. Transaction Management
- Auto-commit: conn.setAutoCommit(false) or true
- Begin: conn.begin()
- Commit: conn.commit()
- Rollback: conn.rollback()

6. RDF Import and Export
- Import Turtle: RDFParser p=Rio.createParser(RDFFormat.TURTLE); p.setRDFHandler(new StatementCollector(conn)); p.parse(new FileInputStream('in.ttl'),baseURI)
- Export N-Triples: RDFWriter w=Rio.createWriter(RDFFormat.NTRIPLES,out); conn.export(w)

7. Remote HTTP Repository
- Create: HTTPRepository repo = new HTTPRepository('http://localhost:8080/rdf4j-server','repoID')
- Auth: repo.setUsernameAndPassword('user','pass')
- Initialize and get connection as above

8. Logging Configuration
- log4j.properties:
  - log4j.logger.org.eclipse.rdf4j=INFO, file
  - log4j.appender.file.File=logs/rdf4j.log

## Original Source
Java-based RDF Frameworks & Stores
https://rdf4j.org/documentation/programmers-guide/

## Digest of RDF4J_GUIDE

# RDF4J Programming Guide
Date: 2024-06-15

## Repository Configuration

Implementation classes:
- SailRepository (org.eclipse.rdf4j.repository.sail.SailRepository)
- MemoryStore (org.eclipse.rdf4j.sail.memory.MemoryStore)
- NativeStore (org.eclipse.rdf4j.sail.nativerdf.NativeStore)

NativeStore constructor:
```
new NativeStore(File dataDir,String tripleIndexes)
```
Parameters:
- dataDir: File path to store indexes and data
- tripleIndexes: comma-separated index names (valid values: spo, sop, pso, pos, osp, ops)

## Initialization API

Method signatures:
```
void initialize() throws RepositoryException
void shutDown() throws RepositoryException
``` 

## Connection API

```
RepositoryConnection getConnection() throws RepositoryException
``` 
Return: RepositoryConnection instance

## SPARQL Query API

TupleQuery prepareTupleQuery(QueryLanguage language,String queryString) 
throws RepositoryException, MalformedQueryException

TupleQueryResult evaluate() throws QueryEvaluationException

## SPARQL Update API

Update prepareUpdate(QueryLanguage language,String updateString)
throws RepositoryException, MalformedQueryException

void execute() throws UpdateExecutionException

## Transaction Management

```
void setAutoCommit(boolean autoCommit)
void begin() throws RepositoryException
void commit() throws RepositoryException
void rollback() throws RepositoryException
``` 
Defaults: autoCommit=true

## Rio Parsers and Writers

RDFParser createParser(RDFFormat format)
RDFWriter createWriter(RDFFormat format, OutputStream out)

Supported formats: RDFXML, TURTLE, NTRIPLES, N3, JSONLD

## Import/Export

Import:
```
RDFParser parser=Rio.createParser(RDFFormat.TURTLE);
parser.setRDFHandler(new StatementCollector(repo.getConnection()));
parser.parse(new FileInputStream("data.ttl"),"http://example.org/base");
```
Export:
```
RDFWriter writer=Rio.createWriter(RDFFormat.NTRIPLES,out);
conn.getConnection().export(writer);
```  

## HTTP Repository

Class: HTTPRepository (org.eclipse.rdf4j.repository.http.HTTPRepository)

Constructor:
```
HTTPRepository(String serverURL,String repositoryID)
```
Methods:
```
void setUsernameAndPassword(String user,String pass)
void initialize()
RepositoryConnection getConnection()
```  

## Logging Configuration

Use log4j:
```
log4j.logger.org.eclipse.rdf4j=INFO, file
log4j.appender.file.File=logs/rdf4j.log
```

## Attribution
- Source: Java-based RDF Frameworks & Stores
- URL: https://rdf4j.org/documentation/programmers-guide/
- License: License
- Crawl Date: 2025-04-28T10:29:56.927Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
library/ROBOT_TOOL.md
# library/ROBOT_TOOL.md
# ROBOT_TOOL

## Crawl Summary
- Maven build commands: mvn clean package produces bin/robot.jar; additional mvn targets: clean test, clean verify, site.
- Docker: build with docker build --tag robot:latest .; run commands via docker run --rm robot [args].
- Code style enforced via fmt-maven-plugin v2.10 using google-java-format
- Command classes implement interface Command with main(String[] args); entry via CommandLineInterface; shared options parsed by CommandLineHelper.
- Operations in org.obolibrary.robot.operation are static methods returning OWLOntology or Set<IRI>, with no IO.
- IOHelper provides loadOntology(Path, OWLOntologyManager), saveOntology(OWLOntology, Path, OWLDocumentFormat), parseTermList(String) and loadTermList(Path).
- Term lists: space-separated IRIs/CURIEs; lines with # at start or after whitespace ignored.

## Normalised Extract
Table of Contents:
1 Build Configuration
2 Command Implementation
3 Operation Patterns
4 Helper Class Usage
5 Term List Parsing

1 Build Configuration
Use Maven 3.6+ and Java 11+:
- mvn clean package            produces bin/robot.jar
- mvn clean test               JUnit tests, surefire-reports
- mvn clean verify             integration tests, failsafe-reports
- mvn site                     generates Javadoc in target/site
Use Docker:
- docker build --tag robot:latest .
- docker run --rm robot --help

2 Command Implementation
Commands implement org.obolibrary.robot.Command:
- Signature: void main(String[] args)
Entry point: org.obolibrary.robot.CommandLineInterface.parse(args)
Shared options:
- --input <file>     Path to ontology input
- --prefix <file>    Prefix file for CURIE expansion
- --output <file>    Path to ontology output
Use CommandLineHelper:
- CommandLine cmd = CommandLineHelper.create(commandName, args)
- Path in = CommandLineHelper.getOptionPath(cmd, "input");
- String pf = CommandLineHelper.getOptionValue(cmd, "prefix");
- CommandLineHelper.checkRequired(cmd, List.of("input","output"));

3 Operation Patterns
Operations reside in org.obolibrary.robot.operation:
- static OWLOntology merge(OWLOntology a, OWLOntology b)
- static Set<IRI> enrich(OWLOntology ontology, Set<IRI> terms)
All operations avoid IO or CLI; they accept in-memory OWLOntology and return results.

4 Helper Class Usage
CommandLineHelper:
- create(String commandName, String[] args) throws ParseException
- getOptionPath(CommandLine, String) throws IllegalArgumentException
- getOptionValue(CommandLine, String) throws IllegalArgumentException
- isFlagSet(CommandLine, String)

IOHelper:
- loadOntology(Path, OWLOntologyManager) returns OWLOntology throws OWLOntologyCreationException
- saveOntology(OWLOntology, Path, OWLDocumentFormat) throws OWLOntologyStorageException
- parseTermList(String) returns Set<IRI>
- loadTermList(Path) throws IOException

5 Term List Parsing
- parseTermList accepts a space-separated string of IRIs or CURIEs; returns Set<IRI>
- loadTermList reads a file; ignores lines where # starts or follows whitespace; returns Set<IRI>

## Supplementary Details
pom.xml plugin configuration:
<plugin>
  <groupId>com.coveo</groupId>
  <artifactId>fmt-maven-plugin</artifactId>
  <version>2.10</version>
  <configuration>
    <style>GOOGLE</style>
  </configuration>
</plugin>

Implementation steps:
1 Install Java 11+, Maven 3.6+
2 Clone repository
3 mvn clean package
4 java -jar bin/robot.jar --help

Default JVM options:
- Xmx2G recommended; increase via -J-Xmx4G for large ontologies

Dependencies:
- OWLAPI 5.1.19 on classpath

Module structure:
- robot-core: operations and utilities
- robot-command: CLI commands
- robot-maven-plugin: integrates into Maven lifecycle
- robot-mock-plugin: testing helpers
- util: shared utilities


## Reference Details
Interface Command
Signature:
  void main(String[] args)

Class CommandLineHelper
Methods:
  static CommandLine create(String commandName, String[] args) throws org.apache.commons.cli.ParseException
  static Path getOptionPath(CommandLine cmd, String option) throws IllegalArgumentException
  static String getOptionValue(CommandLine cmd, String option) throws IllegalArgumentException
  static boolean isFlagSet(CommandLine cmd, String flag)
  static void checkRequired(CommandLine cmd, List<String> options) throws IllegalArgumentException

Class IOHelper
Methods:
  static OWLOntology loadOntology(Path path, OWLOntologyManager manager)
    throws IOException, OWLOntologyCreationException
  static void saveOntology(OWLOntology ontology, Path path, OWLDocumentFormat format)
    throws IOException, OWLOntologyStorageException
  static Set<IRI> parseTermList(String termList)
  static Set<IRI> loadTermList(Path file) throws IOException

Operations examples:
Class MergeOperation
  static OWLOntology merge(OWLOntology source, OWLOntology target)
    throws OperationException

Command example:
public class MergeCommand implements Command {
  public static final String NAME = "merge";
  public static void main(String[] args) {
    CommandLine cmd = CommandLineHelper.create(NAME, args);
    Path inputA = CommandLineHelper.getOptionPath(cmd, "input");
    Path inputB = CommandLineHelper.getOptionPath(cmd, "input");
    Path output = CommandLineHelper.getOptionPath(cmd, "output");
    OWLOntology a = IOHelper.loadOntology(inputA, null);
    OWLOntology b = IOHelper.loadOntology(inputB, null);
    OWLOntology merged = MergeOperation.merge(a, b);
    IOHelper.saveOntology(merged, output, new OWLXMLOntologyFormat());
  }
}

Best practice:
Always validate before merging:
  robot validate --input ontology.owl
Expected output: "Validation passed: 0 errors"

Troubleshooting:
1 OWLOntologyCreationException: run "robot validate --input file.owl" and fix reported syntax errors
2 OutOfMemoryError: rebuild with increased heap
   mvn exec:java -Dexec.args="-J-Xmx4G merge --input a.owl --input b.owl --output c.owl"
3 CLI parse errors: missing required option
   CommandLineHelper.checkRequired throws IllegalArgumentException listing missing options


## Information Dense Extract
Maven: mvn clean package→bin/robot.jar; mvn clean test, verify, site. Docker: docker build --tag robot:latest .; docker run --rm robot --help. Commands: implement org.obolibrary.robot.Command main(String[] args); parse with CommandLineHelper.create, getOptionPath, getOptionValue, isFlagSet, checkRequired. IO via IOHelper.loadOntology(Path,Manager), saveOntology(OWLOntology,Path,Format), parseTermList(String), loadTermList(Path). Operations: static methods in org.obolibrary.robot.operation e.g. merge(OWLOntology,OWLOntology). Term lists: space-separated IRIs/CURIEs; lines with # at start or after whitespace ignored. Code style: fmt-maven-plugin v2.10 style=GOOGLE. Java 11+, OWLAPI 5.1.19. Troubleshoot: robot validate for syntax; increase -Xmx via -J; check CLI exceptions for missing options.

## Sanitised Extract
Table of Contents:
1 Build Configuration
2 Command Implementation
3 Operation Patterns
4 Helper Class Usage
5 Term List Parsing

1 Build Configuration
Use Maven 3.6+ and Java 11+:
- mvn clean package            produces bin/robot.jar
- mvn clean test               JUnit tests, surefire-reports
- mvn clean verify             integration tests, failsafe-reports
- mvn site                     generates Javadoc in target/site
Use Docker:
- docker build --tag robot:latest .
- docker run --rm robot --help

2 Command Implementation
Commands implement org.obolibrary.robot.Command:
- Signature: void main(String[] args)
Entry point: org.obolibrary.robot.CommandLineInterface.parse(args)
Shared options:
- --input <file>     Path to ontology input
- --prefix <file>    Prefix file for CURIE expansion
- --output <file>    Path to ontology output
Use CommandLineHelper:
- CommandLine cmd = CommandLineHelper.create(commandName, args)
- Path in = CommandLineHelper.getOptionPath(cmd, 'input');
- String pf = CommandLineHelper.getOptionValue(cmd, 'prefix');
- CommandLineHelper.checkRequired(cmd, List.of('input','output'));

3 Operation Patterns
Operations reside in org.obolibrary.robot.operation:
- static OWLOntology merge(OWLOntology a, OWLOntology b)
- static Set<IRI> enrich(OWLOntology ontology, Set<IRI> terms)
All operations avoid IO or CLI; they accept in-memory OWLOntology and return results.

4 Helper Class Usage
CommandLineHelper:
- create(String commandName, String[] args) throws ParseException
- getOptionPath(CommandLine, String) throws IllegalArgumentException
- getOptionValue(CommandLine, String) throws IllegalArgumentException
- isFlagSet(CommandLine, String)

IOHelper:
- loadOntology(Path, OWLOntologyManager) returns OWLOntology throws OWLOntologyCreationException
- saveOntology(OWLOntology, Path, OWLDocumentFormat) throws OWLOntologyStorageException
- parseTermList(String) returns Set<IRI>
- loadTermList(Path) throws IOException

5 Term List Parsing
- parseTermList accepts a space-separated string of IRIs or CURIEs; returns Set<IRI>
- loadTermList reads a file; ignores lines where # starts or follows whitespace; returns Set<IRI>

## Original Source
ROBOT: Release OWL Ontology Builder
https://github.com/ontodev/robot#readme

## Digest of ROBOT_TOOL

# Build and Packaging
retrieved: 2024-06-01

## Maven Build
Command: mvn clean package
Output: bin/robot.jar
Additional targets:
- mvn clean test        (JUnit tests, reports in [module]/target/surefire-reports)
- mvn clean verify      (integration tests, reports in [module]/target/failsafe-reports)
- mvn site              (Javadoc in target/site and [module]/target/site)

## Docker Build
Commands:
- docker build --tag robot:latest .
- docker run --rm robot --help

# Code Style
Plugin: fmt-maven-plugin version 2.10
Configuration in pom.xml:
<plugin>
  <groupId>com.coveo</groupId>
  <artifactId>fmt-maven-plugin</artifactId>
  <version>2.10</version>
  <configuration>
    <style>GOOGLE</style>
  </configuration>
</plugin>

# Command Infrastructure
Interface: org.obolibrary.robot.Command
Required method: void main(String[] args)
Entry point: org.obolibrary.robot.CommandLineInterface
Shared CLI options: --input <file>  --prefix <file>  --output <file>

# Operations
Package: org.obolibrary.robot.operation
All methods static; must not perform IO or CLI code; return types include OWLOntology, Set<IRI>

# Helper Classes
org.obolibrary.robot.CommandLineHelper: methods to parse and validate CLI options
org.obolibrary.robot.IOHelper: methods to load and save ontologies and term lists

# Term List Format
Space-separated IRIs or CURIEs; lines starting or preceded by whitespace with # are comments; # inside an IRI is literal


## Attribution
- Source: ROBOT: Release OWL Ontology Builder
- URL: https://github.com/ontodev/robot#readme
- License: License if known
- Crawl Date: 2025-04-29T13:54:04.259Z
- Data Size: 490177 bytes
- Links Found: 3993

## Retrieved
2025-04-29
library/HTTP_SERVER.md
# library/HTTP_SERVER.md
# HTTP_SERVER

## Crawl Summary
HTTP module core implementation: createServer signature with explicit http.ServerOptions fields (IncomingMessageConstructor, ServerResponseConstructor, allowHTTP1, maxHeadersCount); Server.listen overloads; IncomingMessage properties/methods; ServerResponse API; Server events list; typical error codes; basic example.

## Normalised Extract
Table of Contents:
1. Module Import
2. Server Creation (createServer)
3. Listening Configuration (listen)
4. Request API (IncomingMessage)
5. Response API (ServerResponse)
6. Server Events
7. Error Handling

1. Module Import
import { createServer } from 'node:http';

2. Server Creation
Signature: createServer([options:ServerOptions],[requestListener]) -> Server
ServerOptions interface:
  IncomingMessageConstructor: constructor for req (default http.IncomingMessage)
  ServerResponseConstructor: constructor for res (default http.ServerResponse)
  allowHTTP1: boolean, default true
  maxHeadersCount: integer, default 2000
  backlog: integer forwarded to listen

3. Listening Configuration
server.listen(port?: number|string, hostname?: string, backlog?: number, callback?: ()=>void)
Defaults: port=0, hostname='::', backlog=undefined

4. Request API
IncomingMessage extends Stream.Readable
Properties:
  method: string, req.method
  url: string, req.url
  headers: object, lowercase header names
  socket: net.Socket
Methods:
  setTimeout(msecs: number, callback?: ()=>void)

5. Response API
ServerResponse extends Stream.Writable
Methods:
  write(chunk: string|Buffer, encoding?: string): boolean
  setHeader(name: string, value: string|string[]): void
  getHeader(name: string): string|string[]|undefined
  removeHeader(name: string): void
  writeHead(statusCode: number, statusMessage?: string, headers?: object): void
  end([data][, encoding][, callback]): void

6. Server Events:
  'request': (req,res)
  'connection': (socket)
  'listening': ()
  'close': ()
  'error': (err)
  'timeout': (socket)

7. Error Handling
Listen for 'error' event:
server.on('error', err => {
  if(err.code==='EADDRINUSE') handlePortInUse();
});

## Supplementary Details
Default ServerOptions:
  allowHTTP1: true (accept both HTTP/1.x)
  maxHeadersCount: 2000 (max number of headers to parse)
Default Timeouts:
  server.timeout: 120000 ms
  server.keepAliveTimeout: 5000 ms
  server.headersTimeout: 60000 ms
Implementation Steps:
1. Import module: import { createServer } from 'node:http'
2. Instantiate server with options and requestListener
3. Configure timeouts via server.setTimeout, server.keepAliveTimeout
4. Call server.listen(port, hostname, backlog, callback)
5. Attach 'error' and 'close' event handlers before listen
6. Inside listener, inspect req.method, req.url, req.headers
7. Use res.setHeader/write/writeHead/end to send response


## Reference Details
API Specifications:

interface ServerOptions {
  IncomingMessageConstructor?: typeof IncomingMessage;
  ServerResponseConstructor?: typeof ServerResponse;
  allowHTTP1?: boolean;
  maxHeadersCount?: number;
  backlog?: number;
}

function createServer(options?: ServerOptions, requestListener?: (req: IncomingMessage, res: ServerResponse) => void): Server;

class Server extends net.Server {
  timeout: number;
  keepAliveTimeout: number;
  headersTimeout: number;
  listen(port?: number|string, hostname?: string, backlog?: number, callback?:()=>void): this;
  setTimeout(msecs: number, callback?: ()=>void): this;
  on(event: 'request', listener: (req: IncomingMessage, res: ServerResponse)=>void): this;
  on(event: 'connection', listener: (socket: net.Socket)=>void): this;
  on(event: 'listening', listener: ()=>void): this;
  on(event: 'close', listener: ()=>void): this;
  on(event: 'error', listener: (err: Error & {code?: string})=>void): this;
  on(event: 'timeout', listener: (socket: net.Socket)=>void): this;
}

class IncomingMessage extends Stream.Readable {
  readonly method?: string;
  readonly url?: string;
  readonly headers: IncomingHttpHeaders;
  readonly socket: net.Socket;
  setTimeout(msecs: number, callback?: ()=>void): this;
}

class ServerResponse extends Stream.Writable {
  write(chunk: string|Buffer, encoding?: string): boolean;
  setHeader(name: string, value: string|string[]): void;
  getHeader(name: string): string|string[]|undefined;
  removeHeader(name: string): void;
  writeHead(statusCode: number, statusMessage?: string, headers?: OutgoingHttpHeaders): void;
  end(data?: string|Buffer, encoding?: string, callback?: ()=>void): void;
}

Example: Graceful Shutdown Pattern
```js
const server = createServer((req,res)=>{/*...*/});
server.listen(8080);

process.on('SIGTERM', ()=>{
  server.close(err=>{
    process.exit(err?1:0);
  });
});
```

Configuration Options Effects:
  maxHeadersCount: limits header parsing to prevent DoS
  headersTimeout: max time to receive headers
  keepAliveTimeout: time to keep idle connection

Best Practices Code:
  - Use HTTPS module for TLS
  - Validate req.url before routing
  - Limit body size via JSON.parse with limit

Troubleshooting:
  - EADDRINUSE: run `lsof -i:PORT` then `kill PID`
  - ECONNRESET: handle in 'error' event
  - Debug with `node --inspect server.js`


## Information Dense Extract
http.createServer: (options?:{IncomingMessageConstructor?:Function,ServerResponseConstructor?:Function,allowHTTP1?:boolean,maxHeadersCount?:number,backlog?:number},requestListener?:(req, res)=>void)=>Server
Server.listen(port?:number|string,hostname?:string,backlog?:number,callback?:()=>void)
IncomingMessage: props method,url,headers,socket; method setTimeout(msecs,cb)
ServerResponse: write(chunk,encoding?),setHeader(name,value),getHeader(name),removeHeader(name),writeHead(statusCode,statusMessage?,headers?),end(data?,encoding?,cb?)
Server events: request,connection,listening,close,error,timeout
Default server.timeout=120000,keepAliveTimeout=5000,headersTimeout=60000,maxHeadersCount=2000
Error codes: EADDRINUSE,ECONNRESET
Example: createServer({maxHeadersCount:1000},(req,res)=>{res.writeHead(200,{'Content-Type':'text/plain'});res.end('Hello');}).listen(3000,'127.0.0.1',()=>console.log)
Graceful shutdown: process.on('SIGTERM',()=>server.close())
Troubleshoot: lsof -i:PORT;kill PID;node --inspect


## Sanitised Extract
Table of Contents:
1. Module Import
2. Server Creation (createServer)
3. Listening Configuration (listen)
4. Request API (IncomingMessage)
5. Response API (ServerResponse)
6. Server Events
7. Error Handling

1. Module Import
import { createServer } from 'node:http';

2. Server Creation
Signature: createServer([options:ServerOptions],[requestListener]) -> Server
ServerOptions interface:
  IncomingMessageConstructor: constructor for req (default http.IncomingMessage)
  ServerResponseConstructor: constructor for res (default http.ServerResponse)
  allowHTTP1: boolean, default true
  maxHeadersCount: integer, default 2000
  backlog: integer forwarded to listen

3. Listening Configuration
server.listen(port?: number|string, hostname?: string, backlog?: number, callback?: ()=>void)
Defaults: port=0, hostname='::', backlog=undefined

4. Request API
IncomingMessage extends Stream.Readable
Properties:
  method: string, req.method
  url: string, req.url
  headers: object, lowercase header names
  socket: net.Socket
Methods:
  setTimeout(msecs: number, callback?: ()=>void)

5. Response API
ServerResponse extends Stream.Writable
Methods:
  write(chunk: string|Buffer, encoding?: string): boolean
  setHeader(name: string, value: string|string[]): void
  getHeader(name: string): string|string[]|undefined
  removeHeader(name: string): void
  writeHead(statusCode: number, statusMessage?: string, headers?: object): void
  end([data][, encoding][, callback]): void

6. Server Events:
  'request': (req,res)
  'connection': (socket)
  'listening': ()
  'close': ()
  'error': (err)
  'timeout': (socket)

7. Error Handling
Listen for 'error' event:
server.on('error', err => {
  if(err.code==='EADDRINUSE') handlePortInUse();
});

## Original Source
Web Platform, Protocol & Date-Time Standards
https://nodejs.org/api/

## Digest of HTTP_SERVER

# HTTP Server

## http.createServer([options][, requestListener])
Signature: `http.createServer([options][, requestListener]) -> http.Server`

Options (http.ServerOptions):
  - IncomingMessageConstructor: Function (default: http.IncomingMessage)
  - ServerResponseConstructor: Function (default: http.ServerResponse)
  - allowHTTP1: boolean (default: true)
  - maxHeadersCount: number (default: 2000)
  - backlog: number (passed to listen())

requestListener: `(req: http.IncomingMessage, res: http.ServerResponse) => void`

## http.Server.listen(port[, hostname][, backlog][, callback])
Signature: `server.listen(port?: number|string, hostname?: string, backlog?: number, callback?: () => void) -> http.Server`

Parameters:
  - port: number|string (default: 0)
  - hostname: string (default: '::')
  - backlog: number (default platform TCP backlog)
  - callback: Function invoked on 'listening'

## http.IncomingMessage
Properties:
  - headers: IncomingHttpHeaders
  - method: string
  - url: string
  - socket: net.Socket
Methods:
  - setTimeout(msecs: number, callback?: () => void): this

## http.ServerResponse
Methods:
  - write(chunk: string|Buffer, encoding?: string): boolean
  - setHeader(name: string, value: string|string[]): void
  - getHeader(name: string): string|string[]|undefined
  - removeHeader(name: string): void
  - writeHead(statusCode: number, statusMessage?: string, headers?: OutgoingHttpHeaders): void
  - end([data][, encoding][, callback]): void

## Server Events
  - request(req, res)
  - connection(socket)
  - close()
  - error(err)
  - listening()
  - timeout(socket)

## Error Codes
  - EADDRINUSE: address in use
  - ECONNRESET: connection reset by peer

## Example Usage
```js
import { createServer } from 'node:http';

const server = createServer({ maxHeadersCount: 1000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server listening on 127.0.0.1:3000');
});
```

## Attribution
- Source: Web Platform, Protocol & Date-Time Standards
- URL: https://nodejs.org/api/
- License: License if known
- Crawl Date: 2025-04-29T16:52:27.298Z
- Data Size: 3484516 bytes
- Links Found: 2328

## Retrieved
2025-04-29
library/SHEXJS.md
# library/SHEXJS.md
# SHEXJS

## Crawl Summary

Installation: npm install --save shex
Testing: npm test, with branch and slow flags
Validation CLI: validate -x <schema> -d <data> -s <shape> -n <node>, outputs JSON
Validation API: shex.Parser.parse, shex.Validator.validate(store,node,shape)
Loader API: ShExLoader.load({shexc:string[]},{turtle:string[]}).then(loaded)
               RdfJsDb(loaded.data), new ShExValidator(schema,db,{results:"api"}).validateShapeMap(shapeMap)
Conversion CLI: bin/shex-to-json, bin/json-to-shex
Conversion API: shex.Loader.load({shexc},null)
Materialize CLI: materialize -t <target> [-j vars.json] [-r <rootIRI>]
Lerna: bootstrap, ci, list, add, remove, hoist

## Normalised Extract
Table of Contents

1 Installation
2 Testing
3 Validation CLI
4 Validation API
5 Loader + Validator
6 Conversion CLI
7 Conversion API
8 Materialize
9 Lerna Monorepo

1 Installation
 npm install --save shex

2 Testing
 npm checkout shex-next
 npm test
 SLOW=<ms> BRANCH=<branch> TEST-cli=true npm test

3 Validation CLI
 Usage: validate -x <schemaIRI> -d <dataIRI> -s <shapeLabel> -n <nodeLabel>
 Options: -x (schema file/URL), -d (data file/URL), -s shape IRI, -n node IRI
 Output: JSON {type,node,shape,solution} or null

4 Validation API
 Function: shex.Parser(<schemaIRI>).parse(schemaText) ⇒ ShExSchema
 Class: new shex.Validator(ShExSchema)
 Method: validate(RdfJs.Store, nodeIRI, shapeLabel) ⇒ ValidationResult

5 Loader + Validator
 Module: @shexjs/loader
 Initialization: require('@shexjs/loader')({ fetch:FetchImpl, rdfjs:RdfJsParser }) ⇒ ShExLoader
 Method: ShExLoader.load({shexc:string[]},{turtle:string[]}) ⇒ Promise<{schema:ShExJ, data:RdfJs.Quads[]}>
 Class: ShExValidator(schema:ShExJ, db:RdfJs.Store, options:{results:"api"})
 Enum: ShExValidator.Start
 Method: validateShapeMap([{node:string,shape:string}]) ⇒ ShapeMapResult[]

6 Conversion CLI
 Command: shex-to-json <schemaIRI>
 Command: json-to-shex <schema.json>

7 Conversion API
 Module: shex.Loader
 Method: shex.Loader.load({shexc:string[]},null) ⇒ Promise<{schema:ShExJ}>

8 Materialize
 Command: materialize -t <targetSchema> [-j <varsFile>] [-r <rootIRI>]
 Defaults: rootIRI tag:eric@w3.org/2016/root
 JSON vars: key:substituted constant mapping

9 Lerna Monorepo
 Packages: contains @shexjs/parser, writer, term, util, visitor, validator, loader, node, cli, webapp, shape-path-query, extensions
 Commands:
  lerna bootstrap  -- hoist:true moves shared devDeps
  npm ci
  lerna list
  lerna add <pkg> --scope=@shexjs/webapp
  npm remove <pkg>


## Supplementary Details

CLI Argument Definitions
validate
 -x, --schema <IRI|file>  required
 -d, --data   <IRI|file>  required
 -s, --shape  <IRI>        required
 -n, --node   <IRI>        required
materialize
 -t <targetSchema>         required
 -j <varsFile.json>        optional
 -r <rootIRI>              default tag:eric@w3.org/2016/root

Loader Options
{ fetch: <function(url):Promise<string>>, rdfjs: <RDFJS Parser Module> }

Validator Options
{ results: "api" | "compact" }

Exit Codes
validate: 0 valid, 1 invalid schema/data parse error, 2 validation errors
materialize: 0 success, 1 transform error


## Reference Details

API Signatures

// Parser
parse: function(schemaIRI:string):ShexSchema

// Validator
class Validator {
  constructor(schema:ShexSchema)
  validate(
    data: RDFJS.Store,
    node: string,
    shape: string
  ): ValidationResult
}

// Loader
type LoaderOpts = {
  fetch: (url:string)=>Promise<string>,
  rdfjs: {
    Parser: new(opts:{baseIRI:string, format?:string})=>{ parse(string, callback:(err, triple, prefixes)=>void):void },
    Store: new()=>{ addQuad(triple:any):void }
  }
}
interface Loaded {
  schema: ShexJ[],
  data: RDFJS.Quad[]
}
function createLoader(opts: LoaderOpts): {
  load(
    sources:{shexc:string[]},
    dataFiles:{turtle?:string[]}
  ): Promise<Loaded>
}

// Validator from loader
class ShExValidator {
  static Start: string
  constructor(
    schemas: ShexJ[],
    db: RDFJS.Store,
    options: { results: "api" }
  )
  validateShapeMap(
    shapeMap: Array<{ node:string, shape:string }>
  ): Array<ShapeMapResult>
}

// Conversion Loader
var shex = require("shex");
method: shex.Loader.load({shexc:string[]}, null): Promise<{schema:ShexJ[]}>

CLI Examples

// Validate
./node_modules/shex/bin/validate \
  -x http://shex.io/examples/Issue.shex \
  -d http://shex.io/examples/Issue1.ttl \
  -s IssueShape -n Issue1

// Convert
./node_modules/shex/bin/shex-to-json \
  http://shex.io/examples/Issue.shex > Issue.json

// Materialize pipeline
validate -x source.shex -l data.jsonld -s ProblemShape | \
  materialize -t target.shex -j vars.json -r http://hl7.org/fhir/root

Best Practices

- Use ShExLoader for production loads to avoid callback hell
- Use relative IRIs for compact CLI commands
- Hoist devDependencies in monorepo to root via lerna.hoist:true

Troubleshooting

Parsing Errors:
  Error: error parsing <file>: <error> → ensure format and baseIRI match
Slow Tests:
  Set SLOW env var larger than 5000ms for HTTP tests
Branch/Test Alignment:
  shex.js branch and shexTest branch must match, enforce via post-commit hook


## Information Dense Extract
SHEXJS: install npm install --save shex; validate CLI: validate -x schema -d data -s shape -n node → JSON result or null; Validation API: shex.Parser(url).parse→ShexSchema, new shex.Validator(schema).validate(store,node,shape)→ValidationResult; Loader: const ShExLoader=require('@shexjs/loader')({fetch, rdfjs}); ShExLoader.load({shexc:[urls]},{turtle:[urls]})→Promise<{schema,data}>; db=RdfJsDb(data); validator=new ShExValidator(schema,db,{results:"api"}); result=validator.validateShapeMap([{node,shape}]); Conversion CLI: shex-to-json schema→JSON, json-to-shex JSON→ShexC; Conversion API: shex.Loader.load({shexc},null); Materialize: materialize -t target [-j vars.json] [-r rootIRI default tag:eric@w3.org/2016/root]; Lerna: bootstrap, ci, list, add, remove, hoist devDeps

## Sanitised Extract
Table of Contents

1 Installation
2 Testing
3 Validation CLI
4 Validation API
5 Loader + Validator
6 Conversion CLI
7 Conversion API
8 Materialize
9 Lerna Monorepo

1 Installation
 npm install --save shex

2 Testing
 npm checkout shex-next
 npm test
 SLOW=<ms> BRANCH=<branch> TEST-cli=true npm test

3 Validation CLI
 Usage: validate -x <schemaIRI> -d <dataIRI> -s <shapeLabel> -n <nodeLabel>
 Options: -x (schema file/URL), -d (data file/URL), -s shape IRI, -n node IRI
 Output: JSON {type,node,shape,solution} or null

4 Validation API
 Function: shex.Parser(<schemaIRI>).parse(schemaText)  ShExSchema
 Class: new shex.Validator(ShExSchema)
 Method: validate(RdfJs.Store, nodeIRI, shapeLabel)  ValidationResult

5 Loader + Validator
 Module: @shexjs/loader
 Initialization: require('@shexjs/loader')({ fetch:FetchImpl, rdfjs:RdfJsParser })  ShExLoader
 Method: ShExLoader.load({shexc:string[]},{turtle:string[]})  Promise<{schema:ShExJ, data:RdfJs.Quads[]}>
 Class: ShExValidator(schema:ShExJ, db:RdfJs.Store, options:{results:'api'})
 Enum: ShExValidator.Start
 Method: validateShapeMap([{node:string,shape:string}])  ShapeMapResult[]

6 Conversion CLI
 Command: shex-to-json <schemaIRI>
 Command: json-to-shex <schema.json>

7 Conversion API
 Module: shex.Loader
 Method: shex.Loader.load({shexc:string[]},null)  Promise<{schema:ShExJ}>

8 Materialize
 Command: materialize -t <targetSchema> [-j <varsFile>] [-r <rootIRI>]
 Defaults: rootIRI tag:eric@w3.org/2016/root
 JSON vars: key:substituted constant mapping

9 Lerna Monorepo
 Packages: contains @shexjs/parser, writer, term, util, visitor, validator, loader, node, cli, webapp, shape-path-query, extensions
 Commands:
  lerna bootstrap  -- hoist:true moves shared devDeps
  npm ci
  lerna list
  lerna add <pkg> --scope=@shexjs/webapp
  npm remove <pkg>

## Original Source
ShEx 2.0 Shapes Expression Language & shex.js Implementation
https://github.com/shexSpec/shex.js#readme

## Digest of SHEXJS

# SHEX.JS Technical Overview  (Retrieved: 2024-06-06)

## Installation

**Command:**  npm install --save shex

## Testing

- Default branch tests:  npm checkout shex-next  &&  npm test
- External test suite:  git clone https://github.com/shexSpec/shexTest --branch extends  &&  npm test
- Slow tests (CLI, HTTP):  SLOW=<ms> BRANCH=<branch> TEST-cli=true npm test

## Validation Executable (bin/validate)

Usage:

    validate -x <schemaIRI> -d <dataIRI> -s <shapeLabel> -n <nodeLabel>

Options:
  -x, --schema (IRI|file)   ShExC schema source
  -d, --data   (IRI|file)   RDF data source (Turtle, JSON-LD, etc)
  -s, --shape  IRI           Starting shape IRI or relative label
  -n, --node   IRI           Starting node IRI or relative label

Output:  JSON object with fields type,test,node,shape,solution or null for invalid

## Validation Library API

// old callback pattern

function GET(url, callback) { ... }
var Schema, Triples;
GET(shexcIRI, body=>{ Schema = shex.Parser(shexcIRI).parse(body); tryValidate(); });
GET(dataIRI, body=>{ var store = n3.Store(); n3.Parser({baseIRI:dataIRI}).parse(body,(e,t)=>{ if(t) store.addQuad(t); else{ Triples=store; tryValidate(); }}); });
function tryValidate(){ if(Schema && Triples) console.log(new shex.Validator(Schema).validate(Triples,node,shape)); }

## ShExLoader + Validator Pattern

const N3 = require("n3");
const ShExLoader = require("@shexjs/loader")({ fetch: require('node-fetch'), rdfjs: N3 });
const { ctor: RdfJsDb } = require('@shexjs/neighborhood-rdfjs');
const { ShExValidator } = require('@shexjs/validator');

ShExLoader.load({shexc:[shexcIRI]}, {turtle:[dataIRI]})
  .then(loaded=>{
    const db = RdfJsDb(loaded.data);
    const validator = new ShExValidator(loaded.schema, db, { results: "api" });
    const shapeMap = [{ node: nodeIRI, shape: ShExValidator.Start }];
    const result = validator.validateShapeMap(shapeMap);
    console.log(JSON.stringify(result, null, 2));
  });

## Conversion CLI

### shex-to-json

Command:  bin/shex-to-json <schemaIRI> > schema.json

### json-to-shex

Command:  bin/json-to-shex schema.json > schema.shex

## Conversion Library

var shex = require("shex");
shex.Loader.load({shexc:[shexcIRI]}, null)
  .then(loaded=> console.log(JSON.stringify(loaded.schema))); 

## Local Files & Relative IRIs

- Non-HTTP args treated as file paths
- Example: validate -j Issue.json -d Issue1.ttl -s IssueShape -n Issue1

## Materialize CLI

Syntax: materialize -t <targetSchema> [-j <varsFile>] [-r <rootIRI>]
Options:
  -t  target schema (IRI|file)
  -j  JSON vars file (key:value substitutions)
  -r  RDF root IRI (default tag:eric@w3.org/2016/root)

Example pipeline:
  validate -x source.shex -l data.jsonld -s Shape | materialize -t target.shex -j vars.json -r http://example/root

## Lerna Monorepo Commands

Packages in packages/*

Build/Test:
  lerna bootstrap
  npm ci
  lerna list

Add dependency:
  lerna add <pkg> --scope=@shexjs/webapp

Remove dependency:
  edit package.json && lerna bootstrap --scope=@shexjs/webapp --no-ci --force-local && npm remove <pkg>

Hoist devDependencies:
  lerna add --dev <pkg> --scope=@shexjs/webapp


## Attribution
- Source: ShEx 2.0 Shapes Expression Language & shex.js Implementation
- URL: https://github.com/shexSpec/shex.js#readme
- License: License
- Crawl Date: 2025-04-28T01:09:38.362Z
- Data Size: 698130 bytes
- Links Found: 5185

## Retrieved
2025-04-28
library/ZOD_SCHEMA.md
# library/ZOD_SCHEMA.md
# ZOD_SCHEMA

## Crawl Summary
TypeScript-first schema validation. Requires TS 4.5+, strict mode. Install via npm/yarn/deno/bun/pnpm. Primitives: z.string(), z.number(), z.boolean(), z.bigint(), z.date(), z.symbol(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never(). Coercion: z.coerce.string(), number(), boolean(), bigint(), date(). Literal schemas via z.literal(value). String validations: max, min, length, email, url, regex, datetime({offset,local,precision}), date(), time({precision}), ip({version}), cidr({version}). Number & bigint validations: gt, gte, lt, lte, int, positive, nonnegative, negative, nonpositive, multipleOf, finite, safe. Objects: object(), .shape, .keyof, extend, merge, pick, omit, partial, deepPartial, required, passthrough, strict, strip, catchall. Arrays: array(), .element, nonempty, min, max, length. Tuples, sets, maps, records. Unions (.or, .union), discriminatedUnion(key, schemas), intersections (.and). Recursive with z.lazy. Effects: refine, superRefine, transform, default, catch, optional, nullable, nullish, array, promise, or, and, brand, readonly, pipe, describe. Parsing: parse, parseAsync, safeParse, safeParseAsync, spa alias. Functions: function().args(...).returns().implement(), parameters(), returnType(). Preprocess: z.preprocess(fn, schema). Custom: z.custom<T>(...).

## Normalised Extract
Table of Contents
1 Installation  2 Primitives & Coercion  3 String Schema Methods  4 Number & BigInt Schema Methods  5 Object Schema Methods  6 Collections: Arrays, Tuples, Sets, Maps, Records  7 Union, Discriminated Union, Intersection  8 Recursive Types & Lazy  9 Effects: refine, superRefine, transform  10 Parsers: parse, safeParse, parseAsync  11 Function Schemas  12 Preprocess & Custom

1 Installation
Requirements  TypeScript>=4.5; tsconfig.json { compilerOptions:{ strict:true } }
Commands  npm install zod; yarn add zod; bun add zod; deno add npm:zod; pnpm add zod; use @canary tag for canary builds

2 Primitives & Coercion
z.string() z.number() z.bigint() z.boolean() z.date() z.symbol() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
z.coerce.string()  applies String(input)
z.coerce.number()  applies Number(input)
z.coerce.boolean() applies Boolean(input)
z.coerce.bigint()  applies BigInt(input)
z.coerce.date()    applies new Date(input)
z.literal(value)

3 String Schema Methods
.string().max(max:number, opts?) .min(min:number, opts?) .length(len:number, opts?) .email(opts?) .url(opts?) .regex(reg:RegExp, opts?) .datetime({ offset?:boolean, local?:boolean, precision?:number }, opts?) .date(opts?) .time({ precision?:number }, opts?) .ip({ version?:"v4"|"v6" }, opts?) .cidr({ version?:"v4"|"v6" }, opts?)
t.c. .trim() .toLowerCase() .toUpperCase()

4 Number & BigInt Schema Methods
.number().gt(num:number, opts?) .gte(num:number, opts?) .lt(num:number, opts?) .lte(num:number, opts?) .int(opts?) .positive(opts?) .nonnegative(opts?) .negative(opts?) .nonpositive(opts?) .multipleOf(step:number, opts?) .finite(opts?) .safe(opts?)
.bigint() counterpart methods with bigint

5 Object Schema Methods
.object({key:schema,...})
.shape  .keyof() .extend({key:schema}) .merge(otherObj) .pick({key:true}) .omit({key:true}) .partial(keys?) .deepPartial() .required(keys?) .passthrough() .strict() .strip() .catchall(schema)

6 Collections: Arrays, Tuples, Sets, Maps, Records
.array(itemSchema)
.element  .nonempty(opts?) .min(n,opts?) .max(n,opts?) .length(n,opts?)
.tuple([schemas...]).rest(restSchema?)
.set(itemSchema).nonempty().min(n).max(n).size(n)
.map(keySchema,valueSchema)
.record(keySchema,valueSchema)

7 Union, Discriminated Union, Intersection
.union([schemas...])  .or(otherSchema)
.discriminatedUnion("key", [objSchemas...]).options
.intersection(schemaA,schemaB)

8 Recursive Types & Lazy
.z.lazy(() => schemaRef)

9 Effects: refine, superRefine, transform
.refine(fn:(val)=>boolean, {message, path, params}) .superRefine((val,ctx)=>{})
.transform(fn:(val)=>newVal) .default(val) .catch(valOrFn) .optional() .nullable() .nullish() .array() .promise() .or() .and() .brand() .readonly() .pipe() .describe(text)

10 Parsers: parse, safeParse, parseAsync
.parse(input):T or throws ZodError
.parseAsync(input):Promise<T> or throws ZodError
.safeParse(input):{success, data?, error?}
.safeParseAsync(input):Promise<safeParseResult> alias .spa

11 Function Schemas
.function().args(...schemas).returns(schema).implement(fn) => validated function
.parameters():ZodTuple ; .returnType():ZodSchema

12 Preprocess & Custom
.preprocess(fn, targetSchema) // applies fn before validation
.custom<T>(validatorFn?, opts?) // no built-in validations

## Supplementary Details
Installation Steps:
1. Verify TypeScript>=4.5 and strict mode in tsconfig.json
2. Choose package manager
3. Run install command
4. For canary builds: install with @canary tag

Configuration Options:
- datetime: offset(boolean)=false, local=false, precision(number)=unbounded
- time: precision(number)=unbounded
- ip/cidr: version="v4"|"v6" or both
- object unknownKeys policy: default strip; passthrough; strict; catchall(schema)

Implementation Steps:
- Import z: `import { z } from "zod"`
- Create schema: call z.<type>()
- Chain validations or coercions
- For arrays: ensure method order: `.string().array().optional()` vs `.string().optional().array()`
- Use parse/parseAsync to validate or safeParse for error objects

Best Practices:
- Use discriminated unions for performance and specific error path
- Prefer .merge over intersection for objects
- Use z.coerce.* for primitive coercion
- Use .transform after parse for mapping values
- Use .superRefine for validation requiring multiple issues
- Use .spa for asynchronous safe parses

Troubleshooting:
- If .parseAsync on non-Promise: error Non-Promise type
- If coercion yields unexpected boolean results, use z.preprocess
- For recursive schemas: supply explicit type with z.ZodType<Output,Def,Input>
- For date coercion in older versions, use z.preprocess
Commands:
`ts-node script.ts` shows typed errors
`z.parseAsync(Promise.resolve(3))` returns Promise<number>


## Reference Details
// Exact Method Signatures and Return Types
interface ZodString extends ZodType<string,ZodStringDef,string> {
  min(min:length, opts?:{message:string}):ZodString;
  max(max:length, opts?:{message:string}):ZodString;
  length(len:length, opts?:{message:string}):ZodString;
  email(opts?:{message:string}):ZodString;
  url(opts?:{message:string}):ZodString;
  regex(pattern:RegExp, opts?:{message:string}):ZodString;
  datetime(opts?:{offset?:boolean,local?:boolean,precision?:number,message?:string}):ZodString;
  date(opts?:{message?:string}):ZodString;
  time(opts?:{precision?:number,message?:string}):ZodString;
  ip(opts?:{version?:"v4"|"v6",message?:string}):ZodString;
  cidr(opts?:{version?:"v4"|"v6",message?:string}):ZodString;
  trim():ZodString;
  toLowerCase():ZodString;
  toUpperCase():ZodString;
}

interface ZodNumber extends ZodType<number,ZodNumberDef,number> {
  gt(value:number, opts?:{message:string}):ZodNumber;
  gte(value:number, opts?:{message:string}):ZodNumber;
  lt(value:number, opts?:{message:string}):ZodNumber;
  lte(value:number, opts?:{message:string}):ZodNumber;
  int(opts?:{message:string}):ZodNumber;
  positive(opts?:{message:string}):ZodNumber;
  nonnegative(opts?:{message:string}):ZodNumber;
  negative(opts?:{message:string}):ZodNumber;
  nonpositive(opts?:{message:string}):ZodNumber;
  multipleOf(step:number, opts?:{message:string}):ZodNumber;
  finite(opts?:{message:string}):ZodNumber;
  safe(opts?:{message:string}):ZodNumber;
}

function z(): void;
function z.string(): ZodString;
function z.number(): ZodNumber;
function z.bigint(): ZodBigInt;
function z.boolean(): ZodBoolean;
function z.date(): ZodDate;
function z.symbol(): ZodSymbol;
function z.undefined(): ZodUndefined;
function z.null(): ZodNull;
function z.void(): ZodVoid;
function z.any(): ZodAny;
function z.unknown(): ZodUnknown;
function z.never(): ZodNever;
function z.literal<T extends string|number|boolean|bigint|symbol>(value:T):ZodLiteral<T>;
function z.coerce:{ string():ZodString; number():ZodNumber; boolean():ZodBoolean; bigint():ZodBigInt; date():ZodDate; }
function z.object<Shape extends ZodRawShape>(shape:Shape):ZodObject<Shape>;
function z.array<T extends ZodTypeAny>(schema:T):ZodArray<T>;
function z.tuple<T extends [ZodTypeAny, ...ZodTypeAny[]]>(schemas:T):ZodTuple<T>;
function z.set<T extends ZodTypeAny>(schema:T):ZodSet<T>;
function z.map<K extends ZodTypeAny, V extends ZodTypeAny>(keySchema:K, valueSchema:V):ZodMap<K,V>;
function z.record<K extends ZodTypeAny, V extends ZodTypeAny>(keySchema:K, valueSchema:V):ZodRecord<K,V>;
function z.union<T extends ZodTypeAny[]>(schemas:T):ZodUnion<T>;
function z.discriminatedUnion<K extends string, T extends ZodObject<any>[]>(key:K, options:T):ZodDiscriminatedUnion<K,T>;
function z.intersection<A extends ZodTypeAny, B extends ZodTypeAny>(a:A,b:B):ZodIntersection<A,B>;
function z.lazy<T extends ZodTypeAny>(getter: ()=>T):T;
function z.function():ZodFunction<ZodTuple<ZodTypeAny[]>,ZodTypeAny>;
function z.preprocess(transform: (val: unknown) => unknown, schema: ZodTypeAny): ZodEffects<any>;
function z.custom<T>(check?: (val:unknown)=>boolean, message?:string): ZodCustom<T>;

// Parsing
parse(input:unknown):Type or throws ZodError;
parseAsync(input:unknown):Promise<Type>;
safeParse(input:unknown):{ success:true; data:Type } | { success:false; error:ZodError };
safeParseAsync(input:unknown):Promise< ... >;

// Function schema
interface ZodFunction<ArgsType extends ZodTuple<any>, ReturnType extends ZodTypeAny> extends ZodType<(...args: z.infer<ArgsType>) => z.infer<ReturnType>> {
  args(...schemas:ArgsType['_def']['items']): ZodFunction<ArgsType,ReturnType>;
  returns(schema:ReturnType): ZodFunction<ArgsType,ReturnType>;
  implement<Fun extends (...args:any[])=>any>(fn:Fun):Fun;
  parameters():ArgsType;
  returnType():ReturnType;
}

// Examples
const UserSchema = z.object({ id:z.string(), age:z.number().gte(0) }).strict();
type User = z.infer<typeof UserSchema>;

const parseUser = UserSchema.parse; // (input:unknown)=>User

const CoercedDate = z.coerce.date(); // ZodDate from Date|string

// Troubleshooting Commands
// parseAsync with non-promise
try {
  z.promise(z.number()).parseAsync(123);
} catch(e) {
  console.error(e.message); // Non-Promise type: number
}


## Information Dense Extract
TS>=4.5 strict. Install via npm/yarn/deno/bun/pnpm. z.string(),number(),bigint(),boolean(),date(),symbol(),undefined(),null(),void(),any(),unknown(),never(). z.literal(value). z.coerce.string(),number(),boolean(),bigint(),date(). String methods: .min(n),.max(n),.length(n),.email(),.url(),.regex(),.datetime({offset,local,precision}),.date(),.time({precision}),.ip({version}),.cidr({version}),.trim(),.toLowerCase(),.toUpperCase(). Number methods: .gt(n),.gte(n),.lt(n),.lte(n),.int(),.positive(),.nonnegative(),.negative(),.nonpositive(),.multipleOf(n),.finite(),.safe(). Bigint analogous. Object: z.object(shape).shape,.keyof(),.extend(),.merge(),.pick(),.omit(),.partial(),.deepPartial(),.required(),.passthrough(),.strict(),.strip(),.catchall(). Collections: .array(),.nonempty(),.min(),.max(),.length(); .tuple([...]).rest(); .set().nonempty().min().max().size(); .map(key,value); .record(key,value). Unions: z.union(),.or(); z.discriminatedUnion(key,opts); .options; .intersection(). Recommended .merge. Recursive: z.lazy(()=>schema). Effects: .refine(fn,opts),.superRefine((val,ctx)),.transform(fn),.default(val),.catch(val|fn),.optional(),.nullable(),.nullish(),.array(),.promise(),.or(),.and(),.brand(),.readonly(),.pipe(),.describe(). Parsing: .parse(),.parseAsync(),.safeParse(),.safeParseAsync(.spa). Functions: z.function().args(...).returns().implement(),.parameters(),.returnType(). Preprocess: z.preprocess(fn,schema). Custom: z.custom<T>(fn,opts).

## Sanitised Extract
Table of Contents
1 Installation  2 Primitives & Coercion  3 String Schema Methods  4 Number & BigInt Schema Methods  5 Object Schema Methods  6 Collections: Arrays, Tuples, Sets, Maps, Records  7 Union, Discriminated Union, Intersection  8 Recursive Types & Lazy  9 Effects: refine, superRefine, transform  10 Parsers: parse, safeParse, parseAsync  11 Function Schemas  12 Preprocess & Custom

1 Installation
Requirements  TypeScript>=4.5; tsconfig.json { compilerOptions:{ strict:true } }
Commands  npm install zod; yarn add zod; bun add zod; deno add npm:zod; pnpm add zod; use @canary tag for canary builds

2 Primitives & Coercion
z.string() z.number() z.bigint() z.boolean() z.date() z.symbol() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
z.coerce.string()  applies String(input)
z.coerce.number()  applies Number(input)
z.coerce.boolean() applies Boolean(input)
z.coerce.bigint()  applies BigInt(input)
z.coerce.date()    applies new Date(input)
z.literal(value)

3 String Schema Methods
.string().max(max:number, opts?) .min(min:number, opts?) .length(len:number, opts?) .email(opts?) .url(opts?) .regex(reg:RegExp, opts?) .datetime({ offset?:boolean, local?:boolean, precision?:number }, opts?) .date(opts?) .time({ precision?:number }, opts?) .ip({ version?:'v4'|'v6' }, opts?) .cidr({ version?:'v4'|'v6' }, opts?)
t.c. .trim() .toLowerCase() .toUpperCase()

4 Number & BigInt Schema Methods
.number().gt(num:number, opts?) .gte(num:number, opts?) .lt(num:number, opts?) .lte(num:number, opts?) .int(opts?) .positive(opts?) .nonnegative(opts?) .negative(opts?) .nonpositive(opts?) .multipleOf(step:number, opts?) .finite(opts?) .safe(opts?)
.bigint() counterpart methods with bigint

5 Object Schema Methods
.object({key:schema,...})
.shape  .keyof() .extend({key:schema}) .merge(otherObj) .pick({key:true}) .omit({key:true}) .partial(keys?) .deepPartial() .required(keys?) .passthrough() .strict() .strip() .catchall(schema)

6 Collections: Arrays, Tuples, Sets, Maps, Records
.array(itemSchema)
.element  .nonempty(opts?) .min(n,opts?) .max(n,opts?) .length(n,opts?)
.tuple([schemas...]).rest(restSchema?)
.set(itemSchema).nonempty().min(n).max(n).size(n)
.map(keySchema,valueSchema)
.record(keySchema,valueSchema)

7 Union, Discriminated Union, Intersection
.union([schemas...])  .or(otherSchema)
.discriminatedUnion('key', [objSchemas...]).options
.intersection(schemaA,schemaB)

8 Recursive Types & Lazy
.z.lazy(() => schemaRef)

9 Effects: refine, superRefine, transform
.refine(fn:(val)=>boolean, {message, path, params}) .superRefine((val,ctx)=>{})
.transform(fn:(val)=>newVal) .default(val) .catch(valOrFn) .optional() .nullable() .nullish() .array() .promise() .or() .and() .brand() .readonly() .pipe() .describe(text)

10 Parsers: parse, safeParse, parseAsync
.parse(input):T or throws ZodError
.parseAsync(input):Promise<T> or throws ZodError
.safeParse(input):{success, data?, error?}
.safeParseAsync(input):Promise<safeParseResult> alias .spa

11 Function Schemas
.function().args(...schemas).returns(schema).implement(fn) => validated function
.parameters():ZodTuple ; .returnType():ZodSchema

12 Preprocess & Custom
.preprocess(fn, targetSchema) // applies fn before validation
.custom<T>(validatorFn?, opts?) // no built-in validations

## Original Source
Zod Schema Validation Library
https://github.com/colinhacks/zod#readme

## Digest of ZOD_SCHEMA

# Zod Schema Validation Library Detailed Digest

Date Retrieved: 2024-06-18
Source: https://github.com/colinhacks/zod#readme

## 1. Installation Requirements and Commands
- TypeScript 4.5+; tsconfig.json must enable "strict": true

npm install zod       # npm
deno add npm:zod      # deno
yarn add zod          # yarn
bun add zod           # bun
pnpm add zod          # pnpm

Canary versions:

npm install zod@canary


## 2. Core Usage and Schema Creation

### Primitives
- z.string()  returns ZodString
- z.number()  returns ZodNumber
- z.bigint()  returns ZodBigInt
- z.boolean() returns ZodBoolean
- z.date()    returns ZodDate
- z.symbol()  returns ZodSymbol
- z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

### Coercion
z.coerce.string()   => applies String(input)
z.coerce.number()   => applies Number(input)
z.coerce.boolean()  => Boolean(input)
z.coerce.bigint()   => BigInt(input)
z.coerce.date()     => new Date(input)

### Literals
- z.literal(value: string|number|boolean|bigint|symbol)

## 3. String Schema Methods
| Method             | Parameters                                    | Return Type | Default Behavior                          |
|--------------------|-----------------------------------------------|-------------|-------------------------------------------|
| max                | max: number, opts?: { message: string }       | ZodString   | string length <= max                      |
| min                | min: number, opts?: { message: string }       | ZodString   | string length >= min                      |
| length             | length: number, opts?: { message: string }    | ZodString   | string length === length                  |
| email              | opts?: { message: string }                   | ZodString   | valid email                               |
| url                | opts?: { message: string }                   | ZodString   | valid URL                                 |
| regex              | regex: RegExp, opts?: { message: string }     | ZodString   | regex.test(value)                         |
| datetime           | opts?: { offset?: boolean; local?: boolean; precision?: number; message?: string } | ZodString | ISO8601 date-time                         |
| date               | opts?: { message?: string }                   | ZodString   | YYYY-MM-DD                                |
| time               | opts?: { precision?: number; message?:string}| ZodString   | HH:MM:SS[.SS...]                          |
| ip                 | opts?: { version?: "v4"|"v6"; message?:string } | ZodString | IPv4/IPv6                                |
| cidr               | opts?: { version?: "v4"|"v6"; message?:string } | ZodString | IP range CIDR                            |

## 4. Number/BigInt Schema Methods
### Numbers
z.number().gt(value:number, opts?);    // > value
z.number().gte(value:number, opts?);   // >= value
z.number().lt(value:number, opts?);    // < value
z.number().lte(value:number, opts?);   // <= value
z.number().int(opts?);                 // is integer
z.number().positive(opts?);            // > 0
z.number().nonnegative(opts?);         // >= 0
z.number().negative(opts?);            // < 0
z.number().nonpositive(opts?);         // <= 0
z.number().multipleOf(value:number, opts?); // divisible by value
z.number().finite(opts?);              // not Infinity/-Infinity
z.number().safe(opts?);                // between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER

### BigInts
z.bigint().gt(value: bigint, opts?);
... analogous to numbers

## 5. Object Schema Methods
const Obj = z.object({ key: z.string(), age: z.number() });
- .shape
- .keyof()
- .extend(schemaMap)
- .merge(otherObject)
- .pick({fields})
- .omit({fields})
- .partial(fields?)
- .deepPartial()
- .required(fields?)
- .passthrough()
- .strict()
- .strip()
- .catchall(schema)

## 6. Collection Types
### Arrays
z.array(elementSchema)
.element
.nonempty(opts?) => [T,...T[]]
.min(len, opts?)
.max(len, opts?)
.length(len, opts?)

### Tuples
z.tuple([schemas...]).rest(restSchema?)

### Sets
z.set(elementSchema)
.nonempty(opts?)
.min(len, opts?)
.max(len, opts?)
.size(len, opts?)

### Maps
z.map(keySchema, valueSchema)

### Records
z.record(keySchema, valueSchema)

## 7. Union/Intersection
z.union([schemas...])
or-method chaining
z.discriminatedUnion(discriminator:string, options:objectSchemas[])
.options
z.intersection(schemaA, schemaB)
.merge for objects recommended

## 8. Recursive and Lazy
z.lazy(() => schema)
Define type hints manually for recursive

## 9. Effects, Transforms, Refinements
- .refine(validatorFn, opts)
- .superRefine((data, ctx)=>{})
- .transform(transformFn)
- .default(value)
- .catch(fnOrValue)
- .optional()
- .nullable()
- .nullish()
- .array()
- .promise()
- .or()
- .and()
- .brand() // tag type
- .readonly()
- .pipe()
- .describe(text)

## 10. Parsing Methods
.parse(input): T or throws ZodError
.parseAsync(input): Promise<T> or throws ZodError
.safeParse(input): { success:boolean; data?|error? }
.safeParseAsync(input): Promise<safeParseResult>
.spa alias for safeParseAsync

## 11. Function Schemas
z.function().args(...schemas).returns(schema).implement(fn)
.parameters()
.returnType()

## 12. Preprocess and Custom
z.preprocess(fn, schema)
z.custom<T>(validationFn?, opts?)

## 13. Troubleshooting Tips
- For promise schemas use .parseAsync
- For coercion use z.coerce.* or z.preprocess
- Use discriminatedUnion for faster performance
- Avoid array().optional() vs optional().array() pitfalls

### Data Size: 1045184 bytes
### Links Found: 6725

## Attribution
- Source: Zod Schema Validation Library
- URL: https://github.com/colinhacks/zod#readme
- License: License if known
- Crawl Date: 2025-04-29T04:50:58.323Z
- Data Size: 1045184 bytes
- Links Found: 6725

## Retrieved
2025-04-29
library/SHACL_CORE.md
# library/SHACL_CORE.md
# SHACL_CORE

## Crawl Summary
4.1: sh:class requires class IRI; sh:datatype expects xsd datatype; sh:nodeKind limits node type. 4.2: sh:minCount and sh:maxCount enforce occurrence counts. 4.3: sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive define literal-based range checks. 4.4: sh:minLength, sh:maxLength control string lengths; sh:pattern enforces regex; sh:languageIn and sh:uniqueLang restrict language tags. 4.5: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals express cross-property comparisons. 4.6: sh:not, sh:and, sh:or, sh:xone enable boolean combination of shapes. 4.7: sh:node, sh:property apply nested shapes; qualifiedValueShape with qualifiedMinCount and qualifiedMaxCount enforce counted shapes. 4.8: sh:closed locks additional properties; sh:ignoredProperties exempts properties; sh:hasValue and sh:in restrict allowed values.

## Normalised Extract
Table of Contents
1 Value Type Constraint Components
2 Cardinality Constraint Components
3 Value Range Constraint Components
4 String-based Constraint Components
5 Property Pair Constraint Components
6 Logical Constraint Components
7 Shape-based Constraint Components
8 Other Constraint Components

1 Value Type Constraint Components
sh:class: IRI of class; single or multiple; enforces RDF type membership.
sh:datatype: IRI of xsd datatype; single; enforces literal datatype.
sh:nodeKind: IRI from {sh:BlankNode, sh:IRI, sh:Literal, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral}; single.

2 Cardinality Constraint Components
sh:minCount: integer ≥ 0; default 0; enforces at least n occurrences.
sh:maxCount: integer ≥ 0; no default; enforces at most n occurrences.

3 Value Range Constraint Components
sh:minExclusive: literal; focus values > literal.
sh:minInclusive: literal; focus values ≥ literal.
sh:maxExclusive: literal; focus values < literal.
sh:maxInclusive: literal; focus values ≤ literal.

4 String-based Constraint Components
sh:minLength: integer ≥ 0; enforces minimum string length.
sh:maxLength: integer ≥ 0; enforces maximum string length.
sh:pattern: regex string; SPARQL regex syntax; must match at least one substring.
sh:languageIn: List of xsd:languageTag strings; literal language tag must be in list.
sh:uniqueLang: boolean; if true, each language tag appears at most once.

5 Property Pair Constraint Components
sh:equals: property IRI; values equal to values of this property on same focus node.
sh:disjoint: property IRI; values disjoint from values of this property.
sh:lessThan: property IRI; value < values of this property.
sh:lessThanOrEquals: property IRI; value ≤ values.

6 Logical Constraint Components
sh:not: shape IRI; focus nodes must not conform.
sh:and: List of shape IRIs; must conform to all.
sh:or: List of shape IRIs; must conform to at least one.
sh:xone: List of shape IRIs; must conform to exactly one.

7 Shape-based Constraint Components
sh:node: NodeShape IRI; nested node shape.
sh:property: PropertyShape IRI; nested property shape.
sh:qualifiedValueShape: Shape IRI; shape for counted values.
sh:qualifiedMinCount: integer ≥ 0; min count.
sh:qualifiedMaxCount: integer ≥ 0; max count.

8 Other Constraint Components
sh:closed: boolean; default false; if true, no extra properties allowed.
sh:ignoredProperties: List of property IRIs; exempt from closed.
sh:hasValue: RDF term; value must equal this.
sh:in: List of RDF terms; value must be one of these.

## Supplementary Details
Prerequisites
Define prefix bindings:
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX ex: <http://example.com/ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

Implementation Steps
1 Create a Shapes Graph in Turtle
   - Use sh:NodeShape and sh:PropertyShape classes
   - Declare sh:targetClass or sh:targetNode on node shapes
   - Inside node shape, add sh:property statements linking to blank-node property shapes
2 Define Property Shapes
   - Use sh:path to identify property IRI
   - Apply constraint parameters (sh:datatype, sh:maxCount, sh:pattern, etc.)
3 Validate Data Graph
   - Load data graph and shapes graph into SHACL engine
   - Call validation API: validate(dataGraph, shapesGraph, options)
4 Handle Validation Report
   - Check sh:conforms boolean
   - Inspect sh:ValidationResult entries for sh:focusNode, sh:resultPath, sh:resultMessage

Configuration Options
--infer  : boolean default false : apply RDFS entailment
--debug  : boolean default false : log SPARQL queries
--results-format : text|ttl|json default text


## Reference Details
Example Shapes Graph in Turtle

ex:PersonShape a sh:NodeShape ;
  sh:targetClass ex:Person ;
  sh:closed true ;
  sh:ignoredProperties ( rdf:type ) ;
  sh:property [
    a sh:PropertyShape ;
    sh:path ex:ssn ;
    sh:datatype xsd:string ;
    sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$" ;
    sh:maxCount 1 ;
  ] ;
  sh:property [
    a sh:PropertyShape ;
    sh:path ex:worksFor ;
    sh:nodeKind sh:IRI ;
    sh:class ex:Company ;
  ] .

Python pySHACL Validation Example

from pyshacl import validate
import rdflib

graph = rdflib.Graph()
graph.parse('data.ttl', format='turtle')
shapes = rdflib.Graph()
shapes.parse('shapes.ttl', format='turtle')

conforms, report_graph, report_text = validate(
    data_graph=graph,
    shacl_graph=shapes,
    inference='rdfs',
    debug=False,
    serialize_report_graph='json'
)

print('Conforms:', conforms)
print(report_text)

Troubleshooting

Command: pyshacl --data data.ttl --shapes shapes.ttl --prefix sh: http://www.w3.org/ns/shacl#
Expected Output: Validation report with conforms=true or JSON with results array

Ill-formed Shapes
- Missing sh:path in PropertyShape triggers error: "PropertyShape must have sh:path"
- Invalid datatype IRI triggers SPARQL error: "Unknown datatype"


## Information Dense Extract
sh:class  requires rdfs:Class IRI
sh:datatype requires xsd:Datatype IRI
sh:nodeKind requires one of six sh: nodeKind IRIs
sh:minCount/minCount enforce integer bounds per focus node
sh:maxCount enforces upper bound per focus node
sh:minExclusive/minInclusive/maxExclusive/maxInclusive enforce literal range checks
sh:minLength/maxLength enforce literal length
sh:pattern enforces regex match per literal
sh:languageIn enforces literal language tag from list
sh:uniqueLang enforces unique language tags
sh:equals/disjoint/lessThan/lessThanOrEquals enforce property comparison
sh:not/and/or/xone enforce logical shape combination
sh:node and sh:property apply nested shapes
sh:qualifiedValueShape with qualifiedMinCount/qualifiedMaxCount enforce counted nested shapes
sh:closed locks extra properties; default false
sh:ignoredProperties exempts properties from closed
sh:hasValue enforces literal equality
sh:in enforces value membership
Turtle example and pySHACL usage pattern included

## Sanitised Extract
Table of Contents
1 Value Type Constraint Components
2 Cardinality Constraint Components
3 Value Range Constraint Components
4 String-based Constraint Components
5 Property Pair Constraint Components
6 Logical Constraint Components
7 Shape-based Constraint Components
8 Other Constraint Components

1 Value Type Constraint Components
sh:class: IRI of class; single or multiple; enforces RDF type membership.
sh:datatype: IRI of xsd datatype; single; enforces literal datatype.
sh:nodeKind: IRI from {sh:BlankNode, sh:IRI, sh:Literal, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral}; single.

2 Cardinality Constraint Components
sh:minCount: integer  0; default 0; enforces at least n occurrences.
sh:maxCount: integer  0; no default; enforces at most n occurrences.

3 Value Range Constraint Components
sh:minExclusive: literal; focus values > literal.
sh:minInclusive: literal; focus values  literal.
sh:maxExclusive: literal; focus values < literal.
sh:maxInclusive: literal; focus values  literal.

4 String-based Constraint Components
sh:minLength: integer  0; enforces minimum string length.
sh:maxLength: integer  0; enforces maximum string length.
sh:pattern: regex string; SPARQL regex syntax; must match at least one substring.
sh:languageIn: List of xsd:languageTag strings; literal language tag must be in list.
sh:uniqueLang: boolean; if true, each language tag appears at most once.

5 Property Pair Constraint Components
sh:equals: property IRI; values equal to values of this property on same focus node.
sh:disjoint: property IRI; values disjoint from values of this property.
sh:lessThan: property IRI; value < values of this property.
sh:lessThanOrEquals: property IRI; value  values.

6 Logical Constraint Components
sh:not: shape IRI; focus nodes must not conform.
sh:and: List of shape IRIs; must conform to all.
sh:or: List of shape IRIs; must conform to at least one.
sh:xone: List of shape IRIs; must conform to exactly one.

7 Shape-based Constraint Components
sh:node: NodeShape IRI; nested node shape.
sh:property: PropertyShape IRI; nested property shape.
sh:qualifiedValueShape: Shape IRI; shape for counted values.
sh:qualifiedMinCount: integer  0; min count.
sh:qualifiedMaxCount: integer  0; max count.

8 Other Constraint Components
sh:closed: boolean; default false; if true, no extra properties allowed.
sh:ignoredProperties: List of property IRIs; exempt from closed.
sh:hasValue: RDF term; value must equal this.
sh:in: List of RDF terms; value must be one of these.

## Original Source
RDF Graph Shape Validation Standards: SHACL & ShEx
https://www.w3.org/TR/shacl/

## Digest of SHACL_CORE

# Value Type Constraint Components

sh:class
Parameter: rdfs:Class
Accepts a class IRI. Indicates that every value of the focus property must be a SHACL instance of the given class.

sh:datatype
Parameter: xsd:Datatype IRI
Specifies that every value must be a literal of the given datatype.

sh:nodeKind
Parameter: one of sh:BlankNode, sh:IRI, sh:Literal, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral, sh:IRIOrLiteral
Specifies the kind of RDF node required.

# Cardinality Constraint Components

sh:minCount
Parameter: xsd:integer
Defines the minimum number of occurrences of the property per focus node.

sh:maxCount
Parameter: xsd:integer
Defines the maximum number of occurrences of the property per focus node.

# Value Range Constraint Components

sh:minExclusive
Parameter: literal value comparable by SPARQL
Excludes the given literal value; focus values must be greater.

sh:minInclusive
Parameter: literal value comparable by SPARQL
Focus values must be greater than or equal to the given literal.

sh:maxExclusive
Parameter: literal value comparable by SPARQL
Excludes the given literal; focus values must be less.

sh:maxInclusive
Parameter: literal value comparable by SPARQL
Focus values must be less than or equal to the given literal.

# String-based Constraint Components

sh:minLength
Parameter: xsd:integer
Minimum string length of literal values.

sh:maxLength
Parameter: xsd:integer
Maximum string length of literal values.

sh:pattern
Parameter: xsd:string (regex)
Regular expression that literal values must match.

sh:languageIn
Parameter: rdf:List of language tags
Allowed language tags for literal values.

sh:uniqueLang
Parameter: xsd:boolean
If true, literal values must each have a unique language tag.

# Property Pair Constraint Components

sh:equals
Parameter: rdf:Property IRI
Focus values must be equal to values of the given property on the same node.

sh:disjoint
Parameter: rdf:Property IRI
Focus values must be disjoint from values of the given property.

sh:lessThan
Parameter: rdf:Property IRI
Focus values must be less than values of the given property.

sh:lessThanOrEquals
Parameter: rdf:Property IRI
Focus values must be less than or equal to values of the given property.

# Logical Constraint Components

sh:not
Parameter: sh:Shape IRI
Focus nodes must not conform to the given shape.

sh:and
Parameter: rdf:List of sh:Shape IRIs
Focus nodes must conform to all shapes in the list.

sh:or
Parameter: rdf:List of sh:Shape IRIs
Focus nodes must conform to at least one shape in the list.

sh:xone
Parameter: rdf:List of sh:Shape IRIs
Focus nodes must conform to exactly one shape in the list.

# Shape-based Constraint Components

sh:node
Parameter: sh:NodeShape IRI
Applies the given node shape to focus nodes.

sh:property
Parameter: sh:PropertyShape IRI
Applies the given property shape to focus nodes.

sh:qualifiedValueShape
Parameter: sh:Shape IRI
Specifies a shape that each value must conform to, counted by min and max.

sh:qualifiedMinCount
Parameter: xsd:integer
Minimum count of values conforming to qualifiedValueShape.

sh:qualifiedMaxCount
Parameter: xsd:integer
Maximum count of values conforming to qualifiedValueShape.

# Other Constraint Components

sh:closed
Parameter: xsd:boolean (default false)
If true, focus nodes cannot have properties other than those declared in property shapes or ignoredProperties.

sh:ignoredProperties
Parameter: rdf:List of rdf:Property IRIs
Properties exempted from closed constraint.

sh:hasValue
Parameter: any RDF term
Focus nodes must have this exact value for the property.

sh:in
Parameter: rdf:List of RDF terms
Focus property values must be one of the listed values.

Retrieved on: 2024-06-16

## Attribution
- Source: RDF Graph Shape Validation Standards: SHACL & ShEx
- URL: https://www.w3.org/TR/shacl/
- License: License if known
- Crawl Date: 2025-04-30T04:51:13.994Z
- Data Size: 21477283 bytes
- Links Found: 170631

## Retrieved
2025-04-30
library/HTML_MULTIPAGE.md
# library/HTML_MULTIPAGE.md
# HTML_MULTIPAGE

## Crawl Summary


## Normalised Extract


## Supplementary Details


## Reference Details


## Information Dense Extract


## Sanitised Extract


## Original Source
Node.js Core & Web Platform APIs
https://url.spec.whatwg.org/multipage/

## Digest of HTML_MULTIPAGE



## Attribution
- Source: Node.js Core & Web Platform APIs
- URL: https://url.spec.whatwg.org/multipage/
- License: License if known
- Crawl Date: 2025-04-28T23:47:58.528Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
library/SPARQL_ENDPOINT.md
# library/SPARQL_ENDPOINT.md
# SPARQL_ENDPOINT

## Crawl Summary


## Normalised Extract


## Supplementary Details


## Reference Details


## Information Dense Extract


## Sanitised Extract


## Original Source
DBpedia SPARQL Endpoint Documentation
https://wiki.dbpedia.org/services-resources/sparql-endpoint

## Digest of SPARQL_ENDPOINT



## Attribution
- Source: DBpedia SPARQL Endpoint Documentation
- URL: https://wiki.dbpedia.org/services-resources/sparql-endpoint
- License: License
- Crawl Date: 2025-04-26T18:10:46.612Z
- Data Size: 545064 bytes
- Links Found: 12

## Retrieved
2025-04-26
library/N3_JS.md
# library/N3_JS.md
# N3_JS

## Crawl Summary
Installation: npm install n3; UMD bundle flag -s N3; CDN at unpkg.com. DataFactory methods: namedNode(string), literal(string, languageOrDatatype), defaultGraph(), blankNode([label]), variable(string), quad(subject, predicate, object, [graph]). Parser: new N3.Parser(options) with format (string), baseIRI (string), blankNodePrefix (string), isImpliedBy (boolean); parse(input, callback) returns quads via callback; parse(input) returns Quad[] synchronously; N3.StreamParser supports Readable streams, options include comments (boolean). Writer: new N3.Writer(output?, options) with prefixes, format, end; methods addQuad, blank, list, end(callback). N3.StreamWriter: objectMode Writable, RDF.js Sink. Store: new N3.Store(quads?, options) with entityIndex; properties size; methods addQuad(s), removeQuad(s), remove, removeMatches, deleteGraph, createBlankNode, match, getQuads, countQuads, forEach, every, some, getSubjects/forSubjects, getPredicates/forPredicates, getObjects/forObjects, getGraphs/forGraphs, iterator. EntityIndex for shared indexing. Reasoner: new Reasoner(store), reason(rules) supports basic graph patterns only. Interfaces: DataFactory, Stream & Sink, Store, Source, Sink, DatasetCore.

## Normalised Extract
Table of Contents
1 Installation
2 DataFactory
3 Parser
4 StreamParser
5 Writer
6 StreamWriter
7 Store
8 EntityIndex
9 Reasoner
10 Interfaces
11 Compatibility

1 Installation
 npm install n3
 browserify entry.js -s N3 -o bundle.js
 script src="https://unpkg.com/n3/browser/n3.min.js"

2 DataFactory
 namedNode(value:string):NamedNode
 literal(value:string,languageOrDatatype?:string|NamedNode):Literal
 defaultGraph():DefaultGraph
 blankNode(label?:string):BlankNode
 variable(value:string):Variable
 quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad

3 Parser
 new N3.Parser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean})
 parse(input:string|Readable,callback:(error:Error|null,quad:Quad|null,prefixes?:Record<string,NamedNode>)=>void):void
 parse(input:string):Quad[]

4 StreamParser
 new N3.StreamParser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean,comments?:boolean})
 Implements Readable(objectMode), Sink

5 Writer
 new N3.Writer(output?:Writable|object,{prefixes?:Record<string,string>,format?:string,end?:boolean})
 addQuad(subject:Term,predicate:Term,object:Term,graph?:Term):void
 blank(predicate:Term,object:Term):BlankNode
 blank(statements:{predicate:Term,object:Term}[]):BlankNode
 list(items:Term[]):BlankNode
 end(callback?:(error:Error|null,result:string)=>void):void

6 StreamWriter
 new N3.StreamWriter(output:Writable,{prefixes?:Record<string,string>})
 Implements Writable(objectMode), Sink

7 Store
 new N3.Store(quads?:Quad[],{entityIndex?:EntityIndex})
 size:number
 addQuad(Quad):void
 addQuads(Quad[]):void
 removeQuad(Quad):void
 removeQuads(Quad[]):void
 remove(input:Quad[]|AsyncIterable<Quad>|Readable|{subject?:Term,predicate?:Term,object?:Term,graph?:Term}):void
 removeMatches(subject?:Term,predicate?:Term,object?:Term,graph?:Term):void
 deleteGraph(graph:Term):void
 createBlankNode(label?:string):BlankNode
 match(subject?:Term,predicate?:Term,object?:Term,graph?:Term):Iterable<Quad>
 getQuads(...):Quad[]
 countQuads(...):number
 forEach(cb:(Quad)=>void,...):void
 every(cb:(Quad)=>boolean,...):boolean
 some(cb:(Quad)=>boolean,...):boolean
 getSubjects(...):Term[]
 forSubjects(cb:(Term)=>void,...):void
 getPredicates(...):Term[]
 forPredicates(cb,...)...:void
 getObjects(...):Term[]
 forObjects(cb,...)...:void
 getGraphs(...):Term[]
 forGraphs(cb,...)...:void
 [Symbol.iterator]():Iterator<Quad>

8 EntityIndex
 new N3.EntityIndex()
 share across stores

9 Reasoner
 new Reasoner(store:Store)
 reason(rules:string|Quad[]):void

10 Interfaces
 DataFactory implements RDF.DataFactory
 Parser, StreamParser implement RDF.Stream & Sink
 Writer, StreamWriter implement RDF.Stream & Sink
 Store implements RDF.Store,Source,Sink,DatasetCore

11 Compatibility
 Formats: Turtle,TriG,N-Triples,N-Quads,N3,Notation3,text/n3,RDF-star via name or MIME type or wildcard
 strict mode via format option

## Supplementary Details
ParserOptions structure
 format: string default permissive superset
 baseIRI: string default undefined
 blankNodePrefix: string default b{digit}_
 isImpliedBy: boolean default false

StreamParserOptions same plus comments:boolean default false

WriterOptions
 prefixes: Record<string,string> default {}
 format: string default Turtle or TriG
 end: boolean default true in stream methods

StoreOptions
 entityIndex: EntityIndex default new per store

Reasoner supports only Basic Graph Patterns rule syntax in premise and conclusion, no builtins or backward chaining

UMD bundling flag: -s N3 for browserify

Error handling: Parser passes non-null error in callback; Writer.end callback receives error; Stream classes emit 'error' event


## Reference Details
DataFactory API
 Function signatures
 namedNode(value:string):NamedNode               // no exceptions
 literal(value:string,languageOrDatatype?:string|NamedNode):Literal // if datatype is NamedNode or string
 defaultGraph():DefaultGraph                     // always returns singleton DefaultGraph
 blankNode(label?:string):BlankNode               // if label provided must match /^[A-Za-z][A-Za-z0-9]*$/? else auto-generated
 variable(value:string):Variable                 // value without leading '?'
 quad(subject:Term,predicate:Term,object:Term,graph:Term=defaultGraph()):Quad
  Returns Quad with termType 'Quad'

Parser API
 Constructor new N3.Parser(options?)
 Throws TypeError if options.format is unrecognized
 parse(input,callback)
  Emits error callbacks, quad callbacks, final invocation with quad=null and prefixes map
 parse(input) sync throws SyntaxError on invalid syntax
 Options
  format: 'Turtle'|'TriG'|'N-Triples'|'N-Quads'|'N3'|'Notation3'|'text/n3'|'application/trig'|'application/n-quads'|'text/turtle' or containing '*' for RDF-star
  baseIRI: absolute IRI string
  blankNodePrefix: prefix string, empty allowed
  isImpliedBy: true changes backward-chaining rule predicate

StreamParser API
 extends Readable(objectMode)
 methods: _transform(chunk,enc,cb) internal
 emits 'data' events with Quad objects
 emits 'prefix' events prefix:string,iri:NamedNode if prefix encountered
 emits 'comment' events if comments:true
 emits 'error' on parse error

Writer API
 new N3.Writer(output?,options?)
 addQuad(subject,predicate,object,graph?)
  throws TypeError if terms invalid
 blank(predicate,object) and blank(statements[]) return BlankNode term for manual shorthand
 list(items[]) return BlankNode representing RDF list
 end(callback)
  callback signature (error:Error|null,result:string)
 stream mode: output.write() used, respect options.end

StreamWriter API
 extends Writable(objectMode)
 implements sink.write(quad)
 calling streamWriter.end() flushes buffer and emits 'end'

Store API
 new N3.Store(quads?,options?)
 addQuad,addQuads: ignore duplicates (Quad.equals)
 removeQuad,removeQuads: ignore missing
 remove input types: array, stream, generator
 removeMatches applies same pattern removal
 deleteGraph removeMatches(...,graph)
 createBlankNode auto-generates distinct identifiers
 match returns generator yielding Quad, can be used with for..of
 getQuads returns array snapshot
 countQuads returns number
 forEach executes callback for each matching
 every returns boolean
 some returns boolean
 getSubjects, getPredicates, getObjects, getGraphs return unique Term arrays
 forSubjects, etc call callback on each unique
 size reflects current number of quads
 Symbol.iterator same as match(undefined,undefined,undefined,undefined)

EntityIndex API
 new EntityIndex()
 internal structure Map<string,Term>
 used by multiple stores via options.entityIndex
 reduces memory for shared node objects

Reasoner API
 new Reasoner(store)
 reason(rules)
  rules: string or array of Quad
  performs forward-chaining: for each rule matching premise, adds conclusion quads to store
  mutates store
  errors on unsupported builtins or backward-chaining

Troubleshooting
 parse errors: use strict format: new Parser({format:'N-Triples'})
 increase stream highWaterMark: fs.createReadStream('file.ttl',{highWaterMark:65536})
 capture errors: parser.parse(stream,{onError:(err)=>console.error(err)})
 write errors: writer.end((err,res)=>{if(err)throw err})
 memory issues: use StreamParser and StreamWriter to process large files above memory

Best Practices
 use DataFactory.quad to construct quads
 reuse StreamParser for streams in pipelines
 share EntityIndex across stores to conserve memory
 prefer streaming API for large datasets
 explicitly set prefixes in Writer options for readable output


## Information Dense Extract
N3.js v1.x: install via npm or CDN. DataFactory: namedNode(string), literal(string,langOrDatatype), defaultGraph(), blankNode([label]), variable(string), quad(subject,predicate,object,[graph]). Parser: new N3.Parser({format?,baseIRI?,blankNodePrefix?,isImpliedBy?}); parse(input,callback) or parse(input):Quad[]. StreamParser: new N3.StreamParser({...,comments?}); emits Quad, 'prefix', 'comment', 'error'. Writer: new N3.Writer(output?,{prefixes?,format?,end?}); addQuad(...), blank(...), list(...), end(callback). StreamWriter: objectMode Writable, Sink. Store: new N3.Store(quads?,{entityIndex?}); size property; addQuad(s), removeQuad(s), remove(input), removeMatches(...), deleteGraph(graph), createBlankNode(), match(...):Iterable, getQuads(...):Quad[], countQuads(...):number, forEach/every/some, getSubjects/Predicates/Objects/Graphs and forX callbacks, iterator. EntityIndex: new N3.EntityIndex() share across stores. Reasoner: new Reasoner(store); reason(rules:string|Quad[]):void supporting only basic graph patterns. Interfaces: DataFactory->RDF.DataFactory; Parser/StreamParser->RDF.Stream & Sink; Writer/StreamWriter->RDF.Stream & Sink; Store->RDF.Store,Source,Sink,DatasetCore. Formats: Turtle,TriG,N-Triples,N-Quads,N3,Notation3,text/n3,RDF-star via names or MIME types, strict via format option.

## Sanitised Extract
Table of Contents
1 Installation
2 DataFactory
3 Parser
4 StreamParser
5 Writer
6 StreamWriter
7 Store
8 EntityIndex
9 Reasoner
10 Interfaces
11 Compatibility

1 Installation
 npm install n3
 browserify entry.js -s N3 -o bundle.js
 script src='https://unpkg.com/n3/browser/n3.min.js'

2 DataFactory
 namedNode(value:string):NamedNode
 literal(value:string,languageOrDatatype?:string|NamedNode):Literal
 defaultGraph():DefaultGraph
 blankNode(label?:string):BlankNode
 variable(value:string):Variable
 quad(subject:Term,predicate:Term,object:Term,graph?:Term):Quad

3 Parser
 new N3.Parser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean})
 parse(input:string|Readable,callback:(error:Error|null,quad:Quad|null,prefixes?:Record<string,NamedNode>)=>void):void
 parse(input:string):Quad[]

4 StreamParser
 new N3.StreamParser({format?:string,baseIRI?:string,blankNodePrefix?:string,isImpliedBy?:boolean,comments?:boolean})
 Implements Readable(objectMode), Sink

5 Writer
 new N3.Writer(output?:Writable|object,{prefixes?:Record<string,string>,format?:string,end?:boolean})
 addQuad(subject:Term,predicate:Term,object:Term,graph?:Term):void
 blank(predicate:Term,object:Term):BlankNode
 blank(statements:{predicate:Term,object:Term}[]):BlankNode
 list(items:Term[]):BlankNode
 end(callback?:(error:Error|null,result:string)=>void):void

6 StreamWriter
 new N3.StreamWriter(output:Writable,{prefixes?:Record<string,string>})
 Implements Writable(objectMode), Sink

7 Store
 new N3.Store(quads?:Quad[],{entityIndex?:EntityIndex})
 size:number
 addQuad(Quad):void
 addQuads(Quad[]):void
 removeQuad(Quad):void
 removeQuads(Quad[]):void
 remove(input:Quad[]|AsyncIterable<Quad>|Readable|{subject?:Term,predicate?:Term,object?:Term,graph?:Term}):void
 removeMatches(subject?:Term,predicate?:Term,object?:Term,graph?:Term):void
 deleteGraph(graph:Term):void
 createBlankNode(label?:string):BlankNode
 match(subject?:Term,predicate?:Term,object?:Term,graph?:Term):Iterable<Quad>
 getQuads(...):Quad[]
 countQuads(...):number
 forEach(cb:(Quad)=>void,...):void
 every(cb:(Quad)=>boolean,...):boolean
 some(cb:(Quad)=>boolean,...):boolean
 getSubjects(...):Term[]
 forSubjects(cb:(Term)=>void,...):void
 getPredicates(...):Term[]
 forPredicates(cb,...)...:void
 getObjects(...):Term[]
 forObjects(cb,...)...:void
 getGraphs(...):Term[]
 forGraphs(cb,...)...:void
 [Symbol.iterator]():Iterator<Quad>

8 EntityIndex
 new N3.EntityIndex()
 share across stores

9 Reasoner
 new Reasoner(store:Store)
 reason(rules:string|Quad[]):void

10 Interfaces
 DataFactory implements RDF.DataFactory
 Parser, StreamParser implement RDF.Stream & Sink
 Writer, StreamWriter implement RDF.Stream & Sink
 Store implements RDF.Store,Source,Sink,DatasetCore

11 Compatibility
 Formats: Turtle,TriG,N-Triples,N-Quads,N3,Notation3,text/n3,RDF-star via name or MIME type or wildcard
 strict mode via format option

## Original Source
JavaScript RDF & Linked Data Libraries
https://github.com/rdfjs/N3.js#readme

## Digest of N3_JS

# N3.js Technical Specifications

Date Retrieved: 2024-06-15
Data Size: 668921 bytes

# Installation

• npm install n3
• UMD bundle: browserify entry.js -s N3 -o bundle.js
• CDN: <script src="https://unpkg.com/n3/browser/n3.min.js"></script>

# DataFactory API

Signature:
• namedNode(value: string): NamedNode
• literal(value: string, languageOrDatatype?: string | NamedNode): Literal
• defaultGraph(): DefaultGraph
• blankNode([prefixOrLabel?: string]): BlankNode
• variable(value: string): Variable
• quad(subject: Term, predicate: Term, object: Term, graph?: Term): Quad

# Parser API

Constructor: new N3.Parser(options?: {
  format?: string             // e.g. 'Turtle','TriG','N-Triples','N3','application/trig','text/n3', 'TriG*'
  baseIRI?: string
  blankNodePrefix?: string    // default: 'b' + digit + '_'
  isImpliedBy?: boolean       // default: false
})

Methods:
• parse(input: string, callback: (error: Error|null, quad: Quad|null, prefixes?: Record<string,NamedNode>) => void): void
• parse(input: Readable, callback: ...): void
• parse(input: string): Quad[]    // synchronous

# StreamParser API

Constructor: new N3.StreamParser(options?: {
  format?: string
  baseIRI?: string
  blankNodePrefix?: string
  isImpliedBy?: boolean
  comments?: boolean        // default: false
})
Implements: Node.js Readable (objectMode), RDF.js Sink

# Writer API

Constructor: new N3.Writer(output?: Writable|object, options?: {
  prefixes?: Record<string,string>
  format?: string          // default: Turtle or TriG if named graphs
  end?: boolean            // default: true in streaming mode
})

Methods:
• addQuad(subject: Term, predicate: Term, object: Term, graph?: Term): void
• blank(predicate: Term, object: Term): BlankNode
• blank(statements: { predicate: Term, object: Term }[]): BlankNode
• list(items: Term[]): BlankNode
• end(callback?: (error: Error|null, result: string) => void): void

# StreamWriter API

Constructor: new N3.StreamWriter(output: Writable, options?: { prefixes?: Record<string,string> })
Implements: Node.js Writable (objectMode), RDF.js Sink

# Store API

Constructor: new N3.Store(quads?: Quad[], options?: { entityIndex?: EntityIndex })

Properties:
• size: number

Methods:
• addQuad(quad: Quad): void
• addQuads(quads: Quad[]): void
• removeQuad(quad: Quad): void
• removeQuads(quads: Quad[]): void
• remove(input: Quad[]|AsyncIterable<Quad>|Readable|{ subject?: Term, predicate?: Term, object?: Term, graph?: Term }): void
• removeMatches(subject?: Term, predicate?: Term, object?: Term, graph?: Term): void
• deleteGraph(graph: Term): void
• createBlankNode([prefixOrLabel?: string]): BlankNode
• match(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Iterable<Quad>
• getQuads(subject?, predicate?, object?, graph?): Quad[]
• countQuads(subject?, predicate?, object?, graph?): number
• forEach(callback: (quad: Quad) => void, subject?, predicate?, object?, graph?): void
• every(callback: (quad: Quad) => boolean, subject?, predicate?, object?, graph?): boolean
• some(callback: (quad: Quad) => boolean, subject?, predicate?, object?, graph?): boolean
• getSubjects(predicate?, object?, graph?): Term[]
• forSubjects(callback: (subject: Term) => void, predicate?, object?, graph?): void
• getPredicates(subject?, object?, graph?): Term[]
• forPredicates(callback, subject?, object?, graph?): void
• getObjects(subject?, predicate?, graph?): Term[]
• forObjects(callback, subject?, predicate?, graph?): void
• getGraphs(subject?, predicate?, object?): Term[]
• forGraphs(callback, subject?, predicate?, object?): void
• [Symbol.iterator](): Iterator<Quad>

# EntityIndex API

Constructor: new N3.EntityIndex()
Use: share index across multiple stores

# Reasoner API

Constructor: new Reasoner(store: N3.Store)
Method: reason(rules: string | Quad[]): void    // supports only basic graph patterns

# RDF.js Interfaces

• DataFactory implements RDF.DataFactory
• Parser & StreamParser implement RDF.Stream & RDF.Sink
• Writer & StreamWriter implement RDF.Stream & RDF.Sink
• Store implements RDF.Store, RDF.Source, RDF.Sink, RDF.DatasetCore

## Attribution
- Source: JavaScript RDF & Linked Data Libraries
- URL: https://github.com/rdfjs/N3.js#readme
- License: License if known
- Crawl Date: 2025-04-28T15:49:45.907Z
- Data Size: 668921 bytes
- Links Found: 5111

## Retrieved
2025-04-28
library/OWL2_SYNTAX.md
# library/OWL2_SYNTAX.md
# OWL2_SYNTAX

## Crawl Summary
Defines lexical rules, BNF grammar, structural equivalence, IRI handling, and datatype lexical forms for OWL 2 functional-style syntax. Specifies greedy tokenization, handling of whitespace/comments, prefix expansion, datatype token patterns, functional constructs (ObjectUnionOf, ObjectComplementOf, ClassAssertion), and normalization steps (duplicate elimination, flattening).

## Normalised Extract
Table of Contents:
1 Lexical Tokens
2 Parsing Algorithm
3 Grammar Rules (BNF)
4 Structural Equivalence
5 IRI Handling
6 Datatype Lexical Forms
7 Functional-Syntax Constructs

1 Lexical Tokens
• Regex-based tokens: quotedString, languageTag, integer, IRI, prefixName, nodeID
• Delimiters: whitespace, comments ignored

2 Parsing Algorithm
Step 1: Regex match at pointer p
Step 2: Emit non-ignored tokens
Step 3: Enforce delimiter boundary or reject
Repeat to end

3 Grammar Rules (BNF)
ClassExpression ::= Identifier | Function '(' arguments ')'
Arguments ::= ClassExpression { ClassExpression }
Syntax keywords: 'ObjectIntersectionOf', 'DataPropertyAssertion', etc.

4 Structural Equivalence
Implement set-list equivalence rules for UML class instances

5 IRI Handling
Full IRI: '<' IRI_string '>'
Prefixed IRI: prefixName ':' localPart
Prefix declarations: Prefix(prefixName prefixIRI)

6 Datatype Lexical Forms
nonNegativeInteger: [0-9]+
quotedString: '"'( (\\"|\\\\|[^\\"])*)'"'
languageTag: '@'[A-Za-z0-9-]+
nodeID: '_:'[A-Za-z][A-Za-z0-9]*

7 Functional-Syntax Constructs
ObjectUnionOf(exprList), ObjectComplementOf(expr)
ClassAssertion(Class Individual), DataPropertyAssertion(Property Individual Literal)

## Supplementary Details
Implementation Patterns:
• Configure prefixMap: Map<String,String> of prefixName→prefixIRI.
• Precompile token regex patterns for performance.
• Enforce flattening: dedupe nested unordered constructs at parse tree build.
• Discard duplicates: use Set<> for unordered associations.
• Strict delimiter enforcement: implement boundary check after each token.

Parameter Configurations:
• allowComments: boolean (default true)
• allowPrefixAbbrev: boolean (default true)
• strictDuplicates: boolean (default true)

Step-by-Step Parsing:
1. Initialize parser with prefixMap and flags.
2. Tokenize input stream into Token[]
3. Validate token sequence per BNF
4. Build AST: instantiate UML objects
5. Apply structural normalization: eliminate duplicates, flatten
6. Return OntologyDocument

## Reference Details
API: OWL2SyntaxParser

Constructor(prefixMap: Map<String,String>, options: {allowComments:boolean, allowPrefixAbbrev:boolean, strictDuplicates:boolean})

Methods:
• tokenize(input: string): Token[]
  - input: full document string
  - returns: array of tokens {type:string,value:string,position:number}
• parse(tokens: Token[]): OntologyDocument
  - tokens: output from tokenize
  - returns: AST root instance of OntologyDocument
• validate(doc: OntologyDocument): ValidationResult
  - returns errors with line, column, message

Code Example (JavaScript):
const parser = new OWL2SyntaxParser({"owl":"http://www.w3.org/2002/07/owl#"}, {allowComments:true});
const tokens = parser.tokenize(fs.readFileSync('ontology.owl2', 'utf8'));
const doc = parser.parse(tokens);
const result = parser.validate(doc);
if (result.errors.length) console.error(result.errors);
else console.log('Parsed successfully');

Best Practices:
• Predefine and share prefixMap across modules.
• Use strictDuplicates to guarantee consistent AST structure.
• Wrap parse and validate in try/catch for robust error handling.

Troubleshooting:
Command:
 node parse.js ontology.owl2
Expected Errors:
 Line 23, Col 5: Unexpected token 'pref:Name@ en'
 Line 45, Col 10: Missing ')' after ObjectIntersectionOf
Fix by ensuring language tags have no space after '@' and matching parentheses.


## Information Dense Extract
Tokens: quotedString, languageTag, nonNegativeInteger, IRI, prefixName, nodeID; delimiters whitespace/comments ignored. Tokenization: greedy longest-match regex; enforce delimiter boundaries. BNF grammar: ClassExpression ::= Function '(' args ')' | Identifier; reps { } optional [ ]. Structural equivalence: set vs list matches; UML class instance equality. IRI: full '<IRI>' or prefixName:localPart; expand prefixMap. Datatypes: integer=[0-9]+; quotedString="(\\\"|\\\\|[^\\"]*)"; languageTag=@[A-Za-z0-9-]+; nodeID=_:[A-Za-z][A-Za-z0-9]*. Constructs: ObjectUnionOf(list), ObjectComplementOf(expr), ClassAssertion(Class,Individual). API: OWL2SyntaxParser(prefixMap,options)->tokenize(input):Token[]->parse(tokens):OntologyDocument->validate(doc):ValidationResult. Options: allowComments,allowPrefixAbbrev,strictDuplicates. Code: see above. Troubleshooting errors: bad tokens, mismatched delimiters.

## Sanitised Extract
Table of Contents:
1 Lexical Tokens
2 Parsing Algorithm
3 Grammar Rules (BNF)
4 Structural Equivalence
5 IRI Handling
6 Datatype Lexical Forms
7 Functional-Syntax Constructs

1 Lexical Tokens
 Regex-based tokens: quotedString, languageTag, integer, IRI, prefixName, nodeID
 Delimiters: whitespace, comments ignored

2 Parsing Algorithm
Step 1: Regex match at pointer p
Step 2: Emit non-ignored tokens
Step 3: Enforce delimiter boundary or reject
Repeat to end

3 Grammar Rules (BNF)
ClassExpression ::= Identifier | Function '(' arguments ')'
Arguments ::= ClassExpression { ClassExpression }
Syntax keywords: 'ObjectIntersectionOf', 'DataPropertyAssertion', etc.

4 Structural Equivalence
Implement set-list equivalence rules for UML class instances

5 IRI Handling
Full IRI: '<' IRI_string '>'
Prefixed IRI: prefixName ':' localPart
Prefix declarations: Prefix(prefixName prefixIRI)

6 Datatype Lexical Forms
nonNegativeInteger: [0-9]+
quotedString: '''( ('''|''''|[^'''])*)'''
languageTag: '@'[A-Za-z0-9-]+
nodeID: '_:'[A-Za-z][A-Za-z0-9]*

7 Functional-Syntax Constructs
ObjectUnionOf(exprList), ObjectComplementOf(expr)
ClassAssertion(Class Individual), DataPropertyAssertion(Property Individual Literal)

## Original Source
W3C RDF 1.1 & OWL 2 Specifications
https://www.w3.org/TR/owl2-syntax/

## Digest of OWL2_SYNTAX

# Lexical Analysis
Terminals and tokenization for OWL 2 functional-style syntax.

## Token Types and Delimiters
• Whitespace: U+20, U+9, U+A, U+D. Ignored.
• Comment: sequences starting with U+23 (#) up to line break. Ignored.
• Delimiters: parentheses '(', ')', comma ',', colon ':', arrow '->', equality '^'^ etc.

## Tokenization Procedure
1. Build regex for each terminal symbol (quotedString, languageTag, integer, IRI, prefixName, nodeID).
2. Initialize pointer p=0.
3. At p, greedily match all regexes; longest match wins; reject if none.
4. Emit token unless whitespace/comment; advance p.
5. If token does not end on delimiter and next char is not delimiter, match whitespace/comment; else reject.
6. Repeat until end of input.

# Grammar and Parsing
BNF Notation:
• Syntax: terminal symbols in 'single quotes'.
• Nonterminals: classExpression, assertion, declaration.
• Repetition: { ... } zero or more; [ ... ] optional; A|B alternatives.

Example Rule:
ClassExpression ::= 'ObjectIntersectionOf' '(' ClassExpression { ClassExpression } ')'

# Structural Equivalence
Defines equivalence of UML instances:
• Atomic values: identical.
• Unordered associations: sets equal up to element equivalence.
• Ordered associations with repeats: lists equal by index.
• UML instances: same class and all associations structurally equivalent.

# IRI Abbreviations and Prefixed Names
• Full IRI: '<' IRI_string '>'. IRI_string per RFC3987.
• Prefix IRI: prefixName ':' rc. prefixName declared via 'Prefix' declarations.
• Expansion: prefixName:rc → fullIRI = prefixIRI + rc.
• Implementations must expand all abbreviations during parse.

# Datatype Maps
• nonNegativeInteger: sequence of digits 0–9.
• quotedString: '"' chars with escapes \" or \\ '"'.
• languageTag: '@' langtag per BCP47.
• nodeID: BLANK_NODE_LABEL per SPARQL.

# Functional-Style Syntax Rules
Objects:
• ObjectUnionOf(ClassExpressions)
• ObjectComplementOf(ClassExpression)
• ClassAssertion(Class, Individual)

Flattening:
ObjectUnionOf(a:Person a:Animal a:Animal) → ObjectUnionOf(a:Person a:Animal)


## Attribution
- Source: W3C RDF 1.1 & OWL 2 Specifications
- URL: https://www.w3.org/TR/owl2-syntax/
- License: License
- Crawl Date: 2025-04-28T02:23:41.658Z
- Data Size: 22525153 bytes
- Links Found: 19958

## Retrieved
2025-04-28
library/COMUNICA_SPARQL.md
# library/COMUNICA_SPARQL.md
# COMUNICA_SPARQL

## Crawl Summary
Initialized QueryEngine via new QueryEngine(config?). Core methods: queryBindings(query,context)→BindingsStream; queryBoolean(query,context)→Promise<boolean>; queryQuads(query,context)→QuadStream; queryVoid(query,context)→Promise<void>; invalidateHttpCache(sources?)→Promise<void>. Context keys: sources: string[]|ILinkRecord[]; fetch; httpRetryCount=3; httpTimeout=30000; httpIncludeCredentials=false; headers; logger. BindingsStream: Node.js readable stream of Map<string,Term>. QuadStream: stream of RDF.Quad. metadata():Promise<Record>. Errors: QueryEngineError. HTTP cache: maxSize=1000,maxAge=300000ms. Use web-streams-polyfill in browsers.

## Normalised Extract
Table of Contents
1  Importing the Engine
2  Engine Configuration
3  Query Methods
4  Context Keys
5  Stream Consumption
6  Error Handling
7  HTTP Cache Management

1  Importing the Engine
   • ESM: import { QueryEngine } from "@comunica/query-sparql";
   • CommonJS: const { QueryEngine } = require("@comunica/query-sparql");
   • Initialize: const engine = new QueryEngine({ baseIRI, pluginModules, initialContext });

2  Engine Configuration
   • baseIRI: string base IRI for relative IRIs
   • pluginModules: custom mediator modules array
   • initialContext: IActionContext initial context keys

3  Query Methods
3.1  queryBindings(query:string|Query, context?:IActionContext) → Promise<BindingsStream>
   • Use for SELECT queries.
   • Returns Node.js Readable stream of Bindings: on('data', binding:Map<string,Term>).

3.2  queryBoolean(query:string|Query, context?:IActionContext) → Promise<boolean>
   • Use for ASK queries.

3.3  queryQuads(query:string|Query, context?:IActionContext) → Promise<QuadStream>
   • Use for CONSTRUCT/DESCRIBE; QuadStream: stream of RDF.Quad.

3.4  queryVoid(query:string|Query, context?:IActionContext) → Promise<void>
   • Use for SPARQL UPDATE operations (INSERT/DELETE).

3.5  invalidateHttpCache(sources?:string[]) → Promise<void>
   • Clears HTTP cache for listed endpoints or all if omitted.

4  Context Keys
   • sources: Array<string|{type: 'file'|'sparql'|'hypermedia'|'rdfjsSource',value:string|Readable}>
   • fetch: (input,init?)→Promise<Response>
   • httpRetryCount: number default 3
   • httpTimeout: number default 30000
   • httpIncludeCredentials: boolean default false
   • headers: Record<string,string>
   • logger: Console-like object

5  Stream Consumption
   • BindingsStream: on('data', binding); on('end'); on('error')
   • QuadStream: on('data', quad); on('end'); on('error')

6  Error Handling
   • result.metadata() → Promise<Record<string,any>>
   • Errors thrown: QueryEngineError { message, details:{cause, query} }

7  HTTP Cache Management
   • Default cacheConfig: { maxSize: 1000, maxAge: 300000 }
   • invalidateHttpCache clears entries older than maxAge or resets all


## Supplementary Details
Engine Constructor Options
• baseIRI: default '', used as base for relative IRIs
• pluginModules: [], to override internal mediators
• initialContext: merges into action context on each query

Context Parameters
• sources: required. Each entry may be:
    - String URL
    - Object { type: 'file', value: '/path/to/file.ttl' }
    - Object { type: 'sparql', value: 'https://dbpedia.org/sparql' }
    - Object { type: 'hypermedia', value: 'https://fragments.example.org' }
    - Object { type: 'rdfjsSource', value: rdfSourceInstance }
• fetch: cross-fetch or custom function. default uses node-fetch
• httpRetryCount: 3 retries on network errors
• httpTimeout: 30000ms after which request aborts
• httpIncludeCredentials: false by default; set true to send cookies
• headers: custom HTTP headers for all requests
• logger: must implement debug(info), error(err)

HTTP Cache Config
• maxSize: 1000 URIs stored
• maxAge: 300000ms TTL per entry

Fetch Integration
• Use web-streams-polyfill for browser:
    import { ponyfill } from 'web-streams-polyfill';
    const engine = new QueryEngine(ponyfill);

## Reference Details
Import Statements
ESM: import { QueryEngine } from "@comunica/query-sparql";
CJS: const { QueryEngine } = require("@comunica/query-sparql");

QueryEngine(config?: IQueryEngineConfig)

Interface IQueryEngineConfig
  baseIRI?: string
  pluginModules?: any[]
  initialContext?: IActionContext

Interface IActionContext
  sources: Array<string|ILinkRecord>
  fetch?: (input: string|Request, init?: RequestInit) => Promise<Response>
  httpRetryCount?: number
  httpTimeout?: number
  httpIncludeCredentials?: boolean
  headers?: Record<string,string>
  logger?: { debug(msg:string):void; error(msg:string):void }

Method Signatures
queryBindings(query: string|Query, context?: IActionContext): Promise<BindingsStream>
queryBoolean(query: string|Query, context?: IActionContext): Promise<boolean>
queryQuads(query: string|Query, context?: IActionContext): Promise<QuadStream>
queryVoid(query: string|Query, context?: IActionContext): Promise<void>
invalidateHttpCache(sources?: string[]): Promise<void>

BindingsStream extends Readable
  'data': (binding: Map<string, RDF.Term>) => void
  'end': () => void
  'error': (err: Error) => void

QuadStream extends Readable
  'data': (quad: RDF.Quad) => void
  'end': () => void
  'error': (err: Error) => void

Error Types
QueryEngineError
  message: string
  details: { cause: Error; query: string }

Code Example
import { QueryEngine } from "@comunica/query-sparql";
import { ponyfill } from 'web-streams-polyfill';

const engine = new QueryEngine(ponyfill);

async function run() {
  const result = await engine.queryBindings(
    "SELECT ?s ?p ?o WHERE { ?s ?p ?o }",
    { sources: [
        'https://fragments.dbpedia.org/2016-04/en',
        { type: 'file', value: './local.ttl' }
      ],
      httpTimeout: 60000,
      headers: { 'User-Agent': 'MyAgent/1.0' }
    }
  );
  result.on('data', binding => {
    console.log(binding.get('s').value, binding.get('p').value, binding.get('o').value);
  });
  result.on('end', () => console.log('Query complete'));
}

best practices
• Pre-declare frequent endpoints in sources array
• Use small page sizes on hypermedia sources: context.hypermediaLinksPageSize=25
• Clear cache before testing: await engine.invalidateHttpCache()

Troubleshooting
1  Timeouts on SPARQL endpoint:
   increase httpTimeout or reduce timeout scope
2  Empty results on CONSTRUCT:
   verify query syntax; check default graph specification
3  Fetch errors:
   enable debug logging: context.logger={debug:console.log,error:console.error}
4  HTTP cache stale entries:
   await engine.invalidateHttpCache(['https://dbpedia.org/sparql'])

## Information Dense Extract
QueryEngine({baseIRI?,pluginModules?,initialContext?}) Methods: queryBindings(q: string|Query,ctx?:IActionContext)→Promise<BindingsStream> queryBoolean(q,ctx?)→Promise<boolean> queryQuads(q,ctx?)→Promise<QuadStream> queryVoid(q,ctx?)→Promise<void> invalidateHttpCache(sources?:string[])→Promise<void> Context keys: sources: Array<string|{type:'file'|'sparql'|'hypermedia'|'rdfjsSource',value:string|Readable}>; fetch(input,init?)→Promise<Response>; httpRetryCount=3; httpTimeout=30000; httpIncludeCredentials=false; headers:Record<string,string>; logger:{debug(),error()} BindingsStream: Node Readable stream of Map<string,RDF.Term> QuadStream: Readable stream of RDF.Quad metadata()→Promise<Record> Errors: QueryEngineError{message,details:{cause,query}} HTTP cache: maxSize=1000,maxAge=300000ms. Use web-streams-polyfill in browsers.

## Sanitised Extract
Table of Contents
1  Importing the Engine
2  Engine Configuration
3  Query Methods
4  Context Keys
5  Stream Consumption
6  Error Handling
7  HTTP Cache Management

1  Importing the Engine
    ESM: import { QueryEngine } from '@comunica/query-sparql';
    CommonJS: const { QueryEngine } = require('@comunica/query-sparql');
    Initialize: const engine = new QueryEngine({ baseIRI, pluginModules, initialContext });

2  Engine Configuration
    baseIRI: string base IRI for relative IRIs
    pluginModules: custom mediator modules array
    initialContext: IActionContext initial context keys

3  Query Methods
3.1  queryBindings(query:string|Query, context?:IActionContext)  Promise<BindingsStream>
    Use for SELECT queries.
    Returns Node.js Readable stream of Bindings: on('data', binding:Map<string,Term>).

3.2  queryBoolean(query:string|Query, context?:IActionContext)  Promise<boolean>
    Use for ASK queries.

3.3  queryQuads(query:string|Query, context?:IActionContext)  Promise<QuadStream>
    Use for CONSTRUCT/DESCRIBE; QuadStream: stream of RDF.Quad.

3.4  queryVoid(query:string|Query, context?:IActionContext)  Promise<void>
    Use for SPARQL UPDATE operations (INSERT/DELETE).

3.5  invalidateHttpCache(sources?:string[])  Promise<void>
    Clears HTTP cache for listed endpoints or all if omitted.

4  Context Keys
    sources: Array<string|{type: 'file'|'sparql'|'hypermedia'|'rdfjsSource',value:string|Readable}>
    fetch: (input,init?)Promise<Response>
    httpRetryCount: number default 3
    httpTimeout: number default 30000
    httpIncludeCredentials: boolean default false
    headers: Record<string,string>
    logger: Console-like object

5  Stream Consumption
    BindingsStream: on('data', binding); on('end'); on('error')
    QuadStream: on('data', quad); on('end'); on('error')

6  Error Handling
    result.metadata()  Promise<Record<string,any>>
    Errors thrown: QueryEngineError { message, details:{cause, query} }

7  HTTP Cache Management
    Default cacheConfig: { maxSize: 1000, maxAge: 300000 }
    invalidateHttpCache clears entries older than maxAge or resets all

## Original Source
Comunica SPARQL Framework
https://comunica.dev/docs/query/sparql/

## Digest of COMUNICA_SPARQL

# Comunica SPARQL Query Module

## 1. Import and Initialization

### ESM Import
import { QueryEngine } from "@comunica/query-sparql";
const engine = new QueryEngine({
  baseIRI?: string;
  pluginModules?: any[];
  initialContext?: Record<string, any>;
});

### CommonJS Import
const { QueryEngine } = require("@comunica/query-sparql");
const engine = new QueryEngine();

## 2. Core Query Methods

### queryBindings
Signature: queryBindings(query: string | Query, context?: IActionContext): Promise<BindingsStream>
Description: Executes SELECT queries and returns a Node.js readable stream of Bindings.

### queryBoolean
Signature: queryBoolean(query: string | Query, context?: IActionContext): Promise<boolean>
Description: Executes ASK queries and resolves to true or false based on data.

### queryQuads
Signature: queryQuads(query: string | Query, context?: IActionContext): Promise<QuadStream>
Description: Executes CONSTRUCT/DESCRIBE queries and returns a stream of RDF quads.

### queryVoid
Signature: queryVoid(query: string | Query, context?: IActionContext): Promise<void>
Description: Executes UPDATE operations (INSERT/DELETE).

### invalidateHttpCache
Signature: invalidateHttpCache(sources?: string[]): Promise<void>
Description: Clears HTTP cache for specified endpoints or all by default.

## 3. Context Configuration

Actions Context Keys:
- sources: Array<string | ILinkRecord> (mandatory):
    Each entry may be:
      • URL string
      • { type: "file"|"sparql"|"hypermedia"|"rdfjsSource", value: string | Readable }
- fetch: (input: string | Request, init?: RequestInit) => Promise<Response> (optional)
- httpRetryCount: number (default: 3)
- httpTimeout: number in milliseconds (default: 30000)
- httpIncludeCredentials: boolean (default: false)
- headers: Record<string, string> (for fetch)
- logger: Console or custom logger with .debug/.error

## 4. Consuming Streams

BindingsStream: Node.js stream of Map<string, RDF.Term>. Methods:
  .on('data', binding)
  .on('end')
  .on('error')

QuadStream: Node.js stream of RDF.Quad

## 5. Error Handling and Metadata

- result.metadata(): Promise<Record<string, any>>
- Throws QueryEngineError with:
    • message: string
    • details: { cause: Error; query: string }

## 6. HTTP Cache Management

- invalidateHttpCache(): clears internal fetch cache
- cacheConfig:
    • maxSize: number (default: 1000 entries)
    • maxAge: number in ms (default: 5 minutes)

## 7. Best Practices

- Use web-streams-polyfill in browser:
    import { ponyfill } from 'web-streams-polyfill';
    const engine = new QueryEngine(ponyfill);
- Pre-warm HTTP cache via dummy HEAD requests
- Limit sources array to required endpoints to reduce planning overhead

## Attribution
- Source: Comunica SPARQL Framework
- URL: https://comunica.dev/docs/query/sparql/
- License: License if known
- Crawl Date: 2025-04-29T07:49:01.555Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29
library/CORE_CONSTRAINT_COMPONENTS.md
# library/CORE_CONSTRAINT_COMPONENTS.md
# CORE_CONSTRAINT_COMPONENTS

## Crawl Summary
Value Type: class, datatype, nodeKind; Cardinality: minCount, maxCount; Range: minExclusive, minInclusive, maxExclusive, maxInclusive; String: minLength, maxLength, pattern, languageIn, uniqueLang; Pair: equals, disjoint, lessThan, lessThanOrEquals; Logic: not, and, or, xone; Shape-based: node, property, qualifiedValueShape, qualifiedMinCount, qualifiedMaxCount; Other: closed, ignoredProperties, hasValue, in; ValidationReport and ValidationResult structures.

## Normalised Extract
Contents:
1  Value Type Components
2  Cardinality Components
3  Value Range Components
4  String Components
5  Property Pair Components
6  Logical Components
7  Shape-based Components
8  Other Components
9  Validation Report Structures

1  Value Type Components
sh:class  IRI of required class  cardinality 0..1
sh:datatype  IRI of XSD datatype  cardinality 0..1
sh:nodeKind  sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI  cardinality 0..1

2  Cardinality Components
sh:minCount  xsd:integer ≥0  cardinality 0..1
sh:maxCount  xsd:integer ≥0  cardinality 0..1

3  Value Range Components
sh:minExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:minInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1

4  String Components
sh:minLength  xsd:integer ≥0  cardinality 0..1
sh:maxLength  xsd:integer ≥0  cardinality 0..1
sh:pattern  xsd:string  regex anchored  cardinality 0..1
sh:languageIn  RDF list of BCP47  cardinality 0..1
sh:uniqueLang  xsd:boolean  cardinality 0..1

5  Property Pair Components
sh:equals|sh:disjoint|sh:lessThan|sh:lessThanOrEquals  IRI of property  cardinality 0..1 each

6  Logical Components
sh:not  IRI of sh:Shape  cardinality 0..1
sh:and|sh:or|sh:xone  RDF list of sh:Shape  cardinality 0..1 each

7  Shape-based Components
sh:node  IRI of NodeShape  cardinality 0..1
sh:property  IRI of PropertyShape  cardinality 0..1
sh:qualifiedValueShape  IRI of NodeShape  cardinality 0..1
sh:qualifiedMinCount|sh:qualifiedMaxCount  xsd:integer  cardinality 0..1 each

8  Other Components
sh:closed  xsd:boolean  cardinality 0..1
sh:ignoredProperties  RDF list of IRIs  cardinality 0..1
sh:hasValue  RDF term  cardinality 0..1
sh:in  RDF list of RDF terms  cardinality 0..1

9  Validation Report Structures
sh:ValidationReport  sh:conforms xsd:boolean; sh:result rdf:List of sh:ValidationResult
sh:ValidationResult  sh:focusNode; sh:resultPath; sh:value; sh:sourceShape; sh:sourceConstraintComponent; sh:detail; sh:resultMessage; sh:resultSeverity

## Supplementary Details
Implementation Steps:
1  Include SHACL vocabulary prefix: @prefix sh: <http://www.w3.org/ns/shacl#> .
2  Define NodeShape:
   ex:PersonShape a sh:NodeShape;
       sh:targetClass ex:Person;
       sh:property [ sh:path ex:ssn; sh:datatype xsd:string; sh:pattern "^[0-9]{3}-[0-9]{2}-[0-9]{4}$"; sh:maxCount 1 ];
       sh:property [ sh:path ex:worksFor; sh:class ex:Company; sh:minCount 0 ];
       sh:closed true; sh:ignoredProperties ( rdf:type ) .
3  Validate using CLI:
   shacl validate --data data.ttl --shapes shapes.ttl --output report.ttl
4  Interpret report.ttl: check sh:conforms false and iterate sh:result members.
Configuration Options:
- --fail-fast boolean default false abort on first violation
- --entailments none|rdfs|owl default none
- --output-format turtle|json|rdfxml default turtle

## Reference Details
Turtle Vocabulary:
Prefix bindings:
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix sh: <http://www.w3.org/ns/shacl#>

Shape Declaration Pattern:
NodeShape:
  ex:ShapeIRI a sh:NodeShape;
    sh:targetClass ex:SomeClass;
    [ sh:path ex:prop; sh:datatype xsd:string; sh:minCount 1; sh:maxCount 1 ] ;
    sh:closed true;
    sh:ignoredProperties ( rdf:type );
    sh:message "Custom message"@en .

Best Practices:
- Combine datatype and pattern for strict lexical forms.
- Use sh:closed and sh:ignoredProperties to enforce closed-world.
- Group related constraints in one property shape.

Troubleshooting:
Command: shacl validate --data bad-data.ttl --shapes shapes.ttl
Expected output: report.ttl containing sh:ValidationResult with sh:resultMessage describing violation.
If CLI exits code 0 but report sh:conforms true inspect debug with --log-level debug

Java API Example (TopBraid SHACL):
  Shapes shapes = Shapes.parse(new FileInputStream("shapes.ttl"), RDFFormat.TURTLE);
  Model data = Rio.parse(new FileInputStream("data.ttl"), "", RDFFormat.TURTLE);
  ValidationReport report = ShaclValidator.get().validate(shapes.getGraph(), data.getGraph());
  report.getEntries().forEach(e -> System.out.println(e.message()));

## Information Dense Extract
sh:class IRI; sh:datatype IRI; sh:nodeKind IRI; sh:minCount integer≥0; sh:maxCount integer≥0; sh:minExclusive|Inclusive|maxExclusive|Inclusive decimal|dateTime|string; sh:minLength|maxLength integer≥0; sh:pattern string regex; sh:languageIn list(tags); sh:uniqueLang boolean; sh:equals|disjoint|lessThan|lessThanOrEquals propertyIRI; sh:not shapeIRI; sh:and|or|xone list(shapeIRI); sh:node shapeIRI; sh:property propShapeIRI; sh:qualifiedValueShape shapeIRI; sh:qualifiedMinCount|MaxCount integer; sh:closed boolean; sh:ignoredProperties list(propIRI); sh:hasValue term; sh:in list(term); ValidationReport: sh:conforms boolean; sh:result list(ValidationResult); ValidationResult: focusNode; resultPath; value; sourceShape; sourceConstraintComponent; detail; resultMessage; resultSeverity; CLI: shacl validate --data data.ttl --shapes shapes.ttl --output report.ttl --fail-fast false --entailments none --output-format turtle; Java: Shapes.parse(...); ShaclValidator.get().validate(...).

## Sanitised Extract
Contents:
1  Value Type Components
2  Cardinality Components
3  Value Range Components
4  String Components
5  Property Pair Components
6  Logical Components
7  Shape-based Components
8  Other Components
9  Validation Report Structures

1  Value Type Components
sh:class  IRI of required class  cardinality 0..1
sh:datatype  IRI of XSD datatype  cardinality 0..1
sh:nodeKind  sh:IRI|sh:BlankNode|sh:Literal|sh:BlankNodeOrIRI  cardinality 0..1

2  Cardinality Components
sh:minCount  xsd:integer 0  cardinality 0..1
sh:maxCount  xsd:integer 0  cardinality 0..1

3  Value Range Components
sh:minExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:minInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxExclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1
sh:maxInclusive  xsd:decimal|xsd:dateTime|xsd:string  cardinality 0..1

4  String Components
sh:minLength  xsd:integer 0  cardinality 0..1
sh:maxLength  xsd:integer 0  cardinality 0..1
sh:pattern  xsd:string  regex anchored  cardinality 0..1
sh:languageIn  RDF list of BCP47  cardinality 0..1
sh:uniqueLang  xsd:boolean  cardinality 0..1

5  Property Pair Components
sh:equals|sh:disjoint|sh:lessThan|sh:lessThanOrEquals  IRI of property  cardinality 0..1 each

6  Logical Components
sh:not  IRI of sh:Shape  cardinality 0..1
sh:and|sh:or|sh:xone  RDF list of sh:Shape  cardinality 0..1 each

7  Shape-based Components
sh:node  IRI of NodeShape  cardinality 0..1
sh:property  IRI of PropertyShape  cardinality 0..1
sh:qualifiedValueShape  IRI of NodeShape  cardinality 0..1
sh:qualifiedMinCount|sh:qualifiedMaxCount  xsd:integer  cardinality 0..1 each

8  Other Components
sh:closed  xsd:boolean  cardinality 0..1
sh:ignoredProperties  RDF list of IRIs  cardinality 0..1
sh:hasValue  RDF term  cardinality 0..1
sh:in  RDF list of RDF terms  cardinality 0..1

9  Validation Report Structures
sh:ValidationReport  sh:conforms xsd:boolean; sh:result rdf:List of sh:ValidationResult
sh:ValidationResult  sh:focusNode; sh:resultPath; sh:value; sh:sourceShape; sh:sourceConstraintComponent; sh:detail; sh:resultMessage; sh:resultSeverity

## Original Source
RDF Graph Shape Validation Standards: SHACL & ShEx
https://www.w3.org/TR/shacl/

## Digest of CORE_CONSTRAINT_COMPONENTS

# Core Constraint Components

## 4.1 Value Type Constraint Components

- sh:class: IRI of required RDF class. Specifies allowed rdf:type values.
- sh:datatype: IRI of XML Schema datatype. Restricts literal value type.
- sh:nodeKind: IRI one of sh:IRI, sh:BlankNode, sh:Literal or sh:BlankNodeOrIRI. Specifies term kind.

## 4.2 Cardinality Constraint Components

- sh:minCount: xsd:integer ≥0. Minimum number of values.
- sh:maxCount: xsd:integer ≥0. Maximum number of values.

## 4.3 Value Range Constraint Components

- sh:minExclusive, sh:minInclusive, sh:maxExclusive, sh:maxInclusive: xsd:decimal, xsd:dateTime or xsd:string. Restrict numeric, date, or lexical ordering.

## 4.4 String-based Constraint Components

- sh:minLength, sh:maxLength: xsd:integer ≥0. Minimum or maximum string length.
- sh:pattern: xsd:string Regular expression anchored against lexical form.
- sh:languageIn: RDF list of BCP47 language tags.
- sh:uniqueLang: xsd:boolean true to enforce unique language tags.

## 4.5 Property Pair Constraint Components

- sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals: IRI of property. Compare values across properties.

## 4.6 Logical Constraint Components

- sh:not: sh:Shape. Negate shape.
- sh:and, sh:or: RDF list of sh:Shape. Logical conjunction or disjunction.
- sh:xone: RDF list of sh:Shape. Exactly one must validate.

## 4.7 Shape-based Constraint Components

- sh:node: IRI of NodeShape. Validates nodes against nested shape.
- sh:property: IRI of PropertyShape. Validates value nodes.
- sh:qualifiedValueShape: IRI of NodeShape; sh:qualifiedMinCount, sh:qualifiedMaxCount: xsd:integer.

## 4.8 Other Constraint Components

- sh:closed: xsd:boolean; sh:ignoredProperties: RDF list of IRIs. Prevent extra properties.
- sh:hasValue: RDF term. Require specific value.
- sh:in: RDF list of RDF terms. Enumerated allowed values.

# Validation Report Elements

- sh:ValidationReport: parameters sh:conforms xsd:boolean, sh:result rdf:List of sh:ValidationResult.
- sh:ValidationResult: parameters sh:focusNode IRI or literal, sh:resultPath IRI, sh:value RDF term, sh:sourceShape IRI, sh:sourceConstraintComponent IRI, sh:detail RDF list, sh:resultMessage rdf:langString, sh:resultSeverity sh:Severity.

## Attribution
- Source: RDF Graph Shape Validation Standards: SHACL & ShEx
- URL: https://www.w3.org/TR/shacl/
- License: License if known
- Crawl Date: 2025-04-29T19:49:24.742Z
- Data Size: 23040670 bytes
- Links Found: 182866

## Retrieved
2025-04-29
library/JSONLD11.md
# library/JSONLD11.md
# JSONLD11

## Crawl Summary
Keywords, context definition fields, IRI resolution rules, processing modes, data model nodes forms, processor API signatures, exceptions, configuration, best practices, and troubleshooting steps.

## Normalised Extract
Table of Contents
1. Syntax Tokens and Keywords
2. Context Definitions
3. IRI Resolution
4. Processing Modes
5. Data Model Structures
6. Algorithms Summary
7. API Methods
8. Errors
9. Configuration
10. Best Practices
11. Troubleshooting

1. Syntax Tokens and Keywords
- @context,@id,@type,@value,@list,@set,@language,@vocab,@base,@graph,@included,@reverse,@index,@nest,@direction,@version,@json,@none,@explicit
- Literal @version value: numeric 1.1

2. Context Definitions
TermDefinition:
  @id: IRI string
  @type: IRI
  @container: one of list,set,index,id,type,language
  @reverse: boolean
  @language: BCP47 code/null
  @direction: "ltr"|"rtl"|null
  @prefix: boolean
  @protected: boolean
Context value: IRI | map | array of contexts
Default vocabulary: @vocab: IRI|null
Base IRI from @base or doc URL

3. IRI Resolution
Expand IRI: RFC3986#5.2
Compact IRI: prefix:suffix where prefix term maps to IRI
Vocabulary-relative: @vocab+term

4. Processing Modes
json-ld-1.1 (default)
json-ld-1.0 disables 1.1 features; errors on numeric @version 1.1

5. Data Model Structures
NodeObject: map without @value,@list,@set or top-level only @graph
ValueObject: {"@value":literal, optional "@type"|"@language"|"@direction"}
ListObject: {"@list":array, optional "@index":string}
SetObject: {"@set":array, optional "@index":string}
GraphObject: {"@graph":array, optional "@id":IRI, "@index":string}

6. Algorithms Summary
expand(input,options): Promise<expandedDocuments>
compact(input,context,options): Promise<compactedDoc>
flatten(input,context?,options): Promise<flattenedDoc>
frame(input,frame,options): Promise<framedDoc>
toRDF(input,options): Promise<QuadMap>
fromRDF(quads,options): Promise<expandedDoc>

7. API Methods (complete signatures in referenceDetails)

8. Errors
InvalidContext, InvalidIRIMapping, UnresolvedPrefix, LoadingDocumentFailed, ProcessingModeMismatch

9. Configuration
options: {base?:string,documentLoader?:(iri)=>Promise<Document>,processingMode?:"json-ld-1.0"|"json-ld-1.1",expandContext?:any,compactToRelative?:boolean,skipExpansion?:boolean}

10. Best Practices
- Local context caching
- Explicit processingMode
- Frame for predictable structure
- Explicit @id for blank nodes

11. Troubleshooting
- CLI --trace
- Check CORS, MIME application/ld+json
- Log active context mid-process

## Supplementary Details
Context loading: defaultDocumentLoader fetches JSON-LD with fetch(), enforces Content-Type application/ld+json. documentLoader must return {documentUrl:string,document:Object}. Processing order: parse JSON, preprocess context, expand IRIs, term-scoped contexts, container processing, type coercion, list-setting, embedding, indexing, framing, normalization. Default options: base: input document URL, processingMode: json-ld-1.1, documentLoader: built-in loader. Context priority: local expansions override remote. Container processing order: @language, @index, @id, @type, @list, @set. Type coercion rules: if @type defined in term definition, coerce value to that datatype. Language direction: defaults to context baseDirection.

## Reference Details
// Example: expand
import { JSONLDProcessor } from 'jsonld';

const processor: JSONLDProcessor = require('jsonld');

(async ()=>{
  const expanded = await processor.expand(
    {"@context":"https://schema.org/","name":"Alice"},
    {
      base: 'https://example.com/',
      expandContext: { ex: 'https://example.com/' },
      documentLoader: async iri => {
        const res = await fetch(iri, {headers:{Accept:'application/ld+json'}});
        return {documentUrl: res.url, document: await res.json()};
      }
    }
  );
  console.log(expanded);
})();

// toRDF
const quads = await processor.toRDF(doc, {produceGeneralizedRdf:false});
quads.get('default').forEach(({subject,predicate,object,graph})=>{
  console.log(`${subject} ${predicate} ${object.value} .`);
});

// fromRDF
const jsonld = await processor.fromRDF(quads, {rdfDirection:'i18n-datatype'});

// CLI usage
jsonld expand --trace input.jsonld > expanded.jsonld
jsonld toRDF --format nquads input.jsonld > out.nq

// Best practice: local context hosting
const localLoader = (iri)=>{
  if(iri==='https://schema.org/') return Promise.resolve({documentUrl:iri,document: require('./schema.context.json')});
  return defaultDocumentLoader(iri);
};

// Troubleshooting commands
// 1. Verify JSON-LD version
grep 'json-ld' input.jsonld
// 2. Trace loading
jsonld expand --loader node --trace input.jsonld


## Information Dense Extract
@context:@context,@id,@type,@value,@list,@set,@language,@vocab,@base,@graph,@included,@reverse,@index,@nest,@direction,@version,@json,@none,@explicit;TermDefinition:{@id:IRI,@type:IRI,@container:(list,set,index,id,type,language),@reverse:boolean,@language:BCP47|null,@direction:ltr|rtl|null,@prefix:boolean,@protected:boolean};Context:Iri|Map|Array;DefaultVocab:@vocab:Iri|null;Base:@base|URL;IRIMode:RFC3986;Compact:prefix:suffix;Mode:json-ld-1.1|json-ld-1.0;Node:{!@value,!@list,!@set|only @graph};Value:{@value,optional(@type|@language|@direction)};List:{@list,@index?};Set:{@set,@index?};Graph:{@graph,@id?,@index?};expand(input,opts)->Promise any[];compact(input,ctx,opts)->Promise any;flatten(input,ctx?,opts)->Promise any;frame(input,frame,opts)->Promise any;toRDF(input,opts)->Promise Map<string,Quad[]>;fromRDF(quads,opts)->Promise any;Errors:InvalidContext,InvalidIRIMapping,UnresolvedPrefix,LoadingDocumentFailed,ProcessingModeMismatch;Opts:{base?:string,documentLoader?:(iri)=>Promise<{documentUrl,document}>,processingMode?,expandContext?,compactToRelative?,skipExpansion?};BestPractices:cache contexts,explicitMode,frame,explicitIds;Troubleshoot:--trace,CORS,MIME,logContext

## Sanitised Extract
Table of Contents
1. Syntax Tokens and Keywords
2. Context Definitions
3. IRI Resolution
4. Processing Modes
5. Data Model Structures
6. Algorithms Summary
7. API Methods
8. Errors
9. Configuration
10. Best Practices
11. Troubleshooting

1. Syntax Tokens and Keywords
- @context,@id,@type,@value,@list,@set,@language,@vocab,@base,@graph,@included,@reverse,@index,@nest,@direction,@version,@json,@none,@explicit
- Literal @version value: numeric 1.1

2. Context Definitions
TermDefinition:
  @id: IRI string
  @type: IRI
  @container: one of list,set,index,id,type,language
  @reverse: boolean
  @language: BCP47 code/null
  @direction: 'ltr'|'rtl'|null
  @prefix: boolean
  @protected: boolean
Context value: IRI | map | array of contexts
Default vocabulary: @vocab: IRI|null
Base IRI from @base or doc URL

3. IRI Resolution
Expand IRI: RFC3986#5.2
Compact IRI: prefix:suffix where prefix term maps to IRI
Vocabulary-relative: @vocab+term

4. Processing Modes
json-ld-1.1 (default)
json-ld-1.0 disables 1.1 features; errors on numeric @version 1.1

5. Data Model Structures
NodeObject: map without @value,@list,@set or top-level only @graph
ValueObject: {'@value':literal, optional '@type'|'@language'|'@direction'}
ListObject: {'@list':array, optional '@index':string}
SetObject: {'@set':array, optional '@index':string}
GraphObject: {'@graph':array, optional '@id':IRI, '@index':string}

6. Algorithms Summary
expand(input,options): Promise<expandedDocuments>
compact(input,context,options): Promise<compactedDoc>
flatten(input,context?,options): Promise<flattenedDoc>
frame(input,frame,options): Promise<framedDoc>
toRDF(input,options): Promise<QuadMap>
fromRDF(quads,options): Promise<expandedDoc>

7. API Methods (complete signatures in referenceDetails)

8. Errors
InvalidContext, InvalidIRIMapping, UnresolvedPrefix, LoadingDocumentFailed, ProcessingModeMismatch

9. Configuration
options: {base?:string,documentLoader?:(iri)=>Promise<Document>,processingMode?:'json-ld-1.0'|'json-ld-1.1',expandContext?:any,compactToRelative?:boolean,skipExpansion?:boolean}

10. Best Practices
- Local context caching
- Explicit processingMode
- Frame for predictable structure
- Explicit @id for blank nodes

11. Troubleshooting
- CLI --trace
- Check CORS, MIME application/ld+json
- Log active context mid-process

## Original Source
JSON-LD 1.1 Core & Processing Algorithms
https://www.w3.org/TR/json-ld11/

## Digest of JSONLD11

# JSON-LD 1.1 Recommendation (16 July 2020)

## 1. Syntax Tokens and Keywords

- Keywords: @context, @id, @type, @value, @list, @set, @language, @vocab, @base, @graph, @included, @reverse, @index, @nest, @direction, @version, @json, @none, @explicit
- Values: 1.1 (numeric), "json-ld-1.1" unsupported for @version in context

## 2. Context Definitions

- @context value types: IRI string, map of term definitions, array of contexts
- Term definition map fields: @id (IRI), @type (IRI), @container (@list,@set,@index,@id,@type,@language), @reverse (boolean), @language (BCP47 tag or null), @direction ("ltr","rtl",null), @nest (string key), @prefix (boolean), @protected (boolean)
- Default vocabulary: @vocab IRI or null
- Base IRI resolution: Use @base in context or document base location

## 3. IRI Resolution

- Expand relative IRI: resolution algorithm per RFC3986, section 5.2
- Compact IRI: prefix:suffix where prefix term maps to IRI+suffix
- Vocabulary-relative term: term expands to @vocab+term

## 4. Document Processing Modes

- json-ld-1.1: default
- json-ld-1.0: disable 1.1 features; error on 1.1 context usage

## 5. Data Model Structures

- Node object: map without @value,@list,@set or single top-level @graph
- Value object: map with @value, optional @type or @language or @direction
- List object: map with @list and optional @index
- Set object: map with @set and optional @index
- Graph object: map with @graph and optional @id,@index

## 6. Processing Algorithms

- Expand: produce expanded form
- Compact: require active context, produce compacted form
- Flatten: produce flat array of node objects
- Frame: apply frame document matching rules
- ToRDF: map to RDF dataset
- FromRDF: map RDF dataset to expanded JSON-LD

## 7. API Method Signatures

Interface JSONLDProcessor {
  expand(input          : any,
         options?       : {
           base?: string;
           expandContext?: any;
           processingMode?: "json-ld-1.0"|"json-ld-1.1";
           documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
         }
  ) : Promise<any[]>;

  compact(input          : any,
          context        : any,
          options?       : {
            base?: string;
            compactToRelative?: boolean;
            processingMode?: "json-ld-1.0"|"json-ld-1.1";
            documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
          }
  ) : Promise<any>;

  flatten(input          : any,
          context?       : any,
          options?       : {
            base?: string;
            processingMode?: "json-ld-1.0"|"json-ld-1.1";
            documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
          }
  ) : Promise<any>;

  frame(input          : any,
        frame             : any,
        options?          : {
          base?: string;
          compact?: boolean;
          embed?: boolean;
          explicit?: boolean;
          omitGraph?: boolean;
          pruneBlankNodeIdentifiers?: boolean;
          skipExpansion?: boolean;
          documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
        }
  ) : Promise<any>;

  toRDF(input          : any,
        options?       : {
          base?: string;
          produceGeneralizedRdf?: boolean;
          processingMode?: "json-ld-1.0"|"json-ld-1.1";
          documentLoader?: (iri:string)=>Promise<{documentUrl:string;document:any}>;
        }
  ) : Promise<Map<string,{subject:string;predicate:string;object:{value:string;type:string;datatype?:string;language?:string};graph?:string}[]>>;

  fromRDF(quads          : Map<string,{subject:string;predicate:string;object:{value:string;type:string;datatype?:string;language?:string};graph?:string}[]>,
          options         : {
            rdfDirection?: "i18n-datatype";
            processingMode?: "json-ld-1.0"|"json-ld-1.1";
          }
  ) : Promise<any>;
}

## 8. Errors and Exceptions

- InvalidContext: thrown when term definition malformed
- InvalidIRIMapping: invalid IRI expansion
- UnresolvedPrefix: compact IRI prefix not defined
- LoadingDocumentFailed: documentLoader rejected; includes error.url
- ProcessingModeMismatch: @version mismatch

## 9. Configuration Options

- documentLoader(iri): Promise resolving to {documentUrl,document}
- processingMode: "json-ld-1.0"|"json-ld-1.1" default json-ld-1.1
- base: string or document URL
- expandContext: JSON-LD context to apply before expansion
- compactToRelative: boolean default true
- skipExpansion: boolean default false

## 10. Best Practices

- Preload contexts locally to avoid network fetch
- Always set processingMode explicitly in security contexts
- Use framing to generate predictable document shape
- Manage blank nodes with explicit @id when preserving identity

## 11. Troubleshooting

- Use --trace option in CLI to log each algorithm step
- For document load failures, verify network CORS and server MIME type application/ld+json
- On expansion errors, print intermediate active context


## Attribution
- Source: JSON-LD 1.1 Core & Processing Algorithms
- URL: https://www.w3.org/TR/json-ld11/
- License: License if known
- Crawl Date: 2025-04-28T17:48:30.747Z
- Data Size: 13192003 bytes
- Links Found: 93583

## Retrieved
2025-04-28
library/HYDRA_CORE.md
# library/HYDRA_CORE.md
# HYDRA_CORE

## Crawl Summary
Namespace: http://www.w3.org/ns/hydra/core#, prefix hydra; Classes: hydra:Link for dereferenceable properties; hydra:Operation with required hydra:method and optional hydra:expects, hydra:returns, hydra:statusCode, hydra:expectsHeader, hydra:returnsHeader, hydra:description, hydra:title; hydra:ApiDocumentation with hydra:entrypoint, hydra:supportedClass, hydra:supportedProperty, hydra:possibleStatus; hydra:SupportedProperty with hydra:property, hydra:required, hydra:readable, hydra:writeable, hydra:supportedOperation; Collections: hydra:Collection with hydra:member, hydra:totalItems; hydra:PartialCollectionView with pagination IRIs; IriTemplate: hydra:template, hydra:variableMapping, hydra:variableRepresentation, hydra:resolveRelativeTo; Error handling: hydra:Status, hydra:Error, application/problem+json + Link header; Discovery via HTTP Link header rel hydra:apiDocumentation

## Normalised Extract
Table of Contents
1. Namespace and Context Configuration
2. Link Property Definition
3. Operation Definition and Usage
4. API Documentation Structure
5. Supported Properties and Operations
6. Collections and Paging
7. IRI Template Syntax and Expansion
8. Error and Status Handling
9. API Discovery via HTTP Headers

1. Namespace and Context Configuration
Iri: http://www.w3.org/ns/hydra/core#
prefix: hydra
JSON-LD Context Snippet:
  "hydra": "http://www.w3.org/ns/hydra/core#"

2. Link Property Definition
Property type: hydra:Link
Domain: any class defining a link property
Range: IRI
Client behavior: dereference the @id values
Context mapping:
  "comments": {"@id": "http://api.example.com/vocab#comments","@type":"hydra:Link"}

3. Operation Definition and Usage
Class: hydra:Operation
Required: hydra:method (value: GET|POST|PUT|DELETE|PATCH)
Optional:
  hydra:expects (IRI)
  hydra:returns (IRI)
  hydra:statusCode (xsd:integer)
  hydra:expectsHeader (xsd:string or JSON array)
  hydra:returnsHeader (xsd:string or JSON array)
  hydra:title (xsd:string)
  hydra:description (xsd:string)
Example:
  {"@type":"hydra:Operation","hydra:method":"POST","hydra:expects":"schema:Comment","hydra:returns":"schema:Comment","hydra:statusCode":201}

4. API Documentation Structure
Class: hydra:ApiDocumentation
Properties:
  hydra:title (string)
  hydra:description (string)
  hydra:entrypoint (IRI)
  hydra:supportedClass (hydra:Class array)
  hydra:supportedProperty (hydra:SupportedProperty array)
  hydra:possibleStatus (hydra:Status array)

5. Supported Properties and Operations
Class: hydra:SupportedProperty
Properties:
  hydra:property (IRI)
  hydra:required (boolean)
  hydra:readable (boolean)
  hydra:writeable (boolean)
  hydra:title (string)
  hydra:description (string)
  hydra:supportedOperation (hydra:Operation array)

6. Collections and Paging
hydra:Collection:
  hydra:member (IRI or object)
  hydra:totalItems (integer)
hydra:PartialCollectionView:
  hydra:first, hydra:next, hydra:previous, hydra:last (IRI of view)

7. IRI Template Syntax and Expansion
Class: hydra:IriTemplate
Properties:
  hydra:template (string) — default RFC6570
  hydra:variableMapping (hydra:IriTemplateMapping array)
  hydra:variableRepresentation (hydra:BasicRepresentation|hydra:ExplicitRepresentation)
  hydra:resolveRelativeTo (boolean)
Mapping:
  hydra:IriTemplateMapping:
    hydra:variable (string)
    hydra:property (IRI)
    hydra:required (boolean)

8. Error and Status Handling
Class: hydra:Status
Properties:
  hydra:statusCode (integer)
  hydra:title (string)
  hydra:description (string)
Class: hydra:Error (subclass of hydra:Status)
Response Content-Type: application/problem+json
Required Header: Link: <contextIRI>; rel="http://www.w3.org/ns/hydra/core#context"

9. API Discovery via HTTP Headers
Header:
  Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
Methods: GET or HEAD



## Supplementary Details
1. JSON-LD Context URL: https://www.w3.org/ns/hydra/context.jsonld (cacheable remote context).
2. Default Template Syntax: RFC6570 (level 1).
3. VariableRepresentation defaults:
   BasicRepresentation: lexical form, no escaping, no type/language.
   ExplicitRepresentation: "value"@lang or "value"^^datatypeIRI, no escaping.
4. HTTP Status codes mapping:
   200-299: Success, hydra:Status optional
   400-499: Client errors, use hydra:Error with application/problem+json.
   500-599: Server errors, use hydra:Error with subclass-specific details.
5. Discovery: API servers MUST include Link header on every response for continuous discoverability.
6. Clients SHOULD preload API documentation and re-fetch on errors to account for runtime changes.


## Reference Details
# Class: hydra:Operation
hydra:method (range: xsd:string)
hydra:expects (range: rdfs:Resource)
hydra:returns (range: rdfs:Resource)
hydra:statusCode (range: xsd:integer)
hydra:expectsHeader (range: rdf:Property or array)
hydra:returnsHeader (range: rdf:Property or array)
hydra:title (range: xsd:string)
hydra:description (range: xsd:string)

# Class: hydra:ApiDocumentation
hydra:title (xsd:string)
hydra:description (xsd:string)
hydra:entrypoint (IRI)
hydra:supportedClass (hydra:Class array)
hydra:supportedProperty (hydra:SupportedProperty array)
hydra:possibleStatus (hydra:Status array)

# Class: hydra:SupportedProperty
hydra:property (IRI) REQUIRED
hydra:required (xsd:boolean) DEFAULT false
hydra:readable (xsd:boolean) DEFAULT true
hydra:writeable (xsd:boolean) DEFAULT true
hydra:title (xsd:string) OPTIONAL
hydra:description (xsd:string) OPTIONAL
hydra:supportedOperation (hydra:Operation array)

# Class: hydra:Collection
hydra:member (IRI or object)
hydra:totalItems (xsd:integer) OPTIONAL

# Class: hydra:PartialCollectionView
hydra:first (IRI)
hydra:next (IRI)
hydra:previous (IRI)
hydra:last (IRI)

# Class: hydra:IriTemplate
hydra:template (xsd:string) REQUIRED
hydra:variableMapping (hydra:IriTemplateMapping array) REQUIRED
hydra:variableRepresentation (hydra:BasicRepresentation|hydra:ExplicitRepresentation) DEFAULT hydra:BasicRepresentation
hydra:resolveRelativeTo (xsd:boolean) DEFAULT false

# Class: hydra:IriTemplateMapping
hydra:variable (xsd:string) REQUIRED
hydra:property (IRI) REQUIRED
hydra:required (xsd:boolean) DEFAULT false

# Class: hydra:Status
hydra:statusCode (xsd:integer) REQUIRED
hydra:title (xsd:string) OPTIONAL
hydra:description (xsd:string) OPTIONAL

# Class: hydra:Error < hydra:Status
Use application/problem+json
Additional Header: Link: <contextIRI>; rel="http://www.w3.org/ns/hydra/core#context"

## Implementation Patterns
1. Define JSON-LD context once in API root response:
   {"@context":"https://www.w3.org/ns/hydra/context.jsonld"}
2. Template usage:
   {"search":{"@type":"hydra:TemplatedLink","hydra:template":"http://api.example.com/issues{?query}","hydra:variableMapping":[{"hydra:variable":"query","hydra:property":"hydra:freetextQuery","hydra:required":true}],"hydra:resolveRelativeTo":true}}
3. PartialCollectionView:
   {"@id":"http://api.example.com/issues?page=2","@type":"hydra:PartialCollectionView","hydra:first":"?page=1","hydra:last":"?page=10","hydra:next":"?page=3"}

## Best Practices
- Always use hydra:Link for dereferenceable IRIs.
- Use application/problem+json with Hydra Error context header.
- Re-fetch API documentation after error status codes to adapt to runtime changes.
- Use JSON-LD remote context URL for compact payloads.

## Troubleshooting Procedures
1. Missing Link header:
   Command: curl -I http://api.example.com
   Expect: Link: <http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
2. JSON-LD parsing errors:
   Command: jsonld-cli expand --input api-response.json
   Expected: Expanded JSON-LD with @id and @type for all hydra terms
3. Template expansion failures:
   Command: test code snippet expanding template in client library; verify resolved IRI matches expected pattern


## Information Dense Extract
hydra:Link marks properties with dereferenceable IRIs; hydra:Operation requires hydra:method {GET,POST,PUT,DELETE,PATCH}; optional expects/returns IRIs, statusCode integer, expectsHeader/returnsHeader strings; hydra:ApiDocumentation defines entrypoint, supportedClass, supportedProperty, possibleStatus; hydra:SupportedProperty defines property IRI, required:boolean (false), readable:boolean(true), writeable:boolean(true), supportedOperation operations; hydra:Collection uses member IRIs or objects, totalItems optional; hydra:PartialCollectionView uses first,next,previous,last IRIs; hydra:IriTemplate uses template string (RFC6570), variableMapping array mapping variable names to property IRIs with required flags; variableRepresentation defaults to BasicRepresentation, can be ExplicitRepresentation using "value"^^datatype or "value"@lang; hydra:Status defines statusCode integer; hydra:Error subclass for application/problem+json with context Link header; API discovery via HTTP Link header rel hydra:apiDocumentation; use remote JSON-LD context at https://www.w3.org/ns/hydra/context.jsonld

## Sanitised Extract
Table of Contents
1. Namespace and Context Configuration
2. Link Property Definition
3. Operation Definition and Usage
4. API Documentation Structure
5. Supported Properties and Operations
6. Collections and Paging
7. IRI Template Syntax and Expansion
8. Error and Status Handling
9. API Discovery via HTTP Headers

1. Namespace and Context Configuration
Iri: http://www.w3.org/ns/hydra/core#
prefix: hydra
JSON-LD Context Snippet:
  'hydra': 'http://www.w3.org/ns/hydra/core#'

2. Link Property Definition
Property type: hydra:Link
Domain: any class defining a link property
Range: IRI
Client behavior: dereference the @id values
Context mapping:
  'comments': {'@id': 'http://api.example.com/vocab#comments','@type':'hydra:Link'}

3. Operation Definition and Usage
Class: hydra:Operation
Required: hydra:method (value: GET|POST|PUT|DELETE|PATCH)
Optional:
  hydra:expects (IRI)
  hydra:returns (IRI)
  hydra:statusCode (xsd:integer)
  hydra:expectsHeader (xsd:string or JSON array)
  hydra:returnsHeader (xsd:string or JSON array)
  hydra:title (xsd:string)
  hydra:description (xsd:string)
Example:
  {'@type':'hydra:Operation','hydra:method':'POST','hydra:expects':'schema:Comment','hydra:returns':'schema:Comment','hydra:statusCode':201}

4. API Documentation Structure
Class: hydra:ApiDocumentation
Properties:
  hydra:title (string)
  hydra:description (string)
  hydra:entrypoint (IRI)
  hydra:supportedClass (hydra:Class array)
  hydra:supportedProperty (hydra:SupportedProperty array)
  hydra:possibleStatus (hydra:Status array)

5. Supported Properties and Operations
Class: hydra:SupportedProperty
Properties:
  hydra:property (IRI)
  hydra:required (boolean)
  hydra:readable (boolean)
  hydra:writeable (boolean)
  hydra:title (string)
  hydra:description (string)
  hydra:supportedOperation (hydra:Operation array)

6. Collections and Paging
hydra:Collection:
  hydra:member (IRI or object)
  hydra:totalItems (integer)
hydra:PartialCollectionView:
  hydra:first, hydra:next, hydra:previous, hydra:last (IRI of view)

7. IRI Template Syntax and Expansion
Class: hydra:IriTemplate
Properties:
  hydra:template (string)  default RFC6570
  hydra:variableMapping (hydra:IriTemplateMapping array)
  hydra:variableRepresentation (hydra:BasicRepresentation|hydra:ExplicitRepresentation)
  hydra:resolveRelativeTo (boolean)
Mapping:
  hydra:IriTemplateMapping:
    hydra:variable (string)
    hydra:property (IRI)
    hydra:required (boolean)

8. Error and Status Handling
Class: hydra:Status
Properties:
  hydra:statusCode (integer)
  hydra:title (string)
  hydra:description (string)
Class: hydra:Error (subclass of hydra:Status)
Response Content-Type: application/problem+json
Required Header: Link: <contextIRI>; rel='http://www.w3.org/ns/hydra/core#context'

9. API Discovery via HTTP Headers
Header:
  Link: <http://api.example.com/doc/>; rel='http://www.w3.org/ns/hydra/core#apiDocumentation'
Methods: GET or HEAD

## Original Source
Linked Data Best Practices & Hypermedia Vocabulary
https://www.hydra-cg.com/spec/latest/core/

## Digest of HYDRA_CORE

# Hydra Core Vocabulary

## Namespace and Prefix
- Hydr a Core Vocabulary IRI: http://www.w3.org/ns/hydra/core#
- Suggested JSON-LD prefix: hydra

## Class Definitions

### hydra:Link
- Purpose: Marks a property whose values are dereferenceable IRIs.
- Usage in JSON-LD context:
```json
{"hydra": "http://www.w3.org/ns/hydra/core#",
 "comments": {"@id": "http://api.example.com/vocab#comments","@type":"hydra:Link"}}
```
- Client behavior: Dereference values where property @type is hydra:Link.

### hydra:Operation
- Purpose: Describes HTTP interactions (verbs, inputs, outputs).
- Required property: hydra:method (MUST be one of GET, POST, PUT, DELETE, PATCH).
- Optional properties:
  - hydra:expects: IRI of expected class or datatype.
  - hydra:returns: IRI of returned class or datatype.
  - hydra:statusCode: integer HTTP status code hint.
  - hydra:expectsHeader, hydra:returnsHeader: IRI or array of header names.
  - hydra:description, hydra:title: human-readable.

```json
{"@type":"hydra:Operation",
 "hydra:method":"POST",
 "hydra:expects":"schema:Comment",
 "hydra:returns":"schema:Comment",
 "hydra:statusCode":201}
```

## ApiDocumentation

- Class: hydra:ApiDocumentation
- Properties:
  - hydra:title: string
  - hydra:description: string
  - hydra:entrypoint: IRI of the API root resource
  - hydra:supportedClass: array of documentation skeletons (hydra:Class)
  - hydra:supportedProperty: hydra:SupportedProperty records
  - hydra:possibleStatus: hydra:Status or subclass

```json
{"@id":"http://api.example.com/doc/",
 "@type":"hydra:ApiDocumentation",
 "hydra:entrypoint":"http://api.example.com/",
 "hydra:supportedClass":[ ... ]}
```

## SupportedProperty and SupportedOperation
- hydra:SupportedProperty:
  - hydra:property: IRI of the predicate
  - hydra:required: boolean
  - hydra:readable: boolean
  - hydra:writeable: boolean
  - hydra:description, hydra:title
  - hydra:supportedOperation: list of hydra:Operation

## Collections

### hydra:Collection
- hydra:member: IRI or inline object of collection members
- hydra:totalItems: integer (optional)

### hydra:PartialCollectionView
- hydra:first, hydra:last, hydra:next, hydra:previous: IRIs
- Each view is a hydra:PartialCollectionView linked to hydra:Collection

## IriTemplate and TemplatedLink

### hydra:IriTemplate
- hydra:template: URI template literal (default RFC6570)
- hydra:variableMapping: array of hydra:IriTemplateMapping
- hydra:variableRepresentation: hydra:BasicRepresentation or hydra:ExplicitRepresentation
- hydra:resolveRelativeTo: hydra:Link context flag

### hydra:IriTemplateMapping
- hydra:variable: name in template
- hydra:property: IRI of property supplying values
- hydra:required: boolean

## Error and Status
- hydra:Status:
  - hydra:statusCode: integer
  - hydra:title, hydra:description
- hydra:Error (subclass)
  - Serialization: application/problem+json
  - Must include Link header: rel="http://www.w3.org/ns/hydra/core#context"

## Discovery via Link Header
- Header: Link: <docIRI>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"
- Clients perform HTTP GET or HEAD on homepage


## Attribution
- Source: Linked Data Best Practices & Hypermedia Vocabulary
- URL: https://www.hydra-cg.com/spec/latest/core/
- License: License if known
- Crawl Date: 2025-04-29T14:52:39.320Z
- Data Size: 443961 bytes
- Links Found: 294

## Retrieved
2025-04-29
library/VITEST.md
# library/VITEST.md
# VITEST

## Crawl Summary
Installation npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest; Requires Vite >=5.0.0 Node >=18.0.0; File naming .test. .spec.; Test API import { test expect } from vitest; Default globs include **/*.{test,spec}.?(c|m)[jt]s?(x) exclude node_modules/** dist/**; Config file reuse vite.config.ts or create vitest.config.ts (supported extensions js mjs cjs ts cts mts); defineConfig({ test {...}}) CLI options include include exclude update watch environment globals pool threads forks reporters outputFile; Dependency install prompt skip with VITEST_SKIP_INSTALL_CHECKS=1; Workspaces via defineWorkspace with glob patterns or project objects

## Normalised Extract
Table of Contents

1 Installation Commands
2 Writing Tests
3 Configuration
4 Workspaces Support
5 CLI Options

1 Installation Commands
Install Vitest as dev dependency
Commands npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest
Prerequisites Vite >= 5.0.0 Node >= 18.0.0
Alternative using npx vitest

2 Writing Tests
Filename patterns *.test.* *.spec.*
Sum example function and test files
Test API import { test expect } from vitest
test signature test(name string fn()=>void|Promise)
Expect API methods toBe toEqual toContain toThrow
Package json scripts add "test": "vitest"
Run commands npm run test yarn test pnpm test bun run test

3 Configuration
By default Vitest reads vite.config.* to merge plugins aliases resolve
Override create vitest.config.ts or use CLI --config
Supported config file extensions js mjs cjs ts cts mts
Configuration entry defineConfig({ test options })
Key test options include
include string[] default ["**/*.{test,spec}.?(c|m)[jt]s?(x)"]
exclude string[] default ["**/node_modules/**" "**/dist/**" "**/.{idea,git,cache,temp}/**"]
includeSource string[] default []
globals boolean default false
environment string default node
pool string default forks
threads boolean default false
forks boolean default true
vmThreads boolean default false
vmForks boolean default false
update boolean default false
watch boolean default not CI
root string default project root
dir string default same as root
reporters builtin|string[] default ["default"]
outputFile string|Record default undefined
alias Record<string string>|Array patterns
deps.external (string|RegExp)[] default [/node_modules/]
deps.inline (string|RegExp)[] default []
deps.fallbackCJS boolean default false
deps.cacheDir string default node_modules/.vite
deps.optimizer.enabled boolean default false
deps.optimizer.include string[] default []
deps.optimizer.exclude string[] default []

Using mergeConfig(viteConfig defineConfig) to extend

4 Workspaces Support
File vitest.workspace.js ts json export defineWorkspace([...globs { test project config }])
Allows running multiple test projects in one process

5 CLI Options
--config path
--include pattern append to include
--exclude pattern append to exclude
-u --update update snapshots
-w --watch watch mode
--environment node jsdom happy-dom edge-runtime
--globals true|false
--port number
--https boolean or config file
--reporter default json html junit custom path
--outputFile path or map
--pool threads forks vmThreads vmForks

Disable auto install checks VITEST_SKIP_INSTALL_CHECKS=1

## Supplementary Details
Prerequisites Vite >=5.0.0 Node >=18.0.0
npx vitest execution fallback installs temp
Test file name matching rules default include glob array
CLI precedence flags override config for include exclude update watch
Configuration file load order vite.config.* -> vitest.config.* -> CLI --config
defineConfig from vitest/config returns normalized config object
mergeConfig merges Vite config and Vitest config preserving Vite settings
Workspaces define multiple test projects use defineWorkspace from vitest/config file
Environment override docblock or comment @vitest-environment <env> at top of test file
Automatic dependency install prompt disabled by environment variable
IDE integration VS Code extension adds run and debug code lenses


## Reference Details
API Signatures

import { test expect describe it beforeAll afterAll beforeEach afterEach vi } from vitest

test(name string callback Function) => void
describe(name string callback Function) => void
it alias for test
beforeAll callback Function => void
afterAll callback Function => void
beforeEach callback Function => void
afterEach callback Function => void
vi.mock(moduleId string factory? Function options? { virtual boolean }) => void
vi.spyOn(object any methodName string) =>SpyInstance

Expect API
import { expect } from vitest
expect<T>(value T) returns Matchers<T>
Matchers<T> methods
toBe(expected T) => void
toEqual(expected any) => void
toContain(item any) => void
toThrow(error? Error|string|RegExp) => void
... additional matchers from Jest compatibility

Configuration API
import { defineConfig mergeConfig configDefaults } from vitest/config

defineConfig(config VitestConfig) => VitestConfig
mergeConfig(baseConfig VitestConfig extendedConfig VitestConfig) => VitestConfig
configDefaults exclude patterns default array

VitestConfig.test options detailed in normalisedExtract

CLI Commands
vitest [options]
vitest run [options]
Options full list obtained via vitest --help includes above flags

Best Practices
Use single config file for Vite and Vitest declare test property inside defineConfig
Use include exclude patterns explicit to speed up discovery
Use threads pool for CPU bound tests fork pool for native modules
Use vmThreads for faster execution in sandbox with memoryLimit config
Use update and watch flags in CI and local workflows accordingly

Troubleshooting
Error matching test files no matches ensure patterns correct include glob includes path
Error require vs import enable interop by deps.interopDefault true
Snapshot mismatches run vitest -u update snapshots
Missing dependencies run vitest skip install checks variable VITEST_SKIP_INSTALL_CHECKS=1
Custom environment not found ensure package vitest-environment-custom installed and named vitest-environment-custom

Exact commands
npm run test
npm test
vitest --config ./vitest.config.ts --environment jsdom --watch



## Information Dense Extract
Install Vitest devDependency npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest Requires Vite>=5.0.0 Node>=18.0.0 ; Tests filenames match **/*.{test,spec}.?(c|m)[jt]s?(x) ; test(name,fn) expect API with toBe toEqual toContain toThrow ; Default include glob [**/*.{test,spec}.?(c|m)[jt]s?(x)] exclude [node_modules dist .{idea,git,cache,temp}] ; Config file hierarchy vite.config.* -> vitest.config.* -> CLI --config ; defineConfig({ test: { include exclude globals environment pool threads forks vmThreads vmForks watch update root dir reporters outputFile alias deps { external inline fallbackCJS cacheDir optimizer { enabled include exclude } } } }) ; mergeConfig(viteConfig, defineConfig({ test: {}})) ; Workspaces defineWorkspace([...globs|project]) ; CLI options flags --config --include --exclude -u -w --environment --globals --port --https --reporter --outputFile --pool ; Disable install checks VITEST_SKIP_INSTALL_CHECKS=1 ; API signatures test(name,fn) describe it beforeAll afterAll beforeEach afterEach vi.mock vi.spyOn ; Expect<T>(value).toBe().toEqual().toContain().toThrow() ; defineConfig, mergeConfig, configDefaults from vitest/config ; Pools threads forks vmThreads vmForks tradeoffs ; Troubleshooting patterns fix globs update snapshots --update skip install checks env var ensure custom env package

## Sanitised Extract
Table of Contents

1 Installation Commands
2 Writing Tests
3 Configuration
4 Workspaces Support
5 CLI Options

1 Installation Commands
Install Vitest as dev dependency
Commands npm install -D vitest yarn add -D vitest pnpm add -D vitest bun add -D vitest
Prerequisites Vite >= 5.0.0 Node >= 18.0.0
Alternative using npx vitest

2 Writing Tests
Filename patterns *.test.* *.spec.*
Sum example function and test files
Test API import { test expect } from vitest
test signature test(name string fn()=>void|Promise)
Expect API methods toBe toEqual toContain toThrow
Package json scripts add 'test': 'vitest'
Run commands npm run test yarn test pnpm test bun run test

3 Configuration
By default Vitest reads vite.config.* to merge plugins aliases resolve
Override create vitest.config.ts or use CLI --config
Supported config file extensions js mjs cjs ts cts mts
Configuration entry defineConfig({ test options })
Key test options include
include string[] default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
exclude string[] default ['**/node_modules/**' '**/dist/**' '**/.{idea,git,cache,temp}/**']
includeSource string[] default []
globals boolean default false
environment string default node
pool string default forks
threads boolean default false
forks boolean default true
vmThreads boolean default false
vmForks boolean default false
update boolean default false
watch boolean default not CI
root string default project root
dir string default same as root
reporters builtin|string[] default ['default']
outputFile string|Record default undefined
alias Record<string string>|Array patterns
deps.external (string|RegExp)[] default [/node_modules/]
deps.inline (string|RegExp)[] default []
deps.fallbackCJS boolean default false
deps.cacheDir string default node_modules/.vite
deps.optimizer.enabled boolean default false
deps.optimizer.include string[] default []
deps.optimizer.exclude string[] default []

Using mergeConfig(viteConfig defineConfig) to extend

4 Workspaces Support
File vitest.workspace.js ts json export defineWorkspace([...globs { test project config }])
Allows running multiple test projects in one process

5 CLI Options
--config path
--include pattern append to include
--exclude pattern append to exclude
-u --update update snapshots
-w --watch watch mode
--environment node jsdom happy-dom edge-runtime
--globals true|false
--port number
--https boolean or config file
--reporter default json html junit custom path
--outputFile path or map
--pool threads forks vmThreads vmForks

Disable auto install checks VITEST_SKIP_INSTALL_CHECKS=1

## Original Source
Node.js Core Modules, Fetch API & Vitest Testing Framework
https://vitest.dev/

## Digest of VITEST

# Getting Started

## Installation

Install Vitest as a dev dependency using npm yarn pnpm or bun

npm install -D vitest

yarn add -D vitest

pnpm add -D vitest

bun add -D vitest

Requirements Vite version >=5.0.0 Node version >=18.0.0

You can also run using npx vitest without installation

## Writing Tests

Filename conventions Tests must include .test. or .spec. in file name

Example sum.js

export function sum(a b) {
  return a + b
}

Example sum.test.js

import { test expect } from vitest
import { sum } from ./sum.js

test adds one plus two to equal three () => {
  expect(sum(1 2)).toBe(3)
}

Add to package json scripts section

"scripts": {
  "test": "vitest"
}

Run tests npm run test yarn test pnpm test bun run test

## Configuring Vitest

Vitest reads vite.config file by default to reuse Vite plugins resolve aliases and settings

To override create vitest.config.ts or pass --config CLI flag

Supported extensions .js .mjs .cjs .ts .cts .mts not .json

Use environment variable VITEST or defineConfig mode property to conditionally switch config based on mode test

### Using vitest/config

/// reference types vitest/config
import defineConfig from vitest config

export default defineConfig({
  test: {
    include ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude ["node_modules/**" "dist/**"],
    globals false,
    environment node,
    pool forks,
    threads true,
    watch false,
    update false,
    root ., dir ., reporters default,
    alias { react preact },
    deps {
      external [/node_modules/],
      inline [],
      fallbackCJS false,
      cacheDir node_modules/.vite,
      optimizer { enabled false include [] exclude [] }
    }
  }
})

### Merging Configs

import viteConfig from ./vite.config.mjs
import { mergeConfig defineConfig } from vitest/config

export default mergeConfig(viteConfig defineConfig({
  test { /* overrides */ }
}))

## Workspaces Support

Create vitest.workspace.js ts json file using defineWorkspace from vitest config

Export array of glob patterns config files or objects with test project properties name root environment setupFiles

## Command Line Interface

Default npm scripts test vitest coverage vitest run --coverage

Run once without watch vitest run

Common CLI options
--config <path>
--include <glob>
--exclude <glob> appended as exclude patterns
--environment <node jsdom happy-dom edge-runtime>
--globals true false
--update or -u
--watch or -w
--port number
--https boolean or https config
--reporter default json html junit
--outputFile path
--pool threads forks vmThreads vmForks

## Automatic Dependency Installation

Vitest prompts to install missing dependencies disable by setting VITEST_SKIP_INSTALL_CHECKS=1

## IDE Integrations

Official VS Code extension install from marketplace adds code lens test run debug

# Reference

Source Node.js Core Modules Fetch API & Vitest Testing Framework retrieved 2024-06-17
Data Size 27987677 bytes


## Attribution
- Source: Node.js Core Modules, Fetch API & Vitest Testing Framework
- URL: https://vitest.dev/
- License: License
- Crawl Date: 2025-04-27T17:48:27.112Z
- Data Size: 27987677 bytes
- Links Found: 22887

## Retrieved
2025-04-27
library/FUSEKI_SERVER.md
# library/FUSEKI_SERVER.md
# FUSEKI_SERVER

## Crawl Summary
Downloaded distributions (tar.gz, zip, WAR) with SHA512 and PGP. Maven artifacts org.apache.jena:jena-fuseki-main and jena-fuseki-ui at version 5.4.0. CLI options: --mem, --update, --port, --config, --shiro, --verbose. Docker image apache/jena-fuseki:5.4.0, run with -p 3030. Java embedding: FusekiServer API with create(), port(), add(), build(), start(). Configuration TTL Assembler: fuseki:server settings including port, services, dataset path, endpoint names. SPARQL endpoints: /{ds}/query, /update, Graph Store /{ds}/data with GET, PUT, POST, DELETE. Parameters: query, update, default-graph-uri, named-graph-uri. Shiro security: shiro.ini user and role definitions, URL patterns. Logging via --verbose and log4j2.xml. Troubleshooting commands for ports, locks, authentication, Java version, logs.

## Normalised Extract
Table of Contents:
1. Download and Installation
2. Maven Dependencies
3. CLI Start Options
4. Docker Deployment
5. Java Embedded Server API
6. Configuration Assembler File
7. SPARQL/Graph Store Endpoints
8. Shiro Security Setup
9. Logging Configuration
10. Troubleshooting Commands

1. Download and Installation
  Files:
    apache-jena-fuseki-5.4.0.tar.gz  SHA512 + PGP
    apache-jena-fuseki-5.4.0.zip     SHA512 + PGP
    jena-fuseki-war-5.4.0.war        SHA512 + PGP

2. Maven Dependencies
  Add:
    groupId: org.apache.jena
    artifactId: jena-fuseki-main
    version: 5.4.0
  UI:
    artifactId: jena-fuseki-ui

3. CLI Start Options
  --mem        In-memory dataset
  --update     Enable SPARQL Update
  --port=N     HTTP port
  --config=F   TTL assembler file
  --shiro=F    Shiro ini file
  --verbose    Debug logging

4. Docker Deployment
  docker pull apache/jena-fuseki:5.4.0
  docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0 --mem /ds

5. Java Embedded Server API
  Methods:
    FusekiServer.create():Builder
    Builder.port(int)
    Builder.add(String path, Dataset ds)
    Builder.build():FusekiServer
    FusekiServer.start():void
  Example:
    Dataset ds = TDB2Factory.connectDataset("/data");
    FusekiServer server = FusekiServer.create().port(3030).add("/ds", ds).build();
    server.start();

6. Configuration Assembler File
  Prefixes:
    fuseki: <http://jena.apache.org/fuseki#>
    ja:     <http://jena.hpl.hp.com/2005/11/Assembler#>
  Server definition:
    fuseki:port 3030
    fuseki:services [ fuseki:name, fuseki:dataset, serviceQuery, serviceUpdate, serviceReadGraphStore, serviceReadWriteGraphStore ]

7. SPARQL/Graph Store Endpoints
  /{ds}/query  GET/POST
    Params: query, default-graph-uri, named-graph-uri
    Content-Type: application/sparql-query, application/x-www-form-urlencoded
  /{ds}/update POST
    Param: update
  /{ds}/data   GET, PUT, POST, DELETE
    PUT replace, POST append, DELETE remove graph via ?graph=URI
    Content-Type: text/turtle, application/trig

8. Shiro Security Setup
  shiro.ini sections:
    [users]: user=pass,role
    [roles]: role=permission list
    [urls]: URL pattern=filters
  Example:
    /ds/query   = authc,roles[reader]
    /ds/update  = authc,roles[admin]

9. Logging Configuration
  Enable verbose: --verbose
  log4j2.xml:
    Logger name="org.apache.jena.fuseki" level="INFO"
    Root level="WARN"

10. Troubleshooting Commands
  lsof -i :3030
  kill <pid>
  tail -F fuseki.log
  rm dataset/*tdb.lock
  java -version (must be 17+)


## Supplementary Details
Installation: extract tar.gz or unzip to FUSEKI_HOME. Set environment FUSEKI_HOME. CLI scripts in $FUSEKI_HOME/fuseki-server. Require Java 17+ set in PATH.

Docker: mount host directory: -v /host/data:/data/ds. Example:
  docker run --rm -p 3030:3030 -v /host/data:/data/ds apache/jena-fuseki:5.4.0 --loc=/data/ds /ds

Embedded Java: include jena-fuseki-main and jena-fuseki-ui in classpath. Dataset creation: TDB2Factory.connectDataset(path) or DatasetFactory.createTxnMem().

Configuration TTL details:
  fuseki:dataset can be file path or jena:Dataset assembler object.
  serviceQuery default name 'query', serviceUpdate 'update', serviceReadGraphStore 'get', serviceReadWriteGraphStore 'data'.
  fuseki:shiroConfigFile path supports relative or absolute.

Shiro permissions:
  Authentication: 'authc', Authorization: 'roles[roleName]'.
  Default anon: /public = anon.

Logging:
  Place log4j2.xml in classpath or specify -Dlog4j.configurationFile=path.

Metrics: JMX support via --metrics flag. Exposes MBeans under org.apache.jena.fuseki.


## Reference Details
CLI Options:
--port <int>                 Default 3030
--config <file>              TTL assembler file path
--shiro <file>               Shiro ini file path
--mem                        Use in-memory dataset
--loc <directory>            Location for TDB2 dataset
--update                     Enable SPARQL Update
--verbose                    Verbose logging to console
--metrics                    Enable JMX metrics

Java API:
public final class FusekiServer {
  public static Builder create();
  public static Builder create(String configFile);
  public static class Builder {
    public Builder port(int port);
    public Builder add(String urlPattern, Dataset dataset);
    public Builder addServlet(String urlPattern, HttpServlet servlet);
    public Builder verboseLogging(boolean on);
    public Builder withShiroConfig(String shiroIniFile);
    public FusekiServer build();
  }
  public void start();
  public void stop();
  public boolean isRunning();
}

Dataset creation:
Dataset ds1 = TDB2Factory.connectDataset("path");
Dataset ds2 = DatasetFactory.createTxnMem();

Assembler config (TTL):
Service parameters:
  fuseki:name                    String (endpoint suffix)
  fuseki:dataset                 File path or assembler reference
  fuseki:serviceQuery            endpoint name
  fuseki:serviceUpdate           endpoint name
  fuseki:serviceReadGraphStore   endpoint name
  fuseki:serviceReadWriteGraphStore endpoint name

Shiro ini file grammar:
[users]
user = password,role1,role2
[roles]
role = permission[,permission]
[urls]
URLPattern = filterChainDefinition

Best Practices:
- Isolate each dataset in its own TDB2 folder.
- Use --loc for persistent storage over --mem.
- Secure update endpoint with Shiro roles.
- Enable metrics and monitor JMX MBeans.

Troubleshooting:
- Command: `lsof -iTCP:3030 -sTCP:LISTEN` Expected no output if port free.
- Lock files: `ls data/ds/*.tdb2.lock` remove stale files.
- Log level adjustment: add `-Dlog4j2.debug` to JVM options.
- Check SPARQL service: `curl -G 'http://localhost:3030/ds/query' --data-urlencode 'query=ASK{}'` Expected `true`.

## Information Dense Extract
Distributions: apache-jena-fuseki-5.4.0.{tar.gz,zip}, jena-fuseki-war-5.4.0.war; SHA512+PGP. Maven: org.apache.jena:jena-fuseki-main/UI:5.4.0. CLI: fuseki-server [--port N] [--config file] [--shiro file] [--mem] [--update] [--verbose] [--metrics]. Docker: apache/jena-fuseki:5.4.0 -p 3030:3030 --mem /ds. Java: FusekiServer.create().port(3030).add("/ds",Dataset).verboseLogging(true).withShiroConfig("shiro.ini").build().start(); TTL config: fuseki:port, fuseki:services(elements with fuseki:name, fuseki:dataset, serviceQuery, serviceUpdate, serviceReadGraphStore, serviceReadWriteGraphStore). Endpoints: /ds/query (GET/POST, params:query,default-graph-uri,named-graph-uri), /ds/update (POST, update param), /ds/data (GET/PUT/POST/DELETE, graph param, content-types: text/turtle,application/trig). Shiro: [users],[roles],[urls]. Logging: log4j2.xml Logger name="org.apache.jena.fuseki" level=INFO. Troubleshooting: lsof/killing port, remove .lock files, curl ASK{} returns true, Java17+ required.

## Sanitised Extract
Table of Contents:
1. Download and Installation
2. Maven Dependencies
3. CLI Start Options
4. Docker Deployment
5. Java Embedded Server API
6. Configuration Assembler File
7. SPARQL/Graph Store Endpoints
8. Shiro Security Setup
9. Logging Configuration
10. Troubleshooting Commands

1. Download and Installation
  Files:
    apache-jena-fuseki-5.4.0.tar.gz  SHA512 + PGP
    apache-jena-fuseki-5.4.0.zip     SHA512 + PGP
    jena-fuseki-war-5.4.0.war        SHA512 + PGP

2. Maven Dependencies
  Add:
    groupId: org.apache.jena
    artifactId: jena-fuseki-main
    version: 5.4.0
  UI:
    artifactId: jena-fuseki-ui

3. CLI Start Options
  --mem        In-memory dataset
  --update     Enable SPARQL Update
  --port=N     HTTP port
  --config=F   TTL assembler file
  --shiro=F    Shiro ini file
  --verbose    Debug logging

4. Docker Deployment
  docker pull apache/jena-fuseki:5.4.0
  docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0 --mem /ds

5. Java Embedded Server API
  Methods:
    FusekiServer.create():Builder
    Builder.port(int)
    Builder.add(String path, Dataset ds)
    Builder.build():FusekiServer
    FusekiServer.start():void
  Example:
    Dataset ds = TDB2Factory.connectDataset('/data');
    FusekiServer server = FusekiServer.create().port(3030).add('/ds', ds).build();
    server.start();

6. Configuration Assembler File
  Prefixes:
    fuseki: <http://jena.apache.org/fuseki#>
    ja:     <http://jena.hpl.hp.com/2005/11/Assembler#>
  Server definition:
    fuseki:port 3030
    fuseki:services [ fuseki:name, fuseki:dataset, serviceQuery, serviceUpdate, serviceReadGraphStore, serviceReadWriteGraphStore ]

7. SPARQL/Graph Store Endpoints
  /{ds}/query  GET/POST
    Params: query, default-graph-uri, named-graph-uri
    Content-Type: application/sparql-query, application/x-www-form-urlencoded
  /{ds}/update POST
    Param: update
  /{ds}/data   GET, PUT, POST, DELETE
    PUT replace, POST append, DELETE remove graph via ?graph=URI
    Content-Type: text/turtle, application/trig

8. Shiro Security Setup
  shiro.ini sections:
    [users]: user=pass,role
    [roles]: role=permission list
    [urls]: URL pattern=filters
  Example:
    /ds/query   = authc,roles[reader]
    /ds/update  = authc,roles[admin]

9. Logging Configuration
  Enable verbose: --verbose
  log4j2.xml:
    Logger name='org.apache.jena.fuseki' level='INFO'
    Root level='WARN'

10. Troubleshooting Commands
  lsof -i :3030
  kill <pid>
  tail -F fuseki.log
  rm dataset/*tdb.lock
  java -version (must be 17+)

## Original Source
SPARQL 1.1 & Graph Store Protocol
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_SERVER

# Download and Installation

Files:
- apache-jena-fuseki-5.4.0.tar.gz    SHA512: [checksum]    PGP Signature: [key]
- apache-jena-fuseki-5.4.0.zip       SHA512: [checksum]    PGP Signature: [key]
- jena-fuseki-war-5.4.0.war          SHA512: [checksum]    PGP Signature: [key]

# Maven Dependencies

Add to pom.xml:
```
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-main</artifactId>
  <version>5.4.0</version>
</dependency>
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-ui</artifactId>
  <version>5.4.0</version>
</dependency>
```

# Running Fuseki Server (CLI)

Commands:
```
# Run in-memory dataset with SPARQL query and update endpoints
./fuseki-server --mem --update /ds

# Custom port and config file
./fuseki-server --port=3030 --config=/path/to/config.ttl

# WAR deployment
java -jar jena-fuseki-war-5.4.0.war --port=8080
```

# Docker Deployment

```
docker pull apache/jena-fuseki:5.4.0
docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0 --mem /ds
```

# Embedded SPARQL Server (Java)

```java
import org.apache.jena.fuseki.main.FusekiServer;
import org.apache.jena.query.Dataset;
import org.apache.jena.tdb2.TDB2Factory;

Dataset dataset = TDB2Factory.connectDataset("/path/to/tdb2");
FusekiServer server = FusekiServer.create()
    .port(3030)
    .add("/ds", dataset)
    .build();
server.start();
```

# Fuseki Configuration File (TTL Assembler)

```ttl
@prefix fuseki:  <http://jena.apache.org/fuseki#>.
@prefix ja:      <http://jena.hpl.hp.com/2005/11/Assembler#>.
[] ja:loadClass "org.apache.jena.fuseki.Fuseki";
   fuseki:server
     [ fuseki:port 3030;
       fuseki:services (
         [ fuseki:name "ds";
           fuseki:dataset   "./data/ds";
           fuseki:serviceQuery       "query";
           fuseki:serviceUpdate      "update";
           fuseki:serviceReadGraphStore      "get";
           fuseki:serviceReadWriteGraphStore "data"
         ]
       )
     ].
```

# SPARQL and Graph Store Endpoints

- Query:     GET/POST  http://host:port/{dataset}/query
  - Params: query (SPARQL1.1), default-graph-uri, named-graph-uri
  - POST content-types: application/sparql-query, application/x-www-form-urlencoded

- Update:    POST      http://host:port/{dataset}/update
  - Params: update (SPARQL1.1 Update), same graph params

- GraphStore: /{dataset}/data
  - GET    returns default or named graph
  - PUT    replace graph, Content-Type: text/turtle, application/trig
  - POST   append
  - DELETE remove graph via ?graph=URI

# Security Configuration (Shiro)

shiro.ini:
```
[users]
admin = secret, admin
reader = readerPass, reader

[roles]
admin    = *
reader   = fuseki:query

[urls]
/ds/query   = authc, roles[reader]
/ds/update  = authc, roles[admin]
/**         = anon
```

Fuseki startup:
```
./fuseki-server --config=config.ttl --shiro=shiro.ini
```

# Logging and Monitoring

- Enable verbose logging: `--verbose`
- log4j2.xml example:
```
<Configuration>
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
    </Console>
  </Appenders>
  <Loggers>
    <Logger name="org.apache.jena.fuseki" level="INFO" additivity="false">
      <AppenderRef ref="Console"/>
    </Logger>
    <Root level="WARN">
      <AppenderRef ref="Console"/>
    </Root>
  </Loggers>
</Configuration>
```

# Troubleshooting

- Port in use: `lsof -i :3030` then `kill <pid>`
- Dataset lock errors: ensure no other process holds `--tdb.lock` files
- Authentication failure: check roles and permissions in shiro.ini
- Java version: require Java 17+  
- View logs: `tail -F fuseki.log`


## Attribution
- Source: SPARQL 1.1 & Graph Store Protocol
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License if known
- Crawl Date: 2025-04-28T19:49:13.457Z
- Data Size: 1153167 bytes
- Links Found: 3053

## Retrieved
2025-04-28

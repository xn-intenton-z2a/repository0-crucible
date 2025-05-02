# SPARQL_QUERY

## Crawl Summary
Defines SPARQL 1.1 query language syntax and semantics: prefix/base resolution, triple patterns with abbreviations, query variables ($?,), literal syntax (strings, language tags, datatypes, numeric shorthand), basic graph patterns, OPTIONAL, UNION, FILTER (regex, numeric, logical), property paths (/,^,*,+,?,|), assignments (BIND, VALUES), aggregates (COUNT,SUM,AVG,MIN,MAX,GROUP_CONCAT,SAMPLE), dataset clauses (FROM,FROM NAMED,GRAPH), query forms (SELECT,CONSTRUCT,ASK,DESCRIBE), solution modifiers (DISTINCT,REDUCED,ORDER BY,LIMIT,OFFSET), functions library (RDF term tests, string,numeric,datetime,hash), SPARQL algebra, grammar, conformance.

## Normalised Extract
Table of Contents
1 Prefixes and Base Resolution
2 Triple Pattern Abbreviations
3 Variables and Literals
4 Basic Graph Patterns, OPTIONAL, UNION
5 FILTER Expressions
6 Property Paths
7 Assignments (BIND, VALUES)
8 Aggregates and Grouping
9 Dataset and Graph Selection
10 Query Forms and Modifiers
11 Functions Library

1 Prefixes and Base Resolution
PREFIX <label>:<IRI>
BASE <IRI>
Relative IRI resolution: RFC3986 section 5.2 basic algorithm; no normalization.

2 Triple Pattern Abbreviations
Subject common: <s> <p1> o1; p2 o2.
Object list: <s> p o1,o2.
Blank nodes: [] yields _:bN; _:label constant; [p o; q v].

3 Variables and Literals
Variables: ?v or $v.
Literals:
  "str" or 'str'
  "str"@lang
  "lex"^^<IRI> or ^^prefix:local
  Numeric: integer, decimal, double, true/false.
  Multi-line: """ ... """.

4 Basic Graph Patterns, OPTIONAL, UNION
BGP: sequence of triple patterns.
OPTIONAL { pattern }
{ pat1 } UNION { pat2 }

5 FILTER Expressions
Numeric: (<,>,<=,>=,=,!=)
Logical: &&,||,!, IN(), NOT IN(), EXISTS(), NOT EXISTS().
regex(str,pattern,flags).

6 Property Paths
Concatenation: p1/p2
Inverse: ^p
Zero-or-more: p*
One-or-more: p+
Zero-or-one: p?
Alternatives: p1|p2

7 Assignments (BIND, VALUES)
BIND(expr AS ?v)
VALUES (?v1 ?v2) {(v11 v21) (v12 v22)}

8 Aggregates and Grouping
SELECT (COUNT(?v) AS ?c) WHERE{} GROUP BY ?g HAVING(condition)
Aggregates: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT, SAMPLE

9 Dataset and Graph Selection
FROM <graphIRI>
FROM NAMED <graphIRI>
GRAPH ?g { pattern }

10 Query Forms and Modifiers
SELECT [DISTINCT|REDUCED] ?vars WHERE { } [ORDER BY (?v|ASC(?v)|DESC(?v))] [LIMIT n] [OFFSET m]
CONSTRUCT { template } WHERE { }
ASK WHERE { }
DESCRIBE <IRI>+ WHERE { }

11 Functions Library
isIRI(arg): boolean
isBlank(arg): boolean
isLiteral(arg): boolean
isNumeric(arg): boolean
str(arg): xsd:string
lang(arg): language-tag
datatype(arg): IRI
IRI(str): IRI
BNODE(): blank node
STRDT(str,datatypeIRI): literal
STRLANG(str,lang): literal
UUID(): xsd:string
STRUUDI(): xsd:string
String functions: STRLEN(str): integer, SUBSTR(str,pos,len): string, UCASE(str): string, LCASE(str): string, STRSTARTS(str,pref): boolean, STRENDS(str,suf): boolean, CONTAINS(str,substr): boolean, STRBEFORE(str,substr): string, STRAFTER(str,substr): string, ENCODE_FOR_URI(str): string, CONCAT(str1,...): string, langMatches(tag,pattern): boolean, REGEX(str,pattern,flags): boolean, REPLACE(str,pattern,repl,flags): string
Numeric: abs(x): numeric, round(x): numeric, ceil(x): numeric, floor(x): numeric, RAND(): double
DateTime: now(): xsd:dateTime, year(dt): integer, month(dt): integer, day(dt): integer, hours(dt): integer, minutes(dt): integer, seconds(dt): decimal, timezone(dt): xsd:dayTimeDuration, tz(dt): xsd:string
Hash: MD5(str): hexBinary, SHA1(str): hexBinary, SHA256(str): hexBinary, SHA384(str): hexBinary, SHA512(str): hexBinary

## Supplementary Details
Implementation Steps:
1. Define PREFIX and BASE.
2. Construct WHERE clause with BGP.
3. Use abbreviations for compact patterns.
4. Apply OPTIONAL, UNION as needed.
5. Add FILTER with expressions or regex.
6. Use property paths for graph traversal.
7. Introduce BIND/VALUES for inline data.
8. Group results with GROUP BY and apply aggregates.
9. Specify source graphs via FROM, FROM NAMED, and GRAPH.
10. Select output form (SELECT, CONSTRUCT, ASK, DESCRIBE).
11. Modify solution sequence with ORDER BY, LIMIT, OFFSET.

Configuration Options:
- DISTINCT vs REDUCED: duplicate elimination.
- Order expressions: variable, ASC()/DESC().
- Limit: non-negative integer.
- Offset: non-negative integer.

Performance Best Practices:
- Restrict dataset sizes with FROM and named graphs.
- Use BIND over subqueries for computed values.
- Use property path alternatives sparingly.



## Reference Details
# API Specifications and Implementation Patterns

## A. SDK Method Signatures (Pseudo-Java/Python)

### executeSelect(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> ResultSet
Parameters:
  query: SPARQL SELECT query string
  dataset: optional default and named graphs
  parameters: bindings for parameterized queries
Return: ResultSet with getVariableBindings() -> List<Map<String,RDFTerm>>

### executeConstruct(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> Graph
Return: RDF graph

### executeAsk(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> Boolean

### executeDescribe(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> Graph


## B. Code Examples

### Java Example (Apache Jena)
Model model = FileManager.get().loadModel("data.ttl");
Query query = QueryFactory.create("PREFIX dc:<http://purl.org/dc/elements/1.1/> SELECT ?title WHERE { ?s dc:title ?title } ORDER BY ?title LIMIT 10");
try(QueryExecution qexec = QueryExecutionFactory.create(query, model)) {
  ResultSet rs = qexec.execSelect();
  while(rs.hasNext()) {
    QuerySolution sol = rs.nextSolution();
    System.out.println(sol.getLiteral("title").getString());
  }
}

### Python Example (RDFlib)
from rdflib import Graph
from rdflib.plugins.sparql.processor import prepareQuery

g = Graph()
 g.parse("data.ttl", format="turtle")
 q = prepareQuery(
     "PREFIX foaf:<http://xmlns.com/foaf/0.1/>\n"
     "SELECT ?name WHERE { ?s foaf:name ?name } ORDER BY ?name"
 )
 for row in g.query(q):
     print(row.name)

## C. Configuration Options
- queryTimeout: integer milliseconds (default 0 = no timeout)
- maxQueryDepth: integer (default 10)
- enablePropertyPaths: boolean (default true)
- defaultOrder: ASC

## D. Troubleshooting Procedures

### 1. Syntax Errors
Command: run query via CLI `sparql --query q.rq`
Expected: `ERROR: Syntax error at line X, column Y: unexpected token`
Action: verify prefix declarations, variable names, grammar compliance.

### 2. Performance Issues
Symptoms: query execution slow, high memory
Commands: ENABLE PROFILE
Expected: detailed operation cost breakdown
Action: add FILTER early, restrict GRAPH, use indexes.

### 3. Missing Results
Check: dataset default graph, FROM clauses.
Command: `sparql --query q.rq --data data.ttl --default-graph-uri <graphIRI>`
Expected: correct bindings.

## E. Best Practices
- Always declare PREFIX to shorten URIs.
- Use LIMIT and ORDER BY to paginate.
- Prefer BIND over nested SELECT for computed expressions.
- Use VALUES for small inline data sets.
- Use GRAPH to restrict queries to specific named graphs.



## Information Dense Extract
PREFIX,BASE: label->IRI, relative IRI resolution per RFC3986. Triple patterns: s p o; s p1 o1,p2 o2. Blank nodes: [],_:lbl,[p o;q v]. Variables: ?v,$v. Literals: "...",'...',@lang,^^<IRI>,integer,decimal,double,boolean. BGP: sequence of triple patterns. OPTIONAL{pat},{pat1}UNION{pat2}. FILTER: comparison,logical,IN,NOT IN,EXISTS,NOT EXISTS,regex(str,pat,flags). Property paths: p1/p2,^p,p*,p+,p?,p1|p2. BIND(expr AS ?v),VALUES(?v1?v2){(v11 v21)...}. Aggregates:COUNT,SUM,AVG,MIN,MAX,GROUP_CONCAT,SAMPLE; GROUP BY,HAVING. Dataset:FROM<iri>,FROM NAMED<iri>,GRAPH?g{pat}. Query forms:SELECT[DISTINCT|REDUCED]?varsWHERE{pat}[ORDER BY expr][LIMIT n][OFFSET m];CONSTRUCT{tpl}WHERE{pat};ASK;DESCRIBE. Functions: isIRI,isBlank,isLiteral,isNumeric,str,lang,datatype,IRI(),BNODE(),STRDT(),STRLANG(),UUID(),STRUUID(); STRLEN,SUBSTR,UCASE,LCASE,STRSTARTS,STRENDS,CONTAINS,STRBEFORE,STRAFTER,ENCODE_FOR_URI,CONCAT,langMatches,REGEX,REPLACE; abs,round,ceil,floor,RAND; now,year,month,day,hours,minutes,seconds,timezone,tz; MD5,SHA1,SHA256,SHA384,SHA512. Execution: executeSelect(query,dataset,params)->ResultSet; execConstruct->Graph; execAsk->Boolean; execDescribe->Graph. CLI debugging: syntax errors, profiling, dataset URIs. Defaults: queryTimeout=0,maxQueryDepth=10,enablePropertyPaths=true,defaultOrder=ASC.

## Sanitised Extract
Table of Contents
1 Prefixes and Base Resolution
2 Triple Pattern Abbreviations
3 Variables and Literals
4 Basic Graph Patterns, OPTIONAL, UNION
5 FILTER Expressions
6 Property Paths
7 Assignments (BIND, VALUES)
8 Aggregates and Grouping
9 Dataset and Graph Selection
10 Query Forms and Modifiers
11 Functions Library

1 Prefixes and Base Resolution
PREFIX <label>:<IRI>
BASE <IRI>
Relative IRI resolution: RFC3986 section 5.2 basic algorithm; no normalization.

2 Triple Pattern Abbreviations
Subject common: <s> <p1> o1; p2 o2.
Object list: <s> p o1,o2.
Blank nodes: [] yields _:bN; _:label constant; [p o; q v].

3 Variables and Literals
Variables: ?v or $v.
Literals:
  'str' or 'str'
  'str'@lang
  'lex'^^<IRI> or ^^prefix:local
  Numeric: integer, decimal, double, true/false.
  Multi-line: ''' ... '''.

4 Basic Graph Patterns, OPTIONAL, UNION
BGP: sequence of triple patterns.
OPTIONAL { pattern }
{ pat1 } UNION { pat2 }

5 FILTER Expressions
Numeric: (<,>,<=,>=,=,!=)
Logical: &&,||,!, IN(), NOT IN(), EXISTS(), NOT EXISTS().
regex(str,pattern,flags).

6 Property Paths
Concatenation: p1/p2
Inverse: ^p
Zero-or-more: p*
One-or-more: p+
Zero-or-one: p?
Alternatives: p1|p2

7 Assignments (BIND, VALUES)
BIND(expr AS ?v)
VALUES (?v1 ?v2) {(v11 v21) (v12 v22)}

8 Aggregates and Grouping
SELECT (COUNT(?v) AS ?c) WHERE{} GROUP BY ?g HAVING(condition)
Aggregates: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT, SAMPLE

9 Dataset and Graph Selection
FROM <graphIRI>
FROM NAMED <graphIRI>
GRAPH ?g { pattern }

10 Query Forms and Modifiers
SELECT [DISTINCT|REDUCED] ?vars WHERE { } [ORDER BY (?v|ASC(?v)|DESC(?v))] [LIMIT n] [OFFSET m]
CONSTRUCT { template } WHERE { }
ASK WHERE { }
DESCRIBE <IRI>+ WHERE { }

11 Functions Library
isIRI(arg): boolean
isBlank(arg): boolean
isLiteral(arg): boolean
isNumeric(arg): boolean
str(arg): xsd:string
lang(arg): language-tag
datatype(arg): IRI
IRI(str): IRI
BNODE(): blank node
STRDT(str,datatypeIRI): literal
STRLANG(str,lang): literal
UUID(): xsd:string
STRUUDI(): xsd:string
String functions: STRLEN(str): integer, SUBSTR(str,pos,len): string, UCASE(str): string, LCASE(str): string, STRSTARTS(str,pref): boolean, STRENDS(str,suf): boolean, CONTAINS(str,substr): boolean, STRBEFORE(str,substr): string, STRAFTER(str,substr): string, ENCODE_FOR_URI(str): string, CONCAT(str1,...): string, langMatches(tag,pattern): boolean, REGEX(str,pattern,flags): boolean, REPLACE(str,pattern,repl,flags): string
Numeric: abs(x): numeric, round(x): numeric, ceil(x): numeric, floor(x): numeric, RAND(): double
DateTime: now(): xsd:dateTime, year(dt): integer, month(dt): integer, day(dt): integer, hours(dt): integer, minutes(dt): integer, seconds(dt): decimal, timezone(dt): xsd:dayTimeDuration, tz(dt): xsd:string
Hash: MD5(str): hexBinary, SHA1(str): hexBinary, SHA256(str): hexBinary, SHA384(str): hexBinary, SHA512(str): hexBinary

## Original Source
SPARQL 1.1 Query Language
https://www.w3.org/TR/sparql11-query/

## Digest of SPARQL_QUERY

# SPARQL 1.1 Query Language (W3C Recommendation 21 March 2013)
Date Retrieved: 2024-06-05

## 1 Introduction
RDF represents data as directed labeled graph. SPARQL defines syntax and semantics to query RDF: basic graph patterns, OPTIONAL, UNION, FILTER, GROUP BY, ORDER BY, subqueries, property paths, negation (MINUS, NOT EXISTS), assignments (BIND, VALUES), aggregates, dataset specification (FROM, FROM NAMED), query forms (SELECT, CONSTRUCT, ASK, DESCRIBE), solution modifiers (DISTINCT, REDUCED, LIMIT, OFFSET), functions on RDF terms, numerics, strings, dates, hash, extensible value testing, SPARQL algebra, grammar, conformance.

## 2 Key Syntax & Semantics

### 2.1 Prefixes & Base
PREFIX <label>: <IRI>
BASE <IRI>
Relative IRIs resolved per RFC3986 (no normalization steps).

### 2.2 Triple Pattern Syntax
A triple pattern: subject predicate object. Abbreviations:
- Predicate-object list: `<s> <p1> <o1>; <p2> <o2>.`
- Object list: `<s> <p> <o1>,<o2>.`
- Blank node: `[]` or `_:label` or `[p o; q v]`.

### 2.3 Query Variables
Syntax: `?var` or `$var` (identical semantics).

### 2.4 Literals
- String: `"..."`, `"""..."""`.
- Language-tag: `"text"@lang`.
- Typed: `"lex"^^<datatypeIRI>` or `"lex"^^prefix:local`.
- Numeric shorthand: integer, decimal, double, boolean.

### 2.5 Basic Graph Pattern (BGP)
List of triple patterns in WHERE.

### 2.6 Optional & Union
- OPTIONAL { pattern }
- { pattern1 } UNION { pattern2 }

### 2.7 Filters
FILTER expressions: numeric comparisons, logical, regex, EXISTS/NOT EXISTS, IN, NOT IN.
Flags: case-insensitive `regex("str","pat","i")`.

### 2.8 Property Paths
Syntax: `<p1>/<p2>`, `^<p>`, `<p>*`, `<p>+`, `<p>?`, `<p1>|<p2>`.

### 2.9 Assignments
- BIND(expression AS ?var)
- VALUES (?v1 ?v2) { (val1 val2) … }

### 2.10 Aggregates
COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT, SAMPLE.
GROUP BY, HAVING.

### 2.11 Dataset
FROM <graphIRI>, FROM NAMED <graphIRI>
GRAPH ?g { pattern }

### 2.12 Query Forms
SELECT [DISTINCT|REDUCED] ?vars WHERE { … } [ORDER BY …] [LIMIT n] [OFFSET m]
CONSTRUCT { template } WHERE { … }
ASK WHERE { … }
DESCRIBE IRI-list WHERE { … }

### 2.13 Functions
**RDF Terms**: isIRI, isBlank, isLiteral, isNumeric, str, lang, datatype, IRI(), BNODE(), STRDT(), STRLANG(), UUID(), STRUUID()
**Strings**: STRLEN, SUBSTR, UCASE, LCASE, STRSTARTS, STRENDS, CONTAINS, STRBEFORE, STRAFTER, ENCODE_FOR_URI, CONCAT, langMatches, REGEX, REPLACE
**Numerics**: abs, round, ceil, floor, RAND
**DateTime**: now, year, month, day, hours, minutes, seconds, timezone, tz
**Hash**: MD5, SHA1, SHA256, SHA384, SHA512

## 3 Grammar & Conformance
EBNF grammar in section 19. Conformance in section 20.



## Attribution
- Source: SPARQL 1.1 Query Language
- URL: https://www.w3.org/TR/sparql11-query/
- License: License: Royalty-Free W3C Recommendation
- Crawl Date: 2025-05-02T01:04:26.204Z
- Data Size: 87957753 bytes
- Links Found: 96214

## Retrieved
2025-05-02

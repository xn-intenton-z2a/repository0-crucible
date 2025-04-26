# SPARQL_SYNTAX

## Crawl Summary
PREFIX and BASE directives define namespace and base IRI resolution. Variables marked with ? or $. IRIs: IRIREF <...>, prefixed names prefix:local resolved by concatenation. Literals: quoted strings, language-tagged, typed with ^^, numeric shortcuts for xsd:integer, xsd:decimal, xsd:double, booleans. Blank nodes: _:label or []. Triple patterns support ';' for predicate-object lists and ',' for multiple objects. Query forms: SELECT, CONSTRUCT, ASK, DESCRIBE with concrete grammar productions. FILTER expressions include regex, numeric comparisons, logical ops, built-in functions (str, lang, datatype, sameTerm, bound, isIRI, isBlank, isLiteral, numeric, string, date/time, hash).

## Normalised Extract
Table of Contents:
1. PREFIX and BASE directives
2. IRIs and Prefixed Names
3. Variables
4. Literals
5. Blank Nodes
6. Triple Patterns
7. Query Forms
8. FILTER expressions and functions

1. PREFIX and BASE directives
   Syntax:
     PREFIX prefix_label: <IRI>
     BASE <IRI>
   Effect: maps prefix_label to IRI; resolves relative IRIs against BASE using RFC3986 §5.1.1 basic algorithm.

2. IRIs and Prefixed Names
   IRIREF: '<' IRI_chars '>'
   Prefixed names:
     PNAME_NS: prefix_label ':'
     PNAME_LN: prefix_label ':' local_part
   Resolution: IRI = prefix_binding + unescaped(local_part).

3. Variables
   Var ::= '?' VarName | '$' VarName
   VarName matches regex [A-Za-z_][A-Za-z0-9_]*

4. Literals
   StringLiteralQuote  ::= '...' | "..."
   Language-tag: StringLiteralQuote '@' lang_tag (BCP47)
   Typed: StringLiteralQuote '^^' (IRIREF | PNAME_LN)
   Numeric:
     INTEGER ::= digit+ => xsd:integer
     DECIMAL ::= digit* '.' digit+ => xsd:decimal
     DOUBLE ::= (digit+ '.'? digit* | '.' digit+) exponent => xsd:double
   BooleanLiteral ::= 'true' | 'false' => xsd:boolean
   Long strings: triple single or double quotes multiline text.

5. Blank Nodes
   Label: '_:' label (label regex [A-Za-z][A-Za-z0-9]*)
   Anonymous: '[]' allocates unique blank node per occurrence.
   Property list: '[ pred1 obj1 ; pred2 obj2 ]' allocates one blank node used as subject for both pred=obj pairs.

6. Triple Patterns
   Basic: subject predicate object '.'
   Predicate-object list: 's p1 o1 ; p2 o2 .'
   Object list: 's p o1 , o2 .'

7. Query Forms
   SELECT:
     SELECT [DISTINCT | REDUCED]? (VarOrStar)+
     WHERE { GroupGraphPattern }
     OrderClause? LimitOffset?
   CONSTRUCT:
     CONSTRUCT { ConstructTemplate }
     WHERE { GroupGraphPattern }
     SolutionModifier?
   ASK:
     ASK WHERE { GroupGraphPattern }
   DESCRIBE:
     DESCRIBE (VarOrIRI)+ WHERE? { GroupGraphPattern? }

8. FILTER expressions and functions
   FILTER operators: =, !=, <, <=, >, >=, &&, ||, !
   Built-in functions:
     RDF term: isIRI(x), isBlank(x), isLiteral(x), sameTerm(x,y), str(x), lang(x), datatype(x)
     Numeric: abs(x), round(x), ceil(x), floor(x), rand()
     String: STRLEN(x), SUBSTR(x,pos,len), UCASE(x), LCASE(x), STRSTARTS(x,p), STRENDS(x,p), CONTAINS(x,p), STRBEFORE(x,p), STRAFTER(x,p), ENCODE_FOR_URI(x), CONCAT(x1,...), STRLANG(x,lang), STRDT(x,datatype), REGEX(x,pattern,flags), REPLACE(x,pattern,repl,flags)
     Date/time: now(), year(x), month(x), day(x), hours(x), minutes(x), seconds(x), timezone(x), tz(x)
     Hash: MD5(x), SHA1(x), SHA256(x), SHA384(x), SHA512(x)


## Supplementary Details
- Base IRI resolution: only basic algorithm (no normalization), per RFC3986 §5.2.
- Prefix labels and local names allow backslash escapes: e.g. ns:id\=123 maps to 'http://example.org/ns#id=123'.
- Default datatypes:
    integer literal => xsd:integer
    decimal => xsd:decimal
    double => xsd:double
    true/false => xsd:boolean
- Wildcard '*' in SELECT returns all bound variables.
- DISTINCT eliminates duplicate solution mappings; REDUCED offers weaker duplicate elimination.
- ORDER BY accepts expressions: e.g. ORDER BY DESC(?price), then LIMIT, OFFSET apply to final solution sequence.
- BIND(expr AS ?var) introduces new variable in same GroupGraphPattern scope.
- VALUES clause syntax:
    VALUES (?v1 ?v2) { ( "a" 1 ) ( "b" 2 ) }
- CONSTRUCT templates may include blank nodes with _:label; labels local to template and results.
- HTTP query endpoint headers:
    Content-Type: application/sparql-query
    Accept: application/sparql-results+json or application/rdf+xml


## Reference Details
1. Grammar Productions:
  PREFIXDecl       ::= 'PREFIX' PNAME_NS IRIREF
  BaseDecl         ::= 'BASE' IRIREF
  VarOrStar        ::= '*' | Var
  Var              ::= '?' VarName | '$' VarName
  IRIREF           ::= '<' ([^#x00-#x20<>\"{}|^`])* '>'
  PNAME_NS         ::= PN_PREFIX? ':'
  PNAME_LN         ::= PN_PREFIX ':' PN_LOCAL
  INTEGER          ::= [0-9]+
  DECIMAL          ::= ([0-9]* '.' [0-9]+)
  DOUBLE           ::= (([0-9]+ '.' [0-9]* | '.' [0-9]+) [eE][+-]?[0-9]+)
  BooleanLiteral   ::= 'true' | 'false'
  StringLiteral1   ::= '"' (StringChar1)* '"'
  StringLiteral2   ::= "'" (StringChar2)* "'"
  TriplePattern    ::= VarOrTerm VarOrTerm VarOrTerm '.'

2. Code Examples:
-- Simple SELECT
PREFIX dc: <http://purl.org/dc/elements/1.1/>
SELECT DISTINCT ?title
WHERE { <http://example.org/book1> dc:title ?title }
ORDER BY ?title
LIMIT 10

-- CONSTRUCT template
PREFIX org: <http://example.com/ns#>
CONSTRUCT { ?x foaf:name ?name }
WHERE { ?x org:employeeName ?name }

-- ASK for existence
ASK WHERE { GRAPH <http://example.org/graph> { ?s ?p ?o } }

-- DESCRIBE resource
DESCRIBE <http://example.org/book1>

3. Configuration Options:
- SPARQL endpoint URL; accept headers; timeout via HTTP parameter `timeout` (milliseconds).
- Maximum LIMIT default 10000; configurable by endpoint.
- Query language version HTTP header `Accept-Datetime: Tue, 21 Mar 2013 02:22:56 GMT`

4. Best Practices:
- Always declare PREFIX for every namespace used.
- Use explicit base or fully qualified IRIs in reusable queries.
- Use BIND to compute expressions and reduce repeated function calls.
- Use VALUES for small inline data instead of multiple UNION patterns.
- Use DISTINCT when duplicate elimination is required; use REDUCED to hint endpoint.

5. Troubleshooting:
- Syntax errors: unclosed '<' or '"', unbalanced braces; error location returned by endpoint.
- Unknown prefix: HTTP 400; ensure PREFIXDecl present.
- Data type mismatch in FILTER: use str() to convert literal to string.
- Query timeout: endpoint-specific timeout exceeded; increase via `timeout` parameter or split query.
- HTTP errors:
    curl -X POST -H "Content-Type: application/sparql-query" --data-binary @q.sparql http://endpoint/sparql -D headers.txt
    expect HTTP/1.1 200 OK and Content-Type per Accept header


## Information Dense Extract
PREFIXDecl: PREFIX PNAME_NS IRIREF; BaseDecl: BASE IRIREF; Var: '?'|'$' VarName; VarOrStar: Var | '*'; iri: IRIREF|PNAME_LN; Literal: StringLiteral ('@' lang)? | '^^' IRIREF or PNAME_LN | INTEGER->xsd:integer | DECIMAL->xsd:decimal | DOUBLE->xsd:double | BooleanLiteral->xsd:boolean; BlankNode: '_:label' or '[]' or '[' PropList ']'; TriplePattern: s p o '.' with ';' for multi-p, ',' for multi-o; Query: Prologue? (SelectQuery | ConstructQuery | AskQuery | DescribeQuery) SolutionModifier?; SelectQuery: SELECT [DISTINCT|REDUCED]? (VarOrStar)+ WHERE GroupGraphPattern; ConstructQuery: CONSTRUCT ConstructTemplate WHERE GroupGraphPattern; AskQuery: ASK WHERE GroupGraphPattern; DescribeQuery: DESCRIBE (VarOrIRI)+ WHERE? GroupGraphPattern?; GroupGraphPattern: '{' TriplesBlock? '}' with FILTER and BIND; Filter: FILTER Constraint; Constraint: BuiltInCall | '(' Expression ')'; Functions: regex, str, lang, datatype, sameTerm, bound, isIRI, isBlank, isLiteral, numeric ops, string ops, date/time ops, hash; SolutionModifier: OrderClause? Limit? Offset?; OrderClause: ORDER BY (ASCdes)? Expression; Limit: LIMIT INTEGER; Offset: OFFSET INTEGER; ConstructTemplate: '{' TriplesSameSubject* '}'; ValuesBlock: VALUES (VarList) '{' (ValuesRow)+ '}' ; ValuesRow: '(' (rdfTerm | 'UNDEF')* ')' ; Serialization examples: SELECT ... -> JSON, XML, CSV; CONSTRUCT -> RDF/XML, Turtle; HTTP: Content-Type application/sparql-query; Accept application/sparql-results+json, application/rdf+xml; Timeout HTTP param; Prefix mapping escapes: '\u' Unicode, '\' for localName escapes; Blank node label scope: per result set or result graph; BASE resolution no normalization; BACKSLASH in local parts unescaped at resolution time; END

## Sanitised Extract
Table of Contents:
1. PREFIX and BASE directives
2. IRIs and Prefixed Names
3. Variables
4. Literals
5. Blank Nodes
6. Triple Patterns
7. Query Forms
8. FILTER expressions and functions

1. PREFIX and BASE directives
   Syntax:
     PREFIX prefix_label: <IRI>
     BASE <IRI>
   Effect: maps prefix_label to IRI; resolves relative IRIs against BASE using RFC3986 5.1.1 basic algorithm.

2. IRIs and Prefixed Names
   IRIREF: '<' IRI_chars '>'
   Prefixed names:
     PNAME_NS: prefix_label ':'
     PNAME_LN: prefix_label ':' local_part
   Resolution: IRI = prefix_binding + unescaped(local_part).

3. Variables
   Var ::= '?' VarName | '$' VarName
   VarName matches regex [A-Za-z_][A-Za-z0-9_]*

4. Literals
   StringLiteralQuote  ::= '...' | '...'
   Language-tag: StringLiteralQuote '@' lang_tag (BCP47)
   Typed: StringLiteralQuote '^^' (IRIREF | PNAME_LN)
   Numeric:
     INTEGER ::= digit+ => xsd:integer
     DECIMAL ::= digit* '.' digit+ => xsd:decimal
     DOUBLE ::= (digit+ '.'? digit* | '.' digit+) exponent => xsd:double
   BooleanLiteral ::= 'true' | 'false' => xsd:boolean
   Long strings: triple single or double quotes multiline text.

5. Blank Nodes
   Label: '_:' label (label regex [A-Za-z][A-Za-z0-9]*)
   Anonymous: '[]' allocates unique blank node per occurrence.
   Property list: '[ pred1 obj1 ; pred2 obj2 ]' allocates one blank node used as subject for both pred=obj pairs.

6. Triple Patterns
   Basic: subject predicate object '.'
   Predicate-object list: 's p1 o1 ; p2 o2 .'
   Object list: 's p o1 , o2 .'

7. Query Forms
   SELECT:
     SELECT [DISTINCT | REDUCED]? (VarOrStar)+
     WHERE { GroupGraphPattern }
     OrderClause? LimitOffset?
   CONSTRUCT:
     CONSTRUCT { ConstructTemplate }
     WHERE { GroupGraphPattern }
     SolutionModifier?
   ASK:
     ASK WHERE { GroupGraphPattern }
   DESCRIBE:
     DESCRIBE (VarOrIRI)+ WHERE? { GroupGraphPattern? }

8. FILTER expressions and functions
   FILTER operators: =, !=, <, <=, >, >=, &&, ||, !
   Built-in functions:
     RDF term: isIRI(x), isBlank(x), isLiteral(x), sameTerm(x,y), str(x), lang(x), datatype(x)
     Numeric: abs(x), round(x), ceil(x), floor(x), rand()
     String: STRLEN(x), SUBSTR(x,pos,len), UCASE(x), LCASE(x), STRSTARTS(x,p), STRENDS(x,p), CONTAINS(x,p), STRBEFORE(x,p), STRAFTER(x,p), ENCODE_FOR_URI(x), CONCAT(x1,...), STRLANG(x,lang), STRDT(x,datatype), REGEX(x,pattern,flags), REPLACE(x,pattern,repl,flags)
     Date/time: now(), year(x), month(x), day(x), hours(x), minutes(x), seconds(x), timezone(x), tz(x)
     Hash: MD5(x), SHA1(x), SHA256(x), SHA384(x), SHA512(x)

## Original Source
SPARQL 1.1 Query Language
https://www.w3.org/TR/sparql11-query/

## Digest of SPARQL_SYNTAX

# SPARQL Query Language Syntax

# PREFIX and BASE Directives

Syntax:
```
PREFIX  <prefix_label>: <IRI>
BASE    <IRI>
```
- PREFIX associates prefix_label to IRI.  prefix_label may be empty.  IRI must be enclosed in < >.
- BASE defines the Base IRI for resolving relative IRIs per RFC3986 §5.1.1.

## Examples
```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
BASE   <http://example.org/data/>
```
Resolves `foaf:name` to `http://xmlns.com/foaf/0.1/name` and `<person>` to `http://example.org/data/person`.

# Query Forms and Grammar

## SELECT
```
SELECT    [DISTINCT | REDUCED]?  (VarOrStar)+
WHERE     GroupGraphPattern
SolutionModifier?
```
- VarOrStar ::= `*` | Var
- Var ::= `?` VarName | `$` VarName
- SolutionModifier ::= OrderClause? LimitOffsetClauses?

## CONSTRUCT
```
CONSTRUCT { ConstructTemplate }
WHERE     GroupGraphPattern
SolutionModifier?
```

## ASK
```
ASK
WHERE  GroupGraphPattern
```

## DESCRIBE
```
DESCRIBE    (VarOrIRI)+
WHERE       GroupGraphPattern?
```

# RDF Term Syntax

## IRIs and Prefixed Names
- IRIREF: `<` IRI characters `>`
- Prefixed name:
  - PNAME_NS: PNAME_PREFIX `:`
  - PNAME_LN: PNAME_PREFIX `:` PNAME_LOCAL
- Resolution: prefix bound IRI + local part string unescaped.
- Relative IRIs resolved against BASE only using RFC3986 basic algorithm (no normalization).

## Variables
- Marked by `?` or `$` followed by VarName.
- VarName matches grammar `[A-Za-z_][A-Za-z0-9_]*`.
- `?x` and `$x` denote the same variable.

## Blank Nodes
- Label form: `_:label` where label matches `[A-Za-z][A-Za-z0-9]*`.
- Anonymous: `[]` allocates unique blank node per occurrence.
- Property lists: `[ pred1 obj1 ; pred2 obj2 ]` allocates one blank node shared across inner patterns.

## Literals
- Basic: single or double quoted strings: `'...'` or `"..."`.
- Language-tagged: `'string'@lang` or `"string"@lang`, lang per BCP47.
- Typed: `'string'^^<datatypeIRI>` or `"string"^^prefix:datatype`.
- Numeric shortcuts:
  - INTEGER (e.g. 42) => `"42"^^xsd:integer`
  - DECIMAL (e.g. 1.23) => `"1.23"^^xsd:decimal`
  - DOUBLE  (e.g. 1.0e6) => `"1.0e6"^^xsd:double`
- Boolean: `true` | `false` => `"true"^^xsd:boolean` etc.
- Long strings: triple quotes `""" multiline """` or `'''...'''`.

# Triple Pattern Syntax

- Basic graph pattern: subject predicate object .
- Predicate-Object lists:
  `?s :p1 ?o1 ; :p2 ?o2 .` => two triples with same subject.
- Object lists:
  `?s :p "a","b" .` => two triples with same subject and predicate.
- Abbreviated path: omitted predicate uses `a` as alias for `rdf:type`.

# FILTER Expressions (Informative)

- FILTER must evaluate to TRUE or EBV(TRUE).
- Functions:
  - regex(text, pattern, flags?)
  - numeric ops: `<`, `>`, `<=`, `>=`, `+`, `-`, `*`, `/`
  - logical: `&&`, `||`, `!`
- str(), lang(), datatype(), sameTerm(), bound(), isIRI(), isBlank(), isLiteral(), REGEX, YEAR(), NOW(), MD5(), SHA1(), etc.

# Examples

## Simple SELECT
```
PREFIX dc: <http://purl.org/dc/elements/1.1/>
SELECT ?title
WHERE { <http://example.org/book1> dc:title ?title }
```

## Regex Filter
```
FILTER regex(str(?title), "^SPARQL", "i")
```

## Numeric Filter
```
FILTER (?price < 30.5)
```


## Attribution
- Source: SPARQL 1.1 Query Language
- URL: https://www.w3.org/TR/sparql11-query/
- License: CC0 1.0 Universal
- Crawl Date: 2025-04-26T11:47:49.008Z
- Data Size: 95260875 bytes
- Links Found: 103514

## Retrieved
2025-04-26

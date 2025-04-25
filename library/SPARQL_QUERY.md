# SPARQL_QUERY

## Crawl Summary
Syntax definitions for IRIs, literals, variables, blank nodes, triple patterns; basic graph patterns and optional matching semantics; functional forms and built-in functions; core grammar productions and query forms.

## Normalised Extract
Table of Contents
1 IRI Syntax
2 Literal Syntax
3 Variable Syntax
4 Blank Node Syntax
5 Triple Pattern Syntax
6 Basic Graph Patterns
7 Optional Patterns
8 Built-in Functions
9 Core Grammar

1 IRI Syntax
 - IRIREF: '<' IRICHAR* '>'
 - PrefixedName: PNAME_NS | PNAME_NS PN_LOCAL
 - BASE and PREFIX declarations
 - Relative IRI resolution: RFC3986, no normalization

2 Literal Syntax
 - STRING_LITERAL_QUOTE: '"'... '"'; single-quote variant
 - Long literals: '''...''' or """..."""
 - LANGTAG: '@'[a-zA-Z]+('-'[a-zA-Z0-9]+)*
 - Datatype: '^^' IRIREF or PrefixedName
 - Numeric shortcuts: INTEGER, DECIMAL, DOUBLE
 - Boolean: true, false

3 Variable Syntax
 - VAR1: ('?'|'$')VARNAME, VARNAME: PN_CHARS_U(PN_CHARS)*

4 Blank Node Syntax
 - BlankNode: '_:'PN_LOCAL or '[]'
 - Property list: '[' PredicateObjectList ']' allocates blank node

5 Triple Pattern Syntax
 - Subject PredicateObjectList '.'
 - PredicateObjectList: Verb ObjectList (';' Verb ObjectList)*
 - ObjectList: Object (',' Object)*
 - Abbreviations: ';' for common subject, ',' for common predicate

6 Basic Graph Patterns
 - '{' TriplesBlock '}'
 - Subgraph matching by variable binding

7 Optional Patterns
 - OPTIONAL GroupGraphPattern
 - Semantics: left-join preserving unmatched solutions

8 Built-in Functions
 - BOUND(?var) -> xsd:boolean
 - IF(expr1,expr2,expr3) -> term
 - COALESCE(expr...) -> term
 - EXISTS, NOT EXISTS(pattern) -> xsd:boolean
 - Logical: &&, ||, !
 - Comparison: =, !=, <, <=, >, >=
 - IN, NOT IN
 - RDF term funcs: STR, LANG, DATATYPE, isIRI, isBLANK, isLITERAL, isNUMERIC, SAME_TERM

9 Core Grammar
 - Prologue: BaseDecl*, PrefixDecl*
 - Query forms: SELECT, CONSTRUCT, ASK, DESCRIBE
 - DatasetClause: FROM, FROM NAMED
 - SolutionModifier: ORDER BY, LIMIT, OFFSET, GROUP BY, HAVING

## Supplementary Details
Base URI resolution: apply RFC3986 section 5.1.1 algorithm; no syntax or scheme normalization. Prefix declarations: accumulate mappings per Prologue in order. Blank nodes: unique per query execution; labels scoped to result or template. Filter execution: evaluate expression per solution, exclude on error or false. Optional: bind missing vars to unbound state. Query forms selection: SELECT returns solution sequence, CONSTRUCT returns template-built graph, ASK returns boolean, DESCRIBE returns union of descriptions. Parameter order: put graph patterns before FILTER and solution modifiers for performance. Use LIMIT/OFFSET to page results.

## Reference Details
Prologue declarations
BASE IRIREF ; default Base IRI
PREFIX PNAME_NS IRIREF ; prefix mapping

SelectQuery signature
SELECT [DISTINCT|REDUCED]? (VarOrWildcard)+ DatasetClause* WHERE? GroupGraphPattern SolutionModifier*
VarOrWildcard: Var | '*'

groupGraphPattern: '{' TriplesBlock? (GraphPatternNotTriples '.'? TriplesBlock?)* '}'

ConstructQuery signature
CONSTRUCT ConstructTemplate DatasetClause* WHERE? GroupGraphPattern SolutionModifier*
ConstructTemplate: '{' ConstructTriples? '}'

DatasetClause
FROM IRIREF ; default graph
FROM NAMED IRIREF ; named graph

Triple pattern binding
subject ∈ {IRIREF, PrefixedName, Var, BlankNode, Collection}
predicate: Var | IRIREF | PrefixedName
object ∈ {IRIREF, PrefixedName, Var, BlankNode, Literal, Collection}

FILTER usage
FILTER '(' Expression ')'
Examples:
FILTER regex(?title,"^SPARQL","i")
FILTER (?price < 30.5)

Best practices:
Use specific PREFIX declarations at top. Combine common subjects with ';' and predicates with ',' to reduce query size. Order graph patterns by selectivity. Use BIND for computed values. Apply LIMIT/OFFSET for paging.

Troubleshooting:
Curl example:
curl -X POST --data-urlencode "query=SELECT ?s WHERE { ?s ?p ?o } LIMIT 10" \
     -H "Accept: application/sparql-results+json" \
     http://example.com/sparql
Expected JSON: {"head":{"vars":["s"]},"results":{"bindings":[...]}}

If endpoint returns HTTP 400, check PREFIX and syntax. Use DESCRIBE <IRI> to inspect graph.

## Information Dense Extract
IRI: '<...>'; PNAME_NS: PN_PREFIX? ':'; resolve via PREFIX. Literal: '"..."'(@lang|^^IRI); INTEGER->xsd:integer; DECIMAL->xsd:decimal; DOUBLE->xsd:double; BOOLEAN->xsd:boolean; long '''...''' . Var: '?'| '$'+VARNAME. Blank: '_:'+PN_LOCAL | '[]'; property list '[' PoList ']'. Triple: S PoList '.'; PoList: V OList('; V OList)*; OList: O(',' O)*. BGP: '{' TriplesBlock '}'. OPTIONAL '{' pattern '}' => left-join. Functions: BOUND, IF, COALESCE, EXISTS, NOT EXISTS, &&, ||, !, =, !=, <, <=, >, >=, IN, NOT IN, STR, LANG, DATATYPE, isIRI, isBLANK, isLITERAL, isNUMERIC. Grammar: Prologue: BaseDecl*, PrefixDecl*; Query: Select|Construct|Ask|Describe; DatasetClause: FROM IRIREF| NAMED IRIREF; SolutionModifier: ORDER BY ExprList; LIMIT n; OFFSET n; GROUP BY Var+; HAVING Expr.

## Sanitised Extract
Table of Contents
1 IRI Syntax
2 Literal Syntax
3 Variable Syntax
4 Blank Node Syntax
5 Triple Pattern Syntax
6 Basic Graph Patterns
7 Optional Patterns
8 Built-in Functions
9 Core Grammar

1 IRI Syntax
 - IRIREF: '<' IRICHAR* '>'
 - PrefixedName: PNAME_NS | PNAME_NS PN_LOCAL
 - BASE and PREFIX declarations
 - Relative IRI resolution: RFC3986, no normalization

2 Literal Syntax
 - STRING_LITERAL_QUOTE: '''... '''; single-quote variant
 - Long literals: '''...''' or '''...'''
 - LANGTAG: '@'[a-zA-Z]+('-'[a-zA-Z0-9]+)*
 - Datatype: '^^' IRIREF or PrefixedName
 - Numeric shortcuts: INTEGER, DECIMAL, DOUBLE
 - Boolean: true, false

3 Variable Syntax
 - VAR1: ('?'|'$')VARNAME, VARNAME: PN_CHARS_U(PN_CHARS)*

4 Blank Node Syntax
 - BlankNode: '_:'PN_LOCAL or '[]'
 - Property list: '[' PredicateObjectList ']' allocates blank node

5 Triple Pattern Syntax
 - Subject PredicateObjectList '.'
 - PredicateObjectList: Verb ObjectList (';' Verb ObjectList)*
 - ObjectList: Object (',' Object)*
 - Abbreviations: ';' for common subject, ',' for common predicate

6 Basic Graph Patterns
 - '{' TriplesBlock '}'
 - Subgraph matching by variable binding

7 Optional Patterns
 - OPTIONAL GroupGraphPattern
 - Semantics: left-join preserving unmatched solutions

8 Built-in Functions
 - BOUND(?var) -> xsd:boolean
 - IF(expr1,expr2,expr3) -> term
 - COALESCE(expr...) -> term
 - EXISTS, NOT EXISTS(pattern) -> xsd:boolean
 - Logical: &&, ||, !
 - Comparison: =, !=, <, <=, >, >=
 - IN, NOT IN
 - RDF term funcs: STR, LANG, DATATYPE, isIRI, isBLANK, isLITERAL, isNUMERIC, SAME_TERM

9 Core Grammar
 - Prologue: BaseDecl*, PrefixDecl*
 - Query forms: SELECT, CONSTRUCT, ASK, DESCRIBE
 - DatasetClause: FROM, FROM NAMED
 - SolutionModifier: ORDER BY, LIMIT, OFFSET, GROUP BY, HAVING

## Original Source
SPARQL 1.1 Query Language
https://www.w3.org/TR/sparql11-query/

## Digest of SPARQL_QUERY

# SPARQL 1.1 Query Language (retrieved 2024-06-01)

## 4.1 Syntax for IRIs

IRIREF: '<' IRICHAR* '>'
PrefixedName: PNAME_LN | PNAME_NS
PNAME_NS: PN_PREFIX? ':'
PNAME_LN: PNAME_NS PN_LOCAL
PN_PREFIX: PN_CHARS_BASE (PN_CHARS | '.')*
PN_LOCAL: (PN_CHARS_U | ':' | [0-9]) (PN_CHARS | '.' | ':' | '\\')*
Mapping: Resolve PrefixedName by concatenating the IRI bound to the prefix via PREFIX declaration and the local part exactly.

BASE <IRIREF> sets base URI for resolving relative IRIs per RFC3986 section 5.1.1.
Relative IRIs: match irelative-ref in RFC3987, resolved using base URI without normalization.

## 4.1.2 Syntax for Literals

STRING_LITERAL_QUOTE: '"' ( ( '\\' . )| ~["\\] )* '"'
STRING_LITERAL_SINGLE_QUOTE: similar with '\''
LANGTAG: '@' [a-zA-Z]+ ('-' [a-zA-Z0-9]+)*
Datatype: '^^' IRIREF | '^^' PrefixedName
Numeric shortcuts: INTEGER: [0-9]+ -> '"'%lex%'"'^^xsd:integer
DECIMAL: [0-9]* '.' [0-9]+ -> xsd:decimal
DOUBLE: (DECIMAL | INTEGER)? [eE] [+-]? [0-9]+ -> xsd:double
Boolean: 'true' | 'false' -> xsd:boolean
Long literals: '''...''' or """..."""

## 4.1.3 Query Variables

VAR1: ('?' | '$') VARNAME
VARNAME: PN_CHARS_U (PN_CHARS)*
Note: '?' and '$' interchangeable for same variable name.

## 4.1.4 Blank Nodes

Blank node label: '_:' PN_LOCAL
Abbreviated form: '[]' allocates unique blank each occurrence.
Property list form: '[' PredicateObjectList ']' allocates blank and triples.

## 4.2 Syntax for Triple Patterns

TriplePattern: Subject PredicateObjectList '.'
PredicateObjectList: Verb ObjectList ( ';' ( Verb ObjectList )* )
ObjectList: Object ( ',' Object )*
Subject, Verb, Object ∈ { IRIREF, PrefixedName, Var, BlankNode, Collection }

Abbreviations:
: Common subject: Subject Verb1 Object1 ; Verb2 Object2 .
: Common subject & predicate: Subject Verb Object1 , Object2 .

## 5.1 Basic Graph Patterns

BasicGraphPattern: '{' TriplesBlock '}'
Matches subgraph of dataset where each triple pattern unified with data by substituting variables with RDF terms.

## 6.1 Optional Pattern Matching

Syntax: 'OPTIONAL' GroupGraphPattern
Semantics: left-join; include solutions where pattern fails with unbound variables.

## 17.4 Function Definitions

Functional forms:
BOUND(?var) -> boolean
IF(expr1, expr2, expr3) -> value
COALESCE(expr1, expr2, ...) -> first non-error
NOT EXISTS( pattern ) -> boolean
EXISTS( pattern ) -> boolean
Logical: ||, &&, !
Comparison: =, !=, <, <=, >, >=
IN / NOT IN (valueList)
Functions on RDF terms: STR(?term) -> xsd:string
LANG(?term) -> xsd:language
DATATYPE(?term) -> IRI
SameTerm(arg1, arg2) -> boolean
isIRI(?term), isBLANK(?term), isLITERAL(?term), isNUMERIC(?term)

## 19 SPARQL Grammar

Key productions:
Query: Prologue ( SelectQuery | ConstructQuery | AskQuery | DescribeQuery )
Prologue: BaseDecl* PrefixDecl*
BaseDecl: 'BASE' IRIREF
PrefixDecl: 'PREFIX' PNAME_NS IRIREF
SelectQuery: 'SELECT' ( 'DISTINCT' | 'REDUCED' )? (VarOrWildcard)+ DatasetClause* WhereClause SolutionModifier*
WhereClause: 'WHERE'? GroupGraphPattern
ConstructQuery: 'CONSTRUCT' ConstructTemplate DatasetClause* WhereClause SolutionModifier*
AskQuery: 'ASK' DatasetClause* WhereClause
DescribeQuery: 'DESCRIBE' ( VarOrIRIref+ ) DatasetClause* WhereClause?
DatasetClause: 'FROM' ( DefaultGraphClause | NamedGraphClause )
DefaultGraphClause: IRIref
NamedGraphClause: 'NAMED' IRIref
SolutionModifier: OrderClause | LimitOffsetClauses | GroupBy | Having


## Attribution
- Source: SPARQL 1.1 Query Language
- URL: https://www.w3.org/TR/sparql11-query/
- License: W3C Document License 1.0
- Crawl Date: 2025-04-25T23:32:00.365Z
- Data Size: 63611775 bytes
- Links Found: 71461

## Retrieved
2025-04-25

# SPARQL_BASICS

## Crawl Summary
Definitions and syntax for SPARQL queries: SELECT and CONSTRUCT forms; IRI, prefixed name, base resolution; literal forms including language tags, datatypes, numeric and boolean shortcuts; variable notation (?/$); blank node label forms (_:label, [], [pred obj; ...]); triple pattern writing with predicate-object lists and object lists.

## Normalised Extract
Table of Contents
1 SPARQL Query Structure
2 IRI and Prefix Mapping
3 Literals
4 Variables
5 Blank Nodes
6 Triple Pattern Abbreviations

1 SPARQL Query Structure
SELECT ?vars WHERE { triple patterns }
CONSTRUCT { template } WHERE { triple patterns }
ASK WHERE { triple patterns }
DESCRIBE iri+ WHERE { triple patterns }

2 IRI and Prefix Mapping
BASE <baseIRI> sets resolution context. Relative IRI <rel> resolved per RFC3986 section 5.2 without normalization. PREFIX prefix: <IRI> binds prefix. PrefixedName prefix:localPart → concatenation of IRI and localPart.

3 Literals
Syntax: "lexical"@lang or "lexical"^^<datatypeIRI> or "lexical"^^prefix:local
Numeric shortcuts: INTEGER → xsd:integer, DECIMAL → xsd:decimal, DOUBLE exponent form → xsd:double. BooleanLiteral true/false → xsd:boolean. Triple-quote forms for multiline strings.

4 Variables
"?name" and "$name" both refer to variable 'name'. Variable names follow VARNAME production in grammar.

5 Blank Nodes
Explicit: _:label. Anonymous: []. Nested: [ pred1 obj1 ; pred2 obj2 ]. Each [] allocates unique blank node label scoped to query.

6 Triple Pattern Abbreviations
Basic: subject predicate object .
Predicate-object list: subject verb1 objList1 ; verb2 objList2 .
Object list: verb object1 , object2 .

Example: ?x foaf:name "Alice" , "Alice_" ; foaf:mbox <mailto:alice@example.org> .

## Supplementary Details
BASE resolution: combine relative IRIs per RFC3986 sec.5.2, skip normalization. Default Base IRI: retrieval URI. Literal token types: INTEGER ([+-]?\d+), DECIMAL ([+-]?\d+\.\d* | \.\d+), DOUBLE ([+-]?(\d+\.\d*|\d*\.\d+)([eE][+-]?\d+)?), BooleanLiteral (true|false). Grammar mapping: PrefixedName production; IRIREF production excluding delimiters. Variable production: VAR1(?|$)VARNAME. Blank node label production: BLANK_NODE_LABEL '_:' VARNAME. TriplesSameSubject: VarOrTerm PropertyListNotEmpty. PropertyListNotEmpty: Verb ObjectList (';' (Verb ObjectList)*)?; ObjectList: Object (',' Object)*.

## Reference Details
Grammar productions:
IRIREF        ::= '<' ([^<>'"{}|^`\u0000-\u0020])* '>'
PN_PREFIX     ::= PN_CHARS_BASE ((PN_CHARS | '.')* PN_CHARS)?
PN_LOCAL      ::= (PN_CHARS_U | ':' | [0-9]) ((PN_CHARS | '.' | ':' | [0-9])* (PN_CHARS_U | ':' | [0-9]))?
PREFIXDecl    ::= 'PREFIX' PNAME_NS IRIREF
BaseDecl      ::= 'BASE' IRIREF
StringLiteral ::= STRING_LITERAL_QUOTE | STRING_LITERAL_SINGLE_QUOTE | STRING_LITERAL_MULTILINE_QUOTE | STRING_LITERAL_MULTILINE_SINGLE_QUOTE
INTEGER       ::= [0-9]+
DECIMAL       ::= [0-9]* '.' [0-9]+ | [0-9]+ '.' [0-9]*
DOUBLE        ::= (DECIMAL | [0-9]+) [eE] [+-]? [0-9]+
BooleanLiteral::= 'true' | 'false'
Var           ::= '?' VARNAME | '$' VARNAME
VARNAME       ::= (PN_CHARS_U | [0-9]) ((PN_CHARS | '.')* PN_CHARS)?
BLANK_NODE_LABEL ::= '_:' VARNAME
TriplesSameSubject ::= VarOrTerm PropertyListNotEmpty
PropertyListNotEmpty ::= Verb ObjectList (';' (Verb ObjectList)*)?
ObjectList    ::= Object (',' Object)*
Object        ::= GraphNode
GraphNode     ::= VarOrTerm | TriplesNode
TriplesNode   ::= Collection | BlankNodePropertyList
BlankNodePropertyList ::= '[' PropertyListNotEmpty ']' | '[]'
Collection    ::= '(' GraphNode* ')'

Example Fetch Query (Node.js):
const endpoint = 'https://dbpedia.org/sparql';
const query = `PREFIX dbo: <http://dbpedia.org/ontology/>
SELECT ?city WHERE { ?city a dbo:City } LIMIT 10`;
fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/sparql-query',
    'Accept': 'application/sparql-results+json'
  },
  body: query
})
.then(res => res.json())
.then(json => console.log(json));

Troubleshooting:
$ curl -v -H 'Accept: application/sparql-results+json' --data 'query=INVALID' https://example.org/sparql
… HTTP/1.1 400 Bad Request
Expected: syntax error message in JSON {"error":"Parse error at line…"}

Best practices:
• Always bind prefixes using PREFIX.  
• Use VALUES for inline data: VALUES (?x ?y) { (1 2) (3 4) }  
• Use BIND for expressions: BIND(CONCAT(?g, ' ', ?s) AS ?name).

## Information Dense Extract
SELECT-FORMS: SELECT {?vars} WHERE{patterns}, CONSTRUCT{template} WHERE{patterns}, ASK WHERE{patterns}, DESCRIBE IRIs WHERE{patterns}. IRI: <IriRef>, PrefixedName prefix:local→IRI=prefixIRI+local; BASE<iri> resolve rel per RFC3986§5.2 no norm. Literal: 'str'@lang, 'lex'^^<dtype>, numeric shortcuts: INT→xsd:integer, DECIMAL→xsd:decimal, DOUBLE exp→xsd:double, true|false→xsd:boolean; triple-quote for multiline. Variable: ?name/$name. BlankNode: _:label, [], [pred obj;...]. TriplePattern: S P O. Pred-ObjList: S V ObjList (';' V ObjList)*; ObjList: Obj(','Obj)*. Grammar: IRIREF, PN_PREFIX:PN_CHARS_BASE((PN_CHARS|'.')*PN_CHARS)?, PN_LOCAL,(PN_CHARS_U|':'|[0-9])((PN_CHARS|'.'|':'|[0-9])*...); Var:(?|4)VARNAME; BLANK_NODE_LABEL '_:'VARNAME. Fetch example: HTTP POST 'Content-Type:application/sparql-query', 'Accept:application/sparql-results+json', body=query. Troubleshoot curl -v expect 400+JSON error.

## Sanitised Extract
Table of Contents
1 SPARQL Query Structure
2 IRI and Prefix Mapping
3 Literals
4 Variables
5 Blank Nodes
6 Triple Pattern Abbreviations

1 SPARQL Query Structure
SELECT ?vars WHERE { triple patterns }
CONSTRUCT { template } WHERE { triple patterns }
ASK WHERE { triple patterns }
DESCRIBE iri+ WHERE { triple patterns }

2 IRI and Prefix Mapping
BASE <baseIRI> sets resolution context. Relative IRI <rel> resolved per RFC3986 section 5.2 without normalization. PREFIX prefix: <IRI> binds prefix. PrefixedName prefix:localPart  concatenation of IRI and localPart.

3 Literals
Syntax: 'lexical'@lang or 'lexical'^^<datatypeIRI> or 'lexical'^^prefix:local
Numeric shortcuts: INTEGER  xsd:integer, DECIMAL  xsd:decimal, DOUBLE exponent form  xsd:double. BooleanLiteral true/false  xsd:boolean. Triple-quote forms for multiline strings.

4 Variables
'?name' and '$name' both refer to variable 'name'. Variable names follow VARNAME production in grammar.

5 Blank Nodes
Explicit: _:label. Anonymous: []. Nested: [ pred1 obj1 ; pred2 obj2 ]. Each [] allocates unique blank node label scoped to query.

6 Triple Pattern Abbreviations
Basic: subject predicate object .
Predicate-object list: subject verb1 objList1 ; verb2 objList2 .
Object list: verb object1 , object2 .

Example: ?x foaf:name 'Alice' , 'Alice_' ; foaf:mbox <mailto:alice@example.org> .

## Original Source
W3C RDF 1.1 and SPARQL 1.1 Specifications
https://www.w3.org/TR/sparql11-query/

## Digest of SPARQL_BASICS

# Simple SPARQL Queries

Data Size: 91609053 bytes  
Source: W3C SPARQL 1.1 Query Language (REC-2013-03-21), retrieved 2024-06-11

# Simple Queries

SELECT ?title
WHERE { <http://example.org/book/book1> <http://purl.org/dc/elements/1.1/title> ?title . }

PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT ?name ?mbox
WHERE {
  ?x foaf:name ?name ;
     foaf:mbox ?mbox .
}

# RDF Term Syntax

## IRIs and Prefixed Names

BASE <http://example.org/book/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
<book1> expands to <http://example.org/book/book1>  
dc:title expands to <http://purl.org/dc/elements/1.1/title>

## Literals

"text"@en  → language-tagged literal
"42"^^xsd:integer  → typed literal
42  → "42"^^xsd:integer
1.3  → "1.3"^^xsd:decimal
1.0e6  → "1.0e6"^^xsd:double
true/false  → boolean literals
'''multiline'''  → quoted string literal with embedded quotes and newlines

## Variables

?var and $var denote the same variable named var

## Blank Nodes

_:label  → explicit blank node label
[]  → allocate anonymous blank node
[ foaf:name ?n ; foaf:mbox <mailto:alice@example.org> ]

## Triple Patterns

?s foaf:name ?o .  → basic graph pattern
?s p1 o1 , o2 ; p2 o3 .  → object list and predicate-object list abbreviations


## Attribution
- Source: W3C RDF 1.1 and SPARQL 1.1 Specifications
- URL: https://www.w3.org/TR/sparql11-query/
- License: License
- Crawl Date: 2025-04-26T08:49:58.031Z
- Data Size: 91609053 bytes
- Links Found: 99871

## Retrieved
2025-04-26

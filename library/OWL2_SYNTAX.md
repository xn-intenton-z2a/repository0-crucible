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

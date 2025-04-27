# OWL2_SYNTAX

## Crawl Summary
Implement OWL2 functional-style syntax parsing: token categories with regex, BNF grammar rules for ontology and axioms, greedy longest-match tokenization loop, IRI abbreviation expansion via prefix map.

## Normalised Extract
Table of Contents:
1. Lexical Analysis
2. BNF Grammar
3. Tokenization Algorithm
4. IRI Abbreviation

1. Lexical Analysis
   Tokens and regex patterns:
     WHITESPACE => [ \t\n\r]+ (skip)
     COMMENT => '#'[^\n\r]* (skip)
     QUOTED_STRING => '"' (\\\\ | \\\" | [^"\n\r])* '"'
     LANGUAGE_TAG => '@'[A-Za-z0-9\-]+
     DOUBLE_CARET => '\^\^'
     IRI_REF => '<'[^>]*'>'
     PNAME_LN => PN_PREFIX ':' PN_LOCAL
     INTEGER => [0-9]+
     SYMBOLS => one of ( ) , . [ ] { } : ^^

2. BNF Grammar
   Ontology ::= 'Ontology(' [PrefixDeclaration*] Axiom* ')'
   PrefixDeclaration ::= 'Prefix(' PNameLN IRI_REF ')'
   Axiom ::= SubClassOf | EquivalentClasses | DisjointClasses | AnnotationAssertion | ...
   SubClassOf ::= 'SubClassOf(' ClassExpression ClassExpression ')'
   ClassExpression ::= NamedClass | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ...
   ObjectIntersectionOf ::= 'ObjectIntersectionOf(' ClassExpression+ ')'

3. Tokenization Algorithm
  Steps:
    a. pointer p=0; tokenList empty
    b. while p<length:
       i. match all token regex at p, pick longest
       ii. if no match: LexicalError(p)
       iii. if token in {WHITESPACE, COMMENT}: discard
            else add token to tokenList
       iv. advance p
       v. if next char not delimiter and no whitespace/comment: LexicalError(p)

4. IRI Abbreviation
  prefixMap: key=prefixName (with ':'), value=IRI string
  PrefixDecl(pn:,<IRI>): prefixMap.put(pn:,IRI)
  On token PNAME_LN 'pn:local':
    if prefixMap.containsKey(pn:): fullIRI=prefixMap.get(pn:)+local
    else throw PrefixUndefinedException(pn:)


## Supplementary Details
Configuration options:
- allowComments: boolean (default true)  // enable skipping '#' comments
- maxTokenLength: int (default 4096)    // throw if token length exceeds
- caseSensitive: boolean (default true) // determine matching of keywords

Implementation steps:
1. Initialize Lexer with regex patterns and config.
2. Invoke Lexer.tokenize(input) to produce List<Token>.
3. Initialize Parser with token list.
4. Call Parser.parseOntology() to obtain Ontology AST.

AST node definitions:
class Ontology { String ontologyIRI; List<PrefixDecl> prefixes; List<Axiom> axioms; }
class PrefixDecl { String name; String IRI; }
class SubClassOf { ClassExpression sub, sup; }
interface ClassExpression {}
class ObjectIntersectionOf implements ClassExpression { List<ClassExpression> operands; }


## Reference Details
// Java SDK: OWL2SyntaxParser.java

public class OWL2SyntaxParser {
    /**
     * Tokenize functional-style OWL2 syntax input.
     * @param input raw string of ontology
     * @return List<Token> sequence of tokens
     * @throws LexicalException on unrecognized token
     */
    public static List<Token> tokenize(String input) throws LexicalException {
        // Implementation: see tokenization algorithm
    }

    /**
     * Parse OWL2 functional-style syntax into AST.
     * @param tokens list from tokenize()
     * @return Ontology AST root
     * @throws ParseException on grammar mismatch
     */
    public static Ontology parse(List<Token> tokens) throws ParseException {
        // Implementation: recursive-descent parser per BNF
    }

    /**
     * Convenience: parse directly from string.
     * @param input ontology text
     * @return Ontology AST
     * @throws LexicalException, ParseException
     */
    public static Ontology parseOntology(String input) throws LexicalException, ParseException {
        List<Token> t=tokenize(input);
        return parse(t);
    }
}

// Example usage
public class Main {
    public static void main(String[] args) throws Exception {
        String owlText = new String(Files.readAllBytes(Paths.get("ontology.owl")), UTF_8);
        Ontology ont = OWL2SyntaxParser.parseOntology(owlText);
        System.out.println("Parsed " + ont.axioms.size() + " axioms");
    }
}

// Configuration example:
ParserConfig config = new ParserConfig();
config.allowComments = true;
config.maxTokenLength = 8192;
OWLLexer lexer = new OWLLexer(config);

// Best practice: precompile regex patterns and reuse Lexer across files.
// Troubleshooting:
// Command: java -jar owl-parser.jar --test
// Expected: ALL TESTS PASSED (Total: 128)
// On LexicalException: check no invalid characters at indicated position


## Information Dense Extract
Tokens=[WHITESPACE:'[ \t\n\r]'+ skip,COMMENT:'#'[^\n\r]* skip,QUOTED_STRING:'"'(\\\\|\\\"|[^"\n\r])*'"',LANG_TAG:'@[A-Za-z0-9\-]+',DOUBLE_CARET:'^^',IRI_REF:'<'[^>]*'>',PNAME_LN:PN_PREFIX ':' PN_LOCAL,INTEGER:'[0-9]+',SYMBOLS:'(',')',',','.','[',']','{','}',';'];
Grammar: Ontology->'Ontology(' PrefixDecl* Axiom* ')'; PrefixDecl->'Prefix(' PNameLN IRI_REF ')'; SubClassOf->'SubClassOf(' ClassExpr ClassExpr ')'; ClassExpr->NamedClass | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf; ObjectIntersectionOf->'ObjectIntersectionOf(' ClassExpr+ ')';
Tokenization: pointer p, greedy longest regex, emit non-skip tokens, enforce delimiter rule.
IRI expansion: prefixMap store from PrefixDecl; on PNAME_LN resolve or throw PrefixUndefined;
Parser: recursive-descent following grammar; methods per production returning AST nodes;
Config: allowComments=true, maxTokenLength=4096, caseSensitive=true;
API: tokenize(String)->List<Token> throws LexicalException; parse(List<Token>)->Ontology throws ParseException; parseOntology(String)->Ontology throws both.
Example: parse file, print count.
Best practice: reuse precompiled Patterns; reuse Lexer/Parser per config;
Troubleshoot: LexicalException position and offending substring; run unit tests: java -jar owl-parser.jar --test expects ALL TESTS PASSED.

## Sanitised Extract
Table of Contents:
1. Lexical Analysis
2. BNF Grammar
3. Tokenization Algorithm
4. IRI Abbreviation

1. Lexical Analysis
   Tokens and regex patterns:
     WHITESPACE => [ 't'n'r]+ (skip)
     COMMENT => '#'[^'n'r]* (skip)
     QUOTED_STRING => ''' ('''' | '''' | [^''n'r])* '''
     LANGUAGE_TAG => '@'[A-Za-z0-9'-]+
     DOUBLE_CARET => ''^'^'
     IRI_REF => '<'[^>]*'>'
     PNAME_LN => PN_PREFIX ':' PN_LOCAL
     INTEGER => [0-9]+
     SYMBOLS => one of ( ) , . [ ] { } : ^^

2. BNF Grammar
   Ontology ::= 'Ontology(' [PrefixDeclaration*] Axiom* ')'
   PrefixDeclaration ::= 'Prefix(' PNameLN IRI_REF ')'
   Axiom ::= SubClassOf | EquivalentClasses | DisjointClasses | AnnotationAssertion | ...
   SubClassOf ::= 'SubClassOf(' ClassExpression ClassExpression ')'
   ClassExpression ::= NamedClass | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ...
   ObjectIntersectionOf ::= 'ObjectIntersectionOf(' ClassExpression+ ')'

3. Tokenization Algorithm
  Steps:
    a. pointer p=0; tokenList empty
    b. while p<length:
       i. match all token regex at p, pick longest
       ii. if no match: LexicalError(p)
       iii. if token in {WHITESPACE, COMMENT}: discard
            else add token to tokenList
       iv. advance p
       v. if next char not delimiter and no whitespace/comment: LexicalError(p)

4. IRI Abbreviation
  prefixMap: key=prefixName (with ':'), value=IRI string
  PrefixDecl(pn:,<IRI>): prefixMap.put(pn:,IRI)
  On token PNAME_LN 'pn:local':
    if prefixMap.containsKey(pn:): fullIRI=prefixMap.get(pn:)+local
    else throw PrefixUndefinedException(pn:)

## Original Source
OWL 2 Abstract Syntax
https://www.w3.org/TR/owl2-syntax/

## Digest of OWL2_SYNTAX

# OWL2 Syntax Parser Technical Guide (Retrieved 2024-06-XX)

## Lexical Analysis

Define token categories and recognition patterns:

- Whitespace: [ \t\n\r]+ (skip)
- Comment: '#'[^\n\r]* (skip)
- QuotedString: '"' ( (\\\\ | \\\" | [^"
] )* ) '"'
- LanguageTag: '@'[A-Za-z0-9\-]+  
- DoubleCaret: '\^\^'
- IRIRef: '<' [^>]* '>'
- PNameLN: PN_PREFIX ':' PN_LOCAL  
- Integer: [0-9]+  
- Symbols: '(', ')', ',', '.', '[' , ']' , '{' , '}', ':' , '^^'

## Grammar (Functional-Style Syntax)

1. Ontology ::= 'Ontology(' [PrefixDeclaration*] Axiom* ')'
2. PrefixDeclaration ::= 'Prefix(' PNameLN IRIRef ')'
3. Axiom ::= SubClassOf | EquivalentClasses | ...
4. SubClassOf ::= 'SubClassOf(' ClassExpression ClassExpression ')'
5. ClassExpression ::= NamedClass | 'ObjectIntersectionOf(' ClassExpression+ ')'

## Tokenization Algorithm

1. Initialize pointer p=0.
2. While p < input.length:
   a. Attempt greedy match against all token regexes.
   b. Select longest match; if none, throw LexicalException at position p.
   c. If token is WHITESPACE or COMMENT, discard; else emit to token stream.
   d. Advance p by match length; if next char not a delimiter, match whitespace/comment or throw.

## IRI Abbreviation Mechanism

- Maintain Map<String, String> prefixMap.
- On 'Prefix(pn:, <IRI>)', store prefixMap.put("pn:", "IRI");
- On PNameLN token 'pn:ln', expand as prefixMap.get("pn:") + "ln";
- Error if prefix undefined.


## Attribution
- Source: OWL 2 Abstract Syntax
- URL: https://www.w3.org/TR/owl2-syntax/
- License: License
- Crawl Date: 2025-04-27T14:47:58.376Z
- Data Size: 22941997 bytes
- Links Found: 20190

## Retrieved
2025-04-27

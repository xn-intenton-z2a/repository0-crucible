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

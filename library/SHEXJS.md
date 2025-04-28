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

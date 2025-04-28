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

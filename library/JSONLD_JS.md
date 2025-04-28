# JSONLD_JS

## Crawl Summary
Installation: npm install jsonld; require or import. Bundles: dist/jsonld.min.js and dist/jsonld.esm.min.js. Core API: compact(input,context,options)→Promise<Object>; expand(input,options)→Promise<Array>; flatten(input,base)→Promise<Array>; frame(input,frame,options)→Promise<Object>; canonize(input,options)→Promise<String>; toRDF(input,options)→Promise<String|Dataset>; fromRDF(input,options)→Promise<Object>. Customization: registerRDFParser(contentType,parser), assign jsonld.documentLoader. Options: documentLoader, algorithm, format, useNative, safe. Testing: fetch-test-suites, npm test, test-karma, coverage, EARL reports.

## Normalised Extract
Table of Contents:
1 Installation
2 Bundles
3 Core API Methods
4 Customization
5 Safe Mode
6 Testing & Troubleshooting

1 Installation
  npm install jsonld
  const jsonld = require('jsonld');
  import * as jsonld from 'jsonld';

2 Bundles
  ./dist/jsonld.min.js – includes polyfills for broad browser support
  ./dist/jsonld.esm.min.js – ES Module entry, minimal polyfills
  Use script tags: <script type="module" src="jsonld.esm.min.js"></script> and nomodule for legacy

3 Core API Methods
  compact(input:Object|String, context:Object|String, options?:{documentLoader?:Function, base?:String, compactArrays?:Boolean, expandContext?:Object}) → Promise<Object>
  expand(input:Object|String, options?:{safe?:Boolean, documentLoader?:Function, base?:String, expandContext?:Object}) → Promise<Array>
  flatten(input:Object|String, base?:String) → Promise<Array>
  frame(input:Object|String, frame:Object, options?:{embed?:Boolean, explicit?:Boolean, omitGraph?:Boolean, documentLoader?:Function}) → Promise<Object>
  canonize(input:Object|String, options?:{algorithm:'URDNA2015'|'URGNA2012', format:'application/n-quads', useNative?:Boolean}) → Promise<String>
  toRDF(input:Object|String, options?:{format:'application/n-quads'|'application/trig', produceGeneralized?:Boolean}) → Promise<String|Dataset>
  fromRDF(input:String|Dataset, options?:{format:'application/n-quads', useRdfType?:Boolean}) → Promise<Object>

4 Customization
  jsonld.registerRDFParser(contentType:String, parser:(input:String)=>Dataset|Promise<Dataset>)
  jsonld.documentLoader = async (url:String, options:Object)=>{...}
  jsonld.documentLoaders.node() and xhr()

5 Safe Mode
  Pass {safe:true} to expand/compact/frame/canonize to throw errors on data loss

6 Testing & Troubleshooting
  npm run fetch-test-suites
  npm test [TESTS="path"]
  npm run test-karma -- --browsers <list>
  npm run coverage; npm run coverage-report
  EARL=earl.jsonld npm test
  Expected outputs: Mocha reports, coverage reports in coverage/, EARL JSON-LD reports

## Supplementary Details
Default Options:
  compact: base:null, expandContext:null, documentLoader:nodeLoader, compactArrays:true
  expand: base:null, expandContext:null, safe:false, documentLoader:nodeLoader
  frame: embed:true, explicit:false, omitGraph:false
  canonize: algorithm:'URDNA2015', format:'application/n-quads', useNative:false
  toRDF: format:'application/n-quads', produceGeneralized:false
  fromRDF: format:'application/n-quads', useRdfType:false
Document Loaders:
  node(): sets User-Agent header 'jsonld.js'
  xhr(): uses fetch or XHR
Native Canonize Bindings:
  npm install rdf-canonize-native; set useNative:true; benchmark before use
Configuration Steps:
  1 install jsonld and optional parsers/loaders
  2 import or require
  3 override documentLoader or registerRDFParser
  4 call API methods with options object
  5 handle returned Promise


## Reference Details
API Signatures:
- compact(input:Object|String, context:Object|String, options?:CompactOptions): Promise<Object>
  CompactOptions {documentLoader?:Function, base?:String, compactArrays?:Boolean, expandContext?:Object, skipExpansion?:Boolean}
- expand(input:Object|String, options?:ExpandOptions): Promise<Array>
  ExpandOptions {safe?:Boolean, documentLoader?:Function, base?:String, expandContext?:Object}
- flatten(input:Object|String, base?:String): Promise<Array>
- frame(input:Object|String, frame:Object, options?:FrameOptions): Promise<Object>
  FrameOptions {embed?:Boolean, explicit?:Boolean, omitGraph?:Boolean, documentLoader?:Function}
- canonize(input:Object|String, options?:CanonizeOptions): Promise<String>
  CanonizeOptions {algorithm:'URDNA2015'|'URGNA2012', format:'application/n-quads', useNative?:Boolean}
- toRDF(input:Object|String, options?:RdfOptions): Promise<String|Dataset>
  RdfOptions {format:'application/n-quads'|'application/trig', produceGeneralized?:Boolean}
- fromRDF(input:String|Dataset, options?:FromRdfOptions): Promise<Object>
  FromRdfOptions {format:'application/n-quads', useRdfType?:Boolean}

Examples:
```js
const doc={"@id":"_:b0","name":"Alice"};
const ctx={name:"http://schema.org/name"};
(async()=>{
  const comp=await jsonld.compact(doc,ctx,{compactArrays:false});
  const exp=await jsonld.expand(comp);
  const flat=await jsonld.flatten(exp);
  const frame={"@context":ctx,"@type":"Person"};
  const framed=await jsonld.frame(flat,frame);
  const canon=await jsonld.canonize(flat,{format:'application/n-quads'});
  const nquads=await jsonld.toRDF(flat,{format:'application/n-quads'});
  const back=await jsonld.fromRDF(nquads,{useRdfType:true});
  console.log(canon,nquads,back);
})();
```

Best Practices:
- reuse documentLoader across calls
- enable safe mode when signing: {safe:true}
- batch canonize with useNative only after benchmarking

Troubleshooting:
- CORS errors: ensure custom documentLoader with proper fetch headers
- Memory leaks: limit dataset size; use streaming parsers
- Performance: set compactArrays:false to reduce array overhead
Commands & Expected:
  npm test →  PASS  120 tests, 5 seconds
  npm run coverage-report → shows 95% coverage
  EARL=earl.jsonld npm test → writes earl.jsonld with results


## Information Dense Extract
Install: npm install jsonld; require/import. Bundles: dist/jsonld.min.js for legacy, dist/jsonld.esm.min.js for modules. Core API: compact(input,context,opts)->Promise<Object>; expand(input,opts)->Promise<Array>; flatten(input,base)->Promise<Array>; frame(input,frame,opts)->Promise<Object>; canonize(input,opts)->Promise<String>; toRDF(input,opts)->Promise<String|Dataset>; fromRDF(input,opts)->Promise<Object>. Options: documentLoader (Function), base (String), compactArrays(Boolean), safe(Boolean), algorithm('URDNA2015'/'URGNA2012'), format('application/n-quads'/'application/trig'), useNative(Boolean), embed(Boolean), explicit(Boolean), omitGraph(Boolean), produceGeneralized(Boolean), useRdfType(Boolean). Customization: registerRDFParser(type,parser), jsonld.documentLoader override. Safe Mode: {safe:true}. Testing: npm run fetch-test-suites; npm test [TESTS=path]; npm run test-karma; npm run coverage; EARL=earl.jsonld npm test.

## Sanitised Extract
Table of Contents:
1 Installation
2 Bundles
3 Core API Methods
4 Customization
5 Safe Mode
6 Testing & Troubleshooting

1 Installation
  npm install jsonld
  const jsonld = require('jsonld');
  import * as jsonld from 'jsonld';

2 Bundles
  ./dist/jsonld.min.js  includes polyfills for broad browser support
  ./dist/jsonld.esm.min.js  ES Module entry, minimal polyfills
  Use script tags: <script type='module' src='jsonld.esm.min.js'></script> and nomodule for legacy

3 Core API Methods
  compact(input:Object|String, context:Object|String, options?:{documentLoader?:Function, base?:String, compactArrays?:Boolean, expandContext?:Object})  Promise<Object>
  expand(input:Object|String, options?:{safe?:Boolean, documentLoader?:Function, base?:String, expandContext?:Object})  Promise<Array>
  flatten(input:Object|String, base?:String)  Promise<Array>
  frame(input:Object|String, frame:Object, options?:{embed?:Boolean, explicit?:Boolean, omitGraph?:Boolean, documentLoader?:Function})  Promise<Object>
  canonize(input:Object|String, options?:{algorithm:'URDNA2015'|'URGNA2012', format:'application/n-quads', useNative?:Boolean})  Promise<String>
  toRDF(input:Object|String, options?:{format:'application/n-quads'|'application/trig', produceGeneralized?:Boolean})  Promise<String|Dataset>
  fromRDF(input:String|Dataset, options?:{format:'application/n-quads', useRdfType?:Boolean})  Promise<Object>

4 Customization
  jsonld.registerRDFParser(contentType:String, parser:(input:String)=>Dataset|Promise<Dataset>)
  jsonld.documentLoader = async (url:String, options:Object)=>{...}
  jsonld.documentLoaders.node() and xhr()

5 Safe Mode
  Pass {safe:true} to expand/compact/frame/canonize to throw errors on data loss

6 Testing & Troubleshooting
  npm run fetch-test-suites
  npm test [TESTS='path']
  npm run test-karma -- --browsers <list>
  npm run coverage; npm run coverage-report
  EARL=earl.jsonld npm test
  Expected outputs: Mocha reports, coverage reports in coverage/, EARL JSON-LD reports

## Original Source
JSON-LD 1.1 Specification & jsonld.js Implementation
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# Installation

Node.js + npm:
```bash
npm install jsonld
const jsonld = require('jsonld');
```

Browser (bundler) + npm:
```bash
npm install jsonld
import * as jsonld from 'jsonld';
// or
import {promises as jsonld} from 'jsonld';
```

# Browser Bundles

- `./dist/jsonld.min.js`: wide-browser compatibility, includes polyfills.
- `./dist/jsonld.esm.min.js`: ES Module compatible, fewer polyfills.

# Core API Methods

## compact(input, context, options?) → Promise<Object>
- input: Object|String (JSON-LD doc or URL)
- context: Object|String (context doc or URL)
- options (optional): {documentLoader, expandContext, base, compactArrays, ...}

## expand(input, options?) → Promise<Array>
- input: Object|String
- options: {safe, documentLoader, base, expandContext}

## flatten(input, base?) → Promise<Array>
- input: Object|String
- base (optional): String

## frame(input, frame, options?) → Promise<Object>
- frame: JSON-LD frame
- options: {documentLoader, embed, explicit, omitGraph, ...}

## canonize(input, options?) → Promise<String>
- options: {algorithm: 'URDNA2015'|'URGNA2012', format: 'application/n-quads', useNative: Boolean}

## toRDF(input, options?) → Promise<String|Dataset>
- options: {format: 'application/n-quads'|'application/trig'|'application/n-quads', produce generalized RDF}

## fromRDF(input, options?) → Promise<Object>
- options: {format: as above, useRdfType: Boolean}

# Customization

## registerRDFParser(contentType, parser)
- parser(input: String) → Dataset or Promise<Dataset>

## Custom Document Loader

```js
const nodeLoader = jsonld.documentLoaders.node();
jsonld.documentLoader = async (url, options) => {
  if(url.startsWith('https://my-context/')) return {contextUrl:null,document:myContextMap[url],documentUrl:url};
  return nodeLoader(url);
};
```

# Safe Mode

- Activate with `{safe: true}` on expand(), compact(), frame(), canonize(). Fails on lossy constructs.

# Testing & Troubleshooting

- Install test suites:
  ```bash
  npm run fetch-test-suites
  ```
- Run Node tests: `npm test`
- Run browser tests: `npm run test-karma -- --browsers Firefox,Chrome`
- Generate coverage: `npm run coverage`
- Generate EARL report: `EARL=earl.jsonld npm test`


## Attribution
- Source: JSON-LD 1.1 Specification & jsonld.js Implementation
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: License
- Crawl Date: 2025-04-28T06:55:36.968Z
- Data Size: 577079 bytes
- Links Found: 4459

## Retrieved
2025-04-28

# JSONLD_JS

## Crawl Summary
Installation: npm install jsonld; import via require or ES import. Bundles: UMD and ESM variants. Core async methods: compact(input, context, options), expand(input, options), flatten(input, options), frame(input, frame, options), canonize(input, options), toRDF(input, options), fromRDF(quads, options). Options include documentLoader, base, algorithm, format, safe, embed, explicit. Customizable via registerRDFParser and overriding jsonld.documentLoader. Safe mode: options.safe=true. Default User-Agent: 'jsonld.js'. Testing: npm test, npm run test-karma, coverage commands, EARL reports, benchmark mode.

## Normalised Extract
Table of Contents:
1. Installation
2. Bundles
3. API Methods
4. Configuration Options
5. Custom Parsers & Loaders
6. Safe Mode
7. Testing & Benchmarking

1. Installation
   Command: npm install jsonld
   Node import: const jsonld = require('jsonld');
   ES import: import * as jsonld from 'jsonld';

2. Bundles
   dist/jsonld.min.js: UMD, polyfilled, ~160KB
   dist/jsonld.esm.min.js: ESM, ~110KB, minimal polyfills
   Load: <script type="module" src="jsonld.esm.min.js"></script> and <script nomodule src="jsonld.min.js"></script>

3. API Methods
   compact(input:Object|string, context:Object|string, options?:{documentLoader?:Function, graph?:boolean}):Promise<Object>
   expand(input:Object|string, options?:{documentLoader?:Function, safe?:boolean, base?:string}):Promise<Array>
   flatten(input:Object|string, options?:{documentLoader?:Function, base?:string}):Promise<Object>
   frame(input:Object|string, frame:Object|string, options?:{documentLoader?:Function, embed?:boolean, explicit?:boolean}):Promise<Object>
   canonize(input:Object|string, options?:{algorithm:string, format:string, useNative?:boolean}):Promise<string>
   toRDF(input:Object|string, options?:{format:string, produceGeneralizedRdf?:boolean}):Promise<string|Object>
   fromRDF(quads:string|Array, options?:{format:string}):Promise<Object>

4. Configuration Options
   documentLoader: Function — default built-in (node or xhr)
   safe: boolean — default false; on true, throw on lossy transforms
   algorithm: 'URDNA2015' | 'URGNA2012' — default URDNA2015
   format: 'application/n-quads' | 'application/ld+json' — output format
   useNative: boolean — use native rdf-canonize bindings
   userAgent: string — Node loader header; default 'jsonld.js'

5. Custom Parsers & Loaders
   jsonld.registerRDFParser(contentType:string, parser:Function)
   const nodeLoader = jsonld.documentLoaders.node();
   jsonld.documentLoader = async (url, options) => { if(MAP[url]) return {...}; return nodeLoader(url, options); };

6. Safe Mode
   Usage: await jsonld.expand(doc, {safe:true}); // throws on data loss

7. Testing & Benchmarking
   npm run fetch-test-suites
   npm test
   npm run test-karma -- --browsers Firefox,Chrome
   npm run coverage
   REPORTER=dot npm test
   EARL=earl-node.jsonld npm test
   BENCHMARK=1 TESTS=/path/manifest.jsonld npm test


## Supplementary Details
Parameter Definitions:
- input: Object|string — JSON-LD document or URL
- context: Object|string — context document or URL
- frame: Object — framing template
- quads: string|Array — N-Quads string or dataset

Default Options:
- documentLoader: built-in Node or XHR
- base: document URL base for relative IRIs
- embed: true — include embedded nodes
- explicit: false — omit default properties
- produceGeneralizedRdf: false — disallow generalized triples

Implementation Steps:
1. Install jsonld and optional rdf-canonize-native
2. Import jsonld
3. Call methods with await
4. Override documentLoader or registerRDFParser before calls
5. For safe signing, use safe mode and canonize output


## Reference Details
// Installation
npm install jsonld
npm install rdf-canonize-native // optional native canonize

// Import
const jsonld = require('jsonld');
import * as jsonld from 'jsonld';

// compact example
const doc={"http://schema.org/name":"Manu"};
const ctx={"name":"http://schema.org/name"};
const compacted=await jsonld.compact(doc,ctx);
console.log(compacted);

// expand example
const expanded=await jsonld.expand(compacted,{base:'http://example.org/'});
// flatten example
const flattened=await jsonld.flatten(doc);
// frame example
const framed=await jsonld.frame(doc,frameTemplate,{embed:true,explicit:true});

// canonize example
const canon=await jsonld.canonize(doc,{algorithm:'URDNA2015',format:'application/n-quads'});
// toRDF and fromRDF
const nquads=await jsonld.toRDF(doc,{format:'application/n-quads'});
const back=await jsonld.fromRDF(nquads,{format:'application/n-quads'});

// register custom RDF parser
jsonld.registerRDFParser('application/custom',input=>{return customDataset;});

// override document loader
const nodeLoader=jsonld.documentLoaders.node();
jsonld.documentLoader=async(url,opts)=>{if(url in MAP)return{contextUrl:null,document:MAP[url],documentUrl:url};return nodeLoader(url,opts);};

// safe mode
try{await jsonld.expand(data,{safe:true});}catch(e){console.error('Data loss detected',e);}

// Testing & troubleshooting commands
npm run fetch-test-suites
npm test
npm run test-karma -- --browsers Chrome,Firefox
npm run coverage
npm run coverage-report
REPORTER=dot npm test
EARL=earl-node.jsonld npm test
BENCHMARK=1 TESTS=/tmp/benchmark.jsonld npm test
// Expected outputs:
// npm test: zero failures, coverage report folder populated
// Karma: tests passed in headless browsers


## Information Dense Extract
install:npm install jsonld;optional:npm install rdf-canonize-native;import:const jsonld=require('jsonld')|import * as jsonld from 'jsonld';methods:compact(input:Object|string,context:Object|string,options?),expand(input,options?),flatten(input,options?),frame(input,frame,options?),canonize(input,{algorithm,format,useNative?}),toRDF(input,{format,produceGeneralizedRdf?}),fromRDF(quads,{format});options:documentLoader:Function;safe:boolean default false;base:string;algorithm:'URDNA2015';format:'application/n-quads';useNative:boolean;userAgent:'jsonld.js';custom:registerRDFParser(contentType,parser),documentLoader override;safe mode:expand(data,{safe:true});tests:npm run fetch-test-suites;npm test;npm run test-karma;npm run coverage;EARL=earl-node.jsonld npm test;BENCHMARK=1 TESTS=path npm test

## Sanitised Extract
Table of Contents:
1. Installation
2. Bundles
3. API Methods
4. Configuration Options
5. Custom Parsers & Loaders
6. Safe Mode
7. Testing & Benchmarking

1. Installation
   Command: npm install jsonld
   Node import: const jsonld = require('jsonld');
   ES import: import * as jsonld from 'jsonld';

2. Bundles
   dist/jsonld.min.js: UMD, polyfilled, ~160KB
   dist/jsonld.esm.min.js: ESM, ~110KB, minimal polyfills
   Load: <script type='module' src='jsonld.esm.min.js'></script> and <script nomodule src='jsonld.min.js'></script>

3. API Methods
   compact(input:Object|string, context:Object|string, options?:{documentLoader?:Function, graph?:boolean}):Promise<Object>
   expand(input:Object|string, options?:{documentLoader?:Function, safe?:boolean, base?:string}):Promise<Array>
   flatten(input:Object|string, options?:{documentLoader?:Function, base?:string}):Promise<Object>
   frame(input:Object|string, frame:Object|string, options?:{documentLoader?:Function, embed?:boolean, explicit?:boolean}):Promise<Object>
   canonize(input:Object|string, options?:{algorithm:string, format:string, useNative?:boolean}):Promise<string>
   toRDF(input:Object|string, options?:{format:string, produceGeneralizedRdf?:boolean}):Promise<string|Object>
   fromRDF(quads:string|Array, options?:{format:string}):Promise<Object>

4. Configuration Options
   documentLoader: Function  default built-in (node or xhr)
   safe: boolean  default false; on true, throw on lossy transforms
   algorithm: 'URDNA2015' | 'URGNA2012'  default URDNA2015
   format: 'application/n-quads' | 'application/ld+json'  output format
   useNative: boolean  use native rdf-canonize bindings
   userAgent: string  Node loader header; default 'jsonld.js'

5. Custom Parsers & Loaders
   jsonld.registerRDFParser(contentType:string, parser:Function)
   const nodeLoader = jsonld.documentLoaders.node();
   jsonld.documentLoader = async (url, options) => { if(MAP[url]) return {...}; return nodeLoader(url, options); };

6. Safe Mode
   Usage: await jsonld.expand(doc, {safe:true}); // throws on data loss

7. Testing & Benchmarking
   npm run fetch-test-suites
   npm test
   npm run test-karma -- --browsers Firefox,Chrome
   npm run coverage
   REPORTER=dot npm test
   EARL=earl-node.jsonld npm test
   BENCHMARK=1 TESTS=/path/manifest.jsonld npm test

## Original Source
JSON-LD 1.1 Specification and jsonld.js Implementation
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# JSON-LD JS Technical Detailed Digest (Retrieved: 2024-06-19)

# Conformance
- Implements JSON-LD 1.0 and 1.1 Processing Algorithms and API
- Framing: URDNA2015 canonicalization, community group drafts

# Installation
Node.js (npm)
npm install jsonld
const jsonld = require('jsonld');

Browser Bundles
./dist/jsonld.min.js     (UMD, polyfilled, size ~160KB)
./dist/jsonld.esm.min.js (ESM, minimal polyfills, size ~110KB)
Use type="module" and nomodule script tags for parallel loading.

# Core API Method Signatures
## compact(input, context, options)
Signature: async compact(input:Object|string, context:Object|string, options?:CompactOptions):Promise<Object>
CompactOptions: {documentLoader?:Function, expansion?:boolean, graph?:boolean}

## expand(input, options)
Signature: async expand(input:Object|string, options?:ExpandOptions):Promise<Array> 
ExpandOptions: {documentLoader?:Function, base?:string, safe?:boolean}

## flatten(input, options)
Signature: async flatten(input:Object|string, options?:FlattenOptions):Promise<Object> 
FlattenOptions: {documentLoader?:Function, base?:string}

## frame(input, frame, options)
Signature: async frame(input:Object|string, frame:Object|string, options?:FrameOptions):Promise<Object> 
FrameOptions: {documentLoader?:Function, embed?:boolean, explicit?:boolean}

## canonize(input, options)
Signature: async canonize(input:Object|string, options?:CanonizeOptions):Promise<string> 
CanonizeOptions: {algorithm:string, format:string, useNative?:boolean}

## toRDF(input, options)
Signature: async toRDF(input:Object|string, options?:ToRDFOptions):Promise<string|RDFDataset> 
ToRDFOptions: {format:string, produceGeneralizedRdf?:boolean}

## fromRDF(quads, options)
Signature: async fromRDF(quads:string|Array, options?:FromRDFOptions):Promise<Object> 
FromRDFOptions: {format:string}

# Configuration Options
- canonicalization algorithm: 'URDNA2015' or 'URGNA2012'
- RDF serialization formats: 'application/n-quads', 'application/ld+json'
- Safe mode: options.safe = true   (throws on data loss)
- User-Agent header: default 'jsonld.js', override via jsonld.documentLoader.userAgent

# Custom Extensions
## RDF Parsers
registerRDFParser(contentType:string, parser:Function)
registerRDFParser('application/trig', input=>dataset)

## Custom Document Loader
const nodeLoader = jsonld.documentLoaders.node();
async function customLoader(url, options){ if(url in MAP){ return {contextUrl:null, document:MAP[url], documentUrl:url}; } return nodeLoader(url, options);}  
jsonld.documentLoader = customLoader;

# Testing & Benchmarks
- Install test suites: npm run fetch-test-suites
- Run Node tests: npm test
- Run Browser tests: npm run test-karma -- --browsers Firefox,Chrome
- Generate coverage: npm run coverage; npm run coverage-report
- EARL reports: EARL=earl-node.jsonld npm test; convert with rdf serialize
- Benchmarks: BENCHMARK=1 TESTS=/path/manifest.jsonld npm test


## Attribution
- Source: JSON-LD 1.1 Specification and jsonld.js Implementation
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: Mixed (W3C Document License 1.0 & MIT)
- Crawl Date: 2025-04-26T05:48:44.172Z
- Data Size: 763311 bytes
- Links Found: 5607

## Retrieved
2025-04-26

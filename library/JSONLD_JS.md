# JSONLD_JS

## Crawl Summary
Installation commands: npm install jsonld; CommonJS and ES imports. Bundles: dist/jsonld.min.js (legacy/polyfills), dist/jsonld.esm.min.js (ESM). CDN script tags: cdnjs, jsDelivr, unpkg. Core API methods with signatures: compact, expand, flatten, frame, canonize, toRDF, fromRDF. Custom extensions: registerRDFParser, documentLoaders.node()/xhr(), override documentLoader. Safe mode option (safe:true). Configuration: default algorithm URDNA2015, format application/n-quads, default UA 'jsonld.js'. Testing: npm test, test-karma, coverage, env vars TESTS, REPORTER, EARL. Troubleshooting commands for EARL and RDF serialization.

## Normalised Extract
Table of Contents
1 Installation
2 Bundles and CDN
3 Core API Methods
4 Custom RDF Parsers
5 Custom Document Loader
6 Safe Mode
7 Testing and Benchmarks

1 Installation
Install via npm: npm install jsonld
CommonJS import: const jsonld = require('jsonld')
ES Module import: import * as jsonld from 'jsonld'

2 Bundles and CDN
Bundler: webpack/Rollup (ES2017+)
Legacy bundle: dist/jsonld.min.js (polyfills, transforms)
ESM bundle: dist/jsonld.esm.min.js (minimal transforms)
CDNJS: <script src="https://cdnjs.cloudflare.com/ajax/libs/jsonld/1.0.0/jsonld.min.js"></script>
jsDelivr: <script src="https://cdn.jsdelivr.net/npm/jsonld@1.0.0/dist/jsonld.min.js"></script>
unpkg: <script src="https://unpkg.com/jsonld@1.0.0/dist/jsonld.min.js"></script>

3 Core API Methods
compact(input, context, options?) → Promise<Object>
expand(input, options?) → Promise<Array<Object>>
flatten(input, context?, options?) → Promise<Object>
frame(input, frame, options?) → Promise<Object>
canonize(input, {algorithm, format, useNative}?) → Promise<string>
toRDF(input, {format}?) → Promise<string>
fromRDF(input, {format}?) → Promise<Object>

4 Custom RDF Parsers
jsonld.registerRDFParser(contentType, parser)
  parser(input: string) → RDF.Dataset or Promise<RDF.Dataset>

5 Custom Document Loader
const nodeLoader = jsonld.documentLoaders.node()
const xhrLoader = jsonld.documentLoaders.xhr()
jsonld.documentLoader = async (url, options) => {
  if(url in CONTEXTS) return {contextUrl:null,document:CONTEXTS[url],documentUrl:url};
  return nodeLoader(url,options);
}
Pass custom loader via options.documentLoader

6 Safe Mode
Enable data loss detection: await jsonld.expand(data, {safe:true})
Failures throw errors on lossy JSON-LD constructs

7 Testing and Benchmarks
Run Node tests: npm test
Browser tests: npm run test-karma -- --browsers Firefox,Chrome
Generate coverage: npm run coverage && npm run coverage-report
Specify test suites: TESTS="/path1 /path2" npm test
Configure Mocha reporter: REPORTER=dot npm test
Generate EARL report: EARL=report.jsonld npm test
Convert EARL to Turtle: rdf serialize report.jsonld --output-format turtle -o report.ttl
Benchmark flag: BENCHMARK=1 npm test

## Supplementary Details
Default user-agent header: 'jsonld.js'
Default expand/base: null
Default compact options: {compactArrays:true,compactToRelative:true,graph:false,expandContext:null,base:null}
Default frame options: {embed:true,explicit:false,omitGraph:false}
Default canonize options: {algorithm:'URDNA2015',format:'application/n-quads',useNative:false}
Default toRDF/fromRDF format: 'application/n-quads'
Default document loader uses node-fetch with UA and redirects; xhr loader uses XMLHttpRequest with CORS

## Reference Details
API: compact
Signature: compact(input:Object|string, context:Object|string, options?:{
  expandContext?:Object|string,
  base?:string,
  compactArrays?:boolean,
  compactToRelative?:boolean,
  graph?:boolean,
  skipExpansion?:boolean,
  documentLoader?:Function,
  safe?:boolean
}):Promise<Object>
Returns: Promise resolved with compacted JSON-LD
Example:
const compacted = await jsonld.compact(
  {"http://schema.org/name":"Manu Sporny"},
  {name:"http://schema.org/name"},
  {compactArrays:false}
)

API: expand
Signature: expand(input:Object|string, options?:{
  base?:string,
  expandContext?:Object|string,
  documentLoader?:Function,
  safe?:boolean
}):Promise<Array<Object>>

API: flatten
Signature: flatten(input:Object|string, context?:Object|string, options?:{
  base?:string,
  documentLoader?:Function
}):Promise<Object>

API: frame
Signature: frame(input:Object|string, frame:Object|string, options?:{
  embed?:boolean,
  explicit?:boolean,
  omitGraph?:boolean,
  documentLoader?:Function,
  expandContext?:Object|string
}):Promise<Object>

API: canonize
Signature: canonize(input:Object|string, options?:{
  algorithm?:'URDNA2015',
  format?:'application/n-quads',
  documentLoader?:Function,
  useNative?:boolean
}):Promise<string>

API: toRDF
Signature: toRDF(input:Object|string, options?:{
  format?:'application/n-quads',
  documentLoader?:Function
}):Promise<string>

API: fromRDF
Signature: fromRDF(input:string, options?:{
  format?:'application/n-quads',
  documentLoader?:Function
}):Promise<Object>

Best Practices:
• Use safe mode for digital signing workflows
• Cache contexts via custom documentLoader to reduce network latency
• Prefer ESM bundle in modern browser environments
• Specify TESTS env for running selective test suites

Troubleshooting:
• If features unsupported, update test suites: npm run fetch-test-suites
• Adjust TESTS path to include correct directory
• Control Mocha reporter via REPORTER env
• Generate and convert EARL reports as needed

## Information Dense Extract
npm install jsonld; require/import jsonld; Bundles: dist/jsonld.min.js, dist/jsonld.esm.min.js; CDN: cdnjs, jsdelivr, unpkg; API Signatures: compact(input,context,options)->Promise<Object>; expand(input,options)->Promise<Array<Object>>; flatten(input,context,options)->Promise<Object>; frame(input,frame,options)->Promise<Object>; canonize(input,{algorithm,format,useNative})->Promise<string>; toRDF(input,{format})->Promise<string>; fromRDF(input,{format})->Promise<Object>; Extensions: registerRDFParser(contentType,parser); documentLoaders.node()/xhr(); override documentLoader; Safe mode: {safe:true}; Defaults: user-agent 'jsonld.js', algorithm URDNA2015, format application/n-quads, compactArrays true; Testing: npm test, test-karma, coverage, TESTS/REPORTER/EARL/BENCHMARK env; Troubleshoot: fetch-test-suites, rdf serialize

## Sanitised Extract
Table of Contents
1 Installation
2 Bundles and CDN
3 Core API Methods
4 Custom RDF Parsers
5 Custom Document Loader
6 Safe Mode
7 Testing and Benchmarks

1 Installation
Install via npm: npm install jsonld
CommonJS import: const jsonld = require('jsonld')
ES Module import: import * as jsonld from 'jsonld'

2 Bundles and CDN
Bundler: webpack/Rollup (ES2017+)
Legacy bundle: dist/jsonld.min.js (polyfills, transforms)
ESM bundle: dist/jsonld.esm.min.js (minimal transforms)
CDNJS: <script src='https://cdnjs.cloudflare.com/ajax/libs/jsonld/1.0.0/jsonld.min.js'></script>
jsDelivr: <script src='https://cdn.jsdelivr.net/npm/jsonld@1.0.0/dist/jsonld.min.js'></script>
unpkg: <script src='https://unpkg.com/jsonld@1.0.0/dist/jsonld.min.js'></script>

3 Core API Methods
compact(input, context, options?)  Promise<Object>
expand(input, options?)  Promise<Array<Object>>
flatten(input, context?, options?)  Promise<Object>
frame(input, frame, options?)  Promise<Object>
canonize(input, {algorithm, format, useNative}?)  Promise<string>
toRDF(input, {format}?)  Promise<string>
fromRDF(input, {format}?)  Promise<Object>

4 Custom RDF Parsers
jsonld.registerRDFParser(contentType, parser)
  parser(input: string)  RDF.Dataset or Promise<RDF.Dataset>

5 Custom Document Loader
const nodeLoader = jsonld.documentLoaders.node()
const xhrLoader = jsonld.documentLoaders.xhr()
jsonld.documentLoader = async (url, options) => {
  if(url in CONTEXTS) return {contextUrl:null,document:CONTEXTS[url],documentUrl:url};
  return nodeLoader(url,options);
}
Pass custom loader via options.documentLoader

6 Safe Mode
Enable data loss detection: await jsonld.expand(data, {safe:true})
Failures throw errors on lossy JSON-LD constructs

7 Testing and Benchmarks
Run Node tests: npm test
Browser tests: npm run test-karma -- --browsers Firefox,Chrome
Generate coverage: npm run coverage && npm run coverage-report
Specify test suites: TESTS='/path1 /path2' npm test
Configure Mocha reporter: REPORTER=dot npm test
Generate EARL report: EARL=report.jsonld npm test
Convert EARL to Turtle: rdf serialize report.jsonld --output-format turtle -o report.ttl
Benchmark flag: BENCHMARK=1 npm test

## Original Source
JSON-LD 1.1 Specification & JavaScript Implementation (jsonld.js)
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# jsonld.js Technical Digest
Retrieved: 2024-06-07
Attribution: digitalbazaar/jsonld.js
Data Size: 610986 bytes
Links Found: 4762

# Installation

Node.js (CommonJS)

  npm install jsonld
  const jsonld = require('jsonld');

ES Module

  npm install jsonld
  import * as jsonld from 'jsonld';

Browser Bundler

  npm install jsonld
  Use webpack/Rollup targeting ES2017+

# Bundles

./dist/jsonld.min.js
  Polyfills, code transforms, legacy browser support

./dist/jsonld.esm.min.js
  ES Modules, minimal polyfills, modern browser support

# API Methods

compact(input: Object|string, context: Object|string, options?: Object): Promise<Object>
expand(input: Object|string, options?: Object): Promise<Array<Object>>
flatten(input: Object|string, context?: Object|string, options?: Object): Promise<Object>
frame(input: Object|string, frame: Object|string, options?: Object): Promise<Object>
canonize(input: Object|string, options?: {algorithm?: string, format?: string, useNative?: boolean}): Promise<string>
toRDF(input: Object|string, options?: {format?: string}): Promise<string>
fromRDF(input: string, options?: {format?: string}): Promise<Object>
jsonld.registerRDFParser(contentType: string, parser: Function): void
jsonld.documentLoaders.node(): Function
jsonld.documentLoaders.xhr(): Function
jsonld.documentLoader: Function override

# Configuration Options

Default user-agent (Node.js): jsonld.js
canonize algorithm: URDNA2015 (default)
canonize format: application/n-quads
expand/base defaults: null
compactArrays: true
compactToRelative: true
embed (frame): true

# Safe Mode

Use safe mode to detect lossy operations:

  await jsonld.expand(data, {safe: true});

# Testing & Troubleshooting

npm test
npm run test-karma -- --browsers Firefox,Chrome
npm run coverage && npm run coverage-report
TESTS="/path/to/suites" npm test
REPORTER=dot npm test
EARL=earl.jsonld npm test
rdf serialize earl.jsonld --output-format turtle -o earl.ttl


## Attribution
- Source: JSON-LD 1.1 Specification & JavaScript Implementation (jsonld.js)
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: License
- Crawl Date: 2025-04-27T11:49:07.705Z
- Data Size: 610986 bytes
- Links Found: 4762

## Retrieved
2025-04-27

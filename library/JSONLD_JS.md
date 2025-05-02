# JSONLD_JS

## Crawl Summary
Installation: npm install jsonld, imports via require or ESM import; Bundles: dist/jsonld.min.js, dist/jsonld.esm.min.js; Methods: compact(input,context,options)->Promise<object>, expand(input,options)->Promise<object[]>, flatten(input,contextOrFrame,options)->Promise<object>, frame(input,frame,options)->Promise<object>, canonize(input,options{algorithm,format,useNative})->Promise<string>, toRDF(input,options{format})->Promise<string>, fromRDF(input,options{format})->Promise<object>; Customization: registerRDFParser(contentType,parser), documentLoaders.node(), documentLoaders.xhr(), override documentLoader; Safe Mode: safe:true; Defaults: userAgent=jsonld.js, algorithm=URDNA2015, format=application/n-quads; Testing: npm test, npm run test-karma, npm run coverage

## Normalised Extract
Table of Contents:
1 Installation
2 Browser Bundles
3 Core API Methods
   3.1 compact
   3.2 expand
   3.3 flatten
   3.4 frame
   3.5 canonize
   3.6 toRDF
   3.7 fromRDF
4 Custom RDF Parsers
5 Custom Document Loader
6 Safe Mode
7 Testing

1 Installation
  Command: npm install jsonld
  Import Node: const jsonld = require('jsonld')
  Import ESM: import * as jsonld from 'jsonld'

2 Browser Bundles
  dist/jsonld.min.js - UMD build with polyfills
  dist/jsonld.esm.min.js - ES module build without polyfills

3 Core API Methods
  compact(input, context, options?)
    returns compacted JSON-LD object
  expand(input, options?)
    returns array of expanded JSON-LD objects
  flatten(input, contextOrFrame?, options?)
    returns flattened JSON-LD object
  frame(input, frame, options?)
    returns framed JSON-LD object
  canonize(input, options?)
    algorithm default URDNA2015, format default application/n-quads, useNative default false
    returns canonical N-Quads string
  toRDF(input, options)
    format default application/n-quads
    returns N-Quads string
  fromRDF(input, options)
    format default application/n-quads
    returns JSON-LD object

4 Custom RDF Parsers
  registerRDFParser(contentType, parser)

5 Custom Document Loader
  documentLoaders.node()
  documentLoaders.xhr()
  override jsonld.documentLoader

6 Safe Mode
  options.safe true to detect and throw on lossy constructs

7 Testing
  npm test
  npm run test-karma
  npm run coverage

## Supplementary Details
• ES2017+ required for ESM build and async/await support
• Supports Node.js v8+; bundlers: webpack, Rollup, Parcel
• UMD bundle includes polyfills for Promise, fetch, TextDecoder
• File sizes: UMD ~200 KB; ESM ~150 KB
• canonize.useNative: boolean default false; install rdf-canonize-native and set useNative:true; run benchmarks before enabling
• documentLoaders.node sets default user-agent: jsonld.js; override via options.documentLoader or assign to jsonld.documentLoader
• safe:true option causes JsonLdError on constructs that lose data (drop typed values, language maps)
• To fetch W3C test suites: npm run fetch-test-suites; use TESTS env var to point to directories; REPORTER, BENCHMARK, TEST_ENV control output
• Related CLI modules: jsonld-cli, jsonld-request
• Commercial support: Digital Bazaar support@digitalbazaar.com

## Reference Details
compact
Signature:
async function compact(input: object|string, context: object|string, options?: {
  documentLoader?: (url: string, options?: object) => Promise<{contextUrl: string|null, documentUrl: string, document: any}>,
  expandContext?: boolean,
  safe?: boolean,
  skipNormalization?: boolean
}): Promise<object>
Parameters:
 input: JSON-LD document object or URL string
 context: JSON-LD context object or URL string
 options.documentLoader: custom loader to resolve remote contexts or documents
 options.expandContext: include context definitions in output (default false)
 options.safe: throw on lossy constructs (default false)
 options.skipNormalization: skip RDF dataset normalization (default false)
Returns: Promise resolving to compacted JSON-LD object
Throws: JsonLdError on invalid input or safe-mode violations
Example:
const compacted = await jsonld.compact(doc, context, {
  documentLoader: customLoader,
  safe: true
})

expand
Signature:
async function expand(input: object|string, options?: {
  documentLoader?: (url: string, options?: object) => Promise<any>,
  keepFreeFloatingNodes?: boolean
}): Promise<object[]>
Returns: Promise resolving to expanded JSON-LD as array of node objects

flatten
Signature:
async function flatten(input: object|string, contextOrFrame?: object|string, options?: object): Promise<object>
Description: flattens deep graph structures into top-level nodes, optionally applies framing context

frame
Signature:
async function frame(input: object|string, frame: object|string, options?: object): Promise<object>
Description: transforms JSON-LD into specified tree shape per frame

canonize
Signature:
async function canonize(input: object|string, options?: {
  algorithm?: 'URDNA2015' | 'URGNA2012',
  format?: 'application/n-quads' | 'application/n-quads; charset=utf-8',
  useNative?: boolean
}): Promise<string>
Defaults: algorithm 'URDNA2015', format 'application/n-quads', useNative false
Example:
const canonized = await jsonld.canonize(doc, {algorithm: 'URDNA2015', format: 'application/n-quads'})

toRDF
Signature:
async function toRDF(input: object|string, options: {format: 'application/n-quads' | 'application/trig'}): Promise<string>
Returns: serialized RDF dataset

fromRDF
Signature:
async function fromRDF(input: string|object, options: {format: 'application/n-quads' | 'application/trig'}): Promise<object>
Returns: parsed JSON-LD object

Custom RDF Parser
jsonld.registerRDFParser(contentType: string, parser: (input: string|Uint8Array) => Dataset|Promise<Dataset>): void
Registers handlers for media types such as 'application/n-quads'

Document Loader
const nodeLoader = jsonld.documentLoaders.node()
const xhrLoader = jsonld.documentLoaders.xhr()
jsonld.documentLoader = async function(url, options) {
  if(url in CONTEXTS) return {contextUrl: null, document: CONTEXTS[url], documentUrl: url}
  return nodeLoader(url, options)
}

Configuration Options
safe: boolean default false
useNative: boolean default false
expandArray: boolean default true
userAgent: HTTP header default 'jsonld.js'

Best Practices
• Enable safe mode for digital signing to prevent data loss
• Use ESM bundle in modern browsers with <script type=module> and fallback nomodule
• Set custom documentLoader to pre-load known contexts and improve performance

Troubleshooting
Command: npm test
Expected: PASS all tests without errors; exit code 0
Command: npm run test-karma -- --browsers Chrome,Firefox
Expected: Karma tests start, end with no failures
If context loads fail, run DEBUG=jsonld:* npm test to view loader URLs and HTTP errors



## Information Dense Extract
compact(input:object|string,context:object|string,options?{documentLoader?:fn,expandContext?:boolean,safe?:boolean,skipNormalization?:boolean})->Promise<object>; expand(input:object|string,options?{documentLoader?:fn,keepFreeFloatingNodes?:boolean})->Promise<object[]>; flatten(input:object|string,contextOrFrame?:object|string,options?)->Promise<object>; frame(input:object|string,frame:object|string,options?)->Promise<object>; canonize(input:object|string,options?{algorithm:'URDNA2015'|'URGNA2012',format:'application/n-quads'|'application/trig',useNative?:boolean})->Promise<string>; toRDF(input:object|string,options:{format:'application/n-quads'|'application/trig'})->Promise<string>; fromRDF(input:string|object,options:{format:'application/n-quads'|'application/trig'})->Promise<object>; registerRDFParser(contentType:string,parser:fn(input)->Dataset|Promise<Dataset>); documentLoaders.node():DocumentLoader; documentLoaders.xhr():DocumentLoader; default options: safe:false, algorithm:URDNA2015, format:application/n-quads, userAgent:jsonld.js; bundles: jsonld.min.js, jsonld.esm.min.js

## Sanitised Extract
Table of Contents:
1 Installation
2 Browser Bundles
3 Core API Methods
   3.1 compact
   3.2 expand
   3.3 flatten
   3.4 frame
   3.5 canonize
   3.6 toRDF
   3.7 fromRDF
4 Custom RDF Parsers
5 Custom Document Loader
6 Safe Mode
7 Testing

1 Installation
  Command: npm install jsonld
  Import Node: const jsonld = require('jsonld')
  Import ESM: import * as jsonld from 'jsonld'

2 Browser Bundles
  dist/jsonld.min.js - UMD build with polyfills
  dist/jsonld.esm.min.js - ES module build without polyfills

3 Core API Methods
  compact(input, context, options?)
    returns compacted JSON-LD object
  expand(input, options?)
    returns array of expanded JSON-LD objects
  flatten(input, contextOrFrame?, options?)
    returns flattened JSON-LD object
  frame(input, frame, options?)
    returns framed JSON-LD object
  canonize(input, options?)
    algorithm default URDNA2015, format default application/n-quads, useNative default false
    returns canonical N-Quads string
  toRDF(input, options)
    format default application/n-quads
    returns N-Quads string
  fromRDF(input, options)
    format default application/n-quads
    returns JSON-LD object

4 Custom RDF Parsers
  registerRDFParser(contentType, parser)

5 Custom Document Loader
  documentLoaders.node()
  documentLoaders.xhr()
  override jsonld.documentLoader

6 Safe Mode
  options.safe true to detect and throw on lossy constructs

7 Testing
  npm test
  npm run test-karma
  npm run coverage

## Original Source
jsonld.js (JavaScript JSON-LD API)
https://github.com/digitalbazaar/jsonld.js

## Digest of JSONLD_JS

# JSON-LD JS Library (Retrieved on 2023-10-05)

## Installation
npm install jsonld

Node: const jsonld = require('jsonld')
ESM: import * as jsonld from 'jsonld'

## Browser Bundles
./dist/jsonld.min.js: universal UMD build with polyfills (approx 200 KB)
./dist/jsonld.esm.min.js: ES module build without polyfills (approx 150 KB)

## Core API Methods
compact(input: object|string, context: object|string, options?: object): Promise<object>
expand(input: object|string, options?: object): Promise<object[]>
flatten(input: object|string, contextOrFrame?: object|string, options?: object): Promise<object>
frame(input: object|string, frame: object|string, options?: object): Promise<object>
canonize(input: object|string, options?: {algorithm?: string, format?: string, useNative?: boolean}): Promise<string>
toRDF(input: object|string, options: {format: string}): Promise<string>
fromRDF(input: string|object, options: {format: string}): Promise<object>

## Custom RDF Parsers
registerRDFParser(contentType: string, parser: (input: string|Uint8Array) => Dataset|Promise<Dataset>): void

## Document Loaders
documentLoaders.node(): DocumentLoader
documentLoaders.xhr(): DocumentLoader
Override: jsonld.documentLoader = customLoader

## Safe Mode
Option safe: boolean true to throw on lossy constructs

## Testing Commands
npm test                      # node tests
npm run test-karma            # browser tests
npm run coverage              # generate coverage report

## Defaults
userAgent header: jsonld.js
default canonize algorithm: URDNA2015
default canonize format: application/n-quads


## Attribution
- Source: jsonld.js (JavaScript JSON-LD API)
- URL: https://github.com/digitalbazaar/jsonld.js
- License: Unknown
- Crawl Date: 2025-05-02T04:48:43.678Z
- Data Size: 619328 bytes
- Links Found: 4987

## Retrieved
2025-05-02

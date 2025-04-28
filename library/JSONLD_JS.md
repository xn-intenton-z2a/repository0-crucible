# JSONLD_JS

## Crawl Summary
jsonld.js implements JSON-LD 1.0/1.1 in JavaScript. Install via npm. Exposes Promise-based methods compact, expand, flatten, frame, canonize, toRDF, fromRDF with specified argument types and default options. Bundles provided for ES5 and ES modules. Custom RDF parser registration and document loader override supported. Safe mode available for data-loss detection. Native canonize via rdf-canonize-native. Testing via npm scripts, fetch-test-suites and Karma. Configuration options: algorithm URDNA2015, format application/n-quads, useNative flag, safe flag, produceGeneralizedRdf flag, documentLoader default. CDN and bundler integration detailed.

## Normalised Extract
Table of Contents:
1 Installation
2 Bundles
3 Core API Methods
4 Option Defaults
5 Custom Extensions
6 Safe Mode
7 Testing & Reporting

1 Installation
  Command: npm install jsonld
  Import CommonJS: const jsonld = require('jsonld')
  Import ESM: import * as jsonld from 'jsonld'

2 Bundles
  ES5 bundle: ./dist/jsonld.min.js (includes polyfills)
  ES module bundle: ./dist/jsonld.esm.min.js (no extra polyfills)
  CDN URLs for latest version: CDNJS, jsDelivr, unpkg

3 Core API Methods
  compact(input: object|string, context: object|string, options?: object): Promise<object>
  expand(input: object|string, options?: object): Promise<Array<object|string>>
  flatten(input: object|string, contextOrOptions?: object|string|object): Promise<object>
  frame(input: object|string, frame: object, options?: object): Promise<object>
  canonize(input: object|string, options: {algorithm: string, format: string, useNative?: boolean}): Promise<string>
  toRDF(input: object|string, options: {format: string, produceGeneralizedRdf?: boolean}): Promise<string|object>
  fromRDF(input: string|Uint8Array, options: {format: string}): Promise<object>

4 Option Defaults
  canonize.algorithm = "URDNA2015"
  canonize.format = "application/n-quads"
  canonize.useNative = false
  toRDF.format = "application/n-quads"
  toRDF.produceGeneralizedRdf = false
  options.safe = false
  jsonld.documentLoader = nodeDocumentLoader

5 Custom Extensions
  Register RDF parser: jsonld.registerRDFParser(contentType, parser)
  Override loader globally: jsonld.documentLoader = customLoader
  Pass loader per-call: jsonld.{method}(..., {documentLoader: customLoader})

6 Safe Mode
  Detect data-loss: jsonld.expand(data, {safe: true})

7 Testing & Reporting
  npm run fetch-test-suites
  npm test
  npm run test-karma -- --browsers Firefox,Chrome
  npm run coverage
  npm run coverage-report
  REPORTER=dot npm test
  EARL=earl-node.jsonld npm test
  rdf serialize jsonld-js-earl.jsonld --output-format turtle -o out.ttl

## Supplementary Details
Parameter Values:
- algorithm: "URDNA2015" | "URGNA2012"
- format: "application/n-quads" | "application/n-quads;charset=utf-8"
- useNative: true|false
- produceGeneralizedRdf: true|false
- safe: true|false

Configuration Options:
- documentLoader: function(url: string, options: object): Promise<{contextUrl:string,document:any,documentUrl:string}>

Implementation Steps:
1 Install jsonld and optionally rdf-canonize-native
2 Import jsonld
3 Set any global options (jsonld.documentLoader, User-Agent header)
4 Call API methods with correct parameters
5 Handle returned Promise
6 For bundler, include appropriate bundle file
7 For custom loader or parser, register before API calls


## Reference Details
API Specifications:

compact(input: object|string, context: object|string, options?: {
  expandContext?: boolean,
  base?: string,
  compactArrays?: boolean,
  compactToRelative?: boolean,
  graph?: boolean,
  skipExpansion?: boolean,
  documentLoader?: function,
  produceGeneralizedRdf?: boolean,
  safe?: boolean
}): Promise<object>

expand(input: object|string, options?: {
  expandContext?: object|string,
  base?: string,
  keepFreeFloatingNodes?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<Array<object|string>>

flatten(input: object|string, contextOrOptions?: object|string|{
  expandContext?: object|string,
  base?: string,
  documentLoader?: function,
  safe?: boolean
}): Promise<object>

frame(input: object|string, frame: object, options?: {
  embed?: string,
  explicit?: boolean,
  omitDefault?: boolean,
  pruneBlankNodeIdentifiers?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<object>

canonize(input: object|string, options: {
  algorithm: "URDNA2015" | "URGNA2012",
  format: "application/n-quads",
  useNative?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<string>

toRDF(input: object|string, options: {
  format: "application/n-quads" | "application/n-quads;charset=utf-8",
  produceGeneralizedRdf?: boolean,
  documentLoader?: function,
  safe?: boolean
}): Promise<string>

fromRDF(input: string|Uint8Array, options: {
  format: "application/n-quads", 
  documentLoader?: function,
  safe?: boolean
}): Promise<object>

registerRDFParser(contentType: string, parser: function(input: Buffer|string): object|Promise<object>): void

CUSTOM DOCUMENT LOADER PATTERN:
const nodeLoader = jsonld.documentLoaders.node();
const loader = async (url,options) => {
  if(PRELOADED[url]) return {contextUrl:null,document:PRELOADED[url],documentUrl:url};
  return nodeLoader(url);
};
jsonld.documentLoader = loader;

BEST PRACTICES:
- Always specify base or expandContext when using URLs
- Use safe mode for digital signing workflows
- Set default UA header: use jsonld.documentLoaders.node({userAgent:"MyApp/1.0"})
- For large datasets, use stream-based processing via async iterators

TROUBLESHOOTING:
# Missing Context Error
Command: node app.js
Expected: resolves Promise
Actual: Error: Context URL not found
Fix: preload contexts via documentLoader override or include "@context" inline

# Canonization Fails
Command: jsonld.canonize(doc)
Expected: string
Actual: Error: Algorithm not supported
Fix: ensure algorithm set to "URDNA2015"

# Test Suites Missing
Command: npm test
Actual: Error: TESTS environment not set
Fix: npm run fetch-test-suites or set TESTS="/path/to/tests"


## Information Dense Extract
jsonld.js JSON-LD 1.1 JS implementation; npm install jsonld; require or import jsonld; Bundles: dist/jsonld.min.js (ES5), dist/jsonld.esm.min.js (ESM); Methods: compact(input,context,options?):Promise<object>; expand(input,options?):Promise<Array>; flatten(input,contextOrOptions?):Promise<object>; frame(input,frame,options?):Promise<object>; canonize(input,{algorithm URDNA2015,format application/n-quads,useNative false}):Promise<string>; toRDF(input,{format application/n-quads,produceGeneralizedRdf false}):Promise<string>; fromRDF(input,{format application/n-quads}):Promise<object>; registerRDFParser(contentType,parser):void; documentLoader default nodeDocumentLoader; options.safe false; configure loader: jsonld.documentLoader=customLoader; safe mode: options.safe true; native canonize: install rdf-canonize-native and set useNative true; testing: npm test, npm run test-karma, npm run coverage; fetch tests: npm run fetch-test-suites; CNN URLs for CDNJS/jsDelivr/unpkg; defaults: algorithm URDNA2015, format application/n-quads, produceGeneralizedRdf false; errors: missing context URL preload via custom loader; canonize unsupported algorithm ensure URDNA2015; tests missing set TESTS env;

## Sanitised Extract
Table of Contents:
1 Installation
2 Bundles
3 Core API Methods
4 Option Defaults
5 Custom Extensions
6 Safe Mode
7 Testing & Reporting

1 Installation
  Command: npm install jsonld
  Import CommonJS: const jsonld = require('jsonld')
  Import ESM: import * as jsonld from 'jsonld'

2 Bundles
  ES5 bundle: ./dist/jsonld.min.js (includes polyfills)
  ES module bundle: ./dist/jsonld.esm.min.js (no extra polyfills)
  CDN URLs for latest version: CDNJS, jsDelivr, unpkg

3 Core API Methods
  compact(input: object|string, context: object|string, options?: object): Promise<object>
  expand(input: object|string, options?: object): Promise<Array<object|string>>
  flatten(input: object|string, contextOrOptions?: object|string|object): Promise<object>
  frame(input: object|string, frame: object, options?: object): Promise<object>
  canonize(input: object|string, options: {algorithm: string, format: string, useNative?: boolean}): Promise<string>
  toRDF(input: object|string, options: {format: string, produceGeneralizedRdf?: boolean}): Promise<string|object>
  fromRDF(input: string|Uint8Array, options: {format: string}): Promise<object>

4 Option Defaults
  canonize.algorithm = 'URDNA2015'
  canonize.format = 'application/n-quads'
  canonize.useNative = false
  toRDF.format = 'application/n-quads'
  toRDF.produceGeneralizedRdf = false
  options.safe = false
  jsonld.documentLoader = nodeDocumentLoader

5 Custom Extensions
  Register RDF parser: jsonld.registerRDFParser(contentType, parser)
  Override loader globally: jsonld.documentLoader = customLoader
  Pass loader per-call: jsonld.{method}(..., {documentLoader: customLoader})

6 Safe Mode
  Detect data-loss: jsonld.expand(data, {safe: true})

7 Testing & Reporting
  npm run fetch-test-suites
  npm test
  npm run test-karma -- --browsers Firefox,Chrome
  npm run coverage
  npm run coverage-report
  REPORTER=dot npm test
  EARL=earl-node.jsonld npm test
  rdf serialize jsonld-js-earl.jsonld --output-format turtle -o out.ttl

## Original Source
JSON-LD 1.1 Core & jsonld.js
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# JSON-LD.js Technical Reference

# Installation

Install via npm:

    npm install jsonld

CommonJS import:

    const jsonld = require('jsonld');

ES Module import:

    import * as jsonld from 'jsonld';
    import {promises} from 'jsonld';
    import {JsonLdProcessor} from 'jsonld';

# Bundles

Browser bundles shipped in npm package:

- ./dist/jsonld.min.js: ES5 with polyfills for older browsers
- ./dist/jsonld.esm.min.js: ES2017+ module without extra polyfills

Usage via script tags:

    <script type="module" src="./dist/jsonld.esm.min.js"></script>
    <script nomodule src="./dist/jsonld.min.js"></script>

CDN usage:

- CDNJS: https://cdnjs.cloudflare.com/ajax/libs/jsonld/1.0.0/jsonld.min.js
- jsDelivr: https://cdn.jsdelivr.net/npm/jsonld@1.0.0/dist/jsonld.min.js
- unpkg: https://unpkg.com/jsonld@1.0.0/dist/jsonld.min.js

# Core API Methods and Signatures

Methods:

- compact(input: object|string, context: object|string, options?: object): Promise<object>
- expand(input: object|string, options?: object): Promise<Array<object|string>>
- flatten(input: object|string, contextOrOptions?: object|string|object): Promise<object>
- frame(input: object|string, frame: object, options?: object): Promise<object>
- canonize(input: object|string, options: {algorithm: string, format: string, useNative?: boolean}): Promise<string>
- toRDF(input: object|string, options: {format: string, produceGeneralizedRdf?: boolean}): Promise<string|object>
- fromRDF(input: string|Uint8Array, options: {format: string}): Promise<object>

Each method returns a Promise and may reject with Error.

# Options and Defaults

- canonize algorithm: default "URDNA2015"
- canonize format: default "application/n-quads"
- useNative: default false
- toRDF/fromRDF format: default "application/n-quads"
- toRDF produceGeneralizedRdf: default false
- safe mode: options.safe: default false
- documentLoader: default jsonld.documentLoaders.node()

# Custom Parsers and Loaders

Register custom RDF parser:

    jsonld.registerRDFParser(contentType: string, parser: (input: Buffer|string) => object|Promise<object>): void

Override document loader:

    const nodeLoader = jsonld.documentLoaders.node();
    jsonld.documentLoader = async (url, options) => {
      if(url in PRELOADED) return {contextUrl: null, document: PRELOADED[url], documentUrl: url};
      return nodeLoader(url);
    };

Pass loader per-call:

    jsonld.compact(doc, ctx, {documentLoader: customLoader});

# Safe Mode

Enable data-loss detection:

    jsonld.expand(data, {safe: true});

# Testing and Automation

- fetch test suites: npm run fetch-test-suites
- run Node tests: npm test
- run browser tests: npm run test-karma -- --browsers Firefox,Chrome
- code coverage: npm run coverage; npm run coverage-report
- custom reporter: REPORTER=dot npm test
- remote context server: node tests/remote-context-server.js; TESTS=`pwd`/tests npm test
- EARL reports: EARL=earl-node.jsonld npm test; serialize EARL to ttl: rdf serialize jsonld-js-earl.jsonld --output-format turtle -o jsonld-js-earl.ttl

# Performance and Native Bindings

Optional native canonize bindings:

    npm install rdf-canonize-native
    jsonld.canonize(doc, {useNative: true});


## Attribution
- Source: JSON-LD 1.1 Core & jsonld.js
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: W3C Document License (CC-BY 4.0); MIT License
- Crawl Date: 2025-04-28T11:50:44.363Z
- Data Size: 659495 bytes
- Links Found: 5268

## Retrieved
2025-04-28

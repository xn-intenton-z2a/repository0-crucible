# JSONLD_JS

## Crawl Summary
jsonld.js v1.0: conforms to JSON-LD 1.0/1.1 specs; install via npm; supports CommonJS, ESM, AMD; provides browser bundles dist/jsonld.min.js and dist/jsonld.esm.min.js; CDNJS/jsDelivr/unpkg tags available; optional native canonize via rdf-canonize-native with useNative flag; core methods compact, expand, flatten, frame, canonize, toRDF, fromRDF with default options algorithm URDNA2015, format application/n-quads; async registration of custom RDF parsers; override documentLoader globally or per-call; safe mode via options.safe; test commands for Node, Karma, coverage, EARL reports; benchmarks via BENCHMARK env

## Normalised Extract
Table of Contents:

1. Installation
2. Bundles
3. CDN Integration
4. Native Canonize Bindings
5. Core API
6. Custom RDF Parser
7. Document Loader
8. Safe Mode
9. Testing
10. Benchmarks

1. Installation
 npm install jsonld
 require: const jsonld = require('jsonld')
 ES modules: import * as jsonld, import {promises}, import {JsonLdProcessor}

2. Bundles
 dist/jsonld.min.js: ES5+polyfills
 dist/jsonld.esm.min.js: ESM
 Load via <script type=module> and nomodule

3. CDN Integration
 CDNJS URL, jsDelivr URL, unpkg URL, JSPM install

4. Native Canonize Bindings
 npm install rdf-canonize-native
 canonize(data, {useNative:true})

5. Core API
 compact(input, context, [options])→Promise<object>
 expand(input, [options])→Promise<Array>
 flatten(input, [options])→Promise<object>
 frame(input, frame, [options])→Promise<object>
 canonize(input, [options])→Promise<string> defaults: algorithm URDNA2015, format application/n-quads
 toRDF(input, [options])→Promise<string|dataset] default format application/n-quads
 fromRDF(input, [options])→Promise<object>

6. Custom RDF Parser
 jsonld.registerRDFParser(contentType, syncFn)
 jsonld.registerRDFParser(contentType, asyncFn)

7. Document Loader
 default: jsonld.documentLoader = jsonld.documentLoaders.node()
 override globally: jsonld.documentLoader = customLoader
 per-call: jsonld.compact(doc, ctx, {documentLoader: customLoader})

8. Safe Mode
 expand(data, {safe:true})
 safe flag causes errors on lossy constructs

9. Testing
 npm test
 TESTS env for test suites paths
 npm run test-karma -- browsers
 npm run coverage, coverage-report
 REPORTER env
 remote-context-server.js usage
 EARL report generation

10. Benchmarks
 TESTS=manifest BENCHMARK=1 npm test
 EARL, TEST_ENV envs


## Supplementary Details
Default Options:
 algorithm: 'URDNA2015'
 format: 'application/n-quads'
 safe: false
 useNative: false
 documentLoader: node loader

Document Loader Defaults:
 user-agent header: 'jsonld.js'

Performance Notes:
 JavaScript canonize often outperforms native
 useNative adds toolchain complexity

Bundle Polyfills:
 jsonld.min.js includes core-js and regenerator-runtime

Configuration Steps:
 1. Install jsonld and rdf-canonize-native if needed
 2. Import required API signature
 3. Optionally override loader and register parsers
 4. Call core API with proper options


## Reference Details
API Specifications:

compact(input: object|string|Array, context: object|string, options?: {
  expandContext?: boolean,
  documentLoader?: (url: string, options?: object)=>Promise<{contextUrl: string|null, document: object, documentUrl: string}>,
  base?: string,
  compactToRelative?: boolean,
  graph?: boolean,
  skipExpansion?: boolean,
  safe?: boolean
}): Promise<object>

expand(input: object|string|Array, options?: {
  documentLoader?: ...,
  base?: string,
  expandContext?: boolean,
  skipExpansion?: boolean,
  compactArrays?: boolean,
  safe?: boolean
}): Promise<Array<object>>

flatten(input: object|string|Array, options?: {
  documentLoader?: ..., base?: string, expandContext?: boolean, graph?: boolean, skipExpansion?: boolean, safe?: boolean
}): Promise<object>

frame(input: object|string|Array, frame: object|string, options?: {
  documentLoader?: ..., base?: string, expandContext?: boolean, embed?: boolean|'@last'|'@always', explicit?: boolean, omitGraph?: boolean, skipExpansion?: boolean, pruneBlankNodeIdentifiers?: boolean, safe?: boolean
}): Promise<object>

canonize(input: object|string|Array, options?: {
  algorithm?: 'URDNA2015'|'URGNA2012', format?: 'application/n-quads'|'application/trig', documentLoader?: ..., useNative?: boolean, skipExpansion?: boolean, safe?: boolean
}): Promise<string>

toRDF(input: object|string|Array, options?: {
  format?: 'application/n-quads'|'application/trig', produceGeneralizedRdf?: boolean, useNative?: boolean, documentLoader?: ..., safe?: boolean
}): Promise<string|RDFDataset>

fromRDF(input: string|RDFDataset, options?: {
  format?: 'application/n-quads'|'application/trig', rdfParser?: (string,{} )=>RDFDataset, useNative?: boolean, safe?: boolean
}): Promise<object>

Custom RDF Parser:
 jsonld.registerRDFParser(contentType: string, parseFn: (input: string|Buffer)=>RDFDataset|Promise<RDFDataset>): void

Document Loader Override:
 jsonld.documentLoader = customLoader(url: string, options?: object)=>Promise<{contextUrl:null,document:object,documentUrl:string}>

Safe Mode Pattern:
 try { await jsonld.expand(data,{safe:true}); } catch(e) { handleError(e); }

Best Practices:
 Use per-call override for isolated contexts
 Validate frames and contexts locally before remote fetch
 Benchmark critical paths with BENCHMARK=1

Troubleshooting:
 Command: npm test  Expected: exit code 0
 On missing test-suites: set TESTS env to path
 Coverage report empty: run npm run coverage then npm run coverage-report
 Remote context timeout: ensure tests/remote-context-server.js running
 EARL output unexpected: verify TEST_ENV=1 and BENCHMARK flags


## Information Dense Extract
jsonld.js v1.0: Conforms JSON-LD1.0/1.1. Install npm install jsonld. Modules: CommonJS require, ES import and JsonLdProcessor. Bundles: dist/jsonld.min.js (ES5+polyfills), dist/jsonld.esm.min.js (ESM). CDN: CDNJS/jsDelivr/unpkg. Canonize native: install rdf-canonize-native; useNative:true. API: compact(input,context,options)->Promise<object>; expand(input,options)->Promise<Array>; flatten(input,options)->Promise<object>; frame(input,frame,options)->Promise<object>; canonize(input,options)->Promise<string> (algorithm URDNA2015, format application/n-quads); toRDF(input,options)->Promise<string|dataset>; fromRDF(input,options)->Promise<object>. Options: documentLoader, base, skipExpansion, safe, algorithm, format. Custom RDF parser: registerRDFParser(contentType, parseFn). Loader override: jsonld.documentLoader = loader; per-call override. Safe mode: safe:true. Tests: npm test; TESTS env; npm run test-karma; coverage; EARL reports; rdf serialize. Benchmarks: TESTS=manifest BENCHMARK=1 npm test.

## Sanitised Extract
Table of Contents:

1. Installation
2. Bundles
3. CDN Integration
4. Native Canonize Bindings
5. Core API
6. Custom RDF Parser
7. Document Loader
8. Safe Mode
9. Testing
10. Benchmarks

1. Installation
 npm install jsonld
 require: const jsonld = require('jsonld')
 ES modules: import * as jsonld, import {promises}, import {JsonLdProcessor}

2. Bundles
 dist/jsonld.min.js: ES5+polyfills
 dist/jsonld.esm.min.js: ESM
 Load via <script type=module> and nomodule

3. CDN Integration
 CDNJS URL, jsDelivr URL, unpkg URL, JSPM install

4. Native Canonize Bindings
 npm install rdf-canonize-native
 canonize(data, {useNative:true})

5. Core API
 compact(input, context, [options])Promise<object>
 expand(input, [options])Promise<Array>
 flatten(input, [options])Promise<object>
 frame(input, frame, [options])Promise<object>
 canonize(input, [options])Promise<string> defaults: algorithm URDNA2015, format application/n-quads
 toRDF(input, [options])Promise<string|dataset] default format application/n-quads
 fromRDF(input, [options])Promise<object>

6. Custom RDF Parser
 jsonld.registerRDFParser(contentType, syncFn)
 jsonld.registerRDFParser(contentType, asyncFn)

7. Document Loader
 default: jsonld.documentLoader = jsonld.documentLoaders.node()
 override globally: jsonld.documentLoader = customLoader
 per-call: jsonld.compact(doc, ctx, {documentLoader: customLoader})

8. Safe Mode
 expand(data, {safe:true})
 safe flag causes errors on lossy constructs

9. Testing
 npm test
 TESTS env for test suites paths
 npm run test-karma -- browsers
 npm run coverage, coverage-report
 REPORTER env
 remote-context-server.js usage
 EARL report generation

10. Benchmarks
 TESTS=manifest BENCHMARK=1 npm test
 EARL, TEST_ENV envs

## Original Source
JSON-LD 1.1 Specification & jsonld.js Implementation
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# JSON-LD.js Implementation

Retrieved: 2024-06-10
Data Size: 748569 bytes

## Conformance

Targets:

- JSON-LD 1.0 (RFC7159, W3C Rec. 2014-01-16) + errata
- JSON-LD 1.0 Processing Algorithms and API (W3C Rec.)
- JSON-LD 1.0 Framing (Unofficial Draft)
- JSON-LD 1.1 (WG Draft Community Group 2018-06-07+)
- JSON-LD 1.1 Processing Algorithms and API (CG Draft)
- JSON-LD 1.1 Framing (CG Draft)
- Community Group test suite
- JSON-LD 1.1 W3C WD 2018-12-14+
- JSON-LD 1.1 Processing Algorithms and API (WD)
- JSON-LD 1.1 Framing (WD)

## Installation

### Node.js + npm

```bash
npm install jsonld
``` 
```js
const jsonld = require('jsonld');
```

### ES Modules

```bash
npm install jsonld
``` 
```js
import * as jsonld from 'jsonld';
import {promises} from 'jsonld';
import {JsonLdProcessor} from 'jsonld';
```

## Browser Bundles

Paths:

- dist/jsonld.min.js (ES5 + polyfills)
- dist/jsonld.esm.min.js (ESM, minimal polyfills)

Use `<script type="module" src="dist/jsonld.esm.min.js"></script>` and `<script nomodule src="dist/jsonld.min.js"></script>`

## CDN Usage

- CDNJS: `https://cdnjs.cloudflare.com/ajax/libs/jsonld/1.0.0/jsonld.min.js`
- jsDelivr: `https://cdn.jsdelivr.net/npm/jsonld@1.0.0/dist/jsonld.min.js`
- unpkg: `https://unpkg.com/jsonld@1.0.0/dist/jsonld.min.js`
- JSPM: `jspm install npm:jsonld`

## Node.js Native Canonize Bindings

```bash
npm install jsonld rdf-canonize-native
```
Options:

- `useNative: true` on `canonize()`

## Core API Methods

### compact(input, context, [options])
Signature:
```ts
compact(input: object|string|Array, context: object|string, options?: CompactOptions): Promise<object>
```

### expand(input, [options])
Signature:
```ts
expand(input: object|string|Array, options?: ExpandOptions): Promise<Array<object>>
```

### flatten(input, [options])
Signature:
```ts
flatten(input: object|string|Array, options?: FlattenOptions): Promise<object>
```

### frame(input, frame, [options])
Signature:
```ts
frame(input: object|string|Array, frame: object|string, options?: FrameOptions): Promise<object>
```

### canonize(input, [options])
Signature:
```ts
canonize(input: object|string|Array, options?: CanonizeOptions): Promise<string>
```
Default `algorithm`: 'URDNA2015'
Default `format`: 'application/n-quads'

### toRDF(input, [options])
Signature:
```ts
toRDF(input: object|string|Array, options?: ToRDFOptions): Promise<string|RDFDataset>
```
Default `format`: 'application/n-quads'

### fromRDF(input, [options])
Signature:
```ts
fromRDF(input: string|RDFDataset, options?: FromRDFOptions): Promise<object>
```

### registerRDFParser(contentType, parseFn)
Synchronous:
```js
jsonld.registerRDFParser('text/turtle', input => dataset);
```
Asynchronous:
```js
jsonld.registerRDFParser('application/trig', async input => dataset);
```

## Custom Document Loader

Defaults:

```js
jsonld.documentLoader = jsonld.documentLoaders.node();
// or xhr() in browsers
```

Override:
```js
const customLoader = async (url, options) => {
  if(url in CONTEXTS) return { contextUrl: null, document: CONTEXTS[url], documentUrl: url };
  return defaultLoader(url);
};
jsonld.documentLoader = customLoader;
```
Pass per-call:
```js
await jsonld.compact(doc, context, { documentLoader: customLoader });
```

## Safe Mode

Options:

- `safe: true` on `expand()` or any method

Behavior:

- Fails on data-loss conditions (e.g., dropped values in canonize)

## Testing & Coverage

Run Node.js tests:
```bash
npm test
```

Environment variants:

- `TESTS="/path/tests" npm test`
- `npm run test-karma -- --browsers Firefox,Chrome`
- `npm run coverage`
- `npm run coverage-report`
- `REPORTER=dot npm test`
- Remote context server:
  ```bash
  node tests/remote-context-server.js &
  TESTS=`pwd`/tests npm test
  ```
- EARL reports:
  ```bash
  EARL=earl-node.jsonld npm test
  rdf serialize earl-node.jsonld --output-format turtle -o earl-node.ttl
  ```

## Benchmarks

```bash
TESTS=/tmp/benchmark-manifest.jsonld BENCHMARK=1 npm test
TESTS=... EARL=earl-test.jsonld TEST_ENV=1 npm test
```

## Attribution
- Source: JSON-LD 1.1 Specification & jsonld.js Implementation
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: License
- Crawl Date: 2025-04-28T04:51:59.655Z
- Data Size: 748569 bytes
- Links Found: 5548

## Retrieved
2025-04-28

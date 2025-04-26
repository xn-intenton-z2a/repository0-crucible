# JSONLD_JS

## Crawl Summary
Installation commands (npm install jsonld; import patterns), two browser bundles with paths and purposes; Core methods with signatures and type definitions; Configuration options including custom loader, safe mode, native canonize; Registration APIs for custom RDF parsers; Testing commands and flags

## Normalised Extract
Table of Contents

1. Installation
2. Core API Method Signatures
3. Option Types
4. Custom Document Loader
5. Safe Mode
6. Custom RDF Parser Registration
7. Testing and Benchmarks

1. Installation
   - npm install jsonld
   - Node import: const jsonld = require('jsonld')
   - ESM import: import jsonld from 'jsonld/dist/jsonld.esm.min.js'
   - Bundles: dist/jsonld.min.js (polyfills), dist/jsonld.esm.min.js (ESM)

2. Core API Method Signatures
   compact(input: object|string, context: object|string, options?: CompactOptions): Promise<object>
   expand(input: object|string, options?: ExpandOptions): Promise<object[]>
   flatten(input: object|string, options?: FlattenOptions): Promise<object>
   frame(input: object|string, frame: object|string, options?: FrameOptions): Promise<object>
   canonize(input: object|string, options: CanonizeOptions): Promise<string>
   toRDF(input: object|string, options: ToRdfOptions): Promise<string>
   fromRDF(nquads: string, options: FromRdfOptions): Promise<object>

3. Option Types
   CompactOptions: base?: string; compactArrays?: boolean; expandContext?: any; documentLoader?: DocumentLoader; safe?: boolean
   ExpandOptions: base?: string; documentLoader?: DocumentLoader; safe?: boolean
   FlattenOptions: base?: string; documentLoader?: DocumentLoader; safe?: boolean
   FrameOptions: base?: string; documentLoader?: DocumentLoader; safe?: boolean
   CanonizeOptions: algorithm: 'URDNA2015'|'URGNA2012'; format: 'application/n-quads'; useNative?: boolean
   ToRdfOptions: format: 'application/n-quads'; produceGeneralizedRdf?: boolean
   FromRdfOptions: format: 'application/n-quads'

4. Custom Document Loader
   jsonld.documentLoader = async (url, options) => {
       if(url in CONTEXTS) return { contextUrl: null, document: CONTEXTS[url], documentUrl: url };
       return defaultLoader(url, options);
   };
   Pass custom loader per-call: jsonld.compact(doc, ctx, { documentLoader: customLoader });

5. Safe Mode
   Use { safe: true } in any processing call to detect data-loss scenarios and throw errors.

6. Custom RDF Parser Registration
   jsonld.registerRDFParser('media/type', input => Dataset|Promise<Dataset>);

7. Testing and Benchmarks
   npm test
   npm run test-karma -- --browsers
   npm run coverage
   npm run coverage-report
   TESTS=/path BENCHMARK=1 npm test

## Supplementary Details
Configuration Options
- documentLoader: function(url: string, options?: any) => Promise<{ document: any; documentUrl: string; contextUrl: string|null }>; default: nodeDocumentLoader or xhr loader
- safe (boolean): default false; when true, processing errors on data-loss
- canonize useNative (boolean): default false; requires rdf-canonize-native
- algorithm: 'URDNA2015' (default) or 'URGNA2012'
- format: 'application/n-quads' for canonize/toRDF/fromRDF

Implementation Steps
1. Install via npm
2. Import jsonld
3. (Optional) configure documentLoader, safe mode, useNative
4. Call desired API method using async/await or Promise
5. Handle returned data
6. For serialization: use toRDF/fromRDF with correct format option

Browser Bundling
- Use webpack/Rollup to include dist/jsonld.esm.min.js for modern browsers
- Use script type module/nomodule pattern for compatibility

Native Canonization Setup
1. npm install rdf-canonize-native
2. Call jsonld.canonize(doc, { useNative: true, algorithm: 'URDNA2015', format: 'application/n-quads' })


## Reference Details
API Specifications:

compact(input: object|string, context: object|string, options?: CompactOptions): Promise<object>
  - input: JSON-LD document or URL
  - context: JSON-LD context or URL
  - options.base: string; default undefined
  - options.compactArrays: boolean; default true
  - options.expandContext: any; default undefined
  - options.documentLoader: DocumentLoader; default jsonld.documentLoader
  - options.safe: boolean; default false
  - returns: Promise resolving to compacted JSON-LD object
  - errors: throws JsonLdError for invalid input, data loss in safe mode

expand(input: object|string, options?: ExpandOptions): Promise<object[]>
  - options.base, documentLoader, safe
  - returns expanded JSON-LD array

flatten(input: object|string, options?: FlattenOptions): Promise<object>
frame(input: object|string, frame: object|string, options?: FrameOptions): Promise<object>
canonize(input: object|string, options: CanonizeOptions): Promise<string>
  - options.algorithm: 'URDNA2015'| 'URGNA2012'; default 'URDNA2015'
  - options.format: 'application/n-quads'; default 'application/n-quads'
  - options.useNative: boolean; default false
  - returns canonical N-Quads string

toRDF(input: object|string, options: ToRdfOptions): Promise<string>
  - options.format: 'application/n-quads'; default 'application/n-quads'
  - options.produceGeneralizedRdf: boolean; default false
fromRDF(nquads: string, options: FromRdfOptions): Promise<object>
  - options.format: 'application/n-quads'; default 'application/n-quads'
  - returns JSON-LD document

registerRDFParser(contentType: string, parser: (input: string) => Dataset|Promise<Dataset>): void
  - contentType: HTTP media type
  - parser: function returning RDF dataset

documentLoaders.node(): DocumentLoader  
documentLoaders.xhr(): DocumentLoader

Best Practices:
- Pre-load common contexts via custom documentLoader to avoid network
- Use safe mode when preparing data for digital signing
- Reuse context objects for compaction to improve performance

Implementation Patterns:
```js
// custom loader
const defaultLoader = jsonld.documentLoaders.node();
jsonld.documentLoader = async (url, options) => {
  if(url.startsWith('https://schema.org/')) {
    return { documentUrl: url, document: myCache[url], contextUrl: null };
  }
  return defaultLoader(url, options);
};
// compaction
(async () => {
  const compacted = await jsonld.compact(doc, context, { safe: true });
  console.log(JSON.stringify(compacted));
})();
```

Troubleshooting Procedures:

1. Document Loader Errors
   Command: set DEBUG=jsonld npm test
   Expected: No DocumentLoaderError
2. Safe Mode Failures
   Call expand with invalid type, expect JsonLdError data loss message
3. Benchmark Regression
   RUN: BENCHMARK=1 npm test
   Compare earl.jsonld reports with previous runs via benchmarks/compare/

Configuration Options Table:
| Option               | Type      | Default                    | Effect                                 |
|----------------------|-----------|----------------------------|----------------------------------------|
| compactArrays        | boolean   | true                       | if false, always produce arrays       |
| expandContext        | any       | undefined                  | additional context for expansion       |
| safe                 | boolean   | false                      | enable data-loss detection             |
| algorithm            | string    | URDNA2015                  | canonicalization algorithm             |
| format               | string    | application/n-quads        | serialization format                   |
| useNative            | boolean   | false                      | use native canonize binding            |
| documentLoader       | function  | nodeDocumentLoader or xhr  | loader for external contexts           |


## Information Dense Extract
Installation: npm install jsonld; import via require or ESM from dist/jsonld.esm.min.js; Bundles: dist/jsonld.min.js, dist/jsonld.esm.min.js

Core API:
compact(input:object|URL,context:object|URL,options?:{base?:string;compactArrays?:boolean;expandContext?:any;documentLoader?:fn;safe?:boolean}):Promise<object>
expand(input,options?:{base?:string;documentLoader?:fn;safe?:boolean}):Promise<object[]>
flatten(input,options?):Promise<object>
frame(input,frame,options?):Promise<object>
canonize(input,options:{algorithm:'URDNA2015'|'URGNA2012';format:'application/n-quads';useNative?:boolean}):Promise<string>
toRDF(input,options:{format:'application/n-quads';produceGeneralizedRdf?:boolean}):Promise<string>
fromRDF(nquads:string,options:{format:'application/n-quads'}):Promise<object>
registerRDFParser(mediaType:string,parser:fn):void
documentLoaders.node():loader; documentLoaders.xhr():loader

Config: documentLoader(fn), safe:boolean=false, useNative:boolean=false, algorithm='URDNA2015', format='application/n-quads'

Patterns: pre-load contexts in custom loader; use safe mode for signing; reuse context for performance.

Testing: npm test; npm run test-karma; npm run coverage; BENCHMARK=1 npm test

Troubleshoot: DEBUG=jsonld for loader issues; safe mode errors throw JsonLdError; compare EARL JSON-LD reports via benchmarks/compare/

## Sanitised Extract
Table of Contents

1. Installation
2. Core API Method Signatures
3. Option Types
4. Custom Document Loader
5. Safe Mode
6. Custom RDF Parser Registration
7. Testing and Benchmarks

1. Installation
   - npm install jsonld
   - Node import: const jsonld = require('jsonld')
   - ESM import: import jsonld from 'jsonld/dist/jsonld.esm.min.js'
   - Bundles: dist/jsonld.min.js (polyfills), dist/jsonld.esm.min.js (ESM)

2. Core API Method Signatures
   compact(input: object|string, context: object|string, options?: CompactOptions): Promise<object>
   expand(input: object|string, options?: ExpandOptions): Promise<object[]>
   flatten(input: object|string, options?: FlattenOptions): Promise<object>
   frame(input: object|string, frame: object|string, options?: FrameOptions): Promise<object>
   canonize(input: object|string, options: CanonizeOptions): Promise<string>
   toRDF(input: object|string, options: ToRdfOptions): Promise<string>
   fromRDF(nquads: string, options: FromRdfOptions): Promise<object>

3. Option Types
   CompactOptions: base?: string; compactArrays?: boolean; expandContext?: any; documentLoader?: DocumentLoader; safe?: boolean
   ExpandOptions: base?: string; documentLoader?: DocumentLoader; safe?: boolean
   FlattenOptions: base?: string; documentLoader?: DocumentLoader; safe?: boolean
   FrameOptions: base?: string; documentLoader?: DocumentLoader; safe?: boolean
   CanonizeOptions: algorithm: 'URDNA2015'|'URGNA2012'; format: 'application/n-quads'; useNative?: boolean
   ToRdfOptions: format: 'application/n-quads'; produceGeneralizedRdf?: boolean
   FromRdfOptions: format: 'application/n-quads'

4. Custom Document Loader
   jsonld.documentLoader = async (url, options) => {
       if(url in CONTEXTS) return { contextUrl: null, document: CONTEXTS[url], documentUrl: url };
       return defaultLoader(url, options);
   };
   Pass custom loader per-call: jsonld.compact(doc, ctx, { documentLoader: customLoader });

5. Safe Mode
   Use { safe: true } in any processing call to detect data-loss scenarios and throw errors.

6. Custom RDF Parser Registration
   jsonld.registerRDFParser('media/type', input => Dataset|Promise<Dataset>);

7. Testing and Benchmarks
   npm test
   npm run test-karma -- --browsers
   npm run coverage
   npm run coverage-report
   TESTS=/path BENCHMARK=1 npm test

## Original Source
JSON-LD 1.1 Specification and jsonld.js Implementation
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# Installation

**Node.js**

```bash
npm install jsonld
``` 

```js
const jsonld = require('jsonld');
``` 

**Browser (ESM)**

```bash
npm install jsonld
```  
<script type="module">
  import jsonld from 'jsonld/dist/jsonld.esm.min.js';
</script>

**Browser Bundles**

- `./dist/jsonld.min.js` wide compatibility, includes polyfills.  
- `./dist/jsonld.esm.min.js` ES Module, fewer polyfills.

Load via `<script src=".../jsonld.min.js"></script>` or via bundler (webpack, Rollup).

# Core API Methods and Signatures

```ts
compact(input: object|string, context: object|string, options?: CompactOptions): Promise<object>
expand(input: object|string, options?: ExpandOptions): Promise<object[]>
flatten(input: object|string, options?: FlattenOptions): Promise<object>
frame(input: object|string, frame: object|string, options?: FrameOptions): Promise<object>
canonize(input: object|string, options: CanonizeOptions): Promise<string>
toRDF(input: object|string, options: ToRdfOptions): Promise<string>
fromRDF(nquads: string, options: FromRdfOptions): Promise<object>
registerRDFParser(contentType: string, parser: (input: string) => Dataset|Promise<Dataset>): void
documentLoaders: { node(): DocumentLoader; xhr(): DocumentLoader }
``` 

Types:

- **CompactOptions**: { base?: string; compactArrays?: boolean; expandContext?: any; documentLoader?: DocumentLoader; safe?: boolean }
- **CanonizeOptions**: { algorithm: 'URDNA2015'|'URGNA2012'; format: 'application/n-quads'; useNative?: boolean }
- **ToRdfOptions**: { format: 'application/n-quads' }
- **FromRdfOptions**: { format: 'application/n-quads' }

# Configuration Details

- **Custom Loader**: Override `jsonld.documentLoader` or pass `documentLoader` per call. Signature: `(url: string, options?): Promise<{ documentUrl: string; document: any; contextUrl: string|null }>`

- **Safe Mode**: Enables data loss detection. Use `{ safe: true }` in `expand`, `compact`, `frame`, `flatten`.

- **Native Canonize**: Install `rdf-canonize-native` and set `useNative: true` in `canonize` options.

# Custom RDF Parser Registration

```js
jsonld.registerRDFParser('application/trig', input => {
  // synchronous parse to Dataset
  return myDataset;
});
jsonld.registerRDFParser('text/turtle', async input => {
  return await parseTurtle(input);
});
```

# Testing and Benchmarks

```bash
# Run Node.js tests
npm test
# Run browser tests via Karma
npm run test-karma -- --browsers Firefox,Chrome
# Generate coverage
npm run coverage
npm run coverage-report
# Fetch test suites
npm run fetch-test-suites
# Run benchmarks
TESTS=/path/benchmarks.jsonld BENCHMARK=1 npm test
```

## Attribution
- Source: JSON-LD 1.1 Specification and jsonld.js Implementation
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: Mixed (W3C Document License 1.0 & MIT)
- Crawl Date: 2025-04-26T07:48:07.937Z
- Data Size: 719861 bytes
- Links Found: 5492

## Retrieved
2025-04-26

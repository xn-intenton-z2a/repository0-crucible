# JSONLD_JS

## Crawl Summary
Implementation of JSON-LD spec in JS. Core async API methods: compact(input,context,options):Promise<object>, expand(input,options):Promise<object[]>, flatten(input,context?,options):Promise<object>, frame(input,frame,options):Promise<object>, canonize(input,{algorithm:'URDNA2015'|'URGNA2012',format:'application/n-quads'|'application/trig',useNative?:boolean}):Promise<string>, toRDF(input,{format:'application/n-quads'|'application/trig'}):Promise<string|object>, fromRDF(input,{format:'application/n-quads'|'application/trig',rdfParser?:Function}):Promise<object>. Customization: registerRDFParser(mime,parser), documentLoaders.node(), documentLoaders.xhr(), override jsonld.documentLoader. Safe mode via option safe:true. Bundles: dist/jsonld.min.js (polyfills), dist/jsonld.esm.min.js (ESM). Install via npm install jsonld. Testing commands: npm test, npm run test-karma, npm run coverage, use TESTS, BENCHMARK, EARL environment variables.

## Normalised Extract
Table of Contents
1 Installation
2 Browser Bundles
3 API Methods
   3.1 compact
   3.2 expand
   3.3 flatten
   3.4 frame
   3.5 canonize
   3.6 toRDF
   3.7 fromRDF
   3.8 registerRDFParser
   3.9 documentLoader
   3.10 Safe Mode
4 Testing
5 Troubleshooting

1 Installation
  npm install jsonld
  const jsonld = require('jsonld');

2 Browser Bundles
  dist/jsonld.min.js (polyfilled)  
  dist/jsonld.esm.min.js (ESM only)  
  script tags: type=module for esm, nomodule for min

3 API Methods
3.1 compact
  Signature: jsonld.compact(input: object|string, context: object|string, options?: {documentLoader, expandContext, processingMode:'json-ld-1.1'|'json-ld-1.0', compactArrays:boolean, compactToRelative:boolean, base:string}):Promise<object>
  Behavior: apply @context to shrink terms

3.2 expand
  Signature: jsonld.expand(input: object|string, options?: {documentLoader, expandContext, processingMode}):Promise<Array<object>>

3.3 flatten
  Signature: jsonld.flatten(input: object|string, context?: object|string, options?: object):Promise<object>

3.4 frame
  Signature: jsonld.frame(input: object|string, frame: object|string, options?: {documentLoader, pruneBlankNodeIdentifiers:boolean, embed:boolean, explicit:boolean, omitGraph:boolean, processingMode}):Promise<object>

3.5 canonize
  Signature: jsonld.canonize(input: object|string, options: {algorithm:'URDNA2015'|'URGNA2012', format:'application/n-quads'|'application/trig', documentLoader?, processingMode?, useNative?:boolean}):Promise<string>

3.6 toRDF
  Signature: jsonld.toRDF(input: object|string, options: {format:'application/n-quads'|'application/trig', documentLoader?, processingMode?}):Promise<string|object>

3.7 fromRDF
  Signature: jsonld.fromRDF(input: string|object, options: {format:'application/n-quads'|'application/trig', rdfParser?:Function, documentLoader?, processingMode?}):Promise<object>

3.8 registerRDFParser
  Usage:
    jsonld.registerRDFParser(mime: string, parser: sync input=>dataset):void
    jsonld.registerRDFParser(mime: string, parser: async input=>Promise<dataset>):void

3.9 documentLoader
  Default Node loader: jsonld.documentLoaders.node() sets UA 'jsonld.js'
  Default XHR loader: jsonld.documentLoaders.xhr()
  Override by: jsonld.documentLoader = async (url,opts)=>{...}

3.10 Safe Mode
  Add safe:true to options of expand/compact/frame/canonize to fail on lossy operations

4 Testing
  npm test
  TESTS="/path" npm test
  npm run test-karma -- --browsers Firefox,Chrome
  npm run coverage
  REPORTER=dot npm test
  npm run fetch-test-suites
  BENCHMARK=1 npm test
  EARL=earl.jsonld npm test

5 Troubleshooting
  Use custom documentLoader for missing contexts
  Compare native vs JS canonize performance
  Choose appropriate bundle for target environment


## Supplementary Details
Default Values and Options
- processingMode defaults to 'json-ld-1.1'
- documentLoader default: node() or xhr()
- compactArrays default: true
- compactToRelative default: true
- pruneBlankNodeIdentifiers default: false
- embed default: true
- explicit default: false
- omitGraph default: false
- algorithm default for canonize: 'URDNA2015'
- format default for canonize/toRDF/fromRDF: 'application/n-quads'

Implementation Steps
1. Install package
2. Import jsonld
3. Choose bundle or loader
4. Call API methods with required parameters and optional options
5. Handle returned Promise
6. For custom parsing or loading, registerRDFParser or override documentLoader

Example: compact with custom loader
const CONTEXTS={"http://example.com":{"@context":{...}}};
const nodeLoader=jsonld.documentLoaders.node();
jsonld.documentLoader=async(url,opts)=>url in CONTEXTS?{document:CONTEXTS[url],documentUrl:url,contextUrl:null}:nodeLoader(url,opts);
const result=await jsonld.compact(doc,context,{documentLoader:jsonld.documentLoader});

## Reference Details
APIs and SDK Method Signatures

jsonld.compact(input, context, options?)
  input: object | string (URL or JSON-LD document)
  context: object | string (URL or JSON-LD context)
  options:
    documentLoader(url:string, options?): Promise<{document:any, documentUrl:string, contextUrl:string|null}>
    expandContext: object | string
    processingMode: 'json-ld-1.1' | 'json-ld-1.0'
    compactArrays: boolean
    compactToRelative: boolean
    base: string
  returns: Promise<object>
  rejects: on invalid JSON-LD or context errors

jsonld.expand(input, options?)
  input: object | string
  options:
    documentLoader
    expandContext
    processingMode
  returns: Promise<Array<object>>

jsonld.flatten(input, context?, options?)
  input: object | string
  context: object | string
  options: same as expand
  returns: Promise<object>

jsonld.frame(input, frame, options?)
  frame: object | string
  options:
    documentLoader
    pruneBlankNodeIdentifiers: boolean
    embed: boolean
    explicit: boolean
    omitGraph: boolean
    processingMode
  returns: Promise<object>

jsonld.canonize(input, options)
  options:
    algorithm: 'URDNA2015' | 'URGNA2012'
    format: 'application/n-quads' | 'application/trig'
    documentLoader
    processingMode
    useNative: boolean
  returns: Promise<string>

jsonld.toRDF(input, options)
  options:
    format: 'application/n-quads' | 'application/trig'
    documentLoader
    processingMode
  returns: Promise<string | object> // object when dataset option used

jsonld.fromRDF(input, options)
  options:
    format: 'application/n-quads' | 'application/trig'
    rdfParser: (input:any, contentType:string)=>Promise<any>
    documentLoader
    processingMode
  returns: Promise<object>

jsonld.registerRDFParser(contentType, parser)
  contentType: string
  parser: (input:string)=>any | Promise<any>
  returns: void

jsonld.documentLoaders.node()
  returns: (url:string, options?:object)=>Promise<{document:any,documentUrl:string,contextUrl:string|null}>

jsonld.documentLoaders.xhr()
  returns browser loader

Best Practices
- Use safe mode for digital signing: await jsonld.expand(data,{safe:true});
- Prefer esm bundle in modern browsers
- Run JSON-LD API and framing test suites via npm run fetch-test-suites

Troubleshooting Procedures
- Missing @context errors: verify custom documentLoader returns context for known URLs
- CPU-intensive canonize: benchmark can be faster in JS than native, set useNative accordingly

Exact Commands
  npm install jsonld
  npm test
  BENCHMARK=1 TESTS=path/to/manifest.jsonld npm test
  npm run test-karma -- --browsers Chrome,Firefox
  EARL=report.jsonld npm test

## Information Dense Extract
jsonld.compact(input:object|string,context:object|string,options?:{documentLoader,expandContext,processingMode:'json-ld-1.1'|'json-ld-1.0',compactArrays:boolean,compactToRelative:boolean,base:string}):Promise<object>
jsonld.expand(input:object|string,options?:{documentLoader,expandContext,processingMode}):Promise<object[]>
jsonld.flatten(input:object|string,context?:object|string,options?:object):Promise<object>
jsonld.frame(input:object|string,frame:object|string,options?:{documentLoader,pruneBlankNodeIdentifiers:boolean,embed:boolean,explicit:boolean,omitGraph:boolean,processingMode}):Promise<object>
jsonld.canonize(input:object|string,options:{algorithm:'URDNA2015'|'URGNA2012',format:'application/n-quads'|'application/trig',documentLoader?,processingMode?,useNative?:boolean}):Promise<string>
jsonld.toRDF(input:object|string,options:{format:'application/n-quads'|'application/trig',documentLoader?,processingMode?}):Promise<string|object>
jsonld.fromRDF(input:string|object,options:{format:'application/n-quads'|'application/trig',rdfParser?:Function,documentLoader?,processingMode?}):Promise<object>
jsonld.registerRDFParser(contentType:string,parser:sync|async):void
jsonld.documentLoader=nodeLoader|xhrLoader|customLoader
Safe mode: safe:true
Bundles: dist/jsonld.min.js (polyfilled), dist/jsonld.esm.min.js (ESM)
Test: npm test, BENCHMARK=1 TESTS=... npm test, npm run test-karma, EARL=... npm test

## Sanitised Extract
Table of Contents
1 Installation
2 Browser Bundles
3 API Methods
   3.1 compact
   3.2 expand
   3.3 flatten
   3.4 frame
   3.5 canonize
   3.6 toRDF
   3.7 fromRDF
   3.8 registerRDFParser
   3.9 documentLoader
   3.10 Safe Mode
4 Testing
5 Troubleshooting

1 Installation
  npm install jsonld
  const jsonld = require('jsonld');

2 Browser Bundles
  dist/jsonld.min.js (polyfilled)  
  dist/jsonld.esm.min.js (ESM only)  
  script tags: type=module for esm, nomodule for min

3 API Methods
3.1 compact
  Signature: jsonld.compact(input: object|string, context: object|string, options?: {documentLoader, expandContext, processingMode:'json-ld-1.1'|'json-ld-1.0', compactArrays:boolean, compactToRelative:boolean, base:string}):Promise<object>
  Behavior: apply @context to shrink terms

3.2 expand
  Signature: jsonld.expand(input: object|string, options?: {documentLoader, expandContext, processingMode}):Promise<Array<object>>

3.3 flatten
  Signature: jsonld.flatten(input: object|string, context?: object|string, options?: object):Promise<object>

3.4 frame
  Signature: jsonld.frame(input: object|string, frame: object|string, options?: {documentLoader, pruneBlankNodeIdentifiers:boolean, embed:boolean, explicit:boolean, omitGraph:boolean, processingMode}):Promise<object>

3.5 canonize
  Signature: jsonld.canonize(input: object|string, options: {algorithm:'URDNA2015'|'URGNA2012', format:'application/n-quads'|'application/trig', documentLoader?, processingMode?, useNative?:boolean}):Promise<string>

3.6 toRDF
  Signature: jsonld.toRDF(input: object|string, options: {format:'application/n-quads'|'application/trig', documentLoader?, processingMode?}):Promise<string|object>

3.7 fromRDF
  Signature: jsonld.fromRDF(input: string|object, options: {format:'application/n-quads'|'application/trig', rdfParser?:Function, documentLoader?, processingMode?}):Promise<object>

3.8 registerRDFParser
  Usage:
    jsonld.registerRDFParser(mime: string, parser: sync input=>dataset):void
    jsonld.registerRDFParser(mime: string, parser: async input=>Promise<dataset>):void

3.9 documentLoader
  Default Node loader: jsonld.documentLoaders.node() sets UA 'jsonld.js'
  Default XHR loader: jsonld.documentLoaders.xhr()
  Override by: jsonld.documentLoader = async (url,opts)=>{...}

3.10 Safe Mode
  Add safe:true to options of expand/compact/frame/canonize to fail on lossy operations

4 Testing
  npm test
  TESTS='/path' npm test
  npm run test-karma -- --browsers Firefox,Chrome
  npm run coverage
  REPORTER=dot npm test
  npm run fetch-test-suites
  BENCHMARK=1 npm test
  EARL=earl.jsonld npm test

5 Troubleshooting
  Use custom documentLoader for missing contexts
  Compare native vs JS canonize performance
  Choose appropriate bundle for target environment

## Original Source
JSON-LD 1.1 Specification & jsonld.js Implementation
https://github.com/digitalbazaar/jsonld.js#readme

## Digest of JSONLD_JS

# JSON-LD.js API Implementation Documentation

Date Retrieved: 2024-06-15

## Installation

### Node.js + npm

  npm install jsonld
  const jsonld = require('jsonld');

### Browser (bundler) + npm

  npm install jsonld
  import * as jsonld from 'jsonld';
  // ES2017+ support required

### Browser Bundles

  ./dist/jsonld.min.js        // polyfilled, wide browser compatibility
  ./dist/jsonld.esm.min.js    // ES Module browsers, lighter weight

Include via <script type="module" src=".../jsonld.esm.min.js"></script> and <script nomodule src=".../jsonld.min.js"></script>

## Core API Methods and Signatures

### compact(input, context, options)

  Signature:
    jsonld.compact(input: object|string, context: object|string, options?: {
      documentLoader?: (url: string, options?: object) => Promise<{document: any, documentUrl: string, contextUrl: string|null}>,
      expandContext?: object|string,
      processingMode?: 'json-ld-1.1'|'json-ld-1.0',
      compactArrays?: boolean,
      compactToRelative?: boolean,
      base?: string
    }): Promise<object>

  Description:
    Compacts an expanded JSON-LD document using a context.

### expand(input, options)

  Signature:
    jsonld.expand(input: object|string, options?: {
      documentLoader?: Function,
      expandContext?: object|string,
      processingMode?: 'json-ld-1.1'|'json-ld-1.0'
    }): Promise<Array<object>>

  Description:
    Removes contexts, returns array of expanded nodes.

### flatten(input, context?, options?)

  Signature:
    jsonld.flatten(input: object|string, context?: object|string, options?: object): Promise<object>

  Description:
    Flattens a document by merging all graph elements into one.

### frame(input, frame, options?)

  Signature:
    jsonld.frame(input: object|string, frame: object|string, options?: {
      documentLoader?: Function,
      pruneBlankNodeIdentifiers?: boolean,
      embed?: boolean,
      explicit?: boolean,
      omitGraph?: boolean,
      processingMode?: 'json-ld-1.1'|'json-ld-1.0'
    }): Promise<object>

  Description:
    Applies a frame to extract substructure matching the frame.

### canonize(input, options)

  Signature:
    jsonld.canonize(input: object|string, options: {
      algorithm: 'URDNA2015'|'URGNA2012',
      format: 'application/n-quads'|'application/trig',
      documentLoader?: Function,
      processingMode?: 'json-ld-1.1'|'json-ld-1.0',
      useNative?: boolean
    }): Promise<string>

  Description:
    Returns canonical N-Quads string for hashing or comparison.

### toRDF(input, options)

  Signature:
    jsonld.toRDF(input: object|string, options: {
      format: 'application/n-quads'|'application/trig',
      documentLoader?: Function,
      processingMode?: 'json-ld-1.1'|'json-ld-1.0'
    }): Promise<string|object>

  Description:
    Serializes JSON-LD to RDF dataset or N-Quads.

### fromRDF(input, options)

  Signature:
    jsonld.fromRDF(input: string|object, options: {
      format: 'application/n-quads'|'application/trig',
      rdfParser?: (input: any, contentType: string) => Promise<any>,
      documentLoader?: Function,
      processingMode?: 'json-ld-1.1'|'json-ld-1.0'
    }): Promise<object>

  Description:
    Parses RDF/N-Quads into JSON-LD.

### registerRDFParser(contentType, parser)

  Signature(s):
    jsonld.registerRDFParser(contentType: string, parser: (input: string) => any): void
    jsonld.registerRDFParser(contentType: string, parser: (input: string) => Promise<any>): void

  Description:
    Registers a custom synchronous or promise-based RDF parser for given MIME type.

### documentLoaders

  jsonld.documentLoaders.node(): default Node.js loader (uses fetch), sets User-Agent: jsonld.js
  jsonld.documentLoaders.xhr(): default browser XHR loader

  Override:
    jsonld.documentLoader = async (url, options) => { if(url in CONTEXTS) return {document: CONTEXTS[url], documentUrl: url, contextUrl: null}; return nodeLoader(url, options); };

### Safe Mode

  Option `safe: true` in expand, compact, frame, canonize to throw on lossy constructs.

## Testing and Tooling

### Running Tests

  npm test
  TESTS="/path/to/suites1 /path/to/suites2" npm test
  npm run test-karma -- --browsers Firefox,Chrome
  npm run coverage
  REPORTER=dot npm test

### Fetch External Test Suites

  npm run fetch-test-suites  // clones into test-suites dir

### EARL Reports

  EARL=earl-node.jsonld npm test
  EARL=earl-firefox.jsonld npm run test-karma -- --browser Firefox

## Troubleshooting

- If missing context URLs, use custom documentLoader.
- For native canonize failures, benchmark and decide useNative flag.
- For performance, disable polyfills by using esm bundle.
- Check TEST_ENV and BENCHMARK flags in test.js for environment control.


## Attribution
- Source: JSON-LD 1.1 Specification & jsonld.js Implementation
- URL: https://github.com/digitalbazaar/jsonld.js#readme
- License: License
- Crawl Date: 2025-04-28T03:09:37.048Z
- Data Size: 632028 bytes
- Links Found: 4838

## Retrieved
2025-04-28

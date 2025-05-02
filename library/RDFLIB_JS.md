# RDFLIB_JS

## Crawl Summary
rdflib.js v2.2.35: Browser and Node JavaScript RDF library. Install via npm install rdflib. Core classes: graph() -> IndexedFormula, Fetcher(store, options) with load(uri, options), UpdateManager(store) with update(deletions, insertions, onDone, onError). Supports parsing RDF/XML, Turtle, N3, RDFa, JSON-LD via store.parse. Build with webpack: npm run build and npm run build:browser. Node requires xhr2 polyfill for XMLHttpRequest.

## Normalised Extract
Table of Contents

1 Installation Commands
2 Directory Structure
3 Core Classes and Usage
4 Method Signatures
5 Supported Parse Formats
6 Node.js Polyfills
7 Build Scripts

1 Installation Commands
  npm install rdflib
  npm install --save rdflib (Node.js)

2 Directory Structure
  dist/   Bundled output via npm run build:browser
  src/    Library source
  lib/    Transpiled library for npm publish
  test/   Test suite files

3 Core Classes and Usage
  graph() returns an IndexedFormula RDF store
  new Fetcher(store, options) attaches HTTP fetcher with retry and timeout
  new UpdateManager(store) enables SPARQL/Update patch operations

4 Method Signatures
  graph(): IndexedFormula
  Fetcher.load(uri, options): Promise<Response>
    options.force: boolean
    options.cache: default|no-cache
    options.timeout: number (ms)
  UpdateManager.update(deletions[], insertions[], onDone(uri, ok, message), onError(uri, error)): void
  store.parse(text, base, contentType, callback(err, kb, stats)): void

5 Supported Parse Formats
  application/rdf+xml
  text/turtle
  application/n3, text/n3
  application/ld+json
  text/html (RDFa)

6 Node.js Polyfills
  Install xhr2: npm install xhr2
  In Node entry: global.XMLHttpRequest = require('xhr2')

7 Build Scripts
  npm run build
  npm run build:browser


## Supplementary Details
FetcherOptions default values:
  fetch: global fetch (window.fetch in browsers)
  timeout: 5000 ms
  maxRetries: 0

LoadOptions defaults:
  force: false
  cache: 'default'

UpdateManager steps:
  1. Construct: updater = new UpdateManager(store)
  2. Prepare deletions and insertions as arrays of Statement
  3. Call updater.update(deletions, insertions, onDone, onError)
    onDone receives request URI, boolean success, response message
    onError receives request URI and Error object

Parsing usage:
  store.parse(serializedData, baseUri, mimeType, (err, graph, stats) => { if (err) throw err; })

Implementation notes:
  - Use TTL or JSON-LD content types when calling Fetcher.load
  - For RDFa support, contentType text/html triggers RDFa parser

Best practice:
  - Use custom fetch in Node: new Fetcher(store, { fetch: require('node-fetch') })
  - Handle fetch errors with LoadOptions.force to bypass cache

Troubleshooting:
  - Error: XMLHttpRequest not defined: install xhr2 polyfill
  - Load timeout: increase FetcherOptions.timeout
  - SPARQL patch failures: verify UpdateManager callbacks

## Reference Details
API Specifications:

IndexedFormula (graph)
  Signature: graph(): IndexedFormula
  Methods: 
    add(subject: NamedNode|BlankNode, predicate: NamedNode, object: Term, why?: NamedNode): Statement
    each(subject?: Term, predicate?: Term, object?: Term, graph?: Term): Term[]
    remove(statement: Statement): void

Fetcher
  Constructor: new Fetcher(store: IndexedFormula, options?: { fetch?: Function; timeout?: number; maxRetries?: number })
  Methods:
    load(uri: string|NamedNode, options?: { force?: boolean; cache?: 'default'|'no-cache'; timeout?: number }): Promise<Response>
    nowOrWhenFetched(uri: string|NamedNode, options: any, callback: (ok: boolean, body: any) => void): void

UpdateManager
  Constructor: new UpdateManager(store: IndexedFormula)
  Methods:
    update(deletions: Statement[], insertions: Statement[], onDone: (uri: string, ok: boolean, message: string) => void, onError: (uri: string, error: Error) => void): void

Parser
  parse(text: string, base: string, contentType: string, callback: (err: Error|null, kb: IndexedFormula, stats: any) => void): void

Constants
  Namespace shortcuts in rdf namespace: rdf.sym, rdf.literal, rdf.blankNode

Code Examples:

Browser usage example:
  import * as $rdf from 'rdflib'
  const store = $rdf.graph()
  const fetcher = new $rdf.Fetcher(store, { fetch: window.fetch, timeout: 10000 })
  const updater = new $rdf.UpdateManager(store)

  fetcher.load('https://example.com/data.ttl', { force: true })
    .then(resp => {
      store.each(undefined, undefined, undefined).forEach(quad => console.log(quad))
    })
    .catch(err => console.error('Fetch error', err))

  const del = [ new $rdf.Statement($rdf.sym('https://example.com#s'), $rdf.sym('https://example.com#p'), $rdf.literal('old')) ]
  const ins = [ new $rdf.Statement($rdf.sym('https://example.com#s'), $rdf.sym('https://example.com#p'), $rdf.literal('new')) ]
  updater.update(del, ins,
    (uri, ok, msg) => { if(ok) console.log('Update OK', uri) },
    (uri, err) => { console.error('Update ERR', err) }
  )

Node.js usage example:
  const $rdf = require('rdflib')
  global.XMLHttpRequest = require('xhr2')
  const fetch = require('node-fetch')
  const store = $rdf.graph()
  const fetcher = new $rdf.Fetcher(store, { fetch })

  store.parse(turtleString, baseUri, 'text/turtle', (err, graph) => { if(err) throw err })

Troubleshooting Procedures:
  1. XMLHttpRequest not defined
     Command: npm install xhr2
     In code: global.XMLHttpRequest = require('xhr2')
  2. Load timeout errors
     Action: new Fetcher(store, { timeout: 20000 })
  3. SPARQL patch HTTP 405
     Verify server supports SPARQL/Update; use fetcher.load before update; check CORS and authentication

Configuration Options:
  FetcherOptions.fetch: Function, default fetch
  FetcherOptions.timeout: number ms, default 5000
  FetcherOptions.maxRetries: number, default 0
  LoadOptions.force: boolean, default false
  LoadOptions.cache: 'default'|'no-cache', default 'default'

Best Practices:
  - Use stateless graphs per user session
  - Preload namespaces in store with store.namespace('foaf','http://xmlns.com/foaf/0.1/')
  - Use asynchronous patterns with async/await:
      await fetcher.load(uri)
      const triples = store.match(null, null, null)
  - Handle UpdateManager errors with onError callback


## Information Dense Extract
graph():IndexedFormula; Fetcher(store, {fetch:Function,timeout:5000,maxRetries:0}); Fetcher.load(uri:string|NamedNode, {force:boolean,cache:'default'|'no-cache',timeout:number}):Promise<Response>; UpdateManager(store); UpdateManager.update(deletions:Statement[],insertions:Statement[],onDone(uri:string,ok:boolean,message:string),onError(uri:string,error:Error)):void; store.parse(text:string,base:string,contentType:string,callback(err,graph,stats)):void; Supported contentTypes: application/rdf+xml,text/turtle,application/n3,text/n3,application/ld+json,text/html; Installation: npm install rdflib; Browser build: npm run build:browser; Node polyfill: npm install xhr2; global.XMLHttpRequest=require('xhr2')

## Sanitised Extract
Table of Contents

1 Installation Commands
2 Directory Structure
3 Core Classes and Usage
4 Method Signatures
5 Supported Parse Formats
6 Node.js Polyfills
7 Build Scripts

1 Installation Commands
  npm install rdflib
  npm install --save rdflib (Node.js)

2 Directory Structure
  dist/   Bundled output via npm run build:browser
  src/    Library source
  lib/    Transpiled library for npm publish
  test/   Test suite files

3 Core Classes and Usage
  graph() returns an IndexedFormula RDF store
  new Fetcher(store, options) attaches HTTP fetcher with retry and timeout
  new UpdateManager(store) enables SPARQL/Update patch operations

4 Method Signatures
  graph(): IndexedFormula
  Fetcher.load(uri, options): Promise<Response>
    options.force: boolean
    options.cache: default|no-cache
    options.timeout: number (ms)
  UpdateManager.update(deletions[], insertions[], onDone(uri, ok, message), onError(uri, error)): void
  store.parse(text, base, contentType, callback(err, kb, stats)): void

5 Supported Parse Formats
  application/rdf+xml
  text/turtle
  application/n3, text/n3
  application/ld+json
  text/html (RDFa)

6 Node.js Polyfills
  Install xhr2: npm install xhr2
  In Node entry: global.XMLHttpRequest = require('xhr2')

7 Build Scripts
  npm run build
  npm run build:browser

## Original Source
rdflib.js (Linked Data Library for JavaScript)
https://github.com/linkeddata/rdflib.js

## Digest of RDFLIB_JS

# Source: rdflib.js README (retrieved 2024-06-11)
Data Size: 553696 bytes, Links Found: 4713

# Installation

## Browser (bundler)

1. Add to project: npm install rdflib
2. In code: import * as $rdf from 'rdflib'
3. Build dist: npm run build:browser (generates dist/rdflib.min.js)

## Node.js

1. Ensure Node and npm installed
2. Install module: npm install --save rdflib
3. Polyfill XMLHttpRequest for Node: npm install xhr2; in entry point set global.XMLHttpRequest = require('xhr2')
4. Import: const $rdf = require('rdflib')

# Core API

## graph()

Signature: graph(): IndexedFormula
Returns a new in-memory RDF graph (IndexedFormula).

## Fetcher

Constructor: new Fetcher(store: IndexedFormula, options?: FetcherOptions)
FetcherOptions:
  fetch: Function (default window.fetch or global fetch)
  timeout: number (ms, default 5000)
  maxRetries: number (default 0)

Methods:
  load(uri: string|NamedNode, options?: LoadOptions): Promise<Response>
  LoadOptions:
    force: boolean (default false)
    cache: 'default'|'no-cache' (default 'default')
    timeout: number (ms)

## UpdateManager

Constructor: new UpdateManager(store: IndexedFormula)

Methods:
  update(deletions: Statement[], insertions: Statement[], onDone: (uri: string, ok: boolean, message: string) => void, onError: (uri: string, error: Error) => void): void

# Parsers Supported

rdf.parse(text: string, base: string, contentType: string, callback: (err: Error|null, kb: IndexedFormula, stats: ParseStats) => void)

Content-Type values:
  'application/rdf+xml'  
  'text/turtle'  
  'application/n3'  
  'text/n3'  
  'application/ld+json'  
  'text/html' (for RDFa)

# Directory layout

dist/    Bundled libraries (build output)  
test/    Test suite files  
src/     Source TypeScript/JavaScript files  
lib/     Transpiled non-bundled library (npm publish)

# Scripts

npm run build           Transpile and bundle with webpack
npm run build:browser   Build standalone browser bundle
npm test                Run test suite

# Dependencies

- XMLHttpRequest polyfill for Node (xhr2)

# Attribution

LinkedData team & TimBL
MIT license

## Attribution
- Source: rdflib.js (Linked Data Library for JavaScript)
- URL: https://github.com/linkeddata/rdflib.js
- License: MIT License
- Crawl Date: 2025-05-02T09:47:02.790Z
- Data Size: 553696 bytes
- Links Found: 4713

## Retrieved
2025-05-02

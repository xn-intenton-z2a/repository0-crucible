# RDFLIBJS_SETUP

## Crawl Summary
Installation commands for browser and Node.js environments; build steps for dist; directory structure of dist, test, lib; Node.js XMLHTTPRequest dependency; core capabilities: serialization formats, Linked Data client, collaboration, local store API, SPARQL graph-match, OWL sameAs smushing, provenance metadata retention

## Normalised Extract
Table of Contents:
  1. Installation
  2. Build for Browser
  3. Node.js Setup
  4. Directory Structure
  5. Dependency Requirements
  6. Core Capabilities

1. Installation
  - Browser via npm: npm install rdflib
  - Browser via script tag: clone repo, npm install, npm run build:browser
  - Node.js: npm install --save rdflib

2. Build for Browser
  - Command: npm run build:browser
  - Output: dist/ contains bundled rdflib.js and rdflib.min.js

3. Node.js Setup
  - Prerequisite: Node.js and npm installed
  - xmlhttprequest: use xhr2 or node-fetch polyfill
  - Install: npm install --save rdflib

4. Directory Structure
  - dist/: Bundled output for browsers
  - test/: Contains Mocha/Chai tests
  - lib/: Transpiled ES5 modules for package distribution

5. Dependency Requirements
  - Requires XMLHTTPRequest global in Node.js
    • Use xhr2 package: npm install xhr2
    • Set global.XMLHttpRequest = require('xhr2')

6. Core Capabilities
  - Formats: RDF/XML, Turtle, N3, RDFa, JSON-LD
  - Linked Data client: WebDAV and SPARQL/Update transports
  - Collaboration: websocket & HTTP PATCH support
  - Local store: graph-match API with .match() and optional patterns
  - OWL support: smushing sameAs, function/inverseFunction
  - Provenance: includes HTTP fetch metadata as RDF triples

## Supplementary Details
Installation Steps:
  • npm install rdflib              # for bundler
  • git clone https://github.com/linkeddata/rdflib.js.git
    cd rdflib.js
    npm install
    npm run build:browser          # produces dist/
  • npm install --save rdflib      # for Node.js

Browser Bundler Config:
  • webpack.config.js entry: require('rdflib')
  • import: import $rdf from 'rdflib';

Node.js Polyfill:
  • npm install xhr2
  • In entry file:
      const XHR = require('xhr2');
      global.XMLHttpRequest = XHR;
      const $rdf = require('rdflib');

Directory Usage:
  • dist/rdflib.js         # include via <script src>
  • dist/rdflib.min.js     # minified version
  • lib/                   # require('rdflib') resolves to lib/

Dependency:
  • XMLHTTPRequest
    - Default global in browsers
    - Polyfill required in Node.js

## Reference Details
Installation Commands:
  npm install rdflib
  npm install --save rdflib
  npm run build:browser

Directories:
  dist/      # bundled outputs
    ├ rdflib.js
    └ rdflib.min.js
  lib/       # transpiled modules for npm
  test/      # test suites

Node.js Polyfill Example:
  const XHR = require('xhr2');
  global.XMLHttpRequest = XHR;
  const $rdf = require('rdflib');

Basic Usage Example:
  const $rdf = require('rdflib');
  const store = $rdf.graph();
  const fetcher = new $rdf.Fetcher(store, {fetch: fetch});
  fetcher.load('http://example.org/data.ttl')
    .then(response => {
      const statements = store.match(undefined, undefined, undefined);
      console.log(statements.length + ' triples loaded');
    })
    .catch(err => console.error('Fetch error', err));

Configuration Options:
  Fetcher(options):
    - fetch: custom fetch implementation (default: global.fetch or XMLHttpRequest)
    - timeout: milliseconds before abort
    - withCredentials: boolean for XHR credentials

Best Practices:
  - Polyfill XMLHttpRequest in Node.js before requiring rdflib
  - Use bundler to tree-shake unused modules
  - Handle CORS and SPARQL endpoints via UpdateManager

Troubleshooting:
  Issue: 'XMLHttpRequest is not defined'
    • Install xhr2
    • In code: global.XMLHttpRequest = require('xhr2')
  Issue: CORS error
    • Configure server to allow Access-Control-Allow-Origin
    • Use proxy or CORs in SPARQL endpoint


## Information Dense Extract
npm install rdflib; npm run build:browser; npm install --save rdflib; polyfill XMLHttpRequest in Node.js via xhr2; dist/ contains rdflib.js and rdflib.min.js; lib/ for ES5 modules; test/ for automated tests; formats: RDF/XML, Turtle, N3, RDFa, JSON-LD; transports: WebDAV, SPARQL/Update; API: $rdf.graph(), new $rdf.Fetcher(store,{fetch,timeout,withCredentials}); store.match(s,p,o,g); OWL smushing sameAs and functionProperty; provenance: HTTP metadata in RDF; troubleshoot: install xhr2, set global.XMLHttpRequest; configure CORS headers.

## Sanitised Extract
Table of Contents:
  1. Installation
  2. Build for Browser
  3. Node.js Setup
  4. Directory Structure
  5. Dependency Requirements
  6. Core Capabilities

1. Installation
  - Browser via npm: npm install rdflib
  - Browser via script tag: clone repo, npm install, npm run build:browser
  - Node.js: npm install --save rdflib

2. Build for Browser
  - Command: npm run build:browser
  - Output: dist/ contains bundled rdflib.js and rdflib.min.js

3. Node.js Setup
  - Prerequisite: Node.js and npm installed
  - xmlhttprequest: use xhr2 or node-fetch polyfill
  - Install: npm install --save rdflib

4. Directory Structure
  - dist/: Bundled output for browsers
  - test/: Contains Mocha/Chai tests
  - lib/: Transpiled ES5 modules for package distribution

5. Dependency Requirements
  - Requires XMLHTTPRequest global in Node.js
     Use xhr2 package: npm install xhr2
     Set global.XMLHttpRequest = require('xhr2')

6. Core Capabilities
  - Formats: RDF/XML, Turtle, N3, RDFa, JSON-LD
  - Linked Data client: WebDAV and SPARQL/Update transports
  - Collaboration: websocket & HTTP PATCH support
  - Local store: graph-match API with .match() and optional patterns
  - OWL support: smushing sameAs, function/inverseFunction
  - Provenance: includes HTTP fetch metadata as RDF triples

## Original Source
rdflib.js RDF Library
https://github.com/linkeddata/rdflib.js#readme

## Digest of RDFLIBJS_SETUP

# Installation

Browser (with Webpack or similar bundler)

  npm install rdflib

Browser (<script> tag)

  git clone git@github.com:linkeddata/rdflib.js.git
  cd rdflib.js
  npm install
  npm run build:browser

Node.js

  Ensure Node.js and npm installed
  npm install --save rdflib

# Subdirectories

dist
  Bundled libraries output by npm run build

test
  Automated test suites

lib
  Transpiled, non-bundled library published to npm

# Dependencies

Node.js version must provide XMLHTTPRequest implementation (use xhr2 or node-fetch polyfill)

# Features Overview

Reads RDF/XML, Turtle, N3; parses RDFa and JSON-LD
Linked Data client over WebDAV or SPARQL/Update
Real-time collaborative editing via WebSockets and HTTP PATCH
Local in-memory store with graph-match SPARQL (basic), optional matches
OWL inferencing: sameAs and function/inverseFunction smushing
Provenance tracking: retains HTTP response metadata in RDF

## Attribution
- Source: rdflib.js RDF Library
- URL: https://github.com/linkeddata/rdflib.js#readme
- License: License
- Crawl Date: 2025-04-27T08:49:21.346Z
- Data Size: 614386 bytes
- Links Found: 5414

## Retrieved
2025-04-27

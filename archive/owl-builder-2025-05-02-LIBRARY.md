library/JSONLD_JS.md
# library/JSONLD_JS.md
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
library/GLOBAL_FETCH.md
# library/GLOBAL_FETCH.md
# GLOBAL_FETCH

## Crawl Summary
fetch(input: string|Request, init?: RequestInit): Promise<Response>  Supports streaming bodies (duplex: "half"), JSON/text/blob/formData parsing, and cancellation via AbortController. RequestInit properties: method, headers, body, signal, duplex. Response properties: status, statusText, headers, ok, redirected, type, body. Body mixin methods: arrayBuffer, blob, formData, json, text. Headers API: construct, append, delete, get, has, set, forEach.

## Normalised Extract
Table of Contents:
1. fetch function
2. Request class
3. Response class
4. Headers class
5. Body mixin APIs
6. AbortSignal cancellation

1. fetch function
Signature: fetch(input: string|URL|Request, init?: { method: string; headers: HeadersInit; body: BodyInit|null; signal: AbortSignal; duplex?: "half" }): Promise<Response>

2. Request class
Constructor: new Request(input: string|URL|Request, init?: RequestInit)
Properties: method, headers, body, signal, duplex; Methods: clone(): Request

3. Response class
Constructor: new Response(body?: BodyInit|null, init?: ResponseInit)
Properties: status:number, statusText:string, headers:Headers, ok:boolean, redirected:boolean, type:string; Methods: clone(), arrayBuffer(), blob(), formData(), json(), text()

4. Headers class
Constructor: new Headers(init?: HeadersInit)
Methods: append(name:string,value:string), delete(name:string), get(name:string):string|null, has(name:string):boolean, set(name:string,value:string), forEach(callback)

5. Body mixin APIs
bodyUsed:boolean; body: ReadableStream; arrayBuffer():Promise<ArrayBuffer>; blob():Promise<Blob>; formData():Promise<FormData>; json():Promise<any>; text():Promise<string>

6. AbortSignal cancellation
Use AbortController: const c=new AbortController(); pass c.signal in fetch; c.abort(reason); check signal.aborted and signal.reason.


## Supplementary Details
Supported Node.js versions: v18.0.0+ (no flags required). Legacy support: v17+, behind --experimental-fetch. RequestInit.duplex must be "half" for streaming request bodies. Default redirect: 'follow'. Default mode: 'cors'. Default credentials: 'same-origin'. Default cache: 'default'. Default referrer: 'client'. Error handling: network failures throw TypeError, HTTP errors do not throw. Keep-alive: automatic. Max redirects: 20.

## Reference Details
fetch API:
  fetch(input: string|URL|Request, init?: RequestInit): Promise<Response>
  type RequestInit = {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit|null;
    signal?: AbortSignal;
    duplex?: "half";
  }
  type ResponseInit = {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
  }

Request class:
  constructor(input: string|URL|Request, init?: RequestInit)
  properties: method:string; headers:Headers; body:ReadableStream|null; signal:AbortSignal; duplex?:"half"; clone():Request

Response class:
  constructor(body?:BodyInit|null, init?:ResponseInit)
  static error():Response
  static redirect(url:string,status?: number):Response
  properties: status:number; statusText:string; headers:Headers; ok:boolean; redirected:boolean; type:"basic"|"cors"|"default"|"error"|"opaque"|"opaqueredirect"; body:ReadableStream|null; clone():Response
  methods: arrayBuffer():Promise<ArrayBuffer>; blob():Promise<Blob>; formData():Promise<FormData>; json():Promise<any>; text():Promise<string>

Headers API:
  constructor(init?: HeadersInit)
  append(name:string,value:string):void
  delete(name:string):void
  get(name:string):string|null
  has(name:string):boolean
  set(name:string,value:string):void
  forEach(callback:(value:string,name:string,headers:Headers)=>void):void

Implementation example:
  import {AbortController} from 'node:abort_controller';
  const controller=new AbortController();
  try {
    const res=await fetch('https://api.example.com/data',{
      method:'POST',
      headers:new Headers({'Content-Type':'application/json'}),
      body:JSON.stringify({key:'value'}),
      signal:controller.signal,
      duplex:'half'
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data=await res.json();
  } catch(e) {
    if (controller.signal.aborted) console.error('Request aborted', controller.signal.reason);
    else console.error('Fetch error', e);
  }

Troubleshooting:
  Command: node --trace-warnings yourScript.js  to trace experimental fetch warnings.
  Network error: TypeError: network request failed. Use dns.lookup to verify DNS resolution.
  To enable streaming uploads, set duplex:'half' or omit for non-streaming.


## Information Dense Extract
fetch(input:string|URL|Request,init?:{method?:string;headers?:HeadersInit;body?:BodyInit|null;signal?:AbortSignal;duplex?:"half";}):Promise<Response>; RequestInit.defaults: method='GET',headers={},body=null,redirect='follow',credentials='same-origin',cache='default',mode='cors',referrer='client'; Request: constructor(input,init), props(method,headers,body,signal,duplex), clone(); Response: constructor(body,init), static error(),static redirect(), props(status,statusText,headers,ok,redirected,type,body), methods(clone,arrayBuffer,blob,formData,json,text); Headers: constructor(init), append,delete,get,has,set,forEach; Body mixin: bodyUsed:boolean, methods(arrayBuffer,blob,formData,json,text); AbortController: signal for cancellation; Node.js v18+ no flags; v17 behind --experimental-fetch; streaming: duplex='half'; errors: network->TypeError, HTTP->no throw.

## Sanitised Extract
Table of Contents:
1. fetch function
2. Request class
3. Response class
4. Headers class
5. Body mixin APIs
6. AbortSignal cancellation

1. fetch function
Signature: fetch(input: string|URL|Request, init?: { method: string; headers: HeadersInit; body: BodyInit|null; signal: AbortSignal; duplex?: 'half' }): Promise<Response>

2. Request class
Constructor: new Request(input: string|URL|Request, init?: RequestInit)
Properties: method, headers, body, signal, duplex; Methods: clone(): Request

3. Response class
Constructor: new Response(body?: BodyInit|null, init?: ResponseInit)
Properties: status:number, statusText:string, headers:Headers, ok:boolean, redirected:boolean, type:string; Methods: clone(), arrayBuffer(), blob(), formData(), json(), text()

4. Headers class
Constructor: new Headers(init?: HeadersInit)
Methods: append(name:string,value:string), delete(name:string), get(name:string):string|null, has(name:string):boolean, set(name:string,value:string), forEach(callback)

5. Body mixin APIs
bodyUsed:boolean; body: ReadableStream; arrayBuffer():Promise<ArrayBuffer>; blob():Promise<Blob>; formData():Promise<FormData>; json():Promise<any>; text():Promise<string>

6. AbortSignal cancellation
Use AbortController: const c=new AbortController(); pass c.signal in fetch; c.abort(reason); check signal.aborted and signal.reason.

## Original Source
Node.js Global Fetch API
https://nodejs.org/api/globals.html#fetch

## Digest of GLOBAL_FETCH

# Global Fetch API

## fetch(input, init)

Signature:

    fetch(input: string | Request, init?: RequestInit): Promise<Response>

Parameters:

    input       string | URL | Request  Resource URL or Request object
    init        RequestInit (optional)    { method, headers, body, signal, duplex }

Returns:

    Promise<Response>

Description:

    Performs HTTP(S) requests, following the WHATWG Fetch standard. Supports streaming bodies and cancellation via AbortSignal.

## Request

### constructor Request(input, init)

    new Request(input: string | URL | Request, init?: RequestInit)

Properties:

    Request.method      string    HTTP method
    Request.headers     Headers   Request header list
    Request.body        ReadableStream<Uint8Array> | null
    Request.signal      AbortSignal
    Request.duplex      "half" | undefined  Required for streaming uploads
    Request.clone(): Request

## Response

### constructor Response(body?, init)

    new Response(body?: BodyInit | null, init?: ResponseInit)

Properties:

    Response.status          number
    Response.statusText      string
    Response.headers         Headers
    Response.ok              boolean (status in 200–299)
    Response.redirected      boolean
    Response.type            "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect"

Methods:

    Response.clone(): Response
    Response.arrayBuffer(): Promise<ArrayBuffer>
    Response.blob(): Promise<Blob>
    Response.json(): Promise<any>
    Response.text(): Promise<string>
    Response.formData(): Promise<FormData>
    Response.body: ReadableStream<Uint8Array> | null

## Headers

### constructor Headers(init?)

    new Headers(): empty header list
    new Headers(record: Record<string,string>): header list
    new Headers(headers: Headers): copy

Methods:

    headers.append(name: string, value: string): void
    headers.delete(name: string): void
    headers.get(name: string): string | null
    headers.has(name: string): boolean
    headers.set(name: string, value: string): void
    headers.forEach(callback): void

## Body mixin

Properties:

    bodyUsed: boolean
    body: ReadableStream<Uint8Array> | null

Methods:

    arrayBuffer(): Promise<ArrayBuffer>
    blob(): Promise<Blob>
    formData(): Promise<FormData>
    json(): Promise<any>
    text(): Promise<string>

## AbortSignal cancellation

Properties:

    signal.aborted: boolean
    signal.reason: any

Usage:

    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
    controller.abort(reason)


## Attribution
- Source: Node.js Global Fetch API
- URL: https://nodejs.org/api/globals.html#fetch
- License: License
- Crawl Date: 2025-05-02T05:47:15.799Z
- Data Size: 3636206 bytes
- Links Found: 3047

## Retrieved
2025-05-02
library/FS_PROMISES_API.md
# library/FS_PROMISES_API.md
# FS_PROMISES_API

## Crawl Summary
Import FS Promises via import or require. Methods return promises. Core methods: access, open, readFile, writeFile, readdir, mkdir, copyFile, unlink. FileHandle methods include read, write, appendFile, chmod, chown, utimes, datasync, sync, truncate, stat, close, streams. Default values: encoding utf8, mode 0o666/0o777, flag w/a, recursive false. Supports AbortSignal. Underlying libuv threadpool; operations off main event loop. Concurrency caution: not threadsafe.

## Normalised Extract
Table of Contents
1 Importing
2 Core FS Operations
3 FileHandle Methods
4 Streams
5 Configuration Defaults
6 Concurrency Considerations

1 Importing
Use either import * as fs from 'node:fs/promises' or const fs = require('node:fs/promises').

2 Core FS Operations
fs.access(path, mode) => Promise<void>
fs.open(path, flags, mode) => Promise<FileHandle>
fs.readFile(path, options) => Promise<Buffer|string>
fs.writeFile(file, data, options) => Promise<void>
fs.readdir(path, options) => Promise<string[]|Dirent[]>
fs.mkdir(path, options) => Promise<void>
fs.copyFile(src, dest, mode) => Promise<void>
fs.unlink(path) => Promise<void>

3 FileHandle Methods
.read(buffer, offset, length, position) => Promise<{bytesRead,buffer}>
.readFile(options) => Promise<Buffer|string>
.write(buffer, offset, length, position) => Promise<{bytesWritten,buffer}>
.writeFile(data, options) => Promise<void>
.appendFile(data, options) => Promise<void>
.chmod(mode) => Promise<void>
.chown(uid, gid) => Promise<void>
.utimes(atime, mtime) => Promise<void>
.datasync() => Promise<void>
.sync() => Promise<void>
.truncate(len) => Promise<void>
.stat(options) => Promise<fs.Stats>
.close() => Promise<void>

4 Streams
filehandle.createReadStream({start,end,highWaterMark,encoding,autoClose,emitClose,signal}) => fs.ReadStream
filehandle.createWriteStream({start,highWaterMark,encoding,autoClose,emitClose,flush,signal}) => fs.WriteStream

5 Configuration Defaults
encoding: 'utf8'
mode for open/writeFile: 0o666
flag for writeFile: 'w'
flag for appendFile: 'a'
fs.mkdir recursive: false, mode 0o777
AbortSignal: optional signal property to abort requests

6 Concurrency Considerations
Threadpool size: UV_THREADPOOL_SIZE (default 4)
Avoid concurrent write operations to same file
Always close handles to prevent leaks
Do not use fs.access before open; catch errors instead

## Supplementary Details
Default Encoding and Flags
• readFile: encoding null => Buffer, encoding string => string
• writeFile: encoding 'utf8', mode 0o666, flag 'w', flush false
• appendFile: flag 'a', mode 0o666, flush false
• mkdir: recursive false, mode 0o777
AbortSignal Support
Pass signal property in options to cancel in-progress operations. Promise rejects with AbortError.
Threadpool and Performance
Default libuv threadpool size 4. To increase concurrency set UV_THREADPOOL_SIZE environment variable before node startup. Use streams for large files to minimize memory overhead.
Race Condition Mitigation
Avoid fs.access for existence checks; directly call open/read/write and handle EEXIST, ENOENT, EACCES errors. Use atomic rename patterns: write to temp file then fs.rename.
Proper Resource Cleanup
Use try/finally around fs.open and filehandle.close. Use for-await-of patterns with filehandle.readableWebStream when processing streams.
Platform Notes
On Linux, pwrite options ignored in append mode; data always appended. start/end inclusive in createReadStream. character device reads block until data available.

## Reference Details
--- Promises API---
fs.access(path: string|Buffer|URL, mode?: number): Promise<void>
fs.open(path: string|Buffer|URL, flags?: string, mode?: number): Promise<FileHandle>
fs.readFile(path: string|Buffer|URL, options?: {encoding?: string|null; signal?: AbortSignal}|string): Promise<Buffer|string>
fs.writeFile(file: string|Buffer|URL|FileHandle, data: string|Buffer|AsyncIterable|Iterable|Stream, options?: {encoding?: string|null; mode?: number; flag?: string; signal?: AbortSignal} | string): Promise<void>
fs.readdir(path: string|Buffer|URL, options?: {encoding?: string; withFileTypes?: boolean}): Promise<string[]|Buffer[]|Dirent[]>
fs.mkdir(path: string|Buffer|URL, options?: {recursive?: boolean; mode?: number}): Promise<void>
fs.copyFile(src: string|Buffer|URL, dest: string|Buffer|URL, mode?: number): Promise<void>
fs.unlink(path: string|Buffer|URL): Promise<void>

--- FileHandle Methods ---
interface FileHandle {
  read(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|bigint|null): Promise<{bytesRead: number; buffer: Buffer|TypedArray|DataView}>
  read(options?: {buffer?: Buffer|TypedArray|DataView; offset?: number; length?: number; position?: number|bigint|null}): Promise<{bytesRead: number; buffer: Buffer|TypedArray|DataView}>
  readFile(options?: {encoding?: string|null; signal?: AbortSignal}|string): Promise<Buffer|string>
  write(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|null): Promise<{bytesWritten: number; buffer: Buffer|TypedArray|DataView}>
  write(buffer: Buffer|TypedArray|DataView, options?: {offset?: number; length?: number; position?: number}): Promise<{bytesWritten: number; buffer: Buffer|TypedArray|DataView}>
  write(string: string, position?: number|null, encoding?: string): Promise<{bytesWritten: number; buffer: string}>
  writeFile(data: string|Buffer|AsyncIterable|Iterable|Stream, options?: {encoding?: string|null; mode?: number; flag?: string; signal?: AbortSignal} | string): Promise<void>
  appendFile(data: string|Buffer|AsyncIterable|Iterable|Stream, options?: {encoding?: string|null; signal?: AbortSignal} | string): Promise<void>
  createReadStream(options?: {start?: number; end?: number; highWaterMark?: number; encoding?: string; autoClose?: boolean; emitClose?: boolean; signal?: AbortSignal}): ReadStream
  createWriteStream(options?: {start?: number; highWaterMark?: number; encoding?: string; autoClose?: boolean; emitClose?: boolean; flush?: boolean; signal?: AbortSignal}): WriteStream
  chmod(mode: number): Promise<void>
  chown(uid: number, gid: number): Promise<void>
  utimes(atime: number|string|Date, mtime: number|string|Date): Promise<void>
  datasync(): Promise<void>
  sync(): Promise<void>
  truncate(len?: number): Promise<void>
  stat(options?: {bigint?: boolean}): Promise<fs.Stats>
  close(): Promise<void>
  [Symbol.asyncDispose](): Promise<void>
}

--- Code Examples and Patterns ---
// Safe read with cleanup
async function readText(path) {
  const fh = await fs.open(path,'r')
  try {
    return await fh.readFile({encoding:'utf8'})
  } finally {
    await fh.close()
  }
}

// Streaming large file
async function processLines(path) {
  const fh = await fs.open(path,'r')
  try {
    for await (const line of fh.readLines()) {
      console.log(line)
    }
  } finally {
    await fh.close()
  }
}

--- Best Practices ---
• Use for-await-of with fs.glob or filehandle.readLines for large sets
• Avoid fs.access; directly open and catch errors
• Pass AbortSignal to cancel slow operations
• Set UV_THREADPOOL_SIZE=8 for high I/O concurrency
• Always close FileHandle in finally block

--- Troubleshooting ---
EMFILE: Too many open files
  ulimit -n 4096
  export UV_THREADPOOL_SIZE=8
  lsof -p $(pgrep node)
ENOENT: File not found
  Verify path via console.log and path.resolve
  Use fs.mkdir with recursive true to create directories
EACCES: Permission denied
  Check permissions with ls -l
  fs.chmod('path',0o666)


## Information Dense Extract
import fs from 'node:fs/promises'; fs.access(path,mode=F_OK):Promise<void>; fs.open(path,flags='r',mode=0o666):Promise<FileHandle>; fs.readFile(path,{encoding=null,signal}):Promise<Buffer|string>; fs.writeFile(file,data,{encoding='utf8',mode=0o666,flag='w',signal}):Promise<void>; fs.readdir(path,{encoding='utf8',withFileTypes=false}):Promise<string[]|Dirent[]>; fs.mkdir(path,{recursive=false,mode=0o777}):Promise<void>; fs.copyFile(src,dest,mode=0):Promise<void>; fs.unlink(path):Promise<void>; FileHandle methods read,write,appendFile,chmod,chown,utimes,datasync,sync,truncate,stat,close,createReadStream,createWriteStream; Defaults: encoding utf8, mode 0o666/0o777, flag w/a, recursive false; support AbortSignal; threadpool default size4; always close handles; avoid fs.access pre-checks; use streaming for large files; set UV_THREADPOOL_SIZE for concurrency

## Sanitised Extract
Table of Contents
1 Importing
2 Core FS Operations
3 FileHandle Methods
4 Streams
5 Configuration Defaults
6 Concurrency Considerations

1 Importing
Use either import * as fs from 'node:fs/promises' or const fs = require('node:fs/promises').

2 Core FS Operations
fs.access(path, mode) => Promise<void>
fs.open(path, flags, mode) => Promise<FileHandle>
fs.readFile(path, options) => Promise<Buffer|string>
fs.writeFile(file, data, options) => Promise<void>
fs.readdir(path, options) => Promise<string[]|Dirent[]>
fs.mkdir(path, options) => Promise<void>
fs.copyFile(src, dest, mode) => Promise<void>
fs.unlink(path) => Promise<void>

3 FileHandle Methods
.read(buffer, offset, length, position) => Promise<{bytesRead,buffer}>
.readFile(options) => Promise<Buffer|string>
.write(buffer, offset, length, position) => Promise<{bytesWritten,buffer}>
.writeFile(data, options) => Promise<void>
.appendFile(data, options) => Promise<void>
.chmod(mode) => Promise<void>
.chown(uid, gid) => Promise<void>
.utimes(atime, mtime) => Promise<void>
.datasync() => Promise<void>
.sync() => Promise<void>
.truncate(len) => Promise<void>
.stat(options) => Promise<fs.Stats>
.close() => Promise<void>

4 Streams
filehandle.createReadStream({start,end,highWaterMark,encoding,autoClose,emitClose,signal}) => fs.ReadStream
filehandle.createWriteStream({start,highWaterMark,encoding,autoClose,emitClose,flush,signal}) => fs.WriteStream

5 Configuration Defaults
encoding: 'utf8'
mode for open/writeFile: 0o666
flag for writeFile: 'w'
flag for appendFile: 'a'
fs.mkdir recursive: false, mode 0o777
AbortSignal: optional signal property to abort requests

6 Concurrency Considerations
Threadpool size: UV_THREADPOOL_SIZE (default 4)
Avoid concurrent write operations to same file
Always close handles to prevent leaks
Do not use fs.access before open; catch errors instead

## Original Source
Node.js FS/Promises API
https://nodejs.org/api/fs.html#fspromisesreadfilepath-options

## Digest of FS_PROMISES_API

# FS Promises API

## Importing

Use one of the following:

import * as fs from 'node:fs/promises'
const fs = require('node:fs/promises')

All methods return Promises that fulfill when the operation completes or reject with an Error on failure.

## Core Promise-based Methods

### fs.access(path[, mode])
Parameters:
  path: string | Buffer | URL
  mode: integer (bitmask of fs.constants.F_OK, R_OK, W_OK, X_OK) Default: fs.constants.F_OK
Returns: Promise<void>
Throws: Error with code EACCES, ENOENT

### fs.open(path, flags[, mode])
Parameters:
  path: string | Buffer | URL
  flags: string ("r","r+","w","w+","a","a+", etc.) Default: 'r'
  mode: integer (permission mask) Default: 0o666
Returns: Promise<FileHandle>
Throws: Error with code ENOENT, EACCES

### fs.readFile(path[, options])
Parameters:
  path: string | Buffer | URL
  options: string (encoding) or object { encoding: string|null Default: null, signal: AbortSignal }
Returns: Promise<Buffer|string>
Throws: Error

### fs.writeFile(file, data[, options])
Parameters:
  file: string | Buffer | URL | FileHandle
  data: string | Buffer | AsyncIterable | Iterable | Stream
  options: string (encoding) or object {
    encoding: string|null Default: 'utf8'
    mode: integer Default: 0o666
    flag: string Default: 'w'
    signal: AbortSignal | undefined
  }
Returns: Promise<void>
Throws: Error

### fs.readdir(path[, options])
Parameters:
  path: string | Buffer | URL
  options: object { encoding: string Default: 'utf8', withFileTypes: boolean Default: false }
Returns: Promise<string[] | Buffer[] | Dirent[]>
Throws: Error

### fs.mkdir(path[, options])
Parameters:
  path: string | Buffer | URL
  options: object { recursive: boolean Default: false, mode: integer Default: 0o777 }
Returns: Promise<void>
Throws: Error

### fs.copyFile(src, dest[, mode])
Parameters:
  src: string | Buffer | URL
  dest: string | Buffer | URL
  mode: integer bitmask Default: 0
    COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE
Returns: Promise<void>
Throws: Error

### fs.unlink(path)
Parameters:
  path: string | Buffer | URL
Returns: Promise<void>
Throws: Error

## FileHandle Class

Instances created by fs.open(). Methods:

filehandle.read(buffer[, offset, length, position]) => Promise<{ bytesRead: number, buffer: Buffer }>
filehandle.read([options]) => Promise<{ bytesRead, buffer }>
filehandle.readFile([options]) => Promise<Buffer|string>
filehandle.write(buffer[, offset, length, position]) => Promise<{ bytesWritten: number, buffer: Buffer }>
filehandle.write(string[, position, encoding]) => Promise<{ bytesWritten: number, buffer: string }>
filehandle.writeFile(data, options) => Promise<void>
filehandle.appendFile(data, options) => Promise<void>
filehandle.createReadStream([options]) => fs.ReadStream
filehandle.createWriteStream([options]) => fs.WriteStream
filehandle.chmod(mode) => Promise<void>
filehandle.chown(uid, gid) => Promise<void>
filehandle.utimes(atime, mtime) => Promise<void>
filehandle.datasync() => Promise<void>
filehandle.sync() => Promise<void>
filehandle.truncate(len) => Promise<void>
filehandle.stat([options]) => Promise<fs.Stats>
filehandle.close() => Promise<void>
filehandle[Symbol.asyncDispose]() => Promise<void>

## Underlying Threadpool

Operations offload to libuv threadpool (default size 4, configurable via UV_THREADPOOL_SIZE). Not threadsafe: avoid concurrent modifications on same file descriptor.

## Attribution
- Source: Node.js FS/Promises API
- URL: https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
- License: License
- Crawl Date: 2025-05-02T07:47:18.151Z
- Data Size: 4450300 bytes
- Links Found: 4165

## Retrieved
2025-05-02
library/JSONLD_FRAMING.md
# library/JSONLD_FRAMING.md
# JSONLD_FRAMING

## Crawl Summary
JsonLdProcessor.frame(input, frame, options) returns Promise<object> or invokes callback. JsonLdOptions framing-specific fields: embed:'@once'|'@always'|'@never' (default '@once'), explicit:boolean=false, omitDefault:boolean=false, omitGraph:boolean=false, requireAll:boolean=false, ordered:boolean=false. Framing keywords @embed, @explicit, @omitDefault, @omitGraph, @requireAll, @ordered override options. Algorithm: expand input/frame, generate node map, frame match, value pattern match, embed recursively, apply @default content, compact output. Error codes: invalidFrameError, invalidFrameKeywordError.

## Normalised Extract
Table of Contents:
1. Framing API Method Signature
2. Frame Options (JsonLdOptions)
3. Framing Keywords
4. Matching Features
   4.1 Property Matching
   4.2 Wildcard Matching
   4.3 Absence Matching
   4.4 Value Pattern Matching
   4.5 @id Matching
   4.6 Empty Frame
5. Default Content (@default)
6. Algorithm Steps
7. Data Structures
8. Reverse Framing
9. Framing Named Graphs

1. Framing API Method Signature
   Interface JsonLdProcessor {
     frame(input: any, frame: object|any[], options?: JsonLdOptions): Promise<object>;
     frame(input, frame, options, callback): void;
   }

2. Frame Options (JsonLdOptions)
   embed: '@once'|'@always'|'@never' (default '@once')
   explicit: boolean (default false)
   omitDefault: boolean (default false)
   omitGraph: boolean (default false)
   requireAll: boolean (default false)
   ordered: boolean (default false)

3. Framing Keywords
   Use @embed, @explicit, @omitDefault, @omitGraph, @requireAll, @ordered within frame objects to set flags locally.

4. Matching Features
4.1 Property Matching:
   Frame property:value matches node objects with same property and value.
4.2 Wildcard Matching:
   property:{} matches any value present for that property.
4.3 Absence Matching:
   property:[] matches node objects lacking that property, adds null if explicit inclusion false.
4.4 Value Pattern Matching:
   property:{'@value':{}, '@language':'lang'} matches value objects with language tag.
4.5 @id Matching:
   '@id':'IRI' or array of IRIs matches nodes by identifier.
4.6 Empty Frame:
   {} matches all node objects at top-level.

5. Default Content (@default)
   property:{'@default':value} in frame supplies default value when missing; defaults for @type supported.

6. Algorithm Steps
   expand input/frame
   generate node map
   apply Frame Matching Algorithm
   value pattern matching
   recursive embedding by embed flag
   default insertion
   compact with frame context

7. Data Structures
   JsonLdContext: map for term resolution
   JsonLdOptions: framing and core API options

8. Reverse Framing
   Use JSON-LD API reverse flag on properties to invert embedding direction.

9. Framing Named Graphs
   Frame with @graph key to target named graphs; omitGraph controls top-level output.


## Supplementary Details
Implementation Steps:
1. Expand document: expanded = await jsonld.expand(input, {expandContext, documentLoader, processingMode});
2. Flatten expanded: flattened = await jsonld.flatten(expanded, {}, {documentLoader, processingMode});
3. Frame flattened: framed = await jsonld.frame(flattened, frame, {embed:'@once', explicit:false, omitDefault:false, omitGraph:false, requireAll:false, ordered:false, documentLoader, processingMode});
4. Compact framed: result = await jsonld.compact(framed, frameContext, {compactArrays, documentLoader, processingMode});

JsonLdOptions defaults:
  embed:'@once', explicit:false, omitDefault:false, omitGraph:false, requireAll:false, ordered:false

DocumentLoader:
  function(url:string):Promise<RemoteDocument>

Error Behavior:
- invalidFrameError: thrown if frame missing required keys or invalid JSON-LD structure
- invalidFrameKeywordError: thrown if framing keyword value not in allowed set

Reverse Framing:
  options.expandContext may include '@reverse':{'prop':'@id'} to invert edges

Named Graph Framing:
  Frame object:
    '@graph':{'@id':'graphIRI', 'prop':{...}}
  omitGraph:true to inline nodes without @graph wrapper


## Reference Details
## API Method Signature

```js
interface JsonLdProcessor {
  frame(
    input: any,
    frame: object|any[],
    options?: JsonLdOptions,
    callback?: (err: JsonLdError|null, framed?: object, meta?: JsonLdMeta) => void
  ): Promise<object> | void;
}
```

Parameters:
- input: object|array|string|RemoteDocument (expanded or flattened JSON-LD)
- frame: object|array|string (JSON-LD framing document)
- options: JsonLdOptions

JsonLdOptions fields:
- documentLoader?: DocumentLoader = user-supplied loader
- base?: string = undefined
- processingMode?: 'json-ld-1.0'|'json-ld-1.1' = 'json-ld-1.1'
- expandContext?: any = undefined
- compactArrays?: boolean = true
- graph?: boolean = false
- embed?: '@once'|'@always'|'@never' = '@once'
- explicit?: boolean = false
- omitDefault?: boolean = false
- omitGraph?: boolean = false
- requireAll?: boolean = false
- ordered?: boolean = false

Return:
- Promise resolving to framed JSON-LD object
- Or void if callback provided

Errors:
- JsonLdError.code = 'invalidFrameError'
- JsonLdError.code = 'invalidFrameKeywordError'

## Code Example

```js
const jsonld = require('jsonld');
const inputDoc = require('./input.json');
const frameDoc = require('./frame.json');
const frameContext = {"@vocab":"http://example.org/"};

async function runFraming() {
  try {
    const expanded = await jsonld.expand(inputDoc, {processingMode:'json-ld-1.1'});
    const flattened = await jsonld.flatten(expanded, {}, {processingMode:'json-ld-1.1'});
    const options = {embed:'@once', explicit:false, omitDefault:false, omitGraph:false, requireAll:false, ordered:false};
    const framed = await jsonld.frame(flattened, frameDoc, options);
    const compacted = await jsonld.compact(framed, frameContext, {compactArrays:true});
    console.log(JSON.stringify(compacted, null, 2));
  } catch (err) {
    console.error(err.code, err.message);
  }
}

runFraming();
```

## Best Practices
- Always expand and flatten before framing to normalize graph structure.
- Supply a custom documentLoader for remote contexts.
- Use explicit:true to output only declared frame properties.
- Use omitDefault:true to avoid null placeholders for missing data.
- Use ordered:true when deterministic embedding order is required.

## Troubleshooting

1. Invalid @embed value:
   Error: JsonLdError.code === 'invalidFrameKeywordError'
   Expected '@once', '@always', or '@never'.
   Fix: ensure frame contains valid @embed value.

2. No output or empty frame result:
   - Check flattened subjects: console.log(await jsonld.flatten(...));
   - Verify frame property paths match expanded data IRIs.
   - Use wildcard {} or array [] patterns to broaden matches.

3. Unexpected default nulls:
   - Omit default placeholders with omitDefault:true.

4. Debug metadata:
   Provide callback to frame to inspect meta argument:
   ```js
   jsonld.frame(flattened, frameDoc, options, (err, framed, meta) => {
     console.dir(meta, {depth:5});
   });
   ```

5. CLI usage:
   ```bash
   jsonld frame input.json frame.json \
     --embed=@once --explicit=false --omitDefault=false \
     --omitGraph=false --requireAll=false --ordered=false \
     -o output.json
   ```

## Information Dense Extract
JsonLdProcessor.frame(input:any,frame:any,options?:JsonLdOptions):Promise<object>. JsonLdOptions embed:'@once'|'@always'|'@never'(default '@once'), explicit:boolean=false, omitDefault:boolean=false, omitGraph:boolean=false, requireAll:boolean=false, ordered:boolean=false. Framing keywords @embed,@explicit,@omitDefault,@omitGraph,@requireAll,@ordered override options locally. Matching: property:value, wildcard {}, absence [], value patterns {@value, @language, @type, @direction}, @id string|array, empty frame {}. Default content via {@default:value} injects missing props. Algorithm: expand->node map->frame match->value pattern->embed->default->compact. Errors: invalidFrameError, invalidFrameKeywordError. Code: await jsonld.expand->flatten->frame->compact. Best practices: flatten input, custom documentLoader, use explicit/omitDefault/ordered flags. Troubleshoot via meta callback and CLI flags.

## Sanitised Extract
Table of Contents:
1. Framing API Method Signature
2. Frame Options (JsonLdOptions)
3. Framing Keywords
4. Matching Features
   4.1 Property Matching
   4.2 Wildcard Matching
   4.3 Absence Matching
   4.4 Value Pattern Matching
   4.5 @id Matching
   4.6 Empty Frame
5. Default Content (@default)
6. Algorithm Steps
7. Data Structures
8. Reverse Framing
9. Framing Named Graphs

1. Framing API Method Signature
   Interface JsonLdProcessor {
     frame(input: any, frame: object|any[], options?: JsonLdOptions): Promise<object>;
     frame(input, frame, options, callback): void;
   }

2. Frame Options (JsonLdOptions)
   embed: '@once'|'@always'|'@never' (default '@once')
   explicit: boolean (default false)
   omitDefault: boolean (default false)
   omitGraph: boolean (default false)
   requireAll: boolean (default false)
   ordered: boolean (default false)

3. Framing Keywords
   Use @embed, @explicit, @omitDefault, @omitGraph, @requireAll, @ordered within frame objects to set flags locally.

4. Matching Features
4.1 Property Matching:
   Frame property:value matches node objects with same property and value.
4.2 Wildcard Matching:
   property:{} matches any value present for that property.
4.3 Absence Matching:
   property:[] matches node objects lacking that property, adds null if explicit inclusion false.
4.4 Value Pattern Matching:
   property:{'@value':{}, '@language':'lang'} matches value objects with language tag.
4.5 @id Matching:
   '@id':'IRI' or array of IRIs matches nodes by identifier.
4.6 Empty Frame:
   {} matches all node objects at top-level.

5. Default Content (@default)
   property:{'@default':value} in frame supplies default value when missing; defaults for @type supported.

6. Algorithm Steps
   expand input/frame
   generate node map
   apply Frame Matching Algorithm
   value pattern matching
   recursive embedding by embed flag
   default insertion
   compact with frame context

7. Data Structures
   JsonLdContext: map for term resolution
   JsonLdOptions: framing and core API options

8. Reverse Framing
   Use JSON-LD API reverse flag on properties to invert embedding direction.

9. Framing Named Graphs
   Frame with @graph key to target named graphs; omitGraph controls top-level output.

## Original Source
JSON-LD Framing
https://www.w3.org/TR/json-ld11-framing/

## Digest of JSONLD_FRAMING

# Framing Extension to JSON-LD API

## 5.1 JsonLdProcessor.frame

Interface JsonLdProcessor {
  /**
   * Frames a JSON-LD document by example, producing a tree layout matching a frame document.
   * @param input  object|array|string|RemoteDocument JSON-LD expanded or flattened input
   * @param frame  object|array|string         JSON-LD frame document
   * @param options JsonLdOptions               framing options
   * @param callback err, framed, meta        Node-style callback
   * @returns Promise<object> framed document if callback omitted
   */
  frame(
    input: any,
    frame: object|any[],
    options?: JsonLdOptions,
    callback?: (err: JsonLdError|null, framed?: object, meta?: JsonLdMeta) => void
  ): Promise<object> | void;
}

## 5.3.2 JsonLdOptions (framing)

Dictionary JsonLdOptions {
  documentLoader?: DocumentLoader;           // loader for remote contexts
  base?: string;                             // base IRI for expansion
  processingMode?: 'json-ld-1.0'|'json-ld-1.1';
  expandContext?: any;                       // context to apply during expand
  compactArrays?: boolean;                   // omit arrays of single items
  graph?: boolean;                           // treat input as graph

  // framing-specific options:
  embed?: '@once'|'@always'|'@never';       // default '@once'
  explicit?: boolean;                       // require explicit properties, default false
  omitDefault?: boolean;                    // omit default values, default false
  omitGraph?: boolean;                      // omit top-level @graph if single node, default false
  requireAll?: boolean;                     // require all frame props to match, default false
  ordered?: boolean;                        // embed first-found node, default false
}

## 5.2 Error Handling

Throws JsonLdError with codes:
- invalidFrameError         if frame document is not valid JSON-LD
- invalidFrameKeywordError  if frame keywords have invalid values

## Framing Keywords (in-frame overrides options)

Keyword    | Value                              | Effect
-----------|------------------------------------|-------------------------------
@embed     | @once | @always | @never       | sets embed flag
@explicit  | true | false                    | sets explicit flag
@omitDefault | true | false                  | sets omitDefault flag
@omitGraph | true | false                    | sets omitGraph flag
@requireAll | true | false                   | sets requireAll flag
@ordered   | true | false                    | sets ordered flag

## Configuration Defaults

embed: "@once"
explicit: false
omitDefault: false
omitGraph: false
requireAll: false
ordered: false

## Framing Algorithm Overview

1. Expand input and frame to internal representation.
2. Generate node map via Node Map Generation algorithm.
3. Apply Frame Matching Algorithm per frame node object.
4. Use Value Pattern Matching Algorithm for @value, @language, @type, @direction.
5. Recursively embed matching node objects based on embed flag.
6. Insert default content for missing properties using @default in frame.
7. Compact result using frame context to produce JSON-LD.


## Attribution
- Source: JSON-LD Framing
- URL: https://www.w3.org/TR/json-ld11-framing/
- License: W3C Document License
- Crawl Date: 2025-05-02T15:48:35.290Z
- Data Size: 9690892 bytes
- Links Found: 58880

## Retrieved
2025-05-02
library/JSONLD_KEYWORDS.md
# library/JSONLD_KEYWORDS.md
# JSONLD_KEYWORDS

## Crawl Summary
List of  thirty-two JSON-LD specific terms and their exact keyword names, expected value types, allowed contexts, and container mappings. Each term is defined by its keyword (e.g. @context,@id,@type,@list,@set,@language,@direction) with normative constraints and usage scope.

## Normalised Extract
Table of Contents
1. Term and Keyword List
2. Detailed Keyword Definitions

1. Term and Keyword List
active context
base direction (@direction)
compact IRI
context (@context)
default language (@language)
default object
embedded context
expanded term definition
frame
frame object
graph object
id map
implicitly named graph
included block
index map
language map
list object
local context
nested property
node object
node reference
prefix
processing mode
scoped context
set object
term
type map
typed value
value object
vocabulary mapping (@vocab)

2. Detailed Keyword Definitions
active context: runtime context structure used to resolve term definitions
base direction: use @direction key with literal "ltr","rtl" or null
compact IRI: syntax prefix:suffix, prefix must map to IRI
context: @context entry value may be IRI, map, or array of these
default language: @language key mapping to [BCP47] code or null
default object: map containing @default entry resets default values
embedded context: nested @context inside node/value/graph/list/set or term definition
expanded term definition: map containing any of @id(IRI),@type(IRI),@container(one of @list,@set,@index,@language,@graph,@id,@type),@language(BCP47|string|null),@direction("ltr"|"rtl"|null),@context(context),@protected(true|false)
frame: JSON-LD document defining matching and embedding rules
frame object: entry in frame for matching node or value shapes
graph object: map with an @graph array plus optional @id, @index
id map: container mapping type @id, values node objects keyed by IRI
implicitly named graph: term definition with @container:@graph yields named graph
included block: @included entry with array of node objects for inclusion
index map: container mapping type @index, values string,number,boolean,null,node/value/list/set or array
language map: container mapping type @language, keys BCP47 codes, values string|null|array
list object: map with @list array and optional @index
local context: @context map definition embedded in document
nested property: nested map inside node object for grouping only
node object: map representing resource or blank node; may include @id,@type,properties; excludes @value,@list,@set when top-level
node reference: node object with only @id entry
prefix: term mapping that serves as IRI prefix for compact IRI expansion
processing mode: API option or @version entry, values json-ld-1.0 or json-ld-1.1
scoped context: @context in expanded term defining context scoped to type or property
set object: map with @set array and optional @index
term: key in context mapping to IRI
term definition: entry in @context mapping term to IRI or map of keyword entries
type map: container mapping type @type, map keys interpreted as type IRIs
typed value: map with @value (string) and @type IRI
value object: map with @value, optional @type,@language,@direction for typed and language strings
vocabulary mapping: @vocab entry mapping default vocabulary IRI or null


## Supplementary Details
Implementation details:
- Context parser must recognize @context at document, node, graph, value, list, set, and term-definition levels.
- Term definition maps: parse string values as shorthand for {"@id":value}.
- Keyword entries valid in term definition: @id, @type, @container, @language, @direction, @context, @protected.
- Container mapping returns different internal structures: @list→list array, @set→set array, @index→map index→entries, @language→language map, @graph→graph container, @id→id map, @type→type map.
- Language tag validation per BCP47 section 2.2.9: lowercase normalization required.
- Processing mode selection: if context contains @version:1.1 numeric, enforce JSON-LD1.1 feature set; if @version string, reject or ignore per processor.
- Compact IRI resolution: split on colon, match prefix term in active context, then resolve suffix relative to prefix IRI. If no prefix match, term is keyword or error.
- Protected term definitions: @protected:true prevents term override on subsequent contexts.
- Scoped contexts: when term used as type or property, merge type- or property-scoped context before processing children.


## Reference Details
Best practices and patterns:
1. Defining a simple context:
{
  "@context": {
    "schema": "http://schema.org/",
    "name": "schema:name",
    "homepage": {"@id":"schema:url","@type":"@id"}
  }
}
2. Container mapping example:
{
  "@context": {
    "tags": {"@id":"schema:keywords","@container":"@set"},
    "translations": {"@id":"schema:description","@container":"@language"}
  }
}
3. Processing mode configuration (jsonld.js):
jsonld.expand(doc,{processingMode:'json-ld-1.1',strictSSL:true})
4. Error handling:
- Duplicate term definitions: throw ReferenceError("Term already defined and protected: termName").
- Invalid language tag: throw SyntaxError("Invalid language tag: tag").
5. Troubleshooting:
Command: node validateContext.js myContext.json
Expected output on success: "Context valid"
On error: "Error at key 'name': @id must be a string with valid IRI"


## Information Dense Extract
activeContext-runtimeContext;baseDirection-@direction=>"ltr"|"rtl"|null;compactIRI-prefix:suffix via context;context-@context=>IRI|object|array;defaultLanguage-@language=>BCP47|string|null;defaultObject:@default key;embeddedContext:nested @context;expandedTermDef:{@id:IRI,@type:IRI,@container:@list|@set|...,@language:BCP47,@direction:"ltr"|"rtl",@context, @protected:true|false};frame:document for framing;frameObject:entry in frame;graphObject:@graph array,+optional @id,@index;idMap:@container:@id =>IRI->nodeObjects;implicitlyNamedGraph:@container:@graph;includedBlock:@included->nodeObjects;indexMap:@container:@index->map;languageMap:@container:@language->lang->string|null|array;listObject:@list,array[@index];localContext:@context map;nestedProperty:map group;nodeObject:map no @value,@list,@set;nodeReference:@id only;prefix:term->IRI prefix;processingMode:json-ld-1.0|1.1 via API or @version;scopedContext:@context in term;setObject:@set,array[@index];term:context key->IRI;termDefinition:string or map;typeMap:@container:@type->nodeObjects;typedValue:@value with @type;valueObject:@value,@type,@language,@direction;vocabMapping:@vocab->IRI|compactIRI|null

## Sanitised Extract
Table of Contents
1. Term and Keyword List
2. Detailed Keyword Definitions

1. Term and Keyword List
active context
base direction (@direction)
compact IRI
context (@context)
default language (@language)
default object
embedded context
expanded term definition
frame
frame object
graph object
id map
implicitly named graph
included block
index map
language map
list object
local context
nested property
node object
node reference
prefix
processing mode
scoped context
set object
term
type map
typed value
value object
vocabulary mapping (@vocab)

2. Detailed Keyword Definitions
active context: runtime context structure used to resolve term definitions
base direction: use @direction key with literal 'ltr','rtl' or null
compact IRI: syntax prefix:suffix, prefix must map to IRI
context: @context entry value may be IRI, map, or array of these
default language: @language key mapping to [BCP47] code or null
default object: map containing @default entry resets default values
embedded context: nested @context inside node/value/graph/list/set or term definition
expanded term definition: map containing any of @id(IRI),@type(IRI),@container(one of @list,@set,@index,@language,@graph,@id,@type),@language(BCP47|string|null),@direction('ltr'|'rtl'|null),@context(context),@protected(true|false)
frame: JSON-LD document defining matching and embedding rules
frame object: entry in frame for matching node or value shapes
graph object: map with an @graph array plus optional @id, @index
id map: container mapping type @id, values node objects keyed by IRI
implicitly named graph: term definition with @container:@graph yields named graph
included block: @included entry with array of node objects for inclusion
index map: container mapping type @index, values string,number,boolean,null,node/value/list/set or array
language map: container mapping type @language, keys BCP47 codes, values string|null|array
list object: map with @list array and optional @index
local context: @context map definition embedded in document
nested property: nested map inside node object for grouping only
node object: map representing resource or blank node; may include @id,@type,properties; excludes @value,@list,@set when top-level
node reference: node object with only @id entry
prefix: term mapping that serves as IRI prefix for compact IRI expansion
processing mode: API option or @version entry, values json-ld-1.0 or json-ld-1.1
scoped context: @context in expanded term defining context scoped to type or property
set object: map with @set array and optional @index
term: key in context mapping to IRI
term definition: entry in @context mapping term to IRI or map of keyword entries
type map: container mapping type @type, map keys interpreted as type IRIs
typed value: map with @value (string) and @type IRI
value object: map with @value, optional @type,@language,@direction for typed and language strings
vocabulary mapping: @vocab entry mapping default vocabulary IRI or null

## Original Source
JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of JSONLD_KEYWORDS

# JSON-LD Specific Terms and Keywords

This section provides the complete normative definitions of JSON-LD terms and keywords as specified in JSON-LD 1.1 Recommendation (16 July 2020).

## Term Definitions

active context
    A context used at runtime for resolving terms

base direction
    @direction key; value: "ltr" | "rtl" | null

compact IRI
    prefix:suffix; requires prefix mapping in context

context
    @context entry; value: IRI | object | array

default language
    @language key; value: BCP47 language code | null

default object
    object with @default key

embedded context
    @context appearing inside node, value, graph, list, set or term definition

expanded term definition
    map containing keyword entries (@id, @type, @container, @language, @direction, @context, @protected)

frame
    JSON-LD document describing transformation rules

frame object
    map inside frame for matching node or value

graph object
    map with @graph and optional @id, @index

id map
    container mapping @id; map keys→node objects

implicitly named graph
    expanded term definition with @container:@graph

included block
    @included map entry with array of node objects

index map
    container mapping @index; values: string, number, boolean, null, node/value/list/set objects or array

language map
    container mapping @language; keys: BCP47 codes; values: string|null|array of strings

list object
    map with @list and optional @index

local context
    context map via @context keyword

nested property
    map entry inside node for sub-structure only

node object
    map representing RDF node; no @value,@list,@set; not top-level @graph-only

node reference
    node object with only @id

prefix
    term mapping to string that as IRI prefix for compact IRI

processing mode
    runtime mode; options: json-ld-1.0, json-ld-1.1; set via API option or @version

scoped context
    @context entry in expanded term for type or property scope

set object
    map with @set and optional @index

term
    short string in context mapping to IRI

term definition
    context entry: string→@id, or map with keyword keys

type map
    @container:@type mapping; map keys→node objects

typed value
    map with @value and @type IRI

value object
    map with @value and optional @type,@language,@direction

vocabulary mapping
    @vocab key; value: IRI | compact IRI | term | null


## Attribution
- Source: JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: W3C Document License
- Crawl Date: 2025-05-02T16:49:39.122Z
- Data Size: 12552365 bytes
- Links Found: 88987

## Retrieved
2025-05-02
library/JSON_LD_SYNTAX.md
# library/JSON_LD_SYNTAX.md
# JSON_LD_SYNTAX

## Crawl Summary
JSON-LD defines a JSON-based linked data syntax with @context maps for term-to-IRI, keyword tokens (@id,@type,@value,@list,@set,@reverse,@base,@vocab,@language,@direction,@version,@nest,@graph,@included,@index), term definitions allowing @id,@type,@container,@language,@reverse,@nest,@prefix,@protected,@direction,@version,@vocab,@base, and four document forms (expanded, compacted, flattened, framed) via standard algorithms. Relative IRIs resolved against @base or document location; vocabulary-relative IRIs against @vocab. Processing mode json-ld-1.1 enforced via @version:1.1. Error conditions include invalid IRI, duplicate keys, conflicting definitions. Embedding via <script type="application/ld+json"> and link rel alternate. Security: reject non-JSON-LD MIME types, sanitize external contexts.

## Normalised Extract
Table of Contents:
1 Context Definitions
2 Keyword Syntax
3 Node and Value Objects
4 Data Structures and Graphs
5 Document Forms
6 IRI Resolution
7 Embedding
8 Processing Mode

1 Context Definitions
  @context: IRI | Map | Array. Defines term mappings and bases.
  Term Definition Map:
    @id: IRI
    @type: IRI or "@json"
    @container: "@list","@set","@index","@language","@id","@graph","@type"
    @language: BCP47 language tag or null
    @reverse: IRI
    @nest: term string
    @prefix: true|false
    @protected: true|false
    @direction: "ltr","rtl",null
    @version: numeric 1.1
    @vocab: IRI
    @base: IRI

2 Keyword Syntax
  @context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest

3 Node and Value Objects
  Node Object: Map without @value,@list,@set; may contain @id,@type,properties
  Value Object: Map with @value; optional @type,@language,@direction,@index,@nest
  List Object: @list: array; optional @index
  Set Object: @set: array; optional @index

4 Data Structures and Graphs
  Represent datasets: default graph, named graphs via @graph entries
  Blank nodes: _: prefix
  RDF triples via node objects and @reverse

5 Document Forms
  Expanded: expand(input, options) → Promise<object>
  Compacted: compact(input, context, options) → Promise<object>
  Flattened: flatten(input, context?, options) → Promise<object>
  Framed: frame(input, frame, options) → Promise<object>

6 IRI Resolution
  Relative IRI → resolved against @base or document location
  Vocabulary-relative IRI → resolved against @vocab

7 Embedding
  HTML: <script type="application/ld+json">…</script>
  Link: <link rel="alternate" type="application/ld+json" href="…">

8 Processing Mode
  Default: json-ld-1.1; @version:1.1 enforces mode; json-ld-1.0 mode rejects 1.1 features

## Supplementary Details
Parameter Values and Defaults:
@version: numeric 1.1 (errors if not exact numeric)
@direction: 'ltr','rtl',null; default inherited from context or HTML base element
@language: BCP47 language code or null; default null
@vocab: IRI or null; default null
@base: IRI or omitted; default document URL
@container options: '@list','@set','@index','@language','@id','@graph','@type'
Processing Options for API methods:
  documentLoader: function(url):Promise<object>
  expandContext: IRI|Map|Array
  compactToRelative: boolean (default false)
  graph: boolean (default false)
  skipContextCache: boolean (default false)
  processingMode: 'json-ld-1.0'|'json-ld-1.1' (default 'json-ld-1.1')
Implementation Steps:
1. Define @context in JSON-LD document header
2. Set base IRI via @base or HTML <base>
3. Load external contexts via documentLoader
4. Call expand(input,{documentLoader,processingMode})
5. Call compact(expanded,context,{skipContextCache})
6. Optionally flatten or frame
7. Serialize result as JSON

Configuration Effects:
- setting skipContextCache:true always refetches contexts
- compactToRelative:true outputs relative IRIs against base
- graph:true wraps output in @graph even if single node



## Reference Details
JavaScript API Method Signatures (jsonld.js v5.x):

expand(document: object|string, options?: {
  expandContext?: object|string|string[],
  documentLoader?: (url: string)=>Promise<{document:object,contextUrl?:string,contentType?:string}>,
  base?: string,
  processingMode?: 'json-ld-1.0'|'json-ld-1.1',
  skipContextCache?: boolean
}): Promise<object[]>

compact(document: object|string, context: object|string, options?: {
  documentLoader?: (url: string)=>Promise<{document:object,contextUrl?:string,contentType?:string}>,
  base?: string,
  processingMode?: 'json-ld-1.0'|'json-ld-1.1',
  compactToRelative?: boolean,
  graph?: boolean,
  skipContextCache?: boolean
}): Promise<object>

flatten(document: object|string, context?: object|string, options?: {
  documentLoader?: Function,
  base?: string,
  processingMode?: string,
  skipContextCache?: boolean
}): Promise<object>

frame(document: object|string, frame: object|string, options?: {
  documentLoader?: Function,
  base?: string,
  processingMode?: string,
  embed?: boolean,
  compact?: boolean,
  skipContextCache?: boolean
}): Promise<object>

Code Example:
import jsonld from 'jsonld';

async function process() {
  const doc = await jsonld.expand('doc.jsonld', {documentLoader,processingMode:'json-ld-1.1'});
  const compacted = await jsonld.compact(doc, {"schema": "http://schema.org/"}, {compactToRelative:true});
  console.log(JSON.stringify(compacted, null, 2));
}

Best Practices:
- Always specify @version:1.1 in context to lock processing mode
- Define @vocab when using common vocabulary to shorten IRIs
- Use skipContextCache during development to reflect context changes
- Provide a custom documentLoader to cache and validate remote contexts

Troubleshooting:
$ node myscript.js
Error: Invalid IRI "::example"
  inspect context term definitions for @id values

$ jsonld-cli expand --input data.jsonld --loader 'file'
Error: duplicate term "name" in @context
  ensure unique keys in context

$ jsonld-cli compact --input data.jsonld --context ctx.jsonld
Warning: processingMode json-ld-1.0 rejects @direction
  upgrade CLI to support json-ld-1.1


## Information Dense Extract
@context:IRI|Map|Array termMapKeys:@id@type@container@language@reverse@nest@prefix@protected@direction@version@vocab@base. Keywords:@context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest. NodeObject:map without @value,@list,@set; ValueObject:@value map. ListObject:@list array; SetObject:@set array. expand(input,opts)->Promise<object[]>; compact(input,ctx,opts)->Promise<object>; flatten(input,ctx?,opts)->Promise<object>; frame(input,frame,opts)->Promise<object>. Options:documentLoader(fn),base:IRI,processingMode:'json-ld-1.0'|'json-ld-1.1',skipContextCache:boolean,compactToRelative:boolean,graph:boolean,embed:boolean. IRI resolution: relative->@base|docURL; vocab->@vocab. ProcessingMode default json-ld-1.1; lock via @version:1.1. Errors on dup keys, invalid IRI, malformed context. Embedding:<script type="application/ld+json">; <link rel="alternate">. Default base direction:null; default language:null. Best practices:@version lock,@vocab,use skipContextCache,custom documentLoader.

## Sanitised Extract
Table of Contents:
1 Context Definitions
2 Keyword Syntax
3 Node and Value Objects
4 Data Structures and Graphs
5 Document Forms
6 IRI Resolution
7 Embedding
8 Processing Mode

1 Context Definitions
  @context: IRI | Map | Array. Defines term mappings and bases.
  Term Definition Map:
    @id: IRI
    @type: IRI or '@json'
    @container: '@list','@set','@index','@language','@id','@graph','@type'
    @language: BCP47 language tag or null
    @reverse: IRI
    @nest: term string
    @prefix: true|false
    @protected: true|false
    @direction: 'ltr','rtl',null
    @version: numeric 1.1
    @vocab: IRI
    @base: IRI

2 Keyword Syntax
  @context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest

3 Node and Value Objects
  Node Object: Map without @value,@list,@set; may contain @id,@type,properties
  Value Object: Map with @value; optional @type,@language,@direction,@index,@nest
  List Object: @list: array; optional @index
  Set Object: @set: array; optional @index

4 Data Structures and Graphs
  Represent datasets: default graph, named graphs via @graph entries
  Blank nodes: _: prefix
  RDF triples via node objects and @reverse

5 Document Forms
  Expanded: expand(input, options)  Promise<object>
  Compacted: compact(input, context, options)  Promise<object>
  Flattened: flatten(input, context?, options)  Promise<object>
  Framed: frame(input, frame, options)  Promise<object>

6 IRI Resolution
  Relative IRI  resolved against @base or document location
  Vocabulary-relative IRI  resolved against @vocab

7 Embedding
  HTML: <script type='application/ld+json'></script>
  Link: <link rel='alternate' type='application/ld+json' href=''>

8 Processing Mode
  Default: json-ld-1.1; @version:1.1 enforces mode; json-ld-1.0 mode rejects 1.1 features

## Original Source
JSON-LD 1.1 Specification
https://www.w3.org/TR/json-ld11/

## Digest of JSON_LD_SYNTAX

# JSON-LD 1.1 Syntax and Grammar

# Context Definitions

## @context
Type: IRI | Array | Map
Default: document location
Purpose: define term-to-IRI mappings and processing directives

## Term Definition Map Keys
- @id  : IRI mapping for term
- @type: IRI or '@json'; coerces values to datatype or JSON literal
- @container: '@list','@set','@index','@language','@id','@graph','@type'
- @language: BCP47 language tag or null
- @reverse: IRI for reverse property definitions
- @nest: term in context used to nest properties
- @prefix: true|false (controls term expansion)
- @protected: true|false (locks term definition)
- @direction: 'ltr','rtl',null (base direction for string values)
- @version: numeric 1.1 (processing mode indicator)
- @vocab: IRI (default vocabulary mapping)
- @base: IRI (base for resolving relative IRIs)

# Keywords and Syntax Tokens

All JSON-LD keywords are case-sensitive strings beginning with '@':
@context,@id,@type,@value,@list,@set,@reverse,@graph,@included,@language,@index,@base,@vocab,@direction,@version,@nest

# Node and Value Objects

## Node Object
Map without '@value','@list','@set'; may contain '@id','@type','properties'

## Value Object
Map with '@value'; optional keys: '@type', '@language','@direction','@index','@nest'

## List and Set Objects
- @list: array of values or node/value objects; optional '@index'
- @set: array of values; optional '@index'

# Document Forms and Transformations

## Expanded Form
All terms expanded to absolute IRIs, values as objects. Use algorithm: expand(input, options).

## Compacted Form
Compaction with context: compact(input, context, options). Maps IRIs to terms, collapses values.

## Flattened Form
Flattens all graphs into top-level @graph with node objects: flatten(input, context?, options).

## Framed Form
Applies frame document to extract matching subgraphs: frame(input, frame, options).

# Embedding and Link Relations

## HTML Script Embedding
<script type="application/ld+json">JSON-LD document</script>
Base IRI inherited from HTML <base> element; restrict content to valid JSON

## Link Relations
<link rel="alternate" type="application/ld+json" href="doc.jsonld">

# IRI Resolution

Relative IRI references resolved against base IRI established by @base or document location; vocabulary-relative IRIs resolved against @vocab mapping.

# Serializing RDF

Use @graph, @id,@type, @reverse to express RDF triples and named graphs. RDF literal with datatype IRI and language tag.

# Processing Mode

Default: json-ld-1.1. Option @version:1.1 in context locks processor to 1.1; processors in json-ld-1.0 mode error on unsupported features.

# Error Conditions

MUST error on: duplicate keys in object; invalid IRI; unknown keyword usage; malformed context entries; conflicting term definitions.

# Security and Privacy Considerations

Processors MUST enforce JSON parsing rules; MUST reject scripts with non-JSON-LD MIME types; careful with external contexts to avoid injection.

# Retrieval: 2023-10-03
Attribution: W3C JSON-LD 1.1 Recommendation
Data Size: 16 393 397 bytes
Links Found: 116 186
Errors: None

## Attribution
- Source: JSON-LD 1.1 Specification
- URL: https://www.w3.org/TR/json-ld11/
- License: W3C Document License
- Crawl Date: 2025-05-02T17:56:25.128Z
- Data Size: 16393397 bytes
- Links Found: 116186

## Retrieved
2025-05-02
library/SHACL_CORE.md
# library/SHACL_CORE.md
# SHACL_CORE

## Crawl Summary
SHACL Core: defines sh:NodeShape and sh:PropertyShape with required parameters and constraint components. PropertyShape must declare sh:path (rdf:Property or Path) and one or more of class, datatype, cardinality, range, string, pair, logical, shape-based, or other constraints. ValidationReport uses sh:conforms, sh:result, sh:shapesGraphWellFormed. SHACL-SPARQL adds SPARQL-based constraints via sh:select, sh:ask, with pre-bound variables $this, $shapesGraph, $currentShape.

## Normalised Extract
Table of Contents:
1 Namespace Bindings
2 Shape Definitions
3 Property Shape Constraints
4 Validation Report
5 SHACL-SPARQL Constraints

1 Namespace Bindings
  sh: http://www.w3.org/ns/shacl#
  rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  xsd: http://www.w3.org/2001/XMLSchema#

2 Shape Definitions
  NodeShape:
    Required targets: sh:targetClass or sh:targetNode or sh:targetSubjectsOf or sh:targetObjectsOf
    Severity: sh:severity default sh:Violation
    Message: sh:message string
    Deactivation: sh:deactivated boolean
    Embed property constraints with sh:property -> PropertyShape
  PropertyShape:
    Path: sh:path rdf:Property or path expression
    Constraint parameters: choose one or more of:
      Value type: sh:class IRI, sh:datatype IRI, sh:nodeKind IRI among sh:BlankNode, sh:IRI, sh:Literal
      Cardinality: sh:minCount integer >=0, sh:maxCount integer >=0
      Range: sh:minInclusive, sh:maxInclusive, sh:minExclusive, sh:maxExclusive literal or typed literal
      String: sh:minLength, sh:maxLength integer >=0; sh:pattern regex; sh:languageIn list of language tags; sh:uniqueLang boolean
      Pair: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals rdf:Property
      Logical: sh:not single shape; sh:and, sh:or, sh:xone list of shapes
      Shape-based: sh:node shape; sh:property propertyshape; sh:qualifiedValueShape, sh:qualifiedMinCount, sh:qualifiedMaxCount qualified constraints
      Other: sh:closed boolean; sh:ignoredProperties list of properties; sh:hasValue single term; sh:in list of terms
    Non-validating: sh:name string, sh:description string, sh:order integer, sh:group group, sh:defaultValue any

3 Property Shape Constraints
  Constraint parameters precise types and cardinalities as above

4 Validation Report
  sh:ValidationReport:
    sh:conforms boolean
    sh:result repeated sh:ValidationResult
    sh:shapesGraphWellFormed boolean
  sh:ValidationResult:
    sh:focusNode term
    sh:resultPath path
    sh:value term
    sh:sourceShape shape
    sh:sourceConstraintComponent constraint component
    sh:resultSeverity severity
    sh:resultMessage repeated string
    sh:detail repeated ValidationResult

5 SHACL-SPARQL Constraints
  Define SPARQL-based constraint with:
    sh:prefixes list of (prefix, namespace)
    sh:select SELECT query string or sh:ask ASK query string
  Pre-bound variables: $this, $shapesGraph, $currentShape

## Supplementary Details
Constraint component parameter defaults and effects:
- sh:severity: default sh:Violation; values: sh:Info, sh:Warning, sh:Violation
- sh:deactivated: default false; true disables shape
- cardinality bounds: minCount default 0; maxCount no default (unbounded)
- sh:closed: default false; true forbids properties not in shape
- sh:ignoredProperties: default empty; used when sh:closed true

Implementation steps:
1 Load shapes graph as RDF Model
2 Load data graph as RDF Model
3 Parse shapes: Shapes shapes = Shapes.parse(shapesModel)
4 Validate: ValidationReport report = ShaclValidator.get().validate(shapes, dataModel)
5 Extract report.conforms(), report.getResults()

Entailment:
- sh:entailment: IRI; if unsupported, processor MUST fail
- Common IRIs: http://www.w3.org/ns/formats/SPARQL10Query

Serialization:
- Turtle: use prefix declarations above
- JSON-LD: include @context for sh:, rdf:, rdfs:, xsd:


## Reference Details
Java API (TopBraid SHACL):
Shapes.parse(Model model) -> Shapes
ShaclValidator.get() -> ShaclValidator
ValidationReport validate(Shapes shapes, Model data)
boolean ValidationReport.conforms()
List<ValidationResult> ValidationReport.getResults()
Resource ValidationResult.getFocusNode()
Path ValidationResult.getResultPath()
RDFNode ValidationResult.getValue()
Resource ValidationResult.getSourceShape()
Resource ValidationResult.getSourceConstraintComponent()
Resource ValidationResult.getResultSeverity()
List<Literal> ValidationResult.getResultMessages()

Example Code (Java):
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.topbraid.shacl.Shapes;
import org.topbraid.shacl.validation.ValidationReport;
import org.topbraid.shacl.validation.ShaclValidator;

Model shapesModel = FileManager.get().loadModel('shapes.ttl');
Model dataModel = FileManager.get().loadModel('data.ttl');
Shapes shapes = Shapes.parse(shapesModel);
ValidationReport report = ShaclValidator.get().validate(shapes, dataModel);
if(!report.conforms()){
  for(ValidationResult r : report.getResults()){
    System.err.println('Focus: '+r.getFocusNode()+' Path: '+r.getResultPath()+' Message: '+r.getResultMessages());
  }
}

Turtle Example:

@prefix ex: <http://example.com/ns#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:PersonShape a sh:NodeShape ;
  sh:targetClass ex:Person ;
  sh:property [
    sh:path ex:ssn ;
    sh:datatype xsd:string ;
    sh:pattern '^[0-9]{3}-[0-9]{2}-[0-9]{4}$' ;
    sh:maxCount 1 ;
  ] ;
  sh:property [
    sh:path ex:worksFor ;
    sh:class ex:Company ;
    sh:minCount 1 ;
  ] ;
  sh:closed true ;
  sh:ignoredProperties ( rdf:type ) .

Troubleshooting:
- Error: Missing required sh:path -> Ensure each PropertyShape includes sh:path
- Use rapper to validate Turtle:
  rapper -i turtle -c shapes.ttl
  Expected: No errors, otherwise correct syntax at indicated line
- Validation failures with ill-formed shapes:
  log contains: 'sh:shapesGraphWellFormed false' -> check shape declarations against constraint component rules


## Information Dense Extract
prefixes: sh, rdf, rdfs, xsd. NodeShape: must declare target* plus optional severity, message, deactivated, property. PropertyShape: mandatory sh:path; constraint parameters: class, datatype, nodeKind; cardinality: minCount>=0, maxCount>=0; range: minInclusive, maxInclusive, minExclusive, maxExclusive; string: minLength>=0, maxLength>=0, pattern regex, languageIn list, uniqueLang boolean; property pairs: equals, disjoint, lessThan, lessThanOrEquals; logical: not, and list, or list, xone list; shape-based: node, property, qualified shapes; other: closed boolean (default false), ignoredProperties list; in list; hasValue. ValidationReport: sh:conforms boolean, sh:result*, sh:shapesGraphWellFormed boolean. ValidationResult: focusNode, resultPath, value, sourceShape, sourceConstraintComponent, resultSeverity, resultMessage*, detail*. SHACL-SPARQL: define sh:prefixes list; sh:select or sh:ask string; pre-bound $this, $shapesGraph, $currentShape. Java API: Shapes.parse(Model), ShaclValidator.get().validate(Shapes, Model) -> ValidationReport. Use rapper for syntax validation. Entailment: sh:entailment IRIs, failure if unsupported.

## Sanitised Extract
Table of Contents:
1 Namespace Bindings
2 Shape Definitions
3 Property Shape Constraints
4 Validation Report
5 SHACL-SPARQL Constraints

1 Namespace Bindings
  sh: http://www.w3.org/ns/shacl#
  rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  xsd: http://www.w3.org/2001/XMLSchema#

2 Shape Definitions
  NodeShape:
    Required targets: sh:targetClass or sh:targetNode or sh:targetSubjectsOf or sh:targetObjectsOf
    Severity: sh:severity default sh:Violation
    Message: sh:message string
    Deactivation: sh:deactivated boolean
    Embed property constraints with sh:property -> PropertyShape
  PropertyShape:
    Path: sh:path rdf:Property or path expression
    Constraint parameters: choose one or more of:
      Value type: sh:class IRI, sh:datatype IRI, sh:nodeKind IRI among sh:BlankNode, sh:IRI, sh:Literal
      Cardinality: sh:minCount integer >=0, sh:maxCount integer >=0
      Range: sh:minInclusive, sh:maxInclusive, sh:minExclusive, sh:maxExclusive literal or typed literal
      String: sh:minLength, sh:maxLength integer >=0; sh:pattern regex; sh:languageIn list of language tags; sh:uniqueLang boolean
      Pair: sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals rdf:Property
      Logical: sh:not single shape; sh:and, sh:or, sh:xone list of shapes
      Shape-based: sh:node shape; sh:property propertyshape; sh:qualifiedValueShape, sh:qualifiedMinCount, sh:qualifiedMaxCount qualified constraints
      Other: sh:closed boolean; sh:ignoredProperties list of properties; sh:hasValue single term; sh:in list of terms
    Non-validating: sh:name string, sh:description string, sh:order integer, sh:group group, sh:defaultValue any

3 Property Shape Constraints
  Constraint parameters precise types and cardinalities as above

4 Validation Report
  sh:ValidationReport:
    sh:conforms boolean
    sh:result repeated sh:ValidationResult
    sh:shapesGraphWellFormed boolean
  sh:ValidationResult:
    sh:focusNode term
    sh:resultPath path
    sh:value term
    sh:sourceShape shape
    sh:sourceConstraintComponent constraint component
    sh:resultSeverity severity
    sh:resultMessage repeated string
    sh:detail repeated ValidationResult

5 SHACL-SPARQL Constraints
  Define SPARQL-based constraint with:
    sh:prefixes list of (prefix, namespace)
    sh:select SELECT query string or sh:ask ASK query string
  Pre-bound variables: $this, $shapesGraph, $currentShape

## Original Source
SHACL (Shapes Constraint Language)
https://www.w3.org/TR/shacl/

## Digest of SHACL_CORE

# SHACL Core Language

Defines SHACL Core for representing shapes, targets, and constraints in RDF. All implementations MUST support:

Namespaces:
  sh: http://www.w3.org/ns/shacl#
  rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#
  rdfs: http://www.w3.org/2000/01/rdf-schema#
  xsd: http://www.w3.org/2001/XMLSchema#

## NodeShape and PropertyShape

NodeShape (sh:NodeShape)
  Domain: sh:Shape
  Properties:
    sh:targetClass (rdfs:Class) cardinality 1..
    sh:targetNode (IRI or literal) cardinality 0..*
    sh:targetSubjectsOf (rdf:Property)
    sh:targetObjectsOf (rdf:Property)
    sh:severity (sh:Severity) default sh:Violation
    sh:message (xsd:string or rdf:langString) cardinality 0..*
    sh:deactivated (xsd:boolean) default false
    sh:property (sh:PropertyShape) cardinality 0..*

PropertyShape (sh:PropertyShape)
  Domain: sh:Shape
  Required:
    sh:path (rdf:Property or sh:Path) cardinality 1
  Constraint parameters (choose one or more):
    sh:class (rdfs:Resource)
    sh:datatype (rdfs:Resource)
    sh:minCount (xsd:integer >=0)
    sh:maxCount (xsd:integer >=0)
    sh:minInclusive, sh:maxInclusive, sh:minExclusive, sh:maxExclusive (xsd:string or xsd:integer)
    sh:minLength, sh:maxLength (xsd:integer >=0)
    sh:pattern (xsd:string, Java regex)
    sh:languageIn (rdf:List of xsd:string language tags)
    sh:uniqueLang (xsd:boolean)
    sh:equals, sh:disjoint, sh:lessThan, sh:lessThanOrEquals (rdf:Property)
    sh:not (sh:Shape)
    sh:and, sh:or, sh:xone (rdf:List of sh:Shape)
    sh:node (sh:NodeShape)
    sh:property (sh:PropertyShape)
    sh:closed (xsd:boolean) default false
    sh:ignoredProperties (rdf:List of rdf:Property)
    sh:in (rdf:List of RDF terms)
    sh:hasValue (any RDF term)
  Non-validating:
    sh:name, sh:description (xsd:string or rdf:langString)
    sh:order (xsd:integer)
    sh:group (sh:PropertyGroup)
    sh:defaultValue (any)

## Validation Report

sh:ValidationReport
  Instance of: sh:ValidationReport
  Properties:
    sh:conforms (xsd:boolean)
    sh:result (sh:ValidationResult) 0..*
    sh:shapesGraphWellFormed (xsd:boolean)

sh:ValidationResult
  Instance of: sh:ValidationResult
  Properties:
    sh:focusNode (node)
    sh:resultPath (rdf:Path)
    sh:value (any)
    sh:sourceShape (sh:Shape)
    sh:sourceConstraintComponent (sh:ConstraintComponent)
    sh:resultSeverity (sh:Severity)
    sh:resultMessage (xsd:string or rdf:langString) 0..*
    sh:detail (sh:ValidationResult) 0..*

# SPARQL-based Constraints (SHACL-SPARQL)

Pre-bound variables: $this, $shapesGraph, $currentShape. Use in sh:select or sh:ask validators.

Syntax: define sh:SPARQLConstraint
  sh:prefixes (rdf:List of prefix declarations)
  sh:select (xsd:string) SPARQL SELECT query
  sh:ask (xsd:string) SPARQL ASK query

# Retrieved
Date: 2024-06-01
Data Size: 20361046 bytes

## Attribution
- Source: SHACL (Shapes Constraint Language)
- URL: https://www.w3.org/TR/shacl/
- License: License: Royalty-Free W3C Recommendation
- Crawl Date: 2025-05-02T03:06:34.330Z
- Data Size: 20361046 bytes
- Links Found: 161811

## Retrieved
2025-05-02
library/JSONLD_CLI.md
# library/JSONLD_CLI.md
# JSONLD_CLI

## Crawl Summary
jsonld-cli is a Node.js command-line interface for JSON-LD manipulation. Install via npm globally or use npx. Core commands: lint, compact, expand, flatten, canonize, fromRdfa. Syntax: jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]. Global options: -h/--help, -V/--version. Command-specific options: -c/--context for compact, --base for base IRI, -q/--quads for N-Quads output. Supports stdin, file paths, and HTTP(S) URLs. Outputs to stdout or file. Security: be cautious of remote document loading and recursive file access.

## Normalised Extract
Table of Contents:
1. Installation
2. CLI Syntax
3. Commands Overview
4. Detailed Command Specifications
5. Input & Output Handling
6. Usage Examples

1. Installation
   Command: npm install -g jsonld-cli
   Alternative: npx jsonld-cli <command>

2. CLI Syntax
   Format: jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]
   INPUT: '-', URL (http:// or https://), or filepath
   OUTPUT: stdout (default) or redirect to file

3. Commands Overview
   lint       Validate JSON-LD
   compact    Compact JSON-LD with a context
   expand     Expand JSON-LD fully
   flatten    Flatten JSON-LD graph
   canonize   Canonicalize to N-Quads
   fromRdfa   Convert RDFa to JSON-LD

4. Detailed Command Specifications
   lint:
     Usage: jsonld lint <INPUT>
     Exit Codes: 0=valid, non-zero=errors

   compact:
     Usage: jsonld compact -c CONTEXT [--base BASEIRI] <INPUT> [OUTPUT]
     Options:
       -c, --context string (required)
       --base string (optional)
     Behavior: applies JSON-LD Compaction algorithm as per JSON-LD 1.1

   expand:
     Usage: jsonld expand [--base BASEIRI] <INPUT> [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Expansion algorithm

   flatten:
     Usage: jsonld flatten [--base BASEIRI] <INPUT> [CONTEXT] [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Flattening algorithm, then optional compaction

   canonize:
     Usage: jsonld canonize -q <INPUT> [OUTPUT]
     Options:
       -q, --quads boolean
     Behavior: applies RDF Dataset Canonicalization (URDNA2015)

   fromRdfa:
     Usage: jsonld fromRdfa <INPUT> [OUTPUT]
     Behavior: extracts JSON-LD from RDFa 1.0 annotations

5. Input & Output Handling
   Use '-' or omit INPUT for stdin
   Redirect output: jsonld expand in.json > out.json

6. Usage Examples
   jsonld lint https://example.com/data.json
   jsonld compact -c https://w3id.org/payswarm/v1 http://recipes.payswarm.com/?p=10554
   jsonld canonize -q http://recipes.payswarm.com/?p=10554


## Supplementary Details
Environment Requirements:
  Node.js >=10.x
  npm >=6.x

Dependencies:
  jsonld.js >=5.0.0
  jsonld-request >=3.0.0

Installation Effects:
  Adds 'jsonld' executable to PATH
  Bin entry: bin/jsonld.js

Default Behavior:
  documentLoader: Node.js http/https fetch
  Output format defaults to JSON-LD for compaction, expansion, flattening
  Canonization defaults to URDNA2015 algorithm

Error Handling:
  Non-zero exit code on exceptions or validation failures

File Redirection:
  `jsonld expand input.json > expanded.json`

Deterministic Hash Workflow:
  jsonld canonize -q dataset.html | sha256sum


## Reference Details
Complete Command Specifications:

jsonld lint <INPUT>
  INPUT: string (filepath | URL | '-')
  Exit Codes: 0 = no issues, 1 = errors

jsonld compact -c <CONTEXT> [--base <BASEIRI>] <INPUT> [OUTPUT]
  --context, -c: string (required)
  --base: string (optional)
  Example:
    jsonld compact -c context.json input.json > out.json

jsonld expand [--base <BASEIRI>] <INPUT> [OUTPUT]
  --base: string (optional)
  Example:
    jsonld expand input.json > expanded.json

jsonld flatten [--base <BASEIRI>] <INPUT> [CONTEXT] [OUTPUT]
  --base: string (optional)
  Example:
    jsonld flatten input.json context.json > flat.json

jsonld canonize -q <INPUT> [OUTPUT]
  --quads, -q: boolean flag
  Example:
    jsonld canonize -q input.html > quads.nq

jsonld fromRdfa <INPUT> [OUTPUT]
  Example:
    jsonld fromRdfa page.html > extracted.json

Global Options:
  -h, --help: display help text
  -V, --version: output version number

Best Practices:
  Always specify absolute context URLs or local file paths
  Use --base when relative terms present in data
  For hashing, pipe canonize quads into a digest tool
  Monitor exit code in scripts to detect failures

Step-by-step Troubleshooting:
1. Invalid JSON-LD syntax:
   Command: jsonld lint file.json
   Expected: exit 0 and no stderr
2. Missing context file:
   Error: ENOENT context not found
   Fix: verify file path or URL
3. Network fetch failure:
   Command: jsonld compact -c http://example.com/ctx input.json
   Error: FetchError ECONNREFUSED
   Fix: check network or use local context
4. Unexpected output format:
   Ensure correct flags (-q for N-Quads)



## Information Dense Extract
jsonld-cli: Node.js CLI for JSON-LD. Install: npm i -g jsonld-cli or npx. Usage: jsonld [CMD] [OPTIONS] <IN> [OUT]. CMDs: lint(IN)->exit 0/1; compact -c CONTEXT [--base BASE] IN->compacted JSON-LD; expand [--base BASE] IN->expanded JSON-LD; flatten [--base BASE] IN [CONTEXT]->flattened JSON-LD; canonize -q IN->canonical N-Quads; fromRdfa IN->expanded JSON-LD from RDFa. Global opts: -h, --help; -V, --version. Command opts: -c/--context string; --base string; -q/--quads flag. Input: filepath|URL|stdin. Output: stdout or redirect. Examples: jsonld compact -c ctx.json in.html > out.json; jsonld canonize -q in.html | sha256sum. Exit codes: 0 success, non-zero error. Use local contexts to avoid remote fetches.

## Sanitised Extract
Table of Contents:
1. Installation
2. CLI Syntax
3. Commands Overview
4. Detailed Command Specifications
5. Input & Output Handling
6. Usage Examples

1. Installation
   Command: npm install -g jsonld-cli
   Alternative: npx jsonld-cli <command>

2. CLI Syntax
   Format: jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]
   INPUT: '-', URL (http:// or https://), or filepath
   OUTPUT: stdout (default) or redirect to file

3. Commands Overview
   lint       Validate JSON-LD
   compact    Compact JSON-LD with a context
   expand     Expand JSON-LD fully
   flatten    Flatten JSON-LD graph
   canonize   Canonicalize to N-Quads
   fromRdfa   Convert RDFa to JSON-LD

4. Detailed Command Specifications
   lint:
     Usage: jsonld lint <INPUT>
     Exit Codes: 0=valid, non-zero=errors

   compact:
     Usage: jsonld compact -c CONTEXT [--base BASEIRI] <INPUT> [OUTPUT]
     Options:
       -c, --context string (required)
       --base string (optional)
     Behavior: applies JSON-LD Compaction algorithm as per JSON-LD 1.1

   expand:
     Usage: jsonld expand [--base BASEIRI] <INPUT> [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Expansion algorithm

   flatten:
     Usage: jsonld flatten [--base BASEIRI] <INPUT> [CONTEXT] [OUTPUT]
     Options: --base string
     Behavior: applies JSON-LD Flattening algorithm, then optional compaction

   canonize:
     Usage: jsonld canonize -q <INPUT> [OUTPUT]
     Options:
       -q, --quads boolean
     Behavior: applies RDF Dataset Canonicalization (URDNA2015)

   fromRdfa:
     Usage: jsonld fromRdfa <INPUT> [OUTPUT]
     Behavior: extracts JSON-LD from RDFa 1.0 annotations

5. Input & Output Handling
   Use '-' or omit INPUT for stdin
   Redirect output: jsonld expand in.json > out.json

6. Usage Examples
   jsonld lint https://example.com/data.json
   jsonld compact -c https://w3id.org/payswarm/v1 http://recipes.payswarm.com/?p=10554
   jsonld canonize -q http://recipes.payswarm.com/?p=10554

## Original Source
jsonld-cli (JSON-LD Command-Line Interface)
https://github.com/digitalbazaar/jsonld-cli

## Digest of JSONLD_CLI

# Installation

Install globally via npm:

    npm install -g jsonld-cli

Or invoke directly with npx:

    npx jsonld-cli <command> [options] <input> [output]

# Usage

Syntax:

    jsonld [COMMAND] [OPTIONS] <INPUT> [OUTPUT]

Inputs:
  - stdin (omit INPUT or use '-')
  - local file path
  - HTTP(S) URL

Outputs:
  - stdout (default)
  - redirected to file

# Commands and Options

## lint

Usage:

    jsonld lint <INPUT>

Behavior:
  - Validates JSON-LD syntax and common issues
  - Exit code 0 on success, non-zero on error

## compact

Usage:

    jsonld compact -c <CONTEXTPATH|URL> [--base <BASEIRI>] <INPUT> [OUTPUT]

Options:
  -c, --context <string>    Context document (filepath or URL)   [required]
      --base <string>       Base IRI for term expansion         [optional]

Output:
  - Compacted JSON-LD document

## expand

Usage:

    jsonld expand [--base <BASEIRI>] <INPUT> [OUTPUT]

Options:
      --base <string>       Base IRI for term expansion         [optional]

Output:
  - Expanded JSON-LD document

## flatten

Usage:

    jsonld flatten [--base <BASEIRI>] <INPUT> [CONTEXT] [OUTPUT]

Options:
      --base <string>       Base IRI for term expansion         [optional]

Behavior:
  - Flattens tree structure
  - Optional CONTEXT to compact after flattening

## canonize

Usage:

    jsonld canonize -q <INPUT> [OUTPUT]

Options:
  -q, --quads              Output canonical N-Quads dataset    [optional]

Behavior:
  - Applies RDF Dataset canonicalization
  - Outputs N-Quads for deterministic hashing

## fromRdfa

Usage:

    jsonld fromRdfa <INPUT> [OUTPUT]

Behavior:
  - Parses RDFa 1.0 in HTML to expanded JSON-LD

# Security Considerations

- Remote resource loading can expose URLs and data contexts.
- Input may recursively fetch remote or local files.
- Restrict untrusted contexts to prevent data exfiltration.


## Attribution
- Source: jsonld-cli (JSON-LD Command-Line Interface)
- URL: https://github.com/digitalbazaar/jsonld-cli
- License: MIT License
- Crawl Date: 2025-05-02T10:48:19.443Z
- Data Size: 634838 bytes
- Links Found: 4874

## Retrieved
2025-05-02
library/RDFLIB_JS.md
# library/RDFLIB_JS.md
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
library/SPARQL_QUERY.md
# library/SPARQL_QUERY.md
# SPARQL_QUERY

## Crawl Summary
Defines SPARQL 1.1 query language syntax and semantics: prefix/base resolution, triple patterns with abbreviations, query variables ($?,), literal syntax (strings, language tags, datatypes, numeric shorthand), basic graph patterns, OPTIONAL, UNION, FILTER (regex, numeric, logical), property paths (/,^,*,+,?,|), assignments (BIND, VALUES), aggregates (COUNT,SUM,AVG,MIN,MAX,GROUP_CONCAT,SAMPLE), dataset clauses (FROM,FROM NAMED,GRAPH), query forms (SELECT,CONSTRUCT,ASK,DESCRIBE), solution modifiers (DISTINCT,REDUCED,ORDER BY,LIMIT,OFFSET), functions library (RDF term tests, string,numeric,datetime,hash), SPARQL algebra, grammar, conformance.

## Normalised Extract
Table of Contents
1 Prefixes and Base Resolution
2 Triple Pattern Abbreviations
3 Variables and Literals
4 Basic Graph Patterns, OPTIONAL, UNION
5 FILTER Expressions
6 Property Paths
7 Assignments (BIND, VALUES)
8 Aggregates and Grouping
9 Dataset and Graph Selection
10 Query Forms and Modifiers
11 Functions Library

1 Prefixes and Base Resolution
PREFIX <label>:<IRI>
BASE <IRI>
Relative IRI resolution: RFC3986 section 5.2 basic algorithm; no normalization.

2 Triple Pattern Abbreviations
Subject common: <s> <p1> o1; p2 o2.
Object list: <s> p o1,o2.
Blank nodes: [] yields _:bN; _:label constant; [p o; q v].

3 Variables and Literals
Variables: ?v or $v.
Literals:
  "str" or 'str'
  "str"@lang
  "lex"^^<IRI> or ^^prefix:local
  Numeric: integer, decimal, double, true/false.
  Multi-line: """ ... """.

4 Basic Graph Patterns, OPTIONAL, UNION
BGP: sequence of triple patterns.
OPTIONAL { pattern }
{ pat1 } UNION { pat2 }

5 FILTER Expressions
Numeric: (<,>,<=,>=,=,!=)
Logical: &&,||,!, IN(), NOT IN(), EXISTS(), NOT EXISTS().
regex(str,pattern,flags).

6 Property Paths
Concatenation: p1/p2
Inverse: ^p
Zero-or-more: p*
One-or-more: p+
Zero-or-one: p?
Alternatives: p1|p2

7 Assignments (BIND, VALUES)
BIND(expr AS ?v)
VALUES (?v1 ?v2) {(v11 v21) (v12 v22)}

8 Aggregates and Grouping
SELECT (COUNT(?v) AS ?c) WHERE{} GROUP BY ?g HAVING(condition)
Aggregates: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT, SAMPLE

9 Dataset and Graph Selection
FROM <graphIRI>
FROM NAMED <graphIRI>
GRAPH ?g { pattern }

10 Query Forms and Modifiers
SELECT [DISTINCT|REDUCED] ?vars WHERE { } [ORDER BY (?v|ASC(?v)|DESC(?v))] [LIMIT n] [OFFSET m]
CONSTRUCT { template } WHERE { }
ASK WHERE { }
DESCRIBE <IRI>+ WHERE { }

11 Functions Library
isIRI(arg): boolean
isBlank(arg): boolean
isLiteral(arg): boolean
isNumeric(arg): boolean
str(arg): xsd:string
lang(arg): language-tag
datatype(arg): IRI
IRI(str): IRI
BNODE(): blank node
STRDT(str,datatypeIRI): literal
STRLANG(str,lang): literal
UUID(): xsd:string
STRUUDI(): xsd:string
String functions: STRLEN(str): integer, SUBSTR(str,pos,len): string, UCASE(str): string, LCASE(str): string, STRSTARTS(str,pref): boolean, STRENDS(str,suf): boolean, CONTAINS(str,substr): boolean, STRBEFORE(str,substr): string, STRAFTER(str,substr): string, ENCODE_FOR_URI(str): string, CONCAT(str1,...): string, langMatches(tag,pattern): boolean, REGEX(str,pattern,flags): boolean, REPLACE(str,pattern,repl,flags): string
Numeric: abs(x): numeric, round(x): numeric, ceil(x): numeric, floor(x): numeric, RAND(): double
DateTime: now(): xsd:dateTime, year(dt): integer, month(dt): integer, day(dt): integer, hours(dt): integer, minutes(dt): integer, seconds(dt): decimal, timezone(dt): xsd:dayTimeDuration, tz(dt): xsd:string
Hash: MD5(str): hexBinary, SHA1(str): hexBinary, SHA256(str): hexBinary, SHA384(str): hexBinary, SHA512(str): hexBinary

## Supplementary Details
Implementation Steps:
1. Define PREFIX and BASE.
2. Construct WHERE clause with BGP.
3. Use abbreviations for compact patterns.
4. Apply OPTIONAL, UNION as needed.
5. Add FILTER with expressions or regex.
6. Use property paths for graph traversal.
7. Introduce BIND/VALUES for inline data.
8. Group results with GROUP BY and apply aggregates.
9. Specify source graphs via FROM, FROM NAMED, and GRAPH.
10. Select output form (SELECT, CONSTRUCT, ASK, DESCRIBE).
11. Modify solution sequence with ORDER BY, LIMIT, OFFSET.

Configuration Options:
- DISTINCT vs REDUCED: duplicate elimination.
- Order expressions: variable, ASC()/DESC().
- Limit: non-negative integer.
- Offset: non-negative integer.

Performance Best Practices:
- Restrict dataset sizes with FROM and named graphs.
- Use BIND over subqueries for computed values.
- Use property path alternatives sparingly.



## Reference Details
# API Specifications and Implementation Patterns

## A. SDK Method Signatures (Pseudo-Java/Python)

### executeSelect(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> ResultSet
Parameters:
  query: SPARQL SELECT query string
  dataset: optional default and named graphs
  parameters: bindings for parameterized queries
Return: ResultSet with getVariableBindings() -> List<Map<String,RDFTerm>>

### executeConstruct(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> Graph
Return: RDF graph

### executeAsk(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> Boolean

### executeDescribe(query: String, dataset: Optional<Dataset>, parameters: Map<String,Object>) -> Graph


## B. Code Examples

### Java Example (Apache Jena)
Model model = FileManager.get().loadModel("data.ttl");
Query query = QueryFactory.create("PREFIX dc:<http://purl.org/dc/elements/1.1/> SELECT ?title WHERE { ?s dc:title ?title } ORDER BY ?title LIMIT 10");
try(QueryExecution qexec = QueryExecutionFactory.create(query, model)) {
  ResultSet rs = qexec.execSelect();
  while(rs.hasNext()) {
    QuerySolution sol = rs.nextSolution();
    System.out.println(sol.getLiteral("title").getString());
  }
}

### Python Example (RDFlib)
from rdflib import Graph
from rdflib.plugins.sparql.processor import prepareQuery

g = Graph()
 g.parse("data.ttl", format="turtle")
 q = prepareQuery(
     "PREFIX foaf:<http://xmlns.com/foaf/0.1/>\n"
     "SELECT ?name WHERE { ?s foaf:name ?name } ORDER BY ?name"
 )
 for row in g.query(q):
     print(row.name)

## C. Configuration Options
- queryTimeout: integer milliseconds (default 0 = no timeout)
- maxQueryDepth: integer (default 10)
- enablePropertyPaths: boolean (default true)
- defaultOrder: ASC

## D. Troubleshooting Procedures

### 1. Syntax Errors
Command: run query via CLI `sparql --query q.rq`
Expected: `ERROR: Syntax error at line X, column Y: unexpected token`
Action: verify prefix declarations, variable names, grammar compliance.

### 2. Performance Issues
Symptoms: query execution slow, high memory
Commands: ENABLE PROFILE
Expected: detailed operation cost breakdown
Action: add FILTER early, restrict GRAPH, use indexes.

### 3. Missing Results
Check: dataset default graph, FROM clauses.
Command: `sparql --query q.rq --data data.ttl --default-graph-uri <graphIRI>`
Expected: correct bindings.

## E. Best Practices
- Always declare PREFIX to shorten URIs.
- Use LIMIT and ORDER BY to paginate.
- Prefer BIND over nested SELECT for computed expressions.
- Use VALUES for small inline data sets.
- Use GRAPH to restrict queries to specific named graphs.



## Information Dense Extract
PREFIX,BASE: label->IRI, relative IRI resolution per RFC3986. Triple patterns: s p o; s p1 o1,p2 o2. Blank nodes: [],_:lbl,[p o;q v]. Variables: ?v,$v. Literals: "...",'...',@lang,^^<IRI>,integer,decimal,double,boolean. BGP: sequence of triple patterns. OPTIONAL{pat},{pat1}UNION{pat2}. FILTER: comparison,logical,IN,NOT IN,EXISTS,NOT EXISTS,regex(str,pat,flags). Property paths: p1/p2,^p,p*,p+,p?,p1|p2. BIND(expr AS ?v),VALUES(?v1?v2){(v11 v21)...}. Aggregates:COUNT,SUM,AVG,MIN,MAX,GROUP_CONCAT,SAMPLE; GROUP BY,HAVING. Dataset:FROM<iri>,FROM NAMED<iri>,GRAPH?g{pat}. Query forms:SELECT[DISTINCT|REDUCED]?varsWHERE{pat}[ORDER BY expr][LIMIT n][OFFSET m];CONSTRUCT{tpl}WHERE{pat};ASK;DESCRIBE. Functions: isIRI,isBlank,isLiteral,isNumeric,str,lang,datatype,IRI(),BNODE(),STRDT(),STRLANG(),UUID(),STRUUID(); STRLEN,SUBSTR,UCASE,LCASE,STRSTARTS,STRENDS,CONTAINS,STRBEFORE,STRAFTER,ENCODE_FOR_URI,CONCAT,langMatches,REGEX,REPLACE; abs,round,ceil,floor,RAND; now,year,month,day,hours,minutes,seconds,timezone,tz; MD5,SHA1,SHA256,SHA384,SHA512. Execution: executeSelect(query,dataset,params)->ResultSet; execConstruct->Graph; execAsk->Boolean; execDescribe->Graph. CLI debugging: syntax errors, profiling, dataset URIs. Defaults: queryTimeout=0,maxQueryDepth=10,enablePropertyPaths=true,defaultOrder=ASC.

## Sanitised Extract
Table of Contents
1 Prefixes and Base Resolution
2 Triple Pattern Abbreviations
3 Variables and Literals
4 Basic Graph Patterns, OPTIONAL, UNION
5 FILTER Expressions
6 Property Paths
7 Assignments (BIND, VALUES)
8 Aggregates and Grouping
9 Dataset and Graph Selection
10 Query Forms and Modifiers
11 Functions Library

1 Prefixes and Base Resolution
PREFIX <label>:<IRI>
BASE <IRI>
Relative IRI resolution: RFC3986 section 5.2 basic algorithm; no normalization.

2 Triple Pattern Abbreviations
Subject common: <s> <p1> o1; p2 o2.
Object list: <s> p o1,o2.
Blank nodes: [] yields _:bN; _:label constant; [p o; q v].

3 Variables and Literals
Variables: ?v or $v.
Literals:
  'str' or 'str'
  'str'@lang
  'lex'^^<IRI> or ^^prefix:local
  Numeric: integer, decimal, double, true/false.
  Multi-line: ''' ... '''.

4 Basic Graph Patterns, OPTIONAL, UNION
BGP: sequence of triple patterns.
OPTIONAL { pattern }
{ pat1 } UNION { pat2 }

5 FILTER Expressions
Numeric: (<,>,<=,>=,=,!=)
Logical: &&,||,!, IN(), NOT IN(), EXISTS(), NOT EXISTS().
regex(str,pattern,flags).

6 Property Paths
Concatenation: p1/p2
Inverse: ^p
Zero-or-more: p*
One-or-more: p+
Zero-or-one: p?
Alternatives: p1|p2

7 Assignments (BIND, VALUES)
BIND(expr AS ?v)
VALUES (?v1 ?v2) {(v11 v21) (v12 v22)}

8 Aggregates and Grouping
SELECT (COUNT(?v) AS ?c) WHERE{} GROUP BY ?g HAVING(condition)
Aggregates: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT, SAMPLE

9 Dataset and Graph Selection
FROM <graphIRI>
FROM NAMED <graphIRI>
GRAPH ?g { pattern }

10 Query Forms and Modifiers
SELECT [DISTINCT|REDUCED] ?vars WHERE { } [ORDER BY (?v|ASC(?v)|DESC(?v))] [LIMIT n] [OFFSET m]
CONSTRUCT { template } WHERE { }
ASK WHERE { }
DESCRIBE <IRI>+ WHERE { }

11 Functions Library
isIRI(arg): boolean
isBlank(arg): boolean
isLiteral(arg): boolean
isNumeric(arg): boolean
str(arg): xsd:string
lang(arg): language-tag
datatype(arg): IRI
IRI(str): IRI
BNODE(): blank node
STRDT(str,datatypeIRI): literal
STRLANG(str,lang): literal
UUID(): xsd:string
STRUUDI(): xsd:string
String functions: STRLEN(str): integer, SUBSTR(str,pos,len): string, UCASE(str): string, LCASE(str): string, STRSTARTS(str,pref): boolean, STRENDS(str,suf): boolean, CONTAINS(str,substr): boolean, STRBEFORE(str,substr): string, STRAFTER(str,substr): string, ENCODE_FOR_URI(str): string, CONCAT(str1,...): string, langMatches(tag,pattern): boolean, REGEX(str,pattern,flags): boolean, REPLACE(str,pattern,repl,flags): string
Numeric: abs(x): numeric, round(x): numeric, ceil(x): numeric, floor(x): numeric, RAND(): double
DateTime: now(): xsd:dateTime, year(dt): integer, month(dt): integer, day(dt): integer, hours(dt): integer, minutes(dt): integer, seconds(dt): decimal, timezone(dt): xsd:dayTimeDuration, tz(dt): xsd:string
Hash: MD5(str): hexBinary, SHA1(str): hexBinary, SHA256(str): hexBinary, SHA384(str): hexBinary, SHA512(str): hexBinary

## Original Source
SPARQL 1.1 Query Language
https://www.w3.org/TR/sparql11-query/

## Digest of SPARQL_QUERY

# SPARQL 1.1 Query Language (W3C Recommendation 21 March 2013)
Date Retrieved: 2024-06-05

## 1 Introduction
RDF represents data as directed labeled graph. SPARQL defines syntax and semantics to query RDF: basic graph patterns, OPTIONAL, UNION, FILTER, GROUP BY, ORDER BY, subqueries, property paths, negation (MINUS, NOT EXISTS), assignments (BIND, VALUES), aggregates, dataset specification (FROM, FROM NAMED), query forms (SELECT, CONSTRUCT, ASK, DESCRIBE), solution modifiers (DISTINCT, REDUCED, LIMIT, OFFSET), functions on RDF terms, numerics, strings, dates, hash, extensible value testing, SPARQL algebra, grammar, conformance.

## 2 Key Syntax & Semantics

### 2.1 Prefixes & Base
PREFIX <label>: <IRI>
BASE <IRI>
Relative IRIs resolved per RFC3986 (no normalization steps).

### 2.2 Triple Pattern Syntax
A triple pattern: subject predicate object. Abbreviations:
- Predicate-object list: `<s> <p1> <o1>; <p2> <o2>.`
- Object list: `<s> <p> <o1>,<o2>.`
- Blank node: `[]` or `_:label` or `[p o; q v]`.

### 2.3 Query Variables
Syntax: `?var` or `$var` (identical semantics).

### 2.4 Literals
- String: `"..."`, `"""..."""`.
- Language-tag: `"text"@lang`.
- Typed: `"lex"^^<datatypeIRI>` or `"lex"^^prefix:local`.
- Numeric shorthand: integer, decimal, double, boolean.

### 2.5 Basic Graph Pattern (BGP)
List of triple patterns in WHERE.

### 2.6 Optional & Union
- OPTIONAL { pattern }
- { pattern1 } UNION { pattern2 }

### 2.7 Filters
FILTER expressions: numeric comparisons, logical, regex, EXISTS/NOT EXISTS, IN, NOT IN.
Flags: case-insensitive `regex("str","pat","i")`.

### 2.8 Property Paths
Syntax: `<p1>/<p2>`, `^<p>`, `<p>*`, `<p>+`, `<p>?`, `<p1>|<p2>`.

### 2.9 Assignments
- BIND(expression AS ?var)
- VALUES (?v1 ?v2) { (val1 val2) … }

### 2.10 Aggregates
COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT, SAMPLE.
GROUP BY, HAVING.

### 2.11 Dataset
FROM <graphIRI>, FROM NAMED <graphIRI>
GRAPH ?g { pattern }

### 2.12 Query Forms
SELECT [DISTINCT|REDUCED] ?vars WHERE { … } [ORDER BY …] [LIMIT n] [OFFSET m]
CONSTRUCT { template } WHERE { … }
ASK WHERE { … }
DESCRIBE IRI-list WHERE { … }

### 2.13 Functions
**RDF Terms**: isIRI, isBlank, isLiteral, isNumeric, str, lang, datatype, IRI(), BNODE(), STRDT(), STRLANG(), UUID(), STRUUID()
**Strings**: STRLEN, SUBSTR, UCASE, LCASE, STRSTARTS, STRENDS, CONTAINS, STRBEFORE, STRAFTER, ENCODE_FOR_URI, CONCAT, langMatches, REGEX, REPLACE
**Numerics**: abs, round, ceil, floor, RAND
**DateTime**: now, year, month, day, hours, minutes, seconds, timezone, tz
**Hash**: MD5, SHA1, SHA256, SHA384, SHA512

## 3 Grammar & Conformance
EBNF grammar in section 19. Conformance in section 20.



## Attribution
- Source: SPARQL 1.1 Query Language
- URL: https://www.w3.org/TR/sparql11-query/
- License: License: Royalty-Free W3C Recommendation
- Crawl Date: 2025-05-02T01:04:26.204Z
- Data Size: 87957753 bytes
- Links Found: 96214

## Retrieved
2025-05-02
library/FETCH_API.md
# library/FETCH_API.md
# FETCH_API

## Crawl Summary
Unified fetch across web platform. fetch(RequestInfo, RequestInit) returns Promise<Response>. RequestInit options: method, headers, body, mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal. AbortController controls cancellation. Response methods: clone, arrayBuffer, blob, formData, json, text. Headers API methods: append, delete, get, has, set, iteration. CORS safelist rules for methods and headers. Streaming via ReadableStream.

## Normalised Extract
Table of Contents
1 fetch API Signature
2 RequestInit Options
3 AbortController Usage
4 Response Methods and Properties
5 Headers Interface and Rules
6 Body Streaming

1 fetch API Signature
fetch(input: RequestInfo, init?: RequestInit) -> Promise<Response>

2 RequestInit Options
method: string default GET
headers: HeadersInit default empty
body: BodyInit default null
mode: same-origin|no-cors|cors|navigate|websocket default no-cors
credentials: omit|same-origin|include default same-origin
cache: default|no-store|reload|no-cache|force-cache|only-if-cached default default
redirect: follow|error|manual default follow
referrer: no-referrer|client|URL default client
referrerPolicy: no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,same-origin,strict-origin,strict-origin-when-cross-origin,unsafe-url default empty
integrity: string default empty
keepalive: boolean default false
signal: AbortSignal default null

3 AbortController Usage
Create: controller = new AbortController(), signal = controller.signal
Abort: controller.abort() sets state to aborted and rejects fetch with AbortError

4 Response Methods and Properties
clone() -> Response
arrayBuffer() -> Promise<ArrayBuffer>
blob() -> Promise<Blob>
formData() -> Promise<FormData>
json() -> Promise<any>
text() -> Promise<string>
Properties: type, url, redirected, status, ok, statusText, headers, bodyUsed, body

5 Headers Interface and Rules
Constructor: new Headers(entries)
append(name, value)
delete(name)
get(name) -> string|null
has(name) -> boolean
set(name, value)
iterate: entries(), keys(), values(), forEach, Symbol.iterator
Rules: names stored lowercased, duplicates combined, forbidden request headers list, CORS-safelisted methods/headers

6 Body Streaming
reader = response.body.getReader()
read loop: reader.read().then(({done,value}) => ...)
full read: response.text(), response.json(), etc.

## Supplementary Details
Request modes impact redirect and CORS behavior: same-origin enforces origin match; cors triggers preflight if needed; no-cors restricts methods to GET,HEAD,POST and safelisted headers; navigate for document navigation; websocket for ws connection. Cache modes: default inspects HTTP cache, no-store bypasses cache, reload bypass request cache, no-cache conditional, force-cache any cached, only-if-cached same-origin only. Credentials modes: omit removes credentials, same-origin includes only same-origin, include always include. Redirect modes: follow auto-redirect, error rejects on redirect, manual returns opaque-redirect for service workers. ReferrerPolicy mapping defines header value transformation. Integrity checks subresource integrity string of form hash-algorithm-base64. keepalive allows outliving page unload. signal aborts network fetch. CORS-safelisted headers limited to Accept, Accept-Language, Content-Language, Content-Type with specific MIME essences. Forbidden headers include Accept-Encoding, Host, Origin, Referer, Set-Cookie, Transfer-Encoding.

## Reference Details
IDL Definitions:
interface WindowOrWorkerGlobalScope {
  Promise<Response> fetch(RequestInfo input, optional RequestInit init);
};
dictionary RequestInit {
  DOMString method = "GET";
  HeadersInit headers;
  BodyInit body;
  RequestMode mode = "no-cors";
  RequestCredentials credentials = "same-origin";
  RequestCache cache = "default";
  RequestRedirect redirect = "follow";
  USVString referrer = "client";
  ReferrerPolicy referrerPolicy = "";
  DOMString integrity = "";
  boolean keepalive = false;
  AbortSignal signal = null;
};

Example Usage:
```js
const controller = new AbortController();
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' }),
  mode: 'cors',
  credentials: 'include',
  cache: 'no-cache',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  integrity: 'sha256-AbCdEf123=',
  keepalive: true,
  signal: controller.signal
})
.then(response => {
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
})
.then(data => console.log(data))
.catch(err => console.error('Fetch error:', err));

// Abort example
setTimeout(() => controller.abort(), 5000);

Best Practices:
- Use AbortController for cancellable requests.
- Validate response.ok before processing.
- Use appropriate cache and credentials modes to avoid stale data and security issues.
- Use subresource integrity on cross-origin fetches.

Troubleshooting:
// Check CORS errors via preflight
curl -i -X OPTIONS 'https://api.example.com/data' \
  -H 'Origin: https://client.example' \
  -H 'Access-Control-Request-Method: POST'

Expected 204 No Content with Access-Control-Allow-Origin header.

// Inspect network timing
performance.getEntriesByType('resource').filter(e => e.name.includes('api.example'))


## Information Dense Extract
fetch(input,init)->Promise<Response>; init fields method default GET,headers,body,mode(no-cors),credentials(same-origin),cache(default),redirect(follow),referrer(client),referrerPolicy,integrity,keepalive(false),signal; AbortController.abort() triggers AbortError; Response.clone,arrayBuffer,blob,formData,json,text; Headers append,delete,get,has,set,iterate; requestMode effects, cacheMode semantics, credentialsMode behavior, redirectMode semantics; forbidden headers list and CORS safelist rules; use performance entries for timing.

## Sanitised Extract
Table of Contents
1 fetch API Signature
2 RequestInit Options
3 AbortController Usage
4 Response Methods and Properties
5 Headers Interface and Rules
6 Body Streaming

1 fetch API Signature
fetch(input: RequestInfo, init?: RequestInit) -> Promise<Response>

2 RequestInit Options
method: string default GET
headers: HeadersInit default empty
body: BodyInit default null
mode: same-origin|no-cors|cors|navigate|websocket default no-cors
credentials: omit|same-origin|include default same-origin
cache: default|no-store|reload|no-cache|force-cache|only-if-cached default default
redirect: follow|error|manual default follow
referrer: no-referrer|client|URL default client
referrerPolicy: no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,same-origin,strict-origin,strict-origin-when-cross-origin,unsafe-url default empty
integrity: string default empty
keepalive: boolean default false
signal: AbortSignal default null

3 AbortController Usage
Create: controller = new AbortController(), signal = controller.signal
Abort: controller.abort() sets state to aborted and rejects fetch with AbortError

4 Response Methods and Properties
clone() -> Response
arrayBuffer() -> Promise<ArrayBuffer>
blob() -> Promise<Blob>
formData() -> Promise<FormData>
json() -> Promise<any>
text() -> Promise<string>
Properties: type, url, redirected, status, ok, statusText, headers, bodyUsed, body

5 Headers Interface and Rules
Constructor: new Headers(entries)
append(name, value)
delete(name)
get(name) -> string|null
has(name) -> boolean
set(name, value)
iterate: entries(), keys(), values(), forEach, Symbol.iterator
Rules: names stored lowercased, duplicates combined, forbidden request headers list, CORS-safelisted methods/headers

6 Body Streaming
reader = response.body.getReader()
read loop: reader.read().then(({done,value}) => ...)
full read: response.text(), response.json(), etc.

## Original Source
Fetch Standard
https://fetch.spec.whatwg.org/

## Digest of FETCH_API

# Fetch API

## fetch()

Signature:
```webidl
[Exposed=Window]
Promise<Response> fetch(RequestInfo input, optional RequestInit init);
```

Parameters:
- input: Request or USVString URL
- init: RequestInit dictionary

Returns: Promise resolving to Response object or rejecting with TypeError or network error.

## RequestInit Dictionary

Fields and defaults:
- method (string): defaults to GET
- headers (HeadersInit): empty
- body (BodyInit or null): null
- mode ("same-origin", "no-cors", "cors", "navigate", "websocket"): "no-cors"
- credentials ("omit", "same-origin", "include"): "same-origin"
- cache ("default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"): "default"
- redirect ("follow", "error", "manual"): "follow"
- referrer (USVString or "no-referrer" or "client"): "client"
- referrerPolicy ("no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "same-origin", "strict-origin", "strict-origin-when-cross-origin", "unsafe-url"): ""
- integrity (string): ""
- keepalive (boolean): false
- signal (AbortSignal): null

## AbortController and AbortSignal

Create controller:
```js
const controller = new AbortController();
const signal = controller.signal;
```
Abort fetch:
```js
controller.abort();  // triggers fetch rejection with AbortError
```

## Response Interface

Methods:
- clone(): Response
- arrayBuffer(): Promise<ArrayBuffer>
- blob(): Promise<Blob>
- formData(): Promise<FormData>
- json(): Promise<any>
- text(): Promise<string>

Properties:
- type ("basic","cors","default","error","opaque","opaqueredirect")
- url (USVString)
- redirected (boolean)
- status (unsigned short)
- ok (boolean) // status in 200–299
- statusText (USVString)
- headers (Headers)
- bodyUsed (boolean)
- body (ReadableStream<Uint8Array> or null)

## Headers API

Construct:
```js
new Headers([[name, value], ...]);
```
Methods:
- append(name, value)
- delete(name)
- get(name): string or null
- getAll(name): string[] (nonstandard)
- has(name): boolean
- set(name, value)
- entries(), keys(), values(), forEach(callback)
- [Symbol.iterator]()

Rules:
- header names byte-lowercased for storage; original casing on output
- combine duplicates on get(name)
- forbidden request headers: Accept-Charset, Accept-Encoding, Cookie, Host, Origin, Referer, Set-Cookie, Transfer-Encoding, etc.
- CORS-safelisted methods: GET, HEAD, POST

## Body Streaming

Consume as stream:
```js
response.body.getReader().read().then(function process({ done, value }) { ... });
```

Consume fully:
```js
response.text().then(text => { ... });
```


## Attribution
- Source: Fetch Standard
- URL: https://fetch.spec.whatwg.org/
- License: WHATWG License
- Crawl Date: 2025-05-02T12:58:16.610Z
- Data Size: 10569720 bytes
- Links Found: 149699

## Retrieved
2025-05-02
library/FS_PROMISES.md
# library/FS_PROMISES.md
# FS_PROMISES

## Crawl Summary
Promise-based fs module exposes methods returning Promise. import via 'node:fs/promises'. Key methods: access(path,mode=F_OK):Promise<void>; appendFile(path,data,options={encoding:'utf8',mode:0o666,flag:'a',flush:false}):Promise<void>; copyFile(src,dest,mode=0):Promise<void> with COPYFILE_EXCL|COPYFILE_FICLONE|COPYFILE_FICLONE_FORCE; mkdir(path,options={recursive:false,mode:0o777}):Promise<string|null>; open(path,flags,mode=0o666):Promise<FileHandle>; readFile(path,options={encoding:null,flag:'r',signal?}); writeFile(path,data,options={encoding:'utf8',mode:0o666,flag:'w',signal?}); stat(path,options={bigint:false}):Promise<Stats>; utimes(path,atime,mtime):Promise<void>; rm(path,options); rename(oldPath,newPath):Promise<void>. FileHandle methods: close(), read(buffer,offset=0,length=buffer.byteLength-offset,position=null), write(buffer,offset=0,length=buffer.byteLength-offset,position=null), readFile(options), writeFile(data,options), createReadStream(opts), createWriteStream(opts). fs.constants provides numeric flags.

## Normalised Extract
Table of Contents:
1 Module Import
2 fsPromises API
3 FileHandle Class Methods
4 fs.constants

1 Module Import
import * as fs from 'node:fs/promises'
const fs = require('node:fs/promises')

2 fsPromises API signatures
access(path:string|Buffer|URL, mode?:integer=fs.constants.F_OK):Promise<void>
appendFile(path:string|Buffer|URL|FileHandle, data:string|Buffer, options?:{encoding?:string|null, mode?:integer=0o666, flag?:string='a', flush?:boolean=false}):Promise<void>
copyFile(src:string|Buffer|URL, dest:string|Buffer|URL, mode?:integer=0):Promise<void>
mkdir(path:string|Buffer|URL, options?:{recursive?:boolean=false, mode?:integer=0o777}):Promise<string|null>
open(path:string|Buffer|URL, flags:string, mode?:integer=0o666):Promise<FileHandle>
readFile(path:string|Buffer|URL|FileHandle, options?:{encoding?:string|null, flag?:string='r', signal?:AbortSignal}):Promise<string|Buffer>
writeFile(path:string|Buffer|URL|FileHandle, data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null='utf8', mode?:integer=0o666, flag?:string='w', signal?:AbortSignal}):Promise<void>
stats: stat(path:string|Buffer|URL, options?:{bigint?:boolean=false}):Promise<fs.Stats>
utimes(path:string|Buffer|URL, atime:number|string|Date, mtime:number|string|Date):Promise<void>
rename(oldPath:string|Buffer|URL, newPath:string|Buffer|URL):Promise<void>
rm(path:string|Buffer|URL, options?:{force?:boolean=false, recursive?:boolean=false, maxRetries?:integer=0, retryDelay?:integer=100}):Promise<void>

3 FileHandle Class Methods
close():Promise<void>
read(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|bigint|null=null):Promise<{bytesRead:integer, buffer}>
write(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|null=null):Promise<{bytesWritten:integer, buffer}>
readFile(options?:{encoding?:string|null, signal?:AbortSignal}):Promise<string|Buffer>
writeFile(data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null, signal?:AbortSignal}):Promise<void>
createReadStream(options?:{encoding?:string|null=null, autoClose?:boolean=true, emitClose?:boolean=true, start?:integer=0, end?:integer=Infinity, highWaterMark?:integer=65536, signal?:AbortSignal}):fs.ReadStream
createWriteStream(options?:{encoding?:string='utf8', autoClose?:boolean=true, emitClose?:boolean=true, start?:integer, highWaterMark?:number=16384, flush?:boolean=false}):fs.WriteStream

4 fs.constants numeric flags
File access: F_OK=0, R_OK=4, W_OK=2, X_OK=1
Copy: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
Open: O_RDONLY=0, O_WRONLY=1, O_RDWR=2

## Supplementary Details
mkdir: recursive=true creates nested dirs; returns first created path or null
open flags: r read, r+ read/write, rs+ sync, w truncate/create, wx fail if exists, w+ read/write truncate, wx+ fail if exists, a append/create, ax fail if exists, a+ read/append, ax+ fail if exists. mode mask applies only on file creation
appendFile: path may be FileHandle with write flag; flush=true triggers fsync upon close
copyFile: COPYFILE_FICLONE_FORCE enforces COW clone
rm retries on EBUSY/EACCES with exponential backoff up to maxRetries
readFile: signal AbortSignal cancels read; throws AbortError
read: reading past EOF returns bytesRead=0
write: concurrent writes risk overwrite; use createWriteStream for high volume
streams: autoClose=false leaves descriptor open; must call filehandle.close()
Stats.bigint=true returns numeric values as BigInt
watch: fs.watch(filename, {persistent?:boolean=true, recursive?:boolean=false, encoding?:string='utf8'}):FSWatcher
watcher.close() stops watching

## Reference Details
Example: delete file
```js
import { unlink } from 'node:fs/promises';
try {
  await unlink('/tmp/hello');
  console.log('deleted');
} catch (err) {
  if (err.code === 'ENOENT') console.error('not found');
  else throw err;
}
```

Example: open, read, close
```js
import { open } from 'node:fs/promises';
const handle = await open('file.bin','r+');
const buf=Buffer.alloc(1024);
try {
  const {bytesRead} = await handle.read(buf,0,buf.byteLength,0);
  console.log('read',bytesRead);
} finally {
  await handle.close();
}
```

Example: streaming tail
```js
import { open } from 'node:fs/promises';
const h = await open('log.txt','r');
const rs = h.createReadStream({start:0, end:99, highWaterMark:1024});
rs.on('data',chunk=>process.stdout.write(chunk));
rs.on('end',()=>h.close());
```

Best practice: always close FileHandle in finally. Use AbortSignal to cancel readFile/writeFile: const ac = new AbortController(); setTimeout(() => ac.abort(), 5000); await fs.readFile(path,{signal:ac.signal});

Troubleshoot EACCES:
$ ls -l file.txt
-rw-r--r-- 1 user user 0 Mar 10 12:00 file.txt
$ chmod 644 file.txt

Use `node --trace-warnings script.js` to locate unclosed FileHandle warnings.
Use `strace -e open,read,write node app.js` on Linux to trace syscalls.

## Information Dense Extract
import fs from 'node:fs/promises'; access(path,mode=0):Promise<void>; appendFile(path,data,options={encoding:'utf8',mode:0o666,flag:'a',flush:false'}):Promise<void>; copyFile(src,dest,mode=0):Promise<void>; mkdir(path,options={recursive:false,mode:0o777}):Promise<string|null>; open(path,flags,mode=0o666):Promise<FileHandle>; readFile(path,options={encoding:null,flag:'r',signal?}):Promise<string|Buffer>; writeFile(path,data,options={encoding:'utf8',mode:0o666,flag:'w',signal?}):Promise<void>; stat(path,options={bigint:false}):Promise<Stats>; rename(old,new):Promise<void>; rm(path,options={force:false,recursive:false,maxRetries:0,retryDelay:100}):Promise<void>; FileHandle: close():Promise<void>; read(buf,offset=0,length=buf.byteLength-offset,position=null):Promise<{bytesRead,buffer}>; write(buf,offset=0,length=buf.byteLength-offset,position=null):Promise<{bytesWritten,buffer}>; readFile(options):Promise<string|Buffer>; writeFile(data,options):Promise<void>; createReadStream(opts={encoding:null,autoClose:true,emitClose:true,start:0,end:Infinity,highWaterMark:65536,signal?}):ReadStream; createWriteStream(opts={encoding:'utf8',autoClose:true,emitClose:true,highWaterMark:16384,flush:false}):WriteStream; constants: F_OK=0,R_OK=4,W_OK=2,X_OK=1,COPYFILE_EXCL=1,COPYFILE_FICLONE=2,COPYFILE_FICLONE_FORCE=4; open flags: r,r+,rs+,w,wx,w+,wx+,a,ax,a+,ax+.

## Sanitised Extract
Table of Contents:
1 Module Import
2 fsPromises API
3 FileHandle Class Methods
4 fs.constants

1 Module Import
import * as fs from 'node:fs/promises'
const fs = require('node:fs/promises')

2 fsPromises API signatures
access(path:string|Buffer|URL, mode?:integer=fs.constants.F_OK):Promise<void>
appendFile(path:string|Buffer|URL|FileHandle, data:string|Buffer, options?:{encoding?:string|null, mode?:integer=0o666, flag?:string='a', flush?:boolean=false}):Promise<void>
copyFile(src:string|Buffer|URL, dest:string|Buffer|URL, mode?:integer=0):Promise<void>
mkdir(path:string|Buffer|URL, options?:{recursive?:boolean=false, mode?:integer=0o777}):Promise<string|null>
open(path:string|Buffer|URL, flags:string, mode?:integer=0o666):Promise<FileHandle>
readFile(path:string|Buffer|URL|FileHandle, options?:{encoding?:string|null, flag?:string='r', signal?:AbortSignal}):Promise<string|Buffer>
writeFile(path:string|Buffer|URL|FileHandle, data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null='utf8', mode?:integer=0o666, flag?:string='w', signal?:AbortSignal}):Promise<void>
stats: stat(path:string|Buffer|URL, options?:{bigint?:boolean=false}):Promise<fs.Stats>
utimes(path:string|Buffer|URL, atime:number|string|Date, mtime:number|string|Date):Promise<void>
rename(oldPath:string|Buffer|URL, newPath:string|Buffer|URL):Promise<void>
rm(path:string|Buffer|URL, options?:{force?:boolean=false, recursive?:boolean=false, maxRetries?:integer=0, retryDelay?:integer=100}):Promise<void>

3 FileHandle Class Methods
close():Promise<void>
read(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|bigint|null=null):Promise<{bytesRead:integer, buffer}>
write(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|null=null):Promise<{bytesWritten:integer, buffer}>
readFile(options?:{encoding?:string|null, signal?:AbortSignal}):Promise<string|Buffer>
writeFile(data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null, signal?:AbortSignal}):Promise<void>
createReadStream(options?:{encoding?:string|null=null, autoClose?:boolean=true, emitClose?:boolean=true, start?:integer=0, end?:integer=Infinity, highWaterMark?:integer=65536, signal?:AbortSignal}):fs.ReadStream
createWriteStream(options?:{encoding?:string='utf8', autoClose?:boolean=true, emitClose?:boolean=true, start?:integer, highWaterMark?:number=16384, flush?:boolean=false}):fs.WriteStream

4 fs.constants numeric flags
File access: F_OK=0, R_OK=4, W_OK=2, X_OK=1
Copy: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
Open: O_RDONLY=0, O_WRONLY=1, O_RDWR=2

## Original Source
Node.js fs Promises API
https://nodejs.org/api/fs.html#fs_promises_api

## Digest of FS_PROMISES

# FS Promises API

## Module Import

```js
import * as fs from 'node:fs/promises';
const fs = require('node:fs/promises');
```

## fsPromises Methods

### fs.access(path: string|Buffer|URL, mode?: number): Promise<void>
- mode default: fs.constants.F_OK
- Rejects with Error if access check fails

### fs.appendFile(path: string|Buffer|URL|FileHandle, data: string|Buffer, options?: { encoding?: string|null; mode?: number; flag?: string; flush?: boolean }): Promise<void>
- encoding default: 'utf8'
- mode default: 0o666
- flag default: 'a'
- flush default: false

### fs.copyFile(src: string|Buffer|URL, dest: string|Buffer|URL, mode?: number): Promise<void>
- mode flags: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
- Default mode: 0 (overwrite)

### fs.mkdir(path: string|Buffer|URL, options?: { recursive?: boolean; mode?: number }): Promise<string|null>
- recursive default: false
- mode default: 0o777
- Returns first path created or null if none

### fs.open(path: string|Buffer|URL, flags: string, mode?: number): Promise<FileHandle>
- flags: 'r','r+','rs+','w','wx','w+','wx+','a','ax','a+','ax+'
- mode default: 0o666

### fs.readFile(path: string|Buffer|URL|FileHandle, options?: { encoding?: string|null; flag?: string; signal?: AbortSignal }): Promise<string|Buffer>
- encoding default: null (Buffer)
- flag default: 'r'

### fs.rename(oldPath: string|Buffer|URL, newPath: string|Buffer|URL): Promise<void>

### fs.rm(path: string|Buffer|URL, options?: { force?: boolean; recursive?: boolean; maxRetries?: number; retryDelay?: number }): Promise<void>
- force default: false
- recursive default: false
- maxRetries default: 0
- retryDelay default: 100

### fs.stat(path: string|Buffer|URL, options?: { bigint?: boolean }): Promise<fs.Stats>
- bigint default: false

### fs.utimes(path: string|Buffer|URL, atime: number|string|Date, mtime: number|string|Date): Promise<void>

### fs.writeFile(path: string|Buffer|URL|FileHandle, data: string|Buffer|AsyncIterable|Iterable|Stream, options?: { encoding?: string|null; mode?: number; flag?: string; signal?: AbortSignal }): Promise<void>
- encoding default: 'utf8'
- mode default: 0o666
- flag default: 'w'

## Class FileHandle

### Properties
- fd: number (underlying descriptor)

### Methods

#### filehandle.close(): Promise<void>
Closes descriptor when pending operations complete.

#### filehandle.read(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|bigint|null): Promise<{ bytesRead: number; buffer }>
- offset default: 0
- length default: buffer.byteLength - offset
- position default: null (current)

#### filehandle.write(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|null): Promise<{ bytesWritten: number; buffer }>
- offset default: 0
- length default: buffer.byteLength - offset
- position default: null

#### filehandle.readFile(options?: { encoding?: string|null; signal?: AbortSignal }): Promise<string|Buffer>

#### filehandle.writeFile(data: string|Buffer|AsyncIterable|Iterable|Stream, options?: { encoding?: string|null; signal?: AbortSignal }): Promise<void>

#### filehandle.createReadStream(options?: { encoding?: string|null; autoClose?: boolean; emitClose?: boolean; start?: number; end?: number; highWaterMark?: number; signal?: AbortSignal }): fs.ReadStream
- encoding default: null
- autoClose default: true
- emitClose default: true
- start default: 0
- end default: Infinity
- highWaterMark default: 64*1024

#### filehandle.createWriteStream(options?: { encoding?: string; autoClose?: boolean; emitClose?: boolean; start?: number; highWaterMark?: number; flush?: boolean }): fs.WriteStream
- encoding default: 'utf8'
- autoClose default: true
- emitClose default: true
- highWaterMark default: 16384
- flush default: false

## fs.constants

- File access: F_OK=0, R_OK=4, W_OK=2, X_OK=1
- Copy flags: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
- Open flags: O_RDONLY=0, O_WRONLY=1, O_RDWR=2, plus bitmask constants


## Attribution
- Source: Node.js fs Promises API
- URL: https://nodejs.org/api/fs.html#fs_promises_api
- License: License: Open source (Node.js Foundation)
- Crawl Date: 2025-05-02T00:32:30.726Z
- Data Size: 3595536 bytes
- Links Found: 1471

## Retrieved
2025-05-02
library/PATH_MODULE.md
# library/PATH_MODULE.md
# PATH_MODULE

## Crawl Summary
Platform-sensitive file path utilities. Import via require('node:path') or import. Main functions: basename(path[,suffix])→string; dirname(path)→string; extname(path)→string; format({dir,root,base,name,ext})→string; parse(path)→object; join(...paths)→string; resolve(...paths)→string; normalize(path)→string; isAbsolute(path)→boolean; relative(from,to)→string; matchesGlob(path,pattern)→boolean. Constants: sep, delimiter. Use posix or win32 submodules for consistent cross-platform behavior.

## Normalised Extract
Table of Contents:
1. Module Import
2. Platform Behavior (Windows vs POSIX)
3. Constants: sep, delimiter
4. Core Functions: basename, dirname, extname, parse, format
5. Path Operations: join, resolve, normalize, relative, isAbsolute, matchesGlob
6. Submodules: posix, win32

1. Module Import
  const path = require('node:path');
  import path from 'node:path';

2. Platform Behavior
  Default functions follow host OS path conventions.
  Use path.posix or path.win32 to override.

3. Constants
  path.sep: '\\' on Windows, '/' on POSIX
  path.delimiter: ';' on Windows, ':' on POSIX

4. Core Functions
  basename(path: string, suffix?: string) -> string
    - Removes trailing separators.
    - Strips suffix if provided exactly at end.
    - Throws TypeError if args not strings.

  dirname(path: string) -> string
    - Removes trailing separators.
    - Returns directory portion.
    - Throws TypeError if arg not string.

  extname(path: string) -> string
    - Returns substring from last '.' in basename.
    - Empty string if none or only leading '.'.
    - Throws TypeError if arg not string.

  parse(path: string) -> { root, dir, base, name, ext }
    - Ignores trailing separators.
    - Throws TypeError if arg not string.

  format(obj) -> string
    - Priority: dir+base > root+base > root+name+ext
    - Adds missing '.' on ext if needed.

5. Path Operations
  join(...paths: string[]) -> string
    - Ignores empty segments, normalizes result, returns '.' if empty.
    - Throws TypeError if any non-string.

  resolve(...paths: string[]) -> string
    - Processes segments right-to-left until absolute is found, uses cwd if none.
    - Normalizes result, removes trailing separators except root.
    - Throws TypeError for non-strings.

  normalize(path: string) -> string
    - Resolves '.', '..', duplicates.
    - Preserves trailing separator.
    - Throws TypeError if arg not string.

  relative(from: string, to: string) -> string
    - Returns relative path, '' if same after resolution.
    - Throws TypeError if args not strings.

  isAbsolute(path: string) -> boolean
    - True for recognized absolute literals.
    - Throws TypeError if arg not string.

  matchesGlob(path: string, pattern: string) -> boolean
    - Experimental.
    - Returns true if path matches glob pattern.
    - Throws TypeError if args not strings.

6. Submodules
  path.posix: POSIX-only implementations.
  path.win32: Windows-only implementations.


## Supplementary Details
Import patterns: require('node:path') or import default. For TypeScript, use import * as path from 'path'.

Parameter constraints: all path segments and patterns must be strings. Functions throw TypeError if not.

Configuration options: none. Module behavior determined by host OS or submodule choice.

Implementation steps:
1. Import path module.
2. Select functions based on desired path conventions: default, posix, or win32.
3. Use join/resolve to build normalized absolute paths.
4. Use parse/format for component-level manipulation.
5. Validate absolute paths with isAbsolute before security-sensitive operations.


## Reference Details
# Full API Specifications

path.basename(path: string, suffix?: string): string
Throws: TypeError if path or suffix not string
Examples:
const name = path.basename('/foo/bar/baz.txt'); // 'baz.txt'
const nameNoExt = path.basename('/foo/bar/baz.txt', '.txt'); // 'baz'

path.dirname(path: string): string
Throws: TypeError if path not string
Example:
path.dirname('/foo/bar/baz.txt'); // '/foo/bar'

path.extname(path: string): string
Throws: TypeError if path not string
Examples:
path.extname('index.html'); // '.html'
path.extname('index'); // ''

path.format(obj: { root?: string; dir?: string; base?: string; name?: string; ext?: string }): string
Examples:
path.format({ dir: '/home/user', base: 'file.txt' }); // '/home/user/file.txt'
path.format({ root: '/', name: 'file', ext: 'txt' }); // '/file.txt'

path.parse(path: string): { root: string; dir: string; base: string; name: string; ext: string }
Throws: TypeError if path not string
Example:
path.parse('/home/user/file.txt');
// { root: '/', dir: '/home/user', base: 'file.txt', name: 'file', ext: '.txt' }

path.isAbsolute(path: string): boolean
Throws: TypeError if path not string
path.join(...paths: string[]): string
Throws: TypeError if any not string
path.resolve(...paths: string[]): string
Throws: TypeError if any not string
path.normalize(path: string): string
Throws: TypeError if path not string
path.relative(from: string, to: string): string
Throws: TypeError if args not strings
path.matchesGlob(path: string, pattern: string): boolean  // experimental
Throws: TypeError if args not strings

Constants:
path.sep: '\\' (Windows) or '/' (POSIX)
path.delimiter: ';' (Windows) or ':' (POSIX)

Submodules:
path.posix: same signatures, POSIX separators only
path.win32: same signatures, Windows separators only

# Best Practices
- Always use path.join or path.resolve to combine segments.
- Avoid manual string concatenation with separators.
- Use path.normalize before file-system operations to remove redundancies.
- Validate inputs: ensure typeof path === 'string'.
- For cross-platform consistency, use path.posix or path.win32 explicitly.

# Troubleshooting
## TypeError: Path must be a string. Received [Object]
Cause: non-string argument passed
Solution: cast or validate with `if (typeof p !== 'string') throw new TypeError...`

## Unexpected separators
Issue: mixed '\\' and '/' after join
Solution: apply path.normalize() or use specific submodule (posix/win32).

## Relative path incorrect
Ensure from and to are absolute or supply correct cwd: use path.resolve() before path.relative().

# Troubleshooting Commands
> node -e "console.log(require('node:path').join('foo','bar','..','baz'))"
Outputs: foo/baz
> node -e "console.log(require('node:path').resolve('foo','/bar','baz'))"
Outputs: /bar/baz


## Information Dense Extract
Import: const path = require('node:path'); Functions: basename(path:string,suffix?:string):string; dirname(path:string):string; extname(path:string):string; format({root?,dir?,base?,name?,ext?}):string; parse(path:string):{root,dir,base,name,ext}; join(...paths:string[]):string; resolve(...paths:string[]):string; normalize(path:string):string; relative(from:string,to:string):string; isAbsolute(path:string):boolean; matchesGlob(path:string,pattern:string):boolean; Constants: sep ('/'|\\), delimiter (':'|';'); Submodules: path.posix, path.win32.

## Sanitised Extract
Table of Contents:
1. Module Import
2. Platform Behavior (Windows vs POSIX)
3. Constants: sep, delimiter
4. Core Functions: basename, dirname, extname, parse, format
5. Path Operations: join, resolve, normalize, relative, isAbsolute, matchesGlob
6. Submodules: posix, win32

1. Module Import
  const path = require('node:path');
  import path from 'node:path';

2. Platform Behavior
  Default functions follow host OS path conventions.
  Use path.posix or path.win32 to override.

3. Constants
  path.sep: '''' on Windows, '/' on POSIX
  path.delimiter: ';' on Windows, ':' on POSIX

4. Core Functions
  basename(path: string, suffix?: string) -> string
    - Removes trailing separators.
    - Strips suffix if provided exactly at end.
    - Throws TypeError if args not strings.

  dirname(path: string) -> string
    - Removes trailing separators.
    - Returns directory portion.
    - Throws TypeError if arg not string.

  extname(path: string) -> string
    - Returns substring from last '.' in basename.
    - Empty string if none or only leading '.'.
    - Throws TypeError if arg not string.

  parse(path: string) -> { root, dir, base, name, ext }
    - Ignores trailing separators.
    - Throws TypeError if arg not string.

  format(obj) -> string
    - Priority: dir+base > root+base > root+name+ext
    - Adds missing '.' on ext if needed.

5. Path Operations
  join(...paths: string[]) -> string
    - Ignores empty segments, normalizes result, returns '.' if empty.
    - Throws TypeError if any non-string.

  resolve(...paths: string[]) -> string
    - Processes segments right-to-left until absolute is found, uses cwd if none.
    - Normalizes result, removes trailing separators except root.
    - Throws TypeError for non-strings.

  normalize(path: string) -> string
    - Resolves '.', '..', duplicates.
    - Preserves trailing separator.
    - Throws TypeError if arg not string.

  relative(from: string, to: string) -> string
    - Returns relative path, '' if same after resolution.
    - Throws TypeError if args not strings.

  isAbsolute(path: string) -> boolean
    - True for recognized absolute literals.
    - Throws TypeError if arg not string.

  matchesGlob(path: string, pattern: string) -> boolean
    - Experimental.
    - Returns true if path matches glob pattern.
    - Throws TypeError if args not strings.

6. Submodules
  path.posix: POSIX-only implementations.
  path.win32: Windows-only implementations.

## Original Source
Node.js Path Module
https://nodejs.org/api/path.html

## Digest of PATH_MODULE

# Path Module
Retrieved: 2024-06-05

Stability: 2 - Stable
Source Code: lib/path.js

## Import
```js
const path = require('node:path');
import path from 'node:path';
```

## Windows vs POSIX
- Default functions follow host OS conventions.
- Use `path.win32` for Windows-style paths on any OS.
- Use `path.posix` for POSIX-style paths on any OS.

## path.basename(path, [suffix])
Signature: path.basename(path: string, suffix?: string) -> string
Throws: TypeError if path or suffix is not a string
Returns last portion of path, ignores trailing separators.

## path.delimiter
Type: string
Value: ';' on Windows, ':' on POSIX

## path.dirname(path)
Signature: path.dirname(path: string) -> string
Throws: TypeError if path is not a string
Returns directory part of path, ignores trailing separators.

## path.extname(path)
Signature: path.extname(path: string) -> string
Throws: TypeError if path is not a string
Returns extension from last '.' to end. Empty string if none.

## path.format(pathObject)
Signature: path.format(obj: {root?: string; dir?: string; base?: string; name?: string; ext?: string}) -> string
Priority: dir+base > root+base > root+name+ext
Dot added if ext missing leading '.'.

## path.matchesGlob(path, pattern)
Signature: path.matchesGlob(path: string, pattern: string) -> boolean
Throws: TypeError if args not strings
Experimental (v20.17.0+).

## path.isAbsolute(path)
Signature: path.isAbsolute(path: string) -> boolean
Throws: TypeError if path not string
Detects absolute paths literal only.

## path.join(...paths)
Signature: path.join(...paths: string[]) -> string
Throws: TypeError if any segment not string
Joins with platform separator, normalizes, returns '.' for empty.

## path.normalize(path)
Signature: path.normalize(path: string) -> string
Throws: TypeError if path not string
Normalizes ., .., and duplicate separators. Preserves trailing separator.

## path.parse(path)
Signature: path.parse(path: string) -> { root: string; dir: string; base: string; ext: string; name: string }
Throws: TypeError if path not string
Breaks into components.

## path.relative(from, to)
Signature: path.relative(from: string, to: string) -> string
Throws: TypeError if args not strings
Returns relative path from `from` to `to`.

## path.resolve(...paths)
Signature: path.resolve(...paths: string[]) -> string
Throws: TypeError if any arg not string
Resolves sequence right-to-left to absolute path.

## path.sep
Type: string
Value: '\\' on Windows, '/' on POSIX

## path.toNamespacedPath(path)
Signature: path.toNamespacedPath(path: string) -> string
Returns Windows namespace path or returns input on POSIX.

## posix and win32 submodules
Access via `path.posix` or `path.win32` for OS-specific implementations.


## Attribution
- Source: Node.js Path Module
- URL: https://nodejs.org/api/path.html
- License: License
- Crawl Date: 2025-05-02T06:50:03.059Z
- Data Size: 3515443 bytes
- Links Found: 2331

## Retrieved
2025-05-02
library/JSON_POINTER.md
# library/JSON_POINTER.md
# JSON_POINTER

## Crawl Summary
Defines the JSON Pointer syntax (ABNF for json-pointer and reference-token), escape rules (~0 and ~1), and evaluation algorithm: decode tokens then traverse JSON objects by exact-key match or JSON arrays by numeric index (digits only) or '-' (error). Specifies JSON string representation (escape quotes, backslash, control chars) and URI fragment mapping (UTF-8 plus percent-encoding). Details error conditions: invalid syntax, missing member, index errors.

## Normalised Extract
Table of Contents
1 Syntax
2 Token Decoding
3 Object Traversal
4 Array Traversal
5 JSON String Representation
6 URI Fragment Mapping
7 Error Conditions

1 Syntax
 json-pointer    = *( "/" reference-token )
 reference-token = *( unescaped / escaped )
 unescaped       = U+0000-U+002E / U+0030-U+007D / U+007F-U+10FFFF except '/' and '~'
 escaped         = '~' '0' | '~' '1'

2 Token Decoding
 apply replacements in order: '~1'->'/' then '~0'->'~'

3 Object Traversal
 given value V is object and decoded token T: if V has property T (Unicode exact match) then value = V[T] else error

4 Array Traversal
 given value V is array:
 - if token matches digits per array-index grammar (no leading zeros unless '0'): index = parseInt(token); if index<V.length then value=V[index] else error
 - if token is '-': error by default (element after last)

5 JSON String Representation
 pointer as JSON string must escape '"','\\', control U+0000-U+001F; JSON parser unescapes before use

6 URI Fragment Mapping
 UTF-8 encode pointer; percent-encode any char outside fragment rule (e.g. space,%25,^,|,\",\\); prefix '#'

7 Error Conditions
 errors: invalid syntax, nonexistent object member, invalid or out-of-range array index, '-' token resolution error


## Supplementary Details
Pseudocode for JSON Pointer Evaluation:
function evaluatePointer(document, pointer):
  if pointer == '':
    return document
  tokens = pointer.split('/').slice(1)
  value = document
  for token in tokens:
    decoded = token.replace(/~1/g,'/').replace(/~0/g,'~')
    if typeof value == 'object' && !Array.isArray(value):
      if decoded in value:
        value = value[decoded]
      else:
        throw new ReferenceError('Member not found: '+decoded)
    else if Array.isArray(value):
      if decoded == '-':
        throw new RangeError('Cannot use "-" in evaluation')
      if /^[0]|[1-9]\d*$/.test(decoded):
        idx = parseInt(decoded,10)
        if idx < value.length:
          value = value[idx]
        else:
          throw new RangeError('Index out of bounds: '+decoded)
      else:
        throw new TypeError('Invalid array index: '+decoded)
    else:
      throw new TypeError('Cannot traverse non-container value')
  return value

Example JSON Document and Pointers:
{ 'foo': ['bar','baz'], '':0, 'a/b':1, 'm~n':8 }
evaluatePointer(doc,'') => whole document
evaluatePointer(doc,'/foo/0') => 'bar'
evaluatePointer(doc,'/a~1b') => 1
evaluatePointer(doc,'/m~0n') => 8

Escaping Rules in JSON Strings:
 '"' -> \"  '\\' -> \\\\  U+0000-U+001F -> \uXXXX

URI Fragment Examples:
#/foo -> ['bar','baz']
#/a~1b -> 1
#/c%25d -> 2

## Reference Details
JavaScript SDK Method:
Type Signature:
 function evaluatePointer(document: any, pointer: string): any
Parameters:
 document: parsed JSON value (object or array)
 pointer: JSON Pointer string conforming to RFC6901
Returns:
 The JSON value at the specified location
Throws:
 ReferenceError for missing object property
 RangeError for invalid or out-of-range array index or '-' token
 TypeError for traversal on primitive

Complete Implementation Pattern:
1. Pre-validate pointer with regex: ^(\/(?:~0|~1|[^~/])*)*$
2. Tokenize: pointers=pointer.split('/').slice(1)
3. Iterate tokens and apply pseudocode above
4. Return final value

Configuration Options for Error Handling (application-level):
 onMissingMember: 'throw' or 'default' with defaultMemberValue
 onIndexError: 'throw' or 'clamp' to nearest valid index

Best Practices with Code:
const result = evaluatePointer(data,'/users/0/email')
// wrap in try-catch to handle errors and log contextual info

Detailed Troubleshooting Commands:
// Test pointer syntax validity
echo '/foo/01' | grep -P '^(\/(?:~0|~1|[^~/])*)*$' && echo valid || echo invalid
// Inspect tokens
echo '/foo/01' | sed 's/^\///;s/\//\n/g'
// Check array length and index in REPL
node -e "const arr=[1,2];console.log(arr.length, arr[2])"


## Information Dense Extract
json-pointer=*("/" reference-token); reference-token=*(unescaped|escaped); unescaped=U+0000-002E|0030-007D|007F-10FFFF except '/' '~'; escaped='~0'->'~'|'~1'->'/'; evaluate: if pointer=='' return doc; tokens=split('/')[1..]; decode each token by =~1->/;~0->~; if value is object select property exact-match else if array if digits regex ^0|[1-9]\d*$ parseInt and in-range else '-' error; JSON string pointer must unescape \u0000-\u001F,\",\\; URI fragment: UTF8 then percent-encode unsafe; errors: syntax, missing property, invalid index, non-container traversal; JS function evaluatePointer(document:any,pointer:string):any throws ReferenceError,RangeError,TypeError.

## Sanitised Extract
Table of Contents
1 Syntax
2 Token Decoding
3 Object Traversal
4 Array Traversal
5 JSON String Representation
6 URI Fragment Mapping
7 Error Conditions

1 Syntax
 json-pointer    = *( '/' reference-token )
 reference-token = *( unescaped / escaped )
 unescaped       = U+0000-U+002E / U+0030-U+007D / U+007F-U+10FFFF except '/' and '~'
 escaped         = '~' '0' | '~' '1'

2 Token Decoding
 apply replacements in order: '~1'->'/' then '~0'->'~'

3 Object Traversal
 given value V is object and decoded token T: if V has property T (Unicode exact match) then value = V[T] else error

4 Array Traversal
 given value V is array:
 - if token matches digits per array-index grammar (no leading zeros unless '0'): index = parseInt(token); if index<V.length then value=V[index] else error
 - if token is '-': error by default (element after last)

5 JSON String Representation
 pointer as JSON string must escape ''','''', control U+0000-U+001F; JSON parser unescapes before use

6 URI Fragment Mapping
 UTF-8 encode pointer; percent-encode any char outside fragment rule (e.g. space,%25,^,|,'',''); prefix '#'

7 Error Conditions
 errors: invalid syntax, nonexistent object member, invalid or out-of-range array index, '-' token resolution error

## Original Source
JSON Pointer (RFC 6901)
https://tools.ietf.org/html/rfc6901

## Digest of JSON_POINTER

# Syntax
A JSON Pointer is defined by the ABNF grammar:

json-pointer    = *( "/" reference-token )
reference-token = *( unescaped / escaped )
unescaped       = %x00-2E / %x30-7D / %x7F-10FFFF   ; excludes '/' and '~'
escaped         = '~' ( '0' / '1' )                ; '~0' expands to '~', '~1' to '/'

# Evaluation
To evaluate a JSON Pointer against a JSON document:
1. If the pointer string is empty, return the root document value.
2. Split the pointer at each '/'; discard the initial empty element to get reference tokens.
3. For each token:
   a. Replace all occurrences of '~1' with '/'.
   b. Replace all occurrences of '~0' with '~'.
   c. If the current value is an object, select the property named exactly as the decoded token; if missing, error.
   d. If the current value is an array:
      - If token matches array-index (%x30 or %x31-39 *(%x30-39)), convert to integer and select the element at that zero-based index; if out of range, error.
      - If token is '-', it denotes the position after the last element and by default results in an error.
   e. Otherwise, error when applying a token to a non-container value.
4. Return the final referenced value.

# JSON String Representation
When represented in JSON text, pointers are JSON strings. Per RFC4627, escape '"', '\\', and control characters U+0000–U+001F using backslash escapes. Unescape these before pointer evaluation.

# URI Fragment Identifier Representation
To use a JSON Pointer in a URI fragment:
1. Encode the pointer string as UTF-8 octets.
2. Percent-encode characters not allowed in URI fragment per RFC3986 (e.g., space -> %20, '%' -> %25, '^' -> %5E, '|' -> %7C, '"' -> %22, '\\' -> %5C).
3. Prepend '#' to the percent-encoded UTF-8 string.

# Error Handling
Error conditions:
- Pointer syntax invalid (violates ABNF).
- Reference to a nonexistent object member.
- Array index token invalid or out of range.
- '-' token resolving to nonexistent element.
Applications must specify error handling strategy (throw or recover).

Date retrieved: 2024-06-08
Data Size: 3878567 bytes

## Attribution
- Source: JSON Pointer (RFC 6901)
- URL: https://tools.ietf.org/html/rfc6901
- License: IETF Trust
- Crawl Date: 2025-05-02T11:47:15.836Z
- Data Size: 3878567 bytes
- Links Found: 6555

## Retrieved
2025-05-02
library/URL_MODULE.md
# library/URL_MODULE.md
# URL_MODULE

## Crawl Summary
Provides WHATWG URL Standard API and legacy Node-specific URL parsing utilities. Core classes: URL, URLPattern, URLSearchParams. URL constructor takes input and optional base string. URL instances expose get/set properties for hash, host, hostname, href, origin, password, pathname, port, protocol, search, searchParams, username. Methods toString and toJSON return serialized URL. Static helpers: createObjectURL, revokeObjectURL, canParse, parse. URLPattern supports pattern construction, exec, test with optional base and ignoreCase. URLSearchParams supports multiple constructors, manipulation methods (append, delete, set, sort), accessors (get, getAll, has), iteration via entries, keys, values, iterator, size property. Utilities convert domains, file URLs to paths, format URLs, convert paths to file URLs, and map URLs to HTTP options. Legacy APIs: url.parse, url.format, url.resolve retained for compatibility.

## Normalised Extract
Table of Contents
 1 URL class usage
 2 URL properties assignments
 3 URL serialization
 4 Static URL methods
 5 URLPattern matching
 6 URLSearchParams manipulation
 7 Domain encoding functions
 8 File URL conversions
 9 URL formatting options
 10 HTTP options conversion

1 URL class usage
 Constructor new URL(input[, base])
  input string absolute or relative URL
  base string used if input relative
 Throws TypeError on invalid URL

2 URL properties assignments
  url.hash = '#frag' yields percent-encoded fragment
  url.host = 'host:port' invalid ignored
  url.hostname = 'host' invalid ignored
  url.port accepts numbers or numeric prefixes; default port => ''
  url.protocol = 'scheme:' invalid ignored
  url.search = '?q=v'; url.searchParams reflects changes
  url.username, url.password percent-encoded on set

3 URL serialization
  url.href or url.toString() or url.toJSON() return full URL
  Setting href recreates URL object

4 Static URL methods
  createObjectURL(blob): returns blob URL string
  revokeObjectURL(id): unregisters blob URL
  canParse(input[, base]): returns boolean
  parse(input[, base]): returns URL or null

5 URLPattern matching
  new URLPattern(pattern[, baseURL][, {ignoreCase}])
  exec(input[, baseURL]): returns match object with components and groups
  test(input[, baseURL]): returns boolean

6 URLSearchParams manipulation
  append(name,value)
  delete(name[,value])
  get(name): first value or null
  getAll(name): all values
  has(name[,value])
  set(name,value)
  sort() stable by name
  toString(): serialized 'a=b&c=d'
  iterate with entries(), keys(), values(), forEach
  size property count of entries

7 Domain encoding functions
  domainToASCII(domain): punycode ASCII or '' if invalid
  domainToUnicode(domain): unicode or '' if invalid

8 File URL conversions
  fileURLToPath(url[, {windows}]) => platform path string
  pathToFileURL(path[, {windows}]) => file URL object

9 URL formatting options
  url.format(URL, {auth:boolean, fragment:boolean, search:boolean, unicode:boolean}) => string

10 HTTP options conversion
  urlToHttpOptions(URL): {protocol, hostname, port, path, auth, href, hash, search, pathname}


## Supplementary Details
Implementation steps
 1 Importing
    import { URL, URLPattern, URLSearchParams, domainToASCII, fileURLToPath, format, pathToFileURL, urlToHttpOptions } from 'node:url'
    const url = require('node:url')
 2 Constructing URLs
    const u1 = new URL('https://example.org')
    const u2 = new URL('/path', 'https://example.org')
 3 Modifying components
    u1.pathname = '/new'; u1.searchParams.append('a','1')
 4 Serializing
    const s = u1.href
 5 Pattern matching
    const p = new URLPattern('https://*/api/*',{ignoreCase:true}); const m = p.exec('https://nodejs.org/api/url.html')
 6 Query parameter workflows
    const params = new URLSearchParams('foo=bar'); params.set('foo','baz'); const q = params.toString()
 7 Domain conversions
    const ascii = domainToASCII('中文.com')
 8 File URL handling
    const filePath = fileURLToPath(new URL(import.meta.url))
    const fileUrl = pathToFileURL('/tmp/test.txt')
 9 URL formatting
    const custom = format(u1,{auth:false,fragment:false,unicode:true})
 10 HTTP request options
    const opts = urlToHttpOptions(new URL('https://user:pass@host/path?q#f'))


## Reference Details
Class URL
 Signature new URL(input: string, base?: string) => URL
 Throws TypeError on invalid input/base
 Properties get/set:
  hash: string
  host: string
  hostname: string
  href: string
  origin: string (read-only)
  password: string
  pathname: string
  port: string
  protocol: string
  search: string
  searchParams: URLSearchParams
  username: string
 Methods:
  toString(): string
  toJSON(): string
 Static Methods:
  createObjectURL(blob: Blob): string
  revokeObjectURL(id: string): void
  canParse(input: string, base?: string): boolean
  parse(input: string, base?: string): URL | null

Class URLPattern
 new URLPattern(pattern: string|object, baseURL?: string, options?: {ignoreCase: boolean})
 exec(input: string|object, baseURL?: string): PatternResult|null
 test(input: string|object, baseURL?: string): boolean
 PatternResult keys: inputs: string[], protocol:{input:string,groups:{[key:string]:string}}, username, password, hostname, port, pathname, search, hash

Class URLSearchParams
 Constructors:
  new URLSearchParams(): URLSearchParams
  new URLSearchParams(init: string|object|Iterable<[string,string]>): URLSearchParams
 Methods:
  append(name: string, value: string): void
  delete(name: string, value?: string): void
  entries(): Iterator<[string,string]>
  forEach(fn: (value:string,name:string,self:URLSearchParams)=>void, thisArg?: any): void
  get(name: string): string|null
  getAll(name: string): string[]
  has(name: string, value?: string): boolean
  keys(): Iterator<string>
  set(name: string, value: string): void
  sort(): void
  toString(): string
  values(): Iterator<string>
  [Symbol.iterator](): Iterator<[string,string]>
 Properties:
  size: number

Functions:
 domainToASCII(domain: string): string
 domainToUnicode(domain: string): string
 fileURLToPath(url: URL|string, options?: {windows?: boolean}): string
 pathToFileURL(path: string, options?: {windows?: boolean}): URL
 format(URL: URL, options?: {auth?: boolean,fragment?: boolean,search?: boolean,unicode?: boolean}): string
 urlToHttpOptions(url: URL): {protocol:string,hostname:string,port:number,path:string,href:string,auth?:string,hash:string,search:string,pathname:string}

Code Examples:
 const { URL } = require('node:url')
 const u = new URL('https://user:pass@host:8080/path?x=y#f')
 console.log(u.origin) // https://host:8080
 u.port = '80'
 console.log(u.href) // https://host/

 const params = new URLSearchParams('a=1')
 params.append('b','2')
 console.log(params.toString()) // a=1&b=2

 const pattern = new URLPattern('https://example.com/:id')
 console.log(pattern.exec('https://example.com/123').pathname.groups.id) // 123

 const path = fileURLToPath(import.meta.url)
 console.log(path)

 Troubleshooting:
 Validate URL parsing:
   try { new URL('bad') } catch(e) { console.error(e.code) }
 Authorizing HTTP requests:
   const opts = urlToHttpOptions(new URL('https://u:p@h'))
   if (opts.auth) headers.Authorization = 'Basic '+Buffer.from(opts.auth).toString('base64')


## Information Dense Extract
URL(input:string,base?:string)=>URL|TypeError hash,host,hostname,href,origin,password,pathname,port,protocol,search,searchParams,username get/set toString():string toJSON():string static createObjectURL(blob):string revokeObjectURL(id):void canParse(input,base?):boolean parse(input,base?):URL|null URLPattern(pattern,base?,{ignoreCase?:boolean}) exec(input,base?):PatternResult|null test(input,base?):boolean URLSearchParams(string|object|Iterable) append(name,value) delete(name[,value]) entries() forEach(fn) get(name) getAll(name) has(name[,value]) keys() set(name,value) sort() toString() values() [Symbol.iterator]() size domainToASCII(domain):string domainToUnicode(domain):string fileURLToPath(url, {windows?:boolean}):string pathToFileURL(path,{windows?:boolean}):URL format(URL,{auth?:boolean,fragment?:boolean,search?:boolean,unicode?:boolean}):string urlToHttpOptions(URL):{protocol,hostname,port,path,href,auth,hash,search,pathname}

## Sanitised Extract
Table of Contents
 1 URL class usage
 2 URL properties assignments
 3 URL serialization
 4 Static URL methods
 5 URLPattern matching
 6 URLSearchParams manipulation
 7 Domain encoding functions
 8 File URL conversions
 9 URL formatting options
 10 HTTP options conversion

1 URL class usage
 Constructor new URL(input[, base])
  input string absolute or relative URL
  base string used if input relative
 Throws TypeError on invalid URL

2 URL properties assignments
  url.hash = '#frag' yields percent-encoded fragment
  url.host = 'host:port' invalid ignored
  url.hostname = 'host' invalid ignored
  url.port accepts numbers or numeric prefixes; default port => ''
  url.protocol = 'scheme:' invalid ignored
  url.search = '?q=v'; url.searchParams reflects changes
  url.username, url.password percent-encoded on set

3 URL serialization
  url.href or url.toString() or url.toJSON() return full URL
  Setting href recreates URL object

4 Static URL methods
  createObjectURL(blob): returns blob URL string
  revokeObjectURL(id): unregisters blob URL
  canParse(input[, base]): returns boolean
  parse(input[, base]): returns URL or null

5 URLPattern matching
  new URLPattern(pattern[, baseURL][, {ignoreCase}])
  exec(input[, baseURL]): returns match object with components and groups
  test(input[, baseURL]): returns boolean

6 URLSearchParams manipulation
  append(name,value)
  delete(name[,value])
  get(name): first value or null
  getAll(name): all values
  has(name[,value])
  set(name,value)
  sort() stable by name
  toString(): serialized 'a=b&c=d'
  iterate with entries(), keys(), values(), forEach
  size property count of entries

7 Domain encoding functions
  domainToASCII(domain): punycode ASCII or '' if invalid
  domainToUnicode(domain): unicode or '' if invalid

8 File URL conversions
  fileURLToPath(url[, {windows}]) => platform path string
  pathToFileURL(path[, {windows}]) => file URL object

9 URL formatting options
  url.format(URL, {auth:boolean, fragment:boolean, search:boolean, unicode:boolean}) => string

10 HTTP options conversion
  urlToHttpOptions(URL): {protocol, hostname, port, path, auth, href, hash, search, pathname}

## Original Source
Node.js URL Module
https://nodejs.org/api/url.html

## Digest of URL_MODULE

# URL Module Detailed Digest

Date Retrieved: 2024-06-10
Source: Node.js v23.11.0 node:url API documentation

# URL Class

new URL(input[, base])
  input <string> The absolute or relative URL. Coerced to string.
  base <string> Required if input is relative. Coerced to string.

Properties (get/set):
  hash <string> Fragment including leading '#'. Percent-encodes invalid characters on set.
  host <string> Hostname and port. Invalid assignments are ignored.
  hostname <string> Hostname only. Invalid assignments are ignored.
  href <string> Serialized URL. Setting throws TypeError on invalid.
  origin <string> Read-only origin (scheme + host).
  password <string> Password. Percent-encoded on set.
  pathname <string> Path portion. Percent-encoded on set.
  port <string> Port number (0–65535). Default port yields empty string. Non-numeric prefixes allowed.
  protocol <string> Scheme including trailing ':'. Invalid assignments are ignored.
  search <string> Serialized query including leading '?'. Percent-encoded on set.
  searchParams <URLSearchParams> Read-only URLSearchParams object for query. Mutations affect URL.
  username <string> Username. Percent-encoded on set.

Methods:
  toString(): string  Returns href.
  toJSON(): string    Returns href. Called by JSON.stringify.

Static Methods:
  URL.createObjectURL(blob): string
  URL.revokeObjectURL(id): void
  URL.canParse(input[, base]): boolean
  URL.parse(input[, base]): URL | null

# URLPattern Class

new URLPattern(pattern[, baseURL][, options])
  pattern <string> | <Object>
  baseURL <string> | undefined
  options.ignoreCase <boolean>

Methods:
  exec(input[, baseURL]): PatternResult | null
  test(input[, baseURL]): boolean

# URLSearchParams Class

Constructors:
  new URLSearchParams()
  new URLSearchParams(string)
  new URLSearchParams(obj)
  new URLSearchParams(iterable)

Methods:
  append(name, value): void
  delete(name[, value]): void
  entries(): Iterator<[string,string]>
  forEach(fn[, thisArg]): void
  get(name): string|null
  getAll(name): string[]
  has(name[, value]): boolean
  keys(): Iterator<string>
  set(name, value): void
  sort(): void
  toString(): string
  values(): Iterator<string>
  [Symbol.iterator](): Iterator<[string,string]>
  size <number> (property)

# Utility Functions

url.domainToASCII(domain): string
url.domainToUnicode(domain): string
url.fileURLToPath(url[, options]): string
url.format(URL[, options]): string
url.pathToFileURL(path[, options]): URL
url.urlToHttpOptions(url): Object

# Legacy API (Deprecated)

url.parse(urlString[, parseQueryString[, slashesDenoteHost]]): UrlObject
url.format(urlObject): string
url.resolve(from, to): string

Attribute entries, values, and behaviors match WHATWG spec. High-value actionable content extracted.


## Attribution
- Source: Node.js URL Module
- URL: https://nodejs.org/api/url.html
- License: License: Open source (Node.js Foundation)
- Crawl Date: 2025-05-02T02:20:17.296Z
- Data Size: 3889420 bytes
- Links Found: 3237

## Retrieved
2025-05-02
library/OWL2_OVERVIEW.md
# library/OWL2_OVERVIEW.md
# OWL2_OVERVIEW

## Crawl Summary
Syntaxes  : RDF/XML (mandatory), OWL/XML, Functional, Manchester, Turtle (optional). Semantics : Direct (SROIQ-based, OWL 2 DL), RDF-Based (OWL 2 Full). Profiles : EL (polytime), QL (AC0 via SQL), RL (polytime rule-based). Relationship to OWL 1: full backward compatibility, new expressivity: qualified cardinality, asymmetric/reflexive/disjoint properties, richer datatypes, enhanced annotations.

## Normalised Extract
Table of Contents
1 Syntaxes
2 Semantics
3 Profiles
4 Relationship to OWL 1

1 Syntaxes
- RDF/XML: MappingToRDFGraphs+RDF/XML; mandatory; all tools must support it for interchange
- OWL/XML: XMLSerialization; optional; use with XML tools (schema, XQuery)
- Functional Syntax: StructuralSpecification; optional; functional-style serialization matching UML-based structural spec
- Manchester Syntax: ManchesterSyntax; optional; human-readable DL syntax for editors
- Turtle: MappingToRDFGraphs+Turtle; optional; human-friendly RDF triples

2 Semantics
- Direct Semantics: assigns model-theoretic semantics compatible with SROIQ DL; applies only to OWL 2 DL ontologies that satisfy syntactic restrictions (e.g., no transitive properties in cardinality restrictions)
- RDF-Based Semantics: extends RDF Semantics to OWL 2; applies to any OWL 2 ontology serialized as RDF; guarantees soundness, completeness within OWL 2 RL ground atomic queries (PR1)
- Correspondence Theorem (OWL 2 RDF-Based Semantics §7.2): for any OWL 2 DL ontology, inferences under Direct Semantics remain valid under RDF-Based Semantics after mapping

3 Profiles
- OWL 2 EL: subset allowing only conjunctions, existential restrictions on simple roles; reasoning in polynomial time; target: very large ontologies requiring performance guarantees
- OWL 2 QL: subset allowing conjunctive queries answering in AC0 via standard SQL databases; target: large ABox, lightweight TBox, direct relational data access
- OWL 2 RL: rule-based subset supporting polynomial-time reasoning via forward-chaining rules on RDF triples; sound for all OWL 2 ontologies, complete for RL-consistent ones under ground atomic queries (PR1)

4 Relationship to OWL 1
- Full backward compatibility: OWL 1 ontologies valid under OWL 2 with identical inferences
- New features: disjoint union of classes, rich datatypes/dataRanges, qualified cardinalities, asymmetric/reflexive/disjoint properties, annotation enhancements
- Added three profiles, new Manchester Syntax, relaxed some DL restrictions

## Supplementary Details
1. Direct Semantics Syntactic Conditions (OWL 2 DL):
   - TransitiveProperty cannot appear in ObjectExactCardinality, ObjectMaxCardinality, ObjectMinCardinality restrictions
   - Disjoint Union declarations allowed only on named classes
   - Datatype definitions must reference XSD 1.1 built-in or user-defined datatypes as per OWL 2 Structural Spec §4
2. OWL/XML Root Element: <Ontology xmlns="http://www.w3.org/2002/07/owl#" xml:base="baseIRI">
   - child elements: Declaration, Annotation, Axiom elements
3. Manchester Syntax Prefix Declarations:
   Prefix: owl: = <http://www.w3.org/2002/07/owl#>
   Prefix: rdf: = <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
   Prefix: xsd: = <http://www.w3.org/2001/XMLSchema#>
   ClassAssertion(:John :Person)
   ObjectPropertyAssertion(:hasParent :John :Mary)
4. RDF/XML Serialization Element for Class declaration:
   <owl:Class rdf:about="http://example.org/Person"/>

## Reference Details
No SDK or code-level APIs defined in Overview. Use the following normative documents for API details and method signatures:
- OWL 2 Structural Specification and Functional-Style Syntax: full grammar, functional-style declarations, element types, UML diagrams
- OWL 2 Mapping to RDF Graphs: exact mapping rules from functional syntax to RDF triples
- OWL 2 RDF-Based Semantics: RDFSemantics extension conditions, semantic conditions, interpretations, entailment regimes
- OWL 2 Direct Semantics: SROIQ interpretation rules, datatype semantics, entailment conditions
- OWL 2 Conformance: conformance test suite definitions, required tool behaviors


## Information Dense Extract
Syntaxes:RDF/XML(mandatory),OWL/XML,Functional,Manchester,Turtle. Semantics:Direct(SROIQ DL, OWL 2 DL only; no transitive in cardinals),RDF-Based(OWL 2 Full; sound, RL complete under PR1). Profiles:EL(polytime),QL(AC0 via SQL),RL(polytime rule-based, sound for all, RL-consistent complete). Backward compatible OWL 1. New features:qualCard,richDatatypes,asymm/reflexive/disjointProps,annotations,profiles,ManchesterSyntax.

## Sanitised Extract
Table of Contents
1 Syntaxes
2 Semantics
3 Profiles
4 Relationship to OWL 1

1 Syntaxes
- RDF/XML: MappingToRDFGraphs+RDF/XML; mandatory; all tools must support it for interchange
- OWL/XML: XMLSerialization; optional; use with XML tools (schema, XQuery)
- Functional Syntax: StructuralSpecification; optional; functional-style serialization matching UML-based structural spec
- Manchester Syntax: ManchesterSyntax; optional; human-readable DL syntax for editors
- Turtle: MappingToRDFGraphs+Turtle; optional; human-friendly RDF triples

2 Semantics
- Direct Semantics: assigns model-theoretic semantics compatible with SROIQ DL; applies only to OWL 2 DL ontologies that satisfy syntactic restrictions (e.g., no transitive properties in cardinality restrictions)
- RDF-Based Semantics: extends RDF Semantics to OWL 2; applies to any OWL 2 ontology serialized as RDF; guarantees soundness, completeness within OWL 2 RL ground atomic queries (PR1)
- Correspondence Theorem (OWL 2 RDF-Based Semantics 7.2): for any OWL 2 DL ontology, inferences under Direct Semantics remain valid under RDF-Based Semantics after mapping

3 Profiles
- OWL 2 EL: subset allowing only conjunctions, existential restrictions on simple roles; reasoning in polynomial time; target: very large ontologies requiring performance guarantees
- OWL 2 QL: subset allowing conjunctive queries answering in AC0 via standard SQL databases; target: large ABox, lightweight TBox, direct relational data access
- OWL 2 RL: rule-based subset supporting polynomial-time reasoning via forward-chaining rules on RDF triples; sound for all OWL 2 ontologies, complete for RL-consistent ones under ground atomic queries (PR1)

4 Relationship to OWL 1
- Full backward compatibility: OWL 1 ontologies valid under OWL 2 with identical inferences
- New features: disjoint union of classes, rich datatypes/dataRanges, qualified cardinalities, asymmetric/reflexive/disjoint properties, annotation enhancements
- Added three profiles, new Manchester Syntax, relaxed some DL restrictions

## Original Source
OWL 2 Web Ontology Language Overview
https://www.w3.org/TR/owl2-overview/

## Digest of OWL2_OVERVIEW

# Syntaxes

Name            | Specification Document          | Status              | Purpose
--------------  | ------------------------------- | ------------------- | -------------------------------------------------
RDF/XML         | Mapping to RDF Graphs, RDF/XML  | Mandatory           | Interchange syntax; must be supported by all OWL 2 tools
OWL/XML         | XML Serialization               | Optional            | XML-based syntax; integrates with XML tools
Functional Syntax| Structural Specification        | Optional            | Compact functional-style syntax matching structural spec
Manchester Syntax| Manchester Syntax              | Optional            | Human-readable DL syntax for editors and UIs
Turtle          | Mapping to RDF Graphs, Turtle   | Optional (Not WG)   | Alternative RDF serialization; human-friendly triples

# Semantics

Direct Semantics (OWL 2 DL):
- Based on SROIQ description logic model-theoretic semantics
- Requires DL restrictions: no use of transitive properties in number restrictions; global syntactic conditions (see Structural Spec §3)
- Interprets OWL 2 DL ontologies via Direct Semantics document

RDF-Based Semantics (OWL 2 Full):
- Extends RDF Semantics to OWL 2
- Applies to any OWL 2 ontology mapped to RDF graphs
- Guarantees soundness; completeness only within OWL 2 RL under PR1

Correspondence: Inferences under Direct Semantics remain valid under RDF-Based Semantics after mapping (see RDF-Based Semantics §7.2)

# Profiles

Profile | Syntactic Scope                | Complexity    | Use Case
------- | ------------------------------ | ------------  | ---------------------------------------------------------
OWL 2 EL | Syntactic subset enabling EL   | PTime reasoning | Very large ontologies; polynomial-time guarantees
OWL 2 QL | Syntactic subset enabling QL   | AC0 query evaluation via SQL | Lightweight TBox with large ABox; direct DB querying
OWL 2 RL | Rule-based subset of OWL 2     | PTime rule evaluation | RDF triple rule engines; sound but potentially incomplete

# Relationship to OWL 1

- All OWL 1 ontologies remain valid OWL 2 ontologies with unchanged inferences
- Primary syntaxes, semantics correspondence theorem, and interoperability remain intact
- New features include qualified cardinality, richer datatypes, asymmetric/reflexive/disjoint properties, enhanced annotations, three new profiles, Manchester Syntax, and relaxed DL restrictions

# Change Log Highlights

5 April 2012: XSD 1.1 datatypes required; removed optional dependency note on XSD 1.1 Candidate Rec.
No substantive changes since 27 Oct 2009 Recommendation


## Attribution
- Source: OWL 2 Web Ontology Language Overview
- URL: https://www.w3.org/TR/owl2-overview/
- License: W3C Document License
- Crawl Date: 2025-05-02T13:48:39.973Z
- Data Size: 13312054 bytes
- Links Found: 31919

## Retrieved
2025-05-02
library/YARGS.md
# library/YARGS.md
# YARGS

## Crawl Summary
Installation: npm install --save yargs. Import via ESM or CommonJS. Entry: yargs(args) returns Argv. Argv methods: scriptName, usage, command, positional, option, demandCommand, help, version, parse, argv. Helpers: hideBin removes node executable and script path. Builders: define commands, positional args, options with type, alias, default, describe, demand, requiresArg, choices. Handlers invoked with parsed argv. Example CLI provided.


## Normalised Extract
Table of Contents
1. Initialization and Imports
2. Argv Interface and Method Signatures
3. Positional Arguments Configuration
4. Options Configuration
5. Command Registration
6. Help and Version Configuration
7. Parsing and Accessing Arguments
8. Helper Functions

1. Initialization and Imports
Function: yargs(args?: string[]): Argv
Default args: hideBin(process.argv)

2. Argv Interface and Method Signatures
scriptName(name: string): Argv
usage(usage: string): Argv
command(cmd: string, desc: string, builder?: (yargs: Argv) => Argv, handler?: (argv: Arguments) => void): Argv
option(key: string, options: OptionDefinition | OptionDefinition[]): Argv
positional(key: string, opts: PositionalOptions): Argv
demandCommand(min?: number, max?: number, minMsg?: string, maxMsg?: string): Argv
help(opt?: string, desc?: string): Argv
version(opt?: string, desc?: string, ver?: string): Argv
parse(args?: string[]): Arguments
argv: Arguments

3. Positional Arguments Configuration
PositionalOptions:
 type: string|number|boolean
 default: any
 describe: string

4. Options Configuration
OptionDefinition fields:
 alias: string|string[]
 type: string|number|boolean|count
 default: any
 describe: string
 demandOption: boolean
 requiresArg: boolean
 choices: any[]

5. Command Registration
Provide cmd string with placeholders (<>, []), description, builder callback to set options/positionals, and handler callback receiving parsed argv.

6. Help and Version Configuration
help(option: string='--help', description: string='Show help'): Argv
version(option: string='--version', description: string='Show version', version: string=package.version): Argv

7. Parsing and Accessing Arguments
parse(args?: string[]): Arguments
Access via .argv property

8. Helper Functions
hideBin(argv: string[]): returns argv.slice(2)


## Supplementary Details
Parameter Defaults and Types
 yargs: args:string[] default hideBin(process.argv)
 scriptName: name:string
 usage: usage:string
 command: cmd:string, desc:string, builder: function returning Argv, handler: function(argv)
 positional: key:string, opts: {type, default, describe}
 option: key:string, opts: multiple fields
 demandCommand: min:number default 1, max:number undefined, messages:string
 help/version: default switches and descriptions
 parse: args:string[] default hideBin(process.argv)

Implementation Steps
1. Import yargs and hideBin
2. Call yargs(hideBin(process.argv)) to get Argv
3. Chain scriptName, usage, command, option, positional
4. Chain help, version as needed
5. Call parse() or access .argv

Configuration Options
 Options set via .option and .positional include type, default, describe, alias, demandOption, choices, requiresArg
 Default parsing behavior resolves abbreviations and coercions



## Reference Details
API Specifications

yargs(args?: string[]): Argv

Argv
 Methods:
  scriptName(name:string): Argv
  usage(usage:string): Argv
  command(cmd:string, desc:string, builder?: (yargs:Argv)=>Argv, handler?: (argv:Arguments)=>void): Argv
  option(key:string, def:OptionDefinition|OptionDefinition[]): Argv
  positional(key:string, opts:PositionalOptions): Argv
  demandCommand(min?:number,max?:number,minMsg?:string,maxMsg?:string): Argv
  help(opt?:string,desc?:string): Argv
  version(opt?:string,desc?:string,ver?:string): Argv
  parse(args?:string[]): Arguments
  argv: Arguments

Types
interface Arguments { [key:string]: any }
interface PositionalOptions { type: 'string'|'number'|'boolean'; default?: any; describe: string }
interface OptionDefinition { alias?: string|string[]; type?: 'string'|'number'|'boolean'|'count'; default?: any; describe?: string; demandOption?: boolean; requiresArg?: boolean; choices?: any[] }

hideBin(argv:string[]): string[]

Code Example
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
 .scriptName('app')
 .usage('$0 <cmd> [opts]')
 .command('deploy <env>', 'Deploy to environment', yargs=>
   yargs.positional('env',{ describe:'environment', type:'string' })
     .option('force',{ alias:'f', type:'boolean', describe:'force deploy', default:false })
 , argv=>{
   if(argv.force) console.log('Force deploying to',argv.env)
   else console.log('Deploying to',argv.env)
 })
 .demandCommand(1,'Command required')
 .help()
 .version('v', 'Show version', '1.0.0')
 .parse()

Best Practices
• Always use hideBin(process.argv) to ignore node exec path
• Define .demandCommand to enforce at least one command
• Use .strict() to error on unknown options

Troubleshooting
Command: node app.js unknown
Expected: Error 输出 'Unknown argument: unknown'
If missing .strict(), unknown args are ignored


## Information Dense Extract
yargs(args?:string[]):Argv default hideBin(process.argv); Argv.scriptName(name:string), usage(usage:string), command(cmd:string,desc:string,builder?:fn,handler?:fn), option(key:string,def:OptionDefinition|[]), positional(key:string,PosOpts), demandCommand(min=1,max?,minMsg?,maxMsg?):Argv, help(opt='--help',desc?):Argv, version(opt='--version',desc?,ver?):Argv, parse(args?:string[]):Arguments, argv:Arguments. PosOpts: type:string|number|boolean, default?, describe:string. OptionDefinition: alias?:string|[],type?:string|number|boolean|count,default?,describe?,demandOption?,requiresArg?,choices?:[]. hideBin(argv):argv.slice(2). Example: yargs(hideBin(process.argv)).scriptName('app').usage('$0 <cmd> [opts]').command('deploy <env>','desc',y=>y.positional('env',{type:'string',describe:'env'}).option('force',{alias:'f',type:'boolean',default:false,describe:'force'}),(argv)=>...).demandCommand(1).strict().help().version('v','Show version','1.0.0').parse().

## Sanitised Extract
Table of Contents
1. Initialization and Imports
2. Argv Interface and Method Signatures
3. Positional Arguments Configuration
4. Options Configuration
5. Command Registration
6. Help and Version Configuration
7. Parsing and Accessing Arguments
8. Helper Functions

1. Initialization and Imports
Function: yargs(args?: string[]): Argv
Default args: hideBin(process.argv)

2. Argv Interface and Method Signatures
scriptName(name: string): Argv
usage(usage: string): Argv
command(cmd: string, desc: string, builder?: (yargs: Argv) => Argv, handler?: (argv: Arguments) => void): Argv
option(key: string, options: OptionDefinition | OptionDefinition[]): Argv
positional(key: string, opts: PositionalOptions): Argv
demandCommand(min?: number, max?: number, minMsg?: string, maxMsg?: string): Argv
help(opt?: string, desc?: string): Argv
version(opt?: string, desc?: string, ver?: string): Argv
parse(args?: string[]): Arguments
argv: Arguments

3. Positional Arguments Configuration
PositionalOptions:
 type: string|number|boolean
 default: any
 describe: string

4. Options Configuration
OptionDefinition fields:
 alias: string|string[]
 type: string|number|boolean|count
 default: any
 describe: string
 demandOption: boolean
 requiresArg: boolean
 choices: any[]

5. Command Registration
Provide cmd string with placeholders (<>, []), description, builder callback to set options/positionals, and handler callback receiving parsed argv.

6. Help and Version Configuration
help(option: string='--help', description: string='Show help'): Argv
version(option: string='--version', description: string='Show version', version: string=package.version): Argv

7. Parsing and Accessing Arguments
parse(args?: string[]): Arguments
Access via .argv property

8. Helper Functions
hideBin(argv: string[]): returns argv.slice(2)

## Original Source
Yargs (CLI Argument Parser)
https://yargs.js.org/docs/

## Digest of YARGS

# Yargs CLI Argument Parser API Reference

## Installation

npm install --save yargs

## Import

### ESM
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

### CommonJS
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

## Entry Point

yargs(args?: string[]): Argv

Parameters:
  args: string[] (default: hideBin(process.argv))

Returns: 
  Argv instance

## Argv Interface

### Methods

#### scriptName(name: string): Argv
  Sets the displayed script name

#### usage(usage: string): Argv
  Defines the usage string

#### command(command: string, description: string, builder?: (yargs: Argv) => Argv, handler?: (argv: Arguments) => void): Argv
  Registers a command

#### positional(key: string, options: PositionalOptions): Argv
  Defines a positional argument

PositionalOptions:
  type: 'string' | 'number' | 'boolean'
  default: string|number|boolean
  describe: string

#### option(key: string, options: OptionDefinition | OptionDefinition[]): Argv
  Defines an option

OptionDefinition:
  alias?: string|string[]
  type?: 'string'|'number'|'boolean'|'count'
  default?: any
  describe?: string
  demandOption?: boolean
  requiresArg?: boolean
  choices?: any[]

#### demandCommand(min?: number, max?: number, minMsg?: string, maxMsg?: string): Argv
  Requires commands

#### help(option?: string, description?: string): Argv
  Defines help option

#### version(option?: string, description?: string, version?: string): Argv
  Defines version option

#### parse(args?: string[], context?: {}): Arguments
  Parses arguments

#### argv: Arguments
  Getter for parsed arguments

Arguments: {[key: string]: any}

## helpers.hideBin(argv: string[]): string[]
Removes node and script path from argv

## Examples

### Basic CLI
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', yargs =>
    yargs.positional('name', { type: 'string', default: 'Cambi', describe: 'name to say hello to' })
  , argv => {
    console.log('hello', argv.name)
  })
  .help()
  .parse()


## Attribution
- Source: Yargs (CLI Argument Parser)
- URL: https://yargs.js.org/docs/
- License: MIT License
- Crawl Date: 2025-05-02T08:48:26.390Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-02

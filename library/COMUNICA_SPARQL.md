# COMUNICA_SPARQL

## Crawl Summary
Initialized QueryEngine via new QueryEngine(config?). Core methods: queryBindings(query,context)→BindingsStream; queryBoolean(query,context)→Promise<boolean>; queryQuads(query,context)→QuadStream; queryVoid(query,context)→Promise<void>; invalidateHttpCache(sources?)→Promise<void>. Context keys: sources: string[]|ILinkRecord[]; fetch; httpRetryCount=3; httpTimeout=30000; httpIncludeCredentials=false; headers; logger. BindingsStream: Node.js readable stream of Map<string,Term>. QuadStream: stream of RDF.Quad. metadata():Promise<Record>. Errors: QueryEngineError. HTTP cache: maxSize=1000,maxAge=300000ms. Use web-streams-polyfill in browsers.

## Normalised Extract
Table of Contents
1  Importing the Engine
2  Engine Configuration
3  Query Methods
4  Context Keys
5  Stream Consumption
6  Error Handling
7  HTTP Cache Management

1  Importing the Engine
   • ESM: import { QueryEngine } from "@comunica/query-sparql";
   • CommonJS: const { QueryEngine } = require("@comunica/query-sparql");
   • Initialize: const engine = new QueryEngine({ baseIRI, pluginModules, initialContext });

2  Engine Configuration
   • baseIRI: string base IRI for relative IRIs
   • pluginModules: custom mediator modules array
   • initialContext: IActionContext initial context keys

3  Query Methods
3.1  queryBindings(query:string|Query, context?:IActionContext) → Promise<BindingsStream>
   • Use for SELECT queries.
   • Returns Node.js Readable stream of Bindings: on('data', binding:Map<string,Term>).

3.2  queryBoolean(query:string|Query, context?:IActionContext) → Promise<boolean>
   • Use for ASK queries.

3.3  queryQuads(query:string|Query, context?:IActionContext) → Promise<QuadStream>
   • Use for CONSTRUCT/DESCRIBE; QuadStream: stream of RDF.Quad.

3.4  queryVoid(query:string|Query, context?:IActionContext) → Promise<void>
   • Use for SPARQL UPDATE operations (INSERT/DELETE).

3.5  invalidateHttpCache(sources?:string[]) → Promise<void>
   • Clears HTTP cache for listed endpoints or all if omitted.

4  Context Keys
   • sources: Array<string|{type: 'file'|'sparql'|'hypermedia'|'rdfjsSource',value:string|Readable}>
   • fetch: (input,init?)→Promise<Response>
   • httpRetryCount: number default 3
   • httpTimeout: number default 30000
   • httpIncludeCredentials: boolean default false
   • headers: Record<string,string>
   • logger: Console-like object

5  Stream Consumption
   • BindingsStream: on('data', binding); on('end'); on('error')
   • QuadStream: on('data', quad); on('end'); on('error')

6  Error Handling
   • result.metadata() → Promise<Record<string,any>>
   • Errors thrown: QueryEngineError { message, details:{cause, query} }

7  HTTP Cache Management
   • Default cacheConfig: { maxSize: 1000, maxAge: 300000 }
   • invalidateHttpCache clears entries older than maxAge or resets all


## Supplementary Details
Engine Constructor Options
• baseIRI: default '', used as base for relative IRIs
• pluginModules: [], to override internal mediators
• initialContext: merges into action context on each query

Context Parameters
• sources: required. Each entry may be:
    - String URL
    - Object { type: 'file', value: '/path/to/file.ttl' }
    - Object { type: 'sparql', value: 'https://dbpedia.org/sparql' }
    - Object { type: 'hypermedia', value: 'https://fragments.example.org' }
    - Object { type: 'rdfjsSource', value: rdfSourceInstance }
• fetch: cross-fetch or custom function. default uses node-fetch
• httpRetryCount: 3 retries on network errors
• httpTimeout: 30000ms after which request aborts
• httpIncludeCredentials: false by default; set true to send cookies
• headers: custom HTTP headers for all requests
• logger: must implement debug(info), error(err)

HTTP Cache Config
• maxSize: 1000 URIs stored
• maxAge: 300000ms TTL per entry

Fetch Integration
• Use web-streams-polyfill for browser:
    import { ponyfill } from 'web-streams-polyfill';
    const engine = new QueryEngine(ponyfill);

## Reference Details
Import Statements
ESM: import { QueryEngine } from "@comunica/query-sparql";
CJS: const { QueryEngine } = require("@comunica/query-sparql");

QueryEngine(config?: IQueryEngineConfig)

Interface IQueryEngineConfig
  baseIRI?: string
  pluginModules?: any[]
  initialContext?: IActionContext

Interface IActionContext
  sources: Array<string|ILinkRecord>
  fetch?: (input: string|Request, init?: RequestInit) => Promise<Response>
  httpRetryCount?: number
  httpTimeout?: number
  httpIncludeCredentials?: boolean
  headers?: Record<string,string>
  logger?: { debug(msg:string):void; error(msg:string):void }

Method Signatures
queryBindings(query: string|Query, context?: IActionContext): Promise<BindingsStream>
queryBoolean(query: string|Query, context?: IActionContext): Promise<boolean>
queryQuads(query: string|Query, context?: IActionContext): Promise<QuadStream>
queryVoid(query: string|Query, context?: IActionContext): Promise<void>
invalidateHttpCache(sources?: string[]): Promise<void>

BindingsStream extends Readable
  'data': (binding: Map<string, RDF.Term>) => void
  'end': () => void
  'error': (err: Error) => void

QuadStream extends Readable
  'data': (quad: RDF.Quad) => void
  'end': () => void
  'error': (err: Error) => void

Error Types
QueryEngineError
  message: string
  details: { cause: Error; query: string }

Code Example
import { QueryEngine } from "@comunica/query-sparql";
import { ponyfill } from 'web-streams-polyfill';

const engine = new QueryEngine(ponyfill);

async function run() {
  const result = await engine.queryBindings(
    "SELECT ?s ?p ?o WHERE { ?s ?p ?o }",
    { sources: [
        'https://fragments.dbpedia.org/2016-04/en',
        { type: 'file', value: './local.ttl' }
      ],
      httpTimeout: 60000,
      headers: { 'User-Agent': 'MyAgent/1.0' }
    }
  );
  result.on('data', binding => {
    console.log(binding.get('s').value, binding.get('p').value, binding.get('o').value);
  });
  result.on('end', () => console.log('Query complete'));
}

best practices
• Pre-declare frequent endpoints in sources array
• Use small page sizes on hypermedia sources: context.hypermediaLinksPageSize=25
• Clear cache before testing: await engine.invalidateHttpCache()

Troubleshooting
1  Timeouts on SPARQL endpoint:
   increase httpTimeout or reduce timeout scope
2  Empty results on CONSTRUCT:
   verify query syntax; check default graph specification
3  Fetch errors:
   enable debug logging: context.logger={debug:console.log,error:console.error}
4  HTTP cache stale entries:
   await engine.invalidateHttpCache(['https://dbpedia.org/sparql'])

## Information Dense Extract
QueryEngine({baseIRI?,pluginModules?,initialContext?}) Methods: queryBindings(q: string|Query,ctx?:IActionContext)→Promise<BindingsStream> queryBoolean(q,ctx?)→Promise<boolean> queryQuads(q,ctx?)→Promise<QuadStream> queryVoid(q,ctx?)→Promise<void> invalidateHttpCache(sources?:string[])→Promise<void> Context keys: sources: Array<string|{type:'file'|'sparql'|'hypermedia'|'rdfjsSource',value:string|Readable}>; fetch(input,init?)→Promise<Response>; httpRetryCount=3; httpTimeout=30000; httpIncludeCredentials=false; headers:Record<string,string>; logger:{debug(),error()} BindingsStream: Node Readable stream of Map<string,RDF.Term> QuadStream: Readable stream of RDF.Quad metadata()→Promise<Record> Errors: QueryEngineError{message,details:{cause,query}} HTTP cache: maxSize=1000,maxAge=300000ms. Use web-streams-polyfill in browsers.

## Sanitised Extract
Table of Contents
1  Importing the Engine
2  Engine Configuration
3  Query Methods
4  Context Keys
5  Stream Consumption
6  Error Handling
7  HTTP Cache Management

1  Importing the Engine
    ESM: import { QueryEngine } from '@comunica/query-sparql';
    CommonJS: const { QueryEngine } = require('@comunica/query-sparql');
    Initialize: const engine = new QueryEngine({ baseIRI, pluginModules, initialContext });

2  Engine Configuration
    baseIRI: string base IRI for relative IRIs
    pluginModules: custom mediator modules array
    initialContext: IActionContext initial context keys

3  Query Methods
3.1  queryBindings(query:string|Query, context?:IActionContext)  Promise<BindingsStream>
    Use for SELECT queries.
    Returns Node.js Readable stream of Bindings: on('data', binding:Map<string,Term>).

3.2  queryBoolean(query:string|Query, context?:IActionContext)  Promise<boolean>
    Use for ASK queries.

3.3  queryQuads(query:string|Query, context?:IActionContext)  Promise<QuadStream>
    Use for CONSTRUCT/DESCRIBE; QuadStream: stream of RDF.Quad.

3.4  queryVoid(query:string|Query, context?:IActionContext)  Promise<void>
    Use for SPARQL UPDATE operations (INSERT/DELETE).

3.5  invalidateHttpCache(sources?:string[])  Promise<void>
    Clears HTTP cache for listed endpoints or all if omitted.

4  Context Keys
    sources: Array<string|{type: 'file'|'sparql'|'hypermedia'|'rdfjsSource',value:string|Readable}>
    fetch: (input,init?)Promise<Response>
    httpRetryCount: number default 3
    httpTimeout: number default 30000
    httpIncludeCredentials: boolean default false
    headers: Record<string,string>
    logger: Console-like object

5  Stream Consumption
    BindingsStream: on('data', binding); on('end'); on('error')
    QuadStream: on('data', quad); on('end'); on('error')

6  Error Handling
    result.metadata()  Promise<Record<string,any>>
    Errors thrown: QueryEngineError { message, details:{cause, query} }

7  HTTP Cache Management
    Default cacheConfig: { maxSize: 1000, maxAge: 300000 }
    invalidateHttpCache clears entries older than maxAge or resets all

## Original Source
Comunica SPARQL Framework
https://comunica.dev/docs/query/sparql/

## Digest of COMUNICA_SPARQL

# Comunica SPARQL Query Module

## 1. Import and Initialization

### ESM Import
import { QueryEngine } from "@comunica/query-sparql";
const engine = new QueryEngine({
  baseIRI?: string;
  pluginModules?: any[];
  initialContext?: Record<string, any>;
});

### CommonJS Import
const { QueryEngine } = require("@comunica/query-sparql");
const engine = new QueryEngine();

## 2. Core Query Methods

### queryBindings
Signature: queryBindings(query: string | Query, context?: IActionContext): Promise<BindingsStream>
Description: Executes SELECT queries and returns a Node.js readable stream of Bindings.

### queryBoolean
Signature: queryBoolean(query: string | Query, context?: IActionContext): Promise<boolean>
Description: Executes ASK queries and resolves to true or false based on data.

### queryQuads
Signature: queryQuads(query: string | Query, context?: IActionContext): Promise<QuadStream>
Description: Executes CONSTRUCT/DESCRIBE queries and returns a stream of RDF quads.

### queryVoid
Signature: queryVoid(query: string | Query, context?: IActionContext): Promise<void>
Description: Executes UPDATE operations (INSERT/DELETE).

### invalidateHttpCache
Signature: invalidateHttpCache(sources?: string[]): Promise<void>
Description: Clears HTTP cache for specified endpoints or all by default.

## 3. Context Configuration

Actions Context Keys:
- sources: Array<string | ILinkRecord> (mandatory):
    Each entry may be:
      • URL string
      • { type: "file"|"sparql"|"hypermedia"|"rdfjsSource", value: string | Readable }
- fetch: (input: string | Request, init?: RequestInit) => Promise<Response> (optional)
- httpRetryCount: number (default: 3)
- httpTimeout: number in milliseconds (default: 30000)
- httpIncludeCredentials: boolean (default: false)
- headers: Record<string, string> (for fetch)
- logger: Console or custom logger with .debug/.error

## 4. Consuming Streams

BindingsStream: Node.js stream of Map<string, RDF.Term>. Methods:
  .on('data', binding)
  .on('end')
  .on('error')

QuadStream: Node.js stream of RDF.Quad

## 5. Error Handling and Metadata

- result.metadata(): Promise<Record<string, any>>
- Throws QueryEngineError with:
    • message: string
    • details: { cause: Error; query: string }

## 6. HTTP Cache Management

- invalidateHttpCache(): clears internal fetch cache
- cacheConfig:
    • maxSize: number (default: 1000 entries)
    • maxAge: number in ms (default: 5 minutes)

## 7. Best Practices

- Use web-streams-polyfill in browser:
    import { ponyfill } from 'web-streams-polyfill';
    const engine = new QueryEngine(ponyfill);
- Pre-warm HTTP cache via dummy HEAD requests
- Limit sources array to required endpoints to reduce planning overhead

## Attribution
- Source: Comunica SPARQL Framework
- URL: https://comunica.dev/docs/query/sparql/
- License: License if known
- Crawl Date: 2025-04-29T07:49:01.555Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29

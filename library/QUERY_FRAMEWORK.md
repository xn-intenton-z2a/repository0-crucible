# QUERY_FRAMEWORK

## Crawl Summary
QueryEngine API: newEngine(initContext?) returns QueryEngine. QueryEngine methods: query, queryBindings, queryQuads, queryVoid. Context keys and defaults: sources[], fetch=node-fetch, lenient=false, baseIRI="", httpTimeout=300000, batchSize=100. Supports SELECT, ASK, CONSTRUCT, DESCRIBE.

## Normalised Extract
Table of Contents
1  Instantiating the Query Engine
2  Executing SPARQL Queries
3  Streaming and Handling Results
4  Context Configuration
5  RDF/JS Data Model Integration

1  Instantiating the Query Engine
   Method signature
     newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine
   initContext keys
     sources: (string|RdfSource)[] default []
     fetch: typeof fetch default node-fetch

2  Executing SPARQL Queries
   Method signature
     engine.query(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>
   query types
     SELECT, ASK, CONSTRUCT, DESCRIBE, UPDATE

3  Streaming and Handling Results
   SELECT/CONSTRUCT returns IBindingsStream or IQuadStream
     IBindingsStream: NodeJS.ReadableStream emitting Bindings objects
     IQuadStream: Quad stream implementing RDF/JS Stream<Quad>
   ASK returns Promise<boolean> via queryBoolean
   UPDATE uses queryVoid

4  Context Configuration
   context keys and types
     sources: array of endpoint URLs, file paths, or in-memory sources
     baseIRI: string used for relative IRIs
     lenient: boolean to ignore parse errors
     httpTimeout: number in ms
     batchSize: number of triples per fragment

5  RDF/JS Data Model Integration
   Requires compatible DataFactory implementing RDF/JS spec
     import { DataFactory } from 'rdf-data-factory'
     DataFactory.termToString for debugging


## Supplementary Details
Context parameters
  sources: any URI, file path, or InMemoryQuadSource implementing RDF/JS Source
  fetch: any function matching fetch(url, init) returning Promise<Response>
  lenient: toggles error recovery in SPARQL parser
  baseIRI: default '' resolves relative IRIs
  httpTimeout: default 300000ms stops slow HTTP
  batchSize: default 100 triples per page from fragment sources
Implementation steps
  1  Install dependencies: npm install @comunica/actor-init-sparql rdf-data-factory
  2  Import newEngine and DataFactory
  3  Instantiate engine with custom context
  4  Call engine.query or specialized methods
  5  Handle streams and end events


## Reference Details
API Specifications

newEngine
  Signature
    function newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine
  Parameters
    initContext
      sources: (string|RdfSource)[] default []
      fetch: (input: string, init?: RequestInit) => Promise<Response> default node-fetch
      baseIRI: string default ''
      lenient: boolean default false
      httpTimeout: number default 300000
      batchSize: number default 100
  Returns
    QueryEngine instance

QueryEngine.query
  Signature
    query(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>
  Parameters
    query: SPARQL string or parsed Algebra Operation
    context: overrides initial context keys
  Returns
    IQueryResult: { type: 'bindings'|'quads'|'boolean'|'void', bindings? IBindingsStream, quadStream? IQuadStream, boolean? boolean }

QueryEngine.queryBindings
  Signature
    queryBindings(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IBindingsStream>
  Returns
    NodeJS.ReadableStream emitting Bindings

QueryEngine.queryQuads
  Signature
    queryQuads(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQuadStream>
  Returns
    Stream<Quad>

QueryEngine.queryBoolean
  Signature
    queryBoolean(query: string|Algebra.Operation, context?: IActionContextInit): Promise<boolean>

QueryEngine.queryVoid
  Signature
    queryVoid(query: string|Algebra.Operation, context?: IActionContextInit): Promise<void>

Concrete example with full comments

import { newEngine } from '@comunica/actor-init-sparql'
import { DataFactory } from 'rdf-data-factory'

(async () => {
  const engine = newEngine({
    sources: ['https://dbpedia.org/sparql'],
    fetch: fetch,
    baseIRI: 'http://example.org/',
    lenient: true,
    httpTimeout: 60000,
    batchSize: 200,
  })
  const stream = await engine.queryBindings(
    'SELECT ?s WHERE { ?s a <http://xmlns.com/foaf/0.1/Person> }'
  )
  stream.on('data', binding => {
    console.log(binding.get('?s').value)
  })
  stream.on('end', () => console.log('Completed'))
})()

Best Practices
  - Provide explicit sources array for reproducibility
  - Use queryBindings for large SELECT result sets to control backpressure
  - Set httpTimeout to guard against unresponsive SPARQL endpoints
  - Enable lenient mode only when parsing legacy or malformed data

Troubleshooting
  Enable detailed logging: set environment variable DEBUG=comunica* and run node script
  Expected log prefix: comunica:bus comunica:mediator comunica:actor-init-sparql
  If fetch errors occur, wrap engine.query in try/catch and inspect error.type and error.message



## Information Dense Extract
newEngine(initContext?)→QueryEngine; context keys: sources[], fetch, baseIRI, lenient, httpTimeout(300000), batchSize(100); QueryEngine.query(query,context)→IQueryResult[type:bindings|quads|boolean|void]; QueryEngine.queryBindings→BindingsStream; QueryEngine.queryQuads→QuadStream; QueryEngine.queryBoolean→boolean; QueryEngine.queryVoid→void; IBindingsStream: NodeJS.ReadableStream emitting Bindings; IQuadStream: RDF/JS Stream<Quad>; default fetch=node-fetch; supports SELECT ASK CONSTRUCT DESCRIBE UPDATE; best practices: explicit sources, backpressure control, timeout guard; debug with DEBUG=comunica*

## Sanitised Extract
Table of Contents
1  Instantiating the Query Engine
2  Executing SPARQL Queries
3  Streaming and Handling Results
4  Context Configuration
5  RDF/JS Data Model Integration

1  Instantiating the Query Engine
   Method signature
     newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine
   initContext keys
     sources: (string|RdfSource)[] default []
     fetch: typeof fetch default node-fetch

2  Executing SPARQL Queries
   Method signature
     engine.query(query: string|Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>
   query types
     SELECT, ASK, CONSTRUCT, DESCRIBE, UPDATE

3  Streaming and Handling Results
   SELECT/CONSTRUCT returns IBindingsStream or IQuadStream
     IBindingsStream: NodeJS.ReadableStream emitting Bindings objects
     IQuadStream: Quad stream implementing RDF/JS Stream<Quad>
   ASK returns Promise<boolean> via queryBoolean
   UPDATE uses queryVoid

4  Context Configuration
   context keys and types
     sources: array of endpoint URLs, file paths, or in-memory sources
     baseIRI: string used for relative IRIs
     lenient: boolean to ignore parse errors
     httpTimeout: number in ms
     batchSize: number of triples per fragment

5  RDF/JS Data Model Integration
   Requires compatible DataFactory implementing RDF/JS spec
     import { DataFactory } from 'rdf-data-factory'
     DataFactory.termToString for debugging

## Original Source
RDF/JS Data Model & Streams with rdf-ext and Comunica SPARQL Framework
https://comunica.dev/docs/query/framework

## Digest of QUERY_FRAMEWORK

# Comunica SPARQL Query Framework

# API Overview

The main entry point is the QueryEngine implementation returned by the actor-init-sparql package. The engine supports SPARQL query types: SELECT, ASK, CONSTRUCT, DESCRIBE, UPDATE.

# Core Method Signatures

```typescript
import { newEngine } from '@comunica/actor-init-sparql';

// Instantiate a new engine
export function newEngine(initContext?: IActorQueryOperationOutputInit): QueryEngine;

// Execute a generic SPARQL query
interface QueryEngine {
  query(query: string | Algebra.Operation, context?: IActionContextInit): Promise<IQueryResult>;
  queryBindings(query: string | Algebra.Operation, context?: IActionContextInit): Promise<IBindingsStream>;
  queryQuads(query: string | Algebra.Operation, context?: IActionContextInit): Promise<IQuadStream>;
  queryVoid(query: string | Algebra.Operation, context?: IActionContextInit): Promise<void>;
}
```

# Configuration Context Keys

- sources: (string|RdfSource)[] — endpoints, file paths, or in-memory sources (default: []).
- fetch: typeof fetch — HTTP fetch implementation (default: node-fetch).
- lenient: boolean — ignore non-fatal parsing errors (default: false).
- baseIRI: string — base IRI for query parsing (default: '')
- httpTimeout: number — timeout for HTTP requests in ms (default: 300000).
- batchSize: number — number of triples fetched per fragment (default: 100).

# Example Usage

```js
import { newEngine } from '@comunica/actor-init-sparql';

async function run() {
  const engine = newEngine();
  const result = await engine.query(
    'SELECT ?s ?p ?o WHERE { ?s ?p ?o }',
    { sources: ['https://dbpedia.org/sparql'] }
  );
  const stream = await result.bindings();
  stream.on('data', binding => console.log(binding.get('?s').value));
}
run();
```


## Attribution
- Source: RDF/JS Data Model & Streams with rdf-ext and Comunica SPARQL Framework
- URL: https://comunica.dev/docs/query/framework
- License: License
- Crawl Date: 2025-04-27T16:50:38.868Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27

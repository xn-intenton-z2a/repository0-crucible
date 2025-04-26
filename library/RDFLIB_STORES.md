# RDFLIB_STORES

## Crawl Summary
Supported store backends: in-memory (Memory, SimpleMemory), persistent (BerkeleyDB via bsddb3), remote SPARQL (SPARQLStore read-only, SPARQLUpdateStore read/write) with plugin names and instantiation patterns.

## Normalised Extract
Table of Contents
1 Memory Stores
2 Persistent On-Disk Stores
3 Remote SPARQL Endpoints

1 Memory Stores
Classes: rdflib.plugins.stores.memory.Memory, rdflib.plugins.stores.memory.SimpleMemory
Usage: Graph(store='Memory', identifier=None)

2 Persistent On-Disk Stores
Class: rdflib.plugins.stores.berkeleydb.BerkeleyDB
Methods:
  __init__(store='BerkeleyDB', identifier=None)
  open(path: str, create: bool=False) -> None
  commit() -> None
  rollback() -> None
  close() -> None
Example:
  g = Graph(store='BerkeleyDB')
  g.open('/db/path', create=True)
  g.add((s, p, o))
  g.commit()

3 Remote SPARQL Endpoints
Classes:
  rdflib.plugins.stores.sparqlstore.SPARQLStore(queryEndpoint: str)
  rdflib.plugins.stores.sparqlstore.SPARQLUpdateStore(queryEndpoint: str, updateEndpoint: str)
Methods:
  __init__(queryEndpoint: str, updateEndpoint: Optional[str])
  triples((s, p, o)) -> generator of triples
  query(sparqlQuery: str) -> Result
  update(sparqlUpdate: str) -> None
Example (read-only):
  store = SPARQLStore('http://dbpedia.org/sparql')
  g = ConjunctiveGraph(store=store)
  for s, p, o in g.triples((None, RDF.type, FOAF.Person)):
      print(s)
Example (read/write):
  store = SPARQLUpdateStore('http://example.org/query','http://example.org/update')
  g = ConjunctiveGraph(store=store)
  g.update("INSERT DATA { <http://ex> <http://p> <http://o> }")

## Supplementary Details
Graph constructor parameters:
  store: plugin name (string) or Store instance
  identifier: URIRef or None
  namespace_manager: NamespaceManager or default
Persistent store details:
  BerkeleyDB: requires Python bsddb3, database path to open, create flag defaults to False
  commit flushes buffer, rollback discards uncommitted triples
Remote store details:
  SPARQLStore: only queryEndpoint, default headers and timeout 60s
  SPARQLUpdateStore: queryEndpoint and updateEndpoint required
  Both support HTTP methods GET for queries, POST for updates


## Reference Details
Class rdflib.Graph
  Signature: __init__(self, store: Union[str, Store]='default', identifier: Optional[Union[URIRef,str]]=None, namespace_manager: Optional[NamespaceManager]=None)
  Parameters:
    store: plugin name or Store instance; 'Memory' default
    identifier: graph URI
    namespace_manager: manages prefix-URI mappings
  Methods:
    open(self, path: str, create: bool=False) -> None
    commit(self) -> None
    rollback(self) -> None
    close(self) -> None
    add(self, triple: Tuple[Node, Node, Node]) -> None
    remove(self, triple: Tuple[Node, Node, Node]) -> None
    triples(self, pattern: Tuple[Optional[Node],Optional[Node],Optional[Node]]) -> Iterator[Tuple[Node,Node,Node]]
    query(self, sparql: str, initNs: Optional[Dict[str,Namespace]]=None, initBindings: Optional[Dict[str,Node]]=None, timeout: Optional[int]=None) -> Result
    update(self, sparqlUpdate: str, initNs: Optional[Dict[str,Namespace]]=None, initBindings: Optional[Dict[str,Node]]=None, timeout: Optional[int]=None) -> None

Class rdflib.ConjunctiveGraph (inherits Graph)
  Same signature; supports multiple named graphs via identifier parameter

SPARQLStore
  __init__(self, endpoint: str, context_aware: bool=False, returnFormat: str='json')
  query(self, sparql: str) -> Result
  triples(self, triple_pattern) -> generator

SPARQLUpdateStore
  __init__(self, queryEndpoint: str, updateEndpoint: str, returnFormat: str='json')
  query(self, sparql: str) -> Result
  update(self, sparql: str) -> None

Concrete Code Examples:
  from rdflib import Graph, ConjunctiveGraph, URIRef, Namespace
  from rdflib.plugins.stores.sparqlstore import SPARQLStore, SPARQLUpdateStore

  # In-memory graph
  g_mem = Graph()
  g_mem.add((URIRef('http://ex/s'), URIRef('http://ex/p'), URIRef('http://ex/o')))

  # BerkeleyDB persistent
  g_db = Graph(store='BerkeleyDB')
  g_db.open('/tmp/rdfdb', create=True)
  g_db.add((s,p,o))
  g_db.commit()

  # Remote read-only
  store_ro = SPARQLStore('http://dbpedia.org/sparql')
  g_ro = ConjunctiveGraph(store=store_ro)
  results = g_ro.query('SELECT ?s WHERE { ?s a <http://xmlns.com/foaf/0.1/Person> }')

  # Remote read/write
  store_rw = SPARQLUpdateStore('http://ex/query','http://ex/update')
  g_rw = ConjunctiveGraph(store=store_rw)
  g_rw.update('INSERT DATA { <http://ex/s> <http://ex/p> <http://ex/o> }')

Troubleshooting:
  Error: NoSuchPluginException: store
    Install plugin package or register custom store via register('store','module.Class')
  HTTP timeouts
    Set endpoint timeout: graph.query(..., timeout=120)


## Information Dense Extract
MemoryStores: plugin=Memory, class=rdflib.plugins.stores.memory.Memory; instantiate Graph(store='Memory')
SimpleMemory: plugin=SimpleMemory
BerkeleyDB: plugin=BerkeleyDB, class=rdflib.plugins.stores.berkeleydb.BerkeleyDB; open(path:str,create:bool), commit(), rollback(), close()
SPARQLStore: rdflib.plugins.stores.sparqlstore.SPARQLStore(endpoint:str,context_aware:bool=False,returnFormat:'json'); methods query(str)->Result, triples(pattern)->generator
SPARQLUpdateStore: rdflib.plugins.stores.sparqlstore.SPARQLUpdateStore(queryEndpoint:str,updateEndpoint:str,returnFormat:'json'); methods query(str)->Result, update(str)->None
Graph & ConjunctiveGraph signature: __init__(store:str|Store='default',identifier:URIRef|str=None,namespace_manager:NamespaceManager=None)
Common methods: add(triple), remove(triple), triples(pattern), query(str,initNs:Dict,initBindings:Dict,timeout:int)->Result, update(str)->None
Errors: NoSuchPluginException if plugin missing; register via plugin.register('store',module.Class)
Endpoints: HTTP GET for SELECT, POST for UPDATE; default timeout=60s; override via query(...,timeout=N)

## Sanitised Extract
Table of Contents
1 Memory Stores
2 Persistent On-Disk Stores
3 Remote SPARQL Endpoints

1 Memory Stores
Classes: rdflib.plugins.stores.memory.Memory, rdflib.plugins.stores.memory.SimpleMemory
Usage: Graph(store='Memory', identifier=None)

2 Persistent On-Disk Stores
Class: rdflib.plugins.stores.berkeleydb.BerkeleyDB
Methods:
  __init__(store='BerkeleyDB', identifier=None)
  open(path: str, create: bool=False) -> None
  commit() -> None
  rollback() -> None
  close() -> None
Example:
  g = Graph(store='BerkeleyDB')
  g.open('/db/path', create=True)
  g.add((s, p, o))
  g.commit()

3 Remote SPARQL Endpoints
Classes:
  rdflib.plugins.stores.sparqlstore.SPARQLStore(queryEndpoint: str)
  rdflib.plugins.stores.sparqlstore.SPARQLUpdateStore(queryEndpoint: str, updateEndpoint: str)
Methods:
  __init__(queryEndpoint: str, updateEndpoint: Optional[str])
  triples((s, p, o)) -> generator of triples
  query(sparqlQuery: str) -> Result
  update(sparqlUpdate: str) -> None
Example (read-only):
  store = SPARQLStore('http://dbpedia.org/sparql')
  g = ConjunctiveGraph(store=store)
  for s, p, o in g.triples((None, RDF.type, FOAF.Person)):
      print(s)
Example (read/write):
  store = SPARQLUpdateStore('http://example.org/query','http://example.org/update')
  g = ConjunctiveGraph(store=store)
  g.update('INSERT DATA { <http://ex> <http://p> <http://o> }')

## Original Source
Python RDFLib
https://rdflib.readthedocs.io/en/stable/

## Digest of RDFLIB_STORES

# Store Implementations

Retrieved: 2024-06-05
Data Size: 102887319 bytes

## Memory Stores

- rdflib.plugins.stores.memory.Memory
- rdflib.plugins.stores.memory.SimpleMemory

Instantiate an in-memory graph:
	source: from rdflib import Graph  
	Graph(store='Memory', identifier=None)

## Persistent On-Disk Stores

- rdflib.plugins.stores.berkeleydb.BerkeleyDB

Open or create a BerkeleyDB store:
	source: from rdflib import Graph  
	g = Graph(store='BerkeleyDB', identifier=None)  
	g.open('/path/to/db', create=True)
	# commit writes buffered triples to disk
	g.commit()

## Remote SPARQL Endpoints

- rdflib.plugins.stores.sparqlstore.SPARQLStore (read-only)
- rdflib.plugins.stores.sparqlstore.SPARQLUpdateStore (read/write)

Connect to a remote SPARQL endpoint:
	source: from rdflib.plugins.stores.sparqlstore import SPARQLStore  
	from rdflib import ConjunctiveGraph  
	store = SPARQLStore('http://example.org/sparql')  
	g = ConjunctiveGraph(store=store)

Connect to a SPARQL endpoint with update support:
	source: from rdflib.plugins.stores.sparqlstore import SPARQLUpdateStore  
	from rdflib import ConjunctiveGraph  
	store = SPARQLUpdateStore(queryEndpoint='http://example.org/query', updateEndpoint='http://example.org/update')  
	g = ConjunctiveGraph(store=store)


## Attribution
- Source: Python RDFLib
- URL: https://rdflib.readthedocs.io/en/stable/
- License: BSD License
- Crawl Date: 2025-04-26T03:06:18.287Z
- Data Size: 102887319 bytes
- Links Found: 266475

## Retrieved
2025-04-26

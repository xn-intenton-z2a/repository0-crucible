# RDF4J_GUIDE

## Crawl Summary
Repository setup classes: SailRepository with MemoryStore or NativeStore(dataDir,indexes). Initialize via initialize() and shutDown(). Obtain RepositoryConnection via getConnection(). Perform SPARQL queries with prepareTupleQuery/prepareGraphQuery/prepareBooleanQuery and evaluate(). Perform SPARQL updates with prepareUpdate() and execute(). Manage transactions via setAutoCommit, begin, commit, rollback. Import RDF via Rio.createParser and StatementCollector. Export via Rio.createWriter and connection.export(). Remote via HTTPRepository(serverURL,repoID) with optional setUsernameAndPassword. Configuration parameters: dataDir path, tripleIndexes, autoCommit default true, supported formats: RDFXML,TURTLE,NTRIPLES,N3,JSONLD.

## Normalised Extract
Table of Contents:
1. Repository Setup
2. Connection Lifecycle
3. SPARQL Query Execution
4. SPARQL Update Execution
5. Transaction Management
6. RDF Import and Export
7. Remote HTTP Repository
8. Logging Configuration

1. Repository Setup
- Instantiate repository:
  - In-memory: new SailRepository(new MemoryStore())
  - Native: new SailRepository(new NativeStore(new File("/data/rdf4j"),"spoc,posc,cpso"))
- Initialize: repository.initialize()
- Shutdown: repository.shutDown()

2. Connection Lifecycle
- Obtain: RepositoryConnection conn = repository.getConnection()
- Close: conn.close()

3. SPARQL Query Execution
- Prepare: TupleQuery q = conn.prepareTupleQuery(QueryLanguage.SPARQL,queryString)
- Execute: TupleQueryResult r = q.evaluate()
- Iterate: while(r.hasNext()){BindingSet bs=r.next();}
- Close: r.close()

4. SPARQL Update Execution
- Prepare: Update u = conn.prepareUpdate(QueryLanguage.SPARQL,updateString)
- Execute: u.execute()

5. Transaction Management
- Auto-commit: conn.setAutoCommit(false) or true
- Begin: conn.begin()
- Commit: conn.commit()
- Rollback: conn.rollback()

6. RDF Import and Export
- Import Turtle: RDFParser p=Rio.createParser(RDFFormat.TURTLE); p.setRDFHandler(new StatementCollector(conn)); p.parse(new FileInputStream("in.ttl"),baseURI)
- Export N-Triples: RDFWriter w=Rio.createWriter(RDFFormat.NTRIPLES,out); conn.export(w)

7. Remote HTTP Repository
- Create: HTTPRepository repo = new HTTPRepository("http://localhost:8080/rdf4j-server","repoID")
- Auth: repo.setUsernameAndPassword("user","pass")
- Initialize and get connection as above

8. Logging Configuration
- log4j.properties:
  - log4j.logger.org.eclipse.rdf4j=INFO, file
  - log4j.appender.file.File=logs/rdf4j.log

## Supplementary Details
Configuration Options:
- dataDir (File): directory for NativeStore data (default: user.home/.rdf4j)
- tripleIndexes (String): comma-separated combination of spo,sop,pso,pos,osp,ops (default: spo,pso,pos)
- autoCommit (boolean): true/false, default true
- syncDelayMS (long): delay in ms for FS sync (default: 1000)

Supported RDFFormat values and MIME mapping:
- RDFXML: application/rdf+xml
- TURTLE: text/turtle
- NTRIPLES: application/n-triples
- N3: text/rdf+n3
- JSONLD: application/ld+json

HTTPRepository settings:
- serverURL: full endpoint of RDF4J server
- repositoryID: identifier of remote repo
- httpMaxConnections (system property org.eclipse.rdf4j.httpclient.maxConnections): default 20

Initialization Steps:
1. Instantiate repository
2. Call initialize()
3. Obtain connection
4. Execute operations
5. Close connection
6. Call shutDown()

## Reference Details
Interface Repository:
- void initialize() throws RepositoryException
- boolean isInitialized()
- void shutDown() throws RepositoryException
- RepositoryConnection getConnection() throws RepositoryException

Interface RepositoryConnection:
- void setAutoCommit(boolean autoCommit)
- boolean isAutoCommit()
- void begin() throws RepositoryException
- void commit() throws RepositoryException
- void rollback() throws RepositoryException
- TupleQuery prepareTupleQuery(QueryLanguage lang,String query) throws RepositoryException,MalformedQueryException
- GraphQuery prepareGraphQuery(QueryLanguage lang,String query) throws RepositoryException,MalformedQueryException
- BooleanQuery prepareBooleanQuery(QueryLanguage lang,String query) throws RepositoryException,MalformedQueryException
- Update prepareUpdate(QueryLanguage lang,String update) throws RepositoryException,MalformedQueryException
- void add(Iterable<? extends Statement> statements,Resource... contexts) throws RepositoryException
- void remove(IRI subj,IRI pred,Value obj,Resource... contexts) throws RepositoryException
- RepositoryResult<Statement> getStatements(Resource subj,IRI pred,Value obj,boolean includeInferred,Resource... contexts) throws RepositoryException
- void clear(Resource... contexts) throws RepositoryException
- void export(RDFHandler handler,Resource... contexts) throws RepositoryException
- void close() throws RepositoryException

Class HTTPRepository:
- HTTPRepository(String serverURL,String repositoryID)
- void setUsernameAndPassword(String user,String pass)
- inherits Repository methods

Code Example:
```
SailRepository repository=new SailRepository(new NativeStore(new File("/var/data/rdf4j"),"spoc,posc,osp"));
repository.initialize();
try(RepositoryConnection conn=repository.getConnection()){
  conn.setAutoCommit(false);
  TupleQuery q=conn.prepareTupleQuery(QueryLanguage.SPARQL,"SELECT ?s?o WHERE{?s ?p ?o}");
  try(TupleQueryResult res=q.evaluate()){
    while(res.hasNext()){System.out.println(res.next().getValue("s"));}
  }
  conn.commit();
}
repository.shutDown();
```

Best Practices:
- Batch imports within a single transaction
- Configure appropriate indexes for expected query patterns
- Use try-with-resources for connections and results

Troubleshooting:
- Repository not initialized: call initialize() before getConnection()
- Excessive memory use: increase JVM heap or switch to NativeStore
- HTTP 429 Too Many Requests: increase httpMaxConnections
- To list repos via curl: `curl -X GET http://localhost:8080/rdf4j-server/repositories` (expect JSON array of IDs)

## Information Dense Extract
RDF4J Programming Guide: Instantiate SailRepository(MemoryStore|NativeStore(dataDir,indexes)); call initialize(); RepositoryConnection conn=getConnection(); conn.setAutoCommit(false); conn.begin();
prepareTupleQuery/SPARQL, prepareUpdate/SPARQL; TupleQueryResult evaluate(); Update.execute(); commit()/rollback(); conn.close(); repository.shutDown();
Rio.createParser(RDFFormat.TURTLE) with StatementCollector; Rio.createWriter(RDFFormat.NTRIPLES,out); conn.export(writer);
HTTPRepository(serverURL,repoID); setUsernameAndPassword; inherits Repository API; httpMaxConnections default 20.
Config options: dataDir user.home/.rdf4j; tripleIndexes spo,pso,pos; autoCommit=true; syncDelayMS=1000.
API signatures: Repository.initialize(),getConnection(),shutDown(); RepositoryConnection methods: setAutoCommit,begin,commit,rollback,prepareTupleQuery,prepareGraphQuery,prepareBooleanQuery,prepareUpdate,add,remove,getStatements,clear,export,close().
Supported formats: RDFXML,TURTLE,NTRIPLES,N3,JSONLD.
Best practices: batch transactions, proper indexes, try-with-resources.
Troubleshoot: init order errors, memory config, HTTP rate limits, curl list.

## Sanitised Extract
Table of Contents:
1. Repository Setup
2. Connection Lifecycle
3. SPARQL Query Execution
4. SPARQL Update Execution
5. Transaction Management
6. RDF Import and Export
7. Remote HTTP Repository
8. Logging Configuration

1. Repository Setup
- Instantiate repository:
  - In-memory: new SailRepository(new MemoryStore())
  - Native: new SailRepository(new NativeStore(new File('/data/rdf4j'),'spoc,posc,cpso'))
- Initialize: repository.initialize()
- Shutdown: repository.shutDown()

2. Connection Lifecycle
- Obtain: RepositoryConnection conn = repository.getConnection()
- Close: conn.close()

3. SPARQL Query Execution
- Prepare: TupleQuery q = conn.prepareTupleQuery(QueryLanguage.SPARQL,queryString)
- Execute: TupleQueryResult r = q.evaluate()
- Iterate: while(r.hasNext()){BindingSet bs=r.next();}
- Close: r.close()

4. SPARQL Update Execution
- Prepare: Update u = conn.prepareUpdate(QueryLanguage.SPARQL,updateString)
- Execute: u.execute()

5. Transaction Management
- Auto-commit: conn.setAutoCommit(false) or true
- Begin: conn.begin()
- Commit: conn.commit()
- Rollback: conn.rollback()

6. RDF Import and Export
- Import Turtle: RDFParser p=Rio.createParser(RDFFormat.TURTLE); p.setRDFHandler(new StatementCollector(conn)); p.parse(new FileInputStream('in.ttl'),baseURI)
- Export N-Triples: RDFWriter w=Rio.createWriter(RDFFormat.NTRIPLES,out); conn.export(w)

7. Remote HTTP Repository
- Create: HTTPRepository repo = new HTTPRepository('http://localhost:8080/rdf4j-server','repoID')
- Auth: repo.setUsernameAndPassword('user','pass')
- Initialize and get connection as above

8. Logging Configuration
- log4j.properties:
  - log4j.logger.org.eclipse.rdf4j=INFO, file
  - log4j.appender.file.File=logs/rdf4j.log

## Original Source
Java-based RDF Frameworks & Stores
https://rdf4j.org/documentation/programmers-guide/

## Digest of RDF4J_GUIDE

# RDF4J Programming Guide
Date: 2024-06-15

## Repository Configuration

Implementation classes:
- SailRepository (org.eclipse.rdf4j.repository.sail.SailRepository)
- MemoryStore (org.eclipse.rdf4j.sail.memory.MemoryStore)
- NativeStore (org.eclipse.rdf4j.sail.nativerdf.NativeStore)

NativeStore constructor:
```
new NativeStore(File dataDir,String tripleIndexes)
```
Parameters:
- dataDir: File path to store indexes and data
- tripleIndexes: comma-separated index names (valid values: spo, sop, pso, pos, osp, ops)

## Initialization API

Method signatures:
```
void initialize() throws RepositoryException
void shutDown() throws RepositoryException
``` 

## Connection API

```
RepositoryConnection getConnection() throws RepositoryException
``` 
Return: RepositoryConnection instance

## SPARQL Query API

TupleQuery prepareTupleQuery(QueryLanguage language,String queryString) 
throws RepositoryException, MalformedQueryException

TupleQueryResult evaluate() throws QueryEvaluationException

## SPARQL Update API

Update prepareUpdate(QueryLanguage language,String updateString)
throws RepositoryException, MalformedQueryException

void execute() throws UpdateExecutionException

## Transaction Management

```
void setAutoCommit(boolean autoCommit)
void begin() throws RepositoryException
void commit() throws RepositoryException
void rollback() throws RepositoryException
``` 
Defaults: autoCommit=true

## Rio Parsers and Writers

RDFParser createParser(RDFFormat format)
RDFWriter createWriter(RDFFormat format, OutputStream out)

Supported formats: RDFXML, TURTLE, NTRIPLES, N3, JSONLD

## Import/Export

Import:
```
RDFParser parser=Rio.createParser(RDFFormat.TURTLE);
parser.setRDFHandler(new StatementCollector(repo.getConnection()));
parser.parse(new FileInputStream("data.ttl"),"http://example.org/base");
```
Export:
```
RDFWriter writer=Rio.createWriter(RDFFormat.NTRIPLES,out);
conn.getConnection().export(writer);
```  

## HTTP Repository

Class: HTTPRepository (org.eclipse.rdf4j.repository.http.HTTPRepository)

Constructor:
```
HTTPRepository(String serverURL,String repositoryID)
```
Methods:
```
void setUsernameAndPassword(String user,String pass)
void initialize()
RepositoryConnection getConnection()
```  

## Logging Configuration

Use log4j:
```
log4j.logger.org.eclipse.rdf4j=INFO, file
log4j.appender.file.File=logs/rdf4j.log
```

## Attribution
- Source: Java-based RDF Frameworks & Stores
- URL: https://rdf4j.org/documentation/programmers-guide/
- License: License
- Crawl Date: 2025-04-28T10:29:56.927Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28

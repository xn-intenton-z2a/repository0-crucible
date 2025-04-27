# FUSEKI_SETUP

## Crawl Summary
Artifact names with checksums and PGP, CLI options (--config, --port, --mem, --loc, --update, --timeout, --enable-ui), Docker image and run parameters (volumes, ports, health check), Maven coordinates for embedding, FusekiServer.Builder methods (add, port, enableCors, start, stop), QueryExecutionFactory methods for local and remote queries.

## Normalised Extract
Table of Contents
1 Standalone Server CLI
2 Docker Deployment
3 Embedded Java Server
4 Java Client API

1 Standalone Server CLI
  Fuseki installation: directory FUSEKI_HOME
  Commands:
    FUSEKI_HOME/fuseki-server --config=config.ttl --port=3030 --mem /ds
  Options:
    --config file path to TTL configuration
    --port integer HTTP port default 3030
    --mem datasetName creates in-memory dataset
    --loc file system path for TDB storage
    --update enable SPARQL Update operations
    --timeout milliseconds query execution timeout
    --enable-ui boolean enable web UI
  Logging overridden via logging.properties in FUSEKI_HOME

2 Docker Deployment
  Image: apache/jena-fuseki:fuseki-version
  Run:
    docker run -d --name fuseki -p 3030:3030 \
      -v /host/data:/fuseki/databases \
      -v /host/config:/fuseki/config \
      apache/jena-fuseki:version --config=config.ttl
  Volumes:
    /fuseki/databases persistent TDB2 datasets
    /fuseki/config custom TTL configurations
  Health check endpoint: GET http://host:3030/$/status returns JSON { status: "OK" }

3 Embedded Java Server
  Maven artifacts:
    org.apache.jena:jena-fuseki-main:version
    org.apache.jena:jena-fuseki-ui:version
  Code pattern:
    Dataset ds = TDB2Factory.createDataset(path)
    FusekiServer server = FusekiServer.create()
       .add(datasetPath, ds, enableUpdate)
       .port(httpPort)
       .enableCors(corsFlag)
       .build();
    server.start();
    server.stop();

4 Java Client API
  QueryExecutionFactory methods:
    create(Query, Dataset, QuerySolution) binds initial values
    create(Query, Dataset) execute local dataset
    sparqlService(String serviceURL, Query) remote endpoint
  Query patterns:
    QueryFactory.create(sparqlString)
  Execution:
    execSelect(), execConstruct(), execAsk(), execDescribe()

## Supplementary Details
Default port 3030, default UI enabled true, default timeout 0 (no timeout). Configuration TTL syntax: dataset definitions using fuseki:Service, fuseki:Dataset, fuseki:name, fuseki:serviceQuery, fuseki:serviceUpdate, fuseki:serviceReadGraphStore, fuseki:datasetTDB. Example config.ttl snippet:

  @prefix fuseki: <http://jena.apache.org/fuseki#> .
  @prefix tdb:    <http://jena.apache.org/2016/tdb#> .

  [] rdf:type fuseki:Server ;
     fuseki:services (
       [
         rdf:type fuseki:Service ;
         fuseki:name "ds" ;
         fuseki:serviceQuery "query" ;
         fuseki:serviceUpdate "update" ;
         fuseki:serviceUpload "upload" ;
         fuseki:dataset [
           rdf:type tdb:DatasetTDB ;
           tdb:location "/fuseki/databases/ds"
         ]
       ]
     ) .

## Reference Details
CLI Options:
  --config <file>           Path to configuration TTL file
  --port <int>              HTTP port, default 3030
  --mem <name>              Create in-memory dataset with given name
  --loc <path>              File system path for persistent storage
  --update                  Enable SPARQL Update service
  --timeout <ms>            Query timeout in milliseconds
  --enable-ui <true|false>  Enable or disable Fuseki web interface
  --verbose                 Enable detailed logging

Docker Image:
  Image name: apache/jena-fuseki:fuseki-<version>
  Volumes:
    /fuseki/databases persistent storage directory
    /fuseki/config     configuration directory
  Health endpoint: GET /$/status returns JSON {"status":"OK"}

Java API:
  Class FusekiServer.Builder:
    Builder add(String mountPoint, Dataset dataset, boolean enableUpdate)
    Builder port(int port)
    Builder enableCors(boolean flag)
    FusekiServer build()
  Class FusekiServer:
    void start()
    void stop()
  Class QueryExecutionFactory:
    static QueryExecution create(Query query, Dataset dataset)
    static QueryExecution create(Query query, Dataset dataset, QuerySolution initialBinding)
    static QueryExecution sparqlService(String serviceURI, Query query)
  Class QueryFactory:
    static Query create(String sparqlString)

Java best practices:
  Use try-with-resources for QueryExecution
  Pre-bind variables using QuerySolutionMap for safe SPARQL injection

Troubleshooting:
  Check logs in FUSEKI_HOME/logs/fuseki.log
  CLI: fuseki-server --config=invalid.ttl outputs parse error with line number
  Docker: docker logs fuseki shows startup errors
  Health check returns HTTP 200 on success, HTTP 503 on failure

## Information Dense Extract
Fuseki 5.4.0 artifacts: tar.gz, zip, war; default port 3030; CLI options (--config, --port, --mem, --loc, --update, --timeout, --enable-ui); docker image apache/jena-fuseki:fuseki-5.4.0; Java embedding via FusekiServer.Builder.add, port, enableCors, start/stop; QueryExecutionFactory.create(Query,Dataset), sparqlService(serviceURI,Query); config.ttl uses fuseki:Service, fuseki:name, fuseki:datasetTDB with tdb:location; health endpoint GET /$/status; logs in FUSEKI_HOME/logs/fuseki.log

## Sanitised Extract
Table of Contents
1 Standalone Server CLI
2 Docker Deployment
3 Embedded Java Server
4 Java Client API

1 Standalone Server CLI
  Fuseki installation: directory FUSEKI_HOME
  Commands:
    FUSEKI_HOME/fuseki-server --config=config.ttl --port=3030 --mem /ds
  Options:
    --config file path to TTL configuration
    --port integer HTTP port default 3030
    --mem datasetName creates in-memory dataset
    --loc file system path for TDB storage
    --update enable SPARQL Update operations
    --timeout milliseconds query execution timeout
    --enable-ui boolean enable web UI
  Logging overridden via logging.properties in FUSEKI_HOME

2 Docker Deployment
  Image: apache/jena-fuseki:fuseki-version
  Run:
    docker run -d --name fuseki -p 3030:3030 '
      -v /host/data:/fuseki/databases '
      -v /host/config:/fuseki/config '
      apache/jena-fuseki:version --config=config.ttl
  Volumes:
    /fuseki/databases persistent TDB2 datasets
    /fuseki/config custom TTL configurations
  Health check endpoint: GET http://host:3030/$/status returns JSON { status: 'OK' }

3 Embedded Java Server
  Maven artifacts:
    org.apache.jena:jena-fuseki-main:version
    org.apache.jena:jena-fuseki-ui:version
  Code pattern:
    Dataset ds = TDB2Factory.createDataset(path)
    FusekiServer server = FusekiServer.create()
       .add(datasetPath, ds, enableUpdate)
       .port(httpPort)
       .enableCors(corsFlag)
       .build();
    server.start();
    server.stop();

4 Java Client API
  QueryExecutionFactory methods:
    create(Query, Dataset, QuerySolution) binds initial values
    create(Query, Dataset) execute local dataset
    sparqlService(String serviceURL, Query) remote endpoint
  Query patterns:
    QueryFactory.create(sparqlString)
  Execution:
    execSelect(), execConstruct(), execAsk(), execDescribe()

## Original Source
Apache Jena Fuseki SPARQL Server
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_SETUP

# Fuseki Server Setup (retrieved 2024-06-12)

## Download and Installation

Download Fuseki distribution:

  Filename                     SHA512 checksum            PGP signature
  apache-jena-fuseki-5.4.0.tar.gz   <hash>                 <sig>
  apache-jena-fuseki-5.4.0.zip       <hash>                 <sig>
  jena-fuseki-war-5.4.0.war          <hash>                 <sig>

Verify artifacts:

  pgp --verify apache-jena-fuseki-5.4.0.tar.gz.asc apache-jena-fuseki-5.4.0.tar.gz

## Standalone Server CLI Usage

Default installation directory: FUSEKI_HOME

Commands:

  $ FUSEKI_HOME/fuseki-server --config=config.ttl --port=3030 --mem /ds
  Options:
    --config=<file>         Fuseki configuration file (TTL format)
    --port=<port>           HTTP port (default 3030)
    --mem <datasetName>     In-memory dataset name
    --loc=<directory>       Graph store location
    --update                Enable SPARQL Update
    --timeout=<ms>          Query timeout in milliseconds
    --enable-ui             Enable web-based UI (default true)

Logging configuration can be overridden by logging.properties in FUSEKI_HOME.

## Docker Container Deployment

Docker image: apache/jena-fuseki:fuseki-5.4.0

Run command:

  $ docker run -d \
    --name fuseki \
    -p 3030:3030 \
    -v /host/data:/fuseki/databases \
    -v /host/config:/fuseki/config \
    apache/jena-fuseki:fuseki-5.4.0 \
    --config=config.ttl

Mapped volumes:
  /fuseki/databases    Persistent storage for TDB datasets
  /fuseki/config       Custom configuration files

Health check:

  $ curl -f http://localhost:3030/$/status

## Embedded SPARQL Server in Java

Maven dependencies:

  <dependency>
    <groupId>org.apache.jena</groupId>
    <artifactId>jena-fuseki-main</artifactId>
    <version>5.4.0</version>
  </dependency>
  <dependency>
    <groupId>org.apache.jena</groupId>
    <artifactId>jena-fuseki-ui</artifactId>
    <version>5.4.0</version>
  </dependency>

Java code example:

  import org.apache.jena.fuseki.main.FusekiServer;
  import org.apache.jena.tdb2.TDB2Factory;
  import org.apache.jena.query.Dataset;

  Dataset ds = TDB2Factory.createDataset("/data/tdb");
  FusekiServer server = FusekiServer.create()
       .add("/ds", ds, true)               // mount dataset at /ds with SPARQL Update
       .port(3030)                          // HTTP port
       .enableCors(true)                   // CORS support
       .build();                            
  server.start();

Stop server:

  server.stop();

## Java Client Access

In-memory query execution:

  import org.apache.jena.query.QueryExecutionFactory;
  import org.apache.jena.query.QueryExecution;
  import org.apache.jena.query.Query;
  import org.apache.jena.query.QueryFactory;
  import org.apache.jena.query.ResultSet;

  Query query = QueryFactory.create("SELECT ?s WHERE { ?s ?p ?o } LIMIT 10");
  try (QueryExecution qExec =
         QueryExecutionFactory.create(query, ds)) {
    ResultSet rs = qExec.execSelect();
    // iterate ResultSet
  }

Remote SPARQL service:

  try (QueryExecution qExec =
         QueryExecutionFactory.sparqlService(
             "http://localhost:3030/ds/query", query)) {
    ResultSet rs = qExec.execSelect();
  }


## Attribution
- Source: Apache Jena Fuseki SPARQL Server
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License
- Crawl Date: 2025-04-27T22:48:36.249Z
- Data Size: 918274 bytes
- Links Found: 2482

## Retrieved
2025-04-27

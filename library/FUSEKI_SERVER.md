# FUSEKI_SERVER

## Crawl Summary
Downloaded distributions (tar.gz, zip, WAR) with SHA512 and PGP. Maven artifacts org.apache.jena:jena-fuseki-main and jena-fuseki-ui at version 5.4.0. CLI options: --mem, --update, --port, --config, --shiro, --verbose. Docker image apache/jena-fuseki:5.4.0, run with -p 3030. Java embedding: FusekiServer API with create(), port(), add(), build(), start(). Configuration TTL Assembler: fuseki:server settings including port, services, dataset path, endpoint names. SPARQL endpoints: /{ds}/query, /update, Graph Store /{ds}/data with GET, PUT, POST, DELETE. Parameters: query, update, default-graph-uri, named-graph-uri. Shiro security: shiro.ini user and role definitions, URL patterns. Logging via --verbose and log4j2.xml. Troubleshooting commands for ports, locks, authentication, Java version, logs.

## Normalised Extract
Table of Contents:
1. Download and Installation
2. Maven Dependencies
3. CLI Start Options
4. Docker Deployment
5. Java Embedded Server API
6. Configuration Assembler File
7. SPARQL/Graph Store Endpoints
8. Shiro Security Setup
9. Logging Configuration
10. Troubleshooting Commands

1. Download and Installation
  Files:
    apache-jena-fuseki-5.4.0.tar.gz  SHA512 + PGP
    apache-jena-fuseki-5.4.0.zip     SHA512 + PGP
    jena-fuseki-war-5.4.0.war        SHA512 + PGP

2. Maven Dependencies
  Add:
    groupId: org.apache.jena
    artifactId: jena-fuseki-main
    version: 5.4.0
  UI:
    artifactId: jena-fuseki-ui

3. CLI Start Options
  --mem        In-memory dataset
  --update     Enable SPARQL Update
  --port=N     HTTP port
  --config=F   TTL assembler file
  --shiro=F    Shiro ini file
  --verbose    Debug logging

4. Docker Deployment
  docker pull apache/jena-fuseki:5.4.0
  docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0 --mem /ds

5. Java Embedded Server API
  Methods:
    FusekiServer.create():Builder
    Builder.port(int)
    Builder.add(String path, Dataset ds)
    Builder.build():FusekiServer
    FusekiServer.start():void
  Example:
    Dataset ds = TDB2Factory.connectDataset("/data");
    FusekiServer server = FusekiServer.create().port(3030).add("/ds", ds).build();
    server.start();

6. Configuration Assembler File
  Prefixes:
    fuseki: <http://jena.apache.org/fuseki#>
    ja:     <http://jena.hpl.hp.com/2005/11/Assembler#>
  Server definition:
    fuseki:port 3030
    fuseki:services [ fuseki:name, fuseki:dataset, serviceQuery, serviceUpdate, serviceReadGraphStore, serviceReadWriteGraphStore ]

7. SPARQL/Graph Store Endpoints
  /{ds}/query  GET/POST
    Params: query, default-graph-uri, named-graph-uri
    Content-Type: application/sparql-query, application/x-www-form-urlencoded
  /{ds}/update POST
    Param: update
  /{ds}/data   GET, PUT, POST, DELETE
    PUT replace, POST append, DELETE remove graph via ?graph=URI
    Content-Type: text/turtle, application/trig

8. Shiro Security Setup
  shiro.ini sections:
    [users]: user=pass,role
    [roles]: role=permission list
    [urls]: URL pattern=filters
  Example:
    /ds/query   = authc,roles[reader]
    /ds/update  = authc,roles[admin]

9. Logging Configuration
  Enable verbose: --verbose
  log4j2.xml:
    Logger name="org.apache.jena.fuseki" level="INFO"
    Root level="WARN"

10. Troubleshooting Commands
  lsof -i :3030
  kill <pid>
  tail -F fuseki.log
  rm dataset/*tdb.lock
  java -version (must be 17+)


## Supplementary Details
Installation: extract tar.gz or unzip to FUSEKI_HOME. Set environment FUSEKI_HOME. CLI scripts in $FUSEKI_HOME/fuseki-server. Require Java 17+ set in PATH.

Docker: mount host directory: -v /host/data:/data/ds. Example:
  docker run --rm -p 3030:3030 -v /host/data:/data/ds apache/jena-fuseki:5.4.0 --loc=/data/ds /ds

Embedded Java: include jena-fuseki-main and jena-fuseki-ui in classpath. Dataset creation: TDB2Factory.connectDataset(path) or DatasetFactory.createTxnMem().

Configuration TTL details:
  fuseki:dataset can be file path or jena:Dataset assembler object.
  serviceQuery default name 'query', serviceUpdate 'update', serviceReadGraphStore 'get', serviceReadWriteGraphStore 'data'.
  fuseki:shiroConfigFile path supports relative or absolute.

Shiro permissions:
  Authentication: 'authc', Authorization: 'roles[roleName]'.
  Default anon: /public = anon.

Logging:
  Place log4j2.xml in classpath or specify -Dlog4j.configurationFile=path.

Metrics: JMX support via --metrics flag. Exposes MBeans under org.apache.jena.fuseki.


## Reference Details
CLI Options:
--port <int>                 Default 3030
--config <file>              TTL assembler file path
--shiro <file>               Shiro ini file path
--mem                        Use in-memory dataset
--loc <directory>            Location for TDB2 dataset
--update                     Enable SPARQL Update
--verbose                    Verbose logging to console
--metrics                    Enable JMX metrics

Java API:
public final class FusekiServer {
  public static Builder create();
  public static Builder create(String configFile);
  public static class Builder {
    public Builder port(int port);
    public Builder add(String urlPattern, Dataset dataset);
    public Builder addServlet(String urlPattern, HttpServlet servlet);
    public Builder verboseLogging(boolean on);
    public Builder withShiroConfig(String shiroIniFile);
    public FusekiServer build();
  }
  public void start();
  public void stop();
  public boolean isRunning();
}

Dataset creation:
Dataset ds1 = TDB2Factory.connectDataset("path");
Dataset ds2 = DatasetFactory.createTxnMem();

Assembler config (TTL):
Service parameters:
  fuseki:name                    String (endpoint suffix)
  fuseki:dataset                 File path or assembler reference
  fuseki:serviceQuery            endpoint name
  fuseki:serviceUpdate           endpoint name
  fuseki:serviceReadGraphStore   endpoint name
  fuseki:serviceReadWriteGraphStore endpoint name

Shiro ini file grammar:
[users]
user = password,role1,role2
[roles]
role = permission[,permission]
[urls]
URLPattern = filterChainDefinition

Best Practices:
- Isolate each dataset in its own TDB2 folder.
- Use --loc for persistent storage over --mem.
- Secure update endpoint with Shiro roles.
- Enable metrics and monitor JMX MBeans.

Troubleshooting:
- Command: `lsof -iTCP:3030 -sTCP:LISTEN` Expected no output if port free.
- Lock files: `ls data/ds/*.tdb2.lock` remove stale files.
- Log level adjustment: add `-Dlog4j2.debug` to JVM options.
- Check SPARQL service: `curl -G 'http://localhost:3030/ds/query' --data-urlencode 'query=ASK{}'` Expected `true`.

## Information Dense Extract
Distributions: apache-jena-fuseki-5.4.0.{tar.gz,zip}, jena-fuseki-war-5.4.0.war; SHA512+PGP. Maven: org.apache.jena:jena-fuseki-main/UI:5.4.0. CLI: fuseki-server [--port N] [--config file] [--shiro file] [--mem] [--update] [--verbose] [--metrics]. Docker: apache/jena-fuseki:5.4.0 -p 3030:3030 --mem /ds. Java: FusekiServer.create().port(3030).add("/ds",Dataset).verboseLogging(true).withShiroConfig("shiro.ini").build().start(); TTL config: fuseki:port, fuseki:services(elements with fuseki:name, fuseki:dataset, serviceQuery, serviceUpdate, serviceReadGraphStore, serviceReadWriteGraphStore). Endpoints: /ds/query (GET/POST, params:query,default-graph-uri,named-graph-uri), /ds/update (POST, update param), /ds/data (GET/PUT/POST/DELETE, graph param, content-types: text/turtle,application/trig). Shiro: [users],[roles],[urls]. Logging: log4j2.xml Logger name="org.apache.jena.fuseki" level=INFO. Troubleshooting: lsof/killing port, remove .lock files, curl ASK{} returns true, Java17+ required.

## Sanitised Extract
Table of Contents:
1. Download and Installation
2. Maven Dependencies
3. CLI Start Options
4. Docker Deployment
5. Java Embedded Server API
6. Configuration Assembler File
7. SPARQL/Graph Store Endpoints
8. Shiro Security Setup
9. Logging Configuration
10. Troubleshooting Commands

1. Download and Installation
  Files:
    apache-jena-fuseki-5.4.0.tar.gz  SHA512 + PGP
    apache-jena-fuseki-5.4.0.zip     SHA512 + PGP
    jena-fuseki-war-5.4.0.war        SHA512 + PGP

2. Maven Dependencies
  Add:
    groupId: org.apache.jena
    artifactId: jena-fuseki-main
    version: 5.4.0
  UI:
    artifactId: jena-fuseki-ui

3. CLI Start Options
  --mem        In-memory dataset
  --update     Enable SPARQL Update
  --port=N     HTTP port
  --config=F   TTL assembler file
  --shiro=F    Shiro ini file
  --verbose    Debug logging

4. Docker Deployment
  docker pull apache/jena-fuseki:5.4.0
  docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0 --mem /ds

5. Java Embedded Server API
  Methods:
    FusekiServer.create():Builder
    Builder.port(int)
    Builder.add(String path, Dataset ds)
    Builder.build():FusekiServer
    FusekiServer.start():void
  Example:
    Dataset ds = TDB2Factory.connectDataset('/data');
    FusekiServer server = FusekiServer.create().port(3030).add('/ds', ds).build();
    server.start();

6. Configuration Assembler File
  Prefixes:
    fuseki: <http://jena.apache.org/fuseki#>
    ja:     <http://jena.hpl.hp.com/2005/11/Assembler#>
  Server definition:
    fuseki:port 3030
    fuseki:services [ fuseki:name, fuseki:dataset, serviceQuery, serviceUpdate, serviceReadGraphStore, serviceReadWriteGraphStore ]

7. SPARQL/Graph Store Endpoints
  /{ds}/query  GET/POST
    Params: query, default-graph-uri, named-graph-uri
    Content-Type: application/sparql-query, application/x-www-form-urlencoded
  /{ds}/update POST
    Param: update
  /{ds}/data   GET, PUT, POST, DELETE
    PUT replace, POST append, DELETE remove graph via ?graph=URI
    Content-Type: text/turtle, application/trig

8. Shiro Security Setup
  shiro.ini sections:
    [users]: user=pass,role
    [roles]: role=permission list
    [urls]: URL pattern=filters
  Example:
    /ds/query   = authc,roles[reader]
    /ds/update  = authc,roles[admin]

9. Logging Configuration
  Enable verbose: --verbose
  log4j2.xml:
    Logger name='org.apache.jena.fuseki' level='INFO'
    Root level='WARN'

10. Troubleshooting Commands
  lsof -i :3030
  kill <pid>
  tail -F fuseki.log
  rm dataset/*tdb.lock
  java -version (must be 17+)

## Original Source
SPARQL 1.1 & Graph Store Protocol
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_SERVER

# Download and Installation

Files:
- apache-jena-fuseki-5.4.0.tar.gz    SHA512: [checksum]    PGP Signature: [key]
- apache-jena-fuseki-5.4.0.zip       SHA512: [checksum]    PGP Signature: [key]
- jena-fuseki-war-5.4.0.war          SHA512: [checksum]    PGP Signature: [key]

# Maven Dependencies

Add to pom.xml:
```
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
```

# Running Fuseki Server (CLI)

Commands:
```
# Run in-memory dataset with SPARQL query and update endpoints
./fuseki-server --mem --update /ds

# Custom port and config file
./fuseki-server --port=3030 --config=/path/to/config.ttl

# WAR deployment
java -jar jena-fuseki-war-5.4.0.war --port=8080
```

# Docker Deployment

```
docker pull apache/jena-fuseki:5.4.0
docker run --rm -p 3030:3030 apache/jena-fuseki:5.4.0 --mem /ds
```

# Embedded SPARQL Server (Java)

```java
import org.apache.jena.fuseki.main.FusekiServer;
import org.apache.jena.query.Dataset;
import org.apache.jena.tdb2.TDB2Factory;

Dataset dataset = TDB2Factory.connectDataset("/path/to/tdb2");
FusekiServer server = FusekiServer.create()
    .port(3030)
    .add("/ds", dataset)
    .build();
server.start();
```

# Fuseki Configuration File (TTL Assembler)

```ttl
@prefix fuseki:  <http://jena.apache.org/fuseki#>.
@prefix ja:      <http://jena.hpl.hp.com/2005/11/Assembler#>.
[] ja:loadClass "org.apache.jena.fuseki.Fuseki";
   fuseki:server
     [ fuseki:port 3030;
       fuseki:services (
         [ fuseki:name "ds";
           fuseki:dataset   "./data/ds";
           fuseki:serviceQuery       "query";
           fuseki:serviceUpdate      "update";
           fuseki:serviceReadGraphStore      "get";
           fuseki:serviceReadWriteGraphStore "data"
         ]
       )
     ].
```

# SPARQL and Graph Store Endpoints

- Query:     GET/POST  http://host:port/{dataset}/query
  - Params: query (SPARQL1.1), default-graph-uri, named-graph-uri
  - POST content-types: application/sparql-query, application/x-www-form-urlencoded

- Update:    POST      http://host:port/{dataset}/update
  - Params: update (SPARQL1.1 Update), same graph params

- GraphStore: /{dataset}/data
  - GET    returns default or named graph
  - PUT    replace graph, Content-Type: text/turtle, application/trig
  - POST   append
  - DELETE remove graph via ?graph=URI

# Security Configuration (Shiro)

shiro.ini:
```
[users]
admin = secret, admin
reader = readerPass, reader

[roles]
admin    = *
reader   = fuseki:query

[urls]
/ds/query   = authc, roles[reader]
/ds/update  = authc, roles[admin]
/**         = anon
```

Fuseki startup:
```
./fuseki-server --config=config.ttl --shiro=shiro.ini
```

# Logging and Monitoring

- Enable verbose logging: `--verbose`
- log4j2.xml example:
```
<Configuration>
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
    </Console>
  </Appenders>
  <Loggers>
    <Logger name="org.apache.jena.fuseki" level="INFO" additivity="false">
      <AppenderRef ref="Console"/>
    </Logger>
    <Root level="WARN">
      <AppenderRef ref="Console"/>
    </Root>
  </Loggers>
</Configuration>
```

# Troubleshooting

- Port in use: `lsof -i :3030` then `kill <pid>`
- Dataset lock errors: ensure no other process holds `--tdb.lock` files
- Authentication failure: check roles and permissions in shiro.ini
- Java version: require Java 17+  
- View logs: `tail -F fuseki.log`


## Attribution
- Source: SPARQL 1.1 & Graph Store Protocol
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License if known
- Crawl Date: 2025-04-28T19:49:13.457Z
- Data Size: 1153167 bytes
- Links Found: 3053

## Retrieved
2025-04-28

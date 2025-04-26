# FUSEKI_SETUP

## Crawl Summary
GroupId org.apache.jena with artifactId jena-fuseki-main and jena-fuseki-ui. Binary distributions: apache-jena-fuseki-5.3.0.tar.gz, .zip, jena-fuseki-5.3.0.war with SHA512 and PGP signatures. Java 17+, Servlet 6.0 for WAR. Docker image from jena-fuseki-docker module. GitHub Fuseki2 under jena-fuseki2/. Snapshots at Apache repository.

## Normalised Extract
Table of Contents
1 Maven Dependencies
2 Binary Distributions
3 WAR Deployment Requirements
4 Docker Container Usage
5 Source and Snapshots

1 Maven Dependencies
   groupId: org.apache.jena
   modules:
     - jena-fuseki-main (core server)
     - jena-fuseki-ui   (web UI)
   version: X.Y.Z

2 Binary Distributions
   Files:
     - apache-jena-fuseki-5.3.0.tar.gz (SHA512, PGP)
     - apache-jena-fuseki-5.3.0.zip    (SHA512, PGP)
   Checksums and Signatures:
     - Each distribution includes .sha512 and .asc

3 WAR Deployment Requirements
   File: jena-fuseki-5.3.0.war
   Requires:
     - Java 17+
     - Jakarta Servlet API 6.0 compliant container (Apache Tomcat 10+)
   Deployment steps:
     1 Copy WAR to webapps directory
     2 Start container
     3 Service available at http://<host>:<port>/fuseki

4 Docker Container Usage
   Module: jena-fuseki-docker
   Build:
     docker build -t apache/jena-fuseki:5.3.0 .
   Run:
     docker run --name fuseki -p 3030:3030 apache/jena-fuseki:5.3.0 \
       fuseki-server --port=3030 --mem=/dataset
   Endpoints:
     - GET  /dataset/query
     - POST /dataset/update
     - GET/POST /dataset/data

5 Source and Snapshots
   GitHub:
     https://github.com/apache/jena/tree/main/jena-fuseki2
   Maven Snapshots:
     https://repository.apache.org/snapshots/org/apache/jena/jena-fuseki-main/X.Y.Z-SNAPSHOT/

## Supplementary Details
Parameter values:
- version: replace X.Y.Z with specific release (e.g., 5.3.0)
- Java system property: -Djena.fuseki.log=detail for verbose logging
- Default port: 3030
- Memory dataset path: /dataset

Configuration file fuski.ttl options:
- service class: FusekiService
- dataset name: <name>
- dataset type: TDB2 or Mem
- security realm: shiro.ini path

Implementation steps:
1 Download binary
2 Extract to FUSEKI_HOME
3 Edit FUSEKI_HOME/config/fuseki.properties or fuseki.ttl
4 Run FUSEKI_HOME/bin/fuseki-server --config=config/fuseki.ttl
5 Access UI at http://localhost:3030


## Reference Details
CLI Usage
1. Standalone server
   FUSEKI_HOME/bin/fuseki-server --port=3030 --mem=/myds --update
   Options:
     --port=<integer>     Default 3030
     --mem=<name>         In-memory dataset
     --tdb2=<directory>   TDB2-backed dataset
     --config=<file>      Fuseki configuration TTL
     --update             Enable SPARQL Update
     --localhost          Bind only to localhost

2. Docker commands
   docker run --name fuseki -p 3030:3030 apache/jena-fuseki:5.3.0 fuseki-server \
     --port=3030 --mem=/ds --update --localhost

HTTP Endpoints
- SPARQL Query
   GET  /<dataset>/query  Content-Type: application/sparql-query  Result: SPARQL XML/Turtle/JSON
   POST /<dataset>/query  Body: SPARQL query  Headers: Content-Type: application/sparql-query
- SPARQL Update
   POST /<dataset>/update Content-Type: application/sparql-update
- Graph Store Protocol
   GET    /<dataset>/data?default  Accept: application/n-triples
   POST   /<dataset>/data?default  Content-Type: text/turtle
   PUT    /<dataset>/data?default  Content-Type: text/turtle
   DELETE /<dataset>/data?default

Maven Coordinates
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-main</artifactId>
  <version>5.3.0</version>
</dependency>
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-ui</artifactId>
  <version>5.3.0</version>
</dependency>

Best Practices
- Run with explicit config TTL rather than defaults
- Use TDB2 for production (tdb2=/path/to/db)
- Secure endpoints via Apache Shiro:
  shiro.ini with
    [users]
      admin=secret,admin
    [roles]
      admin=*

Troubleshooting
- Inspect logs at FUSEKI_HOME/logs/fuseki.log
- Enable debug: -Dlog4j.configuration=file:log4j2-debug.xml
- Check port conflicts: lsof -i:3030
- Verify Java version: java -version


## Information Dense Extract
groupId:org.apache.jena;artifactIds:jena-fuseki-main,jena-fuseki-ui;version:5.3.0;java:17+;servlet:6.0;binary:apache-jena-fuseki-5.3.0.tar.gz/.zip;war:jena-fuseki-5.3.0.war;CLI:fuseki-server--port=3030--mem=/ds--update--localhost;Docker:apache/jena-fuseki:5.3.0 docker run -p3030:3030;Endpoints:GET/POST /<ds>/query,POST /<ds>/update,GET/POST/PUT/DELETE /<ds>/data;Shiro:shiro.ini admin=secret;Logs:FUSEKI_HOME/logs/fuseki.log;Snapshot:repo.apache.org/snapshots;GitHub:jena-fuseki2 branch main

## Sanitised Extract
Table of Contents
1 Maven Dependencies
2 Binary Distributions
3 WAR Deployment Requirements
4 Docker Container Usage
5 Source and Snapshots

1 Maven Dependencies
   groupId: org.apache.jena
   modules:
     - jena-fuseki-main (core server)
     - jena-fuseki-ui   (web UI)
   version: X.Y.Z

2 Binary Distributions
   Files:
     - apache-jena-fuseki-5.3.0.tar.gz (SHA512, PGP)
     - apache-jena-fuseki-5.3.0.zip    (SHA512, PGP)
   Checksums and Signatures:
     - Each distribution includes .sha512 and .asc

3 WAR Deployment Requirements
   File: jena-fuseki-5.3.0.war
   Requires:
     - Java 17+
     - Jakarta Servlet API 6.0 compliant container (Apache Tomcat 10+)
   Deployment steps:
     1 Copy WAR to webapps directory
     2 Start container
     3 Service available at http://<host>:<port>/fuseki

4 Docker Container Usage
   Module: jena-fuseki-docker
   Build:
     docker build -t apache/jena-fuseki:5.3.0 .
   Run:
     docker run --name fuseki -p 3030:3030 apache/jena-fuseki:5.3.0 '
       fuseki-server --port=3030 --mem=/dataset
   Endpoints:
     - GET  /dataset/query
     - POST /dataset/update
     - GET/POST /dataset/data

5 Source and Snapshots
   GitHub:
     https://github.com/apache/jena/tree/main/jena-fuseki2
   Maven Snapshots:
     https://repository.apache.org/snapshots/org/apache/jena/jena-fuseki-main/X.Y.Z-SNAPSHOT/

## Original Source
Apache Jena Fuseki Documentation
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_SETUP

# Maven Dependencies

Dependency coordinates for embedded and UI modules:

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-main</artifactId>
   <version>X.Y.Z</version>
</dependency>

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-ui</artifactId>
   <version>X.Y.Z</version>
</dependency>

# Binary Distributions

- apache-jena-fuseki-5.3.0.tar.gz  SHA512    PGP Signature
- apache-jena-fuseki-5.3.0.zip     SHA512    PGP Signature
- jena-fuseki-5.3.0.war           SHA512    PGP Signature

Requirements:
- Java 17 or later
- For WAR: Jakarta Servlet API 6.0 (Jakarta EE 9) container (e.g., Tomcat 10.x+)

# Docker Container

Image artifact: jena-fuseki-docker
Build and run:

docker build -t apache/jena-fuseki:5.3.0 .
docker run --name fuseki -p 3030:3030 apache/jena-fuseki:5.3.0 fuseki-server --port=3030 --mem=/dataset

# Git and Snapshots

Official source tree (Fuseki2):
https://github.com/apache/jena/tree/main/jena-fuseki2

Snapshot repository:
https://repository.apache.org/snapshots/org/apache/jena/jena-fuseki-main/X.Y.Z-SNAPSHOT/


## Attribution
- Source: Apache Jena Fuseki Documentation
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License
- Crawl Date: 2025-04-26T22:47:58.108Z
- Data Size: 1486340 bytes
- Links Found: 3429

## Retrieved
2025-04-26

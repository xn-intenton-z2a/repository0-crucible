# FUSEKI_DISTRIBUTION

## Crawl Summary
Binary archives: apache-jena-fuseki-5.3.0.tar.gz, .zip, SHA512 checksums, PGP signatures. Maven artifacts jena-fuseki-main/ui/war/core/docker coordinates, Java17+, Servlet6.0. Verification commands: gpg key import, sha512sum, gpg --verify.

## Normalised Extract
Table of Contents
1  Binary Distribution Files and Verification
2  Maven Dependencies
3  Java & Servlet Requirements
4  Docker Container Module
5  Embedded Server Module

1  Binary Distribution Files and Verification
   Files:
     - apache-jena-fuseki-5.3.0.tar.gz   SHA512: 9f5e1f53a89...  Signature: apache-jena-fuseki-5.3.0.tar.gz.asc
     - apache-jena-fuseki-5.3.0.zip      SHA512: b4c8127d3ef...  Signature: apache-jena-fuseki-5.3.0.zip.asc
     - jena-fuseki-war-5.3.0.war         SHA512: 6d03f1e7c29...  Signature: jena-fuseki-war-5.3.0.war.asc
   Verification steps:
     1  gpg --keyserver keyserver.ubuntu.com --recv-keys 0x6C17F59FAC38FAB6
     2  sha512sum apache-jena-fuseki-5.3.0.tar.gz
     3  gpg --verify apache-jena-fuseki-5.3.0.tar.gz.asc apache-jena-fuseki-5.3.0.tar.gz

2  Maven Dependencies
   org.apache.jena:jena-fuseki-main:5.3.0
   org.apache.jena:jena-fuseki-ui:5.3.0
   org.apache.jena:jena-fuseki-war:5.3.0 (type: war)
   org.apache.jena:jena-fuseki-docker:5.3.0
   org.apache.jena:jena-fuseki-core:5.3.0

3  Java & Servlet Requirements
   - Java runtime >= 17
   - Jakarta Servlet 6.0 compatible container (e.g., Tomcat 10.x)

4  Docker Container Module
   Dependency: org.apache.jena:jena-fuseki-docker:5.3.0
   Build command: mvn package -Pdocker

5  Embedded Server Module
   API dependency: org.apache.jena:jena-fuseki-core:5.3.0
   Example instantiation:
     FusekiServer server = FusekiServer.create()
       .port(3030)
       .add("/ds", dataset)
       .build();
     server.start();

## Supplementary Details
Binary installation:
1  tar -xzf apache-jena-fuseki-5.3.0.tar.gz -C /opt/
2  export FUSEKI_HOME=/opt/apache-jena-fuseki-5.3.0
3  $FUSEKI_HOME/fuseki-server --port=3030 --config=$FUSEKI_HOME/configuration.ttl

WAR deployment:
1  Copy jena-fuseki-war-5.3.0.war to $TOMCAT_HOME/webapps/fuseki.war
2  Ensure Java17 is set: export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
3  Restart Tomcat

Docker deployment:
1  mvn clean package -Pdocker -f jena-fuseki-docker/pom.xml
2  docker run -d -p 3030:3030 apache/jena-fuseki:5.3.0

Embedded deployment in Java application:
1  Include jena-fuseki-core and jena-fuseki-main dependencies
2  Create Dataset ds = DatasetFactory.createTxnMem();
3  FusekiServer server = FusekiServer.create().port(3030).add("/dataset", ds).build();
4  server.start();

## Reference Details
Maven coordinates:
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>jena-fuseki-main</artifactId>
  <version>5.3.0</version>
</dependency>

Embedded API:
Class: org.apache.jena.fuseki.main.FusekiServer
Methods:
- static FusekiServer.Builder create()
- Builder port(int port)
- Builder add(String endpointPath, Dataset dataset)
- FusekiServer build()
- void start()
- void stop()

Configuration TTL keys:
:service1 a fuseki:Service; fuseki:name "ds"; fuseki:datastore :tdbDataset;
  fuseki:serviceQuery "query"; fuseki:serviceUpdate "update"; fuseki:serviceReadGraphStore "get";
  fuseki:serviceWriteGraphStore "post".

Best Practices:
- Run Fuseki under a dedicated user account
- Limit thread pool: --jettyThreads=50
- Enable Shiro security in configuration.ttl
detailed troubleshooting:
- Port in use: netstat -tulpn | grep 3030
- Check $FUSEKI_HOME/logs/fuseki.log for stack traces
- Enable DEBUG: --log=DEBUG
- Java Heap tuning: export JVM_ARGS="-Xms2G -Xmx4G"


## Information Dense Extract
Binary: apache-jena-fuseki-5.3.0.{tar.gz,zip}, jena-fuseki-war-5.3.0.war; SHA512 sums; PGP sig verify: gpg --verify + sha512sum. Maven: jena-fuseki-main/ui/war/core/docker:5.3.0. Java>=17; Servlet6.0 (Tomcat10+). Install: tar -xzf; $FUSEKI_HOME/fuseki-server --port=3030 --config=configuration.ttl. WAR: drop in Tomcat/webapps; ensure JAVA_HOME points to Java17. Docker: mvn -Pdocker; docker run -d -p3030:3030 apache/jena-fuseki:5.3.0. Embedded API: FusekiServer.create().port(3030).add("/ds",Dataset).build().start(). Config TTL sample service block. JVM tuning: -Xms2G -Xmx4G; Jetty threads: --jettyThreads=50; enable Shiro for auth; logs in $FUSEKI_HOME/logs; debug with --log=DEBUG; troubleshoot port with netstat; check fuseki.log for errors.

## Sanitised Extract
Table of Contents
1  Binary Distribution Files and Verification
2  Maven Dependencies
3  Java & Servlet Requirements
4  Docker Container Module
5  Embedded Server Module

1  Binary Distribution Files and Verification
   Files:
     - apache-jena-fuseki-5.3.0.tar.gz   SHA512: 9f5e1f53a89...  Signature: apache-jena-fuseki-5.3.0.tar.gz.asc
     - apache-jena-fuseki-5.3.0.zip      SHA512: b4c8127d3ef...  Signature: apache-jena-fuseki-5.3.0.zip.asc
     - jena-fuseki-war-5.3.0.war         SHA512: 6d03f1e7c29...  Signature: jena-fuseki-war-5.3.0.war.asc
   Verification steps:
     1  gpg --keyserver keyserver.ubuntu.com --recv-keys 0x6C17F59FAC38FAB6
     2  sha512sum apache-jena-fuseki-5.3.0.tar.gz
     3  gpg --verify apache-jena-fuseki-5.3.0.tar.gz.asc apache-jena-fuseki-5.3.0.tar.gz

2  Maven Dependencies
   org.apache.jena:jena-fuseki-main:5.3.0
   org.apache.jena:jena-fuseki-ui:5.3.0
   org.apache.jena:jena-fuseki-war:5.3.0 (type: war)
   org.apache.jena:jena-fuseki-docker:5.3.0
   org.apache.jena:jena-fuseki-core:5.3.0

3  Java & Servlet Requirements
   - Java runtime >= 17
   - Jakarta Servlet 6.0 compatible container (e.g., Tomcat 10.x)

4  Docker Container Module
   Dependency: org.apache.jena:jena-fuseki-docker:5.3.0
   Build command: mvn package -Pdocker

5  Embedded Server Module
   API dependency: org.apache.jena:jena-fuseki-core:5.3.0
   Example instantiation:
     FusekiServer server = FusekiServer.create()
       .port(3030)
       .add('/ds', dataset)
       .build();
     server.start();

## Original Source
Apache Jena Fuseki Documentation
https://jena.apache.org/documentation/fuseki2/

## Digest of FUSEKI_DISTRIBUTION

# Apache Jena Fuseki Distribution and Deployment (Retrieved: 2024-06-XX)

## Binary Distributions

Filename                         | SHA512                                                                               | Signature (PGP)
---------------------------------|--------------------------------------------------------------------------------------|----------------
apache-jena-fuseki-5.3.0.tar.gz   | 9f5e1f53a89...<rest of SHA512 hash>                                   | apache-jena-fuseki-5.3.0.tar.gz.asc
apache-jena-fuseki-5.3.0.zip      | b4c8127d3ef...<rest of SHA512 hash>                                   | apache-jena-fuseki-5.3.0.zip.asc
jena-fuseki-war-5.3.0.war         | 6d03f1e7c29...<rest of SHA512 hash>                                   | jena-fuseki-war-5.3.0.war.asc

## Maven Artifacts

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

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-war</artifactId>
   <version>5.3.0</version>
   <type>war</type>
</dependency>

## Java and Servlet Requirements

- Java 17 or later
- Jakarta Servlet API 6.0 (requires Servlet container such as Apache Tomcat 10.x)

## Docker Module

Maven coordinates for Docker container build:

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-docker</artifactId>
   <version>5.3.0</version>
</dependency>

## Embedded SPARQL Server Dependency

<dependency>
   <groupId>org.apache.jena</groupId>
   <artifactId>jena-fuseki-core</artifactId>
   <version>5.3.0</version>
</dependency>

## PGP Verification

1. Import key:  gpg --recv-keys 0x6C17F59FAC38FAB6
2. Verify checksum: sha512sum apache-jena-fuseki-5.3.0.tar.gz
3. Verify signature: gpg --verify apache-jena-fuseki-5.3.0.tar.gz.asc

## Attribution
- Source: Apache Jena Fuseki Documentation
- URL: https://jena.apache.org/documentation/fuseki2/
- License: License
- Crawl Date: 2025-04-27T02:23:25.479Z
- Data Size: 1539607 bytes
- Links Found: 3533

## Retrieved
2025-04-27

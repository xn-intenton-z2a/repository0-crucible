# ROBOT_TOOL

## Crawl Summary
- Maven build commands: mvn clean package produces bin/robot.jar; additional mvn targets: clean test, clean verify, site.
- Docker: build with docker build --tag robot:latest .; run commands via docker run --rm robot [args].
- Code style enforced via fmt-maven-plugin v2.10 using google-java-format
- Command classes implement interface Command with main(String[] args); entry via CommandLineInterface; shared options parsed by CommandLineHelper.
- Operations in org.obolibrary.robot.operation are static methods returning OWLOntology or Set<IRI>, with no IO.
- IOHelper provides loadOntology(Path, OWLOntologyManager), saveOntology(OWLOntology, Path, OWLDocumentFormat), parseTermList(String) and loadTermList(Path).
- Term lists: space-separated IRIs/CURIEs; lines with # at start or after whitespace ignored.

## Normalised Extract
Table of Contents:
1 Build Configuration
2 Command Implementation
3 Operation Patterns
4 Helper Class Usage
5 Term List Parsing

1 Build Configuration
Use Maven 3.6+ and Java 11+:
- mvn clean package            produces bin/robot.jar
- mvn clean test               JUnit tests, surefire-reports
- mvn clean verify             integration tests, failsafe-reports
- mvn site                     generates Javadoc in target/site
Use Docker:
- docker build --tag robot:latest .
- docker run --rm robot --help

2 Command Implementation
Commands implement org.obolibrary.robot.Command:
- Signature: void main(String[] args)
Entry point: org.obolibrary.robot.CommandLineInterface.parse(args)
Shared options:
- --input <file>     Path to ontology input
- --prefix <file>    Prefix file for CURIE expansion
- --output <file>    Path to ontology output
Use CommandLineHelper:
- CommandLine cmd = CommandLineHelper.create(commandName, args)
- Path in = CommandLineHelper.getOptionPath(cmd, "input");
- String pf = CommandLineHelper.getOptionValue(cmd, "prefix");
- CommandLineHelper.checkRequired(cmd, List.of("input","output"));

3 Operation Patterns
Operations reside in org.obolibrary.robot.operation:
- static OWLOntology merge(OWLOntology a, OWLOntology b)
- static Set<IRI> enrich(OWLOntology ontology, Set<IRI> terms)
All operations avoid IO or CLI; they accept in-memory OWLOntology and return results.

4 Helper Class Usage
CommandLineHelper:
- create(String commandName, String[] args) throws ParseException
- getOptionPath(CommandLine, String) throws IllegalArgumentException
- getOptionValue(CommandLine, String) throws IllegalArgumentException
- isFlagSet(CommandLine, String)

IOHelper:
- loadOntology(Path, OWLOntologyManager) returns OWLOntology throws OWLOntologyCreationException
- saveOntology(OWLOntology, Path, OWLDocumentFormat) throws OWLOntologyStorageException
- parseTermList(String) returns Set<IRI>
- loadTermList(Path) throws IOException

5 Term List Parsing
- parseTermList accepts a space-separated string of IRIs or CURIEs; returns Set<IRI>
- loadTermList reads a file; ignores lines where # starts or follows whitespace; returns Set<IRI>

## Supplementary Details
pom.xml plugin configuration:
<plugin>
  <groupId>com.coveo</groupId>
  <artifactId>fmt-maven-plugin</artifactId>
  <version>2.10</version>
  <configuration>
    <style>GOOGLE</style>
  </configuration>
</plugin>

Implementation steps:
1 Install Java 11+, Maven 3.6+
2 Clone repository
3 mvn clean package
4 java -jar bin/robot.jar --help

Default JVM options:
- Xmx2G recommended; increase via -J-Xmx4G for large ontologies

Dependencies:
- OWLAPI 5.1.19 on classpath

Module structure:
- robot-core: operations and utilities
- robot-command: CLI commands
- robot-maven-plugin: integrates into Maven lifecycle
- robot-mock-plugin: testing helpers
- util: shared utilities


## Reference Details
Interface Command
Signature:
  void main(String[] args)

Class CommandLineHelper
Methods:
  static CommandLine create(String commandName, String[] args) throws org.apache.commons.cli.ParseException
  static Path getOptionPath(CommandLine cmd, String option) throws IllegalArgumentException
  static String getOptionValue(CommandLine cmd, String option) throws IllegalArgumentException
  static boolean isFlagSet(CommandLine cmd, String flag)
  static void checkRequired(CommandLine cmd, List<String> options) throws IllegalArgumentException

Class IOHelper
Methods:
  static OWLOntology loadOntology(Path path, OWLOntologyManager manager)
    throws IOException, OWLOntologyCreationException
  static void saveOntology(OWLOntology ontology, Path path, OWLDocumentFormat format)
    throws IOException, OWLOntologyStorageException
  static Set<IRI> parseTermList(String termList)
  static Set<IRI> loadTermList(Path file) throws IOException

Operations examples:
Class MergeOperation
  static OWLOntology merge(OWLOntology source, OWLOntology target)
    throws OperationException

Command example:
public class MergeCommand implements Command {
  public static final String NAME = "merge";
  public static void main(String[] args) {
    CommandLine cmd = CommandLineHelper.create(NAME, args);
    Path inputA = CommandLineHelper.getOptionPath(cmd, "input");
    Path inputB = CommandLineHelper.getOptionPath(cmd, "input");
    Path output = CommandLineHelper.getOptionPath(cmd, "output");
    OWLOntology a = IOHelper.loadOntology(inputA, null);
    OWLOntology b = IOHelper.loadOntology(inputB, null);
    OWLOntology merged = MergeOperation.merge(a, b);
    IOHelper.saveOntology(merged, output, new OWLXMLOntologyFormat());
  }
}

Best practice:
Always validate before merging:
  robot validate --input ontology.owl
Expected output: "Validation passed: 0 errors"

Troubleshooting:
1 OWLOntologyCreationException: run "robot validate --input file.owl" and fix reported syntax errors
2 OutOfMemoryError: rebuild with increased heap
   mvn exec:java -Dexec.args="-J-Xmx4G merge --input a.owl --input b.owl --output c.owl"
3 CLI parse errors: missing required option
   CommandLineHelper.checkRequired throws IllegalArgumentException listing missing options


## Information Dense Extract
Maven: mvn clean package→bin/robot.jar; mvn clean test, verify, site. Docker: docker build --tag robot:latest .; docker run --rm robot --help. Commands: implement org.obolibrary.robot.Command main(String[] args); parse with CommandLineHelper.create, getOptionPath, getOptionValue, isFlagSet, checkRequired. IO via IOHelper.loadOntology(Path,Manager), saveOntology(OWLOntology,Path,Format), parseTermList(String), loadTermList(Path). Operations: static methods in org.obolibrary.robot.operation e.g. merge(OWLOntology,OWLOntology). Term lists: space-separated IRIs/CURIEs; lines with # at start or after whitespace ignored. Code style: fmt-maven-plugin v2.10 style=GOOGLE. Java 11+, OWLAPI 5.1.19. Troubleshoot: robot validate for syntax; increase -Xmx via -J; check CLI exceptions for missing options.

## Sanitised Extract
Table of Contents:
1 Build Configuration
2 Command Implementation
3 Operation Patterns
4 Helper Class Usage
5 Term List Parsing

1 Build Configuration
Use Maven 3.6+ and Java 11+:
- mvn clean package            produces bin/robot.jar
- mvn clean test               JUnit tests, surefire-reports
- mvn clean verify             integration tests, failsafe-reports
- mvn site                     generates Javadoc in target/site
Use Docker:
- docker build --tag robot:latest .
- docker run --rm robot --help

2 Command Implementation
Commands implement org.obolibrary.robot.Command:
- Signature: void main(String[] args)
Entry point: org.obolibrary.robot.CommandLineInterface.parse(args)
Shared options:
- --input <file>     Path to ontology input
- --prefix <file>    Prefix file for CURIE expansion
- --output <file>    Path to ontology output
Use CommandLineHelper:
- CommandLine cmd = CommandLineHelper.create(commandName, args)
- Path in = CommandLineHelper.getOptionPath(cmd, 'input');
- String pf = CommandLineHelper.getOptionValue(cmd, 'prefix');
- CommandLineHelper.checkRequired(cmd, List.of('input','output'));

3 Operation Patterns
Operations reside in org.obolibrary.robot.operation:
- static OWLOntology merge(OWLOntology a, OWLOntology b)
- static Set<IRI> enrich(OWLOntology ontology, Set<IRI> terms)
All operations avoid IO or CLI; they accept in-memory OWLOntology and return results.

4 Helper Class Usage
CommandLineHelper:
- create(String commandName, String[] args) throws ParseException
- getOptionPath(CommandLine, String) throws IllegalArgumentException
- getOptionValue(CommandLine, String) throws IllegalArgumentException
- isFlagSet(CommandLine, String)

IOHelper:
- loadOntology(Path, OWLOntologyManager) returns OWLOntology throws OWLOntologyCreationException
- saveOntology(OWLOntology, Path, OWLDocumentFormat) throws OWLOntologyStorageException
- parseTermList(String) returns Set<IRI>
- loadTermList(Path) throws IOException

5 Term List Parsing
- parseTermList accepts a space-separated string of IRIs or CURIEs; returns Set<IRI>
- loadTermList reads a file; ignores lines where # starts or follows whitespace; returns Set<IRI>

## Original Source
ROBOT: Release OWL Ontology Builder
https://github.com/ontodev/robot#readme

## Digest of ROBOT_TOOL

# Build and Packaging
retrieved: 2024-06-01

## Maven Build
Command: mvn clean package
Output: bin/robot.jar
Additional targets:
- mvn clean test        (JUnit tests, reports in [module]/target/surefire-reports)
- mvn clean verify      (integration tests, reports in [module]/target/failsafe-reports)
- mvn site              (Javadoc in target/site and [module]/target/site)

## Docker Build
Commands:
- docker build --tag robot:latest .
- docker run --rm robot --help

# Code Style
Plugin: fmt-maven-plugin version 2.10
Configuration in pom.xml:
<plugin>
  <groupId>com.coveo</groupId>
  <artifactId>fmt-maven-plugin</artifactId>
  <version>2.10</version>
  <configuration>
    <style>GOOGLE</style>
  </configuration>
</plugin>

# Command Infrastructure
Interface: org.obolibrary.robot.Command
Required method: void main(String[] args)
Entry point: org.obolibrary.robot.CommandLineInterface
Shared CLI options: --input <file>  --prefix <file>  --output <file>

# Operations
Package: org.obolibrary.robot.operation
All methods static; must not perform IO or CLI code; return types include OWLOntology, Set<IRI>

# Helper Classes
org.obolibrary.robot.CommandLineHelper: methods to parse and validate CLI options
org.obolibrary.robot.IOHelper: methods to load and save ontologies and term lists

# Term List Format
Space-separated IRIs or CURIEs; lines starting or preceded by whitespace with # are comments; # inside an IRI is literal


## Attribution
- Source: ROBOT: Release OWL Ontology Builder
- URL: https://github.com/ontodev/robot#readme
- License: License if known
- Crawl Date: 2025-04-29T13:54:04.259Z
- Data Size: 490177 bytes
- Links Found: 3993

## Retrieved
2025-04-29

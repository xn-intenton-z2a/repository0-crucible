# ROBOT

## Crawl Summary
ROBOT CLI/library for automating ontology workflows. Build: mvn clean package→bin/robot.jar; test: mvn clean test→surefire-reports; verify: mvn clean verify→failsafe-reports; site: mvn site→Javadoc. Docker: docker build --tag robot:latest ., docker run --rm robot --help. Code style: Google Java Style via fmt-maven-plugin (style=GOOGLE). Commands implement public static void main(String[] args), use CommandLineHelper for --input, --prefix, --output; IO via IOHelper.loadOntology(File,OWLDocumentFormat)->OWLOntology, saveOntology(OWLOntology,File,OWLDocumentFormat). Operations: static methods without IO/CLI. CommandLineInterface dispatches commands. Term lists: space-separated IRIs/CURIEs; comments begin with "#" at line start or after whitespace.

## Normalised Extract
Table of Contents
1. Installation and Prerequisites
2. Build Lifecycle Commands
3. Docker Container Usage
4. Enforcing Code Style
5. Architecture: Commands vs Operations
6. Shared CLI Options
7. Term List Parsing

1. Installation and Prerequisites
- Install Maven 3.6+ and JDK 1.8+
- Clone repository; run 'mvn clean package'
- Generated jar: 'bin/robot.jar'

2. Build Lifecycle Commands
- mvn clean package         → builds jar
- mvn clean test            → runs JUnit tests; reports in [module]/target/surefire-reports
- mvn clean verify          → runs integration tests; reports in [module]/target/failsafe-reports
- mvn site                  → generates Javadoc in target/site and [module]/target/site

3. Docker Container Usage
- docker build --tag robot:latest .
- docker run --rm robot --help
- To run command: docker run --rm robot <command> [--input input.owl] [--output out.owl]

4. Enforcing Code Style
Add to pom.xml:
  <plugin>
    <groupId>com.coveo</groupId>
    <artifactId>fmt-maven-plugin</artifactId>
    <version>2.10</version>
    <configuration><style>GOOGLE</style></configuration>
    <executions><execution><goals><goal>format</goal></goals></execution></executions>
  </plugin>

5. Architecture: Commands vs Operations
Commands:
  - Interface: main(String[] args)
  - Sequence: parse args → load IO → call Operation → save IO
Operations:
  - Static methods
  - OWL API interactions
  - No IO/CLI

6. Shared CLI Options
Options and parsing via CommandLineHelper:
  --input <file>       → File getInputFile(CommandLine)
  --prefix <file>      → Map<String,IRI> loadPrefixes(File)
  --output <file>      → File getOutputFile(CommandLine)
  --format <format>    → DocumentFormat getFormat(CommandLine)

7. Term List Parsing
Methods in IOHelper:
  Set<IRI> parseTermList(String content)
  Set<IRI> parseTermList(File file)
Rules:
  - Space-separated IRIs/CURIEs
  - Line-level comments start with '#' at line start or after whitespace
  - '#' inside IRI not treated as comment

## Supplementary Details
Prerequisites
- Java 1.8+ installed
- Maven 3.6+ in PATH

Maven Plugin Configurations
- fmt-maven-plugin version 2.10
- google-java-format version 1.7

Dockerfile Example
FROM openjdk:8-jdk-alpine
COPY target/robot.jar /opt/robot/robot.jar
ENTRYPOINT ["java","-jar","/opt/robot/robot.jar"]

Jenkinsfile Example
pipeline {
  agent any
  stages {
    stage('Build') { steps { sh 'mvn clean package' } }
    stage('Test')  { steps { sh 'mvn clean test' } }
    stage('Verify'){ steps { sh 'mvn clean verify' } }
    stage('Deploy'){ steps { sh 'docker build --tag robot:latest .' } }
  }
}

Logging and Verbosity
- Use '-v' or '-vv' flags on CLI commands for verbose output
- For debugging: mvn clean verify -X

CI Integration
- surefire reports: use JUnit publisher in CI
- failsafe reports: integration-test publisher

## Reference Details
Interface: Command
public interface Command {
  /**
   * Entry point for command implementation.
   * @param args CLI arguments
   */
  void main(String[] args);
}

Class: CommandLineInterface
public class CommandLineInterface {
  public static void main(String[] args) throws Exception {
    String name = args[0];
    Command cmd = commandMap.get(name);
    cmd.main(Arrays.copyOfRange(args,1,args.length));
  }
}

Class: CommandLineHelper
public class CommandLineHelper {
  public static Options createOptions() {
    Options opts = new Options();
    opts.addOption("i","input",true,"Input file path");
    opts.addOption("p","prefix",true,"Prefix file path");
    opts.addOption("o","output",true,"Output file path");
    opts.addOption(null,"format",true,"Output format (owl, rdfxml, ttl)");
    return opts;
  }
  public static CommandLine parse(String[] args) throws ParseException {
    DefaultParser parser = new DefaultParser();
    return parser.parse(createOptions(), args);
  }
  public static File getInputFile(CommandLine cmd) {
    return new File(cmd.getOptionValue("input"));
  }
  public static File getOutputFile(CommandLine cmd) {
    return Optional.ofNullable(cmd.getOptionValue("output")).map(File::new).orElse(null);
  }
  public static Map<String,IRI> loadPrefixes(File file) throws IOException, OWLOntologyCreationException {
    return PrefixDocumentFormatFactory.loadPrefixes(file);
  }
}

Class: IOHelper
public class IOHelper {
  public static OWLOntology loadOntology(File file, OWLDocumentFormat fmt)
      throws OWLOntologyCreationException {
    OWLOntologyManager m = OWLManager.createOWLOntologyManager();
    return m.loadOntologyFromOntologyDocument(new StreamDocumentSource(new FileInputStream(file)));
  }
  public static void saveOntology(OWLOntology o, File file, OWLDocumentFormat fmt)
      throws OWLOntologyStorageException, IOException {
    try (FileOutputStream out = new FileOutputStream(file)) {
      o.getOWLOntologyManager().saveOntology(o, fmt, out);
    }
  }
  public static Set<IRI> parseTermList(String content) {
    return Arrays.stream(content.split("\\s+"))
      .filter(token->!token.startsWith("#"))
      .map(IRI::create)
      .collect(Collectors.toSet());
  }
  public static Set<IRI> parseTermList(File file) throws IOException {
    String content = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
    return parseTermList(content);
  }
}

Example: ConvertCommand pattern
public class ConvertCommand implements Command {
  public void main(String[] args) {
    try {
      CommandLine cmd = CommandLineHelper.parse(args);
      File in = CommandLineHelper.getInputFile(cmd);
      File out = CommandLineHelper.getOutputFile(cmd);
      String fmt = cmd.getOptionValue("format");
      OWLOntology o = IOHelper.loadOntology(in, new RDFXMLDocumentFormat());
      OWLOntology o2 = ConvertOperation.convert(o, fmt);
      IOHelper.saveOntology(o2, out, new OWLXMLDocumentFormat());
    } catch (Exception e) {
      e.printStackTrace();
      System.exit(1);
    }
  }
}

Best Practices
- Keep Operations pure: no IO/CLI
- Use CommandLineHelper for argument parsing
- Use IOHelper for all ontology and term-list reads/writes
- Enforce code style via CI

Troubleshooting
- To debug CLI args: add '-v' for verbose; '-vv' for debug-level
- Failsafe integration test failure logs: target/*failsafe-reports/*.txt
- Maven debug: mvn clean verify -X
- Docker image rebuild: docker build --no-cache --tag robot:latest .

## Information Dense Extract
mvn clean package→bin/robot.jar; mvn clean test→surefire-reports; mvn clean verify→failsafe-reports; mvn site→Javadoc. docker build --tag robot:latest .; docker run --rm robot <cmd> [--input file] [--prefix file] [--output file] [--format fmt]. fmt-maven-plugin 2.10 style=GOOGLE injects google-java-format. Commands: main(String[] args)→CommandLineHelper.parse→getInputFile/OutputFile/prefixes→IOHelper.loadOntology(File,OWLDocumentFormat)→Operation.staticMethod→IOHelper.saveOntology. IOHelper.parseTermList(String|File) splits on whitespace, ignores tokens starting with '#'. CommandLineInterface dispatches first arg to commandMap. Dockerfile: FROM openjdk:8-jdk-alpine; ENTRYPOINT ["java","-jar","/opt/robot/robot.jar"]. Troubleshoot: mvn clean verify -X, inspect target/*failsafe-reports/*.txt

## Sanitised Extract
Table of Contents
1. Installation and Prerequisites
2. Build Lifecycle Commands
3. Docker Container Usage
4. Enforcing Code Style
5. Architecture: Commands vs Operations
6. Shared CLI Options
7. Term List Parsing

1. Installation and Prerequisites
- Install Maven 3.6+ and JDK 1.8+
- Clone repository; run 'mvn clean package'
- Generated jar: 'bin/robot.jar'

2. Build Lifecycle Commands
- mvn clean package          builds jar
- mvn clean test             runs JUnit tests; reports in [module]/target/surefire-reports
- mvn clean verify           runs integration tests; reports in [module]/target/failsafe-reports
- mvn site                   generates Javadoc in target/site and [module]/target/site

3. Docker Container Usage
- docker build --tag robot:latest .
- docker run --rm robot --help
- To run command: docker run --rm robot <command> [--input input.owl] [--output out.owl]

4. Enforcing Code Style
Add to pom.xml:
  <plugin>
    <groupId>com.coveo</groupId>
    <artifactId>fmt-maven-plugin</artifactId>
    <version>2.10</version>
    <configuration><style>GOOGLE</style></configuration>
    <executions><execution><goals><goal>format</goal></goals></execution></executions>
  </plugin>

5. Architecture: Commands vs Operations
Commands:
  - Interface: main(String[] args)
  - Sequence: parse args  load IO  call Operation  save IO
Operations:
  - Static methods
  - OWL API interactions
  - No IO/CLI

6. Shared CLI Options
Options and parsing via CommandLineHelper:
  --input <file>        File getInputFile(CommandLine)
  --prefix <file>       Map<String,IRI> loadPrefixes(File)
  --output <file>       File getOutputFile(CommandLine)
  --format <format>     DocumentFormat getFormat(CommandLine)

7. Term List Parsing
Methods in IOHelper:
  Set<IRI> parseTermList(String content)
  Set<IRI> parseTermList(File file)
Rules:
  - Space-separated IRIs/CURIEs
  - Line-level comments start with '#' at line start or after whitespace
  - '#' inside IRI not treated as comment

## Original Source
ROBOT: Release OWL Ontology Builder
https://github.com/ontodev/robot#readme

## Digest of ROBOT

# Installation

Self-contained Jar generation:

  mvn clean package

Outputs:
  bin/robot.jar

Dependencies:
  Maven 3.6+ (CLI: mvn)
  JDK 1.8+

# Build Options

mvn clean test
  Runs JUnit tests. Reports:
    [module]/target/surefire-reports

mvn clean verify
  Rebuilds and runs integration tests. Reports:
    [module]/target/failsafe-reports

mvn site
  Generates Javadoc in:
    target/site
    [module]/target/site

# Docker Usage

Build image:

  docker build --tag robot:latest .

Run containerized ROBOT:

  docker run --rm robot --help

# Code Style

Google Java Style enforced via fmt-maven-plugin and google-java-format.

Pom.xml snippet:

  <plugin>
    <groupId>com.coveo</groupId>
    <artifactId>fmt-maven-plugin</artifactId>
    <version>2.10</version>
    <configuration>
      <style>GOOGLE</style>
    </configuration>
    <executions>
      <execution>
        <goals>
          <goal>format</goal>
        </goals>
      </execution>
    </executions>
  </plugin>

# Design

Operations vs Commands:

  Commands:
    - Implement public static void main(String[] args)
    - Handle CLI parsing, IO tasks
    - Invoked by CommandLineInterface or directly by name
    - Use CommandLineHelper for options (--input, --prefix, --output, etc.)
    - Use IOHelper for ontology and term-list I/O

  Operations:
    - Static methods
    - Manipulate OWL ontologies
    - No IO or CLI code
    - Located in robot-core module

Command dispatch:

  Class: org.obolibrary.robot.CommandLineInterface
    public static void main(String[] args)
    Hard-coded list of Commands:
      ConvertCommand, MergeCommand, ReasonCommand, etc.
    Dispatch logic:
      parse first argument as command name; invoke associated main

# Term List Format

IOHelper term-list parsing:

  Input sources:
    - String (space-separated IRIs/CURIEs)
    - File (lines of IRIs/CURIEs)

  Rules:
    - Items separated by whitespace
    - "#" at start of line or preceded by whitespace begins comment to EOL
    - "#" inside an IRI is not a comment delimiter

# Metadata

Date Retrieved: 2024-06-15
Source Size: 573245 bytes
Links Found: 4769

## Attribution
- Source: ROBOT: Release OWL Ontology Builder
- URL: https://github.com/ontodev/robot#readme
- License: License if known
- Crawl Date: 2025-04-29T11:48:59.172Z
- Data Size: 573245 bytes
- Links Found: 4769

## Retrieved
2025-04-29

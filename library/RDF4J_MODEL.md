# RDF4J_MODEL

## Crawl Summary
Model interface extends Set<Statement> with add, remove, filter methods. Value factory methods: iri, literal(type or lang), bnode. ModelBuilder fluent API: setNamespace, subject, add overloads, build. Rio parser/writer: Rio.write(model, out, format), Rio.parse(in, baseURI, format). Supported formats: RDFXML, TURTLE, NTRIPLES, JSON-LD. Core model implementations: TreeModel, DynamicModel, LinkedHashModel. Blank nodes via Values.bnode().

## Normalised Extract
Table of Contents
1. Value Factory
2. Model Implementations
3. ModelBuilder
4. Rio Parser/Writer
5. Blank Nodes

1. Value Factory
   IRI subject = Values.iri(namespace, localName)
   Literal simple = Values.literal(label)
   Literal typed = Values.literal(label, XSD.DATATYPE)
   Literal langged = Values.literal(label, languageTag)
   BNode bnode = Values.bnode()
2. Model Implementations
   Model model = new TreeModel() // or DynamicModel, LinkedHashModel
   model.add(subject, predicate, object)
   model.remove(subject, predicate, object)
   model.filter(subject, predicate, object) returns Model
   model.forEach(statementConsumer)
3. ModelBuilder
   ModelBuilder builder = new ModelBuilder()
   builder.setNamespace(prefix, namespace)
          .subject(prefixedSubject)
          .add(prefixedPredicate, objectValue)
   Model model = builder.build()
4. Rio Parser/Writer
   Rio.write(model, OutputStream, RDFFormat.TURTLE)
   Rio.parse(InputStream, baseURI, RDFFormat.RDFXML) returns Model
5. Blank Nodes
   BNode anon = Values.bnode()
   builder.subject(mainResource)
          .add(prefixedPredicate, anon)
          .subject(anon)
          .add(prefixedProperty, value)


## Supplementary Details
Maven BOM configuration
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.eclipse.rdf4j</groupId>
      <artifactId>rdf4j-bom</artifactId>
      <version>5.1.3</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
Full storage dependency
<dependency>
  <groupId>org.eclipse.rdf4j</groupId>
  <artifactId>rdf4j-storage</artifactId>
  <type>pom</type>
</dependency>
Snapshot builds
<repository>
  <id>oss.sonatype.org-snapshot</id>
  <url>https://oss.sonatype.org/content/repositories/snapshots</url>
  <releases><enabled>false</enabled></releases>
  <snapshots><enabled>true</enabled></snapshots>
</repository>

Configuration options
- RDFFormat constants control parser/writer syntax
- Model implementations choose internal indexing and ordering
- Namespace prefixes via ModelBuilder.setNamespace

Implementation steps
1. Instantiate ModelBuilder or concrete Model
2. Create IRIs and Literals via Values
3. Add statements
4. Write or parse via Rio



## Reference Details
API Specifications

org.eclipse.rdf4j.model.Model (extends Set<Statement>)
Methods:
  boolean add(IRI subject, IRI predicate, Value object)
  boolean remove(Resource subject, IRI predicate, Value object)
  Model filter(Resource s, IRI p, Value o)
  void forEach(Consumer<Statement> consumer)

org.eclipse.rdf4j.model.util.ModelBuilder
Constructors:
  ModelBuilder()
Methods:
  ModelBuilder setNamespace(String prefix, String namespace)
  ModelBuilder subject(String prefixedName)
  ModelBuilder subject(IRI subjectIRI)
  ModelBuilder add(IRI predicate, Value object)
  ModelBuilder add(String prefixedPredicate, String objectLabel)
  ModelBuilder add(String prefixedPredicate, int objectValue)
  ModelBuilder add(String prefixedPredicate, LocalDate dateValue)
  Model build()

org.eclipse.rdf4j.model.Values
Methods:
  static IRI iri(String namespace, String localName)
  static Literal literal(String label)
  static Literal literal(String label, IRI datatype)
  static Literal literal(String label, String languageTag)
  static BNode bnode()

org.eclipse.rdf4j.rio.Rio
Methods:
  static void write(Model model, OutputStream out, RDFFormat format)
  static void write(Model model, Writer writer, RDFFormat format)
  static Model parse(InputStream in, String baseURI, RDFFormat format)
  static Model parse(Reader reader, String baseURI, RDFFormat format)

Code Examples

// Create model via builder
ModelBuilder builder = new ModelBuilder();
builder.setNamespace("ex", "http://example.org/")
       .subject("ex:Picasso")
       .add(RDF.TYPE, "ex:Artist")
       .add(FOAF.FIRST_NAME, "Pablo");
Model model = builder.build();

// Write as Turtle
try(OutputStream out = new FileOutputStream("output.ttl")){
  Rio.write(model, out, RDFFormat.TURTLE);
}

// Read from RDF/XML
Model parsed;
try(InputStream in = new FileInputStream("input.rdf")){
  parsed = Rio.parse(in, "", RDFFormat.RDFXML);
}

Best Practices
- Use ModelBuilder for small to medium construction, switch to direct Model for very large data
- Choose TreeModel for stable iteration order
- Always set namespace prefixes for readability
- Use typed and language-tagged literals via Values.literal overloads

Troubleshooting
Command: mvn dependency:tree
Expected: org.eclipse.rdf4j:rdf4j-bom:5.1.3
Fix missing BOM by adding dependencyManagement

Command: java -cp rdf4j-storage-5.1.3.jar org.eclipse.rdf4j.rio.RDFFormat
Expected: List of supported formats including TURTLE, RDFXML


## Information Dense Extract
Model: extends Set<Statement>; implementations: TreeModel, DynamicModel, LinkedHashModel. Methods: add(IRI,IRI,Value), remove(Resource,IRI,Value), filter(Resource,IRI,Value)->Model, forEach(Consumer). ModelBuilder: fluent API: setNamespace(prefix,ns), subject(prefixedName), add(predicate,Object) overloads for IRI, prefixedName with String, int, LocalDate; build()->Model. Values: iri(ns,local), literal(label), literal(label,datatypeIRI), literal(label,langTag), bnode(). Rio: write(Model,out/Writer,RDFFormat), parse(InputStream/Reader,baseURI,RDFFormat)->Model. Supported RDFFormat: RDFXML,TURTLE,NTRIPLES,NQUADS,TRIG,JSONLD. Maven BOM: org.eclipse.rdf4j:rdf4j-bom:5.1.3 type=pom scope=import; storage: rdf4j-storage:pom. Snapshot repo config. Practice: prefixed names, typed literals, blank nodes via bnode. Troubleshoot: mvn dependency:tree, check BOM; java classpath for Rio.RDFFormat outputs formats.

## Sanitised Extract
Table of Contents
1. Value Factory
2. Model Implementations
3. ModelBuilder
4. Rio Parser/Writer
5. Blank Nodes

1. Value Factory
   IRI subject = Values.iri(namespace, localName)
   Literal simple = Values.literal(label)
   Literal typed = Values.literal(label, XSD.DATATYPE)
   Literal langged = Values.literal(label, languageTag)
   BNode bnode = Values.bnode()
2. Model Implementations
   Model model = new TreeModel() // or DynamicModel, LinkedHashModel
   model.add(subject, predicate, object)
   model.remove(subject, predicate, object)
   model.filter(subject, predicate, object) returns Model
   model.forEach(statementConsumer)
3. ModelBuilder
   ModelBuilder builder = new ModelBuilder()
   builder.setNamespace(prefix, namespace)
          .subject(prefixedSubject)
          .add(prefixedPredicate, objectValue)
   Model model = builder.build()
4. Rio Parser/Writer
   Rio.write(model, OutputStream, RDFFormat.TURTLE)
   Rio.parse(InputStream, baseURI, RDFFormat.RDFXML) returns Model
5. Blank Nodes
   BNode anon = Values.bnode()
   builder.subject(mainResource)
          .add(prefixedPredicate, anon)
          .subject(anon)
          .add(prefixedProperty, value)

## Original Source
Triplestore & Persistence Engines: Apache Jena TDB2 & Eclipse RDF4J
https://rdf4j.org/documentation/

## Digest of RDF4J_MODEL

# RDF4J Model API and Rio Parsers

Retrieved: 2024-06-10
Source: https://rdf4j.org/documentation/
Data Size: 3188175 bytes, Links Found: 7635

## Model API Implementations

### Interfaces and Classes
- interface Model extends java.util.Set<Statement>
- TreeModel implements Model (ordered, optimized for iteration)
- DynamicModel implements Model (adaptive indexing)
- LinkedHashModel implements Model (insertion-ordered)

### Core Methods
- Model.add(IRI subject, IRI predicate, Value object)
- Model.remove(IRI subject, IRI predicate, Value object)
- Model.filter(IRI subject, IRI predicate, Value object) : Model
- Model.forEach(Consumer<Statement>)

## Value Factory

### Class: org.eclipse.rdf4j.model.Values

public static IRI iri(String namespace, String localName)
public static Literal literal(String label)
public static Literal literal(String label, IRI datatype)
public static Literal literal(String label, String languageTag)
public static BNode bnode()

## ModelBuilder

### Class: org.eclipse.rdf4j.model.util.ModelBuilder

ModelBuilder setNamespace(String prefix, String namespace)
ModelBuilder subject(String subjectIRI)
ModelBuilder add(IRI predicate, Value object)
ModelBuilder add(String predicatePrefixedName, String objectLabel)
ModelBuilder add(String predicatePrefixedName, int objectValue)
ModelBuilder add(String predicatePrefixedName, LocalDate dateValue)
Model build()

## Rio Parser and Writer

### Class: org.eclipse.rdf4j.rio.Rio

static void write(Model model, OutputStream out, RDFFormat format)
static void write(Model model, Writer writer, RDFFormat format)
static Model parse(InputStream in, String baseURI, RDFFormat format)
static Model parse(Reader reader, String baseURI, RDFFormat format)

Supported RDFFormat constants: RDFXML, TURTLE, NTRIPLES, NQUADS, TRIG, JSONLD

## Blank Nodes

- BNode address = Values.bnode();
- Link blank node via subject(address) in ModelBuilder



## Attribution
- Source: Triplestore & Persistence Engines: Apache Jena TDB2 & Eclipse RDF4J
- URL: https://rdf4j.org/documentation/
- License: License if known
- Crawl Date: 2025-04-29T10:52:17.367Z
- Data Size: 3188175 bytes
- Links Found: 7635

## Retrieved
2025-04-29

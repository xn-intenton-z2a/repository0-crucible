# RIO_API

## Crawl Summary
RDF4J Rio provides static methods in org.eclipse.rdf4j.rio.Rio for parsing and writing RDF models in various formats. Key methods include parse(InputStream, String, RDFFormat) returning a Model and write(Model, OutputStream, RDFFormat). The Model interface supports add, remove, filter, and iteration. ModelBuilder simplifies creating in-memory models using setNamespace, subject, add, and build. ValueFactory methods in Values class create IRI, Literal, and BNode instances. RDFFormat enum lists supported serialization formats.

## Normalised Extract
Table of Contents
 1. Rio Parsing
 2. Rio Writing
 3. Model API Usage
 4. ModelBuilder Workflow
 5. Value Creation
 6. RDFFormat Details

1. Rio Parsing
 Method: parse(InputStream in, String baseURI, RDFFormat format) → Model
 Method: parse(Reader reader, String baseURI, RDFFormat format) → Model
 Requirements: pass base URI for relative IRI resolution; supported formats per RDFFormat
 Example:
   InputStream in = new FileInputStream("data.ttl");
   Model model = Rio.parse(in, "http://example.org/", RDFFormat.TURTLE);

2. Rio Writing
 Method: write(Model model, OutputStream out, RDFFormat format)
 Method: write(Model model, Writer writer, RDFFormat format)
 Effect: serializes model to specified format; preserves contexts
 Example:
   Rio.write(model, System.out, RDFFormat.RDFXML);
   FileOutputStream fos = new FileOutputStream("out.rdf");
   Rio.write(model, fos, RDFFormat.NTRIPLES);

3. Model API Usage
 Interface: Model extends Set<Statement>
   add(Resource subj, IRI pred, Value obj, Resource... contexts)
   remove(Resource subj, IRI pred, Value obj, Resource... contexts)
   filter(Resource subj, IRI pred, Value obj) → Model
   forEach(Consumer<Statement>)
 Example:
   IRI s = vf.iri(ns, "Picasso");
   IRI p = RDF.TYPE;
   IRI o = vf.iri(ns, "Artist");
   model.add(s,p,o);
   Model artists = model.filter(null,RDF.TYPE,vf.iri(ns,"Artist"));

4. ModelBuilder Workflow
 Sequence:
   builder = new ModelBuilder();
   builder.setNamespace("ex","http://example.org/");
   builder.subject("ex:Picasso");
   builder.add(RDF.TYPE,"ex:Artist");
   builder.add(FOAF.FIRST_NAME,"Pablo");
   Model model = builder.build();

5. Value Creation
 IRI: Values.iri(String namespace,String localName)
 Literal default string: Values.literal(String label)
 Typed literal: Values.literal(String label,XSDDatatype datatype)
 Lang-tagged: Values.literal(String label,String lang)
 Blank node: Values.bnode()

6. RDFFormat Details
 ENUMs and media types:
   RDFXML: application/rdf+xml
   TURTLE: text/turtle
   NTRIPLES: application/n-triples
   N3: text/n3
   TRIG: application/trig
   NQUADS: application/n-quads

## Supplementary Details
ValueFactory Implementation
 Values.iri(ns,local): returns SimpleIRI(namespace+local)
 Values.literal(label): datatype xsd:string
 Values.literal(label,datatype): assigns datatype
 Values.literal(label, lang): language tagged
 Values.bnode(): creates unique BNode

ModelBuilder Implementation Pattern
 setNamespace: stores prefix→namespace in builder map
 subject: resolves prefixed name to IRI or BNode
 add: accepts pred as IRI or prefixed string, obj as literal, IRI, bnode
 chaining returns builder
 build: returns new TreeModel populated with statements from builder context

RDFFormat Effects
 serializing NTRIPLES: one statement per line, no prefixes
 serializing TURTLE: groups by subject, uses prefixed names
 writing RDFXML: uses rdf:RDF root, namespace declarations

Base URI Usage
 parse: baseURI resolves relative IRIs in input document
 write: baseURI not used

Thread-safety
 ModelBuilder and Rio methods are not thread-safe; use per-thread instances

## Reference Details
Class org.eclipse.rdf4j.rio.Rio
Methods:
 parse(InputStream in, String baseURI, RDFFormat format) throws IOException, RDFParseException → Model
 parse(Reader reader, String baseURI, RDFFormat format) throws IOException, RDFParseException → Model
 write(Model model, OutputStream out, RDFFormat format) throws IOException, RDFHandlerException
 write(Model model, Writer writer, RDFFormat format) throws IOException, RDFHandlerException

Enum org.eclipse.rdf4j.rio.RDFFormat
 RDFXML, TURTLE, NTRIPLES, N3, TRIG, NQUADS
 Properties:
   String getDefaultMIMEType()
   boolean supportsNamespaces()
   boolean supportsContexts()

Interface org.eclipse.rdf4j.model.Model extends Set<Statement>
 Methods:
   void add(Resource subj, IRI pred, Value obj, Resource... contexts)
   boolean remove(Resource subj, IRI pred, Value obj, Resource... contexts)
   Model filter(Resource subj, IRI pred, Value obj)
   Stream<? extends Statement> stream()
   void forEach(Consumer<? super Statement> action)

Class org.eclipse.rdf4j.model.util.ModelBuilder
 Constructors:
   ModelBuilder()
   ModelBuilder(String defaultNamespace)
 Methods:
   ModelBuilder setNamespace(String prefix,String namespace)
   ModelBuilder subject(String iriOrPrefixedName)
   ModelBuilder add(String pred,String obj)
   ModelBuilder add(IRI pred,Value obj)
   ModelBuilder build()

Class org.eclipse.rdf4j.model.util.Values
 Methods:
   static IRI iri(String namespace,String localName)
   static IRI iri(String iri)
   static Literal literal(String label)
   static Literal literal(String label,XSDDatatype datatype)
   static Literal literal(String label,String language)
   static BNode bnode()

Concrete Best Practices
 Always set namespaces in ModelBuilder to enable prefixed notation and Turtle serialization brevity
 Use parse(InputStream,baseURI,format) to read files when resolving relative IRIs
 Use write(Model,OutputStream,format) then flush and close stream in finally block
 To update model: filter, modify statements, then write back

Troubleshooting
 Problem: Parser fails with unknown datatypes
 Command: catch RDFParseException.getLineNumber(), getColumnNumber() to locate error
 Solution: ensure input file encoding UTF-8, declare all used prefixes

Problem: Model.write produces no prefixes in NTRIPLES
 Command: use RDFFormat.TURTLE for prefix preservation
 Expected: prefixes on top via @prefix declarations

## Information Dense Extract
Rio.parse(InputStream in,String baseURI,RDFFormat fmt)→Model; Rio.parse(Reader r,String baseURI,RDFFormat fmt)→Model; Rio.write(Model m,OutputStream os,RDFFormat fmt); Rio.write(Model m,Writer w,RDFFormat fmt); RDFFormat: RDFXML(text/xml),TURTLE(text/turtle),NTRIPLES,TRIG,NQUADS,N3; Model add(Resource s,IRI p,Value o,Resource...ctx); remove(...); filter(s,p,o)→Model; forEach(Statement→void); ModelBuilder: setNamespace(pref,ns), subject(prefOrIRI), add(pred,obj), build()→Model; Values.iri(ns,local),Values.iri(iri),Values.literal(label),literal(label,datatype),literal(label,lang),bnode(); CodePatterns: FileInputStream→Rio.parse→Model; FileOutputStream→Rio.write; use try-with-resources; prefixed names resolve to full IRIs; default datatypes xsd:string; use filter to query model; catch IOException,RDFParseException,RDFHandlerException for error handling.

## Sanitised Extract
Table of Contents
 1. Rio Parsing
 2. Rio Writing
 3. Model API Usage
 4. ModelBuilder Workflow
 5. Value Creation
 6. RDFFormat Details

1. Rio Parsing
 Method: parse(InputStream in, String baseURI, RDFFormat format)  Model
 Method: parse(Reader reader, String baseURI, RDFFormat format)  Model
 Requirements: pass base URI for relative IRI resolution; supported formats per RDFFormat
 Example:
   InputStream in = new FileInputStream('data.ttl');
   Model model = Rio.parse(in, 'http://example.org/', RDFFormat.TURTLE);

2. Rio Writing
 Method: write(Model model, OutputStream out, RDFFormat format)
 Method: write(Model model, Writer writer, RDFFormat format)
 Effect: serializes model to specified format; preserves contexts
 Example:
   Rio.write(model, System.out, RDFFormat.RDFXML);
   FileOutputStream fos = new FileOutputStream('out.rdf');
   Rio.write(model, fos, RDFFormat.NTRIPLES);

3. Model API Usage
 Interface: Model extends Set<Statement>
   add(Resource subj, IRI pred, Value obj, Resource... contexts)
   remove(Resource subj, IRI pred, Value obj, Resource... contexts)
   filter(Resource subj, IRI pred, Value obj)  Model
   forEach(Consumer<Statement>)
 Example:
   IRI s = vf.iri(ns, 'Picasso');
   IRI p = RDF.TYPE;
   IRI o = vf.iri(ns, 'Artist');
   model.add(s,p,o);
   Model artists = model.filter(null,RDF.TYPE,vf.iri(ns,'Artist'));

4. ModelBuilder Workflow
 Sequence:
   builder = new ModelBuilder();
   builder.setNamespace('ex','http://example.org/');
   builder.subject('ex:Picasso');
   builder.add(RDF.TYPE,'ex:Artist');
   builder.add(FOAF.FIRST_NAME,'Pablo');
   Model model = builder.build();

5. Value Creation
 IRI: Values.iri(String namespace,String localName)
 Literal default string: Values.literal(String label)
 Typed literal: Values.literal(String label,XSDDatatype datatype)
 Lang-tagged: Values.literal(String label,String lang)
 Blank node: Values.bnode()

6. RDFFormat Details
 ENUMs and media types:
   RDFXML: application/rdf+xml
   TURTLE: text/turtle
   NTRIPLES: application/n-triples
   N3: text/n3
   TRIG: application/trig
   NQUADS: application/n-quads

## Original Source
Eclipse RDF4J Documentation
https://rdf4j.org/documentation/

## Digest of RIO_API

# RDF4J Rio Parsing and Writing

## 1. Rio Class

- Methods:
  - static Model parse(InputStream in, String baseURI, RDFFormat format)
  - static Model parse(Reader reader, String baseURI, RDFFormat format)
  - static void write(Model model, OutputStream out, RDFFormat format)
  - static void write(Model model, Writer writer, RDFFormat format)

## 2. RDFFormat Enum

- Constants:
  - RDFXML (mediaType: application/rdf+xml)
  - TURTLE (text/turtle)
  - NTRIPLES (application/n-triples)
  - N3 (text/n3)
  - TRIG (application/trig)
  - NQUADS (application/n-quads)

## 3. Model API

- Interface: org.eclipse.rdf4j.model.Model extends Set<Statement>
  - add(Resource subj, IRI pred, Value obj, Resource... contexts)
  - remove(Resource subj, IRI pred, Value obj, Resource... contexts)
  - filter(Resource subj, IRI pred, Value obj): Model
  - forEach(Consumer<Statement> action)

## 4. ModelBuilder Class

- Constructor: ModelBuilder()
- Methods:
  - setNamespace(String prefix, String namespace)
  - subject(String iriOrPrefixedName)
  - add(String pred, String obj)
  - add(IRI pred, Value obj)
  - build(): Model

## 5. ValueFactory (Values Class)

- static IRI iri(String namespace, String localName)
- static IRI iri(String iri)
- static Literal literal(String label)
- static Literal literal(String label, XSDDatatype datatype)
- static Literal literal(String label, String language)
- static BNode bnode()



## Attribution
- Source: Eclipse RDF4J Documentation
- URL: https://rdf4j.org/documentation/
- License: Eclipse Public License 2.0
- Crawl Date: 2025-05-02T20:31:09.150Z
- Data Size: 1077261 bytes
- Links Found: 4618

## Retrieved
2025-05-02

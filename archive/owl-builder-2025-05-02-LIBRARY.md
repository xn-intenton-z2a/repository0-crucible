library/SPARQL_UPDATE.md
# library/SPARQL_UPDATE.md
# SPARQL_UPDATE

## Crawl Summary
Defines SPARQL 1.1 Update language: syntax and semantics for operations on RDF Graph Stores. Key operations: INSERT DATA, DELETE DATA, DELETE/INSERT (pattern-based), DELETE WHERE, LOAD, CLEAR, CREATE, DROP, COPY, MOVE, ADD. Syntax BNF for request and operations. Graph Store model: default/named graphs; atomic requests; implicit graph creation; SILENT error suppression. WITH for target graph; USING/USING NAMED for dataset in WHERE. Formal model maps operations to abstract definitions.

## Normalised Extract
Table of Contents:
1. Graph Store Model
2. Update Operations
   2.1 INSERT DATA
   2.2 DELETE DATA
   2.3 DELETE/INSERT
   2.4 DELETE WHERE
   2.5 LOAD
3. Graph Management
   3.1 CLEAR
   3.2 CREATE
   3.3 DROP
   3.4 COPY
   3.5 MOVE
   3.6 ADD

1. Graph Store Model
- Default graph: unnamed slot; Named graphs: zero or more slots.
- Access via SPARQL Update Service or Graph Store HTTP Protocol.
- Atomicity: requests execute atomically.
- Implicit graph creation on non-empty insert.

2. Update Operations
2.1 INSERT DATA
Syntax: INSERT DATA (GRAPH <graphIRI>)? { triples }   
Restrictions: no variables; no blank nodes.   
Behavior: insert ground triples; create target graph; ignore existing triples.

2.2 DELETE DATA
Syntax: DELETE DATA (GRAPH <graphIRI>)? { triples }   
Restrictions: no variables; no blank nodes.   
Behavior: remove matching triples; ignore missing triples.

2.3 DELETE/INSERT
Syntax: [WITH <g>] (DELETE { patterns } INSERT { patterns } | INSERT { patterns }) (USING [NAMED] <iri>)* WHERE { pattern }
Behavior: execute WHERE once; for each binding: delete then insert; unlabeled patterns target WITH graph or default; explicit GRAPH overrides WITH; USING defines dataset for WHERE; unbound or illegal triples skipped.

2.4 DELETE WHERE
Syntax: DELETE WHERE { patterns }
Behavior: match patterns as both template and filter; remove matches.

2.5 LOAD
Syntax: LOAD [SILENT] <sourceIRI> [INTO GRAPH <targetIRI>]
Behavior: fetch source; insert all triples; create graph if absent; SILENT suppresses errors.

3. Graph Management
3.1 CLEAR
Syntax: CLEAR [SILENT] (DEFAULT | NAMED | ALL | GRAPH <iri>)
Behavior: remove all triples from specified graphs.

3.2 CREATE
Syntax: CREATE [SILENT] GRAPH <iri>
Behavior: create empty graph; error if exists (unless SILENT).

3.3 DROP
Syntax: DROP [SILENT] (GRAPH <iri> | DEFAULT | NAMED | ALL)
Behavior: remove graphs; error if missing (unless SILENT).

3.4 COPY/MOVE/ADD
Syntax: (COPY|MOVE|ADD) [SILENT] GRAPH <source> TO GRAPH <dest>
Behavior: COPY duplicates; MOVE duplicates then deletes source; ADD inserts source triples into dest; errors suppressed if SILENT.


## Supplementary Details
Configuration and Implementation Notes:
- Atomic execution requires transaction support; wrap SPARQL Update in single HTTP POST.
- Default graph is unnamed; override with GRAPH or WITH in operations.
- Implicit graph creation: any non-empty INSERT or LOAD creates graph.
- SILENT keyword: suppresses errors for missing or existing graphs.
- USING dataset: specify default (USING) and named (USING NAMED) graphs for WHERE matching.
- Blank nodes in INSERT/DELETE: allowed in DELETE/INSERT INSERT but re-instantiated per solution; disallowed in DATA forms and DELETE templates.
- FILTER and OPTIONAL supported within WHERE but follow SPARQL Query semantics.
Implementation Steps:
1. Parse update text against grammar (Appendix C).
2. Build abstract update operations: InsertData, DeleteData, DeleteInsert, Load, Clear, Create, Drop, Copy, Move, Add.
3. Validate graph names and silent flags.
4. Evaluate WHERE patterns against current dataset (with USING spec).
5. Compute triples to delete/insert; skip invalid instantiations.
6. Perform deletes, then inserts within transaction.
7. Commit or roll back on error.


## Reference Details
Grammar Productions (Appendix C):
UpdateRequest    ::= ( Prologue | Update | 'LOAD' | 'CLEAR' | 'CREATE' | 'DROP' | 'COPY' | 'MOVE' | 'ADD' )* ;
Prologue         ::= 'BASE' IRIref | 'PREFIX' PNAME_NS IRIref;
Update           ::= ( 'LOAD' ( 'SILENT' )? IRIref ( 'INTO' 'GRAPH' IRIref )? )
                    | ( 'CLEAR' ( 'SILENT' )? ( 'DEFAULT' | 'NAMED' | 'ALL' | 'GRAPH' IRIref ) )
                    | ( 'CREATE' ( 'SILENT' )? 'GRAPH' IRIref )
                    | ( 'DROP' ( 'SILENT' )? ( 'GRAPH' IRIref | 'DEFAULT' | 'NAMED' | 'ALL' ) )
                    | ( ('COPY'|'MOVE'|'ADD') ( 'SILENT' )? 'GRAPH' IRIref 'TO' 'GRAPH' IRIref )
                    | Modify;
Modify           ::= ( 'WITH' IRIref )?
                    ( ( 'DELETE' QuadPattern ( 'INSERT' QuadPattern )? )
                    | ( 'INSERT' QuadPattern ) )
                    ( ( 'USING' ( 'NAMED' )? IRIref )* ) 'WHERE' GroupGraphPattern;
QuadPattern      ::= TriplesTemplate;
TriplesTemplate  ::= '{' ( GraphTriples? ) '}';
GraphTriples     ::= ( TriplesSameSubject ) ( '.' TriplesSameSubject )* '.'?;
GroupGraphPattern::= '{' ( TriplesBlock )* '}';

Examples:
1. Bulk Insert:
PREFIX ex: <http://example.org/>
INSERT DATA { GRAPH ex:g { ex:s ex:p ex:o } }
2. Pattern Update:
WITH <http://ex/g>
DELETE { ?s ex:old ?o }
INSERT { ?s ex:new ?o }
WHERE  { ?s ex:old ?o }

Best Practices:
- Use INSERT DATA / DELETE DATA for large static payloads to enable streaming parsing.
- Use WITH to reduce repetition of GRAPH clauses.
- Suppress expected errors (e.g., dropping non-existent graphs) with SILENT.
- Validate update text against grammar before execution.

Troubleshooting:
Command: curl -X POST --data-binary @update.ru -H 'Content-Type: application/sparql-update' http://host/update
Expected: HTTP 200 OK on success; HTTP 4xx/5xx on error.
Common Errors:
- 400 Bad Request: syntax error in update.
- 404 Not Found: unknown service endpoint.
- 409 Conflict: attempting to CREATE GRAPH existing graph (without SILENT).
Solutions:
- Validate prefixes and IRIrefs.
- Check graph naming consistency.
- Wrap multiple operations in a transaction if supported.


## Information Dense Extract
GraphStore: default unnamed, named graphs; atomic update requests; implicit graph creation on non-empty inserts; SILENT suppresses errors. Operations:
INSERT DATA (GRAPH?)?{T*} ground triples; DELETE DATA (GRAPH?)?{T*} ground triples; DELETE/INSERT [WITH g]? DELETE {P} INSERT {P}? (USING NV* )* WHERE {GP}; DELETE WHERE {P*}; LOAD [SILENT]? IRI [INTO GRAPH IRI]?; CLEAR [SILENT]? {DEFAULT|NAMED|ALL|GRAPH IRI}; CREATE [SILENT]? GRAPH IRI; DROP [SILENT]? {GRAPH IRI|DEFAULT|NAMED|ALL}; COPY|MOVE|ADD [SILENT]? GRAPH IRI TO GRAPH IRI. Grammar in Appendix C. WHERE patterns evaluated once; delete then insert per binding; skip unbound/illegal. Blank nodes in INSERT re-instantiated; disallowed in DATA and DELETE templates. USING defines dataset for WHERE. WITH sets default target graph. Implementation: parse, map to abstract ops, evaluate, apply within transaction. Examples provided. Troubleshooting: HTTP POST with Content-Type application/sparql-update; expect 2xx; errors for syntax, missing graphs, conflicts; use SILENT and prefix validation.

## Sanitised Extract
Table of Contents:
1. Graph Store Model
2. Update Operations
   2.1 INSERT DATA
   2.2 DELETE DATA
   2.3 DELETE/INSERT
   2.4 DELETE WHERE
   2.5 LOAD
3. Graph Management
   3.1 CLEAR
   3.2 CREATE
   3.3 DROP
   3.4 COPY
   3.5 MOVE
   3.6 ADD

1. Graph Store Model
- Default graph: unnamed slot; Named graphs: zero or more slots.
- Access via SPARQL Update Service or Graph Store HTTP Protocol.
- Atomicity: requests execute atomically.
- Implicit graph creation on non-empty insert.

2. Update Operations
2.1 INSERT DATA
Syntax: INSERT DATA (GRAPH <graphIRI>)? { triples }   
Restrictions: no variables; no blank nodes.   
Behavior: insert ground triples; create target graph; ignore existing triples.

2.2 DELETE DATA
Syntax: DELETE DATA (GRAPH <graphIRI>)? { triples }   
Restrictions: no variables; no blank nodes.   
Behavior: remove matching triples; ignore missing triples.

2.3 DELETE/INSERT
Syntax: [WITH <g>] (DELETE { patterns } INSERT { patterns } | INSERT { patterns }) (USING [NAMED] <iri>)* WHERE { pattern }
Behavior: execute WHERE once; for each binding: delete then insert; unlabeled patterns target WITH graph or default; explicit GRAPH overrides WITH; USING defines dataset for WHERE; unbound or illegal triples skipped.

2.4 DELETE WHERE
Syntax: DELETE WHERE { patterns }
Behavior: match patterns as both template and filter; remove matches.

2.5 LOAD
Syntax: LOAD [SILENT] <sourceIRI> [INTO GRAPH <targetIRI>]
Behavior: fetch source; insert all triples; create graph if absent; SILENT suppresses errors.

3. Graph Management
3.1 CLEAR
Syntax: CLEAR [SILENT] (DEFAULT | NAMED | ALL | GRAPH <iri>)
Behavior: remove all triples from specified graphs.

3.2 CREATE
Syntax: CREATE [SILENT] GRAPH <iri>
Behavior: create empty graph; error if exists (unless SILENT).

3.3 DROP
Syntax: DROP [SILENT] (GRAPH <iri> | DEFAULT | NAMED | ALL)
Behavior: remove graphs; error if missing (unless SILENT).

3.4 COPY/MOVE/ADD
Syntax: (COPY|MOVE|ADD) [SILENT] GRAPH <source> TO GRAPH <dest>
Behavior: COPY duplicates; MOVE duplicates then deletes source; ADD inserts source triples into dest; errors suppressed if SILENT.

## Original Source
SPARQL 1.1 Update
https://www.w3.org/TR/sparql11-update/

## Digest of SPARQL_UPDATE

# SPARQL 1.1 Update (retrieved 2024-06-12)
Data Size: 57673504 bytes
Source: https://www.w3.org/TR/sparql11-update/

# 1 Introduction
SPARQL 1.1 Update is a W3C Recommendation (21 March 2013). It defines a language for updating RDF Graph Stores.

# 2 Graph Store
A Graph Store contains one default graph and zero or more named graphs.
Unnamed graph = default graph by default.
Named graphs can be added or removed.
Graph Store accessed via:
  • SPARQL Update Service (HTTP POST of update syntax)
  • Graph Store HTTP Protocol
Atomicity: each request MUST be atomic. No partial commit.
Entailment & consistency checking are implementation dependent.

# 3 Update Operations
## 3.1 INSERT DATA
Syntax: INSERT DATA QuadData
QuadData ::= (GRAPH VarOrIri)? { TriplesTemplate }
Restrictions: no variables, no blank nodes in QuadData.
Semantics: insert ground triples; create graph if absent; ignore existing triples.

## 3.2 DELETE DATA
Syntax: DELETE DATA QuadData
Restrictions: no variables, no blank nodes.
Semantics: remove matching ground triples; ignore non-existent triples.

## 3.3 DELETE/INSERT
Syntax:
  (WITH IRIref)? ( (DELETE QuadPattern INSERT? ) | INSERT QuadPattern )
  (USING (NAMED)? IRIref)* WHERE GroupGraphPattern
QuadPattern ::= (GRAPH VarOrIri)? { TriplesTemplate }
Semantics: evaluate WHERE once; apply DELETE template then INSERT template per binding; graphs implicitly created on non-empty INSERT.
WITH sets default target graph for unlabeled patterns.
USING/USING NAMED define dataset for WHERE.

## 3.4 DELETE WHERE
Shortcut: DELETE WHERE QuadPattern
Semantics: match QuadPattern as template and pattern; remove matches.

## 3.5 LOAD
Syntax: LOAD (SILENT)? IRIref [INTO GRAPH VarOrIri]
Semantics: fetch RDF document from IRIref; insert triples into graph or default; create graph if absent.

## 3.6 CLEAR, CREATE, DROP, COPY, MOVE, ADD
Syntax:
  CLEAR (SILENT)? (DEFAULT | NAMED | ALL | GRAPH IRIref)
  CREATE (SILENT)? GRAPH IRIref
  DROP   (SILENT)? GRAPH IRIref | DEFAULT | NAMED | ALL
  COPY   (SILENT)? GRAPH IRIref TO GRAPH IRIref
  MOVE   (SILENT)? GRAPH IRIref TO GRAPH IRIref
  ADD    (SILENT)? GRAPH IRIref TO GRAPH IRIref
Semantics: graph management; SILENT suppresses errors.

# 4 Formal Semantics (Section 4)
Defines Graph Store as mapping from graph names to RDF graphs.
Abstract update operations: InsertData, DeleteData, DeleteInsert, Load, Clear, Create, Drop, Copy, Move, Add.
Mapping requests to formal model.

# 5 Conformance
Implementations MUST support all operations and adhere to BNF grammar.

# Appendix C: Grammar Extract
UpdateRequest ::= (UpdateOperation ';'?)*
UpdateOperation ::=
  'BASE' IRIref | 'PREFIX' PNAME_NS IRIref | Modify | GraphManagement | 'LOAD' ...
Modify ::= 'INSERT' ... | 'DELETE' ... | 'WITH' ...
GraphManagement ::= 'CLEAR' ... | 'CREATE' ... | 'DROP' ... | 'COPY' ... | 'MOVE' ... | 'ADD' ...

## Attribution
- Source: SPARQL 1.1 Update
- URL: https://www.w3.org/TR/sparql11-update/
- License: W3C Document License (CC-BY 4.0)
- Crawl Date: 2025-05-02T20:48:44.704Z
- Data Size: 57673504 bytes
- Links Found: 50885

## Retrieved
2025-05-02
library/RIO_API.md
# library/RIO_API.md
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

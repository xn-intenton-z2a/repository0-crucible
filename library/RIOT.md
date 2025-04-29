# RIOT

## Crawl Summary
Supported formats: Turtle, JSON-LD, N-Triples, N-Quads, TriG, RDF/XML, TriX, RDF/JSON, RDF Thrift, RDF Protobuf, RDF Binary.  CLI tools: riot, turtle, ntriples, nquads, trig, rdfxml.  Options: --syntax, --validate, --check, --time, --sink, --output, --formatted, --stream.  Compression: GZip, BZip2.  Java API: RDFParser.create().source(...).lang(...).parse(model); RDFWriter.create().source(...).lang(...).output(out);

## Normalised Extract
Table of Contents

1 Supported Formats
2 CLI Usage
3 Compression
4 Java API – RDFParser
5 Java API – RDFWriter

1 Supported Formats
List of Lang constants and extensions:
    Turtle           Lang.TURTLE      .ttl
    JSON-LD          Lang.JSONLD      .jsonld
    N-Triples        Lang.NTRIPLES    .nt
    N-Quads          Lang.NQUADS      .nq
    TriG             Lang.TRIG        .trig
    RDF/XML          Lang.RDFXML      .rdf, .owl
    TriX             Lang.TRIX        .trix
    RDF/JSON         Lang.RDFJSON     .rj
    RDF Thrift       Lang.RDFTHRIFT   .trdf, .rt
    RDF Protobuf     Lang.RDFPROTOBUF .rpb, .pbrdf
    RDF Binary       Lang.RDFCB       (binary)

2 CLI Usage
Commands:
    riot [files …] [--options]
    turtle [files …]
    ntriples [files …]
    nquads [files …]
    trig [files …]
    rdfxml [files …]
Options:
    --syntax=NAME         set input syntax (e.g. TTL, NQ)
    --validate            strict check, no output
    --check=true|false    literal and IRI validation
    --time                report timing
    --sink                suppress output
    --output=FORMAT       e.g. "JSONLD", "TRIG"
    --formatted=FORMAT    pretty print in given format
    --stream=FORMAT       streaming write
Example:
    riot --syntax=TTL --output=JSONLD input.ttl > output.jsonld

3 Compression
Supported by automatic detection of .gz and .bz2.  Other: zstd -d < file.zst | riot --syntax=NQ

4 Java API – RDFParser
Usage:
    RDFParser.create()
        .source("file.ttl")
        .lang(Lang.TURTLE)
        .base("http://example/")
        .errorHandler(RiotLib.defaultHandler)
        .parse(model);

5 Java API – RDFWriter
Usage:
    RDFWriter.create()
        .source(model)
        .lang(Lang.JSONLD)
        .prefixMapping(model.getPrefixMapping().getNsPrefixMap())
        .base("http://example/")
        .output(System.out);


## Supplementary Details
1) Dependency (Maven):
<dependency>
  <groupId>org.apache.jena</groupId>
  <artifactId>apache-jena-libs</artifactId>
  <version>5.4.0</version>
</dependency>

2) Reading RDF:
- Steps:
  a) Create a Model or DatasetGraph.
  b) Configure RDFParser:
     RDFParser.create()
              .source("data.ttl")
              .lang(Lang.TURTLE)
              .errorHandler(RiotLib.defaultHandler)
              .parse(model);

3) Writing RDF:
- Configure RDFWriter:
     RDFWriter.create()
              .source(model)
              .lang(Lang.NTRIPLES)
              .output(new FileOutputStream("out.nt"));

4) CLI Data Conversion:
- Command: riot input.nq --output=TRIG > output.trig
- Validation: riot --validate file.rdf
- Timing: riot --time file.jsonld

5) Prefix Registration:
- At runtime: RDFWriter.create().prefixMapping(SortedMap<String,String> nsMap)



## Reference Details
### CLI Option Reference
--syntax=NAME         (String) parser name from Lang.getLabel()
--validate            boolean flag, implies --strict --sink --check=true
--check=true|false    boolean, default false, enables literal/IRI checks
--time                boolean, prints parse and write stage timings
--sink                boolean, disables output
--output=FORMAT       (String) writer name from Lang.getLabel()
--formatted=FORMAT    (String) writer name with pretty printing
--stream=FORMAT       (String) writer name in streaming mode

### RDFParser API
public final class RDFParser {
  public static RDFParser.Builder create();
  public static RDFParser.Builder source(String url);
  public static RDFParser.Builder source(InputStream in);
  public RDFParser.Builder lang(Lang lang);
  public RDFParser.Builder base(String baseURI);
  public RDFParser.Builder errorHandler(RiotErrorHandler handler);
  public void parse(Model model) throws RiotException;
  public void parse(StreamRDF dest) throws RiotException;

### RDFWriter API
public final class RDFWriter {
  public static RDFWriter.Builder create();
  public RDFWriter.Builder source(Model model);
  public RDFWriter.Builder source(DatasetGraph dsg);
  public RDFWriter.Builder lang(Lang lang);
  public RDFWriter.Builder base(String baseURI);
  public RDFWriter.Builder prefixMapping(PrefixMap prefixMap);
  public void output(OutputStream out) throws RiotException, IOException;
  public void output(Writer w) throws RiotException, IOException;

### Best Practices
- Always enable literal/IRI validation in production: parserBuilder.check(true).errorHandler(RiotLib.defaultHandler).
- Use streaming writers for large datasets: writerBuilder.stream(Lang.NQUADS).
- Maintain prefix maps for human-readable output: prefixMapping(model.getPrefixMapping().getNsPrefixMap()).

### Troubleshooting
- To locate syntax errors with line numbers:
    riot --check=true --sink data.ttl
  Expected output: ERROR [line:12 col:45] Malformed literal.

- To benchmark parse/write performance:
    riot --time data.ttl --output=TRIG > /dev/null
  Expected output:
    Parse time: 120 ms
    Write time: 80 ms

- To convert compressed input:
    zstd -d < data.nq.zst | riot --syntax=NQ --output=JSONLD > out.jsonld


## Information Dense Extract
Formats: Turtle(.ttl,Lang.TURTLE),JSON-LD(.jsonld,Lang.JSONLD),N-Triples(.nt,Lang.NTRIPLES),N-Quads(.nq,Lang.NQUADS),TriG(.trig,Lang.TRIG),RDF/XML(.rdf/.owl,Lang.RDFXML),TriX(.trix,Lang.TRIX),RDF/JSON(.rj,Lang.RDFJSON),RDF Thrift(.trdf/.rt,Lang.RDFTHRIFT),RDF Protobuf(.rpb/.pbrdf,Lang.RDFPROTOBUF),RDF Binary(Lang.RDFCB). CLI: riot,turtle,ntriples,nquads,trig,rdfxml. Options: --syntax=NAME, --validate, --check=true|false, --time, --sink, --output=FORMAT, --formatted=FORMAT, --stream=FORMAT. Compression: .gz,.bz2 auto; others via pipe. Java API: RDFParser.create().source(url|in).lang(Lang).base(String).errorHandler(RiotErrorHandler).parse(Model|StreamRDF). RDFWriter.create().source(Model|DatasetGraph).lang(Lang).base(String).prefixMapping(PrefixMap).output(OutputStream|Writer).

## Sanitised Extract
Table of Contents

1 Supported Formats
2 CLI Usage
3 Compression
4 Java API  RDFParser
5 Java API  RDFWriter

1 Supported Formats
List of Lang constants and extensions:
    Turtle           Lang.TURTLE      .ttl
    JSON-LD          Lang.JSONLD      .jsonld
    N-Triples        Lang.NTRIPLES    .nt
    N-Quads          Lang.NQUADS      .nq
    TriG             Lang.TRIG        .trig
    RDF/XML          Lang.RDFXML      .rdf, .owl
    TriX             Lang.TRIX        .trix
    RDF/JSON         Lang.RDFJSON     .rj
    RDF Thrift       Lang.RDFTHRIFT   .trdf, .rt
    RDF Protobuf     Lang.RDFPROTOBUF .rpb, .pbrdf
    RDF Binary       Lang.RDFCB       (binary)

2 CLI Usage
Commands:
    riot [files ] [--options]
    turtle [files ]
    ntriples [files ]
    nquads [files ]
    trig [files ]
    rdfxml [files ]
Options:
    --syntax=NAME         set input syntax (e.g. TTL, NQ)
    --validate            strict check, no output
    --check=true|false    literal and IRI validation
    --time                report timing
    --sink                suppress output
    --output=FORMAT       e.g. 'JSONLD', 'TRIG'
    --formatted=FORMAT    pretty print in given format
    --stream=FORMAT       streaming write
Example:
    riot --syntax=TTL --output=JSONLD input.ttl > output.jsonld

3 Compression
Supported by automatic detection of .gz and .bz2.  Other: zstd -d < file.zst | riot --syntax=NQ

4 Java API  RDFParser
Usage:
    RDFParser.create()
        .source('file.ttl')
        .lang(Lang.TURTLE)
        .base('http://example/')
        .errorHandler(RiotLib.defaultHandler)
        .parse(model);

5 Java API  RDFWriter
Usage:
    RDFWriter.create()
        .source(model)
        .lang(Lang.JSONLD)
        .prefixMapping(model.getPrefixMapping().getNsPrefixMap())
        .base('http://example/')
        .output(System.out);

## Original Source
RDF Data Access, SPARQL & Serializations
https://jena.apache.org/documentation/io/

## Digest of RIOT

# Document Digest

Content retrieved: 2024-06-30
Data Size: 1542531 bytes

# Supported RDF Formats

List of formats supported by RIOT with canonical file extensions and parser/writer registration names:

- Turtle (.ttl)           — Lang.TURTLE
- JSON-LD (.jsonld)       — Lang.JSONLD
- N-Triples (.nt)         — Lang.NTRIPLES
- N-Quads (.nq)           — Lang.NQUADS
- TriG (.trig)            — Lang.TRIG
- RDF/XML (.rdf, .owl)    — Lang.RDFXML
- TriX (.trix)            — Lang.TRIX
- RDF/JSON (.rj)          — Lang.RDFJSON
- RDF Thrift (.trdf, .rt) — Lang.RDFTHRIFT
- RDF Protobuf (.rpb, .pbrdf) — Lang.RDFPROTOBUF
- RDF Binary (binary encoding) — Lang.RDFCB

# Command Line Tools

The following executables drive the RIOT engines in the riotcmd package.

## Commands

- riot      — auto-detect input syntax from file extensions or stdin
- turtle    — force Turtle input
- ntriples  — force N-Triples input
- nquads    — force N-Quads input
- trig      — force TriG input
- rdfxml    — force RDF/XML input

## Common Options

--syntax=NAME           Explicit input syntax (override extension)
--validate              Equivalent to --strict --sink --check=true
--check=true|false      Enable literal/IRI validation (default=false)
--time                  Print parse and write timing
--sink                  Drop all output (use for validation)
--output=FORMAT         Write in given syntax (STREAMING if supported)
--formatted=FORMAT      Write with pretty-printing
--stream=FORMAT         Write in streaming mode where available

# Syntax Recognition and Compression Handling

- File extensions are mapped to formats by the inner extension before .gz or .bz2.
- Supported compression: GZip and BZip2.  Other formats must be piped via external tools (e.g. zstd -d < file.zst | riot).

# Java API for RIOT

## Core Classes and Builder Patterns

### RDFParser (org.apache.jena.riot.RDFParser)

- Builder create()
- Builder source(String url)
- Builder source(InputStream in)
- Builder lang(Lang lang)
- Builder base(String baseURI)
- Builder errorHandler(RiotErrorHandler handler)
- void parse(Model model)
- void parse(StreamRDF dest)

### RDFWriter (org.apache.jena.riot.RDFWriter)

- Builder create()
- Builder source(Model model)
- Builder source(DatasetGraph dsg)
- Builder lang(Lang lang)
- Builder base(String baseURI)
- Builder prefixMapping(PrefixMap prefixMap)
- void output(OutputStream out)
- void output(Writer w)



## Attribution
- Source: RDF Data Access, SPARQL & Serializations
- URL: https://jena.apache.org/documentation/io/
- License: License if known
- Crawl Date: 2025-04-29T06:53:10.101Z
- Data Size: 1542531 bytes
- Links Found: 3487

## Retrieved
2025-04-29

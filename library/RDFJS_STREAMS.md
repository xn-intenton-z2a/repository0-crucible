# RDFJS_STREAMS

## Crawl Summary
Defines interfaces ReadableStream<T>, WritableStream<T>, Pipeable<T> with Node.js–compatible streaming events and methods. ReadableStream<T>: on(data/error/end/readable), read(), resume(), pause(), cancel(). WritableStream<T>: write(chunk): boolean, end(), on(error/drain). Pipeable<T>: pipe(destination, options.end default true)

## Normalised Extract
Table of Contents:
 1. ReadableStream Interface
 2. WritableStream Interface
 3. Pipeable Interface

1. ReadableStream Interface
   Methods and Signatures:
     on(event: data, listener: (chunk: T) => void): this  triggers when a data chunk is available
     on(event: error, listener: (error: Error) => void): this  handles stream errors
     on(event: end, listener: () => void): this  signals end of stream
     on(event: readable, listener: () => void): this  signals readiness to read
     read(): T | null  retrieves next chunk, returns null if none available
     resume(): this  resumes flowing mode
     pause(): this  halts data flow
     cancel(): void  aborts stream, no further events

2. WritableStream Interface
   Methods and Signatures:
     write(chunk: T): boolean  writes chunk, returns false if backpressure
     end(): void  marks writable stream complete
     on(event: error, listener: (error: Error) => void): this  handles write errors
     on(event: drain, listener: () => void): this  signals drain event when write buffer empties

3. Pipeable Interface
   Methods and Signatures:
     pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T>
       options.end default true  controls automatic closure of destination on source end

## Supplementary Details
Parameter Values and Defaults:
 options.end default true  when piping, closes destination on source end

Configuration Options:
 objectMode: true  for Node.js stream implementations handling RDF quads
 highWaterMark: configurable integer  controls buffering threshold

Implementation Steps:
 1. Create Node.js Readable with objectMode:true
 2. Override _read to push quad chunks or null
 3. Handle _destroy to emit error and cleanup
 4. Use pipe with { end: false } to preserve destination across multiple sources

## Reference Details
ReadableStream<T>
  on(event: data, listener: (chunk: T) => void): this
  on(event: error, listener: (error: Error) => void): this
  on(event: end, listener: () => void): this
  on(event: readable, listener: () => void): this
  read(): T | null
  resume(): this
  pause(): this
  cancel(): void

WritableStream<T>
  write(chunk: T): boolean
  end(): void
  on(event: error, listener: (error: Error) => void): this
  on(event: drain, listener: () => void): this

Pipeable<T>
  pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T]

Code Example:
 const { Readable } = require(stream)
 class QuadStream extends Readable {
   constructor(source) {
     super({ objectMode: true })
     this.source = source
   }
   _read() {
     try {
       const quad = this.source.next()
       if (quad) push(quad)
       else push(null)
     } catch (err) {
       destroy(err)
     }
   }
 }

 const quadStream = new QuadStream(dataset)
 quadStream.pipe(writer, { end: true })

Backpressure Best Practice:
 if write returns false pause source and on drain resume

Error Handling:
 always register on(error) to avoid uncaught exceptions

Troubleshooting:
 Command: node example.js  Expected: data events follow until end
 If no data, verify source.next implementation returns null at exhaustion


## Information Dense Extract
ReadableStream<T>: on(data|error|end|readable), read():T|null, resume(), pause(), cancel(). WritableStream<T>: write(chunk):boolean, end(), on(error|drain). Pipeable<T>: pipe(dest, { end?:boolean default true }). Implementation: Node.js objectMode Readable, override _read to push quads, use destroy for errors, use pipe with end:false to combine streams. Best practices: handle backpressure by pausing on write false and resume on drain, register error handlers. Configuration: objectMode:true, highWaterMark adjustable. Code patterns: class extends Readable with _read logic, quadStream.pipe(writer,{end:true}). 

## Sanitised Extract
Table of Contents:
 1. ReadableStream Interface
 2. WritableStream Interface
 3. Pipeable Interface

1. ReadableStream Interface
   Methods and Signatures:
     on(event: data, listener: (chunk: T) => void): this  triggers when a data chunk is available
     on(event: error, listener: (error: Error) => void): this  handles stream errors
     on(event: end, listener: () => void): this  signals end of stream
     on(event: readable, listener: () => void): this  signals readiness to read
     read(): T | null  retrieves next chunk, returns null if none available
     resume(): this  resumes flowing mode
     pause(): this  halts data flow
     cancel(): void  aborts stream, no further events

2. WritableStream Interface
   Methods and Signatures:
     write(chunk: T): boolean  writes chunk, returns false if backpressure
     end(): void  marks writable stream complete
     on(event: error, listener: (error: Error) => void): this  handles write errors
     on(event: drain, listener: () => void): this  signals drain event when write buffer empties

3. Pipeable Interface
   Methods and Signatures:
     pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T>
       options.end default true  controls automatic closure of destination on source end

## Original Source
Schema, Validation, RDF/OWL JavaScript Libraries & RDFJS Specifications
https://rdf.js.org/streams/spec/

## Digest of RDFJS_STREAMS

# RDFJS Streams Specification

## ReadableStream<T>

interface ReadableStream<T>

  on(event: data, listener: (chunk: T) => void): this
  on(event: error, listener: (error: Error) => void): this
  on(event: end, listener: () => void): this
  on(event: readable, listener: () => void): this
  read(): T | null
  resume(): this
  pause(): this
  cancel(): void


## WritableStream<T>

interface WritableStream<T>

  write(chunk: T): boolean
  end(): void
  on(event: error, listener: (error: Error) => void): this
  on(event: drain, listener: () => void): this


## Pipeable<T>

interface Pipeable<T>

  pipe(destination: WritableStream<T>, options?: { end?: boolean }): WritableStream<T]


## Attribution
- Source: Schema, Validation, RDF/OWL JavaScript Libraries & RDFJS Specifications
- URL: https://rdf.js.org/streams/spec/
- License: License if known
- Crawl Date: 2025-04-29T08:52:40.397Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29

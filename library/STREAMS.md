# STREAMS

## Crawl Summary
Readable, Writable, Duplex, Transform classes with constructors taking options: highWaterMark, objectMode, encoding, defaultEncoding, decodeStrings, autoDestroy, emitClose, allowHalfOpen. Methods: read, write, end, cork, uncork, setEncoding, setDefaultEncoding, pause/resume, unpipe, unshift, wrap. Events: data, drain, end, finish, readable, error, close. pipeline utility signature. Backpressure: write returns false signals to await 'drain'.

## Normalised Extract
Table of Contents
1 Stream Classes
2 Readable Streams Configuration
3 Writable Streams Configuration
4 Duplex Streams
5 Transform Streams
6 pipeline Utility
7 Backpressure Handling
8 Error Handling

1 Stream Classes
Class Stream: base for Readable, Writable, Duplex, Transform. Inherits EventEmitter.

2 Readable Streams Configuration
Constructor: Readable({ highWaterMark: number=16384, encoding: string|null=null, objectMode: boolean=false, autoDestroy: boolean=true, emitClose: boolean=true })
Methods:
 read(size?: number): any  returns Buffer|string|null
 setEncoding(enc: string): this sets chunk encoding
 pause(): this temporarily stops 'data' events
 resume(): this restarts 'data'
 isPaused(): boolean
 unpipe(dest?: Writable): this detaches pipe target
 unshift(chunk: any): void prepends chunk to buffer
 wrap(oldStream: Stream): this consumes older stream
Events: 'data'(chunk), 'end', 'readable', 'error', 'close'

3 Writable Streams Configuration
Constructor: Writable({ highWaterMark: number=16384, decodeStrings: boolean=true, defaultEncoding: string='utf8', objectMode: boolean=false, emitClose: boolean=true })
Methods:
 write(chunk: any, encoding?: string, cb?: (err?: Error|null)=>void): boolean returns false on backpressure
 cork(): void holds writes in buffer until uncork()
 uncork(): void flushes buffered writes
 setDefaultEncoding(enc: string): this
 end(chunk?: any, encoding?: string, cb?: ()=>void): void signals end
Events: 'drain', 'finish', 'error', 'close'

4 Duplex Streams
Constructor: Duplex({ allowHalfOpen: boolean=true } & ReadableOptions & WritableOptions)
Properties and methods from both Readable and Writable.

5 Transform Streams
Constructor: Transform({ transform(chunk, encoding, callback), flush?(callback) } & DuplexOptions)
 transform callback signature: (err?: Error|null, data?: any)=>void
 Events: same as Duplex

6 pipeline Utility
Signature: pipeline(...streams: Stream[], callback: (err?: Error)=>void): void
 Automatically manages stream lifecycles and error propagation.

7 Backpressure Handling
 write() returning false means stop writing until 'drain'
 read() returning null means wait for 'readable' or 'data'

8 Error Handling
 Use pipeline() or attach 'error' on each stream
 On error, destroy all streams to release resources

## Supplementary Details
ReadableOptions.highWaterMark default 16384
ReadableOptions.encoding null for Buffer
WritableOptions.defaultEncoding utf8
WritableOptions.decodeStrings true converts string to Buffer
objectMode true for object streams
autoDestroy true calls destroy() after end or error
emitClose true emits 'close'
alowHalfOpen false prevents half-open duplex

pipeline sets { destroyOnError: true }

Recommended stream construction order: source -> transform -> sink
Always set encoding early if expecting string chunks

To enable objectMode pipeline: set objectMode: true on each stream


## Reference Details
// Readable Example
const fs = require('fs')
const readable = fs.createReadStream('input.txt', { encoding: 'utf8', highWaterMark: 4096 })
readable.on('data', (chunk) => {
  console.log('Received:', chunk)
})
readable.on('end', () => console.log('Stream ended'))
readable.on('error', (err) => console.error('Error:', err))

// Writable Example
const writable = fs.createWriteStream('output.txt', { defaultEncoding: 'utf8', highWaterMark: 8192 })
writable.write('Hello', 'utf8', (err) => { if (err) console.error(err) })
writable.end('World', 'utf8', () => console.log('Write complete'))

// Transform Example
t const { Transform, pipeline } = require('stream')
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase())
  }
})

pipeline(
  fs.createReadStream('input.txt'),
  upperCase,
  fs.createWriteStream('output.txt'),
  (err) => { if (err) console.error('Pipeline failed', err) else console.log('Pipeline succeeded') }
)

// Backpressure pattern
function writeData(stream, dataArray) {
  for (const item of dataArray) {
    if (!stream.write(item)) {
      stream.once('drain', () => writeData(stream, dataArray.slice(dataArray.indexOf(item)+1)))
      return
    }
  }
  stream.end()
}

// Troubleshooting
// Command: node --trace-warnings script.js
// If Unhandled 'error' event: add stream.on('error', handler)
// EPIPE in pipe: ensure writable destination exists before piping

## Information Dense Extract
Readable(opts: { highWaterMark=16384, encoding=null, objectMode=false, autoDestroy=true, emitClose=true }); methods: read(size), setEncoding(enc), pause(), resume(), unpipe(dest), unshift(chunk), wrap(old); events: data, end, readable, error, close; Writable(opts: { highWaterMark=16384, decodeStrings=true, defaultEncoding=utf8, objectMode=false, emitClose=true }); methods: write(chunk,enc,cb)->boolean, cork(), uncork(), setDefaultEncoding(enc), end(chunk,enc,cb); events: drain, finish, error, close; Duplex(opts & allowHalfOpen=true); Transform(opts & transform, flush); pipeline(...streams, cb); backpressure: write false -> drain event; read null -> readable/data; error: attach 'error' or use pipeline.

## Sanitised Extract
Table of Contents
1 Stream Classes
2 Readable Streams Configuration
3 Writable Streams Configuration
4 Duplex Streams
5 Transform Streams
6 pipeline Utility
7 Backpressure Handling
8 Error Handling

1 Stream Classes
Class Stream: base for Readable, Writable, Duplex, Transform. Inherits EventEmitter.

2 Readable Streams Configuration
Constructor: Readable({ highWaterMark: number=16384, encoding: string|null=null, objectMode: boolean=false, autoDestroy: boolean=true, emitClose: boolean=true })
Methods:
 read(size?: number): any  returns Buffer|string|null
 setEncoding(enc: string): this sets chunk encoding
 pause(): this temporarily stops 'data' events
 resume(): this restarts 'data'
 isPaused(): boolean
 unpipe(dest?: Writable): this detaches pipe target
 unshift(chunk: any): void prepends chunk to buffer
 wrap(oldStream: Stream): this consumes older stream
Events: 'data'(chunk), 'end', 'readable', 'error', 'close'

3 Writable Streams Configuration
Constructor: Writable({ highWaterMark: number=16384, decodeStrings: boolean=true, defaultEncoding: string='utf8', objectMode: boolean=false, emitClose: boolean=true })
Methods:
 write(chunk: any, encoding?: string, cb?: (err?: Error|null)=>void): boolean returns false on backpressure
 cork(): void holds writes in buffer until uncork()
 uncork(): void flushes buffered writes
 setDefaultEncoding(enc: string): this
 end(chunk?: any, encoding?: string, cb?: ()=>void): void signals end
Events: 'drain', 'finish', 'error', 'close'

4 Duplex Streams
Constructor: Duplex({ allowHalfOpen: boolean=true } & ReadableOptions & WritableOptions)
Properties and methods from both Readable and Writable.

5 Transform Streams
Constructor: Transform({ transform(chunk, encoding, callback), flush?(callback) } & DuplexOptions)
 transform callback signature: (err?: Error|null, data?: any)=>void
 Events: same as Duplex

6 pipeline Utility
Signature: pipeline(...streams: Stream[], callback: (err?: Error)=>void): void
 Automatically manages stream lifecycles and error propagation.

7 Backpressure Handling
 write() returning false means stop writing until 'drain'
 read() returning null means wait for 'readable' or 'data'

8 Error Handling
 Use pipeline() or attach 'error' on each stream
 On error, destroy all streams to release resources

## Original Source
Node.js Streams & Data Pipelines
https://nodejs.dev/learn/nodejs-streams

## Digest of STREAMS

# Readable Streams

## Class Definition

 class Readable extends Stream

### Constructor

Readable(options: ReadableOptions)

where ReadableOptions includes:
 highWaterMark: number (default 16384 bytes)
 encoding: string|null (default null)
 objectMode: boolean (default false)
 autoDestroy: boolean (default true)
 emitClose: boolean (default true)

### Methods

 read(size?: number): any
 setEncoding(encoding: string): this
 pause(): this
 resume(): this
 isPaused(): boolean
 unpipe(destination?: Writable): this
 unshift(chunk: any): void
 wrap(oldStream: Stream): this

### Events

 data(chunk: Buffer|string): void
 end(): void
 readable(): void
 error(err: Error): void
 close(): void

# Writable Streams

## Class Definition

 class Writable extends Stream

### Constructor

Writable(options: WritableOptions)

where WritableOptions includes:
 highWaterMark: number (default 16384 bytes)
 decodeStrings: boolean (default true)
 defaultEncoding: string (default 'utf8')
 objectMode: boolean (default false)
 emitClose: boolean (default true)
 write(chunk: any, encoding?: string, callback?: (error?: Error|null) => void): boolean
 cork(): void
 uncork(): void
 setDefaultEncoding(encoding: string): this
 end(chunk?: any, encoding?: string, callback?: () => void): void

### Events

 drain(): void
 finish(): void
 error(err: Error): void
 close(): void

# Duplex and Transform Streams

## Class Definitions

 class Duplex extends Readable, Writable

DuplexOptions extends ReadableOptions & WritableOptions & { allowHalfOpen: boolean (default true) }

 class Transform extends Duplex

TransformOptions extends DuplexOptions & { transform(chunk: any, encoding: string, callback: TransformCallback): void
  flush?(callback: TransformCallback): void }

TransformCallback: (error?: Error|null, data?: any) => void

# pipeline Utility

 function pipeline(streams: [...], callback: (err?: Error) => void): void

Supports any mix of Readable, Writable, Duplex, and Transform. Automatically attaches error handlers and destroys streams on error.

# Backpressure Management

 write() returns false when internal buffer exceeds highWaterMark. On false, wait for 'drain' before writing more.
 read() will return null if no data available; listen for 'readable' or 'data'.

# Error Handling

Always attach 'error' handler on each stream or use pipeline utility. On uncaught error, streams may not close properly.

# Configuration Details

 highWaterMark controls buffer size in bytes or objects
 objectMode enables arbitrary JS objects rather than Buffers/strings
 defaultEncoding applies to write when chunk is string
 autoDestroy calls destroy() on end
 emitClose emits 'close' event



## Attribution
- Source: Node.js Streams & Data Pipelines
- URL: https://nodejs.dev/learn/nodejs-streams
- License: License: Node.js license / CC BY 4.0
- Crawl Date: 2025-05-13T12:30:15.383Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-13

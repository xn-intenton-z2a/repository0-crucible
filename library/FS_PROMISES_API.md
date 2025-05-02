# FS_PROMISES_API

## Crawl Summary
Import FS Promises via import or require. Methods return promises. Core methods: access, open, readFile, writeFile, readdir, mkdir, copyFile, unlink. FileHandle methods include read, write, appendFile, chmod, chown, utimes, datasync, sync, truncate, stat, close, streams. Default values: encoding utf8, mode 0o666/0o777, flag w/a, recursive false. Supports AbortSignal. Underlying libuv threadpool; operations off main event loop. Concurrency caution: not threadsafe.

## Normalised Extract
Table of Contents
1 Importing
2 Core FS Operations
3 FileHandle Methods
4 Streams
5 Configuration Defaults
6 Concurrency Considerations

1 Importing
Use either import * as fs from 'node:fs/promises' or const fs = require('node:fs/promises').

2 Core FS Operations
fs.access(path, mode) => Promise<void>
fs.open(path, flags, mode) => Promise<FileHandle>
fs.readFile(path, options) => Promise<Buffer|string>
fs.writeFile(file, data, options) => Promise<void>
fs.readdir(path, options) => Promise<string[]|Dirent[]>
fs.mkdir(path, options) => Promise<void>
fs.copyFile(src, dest, mode) => Promise<void>
fs.unlink(path) => Promise<void>

3 FileHandle Methods
.read(buffer, offset, length, position) => Promise<{bytesRead,buffer}>
.readFile(options) => Promise<Buffer|string>
.write(buffer, offset, length, position) => Promise<{bytesWritten,buffer}>
.writeFile(data, options) => Promise<void>
.appendFile(data, options) => Promise<void>
.chmod(mode) => Promise<void>
.chown(uid, gid) => Promise<void>
.utimes(atime, mtime) => Promise<void>
.datasync() => Promise<void>
.sync() => Promise<void>
.truncate(len) => Promise<void>
.stat(options) => Promise<fs.Stats>
.close() => Promise<void>

4 Streams
filehandle.createReadStream({start,end,highWaterMark,encoding,autoClose,emitClose,signal}) => fs.ReadStream
filehandle.createWriteStream({start,highWaterMark,encoding,autoClose,emitClose,flush,signal}) => fs.WriteStream

5 Configuration Defaults
encoding: 'utf8'
mode for open/writeFile: 0o666
flag for writeFile: 'w'
flag for appendFile: 'a'
fs.mkdir recursive: false, mode 0o777
AbortSignal: optional signal property to abort requests

6 Concurrency Considerations
Threadpool size: UV_THREADPOOL_SIZE (default 4)
Avoid concurrent write operations to same file
Always close handles to prevent leaks
Do not use fs.access before open; catch errors instead

## Supplementary Details
Default Encoding and Flags
• readFile: encoding null => Buffer, encoding string => string
• writeFile: encoding 'utf8', mode 0o666, flag 'w', flush false
• appendFile: flag 'a', mode 0o666, flush false
• mkdir: recursive false, mode 0o777
AbortSignal Support
Pass signal property in options to cancel in-progress operations. Promise rejects with AbortError.
Threadpool and Performance
Default libuv threadpool size 4. To increase concurrency set UV_THREADPOOL_SIZE environment variable before node startup. Use streams for large files to minimize memory overhead.
Race Condition Mitigation
Avoid fs.access for existence checks; directly call open/read/write and handle EEXIST, ENOENT, EACCES errors. Use atomic rename patterns: write to temp file then fs.rename.
Proper Resource Cleanup
Use try/finally around fs.open and filehandle.close. Use for-await-of patterns with filehandle.readableWebStream when processing streams.
Platform Notes
On Linux, pwrite options ignored in append mode; data always appended. start/end inclusive in createReadStream. character device reads block until data available.

## Reference Details
--- Promises API---
fs.access(path: string|Buffer|URL, mode?: number): Promise<void>
fs.open(path: string|Buffer|URL, flags?: string, mode?: number): Promise<FileHandle>
fs.readFile(path: string|Buffer|URL, options?: {encoding?: string|null; signal?: AbortSignal}|string): Promise<Buffer|string>
fs.writeFile(file: string|Buffer|URL|FileHandle, data: string|Buffer|AsyncIterable|Iterable|Stream, options?: {encoding?: string|null; mode?: number; flag?: string; signal?: AbortSignal} | string): Promise<void>
fs.readdir(path: string|Buffer|URL, options?: {encoding?: string; withFileTypes?: boolean}): Promise<string[]|Buffer[]|Dirent[]>
fs.mkdir(path: string|Buffer|URL, options?: {recursive?: boolean; mode?: number}): Promise<void>
fs.copyFile(src: string|Buffer|URL, dest: string|Buffer|URL, mode?: number): Promise<void>
fs.unlink(path: string|Buffer|URL): Promise<void>

--- FileHandle Methods ---
interface FileHandle {
  read(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|bigint|null): Promise<{bytesRead: number; buffer: Buffer|TypedArray|DataView}>
  read(options?: {buffer?: Buffer|TypedArray|DataView; offset?: number; length?: number; position?: number|bigint|null}): Promise<{bytesRead: number; buffer: Buffer|TypedArray|DataView}>
  readFile(options?: {encoding?: string|null; signal?: AbortSignal}|string): Promise<Buffer|string>
  write(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|null): Promise<{bytesWritten: number; buffer: Buffer|TypedArray|DataView}>
  write(buffer: Buffer|TypedArray|DataView, options?: {offset?: number; length?: number; position?: number}): Promise<{bytesWritten: number; buffer: Buffer|TypedArray|DataView}>
  write(string: string, position?: number|null, encoding?: string): Promise<{bytesWritten: number; buffer: string}>
  writeFile(data: string|Buffer|AsyncIterable|Iterable|Stream, options?: {encoding?: string|null; mode?: number; flag?: string; signal?: AbortSignal} | string): Promise<void>
  appendFile(data: string|Buffer|AsyncIterable|Iterable|Stream, options?: {encoding?: string|null; signal?: AbortSignal} | string): Promise<void>
  createReadStream(options?: {start?: number; end?: number; highWaterMark?: number; encoding?: string; autoClose?: boolean; emitClose?: boolean; signal?: AbortSignal}): ReadStream
  createWriteStream(options?: {start?: number; highWaterMark?: number; encoding?: string; autoClose?: boolean; emitClose?: boolean; flush?: boolean; signal?: AbortSignal}): WriteStream
  chmod(mode: number): Promise<void>
  chown(uid: number, gid: number): Promise<void>
  utimes(atime: number|string|Date, mtime: number|string|Date): Promise<void>
  datasync(): Promise<void>
  sync(): Promise<void>
  truncate(len?: number): Promise<void>
  stat(options?: {bigint?: boolean}): Promise<fs.Stats>
  close(): Promise<void>
  [Symbol.asyncDispose](): Promise<void>
}

--- Code Examples and Patterns ---
// Safe read with cleanup
async function readText(path) {
  const fh = await fs.open(path,'r')
  try {
    return await fh.readFile({encoding:'utf8'})
  } finally {
    await fh.close()
  }
}

// Streaming large file
async function processLines(path) {
  const fh = await fs.open(path,'r')
  try {
    for await (const line of fh.readLines()) {
      console.log(line)
    }
  } finally {
    await fh.close()
  }
}

--- Best Practices ---
• Use for-await-of with fs.glob or filehandle.readLines for large sets
• Avoid fs.access; directly open and catch errors
• Pass AbortSignal to cancel slow operations
• Set UV_THREADPOOL_SIZE=8 for high I/O concurrency
• Always close FileHandle in finally block

--- Troubleshooting ---
EMFILE: Too many open files
  ulimit -n 4096
  export UV_THREADPOOL_SIZE=8
  lsof -p $(pgrep node)
ENOENT: File not found
  Verify path via console.log and path.resolve
  Use fs.mkdir with recursive true to create directories
EACCES: Permission denied
  Check permissions with ls -l
  fs.chmod('path',0o666)


## Information Dense Extract
import fs from 'node:fs/promises'; fs.access(path,mode=F_OK):Promise<void>; fs.open(path,flags='r',mode=0o666):Promise<FileHandle>; fs.readFile(path,{encoding=null,signal}):Promise<Buffer|string>; fs.writeFile(file,data,{encoding='utf8',mode=0o666,flag='w',signal}):Promise<void>; fs.readdir(path,{encoding='utf8',withFileTypes=false}):Promise<string[]|Dirent[]>; fs.mkdir(path,{recursive=false,mode=0o777}):Promise<void>; fs.copyFile(src,dest,mode=0):Promise<void>; fs.unlink(path):Promise<void>; FileHandle methods read,write,appendFile,chmod,chown,utimes,datasync,sync,truncate,stat,close,createReadStream,createWriteStream; Defaults: encoding utf8, mode 0o666/0o777, flag w/a, recursive false; support AbortSignal; threadpool default size4; always close handles; avoid fs.access pre-checks; use streaming for large files; set UV_THREADPOOL_SIZE for concurrency

## Sanitised Extract
Table of Contents
1 Importing
2 Core FS Operations
3 FileHandle Methods
4 Streams
5 Configuration Defaults
6 Concurrency Considerations

1 Importing
Use either import * as fs from 'node:fs/promises' or const fs = require('node:fs/promises').

2 Core FS Operations
fs.access(path, mode) => Promise<void>
fs.open(path, flags, mode) => Promise<FileHandle>
fs.readFile(path, options) => Promise<Buffer|string>
fs.writeFile(file, data, options) => Promise<void>
fs.readdir(path, options) => Promise<string[]|Dirent[]>
fs.mkdir(path, options) => Promise<void>
fs.copyFile(src, dest, mode) => Promise<void>
fs.unlink(path) => Promise<void>

3 FileHandle Methods
.read(buffer, offset, length, position) => Promise<{bytesRead,buffer}>
.readFile(options) => Promise<Buffer|string>
.write(buffer, offset, length, position) => Promise<{bytesWritten,buffer}>
.writeFile(data, options) => Promise<void>
.appendFile(data, options) => Promise<void>
.chmod(mode) => Promise<void>
.chown(uid, gid) => Promise<void>
.utimes(atime, mtime) => Promise<void>
.datasync() => Promise<void>
.sync() => Promise<void>
.truncate(len) => Promise<void>
.stat(options) => Promise<fs.Stats>
.close() => Promise<void>

4 Streams
filehandle.createReadStream({start,end,highWaterMark,encoding,autoClose,emitClose,signal}) => fs.ReadStream
filehandle.createWriteStream({start,highWaterMark,encoding,autoClose,emitClose,flush,signal}) => fs.WriteStream

5 Configuration Defaults
encoding: 'utf8'
mode for open/writeFile: 0o666
flag for writeFile: 'w'
flag for appendFile: 'a'
fs.mkdir recursive: false, mode 0o777
AbortSignal: optional signal property to abort requests

6 Concurrency Considerations
Threadpool size: UV_THREADPOOL_SIZE (default 4)
Avoid concurrent write operations to same file
Always close handles to prevent leaks
Do not use fs.access before open; catch errors instead

## Original Source
Node.js FS/Promises API
https://nodejs.org/api/fs.html#fspromisesreadfilepath-options

## Digest of FS_PROMISES_API

# FS Promises API

## Importing

Use one of the following:

import * as fs from 'node:fs/promises'
const fs = require('node:fs/promises')

All methods return Promises that fulfill when the operation completes or reject with an Error on failure.

## Core Promise-based Methods

### fs.access(path[, mode])
Parameters:
  path: string | Buffer | URL
  mode: integer (bitmask of fs.constants.F_OK, R_OK, W_OK, X_OK) Default: fs.constants.F_OK
Returns: Promise<void>
Throws: Error with code EACCES, ENOENT

### fs.open(path, flags[, mode])
Parameters:
  path: string | Buffer | URL
  flags: string ("r","r+","w","w+","a","a+", etc.) Default: 'r'
  mode: integer (permission mask) Default: 0o666
Returns: Promise<FileHandle>
Throws: Error with code ENOENT, EACCES

### fs.readFile(path[, options])
Parameters:
  path: string | Buffer | URL
  options: string (encoding) or object { encoding: string|null Default: null, signal: AbortSignal }
Returns: Promise<Buffer|string>
Throws: Error

### fs.writeFile(file, data[, options])
Parameters:
  file: string | Buffer | URL | FileHandle
  data: string | Buffer | AsyncIterable | Iterable | Stream
  options: string (encoding) or object {
    encoding: string|null Default: 'utf8'
    mode: integer Default: 0o666
    flag: string Default: 'w'
    signal: AbortSignal | undefined
  }
Returns: Promise<void>
Throws: Error

### fs.readdir(path[, options])
Parameters:
  path: string | Buffer | URL
  options: object { encoding: string Default: 'utf8', withFileTypes: boolean Default: false }
Returns: Promise<string[] | Buffer[] | Dirent[]>
Throws: Error

### fs.mkdir(path[, options])
Parameters:
  path: string | Buffer | URL
  options: object { recursive: boolean Default: false, mode: integer Default: 0o777 }
Returns: Promise<void>
Throws: Error

### fs.copyFile(src, dest[, mode])
Parameters:
  src: string | Buffer | URL
  dest: string | Buffer | URL
  mode: integer bitmask Default: 0
    COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE
Returns: Promise<void>
Throws: Error

### fs.unlink(path)
Parameters:
  path: string | Buffer | URL
Returns: Promise<void>
Throws: Error

## FileHandle Class

Instances created by fs.open(). Methods:

filehandle.read(buffer[, offset, length, position]) => Promise<{ bytesRead: number, buffer: Buffer }>
filehandle.read([options]) => Promise<{ bytesRead, buffer }>
filehandle.readFile([options]) => Promise<Buffer|string>
filehandle.write(buffer[, offset, length, position]) => Promise<{ bytesWritten: number, buffer: Buffer }>
filehandle.write(string[, position, encoding]) => Promise<{ bytesWritten: number, buffer: string }>
filehandle.writeFile(data, options) => Promise<void>
filehandle.appendFile(data, options) => Promise<void>
filehandle.createReadStream([options]) => fs.ReadStream
filehandle.createWriteStream([options]) => fs.WriteStream
filehandle.chmod(mode) => Promise<void>
filehandle.chown(uid, gid) => Promise<void>
filehandle.utimes(atime, mtime) => Promise<void>
filehandle.datasync() => Promise<void>
filehandle.sync() => Promise<void>
filehandle.truncate(len) => Promise<void>
filehandle.stat([options]) => Promise<fs.Stats>
filehandle.close() => Promise<void>
filehandle[Symbol.asyncDispose]() => Promise<void>

## Underlying Threadpool

Operations offload to libuv threadpool (default size 4, configurable via UV_THREADPOOL_SIZE). Not threadsafe: avoid concurrent modifications on same file descriptor.

## Attribution
- Source: Node.js FS/Promises API
- URL: https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
- License: License
- Crawl Date: 2025-05-02T07:47:18.151Z
- Data Size: 4450300 bytes
- Links Found: 4165

## Retrieved
2025-05-02

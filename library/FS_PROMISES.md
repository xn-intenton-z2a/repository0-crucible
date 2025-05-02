# FS_PROMISES

## Crawl Summary
Promise-based fs module exposes methods returning Promise. import via 'node:fs/promises'. Key methods: access(path,mode=F_OK):Promise<void>; appendFile(path,data,options={encoding:'utf8',mode:0o666,flag:'a',flush:false}):Promise<void>; copyFile(src,dest,mode=0):Promise<void> with COPYFILE_EXCL|COPYFILE_FICLONE|COPYFILE_FICLONE_FORCE; mkdir(path,options={recursive:false,mode:0o777}):Promise<string|null>; open(path,flags,mode=0o666):Promise<FileHandle>; readFile(path,options={encoding:null,flag:'r',signal?}); writeFile(path,data,options={encoding:'utf8',mode:0o666,flag:'w',signal?}); stat(path,options={bigint:false}):Promise<Stats>; utimes(path,atime,mtime):Promise<void>; rm(path,options); rename(oldPath,newPath):Promise<void>. FileHandle methods: close(), read(buffer,offset=0,length=buffer.byteLength-offset,position=null), write(buffer,offset=0,length=buffer.byteLength-offset,position=null), readFile(options), writeFile(data,options), createReadStream(opts), createWriteStream(opts). fs.constants provides numeric flags.

## Normalised Extract
Table of Contents:
1 Module Import
2 fsPromises API
3 FileHandle Class Methods
4 fs.constants

1 Module Import
import * as fs from 'node:fs/promises'
const fs = require('node:fs/promises')

2 fsPromises API signatures
access(path:string|Buffer|URL, mode?:integer=fs.constants.F_OK):Promise<void>
appendFile(path:string|Buffer|URL|FileHandle, data:string|Buffer, options?:{encoding?:string|null, mode?:integer=0o666, flag?:string='a', flush?:boolean=false}):Promise<void>
copyFile(src:string|Buffer|URL, dest:string|Buffer|URL, mode?:integer=0):Promise<void>
mkdir(path:string|Buffer|URL, options?:{recursive?:boolean=false, mode?:integer=0o777}):Promise<string|null>
open(path:string|Buffer|URL, flags:string, mode?:integer=0o666):Promise<FileHandle>
readFile(path:string|Buffer|URL|FileHandle, options?:{encoding?:string|null, flag?:string='r', signal?:AbortSignal}):Promise<string|Buffer>
writeFile(path:string|Buffer|URL|FileHandle, data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null='utf8', mode?:integer=0o666, flag?:string='w', signal?:AbortSignal}):Promise<void>
stats: stat(path:string|Buffer|URL, options?:{bigint?:boolean=false}):Promise<fs.Stats>
utimes(path:string|Buffer|URL, atime:number|string|Date, mtime:number|string|Date):Promise<void>
rename(oldPath:string|Buffer|URL, newPath:string|Buffer|URL):Promise<void>
rm(path:string|Buffer|URL, options?:{force?:boolean=false, recursive?:boolean=false, maxRetries?:integer=0, retryDelay?:integer=100}):Promise<void>

3 FileHandle Class Methods
close():Promise<void>
read(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|bigint|null=null):Promise<{bytesRead:integer, buffer}>
write(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|null=null):Promise<{bytesWritten:integer, buffer}>
readFile(options?:{encoding?:string|null, signal?:AbortSignal}):Promise<string|Buffer>
writeFile(data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null, signal?:AbortSignal}):Promise<void>
createReadStream(options?:{encoding?:string|null=null, autoClose?:boolean=true, emitClose?:boolean=true, start?:integer=0, end?:integer=Infinity, highWaterMark?:integer=65536, signal?:AbortSignal}):fs.ReadStream
createWriteStream(options?:{encoding?:string='utf8', autoClose?:boolean=true, emitClose?:boolean=true, start?:integer, highWaterMark?:number=16384, flush?:boolean=false}):fs.WriteStream

4 fs.constants numeric flags
File access: F_OK=0, R_OK=4, W_OK=2, X_OK=1
Copy: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
Open: O_RDONLY=0, O_WRONLY=1, O_RDWR=2

## Supplementary Details
mkdir: recursive=true creates nested dirs; returns first created path or null
open flags: r read, r+ read/write, rs+ sync, w truncate/create, wx fail if exists, w+ read/write truncate, wx+ fail if exists, a append/create, ax fail if exists, a+ read/append, ax+ fail if exists. mode mask applies only on file creation
appendFile: path may be FileHandle with write flag; flush=true triggers fsync upon close
copyFile: COPYFILE_FICLONE_FORCE enforces COW clone
rm retries on EBUSY/EACCES with exponential backoff up to maxRetries
readFile: signal AbortSignal cancels read; throws AbortError
read: reading past EOF returns bytesRead=0
write: concurrent writes risk overwrite; use createWriteStream for high volume
streams: autoClose=false leaves descriptor open; must call filehandle.close()
Stats.bigint=true returns numeric values as BigInt
watch: fs.watch(filename, {persistent?:boolean=true, recursive?:boolean=false, encoding?:string='utf8'}):FSWatcher
watcher.close() stops watching

## Reference Details
Example: delete file
```js
import { unlink } from 'node:fs/promises';
try {
  await unlink('/tmp/hello');
  console.log('deleted');
} catch (err) {
  if (err.code === 'ENOENT') console.error('not found');
  else throw err;
}
```

Example: open, read, close
```js
import { open } from 'node:fs/promises';
const handle = await open('file.bin','r+');
const buf=Buffer.alloc(1024);
try {
  const {bytesRead} = await handle.read(buf,0,buf.byteLength,0);
  console.log('read',bytesRead);
} finally {
  await handle.close();
}
```

Example: streaming tail
```js
import { open } from 'node:fs/promises';
const h = await open('log.txt','r');
const rs = h.createReadStream({start:0, end:99, highWaterMark:1024});
rs.on('data',chunk=>process.stdout.write(chunk));
rs.on('end',()=>h.close());
```

Best practice: always close FileHandle in finally. Use AbortSignal to cancel readFile/writeFile: const ac = new AbortController(); setTimeout(() => ac.abort(), 5000); await fs.readFile(path,{signal:ac.signal});

Troubleshoot EACCES:
$ ls -l file.txt
-rw-r--r-- 1 user user 0 Mar 10 12:00 file.txt
$ chmod 644 file.txt

Use `node --trace-warnings script.js` to locate unclosed FileHandle warnings.
Use `strace -e open,read,write node app.js` on Linux to trace syscalls.

## Information Dense Extract
import fs from 'node:fs/promises'; access(path,mode=0):Promise<void>; appendFile(path,data,options={encoding:'utf8',mode:0o666,flag:'a',flush:false'}):Promise<void>; copyFile(src,dest,mode=0):Promise<void>; mkdir(path,options={recursive:false,mode:0o777}):Promise<string|null>; open(path,flags,mode=0o666):Promise<FileHandle>; readFile(path,options={encoding:null,flag:'r',signal?}):Promise<string|Buffer>; writeFile(path,data,options={encoding:'utf8',mode:0o666,flag:'w',signal?}):Promise<void>; stat(path,options={bigint:false}):Promise<Stats>; rename(old,new):Promise<void>; rm(path,options={force:false,recursive:false,maxRetries:0,retryDelay:100}):Promise<void>; FileHandle: close():Promise<void>; read(buf,offset=0,length=buf.byteLength-offset,position=null):Promise<{bytesRead,buffer}>; write(buf,offset=0,length=buf.byteLength-offset,position=null):Promise<{bytesWritten,buffer}>; readFile(options):Promise<string|Buffer>; writeFile(data,options):Promise<void>; createReadStream(opts={encoding:null,autoClose:true,emitClose:true,start:0,end:Infinity,highWaterMark:65536,signal?}):ReadStream; createWriteStream(opts={encoding:'utf8',autoClose:true,emitClose:true,highWaterMark:16384,flush:false}):WriteStream; constants: F_OK=0,R_OK=4,W_OK=2,X_OK=1,COPYFILE_EXCL=1,COPYFILE_FICLONE=2,COPYFILE_FICLONE_FORCE=4; open flags: r,r+,rs+,w,wx,w+,wx+,a,ax,a+,ax+.

## Sanitised Extract
Table of Contents:
1 Module Import
2 fsPromises API
3 FileHandle Class Methods
4 fs.constants

1 Module Import
import * as fs from 'node:fs/promises'
const fs = require('node:fs/promises')

2 fsPromises API signatures
access(path:string|Buffer|URL, mode?:integer=fs.constants.F_OK):Promise<void>
appendFile(path:string|Buffer|URL|FileHandle, data:string|Buffer, options?:{encoding?:string|null, mode?:integer=0o666, flag?:string='a', flush?:boolean=false}):Promise<void>
copyFile(src:string|Buffer|URL, dest:string|Buffer|URL, mode?:integer=0):Promise<void>
mkdir(path:string|Buffer|URL, options?:{recursive?:boolean=false, mode?:integer=0o777}):Promise<string|null>
open(path:string|Buffer|URL, flags:string, mode?:integer=0o666):Promise<FileHandle>
readFile(path:string|Buffer|URL|FileHandle, options?:{encoding?:string|null, flag?:string='r', signal?:AbortSignal}):Promise<string|Buffer>
writeFile(path:string|Buffer|URL|FileHandle, data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null='utf8', mode?:integer=0o666, flag?:string='w', signal?:AbortSignal}):Promise<void>
stats: stat(path:string|Buffer|URL, options?:{bigint?:boolean=false}):Promise<fs.Stats>
utimes(path:string|Buffer|URL, atime:number|string|Date, mtime:number|string|Date):Promise<void>
rename(oldPath:string|Buffer|URL, newPath:string|Buffer|URL):Promise<void>
rm(path:string|Buffer|URL, options?:{force?:boolean=false, recursive?:boolean=false, maxRetries?:integer=0, retryDelay?:integer=100}):Promise<void>

3 FileHandle Class Methods
close():Promise<void>
read(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|bigint|null=null):Promise<{bytesRead:integer, buffer}>
write(buffer:Buffer|TypedArray|DataView, offset?:integer=0, length?:integer=buffer.byteLength-offset, position?:integer|null=null):Promise<{bytesWritten:integer, buffer}>
readFile(options?:{encoding?:string|null, signal?:AbortSignal}):Promise<string|Buffer>
writeFile(data:string|Buffer|AsyncIterable|Iterable|Stream, options?:{encoding?:string|null, signal?:AbortSignal}):Promise<void>
createReadStream(options?:{encoding?:string|null=null, autoClose?:boolean=true, emitClose?:boolean=true, start?:integer=0, end?:integer=Infinity, highWaterMark?:integer=65536, signal?:AbortSignal}):fs.ReadStream
createWriteStream(options?:{encoding?:string='utf8', autoClose?:boolean=true, emitClose?:boolean=true, start?:integer, highWaterMark?:number=16384, flush?:boolean=false}):fs.WriteStream

4 fs.constants numeric flags
File access: F_OK=0, R_OK=4, W_OK=2, X_OK=1
Copy: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
Open: O_RDONLY=0, O_WRONLY=1, O_RDWR=2

## Original Source
Node.js fs Promises API
https://nodejs.org/api/fs.html#fs_promises_api

## Digest of FS_PROMISES

# FS Promises API

## Module Import

```js
import * as fs from 'node:fs/promises';
const fs = require('node:fs/promises');
```

## fsPromises Methods

### fs.access(path: string|Buffer|URL, mode?: number): Promise<void>
- mode default: fs.constants.F_OK
- Rejects with Error if access check fails

### fs.appendFile(path: string|Buffer|URL|FileHandle, data: string|Buffer, options?: { encoding?: string|null; mode?: number; flag?: string; flush?: boolean }): Promise<void>
- encoding default: 'utf8'
- mode default: 0o666
- flag default: 'a'
- flush default: false

### fs.copyFile(src: string|Buffer|URL, dest: string|Buffer|URL, mode?: number): Promise<void>
- mode flags: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
- Default mode: 0 (overwrite)

### fs.mkdir(path: string|Buffer|URL, options?: { recursive?: boolean; mode?: number }): Promise<string|null>
- recursive default: false
- mode default: 0o777
- Returns first path created or null if none

### fs.open(path: string|Buffer|URL, flags: string, mode?: number): Promise<FileHandle>
- flags: 'r','r+','rs+','w','wx','w+','wx+','a','ax','a+','ax+'
- mode default: 0o666

### fs.readFile(path: string|Buffer|URL|FileHandle, options?: { encoding?: string|null; flag?: string; signal?: AbortSignal }): Promise<string|Buffer>
- encoding default: null (Buffer)
- flag default: 'r'

### fs.rename(oldPath: string|Buffer|URL, newPath: string|Buffer|URL): Promise<void>

### fs.rm(path: string|Buffer|URL, options?: { force?: boolean; recursive?: boolean; maxRetries?: number; retryDelay?: number }): Promise<void>
- force default: false
- recursive default: false
- maxRetries default: 0
- retryDelay default: 100

### fs.stat(path: string|Buffer|URL, options?: { bigint?: boolean }): Promise<fs.Stats>
- bigint default: false

### fs.utimes(path: string|Buffer|URL, atime: number|string|Date, mtime: number|string|Date): Promise<void>

### fs.writeFile(path: string|Buffer|URL|FileHandle, data: string|Buffer|AsyncIterable|Iterable|Stream, options?: { encoding?: string|null; mode?: number; flag?: string; signal?: AbortSignal }): Promise<void>
- encoding default: 'utf8'
- mode default: 0o666
- flag default: 'w'

## Class FileHandle

### Properties
- fd: number (underlying descriptor)

### Methods

#### filehandle.close(): Promise<void>
Closes descriptor when pending operations complete.

#### filehandle.read(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|bigint|null): Promise<{ bytesRead: number; buffer }>
- offset default: 0
- length default: buffer.byteLength - offset
- position default: null (current)

#### filehandle.write(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|null): Promise<{ bytesWritten: number; buffer }>
- offset default: 0
- length default: buffer.byteLength - offset
- position default: null

#### filehandle.readFile(options?: { encoding?: string|null; signal?: AbortSignal }): Promise<string|Buffer>

#### filehandle.writeFile(data: string|Buffer|AsyncIterable|Iterable|Stream, options?: { encoding?: string|null; signal?: AbortSignal }): Promise<void>

#### filehandle.createReadStream(options?: { encoding?: string|null; autoClose?: boolean; emitClose?: boolean; start?: number; end?: number; highWaterMark?: number; signal?: AbortSignal }): fs.ReadStream
- encoding default: null
- autoClose default: true
- emitClose default: true
- start default: 0
- end default: Infinity
- highWaterMark default: 64*1024

#### filehandle.createWriteStream(options?: { encoding?: string; autoClose?: boolean; emitClose?: boolean; start?: number; highWaterMark?: number; flush?: boolean }): fs.WriteStream
- encoding default: 'utf8'
- autoClose default: true
- emitClose default: true
- highWaterMark default: 16384
- flush default: false

## fs.constants

- File access: F_OK=0, R_OK=4, W_OK=2, X_OK=1
- Copy flags: COPYFILE_EXCL=1, COPYFILE_FICLONE=2, COPYFILE_FICLONE_FORCE=4
- Open flags: O_RDONLY=0, O_WRONLY=1, O_RDWR=2, plus bitmask constants


## Attribution
- Source: Node.js fs Promises API
- URL: https://nodejs.org/api/fs.html#fs_promises_api
- License: License: Open source (Node.js Foundation)
- Crawl Date: 2025-05-02T00:32:30.726Z
- Data Size: 3595536 bytes
- Links Found: 1471

## Retrieved
2025-05-02

# ATOMIC_FILE_WRITES

## Crawl Summary
writeFileAtomic(filename:String,data:String|Buffer,[options:Object|String],[callback:Function]) and writeFileAtomicSync(filename,data,[options]); Options: chown{uid:Number,gid:Number}|false(default inherit), encoding:String|null(default 'utf8'), fsync:Boolean(default true), mode:Number|false(default inherit), tmpfileCreated(Function); Workflow: create tmp file named filename.murmurhex, write data, fsync, optional chown, rename to target, error path unlinks tmp; concurrent writes to same path serialized via Promise queue, different paths parallel.

## Normalised Extract
Table of Contents:
1. API Methods
2. Options Object
3. Temporary Filename Generation
4. Write & Sync Sequence
5. Ownership Handling
6. Rename & Replacement
7. Error Handling
8. Concurrency Queue

1. API Methods
   writeFileAtomic(filename: String, data: String|Buffer, options?: Object|String, callback?: Function)
   writeFileAtomicSync(filename: String, data: String|Buffer, options?: Object|String)

2. Options Object
   chown: { uid: Number, gid: Number } or false
   encoding: String or null, default 'utf8'
   fsync: Boolean, default true
   mode: Number or false, default from existing file
   tmpfileCreated: Function(tmpFilename)

3. Temporary Filename Generation
   tmpFilename = filename + '.' + murmurhex(__filename, process.pid, ++invocations)
   if in worker: include worker_threads.threadId

4. Write & Sync Sequence
   fs.writeFile(tmpFilename, data, encoding)
   if fsync true: fs.fsync(fd)

5. Ownership Handling
   If options.chown !== false:
     require both uid and gid
     default inherits existing owner
     fs.chown(tmpFilename, uid, gid)

6. Rename & Replacement
   fs.rename(tmpFilename, filename)

7. Error Handling
   On any error (write, fsync, chown, rename): fs.unlink(tmpFilename) then callback(error)

8. Concurrency Queue
   Internal Promise-based queue keyed by filename ensures writes to same file serialized; parallel for different files

## Supplementary Details
Parameter Defaults:
- chown: retrieves uid&gid with fs.stat if existing file, false to skip
- encoding: 'utf8', ignored for Buffer
- fsync: true triggers fs.fsync after write
- mode: retrieves from fs.stat, false to use system default umask

Implementation Steps:
1. Increment invocation counter per module load
2. Compute tmpFilename
3. fs.open(tmpFilename, flags='w', mode)
4. fs.write or fs.writeFile
5. if fsync: fs.fsync
6. if chown object: fs.chown
7. fs.rename to final filename
8. Close file descriptor
9. On errors at any step: fs.unlink(tmpFilename)

Internal Queue:
- Map<String,Promise> per filename
- New write appended: queue = queue.then(() => performWrite)
- After write promise settles, next write runs

## Reference Details
Asynchronous API:
```
function writeFileAtomic(
  filename: string,
  data: string | Buffer,
  options?: {
    chown?: { uid: number; gid: number } | false;
    encoding?: string | null;
    fsync?: boolean;
    mode?: number | false;
    tmpfileCreated?: (tmp: string) => void;
  } | string,
  callback?: (err: NodeJS.ErrnoException | null) => void
): void
```
- If options is string: treated as encoding
- Callback invoked with null on success or Error on failure

Synchronous API:
```
function writeFileAtomicSync(
  filename: string,
  data: string | Buffer,
  options?: {
    chown?: { uid: number; gid: number } | false;
    encoding?: string | null;
    fsync?: boolean;
    mode?: number | false;
    tmpfileCreated?: (tmp: string) => void;
  } | string
): void
```

Code Examples:
```js
const writeFileAtomic = require('write-file-atomic')

// Async with callback
writeFileAtomic('out.txt', 'payload', {
  chown: { uid:1000, gid:1000 },
  encoding: 'utf8',
  fsync: true,
  mode: 0o644,
  tmpfileCreated(tmp) { console.log('tmp:', tmp) }
}, err => {
  if (err) console.error('write failed', err)
})

// Async with Promise
writeFileAtomic('out.txt', Buffer.from('payload'), { fsync:false })
  .then(() => console.log('done'))
  .catch(err => console.error(err))

// Sync
const writeSync = require('write-file-atomic').sync
writeSync('out.txt', 'sync payload', { mode: 0o600, chown: false })
```

Best Practices:
- Always handle errors in callback or catch
- Use explicit mode and chown to avoid unintended permissions
- Pass tmpfileCreated for debugging temp file issues

Troubleshooting:
1. Enable logging:
   ```js
   process.env.DEBUG = 'write-file-atomic'
   ```
2. Check temp files left in directory: pattern `filename.*`
3. Permission errors: ensure process has write and chmod rights
4. Race conditions: avoid parallel writes to same file without queue
5. fsync skipped: confirm `fsync:false` setting

Expected Outputs:
- On success: no temp files, target file updated atomically
- On error during rename: temp file removed, error bubbled


## Information Dense Extract
writeFileAtomic(filename:String,data:String|Buffer,options?:{chown:{uid:Number,gid:Number}|false,encoding:String|null='utf8',fsync:Boolean=true,mode:Number|false,tmpfileCreated?(tmp:String):void}|String,callback?:(Error|null)=>void):void; writeFileAtomicSync(filename,data,options?):void; tmpName=filename+'.'+murmurhex(__filename,process.pid,++invocations)+■threadId; Steps: open tmp, write, fsync?, chown?, rename, close; Defaults inherit existing file stat for chown & mode; optionsString=encoding; errors at any step perform fs.unlink(tmp) then callback; internal filename-keyed Promise queue serializes writes to same file; buffer data ignores encoding; fsync:false skips fs.fsync; chown:false skips ownership change; mode:false uses umask; tmpfileCreated invoked with tmp path.

## Sanitised Extract
Table of Contents:
1. API Methods
2. Options Object
3. Temporary Filename Generation
4. Write & Sync Sequence
5. Ownership Handling
6. Rename & Replacement
7. Error Handling
8. Concurrency Queue

1. API Methods
   writeFileAtomic(filename: String, data: String|Buffer, options?: Object|String, callback?: Function)
   writeFileAtomicSync(filename: String, data: String|Buffer, options?: Object|String)

2. Options Object
   chown: { uid: Number, gid: Number } or false
   encoding: String or null, default 'utf8'
   fsync: Boolean, default true
   mode: Number or false, default from existing file
   tmpfileCreated: Function(tmpFilename)

3. Temporary Filename Generation
   tmpFilename = filename + '.' + murmurhex(__filename, process.pid, ++invocations)
   if in worker: include worker_threads.threadId

4. Write & Sync Sequence
   fs.writeFile(tmpFilename, data, encoding)
   if fsync true: fs.fsync(fd)

5. Ownership Handling
   If options.chown !== false:
     require both uid and gid
     default inherits existing owner
     fs.chown(tmpFilename, uid, gid)

6. Rename & Replacement
   fs.rename(tmpFilename, filename)

7. Error Handling
   On any error (write, fsync, chown, rename): fs.unlink(tmpFilename) then callback(error)

8. Concurrency Queue
   Internal Promise-based queue keyed by filename ensures writes to same file serialized; parallel for different files

## Original Source
Atomic File Writes
https://github.com/npm/write-file-atomic

## Digest of ATOMIC_FILE_WRITES

# Atomic File Writes Documentation (retrieved 2024-06-10)

## API Methods

### writeFileAtomic(filename, data, [options], [callback])
- Parameters:
  - filename (String): path to target file
  - data (String | Buffer): contents to write
  - options (Object | String, optional): configuration or encoding string
  - callback (Function, optional): function(err) called on completion

### writeFileAtomicSync(filename, data, [options])
- Parameters:
  - filename (String)
  - data (String | Buffer)
  - options (Object | String, optional)
- Returns: void

## Options Object

| Property       | Type         | Default                                               | Description                                                    |
|----------------|--------------|-------------------------------------------------------|----------------------------------------------------------------|
| chown          | Object|false | inherits existing file owner (uid & gid) or false to skip | `{ uid: Number, gid: Number }` must include both uid and gid     |
| encoding       | String|null    | 'utf8'                                                | Ignored if data is Buffer                                       |
| fsync          | Boolean      | true                                                  | Skip final fsync if false                                       |
| mode           | Number|false | inherits existing file mode or false to use system default | Unix permission bits                                          |
| tmpfileCreated | Function     | —                                                     | Callback invoked with temporary filename when created           |

## Behavior & Implementation Details

1. **Temporary Filename**: `filename + '.' + murmurhex(__filename, process.pid, ++invocations)`; includes `worker_threads.threadId` if in a worker.
2. **Write & Sync**: uses `fs.writeFile` then `fs.fsync` (unless `fsync:false`).
3. **Ownership**: after write, if `options.chown` truthy, calls `fs.chown(tmp, uid, gid)`. Defaults to existing file owner or skips if `false`.
4. **Rename**: `fs.rename(tmp, filename)` replaces original.
5. **Error Handling**: on any fs error attempts `fs.unlink(tmp)` then passes error to callback.
6. **Concurrency**: writes to same filename serialized via internal Promise queue; different filenames run in parallel.

## Attribution
- Source: https://github.com/npm/write-file-atomic
- Data Size: 570286 bytes
- Crawled: 2024-06-10

## Attribution
- Source: Atomic File Writes
- URL: https://github.com/npm/write-file-atomic
- License: License: MIT
- Crawl Date: 2025-05-13T09:28:02.792Z
- Data Size: 570286 bytes
- Links Found: 4735

## Retrieved
2025-05-13

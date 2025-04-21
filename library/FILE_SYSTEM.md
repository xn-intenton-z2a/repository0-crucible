# FILE_SYSTEM

## Crawl Summary
This document provides the complete and exact Node.js File System (fs) API technical details. It includes API method signatures for the FileHandle class, fsPromises methods, callback and synchronous versions, complete parameter lists with default values, and return types. The content covers stream creation options, file descriptor operations, and error handling patterns, accompanied by full code examples in promise, callback, and synchronous styles.

## Normalised Extract
## Table of Contents
1. FileHandle Class
   - appendFile(data[, options])
   - chmod(mode)
   - chown(uid, gid)
   - close()
   - createReadStream([options])
   - createWriteStream([options])
   - datasync()
   - read(buffer, offset, length, position)
   - read([options])
   - readableWebStream()
   - readFile(options)
   - readLines([options])
   - readv(buffers[, position])
   - stat([options])
   - sync()
   - truncate(len)
   - utimes(atime, mtime)
   - write(buffer, offset[, length[, position]])
   - write(buffer[, options])
   - write(string[, position[, encoding]])
   - writeFile(data, options)
   - writev(buffers[, position])
   - [Symbol.asyncDispose]()
2. fsPromises API
   - access(path[, mode])
   - appendFile(path, data[, options])
   - chmod(path, mode)
   - chown(path, uid, gid)
   - copyFile(src, dest[, mode])
   - cp(src, dest[, options])
   - glob(pattern[, options])
   - lchmod(path, mode)
   - lchown(path, uid, gid)
   - lutimes(path, atime, mtime)
   - link(existingPath, newPath)
   - lstat(path[, options])
   - mkdir(path[, options])
   - mkdtemp(prefix[, options])
   - open(path, flags[, mode])
   - opendir(path[, options])
   - readdir(path[, options])
   - readFile(path, options)
   - readlink(path, options)
   - realpath(path, options)
   - rename(oldPath, newPath)
   - rmdir(path[, options])
   - rm(path[, options])
   - stat(path, options)
   - statfs(path, options)
   - symlink(target, path[, type])
   - truncate(path[, len])
   - unlink(path)
   - utimes(path, atime, mtime)
   - watch(filename[, options])
3. Callback API
   - fs.method(..., callback(err, result))
4. Synchronous API
   - fs.methodSync(...)
5. Common Objects & Constants
   - fs.Dir, fs.Dirent, fs.FSWatcher, fs.StatWatcher, fs.ReadStream, fs.WriteStream, fs.Stats, fs.constants

## Detailed Technical Topics
### FileHandle Methods
- **appendFile:** Accepts various data types. Options support async iterable inputs and streams.
- **chmod/chown:** Modify file permissions and ownership using numeric modes and IDs.
- **Stream Methods:** `createReadStream` and `createWriteStream` include options to control `encoding`, `autoClose`, `emitClose`, byte ranges (`start`, `end`), and buffer sizes.
- **I/O Methods:** `read`, `readFile`, and `write` methods include precise parameters for buffer management, file position handling, and simultaneous operations.

### fsPromises API
- Contains asynchronous methods that return Promises which fulfill with data or `undefined` upon success. Methods mirror the callback and sync variants and include additional options for atomic file operations and safe file access checks.

### Callback & Synchronous APIs
- **Callback API:** Follows Node.js standard `(err, result)` pattern.
- **Synchronous API:** Blocks event loop and is wrapped in try/catch.

### Code Implementation Examples
Each method is illustrated with working code examples that demonstrate proper error handling and resource cleanup, ensuring no file descriptor leaks.


## Supplementary Details
### Supplementary Technical Specifications

- **Configuration Options for Streams:**
  - `createReadStream`: `encoding` (default: null), `autoClose` (true), `emitClose` (true), `start` (optional), `end` (default: Infinity), `highWaterMark` (64 * 1024), `signal` (undefined).
  - `createWriteStream`: `encoding` (default: 'utf8'), `autoClose` (true), `emitClose` (true), `start` (optional), `highWaterMark` (16384), `flush` (default: false).

- **Parameter Defaults and Effects:**
  - Most methods default numerical parameters using buffer sizes or file descriptor positions.
  - `read` methods update the file pointer when `position` is set to `null` or -1.

- **Implementation Steps for File Operations:**
  1. Open a file handle using `fsPromises.open()`.
  2. Perform read/write operations using provided methods (e.g. `readFile`, `writeFile`).
  3. Always close the file handle using `filehandle.close()` or via `[Symbol.asyncDispose]()`.
  4. For streams, ensure that options like `autoClose` are set correctly to avoid file descriptor leaks.

- **Best Practices:**
  - Use promise-based or callback-based methods consistently to avoid race conditions.
  - Always handle errors with try/catch in synchronous code and `.catch()` in promise chains.
  - Validate file access before operations, but do not rely on pre-checks due to race conditions (handle errors from the operation itself).

- **Troubleshooting Procedures:**
  - Run Node.js with increased debugging (`node --trace-warnings`) to monitor file descriptor warnings.
  - Use logging inside callbacks or promise error handlers to capture exact error messages.
  - Confirm parameter types and default values via console logging prior to operations.
  - For stream issues, ensure that `autoClose` and `emitClose` are set appropriately to trigger resource cleanup.


## Reference Details
### Complete API Specifications

#### FileHandle Class Methods

1. appendFile(data[, options])
   - Signature:
     ```js
     filehandle.appendFile(data: string | Buffer | TypedArray | DataView | AsyncIterable<any> | Iterable<any> | Stream, options?: { encoding?: string | null, signal?: AbortSignal } | string): Promise<void>
     ```
   - Returns: Promise<void>
   - Example:
     ```js
     // Append data using async/await
     await filehandle.appendFile('Hello World', { encoding: 'utf8' });
     ```

2. chmod(mode)
   - Signature:
     ```js
     filehandle.chmod(mode: number): Promise<void>
     ```
   - Example:
     ```js
     await filehandle.chmod(0o644);
     ```

3. chown(uid, gid)
   - Signature:
     ```js
     filehandle.chown(uid: number, gid: number): Promise<void>
     ```
   - Example:
     ```js
     await filehandle.chown(1000, 1000);
     ```

4. close()
   - Signature:
     ```js
     filehandle.close(): Promise<void>
     ```
   - Usage:
     ```js
     const filehandle = await open('file.txt', 'r');
     // ... perform operations ...
     await filehandle.close();
     ```

5. createReadStream([options])
   - Signature:
     ```js
     filehandle.createReadStream(options?: { encoding?: string | null, autoClose?: boolean, emitClose?: boolean, start?: number, end?: number, highWaterMark?: number, signal?: AbortSignal }): fs.ReadStream
     ```
   - Example:
     ```js
     const stream = filehandle.createReadStream({ start: 0, end: 99 });
     stream.on('data', chunk => console.log(chunk));
     ```

6. createWriteStream([options])
   - Signature:
     ```js
     filehandle.createWriteStream(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, highWaterMark?: number, flush?: boolean }): fs.WriteStream
     ```

7. read(buffer, offset, length, position)
   - Signature:
     ```js
     filehandle.read(buffer: Buffer | TypedArray | DataView, offset?: number, length?: number, position?: number | bigint | null): Promise<{ bytesRead: number, buffer: Buffer | TypedArray | DataView }>
     ```

8. readFile(options?: { encoding?: string | null, signal?: AbortSignal } | string)
   - Signature:
     ```js
     filehandle.readFile(options?: { encoding?: string | null, signal?: AbortSignal } | string): Promise<Buffer | string>
     ```

9. write(buffer, offset?, length?, position?)
   - Signature:
     ```js
     filehandle.write(buffer: Buffer | TypedArray | DataView, offset?: number, length?: number, position?: number | null): Promise<{ bytesWritten: number, buffer: Buffer | TypedArray | DataView }>
     ```

10. write(string, position?, encoding?)
    - Signature:
      ```js
      filehandle.write(string: string, position?: number | null, encoding?: string): Promise<{ bytesWritten: number, buffer: string }>
      ```

11. writeFile(data, options?)
    - Signature:
      ```js
      filehandle.writeFile(data: string | Buffer | TypedArray | DataView | AsyncIterable<any> | Iterable<any> | Stream, options?: { encoding?: string | null, signal?: AbortSignal } | string): Promise<void>
      ```

12. writev(buffers, position?)
    - Signature:
      ```js
      filehandle.writev(buffers: Array<Buffer | TypedArray | DataView>, position?: number | null): Promise<{ bytesWritten: number, buffers: Array<Buffer | TypedArray | DataView> }>
      ```

#### fsPromises API Methods (Selected Examples)

1. access(path, mode?)
   - Signature:
     ```js
     fsPromises.access(path: string | Buffer | URL, mode?: number): Promise<void>
     ```

2. appendFile(path, data, options?)
   - Signature:
     ```js
     fsPromises.appendFile(path: string | Buffer | URL | FileHandle, data: string | Buffer, options?: { encoding?: string | null, mode?: number, flag?: string, flush?: boolean } | string): Promise<void>
     ```

3. copyFile(src, dest, mode?)
   - Signature:
     ```js
     fsPromises.copyFile(src: string | Buffer | URL, dest: string | Buffer | URL, mode?: number): Promise<void>
     ```

4. open(path, flags, mode?)
   - Signature:
     ```js
     fsPromises.open(path: string | Buffer | URL, flags: string, mode?: number): Promise<FileHandle>
     ```

#### Code Example for Troubleshooting File Operations

```bash
# Run Node.js with trace warnings to debug file descriptor issues
node --trace-warnings app.js
```

```js
// Example: Handling errors during file read
import { open } from 'node:fs/promises';

(async () => {
  let filehandle;
  try {
    filehandle = await open('sample.txt', 'r');
    const data = await filehandle.readFile({ encoding: 'utf8' });
    console.log(data);
  } catch (error) {
    console.error('Error during file operation:', error);
  } finally {
    if (filehandle) await filehandle.close();
  }
})();
```

This detailed API specification provides all the necessary signatures, parameter definitions, default values, complete code examples, configuration options, best practices, and troubleshooting procedures for using the Node.js File System (fs) module effectively.


## Original Source
Node.js File System (fs) Documentation
https://nodejs.org/api/fs.html

## Digest of FILE_SYSTEM

# Node.js File System (fs) API Documentation

**Retrieved Date:** 2023-10-26

## Overview
This document extracts the full technical details from the Node.js fs API documentation. It includes promise-based, callback-based and synchronous method signatures, parameter specifications, return types, and full code examples. The document covers the FileHandle class, fsPromises API, Common Objects, and various configuration options.

## Table of Contents
1. FileHandle Class
2. fsPromises API
3. Callback API
4. Synchronous API
5. Common Objects and Constants
6. Code Examples

## 1. FileHandle Class
### Methods and Events
- **Event:** `'close'`
- **filehandle.appendFile(data[, options])**
  - **Parameters:**
    - `data`: `<string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable> | <Stream>`
    - `options`: `<Object> | <string>` with sub-options:
      - `encoding`: `<string> | <null>` (Default: `'utf8'`)
      - `signal`: `<AbortSignal> | <undefined>` (Default: `undefined`)
  - **Returns:** `<Promise>` that fulfills with `undefined`.
  - **Alias:** Equivalent to `filehandle.writeFile()`.

- **filehandle.chmod(mode)**
  - **Parameters:** `mode: <integer>`
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.chown(uid, gid)**
  - **Parameters:**
    - `uid: <integer>`
    - `gid: <integer>`
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.close()**
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.createReadStream([options])**
  - **Parameters:** `options: <Object>` with keys:
    - `encoding`: `<string>` (Default: `null`)
    - `autoClose`: `<boolean>` (Default: `true`)
    - `emitClose`: `<boolean>` (Default: `true`)
    - `start`: `<integer>`
    - `end`: `<integer>` (Default: `Infinity`)
    - `highWaterMark`: `<integer>` (Default: `64 * 1024`)
    - `signal`: `<AbortSignal> | <undefined>` (Default: `undefined`)
  - **Returns:** `<fs.ReadStream>`

- **filehandle.createWriteStream([options])**
  - **Parameters:** `options: <Object>` with keys:
    - `encoding`: `<string>` (Default: `'utf8'`)
    - `autoClose`: `<boolean>` (Default: `true`)
    - `emitClose`: `<boolean>` (Default: `true`)
    - `start`: `<integer>`
    - `highWaterMark`: `<number>` (Default: `16384`)
    - `flush`: `<boolean>` (Default: `false`)
  - **Returns:** `<fs.WriteStream>`

- **filehandle.datasync()**
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.read(buffer, offset, length, position)**
  - **Parameters:**
    - `buffer`: `<Buffer> | <TypedArray> | <DataView>`
    - `offset`: `<integer>` (Default: `0`)
    - `length`: `<integer>` (Default: `buffer.byteLength - offset`)
    - `position`: `<integer> | <bigint> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with an object: `{ bytesRead: <integer>, buffer: <Buffer> }`.

- **filehandle.read([options])** and **filehandle.read(buffer[, options])**: Variants that support options object with keys `buffer`, `offset`, `length`, and `position`.

- **filehandle.readableWebStream()**
  - **Returns:** `<ReadableStream>` that emits bytes.

- **filehandle.readFile(options)**
  - **Parameters:** `options: <Object> | <string>` (encoding option default: `null`)
  - **Returns:** `<Promise>` fulfilling with file contents as `<Buffer>` or `<string>`.

- **filehandle.readLines([options])**
  - **Parameters:** `options: <Object>` with keys like `encoding`, `autoClose`, `emitClose`, `start`, `end`, and `highWaterMark`.
  - **Returns:** `<readline.InterfaceConstructor>`.

- **filehandle.readv(buffers[, position])**
  - **Parameters:**
    - `buffers`: `<Buffer[]> | <TypedArray[]> | <DataView[]>`
    - `position`: `<integer> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with `{ bytesRead: <integer>, buffers: [...] }`.

- **filehandle.stat([options])**
  - **Parameters:** `options: <Object>` with key `bigint: <boolean>` (Default: `false`)
  - **Returns:** `<Promise>` fulfilling with `<fs.Stats>` object.

- **filehandle.sync()**
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.truncate(len)**
  - **Parameters:** `len: <integer>` (Default: `0` if negative)
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.utimes(atime, mtime)**
  - **Parameters:**
    - `atime`: `<number> | <string> | <Date>`
    - `mtime`: `<number> | <string> | <Date>`
  - **Returns:** `<Promise>` with no value on success.

- **filehandle.write(buffer, offset[, length[, position]])**
  - **Parameters:**
    - `buffer`: `<Buffer> | <TypedArray> | <DataView>`
    - `offset`: `<integer>`
    - `length`: `<integer>` (Default: `buffer.byteLength - offset`)
    - `position`: `<integer> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with an object: `{ bytesWritten: <integer>, buffer: <Buffer> }`.

- **filehandle.write(buffer[, options])** (variant with options object)
  - **Parameters:** `buffer` plus options: `{ offset, length, position }` with defaults: offset=0, length=`buffer.byteLength - offset`, position=`null`.
  - **Returns:** `<Promise>` as above.

- **filehandle.write(string[, position[, encoding]])**
  - **Parameters:**
    - `string`: `<string>`
    - `position`: `<integer> | <null>` (Default: `null`)
    - `encoding`: `<string>` (Default: `'utf8'`)
  - **Returns:** `<Promise>` fulfilling with `{ bytesWritten: <integer>, buffer: <string> }`.

- **filehandle.writeFile(data, options)**
  - **Parameters:**
    - `data`: `<string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable> | <Stream>`
    - `options`: `<Object> | <string>` with sub-options: `encoding` (Default: `'utf8'`), `signal` (Default: `undefined`)
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **filehandle.writev(buffers[, position])**
  - **Parameters:**
    - `buffers`: `<Buffer[]> | <TypedArray[]> | <DataView[]>`
    - `position`: `<integer> | <null>` (Default: `null`)
  - **Returns:** `<Promise>` fulfilling with an object: `{ bytesWritten: <integer>, buffers: [...] }`.

- **filehandle[Symbol.asyncDispose]()**
  - **Alias for filehandle.close()**. <small>(Experimental; added in v20.4.0)</small>

## 2. fsPromises API
Methods provided in the `fs/promises` module include:

- **fsPromises.access(path[, mode])**
  - **Parameters:**
    - `path`: `<string> | <Buffer> | <URL>`
    - `mode`: `<integer>` (Default: `fs.constants.F_OK`)
  - **Returns:** `<Promise>` that fulfills with `undefined`.

- **fsPromises.appendFile(path, data[, options])**
  - **Parameters:**
    - `path`: `<string> | <Buffer> | <URL> | <FileHandle>`
    - `data`: `<string> | <Buffer>`
    - `options`: `<Object> | <string>` with keys: `encoding` (Default: `'utf8'`), `mode` (Default: `0o666`), `flag` (Default: `'a'`), `flush` (Default: `false`)
  - **Returns:** `<Promise>`.

- **fsPromises.chmod(path, mode)**, **fsPromises.chown(path, uid, gid)**, **fsPromises.copyFile(src, dest[, mode])**, etc.

Additional fsPromises methods include:
`cp`, `glob`, `lchmod`, `lchown`, `lutimes`, `link`, `lstat`, `mkdir`, `mkdtemp`, `open`, `opendir`, `readdir`, `readFile`, `readlink`, `realpath`, `rename`, `rmdir`, `rm`, `stat`, `statfs`, `symlink`, `truncate`, `unlink`, `utimes`, `watch`, and more.

## 3. Callback API
All the fs methods (e.g. `fs.access`, `fs.appendFile`, `fs.chmod`, etc.) are available with a callback form. The callback signature typically follows:

```js
fs.method(arguments, (err, result) => {
  if (err) {
    // handle error
  } else {
    // process result if available
  }
});
```

Examples:

```js
const { unlink } = require('node:fs');

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

## 4. Synchronous API
Synchronous methods in fs block the event loop and throw errors immediately.

Example:

```js
const { unlinkSync } = require('node:fs');

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle error
}
```

## 5. Common Objects and Constants
### Class: fs.Dir
- Methods: `close()`, `closeSync()`, `read()`, `readSync()`, and supports `[Symbol.asyncIterator]()`.

### Class: fs.Dirent
- Methods: `isBlockDevice()`, `isCharacterDevice()`, `isDirectory()`, `isFIFO()`, `isFile()`, `isSocket()`, `isSymbolicLink()`, along with properties `name`, `parentPath`, and `path`.

### Other Common Classes:
- `fs.FSWatcher`, `fs.StatWatcher`, `fs.ReadStream`, `fs.WriteStream`, and `fs.Stats` with various properties and methods to inspect file metadata.

### Constants:
- `fs.constants` include file access, copy, open, type, and mode constants.

## 6. Code Examples
### Promise-based Example

```js
import { unlink } from 'node:fs/promises';

(async () => {
  try {
    await unlink('/tmp/hello');
    console.log('successfully deleted /tmp/hello');
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})();
```

### Callback Example

```js
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

### Synchronous Example

```js
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```


## Attribution
- Source: Node.js File System (fs) Documentation
- URL: https://nodejs.org/api/fs.html
- License: License: MIT License
- Crawl Date: 2025-04-21T09:47:24.395Z
- Data Size: 4242134 bytes
- Links Found: 5296

## Retrieved
2025-04-21

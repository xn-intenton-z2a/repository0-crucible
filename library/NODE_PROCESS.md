# NODE_PROCESS

## Crawl Summary
The Node.js Process documentation details numerous events (beforeExit, exit, disconnect, message, multipleResolves, rejectionHandled, workerMessage, uncaughtException, uncaughtExceptionMonitor, unhandledRejection, warning, worker, and signal events) and methods/properties (abort, allowedNodeEnvironmentFlags, arch, argv, argv0, channel, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, emitWarning, exit, and many others). Each event and method includes explicit signatures, version information, parameter types, return types, and concrete code examples.

## Normalised Extract
## Table of Contents
1. Process Events
   - beforeExit (Code: `process.on('beforeExit', (code: number) => void)`)
   - exit (Code: `process.on('exit', (code: number) => void)`)
   - disconnect
   - message (Code: `process.on('message', (message, sendHandle) => void)`)
   - multipleResolves (Code: `process.on('multipleResolves', (type, promise, reason) => void)`)
   - rejectionHandled (Code: `process.on('rejectionHandled', (promise) => void)`)
   - workerMessage (Code: `process.on('workerMessage', (value, source) => void)`)
   - uncaughtException (Code: `process.on('uncaughtException', (err, origin) => void)`)
   - uncaughtExceptionMonitor (Code: `process.on('uncaughtExceptionMonitor', (err, origin) => void)`)
   - unhandledRejection (Code: `process.on('unhandledRejection', (reason, promise) => void)`)
   - warning (Code: `process.on('warning', (warning) => void)`)
   - Signal events (e.g., SIGINT, SIGTERM handled via `process.on(signal, handler)`)
2. Process Methods and Properties
   - abort(): `process.abort()`
   - allowedNodeEnvironmentFlags: Read-only Set with custom flag detection
   - arch: `process.arch` returns string (e.g., 'x64')
   - argv & argv0: Command-line arguments arrays
   - channel: IPC channel object with methods `.ref()` and `.unref()`
   - chdir(directory): `process.chdir(directory)`
   - config: Frozen object with build configuration
   - connected: Boolean for IPC connection
   - constrainedMemory(): Returns number (bytes)
   - availableMemory(): Returns number (bytes)
   - cpuUsage([previousValue]): Returns { user: number, system: number }
   - cwd(): `process.cwd()` returns current working directory
   - debugPort: Debugger port number
   - disconnect(): Closes IPC channel
   - dlopen(module, filename, [flags]): Loads shared objects (e.g., C++ addons)
   - emitWarning(): Emits warnings with options { type, code, ctor, detail }
   - Additional properties and methods: env, execArgv, exit, finalization, getegid, geteuid, getgid, getgroups, getuid, hrtime, kill, memoryUsage, nextTick, umask, uptime, version, and versions.

### Detailed Code Examples

#### Process Event Example
```js
const process = require('node:process');
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code:', code);
});
process.on('exit', (code) => {
  console.log('Process exit event with code:', code);
});
console.log('This message is displayed first.');
```

#### dlopen Example
```js
const { dlopen } = require('node:process');
const { constants } = require('node:os');
const { join } = require('node:path');
const mod = { exports: {} };
dlopen(mod, join(__dirname, 'local.node'), constants.dlopen.RTLD_NOW);
mod.exports.foo();
```

#### emitWarning Example
```js
process.emitWarning('Something happened!', {
  type: 'CustomWarning',
  code: 'WARN001',
  detail: 'This is some additional information'
});
```

## Detailed Topic Information
- **Process Events:** Include callback parameters and version details.
- **Process Methods:** Each method shows required parameters, return type, default values, and error conditions (e.g., `chdir()` throws if directory does not exist).
- **Configuration:** The `process.config` object displays build-time configurations in JSON format.

This extract provides directly usable code and configuration information for developers integrating Node.js process control in their applications.

## Supplementary Details
### Technical Specifications and Implementation Details

1. **Parameter Details and Defaults**:
   - `process.chdir(directory: string)`: Throws an Error if `directory` does not exist.
   - `process.cpuUsage(previousValue?: { user: number, system: number })`: Returns an object with microsecond counts for user and system CPU times.
   - `process.dlopen(module: Object, filename: string, flags?: number)`: Defaults to `os.constants.dlopen.RTLD_LAZY` if flags are not provided.
   - `process.emitWarning(warning, options)`: Options include `type` (default 'Warning'), `code`, `ctor`, and `detail`.

2. **Implementation Steps for IPC and Events**:
   - For processes started with IPC, use `process.channel.ref()` to prevent accidental process exit and `process.channel.unref()` to allow exit.
   - Add event listeners immediately upon process start to capture early events (e.g., uncaughtException, unhandledRejection).

3. **Troubleshooting Procedures**:
   - If maximum listener warnings occur, call `emitter.setMaxListeners(n)` to adjust limits.
   - Use `process.memoryUsage()` and `process.cpuUsage()` to diagnose performance issues.
   - For detailed warning stack traces, run Node.js with the `--trace-warnings` flag.

4. **Configuration Options and Effects**:
   - Use command-line options such as `--no-warnings`, `--throw-deprecation`, and `--trace-deprecation` to modify process behavior regarding warnings and deprecations.

5. **Code Example Best Practices:**
   - Always perform synchronous cleanup in `uncaughtException` handlers to avoid undefined states.
   - Validate incoming messages in IPC by checking types and using JSON serialization as required.
   - Ensure proper flag formatting when utilizing `process.allowedNodeEnvironmentFlags` for environment security.


## Reference Details
### Complete API Specifications and Code Samples

#### Event Listeners

- **beforeExit:**
  ```js
  process.on('beforeExit', (code: number) => {
    // code: exit code before process shutdown
    console.log('Process beforeExit event with code:', code);
  });
  ```

- **exit:**
  ```js
  process.on('exit', (code: number) => {
    // Synchronous cleanup only
    console.log(`About to exit with code: ${code}`);
  });
  ```

- **disconnect:**
  ```js
  process.on('disconnect', () => {
    // IPC channel closed
  });
  ```

- **message:**
  ```js
  process.on('message', (message: Object | boolean | number | string | null, sendHandle?: Object) => {
    // Handle IPC message
  });
  ```

- **multipleResolves:**
  ```js
  process.on('multipleResolves', (type: string, promise: Promise<any>, reason: any) => {
    console.error(type, promise, reason);
  });
  ```

- **rejectionHandled:**
  ```js
  process.on('rejectionHandled', (promise: Promise<any>) => {
    // Promise rejection now handled
  });
  ```

- **workerMessage:**
  ```js
  process.on('workerMessage', (value: any, source: number) => {
    console.log('Worker message received:', value, 'from', source);
  });
  ```

- **uncaughtException:**
  ```js
  process.on('uncaughtException', (err: Error, origin: string) => {
    // Log error and perform synchronous cleanup
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
  });
  ```

- **uncaughtExceptionMonitor:**
  ```js
  process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => {
    // Monitor exceptions without overriding default behavior
    MyMonitoringTool.logSync(err, origin);
  });
  ```

- **unhandledRejection:**
  ```js
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  ```

- **warning:**
  ```js
  process.on('warning', (warning: Error) => {
    console.warn(warning.name);
    console.warn(warning.message);
    console.warn(warning.stack);
  });
  ```

- **Signal Events Example:**
  ```js
  process.on('SIGINT', () => {
    console.log('Received SIGINT. Press Control-D to exit.');
  });
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM.');
  });
  ```

#### Methods and Properties

- **abort():**
  ```js
  process.abort(); // Immediately aborts the process and generates a core file
  ```

- **allowedNodeEnvironmentFlags:** (Read-only Set)
  ```js
  const { allowedNodeEnvironmentFlags } = require('node:process');
  allowedNodeEnvironmentFlags.forEach((flag) => {
    console.log(flag);
  });
  ```

- **arch:**
  ```js
  console.log(`Processor architecture: ${process.arch}`);
  ```

- **argv & argv0:**
  ```js
  process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
  console.log('Original argv0:', process.argv0);
  ```

- **chdir(directory):**
  ```js
  try {
    process.chdir('/tmp');
    console.log(`New directory: ${process.cwd()}`);
  } catch (err) {
    console.error(`chdir error: ${err}`);
  }
  ```

- **config:**
  ```js
  console.log(process.config);
  // Example output:
  /*
  {
    target_defaults: { ... },
    variables: {
      host_arch: 'x64',
      napi_build_version: 5,
      node_install_npm: 'true',
      ...
    }
  }
  */
  ```

- **cpuUsage():**
  ```js
  const startUsage = process.cpuUsage();
  // perform some operations
  console.log(process.cpuUsage(startUsage));
  ```

- **dlopen(module, filename, [flags]):** Refer to the example above.

- **emitWarning():**
  ```js
  process.emitWarning('Something happened!', 'CustomWarning', 'WARN001');
  ```
  or with options:
  ```js
  process.emitWarning('Something happened!', {
    type: 'CustomWarning',
    code: 'WARN001',
    detail: 'This is some additional information'
  });
  ```

#### Troubleshooting Commands

1. **Max Listeners Warning:**
   - Command: Increase listeners limit: `emitter.setMaxListeners(20)`
   - Expected: Warning message is suppressed when adding multiple listeners.

2. **Memory & CPU Usage Diagnostics:**
   - Commands: 
     ```js
     console.log(process.memoryUsage());
     console.log(process.cpuUsage());
     ```
   - Expected: Output object with memory usage in bytes and CPU usage in microseconds.

3. **Warning Trace:**
   - Launch Node.js with: `node --trace-warnings yourApp.js`
   - Expected: Full stack trace for any warnings emitted.

This complete API specification provides developers with all necessary details to implement and troubleshoot Node.js process functionalities directly in their code.

## Original Source
Node.js Process Documentation
https://nodejs.org/api/process.html

## Digest of NODE_PROCESS

# Process Documentation

**Retrieved:** 2023-10-19

## Overview
This document presents the complete technical details of the Node.js Process API as defined in the official documentation (Node.js v23.11.0). It includes the exact event specifications, method signatures, configuration details, and code examples.

## Process Events

### beforeExit (Added in: v0.11.12)
- **Signature:** `process.on('beforeExit', (code: number) => void)`
- **Description:** Emitted when Node.js empties its event loop and no work is scheduled. Listener receives the exit code as an argument.
- **Example:**
```js
const process = require('node:process');
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code:', code);
});
```

### exit (Added in: v0.1.7)
- **Signature:** `process.on('exit', (code: number) => void)`
- **Description:** Emitted when the process is about to exit. Listener receives the exit code. Only synchronous operations are allowed.
- **Example:**
```js
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

### disconnect (Added in: v0.7.7)
- **Signature:** `process.on('disconnect', () => void)`
- **Description:** Emitted when the IPC channel is closed (for spawned processes with IPC).

### message (Added in: v0.5.10)
- **Signature:** `process.on('message', (message: Object | boolean | number | string | null, sendHandle?: Object) => void)`
- **Description:** Emitted when a message is received from a parent process via IPC.

### multipleResolves (Added in: v10.12.0, Deprecated since v17.6.0)
- **Signature:** `process.on('multipleResolves', (type: string, promise: Promise<any>, reason: any) => void)`
- **Description:** Emitted when a promise is resolved or rejected more than once.

### rejectionHandled (Added in: v1.4.1)
- **Signature:** `process.on('rejectionHandled', (promise: Promise<any>) => void)`
- **Description:** Emitted when a previously unhandled rejection gets a handler.

### workerMessage (Added in: v22.5.0)
- **Signature:** `process.on('workerMessage', (value: any, source: number) => void)`
- **Description:** Emitted for incoming messages sent via `postMessageToThread()`.

### uncaughtException (Added in: v0.1.18)
- **Signature:** `process.on('uncaughtException', (err: Error, origin: string) => void)`
- **Description:** Emitted when an exception bubbles back to the event loop. Overrides default behavior if a listener is added.

### uncaughtExceptionMonitor (Added in: v13.7.0)
- **Signature:** `process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => void)`
- **Description:** Monitors uncaught exceptions without changing the default process exit behavior.

### unhandledRejection (Added in: v1.4.1)
- **Signature:** `process.on('unhandledRejection', (reason: any, promise: Promise<any>) => void)`
- **Description:** Emitted when a promise rejection is not handled within a turn of the event loop.

### warning (Added in: v6.0.0)
- **Signature:** `process.on('warning', (warning: Error) => void)`
- **Description:** Emitted when Node.js emits a process warning. Contains properties such as `name`, `message`, `stack`, and `code`.

### Signal Events
- **Description:** Events such as `'SIGINT'`, `'SIGTERM'`, etc. are emitted when the process receives respective POSIX signals. The callback receives the signal string (e.g., 'SIGINT').

## Process Methods and Properties

### abort()
- **Signature:** `process.abort(): void`
- **Description:** Immediately exits the process and generates a core file.

### allowedNodeEnvironmentFlags
- **Type:** Read-only `Set<string>`
- **Description:** Contains flags allowed in the `NODE_OPTIONS` environment variable. Overrides default `Set.prototype.has` to recognize various flag formats.

### arch
- **Type:** `string`
- **Description:** CPU architecture for which Node.js was compiled. Possible values: `'arm'`, `'arm64'`, `'ia32'`, `'x64'`, etc.

### argv & argv0
- **Type:** `string[]` and `string`
- **Description:** Command-line arguments. `argv[0]` is the Node.js executable, and `argv0` is a read-only copy of the original argv[0].

### channel
- **Type:** `Object | undefined`
- **Description:** IPC channel reference if the process has been spawned with one.
- **Methods:** `process.channel.ref()` to keep the event loop running, `process.channel.unref()` to allow exit.

### chdir(directory)
- **Signature:** `process.chdir(directory: string): void`
- **Description:** Changes the current working directory. Throws an exception on failure.

### config
- **Type:** `Object` (frozen)
- **Description:** Contains the configuration options used to compile the Node.js executable (same as config.gypi).

### connected
- **Type:** `boolean`
- **Description:** Indicates if the IPC channel is connected.

### constrainedMemory()
- **Signature:** `process.constrainedMemory(): number`
- **Description:** Returns the memory available under OS constraints in bytes (Experimental).

### availableMemory()
- **Signature:** `process.availableMemory(): number`
- **Description:** Returns the free memory available to the process in bytes (Experimental).

### cpuUsage([previousValue])
- **Signature:** `process.cpuUsage(previousValue?: {user: number, system: number}): {user: number, system: number}`
- **Description:** Returns CPU usage in microseconds. Passing a previous value returns the difference.

### cwd()
- **Signature:** `process.cwd(): string`
- **Description:** Returns the current working directory.

### debugPort
- **Type:** `number`
- **Description:** The port used by the Node.js debugger.

### disconnect()
- **Signature:** `process.disconnect(): void`
- **Description:** Closes the IPC channel if present.

### dlopen(module, filename[, flags])
- **Signature:** `process.dlopen(module: Object, filename: string, flags?: number): void`
- **Default Flags:** `os.constants.dlopen.RTLD_LAZY`
- **Description:** Dynamically loads shared objects (primarily used for C++ addons).
- **Example:**
```js
const { dlopen } = require('node:process');
const { constants } = require('node:os');
const { join } = require('node:path');
const mod = { exports: {} };
dlopen(mod, join(__dirname, 'local.node'), constants.dlopen.RTLD_NOW);
mod.exports.foo();
```

### emitWarning()
- **Signature:** 
  - `process.emitWarning(warning: string | Error, options?: { type?: string, code?: string, ctor?: Function, detail?: string }): void`
  - Overloaded: `process.emitWarning(warning: string | Error, type?: string, code?: string, ctor?: Function): void`
- **Description:** Emits a custom warning. Default type is 'Warning'.
- **Example:**
```js
process.emitWarning('Something happened!', {
  type: 'CustomWarning',
  code: 'WARN001',
  detail: 'This is some additional information'
});
```

### Other Methods and Properties
A number of additional methods and properties are available including but not limited to:
- `process.env`, `process.execArgv`, `process.execPath`, `process.exit([code])`, `process.finalization.register()` and related methods, `process.getegid()`, `process.geteuid()`, `process.getgid()`, `process.getgroups()`, `process.getuid()`, `process.hrtime()`, `process.hrtime.bigint()`, `process.kill(pid, [signal])`, `process.memoryUsage()`, `process.nextTick()`, `process.umask()`, `process.uptime()`, `process.version`, and `process.versions`.

## Best Practices and Troubleshooting

- **Uncaught Exception Handling:**
  Use `process.on('uncaughtException', ...)` strictly for synchronous cleanup. Never resume normal operation as the application may be unstable.

- **Event Loop Caution:**
  Ensure that exit event listeners perform only synchronous operations, as queued asynchronous tasks will be abandoned.

- **Warning Management:**
  To control warning outputs, use command-line flags such as `--no-warnings`, `--trace-warnings`, `--throw-deprecation`, and `--trace-deprecation`.

- **IPC Channel Usage:**
  When using child processes with IPC (via `child_process.fork()`), manage connection with `process.channel.ref()` and `process.channel.unref()`, and disconnect using `process.disconnect()` when appropriate.

- **Resource Monitoring:**
  Monitor system performance using `process.cpuUsage()` and `process.memoryUsage()`.

## Attribution

- **Source URL:** https://nodejs.org/api/process.html
- **Data Size:** 3825043 bytes
- **Links Found:** 2972
- **No errors reported.**

## Attribution
- Source: Node.js Process Documentation
- URL: https://nodejs.org/api/process.html
- License: License: MIT License
- Crawl Date: 2025-04-21T03:07:20.173Z
- Data Size: 3825043 bytes
- Links Found: 2972

## Retrieved
2025-04-21

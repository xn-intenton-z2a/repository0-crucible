# NODE_PROCESS

## Crawl Summary
The crawled content provides comprehensive details of the Node.js process API. It includes explicit specifications for process events (beforeExit, exit, disconnect, message, multipleResolves, rejectionHandled, workerMessage, uncaughtException, uncaughtExceptionMonitor, unhandledRejection, and warning), methods (abort, allowedNodeEnvironmentFlags, chdir, cwd, cpuUsage, debugPort, dlopen, emitWarning, etc.), properties (arch, argv, argv0, config, connected) and signal handling. Full code examples are provided for each event and method along with their signatures, parameters, types, and usage patterns.

## Normalised Extract
## Table of Contents
1. Process Events
   - beforeExit: `process.on('beforeExit', (code: number) => void)`
   - exit: `process.on('exit', (code: number) => void)`
   - disconnect: `process.on('disconnect', () => void)`
   - message: `process.on('message', (message, sendHandle) => void)`
   - multipleResolves: `process.on('multipleResolves', (type: string, promise: Promise, reason: any) => void)`
   - rejectionHandled: `process.on('rejectionHandled', (promise: Promise) => void)`
   - workerMessage: `process.on('workerMessage', (value: any, source: number) => void)`
   - uncaughtException: `process.on('uncaughtException', (err: Error, origin: string) => void)`
   - uncaughtExceptionMonitor: `process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => void)`
   - unhandledRejection: `process.on('unhandledRejection', (reason: any, promise: Promise) => void)`
   - warning: `process.on('warning', (warning: Error) => void)`
   - worker: `process.on('worker', (worker: Worker) => void)`
   - Signal events: Attach listeners for SIGINT, SIGTERM, etc.

2. Process Methods and Properties
   - abort(): `process.abort()`
   - allowedNodeEnvironmentFlags: Read-only Set, iterated via `forEach`
   - arch: Returns a string value e.g. 'x64'
   - argv & argv0: Arrays of command-line arguments
   - channel: Provides methods `ref()` and `unref()` if IPC is in effect
   - chdir(directory: string): Changes the working directory
   - config: Frozen object representation of compile options
   - connected: Boolean indicating IPC connection state
   - constrainedMemory() and availableMemory(): Return number values (bytes)
   - cpuUsage([previousValue]): Returns `{ user: number, system: number }`
   - cwd(): Returns current working directory
   - debugPort: Number value for debugger port
   - disconnect(): Closes the IPC channel
   - dlopen(module, filename, [flags]): Loads shared objects
   - emitWarning(): Various signatures to emit warnings

### Detailed Information for Each Topic

**Process Events:**
- beforeExit: Triggered when the event loop is empty. Use to schedule async work. 
- exit: Receives exit code; must execute only synchronous code.
- disconnect: Fired when IPC channel is closed.
- message: Handles messages via IPC. The serialized message can be Object, string, number, etc.
- multipleResolves: Monitors multiple resolutions of a promise. Useful to detect coding errors.
- rejectionHandled: Fired when an unhandled promise later gets a rejection handler.
- uncaughtException & uncaughtExceptionMonitor: Provides mechanisms to catch errors not caught by try/catch.
- unhandledRejection: Catches rejected promises with no handler.
- warning: Emitted for process warnings; can be custom or system warnings.

**Process Methods and Properties:**
- abort(): Immediately terminates the process and generates a core dump.
- allowedNodeEnvironmentFlags: Validates NODE_OPTIONS flags. Iteration yields flags with proper formatting.
- arch: Returns CPU architecture string.
- argv: Array where argv[0] is the node executable, argv[1] is the script name, etc.
- argv0: Original value of argv[0].
- channel.ref() and channel.unref(): Modify the behavior of IPC channel towards keeping the event loop alive.
- chdir(directory): Changes working directory, throwing an exception if directory does not exist.
- config: Includes detailed build configurations. Example structure provided.
- cpuUsage(): Provides current CPU usage in microseconds.
- dlopen(): Loads C++ Addons; requires module object, filename, and flag (default RTLD_LAZY unless overridden).
- emitWarning(): Supports multiple argument signatures for emitting warnings.

This extract provides specific, immediately applicable, technical details complete with example code and exact parameter information.


## Supplementary Details
### Supplementary Technical Specifications

1. **Method Signatures and Parameters:**
   - process.on(event: string, listener: Function): Adds an event listener for the specified event.
   - process.abort(): void
   - process.allowedNodeEnvironmentFlags: Set<string> (read-only)
   - process.arch: string
   - process.argv: string[]
   - process.argv0: string
   - process.chdir(directory: string): void
   - process.cpuUsage(previousValue?: { user: number, system: number }): { user: number, system: number }
   - process.dlopen(module: Object, filename: string, flags?: number): void
   - process.emitWarning(warning: string|Error, options?: { type?: string, code?: string, detail?: string, ctor?: Function }): void

2. **Configuration Options and Defaults:**
   - dlopen flags: Defaults to os.constants.dlopen.RTLD_LAZY if not provided.
   - Warning options: Default type is 'Warning'; if a code is not given, no unique identifier is added.

3. **Implementation Steps:**
   - Attach event listeners as demonstrated in the examples.
   - Use synchronous cleanup within 'exit' and 'uncaughtException' handlers.
   - Validate inputs (e.g. for process.chdir) before invocation.
   - Use process.cpuUsage with a previous reading to measure delta times.

4. **Best Practices:**
   - Use process.on('unhandledRejection') to monitor for asynchronous errors.
   - Use process.emitWarning() with detailed messages and codes for clear diagnostics.
   - Avoid asynchronous operations in 'exit' event handlers.
   - For IPC channels, correctly manage refs via process.channel.ref() and process.channel.unref().

5. **Troubleshooting Procedures:**
   - For unexpected exits, check synchronous execution in 'exit' listeners.
   - For memory issues, verify constrainedMemory() and availableMemory() outputs.
   - Use --trace-warnings or --throw-deprecation flags for detailed runtime diagnostics.
   - Monitor unhandled rejection maps to catch asynchronous errors.


## Reference Details
### Complete API Specifications and Code Examples

1. **Event Listener API:**
   - Syntax: `process.on(event: string, listener: Function): process`
   - Example:
     ```javascript
     process.on('exit', (code: number): void => {
       console.log(`About to exit with code: ${code}`);
     });
     ```

2. **process.abort()**
   - Signature: `process.abort(): void`
   - Usage: Immediately terminates the Node.js process and produces a core dump.

3. **process.allowedNodeEnvironmentFlags**
   - Type: Read-only Set<string>
   - Usage Example:
     ```javascript
     import { allowedNodeEnvironmentFlags } from 'node:process';
     allowedNodeEnvironmentFlags.forEach((flag: string) => {
       console.log(flag);
     });
     ```
   - Note: Iteration returns flags in standardized format (e.g. '--inspect-brk').

4. **process.arch**
   - Type: string
   - Possible Values: 'arm', 'arm64', 'ia32', 'loong64', 'mips', 'mipsel', 'ppc', 'ppc64', 'riscv64', 's390', 's390x', 'x64'
   - Example:
     ```javascript
     import { arch } from 'node:process';
     console.log(`Architecture: ${arch}`);
     ```

5. **process.argv & process.argv0**
   - process.argv: Array of strings
   - process.argv0: string (read-only original argv[0])
   - Example:
     ```javascript
     import { argv, argv0 } from 'node:process';
     argv.forEach((val, index) => {
       console.log(`${index}: ${val}`);
     });
     console.log('Original argv0:', argv0);
     ```

6. **IPC Channel Methods (process.channel)**
   - Methods:
     - `process.channel.ref(): void`
     - `process.channel.unref(): void`
   - Usage: Ensure the IPC channel keeps or releases the event loop as needed.

7. **process.chdir(directory)**
   - Signature: `process.chdir(directory: string): void`
   - Throws an exception if the directory does not exist.
   - Example:
     ```javascript
     import { chdir, cwd } from 'node:process';
     console.log(`Current: ${cwd()}`);
     try {
       chdir('/tmp');
       console.log(`Changed to: ${cwd()}`);
     } catch (err) {
       console.error(`Error: ${err}`);
     }
     ```

8. **process.config**
   - Type: Object (Frozen)
   - Contains build configuration (see sample output in section 2).

9. **process.cpuUsage()**
   - Signature: `process.cpuUsage(previousValue?: { user: number, system: number }): { user: number, system: number }`
   - Use: To measure CPU consumption; pass a previous reading to get a diff.
   - Example:
     ```javascript
     import { cpuUsage } from 'node:process';
     const start = cpuUsage();
     // ... perform tasks
     console.log(cpuUsage(start));
     ```

10. **process.dlopen(module, filename, [flags])**
    - Signature: `process.dlopen(module: Object, filename: string, flags?: number): void`
    - Flags: Default is os.constants.dlopen.RTLD_LAZY. Can be set to os.constants.dlopen.RTLD_NOW for immediate symbol resolution.
    - Example:
      ```javascript
      import { dlopen } from 'node:process';
      import { constants } from 'node:os';
      import { fileURLToPath } from 'node:url';
      const module = { exports: {} };
      dlopen(module, fileURLToPath(new URL('local.node', import.meta.url)), constants.dlopen.RTLD_NOW);
      module.exports.foo();
      ```

11. **process.emitWarning()**
    - Signatures:
      1. `process.emitWarning(warning: string|Error, { type?: string, code?: string, detail?: string, ctor?: Function }): void`
      2. `process.emitWarning(warning: string|Error, type?: string, code?: string, ctor?: Function): void`
    - Example using options:
      ```javascript
      import process from 'node:process';
      process.emitWarning('Something happened!', {
        code: 'MY_WARNING',
        detail: 'Additional detail about the warning'
      });
      ```
    - Example using separate arguments:
      ```javascript
      import process from 'node:process';
      process.emitWarning('Something happened!', 'CustomWarning', 'WARN001');
      ```

**Troubleshooting:**
- Use command-line flags:
  - `--no-warnings` to suppress warnings output while still emitting events.
  - `--trace-warnings` to get a full stack trace for warnings.
  - `--throw-deprecation` to convert deprecation warnings into exceptions.
- Examine the outputs from `process.cpuUsage()`, `process.constrainedMemory()`, and `process.availableMemory()` for resource monitoring.
- Ensure that in 'exit' listeners, only synchronous code executes.

This detailed reference serves as a complete guide for developers to implement, configure, and troubleshoot usage of the Node.js Process API without needing additional external references.


## Original Source
Node.js Process Documentation
https://nodejs.org/api/process.html

## Digest of NODE_PROCESS

# Node.js Process Documentation

**Retrieved on:** 2023-10-27

This document contains the full technical details extracted directly from the Node.js Process API documentation. It includes complete API specifications, method signatures with parameters and return types, full code examples, configuration options with exact values and effects, and detailed troubleshooting procedures.

# Table of Contents

1. Process Overview
2. Process Events
   - beforeExit
   - exit
   - disconnect
   - message
   - multipleResolves
   - rejectionHandled
   - workerMessage
   - uncaughtException
   - uncaughtExceptionMonitor
   - unhandledRejection
   - warning
   - worker
   - Signal Events
3. Process Methods and Properties
   - process.abort()
   - process.allowedNodeEnvironmentFlags
   - process.arch
   - process.argv & process.argv0
   - process.channel and its methods (ref, unref)
   - process.chdir(directory)
   - process.config
   - process.connected
   - process.constrainedMemory()
   - process.availableMemory()
   - process.cpuUsage([previousValue])
   - process.cwd()
   - process.debugPort
   - process.disconnect()
   - process.dlopen(module, filename[, flags])
   - process.emitWarning()
4. Detailed Code Examples

# 1. Process Overview

The Node.js `process` object provides information about the current Node.js process. It is an instance of an EventEmitter and exposes a variety of properties and methods that allow detailed control over the process lifecycle, including event handling for process events and access to low-level process information.

# 2. Process Events

## beforeExit

- **Description:** Emitted when Node.js empties its event loop and has no additional work scheduled. Listeners can schedule asynchronous work.
- **Signature:** `process.on('beforeExit', (code: number) => void)`

**Code Example:**

```javascript
import process from 'node:process';

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code:', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code:', code);
});

console.log('This message is displayed first.');
```

## exit

- **Description:** Emitted when the process is about to exit, either when `process.exit()` is called or when no more work is scheduled. Listeners receive the exit code.
- **Signature:** `process.on('exit', (code: number) => void)`

**Code Example:**

```javascript
import process from 'node:process';

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

## disconnect

- **Description:** Emitted when the IPC channel is closed (applicable when spawned with an IPC channel).
- **Signature:** `process.on('disconnect', () => void)`

## message

- **Description:** Emitted for incoming messages on an IPC channel.
- **Signature:** `process.on('message', (message: Object|string|number|boolean|null, sendHandle?: Object) => void)`

## multipleResolves

- **Description:** Emitted when a Promise has been resolved or rejected more than once.
- **Signature:** `process.on('multipleResolves', (type: string, promise: Promise<any>, reason: any) => void)`

**Code Example:**

```javascript
import process from 'node:process';

process.on('multipleResolves', (type, promise, reason) => {
  console.error(type, promise, reason);
  setImmediate(() => process.exit(1));
});

async function main() {
  try {
    return await new Promise((resolve, reject) => {
      resolve('First call');
      resolve('Swallowed resolve');
      reject(new Error('Swallowed reject'));
    });
  } catch {
    throw new Error('Failed');
  }
}

main().then(console.log);
```

## rejectionHandled

- **Description:** Emitted when a previously unhandled rejection gets a handler.
- **Signature:** `process.on('rejectionHandled', (promise: Promise<any>) => void)`

**Code Example:**

```javascript
import process from 'node:process';

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});
```

## workerMessage

- **Description:** Emitted on receiving a message from another worker thread via `postMessageToThread()`.
- **Signature:** `process.on('workerMessage', (value: any, source: number) => void)`

## uncaughtException

- **Description:** Emitted when an exception is thrown but not caught, allowing a custom handler to override the default behavior.
- **Signature:** `process.on('uncaughtException', (err: Error, origin: string) => void)`

**Code Example:**

```javascript
import process from 'node:process';
import fs from 'node:fs';

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(process.stderr.fd, `Caught exception: ${err}\nException origin: ${origin}\n`);
});

// This will cause an uncaught exception
nonexistentFunc();
```

## uncaughtExceptionMonitor

- **Description:** Emitted before an `uncaughtException` event, useful for monitoring without altering default behavior.
- **Signature:** `process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => void)`

**Code Example:**

```javascript
import process from 'node:process';

process.on('uncaughtExceptionMonitor', (err, origin) => {
  MyMonitoringTool.logSync(err, origin);
});

nonexistentFunc();
```

## unhandledRejection

- **Description:** Emitted when a promise is rejected without a `.catch()` handler.
- **Signature:** `process.on('unhandledRejection', (reason: any, promise: Promise<any>) => void)`

**Code Example:**

```javascript
import process from 'node:process';

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

somePromise.then((res) => {
  return reportToUser(JSON.parse(res));
});
```

## warning

- **Description:** Emitted for process warnings including custom warnings emitted via `process.emitWarning()`.
- **Signature:** `process.on('warning', (warning: Error) => void)`

**Code Example:**

```javascript
import process from 'node:process';

process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.stack);
});
```

## worker

- **Description:** Emitted after a new Worker thread is created.
- **Signature:** `process.on('worker', (worker: Worker) => void)`

## Signal Events

Signals such as SIGINT, SIGTERM, etc. are handled by attaching listeners. For example:

```javascript
import process from 'node:process';

function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
```

# 3. Process Methods and Properties

## process.abort()

- **Description:** Causes the process to exit immediately and generate a core dump.
- **Signature:** `process.abort(): void`

## process.allowedNodeEnvironmentFlags

- **Description:** A read-only Set of flags that are allowable in the NODE_OPTIONS environment variable.
- **Usage Example:**

```javascript
import { allowedNodeEnvironmentFlags } from 'node:process';

allowedNodeEnvironmentFlags.forEach((flag) => {
  console.log(flag);
});
```

## process.arch

- **Description:** The operating system CPU architecture for which Node.js is compiled.
- **Type:** `string` (Possible values: 'arm', 'arm64', 'ia32', 'loong64', 'mips', 'mipsel', 'ppc', 'ppc64', 'riscv64', 's390', 's390x', 'x64')

## process.argv & process.argv0

- **process.argv**: An array of command-line arguments. The first element is the Node executable path, the second is the script path, followed by additional arguments.
- **process.argv0**: A read-only copy of the original argv[0].

**Example:**

```javascript
import { argv, argv0 } from 'node:process';

argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

console.log('Original argv0:', argv0);
```

## process.channel

- **Description:** If spawned with an IPC channel, `process.channel` holds the reference. It provides methods:
  - `process.channel.ref()`: Makes the IPC channel keep the event loop active.
  - `process.channel.unref()`: Allows the process to exit even if the channel is open.

## process.chdir(directory)

- **Description:** Changes the current working directory.
- **Signature:** `process.chdir(directory: string): void`

**Example:**

```javascript
import { chdir, cwd } from 'node:process';
console.log(`Starting directory: ${cwd()}`);
try {
  chdir('/tmp');
  console.log(`New directory: ${cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

## process.config

- **Description:** Read-only frozen object containing the configuration options used to compile Node.js.
- **Example Output:**

```json
{
  "target_defaults": {
    "cflags": [],
    "default_configuration": "Release",
    "defines": [],
    "include_dirs": [],
    "libraries": []
  },
  "variables": {
    "host_arch": "x64",
    "napi_build_version": 5,
    "node_install_npm": "true",
    "node_prefix": "",
    "node_shared_cares": "false",
    "node_shared_http_parser": "false",
    "node_shared_libuv": "false",
    "node_shared_zlib": "false",
    "node_use_openssl": "true",
    "node_shared_openssl": "false",
    "target_arch": "x64",
    "v8_use_snapshot": 1
  }
}
```

## process.connected

- **Description:** Indicates if the IPC channel is connected. Type: `boolean`.

## process.constrainedMemory() & process.availableMemory()

- **Description:** Experimental methods to retrieve available memory in bytes.
- **Signature:**
  - `process.constrainedMemory(): number`
  - `process.availableMemory(): number`

## process.cpuUsage([previousValue])

- **Description:** Returns an object with CPU usage in microseconds. If `previousValue` is supplied, returns the diff.
- **Signature:** `process.cpuUsage(previousValue?: { user: number, system: number }): { user: number, system: number }`

**Example:**

```javascript
import { cpuUsage } from 'node:process';

const startUsage = cpuUsage();
// Perform CPU intensive task
while (Date.now() % 2 === 0) {}

console.log(cpuUsage(startUsage));
```

## process.cwd()

- **Description:** Returns the current working directory.
- **Signature:** `process.cwd(): string`

## process.debugPort

- **Description:** The port used by the Node.js debugger (type: number).

## process.disconnect()

- **Description:** Disconnects the IPC channel (if applicable).

## process.dlopen(module, filename[, flags])

- **Description:** Dynamically loads shared objects (used by require() for C++ Addons).
- **Signature:** `process.dlopen(module: Object, filename: string, flags?: number): void`
- **Flags:** Default is `os.constants.dlopen.RTLD_LAZY` unless specified otherwise.

**Example:**

```javascript
import { dlopen } from 'node:process';
import { constants } from 'node:os';
import { fileURLToPath } from 'node:url';

const module = { exports: {} };
// Load addon with RTLD_NOW flag
dlopen(module, fileURLToPath(new URL('local.node', import.meta.url)), constants.dlopen.RTLD_NOW);
module.exports.foo();
```

## process.emitWarning()

- **Description:** Emits a process warning. Can be used with various signatures.
- **Signature 1:** `process.emitWarning(warning: string | Error, options?: { type?: string, code?: string, detail?: string, ctor?: Function }): void`
- **Signature 2:** `process.emitWarning(warning: string | Error, type?: string, code?: string, ctor?: Function): void`

**Example 1 (using options object):**

```javascript
import process from 'node:process';

process.emitWarning('Something happened!', {
  code: 'MY_WARNING',
  detail: 'This is some additional information'
});
```

**Example 2 (using separate arguments):**

```javascript
import process from 'node:process';

process.emitWarning('Something happened!', 'CustomWarning', 'WARN001');
```

# 4. Detailed Code Examples & Best Practices

- Always use synchronous operations in 'exit' event handlers as asynchronous operations are abandoned.
- For uncaught exceptions, perform only synchronous cleanup. Do not attempt to continue normal execution.
- When using `process.emitWarning()`, provide specific codes and detail to help with troubleshooting.
- Use `process.cpuUsage()` with a previous value to measure CPU consumption differences.
- Validate directory existence before using `process.chdir()` to avoid exceptions.

# Troubleshooting Procedures

1. **Unexpected Process Exit:**
   - Check for synchronous calls in 'exit' event handlers.
   - Verify that no asynchronous operations are scheduled in 'exit'.

2. **Unhandled Promise Rejections:**
   - Attach a global handler using `process.on('unhandledRejection', ...)` to log and monitor.

3. **Memory Issues:**
   - Use `process.constrainedMemory()` and `process.availableMemory()` to determine available resources.

4. **Debugging IPC Issues:**
   - Ensure `process.channel` exists and use `ref()` or `unref()` appropriately.
   - Confirm that disconnection events are handled using `process.on('disconnect', ...).`

# Attribution & Data Size

- **Data Size:** 4361016 bytes
- **Links Found:** 3274
- **Source:** https://nodejs.org/api/process.html


## Attribution
- Source: Node.js Process Documentation
- URL: https://nodejs.org/api/process.html
- License: License: MIT License
- Crawl Date: 2025-04-21T02:21:28.688Z
- Data Size: 4361016 bytes
- Links Found: 3274

## Retrieved
2025-04-21

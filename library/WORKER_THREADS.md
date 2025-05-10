# WORKER_THREADS

## Crawl Summary
Worker constructor signature: new Worker(filename[, options]) with options: argv, env or SHARE_ENV, eval, execArgv, stdin, stdout, stderr, workerData, trackUnmanagedFds, transferList, resourceLimits, name. Worker instance APIs: postMessage(value[, transferList][, timeout]) returns Promise when using postMessageToThread, terminate() returns Promise<exitCode>, getHeapStatistics(), getHeapSnapshot(options), performance.eventLoopUtilization(), ref/unref, threadId, resourceLimits, stdio streams. Parent-port message passing via parentPort.postMessage and worker.on('message'). MessageChannel ports: port1, port2, postMessage, on('message'), close, ref/unref, hasRef, start. BroadcastChannel: BroadcastChannel(name), postMessage, onmessage, onmessageerror, close, ref, unref. Transfer list semantics: transferable types, SharedArrayBuffer always shared, markAsUntransferable, isMarkedAsUntransferable, markAsUncloneable, moveMessagePortToContext. Environment data: setEnvironmentData, getEnvironmentData, SHARE_ENV. Resource limits: maxYoungGenerationSizeMb, maxOldGenerationSizeMb, codeRangeSizeMb, stackSizeMb. Error codes: ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST, ERR_WORKER_MESSAGING_FAILED, ERR_WORKER_MESSAGING_SAME_THREAD, ERR_WORKER_MESSAGING_TIMEOUT. 

## Normalised Extract
Table of Contents:
1. Worker Constructor and Options
2. Worker Instance APIs and Events
3. parentPort Messaging
4. MessageChannel and MessagePort
5. BroadcastChannel
6. Transfer and Clone Operations
7. Environment Data APIs
8. Resource Limits Configuration
9. Error Codes and Troubleshooting

1. Worker Constructor and Options
new Worker(filename[, options])
Options:
  argv: any[] appended to process.argv
  env: Object or SHARE_ENV (shared env symbol)
  eval: boolean interpret filename as code
  execArgv: string[] CLI flags passed to worker
  stdin, stdout, stderr: boolean streams
  workerData: any cloneable value
  trackUnmanagedFds: boolean (default true)
  transferList: Object[] MessagePort-like objects in workerData
  resourceLimits: {
    maxOldGenerationSizeMb: number,
    maxYoungGenerationSizeMb: number,
    codeRangeSizeMb: number,
    stackSizeMb: number (default 4)
  }
  name: string thread title prefix (default 'WorkerThread')

2. Worker Instance APIs and Events
Properties:
  threadId: integer unique per thread
  resourceLimits: as passed in options or {} in main thread
  stdin, stdout, stderr: Stream if enabled
Methods:
  postMessage(value[, transferList][, timeout]) → Promise when using postMessageToThread, void when direct
  terminate() → Promise<integer exitCode>
  getHeapStatistics() → Promise<Object>
  getHeapSnapshot([options]) → Promise<Readable Stream>
  performance.eventLoopUtilization([prevUtil[,currUtil]]) → { idle, active, utilization }
  ref()/unref(): control event loop
Events:
  'error'(Error)
  'exit'(exitCode)
  'online'()
  'message'(any)
  'messageerror'(Error)

3. parentPort Messaging
In worker thread: parentPort is MessagePort or null.
Use parentPort.postMessage(value[, transferList]) to send to parent.
parentPort.on('message', value=>{}) to receive from parent.

4. MessageChannel and MessagePort
const { port1, port2 } = new MessageChannel()
port.postMessage(value[, transferList]) to send
port.on('message', listener)
port.on('messageerror', listener)
port.close()
port.ref(), port.unref(), port.hasRef(), port.start()

5. BroadcastChannel
const bc = new BroadcastChannel(name)
bc.postMessage(message)
bc.onmessage = event=>{}
bc.onmessageerror = event=>{}
bc.close(), bc.ref(), bc.unref()

6. Transfer and Clone Operations
TransferList items: ArrayBuffer, MessagePort, FileHandle
SharedArrayBuffer instances always shared
markAsUntransferable(object): no-op for primitive; cannot be reversed; throws DataCloneError if included in transferList
isMarkedAsUntransferable(object): returns boolean
markAsUncloneable(object): no-op for primitive; cannot be reversed; throws DataCloneError if object used as message
moveMessagePortToContext(port, contextifiedSandbox) → MessagePort created in target vm context

7. Environment Data APIs
setEnvironmentData(key, value?): undefined, removes key if value undefined
getEnvironmentData(key) → any clone of value set in spawning thread
SHARE_ENV: symbol to share process.env object between threads

8. Resource Limits Configuration
resourceLimits object keys:
  maxYoungGenerationSizeMb: number
  maxOldGenerationSizeMb: number
  codeRangeSizeMb: number
  stackSizeMb: number
Default in main thread: {}
Worker.resourceLimits matches options.resourceLimits

9. Error Codes and Troubleshooting
ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST thrown when MessagePort-like object in value without transferList
ERR_WORKER_MESSAGING_FAILED when postMessageToThread to invalid ID or no listener
ERR_WORKER_MESSAGING_SAME_THREAD when threadId equals current thread
ERR_WORKER_MESSAGING_TIMEOUT when timeout reached in postMessageToThread


## Supplementary Details
Worker Pool Implementation Pattern:
1. Use AsyncResource to correlate tasks and callbacks:
   const { AsyncResource } = require('async_hooks');
   class TaskResource extends AsyncResource {
     constructor(callback) { super('TaskResource'); this.callback = callback; }
     run(taskData) { this.runInAsyncScope(this.callback, null, taskData); }
   }
2. Pre-spawn worker threads:
   const pool = new Set();
   for (let i=0; i<poolSize; i++) {
     const worker = new Worker(scriptPath, { workerData: null });
     pool.add(worker);
   }
3. Dispatch tasks:
   function execTask(data) {
     return new Promise((resolve, reject) => {
       const resource = new TaskResource(resolve);
       const worker = getAvailableWorker();
       worker.once('message', result => resource.run(result));
       worker.once('error', err => reject(err));
       worker.postMessage(data);
     });
   }

Configuration Options Defaults and Effects:
- trackUnmanagedFds: true  (closes raw FDs on exit)
- resourceLimits.stackSizeMb: 4 (minimum to avoid crashes)
- resourceLimits.maxOldGenerationSizeMb: inherited from --max-old-space-size or V8 default
- execArgv: inherits parent thread execArgv

Best Practice:
- Reuse worker instances instead of spawning per task to minimize overhead
- Use transferList for large ArrayBuffers to avoid copying
- Mark internal buffers as untransferable with markAsUntransferable()
- Share environment sparingly; prefer explicit data passing



## Reference Details
Worker Constructor:
Signature: new Worker(filename: string|URL, options?: {
  argv?: any[];
  env?: NodeJS.ProcessEnv|typeof SHARE_ENV;
  eval?: boolean;
  execArgv?: string[];
  stdin?: boolean;
  stdout?: boolean;
  stderr?: boolean;
  workerData?: any;
  trackUnmanagedFds?: boolean;
  transferList?: (ArrayBuffer|MessagePort|FileHandle)[];
  resourceLimits?: {
    maxOldGenerationSizeMb?: number;
    maxYoungGenerationSizeMb?: number;
    codeRangeSizeMb?: number;
    stackSizeMb?: number;
  };
  name?: string;
})
Throws: ERR_WORKER_INVALID_PATH if filename invalid
Defaults: env=process.env, trackUnmanagedFds=true, name='WorkerThread'

Worker Methods:
postMessage(value: any, transferList?: (ArrayBuffer|MessagePort|FileHandle)[]): void
terminate(): Promise<number>
getHeapSnapshot(options?: { exposeInternals?: boolean; exposeNumericValues?: boolean; }): Promise<Readable>
getHeapStatistics(): Promise<import('v8').HeapInfo>
performance.eventLoopUtilization(util1?: object, util2?: object): { idle: number; active: number; utilization: number }
ref(): void
unref(): void

Worker Properties:
threadId: number (read-only)
resourceLimits: { maxYoungGenerationSizeMb:number; maxOldGenerationSizeMb:number; codeRangeSizeMb:number; stackSizeMb:number }
stdin: Writable | null
stdout: Readable | null
stderr: Readable | null

Worker Events:
'error': listener(err: Error) → void
'exit': listener(code: number) → void
'online': listener() → void
'message': listener(value: any) → void
'messageerror': listener(err: Error) → void

parentPort:
postMessage(value: any, transferList?: (ArrayBuffer|MessagePort|FileHandle)[]): void
once('message', listener(value: any): void)

MessageChannel:
new MessageChannel(): { port1: MessagePort; port2: MessagePort }

MessagePort extends EventTarget:
postMessage(value: any, transferList?: (ArrayBuffer|MessagePort|FileHandle)[]): void
close(): void
ref(): void
unref(): void
hasRef(): boolean
start(): void
on('message', listener(value: any): void)
on('messageerror', listener(err: Error): void)
on('close', listener(): void)

BroadcastChannel:
new BroadcastChannel(name: string)
postMessage(message: any): void
close(): void
ref(): void
unref(): void
onmessage: (event: { data: any }) => void
onmessageerror: (event: any) => void

Environment Data APIs:
setEnvironmentData(key: any, value?: any): void
getEnvironmentData(key: any): any
SHARE_ENV: symbol

Transfer and Clone:
markAsUntransferable(object: any): void
isMarkedAsUntransferable(object: any): boolean
markAsUncloneable(object: any): void
moveMessagePortToContext(port: MessagePort, contextifiedSandbox: object): MessagePort

Errors and Troubleshooting Commands:
- ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST: thrown by postMessage when transferList missing
- ERR_WORKER_MESSAGING_FAILED: thrown by postMessageToThread invalid target
- ERR_WORKER_MESSAGING_SAME_THREAD: thrown by postMessageToThread same thread
- ERR_WORKER_MESSAGING_TIMEOUT: thrown by postMessageToThread when timeout reached

Example: postMessageToThread
import { postMessageToThread, threadId, Worker } from 'node:worker_threads';
await postMessageToThread(targetId, payload, [], 5000)
.catch(err => {
  if (err.code === 'ERR_WORKER_MESSAGING_TIMEOUT') console.error('Timeout');
});


## Information Dense Extract
Worker: new Worker(file: string|URL, options?: {argv:any[],env:ProcessEnv|SHARE_ENV,eval:boolean,execArgv:string[],stdin:boolean,stdout:boolean,stderr:boolean,workerData:any,trackUnmanagedFds:boolean,transferList:any[],resourceLimits:{maxOldGenerationSizeMb:number,maxYoungGenerationSizeMb:number,codeRangeSizeMb:number,stackSizeMb:number},name:string})
Properties: threadId:int, resourceLimits:object, stdin/stdout/stderr:Stream|null
Methods: postMessage(value:any,transferList?:any[],timeout?:number):void|Promise, terminate():Promise<int>, getHeapSnapshot(options?):Promise<Readable>, getHeapStatistics():Promise<HeapInfo>, performance.eventLoopUtilization(prev1?,prev2?):{idle,active,utilization}, ref(), unref()
Events: 'error'(Error),'exit'(int),'online'(),'message'(any),'messageerror'(Error)
parentPort: MessagePort|null
MessageChannel: const {port1,port2}=new MessageChannel()
MessagePort: postMessage(value:any,transferList?:any[]),close(),ref(),unref(),hasRef():boolean,start(),on('message',value=>{}),on('messageerror',err=>{}),on('close',()=>{})
BroadcastChannel: new BroadcastChannel(name:string),postMessage(any),onmessage(event),onmessageerror(event),close(),ref(),unref()
Transfer: transferList items: ArrayBuffer|MessagePort|FileHandle; SharedArrayBuffer always shared; markAsUntransferable(obj),isMarkedAsUntransferable(obj),markAsUncloneable(obj),moveMessagePortToContext(port,vmContext)
EnvData: setEnvironmentData(key,val?),getEnvironmentData(key),SHARE_ENV
ResourceLimits: {maxOldGenerationSizeMb,maxYoungGenerationSizeMb,codeRangeSizeMb,stackSizeMb}
Errors: ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST,ERR_WORKER_MESSAGING_FAILED,ERR_WORKER_MESSAGING_SAME_THREAD,ERR_WORKER_MESSAGING_TIMEOUT

## Sanitised Extract
Table of Contents:
1. Worker Constructor and Options
2. Worker Instance APIs and Events
3. parentPort Messaging
4. MessageChannel and MessagePort
5. BroadcastChannel
6. Transfer and Clone Operations
7. Environment Data APIs
8. Resource Limits Configuration
9. Error Codes and Troubleshooting

1. Worker Constructor and Options
new Worker(filename[, options])
Options:
  argv: any[] appended to process.argv
  env: Object or SHARE_ENV (shared env symbol)
  eval: boolean interpret filename as code
  execArgv: string[] CLI flags passed to worker
  stdin, stdout, stderr: boolean streams
  workerData: any cloneable value
  trackUnmanagedFds: boolean (default true)
  transferList: Object[] MessagePort-like objects in workerData
  resourceLimits: {
    maxOldGenerationSizeMb: number,
    maxYoungGenerationSizeMb: number,
    codeRangeSizeMb: number,
    stackSizeMb: number (default 4)
  }
  name: string thread title prefix (default 'WorkerThread')

2. Worker Instance APIs and Events
Properties:
  threadId: integer unique per thread
  resourceLimits: as passed in options or {} in main thread
  stdin, stdout, stderr: Stream if enabled
Methods:
  postMessage(value[, transferList][, timeout])  Promise when using postMessageToThread, void when direct
  terminate()  Promise<integer exitCode>
  getHeapStatistics()  Promise<Object>
  getHeapSnapshot([options])  Promise<Readable Stream>
  performance.eventLoopUtilization([prevUtil[,currUtil]])  { idle, active, utilization }
  ref()/unref(): control event loop
Events:
  'error'(Error)
  'exit'(exitCode)
  'online'()
  'message'(any)
  'messageerror'(Error)

3. parentPort Messaging
In worker thread: parentPort is MessagePort or null.
Use parentPort.postMessage(value[, transferList]) to send to parent.
parentPort.on('message', value=>{}) to receive from parent.

4. MessageChannel and MessagePort
const { port1, port2 } = new MessageChannel()
port.postMessage(value[, transferList]) to send
port.on('message', listener)
port.on('messageerror', listener)
port.close()
port.ref(), port.unref(), port.hasRef(), port.start()

5. BroadcastChannel
const bc = new BroadcastChannel(name)
bc.postMessage(message)
bc.onmessage = event=>{}
bc.onmessageerror = event=>{}
bc.close(), bc.ref(), bc.unref()

6. Transfer and Clone Operations
TransferList items: ArrayBuffer, MessagePort, FileHandle
SharedArrayBuffer instances always shared
markAsUntransferable(object): no-op for primitive; cannot be reversed; throws DataCloneError if included in transferList
isMarkedAsUntransferable(object): returns boolean
markAsUncloneable(object): no-op for primitive; cannot be reversed; throws DataCloneError if object used as message
moveMessagePortToContext(port, contextifiedSandbox)  MessagePort created in target vm context

7. Environment Data APIs
setEnvironmentData(key, value?): undefined, removes key if value undefined
getEnvironmentData(key)  any clone of value set in spawning thread
SHARE_ENV: symbol to share process.env object between threads

8. Resource Limits Configuration
resourceLimits object keys:
  maxYoungGenerationSizeMb: number
  maxOldGenerationSizeMb: number
  codeRangeSizeMb: number
  stackSizeMb: number
Default in main thread: {}
Worker.resourceLimits matches options.resourceLimits

9. Error Codes and Troubleshooting
ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST thrown when MessagePort-like object in value without transferList
ERR_WORKER_MESSAGING_FAILED when postMessageToThread to invalid ID or no listener
ERR_WORKER_MESSAGING_SAME_THREAD when threadId equals current thread
ERR_WORKER_MESSAGING_TIMEOUT when timeout reached in postMessageToThread

## Original Source
Worker Threads
https://nodejs.org/api/worker_threads.html

## Digest of WORKER_THREADS

# Worker Threads API

Stability: 2 - Stable  
Source Code: lib/worker_threads.js  
Imported using:
```js
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  setEnvironmentData,
  getEnvironmentData,
  SHARE_ENV,
  MessageChannel,
  MessagePort,
  BroadcastChannel,
  receiveMessageOnPort,
  markAsUntransferable,
  isMarkedAsUntransferable,
  markAsUncloneable,
  moveMessagePortToContext
} from 'node:worker_threads';
```

# Worker Constructor

```js
new Worker(filename[, options])
```

filename <string|URL>  Path or WHATWG URL to script or code. When options.eval is true, treated as inline script.

options Object:
- argv    <any[]>          Appended to process.argv
- env     <Object>|SHARE_ENV  Initial process.env or shared env
- eval    <boolean>        Execute code rather than file
- execArgv<string[]>      CLI flags passed to worker
- stdin   <boolean>        Enable worker.stdin stream
- stdout  <boolean>        Expose worker.stdout
- stderr  <boolean>        Expose worker.stderr
- workerData<any>          Value available as threadLocal workerData
- trackUnmanagedFds<boolean>  Auto-close raw FDs on exit
- transferList<Object[]>   Transferable ports in workerData
- resourceLimits<Object>   V8 engine limits: codeRangeSizeMb, maxOldGenerationSizeMb, maxYoungGenerationSizeMb, stackSizeMb
- name<string>             Thread title prefix

# Worker Instance Methods and Properties

- worker.postMessage(value[, transferList][, timeout]) → Promise|void
- worker.terminate() → Promise<integer>
- worker.getHeapStatistics() → Promise<Object>
- worker.getHeapSnapshot([options]) → Promise<ReadableStream>
- worker.performance.eventLoopUtilization([util1[,util2]]) → Object
- worker.ref() / worker.unref()
- worker.threadId   <integer>
- worker.resourceLimits<Object>
- worker.stderr, worker.stdin, worker.stdout  <Stream>

Events:
- 'error'(err)
- 'exit'(exitCode)
- 'online'()
- 'message'(value)
- 'messageerror'(err)

# Message Passing

## parentPort

In worker:
```js
parentPort.postMessage(value[, transferList])
parentPort.on('message', listener)
```

## MessageChannel / MessagePort

```js
const { port1, port2 } = new MessageChannel();
port1.on('message', listener);
port2.postMessage(value[, transferList]);
port.close();
port.ref()/unref();
port.hasRef();
port.start();
```

## BroadcastChannel

```js
const bc = new BroadcastChannel(name);
bc.postMessage(message);
bc.onmessage = listener;
bc.close()/ref()/unref();
```

# Transfer and Clone Semantics

- TransferList: Array< ArrayBuffer | MessagePort | FileHandle >
- SharedArrayBuffer always shared
- markAsUntransferable(object)  Prevent object transfer: throws DataCloneError if in transferList
- isMarkedAsUntransferable(object)  Boolean
- markAsUncloneable(object)  Prevent value clone in postMessage
- moveMessagePortToContext(port, vmContext) → MessagePort in target context

# Environment Data

```js
worker.setEnvironmentData(key[, value]);
worker.getEnvironmentData(key) → any
worker.SHARE_ENV  special env symbol
```

# Resource Limits

```js
resourceLimits = {
  maxYoungGenerationSizeMb: <number>,
  maxOldGenerationSizeMb: <number>,
  codeRangeSizeMb: <number>,
  stackSizeMb: <number>
}
```

# Troubleshooting

- Missing transferList → ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST
- Messaging same thread → ERR_WORKER_MESSAGING_SAME_THREAD
- Messaging invalid thread → ERR_WORKER_MESSAGING_FAILED
- Timeout in postMessageToThread → ERR_WORKER_MESSAGING_TIMEOUT

Retrieve current date: 2024-06-10
Data Size: 3,734,810 bytes
Links Found: 3040


## Attribution
- Source: Worker Threads
- URL: https://nodejs.org/api/worker_threads.html
- License: License: CC-BY-4.0
- Crawl Date: 2025-05-10T10:58:22.270Z
- Data Size: 3734810 bytes
- Links Found: 3040

## Retrieved
2025-05-10

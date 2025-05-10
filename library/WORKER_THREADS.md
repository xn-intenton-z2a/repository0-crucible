# WORKER_THREADS

## Crawl Summary
module node:worker_threads; import ESM/CommonJS; Worker constructor: new Worker(filename:string|URL, options?:{argv:any[],env:Object|symbol,execArgv:string[],stdin:boolean,stdout:boolean,stderr:boolean,eval:boolean,workerData:any,trackUnmanagedFds:boolean,transferList:Object[],resourceLimits:{maxOldGenerationSizeMb:number,maxYoungGenerationSizeMb:number,codeRangeSizeMb:number,stackSizeMb:number},name:string}); Worker properties: threadId:number, resourceLimits:Object, stdout|stderr|stdin streams, performance:Performance, workerData:any; Worker events/message API; MessageChannel: port1,port2; MessagePort methods and events; BroadcastChannel(name:any) methods; Utility APIs: isMainThread, isInternalThread, set/getEnvironmentData, markAsUntransferable/uncloneable, moveMessagePortToContext, postMessageToThread, receiveMessageOnPort; focus on transferList and structured clone rules; pool recommendation with AsyncResource.

## Normalised Extract
Table of Contents:
1. Worker Creation
2. Messaging Patterns
3. Data Transfer & Cloning
4. Environment Data
5. Resource Limits
6. Utility APIs

1. Worker Creation
Signature: new Worker(filename:string|URL, options?: WorkerOptions)
WorkerOptions:
  argv:any[]       default []
  env:Object|symbol (worker.SHARE_ENV) default process.env
  execArgv:string[] inherited from parent
  stdin:boolean    default false
  stdout:boolean   default false
  stderr:boolean   default false
  eval:boolean     default false
  workerData:any   default undefined
  trackUnmanagedFds:boolean default true
  transferList:Object[]
  resourceLimits:{ maxOldGenerationSizeMb:number; maxYoungGenerationSizeMb:number; codeRangeSizeMb:number; stackSizeMb:number }
  name:string      default 'WorkerThread'

2. Messaging Patterns
Parent thread:
  worker.postMessage(value, transferList?)
  worker.on('message', handler)
Worker thread:
  parentPort.postMessage(value)
  parentPort.on('message', handler)
Nested threads or cross-tree:
  postMessageToThread(threadId:number, value:any, transferList?:Object[], timeout?:number): Promise<void>
Receive single message:
  receiveMessageOnPort(port:MessagePort|BroadcastChannel): {message:any}|undefined

3. Data Transfer & Cloning
Structured clone rules: circular refs, built-in types, TypedArrays, SharedArrayBuffer.
transferList moves ArrayBuffer or MessagePort, leaving source unusable.
markAsUntransferable(obj) prevents transfer, throws on transfer attempt.
markAsUncloneable(obj) prevents cloning, throws on postMessage.
Considerations: Buffer pooling, uncloneable prototyped objects lose descriptors.

4. Environment Data
setEnvironmentData(key:any, value?:any) propagates to new Workers; getEnvironmentData(key) retrieves clone.
worker.SHARE_ENV symbol to share process.env between parent and child.

5. Resource Limits
Define per-Worker JS engine constraints via options.resourceLimits:
  maxOldGenerationSizeMb:number
  maxYoungGenerationSizeMb:number
  codeRangeSizeMb:number
  stackSizeMb:number
Access current: worker.resourceLimits

6. Utility APIs
isMainThread:boolean
isInternalThread:boolean
moveMessagePortToContext(port, contextifiedSandbox):MessagePort


## Supplementary Details
Implementation Steps:
1. Create WorkerPool: reuse Worker instances rather than spawn per task.
2. Use AsyncResource from 'async_hooks' to correlate tasks:
   const { AsyncResource } = require('async_hooks');
   class TaskResource extends AsyncResource { run(fn){ this.runInAsyncScope(fn); } }
3. WorkerPool: assign idle Workers, postMessage, attach message/error/exit, release or recycle.
4. Custom channels: new MessageChannel(), worker.postMessage({port}, [port]); parent/listener attaches on port2.
5. Performance Monitoring: worker.performance.eventLoopUtilization([prev]); returns { idle, active, utilization }.
6. Heap Analysis: worker.getHeapSnapshot({ exposeInternals?:boolean, exposeNumericValues?:boolean }) -> ReadableStream; worker.getHeapStatistics() -> Promise<{ total_heap_size, used_heap_size, ... }>
7. TransferList: always verify markAsUntransferable when Buffer pooling; to clone buffers use Buffer.from(buffer).
8. Error Handling: listen for 'messageerror', 'error', 'exit' with non-zero code; wrap postMessageToThread in try/catch and handle ERR_WORKER_MESSAGING_TIMEOUT.
9. Preload scripts: launching threads from preload must use process.emit('workerMessage').


## Reference Details
## WorkerOptions Interface
interface WorkerOptions {
  argv?: any[]; // default []
  env?: { [key:string]: string } | symbol; // default process.env, use worker.SHARE_ENV to share
  execArgv?: string[]; // default process.execArgv
  stdin?: boolean; // default false
  stdout?: boolean; // default false
  stderr?: boolean; // default false
  eval?: boolean; // default false
  workerData?: any; // cloneable
  trackUnmanagedFds?: boolean; // default true
  transferList?: Object[];
  resourceLimits?: {
    maxOldGenerationSizeMb?: number;
    maxYoungGenerationSizeMb?: number;
    codeRangeSizeMb?: number;
    stackSizeMb?: number;
  };
  name?: string; // default 'WorkerThread'
}

## new Worker(filename, options)
Parameters:
  filename: string | URL (absolute, './', '../', data: or file: URL)
  options: WorkerOptions
Returns: Worker instance
Throws: ERR_WORKER_PATH must be valid; ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST if transferList missing for MessagePort in workerData

## Worker Methods
worker.postMessage(value:any, transferList?:Object[], timeout?:number): void
  Sends value, structured clone, errors: ERR_WORKER_MESSAGING_SAME_THREAD, ERR_WORKER_MESSAGING_FAILED, ERR_WORKER_MESSAGING_TIMEOUT

worker.terminate(): Promise<number>
  Resolves with exitCode upon termination.

worker.ref(): void // keep event loop alive
worker.unref(): void // allow exit if only handle
worker.getHeapSnapshot(options?:{exposeInternals?:boolean;exposeNumericValues?:boolean}): Promise<ReadableStream>
worker.getHeapStatistics(): Promise<{ total_heap_size:number; total_physical_size:number; total_available_size:number; used_heap_size:number; heap_size_limit:number; malloced_memory:number; peak_malloced_memory:number; does_zap_garbage?:number }>

## Events on Worker
'online' => no args
'message' => value:any
'messageerror' => error: Error
'error' => err: Error
'exit' => exitCode:number

## Structured Clone Types
Transferable: ArrayBuffer, MessagePort, FileHandle
Cloneable: TypedArray, SharedArrayBuffer, RegExp, Date, BigInt, Map, Set, CryptoKey, KeyObject, X509Certificate, Histogram, BlockList, SocketAddress, etc.

## MessageChannel & MessagePort
new MessageChannel() => {port1: MessagePort; port2: MessagePort}
port.postMessage(value:any, transferList?:Object[]): void
port.close(): void
port.start(): void
port.ref(): void
port.unref(): void
port.hasRef(): boolean
Events: 'message'(value), 'messageerror'(error), 'close'

## BroadcastChannel
new BroadcastChannel(name:any)
postMessage(message:any): void
close(): void
ref(): void
unref(): void
onmessage: (event:{data:any})=>void
onmessageerror: (error:Event)=>void

## Utility Functions
isMainThread: boolean
isInternalThread: boolean
setEnvironmentData(key:any, value?:any): void
getEnvironmentData(key:any): any
markAsUntransferable(object:any): void // no-op for primitives
isMarkedAsUntransferable(object:any): boolean
markAsUncloneable(object:any): void
moveMessagePortToContext(port:MessagePort, contextifiedSandbox:Object): MessagePort
postMessageToThread(threadId:number, value:any, transferList?:Object[], timeout?:number): Promise<void>
receiveMessageOnPort(port:MessagePort|BroadcastChannel): { message:any }|undefined

## Best Practices & Patterns
- Use a Worker pool; reuse Worker instances
- Employ AsyncResource to map tasks to diagnostic hooks
- Use custom MessageChannels for separation of concerns
- Validate transferable objects with markAsUntransferable before use
- Monitor performance via performance.eventLoopUtilization
- Capture heap via getHeapSnapshot for memory leak analysis

## Troubleshooting
1. ERR_WORKER_MESSAGING_TIMEOUT: increase timeout or ensure destination listener
2. DataCloneError on postMessage: verify transferList; remove uncloneable fields or markAsUncloneable
3. Worker stops unexpectedly: listen to 'exit' event and inspect exit code
4. No messages received: call port.start() or attach 'message' listener before post
5. Environment not shared: pass env: worker.SHARE_ENV
6. Unknown errors: run with --trace-warnings or DEBUG=worker_threads


## Information Dense Extract
module node:worker_threads; import Worker,isMainThread,parentPort,workerData,setEnvironmentData,getEnvironmentData; new Worker(filename:string|URL,options?:{argv:any[],env:Object|symbol,execArgv:string[],stdin:boolean,stdout:boolean,stderr:boolean,eval:boolean,workerData:any,trackUnmanagedFds:boolean,transferList:Object[],resourceLimits:{maxOldGenerationSizeMb:number,maxYoungGenerationSizeMb:number,codeRangeSizeMb:number,stackSizeMb:number},name:string}):Worker; Worker.threadId:number; Worker.resourceLimits:Object; Worker.workerData:any; Worker.performance:Performance; Worker.postMessage(value:any,transferList?:Object[],timeout?:number):void; Worker.terminate():Promise<number>; Worker.getHeapSnapshot(opts?:{exposeInternals?:boolean,exposeNumericValues?:boolean}):Promise<ReadableStream>; Worker.getHeapStatistics():Promise<Object>; events:'online','message'(any),'messageerror'(Error),'error'(Error),'exit'(number); MessageChannel=>{port1,port2}; MessagePort.postMessage(value:any,transferList?:Object[]):void; .close(),.start(),.ref(),.unref(),.hasRef():boolean; events:'message','messageerror','close'; BroadcastChannel(name:any).postMessage(any),.close(),.ref(),.unref(),onmessage, onmessageerror; Utility: isMainThread,isInternalThread,set/getEnvironmentData,markAsUntransferable,isMarkedAsUntransferable,markAsUncloneable,moveMessagePortToContext,postMessageToThread(threadId,any,transferList?,timeout?):Promise<void>,receiveMessageOnPort(port):{message:any}|undefined; structured clone supports TypedArray,SharedArrayBuffer,RegExp,Date,BigInt,Map,Set,CryptoKey,KeyObject,X509Certificate,Histogram,BlockList,SocketAddress; transferList moves ArrayBuffer/MessagePort; use AsyncResource for Worker pool; performance.eventLoopUtilization, heap snapshot/statistics; errors: ERR_WORKER_MESSAGING_*, DataCloneError; share env via SHARE_ENV; no Markdown escapes.

## Sanitised Extract
Table of Contents:
1. Worker Creation
2. Messaging Patterns
3. Data Transfer & Cloning
4. Environment Data
5. Resource Limits
6. Utility APIs

1. Worker Creation
Signature: new Worker(filename:string|URL, options?: WorkerOptions)
WorkerOptions:
  argv:any[]       default []
  env:Object|symbol (worker.SHARE_ENV) default process.env
  execArgv:string[] inherited from parent
  stdin:boolean    default false
  stdout:boolean   default false
  stderr:boolean   default false
  eval:boolean     default false
  workerData:any   default undefined
  trackUnmanagedFds:boolean default true
  transferList:Object[]
  resourceLimits:{ maxOldGenerationSizeMb:number; maxYoungGenerationSizeMb:number; codeRangeSizeMb:number; stackSizeMb:number }
  name:string      default 'WorkerThread'

2. Messaging Patterns
Parent thread:
  worker.postMessage(value, transferList?)
  worker.on('message', handler)
Worker thread:
  parentPort.postMessage(value)
  parentPort.on('message', handler)
Nested threads or cross-tree:
  postMessageToThread(threadId:number, value:any, transferList?:Object[], timeout?:number): Promise<void>
Receive single message:
  receiveMessageOnPort(port:MessagePort|BroadcastChannel): {message:any}|undefined

3. Data Transfer & Cloning
Structured clone rules: circular refs, built-in types, TypedArrays, SharedArrayBuffer.
transferList moves ArrayBuffer or MessagePort, leaving source unusable.
markAsUntransferable(obj) prevents transfer, throws on transfer attempt.
markAsUncloneable(obj) prevents cloning, throws on postMessage.
Considerations: Buffer pooling, uncloneable prototyped objects lose descriptors.

4. Environment Data
setEnvironmentData(key:any, value?:any) propagates to new Workers; getEnvironmentData(key) retrieves clone.
worker.SHARE_ENV symbol to share process.env between parent and child.

5. Resource Limits
Define per-Worker JS engine constraints via options.resourceLimits:
  maxOldGenerationSizeMb:number
  maxYoungGenerationSizeMb:number
  codeRangeSizeMb:number
  stackSizeMb:number
Access current: worker.resourceLimits

6. Utility APIs
isMainThread:boolean
isInternalThread:boolean
moveMessagePortToContext(port, contextifiedSandbox):MessagePort

## Original Source
Node.js Worker Threads
https://nodejs.org/api/worker_threads.html

## Digest of WORKER_THREADS

# Worker Threads Overview

The node:worker_threads module enables parallel JavaScript execution threads within a single Node.js process, sharing memory via ArrayBuffer and SharedArrayBuffer.

# Module Import

ESM:
```js
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  setEnvironmentData,
  getEnvironmentData
} from 'node:worker_threads';
```
CommonJS:
```js
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  setEnvironmentData,
  getEnvironmentData
} = require('node:worker_threads');
```

# Worker Constructor and Options

## Signature
```ts
new Worker(
  filename: string | URL,
  options?: WorkerOptions
): Worker
```

## WorkerOptions
- argv: any[]  Default: []
- env: Object | symbol (worker.SHARE_ENV)  Default: process.env
- execArgv: string[]  Default: parent process.execArgv
- stdin: boolean  Default: false
- stdout: boolean  Default: false
- stderr: boolean  Default: false
- eval: boolean  Default: false
- workerData: any  Default: undefined
- trackUnmanagedFds: boolean  Default: true
- transferList: Object[]
- resourceLimits: { maxOldGenerationSizeMb: number; maxYoungGenerationSizeMb: number; codeRangeSizeMb: number; stackSizeMb: number }
- name: string  Default: 'WorkerThread'

# Core Worker Methods and Properties

## Properties
- worker.threadId: number
- worker.resourceLimits: same as options.resourceLimits
- worker.stdout: WritableStream
- worker.stderr: WritableStream
- worker.stdin: WritableStream
- worker.performance: Performance
- worker.workerData: any

## Events
- 'online'
- 'message' (value: any)
- 'messageerror' (error: Error)
- 'error' (err: Error)
- 'exit' (exitCode: number)

## Methods
- worker.postMessage(value: any, transferList?: Object[], timeout?: number): void
- worker.terminate(): Promise<number>
- worker.ref(): void
- worker.unref(): void
- worker.getHeapSnapshot(options?: { exposeInternals?: boolean; exposeNumericValues?: boolean }): Promise<ReadableStream>
- worker.getHeapStatistics(): Promise<Object>

# MessageChannel & MessagePort

## new MessageChannel()
Returns { port1: MessagePort; port2: MessagePort }

### MessagePort Methods
- port.postMessage(value: any, transferList?: Object[]): void
- port.close(): void
- port.start(): void
- port.ref(): void
- port.unref(): void
- port.hasRef(): boolean

### Events
- 'message' (value: any)
- 'messageerror' (error: Error)
- 'close'

# BroadcastChannel

## new BroadcastChannel(name: any)

### Methods
- postMessage(message: any): void
- close(): void
- ref(): void
- unref(): void

### Properties
- onmessage: (event: MessageEvent) => void
- onmessageerror: (error: Event) => void

# Utility Functions

- isMainThread: boolean
- isInternalThread: boolean
- setEnvironmentData(key: any, value?: any): void
- getEnvironmentData(key: any): any
- markAsUntransferable(object: any): void
- isMarkedAsUntransferable(object: any): boolean
- markAsUncloneable(object: any): void
- moveMessagePortToContext(port: MessagePort, contextifiedSandbox: Object): MessagePort
- postMessageToThread(threadId: number, value: any, transferList?: Object[], timeout?: number): Promise<void>
- receiveMessageOnPort(port: MessagePort | BroadcastChannel): { message: any } | undefined

# Data Size & Links
- Data Size: 3738703 bytes
- Links Found: 3107
- Retrieved: 2024-06-17


## Attribution
- Source: Node.js Worker Threads
- URL: https://nodejs.org/api/worker_threads.html
- License: Node.js License
- Crawl Date: 2025-05-10T18:28:35.305Z
- Data Size: 3738703 bytes
- Links Found: 3107

## Retrieved
2025-05-10

# WORKER_THREADS

## Crawl Summary
Worker constructor accepts filename:string|URL and options including argv:any[], env:ProcessEnv|SHARE_ENV, eval:boolean, execArgv:string[], stdin/ stdout/ stderr booleans, workerData:any, trackUnmanagedFds:boolean(default true), transferList:any[], resourceLimits:{maxYoungGenerationSizeMb, maxOldGenerationSizeMb, codeRangeSizeMb, stackSizeMb}, name:string(default 'WorkerThread').  Worker instance exposes threadId:number, resourceLimits, stdio streams, workerData, parentPort, performance.  Instance methods: postMessage(value,transferList), postMessageToThread(threadId,value,transferList,timeout):Promise, getHeapSnapshot(options):Promise<Readable>, getHeapStatistics():Promise<HeapStatistics>, terminate(), ref()/unref().  Global APIs: isMainThread, isInternalThread, set/getEnvironmentData(key,value), SHARE_ENV, markAsUntransferable(object), isMarkedAsUntransferable(object), markAsUncloneable(object), moveMessagePortToContext(port,context):MessagePort, receiveMessageOnPort(port):{message}|undefined.  MessageChannel: new MessageChannel()→{port1,port2}.  MessagePort methods: postMessage(value,transferList), close(),start(),ref(),unref(),hasRef(); events 'message','messageerror','close'.  BroadcastChannel: new BroadcastChannel(name), methods postMessage,close,ref,unref; events onmessage,onmessageerror.  Diagnostics: performance.eventLoopUtilization(util1?,util2?)→utilization result.  Transfer/clones: transferring ArrayBuffer detaches views; markAsUntransferable prevents transfer; markAsUncloneable prevents clone; structured clone strips prototypes and accessors.

## Normalised Extract
Table of Contents:
1. Worker constructor
2. Worker instance API
3. Thread introspection properties
4. Environment data API
5. Message passing APIs
6. Channel classes: MessageChannel, MessagePort, BroadcastChannel
7. Transfer & clone control
8. Diagnostics methods

1. Worker constructor
Signature:
new Worker(filename: string | URL, options?: {
  argv?: any[];
  env?: NodeJS.ProcessEnv | symbol;
  eval?: boolean;
  execArgv?: string[];
  stdin?: boolean;
  stdout?: boolean;
  stderr?: boolean;
  workerData?: any;
  trackUnmanagedFds?: boolean;
  transferList?: any[];
  resourceLimits?: {
    maxYoungGenerationSizeMb?: number;
    maxOldGenerationSizeMb?: number;
    codeRangeSizeMb?: number;
    stackSizeMb?: number;
  };
  name?: string;
})
Default values:
env=process.env; trackUnmanagedFds=true; name='WorkerThread'; execArgv=inherit; stdio piping active=false; argv=[]; transferList=[]

2. Worker instance API
Properties:
- threadId: unique integer
- resourceLimits: {maxYoungGenerationSizeMb, maxOldGenerationSizeMb, codeRangeSizeMb, stackSizeMb}
- stdin: Writable if options.stdin=true
- stdout: Readable if options.stdout=true
- stderr: Readable if options.stderr=true
- workerData: clone of options.workerData
- parentPort: MessagePort | null
- performance: { eventLoopUtilization(util1?,util2?): result }

Methods:
- postMessage(value: any, transferList?: any[]): void
- postMessageToThread(threadId: number, value: any, transferList?: any[], timeout?: number): Promise<void>
- getHeapSnapshot(options?: { exposeInternals?: boolean; exposeNumericValues?: boolean }): Promise<Readable>
- getHeapStatistics(): Promise<HeapStatistics>
- terminate(): void
- ref(): void
- unref(): void

Events (Worker extends EventEmitter):
- 'online'
- 'message'(value: any)
- 'messageerror'(error: Error)
- 'error'(err: Error)
- 'exit'(exitCode: number)

3. Thread introspection properties
- isMainThread: boolean
- isInternalThread: boolean
- threadId: number
- workerData: any

4. Environment data API
- setEnvironmentData(key: any, value?: any): void
- getEnvironmentData(key: any): any
- SHARE_ENV: symbol

5. Message passing APIs
- receiveMessageOnPort(port: MessagePort | BroadcastChannel): { message: any } | undefined

6. Channel classes
MessageChannel:
- new MessageChannel(): { port1: MessagePort; port2: MessagePort }

MessagePort (extends EventTarget):
Methods: postMessage(value: any, transferList?: any[]): void; close(): void; start(): void; ref(): void; unref(): void; hasRef(): boolean
Events: 'message'(value); 'messageerror'(error); 'close'()

BroadcastChannel (extends EventTarget):
- new BroadcastChannel(name: any)
Methods: postMessage(message: any): void; close(): void; ref(): void; unref(): void
Properties: onmessage: (event)=>void; onmessageerror: (event)=>void

7. Transfer & clone control
- markAsUntransferable(object: any): void
- isMarkedAsUntransferable(object: any): boolean
- markAsUncloneable(object: any): void
- moveMessagePortToContext(port: MessagePort, contextifiedSandbox: any): MessagePort

8. Diagnostics methods
- performance.eventLoopUtilization(util1?: EventLoopUtilization, util2?: EventLoopUtilization): EventLoopUtilizationResult

## Supplementary Details
Worker pool pattern using AsyncResource:
import { Worker } from 'node:worker_threads';
import { AsyncResource } from 'async_hooks';
class TaskResource extends AsyncResource {
  constructor() { super('WorkerTask'); }
  run(taskFn, callback) {
    this.runInAsyncScope(taskFn, null, callback);
  }
}
class WorkerPool {
  constructor(size) {
    this.workers = []; this.queue = [];
    for (let i = 0; i < size; i++) this.workers.push(new WorkerPoolWorker());
  }
  exec(taskData) {
    return new Promise((resolve, reject) => {
      const resource = new TaskResource();
      this.queue.push({ taskData, resolve, reject, resource });
      this.dequeue();
    });
  }
  dequeue() {
    if (!this.queue.length) return;
    const worker = this.workers.find(w => w.idle);
    if (!worker) return;
    const { taskData, resolve, reject, resource } = this.queue.shift();
    worker.idle = false;
    resource.run(() => worker.postMessage(taskData), (err, result) => {
      worker.idle = true;
      err ? reject(err) : resolve(result);
      this.dequeue();
    });
  }
}

Recommended pool size: os.cpus().length; catch 'error' and 'exit' on Worker to respawn if necessary.

ResourceLimits tuning:
Providing resourceLimits to constructor sets V8 memory ceilings. Example:
new Worker(file, { resourceLimits: { maxOldGenerationSizeMb:512, maxYoungGenerationSizeMb:128, codeRangeSizeMb:64, stackSizeMb:4 } });

## Reference Details
Worker constructor:
new Worker(filename: string|URL,
  options?: {
    argv?: any[];
    env?: NodeJS.ProcessEnv|symbol;
    eval?: boolean;
    execArgv?: string[];
    stdin?: boolean;
    stdout?: boolean;
    stderr?: boolean;
    workerData?: any;
    trackUnmanagedFds?: boolean;
    transferList?: any[];
    resourceLimits?: {
      maxYoungGenerationSizeMb?: number;
      maxOldGenerationSizeMb?: number;
      codeRangeSizeMb?: number;
      stackSizeMb?: number;
    };
    name?: string;
  }
) => Worker

postMessage:
worker.postMessage(value: any, transferList?: any[]): void
Throws if untransferable in transferList

postMessageToThread:
worker.postMessageToThread(threadId: number, value: any, transferList?: any[], timeout?: number): Promise<void>
Errors: ERR_WORKER_MESSAGING_FAILED, ERR_WORKER_MESSAGING_SAME_THREAD, ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST, ERR_WORKER_MESSAGING_TIMEOUT, ERR_WORKER_MESSAGING_ERRORED

receiveMessageOnPort:
receiveMessageOnPort(port: MessagePort|BroadcastChannel):
  undefined if queue empty or { message: any }

setEnvironmentData:
setEnvironmentData(key: any, value?: any): void
getEnvironmentData(key: any): any
SHARE_ENV: symbol

markAsUntransferable(object: any): void
isMarkedAsUntransferable(object: any): boolean
markAsUncloneable(object: any): void
moveMessagePortToContext(port: MessagePort, contextifiedSandbox: any): MessagePort

MessageChannel:
new MessageChannel(): { port1: MessagePort; port2: MessagePort }

MessagePort:
postMessage(value: any, transferList?: any[]): void
close(): void
start(): void
ref(): void
unref(): void
hasRef(): boolean
Events: 'message'(value), 'messageerror'(error), 'close'()

BroadcastChannel:
new BroadcastChannel(name: any)
postMessage(message: any): void
close(): void
ref(): void
unref(): void
onmessage(event: MessageEvent): void
onmessageerror(event: MessageErrorEvent): void

Worker methods:
getHeapSnapshot(options?: { exposeInternals?: boolean; exposeNumericValues?: boolean }): Promise<Readable>
getHeapStatistics(): Promise<HeapStatistics>
performance.eventLoopUtilization(util1?: EventLoopUtilization, util2?: EventLoopUtilization): EventLoopUtilizationResult
terminate(): void
ref(): void
unref(): void

Best practices:
• Use a fixed thread pool sized by os.cpus().length
• Use AsyncResource to correlate tasks in async_hooks
• Handle 'error' and 'exit' to respawn workers

Troubleshooting:
• List active workers: console.log(worker.threadId)
• Snapshot heap: await worker.getHeapSnapshot()
• Inspect memory usage: await worker.getHeapStatistics()
• Measure event loop: worker.performance.eventLoopUtilization()
• Enable inspector: node --inspect-brk main.js
• Trace events: --trace-events-enabled

## Information Dense Extract
WorkerOptions:{argv:any[],env:ProcessEnv|symbol=process.env,eval:boolean,execArgv:string[]=inherit,stdin:boolean=false,stdout:boolean=false,stderr:boolean=false,workerData:any,trackUnmanagedFds:boolean=true,transferList:any[],resourceLimits:{maxYoungGenerationSizeMb?,maxOldGenerationSizeMb?,codeRangeSizeMb?,stackSizeMb?},name:string='WorkerThread'}; Worker:{threadId:number,resourceLimits,stdin?,stdout?,stderr?,workerData,parentPort?,performance}; Methods: postMessage(value:any,transferList?:any[]):void; postMessageToThread(id:number,value:any,transferList?:any[],timeout?:number):Promise<void>; getHeapSnapshot(opts?):Promise<Readable>; getHeapStatistics():Promise<HeapStatistics>; terminate():void; ref():void; unref():void; Events:'online','message'(value),'messageerror'(err),'error'(err),'exit'(code). Static: isMainThread:boolean; isInternalThread:boolean; setEnvironmentData(key:any,value?):void; getEnvironmentData(key:any):any; SHARE_ENV; markAsUntransferable(obj):void; isMarkedAsUntransferable(obj):boolean; markAsUncloneable(obj):void; moveMessagePortToContext(port,ctx):MessagePort; receiveMessageOnPort(port):{message:any}|undefined. Channels: MessageChannel->{port1,port2}; MessagePort:{postMessage,close,start,ref,unref,hasRef},events 'message','messageerror','close'; BroadcastChannel:{new BroadcastChannel(name),postMessage,close,ref,unref,onmessage,onmessageerror}. Diagnostics: performance.eventLoopUtilization(util1?,util2?):result. Transfer: ArrayBuffer transfers detach views; clone strips prototypes/non-enumerables/accessors.

## Sanitised Extract
Table of Contents:
1. Worker constructor
2. Worker instance API
3. Thread introspection properties
4. Environment data API
5. Message passing APIs
6. Channel classes: MessageChannel, MessagePort, BroadcastChannel
7. Transfer & clone control
8. Diagnostics methods

1. Worker constructor
Signature:
new Worker(filename: string | URL, options?: {
  argv?: any[];
  env?: NodeJS.ProcessEnv | symbol;
  eval?: boolean;
  execArgv?: string[];
  stdin?: boolean;
  stdout?: boolean;
  stderr?: boolean;
  workerData?: any;
  trackUnmanagedFds?: boolean;
  transferList?: any[];
  resourceLimits?: {
    maxYoungGenerationSizeMb?: number;
    maxOldGenerationSizeMb?: number;
    codeRangeSizeMb?: number;
    stackSizeMb?: number;
  };
  name?: string;
})
Default values:
env=process.env; trackUnmanagedFds=true; name='WorkerThread'; execArgv=inherit; stdio piping active=false; argv=[]; transferList=[]

2. Worker instance API
Properties:
- threadId: unique integer
- resourceLimits: {maxYoungGenerationSizeMb, maxOldGenerationSizeMb, codeRangeSizeMb, stackSizeMb}
- stdin: Writable if options.stdin=true
- stdout: Readable if options.stdout=true
- stderr: Readable if options.stderr=true
- workerData: clone of options.workerData
- parentPort: MessagePort | null
- performance: { eventLoopUtilization(util1?,util2?): result }

Methods:
- postMessage(value: any, transferList?: any[]): void
- postMessageToThread(threadId: number, value: any, transferList?: any[], timeout?: number): Promise<void>
- getHeapSnapshot(options?: { exposeInternals?: boolean; exposeNumericValues?: boolean }): Promise<Readable>
- getHeapStatistics(): Promise<HeapStatistics>
- terminate(): void
- ref(): void
- unref(): void

Events (Worker extends EventEmitter):
- 'online'
- 'message'(value: any)
- 'messageerror'(error: Error)
- 'error'(err: Error)
- 'exit'(exitCode: number)

3. Thread introspection properties
- isMainThread: boolean
- isInternalThread: boolean
- threadId: number
- workerData: any

4. Environment data API
- setEnvironmentData(key: any, value?: any): void
- getEnvironmentData(key: any): any
- SHARE_ENV: symbol

5. Message passing APIs
- receiveMessageOnPort(port: MessagePort | BroadcastChannel): { message: any } | undefined

6. Channel classes
MessageChannel:
- new MessageChannel(): { port1: MessagePort; port2: MessagePort }

MessagePort (extends EventTarget):
Methods: postMessage(value: any, transferList?: any[]): void; close(): void; start(): void; ref(): void; unref(): void; hasRef(): boolean
Events: 'message'(value); 'messageerror'(error); 'close'()

BroadcastChannel (extends EventTarget):
- new BroadcastChannel(name: any)
Methods: postMessage(message: any): void; close(): void; ref(): void; unref(): void
Properties: onmessage: (event)=>void; onmessageerror: (event)=>void

7. Transfer & clone control
- markAsUntransferable(object: any): void
- isMarkedAsUntransferable(object: any): boolean
- markAsUncloneable(object: any): void
- moveMessagePortToContext(port: MessagePort, contextifiedSandbox: any): MessagePort

8. Diagnostics methods
- performance.eventLoopUtilization(util1?: EventLoopUtilization, util2?: EventLoopUtilization): EventLoopUtilizationResult

## Original Source
Node.js Worker Threads API
https://nodejs.org/api/worker_threads.html

## Digest of WORKER_THREADS

# Worker threads API (Node.js v24.0.1)

Data Size: 3424865 bytes  
Retrieval Date: 2024-06-07  

# Worker Constructor
**Signature**:  
`new Worker(filename: string | URL, options?: WorkerOptions)`  

**WorkerOptions**:  
• argv: any[] – values appended to process.argv  
• env: NodeJS.ProcessEnv | symbol – initial process.env or SHARE_ENV  
• eval: boolean – treat filename as code  
• execArgv: string[] – CLI options passed to worker (inherits parent by default)  
• stdin: boolean – enable worker.stdin writable stream  
• stdout: boolean – disable auto-piping to parent stdout  
• stderr: boolean – disable auto-piping to parent stderr  
• workerData: any – cloneable JS value for workerData  
• trackUnmanagedFds: boolean – auto-close raw fds on exit (default: true)  
• transferList: any[] – MessagePort-like objects in workerData  
• resourceLimits: { maxYoungGenerationSizeMb?: number; maxOldGenerationSizeMb?: number; codeRangeSizeMb?: number; stackSizeMb?: number }  
• name: string – worker name for debugging (default: 'WorkerThread')

# Worker Properties & Methods

## Properties
• threadId: number  
• resourceLimits: ResourceLimits  
• stderr: Writable  
• stdout: Readable  
• stdin: Writable  
• workerData: any  
• parentPort: MessagePort | null  
• performance: WorkerPerformance  

## Instance Methods
• postMessage(value: any, transferList?: any[]): void  
• postMessageToThread(threadId: number, value: any, transferList?: any[], timeout?: number): Promise<void>  
• getHeapSnapshot(options?: { exposeInternals?: boolean; exposeNumericValues?: boolean }): Promise<Readable>  
• getHeapStatistics(): Promise<HeapStatistics>  
• terminate(): void  
• ref(): void  
• unref(): void

# Static APIs & Context Utilities

## Thread Info
• isMainThread: boolean  
• isInternalThread: boolean  
• threadId: number  
• workerData: any

## Environment Data
• setEnvironmentData(key: any, value?: any): void  
• getEnvironmentData(key: any): any  
• SHARE_ENV: symbol

## Transfer & Clone Control
• markAsUntransferable(object: any): void  
• isMarkedAsUntransferable(object: any): boolean  
• markAsUncloneable(object: any): void  
• moveMessagePortToContext(port: MessagePort, contextifiedSandbox: any): MessagePort  
• receiveMessageOnPort(port: MessagePort | BroadcastChannel): { message: any } | undefined

# MessageChannel & MessagePort

## MessageChannel
• new MessageChannel(): { port1: MessagePort; port2: MessagePort }

## MessagePort Methods
• postMessage(value: any, transferList?: any[]): void  
• close(): void  
• start(): void  
• ref(): void  
• unref(): void  
• hasRef(): boolean

## MessagePort Events
• 'message'(value: any)  
• 'messageerror'(error: Error)  
• 'close'()

# BroadcastChannel

## Signature
• new BroadcastChannel(name: any)  

## Methods
• postMessage(message: any): void  
• close(): void  
• ref(): void  
• unref(): void

## Events
• onmessage(event: MessageEvent)  
• onmessageerror(event: MessageErrorEvent)

# Performance & Diagnostics

## performance.eventLoopUtilization([util1?: EventLoopUtilization, util2?: EventLoopUtilization]): EventLoopUtilizationResult

# Transfer & Clone Considerations

• Transferring an ArrayBuffer renders all TypedArray/Buffer views unusable.  
• markAsUntransferable() prevents transfer in transferList.  
• markAsUncloneable() prevents cloning when posting messages.  
• After transfer, objects are detached on sender side.  
• Structured clone omits prototypes, non-enumerables, accessors.


## Attribution
- Source: Node.js Worker Threads API
- URL: https://nodejs.org/api/worker_threads.html
- License: Node.js License
- Crawl Date: 2025-05-10T18:59:19.377Z
- Data Size: 3424865 bytes
- Links Found: 728

## Retrieved
2025-05-10

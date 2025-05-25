# PERF_HOOKS

## Crawl Summary
performance.clearMarks(name?:string):void  performance.clearMeasures(name?:string):void  performance.clearResourceTimings(name?:string):void  performance.eventLoopUtilization(util1?:Object,util2?:Object):{idle:number,active:number,utilization:number}  performance.getEntries():PerformanceEntry[]  performance.getEntriesByName(name:string,type?:string):PerformanceEntry[]  performance.getEntriesByType(type:string):PerformanceEntry[]  performance.mark(name:string,options?:{detail:any,startTime:number}):PerformanceMark  performance.markResourceTiming(timingInfo:object,requestedUrl:string,initiatorType:string,global:object,cacheMode:string,bodyInfo:object,responseStatus:number,deliveryType?:string):PerformanceResourceTiming  performance.measure(name:string,start?:string|{start?:number|string,end?:number|string,detail?:any,duration?:number},end?:string):PerformanceMeasure  performance.nodeTiming:PerformanceNodeTiming  performance.now():number  performance.setResourceTimingBufferSize(maxSize:number):void  performance.timeOrigin:number  performance.timerify(fn:Function,options?:{histogram?:RecordableHistogram}):Function  performance.toJSON():object  PerformanceObserver(callback) observes entryTypes, buffered  Histogram APIs createHistogram(options), monitorEventLoopDelay(options)

## Normalised Extract
Table of Contents:
1. Core Performance Methods
2. Entry Classes and Properties
3. PerformanceObserver Usage
4. Histogram and Event Loop Delay APIs
5. Examples and Patterns

1. Core Performance Methods
performance.clearMarks(name?: string): void  Removes all or named PerformanceMark entries.
performance.clearMeasures(name?: string): void  Removes all or named PerformanceMeasure entries.
performance.clearResourceTimings(name?: string): void  Removes all or named PerformanceResourceTiming entries.
performance.eventLoopUtilization(prev?: Object, prev2?: Object): { idle:number; active:number; utilization:number }  Returns cumulative or delta Event Loop Utilization.
performance.getEntries(): PerformanceEntry[]  Returns chronological list of all entries.
performance.getEntriesByName(name: string, type?: string): PerformanceEntry[]  Filters entries by name and optional type.
performance.getEntriesByType(type: string): PerformanceEntry[]  Filters entries by entryType.
performance.mark(name: string, options?: { detail?: any; startTime?: number }): PerformanceMark  Creates a mark at specified time with optional detail.
performance.measure(name: string, start?: string|{start:number|string,end:number|string,detail:any,duration:number}, end?: string): PerformanceMeasure  Creates a measure between two marks or timestamps.
performance.markResourceTiming(timingInfo:object, requestedUrl:string, initiatorType:string, global:object, cacheMode:string, bodyInfo:object, responseStatus:number, deliveryType?: string): PerformanceResourceTiming  Records a resource timing entry.
performance.now(): number  High-resolution timestamp since timeOrigin.
performance.timeOrigin: number  Unix epoch timestamp when Node.js process began.
performance.setResourceTimingBufferSize(maxSize: number): void  Sets global resource timing buffer limit (default 250).
performance.timerify(fn: Function, options?: { histogram?: RecordableHistogram }): Function  Wraps fn to measure execution time; emits 'function' entries.
performance.toJSON(): object  JSON representation of performance timing state.

2. Entry Classes and Properties
PerformanceEntry: { name:string; entryType:string; startTime:number; duration:number }
PerformanceMark extends PerformanceEntry: detail:any
PerformanceMeasure extends PerformanceEntry: detail:any
PerformanceResourceTiming extends PerformanceEntry: workerStart,redirectStart,redirectEnd,fetchStart,domainLookupStart,domainLookupEnd,connectStart,connectEnd,secureConnectionStart,requestStart,responseEnd,transferSize,encodedBodySize,decodedBodySize,toJSON()
PerformanceNodeTiming: bootstrapComplete,environment,nodeStart,loopStart,loopExit,idleTime,v8Start,uvMetricsInfo({loopCount,events,eventsWaiting})

3. PerformanceObserver Usage
new PerformanceObserver(callback(list,observer)): subscribes to entryTypes or type; options: { entryTypes:string[]; buffered?:boolean }
observer.observe({ entryTypes:['mark','measure'], buffered:true })
observer.takeRecords(): PerformanceEntry[]
observer.disconnect(): void
supportedEntryTypes: string[]

4. Histogram and Event Loop Delay APIs
createHistogram(options?: { min?:number; max?:number; buckets?:number }): RecordableHistogram
monitorEventLoopDelay(options?: { resolution?: number }): Histogram
Histogram: count,countBigInt,exceeds(),exceedsBigInt(),max,maxBigInt,mean,min,minBigInt,percentile(),percentileBigInt(),percentiles,percentilesBigInt,stddev,reset()
IntervalHistogram: enable(),disable(),clone()
RecordableHistogram: record(value:number|BigInt),recordDelta(),add(other:Histogram)

5. Examples and Patterns
Wrap synchronous or async functions with performance.timerify and subscribe to 'function' entries.
Use clearMarks and clearMeasures after observations to prevent timeline growth.
Handle 'resourcetimingbufferfull' event: performance.setResourceTimingBufferSize or clearResourceTimings.


## Supplementary Details
Default resource timing buffer size: 250 entries.  Adjust with performance.setResourceTimingBufferSize(maxSize:number).
Event Loop Utilization (ELU) formula: utilization = active/(active+idle). Pass previous result to compute delta.  initial ELU returns object with idle, active, utilization=0 until bootstrap complete.  Worker threads always have ELU available.
Histogram options: { min:number (default 1e-6), max:number (default 1e9), buckets:number (default 100) }.
monitorEventLoopDelay resolution default: 10ms. Returns a Histogram recording event loop delays.
PerformanceObserver options: buffered:true to include existing entries; omit buffered to receive only new entries.
perf_hooks.constants for GC kinds and flags: NODE_PERFORMANCE_GC_MAJOR=1, _MINOR=2, _INCREMENTAL=4, _WEAKCB=8. Flags: NO=1, CONSTRUCT_RETAINED=2, FORCED=4, SYNCHRONOUS_PHANTOM_PROCESSING=8, ALL_AVAILABLE_GARBAGE=16, ALL_EXTERNAL_MEMORY=32, SCHEDULE_IDLE=64.
PerformanceNodeTiming.uvMetricsInfo must be accessed inside setImmediate to avoid capturing before loop iteration ends.
markResourceTiming cacheMode must be '' or 'local'. deliveryType default ''. bodyInfo structure: { size:number, type:string }.


## Reference Details
// Import
import { performance, PerformanceObserver, constants } from 'node:perf_hooks';

// Core Methods
performance.clearMarks(name?: string): void  // Versions: v8.5.0; Receiver: performance
performance.clearMeasures(name?: string): void  // Added v16.7.0
performance.clearResourceTimings(name?: string): void  // Added v18.2.0
performance.eventLoopUtilization(prev?:ELU, prev2?:ELU): ELU  // v12.19.0, returns { idle:number, active:number, utilization:number }
performance.getEntries(): PerformanceEntry[]  // v16.7.0
performance.getEntriesByName(name:string, type?:string): PerformanceEntry[]  // v16.7.0
performance.getEntriesByType(type:string): PerformanceEntry[]  // v16.7.0
performance.mark(name:string, options?:{ detail?:any; startTime?:number }): PerformanceMark  // v8.5.0
performance.measure(name:string, start?:string|MeasureOptions, end?:string): PerformanceMeasure  // v8.5.0
performance.markResourceTiming(timingInfo:FetchTimingInfo, requestedUrl:string, initiatorType:string, global:Object, cacheMode:''|'local', bodyInfo:ResponseBodyInfo, responseStatus:number, deliveryType?:string): PerformanceResourceTiming  // v18.2.0
performance.now(): number // v8.5.0
performance.timeOrigin: number // v8.5.0
performance.setResourceTimingBufferSize(maxSize:number): void // v18.8.0
performance.timerify(fn:Function, options?:{ histogram:RecordableHistogram }): Function  // v8.5.0
performance.toJSON(): PerformanceJSON  // v16.1.0

// Classes and Interfaces
interface PerformanceEntry { name:string; entryType:string; startTime:number; duration:number }
interface PerformanceMark extends PerformanceEntry { detail:any }
interface PerformanceMeasure extends PerformanceEntry { detail:any }
interface PerformanceResourceTiming extends PerformanceEntry { workerStart:number; redirectStart:number; redirectEnd:number; fetchStart:number; domainLookupStart:number; domainLookupEnd:number; connectStart:number; connectEnd:number; secureConnectionStart:number; requestStart:number; responseEnd:number; transferSize:number; encodedBodySize:number; decodedBodySize:number; toJSON(): object }
interface PerformanceNodeTiming { bootstrapComplete:number; environment:number; idleTime:number; loopExit:number; loopStart:number; nodeStart:number; uvMetricsInfo:{loopCount:number; events:number; eventsWaiting:number}; v8Start:number }

enum NODE_PERFORMANCE_GC_FLAGS { NO=1, CONSTRUCT_RETAINED=2, FORCED=4, SYNCHRONOUS_PHANTOM_PROCESSING=8, ALL_AVAILABLE_GARBAGE=16, ALL_EXTERNAL_MEMORY=32, SCHEDULE_IDLE=64 }
enum NODE_PERFORMANCE_GC_KIND { MAJOR=1, MINOR=2, INCREMENTAL=4, WEAKCB=8 }

// PerformanceObserver
class PerformanceObserver {
  static supportedEntryTypes: string[];
  constructor(callback: (list: PerformanceObserverEntryList, observer: PerformanceObserver) => void);
  observe(options: { entryTypes?: string[]; type?: string; buffered?: boolean }): void;
  disconnect(): void;
  takeRecords(): PerformanceEntry[];
}
interface PerformanceObserverEntryList {
  getEntries(): PerformanceEntry[];
  getEntriesByName(name:string, type?:string): PerformanceEntry[];
  getEntriesByType(type:string): PerformanceEntry[];
}

// Histogram APIs
function createHistogram(options?:{ min?:number; max?:number; buckets?:number }): RecordableHistogram;
function monitorEventLoopDelay(options?:{ resolution?: number }): Histogram;
interface Histogram {
  count: number; countBigInt: BigInt;
  exceeds(threshold:number): number; exceedsBigInt(threshold:BigInt): BigInt;
  max:number; maxBigInt:BigInt;
  mean:number; min:number; minBigInt:BigInt;
  percentile(p:number):number; percentileBigInt(p:BigInt):BigInt;
  percentiles:object; percentilesBigInt:object;
  stddev: number;
  reset(): void;
}
interface IntervalHistogram extends Histogram { enable(): void; disable(): void; clone(): IntervalHistogram; }
interface RecordableHistogram extends Histogram { record(val:number|BigInt): void; recordDelta(): void; add(other:Histogram): void; }

// Usage Patterns and Best Practices
// 1. Measuring async operation duration:
const obs = new PerformanceObserver((list) => { console.log(list.getEntries()[0].duration); performance.clearMarks(); performance.clearMeasures(); obs.disconnect(); });
obs.observe({ entryTypes: ['measure'], buffered: true });
performance.mark('start'); await asyncOp(); performance.measure('start-to-end', 'start');

// 2. Event Loop Delay Monitoring:
const h = monitorEventLoopDelay({ resolution: 5 }); h.enable(); setTimeout(() => { h.disable(); console.log(h.percentile(99)); }, 1000);

// 3. Handling resourcetimingbufferfull:
performance.on('resourcetimingbufferfull', () => { performance.clearResourceTimings(); });
performance.setResourceTimingBufferSize(500);

// Troubleshooting Commands
// Inspect current entries:
console.log(performance.getEntries());
// Clear all timelines:
performance.clearMarks(); performance.clearMeasures(); performance.clearResourceTimings();
// Increase buffer:
performance.setResourceTimingBufferSize(1000);


## Information Dense Extract
clearMarks(name?:string):void; clearMeasures(name?:string):void; clearResourceTimings(name?:string):void; eventLoopUtilization(prev?:ELU,prev2?:ELU):{idle:number,active:number,utilization:number}; getEntries():PerformanceEntry[]; getEntriesByName(name:string,type?:string):PerformanceEntry[]; getEntriesByType(type:string):PerformanceEntry[]; mark(name:string,options?:{detail:any,startTime:number}):PerformanceMark; measure(name:string,start?:string|MeasureOptions,end?:string):PerformanceMeasure; markResourceTiming(info, url:string, type:string, global:object, cacheMode:''|'local', bodyInfo:object, status:number, deliveryType?:string):PerformanceResourceTiming; now():number; timeOrigin:number; setResourceTimingBufferSize(max:number):void; timerify(fn:Function,options?:{histogram:RecordableHistogram}):Function; toJSON():object; PerformanceObserver(callback).observe({entryTypes:string[],buffered?:boolean}); observer.takeRecords():PerformanceEntry[]; observer.disconnect(); createHistogram({min?:number,max?:number,buckets?:number}):RecordableHistogram; monitorEventLoopDelay({resolution?:number}):Histogram; histogram.count,mean,min,max,stddev,percentile(),reset(); IntervalHistogram.enable()/disable()/clone(); RecordableHistogram.record()/recordDelta()/add(); constants NODE_PERFORMANCE_GC_KIND and FLAGS.

## Sanitised Extract
Table of Contents:
1. Core Performance Methods
2. Entry Classes and Properties
3. PerformanceObserver Usage
4. Histogram and Event Loop Delay APIs
5. Examples and Patterns

1. Core Performance Methods
performance.clearMarks(name?: string): void  Removes all or named PerformanceMark entries.
performance.clearMeasures(name?: string): void  Removes all or named PerformanceMeasure entries.
performance.clearResourceTimings(name?: string): void  Removes all or named PerformanceResourceTiming entries.
performance.eventLoopUtilization(prev?: Object, prev2?: Object): { idle:number; active:number; utilization:number }  Returns cumulative or delta Event Loop Utilization.
performance.getEntries(): PerformanceEntry[]  Returns chronological list of all entries.
performance.getEntriesByName(name: string, type?: string): PerformanceEntry[]  Filters entries by name and optional type.
performance.getEntriesByType(type: string): PerformanceEntry[]  Filters entries by entryType.
performance.mark(name: string, options?: { detail?: any; startTime?: number }): PerformanceMark  Creates a mark at specified time with optional detail.
performance.measure(name: string, start?: string|{start:number|string,end:number|string,detail:any,duration:number}, end?: string): PerformanceMeasure  Creates a measure between two marks or timestamps.
performance.markResourceTiming(timingInfo:object, requestedUrl:string, initiatorType:string, global:object, cacheMode:string, bodyInfo:object, responseStatus:number, deliveryType?: string): PerformanceResourceTiming  Records a resource timing entry.
performance.now(): number  High-resolution timestamp since timeOrigin.
performance.timeOrigin: number  Unix epoch timestamp when Node.js process began.
performance.setResourceTimingBufferSize(maxSize: number): void  Sets global resource timing buffer limit (default 250).
performance.timerify(fn: Function, options?: { histogram?: RecordableHistogram }): Function  Wraps fn to measure execution time; emits 'function' entries.
performance.toJSON(): object  JSON representation of performance timing state.

2. Entry Classes and Properties
PerformanceEntry: { name:string; entryType:string; startTime:number; duration:number }
PerformanceMark extends PerformanceEntry: detail:any
PerformanceMeasure extends PerformanceEntry: detail:any
PerformanceResourceTiming extends PerformanceEntry: workerStart,redirectStart,redirectEnd,fetchStart,domainLookupStart,domainLookupEnd,connectStart,connectEnd,secureConnectionStart,requestStart,responseEnd,transferSize,encodedBodySize,decodedBodySize,toJSON()
PerformanceNodeTiming: bootstrapComplete,environment,nodeStart,loopStart,loopExit,idleTime,v8Start,uvMetricsInfo({loopCount,events,eventsWaiting})

3. PerformanceObserver Usage
new PerformanceObserver(callback(list,observer)): subscribes to entryTypes or type; options: { entryTypes:string[]; buffered?:boolean }
observer.observe({ entryTypes:['mark','measure'], buffered:true })
observer.takeRecords(): PerformanceEntry[]
observer.disconnect(): void
supportedEntryTypes: string[]

4. Histogram and Event Loop Delay APIs
createHistogram(options?: { min?:number; max?:number; buckets?:number }): RecordableHistogram
monitorEventLoopDelay(options?: { resolution?: number }): Histogram
Histogram: count,countBigInt,exceeds(),exceedsBigInt(),max,maxBigInt,mean,min,minBigInt,percentile(),percentileBigInt(),percentiles,percentilesBigInt,stddev,reset()
IntervalHistogram: enable(),disable(),clone()
RecordableHistogram: record(value:number|BigInt),recordDelta(),add(other:Histogram)

5. Examples and Patterns
Wrap synchronous or async functions with performance.timerify and subscribe to 'function' entries.
Use clearMarks and clearMeasures after observations to prevent timeline growth.
Handle 'resourcetimingbufferfull' event: performance.setResourceTimingBufferSize or clearResourceTimings.

## Original Source
Node.js Performance Hooks API
https://nodejs.org/api/perf_hooks.html

## Digest of PERF_HOOKS

# Performance Hooks API (v24.1.0, retrieved 2024-06-15)

# perf_hooks.performance
- clearMarks(name?: string): void  
- clearMeasures(name?: string): void  
- clearResourceTimings(name?: string): void  
- eventLoopUtilization(util1?: Object, util2?: Object): { idle: number, active: number, utilization: number }  
- getEntries(): PerformanceEntry[]  
- getEntriesByName(name: string, type?: string): PerformanceEntry[]  
- getEntriesByType(type: string): PerformanceEntry[]  
- mark(name: string, options?: { detail?: any; startTime?: number }): PerformanceMark  
- markResourceTiming(timingInfo: object, requestedUrl: string, initiatorType: string, global: object, cacheMode: string, bodyInfo: object, responseStatus: number, deliveryType?: string): PerformanceResourceTiming  
- measure(name: string, startMarkOrOptions?: string | { start?: number|string; end?: number|string; detail?: any; duration?: number }, endMark?: string): PerformanceMeasure  
- nodeTiming: PerformanceNodeTiming  
- now(): number  
- setResourceTimingBufferSize(maxSize: number): void  
- timeOrigin: number  
- timerify(fn: Function, options?: { histogram?: RecordableHistogram }): Function  
- toJSON(): object  

Event: 'resourcetimingbufferfull'

# Class: PerformanceEntry
- duration: number  
- entryType: string  
- name: string  
- startTime: number  

# Class: PerformanceMark
- detail: any  

# Class: PerformanceMeasure
- detail: any  

# Class: PerformanceNodeEntry
- detail: any  
- flags: number  
- kind: number  

# Garbage Collection ('gc') Details
- detail: { kind: number, flags: number }  

# HTTP ('http') Details
- detail: { req: { method: string, url: string, headers: object }, res: { statusCode: number, statusMessage: string, headers: object } }  

# HTTP/2 ('http2') Details
- detail for Http2Stream: { bytesRead: number, bytesWritten: number, id: number, timeToFirstByte: number, timeToFirstByteSent: number, timeToFirstHeader: number }  
- detail for Http2Session: { bytesRead: number, bytesWritten: number, framesReceived: number, framesSent: number, maxConcurrentStreams: number, pingRTT?: number, streamAverageDuration: number, streamCount: number, type: string }  

# Timerify ('function') Details
- detail: Array<any>  

# Net ('net') Details
- detail for connect: { host: string, port: number }  

# DNS ('dns') Details
- lookup: { hostname: string, family: number, hints: number, verbatim: boolean, addresses: any[] }  
- lookupService: { host: string, port: number, hostname: string, service: string }  
- query/getHostByAddr: { host: string, ttl: number, result: any }  

# Class: PerformanceNodeTiming
- bootstrapComplete: number  
- environment: number  
- idleTime: number  
- loopExit: number  
- loopStart: number  
- nodeStart: number  
- uvMetricsInfo: { loopCount: number, events: number, eventsWaiting: number }  
- v8Start: number  

# Class: PerformanceResourceTiming
- workerStart: number  
- redirectStart: number  
- redirectEnd: number  
- fetchStart: number  
- domainLookupStart: number  
- domainLookupEnd: number  
- connectStart: number  
- connectEnd: number  
- secureConnectionStart: number  
- requestStart: number  
- responseEnd: number  
- transferSize: number  
- encodedBodySize: number  
- decodedBodySize: number  
- toJSON(): object  

# Class: PerformanceObserver
- supportedEntryTypes: string[]  
- new PerformanceObserver(callback: (list: PerformanceObserverEntryList, observer: PerformanceObserver) => void)  
- disconnect(): void  
- observe(options: { type?: string; entryTypes?: string[]; buffered?: boolean }): void  
- takeRecords(): PerformanceEntry[]  

# Class: PerformanceObserverEntryList
- getEntries(): PerformanceEntry[]  
- getEntriesByName(name: string, type?: string): PerformanceEntry[]  
- getEntriesByType(type: string): PerformanceEntry[]  

# Histogram APIs
- perf_hooks.createHistogram(options?: { min?: number; max?: number; buckets?: number }): RecordableHistogram  
- perf_hooks.monitorEventLoopDelay(options?: { resolution?: number; histogram?: Histogram }): Histogram  

# Class: Histogram
- count: number  
- countBigInt: BigInt  
- exceeds(threshold: number): number  
- exceedsBigInt(threshold: BigInt): BigInt  
- max: number  
- maxBigInt: BigInt  
- mean: number  
- min: number  
- minBigInt: BigInt  
- percentile(percentile: number): number  
- percentileBigInt(percentile: BigInt): BigInt  
- percentiles: object  
- percentilesBigInt: object  
- stddev: number  
- reset(): void  

# Class: IntervalHistogram extends Histogram
- enable(): void  
- disable(): void  
- clone(): IntervalHistogram  

# Class: RecordableHistogram extends Histogram
- record(value: number | BigInt): void  
- recordDelta(): void  
- add(other: Histogram): void  


## Attribution
- Source: Node.js Performance Hooks API
- URL: https://nodejs.org/api/perf_hooks.html
- License: License: MIT
- Crawl Date: 2025-05-25T03:39:53.534Z
- Data Size: 3585700 bytes
- Links Found: 2305

## Retrieved
2025-05-25

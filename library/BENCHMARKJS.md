# BENCHMARKJS

## Crawl Summary
Constructor signature: Benchmark(name:String, fn:Function|string, options?:Object)
Default options: async=false, defer=false, delay=0, id=auto, initCount=1, maxTime=5, minSamples=5, minTime=0, name=undefined, callbacks:onAbort,onComplete,onCycle,onError,onReset,onStart, setup:Function|string, teardown:Function|string
Static methods: version():String, filter(Array,Function|string):Array, formatNumber(Number):String, invoke(Array,String|Object,...*):Array, join(Array|Object,String, String):String, runInContext(Object):Function
Instance props: aborted:Boolean, compiled:Function|string, count:Number, cycles:Number, error:Object, fn:Function|string, hz:Number, running:Boolean, stats:{mean,deviation,moe,rme,sem,variance,sample}, times:{cycle,elapsed,period,timeStamp}
Instance methods: abort():Benchmark, clone(Object):Benchmark, compare(Benchmark):Number, reset():Benchmark, run(Object):Benchmark, toString():String
Suite API: Suite(name:String,options:Object):Suite; properties aborted, length, running; methods add, abort, clone, emit, filter, listeners, off, on, reset, run

## Normalised Extract
Table of Contents:
 1. Constructor Signature
 2. Default Options
 3. Static Utility Methods
 4. Instance Properties & Methods
 5. Benchmark Suite API
 6. Support & Platform Flags

1. Constructor Signature
   Benchmark(name:String, fn:Function|string, options:Object={})

2. Default Options
   async:Boolean=false
   defer:Boolean=false
   delay:Number=0
   id:String=auto-generated
   initCount:Number=1
   maxTime:Number=5  // seconds
   minSamples:Number=5
   minTime:Number=0  // seconds
   name:String
   onStart:Function
   onCycle:Function
   onAbort:Function
   onError:Function
   onReset:Function
   onComplete:Function
   setup:Function|string
   teardown:Function|string

3. Static Utility Methods
   version():String
   filter(arr:Array, callback:Function|string):Array
   formatNumber(num:Number):String
   invoke(benches:Array, name:String|Object, ...args):Array
   join(obj:Array|Object, sep1:String=',', sep2:String=': '):String
   runInContext(ctx:Object):Function

4. Instance Properties & Methods
Properties:
   aborted:Boolean
   compiled:Function|string
   count:Number
   cycles:Number
   error:Object
   fn:Function|string
   hz:Number
   running:Boolean
   stats:Object { mean, deviation, moe, rme, sem, variance, sample:Array }
   times:Object { cycle, elapsed, period, timeStamp }

Methods:
   abort():Benchmark
   clone(options:Object):Benchmark
   compare(other:Benchmark):Number
   reset():Benchmark
   run(options:Object={ async:Boolean, queued:Boolean }):Benchmark
   toString():String

5. Benchmark Suite API
   Suite(name:String, options:Object={})
Properties:
   aborted:Boolean
   length:Number
   running:Boolean
Methods:
   add(name:String, fn:Function|string, options:Object={}):Benchmark
   abort():Suite
   clone(options:Object):Suite
   emit(type:String|Object, ...args):*
   filter(callback:Function|string):Suite
   listeners(type:String):Array
   off(type:String, listener:Function):Suite
   on(type:String, listener:Function):Suite
   reset():Suite
   run(options:Object={ async:Boolean, queued:Boolean }):Suite

6. Support & Platform Flags
   Benchmark.platform:Object { parse userAgent }
   Benchmark.support:Object { browser:Boolean, decompilation:Boolean, timeout:Boolean }

## Supplementary Details
Default option values and effects:
- async=false: execute cycles synchronously
- defer=false: clock start deferred until Deferred.resolve() called
- delay=0: no delay between cycles
- initCount=1: initial iteration count
- maxTime=5: maximum benchmark duration in seconds
- minSamples=5: minimum number of sample periods collected
- minTime=0: no warm-up period
- event callbacks invoked at defined lifecycle points

Implementation steps:
1. Import Benchmark: const Benchmark = require('benchmark');
2. Instantiate: const bench = new Benchmark('name', fn, { maxTime:3, onCycle:c });
3. Listen events: bench.on('cycle', evt => console.log(evt.cycle));
4. Run: bench.run({ async:true });
5. Access results: bench.hz, bench.stats.mean, bench.times.elapsed

Best practices:
- Set maxTime≥1 for reliable stats
- Use defer:true for async operations with Deferred.resolve()
- Call reset() before rerunning
- Use Suite to batch compare tests



## Reference Details
// Installation
npm install benchmark lodash

// Simple benchmark
test.js:
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('MySuite', {
  onStart: () => console.log('Suite started'),
  onComplete: () => console.log('Suite completed')
});

suite
  .add('Method A', function() {
    arr.sort();
  }, { onCycle: evt => console.log('A cycle', evt.times.elapsed) })
  .add('Method B', function() {
    arr.reverse();
  }, { defer: true, fn: defer => { setTimeout(() => defer.resolve(), 10); } })
  .on('cycle', evt => console.log(String(evt.target)))
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true, queued: true });

// Full API
Signature: Benchmark(name:String, fn:Function|string, options:Object)
Options properties with types and defaults:
  async:Boolean = false
  defer:Boolean = false
  delay:Number = 0
  id:String = auto-generated UUID
  initCount:Number = 1
  maxTime:Number = 5
  minSamples:Number = 5
  minTime:Number = 0
  name:String
  onStart:Function(event:Benchmark.Event)
  onCycle:Function(event:Benchmark.Event)
  onAbort:Function(event:Benchmark.Event)
  onError:Function(event:Benchmark.Event)
  onReset:Function(event:Benchmark.Event)
  onComplete:Function(event:Benchmark.Event)
  setup:Function|string
  teardown:Function|string

Methods:
- abort(): Benchmark  // stops and returns instance
- clone(opts:Object): Benchmark  // duplicates instance with merged options
- compare(other:Benchmark): Number  // -1|0|1
- reset(): Benchmark  // reset values and abort if running
- run(opts:Object={ async:Boolean, queued:Boolean }): Benchmark
- toString(): String // "name x Hz ±rme%"

Deferred:
Signature: new Benchmark.Deferred(benchmark:Benchmark)
Properties:
  benchmark:Benchmark
  cycles:Number
  elapsed:Number
  timeStamp:Number

Event:
Signature: new Benchmark.Event(type:String)
Properties:
  type:String
  aborted:Boolean
  cancelled:Boolean
  currentTarget:Object
  target:Object
  result:Any
  timeStamp:Number

Suite API:
Signature: new Benchmark.Suite(name:String, options:Object)
Options: onStart,onCycle,onAbort,onError,onReset,onComplete
Methods:
- add(name:String, fn:Function|string, options:Object): Benchmark
- abort(): Suite
- clone(options:Object): Suite
- emit(type:String, ...args): any
- filter(callback:Function|string): Suite
- listeners(type:String): Array<Function>
- off(type:String, listener:Function): Suite
- on(type:String, listener:Function): Suite
- reset(): Suite
- run(options:Object={ async:Boolean, queued:Boolean }): Suite

// Troubleshooting
// Common issue: insufficient samples
// Command: bench.options.minSamples = 10;
// If decompilation false, setup as function not string


## Information Dense Extract
CONSTRUCTOR: (name:String, fn:Function|string, options:Object) => Benchmark
OPTIONS: { async:Boolean=false, defer:Boolean=false, delay:Number=0, id:String=auto, initCount:Number=1, maxTime:Number=5, minSamples:Number=5, minTime:Number=0, name:String, onStart:Function, onCycle:Function, onAbort:Function, onError:Function, onReset:Function, onComplete:Function, setup:Function|string, teardown:Function|string }
STATICS: version():String | filter(Array,Function|string):Array | formatNumber(Number):String | invoke(Array,String|Object,...*):Array | join(Array|Object, String=',',String=': '):String | runInContext(Object):Function
INSTANCE PROPS: aborted:Boolean, compiled:Function|string, count:Number, cycles:Number, error:Object, fn:Function|string, hz:Number, running:Boolean, stats:{mean, deviation, moe, rme, sem, variance, sample:Array}, times:{cycle, elapsed, period, timeStamp}
INSTANCE METHODS: abort():Benchmark | clone(Object):Benchmark | compare(Benchmark):Number | reset():Benchmark | run(Object={async,queued}):Benchmark | toString():String
SUITE: new Suite(name:String, options:Object) => Suite; props: aborted:Boolean, length:Number, running:Boolean; methods: add(name,fn,opts):Benchmark, abort():Suite, clone(Object):Suite, emit(String, ...):any, filter(Function|string):Suite, listeners(String):Array, off(String,Function):Suite, on(String,Function):Suite, reset():Suite, run(Object={async,queued}):Suite
FLAGS: Benchmark.support={browser:Boolean, decompilation:Boolean, timeout:Boolean}; Benchmark.platform={description of environment}
INSTALL: npm install benchmark lodash
EXAMPLES: const b=require('benchmark'); new b('t',()=>1+1,{maxTime:3}).run();


## Sanitised Extract
Table of Contents:
 1. Constructor Signature
 2. Default Options
 3. Static Utility Methods
 4. Instance Properties & Methods
 5. Benchmark Suite API
 6. Support & Platform Flags

1. Constructor Signature
   Benchmark(name:String, fn:Function|string, options:Object={})

2. Default Options
   async:Boolean=false
   defer:Boolean=false
   delay:Number=0
   id:String=auto-generated
   initCount:Number=1
   maxTime:Number=5  // seconds
   minSamples:Number=5
   minTime:Number=0  // seconds
   name:String
   onStart:Function
   onCycle:Function
   onAbort:Function
   onError:Function
   onReset:Function
   onComplete:Function
   setup:Function|string
   teardown:Function|string

3. Static Utility Methods
   version():String
   filter(arr:Array, callback:Function|string):Array
   formatNumber(num:Number):String
   invoke(benches:Array, name:String|Object, ...args):Array
   join(obj:Array|Object, sep1:String=',', sep2:String=': '):String
   runInContext(ctx:Object):Function

4. Instance Properties & Methods
Properties:
   aborted:Boolean
   compiled:Function|string
   count:Number
   cycles:Number
   error:Object
   fn:Function|string
   hz:Number
   running:Boolean
   stats:Object { mean, deviation, moe, rme, sem, variance, sample:Array }
   times:Object { cycle, elapsed, period, timeStamp }

Methods:
   abort():Benchmark
   clone(options:Object):Benchmark
   compare(other:Benchmark):Number
   reset():Benchmark
   run(options:Object={ async:Boolean, queued:Boolean }):Benchmark
   toString():String

5. Benchmark Suite API
   Suite(name:String, options:Object={})
Properties:
   aborted:Boolean
   length:Number
   running:Boolean
Methods:
   add(name:String, fn:Function|string, options:Object={}):Benchmark
   abort():Suite
   clone(options:Object):Suite
   emit(type:String|Object, ...args):*
   filter(callback:Function|string):Suite
   listeners(type:String):Array
   off(type:String, listener:Function):Suite
   on(type:String, listener:Function):Suite
   reset():Suite
   run(options:Object={ async:Boolean, queued:Boolean }):Suite

6. Support & Platform Flags
   Benchmark.platform:Object { parse userAgent }
   Benchmark.support:Object { browser:Boolean, decompilation:Boolean, timeout:Boolean }

## Original Source
Testing & Benchmarking Tools
https://benchmarkjs.com

## Digest of BENCHMARKJS

# Benchmark.js API Overview (Retrieved 2024-06-14)

## Benchmark Constructor
Benchmark(name:String, fn:Function|string, options:Object={})

## Static Methods
- version(): String
- filter(array:Array, callback:Function|string): Array
- formatNumber(number:Number): String
- invoke(benches:Array, name:Object|string, ...args): Array
- join(object:Array|Object, separator1:String=',', separator2:String=': '): String
- runInContext(context:Object=root): Function

## Instance Properties
- aborted: Boolean
- compiled: Function|string
- count: Number
- cycles: Number
- error: Object
- fn: Function|string
- hz: Number
- running: Boolean
- setup: Function|string
- teardown: Function|string
- stats: Object { mean:Number, deviation:Number, moe:Number, rme:Number, sem:Number, variance:Number, sample:Array }
- times: Object { cycle:Number, elapsed:Number, period:Number, timeStamp:Number }

## Instance Methods
- abort(): Benchmark
- clone(options:Object): Benchmark
- compare(other:Benchmark): Number
- reset(): Benchmark
- run(options:Object={ async:Boolean, queued:Boolean }): Benchmark
- toString(): String

## Suite API
Benchmark.Suite(name:String, options:Object={})

### Suite Properties
- aborted: Boolean
- length: Number
- running: Boolean

### Suite Methods
- add(name:String, fn:Function|string, options:Object={}): Benchmark
- abort(): Suite
- clone(options:Object): Suite
- emit(type:Object|string, ...args): *
- filter(callback:Function|string): Suite
- listeners(type:String): Array
- off(type:String, listener:Function): Suite
- on(type:String, listener:Function): Suite
- reset(): Suite
- run(options:Object={ async:Boolean, queued:Boolean }): Suite

## Support and Platform Flags
- Benchmark.platform: Object { name:String, version:String, os:String, etc. }
- Benchmark.support: Object { browser:Boolean, decompilation:Boolean, timeout:Boolean }

---
**Data Size**: 14091256 bytes
**Links Found**: 30724
**Retrieval Date**: 2024-06-14

## Attribution
- Source: Testing & Benchmarking Tools
- URL: https://benchmarkjs.com
- License: License: MIT
- Crawl Date: 2025-05-13T18:29:24.419Z
- Data Size: 14091256 bytes
- Links Found: 30724

## Retrieved
2025-05-13

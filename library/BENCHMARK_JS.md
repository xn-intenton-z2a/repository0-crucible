# BENCHMARK_JS

## Crawl Summary
Benchmark.js v2.1.4; dependency: lodash; include platform.js for Benchmark.platform; loader support: browser, AMD, Node.js; optional microtime for high-resolution timing; key classes: Benchmark, Suite; methods: Suite.add(name:string,fn:function)→Suite; Suite.on(event:string,listener:function)→Suite; Suite.run(options:{async:boolean})→Suite; events: cycle, complete; tested in modern browsers, Node.js, PhantomJS.

## Normalised Extract
Table of Contents
1 Installation and Integration
2 Suite Initialization
3 Test Registration
4 Event Hooks
5 Execution Control

1 Installation and Integration
Command: npm install --save benchmark
Include lodash.js then platform.js then benchmark.js in browser
AMD loader paths: benchmark at path/to/benchmark, lodash at path/to/lodash, platform at path/to/platform
Node.js import: var Benchmark = require('benchmark')
Optional: npm install --save microtime for nanosecond timing

2 Suite Initialization
Instantiate a new suite with var suite = new Benchmark.Suite

3 Test Registration
suite.add(name, fn)
name: string label
fn: function containing code to measure
Returns the suite instance for chaining

4 Event Hooks
suite.on(event, listener)
Supported events: cycle, complete
listener signature: function(event) where event.target references the current Benchmark instance
Chaining: multiple .on calls supported

5 Execution Control
suite.run(options)
options.async boolean to run asynchronously (default false)
Returns the suite instance

## Supplementary Details
Platform Detection
Include platform.js before benchmark.js to populate Benchmark.platform with name, version, description

Lodash Dependency
Benchmark.js requires lodash for utilities

High-Resolution Timing
Install microtime module; require('microtime') before running suite to override default timers

Loader Configurations
Browser: direct script tags in correct sequence
AMD: require.config with explicit paths for benchmark, lodash, platform
Node.js: var Benchmark = require('benchmark')

Version Information
Benchmark.js version 2.1.4

## Reference Details
Class: Benchmark
Constructor signature: new Benchmark(name:string, fn:function, options?:object)
Parameters:
  name: descriptive label for the benchmark
  fn: code function to measure
  options: optional object with properties defer:boolean, async:boolean, initCount:number, maxTime:number, minSamples:number, minTime:number
Properties:
  name  string
  fn    function
Methods:
  toString(): string  returns formatted benchmark statistics

Class: Suite
Constructor signature: new Benchmark.Suite(options?:object)
Parameters:
  options: optional suite configuration
Methods:
  add(name:string, fn:function, options?:object): Suite
    name: test label
    fn: function to benchmark
    options: same as Benchmark constructor options
    returns the Suite instance
  on(event:string, listener:function): Suite
    event: 'cycle' or 'complete' or 'abort'
    listener receives event object with event.target referencing Benchmark or Suite context
    returns the Suite instance
  run(options:{async:boolean}): Suite
    options.async: true to run asynchronously, false for synchronous
    returns the Suite instance

Events and Listeners
cycle: fired after each test cycle; listener(event) logs event.target statistics
complete: fired when all tests finish; listener context is suite; use this.filter('fastest').map('name') to get fastest test

Configuration Options
async (boolean) default: false
defer (boolean) default: false
initCount (number) default: 1
maxTime (number) default: 5 seconds
minSamples (number) default: 5
minTime (number) default: 0.005 seconds

Usage Pattern
1. load dependencies
2. instantiate suite
3. add tests
4. attach listeners
5. run suite with desired options

Best Practice
Use asynchronous execution for long-running benchmarks to avoid blocking the main thread
Adjust initCount and minTime for stable statistical results

Troubleshooting
If no output appears, ensure console.log statements in listeners and that suite.run is invoked
To validate timing, compare output margin of error; increase minSamples or maxTime if error >2%

## Information Dense Extract
v2.1.4; dependencies: lodash, optional microtime; loader: browser(lodash.js → platform.js → benchmark.js), AMD(paths for benchmark, lodash, platform), Node(require('benchmark')); API: Suite.add(name:string,fn:function,options?:object)→Suite; Suite.on(event:cycle|complete,listener:function(event))→Suite; Suite.run(options:{async:boolean})→Suite; events cycle yields event.target stats, complete context suite; default options async:false,defer:false,initCount:1,maxTime:5,minSamples:5,minTime:0.005; best practice: run async for nonblocking, adjust initCount/minTime for precision; troubleshoot by checking listeners and suite.run invocation

## Sanitised Extract
Table of Contents
1 Installation and Integration
2 Suite Initialization
3 Test Registration
4 Event Hooks
5 Execution Control

1 Installation and Integration
Command: npm install --save benchmark
Include lodash.js then platform.js then benchmark.js in browser
AMD loader paths: benchmark at path/to/benchmark, lodash at path/to/lodash, platform at path/to/platform
Node.js import: var Benchmark = require('benchmark')
Optional: npm install --save microtime for nanosecond timing

2 Suite Initialization
Instantiate a new suite with var suite = new Benchmark.Suite

3 Test Registration
suite.add(name, fn)
name: string label
fn: function containing code to measure
Returns the suite instance for chaining

4 Event Hooks
suite.on(event, listener)
Supported events: cycle, complete
listener signature: function(event) where event.target references the current Benchmark instance
Chaining: multiple .on calls supported

5 Execution Control
suite.run(options)
options.async boolean to run asynchronously (default false)
Returns the suite instance

## Original Source
Testing & Benchmarking Tools
https://github.com/bestiejs/benchmark.js

## Digest of BENCHMARK_JS

# Benchmark.js Documentation (retrieved 2024-06-20)

# Installation

- Hard dependency: lodash
- Include platform.js to populate Benchmark.platform
- Browser script order: lodash.js, platform.js, benchmark.js
- AMD loader:
  require({
    paths: {
      benchmark: 'path/to/benchmark',
      lodash:    'path/to/lodash',
      platform:  'path/to/platform'
    }
  }, ['benchmark'], function(Benchmark) {});
- npm package: npm install --save benchmark
- Optional high-resolution timers: npm install --save microtime

# Usage Example

var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})

// add listeners
suite.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})

// run asynchronously
suite.run({ async: true });

// Sample console output:
// RegExp#test x 4,161,532 ±0.99% (59 cycles)
// String#indexOf x 6,139,623 ±1.00% (131 cycles)
// Fastest is String#indexOf

# Supported Environments

Chrome 54–55, Firefox 49–50, IE 11, Edge 14, Safari 9–10, Node.js 6–7, PhantomJS 2.1.1

## Attribution
- Source: Testing & Benchmarking Tools
- URL: https://github.com/bestiejs/benchmark.js
- License: MIT
- Crawl Date: 2025-05-13T00:40:12.006Z
- Data Size: 642682 bytes
- Links Found: 5007

## Retrieved
2025-05-13

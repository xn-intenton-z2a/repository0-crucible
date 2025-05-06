library/SEEDRANDOM.md
# library/SEEDRANDOM.md
# SEEDRANDOM

## Crawl Summary
Version 3.0.5 default ARC4 PRNG supports new Math.seedrandom(seed, options) returning PRNG; options: global (false), entropy (false), state (false), pass (none). PRNG methods: prng(): float[0,1), prng.int32(): signed 32-bit, prng.quick(): 32-bit float, prng.double(): 56-bit float, prng.state(): object. Alternate algorithms available via seedrandom.<algorithm>(seed). CJS require('seedrandom'), AMD, browser supported. Autoseeding draws from window.crypto, time, DOM. Terminator '\0' appended to non-string seeds. Evaluator removed in 3.0.5 for CSP.

## Normalised Extract
Table of Contents
1. API Initialization
2. PRNG Interface
3. Configuration Options
4. Alternate Algorithms
5. Seeding Strategies
6. State Management
7. Example Workflows

1. API Initialization
  Math.seedrandom(seed?: string|number|Array, options?: {global?: boolean;entropy?: boolean;state?: boolean|object;pass?: function})
  require('seedrandom')(seed, options)
  seedrandom.algorithmName(seed)

2. PRNG Interface
  prng(): number        // 53-bit float precision by default
  prng.int32(): number  // signed 32-bit integer
  prng.quick(): number  // 32-bit float precision
  prng.double(): number // 56-bit float for alternate algorithms
  prng.state(): object  // snapshot state if enabled

3. Configuration Options
  global: false         // override Math.random when true
  entropy: false        // mix seed with accumulated entropy
  state: false|object   // enable or restore state
  pass: function        // callback(prng, seed) returning custom object

4. Alternate Algorithms
  seedrandom.alea(seed)
  seedrandom.xor128(seed)
  seedrandom.tychei(seed)
  seedrandom.xorwow(seed)
  seedrandom.xor4096(seed)
  seedrandom.xorshift7(seed)
  seedrandom.quick(seed)

5. Seeding Strategies
  explicit string or number seeds
  null or no seed uses crypto or time+DOM
  mixing user entropy events via options.entropy
  network seeding via JSONP callback to Math.seedrandom

6. State Management
  enable state: options.state=true
  save state: var stateObj=prng.state()
  restore: Math.seedrandom('', {state: stateObj}) or require('seedrandom')('', {state:stateObj})

7. Example Workflows
  Local: var rng= new Math.seedrandom('x'); rng()
  Global override: Math.seedrandom('x',{global:true}); Math.random()
  Autoseed: var rngA= new Math.seedrandom(); rngA()
  Pass option: Math.seedrandom(null,{pass:(r,s)=>({random:r,seed:s})})

## Supplementary Details
Configuration option defaults and effects

• global (boolean, default false): when true and called without new, assigns new PRNG to Math.random
• entropy (boolean, default false): mix provided seed with internal entropy pool
• state (boolean|object, default false): if true adds prng.state(); if object restores internal state
• pass (function, default none): function(prng, seed) returns custom object; overrides direct return

Algorithm implementations

ARC4-based default: 53-bit precision float
quick (ARC4 32-bit float)
alea: 32-bit float, double: 56-bit float
xor128, tychei, xorwow, xor4096, xorshift7: 32-bit float, int32: 32-bit signed integer

Autoseeding sources (no seed or seed null)
• window.crypto.getRandomValues (if available)
• Date.now entropy
• walk DOM nodes

Network seeding patterns
<script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>
<script src="//jsonlib.appspot.com/urandom?callback=Math.seedrandom"></script>


## Reference Details
Math.seedrandom(seed: string|number|Array<string|number>    , options?: {
  global?: boolean;     // override Math.random (false)
  entropy?: boolean;    // mix seed with entropy pool (false)
  state?: boolean|object; // enable or restore PRNG state (false)
  pass?: (prng: PRNG, seed: any) => any; // custom return
}): PRNG | void

require('seedrandom')(seed, options) returns PRNG; seedrandom.algorithm(seed) alias for alternate PRNGs.

PRNG interface:
() => number                   // float in [0,1)
int32() => number              // signed 32-bit integer
quick() => number              // 32-bit float in [0,1)
double() => number             // 56-bit float precision (alternate algos)
state() => object              // snapshot or restored state

Code Example:
var seedrandom = require('seedrandom');
var obj = Math.seedrandom(null, {pass: (prng, seed) => ({random: prng, seed: seed})});
console.log(obj.seed); // hex string seed
console.log(obj.random()); // random value

Best Practices:
• Use new Math.seedrandom(…) for local PRNGs.
• Append '\0' to short string seeds to avoid ARC4 key scheduler cycles.
• Avoid global override in production.
• Restore state for reproducible sequences.

Troubleshooting:
$ npm install seedrandom
$ node -e "require('seedrandom')('x',{global:true}); console.log(Math.random())"
Expected output: 0.619592 

Content Security Policy:
Version 3.0.5 removes eval(); ensure no eval restrictions.

## Information Dense Extract
Math.seedrandom(seed?,options?)   options.global=false|true  override Math.random
                                options.entropy=false|true mix seed with entropy
                                options.state=false|object enable/save state
                                options.pass=fn(prng,seed)
returns PRNG: () float53; .int32() int32; .quick() float32; .double() float56; .state() object
Alternate: seedrandom.algorithm(seed)  algorithms: alea,xor128,tychei,xorwow,xor4096,xorshift7,quick
Autoseed(no seed): crypto or time/DOM
Use new for local PRNG; avoid global in production; append '\0' to seeds; state restore: pass state object


## Sanitised Extract
Table of Contents
1. API Initialization
2. PRNG Interface
3. Configuration Options
4. Alternate Algorithms
5. Seeding Strategies
6. State Management
7. Example Workflows

1. API Initialization
  Math.seedrandom(seed?: string|number|Array, options?: {global?: boolean;entropy?: boolean;state?: boolean|object;pass?: function})
  require('seedrandom')(seed, options)
  seedrandom.algorithmName(seed)

2. PRNG Interface
  prng(): number        // 53-bit float precision by default
  prng.int32(): number  // signed 32-bit integer
  prng.quick(): number  // 32-bit float precision
  prng.double(): number // 56-bit float for alternate algorithms
  prng.state(): object  // snapshot state if enabled

3. Configuration Options
  global: false         // override Math.random when true
  entropy: false        // mix seed with accumulated entropy
  state: false|object   // enable or restore state
  pass: function        // callback(prng, seed) returning custom object

4. Alternate Algorithms
  seedrandom.alea(seed)
  seedrandom.xor128(seed)
  seedrandom.tychei(seed)
  seedrandom.xorwow(seed)
  seedrandom.xor4096(seed)
  seedrandom.xorshift7(seed)
  seedrandom.quick(seed)

5. Seeding Strategies
  explicit string or number seeds
  null or no seed uses crypto or time+DOM
  mixing user entropy events via options.entropy
  network seeding via JSONP callback to Math.seedrandom

6. State Management
  enable state: options.state=true
  save state: var stateObj=prng.state()
  restore: Math.seedrandom('', {state: stateObj}) or require('seedrandom')('', {state:stateObj})

7. Example Workflows
  Local: var rng= new Math.seedrandom('x'); rng()
  Global override: Math.seedrandom('x',{global:true}); Math.random()
  Autoseed: var rngA= new Math.seedrandom(); rngA()
  Pass option: Math.seedrandom(null,{pass:(r,s)=>({random:r,seed:s})})

## Original Source
Seedrandom
https://github.com/davidbau/seedrandom#readme

## Digest of SEEDRANDOM

# Seedrandom v3.0.5 (Retrieved 2024-06-18)

## Overview
Seeded pseudorandom number generator for JavaScript. Supports browser script tag, AMD, Node.js, and CJS. ARC4-based default algorithm with options for alternate PRNGs.

## Usage Patterns

### Browser Script Tag
<script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>

#### Local PRNG
var myrng = new Math.seedrandom('hello.');
console.log(myrng());        // 0.9282578795792454
console.log(myrng.quick());  // 32-bit float: 0.7316977467853576
console.log(myrng.int32());  // 32-bit signed int: 1966374204

#### Global Override
Math.seedrandom('hello.');
console.log(Math.random());  // 0.9282578795792454

### Node.js / CJS
npm install seedrandom
var seedrandom = require('seedrandom');

// Local
var rng = seedrandom('hello.'); rng();

// Global
seedrandom('hello.', { global: true }); Math.random();

// Autoseeded
var rng2 = seedrandom(); rng2();

// With additional entropy
var rng3 = seedrandom('e', { entropy: true }); rng3();

// Alternate algorithm
var rng4 = seedrandom.xor4096('seed'); rng4();

### AMD (Require.js)
bower install seedrandom
require(['seedrandom'], function(seedrandom) {
  var rng = seedrandom('hello.'); rng();
});

## Alternate Algorithms Table
PRNG      | Time vs native | Period         | Author
----------|----------------|----------------|----------------
alea      | 0.9×           | ~2^116         | Johannes Baagøe  
xor128    | 0.9×           | 2^128−1        | Marsaglia        
tychei    | 1.1×           | ~2^127         | Neves/Araujo     
xorwow    | 1.1×           | 2^192−2^32     | Marsaglia        
xor4096   | 1.1×           | 2^4096−2^32    | Brent (xorgens)  
xorshift7 | 1.3×           | 2^256−1        | Panneton/L’ecuyer
quick     | 1.8×           | ~2^1600        | David Bau (ARC4)


## Attribution
- Source: Seedrandom
- URL: https://github.com/davidbau/seedrandom#readme
- License: MIT License
- Crawl Date: 2025-05-06T01:04:54.181Z
- Data Size: 920724 bytes
- Links Found: 4926

## Retrieved
2025-05-06

# SEEDRANDOM

## Crawl Summary
Version 3.0.5 of seedrandom.js provides a deterministic PRNG for JavaScript via Math.seedrandom(seed,options) or require('seedrandom'). Returns a PRNG function random():float in [0,1) with methods quick():32-bit float, int32():signed 32-bit, double():56-bit (Alea), state():object. Options: entropy(boolean), global(boolean), state(boolean|object), pass(function). Supports algorithms: ARC4(default), alea, xor128, tychei, xorwow, xor4096, xorshift7, quick. Usage: script tag, Node.js, AMD. State save/restore via state option. Network seeding via JSONP or XHR. Best practices: use new for local, avoid global in production, append '\0' to seeds, require form doesn’t auto-define Math.seedrandom. Performance: seeded calls ~0.0002ms.

## Normalised Extract
Table of Contents
1. PRNG Initialization
2. PRNG Methods
3. Options Object
4. Script Tag Usage
5. Node.js Usage
6. Algorithm Variants
7. State Persistence
8. Reseeding Patterns

1. PRNG Initialization
Signature: Math.seedrandom(seed?: string|number|Array|null, options?: {entropy?: boolean, global?: boolean, state?: boolean|object, pass?: Function}) -> PRNG function(random()). Use new Math.seedrandom(...) for local instances; omit new to override Math.random globally.

2. PRNG Methods
random()    returns float in [0,1)
quick()     returns 32-bit randomness as float
int32()     returns signed 32-bit integer
double()    returns 56-bit randomness as float (Alea only)
state()     returns object representing internal state

3. Options Object
entropy: false | true  (default false)
global: false | true   (default false)
state: false | true | object  (default false)
pass: function(prng, seed) -> any

4. Script Tag Usage
Include <script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>
Create PRNG: new Math.seedrandom('seed', options)
Override Math.random: Math.seedrandom('seed')

5. Node.js Usage
Install: npm install seedrandom
Import: var seedrandom = require('seedrandom')
Local: var rng = seedrandom('seed', options)
Global: seedrandom('seed', {global:true})

6. Algorithm Variants
Access via seedrandom.<algo>: alea, xor128, tychei, xorwow, xor4096, xorshift7, quick
Each returns PRNG with same methods

7. State Persistence
Enable: var s = Math.seedrandom('seed', {state:true});
Save: var saved = s.state();
Restore: var r = Math.seedrandom('', {state:saved});

8. Reseeding Patterns
Autoseed: Math.seedrandom() uses crypto.getRandomValues or time+DOM fallback
Network seed: JSONP <script>callback=Math.seedrandom</script> or synchronous XHR to random.org then Math.seedrandom(bits,!!bits)
User-event seed: collect mouse/touch events into array then Math.seedrandom(events, {entropy:true})


## Supplementary Details
Default algorithm: ARC4 (RC4 key schedule) with internal terminator for non-string seeds. ARC4 key collision avoidance: append '\0' to string seeds; auto-appended for non-string seeds since v2.0. Autoseed fallback uses window.crypto.getRandomValues if available; else current time, native Math.random, and traversal of DOM elements for entropy. Entropy pool accumulates from each call to one- or two-argument forms, improving future autoseeds. In Node, no global Math.seedrandom after require; assign manually if needed. Bower install and AMD usage identical to Node require. Quick algorithm is 32-bit ARC4 variant; average period ~2^1600. Performance metrics: seeded calls <0.0002ms; seeding calls <0.2ms; autoseed w/o crypto ~20-30ms.


## Reference Details
API Specifications:

Math.seedrandom(seed?: string|number|Array|null, options?: {entropy?: boolean, global?: boolean, state?: boolean|object, pass?: Function}) -> PRNG function
Parameters:
  seed: user-provided seed; null or omitted triggers autoseed
  options.entropy: mix seed with accumulated entropy pool
  options.global: if true assign PRNG to Math.random
  options.state: if true attach .state(); if object restore state
  options.pass: function(prng, seed) return custom object
Return: function random():number in [0,1)

seedrandom.<algorithm>(seed, options?) -> PRNG
Algorithms: alea, xor128, tychei, xorwow, xor4096, xorshift7, quick
Same signature minus global assignment

PRNG Methods:
random(): number             // uniform [0,1)
quick(): number              // 32-bit float random
int32(): number              // signed 32-bit integer
double(): number             // 56-bit float (Alea only)
state(): object              // current internal state

Full Code Examples:

// Local PRNG with state save/restore
var s0 = seedrandom('secret', {state:true});
for(var i=0;i<100000;i++) s0();
var saved = s0.state();
var s1 = seedrandom('', {state:saved});
console.assert(s1()===s0());

// Replace global Math.random safely
Math.seedrandom('test-seed', {global:true});
console.log(Math.random()); // deterministic output

// Pass callback to capture seed
var obj = Math.seedrandom(null, {pass:function(prng, seed){ return {rng:prng, seed:seed}; }});
console.log(obj.seed);

// Use Alea algorithm and 56-bit float
var aleaRng = seedrandom.alea('hello');
console.log(aleaRng.double()); // deterministic 56-bit value

Configuration Options and Effects:

Option       Default  Effect
entropy      false    mix seed with entropy pool
global       false    assign PRNG to Math.random()
state        false    enable .state() or restore state
pass         none     callback invoked with (prng,seed)

Best Practices:
- Always use new Math.seedrandom() for local, avoid global override
- Append '\0' to string seeds for ARC4 collision avoidance
- For reproducible tests, fix seed and avoid entropy mixing

Troubleshooting Procedures:

Issue: Math.seedrandom undefined after require('seedrandom')
Command: var seedrandom = require('seedrandom');
Solution: assign global manually: Math.seedrandom = seedrandom;

Issue: short string seeds yield identical sequences
Solution: append '\0' terminator: Math.seedrandom(str+'\0');

Issue: autoseed slow or missing crypto
Check: window.crypto.getRandomValues available? If not, performance ~20-30ms
Use: include polyfill or supply explicit seed

Install & Build Commands:
npm install seedrandom
bower install seedrandom

Expected Outputs:
new Math.seedrandom('hello')() -> 0.9282578795792454
new Math.seedrandom('hello').int32() -> 1966374204
seedrandom.alea('hello').double() -> 0.8297006866124559


## Information Dense Extract
seedrandom v3.0.5: Math.seedrandom(seed?,{entropy?,global?,state?,pass?}) returns PRNG(random():[0,1),quick():32-bit,float,int32():signed32,double():56-bit,Alea only,state():object). Default algorithm: ARC4; alt algorithms via seedrandom.algo(seed,opts): alea,xor128,tychei,xorwow,xor4096,xorshift7,quick. Options default false produce no global override, no entropy mixing, no state. Autoseed uses crypto.getRandomValues or time+DOM fallback. State persistence via state:true or state:object. Scripts: include seedrandom.min.js or require('seedrandom') in Node/AMD. Bower/Require.js identical. Use new for local, avoid global override in production. Append '\0' to string seeds. Install: npm install seedrandom, bower install seedrandom. Performance: seeded <0.0002ms, seeding <0.2ms, autoseed ~20-30ms. Troubleshoot: assign Math.seedrandom after require; check crypto availability; append terminator for collision avoidance.

## Sanitised Extract
Table of Contents
1. PRNG Initialization
2. PRNG Methods
3. Options Object
4. Script Tag Usage
5. Node.js Usage
6. Algorithm Variants
7. State Persistence
8. Reseeding Patterns

1. PRNG Initialization
Signature: Math.seedrandom(seed?: string|number|Array|null, options?: {entropy?: boolean, global?: boolean, state?: boolean|object, pass?: Function}) -> PRNG function(random()). Use new Math.seedrandom(...) for local instances; omit new to override Math.random globally.

2. PRNG Methods
random()    returns float in [0,1)
quick()     returns 32-bit randomness as float
int32()     returns signed 32-bit integer
double()    returns 56-bit randomness as float (Alea only)
state()     returns object representing internal state

3. Options Object
entropy: false | true  (default false)
global: false | true   (default false)
state: false | true | object  (default false)
pass: function(prng, seed) -> any

4. Script Tag Usage
Include <script src='//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js'></script>
Create PRNG: new Math.seedrandom('seed', options)
Override Math.random: Math.seedrandom('seed')

5. Node.js Usage
Install: npm install seedrandom
Import: var seedrandom = require('seedrandom')
Local: var rng = seedrandom('seed', options)
Global: seedrandom('seed', {global:true})

6. Algorithm Variants
Access via seedrandom.<algo>: alea, xor128, tychei, xorwow, xor4096, xorshift7, quick
Each returns PRNG with same methods

7. State Persistence
Enable: var s = Math.seedrandom('seed', {state:true});
Save: var saved = s.state();
Restore: var r = Math.seedrandom('', {state:saved});

8. Reseeding Patterns
Autoseed: Math.seedrandom() uses crypto.getRandomValues or time+DOM fallback
Network seed: JSONP <script>callback=Math.seedrandom</script> or synchronous XHR to random.org then Math.seedrandom(bits,!!bits)
User-event seed: collect mouse/touch events into array then Math.seedrandom(events, {entropy:true})

## Original Source
Arithmetic & Numeric Libraries
https://github.com/davidbau/seedrandom

## Digest of SEEDRANDOM

# Seedrandom.js v3.0.5

## 1. Script Tag Usage

<script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>

// Create a local PRNG instance without affecting Math.random
var prng = new Math.seedrandom('your-seed', { entropy: false });
prng()        // float in [0,1)
prng.quick()  // 32 bits of randomness in float
prng.int32()  // signed 32-bit integer

// Replace Math.random globally
Math.seedrandom('global-seed');
Math.random() // same output as prng()

## 2. Node.js / CommonJS

npm install seedrandom
var seedrandom = require('seedrandom');

// Local PRNG
var rng = seedrandom('seed');
rng();

// Global PRNG
seedrandom('seed', { global: true });
Math.random();

// Alternate algorithms
var rng2 = seedrandom.xor4096('seed', { entropy: true });
rng2.int32();

## 3. AMD / Require.js

bower install seedrandom
require(['seedrandom'], function(seedrandom) {
  var rng = seedrandom('seed');
  rng();
});

## 4. API & Signatures

Math.seedrandom(seed?: string|number|Array|null,
                options?: {
                  entropy?: boolean,
                  global?: boolean,
                  state?: boolean|object,
                  pass?: function(prng, seed)
                })
                -> function random():number

seedrandom.<algorithm>(seed, options?) -> PRNG function
  algorithms: alea, xor128, tychei, xorwow, xor4096, xorshift7, quick

## 5. PRNG Methods

prng()        -> number in [0,1)
prng.quick()  -> number, 32-bit randomness
prng.int32()  -> signed 32-bit integer
prng.double() -> number, 56-bit randomness (Alea only)
prng.state()  -> object representing internal state

## 6. Options

entropy: mix user-provided seed with global entropy pool (default false)
global: if true, assign to Math.random (default false)
state: if true or object, enable state() output or restore from saved state
pass: callback(prng, seed) that returns custom object

## 7. State Saving & Restoring

var s0 = Math.seedrandom('seed', { state: true });
for(i=0;i<100000;i++) s0();
var saved = s0.state();
var s1 = Math.seedrandom('', { state: saved });
assert(s1() === s0());

## 8. Reseeding & Network

// Autoseed via crypto or DOM/time fallback
Math.seedrandom();

// Network-based seeding
<script src="//jsonlib.appspot.com/urandom?callback=Math.seedrandom"></script>
// or custom XHR to random.org and then Math.seedrandom(bits, !!bits);

## 9. Best Practices & Troubleshooting

- Always use new Math.seedrandom() for local PRNGs in libraries
- Append '\0' terminator for short string seeds to avoid ARC4 key collisions
- Avoid global override in production code
- In Node require form, Math.seedrandom is undefined; assign manually if needed

## 10. Performance

Seeded PRNG call: ~0.0002ms per call
Seeding (with crypto or entropy): ~0.2ms per call
Autoseed without crypto: ~20-30ms on older browsers


## Attribution
- Source: Arithmetic & Numeric Libraries
- URL: https://github.com/davidbau/seedrandom
- License: Mixed Licenses: decimal.js (MIT), math.js (Apache-2.0), seedrandom (MIT)
- Crawl Date: 2025-05-08T12:34:06.695Z
- Data Size: 909666 bytes
- Links Found: 4965

## Retrieved
2025-05-08

library/SEEDRANDOM.md
# library/SEEDRANDOM.md
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
library/EXPRESS_API.md
# library/EXPRESS_API.md
# EXPRESS_API

## Crawl Summary
express.json: parses JSON bodies; options inflate=true, limit=100kb, reviver=null, strict=true, type=application/json, verify undefined. express.raw: parse to Buffer; inflate=true, limit=100kb, type=application/octet-stream. express.text: parse to string; defaultCharset=utf-8, inflate=true, limit=100kb, type=text/plain. express.urlencoded: parse urlencoded; extended=true, inflate=true, limit=100kb, parameterLimit=1000, type=application/x-www-form-urlencoded. express.Router opts caseSensitive=false, mergeParams=false, strict=false. express.static root, options dotfiles undefined, etag=true, extensions=false, fallthrough=true, immutable=false, index=index.html, lastModified=true, maxAge=0, redirect=true, setHeaders undefined. express() returns app with methods app.METHOD(path,callbacks), app.use, app.route, app.param, app.listen, app.engine(ext,callback), app.render(view,[locals],cb), app.set/get, enable/disable, enabled/disabled, app.path(), app.mountpath, settings with defaults.

## Normalised Extract
Table of Contents:
1 express.json
2 express.raw
3 express.text
4 express.urlencoded
5 express.Router
6 express.static
7 Application Object

1 express.json   Signature: express.json([options]) → function(req,res,next)
Options:
 inflate  Boolean  true
 limit    Number|String  "100kb"
 reviver  Function|null
 strict   Boolean  true
 type     String|Array|Function  "application/json"
 verify   Function|undefined  (req,res,buf,encoding)

2 express.raw   Signature: express.raw([options]) → function(req,res,next)
Options:
 inflate  Boolean  true
 limit    Number|String  "100kb"
 type     String|Array|Function  "application/octet-stream"
 verify   Function|undefined  (req,res,buf,encoding)

3 express.text  Signature: express.text([options]) → function(req,res,next)
Options:
 defaultCharset  String  "utf-8"
 inflate  Boolean  true
 limit    Number|String  "100kb"
 type     String|Array|Function  "text/plain"
 verify   Function|undefined  (req,res,buf,encoding)

4 express.urlencoded   Signature: express.urlencoded([options]) → function(req,res,next)
Options:
 extended       Boolean  true
 inflate        Boolean  true
 limit          Number|String  "100kb"
 parameterLimit Number  1000
 type           String|Array|Function  "application/x-www-form-urlencoded"
 verify         Function|undefined  (req,res,buf,encoding)

5 express.Router   Signature: express.Router([options]) → Router
Options:
 caseSensitive  Boolean  false
 mergeParams    Boolean  false
 strict         Boolean  false

6 express.static  Signature: express.static(root,[options]) → function(req,res,next)
Arguments:
 root  String  directory path
Options:
 dotfiles      String|undefined
 etag          Boolean  true
 extensions    Array|Boolean  false
 fallthrough   Boolean  true
 immutable     Boolean  false
 index         String|Boolean  "index.html"
 lastModified  Boolean  true
 maxAge        Number|String  0
 redirect      Boolean  true
 setHeaders    Function|undefined  (res,path,stat)

7 Application Object   Creation: var app = express()
Methods:
 app.METHOD(path, [...]callbacks)
 app.all(path, ...) matches all HTTP verbs
 app.use(path?,middleware)
 app.param(name|[names],callback)
 app.route(path)
 app.listen([port[,host[,backlog]]],callback)
 app.engine(ext,callback)
 app.render(view,[locals],callback)
 app.set(name,value)
 app.get(name) get setting or app.get(path,...) route
 enable(name), disable(name), enabled(name), disabled(name)
 path() returns mount path

Settings Defaults:
 case sensitive routing  undefined
 env  process.env.NODE_ENV||"development"
 etag  "weak"
 jsonp callback name  "callback"
 json escape  undefined
 json replacer  undefined
 json spaces  undefined
 query parser  "extended"
 strict routing  undefined
 subdomain offset  2
 trust proxy  false
 views  process.cwd()+"/views"
 view cache  false(dev)/true(prod)

## Supplementary Details
express.json internal: uses body-parser.json(options)
express.raw: uses body-parser.raw(options)
express.text: uses body-parser.text(options)
express.urlencoded: uses body-parser.urlencoded(options)
Router: inherits methods use, route, verb methods; property stack of layers.
static: uses serve-static(root,options); for fallthrough=false, next(err) on client errors.
Application: under the hood, express() returns function app(req,res,next) extended with EventEmitter and methods from proto.
app.listen calls http.createServer(app).listen
app.param(name,cb): registers param middleware in router.paramCallbacks array.


## Reference Details
Code Examples:
1. JSON parser:
var express = require('express')
var app = express()
app.use(express.json({ limit: '200kb', strict:false, type: ['application/json','application/vnd.api+json'], verify: function(req,res,buf,enc){ if(buf.length>1e6) throw new Error('Payload too large') } }))
app.post('/data', function(req,res){ res.json({received:req.body}); })

2. raw parser for webhooks:
app.use('/webhook', express.raw({ type: 'application/json' }))
app.post('/webhook', function(req,res){ var sig = req.get('Stripe-Signature'); stripe.webhooks.constructEvent(req.body,sig,endpointSecret)
res.sendStatus(200) })

3. urlencoded form:
app.use(express.urlencoded({ extended:false, limit:'50kb', parameterLimit:500 }))
app.post('/login', function(req,res){ var user=req.body.user; var pass=req.body.pass; })

4. Router mounting:
var router=express.Router({ mergeParams:true })
router.get('/items/:itemId', function(req,res){ res.send(req.params.itemId) })
app.use('/api',router)

5. static with caching:
app.use(express.static(__dirname+'/public',{ maxAge:'7d', immutable:true, setHeaders:(res,path,stat)=>{ res.set('X-Custom','value') } }))

Best Practices:
• Validate req.body before use.  
• Use strict:false for flexible JSON.  
• Limit body size to prevent DoS.  
• Use Router mergeParams when sub-routing.  
• Offload static to CDN, set immutable for versioned assets.

Troubleshooting:
Command: curl -X POST http://localhost:3000/data -H 'Content-Type:application/json' -d '{"foo":42}'  
Expected: HTTP 200, body {"received":{"foo":42}}  
Error: 413 Payload Too Large -> Increase limit or reduce payload size.

Command: curl -v http://localhost:3000/img.png  
Expected headers: Cache-Control: public, max-age=604800, immutable  
Error: 404 -> Check file path under public/, verify express.static root.


## Information Dense Extract
express.json(options): inflate=true,limit=100kb,reviver=null,strict=true,type=application/json,verify; express.raw(options): inflate=true,limit=100kb,type=application/octet-stream,verify; express.text(options): defaultCharset=utf-8,inflate=true,limit=100kb,type=text/plain,verify; express.urlencoded(options): extended=true,inflate=true,limit=100kb,parameterLimit=1000,type=application/x-www-form-urlencoded,verify; express.Router(options): caseSensitive=false,mergeParams=false,strict=false; express.static(root,options): dotfiles,etag=true,extensions=false,fallthrough=true,immutable=false,index=index.html,lastModified=true,maxAge=0,redirect=true,setHeaders; app=express(): methods: .use,.route,.listen,.engine,.render,.set/get,.enable/disable,.param,.path,.mountpath; settings defaults: case sensitive routing=undef,env=NODE_ENV||development,etag=weak,jsonp callback name=callback,json escape=undef,json replacer=undef,json spaces=undef,query parser=extended,strict routing=undef,subdomain offset=2,trust proxy=false,views=process.cwd()+"/views",view cache=false(dev)/true(prod)

## Sanitised Extract
Table of Contents:
1 express.json
2 express.raw
3 express.text
4 express.urlencoded
5 express.Router
6 express.static
7 Application Object

1 express.json   Signature: express.json([options])  function(req,res,next)
Options:
 inflate  Boolean  true
 limit    Number|String  '100kb'
 reviver  Function|null
 strict   Boolean  true
 type     String|Array|Function  'application/json'
 verify   Function|undefined  (req,res,buf,encoding)

2 express.raw   Signature: express.raw([options])  function(req,res,next)
Options:
 inflate  Boolean  true
 limit    Number|String  '100kb'
 type     String|Array|Function  'application/octet-stream'
 verify   Function|undefined  (req,res,buf,encoding)

3 express.text  Signature: express.text([options])  function(req,res,next)
Options:
 defaultCharset  String  'utf-8'
 inflate  Boolean  true
 limit    Number|String  '100kb'
 type     String|Array|Function  'text/plain'
 verify   Function|undefined  (req,res,buf,encoding)

4 express.urlencoded   Signature: express.urlencoded([options])  function(req,res,next)
Options:
 extended       Boolean  true
 inflate        Boolean  true
 limit          Number|String  '100kb'
 parameterLimit Number  1000
 type           String|Array|Function  'application/x-www-form-urlencoded'
 verify         Function|undefined  (req,res,buf,encoding)

5 express.Router   Signature: express.Router([options])  Router
Options:
 caseSensitive  Boolean  false
 mergeParams    Boolean  false
 strict         Boolean  false

6 express.static  Signature: express.static(root,[options])  function(req,res,next)
Arguments:
 root  String  directory path
Options:
 dotfiles      String|undefined
 etag          Boolean  true
 extensions    Array|Boolean  false
 fallthrough   Boolean  true
 immutable     Boolean  false
 index         String|Boolean  'index.html'
 lastModified  Boolean  true
 maxAge        Number|String  0
 redirect      Boolean  true
 setHeaders    Function|undefined  (res,path,stat)

7 Application Object   Creation: var app = express()
Methods:
 app.METHOD(path, [...]callbacks)
 app.all(path, ...) matches all HTTP verbs
 app.use(path?,middleware)
 app.param(name|[names],callback)
 app.route(path)
 app.listen([port[,host[,backlog]]],callback)
 app.engine(ext,callback)
 app.render(view,[locals],callback)
 app.set(name,value)
 app.get(name) get setting or app.get(path,...) route
 enable(name), disable(name), enabled(name), disabled(name)
 path() returns mount path

Settings Defaults:
 case sensitive routing  undefined
 env  process.env.NODE_ENV||'development'
 etag  'weak'
 jsonp callback name  'callback'
 json escape  undefined
 json replacer  undefined
 json spaces  undefined
 query parser  'extended'
 strict routing  undefined
 subdomain offset  2
 trust proxy  false
 views  process.cwd()+'/views'
 view cache  false(dev)/true(prod)

## Original Source
Express.js API
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_API

# express.json(options)  
**Availability**: v4.16.0+  
**Signature**: express.json([options]) → middleware  
**Options**:
- inflate (Boolean): default true. Handle deflated bodies.
- limit (Number | String): default "100kb". Maximum request body size.
- reviver (Function): default null. Passed to JSON.parse.
- strict (Boolean): default true. Accept only arrays and objects.
- type (String | Array | Function): default "application/json". Media type to parse.
- verify (Function): default undefined. verify(req,res,buf,encoding).

# express.raw(options)  
**Availability**: v4.17.0+  
**Signature**: express.raw([options]) → middleware  
**Options**:
- inflate (Boolean): default true.
- limit (Number | String): default "100kb".
- type (String | Array | Function): default "application/octet-stream".
- verify (Function): default undefined.

# express.text(options)  
**Availability**: v4.17.0+  
**Signature**: express.text([options]) → middleware  
**Options**:
- defaultCharset (String): default "utf-8".
- inflate (Boolean): default true.
- limit (Number | String): default "100kb".
- type (String | Array | Function): default "text/plain".
- verify (Function): default undefined.

# express.urlencoded(options)  
**Availability**: v4.16.0+  
**Signature**: express.urlencoded([options]) → middleware  
**Options**:
- extended (Boolean): default true.
- inflate (Boolean): default true.
- limit (Number | String): default "100kb".
- parameterLimit (Number): default 1000.
- type (String | Array | Function): default "application/x-www-form-urlencoded".
- verify (Function): default undefined.

# express.Router(options)  
**Signature**: express.Router([options]) → Router  
**Options**:
- caseSensitive (Boolean): default false.
- mergeParams (Boolean): default false (4.5.0+).
- strict (Boolean): default false.

# express.static(root, options)  
**Signature**: express.static(root, [options]) → middleware  
**Options**:
- dotfiles (String): default undefined.
- etag (Boolean): default true.
- extensions (Array|Boolean): default false.
- fallthrough (Boolean): default true.
- immutable (Boolean): default false.
- index (String|Boolean): default "index.html".
- lastModified (Boolean): default true.
- maxAge (Number|String): default 0.
- redirect (Boolean): default true.
- setHeaders (Function): default undefined. setHeaders(res,path,stat).

# express()  
**Signature**: express() → app  
**app Methods:** app.get, post, put, delete, patch, all, route, param, use, listen, engine, render, set, enable, disable, get(setting), enabled, disabled, path, mountpath  
**app Settings**:
- case sensitive routing (Boolean): undefined.
- env (String): process.env.NODE_ENV or "development".
- etag ("weak"|"strong"|false): default "weak".
- jsonp callback name (String): "callback".
- json escape (Boolean): undefined.
- json replacer: default undefined.
- json spaces: default undefined.
- query parser ("simple"|"extended"|Function|false): default "extended".
- strict routing (Boolean): undefined.
- subdomain offset (Number): 2.
- trust proxy (Boolean|String|Array|Function): default false.
- views (String|Array): process.cwd()+"/views".
- view cache (Boolean): false in dev, true in prod.


## Attribution
- Source: Express.js API
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-08T06:32:44.081Z
- Data Size: 22142899 bytes
- Links Found: 19663

## Retrieved
2025-05-08
library/SWAGGER_UI_EXPRESS.md
# library/SWAGGER_UI_EXPRESS.md
# SWAGGER_UI_EXPRESS

## Crawl Summary
Serve Swagger UI in Express via middleware. Use swaggerUi.serve and swaggerUi.setup(document,options). Options: explorer boolean, swaggerOptions object (validatorUrl,null; url,string; urls array of {name,url}). Custom styling: customCss,string; customCssUrl,string|array. Custom scripting: customJs,string|array; customJsUrl,string|array; customJsStr,string|array. Load spec from JSON file, URL, multiple URLs, or YAML. Dynamic host injection: use middleware to set req.swaggerDoc. Multiple instances via serveFiles(document,options). Link to spec via serveFiles(null,options) and setup(null,options). Node and Express requirements. Testing with phantom and npm test.

## Normalised Extract
Table of Contents

1 Installation
2 Express Middleware Setup
3 Options
   3.1 explorer
   3.2 swaggerOptions.validatorUrl
   3.3 swaggerOptions.url
   3.4 swaggerOptions.urls
   3.5 customCss
   3.6 customCssUrl
   3.7 customJs
   3.8 customJsUrl
   3.9 customJsStr
4 Loading Spec
   4.1 from JSON file
   4.2 from URL
   4.3 multiple URLs
   4.4 from YAML
5 Dynamic Document
6 Multiple Instances
7 Linking Spec Endpoint
8 Requirements
9 Testing Procedures

1 Installation
Install via npm:
npm install swagger-ui-express

2 Express Middleware Setup
Require modules:
const swaggerUi = require('swagger-ui-express')
Mount docs:
app.use(path, swaggerUi.serve, swaggerUi.setup(spec,options))
Or split serve and setup with router.get

3 Options
3.1 explorer boolean default false
3.2 swaggerOptions.validatorUrl default "https://validator.swagger.io/"; set null to disable
3.3 swaggerOptions.url string remote spec URL
3.4 swaggerOptions.urls array of {name:string,url:string} to populate dropdown; explorer must be true
3.5 customCss CSS string injected into page style
3.6 customCssUrl string|array public URLs to CSS resources
3.7 customJs string public URL to JS resource
3.8 customJsUrl string|array public URLs to JS resources
3.9 customJsStr string|array inline JS code snippets

4 Loading Spec
4.1 from JSON: require('./swagger.json')
4.2 from URL: setup(null,{swaggerOptions:{url}})
4.3 multiple URLs: setup(null,{explorer:true,swaggerOptions:{urls}})
4.4 from YAML: npm install yaml; read file; YAML.parse; pass document to setup

5 Dynamic Document
Middleware sets req.swaggerDoc then use serveFiles and setup without document args

6 Multiple Instances
Use serveFiles(document,options) before setup(document)

7 Linking Spec Endpoint
Expose GET /api-docs/swagger.json returning JSON; use serveFiles(null,{swaggerOptions:{url}})

8 Requirements
Node>=0.10.32, Express>=4

9 Testing Procedures
Install phantom; run npm test


## Supplementary Details
Express version requirement: 4.x; Node version requirement: >=0.10.32
Lock swagger-ui-dist version via package-lock.json or explicit dependency in package.json:
"swagger-ui-dist": "3.52.5"

Implementation steps:
1. npm install swagger-ui-express swagger-ui-dist
2. require express, swagger-ui-express
3. load swagger JSON or parse YAML
4. configure options object with desired properties
5. mount middleware: app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec,options))
6. verify docs at http://host:port/api-docs

Default options object:
explorer:false
swaggerOptions:{validatorUrl:"https://validator.swagger.io/"}
customCss:undefined
customCssUrl:undefined
customJs:undefined
customJsUrl:undefined
customJsStr:undefined

Common implementation patterns:
- Use express.Router to modularize docs route
- Wrap dynamic host assignment in a middleware before serveFiles
- For multiple specs, use unique paths and independent options


## Reference Details
API Specifications:

swaggerUi.serve: Express middleware function serving static assets. Signature: function(req:Request,res:Response,next:Function):void

swaggerUi.setup(document?:object, options?:{
  explorer?:boolean,
  swaggerOptions?:{
    validatorUrl?:string|null,
    url?:string,
    urls?:Array<{name:string,url:string}>
  },
  customCss?:string,
  customCssUrl?:string|string[],
  customJs?:string|string[],
  customJsUrl?:string|string[],
  customJsStr?:string|string[]
}):Function
Returns middleware that renders Swagger UI HTML.

swaggerUi.serveFiles(document?:object, options?:object):Function
Serves Swagger UI assets bound to document; combine with setup()

Code Example:
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yaml')
const fs = require('fs')
const file = fs.readFileSync('./swagger.yaml','utf8')
const swaggerDocument = YAML.parse(file)
const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      { name: 'API V1', url: '/api/v1/swagger.json' },
      { name: 'API V2', url: '/api/v2/swagger.json' }
    ],
    validatorUrl: null
  },
  customCss: '.swagger-ui .topbar{display:none}',
  customJs: '/assets/custom.js',
  customJsStr: 'console.log("Custom JS loaded")'
}

app.use('/api-docs',
  express.static('public'),
  function(req,res,next){ req.swaggerDoc = swaggerDocument; next() },
  swaggerUi.serveFiles(undefined,options),
  swaggerUi.setup(undefined,options)
)

Configuration Options Table:
option              type               default           effect
explorer            boolean            false             shows dropdown
swaggerOptions.url  string             undefined         loads spec via URL
swaggerOptions.urls Array<{name,url}>  undefined         multiple specs in explorer
swaggerOptions.validatorUrl string|null https://validator.swagger.io/ disables/upgrades request validation
customCss           string             undefined         inline CSS injection
customCssUrl        string|array       undefined         external CSS files
customJs            string|array       undefined         external JS files
customJsUrl         string|array       undefined         external JS files
customJsStr         string|array       undefined         inline JS injection

detailed Troubleshooting:
1. 404 on /api-docs:
   - ensure app.use called before other catch-all routes
   - verify swaggerUi.serve is included
2. Blank page or JS errors:
   - run npm ls swagger-ui-dist to check version
   - clear npm cache and reinstall
3. Validator errors:
   - set validatorUrl:null to disable external validator

Commands:
npm ls swagger-ui-express
npm ls swagger-ui-dist
node -v  # expect >= v0.10.32
npm run test # phantom-based UI tests


## Information Dense Extract
install swagger-ui-express via npm; require express and swagger-ui-express; load swagger spec (JSON or YAML parsed); configure options { explorer:boolean, swaggerOptions:{ validatorUrl:string|null, url:string, urls:[{name,url}] }, customCss:string, customCssUrl:string|array, customJs:string|array, customJsUrl:string|array, customJsStr:string|array }; mount middleware: app.use(path, swaggerUi.serve, swaggerUi.setup(spec,options)); for dynamic docs use middleware to set req.swaggerDoc and serveFiles; multiple instances via serveFiles(document,options); link spec via serveFiles(null,options) and setup(null,options); requirements Node>=0.10.32, Express>=4; troubleshooting: ensure serve and setup order, disable validatorUrl, verify swagger-ui-dist version, run phantom UI tests.

## Sanitised Extract
Table of Contents

1 Installation
2 Express Middleware Setup
3 Options
   3.1 explorer
   3.2 swaggerOptions.validatorUrl
   3.3 swaggerOptions.url
   3.4 swaggerOptions.urls
   3.5 customCss
   3.6 customCssUrl
   3.7 customJs
   3.8 customJsUrl
   3.9 customJsStr
4 Loading Spec
   4.1 from JSON file
   4.2 from URL
   4.3 multiple URLs
   4.4 from YAML
5 Dynamic Document
6 Multiple Instances
7 Linking Spec Endpoint
8 Requirements
9 Testing Procedures

1 Installation
Install via npm:
npm install swagger-ui-express

2 Express Middleware Setup
Require modules:
const swaggerUi = require('swagger-ui-express')
Mount docs:
app.use(path, swaggerUi.serve, swaggerUi.setup(spec,options))
Or split serve and setup with router.get

3 Options
3.1 explorer boolean default false
3.2 swaggerOptions.validatorUrl default 'https://validator.swagger.io/'; set null to disable
3.3 swaggerOptions.url string remote spec URL
3.4 swaggerOptions.urls array of {name:string,url:string} to populate dropdown; explorer must be true
3.5 customCss CSS string injected into page style
3.6 customCssUrl string|array public URLs to CSS resources
3.7 customJs string public URL to JS resource
3.8 customJsUrl string|array public URLs to JS resources
3.9 customJsStr string|array inline JS code snippets

4 Loading Spec
4.1 from JSON: require('./swagger.json')
4.2 from URL: setup(null,{swaggerOptions:{url}})
4.3 multiple URLs: setup(null,{explorer:true,swaggerOptions:{urls}})
4.4 from YAML: npm install yaml; read file; YAML.parse; pass document to setup

5 Dynamic Document
Middleware sets req.swaggerDoc then use serveFiles and setup without document args

6 Multiple Instances
Use serveFiles(document,options) before setup(document)

7 Linking Spec Endpoint
Expose GET /api-docs/swagger.json returning JSON; use serveFiles(null,{swaggerOptions:{url}})

8 Requirements
Node>=0.10.32, Express>=4

9 Testing Procedures
Install phantom; run npm test

## Original Source
Swagger UI Express
https://github.com/scottie1984/swagger-ui-express

## Digest of SWAGGER_UI_EXPRESS

# Swagger UI Express Technical Digest

Retrieved: 2024-06-12
Source: https://github.com/scottie1984/swagger-ui-express
Data Size: 539117 bytes

## Usage

Install

npm install swagger-ui-express

Express app setup

const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

Router setup

const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

## Swagger Explorer

Default hidden. Enable:

var options = { explorer: true }
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

## Custom swaggerOptions

var options = {
  swaggerOptions: { validatorUrl: null }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

## Custom CSS

// Inline CSS
var options = { customCss: '.swagger-ui .topbar { display: none }' }

// CSS URL(s)
var options = { customCssUrl: '/custom.css' }
var options = { customCssUrl: [ '/custom.css','https://example.com/other-custom.css' ] }

Mount:
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

## Custom JS

// External JS
var options = { customJs: '/custom.js' }
var options = { customJs: [ '/custom.js','https://example.com/other-custom.js' ] }

// Inline JS
var options = { customJsStr: 'console.log("Hello World")' }
var options = {
  customJsStr: [ 'console.log("Hello World")', 'var x = 1; console.log(x)' ]
}

## Load Swagger from URL

var options = {
  swaggerOptions: { url: 'http://petstore.swagger.io/v2/swagger.json' }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))

## Load Multiple Swagger URLs

var options = {
  explorer: true,
  swaggerOptions: {
    urls: [ { url: 'http://petstore.swagger.io/v2/swagger.json', name: 'Spec1' },
            { url: 'http://petstore.swagger.io/v2/swagger.json', name: 'Spec2' } ]
  }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))

## Load YAML

npm install yaml
const fs = require('fs')
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml','utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

## Dynamic Swagger Document

app.use('/api-docs', function(req,res,next){
  swaggerDocument.host = req.get('host')
  req.swaggerDoc = swaggerDocument
  next()
}, swaggerUi.serveFiles(swaggerDocument,{}), swaggerUi.setup())

## Multiple Instances

app.use('/api-docs-one', swaggerUi.serveFiles(swaggerDocumentOne,{}), swaggerUi.setup(swaggerDocumentOne))
app.use('/api-docs-two', swaggerUi.serveFiles(swaggerDocumentTwo,{}), swaggerUi.setup(swaggerDocumentTwo))
app.use('/api-docs-dynamic', middleware, swaggerUi.serveFiles(), swaggerUi.setup())

## Link to Swagger Document

app.get('/api-docs/swagger.json',(req,res)=>res.json(swaggerDocument))
var options = { swaggerOptions:{ url:'/api-docs/swagger.json' } }
app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options))

## Requirements

Node >=0.10.32
Express >=4

## Testing

npm install phantom
npm test

## Attribution
- Source: Swagger UI Express
- URL: https://github.com/scottie1984/swagger-ui-express
- License: MIT License
- Crawl Date: 2025-05-08T15:30:57.288Z
- Data Size: 539117 bytes
- Links Found: 4315

## Retrieved
2025-05-08
library/OPENAPI_SPEC.md
# library/OPENAPI_SPEC.md
# OPENAPI_SPEC

## Crawl Summary
openapi: string; info{title,version}; servers[{url,variables}]; paths{/...: pathItem}; components{schemas,responses,parameters,examples,requestBodies,headers,securitySchemes,links,callbacks}; parameter.name,in,required,style,explode,allowReserved; requestBody.content[mediaType]; response.description,content; schema.types,formats; securitySchemes.(type,name,in,flows); OAuth2 flows

## Normalised Extract
Table of Contents:
1 OpenAPI Root
2 Info Metadata
3 Server Configuration
4 Paths Definition
5 Path Item Operations
6 Operation Structure
7 Components Registry
8 Parameter Definition
9 Request Body Specification
10 Response Specification
11 Schema Definition
12 Security Schemes

1 OpenAPI Root
openapi: "3.0.3"
info.version: API version string
info.title: API title
2 Info Metadata
title (string), version (string), optional description, termsOfService (URL), contact{name,url,email}, license{name,url}
3 Server Configuration
servers[]: url:string, description:string, variables{ name:{default:string,enum:[string],description:string} }
4 Paths Definition
paths:{"/{resource}/{id}":{operations,parameters,servers}}
5 Path Item Operations
object fields: get,put,post,delete,patch,etc → Operation Object; parameters[] applies to all operations
6 Operation Structure
tags[], summary,string, description,string, operationId,string, parameters[], requestBody, responses{statusCode:Response Object}, security[], servers[]
7 Components Registry
components.schemas{name:Schema}, parameters{name:Parameter}, responses{name:Response}, requestBodies{name:RequestBody}, headers{name:Header}, securitySchemes{name:SecurityScheme}, examples, links, callbacks
8 Parameter Definition
name:string,in:(path|query|header|cookie),required:boolean,deprecated:boolean,style:(form|simple|matrix|label|spaceDelimited|pipeDelimited|deepObject),explode:boolean,allowReserved:boolean,schema:Schema,example,examples,content{mediaType:MediaType}
9 Request Body Specification
description, required:boolean, content{mediaType:{schema:Schema,examples,encoding:{property:{contentType,headers,style,explode,allowReserved}}}}
10 Response Specification
description, headers, content{mediaType:{schema,examples,encoding}}, links
11 Schema Definition
fixedFields:title,type,format,properties,required,allOf,oneOf,anyOf,not,items,additionalProperties,description,default,enum,nullable,deprecated,readOnly,writeOnly
12 Security Schemes
type:apiKey{name,in},http{scheme,bearerFormat},oauth2{flows},openIdConnect{openIdConnectUrl}


## Supplementary Details
- Semantic Versioning: major.minor.patch. openapi field MUST match spec version.  
- YAML: version 1.2, common constraints: JSON Failsafe schema, scalar string keys, markdown in description fields.  
- Path Templating: parameters in path MUST match template names.  
- Content negotiation: media types evaluated by most specific match.  
- Style defaults: query=form, path=simple, header=simple, cookie=form.  
- explode default: form=true, others=false.  
- allowEmptyValue: only query, default false.  
- deepObject style: for object query parameters.  
- Security Requirement: OR logic within array; empty {} makes optional.  


## Reference Details
# Full API Specifications

## OpenAPI Object
openapi: string (REQUIRED, regex "^(\\d+\\.){2}\\d+$")
info: Info Object
servers: [ Server Object ] default=[{url:"/"}]
paths: Paths Object (REQUIRED)
components: Components Object
security: [ Security Requirement Object ]
tags: [ Tag Object ]
externalDocs: External Documentation Object

## Info Object
title: string (REQUIRED)
description: string
toS: URL (RFC3986)
contact:
  name: string
  url: URL
  email: email
license:
  name: string (REQUIRED)
  url: URL (REQUIRED)
version: string (REQUIRED)

## Server Object
url: string (REQUIRED)
description: string
variables:
  <name>:
    enum: [string]
    default: string (REQUIRED)
    description: string

## Paths Object
Type: Object
Keys: "/" prefix; value: Path Item Object

## Path Item Object
$ref: URL
summary: string
description: string
servers: [ Server Object ]
parameters: [ Parameter | Reference ]
operations:
  get,put,post,delete,options,head,patch,trace: Operation Object

## Operation Object
tags: [ string ]
summary: string
description: string
externalDocs: External Documentation Object
operationId: string (unique)
parameters: [ Parameter | Reference ]
requestBody: RequestBody | Reference
responses: {<statusCode>: Response | Reference} (REQUIRED)
callbacks: {<name>: Callback | Reference}
deprecated: boolean (default=false)
security: [ Security Requirement ]
servers: [ Server ]

## Components Object
schemas: {<name>: Schema | Reference}
responses: {<name>: Response | Reference}
parameters: {<name>: Parameter | Reference}
examples: {<name>: Example | Reference}
requestBodies: {<name>: RequestBody | Reference}
headers: {<name>: Header | Reference}
securitySchemes: {<name>: SecurityScheme | Reference}
links: {<name>: Link | Reference}
callbacks: {<name>: Callback | Reference}

## Parameter Object
name: string (REQUIRED)
in: "path"|"query"|"header"|"cookie" (REQUIRED)
description: string
required: boolean (default false; path=true)
deprecated: boolean (default false)
allowEmptyValue: boolean (default false, query only)
style: string
explode: boolean
allowReserved: boolean
schema: Schema | Reference
example: any
examples: {<name>: Example | Reference}
content: {<mediaType>: MediaType}

## Request Body Object
description: string
content: {<mediaType>: MediaType} (REQUIRED)
required: boolean (default false)

## Response Object
description: string (REQUIRED)
headers: {<name>: Header | Reference}
content: {<mediaType>: MediaType}
links: {<name>: Link | Reference}

## Schema Object
title: string
description: string
default: any
enum: [any]
type: "string"|"number"|"integer"|"boolean"|"array"|"object"
format: string
properties: {<name>: Schema | Reference}
required: [string]
additionalProperties: boolean | Schema | Reference
items: Schema | Reference
allOf/oneOf/anyOf: [Schema | Reference]
not: Schema | Reference
nullable: boolean
readOnly/writeOnly: boolean
deprecated: boolean
xml: XML Object
discriminator: Discriminator Object
externalDocs: External Documentation Object
example: any

## Security Scheme Object
type: "apiKey"|"http"|"oauth2"|"openIdConnect"(REQUIRED)
description: string
name: string (apiKey)
in: "query"|"header"|"cookie"(apiKey)
scheme: string (http)
bearerFormat: string
describes the format of the bearer token
flows: OAuthFlows (oauth2)
openIdConnectUrl: URL (openIdConnect)

## OAuthFlows Object
implicit/password/clientCredentials/authorizationCode: OAuthFlow Object

## OAuthFlow Object
authorizationUrl: URL (implicit, authorizationCode)
tokenUrl: URL (password, clientCredentials, authorizationCode)
refreshUrl: URL
tScopes: {<scope>: description}

## MediaType Object
schema: Schema | Reference
examples: {<name>: Example | Reference}
encoding: {<name>: Encoding}

## Encoding Object
contentType: string
headers: {<name>: Header | Reference}
style: string
explode: boolean
allowReserved: boolean

## Reference Object
$ref: URL (REQUIRED)

## Security Requirement Object
{<name>: [string]}

## Information Dense Extract
openapi:string;info{title:string,version:string};servers[url:string,variables{name:{default:string,enum:[string],description:string}}];paths{"/<path>":{parameters:[{name,in,required:boolean,style,explode,allowReserved,schema}],servers,operations{get,post,put,delete,patch,options,head,trace: {operationId,parameters,requestBody:content{<mediaType>:schema},responses{<code>:content{<mediaType>:schema},description},security,servers}}};components{schemas,parameters,responses,requestBodies,headers,securitySchemes,links,callbacks};schema{type,format,properties,required,allOf,oneOf,anyOf,not,items,additionalProperties,enum,default,nullable,readOnly,writeOnly,example,deprecated};securitySchemes{apiKey{name,in},http{scheme,bearerFormat},oauth2{flows:{implicit,authorizationCode,password,clientCredentials}},openIdConnect{openIdConnectUrl}}

## Sanitised Extract
Table of Contents:
1 OpenAPI Root
2 Info Metadata
3 Server Configuration
4 Paths Definition
5 Path Item Operations
6 Operation Structure
7 Components Registry
8 Parameter Definition
9 Request Body Specification
10 Response Specification
11 Schema Definition
12 Security Schemes

1 OpenAPI Root
openapi: '3.0.3'
info.version: API version string
info.title: API title
2 Info Metadata
title (string), version (string), optional description, termsOfService (URL), contact{name,url,email}, license{name,url}
3 Server Configuration
servers[]: url:string, description:string, variables{ name:{default:string,enum:[string],description:string} }
4 Paths Definition
paths:{'/{resource}/{id}':{operations,parameters,servers}}
5 Path Item Operations
object fields: get,put,post,delete,patch,etc  Operation Object; parameters[] applies to all operations
6 Operation Structure
tags[], summary,string, description,string, operationId,string, parameters[], requestBody, responses{statusCode:Response Object}, security[], servers[]
7 Components Registry
components.schemas{name:Schema}, parameters{name:Parameter}, responses{name:Response}, requestBodies{name:RequestBody}, headers{name:Header}, securitySchemes{name:SecurityScheme}, examples, links, callbacks
8 Parameter Definition
name:string,in:(path|query|header|cookie),required:boolean,deprecated:boolean,style:(form|simple|matrix|label|spaceDelimited|pipeDelimited|deepObject),explode:boolean,allowReserved:boolean,schema:Schema,example,examples,content{mediaType:MediaType}
9 Request Body Specification
description, required:boolean, content{mediaType:{schema:Schema,examples,encoding:{property:{contentType,headers,style,explode,allowReserved}}}}
10 Response Specification
description, headers, content{mediaType:{schema,examples,encoding}}, links
11 Schema Definition
fixedFields:title,type,format,properties,required,allOf,oneOf,anyOf,not,items,additionalProperties,description,default,enum,nullable,deprecated,readOnly,writeOnly
12 Security Schemes
type:apiKey{name,in},http{scheme,bearerFormat},oauth2{flows},openIdConnect{openIdConnectUrl}

## Original Source
OpenAPI Specification (OAS)
https://spec.openapis.org/oas/v3.0.3

## Digest of OPENAPI_SPEC

# OpenAPI Specification v3.0.3 (retrieved 2023-10-07)

## 1. OpenAPI Object  
openapi: string (REQUIRED, semantic version)  
info: Info Object (REQUIRED)  
servers: [ Server Object ] (default: [{ url: "/" }])  
paths: Paths Object (REQUIRED)  
components: Components Object  
security: [ Security Requirement Object ]  
tags: [ Tag Object ]  
externalDocs: External Documentation Object

## 2. Info Object
- title: string (REQUIRED)
- description: string
- termsOfService: URL
- contact: Contact Object
- license: License Object
- version: string (REQUIRED)

## 3. Server Object
- url: URL template (REQUIRED)
- description: string
- variables: Map[string, Server Variable Object]

## 4. Paths Object
Patterned fields: "/path" → Path Item Object

## 5. Path Item Object
- $ref: string (URL)
- summary: string
- description: string
- operations: get, put, post, delete, options, head, patch, trace: Operation Object
- servers: [ Server Object ]
- parameters: [ Parameter Object | Reference Object ]

## 6. Operation Object
- tags: [ string ]
- summary: string
- description: string
- externalDocs: External Documentation Object
- operationId: string (unique)
- parameters: [ Parameter Object | Reference Object ]
- requestBody: Request Body Object | Reference Object
- responses: Map[string (status code), Response Object | Reference Object] (REQUIRED)
- callbacks: Map[string, Callback Object | Reference Object]
- deprecated: boolean (default false)
- security: [ Security Requirement Object ]
- servers: [ Server Object ]

## 7. Components Object
- schemas: Map[string, Schema Object | Reference Object]
- responses: Map[string, Response Object | Reference Object]
- parameters: Map[string, Parameter Object | Reference Object]
- examples: Map[string, Example Object | Reference Object]
- requestBodies: Map[string, Request Body Object | Reference Object]
- headers: Map[string, Header Object | Reference Object]
- securitySchemes: Map[string, Security Scheme Object | Reference Object]
- links: Map[string, Link Object | Reference Object]
- callbacks: Map[string, Callback Object | Reference Object]

## 8. Parameter Object
- name: string (REQUIRED)
- in: "query" | "header" | "path" | "cookie" (REQUIRED)
- description: string
- required: boolean (default false; MUST=true for in=path)
- deprecated: boolean (default false)
- allowEmptyValue: boolean (default false)
- style: ... (default: form|simple|form|simple)
- explode: boolean
- allowReserved: boolean
- schema: Schema Object | Reference Object
- example: any
- examples: Map[string, Example Object | Reference Object]
- content: Map[string (mediaType), Media Type Object]

## 9. Request Body Object
- description: string
- content: Map[string (mediaType), Media Type Object] (REQUIRED)
- required: boolean (default false)

## 10. Response Object
- description: string (REQUIRED)
- headers: Map[string, Header Object | Reference Object]
- content: Map[string (mediaType), Media Type Object]
- links: Map[string, Link Object | Reference Object]

## 11. Schema Object
Fixed fields: title, multipleOf, maximum, exclusiveMaximum, minimum, exclusiveMinimum, maxLength, minLength, pattern, maxItems, minItems, uniqueItems, maxProperties, minProperties, required, enum, type, allOf, oneOf, anyOf, not, items, properties, additionalProperties, description, format, default, nullable, discriminator, readOnly, writeOnly, xml, externalDocs, example, deprecated

## 12. Security Scheme Object
- type: "apiKey" | "http" | "oauth2" | "openIdConnect" (REQUIRED)
- description: string
- name: string (REQUIRED for apiKey)
- in: "query" | "header" | "cookie" (REQUIRED for apiKey)
- scheme: string (REQUIRED for http)
- bearerFormat: string
- flows: OAuth Flows Object (REQUIRED for oauth2)
- openIdConnectUrl: URL (REQUIRED for openIdConnect)

## 13. OAuth Flows Object
Map: implicit, password, clientCredentials, authorizationCode: OAuth Flow Object

## 14. Encoding Object
- contentType: string
- headers: Map[string, Header Object | Reference Object]
- style: string
- explode: boolean
- allowReserved: boolean

## Attribution
- Source: OpenAPI Specification (OAS)
- URL: https://spec.openapis.org/oas/v3.0.3
- License: CC0 1.0 Universal
- Crawl Date: 2025-05-08T09:30:25.292Z
- Data Size: 17035172 bytes
- Links Found: 55931

## Retrieved
2025-05-08
library/MINIMIST.md
# library/MINIMIST.md
# MINIMIST

## Crawl Summary
minimist(args:Array<string>, opts?:{boolean:Array<string>|boolean,string:Array<string>,alias:Object,default:Object,unknown:(arg:string)=>boolean,stopEarly:boolean,'--':boolean}) => ParsedArgs:{_:string[],[flag]:boolean|string|number|Array<string|number>,'--'?:string[]}  opts.boolean default:false opts.string default:[] opts.alias default:{} opts.default default:{} opts.unknown default:undefined opts.stopEarly default:false opts['--'] default:false

## Normalised Extract
Table of Contents:
1 Function Signature
2 Configuration Options
3 ParsedArgs Object

1 Function Signature
   minimist  (args: Array<string>, opts?: {
     boolean: Array<string> | boolean,
     string: Array<string>,
     alias: { [key: string]: string | Array<string> },
     default: { [key: string]: any },
     unknown: (arg: string) => boolean,
     stopEarly: boolean,
     "--": boolean
   }) => ParsedArgs

2 Configuration Options
   boolean: flags to coerce to booleans or true for all non-numeric
   string: flags to coerce to strings
   alias: map short names to long names mutually
   default: values assigned when flag absent
   unknown: callback for flags not in alias or default; return false to skip storing
   stopEarly: halt parsing on first non-option and push rest to _
   "--": when true, arguments after "--" go into ParsedArgs['--']

3 ParsedArgs Object
   _: Array<string> positional
   [flag]: boolean | string | number | Array<string|number>
   "--"?: Array<string> only if opts["--"] true

## Supplementary Details
Parameter Types and Defaults:
  args: Array<string> required
  opts.boolean: Array<string> | boolean default false
  opts.string: Array<string> default []
  opts.alias: Object default {}
  opts.default: Object default {}
  opts.unknown: Function default undefined
  opts.stopEarly: boolean default false
  opts['--']: boolean default false
Implementation Steps:
 1 Import minimist
 2 Prepare args array (slice process.argv)
 3 Define opts object per requirements
 4 Call minimist(args, opts)
 5 Access flags and positionals from returned object
Type Coercion:
 - Numeric strings are converted to Number unless listed in opts.string or opts.boolean
 - Boolean flags appear as true or false
 - String flags respect opts.string
Alias Resolution:
 - Multiple aliases map to same key and mirror values
Unknown Flags:
 - unknown callback allows validation or rejection
Stop Early:
 - when true, parsing stops at first non-flag
"--" Handling:
 - arguments after "--" bypass parsing into flags and appended to ['--'] array

## Reference Details
API:
  function minimist(
    args: string[],
    opts?: {
      boolean?: string[] | boolean,
      string?: string[],
      alias?: Record<string,string | string[]>,
      default?: Record<string, any>,
      unknown?(arg: string): boolean,
      stopEarly?: boolean,
      "--"?: boolean
    }
  ): {
    _: string[],
    "--"?: string[],
    [key: string]: any
  }

Code Examples:
  // Basic
  const argv = require('minimist')(process.argv.slice(2))

  // With defaults and aliases
  const opts = {
    boolean: ['debug'],
    string: ['name'],
    alias: { d: 'debug', n: 'name' },
    default: { debug: false, name: 'guest' }
  }
  const argv2 = require('minimist')(process.argv.slice(2), opts)

Best Practices:
  • Explicitly list boolean and string flags to avoid unintended coercion.
  • Provide default values for critical flags.
  • Use alias to support short and long forms consistently.
  • Use unknown callback to enforce allowed options.

Troubleshooting:
  Command: node app.js --debug --name=alice extra
  Expected ParsedArgs: { _: ['extra'], debug: true, d: true, name: 'alice', n: 'alice' }
  If numeric values remain strings, ensure the flag is not in opts.string.
  To capture arguments after "--": set opts['--']=true and verify argv['--'] contains those items.

Step-by-Step:
 1 Verify process.argv slicing
 2 Log opts to confirm arrays and mappings
 3 Log returned object to inspect coercions
 4 Use unknown callback to catch unexpected flags
 5 Validate presence of ['--'] when needed

## Information Dense Extract
minimist(args:Array<string>,opts?:{boolean:Array<string>|boolean= false,string:Array<string>= [],alias:Object= {},default:Object= {},unknown:(arg)=>boolean,stopEarly:boolean= false,'--':boolean= false})=>ParsedArgs:{_:string[], '--'?:string[],[flag]:boolean|string|number|Array<string|number>}. opts.boolean coerces flags or all non-numerics, opts.string preserves strings, opts.alias maps keys bi-directionally, opts.default supplies missing, unknown filters flags, stopEarly halts on first non-option, '--' captures trailing args.

## Sanitised Extract
Table of Contents:
1 Function Signature
2 Configuration Options
3 ParsedArgs Object

1 Function Signature
   minimist  (args: Array<string>, opts?: {
     boolean: Array<string> | boolean,
     string: Array<string>,
     alias: { [key: string]: string | Array<string> },
     default: { [key: string]: any },
     unknown: (arg: string) => boolean,
     stopEarly: boolean,
     '--': boolean
   }) => ParsedArgs

2 Configuration Options
   boolean: flags to coerce to booleans or true for all non-numeric
   string: flags to coerce to strings
   alias: map short names to long names mutually
   default: values assigned when flag absent
   unknown: callback for flags not in alias or default; return false to skip storing
   stopEarly: halt parsing on first non-option and push rest to _
   '--': when true, arguments after '--' go into ParsedArgs['--']

3 ParsedArgs Object
   _: Array<string> positional
   [flag]: boolean | string | number | Array<string|number>
   '--'?: Array<string> only if opts['--'] true

## Original Source
minimist
https://github.com/substack/minimist

## Digest of MINIMIST

# Overview
Minimist is a lightweight Node.js argument parser that converts command-line arguments into an object with keys for flags and values.

# Installation
```bash
npm install minimist --save
```

# Usage
```js
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2), opts)
```

# API

## minimist(args, opts)
- args  (Array<string>): list of command-line tokens (usually process.argv.slice(2)).
- opts  (Object, optional): configuration object with fields:
  • boolean   (Array<string> | boolean) – flags to always treat as booleans or true to treat all non-numeric as booleans. Default: false.
  • string    (Array<string>) – flags to always treat as strings. Default: [].
  • alias     (Object) – mapping of flag names to aliases, e.g. { h: 'help' }.
  • default   (Object) – default values for flags, e.g. { verbose: false }.
  • unknown   (Function): (arg: string) => boolean – called for unrecognized flags; return false to skip setting.
  • stopEarly (boolean) – stop parsing on first non-option. Default: false.
  • "--"     (boolean) – populate args after "--" into argv['--']. Default: false.

# Return Value
ParsedArgs (Object):
  • _ (Array<string>) – positional arguments.
  • [flag: string]: boolean | string | number | Array<string | number>
  • "--" (Array<string>) when opts["--"] is true.

# Examples
```js
const argv = minimist(['-x', '3', '--verbose'], {
  boolean: 'verbose',
  default: { x: 0 },
  alias: { v: 'verbose' }
})
// argv = { _: [], x: 3, verbose: true, v: true }
```

# Content retrieved on 2024-06-15 from https://github.com/substack/minimist

## Attribution
- Source: minimist
- URL: https://github.com/substack/minimist
- License: MIT License
- Crawl Date: 2025-05-08T03:35:44.150Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-08

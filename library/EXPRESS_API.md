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

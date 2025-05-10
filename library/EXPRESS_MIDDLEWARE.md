# EXPRESS_MIDDLEWARE

## Crawl Summary
express.json: parses JSON bodies into req.body; options inflate=true, limit='100kb', reviver=null, strict=true, type='application/json', verify=undefined
express.urlencoded: parses URL-encoded bodies; options extended=true, inflate=true, limit='100kb', parameterLimit=1000, type='application/x-www-form-urlencoded', verify=undefined
express.raw: parses bodies to Buffer; options inflate=true, limit='100kb', type='application/octet-stream', verify=undefined
express.text: parses bodies to String; options defaultCharset='utf-8', inflate=true, limit='100kb', type='text/plain', verify=undefined
express.static: serves static files from root; options dotfiles=(allow|deny|ignore), etag=true, extensions=false, fallthrough=true, immutable=false, index='index.html', lastModified=true, maxAge=0, redirect=true, setHeaders=function

## Normalised Extract
Table of Contents:
 1 express.json middleware
 2 express.urlencoded middleware
 3 express.raw middleware
 4 express.text middleware
 5 express.static middleware

1 express.json middleware
Signature
  express.json(options?)
Options
  inflate: Boolean = true
  limit: Number|String = '100kb'
  reviver: Function|null = null
  strict: Boolean = true
  type: String|String[]|Function = 'application/json'
  verify: Function|undefined = undefined
Output
  req.body: parsed Object or {}
Usage
  app.use(express.json({limit:'1mb',verify:function(req,res,buf,enc){}}))

2 express.urlencoded middleware
Signature
  express.urlencoded(options?)
Options
  extended: Boolean = true
  inflate: Boolean = true
  limit: Number|String = '100kb'
  parameterLimit: Number = 1000
  type: String|String[]|Function = 'application/x-www-form-urlencoded'
  verify: Function|undefined = undefined
Output
  req.body: object of key-values or {}
Usage
  app.use(express.urlencoded({extended:false,parameterLimit:500}))

3 express.raw middleware
Signature
  express.raw(options?)
Options
  inflate: Boolean = true
  limit: Number|String = '100kb'
  type: String|String[]|Function = 'application/octet-stream'
  verify: Function|undefined = undefined
Output
  req.body: Buffer or {}
Usage
  app.use(express.raw({limit:'5mb',type:'application/custom'}))

4 express.text middleware
Signature
  express.text(options?)
Options
  defaultCharset: String = 'utf-8'
  inflate: Boolean = true
  limit: Number|String = '100kb'
  type: String|String[]|Function = 'text/plain'
  verify: Function|undefined = undefined
Output
  req.body: String or {}
Usage
  app.use(express.text({defaultCharset:'iso-8859-1'}))

5 express.static middleware
Signature
  express.static(root,options?)
Options
  dotfiles: 'allow'|'deny'|'ignore' = undefined
  etag: Boolean = true
  extensions: Boolean|String[] = false
  fallthrough: Boolean = true
  immutable: Boolean = false
  index: Boolean|String = 'index.html'
  lastModified: Boolean = true
  maxAge: Number|String = 0
  redirect: Boolean = true
  setHeaders: Function|undefined
Behavior
  serve files under root; on missing file call next(); sets response headers
Usage
  var opts = {maxAge:'1d',immutable:true,setHeaders:function(res,path,stat){res.set('x-ts',Date.now())}}; app.use(express.static('public',opts))


## Supplementary Details
Implementation steps:
 1 Install express via npm: npm install express
 2 Require and initialize: var express = require('express'); var app = express();
 3 Attach parsers before route handlers:
    app.use(express.json({limit:'500kb',strict:false}));
    app.use(express.urlencoded({extended:true,parameterLimit:2000}));
 4 For raw or text on specific routes:
    app.post('/upload',express.raw({type:'application/octet-stream',limit:'10mb'}),handler);
    app.post('/text',express.text({defaultCharset:'utf-8'}),handler);
 5 Serve static assets before dynamic routes:
    app.use(express.static(__dirname+'/public',{dotfiles:'ignore',maxAge:'2h'}));
Security considerations:
  Validate req.body content server-side. Use verify option to inspect raw body. Enforce limits to prevent DoS.


## Reference Details
express.json(options?) returns middleware(req,res,next)
  options.inflate        Boolean=true
  options.limit          Number|String='100kb'
  options.reviver        Function|null
  options.strict         Boolean=true
  options.type           String|String[]|Function='application/json'
  options.verify         Function(req,res,buf,encoding)
Example
  app.use(express.json({limit:'1mb',verify:function(req,res,buf){ if(buf.length>1e6)throw Error('Too large');}}))
Troubleshooting
  If JSON parsing fails, ensure Content-Type header is 'application/json'. To debug, log req.headers['content-type'].

express.urlencoded(options?) returns middleware
  options.extended       Boolean=true
  options.inflate        Boolean=true
  options.limit          Number|String='100kb'
  options.parameterLimit Number=1000
  options.type           String|String[]|Function='application/x-www-form-urlencoded'
  options.verify         Function(req,res,buf,encoding)
Example
  app.use(express.urlencoded({extended:false,parameterLimit:500}))
Troubleshooting
  For nested objects, set extended=true. If parser not invoked, verify type matcher.

express.raw(options?) returns middleware
  options.inflate        Boolean=true
  options.limit          Number|String='100kb'
  options.type           String|String[]|Function='application/octet-stream'
  options.verify         Function(req,res,buf,encoding)
Example
  app.post('/bin',express.raw({limit:'5mb'}),function(req,res){ if(!Buffer.isBuffer(req.body))return res.status(400);})

express.text(options?) returns middleware
  options.defaultCharset String='utf-8'
  options.inflate        Boolean=true
  options.limit          Number|String='100kb'
  options.type           String|String[]|Function='text/plain'
  options.verify         Function
Example
  app.post('/text',express.text({limit:'200kb'}),function(req,res){res.send(req.body.trim());})

express.static(root,options) returns middleware
  root: String
  options.dotfiles       'allow'|'deny'|'ignore'
  options.etag           Boolean=true
  options.extensions     Boolean|String[]=false
  options.fallthrough    Boolean=true
  options.immutable      Boolean=false
  options.index          Boolean|String='index.html'
  options.lastModified   Boolean=true
  options.maxAge         Number|String=0
  options.redirect       Boolean=true
  options.setHeaders     Function(res,path,stat)
Example
  app.use(express.static('public',{dotfiles:'deny',maxAge:'1d',immutable:true,redirect:false,setHeaders:function(res,path,stat){res.set('Cache-Control','public');}}))
Troubleshooting
  If static files not served, confirm absolute root path or console.log(req.url). Use fallthrough=false to get 404 short-circuit.

## Information Dense Extract
express.json: middleware(options){inflate:true;limit:100kb;reviver:null;strict:true;type:application/json;verify:fn} => req.body:Object
express.urlencoded: middleware(options){extended:true;inflate:true;limit:100kb;parameterLimit:1000;type:application/x-www-form-urlencoded;verify:fn} => req.body:Object
express.raw: middleware(options){inflate:true;limit:100kb;type:application/octet-stream;verify:fn} => req.body:Buffer
express.text: middleware(options){defaultCharset:utf-8;inflate:true;limit:100kb;type:text/plain;verify:fn} => req.body:String
express.static: middleware(root,options){dotfiles:allow|deny|ignore;etag:true;extensions:false;fallthrough:true;immutable:false;index:index.html;lastModified:true;maxAge:0;redirect:true;setHeaders:fn} => serves files, next() on miss

## Sanitised Extract
Table of Contents:
 1 express.json middleware
 2 express.urlencoded middleware
 3 express.raw middleware
 4 express.text middleware
 5 express.static middleware

1 express.json middleware
Signature
  express.json(options?)
Options
  inflate: Boolean = true
  limit: Number|String = '100kb'
  reviver: Function|null = null
  strict: Boolean = true
  type: String|String[]|Function = 'application/json'
  verify: Function|undefined = undefined
Output
  req.body: parsed Object or {}
Usage
  app.use(express.json({limit:'1mb',verify:function(req,res,buf,enc){}}))

2 express.urlencoded middleware
Signature
  express.urlencoded(options?)
Options
  extended: Boolean = true
  inflate: Boolean = true
  limit: Number|String = '100kb'
  parameterLimit: Number = 1000
  type: String|String[]|Function = 'application/x-www-form-urlencoded'
  verify: Function|undefined = undefined
Output
  req.body: object of key-values or {}
Usage
  app.use(express.urlencoded({extended:false,parameterLimit:500}))

3 express.raw middleware
Signature
  express.raw(options?)
Options
  inflate: Boolean = true
  limit: Number|String = '100kb'
  type: String|String[]|Function = 'application/octet-stream'
  verify: Function|undefined = undefined
Output
  req.body: Buffer or {}
Usage
  app.use(express.raw({limit:'5mb',type:'application/custom'}))

4 express.text middleware
Signature
  express.text(options?)
Options
  defaultCharset: String = 'utf-8'
  inflate: Boolean = true
  limit: Number|String = '100kb'
  type: String|String[]|Function = 'text/plain'
  verify: Function|undefined = undefined
Output
  req.body: String or {}
Usage
  app.use(express.text({defaultCharset:'iso-8859-1'}))

5 express.static middleware
Signature
  express.static(root,options?)
Options
  dotfiles: 'allow'|'deny'|'ignore' = undefined
  etag: Boolean = true
  extensions: Boolean|String[] = false
  fallthrough: Boolean = true
  immutable: Boolean = false
  index: Boolean|String = 'index.html'
  lastModified: Boolean = true
  maxAge: Number|String = 0
  redirect: Boolean = true
  setHeaders: Function|undefined
Behavior
  serve files under root; on missing file call next(); sets response headers
Usage
  var opts = {maxAge:'1d',immutable:true,setHeaders:function(res,path,stat){res.set('x-ts',Date.now())}}; app.use(express.static('public',opts))

## Original Source
Express.js API Reference
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_MIDDLEWARE

# express.json()
This built-in middleware (since v4.16.0) parses JSON payloads.
Signature: express.json(options?)
Options:
  inflate       Boolean    default true    enable inflation of gzip/deflate
  limit         Number|String    default '100kb'    max request body size
  reviver       Function|null    default null    passed to JSON.parse
  strict        Boolean    default true    only parse arrays and objects
  type          String|String[]|Function    default 'application/json'    media type matcher
  verify        Function    default undefined    called as verify(req,res,buf,encoding)
Behavior:
  req.body is set to parsed object or {}.

# express.urlencoded()
This built-in middleware (since v4.16.0) parses urlencoded payloads.
Signature: express.urlencoded(options?)
Options:
  extended        Boolean    default true    use qs when true, querystring when false
  inflate         Boolean    default true
  limit           Number|String    default '100kb'
  parameterLimit  Number    default 1000    max number of parameters
  type            String|String[]|Function    default 'application/x-www-form-urlencoded'
  verify          Function    default undefined    see express.json
Behavior:
  req.body is set to key-value pairs or {}.

# express.raw()
Built-in middleware (since v4.17.0) parses bodies into Buffer.
Signature: express.raw(options?)
Options:
  inflate    Boolean    default true
  limit      Number|String    default '100kb'
  type       String|String[]|Function    default 'application/octet-stream'
  verify     Function    default undefined
Behavior:
  req.body contains a Buffer or {}.

# express.text()
Built-in middleware (since v4.17.0) parses bodies into String.
Signature: express.text(options?)
Options:
  defaultCharset  String    default 'utf-8'
  inflate         Boolean    default true
  limit           Number|String    default '100kb'
  type            String|String[]|Function    default 'text/plain'
  verify          Function    default undefined
Behavior:
  req.body contains a String or {}.

# express.static()
Built-in middleware serves static files.
Signature: express.static(root,options?)
Options:
  dotfiles       String    default undefined    allow|deny|ignore
  etag           Boolean    default true    weak ETags
  extensions     Boolean|String[]    default false    fallback extensions
  fallthrough    Boolean    default true    call next() on client errors
  immutable      Boolean    default false    Cache-Control immutable
  index          Boolean|String    default 'index.html'    directory index
  lastModified   Boolean    default true    set Last-Modified header
  maxAge         Number|String    default 0    Cache-Control max-age
  redirect       Boolean    default true    redirect to trailing slash
  setHeaders     Function    default none    fn(res,path,stat)
Behavior:
  serves files from root; on not found calls next(); sets headers per options.


## Attribution
- Source: Express.js API Reference
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-10T13:57:56.330Z
- Data Size: 28444521 bytes
- Links Found: 22059

## Retrieved
2025-05-10

# EXPRESS

## Crawl Summary
Built-in body parsers express.json, express.raw, express.text, express.urlencoded with their options: inflate (true), limit ("100kb"), type defaults and verify hooks. Router creation with caseSensitive, mergeParams, strict flags. Static file serving with options dotfiles, etag, extensions, fallthrough, immutable, index, lastModified, maxAge, redirect, setHeaders. Routing methods app.METHOD for all HTTP verbs. app.listen signature as alias for http.Server.listen.

## Normalised Extract
Table of Contents:
1  express.json
2  express.raw
3  express.text
4  express.urlencoded
5  express.Router
6  express.static
7  Routing methods
8  app.listen

1  express.json([options])
  Function parses JSON bodies. Signature: express.json({inflate,limit,reviver,strict,type,verify}). Default inflate=true, limit="100kb", reviver=null, strict=true, type="application/json". Use in middleware chain: app.use(express.json({limit:'1mb'})).

2  express.raw([options])
  Parses raw Buffer bodies. Signature: express.raw({inflate,limit,type,verify}). Default type="application/octet-stream".

3  express.text([options])
  Parses text bodies. Options: defaultCharset="utf-8", inflate=true, limit="100kb", type="text/plain", verify.

4  express.urlencoded([options])
  Parses URL-encoded. Options: extended=true (qs), inflate=true, limit="100kb", parameterLimit=1000, type="application/x-www-form-urlencoded", verify.

5  express.Router([options])
  Creates router. Options: caseSensitive=false, mergeParams=false, strict=false. Use router.get/post etc.

6  express.static(root, [options])
  Serves static. Options with defaults: dotfiles=undefined, etag=true, extensions=false, fallthrough=true, immutable=false, index="index.html", lastModified=true, maxAge=0, redirect=true, setHeaders.

7  Routing methods
  app.get/post/put/delete/patch/all(path, ...handlers). app.all applies to all verbs. Use wildcard patterns.

8  app.listen(...)
  Calls http.createServer(app).listen. Accepts path or port,host,backlog,callback.

## Supplementary Details
Version: Express v4.x requires Node.js >=0.10. express.json and express.urlencoded require body-parser v1. Use gzip/deflate with inflate=true. Type matching uses type-is library: strings, arrays or custom fn(req). verify(req,res,buf,encoding) allows aborting by throw. Router supports nested params with mergeParams. Static serves fallthrough on missing files; set fallthrough=false to send errors. dotfiles: allow,deny,ignore. Immutable directive requires maxAge>0. For directory index disable index or set index=false. setHeaders must be sync. app.listen returns http.Server for both HTTP and UNIX sockets.

## Reference Details
express.json(options) => middleware
  options.inflate: boolean = true
  options.limit: string|number = "100kb"
  options.reviver: Function|null = null
  options.strict: boolean = true
  options.type: string|string[]|Function = "application/json"
  options.verify(req,res,buf,encoding): void
Example:
  app.use(express.json({limit:'2mb', verify:function(req,res,buf){ if(buf.length>1e6) throw Error('Payload too large'); }}));

express.raw(options) => middleware
  options.inflate: boolean = true
  options.limit: string|number = "100kb"
  options.type: string|string[]|Function = "application/octet-stream"
  options.verify(req,res,buf,encoding)
Example:
  app.post('/upload', express.raw({type:'application/octet-stream'}), function(req,res){ fs.writeFileSync('/tmp/data',req.body); res.sendStatus(200); });

express.text(options) => middleware
  options.defaultCharset: string = "utf-8"
  options.inflate, limit, type, verify as above
Example:
  app.use(express.text({type:'text/*'}));

express.urlencoded(options) => middleware
  options.extended: boolean = true
  options.inflate: boolean = true
  options.limit: string|number = "100kb"
  options.parameterLimit: number = 1000
  options.type: string|string[]|Function = "application/x-www-form-urlencoded"
  options.verify
Example:
  app.use(express.urlencoded({extended:false, parameterLimit:5000}));

express.Router(options) => Router
  options.caseSensitive: boolean = false
  options.mergeParams: boolean = false
  options.strict: boolean = false
Example:
  var router = express.Router({mergeParams:true});

express.static(root,options) => middleware
  options.dotfiles: 'allow'|'deny'|'ignore'
  options.etag: boolean = true
  options.extensions: string[]|false = false
  options.fallthrough: boolean = true
  options.immutable: boolean = false
  options.index: string|false = "index.html"
  options.lastModified: boolean = true
  options.maxAge: number|string = 0
  options.redirect: boolean = true
  options.setHeaders(res,path,stat)
Example:
  app.use(express.static('public',{maxAge:'1d', immutable:true, setHeaders:function(res,path){ res.set('X-Served-By','Express'); }}));

Routing:
  app.get(path,handlers)
  app.post,path, handlers
  app.put,path, handlers
  app.delete,path, handlers
  app.all(path,handlers)
Examples:
  app.all('/api/*', checkAuth, loadUser);
  app['m-search']('/',function(req,res){res.send('search');});

app.listen(port,host,backlog,callback)
  returns http.Server
Example:
  var server = app.listen(3000,'127.0.0.1',511,function(){console.log('Listening');});

Best Practices:
  Validate req.body before use.
  Use helmet and compression for security and performance.
  Mount static with reverse proxy for caching.
  Use router.param for pre-loading resources.

Troubleshooting:
  JSON SyntaxError: catch with error handler after express.json.
    app.use(function(err,req,res,next){ if(err.type==='entity.parse.failed') res.status(400).send('Bad JSON'); });
  Static 404 fallthrough: set fallthrough=false to handle missing files.
  Large payloads: increase limit option, monitor req.socket.bytesRead.
Commands:
  curl -X POST -H "Content-Type: application/json" -d '{"a":1}' http://localhost:3000/data
Expected: 200 OK or 400 on invalid.



## Information Dense Extract
express.json opts:{inflate=true,limit=100kb,reviver=null,strict=true,type='application/json',verify}; express.raw opts:{inflate=true,limit=100kb,type='application/octet-stream',verify}; express.text opts:{defaultCharset='utf-8',inflate=true,limit=100kb,type='text/plain',verify}; express.urlencoded opts:{extended=true,inflate=true,limit=100kb,parameterLimit=1000,type='application/x-www-form-urlencoded',verify}; express.Router opts:{caseSensitive=false,mergeParams=false,strict=false}; express.static root+opts:{dotfiles,etag=true,extensions=false,fallthrough=true,immutable=false,index='index.html',lastModified=true,maxAge=0,redirect=true,setHeaders}; routing: app.METHOD(path,...), app.all; app.listen([...],callback)->http.Server.

## Sanitised Extract
Table of Contents:
1  express.json
2  express.raw
3  express.text
4  express.urlencoded
5  express.Router
6  express.static
7  Routing methods
8  app.listen

1  express.json([options])
  Function parses JSON bodies. Signature: express.json({inflate,limit,reviver,strict,type,verify}). Default inflate=true, limit='100kb', reviver=null, strict=true, type='application/json'. Use in middleware chain: app.use(express.json({limit:'1mb'})).

2  express.raw([options])
  Parses raw Buffer bodies. Signature: express.raw({inflate,limit,type,verify}). Default type='application/octet-stream'.

3  express.text([options])
  Parses text bodies. Options: defaultCharset='utf-8', inflate=true, limit='100kb', type='text/plain', verify.

4  express.urlencoded([options])
  Parses URL-encoded. Options: extended=true (qs), inflate=true, limit='100kb', parameterLimit=1000, type='application/x-www-form-urlencoded', verify.

5  express.Router([options])
  Creates router. Options: caseSensitive=false, mergeParams=false, strict=false. Use router.get/post etc.

6  express.static(root, [options])
  Serves static. Options with defaults: dotfiles=undefined, etag=true, extensions=false, fallthrough=true, immutable=false, index='index.html', lastModified=true, maxAge=0, redirect=true, setHeaders.

7  Routing methods
  app.get/post/put/delete/patch/all(path, ...handlers). app.all applies to all verbs. Use wildcard patterns.

8  app.listen(...)
  Calls http.createServer(app).listen. Accepts path or port,host,backlog,callback.

## Original Source
Express.js API Reference
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS

# Express.js API Reference (Retrieved: 2024-06-16)
Data Size: 27220755 bytes

# express.json([options])
Signature:
  express.json(options?: {
    inflate?: boolean;
    limit?: number|string;
    reviver?: Function|null;
    strict?: boolean;
    type?: string|string[]|((req: any) => boolean);
    verify?: (req: any, res: any, buf: Buffer, encoding: string) => void;
  }): (req: any, res: any, next: Function) => void

Parses JSON bodies where Content-Type matches options.type. Populates req.body or {}. Throws on invalid JSON or verify failure.

Options:
  inflate     Boolean    true       handle deflate/gzip
  limit       Mixed      "100kb"   max body size
  reviver     Function   null       JSON.parse reviver
  strict      Boolean    true       accept only arrays/objects
  type        Mixed      "application/json"
  verify      Function   undefined  fn(req,res,buf,encoding)

# express.raw([options])
Signature:
  express.raw(options?: {
    inflate?: boolean;
    limit?: number|string;
    type?: string|string[]|((req: any) => boolean);
    verify?: (req: any, res: any, buf: Buffer, encoding: string) => void;
  }): (req: any, res: any, next: Function) => void

Parses bodies into Buffer where Content-Type matches options.type. Populates req.body (Buffer) or {}.

Options:
  inflate Boolean   true     handle deflate/gzip
  limit   Mixed     "100kb" max body size
  type    Mixed     "application/octet-stream"
  verify  Function  undefined

# express.text([options])
Signature:
  express.text(options?: {
    defaultCharset?: string;
    inflate?: boolean;
    limit?: number|string;
    type?: string|string[]|((req: any) => boolean);
    verify?: (req: any, res: any, buf: Buffer, encoding: string) => void;
  }): (req: any, res: any, next: Function) => void

Parses bodies into string where Content-Type matches options.type. Populates req.body (string) or {}.

Options:
  defaultCharset String  "utf-8"
  inflate        Boolean true
  limit          Mixed   "100kb"
  type           Mixed   "text/plain"
  verify         Function undefined

# express.urlencoded([options])
Signature:
  express.urlencoded(options?: {
    extended?: boolean;
    inflate?: boolean;
    limit?: number|string;
    parameterLimit?: number;
    type?: string|string[]|((req: any) => boolean);
    verify?: (req: any, res: any, buf: Buffer, encoding: string) => void;
  }): (req: any, res: any, next: Function) => void

Parses URL-encoded bodies where Content-Type matches options.type. Populates req.body (object) or {}.

Options:
  extended       Boolean  true      qs vs querystring
  inflate        Boolean  true
  limit          Mixed    "100kb"
  parameterLimit Number   1000      max params
  type           Mixed    "application/x-www-form-urlencoded"
  verify         Function undefined

# express.Router([options])
Signature:
  express.Router(options?: {
    caseSensitive?: boolean;
    mergeParams?: boolean;
    strict?: boolean;
  }): Router

Options:
  caseSensitive Boolean false  treat /Foo and /foo distinct
  mergeParams   Boolean false  inherit parent req.params
  strict        Boolean false  trailing slash difference

# express.static(root, [options])
Signature:
  express.static(root: string, options?: {
    dotfiles?: "allow"|"deny"|"ignore";
    etag?: boolean;
    extensions?: string[]|false;
    fallthrough?: boolean;
    immutable?: boolean;
    index?: string|false;
    lastModified?: boolean;
    maxAge?: number|string;
    redirect?: boolean;
    setHeaders?: (res: any, path: string, stat: any) => void;
  }): (req: any, res: any, next: Function) => void

Options:
  dotfiles     String   undefined  "allow"|"deny"|"ignore"
  etag         Boolean  true       send weak ETag
  extensions   Mixed    false      ['html','htm'] fallback
  fallthrough  Boolean  true       next() on errors
  immutable    Boolean  false      Cache-Control immutable
  index        Mixed    "index.html"
  lastModified Boolean  true       set Last-Modified header
  maxAge       Number   0          ms or "1d"
  redirect     Boolean  true       slash redirect
  setHeaders   Function             fn(res,path,stat)

# Routing Methods: app.METHOD(path, ...)
Variants: checkout, copy, delete, get, head, lock, merge, mkactivity, mkcol, move, m-search, notify, options, patch, post, purge, put, report, search, subscribe, trace, unlock, unsubscribe

# app.listen([port[, host[, backlog]]], [callback])
Alias for http.Server.listen. Returns http.Server.

---
Attribution: Express 4.x API Reference, expressjs.com/en/4x/api.html

## Attribution
- Source: Express.js API Reference
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-10T20:58:28.425Z
- Data Size: 27220755 bytes
- Links Found: 21728

## Retrieved
2025-05-10

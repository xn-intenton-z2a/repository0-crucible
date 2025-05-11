library/READLINE.md
# library/READLINE.md
# READLINE

## Crawl Summary
createInterface(options) required input:Readable, optional output:Writable, completer, terminal auto-detect, history array, historySize number, removeHistoryDuplicates boolean, prompt string, crlfDelay ms, escapeCodeTimeout ms, tabSize int, signal AbortSignal
InterfaceConstructor methods: close(), dispose(), pause(), resume(), setPrompt(), getPrompt(), prompt(preserveCursor), write(data,key), async iterator(), line,string cursor,number, getCursorPos()
Events: 'close','line','history','pause','resume','SIGCONT','SIGINT','SIGTSTP'
Promises API: readlinePromises.Interface.question(query,options):Promise<string>, Readline class with clearLine(dir), clearScreenDown(), cursorTo(x,y), moveCursor(dx,dy), commit(), rollback(), createInterface(options)
Callback API: readline.Interface.question(query,options,callback), static clearLine, clearScreenDown, cursorTo, moveCursor, emitKeypressEvents
Completer signature: (line)->[matches[],substring], async supported
Examples: Tiny CLI, file stream line-by-line via for await or 'line' event
TTY keybindings table with keys and actions

## Normalised Extract
Table of Contents
1 Interface Creation
2 InterfaceConstructor Methods
3 Events
4 Promises API Methods
5 Callback API Methods
6 Completer Function
7 Examples

1 Interface Creation
createInterface options:
 input: stream.Readable (required)
 output: stream.Writable (optional)
 completer: Function(line) -> [Array<string>, string]
 terminal: boolean, default output.isTTY
 history: string[], default []
 historySize: number, default 30
 removeHistoryDuplicates: boolean, default false
 prompt: string, default '> '
 crlfDelay: number >=100, default 100
 escapeCodeTimeout: number, default 500
 tabSize: integer >=1, default 8
 signal: AbortSignal

2 InterfaceConstructor Methods
 close(): void
 [Symbol.dispose](): void alias
 pause(): void
 resume(): void
 setPrompt(prompt:string): void
 getPrompt(): string
 prompt(preserveCursor?:boolean): void
 write(data:string|null, key?:{ctrl?:boolean,meta?:boolean,shift?:boolean,name:string}): void
 [Symbol.asyncIterator](): AsyncIterator<string>
 line: string
 cursor: number|undefined
 getCursorPos(): {rows:number, cols:number}

3 Events
 'close'()
 'line'(input:string)
 'history'(history:string[])
 'pause'()
 'resume'()
 'SIGCONT'()
 'SIGINT'()
 'SIGTSTP'()

4 Promises API Methods
 readlinePromises.Interface.question(query:string, options?:{signal?:AbortSignal}): Promise<string>
 new readlinePromises.Readline(stream:Writable, options?:{autoCommit?:boolean})
   clearLine(dir:number): this
   clearScreenDown(): this
   cursorTo(x:number,y?:number): this
   moveCursor(dx:number,dy:number): this
   commit(): Promise<void>
   rollback(): this
 createInterface(options): readlinePromises.Interface

5 Callback API Methods
 readline.Interface.question(query:string, options?:{signal?:AbortSignal}, callback(answer:string)): void
 readline.clearLine(stream:Writable, dir:number, callback?:(err?:Error)=>void): boolean
 readline.clearScreenDown(stream:Writable, callback?:(err?:Error)=>void): boolean
 readline.cursorTo(stream:Writable, x:number, y?:number, callback?:(err?:Error)=>void): boolean
 readline.moveCursor(stream:Writable, dx:number, dy:number, callback?:(err?:Error)=>void): boolean
 readline.emitKeypressEvents(stream:Readable, interface?:InterfaceConstructor): void

6 Completer Function
 signature: Function(linePartial:string) -> [Array<string>, string]
 supports Promise return or async function

7 Examples
 Tiny CLI: createInterface, prompt, on 'line', on 'close'
 File stream line-by-line: createReadStream+createInterface(crlfDelay:Infinity), for await, or on 'line'

## Supplementary Details
Configuration defaults and effects
 terminal detection: output.isTTY on instantiation
 historySize=0 disables history caching
 crlfDelay coerced to >=100; Infinity to treat CR+LF as one newline
 escapeCodeTimeout controls key sequence disambiguation in ms
 tabSize sets tab width in spaces
 signal aborts question or closes interface
 Implementation steps
 1 import required module variant
 2 create interface with explicit options
 3 attach listeners or use question/async iterator
 4 close or dispose to terminate
 5 optional process.stdin.unref() to exit on EOF


## Reference Details
API Signatures and Full Examples

readline.createInterface(options) -> Interface
 options.input:Readable  required
 options.output:Writable
 options.completer:Function(line)->[Array<string>,string]
 options.terminal:boolean default output.isTTY
 options.history:Array<string> default []
 options.historySize:number default 30
 options.removeHistoryDuplicates:boolean default false
 options.prompt:string default '> '
 options.crlfDelay:number>=100 default 100
 options.escapeCodeTimeout:number default 500
 options.tabSize:number>=1 default 8
 options.signal:AbortSignal

InterfaceConstructor Methods
 close():void
 [Symbol.dispose]():void
 pause():void
 resume():void
 setPrompt(prompt:string):void
 getPrompt():string
 prompt(preserveCursor?:boolean):void
 write(data:string|null,key?:{ctrl?:boolean,meta?:boolean,shift?:boolean,name:string}):void
 [Symbol.asyncIterator]():AsyncIterator<string>
 getCursorPos():{rows:number,cols:number}
 Properties
 line:string
 cursor:number|undefined

Events
 on('close',()=>void)
 on('line',(input:string)=>void)
 on('history',(history:string[])=>void)
 on('pause',()=>void)
 on('resume',()=>void)
 on('SIGCONT',()=>void)
 on('SIGINT',()=>void)
 on('SIGTSTP',()=>void)

Promises API
 readlinePromises.createInterface(options) -> readlinePromises.Interface
 rl.question(query:string,options?{signal:AbortSignal}):Promise<string>
 new Readline(stream:Writable,options?{autoCommit?:boolean})
   clearLine(dir:number):this
   clearScreenDown():this
   cursorTo(x:number,y?:number):this
   moveCursor(dx:number,dy:number):this
   commit():Promise<void>
   rollback():this

Callback API
 rl.question(query:string,options?{signal:AbortSignal},callback(answer:string)):void
 readline.clearLine(stream:Writable,dir:number,callback?:(err?:Error)=>void):boolean
 readline.clearScreenDown(stream:Writable,callback?:(err?:Error)=>void):boolean
 readline.cursorTo(stream:Writable,x:number,y?:number,callback?:(err?:Error)=>void):boolean
 readline.moveCursor(stream:Writable,dx:number,dy:number,callback?:(err?:Error)=>void):boolean
 readline.emitKeypressEvents(stream:Readable,interface?:InterfaceConstructor):void

Complete Examples
// Tiny CLI
import { createInterface } from 'node:readline'
import { stdin, stdout } from 'node:process'
const rl = createInterface({ input: stdin, output: stdout, prompt: 'OHAI> ' })
rl.prompt()
rl.on('line',(line)=>{
  switch(line.trim()){case 'hello':console.log('world!');break;default:console.log(`heard '${line.trim()}'`)}
  rl.prompt()
}).on('close',()=>{
  console.log('exit');
  process.exit(0)
})

// File stream line-by-line with async iterator
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
async function processFile(){
  const rl = createInterface({ input: createReadStream('large.txt'), crlfDelay: Infinity })
  for await(const line of rl){ console.log(`Line: ${line}`) }
}

// Troubleshooting
// Missing EOF exit: call process.stdin.unref()
// Question timeout: pass AbortSignal.timeout(ms)



## Information Dense Extract
createInterface(options{input:Readable,output:Writable,completer:Function,terminal:boolean,history:Array<string>,historySize:number,removeHistoryDuplicates:boolean,prompt:string,crlfDelay:number,escapeCodeTimeout:number,tabSize:number,signal:AbortSignal}):InterfaceConstructor; methods close(),dispose(),pause(),resume(),setPrompt(string),getPrompt():string,prompt(bool),write(string| null,{ctrl,meta,shift,name}),asyncIterator():AsyncIterator<string>,getCursorPos():{rows,cols}; properties line:string,cursor:number; events 'close','line'(string),'history'(string[]),'pause','resume','SIGCONT','SIGINT','SIGTSTP'; Promises API: Interface.question(string,{signal}):Promise<string>, Readline(stream,{autoCommit}):clearLine(dir):this,clearScreenDown():this,cursorTo(x,y):this,moveCursor(dx,dy):this,commit():Promise<void>,rollback():this; Callback API: Interface.question(string,{signal},callback:string=>void),static clearLine(stream,dir,callback):boolean,clearScreenDown(stream,callback):boolean,cursorTo(stream,x,y,callback):boolean,moveCursor(stream,dx,dy,callback):boolean,emitKeypressEvents(stream,interface):void; Examples: Tiny CLI, file line-by-line with for-await; keybindings Ctrl+C,D,U,K,A/E,B/F,L,P/N; troubleshooting: use process.stdin.unref(), AbortSignal.timeout(ms).

## Sanitised Extract
Table of Contents
1 Interface Creation
2 InterfaceConstructor Methods
3 Events
4 Promises API Methods
5 Callback API Methods
6 Completer Function
7 Examples

1 Interface Creation
createInterface options:
 input: stream.Readable (required)
 output: stream.Writable (optional)
 completer: Function(line) -> [Array<string>, string]
 terminal: boolean, default output.isTTY
 history: string[], default []
 historySize: number, default 30
 removeHistoryDuplicates: boolean, default false
 prompt: string, default '> '
 crlfDelay: number >=100, default 100
 escapeCodeTimeout: number, default 500
 tabSize: integer >=1, default 8
 signal: AbortSignal

2 InterfaceConstructor Methods
 close(): void
 [Symbol.dispose](): void alias
 pause(): void
 resume(): void
 setPrompt(prompt:string): void
 getPrompt(): string
 prompt(preserveCursor?:boolean): void
 write(data:string|null, key?:{ctrl?:boolean,meta?:boolean,shift?:boolean,name:string}): void
 [Symbol.asyncIterator](): AsyncIterator<string>
 line: string
 cursor: number|undefined
 getCursorPos(): {rows:number, cols:number}

3 Events
 'close'()
 'line'(input:string)
 'history'(history:string[])
 'pause'()
 'resume'()
 'SIGCONT'()
 'SIGINT'()
 'SIGTSTP'()

4 Promises API Methods
 readlinePromises.Interface.question(query:string, options?:{signal?:AbortSignal}): Promise<string>
 new readlinePromises.Readline(stream:Writable, options?:{autoCommit?:boolean})
   clearLine(dir:number): this
   clearScreenDown(): this
   cursorTo(x:number,y?:number): this
   moveCursor(dx:number,dy:number): this
   commit(): Promise<void>
   rollback(): this
 createInterface(options): readlinePromises.Interface

5 Callback API Methods
 readline.Interface.question(query:string, options?:{signal?:AbortSignal}, callback(answer:string)): void
 readline.clearLine(stream:Writable, dir:number, callback?:(err?:Error)=>void): boolean
 readline.clearScreenDown(stream:Writable, callback?:(err?:Error)=>void): boolean
 readline.cursorTo(stream:Writable, x:number, y?:number, callback?:(err?:Error)=>void): boolean
 readline.moveCursor(stream:Writable, dx:number, dy:number, callback?:(err?:Error)=>void): boolean
 readline.emitKeypressEvents(stream:Readable, interface?:InterfaceConstructor): void

6 Completer Function
 signature: Function(linePartial:string) -> [Array<string>, string]
 supports Promise return or async function

7 Examples
 Tiny CLI: createInterface, prompt, on 'line', on 'close'
 File stream line-by-line: createReadStream+createInterface(crlfDelay:Infinity), for await, or on 'line'

## Original Source
Node.js Readline
https://nodejs.org/api/readline.html

## Digest of READLINE

# Readline

Retrieved: 2024-06-15
Stability: 2 - Stable
Source Code: lib/readline.js

# Module Import

Promise-based APIs
import * as readline from 'node:readline/promises'
const readline = require('node:readline/promises')

Callback APIs
import * as readline from 'node:readline'
const readline = require('node:readline')

# Class: InterfaceConstructor

Added in: v0.1.104
Extends: EventEmitter
Constructor: created via createInterface(options)
Options parameters:
  input            stream.Readable           required
  output           stream.Writable           optional
  completer        Function                  (line) => [matches Array<string>, substring string]
  terminal         boolean                   default: output.isTTY auto-detect
  history          string[]                  default: []
  historySize      number                    default: 30
  removeHistoryDuplicates boolean              default: false
  prompt           string                    default: "> "
  crlfDelay        number                    default: 100 (min 100, Infinity allowed)
  escapeCodeTimeout number                   default: 500
  tabSize          integer                   minimum:1 default: 8
  signal           AbortSignal               optional

# Events

'close'       emitted on rl.close(), input 'end', Ctrl+D, or Ctrl+C without SIGINT listener
'line'        listener input:string on end-of-line markers (\n,\r,\r\n)
'history'     listener history:string[] on history change
'pause'       emitted on input.pause() or SIGCONT
'resume'      emitted on rl.resume()
'SIGCONT'     on fg after SIGTSTP, listener(), Windows unsupported
'SIGINT'      on Ctrl+C, listener(), fallback to 'pause' if no listener
'SIGTSTP'     on Ctrl+Z, listener(), Windows unsupported

# Methods on InterfaceConstructor instance

rl.close(): void               closes interface, emits 'close'
rl[Symbol.dispose](): void     alias for rl.close()
rl.pause(): void               pauses input stream
rl.resume(): void              resumes input stream
rl.setPrompt(prompt:string): void    sets prompt string
rl.getPrompt(): string              returns current prompt
rl.prompt(preserveCursor?:boolean): void  writes prompt, resumes input, preserveCursor default false
rl.write(data:string|null, key?:{ctrl?:boolean,meta?:boolean,shift?:boolean,name:string}): void
                                  writes data or simulated key sequence to input
rl[Symbol.asyncIterator](): AsyncIterator<string>  iterate lines via for await
rl.line: string                 current processed input (pre-line event)
rl.cursor: number|undefined     cursor index in rl.line
rl.getCursorPos(): {rows:number,cols:number}  real cursor position including wrapping

# Promises API

Class: readlinePromises.Interface extends InterfaceConstructor
rl.question(query:string, options?:{signal?:AbortSignal}): Promise<string>

Class: readlinePromises.Readline
new Readline(stream:stream.Writable, options?:{autoCommit?:boolean})
rl.clearLine(dir:number): this         dir:-1 left,0 full,1 right
rl.clearScreenDown(): this
rl.cursorTo(x:number,y?:number): thisl.moveCursor(dx:number,dy:number): this
rl.commit(): Promise<void>         applies pending actions
rl.rollback(): this               discards pending actions

readlinePromises.createInterface(options): readlinePromises.Interface
options same as InterfaceConstructor

# Callback API

Class: readline.Interface extends InterfaceConstructor
rl.question(query:string, options?:{signal?:AbortSignal},callback:(answer:string)=>void): void

Static functions:
readline.clearLine(stream:Writable,dir:number,callback?:(err?:Error)=>void): boolean
readline.clearScreenDown(stream:Writable,callback?:(err?:Error)=>void): boolean
readline.createInterface(options): readline.Interface  options as above
readline.cursorTo(stream:Writable,x:number,y?:number,callback?:(err?:Error)=>void): boolean
readline.moveCursor(stream:Writable,dx:number,dy:number,callback?:(err?:Error)=>void): boolean
readline.emitKeypressEvents(stream:Readable,interface?:InterfaceConstructor): void

# Examples

Tiny CLI
import { createInterface } from 'node:readline'
const rl = createInterface({input:process.stdin,output:process.stdout,prompt:'> '})
rl.prompt()
rl.on('line',(line)=>{ switch(line.trim()){case 'hello':console.log('world!');break;default:console.log(`heard '${line.trim()}'`);}
rl.prompt()}).on('close',()=>process.exit(0))

Read file line-by-line (async iterator)
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
async function proc(){
  const rl = createInterface({input:createReadStream('in.txt'),crlfDelay:Infinity})
  for await(const line of rl){console.log(line)}
}

# TTY Keybindings
Ctrl+C SIGINT or close
Ctrl+D delete or close on empty input
Ctrl+U delete to line start
Ctrl+K delete to line end
Ctrl+A/E move to start/end
Ctrl+B/F move left/right
Ctrl+L clear screen
Ctrl+P/N history prev/next


## Attribution
- Source: Node.js Readline
- URL: https://nodejs.org/api/readline.html
- License: Node.js License
- Crawl Date: 2025-05-10T17:58:40.707Z
- Data Size: 4221054 bytes
- Links Found: 3299

## Retrieved
2025-05-10
library/EJS_FEATURES.md
# library/EJS_FEATURES.md
# EJS_FEATURES

## Crawl Summary
EJS evaluates plain JavaScript in `<% %>`, compiles templates to JS functions via `compile`, caches compiled functions keyed by filename when `cache=true`, and surfaces errors as JS `Error` with filename and line number.

## Normalised Extract
Table of Contents
1. Scriptlet Tags
2. Template Compilation
3. Caching Mechanism
4. Error Handling

1. Scriptlet Tags
Use `<% code %>` to execute JS without output. Use `<%= expr %>` to output HTML-escaped `expr`. Use `<%- expr %>` to output unescaped `expr`.

2. Template Compilation
Call `const fn = ejs.compile(templateString, {cache, filename, delimiter})`. `fn(data)` returns the rendered string.

3. Caching Mechanism
Set `options.cache=true` and provide `options.filename`. Compiled functions are stored in `ejs.cache` under the filename key. Default `cache=false` in development, `true` in production environments when `NODE_ENV=production`.

4. Error Handling
Rendering errors throw `Error` with message format: `<message> at <filename>:<line>:<column>`. Enable `DEBUG=ejs` to output stack traces and caching logs to console.


## Supplementary Details
Configuration Options
- cache: boolean (default false) — enable caching of compiled templates
- filename: string — identifier for caching and includes
- root: string|array — base path(s) for resolving includes
- delimiter: string (default '%') — change scriptlet tag delimiter

Implementation Steps
1. Install: `npm install ejs`
2. Import: `const ejs = require('ejs')`
3. Compile:
   ```js
   const template = '<h1>Hello <%= name %></h1>';
   const fn = ejs.compile(template, {cache: true, filename: 'greeting.ejs'});
   ```
4. Render:
   ```js
   const output = fn({name: 'Alice'});
   ```
5. Use in Express:
   ```js
   app.set('view engine', 'ejs');
   app.get('/', (req, res) => res.render('index', {user: req.user}));
   ```


## Reference Details
API Specifications

1. ejs.render(template: string, data?: object, options?: RenderOptions, callback?: (err: Error, str: string) => void): string|void
   - Returns rendered string when no callback provided.
   - `template`: template string or filename when used with `renderFile`.
   - `data`: object with keys for interpolation.
   - `options`:
     - `cache`: boolean — enable function caching
     - `filename`: string — template identifier
     - `delimiter`: string — scriptlet delimiter
     - `root`: string|array — include search paths
   - `callback`: optional node-style callback

2. ejs.compile(template: string, options?: CompileOptions): (data: object) => string
   - Returns a render function.
   - Options as above.

3. ejs.renderFile(path: string, data?: object, options?: RenderFileOptions, callback: (err: Error, str: string) => void): void
   - Asynchronously reads file at `path`, compiles and renders.
   - `options.cache`: if true, caches compiled function by resolved path.

Best Practices
- Use `ejs.cache=true` in production to minimize compile overhead.
- Always provide `filename` when calling `compile` or `renderFile` for accurate error reporting and caching.
- Sanitize user input manually when using `<%- %>` to avoid XSS.

Troubleshooting
- Error: "Could not find include" — Verify `options.root` and `options.filename` match actual file system paths.
- To debug caching: set `DEBUG=ejs` environment variable and observe `cache miss` and `cache hit` logs.
- Template syntax errors: error stack shows exact line and column in the template file.


## Information Dense Extract
EJS uses `<% %>` tags for JS code, `<%= %>` for escaped output, `<%- %>` for raw output. Compile with `ejs.compile(str, {cache, filename, delimiter, root}) => fn(data)`. Render with `ejs.render(str, data, opts)` or `ejs.renderFile(path, data, opts, cb)`. Enable `cache` plus `filename` to store in `ejs.cache`. Errors throw JS Error with `<filename>:<line>:<col>`. Use `DEBUG=ejs` for detailed logs. Default delimiter '%'.

## Sanitised Extract
Table of Contents
1. Scriptlet Tags
2. Template Compilation
3. Caching Mechanism
4. Error Handling

1. Scriptlet Tags
Use '<% code %>' to execute JS without output. Use '<%= expr %>' to output HTML-escaped 'expr'. Use '<%- expr %>' to output unescaped 'expr'.

2. Template Compilation
Call 'const fn = ejs.compile(templateString, {cache, filename, delimiter})'. 'fn(data)' returns the rendered string.

3. Caching Mechanism
Set 'options.cache=true' and provide 'options.filename'. Compiled functions are stored in 'ejs.cache' under the filename key. Default 'cache=false' in development, 'true' in production environments when 'NODE_ENV=production'.

4. Error Handling
Rendering errors throw 'Error' with message format: '<message> at <filename>:<line>:<column>'. Enable 'DEBUG=ejs' to output stack traces and caching logs to console.

## Original Source
EJS
https://ejs.co/#docs

## Digest of EJS_FEATURES

# EJS BASIC FEATURES

## Use Plain JavaScript
EJS processes templates by evaluating JavaScript inside scriptlet tags. Supported tags:
- `<% code %>`: execute code without output
- `<%= expression %>`: execute and output HTML-escaped result
- `<%- expression %>`: execute and output unescaped result

## Simple Syntax
Embed JavaScript directly in HTML without preprocessing. No custom template language—use standard JS expressions and control flow.

## Speedy Execution
Compiled templates produce JavaScript functions. Default behavior:
- `ejs.compile(templateString, options) -> RenderFunction`
- Options:
  - `cache` (boolean, default false): enable in-memory caching of compiled functions
  - `filename` (string): key for cache, required to use caching and includes

Compiled functions are stored in `ejs.cache` keyed by `filename` when `cache` is true.

## Easy Debugging
All template errors are thrown as standard JavaScript `Error` objects. Error messages include template `filename` and source `line`:
- Example error: `Error: Unexpected token % in "<%= user.name %>" at user.ejs:3:12`
- Use environment variable `DEBUG=ejs` to log stack traces and caching operations.


## Attribution
- Source: EJS
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-10T20:36:46.602Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-10
library/EXPRESS_MIDDLEWARE.md
# library/EXPRESS_MIDDLEWARE.md
# EXPRESS_MIDDLEWARE

## Crawl Summary
express.json parses JSON bodies into req.body with options inflate,limit,reviver,strict,type,verify; express.urlencoded parses URL-encoded payloads with extended,inflate,limit,parameterLimit,type,verify; express.raw parses Buffer bodies with inflate,limit,type,verify; express.text parses text bodies with defaultCharset,inflate,limit,type,verify; express.static serves files with options dotfiles,etag,extensions,fallthrough,immutable,index,lastModified,maxAge,redirect,setHeaders; express.Router creates route containers with caseSensitive,mergeParams,strict

## Normalised Extract
Table of Contents
1. express.json
2. express.urlencoded
3. express.raw
4. express.text
5. express.static
6. express.Router

1. express.json
Signature: express.json(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
reviver: Function|null
strict: Boolean (true)
type: String|Array|Function ('application/json')
verify: Function|undefined
Behavior: Parses JSON payloads where Content-Type matches type into req.body object, supports gzip/deflate.

2. express.urlencoded
Signature: express.urlencoded(options)
Options:
extended: Boolean (true)
inflate: Boolean (true)
limit: Number|String ('100kb')
parameterLimit: Number (1000)
type: String|Array|Function ('application/x-www-form-urlencoded')
verify: Function|undefined
Behavior: Parses urlencoded payloads into req.body as object or array (qs if extended true).

3. express.raw
Signature: express.raw(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('application/octet-stream')
verify: Function|undefined
Behavior: Parses all bodies into Buffer at req.body.

4. express.text
Signature: express.text(options)
Options:
defaultCharset: String ('utf-8')
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('text/plain')
verify: Function|undefined
Behavior: Parses bodies into string at req.body.

5. express.static
Signature: express.static(root,options)
Options:
dotfiles: 'allow'|'deny'|'ignore'|undefined
etag: Boolean (true)
extensions: Array|false (false)
fallthrough: Boolean (true)
immutable: Boolean (false)
index: String|false ('index.html')
lastModified: Boolean (true)
maxAge: Number|String (0)
redirect: Boolean (true)
setHeaders: Function(res,path,stat)
Behavior: Serves static assets, on miss calls next(), supports caching headers.

6. express.Router
Signature: express.Router(options)
Options:
caseSensitive: Boolean (false)
mergeParams: Boolean (false)
strict: Boolean (false)
Behavior: Returns modular router to mount routes and middleware.

## Supplementary Details
Implementation Steps:
1. Import express:
   var express = require('express')
   var app = express()
2. Add body parsers before routes:
   app.use(express.json({limit:'1mb'}))
   app.use(express.urlencoded({extended:false,parameterLimit:500}))
3. Serve static files with custom headers:
   app.use(express.static('public',{maxAge:'1d',setHeaders:function(res,path,stat){res.set('X-Timestamp',Date.now())}}))
4. Create and mount router:
   var router = express.Router({mergeParams:true,strict:true})
   router.get('/items/:id',handler)
   app.use('/api',router)
5. Start server:
   app.listen(3000)

Validation:
- Always check req.body type before use:
   if(Buffer.isBuffer(req.body)){ /* raw */ }
   else if(typeof req.body === 'string'){ /* text */ }
- Use verify option to reject bad payload:
   express.json({verify:function(req,res,buf){ if(buf.length>1e6) throw new Error('Too large') }})

## Reference Details
express.json(options) -> Middleware
Parameters:
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.reviver: Function|null
- options.strict: Boolean default true
- options.type: String|Array|Function default 'application/json'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.urlencoded(options) -> Middleware
Parameters:
- options.extended: Boolean default true
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.parameterLimit: Number default 1000
- options.type: String|Array|Function default 'application/x-www-form-urlencoded'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.raw(options) -> Middleware
Parameters:
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.type: String|Array|Function default 'application/octet-stream'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.text(options) -> Middleware
Parameters:
- options.defaultCharset: String default 'utf-8'
- options.inflate: Boolean default true
- options.limit: Number|String default '100kb'
- options.type: String|Array|Function default 'text/plain'
- options.verify: Function(req,res,buf,encoding)
Returns: Function(req,res,next)

express.static(root,options) -> Middleware
Parameters:
- root: String directory path
- options.dotfiles: 'allow'|'deny'|'ignore'|undefined
- options.etag: Boolean default true
- options.extensions: Array|false default false
- options.fallthrough: Boolean default true
- options.immutable: Boolean default false
- options.index: String|false default 'index.html'
- options.lastModified: Boolean default true
- options.maxAge: Number|String default 0
- options.redirect: Boolean default true
- options.setHeaders: Function(res,path,stat)
Returns: Function(req,res,next)

express.Router(options) -> Router
Parameters:
- options.caseSensitive: Boolean default false
- options.mergeParams: Boolean default false
- options.strict: Boolean default false
Returns: Router object with methods .get,.post,.use,.param

Examples:
var express = require('express')
var app = express()
app.use(express.json({limit:'500kb'}))
app.post('/data',function(req,res){res.json(req.body)})
app.use(express.static('public',{immutable:true,maxAge:'7d'}))

Best Practices:
- Place body parsers before routes
- Limit payload size to prevent DOS
- Validate req.body shape explicitly
- Use mergeParams when nesting routers with params
- Set maxAge and immutable for immutable assets

Troubleshooting:
Command: curl -X POST http://localhost:3000/data -H 'Content-Type: application/json' -d '{"a":1}'
Expected: {"a":1}
Error: payload too large -> increase limit or send smaller body
Command: curl http://localhost:3000/missing.png
Expected: 404 from next() or custom handler
Fix: ensure file exists or configure fallthrough=false to get err in next(err)

## Information Dense Extract
json(options:inflate=true,limit='100kb',reviver=null,strict=true,type='application/json',verify) -> middleware parses JSON->req.body; urlencoded(options:extended=true,inflate=true,limit='100kb',parameterLimit=1000,type='application/x-www-form-urlencoded',verify) -> middleware parses URL-encoded->req.body; raw(options:inflate=true,limit='100kb',type='application/octet-stream',verify) -> middleware parses Buffer->req.body; text(options:defaultCharset='utf-8',inflate=true,limit='100kb',type='text/plain',verify) -> middleware parses String->req.body; static(root,options:dotfiles,etag=true,extensions=false,fallthrough=true,immutable=false,index='index.html',lastModified=true,maxAge=0,redirect=true,setHeaders) -> static file server; Router(options:caseSensitive=false,mergeParams=false,strict=false) -> modular router with .get/.post/.use/.param

## Sanitised Extract
Table of Contents
1. express.json
2. express.urlencoded
3. express.raw
4. express.text
5. express.static
6. express.Router

1. express.json
Signature: express.json(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
reviver: Function|null
strict: Boolean (true)
type: String|Array|Function ('application/json')
verify: Function|undefined
Behavior: Parses JSON payloads where Content-Type matches type into req.body object, supports gzip/deflate.

2. express.urlencoded
Signature: express.urlencoded(options)
Options:
extended: Boolean (true)
inflate: Boolean (true)
limit: Number|String ('100kb')
parameterLimit: Number (1000)
type: String|Array|Function ('application/x-www-form-urlencoded')
verify: Function|undefined
Behavior: Parses urlencoded payloads into req.body as object or array (qs if extended true).

3. express.raw
Signature: express.raw(options)
Options:
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('application/octet-stream')
verify: Function|undefined
Behavior: Parses all bodies into Buffer at req.body.

4. express.text
Signature: express.text(options)
Options:
defaultCharset: String ('utf-8')
inflate: Boolean (true)
limit: Number|String ('100kb')
type: String|Array|Function ('text/plain')
verify: Function|undefined
Behavior: Parses bodies into string at req.body.

5. express.static
Signature: express.static(root,options)
Options:
dotfiles: 'allow'|'deny'|'ignore'|undefined
etag: Boolean (true)
extensions: Array|false (false)
fallthrough: Boolean (true)
immutable: Boolean (false)
index: String|false ('index.html')
lastModified: Boolean (true)
maxAge: Number|String (0)
redirect: Boolean (true)
setHeaders: Function(res,path,stat)
Behavior: Serves static assets, on miss calls next(), supports caching headers.

6. express.Router
Signature: express.Router(options)
Options:
caseSensitive: Boolean (false)
mergeParams: Boolean (false)
strict: Boolean (false)
Behavior: Returns modular router to mount routes and middleware.

## Original Source
Express.js API Reference
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_MIDDLEWARE

# Express Middleware Reference (retrieved 2024-06-15)

## express()
Creates an Express application function:

```js
var express = require('express')
var app = express()
```

## express.json([options])
Built-in JSON body parser (v4.16.0+), based on body-parser.

Signature:
```js
express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
})
```
Parses requests where Content-Type matches `type` into `req.body` object. Supports gzip/deflate.

Options:
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- reviver (Function, default null)
- strict (Boolean, default true)
- type (String|Array|Function, default 'application/json')
- verify (Function(req,res,buf,encoding))

## express.urlencoded([options])
Built-in URL-encoded body parser (v4.16.0+), based on body-parser.

Signature:
```js
express.urlencoded({
  extended: true,
  inflate: true,
  limit: '100kb',
  parameterLimit: 1000,
  type: 'application/x-www-form-urlencoded',
  verify: undefined
})
```
Parses URL-encoded payloads into `req.body` (object or array). UTF-8 only.

Options:
- extended (Boolean, default true)
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- parameterLimit (Number, default 1000)
- type (String|Array|Function, default 'application/x-www-form-urlencoded')
- verify (Function)

## express.raw([options])
Built-in raw body parser (v4.17.0+), based on body-parser.

Signature:
```js
express.raw({
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream',
  verify: undefined
})
```
Parses payloads into a Buffer at `req.body`.

Options:
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- type (String|Array|Function, default 'application/octet-stream')
- verify (Function)

## express.text([options])
Built-in text body parser (v4.17.0+), based on body-parser.

Signature:
```js
express.text({
  defaultCharset: 'utf-8',
  inflate: true,
  limit: '100kb',
  type: 'text/plain',
  verify: undefined
})
```
Parses payloads into a string at `req.body`.

Options:
- defaultCharset (String, default 'utf-8')
- inflate (Boolean, default true)
- limit (Number|String, default '100kb')
- type (String|Array|Function, default 'text/plain')
- verify (Function)

## express.static(root, [options])
Built-in static file server, based on serve-static.

Signature:
```js
express.static(rootDir, {
  dotfiles: undefined,
  etag: true,
  extensions: false,
  fallthrough: true,
  immutable: false,
  index: 'index.html',
  lastModified: true,
  maxAge: 0,
  redirect: true,
  setHeaders: undefined
})
```
Serves files from `rootDir` and calls `next()` on miss. Supports reverse proxy caching.

Options:
- dotfiles: 'allow'|'deny'|'ignore'|undefined
- etag: Boolean (default true)
- extensions: Array|false (default false)
- fallthrough: Boolean (default true)
- immutable: Boolean (default false)
- index: String|false (default 'index.html')
- lastModified: Boolean (default true)
- maxAge: Number|String (default 0)
- redirect: Boolean (default true)
- setHeaders: Function(res,path,stat)

## express.Router([options])
Creates modular route handlers.

Signature:
```js
var router = express.Router({
  caseSensitive: false,
  mergeParams: false,
  strict: false
})
```
Options:
- caseSensitive (Boolean, default false)
- mergeParams (Boolean, default false)
- strict (Boolean, default false)

## Mounting Middleware
```js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public', { maxAge: '1d' }))
app.use('/api', router)
```

## Attribution
- Source: Express.js API Reference
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-11T02:10:27.212Z
- Data Size: 26740539 bytes
- Links Found: 21583

## Retrieved
2025-05-11
library/ABORTCONTROLLER.md
# library/ABORTCONTROLLER.md
# ABORTCONTROLLER

## Crawl Summary
Constructor: new AbortController() → AbortController instance. Property: signal (AbortSignal) read-only. Method: abort() → void, dispatches 'abort' event, causes fetch, streams, and response body reads to reject with DOMException named 'AbortError'. fetch(url, { signal }) integration. Catch AbortError to handle cancellations.

## Normalised Extract
Table of Contents
1. Constructor Signature
2. signal Property
3. abort() Method
4. Fetch Integration
5. Error Handling
6. Response Body Abort

1. Constructor Signature
new AbortController() returns an AbortController instance.

2. signal Property
AbortController.signal is an AbortSignal used to register for abort events and to pass into abortable APIs.

3. abort() Method
Calling AbortController.abort() synchronously sets signal.aborted to true, dispatches an "abort" event, and tears down any associated operations.

4. Fetch Integration
Pass controller.signal in fetch init: fetch(url, { signal: controller.signal }) associates the signal. 
Calling controller.abort() rejects the fetch promise with a DOMException named "AbortError".

5. Error Handling
In catch clause, inspect err.name === 'AbortError' to differentiate cancellations from other errors.

6. Response Body Abort
If abort is invoked after fetch resolves but before reading response body, further methods like response.text() or response.json() will reject with AbortError.

## Supplementary Details
Implementation Steps
1. Instantiate controller: const controller = new AbortController();
2. Extract signal: const signal = controller.signal;
3. Initiate fetch: fetch(endpointUrl, { signal });
4. Trigger abort: controller.abort();
5. Handle AbortError: catch(err) if err.name === 'AbortError'

Configuration Options
- fetch init: { signal: AbortSignal }
- Request constructor: new Request(input, { signal })

Parameter Values
- signal.aborted: boolean (initial false, true after abort)
- AbortSignal.reason: any value passed to abort(reason) if supported

Integration Points
- Streams: any ReadableStream tied to signal will error on abort.
- DOM fetch, ReadableStream, Request, Response


## Reference Details
API Specifications

Interface AbortController
- constructor AbortController(): AbortController
- readonly property signal: AbortSignal
- method abort(): void

AbortSignal (for context)
- readonly property aborted: boolean
- readonly property reason: any (DOMException or value)
- method throwIfAborted(): void throws if signal.aborted
- event abort: fired when controller.abort() is called

Method Signatures
```ts
interface AbortController {
  constructor(): void;
  readonly signal: AbortSignal;
  abort(): void;
}

interface AbortSignal extends EventTarget {
  readonly aborted: boolean;
  readonly reason: any;
  throwIfAborted(): void;
  addEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any): void;
  removeEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any): void;
}
```

Code Examples

1. Basic Usage
```js
const controller = new AbortController();
const signal = controller.signal;
fetch('https://example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.warn('Fetch aborted');
    } else {
      console.error('Fetch error', err);
    }
  });

// abort after 5 seconds
setTimeout(() => controller.abort(), 5000);
```

2. Abort after response resolution but before reading body
```js
async function fetchWithLateAbort() {
  const controller = new AbortController();
  const request = new Request('https://example.org/get', { signal: controller.signal });
  const response = await fetch(request);
  controller.abort();
  try {
    const text = await response.text(); // throws AbortError
    console.log(text);
  } catch (err) {
    console.error(err.name); // 'AbortError'
  }
}
```

Best Practices
- Always attach a timeout or user-cancel control to avoid hanging requests.
- Reuse a single controller when aborting multiple related operations.
- Call signal.throwIfAborted() in custom abortable code paths.

Troubleshooting Procedures
1. Fetch never returns: ensure controller.abort() is called or remove signal option.
2. Unexpected errors: in catch, log err.name and err.message.
3. Verify support: check 'AbortController' in global scope before use.
   ```js
   if (typeof AbortController === 'undefined') {
     // polyfill or fallback
   }
   ```
4. Stream errors: listening to signal.addEventListener('abort', () => stream.cancel());
5. Expected output on abort: console.warn('Fetch aborted') or custom log.


## Information Dense Extract
AbortController():AbortController; signal:AbortSignal; abort():void dispatches 'abort'; fetch(url,{signal}) rejects with DOMException name='AbortError'; response methods text(),json() after abort reject; use err.name==='AbortError' to differentiate; create controller, pass signal, call abort, catch cancellations; AbortSignal.aborted boolean; signal.throwIfAborted() throws; addEventListener('abort') for cleanup; support since Mar 2019.

## Sanitised Extract
Table of Contents
1. Constructor Signature
2. signal Property
3. abort() Method
4. Fetch Integration
5. Error Handling
6. Response Body Abort

1. Constructor Signature
new AbortController() returns an AbortController instance.

2. signal Property
AbortController.signal is an AbortSignal used to register for abort events and to pass into abortable APIs.

3. abort() Method
Calling AbortController.abort() synchronously sets signal.aborted to true, dispatches an 'abort' event, and tears down any associated operations.

4. Fetch Integration
Pass controller.signal in fetch init: fetch(url, { signal: controller.signal }) associates the signal. 
Calling controller.abort() rejects the fetch promise with a DOMException named 'AbortError'.

5. Error Handling
In catch clause, inspect err.name === 'AbortError' to differentiate cancellations from other errors.

6. Response Body Abort
If abort is invoked after fetch resolves but before reading response body, further methods like response.text() or response.json() will reject with AbortError.

## Original Source
Node.js AbortController
https://developer.mozilla.org/en-US/docs/Web/API/AbortController

## Digest of ABORTCONTROLLER

# AbortController

## Constructor

### new AbortController()
Creates a new AbortController instance.

Signature
```js
constructor AbortController(): AbortController
```

## Instance Properties

### signal: AbortSignal (read-only)
Returns the associated AbortSignal used to communicate or abort an asynchronous operation.

## Instance Methods

### abort(): void
Aborts all associated operations. Dispatches an "abort" event on the signal. Causes fetch requests, response bodies, streams, and other abortable operations to terminate and reject with a DOMException named "AbortError".

## Usage Examples

### Abort a fetch request midway
```js
let controller = new AbortController();
let signal = controller.signal;

const responsePromise = fetch('video.mp4', { signal: signal });

// Later, when abort is needed
controller.abort(); // triggers AbortError on responsePromise
```

### Handling AbortError
```js
try {
  const response = await fetch(url, { signal: controller.signal });
  // process response
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request was aborted');
  } else {
    throw err;
  }
}
```

## Specifications

- Interface: AbortController
- Defined in: DOM Standard
- Constructor: new AbortController()
- Properties:
  - signal: AbortSignal (read-only)
- Methods:
  - abort(): void

## Browser Compatibility

Feature available since March 2019 across modern browsers and Web Workers.


## Attribution
- Source: Node.js AbortController
- URL: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-10T16:58:52.359Z
- Data Size: 1458842 bytes
- Links Found: 16102

## Retrieved
2025-05-10
library/DECIMAL_JS.md
# library/DECIMAL_JS.md
# DECIMAL_JS

## Crawl Summary
Constructor: Decimal(value: number|string|Decimal)⇒Decimal; supports ±0, ±Infinity, NaN, decimal/binary/octal/hex with prefixes, exponential notation with e/E or p/P; throws on invalid value or exponent outside [minE,maxE]. Configuration via Decimal.set({precision:1–1e9=20, rounding:0–8=4, minE:–9e15=–9e15, maxE:0–9e15=9e15, toExpNeg:–9e15=–7, toExpPos:0–9e15=20, modulo:0–9=1, crypto:false}); direct assignment bypasses validation. Static methods: abs, acos, acosh, add(x,y), asin, asinh, atan, atanh, atan2(y,x): range [–π,π], cbrt, ceil, clamp, clone(config), cos, cosh, div, exp, floor, hypot, ln, log, log2, log10, max, min, mod, mul, noConflict, pow, random(dp), round, set(config), sign, sin, sinh, sqrt, sub, sum, tan, tanh, trunc. Instance methods: absoluteValue, abs, ceil, cmp, clamp, cos, cosh, div, exp, floor, ln, log, mod, mul, neg, plus, pow, round, sin, sqrt, sub, toFixed, toExponential, toPrecision, toSignificantDigits, toDP, toHex, toOctal, toString, valueOf, etc. Constants: ROUND_UP=0,…,EUCLID=9. Errors: DecimalError. Zero, NaN, ±Infinity follow JS semantics.

## Normalised Extract
Table of Contents
1  Constructor
2  Configuration
3  Static Methods
4  Instance Methods
5  Constants
6  Errors & Special Values

1  Constructor
Signature: Decimal(value: number|string|Decimal)⇒Decimal
Valid value: integer or float including ±0, ±Infinity, NaN; string may be decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X); exponential notation uses e/E for decimal, p/P for non-decimal; unlimited digits apart from JS array size and processing time; exponent must be between minE and maxE; throws DecimalError on invalid input.

2  Configuration
Method: Decimal.set(object)⇒DecimalConstructor
Properties:
  precision: 1–1e9, default 20
  rounding: 0–8, default 4
  minE: –9e15–0, default –9e15
  maxE: 0–9e15, default 9e15
  toExpNeg: –9e15–0, default –7
  toExpPos: 0–9e15, default 20
  modulo: 0–9, default 1
  crypto: boolean, default false
  defaults: boolean flag to reset unspecified to defaults
Throws DecimalError on invalid property values.
Direct assignment: Decimal.precision=40 (no validation).
Clone: Decimal.clone([object])⇒DecimalConstructor; clone copies or applies object settings; object.defaults=true resets to defaults then applies other properties.

3  Static Methods
abs(x)⇒Decimal | acos(x)⇒Decimal | acosh(x)⇒Decimal | add(x,y)⇒Decimal | asin(x)⇒Decimal | asinh(x)⇒Decimal | atan(x)⇒Decimal | atanh(x)⇒Decimal | atan2(y,x)⇒Decimal (Range –π to π) | cbrt(x)⇒Decimal | ceil(x)⇒Decimal | clamp(min,max)⇒Decimal | clone([object])⇒DecimalConstructor | cos(x)⇒Decimal | cosh(x)⇒Decimal | div(x,y)⇒Decimal | exp(x)⇒Decimal | floor(x)⇒Decimal | hypot([x,y,…])⇒Decimal | ln(x)⇒Decimal | log(x[,base])⇒Decimal | log2(x)⇒Decimal | log10(x)⇒Decimal | max(x[,y,…])⇒Decimal | min(x[,y,…])⇒Decimal | mod(x,y)⇒Decimal | mul(x,y)⇒Decimal | noConflict()⇒DecimalConstructor | pow(base,exp)⇒Decimal | random([dp])⇒Decimal | round(x)⇒Decimal | set(object)⇒DecimalConstructor | sign(x)⇒number (1,–1,0,–0,NaN) | sin(x)⇒Decimal | sinh(x)⇒Decimal | sqrt(x)⇒Decimal | sub(x,y)⇒Decimal | sum(x[,y,…])⇒Decimal | tan(x)⇒Decimal | tanh(x)⇒Decimal | trunc(x)⇒Decimal

4  Instance Methods
absoluteValue()⇒Decimal | abs()⇒Decimal | ceil()⇒Decimal | cmp(x)⇒number | clamp(min,max)⇒Decimal | cos()⇒Decimal | cosh()⇒Decimal | div(x)⇒Decimal | divToInt(x)⇒Decimal | eq(x)⇒boolean | floor()⇒Decimal | gt(x)⇒boolean | gte(x)⇒boolean | sinh()⇒Decimal | sin()⇒Decimal | log(x)⇒Decimal | ln()⇒Decimal | minus(x)⇒Decimal | mod(x)⇒Decimal | exp()⇒Decimal | neg()⇒Decimal | plus(x)⇒Decimal | sd([includeZeros])⇒number | round()⇒Decimal | toDP(dp[,rm])⇒Decimal | toHex()⇒string | toPower(exp)⇒Decimal | toSD(sd[,rm])⇒Decimal | toString()⇒string | toPrecision(sd[,rm])⇒string | toFixed(dp[,rm])⇒string | toExponential(dp[,rm])⇒string | toNearest(step[,rm])⇒Decimal | valueOf()⇒string | etc.

5  Constants
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

6  Errors & Special Values
DecimalError: invalid constructor or set arguments; ±0 has sign bit; NaN; ±Infinity

## Supplementary Details
Default configuration object for Decimal constructor:
 precision:20
 rounding:4 (ROUND_HALF_UP)
 toExpNeg:-7
 toExpPos:20
 maxE:9e15
 minE:-9e15
 modulo:1
 crypto:false

Usage patterns:
 • Require via npm: const Decimal=require('decimal.js');
 • Browser: <script src='decimal.min.js'></script>
 • Global crypto in Node.js: global.crypto=require('crypto');
 • For independent settings: const D9=Decimal.clone({precision:9}); D9.div(1,3)=>0.333333333
 • Restore defaults: Decimal.set({defaults:true});
 • Reset one property: Decimal.set({precision:50, defaults:true});

Error handling:
 • Invalid precision: DecimalError: Invalid argument: precision: 0
 • Missing crypto: if crypto=true and no global crypto, Decimal.random() throws Exception

Precision limits:
 • Trigonometric methods limited by Pi constant precision (see source)
 • naturalLogarithm accurate up to 1000 digits; LN10 constant precision 1025 digits; increase LN10 precision in source for >1000 digits

Range behaviors:
 • Underflow to zero when exponent < minE
 • Overflow to Infinity when exponent > maxE

## Reference Details
Class: Decimal
Constructor: new Decimal(value: number|string|Decimal) ⇒ Decimal
 Throws: DecimalError
Properties (static): precision:number, rounding:number, minE:number, maxE:number, toExpNeg:number, toExpPos:number, modulo:number, crypto:boolean
Constants: Decimal.ROUND_UP = 0
           Decimal.ROUND_DOWN = 1
           Decimal.ROUND_CEIL = 2
           Decimal.ROUND_FLOOR = 3
           Decimal.ROUND_HALF_UP = 4
           Decimal.ROUND_HALF_DOWN = 5
           Decimal.ROUND_HALF_EVEN = 6
           Decimal.ROUND_HALF_CEIL = 7
           Decimal.ROUND_HALF_FLOOR = 8
           Decimal.EUCLID = 9

Static Methods:
 abs(x: number|string|Decimal) ⇒ Decimal
 acos(x: number|string|Decimal) ⇒ Decimal
 acosh(x: number|string|Decimal) ⇒ Decimal
 add(x: number|string|Decimal, y: number|string|Decimal) ⇒ Decimal
 atan2(y: number|string|Decimal, x: number|string|Decimal) ⇒ Decimal
 random(dp?: number) ⇒ Decimal throws if crypto=true and no secure source
 set(config: { precision?:number, rounding?:number, toExpNeg?:number, toExpPos?:number, minE?:number, maxE?:number, modulo?:number, crypto?:boolean, defaults?:boolean }) ⇒ DecimalConstructor
 clone(config?:object) ⇒ DecimalConstructor
 noConflict() ⇒ DecimalConstructor (browser only)

Instance Methods:
 plus(x: number|string|Decimal) ⇒ Decimal
 minus(x: number|string|Decimal) ⇒ Decimal
 times(x: number|string|Decimal) ⇒ Decimal
 div(x: number|string|Decimal) ⇒ Decimal
 divToInt(x: number|string|Decimal) ⇒ Decimal
 mod(x: number|string|Decimal) ⇒ Decimal
 pow(exp: number|string|Decimal) ⇒ Decimal
 sqrt() ⇒ Decimal
 cbrt() ⇒ Decimal
 ln() ⇒ Decimal
 log(base?: number|string|Decimal) ⇒ Decimal
 log2() ⇒ Decimal
 log10() ⇒ Decimal
 exp() ⇒ Decimal
 sin() ⇒ Decimal
 cos() ⇒ Decimal
 tan() ⇒ Decimal
 sinh() ⇒ Decimal
 cosh() ⇒ Decimal
 tanh() ⇒ Decimal
 asin() ⇒ Decimal
 acos() ⇒ Decimal
 atan() ⇒ Decimal
 asinh() ⇒ Decimal
 acosh() ⇒ Decimal
 atanh() ⇒ Decimal
 abs() ⇒ Decimal
 neg() ⇒ Decimal
 cmp(x: number|string|Decimal) ⇒ number
 eq(x: number|string|Decimal) ⇒ boolean
 gt(x: number|string|Decimal) ⇒ boolean
 gte(x: number|string|Decimal) ⇒ boolean
 lt(x: number|string|Decimal) ⇒ boolean
 lte(x: number|string|Decimal) ⇒ boolean
 isFinite() ⇒ boolean
 isNaN() ⇒ boolean
 isZero() ⇒ boolean
 isPos() ⇒ boolean
 isNeg() ⇒ boolean
 precision(includeZeros?:boolean) ⇒ number
 toString() ⇒ string
 toNumber() ⇒ number
 toJSON() ⇒ string
 toFixed(dp: number, rm?: number) ⇒ string
 toExponential(dp: number, rm?: number) ⇒ string
 toPrecision(sd: number, rm?: number) ⇒ string
 toSignificantDigits(sd: number, rm?: number) ⇒ Decimal
 toDecimalPlaces(dp: number, rm?: number) ⇒ Decimal
 toHex() ⇒ string
 toOctal() ⇒ string
 toBinary() ⇒ string
 toFraction(maxDenominator?: number) ⇒ [Decimal, Decimal]
 toNearest(step: number|string|Decimal, rm?: number) ⇒ Decimal
 valueOf() ⇒ string

Usage Examples:
 const { Decimal } = require('decimal.js');
 Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_EVEN });
 const x = new Decimal('1.23456789e-10');
 const y = x.mul(1e10).toFixed(5); // '1.23457'

Best Practices:
 • Use clone() for different global settings rather than reconfiguring the global constructor.
 • For cryptographic randoms, set crypto=true and provide secure global.crypto in Node.js.
 • Always catch DecimalError when parsing user input.

Troubleshooting:
 Command: node -e "const D=require('decimal.js'); D.set({precision:0});"
 Expected Error: [DecimalError] Invalid argument: precision: 0

 Command: node -e "const D=require('decimal.js'); D.crypto=true; console.log(D.random());"
 If no global.crypto: Error: crypto not available

 Test underflow/overflow:
 node -e "const D=require('decimal.js'); D.set({minE:-3}); console.log(new D(0.0001).valueOf());" // '0'
 node -e "const D=require('decimal.js'); D.set({maxE:4}); console.log(new D(100000).valueOf());" // 'Infinity'

## Information Dense Extract
Decimal(value:number|string|Decimal)⇒Decimal; supports decimal, 0b/0B,0o/0O,0x/0X,exp e/E,p/P; throws DecimalError on invalid or exponent<minE/maxE. Config: Decimal.set({precision:1–1e9=20, rounding:0–8=4, minE:–9e15=–9e15, maxE:0–9e15=9e15, toExpNeg:–9e15=–7, toExpPos:0–9e15=20, modulo:0–9=1, crypto:false, defaults?:boolean}). Constants: ROUND_UP=0…EUCLID=9. Static methods: abs,acos,acosh,add(x,y),asin,asinh,atan,atanh,atan2(y,x),cbrt,ceil,clamp,clone,cos,cosh,div,exp,floor,hypot,ln,log,log2,log10,max,min,mod,mul,noConflict,pow,random(dp),round,set,sign,sin,sinh,sqrt,sub,sum,tan,tanh,trunc. Instance methods: plus,minus,times,div,divToInt,mod,pow,sqrt,cbrt,ln,log,log2,log10,exp,sin,cos,tan,sinh,cosh,tanh,asin,acos,atan,asinh,acosh,atanh,abs,neg,cmp,eq,gt,gte,lt,lte,isFinite,isNaN,isZero,isPos,isNeg,sd,precision,toString,toNumber,toJSON,toFixed,toExponential,toPrecision,toSignificantDigits,toDecimalPlaces,toHex,toOctal,toBinary,toFraction,toNearest,valueOf. Best practices: use clone for per-context config; set crypto with global.crypto for secure random; catch DecimalError. Troubleshoot common errors: invalid precision, missing crypto, underflow, overflow checks via set minE/maxE.

## Sanitised Extract
Table of Contents
1  Constructor
2  Configuration
3  Static Methods
4  Instance Methods
5  Constants
6  Errors & Special Values

1  Constructor
Signature: Decimal(value: number|string|Decimal)Decimal
Valid value: integer or float including 0, Infinity, NaN; string may be decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X); exponential notation uses e/E for decimal, p/P for non-decimal; unlimited digits apart from JS array size and processing time; exponent must be between minE and maxE; throws DecimalError on invalid input.

2  Configuration
Method: Decimal.set(object)DecimalConstructor
Properties:
  precision: 11e9, default 20
  rounding: 08, default 4
  minE: 9e150, default 9e15
  maxE: 09e15, default 9e15
  toExpNeg: 9e150, default 7
  toExpPos: 09e15, default 20
  modulo: 09, default 1
  crypto: boolean, default false
  defaults: boolean flag to reset unspecified to defaults
Throws DecimalError on invalid property values.
Direct assignment: Decimal.precision=40 (no validation).
Clone: Decimal.clone([object])DecimalConstructor; clone copies or applies object settings; object.defaults=true resets to defaults then applies other properties.

3  Static Methods
abs(x)Decimal | acos(x)Decimal | acosh(x)Decimal | add(x,y)Decimal | asin(x)Decimal | asinh(x)Decimal | atan(x)Decimal | atanh(x)Decimal | atan2(y,x)Decimal (Range  to ) | cbrt(x)Decimal | ceil(x)Decimal | clamp(min,max)Decimal | clone([object])DecimalConstructor | cos(x)Decimal | cosh(x)Decimal | div(x,y)Decimal | exp(x)Decimal | floor(x)Decimal | hypot([x,y,])Decimal | ln(x)Decimal | log(x[,base])Decimal | log2(x)Decimal | log10(x)Decimal | max(x[,y,])Decimal | min(x[,y,])Decimal | mod(x,y)Decimal | mul(x,y)Decimal | noConflict()DecimalConstructor | pow(base,exp)Decimal | random([dp])Decimal | round(x)Decimal | set(object)DecimalConstructor | sign(x)number (1,1,0,0,NaN) | sin(x)Decimal | sinh(x)Decimal | sqrt(x)Decimal | sub(x,y)Decimal | sum(x[,y,])Decimal | tan(x)Decimal | tanh(x)Decimal | trunc(x)Decimal

4  Instance Methods
absoluteValue()Decimal | abs()Decimal | ceil()Decimal | cmp(x)number | clamp(min,max)Decimal | cos()Decimal | cosh()Decimal | div(x)Decimal | divToInt(x)Decimal | eq(x)boolean | floor()Decimal | gt(x)boolean | gte(x)boolean | sinh()Decimal | sin()Decimal | log(x)Decimal | ln()Decimal | minus(x)Decimal | mod(x)Decimal | exp()Decimal | neg()Decimal | plus(x)Decimal | sd([includeZeros])number | round()Decimal | toDP(dp[,rm])Decimal | toHex()string | toPower(exp)Decimal | toSD(sd[,rm])Decimal | toString()string | toPrecision(sd[,rm])string | toFixed(dp[,rm])string | toExponential(dp[,rm])string | toNearest(step[,rm])Decimal | valueOf()string | etc.

5  Constants
ROUND_UP=0, ROUND_DOWN=1, ROUND_CEIL=2, ROUND_FLOOR=3, ROUND_HALF_UP=4, ROUND_HALF_DOWN=5, ROUND_HALF_EVEN=6, ROUND_HALF_CEIL=7, ROUND_HALF_FLOOR=8, EUCLID=9

6  Errors & Special Values
DecimalError: invalid constructor or set arguments; 0 has sign bit; NaN; Infinity

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMAL_JS

# Decimal.js Arbitrary-Precision Decimal Type
Date Retrieved: 2024-06-19
Data Size: 13874875 bytes
Links Found: 21129

# Constructor
**Signature:** Decimal(value) ⇒ Decimal
**Parameters:**
  • value: number | string | Decimal
    – ±0, ±Infinity, NaN
    – decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X)
    – exponential: e/E for base-10, p/P for base-2 (binary/hex/octal)
**Behavior:** Throws DecimalError on invalid value or exponent outside [minE, maxE]

# Configuration Properties
Set via `Decimal.set(object)` or direct assignment (no validation):
  • precision: integer 1–1e9, default 20
  • rounding: integer 0–8, default 4
    – 0: ROUND_UP, 1: ROUND_DOWN, 2: ROUND_CEIL, 3: ROUND_FLOOR,
      4: ROUND_HALF_UP, 5: ROUND_HALF_DOWN, 6: ROUND_HALF_EVEN,
      7: ROUND_HALF_CEIL, 8: ROUND_HALF_FLOOR
  • minE: integer –9e15 to 0, default –9e15
  • maxE: integer 0 to 9e15, default 9e15
  • toExpNeg: integer –9e15 to 0, default –7
  • toExpPos: integer 0 to 9e15, default 20
  • modulo: integer 0–9, default 1 (ROUND_DOWN)
  • crypto: boolean, default false

# Static Methods
• abs(x) ⇒ Decimal
• acos(x) ⇒ Decimal
• acosh(x) ⇒ Decimal
• add(x, y) ⇒ Decimal
• asin(x) ⇒ Decimal
• asinh(x) ⇒ Decimal
• atan(x) ⇒ Decimal
• atanh(x) ⇒ Decimal
• atan2(y, x) ⇒ Decimal  Domain: [–∞, ∞], Range: [–π, π]
• cbrt(x) ⇒ Decimal
… (full list as per API)

# Instance Methods
Inherited from prototype; immutable chaining.
• absoluteValue() ⇒ Decimal
• abs() ⇒ Decimal alias
• ceil() ⇒ Decimal
• cmp(x) ⇒ number 1, –1, 0 or NaN
• clamp(min, max) ⇒ Decimal
• cos() ⇒ Decimal
• cosh() ⇒ Decimal
• div(x) ⇒ Decimal
• exp() ⇒ Decimal
• floor() ⇒ Decimal
… (full list as per API)

# Constants
• ROUND_UP = 0
• ROUND_DOWN = 1
• ROUND_CEIL = 2
• ROUND_FLOOR = 3
• ROUND_HALF_UP = 4
• ROUND_HALF_DOWN = 5
• ROUND_HALF_EVEN = 6
• ROUND_HALF_CEIL = 7
• ROUND_HALF_FLOOR = 8
• EUCLID = 9

# Errors
DecimalError: thrown on invalid constructor value or invalid configuration

# Zero, NaN & Infinity
Consistent with JavaScript: signed zeros, NaN, ±Infinity

## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-10T19:28:47.609Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-10
library/VITEST_API.md
# library/VITEST_API.md
# VITEST_API

## Crawl Summary
Type Awaitable<T>=T|PromiseLike<T>; TestFunction=()=>Awaitable<void>; interface TestOptions { timeout?:number; retry?:number=0; repeats?:number=0 }. test(name:string|Function, fn:TestFunction, options?:TestOptions, timeout?:number):void. Aliases: it, test.skip, test.only, test.concurrent, test.runIf, test.skipIf, test.sequential, test.todo, test.fails, test.each, test.for. bench(name:string|Function, fn:BenchFunction, options?:BenchOptions):void; BenchOptions fields: time:number=500; iterations:number=10; now():number; signal:AbortSignal; throws:boolean; warmupTime:number=100; warmupIterations:number=5; setup:Hook; teardown:Hook; TaskResult fields: totalTime,min,max,hz,period,samples,mean,variance,sd,sem,df,critical,moe,rme,mad,p50,p75,p99,p995,p999. describe(name,fn,options?):void; aliases: describe.skip, only, concurrent, sequential, todo, each, for. Hooks: beforeEach,afterEach,beforeAll,afterAll(onTestFinished,onTestFailed).

## Normalised Extract
Table of Contents

1. Type Definitions
2. TestOptions Interface
3. Core Test Function
4. Test Modifiers and Aliases
5. Parameterized Tests
6. Benchmark API
7. Suite API
8. Lifecycle Hooks

1. Type Definitions
  Awaitable<T> = T or PromiseLike<T>
  TestFunction = () => Awaitable<void>

2. TestOptions Interface
  timeout?: number milliseconds before fail
  retry?: number  // retries on failure, default 0
  repeats?: number // repeat count, default 0

3. Core Test Function
  Signature: test(name:string|Function, fn:TestFunction, options?:TestOptions, timeout?:number):void
  name: test title or function reference
  fn: synchronous or async function returning void or promise
  options: object for skip, concurrent, timeout, retry, repeats
  timeout: numeric override if passed last

4. Test Modifiers and Aliases
  test.skip(name, fn, timeout?)
  test.only(name, fn, timeout?)
  test.concurrent(name, fn, timeout?)
  test.runIf(condition)(name, fn, timeout?)
  test.skipIf(condition)(name, fn, timeout?)
  test.sequential(name, fn)
  test.todo(name)
  test.fails(name, fn)
  Aliases: it, it.skip, it.only, it.concurrent, etc.

5. Parameterized Tests
  test.each(cases)(name template, fn)
  test.for(cases)(name template, fn) // array case not spread
  printf tokens: %s %d %i %f %j %o #%$ %%
  Template syntax: backtick table|column definitions

6. Benchmark API
  bench(name:string|Function, fn:BenchFunction, options?:BenchOptions):void
  Options:
    time:number=500
    iterations:number=10
    warmupTime:number=100
    warmupIterations:number=5
    now():number
    signal:AbortSignal
    throws:boolean
    setup:Hook
    teardown:Hook
  Return via on cycle logs and TaskResult structure

7. Suite API
  describe(name:string|Function, fn:TestFunction, options?:number|TestOptions):void
  Modifiers: describe.skip, only, concurrent, sequential, todo, each, for

8. Lifecycle Hooks
  beforeEach(fn, timeout?)
  afterEach(fn, timeout?)
  beforeAll(fn, timeout?)
  afterAll(fn, timeout?)
  onTestFinished(callback)
  onTestFailed(callback)


## Supplementary Details
Default Values and Global Configuration
- Default test timeout: 5000ms, override via TestOptions.timeout or global config testTimeout
- Default retry and repeats: 0
- CLI flags: --sequence.concurrent to enable parallel, --sequence.shuffle true to randomize order, --sequence.seed to fix shuffle seed
- Global config in vitest.config.js:
  export default {
    test: {
      testTimeout: 10000,
      sequence: { concurrent: true, shuffle: false, seed: 12345 }
    },
    chaiConfig: { truncateThreshold: 80 }
  }
Implementation Steps
1. Import desired APIs:
   import { test, describe, bench, beforeEach, afterEach, onTestFinished } from 'vitest'
2. Define fixtures via test.extend({ ... }) to add custom context
3. Write tests with modifiers: .only, .skip, .concurrent
4. For parameterized tests, choose test.each or test.for according to spread behavior
5. Add lifecycle hooks at file or suite scope
6. Run with npx vitest [options]


## Reference Details
Complete API Signatures and Examples

// Core Test
function test(
  name: string | Function,
  optionsOrFn: TestOptions | TestFunction,
  fnOrTimeout?: TestFunction | number,
  timeoutIfProvided?: number
): void

// Options object usage
test('heavy', { timeout: 20000, retry: 2, repeats: 3, skip: false, concurrent: true }, async () => {
  await expect(doWork()).resolves.toBeDefined()
})

// Chained modifiers
test.skip('will skip', () => {})
test.concurrent.skip('skip concurrent', () => {})

test.runIf(process.env.NODE_ENV==='test')('run only in test', () => {})

test.sequential('serial test', async () => {})

test.todo('to implement')

test.fails('expected failure', async ()=>{ await expect(f()).rejects.toThrow() })

// Parameterized tests
const cases = [[1,2,3],[2,3,5]]
test.each(cases)('sum(%i,%i)->%i', (a,b,exp)=>{ expect(a+b).toBe(exp) })
test.for(cases)('sum unspread', ([a,b,exp])=>{ expect(a+b).toBe(exp) })

test.each`
a|b|exp
${1}|${1}|${2}
${2}|${3}|${5}
`('sum $a+$b->$exp', ({a,b,exp})=>{expect(a+b).toBe(exp)})

// Benchmark
function bench(
  name: string | Function,
  fn: BenchFunction,
  options?: BenchOptions
): void

bench('sort', () => { arr.sort() }, { time:1000, iterations:20, warmupTime:200 })

// Suite
function describe(
  name: string | Function,
  fn: TestFunction,
  options?: number | TestOptions
): void

describe.only('focused suite', ()=>{ test('a', ()=>{}) })

// Hooks
beforeEach(async ()=>{ await resetDb() }, 10000)
afterEach(()=>cleanupTemp())
beforeAll(()=>startService())
afterAll(()=>stopService())

// Test-scoped hooks
test('db', ({ onTestFinished, onTestFailed })=>{
  const conn=connect()
  onTestFinished(()=>conn.close())
  onTestFailed(({ task })=>console.error(task.result.errors))
})

Best Practices
- Use async/await tests instead of done callback
- Isolate fixtures with test.extend and teardown via onTestFinished
- Use test.concurrent for I/O-bound independent tests
- Parameterize edge cases via test.each with template tables for clarity

Troubleshooting
1. To rerun only failures:
   npx vitest --run --onlyFailures
2. To increase snapshot threshold:
   export default { chaiConfig:{ truncateThreshold:150 } }
3. For debugging timeouts:
   npx vitest --timeout=20000 --runs=false
4. Clear cache if test context wrong:
   npx vitest --clearCache


## Information Dense Extract
Awaitable<T>=T|PromiseLike<T>; TestFunction=()=>Awaitable<void>; TestOptions{timeout?:number;retry?:number=0;repeats?:number=0}. test(name,fn,options?,timeout?):void. Modifiers: skip,only,concurrent,runIf,skipIf,sequential,todo,fails. test.each|for for parameterized. bench(name,fn,options?):void; BenchOptions{time=500ms,iterations=10,warmupTime=100ms,warmupIterations=5,now(),signal,throws,setup,teardown}. TaskResult fields: totalTime,min,max,hz,period,samples[],mean,variance,sd,sem,df,critical,moe,rme,mad,p50,p75,p99,p995,p999. describe(name,fn,options?):void; same modifiers. Hooks: beforeEach,afterEach,beforeAll,afterAll(onTestFinished,onTestFailed). Global config via vitest.config.js. CLI flags: --sequence.concurrent,--sequence.shuffle,--runs,--clearCache. Focus: async tests, fixtures via test.extend, onTestFinished teardown.

## Sanitised Extract
Table of Contents

1. Type Definitions
2. TestOptions Interface
3. Core Test Function
4. Test Modifiers and Aliases
5. Parameterized Tests
6. Benchmark API
7. Suite API
8. Lifecycle Hooks

1. Type Definitions
  Awaitable<T> = T or PromiseLike<T>
  TestFunction = () => Awaitable<void>

2. TestOptions Interface
  timeout?: number milliseconds before fail
  retry?: number  // retries on failure, default 0
  repeats?: number // repeat count, default 0

3. Core Test Function
  Signature: test(name:string|Function, fn:TestFunction, options?:TestOptions, timeout?:number):void
  name: test title or function reference
  fn: synchronous or async function returning void or promise
  options: object for skip, concurrent, timeout, retry, repeats
  timeout: numeric override if passed last

4. Test Modifiers and Aliases
  test.skip(name, fn, timeout?)
  test.only(name, fn, timeout?)
  test.concurrent(name, fn, timeout?)
  test.runIf(condition)(name, fn, timeout?)
  test.skipIf(condition)(name, fn, timeout?)
  test.sequential(name, fn)
  test.todo(name)
  test.fails(name, fn)
  Aliases: it, it.skip, it.only, it.concurrent, etc.

5. Parameterized Tests
  test.each(cases)(name template, fn)
  test.for(cases)(name template, fn) // array case not spread
  printf tokens: %s %d %i %f %j %o #%$ %%
  Template syntax: backtick table|column definitions

6. Benchmark API
  bench(name:string|Function, fn:BenchFunction, options?:BenchOptions):void
  Options:
    time:number=500
    iterations:number=10
    warmupTime:number=100
    warmupIterations:number=5
    now():number
    signal:AbortSignal
    throws:boolean
    setup:Hook
    teardown:Hook
  Return via on cycle logs and TaskResult structure

7. Suite API
  describe(name:string|Function, fn:TestFunction, options?:number|TestOptions):void
  Modifiers: describe.skip, only, concurrent, sequential, todo, each, for

8. Lifecycle Hooks
  beforeEach(fn, timeout?)
  afterEach(fn, timeout?)
  beforeAll(fn, timeout?)
  afterAll(fn, timeout?)
  onTestFinished(callback)
  onTestFailed(callback)

## Original Source
Vitest Testing Framework
https://vitest.dev/api/

## Digest of VITEST_API

# Vitest API Reference

Retrieved: 2024-06-12  
Data Size: 35151778 bytes

## Types

```ts
// Promise or synchronous return
type Awaitable<T> = T | PromiseLike<T>

// Test function signature
type TestFunction = () => Awaitable<void>
```

## Interface TestOptions

```ts
interface TestOptions {
  /** milliseconds before timing out */
  timeout?: number
  /** retry count, default 0 */
  retry?: number
  /** repeat cycles, default 0 */
  repeats?: number
}
```

## Test API

### test(name, fn, options?, timeout?)
```ts
function test(
  name: string | Function,
  optionsOrFn: TestOptions | TestFunction,
  fnOrTimeout?: TestFunction | number,
  timeoutIfProvided?: number
): void
```
- name: string or Function
- fn: TestFunction
- options: TestOptions
- timeout: number milliseconds

### Aliases
- it, test.skip, it.skip
- test.only, it.only
- test.concurrent, it.concurrent
- test.runIf, test.skipIf
- test.sequential, it.sequential
- test.todo, it.todo
- test.fails, it.fails
- test.each, it.each
- test.for, it.for

## Bench API

### bench(name, fn, options?)
```ts
function bench(
  name: string | Function,
  fn: BenchFunction,
  options?: BenchOptions
): void
```

#### BenchOptions
```ts
interface BenchOptions {
  time?: number       // ms, default 500
  iterations?: number // default 10
  now?: () => number
  signal?: AbortSignal
  throws?: boolean
  warmupTime?: number      // ms, default 100
  warmupIterations?: number// default 5
  setup?: Hook
  teardown?: Hook
}
```

#### TaskResult
```ts
interface TaskResult {
  error?: unknown
  totalTime: number
  min: number
  max: number
  hz: number
  period: number
  samples: number[]
  mean: number
  variance: number
  sd: number
  sem: number
  df: number
  critical: number
  moe: number
  rme: number
  mad: number
  p50: number
  p75: number
  p99: number
  p995: number
  p999: number
}
```

## Suite API

### describe(name, fn, options?)
```ts
function describe(
  name: string | Function,
  fn: TestFunction,
  options?: number | TestOptions
): void
```

Aliases: describe.skip, describe.only, describe.concurrent, describe.sequential, describe.todo, describe.each, describe.for

## Hooks

```ts
beforeEach(fn: () => Awaitable<void>, timeout?: number): void
afterEach(fn: () => Awaitable<void>, timeout?: number): void
beforeAll(fn: () => Awaitable<void>, timeout?: number): void
afterAll(fn: () => Awaitable<void>, timeout?: number): void
```

### Test-scoped hooks
```ts
onTestFinished(callback: () => void): void
onTestFailed(callback: (context: ExtendedContext) => void): void
```

## Attribution
- Source: Vitest Testing Framework
- URL: https://vitest.dev/api/
- License: MIT License
- Crawl Date: 2025-05-10T21:30:03.683Z
- Data Size: 35151778 bytes
- Links Found: 25273

## Retrieved
2025-05-10
library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
js-yaml v1.2 parser/writer. Install via npm install js-yaml. CLI: js-yaml [options] file. API.load(string, options) returns object|string|number|null throws YAMLException. Options: filename, onWarning, schema (FAILSAFE, JSON, CORE, DEFAULT), json override duplicate key behavior. API.loadAll supports multi-doc and optional iterator. API.dump(object, options) returns YAML string. DumpOptions include indent, noArrayIndent, skipInvalid, flowLevel, styles map, schema, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, forceQuotes, replacer. Styles mapping for tags !!null, !!int, !!bool, !!float. Supported tags list. Caveats: JS limitations on keys and implicit mapping.

## Normalised Extract
Table of Contents:
1 Installation
2 CLI Usage
3 API.load
4 API.loadAll
5 API.dump
6 Styles Mapping
7 Supported Types
8 Caveats

1 Installation
   Command: npm install js-yaml
   Global CLI: npm install -g js-yaml

2 CLI Usage
   Usage: js-yaml [ -h | --help ] [ -v | --version ] [ -c | --compact ] [ -t | --trace ] file

3 API.load
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Returns: object|string|number|null|undefined. Throws: YAMLException.
   Default options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false.

4 API.loadAll
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]
   Behavior: Parses multi-document streams. If iterator provided, invoked per document; else returns array.

5 API.dump
   Signature: dump(data: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean|function;
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: string;
     forceQuotes?: boolean;
     replacer?: (key: any, value: any) => any;
   }): string
   Default options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType="'", forceQuotes=false.

6 Styles Mapping
   !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
   !!int: binary(0b1), octal(0o1), decimal(1), hexadecimal(0x1)
   !!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
   !!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

7 Supported Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

8 Caveats
   Objects/arrays as keys are stringified. Implicit block mapping property access unsupported.


## Supplementary Details
Schemas Constants:
- FAILSAFE_SCHEMA: allows only strings, arrays, objects.
- JSON_SCHEMA: JSON-compatible types.
- CORE_SCHEMA: alias of JSON_SCHEMA.
- DEFAULT_SCHEMA: full YAML support.

Error Handling:
- load throws YAMLException on parse errors or multi-document input.
- loadAll throws on invalid streams.

Callback onWarning:
- Receives YAMLException per warning.

Enterprise:
- Tidelift Subscription includes support, maintenance SLA.


## Reference Details
Require and FS import:
const yaml = require('js-yaml');
const fs   = require('fs');

// Load example
try {
  const doc = yaml.load(fs.readFileSync('/path/to/file.yml','utf8'), { filename: 'file.yml', onWarning: warn => console.warn(warn), schema: yaml.JSON_SCHEMA, json: true });
  console.log(doc);
} catch (e) {
  if (e instanceof yaml.YAMLException) console.error('YAML error:', e.message);
  else throw e;
}

// loadAll example
const docs = yaml.loadAll(fs.readFileSync('multi.yml','utf8'), null, { schema: yaml.DEFAULT_SCHEMA });
// or with iterator
yaml.loadAll(data, doc => process(doc));

// dump example
const yamlStr = yaml.dump({ foo: 'bar', arr: [1,2,3] }, { indent:4, skipInvalid:true, sortKeys:true, styles:{ '!!null':'canonical' } });

// CLI troubleshooting
Command: js-yaml invalid.yaml
Expected: YAMLException with line and column. With --compact shows only message; with --trace shows stack.

Best Practices:
- Use DEFAULT_SCHEMA for full features.
- Enable json:true for JSON-parse compatibility when expecting JSON-only input.
- Set noRefs:true to inline all nodes.

Troubleshooting:
- Ensure utf8 encoding. Use fs.readFileSync(path,'utf8').
- Validate schema constant usage: yaml.CORE_SCHEMA, yaml.JSON_SCHEMA.
- Use onWarning callback to capture warnings for deprecated tags.


## Information Dense Extract
load(string,options={filename:null,onWarning:null,schema:DEFAULT_SCHEMA,json:false}): any throws YAMLException; loadAll(string,iterator?,options): any[]; dump(object,options={indent:2,noArrayIndent:false,skipInvalid:false,flowLevel:-1,styles:{},schema:DEFAULT_SCHEMA,sortKeys:false,lineWidth:80,noRefs:false,noCompatMode:false,condenseFlow:false,quotingType:"'",forceQuotes:false,replacer:null}): string; Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA; Styles for !!null, !!int, !!bool, !!float; Supported types list; CLI js-yaml [-h|-v|-c|-t] file; FS readFileSync(path,'utf8') input; onWarning(YAMLException) callback; json:true overrides duplicate-key error to override; Caveats: objects/arrays as keys stringified; implicit mapping key access unsupported.

## Sanitised Extract
Table of Contents:
1 Installation
2 CLI Usage
3 API.load
4 API.loadAll
5 API.dump
6 Styles Mapping
7 Supported Types
8 Caveats

1 Installation
   Command: npm install js-yaml
   Global CLI: npm install -g js-yaml

2 CLI Usage
   Usage: js-yaml [ -h | --help ] [ -v | --version ] [ -c | --compact ] [ -t | --trace ] file

3 API.load
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Returns: object|string|number|null|undefined. Throws: YAMLException.
   Default options: filename=null, onWarning=null, schema=DEFAULT_SCHEMA, json=false.

4 API.loadAll
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]
   Behavior: Parses multi-document streams. If iterator provided, invoked per document; else returns array.

5 API.dump
   Signature: dump(data: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean|function;
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: string;
     forceQuotes?: boolean;
     replacer?: (key: any, value: any) => any;
   }): string
   Default options: indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType=''', forceQuotes=false.

6 Styles Mapping
   !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty('')
   !!int: binary(0b1), octal(0o1), decimal(1), hexadecimal(0x1)
   !!bool: lowercase(true/false), uppercase(TRUE/FALSE), camelcase(True/False)
   !!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

7 Supported Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

8 Caveats
   Objects/arrays as keys are stringified. Implicit block mapping property access unsupported.

## Original Source
js-yaml
https://github.com/nodeca/js-yaml

## Digest of JS_YAML

# JS-YAML Technical Digest (retrieved 2024-06-30)

# Installation

- npm install js-yaml
- npm install -g js-yaml  (for CLI executable)

# CLI Usage

Usage: js-yaml [ -h ] [ -v ] [ -c ] [ -t ] file

Options:
- -h, --help     Show help and exit
- -v, --version  Show version and exit
- -c, --compact  Display errors in compact mode
- -t, --trace    Show stack trace on error

# API: load(string, options)

Signature:
load(input: string, options?: LoadOptions): any throws YAMLException

LoadOptions:
- filename?: string (default null)
- onWarning?: (warning: YAMLException) => void
- schema?: Schema (default DEFAULT_SCHEMA)
- json?: boolean (default false)

Schemas:
- FAILSAFE_SCHEMA
- JSON_SCHEMA
- CORE_SCHEMA
- DEFAULT_SCHEMA

# API: loadAll(string, iterator?, options?)

Signature:
loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[]

# API: dump(object, options)

Signature:
dump(data: any, options?: DumpOptions): string

DumpOptions:
- indent?: number (default 2)
- noArrayIndent?: boolean (default false)
- skipInvalid?: boolean (default false)
- flowLevel?: number (default -1)
- styles?: Record<string, string>
- schema?: Schema (default DEFAULT_SCHEMA)
- sortKeys?: boolean | ((a: string, b: string) => number) (default false)
- lineWidth?: number (default 80)
- noRefs?: boolean (default false)
- noCompatMode?: boolean (default false)
- condenseFlow?: boolean (default false)
- quotingType?: "'" | '"' (default "'")
- forceQuotes?: boolean (default false)
- replacer?: (key: any, value: any) => any

# Styles Table

Tag     | Style       | Example Output
!!null  | canonical   | ~
!!null  | lowercase   | null
!!int   | binary      | 0b101010
...     | ...         | ...

# Supported YAML Types

!!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map

# Caveats

- Objects or arrays used as map keys are stringified via toString().
- Implicit block mapping key property access not supported.

# Enterprise Support

- Available via Tidelift Subscription for commercial maintenance.


## Attribution
- Source: js-yaml
- URL: https://github.com/nodeca/js-yaml
- License: MIT License
- Crawl Date: 2025-05-10T23:58:36.322Z
- Data Size: 953543 bytes
- Links Found: 5780

## Retrieved
2025-05-10
library/COSMICONFIG.md
# library/COSMICONFIG.md
# COSMICONFIG

## Crawl Summary
cosmiconfig module exposes async and sync entry points. Async: cosmiconfig(name,options), sync: cosmiconfigSync(name,options). Default search path includes package.json, rc files in root and .config subdir, config files with extensions. Explorer methods: search, load, clearLoadCache, clearSearchCache, clearCaches. Options control searchStrategy, searchPlaces, loaders, packageProp, stopDir, cache, transform, ignoreEmptySearchPlaces. Default loaders map extensions to loadJson, loadYaml, loadJs, loadTs. JS modules loaded via dynamic import in async API; sync API uses require. Caching per-explorer, clearable. Differs from rc: stops at first match, supports JS/TS.

## Normalised Extract
Table of Contents

1. Async API Instantiation
2. Explorer.search
3. Explorer.load
4. Cache Management
5. Configuration Options
   5.1 searchStrategy
   5.2 searchPlaces
   5.3 loaders
   5.4 packageProp
   5.5 stopDir
   5.6 cache
   5.7 transform
   5.8 ignoreEmptySearchPlaces
6. Default Search Places
7. Default Loaders
8. Loading JS Modules
9. Caching
10. Differences from rc

1. Async API Instantiation
Function signature: cosmiconfig(moduleName: string, options?: CosmiconfigOptions): Explorer
moduleName must be filename-safe, no scoped names
Returns Explorer with initialized caches

2. Explorer.search
Signature: search(searchFrom?: string): Promise<Result|null>
Default searchFrom: process.cwd()
Result object structure: { config: any; filepath: string; isEmpty?: true }
Search order per directory: package.json property, .moduleName rc, .rc.json/.yaml/.yml/.js/.ts/.mjs/.cjs, .config subdir variants, moduleName.config.js/.ts/.mjs/.cjs
Strategy after current directory determined by searchStrategy: none, project, or global. global then checks OS config dir ~/.config/moduleName/

3. Explorer.load
Signature: load(loadPath: string): Promise<Result>
Reads loadPath via loader based on extension or noExt
Throws if file missing or parse error

4. Cache Management
clearLoadCache(): void clears load cache
clearSearchCache(): void clears search cache
clearCaches(): void calls both

5. Configuration Options
5.1 searchStrategy: none|project|global default none or global if stopDir set
5.2 searchPlaces: string[] default 22 paths built from moduleName
5.3 loaders: { [ext]: loader } merged with defaultLoaders; keys ext include ".js", ".json", ".yaml", ".ts", ".mjs", ".cjs", "noExt"
5.4 packageProp: string|string[] default moduleName
5.5 stopDir: string default home directory
5.6 cache: boolean default true
5.7 transform: (result)=>Result|Promise<Result> transform cached result
5.8 ignoreEmptySearchPlaces: boolean default true

6. Default Search Places
Asynchronous default searchPlaces list of 22 file paths as above

7. Default Loaders
Ext to defaultLoaders mapping: see defaultLoaders export
Sync version excludes .mjs

8. Loading JS Modules
Async uses dynamic import for .js/.ts/.mjs/.cjs
Sync uses require for .js/.cjs only

9. Caching
Per-instance caches for search and load
Cache disabled by option cache=false or by clear methods

10. Differences from rc
Finds first config then stops, no merging
Built-in JSON, YAML, CommonJS support
Asynchronous by default

## Supplementary Details
Default values
searchStrategy: none or global if stopDir set
searchPlaces: see normalisedExtract section 6
loaders: defaultLoaders Async with .mjs,.cjs,.js,.ts,.json,.yaml,.yml,noExt; Sync excludes .mjs
packageProp: moduleName
stopDir: os.homedir()
cache: true
ignoreEmptySearchPlaces: true

Implementation Steps
1. npm install cosmiconfig
2. import { cosmiconfig } from 'cosmiconfig'
3. const explorer = cosmiconfig('myapp',{ cache:false, searchStrategy:'project' })
4. const result = await explorer.search('/path/to/start')
5. if(result) use result.config; else handle no config
6. explorer.clearCaches() before program exit to free memory

Loader Customization Example
cosmiconfig('foo',{ loaders:{ '.json':defaultLoadersSync['.json'] } }) // enforce strict JSON

Transform Example
cosmiconfig('foo',{ transform:result=>{ result.config.env=process.env.NODE_ENV; return result } })

## Reference Details
Async API

import { cosmiconfig, defaultLoaders } from 'cosmiconfig'

const explorer = cosmiconfig('appName',{
  searchStrategy:'global',
  searchPlaces:[
    'package.json',
    '.appnrc',
    '.appnrc.json',
    '.config/appnrc.yaml',
    'appn.config.js'
  ],
  loaders: {
    '.yaml': defaultLoaders['.yaml'],
    'noExt': defaultLoaders['.json']
  },
  packageProp:['configs','appName'],
  stopDir:'/project/root',
  cache:false,
  transform: async result => ({ ...result, config: sanitize(result.config) }),
  ignoreEmptySearchPlaces:false
})

// search()
// Returns Promise<{ config:any; filepath:string; isEmpty?:true } | null>

explorer.search('/cwd/subdir')
  .then(result=>{
    if(!result) throw new Error('No config found')
    applyConfig(result.config)
  })
  .catch(err=>console.error('config load error',err))

// load()
// Returns Promise<Result>

explorer.load('/config/path/app.config.yaml')
  .then(({config,filepath})=> console.log('loaded',filepath))
  .catch(err=> console.error(err))

// Caching methods
e.explorer.clearLoadCache()
explorer.clearSearchCache()
explorer.clearCaches()

Sync API

import { cosmiconfigSync, defaultLoadersSync } from 'cosmiconfig'

const explorerSync = cosmiconfigSync('appName',{ cache:true })
const resultSync = explorerSync.search('/start')
if(resultSync) use(resultSync.config)

Configuration Options Table

| Option                  | Type                         | Default                                        | Effect                                          |
|-------------------------|------------------------------|------------------------------------------------|-------------------------------------------------|
| searchStrategy          | 'none'|'project'|'global'  | 'none' if no stopDir, 'global' if stopDir set  | Controls directory traversal strategy           |
| searchPlaces            | string[]                     | default 22 module-based places                 | Defines files and paths to check per directory  |
| loaders                 | { [ext]: loader }            | defaultLoaders/Sync                            | Maps extensions to parse functions              |
| packageProp             | string  string[]       | moduleName                                     | Property path in package.json                   |
| stopDir                 | string                       | os.homedir()                                   | Directory where search stops                    |
| cache                   | boolean                      | true                                           | Enables caching of results                      |
| transform               | (Result)=>ResultPromise | identity                                       | Transforms result before caching                |
| ignoreEmptySearchPlaces | boolean                      | true                                           | Skip empty files during search                  |

Best Practice Example

// Enforce strict JSON for rc files and disable caching
const explorerStrict = cosmiconfig('myapp',{
  cache:false,
  loaders:{ noExt:defaultLoaders['.json'] }
})

const resultStrict = await explorerStrict.search()
if(resultStrict) console.log(JSON.stringify(resultStrict.config))

Troubleshooting

1. No config found but file exists
   Command: console.log(explorer.searchPlaces)
   Expected: array includes your filename
   Fix: add custom searchPlaces covering extension

2. Syntax error in JS config
   Command: try explorer.load('path.js').catch(console.error)
   Expected: SyntaxError with stack trace
   Fix: ensure file exports via module.exports or use ESM with .mjs and async API

3. Transform not applied
   Check: option transform is async vs sync API mismatch
   Fix: use sync-only transform for cosmiconfigSync


## Information Dense Extract
cosmiconfig(name,options) returns Explorer with methods search(searchFrom?), load(path), clearLoadCache(), clearSearchCache(), clearCaches(). Default search files per directory: package.json->packageProp, .name rc (noExt->YAML/JSON), .rc.json/.yaml/.yml/.js/.ts/.mjs/.cjs, .config subdir variants, name.config.js/.ts/.mjs/.cjs. Options: searchStrategy('none'|'project'|'global'), searchPlaces(string[]), loaders({ext:loader}), packageProp(string|string[]), stopDir(string), cache(boolean), transform(function), ignoreEmptySearchPlaces(boolean). Default loaders Async: .mjs,.cjs,.js(loadJs),.ts(loadTs),.json(loadJson),.yaml/.yml(loadYaml),noExt(loadYaml). JS modules loaded via dynamic import in async API; sync API uses require, ignores .mjs. Caching per instance, clearable. cosmiconfigSync for sync API identical signatures without promises.

## Sanitised Extract
Table of Contents

1. Async API Instantiation
2. Explorer.search
3. Explorer.load
4. Cache Management
5. Configuration Options
   5.1 searchStrategy
   5.2 searchPlaces
   5.3 loaders
   5.4 packageProp
   5.5 stopDir
   5.6 cache
   5.7 transform
   5.8 ignoreEmptySearchPlaces
6. Default Search Places
7. Default Loaders
8. Loading JS Modules
9. Caching
10. Differences from rc

1. Async API Instantiation
Function signature: cosmiconfig(moduleName: string, options?: CosmiconfigOptions): Explorer
moduleName must be filename-safe, no scoped names
Returns Explorer with initialized caches

2. Explorer.search
Signature: search(searchFrom?: string): Promise<Result|null>
Default searchFrom: process.cwd()
Result object structure: { config: any; filepath: string; isEmpty?: true }
Search order per directory: package.json property, .moduleName rc, .rc.json/.yaml/.yml/.js/.ts/.mjs/.cjs, .config subdir variants, moduleName.config.js/.ts/.mjs/.cjs
Strategy after current directory determined by searchStrategy: none, project, or global. global then checks OS config dir ~/.config/moduleName/

3. Explorer.load
Signature: load(loadPath: string): Promise<Result>
Reads loadPath via loader based on extension or noExt
Throws if file missing or parse error

4. Cache Management
clearLoadCache(): void clears load cache
clearSearchCache(): void clears search cache
clearCaches(): void calls both

5. Configuration Options
5.1 searchStrategy: none|project|global default none or global if stopDir set
5.2 searchPlaces: string[] default 22 paths built from moduleName
5.3 loaders: { [ext]: loader } merged with defaultLoaders; keys ext include '.js', '.json', '.yaml', '.ts', '.mjs', '.cjs', 'noExt'
5.4 packageProp: string|string[] default moduleName
5.5 stopDir: string default home directory
5.6 cache: boolean default true
5.7 transform: (result)=>Result|Promise<Result> transform cached result
5.8 ignoreEmptySearchPlaces: boolean default true

6. Default Search Places
Asynchronous default searchPlaces list of 22 file paths as above

7. Default Loaders
Ext to defaultLoaders mapping: see defaultLoaders export
Sync version excludes .mjs

8. Loading JS Modules
Async uses dynamic import for .js/.ts/.mjs/.cjs
Sync uses require for .js/.cjs only

9. Caching
Per-instance caches for search and load
Cache disabled by option cache=false or by clear methods

10. Differences from rc
Finds first config then stops, no merging
Built-in JSON, YAML, CommonJS support
Asynchronous by default

## Original Source
cosmiconfig
https://github.com/davidtheclark/cosmiconfig

## Digest of COSMICONFIG

# Installation

Installation Command

npm install cosmiconfig

Supported Environments

Node.js >=14

# Asynchronous API

Function: cosmiconfig(moduleName: string, options?: CosmiconfigOptions): Explorer

Explorer Methods:

search(searchFrom?: string): Promise<Result|null>
load(loadPath: string): Promise<Result>
clearLoadCache(): void
clearSearchCache(): void
clearCaches(): void

# Synchronous API

Function: cosmiconfigSync(moduleName: string, options?: CosmiconfigOptions): ExplorerSync

ExplorerSync Methods:

search(searchFrom?: string): Result|null
load(loadPath: string): Result
clearLoadCache(): void
clearSearchCache(): void
clearCaches(): void

# CosmiconfigOptions

searchStrategy: 'none' | 'project' | 'global'  default none unless stopDir is set then global
searchPlaces: string[]  default array of 22 paths based on moduleName
loaders: {[ext: string]: SyncLoader|AsyncLoader}  merged with defaultLoaders
packageProp: string|string[]  default moduleName
stopDir: string  default user home directory
cache: boolean  default true
transform: (result: Result)=> Result|Promise<Result>
ignoreEmptySearchPlaces: boolean  default true

# Default searchPlaces (async)

package.json
.${moduleName}rc
.${moduleName}rc.json
.${moduleName}rc.yaml
.${moduleName}rc.yml
.${moduleName}rc.js
.${moduleName}rc.ts
.${moduleName}rc.mjs
.${moduleName}rc.cjs
.config/${moduleName}rc
.config/${moduleName}rc.json
.config/${moduleName}rc.yaml
.config/${moduleName}rc.yml
.config/${moduleName}rc.js
.config/${moduleName}rc.ts
.config/${moduleName}rc.mjs
.config/${moduleName}rc.cjs
${moduleName}.config.js
${moduleName}.config.ts
${moduleName}.config.mjs
${moduleName}.config.cjs

# Default loaders (async)

Extension to function mapping:
.mjs -> loadJs
.cjs -> loadJs
.js  -> loadJs
.ts  -> loadTs
.json-> loadJson
.yaml-> loadYaml
.yml -> loadYaml
noExt-> loadYaml

# Loading JS modules

Async API uses dynamic import for .js,.ts,.mjs,.cjs
Sync API treats all .js/.cjs as CommonJS, ignores .mjs

# Caching

Each Explorer instance has separate caches for search and load
default cache=true
clearLoadCache clears load cache
e.g. explorer.clearLoadCache()

# Differences from rc

Stops at first found config, does not merge up-tree
Built-in JSON,YAML,CommonJS support
Asynchronous by default


## Attribution
- Source: cosmiconfig
- URL: https://github.com/davidtheclark/cosmiconfig
- License: MIT License
- Crawl Date: 2025-05-10T23:33:14.117Z
- Data Size: 1796518 bytes
- Links Found: 7855

## Retrieved
2025-05-10
library/WORKER_THREADS.md
# library/WORKER_THREADS.md
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
library/GAUSS_LEGENDRE.md
# library/GAUSS_LEGENDRE.md
# GAUSS_LEGENDRE

## Crawl Summary
Initial a0=1, b0=1/√2, t0=¼, p0=1. Iteration: a=(a+b)/2, b=√(ab), t=t−p(a−a_prev)^2, p=2p. π≈(a+b)^2/(4t). Quadratic convergence. Use arbitrary-precision, Newton–Raphson for √. Check |a−b|<ε.

## Normalised Extract
Table of Contents:
1. Variable Initialization
2. Iteration Formulae
3. Convergence Criterion
4. π Computation Formula
5. Implementation Steps
6. Precision & Performance

1. Variable Initialization
 set a=1, b=1/√2, t=0.25, p=1 using arbitrary-precision type.

2. Iteration Formulae
 a_next = (a + b) / 2
 b_next = sqrt(a * b)
 t_next = t − p * (a − a_next)^2
 p_next = 2 * p

3. Convergence Criterion
 stop when |a_next − b_next| <= ε where ε corresponds to target digit count.

4. π Computation Formula
 π ≈ ((a_final + b_final)^2) / (4 * t_final)

5. Implementation Steps
 - Choose precision bits = digits * log2(10) + margin
 - Initialize a,b,t,p
 - Loop compute next values storing previous a
 - Break when |a−b|<threshold
 - Apply π formula
 - Round/truncate to target digits.

6. Precision & Performance
 - Multiply cost M(n): use FFT-based libs for >10k digits
 - Square-root: Newton iteration: x_{k+1}=(x_k + N/x_k)/2 to same precision
 - Memory O(n) per big number

## Supplementary Details
Parameter definitions:
 ε: target error bound = 10^{-digits}
 Precision bits: bits = digits * 3.32193 + 16
 
Implementation options:
 - sqrt via library function or Newton–Raphson
 - Use balanced tree multiplication for large n
 
Error tracking:
 - track Δ = |a−b| each iteration
 - estimate digits ≈ −log10(Δ)


## Reference Details
Pseudocode:
```
function computePi(digits):
  bits = digits * log2(10) + 16
  a = BigFloat(1, bits)
  b = BigFloat(1, bits) / BigFloat(sqrt(2), bits)
  t = BigFloat(0.25, bits)
  p = BigFloat(1, bits)
  while true:
    a_next = (a + b) / 2
    b_next = sqrt(a * b)
    diff = a - a_next
    t = t - p * diff * diff
    p = p * 2
    a = a_next
    b = b_next
    if |a - b| < 10^{-digits}: break
  return ((a + b)*(a + b)) / (4 * t)
```

Best Practices:
- Preallocate big-int buffers to avoid GC
- Use FFT multiply for >1e4 digits
- Use Newton–Raphson sqrt as above
- Monitor convergence via Δ

Troubleshooting:
Command: run with digits=1e6 produces slow sqrt
Expected: use specialized sqrt routine
Solution: implement divide and Newton loop with cutoff


## Information Dense Extract
a0=1,b0=1/√2,t0=0.25,p0=1; loop an=(an-1+bn-1)/2,bn=√(an-1*bn-1),tn=tn-1−pn-1*(an-1−an)^2,pn=2pn-1 until |an−bn|<10^{-D}; π≈(aN+bN)^2/(4tN); precision bits=D*log2(10)+16; sqrt via Newton: x←(x+N/x)/2; use FFT multiplication; convergence quadratic

## Sanitised Extract
Table of Contents:
1. Variable Initialization
2. Iteration Formulae
3. Convergence Criterion
4.  Computation Formula
5. Implementation Steps
6. Precision & Performance

1. Variable Initialization
 set a=1, b=1/2, t=0.25, p=1 using arbitrary-precision type.

2. Iteration Formulae
 a_next = (a + b) / 2
 b_next = sqrt(a * b)
 t_next = t  p * (a  a_next)^2
 p_next = 2 * p

3. Convergence Criterion
 stop when |a_next  b_next| <=  where  corresponds to target digit count.

4.  Computation Formula
   ((a_final + b_final)^2) / (4 * t_final)

5. Implementation Steps
 - Choose precision bits = digits * log2(10) + margin
 - Initialize a,b,t,p
 - Loop compute next values storing previous a
 - Break when |ab|<threshold
 - Apply  formula
 - Round/truncate to target digits.

6. Precision & Performance
 - Multiply cost M(n): use FFT-based libs for >10k digits
 - Square-root: Newton iteration: x_{k+1}=(x_k + N/x_k)/2 to same precision
 - Memory O(n) per big number

## Original Source
Gauss–Legendre Algorithm
https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm

## Digest of GAUSS_LEGENDRE

# Gauss–Legendre Algorithm

## Initial Variable Definitions
```text
a0 = 1
b0 = 1/√2
t0 = 1/4
p0 = 1
```  
All variables are high-precision floating-point.  

## Iteration Loop
Repeat until |an+1 − bn+1| < ε where ε is target precision:  
```text
an+1 = (an + bn) / 2
bn+1 = √(an * bn)
tn+1 = tn − pn * (an − an+1)^2
pn+1 = 2 * pn
```  
Calculate √ via Newton–Raphson or library call.

## Final π Approximation
```text
π ≈ ((aN + bN)^2) / (4 * tN)
```

## Convergence Rate
Quadratic: digits double per iteration.

## Implementation Steps
1. Initialize variables a,b,t,p at required precision.  
2. Loop: compute next a,b,t,p.  
3. Check |a−b|.  
4. Exit when below threshold.  
5. Compute π.

## Precision & Memory Considerations
- Use arbitrary-precision library with O(M(n) log n) multiplication.  
- Each iteration O(M(n)), M(n)=cost of multiply.  
- Memory: O(n) for big ints.



## Attribution
- Source: Gauss–Legendre Algorithm
- URL: https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm
- License: CC BY-SA 3.0
- Crawl Date: 2025-05-10T19:58:01.586Z
- Data Size: 4985050 bytes
- Links Found: 26014

## Retrieved
2025-05-10
library/EXPRESS.md
# library/EXPRESS.md
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
library/DECIMALJS.md
# library/DECIMALJS.md
# DECIMALJS

## Crawl Summary
Constructor: Decimal(value:string|number|Decimal)->Decimal; supports decimal, binary(0b), octal(0o), hex(0x) formats with e/E and p/P exponents; throws DecimalError on invalid. Configuration: Decimal.set({precision:int1-1e9, rounding:0-8, toExpNeg:-9e15-0, toExpPos:0-9e15, minE:-9e15-0, maxE:0-9e15, modulo:0-9, crypto:bool}); Decimal.clone([object])->new constructor. Methods: add, sub, mul, div, mod, pow with aliases plus, minus, times, dividedBy, modulo, toPower. Rounding: ceil, floor, round, trunc, toDecimalPlaces, toSignificantDigits. Comparison: cmp, eq, lt, lte, gt, gte. Conversion: toString, toNumber, toJSON, toFixed, toExponential, toPrecision. Random: Decimal.random([dp])->Decimal using crypto or Math.random. Default settings: precision=20, rounding=4, toExpNeg=-7, toExpPos=20, minE=-9e15, maxE=9e15, modulo=1, crypto=false.

## Normalised Extract
Table of Contents:
1 Constructor
2 Configuration Options
3 Arithmetic Operations
4 Rounding and Truncation
5 Comparison
6 Conversion
7 Random Number Generation

1 Constructor
Signature: Decimal(value) -> Decimal
Parameters:
  value: number | string | Decimal
Supported string literals:
  - Decimal: '123.456', '4.321e+4', '-735.0918e-430'
  - Binary (0b): '0b1011.01', '0b1.1p-5'
  - Octal (0o): '0o7.4', '0o1.4p-5'
  - Hexadecimal (0x): '0xff.8', '0x1.8p-5'
Behaviour:
  - Throws DecimalError on invalid value
  - Exponent range enforced by minE and maxE

2 Configuration Options
Method: Decimal.set(object) -> Decimal constructor
object properties:
  precision: integer 1–1e9 default 20
  rounding: integer 0–8 default 4
  toExpNeg: integer –9e15–0 default –7
  toExpPos: integer 0–9e15 default 20
  minE: integer –9e15–0 default –9e15
  maxE: integer 0–9e15 default 9e15
  modulo: integer 0–9 default 1
  crypto: boolean default false
Direct assignment bypasses validation. Use set for safety.
Clone: Decimal.clone([object]) -> new Decimal constructor with independent settings

3 Arithmetic Operations
add(x,y) / plus(y) -> Decimal
sub(x,y) / minus(y) -> Decimal
mul(x,y) / times(y) -> Decimal
div(x,y) / dividedBy(y) -> Decimal
mod(x,y) / modulo(y) -> Decimal
pow(base,exp) / toPower(exp) -> Decimal
All operations return new Decimal rounded to precision significant digits using rounding mode.

4 Rounding and Truncation
ceil(x)/ceil() -> Decimal rounded toward +Infinity
floor(x)/floor() -> Decimal toward –Infinity
round(x)/round() -> Decimal nearest
trunc(x)/trunc() -> Decimal toward zero
toDecimalPlaces(dp)/toDP(dp) -> Decimal with dp decimals
toSignificantDigits(sd)/toSD(sd) -> Decimal with sd significant digits

5 Comparison
cmp(x) / comparedTo(x) -> number {–1,0,1,NaN}
eq(x)/equals(x) -> boolean
lt(x), lte(x), gt(x), gte(x) -> boolean

6 Conversion
toString(), toNumber(), toJSON() -> string|number
toFixed(dp) -> string with dp decimals
toExponential(dp) -> string in exponential form
toPrecision(sd) -> string with sd significant digits

7 Random Number Generation
random([dp]) -> Decimal
  dp: integer 0–1e9 default precision
  if crypto=true and global crypto available uses secure PRNG, else Math.random
  throws if crypto=true but no crypto object

## Supplementary Details
Exponent Limits:
  - minE: lowest exponent before underflow to zero, default –9e15
  - maxE: highest exponent before overflow to Infinity, default 9e15
Modulo Modes:
  - ROUND_UP (0), ROUND_DOWN (1), ROUND_CEIL (2), ROUND_FLOOR (3), ROUND_HALF_UP (4), ROUND_HALF_DOWN (5), ROUND_HALF_EVEN (6), ROUND_HALF_CEIL (7), ROUND_HALF_FLOOR (8), EUCLID (9)
  - modulo property sets division remainder mode
Crypto Integration:
  - global.crypto = require('crypto') in Node.js
  - Decimal.set({ crypto: true }) to enable secure random
Clone Patterns:
  - Decimal9 = Decimal.clone({ precision: 9 })
  - D2 = Decimal.clone({ defaults: true, precision: 50 })
Best Practice:
  - Use clone to isolate configuration per module
  - Always use set with defaults:true to reset config

NoConflict (Browser):
  - Decimal.noConflict() -> original constructor
Errors:
  - Decimal.set({ precision: 0 }) throws DecimalError: Invalid argument: precision: 0
  - new Decimal('invalid') throws DecimalError: Invalid argument: value: invalid

## Reference Details
API Signatures:
Constructor:
  new Decimal(value: number|string|Decimal) -> Decimal
Configuration:
  Decimal.set(object: {
    precision?: number, rounding?: number, toExpNeg?: number, toExpPos?: number,
    minE?: number, maxE?: number, modulo?: number, crypto?: boolean, defaults?: boolean
  }) -> this Decimal constructor
  Decimal.clone(object?: as above) -> new Decimal constructor
Arithmetic Methods:
  static add(x: number|string|Decimal, y: number|string|Decimal) -> Decimal
  instance plus(y: number|string|Decimal) -> Decimal
  static sub(x, y) / instance minus(y) -> Decimal
  static mul(x, y) / instance times(y) -> Decimal
  static div(x, y) / instance dividedBy(y) -> Decimal
  static mod(x, y) / instance modulo(y) -> Decimal
  static pow(base: any, exponent: any) / instance toPower(exponent) -> Decimal
Rounding and Truncation:
  static ceil(x) / instance ceil() -> Decimal
  static floor(x) / instance floor() -> Decimal
  static round(x) / instance round() -> Decimal
  static trunc(x) / instance trunc() -> Decimal
  instance toDP(dp: number, rm?: number) -> Decimal
  instance toSD(sd: number, rm?: number) -> Decimal
Comparison:
  instance cmp(x) -> number
  instance eq(x) -> boolean
  instance lt(x), lte(x), gt(x), gte(x) -> boolean
Conversion:
  instance toString() -> string
  instance toNumber() -> number
  instance toJSON() -> string
  instance toFixed(dp: number, rm?: number) -> string
  instance toExponential(dp?: number, rm?: number) -> string
  instance toPrecision(sd?: number, rm?: number) -> string
Random:
  static random(dp?: number) -> Decimal

Code Examples:
// Constructor
let x = new Decimal('1.234e+2')    // '123.4'
// Configuration
Decimal.set({ precision: 10, rounding: Decimal.ROUND_HALF_EVEN })
// Clone
const D50 = Decimal.clone({ precision: 50 })
// Arithmetic
let sum = Decimal.add('0.1', '0.2')
let prod = new Decimal(5).times('3')
// Rounding
let r = new Decimal('1.005').toDP(2, Decimal.ROUND_HALF_UP) // '1.01'
// Conversion
let s = new Decimal(0.000123).toExponential(3) // '1.230e-4'
// Random
global.crypto = require('crypto')
Decimal.set({ crypto: true })
let rnd = Decimal.random(16)

Troubleshooting:
// Invalid precision
try {
  Decimal.set({ precision: 0 })
} catch (e) {
  console.error(e.message) // Invalid argument: precision: 0
}
// Missing crypto
try {
  Decimal.set({ crypto: true })
  Decimal.random()
} catch (e) {
  console.error(e.message) // Exception: crypto object not available
}

## Information Dense Extract
Decimal(value)->Decimal; value:number|string|Decimal; string supports decimal,0b,0o,0x prefixes and e/E, p/P exponents; Decimal.set({precision:1–1e9 default20, rounding:0–8 default4, toExpNeg:-9e15–0 default-7, toExpPos:0–9e15 default20, minE:-9e15–0 default-9e15, maxE:0–9e15 default9e15, modulo:0–9 default1, crypto:false}); Decimal.clone([cfg])->new Decimal; Arithmetic: add, sub, mul, div, mod, pow with aliases; Rounding: ceil, floor, round, trunc, toDP, toSD; Comparison: cmp, eq, lt, lte, gt, gte; Conversion: toString, toNumber, toJSON, toFixed, toExponential, toPrecision; Random(dp)->Decimal uses crypto or Math.random; Rounding modes: 0:UP,1:DOWN,2:CEIL,3:FLOOR,4:HALF_UP,5:HALF_DOWN,6:HALF_EVEN,7:HALF_CEIL,8:HALF_FLOOR,9:EUCLID; Errors: DecimalError on invalid args; Exponent limits: underflow below minE->0, overflow above maxE->Infinity.

## Sanitised Extract
Table of Contents:
1 Constructor
2 Configuration Options
3 Arithmetic Operations
4 Rounding and Truncation
5 Comparison
6 Conversion
7 Random Number Generation

1 Constructor
Signature: Decimal(value) -> Decimal
Parameters:
  value: number | string | Decimal
Supported string literals:
  - Decimal: '123.456', '4.321e+4', '-735.0918e-430'
  - Binary (0b): '0b1011.01', '0b1.1p-5'
  - Octal (0o): '0o7.4', '0o1.4p-5'
  - Hexadecimal (0x): '0xff.8', '0x1.8p-5'
Behaviour:
  - Throws DecimalError on invalid value
  - Exponent range enforced by minE and maxE

2 Configuration Options
Method: Decimal.set(object) -> Decimal constructor
object properties:
  precision: integer 11e9 default 20
  rounding: integer 08 default 4
  toExpNeg: integer 9e150 default 7
  toExpPos: integer 09e15 default 20
  minE: integer 9e150 default 9e15
  maxE: integer 09e15 default 9e15
  modulo: integer 09 default 1
  crypto: boolean default false
Direct assignment bypasses validation. Use set for safety.
Clone: Decimal.clone([object]) -> new Decimal constructor with independent settings

3 Arithmetic Operations
add(x,y) / plus(y) -> Decimal
sub(x,y) / minus(y) -> Decimal
mul(x,y) / times(y) -> Decimal
div(x,y) / dividedBy(y) -> Decimal
mod(x,y) / modulo(y) -> Decimal
pow(base,exp) / toPower(exp) -> Decimal
All operations return new Decimal rounded to precision significant digits using rounding mode.

4 Rounding and Truncation
ceil(x)/ceil() -> Decimal rounded toward +Infinity
floor(x)/floor() -> Decimal toward Infinity
round(x)/round() -> Decimal nearest
trunc(x)/trunc() -> Decimal toward zero
toDecimalPlaces(dp)/toDP(dp) -> Decimal with dp decimals
toSignificantDigits(sd)/toSD(sd) -> Decimal with sd significant digits

5 Comparison
cmp(x) / comparedTo(x) -> number {1,0,1,NaN}
eq(x)/equals(x) -> boolean
lt(x), lte(x), gt(x), gte(x) -> boolean

6 Conversion
toString(), toNumber(), toJSON() -> string|number
toFixed(dp) -> string with dp decimals
toExponential(dp) -> string in exponential form
toPrecision(sd) -> string with sd significant digits

7 Random Number Generation
random([dp]) -> Decimal
  dp: integer 01e9 default precision
  if crypto=true and global crypto available uses secure PRNG, else Math.random
  throws if crypto=true but no crypto object

## Original Source
Decimal.js
https://mikemcl.github.io/decimal.js/

## Digest of DECIMALJS

# Decimal.js Detailed Digest (Retrieved 2024-06-13)

# Constructor
- Signature: Decimal(value) -> Decimal
- value types: number, string, Decimal
- string formats: decimal, binary (0b/0B), octal (0o/0O), hexadecimal (0x/0X)
- exponential notation: decimal uses e/E; non-decimal uses p/P
- allowable exponent range bounded by minE and maxE
- throws DecimalError on invalid value

# Configuration
- Decimal.set(object) -> this Decimal constructor
- object properties:
  - precision: integer 1 to 1e9 inclusive, default 20
  - rounding: integer 0 to 8 inclusive, default 4 (ROUND_HALF_UP)
  - toExpNeg: integer -9e15 to 0 inclusive, default -7
  - toExpPos: integer 0 to 9e15 inclusive, default 20
  - minE: integer -9e15 to 0 inclusive, default -9e15
  - maxE: integer 0 to 9e15 inclusive, default 9e15
  - modulo: integer 0 to 9 inclusive, default 1 (ROUND_DOWN)
  - crypto: boolean, default false
- Decimal.clone([object]) -> new independent Decimal constructor with same or specified settings

# Core Methods
- Arithmetic:
  - add(x,y) / plus(y)        -> Decimal
  - sub(x,y) / minus(y)       -> Decimal
  - mul(x,y) / times(y)       -> Decimal
  - div(x,y) / dividedBy(y)   -> Decimal
  - mod(x,y) / modulo(y)      -> Decimal
  - pow(base,exp) / toPower(exp) -> Decimal
- Rounding and truncation:
  - ceil(x) / ceil()         -> Decimal
  - floor(x) / floor()       -> Decimal
  - round(x) / round()       -> Decimal
  - trunc(x) / trunc()       -> Decimal
  - toDecimalPlaces(dp)/toDP(dp)     -> Decimal
  - toSignificantDigits(sd)/toSD(sd) -> Decimal
- Comparison:
  - cmp(x) / comparedTo(x)   -> number (-1,0,1,NaN)
  - eq(x) / equals(x)        -> boolean
  - lt(x), lte(x), gt(x), gte(x) -> boolean
- Conversion:
  - toString(), toNumber(), toJSON() -> string | number
  - toFixed(dp), toExponential(dp), toPrecision(sd) -> string

# Random Number Generation
- Decimal.random([dp]) -> Decimal
  - dp: integer 0 to 1e9 inclusive, default current precision
  - if crypto=true and global crypto available uses crypto.getRandomValues or crypto.randomBytes, else Math.random
  - throws if crypto=true but no crypto object

# Errors
- DecimalError thrown by constructor or set on invalid argument or configuration

# Attribution
Source: https://mikemcl.github.io/decimal.js/  Data Size: 13874875 bytes

## Attribution
- Source: Decimal.js
- URL: https://mikemcl.github.io/decimal.js/
- License: MIT License
- Crawl Date: 2025-05-11T00:44:40.798Z
- Data Size: 13874875 bytes
- Links Found: 21129

## Retrieved
2025-05-11
library/PROPER_LOCKFILE.md
# library/PROPER_LOCKFILE.md
# PROPER_LOCKFILE

## Crawl Summary


## Normalised Extract


## Supplementary Details


## Reference Details


## Information Dense Extract


## Sanitised Extract


## Original Source
Atomic File Writes and Locking
https://github.com/atomicjolt/proper-lockfile#readme

## Digest of PROPER_LOCKFILE



## Attribution
- Source: Atomic File Writes and Locking
- URL: https://github.com/atomicjolt/proper-lockfile#readme
- License: License: MIT
- Crawl Date: 2025-05-10T11:57:27.134Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
library/CLI_PROGRESS.md
# library/CLI_PROGRESS.md
# CLI_PROGRESS

## Crawl Summary
No technical details available; source returned zero bytes.

## Normalised Extract
Table of Contents:
1. Overview
2. Installation
3. API Methods
4. Configuration Options

No content available for each section.

## Supplementary Details
None available.

## Reference Details
None available.

## Information Dense Extract
No technical details available; source returned zero bytes.

None available.

None available.

# CLI Progress Bars

No content retrieved from source.

## Sanitised Extract
Table of Contents:
1. Overview
2. Installation
3. API Methods
4. Configuration Options

No content available for each section.

## Original Source
CLI Progress Bars
https://github.com/cli-progress/cli-progress#readme

## Digest of CLI_PROGRESS

# CLI Progress Bars

No content retrieved from source.

## Attribution
- Source: CLI Progress Bars
- URL: https://github.com/cli-progress/cli-progress#readme
- License: License: MIT
- Crawl Date: 2025-05-10T10:02:21.081Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
library/SWAGGER_UI_EXPRESS.md
# library/SWAGGER_UI_EXPRESS.md
# SWAGGER_UI_EXPRESS

## Crawl Summary
Exposes three middleware functions: serve, serveFiles(document?, options?), setup(document?, options?).  setup options include explorer:boolean(default false), swaggerOptions with validatorUrl|null, url or urls[], customCss|string, customCssUrl|string|string[], customJs|string|string[], customJsStr|string|string[].  Supports loading from local JSON/YAML, remote URL, multiple specs dropdown, inline CSS/JS injection, dynamic per-request docs via req.swaggerDoc, and multiple UI instances.  Requires Node>=0.10.32, Express>=4.  Installation via npm install swagger-ui-express.  Serve static assets before setup handler.  Examples include Express app and Router patterns.

## Normalised Extract
Table of Contents
1 Installation
2 Middleware Functions
3 Setup Options
4 SwaggerOptions
5 Custom CSS Injection
6 Custom JS Injection
7 Loading from URL
8 Loading YAML
9 Dynamic Request Docs
10 Multiple UI Instances
11 Link Endpoint
12 Requirements
13 Testing

1 Installation
  npm install swagger-ui-express

2 Middleware Functions
  Import: const swaggerUi = require('swagger-ui-express')
  Serve static assets: swaggerUi.serve
  Serve files & index: swaggerUi.serveFiles(swaggerDocument?, options?)
  Render UI HTML: swaggerUi.setup(swaggerDocument?, options?)

3 Setup Options
  explorer:boolean (default false)
  customCss:string
  customCssUrl:string|string[]
  customJs:string|string[]
  customJsStr:string|string[]

4 SwaggerOptions
  validatorUrl:string|null
  url:string               // when initial document null
  urls: [{url:string, name:string}]

5 Custom CSS Injection
  customCss applies raw CSS string after base styles
  customCssUrl loads external CSS files

6 Custom JS Injection
  customJs loads external JS files
  customJsStr embeds inline JS strings

7 Loading from URL
  setup(null, { swaggerOptions: { url: 'http://...' } })

8 Loading YAML
  Use yaml.parse on fs.readFileSync
  Pass parsed object to setup

9 Dynamic Request Docs
  In middleware set req.swaggerDoc = modifiedDocument
  Use serveFiles() and setup() with no arguments

10 Multiple UI Instances
  Use serveFiles(doc, opts) then setup(doc)
  Register distinct routes per instance

11 Link Endpoint
  app.get('/path/swagger.json', res.json(document))
  setup(null, { swaggerOptions: { url: '/path/swagger.json' } })

12 Requirements
  Node >=0.10.32
  Express >=4

13 Testing
  npm install phantom
  npm test

## Supplementary Details
Version pinning: swagger UI assets pulled from swagger-ui-dist; lock the version via package-lock.json or yarn.lock to ensure consistent UI across environments.  Implementation steps: 1. npm install swagger-ui-express 2. require module 3. import or parse swagger spec 4. app.use/or router.use static assets via swaggerUi.serve or swaggerUi.serveFiles 5. mount setup handler swaggerUi.setup with spec and options 6. open /api-docs 7. optional: add express middleware before serveFiles to modify req.swaggerDoc 8. for YAML use yaml module 9. for multiple specs use swaggerOptions.urls array 10. for CSS/JS injection use customCss, customCssUrl, customJs, customJsStr.  Example router integration: const router = express.Router(); router.use('/docs', swaggerUi.serve); router.get('/docs', swaggerUi.setup(swaggerSpec, { explorer: true })); app.use(router).

## Reference Details
/* Module Import */
const swaggerUi = require('swagger-ui-express')

/* Middleware Signatures */
serve: (req: Request, res: Response, next: NextFunction) => void
serveFiles: (swaggerDocument?: object, options?: SetupOptions) => (req: Request, res: Response, next: NextFunction) => void
setup: (swaggerDocument?: object, options?: SetupOptions) => (req: Request, res: Response, next: NextFunction) => void

/* SetupOptions Interface */
interface SetupOptions {
  explorer?: boolean               // default false
  swaggerOptions?: {
    url?: string                   // load spec from URL
    urls?: { url: string; name: string }[] // multiple specs dropdown
    validatorUrl?: string | null   // default online validator, null disables
    filter?: boolean | string
    docExpansion?: 'none' | 'list' | 'full'
    defaultModelsExpandDepth?: number
    defaultModelExpandDepth?: number
    defaultModelRendering?: 'example' | 'model'
    displayRequestDuration?: boolean
    operationsSorter?: string | ((a,b) => number)
    tagsSorter?: string | ((a,b) => number)
    supportedSubmitMethods?: string[]
    showExtensions?: boolean
    showCommonExtensions?: boolean
  }
  customCss?: string               // raw CSS
  customCssUrl?: string | string[] // external CSS URLs
  customJs?: string | string[]     // external JS URLs
  customJsStr?: string | string[]  // inline JS strings
}

/* Example Code Patterns */
// Basic setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Explorer bar
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))

// Custom validator
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { swaggerOptions: { validatorUrl: null } }))

// Inline CSS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss: '.topbar { display: none }' }))

// Multiple specs dropdown
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { explorer: true, swaggerOptions: { urls: [{ url:'a.json', name:'A' },{ url:'b.json', name:'B' }] } }))

// YAML load
const YAML = require('yaml')
const fs = require('fs')
const doc = YAML.parse(fs.readFileSync('swagger.yaml','utf8'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc))

// Dynamic host
app.use('/api-docs', (req,_,next) => { req.swaggerDoc = Object.assign({}, swaggerDocument, { host: req.get('host') }); next() }, swaggerUi.serveFiles(), swaggerUi.setup())

// Troubleshooting
// 1. Verify JSON parse errors: console.log(swaggerDocument)
// 2. Check route ordering: static assets before setup
// 3. Curl health check: curl -I http://localhost:3000/api-docs | grep HTTP
// Expected: HTTP/1.1 200 OK

/* Requirements */
// Node v0.10.32+  Express 4+

/* Testing */
// npm install phantom
// npm test


## Information Dense Extract
serve:RequestHandler; serveFiles(doc?:object,opts?:{explorer?:boolean,swaggerOptions?:{url?:string,urls?:{url,name}[],validatorUrl?:string|null},customCss?:string,customCssUrl?:string|string[],customJs?:string|string[],customJsStr?:string|string[]}):RequestHandler; setup(doc?:object,opts?:Same):RequestHandler; usage: npm install swagger-ui-express; import const swaggerUi=require('swagger-ui-express'); app.use('/api-docs',serve,setup(doc,opts)); key opts: explorer:boolean(false), swaggerOptions:{validatorUrl:null, url:string, urls:[{url,name}]}, customCss:string, customCssUrl:string|string[], customJs:string|string[], customJsStr:string|string[]; YAML: use yaml.parse(fs.readFileSync); dynamic: req.swaggerDoc before serveFiles(); multiple: serveFiles(doc1),setup(doc1) on separate routes; link JSON: app.get('/swagger.json',res.json(doc)); setup(null,{swaggerOptions:{url:'/swagger.json'}}); requires Node>=0.10.32, Express>=4; tests: npm install phantom && npm test

## Sanitised Extract
Table of Contents
1 Installation
2 Middleware Functions
3 Setup Options
4 SwaggerOptions
5 Custom CSS Injection
6 Custom JS Injection
7 Loading from URL
8 Loading YAML
9 Dynamic Request Docs
10 Multiple UI Instances
11 Link Endpoint
12 Requirements
13 Testing

1 Installation
  npm install swagger-ui-express

2 Middleware Functions
  Import: const swaggerUi = require('swagger-ui-express')
  Serve static assets: swaggerUi.serve
  Serve files & index: swaggerUi.serveFiles(swaggerDocument?, options?)
  Render UI HTML: swaggerUi.setup(swaggerDocument?, options?)

3 Setup Options
  explorer:boolean (default false)
  customCss:string
  customCssUrl:string|string[]
  customJs:string|string[]
  customJsStr:string|string[]

4 SwaggerOptions
  validatorUrl:string|null
  url:string               // when initial document null
  urls: [{url:string, name:string}]

5 Custom CSS Injection
  customCss applies raw CSS string after base styles
  customCssUrl loads external CSS files

6 Custom JS Injection
  customJs loads external JS files
  customJsStr embeds inline JS strings

7 Loading from URL
  setup(null, { swaggerOptions: { url: 'http://...' } })

8 Loading YAML
  Use yaml.parse on fs.readFileSync
  Pass parsed object to setup

9 Dynamic Request Docs
  In middleware set req.swaggerDoc = modifiedDocument
  Use serveFiles() and setup() with no arguments

10 Multiple UI Instances
  Use serveFiles(doc, opts) then setup(doc)
  Register distinct routes per instance

11 Link Endpoint
  app.get('/path/swagger.json', res.json(document))
  setup(null, { swaggerOptions: { url: '/path/swagger.json' } })

12 Requirements
  Node >=0.10.32
  Express >=4

13 Testing
  npm install phantom
  npm test

## Original Source
Swagger UI Express Middleware
https://github.com/scottie1984/swagger-ui-express

## Digest of SWAGGER_UI_EXPRESS

# SWAGGER UI EXPRESS

This module adds middleware to Express to serve Swagger UI based on a Swagger JSON/YAML document.

# Usage

```bash
npm install swagger-ui-express
```  
```js
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)
```  
Or with Express Router:
```js
const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))
```  

Open `http://<host>:<port>/api-docs` to view.

# API Methods

## swaggerUi.serve
Express middleware (Request, Response, Next) serving Swagger UI static assets.

## swaggerUi.serveFiles(document, options)
Signature: `serveFiles(swaggerDocument?: Object, options?: SetupOptions): RequestHandler`  
Serves static assets and index with provided document.

## swaggerUi.setup(document, options)
Signature: `setup(swaggerDocument?: Object, options?: SetupOptions): RequestHandler`  
Renders Swagger UI HTML page bound to `swaggerDocument`.

# Configuration Options

Pass second parameter to `setup()` with the following shape:

```js
const options = {
  explorer: true,                // display search bar
  swaggerOptions: {              // passed directly to Swagger UI
    validatorUrl: null,          // disable online validator
    url: 'http://example.com',   // load from URL if first param null
    urls: [                      // dropdown of multiple specs
      { url: 'http://a.json', name: 'A' },
      { url: 'http://b.json', name: 'B' }
    ]
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customCssUrl: ['/c1.css', 'https://x/c2.css'],
  customJs: ['/c1.js', 'https://x/c2.js'],
  customJsStr: ['console.log("Hello")', 'var x=1']
}
```  

Refer to Swagger UI Configuration for full list.

# Loading YAML

```bash
npm install yaml
```  
```js
const fs = require('fs')
const YAML = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
```

# Dynamic Document

```js
app.use(
  '/api-docs',
  (req, res, next) => {
    req.swaggerDoc = /* modified JSON */
    next()
  },
  swaggerUi.serveFiles(),
  swaggerUi.setup()
)
```

# Multiple Instances

```js
app.use(
  '/docs1',
  swaggerUi.serveFiles(doc1, opts),
  swaggerUi.setup(doc1)
)
app.use(
  '/docs2',
  swaggerUi.serveFiles(doc2, opts),
  swaggerUi.setup(doc2)
)
```

# Link to Swagger JSON

```js
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument))
const options = { swaggerOptions: { url: '/api-docs/swagger.json' } }
app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options))
```

# Requirements

Node >= 0.10.32  
Express >= 4

# Testing

```bash
npm install phantom
npm test
```

## Attribution
- Source: Swagger UI Express Middleware
- URL: https://github.com/scottie1984/swagger-ui-express
- License: MIT License
- Crawl Date: 2025-05-11T02:58:12.310Z
- Data Size: 1061638 bytes
- Links Found: 5606

## Retrieved
2025-05-11
library/ZOD_CORE.md
# library/ZOD_CORE.md
# ZOD_CORE

## Crawl Summary
Installation: TS4.5+, enable strict. npm|yarn|pnpm|bun|deno install zod. Basic Usage: z.string, z.object, z.infer. Primitives: z.string, z.number, z.bigint, z.boolean, z.date, empty/catchall types. Coercion: z.coerce.* uses built-in constructors. Parsing: .parse, .parseAsync, .safeParse, .safeParseAsync. Composition: object, array, tuple, union, discriminatedUnion, record, map, set, intersection. Schema methods: .extend, .merge, .pick/.omit, .partial/.deepPartial, .required, .strict/.passthrough/.strip/.catchall. Refinements: .refine, .superRefine; transforms: .transform, .preprocess, .pipe. Enums: z.enum, z.nativeEnum with .enum and .options, .extract/.exclude. Helpers: .optional, .nullable. Advanced: .lazy for recursion, ZodType<>, function schemas, z.instanceof. Errors: custom messages. Troubleshooting: cycles, promise schemas, boolean coercion caveats.

## Normalised Extract
Table of Contents:
1. Installation
2. Basic Usage
3. Primitives & Coercion
4. Parsing Methods
5. Schema Composition
6. Refinements & Transforms
7. Enums & Helpers
8. Advanced Patterns
9. Troubleshooting

1. Installation
   - Requirements: TypeScript>=4.5, tsconfig.json strict=true
   - Commands: npm install zod | yarn add zod | pnpm add zod | bun add zod | deno add npm:zod
   - Canary: install zod@canary

2. Basic Usage
   import { z } from "zod"
   z.string().parse("foo")           // returns "foo"
   z.string().safeParse(123)           // { success:false,... }
   const User = z.object({ username:z.string() })
   User.parse({ username:"alice" })  // returns object
   type User = z.infer<typeof User>    // { username: string }

3. Primitives & Coercion
   z.string(opts?), z.number(opts?), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()
   z.coerce.string() -> String(input)
   z.coerce.number() -> Number(input)
   z.coerce.boolean() -> Boolean(input)
   z.coerce.date() -> new Date(input)

4. Parsing Methods
   .parse(data:unknown):T
   .parseAsync(data:unknown):Promise<T>
   .safeParse(data:unknown):{success:boolean;data?:T;error?:ZodError}
   .safeParseAsync(data:unknown):Promise<same>

5. Schema Composition
   Objects: z.object(shape)
      .extend(fields), .merge(obj)
      .pick(keys), .omit(keys)
      .partial(keys?), .deepPartial()
      .required(keys?)
      .strict(), .passthrough(), .strip(), .catchall(schema)
   Arrays: z.array(item)
      .nonempty({message}), .min(n,{message}), .max(n), .length(n)
   Tuples: z.tuple([schemas]).rest(schema)
   Unions: z.union([schemas]), schema1.or(schema2)
   Discriminated union: z.discriminatedUnion(key, options[])
   Record: z.record(keySchema,valueSchema)
   Map: z.map(keySchema,valueSchema)
   Set: z.set(item).nonempty()/min()/max()/size()
   Intersection: z.intersection(A,B) or A.and(B)

6. Refinements & Transforms
   .refine(validator,val=>boolean, {message?,path?})
   .superRefine((val,ctx)=>ctx.addIssue({code,path,message}))
   .transform(fn:val=>newVal)
   .preprocess(fn:input=>converted, targetSchema)
   .pipe(schema)

7. Enums & Helpers
   z.enum(["A","B",...]) -> ZodEnum
      .enum property, .options, .extract(vals), .exclude(vals)
   z.nativeEnum(NativeEnumObj)
   .optional(), .nullable()

8. Advanced Patterns
   z.lazy(()=>schema) for recursion
   const schema: ZodType<Output,Def,Input> = base.extend({})
   z.function().args(...schemas).returns(schema).implement(fn)
   z.instanceof(Class)

9. Troubleshooting
   - Cyclical object loops: detect or preprocess
   - Promise schemas: .parse returns Promise; catch errors via .catch
   - Boolean coercion caveat: truthy->true, falsy->false; use z.preprocess for custom logic



## Supplementary Details
Type Inference:
- z.infer<typeof Schema> extracts output type.
- z.input<typeof EffectsSchema> and z.output<typeof EffectsSchema> for ZodEffects.

TS Config:
- strict:true required.

Error Customization:
- schema methods accept optional params: { message:string, path:(string|number)[] }.

Catchall Config:
- .catchall(zSchema) validates unknown keys against zSchema.

Schema Unknown Key Policies:
- Default: strip unknown.
- .passthrough(): keep unknown.
- .strict(): error on unknown.
- .strip(): revert to strip.

Function Schemas:
- z.function(): base
   .args(z.string(),z.number(),...)
   .returns(z.boolean())
   .implement((...args)=>output)

Coercion Caveats:
- Boolean: z.coerce.boolean() maps any truthy to true, any falsy to false.
- Use z.preprocess for custom casts.

Lazy & Recursive:
- z.lazy(()=>schema) wrap self-referencing definitions.
- Provide ZodType<Out,Def,In> when input/output differ.



## Reference Details
### z.string([options])
Signature: z.string(opts?: { required_error?: string; invalid_type_error?: string }) -> ZodString
Methods:
- min(min: number, ctx?: { message?: string; }): ZodString
- max(max: number, ctx?: { message?: string; }): ZodString
- length(len: number, ctx?: { message?: string; }): ZodString
- email(ctx?: { message?: string; }): ZodString
- url(ctx?: { message?: string; }): ZodString
- regex(regex: RegExp, ctx?: { message?: string; }): ZodString
- includes(substr: string, ctx?: { message?: string; }): ZodString
- startsWith(substr: string, ctx?: { message?: string; }): ZodString
- endsWith(substr: string, ctx?: { message?: string; }): ZodString
- datetime(opts?: { offset?: boolean; local?: boolean; precision?: number; message?: string; }): ZodString
- date(): ZodString  // YYYY-MM-DD
- time(opts?: { precision?: number; message?: string; }): ZodString
- ip(opts?: { version?: "v4"|"v6"; message?: string; }): ZodString
- cidr(opts?: { version?: "v4"|"v6"; message?: string; }): ZodString
- trim(): ZodString
- toLowerCase(): ZodString
- toUpperCase(): ZodString
- brand<B extends string>(): ZodBranded<ZodString,B>
- optional(): ZodOptional<ZodString>
- nullable(): ZodNullable<ZodString>
- array(): ZodArray<ZodString>
- promise(): ZodPromise<ZodString>
- or<Other>(other: ZodType<Other>): ZodUnion<[ZodString, ZodType<Other>]> 
- and<Other>(other: ZodType<Other>): ZodIntersection<ZodString, ZodType<Other>>

Parsing:
- .parse(data): string  // throws ZodError
- .parseAsync(data): Promise<string>
- .safeParse(data): { success:true; data:string } | { success:false; error:ZodError }
- .safeParseAsync(data): Promise< same >

Refinement & Transform:
- .refine((val:string)=>boolean, { message?:string; path?: Path; }) -> ZodString
- .superRefine((val:string, ctx)=>void) -> ZodString
- .transform((val:string)=>U) -> ZodEffects<ZodString,U>

### z.number([options])
Signature: z.number(opts?: { required_error?: string; invalid_type_error?: string }) -> ZodNumber
Methods:
- min(min: number, ctx?: { message?: string; }): ZodNumber
- max(max: number, ctx?: { message?: string; }): ZodNumber
- int(): ZodNumber
- positive(): ZodNumber
- nonnegative(): ZodNumber
- negative(): ZodNumber
- nonpositive(): ZodNumber
- multipleOf(factor: number): ZodNumber
- finite(): ZodNumber
- safe(): ZodNumber

### z.object(shape)
Signature: z.object<T extends ZodRawShape>(shape: T) -> ZodObject<T>
Methods:
- .extend<New extends ZodRawShape>(newShape: New): ZodObject<T & New>
- .merge<U extends ZodRawShape>(other: ZodObject<U>): ZodObject<T & U>
- .pick<Keys extends keyof T>(keys: Record<Keys, true>): ZodObject<Pick<T, Keys>>
- .omit<Keys extends keyof T>(keys: Record<Keys, true>): ZodObject<Omit<T, Keys>>
- .partial<Keys extends keyof T>(keys?: Record<Keys, true>): ZodObject<Partial<T>>
- .deepPartial(): ZodObject<DeepPartial<T>>
- .required<Keys extends keyof T>(keys?: Record<Keys, true>): ZodObject<Required<T>>
- .strict(): ZodObject<T>  // error on unknown keys
- .passthrough(): ZodObject<T>  // keep unknown keys
- .strip(): ZodObject<T>  // strip unknown keys
- .catchall<SChema>(schema: ZodType<SChema>): ZodObject<T>  // validate unknown keys

### z.array(item)
Signature: z.array<T extends ZodType>(schema: T) -> ZodArray<T>
Methods:
- .nonempty(ctx?: { message?: string }): ZodNonEmptyArray<T>
- .min(min: number, ctx?: { message?: string }): ZodArray<T>
- .max(max: number, ctx?: { message?: string }): ZodArray<T>
- .length(len: number, ctx?: { message?: string }): ZodArray<T>

### z.union(schemas)
Signature: z.union<T extends [ZodType,...ZodType[]]>(schemas: T) -> ZodUnion<T>
Alternative: schema1.or(schema2)

### z.discriminatedUnion(key: string, schemas: ZodObject[]): ZodDiscriminatedUnion

### z.tuple(schemas)
Signature: z.tuple<T extends [ZodType,...ZodType[]]>(schemas: T) -> ZodTuple<T>
Method: .rest(schema)

### z.record(keySchema, valueSchema)
z.map(keySchema, valueSchema)
z.set(itemSchema)

### z.lazy(fn:()=>ZodType)

### z.function()
Signature: z.function(): ZodFunction<[],unknown>
Methods:
- .args(...schemas)
- .returns(schema)
- .implement(fn)
- .parameters() -> ZodTuple
- .returnType() -> ZodType

### z.instanceof(Class)

### z.preprocess(fn, schema)
### z.custom<T>(check?: (val:unknown)=>boolean, params?:{ message?:string })

Troubleshooting Commands:
- Detect cyclical: JSON.stringify(obj) throws "Converting circular structure to JSON"
- Parse promise: await schema.parse(Promise.resolve(val)).catch(err=>console.error(err))
- Validate date: z.coerce.date().safeParse("invalid").success === false

## Information Dense Extract
TS>=4.5 strict; install zod via npm|yarn|pnpm|bun|deno; import {z}; core schemas: z.string(opts), z.number(opts), z.boolean(), z.bigint(), z.date(), z.any(), z.unknown(), z.never(), z.undefined(), z.null(), z.void(); coercion: z.coerce.[string|number|boolean|date]( ); composition: z.object(shape).extend/merge/pick/omit/partial/deepPartial/required/strict/passthrough/strip/catchall, z.array(item).nonempty/min/max/length, z.tuple([...]).rest(item), z.union([...])/.or, z.discriminatedUnion(key,opts), z.record(keySchema,valueSchema), z.map, z.set.min/max/size/nonempty, z.intersection(A,B)/and; parsing: .parse, .parseAsync, .safeParse, .safeParseAsync; refinements: .refine(predicate,{message,path}), .superRefine((val,ctx)=>ctx.addIssue), transforms: .transform(fn), .preprocess(fn,targetSchema), .pipe(schema); enums: z.enum(vals).enum/.options/.extract/.exclude, z.nativeEnum(obj); helpers: schema.optional(), schema.nullable(); advanced: z.lazy for recursion, ZodType<Out,Def,In>, z.function().args(...).returns(...).implement(fn), z.instanceof(Class), z.custom<T>(fn,msg); error messages via opts or method params; boolean coercion caveat: truthy->true; troubleshooting: detect cycles via JSON.stringify, catch promise parse errors with catch, validate date strings with z.coerce.date();

## Sanitised Extract
Table of Contents:
1. Installation
2. Basic Usage
3. Primitives & Coercion
4. Parsing Methods
5. Schema Composition
6. Refinements & Transforms
7. Enums & Helpers
8. Advanced Patterns
9. Troubleshooting

1. Installation
   - Requirements: TypeScript>=4.5, tsconfig.json strict=true
   - Commands: npm install zod | yarn add zod | pnpm add zod | bun add zod | deno add npm:zod
   - Canary: install zod@canary

2. Basic Usage
   import { z } from 'zod'
   z.string().parse('foo')           // returns 'foo'
   z.string().safeParse(123)           // { success:false,... }
   const User = z.object({ username:z.string() })
   User.parse({ username:'alice' })  // returns object
   type User = z.infer<typeof User>    // { username: string }

3. Primitives & Coercion
   z.string(opts?), z.number(opts?), z.bigint(), z.boolean(), z.date(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()
   z.coerce.string() -> String(input)
   z.coerce.number() -> Number(input)
   z.coerce.boolean() -> Boolean(input)
   z.coerce.date() -> new Date(input)

4. Parsing Methods
   .parse(data:unknown):T
   .parseAsync(data:unknown):Promise<T>
   .safeParse(data:unknown):{success:boolean;data?:T;error?:ZodError}
   .safeParseAsync(data:unknown):Promise<same>

5. Schema Composition
   Objects: z.object(shape)
      .extend(fields), .merge(obj)
      .pick(keys), .omit(keys)
      .partial(keys?), .deepPartial()
      .required(keys?)
      .strict(), .passthrough(), .strip(), .catchall(schema)
   Arrays: z.array(item)
      .nonempty({message}), .min(n,{message}), .max(n), .length(n)
   Tuples: z.tuple([schemas]).rest(schema)
   Unions: z.union([schemas]), schema1.or(schema2)
   Discriminated union: z.discriminatedUnion(key, options[])
   Record: z.record(keySchema,valueSchema)
   Map: z.map(keySchema,valueSchema)
   Set: z.set(item).nonempty()/min()/max()/size()
   Intersection: z.intersection(A,B) or A.and(B)

6. Refinements & Transforms
   .refine(validator,val=>boolean, {message?,path?})
   .superRefine((val,ctx)=>ctx.addIssue({code,path,message}))
   .transform(fn:val=>newVal)
   .preprocess(fn:input=>converted, targetSchema)
   .pipe(schema)

7. Enums & Helpers
   z.enum(['A','B',...]) -> ZodEnum
      .enum property, .options, .extract(vals), .exclude(vals)
   z.nativeEnum(NativeEnumObj)
   .optional(), .nullable()

8. Advanced Patterns
   z.lazy(()=>schema) for recursion
   const schema: ZodType<Output,Def,Input> = base.extend({})
   z.function().args(...schemas).returns(schema).implement(fn)
   z.instanceof(Class)

9. Troubleshooting
   - Cyclical object loops: detect or preprocess
   - Promise schemas: .parse returns Promise; catch errors via .catch
   - Boolean coercion caveat: truthy->true, falsy->false; use z.preprocess for custom logic

## Original Source
zod
https://github.com/colinhacks/zod

## Digest of ZOD_CORE

# Zod Core Technical Summary
Date Retrieved: 2024-06-10

## Installation

### Requirements
TypeScript 4.5+ with strict mode enabled in tsconfig.json:

{
  "compilerOptions": {
    "strict": true
  }
}

### Package Installation

- npm: npm install zod
- yarn: yarn add zod
- pnpm: pnpm add zod
- bun: bun add zod
- deno: deno add npm:zod

Canary builds:
- npm install zod@canary

## Basic Usage

import { z } from "zod";

// String schema
const s = z.string();
s.parse("foo");           // returns "foo"
s.safeParse(123);         // { success:false; error: ZodError }

// Object schema
const User = z.object({ username: z.string() });
User.parse({ username: "alice" });
type User = z.infer<typeof User>;  // { username: string }

## Primitives

- z.string(options?:{ required_error?: string; invalid_type_error?: string })
- z.number(options?:{ required_error?: string; invalid_type_error?: string })
- z.bigint()
- z.boolean()
- z.date()
- z.undefined(), z.null(), z.void()
- z.any(), z.unknown(), z.never()

## Coercion for Primitives

z.coerce.string(): applies String(input)
z.coerce.number(): applies Number(input)
z.coerce.boolean(): applies Boolean(input)
z.coerce.date(): applies new Date(input)

Example:
const coercedNum = z.coerce.number().int().positive();
coercedNum.parse("42");    // 42 (number)

## Parsing Methods

.parse(data: unknown): T  // throws ZodError on invalid
.parseAsync(data: unknown): Promise<T>  // for async refinements
.safeParse(data: unknown): { success:true; data:T } | { success:false; error:ZodError }
.safeParseAsync(data: unknown): Promise< same shape >

## Schema Composition

- z.object(shape: Record<string, ZodType>)
  • .extend(fields)
  • .merge(other)
  • .pick({ key:true })
  • .omit({ key:true })
  • .partial(keys?)
  • .deepPartial()
  • .required(keys?)
  • .strict(), .passthrough(), .strip(), .catchall(zSchema)

- z.array(itemSchema)
  • .nonempty({ message?: string })
  • .min(count, { message? })
  • .max(count, { message? })
  • .length(count, { message? })

- z.tuple([schemas...]).rest(schema)
- z.union([schemas...]) / .or(otherSchema)
- z.discriminatedUnion(key, options[])
- z.record(keySchema, valueSchema)
- z.map(keySchema, valueSchema)
- z.set(itemSchema).nonempty()/min()/max()/size()
- z.intersection(A, B) / A.and(B)

## Refinements & Transforms

.refine(validator: (val:T)=>boolean, params?:{ message?:string; path?: (string|number)[] })
.transform(transformFn: (val:T)=>U)
.superRefine((val, ctx)=>{ ctx.addIssue({...}) })
.preprocess((input)=>any, targetSchema)
.pipe(otherSchema)

## Enums

- z.enum([value1,value2,...])  // returns ZodEnum
- z.nativeEnum(NativeEnumObject)
  • .enum property: mapping of keys to values
  • .options: readonly array of allowed values
  • .extract([...])/.exclude([...])

## Type Helpers

- z.optional(schema) or schema.optional()
- z.nullable(schema) or schema.nullable()

## Advanced

- z.lazy(() => schema) for recursive types
- z.ZodType<Output,Def,Input> for effects with explicit input/output
- z.function().args(...schemas).returns(schema).implement(fn)
- z.instanceof(Class)


## Troubleshooting

- Circular data detection: must preprocess or guard against cycles
- For promise schemas: parse returns Promise<T> and errors must be caught via .catch
- For boolean coercion: z.coerce.boolean() treats any truthy as true, falsy as false; use preprocess for custom logic


## Error Handling

Custom error messages:

z.string({ required_error:"Req", invalid_type_error:"Not string" })
z.string().min(5, { message:"Min length 5" })

.global config: none


## Attribution
- Source: zod
- URL: https://github.com/colinhacks/zod
- License: MIT License
- Crawl Date: 2025-05-11T01:24:26.995Z
- Data Size: 891173 bytes
- Links Found: 6089

## Retrieved
2025-05-11
library/ABORT_CONTROLLER.md
# library/ABORT_CONTROLLER.md
# ABORT_CONTROLLER

## Crawl Summary
Constructor: new AbortController():AbortController. Property: signal:AbortSignal (readonly). Method: abort():void sets signal.aborted=true and dispatches 'abort'. AbortSignal: aborted:boolean(false initial), onabort:event handler, addEventListener('abort',listener[,options]). Fetch integration: fetch(input,{signal}) returns Promise<Response> that rejects with DOMException name='AbortError', code=20 when aborted. After response is fulfilled, reading body (text(),json(),blob()) rejects with AbortError if aborted before reading. Compatibility: Chrome66+, Firefox57+, Safari14.1+, Edge16+, Web Workers support.

## Normalised Extract
Table of Contents:
1. AbortController Constructor
2. AbortSignal Properties
3. abort() Method
4. AbortError Exception
5. Event Handling on AbortSignal
6. Integration with Fetch API
7. Browser Compatibility

1. AbortController Constructor
Signature: new AbortController(): AbortController
Creates a controller instance with a read-only signal property.

2. AbortSignal Properties
  - aborted: boolean (readonly, initial false)
  - reason: any (readonly)
  - onabort: ((this:AbortSignal, ev:Event) => any) | null
Inherited methods: addEventListener, removeEventListener, dispatchEvent

3. abort() Method
Signature: AbortController.abort(): void
Sets signal.aborted=true, signal.reason=undefined, and enqueues an 'abort' event. Idempotent.

4. AbortError Exception
Thrown by fetch and body-consumption methods (`text()`, `json()`, `blob()`):
  - name: 'AbortError'
  - message: 'The operation was aborted.'
  - code (legacy): 20

5. Event Handling on AbortSignal
  - Add listener: signal.addEventListener('abort', listener, options?)
  - Remove listener: signal.removeEventListener('abort', listener, options?)
  - Handler property: signal.onabort = (ev:Event) => void

6. Integration with Fetch API
Usage: `fetch(url, { signal: controller.signal })`
Response consumption after abort triggers AbortError when reading body.

7. Browser Compatibility
  - Chrome 66+
  - Firefox 57+
  - Safari 14.1+
  - Edge 16+
  - Web Workers

## Supplementary Details
AbortSignal.reason: Provides optional user-defined cause. Event dispatch occurs as a microtask immediately after abort() call. abort() is synchronous and idempotent. To implement request timeouts: use setTimeout to call controller.abort(), then clearTimeout in finally. Always remove 'abort' listeners to prevent memory leaks: signal.removeEventListener('abort', handler). Check signal.aborted before starting long-running tasks. Default fetch has no timeout; AbortController is the recommended pattern for cancellation. In Node.js, Enable global fetch via --experimental-fetch in v17+ or import from 'node-fetch'.

## Reference Details
Interface AbortController {
  constructor(): AbortController;
  readonly signal: AbortSignal;
  abort(): void;
}

Interface AbortSignal extends EventTarget {
  readonly aborted: boolean;
  readonly reason: any;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
  addEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: 'abort', listener: (this: AbortSignal, ev: Event) => any, options?: boolean | EventListenerOptions): void;
  dispatchEvent(event: Event): boolean;
}

DOMException on abort:
  name: 'AbortError'
  message: 'The operation was aborted.'
  code: 20 (legacy)

Full Code Examples:
```js
// Basic fetch with cancellation
const controller = new AbortController();
const { signal } = controller;
fetch('https://example.com/data', { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.warn('Request aborted');
    } else {
      console.error('Fetch failed:', err);
    }
  });

// Cancel request:
controller.abort();
```
```js
// Fetch with timeout
function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const { signal } = controller;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal })
    .finally(() => clearTimeout(timeoutId));
}
```

Best Practices:
- Use a new AbortController per operation.
- Clear any timeouts and remove listeners in cleanup handlers.
- Check `signal.aborted` to handle pre-aborted states.

Troubleshooting:
- If `fetch` doesn’t abort: verify `signal` passed correctly and controller is not garbage-collected.
- In Node.js: enable `--experimental-fetch` or import `node-fetch`.
- Debug abort by logging `signal.aborted` and `err.name`.

Commands:
```bash
# Node REPL test
node
> const ctrl = new AbortController();
> fetch('http://example.com', { signal: ctrl.signal }).catch(e => console.log(e.name));
> ctrl.abort();
```
Expected output: AbortError

## Information Dense Extract
new AbortController():AbortController; signal:AbortSignal(aborted:boolean=false,reason:any,onabort:null); abort():void sets aborted=true, queues 'abort'. fetch(input,{signal})→Promise<Response>, rejects DOMException{name:'AbortError',message:'The operation was aborted.',code:20}. AbortSignal methods: addEventListener('abort',listener,options), removeEventListener, dispatchEvent. Properties: aborted, reason, onabort. Usage patterns: basic fetch cancellation, timeout wrapper with setTimeout and clearTimeout. Best practices: per-request controller, cleanup listeners/timeouts, check signal.aborted. Troubleshooting: confirm signal passed, monitor err.name, Node fetch experimental flag.

## Sanitised Extract
Table of Contents:
1. AbortController Constructor
2. AbortSignal Properties
3. abort() Method
4. AbortError Exception
5. Event Handling on AbortSignal
6. Integration with Fetch API
7. Browser Compatibility

1. AbortController Constructor
Signature: new AbortController(): AbortController
Creates a controller instance with a read-only signal property.

2. AbortSignal Properties
  - aborted: boolean (readonly, initial false)
  - reason: any (readonly)
  - onabort: ((this:AbortSignal, ev:Event) => any) | null
Inherited methods: addEventListener, removeEventListener, dispatchEvent

3. abort() Method
Signature: AbortController.abort(): void
Sets signal.aborted=true, signal.reason=undefined, and enqueues an 'abort' event. Idempotent.

4. AbortError Exception
Thrown by fetch and body-consumption methods ('text()', 'json()', 'blob()'):
  - name: 'AbortError'
  - message: 'The operation was aborted.'
  - code (legacy): 20

5. Event Handling on AbortSignal
  - Add listener: signal.addEventListener('abort', listener, options?)
  - Remove listener: signal.removeEventListener('abort', listener, options?)
  - Handler property: signal.onabort = (ev:Event) => void

6. Integration with Fetch API
Usage: 'fetch(url, { signal: controller.signal })'
Response consumption after abort triggers AbortError when reading body.

7. Browser Compatibility
  - Chrome 66+
  - Firefox 57+
  - Safari 14.1+
  - Edge 16+
  - Web Workers

## Original Source
Asynchronous Data Flow and Streaming Protocols
https://developer.mozilla.org/docs/Web/API/AbortController

## Digest of ABORT_CONTROLLER

# AbortController

## Constructor

**Syntax**: `new AbortController()`

Creates a new AbortController instance.

## Properties

**signal**: AbortSignal (readonly)

Returns an AbortSignal object used to communicate abort notifications to asynchronous operations.

## Methods

**abort()**: void

Immediately sets `signal.aborted` to `true` and dispatches an `'abort'` event on the associated AbortSignal.

## Events

AbortSignal implements EventTarget:
- Event type: `'abort'`
- Handlers via `signal.addEventListener('abort', listener)` or `signal.onabort`

## Usage Examples

Basic fetch abort:
```js
const controller = new AbortController();
const signal = controller.signal;

fetch('https://example.com/video.mp4', { signal })
  .then(response => console.log('Download complete', response))
  .catch(err => {
    if (err.name === 'AbortError') console.log('Download aborted');
    else console.error('Fetch error:', err);
  });

// To cancel:
controller.abort();
```

Timeout wrapper:
```js
function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const { signal } = controller;
  const id = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal })
    .finally(() => clearTimeout(id));
}
```

## Exception

Operations using AbortSignal reject with a DOMException:
- `name`: "AbortError"
- `message`: "The operation was aborted."
- `code` (legacy): 20

## Browser Compatibility

- Chrome 66+
- Firefox 57+
- Safari 14.1+
- Edge 16+
- Available in Web Workers

## Specifications

Defined in the WHATWG Fetch Standard and the DOM Standard.

## Date Retrieved
2024-07-29

## Source Attribution
MDN contributors, last modified Jul 26, 2024
Data size: 1386842 bytes, Links found: 16090

## Attribution
- Source: Asynchronous Data Flow and Streaming Protocols
- URL: https://developer.mozilla.org/docs/Web/API/AbortController
- License: License: IETF Trust (RFCs), MIT (Node.js), CC BY-SA 2.5 (MDN)
- Crawl Date: 2025-05-10T10:38:09.088Z
- Data Size: 1386842 bytes
- Links Found: 16090

## Retrieved
2025-05-10
library/ASSERT.md
# library/ASSERT.md
# ASSERT

## Crawl Summary
Stability and import patterns for strict and legacy assertion modes; constructor signature and properties for AssertionError; deprecation and methods for CallTracker; complete list of assertion methods with exact parameter types and behaviors; environment variables for color control.

## Normalised Extract
Table of Contents
1. Strict assertion mode import and environment flags
2. Legacy assertion mode import and loose equality caveats
3. AssertionError class constructor and properties
4. CallTracker class methods and usage pattern
5. Core assertion methods signatures and parameters

1. Strict assertion mode import and environment flags
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
Set NO_COLOR or NODE_DISABLE_COLORS to disable colorized diffs and REPL colors

2. Legacy assertion mode import and loose equality caveats
import assert from 'node:assert'
const assert = require('node:assert')
assert.deepEqual, equal, notDeepEqual, notEqual use == for comparisons and ignore prototypes

3. AssertionError class constructor and properties
Constructor: new assert.AssertionError({ message:string, actual:any, expected:any, operator:string, stackStartFn:Function })
Properties: name='AssertionError', code='ERR_ASSERTION', actual:any, expected:any, operator:string, generatedMessage:boolean

4. CallTracker class methods and usage pattern
const tracker = new assert.CallTracker()
const callsFn = tracker.calls(fn:Function=()=>{}, exact:number=1)
callsFn(...args)
tracker.verify() throws if wrapperFn not called exact times
Additional methods: tracker.getCalls(wrapperFn), tracker.report(), tracker.reset(wrapperFn?)

5. Core assertion methods signatures and parameters
assert(value:any, message?:string|Error)
assert.deepEqual(actual:any, expected:any, message?:string|Error)
assert.deepStrictEqual(actual:any, expected:any, message?:string|Error)
assert.equal(actual:any, expected:any, message?:string|Error)
assert.strictEqual(actual:any, expected:any, message?:string|Error)
assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.match(string:string, regexp:RegExp, message?:string|Error)
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error)


## Supplementary Details
Node.js version support:
• Strict mode exposed since v9.9.0
• AssertionError since v0.1.21
• CallTracker added v14.2.0, deprecated v20.1.0

Environment variables:
• NO_COLOR or NODE_DISABLE_COLORS (string) – boolean on existence – disables ANSI colors

Import paths:
• node:assert – stable import prefix
• node:assert/strict – strict mode import path

Error codes and names:
• AssertionError instances have code 'ERR_ASSERTION'

Usage patterns:
• Wrap tracker.verify() inside process.on('exit') for test teardown


## Reference Details
assert(value:any, message?:string|Error):void
Throws ERR_ASSERTION if value is falsy.

assert.deepEqual(actual:any, expected:any, message?:string|Error):void
Compares values using == for primitives and recurses through enumerable own properties; ignores prototypes; compares Error name/message/causes; supports circular refs; non-strict.

assert.deepStrictEqual(actual:any, expected:any, message?:string|Error):void
Compares using Object.is() for primitives, strict type tag matching, prototype using ===, recurses through own properties including Symbols, compares Map/Set unordered, fails on different WeakMap/WeakSet instances.

assert.equal(actual:any, expected:any, message?:string|Error):void  alias of assert.ok(actual==expected)
assert.strictEqual(actual:any, expected:any, message?:string|Error):void  alias of assert.ok(actual===expected)
assert.notEqual, assert.notStrictEqual opposite behaviors.

assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error):void
Invokes fn synchronously, expects it to throw; if error arg provided, checks instance or message match; returns thrown Error.

assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error):void
Invokes fn synchronously, expects no throw; returns result.

assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
Awaits returned promise, expects rejection; if error arg provided, checks instance or message match; rejects if promise resolves or throws unexpected

assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
Awaits returned promise, expects resolution; rejects if promise rejects or invalid return.

assert.match(string:string, regexp:RegExp, message?:string|Error):void
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void
Throws ERR_INVALID_ARG_TYPE or ERR_ASSERTION on type mismatch or unexpected match.

Class AssertionError extends Error {
  constructor(options:{ message?:string, actual?:any, expected?:any, operator?:string, stackStartFn?:Function})
  name: 'AssertionError'
  code: 'ERR_ASSERTION'
  actual: any
  expected: any
  operator: string
  generatedMessage: boolean
}

Class CallTracker {
  new CallTracker(): CallTracker
  calls(fn?:Function, exact?:number): Function
  getCalls(wrapper:Function): Array<{ thisArg:any, arguments:Array<any> }>
  report(): Array<{ message:string, actual:number, expected:number, operator:string, stack:Object }>
  reset(fn?:Function): void
  verify(): void
}

Best practices:
• Use strict mode for deep comparisons in production
• Avoid legacy deepEqual for type-sensitive checks
• Use tracker.verify() in exit handler for test coverage

Troubleshooting:
Command: node --enable-source-maps test.js
Expected: colorized diff output on AssertionError
If no colors, set NO_COLOR=1 or export NODE_DISABLE_COLORS=1


## Information Dense Extract
ASSERT module: stable assert + strict import from node:assert or node:assert/strict. Env flags NO_COLOR|NODE_DISABLE_COLORS disable diff colors. AssertionError options:{message,actual,expected,operator,stackStartFn}, properties:name='AssertionError',code='ERR_ASSERTION',generatedMessage. Core methods with signatures:assert(value[,msg]),equal,notEqual,strictEqual,notStrictEqual,deepEqual (== recursion),deepStrictEqual (Object.is recursion),notDeepEqual,notDeepStrictEqual,throws(fn[,err][,msg]),doesNotThrow(fn[,err][,msg]),rejects(asyncFn[,err][,msg])→Promise,doesNotReject(asyncFn[,err][,msg])→Promise,match(string,RegExp[,msg]),doesNotMatch(string,RegExp[,msg]). CallTracker: new→calls(fn=()=>{},exact=1)→wrapper,verify() throws if miscalls, getCalls(wrapper),report(),reset(fn?).

## Sanitised Extract
Table of Contents
1. Strict assertion mode import and environment flags
2. Legacy assertion mode import and loose equality caveats
3. AssertionError class constructor and properties
4. CallTracker class methods and usage pattern
5. Core assertion methods signatures and parameters

1. Strict assertion mode import and environment flags
import { strict as assert } from 'node:assert'
const assert = require('node:assert').strict
Set NO_COLOR or NODE_DISABLE_COLORS to disable colorized diffs and REPL colors

2. Legacy assertion mode import and loose equality caveats
import assert from 'node:assert'
const assert = require('node:assert')
assert.deepEqual, equal, notDeepEqual, notEqual use == for comparisons and ignore prototypes

3. AssertionError class constructor and properties
Constructor: new assert.AssertionError({ message:string, actual:any, expected:any, operator:string, stackStartFn:Function })
Properties: name='AssertionError', code='ERR_ASSERTION', actual:any, expected:any, operator:string, generatedMessage:boolean

4. CallTracker class methods and usage pattern
const tracker = new assert.CallTracker()
const callsFn = tracker.calls(fn:Function=()=>{}, exact:number=1)
callsFn(...args)
tracker.verify() throws if wrapperFn not called exact times
Additional methods: tracker.getCalls(wrapperFn), tracker.report(), tracker.reset(wrapperFn?)

5. Core assertion methods signatures and parameters
assert(value:any, message?:string|Error)
assert.deepEqual(actual:any, expected:any, message?:string|Error)
assert.deepStrictEqual(actual:any, expected:any, message?:string|Error)
assert.equal(actual:any, expected:any, message?:string|Error)
assert.strictEqual(actual:any, expected:any, message?:string|Error)
assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error)
assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string)
assert.match(string:string, regexp:RegExp, message?:string|Error)
assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error)

## Original Source
Node.js Core API Reference
https://nodejs.org/api/

## Digest of ASSERT

# Assert Module
Retrieved: 2024-06-20

Stability: 2 – Stable
Source Code: lib/assert.js

# Strict assertion mode
In strict mode, non-strict methods behave like their corresponding strict methods and error diffs are emitted for deep comparisons.

Import patterns:
import { strict as assert } from 'node:assert';
const assert = require('node:assert').strict;

Environment configuration:
Set NO_COLOR or NODE_DISABLE_COLORS to deactivate colors in error diffs and REPL output.

# Legacy assertion mode
Uses the == operator for deepEqual, equal, notDeepEqual, notEqual. May produce unexpected results due to loose equality.

Import patterns:
import assert from 'node:assert';
const assert = require('node:assert');

# Class:AssertionError
Constructor signature:
new assert.AssertionError(options)
options:
  message <string>         custom error message
  actual <any>             assigned to error.actual
  expected <any>           assigned to error.expected
  operator <string>        assigned to error.operator
  stackStartFn <Function>  trim stack before this function

Instance properties:
  name = 'AssertionError'
  code = 'ERR_ASSERTION'
  generatedMessage <boolean>

# Class:CallTracker (Deprecated)
new assert.CallTracker()

Methods:
  calls(fn:Function=()=>{}, exact:Number=1):Function
    returns wrapper that must be called exact times before verify()
  getCalls(wrapperFn:Function):Array<{ thisArg:any, arguments:Array }>
  report():Array<{ message:string, actual:number, expected:number, operator:string, stack:object }>
  reset(fn?:Function):void  reset counts for a single or all tracked functions
  verify():void  throws if any wrapper not called expected times

# Core assertion methods
  assert(value:any, message?:string|Error):void    alias of assert.ok()
  assert.ok(value:any, message?:string|Error):void
  assert.equal(actual:any, expected:any, message?:string|Error):void
  assert.notEqual(actual:any, expected:any, message?:string|Error):void
  assert.deepEqual(actual:any, expected:any, message?:string|Error):void
  assert.notDeepEqual(actual:any, expected:any, message?:string|Error):void
  assert.deepStrictEqual(actual:any, expected:any, message?:string|Error):void
  assert.notDeepStrictEqual(actual:any, expected:any, message?:string|Error):void
  assert.strictEqual(actual:any, expected:any, message?:string|Error):void
  assert.notStrictEqual(actual:any, expected:any, message?:string|Error):void
  assert.throws(fn:Function, error?:RegExp|Function, message?:string|Error):void
  assert.doesNotThrow(fn:Function, error?:RegExp|Function, message?:string|Error):void
  assert.rejects(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
  assert.doesNotReject(asyncFn:Function|Promise, error?:RegExp|Function, message?:string):Promise<void>
  assert.match(string:string, regexp:RegExp, message?:string|Error):void
  assert.doesNotMatch(string:string, regexp:RegExp, message?:string|Error):void



## Attribution
- Source: Node.js Core API Reference
- URL: https://nodejs.org/api/
- License: Node.js License
- Crawl Date: 2025-05-11T00:42:39.248Z
- Data Size: 4144456 bytes
- Links Found: 3302

## Retrieved
2025-05-11
library/JSYAML.md
# library/JSYAML.md
# JSYAML

## Crawl Summary
Installation via npm or global CLI. API methods load, loadAll, dump with full LoadOptions and DumpOptions definitions. Default values and schemas. YAML-JS type tag mapping. CLI usage flags.

## Normalised Extract
Table of Contents:
1. Installation
2. CLI Usage
3. API Methods
   3.1 load
   3.2 loadAll
   3.3 dump
4. LoadOptions
5. DumpOptions
6. Schema Constants
7. YAML Tag to JS Type Mapping
8. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
Command syntax: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] <file>
Flags:
  -h, --help
  -v, --version
  -c, --compact
  -t, --trace

3. API Methods
3.1 load(input: string, options?: LoadOptions): any
  Parses single YAML document. Throws YAMLException. No multi-doc support.
3.2 loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[] | void
  Parses multi-document YAML. Invokes iterator per doc if provided; else returns array.
3.3 dump(input: any, options?: DumpOptions): string
  Serializes JS object to YAML string.

4. LoadOptions
filename: string (default null)
onWarning: function(YAMLException) (default null)
schema: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
json: boolean (default false)

5. DumpOptions
indent: number (default 2)
noArrayIndent: boolean (default false)
skipInvalid: boolean (default false)
flowLevel: number (default -1)
styles: { tag:string -> style:string }
schema: (default DEFAULT_SCHEMA)
sortKeys: boolean|function (default false)
lineWidth: number (default 80)
noRefs: boolean (default false)
noCompatMode: boolean (default false)
condenseFlow: boolean (default false)
quotingType: '"'|'\'' (default '\'')
forceQuotes: boolean (default false)
replacer: function(key, value)

6. Schema Constants
FAILSAFE_SCHEMA
JSON_SCHEMA
CORE_SCHEMA
DEFAULT_SCHEMA

7. YAML Tag to JS Type Mapping
!!null -> null
!!bool -> boolean
!!int -> number
... etc.

8. Caveats
JS cannot use objects/arrays as map keys; they are stringified.
Implicit block mapping keys with duplicate anchors not supported.


## Supplementary Details
Installation steps for Node.js and CLI. Exact CLI command flags and their effects. All LoadOptions with default values and types. All DumpOptions with types, defaults, and behaviors. Schema constants URLs. Mapping of YAML tags to JS types.

## Reference Details
// Load example
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const doc = yaml.load(fs.readFileSync('example.yml', 'utf8'), {
    filename: 'example.yml',
    onWarning: (w) => console.warn('YAML Warning:', w.message),
    schema: yaml.JSON_SCHEMA,
    json: true
  });
  console.log(doc);
} catch (e) {
  console.error('YAML Load Error:', e.message);
  process.exit(1);
}

// loadAll example
yaml.loadAll(fs.readFileSync('multi.yml', 'utf8'), (doc) => {
  console.log('Doc:', doc);
}, { schema: yaml.DEFAULT_SCHEMA });

// dump example
const obj = { a: 1, b: [true, null], c: { d: 'text' } };
const yamlStr = yaml.dump(obj, {
  indent: 4,
  noArrayIndent: true,
  flowLevel: 2,
  styles: { '!!null': 'canonical' },
  sortKeys: (a, b) => a.localeCompare(b),
  lineWidth: 120,
  condenseFlow: true,
  quotingType: '"',
  forceQuotes: true,
  replacer: (key, value) => (value === null ? '~' : value)
});
console.log(yamlStr);

// Troubleshooting
# Validate YAML file
js-yaml -c example_invalid.yml
# Show full error
js-yaml -t example_invalid.yml
Expect exit code 1 on parse failure, stdout empty, stderr with error details.


## Information Dense Extract
install: npm install js-yaml; global CLI: npm install -g js-yaml. CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file. API: load(input:string, opts: {filename?,onWarning?,schema?,json?}): any; loadAll(input:string, iter?:fn, opts?): any[]|void; dump(obj:any, opts:{indent?,noArrayIndent?,skipInvalid?,flowLevel?,styles?,schema?,sortKeys?,lineWidth?,noRefs?,noCompatMode?,condenseFlow?,quotingType?,forceQuotes?,replacer?}): string. Schemas: FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA. YAML tag mapping: !!null->null, !!bool->boolean, !!int/!!float->number, !!binary->Buffer, !!timestamp->Date, !!omap/!!pairs->Array<[k,v]>, !!set->Object(k:null), !!str->string, !!seq->Array, !!map->Object. Caveats: object/array keys stringified, duplicate anchors unsupported. Troubleshoot: CLI flags -c for compact errors, -t for trace, exit code 1 on failure.

## Sanitised Extract
Table of Contents:
1. Installation
2. CLI Usage
3. API Methods
   3.1 load
   3.2 loadAll
   3.3 dump
4. LoadOptions
5. DumpOptions
6. Schema Constants
7. YAML Tag to JS Type Mapping
8. Caveats

1. Installation
npm install js-yaml
npm install -g js-yaml

2. CLI Usage
Command syntax: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] <file>
Flags:
  -h, --help
  -v, --version
  -c, --compact
  -t, --trace

3. API Methods
3.1 load(input: string, options?: LoadOptions): any
  Parses single YAML document. Throws YAMLException. No multi-doc support.
3.2 loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[] | void
  Parses multi-document YAML. Invokes iterator per doc if provided; else returns array.
3.3 dump(input: any, options?: DumpOptions): string
  Serializes JS object to YAML string.

4. LoadOptions
filename: string (default null)
onWarning: function(YAMLException) (default null)
schema: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
json: boolean (default false)

5. DumpOptions
indent: number (default 2)
noArrayIndent: boolean (default false)
skipInvalid: boolean (default false)
flowLevel: number (default -1)
styles: { tag:string -> style:string }
schema: (default DEFAULT_SCHEMA)
sortKeys: boolean|function (default false)
lineWidth: number (default 80)
noRefs: boolean (default false)
noCompatMode: boolean (default false)
condenseFlow: boolean (default false)
quotingType: '''|'''' (default '''')
forceQuotes: boolean (default false)
replacer: function(key, value)

6. Schema Constants
FAILSAFE_SCHEMA
JSON_SCHEMA
CORE_SCHEMA
DEFAULT_SCHEMA

7. YAML Tag to JS Type Mapping
!!null -> null
!!bool -> boolean
!!int -> number
... etc.

8. Caveats
JS cannot use objects/arrays as map keys; they are stringified.
Implicit block mapping keys with duplicate anchors not supported.

## Original Source
js-yaml
https://www.npmjs.com/package/js-yaml

## Digest of JSYAML

# JS-YAML Detailed Digest

Date Retrieved: 2023-10-05
Source Entry Index: 8
Data Size: 733356 bytes

## Installation

npm install js-yaml
npm install -g js-yaml  # for CLI executable

## CLI Usage

js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

Flags:
  -h, --help      Show help and exit
  -v, --version   Show version and exit
  -c, --compact   Compact error output
  -t, --trace     Show full stack trace on error

## API Methods

### yaml.load(string, options)
Signature:
  load(input: string, options?: LoadOptions): any

LoadOptions:
  filename?: string (default: null)
  onWarning?: (warning: YAMLException) => void (default: null)
  schema?: Schema (DEFAULT_SCHEMA)
  json?: boolean (default: false)

Schemas:
  FAILSAFE_SCHEMA
  JSON_SCHEMA
  CORE_SCHEMA
  DEFAULT_SCHEMA

Behavior:
  Parses a single YAML document. Returns object|string|number|null|undefined. Throws YAMLException on error.
  Does not support multi-document input.

### yaml.loadAll(string, iterator?, options)
Signature:
  loadAll(input: string, iterator?: (doc: any) => void, options?: LoadOptions): any[] | void

Behavior:
  Parses multi-document YAML. If iterator provided, invokes for each document; otherwise returns array.

### yaml.dump(object, options)
Signature:
  dump(input: any, options?: DumpOptions): string

DumpOptions:
  indent?: number (default: 2)
  noArrayIndent?: boolean (default: false)
  skipInvalid?: boolean (default: false)
  flowLevel?: number (default: -1)
  styles?: {[tag: string]: string}
  schema?: Schema (DEFAULT_SCHEMA)
  sortKeys?: boolean|((a: string, b: string) => number) (default: false)
  lineWidth?: number (default: 80)
  noRefs?: boolean (default: false)
  noCompatMode?: boolean (default: false)
  condenseFlow?: boolean (default: false)
  quotingType?: '"'|'\'' (default: '\'')
  forceQuotes?: boolean (default: false)
  replacer?: (key: string, value: any) => any

## YAML Type Mapping

Tag       JS Type
!!null    null
!!bool    boolean
!!int     number
!!float   number
!!binary  Buffer
!!timestamp Date
!!omap    [ [key, value], ... ]
!!pairs   [ [key, value], ... ]
!!set     {key: null, ...}
!!str     string
!!seq     any[]
!!map     {[key: string]: any}

## Caveats

• Objects/arrays used as keys are stringified via toString().
• Implicit block mapping keys cannot load duplicate anchor references.

## Enterprise

Commercial support via Tidelift subscription.


## Attribution
- Source: js-yaml
- URL: https://www.npmjs.com/package/js-yaml
- License: BSD-2-Clause
- Crawl Date: 2025-05-10T15:26:57.450Z
- Data Size: 733356 bytes
- Links Found: 2902

## Retrieved
2025-05-10
library/EJS_DOCS.md
# library/EJS_DOCS.md
# EJS_DOCS

## Crawl Summary
EJS core API methods ejs.render, ejs.compile, ejs.renderFile with signatures and parameter lists; Options object fields with defaults (delimiter, cache, async, filename, root, rmWhitespace, strict, compileDebug); template tags and include mechanism; caching behavior; async rendering pattern.

## Normalised Extract
Table of Contents:
1. API Methods
2. Template Compilation
3. File Rendering
4. Options
5. Includes
6. Delimiters
7. Caching
8. Async Rendering

1. API Methods
   ejs.render(template: string, data?: object, options?: Options): string
   ejs.compile(template: string, options?: Options): (data?: object) => string
   ejs.renderFile(filename: string, data?: object, options?: Options, callback: (err, str) => void): void

2. Template Compilation
   compile returns JS function; call with data object to get rendered output.

3. File Rendering
   renderFile reads file, compiles with provided options, invokes callback with error or HTML string.

4. Options
   delimiter: '%'
   openDelimiter: '<'
   closeDelimiter: '>'
   async: false
   cache: false
   filename: string (required for cache/includes)
   root: string|array (lookup path)
   views: alias for root
   rmWhitespace: false
   strict: false
   compileDebug: true

5. Includes
   Syntax: <%- include(path, data) %>
   Path resolved against options.root or dirname(filename).
   Child scope inherits parent variables; data parameter overrides.

6. Delimiters
   <% code %>  scriptlet
   <%= escaped %>
   <%- unescaped %>
   <%# comment %>
   <%% literal %>
   options.delimiter can change '%' to custom char

7. Caching
   Set options.cache = true and filename. Uses LRU cache keyed by filename.

8. Async Rendering
   options.async = true enables await in templates.
   compile returns async function: await fn(data).


## Supplementary Details
Options defaults and effects:
- delimiter: '%' (character for tag delimiter; change affects all tag types)
- openDelimiter/closeDelimiter: '<','>' (override tag wrappers)
- async: false (if true, returned render/compile function is async)
- cache: false (if true and filename set, caches compiled functions)
- filename: undefined (string path for file resolution; required for includes and caching)
- root: undefined (string or array; base path(s) for include resolution)
- views: undefined alias for root; array supports multiple directories
- rmWhitespace: false (if true, strips safe whitespace between tags)
- strict: false (if true, uses strict JS mode in template functions)
- compileDebug: true (if false, omits code comments and line numbers)

Implementation steps:
1. Install via npm: npm install ejs
2. Require: const ejs = require('ejs')
3. Call ejs.render or compile/template functions as needed
4. For file templates, set options.filename to use relative includes
5. Enable cache for high-throughput by setting options.cache = true
6. Use async rendering for Promises: set options.async = true
7. Customize delimiters for alternative syntax


## Reference Details
Full API Specifications:

1. ejs.render(template, data, options)
- template:string
- data?:object = {}
- options?:{
    delimiter?:string       default '%'
    openDelimiter?:string   default '<'
    closeDelimiter?:string  default '>'
    async?:boolean          default false
    cache?:boolean          default false
    filename?:string        default undefined
    root?:string|string[]   default undefined
    views?:string|string[]  default undefined
    rmWhitespace?:boolean   default false
    strict?:boolean         default false
    compileDebug?:boolean   default true
  }
- returns string
- throws SyntaxError

Example:
const html = ejs.render('<%= user.name %>', {user:{name:'Alice'}}, {rmWhitespace:true});

2. ejs.compile(template, options)
- template:string
- options?:same as render
- returns function(data?:object):string | Promise<string> if async

Example:
const fn = ejs.compile('Hello <%= name %>', {async:true});
(async()=>{ console.log(await fn({name:'Bob'})) })();

3. ejs.renderFile(filename, data, options, callback)
- filename:string
- data?:object = {}
- options?:same as render
- callback:(err:Error|null, str?:string)=>void
- returns void

Example:
ejs.renderFile('views/index.ejs', {items}, {cache:true}, (err, str)=>{
  if (err) console.error(err);
  else console.log(str);
});

Configuration Patterns:
- Enable global caching: ejs.cache = new LRU({max:500});
- Custom file loader: ejs.fileLoader = (path) => fs.readFileSync(path, 'utf8');

Best Practices:
- Always set options.filename when using includes to get correct path resolution and cache key.
- Disable compileDebug in production: {compileDebug:false} for smaller functions.
- Use rmWhitespace to minimize HTML size when whitespace is non-significant.

Troubleshooting:
- SyntaxError: Unexpected token '%' → Check unmatched tags.
- Include not found: ensure root or filename correct. Run:
  console.log(path.resolve(options.root, 'partial.ejs'))
- Async errors: "await is only valid in async function" → set options.async = true.

Commands:
- Validate template compile: node -e "console.log(require('ejs').compile("<% if(true){ %>OK<% } %>")());"
- Inspect cache size: console.log(require('ejs').cache.keys());


## Information Dense Extract
ejs.render(str,data,opts)->string; opts:{delimiter:'%',openDelimiter:'<',closeDelimiter:'>',async:false,cache:false,filename,root|string[],views alias,rmWhitespace:false,strict:false,compileDebug:true}. ejs.compile(str,opts)->fn(data)->string|Promise. ejs.renderFile(file,data,opts,cb). Includes: <%- include(path,data)%> resolves via opts.root or dirname(opts.filename). Cache enabled if opts.cache&&opts.filename. Async templates require opts.async=true. Custom fileLoader & cache override via ejs.fileLoader & ejs.cache. Best: set filename for includes/cache, compileDebug:false in prod, rmWhitespace:true for minified HTML. Troubleshoot via tag matching, path.resolve for includes, ensure async flag for await usage.

## Sanitised Extract
Table of Contents:
1. API Methods
2. Template Compilation
3. File Rendering
4. Options
5. Includes
6. Delimiters
7. Caching
8. Async Rendering

1. API Methods
   ejs.render(template: string, data?: object, options?: Options): string
   ejs.compile(template: string, options?: Options): (data?: object) => string
   ejs.renderFile(filename: string, data?: object, options?: Options, callback: (err, str) => void): void

2. Template Compilation
   compile returns JS function; call with data object to get rendered output.

3. File Rendering
   renderFile reads file, compiles with provided options, invokes callback with error or HTML string.

4. Options
   delimiter: '%'
   openDelimiter: '<'
   closeDelimiter: '>'
   async: false
   cache: false
   filename: string (required for cache/includes)
   root: string|array (lookup path)
   views: alias for root
   rmWhitespace: false
   strict: false
   compileDebug: true

5. Includes
   Syntax: <%- include(path, data) %>
   Path resolved against options.root or dirname(filename).
   Child scope inherits parent variables; data parameter overrides.

6. Delimiters
   <% code %>  scriptlet
   <%= escaped %>
   <%- unescaped %>
   <%# comment %>
   <%% literal %>
   options.delimiter can change '%' to custom char

7. Caching
   Set options.cache = true and filename. Uses LRU cache keyed by filename.

8. Async Rendering
   options.async = true enables await in templates.
   compile returns async function: await fn(data).

## Original Source
EJS
https://ejs.co/#docs

## Digest of EJS_DOCS

# EJS API Reference (retrieved 2024-06-30)

## 1. ejs.render(template, data, options)

Signature:
```js
ejs.render(template: string, data?: object, options?: Options): string
```
Parameters:
- template: String containing EJS syntax.
- data: Data object to bind to template (default: {}).
- options: Options object (see Options section).
Returns:
- Rendered HTML string.
Throws:
- SyntaxError on template parse failure.

## 2. ejs.compile(template, options)

Signature:
```js
ejs.compile(template: string, options?: Options): (data?: object) => string
```
Parameters:
- template: EJS template string.
- options: Options object.
Returns:
- Reusable render function accepting a data object.

## 3. ejs.renderFile(path, data, options, callback)

Signature:
```js
ejs.renderFile(filename: string, data?: object, options?: Options, callback: (err: Error|null, str?: string) => void): void
```
Parameters:
- filename: Path to .ejs file.
- data: Data object (default: {}).
- options: Options object.
- callback: Function called with (err, renderedString).
Throws:
- Errors via callback.err if file I/O or render fails.

## 4. Options

Fields and Defaults:
- delimiter: '%'
- openDelimiter: '<'
- closeDelimiter: '>'
- async: false
- cache: false
- filename: undefined (required for cache and includes)
- root: undefined or string|array (lookup path for include)
- views: undefined or string|array (deprecation alias for root)
- rmWhitespace: false (strip all safe-to-strip whitespace)
- strict: false (enable strict mode)
- compileDebug: true (includes line numbers in compiled source)

## 5. Caching

- Enable via options.cache = true and provide options.filename.
- Caches compiled functions in internal LRU cache keyed by filename.

## 6. Includes

Syntax:
```ejs
<%- include('path/to/partial', {foo: 'bar'}) %>
```
- Resolves relative to options.root or path.dirname(options.filename).
- Passes given data merged with parent scope.

## 7. Delimiters

- Default tags:
  - Scriptlet: <% code %>
  - Escaped: <%= value %>
  - Unescaped: <%- value %>
  - Comment: <%# comment %>
  - Literal delimiter: <%% renders <% literal %>
- Custom delimiter: set options.delimiter = '?' to use <? ?>

## 8. Async Rendering

- Set options.async = true.
- Use await inside templates and call compiled function as async:
```js
const fn = ejs.compile(str, {async: true});
await fn(data);
```

---

Attribution: Crawled from https://ejs.co/#docs on 2024-06-30, Data Size: 8029 bytes, Links Found: 26

## Attribution
- Source: EJS
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-10T21:58:40.878Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-10
library/SERVER_SENT_EVENTS.md
# library/SERVER_SENT_EVENTS.md
# SERVER_SENT_EVENTS

## Crawl Summary
SSE messages use lines prefixed by data:, id:, event:, retry: and a blank line to dispatch. EventSource API: new EventSource(url, {withCredentials}), properties url, readyState, constants CONNECTING=0, OPEN=1, CLOSED=2, methods close(), addEventListener(), removeEventListener(), event handlers onopen, onmessage, onerror. Server must send headers Content-Type:text/event-stream; Cache-Control:no-cache; Connection:keep-alive. Default retry interval is 3000ms, override via retry field. Examples provided for PHP and JavaScript client.

## Normalised Extract
Table of Contents
1 SSE Protocol Format
2 EventSource Interface
3 Server Headers
4 Reconnection & Error Handling
5 Code Examples

1 SSE Protocol Format
 data: <string> append each line with '\n'; multi-line messages join lines
 id: <string> stored in lastEventId for resume
 event: <string> defines custom event type
 retry: <integer> ms before reconnect override default
 blank line separates and dispatches event

2 EventSource Interface
 Signature: new EventSource(url: string, eventSourceInitDict?: {withCredentials?: boolean})
 Properties:
  url                 string endpoint
  withCredentials     boolean, defaults to false
  readyState          number: 0 CONNECTING, 1 OPEN, 2 CLOSED
 Methods:
  close(): void       terminates connection
  addEventListener(type, listener, options?): void
  removeEventListener(type, listener, options?): void
 Handlers:
  onopen(e: Event)
  onmessage(e: MessageEvent{data:string, lastEventId:string, origin:string})
  onerror(e: Event)

3 Server Headers
 Content-Type: text/event-stream; charset=utf-8
 Cache-Control: no-cache; no-transform
 Connection: keep-alive
 Prevent proxy buffering (e.g., upstream_buffering off)

4 Reconnection & Error Handling
 Default retry = 3000ms
 Override via 'retry: <ms>' in stream
 onerror: if readyState==CLOSED then no reconnect
 Ensure HTTP status 200 and no Content-Length header for streaming

5 Code Examples
 Client JavaScript:
  var es = new EventSource('/events', {withCredentials:true});
  es.addEventListener('message', e => console.log(e.data));
  setTimeout(() => es.close(), 60000);
 Server Node.js (Express):
  app.get('/events', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
    const send = () => res.write('data: '+new Date().toISOString()+'\n\n');
    const interval = setInterval(send,1000);
    req.on('close', () => clearInterval(interval));
  });

## Supplementary Details
Server-Side Implementation
- PHP: header('Content-Type: text/event-stream'); header('Cache-Control: no-cache'); header('Connection: keep-alive'); use ob_flush(); flush(); sleep(interval)
- Node.js: res.writeHead(200, headers); res.write('id: '+id+'\n'); res.write('event: '+type+'\n'); res.write('data: '+payload+'\n\n')
- Loop control: clear interval on client disconnect (req.on('close'))
- Ensure no Content-Length header, use Transfer-Encoding: chunked

Client-Side Configuration
- eventSourceInitDict options: withCredentials:boolean
- Use addEventListener for custom event types: es.addEventListener('update', handler)
- Polyfill for Node: import 'eventsource'; new EventSource(url)
- CORS: server must send Access-Control-Allow-Origin and credentials if needed

Performance & Compatibility
- SSE is unidirectional, suitable for low-frequency updates
- Supported in modern browsers and Web Workers
- Fallback to polling or WebSocket in unsupported environments

## Reference Details
API Specification
EventSource(url: string, eventSourceInitDict?: EventSourceInit)
interface EventSourceInit { withCredentials?: boolean; }

Properties
readonly url: string
readonly withCredentials: boolean
readonly readyState: number
static CONNECTING: number = 0
static OPEN: number       = 1
static CLOSED: number     = 2

Methods
addEventListener(type: string, listener: (ev: any) => any, options?: boolean|AddEventListenerOptions): void
removeEventListener(type: string, listener: (ev: any) => any, options?: boolean|EventListenerOptions): void
close(): void

Event Handlers
onopen: (this: EventSource, ev: Event) => any
onmessage: (this: EventSource, ev: MessageEvent) => any
onerror: (this: EventSource, ev: Event) => any

MessageEvent properties
 data: any
 lastEventId: string
 origin: string

Full Client Example
var es = new EventSource('/stream', {withCredentials:true});
es.addEventListener('open', e => console.log('open'), false);
es.addEventListener('message', e => console.log('data', e.data), false);
es.addEventListener('error', e => {
  if (es.readyState === EventSource.CLOSED) console.log('closed');
}, false);

Best Practices
- Always include 'id' field to support resume
- Control retry interval via 'retry' field
- Monitor readyState before sending
- Use HTTP headers to disable caching and buffering

Troubleshooting
1 Confirm headers: curl -i http://host/sse
   Expect: HTTP/1.1 200 OK
           Content-Type: text/event-stream
           Cache-Control: no-cache
           Connection: keep-alive
2 Test no buffering: curl --no-buffer http://host/sse
3 Check console for readyState values
4 Ensure server loop handles client disconnect (req.on('close') or while(true) exit condition)
5 Verify event format: data lines end with '\n\n'

## Information Dense Extract
Protocol: data:,id:,event:,retry:,blank-line dispatch; EventSource API: new EventSource(url,init?); init.withCredentials:boolean; props url:string,withCredentials:boolean,readyState:0|1|2; constants CONNECTING0,OPEN1,CLOSED2; methods addEventListener,removeEventListener,close; handlers onopen, onmessage(MessageEvent.data:string,lastEventId:string), onerror; Server headers: Content-Type:text/event-stream;Cache-Control:no-cache;Connection:keep-alive; no Content-Length; default retry 3000ms, override via retry field; PHP: header, echo 'data:...\n\n', flush; Node: res.writeHead, res.write loop, clear on close; Best: id for resume, custom retry, polyfill; Troubleshoot: curl -i and --no-buffer

## Sanitised Extract
Table of Contents
1 SSE Protocol Format
2 EventSource Interface
3 Server Headers
4 Reconnection & Error Handling
5 Code Examples

1 SSE Protocol Format
 data: <string> append each line with ''n'; multi-line messages join lines
 id: <string> stored in lastEventId for resume
 event: <string> defines custom event type
 retry: <integer> ms before reconnect override default
 blank line separates and dispatches event

2 EventSource Interface
 Signature: new EventSource(url: string, eventSourceInitDict?: {withCredentials?: boolean})
 Properties:
  url                 string endpoint
  withCredentials     boolean, defaults to false
  readyState          number: 0 CONNECTING, 1 OPEN, 2 CLOSED
 Methods:
  close(): void       terminates connection
  addEventListener(type, listener, options?): void
  removeEventListener(type, listener, options?): void
 Handlers:
  onopen(e: Event)
  onmessage(e: MessageEvent{data:string, lastEventId:string, origin:string})
  onerror(e: Event)

3 Server Headers
 Content-Type: text/event-stream; charset=utf-8
 Cache-Control: no-cache; no-transform
 Connection: keep-alive
 Prevent proxy buffering (e.g., upstream_buffering off)

4 Reconnection & Error Handling
 Default retry = 3000ms
 Override via 'retry: <ms>' in stream
 onerror: if readyState==CLOSED then no reconnect
 Ensure HTTP status 200 and no Content-Length header for streaming

5 Code Examples
 Client JavaScript:
  var es = new EventSource('/events', {withCredentials:true});
  es.addEventListener('message', e => console.log(e.data));
  setTimeout(() => es.close(), 60000);
 Server Node.js (Express):
  app.get('/events', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
    const send = () => res.write('data: '+new Date().toISOString()+''n'n');
    const interval = setInterval(send,1000);
    req.on('close', () => clearInterval(interval));
  });

## Original Source
Server-Sent Events (SSE)
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## Digest of SERVER_SENT_EVENTS

# Server-Sent Events (SSE)

# Protocol Format
Lines prefixed by a field name and colon
data: <text>         can span multiple lines, concatenated with "\n"
id: <string>         sets lastEventId for reconnection
event: <string>      custom event type dispatched
retry: <integer>     sets reconnection delay in milliseconds
blank line           dispatches the event to the client

# EventSource Interface
Constructor
new EventSource(url: string, eventSourceInitDict?: { withCredentials?: boolean })

Properties
url: string
eventSourceInitDict.withCredentials?: boolean
readyState: number

Static Constants
EventSource.CONNECTING = 0
EventSource.OPEN       = 1
EventSource.CLOSED     = 2

Methods
close(): void
addEventListener(type: string, listener: (ev: any) => any, options?: any): void
removeEventListener(type: string, listener: (ev: any) => any, options?: any): void

Event Handlers
onopen(e: Event): any
onmessage(e: MessageEvent): any
onerror(e: Event): any

# Server Configuration Headers
Content-Type: text/event-stream; charset=utf-8
Cache-Control: no-cache; no-transform
Connection: keep-alive

# Simple Server Example (PHP)
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
while (true) {
  $data = date('H:i:s');
  echo "data: $data\n\n";
  ob_flush();
  flush();
  sleep(1);
}

# Simple Client Example (JavaScript)
var es = new EventSource('/sse');
es.onopen = function(e) {
  console.log('Connection opened');
};
es.onmessage = function(e) {
  console.log('Message:', e.data);
};
es.onerror = function(e) {
  if (es.readyState === EventSource.CLOSED) {
    console.log('Connection closed by server');
  }
};

## Attribution
- Source: Server-Sent Events (SSE)
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- License: CC BY-SA 2.5
- Crawl Date: 2025-05-10T21:25:23.360Z
- Data Size: 2471267 bytes
- Links Found: 28823

## Retrieved
2025-05-10

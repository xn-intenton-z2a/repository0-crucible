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

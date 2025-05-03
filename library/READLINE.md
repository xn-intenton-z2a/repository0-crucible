# READLINE

## Crawl Summary
readline.createInterface({input,output,completer?,terminal?,history?,historySize,removeHistoryDuplicates,prompt,crlfDelay,escapeCodeTimeout,tabSize,signal}) returns InterfaceConstructor. InterfaceConstructor extends EventEmitter with events 'line'(string), 'close', 'pause','resume','SIGINT','SIGCONT','SIGTSTP','history'. Methods: close(), pause(), resume(), prompt(preserveCursor?), setPrompt(string), getPrompt():string, write(string|key), [Symbol.asyncIterator]():AsyncIterator<string>, getCursorPos():{rows:number,cols:number}. readline.Interface.question(query[,options],callback) and readlinePromises.Interface.question(query[,options]):Promise<string>. readlinePromises.Readline(stream,options) supports clearLine(dir),clearScreenDown(),cursorTo(x,y),moveCursor(dx,dy),commit(),rollback().

## Normalised Extract
Table of Contents:
1. Interface Creation
2. Event Handlers
3. Instance Methods
4. Properties
5. Promises API
6. Callback API
7. Configuration Options
8. Usage Examples

1. Interface Creation
   Method: createInterface(options)
   Options:
     input: Readable (required)
     output: Writable
     completer: function(line)→[matches:string[],substr:string] or Promise
     terminal: boolean (default: output.isTTY)
     history: string[] (default: [])
     historySize: number (default: 30)
     removeHistoryDuplicates: boolean (default: false)
     prompt: string (default: '> ')
     crlfDelay: number ≥100 or Infinity (default: 100)
     escapeCodeTimeout: number ms (default: 500)
     tabSize: integer ≥1 (default: 8)
     signal: AbortSignal
   Returns: InterfaceConstructor

2. Event Handlers
   'line'(input:string)
   'close'()
   'pause'()
   'resume'()
   'history'(history:string[])
   'SIGINT'(), 'SIGCONT'(), 'SIGTSTP'()

3. Instance Methods
   close(): void
   [Symbol.dispose](): void
   pause(): void
   resume(): void
   setPrompt(prompt:string): void
   getPrompt(): string
   prompt(preserveCursor?:boolean): void
   write(data:string, key?:{ctrl?:boolean;meta?:boolean;shift?:boolean;name:string}): void
   [Symbol.asyncIterator](): AsyncIterator<string>
   getCursorPos(): {rows:number;cols:number}

4. Properties
   line: string
   cursor: number

5. Promises API
   question(query:string, options?:{signal:AbortSignal}): Promise<string>
   Usage: const answer = await rl.question('Q? ')

6. Callback API
   question(query:string, options?:{signal:AbortSignal}, callback:(answer:string)=>void): void

7. Configuration Options
   Default values and effects as above under Interface Creation.

8. Usage Examples
   Basic prompt (Promises) and file streaming (Callback).


## Supplementary Details
DefaultValues:
  terminal: inferred from output.isTTY
  history: []
  historySize: 30 (0 disables history)
  removeHistoryDuplicates: false
  prompt: '> '
  crlfDelay: 100ms (min 100) or Infinity
  escapeCodeTimeout: 500ms
  tabSize: 8
UsageSteps:
 1. import createInterface from 'node:readline' or '/promises'
 2. call createInterface with streams and options
 3. attach 'line' and other event listeners or call question()
 4. for Promises API await question(), then close()
 5. call rl.close() or process.stdin.unref() to exit
ErrorHandling:
 - question() after close() rejects (Promises) or throws (Callback).
 - signal.abort() during question() causes immediate reject or callback not called.


## Reference Details
API Specifications:
readline.createInterface(options:Object): InterfaceConstructor
  options.input: stream.Readable (required)
  options.output: stream.Writable
  options.completer: (line:string)->[string[],string]|Promise<[string[],string]>
  options.terminal: boolean
  options.history: string[]
  options.historySize: number
  options.removeHistoryDuplicates: boolean
  options.prompt: string
  options.crlfDelay: number
  options.escapeCodeTimeout: number
  options.tabSize: number
  options.signal: AbortSignal
InterfaceConstructor methods:
  close(): void
  [Symbol.dispose](): void
  pause(): void
  resume(): void
  setPrompt(prompt:string): void
  getPrompt(): string
  prompt(preserveCursor?:boolean): void
  write(data:string, key?:{ctrl?:boolean;meta?:boolean;shift?:boolean;name:string}): void
  [Symbol.asyncIterator](): AsyncIterator<string>
  getCursorPos():{rows:number,cols:number}
InterfaceConstructor events:
  on('line', listener:(line:string)=>void)
  on('close', listener:()=>void)
  on('history', listener:(history:string[])=>void)
  on('pause', listener:()=>void)
  on('resume', listener:()=>void)
  on('SIGINT', listener:()=>void)
  on('SIGCONT', listener:()=>void)
  on('SIGTSTP', listener:()=>void)
readline.Interface.question(query:string, options?:{signal:AbortSignal}, callback:(answer:string)=>void): void
readlinePromises.Interface.question(query:string, options?:{signal:AbortSignal}): Promise<string>
readlinePromises.Readline(stream:Writable, options?:{autoCommit?:boolean})
  clearLine(dir:-1|0|1): this
  clearScreenDown(): this
  cursorTo(x:number, y?:number): this
  moveCursor(dx:number, dy:number): this
  commit(): Promise<void>
  rollback(): this
Examples:
// Basic CLI loop
import { createInterface } from 'node:readline';
const rl = createInterface({input:process.stdin,output:process.stdout,prompt:'> '});
rl.prompt();
rl.on('line', line=>{ switch(line.trim()){ case 'exit': rl.close(); break; default: console.log(line); rl.prompt()} });
rl.on('close', ()=>process.exit(0));

// Troubleshooting:
// 1. Missing prompt: ensure output stream is not null and terminal=true
// 2. question hanging: call rl.close() or abort signal
// 3. No EOL recognition: set crlfDelay>=input EOL delay

Commands:
$ node script.js
> hello
hello
> exit
$

## Information Dense Extract
readline.createInterface({input:Readable,output:Writable,completer?(line)->[string[],string]|Promise,terminal?:boolean,history?:string[],historySize?:number,removeHistoryDuplicates?:boolean,prompt?:string,crlfDelay?:number>=100||Infinity,escapeCodeTimeout?:number(ms),tabSize?:number,signal?:AbortSignal}):InterfaceConstructor events: 'line'(string),'close','pause','resume','history'(string[]),'SIGINT','SIGCONT','SIGTSTP'; methods: close(),pause(),resume(),prompt(preserveCursor?:boolean),setPrompt(string),getPrompt():string,write(string,key:{ctrl?,meta?,shift?,name}),[Symbol.asyncIterator]():AsyncIterator<string>,getCursorPos():{rows,cols}; properties: line:string,cursor:number; readline.Interface.question(query:string,options?:{signal:AbortSignal},callback:(ans:string)=>void); readlinePromises.Interface.question(query:string,options?:{signal:AbortSignal}):Promise<string>; readlinePromises.Readline(stream:Writable,{autoCommit?:boolean}).clearLine(dir:-1|0|1),clearScreenDown(),cursorTo(x,y?),moveCursor(dx,dy),commit():Promise,rollback(); defaults: terminal=output.isTTY,history=[],historySize=30,removeHistoryDuplicates=false,prompt='> ',crlfDelay=100,escapeCodeTimeout=500,tabSize=8; example: const rl= createInterface(...); const ans=await rl.question('Q? '); rl.close();

## Sanitised Extract
Table of Contents:
1. Interface Creation
2. Event Handlers
3. Instance Methods
4. Properties
5. Promises API
6. Callback API
7. Configuration Options
8. Usage Examples

1. Interface Creation
   Method: createInterface(options)
   Options:
     input: Readable (required)
     output: Writable
     completer: function(line)[matches:string[],substr:string] or Promise
     terminal: boolean (default: output.isTTY)
     history: string[] (default: [])
     historySize: number (default: 30)
     removeHistoryDuplicates: boolean (default: false)
     prompt: string (default: '> ')
     crlfDelay: number 100 or Infinity (default: 100)
     escapeCodeTimeout: number ms (default: 500)
     tabSize: integer 1 (default: 8)
     signal: AbortSignal
   Returns: InterfaceConstructor

2. Event Handlers
   'line'(input:string)
   'close'()
   'pause'()
   'resume'()
   'history'(history:string[])
   'SIGINT'(), 'SIGCONT'(), 'SIGTSTP'()

3. Instance Methods
   close(): void
   [Symbol.dispose](): void
   pause(): void
   resume(): void
   setPrompt(prompt:string): void
   getPrompt(): string
   prompt(preserveCursor?:boolean): void
   write(data:string, key?:{ctrl?:boolean;meta?:boolean;shift?:boolean;name:string}): void
   [Symbol.asyncIterator](): AsyncIterator<string>
   getCursorPos(): {rows:number;cols:number}

4. Properties
   line: string
   cursor: number

5. Promises API
   question(query:string, options?:{signal:AbortSignal}): Promise<string>
   Usage: const answer = await rl.question('Q? ')

6. Callback API
   question(query:string, options?:{signal:AbortSignal}, callback:(answer:string)=>void): void

7. Configuration Options
   Default values and effects as above under Interface Creation.

8. Usage Examples
   Basic prompt (Promises) and file streaming (Callback).

## Original Source
Node.js Readline
https://nodejs.org/api/readline.html

## Digest of READLINE

# Readline Module (Node.js v23.11.0, retrieved: 2024-06-20)

## Class: InterfaceConstructor
Signature: InterfaceConstructor extends EventEmitter

Constructor invoked via readline.createInterface(options) or readlinePromises.createInterface(options).

### Events
- 'close'(): emitted on rl.close(), input end, Ctrl+D, or unhandled Ctrl+C.
- 'line'(line: string): emitted on end-of-line input (\n, \r, \r\n) or stream end without EOL.
- 'history'(history: string[]): emitted on history array change (v14.18.0+).
- 'pause'(): emitted when input stream paused or on SIGCONT if not paused.
- 'resume'(): emitted on input stream resume.
- 'SIGCONT'(): emitted when process resumed to foreground (not on Windows).
- 'SIGINT'(): emitted on Ctrl+C if listeners exist; otherwise 'pause'.
- 'SIGTSTP'(): emitted on Ctrl+Z if listener; overrides background behavior (not on Windows).

### Instance Methods
- close(): void — closes interface, emits 'close'.
- [Symbol.dispose](): void — alias for close().
- pause(): void — pauses input stream.
- resume(): void — resumes input stream.
- setPrompt(prompt: string): void — sets prompt string.
- getPrompt(): string — returns current prompt.
- prompt(preserveCursor?: boolean): void — writes prompt, resumes stream; preserveCursor prevents cursor reset.
- write(data: string, key?: {ctrl?: boolean; meta?: boolean; shift?: boolean; name: string}): void — writes data or key sequence into input.
- [Symbol.asyncIterator](): AsyncIterator<string> — enables for await...of to iterate lines, auto-closes on break.
- getCursorPos(): {rows: number; cols: number} — actual cursor position accounting for wrapping.

### Properties
- line: string — current processed input (cleared after 'line').
- cursor: number — cursor offset within rl.line.

## Promises API (experimental, v17.0.0+)

### Class: readlinePromises.Interface
Extends InterfaceConstructor with rl.question(query: string, options?: {signal: AbortSignal}): Promise<string>.

### Class: readlinePromises.Readline
Constructor: new Readline(stream: stream.Writable, options?: {autoCommit?: boolean})
- clearLine(dir: -1|0|1): this
- clearScreenDown(): this
- cursorTo(x: number, y?: number): this
- moveCursor(dx: number, dy: number): this
- commit(): Promise<void>
- rollback(): this

### createInterface(options)
Same options as callback API (below).

## Callback API (stable)

### Class: readline.Interface extends InterfaceConstructor
- question(query: string, options?: {signal: AbortSignal}, callback: (answer: string) => void): void

### Static Methods
- createInterface(options): Interface
- clearLine(stream: stream.Writable, dir: -1|0|1, callback?: (err: Error|null) => void): boolean
- clearScreenDown(stream: stream.Writable, callback?: (err: Error|null) => void): boolean
- cursorTo(stream: stream.Writable, x: number, y?: number, callback?: (err: Error|null) => void): boolean
- moveCursor(stream: stream.Writable, dx: number, dy: number, callback?: (err: Error|null) => void): boolean
- emitKeypressEvents(stream: stream.Readable, interface?: InterfaceConstructor): void

## createInterface Options
Options object fields:
- input: Readable (required)
- output: Writable
- completer: (line: string) => [string[], string] | Promise<[string[], string>]
- terminal: boolean (default: output.isTTY)
- history: string[] (default: [])
- historySize: number (default: 30)
- removeHistoryDuplicates: boolean (default: false)
- prompt: string (default: '> ')
- crlfDelay: number >=100 or Infinity (default: 100)
- escapeCodeTimeout: number in ms (default: 500)
- tabSize: integer >=1 (default: 8)
- signal: AbortSignal

## Examples
### Basic prompt (Promises)
```js
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
const rl = createInterface({ input: stdin, output: stdout });
const answer = await rl.question('What is your favorite food? ');
console.log(answer);
rl.close();
```

### File line-by-line (Callback)
```js
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
const rl = createInterface({ input: createReadStream('input.txt'), crlfDelay: Infinity });
rl.on('line', line => console.log(line));
```

## Attribution
- Source: Node.js Readline
- URL: https://nodejs.org/api/readline.html
- License: Node.js Foundation (MIT-like)
- Crawl Date: 2025-05-03T01:08:44.634Z
- Data Size: 3619143 bytes
- Links Found: 2718

## Retrieved
2025-05-03

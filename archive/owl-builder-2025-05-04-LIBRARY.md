library/READLINE.md
# library/READLINE.md
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
library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
Commander.js v11 for Node.js (≥v18) provides a fluent API on Command objects: instantiate with `new Command(name)`, chain .option(flags,desc,default,parser), .requiredOption, .addOption(Option), .argument, .command for subcommands or executables, .action(handler), .parse()/.parseAsync(), plus utility methods: .version, .name, .usage, .description, .summary, help customization via .helpOption/.helpCommand/.configureHelp/.addHelpText, error handling via .exitOverride/.error/.showHelpAfterError/.showSuggestionAfterError, parsing configuration via .allowUnknownOption/.allowExcessArguments/.enablePositionalOptions/.passThroughOptions, output customization via .configureOutput, lifecycle hooks via .hook(event,listener). Option class supports .default/.choices/.env/.preset/.argParser/.conflicts/.implies/.hideHelp/.makeOptionMandatory.

## Normalised Extract
Table of Contents:
 1 Program Initialization
 2 Defining Options
 3 Processing Option Types
 4 Required and Variadic Options
 5 Command and Subcommand Configuration
 6 Argument Definitions
 7 Action Handlers
 8 Parsing and Execution
 9 Help and Version Handling
10 Error Handling and Overrides
11 Hooks and Lifecycle Events
12 Output Configuration

1 Program Initialization
 Instantiate: const program = new Command('name') or use global require{program}
 Chainable methods return Command instance

2 Defining Options
 .option(flags, description, defaultValue?, parser?)
 Flags: '-s, --sep <char>' or '--flag'
 DefaultValue: string|number|boolean
 Parser: function(value, prev)
 .requiredOption(flags, description, defaultValue?)
 .addOption(new Option(flags, description)[.default()][.choices()][.env()][.preset()][.argParser()][.conflicts()][.implies()][.hideHelp()][.makeOptionMandatory()])

3 Processing Option Types
 Boolean: --flag sets true
 Negatable: --no-flag sets false
 Value: <value> after flag
 Optional: [value]
 Greedy: consumes next arg
 Variadic: <values...>

4 Required and Variadic Options
 Required: .requiredOption throws error if missing
 Variadic: flags ending with '...'; returns array until next dash or '--'

5 Command and Subcommand Configuration
 .command(nameAndArgs, descriptionOrOpts) creates subcommand with action or standalone executable
 .addCommand(cmd, {hidden?,isDefault?}) embeds prepared Command
 .alias(name)
 .executableDir(dir)
 .copyInheritedSettings(parent)

6 Argument Definitions
 .argument(name, description?, defaultValue?, parser?)
 Variadic: '<items...>' returns array
 .addArgument(new Argument(name, description)[.choices()][.default()][.argParser()])

7 Action Handlers
 .action(fn(...args, options, command))
 Async handlers: use .parseAsync
 Handler context: this = command for function expression

8 Parsing and Execution
 .parse(argv?, {from:'node'|'user'|'electron'}) auto-detects Node/Electron
 .parseAsync returns Promise
 .enablePositionalOptions() only parse options before subcommands
 .passThroughOptions() leave unknown options as args
 .allowUnknownOption() skip unknown-option error
 .allowExcessArguments() disable excess-args error

9 Help and Version Handling
 .version(versionString, flags?, description?) active flags -V,--version
 .helpOption(flags, description) customize or disable
 .helpCommand(name, description) customize implicit help command
 .configureHelp({sortOptions:boolean,sortSubcommands:boolean,showGlobalOptions:boolean,formatting functions})
 .addHelpText(position, content)
 showHelpAfterError(message?) auto-print help on error
 showSuggestionAfterError(false) disable spelling suggestions

10 Error Handling and Overrides
 .exitOverride(callback) throw CommanderError
 .error(message, {exitCode?, code?}) exit immediately
 .configureOutput({writeOut,writeErr,outputError})

11 Hooks and Lifecycle Events
 .hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd))
 Async hooks require parseAsync
 Multiple hooks allowed per event

12 Output Configuration
 Write routines: writeOut(str), writeErr(str)
 outputError(str, write) apply color or formatting


## Supplementary Details
Node Requirement: ≥ v18, fallback to older Commander for legacy Node. Global import for simple use: const { program } = require('commander'); Local Command instantiation for testing and complex apps: const { Command } = require('commander'); const program = new Command(); Parser precedence: parser functions receive (value, previous) and return coerced type or throw InvalidArgumentError; default initial value passed as 3rd parameter to .option or 4th for parser. Environment default: .env('VAR') reads process.env.VAR. CLI stop parsing at '--'. Short options may be combined '-abc'. Option value may follow '=' for long flags. Mixed camelCase: multi-word long flags map to camelCase in opts() output. .opts() returns only local options; .optsWithGlobals() merges. getOptionValue(key)/setOptionValue(key,value) to read/write individual option. getOptionValueSource(key) returns 'default'|'env'|'cli'. Subcommand inheritance: .command() inherits parent settings at time of call; .addCommand() does not. Standalone executables: name and path resolution in entry script directory; extension try list: .js,.cjs,.mjs; override file via { executableFile: 'path' }. Debug child process ports: Node --inspect child increments port by 1; VSCode autoAttachChildProcesses:true. npm run-script requires '--' to pass options. Legacy .storeOptionsAsProperties() maps opts to properties on command object. Typescript support: using @commander-js/extra-typings for strong types; ts-node use node -r ts-node/register entry.ts. createCommand(): factory for new commands, override to customize subcommand class. 

## Reference Details
Class: Command
  constructor(name?: string)
  option(flags: string, description?: string, defaultValue?: any, parser?: (value:any,prev:any)=>any): Command
  requiredOption(flags: string, description: string, defaultValue?: any): Command
  addOption(option: Option): Command
  argument(arg: string, description?: string, defaultValue?: any, parser?: Function): Command
  addArgument(arg: Argument): Command
  command(nameAndArgs: string, description?: string | object, opts?: object): Command | this
  addCommand(cmd: Command, opts?: { hidden?: boolean, isDefault?: boolean }): this
  alias(name: string): Command
  exectuableDir(dir: string): Command
  action(fn: (...args:any[])=>void): Command
  parse(argv?: string[], opts?: { from: 'user'|'node'|'electron' }): Command
  parseAsync(argv?: string[], opts?: object): Promise<Command>
  version(version: string, flags?: string, description?: string): Command
  name(str: string): Command
  usage(str: string): Command
  description(str: string, details?: string): Command
  summary(str: string): Command
  helpOption(flags: string|false, description?: string): Command
  helpCommand(name?: string|false, description?: string): Command
  configureHelp(opts: { sortOptions?: boolean, sortSubcommands?: boolean, showGlobalOptions?: boolean, formatHelp?: Function, ... }): Command
  addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', content: string|Function): Command
  showHelpAfterError(msg?: string): Command
  showSuggestionAfterError(flag: boolean): Command
  allowUnknownOption(flag?: boolean): Command
  allowExcessArguments(flag?: boolean): Command
  enablePositionalOptions(): Command
  passThroughOptions(): Command
  exitOverride(callback?: (err: CommanderError)=>void): Command
  configureOutput(opts: { writeOut?: (str:string)=>void, writeErr?: (str:string)=>void, outputError?: (str:string, write:(s:string)=>void)=>void }): Command
  error(message: string, options?: { exitCode?: number, code?: string }): never
  hook(event: 'preAction'|'postAction'|'preSubcommand', listener: Function): Command
  createCommand(): Command

Class: Option
  constructor(flags: string, description?: string)
  default(value: any, name?: string): Option
  choices(list: any[]): Option
  env(name: string): Option
  preset(value: any): Option
  argParser(fn: (value:string,prev:any)=>any): Option
  conflicts(other: string): Option
  implies(mapping: object): Option
  hideHelp(): Option
  makeOptionMandatory(): Option

Error Classes: InvalidArgumentError extends Error; CommanderError { exitCode:number; code:string; message:string }

Usage Patterns:
 - Combine flags: -ab for boolean a and b; -n80 for -n 80
 - End options: --
 - Pass-through in npm: npm run-script cmd -- --flag

Best Practices:
 - Use local Command for unit tests
 - Explicit .name() for consistent help
 - Use .hook('preAction') for trace logs
 - Use .exitOverride() in daemons to catch errors
 - ConfigureOutput for custom UI

Troubleshooting:
$ node app.js --unknown
error: unknown option '--unknown'
(add --help for additional information)
$ node app.js -p
error: option '-p, --port <number>' argument missing
$ node app.js --drink huge
error: option '-d, --drink <size>' argument 'huge' is invalid. Allowed choices are small, medium, large.
$ conflict example:
program.addOption(new Option('--disable-server').conflicts('port'))
$ node app --disable-server --port 8000
error: option '--disable-server' cannot be used with option '-p, --port <number>'


## Information Dense Extract
Commander.js v11: import {Command, Option, Argument} from 'commander'; instantiate via new Command(name); chain .option(flags,desc,default,parser), .requiredOption, .addOption; define arguments via .argument/.addArgument; create subcommands via .command/.addCommand with opts hidden,isDefault,executableFile; attach handlers via .action(fn); parse via .parse()/parseAsync(); customize help via .version/.helpOption/.helpCommand/.configureHelp/.addHelpText; configure parsing via .allowUnknownOption/.allowExcessArguments/.enablePositionalOptions/.passThroughOptions; override exit via .exitOverride, error via .error; hook events 'preAction'|'postAction'|'preSubcommand'; configure output via .configureOutput(writeOut,writeErr,outputError). Option class supports .default/.choices/.env/.preset/.argParser/.conflicts/.implies/.hideHelp/.makeOptionMandatory. Errors: InvalidArgumentError, CommanderError(exitCode,code,message). Node ≥v18 required.

## Sanitised Extract
Table of Contents:
 1 Program Initialization
 2 Defining Options
 3 Processing Option Types
 4 Required and Variadic Options
 5 Command and Subcommand Configuration
 6 Argument Definitions
 7 Action Handlers
 8 Parsing and Execution
 9 Help and Version Handling
10 Error Handling and Overrides
11 Hooks and Lifecycle Events
12 Output Configuration

1 Program Initialization
 Instantiate: const program = new Command('name') or use global require{program}
 Chainable methods return Command instance

2 Defining Options
 .option(flags, description, defaultValue?, parser?)
 Flags: '-s, --sep <char>' or '--flag'
 DefaultValue: string|number|boolean
 Parser: function(value, prev)
 .requiredOption(flags, description, defaultValue?)
 .addOption(new Option(flags, description)[.default()][.choices()][.env()][.preset()][.argParser()][.conflicts()][.implies()][.hideHelp()][.makeOptionMandatory()])

3 Processing Option Types
 Boolean: --flag sets true
 Negatable: --no-flag sets false
 Value: <value> after flag
 Optional: [value]
 Greedy: consumes next arg
 Variadic: <values...>

4 Required and Variadic Options
 Required: .requiredOption throws error if missing
 Variadic: flags ending with '...'; returns array until next dash or '--'

5 Command and Subcommand Configuration
 .command(nameAndArgs, descriptionOrOpts) creates subcommand with action or standalone executable
 .addCommand(cmd, {hidden?,isDefault?}) embeds prepared Command
 .alias(name)
 .executableDir(dir)
 .copyInheritedSettings(parent)

6 Argument Definitions
 .argument(name, description?, defaultValue?, parser?)
 Variadic: '<items...>' returns array
 .addArgument(new Argument(name, description)[.choices()][.default()][.argParser()])

7 Action Handlers
 .action(fn(...args, options, command))
 Async handlers: use .parseAsync
 Handler context: this = command for function expression

8 Parsing and Execution
 .parse(argv?, {from:'node'|'user'|'electron'}) auto-detects Node/Electron
 .parseAsync returns Promise
 .enablePositionalOptions() only parse options before subcommands
 .passThroughOptions() leave unknown options as args
 .allowUnknownOption() skip unknown-option error
 .allowExcessArguments() disable excess-args error

9 Help and Version Handling
 .version(versionString, flags?, description?) active flags -V,--version
 .helpOption(flags, description) customize or disable
 .helpCommand(name, description) customize implicit help command
 .configureHelp({sortOptions:boolean,sortSubcommands:boolean,showGlobalOptions:boolean,formatting functions})
 .addHelpText(position, content)
 showHelpAfterError(message?) auto-print help on error
 showSuggestionAfterError(false) disable spelling suggestions

10 Error Handling and Overrides
 .exitOverride(callback) throw CommanderError
 .error(message, {exitCode?, code?}) exit immediately
 .configureOutput({writeOut,writeErr,outputError})

11 Hooks and Lifecycle Events
 .hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd))
 Async hooks require parseAsync
 Multiple hooks allowed per event

12 Output Configuration
 Write routines: writeOut(str), writeErr(str)
 outputError(str, write) apply color or formatting

## Original Source
Commander.js
https://github.com/tj/commander.js/#readme

## Digest of COMMANDER_JS

# Installation and Quick Start (Retrieved: 2023-11-20)

## Installation

Install via npm:

    npm install commander

Requires Node.js ≥ v18. Commander 11.0.0 used in examples.

## Quick Start Example (split.js)

    const { program } = require('commander');

    program
      .option('--first')
      .option('-s, --separator <char>')
      .argument('<string>')
      .parse();

    const options = program.opts();
    const limit   = options.first ? 1 : undefined;
    console.log(program.args[0].split(options.separator, limit));

$ node split.js -s / --first a/b/c
[ 'a' ]

## Core API Method Signatures

    new Command([name: string])
    Command.option(flags: string, description?: string, defaultValue?: any, parser?: Function)
      → Command
    Command.requiredOption(flags: string, description: string, defaultValue?: any)
      → Command
    Command.addOption(option: Option)
      → Command
    Command.argument(arg: string, description?: string, defaultValue?: any, parser?: Function)
      → Command
    Command.command(nameAndArgs: string, description?: string | { executableFile?: string, isDefault?: boolean, hidden?: boolean })
      → Command | this
    Command.addCommand(cmd: Command, opts?: { hidden?: boolean, isDefault?: boolean })
      → this
    Command.action(fn: Function)
      → Command
    Command.parse(argv?: string[], opts?: { from: 'user' | 'node' | 'electron' })
      → Command
    Command.parseAsync(argv?: string[], opts?: object)
      → Promise<Command>
    Command.version(version: string, flags?: string, description?: string)
      → Command
    Command.name(str: string)
      → Command
    Command.usage(str: string)
      → Command
    Command.description(str: string, details?: string)
      → Command
    Command.summary(str: string)
      → Command
    Command.helpOption(flags: string | false, description?: string)
      → Command
    Command.helpCommand(name?: string | false, description?: string)
      → Command
    Command.configureHelp(options: object)
      → Command
    Command.addHelpText(position: 'beforeAll' | 'before' | 'after' | 'afterAll', content: string | Function)
      → Command
    Command.showHelpAfterError(msg?: string)
      → Command
    Command.showSuggestionAfterError(value: boolean)
      → Command
    Command.allowUnknownOption(value?: boolean)
      → Command
    Command.allowExcessArguments(value?: boolean)
      → Command
    Command.enablePositionalOptions()
      → Command
    Command.passThroughOptions()
      → Command
    Command.exitOverride(handler?: Function)
      → Command
    Command.configureOutput(opts: { writeOut?: Function, writeErr?: Function, outputError?: Function })
      → Command
    Command.error(message: string, options?: { exitCode?: number, code?: string })
      → never
    Command.hook(event: 'preAction' | 'postAction' | 'preSubcommand', listener: Function)
      → Command
    Command.createCommand()
      → Command

## Option Class

    new Option(flags: string, description?: string)
      .default(value: any, name?: string)
      .choices(list: any[])
      .env(varName: string)
      .preset(value: any)
      .argParser(parser: Function)
      .conflicts(other: string)
      .implies(mapping: object)
      .hideHelp()
      .makeOptionMandatory()

## Attribution

Source: GitHub tj/commander.js README.md  (Data Size: 802392 bytes, Links: 5541, Error: None)


## Attribution
- Source: Commander.js
- URL: https://github.com/tj/commander.js/#readme
- License: MIT License
- Crawl Date: 2025-05-03T00:07:24.536Z
- Data Size: 802392 bytes
- Links Found: 5541

## Retrieved
2025-05-03
library/CHALK.md
# library/CHALK.md
# CHALK

## Crawl Summary
npm install chalk; import chalk from 'chalk'; chalk.<style>[.<style>...](string,...string[]):string; chalk.level:0-3; per-instance new Chalk({level}); supportsColor object with level and flags; use FORCE_COLOR env or --color flags to override; separate stderr instance: chalkStderr and supportsColorStderr; exposed arrays: modifierNames, foregroundColorNames, backgroundColorNames, colorNames; style names lists; color models: rgb, hex, ansi256 with bg variants; downsampling levels: 16,256,truecolor; theme definitions via function assignments; string substitution via %s; no dependencies; nestable; high adoption.

## Normalised Extract
Table of Contents:
1 Installation
2 Importing
3 Basic Usage
4 Composable API
5 Theme Definition
6 String Substitution
7 Color Level Configuration
8 Color Detection & Forcing
9 stderr Instance
10 Style Name Arrays
11 Styles List
12 Color Models & Levels

1 Installation
npm install chalk

2 Importing
import chalk from 'chalk'
import {Chalk} from 'chalk'

3 Basic Usage
console.log(chalk.blue('Hello world!'))

4 Composable API
Signature: chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
Chain order irrelevant; last style overrides
Multi-arg: separated by spaces

5 Theme Definition
const error=chalk.bold.red
const warning=chalk.hex('#FFA500')
error('Error!')
warning('Warning!')

6 String Substitution
console.log(chalk.green('Hello %s'), name)

7 Color Level Configuration
chalk.level = 0|1|2|3
const custom=new Chalk({level:0})

8 Color Detection & Forcing
supportsColor: {level, hasBasic, has256, has16m}
FORCE_COLOR=0|1|2|3
Flags: --color, --no-color, --color=256, --color=16m

9 stderr Instance
chalkStderr: Chalk instance configured per stderr support detection
supportsColorStderr: supportsColor for stderr

10 Style Name Arrays
modifierNames: [reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible]
foregroundColorNames: [black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright]
backgroundColorNames: [bgBlack,bgRed,bgGreen,bgYellow,bgBlue,bgMagenta,bgCyan,bgWhite,bgBlackBright,bgRedBright,bgGreenBright,bgYellowBright,bgBlueBright,bgMagentaBright,bgCyanBright,bgWhiteBright]
colorNames: combination of both

11 Styles List
Modifiers and color names as above

12 Color Models & Levels
rgb(r,g,b), hex('#rrggbb'), ansi256(n)
bgRgb, bgHex, bgAnsi256
Level1: 16 colors; Level2: 256; Level3: truecolor


## Supplementary Details
Function Signatures and Types:
- chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
- chalk.rgb(r:number,g:number,b:number):Chalk
- chalk.hex(hex:string):Chalk
- chalk.ansi256(code:number):Chalk
- chalk.bgRgb(r:number,g:number,b:number):Chalk
- chalk.bgHex(hex:string):Chalk
- chalk.bgAnsi256(code:number):Chalk
- Chalk constructor: new Chalk(options:{level:number})

Properties:
- chalk.level: number default auto-detected (0-3)
- supportsColor: {level:number,hasBasic:boolean,has256:boolean,has16m:boolean}
- supportsColorStderr: same structure for stderr
- chalkStderr: Chalk
- modifierNames: string[]
- foregroundColorNames: string[]
- backgroundColorNames: string[]
- colorNames: string[]

Environment Variables and CLI Flags:
- FORCE_COLOR: 0 (disable),1 (basic),2 (256),3 (truecolor)
- --color, --no-color (boolean mode)
- --color=256, --color=16m (explicit modes)

Implementation Steps:
1 install via npm
2 import module
3 apply styles via chainable API
4 override global level or create custom Chalk instance
5 use supportsColor to branch logic
6 define theme constants via style combinations



## Reference Details
API Specifications:
function chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
- Applies ANSI escape codes for each style in chain; returns concatenated styled string

property chalk.level:number
- 0: disable all color
- 1: basic (16 colors)
- 2: 256 colors
- 3: truecolor (16 million)

class Chalk
constructor(options:{level:number})
methods returning Chalk instance for further chaining:
- rgb(r:number,g:number,b:number)
- hex(hex:string)
- ansi256(code:number)
- bgRgb(r:number,g:number,b:number)
- bgHex(hex:string)
- bgAnsi256(code:number)
- reset(), bold(), dim(), italic(), underline(), overline(), inverse(), hidden(), strikethrough(), visible()

properties:
- level:number

object supportsColor and supportsColorStderr
type: {level:number,hasBasic:boolean,has256:boolean,has16m:boolean}

utility arrays:
- modifierNames:string[] length 11
- foregroundColorNames:string[] length 16
- backgroundColorNames:string[] length 16
- colorNames:string[] length 32

Exact Code Examples:
import chalk from 'chalk'
console.log(chalk.blue('Hello','World!')) // yields ESC[34mHello World!ESC[39m
console.log(chalk.red.bgWhite.bold('Alert'))
const custom=new Chalk({level:2})
console.log(custom.rgb(0,255,0)('OK'))

Implementation Patterns:
- Create theme constants: const info=chalk.blue; info('Info message')
- Nest styles: chalk.green('green', chalk.red('red'), 'green again')
- Template literals: console.log(`Status: ${chalk.yellow('pending')}`)

Configuration Options:
- Global override: chalk.level=0|1|2|3
- Env override: FORCE_COLOR=...
- CLI flags as described

Best Practices:
- Use new Chalk for reusable modules to avoid global side effects
- Check supportsColor before printing color-specific output
- Define and reuse theme constants for consistency

Troubleshooting Procedures:
- No colors: verify supportsColor.level; run node with --color or set FORCE_COLOR
- stderr color missing: use chalkStderr in console.error
- Windows no color: switch to Windows Terminal or use external ANSI support
- To strip ANSI codes: pipe output through strip-ansi
Commands:
$ FORCE_COLOR=1 node app.js
$ node --color=256 app.js
$ env | grep FORCE_COLOR


## Information Dense Extract
npm install chalk; import chalk from 'chalk'; chalk.<style>[.<style>...](input:string,...inputs:string[]):string; styles: reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible; colors: black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright; backgrounds: bgBlack,...,bgWhiteBright; color models: rgb(r,g,b), hex('#rrggbb'), ansi256(n) with bg variants; chalk.level:0-3; new Chalk({level}); supportsColor/supportsColorStderr: {level,hasBasic,has256,has16m}; FORCE_COLOR=0-3; --color flags; theme constants; template literal usage; nesting; new Chalk for libraries; check supportsColor before styling; troubleshooting via env flags and Windows Terminal.

## Sanitised Extract
Table of Contents:
1 Installation
2 Importing
3 Basic Usage
4 Composable API
5 Theme Definition
6 String Substitution
7 Color Level Configuration
8 Color Detection & Forcing
9 stderr Instance
10 Style Name Arrays
11 Styles List
12 Color Models & Levels

1 Installation
npm install chalk

2 Importing
import chalk from 'chalk'
import {Chalk} from 'chalk'

3 Basic Usage
console.log(chalk.blue('Hello world!'))

4 Composable API
Signature: chalk.<style>[.<style>...](input:string, ...inputs:string[]):string
Chain order irrelevant; last style overrides
Multi-arg: separated by spaces

5 Theme Definition
const error=chalk.bold.red
const warning=chalk.hex('#FFA500')
error('Error!')
warning('Warning!')

6 String Substitution
console.log(chalk.green('Hello %s'), name)

7 Color Level Configuration
chalk.level = 0|1|2|3
const custom=new Chalk({level:0})

8 Color Detection & Forcing
supportsColor: {level, hasBasic, has256, has16m}
FORCE_COLOR=0|1|2|3
Flags: --color, --no-color, --color=256, --color=16m

9 stderr Instance
chalkStderr: Chalk instance configured per stderr support detection
supportsColorStderr: supportsColor for stderr

10 Style Name Arrays
modifierNames: [reset,bold,dim,italic,underline,overline,inverse,hidden,strikethrough,visible]
foregroundColorNames: [black,red,green,yellow,blue,magenta,cyan,white,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright]
backgroundColorNames: [bgBlack,bgRed,bgGreen,bgYellow,bgBlue,bgMagenta,bgCyan,bgWhite,bgBlackBright,bgRedBright,bgGreenBright,bgYellowBright,bgBlueBright,bgMagentaBright,bgCyanBright,bgWhiteBright]
colorNames: combination of both

11 Styles List
Modifiers and color names as above

12 Color Models & Levels
rgb(r,g,b), hex('#rrggbb'), ansi256(n)
bgRgb, bgHex, bgAnsi256
Level1: 16 colors; Level2: 256; Level3: truecolor

## Original Source
Chalk
https://github.com/chalk/chalk#readme

## Digest of CHALK

# Chalk Technical Digest (Retrieved 2024-07-05)

# Installation

npm install chalk

# Importing

import chalk from 'chalk';
import {Chalk} from 'chalk';

# Basic Usage

console.log(chalk.blue('Hello world!'));

# Composable API

**Signature**

chalk.<style>[.<style>...](input:string, ...inputs:string[]): string

**Behavior**

- Chain any number of style properties; last one wins on conflict
- Multiple arguments are joined by spaces

# Theme Definition

const error = chalk.bold.red
const warning = chalk.hex('#FFA500')
console.log(error('Error!'))
console.log(warning('Warning!'))

# String Substitution

console.log(chalk.green('Hello %s'), name)

# Color Level Configuration

chalk.level: number (0-3)
new Chalk({level:number}) // per-instance override

# Color Detection & Forcing

- supportsColor: {level, hasBasic, has256, has16m}
- FORCE_COLOR=0|1|2|3 overrides all
- CLI flags: --color, --no-color, --color=256, --color=16m

# stderr Instance

chalkStderr: Chalk // color support based on stderr
supportsColorStderr: supportsColor object

# Exposed Style Name Arrays

modifierNames: string[]
foregroundColorNames: string[]
backgroundColorNames: string[]
colorNames: string[]

# Styles

Modifiers: reset, bold, dim, italic, underline, overline, inverse, hidden, strikethrough, visible
Colors: black, red, green, yellow, blue, magenta, cyan, white, blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright
Backgrounds: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright

# Color Models & Downsampling

- rgb(r:number,g:number,b:number)
- hex(hex:string)
- ansi256(code:number)
- bgRgb, bgHex, bgAnsi256 variants
- Level1 downsampling: 16 colors; Level2: 256; Level3: truecolor

# Performance & Adoption

- No dependencies
- High performance
- Used by ~115,000 packages


## Attribution
- Source: Chalk
- URL: https://github.com/chalk/chalk#readme
- License: MIT License
- Crawl Date: 2025-05-03T08:50:11.740Z
- Data Size: 703582 bytes
- Links Found: 5476

## Retrieved
2025-05-03
library/CONVENTIONAL_COMMITS.md
# library/CONVENTIONAL_COMMITS.md
# CONVENTIONAL_COMMITS

## Crawl Summary
Commits must follow `<type>[scope][!]: description` header with optional body and footers. Types: feat→MINOR, fix→PATCH; others no effect. Scope in parentheses. Description required, max 72 chars. Body separated by blank line. Footers: `<token>: <value>` or `token #value`, token hyphenated. Breaking changes: use `!` or `BREAKING CHANGE:` footer. Implement with commitlint rules and conventional-changelog CLI.

## Normalised Extract
Table of Contents
1 Commit Message Grammar
2 Type Definitions
3 Scope Syntax
4 Description Requirements
5 Body Content
6 Footer Format
7 Breaking Change Indicators
8 Usage Examples

1 Commit Message Grammar
Header must match regex ^(?<type>\w+)(?:\((?<scope>[\w\- ]+)\))?(?<breaking>!)?: (?<description>.+)$

2 Type Definitions
feat : increment MINOR version
fix  : increment PATCH version
Allowed additional types: build, chore, ci, docs, style, refactor, perf, test (no semver effect unless breaking)

3 Scope Syntax
scope MUST be noun/hyphen words inside () immediately after type, e.g., feat(parser-core)

4 Description Requirements
MUST follow colon and space. SHOULD be ≤72 chars. No trailing period.

5 Body Content
MAY include after one blank line. Free-form paragraphs. No metadata tokens.

6 Footer Format
MAY include after one blank line. Each line:<token>: <value> or <token> #<value>. Tokens use hyphens, e.g., Reviewed-by.

7 Breaking Change Indicators
MUST use ! in header before : OR FOOTER token BREAKING CHANGE:. Include description after ": ".

8 Usage Examples
feat(cli): add interactive prompt
fix(api)!: remove deprecated parameter
BREAKING CHANGE: config file format changed


## Supplementary Details
Commitlint configuration snippet:
{
  "rules": {
    "type-enum": [2, "always", ["feat","fix","build","chore","ci","docs","style","refactor","perf","test"]],
    "scope-case": [2, "always", "kebab-case"],
    "header-max-length": [2, "always", 72],
    "subject-case": [2, "never", ["start-case","pascal-case"]]
  }
}

Conventional-changelog CLI:
npx conventional-changelog -p angular -i CHANGELOG.md -s

Semantic-release plugin:
"@semantic-release/commit-analyzer": {"preset":"angular"}


## Reference Details
Regex validation in parser:
const headerPattern = /^(\w+)(?:\([\w\- ]+\))!?\: .+$/;

Sample commitlint.config.js:
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: { 'header-max-length': [2, 'always', 72] }
};

Git hook integration (husky):
"husky":{ "hooks":{ "commit-msg":"commitlint -E HUSKY_GIT_PARAMS" }}

Best practice: Use git commit --amend to fix header mismatch. Then git push --force-with-lease.

Troubleshooting common errors:
Error: header must not be longer than 72 characters
Command: commitlint -e $GIT_PARAMS
Fix: shorten header summary.


## Information Dense Extract
HeaderRegex:^(type)(\(scope\))?(!)?:description;Types:feat→MINOR,fix→PATCH,others no semver;Scope:(noun-hyphen);Desc:MUST non-empty,≤72;Body:MAY paragraphs after blank-line;Footer:token: value or token #value;TokenHyphenated;Breaking:! or BREAKING CHANGE:desc;CommitlintRules:type-enum,scope-case,kebab,header-max-length72;CLI:npx conventional-changelog -p angular -i CHANGELOG.md -s;GitHook:husky commitlint;Amend:git commit --amend;Push:--force-with-lease;

## Sanitised Extract
Table of Contents
1 Commit Message Grammar
2 Type Definitions
3 Scope Syntax
4 Description Requirements
5 Body Content
6 Footer Format
7 Breaking Change Indicators
8 Usage Examples

1 Commit Message Grammar
Header must match regex ^(?<type>'w+)(?:'((?<scope>['w'- ]+)'))?(?<breaking>!)?: (?<description>.+)$

2 Type Definitions
feat : increment MINOR version
fix  : increment PATCH version
Allowed additional types: build, chore, ci, docs, style, refactor, perf, test (no semver effect unless breaking)

3 Scope Syntax
scope MUST be noun/hyphen words inside () immediately after type, e.g., feat(parser-core)

4 Description Requirements
MUST follow colon and space. SHOULD be 72 chars. No trailing period.

5 Body Content
MAY include after one blank line. Free-form paragraphs. No metadata tokens.

6 Footer Format
MAY include after one blank line. Each line:<token>: <value> or <token> #<value>. Tokens use hyphens, e.g., Reviewed-by.

7 Breaking Change Indicators
MUST use ! in header before : OR FOOTER token BREAKING CHANGE:. Include description after ': '.

8 Usage Examples
feat(cli): add interactive prompt
fix(api)!: remove deprecated parameter
BREAKING CHANGE: config file format changed

## Original Source
Conventional Commits Specification
https://www.conventionalcommits.org/en/v1.0.0/

## Digest of CONVENTIONAL_COMMITS

# Conventional Commits 1.0.0

## Overview
The Conventional Commits spec defines a strict commit message format:
  - Header: `<type>[scope][!]: description`
  - Body: blank line followed by free-form text
  - Footers: blank line followed by one or more metadata lines

## Grammar
```regex
^(?<type>\w+)(?:\((?<scope>[\w\- ]+)\))?(?<breaking>!)?: (?<description>.+)$```

## Types
  • feat (MINOR semver)  
  • fix (PATCH semver)  
  • build, chore, ci, docs, style, refactor, perf, test, etc. (no semver effect unless breaking)

## Scope
  • Format: noun or hyphenated words inside parentheses  
  • Example: `feat(parser): parse arrays`

## Description
  • Required: non-empty summary after `: `  
  • Max length: 72 characters recommended

## Body
  • Optional: blank line then paragraphs  
  • Explain motivation and internal details

## Footers
  • Format: `<token>: <value>` or `<token> #<value>`  
  • Tokens use hyphens instead of spaces except `BREAKING CHANGE`

## Breaking Changes
  • Indicated by `!` before `:` or `BREAKING CHANGE: description` footer  
  • Always use uppercase token and provide description

## Examples
  • `feat: add new API method`
  • `fix(api)!: update endpoint signature`
  • Footer example:
    BREAKING CHANGE: endpoint now requires auth token

## Integration
  • commitlint rules: type-enum, header-max-length, scope-case, subject-capital-letter
  • changelog generation: conventional-changelog CLI, semantic-release plugins

## Troubleshooting
  • git rebase -i HEAD~N to amend past commits  
  • commitlint error codes and remediation  
  • Fix invalid header: update to match regex

Retrieved: 2023-10-10
Data Size: 352798 bytes

## Attribution
- Source: Conventional Commits Specification
- URL: https://www.conventionalcommits.org/en/v1.0.0/
- License: CC0 Public Domain
- Crawl Date: 2025-05-03T20:48:27.235Z
- Data Size: 352798 bytes
- Links Found: 232

## Retrieved
2025-05-03
library/DOTENV.md
# library/DOTENV.md
# DOTENV

## Crawl Summary
Load .env file into process.env via require('dotenv').config(). Default options: path=path.resolve(cwd,'.env'), encoding='utf8', debug=false, override=false, processEnv=process.env. parse(src: Buffer|string, opt.debug=false) returns key/value object. populate(target, parsed, opt.override=false, opt.debug=false) assigns parsed keys. CLI preload via node -r dotenv/config supports dotenv_config_path and dotenv_config_debug flags or DOTENV_CONFIG_<OPTION> env variables. .env syntax: KEY=VALUE, multiline support via quotes or \n, comments start #. For advanced needs use dotenv-expand for variable expansion and dotenvx for multi-environment, encrypted, sync, and deploy workflows. Troubleshooting: config debug, file path, webpack polyfills.

## Normalised Extract
Table of Contents:
1. Installation
2. Configuration API
3. CLI Preload
4. Parse API
5. Populate API
6. .env File Syntax
7. Troubleshooting

1. Installation
npm install dotenv --save
or yarn add dotenv
or bun add dotenv

2. Configuration API
Function: require('dotenv').config(options)
Options:
  path: string or string[] (default path.resolve(process.cwd(),'.env'))
  encoding: string (default 'utf8')
  debug: boolean (default false)
  override: boolean (default false)
  processEnv: object (default process.env)
Returns: { parsed?: Record<string,string>, error?: Error }

3. CLI Preload
Command: node -r dotenv/config script.js
Flags:
  dotenv_config_path=/custom/path/.env
  dotenv_config_debug=true
Environment Variables:
  DOTENV_CONFIG_<OPTION>=value overrides flags

4. Parse API
Function: dotenv.parse(src, options)
src: string or Buffer containing env data
options:
  debug: boolean (default false)
Returns: Record<string,string>

5. Populate API
Function: dotenv.populate(target, source, options)
target: object to receive variables (e.g., process.env)
source: parsed key/value object
options:
  override: boolean (default false)
  debug: boolean (default false)
Returns: void

6. .env File Syntax
Entries: KEY=VALUE per line
Comments: lines starting with # or inline after values
Quoted values preserve inner whitespace; double quotes expand newlines
Multiline values: use literal line breaks inside quotes or \n escapes
Backtick delimiters supported
Empty values produce empty strings

7. Troubleshooting
If .env is not loaded:
  require('dotenv').config({ debug: true })
If React variables missing, prefix with REACT_APP_
Webpack front-end error crypto|os|path:
  npm install node-polyfill-webpack-plugin
  add NodePolyfillPlugin to webpack.config.js

## Supplementary Details
Default parameter values:
path: path.resolve(process.cwd(), '.env')
encoding: 'utf8'
debug: false (use for verbose parsing/populating logs)
override: false (set true to overwrite existing environment variables)
processEnv: process.env (overwrite target if custom object provided)

Implementation Steps:
1. Place .env in project root or working directory.
2. Install dotenv via npm, yarn, or bun.
3. Early in app entry point call require('dotenv').config(opts) or import 'dotenv/config'.
4. Access variables via process.env.KEY.
5. For advanced parsing use dotenv.parse(), then manually assign via dotenv.populate().
6. Use CLI preload to avoid explicit require in code.

Multi-environment & Encryption (via dotenvx):
• Use dotenvx run --env-file=.env.production -- node index.js
• Use dotenvx set KEY value --encrypt -f .env.production
• Provide DOTENV_PRIVATE_KEY_ENV to CLI for decryption

## Reference Details
### API Specifications

#### config(options?: ConfigOptions) => ConfigOutput
```ts
interface ConfigOptions {
  path?: string | string[];
  encoding?: string;
  debug?: boolean;
  override?: boolean;
  processEnv?: Record<string,string>;
}
interface ConfigOutput {
  parsed?: Record<string,string>;
  error?: Error;
}
```
- Defaults:
  path = path.resolve(process.cwd(), '.env')
  encoding = 'utf8'
  debug = false
  override = false
  processEnv = process.env

##### Example:
```js
const result = require('dotenv').config({
  path: ['/app/.env.local', '/app/.env'],
  encoding: 'latin1',
  debug: process.env.DEBUG === 'true',
  override: true
});
if (result.error) {
  console.error('Failed to load .env:', result.error);
  process.exit(1);
}
console.log('Loaded env:', result.parsed);
```

#### parse(src: string | Buffer, options?: { debug?: boolean }) => Record<string,string>
- Accepts raw env content as string or Buffer
- Returns key/value object
- Options.debug enables parse error logs

##### Example:
```js
const fs = require('fs');
const dotenv = require('dotenv');
const content = fs.readFileSync('.env');
const parsed = dotenv.parse(content, { debug: true });
console.log(parsed);
```

#### populate(target: object, source: Record<string,string>, options?: { override?: boolean; debug?: boolean; }) => void
- Copies source entries into target
- override=true overwrites existing keys
- debug=true logs each assignment

##### Example:
```js
const dotenv = require('dotenv');
const parsed = { API_URL: 'https://api' };
dotenv.populate(process.env, parsed, { override: true, debug: true });
console.log(process.env.API_URL);
```

### CLI Preload Patterns
```bash
# Preload dotenv without code
node -r dotenv/config index.js
# with options
node -r dotenv/config index.js dotenv_config_path=/config/.env dotenv_config_debug=true
# via env vars
DOTENV_CONFIG_PATH=/config/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config index.js
```

### .env File Syntax and Rules
- KEY=VALUE pairs
environment lines trimmed
- Comments start at # outside quotes
- Empty values produce ''
- Quoted values preserve whitespace
double quotes expand newlines
templated lines supported by dotenvx

### Best Practices
1. Add require('dotenv').config() at top of entry file
2. Use override only when safe to overwrite existing env
3. Validate required vars at startup
4. Do not commit .env to VCS

### Troubleshooting Procedures
1. .env not loaded:
   ```js
   const result = require('dotenv').config({ debug: true });
   if (result.error) console.error(result.error);
   ```
2. React missing vars: prefix REACT_APP_
3. Webpack missing crypto/polyfill:
   ```bash
   npm install node-polyfill-webpack-plugin
   ```
   ```js
   // webpack.config.js
   const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
   module.exports = { plugins: [new NodePolyfillPlugin()] };
   ```
4. Prevent .env commit in Docker builds:
   ```dockerfile
   RUN curl -fsS https://dotenvx.sh/ | sh && dotenvx prebuild
   ```

### Git Hook to Prevent .env Commit
```bash
brew install dotenvx/brew/dotenvx
dotenvx precommit --install
```

## Information Dense Extract
config(options:{path=string|string[]=path.resolve(cwd,'.env'),encoding='utf8',debug=false,override=false,processEnv=process.env})=>{parsed?:Record<string,string>,error?:Error} parse(src:string|Buffer,options:{debug=false})=>Record<string,string> populate(target:object,source:Record<string,string>,options:{override=false,debug=false})=>void CLI preload: node -r dotenv/config [dotenv_config_path=PATH dotenv_config_debug=true] or set DOTENV_CONFIG_<OPTION>=value .env syntax: KEY=VALUE, comments #, multilines via quoted blocks or \n, quoted values preserve whitespace, backticks supported, empty values->''. Best practices: load early, one .env per env, never commit .env. Troubleshoot with config debug, validate path, prefix REACT_APP_, add node-polyfill-webpack-plugin for webpack.

## Sanitised Extract
Table of Contents:
1. Installation
2. Configuration API
3. CLI Preload
4. Parse API
5. Populate API
6. .env File Syntax
7. Troubleshooting

1. Installation
npm install dotenv --save
or yarn add dotenv
or bun add dotenv

2. Configuration API
Function: require('dotenv').config(options)
Options:
  path: string or string[] (default path.resolve(process.cwd(),'.env'))
  encoding: string (default 'utf8')
  debug: boolean (default false)
  override: boolean (default false)
  processEnv: object (default process.env)
Returns: { parsed?: Record<string,string>, error?: Error }

3. CLI Preload
Command: node -r dotenv/config script.js
Flags:
  dotenv_config_path=/custom/path/.env
  dotenv_config_debug=true
Environment Variables:
  DOTENV_CONFIG_<OPTION>=value overrides flags

4. Parse API
Function: dotenv.parse(src, options)
src: string or Buffer containing env data
options:
  debug: boolean (default false)
Returns: Record<string,string>

5. Populate API
Function: dotenv.populate(target, source, options)
target: object to receive variables (e.g., process.env)
source: parsed key/value object
options:
  override: boolean (default false)
  debug: boolean (default false)
Returns: void

6. .env File Syntax
Entries: KEY=VALUE per line
Comments: lines starting with # or inline after values
Quoted values preserve inner whitespace; double quotes expand newlines
Multiline values: use literal line breaks inside quotes or 'n escapes
Backtick delimiters supported
Empty values produce empty strings

7. Troubleshooting
If .env is not loaded:
  require('dotenv').config({ debug: true })
If React variables missing, prefix with REACT_APP_
Webpack front-end error crypto|os|path:
  npm install node-polyfill-webpack-plugin
  add NodePolyfillPlugin to webpack.config.js

## Original Source
dotenv
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Dotenv README Digest
Retrieved: 2024-06-30
Data Size: 643985 bytes
Source: https://github.com/motdotla/dotenv#readme

# Installation

npm install dotenv --save

yarn add dotenv

bun add dotenv

# Basic Usage

1. Create a .env file in your project root:
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEYGOESHERE"
2. In CommonJS:
   require('dotenv').config()
3. In ES Modules:
   import 'dotenv/config'
4. process.env now contains defined variables.

# Multiline Values

Supported >= v15.0.0:

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"

Or escape newlines:

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"

# Comments

# Lines starting with # are comments
SECRET_KEY=KEY # inline comment
SECRET_HASH="value-with-#-inside"

# Parsing Engine

const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf)   // returns { BASIC: 'basic' }

# Preload via CLI

$ node -r dotenv/config your_script.js
$ node -r dotenv/config your_script.js dotenv_config_path=/custom/.env dotenv_config_debug=true
$ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config index.js

# API Reference

## config(options?)
Signature: config(options?: { path?: string|string[], encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }) => { parsed?: Record<string,string>, error?: Error }

## parse(src, opt?)
Signature: parse(src: string|Buffer, opt?: { debug?: boolean }) => Record<string,string>

## populate(target, source, opt?)
Signature: populate(target: object, source: Record<string,string>, opt?: { override?: boolean, debug?: boolean }) => void

# Options Defaults

path: path.resolve(process.cwd(), '.env')
encoding: 'utf8'
debug: false
override: false
processEnv: process.env

# Troubleshooting

.env not loading: require('dotenv').config({ debug: true })
Webpack front-end missing polyfills: npm install node-polyfill-webpack-plugin
Add in webpack.config.js:
  new NodePolyfillPlugin(),

# Best Practices

• Load dotenv as early as possible.
• Do not commit .env to version control.
• Use one .env per environment.


## Attribution
- Source: dotenv
- URL: https://github.com/motdotla/dotenv#readme
- License: BSD-2-Clause
- Crawl Date: 2025-05-03T12:58:46.894Z
- Data Size: 643985 bytes
- Links Found: 4989

## Retrieved
2025-05-03
library/OCLIF_INTRO.md
# library/OCLIF_INTRO.md
# OCLIF_INTRO

## Crawl Summary
Install oclif CLI globally via npm. Generate a new project with "oclif generate <name>", answering prompts for module-type (ESM|CommonJS), npm package name, and binary name. Development mode uses bin/dev.js, production mode uses bin/run.js. Initialize an existing project with "oclif init", supplying flags --bin, --module-type, --package-manager, --topic-separator, --output-dir, --yes. init adds bin scripts, oclif section to package.json (fields bin, dirname, commands, topicSeparator), dependencies @oclif/core and ts-node. Create commands via "oclif generate command <topic:command>", defining class extending Command with static description, flags, args, and async run returning Promise<void>. Create hooks via "oclif generate hook <name> --event <lifecycle>". package.json oclif section supports bin, dirname, commands, topicSeparator. Flag definitions use Flags.boolean, Flags.string, Flags.integer with char, description, default, required. Args defined as array of {name, description, required}.

## Normalised Extract
Table of Contents

1 Installation
2 Project Generation
3 Development & Production Execution
4 Initialization in Existing Project
5 Command Creation
6 Hook Creation
7 Configuration Options
8 Flags Definition
9 Arguments Definition

1 Installation

Install oclif CLI globally

$ npm install --global oclif

2 Project Generation

$ oclif generate mynewcli
Prompts:
  module type  ESM or CommonJS
  npm package name  mynewcli
  command bin name  mynewcli

3 Development & Production Execution

Development mode:
$ ./bin/dev.js hello world
Production mode:
$ ./bin/run.js hello world

4 Initialization in Existing Project

$ oclif init --output-dir=/path/to/project --bin=my-pkg --module-type=CommonJS --package-manager=npm --topic-separator=spaces --yes
Creates:
  bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
  package.json oclif section with fields:
    bin: my-pkg
    dirname: ./src/commands
    commands: ./src/commands
    topicSeparator: " "
  dependencies: @oclif/core
  devDependencies: ts-node

5 Command Creation

$ oclif generate command foo:bar
Creates src/commands/foo/bar.ts
Class skeleton:
import {Command, Flags} from '@oclif/core'
export default class FooBar extends Command {
  static description = '...'
  static flags = { force: Flags.boolean({char: 'f', description: '...', default: false}) }
  static args = [{name: 'input', required: true, description: '...'}]
  async run(): Promise<void> { const {args, flags} = await this.parse(FooBar) }
}

6 Hook Creation

$ oclif generate hook my-hook --event init
Creates src/hooks/my-hook.ts

7 Configuration Options

package.json oclif section:
  bin          string   CLI executable name
  dirname      string   path to commands folder
  commands     string   path or glob for commands
  topicSeparator string ":" or " "

8 Flags Definition

static flags = {
  count: Flags.integer({char: 'c', description: '...', default: 1, required: true}),
  name: Flags.string({char: 'n', description: '...', required: false}),
}

9 Arguments Definition

static args = [ { name: 'file', description: '...', required: true } ]

## Supplementary Details
Exact package.json changes when running init:

Add under dependencies:
  "@oclif/core": "^<version>"
Add under devDependencies:
  "ts-node": "^<version>"

After init, package.json entry:
"oclif": {
  "bin": "my-pkg",
  "dirname": "./src/commands",
  "commands": "./src/commands",
  "topicSeparator": " "
}

Generated bin scripts content:

bin/run.js:
#!/usr/bin/env node
require('@oclif/command').run()

bin/dev.js:
#!/usr/bin/env node
process.env.NODE_ENV='development'
require('@oclif/command').run()

Configuration step-by-step:
1 install oclif CLI
2 run oclif init in existing project directory
3 verify package.json oclif section
4 add commands or hooks via generate
5 run dev and run scripts

Flag options for init command:
--output-dir <value>  default: cwd
--bin <value>         default: package.json "name"
--module-type <ESM|CommonJS> default: ESM
--package-manager <npm|yarn|pnpm> default: npm
--topic-separator <colons|spaces> default: colons
-y, --yes             use defaults for all prompts



## Reference Details
CLI Commands

1 npm install --global oclif
2 oclif generate <name>
   Options:
     --language <TypeScript|JavaScript>   default: TypeScript
     --module-type <ESM|CommonJS>         default: ESM
     --package-manager <npm|yarn|pnpm>    default: npm
     --bin <value>                        command binary name
3 oclif init [--output-dir <value>] [--bin <value>] [--module-type <ESM|CommonJS>] [--package-manager <npm|yarn|pnpm>] [--topic-separator <colons|spaces>] [-y]
   Creates bin scripts and updates package.json
4 oclif generate command <topic:command>
   Creates src/commands/<topic>/<command>.ts with skeleton:
     import {Command, Flags} from '@oclif/core'
     export default class Name extends Command {
       static description = '...'
       static flags = {...}
       static args = [{name, description, required}]
       async run(): Promise<void> { ... }
     }
5 oclif generate hook <name> --event <lifecycle>
   Lifecycle events: init, prerun, postrun, command_not_found, update

SDK Method Signatures

declare module '@oclif/core' {
  export abstract class Command {
    static description?: string
    static flags?: Record<string, import('@oclif/core').Flag>
    static args?: Array<{name: string; description?: string; required?: boolean}>
    parse<T extends Command>(this: new () => T): Promise<{args: any; flags: any}>
    log(message: string): void
    error(message: string, options?: {code?: string; exit?: number; ref?: string; suggestions?: string[]}): void
  }
  export namespace Flags {
    function boolean(opts: {char?: string; description: string; default?: boolean; required?: boolean}): import('@oclif/core').Flag<boolean>
    function string(opts: {char?: string; description: string; required?: boolean; multiple?: boolean; default?: string}): import('@oclif/core').Flag<string>
    function integer(opts: {char?: string; description: string; default?: number; required?: boolean}): import('@oclif/core').Flag<number>
  }
}

Configuration Variables

In package.json:
"oclif": {
  "bin": "mycli",
  "dirname": "./src/commands",
  "commands": "./src/commands",
  "topicSeparator": ":"  or  " "
}

Best Practices

Use src/commands subdirectories to group topics. Topic separator default is colon but can switch to spaces. Hide deprecated commands via hiddenAliases array on Command class. Preparse hook example:

export async function preparse(input: string[]): Promise<string[]> {
  if (input[0]==='--flags-dir') {
    const fileFlags = require(input[1])
    return [...fileFlags, ...input.slice(2)]
  }
  return input
}

Troubleshooting

If commands not found, verify package.json oclif.commands path points to correct directory. Example:
  "commands": "./build/commands"

Enable debug output:

$ export OCLIF_DEBUG=1
$ ./bin/run.js hello

Check generated bin scripts have shebang '#!/usr/bin/env node' and correct require('@oclif/core').run() calls.

## Information Dense Extract
npm install -g oclif | oclif generate <name> --language TypeScript --module-type ESM --package-manager npm --bin <name> | cd <name> | ./bin/dev.js <cmd> for dev, ./bin/run.js <cmd> for prod | oclif init [--output-dir=<dir>] [--bin=<name>] [--module-type=ESM|CommonJS] [--package-manager=npm|yarn|pnpm] [--topic-separator=colons|spaces] [-y] adds bin scripts, package.json oclif:{bin,dirname,commands,topicSeparator}, deps:@oclif/core,devDeps:ts-node | oclif generate command <topic:cmd> creates src/commands/<topic>/<cmd>.ts with class extends Command, static description, flags via Flags.boolean/string/integer, args array, async run():Promise<void> parse via this.parse() | oclif generate hook <name> --event <init|prerun|postrun|command_not_found|update> | package.json oclif:{bin:string,dirname:string,commands:string,topicSeparator:':'} | Flags.boolean({char?,description,default?,required?}), Flags.string({char?,description,required?,multiple?,default?}), Flags.integer({char?,description,default?,required?}) | Command.parse<T>():Promise<{args,flags}>, Command.log(msg), Command.error(msg,{code,exit,ref,suggestions}) | Troubleshoot via OCLIF_DEBUG=1, verify oclif.commands path

## Sanitised Extract
Table of Contents

1 Installation
2 Project Generation
3 Development & Production Execution
4 Initialization in Existing Project
5 Command Creation
6 Hook Creation
7 Configuration Options
8 Flags Definition
9 Arguments Definition

1 Installation

Install oclif CLI globally

$ npm install --global oclif

2 Project Generation

$ oclif generate mynewcli
Prompts:
  module type  ESM or CommonJS
  npm package name  mynewcli
  command bin name  mynewcli

3 Development & Production Execution

Development mode:
$ ./bin/dev.js hello world
Production mode:
$ ./bin/run.js hello world

4 Initialization in Existing Project

$ oclif init --output-dir=/path/to/project --bin=my-pkg --module-type=CommonJS --package-manager=npm --topic-separator=spaces --yes
Creates:
  bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
  package.json oclif section with fields:
    bin: my-pkg
    dirname: ./src/commands
    commands: ./src/commands
    topicSeparator: ' '
  dependencies: @oclif/core
  devDependencies: ts-node

5 Command Creation

$ oclif generate command foo:bar
Creates src/commands/foo/bar.ts
Class skeleton:
import {Command, Flags} from '@oclif/core'
export default class FooBar extends Command {
  static description = '...'
  static flags = { force: Flags.boolean({char: 'f', description: '...', default: false}) }
  static args = [{name: 'input', required: true, description: '...'}]
  async run(): Promise<void> { const {args, flags} = await this.parse(FooBar) }
}

6 Hook Creation

$ oclif generate hook my-hook --event init
Creates src/hooks/my-hook.ts

7 Configuration Options

package.json oclif section:
  bin          string   CLI executable name
  dirname      string   path to commands folder
  commands     string   path or glob for commands
  topicSeparator string ':' or ' '

8 Flags Definition

static flags = {
  count: Flags.integer({char: 'c', description: '...', default: 1, required: true}),
  name: Flags.string({char: 'n', description: '...', required: false}),
}

9 Arguments Definition

static args = [ { name: 'file', description: '...', required: true } ]

## Original Source
CLI Frameworks
https://oclif.io/docs/introduction

## Digest of OCLIF_INTRO

# Installation

Install the oclif CLI globally:

    $ npm install --global oclif

# Create an oclif Project from Scratch

Run the generator:

    $ oclif generate mynewcli

Prompts:
  • Select module type           ESM or CommonJS
  • npm package name             mynewcli
  • Command bin name the CLI will export  mynewcli

After generation:

    $ cd mynewcli

# Development and Production Scripts

Use development script (with automatic reload):

    $ ./bin/dev.js hello world
    hello world!  (./src/commands/hello/world.ts)

Use production script:

    $ ./bin/run.js hello world
    hello world!  (./src/commands/hello/world.ts)

# Initialize oclif in an Existing Project

Run init with optional flags:

    $ oclif init --output-dir=/path/to/project \
      --bin=my-pkg \
      --module-type=CommonJS \
      --package-manager=npm \
      --topic-separator=spaces \
      --yes

Files and changes added:
  • bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
  • package.json oclif section:
      {
        "bin": "my-pkg",
        "dirname": "./src/commands",
        "commands": "./src/commands",
        "topicSeparator": " "
      }
  • @oclif/core added to dependencies
  • ts-node added to devDependencies

# Add Commands

Generate a new command:

    $ oclif generate command foo:bar

Creates file:

    src/commands/foo/bar.ts

Skeleton:

    import {Command, Flags} from '@oclif/core'

    export default class FooBar extends Command {
      static description = 'describe the command'

      static flags = {
        force: Flags.boolean({char: 'f', description: 'force operation', default: false}),
      }

      static args = [
        {name: 'input', required: true, description: 'input file'}
      ]

      async run(): Promise<void> {
        const {args, flags} = await this.parse(FooBar)
        // implementation
      }
    }

# Add Hooks

Generate a new hook:

    $ oclif generate hook my-hook --event init

Creates file:

    src/hooks/my-hook.ts

# Configuration Options

In package.json under "oclif":
  • bin: string            Command binary name
  • dirname: string        Path to commands directory
  • commands: string       Glob or directory for command files
  • topicSeparator: string ":" or " "

# Flags and Arguments

Flag definition:

    static flags = {
      count: Flags.integer({char: 'c', description: 'number of items', default: 1, required: true}),
      name: Flags.string({char: 'n', description: 'user name', required: false}),
    }

Argument definition:

    static args = [
      {name: 'file', description: 'file to process', required: true}
    ]


## Attribution
- Source: CLI Frameworks
- URL: https://oclif.io/docs/introduction
- License: MIT License
- Crawl Date: 2025-05-03T04:50:47.140Z
- Data Size: 5079924 bytes
- Links Found: 4226

## Retrieved
2025-05-03
library/GRAPHQLJS.md
# library/GRAPHQLJS.md
# GRAPHQLJS

## Crawl Summary
Installation via npm or yarn; import core types and functions from 'graphql'; GraphQLSchema requires a config object with query, mutation, subscription fields; GraphQLObjectType needs name and fields definitions with type and resolve functions; graphql() accepts an args object {schema, source, rootValue?, contextValue?, variableValues?, operationName?, fieldResolver?, typeResolver?} and returns Promise<ExecutionResult>; set NODE_ENV=production for performance; install bleeding-edge via git URL; enable experimental @defer and @stream via package.json; use .mjs builds for browser bundling.

## Normalised Extract
Table of Contents:
1. Installation
2. Schema Construction
3. Query Execution
4. Environment Configuration
5. Bleeding Edge Usage
6. Enabling Experimental Features
7. Browser Bundling

Installation
 npm install --save graphql
 yarn add graphql

Schema Construction
 import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
 new GraphQLSchema({
   query: new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
       hello: { type: GraphQLString, resolve: () => 'world' }
     }
   })
 })

Query Execution
 graphql({
   schema: GraphQLSchema,
   source: string_QUERY,
   rootValue?: any,
   contextValue?: any,
   variableValues?: { [key: string]: any },
   operationName?: string,
   fieldResolver?: Function,
   typeResolver?: Function
 }).then((result) => console.log(result))

Environment Configuration
 export NODE_ENV=production    # disables type assertion and deprecation warnings

Bleeding Edge Usage
 npm install graphql@git://github.com/graphql/graphql-js.git#npm

Enabling Experimental Features
 In package.json:
 "dependencies": { "graphql": "experimental-stream-defer" }

Browser Bundling
 Ensure webpack/rollup resolves .mjs extensions; import { graphql } from 'graphql'; only modules used are included

## Supplementary Details
Supported Node.js versions: >=10.13.0. GraphQL.js build outputs: dist/index.js (CommonJS), dist/index.mjs (ESModule). GraphQLSchemaConfig: { query?: GraphQLObjectType, mutation?: GraphQLObjectType, subscription?: GraphQLObjectType, types?: GraphQLType[] }. FieldMapDefinition: key: GraphQLFieldConfig with properties: type: GraphQLOutputType, args?: GraphQLFieldConfigArgumentMap, resolve?: GraphQLFieldResolver, subscribe?: GraphQLFieldResolver, description?: string, deprecationReason?: string. graphql function full signature: graphql(args: ExecutionArgs): Promise<ExecutionResult>. Default fieldResolver uses property access. To override, pass fieldResolver. To enable @defer/@stream directives, install experimental-stream-defer. Bundler configs: webpack 5 resolve.extensions: ['.mjs','.js','.json']

## Reference Details
API Specifications:

`graphql(args: { schema: GraphQLSchema; source: string; rootValue?: any; contextValue?: any; variableValues?: { [key: string]: any }; operationName?: string; fieldResolver?: Function; typeResolver?: Function }): Promise<ExecutionResult>`
ExecutionResult: { data?: any; errors?: GraphQLError[] }

`new GraphQLSchema(config: { query?: GraphQLObjectType; mutation?: GraphQLObjectType; subscription?: GraphQLObjectType; types?: GraphQLType[] })`

`new GraphQLObjectType(config: { name: string; description?: string; fields: () => GraphQLFieldConfigMap<any,any>; interfaces?: () => GraphQLInterfaceType[] })`

Configuration Options:
 NODE_ENV: 'development' (default), 'production' (disable type checks, improve perf)
 Dependencies entry for experimental features: "graphql": "experimental-stream-defer"

Best Practices:
 set NODE_ENV=production in production
 separate schema definitions and resolver implementations
 use fieldResolver override for custom resolution logic
 remove unused parts via ESModule builds

Implementation Patterns:
1. Define types and fields in GraphQLObjectType
2. Compose schema via GraphQLSchema
3. Call graphql() with full ExecutionArgs
4. Handle result.data and result.errors

Troubleshooting:
Error: Cannot query field X on Y
 Command:
 var source = '{ X }';
 graphql({ schema, source }).then(result => console.log(result.errors));
 Expected error entry: { message: 'Cannot query field X on Y', locations: [{ line:1,column:3 }] }
 Fix: add field X to Y's fields map

 bundler missing .mjs resolution:
 Error: Module not found: Error: Can't resolve 'graphql'
 Fix: configure resolve.extensions to include '.mjs'


## Information Dense Extract
npm install graphql   import { graphql,GraphQLSchema,GraphQLObjectType,GraphQLString } from 'graphql'   schema= new GraphQLSchema({query:new GraphQLObjectType({name:'RootQueryType',fields:{hello:{type:GraphQLString,resolve:()=> 'world'}}})})   graphql({schema,source:'{hello}'}).then(res=>res.data)   graphql(args:ExecutionArgs):Promise<ExecutionResult>   set NODE_ENV=production   enable @defer/@stream via "experimental-stream-defer"   bundle .mjs for tree-shaking

## Sanitised Extract
Table of Contents:
1. Installation
2. Schema Construction
3. Query Execution
4. Environment Configuration
5. Bleeding Edge Usage
6. Enabling Experimental Features
7. Browser Bundling

Installation
 npm install --save graphql
 yarn add graphql

Schema Construction
 import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
 new GraphQLSchema({
   query: new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
       hello: { type: GraphQLString, resolve: () => 'world' }
     }
   })
 })

Query Execution
 graphql({
   schema: GraphQLSchema,
   source: string_QUERY,
   rootValue?: any,
   contextValue?: any,
   variableValues?: { [key: string]: any },
   operationName?: string,
   fieldResolver?: Function,
   typeResolver?: Function
 }).then((result) => console.log(result))

Environment Configuration
 export NODE_ENV=production    # disables type assertion and deprecation warnings

Bleeding Edge Usage
 npm install graphql@git://github.com/graphql/graphql-js.git#npm

Enabling Experimental Features
 In package.json:
 'dependencies': { 'graphql': 'experimental-stream-defer' }

Browser Bundling
 Ensure webpack/rollup resolves .mjs extensions; import { graphql } from 'graphql'; only modules used are included

## Original Source
GraphQL.js Reference Implementation
https://github.com/graphql/graphql-js#readme

## Digest of GRAPHQLJS

# GraphQL.js Reference Implementation

# Installation

npm install --save graphql

yarn add graphql

# Schema Construction

import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

# Query Execution

var source = '{ hello }';

graphql({ schema, source }).then((result) => {
  console.log(result);
});

# Environment Configuration

Set NODE_ENV=production to disable development-only checks and improve execution performance.

# Bleeding Edge

npm install graphql@git://github.com/graphql/graphql-js.git#npm

# Experimental Features

In your package.json dependencies section:

"graphql": "experimental-stream-defer"

# Browser Usage

GraphQL.js is distributed with both CommonJS and ESModule (.mjs) builds. Configure webpack or rollup to resolve .mjs files to include only used modules.

## Attribution
- Source: GraphQL.js Reference Implementation
- URL: https://github.com/graphql/graphql-js#readme
- License: MIT License
- Crawl Date: 2025-05-03T16:50:28.915Z
- Data Size: 654601 bytes
- Links Found: 5605

## Retrieved
2025-05-03
library/COMMITIZEN.md
# library/COMMITIZEN.md
# COMMITIZEN

## Crawl Summary
Install commitizen globally or locally, init adapters via npx commitizen init <adapter> --save-dev --save-exact. Configure adapter path in package.json config.commitizen.path or .czrc/.czrc.js. Use git cz or npm run commit. Customize adapters (e.g., cz-customizable) via cz.config.js defining types, scopes, limits. Programmatic API exposed as run(args[], {cwd, config}). Troubleshoot PATH, config syntax, adapter resolution errors.

## Normalised Extract
Table of Contents:
1 Installation
2 Initialization
3 Configuration
4 Adapter Customization
5 CLI Usage
6 Programmatic API
7 Troubleshooting

1 Installation
 Global: npm install -g commitizen@4.4.4
 Local: npm install --save-dev commitizen@4.4.4

2 Initialization
 Command: npx commitizen init <adapter> --save-dev --save-exact
 Effects:
  add devDependency <adapter>@latest
  package.json: config.commitizen.path = "./node_modules/<adapter>"

3 Configuration
 package.json:
  "config": { "commitizen": { "path": "./node_modules/<adapter>" } }
 .czrc (JSON): { "path": "node_modules/<adapter>" }
 .czrc.js (Module.exports) supports additional fields maxHeaderWidth, maxLineWidth
 Priority: project .czrc > package.json > user .czrc

4 Adapter Customization (cz-customizable)
 File: cz.config.js
  fields:
    types: array of {value:string, name:string}
    scopes: string[]
    allowCustomScopes: boolean
    allowBreakingChanges: string[]
    subjectLimit: number
    skipQuestions: string[]

5 CLI Usage
 Commands:
  git cz
  npx git-cz
  npm run commit (requires script "commit": "git-cz")
 Flags:
  --verbose : debug output
  --config <path> : override adapter path or config file

6 Programmatic API
 Signature:
  run(args: string[], options?: { cwd?: string; config?: string|object; }): Promise<void>
 Example:
  const { run } = require('commitizen');
  run(['--config', './cz.config.js'], { cwd: process.cwd() });

7 Troubleshooting
  Ensure node_modules/.bin in PATH or global install
  Validate JSON/JS syntax in config files
  Verify adapter installation and correct path in config

## Supplementary Details
Installation versions: commitizen@4.4.4, cz-conventional-changelog@4.3.0, cz-customizable@6.3.0. Adapter init flags: --save-dev adds to devDependencies, --save-exact pins exact version. Config file resolution order: project .czrc -> package.json config.commitizen.path -> user ~/.czrc. Default CLI exit codes: 0 success, 1 invalid config, 2 adapter load error. Adapter config defaults: maxHeaderWidth=100, maxLineWidth=100, allowCustomScopes=false, allowBreakingChanges=[]. Config file names supported: .czrc, .czrc.js, cz.config.js. Package.json key: config.commitizen.path. git-cz shim name resolution: lookup package.json script "commit" alias.

## Reference Details
API: run(args: string[], options?: { cwd?: string; config?: string|object; }): Promise<void>
Parameters:
 args: array of CLI arguments: --config, --verbose, adapter-specific flags
 options.cwd: working directory path string
 options.config: path to adapter config file or object with adapter settings
Return: Promise resolves on successful commit, rejects with Error containing code, message, stack

CLI:
 Global: commitizen
 Local: npx commitizen
 Alias: git-cz
 Commands:
  init <adapter> [--save-dev] [--save-exact]
    adapter: name or module path
  run [--config <path>] [--verbose]

package.json config:
  "config": { "commitizen": { "path": string } }

Adapter config (cz-config.js): module.exports = { types: {value:string,name:string}[], scopes:string[], allowCustomScopes:boolean, allowBreakingChanges:string[], subjectLimit:number, skipQuestions:string[], breaklineChar:string }

Example .czrc.js:
module.exports = {
  path: "node_modules/cz-customizable",
  maxHeaderWidth: 72,
  maxLineWidth: 100
};

Best Practices:
• Lock adapter versions with --save-exact
• Define subjectLimit<=50
• Allow breaking changes only for feat and fix
• Skip body/footer prompts if not needed

Troubleshooting Commands:
$ git cz --verbose
Expected: prompts appear, commit message printed to stdout

$ npx commitizen init nonexistent-adapter
Expected: Error: Adapter "nonexistent-adapter" not found

Check:
$ node -e "console.log(require('commitizen/package.json').version)"
Expected: 4.4.4

## Information Dense Extract
commitizen@4.4.4 install via npm global/local; init adapters: npx commitizen init <adapter> --save-dev --save-exact => config.commitizen.path=./node_modules/<adapter>; config resolution: project .czrc > package.json> user .czrc; .czrc.js supports path, maxHeaderWidth=100, maxLineWidth=100; cz-customizable cz.config.js fields types[{value,name}],scopes[],allowCustomScopes=false,allowBreakingChanges[],subjectLimit=50,skipQuestions[]; CLI: git cz|npx git-cz (script "commit":"git-cz"); flags: --config<path>,--verbose; API: run(args:string[],options?{cwd?:string,config?:string|object}):Promise<void>; exit codes:0 success,1 invalid config,2 load error; key config.commitizen.path; troubleshooting: ensure node_modules/.bin in PATH, valid JSON/JS, adapter installed.

## Sanitised Extract
Table of Contents:
1 Installation
2 Initialization
3 Configuration
4 Adapter Customization
5 CLI Usage
6 Programmatic API
7 Troubleshooting

1 Installation
 Global: npm install -g commitizen@4.4.4
 Local: npm install --save-dev commitizen@4.4.4

2 Initialization
 Command: npx commitizen init <adapter> --save-dev --save-exact
 Effects:
  add devDependency <adapter>@latest
  package.json: config.commitizen.path = './node_modules/<adapter>'

3 Configuration
 package.json:
  'config': { 'commitizen': { 'path': './node_modules/<adapter>' } }
 .czrc (JSON): { 'path': 'node_modules/<adapter>' }
 .czrc.js (Module.exports) supports additional fields maxHeaderWidth, maxLineWidth
 Priority: project .czrc > package.json > user .czrc

4 Adapter Customization (cz-customizable)
 File: cz.config.js
  fields:
    types: array of {value:string, name:string}
    scopes: string[]
    allowCustomScopes: boolean
    allowBreakingChanges: string[]
    subjectLimit: number
    skipQuestions: string[]

5 CLI Usage
 Commands:
  git cz
  npx git-cz
  npm run commit (requires script 'commit': 'git-cz')
 Flags:
  --verbose : debug output
  --config <path> : override adapter path or config file

6 Programmatic API
 Signature:
  run(args: string[], options?: { cwd?: string; config?: string|object; }): Promise<void>
 Example:
  const { run } = require('commitizen');
  run(['--config', './cz.config.js'], { cwd: process.cwd() });

7 Troubleshooting
  Ensure node_modules/.bin in PATH or global install
  Validate JSON/JS syntax in config files
  Verify adapter installation and correct path in config

## Original Source
Commitizen & Conventional Commits
https://github.com/conventional-changelog/commitizen#readme

## Digest of COMMITIZEN

# COMMITIZEN

Content retrieved on 2024-06-04 from https://github.com/conventional-changelog/commitizen#readme

## 1. Installation

### 1.1 Global
npm install -g commitizen@4.4.4

### 1.2 Local (Project)
npm install --save-dev commitizen@4.4.4

## 2. Initialization

### 2.1 Init with Adapter
npx commitizen init cz-conventional-changelog --save-dev --save-exact

Effects:
  • Adds devDependency cz-conventional-changelog@4.3.0
  • Updates package.json with:
    {
      "config": {
        "commitizen": {
          "path": "./node_modules/cz-conventional-changelog"
        }
      }
    }
  • Installs git-cz CLI shim in node_modules/.bin/git-cz

## 3. Configuration

### 3.1 package.json
In package.json:
  "config": {
    "commitizen": {
      "path": "./node_modules/<adapter>"
    }
  }

### 3.2 .czrc (JSON)
In project root or $HOME/.czrc:
  {
    "path": "node_modules/<adapter>"
  }

### 3.3 .czrc.js (Module)
module.exports = {
  path: "node_modules/<adapter>",
  maxHeaderWidth: 100,
  maxLineWidth: 100
};

Resolution priority: 1) .czrc in project, 2) package.json config.commitizen, 3) $HOME/.czrc

## 4. Adapter Customization (cz-customizable)

File: cz.config.js in project root:

module.exports = {
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix",  name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    { value: "style",name: "style:    Changes that do not affect the meaning of the code" }
  ],
  scopes: ["core", "cli", "api", "infra"],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 50,
  skipQuestions: ["body", "footer"]
};

## 5. Usage

### 5.1 CLI Commands
• git cz  
• npx git-cz  
• npm run commit (script: "commit": "git-cz")

### 5.2 Flags
--verbose       Enable debug logging
--config <path> Override adapter path or config file

## 6. Programmatic API

Import and run within Node.js scripts:

```js
const { run } = require("commitizen");

run(["--config", "./cz.config.js"], { cwd: process.cwd() })
  .then(() => console.log("Commit complete"))
  .catch(err => console.error(err));
```

Signature:
  run(args: string[], options?: {
    cwd?: string;
    config?: string | object;
  }): Promise<void>

## 7. Troubleshooting

### 7.1 Command Not Found
Ensure node_modules/.bin is in PATH or install commitizen globally.

### 7.2 Bad Configuration
Error: Unexpected token in JSON.  
Check .czrc or cz.config.js syntax.

### 7.3 Adapter Load Fail
Error: Cannot find module <adapter>.  
Verify adapter installed and config.path correct.

Attribution: Conventional Changelog Commitizen README
Data Size: 2.5 KB

## Attribution
- Source: Commitizen & Conventional Commits
- URL: https://github.com/conventional-changelog/commitizen#readme
- License: MIT License
- Crawl Date: 2025-05-03T00:30:52.200Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-03

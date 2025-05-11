library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
Installation via npm. Core API: Command class methods option, requiredOption, version, argument, command, addOption, action, parse, parseAsync. Option types: boolean, value, default, negatable, boolean|value, variadic. Advanced Option: use Option class to set default, choices, env, preset, parser, conflicts, implies. Command definitions: inline action handler, standalone executable, nested subcommands. Lifecycle hooks: preAction, postAction. Help and usage configuration: helpOption, helpCommand, addHelpText, showHelpAfterError, showSuggestionAfterError, usage, name, description, summary, help(), outputHelp(), helpInformation. Parsing modes: enablePositionalOptions, passThroughOptions, allowUnknownOption, allowExcessArguments, storeOptionsAsProperties. Output and error handling: exitOverride, error, configureOutput. TypeScript support: extra-typings package. Examples in /examples directory.

## Normalised Extract
Table of Contents
1 Installation
2 Quick Start Example
3 Option Definitions
4 Advanced Options via Option Class
5 Command & Subcommand Configuration
6 Argument Processing
7 Action Handlers
8 Lifecycle Hooks
9 Help & Usage Customization
10 Parsing Configuration
11 Output & Error Handling
12 TypeScript Integration

1 Installation
npm install commander

2 Quick Start Example
File: split.js
define program via require('commander').program
program.option('--first')
       .option('-s, --separator <char>')
       .argument('<string>')
program.parse()
const opts = program.opts()
const result = program.args[0].split(opts.separator, opts.first ? 1 : undefined)
console.log(result)

3 Option Definitions
program.option(flags:string, description:string, defaultValue?:any, parser?:fn)
flags supports short and long form, value placeholders <value>, [optional]
Boolean option: parser omitted, defaultValue omitted
Value option: <placeholder> syntax
Default: supply defaultValue argument
Negatable: prefix long name with no- => sets false or default true
Boolean|Value: use [value]
Variadic: <name...> => array of values
Required: use .requiredOption same flags signature
Access parsed options via program.opts(), program.optsWithGlobals(), program.getOptionValue(flag), program.getOptionValueSource(flag)

4 Advanced Options via Option Class
import { Option } from 'commander'
program.addOption(new Option('-t, --timeout <sec>', 'timeout in seconds').default(60))
program.addOption(new Option('-d, --drink <size>', 'drink size').choices(['small','medium','large']))
program.addOption(new Option('-p, --port <num>', 'port number').env('PORT'))
program.addOption(new Option('--donate [amt]', 'optional donation').preset('20').argParser(parseFloat))
program.addOption(new Option('--disable-server', 'disable server').conflicts('port'))
program.addOption(new Option('--free-drink', 'free drink').implies({ drink: 'small' }))

5 Command & Subcommand Configuration
Inline action:
program.command('clone <src> [dest]')
       .description('clone repo')
       .action((src,dest)=>{ /* implementation */ })
Standalone exec:
program.command('install [pkg]', 'install packages', { executableFile:'myInstallCmd', hidden:false, isDefault:false })
program.executableDir('commands')
Nested:
const build = createCommand('build')
program.addCommand(build)
Copy inherited settings via program.copyInheritedSettings(subCmd)
Alias commands via .alias('c')

6 Argument Processing
program.argument('<user>', 'username')
       .argument('[pass]', 'password', 'defaultPass')
Variadic arg: '<dirs...>' => array of strings
Argument defaults and parser: argument(name, description, parser, default)
Custom argument via new Argument(name, desc).choices([...]).default(value)

7 Action Handlers
.action((...args, options, command)=>{})
this refers to command in function expression
async actions => use program.parseAsync(argv)

8 Lifecycle Hooks
program.hook('preAction', (cmd, subcmd)=>{})
program.hook('postAction', (cmd, subcmd)=>{})
program.hook('preSubcommand', (cmd, subcmdName)=>{})

9 Help & Usage Customization
.helpOption(flags:string, description:string) or false
.helpCommand(name?:string, desc?:string) or true/false
.addHelpText(position:'before'|'after'|'beforeAll'|'afterAll', textOrFn)
.showHelpAfterError(message?:string)
.showSuggestionAfterError(enable:boolean)
.help(): display & exit
.outputHelp(): display only
.helpInformation(): string
.name(string)
.usage(string)
.description(string)
.summary(string)

10 Parsing Configuration
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption()
.allowExcessArguments()
.storeOptionsAsProperties()
.parse(array, { from: 'node'|'user'|'electron' })
.parseAsync(array, options)

11 Output & Error Handling
.exitOverride(handler?: (error: CommanderError)=>never)
.error(message:string, { exitCode?:number, code?:string })
.configureOutput({ writeOut:(str)=>void, writeErr:(str)=>void, outputError:(str, write)=>void })

12 TypeScript Integration
import { Command } from '@commander-js/extra-typings'
const program: Command<Options> = new Command()



## Supplementary Details
Option.valueParser: (value, previous) => newValue  e.g. parseFloat
Option.preset(value:string): sets starting value
Option.env(varName:string): default from process.env[varName]
Option.choices(array): restrict allowed values, throws error if invalid
Option.hideHelp(): exclude from help output
Option.makeOptionMandatory(): alias for .requiredOption

program.opts(): returns { [camelCasedFlag]: value }
program.optsWithGlobals(): merges global and local
program.getOptionValue(flag): returns single value or array
program.getOptionValueSource(flag): returns 'default'|'env'|'cli'

CommanderError: properties exitCode:number, code:string, message:string
error override: handler receives CommanderError, must terminate flow

Standalone subcommand lookup order: <executableDir>/<parent>-<sub>.js|.mjs|.cjs

npm run-script passthrough: use -- before args

Debug child process inspect: port incremented by 1 when using --inspect
VSCode launch.json: "autoAttachChildProcesses": true

Legacy mode .storeOptionsAsProperties(): options assigned to this.optionName

TypeScript extra-typings: infers option keys and types; import from '@commander-js/extra-typings'



## Reference Details
Class: Command
constructor(name?:string)
Properties:
  .name():string  .name(str):Command
  .description():string  .description(str, summary?):Command
  .version():string  .version(ver, flags?, desc?):Command
  .usage():string  .usage(usageStr):Command
  .enablePositionalOptions():Command
  .passThroughOptions():Command
  .allowUnknownOption():Command
  .allowExcessArguments(allow?:boolean):Command
  .storeOptionsAsProperties():Command
  .configureHelp(config: Partial<HelpOptions>):Command
  .createHelp():Help

Method Signatures:
  option(flags: string, description: string, defaultValue?: any, parser?: (val:string, prev:any)=>any): Command
  requiredOption(flags: string, description: string, defaultValue?: any): Command
  addOption(option: Option): Command
  command(nameAndArgs: string, description?: string, config?: CommandConfig): Command|this
  addCommand(cmd: Command, config?: CommandConfig): Command
  alias(alias: string): Command
  argument(name: string, description?: string, parserOrDefault?: any, defaultValue?: any): Command
  addArgument(arg: Argument): Command
  action(fn: (...args:any[])=>void|Promise<void>): Command
  hook(event: 'preAction'|'postAction'|'preSubcommand', listener: Function): Command
  parse(argv?: string[], options?: ParseOptions): Command
  parseAsync(argv?: string[], options?: ParseOptions): Promise<Command>
  help(): never
  outputHelp(): Command
  helpInformation(): string
  helpOption(flags: string|false, description?: string): Command
  helpCommand(name?: string|false, description?: string): Command
  addHelpText(position:'before'|'after'|'beforeAll'|'afterAll', textOrFn:string|Function): Command
  showHelpAfterError(message?: string): Command
  showSuggestionAfterError(enable: boolean): Command
  exitOverride(handler?: (error: CommanderError)=>never): Command
  error(message: string, options?: { exitCode?: number; code?: string }): never
  configureOutput(opts: { writeOut?: (str:string)=>void; writeErr?: (str:string)=>void; outputError?: (str:string, write:(s:string)=>void)=>void }): Command
  getOptionValue(flag:string): any
  setOptionValue(flag:string, value:any): Command
  getOptionValueSource(flag:string): 'cli'|'default'|'env'
  opts(): Record<string, any>
  optsWithGlobals(): Record<string, any>

Class: Option
constructor(flags: string, description: string)
methods:
  default(value: any, description?: string): Option
  choices(values: any[]): Option
  env(variableName: string): Option
  hideHelp(): Option
  preset(value: any): Option
  argParser(fn: (input:string, prev:any)=>any): Option
  conflicts(flag: string|string[]): Option
  implies(map: Record<string, any>): Option
  makeOptionMandatory(): Option

Class: Argument
constructor(name: string, description: string)
.methods:
  default(value: any, description?: string): Argument
  choices(values: any[]): Argument

Type: ParseOptions { from?: 'node'|'user'|'electron' }
Type: CommandConfig { executableFile?: string; hidden?: boolean; isDefault?: boolean }

Examples:
  program.error('msg', { exitCode:2, code:'ERR' })
  program.exitOverride(err=>{ throw err })
  program.parse(['--port','80'], { from:'user' })

Troubleshooting:
  Missing arg: error: required argument '<name>' not specified
  Unknown option: error: unknown option '--bad' (Did you mean '--good'?)
  Invalid choice: error: option '-d, --drink <size>' argument 'x' is invalid. Allowed choices are small, medium, large.
  Conflict: error: option '--disable-server' cannot be used with option '-p, --port <num>'
  To debug subcommands: node --inspect-brk example.js subcmd
  For npm scripts: npm run start -- --port 3000

Best Practices:
  Use .requiredOption for mandatory flags
  Use Option.env for environment defaults
  Validate inputs via custom parser and throw InvalidArgumentError
  Suppress suggestions via showSuggestionAfterError(false) in CI


## Information Dense Extract
commander@latest requires Node>=18. npm install commander. import {Command, Option, Argument} from 'commander'. instantiate: const program=new Command(name). chainable API: .name(), .version(ver,flags,desc), .usage(), .description(desc,summary), .argument(name,desc,parser?,default?), .option(flags,desc,default?,parser?), .requiredOption(...), .addOption(new Option(flags,desc).default().choices().env().preset().argParser().conflicts().implies()), .command(name args,desc,config).alias().addCommand().hook(event,fn), .action(fn), .configureHelp(opts), .helpOption(flags,desc), .helpCommand(name,desc), .addHelpText(pos,txt|fn), .showHelpAfterError(msg), .showSuggestionAfterError(bool), .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments(bool), .storeOptionsAsProperties(), .exitOverride(handler), .configureOutput({writeOut,writeErr,outputError}), .parse(argv?,{from:'node'|'user'|'electron'}), .parseAsync(...). program.opts(),optsWithGlobals(),getOptionValue(flag),getOptionValueSource(flag),setOptionValue(flag,value). error(msg,{exitCode,code}) throws CommanderError(exitCode,code,message). help():never, outputHelp():Command, helpInformation():string. Option API: default(val),choices(vals),env(var),hideHelp(),preset(val),argParser(fn),conflicts(flag),implies(map),makeOptionMandatory(). Argument API: default(val),choices(vals). CLI behaviors: boolean flags, value flags <>, optional flags [], variadic <name...>. subcommands inline and standalone via executableDir. TS support via '@commander-js/extra-typings'. troubleshooting patterns: requiredOption error, unknown option suggestion, invalid choice, conflict error. child process debug port increments by 1. VSCode autoAttachChildProcesses=true. npm run-script use -- to pass args. legacy .storeOptionsAsProperties. Output override via configureOutput.   

## Sanitised Extract
Table of Contents
1 Installation
2 Quick Start Example
3 Option Definitions
4 Advanced Options via Option Class
5 Command & Subcommand Configuration
6 Argument Processing
7 Action Handlers
8 Lifecycle Hooks
9 Help & Usage Customization
10 Parsing Configuration
11 Output & Error Handling
12 TypeScript Integration

1 Installation
npm install commander

2 Quick Start Example
File: split.js
define program via require('commander').program
program.option('--first')
       .option('-s, --separator <char>')
       .argument('<string>')
program.parse()
const opts = program.opts()
const result = program.args[0].split(opts.separator, opts.first ? 1 : undefined)
console.log(result)

3 Option Definitions
program.option(flags:string, description:string, defaultValue?:any, parser?:fn)
flags supports short and long form, value placeholders <value>, [optional]
Boolean option: parser omitted, defaultValue omitted
Value option: <placeholder> syntax
Default: supply defaultValue argument
Negatable: prefix long name with no- => sets false or default true
Boolean|Value: use [value]
Variadic: <name...> => array of values
Required: use .requiredOption same flags signature
Access parsed options via program.opts(), program.optsWithGlobals(), program.getOptionValue(flag), program.getOptionValueSource(flag)

4 Advanced Options via Option Class
import { Option } from 'commander'
program.addOption(new Option('-t, --timeout <sec>', 'timeout in seconds').default(60))
program.addOption(new Option('-d, --drink <size>', 'drink size').choices(['small','medium','large']))
program.addOption(new Option('-p, --port <num>', 'port number').env('PORT'))
program.addOption(new Option('--donate [amt]', 'optional donation').preset('20').argParser(parseFloat))
program.addOption(new Option('--disable-server', 'disable server').conflicts('port'))
program.addOption(new Option('--free-drink', 'free drink').implies({ drink: 'small' }))

5 Command & Subcommand Configuration
Inline action:
program.command('clone <src> [dest]')
       .description('clone repo')
       .action((src,dest)=>{ /* implementation */ })
Standalone exec:
program.command('install [pkg]', 'install packages', { executableFile:'myInstallCmd', hidden:false, isDefault:false })
program.executableDir('commands')
Nested:
const build = createCommand('build')
program.addCommand(build)
Copy inherited settings via program.copyInheritedSettings(subCmd)
Alias commands via .alias('c')

6 Argument Processing
program.argument('<user>', 'username')
       .argument('[pass]', 'password', 'defaultPass')
Variadic arg: '<dirs...>' => array of strings
Argument defaults and parser: argument(name, description, parser, default)
Custom argument via new Argument(name, desc).choices([...]).default(value)

7 Action Handlers
.action((...args, options, command)=>{})
this refers to command in function expression
async actions => use program.parseAsync(argv)

8 Lifecycle Hooks
program.hook('preAction', (cmd, subcmd)=>{})
program.hook('postAction', (cmd, subcmd)=>{})
program.hook('preSubcommand', (cmd, subcmdName)=>{})

9 Help & Usage Customization
.helpOption(flags:string, description:string) or false
.helpCommand(name?:string, desc?:string) or true/false
.addHelpText(position:'before'|'after'|'beforeAll'|'afterAll', textOrFn)
.showHelpAfterError(message?:string)
.showSuggestionAfterError(enable:boolean)
.help(): display & exit
.outputHelp(): display only
.helpInformation(): string
.name(string)
.usage(string)
.description(string)
.summary(string)

10 Parsing Configuration
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption()
.allowExcessArguments()
.storeOptionsAsProperties()
.parse(array, { from: 'node'|'user'|'electron' })
.parseAsync(array, options)

11 Output & Error Handling
.exitOverride(handler?: (error: CommanderError)=>never)
.error(message:string, { exitCode?:number, code?:string })
.configureOutput({ writeOut:(str)=>void, writeErr:(str)=>void, outputError:(str, write)=>void })

12 TypeScript Integration
import { Command } from '@commander-js/extra-typings'
const program: Command<Options> = new Command()

## Original Source
Commander.js
https://github.com/tj/commander.js

## Digest of COMMANDER_JS

# Commander.js Technical Digest

Date Retrieved: 2024-06-18
Source: https://github.com/tj/commander.js

# Installation

  npm install commander

# Quick Start Example

  // split.js
  const { program } = require('commander');
  program
    .option('--first')
    .option('-s, --separator <char>')
    .argument('<string>');
  program.parse();
  const options = program.opts();
  const limit = options.first ? 1 : undefined;
  console.log(program.args[0].split(options.separator, limit));

# Core API Specifications

## Command Class Methods

### program.option(flags: string, description: string, defaultValue?: any, parser?: (val: string, prev: any) => any): Command
- flags: short and long form, e.g. "-p, --port <number>"
- description: text
- defaultValue: default if not provided
- parser: function to coerce or accumulate
- returns: the Command instance

### program.requiredOption(flags: string, description: string, defaultValue?: any): Command
Throws error if option missing after parse

### program.version(version: string, flags?: string, description?: string): Command
- default flags: "-V, --version"

### program.argument(name: string, description?: string, defaultValueOrParser?: any, defaultValue?: any): Command
- name: "<required>" or "[optional]" or "<name...>"

### program.command(nameAndArgs: string, description?: string, config?: { executableFile?: string, hidden?: boolean, isDefault?: boolean }): Command|this
- when description passed: returns this; triggers standalone executable lookup
- when not: returns new Command

### program.addOption(option: Option): Command

### program.action(fn: (...args: any[]) => void|Promise<void>): Command
- sync or async handler; if async use program.parseAsync

### program.parse(argv?: string[], parseOptions?: { from: 'node'|'user'|'electron' }): Command
### program.parseAsync(argv?: string[], parseOptions?: object): Promise<Command>

# Option Types and Defaults

- Boolean: .option('-d, --debug', 'desc') => opts().debug === true|undefined
- Value: .option('-p, --pizza-type <type>', 'desc') => opts().pizzaType: string
- Default value: .option('-c, --cheese <type>', 'desc', 'blue')
- Negatable boolean: .option('--no-sauce', 'desc') => opts().sauce === false
- Boolean or value: .option('-c, --cheese [type]', 'desc') => undefined|true|string
- Variadic: .option('-n, --number <n...>', 'desc') => number: string[]

# Advanced Option Configuration

  const { Option } = require('commander');
  program
    .addOption(new Option('-t, --timeout <sec>', 'timeout in seconds').default(60))
    .addOption(new Option('-d, --drink <size>', 'cup size').choices(['small','medium','large']))
    .addOption(new Option('-p, --port <num>', 'port').env('PORT'))
    .addOption(new Option('--donate [amt]', 'donation').preset('20').argParser(parseFloat))
    .addOption(new Option('--disable-server', 'disable server').conflicts('port'))
    .addOption(new Option('--free-drink', 'free drink').implies({ drink: 'small' }));

# Commands and Subcommands

  // action handler style
  program
    .command('clone <src> [dest]')
    .description('clone repo')
    .action((src, dest) => { /* ... */ });

  // standalone executables
  program
    .command('install [pkg]', 'install packages')
    .executableDir('commands');

  // nested commands
  const build = createCommand('build');
  program.addCommand(build);

# Lifecycle Hooks

  program.hook('preAction', (thisCmd, subCmd) => { /* ... */ });
  program.hook('postAction', async (cmd, action) => { /* ... */ });

# Help and Usage

- Automatic help: -h, --help
- Change flags: .helpOption('-e, --HELP', 'desc')
- Disable: .helpOption(false)
- Custom text: program.addHelpText('after', 'Example: ...')
- showHelpAfterError(msg?: string)
- showSuggestionAfterError(false)
- .help(): display and exit
- .outputHelp(): display without exit
- .helpInformation(): return string
- .usage(str): override usage line
- .name(str): set program name
- .description(str): set long description
- .summary(str): set short description for subcommand list

# Parsing Configuration

- .enablePositionalOptions(): only parse options before commands
- .passThroughOptions(): stop option parsing after args
- .allowUnknownOption(): treat unknown as arg
- .allowExcessArguments(): error on extra args
- .storeOptionsAsProperties(): legacy behavior

# Output and Error Handling

- .exitOverride(): throw CommanderError instead of process.exit
- .error(message: string, options?: { exitCode?: number, code?: string })
- .configureOutput({ writeOut, writeErr, outputError })

# TypeScript

import { Command } from '@commander-js/extra-typings';
const program = new Command();

type Options = { debug?: boolean; repeat?: number; } // inferred

# Examples Directory

See /examples for complete sample files.

# Data Size and Links

Data Size: 651084 bytes
Links Found: 4719
Error: None


## Attribution
- Source: Commander.js
- URL: https://github.com/tj/commander.js
- License: MIT License
- Crawl Date: 2025-05-11T04:02:54.393Z
- Data Size: 651084 bytes
- Links Found: 4719

## Retrieved
2025-05-11
library/COMMANDER.md
# library/COMMANDER.md
# COMMANDER

## Crawl Summary
Installation: npm install commander. Import via require or ES import createCommand or new Command. Option API: .option(flags:string,description:string,default?:any),.requiredOption(),.addOption(Option). Option types: boolean, value, optional, negatable, variadic, custom Option(flags,desc). Option retrieval: .opts(), .optsWithGlobals(), .getOptionValue(), .getOptionValueSource(). Command API: .command(name,desc?,opts?), .addCommand(cmd), .argument(name,desc,default?), .alias(), .description(), .version(), .name(), .usage(). Action handler signature: (...args, options, command). Parsing: .parse(), .parseAsync(). Help customization: .helpOption(), .addHelpText(), .showHelpAfterError(), .showSuggestionAfterError(). Hooks: .hook(event, cb). Parsing config: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments(). Error handling: .error(), .exitOverride(), .configureOutput(). Utility: .version(), .help(), .outputHelp(), .helpInformation(), createCommand().

## Normalised Extract
Table of Contents:
1 Option Definition
2 Option Retrieval
3 Command & Subcommand Definition
4 Argument Configuration
5 Action Handler Signature
6 Parsing Methods
7 Help Generation & Customization
8 Lifecycle Hooks
9 Error & Exit Handling
10 Output Configuration
11 Utility Methods

1 Option Definition
.option(flags:string,description:string,defaultValue?:any)
.requiredOption(flags:string,description:string,defaultValue?:any)
.addOption(option:Option)
Option types:
  boolean: flags e.g. '-d, --debug'
  value: '<name>' placeholder
  optional: '[name]'
  negatable: '--no-foo'
  variadic: '<items...>'
  custom: new Option(flags,desc).default(val).env('VAR').choices([...]).preset(val).argParser(fn).conflicts(opt).implies({opt:val}).hideHelp().makeOptionMandatory()

2 Option Retrieval
program.opts(): Record<string,any>
program.optsWithGlobals(): merged options
program.getOptionValue(name:string): any
program.getOptionValueSource(name:string): 'cli'|'default'|'env'
program.setOptionValue(name:string,value:any)
program.setOptionValueWithSource(name:string,value:any,source:string)

3 Command & Subcommand Definition
.command(name:string,desc?:string,config?:{executableFile?:string,isDefault?:boolean}) => Command
.addCommand(cmd:Command)
.alias(alias:string)
.name(name:string)
.description(desc:string,summary?:string)
.usage(str:string)
.version(version:string,flags?:string,description?:string)
.executableDir(path:string)

4 Argument Configuration
.argument(name:string,description?:string,defaultValue?:any)
.addArgument(arg:Argument)
new Argument(name,desc).choices([...]).default(val,desc).argParser(fn)

5 Action Handler Signature
.action(handler:Function)
handler parameters: declared arguments, options (Record), command instance
async handlers require parseAsync

6 Parsing Methods
.parse(argv?:string[],options?:{from:'node'|'electron'|'user'})
.parseAsync(...)
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption(allow?:boolean)
.allowExcessArguments(allow?:boolean)
.storeOptionsAsProperties()

7 Help Generation & Customization
.helpOption(flags:string,description:string)
.helpCommand(name?:string,description?:string)
.addHelpText(position:'before'|'after',textOrFn:string|Function)
.showHelpAfterError(msgOrBool?:string|boolean)
.showSuggestionAfterError(show:boolean)
.help(): void
.outputHelp(): void
.helpInformation(): string
.configureHelp({sortSubcommands?:boolean,sortOptions?:boolean,showGlobalOptions?:boolean,styleMethods?:Record<string,Function>})
.createHelp(): Help

8 Lifecycle Hooks
.hook('preAction'|'postAction',callback:(thisCmd,actionCmd)=>void)
.hook('preSubcommand',callback:(thisCmd,subCmd)=>void)

9 Error & Exit Handling
.error(message:string,{exitCode?:number,code?:string}?)
.exitOverride(handler?:(err:CommanderError)=>void)

10 Output Configuration
.configureOutput({writeOut:(str:string)=>void,writeErr:(str:string)=>void,outputError:(str:string,write:Function)=>void})

11 Utility Methods
.createCommand(): Command
.version(version:string,flags?:string,description?:string)
.name(name:string)
.usage(str:string)


## Supplementary Details
Option defaultValue: can be any type. Option.env(varName:string) reads default from process.env[varName]. Option.choices(array) enforces allowed values, error message: "argument '<option>' invalid. Allowed choices are ...". Option.presets sets initial value. Option.argParser(fn) transforms value or throws InvalidArgumentError. Option.conflicts(name) prevents co-usage. Option.implies({opt:val}) sets implied values. hideHelp(): excludes from help. makeOptionMandatory(): identical to requiredOption.

program.version: default flags '-V, --version', description 'output the version'. Custom flags override default. Exits after printing.

Command config: hidden:true omits from help. isDefault:true runs when no subcommand specified.

Argument defaultValue applies only to optional arguments. Variadic only allowed on last argument; collected into array until dash or new option. Default for optional argument is not greedy: stops on dash. argument.argParser(fn) transforms or throws.

Parsing: .parse auto-detects node vs electron. from:user treats all argv as user args. 

Error handling: Unknown option or missing argument: error printed, process.exit(1). showHelpAfterError alters printed message. showSuggestionAfterError can disable suggestion. 

ExitOverride: default override throws CommanderError with exitCode, code, message. error(): use same display formatting as built-in errors.


## Reference Details
// Full SDK Method Signatures and Types

Type CommanderError = { exitCode: number, code: string, message: string }
interface ParseOptions { from: 'node'|'electron'|'user' }

class Command {
  constructor(name?: string)
  name(name: string): this
  usage(str: string): this
  description(str: string, summary?: string): this
  version(version: string, flags?: string, description?: string): this
  helpOption(flags: string, description: string): this
  helpCommand(name?: string, description?: string): this
  addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|(() => string)): this
  configureHelp(config: { sortCommands?: boolean, sortOptions?: boolean, showGlobalOptions?: boolean, optionTerm?: Function, subcommandTerm?: Function }): this
  createHelp(): Help
  exitOverride(handler?: (err: CommanderError) => any): this
  showHelpAfterError(msgOrBool?: string|boolean): this
  showSuggestionAfterError(show?: boolean): this
  allowUnknownOption(allow?: boolean): this
  allowExcessArguments(allow?: boolean): this
  enablePositionalOptions(): this
  passThroughOptions(): this
  parse(argv?: string[], options?: ParseOptions): this
  parseAsync(argv?: string[], options?: ParseOptions): Promise<this>
  error(message: string, opts?: { exitCode?: number, code?: string }): never
  exit(code?: number): never
  outputHelp(opts?: { error?: boolean }): this
  help(opts?: { error?: boolean }): never
  helpInformation(): string
  configureOutput(config: { writeOut?: (str: string) => void, writeErr?: (str: string) => void, outputError?: (str: string, write: (str: string) => void) => void }): this
  addCommand(cmd: Command, opts?: { isDefault?: boolean, hidden?: boolean }): this
  command(nameAndArgs: string, description?: string, opts?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command
  executableDir(path: string): this
  argument(name: string, description?: string, defaultValue?: any): this
  addArgument(arg: Argument): this
  option(flags: string, description: string, defaultValue?: any): this
  requiredOption(flags: string, description: string, defaultValue?: any): this
  addOption(option: Option): this
  opts(): Record<string, any>
  optsWithGlobals(): Record<string, any>
  getOptionValue(name: string): any
  setOptionValue(name: string, value: any): this
  getOptionValueSource(name: string): 'cli'|'default'|'env'
  setOptionValueWithSource(name: string, value: any, source: string): this
  storeOptionsAsProperties(): this
  hook(event: 'preAction'|'postAction'|'preSubcommand', callback: (thisCommand: Command, actionCommand: Command) => any): this
  args: string[]
  opts(): Record<string, any>
}

class Option {
  constructor(flags: string, description?: string)
  default(value: any, description?: string): this
  env(variable: string): this
  choices(values: Array<string|number>): this
  preset(value: any): this
  argParser(fn: (value: string, previous: any) => any): this
  conflicts(optionName: string): this
  implies(config: Record<string, any>): this
  hideHelp(): this
  makeOptionMandatory(): this
}

class Argument {
  constructor(name: string, description?: string)
  default(value: any, description?: string): this
  choices(values: Array<string|number>): this
  argParser(fn: (value: string, previous: any) => any): this
}

// Full Code Example: string-util.js
const { Command, Option, Argument } = require('commander');
const program = new Command('string-util');
program
  .description('CLI to JavaScript string utilities')
  .version('0.8.0', '-v, --vers', 'output version');
program.command('split <string>')
  .description('split string')
  .option('--first', 'first substring only')
  .addOption(new Option('-s, --separator <char>', 'separator char').default(',', 'comma'))
  .action((str, options, command) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });
program.hook('preAction', (thisCmd, actionCmd) => {
  if (thisCmd.opts().trace) console.log('Calling', actionCmd.name());
});
program.configureOutput({
  writeOut: str => process.stdout.write(str),
  writeErr: str => process.stderr.write(str),
  outputError: (str, write) => write(`ERROR: ${str}`)
});
program.exitOverride();
program.parse(process.argv);

// Troubleshooting Procedures
// Unknown option:
// > node app.js --unknown
// error: unknown option '--unknown'
// (Did you mean --help?)

// Missing required option:
// > node app.js split
// error: required option '-s, --separator <char>' not specified


## Information Dense Extract
npm install commander; import { Command, Option, Argument, createCommand } from 'commander'; const program = createCommand(); program.name(string).version(v,flags,desc).usage(usage).description(desc).helpOption(flags,desc).helpCommand(name,desc); // Options: .option(f,d,df).requiredOption(f,d,df).addOption(new Option(f,d).default(v).env(VAR).choices([...]).preset(v).argParser(fn).conflicts(opt).implies({opt:v}).hideHelp().makeOptionMandatory()); // Args: .argument('<x>',d,def).addArgument(new Argument(name,d).choices([...]).default(v).argParser(fn)); // Commands: .command(nameAndArgs,desc,opts).addCommand(cmd).alias(a).executableDir(path); // Parsing: .parse([argv],{from}).parseAsync(); .enablePositionalOptions().passThroughOptions().allowUnknownOption().allowExcessArguments().storeOptionsAsProperties(); // Retrieval: opts(),optsWithGlobals(),getOptionValue(n),getOptionValueSource(n),setOptionValue(n,v),setOptionValueWithSource(n,v,src),args; // Help: .addHelpText(pos,textOrFn).showHelpAfterError(msg?).showSuggestionAfterError(bool).help();.outputHelp();.helpInformation();.configureHelp(cfg).createHelp(); // Hooks: .hook('preAction'|'postAction'|'preSubcommand',cb); // Errors: .error(msg,{exitCode,code});.exitOverride(cb); // Output: .configureOutput({writeOut,writeErr,outputError}); // Util: createCommand();

## Sanitised Extract
Table of Contents:
1 Option Definition
2 Option Retrieval
3 Command & Subcommand Definition
4 Argument Configuration
5 Action Handler Signature
6 Parsing Methods
7 Help Generation & Customization
8 Lifecycle Hooks
9 Error & Exit Handling
10 Output Configuration
11 Utility Methods

1 Option Definition
.option(flags:string,description:string,defaultValue?:any)
.requiredOption(flags:string,description:string,defaultValue?:any)
.addOption(option:Option)
Option types:
  boolean: flags e.g. '-d, --debug'
  value: '<name>' placeholder
  optional: '[name]'
  negatable: '--no-foo'
  variadic: '<items...>'
  custom: new Option(flags,desc).default(val).env('VAR').choices([...]).preset(val).argParser(fn).conflicts(opt).implies({opt:val}).hideHelp().makeOptionMandatory()

2 Option Retrieval
program.opts(): Record<string,any>
program.optsWithGlobals(): merged options
program.getOptionValue(name:string): any
program.getOptionValueSource(name:string): 'cli'|'default'|'env'
program.setOptionValue(name:string,value:any)
program.setOptionValueWithSource(name:string,value:any,source:string)

3 Command & Subcommand Definition
.command(name:string,desc?:string,config?:{executableFile?:string,isDefault?:boolean}) => Command
.addCommand(cmd:Command)
.alias(alias:string)
.name(name:string)
.description(desc:string,summary?:string)
.usage(str:string)
.version(version:string,flags?:string,description?:string)
.executableDir(path:string)

4 Argument Configuration
.argument(name:string,description?:string,defaultValue?:any)
.addArgument(arg:Argument)
new Argument(name,desc).choices([...]).default(val,desc).argParser(fn)

5 Action Handler Signature
.action(handler:Function)
handler parameters: declared arguments, options (Record), command instance
async handlers require parseAsync

6 Parsing Methods
.parse(argv?:string[],options?:{from:'node'|'electron'|'user'})
.parseAsync(...)
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption(allow?:boolean)
.allowExcessArguments(allow?:boolean)
.storeOptionsAsProperties()

7 Help Generation & Customization
.helpOption(flags:string,description:string)
.helpCommand(name?:string,description?:string)
.addHelpText(position:'before'|'after',textOrFn:string|Function)
.showHelpAfterError(msgOrBool?:string|boolean)
.showSuggestionAfterError(show:boolean)
.help(): void
.outputHelp(): void
.helpInformation(): string
.configureHelp({sortSubcommands?:boolean,sortOptions?:boolean,showGlobalOptions?:boolean,styleMethods?:Record<string,Function>})
.createHelp(): Help

8 Lifecycle Hooks
.hook('preAction'|'postAction',callback:(thisCmd,actionCmd)=>void)
.hook('preSubcommand',callback:(thisCmd,subCmd)=>void)

9 Error & Exit Handling
.error(message:string,{exitCode?:number,code?:string}?)
.exitOverride(handler?:(err:CommanderError)=>void)

10 Output Configuration
.configureOutput({writeOut:(str:string)=>void,writeErr:(str:string)=>void,outputError:(str:string,write:Function)=>void})

11 Utility Methods
.createCommand(): Command
.version(version:string,flags?:string,description?:string)
.name(name:string)
.usage(str:string)

## Original Source
Commander.js
https://github.com/tj/commander.js

## Digest of COMMANDER

# Commander.js Technical Digest (Retrieved on 2024-06-17)

## 1 Installation and Initialization

### Install via npm
```
npm install commander
```

### Require or Import

CommonJS:
```
const { Command, Option, Argument } = require('commander');
const program = new Command();
```

ESM:
```
import { Command, Option, Argument, createCommand } from 'commander';
const program = createCommand();
```

TypeScript:
```
import { Command } from 'commander';
const program = new Command();
```

## 2 Option Definition and Retrieval

### Method Signatures

- `.option(flags: string, description: string, defaultValue?: any): Command`
- `.requiredOption(flags: string, description: string, defaultValue?: any): Command`
- `.addOption(option: Option): Command`

### Common Patterns

Boolean option:
```
program.option('-d, --debug', 'enable debug mode');
```
Value option:
```
program.option('-p, --port <number>', 'server port', 3000);
```
Optional value:
```
program.option('-c, --cheese [type]', 'add cheese optionally');
```
Negatable boolean:
```
program.option('--no-sauce', 'disable sauce');
```
Variadic:
```
program.option('-n, --numbers <nums...>', 'list of numbers');
```
Custom Option:
```
new Option('-t, --timeout <ms>', 'timeout').default(60000).env('TIMEOUT_MS');
```

### Retrieval

- `program.opts()`: returns `{ [camelCasedFlag]: value }
`
- `program.optsWithGlobals()`: merges local and global
- `program.getOptionValue(name: string)`: single value
- `program.getOptionValueSource(name: string)`: returns 'cli'|'default'|'env'

## 3 Command and Argument Configuration

### Subcommand Definition

```
program.command('serve <script> [options]')
  .description('start server script')
  .alias('s')
  .action((script, opts, cmd) => { /* handler */ });
```

Or stand-alone executable:
```
program.command('start <service>', 'start named service', { executableFile: 'bin/start.js' });
program.executableDir('subcommands');
```

### Arguments

- `.argument('<name>', 'description')`
- `.argument('[name]', 'description', defaultValue)`
- `.argument('<items...>', 'list of items')`
- `new Argument('<size>', 'cup size').choices(['small','medium','large']).default('medium')`

### Retrieval

- `cmd.args`: array of leftover args
- handler signature: `(arg1,..., options, command)`
- `program.parse(argv?: string[], options?: ParseOptions)`
- `program.parseAsync(...)` for async handlers

## 4 Automated and Custom Help

### Built-in Help

- Default flags: `-h, --help`
- Shows usage, description, arguments, options

### Custom Help Text

- `.addHelpText(position: 'before'|'after', textOrFn)`
- `.showHelpAfterError([msg])`
- `.showSuggestionAfterError(false)`

### Program Methods

- `.help()`: display and exit
- `.outputHelp()`: display without exit
- `.helpInformation()`: return help as string

## 5 Lifecycle Hooks

- `.hook(event: 'preAction'|'postAction'|'preSubcommand', callback)`
- callback parameters: `(thisCommand, actionCommand)` or `(thisCommand, subcommand)`

## 6 Parsing Configuration

- `.enablePositionalOptions()`: only program options before subcommands
- `.passThroughOptions()`: unknown options become args
- `.allowUnknownOption()`, `.allowExcessArguments()`

## 7 Error and Exit Handling

### Error Handling Methods

- `program.error(message: string, options?: { exitCode?: number, code?: string })`
- `.exitOverride()`: throw rather than process.exit

### Output Configuration

- `.configureOutput({ writeOut: fn, writeErr: fn, outputError: fn })`

## 8 Utilities and Misc

- `.version(version: string, flags?: string, description?: string)`
- `.name(name: string)`
- `.usage(str: string)`
- `.description(str: string, summary?: string)`
- `.helpOption(flags: string, description: string)`
- `.helpCommand([name], [description])`
- `.command(name, [description], [opts])`, `.addCommand(cmd)`
- `.storeOptionsAsProperties()`


## Attribution
- Source: Commander.js
- URL: https://github.com/tj/commander.js
- License: MIT License
- Crawl Date: 2025-05-11T08:59:11.888Z
- Data Size: 684724 bytes
- Links Found: 4902

## Retrieved
2025-05-11
library/ZOD_REFERENCE.md
# library/ZOD_REFERENCE.md
# ZOD_REFERENCE

## Crawl Summary
Core constructors: z.string(), z.number(), z.object({...}), z.array(), z.enum([...]), z.nativeEnum(...), z.union([...]), z.discriminatedUnion(key, schemas), z.intersection(a,b), z.tuple([...]), z.record(keyType,valueType), z.map(...), z.set(...), z.instanceof(), z.function(). Methods: .parse/.parseAsync, .safeParse/.safeParseAsync, .refine, .superRefine, .transform, .default, .nullable/.nullish, .optional, .catch, .brand, .pipe, .args, .returns, .implement, .parameters, .returnType. String validations: .min, .max, .length, .email, .url, .regex, .includes, .startsWith, .endsWith, .datetime({offset,local,precision}), .date, .time, .ip({version}), .cidr({version}). Number: .min/.max/.int/.positive/.multipleOf/.finite/.safe. BigInt same. Date: z.date(), z.coerce.date(). Object methods: .shape, .extend, .merge, .pick, .omit, .partial, .deepPartial, .required, .passthrough, .strict, .strip, .catchall, .keyof. Array: .min/.max/.length/.nonempty. Tuple .rest. Coercion: z.coerce primitives. Error customization. specific TS inference patterns: z.infer, z.input, z.output. Recursive: z.lazy. Function schemas. Best practices: strict mode, safeParse, discriminatedUnion. Data retrieved on 2024-06-19.

## Normalised Extract
Table of Contents
1  Installation
2  Core Schema Constructors
3  Parsing & Safe Parsing Methods
4  String Validations
5  Number & BigInt Validations
6  Object Schema Methods
7  Array & Tuple Methods
8  Composite Types: Union, Intersection, Discriminated Union
9  Utility Types: Record, Map, Set, Lazy, Instanceof
10 Function Schemas
11 Refinements & Transforms
12 Coercion Shortcuts

1  Installation
Requirements: TS >=4.5, tsconfig.json { compilerOptions: { strict: true }}
npm install zod

2  Core Schema Constructors
z.string(): ZodString
z.number(): ZodNumber
z.bigint(): ZodBigInt
z.boolean(): ZodBoolean
z.date(): ZodDate
z.undefined(): ZodUndefined
z.null(): ZodNull
z.void(): ZodVoid
z.any(): ZodAny
z.unknown(): ZodUnknown
z.never(): ZodNever

3  Parsing & Safe Parsing Methods
.parse(data: unknown): T throws ZodError
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: boolean; data?:T; error?:ZodError}
.safeParseAsync(data: unknown): Promise<{ success:boolean; data?:T; error?:ZodError}>

4  String Validations
.string()
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .email({ message? })
  .url({ message? })
  .regex(RegExp, { message? })
  .includes(str, { message? })
  .startsWith(prefix, { message? })
  .endsWith(suffix, { message? })
  .datetime({ offset?:boolean; local?:boolean; precision?:number; message?:string })
  .date({ message? })
  .time({ precision?:number; message?:string })
  .ip({ version?:"v4"|"v6"; message?:string })
  .cidr({ version?:"v4"|"v6"; message?:string })
  .trim()
  .toLowerCase()
  .toUpperCase()

5  Number & BigInt Validations
.number()
  .min(val, { message? }) alias .gte
  .max(val, { message? }) alias .lte
  .int({ message? })
  .positive({ message? })
  .nonnegative({ message? })
  .negative({ message? })
  .nonpositive({ message? })
  .multipleOf(val, { message? })
  .finite({ message? })
  .safe({ message? })
.bigint() similar: .min/.max/.positive/.negative/.multipleOf

6  Object Schema Methods
.object({ key: schema, ... })
  .shape
  .extend({ additionalKey: schema, ... })
  .merge(otherZodObject)
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key?:true, ... })
  .deepPartial()
  .required({ key?:true, ... })
  .strict()
  .passthrough()
  .strip()
  .catchall(schema)
  .keyof()

7  Array & Tuple Methods
.array(itemSchema)
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .nonempty({ message? })
.element property

.tuple([schema1, schema2, ...])
  .rest(itemSchema)

8  Composite Types
.z.union([schema1, schema2, ...])
  .or(otherSchema)
.z.discriminatedUnion(discriminatorKey, [objectSchemas])
.z.intersection(schemaA, schemaB)

9  Utility Types
.z.record(keySchema, valueSchema)
.z.map(keySchema, valueSchema)
.z.set(itemSchema)
  .min/.max/.size/.nonempty
.z.lazy(() => schema)
.z.instanceof(ClassConstructor)

10 Function Schemas
.z.function()
  .args(...argSchemas)
  .returns(returnSchema)
  .implement((...args)=> returnValue)
  .parameters()
  .returnType()

11 Refinements & Transforms
.refine(validatorFn, { message?, path?, params? })
.superRefine((data, ctx)=> void)
.transform(transformFn)
.default(valueOrFn)
.nullable()
.nullish()
.optional()
.catch(errorHandler)
.brand<BrandName>()
.pipe(targetSchema)

12 Coercion Shortcuts
z.coerce.string()
z.coerce.number()
z.coerce.boolean()
z.coerce.bigint()
z.coerce.date()


## Supplementary Details
Installation
tsc --version >= 4.5
Add to tsconfig.json: { compilerOptions: { strict: true }}

Strict mode enables accurate z.infer and z.input/z.output inference.

Error customization
z.string({ required_error: 'X required', invalid_type_error: 'X must be string' })
z.number({ required_error: 'Y required', invalid_type_error: 'Y must be number' })

Custom error messages
ez.string().min(5, { message: 'Min length 5' })

Coercion with z.preprocess
const dated = z.preprocess(val=> new Date(val as string), z.date())

Recursive schema
const Base = z.object({ name: z.string() })
type Node = { name: string; children: Node[] }
const NodeSchema: z.ZodType<Node> = Base.extend({ children: z.lazy(()=> NodeSchema.array()) })

JSON type
const Literal = z.union([z.string(),z.number(),z.boolean(),z.null()])
type Json = Literal | Json[] | Record<string,Json>
const JsonSchema: z.ZodType<Json> = z.lazy(()=> z.union([Literal, JsonSchema.array(), z.record(JsonSchema)]))


## Reference Details
// Full Code Examples and Patterns

1. Installing and Importing
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "CommonJS"
  }
}

npm install zod

import { z, ZodError } from 'zod'

2. Parsing Patterns
// throws on invalid
try {
  const result = z.string().min(3).parse(input)
} catch (err) {
  if (err instanceof ZodError) {
    console.error(err.issues)
  }
}
// safe parsing
const parseResult = z.number().positive().safeParse(maybeNum)
if (!parseResult.success) {
  console.error(parseResult.error.issues)
} else {
  const num = parseResult.data
}

3. Object Composition
const Address = z.object({ street: z.string(), zip: z.string().length(5) })
const User = z.object({ name: z.string(), age: z.number().int().nonnegative(), address: Address })
type User = z.infer<typeof User>

User.parse({ name: 'Alice', age: 30, address: { street: 'Main', zip: '12345' } })

4. Discriminated Unions
const Success = z.object({ status: z.literal('success'), data: z.string() })
const Failure = z.object({ status: z.literal('failure'), error: z.string() })
const Response = z.discriminatedUnion('status', [Success, Failure])

Response.parse({ status: 'success', data: 'ok' }) // pass
Response.parse({ status: 'failure', error: 'bad' }) // pass

5. Function Schema Implementation
const Multiply = z.function().args(z.number(), z.number()).returns(z.number()).implement((a, b) => a * b)
const product = Multiply(2, 3) // 6

6. Configuration Options Reference

// z.string()
.min: minimum length (number)
.max: maximum length (number)
.email: validate format
.url: validate URL
.datetime: options: { offset:boolean, local:boolean, precision:number }

// z.number()
.min: minimum value
.max: maximum value
.int: integer only
.positive, .nonnegative, .negative, .nonpositive
.multipleOf: divisor

7. Troubleshooting

Command: tsc --noEmit
Expected: No errors; ensures Zod types align with TS types.

Runtime: node dist/app.js
If ZodError issues reference unexpected path, enable debug with ZodError.format()

Memory: For large schemas use .strict() to trim unneeded keys and reduce object size.


## Information Dense Extract
zod v4 API: constructors string,number,bigint,boolean,date,undefined,null,void,any,unknown,never. parser methods parse/parseAsync, safeParse/safeParseAsync. string validations min,max,length,email,url,regex,includes,startsWith,endsWith,datetime({offset,local,precision}),date,time(ip,version),cidr. number validations min/gte,max/lte,int,positive,nonnegative,negative,nonpositive,multipleOf,finite,safe. object methods shape,extend,merge,pick,omit,partial,deepPartial,required,strict,passthrough,strip,catchall,keyof. arrays min,max,length,nonempty; tuples rest. composite: union/or,discriminatedUnion,key,intersection. utils: record,map,set(restraints),lazy,instanceof,function args/returns/implement/parameters/returnType. refinements refine,superRefine; transforms transform; preprocess; defaults default; nullability nullable,nullish,optional; catch; brand; pipe. coercion z.coerce.{string,number,boolean,bigint,date}. infers: z.infer, z.input, z.output. error customization required_error,invalid_type_error. best practices: TS strict mode, safeParse for inputs, discriminatedUnion for unions, z.preprocess or pipe for advanced coercion.

## Sanitised Extract
Table of Contents
1  Installation
2  Core Schema Constructors
3  Parsing & Safe Parsing Methods
4  String Validations
5  Number & BigInt Validations
6  Object Schema Methods
7  Array & Tuple Methods
8  Composite Types: Union, Intersection, Discriminated Union
9  Utility Types: Record, Map, Set, Lazy, Instanceof
10 Function Schemas
11 Refinements & Transforms
12 Coercion Shortcuts

1  Installation
Requirements: TS >=4.5, tsconfig.json { compilerOptions: { strict: true }}
npm install zod

2  Core Schema Constructors
z.string(): ZodString
z.number(): ZodNumber
z.bigint(): ZodBigInt
z.boolean(): ZodBoolean
z.date(): ZodDate
z.undefined(): ZodUndefined
z.null(): ZodNull
z.void(): ZodVoid
z.any(): ZodAny
z.unknown(): ZodUnknown
z.never(): ZodNever

3  Parsing & Safe Parsing Methods
.parse(data: unknown): T throws ZodError
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: boolean; data?:T; error?:ZodError}
.safeParseAsync(data: unknown): Promise<{ success:boolean; data?:T; error?:ZodError}>

4  String Validations
.string()
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .email({ message? })
  .url({ message? })
  .regex(RegExp, { message? })
  .includes(str, { message? })
  .startsWith(prefix, { message? })
  .endsWith(suffix, { message? })
  .datetime({ offset?:boolean; local?:boolean; precision?:number; message?:string })
  .date({ message? })
  .time({ precision?:number; message?:string })
  .ip({ version?:'v4'|'v6'; message?:string })
  .cidr({ version?:'v4'|'v6'; message?:string })
  .trim()
  .toLowerCase()
  .toUpperCase()

5  Number & BigInt Validations
.number()
  .min(val, { message? }) alias .gte
  .max(val, { message? }) alias .lte
  .int({ message? })
  .positive({ message? })
  .nonnegative({ message? })
  .negative({ message? })
  .nonpositive({ message? })
  .multipleOf(val, { message? })
  .finite({ message? })
  .safe({ message? })
.bigint() similar: .min/.max/.positive/.negative/.multipleOf

6  Object Schema Methods
.object({ key: schema, ... })
  .shape
  .extend({ additionalKey: schema, ... })
  .merge(otherZodObject)
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key?:true, ... })
  .deepPartial()
  .required({ key?:true, ... })
  .strict()
  .passthrough()
  .strip()
  .catchall(schema)
  .keyof()

7  Array & Tuple Methods
.array(itemSchema)
  .min(n, { message? })
  .max(n, { message? })
  .length(n, { message? })
  .nonempty({ message? })
.element property

.tuple([schema1, schema2, ...])
  .rest(itemSchema)

8  Composite Types
.z.union([schema1, schema2, ...])
  .or(otherSchema)
.z.discriminatedUnion(discriminatorKey, [objectSchemas])
.z.intersection(schemaA, schemaB)

9  Utility Types
.z.record(keySchema, valueSchema)
.z.map(keySchema, valueSchema)
.z.set(itemSchema)
  .min/.max/.size/.nonempty
.z.lazy(() => schema)
.z.instanceof(ClassConstructor)

10 Function Schemas
.z.function()
  .args(...argSchemas)
  .returns(returnSchema)
  .implement((...args)=> returnValue)
  .parameters()
  .returnType()

11 Refinements & Transforms
.refine(validatorFn, { message?, path?, params? })
.superRefine((data, ctx)=> void)
.transform(transformFn)
.default(valueOrFn)
.nullable()
.nullish()
.optional()
.catch(errorHandler)
.brand<BrandName>()
.pipe(targetSchema)

12 Coercion Shortcuts
z.coerce.string()
z.coerce.number()
z.coerce.boolean()
z.coerce.bigint()
z.coerce.date()

## Original Source
Zod
https://github.com/colinhacks/zod

## Digest of ZOD_REFERENCE

# Zod API Specifications and Usage (Retrieved 2024-06-19)

## 1. Installation and Setup
• Requirements: TypeScript >=4.5 with "strict": true in tsconfig.json (compilerOptions.strict = true)
• Install: npm install zod | yarn add zod | pnpm add zod | bun add zod
• Canary: npm install zod@canary | yarn add zod@canary | pnpm add zod@canary | bun add zod@canary

## 2. Core Methods and Signatures
### 2.1 Schema Constructors
• z.string(): ZodString
• z.number(): ZodNumber
• z.bigint(): ZodBigInt
• z.boolean(): ZodBoolean
• z.date(): ZodDate
• z.undefined(): ZodUndefined
• z.null(): ZodNull
• z.void(): ZodVoid
• z.any(): ZodAny
• z.unknown(): ZodUnknown
• z.never(): ZodNever

### 2.2 Parsing and Safe Parsing
• parse(input: unknown): T throws ZodError
• parseAsync(input: unknown): Promise<T>
• safeParse(input: unknown): { success: boolean; data?: T; error?: ZodError }
• safeParseAsync(input: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

## 3. String Validations and Transformations
• Methods and signatures:
  - .min(min: number, opts?: { message: string }): ZodString
  - .max(max: number, opts?: { message: string }): ZodString
  - .length(len: number, opts?: { message: string }): ZodString
  - .email(opts?: { message: string }): ZodString
  - .url(opts?: { message: string }): ZodString
  - .regex(pattern: RegExp, opts?: { message: string }): ZodString
  - .includes(substr: string, opts?: { message: string }): ZodString
  - .startsWith(prefix: string, opts?: { message: string }): ZodString
  - .endsWith(suffix: string, opts?: { message: string }): ZodString
  - .datetime(opts?: { offset?: boolean; local?: boolean; precision?: number; message?: string }): ZodString
  - .date(opts?: { message: string }): ZodString
  - .time(opts?: { precision?: number; message?: string }): ZodString
  - .ip(opts?: { version?: "v4" | "v6"; message?: string }): ZodString
  - .cidr(opts?: { version?: "v4" | "v6"; message?: string }): ZodString
  - .trim(): ZodString
  - .toLowerCase(): ZodString
  - .toUpperCase(): ZodString

## 4. Number and BigInt Validations
• z.number(): ZodNumber
  - .min(val: number, opts?: { message: string }) alias .gte
  - .max(val: number, opts?: { message: string }) alias .lte
  - .int(opts?: { message: string }): ZodNumber
  - .positive(opts?: { message: string }): ZodNumber
  - .nonnegative(opts?: { message: string }): ZodNumber
  - .negative(opts?: { message: string }): ZodNumber
  - .nonpositive(opts?: { message: string }): ZodNumber
  - .multipleOf(val: number, opts?: { message: string }): ZodNumber
  - .finite(opts?: { message: string }): ZodNumber
  - .safe(opts?: { message: string }): ZodNumber
• z.bigint(): ZodBigInt with .min/.max/.positive/.negative/.multipleOf

## 5. Object and Utility Methods
• z.object(shape: Record<string, ZodType>): ZodObject
  - .shape: Record access
  - .extend(ext: Record<string, ZodType>): ZodObject
  - .merge(other: ZodObject): ZodObject
  - .pick(keys: Record<string, boolean>): ZodObject
  - .omit(keys: Record<string, boolean>): ZodObject
  - .partial(keys?: Record<string, boolean>): ZodObject
  - .deepPartial(): ZodObject
  - .required(keys?: Record<string, boolean>): ZodObject
  - .strict(): ZodObject
  - .passthrough(): ZodObject
  - .strip(): ZodObject
  - .catchall(schema: ZodType): ZodObject
  - .keyof(): ZodEnum

• Arrays: z.array(item: ZodType): ZodArray
  - .min(n: number, opts?: { message:string }): ZodArray
  - .max(n: number, opts?: { message:string }): ZodArray
  - .length(n: number, opts?: { message:string }): ZodArray
  - .nonempty(opts?: { message:string }): ZodArray

• z.tuple(items: ZodType[]): ZodTuple
  - .rest(item: ZodType): ZodTuple

• z.union(options: ZodType[]): ZodUnion
  - .or(other: ZodType): ZodUnion
• z.discriminatedUnion(key: string, options: ZodObject[]): ZodUnion
• z.intersection(a: ZodType, b: ZodType): ZodIntersection
• z.record(keyType: ZodType, valueType: ZodType): ZodRecord
• z.map(keyType: ZodType, valueType: ZodType): ZodMap
• z.set(item: ZodType): ZodSet
  - .min/.max/.size/.nonempty
• z.lazy(fn: ()=>ZodType): ZodType
• z.instanceof(classRef: new (...args:any)=> any): ZodType
• z.function(): ZodFunction
  - .args(...args: ZodType[]): ZodFunction
  - .returns(returnType: ZodType): ZodFunction
  - .implement(fn: (...args:any[])=> any): (...args:any[])=> any
  - .parameters(): ZodTuple
  - .returnType(): ZodType

## 6. Refinements, Transforms, Preprocessing
• .refine(validator: (data:T)=> boolean|Promise<boolean>, opts?: { message?: string; path?: (string|number)[]; params?: any }): ZodType
• .superRefine((data, ctx)=> void): ZodType
• .transform(transformer: (data:T)=> any|Promise<any>): ZodType
• .default(def: T|(()=>T)): ZodType
• .nullable(): ZodType
• .nullish(): ZodType
• .optional(): ZodType
• .catch(handler: (err: ZodError)=> T): ZodType
• .brand<U extends string>(): ZodBrandedType
• .pipe(target: ZodType): ZodType

## 7. Coercion Shortcuts
• z.coerce.string(): String(input)
• z.coerce.number(): Number(input)
• z.coerce.boolean(): Boolean(input)
• z.coerce.bigint(): BigInt(input)
• z.coerce.date(): new Date(input)

## 8. Error Handling
• ZodError.issues: { path: (string|number)[]; message: string; code: string }[]
• customize required_error and invalid_type_error in constructors

## 9. Best Practices & Troubleshooting
• Always enable strict TypeScript mode
• Use safeParse in user input contexts
• For complex coercion use z.preprocess or z.pipe
• For discriminated unions prefer z.discriminatedUnion over z.union



## Attribution
- Source: Zod
- URL: https://github.com/colinhacks/zod
- License: MIT License
- Crawl Date: 2025-05-11T04:35:14.753Z
- Data Size: 896451 bytes
- Links Found: 6108

## Retrieved
2025-05-11
library/EXPRESS_MIDDLEWARE.md
# library/EXPRESS_MIDDLEWARE.md
# EXPRESS_MIDDLEWARE

## Crawl Summary
express.json: parse JSON bodies; options inflate(Boolean,true), limit(number|string,100kb), reviver(Function,null), strict(Boolean,true), type(Mixed,application/json), verify(Function)
express.raw: parse Buffer bodies; options inflate, limit, type(application/octet-stream), verify
express.text: parse text bodies; options defaultCharset(utf-8), inflate, limit, type(text/plain), verify
express.urlencoded: parse urlencoded; options extended(true), inflate, limit, parameterLimit(1000), type(application/x-www-form-urlencoded), verify
express.Router: create router; options caseSensitive(false), mergeParams(false), strict(false)
express.static: serve files; options dotfiles(undefined), etag(true), extensions(false), fallthrough(true), immutable(false), index(index.html), lastModified(true), maxAge(0), redirect(true), setHeaders(Function)

## Normalised Extract
Table of Contents:
1 express.json
2 express.raw
3 express.text
4 express.urlencoded
5 express.Router
6 express.static

1 express.json
Function signature: express.json(options?) → RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = "100kb"
  reviver: Function = null
  strict: Boolean = true
  type: string|string[]|function = "application/json"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses JSON, populates req.body with object or {} on no body\/no match\/error

2 express.raw
Function signature: express.raw(options?) → RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = "100kb"
  type: string|string[]|function = "application/octet-stream"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into Buffer, populates req.body with Buffer or {}

3 express.text
Function signature: express.text(options?) → RequestHandler
Options:
  defaultCharset: string = "utf-8"
  inflate: Boolean = true
  limit: number|string = "100kb"
  type: string|string[]|function = "text/plain"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into string, populates req.body with string or {}

4 express.urlencoded
Function signature: express.urlencoded(options?) → RequestHandler
Options:
  extended: Boolean = true
  inflate: Boolean = true
  limit: number|string = "100kb"
  parameterLimit: number = 1000
  type: string|string[]|function = "application/x-www-form-urlencoded"
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses URL-encoded data into object or {}

5 express.Router
Function signature: express.Router(options?) → Router
Options:
  caseSensitive: Boolean = false
  mergeParams: Boolean = false
  strict: Boolean = false
Behavior: creates modular route handlers

6 express.static
Function signature: express.static(root,options?) → RequestHandler
Options:
  dotfiles: "allow"|"deny"|"ignore"|undefined = undefined
  etag: Boolean = true
  extensions: string[]|false = false
  fallthrough: Boolean = true
  immutable: Boolean = false
  index: string|false = "index.html"
  lastModified: Boolean = true
  maxAge: number|string = 0
  redirect: Boolean = true
  setHeaders: function(res,path,stat) = undefined
Behavior: serves static assets with caching and fallback

## Supplementary Details
Node.js version >= 0.10 required
Installation: npm install express
Import and app creation:
  var express = require('express')
  var app = express()
Mount middleware before routes:
  app.use(express.json({limit:'1mb'}))
  app.use(express.urlencoded({extended:false, parameterLimit:500}))
  app.use(express.text())
  app.use(express.raw({type:'application/custom'}))
Create router and mount:
  var router = express.Router({mergeParams:true, strict:true})
  router.get('/path', handler)
  app.use('/api', router)
Serve static files with custom headers:
  app.use(express.static('public',{maxAge:'1d', immutable:true, setHeaders:function(res,path,stat){res.set('X-Timestamp',Date.now())}}))

## Reference Details
Function Signatures:
  express.json(options?:{
    inflate?:boolean;
    limit?:number|string;
    reviver?:(key:any,value:any)=>any;
    strict?:boolean;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.raw(options?:{
    inflate?:boolean;
    limit?:number|string;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.text(options?:{
    defaultCharset?:string;
    inflate?:boolean;
    limit?:number|string;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.urlencoded(options?:{
    extended?:boolean;
    inflate?:boolean;
    limit?:number|string;
    parameterLimit?:number;
    type?:string|string[]|(req:Request)=>boolean;
    verify?:(req:Request,res:Response,buf:Buffer,encoding:string)=>void;
  }):RequestHandler
  express.Router(options?:{
    caseSensitive?:boolean;
    mergeParams?:boolean;
    strict?:boolean;
  }):Router
  express.static(root:string,options?:{
    dotfiles?:'allow'|'deny'|'ignore';
    etag?:boolean;
    extensions?:string[]|false;
    fallthrough?:boolean;
    immutable?:boolean;
    index?:string|false;
    lastModified?:boolean;
    maxAge?:number|string;
    redirect?:boolean;
    setHeaders?:(res:Response,path:string,stat:fs.Stats)=>void;
  }):RequestHandler

Code Examples:
  var express = require('express')
  var app = express()
  app.use(express.json({limit:'2mb', strict:false}))
  app.use(express.urlencoded({extended:true, parameterLimit:2000}))
  var apiRouter = express.Router({caseSensitive:true})
  apiRouter.post('/item', function(req,res){
    if(typeof req.body.id!=='string') return res.status(400).send('Invalid');
    res.json({created:true, id:req.body.id})
  })
  app.use('/api', apiRouter)
  app.use(express.static('public',{maxAge:'1h', immutable:true}))
  app.listen(3000)

Best Practices:
  Validate req.body properties before use
  Test body type: if(!Buffer.isBuffer(req.body)) throw Error
  Use reverse proxy cache for static assets

Troubleshooting:
  Command: curl -X POST http://localhost:3000/api/item -H "Content-Type: application/json" -d '{"id":"123"}'
  Expected: JSON {"created":true,"id":"123"}
  If req.body is empty: check Content-Type header; verify limit not exceeded
  If parsing error: enable verify option to throw on malformed body:
    app.use(express.json({verify:function(req,res,buf){try{JSON.parse(buf)}catch(e){throw e}}}))

## Information Dense Extract
express.json:inflate:true|limit:100kb|reviver:null|strict:true|type:application/json|verify:fn → RequestHandler; express.raw:inflate:true|limit:100kb|type:application/octet-stream|verify:fn → RequestHandler; express.text:defaultCharset:utf-8|inflate:true|limit:100kb|type:text/plain|verify:fn → RequestHandler; express.urlencoded:extended:true|inflate:true|limit:100kb|parameterLimit:1000|type:application/x-www-form-urlencoded|verify:fn → RequestHandler; express.Router:caseSensitive:false|mergeParams:false|strict:false → Router; express.static:maxAge:0|etag:true|extensions:false|dotfiles:undefined|fallthrough:true|immutable:false|index:index.html|lastModified:true|redirect:true|setHeaders:fn → RequestHandler

## Sanitised Extract
Table of Contents:
1 express.json
2 express.raw
3 express.text
4 express.urlencoded
5 express.Router
6 express.static

1 express.json
Function signature: express.json(options?)  RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = '100kb'
  reviver: Function = null
  strict: Boolean = true
  type: string|string[]|function = 'application/json'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses JSON, populates req.body with object or {} on no body'/no match'/error

2 express.raw
Function signature: express.raw(options?)  RequestHandler
Options:
  inflate: Boolean = true
  limit: number|string = '100kb'
  type: string|string[]|function = 'application/octet-stream'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into Buffer, populates req.body with Buffer or {}

3 express.text
Function signature: express.text(options?)  RequestHandler
Options:
  defaultCharset: string = 'utf-8'
  inflate: Boolean = true
  limit: number|string = '100kb'
  type: string|string[]|function = 'text/plain'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses body into string, populates req.body with string or {}

4 express.urlencoded
Function signature: express.urlencoded(options?)  RequestHandler
Options:
  extended: Boolean = true
  inflate: Boolean = true
  limit: number|string = '100kb'
  parameterLimit: number = 1000
  type: string|string[]|function = 'application/x-www-form-urlencoded'
  verify: function(req,res,buf,encoding) = undefined
Behavior: parses URL-encoded data into object or {}

5 express.Router
Function signature: express.Router(options?)  Router
Options:
  caseSensitive: Boolean = false
  mergeParams: Boolean = false
  strict: Boolean = false
Behavior: creates modular route handlers

6 express.static
Function signature: express.static(root,options?)  RequestHandler
Options:
  dotfiles: 'allow'|'deny'|'ignore'|undefined = undefined
  etag: Boolean = true
  extensions: string[]|false = false
  fallthrough: Boolean = true
  immutable: Boolean = false
  index: string|false = 'index.html'
  lastModified: Boolean = true
  maxAge: number|string = 0
  redirect: Boolean = true
  setHeaders: function(res,path,stat) = undefined
Behavior: serves static assets with caching and fallback

## Original Source
Express.js API Reference
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_MIDDLEWARE

# Express.js 4.x API Reference (Built-in Middleware Functions)
Content retrieved: 2024-06-30
Data Size: 26740539 bytes

# express.json([options])
Parses incoming requests with JSON payloads. Based on body-parser.

| Option   | Type                                                  | Default            | Description                                                                                              |
|----------|-------------------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------|
| inflate  | Boolean                                               | true               | Enable handling of gzip/deflate compressed bodies                                                        |
| limit    | number or string                                      | "100kb"           | Max request body size; number in bytes or string parsed by bytes library                                |
| reviver  | function(key, value)                                  | null               | Passed as second argument to JSON.parse                                                                   |
| strict   | Boolean                                               | true               | Accept only arrays and objects; false accepts any JSON.parse input                                        |
| type     | string, string[], or function(req) → boolean          | "application/json"| Media type to parse; passed to type-is or custom function                                                |
| verify   | function(req, res, buf, encoding)                    | undefined          | Called before parsing; throw error to abort parsing                                                       |

# express.raw([options])
Parses all bodies as Buffer. Based on body-parser.

| Option   | Type                                                  | Default                  | Description                                                                                              |
|----------|-------------------------------------------------------|--------------------------|----------------------------------------------------------------------------------------------------------|
| inflate  | Boolean                                               | true                     | Enable handling of gzip/deflate compressed bodies                                                        |
| limit    | number or string                                      | "100kb"                 | Max request body size                                                                                   |
| type     | string, string[], or function(req) → boolean          | "application/octet-stream" | Media type to parse                                                                                      |
| verify   | function(req, res, buf, encoding)                    | undefined                | Called before parsing; throw error to abort parsing                                                       |

# express.text([options])
Parses bodies into string. Based on body-parser.

| Option         | Type                                                | Default      | Description                                                                                              |
|----------------|-----------------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------|
| defaultCharset | string                                              | "utf-8"     | Default charset when not specified in Content-Type                                                       |
| inflate        | Boolean                                             | true         | Enable handling of gzip/deflate compressed bodies                                                        |
| limit          | number or string                                    | "100kb"     | Max request body size                                                                                   |
| type           | string, string[], or function(req) → boolean        | "text/plain"| Media type to parse                                                                                      |
| verify         | function(req, res, buf, encoding)                  | undefined    | Called before parsing; throw error to abort parsing                                                       |

# express.urlencoded([options])
Parses URL-encoded bodies. Based on body-parser.

| Option         | Type                                                | Default            | Description                                                                                              |
|----------------|-----------------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------|
| extended       | Boolean                                             | true               | false uses querystring, true uses qs library                                                              |
| inflate        | Boolean                                             | true               | Enable handling of gzip/deflate compressed bodies                                                        |
| limit          | number or string                                    | "100kb"           | Max request body size                                                                                   |
| parameterLimit | number                                              | 1000               | Max number of URL-encoded parameters                                                                     |
| type           | string, string[], or function(req) → boolean        | "application/x-www-form-urlencoded" | Media type to parse                                                      |
| verify         | function(req, res, buf, encoding)                  | undefined          | Called before parsing; throw error to abort parsing                                                       |

# express.Router([options])
Creates router. Options:

| Option        | Type    | Default | Description                                              |
|---------------|---------|---------|----------------------------------------------------------|
| caseSensitive | Boolean | false   | Enable case sensitivity on route paths                   |
| mergeParams   | Boolean | false   | Preserve parent req.params values                        |
| strict        | Boolean | false   | Enable strict routing: "/foo" != "/foo/"             |

# express.static(root, [options])
Serves static files from root.

| Option      | Type                   | Default       | Description                                                                                     |
|-------------|------------------------|---------------|-------------------------------------------------------------------------------------------------|
| dotfiles    | "allow","deny","ignore" or undefined | undefined     | How to treat files starting with dot                                                           |
| etag        | Boolean                | true          | Enable weak ETag generation                                                                     |
| extensions  | string[] or false      | false         | File extension fallbacks: serve first existing extension                                         |
| fallthrough | Boolean                | true          | if true call next() on client errors; if false invoke next(err)                                  |
| immutable   | Boolean                | false         | Enable immutable Cache-Control directive (
| index       | string or false        | "index.html" | Specify directory index file or disable                                                           |
| lastModified| Boolean                | true          | Set Last-Modified header                                                                        |
| maxAge      | number or string       | 0             | Set Cache-Control max-age in ms or ms format                                                     |
| redirect    | Boolean                | true          | Redirect to trailing slash for directories                                                      |
| setHeaders  | function(res, path, stat) | undefined    | Custom header setter; called synchronously                                                        |

Attribution: source=https://expressjs.com/en/4x/api.html

## Attribution
- Source: Express.js API Reference
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-11T04:57:58.184Z
- Data Size: 26740539 bytes
- Links Found: 21583

## Retrieved
2025-05-11
library/SWAGGER_UI_INSTALLATION.md
# library/SWAGGER_UI_INSTALLATION.md
# SWAGGER_UI_INSTALLATION

## Crawl Summary
Installation via npm: swagger-ui, swagger-ui-react, swagger-ui-dist with commands. Import patterns for bundlers and static asset serving with absolutePath. Docker usage: pull image, run with env vars SWAGGER_JSON, SWAGGER_JSON_URL, BASE_URL, PORT, PORT_IPV6, EMBEDDING. unpkg integration: CSS and JS URLs, script initialization. Static hosting: copy /dist, update swagger-initializer.js.

## Normalised Extract
Table of Contents
1. NPM Installation
2. swagger-ui-dist Usage
3. Docker Usage
4. unpkg Integration
5. Static Hosting

1. NPM Installation
Install modules:
npm install swagger-ui swagger-ui-react swagger-ui-dist

Import and initialize:
import SwaggerUI from 'swagger-ui'
// or
const SwaggerUI = require('swagger-ui')
SwaggerUI({ dom_id: '#myDomId', url: <OpenAPI URL>, presets: [], layout: '' })

2. swagger-ui-dist Usage
Retrieve absolute path:
const path = require('swagger-ui-dist').absolutePath()
Server assets:
app.use(express.static(path));
Exports:
SwaggerUIBundle(options), SwaggerUIStandalonePreset
Options: url:string, dom_id:string, presets:Array, layout:string

3. Docker Usage
Commands:
docker pull docker.swagger.io/swaggerapi/swagger-ui
docker run -p hostPort:containerPort
Environment variables:
  SWAGGER_JSON=path
  SWAGGER_JSON_URL=url
  BASE_URL=pathPrefix
  PORT=number (default 8080)
  PORT_IPV6=number (none by default)
  EMBEDDING=true|false (default false)

4. unpkg Integration
CSS URL: https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css
JS URLs: bundle and standalone-preset
Initialization in window.onload:
SwaggerUIBundle({ url, dom_id, presets, layout })

5. Static Hosting
Steps:
Download release, extract /dist
Serve files via any HTTP server
Edit swagger-initializer.js: replace default spec URL with your own

## Supplementary Details
Default module versions align with npm latest release. swagger-ui exports main(options:Object):void where options.dom_id default '#swagger-ui', options.url default 'https://petstore.swagger.io/v2/swagger.json'. swagger-ui-dist.absolutePath():string returns filesystem path. Bundle includes swagger-ui-bundle.js and swagger-ui-standalone-preset.js. Docker image tag corresponds with release; always use latest or specify tag. Base URL env var must start with '/'. Port vars override container HTTP and IPv6 listener. EMBEDDING=true sets X-Frame-Options to allow embedding. unpkg uses dist@5.11.0; adjust version accordingly. swagger-initializer.js default spec path is hardcoded; update variable 'spec' in that file.

## Reference Details
SDK Methods:
functions:
  SwaggerUI(options:Object):{}
    options.dom_id:string required
    options.url:string
    options.presets:Array
    options.layout:string
    returns instance Object with methods init(), render(), destroy()

  require('swagger-ui-dist').absolutePath():string

  require('swagger-ui-dist').SwaggerUIBundle(options:Object):object same as SwaggerUI
  require('swagger-ui-dist').SwaggerUIStandalonePreset:Object

Docker Environment Variables:
  SWAGGER_JSON: path to local swagger.json Default: none
  SWAGGER_JSON_URL: HTTP(s) URL to spec Default: none
  BASE_URL: root URL path Default: '/'
  PORT: HTTP listener port Default: '8080'
  PORT_IPV6: IPv6 listener port Default: none
  EMBEDDING: 'true'|'false' Default: 'false'

Best Practices:
- Use swagger-ui in bundler-based projects to reduce payload.
- Use swagger-ui-dist for static asset serving.
- Pin unpkg versions to avoid breaking changes.
- Configure BASE_URL for reverse proxies and subpath deployments.
- Enable EMBEDDING only if embedding in iframes is required.

Troubleshooting:
Verify asset serving:
  curl -I http://localhost:3000/swagger-ui.css
Expected 'HTTP/1.1 200 OK'
Check Docker logs:
  docker logs <container>

## Information Dense Extract
npm install swagger-ui swagger-ui-react swagger-ui-dist; import SwaggerUI({dom_id, url, presets, layout}); express.static(require('swagger-ui-dist').absolutePath()); exports SwaggerUIBundle, SwaggerUIStandalonePreset; Docker pull/run with -e SWAGGER_JSON, SWAGGER_JSON_URL, BASE_URL, PORT, PORT_IPV6, EMBEDDING; unpkg CSS at /swagger-ui.css and JS at /swagger-ui-bundle.js,/swagger-ui-standalone-preset.js; static host /dist + edit swagger-initializer.js to your spec URL

## Sanitised Extract
Table of Contents
1. NPM Installation
2. swagger-ui-dist Usage
3. Docker Usage
4. unpkg Integration
5. Static Hosting

1. NPM Installation
Install modules:
npm install swagger-ui swagger-ui-react swagger-ui-dist

Import and initialize:
import SwaggerUI from 'swagger-ui'
// or
const SwaggerUI = require('swagger-ui')
SwaggerUI({ dom_id: '#myDomId', url: <OpenAPI URL>, presets: [], layout: '' })

2. swagger-ui-dist Usage
Retrieve absolute path:
const path = require('swagger-ui-dist').absolutePath()
Server assets:
app.use(express.static(path));
Exports:
SwaggerUIBundle(options), SwaggerUIStandalonePreset
Options: url:string, dom_id:string, presets:Array, layout:string

3. Docker Usage
Commands:
docker pull docker.swagger.io/swaggerapi/swagger-ui
docker run -p hostPort:containerPort
Environment variables:
  SWAGGER_JSON=path
  SWAGGER_JSON_URL=url
  BASE_URL=pathPrefix
  PORT=number (default 8080)
  PORT_IPV6=number (none by default)
  EMBEDDING=true|false (default false)

4. unpkg Integration
CSS URL: https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css
JS URLs: bundle and standalone-preset
Initialization in window.onload:
SwaggerUIBundle({ url, dom_id, presets, layout })

5. Static Hosting
Steps:
Download release, extract /dist
Serve files via any HTTP server
Edit swagger-initializer.js: replace default spec URL with your own

## Original Source
OpenAPI and Swagger UI
https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/

## Digest of SWAGGER_UI_INSTALLATION

# NPM Installation

Install packages using npm:

```bash
npm install swagger-ui
npm install swagger-ui-react
npm install swagger-ui-dist
```

Import and invoke:

```js
import SwaggerUI from 'swagger-ui'
// or
const SwaggerUI = require('swagger-ui')

SwaggerUI({ dom_id: '#myDomId' })
```

# swagger-ui-dist Usage

Access assets for server-side projects:

```js
const express = require('express')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
const app = express()
app.use(express.static(pathToSwaggerUi))
app.listen(3000)
```

Expose bundle API:

```js
const { SwaggerUIBundle, SwaggerUIStandalonePreset } = require('swagger-ui-dist')
const ui = SwaggerUIBundle({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  dom_id: '#swagger-ui',
  presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
  layout: 'StandaloneLayout'
})
```

# Docker

Pull image and run:

```bash
docker pull docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:8080 docker.swagger.io/swaggerapi/swagger-ui
```

Run with host swagger.json file:

```bash
docker run -p 80:8080 -e SWAGGER_JSON=/foo/swagger.json -v /bar:/foo docker.swagger.io/swaggerapi/swagger-ui
```

Run with remote URL:

```bash
docker run -p 80:8080 -e SWAGGER_JSON_URL=https://petstore3.swagger.io/api/v3/openapi.json docker.swagger.io/swaggerapi/swagger-ui
```

Customize base URL and ports:

```bash
docker run -p 80:8080 -e BASE_URL=/swagger -e SWAGGER_JSON=/foo/swagger.json -v /bar:/foo docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:80 -e PORT=80 docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:80 -e PORT_IPV6=8080 docker.swagger.io/swaggerapi/swagger-ui
docker run -p 80:80 -e EMBEDDING=true docker.swagger.io/swaggerapi/swagger-ui
```

# unpkg Integration

Embed via script tags in HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
<script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
<script>
  window.onload = function() {
    window.ui = SwaggerUIBundle({ url: 'https://petstore3.swagger.io/api/v3/openapi.json', dom_id: '#swagger-ui' })
  }
</script>
```

Use standalone preset:

```html
<script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js" crossorigin></script>
<script>
  window.ui = SwaggerUIBundle({ presets:[SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset], layout:'StandaloneLayout' })
</script>
```

# Static Hosting

Copy contents of /dist and serve:

1. Download release and extract /dist.
2. Copy files to webroot.
3. Edit swagger-initializer.js to point to your OpenAPI spec URL.


## Attribution
- Source: OpenAPI and Swagger UI
- URL: https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
- License: CC0 1.0 Universal / Apache-2.0
- Crawl Date: 2025-05-11T07:31:12.655Z
- Data Size: 802053 bytes
- Links Found: 7569

## Retrieved
2025-05-11
library/EJS_OVERVIEW.md
# library/EJS_OVERVIEW.md
# EJS_OVERVIEW

## Crawl Summary
EJS templates embed plain JavaScript in <% %> scriptlet tags, support escaped (<%=) and unescaped (<%-) output, compile templates to JS functions cached in memory, and throw errors as JS exceptions including file and line info.

## Normalised Extract
Table of Contents
1 Template Syntax
2 Output Modes
3 Caching Mechanism
4 Debugging Options

1 Template Syntax
- Scriptlet: <% code %> for control flow and logic.

2 Output Modes
- Escaped: <%= expression %> escapes HTML.
- Raw: <%- expression %> outputs unescaped HTML.

3 Caching Mechanism
- Option cache: boolean (default false).
- When true, compiled functions stored in memory keyed by template filename.

4 Debugging Options
- Option debug: boolean (default false).
- When true, stack traces include template source context and line numbers.

## Supplementary Details
Tag Delimiters
- Scriptlet: <% code %>
- Escaped Output: <%= value %>
- Unescaped Output: <%- value %>

Options
- cache: boolean = false. Enables in-memory cache of compiled templates.
- debug: boolean = false. Includes template context in error stack traces.

Implementation Steps
1. Install: npm install ejs
2. Use render: const output = ejs.render(templateString, data, {cache:true, debug:true});
3. Use compile: const fn = ejs.compile(templateString, {cache:true}); fn(data);



## Reference Details
API: ejs.render(template: string, data: object, options?: {cache?: boolean, debug?: boolean}) => string | throws Error
API: ejs.compile(template: string, options?: {cache?: boolean, debug?: boolean}) => (data: object) => string
Options:
- cache: boolean. Default false. Enables per-filename caching of compiled functions.
- debug: boolean. Default false. Includes template file and line numbers in exception stack.
Usage Example:
const ejs = require('ejs');
const tpl = '<h1><%= title %></h1>';
// Immediate render
const html = ejs.render(tpl, {title:'Test'}, {cache:true, debug:false});
// Precompile and render
const fn = ejs.compile(tpl, {cache:true});
const html2 = fn({title:'Demo'});

Best Practice:
- Enable cache in production: {cache:true, debug:false}
- Enable debug in development: {cache:false, debug:true}

Troubleshooting:
Command: node -e "console.log(ejs.render('<div><%= x %>', {}))"
Expected Error: ReferenceError: x is not defined at eval (eval at compile (path/to/template), <template>:1:6)
Check template for undefined variables or missing data keys.

## Information Dense Extract
EJS: <% code %>, <%= escaped %>, <%- raw %>. Options: cache=false|true, debug=false|true. render(str,data,opts)->string|Error. compile(str,opts)->(data)->string. Errors include file:line. Cache keyed by filename.

## Sanitised Extract
Table of Contents
1 Template Syntax
2 Output Modes
3 Caching Mechanism
4 Debugging Options

1 Template Syntax
- Scriptlet: <% code %> for control flow and logic.

2 Output Modes
- Escaped: <%= expression %> escapes HTML.
- Raw: <%- expression %> outputs unescaped HTML.

3 Caching Mechanism
- Option cache: boolean (default false).
- When true, compiled functions stored in memory keyed by template filename.

4 Debugging Options
- Option debug: boolean (default false).
- When true, stack traces include template source context and line numbers.

## Original Source
EJS Templating Engine
https://ejs.co/#docs

## Digest of EJS_OVERVIEW

# EJS Template Engine Overview

Retrieved: 2024-06-12

## Key Features

- Uses plain JavaScript in templates via scriptlet tags.
- Template syntax: scriptlet tags for logic, escaped and unescaped output.
- Caches compiled template functions for fast execution.
- Runtime errors thrown as JavaScript exceptions with template file and line numbers.

## Template Syntax

- Scriptlet tags: <% JavaScript code %>
- Escaped output: <%= expression %>
- Unescaped output: <%- expression %>

## Performance and Caching

- Templates compiled to JavaScript functions.
- Option cache: boolean flag to enable in-memory caching per filename.

## Debugging

- Option debug: boolean flag to include original template context in stack traces.
- Errors include file path and line number referencing the template source.

## Active Development

- Maintained under active development with community support.

## Attribution
- Source: EJS Templating Engine
- URL: https://ejs.co/#docs
- License: MIT License
- Crawl Date: 2025-05-11T09:31:31.867Z
- Data Size: 8029 bytes
- Links Found: 26

## Retrieved
2025-05-11
library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
Installation via npm; global CLI supports -h, -v, -c, -t flags; import with require('js-yaml'); three core methods: load(string, options), loadAll(string, iterator, options), dump(object, options) with detailed option defaults; supported schemas (FAILSAFE, JSON, CORE, DEFAULT); dump-specific options including indent, flowLevel, styles, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, forceQuotes, replacer; full YAML tag-to-JS type mapping; caveats on object keys and anchor handling.

## Normalised Extract
Table of Contents:
1. Installation
2. CLI Executable and Usage
3. Import Statement
4. API Methods
   4.1 load(string, options)
   4.2 loadAll(string, iterator, options)
   4.3 dump(object, options)
5. Method Options and Defaults
6. Supported Schemas
7. Supported YAML Types
8. Caveats

1. Installation
   npm install js-yaml

2. CLI Executable and Usage
   npm install -g js-yaml
   Usage: js-yaml [-h] [-v] [-c] [-t] file
   Flags:
     -h, --help     Show help
     -v, --version  Show version
     -c, --compact  Compact error output
     -t, --trace    Stack trace on error

3. Import Statement
   const yaml = require('js-yaml');
   const fs   = require('fs');

4. API Methods
  4.1 load(string, options)
    - Returns: Object|string|number|null|undefined
    - Throws: YAMLException
    - Options:
        filename: string|null (default null)
        onWarning: (YAMLException) → void (default null)
        schema: Schema (DEFAULT_SCHEMA)
        json: boolean (default false)
  4.2 loadAll(string, iterator, options)
    - Returns: any[] or applies iterator(doc)
    - Iterator signature: (doc: any) → void
    - Same options as load
  4.3 dump(object, options)
    - Returns: string
    - Options:
        indent: number = 2
        noArrayIndent: boolean = false
        skipInvalid: boolean = false
        flowLevel: number = -1
        styles: Record<string,string> = {}
        schema: Schema = DEFAULT_SCHEMA
        sortKeys: boolean|((a,b)=>number) = false
        lineWidth: number = 80
        noRefs: boolean = false
        noCompatMode: boolean = false
        condenseFlow: boolean = false
        quotingType: ' or " = '\''
        forceQuotes: boolean = false
        replacer: (key,value) => any

5. Method Options and Defaults
   All options have defined defaults. Override per method call.

6. Supported Schemas
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

7. Supported YAML Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp,
   !!omap, !!pairs, !!set, !!str, !!seq, !!map

8. Caveats
   Objects/arrays as keys are stringified. Anchors with duplicate keys throw exceptions.

## Supplementary Details
• Default schemas derive from YAML1.2 spec; JSON_SCHEMA/Core allow JSON notation variations (e.g. Null, NULL, binary integer prefixes).
• Use json:true to override duplicate-key errors by last-value-wins behavior.
• To skip unsupported types on dump (RegExp, Function), set skipInvalid:true.
• For compact YAML output (URL params), set condenseFlow:true and adjust flowLevel to 0.
• To force quoting of every non-key string, set forceQuotes:true and quotingType: '"'.
• Implement custom replacer analogous to JSON.stringify for transforming values.
• onWarning callback prototype: function warningHandler(warning: YAMLException) { /* log or collect warnings */ }
• Error stack trace for CLI: use --trace flag.


## Reference Details
### Method Signatures

```js
// Load single document
yaml.load(input: string, options?: {
  filename?: string|null,
  onWarning?: ((warning: YAMLException) => void)|null,
  schema?: Schema,
  json?: boolean
}): any

// Load multiple documents
yaml.loadAll(input: string, iterator?: (doc: any) => void, options?: {
  filename?: string|null,
  onWarning?: ((warning: YAMLException) => void)|null,
  schema?: Schema,
  json?: boolean
}): any[]

// Dump object to YAML string
yaml.dump(obj: any, options?: {
  indent?: number,
  noArrayIndent?: boolean,
  skipInvalid?: boolean,
  flowLevel?: number,
  styles?: Record<string,string>,
  schema?: Schema,
  sortKeys?: boolean|((a: string,b: string)=>number),
  lineWidth?: number,
  noRefs?: boolean,
  noCompatMode?: boolean,
  condenseFlow?: boolean,
  quotingType?: '"'|'\'',
  forceQuotes?: boolean,
  replacer?: (key: any, value: any) => any
}): string;
```

### Complete Code Examples

```js
const yaml = require('js-yaml');
const fs   = require('fs');

try {
  const content = fs.readFileSync('config.yml', 'utf8');
  const config = yaml.load(content, {
    filename: 'config.yml',
    onWarning: (warn) => console.warn('YAML Warning:', warn.message),
    schema: yaml.JSON_SCHEMA,
    json: true
  });
  console.log('Loaded config:', config);
} catch (e) {
  console.error('Failed to load YAML:', e.stack);
}

const obj = { name: 'test', items: [1,2,3], nested: { a: null } };
const yamlStr = yaml.dump(obj, {
  indent: 4,
  noArrayIndent: true,
  flowLevel: 1,
  styles: { '!!null': 'camelcase' },
  sortKeys: (a,b) => a.localeCompare(b),
  lineWidth: 120,
  noRefs: true,
  condenseFlow: true,
  quotingType: '"',
  forceQuotes: true
});
console.log(yamlStr);
```

### CLI Usage Patterns

- Inspect file with errors compact:
  js-yaml --compact settings.yml
- Full trace:
  js-yaml --trace settings.yml

### Configuration Options Effects

indent:
  Number of spaces per indent level in dump.
noArrayIndent:
  Prevent extra indent on sequence items.
skipInvalid:
  Omit pairs with unsupported types instead of throwing.
flowLevel:
  Threshold nesting level to switch to flow style.
sortKeys:
  Boolean or compare function to order keys in output.
condenseFlow:
  Remove spaces in flow collections for URL-friendly output.
quotingType:
  Define string quote style; affects non-printable fallback.
forceQuotes:
  Quote all strings regardless of content.
replacer:
  Transform values during serialization, signature like JSON.stringify.

### Best Practices

- Use SAFE_SCHEMA for untrusted input: yaml.load(str, { schema: yaml.FAILSAFE_SCHEMA })
- Always wrap load in try/catch and inspect YAMLException.message and marke
- Provide onWarning handler to capture non-fatal issues with custom tags
- For large objects, set noRefs:true to inline repeated structures

### Troubleshooting Procedures

1. Duplicate key error on load:
   - Enable json:true to override duplicates, or remove duplicates in source.
2. Unsupported type on dump:
   - Set skipInvalid:true or extend schema via js-yaml-js-types plugin.
3. Unexpected flow style:
   - Adjust flowLevel or set condenseFlow accordingly.
4. Error messages lacking context:
   - Pass filename option to include path in YAMLException.

### Commands and Expected Outputs

```bash
$ js-yaml config.yml
name: Example
list:
  - a
  - b

$ js-yaml --compact config.yml
YAMLException: duplicated mapping key at line 3, column 5:
    key: value
        ^

$ js-yaml --trace config.yml
YAMLException: duplicated mapping key
    at generateError (...)
    at loadDocuments (...)
    ...stack trace...
```

## Information Dense Extract
install: npm install js-yaml | import: const yaml = require('js-yaml')

load(input: string, {filename?:string|null= null, onWarning?:(YAMLException)=>void, schema?:Schema=DEFAULT_SCHEMA, json?:boolean=false}): any throws YAMLException

loadAll(input: string, iterator?:(any)=>void, opts?): any[]

dump(obj:any, {indent:number=2, noArrayIndent:boolean=false, skipInvalid:boolean=false, flowLevel:number=-1, styles:Record<tag,style>={}, schema:Schema=DEFAULT_SCHEMA, sortKeys:boolean|func=false, lineWidth:number=80, noRefs:boolean=false, noCompatMode:boolean=false, condenseFlow:boolean=false, quotingType:'"'|'\''='\'', forceQuotes:boolean=false, replacer?:(key,value)=>any}): string

schemas: FAILSAFE_SCHEMA | JSON_SCHEMA | CORE_SCHEMA | DEFAULT_SCHEMA

types: !!null,null; !!bool,boolean; !!int,number; !!float,number; !!binary,Buffer; !!timestamp,Date; !!omap,Array<[k,v]>; !!pairs,Array<[k,v]>; !!set,Object; !!str,string; !!seq,Array; !!map,Object

cli: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

best practices: use FAILSAFE_SCHEMA for untrusted; wrap load in try/catch; onWarning handler; skipInvalid for unsupported; flowLevel & condenseFlow for URL

troubleshoot: duplicate keys→json:true; skipInvalid→omit invalid; filename→context in errors; flags --compact/--trace for error verbosity

## Sanitised Extract
Table of Contents:
1. Installation
2. CLI Executable and Usage
3. Import Statement
4. API Methods
   4.1 load(string, options)
   4.2 loadAll(string, iterator, options)
   4.3 dump(object, options)
5. Method Options and Defaults
6. Supported Schemas
7. Supported YAML Types
8. Caveats

1. Installation
   npm install js-yaml

2. CLI Executable and Usage
   npm install -g js-yaml
   Usage: js-yaml [-h] [-v] [-c] [-t] file
   Flags:
     -h, --help     Show help
     -v, --version  Show version
     -c, --compact  Compact error output
     -t, --trace    Stack trace on error

3. Import Statement
   const yaml = require('js-yaml');
   const fs   = require('fs');

4. API Methods
  4.1 load(string, options)
    - Returns: Object|string|number|null|undefined
    - Throws: YAMLException
    - Options:
        filename: string|null (default null)
        onWarning: (YAMLException)  void (default null)
        schema: Schema (DEFAULT_SCHEMA)
        json: boolean (default false)
  4.2 loadAll(string, iterator, options)
    - Returns: any[] or applies iterator(doc)
    - Iterator signature: (doc: any)  void
    - Same options as load
  4.3 dump(object, options)
    - Returns: string
    - Options:
        indent: number = 2
        noArrayIndent: boolean = false
        skipInvalid: boolean = false
        flowLevel: number = -1
        styles: Record<string,string> = {}
        schema: Schema = DEFAULT_SCHEMA
        sortKeys: boolean|((a,b)=>number) = false
        lineWidth: number = 80
        noRefs: boolean = false
        noCompatMode: boolean = false
        condenseFlow: boolean = false
        quotingType: ' or ' = ''''
        forceQuotes: boolean = false
        replacer: (key,value) => any

5. Method Options and Defaults
   All options have defined defaults. Override per method call.

6. Supported Schemas
   FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA

7. Supported YAML Types
   !!null, !!bool, !!int, !!float, !!binary, !!timestamp,
   !!omap, !!pairs, !!set, !!str, !!seq, !!map

8. Caveats
   Objects/arrays as keys are stringified. Anchors with duplicate keys throw exceptions.

## Original Source
Configuration File and Environment Variables Libraries
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# Installation

YAML module for Node.js

    npm install js-yaml

# CLI Executable

Global install for CLI usage:

    npm install -g js-yaml

Usage:

    js-yaml [-h] [-v] [-c] [-t] file

Positional arguments:
  file           File with YAML document(s)

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
  -c, --compact  Display errors in compact mode
  -t, --trace    Show stack trace on error

# Import

    const yaml = require('js-yaml');
    const fs   = require('fs');

# Primary Methods

## load(string[, options])

Parses a single YAML document. Returns plain object, string, number, null, or undefined; throws YAMLException on error.

**Signature:**

    yaml.load(string, options?) → any | throws YAMLException

**Options:**

  • filename (string|null)       Default: null
  • onWarning (function|null)   Default: null
  • schema (Schema)             Default: DEFAULT_SCHEMA
  • json (boolean)              Default: false

**Schemas:**

  • FAILSAFE_SCHEMA
  • JSON_SCHEMA
  • CORE_SCHEMA
  • DEFAULT_SCHEMA

## loadAll(string[, iterator][, options])

Parses multi-document YAML. Returns array of documents or applies iterator to each document.

**Signature:**

    yaml.loadAll(string, iterator?, options?) → any[]

## dump(object[, options])

Serializes object to YAML string. Throws on invalid types unless skipInvalid=true.

**Signature:**

    yaml.dump(object, options?) → string

**Options:**

  • indent (number)             Default: 2
  • noArrayIndent (boolean)     Default: false
  • skipInvalid (boolean)       Default: false
  • flowLevel (number)          Default: -1
  • styles (Object)             Default: {}
  • schema (Schema)             Default: DEFAULT_SCHEMA
  • sortKeys (boolean|function) Default: false
  • lineWidth (number)          Default: 80
  • noRefs (boolean)            Default: false
  • noCompatMode (boolean)      Default: false
  • condenseFlow (boolean)      Default: false
  • quotingType (' or ")       Default: '
  • forceQuotes (boolean)       Default: false
  • replacer (function)         Default: undefined

# Supported Types

| Tag        | JavaScript Type                         |
|------------|-----------------------------------------|
| !!null     | null                                    |
| !!bool     | boolean                                 |
| !!int      | number                                  |
| !!float    | number                                  |
| !!binary   | Buffer                                  |
| !!timestamp| Date                                    |
| !!omap     | Array<[key,value]>                      |
| !!pairs    | Array<[key,value]>                      |
| !!set      | Object with null values                 |
| !!str      | string                                  |
| !!seq      | Array                                   |
| !!map      | Object                                  |

# JavaScript-specific Tags

Use https://github.com/nodeca/js-yaml-js-types for extra types (e.g., RegExp, Function).

# Caveats

• Objects or arrays as keys are stringified via toString().

• Implicit block mapping keys with anchors and aliases may produce duplicate-key exceptions.

# Retrieval Metadata

- Date Retrieved: 2024-06-05
- Data Size: 656477 bytes
- Links Found: 4956

## Attribution
- Source: Configuration File and Environment Variables Libraries
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT License
- Crawl Date: 2025-05-11T09:26:48.437Z
- Data Size: 656477 bytes
- Links Found: 4956

## Retrieved
2025-05-11
library/QUICKCHART_JS.md
# library/QUICKCHART_JS.md
# QUICKCHART_JS

## Crawl Summary
QuickChartJS exports QuickChart class with constructor(options?:{width:number;height:number;format:string;version:string;devicePixelRatio:number;backgroundColor:string}), methods setConfig(config:Object):QuickChart, getUrl(opts?):string, getShortUrl(opts?):Promise<string>, toBinary():Promise<Buffer>, toFile(path:string):Promise<void>. Default host quickchart.io. Supports API key for getShortUrl. Timeout default 15000ms. Chart config uses Chart.js v2 schema.

## Normalised Extract
Table of Contents:
1 Installation
2 QuickChart Class
3 Configuration Method
4 URL Generation
5 Short URL Generation
6 Binary and File Output
7 Authentication
8 Troubleshooting

1 Installation
  npm install quickchart-js@latest

2 QuickChart Class
  Constructor signature: QuickChart(options?:{
    width?:number, height?:number, format?:string, version?:string,
    devicePixelRatio?:number, backgroundColor?:string
  })
  Default options: width=500, height=300, format='png', version='2', devicePixelRatio=1, backgroundColor='transparent'

3 Configuration Method
  setConfig(config:Object):QuickChart
    Accepts Chart.js v2 config object

4 URL Generation
  getUrl(opts?:{
    width?:number, height?:number, format?:string,
    devicePixelRatio?:number, backgroundColor?:string, version?:string
  }):string
    Returns full URL to rendered chart. No network call.

5 Short URL Generation
  getShortUrl(opts?:{
    apiKey?:string, timeout?:number
  }):Promise<string>
    Default timeout:15000ms. Returns a Promise resolving to a shortened URL string.

6 Binary and File Output
  toBinary():Promise<Buffer>
    Fetches image data as Buffer
  toFile(path:string):Promise<void>
    Writes image to filesystem at specified path

7 Authentication
  Provide apiKey in getShortUrl opts. No auth needed for getUrl or toBinary/toFile.

8 Troubleshooting
  Increase timeout via getShortUrl({timeout:30000}) to avoid ETIMEDOUT errors


## Supplementary Details
Default Host and Protocol
  host: 'quickchart.io'
  protocol: 'https:'
  path: '/chart'
  port: 443

Default Chart Options
  width: 500
  height: 300
  format: 'png'
  version: '2'
  devicePixelRatio: 1
  backgroundColor: 'transparent'

Configuration Steps
  1 Import library or require
  2 Instantiate QuickChart with options
  3 setConfig with Chart.js schema object
  4 call getUrl/getShortUrl/toBinary/toFile

Error Handling
  - getShortUrl rejects with Error if status >=400
  - toBinary rejects on network or parsing errors
  - toFile rejects on FS write errors

Timeouts
  Default 15000ms, configurable per request


## Reference Details
QuickChart(options?:{
  width?:number,
  height?:number,
  format?:string,
  version?:string,
  devicePixelRatio?:number,
  backgroundColor?:string
}):QuickChart

Methods:
setConfig(config:Object):QuickChart
  config: Chart.js v2 configuration object

getUrl(opts?:{
  width?:number,
  height?:number,
  format?:string,
  devicePixelRatio?:number,
  backgroundColor?:string,
  version?:string
}):string
  Returns URL. No network call.

getShortUrl(opts?:{
  apiKey?:string,
  timeout?:number
}):Promise<string>
  apiKey: QuickChart API key string
  timeout: Request timeout in ms (default 15000)

toBinary():Promise<Buffer>
  Returns Promise resolving to image Buffer

toFile(path:string):Promise<void>
  path: Absolute or relative file path

Code Example:
const QuickChart = require('quickchart-js');
(async () => {
  const chart = new QuickChart({ width:600, height:400 });
  chart.setConfig({ type:'pie', data:{ labels:['A','B'], datasets:[{ data:[30,70] }] } });
  const url = chart.getUrl();
  const shortUrl = await chart.getShortUrl({ apiKey:'KEY123', timeout:20000 });
  const buffer = await chart.toBinary();
  await chart.toFile('./chart.png');
})();

Best Practices:
- Batch short URL requests to reduce latency
- Use toBinary for embedding images in buffers
- Set backgroundColor for transparent or white backgrounds
- Cache getUrl result to avoid repeated config parsing

Troubleshooting:
Error: ETIMEDOUT in getShortUrl
  Command: Increase timeout: getShortUrl({timeout:30000})

Error: HTTP 400 Bad Request
  Check Chart.js config validity against schema

Error: ENOENT writing file
  Ensure directory exists before calling toFile


## Information Dense Extract
QuickChartJS: constructor(opts{width?,height?,format?,version?,devicePixelRatio?,backgroundColor?}) defaults{500,300,'png','2',1,'transparent'}. setConfig(config:ChartjsV2Config):QuickChart. getUrl(opts{width?,height?,format?,devicePixelRatio?,backgroundColor?,version?}):string. getShortUrl(opts{apiKey?,timeout?=15000}):Promise<string>. toBinary():Promise<Buffer>. toFile(path:string):Promise<void>. host=https://quickchart.io/chart port=443. Auth only for shortUrl. Error handling via promise rejection. Troubleshoot ETIMEDOUT by raising timeout; HTTP 400 by validating config; ENOENT by ensuring path exists.

## Sanitised Extract
Table of Contents:
1 Installation
2 QuickChart Class
3 Configuration Method
4 URL Generation
5 Short URL Generation
6 Binary and File Output
7 Authentication
8 Troubleshooting

1 Installation
  npm install quickchart-js@latest

2 QuickChart Class
  Constructor signature: QuickChart(options?:{
    width?:number, height?:number, format?:string, version?:string,
    devicePixelRatio?:number, backgroundColor?:string
  })
  Default options: width=500, height=300, format='png', version='2', devicePixelRatio=1, backgroundColor='transparent'

3 Configuration Method
  setConfig(config:Object):QuickChart
    Accepts Chart.js v2 config object

4 URL Generation
  getUrl(opts?:{
    width?:number, height?:number, format?:string,
    devicePixelRatio?:number, backgroundColor?:string, version?:string
  }):string
    Returns full URL to rendered chart. No network call.

5 Short URL Generation
  getShortUrl(opts?:{
    apiKey?:string, timeout?:number
  }):Promise<string>
    Default timeout:15000ms. Returns a Promise resolving to a shortened URL string.

6 Binary and File Output
  toBinary():Promise<Buffer>
    Fetches image data as Buffer
  toFile(path:string):Promise<void>
    Writes image to filesystem at specified path

7 Authentication
  Provide apiKey in getShortUrl opts. No auth needed for getUrl or toBinary/toFile.

8 Troubleshooting
  Increase timeout via getShortUrl({timeout:30000}) to avoid ETIMEDOUT errors

## Original Source
quickchart-js Client Library
https://github.com/quickchart/quickchart-js

## Digest of QUICKCHART_JS

# QuickChart JS Client Library

## 1. Installation

  npm install quickchart-js@latest

## 2. Initialization

  const QuickChart = require('quickchart-js');
  const chart = new QuickChart({
    width: 500,
    height: 300,
    format: 'png',
    version: '2',
  });

## 3. Configuration

### 3.1 setConfig(config: Object): QuickChart

  chart.setConfig({
    type: 'bar',
    data: { labels: ['Q1','Q2'], datasets: [{ label: 'Sales', data: [50,75] }] },
    options: { scales: { y: { beginAtZero: true } } }
  });

## 4. Chart URL Generation

### 4.1 getUrl(opts?: { width?: number; height?: number; format?: string; devicePixelRatio?: number; backgroundColor?: string; version?: string; }): string

  const url = chart.getUrl({ width: 600, height: 400 });

## 5. Short URL Generation

### 5.1 getShortUrl(opts?: { apiKey?: string; timeout?: number; }): Promise<string>

  const shortUrl = await chart.getShortUrl({ apiKey: 'YOUR_KEY', timeout: 15000 });

## 6. Binary and File Output

### 6.1 toBinary(): Promise<Buffer>

  const imageBuffer = await chart.toBinary();

### 6.2 toFile(path: string): Promise<void>

  await chart.toFile('/tmp/chart.png');

## 7. Authentication & API Key

  chart.setConfig({ ... });
  chart.getShortUrl({ apiKey: 'ABC123' });

## 8. Troubleshooting

  // Increase timeout if getShortUrl times out
  chart.getShortUrl({ timeout: 30000 });

---

Retrieved: 2024-06-15
Source: quickchart/quickchart-js GitHub README
Data Size: 12 KB

## Attribution
- Source: quickchart-js Client Library
- URL: https://github.com/quickchart/quickchart-js
- License: MIT License
- Crawl Date: 2025-05-11T09:58:17.576Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-11
library/EXPRESS_CORS.md
# library/EXPRESS_CORS.md
# EXPRESS_CORS

## Crawl Summary
cors middleware installation via npm install cors; cors(options?) returns Express middleware function(req,res,next); global: app.use(cors()); per-route: app.get(path, cors(options), handler); options object with properties: origin Boolean|String|RegExp|Array|Function default '*'; methods String|Array default 'GET,HEAD,PUT,PATCH,POST,DELETE'; allowedHeaders String|Array default reflect request; exposedHeaders String|Array default none; credentials Boolean default false; maxAge Number default undefined; preflightContinue Boolean default false; optionsSuccessStatus Number default 204; dynamic origin via function(origin,callback); async config via function(req,callback) returning options; pre-flight via app.options; default config shown

## Normalised Extract
Table of Contents
1 Installation
2 Initialization
3 Global Middleware
4 Per-Route Middleware
5 Configuration Options
   5.1 origin
   5.2 methods
   5.3 allowedHeaders
   5.4 exposedHeaders
   5.5 credentials
   5.6 maxAge
   5.7 preflightContinue
   5.8 optionsSuccessStatus
6 Dynamic Origin
7 Async Configuration
8 Pre-Flight Handling

1 Installation
npm install cors

2 Initialization
var express = require('express')
var cors = require('cors')
var app = express()

3 Global Middleware
app.use(cors())

4 Per-Route Middleware
app.get('/products/:id', cors(), handler)

5 Configuration Options
5.1 origin
  Boolean true reflects request origin or false disables; String exact origin; RegExp pattern test; Array of String or RegExp; Function(origin,callback(err,allowedOrigin))
5.2 methods
  Comma-delimited string or Array of methods
5.3 allowedHeaders
  Comma-delimited string or Array; defaults to Access-Control-Request-Headers
5.4 exposedHeaders
  Comma-delimited string or Array; no default
5.5 credentials
  Boolean; if true sets Access-Control-Allow-Credentials
5.6 maxAge
  Integer; sets Access-Control-Max-Age
5.7 preflightContinue
  Boolean; if true passes preflight to next handler
5.8 optionsSuccessStatus
  Integer; status for successful OPTIONS responses

6 Dynamic Origin
origin option can be function(origin,callback) to load allowed origins from database

7 Async Configuration
cors accepts function(req,callback(err,options)) to compute options per request

8 Pre-Flight Handling
app.options('/path', cors()) for specific routes
app.options('*', cors()) globally


## Supplementary Details
Default configuration object
{
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

Implementation steps
1 Install cors package
2 Require cors in application
3 Use app.use(cors()) before other middlewares
4 For specific routes, call cors(options) inline
5 Configure dynamic origin by supplying origin function
6 Handle preflight using app.options

Key parameter effects
origin true reflects origin header; false disables CORS; String limits to that domain; RegExp matches origins; Array accepts multiple; Function custom logic
optionsSuccessStatus 200 needed for IE11 and SmartTVs


## Reference Details
Function Signature
cors(options?: Object|Function) => function(req: IncomingMessage, res: ServerResponse, next: Function)

Parameters
options.origin Boolean|String|RegExp|Array|Function default '*'
options.methods String|Array default ['GET','HEAD','PUT','PATCH','POST','DELETE']
options.allowedHeaders String|Array default request Access-Control-Request-Headers
options.exposedHeaders String|Array default []
options.credentials Boolean default false
options.maxAge Number default undefined
options.preflightContinue Boolean default false
options.optionsSuccessStatus Number default 204

Usage Examples
// Global
app.use(cors())

// Single route
app.get('/data', cors({ origin: 'http://example.com', optionsSuccessStatus: 200 }), handler)

// Dynamic origin
var corsOptions = { origin: function(origin, callback) { db.getAllowed(function(err,origins){ callback(err, origins) }) }}
app.get('/data', cors(corsOptions), handler)

// Async delegate
function corsDelegate(req, callback) { var allowed = allowlist.includes(req.header('Origin')); callback(null, { origin: allowed }) }
app.get('/data', cors(corsDelegate), handler)

// Preflight
app.options('/data', cors())

Best Practices
Place app.use(cors()) before static, body-parser and routes
Use optionsSuccessStatus 200 for legacy browsers
Limit origins to reduce security risk
Use dynamic origin loading from secure source

Troubleshooting
Issue: Missing CORS header on DELETE requests
Check that app.options('/path', cors()) is registered before app.del

Issue: IE11 preflight returns 204 leading to network error
Set optionsSuccessStatus to 200

Commands
curl -i -X OPTIONS -H 'Origin: http://example.com' http://localhost/data
Expect HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://example.com


## Information Dense Extract
npm install cors; require('cors'); app.use(cors()); app.get(path, cors(options), handler); options: origin[Boolean|String|RegExp|Array|Function]='*', methods[String|Array]='GET,HEAD,PUT,PATCH,POST,DELETE', allowedHeaders[String|Array]=reflect request, exposedHeaders[String|Array]=none, credentials[Boolean]=false, maxAge[Number]=undefined, preflightContinue[Boolean]=false, optionsSuccessStatus[Number]=204; dynamic origin via function(origin,callback); async via function(req,callback); preflight via app.options(path,cors()); signature returns middleware(req,res,next).

## Sanitised Extract
Table of Contents
1 Installation
2 Initialization
3 Global Middleware
4 Per-Route Middleware
5 Configuration Options
   5.1 origin
   5.2 methods
   5.3 allowedHeaders
   5.4 exposedHeaders
   5.5 credentials
   5.6 maxAge
   5.7 preflightContinue
   5.8 optionsSuccessStatus
6 Dynamic Origin
7 Async Configuration
8 Pre-Flight Handling

1 Installation
npm install cors

2 Initialization
var express = require('express')
var cors = require('cors')
var app = express()

3 Global Middleware
app.use(cors())

4 Per-Route Middleware
app.get('/products/:id', cors(), handler)

5 Configuration Options
5.1 origin
  Boolean true reflects request origin or false disables; String exact origin; RegExp pattern test; Array of String or RegExp; Function(origin,callback(err,allowedOrigin))
5.2 methods
  Comma-delimited string or Array of methods
5.3 allowedHeaders
  Comma-delimited string or Array; defaults to Access-Control-Request-Headers
5.4 exposedHeaders
  Comma-delimited string or Array; no default
5.5 credentials
  Boolean; if true sets Access-Control-Allow-Credentials
5.6 maxAge
  Integer; sets Access-Control-Max-Age
5.7 preflightContinue
  Boolean; if true passes preflight to next handler
5.8 optionsSuccessStatus
  Integer; status for successful OPTIONS responses

6 Dynamic Origin
origin option can be function(origin,callback) to load allowed origins from database

7 Async Configuration
cors accepts function(req,callback(err,options)) to compute options per request

8 Pre-Flight Handling
app.options('/path', cors()) for specific routes
app.options('*', cors()) globally

## Original Source
CORS Middleware for Express
https://github.com/expressjs/cors

## Digest of EXPRESS_CORS

# Installation

Install CORS middleware via npm:

```bash
npm install cors
```

# Usage

Require and apply middleware globally:

```javascript
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

Enable CORS on a single route:

```javascript
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})
```

# Configuration Options

All options are properties of an options object passed to cors(options).

- origin  Default '*'  Type: Boolean|String|RegExp|Array|Function
- methods  Default 'GET,HEAD,PUT,PATCH,POST,DELETE'  Type: String|Array
- allowedHeaders  Default reflect request's Access-Control-Request-Headers  Type: String|Array
- exposedHeaders  Default none  Type: String|Array
- credentials  Default false  Type: Boolean
- maxAge  Default undefined  Type: Number
- preflightContinue  Default false  Type: Boolean
- optionsSuccessStatus  Default 204  Type: Number

# Dynamic Origin

Provide origin as a function(origin, callback) to load allowed origins at runtime.

# Async Configuration

Use a delegate function corsOptionsDelegate(req, callback) that returns error and options.

# Pre-Flight Handling

Enable pre-flight for specific routes:

```javascript
app.options('/products/:id', cors())
app.del('/products/:id', cors(), handler)
```

Or enable globally before routes:

```javascript
app.options('*', cors())
```

## Attribution
- Source: CORS Middleware for Express
- URL: https://github.com/expressjs/cors
- License: MIT License
- Crawl Date: 2025-05-11T03:40:35.328Z
- Data Size: 917679 bytes
- Links Found: 5739

## Retrieved
2025-05-11
library/EXPRESS_API.md
# library/EXPRESS_API.md
# EXPRESS_API

## Crawl Summary
express.json: parses JSON bodies; options inflate:boolean=true, limit:100kb, reviver:null, strict:true, type:application/json, verify:undefined; populates req.body. express.urlencoded: parses URL-encoded; options extended:true, inflate:true, limit:100kb, parameterLimit:1000, type:application/x-www-form-urlencoded, verify:undefined; req.body as object. express.static: serves static files; options dotfiles:undefined, etag:true, extensions:false, fallthrough:true, immutable:false, index:"index.html", lastModified:true, maxAge:0, redirect:true, setHeaders:Function; calls next() on missing. express.Router: create router; options caseSensitive:false, mergeParams:false, strict:false; use router.METHOD and middleware.

## Normalised Extract
Table of Contents

1. JSON Body Parser
2. URL-Encoded Body Parser
3. Static File Server
4. Router Creation

1. JSON Body Parser

Use express.json([options]) to parse application/json requests. Import:
var express = require('express')
var app = express()
app.use(express.json({limit:'100kb', strict:true}))

Options:
inflate       (Boolean) defaults to true; handles compressed bodies
limit         (String|Number) defaults to '100kb'; max request size
reviver       (Function) defaults to null; passed to JSON.parse
strict        (Boolean) defaults to true; only accepts objects and arrays
type          (String|Array|Function) defaults to 'application/json'
verify        (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
On match, sets req.body to parsed object or {}. Throws error on invalid JSON.

2. URL-Encoded Body Parser

Use express.urlencoded([options]) for application/x-www-form-urlencoded. Example:
app.use(express.urlencoded({extended:false, limit:'50kb'}))

Options:
extended        (Boolean) defaults to true; false uses querystring, true uses qs
inflate         (Boolean) defaults to true; handle compressed bodies
limit           (String|Number) defaults to '100kb'; max body size
parameterLimit  (Number) defaults to 1000; max parameters
type            (String|Array|Function) defaults to 'application/x-www-form-urlencoded'
verify          (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
Populates req.body with key-value pairs or arrays.

3. Static File Server

Use express.static(root, [options]) to serve static assets. Example:
app.use(express.static('public', {maxAge:'7d', immutable:true}))

Options:
dotfiles      (String) default undefined; 'allow', 'deny', 'ignore'
etag          (Boolean) default true; sends weak ETags
extensions    (Array|false) default false; fallback extensions
fallthrough   (Boolean) default true; next() on client errors
immutable     (Boolean) default false; Cache-Control immutable directive
index         (String|false) default 'index.html'; directory index file
lastModified  (Boolean) default true; set Last-Modified header
maxAge        (Number|String) default 0; Cache-Control max-age
redirect      (Boolean) default true; redirect to trailing '/'
setHeaders    (Function) default undefined; fn(res,path,stat)

Effect:
Serves files, calls next() if not found. Use reverse proxy for caching.

4. Router Creation

Use express.Router([options]) to create a router. Import:
var router = express.Router({mergeParams:true})
app.use('/items', router)

Options:
caseSensitive  (Boolean) default false; treat '/Foo' vs '/foo'
mergeParams    (Boolean) default false; preserve parent req.params
strict         (Boolean) default false; treat '/foo' vs '/foo/'

Effect:
Create modular route handlers: router.get, router.post, router.use.


## Supplementary Details
Implementation Steps:
1. Install Express: npm install express
2. Require express: const express = require('express')
3. Create app: const app = express()
4. Apply body parsers before routes:
   app.use(express.json({limit:'200kb'}))
   app.use(express.urlencoded({extended:true, parameterLimit:5000}))
5. Serve static files:
   app.use('/static', express.static(path.join(__dirname,'public'), {
     dotfiles:'ignore', etag:false, extensions:['htm','html'], index:false,
     maxAge:86400000, immutable:true,
     setHeaders: function(res, path, stat) { res.set('X-Timestamp', Date.now()) }
   }))
6. Create routers for modularization:
   const router = express.Router({caseSensitive:true, strict:true})
   router.get('/', (req,res)=>{res.send('OK')})
   app.use('/admin', router)

Core Configurations:
Node.js >=0.10 is required.
Order matters: body parsers must precede routes accessing req.body.
Use express.Router for sub-app isolation and parameter merging.


## Reference Details
TypeScript Definitions:
interface JSONOptions {
  inflate?: boolean;
  limit?: number | string;
  reviver?: (this: any, key: string, value: any) => any;
  strict?: boolean;
  type?: string | string[] | ((req: express.Request) => boolean);
  verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
}
interface URLEncodedOptions {
  extended?: boolean;
  inflate?: boolean;
  limit?: number | string;
  parameterLimit?: number;
  type?: string | string[] | ((req: express.Request) => boolean);
  verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
}
interface StaticOptions {
  dotfiles?: 'allow' | 'deny' | 'ignore';
  etag?: boolean;
  extensions?: string[] | false;
  fallthrough?: boolean;
  immutable?: boolean;
  index?: string | false;
  lastModified?: boolean;
  maxAge?: number | string;
  redirect?: boolean;
  setHeaders?: (res: express.Response, path: string, stat: fs.Stats) => void;
}

express.json(options?: JSONOptions): express.RequestHandler
express.urlencoded(options?: URLEncodedOptions): express.RequestHandler
express.static(root: string, options?: StaticOptions): express.RequestHandler
express.Router(options?: {caseSensitive?: boolean; mergeParams?: boolean; strict?: boolean}): express.Router

Usage Examples:
app.use(express.json());
app.post('/data', (req,res) => { res.json(req.body); });

Best Practices:
Validate req.body shape: if (typeof req.body.foo !== 'string') return res.status(400).send('Invalid');
Limit body size to mitigate DoS: express.json({limit:'10kb'}).
Escape HTML in JSON responses: app.set('json escape', true).

Troubleshooting:
Command:
curl -X POST http://localhost:3000/data -H 'Content-Type: application/json' -d @large.json
Expected on limit exceed: HTTP 413 Payload Too Large
Resolution: increase limit setting.

Check static file serving:
curl http://localhost:3000/static/image.png -I
Expected header: Cache-Control: max-age=0
Change maxAge to alter caching.


## Information Dense Extract
express.json([options]) parses JSON: inflate=true, limit=100kb, strict=true, type='application/json', reviver=null, verify undefined; populates req.body or {}. express.urlencoded([opts]) parses URL-encoded: extended=true, inflate=true, limit=100kb, parameterLimit=1000, type='application/x-www-form-urlencoded', verify undefined; req.body key-value pairs. express.static(root, [opts]) serves files: dotfiles undefined, etag=true, extensions false, fallthrough=true, immutable=false, index='index.html', lastModified=true, maxAge=0, redirect=true, setHeaders undefined; next() on miss. express.Router([opts]) creates router: caseSensitive=false, mergeParams=false, strict=false; use router.METHOD and router.use. Ensure Node>=0.10, apply body parsers before routes, validate req.body, set json escape, adjust limits, test with curl.

## Sanitised Extract
Table of Contents

1. JSON Body Parser
2. URL-Encoded Body Parser
3. Static File Server
4. Router Creation

1. JSON Body Parser

Use express.json([options]) to parse application/json requests. Import:
var express = require('express')
var app = express()
app.use(express.json({limit:'100kb', strict:true}))

Options:
inflate       (Boolean) defaults to true; handles compressed bodies
limit         (String|Number) defaults to '100kb'; max request size
reviver       (Function) defaults to null; passed to JSON.parse
strict        (Boolean) defaults to true; only accepts objects and arrays
type          (String|Array|Function) defaults to 'application/json'
verify        (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
On match, sets req.body to parsed object or {}. Throws error on invalid JSON.

2. URL-Encoded Body Parser

Use express.urlencoded([options]) for application/x-www-form-urlencoded. Example:
app.use(express.urlencoded({extended:false, limit:'50kb'}))

Options:
extended        (Boolean) defaults to true; false uses querystring, true uses qs
inflate         (Boolean) defaults to true; handle compressed bodies
limit           (String|Number) defaults to '100kb'; max body size
parameterLimit  (Number) defaults to 1000; max parameters
type            (String|Array|Function) defaults to 'application/x-www-form-urlencoded'
verify          (Function) defaults to undefined; called as verify(req,res,buf,encoding)

Effect:
Populates req.body with key-value pairs or arrays.

3. Static File Server

Use express.static(root, [options]) to serve static assets. Example:
app.use(express.static('public', {maxAge:'7d', immutable:true}))

Options:
dotfiles      (String) default undefined; 'allow', 'deny', 'ignore'
etag          (Boolean) default true; sends weak ETags
extensions    (Array|false) default false; fallback extensions
fallthrough   (Boolean) default true; next() on client errors
immutable     (Boolean) default false; Cache-Control immutable directive
index         (String|false) default 'index.html'; directory index file
lastModified  (Boolean) default true; set Last-Modified header
maxAge        (Number|String) default 0; Cache-Control max-age
redirect      (Boolean) default true; redirect to trailing '/'
setHeaders    (Function) default undefined; fn(res,path,stat)

Effect:
Serves files, calls next() if not found. Use reverse proxy for caching.

4. Router Creation

Use express.Router([options]) to create a router. Import:
var router = express.Router({mergeParams:true})
app.use('/items', router)

Options:
caseSensitive  (Boolean) default false; treat '/Foo' vs '/foo'
mergeParams    (Boolean) default false; preserve parent req.params
strict         (Boolean) default false; treat '/foo' vs '/foo/'

Effect:
Create modular route handlers: router.get, router.post, router.use.

## Original Source
Express.js Documentation
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_API

# express.json([options])

This middleware is available in Express v4.16.0 onwards.

Parses incoming requests with JSON payloads. Based on body-parser.

Signature

express.json([options])

Options table

Property      Type      Default           Description
inflate       Boolean   true              enable handling deflated bodies
limit         Mixed     "100kb"          max request body size (bytes or string)
reviver       Function  null              passed to JSON.parse as second arg
strict        Boolean   true              only accept arrays and objects
type          Mixed     "application/json" media type(s) to parse
verify        Function  undefined         verify(req,res,buf,encoding)

Behavior

On match, populates req.body with parsed object or {}. Throws on parse errors. Supports gzip and deflate.

# express.urlencoded([options])

This middleware is available in Express v4.16.0 onwards.

Parses URL-encoded payloads. Based on body-parser.

Signature

express.urlencoded([options])

Options table

Property        Type      Default                Description
extended        Boolean   true                   true: use qs for rich objects; false: querystring
inflate         Boolean   true                   enable handling deflated bodies
limit           Mixed     "100kb"               max request body size
parameterLimit  Number    1000                   max number of parameters
type            Mixed     "application/x-www-form-urlencoded" media type(s) to parse
verify          Function  undefined              verify(req,res,buf,encoding)

Behavior

Populates req.body with an object. Supports gzip and deflate. Extended controls value types.

# express.static(root, [options])

Built-in middleware for serving static files. Based on serve-static.

Signature

express.static(root, [options])

Arguments

root    String  directory to serve
options Object  see table

Options table

Property      Type      Default          Description
dotfiles      String    undefined        allow|deny|ignore handling of dotfiles
etag          Boolean   true             enable weak ETag generation
extensions    Mixed     false            ['ext','...'] file extension fallbacks
fallthrough   Boolean   true             next() on client errors
immutable     Boolean   false            enable Cache-Control immutable
index         Mixed     "index.html"    directory index file or false
type          Mixed     undefined        see dotfiles handling
lastModified  Boolean   true             set Last-Modified header
maxAge        Number    0                Cache-Control max-age in ms
redirect      Boolean   true             add trailing slash redirect
setHeaders    Function  undefined        fn(res,path,stat) to set headers

Behavior

Serves files by combining req.url with root. On missing file calls next().

# express.Router([options])

Creates modular mountable route handlers.

Signature

express.Router([options])

Options table

Property       Type     Default  Availability
caseSensitive  Boolean  false    all versions
mergeParams    Boolean  false    4.5.0+
strict         Boolean  false    all versions

Behavior

Use router.METHOD(...) and router.use(...) to attach middleware or routes.

Retrieved 2024-06-17
Data Size: 18301639 bytes

## Attribution
- Source: Express.js Documentation
- URL: https://expressjs.com/en/4x/api.html
- License: MIT License
- Crawl Date: 2025-05-11T06:58:11.039Z
- Data Size: 18301639 bytes
- Links Found: 17680

## Retrieved
2025-05-11
library/EXPRESS_GRAPHQL.md
# library/EXPRESS_GRAPHQL.md
# EXPRESS_GRAPHQL

## Crawl Summary
graphqlHTTP(options) returns an Express middleware handling GraphQL over HTTP GET and POST. Options.schema must be a GraphQLSchema. Optional options include rootValue, context, graphiql (false by default), pretty (false), validationRules array, customFormatErrorFn(error) handler, fieldResolver resolver function, and extensions hook. Supports standard query parameters: query, variables (JSON), operationName, raw.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Middleware Setup
 3 Options Interface
 4 GraphQL over HTTP Parameters
 5 GraphiQL Integration
 6 Error Handling

1 Installation
  npm install express-graphql graphql express

2 Middleware Setup
  const app = express()
  app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql }))

3 Options Interface
  schema: GraphQLSchema (required)
  rootValue: any container for resolvers
  context: any passed to resolvers
  graphiql: boolean enable IDE (default false)
  pretty: boolean enable pretty JSON (default false)
  validationRules: ValidationRule[] override rules
  customFormatErrorFn: (error) => formatted error object
  fieldResolver: (source, args, context, info) => resolved value
  extensions: (info) => additional response extensions

4 GraphQL over HTTP Parameters
  HTTP Methods: GET, POST
  query: GraphQL query string
  variables: JSON object of variables
  operationName: name of operation to execute
  raw: boolean if raw result without formatting

5 GraphiQL Integration
  Enable only in development
  graphiql option accepts boolean
  Defaults: endpoint URL '/graphql'

6 Error Handling
  Missing schema throws Error 'Must provide schema'
  malformed JSON body returns 400 with error message


## Supplementary Details
Default values:
  graphiql: false
  pretty: false
  validationRules: GraphQL specified rules from graphql/validation
  context: {} if not provided
Middleware ordering:
  Place bodyParser.json() before graphqlHTTP to parse POST bodies

Environment-based GraphiQL:
  const dev = process.env.NODE_ENV !== 'production'
  app.use('/graphql', graphqlHTTP({ schema, graphiql: dev }))

Integration steps:
  1 Import express, graphqlHTTP, buildSchema
  2 Define GraphQL schema string
  3 Build schema with buildSchema
  4 Define rootValue with resolver functions
  5 Apply middleware to Express route
  6 Start server on chosen port


## Reference Details
API Specification:
  Function: graphqlHTTP
    Signature: (options: Options | () => Options) => (req: Request, res: Response, next: NextFunction) => void
  Type Options:
    schema                   GraphQLSchema (must implement GraphQLSchema)
    rootValue?               any
    context?                 any
    graphiql?                boolean default: false
    pretty?                  boolean default: false
    validationRules?         ValidationRule[] default: [specified rules]
    customFormatErrorFn?     (error: GraphQLError) => any
    fieldResolver?           GraphQLFieldResolver<any, any>
    extensions?              (info: { document: DocumentNode, variables: Record<string, any>, operationName: string, result: ExecutionResult }) => Record<string, any>

Code Example:
import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
const schema = buildSchema('type Query{hello:String}')
const root = { hello: () => 'Hello!' }
const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  context: { user: req.user },
  graphiql: true,
  validationRules: [],
  customFormatErrorFn: (err) => ({ message: err.message, locations: err.locations }),
  extensions: ({ result }) => ({ runTime: Date.now() - startTime }),
}))
app.listen(4000, () => console.log('Server running'))

Implementation Patterns:
  Use environment variable for GraphiQL flag
  Use middleware chaining: bodyParser.json(), graphqlHTTP()
  Pass context per request by supplying a function thunk returning options

Configuration Options:
  graphiql true enables IDE at endpoint
  pretty true formats JSON output with indentation
  customFormatErrorFn allows masking stack trace

Best Practices:
  Restrict graphiql to non-production
  Pre-compile schema in build step
  Supply context for authentication

Troubleshooting Procedures:
  Command: curl -X POST -H 'Content-Type: application/json' --data '{"query":"{hello}"}' http://localhost:4000/graphql
    Expected: {"data":{"hello":"Hello"}}
  Error 'Must provide schema': Ensure options.schema is set
  400 on invalid JSON: Check body-parser placement


## Information Dense Extract
graphqlHTTP(options) returns Express middleware. Options.schema: GraphQLSchema. Optional: rootValue, context, graphiql=false, pretty=false, validationRules: ValidationRule[], customFormatErrorFn(error)->any, fieldResolver(source,args,context,info)->any, extensions({document,variables,operationName,result})->object. Middleware requires bodyParser.json() ahead. HTTP GET/POST params: query(String), variables(JSON), operationName(String), raw(Boolean). Enable graphiql only in dev. Use curl -X POST -H 'Content-Type: application/json' --data '{"query":"..."}' to test. Error 'Must provide schema' if schema missing. Validate requests with customFormatErrorFn and validationRules overrides. Context injection via options thunk: graphqlHTTP(() => ({schema, context: {user}})).

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Middleware Setup
 3 Options Interface
 4 GraphQL over HTTP Parameters
 5 GraphiQL Integration
 6 Error Handling

1 Installation
  npm install express-graphql graphql express

2 Middleware Setup
  const app = express()
  app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql }))

3 Options Interface
  schema: GraphQLSchema (required)
  rootValue: any container for resolvers
  context: any passed to resolvers
  graphiql: boolean enable IDE (default false)
  pretty: boolean enable pretty JSON (default false)
  validationRules: ValidationRule[] override rules
  customFormatErrorFn: (error) => formatted error object
  fieldResolver: (source, args, context, info) => resolved value
  extensions: (info) => additional response extensions

4 GraphQL over HTTP Parameters
  HTTP Methods: GET, POST
  query: GraphQL query string
  variables: JSON object of variables
  operationName: name of operation to execute
  raw: boolean if raw result without formatting

5 GraphiQL Integration
  Enable only in development
  graphiql option accepts boolean
  Defaults: endpoint URL '/graphql'

6 Error Handling
  Missing schema throws Error 'Must provide schema'
  malformed JSON body returns 400 with error message

## Original Source
GraphQL API Documentation
https://github.com/graphql/express-graphql

## Digest of EXPRESS_GRAPHQL

# express-graphql Middleware

express-graphql exports a single function graphqlHTTP

# Method Signature

graphqlHTTP(options: Options | () => Options) => RequestHandler

# Options Interface

Options:
  schema                  GraphQLSchema (required)
  rootValue               any
  context                 any
  graphiql                boolean (default false)
  pretty                  boolean (default false)
  validationRules         ValidationRule[]
  customFormatErrorFn     (error: GraphQLError) => any
  fieldResolver           GraphQLFieldResolver<any, any>
  extensions              (info: ExtensionInfo) => Record<string, any)

# Usage Example

import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(
  'type Query { hello: String }'
)
const root = { hello: () => 'Hello world!' }

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({ schema, rootValue: root, graphiql: true })
)
app.listen(4000)

# GraphQL over HTTP Details

Supports GET and POST
Query parameters:
  query         GraphQL query string
  variables     JSON object
  operationName string
  raw           boolean

# Retrieval

Content retrieved on 2024-06-20

## Attribution
- Source: GraphQL API Documentation
- URL: https://github.com/graphql/express-graphql
- License: CC0 1.0 Universal / MIT License
- Crawl Date: 2025-05-11T07:58:32.270Z
- Data Size: 552486 bytes
- Links Found: 4716

## Retrieved
2025-05-11
library/CLI_PROGRESS.md
# library/CLI_PROGRESS.md
# CLI_PROGRESS

## Crawl Summary
CLI-PROGRESS v3.9.1 exports SingleBar and MultiBar classes with Presets. SingleBar constructed via new SingleBar(options, preset) accepts SingleBarOptions (format, barCompleteChar, barIncompleteChar, hideCursor, stopOnComplete, fps, barsize, stream). Methods: start(total, startValue, payload), update(value, payload), increment(step, payload), stop(), lastDraw(), render(). MultiBar via new MultiBar(options, preset) plus create(total, startValue, payload, options), stop(), stopAll(). Default options: format '{bar} {percentage}%', completeChar '=', incompleteChar '-', hideCursor true, stopOnComplete true, fps 10, barsize 40, stream stderr. Templates in Presets.shades_classic and shades_grey.

## Normalised Extract
Table of Contents
1 Installation
2 Import and Presets
3 SingleBar Class
4 MultiBar Class
5 Configuration Options
6 Methods
7 Examples

1 Installation
npm install cli-progress@3.9.1

2 Import and Presets
const { SingleBar, MultiBar, Presets } = require('cli-progress');
Presets.shades_classic, Presets.shades_grey

3 SingleBar Class
Constructor: new SingleBar(options?: SingleBarOptions, preset?: Preset)

4 MultiBar Class
Constructor: new MultiBar(options?: SingleBarOptions, preset?: Preset)

5 Configuration Options (SingleBarOptions)
format: string                // e.g. 'progress | {bar} | {percentage}% | ETA: {eta}s'
barCompleteChar: string        // default '='
barIncompleteChar: string      // default '-'
hideCursor: boolean            // default true
stopOnComplete: boolean        // default true
fps: number                    // default 10
barsize: number                // default 40
stream: NodeJS.WritableStream  // default process.stderr
clearOnComplete: boolean       // MultiBar default false

6 Methods
SingleBar:start(total: number, startValue?: number, payload?: Object): void
SingleBar:update(value: number, payload?: Object): void
SingleBar:increment(step?: number, payload?: Object): void
SingleBar:stop(): void
SingleBar:lastDraw(): Record<string, any>
SingleBar:render(): void
MultiBar:create(total: number, startValue?: number, payload?: Object, options?: SingleBarOptions): SingleBar
MultiBar:stop(): void
MultiBar:stopAll(): void

7 Examples
SingleBar usage: instantiate with options and preset, call start, update/increment in loop, stop when done.
MultiBar usage: instantiate Multibar, create individual bars with create, control each bar independently, stop all at end.

## Supplementary Details
Default Option Values
format: '{bar} {percentage}%'
barCompleteChar: '='
barIncompleteChar: '-'
hideCursor: true
stopOnComplete: true
fps: 10
barsize: 40
stream: process.stderr
clearOnComplete (MultiBar): false

Implementation Steps
1 Install module
2 Import SingleBar, MultiBar, Presets
3 Instantiate bar(s) with desired options and preset
4 Call start(total, startValue)
5 In work loop call update(value) or increment(step)
6 On completion call stop() or multibar.stopAll()

Core Functionality
- Payload parameter merges into format tokens
- lastDraw() returns object {value, total, eta, ...}
- render() forces immediate draw

Error Handling
- Ensure hideCursor false if bar not stopped to restore cursor
- Use clearOnComplete false to preserve final bar on screen

## Reference Details
Module Exports:
- function new SingleBar(options?: SingleBarOptions, preset?: Preset): SingleBar
- function new MultiBar(options?: SingleBarOptions, preset?: Preset): MultiBar
- object Presets { shades_classic, shades_grey }

SingleBarOptions Interface:
interface SingleBarOptions {
  format?: string;
  barCompleteChar?: string;
  barIncompleteChar?: string;
  hideCursor?: boolean;
  stopOnComplete?: boolean;
  fps?: number;
  barsize?: number;
  stream?: NodeJS.WritableStream;
  clearOnComplete?: boolean;
}

SingleBar Methods:
start(total: number, startValue?: number, payload?: Record<string, any>): void
update(value: number, payload?: Record<string, any>): void
increment(step?: number, payload?: Record<string, any>): void
stop(): void
lastDraw(): { value: number; total: number; eta: number; percentage: number; [key: string]: any }
render(): void

MultiBar Methods:
create(total: number, startValue?: number, payload?: Record<string, any>, options?: SingleBarOptions): SingleBar
stop(): void
stopAll(): void

Best Practices:
- Use stopOnComplete: false to chain animations
- Set hideCursor: false during debug to avoid lost cursor position
- Use process.stderr for logging parallel to stdout output
- Encapsulate bar logic in try/finally to ensure stop()

Troubleshooting:
Issue: bar hangs in CI
  Command: export CI=true && node script.js
  Solution: set clearOnComplete: true or disable hideCursor

Issue: malformed format
  Symptom: format tokens not replaced
  Fix: ensure payload keys match tokens

Issue: performance drop
  Check fps and barsize, reduce fps or barsize to optimize

Commands:
node --version
npm list cli-progress


## Information Dense Extract
SingleBar(options, preset) options:format:string,barCompleteChar:string='=',barIncompleteChar:string='-',hideCursor:boolean=true,stopOnComplete:boolean=true,fps:number=10,barsize:number=40,stream:WritableStream=stderr,clearOnComplete:boolean=false. Methods:start(total:number,startValue?:number,payload?:object):void;update(value:number,payload?:object):void;increment(step?:number,payload?:object):void;stop():void;lastDraw():{value, total, eta, percentage, ...};render():void. MultiBar(options,preset).create(total, startValue?, payload?, options?):SingleBar;stop():void;stopAll():void. Presets:shades_classic,shades_grey. Example: const bar=new SingleBar({format:'{bar} {percentage}%',hideCursor:false},Presets.shades_classic);bar.start(100,0);bar.increment();bar.stop().

## Sanitised Extract
Table of Contents
1 Installation
2 Import and Presets
3 SingleBar Class
4 MultiBar Class
5 Configuration Options
6 Methods
7 Examples

1 Installation
npm install cli-progress@3.9.1

2 Import and Presets
const { SingleBar, MultiBar, Presets } = require('cli-progress');
Presets.shades_classic, Presets.shades_grey

3 SingleBar Class
Constructor: new SingleBar(options?: SingleBarOptions, preset?: Preset)

4 MultiBar Class
Constructor: new MultiBar(options?: SingleBarOptions, preset?: Preset)

5 Configuration Options (SingleBarOptions)
format: string                // e.g. 'progress | {bar} | {percentage}% | ETA: {eta}s'
barCompleteChar: string        // default '='
barIncompleteChar: string      // default '-'
hideCursor: boolean            // default true
stopOnComplete: boolean        // default true
fps: number                    // default 10
barsize: number                // default 40
stream: NodeJS.WritableStream  // default process.stderr
clearOnComplete: boolean       // MultiBar default false

6 Methods
SingleBar:start(total: number, startValue?: number, payload?: Object): void
SingleBar:update(value: number, payload?: Object): void
SingleBar:increment(step?: number, payload?: Object): void
SingleBar:stop(): void
SingleBar:lastDraw(): Record<string, any>
SingleBar:render(): void
MultiBar:create(total: number, startValue?: number, payload?: Object, options?: SingleBarOptions): SingleBar
MultiBar:stop(): void
MultiBar:stopAll(): void

7 Examples
SingleBar usage: instantiate with options and preset, call start, update/increment in loop, stop when done.
MultiBar usage: instantiate Multibar, create individual bars with create, control each bar independently, stop all at end.

## Original Source
cli-progress
https://github.com/streamich/cli-progress#readme

## Digest of CLI_PROGRESS

# CLI-PROGRESS README (Retrieved: 2024-06-05)

# Installation

npm install cli-progress@3.9.1

# Import and Presets

```js
const { SingleBar, MultiBar, Presets } = require('cli-progress');
``` 
- Presets.shades_classic
- Presets.shades_grey

# SingleBar Class

## Constructor

```ts
new SingleBar(options?: SingleBarOptions, preset?: Preset);
```

### SingleBarOptions

- format: string                          // e.g. 'progress | {bar} | {percentage}% | ETA: {eta}s'
- barCompleteChar: string                // default '='
- barIncompleteChar: string              // default '-'
- hideCursor: boolean                    // default true
- stopOnComplete: boolean                // default true
- fps: number                            // default 10
- barsize: number                        // default 40
- stream: NodeJS.WritableStream          // default process.stderr

## Methods

```ts
start(total: number, startValue?: number, payload?: Object): void
update(value: number, payload?: Object): void
increment(step?: number, payload?: Object): void
stop(): void
lastDraw(): Record<string, any>
render(): void
``` 

# MultiBar Class

## Constructor

```ts
new MultiBar(options?: SingleBarOptions, preset?: Preset);
``` 

## Methods

```ts
create(total: number, startValue?: number, payload?: Object, options?: SingleBarOptions): SingleBar
stop(): void
stopAll(): void
``` 

# Examples

### Single Progress
```js
const bar = new SingleBar({ format: ' {bar} {percentage}% | ETA: {eta}s', hideCursor: false }, Presets.shades_classic);
bar.start(200, 0);
let value = 0;
const timer = setInterval(() => {
  value++;
  bar.update(value);
  if (value >= 200) {
    clearInterval(timer);
    bar.stop();
  }
}, 20);
```

### Multi Progress
```js
const multibar = new MultiBar({ clearOnComplete: false, hideCursor: true }, Presets.shades_grey);
const task1 = multibar.create(100, 0, { task: 'Download' });
const task2 = multibar.create(200, 0, { task: 'Upload' });

task1.start(100, 0);
task2.start(200, 0);

// increment tasks independently
multibar.on('stop', () => multibar.stop());
```

## Attribution
- Source: cli-progress
- URL: https://github.com/streamich/cli-progress#readme
- License: MIT License
- Crawl Date: 2025-05-11T08:35:14.819Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-11
library/ZOD_CORE.md
# library/ZOD_CORE.md
# ZOD_CORE

## Crawl Summary
Installation requirements: TypeScript 4.5+, strict mode in tsconfig. Install zod via npm, yarn, pnpm, bun. Import z from 'zod'. Core schema types: string, number, bigint, boolean, date, literal. Methods: min, max, email, url, regex, int, positive, nonnegative. Coercion via z.coerce. Object: shape, extend, merge, pick, omit, partial, required, strict, passthrough, catchall. Array: min, max, nonempty, element. Tuple: fixed length, rest. Unions: union, or, discriminatedUnion. Intersection: and, merge. Refinements: refine, superRefine, transform, preprocess. Parsing: parse, safeParse, parseAsync, safeParseAsync. Type inference via z.infer.

## Normalised Extract
Table of Contents
1 Installation
2 Basic Usage
3 Primitives
4 Objects
5 Arrays & Tuples
6 Unions & Intersections
7 Refinements & Transforms
8 Parsing Methods

1 Installation
TypeScript >=4.5 with strict:true in tsconfig
npm install zod

2 Basic Usage
import { z } from "zod"

3 Primitives
z.string()
  .min( length, { message } )
  .max( length, { message } )
  .email( { message } )

z.number()
  .min( value, { message } )
  .max( value, { message } )
  .int()
  .positive()

z.boolean()
z.bigint()
z.date()

Coercion: z.coerce.string(), z.coerce.number(), z.coerce.date(), z.coerce.boolean(), z.coerce.bigint()

4 Objects
z.object({ key: schema, ... })
  .extend({ newKey: schema })
  .merge( otherObject )
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key:true })
  .required({ key:true })
  .strict()
  .passthrough()
  .catchall( schema )

5 Arrays & Tuples
z.array( schema )
  .min( count, { message } )
  .max( count, { message } )
  .nonempty({ message })

z.tuple( [ schema1, schema2, ... ] )
  .rest( schema )

6 Unions & Intersections
z.union( [ schemaA, schemaB ] )
schemaA.or( schemaB )

z.discriminatedUnion( "key", [objA, objB] )
z.intersection( schemaA, schemaB )

7 Refinements & Transforms
schema.refine( fn(data)=>boolean, { message } )
schema.superRefine( (data, ctx)=>void )
schema.transform( fn(data)=>U )
schema.preprocess( fn(input)=>any, schema )

8 Parsing Methods
schema.parse( input ) -> T
schema.safeParse( input ) -> { success, data?, error? }
schema.parseAsync( input ) -> Promise<T>
schema.safeParseAsync( input ) -> Promise<result>


## Supplementary Details
Configuration
- tsconfig.json: strict true

Installation steps
1 Ensure TypeScript>=4.5 installed
2 Add zod via package manager
3 Import from 'zod'

Implementation steps
1 Define schemas using z.<type>()
2 Chain validations and transforms
3 Call parse or safeParse
4 Use z.infer<typeof schema> for TypeScript types


## Reference Details
API Specifications

z.string(): ZodString
  methods:
    min(min: number, params?: { message?: string }): ZodString
    max(max: number, params?: { message?: string }): ZodString
    email(params?: { message?: string }): ZodString
    url(params?: { message?: string }): ZodString
    regex(pattern: RegExp, params?: { message?: string }): ZodString

z.number(): ZodNumber
  methods:
    min(min: number, params?: { message?: string }): ZodNumber
    max(max: number, params?: { message?: string }): ZodNumber
    int(): ZodNumber
    positive(): ZodNumber
    nonnegative(): ZodNumber
    finite(): ZodNumber
    safe(): ZodNumber

z.boolean(): ZodBoolean
z.bigint(): ZodBigInt
z.date(): ZodDate

z.literal(value: any): ZodLiteral

z.array(item: ZodType): ZodArray
  min(length: number, params?: { message?: string })
  max(length: number, params?: { message?: string })
  nonempty(params?: { message?: string })

z.tuple(items: ZodType[]): ZodTuple
  rest(item: ZodType): ZodTuple

z.object(shape: Record<string,ZodType>): ZodObject
  extend(shape): ZodObject
  merge(other: ZodObject): ZodObject
  pick(keys: Record<string,true>): ZodObject
  omit(keys: Record<string,true>): ZodObject
  partial(keys?: Record<string,true>): ZodObject
  required(keys?: Record<string,true>): ZodObject
  strict(): ZodObject
  passthrough(): ZodObject
  catchall(schema: ZodType): ZodObject

z.union(options: ZodType[]): ZodUnion
z.discriminatedUnion(key: string, options: ZodObject[]): ZodDiscriminatedUnion
z.intersection(typeA: ZodType, typeB: ZodType): ZodIntersection

Refinement & Transform
schema.refine(check: (data)=>boolean, params?: { message?: string }): ZodType
schema.superRefine((data, ctx)=>void): ZodType
schema.transform(fn: (data)=>U): ZodEffects
schema.preprocess(fn: (input)=>any, schema: ZodType): ZodEffects

Parsing
schema.parse(input: unknown): T throws ZodError
schema.safeParse(input: unknown): { success: true; data: T } | { success: false; error: ZodError }
schema.parseAsync(input): Promise<T>
schema.safeParseAsync(input): Promise<...>

Best Practices
- Always use strict mode in tsconfig
- Use safeParse in user input contexts
- Use discriminatedUnion for tagged unions
- Use z.coerce for primitive coercion

Troubleshooting
Command: schema.parse(value)
Expected: returns typed value or throws ZodError
If error.path incorrect, use refine or superRefine to customize issue.path


## Information Dense Extract
TypeScript >=4.5 strict:true. npm install zod. import { z } from 'zod'. Primitives: z.string().min(n,msg).max(n,msg).email(msg).url(msg); z.number().min(n,msg).max(n,msg).int().positive().nonnegative().finite().safe(); z.boolean(); z.bigint(); z.date(); Literal: z.literal(val). Coercion: z.coerce.string(),number(),boolean(),date(),bigint(). Arrays: z.array(schema).min(n,msg).max(n,msg).nonempty(msg). element property holds item schema. Tuples: z.tuple([...]).rest(schema). Objects: z.object(shape).extend(shape).merge(obj).pick(keys).omit(keys).partial(keys).required(keys).strict().passthrough().catchall(schema). Unions: z.union([a,b]) or a.or(b); z.discriminatedUnion(key,opts). Intersection: z.intersection(a,b). Refinements: schema.refine(fn,msg).superRefine(fn). Transforms: schema.transform(fn).preprocess(fn,schema). Parsing: parse(input)->T throws ZodError; safeParse(input)->result; parseAsync and safeParseAsync. Type inference: z.infer<typeof schema>.

## Sanitised Extract
Table of Contents
1 Installation
2 Basic Usage
3 Primitives
4 Objects
5 Arrays & Tuples
6 Unions & Intersections
7 Refinements & Transforms
8 Parsing Methods

1 Installation
TypeScript >=4.5 with strict:true in tsconfig
npm install zod

2 Basic Usage
import { z } from 'zod'

3 Primitives
z.string()
  .min( length, { message } )
  .max( length, { message } )
  .email( { message } )

z.number()
  .min( value, { message } )
  .max( value, { message } )
  .int()
  .positive()

z.boolean()
z.bigint()
z.date()

Coercion: z.coerce.string(), z.coerce.number(), z.coerce.date(), z.coerce.boolean(), z.coerce.bigint()

4 Objects
z.object({ key: schema, ... })
  .extend({ newKey: schema })
  .merge( otherObject )
  .pick({ key:true, ... })
  .omit({ key:true, ... })
  .partial({ key:true })
  .required({ key:true })
  .strict()
  .passthrough()
  .catchall( schema )

5 Arrays & Tuples
z.array( schema )
  .min( count, { message } )
  .max( count, { message } )
  .nonempty({ message })

z.tuple( [ schema1, schema2, ... ] )
  .rest( schema )

6 Unions & Intersections
z.union( [ schemaA, schemaB ] )
schemaA.or( schemaB )

z.discriminatedUnion( 'key', [objA, objB] )
z.intersection( schemaA, schemaB )

7 Refinements & Transforms
schema.refine( fn(data)=>boolean, { message } )
schema.superRefine( (data, ctx)=>void )
schema.transform( fn(data)=>U )
schema.preprocess( fn(input)=>any, schema )

8 Parsing Methods
schema.parse( input ) -> T
schema.safeParse( input ) -> { success, data?, error? }
schema.parseAsync( input ) -> Promise<T>
schema.safeParseAsync( input ) -> Promise<result>

## Original Source
zod
https://github.com/colinhacks/zod

## Digest of ZOD_CORE

# Installation

Requirements

TypeScript 4.5+ and tsconfig.json with strict mode enabled:

{
  "compilerOptions": {
    "strict": true
  }
}

Install from npm:

npm install zod       # npm
yarn add zod          # yarn
pnpm add zod          # pnpm
bun add zod           # bun

Alternate canary:

npm install zod@canary

# Basic Usage

Import and define schemas:

import { z } from "zod";

// Primitive schema
const myString = z.string();
myString.parse("text"); // returns string
myString.safeParse(123);  // returns { success: false; error: ZodError }

// Object schema
const User = z.object({
  id: z.string(),
  age: z.number().int().nonnegative()
});
type User = z.infer<typeof User>;
User.parse({ id: "u1", age: 30 });

# Schema Types and Methods

## Primitives

z.string()
  .min(length: number, params?: { message?: string }): ZodString
  .max(length: number, params?: { message?: string }): ZodString
  .email(params?: { message?: string }): ZodString
  .url(params?: { message?: string }): ZodString

z.number()
  .min(value: number, params?: { message?: string }): ZodNumber
  .max(value: number, params?: { message?: string }): ZodNumber
  .int(): ZodNumber
  .positive(): ZodNumber
  .nonnegative(): ZodNumber

z.boolean(), z.bigint(), z.date()

All primitives support coercion via z.coerce.method():
  z.coerce.string(), z.coerce.number(), z.coerce.date(), z.coerce.boolean(), z.coerce.bigint()

## Literal

z.literal(value: string | number | boolean | symbol): ZodLiteral

## Arrays and Tuples

z.array(itemSchema)
  .min(length: number, params?: { message?: string }): ZodArray
  .max(length: number, params?: { message?: string }): ZodArray
  .nonempty(params?: { message?: string }): ZodArray

z.tuple([schema1, schema2, ...])
  .rest(schema): ZodTuple

## Objects

z.object(shape: Record<string, ZodType>)
  .extend(shapeExtension)
  .merge(otherObject)
  .pick(keys)
  .omit(keys)
  .partial(keys?)
  .required(keys?)
  .strict()
  .passthrough()
  .catchall(schema)

## Unions and Intersections

z.union([schemaA, schemaB]) or schemaA.or(schemaB)
z.discriminatedUnion(discriminatorKey: string, options: ZodObject[])
z.intersection(schemaA, schemaB)

## Refinements and Transforms

.refine(validator: (data)=>boolean, params?: { message?: string }): ZodType
.superRefine((data, ctx)=>void)
.transform(transformFn: (data)=>U): ZodEffects
.preprocess(preprocessFn: (input)=>any, schema: ZodType)

## Parsing

schema.parse(input: unknown): T throws ZodError
schema.safeParse(input: unknown): { success: true; data: T } | { success: false; error: ZodError }
schema.parseAsync(input): Promise<T>
schema.safeParseAsync(input): Promise<...>


## Attribution
- Source: zod
- URL: https://github.com/colinhacks/zod
- License: MIT License
- Crawl Date: 2025-05-11T03:35:35.354Z
- Data Size: 800061 bytes
- Links Found: 5356

## Retrieved
2025-05-11
library/SUPERTEST.md
# library/SUPERTEST.md
# SUPERTEST

## Crawl Summary
request(input, opts?) binds to ephemeral port if not listening. opts.http2 boolean default false. `.agent(input, opts?)` for cookie persistence. Chainable methods: .get(path:string), .post(path:string), .put, .patch, .delete; .set(header:string, value:string); .auth(user:string, pass:string); .send(body:any); .field(name:string, value:any, options?:{contentType:string}); .attach(field:string, filePath:string). Assertions: .expect(status[, fn(err,res)]), .expect(status, body[, fn]), .expect(body[, fn]), .expect(header, value[, fn]), .expect(customFn). Order of .expect calls matters. Finalize with .end(fn(err,res)) or return promise or await. Promises via then(response). Async/Await supported. Use .expect(200, done) to combine status and callback. Custom assertion mutates res before assertions. Multipart support via superagent under the hood. HTTP errors (non-2XX) are passed as err if no status expectation. Compatible with any test framework.

## Normalised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP2 Support
4 HTTP Methods
5 Headers and Authentication
6 Request Body
7 Multipart Uploads
8 Cookie Persistence
9 Expectations and Assertions
10 Promises and Async/Await
11 Error Handling
12 Agent vs. Standalone

1 Installation
  Install as dev dependency: npm install supertest --save-dev

2 Initialization
  request(appOrUrl[, options]) binds to ephemeral port if app not listening
  request.agent(appOrUrl[, options]) reuses cookies across requests
  options.http2 boolean default false

3 HTTP2 Support
  Pass { http2: true } to enable HTTP/2 protocol on request or agent

4 HTTP Methods
  get(path:string): Test
  post(path:string): Test
  put(path:string): Test
  patch(path:string): Test
  delete(path:string): Test

5 Headers and Authentication
  set(header:string, value:string): Test
  auth(username:string, password:string): Test  sends HTTP Basic auth header

6 Request Body
  send(body:any): Test  supports JSON and urlencoded

7 Multipart Uploads
  field(name:string, value:any[, options:{ contentType:string }] ): Test
  attach(field:string, filePath:string): Test

8 Cookie Persistence
  agent = request.agent(appOrUrl)
  agent.get(path).expect('set-cookie', cookieString)
  agent.get(otherPath).expect(cookieValue)

9 Expectations and Assertions
  expect(status[, fn]): Test
  expect(status, body[, fn]): Test
  expect(body[, fn]): Test
  expect(field, value[, fn]): Test
  expect(fn(res)): Test  throw error in fn to fail
  order of expect calls defines execution sequence

10 Promises and Async/Await
  return request(...).get(...).expect(...).then(response => {...})
  const response = await request(...).get(...); expect on response

11 Error Handling
  Without status expect, non-2XX -> err in .end callback
  .end((err, res) => { if (err) return done(err); done(); })
  combine status and callback: .expect(200, done)

12 Agent vs. Standalone
  request() creates new Test each call
  agent() maintains session cookies and can be reused without passing app/url every time

## Supplementary Details
- Ephemeral port binding: request() auto-binds if app not listening
- Default timeout: inherited from superagent (no built-in timeout set)
- Content-Length header auto-calculated from body
- JSON bodies: Content-Type: application/json header set automatically
- URL-encoded: send accepts object sets Content-Type: application/x-www-form-urlencoded
- HTTP2 option enables TLS ALPN protocol negotiation automatically when supported
- Cookie header array accepted: .set('Cookie', ['a=1;b=2'])
- Custom assertion function receives full response object
- Underlying superagent session used for low-level methods: .write(), .pipe()
- Reassign request variable to a base URL: request = request('http://host:port')
- Chaining: each call returns a new Test instance or the same agent


## Reference Details
API Signatures

function request(appOrUrl:string|http.Server|Function, options?:{ http2:boolean }): Test
function request.agent(appOrUrl:string|http.Server|Function, options?:{ http2:boolean }): Agent

interface Test extends SuperAgentRequest {
  get(path:string): Test
  post(path:string): Test
  put(path:string): Test
  patch(path:string): Test
  delete(path:string): Test
  set(field:string, value:string): Test
  auth(username:string, password:string, options?:{ type:'basic'|'auto' }): Test
  send(body:any): Test
  field(name:string, value:string, options?:{ contentType:string }): Test
  attach(field:string, filePath:string): Test
  expect(status:number, fn?: (err:Error, res:Response)=>void): Test
  expect(status:number, body:any, fn?:(err:Error, res:Response)=>void): Test
  expect(body:string|RegExp|object, fn?:(err:Error, res:Response)=>void): Test
  expect(field:string, value:string|RegExp, fn?:(err:Error, res:Response)=>void): Test
  expect(fn:(res:Response)=>void): Test
  end(fn:(err:Error, res:Response)=>void): void
}

Usage Patterns
1 Standalone callback
describe(...)
  request(app).get('/path')
    .set('Accept','application/json')
    .expect('Content-Type',/json/)
    .expect(200)
    .end((err,res)=>{ if(err) throw err; })

2 Combined status and callback
request(app).get('/path').expect(200, done)

3 Promises
return request(app).get('/path')
  .expect('Content-Type',/json/)
  .expect(200)
  .then(res=>{ expect(res.body.id).toBe(value); })

4 Async/Await
const res = await request(app).get('/path').set('Accept','application/json')
expect(res.status).toBe(200)

5 Multipart upload
request(app).post('/')
  .field('name','avatar')
  .attach('avatar','test/fixtures/avatar.jpg')
  .expect(200, done)

6 Cookie persistence
const agent = request.agent(app)
agent.get('/').expect('set-cookie','cookie=hey; Path=/', done)
agent.get('/return').expect('hey', done)

Configuration Options
- http2 boolean default false: enable HTTP/2 via superagent
- contentType on field: default multipart/form-data; override with application/json

Best Practices
- Always include .expect(status) to catch non-2XX errors
- Use .expect(status, done) to simplify callbacks
- Chain .expect in definition order to inject custom assertions
- For shared host tests reassign request base URL

Troubleshooting
Command: npm test -- grep "SuperTest"
Expected: no assertion errors; non-2XX without expect shows err in callback
Issue: tests hang -> missing end() or return promise
Solution: add .end(done) or return the request promise

Detailed Steps to Reproduce Cookie Failure
1 Remove .expect('set-cookie',...) from first agent call
2 agent.get('/return').expect('hey', done) returns 400
3 Add missing cookie header in agent or use same agent instance

## Information Dense Extract
request(appOrUrl[, {http2:boolean=false}])→Test; request.agent(...)→Agent; Methods: get(path), post(path), put(path), patch(path), delete(path), set(header,value), auth(user,pass), send(body), field(name,value[,options:{contentType}]), attach(field,filePath), expect(status[,fn]), expect(status,body[,fn]), expect(body[,fn]), expect(header,value[,fn]), expect(fn(res)), end(fn(err,res)); Order of expect defines execution; use .expect(200,done) or .end; supports callbacks, Promises, async/await; HTTP2 via opts.http2; auto-binds ephemeral port; JSON bodies auto content-type; urlencoded via send(object); multipart via field/attach; persistent cookies via agent; reassign baseURL: request='url'; troubleshooting: missing end() or return hangs; always include status expect to catch errors

## Sanitised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP2 Support
4 HTTP Methods
5 Headers and Authentication
6 Request Body
7 Multipart Uploads
8 Cookie Persistence
9 Expectations and Assertions
10 Promises and Async/Await
11 Error Handling
12 Agent vs. Standalone

1 Installation
  Install as dev dependency: npm install supertest --save-dev

2 Initialization
  request(appOrUrl[, options]) binds to ephemeral port if app not listening
  request.agent(appOrUrl[, options]) reuses cookies across requests
  options.http2 boolean default false

3 HTTP2 Support
  Pass { http2: true } to enable HTTP/2 protocol on request or agent

4 HTTP Methods
  get(path:string): Test
  post(path:string): Test
  put(path:string): Test
  patch(path:string): Test
  delete(path:string): Test

5 Headers and Authentication
  set(header:string, value:string): Test
  auth(username:string, password:string): Test  sends HTTP Basic auth header

6 Request Body
  send(body:any): Test  supports JSON and urlencoded

7 Multipart Uploads
  field(name:string, value:any[, options:{ contentType:string }] ): Test
  attach(field:string, filePath:string): Test

8 Cookie Persistence
  agent = request.agent(appOrUrl)
  agent.get(path).expect('set-cookie', cookieString)
  agent.get(otherPath).expect(cookieValue)

9 Expectations and Assertions
  expect(status[, fn]): Test
  expect(status, body[, fn]): Test
  expect(body[, fn]): Test
  expect(field, value[, fn]): Test
  expect(fn(res)): Test  throw error in fn to fail
  order of expect calls defines execution sequence

10 Promises and Async/Await
  return request(...).get(...).expect(...).then(response => {...})
  const response = await request(...).get(...); expect on response

11 Error Handling
  Without status expect, non-2XX -> err in .end callback
  .end((err, res) => { if (err) return done(err); done(); })
  combine status and callback: .expect(200, done)

12 Agent vs. Standalone
  request() creates new Test each call
  agent() maintains session cookies and can be reused without passing app/url every time

## Original Source
Testing Tools: Vitest & SuperTest
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest Detailed Digest
Date Retrieved: 2024-06-20
Data Size: 581946 bytes
Links Found: 4709
Error: None

# Installation
```bash
npm install supertest --save-dev
```  

# Basic Usage
```js
const request = require('supertest');
const express = require('express');
const app = express();
app.get('/user', (req, res) => res.status(200).json({ name: 'john' }));
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end((err, res) => { if (err) throw err; });
```  

# HTTP2 Support
Append `{ http2: true }` to `request()` or `request.agent()`:  
```js
request(app, { http2: true }).get('/user')...  
```  

# Test Framework Integration
- Callback style: pass `done` to `.expect()`  
- Promises: return `request(app).get(...).expect(...).then(response => {...})`  
- Async/Await: `const response = await request(app).get(...);`

# Authentication
`.auth(username, password)` sends HTTP basic auth header.  

# Error Handling
- Without `.expect(status)` any non-2XX triggers error in callback.  
- `.end((err, res) => { if (err) return done(err); done(); })`

# Assertions and Order
- `.expect(status[, fn])`  
- `.expect(status, body[, fn])`  
- `.expect(body[, fn])`  
- `.expect(field, value[, fn])`  
- `.expect(fn(res))` (custom assertion)  
- Assertions run sequentially in definition order.

# Multipart and File Uploads
`.field(name, value[, options])` and `.attach(field, path)` for multipart.  

# Agent and Cookie Persistence
```js
const agent = request.agent(app);
agent.get('/').expect('set-cookie','cookie=hey; Path=/', done);
agent.get('/return').expect('hey', done);
```

# API Reference Summary
- `request(appOrUrl[, options])` returns `Test`  
- `request.agent(appOrUrl[, options])` returns `Agent`  
- Methods on `Test`: `.get(path)`, `.post(path)`, `.set(field, value)`, `.send(body)`, `.auth(user, pass)`, `.field()`, `.attach()`, `.expect()`, `.end()`

# License
MIT

## Attribution
- Source: Testing Tools: Vitest & SuperTest
- URL: https://github.com/visionmedia/supertest
- License: MIT License
- Crawl Date: 2025-05-11T10:33:51.286Z
- Data Size: 581946 bytes
- Links Found: 4709

## Retrieved
2025-05-11
library/OPENAPI_SPEC.md
# library/OPENAPI_SPEC.md
# OPENAPI_SPEC

## Crawl Summary
openapi:string required format major.minor.patch; $schema: URI default value; info:title,version required; servers:url template syntax, default [/]; paths:key pattern '/', values PathItem or $ref; components: reusable maps for schemas,responses,parameters,...; securitySchemes:type enum, parameters conditional on type; versioning: major.minor defines feature set, patch ignored; JSON/YAML representations interchangeable; keys case-sensitive; patterned fields with regex; YAML 1.2 constraints.

## Normalised Extract
Table of Contents:
1. OpenAPI Object
2. Info Object
3. Server Object
4. Paths Object
5. Components Object
6. Security Scheme Object

1. OpenAPI Object
 Fields:
  openapi: string (required), format /^\d+\.\d+\.\d+$/, value = "3.1.0" or compatible 3.1.*
  $schema: string (URI), default = https://spec.openapis.org/oas/3.1/schema/2021-02-16
  info: Info Object (see section 2)
  servers: array<Server Object>, default = [{ url: "/" }]
  paths: map<string, PathItemObject | ReferenceObject> (keys begin with "/", at least one of paths/components/webhooks present)
  components: Components Object (see section 5)
  security: array<SecurityRequirementObject>
  tags: array<TagObject>
  externalDocs: ExternalDocumentationObject

2. Info Object
 Fields:
  title: string (required)
  version: string (required)
  description: string
  termsOfService: string (URL)
  contact: { name: string; url: string (URL); email: string (email) }
  license: { name: string; url: string (URL) | identifier: string (SPDX) }

3. Server Object
 Fields:
  url: string (required), may include variables {name}
  description: string
  variables: map<string, { enum?: string[]; default: string; description?: string }>

4. Paths Object
 Key pattern: /^\/.+/  Value: PathItemObject | ReferenceObject

5. Components Object
 Fields (all optional):
  schemas: map<string, SchemaObject | ReferenceObject>
  responses: map<string, ResponseObject | ReferenceObject>
  parameters: map<string, ParameterObject | ReferenceObject>
  examples, requestBodies, headers, securitySchemes, links, callbacks, pathItems: similar maps

6. Security Scheme Object
 Fields:
  type: enum ["apiKey","http","oauth2","openIdConnect"] (required)
  name: string (required if apiKey)
  in: enum ["query","header","cookie"] (required if apiKey)
  scheme: string (required if http)
  bearerFormat: string (optional if http)
  flows: OAuthFlowsObject (required if oauth2)
  openIdConnectUrl: string (URL, required if openIdConnect)


## Supplementary Details
Versioning:
- major.minor designates feature set (3.1). patch addresses clarifications. Tooling should ignore patch.
Format:
- JSON or YAML 1.2 (YAML tags limited to JSON Failsafe; keys scalar strings). CommonMark 0.27 for descriptions.
Case Sensitivity:
- Field names case-sensitive except map keys when noted.
Patterned Fields:
- keys matching regex ^[a-zA-Z0-9.\-_]+$ for components fields; /^\/.+/ for paths.
Relative References (URIs):
- resolved per RFC3986 Section 5.2 using document URI base; JSON-Pointer for fragments (RFC6901).
Relative References (URLs):
- resolved against Server Object url per RFC3986 Section 5.2.
Schema Dialects:
- JSON Schema Draft 2020-12. format property optional for primitives (e.g. int64, date-time).
Rich Text:
- description fields support CommonMark syntax.
Defaults:
- allowEmptyValue for query parameters default false; explode default based on style; reserved by RFC3986.


## Reference Details
1. Minimal JSON Example:
{
  "openapi": "3.1.0",
  "info": { "title": "My API", "version": "1.0.0" },
  "servers": [ { "url": "https://api.example.com/v1" } ],
  "paths": {
    "/items/{itemId}": {
      "get": {
        "operationId": "getItem",
        "parameters": [ { "name": "itemId", "in": "path", "required": true, "schema": { "type": "string" } } ],
        "responses": { "200": { "description": "OK", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/Item" } } } } }
      }
    }
  },
  "components": {
    "schemas": { "Item": { "type": "object", "properties": { "id": { "type": "string" }, "name": { "type": "string" } }, "required": ["id","name"] } }
  }
}

2. Minimal YAML Example:
openapi: 3.1.0
info:
  title: My API
  version: "1.0.0"
servers:
  - url: https://api.example.com/v1
paths:
  /items/{itemId}:
    get:
      operationId: getItem
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
components:
  schemas:
    Item:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
      required: [id, name]

3. CLI Validation (swagger-cli):
npm install -g @apidevtools/swagger-cli
swagger-cli validate openapi.yaml
# Expected: "openapi.yaml is valid OpenAPI 3.1 definition"
# On error: "Error: reference not found: #/components/schemas/XYZ"

4. Programmatic Validation (Node.js):
const $RefParser = require("@apidevtools/swagger-parser");
async function validate(file) {
  try {
    const api = await $RefParser.validate(file);
    console.log("API validated: %s, version %s", api.info.title, api.info.version);
  } catch (err) {
    console.error("Validation error:", err.message);
    process.exit(1);
  }
}
validate("openapi.yaml");

5. Best Practices:
- Always include server variables enum when finite set.
- Use explicit operationId values following camelCase.
- Group reusable schemas under components.schemas and reference via $ref.
- Use JSON Schema Draft 2020-12 features: oneOf, anyOf, dependentRequired.

6. Troubleshooting:
Command: swagger-cli bundle --dereference openapi.yaml -o bundled.json
Expected output: prints warnings for circular refs, produces single file.
If circular reference error: inspect $ref loops, apply one-way references or break cycles with allOf.


## Information Dense Extract
openapi:string required format x.y.z; info:{title:string,version:string}+optional {description,termsOfService(URL),contact(name,url,email),license(name,identifier|url)}; servers:[] default[{url:"/"}], url template {var}, variables:{enum[],default,description}; paths:{"/path":PathItem|$ref}; PathItem: ops(get,post,...),parameters[],servers[],summary,description,$ref; components:{schemas,responses,parameters,examples,requestBodies,headers,securitySchemes,links,callbacks,pathItems} as maps; SecurityScheme:type(apiKey[name,in],http[scheme,bearerFormat],oauth2[flows],openIdConnect[url]); JSON/YAML interchangeable, YAML1.2 failsafe, keys case-sensitive, patterned fields regex, $ref resolution per RFC3986/RFC6901, versioning ignores patch, Schema uses draft2020-12 formats e.g. int64,date-time.

## Sanitised Extract
Table of Contents:
1. OpenAPI Object
2. Info Object
3. Server Object
4. Paths Object
5. Components Object
6. Security Scheme Object

1. OpenAPI Object
 Fields:
  openapi: string (required), format /^'d+'.'d+'.'d+$/, value = '3.1.0' or compatible 3.1.*
  $schema: string (URI), default = https://spec.openapis.org/oas/3.1/schema/2021-02-16
  info: Info Object (see section 2)
  servers: array<Server Object>, default = [{ url: '/' }]
  paths: map<string, PathItemObject | ReferenceObject> (keys begin with '/', at least one of paths/components/webhooks present)
  components: Components Object (see section 5)
  security: array<SecurityRequirementObject>
  tags: array<TagObject>
  externalDocs: ExternalDocumentationObject

2. Info Object
 Fields:
  title: string (required)
  version: string (required)
  description: string
  termsOfService: string (URL)
  contact: { name: string; url: string (URL); email: string (email) }
  license: { name: string; url: string (URL) | identifier: string (SPDX) }

3. Server Object
 Fields:
  url: string (required), may include variables {name}
  description: string
  variables: map<string, { enum?: string[]; default: string; description?: string }>

4. Paths Object
 Key pattern: /^'/.+/  Value: PathItemObject | ReferenceObject

5. Components Object
 Fields (all optional):
  schemas: map<string, SchemaObject | ReferenceObject>
  responses: map<string, ResponseObject | ReferenceObject>
  parameters: map<string, ParameterObject | ReferenceObject>
  examples, requestBodies, headers, securitySchemes, links, callbacks, pathItems: similar maps

6. Security Scheme Object
 Fields:
  type: enum ['apiKey','http','oauth2','openIdConnect'] (required)
  name: string (required if apiKey)
  in: enum ['query','header','cookie'] (required if apiKey)
  scheme: string (required if http)
  bearerFormat: string (optional if http)
  flows: OAuthFlowsObject (required if oauth2)
  openIdConnectUrl: string (URL, required if openIdConnect)

## Original Source
OpenAPI Specification (OAS)
https://spec.openapis.org/oas/v3.1.0

## Digest of OPENAPI_SPEC

# OpenAPI Specification v3.1.0 (Retrieved 2024-06-21)

# OpenAPI Object
- openapi (string, required): MUST be version number in format major.minor.patch (e.g. "3.1.0").
- $schema (string, optional): URI of meta-schema. Default: https://spec.openapis.org/oas/3.1/schema/2021-02-16.
- info (Info Object, required)
- servers (array of Server Object): default single entry with url "/".
- paths (map[string, Path Item Object | Reference Object]): at least one field required across paths/components/webhooks.
- components (Components Object)
- security (array of Security Requirement Object)
- tags (array of Tag Object)
- externalDocs (External Documentation Object)

# Info Object
- title (string, required)
- version (string, required)
- description (string)
- termsOfService (URL string)
- contact (Contact Object)
- license (License Object)

# Server Object
- url (string, required): supports variable substitutions in {brackets}.
- description (string)
- variables (map[string, Server Variable Object])

# Paths Object
- Keys: string starting with "/".
- Values: Path Item Object or Reference Object.

# Path Item Object
- $ref (string)
- summary (string)
- description (string)
- get, put, post, delete, options, head, patch, trace (Operation Object)
- servers (override array of Server Object)
- parameters (array of Parameter Object | Reference Object)

# Components Object
- schemas (map[string, Schema Object | Reference Object])
- responses, parameters, examples, requestBodies, headers, securitySchemes, links, callbacks, pathItems (maps)

# Security Scheme Object
- type (string, required): one of apiKey, http, oauth2, openIdConnect.
- name (string): required if type=apiKey.
- in (string): "query" | "header" | "cookie", required if type=apiKey.
- scheme (string): required if type=http.
- bearerFormat (string): optional if type=http and scheme=bearer.
- flows (OAuth Flows Object): required if type=oauth2.
- openIdConnectUrl (URL string): required if type=openIdConnect.

---
**Attribution**: Copyright © 2021 the Linux Foundation
Data Size: 19111465 bytes
Links Found: 59233
Error: None


## Attribution
- Source: OpenAPI Specification (OAS)
- URL: https://spec.openapis.org/oas/v3.1.0
- License: CC0 1.0 Universal
- Crawl Date: 2025-05-11T06:36:56.041Z
- Data Size: 19111465 bytes
- Links Found: 59233

## Retrieved
2025-05-11

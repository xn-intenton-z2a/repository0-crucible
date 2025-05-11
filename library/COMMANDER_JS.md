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

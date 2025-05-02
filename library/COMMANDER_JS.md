# COMMANDER_JS

## Crawl Summary
Commander.js provides a fluent API for building CLI tools in Node.js. Core functionality includes defining commands, options, arguments, and help, with strict parsing and suggestion of unknown options. Key method signatures: .option(flags, desc, default), .requiredOption, .argument(name, desc, default), .command(name, desc, opts), .action(handler), .parse(args), .parseAsync(args). Advanced: Option class for elaborate options (choices, env, conflicts, implies), lifecycle hooks (preAction, postAction, preSubcommand), help customization (.addHelpText, .helpOption, .helpCommand), error handling (.error, .exitOverride, .configureOutput), parsing tweaks (.enablePositionalOptions, .passThroughOptions, .allowUnknownOption, .allowExcessArguments), legacy compatibility (.storeOptionsAsProperties), TypeScript support (@commander-js/extra-typings).

## Normalised Extract
Contents
1 Installation and Imports
2 Command and Program Setup
3 Defining Options
4 Option Types and Behaviors
5 Defining Arguments
6 Subcommands
7 Action Handlers
8 Parsing Methods
9 Help System
10 Error and Exit Handling
11 Lifecycle Hooks
12 Advanced Configuration
13 TypeScript Support

1 Installation and Imports
• npm install commander
• import { program, Command, Option, InvalidArgumentError } from 'commander'

2 Command and Program Setup
• createCommand(): Command
• new Command([name]): Command
• program.name(string)
• program.description(string, summary?)
• program.version(string, flags?, description?)

3 Defining Options
• program.option(flags: string, description: string, defaultValue?)
• program.requiredOption(flags: string, description: string, defaultValue?)
• program.addOption(new Option(flags, description))

4 Option Types and Behaviors
• Boolean: --debug
• Value: -p, --port <number>
• Negatable: --no-feature
• Boolean|Value: --flag [value]
• Variadic: -n, --items <items...>
• Default values: .option(..., default)
• Custom parser: .option(flag, desc, parserFn, default)

5 Defining Arguments
• program.argument(name: string, description?: string, defaultValue?)
• Variadic argument: <args...>

6 Subcommands
• program.command(nameAndArgs: string, description?, opts?)
• .addCommand(cmd)
• .alias(alias)
• isDefault, hidden, executableFile

7 Action Handlers
• .action(fn)
• fn receives declared args, options object, and command instance
• Async handlers: use .parseAsync

8 Parsing Methods
• program.parse([argv], {from})
• program.parseAsync([argv], {from})
• from: 'node' | 'electron' | 'user'

9 Help System
• Auto-generated: -h, --help
• .helpOption(flags?, description?)
• .helpCommand(name?, description?)
• .addHelpText(position, textOrFn)
• .showHelpAfterError(msg?)
• .showSuggestionAfterError(enable)

10 Error and Exit Handling
• .error(message, {exitCode, code})
• .exitOverride([handler])
• .configureOutput({writeOut, writeErr, outputError})

11 Lifecycle Hooks
• .hook(event, fn)
• event: 'preAction','postAction','preSubcommand'

12 Advanced Configuration
• .enablePositionalOptions()
• .passThroughOptions()
• .allowUnknownOption(allow)
• .allowExcessArguments(allow)
• .storeOptionsAsProperties(store)

13 TypeScript Support
• Install @commander-js/extra-typings
• Strong typing for .opts() and .action parameters

## Supplementary Details
• Option.flags syntax: short and long separated by comma: '-s, --separator <char>'
• .opts(): returns Record<string, any> of parsed options
• .optsWithGlobals(): merged local/global
• .getOptionValue(key): any
• .setOptionValue(key, value): void
• .getOptionValueSource(key): 'default'|'env'|'cli'
• .setOptionValueWithSource(key, value, source): void
• Argument.choices(array): restrict values
• Argument.default(value, description): set default
• Stand-alone subcommands directory: entry script folder
• .executableDir(dir): change lookup dir
• Node inspect child: port+1
• npm scripts pass-through: use '--'
• InvalidArgumentError extends Error: thrown to signal parse errors

## Reference Details
API Specifications
Command methods:
  option(flags: string, description: string, defaultValue?: any): Command
  requiredOption(flags: string, description: string, defaultValue?: any): Command
  addOption(option: Option): Command
  argument(name: string, description?: string, defaultValue?: any): Command
  addArgument(arg: Argument): Command
  command(nameAndArgs: string, description?: string, opts?: { isDefault?: boolean; hidden?: boolean; executableFile?: string }): Command | this
  addCommand(cmd: Command): this
  alias(alias: string): Command
  name(name: string): Command
  description(desc: string, summary?: string): Command
  version(version: string, flags?: string, description?: string): Command
  action(fn: (...args: any[]) => void | Promise<any>): Command
  parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
  parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>
  help(): void
  outputHelp(opts?: { error?: boolean }): void
  helpInformation(): string
  helpOption(flags: string|false, description?: string): Command
  helpCommand(name?: string|false, description?: string): Command
  addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|(ctx)=>string): Command
  showHelpAfterError(msg?: string): Command
  showSuggestionAfterError(enable: boolean): Command
  error(message: string, opts?: { exitCode?: number; code?: string }): void
  exitOverride(handler?: (err: CommanderError)=>void): Command
  configureOutput(opts: { writeOut?: (s:string)=>void; writeErr?: (s:string)=>void; outputError?: (s:string, write:(s:string)=>void)=>void }): Command
  hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCommand:Command, actionCommand:Command)=>void|Promise<void>): Command
  enablePositionalOptions(): Command
  passThroughOptions(): Command
  allowUnknownOption(allow?: boolean): Command
  allowExcessArguments(allow?: boolean): Command
  storeOptionsAsProperties(store?: boolean): Command

Option class methods:
  constructor(flags: string, description?: string)
  default(value: any, description?: string): Option
  env(variable: string): Option
  choices(values: any[]): Option
  preset(value: any): Option
  argParser(parserFn: (val:string, prev:any)=>any): Option
  conflicts(key: string): Option
  implies(mapping: Record<string, any>): Option
  hideHelp(): Option
  makeOptionMandatory(): Option

InvalidArgumentError:
  constructor(message: string)

Best Practices:
• Define a local Command instance for testable code: const program = new Command()
• Use .addOption for advanced option config: choices, env, conflicts, implies
• For async actions, always use parseAsync
• For monolithic CLIs, enablePositionalOptions + passThroughOptions for nested tools
• Use exitOverride in libraries to catch errors instead of process.exit

Troubleshooting:
1 Unknown option error:
   program.parse(['--fits'], { from: 'user' })
   // error: unknown option '--fits' (Did you mean --first?)
2 Missing argument:
   program.option('-c, --cheese <type>').parse()
   // error: option '-c, --cheese <type>' argument missing
3 Invalid choice:
   program.addOption(new Option('-d, --drink <size>').choices(['small','medium','large'])).parse()
   // error: option '-d, --drink <size>' argument 'huge' is invalid. Allowed choices are small, medium, large
4 Exit override:
   program.exitOverride()
   try { program.parse() } catch(err) { if(err.exitCode) handle(err) }


## Information Dense Extract
npm install commander; import {program,Command,Option,InvalidArgumentError} from 'commander'
createCommand():Command; new Command([name]):Command
program.name(name).description(text,summary).version(ver,flags,desc)
program.option(flags,desc,default).requiredOption(flags,desc,default).addOption(new Option(flags,desc).default(val).choices(arr).env(var).preset(val).argParser(fn).conflicts(key).implies(map).hideHelp().makeOptionMandatory())
program.argument(name,desc,default).addArgument(new Argument(name,desc).choices(arr).default(val))
program.command(def,desc,opts).addCommand(cmd).alias(alias)
program.action(fn(arg1,..,opts,cmd)).parse([argv],{from:'node'|'electron'|'user'}).parseAsync(...)
program.help().outputHelp({error}).helpInformation().helpOption(flags,desc).helpCommand(name,desc).addHelpText(pos,textOrFn).showHelpAfterError(msg).showSuggestionAfterError(bool)
program.error(msg,{exitCode,code}).exitOverride(handler).configureOutput({writeOut,writeErr,outputError})
program.hook('preAction'|'postAction'|'preSubcommand',fn)
program.enablePositionalOptions().passThroughOptions().allowUnknownOption(bool).allowExcessArguments(bool).storeOptionsAsProperties(bool)
Options: boolean, <value>, [opt], <vals...>; access opts() or optsWithGlobals(); getOptionValue(key); setOptionValue(key,val); getOptionValueSource(key); setOptionValueWithSource(key,val,src)
Examples: .option('-p, --port <num>','port',80); .option('-i, --int <n>',parseIntStrict,0); program.command('split <str>').option('--first').option('-s, --sep <c>',',').action((str,opts)=>{})
Use parseAsync for async actions; exitOverride to catch errors; configureOutput for custom IO; addHelpText for usage info; showHelpAfterError to display help on error; showSuggestionAfterError to disable suggestions; enablePositionalOptions+passThroughOptions for nested CLIs


## Sanitised Extract
Contents
1 Installation and Imports
2 Command and Program Setup
3 Defining Options
4 Option Types and Behaviors
5 Defining Arguments
6 Subcommands
7 Action Handlers
8 Parsing Methods
9 Help System
10 Error and Exit Handling
11 Lifecycle Hooks
12 Advanced Configuration
13 TypeScript Support

1 Installation and Imports
 npm install commander
 import { program, Command, Option, InvalidArgumentError } from 'commander'

2 Command and Program Setup
 createCommand(): Command
 new Command([name]): Command
 program.name(string)
 program.description(string, summary?)
 program.version(string, flags?, description?)

3 Defining Options
 program.option(flags: string, description: string, defaultValue?)
 program.requiredOption(flags: string, description: string, defaultValue?)
 program.addOption(new Option(flags, description))

4 Option Types and Behaviors
 Boolean: --debug
 Value: -p, --port <number>
 Negatable: --no-feature
 Boolean|Value: --flag [value]
 Variadic: -n, --items <items...>
 Default values: .option(..., default)
 Custom parser: .option(flag, desc, parserFn, default)

5 Defining Arguments
 program.argument(name: string, description?: string, defaultValue?)
 Variadic argument: <args...>

6 Subcommands
 program.command(nameAndArgs: string, description?, opts?)
 .addCommand(cmd)
 .alias(alias)
 isDefault, hidden, executableFile

7 Action Handlers
 .action(fn)
 fn receives declared args, options object, and command instance
 Async handlers: use .parseAsync

8 Parsing Methods
 program.parse([argv], {from})
 program.parseAsync([argv], {from})
 from: 'node' | 'electron' | 'user'

9 Help System
 Auto-generated: -h, --help
 .helpOption(flags?, description?)
 .helpCommand(name?, description?)
 .addHelpText(position, textOrFn)
 .showHelpAfterError(msg?)
 .showSuggestionAfterError(enable)

10 Error and Exit Handling
 .error(message, {exitCode, code})
 .exitOverride([handler])
 .configureOutput({writeOut, writeErr, outputError})

11 Lifecycle Hooks
 .hook(event, fn)
 event: 'preAction','postAction','preSubcommand'

12 Advanced Configuration
 .enablePositionalOptions()
 .passThroughOptions()
 .allowUnknownOption(allow)
 .allowExcessArguments(allow)
 .storeOptionsAsProperties(store)

13 TypeScript Support
 Install @commander-js/extra-typings
 Strong typing for .opts() and .action parameters

## Original Source
Commander.js – Node.js CLI Framework
https://github.com/tj/commander.js#readme

## Digest of COMMANDER_JS

# Commander.js CLI Framework - Technical Reference

Date retrieved: 2024-06-10  
Source: https://github.com/tj/commander.js#readme  
Data size: 790299 bytes

## Installation

Execute:

npm install commander

Import in code:

CommonJS:  
const { program, Command, Option, InvalidArgumentError } = require('commander');

ESM:  
import { program, Command, Option, InvalidArgumentError } from 'commander';

## Core API Methods and Signatures

### Command Creation

createCommand(): Command
new Command(name?: string): Command
program.name(string): Command
program.description(string, summary?: string): Command
program.version(string, flags?: string, description?: string): Command

### Option Definition

program.option(flags: string, description: string, defaultValue?: any): Command
program.requiredOption(flags: string, description: string, defaultValue?: any): Command
program.addOption(option: Option): Command

Option class:
new Option(flags: string, description?: string)
.option.default(value: any, description?: string): Option
.option.choices(values: any[]): Option
.option.env(name: string): Option
.option.preset(value: any): Option
.option.argParser(fn: (val: string, prev: any) => any): Option
.option.conflicts(key: string): Option
.option.implies(mapping: Record<string, any>): Option
.option.hideHelp(): Option
.option.makeOptionMandatory(): Option

### Argument Definition

program.argument(name: string, description?: string, defaultValue?: any): Command
program.arguments(string): Command
program.addArgument(arg: Argument): Command

### Subcommands

program.command(nameAndArgs: string, description?: string, opts?: { isDefault?: boolean, hidden?: boolean, executableFile?: string }): Command | this
program.addCommand(cmd: Command): this
program.alias(alias: string): Command

### Action Handlers

program.action(fn: (...args: any[]) => void | Promise<any>): Command
fn signature: (arg1, arg2, ..., options: Record<string, any>, command: Command) => void or Promise<void>

### Parsing

program.parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
program.parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>

### Help and Output

program.help(): void  // exits
program.outputHelp(options?: { error?: boolean }): void
program.helpInformation(): string
program.helpOption(flags: string|false, description?: string): Command
program.helpCommand(name?: string|false, description?: string): Command
program.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|(ctx:{error:boolean,command:Command})=>string): Command
program.showHelpAfterError(message?: string): Command
program.showSuggestionAfterError(enable?: boolean): Command

### Error and Exit Handling

program.error(message: string, options?: { exitCode?: number, code?: string }): void  // calls process.exit
program.exitOverride(handler?: (err: CommanderError) => void): Command
program.configureOutput(options: {
  writeOut?: (str: string) => void,
  writeErr?: (str: string) => void,
  outputError?: (str: string, write: (s:string)=>void) => void
}): Command

### Lifecycle Hooks

program.hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCommand:Command, actionCommand:Command) => void|Promise<void>): Command

## Configuration Options

.enablePositionalOptions(): Command  // process only options before args
.passThroughOptions(): Command      // allow unknown options to pass through
.allowUnknownOption(allow?: boolean): Command  // treat unknown options as args
.allowExcessArguments(allow?: boolean): Command // allow extra arguments
.storeOptionsAsProperties(store?: boolean): Command // legacy .debug vs opts().debug

## TypeScript Support

Optional package: @commander-js/extra-typings

## Examples

### Defining and Parsing Options

program.option('-p, --port <number>', 'server port number', 80)
       .option('--trace', 'add extra debugging output')
       .parse(process.argv);
const opts = program.opts();
console.log(opts.port, opts.trace);

### Custom Option Processing

function parseIntStrict(val, prev) {
  const v = parseInt(val, 10);
  if (isNaN(v)) throw new InvalidArgumentError('Not a number.');
  return v;
}
program.option('-i, --int <n>', 'integer', parseIntStrict, 0);

### Subcommands with Action Handlers

program.command('clone <src> [dest]')
       .description('clone repo')
       .option('-r, --recursive', 'clone recursively')
       .action((src, dest, options) => {
         // implement
       });

### Stand-alone Executable Subcommands

program.command('install [pkgs...]', 'install packages', { executableFile: 'myInstall' });

### Async Parsing

program.command('run').action(async () => {/*...*/});
await program.parseAsync(process.argv);

### Help Customization

program.addHelpText('after', '\nExample: $ myprog --help');
program.showHelpAfterError('(add --help for info)');

## Attribution
- Source: Commander.js – Node.js CLI Framework
- URL: https://github.com/tj/commander.js#readme
- License: MIT License
- Crawl Date: 2025-05-02T19:00:14.970Z
- Data Size: 790299 bytes
- Links Found: 5494

## Retrieved
2025-05-02

# COMMANDER_JS

## Crawl Summary
Installation npm install commander
Options API: .option(flags,description[,default][,parser]), .requiredOption, .addOption(new Option(flags,desc).choices([...]).default(val).env(var).conflicts(opt).implies(obj).argParser(fn).preset(val).hideHelp().makeOptionMandatory())
Commands API: .command(name[,desc][,config]), .addCommand, .argument(name[,desc][,default][,parser]), .alias, .usage, .description, .summary, .action(handler(args,options,command)), .hook(event,fn)
Parsing: .parse([argv],{from}), .parseAsync, .enablePositionalOptions, .passThroughOptions, .allowUnknownOption, .allowExcessArguments
Help: .helpOption, .helpCommand, .addHelpText, .showHelpAfterError, .showSuggestionAfterError, .help, .outputHelp, .helpInformation
Error Handling: .exitOverride, .error, .version, .name, .createCommand, .storeOptionsAsProperties
Configuration: .configureHelp, .createHelp, .configureOutput
Stand-alone executables: .command(name,args,desc) searches for bin, .executableDir
Hooks: preAction, postAction, preSubcommand

## Normalised Extract
Table of Contents
1 Installation
2 Declaring program
3 Options
4 Commands
5 Parsing
6 Help

1 Installation
npm install commander

2 Declaring program
CommonJS: const { program } = require('commander')
ESM: import { Command } from 'commander'; const program = new Command()

3 Options
.option(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.addOption(new Option(flags, description)
    .default(val)
    .choices([...])
    .env(envVar)
    .conflicts(opt)
    .implies({optName:optVal})
    .argParser(fn)
    .preset(val)
    .hideHelp()
    .makeOptionMandatory())
Access options: program.opts(), program.getOptionValue(key), program.setOptionValue(key,value)
Option types: boolean (--flag), value (<value>), optional ([value]), variadic (...)

4 Commands
.command(name:string, description?:string, config?:object)
.addCommand(cmd:Command)
.argument(name:string, description?:string, defaultValue?:any, parser?:(value,prev)=>any)
.alias(name:string)
.usage(string)
.description(string)
.summary(string)
.action((...args,options,command)=>{})
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd)=>{})

5 Parsing
.parse(argv?:string[],{from:'node'|'user'|'electron'})
.parseAsync(argv?:string[],{from})
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption([bool])
.allowExcessArguments([bool])

6 Help
.helpOption(flags:string,desc:string)
.helpCommand(name?:string|false,desc?:string)
.addHelpText(position:'beforeAll'|'before'|'after'|'afterAll',textOrFn)
.showHelpAfterError([msg])
.showSuggestionAfterError([bool])
.help()
.outputHelp()
.helpInformation()

## Supplementary Details
.configureHelp({ sortSubcommands?:boolean; sortOptions?:boolean; showGlobalOptions?:boolean }) customize help
.createHelp() returns new Help instance for subclassing
.configureOutput({ writeOut(str):void; writeErr(str):void; outputError(str,write):void }) redirect stdout/stderr and style errors
.exitOverride([callback(error:CommanderError)]) throw CommanderError instead of process.exit
.error(message:string, {exitCode?:number, code?:string}) trigger CommanderError with code and exitCode
.version(version:string, flags?:string, description?:string) set version option flags and behavior
.name(programName:string) set program name for usage and bin lookup
.createCommand(name?:string) factory to instantiate new Command
.storeOptionsAsProperties() enable legacy property storage of options


## Reference Details
.option(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.addOption(option: Option): Command
.command(name: string, description?: string, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean; }): Command
.addCommand(cmd: Command, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean }): Command
.argument(name: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.alias(alias: string): Command
.usage(usage: string): Command
.description(description: string): Command
.summary(text: string): Command
.action(handler: (...args: any[], options: object, command: Command) => void | Promise<void>): Command
.hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCommand: Command, actionCommand: Command) => void | Promise<void>): Command
.parse(argv?: string[], options?: { from: 'node'|'user'|'electron' }): Command
.parseAsync(argv?: string[], options?: { from: 'node'|'user'|'electron' }): Promise<Command>
.enablePositionalOptions(): Command
.passThroughOptions(): Command
.allowUnknownOption(allow?: boolean): Command
.allowExcessArguments(allow?: boolean): Command
.helpOption(flags: string, description: string): Command
.helpCommand(name?: string | false, description?: string): Command
.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', text: string | ((context: { error: boolean; command: Command }) => string)): Command
.configureOutput(opts: { writeOut(str: string): void; writeErr(str: string): void; outputError(str: string, write: (s: string) => void): void }): Command
.exitOverride(callback?: (error: CommanderError) => void): Command
.error(message: string, opts?: { exitCode?: number; code?: string }): never
.version(version: string, flags?: string, description?: string): Command
.name(name: string): Command
.createCommand(name?: string): Command
.storeOptionsAsProperties(): Command

// Example Code
```js
const { Command, Option } = require('commander');
const program = new Command();
program
  .name('app')
  .version('1.0.0', '-v, --version', 'output version')
  .option('-p, --port <number>', 'port number', 3000, parseInt)
  .requiredOption('--env <env>', 'environment variable')
  .addOption(new Option('--mode <mode>', 'run mode').choices(['dev','prod']).default('dev'))
  .command('start')
    .description('Launch server')
    .argument('<script>', 'script file to run')
    .option('-d, --debug', 'enable debug')
    .action((script, options) => {
      console.log('Running', script, 'on port', options.port);
    });
program.parse(process.argv);
```

// Troubleshooting
$ app --unknown
error: unknown option '--unknown' (Did you mean --version?)
Use .allowUnknownOption() to accept unknown or .showHelpAfterError() to display full help after errors.

$ app
error: required option '--env <env>' not specified
Use .requiredOption() or provide default in environment.

Debugging stand-alone executables:
- node --inspect childProcessPort = parentPort+1
- VSCode: set autoAttachChildProcesses=true in launch.json


## Information Dense Extract
npm install commander; require or import Command
API: .option(flags,desc,default?,parser?); .requiredOption; .addOption(new Option().choices().default().env().conflicts().implies().argParser().preset().hideHelp().makeOptionMandatory())
Commands: .command(name,desc?,config?); .addCommand; .argument(name,desc?,default?,parser?); .alias; .usage; .description; .summary; .action(handler(args,opts,cmd)); .hook(preAction/postAction/preSubcommand,fn)
Parsing: .parse([argv],{from:'node'|'user'|'electron'}); .parseAsync; .enablePositionalOptions; .passThroughOptions; .allowUnknownOption; .allowExcessArguments
Help: .helpOption(flags,desc); .helpCommand(name?,desc?); .addHelpText(position,textOrFn); .showHelpAfterError; .showSuggestionAfterError; .help; .outputHelp; .helpInformation
Error/Exit: .exitOverride; .error(msg,{exitCode,code}); .version; .name; .createCommand; .storeOptionsAsProperties
Configure: .configureHelp; .createHelp; .configureOutput(writeOut,writeErr,outputError)
Examples: reference code above
Troubleshoot: unknown option -> allowUnknownOption or showHelpAfterError; missing required -> requiredOption; debug executables -> inspector port+1 or VSCode autoAttachChildProcesses

## Sanitised Extract
Table of Contents
1 Installation
2 Declaring program
3 Options
4 Commands
5 Parsing
6 Help

1 Installation
npm install commander

2 Declaring program
CommonJS: const { program } = require('commander')
ESM: import { Command } from 'commander'; const program = new Command()

3 Options
.option(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value:string,prev:any)=>any)
.addOption(new Option(flags, description)
    .default(val)
    .choices([...])
    .env(envVar)
    .conflicts(opt)
    .implies({optName:optVal})
    .argParser(fn)
    .preset(val)
    .hideHelp()
    .makeOptionMandatory())
Access options: program.opts(), program.getOptionValue(key), program.setOptionValue(key,value)
Option types: boolean (--flag), value (<value>), optional ([value]), variadic (...)

4 Commands
.command(name:string, description?:string, config?:object)
.addCommand(cmd:Command)
.argument(name:string, description?:string, defaultValue?:any, parser?:(value,prev)=>any)
.alias(name:string)
.usage(string)
.description(string)
.summary(string)
.action((...args,options,command)=>{})
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd)=>{})

5 Parsing
.parse(argv?:string[],{from:'node'|'user'|'electron'})
.parseAsync(argv?:string[],{from})
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption([bool])
.allowExcessArguments([bool])

6 Help
.helpOption(flags:string,desc:string)
.helpCommand(name?:string|false,desc?:string)
.addHelpText(position:'beforeAll'|'before'|'after'|'afterAll',textOrFn)
.showHelpAfterError([msg])
.showSuggestionAfterError([bool])
.help()
.outputHelp()
.helpInformation()

## Original Source
Commander.js
https://github.com/tj/commander.js#readme

## Digest of COMMANDER_JS

# Installation

npm install commander

# Options

.option(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.addOption(new Option(flags: string, description: string)
    .hideHelp()
    .default(value: any, label: string)
    .choices(arrayOfValues)
    .env(envVarName)
    .conflicts(optionName)
    .implies({ key: value })
    .argParser(fn)
    .preset(value)
    .makeOptionMandatory())

Option Types:
- Boolean: --flag
- Value: <value>
- Optional: [value]
- Variadic: <values...> or [values...]

Accessing Options:
- program.opts(): returns object of option key and values
- program.getOptionValue(key)
- program.setOptionValue(key, value)

# Commands

.command(name: string, description?: string, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean; })
.addCommand(commandInstance: Command)
.argument(name: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.alias(alias: string)
.usage(usage: string)
.description(text: string)
.summary(text: string)
.action((...args: any[], options: object, command: Command) => void)
.hook(event: 'preAction' | 'postAction' | 'preSubcommand', (thisCommand: Command, actionCommand: Command) => void)

# Parsing and Execution

.parse(argv?: string[], options?: { from: 'node' | 'user' | 'electron' })
.parseAsync(argv?: string[], options?: { from: 'node' | 'user' | 'electron' })
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption([allow?: boolean])
.allowExcessArguments([allow?: boolean])

# Help System

.helpOption(flags: string, description: string)
.helpCommand(name?: string | false, description?: string)
.addHelpText(position: 'beforeAll' | 'before' | 'after' | 'afterAll', textOrFn: string | ((context: { error: boolean; command: Command }) => string))
.showHelpAfterError([message: string])
.showSuggestionAfterError([enable: boolean])
.help(): void  // display help and exit
.outputHelp([options: { error: boolean }]): void  // display without exit
.helpInformation(): string  // return help string

# Error and Exit Handling

.exitOverride([callback: (error: CommanderError) => void])
.error(message: string, opts?: { exitCode?: number; code?: string }): never
.version(version: string, flags?: string, description?: string)
.name(programName: string)
.createCommand(name?: string): Command
.storeOptionsAsProperties()

# Additional Configuration

.configureHelp({ sortSubcommands?: boolean; sortOptions?: boolean; showGlobalOptions?: boolean })
.createHelp(): Help
.configureOutput({ writeOut: (str: string) => void; writeErr: (str: string) => void; outputError: (str: string, write: (s: string) => void) => void })

# Stand-alone Executables

.command('name [args...]', 'description')  // stand-alone: directory search for bin files
.executableDir(path: string)

# Life-cycle Hooks

.hook('preAction', fn)
.hook('postAction', fn)
.hook('preSubcommand', fn)

# Examples and Code Patterns

const { Command, Option } = require('commander')
const program = new Command()
program
  .name('app')
  .version('1.0.0', '-v, --version', 'output the current version')
  .option('-p, --port <number>', 'port number', 3000, parseInt)
  .requiredOption('--env <environment>', 'environment name')
  .addOption(new Option('--mode <mode>', 'run mode').choices(['dev', 'prod']).default('dev'))
  .command('start')
    .description('start the server')
    .argument('<file>', 'script file')
    .option('-d, --debug', 'enable debug')
    .action((file, options) => {
      // implementation
    })
program.parse(process.argv)

Data Size: 777171 bytes
Retrieved: 2024-06-20

## Attribution
- Source: Commander.js
- URL: https://github.com/tj/commander.js#readme
- License: MIT License
- Crawl Date: 2025-05-07T03:35:49.535Z
- Data Size: 777171 bytes
- Links Found: 5231

## Retrieved
2025-05-07

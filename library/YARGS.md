# YARGS

## Crawl Summary
Installation: npm install --save yargs. Import via ESM or CommonJS. Entry: yargs(args) returns Argv. Argv methods: scriptName, usage, command, positional, option, demandCommand, help, version, parse, argv. Helpers: hideBin removes node executable and script path. Builders: define commands, positional args, options with type, alias, default, describe, demand, requiresArg, choices. Handlers invoked with parsed argv. Example CLI provided.


## Normalised Extract
Table of Contents
1. Initialization and Imports
2. Argv Interface and Method Signatures
3. Positional Arguments Configuration
4. Options Configuration
5. Command Registration
6. Help and Version Configuration
7. Parsing and Accessing Arguments
8. Helper Functions

1. Initialization and Imports
Function: yargs(args?: string[]): Argv
Default args: hideBin(process.argv)

2. Argv Interface and Method Signatures
scriptName(name: string): Argv
usage(usage: string): Argv
command(cmd: string, desc: string, builder?: (yargs: Argv) => Argv, handler?: (argv: Arguments) => void): Argv
option(key: string, options: OptionDefinition | OptionDefinition[]): Argv
positional(key: string, opts: PositionalOptions): Argv
demandCommand(min?: number, max?: number, minMsg?: string, maxMsg?: string): Argv
help(opt?: string, desc?: string): Argv
version(opt?: string, desc?: string, ver?: string): Argv
parse(args?: string[]): Arguments
argv: Arguments

3. Positional Arguments Configuration
PositionalOptions:
 type: string|number|boolean
 default: any
 describe: string

4. Options Configuration
OptionDefinition fields:
 alias: string|string[]
 type: string|number|boolean|count
 default: any
 describe: string
 demandOption: boolean
 requiresArg: boolean
 choices: any[]

5. Command Registration
Provide cmd string with placeholders (<>, []), description, builder callback to set options/positionals, and handler callback receiving parsed argv.

6. Help and Version Configuration
help(option: string='--help', description: string='Show help'): Argv
version(option: string='--version', description: string='Show version', version: string=package.version): Argv

7. Parsing and Accessing Arguments
parse(args?: string[]): Arguments
Access via .argv property

8. Helper Functions
hideBin(argv: string[]): returns argv.slice(2)


## Supplementary Details
Parameter Defaults and Types
 yargs: args:string[] default hideBin(process.argv)
 scriptName: name:string
 usage: usage:string
 command: cmd:string, desc:string, builder: function returning Argv, handler: function(argv)
 positional: key:string, opts: {type, default, describe}
 option: key:string, opts: multiple fields
 demandCommand: min:number default 1, max:number undefined, messages:string
 help/version: default switches and descriptions
 parse: args:string[] default hideBin(process.argv)

Implementation Steps
1. Import yargs and hideBin
2. Call yargs(hideBin(process.argv)) to get Argv
3. Chain scriptName, usage, command, option, positional
4. Chain help, version as needed
5. Call parse() or access .argv

Configuration Options
 Options set via .option and .positional include type, default, describe, alias, demandOption, choices, requiresArg
 Default parsing behavior resolves abbreviations and coercions



## Reference Details
API Specifications

yargs(args?: string[]): Argv

Argv
 Methods:
  scriptName(name:string): Argv
  usage(usage:string): Argv
  command(cmd:string, desc:string, builder?: (yargs:Argv)=>Argv, handler?: (argv:Arguments)=>void): Argv
  option(key:string, def:OptionDefinition|OptionDefinition[]): Argv
  positional(key:string, opts:PositionalOptions): Argv
  demandCommand(min?:number,max?:number,minMsg?:string,maxMsg?:string): Argv
  help(opt?:string,desc?:string): Argv
  version(opt?:string,desc?:string,ver?:string): Argv
  parse(args?:string[]): Arguments
  argv: Arguments

Types
interface Arguments { [key:string]: any }
interface PositionalOptions { type: 'string'|'number'|'boolean'; default?: any; describe: string }
interface OptionDefinition { alias?: string|string[]; type?: 'string'|'number'|'boolean'|'count'; default?: any; describe?: string; demandOption?: boolean; requiresArg?: boolean; choices?: any[] }

hideBin(argv:string[]): string[]

Code Example
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
 .scriptName('app')
 .usage('$0 <cmd> [opts]')
 .command('deploy <env>', 'Deploy to environment', yargs=>
   yargs.positional('env',{ describe:'environment', type:'string' })
     .option('force',{ alias:'f', type:'boolean', describe:'force deploy', default:false })
 , argv=>{
   if(argv.force) console.log('Force deploying to',argv.env)
   else console.log('Deploying to',argv.env)
 })
 .demandCommand(1,'Command required')
 .help()
 .version('v', 'Show version', '1.0.0')
 .parse()

Best Practices
• Always use hideBin(process.argv) to ignore node exec path
• Define .demandCommand to enforce at least one command
• Use .strict() to error on unknown options

Troubleshooting
Command: node app.js unknown
Expected: Error 输出 'Unknown argument: unknown'
If missing .strict(), unknown args are ignored


## Information Dense Extract
yargs(args?:string[]):Argv default hideBin(process.argv); Argv.scriptName(name:string), usage(usage:string), command(cmd:string,desc:string,builder?:fn,handler?:fn), option(key:string,def:OptionDefinition|[]), positional(key:string,PosOpts), demandCommand(min=1,max?,minMsg?,maxMsg?):Argv, help(opt='--help',desc?):Argv, version(opt='--version',desc?,ver?):Argv, parse(args?:string[]):Arguments, argv:Arguments. PosOpts: type:string|number|boolean, default?, describe:string. OptionDefinition: alias?:string|[],type?:string|number|boolean|count,default?,describe?,demandOption?,requiresArg?,choices?:[]. hideBin(argv):argv.slice(2). Example: yargs(hideBin(process.argv)).scriptName('app').usage('$0 <cmd> [opts]').command('deploy <env>','desc',y=>y.positional('env',{type:'string',describe:'env'}).option('force',{alias:'f',type:'boolean',default:false,describe:'force'}),(argv)=>...).demandCommand(1).strict().help().version('v','Show version','1.0.0').parse().

## Sanitised Extract
Table of Contents
1. Initialization and Imports
2. Argv Interface and Method Signatures
3. Positional Arguments Configuration
4. Options Configuration
5. Command Registration
6. Help and Version Configuration
7. Parsing and Accessing Arguments
8. Helper Functions

1. Initialization and Imports
Function: yargs(args?: string[]): Argv
Default args: hideBin(process.argv)

2. Argv Interface and Method Signatures
scriptName(name: string): Argv
usage(usage: string): Argv
command(cmd: string, desc: string, builder?: (yargs: Argv) => Argv, handler?: (argv: Arguments) => void): Argv
option(key: string, options: OptionDefinition | OptionDefinition[]): Argv
positional(key: string, opts: PositionalOptions): Argv
demandCommand(min?: number, max?: number, minMsg?: string, maxMsg?: string): Argv
help(opt?: string, desc?: string): Argv
version(opt?: string, desc?: string, ver?: string): Argv
parse(args?: string[]): Arguments
argv: Arguments

3. Positional Arguments Configuration
PositionalOptions:
 type: string|number|boolean
 default: any
 describe: string

4. Options Configuration
OptionDefinition fields:
 alias: string|string[]
 type: string|number|boolean|count
 default: any
 describe: string
 demandOption: boolean
 requiresArg: boolean
 choices: any[]

5. Command Registration
Provide cmd string with placeholders (<>, []), description, builder callback to set options/positionals, and handler callback receiving parsed argv.

6. Help and Version Configuration
help(option: string='--help', description: string='Show help'): Argv
version(option: string='--version', description: string='Show version', version: string=package.version): Argv

7. Parsing and Accessing Arguments
parse(args?: string[]): Arguments
Access via .argv property

8. Helper Functions
hideBin(argv: string[]): returns argv.slice(2)

## Original Source
Yargs (CLI Argument Parser)
https://yargs.js.org/docs/

## Digest of YARGS

# Yargs CLI Argument Parser API Reference

## Installation

npm install --save yargs

## Import

### ESM
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

### CommonJS
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

## Entry Point

yargs(args?: string[]): Argv

Parameters:
  args: string[] (default: hideBin(process.argv))

Returns: 
  Argv instance

## Argv Interface

### Methods

#### scriptName(name: string): Argv
  Sets the displayed script name

#### usage(usage: string): Argv
  Defines the usage string

#### command(command: string, description: string, builder?: (yargs: Argv) => Argv, handler?: (argv: Arguments) => void): Argv
  Registers a command

#### positional(key: string, options: PositionalOptions): Argv
  Defines a positional argument

PositionalOptions:
  type: 'string' | 'number' | 'boolean'
  default: string|number|boolean
  describe: string

#### option(key: string, options: OptionDefinition | OptionDefinition[]): Argv
  Defines an option

OptionDefinition:
  alias?: string|string[]
  type?: 'string'|'number'|'boolean'|'count'
  default?: any
  describe?: string
  demandOption?: boolean
  requiresArg?: boolean
  choices?: any[]

#### demandCommand(min?: number, max?: number, minMsg?: string, maxMsg?: string): Argv
  Requires commands

#### help(option?: string, description?: string): Argv
  Defines help option

#### version(option?: string, description?: string, version?: string): Argv
  Defines version option

#### parse(args?: string[], context?: {}): Arguments
  Parses arguments

#### argv: Arguments
  Getter for parsed arguments

Arguments: {[key: string]: any}

## helpers.hideBin(argv: string[]): string[]
Removes node and script path from argv

## Examples

### Basic CLI
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', yargs =>
    yargs.positional('name', { type: 'string', default: 'Cambi', describe: 'name to say hello to' })
  , argv => {
    console.log('hello', argv.name)
  })
  .help()
  .parse()


## Attribution
- Source: Yargs (CLI Argument Parser)
- URL: https://yargs.js.org/docs/
- License: MIT License
- Crawl Date: 2025-05-02T08:48:26.390Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-02

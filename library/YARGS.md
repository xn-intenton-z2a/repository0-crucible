# YARGS

## Crawl Summary
Installation: npm install --save yargs
Getting Started: import yargs and hideBin; call yargs().scriptName(name).usage(template).command(signature, description, builder, handler).help().parse(hideBin(process.argv))
CommonJS: const {argv}=require('yargs'); use argv.ships, argv.distance
ESM: import yargs, hideBin; call yargs(hideBin(process.argv)).command().demandCommand(1).argv
Deno: import from deno.land/x/yargs; use .strictCommands(), .demandCommand(1), .parse(Deno.args)
Breaking Changes: Conditional exports remove deep-file imports; rebase removed; Node 8 dropped.

## Normalised Extract
Table of Contents:
1 Installation
2 Getting Started
3 Defining Commands
4 Options and Positional Arguments
5 Help and Version
6 CJS and ESM Support
7 Deno Support
8 Breaking Changes

1 Installation:
Run npm install --save yargs

2 Getting Started:
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')

3 Defining Commands:
Syntax: .command(cmdSignature:string, description:string, builder?: (yargs:Yargs)=>Yargs, handler?: (argv:object)=>void)
builder example: builder.positional('name',{type:'string',default:'Cambi',describe:'the name to say hello to'})
handler example: (argv)=>console.log('hello', argv.name, 'welcome to yargs!')

4 Options and Positional Arguments:
.positional(key:string, opts:{type:'string'|'number'|'boolean',default?:any,describe:string,choices?:(string|number)[]})
.option(key:string, opts:{alias?:string|string[],type:'string'|'number'|'boolean',describe:string,default?:any,choices?:(string|number)[],demandOption?:boolean})

5 Help and Version:
.help([optionName:string])
.version([optionName:string],[description:string])
.alias(aliasOrKeys:string|string[],alias:string|string[])

6 CJS and ESM Support:
CommonJS: const {argv}=require('yargs')
ESM: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers'

7 Deno Support:
import yargs from 'https://deno.land/x/yargs/deno.ts'
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts'

8 Breaking Changes:
- Conditional exports enforce explicit entry points
- 'rebase' helper removed
- Node 8 support dropped

## Supplementary Details
Core methods and options:
scriptName(name:string):Yargs — set binary name in help output
usage(template:string):Yargs — define usage banner with $0 placeholder
command(signature:string, description:string, builder?:BuilderCallback, handler?:HandlerCallback):Yargs — define commands
positional(key:string, opts:PositionalOptions):Yargs — configure positional arguments
option(key:string, opts:OptionDefinition):Yargs — configure named options
help(optionName?:string):Yargs — enable --help output
version(optionName?:string, description?:string):Yargs — enable --version output
alias(keys:string|string[], alias:string|string[]):Yargs — add alternative flags
demandCommand(min:number, max?:number, msg?:string):Yargs — require commands
strict(strict?:boolean):Yargs — fail on unknown options
strictCommands(strict?:boolean):Yargs — fail on unknown commands
strictOption(strict?:boolean):Yargs — fail on unknown options
showHelpOnFail(show:boolean|string):Yargs — show help and exit on failure
recommendCommands(threshold:number):Yargs — suggest closest commands
parse(argv?:string[], context?:object, callback?:ParseCallback):ParsedArguments — parse arguments synchronously or via callback

hideBin(argv:string[]):string[] — strip node and script path from argv

## Reference Details
- scriptName(name:string):YargsInstance — sets parser.bin to name
- usage(cmd:string):YargsInstance — defines usage banner, supports $0 substitution
- command(cmd: string, description:string, builder?: (yargs:Yargs)=>YargsInstance, handler?: (argv:object)=>void):YargsInstance
- positional(name:string, opts:{ type:'string'|'number'|'boolean', default?:any, describe:string, choices?:(string|number)[] }):YargsInstance
- option(name:string, opts:{ alias?:string|string[], type:'string'|'number'|'boolean', describe:string, default?:any, choices?:(string|number)[], demandOption?:boolean, requiresArg?:boolean, group?:string|string[], coerce?:(arg:any)=>any }):YargsInstance
- help(optionName?:string):YargsInstance — adds --help flag
- version(optionName?:string,description?:string):YargsInstance — adds --version flag
- alias(aliases:string|string[], key:string|string[]):YargsInstance — define alias mappings
- demandCommand(min:number, max?:number, msg?:string):YargsInstance — enforce command count
- strict(strict?:boolean):YargsInstance — fail on unknown options
- strictCommands(strict?:boolean):YargsInstance — fail on unknown commands
- strictOption(strict?:boolean):YargsInstance — fail on unknown options
- showHelpOnFail(show:boolean|string):YargsInstance — show help when validation fails
- recommendCommands(threshold:number):YargsInstance — suggest similar commands
- parse(argv?:string[], context?:object, callback?:(err:Error, argv:ParsedArguments, output:string)=>void):ParsedArguments

hideBin:
- hideBin(argv:string[]):string[] — returns argv.slice(2)

Implementation Pattern:
npm install --save yargs
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .scriptName('app')
  .usage('$0 <cmd> [opts]')
  .option('port',{ alias:'p', type:'number', default:3000, describe:'port to bind' })
  .command('start','start server',() => {}, argv => { console.log('listening on', argv.port) })
  .demandCommand(1)
  .strictCommands()
  .help()
  .parse()

Troubleshooting:
$ node app.js unknown
Error: Unknown argument: unknown
Use .strictCommands() to enforce commands and fail on unknown commands
$ node app.js start --unknownOption
Error: Unknown argument: unknownOption
Enable .strictOption() to enforce known options
$ node app.js --help
Displays usage, commands, options list

## Information Dense Extract
scriptName(name:string):Yargs; usage(cmd:string):Yargs; command(cmd:string,desc:string,builder?:BuilderCb,handler?:HandlerCb):Yargs; positional(key:string,opts:PosOpts):Yargs; option(key:string,opts:OptDef):Yargs; help(opt?:string):Yargs; version(opt?:string,desc?:string):Yargs; alias(keys:string|string[],alias:string|string[]):Yargs; demandCommand(min:number,max?:number,msg?:string):Yargs; strict(strict?:boolean):Yargs; strictCommands(strict?:boolean):Yargs; strictOption(strict?:boolean):Yargs; showHelpOnFail(show:boolean|string):Yargs; recommendCommands(threshold:number):Yargs; parse(argv?:string[],ctx?:object,cb?:ParseCb):ParsedArgs; hideBin(argv:string[]):string[]

## Sanitised Extract
Table of Contents:
1 Installation
2 Getting Started
3 Defining Commands
4 Options and Positional Arguments
5 Help and Version
6 CJS and ESM Support
7 Deno Support
8 Breaking Changes

1 Installation:
Run npm install --save yargs

2 Getting Started:
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')

3 Defining Commands:
Syntax: .command(cmdSignature:string, description:string, builder?: (yargs:Yargs)=>Yargs, handler?: (argv:object)=>void)
builder example: builder.positional('name',{type:'string',default:'Cambi',describe:'the name to say hello to'})
handler example: (argv)=>console.log('hello', argv.name, 'welcome to yargs!')

4 Options and Positional Arguments:
.positional(key:string, opts:{type:'string'|'number'|'boolean',default?:any,describe:string,choices?:(string|number)[]})
.option(key:string, opts:{alias?:string|string[],type:'string'|'number'|'boolean',describe:string,default?:any,choices?:(string|number)[],demandOption?:boolean})

5 Help and Version:
.help([optionName:string])
.version([optionName:string],[description:string])
.alias(aliasOrKeys:string|string[],alias:string|string[])

6 CJS and ESM Support:
CommonJS: const {argv}=require('yargs')
ESM: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers'

7 Deno Support:
import yargs from 'https://deno.land/x/yargs/deno.ts'
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts'

8 Breaking Changes:
- Conditional exports enforce explicit entry points
- 'rebase' helper removed
- Node 8 support dropped

## Original Source
CLI Argument Parsing Libraries
https://yargs.js.org/docs/

## Digest of YARGS

# Installation

Run 'npm install --save yargs'

# Getting Started

#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (builder) => {
    builder.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .parse(hideBin(process.argv))

# CJS and ESM Usage

## CommonJS
const { argv } = require('yargs')

## ESM
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .argv

# Deno Support

import yargs from 'https://deno.land/x/yargs/deno.ts'
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts'

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', { describe: 'a list of files' })
  }, (argv: Arguments) => {
    console.info(argv)
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args)

# Breaking Changes

- Conditional exports: deep imports disabled
- Removed helper method 'rebase'
- Dropped Node 8 support

Date retrieved: 2024-06-14
Data Size: 348060 bytes
Links Found: 34
Error: None

## Attribution
- Source: CLI Argument Parsing Libraries
- URL: https://yargs.js.org/docs/
- License: MIT License
- Crawl Date: 2025-05-06T09:30:51.881Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-05-06
